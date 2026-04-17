import { test, expect } from 'bun:test';
import { mkdtempSync, rmSync, existsSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
// @ts-expect-error — bun:sqlite has no @types
import { Database } from 'bun:sqlite';
import { spawnSync } from 'node:child_process';

function seedDb(dbPath: string): void {
  const db = new Database(dbPath);
  db.run(`
    CREATE TABLE sdk_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content_session_id TEXT UNIQUE NOT NULL,
      memory_session_id TEXT,
      project TEXT NOT NULL,
      platform_source TEXT,
      user_prompt TEXT,
      custom_title TEXT,
      started_at TEXT,
      started_at_epoch INTEGER NOT NULL,
      completed_at TEXT,
      completed_at_epoch INTEGER,
      status TEXT,
      worker_port INTEGER,
      prompt_counter INTEGER
    );
    CREATE TABLE observations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      memory_session_id TEXT NOT NULL,
      project TEXT NOT NULL,
      text TEXT,
      type TEXT NOT NULL,
      title TEXT,
      subtitle TEXT,
      facts TEXT,
      narrative TEXT,
      concepts TEXT,
      files_read TEXT,
      files_modified TEXT,
      prompt_number INTEGER,
      discovery_tokens INTEGER,
      model TEXT,
      model_id TEXT,
      created_at_epoch INTEGER NOT NULL
    );
    CREATE TABLE session_summaries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      memory_session_id TEXT NOT NULL,
      project TEXT NOT NULL,
      request TEXT,
      investigated TEXT,
      learned TEXT,
      completed TEXT,
      next_steps TEXT,
      notes TEXT,
      files_read TEXT,
      files_edited TEXT,
      prompt_number INTEGER,
      discovery_tokens INTEGER,
      model TEXT,
      model_id TEXT,
      created_at_epoch INTEGER NOT NULL
    );
    CREATE TABLE user_prompts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content_session_id TEXT NOT NULL,
      prompt_number INTEGER NOT NULL,
      prompt_text TEXT NOT NULL,
      created_at_epoch INTEGER NOT NULL
    );
  `);
  db.run(
    `INSERT INTO sdk_sessions (content_session_id, memory_session_id, project, started_at_epoch, status)
     VALUES ('c1', 'm1', 'demo', 1700000000000, 'completed')`
  );
  db.run(
    `INSERT INTO observations (memory_session_id, project, text, type, title, narrative, created_at_epoch)
     VALUES ('m1', 'demo', 'body', 'decision', 'Pick vault', 'Because mergeable', 1700000001000)`
  );
  db.run(
    `INSERT INTO session_summaries (memory_session_id, project, request, learned, created_at_epoch)
     VALUES ('m1', 'demo', 'do it', 'did it', 1700000002000)`
  );
  db.run(
    `INSERT INTO user_prompts (content_session_id, prompt_number, prompt_text, created_at_epoch)
     VALUES ('c1', 1, 'hello', 1700000000000)`
  );
  db.close();
}

test('migrate-to-vault CLI copies SQLite data into the vault', () => {
  const root = mkdtempSync(join(tmpdir(), 'claude-mem-file-migrate-'));
  const dbPath = resolve(root, 'legacy.db');
  const vaultRoot = resolve(root, 'docs', 'vault');
  try {
    seedDb(dbPath);

    const script = resolve(import.meta.dir, '../../scripts/migrate-to-vault.ts');
    const result = spawnSync('bun', ['run', script, '--db', dbPath, '--out', vaultRoot], {
      encoding: 'utf8',
    });

    expect(result.status).toBe(0);
    expect(result.stdout).toContain('Migration complete');

    expect(existsSync(resolve(vaultRoot, 'sessions'))).toBe(true);
    expect(existsSync(resolve(vaultRoot, 'observations'))).toBe(true);
    const obsDirs = readdirSync(resolve(vaultRoot, 'observations'));
    expect(obsDirs.length).toBeGreaterThan(0);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test('migrate-to-vault CLI rejects flag without value', () => {
  const script = resolve(import.meta.dir, '../../scripts/migrate-to-vault.ts');
  const result = spawnSync('bun', ['run', script, '--db'], { encoding: 'utf8' });
  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain('requires a value');
});

test('migrate-to-vault CLI is idempotent (second run dedupes)', () => {
  const root = mkdtempSync(join(tmpdir(), 'claude-mem-file-migrate-'));
  const dbPath = resolve(root, 'legacy.db');
  const vaultRoot = resolve(root, 'docs', 'vault');
  try {
    seedDb(dbPath);
    const script = resolve(import.meta.dir, '../../scripts/migrate-to-vault.ts');

    spawnSync('bun', ['run', script, '--db', dbPath, '--out', vaultRoot], { encoding: 'utf8' });
    const second = spawnSync('bun', ['run', script, '--db', dbPath, '--out', vaultRoot], {
      encoding: 'utf8',
    });
    expect(second.status).toBe(0);
    expect(second.stdout).toContain('1 duplicates');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
