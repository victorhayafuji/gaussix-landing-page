export default function Credibility() {
  return (
    <section className="section-pad" id="estatistica">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">01 — Posicionamento</span>
          <h2 className="h-lg">Da tecnologia <span className="grad-text">ao resultado</span>.</h2>
          <p className="lead">
            Assim como a distribuição gaussiana organiza variações em padrões claros,
            a Gaussix conecta engenharia de dados, IA aplicada e design técnico para transformar
            operação complexa em crescimento real de negócio.
          </p>
        </div>

        <div className="grid-3" style={{ marginTop: '56px' }}>
          {/* Card 01 — Dados organizados */}
          <article className="card reveal" data-d="1">
            <span className="idx">/01</span>
            <div className="viz">
              <svg className="viz-bars" viewBox="0 0 140 80" aria-hidden="true">
                <defs>
                  <linearGradient id="c1" x1="0" y1="0" x2="140" y2="0">
                    <stop stopColor="#8B2CF6" /><stop offset="1" stopColor="#B23FAE" />
                  </linearGradient>
                </defs>
                <g fill="url(#c1)">
                  <rect x="6"  y="62" width="7" height="14" rx="2" />
                  <rect x="20" y="54" width="7" height="22" rx="2" />
                  <rect x="34" y="42" width="7" height="34" rx="2" />
                  <rect x="48" y="26" width="7" height="50" rx="2" />
                  <rect x="62" y="14" width="7" height="62" rx="2" />
                  <rect x="76" y="14" width="7" height="62" rx="2" />
                  <rect x="90" y="26" width="7" height="50" rx="2" />
                  <rect x="104" y="42" width="7" height="34" rx="2" />
                  <rect x="118" y="54" width="7" height="22" rx="2" />
                  <rect x="132" y="62" width="6" height="14" rx="2" />
                </g>
              </svg>
            </div>
            <h3>Engenharia &amp; BI</h3>
            <p>Dashboards executivos e fluxos de dados limpos que trazem clareza e controle absoluto à sua operação.</p>
          </article>

          {/* Card 02 — Insights acionáveis */}
          <article className="card reveal" data-d="2">
            <span className="idx">/02</span>
            <div className="viz">
              <svg className="viz-curve" viewBox="0 0 140 80" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="c2" x1="0" y1="0" x2="140" y2="0">
                    <stop stopColor="#8B2CF6" /><stop offset="1" stopColor="#F86606" />
                  </linearGradient>
                </defs>
                <path className="draw" d="M4 70 C34 70 44 18 70 14 C96 18 106 70 136 70" stroke="url(#c2)" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M4 70 C34 70 48 30 70 26 C92 30 106 70 136 70" stroke="url(#c2)" strokeWidth="1.2" opacity=".4" />
                <circle className="viz-dot" cx="70" cy="14" r="4" fill="#fff" />
              </svg>
            </div>
            <h3>IA &amp; Automações</h3>
            <p>Agentes inteligentes de atendimento conversacional e processos automatizados integrados aos seus canais.</p>
          </article>

          {/* Card 03 — Decisões com precisão */}
          <article className="card reveal" data-d="3">
            <span className="idx">/03</span>
            <div className="viz">
              <svg className="viz-curve" viewBox="0 0 140 80" fill="none" aria-hidden="true">
                <defs>
                  <linearGradient id="c3" x1="0" y1="0" x2="140" y2="0">
                    <stop stopColor="#B23FAE" /><stop offset="1" stopColor="#F86606" />
                  </linearGradient>
                </defs>
                <line x1="4" y1="70" x2="136" y2="70" stroke="rgba(255,255,255,.14)" />
                <path className="draw" d="M4 70 C40 70 50 20 86 20" stroke="url(#c3)" strokeWidth="2.4" strokeLinecap="round" />
                <path d="M86 20 L122 20 M110 10 L122 20 L110 30" stroke="#F86606" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                <circle className="viz-dot" cx="86" cy="20" r="4" fill="#F86606" />
              </svg>
            </div>
            <h3>Sistemas &amp; SaaS</h3>
            <p>Desenvolvimento sob medida de landing pages de alta conversão, portais web e plataformas SaaS.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
