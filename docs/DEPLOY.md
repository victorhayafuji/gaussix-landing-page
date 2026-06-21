# Deploy — Publicar a landing GAUSSIX (domínio GoDaddy)

> Como colocar o site no ar usando o **domínio da GoDaddy**, **sem** usar o criador de site (Website
> Builder) deles. Vale para quem nunca fez deploy: o guia explica os conceitos antes do passo a passo.

---

## 1. Entenda os 2 pedaços (domínio ≠ hospedagem)

Publicar um site envolve duas coisas **separadas**:

| Peça | O que é | Onde fica |
|------|---------|-----------|
| **Domínio** | O endereço: `gaussix.com`. Sozinho, não guarda nenhum arquivo. | Comprado na GoDaddy. |
| **Hospedagem** | O servidor que entrega os arquivos do site para quem acessa. | Pode ser na GoDaddy **ou em qualquer outro lugar**. |

O que liga os dois é o **DNS** — uma "tabela de encaminhamento" que diz: *"quando alguém digitar
`gaussix.com`, mande para tal servidor"*. **Você controla o DNS no painel da GoDaddy**, não importa onde
a hospedagem esteja. É isso que permite manter o domínio na GoDaddy e hospedar os arquivos em outro
serviço.

## 2. Por que o deploy aqui é simples: o site é estático

Este projeto é uma **SPA estática** (React + Vite). Depois do build, ele vira só **arquivos prontos**
(HTML, CSS, JS) — **não há backend, banco de dados ou servidor Node rodando em produção**.

Consequência prática: **qualquer servidor que entregue arquivos serve**. Você não precisa de um plano
caro nem de configuração de servidor.

### Gerar os arquivos (a build é a mesma em qualquer rota)

```bash
npm install      # só na primeira vez
npm run build    # gera a pasta dist/
```

Isso cria a pasta **`dist/`** com algo como:

```
dist/
├── index.html
└── assets/
    ├── index-XXXX.css
    └── index-XXXX.js
```

> **`dist/` é o que você publica.** Sempre o **conteúdo de dentro** de `dist/` (o `index.html` precisa
> ficar na raiz do servidor). Nunca suba a pasta `dist` dentro de outra pasta.

Antes de subir, dá para validar a build localmente:

```bash
npm run preview   # serve o dist/ em http://localhost:4173
```

Se abrir igual ao `npm run dev`, está pronta para publicar.

---

## 3. Rotas de deploy

| | **Netlify — domínio GoDaddy + Netlify (HOST ATUAL)** | **Cloudflare Pages (alternativa)** | **cPanel da GoDaddy (alternativa)** |
|---|---|---|---|
| Onde moram os arquivos | Netlify (grátis) | Cloudflare Pages (grátis) | Servidor cPanel da GoDaddy (pago) |
| Como você sobe | Conecta o GitHub → **deploy automático** a cada `git push` | Conecta o GitHub → **deploy automático** | Sobe `dist/` **manualmente** (File Manager/FTP) |
| HTTPS (cadeado) | Automático e grátis | Automático e grátis | Você ativa o SSL no cPanel |
| Velocidade | CDN global | CDN global | Servidor único |
| Custo de hospedagem | **R$ 0** | **R$ 0** | Plano mensal da GoDaddy |
| O que muda na GoDaddy | Só o DNS (A + CNAME) | Só o DNS | Nada (domínio + host já juntos) |

**Host atual: Netlify.** O site é publicado no Netlify, conectado ao GitHub (deploy automático a cada
`git push`). Os headers de segurança vêm do arquivo [`public/_headers`](../public/_headers), que o Netlify
lê automaticamente. As demais rotas ficam documentadas abaixo como alternativas.

---

## Netlify — Domínio GoDaddy + Netlify (HOST ATUAL)

O Netlify serve o `dist/` via CDN, com HTTPS automático e re-deploy a cada `git push`. Os **headers de
segurança** são aplicados a partir do [`public/_headers`](../public/_headers) (o Vite o copia para
`dist/_headers`, e o Netlify lê esse arquivo na raiz do output).

### N.1 — Código no GitHub
```bash
git push origin main
```

### N.2 — Site no Netlify (conectado ao Git)
1. Em **[Netlify](https://app.netlify.com)** → **Add new site → Import an existing project** → conecte o
   **GitHub** e selecione `victorhayafuji/gaussix-landing-page`.
2. Configurações de build:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18+ (defina a variável `NODE_VERSION=18` em *Site settings → Environment* se preciso).
3. **Deploy.** Em ~1 min o site fica no ar numa URL provisória (ex.: `gaussix.netlify.app`). Abra e teste.

> A partir daqui, **todo `git push` na branch `main` re-publica o site automaticamente**.

### N.3 — Apontar o domínio da GoDaddy para o Netlify
1. No Netlify: **Site settings → Domain management → Add a domain** → adicione `gaussix.com` (o Netlify
   também cria o `www.gaussix.com`). Anote o host `<seu-site>.netlify.app`.
2. Na **GoDaddy**: **My Products → Domínio → DNS → Manage Zones (Gerenciar DNS)** e configure:

   | Tipo | Nome | Valor |
   |------|------|-------|
   | **A** | `@` (raiz) | `75.2.60.5` |
   | **CNAME** | `www` | `<seu-site>.netlify.app` (o host que o Netlify mostrou) |

   - **Remova registros `AAAA`** do domínio (o Netlify usa só IPv4 nesse fluxo).
   - Remova A/CNAME antigos conflitantes em `@`/`www` (ex.: o "Parked"/estacionamento da GoDaddy).

   > **Por que A no apex?** A GoDaddy não suporta ALIAS/ANAME na raiz do domínio; por isso o apex usa o IP
   > do balanceador do Netlify (`75.2.60.5`) e só o `www` usa CNAME.

   > **Atalho (opcional):** dá para usar o **Netlify DNS** trocando os nameservers do domínio na GoDaddy
   > para os do Netlify — ele gerencia os registros e o apex sozinho. Faça isso só se não houver outros
   > serviços (e-mail etc.) dependendo do DNS atual da GoDaddy.

### N.4 — Aguardar e confirmar
- Propagação do DNS: de minutos a algumas horas (pode levar até 24–48h no pior caso).
- O Netlify **emite o HTTPS (Let's Encrypt) automaticamente** assim que o DNS resolve. Quando
  `https://gaussix.com` abrir com cadeado, está no ar.

---

## Cloudflare Pages — alternativa

### A.1 — Subir o código para o GitHub
O repositório já existe: `victorhayafuji/gaussix-landing-page`. Garanta que está atualizado:

```bash
git push origin main
```

### A.2 — Conectar o repositório ao host
1. Crie uma conta em **[Cloudflare Pages](https://pages.cloudflare.com)**.
2. **Create a project → Connect to Git** → autorize o GitHub → selecione `gaussix-landing-page`.
3. Configure a build:
   - **Framework preset:** Vite (ou "None")
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** 18 ou superior (variável `NODE_VERSION=18` se precisar)
4. **Deploy.** Em ~1 min o site fica no ar numa URL provisória (ex.: `gaussix.pages.dev`). Abra e teste.

> O Cloudflare Pages também lê o [`public/_headers`](../public/_headers) para os headers de segurança.

### A.3 — Apontar o domínio da GoDaddy para o host
1. No painel do host: **Custom domains → Set up a domain** → digite `gaussix.com`. Ele vai te mostrar os
   registros DNS necessários.
2. No painel da **GoDaddy**: **My Products → Domínio → DNS → Manage Zones (Gerenciar DNS)**.
3. Crie os registros que o host indicou (Cloudflare costuma usar CNAME achatado no apex). Apague registros
   A/CNAME antigos de `@` e `www` que conflitem (ex.: o "Parked"/estacionamento da GoDaddy).

### A.4 — Aguardar e confirmar
- A propagação do DNS leva de **alguns minutos a algumas horas**.
- O HTTPS (cadeado) é emitido **automaticamente** pelo host. Quando `https://gaussix.com` abrir com
  cadeado, está pronto.

---

## cPanel da GoDaddy — alternativa

Use esta rota se já tem (ou quer) um plano **Web Hosting** da GoDaddy.

### B.1 — Contratar o plano certo
No painel da GoDaddy, contrate **Web Hosting (Linux / cPanel)**. **Não** é o *Website Builder* nem o
*Managed WordPress* — é a hospedagem com **cPanel**.

### B.2 — Subir o conteúdo de `dist/` para `public_html`
A pasta `public_html` é a raiz pública do servidor. O `index.html` precisa ficar **direto** nela.

**Opção 1 — File Manager (sem instalar nada):**
1. Compacte o **conteúdo** de `dist/` num `.zip` (selecione `index.html` + `assets/`, **não** a pasta
   `dist` em volta).
2. cPanel → **File Manager** → entre em **`public_html`**.
3. **Upload** do `.zip` → volte ao File Manager → clique direito no `.zip` → **Extract**.
4. Confirme que `public_html/index.html` existe (e não `public_html/dist/index.html`).

**Opção 2 — FTP (FileZilla):**
1. No cPanel, crie/pegue as credenciais de **FTP Accounts**.
2. No FileZilla, conecte com host/usuário/senha FTP.
3. Envie **todo o conteúdo de `dist/`** para `public_html`.

### B.3 — Ativar HTTPS
No cPanel → **SSL/TLS Status** (AutoSSL) → garanta o certificado grátis emitido para o domínio. Depois,
force HTTPS (ver `.htaccess` abaixo).

### B.4 — `.htaccess` (opcional, recomendado)
Crie um arquivo `.htaccess` em `public_html` para forçar HTTPS e dar cache aos assets:

```apache
# Forçar HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Headers de segurança (equivalente ao public/_headers usado no Netlify — ver docs/SECURITY.md)
<IfModule mod_headers.c>
  Header always set Content-Security-Policy "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests"
  Header always set X-Frame-Options "DENY"
  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "geolocation=(), microphone=(), camera=(), interest-cohort=()"
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
</IfModule>

# Cache dos assets com hash no nome (seguros para cache longo)
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 month"
</IfModule>
```

> **Não precisa de rewrite de SPA.** A navegação do site usa **âncoras de hash** (`#solucoes`, `#metodo`,
> `#casos`…), que não geram rotas de servidor — então não há o problema clássico de "404 ao dar refresh
> numa rota interna". Um único `index.html` basta.

> **Headers de segurança:** no Netlify (e no Cloudflare Pages) eles vêm do arquivo
> [`public/_headers`](../public/_headers); no cPanel, do bloco `mod_headers` acima. O racional de cada
> header e o modelo de ameaças estão em [`SECURITY.md`](SECURITY.md).

### B.5 — Atualizações futuras
A cada mudança no código: `npm run build` → re-suba o conteúdo de `dist/` para `public_html`
(substituindo os arquivos). É **manual** a cada release (diferente do Netlify, que é automático).

---

## 4. Checklist pós-deploy

- [ ] `https://gaussix.com` abre o site (e `www` também).
- [ ] Cadeado de **HTTPS** ativo, sem aviso de "não seguro".
- [ ] As **fontes do Google** (Michroma / Space Grotesk / JetBrains Mono) carregam — títulos e telemetria
      com o visual certo.
- [ ] **Canvas e animações** rodam (curva gaussiana no Hero, reveal ao rolar).
- [ ] **Responsivo** no mobile (menu hambúrguer, seções ajustadas).
- [ ] Título da aba e prévia ao compartilhar (meta **OG**) corretos.

---

## 5. Observações de build

- O site é publicado na **raiz do domínio** (`gaussix.com`), então a `base` do Vite continua `'/'`
  (padrão em [`vite.config.js`](../vite.config.js)) — **nada a alterar**.
- Se um dia o site for para uma **subpasta** (ex.: `gaussix.com/site`), aí sim seria preciso definir
  `base: '/site/'` no `vite.config.js` e refazer o build, para os assets carregarem do caminho certo.
