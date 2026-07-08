"use client";

import { useEffect, useRef } from "react";

type Orb = { c: string; r: number; sx: number; sy: number; px: number; py: number };

const ORBS: Orb[] = [
  { c: "oklch(0.93 0.2 122 / 0.13)", r: 0.55, sx: 0.9, sy: 0.7, px: 0.2, py: 1.4 },
  { c: "oklch(0.68 0.19 292 / 0.16)", r: 0.65, sx: 0.6, sy: 1.1, px: 2.4, py: 3.1 },
  { c: "oklch(0.83 0.12 180 / 0.1)", r: 0.5, sx: 1.2, sy: 0.5, px: 4.2, py: 0.6 },
];

/**
 * Drifting gradient-orb backdrop drawn on a low-resolution canvas
 * (the output is soft gradients, so 1/4 resolution is indistinguishable
 * and keeps paint cost trivial). Static under reduced motion, paused
 * when the tab is hidden.
 */
export function Aurora({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const SCALE = 0.25;
    let w = 0;
    let h = 0;
    let raf = 0;
    let t = Math.PI / 3;

    const resize = () => {
      w = Math.max(1, Math.round(canvas.clientWidth * SCALE));
      h = Math.max(1, Math.round(canvas.clientHeight * SCALE));
      canvas.width = w;
      canvas.height = h;
    };
    resize();
    const ro = new ResizeObserver(() => {
      resize();
      drawFrame();
    });
    ro.observe(canvas);

    const drawFrame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const o of ORBS) {
        const x = w * (0.5 + 0.38 * Math.cos(t * o.sx + o.px));
        const y = h * (0.42 + 0.32 * Math.sin(t * o.sy + o.py));
        const r = Math.max(w, h) * o.r;
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, o.c);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loop = () => {
      t += 0.0035;
      drawFrame();
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      drawFrame();
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduced) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className={className} />;
}
