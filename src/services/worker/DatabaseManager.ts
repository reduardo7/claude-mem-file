/**
 * DatabaseManager: storage orchestrator
 *
 * The SQLite backing store was removed in v13. The Markdown vault under
 * `<project-root>/docs/vault/` is the sole canonical storage; a thin
 * `VaultStoreAdapter` emulates the legacy `SessionStore` surface over the
 * vault so routes/agents don't need to change their call sites. The vault
 * is mergeable and git-friendly; SQLite's numeric IDs are re-minted in
 * memory by the adapter.
 */

import { VaultStore } from '../vault/index.js';
import { VaultStoreAdapter } from './VaultStoreAdapter.js';
import { logger } from '../../utils/logger.js';

export class DatabaseManager {
  private vaultStore: VaultStore | null = null;
  private adapter: VaultStoreAdapter | null = null;

  async initialize(): Promise<void> {
    this.vaultStore = new VaultStore();
    await this.vaultStore.initialize();
    this.adapter = new VaultStoreAdapter(this.vaultStore);
    this.adapter.hydrateIds();
    logger.info('DB', 'Storage initialized (Markdown vault only)');
  }

  async close(): Promise<void> {
    if (this.vaultStore) {
      await this.vaultStore.close();
      this.vaultStore = null;
    }
    this.adapter = null;
    logger.info('DB', 'Storage closed');
  }

  getVaultStore(): VaultStore {
    if (!this.vaultStore) throw new Error('Vault not initialized');
    return this.vaultStore;
  }

  /** Adapter exposing the legacy SessionStore shape over the vault. */
  getSessionStore(): VaultStoreAdapter {
    if (!this.adapter) throw new Error('Storage not initialized');
    return this.adapter;
  }

  /** Numeric-id helpers for callers wiring pagination/response shapes. */
  obsNumFor(strId: string): number { return this.getSessionStore().obsNumFor(strId); }
  summaryNumFor(strId: string): number { return this.getSessionStore().summaryNumFor(strId); }
  promptNumFor(strId: string): number { return this.getSessionStore().promptNumFor(strId); }
  sessionNumFor(strId: string): number { return this.getSessionStore().sessionNumFor(strId); }

  getSessionById(sessionDbId: number): {
    id: number;
    content_session_id: string;
    memory_session_id: string | null;
    project: string;
    platform_source: string;
    user_prompt: string;
  } {
    const session = this.getSessionStore().getSessionById(sessionDbId);
    if (!session) throw new Error(`Session ${sessionDbId} not found`);
    return {
      id: session.id,
      content_session_id: session.content_session_id,
      memory_session_id: session.memory_session_id,
      project: session.project,
      platform_source: session.platform_source,
      user_prompt: session.user_prompt ?? '',
    };
  }
}
