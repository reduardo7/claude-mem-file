/**
 * PaginationHelper: DRY pagination utility backed by the vault.
 *
 * Emits the same Observation/Summary/UserPrompt shapes the viewer UI expects,
 * but reads from the Markdown vault instead of raw SQLite. Pagination uses
 * list+slice; the vault's corpus is small enough that full scans stay cheap.
 */

import { DatabaseManager } from './DatabaseManager.js';
import { logger } from '../../utils/logger.js';
import { DEFAULT_PLATFORM_SOURCE, normalizePlatformSource } from '../../shared/platform-source.js';
import type { PaginatedResult, Observation, Summary, UserPrompt } from '../worker-types.js';

export class PaginationHelper {
  constructor(private dbManager: DatabaseManager) {}

  private stripProjectPath(filePath: string, projectName: string): string {
    const marker = `/${projectName}/`;
    const index = filePath.indexOf(marker);
    if (index !== -1) return filePath.substring(index + marker.length);
    return filePath;
  }

  private stripProjectPaths(filePathsStr: string | null, projectName: string): string | null {
    if (!filePathsStr) return filePathsStr;
    try {
      const paths = JSON.parse(filePathsStr) as string[];
      return JSON.stringify(paths.map((p) => this.stripProjectPath(p, projectName)));
    } catch (err) {
      logger.debug('WORKER', 'File paths is plain string, using as-is', {}, err as Error);
      return filePathsStr;
    }
  }

  private sanitizeObservation(obs: Observation): Observation {
    return {
      ...obs,
      files_read: this.stripProjectPaths(obs.files_read, obs.project),
      files_modified: this.stripProjectPaths(obs.files_modified, obs.project),
    };
  }

  getObservations(
    offset: number,
    limit: number,
    project?: string,
    platformSource?: string,
  ): PaginatedResult<Observation> {
    const vault = this.dbManager.getVaultStore();
    const store = this.dbManager.getSessionStore();
    const all = vault.listObservations({ project, orderBy: 'date_desc' });
    const filtered = platformSource
      ? all.filter((o) => {
          const session = o.memory_session_id
            ? vault.getSessionByMemoryId(o.memory_session_id)
            : null;
          return normalizePlatformSource(session?.platform_source ?? DEFAULT_PLATFORM_SOURCE) ===
            platformSource;
        })
      : all;

    const page = filtered.slice(offset, offset + limit + 1);
    const hasMore = page.length > limit;
    void store;
    const items = page.slice(0, limit).map((o) => {
      const session = o.memory_session_id
        ? vault.getSessionByMemoryId(o.memory_session_id)
        : null;
      return this.sanitizeObservation({
        id: this.dbManager.obsNumFor(o.id),
        memory_session_id: o.memory_session_id,
        project: o.project,
        platform_source: session?.platform_source ?? DEFAULT_PLATFORM_SOURCE,
        type: o.type,
        title: o.title,
        subtitle: o.subtitle,
        narrative: o.narrative,
        text: o.narrative ?? o.text ?? null,
        facts: o.facts.length ? JSON.stringify(o.facts) : null,
        concepts: o.concepts.length ? JSON.stringify(o.concepts) : null,
        files_read: o.files_read.length ? JSON.stringify(o.files_read) : null,
        files_modified: o.files_modified.length ? JSON.stringify(o.files_modified) : null,
        prompt_number: o.prompt_number,
        created_at: o.created_at,
        created_at_epoch: o.created_at_epoch,
      } as Observation);
    });
    return { items, hasMore, offset, limit };
  }

  getSummaries(
    offset: number,
    limit: number,
    project?: string,
    platformSource?: string,
  ): PaginatedResult<Summary> {
    const vault = this.dbManager.getVaultStore();
    const sessions = vault.listSessions({ project });
    const rows: Summary[] = [];
    for (const session of sessions) {
      if (platformSource && normalizePlatformSource(session.platform_source) !== platformSource) continue;
      const summary = session.memory_session_id
        ? vault.getSummaryForSession(session.memory_session_id)
        : null;
      if (!summary) continue;
      rows.push({
        id: this.dbManager.summaryNumFor(summary.id),
        session_id: session.content_session_id,
        platform_source: session.platform_source,
        request: summary.request,
        investigated: summary.investigated,
        learned: summary.learned,
        completed: summary.completed,
        next_steps: summary.next_steps,
        project: summary.project,
        created_at: summary.created_at,
        created_at_epoch: summary.created_at_epoch,
      } as Summary);
    }
    rows.sort((a, b) => (b.created_at_epoch as number) - (a.created_at_epoch as number));
    const page = rows.slice(offset, offset + limit + 1);
    return {
      items: page.slice(0, limit),
      hasMore: page.length > limit,
      offset,
      limit,
    };
  }

  getPrompts(
    offset: number,
    limit: number,
    project?: string,
    platformSource?: string,
  ): PaginatedResult<UserPrompt> {
    const vault = this.dbManager.getVaultStore();
    const sessions = vault.listSessions(project ? { project } : {});
    const rows: UserPrompt[] = [];
    for (const session of sessions) {
      if (platformSource && normalizePlatformSource(session.platform_source) !== platformSource) continue;
      const prompts = vault
        .listRecentPrompts(session.project, Number.MAX_SAFE_INTEGER)
        .filter((p) => p.content_session_id === session.content_session_id);
      for (const p of prompts) {
        rows.push({
          id: this.dbManager.promptNumFor(p.id),
          content_session_id: p.content_session_id,
          project: session.project,
          platform_source: session.platform_source,
          prompt_number: p.prompt_number,
          prompt_text: p.prompt_text,
          created_at: p.created_at,
          created_at_epoch: p.created_at_epoch,
        } as UserPrompt);
      }
    }
    rows.sort((a, b) => (b.created_at_epoch as number) - (a.created_at_epoch as number));
    const page = rows.slice(offset, offset + limit + 1);
    return {
      items: page.slice(0, limit),
      hasMore: page.length > limit,
      offset,
      limit,
    };
  }
}
