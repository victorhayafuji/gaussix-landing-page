import { steps } from '../../data/content';

export default function Methodology() {
  return (
    <section className="section" id="metodo" aria-labelledby="metodo-title">
      <div className="wrap">
        <header className="head reveal">
          <p className="eyebrow">Método</p>
          <h2 id="metodo-title" className="t-display">Como trabalhamos.</h2>
          <p className="lead">Quatro etapas, cada uma com uma entrega clara.</p>
        </header>

        {/* O fio superior desenha da etapa 1 à 4 quando a lista entra na tela. */}
        <ol className="steps reveal">
          {steps.map((step) => (
            <li className="step" key={step.num}>
              <span className="step-num" aria-hidden="true">{step.num}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-text">{step.desc}</p>
              <p className="step-out">
                <span>Entrega</span>
                {step.deliverable}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
