import { readdirSync, statSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getVaultPaths, type VaultPaths } from '../paths.js';
import { parseObservationFile } from '../observations.js';
import { parseFrontmatter } from '../frontmatter.js';
import { readIfExists } from '../atomic.js';
import type { SearchIndex } from './SearchIndex.js';
import type { SessionRecord, SummaryRecord, SessionStatus, PromptRecord } from '../types.js';

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

function walkDir(dir: string, out: string[]): void {
  if (!existsSync(dir)) return;
  for (const entry of readdirSync(dir)) {
    const full = resolve(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) walkDir(full, out);
    else if (st.isFile() && full.endsWith('.md')) out.push(full);
  }
}

function indexObservationFile(index: SearchIndex, filepath: string): void {
  const rec = parseObservationFile(filepath);
  if (rec) index.addObservation(rec);
}

function indexSessionFile(index: SearchIndex, filepath: string): void {
  const raw = readIfExists(filepath);
  if (!raw) return;
  const { data } = parseFrontmatter<Record<string, unknown>>(raw);
  if (!data || data.type !== 'session') return;
  const sess: SessionRecord = {
    id: String(data.id ?? ''),
    content_session_id: String(data.content_session_id ?? ''),
    memory_session_id: (data.memory_session_id as string) ?? null,
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
  index.addSession(sess);

  const rawPrompts = Array.isArray(data.prompts) ? (data.prompts as Record<string, unknown>[]) : [];
  for (const p of rawPrompts) {
    const rec: PromptRecord = {
      id: `${sess.id}-p${p.prompt_number ?? 0}`,
      content_session_id: sess.content_session_id,
      prompt_number: Number(p.prompt_number ?? 0),
      prompt_text: String(p.prompt_text ?? ''),
      created_at: String(p.created_at ?? sess.started_at),
      created_at_epoch: Number(new Date(String(p.created_at ?? sess.started_at))),
    };
    index.addPrompt(rec, sess.project, filepath);
  }

  if (data.summary && typeof data.summary === 'object') {
    const s = data.summary as Record<string, unknown>;
    const summary: SummaryRecord = {
      id: String(s.id ?? `${sess.id}-summary`),
      memory_session_id: sess.memory_session_id ?? '',
      project: sess.project,
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
      created_at: String(s.created_at ?? sess.started_at),
      created_at_epoch: Number(s.created_at_epoch ?? sess.started_at_epoch),
      path: filepath,
    };
    index.addSummary(summary);
  }
}

export function indexVault(
  index: SearchIndex,
  paths: VaultPaths = getVaultPaths(),
): { observations: number; sessions: number } {
  index.clear();
  const obsFiles: string[] = [];
  walkDir(paths.observations, obsFiles);
  for (const f of obsFiles) indexObservationFile(index, f);

  const sessionFiles: string[] = [];
  walkDir(paths.sessions, sessionFiles);
  for (const f of sessionFiles) indexSessionFile(index, f);

  return { observations: obsFiles.length, sessions: sessionFiles.length };
}

export function indexSingleFile(index: SearchIndex, filepath: string): void {
  if (filepath.includes('/observations/')) {
    indexObservationFile(index, filepath);
  } else if (filepath.includes('/sessions/')) {
    indexSessionFile(index, filepath);
  }
}
