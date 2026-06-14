#!/usr/bin/env node
// UserPromptSubmit: injeta um lembrete curto das regras de marca no contexto do agente.
const reminder = [
  '[GAUSSIX] Lembretes do projeto:',
  '• GAUSSIX = empresa de tecnologia aplicada (Dados, IA, automação, landing pages, sistemas, SaaS) — não só "AI Data Analysis".',
  '• FlowIA = produto SaaS proprietário da GAUSSIX (prova de capacidade, não marca separada).',
  '• Preserve identidade visual/paleta/canvas/animações. Conteúdo em src/data/content.js.',
  '• CTAs só da lista permitida. Detalhes: CLAUDE.md, docs/BUSINESS_RULES.md, docs/CONTENT_GUIDE.md.',
].join('\n');

process.stdout.write(reminder);
process.exit(0);
