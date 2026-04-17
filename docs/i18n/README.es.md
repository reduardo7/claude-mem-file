🌐 Esta es una traducción automática. ¡Las correcciones de la comunidad son bienvenidas!

---

# claude-mem-file

<p align="center">
  <a href="README.zh.md">🇨🇳 中文</a> •
  <a href="README.zh-tw.md">🇹🇼 繁體中文</a> •
  <a href="README.ja.md">🇯🇵 日本語</a> •
  <a href="README.pt.md">🇵🇹 Português</a> •
  <a href="README.pt-br.md">🇧🇷 Português</a> •
  <a href="README.ko.md">🇰🇷 한국어</a> •
  <a href="README.es.md">🇪🇸 Español</a> •
  <a href="README.de.md">🇩🇪 Deutsch</a> •
  <a href="README.fr.md">🇫🇷 Français</a> •
  <a href="README.he.md">🇮🇱 עברית</a> •
  <a href="README.ar.md">🇸🇦 العربية</a> •
  <a href="README.ru.md">🇷🇺 Русский</a> •
  <a href="README.pl.md">🇵🇱 Polski</a> •
  <a href="README.cs.md">🇨🇿 Čeština</a> •
  <a href="README.nl.md">🇳🇱 Nederlands</a> •
  <a href="README.tr.md">🇹🇷 Türkçe</a> •
  <a href="README.uk.md">🇺🇦 Українська</a> •
  <a href="README.vi.md">🇻🇳 Tiếng Việt</a> •
  <a href="README.tl.md">🇵🇭 Tagalog</a> •
  <a href="README.id.md">🇮🇩 Indonesia</a> •
  <a href="README.th.md">🇹🇭 ไทย</a> •
  <a href="README.hi.md">🇮🇳 हिन्दी</a> •
  <a href="README.bn.md">🇧🇩 বাংলা</a> •
  <a href="README.ur.md">🇵🇰 اردو</a> •
  <a href="README.ro.md">🇷🇴 Română</a> •
  <a href="README.sv.md">🇸🇪 Svenska</a> •
  <a href="README.it.md">🇮🇹 Italiano</a> •
  <a href="README.el.md">🇬🇷 Ελληνικά</a> •
  <a href="README.hu.md">🇭🇺 Magyar</a> •
  <a href="README.fi.md">🇫🇮 Suomi</a> •
  <a href="README.da.md">🇩🇰 Dansk</a> •
  <a href="README.no.md">🇳🇴 Norsk</a>
</p>

> [!NOTE]
> **Este es un fork de [claude-mem](https://github.com/thedotmack/claude-mem)** por [Alex Newman (@thedotmack)](https://github.com/thedotmack).
>
> Este fork reemplaza el backend de almacenamiento SQLite/binario con un **enfoque exclusivamente basado en el sistema de archivos**: toda la memoria se almacena como archivos Markdown simples bajo `<project-root>/docs/vault/`, completamente versionable mediante git y compartible con cada miembro de tu equipo. Sin bases de datos locales, sin blobs binarios — solo archivos que puedes leer, editar, confirmar y fusionar.

<h4 align="center">claude-mem-file — Sistema de compresión de memoria persistente construido para <a href="https://claude.com/claude-code" target="_blank">Claude Code</a>.</h4>

<br>

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/reduardo7/claude-mem-file">
        <picture>
          <img src="https://raw.githubusercontent.com/reduardo7/claude-mem-file/main/docs/public/cm-preview.gif" alt="Vista previa de Claude-Mem-File" width="500">
        </picture>
      </a>
    </td>
    <td align="center">
      <a href="https://www.star-history.com/#reduardo7/claude-mem-file&Date">
        <picture>
          <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&theme=dark&legend=top-left" />
          <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&legend=top-left" />
          <img alt="Gráfico del Historial de Estrellas" src="https://api.star-history.com/image?repos=reduardo7/claude-mem-file&type=date&legend=top-left" width="500" />
        </picture>
      </a>
    </td>
  </tr>
</table>

<p align="center">
  <a href="#inicio-rápido">Inicio Rápido</a> •
  <a href="#cómo-funciona">Cómo Funciona</a> •
  <a href="#herramientas-de-búsqueda-mcp">Herramientas de Búsqueda</a> •
  <a href="#documentación">Documentación</a> •
  <a href="#configuración">Configuración</a> •
  <a href="#solución-de-problemas">Solución de Problemas</a> •
  <a href="#licencia">Licencia</a>
</p>

<p align="center">
  Claude-Mem-File preserva el contexto sin interrupciones entre sesiones al capturar observaciones de uso de herramientas, generar resúmenes semánticos y almacenar todo como Markdown versionado dentro de un vault por proyecto compatible con Obsidian en <code>&lt;project-root&gt;/docs/vault/</code> — sin base de datos SQLite, sin blobs binarios, totalmente fusionable mediante git.
</p>

---

## Inicio Rápido

Instala con un solo comando:

```bash
npx claude-mem-file install
```

O instala para Gemini CLI (detecta automáticamente `~/.gemini`):

```bash
npx claude-mem-file install --ide gemini-cli
```

O instala para OpenCode:

```bash
npx claude-mem-file install --ide opencode
```

O instala desde el marketplace de plugins dentro de Claude Code:

```bash
/plugin marketplace add reduardo7/claude-mem-file

/plugin install claude-mem-file
```

Reinicia Claude Code o Gemini CLI. El contexto de sesiones anteriores aparecerá automáticamente en nuevas sesiones.

> **Nota:** Claude-Mem-File también está publicado en npm, pero `npm install -g claude-mem-file` instala únicamente el **SDK/biblioteca** — no registra los hooks del plugin ni configura el servicio worker. Instala siempre mediante `npx claude-mem-file install` o los comandos `/plugin` indicados arriba.

### 🦞 Puerta de Enlace OpenClaw

Instala claude-mem-file como plugin de memoria persistente en gateways [OpenClaw](https://openclaw.ai) con un solo comando:

```bash
curl -fsSL https://install.cmem.ai/openclaw.sh | bash
```

El instalador gestiona dependencias, configuración del plugin, configuración del proveedor de IA, inicio del worker y feeds opcionales de observaciones en tiempo real a Telegram, Discord, Slack y más. Consulta la [Guía de Integración OpenClaw](https://docs.claude-mem-file.ai/openclaw-integration) para más detalles.

**Características Principales:**

- 🧠 **Memoria Persistente** - El contexto sobrevive entre sesiones
- 📁 **Vault de Markdown (compatible con Obsidian)** - Observaciones y sesiones almacenadas como archivos `.md` bajo `<project-root>/docs/vault/`, versionables y fusionables mediante git — sin SQLite, sin estado binario en las máquinas de desarrollo
- 📊 **Divulgación Progresiva** - Recuperación de memoria en capas con visibilidad del costo en tokens
- 🔍 **Búsqueda Basada en Habilidades** - Consulta el historial de tu proyecto con la habilidad mem-search (impulsada por `minisearch` en memoria sobre el vault)
- 🖥️ **Interfaz de Visor Web** - Transmisión de memoria en tiempo real en http://localhost:37777
- 💻 **Habilidad para Claude Desktop** - Busca en la memoria desde conversaciones de Claude Desktop
- 🔒 **Control de Privacidad** - Usa etiquetas `<private>` para excluir contenido sensible del almacenamiento
- ⚙️ **Configuración de Contexto** - Control detallado sobre qué contexto se inyecta
- 🤖 **Operación Automática** - No se requiere intervención manual
- 🔗 **Citas** - Referencias a observaciones pasadas con IDs (accede vía http://localhost:37777/api/observation/{id} o visualiza todas en el visor web en http://localhost:37777)
- 🧪 **Canal Beta** - Prueba características experimentales como Endless Mode mediante cambio de versión

## Migrando desde SQLite (heredado)

Las versiones anteriores almacenaban la memoria en `~/.claude-mem-file/claude-mem-file.db` (SQLite + FTS5 + ChromaDB). El nuevo diseño de vault reemplaza todo eso con Markdown simple en `<project-root>/docs/vault/`. Tus memorias anteriores no se pierden — ejecuta el script de migración una vez:

```bash
# desde cualquier proyecto que haya usado claude-mem-file anteriormente:
npm run migrate-to-vault              # escribe docs/vault/ desde la base de datos heredada
npm run migrate-to-vault:dry          # vista previa sin escribir
bun scripts/migrate-to-vault.ts \
    --db ~/.claude-mem-file/claude-mem-file.db \
    --out ./docs/vault                # rutas explícitas
```

El script abre la base de datos SQLite en modo de solo lectura y es idempotente (los duplicados se detectan mediante hashes de contenido SHA-256, por lo que volver a ejecutarlo es seguro). Confirma la carpeta `docs/vault/` resultante en tu repositorio para compartir la memoria con tu equipo.

---

## Documentación

📚 **[Ver Documentación Completa](https://docs.claude-mem-file.ai/)** - Navegar en el sitio web oficial

### Primeros Pasos

- **[Guía de Instalación](https://docs.claude-mem-file.ai/installation)** - Inicio rápido e instalación avanzada
- **[Configuración de Gemini CLI](https://docs.claude-mem-file.ai/gemini-cli/setup)** - Guía dedicada para la integración con Gemini CLI de Google
- **[Guía de Uso](https://docs.claude-mem-file.ai/usage/getting-started)** - Cómo funciona Claude-Mem-File automáticamente
- **[Herramientas de Búsqueda](https://docs.claude-mem-file.ai/usage/search-tools)** - Consulta el historial de tu proyecto con lenguaje natural
- **[Características Beta](https://docs.claude-mem-file.ai/beta-features)** - Prueba características experimentales como Endless Mode

### Mejores Prácticas

- **[Ingeniería de Contexto](https://docs.claude-mem-file.ai/context-engineering)** - Principios de optimización de contexto para agentes de IA
- **[Divulgación Progresiva](https://docs.claude-mem-file.ai/progressive-disclosure)** - Filosofía detrás de la estrategia de preparación de contexto de Claude-Mem-File

### Arquitectura

- **[Descripción General](https://docs.claude-mem-file.ai/architecture/overview)** - Componentes del sistema y flujo de datos
- **[Evolución de la Arquitectura](https://docs.claude-mem-file.ai/architecture-evolution)** - El viaje de v3 a v5
- **[Arquitectura de Hooks](https://docs.claude-mem-file.ai/hooks-architecture)** - Cómo Claude-Mem-File usa hooks de ciclo de vida
- **[Referencia de Hooks](https://docs.claude-mem-file.ai/architecture/hooks)** - 7 scripts de hooks explicados
- **[Servicio Worker](https://docs.claude-mem-file.ai/architecture/worker-service)** - API HTTP y gestión de Bun
- **[Docs Vault](../)** - Vault de Markdown estilo Obsidian para conocimiento compartido del proyecto

### Configuración y Desarrollo

- **[Configuración](https://docs.claude-mem-file.ai/configuration)** - Variables de entorno y ajustes
- **[Desarrollo](https://docs.claude-mem-file.ai/development)** - Compilación, pruebas y contribución
- **[Solución de Problemas](https://docs.claude-mem-file.ai/troubleshooting)** - Problemas comunes y soluciones

---

## Cómo Funciona

**Componentes Principales:**

1. **5 Hooks de Ciclo de Vida** - SessionStart, UserPromptSubmit, PostToolUse, Stop, SessionEnd (6 scripts de hooks)
2. **Instalación Inteligente** - Verificador de dependencias en caché (script pre-hook, no un hook de ciclo de vida)
3. **Servicio Worker** - API HTTP en el puerto 37777 con interfaz de visor web y 10 endpoints de búsqueda, gestionado por Bun
4. **Docs Vault** (`docs/`) - Vault de Markdown estilo Obsidian confirmado en el repositorio; la fuente compartida de verdad para todas las decisiones arquitectónicas, contexto y conocimiento entre sesiones y colaboradores
5. **Habilidad mem-search** - Consultas en lenguaje natural con divulgación progresiva

Ver [Descripción General de la Arquitectura](https://docs.claude-mem-file.ai/architecture/overview) para más detalles.

---

## Herramientas de Búsqueda MCP

Claude-Mem-File proporciona búsqueda inteligente de memoria a través de **4 herramientas MCP** siguiendo un **patrón de flujo de trabajo de 3 capas** eficiente en tokens:

**El Flujo de Trabajo de 3 Capas:**

1. **`search`** - Obtén un índice compacto con IDs (~50-100 tokens/resultado)
2. **`timeline`** - Obtén contexto cronológico alrededor de resultados interesantes
3. **`get_observations`** - Obtén detalles completos SOLO para IDs filtrados (~500-1.000 tokens/resultado)

**Cómo Funciona:**

- Claude usa herramientas MCP para buscar en tu memoria
- Comienza con `search` para obtener un índice de resultados
- Usa `timeline` para ver qué ocurría alrededor de observaciones específicas
- Usa `get_observations` para obtener detalles completos de los IDs relevantes
- **~10x ahorro en tokens** al filtrar antes de obtener detalles

**Herramientas MCP Disponibles:**

1. **`search`** - Busca en el índice de memoria con consultas de texto completo, filtra por tipo/fecha/proyecto
2. **`timeline`** - Obtén contexto cronológico alrededor de una observación o consulta específica
3. **`get_observations`** - Obtén detalles completos de observaciones por IDs (siempre agrupa múltiples IDs)

**Ejemplo de Uso:**

```typescript
// Paso 1: Buscar en el índice
search((query = 'authentication bug'), (type = 'bugfix'), (limit = 10));

// Paso 2: Revisar el índice, identificar IDs relevantes (p. ej., #123, #456)

// Paso 3: Obtener detalles completos
get_observations((ids = [123, 456]));
```

Ver [Guía de Herramientas de Búsqueda](https://docs.claude-mem-file.ai/usage/search-tools) para ejemplos detallados.

---

## Características Beta

Claude-Mem-File ofrece un **canal beta** con características experimentales como **Endless Mode** (arquitectura de memoria biomimética para sesiones extendidas). Cambia entre versiones estables y beta desde la interfaz del visor web en http://localhost:37777 → Settings.

Ver **[Documentación de Características Beta](https://docs.claude-mem-file.ai/beta-features)** para detalles sobre Endless Mode y cómo probarlo.

---

## Requisitos del Sistema

- **Node.js**: 18.0.0 o superior
- **Claude Code**: Última versión con soporte de plugins
- **Bun**: Runtime de JavaScript y gestor de procesos (se instala automáticamente si falta)

---

### Notas de Configuración en Windows

Si ves un error como:

```powershell
npm : The term 'npm' is not recognized as the name of a cmdlet
```

Asegúrate de que Node.js y npm estén instalados y añadidos a tu PATH. Descarga el instalador más reciente de Node.js desde https://nodejs.org y reinicia tu terminal después de la instalación.

---

## Configuración

Los ajustes se gestionan en `~/.claude-mem-file/settings.json` (se crea automáticamente con valores predeterminados en la primera ejecución). Configura el modelo de IA, puerto del worker, directorio de datos, nivel de registro y ajustes de inyección de contexto.

Ver la **[Guía de Configuración](https://docs.claude-mem-file.ai/configuration)** para todos los ajustes disponibles y ejemplos.

### Configuración de Modo e Idioma

Claude-Mem-File admite múltiples modos de flujo de trabajo e idiomas mediante el ajuste `CLAUDE_MEM_MODE`.

Esta opción controla tanto:

- El comportamiento del flujo de trabajo (p. ej., code, chill, investigation)
- El idioma utilizado en las observaciones generadas

#### Cómo Configurar

Edita tu archivo de ajustes en `~/.claude-mem-file/settings.json`:

```json
{
  "CLAUDE_MEM_MODE": "code--zh"
}
```

Los modos están definidos en `plugin/modes/`. Para ver todos los modos disponibles localmente:

```bash
ls ~/.claude/plugins/marketplaces/reduardo7/plugin/modes/
```

#### Modos Disponibles

| Modo       | Descripción                    |
| ---------- | ------------------------------ |
| `code`     | Modo inglés predeterminado     |
| `code--zh` | Modo chino simplificado        |
| `code--ja` | Modo japonés                   |

Los modos específicos de idioma siguen el patrón `code--[lang]` donde `[lang]` es el código de idioma ISO 639-1 (p. ej., `zh` para chino, `ja` para japonés, `es` para español).

> Nota: `code--zh` (chino simplificado) ya está incorporado — no se requiere instalación adicional ni actualización del plugin.

#### Después de Cambiar el Modo

Reinicia Claude Code para aplicar la nueva configuración de modo.

## Desarrollo

Ver la **[Guía de Desarrollo](https://docs.claude-mem-file.ai/development)** para instrucciones de compilación, pruebas y flujo de contribución.

---

## Solución de Problemas

Si experimentas problemas, describe el problema a Claude y la habilidad troubleshoot diagnosticará automáticamente y proporcionará soluciones.

Ver la **[Guía de Solución de Problemas](https://docs.claude-mem-file.ai/troubleshooting)** para problemas comunes y soluciones.

---

## Reportes de Errores

Crea reportes de errores completos con el generador automático:

```bash
cd ~/.claude/plugins/marketplaces/reduardo7
npm run bug-report
```

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor:

1. Haz fork del repositorio
2. Crea una rama de característica
3. Realiza tus cambios con pruebas
4. Actualiza la documentación
5. Envía un Pull Request

Ver [Guía de Desarrollo](https://docs.claude-mem-file.ai/development) para el flujo de contribución.

---

## Licencia

Este proyecto está licenciado bajo la **GNU Affero General Public License v3.0** (AGPL-3.0).

Copyright (C) 2025 Alex Newman (@thedotmack). Todos los derechos reservados.

Ver el archivo [LICENSE](LICENSE) para detalles completos.

**Lo Que Esto Significa:**

- Puedes usar, modificar y distribuir este software libremente
- Si modificas y despliegas en un servidor de red, debes hacer tu código fuente disponible
- Los trabajos derivados también deben estar licenciados bajo AGPL-3.0
- NO hay GARANTÍA para este software

**Nota sobre Ragtime**: El directorio `ragtime/` está licenciado por separado bajo la **PolyForm Noncommercial License 1.0.0**. Ver [ragtime/LICENSE](ragtime/LICENSE) para detalles.

---

## Soporte

- **Documentación**: [docs/](../)
- **Problemas**: [GitHub Issues](https://github.com/reduardo7/claude-mem-file/issues)
- **Repositorio**: [github.com/reduardo7/claude-mem-file](https://github.com/reduardo7/claude-mem-file)
- **Cuenta Oficial X**: [@Claude_Memory](https://x.com/Claude_Memory)
- **Discord Oficial**: [Unirse a Discord](https://discord.com/invite/J4wttp9vDu)
- **Autor**: Alex Newman ([@thedotmack](https://github.com/thedotmack))

---

**Construido con Claude Agent SDK** | **Impulsado por Claude Code** | **Hecho con TypeScript**

---

### ¿Qué hay de $CMEM?

$CMEM es un token de Solana creado por un tercero sin el consentimiento previo de Claude-Mem-File, pero oficialmente respaldado por el creador de Claude-Mem-File (Alex Newman, @thedotmack). El token actúa como catalizador comunitario para el crecimiento y un vehículo para llevar datos de agentes en tiempo real a los desarrolladores y trabajadores del conocimiento que más lo necesitan. $CMEM: 2TsmuYUrsctE57VLckZBYEEzdokUF8j8e1GavekWBAGS
