import chokidar, { type FSWatcher } from 'chokidar';
import { getVaultPaths, type VaultPaths } from '../paths.js';
import type { SearchIndex } from './SearchIndex.js';
import { indexSingleFile } from './walker.js';
import { logger } from '../../../utils/logger.js';

export function startVaultWatcher(
  index: SearchIndex,
  paths: VaultPaths = getVaultPaths(),
): FSWatcher {
  const watcher = chokidar.watch([paths.observations, paths.sessions], {
    ignoreInitial: true,
    persistent: true,
    ignored: /(^|[\\/\\])\../,
  });

  const reindex = (filepath: string) => {
    try {
      if (!filepath.endsWith('.md')) return;
      indexSingleFile(index, filepath);
    } catch (err) {
      logger.debug('VAULT', `watcher reindex failed for ${filepath}: ${(err as Error).message}`);
    }
  };

  const remove = (filepath: string) => {
    try {
      index.removeByPath(filepath);
    } catch (err) {
      logger.debug('VAULT', `watcher remove failed for ${filepath}: ${(err as Error).message}`);
    }
  };

  watcher.on('add', reindex).on('change', reindex).on('unlink', remove);
  return watcher;
}
