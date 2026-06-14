---
description: Corrigir um bug na landing GAUSSIX preservando o visual
argument-hint: [descrição do bug]
---

Corrija o bug: $ARGUMENTS

Processo:
1. Reproduza/localize a causa raiz antes de editar. Cite `arquivo:linha`.
2. Faça a menor correção segura possível. Sem refatoração grande sem necessidade.
3. Preserve identidade visual, paleta, canvas, GaussField e animações.
4. Cuidado com `src/hooks/useReveal.js` (StrictMode) e `src/lib/GaussField.js` / `useGaussField.js`
   (ciclo de vida do canvas) — são arquivos sensíveis (ver `CLAUDE.md` Seção 9).
5. Garanta cleanup de efeitos e keys corretas em listas.

Se a correção exigir mudança visual significativa, **não** implemente: documente como recomendação.

Ao terminar, rode `npm run build` e `npm run lint` e relate o resultado.
