# GAUSSIX — Landing Page

Landing page da **GAUSSIX**, empresa de **tecnologia aplicada** que atua com Dados, IA, automações,
landing pages, sistemas digitais e produtos SaaS próprios (como o **FlowIA**).

A experiência usa a **distribuição gaussiana** como metáfora central — *ruído → clareza → decisão* —
com um visual técnico, escuro e premium: canvas interativo, curvas gaussianas, telemetria e animações
de revelação ao rolar.

> Stack: **React 19 + Vite 6 + Tailwind CSS v4**.

---

## 🚀 Começando

Pré-requisito: **Node.js** (18+).

```bash
npm install      # instala as dependências
npm run dev      # ambiente de desenvolvimento (Vite)
npm run build    # build de produção (gera dist/)
npm run preview  # serve a build de produção localmente
npm run lint     # ESLint
```

---

## 📁 Estrutura

```text
src/
├── App.jsx                 # Montagem da página (ordem das seções)
├── main.jsx                # Entry point do React
├── index.css              # Tailwind v4 + design tokens + CSS de componentes
├── data/content.js        # Conteúdo estático (fonte única: soluções, casos, etapas, telemetria)
├── hooks/                 # useGaussField (canvas), useReveal (scroll reveal)
├── lib/GaussField.js      # Motor visual matemático do canvas
└── components/
    ├── layout/            # BrandBar, BackgroundField, Navbar, Footer
    ├── sections/          # Hero, TelemetryTicker, Credibility, Solutions, Methodology,
    │                      #   BrandConcept, UseCases, FinalCTA
    └── ui/                # Wordmark
```

Documentação de manutenção: [`CLAUDE.md`](CLAUDE.md) · regras de negócio:
[`docs/BUSINESS_RULES.md`](docs/BUSINESS_RULES.md) · guia de conteúdo:
[`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md) · deploy (domínio GoDaddy):
[`docs/DEPLOY.md`](docs/DEPLOY.md) · segurança:
[`docs/SECURITY.md`](docs/SECURITY.md).

---

## ✏️ Editando conteúdo (sem mexer no visual)

- **Conteúdo estruturado** (soluções, casos de uso, etapas, telemetria) vive em
  [`src/data/content.js`](src/data/content.js) — editar o array atualiza todos os pontos que o consomem.
- **Copy inline** (headlines, leads, CTAs) fica no JSX da seção; altere **apenas as strings**, nunca
  classes ou estilos.
- Preserve a identidade visual: paleta roxo/laranja, canvas (`GaussField`), telemetria e animações.

Detalhes e padrões de CTA/tom de voz em [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md).

---

## 🤖 Desenvolvimento assistido por IA (Claude Code)

O diretório [`.claude/`](.claude) deixa o projeto pronto para manutenção com IA:

- **commands/** — `/audit`, `/content-update`, `/bugfix`
- **skills/** — `gaussix-content`, `gaussix-quality-audit`
- **hooks/** — automações que protegem arquivos sensíveis, rodam ESLint após edições, validam
  `build`/`lint` ao finalizar e reforçam as regras de marca (ver [`.claude/hooks/README.md`](.claude/hooks/README.md))

---

## 🎨 Identidade visual

| Token | Valor |
|---|---|
| Purple | `#8B2CF6` |
| Orange | `#F86606` |
| Background | `#06050A` |

Tipografia: **Michroma** (wordmark), **Space Grotesk** (corpo), **JetBrains Mono** (telemetria/dados).

---

## 🏢 GAUSSIX & FlowIA

A **GAUSSIX** é a marca principal. O **FlowIA** é um produto SaaS proprietário da GAUSSIX (automação de
suporte/atendimento com WhatsApp + IA conversacional + dashboards), apresentado como prova de capacidade
técnica — não como marca separada. Ver [`docs/BUSINESS_RULES.md`](docs/BUSINESS_RULES.md).
