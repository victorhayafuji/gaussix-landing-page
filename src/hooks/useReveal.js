import { useEffect } from 'react';

/**
 * Manages the reveal-on-scroll system.
 * - Arms the `html.reveal-armed` class (respecting prefers-reduced-motion)
 * - Uses IntersectionObserver for staggered reveal
 * - Scroll/resize sweep as failsafe
 */
export default function useReveal() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      document.querySelectorAll('.reveal').forEach((el) => el.classList.add('in'));
      return;
    }

    // Arm the reveal system
    document.documentElement.classList.add('reveal-armed');

    const reveal = (el) => el.classList.add('in');

    // Live query — always gets current set of unrevealed elements
    const sweep = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        if (el.getBoundingClientRect().top < vh * 0.94) reveal(el);
      });
    };

    let io = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver((entries, obs) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal(e.target);
            obs.unobserve(e.target);
          }
        }
      }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });

      document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

      window.addEventListener('scroll', sweep, { passive: true });
      window.addEventListener('resize', sweep, { passive: true });

      // Multi-pass sweep for elements already in viewport on load
      requestAnimationFrame(sweep);
      const t1 = setTimeout(sweep, 100);
      const t2 = setTimeout(sweep, 400);
      const t3 = setTimeout(sweep, 800);

      return () => {
        if (io) io.disconnect();
        window.removeEventListener('scroll', sweep);
        window.removeEventListener('resize', sweep);
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        // NOTE: intentionally NOT removing reveal-armed or .in classes on cleanup.
        // In StrictMode, the cleanup + re-mount would cause a flash where elements
        // that were already revealed become invisible again. Since this is a
        // single-page app with no route changes, keeping the state is correct.
      };
    } else {
      document.querySelectorAll('.reveal').forEach(reveal);
    }
  }, []);
}
