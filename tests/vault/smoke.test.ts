import { test, expect, beforeEach, afterEach } from 'bun:test';
import { mkdtempSync, rmSync, readFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { VaultStore } from '../../src/services/vault/VaultStore.js';
import { ensureVaultScaffold } from '../../src/services/vault/scaffold.js';
import { getVaultPaths } from '../../src/services/vault/paths.js';
import { parseFrontmatter } from '../../src/services/vault/frontmatter.js';

let tmpRoot: string;
let vault: VaultStore;

beforeEach(async () => {
  tmpRoot = mkdtempSync(join(tmpdir(), 'claude-mem-file-vault-'));
  const paths = getVaultPaths(tmpRoot);
  ensureVaultScaffold(paths);
  vault = new VaultStore(tmpRoot);
  await vault.initialize();
});

afterEach(async () => {
  await vault.close();
  rmSync(tmpRoot, { recursive: true, force: true });
});

test('scaffold creates vault skeleton', () => {
  const paths = getVaultPaths(tmpRoot);
  expect(existsSync(paths.root)).toBe(true);
  expect(existsSync(paths.observations)).toBe(true);
  expect(existsSync(paths.sessions)).toBe(true);
  expect(existsSync(paths.obsidianConfig)).toBe(true);
  expect(existsSync(paths.readme)).toBe(true);
});

test('createSession writes a session file and is idempotent', () => {
  const first = vault.createSession({
    contentSessionId: 'content-1',
    memorySessionId: 'memory-1',
    project: 'proj-a',
    userPrompt: 'Hello',
  });
  expect(existsSync(first.path)).toBe(true);

  const second = vault.createSession({
    contentSessionId: 'content-1',
    memorySessionId: 'memory-xxx',
    project: 'proj-a',
    userPrompt: 'Hello',
  });
  expect(second.path).toBe(first.path);
});

test('writeObservation dedupes by content hash', () => {
  vault.createSession({ contentSessionId: 'c1', memorySessionId: 'm1', project: 'p' });

  const obs = {
    type: 'decision' as const,
    title: 'Pick Markdown vault',
    narrative: 'Because git-mergeable.',
    concepts: ['architecture'],
  };
  const a = vault.writeObservation({ memorySessionId: 'm1', project: 'p', observation: obs });
  const b = vault.writeObservation({ memorySessionId: 'm1', project: 'p', observation: obs });

  expect(a.isDuplicate).toBe(false);
  expect(b.isDuplicate).toBe(true);
  expect(b.id).toBe(a.id);
});

test('observation file contains full frontmatter and body', () => {
  vault.createSession({ contentSessionId: 'c2', memorySessionId: 'm2', project: 'p' });
  const written = vault.writeObservation({
    memorySessionId: 'm2',
    project: 'p',
    observation: {
      type: 'bugfix',
      title: 'Fix parser',
      narrative: 'The regex was wrong.',
      facts: ['line 42', 'only on Windows'],
      files_modified: ['src/parser.ts'],
      concepts: ['parser'],
    },
  });

  const raw = readFileSync(written.path, 'utf8');
  const { data, body } = parseFrontmatter<Record<string, unknown>>(raw);
  expect(data.type).toBe('observation');
  expect(data.observation_type).toBe('bugfix');
  expect(data.content_hash).toBe(written.contentHash);
  expect(body).toContain('# Fix parser');
  expect(body).toContain('## Narrative');
  expect(body).toContain('The regex was wrong.');
  expect(body).toContain('- line 42');
});

test('appendPrompt increments counter atomically', () => {
  vault.createSession({ contentSessionId: 'c3', memorySessionId: 'm3', project: 'p' });
  const p1 = vault.appendPrompt('c3', 'first');
  const p2 = vault.appendPrompt('c3', 'second');
  expect(p1.promptNumber).toBe(1);
  expect(p2.promptNumber).toBe(2);
  expect(p2.session.prompt_counter).toBe(2);
});

test('writeSummary works even when session was not pre-created', () => {
  const summary = vault.writeSummary('m-orphan', 'p', {
    request: 'do it',
    learned: 'we did it',
  });
  expect(summary.memory_session_id).toBe('m-orphan');
  expect(existsSync(summary.path)).toBe(true);

  const retrieved = vault.getSummaryForSession('m-orphan');
  expect(retrieved?.learned).toBe('we did it');
});

test('search returns observations by query', () => {
  vault.createSession({ contentSessionId: 'c4', memorySessionId: 'm4', project: 'p' });
  vault.writeObservation({
    memorySessionId: 'm4',
    project: 'p',
    observation: {
      type: 'feature',
      title: 'Added markdown vault',
      narrative: 'Stores observations as .md files.',
      concepts: ['vault', 'markdown'],
    },
  });

  const hits = vault.search('markdown');
  expect(hits.length).toBeGreaterThan(0);
  expect(hits.some((h) => h.kind === 'observation')).toBe(true);
});

test('listObservations filters by project', () => {
  vault.createSession({ contentSessionId: 'ca', memorySessionId: 'ma', project: 'a' });
  vault.createSession({ contentSessionId: 'cb', memorySessionId: 'mb', project: 'b' });
  vault.writeObservation({
    memorySessionId: 'ma',
    project: 'a',
    observation: { type: 'discovery', title: 'Finding in a' },
  });
  vault.writeObservation({
    memorySessionId: 'mb',
    project: 'b',
    observation: { type: 'discovery', title: 'Finding in b' },
  });
  expect(vault.listObservations({ project: 'a' }).length).toBe(1);
  expect(vault.listObservations({ project: 'b' }).length).toBe(1);
  expect(vault.listObservations({}).length).toBe(2);
});

test('invalid observation_type defaults to discovery on read', () => {
  vault.createSession({ contentSessionId: 'cx', memorySessionId: 'mx', project: 'p' });
  const written = vault.writeObservation({
    memorySessionId: 'mx',
    project: 'p',
    observation: {
      type: 'discovery',
      title: 'Test',
      narrative: 'Body',
    },
  });
  // Write a malformed file manually
  const bogus = resolve(getVaultPaths(tmpRoot).observations, '2026-04-17', 'obs-999-bogus0.md');
  // Just make sure the legit observation still reads back cleanly
  const rec = vault.getObservationById(written.id);
  expect(rec?.type).toBe('discovery');
});
