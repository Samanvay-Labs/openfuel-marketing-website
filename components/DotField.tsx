"use client";
import { useEffect, useRef } from "react";

// GitHub-style contribution graph: 7 rows (days) x N columns (weeks).
// A cursor sweeps across the weeks "committing" to cells, which pop in and
// slowly cool down, so the graph keeps filling and evolving.
export default function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ROWS = 7;
    const LEVELS = [0.08, 0.3, 0.52, 0.76, 1]; // opacity per contribution level
    let w = 0, h = 0, raf = 0, visible = true;
    let cols = 0, cell = 0, gap = 0, ox = 0, oy = 0;
    let level: number[] = [];   // 0..4 per cell
    let bump: number[] = [];    // time of last commit (for pop effect)
    let cursor = 0, last = 0;

    function seed() {
      level = Array.from({ length: cols * ROWS }, (_, i) => {
        const c = Math.floor(i / ROWS), r = i % ROWS;
        const weekend = r === 0 || r === 6 ? 0.45 : 1;
        const trend = 0.35 + 0.65 * (c / Math.max(1, cols - 1)); // busier recently
        const p = Math.random() * weekend * trend;
        return p > 0.75 ? 4 : p > 0.55 ? 3 : p > 0.38 ? 2 : p > 0.22 ? 1 : 0;
      });
      bump = new Array(cols * ROWS).fill(-10);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // fit 7 rows to the height, as many weeks as fit the width
      cell = Math.max(8, Math.min(26, (h * 0.8) / (ROWS * 1.25)));
      gap = cell * 0.25;
      const prev = cols;
      cols = Math.max(4, Math.floor((w + gap) / (cell + gap)));
      ox = (w - (cols * (cell + gap) - gap)) / 2;
      oy = (h - (ROWS * (cell + gap) - gap)) / 2;
      if (cols !== prev) seed();
    }

    function roundRect(x: number, y: number, s: number, r: number) {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + s, y, x + s, y + s, r);
      ctx.arcTo(x + s, y + s, x, y + s, r);
      ctx.arcTo(x, y + s, x, y, r);
      ctx.arcTo(x, y, x + s, y, r);
      ctx.fill();
    }

    function step(t: number) {
      // advance sweeping cursor ~6 weeks/sec, committing to a few days in that week
      if (t - last > 0.16) {
        last = t;
        cursor = (cursor + 1) % cols;
        for (let r = 0; r < ROWS; r++) {
          if (Math.random() < 0.45) {
            const i = cursor * ROWS + r;
            level[i] = Math.min(4, level[i] + 1 + Math.floor(Math.random() * 2));
            bump[i] = t;
          }
        }
      }
      // random activity elsewhere, and gentle cooling so it never saturates
      if (Math.random() < 0.3) {
        const i = Math.floor(Math.random() * level.length);
        level[i] = Math.min(4, level[i] + 1);
        bump[i] = t;
      }
      if (Math.random() < 0.5) {
        const i = Math.floor(Math.random() * level.length);
        if (t - bump[i] > 2 && level[i] > 0) level[i]--;
      }
    }

    function draw(time: number) {
      const t = time / 1000;
      const fg = getComputedStyle(document.documentElement).getPropertyValue("--fg").trim() || "#fff";
      if (!w || !h) resize();
      if (!reduce) step(t);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = fg;
      for (let c = 0; c < cols; c++) {
        const near = !reduce && c === cursor;
        for (let r = 0; r < ROWS; r++) {
          const i = c * ROWS + r;
          const age = t - bump[i];
          const pop = !reduce && age < 0.5 ? Math.sin((age / 0.5) * Math.PI) : 0;
          let a = LEVELS[level[i]] + pop * 0.25 + (near ? 0.12 : 0);
          // fade toward left/right edges
          const x = ox + c * (cell + gap);
          a *= Math.min(1, (Math.min(x, w - x - cell) + 20) / 80);
          const s = cell * (1 + pop * 0.18);
          const off = (s - cell) / 2;
          ctx.globalAlpha = Math.max(0, Math.min(1, a));
          roundRect(x - off, oy + r * (cell + gap) - off, s, cell * 0.22);
        }
      }
      ctx.globalAlpha = 1;
      cancelAnimationFrame(raf);
      if (!reduce && visible) raf = requestAnimationFrame(draw);
    }

    resize();
    draw(performance.now());
    const ro = new ResizeObserver(() => { resize(); draw(performance.now()); });
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible || reduce) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    const mo = new MutationObserver(() => reduce && draw(0)); // redraw on theme toggle
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); mo.disconnect(); };
  }, []);

  return (
    <div className="dotfield" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}
