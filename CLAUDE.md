# CLAUDE.md — GAUSSIX Landing Page

> Guia operacional para continuar o desenvolvimento no **React + Vite + Tailwind v4** sem perder contexto, identidade visual e com performance otimizada.

---

## 1. Objetivo do projeto

A landing page da **GAUSSIX** comunica uma empresa premium de **tecnologia aplicada** — que atua com **Dados, IA, automações, landing pages, sistemas digitais e produtos SaaS próprios** — usando a **distribuição gaussiana** como metáfora central: ruído estatístico → clareza → decisão.

A GAUSSIX **não é** apenas "AI Data Analysis", BI puro, consultoria genérica, agência de sites ou software house genérica. Os Dados são o **DNA técnico** da marca, mas não limitam o escopo. O posicionamento correto: *a GAUSSIX cria soluções digitais usando Dados, IA, automação, design e engenharia para ajudar empresas a vender melhor, operar melhor e decidir melhor.*

O **FlowIA** é o produto SaaS proprietário da GAUSSIX (ver Seção 7 e [`docs/BUSINESS_RULES.md`](docs/BUSINESS_RULES.md)) — prova de capacidade técnica, nunca uma marca separada.

A experiência visual é:
- **técnica**, porém elegante;
- **escura**, com grade, vidro, brilho e profundidade;
- **orientada a dados**, com curvas gaussianas, barras, telemetria e interação;
- **leve e responsiva**, principalmente em mobile;
- **confiável para venda B2B**, sem parecer template genérico de SaaS.

---

## 2. Nova estrutura do projeto (React + Vite + Tailwind v4)

O monólito original (página de arquivo único, preservado no histórico do Git) foi refatorado em componentes modulares estruturados para facilidade de manutenção e desempenho superior.

```text
/
├── README.md                     # Visão geral do projeto (vitrine do repositório)
├── index.html                    # Entry point do Vite (carrega main.jsx)
├── package.json                  # Dependências e scripts (dev/build/preview/lint)
├── vite.config.js                # Configuração do Vite + React Plugin + Tailwind v4 Plugin
├── eslint.config.js              # ESLint flat config (JS + React Hooks + React Refresh)
├── .gitignore                    # node_modules, dist, uploads, env, etc.
├── docs/                         # BUSINESS_RULES.md, CONTENT_GUIDE.md
├── .claude/                      # settings.json (hooks) + commands/ + skills/ + hooks/
├── src/
│   ├── main.jsx                  # Ponto de entrada do React
│   ├── App.jsx                   # Montagem da página principal (ordem das seções)
│   ├── index.css                 # Import do Tailwind v4 + design tokens + custom CSS
│   ├── data/
│   │   └── content.js            # Conteúdo estático unificado (Soluções, Telemetria, Casos de Uso, etc.)
│   ├── hooks/
│   │   ├── useGaussField.js      # Gerenciamento de ciclo de vida e render do GaussField no Canvas
│   │   └── useReveal.js          # IntersectionObserver + Sweep para revelação ao rolar a página
│   ├── lib/
│   │   └── GaussField.js         # Motor visual matemático GaussField (Vanilla JS puro com destroy())
│   └── components/
│       ├── layout/
│       │   ├── BackgroundField.jsx  # Gradientes fixos de fundo e malha de grade técnica
│       │   ├── BrandBar.jsx         # Barra tricolor de marca fixa no topo (laranja/roxo)
│       │   ├── Footer.jsx           # Rodapé da página com Wordmark
│       │   └── Navbar.jsx           # Barra de navegação com estado .scrolled e menu mobile
│       ├── sections/
│       │   ├── Hero.jsx             # Seção de cabeçalho com Canvas GaussField interativo e mouse-tracking
│       │   ├── TelemetryTicker.jsx  # Marquee infinito de telemetria técnica
│       │   ├── Credibility.jsx      # Seção 01 - Posicionamento (3 cards analíticos)
│       │   ├── Solutions.jsx        # Seção 02 - Soluções (6 cards com visualizações específicas)
│       │   ├── Methodology.jsx      # Seção 03 - Método (Linha animada SVG e etapas)
│       │   ├── BrandConcept.jsx     # Seção 04 - Produto em destaque (FlowIA, glifo X e legenda)
│       │   ├── UseCases.jsx         # Seção 05 - Casos de uso
│       │   └── FinalCTA.jsx         # Seção 06 - Chamada final / contato (skips canvas no mobile)
│       └── ui/
│           └── Wordmark.jsx          # Logotipo GAUSSIX (marca + subtítulo)
```

---

## 3. Identidade visual obrigatória

### Cores principais
```css
--purple: #8B2CF6;          /* Deep Tech Purple */
--orange: #F86606;          /* Kinetic Orange   */
--purple-deep: #5A18A8;
--orange-deep: #C44A04;
--purple-soft: rgba(139, 44, 246, 0.14);
--orange-soft: rgba(248, 102, 6, 0.14);
--bg: #06050A;
--ink: #ECEAF2;
--grad: linear-gradient(100deg, var(--purple) 0%, #B23FAE 48%, var(--orange) 100%);
```

### Tipografia
Carregadas no `index.html`:
- **Michroma** (utilizado no Wordmark e em legendas selecionadas)
- **Space Grotesk** (font-family padrão do corpo e de displays)
- **JetBrains Mono** (usada para códigos de telemetria, dados e detalhes técnicos)

---

## 4. Comandos úteis

Desenvolvimento local:
```bash
npm run dev
```

Build de produção:
```bash
npm run build
```

Preview da build de produção:
```bash
npm run preview
```

Lint (ESLint flat config em `eslint.config.js`):
```bash
npm run lint
```

---

## 5. Bugs resolvidos e otimizações implementadas

### 5.1 Otimização de CPU/Performance do Canvas
- **Pausa automática:** Os canvases `Hero.jsx` e `FinalCTA.jsx` usam o hook `useGaussField.js` para monitorar a viewport com um `IntersectionObserver`. Quando o canvas sai da tela, a animação é imediatamente pausada (`cancelAnimationFrame`), reduzindo o consumo de CPU e bateria para zero.
- **Mobile bypass:** O Canvas do rodapé em `FinalCTA.jsx` não é instanciado em telas menores que `680px` (mobile). O hook `useGaussField` recebe um parâmetro `enabled` dinâmico para evitar loops desnecessários e reduzir consumo no mobile.

### 5.2 Estabilidade do Reveal-on-scroll (Correção de Especificidade CSS)
- **O problema:** A animação de scroll usa `.reveal` e a classe `.in` para tornar os elementos visíveis ao rolar. No entanto, o seletor `html.reveal-armed .reveal` (usado para ocultar os elementos antes da animação com JS ativo) possui especificidade maior do que `.reveal.in`. Como resultado, os elementos permaneciam com `opacity: 0` mesmo após receberem a classe `.in`.
- **A solução:** Os seletores do estado ativo foram ajustados em `src/index.css` para ter especificidade idêntica ou superior (ex: `.reveal.in, html.reveal-armed .reveal.in`), permitindo que os elementos revelem-se corretamente durante a rolagem de forma estável.

### 5.3 Compatibilidade com React StrictMode
- **O problema:** Em modo de desenvolvimento, o React monta e limpa os hooks duas vezes consecutivas para validar vazamentos de memória. Limpar a classe `reveal-armed` ou `.in` na desmontagem fazia com que elementos que já estavam no viewport fossem re-ocultados e ficassem invisíveis para sempre (já que a animação é de disparo único).
- **A solução:** A limpeza de desmontagem do hook `useReveal.js` preserva o estado das classes CSS já atribuídas às tags do DOM, assegurando estabilidade em mounts múltiplos e evitando "flashes" ou sumiço de conteúdo.

### 5.4 Endurecimento da auditoria (organização e robustez)
- **Fonte única de conteúdo:** `Solutions.jsx` e os links de soluções do `Footer.jsx` passaram a ler do array `solutions` em `content.js` (antes os textos eram hardcoded e o array estava sem uso).
- **Cleanup de canvas:** `GaussField.js` guarda o `rafId` e chama `cancelAnimationFrame` em `destroy()`/`pause()`.
- **Código morto/legado removido:** prop `showSubDashes` no Wordmark, `EngineConsole.jsx` (órfão), `assets/` e `monolith.html`.
- **Tooling:** ESLint (flat config + script `lint`), `.gitignore` e repositório Git inicializados.

---

## 6. Padrões de código para edição

- **Textos e Cópia:** O conteúdo estruturado (soluções, casos, etapas, telemetria) fica em `src/data/content.js`; parte da copy (eyebrows, títulos de seção, leads, CTAs) ainda é inline nas seções. Veja a Seção 8 para o que editar onde. Prefira `content.js` sempre que aplicável.
- **Identidade Visual:** Respeite rigorosamente a paleta de cores roxo/laranja e a metáfora da curva gaussiana. Não altere o visual do hero canvas ou do painel de telemetria sem o aval do usuário.
- **Acessibilidade:** Garanta tags HTML semânticas (`<section>`, `<article>`, `<header>`, `<footer>`) e tags descritivas em links e SVGs.

---

## 7. Regras de negócio da GAUSSIX

Estas regras são vinculantes para qualquer alteração de copy ou posicionamento. Versão detalhada em [`docs/BUSINESS_RULES.md`](docs/BUSINESS_RULES.md).

1. A **GAUSSIX é a marca principal** (empresa-mãe).
2. **FlowIA é produto SaaS proprietário** da GAUSSIX — nunca uma empresa/marca separada.
3. **Dados são o DNA técnico** da GAUSSIX, mas **não limitam** seu escopo.
4. **Landing pages** são vendidas como **ativos digitais de conversão**, não "páginas bonitas".
5. **IA** é apresentada como ferramenta de **produtividade, automação e inteligência operacional** — sem promessas irreais.
6. **Produtos SaaS próprios** (FlowIA) = **prova de capacidade técnica**.
7. Comunicação **B2B, premium, técnica e consultiva**.
8. Não parecer **agência genérica** nem **software house genérica**.
9. As soluções devem **conectar tecnologia a impacto de negócio**.
10. Toda copy evita **promessas vagas, exageradas ou impossíveis de comprovar**.

### Relação GAUSSIX → FlowIA
- **GAUSSIX** = empresa de tecnologia aplicada (Dados, IA, automações, landing pages, sistemas, SaaS).
- **FlowIA** = produto SaaS *desenvolvido pela GAUSSIX* (suporte/atendimento/agendamento com WhatsApp + IA conversacional + dashboards).
- Em copy, o FlowIA aparece sempre como **"produto da GAUSSIX"** / **"SaaS proprietário"** — exemplo prático, não protagonista da marca.

---

## 8. Como editar conteúdo sem mexer no visual

- **Fonte única de conteúdo:** `src/data/content.js` exporta `solutions`, `useCases`, `steps`, `telemetryItems`. As seções `Solutions.jsx`, `UseCases.jsx`, `Methodology.jsx`, `TelemetryTicker.jsx` e os links de soluções do `Footer.jsx` **leem desses arrays** — editar o array atualiza todos os pontos.
- **SVGs das soluções** são bespoke por card e ficam inline em `Solutions.jsx` (mapa `svgByGradient`, chaveado por `gradientId`). Só o texto é data-driven.
- **Copy ainda inline** (eyebrows, títulos de seção, leads, CTAs, copy do FlowIA, navbar, footer institucional): editar diretamente no JSX da seção, **sem tocar em `className`, estrutura ou estilos**.
- Para mudar copy: altere apenas strings. **Nunca** altere classes visuais, paleta ou estrutura de tags por preferência estética.
- Guia completo de copy/tom/CTA: [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md).

---

## 9. Arquivos sensíveis / não alterar sem aprovação

Alterar estes itens exige aval explícito do usuário (impacto visual ou de marca):

- `src/lib/GaussField.js` — motor visual do canvas (curva/barras/partículas).
- `src/hooks/useGaussField.js` — ciclo de vida e pausa do canvas.
- `src/hooks/useReveal.js` — sistema de reveal-on-scroll (cuidado com StrictMode).
- Canvas do **Hero** (`Hero.jsx`) e **FinalCTA** (`FinalCTA.jsx`).
- Paleta e tokens de design em `src/index.css` (variáveis `--purple`, `--orange`, `--grad`, etc.).
- Animações reveal e seletores `.reveal` / `html.reveal-armed` em `src/index.css`.
- `index.html` — fontes e meta tags.

---

## 10. Padrões de copy, tom de voz e CTAs

- **Tom:** B2B, premium, técnico-consultivo. Frases diretas, orientadas a resultado de negócio.
- **Evitar:** linguagem genérica de agência, jargão vazio, promessas garantidas/irreais.

**CTAs permitidos** (usar variações destes):
- Quero construir minha solução
- Solicitar uma landing page
- Conhecer o FlowIA
- Automatizar minha operação
- Criar meu dashboard
- Falar sobre meu projeto

**CTAs proibidos** (genéricos/exagerados):
- Saiba mais · Começar agora · Escalar meu negócio instantaneamente · Revolucionar com IA · Dominar o mercado

---

## 11. Checklist antes de finalizar alterações

1. `npm run build` passa sem erros.
2. `npm run lint` passa sem erros novos.
3. **Sem regressão visual** — identidade, paleta, canvas e animações preservados.
4. Conteúdo novo/editado está em `src/data/content.js` quando aplicável.
5. Posicionamento coerente: GAUSSIX como empresa ampliada; **FlowIA como produto SaaS proprietário**.
6. CTAs dentro da lista permitida (Seção 10).
7. Nenhuma promessa vaga/exagerada introduzida.
8. Tags semânticas e acessibilidade preservadas.

---

## 12. Instruções para agentes de IA (Claude Code)

- **Leia este arquivo antes de editar.** Ele tem prioridade sobre preferências estéticas.
- **Preserve o visual.** Não altere paleta, layout, canvas, GaussField ou animações sem aprovação explícita.
- **Não invente** produto, serviço, regra de negócio ou promessa comercial.
- **Pergunte antes de refatoração grande.** Faça apenas mudanças seguras e necessárias.
- Ferramentas auxiliares: `.claude/commands/` (audit, content-update, bugfix) e `.claude/skills/` (gaussix-content, gaussix-quality-audit).
- **Hooks automáticos** (`.claude/settings.json` + `.claude/hooks/`, ver [`.claude/hooks/README.md`](.claude/hooks/README.md)):
  - `protect-sensitive-files.mjs` — pede confirmação ao editar arquivos sensíveis (Seção 9).
  - `lint-changed.mjs` — roda ESLint no arquivo editado e devolve erros.
  - `validate-on-stop.mjs` — roda `lint` + `build` ao finalizar (pula se nada mudou).
  - `brand-reminder.mjs` — injeta lembrete das regras de marca a cada pedido.
- Ao terminar, rode o **Checklist** da Seção 11.
