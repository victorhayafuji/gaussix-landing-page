---
name: gaussix-content
description: Edit GAUSSIX landing page copy and content safely. Use when changing texts, headlines, service blocks, methodology steps, FlowIA copy, CTAs, or any user-facing wording — without altering the visual identity.
---

# GAUSSIX — edição de conteúdo

Skill para alterar conteúdo/copy da landing page **sem mudar o visual**.

## Fonte de conteúdo
- **Estruturado:** `src/data/content.js` (`solutions`, `steps`, `flowiaFeatures`, `CONTACT_EMAIL`, `mailto()`).
  Consumido por `Solutions.jsx`, `Methodology.jsx`, `FlowIA.jsx`, `FinalCTA.jsx` e `Footer.jsx`.
  Editar o array atualiza todos.
- **Serviços:** `title` = rótulo canônico; `headline` = benefício primeiro; `cta` opcional (só CTAs permitidos).
- **Inline:** títulos de seção, leads, eyebrows, manifesto (`Manifesto.jsx`), navbar e footer institucional —
  editar apenas strings no JSX, sem tocar em `className`/tags/estilos.
- **Anti "AI slop":** sem texto em gradiente, sem títulos na fórmula "Da X à Y", nada inventado
  (números, clientes, telas). Ver `CLAUDE.md` §3.

## Regras de marca (ver `docs/BUSINESS_RULES.md`)
- GAUSSIX = empresa de tecnologia aplicada (Dados, IA, automação, landing pages, sistemas, SaaS).
- FlowIA = produto SaaS proprietário da GAUSSIX (prova de capacidade, não marca separada).
- Tom B2B premium, técnico-consultivo. Sem promessas vagas/exageradas.

## CTAs
Permitidos: "Quero construir minha solução", "Solicitar uma landing page", "Conhecer o FlowIA",
"Automatizar minha operação", "Criar meu dashboard", "Falar sobre meu projeto".
Proibidos: "Saiba mais", "Começar agora", "Revolucionar com IA", etc.

## Checklist
1. Texto estruturado em `content.js` quando aplicável.
2. `className`/estilos/paleta intactos.
3. Posicionamento e CTAs coerentes com as regras.
4. `npm run build` e `npm run lint` passam.
