# Segurança — Auditoria e endurecimento da landing GAUSSIX

> Registro da auditoria de segurança feita antes do deploy e o modelo de ameaças do site. Inclui o que
> foi verificado, o que se aplica (ou não) a um site estático e o que manter no dia a dia.

---

## 1. Natureza do site (define o que é ou não ameaça)

A landing é uma **SPA estática** (React + Vite). Depois do build é só HTML/CSS/JS servido como arquivo:

- **Sem backend, sem servidor de aplicação, sem banco de dados.**
- **Sem formulários que enviam dados, sem `fetch`/API, sem autenticação/sessão.**
- Único recurso de terceiros: **Google Fonts** (`fonts.googleapis.com` / `fonts.gstatic.com`).

Isso elimina, **por construção**, classes inteiras de ataque. O risco real fica em duas camadas que não
estão no código: a **entrega HTTP** (headers) e o **domínio/registrar** (GoDaddy).

---

## 2. Modelo de ameaças (cada ataque citado, endereçado)

### SQL Injection — **N/A**
Não há banco de dados nem nenhuma query no projeto. Não existe entrada de usuário que chegue a um SGBD.
Não é uma omissão: **não há superfície** para injeção SQL num site estático. (Se um dia for adicionado um
backend/formulário, este item volta a valer — usar sempre *prepared statements*/ORM parametrizado.)

### XSS (Cross-Site Scripting) — **superfície mínima + defesa em profundidade**
Auditoria do código: **sem** `dangerouslySetInnerHTML`, `eval`, `new Function`, `innerHTML`,
`document.write`. Todo o conteúdo é estático (vem de `src/data/content.js` e JSX), renderizado pelo React
com *escaping* automático. Mesmo assim, a **CSP** (ver §3) entra como camada extra: bloqueia scripts
inline e de origens não autorizadas.

### Clickjacking / "hijack" de interface — **mitigado**
Impedir que o site seja embutido num `<iframe>` malicioso (overlay invisível que rouba cliques):
- `X-Frame-Options: DENY`
- CSP `frame-ancestors 'none'`

Defesa dupla, garantindo cobertura em navegadores antigos e modernos.

### DDoS — **responsabilidade da camada de CDN/host**
Não se mitiga DDoS no código de um site estático; mitiga-se em quem serve os bytes.
- **Rota A (Cloudflare Pages / Netlify):** proteção anti-DDoS e CDN global **inclusas por padrão** —
  a melhor opção também por este motivo.
- **Rota B (cPanel GoDaddy):** servidor único, proteção limitada. **Recomendado** colocar o **Cloudflare
  (plano grátis) como proxy** na frente do domínio (nuvem laranja), ganhando cache, CDN e mitigação de
  DDoS sem trocar a hospedagem.

### Hijack de domínio / DNS — **vetor real: endurecer na GoDaddy**
Sequestro de domínio ou alteração de DNS é o ataque mais relevante para qualquer site (o código fica
intacto, mas o tráfego é desviado). Checklist na conta GoDaddy:
- [ ] **2FA (autenticação de dois fatores)** ativa na conta GoDaddy — preferir app autenticador, não SMS.
- [ ] **Domain Lock / registrar lock** ligado (bloqueia transferência não autorizada).
- [ ] **DNSSEC** habilitado (assina as respostas de DNS contra falsificação).
- [ ] E-mail de recuperação da conta seguro e também com 2FA.
- [ ] Revisar periodicamente os registros DNS (sem entradas estranhas).

### MITM / downgrade de conexão — **HTTPS + HSTS**
- HTTPS obrigatório (redirect HTTP→HTTPS).
- `Strict-Transport-Security` (HSTS) força o browser a só falar HTTPS com o domínio.

### Supply chain (dependências) — **monitorar**
`npm audit`: **0 vulnerabilidades** no momento da auditoria. Manter a prática (ver §4).

---

## 3. Headers de segurança (já configurados no repositório)

Os headers são aplicados conforme a rota de deploy (ver [`DEPLOY.md`](DEPLOY.md)):

- **Rota A** — arquivo [`public/_headers`](../public/_headers) (lido por Cloudflare Pages / Netlify; o
  Vite o copia para `dist/_headers` no build).
- **Rota B** — bloco `<IfModule mod_headers.c>` no `.htaccess` (seção B.4 de `DEPLOY.md`).

Headers aplicados nas duas:

| Header | Função |
|---|---|
| `Content-Security-Policy` | Restringe origens de script/estilo/fonte/imagem; bloqueia inline e `<iframe>` hostil. |
| `X-Frame-Options: DENY` | Anti-clickjacking (defesa dupla com `frame-ancestors`). |
| `X-Content-Type-Options: nosniff` | Impede o browser de "adivinhar" tipos MIME. |
| `Referrer-Policy` | Limita o vazamento de URL de origem para terceiros. |
| `Permissions-Policy` | Desliga APIs sensíveis (câmera, microfone, geolocalização). |
| `Strict-Transport-Security` | Força HTTPS (HSTS). |

**CSP — nota:** está calibrada para a única dependência externa (Google Fonts). Se no futuro for
adicionado outro recurso de terceiros (script de analytics, pixel, vídeo embutido, fonte de outro CDN),
a CSP precisa liberar esse domínio explicitamente, senão o recurso é bloqueado. Validar a CSP em
<https://csp-evaluator.withgoogle.com>.

---

## 4. Práticas contínuas

- **`npm audit`** antes de cada deploy; corrigir vulnerabilidades de dependência (`npm audit fix`).
- (Opcional) Ativar **Dependabot / security alerts** no GitHub para avisos automáticos.
- Após cada deploy, validar os headers em <https://securityheaders.com> (meta: nota **A**) e o HTTPS em
  <https://www.ssllabs.com/ssltest/>.
- Manter **2FA + Domain Lock + DNSSEC** na GoDaddy (checklist §2).
- Nunca commitar segredos. `.env*` já está no [`.gitignore`](../.gitignore); não há credenciais no
  código (o site é estático e não precisa de nenhuma).

---

## 5. Hardening adicional (opcional, sob aprovação)

- **Self-host das Google Fonts:** baixar os arquivos das fontes e servi-los do próprio domínio elimina a
  última dependência de terceiros, permite uma CSP sem `fonts.googleapis.com`/`gstatic.com` e melhora
  privacidade. Exige alterar [`index.html`](../index.html) (arquivo sensível — CLAUDE.md §9), por isso
  fica como opção a executar só com aval explícito.

---

## 6. Resumo da auditoria

| Item | Resultado |
|---|---|
| SQL Injection | N/A (sem backend/banco) |
| XSS (sinks no código) | Nenhum encontrado |
| Dependências (`npm audit`) | 0 vulnerabilidades |
| Segredos versionados | Nenhum (`.env*` ignorado) |
| Links `target="_blank"` inseguros | Nenhum |
| Headers de segurança | **Configurados** (`_headers` + `.htaccess`) |
| Clickjacking | Mitigado (`X-Frame-Options` + CSP) |
| DDoS | Camada de CDN/host (Rota A já protege; Rota B → Cloudflare na frente) |
| Hijack de domínio/DNS | Checklist GoDaddy (2FA, Domain Lock, DNSSEC) |
