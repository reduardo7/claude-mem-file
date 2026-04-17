import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { getVaultPaths, type VaultPaths } from './paths.js';

const README_BODY = `# Memory Vault

This folder is an [Obsidian](https://obsidian.md)-compatible Markdown vault where
[claude-mem-file](https://github.com/thedotmack/claude-mem-file) stores the
learnings captured during each Claude Code session.

- **sessions/** — one Markdown file per session, grouped by date
- **observations/** — one Markdown file per captured observation
- **indexes/** — auto-generated maps-of-content (optional)

Everything here is plain Markdown with YAML frontmatter, so the contents are
**mergeable via git** and can be browsed/edited in Obsidian.

> Tip: open this folder as a vault in Obsidian to explore the knowledge graph.
`;

const HOME_BODY = `---
tags: [moc, home]
---

# Memory Vault

This vault is populated automatically by claude-mem-file hooks. See
\`observations/\` and \`sessions/\` for the actual content.
`;

const OBSIDIAN_APP_JSON = `{}\n`;
const OBSIDIAN_CORE_PLUGINS_JSON = `[]\n`;

export interface ScaffoldResult {
  created: boolean;
  paths: VaultPaths;
}

export function ensureVaultScaffold(paths: VaultPaths = getVaultPaths()): ScaffoldResult {
  let created = false;
  const mkdir = (p: string) => {
    if (!existsSync(p)) {
      mkdirSync(p, { recursive: true });
      created = true;
    }
  };
  mkdir(paths.root);
  mkdir(paths.observations);
  mkdir(paths.sessions);
  mkdir(paths.indexes);
  mkdir(paths.obsidianConfig);

  const writeIfMissing = (p: string, body: string) => {
    if (!existsSync(p)) {
      writeFileSync(p, body, 'utf8');
      created = true;
    }
  };
  writeIfMissing(paths.readme, README_BODY);
  writeIfMissing(paths.home, HOME_BODY);
  writeIfMissing(paths.gitignore, '# everything in this vault is versioned\n');
  writeIfMissing(`${paths.obsidianConfig}/app.json`, OBSIDIAN_APP_JSON);
  writeIfMissing(`${paths.obsidianConfig}/core-plugins.json`, OBSIDIAN_CORE_PLUGINS_JSON);

  return { created, paths };
}
