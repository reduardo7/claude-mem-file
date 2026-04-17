/**
 * SettingsManager: viewer UI settings persistence.
 *
 * Stores sidebar/project/theme preferences in a small JSON file under the
 * user's claude-mem data dir. Replaced the SQLite-backed table used pre-v13.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import path from 'path';
import os from 'os';
import { logger } from '../../utils/logger.js';
import type { ViewerSettings } from '../worker-types.js';

const SETTINGS_DIR = path.join(os.homedir(), '.claude-mem-file');
const SETTINGS_FILE = path.join(SETTINGS_DIR, 'viewer-settings.json');

export class SettingsManager {
  private readonly defaultSettings: ViewerSettings = {
    sidebarOpen: true,
    selectedProject: null,
    theme: 'system',
  };

  constructor(_dbManager?: unknown) {
    // dbManager kept for call-site parity; no longer used since the viewer
    // settings moved out of SQLite into a small JSON file.
  }

  getSettings(): ViewerSettings {
    try {
      if (!existsSync(SETTINGS_FILE)) return { ...this.defaultSettings };
      const raw = readFileSync(SETTINGS_FILE, 'utf-8');
      const parsed = JSON.parse(raw) as Partial<ViewerSettings>;
      return { ...this.defaultSettings, ...parsed };
    } catch (error) {
      logger.debug('WORKER', 'Failed to load viewer settings, using defaults', {}, error as Error);
      return { ...this.defaultSettings };
    }
  }

  updateSettings(updates: Partial<ViewerSettings>): ViewerSettings {
    const merged: ViewerSettings = { ...this.getSettings(), ...updates };
    try {
      if (!existsSync(SETTINGS_DIR)) mkdirSync(SETTINGS_DIR, { recursive: true });
      writeFileSync(SETTINGS_FILE, JSON.stringify(merged, null, 2));
    } catch (error) {
      logger.warn('WORKER', 'Failed to persist viewer settings', {}, error as Error);
    }
    return merged;
  }
}
