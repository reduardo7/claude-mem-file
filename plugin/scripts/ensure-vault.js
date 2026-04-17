#!/usr/bin/env node
/**
 * Ensure the current project has a blank Obsidian-compatible memory vault at
 * `<project-root>/docs/vault/`.
 *
 * Runs from the SessionStart hook. Idempotent and safe to re-run on every
 * session — only creates files that do not already exist.
 */

import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const VAULT_DIR_NAME = 'docs/vault';

const README_BODY = `# Memory Vault

This folder is an [Obsidian](https://obsidian.md)-compatible Markdown vault where
[claude-mem-file](https://github.com/reduardo7/claude-mem-file) stores the
learnings captured during each Claude Code session.

- **sessions/** — one Markdown file per session, grouped by date
- **observations/** — one Markdown file per captured observation
- **indexes/** — auto-generated maps-of-content (optional)

Everything here is plain Markdown with YAML frontmatter, so the contents are
**mergeable via git** and can be browsed/edited in Obsidian.
`;

const HOME_BODY = `---
tags: [moc, home]
---

# Memory Vault

This vault is populated automatically by claude-mem-file hooks. See
\`observations/\` and \`sessions/\` for the actual content.
`;

function findProjectRoot(startDir = process.cwd()) {
  const origin = resolve(startDir);
  let current = origin;
  // Portable root detection: on Windows `resolve('/')` is not the same
  // string as the actual filesystem root. Stop when dirname() is idempotent.
  while (true) {
    if (existsSync(resolve(current, 'package.json')) || existsSync(resolve(current, '.git'))) {
      return current;
    }
    const parent = dirname(current);
    if (parent === current) return origin;
    current = parent;
  }
}

function writeIfMissing(path, body) {
  if (!existsSync(path)) {
    writeFileSync(path, body, 'utf8');
    return true;
  }
  return false;
}

function ensureVault(projectRoot = findProjectRoot()) {
  const envOverride = process.env.CLAUDE_MEM_VAULT_ROOT?.trim();
  const root = envOverride ? resolve(envOverride) : resolve(projectRoot, VAULT_DIR_NAME);
  let anyCreated = false;

  for (const dir of [root, resolve(root, 'observations'), resolve(root, 'sessions'), resolve(root, 'indexes'), resolve(root, '.obsidian')]) {
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
      anyCreated = true;
    }
  }

  if (writeIfMissing(resolve(root, 'README.md'), README_BODY)) anyCreated = true;
  if (writeIfMissing(resolve(root, 'Home.md'), HOME_BODY)) anyCreated = true;
  if (writeIfMissing(resolve(root, '.gitignore'), '# everything in this vault is versioned\n')) anyCreated = true;
  if (writeIfMissing(resolve(root, '.obsidian/app.json'), '{}\n')) anyCreated = true;
  if (writeIfMissing(resolve(root, '.obsidian/core-plugins.json'), '[]\n')) anyCreated = true;

  return { vaultRoot: root, wasCreated: anyCreated };
}

try {
  const result = ensureVault();
  if (result.wasCreated) {
    console.error(`[claude-mem-file] Scaffolded memory vault at ${result.vaultRoot}`);
  }
  // Silent when nothing changed — don't spam stderr on every session start.
} catch (err) {
  // Never block the session start on vault scaffolding. Log to stderr so the
  // user can diagnose but exit 0 so the hook doesn't fail.
  console.error(`[claude-mem-file] Vault scaffolding skipped: ${err && err.message ? err.message : err}`);
}
process.exit(0);
