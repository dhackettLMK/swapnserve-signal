"use client";

import { useEffect, useRef, useState } from "react";
import { CountryFlag } from "./CountryFlag";

/**
 * Custom country dropdown so each option can show a flag next to the name
 * (native <select> cannot render SVG, and emoji flags fail on Windows). Styled
 * as a recessed well to match the other console fields; closes on outside click
 * or Escape.
 */
export function CountrySelect({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="well flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-ink outline-none"
      >
        <CountryFlag country={value} className="shrink-0" />
        <span className="flex-1 truncate">{value}</span>
        <span className={`text-[10px] text-dim transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open ? (
        <ul
          role="listbox"
          className="panel absolute z-20 mt-1 max-h-64 w-full overflow-auto p-1"
        >
          {options.map((o) => {
            const active = o === value;
            return (
              <li key={o}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    onChange(o);
                    setOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 rounded-[4px] px-2 py-1.5 text-left text-sm transition-colors hover:bg-raised ${active ? "text-ink" : "text-dim"}`}
                >
                  <CountryFlag country={o} className="shrink-0" />
                  <span className="flex-1 truncate">{o}</span>
                  {active ? <span className="text-signal">✓</span> : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
