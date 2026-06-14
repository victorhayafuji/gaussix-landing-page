// Force HMR update
export default function BrandConcept() {
  return (
    <section className="section-pad" id="conceito">
      <div className="wrap">
        <div className="concept">
          <div className="reveal" data-rv="left">
            <span className="eyebrow">04 — Produto em destaque</span>
            <h2 className="h-lg" style={{ marginTop: '22px' }}>
              Do conceito <span className="grad-text">à realidade digital</span>.
            </h2>
            <p className="lead" style={{ marginTop: '22px' }}>
              A melhor prova da nossa capacidade de engenharia é o desenvolvimento de produtos próprios.
              Unimos design técnico, IA e infraestrutura robusta para colocar soluções completas e escaláveis no mercado.
            </p>
            <div className="legend">
              <div className="leg">
                <span className="sw x" />
                <div>
                  <b>FlowIA — SaaS em Destaque</b>
                  <span>Plataforma desenvolvida pela Gaussix para automatizar suporte, atendimento e agendamento. Combina WhatsApp, IA conversacional e dashboards analíticos para otimizar operações.</span>
                </div>
              </div>
              <div className="leg">
                <span className="sw p" />
                <div>
                  <b className="purple">Roxo — IA Conversacional &amp; Agentes</b>
                  <span>Modelos de linguagem calibrados e integrados à base de conhecimento específica da sua empresa, rodando em tempo real.</span>
                </div>
              </div>
              <div className="leg">
                <span className="sw o" />
                <div>
                  <b className="orange">Laranja — Interface &amp; Gestão</b>
                  <span>Painéis executivos modernos que dão ao gestor controle absoluto sobre os fluxos, métricas e conversões do sistema.</span>
                </div>
              </div>
            </div>
          </div>
          <div className="xstage reveal" data-rv="scale" data-d="2">
            <div className="xglyph"><span className="xp">X</span></div>
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} viewBox="0 0 400 400" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="xg" x1="0" y1="0" x2="400" y2="400">
                  <stop stopColor="#8B2CF6" /><stop offset="1" stopColor="#F86606" />
                </linearGradient>
              </defs>
              <path d="M40 360 C160 360 180 90 360 60" stroke="url(#xg)" strokeWidth="1.4" opacity=".5" />
              <circle cx="40" cy="360" r="4" fill="#8B2CF6" /><circle cx="360" cy="60" r="4" fill="#F86606" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
