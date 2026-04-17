/**
 * VaultStore — the Markdown-vault-backed replacement for the legacy SessionStore.
 *
 * Façade that owns the SearchIndex lifecycle and exposes the surface the HTTP
 * route handlers consume: observations, sessions, summaries, prompts, search,
 * timeline. Everything persists as .md files under `<project-root>/docs/vault/`.
 */

import { getVaultPaths, resolveVaultRoot, type VaultPaths, vaultExists } from './paths.js';
import { ensureVaultScaffold } from './scaffold.js';
import {
  writeObservation,
  readObservationById,
  listObservations,
  listObservationsByIds,
  countObservations,
  type ListObservationsOptions,
  type WriteObservationParams,
  type WrittenObservation,
} from './observations.js';
import {
  createSession,
  readSessionByMemoryId,
  readSessionByContentId,
  readSessionById,
  updateSession,
  appendPrompt,
  writeSummary,
  listSessions,
  listRecentSummaries,
  listRecentPrompts,
  getAllProjects,
  type CreateSessionParams,
} from './sessions.js';
import { SearchIndex, type IndexKind } from './search/SearchIndex.js';
import { indexVault, indexSingleFile } from './search/walker.js';
import { startVaultWatcher } from './search/watcher.js';
import { timelineAroundId, timelineAroundTimestamp } from './timeline.js';
import { logger } from '../../utils/logger.js';
import type {
  ObservationRecord,
  SessionRecord,
  SummaryRecord,
  PromptRecord,
  SummaryInput,
  ObservationInput,
  TimelineData,
} from './types.js';
import type { FSWatcher } from 'chokidar';

export class VaultStore {
  private paths: VaultPaths;
  private index = new SearchIndex();
  private watcher: FSWatcher | null = null;
  private initialized = false;

  constructor(vaultRoot?: string) {
    const root = vaultRoot ?? resolveVaultRoot();
    this.paths = getVaultPaths(root);
  }

  getPaths(): VaultPaths {
    return this.paths;
  }

  /** Ensure the vault exists on disk and build the in-memory index. */
  async initialize(): Promise<void> {
    if (this.initialized) return;
    if (!vaultExists(this.paths)) {
      ensureVaultScaffold(this.paths);
      logger.info('VAULT', `Scaffolded blank vault at ${this.paths.root}`);
    }
    const counts = indexVault(this.index, this.paths);
    logger.info(
      'VAULT',
      `Indexed ${counts.observations} observations and ${counts.sessions} sessions from ${this.paths.root}`,
    );
    this.watcher = startVaultWatcher(this.index, this.paths);
    this.initialized = true;
  }

  async close(): Promise<void> {
    if (this.watcher) {
      await this.watcher.close();
      this.watcher = null;
    }
    this.index.clear();
    this.initialized = false;
  }

  // ---------------- Sessions ----------------

  createSession(params: CreateSessionParams): SessionRecord {
    const session = createSession(params, this.paths);
    this.index.addSession(session);
    return session;
  }

  getSessionById(id: string): SessionRecord | null {
    const loaded = readSessionById(id, this.paths);
    return loaded?.session ?? null;
  }

  getSessionByMemoryId(memorySessionId: string): SessionRecord | null {
    return readSessionByMemoryId(memorySessionId, this.paths)?.session ?? null;
  }

  getSessionByContentId(contentSessionId: string): SessionRecord | null {
    return readSessionByContentId(contentSessionId, this.paths)?.session ?? null;
  }

  updateSession(memorySessionId: string, patch: Partial<SessionRecord>): SessionRecord | null {
    const updated = updateSession(memorySessionId, patch, this.paths);
    if (updated) this.index.addSession(updated);
    return updated;
  }

  markSessionCompleted(memorySessionId: string, status: 'completed' | 'failed' = 'completed'): SessionRecord | null {
    const now = Date.now();
    return this.updateSession(memorySessionId, {
      status,
      completed_at: new Date(now).toISOString(),
      completed_at_epoch: now,
      failed_at_epoch: status === 'failed' ? now : null,
    });
  }

  listSessions(opts?: Parameters<typeof listSessions>[0]): SessionRecord[] {
    return listSessions(opts, this.paths);
  }

  listRecentSessionsWithStatus(project: string, limit = 3): SessionRecord[] {
    return listSessions({ project, limit }, this.paths);
  }

  getAllProjects(): string[] {
    return getAllProjects(this.paths);
  }

  // ---------------- Prompts ----------------

  appendPrompt(contentSessionId: string, promptText: string): { promptNumber: number; session: SessionRecord } {
    const result = appendPrompt(contentSessionId, promptText, this.paths);
    // re-index the session file so the new prompt is searchable
    indexSingleFile(this.index, result.session.path);
    return result;
  }

  getPromptNumber(contentSessionId: string): number {
    return this.getSessionByContentId(contentSessionId)?.prompt_counter ?? 0;
  }

  getLatestPrompt(contentSessionId: string): PromptRecord | null {
    const loaded = readSessionByContentId(contentSessionId, this.paths);
    if (!loaded) return null;
    return loaded.prompts.at(-1) ?? null;
  }

  listRecentPrompts(project?: string, limit = 100): PromptRecord[] {
    return listRecentPrompts(project, limit, this.paths);
  }

  // ---------------- Observations ----------------

  writeObservation(params: WriteObservationParams): WrittenObservation {
    const result = writeObservation(params, this.paths);
    const rec = readObservationById(result.id, this.paths);
    if (rec) this.index.addObservation(rec);
    return result;
  }

  writeObservations(
    memorySessionId: string,
    project: string,
    observations: ObservationInput[],
    options: {
      promptNumber?: number;
      discoveryTokens?: number;
      createdAtEpoch?: number;
      model?: string | null;
      modelId?: string | null;
      summary?: SummaryInput;
    } = {},
  ): { obsIds: string[]; summaryId: string | null; createdAtEpoch: number } {
    const createdAtEpoch = options.createdAtEpoch ?? Date.now();
    const obsIds: string[] = [];
    for (const obs of observations) {
      const written = this.writeObservation({
        memorySessionId,
        project,
        observation: obs,
        promptNumber: options.promptNumber,
        discoveryTokens: options.discoveryTokens,
        createdAtEpoch,
        model: options.model,
        modelId: options.modelId,
      });
      obsIds.push(written.id);
    }
    let summaryId: string | null = null;
    if (options.summary) {
      const summary = this.writeSummary(memorySessionId, project, options.summary, {
        promptNumber: options.promptNumber,
        discoveryTokens: options.discoveryTokens,
        model: options.model,
        modelId: options.modelId,
        createdAtEpoch,
      });
      summaryId = summary.id;
    }
    return { obsIds, summaryId, createdAtEpoch };
  }

  getObservationById(id: string): ObservationRecord | null {
    return readObservationById(id, this.paths);
  }

  getObservationsByIds(ids: string[]): ObservationRecord[] {
    return listObservationsByIds(ids, this.paths);
  }

  listObservations(opts?: ListObservationsOptions): ObservationRecord[] {
    return listObservations(opts, this.paths);
  }

  countObservations(project?: string): number {
    return countObservations(project, this.paths);
  }

  listObservationsForSession(memorySessionId: string): ObservationRecord[] {
    // Scoping the filter to the caller's session avoids loading unrelated
    // observations into the result before discarding them.
    return listObservations({}, this.paths).filter(
      (o) => o.memory_session_id === memorySessionId,
    );
  }

  listRecentObservations(limit = 100): ObservationRecord[] {
    return listObservations({ limit, orderBy: 'date_desc' }, this.paths);
  }

  // ---------------- Summaries ----------------

  writeSummary(
    memorySessionId: string,
    project: string,
    input: SummaryInput,
    options: {
      promptNumber?: number;
      discoveryTokens?: number;
      model?: string | null;
      modelId?: string | null;
      createdAtEpoch?: number;
    } = {},
  ): SummaryRecord {
    const summary = writeSummary(memorySessionId, project, input, options, this.paths);
    this.index.addSummary(summary);
    const session = this.getSessionByMemoryId(memorySessionId);
    if (session) indexSingleFile(this.index, session.path);
    return summary;
  }

  getSummaryForSession(memorySessionId: string): SummaryRecord | null {
    return readSessionByMemoryId(memorySessionId, this.paths)?.summary ?? null;
  }

  listRecentSummaries(project?: string, limit = 10): SummaryRecord[] {
    return listRecentSummaries(project, limit, this.paths);
  }

  // ---------------- Search / Timeline ----------------

  search(query: string, opts: { kind?: IndexKind | IndexKind[]; project?: string; limit?: number; obs_type?: string | string[] } = {}) {
    return this.index.search(query, opts);
  }

  timelineAroundTimestamp(
    epochMs: number,
    opts: { depthBefore?: number; depthAfter?: number; project?: string } = {},
  ): TimelineData {
    return timelineAroundTimestamp(epochMs, opts, this.paths);
  }

  timelineAroundId(
    id: string,
    opts: { depthBefore?: number; depthAfter?: number; project?: string } = {},
  ): TimelineData {
    return timelineAroundId(id, opts, this.paths);
  }
}
