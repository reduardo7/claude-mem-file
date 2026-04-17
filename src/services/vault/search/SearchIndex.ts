import MiniSearch from 'minisearch';
import type { SearchOptions as MSOptions } from 'minisearch';
import type { ObservationRecord, SessionRecord, SummaryRecord, PromptRecord } from '../types.js';

export type IndexKind = 'observation' | 'session' | 'summary' | 'prompt';

export interface IndexDoc {
  id: string;                // kind:id
  kind: IndexKind;
  realId: string;
  title: string | null;
  body: string;
  project: string;
  obs_type: string | null;
  concepts: string;
  files: string;
  created_at_epoch: number;
  path: string;
}

const FIELDS = ['title', 'body', 'project', 'obs_type', 'concepts', 'files'];
const STORED = ['kind', 'realId', 'title', 'project', 'obs_type', 'created_at_epoch', 'path'];

function concat(...parts: Array<string | null | undefined>): string {
  return parts.filter(Boolean).join(' ').trim();
}

export class SearchIndex {
  private mini = new MiniSearch<IndexDoc>({
    fields: FIELDS,
    storeFields: STORED,
    searchOptions: {
      prefix: true,
      fuzzy: 0.2,
      boost: { title: 3, concepts: 2, body: 1 },
    },
  });
  private docsById = new Map<string, IndexDoc>();

  addObservation(obs: ObservationRecord): void {
    const doc: IndexDoc = {
      id: `observation:${obs.id}`,
      kind: 'observation',
      realId: obs.id,
      title: obs.title,
      body: concat(obs.subtitle, obs.narrative, obs.text, obs.facts.join('\n')),
      project: obs.project,
      obs_type: obs.type,
      concepts: obs.concepts.join(' '),
      files: [...obs.files_read, ...obs.files_modified].join(' '),
      created_at_epoch: obs.created_at_epoch,
      path: obs.path,
    };
    this.replace(doc);
  }

  addSession(sess: SessionRecord): void {
    const doc: IndexDoc = {
      id: `session:${sess.id}`,
      kind: 'session',
      realId: sess.id,
      title: sess.custom_title ?? sess.user_prompt,
      body: concat(sess.user_prompt, sess.custom_title),
      project: sess.project,
      obs_type: null,
      concepts: '',
      files: '',
      created_at_epoch: sess.started_at_epoch,
      path: sess.path,
    };
    this.replace(doc);
  }

  addSummary(summary: SummaryRecord): void {
    const doc: IndexDoc = {
      id: `summary:${summary.id}`,
      kind: 'summary',
      realId: summary.id,
      title: summary.request,
      body: concat(
        summary.request,
        summary.investigated,
        summary.learned,
        summary.completed,
        summary.next_steps,
        summary.notes,
      ),
      project: summary.project,
      obs_type: null,
      concepts: '',
      files: [...summary.files_read, ...summary.files_edited].join(' '),
      created_at_epoch: summary.created_at_epoch,
      path: summary.path,
    };
    this.replace(doc);
  }

  addPrompt(prompt: PromptRecord, project: string, path: string): void {
    const doc: IndexDoc = {
      id: `prompt:${prompt.id}`,
      kind: 'prompt',
      realId: prompt.id,
      title: prompt.prompt_text.slice(0, 80),
      body: prompt.prompt_text,
      project,
      obs_type: null,
      concepts: '',
      files: '',
      created_at_epoch: prompt.created_at_epoch,
      path,
    };
    this.replace(doc);
  }

  remove(kind: IndexKind, realId: string): void {
    const id = `${kind}:${realId}`;
    const existing = this.docsById.get(id);
    if (existing) {
      this.mini.remove(existing);
      this.docsById.delete(id);
    }
  }

  removeByPath(path: string): void {
    for (const [id, doc] of this.docsById) {
      if (doc.path === path) {
        this.mini.remove(doc);
        this.docsById.delete(id);
      }
    }
  }

  clear(): void {
    this.mini.removeAll();
    this.docsById.clear();
  }

  search(
    query: string,
    opts: {
      kind?: IndexKind | IndexKind[];
      project?: string;
      limit?: number;
      obs_type?: string | string[];
    } = {},
  ): Array<IndexDoc & { score: number }> {
    const kinds = opts.kind ? (Array.isArray(opts.kind) ? opts.kind : [opts.kind]) : null;
    const types = opts.obs_type ? (Array.isArray(opts.obs_type) ? opts.obs_type : [opts.obs_type]) : null;
    const matches = (doc: IndexDoc): boolean => {
      if (kinds && !kinds.includes(doc.kind)) return false;
      if (opts.project && doc.project !== opts.project) return false;
      if (types && (!doc.obs_type || !types.includes(doc.obs_type))) return false;
      return true;
    };

    let hits: Array<IndexDoc & { score: number }>;
    if (query.trim()) {
      const raw = this.mini.search(query, {
        filter: (result) => matches(result as unknown as IndexDoc),
      } as MSOptions);
      hits = raw as unknown as Array<IndexDoc & { score: number }>;
    } else {
      hits = [...this.docsById.values()]
        .filter(matches)
        .sort((a, b) => b.created_at_epoch - a.created_at_epoch)
        .map((d) => ({ ...d, score: 1 }));
    }

    const limit = opts.limit ?? 20;
    return hits.slice(0, limit);
  }

  size(): number {
    return this.docsById.size;
  }

  private replace(doc: IndexDoc): void {
    const existing = this.docsById.get(doc.id);
    if (existing) this.mini.remove(existing);
    this.mini.add(doc);
    this.docsById.set(doc.id, doc);
  }
}
