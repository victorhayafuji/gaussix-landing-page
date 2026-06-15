import { useEffect } from 'react';

/**
 * Manages the reveal-on-scroll system.
 * - Arms the `html.reveal-armed` class (respecting prefers-reduced-motion)
 * - Uses IntersectionObserver for staggered reveal
 * - Scroll/resize sweep as failsafe
 */
export default function useReveal() {
  useEffect(() => {
    // NOTE: animations run regardless of prefers-reduced-motion, by product
    // decision — the CSS reduced-motion override was removed to match.

    // Arm the reveal system
    document.documentElement.classList.add('reveal-armed');
    // Force a reflow so the hidden (opacity:0) state is committed as the
    // transition's "from" value before any element receives `.in`. Without
    // this, the browser may collapse arm + reveal into a single style flush
    // and elements snap to their final state instead of animating.
    void document.documentElement.offsetHeight;

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

      // Coalesce scroll/resize sweeps to at most one layout read per frame —
      // avoids the reflow storm of running querySelectorAll + getBoundingClientRect
      // on every scroll event. Self-removes once everything is revealed.
      let scheduled = false;
      const onScrollResize = () => {
        if (scheduled) return;
        scheduled = true;
        requestAnimationFrame(() => {
          scheduled = false;
          sweep();
          if (!document.querySelector('.reveal:not(.in)')) {
            window.removeEventListener('scroll', onScrollResize);
            window.removeEventListener('resize', onScrollResize);
          }
        });
      };

      window.addEventListener('scroll', onScrollResize, { passive: true });
      window.addEventListener('resize', onScrollResize, { passive: true });

      // Multi-pass sweep for elements already in viewport on load.
      // Double rAF so `.in` lands in a separate style cycle from the arming
      // above — guarantees a painted "from" frame to transition out of.
      requestAnimationFrame(() => requestAnimationFrame(sweep));
      const t1 = setTimeout(sweep, 100);
      const t2 = setTimeout(sweep, 400);
      const t3 = setTimeout(sweep, 800);

      return () => {
        if (io) io.disconnect();
        window.removeEventListener('scroll', onScrollResize);
        window.removeEventListener('resize', onScrollResize);
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
