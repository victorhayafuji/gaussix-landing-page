import { useRef, useCallback, useEffect, useState } from 'react';
import useGaussField from '../../hooks/useGaussField';

// Compute mobile status synchronously to avoid hydration mismatch
const getIsMobile = () =>
  typeof window !== 'undefined' && window.matchMedia('(max-width: 680px)').matches;

export default function FinalCTA() {
  const canvasRef = useRef(null);
  const [isMobile] = useState(getIsMobile);

  const { setMouse } = useGaussField(canvasRef, {
    bars: 60, particles: 5, peak: 0.66, sigma: 0.14, extras: 3,
  }, !isMobile);

  // Gentle autonomous drift that resolves to centre (noise → direction)
  useEffect(() => {
    if (isMobile) return;
    let phase = 0;
    let rafId;
    const drift = () => {
      phase += 0.01;
      const settle = Math.max(0, 1 - phase / 6);
      const nx = 0.5 + Math.sin(phase * 1.7) * 0.22 * settle;
      const ny = 0.5 + Math.cos(phase * 1.3) * 0.18 * settle;
      setMouse(nx, ny);
      // Once the intro has settled to centre, stop the loop instead of
      // spinning rAF forever (it kept running even off-screen).
      if (settle <= 0) {
        setMouse(0.5, 0.5);
        return;
      }
      rafId = requestAnimationFrame(drift);
    };
    rafId = requestAnimationFrame(drift);
    return () => cancelAnimationFrame(rafId);
  }, [isMobile, setMouse]);

  const handleMouseMove = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const r = canvas.getBoundingClientRect();
    setMouse(
      Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
      Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))
    );
  }, [setMouse]);

  return (
    <section className="section-pad" id="contato">
      <div className="wrap">
        <div className="final reveal" data-rv="scale" onMouseMove={handleMouseMove}>
          <span className="eyebrow center" style={{ justifyContent: 'center' }}>06 — Vamos conversar</span>
          <h2 className="h-lg" style={{ marginTop: '22px' }}>
            Vamos transformar sua operação em um <span className="grad-text">ativo digital inteligente</span>?
          </h2>
          <p className="lead">Mapeamos seus processos e desenvolvemos as automações, sistemas e dados que seu negócio precisa para crescer.</p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#contato">
              Quero construir minha solução <span className="arrow">→</span>
            </a>
            <a className="btn btn-ghost" href="#conceito">Conhecer o FlowIA</a>
            <a className="btn btn-ghost" href="#solucoes">Solicitar uma landing page</a>
          </div>
          {!isMobile && (
            <canvas id="final-canvas" ref={canvasRef} aria-hidden="true" />
          )}
        </div>
      </div>
    </section>
  );
}
