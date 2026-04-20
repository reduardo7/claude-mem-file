/**
 * CorpusBuilder - Compiles observations from the vault into a corpus file.
 *
 * The legacy SearchOrchestrator + SessionStore pipeline was replaced by a
 * direct query against the Markdown vault.
 */

import { logger } from '../../../utils/logger.js';
import type { VaultStore } from '../../vault/index.js';
import type {
  ObservationRecord as VaultObservationRecord,
  ObservationType,
} from '../../vault/types.js';
import { CorpusRenderer } from './CorpusRenderer.js';
import { CorpusStore } from './CorpusStore.js';
import type { CorpusFile, CorpusFilter, CorpusObservation, CorpusStats } from './types.js';

export class CorpusBuilder {
  private renderer: CorpusRenderer;
  private _vaultStore: VaultStore | null;

  constructor(
    vaultStore: VaultStore | null,
    private corpusStore: CorpusStore,
  ) {
    this._vaultStore = vaultStore ?? null;
    this.renderer = new CorpusRenderer();
  }

  /** Called when the first project vault is ready. */
  updateVault(vault: VaultStore): void {
    this._vaultStore = vault;
  }

  private get vaultStore(): VaultStore {
    if (!this._vaultStore) throw new Error('CorpusBuilder: vault not yet initialized (no project session started)');
    return this._vaultStore;
  }

  async build(name: string, description: string, filter: CorpusFilter): Promise<CorpusFile> {
    logger.debug('WORKER', `Building corpus "${name}" with filter`, { filter });

    // Query the vault directly. Free-text queries go through minisearch; filter-only
    // queries stream from the vault listing.
    const baseFilter = {
      project: filter.project,
      type: (filter.types && filter.types.length > 0) ? (filter.types as ObservationType[]) : undefined,
      concepts: filter.concepts,
      files: filter.files,
      dateRange:
        filter.date_start || filter.date_end
          ? { start: filter.date_start, end: filter.date_end }
          : undefined,
      limit: filter.limit,
      orderBy: 'date_asc' as const,
    };

    let observations: VaultObservationRecord[];
    if (filter.query) {
      const hits = this.vaultStore.search(filter.query, {
        kind: 'observation',
        project: filter.project,
        limit: filter.limit ?? 1000,
      });
      const byId = new Set(hits.map((h) => h.id));
      observations = this.vaultStore.listObservations(baseFilter).filter((o) => byId.has(o.id));
    } else {
      observations = this.vaultStore.listObservations(baseFilter);
    }

    logger.debug('WORKER', `Vault returned ${observations.length} matching observations`);

    const mapped = observations.map((o) => this.mapObservationToCorpus(o));
    const stats = this.calculateStats(mapped);
    const now = new Date().toISOString();
    const corpus: CorpusFile = {
      version: 1,
      name,
      description,
      created_at: now,
      updated_at: now,
      filter,
      stats,
      system_prompt: '',
      session_id: null,
      observations: mapped,
    };

    corpus.system_prompt = this.renderer.generateSystemPrompt(corpus);
    const renderedText = this.renderer.renderCorpus(corpus);
    corpus.stats.token_estimate = this.renderer.estimateTokens(renderedText);

    this.corpusStore.write(corpus);

    logger.debug('WORKER', `Corpus "${name}" built with ${mapped.length} observations, ~${corpus.stats.token_estimate} tokens`);

    return corpus;
  }

  private mapObservationToCorpus(row: VaultObservationRecord): CorpusObservation {
    return {
      id: row.id as unknown as number,
      type: row.type,
      title: row.title ?? '',
      subtitle: row.subtitle ?? null,
      narrative: row.narrative ?? null,
      facts: row.facts,
      concepts: row.concepts,
      files_read: row.files_read,
      files_modified: row.files_modified,
      project: row.project,
      created_at: row.created_at,
      created_at_epoch: row.created_at_epoch,
    };
  }

  private calculateStats(observations: CorpusObservation[]): CorpusStats {
    const typeBreakdown: Record<string, number> = {};
    let earliestEpoch = Infinity;
    let latestEpoch = -Infinity;
    for (const obs of observations) {
      typeBreakdown[obs.type] = (typeBreakdown[obs.type] || 0) + 1;
      if (obs.created_at_epoch < earliestEpoch) earliestEpoch = obs.created_at_epoch;
      if (obs.created_at_epoch > latestEpoch) latestEpoch = obs.created_at_epoch;
    }
    const earliest =
      observations.length > 0 ? new Date(earliestEpoch).toISOString() : new Date().toISOString();
    const latest =
      observations.length > 0 ? new Date(latestEpoch).toISOString() : new Date().toISOString();
    return {
      observation_count: observations.length,
      token_estimate: 0,
      date_range: { earliest, latest },
      type_breakdown: typeBreakdown,
    };
  }
}
