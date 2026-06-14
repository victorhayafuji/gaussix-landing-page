---
description: Editar conteúdo/copy da landing GAUSSIX sem mexer no visual
argument-hint: [o que mudar]
---

Atualize o conteúdo: $ARGUMENTS

Regras:
- Conteúdo estruturado (soluções, casos de uso, etapas, telemetria) → editar `src/data/content.js`.
  Isso reflete em `Solutions.jsx`, `Footer.jsx`, `UseCases.jsx`, `Methodology.jsx`, `TelemetryTicker.jsx`.
- Copy inline (headlines, leads, CTAs, copy do FlowIA, navbar, footer institucional) → editar apenas as
  strings no JSX da seção. **Não** tocar em `className`, tags ou estilos.
- Seguir tom B2B premium e a lista de CTAs permitidos em `docs/CONTENT_GUIDE.md`.
- Manter GAUSSIX como empresa ampliada e FlowIA como produto SaaS proprietário (`docs/BUSINESS_RULES.md`).
- Não inventar promessas, números ou regras de negócio.

Ao terminar, rode `npm run build` e confirme que o visual permanece idêntico.
