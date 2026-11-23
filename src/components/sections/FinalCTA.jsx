import { CONTACT_EMAIL, mailto } from '../../data/content';

const BODY = 'Olá, Gaussix. Quero conversar sobre um projeto:\n\n';

export default function FinalCTA() {
  return (
    <section className="section contact" id="contato" aria-labelledby="contato-title">
      <div className="wrap">
        <div className="contact-inner reveal">
          <h2 id="contato-title" className="t-display">Vamos conversar sobre a sua operação.</h2>
          <p className="lead">
            Conte o que você quer resolver: dados, automação, IA, uma landing page ou um sistema.
            A gente começa pelo diagnóstico.
          </p>
          <div className="ctas">
            <a className="pill" href={mailto('Falar sobre meu projeto', BODY)}>Falar sobre meu projeto</a>
            <a className="more" href={mailto('Solicitar uma landing page', BODY)}>Solicitar uma landing page</a>
          </div>
          <p className="contact-mail">
            ou escreva para <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
