import { mkdirSync, renameSync, writeFileSync, readFileSync, unlinkSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

export function atomicWrite(path: string, content: string): void {
  const dir = dirname(path);
  // mkdirSync with recursive is idempotent — no need for an existsSync check
  // that would also introduce a TOCTOU race.
  mkdirSync(dir, { recursive: true });
  const tmp = resolve(dir, `.${Date.now()}-${Math.random().toString(36).slice(2, 8)}.tmp`);
  try {
    writeFileSync(tmp, content, 'utf8');
    renameSync(tmp, path);
  } catch (err) {
    // Best-effort cleanup so failed writes don't leak tmp files forever.
    try {
      unlinkSync(tmp);
    } catch {
      // tmp never got created — nothing to clean up
    }
    throw err;
  }
}

export function readIfExists(path: string): string | null {
  try {
    return readFileSync(path, 'utf8');
  } catch {
    return null;
  }
}
