/**
 * SearchManager — thin façade over the vault's minisearch index.
 *
 * Exposes the same method surface `SearchRoutes` consumed from the legacy
 * SQLite/FTS5 implementation. Responses keep the `{ content: [{ type, text }] }`
 * MCP shape for CLI/agent callers, and the `{ observations, sessions, prompts }`
 * JSON shape for the viewer UI (`format: 'json'`).
 */

import { basename } from 'path';
import type { VaultStore } from '../vault/index.js';
import type {
  ObservationRecord,
  ObservationType,
  PromptRecord,
  SummaryRecord,
  SessionRecord,
} from '../vault/types.js';
import type { VaultStoreAdapter } from './VaultStoreAdapter.js';
import { logger } from '../../utils/logger.js';

interface NormalizedArgs {
  query?: string;
  type?: 'observations' | 'sessions' | 'prompts';
  limit?: number;
  project?: string;
  concepts?: string[];
  files?: string[];
  obs_type?: string[];
  dateRange?: { start?: string | number; end?: string | number };
  orderBy?: 'date_desc' | 'date_asc';
  format?: 'json' | 'text';
}

export interface SearchManagerOptions {
  vault: VaultStore;
  adapter: VaultStoreAdapter;
}

export class SearchManager {
  private vault: VaultStore;
  private adapter: VaultStoreAdapter;

  constructor(opts: SearchManagerOptions) {
    this.vault = opts.vault;
    this.adapter = opts.adapter;
  }

  // ---- Entry points matched to SearchRoutes -----------------------------

  async search(args: any): Promise<any> {
    const norm = this.normalizeParams(args);
    const { observations, sessions, prompts } = this.runSearch(norm);

    if (norm.format === 'json') {
      return {
        observations,
        sessions,
        prompts,
        totalResults: observations.length + sessions.length + prompts.length,
        query: norm.query ?? '',
      };
    }

    const total = observations.length + sessions.length + prompts.length;
    if (total === 0) {
      return {
        content: [{ type: 'text' as const, text: `No results found matching "${norm.query ?? ''}"` }],
      };
    }

    const lines: string[] = [];
    lines.push(`Found ${total} result(s)${norm.query ? ` matching "${norm.query}"` : ''} (${observations.length} obs, ${sessions.length} sessions, ${prompts.length} prompts)`);
    lines.push('');
    for (const obs of observations.slice(0, 25)) {
      const files = obs.files_modified?.length
        ? (obs.files_modified[0] as string)
        : obs.files_read?.length
          ? (obs.files_read[0] as string)
          : 'general';
      lines.push(`- [${obs.type}] ${obs.title ?? '(untitled)'} — ${basename(files)} (${obs.created_at})`);
    }
    return { content: [{ type: 'text' as const, text: lines.join('\n') }] };
  }

  async timeline(args: any): Promise<any> {
    const { anchor, query } = args;
    const depthBefore = Number(args.depth_before ?? 10);
    const depthAfter = Number(args.depth_after ?? 10);
    const project = args.project as string | undefined;

    if (!anchor && !query) {
      return this.errorResult('Must provide either "anchor" or "query" parameter');
    }
    if (anchor && query) {
      return this.errorResult('Cannot provide both "anchor" and "query"; use one.');
    }

    let anchorEpoch: number | undefined;
    let anchorId: string | undefined;

    if (query) {
      const hits = this.vault.search(query, { kind: 'observation', project, limit: 1 });
      if (hits.length === 0) {
        return {
          content: [{ type: 'text' as const, text: `No observations found matching "${query}"` }],
        };
      }
      anchorId = hits[0].id;
      anchorEpoch = hits[0].created_at_epoch;
    } else if (typeof anchor === 'number') {
      const strId = this.adapter['obsStr' as keyof typeof this.adapter]
        ? this.adapter.getObservationById(anchor)
        : null;
      if (!strId) {
        return this.errorResult(`Observation #${anchor} not found`);
      }
      anchorEpoch = strId.created_at_epoch;
    } else if (typeof anchor === 'string') {
      if (anchor.startsWith('S') || anchor.startsWith('#S')) {
        // Legacy session reference — not supported in vault-only mode.
        return this.errorResult(`Session anchor "${anchor}" not supported — pass an observation id or timestamp`);
      }
      const parsed = Date.parse(anchor);
      if (!Number.isNaN(parsed)) anchorEpoch = parsed;
    }

    if (anchorEpoch === undefined) {
      return this.errorResult('Unable to resolve anchor timestamp');
    }

    const timelineData = anchorId
      ? this.vault.timelineAroundId(anchorId, { depthBefore, depthAfter, project })
      : this.vault.timelineAroundTimestamp(anchorEpoch, { depthBefore, depthAfter, project });

    return {
      content: [{
        type: 'text' as const,
        text: this.renderTimelineText(timelineData),
      }],
      timeline: timelineData,
    };
  }

  async decisions(args: any): Promise<any> {
    return this.search({ ...args, type: 'observations', obs_type: 'decision' });
  }

  async changes(args: any): Promise<any> {
    return this.search({ ...args, type: 'observations', obs_type: 'change,refactor,bugfix,feature' });
  }

  async howItWorks(args: any): Promise<any> {
    return this.search({ ...args, type: 'observations', obs_type: 'discovery' });
  }

  async searchObservations(args: any): Promise<any> {
    const norm = this.normalizeParams({ ...args, type: 'observations' });
    const { observations } = this.runSearch(norm);
    return { observations, count: observations.length };
  }

  async searchSessions(args: any): Promise<any> {
    const norm = this.normalizeParams({ ...args, type: 'sessions' });
    const { sessions } = this.runSearch(norm);
    return { sessions, count: sessions.length };
  }

  async searchUserPrompts(args: any): Promise<any> {
    const norm = this.normalizeParams({ ...args, type: 'prompts' });
    const { prompts } = this.runSearch(norm);
    return { prompts, count: prompts.length };
  }

  async findByConcept(args: any): Promise<any> {
    const concept = (args.concept as string) ?? '';
    if (!concept) return { observations: [], count: 0 };
    const observations = this.vault.listObservations({
      project: args.project,
      concepts: concept,
      limit: this.parseLimit(args.limit, 10),
    });
    return { observations, count: observations.length };
  }

  async findByFile(args: any): Promise<any> {
    const filePath = (args.filePath as string) ?? '';
    if (!filePath) return { observations: [], sessions: [], count: 0 };
    const observations = this.vault.listObservations({
      project: args.project,
      files: filePath,
      limit: this.parseLimit(args.limit, 10),
    });
    return { observations, count: observations.length };
  }

  async findByType(args: any): Promise<any> {
    const type = (args.type as string) ?? '';
    if (!type) return { observations: [], count: 0 };
    const observations = this.vault.listObservations({
      project: args.project,
      type: type as ObservationType,
      limit: this.parseLimit(args.limit, 10),
    });
    return { observations, count: observations.length };
  }

  async getRecentContext(args: any): Promise<any> {
    const project = (args.project as string) ?? '';
    const limit = this.parseLimit(args.limit, 3);
    if (!project) return { summaries: [], observations: [] };
    const summaries = this.vault.listRecentSummaries(project, limit);
    const observations = this.vault.listObservations({ project, limit: 20, orderBy: 'date_desc' });
    return { summaries, observations };
  }

  async getContextTimeline(args: any): Promise<any> {
    const anchor = args.anchor;
    const depthBefore = Number(args.depth_before ?? 10);
    const depthAfter = Number(args.depth_after ?? 10);
    const project = args.project as string | undefined;
    const anchorEpoch =
      typeof anchor === 'number' ? anchor : Date.parse(String(anchor ?? Date.now()));
    return this.vault.timelineAroundTimestamp(anchorEpoch, { depthBefore, depthAfter, project });
  }

  async getTimelineByQuery(args: any): Promise<any> {
    return this.timeline({ ...args, query: args.query });
  }

  // ---- Helpers ----------------------------------------------------------

  private normalizeParams(args: any): NormalizedArgs {
    const out: NormalizedArgs = {};
    if (!args) return out;
    out.query = typeof args.query === 'string' && args.query.trim() ? args.query.trim() : undefined;
    out.type = args.type as NormalizedArgs['type'];
    out.project = args.project as string | undefined;
    out.limit = this.parseLimit(args.limit);
    out.orderBy = args.orderBy;
    out.format = args.format === 'json' ? 'json' : undefined;

    if (args.concepts) {
      out.concepts = Array.isArray(args.concepts)
        ? args.concepts
        : String(args.concepts).split(',').map((s) => s.trim()).filter(Boolean);
    }
    if (args.files) {
      out.files = Array.isArray(args.files)
        ? args.files
        : String(args.files).split(',').map((s) => s.trim()).filter(Boolean);
    }
    if (args.obs_type) {
      out.obs_type = Array.isArray(args.obs_type)
        ? args.obs_type
        : String(args.obs_type).split(',').map((s) => s.trim()).filter(Boolean);
    }
    if (args.filePath && !out.files) {
      out.files = [args.filePath as string];
    }
    if (args.dateStart || args.dateEnd) {
      out.dateRange = { start: args.dateStart, end: args.dateEnd };
    }
    return out;
  }

  private runSearch(norm: NormalizedArgs): {
    observations: ObservationRecord[];
    sessions: SummaryWithSession[];
    prompts: PromptWithSession[];
  } {
    const shouldInclude = (kind: 'observation' | 'session' | 'prompt') => {
      if (!norm.type) return true;
      if (norm.type === 'observations') return kind === 'observation';
      if (norm.type === 'sessions') return kind === 'session';
      if (norm.type === 'prompts') return kind === 'prompt';
      return true;
    };

    let observations: ObservationRecord[] = [];
    let summaries: SummaryRecord[] = [];
    let prompts: PromptRecord[] = [];

    if (norm.query) {
      const hits = this.vault.search(norm.query, {
        kind: norm.type ? mapTypeToKind(norm.type) : undefined,
        project: norm.project,
        limit: norm.limit ?? 50,
        obs_type: norm.obs_type,
      });
      for (const hit of hits) {
        if (hit.kind === 'observation') {
          const rec = this.vault.getObservationById(hit.id);
          if (rec) observations.push(rec);
        } else if (hit.kind === 'summary' || hit.kind === 'session') {
          // Summary hit — resolve the summary by id via session.
          const summary = this.resolveSummaryByHitId(hit.id);
          if (summary) summaries.push(summary);
        } else if (hit.kind === 'prompt') {
          const prompt = this.resolvePromptByHitId(hit.id);
          if (prompt) prompts.push(prompt);
        }
      }
    } else {
      if (shouldInclude('observation')) {
        observations = this.vault.listObservations({
          project: norm.project,
          type: norm.obs_type as ObservationType[] | undefined,
          concepts: norm.concepts,
          files: norm.files,
          dateRange: norm.dateRange,
          limit: norm.limit ?? 20,
          orderBy: norm.orderBy ?? 'date_desc',
        });
      }
      if (shouldInclude('session')) {
        const sessions = this.vault.listSessions({ project: norm.project, limit: norm.limit ?? 20 });
        for (const s of sessions) {
          const summary = s.memory_session_id
            ? this.vault.getSummaryForSession(s.memory_session_id)
            : null;
          if (summary) summaries.push(summary);
        }
      }
      if (shouldInclude('prompt')) {
        prompts = this.vault.listRecentPrompts(norm.project, norm.limit ?? 20);
      }
    }

    const sessionsWithInfo = summaries.map((s): SummaryWithSession => ({
      ...s,
      platform_source:
        (s.memory_session_id && this.vault.getSessionByMemoryId(s.memory_session_id)?.platform_source) ||
        'claude',
    }));
    const promptsWithInfo = prompts.map((p): PromptWithSession => {
      const session = this.vault.getSessionByContentId(p.content_session_id);
      return {
        ...p,
        project: session?.project ?? '',
        platform_source: session?.platform_source ?? 'claude',
        memory_session_id: session?.memory_session_id ?? undefined,
      };
    });

    return { observations, sessions: sessionsWithInfo, prompts: promptsWithInfo };
  }

  private resolveSummaryByHitId(id: string): SummaryRecord | null {
    for (const s of this.vault.listSessions()) {
      if (!s.memory_session_id) continue;
      const summary = this.vault.getSummaryForSession(s.memory_session_id);
      if (summary?.id === id) return summary;
    }
    return null;
  }

  private resolvePromptByHitId(id: string): PromptRecord | null {
    // Prompts live embedded on session files. Walk sessions and match on id.
    for (const s of this.vault.listSessions()) {
      const prompts = this.vault
        .listRecentPrompts(s.project, Number.MAX_SAFE_INTEGER)
        .filter((p) => p.content_session_id === s.content_session_id);
      const hit = prompts.find((p) => p.id === id);
      if (hit) return hit;
    }
    return null;
  }

  private renderTimelineText(timeline: {
    before: Array<{ title: string | null; kind: string; created_at: string }>;
    anchor: { title: string | null; kind: string; created_at: string } | null;
    after: Array<{ title: string | null; kind: string; created_at: string }>;
  }): string {
    const lines: string[] = [];
    for (const e of timeline.before) lines.push(`- ${e.created_at} [${e.kind}] ${e.title ?? ''}`);
    if (timeline.anchor) lines.push(`→ ${timeline.anchor.created_at} [${timeline.anchor.kind}] ${timeline.anchor.title ?? ''}`);
    for (const e of timeline.after) lines.push(`- ${e.created_at} [${e.kind}] ${e.title ?? ''}`);
    return lines.length > 0 ? lines.join('\n') : 'Timeline empty';
  }

  private errorResult(message: string): any {
    logger.debug('SEARCH', `Timeline error: ${message}`);
    return { content: [{ type: 'text' as const, text: `Error: ${message}` }], isError: true };
  }

  private parseLimit(raw: unknown, fallback?: number): number | undefined {
    if (raw === undefined || raw === null || raw === '') return fallback;
    const n = typeof raw === 'number' ? raw : parseInt(String(raw), 10);
    if (!Number.isFinite(n) || n <= 0) return fallback;
    return n;
  }
}

function mapTypeToKind(type: 'observations' | 'sessions' | 'prompts') {
  switch (type) {
    case 'observations': return 'observation' as const;
    case 'sessions': return 'session' as const;
    case 'prompts': return 'prompt' as const;
  }
}

interface SummaryWithSession extends SummaryRecord {
  platform_source: string;
}

interface PromptWithSession extends PromptRecord {
  project: string;
  platform_source: string;
  memory_session_id?: string;
}
