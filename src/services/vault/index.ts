export { VaultStore } from './VaultStore.js';
export {
  resolveVaultRoot,
  getVaultPaths,
  vaultExists,
  VAULT_DIR_NAME,
  findProjectRoot,
} from './paths.js';
export type { VaultPaths } from './paths.js';
export { ensureVaultScaffold } from './scaffold.js';
export { ensureVault } from './ensure-vault.js';
export type { EnsureVaultResult } from './ensure-vault.js';
export type {
  ObservationInput,
  ObservationRecord,
  ObservationType,
  SessionRecord,
  SessionStatus,
  SummaryInput,
  SummaryRecord,
  PromptRecord,
  SearchOptions,
  SearchFilters,
  TimelineData,
  TimelineEntry,
} from './types.js';
