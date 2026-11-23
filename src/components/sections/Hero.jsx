import { useRef, useCallback } from 'react';
import useGaussField from '../../hooks/useGaussField';

// Versão "Sutil" (escolhida em 2026-11-23): curva + barras finas e apagadas, sem grade.
// Reduced-motion: sem partículas (o movimento contínuo); a curva só responde ao mouse/toque.
const reducedMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const FIELD_OPTS = {
  bars: 56, particles: reducedMotion ? 0 : 4, extras: 2, grid: false,
  peak: 0.8, sigma: 0.15, baseline: 0.97,
};

export default function Hero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const { setMouse } = useGaussField(canvasRef, FIELD_OPTS);

  const track = useCallback((clientX, clientY) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse(
      Math.min(1, Math.max(0, (clientX - r.left) / r.width)),
      Math.min(1, Math.max(0, (clientY - r.top) / r.height))
    );
  }, [setMouse]);

  const handleMouseMove = useCallback((e) => track(e.clientX, e.clientY), [track]);
  const handleTouchMove = useCallback((e) => {
    if (e.touches[0]) track(e.touches[0].clientX, e.touches[0].clientY);
  }, [track]);
  const handleMouseLeave = useCallback(() => setMouse(0.5, 0.5), [setMouse]);

  return (
    <section
      className="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
    >
      <div className="wrap hero-copy">
        <p className="eyebrow hero-in">Dados · IA · Produtos digitais</p>
        <h1 className="t-hero hero-in">Menos ruído.<br /> Mais direção.</h1>
        <p className="sub hero-in">
          Dashboards, automações com IA, landing pages e sistemas sob medida. Para empresas que querem
          vender, operar e decidir melhor.
        </p>
        <div className="ctas hero-in">
          <a className="pill" href="#contato">Falar sobre meu projeto</a>
          <a className="more" href="#solucoes">Ver o que fazemos</a>
        </div>
      </div>

      {/* Contida na largura do texto; as pontas se dissolvem (mask no CSS). */}
      <div className="wrap" aria-hidden="true">
        <div className="hero-curve">
          <canvas ref={canvasRef} />
        </div>
        <div className="hero-axis">
          <span>Ruído</span><b>Clareza</b><span>Direção</span>
        </div>
      </div>
    </section>
  );
}
