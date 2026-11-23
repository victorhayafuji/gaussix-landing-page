# Spec · Redesign "anti AI slop" da landing GAUSSIX

Data: 2026-11-23 · Branch: `feat/redesign-anti-slop` · Processo: workflow `/nova-lp` (repo `Landing Pages`),
adaptado para redesign. Mockups de referência (locais, fora do git): `uploads/direcoes/`.

## 1. Briefing

| Tema | O que foi dito | Premissa |
|---|---|---|
| Pedido | Ajustes de UI/UX e visual anti AI slop; pode mudar fonte e posição dos blocos; **a cor da identidade se mantém** | Paleta (`--purple`, `--orange`, `--bg`…) intocada |
| Escopo | Estrutura **e** copy podem mudar | Dentro de `BUSINESS_RULES.md` e dos CTAs permitidos |
| Canvas | Manter, mas reposicionar; uma cópia só | Motor `GaussField.js` intocado; só opções e container mudam |
| Provas | Nenhuma publicável (sem clientes, números ou telas) | Nada é inventado; a página se sustenta em clareza e método |
| Referência | "Fonte igual à do Beast X V2, pegada mais vendedora e mais clean" | Inter Tight + Inter + JetBrains Mono; hero centralizado; pílula; muito respiro |
| Gráfico | 1ª escolha "Linha" (só a curva, de borda a borda) foi revista: ia até as bordas e ficou "sem sal". **Final: "Sutil"**, contida na largura do texto, pontas dissolvidas | `bars: 56`, `extras: 2`, `particles: 4`, `grid: false` + `mask-image` |
| FlowIA | Botão "Conhecer o FlowIA" abre e-mail | `mailto:contato@gaussix.com?subject=Conhecer o FlowIA` |

## 2. Diagnóstico (o que caracterizava "AI slop")

Texto em gradiente em 7/7 títulos; fórmula "Da X à Y" 3×; todas as seções no mesmo molde
(eyebrow numerado → título → lead → grade de cards); Space Grotesk + mono decorativa; mesmo conteúdo
repetido 4× (ticker, 3 cards, 6 soluções, 6 casos); manchas de brilho + grade no fundo; pílula com
bolinha pulsante; legenda explicando as cores da marca; etiqueta **"Editável"** em produção.

## 3. Decisões

1. **Tipografia (Beast X V2):** `Inter Tight` (títulos, 600, tracking −0,03em), `Inter` (texto),
   `JetBrains Mono` (só rótulos pequenos). `Michroma` só no wordmark. Sai a Space Grotesk.
   Fontes **self-hosted** via `@fontsource` (como no Beast X): sem requisição ao Google Fonts
   (menos um terceiro recebendo o IP do visitante — coerente com a Política de Privacidade).
2. **Sem texto em gradiente.** O gradiente roxo→laranja fica só onde é gráfico: curva, wordmark,
   barra do topo. Ênfase de texto = laranja sólido em rótulos/links, nunca em títulos.
3. **Cor por função:** laranja = ação (pílula, links, eyebrows); roxo = tom do bloco em destaque e
   da curva. Fundo `--bg` liso: saem manchas de brilho e a grade (`BackgroundField`).
4. **Ritmo variado:** cada seção tem um layout próprio (hero centralizado · manifesto em texto
   corrido · bento · colunas numeradas · bloco de produto · fechamento).
5. **Benefício primeiro:** cada serviço abre com o resultado para o cliente; o nome do serviço vira rótulo.

## 4. Estrutura (5 seções + hero)

Ordem: o que é → por que importa → o que fazemos → como → prova → conversa.

| # | Seção | id | Componente |
|---|---|---|---|
| 1 | Hero | `top` (main) | `Hero.jsx` (reescrito) |
| 2 | Manifesto | `manifesto` | `Manifesto.jsx` (novo) |
| 3 | O que fazemos | `solucoes` | `Solutions.jsx` (reescrito) |
| 4 | Método | `metodo` | `Methodology.jsx` (reescrito) |
| 5 | FlowIA | `flowia` | `FlowIA.jsx` (substitui `BrandConcept.jsx`) |
| 6 | Contato | `contato` | `FinalCTA.jsx` (reescrito, sem canvas) |

**Removidos:** `TelemetryTicker.jsx`, `Credibility.jsx`, `UseCases.jsx`, `BrandConcept.jsx`,
`BackgroundField.jsx`; exports `telemetryItems` e `useCases`; os 12 mini-SVGs; CSS órfão de tudo isso.

## 5. Copy exata

### Navbar
Links: **O que fazemos** (`#solucoes`) · **Método** (`#metodo`) · **FlowIA** (`#flowia`).
Pílula: **Falar sobre meu projeto** (`#contato`). Menu mobile com os mesmos itens.

### 1 · Hero
- Eyebrow: **Dados · IA · Produtos digitais**
- H1: **Menos ruído.** / **Mais direção.** (quebra forçada no desktop)
- Sub: **Dashboards, automações com IA, landing pages e sistemas sob medida. Para empresas que querem vender, operar e decidir melhor.**
- Pílula: **Falar sobre meu projeto** → `#contato` · Link: **Ver o que fazemos ›** → `#solucoes`
- Abaixo: canvas da curva (faixa de largura total) + eixo **Ruído · Clareza · Direção**.

### 2 · Manifesto
> Planilhas paralelas. Atendimento manual. Decisões no escuro. **A Gaussix organiza esse ruído com
> dados, IA e engenharia — até sobrar o que importa: o próximo passo.**

Primeira parte em cinza (contraste ≥ 3:1, texto grande), segunda em `--ink`.

### 3 · O que fazemos
- Eyebrow: **O que fazemos** · H2: **Um parceiro.** / **Toda a operação digital.**
- Lead: **Do painel que mostra os números ao sistema que roda o processo. Você escolhe por onde começar.**
- Bento (fonte: `solutions` em `content.js`; rótulo = `title`, usado também no rodapé):

| Rótulo (`title`) | Título do bloco (`headline`) | Texto (`description`) | Link (`cta`) |
|---|---|---|---|
| Dashboards & BI | Veja a operação inteira num só painel. | Vendas, marketing e finanças centralizados em indicadores que a diretoria usa de verdade. | Criar meu dashboard |
| Automação | Chega de copiar dado de planilha em planilha. | Rotinas e integrações entre os sistemas que você já usa, rodando sem intervenção manual. | Automatizar minha operação |
| Agentes de IA | Atendimento no WhatsApp, a qualquer hora. | Agentes que respondem, qualificam e passam para a sua equipe quando o caso pede uma pessoa. | — |
| Landing pages | Páginas feitas para converter. | Rápidas, medidas e ligadas às suas campanhas: um ativo de vendas, não só uma página bonita. | Solicitar uma landing page |
| Sistemas web | A ferramenta que sua equipe precisava. | Portais, sistemas internos e painéis de gestão sob medida, no lugar das planilhas. | — |

Links levam a `#contato`. Layout desktop: linha 1 = BI (4/6, bloco em destaque com tom roxo) +
Automação (2/6); linha 2 = três blocos de 2/6. Mobile: uma coluna.

### 4 · Método
- Eyebrow: **Método** · H2: **Como trabalhamos.** · Lead: **Quatro etapas, cada uma com uma entrega clara.**
- Etapas (`steps` em `content.js`, novo campo `deliverable`):

| Nº | Título | Texto | Entrega |
|---|---|---|---|
| 01 | Diagnóstico | Mapeamos processos, ferramentas e dados para achar onde está o ruído. | Mapa de processos e prioridades |
| 02 | Arquitetura | Desenhamos a solução: dados, automações, IA e interface. | Desenho da solução e plano de entrega |
| 03 | Construção | Desenvolvemos e validamos cada fluxo com a sua equipe. | Solução em uso, validada |
| 04 | Evolução | Acompanhamos o uso real e ajustamos o que for preciso. | Ajustes contínuos com base no uso |

Visual: 4 colunas (mobile: 1), número grande em cinza, fio superior que desenha da esquerda para a direita ao entrar.

### 5 · FlowIA
- Eyebrow: **Produto Gaussix** · H2: **FlowIA.**
- Sub: **Atendimento, agendamento e suporte no WhatsApp, com IA conversacional e painéis para acompanhar tudo. Desenvolvido e operado pela Gaussix.**
- Três capacidades: **WhatsApp** — O canal que o seu cliente já usa. · **IA conversacional** — Responde, agenda e encaminha. · **Painéis analíticos** — Acompanhe atendimentos e agendamentos.
- Pílula: **Conhecer o FlowIA** → `mailto:contato@gaussix.com?subject=Conhecer%20o%20FlowIA`
- Visual: bloco grande arredondado (`--surface`), centralizado. Saem o "X" gigante e a legenda de cores.

### 6 · Contato
- H2: **Vamos conversar sobre a sua operação.**
- Lead: **Conte o que você quer resolver: dados, automação, IA, uma landing page ou um sistema. A gente começa pelo diagnóstico.**
- Pílula: **Falar sobre meu projeto** → `mailto:` (assunto "Falar sobre meu projeto", corpo atual)
- Link: **Solicitar uma landing page ›** → `mailto:` (assunto "Solicitar uma landing page")
- Linha: **ou escreva para contato@gaussix.com**

### Rodapé
Mesma estrutura. Coluna "Empresa": O que fazemos · Método · FlowIA · Contato. Coluna "Soluções" lê
`solutions` (5 itens). Assinatura Alievi mantida.

## 6. Movimento

- Sistema de reveal atual (`.reveal` / `data-d`, `useReveal.js` intocado): entradas de 24 px, `expo.out`.
- Canvas: motor atual, reage ao mouse/toque; pausa fora da tela (já existe). Com
  `prefers-reduced-motion`, a curva desenha e **para** (o hero chama `pause()` após o 1º quadro).
- Método: fio superior com `transform: scaleX` disparado pela classe `.in`.
- Animar só `transform`, `opacity`, `clip-path`. Sem quique.

## 7. Degradação e responsivo

- Reduced-motion: reveals seguem a decisão de produto existente (rodam); canvas estático.
- Mobile (≤ 680 px): hero com H1 em `clamp`, faixa da curva menor (≈ 160 px), bento e método em 1 coluna,
  menu mobile atual.
- Páginas legais (`/privacidade`, `/termos`) herdam as fontes novas; conferir que seguem legíveis.

## 8. Fora de escopo

`GaussField.js`, `useGaussField.js`, `useReveal.js`; tokens de cor; wordmark; texto das páginas legais;
fotos/telas novas; modo claro; números, clientes ou depoimentos (não existem provas publicáveis).

## 9. Aceite

1. `npm run lint` e `npm run build` com exit 0.
2. `grep grad-text` em `src/` = 0; nenhum "Editável" no build.
3. Capturas desktop (1440×900) e mobile (390×844) de cada seção, comparadas aos mockups.
4. Contraste AA de todo texto contra `--bg` e `--surface` (cinza do manifesto ≥ 3:1 como texto grande).
5. Nenhuma requisição a `fonts.googleapis.com`/`fonts.gstatic.com` na página.
6. Navegação por teclado: foco visível em links e pílulas; âncoras do menu funcionam.
7. Docs atualizados no mesmo PR: `CLAUDE.md` (estrutura, tipografia, decisões), `docs/CONTENT_GUIDE.md`,
   `docs/BUSINESS_RULES.md` §5.
