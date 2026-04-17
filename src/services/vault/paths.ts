/**
 * Resolve where the Markdown vault lives.
 *
 * Rule: the vault is per-project and lives at `<project-root>/docs/vault/`.
 * Project root is discovered by walking up from `cwd` looking for package.json
 * or a `.git` directory.
 */

import { existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

export const VAULT_DIR_NAME = 'docs/vault';

export interface VaultPaths {
  root: string;
  observations: string;
  sessions: string;
  indexes: string;
  obsidianConfig: string;
  readme: string;
  home: string;
  gitignore: string;
}

export function findProjectRoot(startDir: string = process.cwd()): string {
  const origin = resolve(startDir);
  let current = origin;
  // On Windows `resolve('/')` is not a reliable filesystem-root string, so we
  // stop once `dirname(current)` stops changing — a portable way to detect
  // "can't go up anymore".
  while (true) {
    if (existsSync(resolve(current, 'package.json')) || existsSync(resolve(current, '.git'))) {
      return current;
    }
    const parent = dirname(current);
    if (parent === current) return origin;
    current = parent;
  }
}

export function resolveVaultRoot(startDir?: string): string {
  const override = process.env.CLAUDE_MEM_VAULT_ROOT;
  if (override && override.trim()) {
    return resolve(override.trim());
  }
  const projectRoot = findProjectRoot(startDir);
  return resolve(projectRoot, VAULT_DIR_NAME);
}

export function getVaultPaths(root: string = resolveVaultRoot()): VaultPaths {
  return {
    root,
    observations: resolve(root, 'observations'),
    sessions: resolve(root, 'sessions'),
    indexes: resolve(root, 'indexes'),
    obsidianConfig: resolve(root, '.obsidian'),
    readme: resolve(root, 'README.md'),
    home: resolve(root, 'Home.md'),
    gitignore: resolve(root, '.gitignore'),
  };
}

export function vaultExists(paths: VaultPaths = getVaultPaths()): boolean {
  try {
    return statSync(paths.root).isDirectory();
  } catch {
    return false;
  }
}

export function dateFolder(epochMs: number): string {
  const d = new Date(epochMs);
  const yyyy = d.getUTCFullYear();
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(d.getUTCDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
