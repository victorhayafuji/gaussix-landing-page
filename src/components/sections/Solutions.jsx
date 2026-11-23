import { solutions } from '../../data/content';

export default function Solutions() {
  return (
    <section className="section" id="solucoes" aria-labelledby="solucoes-title">
      <div className="wrap">
        <header className="head head-center reveal">
          <p className="eyebrow">O que fazemos</p>
          <h2 id="solucoes-title" className="t-display">Um parceiro.<br /> Toda a operação digital.</h2>
          <p className="lead">
            Do painel que mostra os números ao sistema que roda o processo. Você escolhe por onde começar.
          </p>
        </header>

        <div className="bento">
          {solutions.map((sol, i) => (
            <article
              key={sol.id}
              className={`tile reveal${sol.featured ? ' tile-featured' : ''}`}
              data-d={String((i % 3) + 1)}
            >
              <p className="tile-label">{sol.title}</p>
              <h3 className="t-title">{sol.headline}</h3>
              <p className="tile-text">{sol.description}</p>
              {sol.cta && <a className="more" href="#contato">{sol.cta}</a>}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
