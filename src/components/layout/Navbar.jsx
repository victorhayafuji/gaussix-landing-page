import { useEffect, useRef, useState, useCallback } from 'react';
import Wordmark from '../ui/Wordmark';

const LINKS = [
  { href: '#solucoes', label: 'O que fazemos' },
  { href: '#metodo', label: 'Método' },
  { href: '#flowia', label: 'FlowIA' },
];

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
          <nav className="nav-links" aria-label="Seções">
            {LINKS.map((l) => (
              <a className="nav-link" href={l.href} key={l.href}>{l.label}</a>
            ))}
          </nav>
          <div className="nav-cta">
            <a className="pill pill-sm" href="#contato">Falar sobre meu projeto</a>
            <button className="burger" aria-label="Menu" aria-expanded={menuOpen} onClick={toggleMenu}>
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className="mobile-menu">
        {LINKS.map((l) => (
          <a href={l.href} key={l.href} onClick={closeMobileMenu}>{l.label}</a>
        ))}
        <a className="pill" href="#contato" onClick={closeMobileMenu}>Falar sobre meu projeto</a>
      </div>
    </>
  );
}
