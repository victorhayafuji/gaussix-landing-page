/* ============================================================
   GAUSSIX — Interactive Gaussian field
   A shader-like canvas: bell curve + discrete bars + continuous
   overlapping curves + particles + grid, reacting to the mouse.
   "moving through data noise until insight appears."
   ============================================================ */

const PURPLE = [139, 44, 246];
const ORANGE = [248, 102, 6];
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const mix = (a, b, t) => [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
const rgba = (c, a) => `rgba(${c[0]|0},${c[1]|0},${c[2]|0},${a})`;
const gauss = (x, mu, sig) => Math.exp(-((x - mu) * (x - mu)) / (2 * sig * sig));

class GaussField {
  constructor(canvas, opts = {}) {
    this.c = canvas;
    this.ctx = canvas.getContext('2d');
    this.opts = Object.assign({
      bars: 46, particles: 5, grid: true, baseline: 0.86,
      peak: 0.62, sigma: 0.16, extras: 3, dense: false,
      onTick: null, glowScale: 1
    }, opts);
    this._tk = 0;
    this.mouse = { x: 0.5, y: 0.5 };
    this.m = { x: 0.5, y: 0.5 };
    this.t = 0;
    this.parts = [];
    for (let i = 0; i < this.opts.particles; i++) {
      this.parts.push({ p: Math.random(), s: 0.045 + Math.random() * 0.05 });
    }
    this.resize = this.resize.bind(this);
    this.frame = this.frame.bind(this);
    this.resize();
    window.addEventListener('resize', this.resize);
    this.running = true;
    this.rafId = requestAnimationFrame(this.frame);
  }

  setMouse(nx, ny) { this.mouse.x = nx; this.mouse.y = ny; }

  resize() {
    const r = this.c.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.W = Math.max(1, r.width); this.H = Math.max(1, r.height);
    this.c.width = this.W * this.dpr; this.c.height = this.H * this.dpr;
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  curveY(nx, mu, sig, peak, base) {
    const g = gauss(nx, mu, sig);
    return (base - g * peak) * this.H;
  }

  frame() {
    if (!this.running) return;
    this.t += 0.006;
    this.m.x = lerp(this.m.x, this.mouse.x, 0.06);
    this.m.y = lerp(this.m.y, this.mouse.y, 0.06);
    const ctx = this.ctx, W = this.W, H = this.H;
    ctx.clearRect(0, 0, W, H);

    const mu = clamp(0.5 + (this.m.x - 0.5) * 0.28, 0.30, 0.70);
    const sig = this.opts.sigma * (1 + (this.m.y - 0.5) * 0.45) * (1 + Math.sin(this.t * 0.7) * 0.04);
    const peak = this.opts.peak * (1 - (this.m.y - 0.5) * 0.18);
    const base = this.opts.baseline;
    const glow = clamp(0.5 + (0.5 - Math.abs(this.m.x - 0.5)) * 0.9, 0.4, 1);

    if (this.opts.onTick && (this._tk++ % 3 === 0)) {
      this.opts.onTick({ mu, sig, peak, glow, mx: this.m.x, my: this.m.y, t: this.t });
    }

    // ---- grid ----
    if (this.opts.grid) {
      ctx.save();
      ctx.strokeStyle = 'rgba(255,255,255,0.035)';
      ctx.lineWidth = 1;
      const gs = 64, ox = (this.m.x - 0.5) * 22, oy = (this.m.y - 0.5) * 14;
      for (let x = (ox % gs); x < W; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = (oy % gs); y < H; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      ctx.restore();
    }

    const baseY = base * H;

    // ---- discrete bars ----
    const nb = this.opts.bars;
    for (let i = 0; i < nb; i++) {
      const nx = (i + 0.5) / nb;
      const g = gauss(nx, mu, sig);
      const top = this.curveY(nx, mu, sig, peak, base);
      const col = mix(PURPLE, ORANGE, nx);
      const a = 0.10 + g * 0.5;
      ctx.strokeStyle = rgba(col, a);
      ctx.lineWidth = Math.max(1.4, W / nb * 0.34);
      ctx.beginPath();
      ctx.moveTo(nx * W, baseY);
      ctx.lineTo(nx * W, top + 4);
      ctx.stroke();
      if (g > 0.55) {
        ctx.fillStyle = rgba(col, 0.5 + g * 0.4);
        ctx.beginPath(); ctx.arc(nx * W, top, 1.6, 0, 7); ctx.fill();
      }
    }

    // ---- continuous overlapping curves ----
    const ex = this.opts.extras;
    for (let k = 1; k <= ex; k++) {
      const ks = sig * (1 + k * 0.16);
      const kp = peak * (1 - k * 0.07);
      ctx.beginPath();
      for (let px = 0; px <= W; px += 6) {
        const nx = px / W;
        const y = this.curveY(nx, mu, ks, kp, base);
        px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
      }
      ctx.strokeStyle = rgba(mix(PURPLE, ORANGE, 0.5), 0.06 + (ex - k) * 0.02);
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }

    // ---- main curve with gradient + glow ----
    const grad = ctx.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0, rgba(PURPLE, 0.95));
    grad.addColorStop(0.5, rgba(mix(PURPLE, ORANGE, 0.5), 1));
    grad.addColorStop(1, rgba(ORANGE, 0.95));
    ctx.save();
    ctx.beginPath();
    for (let px = 0; px <= W; px += 3) {
      const nx = px / W;
      const y = this.curveY(nx, mu, sig, peak, base);
      px === 0 ? ctx.moveTo(px, y) : ctx.lineTo(px, y);
    }
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2.4;
    ctx.shadowColor = rgba(mix(PURPLE, ORANGE, this.m.x), 0.9 * glow);
    ctx.shadowBlur = 26 * glow;
    ctx.stroke();
    ctx.restore();

    // ---- baseline + end nodes ----
    ctx.strokeStyle = 'rgba(255,255,255,0.10)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(0, baseY); ctx.lineTo(W, baseY); ctx.stroke();
    this.node(8, baseY, PURPLE);
    this.node(W - 8, baseY, ORANGE);

    // ---- apex node + vertical drop ----
    const apexY = this.curveY(mu, mu, sig, peak, base);
    ctx.strokeStyle = 'rgba(255,255,255,0.14)';
    ctx.setLineDash([3, 5]);
    ctx.beginPath(); ctx.moveTo(mu * W, apexY); ctx.lineTo(mu * W, baseY); ctx.stroke();
    ctx.setLineDash([]);
    const apexCol = mix(PURPLE, ORANGE, mu);
    ctx.shadowColor = rgba(apexCol, glow); ctx.shadowBlur = 18 * glow;
    this.node(mu * W, apexY, apexCol, 5);
    ctx.shadowBlur = 0;

    // ---- particles ----
    for (const pt of this.parts) {
      pt.p += pt.s * 0.004 * (0.6 + glow);
      if (pt.p > 1) pt.p -= 1;
      const nx = pt.p;
      const y = this.curveY(nx, mu, sig, peak, base);
      const col = mix(PURPLE, ORANGE, nx);
      const g = gauss(nx, mu, sig);
      ctx.fillStyle = rgba(col, 0.5 + g * 0.5);
      ctx.shadowColor = rgba(col, 0.9); ctx.shadowBlur = 10;
      ctx.beginPath(); ctx.arc(nx * W, y, 2.2 + g * 1.4, 0, 7); ctx.fill();
      ctx.shadowBlur = 0;
    }

    this.rafId = requestAnimationFrame(this.frame);
  }

  node(x, y, col, r = 4) {
    const ctx = this.ctx;
    ctx.fillStyle = rgba(col, 1);
    ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.arc(x, y, r * 0.4, 0, 7); ctx.fill();
  }

  destroy() {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
    window.removeEventListener('resize', this.resize);
  }

  pause() {
    this.running = false;
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }

  resume() {
    if (!this.running) {
      this.running = true;
      this.rafId = requestAnimationFrame(this.frame);
    }
  }
}

export default GaussField;
