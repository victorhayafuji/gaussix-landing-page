#!/usr/bin/env node
// Stop: porta final de qualidade. Roda lint + build quando há mudanças não validadas.
// Otimização: se o build em dist/ é mais novo que todo o código-fonte, pula (nada a validar).
import { readFileSync, statSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';

let data = {};
try {
  data = JSON.parse(readFileSync(0, 'utf8') || '{}');
} catch {
  /* segue com defaults */
}

// Evita loop infinito: se este hook já forçou continuação, não repete.
if (data?.stop_hook_active) process.exit(0);

const SRC_DIRS = ['src'];
const SRC_FILES = ['index.html', 'vite.config.js', 'eslint.config.js', 'package.json'];
const exts = /\.(jsx?|css|html)$/;

function newestMtime(path) {
  let newest = 0;
  let st;
  try {
    st = statSync(path);
  } catch {
    return 0;
  }
  if (st.isDirectory()) {
    for (const entry of readdirSync(path)) {
      newest = Math.max(newest, newestMtime(join(path, entry)));
    }
  } else if (exts.test(path)) {
    newest = st.mtimeMs;
  }
  return newest;
}

try {
  const distIndex = 'dist/index.html';
  if (existsSync(distIndex)) {
    const distTime = statSync(distIndex).mtimeMs;
    let srcTime = 0;
    for (const d of SRC_DIRS) srcTime = Math.max(srcTime, newestMtime(d));
    for (const f of SRC_FILES) srcTime = Math.max(srcTime, newestMtime(f));
    if (distTime >= srcTime) process.exit(0); // build atualizado, nada a validar
  }

  execSync('npm run lint', { stdio: 'pipe' });
  execSync('npm run build', { stdio: 'pipe' });
  process.exit(0);
} catch (e) {
  const out = (e.stdout?.toString() || '') + (e.stderr?.toString() || '');
  process.stderr.write(
    'Validação final falhou (lint/build). Corrija antes de finalizar:\n' + out.slice(-3000)
  );
  process.exit(2);
}
