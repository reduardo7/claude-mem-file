/**
 * DatabaseManager: storage orchestrator
 *
 * Manages per-project VaultStore instances. Each project's cwd resolves to its own
 * vault at `<project-root>/docs/vault/`. Stores are created lazily and cached.
 * Session-to-vault routing is tracked so background agents can find the right vault.
 */

import { VaultStore } from '../vault/index.js';
import { VaultStoreAdapter } from './VaultStoreAdapter.js';
import { resolveVaultRoot } from '../vault/paths.js';
import { logger } from '../../utils/logger.js';

interface ProjectStore {
  vault: VaultStore;
  adapter: VaultStoreAdapter;
}

export class DatabaseManager {
  /** vaultRoot → { vault, adapter } */
  private stores = new Map<string, ProjectStore>();
  /** contentSessionId → vaultRoot */
  private sessionToVault = new Map<string, string>();
  /** sessionDbId → vaultRoot */
  private sessionDbIdToVault = new Map<number, string>();
  /** Called once when the first project vault is created (for lazy SearchManager init). */
  private onFirstStoreCreated?: (vault: VaultStore, adapter: VaultStoreAdapter) => void;

  async initialize(): Promise<void> {
    logger.info('DB', 'Storage initialized (per-project Markdown vault)');
  }

  /** Register a one-time callback fired when the first project vault is created. */
  setOnFirstStoreCreated(cb: (vault: VaultStore, adapter: VaultStoreAdapter) => void): void {
    this.onFirstStoreCreated = cb;
  }

  private async ensureStore(vaultRoot: string): Promise<ProjectStore> {
    if (!this.stores.has(vaultRoot)) {
      const vault = new VaultStore(vaultRoot);
      await vault.initialize();
      const adapter = new VaultStoreAdapter(vault);
      adapter.hydrateIds();
      this.stores.set(vaultRoot, { vault, adapter });
      if (this.stores.size === 1 && this.onFirstStoreCreated) {
        this.onFirstStoreCreated(vault, adapter);
        this.onFirstStoreCreated = undefined;
      }
    }
    return this.stores.get(vaultRoot)!;
  }

  /** Get or create the adapter for the project containing `cwd`. */
  async getOrCreateAdapterForCwd(cwd: string): Promise<VaultStoreAdapter> {
    const vaultRoot = resolveVaultRoot(cwd);
    const store = await this.ensureStore(vaultRoot);
    return store.adapter;
  }

  /** Record which vault owns a session (call after createSDKSession). */
  registerSession(contentSessionId: string, sessionDbId: number, cwd: string): void {
    const vaultRoot = resolveVaultRoot(cwd);
    this.sessionToVault.set(contentSessionId, vaultRoot);
    this.sessionDbIdToVault.set(sessionDbId, vaultRoot);
  }

  /** Look up the adapter for a session by its numeric DB id. */
  getAdapterForSessionDbId(sessionDbId: number): VaultStoreAdapter | null {
    const vaultRoot = this.sessionDbIdToVault.get(sessionDbId);
    if (!vaultRoot) return null;
    return this.stores.get(vaultRoot)?.adapter ?? null;
  }

  /** Look up the adapter for a session by its content session id. */
  getAdapterForContentSession(contentSessionId: string): VaultStoreAdapter | null {
    const vaultRoot = this.sessionToVault.get(contentSessionId);
    if (!vaultRoot) return null;
    return this.stores.get(vaultRoot)?.adapter ?? null;
  }

  /** Returns any initialized adapter (for aggregate reads). Throws if none exist. */
  getSessionStore(): VaultStoreAdapter {
    const first = [...this.stores.values()][0];
    if (!first) throw new Error('No vault stores initialized');
    return first.adapter;
  }

  /** Returns any initialized vault (for aggregate reads). Throws if none exist. */
  getVaultStore(): VaultStore {
    const first = [...this.stores.values()][0];
    if (!first) throw new Error('No vault stores initialized');
    return first.vault;
  }

  /** List active sessions across ALL project vaults (for stale-session cleanup). */
  listAllActiveSessions(): import('../vault/types.js').SessionRecord[] {
    const results: import('../vault/types.js').SessionRecord[] = [];
    for (const { vault } of this.stores.values()) {
      results.push(...vault.listSessions({ status: 'active' }));
    }
    return results;
  }

  /** Mark a session completed in whichever vault owns it (by memorySessionId). */
  markSessionCompletedByMemoryId(memorySessionId: string, status: 'completed' | 'failed' = 'failed'): void {
    for (const { vault } of this.stores.values()) {
      const session = vault.getSessionByMemoryId(memorySessionId);
      if (session) {
        vault.markSessionCompleted(memorySessionId, status);
        return;
      }
    }
  }

  async close(): Promise<void> {
    for (const { vault } of this.stores.values()) {
      await vault.close();
    }
    this.stores.clear();
    this.sessionToVault.clear();
    this.sessionDbIdToVault.clear();
    logger.info('DB', 'Storage closed');
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
    const adapter = this.getAdapterForSessionDbId(sessionDbId) ?? this.getSessionStore();
    const session = adapter.getSessionById(sessionDbId);
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
