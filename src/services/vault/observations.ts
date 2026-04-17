import { readdirSync, existsSync, statSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { dateFolder, getVaultPaths, type VaultPaths } from './paths.js';
import { parseFrontmatter, stringifyFrontmatter } from './frontmatter.js';
import { sha256, canonicalize } from './hash.js';
import { atomicWrite, readIfExists } from './atomic.js';
import type {
  ObservationInput,
  ObservationRecord,
  ObservationType,
  SearchOptions,
} from './types.js';

const VOLATILE_KEYS = ['created_at', 'created_at_epoch', 'id', 'path'];

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

function buildHashPayload(
  memorySessionId: string,
  project: string,
  obs: ObservationInput,
  promptNumber?: number,
): string {
  return canonicalize(
    {
      memory_session_id: memorySessionId,
      project,
      type: obs.type,
      title: obs.title ?? null,
      subtitle: obs.subtitle ?? null,
      facts: obs.facts ?? [],
      narrative: obs.narrative ?? obs.text ?? null,
      concepts: obs.concepts ?? [],
      files_read: obs.files_read ?? [],
      files_modified: obs.files_modified ?? [],
      prompt_number: promptNumber ?? null,
    },
    VOLATILE_KEYS,
  );
}

export interface WriteObservationParams {
  memorySessionId: string;
  project: string;
  observation: ObservationInput;
  promptNumber?: number;
  discoveryTokens?: number;
  createdAtEpoch?: number;
  model?: string | null;
  modelId?: string | null;
}

export interface WrittenObservation {
  id: string;
  path: string;
  createdAtEpoch: number;
  contentHash: string;
  isDuplicate: boolean;
}

export function writeObservation(
  params: WriteObservationParams,
  paths: VaultPaths = getVaultPaths(),
): WrittenObservation {
  const {
    memorySessionId,
    project,
    observation,
    promptNumber,
    discoveryTokens = 0,
    createdAtEpoch = Date.now(),
    model = null,
    modelId = null,
  } = params;

  const canonical = buildHashPayload(memorySessionId, project, observation, promptNumber);
  const fullHash = sha256(canonical);
  const shortHash = fullHash.slice(0, 8);
  const id = `${createdAtEpoch}-${shortHash}`;

  const folder = resolve(paths.observations, dateFolder(createdAtEpoch));
  const filepath = resolve(folder, `obs-${id}.md`);

  // dedup: if an observation with same hash already exists anywhere in vault, skip write
  const duplicate = findObservationByHash(fullHash, paths);
  if (duplicate) {
    return {
      id: duplicate.id,
      path: duplicate.path,
      createdAtEpoch: duplicate.created_at_epoch,
      contentHash: fullHash,
      isDuplicate: true,
    };
  }

  const createdIso = new Date(createdAtEpoch).toISOString();
  const frontmatter: Record<string, unknown> = {
    type: 'observation',
    id,
    content_hash: fullHash,
    memory_session_id: memorySessionId,
    project,
    observation_type: observation.type,
    created_at: createdIso,
    created_at_epoch: createdAtEpoch,
    prompt_number: promptNumber ?? null,
    discovery_tokens: discoveryTokens,
    model,
    model_id: modelId,
    title: observation.title ?? null,
    subtitle: observation.subtitle ?? null,
    concepts: observation.concepts ?? [],
    files_read: observation.files_read ?? [],
    files_modified: observation.files_modified ?? [],
  };

  const bodyParts: string[] = [];
  if (observation.title) bodyParts.push(`# ${observation.title}`);
  if (observation.subtitle) bodyParts.push(`*${observation.subtitle}*`);
  const narrative = observation.narrative ?? observation.text ?? null;
  if (narrative) {
    bodyParts.push(`## Narrative\n\n${narrative}`);
  }
  if (observation.facts && observation.facts.length) {
    bodyParts.push(`## Facts\n\n${observation.facts.map((f) => `- ${f}`).join('\n')}`);
  }
  const body = bodyParts.join('\n\n') + (bodyParts.length ? '\n' : '');

  atomicWrite(filepath, stringifyFrontmatter(frontmatter, body));

  return {
    id,
    path: filepath,
    createdAtEpoch,
    contentHash: fullHash,
    isDuplicate: false,
  };
}

const VALID_OBSERVATION_TYPES: ReadonlySet<ObservationType> = new Set([
  'decision',
  'bugfix',
  'feature',
  'refactor',
  'discovery',
  'change',
]);

function resolveObservationType(data: Record<string, unknown>): ObservationType {
  const raw = data.observation_type ?? data.type;
  return typeof raw === 'string' && VALID_OBSERVATION_TYPES.has(raw as ObservationType)
    ? (raw as ObservationType)
    : 'discovery';
}

export function parseObservationFile(filepath: string): ObservationRecord | null {
  const raw = readIfExists(filepath);
  if (!raw) return null;
  const { data, body } = parseFrontmatter<Record<string, unknown>>(raw);
  if (!data || data.type !== 'observation') return null;
  const createdEpoch = Number(data.created_at_epoch ?? Date.parse(String(data.created_at ?? '')));
  const narrative = extractSection(body, 'Narrative');
  return {
    id: String(data.id ?? basename(filepath, '.md').replace(/^obs-/, '')),
    content_hash: String(data.content_hash ?? ''),
    memory_session_id: String(data.memory_session_id ?? ''),
    project: String(data.project ?? ''),
    type: resolveObservationType(data),
    title: (data.title as string) ?? null,
    subtitle: (data.subtitle as string) ?? null,
    facts: normalizeList(data.facts),
    narrative,
    // legacy callers read `.text`; keep it identical to narrative so both paths resolve.
    text: narrative,
    concepts: normalizeList(data.concepts),
    files_read: normalizeList(data.files_read),
    files_modified: normalizeList(data.files_modified),
    prompt_number: data.prompt_number == null ? null : Number(data.prompt_number),
    discovery_tokens: Number(data.discovery_tokens ?? 0),
    model: (data.model as string) ?? null,
    model_id: (data.model_id as string) ?? null,
    created_at: String(data.created_at ?? new Date(createdEpoch || Date.now()).toISOString()),
    created_at_epoch: createdEpoch || Date.now(),
    path: filepath,
  };
}

function isVaultMarkdown(file: string): boolean {
  // Skip hidden files (including atomic-write tmp files like `.1234-ab.tmp`).
  return file.endsWith('.md') && !file.startsWith('.');
}

function extractSection(body: string, heading: string): string | null {
  const re = new RegExp(`##\\s+${heading}\\s*\\n([\\s\\S]*?)(?=\\n##\\s|$)`, 'i');
  const match = body.match(re);
  return match ? match[1].trim() : null;
}

function findObservationByHash(hash: string, paths: VaultPaths): ObservationRecord | null {
  if (!existsSync(paths.observations)) return null;
  for (const dateDir of readdirSync(paths.observations)) {
    const fullDir = resolve(paths.observations, dateDir);
    if (!statSync(fullDir).isDirectory()) continue;
    for (const file of readdirSync(fullDir)) {
      if (!isVaultMarkdown(file)) continue;
      // Fast path: hash is encoded in filename's trailing 8 chars
      if (!file.includes(hash.slice(0, 8))) continue;
      const rec = parseObservationFile(resolve(fullDir, file));
      if (rec && rec.content_hash === hash) return rec;
    }
  }
  return null;
}

export function readObservationById(id: string, paths: VaultPaths = getVaultPaths()): ObservationRecord | null {
  if (!existsSync(paths.observations)) return null;
  const tail = id.split('-').pop() ?? '';
  for (const dateDir of readdirSync(paths.observations)) {
    const fullDir = resolve(paths.observations, dateDir);
    if (!statSync(fullDir).isDirectory()) continue;
    for (const file of readdirSync(fullDir)) {
      if (file === `obs-${id}.md`) return parseObservationFile(resolve(fullDir, file));
      if (file.endsWith(`-${tail}.md`)) {
        const rec = parseObservationFile(resolve(fullDir, file));
        if (rec && rec.id === id) return rec;
      }
    }
  }
  return null;
}

export interface ListObservationsOptions extends SearchOptions {
  observationType?: ObservationType | ObservationType[];
  platformSource?: string;
}

export function listObservations(
  opts: ListObservationsOptions = {},
  paths: VaultPaths = getVaultPaths(),
): ObservationRecord[] {
  const { project, limit, offset = 0, orderBy = 'date_desc' } = opts;
  const allowedTypes = opts.observationType
    ? new Set(Array.isArray(opts.observationType) ? opts.observationType : [opts.observationType])
    : opts.type
    ? new Set(Array.isArray(opts.type) ? opts.type : [opts.type])
    : null;
  const concepts = opts.concepts ? (Array.isArray(opts.concepts) ? opts.concepts : [opts.concepts]) : null;
  const files = opts.files ? (Array.isArray(opts.files) ? opts.files : [opts.files]) : null;
  const dateStart = opts.dateRange?.start ? Number(new Date(opts.dateRange.start)) : null;
  const dateEnd = opts.dateRange?.end ? Number(new Date(opts.dateRange.end)) : null;

  const out: ObservationRecord[] = [];
  if (!existsSync(paths.observations)) return out;
  for (const dateDir of readdirSync(paths.observations)) {
    const fullDir = resolve(paths.observations, dateDir);
    if (!statSync(fullDir).isDirectory()) continue;
    for (const file of readdirSync(fullDir)) {
      if (!isVaultMarkdown(file)) continue;
      const rec = parseObservationFile(resolve(fullDir, file));
      if (!rec) continue;
      if (project && rec.project !== project) continue;
      if (allowedTypes && !allowedTypes.has(rec.type)) continue;
      if (concepts && !concepts.some((c) => rec.concepts.includes(c))) continue;
      if (
        files &&
        !files.some((f) => rec.files_read.includes(f) || rec.files_modified.includes(f))
      )
        continue;
      if (dateStart && rec.created_at_epoch < dateStart) continue;
      if (dateEnd && rec.created_at_epoch > dateEnd) continue;
      out.push(rec);
    }
  }
  out.sort((a, b) =>
    orderBy === 'date_asc' ? a.created_at_epoch - b.created_at_epoch : b.created_at_epoch - a.created_at_epoch,
  );
  const sliced = offset > 0 ? out.slice(offset) : out;
  return typeof limit === 'number' ? sliced.slice(0, limit) : sliced;
}

export function countObservations(project?: string, paths: VaultPaths = getVaultPaths()): number {
  return listObservations({ project }, paths).length;
}

export function listObservationsByIds(ids: string[], paths: VaultPaths = getVaultPaths()): ObservationRecord[] {
  return ids.map((id) => readObservationById(id, paths)).filter((r): r is ObservationRecord => !!r);
}
