#!/usr/bin/env node
// PostToolUse (Edit|Write|MultiEdit): roda ESLint no arquivo .js/.jsx recém-editado
// e devolve eventuais erros ao agente (exit 2) para correção imediata.
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

let data = {};
try {
  data = JSON.parse(readFileSync(0, 'utf8') || '{}');
} catch {
  process.exit(0);
}

const fp = data?.tool_input?.file_path || data?.tool_input?.filePath || '';
// Só lint de .js/.jsx. Ignora .mjs (os próprios hooks não são cobertos pelo eslint.config.js).
if (!/\.(jsx?)$/.test(fp)) process.exit(0);

try {
  execSync(`npx eslint "${fp}"`, { stdio: 'pipe' });
  process.exit(0);
} catch (e) {
  const out = (e.stdout?.toString() || '') + (e.stderr?.toString() || '');
  process.stderr.write('ESLint encontrou problemas no arquivo editado:\n' + out);
  process.exit(2);
}
