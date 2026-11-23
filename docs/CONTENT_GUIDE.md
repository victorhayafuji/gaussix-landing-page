# Guia de conteúdo — GAUSSIX Landing Page

Como editar textos sem quebrar o visual. Complementa [`../CLAUDE.md`](../CLAUDE.md) Seções 8 e 10.

---

## 1. Onde fica cada texto

### Centralizado em `src/data/content.js` (fonte única)
Editar o array atualiza **todos** os pontos que o consomem.

| Export | Usado por | Conteúdo |
|---|---|---|
| `solutions` | `Solutions.jsx` (bento) e `Footer.jsx` (links de soluções) | `id`, `title` (rótulo), `headline` (benefício), `description`, `cta?`, `featured?` |
| `steps` | `Methodology.jsx` | `num`, `title`, `desc`, `deliverable` |
| `flowiaFeatures` | `FlowIA.jsx` | `title`, `desc` |
| `CONTACT_EMAIL`, `mailto()` | `FlowIA.jsx`, `FinalCTA.jsx`, `Footer.jsx` | e-mail e links `mailto:` com assunto |

### Copy ainda inline (editar direto no JSX da seção)
Eyebrows, títulos de seção (`h2`), leads, o manifesto (`Manifesto.jsx`), copy institucional do Footer
e navbar. Editar **apenas as strings** — nunca `className`, tags ou estilos.

---

## 2. Regras de edição de copy

- Não alterar classes visuais, paleta ou estrutura de tags por preferência estética.
- Manter tom **B2B, premium, técnico-consultivo**.
- Sem promessas garantidas, vagas ou exageradas.
- GAUSSIX = empresa ampliada; FlowIA = produto SaaS proprietário (ver `BUSINESS_RULES.md`).
- **Benefício primeiro:** título de serviço diz o que muda para o cliente ("Veja a operação inteira
  num só painel."); o nome do serviço vai no rótulo (`title`).
- **Sem fórmula repetida:** evite títulos no molde "Da X à Y" e ênfase por texto em gradiente
  (ver regras anti "AI slop" em `CLAUDE.md` §3).
- **Nada inventado:** sem números, clientes, depoimentos ou telas que não existam.

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

CTAs primários (`.pill`, laranja) levam a `#contato` ou a um `mailto()` com assunto. Secundários
(`.more`, link com `›`) levam a seções relevantes (`#solucoes`, `#metodo`, `#flowia`) ou a `#contato`.

---

## 4. Naming / consistência

- O `title` de cada serviço em `content.js` é a referência canônica (bento e rodapé).
- Wordmark: nome "GAUSSIX" + subtítulo "AI · DATA · SYSTEMS" (apenas copy; estilo controlado por CSS).

---

## 5. Checklist rápido (antes de finalizar)

1. `npm run build` e `npm run lint` passam.
2. Texto novo está em `content.js` quando aplicável.
3. Visual inalterado (paleta, canvas, animações).
4. Posicionamento e CTAs coerentes com `BUSINESS_RULES.md`.
