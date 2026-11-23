---
description: Editar conteúdo/copy da landing GAUSSIX sem mexer no visual
argument-hint: [o que mudar]
---

Atualize o conteúdo: $ARGUMENTS

Regras:
- Conteúdo estruturado (serviços, etapas, capacidades do FlowIA, contato) → editar `src/data/content.js`.
  Isso reflete em `Solutions.jsx`, `Methodology.jsx`, `FlowIA.jsx`, `FinalCTA.jsx` e `Footer.jsx`.
- Copy inline (títulos de seção, leads, manifesto, navbar, footer institucional) → editar apenas as
  strings no JSX da seção. **Não** tocar em `className`, tags ou estilos.
- Sem texto em gradiente e sem títulos na fórmula "Da X à Y" (regras anti "AI slop", `CLAUDE.md` §3).
- Seguir tom B2B premium e a lista de CTAs permitidos em `docs/CONTENT_GUIDE.md`.
- Manter GAUSSIX como empresa ampliada e FlowIA como produto SaaS proprietário (`docs/BUSINESS_RULES.md`).
- Não inventar promessas, números ou regras de negócio.

Ao terminar, rode `npm run build` e confirme que o visual permanece idêntico.
