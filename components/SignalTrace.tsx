"use client";

import { useEffect, useRef } from "react";

/**
 * An oscilloscope-style live trace rendered on canvas. Green on near-black,
 * with a faint internal grid and a moving scan head. Crisp full-redraw (no
 * blurred phosphor glow). Honours prefers-reduced-motion by drawing one static
 * frame. Fills its parent; give the parent a height.
 */
export function SignalTrace({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const signalAt = (nx: number, t: number) => {
      const p = nx * Math.PI * 2 * 3 - t * 1.6;
      const env = 0.55 + 0.45 * Math.sin(nx * Math.PI); // fade at edges
      return (
        env *
        (Math.sin(p) * 0.5 +
          Math.sin(p * 2.3 + t * 0.9) * 0.22 +
          Math.sin(p * 0.5 - t * 0.4) * 0.28)
      );
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const midY = height / 2;
      const amp = height * 0.3;

      // internal grid
      ctx.strokeStyle = "rgba(53,224,138,0.06)";
      ctx.lineWidth = 1;
      const step = 28;
      for (let x = 0; x <= width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y <= height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // baseline
      ctx.strokeStyle = "rgba(53,224,138,0.14)";
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(width, midY);
      ctx.stroke();

      // dim echo behind
      ctx.strokeStyle = "rgba(53,224,138,0.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const y = midY - signalAt(x / width, t - 0.18) * amp;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // primary trace
      let headY = midY;
      ctx.strokeStyle = "#35e08a";
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const y = midY - signalAt(x / width, t) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
        headY = y;
      }
      ctx.stroke();

      // scan head
      ctx.fillStyle = "#7cf0b6";
      ctx.beginPath();
      ctx.arc(width, headY, 2.4, 0, Math.PI * 2);
      ctx.fill();
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduced) draw(0);
    });
    ro.observe(canvas);

    if (reduced) {
      draw(0);
      return () => ro.disconnect();
    }

    let raf = 0;
    let start = performance.now();
    const loop = (now: number) => {
      draw((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
