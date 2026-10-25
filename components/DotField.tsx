"use client";
import { useEffect, useRef } from "react";

// Monochrome dot field: a slow wave plus "merge" pulses that ripple outward.
export default function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GAP = 22;
    let w = 0, h = 0, raf = 0, visible = true;
    let pulses: { x: number; y: number; t: number }[] = [];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(time: number) {
      const t = time / 1000;
      const fg = getComputedStyle(document.documentElement).getPropertyValue("--fg").trim() || "#fff";
      if (!w || !h) resize();
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = fg;
      if (!reduce && Math.random() < 0.025) {
        pulses.push({ x: Math.random() * w, y: Math.random() * h, t });
      }
      pulses = pulses.filter((p) => t - p.t < 3);
      const cx = w / 2, cy = h / 2;
      for (let x = GAP / 2; x < w; x += GAP) {
        for (let y = GAP / 2; y < h; y += GAP) {
          const d = Math.hypot(x - cx, y - cy);
          let a = 0.22 + 0.4 * (0.5 + 0.5 * Math.sin(d / 40 - t * 1.2));
          for (const p of pulses) {
            const r = (t - p.t) * 140;
            const dd = Math.abs(Math.hypot(x - p.x, y - p.y) - r);
            if (dd < 18) a += (1 - dd / 18) * (1 - (t - p.t) / 3) * 0.8;
          }
          // fade toward edges
          const edge = Math.min(x, y, w - x, h - y) / 60;
          a *= Math.min(1, edge);
          ctx.globalAlpha = Math.min(1, a);
          const s = 2 + a * 2;
          ctx.fillRect(x - s / 2, y - s / 2, s, s);
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
