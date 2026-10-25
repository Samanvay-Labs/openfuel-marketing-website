"use client";
import { useEffect, useRef } from "react";

// Animated git log: a live commit graph scrolls by, feature branches fork off
// main and merge back. Every merge pays out credits into a running balance.
type Row = {
  lane: number;               // lane of this row's commit node
  edges: [number, number][];  // connections from previous row: [fromLane, toLane]
  msg: string;
  merge?: { pr: number; credits: number };
};

const MSGS = [
  "fix: handle empty config", "feat: add retry backoff", "docs: update README",
  "test: cover edge cases", "refactor: split parser", "perf: cache lookups",
  "fix: race in worker pool", "feat: streaming output", "chore: bump deps",
  "fix: off-by-one in pager", "feat: dark mode tokens", "test: snapshot CLI",
];

export default function DotField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ROW = 52, LANE = 30, SPEED = 0.2; // rows per second
    const SCALE = 0.8; // overall size of the graph
    let w = 0, h = 0, raf = 0, visible = true;

    // ---- graph generation ----
    const rows: Row[] = [{ lane: 0, edges: [], msg: "init" }];
    let alive = new Set<number>([0]);
    const commits: Record<number, number> = {};
    let pr = 470, balance = 1240, msgI = 0;
    const credited = new Set<number>();
    const nextMsg = () => MSGS[msgI++ % MSGS.length];

    function gen() {
      const prev = [...alive];
      const straight = (skip?: number) =>
        prev.filter((l) => l !== skip).map((l) => [l, l] as [number, number]);
      const free = [1, 2].filter((l) => !alive.has(l));
      const ready = prev.filter((l) => l > 0 && commits[l] >= 2);
      const r = Math.random();
      if (ready.length && r < 0.45) {
        const k = ready[Math.floor(Math.random() * ready.length)];
        alive.delete(k);
        const credits = [40, 60, 80, 120, 150, 200][Math.floor(Math.random() * 6)];
        rows.push({ lane: 0, edges: [...straight(k), [k, 0]], msg: `Merge PR #${++pr}`, merge: { pr, credits } });
      } else if (free.length && r < 0.75) {
        const k = free[0];
        alive.add(k);
        commits[k] = 1;
        rows.push({ lane: k, edges: [...straight(), [0, k]], msg: nextMsg() });
      } else {
        const lanes = prev.filter((l) => l > 0);
        const k = lanes.length ? lanes[Math.floor(Math.random() * lanes.length)] : 0;
        if (k) commits[k]++;
        rows.push({ lane: k, edges: straight(), msg: nextMsg() });
      }
    }
    for (let i = 0; i < 14; i++) gen();
    // start "now" with history already filling the view
    const t0 = performance.now() / 1000 - 12 / SPEED;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      // draw in scaled units so everything shrinks uniformly
      w = canvas.clientWidth / SCALE;
      h = canvas.clientHeight / SCALE;
      ctx.setTransform(dpr * SCALE, 0, 0, dpr * SCALE, 0, 0);
    }

    function draw(time: number) {
      const css = getComputedStyle(document.documentElement);
      const fg = css.getPropertyValue("--fg").trim() || "#fff";
      const muted = css.getPropertyValue("--muted").trim() || "#999";
      const bg = css.getPropertyValue("--bg").trim() || "#000";
      const font = getComputedStyle(canvas).fontFamily || "monospace";
      if (!w || !h) resize();

      const now = (reduce ? 12 / SPEED : time / 1000 - t0) * SPEED; // float row index at top
      while (rows.length < now + 3) gen();
      const head = Math.floor(now);
      const top = 70;
      const y = (r: number) => top + (now - r) * ROW;   // newest at top, history scrolls down
      const x = (l: number) => 24 + l * LANE;
      const fade = (yy: number) => Math.max(0, Math.min(1, (yy - top + ROW) / ROW, (h - yy) / 90));

      // credit any merge that has appeared
      for (let r = 0; r <= head; r++) {
        const m = rows[r].merge;
        if (m && !credited.has(r)) { credited.add(r); if (!reduce || r < head) balance += m.credits; }
      }

      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      const first = Math.max(1, Math.floor(now - (h - top) / ROW) - 1);

      // edges
      for (let r = first; r <= head + 1 && r < rows.length; r++) {
        const appear = r > now ? 0 : Math.min(1, now - r + 0.0001) ; // newest row grows in
        if (r > now) continue;
        for (const [a, b] of rows[r].edges) {
          const y1 = y(r - 1), y2 = y(r - 1) - (y(r - 1) - y(r)) * appear;
          ctx.globalAlpha = fade((y1 + y2) / 2) * 0.55;
          ctx.strokeStyle = fg;
          ctx.beginPath();
          ctx.moveTo(x(a), y1);
          if (a === b) ctx.lineTo(x(b), y2);
          else ctx.bezierCurveTo(x(a), y1 - ROW * 0.6, x(b), y(r) + ROW * 0.4, x(b), y(r));
          ctx.stroke();
        }
      }

      // nodes + labels
      for (let r = first; r <= head; r++) {
        const row = rows[r];
        const yy = y(r), a = fade(yy);
        if (a <= 0) continue;
        const age = now - r;
        const pop = !reduce && age < 0.6 ? Math.sin((age / 0.6) * Math.PI) : 0;
        ctx.globalAlpha = a;
        const rad = (row.merge ? 7 : 5) + pop * 3;
        ctx.fillStyle = row.merge ? fg : bg;
        ctx.strokeStyle = fg;
        ctx.beginPath();
        ctx.arc(x(row.lane), yy, rad, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        const tx = x(3) + 8;
        ctx.textBaseline = "middle";
        ctx.font = `14px ${font}`;
        ctx.fillStyle = row.merge ? fg : muted;
        ctx.fillText(row.msg, tx, yy);
        if (row.merge) {
          const label = `+${row.merge.credits} credits`;
          const mx = tx + ctx.measureText(row.msg).width + 14;
          ctx.font = `600 13px ${font}`;
          const tw = ctx.measureText(label).width;
          ctx.globalAlpha = a * (0.85 + pop * 0.15);
          ctx.fillStyle = fg;
          ctx.beginPath();
          ctx.roundRect(mx, yy - 12, tw + 18, 24, 12);
          ctx.fill();
          ctx.fillStyle = bg;
          ctx.fillText(label, mx + 9, yy + 1);
        }
      }

      // balance header
      ctx.globalAlpha = 1;
      ctx.font = `13px ${font}`;
      ctx.fillStyle = muted;
      ctx.textBaseline = "alphabetic";
      ctx.fillText("$ git log --graph", 24, 26);
      ctx.font = `600 20px ${font}`;
      ctx.fillStyle = fg;
      const bal = `${balance.toLocaleString("en-US")} credits`;
      ctx.fillText(bal, Math.max(24, w - ctx.measureText(bal).width - 8), 28);

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
    const mo = new MutationObserver(() => draw(performance.now())); // redraw on theme toggle
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); mo.disconnect(); };
  }, []);

  return (
    <div className="dotfield" aria-hidden="true">
      <canvas ref={ref} />
    </div>
  );
}
