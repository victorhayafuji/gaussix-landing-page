# Histórico — Animações cross-browser & Performance

> Registro dos problemas de animação/desempenho enfrentados na landing GAUSSIX e como cada um foi
> diagnosticado e resolvido. Ordem aproximadamente cronológica. Serve como referência de
> *troubleshooting* e como memória das decisões.

---

## 1. Reveal "ao rolar" não animava no Edge (depois, no Chrome também)

- **Sintoma:** o conteúdo aparecia **visível, mas sem animação** de entrada (saltava direto para o
  estado final). Primeiro no Edge; depois também no Chrome. No **LibreWolf** funcionava.
- **Hipótese descartada:** "as propriedades CSS standalone `translate`/`scale` seriam incompatíveis".
  Tentou-se convertê-las para `transform` — **quebrou** o reveal inclusive no Chrome. Motivo: os cards
  (`.card`/`.sol`/`.step`) usam `translate`/`scale` para o *reveal* **e** `transform` para o *hover*,
  de propósito como propriedades separadas e componíveis. Unificar em `transform` faz uma animação
  atropelar a outra. **Revertido por completo.**
- **Diagnóstico (com prova):** o sistema respeita `prefers-reduced-motion: reduce` — um atalho de
  acessibilidade que **desliga as animações** e só torna o conteúdo visível. Rodando a página num
  navegador limpo, o diagnóstico retornou:

  ```
  reducedMotion: true      ← movimento reduzido ATIVO no ambiente
  armed: false             ← o reveal nem chegou a "armar"
  revealedIn: 27 / 27      ← tudo já visível, sem animar
  ```

  Chrome e Edge seguem a config do Windows (*Acessibilidade → Efeitos visuais → Efeitos de animação*).
  Com ela desligada, os dois reportam `reduce` e pulam a animação. O LibreWolf não segue essa config
  por padrão → animava (e por isso parecia "só o Chrome com problema").
- **Solução (decisão de produto):** **forçar a animação no código**, removendo o gate de
  `prefers-reduced-motion`. Verificado: depois da mudança, `armed: true` mesmo com `reducedMotion: true`,
  e o reveal passa de `0/27 → 27/27` conforme se rola.
- **Arquivos:** [`src/hooks/useReveal.js`](../src/hooks/useReveal.js), [`src/index.css`](../src/index.css)
  (bloco `@media (prefers-reduced-motion: reduce)` e cascata de entrada do Hero).

## 2. Reveal intermitente — às vezes "saltava" mesmo no Chrome

- **Sintoma:** mesmo com tudo certo, ocasionalmente os elementos pulavam para o estado final sem
  transição (dependia de carga/timing).
- **Causa-raiz:** **corrida de paint**. O JS adiciona `html.reveal-armed` (`opacity:0`) e, no mesmo
  ciclo de estilo, adiciona `.in` (`opacity:1`). Sem um frame "de origem" pintado, não há de onde animar.
- **Solução:** forçar um *reflow* (`void document.documentElement.offsetHeight`) logo após armar, e
  disparar o primeiro *sweep* com **double `requestAnimationFrame`**, garantindo o frame de origem.
- **Arquivos:** [`src/hooks/useReveal.js`](../src/hooks/useReveal.js).

## 3. Scroll "pesado" no LibreWolf

- **Sintoma:** rolar a página engasgava, principalmente no Gecko/LibreWolf.
- **Causa-raiz (auditoria):** **três** listeners de `scroll` simultâneos, sem *throttle*. O pior era o
  *sweep* do reveal, que rodava `querySelectorAll('.reveal:not(.in)')` **+** `getBoundingClientRect()`
  em ~27 elementos **a cada evento de scroll** → enxurrada de *reflow* síncrono. Pior ainda: era
  **redundante** com o IntersectionObserver que já fazia o mesmo trabalho de forma eficiente.
- **Solução:** coalescer o *sweep* em **no máximo 1 `requestAnimationFrame` por frame** e **auto-remover**
  os listeners de scroll/resize assim que tudo já foi revelado. O IntersectionObserver segue como
  mecanismo principal.
- **Arquivos:** [`src/hooks/useReveal.js`](../src/hooks/useReveal.js).

## 4. Custo do canvas (curva gaussiana) por frame

- **Sintoma:** custo contínuo de CPU/GPU enquanto o canvas estava visível (mais sensível no Firefox).
- **Causa-raiz:** `ctx.shadowBlur` aplicado a cada frame na curva principal, no apex e em cada partícula
  — a operação 2D mais cara, especialmente no Gecko.
- **Solução:** reduzir os raios de `shadowBlur` (curva `26→16`, apex `18→12`, partículas `10→6`) e
  reduzir o raio de `backdrop-filter: blur()` em nav/painéis/menu/engine. Glow visualmente quase
  idêntico, repaint bem mais leve. *(O cap de FPS testado aqui foi depois revertido — ver item 7.)*
- **Arquivos:** [`src/lib/GaussField.js`](../src/lib/GaussField.js), [`src/index.css`](../src/index.css).

## 5. `requestAnimationFrame` infinito no FinalCTA

- **Sintoma:** consumo de CPU contínuo mesmo com a seção de contato fora da tela.
- **Causa-raiz:** o loop de "drift" (intro do canvas que assenta no centro) **nunca parava** — seguia
  agendando rAF e chamando `setMouse` para sempre, inclusive off-screen.
- **Solução:** encerrar o loop quando o movimento assenta (`settle <= 0`), com um `setMouse(0.5,0.5)`
  final. Visual da intro idêntico; consumo cai a zero depois.
- **Arquivos:** [`src/components/sections/FinalCTA.jsx`](../src/components/sections/FinalCTA.jsx).

## 6. Auditoria geral — código morto, acessibilidade e organização

- **Código morto removido:** variantes de reveal `data-rv="right"`/`"up-lg"` (nunca usadas no JSX) e
  campos de dados `vizType`/`gradientStops` em `content.js` (nunca lidos — as soluções renderizam por
  `svgByGradient[gradientId]` com SVG inline).
- **Acessibilidade:** o menu mobile, quando fechado, continuava **focável por teclado** (`pointer-events:none`
  não remove da ordem de `Tab`) → adicionado `visibility:hidden`. Hierarquia de *headings* do rodapé
  pulava de `<h2>` para `<h4>` → trocado para `<h3>` (estilo visual preservado).
- **Organização:** Navbar passou de `document.querySelector(...)` para `useRef`/`useState`
  (comportamento idêntico, código idiomático).
- **Arquivos:** [`src/data/content.js`](../src/data/content.js), [`src/index.css`](../src/index.css),
  [`src/components/layout/Footer.jsx`](../src/components/layout/Footer.jsx),
  [`src/components/layout/Navbar.jsx`](../src/components/layout/Navbar.jsx).

## 7. Hero "lagado" após forçar as animações

- **Sintoma:** a animação de entrada do Hero parecia "travada"/picotada.
- **Causa-raiz (dupla):**
  1. O **cap de 30fps** adicionado no canvas (item 4) deixava o fundo gaussiano picotado — desnecessário
     agora que o gargalo real (item 3) já estava resolvido.
  2. O `@keyframes heroIn` animava **`filter: blur(8px) → none`** em 4 elementos (incluindo o `<h1>`
     grande). Animar `filter: blur` recalcula um blur de GPU a cada frame — caríssimo.
- **Solução:** **canvas de volta ao refresh nativo (60fps)** mantendo o glow leve; e **remover o `blur`
  do `heroIn`**, deixando a entrada como `opacity` + `transform` (compostos pela GPU, sem jank).
- **Arquivos:** [`src/lib/GaussField.js`](../src/lib/GaussField.js), [`src/index.css`](../src/index.css).

---

## Lições aprendidas

- **Medir/reproduzir antes de editar código sensível.** Duas hipóteses iniciais (item 1) custaram
  retrabalho por mexer no CSS sem prova. O que fechou o diagnóstico foi **rodar a página e ler o estado
  real** (`reducedMotion`, `armed`, contagem de `.in`).
- **`prefers-reduced-motion` é o "interruptor invisível"** que explica diferenças entre navegadores e
  máquinas — Chrome/Edge seguem o Windows; Firefox/LibreWolf, não.
- **`translate`/`scale` standalone ≠ `transform`** aqui é *intencional*: reveal e hover ficam em
  propriedades separadas para não se atropelarem. Não unificar.
- **O gargalo de scroll eram os `getBoundingClientRect` por evento**, não o canvas. Sempre suspeitar de
  *layout thrashing* (ler geometria dentro de handlers de scroll) antes de culpar a parte "mais visível".
- **Animar `filter: blur` é caro;** `opacity`/`transform` são praticamente de graça (compositor). Para
  entradas suaves, prefira fade + slide.
- **Pausar trabalho fora da viewport** (IntersectionObserver para o canvas) e **encerrar loops quando
  terminam** (drift do FinalCTA) evita custo silencioso.
