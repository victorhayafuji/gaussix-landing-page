import Wordmark from '../ui/Wordmark';
import { solutions, CONTACT_EMAIL, mailto } from '../../data/content';
import alieviWordmark from '../../assets/alievi-wordmark.png';

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
              Dados, IA, landing pages e sistemas sob medida para empresas que querem vender, operar e
              decidir melhor.
            </p>
          </div>
          <div className="foot-col">
            <h3>Soluções</h3>
            {solutions.map((sol) => (
              <a key={sol.id} href="/#solucoes">{sol.title}</a>
            ))}
          </div>
          <div className="foot-col">
            <h3>Empresa</h3>
            <a href="/#solucoes">O que fazemos</a>
            <a href="/#metodo">Método</a>
            <a href="/#flowia">FlowIA</a>
            <a href="/#contato">Contato</a>
          </div>
          <div className="foot-col">
            <h3>Contato</h3>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={mailto('Falar sobre meu projeto')}>Falar sobre meu projeto</a>
          </div>
          <div className="foot-col">
            <h3>Legal</h3>
            <a href="/privacidade">Política de Privacidade</a>
            <a href="/termos">Termos de Uso</a>
          </div>
        </div>
        <div className="foot-bottom">
          <p>
            Copyright © {year} gaussix.com – Todos os direitos reservados ·{' '}
            <span className="foot-by">
              by <img src={alieviWordmark} alt="Alievi" className="foot-by-logo" width="61" height="13" />
            </span>
          </p>
          <p>Ruído → Clareza → Direção</p>
        </div>
      </div>
    </footer>
  );
}
