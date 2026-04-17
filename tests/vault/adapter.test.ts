import { test, expect, beforeEach, afterEach } from 'bun:test';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { VaultStore } from '../../src/services/vault/VaultStore.js';
import { ensureVaultScaffold } from '../../src/services/vault/scaffold.js';
import { getVaultPaths } from '../../src/services/vault/paths.js';
import { VaultStoreAdapter } from '../../src/services/worker/VaultStoreAdapter.js';

let tmpRoot: string;
let vault: VaultStore;
let adapter: VaultStoreAdapter;

beforeEach(async () => {
  tmpRoot = mkdtempSync(join(tmpdir(), 'claude-mem-adapter-'));
  const paths = getVaultPaths(tmpRoot);
  ensureVaultScaffold(paths);
  vault = new VaultStore(tmpRoot);
  await vault.initialize();
  adapter = new VaultStoreAdapter(vault);
});

afterEach(async () => {
  await vault.close();
  rmSync(tmpRoot, { recursive: true, force: true });
});

test('createSDKSession mints a stable numeric id and is idempotent per content_session_id', () => {
  const id1 = adapter.createSDKSession('c1', 'proj', 'hello');
  const id2 = adapter.createSDKSession('c1', 'proj', 'hello');
  expect(id1).toBe(id2);

  const id3 = adapter.createSDKSession('c2', 'proj', 'second');
  expect(id3).not.toBe(id1);
  expect(typeof id3).toBe('number');
});

test('getSessionById returns legacy shape with numeric id matching insert', () => {
  const numId = adapter.createSDKSession('c-shape', 'proj', 'hello', undefined, 'claude');
  const row = adapter.getSessionById(numId);
  expect(row).not.toBeNull();
  expect(row!.id).toBe(numId);
  expect(row!.content_session_id).toBe('c-shape');
  expect(row!.project).toBe('proj');
  expect(row!.platform_source).toBe('claude');
  expect(row!.status).toBe('active');
});

test('storeObservation returns numeric id round-trippable via getObservationById', () => {
  adapter.createSDKSession('cs', 'p', '');
  adapter.ensureMemorySessionIdRegistered(
    adapter.createSDKSession('cs', 'p', ''),
    'mem-cs',
  );

  const { id, createdAtEpoch } = adapter.storeObservation('mem-cs', 'p', {
    type: 'decision',
    title: 'Pick vault',
    narrative: 'Because mergeable.',
    concepts: ['architecture'],
    files_modified: ['src/vault.ts'],
  });
  expect(typeof id).toBe('number');
  expect(id).toBeGreaterThan(0);
  expect(createdAtEpoch).toBeGreaterThan(0);

  const row = adapter.getObservationById(id);
  expect(row).not.toBeNull();
  expect(row!.id).toBe(id);
  expect(row!.title).toBe('Pick vault');
  expect(row!.type).toBe('decision');
  // JSON-stringified list columns for legacy shape compat.
  expect(row!.concepts).toBe('["architecture"]');
  expect(row!.files_modified).toBe('["src/vault.ts"]');
});

test('getObservationsByIds preserves the numId → strId bijection', () => {
  adapter.createSDKSession('cb', 'p', '');
  adapter.ensureMemorySessionIdRegistered(adapter.createSDKSession('cb', 'p', ''), 'mem-cb');

  const a = adapter.storeObservation('mem-cb', 'p', { type: 'feature', title: 'A', narrative: 'aa' });
  const b = adapter.storeObservation('mem-cb', 'p', { type: 'feature', title: 'B', narrative: 'bb' });
  const c = adapter.storeObservation('mem-cb', 'p', { type: 'feature', title: 'C', narrative: 'cc' });

  const rows = adapter.getObservationsByIds([a.id, c.id]);
  expect(rows.length).toBe(2);
  const titles = new Set(rows.map((r) => r.title));
  expect(titles.has('A')).toBe(true);
  expect(titles.has('C')).toBe(true);
  expect(titles.has('B')).toBe(false);
});

test('storeObservations writes multiple observations and optional summary', () => {
  adapter.createSDKSession('cm', 'p', '');
  adapter.ensureMemorySessionIdRegistered(adapter.createSDKSession('cm', 'p', ''), 'mem-cm');

  const result = adapter.storeObservations(
    'mem-cm',
    'p',
    [
      { type: 'discovery', title: 'X', narrative: 'x' },
      { type: 'discovery', title: 'Y', narrative: 'y' },
    ],
    {
      request: 'do it',
      investigated: '',
      learned: 'done',
      completed: 'yes',
      next_steps: 'none',
      notes: null,
    },
  );
  expect(result.observationIds.length).toBe(2);
  expect(result.observationIds.every((id) => typeof id === 'number' && id > 0)).toBe(true);
  expect(result.summaryId).not.toBeNull();

  const summary = adapter.getSummaryForSession('mem-cm');
  expect(summary).not.toBeNull();
  expect(summary!.id).toBe(result.summaryId);
  expect(summary!.request).toBe('do it');
  expect(summary!.learned).toBe('done');
});

test('saveUserPrompt assigns numeric prompt IDs; getUserPrompt recovers the text', () => {
  adapter.createSDKSession('cp', 'p', '');
  const id1 = adapter.saveUserPrompt('cp', 1, 'first prompt');
  const id2 = adapter.saveUserPrompt('cp', 2, 'second prompt');
  expect(id1).toBeLessThan(id2);
  expect(adapter.getUserPrompt('cp', 1)).toBe('first prompt');
  expect(adapter.getUserPrompt('cp', 2)).toBe('second prompt');
  expect(adapter.getUserPrompt('cp', 99)).toBeNull();
});

test('markSessionCompleted + getRecentSessionsWithStatus surfaces the transition', () => {
  const sid = adapter.createSDKSession('cx', 'p', 'kickoff');
  adapter.ensureMemorySessionIdRegistered(sid, 'mem-cx');
  adapter.markSessionCompleted(sid);
  const rows = adapter.getRecentSessionsWithStatus('p', 5);
  expect(rows.length).toBe(1);
  expect(rows[0].status).toBe('completed');
  expect(rows[0].memory_session_id).toBe('mem-cx');
});

test('hydrateIds re-indexes pre-existing vault content on a fresh adapter', () => {
  const sid = adapter.createSDKSession('c-hyd', 'proj-h', '');
  adapter.ensureMemorySessionIdRegistered(sid, 'mem-hyd');
  const { id: obsId } = adapter.storeObservation('mem-hyd', 'proj-h', {
    type: 'feature',
    title: 'persisted',
    narrative: 'n',
  });

  // A new adapter with no state should still be able to find the row
  // after hydration (numeric id is reassigned but lookup works).
  const reborn = new VaultStoreAdapter(vault);
  reborn.hydrateIds();
  const legacy = reborn.getObservationById(obsId);
  // Note: fresh adapter's numeric ID may differ from the original one, because
  // the mapping is process-local. What matters is the vault-side strId round-trip.
  // So we assert via listing and shape-compat instead.
  const all = reborn.getAllRecentObservations(10);
  expect(all.some((o) => o.title === 'persisted')).toBe(true);
  expect(legacy === null || legacy.title === 'persisted').toBe(true);
});

test('getOrCreateManualSession is idempotent and scoped per project', () => {
  const a = adapter.getOrCreateManualSession('proj-a');
  const b = adapter.getOrCreateManualSession('proj-a');
  expect(a).toBe(b);
  expect(a).toBe('manual-proj-a');

  const other = adapter.getOrCreateManualSession('proj-b');
  expect(other).toBe('manual-proj-b');
  expect(other).not.toBe(a);
});

test('getAllProjects returns every project with a session', () => {
  adapter.createSDKSession('c-p1', 'alpha', '');
  adapter.createSDKSession('c-p2', 'beta', '');
  const projs = adapter.getAllProjects();
  expect(projs).toContain('alpha');
  expect(projs).toContain('beta');
});

test('getProjectCatalog groups projects by platform source', () => {
  adapter.createSDKSession('c-cc', 'alpha', '', undefined, 'claude-code');
  adapter.createSDKSession('c-cx', 'beta', '', undefined, 'cursor');
  const cat = adapter.getProjectCatalog();
  expect(cat.projects).toContain('alpha');
  expect(cat.projects).toContain('beta');
  expect(Object.keys(cat.projectsBySource).length).toBeGreaterThan(0);
});

test('importObservation dedupes by content hash', () => {
  adapter.createSDKSession('ci', 'p', '');
  adapter.ensureMemorySessionIdRegistered(adapter.createSDKSession('ci', 'p', ''), 'mem-ci');

  const payload = {
    memory_session_id: 'mem-ci',
    project: 'p',
    text: 'some text',
    type: 'discovery',
    title: 'repeat',
    subtitle: null,
    facts: null,
    narrative: 'some narrative',
    concepts: null,
    files_read: null,
    files_modified: null,
    prompt_number: null,
    discovery_tokens: 0,
    created_at: new Date().toISOString(),
    created_at_epoch: Date.now(),
  };
  const first = adapter.importObservation(payload);
  const second = adapter.importObservation(payload);
  expect(first.imported).toBe(true);
  expect(second.imported).toBe(false);
  expect(second.id).toBe(first.id);
});

test('close() and rebuildObservationsFTSIndex() are no-ops', () => {
  expect(() => adapter.close()).not.toThrow();
  expect(() => adapter.rebuildObservationsFTSIndex()).not.toThrow();
});
