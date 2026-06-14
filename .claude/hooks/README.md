# Hooks — GAUSSIX Landing Page

Hooks são automações que o **Claude Code executa sozinho** em pontos do ciclo de trabalho. Eles não
dependem da boa vontade do agente: garantem que as regras do projeto (preservar o visual, manter o
código limpo, posicionar a marca corretamente) valham em qualquer sessão e para qualquer pessoa.

O wiring (quando cada hook roda) está em [`../settings.json`](../settings.json). Os scripts são em
**Node puro** (`.mjs`) — funcionam em Windows, macOS e Linux, sem depender de PowerShell/bash. Pré-
requisito: ter o Node instalado (já é requisito do projeto). Os hooks rodam com o diretório de
trabalho na raiz do projeto.

## Hooks ativos

| Arquivo | Evento | O que faz |
|---|---|---|
| `protect-sensitive-files.mjs` | `PreToolUse` (Edit/Write/MultiEdit) | Ao tentar editar um arquivo sensível (`src/lib/GaussField.js`, `src/hooks/useGaussField.js`, `src/hooks/useReveal.js`, `src/index.css`, `index.html`), **pede confirmação** citando `CLAUDE.md` §9. Protege a identidade visual de edições acidentais. |
| `lint-changed.mjs` | `PostToolUse` (Edit/Write/MultiEdit) | Roda ESLint no arquivo `.js`/`.jsx` recém-editado e devolve os erros ao agente para correção imediata. |
| `validate-on-stop.mjs` | `Stop` | Ao encerrar a tarefa, roda `npm run lint` + `npm run build` como porta final. Pula automaticamente se o build em `dist/` já está mais novo que o código-fonte (nada a validar). |
| `brand-reminder.mjs` | `UserPromptSubmit` | Injeta um lembrete curto das regras de marca (GAUSSIX ampliada, FlowIA como SaaS proprietário, preservar visual) no início de cada pedido. |

## Como desativar / ajustar

- **Desativar um hook:** remova o bloco correspondente em [`../settings.json`](../settings.json).
- **Desativar todos:** remova a chave `"hooks"` de `settings.json` (ou o arquivo inteiro).
- **Mudar arquivos protegidos:** edite a lista `SENSITIVE` em `protect-sensitive-files.mjs`.
- **Guarda menos rígido:** troque `"permissionDecision": "ask"` por um aviso simples no mesmo script.

## Observações

- Os hooks só passam a valer em uma **nova sessão** do Claude Code. Na primeira carga, o app pode pedir
  para você **revisar e confiar** nos hooks — isso é esperado.
- Os hooks **não** afetam `npm run dev`, `npm run build` nem o runtime da landing page em produção;
  agem apenas durante o desenvolvimento assistido por IA.
- Testar um hook manualmente (a partir da raiz do projeto):
  ```bash
  echo '{"tool_input":{"file_path":"src/lib/GaussField.js"}}' | node .claude/hooks/protect-sensitive-files.mjs
  ```
