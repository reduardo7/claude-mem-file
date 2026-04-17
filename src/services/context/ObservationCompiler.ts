/**
 * ObservationCompiler - Query building and data retrieval for context
 *
 * Queries the Markdown vault for observations and summaries, and extracts
 * prior session messages from Claude Code transcripts.
 */

import path from 'path';
import { existsSync, readFileSync } from 'fs';
import { logger } from '../../utils/logger.js';
import { SYSTEM_REMINDER_REGEX } from '../../utils/tag-stripping.js';
import { CLAUDE_CONFIG_DIR } from '../../shared/paths.js';
import type { VaultStore } from '../vault/index.js';
import type { ObservationRecord, SummaryRecord, SessionRecord } from '../vault/types.js';
import type {
  ContextConfig,
  Observation,
  SessionSummary,
  SummaryTimelineItem,
  TimelineItem,
  PriorMessages,
} from './types.js';
import { SUMMARY_LOOKAHEAD } from './types.js';

function toObservation(rec: ObservationRecord, session: SessionRecord | null): Observation {
  return {
    id: rec.id as unknown as number, // Observation shape keeps id as number; vault string id is sliced for sort only.
    memory_session_id: rec.memory_session_id,
    platform_source: session?.platform_source ?? 'claude',
    type: rec.type,
    title: rec.title,
    subtitle: rec.subtitle,
    narrative: rec.narrative,
    facts: rec.facts.length ? JSON.stringify(rec.facts) : null,
    concepts: rec.concepts.length ? JSON.stringify(rec.concepts) : null,
    files_read: rec.files_read.length ? JSON.stringify(rec.files_read) : null,
    files_modified: rec.files_modified.length ? JSON.stringify(rec.files_modified) : null,
    discovery_tokens: rec.discovery_tokens,
    created_at: rec.created_at,
    created_at_epoch: rec.created_at_epoch,
    project: rec.project,
  } as Observation;
}

function toSummary(rec: SummaryRecord, session: SessionRecord | null): SessionSummary {
  return {
    id: rec.id as unknown as number,
    memory_session_id: rec.memory_session_id,
    platform_source: session?.platform_source ?? 'claude',
    request: rec.request,
    investigated: rec.investigated,
    learned: rec.learned,
    completed: rec.completed,
    next_steps: rec.next_steps,
    created_at: rec.created_at,
    created_at_epoch: rec.created_at_epoch,
    project: rec.project,
  } as SessionSummary;
}

function matchesPlatform(session: SessionRecord | null, platformSource?: string): boolean {
  if (!platformSource) return true;
  return (session?.platform_source ?? 'claude') === platformSource;
}

export function queryObservations(
  db: VaultStore,
  project: string,
  config: ContextConfig,
  platformSource?: string,
): Observation[] {
  return queryObservationsMulti(db, [project], config, platformSource);
}

export function queryObservationsMulti(
  db: VaultStore,
  projects: string[],
  config: ContextConfig,
  platformSource?: string,
): Observation[] {
  const allowedTypes = new Set(config.observationTypes);
  const allowedConcepts = new Set(config.observationConcepts);
  const sessionCache = new Map<string, SessionRecord | null>();
  const resolveSession = (memoryId: string | null) => {
    if (!memoryId) return null;
    if (sessionCache.has(memoryId)) return sessionCache.get(memoryId)!;
    const s = db.getSessionByMemoryId(memoryId);
    sessionCache.set(memoryId, s ?? null);
    return s ?? null;
  };

  const projectSet = new Set(projects);
  const out: Observation[] = [];
  for (const rec of db.listObservations({ orderBy: 'date_desc' })) {
    if (!projectSet.has(rec.project)) continue;
    if (!allowedTypes.has(rec.type)) continue;
    if (allowedConcepts.size > 0 && !rec.concepts.some((c) => allowedConcepts.has(c))) continue;
    const session = resolveSession(rec.memory_session_id);
    if (!matchesPlatform(session, platformSource)) continue;
    out.push(toObservation(rec, session));
    if (out.length >= config.totalObservationCount) break;
  }
  return out;
}

export function querySummaries(
  db: VaultStore,
  project: string,
  config: ContextConfig,
  platformSource?: string,
): SessionSummary[] {
  return querySummariesMulti(db, [project], config, platformSource);
}

export function querySummariesMulti(
  db: VaultStore,
  projects: string[],
  config: ContextConfig,
  platformSource?: string,
): SessionSummary[] {
  const projectSet = new Set(projects);
  const out: Array<{ rec: SummaryRecord; session: SessionRecord }> = [];
  for (const session of db.listSessions()) {
    if (!projectSet.has(session.project)) continue;
    if (!matchesPlatform(session, platformSource)) continue;
    const summary = session.memory_session_id
      ? db.getSummaryForSession(session.memory_session_id)
      : null;
    if (!summary) continue;
    out.push({ rec: summary, session });
  }
  out.sort((a, b) => b.rec.created_at_epoch - a.rec.created_at_epoch);
  return out
    .slice(0, config.sessionCount + SUMMARY_LOOKAHEAD)
    .map(({ rec, session }) => toSummary(rec, session));
}

function cwdToDashed(cwd: string): string {
  return cwd.replace(/\//g, '-');
}

export function extractPriorMessages(transcriptPath: string): PriorMessages {
  try {
    if (!existsSync(transcriptPath)) {
      return { userMessage: '', assistantMessage: '' };
    }
    const content = readFileSync(transcriptPath, 'utf-8').trim();
    if (!content) return { userMessage: '', assistantMessage: '' };

    const lines = content.split('\n').filter((line) => line.trim());
    let lastAssistantMessage = '';
    for (let i = lines.length - 1; i >= 0; i--) {
      try {
        const line = lines[i];
        if (!line.includes('"type":"assistant"')) continue;
        const entry = JSON.parse(line);
        if (entry.type === 'assistant' && entry.message?.content && Array.isArray(entry.message.content)) {
          let text = '';
          for (const block of entry.message.content) {
            if (block.type === 'text') text += block.text;
          }
          text = text.replace(SYSTEM_REMINDER_REGEX, '').trim();
          if (text) {
            lastAssistantMessage = text;
            break;
          }
        }
      } catch (parseError) {
        logger.debug('PARSER', 'Skipping malformed transcript line', { lineIndex: i }, parseError as Error);
      }
    }
    return { userMessage: '', assistantMessage: lastAssistantMessage };
  } catch (error) {
    logger.failure('WORKER', `Failed to extract prior messages from transcript`, { transcriptPath }, error as Error);
    return { userMessage: '', assistantMessage: '' };
  }
}

export function getPriorSessionMessages(
  observations: Observation[],
  config: ContextConfig,
  currentSessionId: string | undefined,
  cwd: string,
): PriorMessages {
  if (!config.showLastMessage || observations.length === 0) {
    return { userMessage: '', assistantMessage: '' };
  }
  const priorSessionObs = observations.find((obs) => obs.memory_session_id !== currentSessionId);
  if (!priorSessionObs) return { userMessage: '', assistantMessage: '' };

  const priorSessionId = priorSessionObs.memory_session_id;
  const dashedCwd = cwdToDashed(cwd);
  const transcriptPath = path.join(CLAUDE_CONFIG_DIR, 'projects', dashedCwd, `${priorSessionId}.jsonl`);
  return extractPriorMessages(transcriptPath);
}

export function prepareSummariesForTimeline(
  displaySummaries: SessionSummary[],
  allSummaries: SessionSummary[],
): SummaryTimelineItem[] {
  const mostRecentSummaryId = allSummaries[0]?.id;
  return displaySummaries.map((summary, i) => {
    const olderSummary = i === 0 ? null : allSummaries[i + 1];
    return {
      ...summary,
      displayEpoch: olderSummary ? olderSummary.created_at_epoch : summary.created_at_epoch,
      displayTime: olderSummary ? olderSummary.created_at : summary.created_at,
      shouldShowLink: summary.id !== mostRecentSummaryId,
    };
  });
}

export function buildTimeline(
  observations: Observation[],
  summaries: SummaryTimelineItem[],
): TimelineItem[] {
  const timeline: TimelineItem[] = [
    ...observations.map((obs) => ({ type: 'observation' as const, data: obs })),
    ...summaries.map((summary) => ({ type: 'summary' as const, data: summary })),
  ];
  timeline.sort((a, b) => {
    const aEpoch = a.type === 'observation' ? a.data.created_at_epoch : a.data.displayEpoch;
    const bEpoch = b.type === 'observation' ? b.data.created_at_epoch : b.data.displayEpoch;
    return aEpoch - bEpoch;
  });
  return timeline;
}

export function getFullObservationIds(
  observations: Observation[],
  count: number,
): Set<number> {
  return new Set(observations.slice(0, count).map((obs) => obs.id));
}
