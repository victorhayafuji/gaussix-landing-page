#!/usr/bin/env node
// PreToolUse (Edit|Write|MultiEdit): pede confirmação antes de editar arquivos
// sensíveis que sustentam a identidade visual da landing page GAUSSIX.
// Ver CLAUDE.md §9. Falha silenciosamente em erro próprio (nunca derruba a sessão).
import { readFileSync } from 'node:fs';

const SENSITIVE = [
  'src/lib/GaussField.js',
  'src/hooks/useGaussField.js',
  'src/hooks/useReveal.js',
  'src/index.css',
  'index.html',
];

let data = {};
try {
  data = JSON.parse(readFileSync(0, 'utf8') || '{}');
} catch {
  process.exit(0);
}

const fp = data?.tool_input?.file_path || data?.tool_input?.filePath || '';
const norm = String(fp).replace(/\\/g, '/');
const hit = SENSITIVE.find((s) => norm.endsWith(s));

if (hit) {
  const output = {
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'ask',
      permissionDecisionReason:
        `Arquivo sensível (${hit}) — ver CLAUDE.md §9. Sustenta a identidade visual ` +
        `(canvas/GaussField/animações/paleta). Preserve o visual e confirme para prosseguir.`,
    },
  };
  process.stdout.write(JSON.stringify(output));
}

process.exit(0);
