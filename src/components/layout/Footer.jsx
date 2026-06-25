import Wordmark from '../ui/Wordmark';
import { solutions } from '../../data/content';

const CONTACT_EMAIL = 'contato@gaussix.com';
const LINKEDIN_URL = 'https://www.linkedin.com/company/gaussix';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-col">
            <Wordmark href="/#top" />
            <p className="foot-about">
              Desenvolvemos dados, inteligência artificial, landing pages e produtos digitais sob medida para
              empresas que querem vender, automatizar e decidir melhor.
            </p>
          </div>
          <div className="foot-col">
            <h3>Soluções</h3>
            {solutions.map((sol) => (
              <a key={sol.gradientId} href="/#solucoes">{sol.title}</a>
            ))}
          </div>
          <div className="foot-col">
            <h3>Empresa</h3>
            <a href="/#conceito">Conceito</a>
            <a href="/#metodo">Método</a>
            <a href="/#casos">Casos de uso</a>
            <a href="/#contato">Contato</a>
          </div>
          <div className="foot-col">
            <h3>Contato</h3>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent('Agendar conversa')}`}>Agendar conversa</a>
          </div>
          <div className="foot-col">
            <h3>Legal</h3>
            <a href="/privacidade">Política de Privacidade</a>
            <a href="/termos">Termos de Uso</a>
          </div>
        </div>
        <div className="foot-bottom">
          <p>Copyright © {year} gaussix.com – Todos os direitos reservados</p>
          <p>RUÍDO → CLAREZA → DIREÇÃO</p>
        </div>
      </div>
    </footer>
  );
}
