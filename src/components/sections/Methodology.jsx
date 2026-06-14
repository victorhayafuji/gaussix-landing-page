import { useEffect, useRef } from 'react';
import { steps } from '../../data/content';

export default function Methodology() {
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;

    let drawn = false;
    const drawCheck = () => {
      if (drawn) return;
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const r = path.getBoundingClientRect();
      if (r.top < vh * 0.78) {
        drawn = true;
        path.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(.16,1,.3,1)';
        path.style.strokeDashoffset = '0';
        window.removeEventListener('scroll', drawCheck);
      }
    };

    window.addEventListener('scroll', drawCheck, { passive: true });
    drawCheck();

    return () => window.removeEventListener('scroll', drawCheck);
  }, []);

  return (
    <section className="section-pad" id="metodo">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">03 — Método</span>
          <h2 className="h-lg">Um método estruturado para <span className="grad-text">escala</span>.</h2>
          <p className="lead">Quatro etapas. Do diagnóstico e mapeamento inicial à validação e otimização contínua.</p>
        </div>

        <div className="method-stage reveal" data-d="1">
          <svg className="method-curve" viewBox="0 0 1200 160" fill="none" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="mg" x1="0" y1="0" x2="1200" y2="0">
                <stop stopColor="#8B2CF6" /><stop offset=".5" stopColor="#B23FAE" /><stop offset="1" stopColor="#F86606" />
              </linearGradient>
            </defs>
            <line x1="0" y1="150" x2="1200" y2="150" stroke="rgba(255,255,255,.10)" />
            <path
              ref={pathRef}
              id="method-path"
              d="M0 150 C260 150 320 26 600 22 C880 26 940 150 1200 150"
              stroke="url(#mg)" strokeWidth="2.6" strokeLinecap="round"
            />
            <g stroke="rgba(255,255,255,.16)" strokeDasharray="3 6">
              <line x1="150" y1="150" x2="150" y2="96" /><line x1="450" y1="150" x2="450" y2="44" />
              <line x1="750" y1="150" x2="750" y2="44" /><line x1="1050" y1="150" x2="1050" y2="96" />
            </g>
            <circle cx="150" cy="96" r="5" fill="#8B2CF6" /><circle cx="450" cy="44" r="5" fill="#B23FAE" />
            <circle cx="600" cy="22" r="7" fill="#fff" />
            <circle cx="750" cy="44" r="5" fill="#D8543C" /><circle cx="1050" cy="96" r="5" fill="#F86606" />
          </svg>

          <div className="steps">
            {steps.map((step, i) => (
              <div className="step reveal" data-d={String(i + 1)} key={step.num}>
                <div className="sn">
                  <span className="dotn" />ETAPA {step.num}
                </div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
