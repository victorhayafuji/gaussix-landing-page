// Fonte única do conteúdo estruturado da home (spec: docs/specs/2026-11-23-redesign-anti-slop.md).
// `title` é o rótulo canônico do serviço (também usado nos links do rodapé);
// `headline` abre o bloco pelo benefício; `cta` (opcional) usa só CTAs permitidos.

export const solutions = [
  {
    id: 'bi',
    title: 'Dashboards & BI',
    headline: 'Veja a operação inteira num só painel.',
    description: 'Vendas, marketing e finanças centralizados em indicadores que a diretoria usa de verdade.',
    cta: 'Criar meu dashboard',
    featured: true,
  },
  {
    id: 'automacao',
    title: 'Automação',
    headline: 'Chega de copiar dado de planilha em planilha.',
    description: 'Rotinas e integrações entre os sistemas que você já usa, rodando sem intervenção manual.',
    cta: 'Automatizar minha operação',
  },
  {
    id: 'agentes',
    title: 'Agentes de IA',
    headline: 'Atendimento no WhatsApp, a qualquer hora.',
    description: 'Agentes que respondem, qualificam e passam para a sua equipe quando o caso pede uma pessoa.',
  },
  {
    id: 'landing-pages',
    title: 'Landing pages',
    headline: 'Páginas feitas para converter.',
    description: 'Rápidas, medidas e ligadas às suas campanhas: um ativo de vendas, não só uma página bonita.',
    cta: 'Solicitar uma landing page',
  },
  {
    id: 'sistemas',
    title: 'Sistemas web',
    headline: 'A ferramenta que sua equipe precisava.',
    description: 'Portais, sistemas internos e painéis de gestão sob medida, no lugar das planilhas.',
  },
];

export const steps = [
  { num: '01', title: 'Diagnóstico', desc: 'Mapeamos processos, ferramentas e dados para achar onde está o ruído.', deliverable: 'Mapa de processos e prioridades' },
  { num: '02', title: 'Arquitetura', desc: 'Desenhamos a solução: dados, automações, IA e interface.', deliverable: 'Desenho da solução e plano de entrega' },
  { num: '03', title: 'Construção', desc: 'Desenvolvemos e validamos cada fluxo com a sua equipe.', deliverable: 'Solução em uso, validada' },
  { num: '04', title: 'Evolução', desc: 'Acompanhamos o uso real e ajustamos o que for preciso.', deliverable: 'Ajustes contínuos com base no uso' },
];

export const flowiaFeatures = [
  { title: 'WhatsApp', desc: 'O canal que o seu cliente já usa.' },
  { title: 'IA conversacional', desc: 'Responde, agenda e encaminha.' },
  { title: 'Painéis analíticos', desc: 'Acompanhe atendimentos e agendamentos.' },
];

// Contato: e-mail único e links mailto com assunto (sem PII em query além do assunto).
export const CONTACT_EMAIL = 'contato@gaussix.com';
export const mailto = (subject, body = '') =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
