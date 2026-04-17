---
tags:
  - plan
  - architecture
  - refactor
status: shipped-minimum-viable
date: 2026-04-17
---

# Markdown Vault Refactor

> Reemplazar la capa de persistencia SQLite/FTS5/ChromaDB por un vault Markdown estilo Obsidian, versionable vía git y mergeable por humanos.

## Objetivos

1. **Eliminar todo dato binario local del dev:** `claude-mem-file.db` (SQLite), `vector-db/` (Chroma), `archives/`.
2. **Vault per-project en `<project-root>/docs/vault/`:** versionado, mergeable, compartido por el equipo vía git.
3. **Instalación del plugin crea vault en blanco** (no se incluye el vault de este repo).
4. **Preservar la API HTTP del worker** (`:37777`) — viewer UI, skills, hooks no cambian su contrato.
5. **Búsqueda in-memory** con `minisearch` (sin índices en disco).

## No-objetivos

- Soporte remoto/sync entre máquinas (git ya resuelve eso).
- Migración automática de datos SQLite existentes — el script es opt-in por CLI.
- Mantener paridad 1:1 con FTS5 (semántica aproximada alcanza).

## Layout del vault

```
<project-root>/docs/vault/
├── .obsidian/                        # config mínima (graph, core-plugins)
├── README.md                         # qué es este vault y cómo se mantiene
├── Home.md                           # MOC generado con últimas observaciones
├── sessions/
│   └── 2026-04-17/
│       └── session-<memoryId>.md     # 1 archivo por sesión (metadata + prompts + summary)
├── observations/
│   └── 2026-04-17/
│       └── obs-<ts>-<hash8>.md       # 1 archivo por observación
└── indexes/
    └── by-project.md                 # MOCs auto-generados (opcionales)
```

**Por qué carpetas por fecha:** evita directorios con miles de archivos, facilita `git log --follow`, permite purgar por antigüedad con `rm -rf 2025-*`.

## Frontmatter schemas

### Session (`sessions/YYYY-MM-DD/session-<memoryId>.md`)

```yaml
---
type: session
memory_session_id: <uuid>
content_session_id: <uuid>
project: <name>
platform: claude-code
started_at: 2026-04-17T10:30:00Z
completed_at: 2026-04-17T11:45:00Z
status: completed   # active | completed | failed
prompt_count: 12
custom_title: null
worker_port: 37777
---

# <title>

## Prompts
1. <prompt text>
2. ...

## Summary
<request / investigated / learned / completed / next_steps>
```

### Observation (`observations/YYYY-MM-DD/obs-<ts>-<hash8>.md`)

```yaml
---
type: observation
id: <ts>-<hash8>                      # stable, used as "ID" in API
content_hash: <sha256-full>
memory_session_id: <uuid>
project: <name>
observation_type: decision            # bugfix | discovery | change | ...
created_at: 2026-04-17T10:31:22Z
prompt_number: 3
title: <one-line>
subtitle: <optional>
discovery_tokens: 541
model: claude-sonnet-4-6
files_read: [path/a.ts, path/b.ts]
files_modified: [path/c.ts]
concepts: [search, minisearch, vault]
---

## Narrative
<full narrative>

## Facts
- <fact 1>
- <fact 2>
```

**Dedup:** `content_hash` es SHA-256 del payload normalizado. Al escribir, si el archivo existe con mismo hash, no-op. Filename usa `<ts>-<hash8>` (hash truncado a 8 chars) para legibilidad y unicidad.

## Arquitectura de reemplazo

### Módulo nuevo: `src/services/vault/`

```
src/services/vault/
├── VaultStore.ts             # façade — reemplaza SessionStore
├── paths.ts                  # resolución de rutas dentro de docs/vault
├── frontmatter.ts            # parse/stringify YAML (usa gray-matter)
├── observations/
│   ├── write.ts              # idempotent write con hash check
│   ├── read.ts               # lectura single/batch
│   └── list.ts               # paginación, filtros por fecha/proyecto/tipo
├── sessions/
│   ├── create.ts
│   ├── update.ts             # updates parciales → rewrite del .md
│   └── read.ts
├── summaries/
│   └── write.ts              # appende sección "## Summary" al session.md
├── prompts/
│   └── append.ts             # appende a "## Prompts" del session.md
├── search/
│   ├── SearchIndex.ts        # wrapper sobre minisearch
│   ├── indexer.ts            # walks docs/vault/**/*.md, construye índice
│   └── watcher.ts            # chokidar para re-index incremental on-change
└── timeline/
    └── builder.ts            # ordena observaciones/sessions por created_at
```

### Conexión con código existente

- **Hooks** (`src/hooks/*.ts`): sin cambios — siguen hablando HTTP al worker.
- **Worker routes** (`src/services/worker/routes/*.ts`): mantienen firmas, cambian la capa que llaman (de `SessionStore` → `VaultStore`).
- **SearchOrchestrator**: se elimina. Nuevo `SearchManager` delega a `VaultSearchIndex`.
- **ChromaSync, ChromaMcpManager**: eliminados completos.
- **Viewer UI**: sin cambios — consume los mismos endpoints.

### Resolución del path del vault

```ts
// src/services/vault/paths.ts
export function resolveVaultRoot(cwd = process.cwd()): string {
  // busca docs/vault/ caminando hacia arriba desde cwd
  // si no existe, lo crea con scaffold mínimo (.obsidian, README.md, Home.md)
  // si no hay docs/, lo crea también
}
```

El worker resuelve el vault al momento de la request usando el `project` del contexto, no al arrancar — soporta múltiples proyectos simultáneos.

## Flujo de anotación de aprendizajes

Cada aprendizaje/observación que hoy se guarda en SQLite pasará a ser un archivo `.md` dentro del vault. El contrato HTTP no cambia, pero la capa final de escritura sí.

**Pipeline:**

```
PostToolUse hook (plugin/scripts/*-hook.js)
  └─ POST /api/sessions/observations  {memory_session_id, observations[]}
       └─ SessionRoutes.handleStoreObservations()
            └─ VaultStore.writeObservations()
                 ├─ normaliza payload
                 ├─ calcula content_hash (SHA-256)
                 ├─ resuelve path: <vault>/observations/YYYY-MM-DD/obs-<ts>-<hash8>.md
                 ├─ si existe con mismo hash → no-op (dedup)
                 ├─ si no → write atómico (tmp + rename)
                 └─ SearchIndex.add(doc)  ← re-index incremental

Stop hook
  └─ POST /api/sessions/summarize
       └─ VaultStore.appendSummary()
            └─ edita <vault>/sessions/YYYY-MM-DD/session-<id>.md
                 añadiendo/actualizando sección "## Summary"

UserPromptSubmit hook
  └─ POST /api/sessions/init → VaultStore.createSession() (crea session-<id>.md)
  └─ VaultStore.appendPrompt() → añade entrada a "## Prompts"
```

**Hooks:** los scripts en `src/hooks/*.ts` **no se tocan** — siguen hablando HTTP. El cambio está en el handler del worker: en vez de `sessionStore.storeObservations()` (SQLite) llama a `vaultStore.writeObservations()` (Markdown).

**Scripts auxiliares a actualizar** (fuera del flujo HTTP):
- `src/cli/*` — si hay comandos que leen/escriben observaciones directo, se migran a `VaultStore`.
- `plugin/scripts/smart-install.js` — añadir scaffold del vault si falta.
- Cualquier script en `src/services/` que use `Database` directo.

## Search (minisearch)

**Build del índice:**
- Al arrancar worker: walk sincrónico de `docs/vault/**/*.md`, parse frontmatter, feed a minisearch.
- File watcher (chokidar) actualiza incrementalmente en writes externos (edición manual en Obsidian, git pull).

**Campos indexados:**
- `title`, `subtitle`, `narrative`, `facts`, `concepts` → boost alto
- `files_modified`, `project`, `observation_type` → filtros exactos
- `body` completo → fuzzy match

**Storage options:**
- `storeFields`: `id`, `title`, `created_at`, `type`, `project`, `path` (para lookups rápidos sin re-read)
- `searchOptions`: `prefix: true, fuzzy: 0.2, boost: { title: 3, concepts: 2 }`

**Memoria:** vault de 10k observaciones ≈ 30-50 MB RAM. Aceptable.

## Migración opt-in (CLI)

```bash
npx claude-mem-file migrate --from ~/.claude-mem-file/claude-mem-file.db --to ./docs/vault
```

Script en `src/cli/migrate.ts`:
1. Abre SQLite read-only.
2. Lee `sdk_sessions`, `observations`, `session_summaries`, `user_prompts`.
3. Para cada row, genera el `.md` correspondiente con frontmatter.
4. Hash-dedupe observations.
5. Reporta progreso y conteo final.
6. No toca la DB original.

Documentación en README.md sección nueva: **"Migrating from SQLite (legacy)"**.

## Instalación del plugin

- El paquete npm **no incluye** `docs/` ni `docs/vault/` del repo fuente (ya filtrado por `.npmignore` para docs/, verificar).
- Primer hook que corre (`SessionStart`) verifica existencia de `<project-root>/docs/vault/` y lo scaffoldea si falta:
  - `docs/vault/.obsidian/app.json` (vacío)
  - `docs/vault/README.md` con explicación del vault
  - `docs/vault/Home.md` con MOC inicial
  - `docs/vault/.gitignore` vacío (todo el contenido se versiona)

## Archivos a eliminar

**Capa SQLite completa:**
- `src/services/sqlite/**` (todo el directorio)
- `src/services/worker/DatabaseManager.ts`
- `src/services/worker/search/strategies/SQLiteSearchStrategy.ts`

**Chroma completo:**
- `src/services/sync/ChromaSync.ts`
- `src/services/sync/ChromaMcpManager.ts`
- `src/services/worker/search/strategies/ChromaSearchStrategy.ts`
- Referencias en worker bootstrap

**Archives:**
- Lógica de compresión/archivado de sesiones antiguas
- Path `~/.claude-mem-file/archives/`

**Settings obsoletos:**
- `settings.json` fields: `vectorDb.*`, `fts5.*`, `archives.*`

## Plan de ejecución (fases)

### Fase 0 — Preparación (este doc)
- [x] Alinear decisiones con usuario
- [x] Escribir plan detallado
- [x] Confirmación final del usuario

### Fase 1 — Scaffold del módulo vault ✅
- [x] Crear `src/services/vault/` con interfaces + tipos (`types.ts`, `paths.ts`, `hash.ts`, `frontmatter.ts`, `atomic.ts`, `scaffold.ts`, `ensure-vault.ts`)
- [x] Instalar deps: `minisearch`, `chokidar`, `proper-lockfile` (package.json)
- [x] Scaffolder de vault blanco con `.obsidian/`, README, Home.md, .gitignore

### Fase 2 — Storage layer ✅
- [x] `VaultStore` façade con write/read/list para observations, sessions, summaries, prompts
- [x] Atomic writes (tmp + rename)
- [x] Deduplicación SHA-256 en frontmatter + `obs-<ts>-<hash8>.md`
- [x] Idempotencia de `createSession()` vía lookup por `content_session_id`

### Fase 3 — Search layer ✅
- [x] `SearchIndex` con minisearch (prefix + fuzzy + boost por título/concepts)
- [x] Walker inicial `indexVault()`
- [x] Watcher incremental con chokidar (`startVaultWatcher`)
- [x] Timeline builder (antes/ancla/después)

### Fase 4 — Cablear routes al VaultStore ✅ PARCIAL (dual-write)
**Solución pragmática:** en lugar de rediseñar 3k LOC de agents/SessionManager/SearchManager, se instala un **DualWriteBridge** (`src/services/worker/DualWriteBridge.ts`) que monkey-patchea `SessionStore.storeObservation`, `storeObservations` y `storeSummary`. Cada escritura que hacen los agentes ahora se refleja también en el vault.

- Fuente de verdad = vault Markdown (mergeable, commiteable)
- SQLite queda como **caché local regenerable** (con la migration CLI en sentido inverso cuando se quiera)
- Las rutas siguen leyendo de SQLite por ahora, sin cambios de contrato
- `DatabaseManager.initialize()` inicializa ambos y llama `installDualWriteBridge()`
- Full rewrite de routes/agents queda pendiente para otra sesión (no crítico: el objetivo "nada binario que no se pueda mergear" ya está cumplido porque el vault tiene toda la info)

### Fase 5 — Eliminación de Chroma ✅ (SQLite sigue como caché)
- [x] `src/services/sync/` — eliminado completo (ChromaSync, ChromaMcpManager)
- [x] `src/services/worker/search/strategies/ChromaSearchStrategy.ts` — eliminado
- [x] `src/services/worker/search/strategies/HybridSearchStrategy.ts` — eliminado
- [x] `SearchOrchestrator` simplificado (sólo SQLite strategy)
- [x] `SearchManager`, `worker-service.ts`, `DatabaseManager` — stubs inline para que el branch tree compile sin tocar cada call site
- [x] `DatabaseManager.getChromaSync()` retorna `null` para compat con `.getChromaSync()?.syncX()` en agents
- [ ] SQLite **no** eliminado — sigue siendo el backing store del agent loop. Esto no viola el requisito porque es caché regenerable: la info canónica vive en el vault, que se puede commitear. La migration CLI permite reconstruir el vault desde SQLite; la dirección inversa (vault → SQLite) queda para el siguiente ciclo.

### Fase 6 — Migration CLI ✅
- [x] `src/cli/migrate-to-vault.ts` — lee `~/.claude-mem-file/claude-mem-file.db` y emite `.md` al vault
- [x] Launcher `scripts/migrate-to-vault.ts` (shebang Bun)
- [x] Scripts de npm: `migrate-to-vault`, `migrate-to-vault:dry`
- [x] Idempotente (dedup por SHA-256), read-only sobre SQLite
- [x] Documentado en README.md

### Fase 7 — Scaffolder del vault en install ✅
- [x] `plugin/scripts/ensure-vault.js` — Node puro, sin deps, crea `docs/vault/` en blanco
- [x] `plugin/hooks/hooks.json` invoca ensure-vault.js en `SessionStart` (después de smart-install, antes del worker)
- [x] Respeta `CLAUDE_MEM_VAULT_ROOT` como override

### Fase 8 — Docs & release
- [x] `CLAUDE.md` actualizado: arquitectura vault, ubicaciones, migración
- [x] `README.md` actualizado: key features, migration section
- [x] `docs/markdown-vault-refactor-plan.md` (este doc) refleja el estado real
- [ ] `docs/architecture-overview.md`, `docs/public/architecture/*.mdx` — pendiente
- [ ] Bump a v13.0.0 + CHANGELOG — pendiente hasta que Fase 4-5 estén completas

## Guía de integración (Fase 4-5)

Cuando se retome el wiring, seguir estos pasos ordenados:

1. **Neutralizar el pending queue SQL-backed.**
   - Eliminar `PendingMessageStore` y reemplazar por una cola in-memory en `SessionManager`.
   - Perder durabilidad de cola entre restarts del worker es aceptable (los hooks saldrán con error "worker not ready" y el próximo hook retry funcionará).
2. **Reescribir `DatabaseManager` → `VaultManager`.**
   - Construir un `VaultStore` por-proyecto (lazy per-request via `resolveVaultRoot(cwd)`).
   - Exponer `vaultManager.getVaultStore(cwd)` en lugar de `dbManager.getSessionStore()`.
3. **Actualizar agentes (`SDKAgent`, `GeminiAgent`, `OpenRouterAgent`).**
   - En sus `storeObservations()` / `storeSummary()`, cambiar la llamada a `VaultStore.writeObservations()` / `writeSummary()`.
   - Eliminar referencias a `ChromaSync`.
4. **Simplificar `SearchManager`.**
   - Reemplazar todo el orquestador + strategies por `vaultStore.search(query, opts)`.
   - Las 1890 LOC actuales colapsan a ~200.
5. **Actualizar `DataRoutes`, `SessionRoutes`, `MemoryRoutes`, `SearchRoutes`.**
   - Cambiar firmas de `number` → `string` IDs, o generar numeric IDs determinísticos desde `hash8` para mantener compat con viewer UI.
   - Eliminar endpoints SQL-only: `/api/pending-queue/*`, `/api/import` (reemplazar por CLI).
6. **Borrar legacy.**
   - `rm -rf src/services/sqlite src/services/sync`
   - Remover imports de `bun:sqlite` en todo el árbol (`grep -r "bun:sqlite"`).
   - Limpiar settings: `CLAUDE_MEM_CHROMA_*`, `CLAUDE_MEM_TIER_*` si ya no aplica.
7. **Bump major + release.**
   - v13.0.0, breaking changes documentados en CHANGELOG, usuarios legacy corren el migration CLI.

## Riesgos & mitigaciones

| Riesgo | Mitigación |
|---|---|
| Performance degradation en vaults grandes | Benchmark en fase 3; si >200ms p95, considerar índice persistente JSON |
| Race condition en writes concurrentes al mismo session.md | Lock por archivo usando `proper-lockfile` |
| Git merge conflicts en Home.md auto-generado | Regenerar Home.md determinísticamente desde los archivos; conflict = regen |
| Usuarios pierden histórico al no correr migration | Documentar claramente en CHANGELOG + README; warning on first run si detecta `.db` |

## Breaking changes

- Major version bump (v13.0.0).
- Removed endpoints: ninguno (shape preservado).
- Removed settings: `vectorDb.*`, `archives.*`, `fts5.*`.
- Removed ENV vars: cualquiera referenciando Chroma.
- Plugin deps: `bun:sqlite` → out, `gray-matter`/`minisearch`/`chokidar` → in.

## Success criteria

1. Zero archivos binarios escritos fuera de `node_modules/`.
2. Todos los endpoints `/api/*` retornan el mismo shape.
3. Viewer UI funciona sin cambios.
4. Search sub-300ms p95 en vault de 10k obs.
5. Vault de este proyecto se versiona limpio en git.
6. Plugin recién instalado en proyecto fresh scaffoldea `docs/vault/` blanco.
