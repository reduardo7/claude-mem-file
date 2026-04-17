import { getVaultPaths, type VaultPaths } from './paths.js';
import { listObservations } from './observations.js';
import { listSessions } from './sessions.js';
import type { TimelineData, TimelineEntry } from './types.js';

function buildEntries(project?: string, paths: VaultPaths = getVaultPaths()): TimelineEntry[] {
  const obs = listObservations({ project }, paths);
  const sessions = listSessions({ project }, paths);
  const entries: TimelineEntry[] = [];
  for (const o of obs) {
    entries.push({
      id: o.id,
      kind: 'observation',
      title: o.title,
      project: o.project,
      created_at: o.created_at,
      created_at_epoch: o.created_at_epoch,
    });
  }
  for (const s of sessions) {
    entries.push({
      id: s.id,
      kind: 'session',
      title: s.custom_title ?? s.user_prompt,
      project: s.project,
      created_at: s.started_at,
      created_at_epoch: s.started_at_epoch,
    });
  }
  entries.sort((a, b) => a.created_at_epoch - b.created_at_epoch);
  return entries;
}

export function timelineAroundTimestamp(
  epochMs: number,
  opts: { depthBefore?: number; depthAfter?: number; project?: string } = {},
  paths: VaultPaths = getVaultPaths(),
): TimelineData {
  const { depthBefore = 3, depthAfter = 3, project } = opts;
  const entries = buildEntries(project, paths);
  const pivot = entries.findIndex((e) => e.created_at_epoch >= epochMs);
  const pivotIdx = pivot === -1 ? entries.length : pivot;
  const before = entries.slice(Math.max(0, pivotIdx - depthBefore), pivotIdx);
  const anchor = entries[pivotIdx] ?? null;
  const after = entries.slice(pivotIdx + 1, pivotIdx + 1 + depthAfter);
  return { before, anchor, after };
}

export function timelineAroundId(
  id: string,
  opts: { depthBefore?: number; depthAfter?: number; project?: string } = {},
  paths: VaultPaths = getVaultPaths(),
): TimelineData {
  const { depthBefore = 3, depthAfter = 3, project } = opts;
  const entries = buildEntries(project, paths);
  const pivotIdx = entries.findIndex((e) => e.id === id);
  if (pivotIdx === -1) return { before: [], anchor: null, after: [] };
  const before = entries.slice(Math.max(0, pivotIdx - depthBefore), pivotIdx);
  const anchor = entries[pivotIdx];
  const after = entries.slice(pivotIdx + 1, pivotIdx + 1 + depthAfter);
  return { before, anchor, after };
}
