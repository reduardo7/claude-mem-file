#!/usr/bin/env bun
// Thin launcher so `bun run scripts/migrate-to-vault.ts` works without having
// to build the package first.
import '../src/cli/migrate-to-vault.js';
