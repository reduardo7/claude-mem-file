# Claude-Mem-File: AI Development Instructions

Claude-mem-file is a Claude Code plugin providing persistent memory across sessions. Learnings captured during each session are stored as Markdown files in a per-project Obsidian-style vault at `<project-root>/docs/vault/`, committed to git so collaborators and future sessions share the same context.

## Architecture

**5 Lifecycle Hooks**: SessionStart → UserPromptSubmit → PostToolUse → Summary → SessionEnd

**Hooks** (`src/hooks/*.ts`) - TypeScript → ESM, built to `plugin/scripts/*-hook.js`

**Worker Service** (`src/services/worker-service.ts`) - Express API on port 37777, Bun-managed, handles AI processing asynchronously

**Search Skill** (`plugin/skills/mem-search/SKILL.md`) - HTTP API for searching past work, auto-invoked when users ask about history

**Planning Skill** (`plugin/skills/make-plan/SKILL.md`) - Orchestrator instructions for creating phased implementation plans with documentation discovery

**Execution Skill** (`plugin/skills/do/SKILL.md`) - Orchestrator instructions for executing phased plans using subagents

**Vault Module** (`src/services/vault/`) - Per-project Markdown vault that stores sessions, observations, summaries, prompts as `.md` files with YAML frontmatter. Indexed in-memory via `minisearch`, live-updated via `chokidar`. Lives at `<project-root>/docs/vault/` and is versioned via git. See `docs/markdown-vault-refactor-plan.md` for the full design.

**DualWriteBridge** (`src/services/worker/DualWriteBridge.ts`) - Installed by `DatabaseManager.initialize()`. Monkey-patches `SessionStore.storeObservation / storeObservations / storeSummary` so every write the agents perform is mirrored into the Markdown vault. The vault is the **canonical, mergeable source of truth**; SQLite at `~/.claude-mem-file/claude-mem-file.db` is now a disposable local cache that powers the agent queue and can be regenerated from the vault.

**No more Chroma** - `src/services/sync/` was removed in the vault refactor; semantic/vector search is gone. `minisearch` over the vault replaces it for fuzzy/keyword search; SQLite FTS5 remains for legacy strategy-based search.

**Project Docs** (`docs/`) - Project-level design docs, architecture notes, issue reports. Separate from `docs/vault/` which holds hook-captured memories.

**Viewer UI** (`src/ui/viewer/`) - React interface at http://localhost:37777, built to `plugin/ui/viewer.html`

## Privacy Tags
- `<private>content</private>` - User-level privacy control (manual, prevents storage)

**Implementation**: Tag stripping happens at hook layer (edge processing) before data reaches worker/database. See `src/utils/tag-stripping.ts` for shared utilities.

## Build Commands

```bash
npm run build-and-sync        # Build, sync to marketplace, restart worker
```

## Configuration

Settings are managed in `~/.claude-mem-file/settings.json`. The file is auto-created with defaults on first run.

## File Locations

- **Source**: `<project-root>/src/`
- **Built Plugin**: `<project-root>/plugin/`
- **Installed Plugin**: `~/.claude/plugins/marketplaces/thedotmack/`
- **Memory Vault**: `<project-root>/docs/vault/` (versioned via git, per-project, mergeable)
- **Project Docs**: `<project-root>/docs/` (architectural decisions, design notes)

## Migration from Legacy SQLite

Historical users can migrate prior memories from `~/.claude-mem-file/claude-mem-file.db` into the new vault format with:

```bash
npm run migrate-to-vault               # run migration
npm run migrate-to-vault:dry           # preview without writing
bun scripts/migrate-to-vault.ts --help # full flag reference
```

The SQLite DB is opened read-only; migration is idempotent (SHA-256 content hashes dedup re-runs).

## Exit Code Strategy

Claude-mem-file hooks use specific exit codes per Claude Code's hook contract:

- **Exit 0**: Success or graceful shutdown (Windows Terminal closes tabs)
- **Exit 1**: Non-blocking error (stderr shown to user, continues)
- **Exit 2**: Blocking error (stderr fed to Claude for processing)

**Philosophy**: Worker/hook errors exit with code 0 to prevent Windows Terminal tab accumulation. The wrapper/plugin layer handles restart logic. ERROR-level logging is maintained for diagnostics.

See `private/context/claude-code/exit-codes.md` for full hook behavior matrix.

## Requirements

- **Bun** (all platforms - auto-installed if missing)
- Node.js

## Documentation

**Public Docs**: https://docs.claude-mem-file.ai (Mintlify)
**Source**: `docs/public/` - MDX files, edit `docs.json` for navigation
**Deploy**: Auto-deploys from GitHub on push to main

## Pro Features Architecture

Claude-mem-file is designed with a clean separation between open-source core functionality and optional Pro features.

**Open-Source Core** (this repository):

- All worker API endpoints on localhost:37777 remain fully open and accessible
- Pro features are headless - no proprietary UI elements in this codebase
- Pro integration points are minimal: settings for license keys, tunnel provisioning logic
- The architecture ensures Pro features extend rather than replace core functionality

**Pro Features** (coming soon, external):

- Enhanced UI (Memory Stream) connects to the same localhost:37777 endpoints as the open viewer
- Additional features like advanced filtering, timeline scrubbing, and search tools
- Access gated by license validation, not by modifying core endpoints
- Users without Pro licenses continue using the full open-source viewer UI without limitation

This architecture preserves the open-source nature of the project while enabling sustainable development through optional paid features.

## Docs as Shared Memory (Obsidian-style)

Two Obsidian-compatible vaults live in the repo:

- `docs/` — curated project documentation: architecture, design decisions, plans, incident reports. Humans edit these.
- `docs/vault/` — hook-populated memory (sessions, observations, summaries). Claude writes these via the vault module; humans can edit freely.

Both are versioned in git and mergeable. No binary data, no local-only state — everything that matters travels with the repo.

- Prefer writing context/decisions/plans to `docs/` over ephemeral conversation notes
- Files in `docs/` and `docs/vault/` are the source of truth for project knowledge
- This memory is collaborative: changes are committed and shared via git

## Important

No need to edit the changelog ever, it's generated automatically.
