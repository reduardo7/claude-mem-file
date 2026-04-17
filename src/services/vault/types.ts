/**
 * Type definitions for the Markdown vault storage layer.
 *
 * These types preserve the shape of what the old SQLite-backed SessionStore
 * returned, so HTTP route handlers don't need to change their response contracts.
 */

export type ObservationType =
  | 'decision'
  | 'bugfix'
  | 'feature'
  | 'refactor'
  | 'discovery'
  | 'change';

export type SessionStatus = 'active' | 'completed' | 'failed';

/** Stable string ID for a vault entry — `<unixMs>-<hash8>`. */
export type VaultId = string;

export interface SessionRecord {
  id: VaultId;
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
  failed_at_epoch: number | null;
  status: SessionStatus;
  worker_port: number | null;
  prompt_counter: number;
  path: string;
}

export interface ObservationInput {
  type: ObservationType;
  title?: string | null;
  subtitle?: string | null;
  facts?: string[] | null;
  narrative?: string | null;
  text?: string | null;
  concepts?: string[] | null;
  files_read?: string[] | null;
  files_modified?: string[] | null;
}

export interface ObservationRecord {
  id: VaultId;
  content_hash: string;
  memory_session_id: string;
  project: string;
  type: ObservationType;
  title: string | null;
  subtitle: string | null;
  facts: string[];
  narrative: string | null;
  text: string | null;
  concepts: string[];
  files_read: string[];
  files_modified: string[];
  prompt_number: number | null;
  discovery_tokens: number;
  model: string | null;
  model_id: string | null;
  created_at: string;
  created_at_epoch: number;
  path: string;
}

export interface SummaryInput {
  request?: string | null;
  investigated?: string | null;
  learned?: string | null;
  completed?: string | null;
  next_steps?: string | null;
  notes?: string | null;
  files_read?: string[] | null;
  files_edited?: string[] | null;
}

export interface SummaryRecord {
  id: VaultId;
  memory_session_id: string;
  project: string;
  request: string | null;
  investigated: string | null;
  learned: string | null;
  completed: string | null;
  next_steps: string | null;
  notes: string | null;
  files_read: string[];
  files_edited: string[];
  prompt_number: number | null;
  discovery_tokens: number;
  model: string | null;
  model_id: string | null;
  created_at: string;
  created_at_epoch: number;
  path: string;
}

export interface PromptRecord {
  id: VaultId;
  content_session_id: string;
  prompt_number: number;
  prompt_text: string;
  created_at: string;
  created_at_epoch: number;
}

export interface DateRange {
  start?: string | number;
  end?: string | number;
}

export interface SearchFilters {
  project?: string;
  type?: ObservationType | ObservationType[];
  concepts?: string | string[];
  files?: string | string[];
  dateRange?: DateRange;
}

export interface SearchOptions extends SearchFilters {
  limit?: number;
  offset?: number;
  orderBy?: 'relevance' | 'date_desc' | 'date_asc';
}

export interface SearchHit {
  id: VaultId;
  kind: 'observation' | 'session' | 'prompt' | 'summary';
  score: number;
  title: string | null;
  project: string;
  created_at_epoch: number;
  path: string;
}

export interface TimelineEntry {
  id: VaultId;
  kind: 'observation' | 'session' | 'prompt' | 'summary';
  title: string | null;
  project: string;
  created_at: string;
  created_at_epoch: number;
}

export interface TimelineData {
  before: TimelineEntry[];
  anchor: TimelineEntry | null;
  after: TimelineEntry[];
}
