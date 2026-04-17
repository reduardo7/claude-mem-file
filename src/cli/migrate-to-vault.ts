/**
 * Opt-in migration tool: reads the legacy SQLite database and emits a Markdown
 * vault at `<project-root>/docs/vault/`.
 *
 * Usage:
 *   bun run scripts/migrate-to-vault.ts
 *   bun run scripts/migrate-to-vault.ts --db /custom/path.db --out ./docs/vault
 *
 * The SQLite database is never modified. Run as many times as you want — writes
 * are content-addressed and idempotent (duplicates are skipped).
 */

import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
// @ts-expect-error — bun:sqlite is provided by the Bun runtime at runtime; no @types available.
import { Database } from 'bun:sqlite';
import {
  VaultStore,
  resolveVaultRoot,
  ensureVaultScaffold,
  getVaultPaths,
} from '../services/vault/index.js';
import type {
  ObservationInput,
  ObservationType,
  SummaryInput,
} from '../services/vault/types.js';

interface CliOptions {
  dbPath: string;
  vaultRoot: string;
  verbose: boolean;
  dryRun: boolean;
}

interface MigrationStats {
  sessionsRead: number;
  sessionsWritten: number;
  observationsRead: number;
  observationsWritten: number;
  observationsDuplicate: number;
  summariesRead: number;
  summariesWritten: number;
  promptsRead: number;
  promptsWritten: number;
}

const DEFAULT_DB_PATH = resolve(homedir(), '.claude-mem-file', 'claude-mem-file.db');

function parseArgs(argv: string[]): CliOptions {
  const opts: CliOptions = {
    dbPath: DEFAULT_DB_PATH,
    vaultRoot: resolveVaultRoot(),
    verbose: false,
    dryRun: false,
  };
  const requireValue = (flag: string, value: string | undefined): string => {
    if (!value || value.startsWith('-')) {
      throw new Error(`Flag ${flag} requires a value`);
    }
    return value;
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--db' || arg === '--from') {
      opts.dbPath = resolve(requireValue(arg, argv[++i]));
    } else if (arg === '--out' || arg === '--to') {
      opts.vaultRoot = resolve(requireValue(arg, argv[++i]));
    } else if (arg === '--verbose' || arg === '-v') {
      opts.verbose = true;
    } else if (arg === '--dry-run') {
      opts.dryRun = true;
    } else if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return opts;
}

function printHelp(): void {
  process.stdout.write(`claude-mem-file: migrate SQLite → Markdown vault

Usage:
  migrate-to-vault [--db <path>] [--out <path>] [--dry-run] [--verbose]

Options:
  --db, --from    Path to the legacy SQLite database
                  (default: ~/.claude-mem-file/claude-mem-file.db)
  --out, --to     Target vault directory
                  (default: <project-root>/docs/vault)
  --dry-run       Read everything but don't write files
  --verbose, -v   Log every entry processed

The SQLite database is opened read-only. Writes are idempotent — duplicates
are detected via SHA-256 content hashes.
`);
}

function parseJsonList(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String).filter(Boolean) : [];
  } catch {
    return [];
  }
}

type SdkSessionRow = {
  id: number;
  content_session_id: string;
  memory_session_id: string | null;
  project: string;
  platform_source: string | null;
  user_prompt: string | null;
  custom_title: string | null;
  started_at: string;
  started_at_epoch: number;
  completed_at: string | null;
  completed_at_epoch: number | null;
  status: string | null;
  worker_port: number | null;
  prompt_counter: number | null;
};

type ObservationRow = {
  id: number;
  memory_session_id: string;
  project: string;
  text: string | null;
  type: string;
  title: string | null;
  subtitle: string | null;
  facts: string | null;
  narrative: string | null;
  concepts: string | null;
  files_read: string | null;
  files_modified: string | null;
  prompt_number: number | null;
  discovery_tokens: number | null;
  model: string | null;
  model_id: string | null;
  created_at_epoch: number;
};

type SummaryRow = {
  id: number;
  memory_session_id: string;
  project: string;
  request: string | null;
  investigated: string | null;
  learned: string | null;
  completed: string | null;
  next_steps: string | null;
  notes: string | null;
  files_read: string | null;
  files_edited: string | null;
  prompt_number: number | null;
  discovery_tokens: number | null;
  model: string | null;
  model_id: string | null;
  created_at_epoch: number;
};

type PromptRow = {
  id: number;
  content_session_id: string;
  prompt_number: number;
  prompt_text: string;
  created_at_epoch: number;
};

async function migrate(opts: CliOptions): Promise<MigrationStats> {
  const stats: MigrationStats = {
    sessionsRead: 0,
    sessionsWritten: 0,
    observationsRead: 0,
    observationsWritten: 0,
    observationsDuplicate: 0,
    summariesRead: 0,
    summariesWritten: 0,
    promptsRead: 0,
    promptsWritten: 0,
  };

  if (!existsSync(opts.dbPath)) {
    throw new Error(`SQLite database not found at ${opts.dbPath}`);
  }

  process.stdout.write(`Reading legacy DB: ${opts.dbPath}\n`);
  process.stdout.write(`Target vault:     ${opts.vaultRoot}\n`);
  if (opts.dryRun) process.stdout.write(`(dry run — no files will be written)\n`);
  process.stdout.write('\n');

  const db = new Database(opts.dbPath, { readonly: true });
  const vault = new VaultStore(opts.vaultRoot);

  if (!opts.dryRun) {
    ensureVaultScaffold(getVaultPaths(opts.vaultRoot));
    await vault.initialize();
  }

  // 1. Sessions
  const sessions = db.query('SELECT * FROM sdk_sessions ORDER BY started_at_epoch ASC').all() as SdkSessionRow[];
  for (const row of sessions) {
    stats.sessionsRead++;
    if (opts.dryRun) {
      stats.sessionsWritten++;
      continue;
    }
    const created = vault.createSession({
      contentSessionId: row.content_session_id,
      memorySessionId: row.memory_session_id ?? row.content_session_id,
      project: row.project,
      platformSource: row.platform_source ?? 'claude',
      userPrompt: row.user_prompt,
      customTitle: row.custom_title,
      startedAtEpoch: row.started_at_epoch,
      workerPort: row.worker_port,
    });
    if (row.status && row.status !== 'active' && created.memory_session_id) {
      vault.updateSession(created.memory_session_id, {
        status: row.status === 'failed' ? 'failed' : 'completed',
        completed_at: row.completed_at,
        completed_at_epoch: row.completed_at_epoch,
      });
    }
    stats.sessionsWritten++;
    if (opts.verbose) process.stdout.write(`  session ${row.content_session_id}\n`);
  }

  // 2. Prompts — re-appended in correct order per session
  const prompts = db
    .query('SELECT * FROM user_prompts ORDER BY content_session_id, prompt_number ASC')
    .all() as PromptRow[];
  for (const row of prompts) {
    stats.promptsRead++;
    if (opts.dryRun) {
      stats.promptsWritten++;
      continue;
    }
    try {
      vault.appendPrompt(row.content_session_id, row.prompt_text);
      stats.promptsWritten++;
    } catch (err) {
      if (opts.verbose) process.stdout.write(`  prompt skipped (no session): ${(err as Error).message}\n`);
    }
  }

  // 3. Summaries
  const summaries = db.query('SELECT * FROM session_summaries').all() as SummaryRow[];
  for (const row of summaries) {
    stats.summariesRead++;
    if (opts.dryRun) {
      stats.summariesWritten++;
      continue;
    }
    const input: SummaryInput = {
      request: row.request,
      investigated: row.investigated,
      learned: row.learned,
      completed: row.completed,
      next_steps: row.next_steps,
      notes: row.notes,
      files_read: parseJsonList(row.files_read),
      files_edited: parseJsonList(row.files_edited),
    };
    vault.writeSummary(row.memory_session_id, row.project, input, {
      promptNumber: row.prompt_number ?? undefined,
      discoveryTokens: row.discovery_tokens ?? 0,
      model: row.model,
      modelId: row.model_id,
      createdAtEpoch: row.created_at_epoch,
    });
    stats.summariesWritten++;
  }

  // 4. Observations
  const observations = db.query('SELECT * FROM observations ORDER BY created_at_epoch ASC').all() as ObservationRow[];
  const allowedTypes: ReadonlySet<ObservationType> = new Set([
    'decision',
    'bugfix',
    'feature',
    'refactor',
    'discovery',
    'change',
  ]);
  for (const row of observations) {
    stats.observationsRead++;
    if (opts.dryRun) {
      stats.observationsWritten++;
      continue;
    }
    const type: ObservationType = allowedTypes.has(row.type as ObservationType)
      ? (row.type as ObservationType)
      : 'discovery';
    const input: ObservationInput = {
      type,
      title: row.title,
      subtitle: row.subtitle,
      facts: parseJsonList(row.facts),
      narrative: row.narrative ?? row.text,
      text: row.text,
      concepts: parseJsonList(row.concepts),
      files_read: parseJsonList(row.files_read),
      files_modified: parseJsonList(row.files_modified),
    };
    const result = vault.writeObservation({
      memorySessionId: row.memory_session_id,
      project: row.project,
      observation: input,
      promptNumber: row.prompt_number ?? undefined,
      discoveryTokens: row.discovery_tokens ?? 0,
      createdAtEpoch: row.created_at_epoch,
      model: row.model,
      modelId: row.model_id,
    });
    if (result.isDuplicate) {
      stats.observationsDuplicate++;
    } else {
      stats.observationsWritten++;
    }
    if (opts.verbose) process.stdout.write(`  obs ${result.id}${result.isDuplicate ? ' (dup)' : ''}\n`);
  }

  db.close();
  await vault.close();
  return stats;
}

async function main(): Promise<void> {
  const opts = parseArgs(process.argv.slice(2));
  try {
    const stats = await migrate(opts);
    process.stdout.write('\nMigration complete:\n');
    process.stdout.write(`  sessions:       ${stats.sessionsWritten} / ${stats.sessionsRead}\n`);
    process.stdout.write(`  prompts:        ${stats.promptsWritten} / ${stats.promptsRead}\n`);
    process.stdout.write(`  summaries:      ${stats.summariesWritten} / ${stats.summariesRead}\n`);
    process.stdout.write(
      `  observations:   ${stats.observationsWritten} new, ${stats.observationsDuplicate} duplicates (of ${stats.observationsRead})\n`,
    );
    if (!opts.dryRun) process.stdout.write(`\nVault: ${opts.vaultRoot}\n`);
  } catch (err) {
    process.stderr.write(`Migration failed: ${(err as Error).message}\n`);
    process.exit(1);
  }
}

main();
