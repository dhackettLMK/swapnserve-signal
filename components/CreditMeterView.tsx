"use client";

import { useEffect, useRef, useState } from "react";

export function CreditMeterView({
  used,
  budget,
  compact = false,
}: {
  used: number;
  budget: number;
  compact?: boolean;
}) {
  const pct = budget > 0 ? Math.min(100, (used / budget) * 100) : 0;
  const [shown, setShown] = useState(0);
  const [fill, setFill] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          if (reduced) { setShown(used); setFill(pct); return; }
          setFill(pct);
          const dur = 800;
          const t0 = performance.now();
          const step = (now: number) => {
            const k = Math.min(1, (now - t0) / dur);
            setShown(Math.round(used * (1 - Math.pow(1 - k, 3))));
            if (k < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [used, pct]);

  return (
    <div ref={ref} className={compact ? "" : "panel p-5"}>
      <div className="flex items-baseline justify-between">
        <span className="tag">Cala credits</span>
        <span className="mono text-sm tabular-nums">
          <span className="text-signal">{shown}</span>
          <span className="text-faint"> / {budget}</span>
        </span>
      </div>
      <div className="groove mt-3 h-2 w-full overflow-hidden">
        <div
          className="h-full rounded-[3px] bg-signal transition-[width] duration-700 ease-out"
          style={{ width: `${fill}%` }}
        />
      </div>
      {!compact ? (
        <p className="mt-3 text-xs text-dim">
          Free-tier budget. The site serves committed, cached data, so browsing spends nothing.
          Credits go only to ingestion and the metered live query.
        </p>
      ) : null}
    </div>
  );
}
