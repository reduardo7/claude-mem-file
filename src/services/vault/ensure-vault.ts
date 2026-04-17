/**
 * Entry point used by install/session-start scripts: makes sure every project
 * that uses claude-mem-file has a blank Obsidian-compatible vault under
 * `<project-root>/docs/vault/`.
 *
 * Safe to call on every session start — writes are idempotent and only create
 * files that do not already exist.
 */

import { resolveVaultRoot, getVaultPaths, vaultExists } from './paths.js';
import { ensureVaultScaffold } from './scaffold.js';

export interface EnsureVaultResult {
  vaultRoot: string;
  wasCreated: boolean;
  wasUpdated: boolean;
}

export function ensureVault(cwd?: string): EnsureVaultResult {
  const root = resolveVaultRoot(cwd);
  const paths = getVaultPaths(root);
  const existed = vaultExists(paths);
  const { created } = ensureVaultScaffold(paths);
  return {
    vaultRoot: root,
    wasCreated: !existed,
    wasUpdated: created,
  };
}
