# Guia de conteúdo — GAUSSIX Landing Page

Como editar textos sem quebrar o visual. Complementa [`../CLAUDE.md`](../CLAUDE.md) Seções 8 e 10.

---

## 1. Onde fica cada texto

### Centralizado em `src/data/content.js` (fonte única)
Editar o array atualiza **todos** os pontos que o consomem.

| Export | Usado por | Conteúdo |
|---|---|---|
| `solutions` | `Solutions.jsx` (cards) e `Footer.jsx` (links de soluções) | tag, título, descrição, gradiente, delay |
| `useCases` | `UseCases.jsx` | número, título, descrição |
| `steps` | `Methodology.jsx` | número, título, descrição |
| `telemetryItems` | `TelemetryTicker.jsx` | rótulos do marquee |

> Os **SVGs** dos cards de soluções são bespoke e ficam inline em `Solutions.jsx`
> (mapa `svgByGradient`, chaveado por `gradientId`). Só o **texto** vem de `content.js`.

### Copy ainda inline (editar direto no JSX da seção)
Eyebrows, títulos de seção (`h2`), leads, CTAs, copy institucional do Footer, navbar e a copy do
**FlowIA** em `BrandConcept.jsx`. Editar **apenas as strings** — nunca `className`, tags ou estilos.

---

## 2. Regras de edição de copy

- Não alterar classes visuais, paleta ou estrutura de tags por preferência estética.
- Manter tom **B2B, premium, técnico-consultivo**.
- Sem promessas garantidas, vagas ou exageradas.
- GAUSSIX = empresa ampliada; FlowIA = produto SaaS proprietário (ver `BUSINESS_RULES.md`).

---

## 3. Padrão de CTAs

**Permitidos** (usar variações):
- Quero construir minha solução
- Solicitar uma landing page
- Conhecer o FlowIA
- Automatizar minha operação
- Criar meu dashboard
- Falar sobre meu projeto

**Proibidos** (genéricos/exagerados):
- Saiba mais · Começar agora · Escalar meu negócio instantaneamente · Revolucionar com IA · Dominar o mercado

CTAs primários (`btn btn-primary`) levam a `#contato`. Secundários (`btn btn-ghost`) levam a seções
relevantes (`#solucoes`, `#conceito`).

---

## 4. Naming / consistência

- Títulos das soluções em `content.js` são a referência canônica.
- A telemetria (`telemetryItems`) usa variações de marketing mais curtas/punchy — aceitável por ser
  um marquee, mas mantenha a mesma família de termos.
- Wordmark: nome "GAUSSIX" + subtítulo "AI · DATA · SYSTEMS" (apenas copy; estilo controlado por CSS).

---

## 5. Checklist rápido (antes de finalizar)

1. `npm run build` e `npm run lint` passam.
2. Texto novo está em `content.js` quando aplicável.
3. Visual inalterado (paleta, canvas, animações).
4. Posicionamento e CTAs coerentes com `BUSINESS_RULES.md`.
