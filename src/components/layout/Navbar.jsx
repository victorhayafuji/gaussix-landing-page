import { useEffect, useRef, useState, useCallback } from 'react';
import Wordmark from '../ui/Wordmark';

export default function Navbar() {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Scroll handler for .scrolled state
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mirror the mobile-menu open state onto the body class the CSS keys off.
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

  const toggleMenu = useCallback(() => setMenuOpen((o) => !o), []);
  const closeMobileMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <header className="nav" ref={navRef}>
        <div className="wrap nav-inner">
          <Wordmark />
          <nav className="nav-links">
            <a className="nav-link" href="#solucoes">Soluções</a>
            <a className="nav-link" href="#metodo">Método</a>
            <a className="nav-link" href="#conceito">Conceito</a>
            <a className="nav-link" href="#casos">Casos de uso</a>
          </nav>
          <div className="nav-cta">
            <a className="btn btn-ghost btn-sm" href="#solucoes">Soluções</a>
            <a className="btn btn-primary btn-sm" href="#contato">
              Construir solução <span className="arrow">→</span>
            </a>
            <button className="burger" aria-label="Menu" aria-expanded={menuOpen} onClick={toggleMenu}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className="mobile-menu">
        <a href="#solucoes" onClick={closeMobileMenu}>Soluções</a>
        <a href="#metodo" onClick={closeMobileMenu}>Método</a>
        <a href="#conceito" onClick={closeMobileMenu}>Conceito</a>
        <a href="#casos" onClick={closeMobileMenu}>Casos de uso</a>
        <a className="btn btn-primary" href="#contato" onClick={closeMobileMenu}>
          Construir solução <span className="arrow">→</span>
        </a>
      </div>
    </>
  );
}
