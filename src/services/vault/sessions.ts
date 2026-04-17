import { readdirSync, existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import { dateFolder, getVaultPaths, type VaultPaths } from './paths.js';
import { parseFrontmatter, stringifyFrontmatter } from './frontmatter.js';
import { atomicWrite, readIfExists } from './atomic.js';
import { hash8 } from './hash.js';
import type {
  SessionRecord,
  SessionStatus,
  SummaryInput,
  SummaryRecord,
  PromptRecord,
} from './types.js';

function isVaultMarkdown(file: string): boolean {
  return file.endsWith('.md') && !file.startsWith('.');
}

function normalizeList(v: unknown): string[] {
  if (Array.isArray(v)) return v.map(String).filter(Boolean);
  if (typeof v === 'string' && v.trim()) {
    try {
      const parsed = JSON.parse(v);
      return Array.isArray(parsed) ? parsed.map(String).filter(Boolean) : [v];
    } catch {
      return [v];
    }
  }
  return [];
}

function sessionFilename(memorySessionId: string): string {
  // Trim the UUID to 12 chars for readability; rely on full UUID in frontmatter for matching.
  return `session-${memorySessionId.slice(0, 12)}-${hash8(memorySessionId)}.md`;
}

function buildSessionBody(sess: Partial<SessionRecord>, prompts: PromptRecord[] = [], summary: SummaryRecord | null = null): string {
  const parts: string[] = [];
  parts.push(`# ${sess.custom_title ?? sess.user_prompt ?? sess.memory_session_id ?? 'Session'}`);
  if (prompts.length) {
    parts.push('## Prompts');
    parts.push(prompts.map((p) => `${p.prompt_number}. ${p.prompt_text}`).join('\n'));
  }
  if (summary) {
    parts.push('## Summary');
    const pairs: Array<[string, string | null]> = [
      ['Request', summary.request],
      ['Investigated', summary.investigated],
      ['Learned', summary.learned],
      ['Completed', summary.completed],
      ['Next steps', summary.next_steps],
      ['Notes', summary.notes],
    ];
    for (const [label, val] of pairs) {
      if (val) parts.push(`**${label}:** ${val}`);
    }
  }
  return parts.join('\n\n') + '\n';
}

function serializeSession(sess: SessionRecord, prompts: PromptRecord[], summary: SummaryRecord | null): string {
  const fm: Record<string, unknown> = {
    type: 'session',
    id: sess.id,
    memory_session_id: sess.memory_session_id,
    content_session_id: sess.content_session_id,
    project: sess.project,
    platform_source: sess.platform_source,
    started_at: sess.started_at,
    started_at_epoch: sess.started_at_epoch,
    completed_at: sess.completed_at,
    completed_at_epoch: sess.completed_at_epoch,
    failed_at_epoch: sess.failed_at_epoch,
    status: sess.status,
    prompt_counter: sess.prompt_counter,
    custom_title: sess.custom_title,
    worker_port: sess.worker_port,
    user_prompt: sess.user_prompt,
    prompts: prompts.map((p) => ({
      prompt_number: p.prompt_number,
      prompt_text: p.prompt_text,
      created_at: p.created_at,
    })),
    summary: summary
      ? {
          id: summary.id,
          request: summary.request,
          investigated: summary.investigated,
          learned: summary.learned,
          completed: summary.completed,
          next_steps: summary.next_steps,
          notes: summary.notes,
          files_read: summary.files_read,
          files_edited: summary.files_edited,
          prompt_number: summary.prompt_number,
          discovery_tokens: summary.discovery_tokens,
          model: summary.model,
          model_id: summary.model_id,
          created_at: summary.created_at,
          created_at_epoch: summary.created_at_epoch,
        }
      : null,
  };
  return stringifyFrontmatter(fm, buildSessionBody(sess, prompts, summary));
}

function deserializeSession(filepath: string): {
  session: SessionRecord;
  prompts: PromptRecord[];
  summary: SummaryRecord | null;
} | null {
  const raw = readIfExists(filepath);
  if (!raw) return null;
  const { data } = parseFrontmatter<Record<string, unknown>>(raw);
  if (!data || data.type !== 'session') return null;

  const memoryId = String(data.memory_session_id ?? '');
  const session: SessionRecord = {
    id: String(data.id ?? memoryId),
    content_session_id: String(data.content_session_id ?? ''),
    memory_session_id: memoryId || null,
    project: String(data.project ?? ''),
    platform_source: String(data.platform_source ?? 'claude'),
    user_prompt: (data.user_prompt as string) ?? null,
    custom_title: (data.custom_title as string) ?? null,
    started_at: String(data.started_at ?? new Date().toISOString()),
    started_at_epoch: Number(data.started_at_epoch ?? Date.now()),
    completed_at: (data.completed_at as string) ?? null,
    completed_at_epoch: data.completed_at_epoch == null ? null : Number(data.completed_at_epoch),
    failed_at_epoch: data.failed_at_epoch == null ? null : Number(data.failed_at_epoch),
    status: ((data.status as SessionStatus) ?? 'active'),
    worker_port: data.worker_port == null ? null : Number(data.worker_port),
    prompt_counter: Number(data.prompt_counter ?? 0),
    path: filepath,
  };

  const rawPrompts = Array.isArray(data.prompts) ? (data.prompts as Record<string, unknown>[]) : [];
  const prompts: PromptRecord[] = rawPrompts.map((p, idx) => ({
    id: `${session.id}-p${p.prompt_number ?? idx}`,
    content_session_id: session.content_session_id,
    prompt_number: Number(p.prompt_number ?? idx),
    prompt_text: String(p.prompt_text ?? ''),
    created_at: String(p.created_at ?? session.started_at),
    created_at_epoch: Number(new Date(String(p.created_at ?? session.started_at))),
  }));

  let summary: SummaryRecord | null = null;
  if (data.summary && typeof data.summary === 'object') {
    const s = data.summary as Record<string, unknown>;
    summary = {
      id: String(s.id ?? `${session.id}-summary`),
      memory_session_id: memoryId,
      project: session.project,
      request: (s.request as string) ?? null,
      investigated: (s.investigated as string) ?? null,
      learned: (s.learned as string) ?? null,
      completed: (s.completed as string) ?? null,
      next_steps: (s.next_steps as string) ?? null,
      notes: (s.notes as string) ?? null,
      files_read: normalizeList(s.files_read),
      files_edited: normalizeList(s.files_edited),
      prompt_number: s.prompt_number == null ? null : Number(s.prompt_number),
      discovery_tokens: Number(s.discovery_tokens ?? 0),
      model: (s.model as string) ?? null,
      model_id: (s.model_id as string) ?? null,
      created_at: String(s.created_at ?? session.started_at),
      created_at_epoch: Number(s.created_at_epoch ?? session.started_at_epoch),
      path: filepath,
    };
  }

  return { session, prompts, summary };
}

function sessionPath(memorySessionId: string, startedAtEpoch: number, paths: VaultPaths): string {
  return resolve(paths.sessions, dateFolder(startedAtEpoch), sessionFilename(memorySessionId));
}

/** Find a session's file by scanning — used when memorySessionId is present but date folder unknown. */
function findSessionFile(
  predicate: (s: SessionRecord) => boolean,
  paths: VaultPaths,
): string | null {
  if (!existsSync(paths.sessions)) return null;
  for (const dateDir of readdirSync(paths.sessions)) {
    const fullDir = resolve(paths.sessions, dateDir);
    if (!statSync(fullDir).isDirectory()) continue;
    for (const file of readdirSync(fullDir)) {
      if (!isVaultMarkdown(file)) continue;
      const parsed = deserializeSession(resolve(fullDir, file));
      if (parsed && predicate(parsed.session)) return parsed.session.path;
    }
  }
  return null;
}

export interface CreateSessionParams {
  contentSessionId: string;
  memorySessionId?: string | null;
  project: string;
  platformSource?: string;
  userPrompt?: string | null;
  customTitle?: string | null;
  startedAtEpoch?: number;
  workerPort?: number | null;
}

export function createSession(
  params: CreateSessionParams,
  paths: VaultPaths = getVaultPaths(),
): SessionRecord {
  const startedAtEpoch = params.startedAtEpoch ?? Date.now();
  const memoryId = params.memorySessionId ?? params.contentSessionId;
  // Idempotent: if a file already exists for this content_session_id, return it
  const existing = findSessionFile((s) => s.content_session_id === params.contentSessionId, paths);
  if (existing) {
    const parsed = deserializeSession(existing);
    if (parsed) return parsed.session;
  }
  const session: SessionRecord = {
    id: `${startedAtEpoch}-${hash8(params.contentSessionId)}`,
    content_session_id: params.contentSessionId,
    memory_session_id: memoryId,
    project: params.project,
    platform_source: params.platformSource ?? 'claude',
    user_prompt: params.userPrompt ?? null,
    custom_title: params.customTitle ?? null,
    started_at: new Date(startedAtEpoch).toISOString(),
    started_at_epoch: startedAtEpoch,
    completed_at: null,
    completed_at_epoch: null,
    failed_at_epoch: null,
    status: 'active',
    worker_port: params.workerPort ?? null,
    prompt_counter: 0,
    path: sessionPath(memoryId, startedAtEpoch, paths),
  };
  atomicWrite(session.path, serializeSession(session, [], null));
  return session;
}

export function readSessionByMemoryId(
  memorySessionId: string,
  paths: VaultPaths = getVaultPaths(),
): { session: SessionRecord; prompts: PromptRecord[]; summary: SummaryRecord | null } | null {
  const path = findSessionFile((s) => s.memory_session_id === memorySessionId, paths);
  return path ? deserializeSession(path) : null;
}

export function readSessionByContentId(
  contentSessionId: string,
  paths: VaultPaths = getVaultPaths(),
): { session: SessionRecord; prompts: PromptRecord[]; summary: SummaryRecord | null } | null {
  const path = findSessionFile((s) => s.content_session_id === contentSessionId, paths);
  return path ? deserializeSession(path) : null;
}

export function readSessionById(
  id: string,
  paths: VaultPaths = getVaultPaths(),
): { session: SessionRecord; prompts: PromptRecord[]; summary: SummaryRecord | null } | null {
  const path = findSessionFile((s) => s.id === id, paths);
  return path ? deserializeSession(path) : null;
}

export function updateSession(
  memorySessionId: string,
  patch: Partial<SessionRecord>,
  paths: VaultPaths = getVaultPaths(),
): SessionRecord | null {
  const loaded = readSessionByMemoryId(memorySessionId, paths);
  if (!loaded) return null;
  const merged: SessionRecord = { ...loaded.session, ...patch };
  atomicWrite(loaded.session.path, serializeSession(merged, loaded.prompts, loaded.summary));
  return merged;
}

export function appendPrompt(
  contentSessionId: string,
  promptText: string,
  paths: VaultPaths = getVaultPaths(),
): { promptNumber: number; session: SessionRecord } {
  const loaded = readSessionByContentId(contentSessionId, paths);
  if (!loaded) throw new Error(`Session not found for content_session_id=${contentSessionId}`);
  const promptNumber = loaded.session.prompt_counter + 1;
  const now = new Date();
  const prompts = [
    ...loaded.prompts,
    {
      id: `${loaded.session.id}-p${promptNumber}`,
      content_session_id: contentSessionId,
      prompt_number: promptNumber,
      prompt_text: promptText,
      created_at: now.toISOString(),
      created_at_epoch: now.getTime(),
    } satisfies PromptRecord,
  ];
  const updated: SessionRecord = { ...loaded.session, prompt_counter: promptNumber };
  atomicWrite(updated.path, serializeSession(updated, prompts, loaded.summary));
  return { promptNumber, session: updated };
}

export function writeSummary(
  memorySessionId: string,
  project: string,
  input: SummaryInput,
  options: { promptNumber?: number; discoveryTokens?: number; model?: string | null; modelId?: string | null; createdAtEpoch?: number } = {},
  paths: VaultPaths = getVaultPaths(),
): SummaryRecord {
  const createdAtEpoch = options.createdAtEpoch ?? Date.now();

  // If no session file exists yet, create a stub so the summary has somewhere
  // to live. This happens when the summary hook fires before any session was
  // registered (e.g. importing summaries ahead of their sessions, or a
  // summarize call on a session that was pruned from the cache).
  let loaded = readSessionByMemoryId(memorySessionId, paths);
  if (!loaded) {
    const stub = createSession(
      {
        contentSessionId: memorySessionId,
        memorySessionId,
        project,
        startedAtEpoch: createdAtEpoch,
      },
      paths,
    );
    loaded = { session: stub, prompts: [], summary: null };
  }

  const summary: SummaryRecord = {
    id: `${createdAtEpoch}-${hash8(memorySessionId)}`,
    memory_session_id: memorySessionId,
    project,
    request: input.request ?? null,
    investigated: input.investigated ?? null,
    learned: input.learned ?? null,
    completed: input.completed ?? null,
    next_steps: input.next_steps ?? null,
    notes: input.notes ?? null,
    files_read: input.files_read ?? [],
    files_edited: input.files_edited ?? [],
    prompt_number: options.promptNumber ?? null,
    discovery_tokens: options.discoveryTokens ?? 0,
    model: options.model ?? null,
    model_id: options.modelId ?? null,
    created_at: new Date(createdAtEpoch).toISOString(),
    created_at_epoch: createdAtEpoch,
    path: loaded.session.path,
  };
  atomicWrite(loaded.session.path, serializeSession(loaded.session, loaded.prompts, summary));
  return summary;
}

export function listSessions(
  opts: { project?: string; limit?: number; offset?: number; status?: SessionStatus } = {},
  paths: VaultPaths = getVaultPaths(),
): SessionRecord[] {
  const out: SessionRecord[] = [];
  if (!existsSync(paths.sessions)) return out;
  for (const dateDir of readdirSync(paths.sessions)) {
    const fullDir = resolve(paths.sessions, dateDir);
    if (!statSync(fullDir).isDirectory()) continue;
    for (const file of readdirSync(fullDir)) {
      if (!isVaultMarkdown(file)) continue;
      const parsed = deserializeSession(resolve(fullDir, file));
      if (!parsed) continue;
      if (opts.project && parsed.session.project !== opts.project) continue;
      if (opts.status && parsed.session.status !== opts.status) continue;
      out.push(parsed.session);
    }
  }
  out.sort((a, b) => b.started_at_epoch - a.started_at_epoch);
  const offset = opts.offset ?? 0;
  const sliced = offset > 0 ? out.slice(offset) : out;
  return typeof opts.limit === 'number' ? sliced.slice(0, opts.limit) : sliced;
}

export function listRecentSummaries(
  project?: string,
  limit = 10,
  paths: VaultPaths = getVaultPaths(),
): SummaryRecord[] {
  const sessions = listSessions({ project }, paths);
  const summaries: SummaryRecord[] = [];
  for (const s of sessions) {
    const loaded = deserializeSession(s.path);
    if (loaded?.summary) summaries.push(loaded.summary);
    if (summaries.length >= limit) break;
  }
  return summaries;
}

export function listRecentPrompts(
  project?: string,
  limit = 100,
  paths: VaultPaths = getVaultPaths(),
): PromptRecord[] {
  const sessions = listSessions({ project }, paths);
  const prompts: PromptRecord[] = [];
  for (const s of sessions) {
    const loaded = deserializeSession(s.path);
    if (loaded) prompts.push(...loaded.prompts);
    if (prompts.length >= limit) break;
  }
  prompts.sort((a, b) => b.created_at_epoch - a.created_at_epoch);
  return prompts.slice(0, limit);
}

export function getAllProjects(paths: VaultPaths = getVaultPaths()): string[] {
  const set = new Set<string>();
  for (const s of listSessions({}, paths)) set.add(s.project);
  return [...set].sort();
}
