/**
 * NPX CLI entry point for claude-mem-file.
 *
 * Usage:
 *   npx claude-mem-file                     → interactive install
 *   npx claude-mem-file install             → interactive install
 *   npx claude-mem-file install --ide <id>  → direct IDE setup
 *   npx claude-mem-file update              → update to latest version
 *   npx claude-mem-file uninstall           → remove plugin and IDE configs
 *   npx claude-mem-file version             → print version
 *   npx claude-mem-file start               → start worker service
 *   npx claude-mem-file stop                → stop worker service
 *   npx claude-mem-file restart             → restart worker service
 *   npx claude-mem-file status              → show worker status
 *   npx claude-mem-file search <query>      → search observations
 *   npx claude-mem-file transcript watch    → start transcript watcher
 *
 * This file is pure Node.js — Bun is NOT required for install commands.
 * Runtime commands (`start`, `stop`, etc.) delegate to Bun via the installed plugin.
 */
import pc from 'picocolors';
import { readPluginVersion } from './utils/paths.js';

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

const args = process.argv.slice(2);
const command = args[0]?.toLowerCase() ?? '';

// ---------------------------------------------------------------------------
// Help text
// ---------------------------------------------------------------------------

function printHelp(): void {
  const version = readPluginVersion();

  console.log(`
${pc.bold('claude-mem-file')} v${version} — persistent memory for AI coding assistants

${pc.bold('Install Commands')} (no Bun required):
  ${pc.cyan('npx claude-mem-file')}                     Interactive install
  ${pc.cyan('npx claude-mem-file install')}              Interactive install
  ${pc.cyan('npx claude-mem-file install --ide <id>')}   Install for specific IDE
  ${pc.cyan('npx claude-mem-file update')}               Update to latest version
  ${pc.cyan('npx claude-mem-file uninstall')}            Remove plugin and configs
  ${pc.cyan('npx claude-mem-file version')}              Print version

${pc.bold('Runtime Commands')} (requires Bun, delegates to installed plugin):
  ${pc.cyan('npx claude-mem-file start')}                Start worker service
  ${pc.cyan('npx claude-mem-file stop')}                 Stop worker service
  ${pc.cyan('npx claude-mem-file restart')}              Restart worker service
  ${pc.cyan('npx claude-mem-file status')}               Show worker status
  ${pc.cyan('npx claude-mem-file search <query>')}       Search observations
  ${pc.cyan('npx claude-mem-file transcript watch')}     Start transcript watcher

${pc.bold('IDE Identifiers')}:
  claude-code, cursor, gemini-cli, opencode, openclaw,
  windsurf, codex-cli, copilot-cli, antigravity, goose,
  crush, roo-code, warp
`);
}

// ---------------------------------------------------------------------------
// Command routing
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  switch (command) {
    // -- No command: default to install ------------------------------------
    case '': {
      const { runInstallCommand } = await import('./commands/install.js');
      await runInstallCommand();
      break;
    }

    // -- Install -----------------------------------------------------------
    case 'install': {
      const ideIndex = args.indexOf('--ide');
      const ideValue = ideIndex !== -1 ? args[ideIndex + 1] : undefined;

      const { runInstallCommand } = await import('./commands/install.js');
      await runInstallCommand({ ide: ideValue });
      break;
    }

    // -- Update (alias for install — overwrite with latest) ----------------
    case 'update':
    case 'upgrade': {
      const { runInstallCommand } = await import('./commands/install.js');
      await runInstallCommand();
      break;
    }

    // -- Uninstall ---------------------------------------------------------
    case 'uninstall':
    case 'remove': {
      const { runUninstallCommand } = await import('./commands/uninstall.js');
      await runUninstallCommand();
      break;
    }

    // -- Version -----------------------------------------------------------
    case 'version':
    case '--version':
    case '-v': {
      console.log(readPluginVersion());
      break;
    }

    // -- Help --------------------------------------------------------------
    case 'help':
    case '--help':
    case '-h': {
      printHelp();
      break;
    }

    // -- Runtime: start / stop / restart / status --------------------------
    case 'start': {
      const { runStartCommand } = await import('./commands/runtime.js');
      runStartCommand();
      break;
    }
    case 'stop': {
      const { runStopCommand } = await import('./commands/runtime.js');
      runStopCommand();
      break;
    }
    case 'restart': {
      const { runRestartCommand } = await import('./commands/runtime.js');
      runRestartCommand();
      break;
    }
    case 'status': {
      const { runStatusCommand } = await import('./commands/runtime.js');
      runStatusCommand();
      break;
    }

    // -- Search ------------------------------------------------------------
    case 'search': {
      const { runSearchCommand } = await import('./commands/runtime.js');
      await runSearchCommand(args.slice(1));
      break;
    }

    // -- Transcript --------------------------------------------------------
    case 'transcript': {
      const subCommand = args[1]?.toLowerCase();
      if (subCommand === 'watch') {
        const { runTranscriptWatchCommand } = await import('./commands/runtime.js');
        runTranscriptWatchCommand();
      } else {
        console.error(pc.red(`Unknown transcript subcommand: ${subCommand ?? '(none)'}`));
        console.error(`Usage: npx claude-mem-file transcript watch`);
        process.exit(1);
      }
      break;
    }

    // -- Unknown -----------------------------------------------------------
    default: {
      console.error(pc.red(`Unknown command: ${command}`));
      console.error(`Run ${pc.bold('npx claude-mem-file --help')} for usage information.`);
      process.exit(1);
    }
  }
}

main().catch((error) => {
  console.error(pc.red('Fatal error:'), error.message || error);
  process.exit(1);
});
