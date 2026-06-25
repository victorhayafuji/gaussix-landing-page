# GAUSSIX Landing — Backlog de melhorias

> Lista priorizada de melhorias **sugeridas** para o site. Os itens marcados ✅ já foram
> implementados (PR de páginas legais + SEO). O restante é proposta — não implementar sem decisão.

## Já implementado ✅
- Páginas legais reais `/privacidade` e `/termos` (Vite multi-page → URLs limpas no Netlify), reusando o design system GAUSSIX.
- Footer com bloco **Legal** + contatos reais (`mailto:contato@gaussix.com`, LinkedIn, "Agendar conversa"); âncoras internas em `/#secao` (funcionam a partir das páginas legais).
- CTA de contato (#contato) e CTA final viram `mailto:` com assunto pré-preenchido + e-mail visível.
- SEO/meta: `canonical`, `og:url`, `og:locale`, favicon SVG, `robots.txt`, `sitemap.xml`.

## Alta prioridade 🔴
1. **`og:image` (preview social)** — exige um asset PNG/JPG **1200×630** (não dá para gerar binário via código). Criar a arte (wordmark + tagline sobre fundo dark/glow), salvar em `public/og-image.png` e adicionar `<meta property="og:image">` + `twitter:card=summary_large_image` no `index.html` e nas páginas legais.
2. **URL real do LinkedIn / agendamento** — hoje o footer usa `https://www.linkedin.com/company/gaussix` (placeholder) e "Agendar conversa" é mailto. Confirmar o LinkedIn real e, se houver, trocar por um link de agendamento (Calendly/Cal.com) — exige ajustar a CSP (`form-action`/`frame-src`) se for embed.
3. **Formulário de contato real** — em vez de só mailto, usar **Netlify Forms** (compatível com a CSP atual `form-action 'self'`, pois posta na mesma origem). Requer um form HTML estático oculto para detecção no build + página/estado de sucesso.

## Média prioridade 🟡
4. **Analytics privacy-friendly** — ex.: Plausible/Umami. Exige ampliar a CSP (`script-src`/`connect-src`) e mencionar na Política de Privacidade.
5. **Prova social / casos reais** — a seção de casos é genérica ("Editável"). Substituir por clientes, números ou depoimentos reais aumenta conversão.
6. **Remover tags "Editável"** em produção (`Solutions.jsx`, `UseCases.jsx`, `content.js`) — são marcadores de QA/rascunho.
7. **Performance do canvas** — `GaussField` roda em Hero e FinalCTA; considerar `IntersectionObserver` para pausar quando fora da viewport e respeitar `prefers-reduced-motion` (hoje desligado por decisão de produto).

## Baixa prioridade 🟢
8. **`.node-version` / `engines`** no `package.json` — fixar Node 20+ para alinhar CI/Netlify (hoje só "18+" no README).
9. **Acessibilidade fina** — foco visível consistente, `aria-current` na nav, verificação de contraste do texto `--muted` sobre o fundo.
10. **i18n (PT/EN)** — se houver público internacional.
11. **JSON-LD** (`Organization`/`WebSite`) para rich results no Google.

## Notas
- **Revisão jurídica:** o conteúdo de `/privacidade` e `/termos` é um rascunho técnico adaptado; recomenda-se revisão por advogado antes de uso comercial pleno.
- **CSP:** mudanças que adicionem terceiros (analytics, embed de agendamento, imagens externas) exigem atualizar `public/_headers`.
