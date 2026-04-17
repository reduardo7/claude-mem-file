---
tags:
  - moc
  - home
---

# claude-mem-file Knowledge Base

> Vault compartido del proyecto claude-mem-file. Toda la documentación vive aquí y se versiona en git para que el equipo pueda colaborar.

## Architecture

- [[architecture-overview]] — Capas del sistema, lifecycle hooks, flujo de datos, storage schema
- [[SESSION_ID_ARCHITECTURE]] — Sistema de doble session ID (contentSessionId / memorySessionId)
- [[production-guide]] — Guía operacional basada en 23 días de uso real (3,400+ observaciones)

## Reference

- [[context/hooks-reference-2026-01-07]] — Hooks de Claude Code: eventos, configuración, ejemplos
- [[context/cursor-hooks-reference]] — Sistema de hooks de Cursor IDE
- [[context/agent-sdk-v2-preview]] — Interface del SDK V2 (unstable): quick start y API reference

## Active Work

- [[anti-pattern-cleanup-plan]] — 132 anti-patrones de error handling por corregir
- [[PR-SHIPPING-REPORT]] — Estado de los 6 PRs abiertos (generado 2026-02-04)

## Bug Fixes

- [[bug-fixes/windows-spaces-issue]] — SDK Agent falla en Windows cuando el path contiene espacios

## Incident Reports

Ver [[reports/README]] para el índice completo de investigaciones y post-mortems.

Highlights:
- [[reports/issue-603-worker-daemon-leaks-child-processes]] — Crítico: 121 procesos huérfanos, 44 GB de memoria
- [[reports/issue-597-too-many-bugs]] — Meta-issue: múltiples regresiones en v9.0.0
- [[reports/VERSION_FIX]] — Post-mortem: version mismatch causando restart loop infinito
- [[reports/2026-01-07--all-open-issues-explained]] — Todos los issues abiertos explicados en inglés simple

## Conventions

- Tags: `#architecture` `#guide` `#report` `#bug-fix` `#reference` `#moc`
- Fechas en frontmatter: `YYYY-MM-DD`
- Status: `active` | `archived` | `in-progress` | `resolved`
- Los archivos bajo `public/` son docs Mintlify (no editar estructura)
- Los archivos bajo `i18n/` son auto-generados (no editar manualmente)
