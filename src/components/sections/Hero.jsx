import { useRef, useCallback } from 'react';
import useGaussField from '../../hooks/useGaussField';

export default function Hero() {
  const canvasRef = useRef(null);
  const heroRef = useRef(null);

  const { setMouse } = useGaussField(canvasRef, {
    bars: 52, particles: 6, peak: 0.6, sigma: 0.155, extras: 4,
  });

  const handleMouseMove = useCallback((e) => {
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse(
      Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)),
      Math.min(1, Math.max(0, (e.clientY - r.top) / r.height))
    );
  }, [setMouse]);

  const handleMouseLeave = useCallback(() => {
    setMouse(0.5, 0.5);
  }, [setMouse]);

  const handleTouchMove = useCallback((e) => {
    if (!e.touches[0]) return;
    const r = heroRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouse(
      Math.min(1, Math.max(0, (e.touches[0].clientX - r.left) / r.width)),
      Math.min(1, Math.max(0, (e.touches[0].clientY - r.top) / r.height))
    );
  }, [setMouse]);

  return (
    <section
      className="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
    >
      <canvas id="hero-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="hero-fade" />
      <div className="wrap hero-inner">
        <div className="hero-left">
          <span className="hero-badge">
            <span className="dot" />DADOS · INTELIGÊNCIA ARTIFICIAL · PRODUTOS DIGITAIS
          </span>
          <h1 className="h-xl">
            Dados, IA e produtos digitais para <span className="grad-text">vender, automatizar e decidir melhor</span>.
          </h1>
          <p className="lead">
            A Gaussix cria dashboards, automações inteligentes, landing pages e sistemas digitais sob medida — 
            unindo análise, engenharia e design para transformar operação em crescimento.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#contato">
              Quero construir minha solução <span className="arrow">→</span>
            </a>
            <a className="btn btn-ghost" href="#solucoes">Ver soluções</a>
          </div>
        </div>
      </div>
    </section>
  );
}
