---
description: Auditoria técnica e semântica da landing page GAUSSIX (read-first)
---

Faça uma auditoria do projeto da landing page GAUSSIX **sem alterar o visual**. Antes de qualquer
edição, liste os achados; só então proponha correções seguras.

Verifique:
1. Bugs: imports quebrados, variáveis/props mortas, keys de listas React, event listeners sem cleanup,
   animações/canvas fora da viewport, warnings de lint.
2. Conteúdo: textos hardcoded que deveriam estar em `src/data/content.js`; duplicações/contradições.
3. Semântica de marca: GAUSSIX como empresa ampliada (Dados, IA, automação, landing pages, sistemas,
   SaaS) e **FlowIA como produto SaaS proprietário** (ver `docs/BUSINESS_RULES.md`). Sinalize qualquer
   posicionamento estreito ("AI Data Analysis", "BI puro", "agência", "software house").
4. CTAs: dentro da lista permitida em `docs/CONTENT_GUIDE.md`; sem genéricos ("Saiba mais", etc.).
5. Acessibilidade e HTML semântico; responsividade; performance.

Regras: não alterar identidade visual, paleta, layout, canvas, GaussField nem
animações. Não inventar regra de negócio ou produto. Itens com impacto visual → documentar como
recomendação, não implementar direto.

Ao final rode `npm run build` e `npm run lint` e relate resultados.
