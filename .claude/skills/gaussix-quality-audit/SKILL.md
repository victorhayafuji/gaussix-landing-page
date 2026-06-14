---
name: gaussix-quality-audit
description: Audit the GAUSSIX landing page for bugs, accessibility, performance, code quality, and brand-semantic consistency. Use when reviewing the project for robustness, before shipping changes, or when asked to check quality without changing the visual design.
---

# GAUSSIX — auditoria de qualidade

Skill para revisar o projeto de forma estruturada, **sem alterar o visual**. Liste achados antes de
corrigir; itens com impacto visual viram recomendação, não edição direta.

## Eixos de auditoria

### Código / bugs
- Imports quebrados, variáveis/props mortas, código não usado.
- Keys de listas React (usar id estável, não índice quando possível).
- Event listeners e `requestAnimationFrame` com cleanup (`useReveal.js`, `GaussField.js`, `useGaussField.js`).
- Comportamento em React StrictMode (mount duplo).
- Canvas/animações pausados fora da viewport (IntersectionObserver).
- `npm run lint` sem erros novos.

### Conteúdo
- Texto hardcoded que deveria estar em `src/data/content.js`.
- Duplicações/contradições; consistência de naming.

### Semântica de marca (ver `docs/BUSINESS_RULES.md`)
- GAUSSIX como empresa ampliada; **FlowIA como produto SaaS proprietário**.
- Sinalizar posicionamento estreito: "AI Data Analysis", "BI puro", "agência", "software house".
- CTAs dentro da lista permitida (`docs/CONTENT_GUIDE.md`).

### Acessibilidade / semântica HTML
- `<section>/<article>/<header>/<footer>/<nav>`; hierarquia de headings.
- `aria-label` em botões de ícone; `aria-hidden` em SVG/canvas decorativos; `lang` no html.

### Performance / responsividade
- Loops desnecessários; canvas off-viewport; mobile bypass do canvas (`FinalCTA.jsx`).

## Saída
Relatório com `arquivo:linha`, severidade (Alta/Média/Baixa) e plano de correção. Rodar
`npm run build` e `npm run lint` e reportar resultados. Não tocar em paleta, canvas, GaussField
ou animações sem aprovação.
