import BrandBar from '../components/layout/BrandBar';
import BackgroundField from '../components/layout/BackgroundField';
import Footer from '../components/layout/Footer';
import Wordmark from '../components/ui/Wordmark';

/**
 * Shell das páginas legais (Privacidade / Termos).
 * Reusa a identidade GAUSSIX (brandbar, background, footer) com um header
 * enxuto — sem a Navbar interativa nem o sistema de reveal/canvas da home.
 */
export default function LegalLayout({ title, children }) {
  return (
    <>
      <BrandBar />
      <BackgroundField />

      <header className="legal-nav">
        <div className="wrap legal-nav-inner">
          <Wordmark href="/" />
          <a className="legal-back" href="/">← Voltar ao site</a>
        </div>
      </header>

      <main className="legal-page">
        <div className="legal-wrap legal">
          <p className="eyebrow">Documento legal</p>
          <h1>{title}</h1>
          {children}
        </div>
      </main>

      <Footer />
    </>
  );
}
