import { solutions } from '../../data/content';

// Bespoke visualization per solution, keyed by gradientId. The artwork is
// intentionally unique per card and stays inline; only the copy is data-driven.
const svgByGradient = {
  s1: (
    <svg className="viz-bars" viewBox="0 0 160 64" aria-hidden="true">
      <defs><linearGradient id="s1" x1="0" y1="0" x2="160" y2="0"><stop stopColor="#8B2CF6" /><stop offset="1" stopColor="#B23FAE" /></linearGradient></defs>
      <g fill="url(#s1)">
        <rect x="6" y="40" width="9" height="20" rx="2" /><rect x="24" y="28" width="9" height="32" rx="2" />
        <rect x="42" y="14" width="9" height="46" rx="2" /><rect x="60" y="22" width="9" height="38" rx="2" />
        <rect x="78" y="34" width="9" height="26" rx="2" /><rect x="96" y="18" width="9" height="42" rx="2" />
        <rect x="114" y="30" width="9" height="30" rx="2" /><rect x="132" y="44" width="9" height="16" rx="2" />
        <rect x="150" y="38" width="8" height="22" rx="2" />
      </g>
    </svg>
  ),
  s2: (
    <svg className="viz-bars" viewBox="0 0 160 64" aria-hidden="true">
      <defs><linearGradient id="s2" x1="0" y1="0" x2="160" y2="0"><stop stopColor="#8B2CF6" /><stop offset="1" stopColor="#F86606" /></linearGradient></defs>
      <g fill="url(#s2)" opacity=".9">
        <rect x="6" y="46" width="9" height="14" rx="2" /><rect x="24" y="38" width="9" height="22" rx="2" />
        <rect x="42" y="30" width="9" height="30" rx="2" /><rect x="60" y="20" width="9" height="40" rx="2" />
        <rect x="78" y="14" width="9" height="46" rx="2" /><rect x="96" y="20" width="9" height="40" rx="2" />
        <rect x="114" y="30" width="9" height="30" rx="2" /><rect x="132" y="38" width="9" height="22" rx="2" />
        <rect x="150" y="46" width="8" height="14" rx="2" />
      </g>
    </svg>
  ),
  s3: (
    <svg className="viz-curve" viewBox="0 0 160 64" fill="none" aria-hidden="true">
      <defs><linearGradient id="s3" x1="0" y1="0" x2="160" y2="0"><stop stopColor="#8B2CF6" /><stop offset="1" stopColor="#F86606" /></linearGradient></defs>
      <path className="draw" d="M4 56 C40 56 52 12 80 10 C108 12 120 56 156 56" stroke="url(#s3)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M4 56 C44 56 56 24 80 22 C104 24 116 56 156 56" stroke="url(#s3)" strokeWidth="1" opacity=".35" />
      <circle className="viz-dot" cx="80" cy="10" r="3.6" fill="#fff" />
    </svg>
  ),
  s4: (
    <svg className="viz-curve" viewBox="0 0 160 64" fill="none" aria-hidden="true">
      <defs><linearGradient id="s4" x1="0" y1="0" x2="160" y2="0"><stop stopColor="#8B2CF6" /><stop offset="1" stopColor="#B23FAE" /></linearGradient></defs>
      <circle cx="14" cy="20" r="5" fill="#8B2CF6" /><circle cx="14" cy="44" r="5" fill="#8B2CF6" opacity=".6" />
      <circle cx="80" cy="32" r="6" fill="#fff" />
      <circle cx="146" cy="20" r="5" fill="#F86606" /><circle cx="146" cy="44" r="5" fill="#F86606" opacity=".6" />
      <path className="draw" d="M19 20 C50 20 54 32 75 32 M19 44 C50 44 54 32 75 32 M85 32 C106 32 110 20 141 20 M85 32 C106 32 110 44 141 44" stroke="url(#s4)" strokeWidth="1.6" />
    </svg>
  ),
  s5: (
    <svg className="viz-curve" viewBox="0 0 160 64" fill="none" aria-hidden="true">
      <defs><linearGradient id="s5" x1="0" y1="0" x2="160" y2="0"><stop stopColor="#B23FAE" /><stop offset="1" stopColor="#F86606" /></linearGradient></defs>
      <path className="draw" d="M4 56 C36 56 48 8 80 8 C112 8 124 56 156 56" stroke="url(#s5)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M4 56 C40 56 52 22 80 20 C108 22 120 56 156 56" stroke="url(#s5)" strokeWidth="1.2" opacity=".5" />
      <path d="M4 56 C44 56 56 34 80 32 C104 34 116 56 156 56" stroke="url(#s5)" strokeWidth="1" opacity=".3" />
      <circle className="viz-dot" cx="80" cy="8" r="3.8" fill="#fff" />
    </svg>
  ),
  s6: (
    <svg className="viz-curve" viewBox="0 0 160 64" fill="none" aria-hidden="true">
      <defs><linearGradient id="s6" x1="0" y1="0" x2="160" y2="0"><stop stopColor="#8B2CF6" /><stop offset="1" stopColor="#F86606" /></linearGradient></defs>
      <line x1="4" y1="56" x2="156" y2="56" stroke="rgba(255,255,255,.14)" />
      <path className="draw" d="M4 56 C44 56 56 14 96 14" stroke="url(#s6)" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M96 14 L150 14 M138 5 L150 14 L138 23" stroke="#F86606" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="viz-dot" cx="96" cy="14" r="3.8" fill="#F86606" />
    </svg>
  ),
};

export default function Solutions() {
  return (
    <section className="section-pad" id="solucoes">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">02 — Soluções</span>
          <h2 className="h-lg">Da infraestrutura de dados <span className="grad-text">à IA aplicada</span>.</h2>
          <p className="lead">
            Um conjunto modular de capacidades — barras discretas para a engenharia de dados,
            curvas contínuas para a inteligência que prevê e decide.
            <span className="tag-editable" style={{ marginLeft: '8px' }}>Editável</span>
          </p>
        </div>

        <div className="sol-grid" style={{ marginTop: '48px' }}>
          {solutions.map((sol) => (
            <article className="sol reveal" data-d={sol.delay} key={sol.gradientId}>
              <span className="sol-arrow">↗</span>
              <div className="sol-top"><span className="sol-tag">{sol.tag}</span></div>
              <div className="viz">{svgByGradient[sol.gradientId]}</div>
              <h3>{sol.title}</h3>
              <p>{sol.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
