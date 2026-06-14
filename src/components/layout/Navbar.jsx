import { useEffect, useCallback } from 'react';
import Wordmark from '../ui/Wordmark';

export default function Navbar() {
  // Scroll handler for .scrolled state
  useEffect(() => {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Mobile menu
  const handleBurgerClick = useCallback(() => {
    const open = document.body.classList.toggle('menu-open');
    const burger = document.querySelector('.burger');
    if (burger) burger.setAttribute('aria-expanded', String(open));
  }, []);

  const closeMobileMenu = useCallback(() => {
    document.body.classList.remove('menu-open');
  }, []);

  return (
    <>
      <header className="nav">
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
            <button className="burger" aria-label="Menu" aria-expanded="false" onClick={handleBurgerClick}>
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
