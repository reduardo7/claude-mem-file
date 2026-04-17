/**
 * VaultStoreAdapter: drop-in replacement for the legacy SQLite-backed
 * `SessionStore`. Exposes the same synchronous surface the HTTP routes,
 * agents, and queue helpers call, but persists every write through the
 * Markdown `VaultStore` under `<project-root>/docs/vault/`.
 *
 * The vault is the canonical storage. SQLite used to mint numeric primary
 * keys; we preserve numeric IDs for backward compatibility by maintaining a
 * process-local bijection between stable vault string IDs and monotonically
 * increasing numbers. The mapping is rebuilt on process start by walking the
 * vault, so callers never notice that IDs are no longer persisted.
 *
 * Methods that previously executed raw SQL through `store.db` are not part of
 * this adapter — those callers are rewritten against the vault directly.
 */

import { DEFAULT_PLATFORM_SOURCE, normalizePlatformSource } from '../../shared/platform-source.js';
import { logger } from '../../utils/logger.js';
import type { VaultStore } from '../vault/index.js';
import type {
  ObservationInput,
  ObservationRecord as VaultObservationRecord,
  ObservationType,
  PromptRecord,
  SessionRecord,
  SummaryInput,
  SummaryRecord,
} from '../vault/types.js';

// ---- Shape types exported for SessionStore parity ----

export interface LegacyObservationShape {
  id: number;
  memory_session_id: string;
  project: string;
  text: string | null;
  type: ObservationType;
  title: string | null;
  subtitle: string | null;
  facts: string | null;
  narrative: string | null;
  concepts: string | null;
  files_read: string | null;
  files_modified: string | null;
  prompt_number: number | null;
  discovery_tokens: number;
  content_hash: string;
  generated_by_model: string | null;
  created_at: string;
  created_at_epoch: number;
}

export interface LegacySessionSummaryShape {
  id: number;
  memory_session_id: string;
  project: string;
  request: string | null;
  investigated: string | null;
  learned: string | null;
  completed: string | null;
  next_steps: string | null;
  files_read: string | null;
  files_edited: string | null;
  notes: string | null;
  prompt_number: number | null;
  discovery_tokens: number;
  created_at: string;
  created_at_epoch: number;
}

export interface LegacyUserPromptShape {
  id: number;
  content_session_id: string;
  memory_session_id: string;
  project: string;
  platform_source: string;
  prompt_number: number;
  prompt_text: string;
  created_at: string;
  created_at_epoch: number;
}

export interface LegacySdkSessionShape {
  id: number;
  content_session_id: string;
  memory_session_id: string | null;
  project: string;
  platform_source: string;
  user_prompt: string | null;
  custom_title: string | null;
  started_at: string;
  started_at_epoch: number;
  completed_at: string | null;
  completed_at_epoch: number | null;
  status: string;
}

// ---- Small helpers ----

function toJsonStringOrNull(v: unknown): string | null {
  if (!v) return null;
  if (Array.isArray(v) && v.length === 0) return null;
  try {
    return JSON.stringify(v);
  } catch {
    return null;
  }
}

function toObservationInput(raw: unknown): ObservationInput {
  const o = (raw ?? {}) as Record<string, unknown>;
  const asList = (v: unknown): string[] | null => {
    if (!v) return null;
    if (Array.isArray(v)) return v.map(String).filter(Boolean);
    if (typeof v === 'string' && v.trim()) {
      try {
        const parsed = JSON.parse(v);
        return Array.isArray(parsed) ? parsed.map(String).filter(Boolean) : [v];
      } catch {
        return [v];
      }
    }
    return null;
  };
  return {
    type: (o.type as ObservationType) ?? 'discovery',
    title: (o.title as string) ?? null,
    subtitle: (o.subtitle as string) ?? null,
    facts: asList(o.facts),
    narrative: (o.narrative as string) ?? (o.text as string) ?? null,
    text: (o.text as string) ?? null,
    concepts: asList(o.concepts),
    files_read: asList(o.files_read),
    files_modified: asList(o.files_modified),
  };
}

function toSummaryInput(raw: unknown): SummaryInput {
  const s = (raw ?? {}) as Record<string, unknown>;
  const asList = (v: unknown): string[] | null => {
    if (!v) return null;
    if (Array.isArray(v)) return v.map(String).filter(Boolean);
    if (typeof v === 'string' && v.trim()) {
      try {
        const parsed = JSON.parse(v);
        return Array.isArray(parsed) ? parsed.map(String).filter(Boolean) : null;
      } catch {
        return null;
      }
    }
    return null;
  };
  return {
    request: (s.request as string) ?? null,
    investigated: (s.investigated as string) ?? null,
    learned: (s.learned as string) ?? null,
    completed: (s.completed as string) ?? null,
    next_steps: (s.next_steps as string) ?? null,
    notes: (s.notes as string) ?? null,
    files_read: asList(s.files_read),
    files_edited: asList(s.files_edited),
  };
}

function obsRecordToLegacy(rec: VaultObservationRecord, numId: number): LegacyObservationShape {
  return {
    id: numId,
    memory_session_id: rec.memory_session_id,
    project: rec.project,
    text: rec.narrative ?? rec.text ?? null,
    type: rec.type,
    title: rec.title,
    subtitle: rec.subtitle,
    facts: toJsonStringOrNull(rec.facts),
    narrative: rec.narrative,
    concepts: toJsonStringOrNull(rec.concepts),
    files_read: toJsonStringOrNull(rec.files_read),
    files_modified: toJsonStringOrNull(rec.files_modified),
    prompt_number: rec.prompt_number,
    discovery_tokens: rec.discovery_tokens,
    content_hash: rec.content_hash,
    generated_by_model: rec.model,
    created_at: rec.created_at,
    created_at_epoch: rec.created_at_epoch,
  };
}

function summaryRecordToLegacy(rec: SummaryRecord, numId: number): LegacySessionSummaryShape {
  return {
    id: numId,
    memory_session_id: rec.memory_session_id,
    project: rec.project,
    request: rec.request,
    investigated: rec.investigated,
    learned: rec.learned,
    completed: rec.completed,
    next_steps: rec.next_steps,
    files_read: toJsonStringOrNull(rec.files_read),
    files_edited: toJsonStringOrNull(rec.files_edited),
    notes: rec.notes,
    prompt_number: rec.prompt_number,
    discovery_tokens: rec.discovery_tokens,
    created_at: rec.created_at,
    created_at_epoch: rec.created_at_epoch,
  };
}

function sessionRecordToLegacy(rec: SessionRecord, numId: number): LegacySdkSessionShape {
  return {
    id: numId,
    content_session_id: rec.content_session_id,
    memory_session_id: rec.memory_session_id,
    project: rec.project,
    platform_source: rec.platform_source,
    user_prompt: rec.user_prompt,
    custom_title: rec.custom_title,
    started_at: rec.started_at,
    started_at_epoch: rec.started_at_epoch,
    completed_at: rec.completed_at,
    completed_at_epoch: rec.completed_at_epoch,
    status: rec.status,
  };
}

function promptRecordToLegacy(
  rec: PromptRecord,
  numId: number,
  session: SessionRecord | null,
): LegacyUserPromptShape {
  return {
    id: numId,
    content_session_id: rec.content_session_id,
    memory_session_id: session?.memory_session_id ?? '',
    project: session?.project ?? '',
    platform_source: session?.platform_source ?? DEFAULT_PLATFORM_SOURCE,
    prompt_number: rec.prompt_number,
    prompt_text: rec.prompt_text,
    created_at: rec.created_at,
    created_at_epoch: rec.created_at_epoch,
  };
}

// ---- Adapter ----

export class VaultStoreAdapter {
  private readonly vault: VaultStore;

  // numId ↔ string vault id, bidirectional, per entity kind.
  private readonly obsNumByStr = new Map<string, number>();
  private readonly obsStrByNum = new Map<number, string>();
  private readonly summaryNumByStr = new Map<string, number>();
  private readonly summaryStrByNum = new Map<number, string>();
  private readonly promptNumByStr = new Map<string, number>();
  private readonly promptStrByNum = new Map<number, string>();
  private readonly sessionNumByStr = new Map<string, number>();
  private readonly sessionStrByNum = new Map<number, string>();

  private obsCounter = 0;
  private summaryCounter = 0;
  private promptCounter = 0;
  private sessionCounter = 0;

  constructor(vault: VaultStore) {
    this.vault = vault;
  }

  /** Walk the vault once to assign numeric IDs to existing records. */
  hydrateIds(): void {
    for (const s of this.vault.listSessions()) this.sessionNum(s.id);
    for (const o of this.vault.listObservations()) this.obsNum(o.id);
    // Summaries & prompts are loaded per-session; enumerate via sessions.
    for (const s of this.vault.listSessions()) {
      const summary = this.vault.getSummaryForSession(s.memory_session_id ?? '');
      if (summary) this.summaryNum(summary.id);
      for (const p of this.vault.listRecentPrompts(s.project, Number.MAX_SAFE_INTEGER)) {
        this.promptNum(p.id);
      }
    }
  }

  /** Public-facing helpers for callers that need consistent numIds. */
  obsNumFor(strId: string): number { return this.obsNum(strId); }
  summaryNumFor(strId: string): number { return this.summaryNum(strId); }
  promptNumFor(strId: string): number { return this.promptNum(strId); }
  sessionNumFor(strId: string): number { return this.sessionNum(strId); }

  // ---- ID bijections ----

  private obsNum(strId: string): number {
    let n = this.obsNumByStr.get(strId);
    if (n === undefined) {
      n = ++this.obsCounter;
      this.obsNumByStr.set(strId, n);
      this.obsStrByNum.set(n, strId);
    }
    return n;
  }
  private obsStr(numId: number): string | undefined {
    return this.obsStrByNum.get(numId);
  }

  private summaryNum(strId: string): number {
    let n = this.summaryNumByStr.get(strId);
    if (n === undefined) {
      n = ++this.summaryCounter;
      this.summaryNumByStr.set(strId, n);
      this.summaryStrByNum.set(n, strId);
    }
    return n;
  }
  private summaryStr(numId: number): string | undefined {
    return this.summaryStrByNum.get(numId);
  }

  private promptNum(strId: string): number {
    let n = this.promptNumByStr.get(strId);
    if (n === undefined) {
      n = ++this.promptCounter;
      this.promptNumByStr.set(strId, n);
      this.promptStrByNum.set(n, strId);
    }
    return n;
  }
  private promptStr(numId: number): string | undefined {
    return this.promptStrByNum.get(numId);
  }

  private sessionNum(strId: string): number {
    let n = this.sessionNumByStr.get(strId);
    if (n === undefined) {
      n = ++this.sessionCounter;
      this.sessionNumByStr.set(strId, n);
      this.sessionStrByNum.set(n, strId);
    }
    return n;
  }
  private sessionStr(numId: number): string | undefined {
    return this.sessionStrByNum.get(numId);
  }

  // Lookup a session by its numeric DB id.
  private sessionByNumId(numId: number): SessionRecord | null {
    const strId = this.sessionStr(numId);
    if (!strId) return null;
    return this.vault.getSessionById(strId);
  }

  // Resolve numeric model-generated-by to model/modelId tuple.
  private static extractModel(
    generatedByModel?: { model?: string | null; model_id?: string | null } | string | null,
  ): { model: string | null; modelId: string | null } {
    if (typeof generatedByModel === 'string') return { model: generatedByModel, modelId: null };
    if (generatedByModel && typeof generatedByModel === 'object') {
      return {
        model: generatedByModel.model ?? null,
        modelId: generatedByModel.model_id ?? null,
      };
    }
    return { model: null, modelId: null };
  }

  // ===================================================================
  // Session lifecycle
  // ===================================================================

  createSDKSession(
    contentSessionId: string,
    project: string,
    userPrompt: string,
    customTitle?: string,
    platformSource?: string,
  ): number {
    const existing = this.vault.getSessionByContentId(contentSessionId);
    if (existing) {
      const patch: Partial<SessionRecord> = {};
      if (project && (!existing.project || existing.project === '')) {
        patch.project = project;
      }
      if (customTitle && !existing.custom_title) {
        patch.custom_title = customTitle;
      }
      if (platformSource) {
        const normalized = normalizePlatformSource(platformSource);
        const stored = existing.platform_source?.trim()
          ? normalizePlatformSource(existing.platform_source)
          : '';
        if (!stored) patch.platform_source = normalized;
        else if (stored !== normalized)
          throw new Error(
            `Platform source conflict for session ${contentSessionId}: existing=${stored}, received=${normalized}`,
          );
      }
      if (existing.memory_session_id) {
        const updated = Object.keys(patch).length
          ? (this.vault.updateSession(existing.memory_session_id, patch) ?? existing)
          : existing;
        return this.sessionNum(updated.id);
      }
      return this.sessionNum(existing.id);
    }

    const session = this.vault.createSession({
      contentSessionId,
      memorySessionId: null,
      project,
      platformSource: platformSource ? normalizePlatformSource(platformSource) : DEFAULT_PLATFORM_SOURCE,
      userPrompt,
      customTitle: customTitle ?? null,
    });
    return this.sessionNum(session.id);
  }

  updateMemorySessionId(sessionDbId: number, memorySessionId: string | null): void {
    const session = this.sessionByNumId(sessionDbId);
    if (!session) return;
    // memory_session_id is indexed on filename location indirectly via started_at,
    // so we use the existing identifier as the key for the patch.
    const key = session.memory_session_id ?? session.content_session_id;
    this.vault.updateSession(key, { memory_session_id: memorySessionId });
  }

  markSessionCompleted(sessionDbId: number): void {
    const session = this.sessionByNumId(sessionDbId);
    if (!session?.memory_session_id) return;
    this.vault.markSessionCompleted(session.memory_session_id, 'completed');
  }

  ensureMemorySessionIdRegistered(sessionDbId: number, memorySessionId: string): void {
    const session = this.sessionByNumId(sessionDbId);
    if (!session) throw new Error(`Session ${sessionDbId} not found`);
    if (session.memory_session_id === memorySessionId) return;
    const key = session.memory_session_id ?? session.content_session_id;
    this.vault.updateSession(key, { memory_session_id: memorySessionId });
    logger.debug('VAULT', 'Registered memory_session_id before storage', {
      sessionDbId,
      memorySessionId,
    });
  }

  getOrCreateManualSession(project: string): string {
    const memorySessionId = `manual-${project}`;
    const existing = this.vault.getSessionByMemoryId(memorySessionId);
    if (existing) return memorySessionId;
    this.vault.createSession({
      contentSessionId: `manual-content-${project}`,
      memorySessionId,
      project,
      platformSource: DEFAULT_PLATFORM_SOURCE,
    });
    logger.info('SESSION', 'Created manual session', { memorySessionId, project });
    return memorySessionId;
  }

  // ===================================================================
  // Writes: observations, summaries, prompts
  // ===================================================================

  storeObservation(
    memorySessionId: string,
    project: string,
    observation: unknown,
    promptNumber?: number,
    discoveryTokens: number = 0,
    overrideTimestampEpoch?: number,
    generatedByModel?: { model?: string | null; model_id?: string | null } | string | null,
  ): { id: number; createdAtEpoch: number } {
    const { model, modelId } = VaultStoreAdapter.extractModel(generatedByModel);
    const result = this.vault.writeObservation({
      memorySessionId,
      project,
      observation: toObservationInput(observation),
      promptNumber,
      discoveryTokens,
      createdAtEpoch: overrideTimestampEpoch,
      model,
      modelId,
    });
    return { id: this.obsNum(result.id), createdAtEpoch: result.createdAtEpoch };
  }

  storeSummary(
    memorySessionId: string,
    project: string,
    summary: unknown,
    promptNumber?: number,
    discoveryTokens: number = 0,
    overrideTimestampEpoch?: number,
    generatedByModel?: { model?: string | null; model_id?: string | null } | string | null,
  ): { id: number; createdAtEpoch: number } {
    const { model, modelId } = VaultStoreAdapter.extractModel(generatedByModel);
    const rec = this.vault.writeSummary(memorySessionId, project, toSummaryInput(summary), {
      promptNumber,
      discoveryTokens,
      createdAtEpoch: overrideTimestampEpoch,
      model,
      modelId,
    });
    return { id: this.summaryNum(rec.id), createdAtEpoch: rec.created_at_epoch };
  }

  storeObservations(
    memorySessionId: string,
    project: string,
    observations: unknown[],
    summary: unknown | null,
    promptNumber?: number,
    discoveryTokens: number = 0,
    overrideTimestampEpoch?: number,
    generatedByModel?: { model?: string | null; model_id?: string | null } | string | null,
  ): { observationIds: number[]; summaryId: number | null; createdAtEpoch: number } {
    const { model, modelId } = VaultStoreAdapter.extractModel(generatedByModel);
    const result = this.vault.writeObservations(
      memorySessionId,
      project,
      (observations ?? []).map(toObservationInput),
      {
        promptNumber,
        discoveryTokens,
        createdAtEpoch: overrideTimestampEpoch,
        model,
        modelId,
        summary: summary ? toSummaryInput(summary) : undefined,
      },
    );
    return {
      observationIds: result.obsIds.map((id) => this.obsNum(id)),
      summaryId: result.summaryId ? this.summaryNum(result.summaryId) : null,
      createdAtEpoch: result.createdAtEpoch,
    };
  }

  /** @deprecated superseded by `storeObservations`; kept as a shim for agents that still call it. */
  storeObservationsAndMarkComplete(
    memorySessionId: string,
    project: string,
    observations: unknown[],
    summary: unknown | null,
    _messageId: number,
    _pendingStore: unknown,
    promptNumber?: number,
    discoveryTokens: number = 0,
    overrideTimestampEpoch?: number,
    generatedByModel?: { model?: string | null; model_id?: string | null } | string | null,
  ): { observationIds: number[]; summaryId?: number; createdAtEpoch: number } {
    const r = this.storeObservations(
      memorySessionId,
      project,
      observations,
      summary,
      promptNumber,
      discoveryTokens,
      overrideTimestampEpoch,
      generatedByModel,
    );
    return {
      observationIds: r.observationIds,
      summaryId: r.summaryId ?? undefined,
      createdAtEpoch: r.createdAtEpoch,
    };
  }

  saveUserPrompt(contentSessionId: string, _promptNumber: number, promptText: string): number {
    // Vault's prompt counter is derived server-side; the caller-supplied
    // prompt number is ignored (kept in the signature for backward compat).
    const { session, promptNumber } = this.vault.appendPrompt(contentSessionId, promptText);
    const latest = this.vault.getLatestPrompt(contentSessionId);
    const strId = latest?.id ?? `${session.id}-p${promptNumber}`;
    return this.promptNum(strId);
  }

  getUserPrompt(contentSessionId: string, promptNumber: number): string | null {
    const loaded = this.vault.getSessionByContentId(contentSessionId);
    if (!loaded) return null;
    // readSessionByContentId with deserialize gives us the prompts list — but VaultStore
    // only surfaces the latest prompt. We walk prompts via a helper on the session file.
    const prompts = this.vault.listRecentPrompts(loaded.project, Number.MAX_SAFE_INTEGER).filter(
      (p) => p.content_session_id === contentSessionId,
    );
    const match = prompts.find((p) => p.prompt_number === promptNumber);
    return match?.prompt_text ?? null;
  }

  getPromptNumberFromUserPrompts(contentSessionId: string): number {
    return this.vault.getPromptNumber(contentSessionId);
  }

  // ===================================================================
  // Reads: sessions / observations / summaries / prompts
  // ===================================================================

  getSessionById(id: number): LegacySdkSessionShape | null {
    const rec = this.sessionByNumId(id);
    return rec ? sessionRecordToLegacy(rec, id) : null;
  }

  getSdkSessionsBySessionIds(memorySessionIds: string[]): LegacySdkSessionShape[] {
    return memorySessionIds
      .map((mid) => this.vault.getSessionByMemoryId(mid))
      .filter((s): s is SessionRecord => !!s)
      .sort((a, b) => b.started_at_epoch - a.started_at_epoch)
      .map((s) => sessionRecordToLegacy(s, this.sessionNum(s.id)));
  }

  getObservationById(id: number): LegacyObservationShape | null {
    const strId = this.obsStr(id);
    if (!strId) return null;
    const rec = this.vault.getObservationById(strId);
    return rec ? obsRecordToLegacy(rec, id) : null;
  }

  getObservationsByIds(
    ids: number[],
    options: {
      orderBy?: 'date_desc' | 'date_asc';
      limit?: number;
      project?: string;
      type?: string | string[];
      concepts?: string | string[];
      files?: string | string[];
    } = {},
  ): LegacyObservationShape[] {
    if (ids.length === 0) return [];
    const { orderBy = 'date_desc', limit, project, type, concepts, files } = options;
    const strIds = ids.map((n) => this.obsStr(n)).filter((s): s is string => !!s);
    let recs = this.vault.getObservationsByIds(strIds);
    if (project) recs = recs.filter((r) => r.project === project);
    if (type) {
      const types = Array.isArray(type) ? type : [type];
      recs = recs.filter((r) => types.includes(r.type));
    }
    if (concepts) {
      const conceptList = Array.isArray(concepts) ? concepts : [concepts];
      recs = recs.filter((r) => conceptList.some((c) => r.concepts.includes(c)));
    }
    if (files) {
      const fileList = Array.isArray(files) ? files : [files];
      recs = recs.filter((r) =>
        fileList.some((f) =>
          [...r.files_read, ...r.files_modified].some((path) => path.includes(f)),
        ),
      );
    }
    recs.sort((a, b) =>
      orderBy === 'date_asc'
        ? a.created_at_epoch - b.created_at_epoch
        : b.created_at_epoch - a.created_at_epoch,
    );
    if (typeof limit === 'number') recs = recs.slice(0, limit);
    return recs.map((r) => obsRecordToLegacy(r, this.obsNum(r.id)));
  }

  getObservationsForSession(
    memorySessionId: string,
  ): Array<{ title: string; subtitle: string; type: string; prompt_number: number | null }> {
    return this.vault
      .listObservationsForSession(memorySessionId)
      .sort((a, b) => a.created_at_epoch - b.created_at_epoch)
      .map((r) => ({
        title: r.title ?? '',
        subtitle: r.subtitle ?? '',
        type: r.type,
        prompt_number: r.prompt_number,
      }));
  }

  getRecentObservations(
    project: string,
    limit: number = 20,
  ): Array<{ type: string; text: string; prompt_number: number | null; created_at: string }> {
    return this.vault
      .listObservations({ project, limit, orderBy: 'date_desc' })
      .map((r) => ({
        type: r.type,
        text: r.narrative ?? r.text ?? '',
        prompt_number: r.prompt_number,
        created_at: r.created_at,
      }));
  }

  getAllRecentObservations(limit: number = 100): Array<{
    id: number;
    type: string;
    title: string | null;
    subtitle: string | null;
    text: string;
    project: string;
    platform_source: string;
    prompt_number: number | null;
    created_at: string;
    created_at_epoch: number;
  }> {
    const recs = this.vault.listObservations({ limit, orderBy: 'date_desc' });
    return recs.map((r) => {
      const session = r.memory_session_id
        ? this.vault.getSessionByMemoryId(r.memory_session_id)
        : null;
      return {
        id: this.obsNum(r.id),
        type: r.type,
        title: r.title,
        subtitle: r.subtitle,
        text: r.narrative ?? r.text ?? '',
        project: r.project,
        platform_source: session?.platform_source ?? DEFAULT_PLATFORM_SOURCE,
        prompt_number: r.prompt_number,
        created_at: r.created_at,
        created_at_epoch: r.created_at_epoch,
      };
    });
  }

  getSummaryForSession(memorySessionId: string): LegacySessionSummaryShape | null {
    const rec = this.vault.getSummaryForSession(memorySessionId);
    if (!rec) return null;
    return summaryRecordToLegacy(rec, this.summaryNum(rec.id));
  }

  getRecentSummaries(
    project: string,
    limit: number = 10,
  ): Array<Omit<LegacySessionSummaryShape, 'id' | 'memory_session_id' | 'project' | 'created_at_epoch'>> {
    return this.vault.listRecentSummaries(project, limit).map((r) => ({
      request: r.request,
      investigated: r.investigated,
      learned: r.learned,
      completed: r.completed,
      next_steps: r.next_steps,
      files_read: toJsonStringOrNull(r.files_read),
      files_edited: toJsonStringOrNull(r.files_edited),
      notes: r.notes,
      prompt_number: r.prompt_number,
      discovery_tokens: r.discovery_tokens,
      created_at: r.created_at,
    }));
  }

  getRecentSummariesWithSessionInfo(
    project: string,
    limit: number = 3,
  ): Array<{
    memory_session_id: string;
    request: string | null;
    learned: string | null;
    completed: string | null;
    next_steps: string | null;
    prompt_number: number | null;
    created_at: string;
  }> {
    return this.vault.listRecentSummaries(project, limit).map((r) => ({
      memory_session_id: r.memory_session_id,
      request: r.request,
      learned: r.learned,
      completed: r.completed,
      next_steps: r.next_steps,
      prompt_number: r.prompt_number,
      created_at: r.created_at,
    }));
  }

  getAllRecentSummaries(limit: number = 50): Array<
    LegacySessionSummaryShape & { platform_source: string }
  > {
    const out: Array<LegacySessionSummaryShape & { platform_source: string }> = [];
    for (const session of this.vault.listSessions()) {
      if (out.length >= limit) break;
      const summary = this.vault.getSummaryForSession(session.memory_session_id ?? '');
      if (!summary) continue;
      out.push({
        ...summaryRecordToLegacy(summary, this.summaryNum(summary.id)),
        platform_source: session.platform_source,
      });
    }
    out.sort((a, b) => b.created_at_epoch - a.created_at_epoch);
    return out.slice(0, limit);
  }

  getAllRecentUserPrompts(limit: number = 100): LegacyUserPromptShape[] {
    const sessions = this.vault.listSessions();
    const out: LegacyUserPromptShape[] = [];
    for (const session of sessions) {
      const prompts = this.vault
        .listRecentPrompts(session.project, Number.MAX_SAFE_INTEGER)
        .filter((p) => p.content_session_id === session.content_session_id);
      for (const p of prompts) out.push(promptRecordToLegacy(p, this.promptNum(p.id), session));
    }
    out.sort((a, b) => b.created_at_epoch - a.created_at_epoch);
    return out.slice(0, limit);
  }

  getLatestUserPrompt(contentSessionId: string): LegacyUserPromptShape | undefined {
    const session = this.vault.getSessionByContentId(contentSessionId);
    if (!session) return undefined;
    const latest = this.vault.getLatestPrompt(contentSessionId);
    if (!latest) return undefined;
    return promptRecordToLegacy(latest, this.promptNum(latest.id), session);
  }

  getPromptById(id: number): LegacyUserPromptShape | null {
    const strId = this.promptStr(id);
    if (!strId) return null;
    // Prompts live embedded in session files; scan to resolve.
    for (const session of this.vault.listSessions()) {
      const prompts = this.vault
        .listRecentPrompts(session.project, Number.MAX_SAFE_INTEGER)
        .filter((p) => p.content_session_id === session.content_session_id);
      const hit = prompts.find((p) => p.id === strId);
      if (hit) return promptRecordToLegacy(hit, id, session);
    }
    return null;
  }

  getPromptsByIds(ids: number[]): LegacyUserPromptShape[] {
    if (ids.length === 0) return [];
    return ids
      .map((id) => this.getPromptById(id))
      .filter((p): p is LegacyUserPromptShape => !!p)
      .sort((a, b) => b.created_at_epoch - a.created_at_epoch);
  }

  getSessionSummariesByIds(
    ids: number[],
    options: { orderBy?: 'date_desc' | 'date_asc'; limit?: number; project?: string } = {},
  ): LegacySessionSummaryShape[] {
    if (ids.length === 0) return [];
    const { orderBy = 'date_desc', limit, project } = options;
    const strIds = ids.map((n) => this.summaryStr(n)).filter((s): s is string => !!s);
    const strIdSet = new Set(strIds);
    const hits: Array<{ rec: SummaryRecord; numId: number }> = [];
    for (const session of this.vault.listSessions()) {
      if (project && session.project !== project) continue;
      const summary = this.vault.getSummaryForSession(session.memory_session_id ?? '');
      if (!summary) continue;
      if (!strIdSet.has(summary.id)) continue;
      hits.push({ rec: summary, numId: this.summaryNum(summary.id) });
    }
    hits.sort((a, b) =>
      orderBy === 'date_asc'
        ? a.rec.created_at_epoch - b.rec.created_at_epoch
        : b.rec.created_at_epoch - a.rec.created_at_epoch,
    );
    const sliced = typeof limit === 'number' ? hits.slice(0, limit) : hits;
    return sliced.map(({ rec, numId }) => summaryRecordToLegacy(rec, numId));
  }

  getUserPromptsByIds(
    ids: number[],
    options: { orderBy?: 'date_desc' | 'date_asc'; limit?: number; project?: string } = {},
  ): LegacyUserPromptShape[] {
    if (ids.length === 0) return [];
    const { orderBy = 'date_desc', limit, project } = options;
    const hits = ids
      .map((id) => this.getPromptById(id))
      .filter((p): p is LegacyUserPromptShape => !!p)
      .filter((p) => !project || p.project === project);
    hits.sort((a, b) =>
      orderBy === 'date_asc'
        ? a.created_at_epoch - b.created_at_epoch
        : b.created_at_epoch - a.created_at_epoch,
    );
    return typeof limit === 'number' ? hits.slice(0, limit) : hits;
  }

  getSessionSummaryById(id: number): {
    id: number;
    memory_session_id: string | null;
    content_session_id: string;
    project: string;
    user_prompt: string;
    request_summary: string | null;
    learned_summary: string | null;
    status: string;
    created_at: string;
    created_at_epoch: number;
  } | null {
    const session = this.sessionByNumId(id);
    if (!session) return null;
    const summary = session.memory_session_id
      ? this.vault.getSummaryForSession(session.memory_session_id)
      : null;
    return {
      id,
      memory_session_id: session.memory_session_id,
      content_session_id: session.content_session_id,
      project: session.project,
      user_prompt: session.user_prompt ?? '',
      request_summary: summary?.request ?? null,
      learned_summary: summary?.learned ?? null,
      status: session.status,
      created_at: session.started_at,
      created_at_epoch: session.started_at_epoch,
    };
  }

  getFilesForSession(memorySessionId: string): {
    filesRead: string[];
    filesModified: string[];
  } {
    const obs = this.vault.listObservationsForSession(memorySessionId);
    const reads = new Set<string>();
    const mods = new Set<string>();
    for (const o of obs) {
      o.files_read.forEach((f) => reads.add(f));
      o.files_modified.forEach((f) => mods.add(f));
    }
    return { filesRead: [...reads], filesModified: [...mods] };
  }

  getRecentSessionsWithStatus(
    project: string,
    limit: number = 3,
  ): Array<{
    memory_session_id: string | null;
    status: string;
    started_at: string;
    user_prompt: string | null;
    has_summary: boolean;
  }> {
    const sessions = this.vault
      .listSessions({ project, limit })
      .filter((s) => s.memory_session_id)
      .slice(0, limit);
    // Present oldest→newest so the context feed reads chronologically.
    sessions.sort((a, b) => a.started_at_epoch - b.started_at_epoch);
    return sessions.map((s) => ({
      memory_session_id: s.memory_session_id,
      status: s.status,
      started_at: s.started_at,
      user_prompt: s.user_prompt,
      has_summary: !!this.vault.getSummaryForSession(s.memory_session_id ?? ''),
    }));
  }

  getAllProjects(platformSource?: string): string[] {
    const normalized = platformSource ? normalizePlatformSource(platformSource) : null;
    const sessions = this.vault.listSessions();
    const projects = new Set<string>();
    for (const s of sessions) {
      if (!s.project) continue;
      if (normalized && normalizePlatformSource(s.platform_source) !== normalized) continue;
      projects.add(s.project);
    }
    return [...projects].sort();
  }

  getProjectCatalog(): {
    projects: string[];
    sources: string[];
    projectsBySource: Record<string, string[]>;
  } {
    const sessions = this.vault.listSessions();
    const projects: string[] = [];
    const seen = new Set<string>();
    const projectsBySource: Record<string, string[]> = {};
    // Session list is already date_desc → project order reflects recency.
    for (const s of sessions) {
      if (!s.project) continue;
      const source = normalizePlatformSource(s.platform_source);
      if (!projectsBySource[source]) projectsBySource[source] = [];
      if (!projectsBySource[source].includes(s.project)) projectsBySource[source].push(s.project);
      if (!seen.has(s.project)) {
        seen.add(s.project);
        projects.push(s.project);
      }
    }
    const sources = Object.keys(projectsBySource).sort();
    return {
      projects,
      sources,
      projectsBySource: Object.fromEntries(
        sources.map((src) => [src, projectsBySource[src] ?? []]),
      ),
    };
  }

  // ===================================================================
  // Timeline
  // ===================================================================

  getTimelineAroundTimestamp(
    anchorEpoch: number,
    depthBefore: number = 10,
    depthAfter: number = 10,
    project?: string,
  ): { observations: LegacyObservationShape[]; sessions: any[]; prompts: LegacyUserPromptShape[] } {
    return this.getTimelineAroundObservation(null, anchorEpoch, depthBefore, depthAfter, project);
  }

  getTimelineAroundObservation(
    anchorObservationId: number | null,
    anchorEpoch: number,
    depthBefore: number = 10,
    depthAfter: number = 10,
    project?: string,
  ): { observations: LegacyObservationShape[]; sessions: any[]; prompts: LegacyUserPromptShape[] } {
    // Resolve the anchor: either the timestamp supplied, or the observation's own epoch.
    let effectiveEpoch = anchorEpoch;
    if (anchorObservationId !== null) {
      const strId = this.obsStr(anchorObservationId);
      const rec = strId ? this.vault.getObservationById(strId) : null;
      if (rec) effectiveEpoch = rec.created_at_epoch;
    }

    // Fetch all observations scoped to project (if any), sorted ascending by time.
    const allObs = this.vault
      .listObservations({ project, orderBy: 'date_asc', limit: Number.MAX_SAFE_INTEGER })
      .slice();

    // Compute the start/end time window anchored on the anchor observation's position.
    const beforeObs = allObs.filter((o) => o.created_at_epoch <= effectiveEpoch).slice(-depthBefore);
    const afterObs = allObs.filter((o) => o.created_at_epoch >= effectiveEpoch).slice(0, depthAfter + 1);
    if (beforeObs.length === 0 && afterObs.length === 0) {
      return { observations: [], sessions: [], prompts: [] };
    }
    const startEpoch =
      beforeObs.length > 0 ? beforeObs[0].created_at_epoch : effectiveEpoch;
    const endEpoch =
      afterObs.length > 0 ? afterObs[afterObs.length - 1].created_at_epoch : effectiveEpoch;

    // Observations within the time window.
    const obsInWindow = allObs.filter(
      (o) => o.created_at_epoch >= startEpoch && o.created_at_epoch <= endEpoch,
    );

    // Summaries (flattened) within window, filtered by project when given.
    const sessions = this.vault
      .listSessions(project ? { project } : {})
      .map((s) => ({
        session: s,
        summary: this.vault.getSummaryForSession(s.memory_session_id ?? ''),
      }))
      .filter(
        ({ summary }) =>
          !!summary &&
          summary.created_at_epoch >= startEpoch &&
          summary.created_at_epoch <= endEpoch,
      )
      .map(({ session, summary }) => ({
        id: this.summaryNum(summary!.id),
        memory_session_id: session.memory_session_id,
        project: session.project,
        request: summary!.request,
        completed: summary!.completed,
        next_steps: summary!.next_steps,
        created_at: summary!.created_at,
        created_at_epoch: summary!.created_at_epoch,
      }))
      .sort((a, b) => a.created_at_epoch - b.created_at_epoch);

    // Prompts within window, filtered by project when given.
    const prompts = this.vault
      .listRecentPrompts(project, Number.MAX_SAFE_INTEGER)
      .filter((p) => p.created_at_epoch >= startEpoch && p.created_at_epoch <= endEpoch)
      .sort((a, b) => a.created_at_epoch - b.created_at_epoch)
      .map((p) => {
        const session = this.vault.getSessionByContentId(p.content_session_id);
        return promptRecordToLegacy(p, this.promptNum(p.id), session);
      });

    return {
      observations: obsInWindow.map((o) => obsRecordToLegacy(o, this.obsNum(o.id))),
      sessions,
      prompts,
    };
  }

  // ===================================================================
  // Legacy imports (opt-in, delegate to vault where sensible)
  // ===================================================================

  importSdkSession(session: {
    content_session_id: string;
    memory_session_id: string;
    project: string;
    platform_source?: string;
    user_prompt: string;
    started_at: string;
    started_at_epoch: number;
    completed_at: string | null;
    completed_at_epoch: number | null;
    status: string;
  }): { imported: boolean; id: number } {
    const existing = this.vault.getSessionByContentId(session.content_session_id);
    if (existing) return { imported: false, id: this.sessionNum(existing.id) };
    const rec = this.vault.createSession({
      contentSessionId: session.content_session_id,
      memorySessionId: session.memory_session_id,
      project: session.project,
      platformSource: session.platform_source
        ? normalizePlatformSource(session.platform_source)
        : DEFAULT_PLATFORM_SOURCE,
      userPrompt: session.user_prompt,
      startedAtEpoch: session.started_at_epoch,
    });
    if (session.status && session.status !== 'active' && session.memory_session_id) {
      this.vault.markSessionCompleted(
        session.memory_session_id,
        session.status === 'failed' ? 'failed' : 'completed',
      );
    }
    return { imported: true, id: this.sessionNum(rec.id) };
  }

  importSessionSummary(summary: {
    memory_session_id: string;
    project: string;
    request: string | null;
    investigated: string | null;
    learned: string | null;
    completed: string | null;
    next_steps: string | null;
    files_read: string | null;
    files_edited: string | null;
    notes: string | null;
    prompt_number: number | null;
    discovery_tokens: number;
    created_at: string;
    created_at_epoch: number;
  }): { imported: boolean; id: number } {
    const existing = this.vault.getSummaryForSession(summary.memory_session_id);
    if (existing) return { imported: false, id: this.summaryNum(existing.id) };
    const rec = this.vault.writeSummary(
      summary.memory_session_id,
      summary.project,
      {
        request: summary.request,
        investigated: summary.investigated,
        learned: summary.learned,
        completed: summary.completed,
        next_steps: summary.next_steps,
        notes: summary.notes,
        files_read: summary.files_read ? safeParseList(summary.files_read) : null,
        files_edited: summary.files_edited ? safeParseList(summary.files_edited) : null,
      },
      {
        promptNumber: summary.prompt_number ?? undefined,
        discoveryTokens: summary.discovery_tokens,
        createdAtEpoch: summary.created_at_epoch,
      },
    );
    return { imported: true, id: this.summaryNum(rec.id) };
  }

  importObservation(obs: {
    memory_session_id: string;
    project: string;
    text: string | null;
    type: string;
    title: string | null;
    subtitle: string | null;
    facts: string | null;
    narrative: string | null;
    concepts: string | null;
    files_read: string | null;
    files_modified: string | null;
    prompt_number: number | null;
    discovery_tokens: number;
    created_at: string;
    created_at_epoch: number;
  }): { imported: boolean; id: number } {
    const result = this.vault.writeObservation({
      memorySessionId: obs.memory_session_id,
      project: obs.project,
      observation: {
        type: (obs.type as ObservationType) ?? 'discovery',
        title: obs.title,
        subtitle: obs.subtitle,
        facts: obs.facts ? safeParseList(obs.facts) : null,
        narrative: obs.narrative ?? obs.text ?? null,
        text: obs.text,
        concepts: obs.concepts ? safeParseList(obs.concepts) : null,
        files_read: obs.files_read ? safeParseList(obs.files_read) : null,
        files_modified: obs.files_modified ? safeParseList(obs.files_modified) : null,
      },
      promptNumber: obs.prompt_number ?? undefined,
      discoveryTokens: obs.discovery_tokens,
      createdAtEpoch: obs.created_at_epoch,
    });
    return { imported: !result.isDuplicate, id: this.obsNum(result.id) };
  }

  importUserPrompt(prompt: {
    content_session_id: string;
    prompt_number: number;
    prompt_text: string;
    created_at: string;
    created_at_epoch: number;
  }): { imported: boolean; id: number } {
    try {
      const result = this.vault.appendPrompt(prompt.content_session_id, prompt.prompt_text);
      const latest = this.vault.getLatestPrompt(prompt.content_session_id);
      const strId = latest?.id ?? `${result.session.id}-p${result.promptNumber}`;
      return { imported: true, id: this.promptNum(strId) };
    } catch {
      // Session not yet created — skip, the import script will surface it.
      return { imported: false, id: 0 };
    }
  }

  rebuildObservationsFTSIndex(): void {
    // Vault has no FTS table — minisearch index is rebuilt incrementally.
  }

  close(): void {
    // Vault lifecycle is owned by VaultStore; nothing to close here.
  }
}

function safeParseList(raw: string): string[] | null {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String).filter(Boolean) : null;
  } catch {
    return raw.trim() ? [raw] : null;
  }
}
