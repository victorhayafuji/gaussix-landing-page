import { useCases } from '../../data/content';

export default function UseCases() {
  return (
    <section className="section-pad" id="casos">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">05 — Casos de uso</span>
          <h2 className="h-lg">Onde os dados viram <span className="grad-text">vantagem</span>.</h2>
          <p className="lead">Aplicações práticas, orientadas a decisão — sem promessas vazias.</p>
        </div>

        <div className="uc-grid" style={{ marginTop: '40px' }}>
          {useCases.map((uc) => (
            <div className="uc reveal" data-d={uc.delay} key={uc.num}>
              <div className="ucbar" />
              <div className="ucn">{uc.num}</div>
              <div>
                <h3>{uc.title}</h3>
                <p>
                  {uc.desc}
                  {uc.editable && (
                    <> <span className="tag-editable">Editável</span></>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
