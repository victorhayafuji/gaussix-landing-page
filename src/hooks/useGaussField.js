import { useEffect, useRef, useCallback } from 'react';
import GaussField from '../lib/GaussField';

/**
 * Hook to manage a GaussField canvas instance.
 * Handles instantiation, cleanup, and pause-when-hidden.
 *
 * @param {React.RefObject<HTMLCanvasElement>} canvasRef
 * @param {object} opts - GaussField options
 * @param {boolean} enabled - Whether to instantiate the field
 * @returns {{ fieldRef, setMouse }}
 */
export default function useGaussField(canvasRef, opts = {}, enabled = true) {
  const fieldRef = useRef(null);

  const setMouse = useCallback((nx, ny) => {
    if (fieldRef.current) fieldRef.current.setMouse(nx, ny);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !enabled) return;

    const field = new GaussField(canvas, opts);
    fieldRef.current = field;

    // Pause when off-screen to save CPU/battery
    let observer;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((entries) => {
        for (const e of entries) {
          e.isIntersecting ? field.resume() : field.pause();
        }
      }, { threshold: 0 });
      observer.observe(canvas);
    }

    return () => {
      field.destroy();
      fieldRef.current = null;
      if (observer) observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasRef, enabled]);

  return { fieldRef, setMouse };
}
