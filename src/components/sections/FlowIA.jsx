import { flowiaFeatures, mailto } from '../../data/content';

export default function FlowIA() {
  return (
    <section className="section" id="flowia" aria-labelledby="flowia-title">
      <div className="wrap">
        <div className="product reveal">
          <p className="eyebrow">Produto Gaussix</p>
          <h2 id="flowia-title" className="t-hero product-name">FlowIA.</h2>
          <p className="sub">
            Atendimento, agendamento e suporte no WhatsApp, com IA conversacional e painéis para acompanhar
            tudo. Desenvolvido e operado pela Gaussix.
          </p>
          <ul className="features">
            {flowiaFeatures.map((f) => (
              <li key={f.title}>
                <b>{f.title}</b>
                <span>{f.desc}</span>
              </li>
            ))}
          </ul>
          <a className="pill" href={mailto('Conhecer o FlowIA')}>Conhecer o FlowIA</a>
        </div>
      </div>
    </section>
  );
}
