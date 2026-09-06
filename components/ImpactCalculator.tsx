"use client";

import { useState } from "react";

/**
 * Turns kilograms diverted into a carbon range, not a single figure. The low
 * end uses the full-chain system average (2.4 kg CO2e/kg, Refashion/Deloitte);
 * the high end assumes full displacement of new production (25 kg CO2e/kg, UPC).
 * The gap between them is the substitution-rate assumption, stated openly.
 */
const LOW = 2.4;
const HIGH = 25;

export function ImpactCalculator() {
  const [kg, setKg] = useState(500);
  const low = Math.round(kg * LOW);
  const high = Math.round(kg * HIGH);

  return (
    <div className="panel p-6">
      <label className="block">
        <span className="tag">Clothing diverted</span>
        <div className="mt-3 flex items-baseline gap-3">
          <input
            type="number"
            min={0}
            value={kg}
            onChange={(e) => setKg(Math.max(0, Number(e.target.value) || 0))}
            className="w-40 rounded-[5px] border border-line-2 bg-raised px-3 py-2 font-mono text-2xl text-ink outline-none focus:border-signal"
          />
          <span className="font-mono text-sm text-dim">kg</span>
        </div>
        <input
          type="range"
          min={0}
          max={5000}
          step={50}
          value={Math.min(kg, 5000)}
          onChange={(e) => setKg(Number(e.target.value))}
          className="mt-4 w-full accent-[var(--signal)]"
        />
      </label>

      <div className="mt-6 border-t border-line pt-5">
        <p className="tag">Carbon avoided</p>
        <p className="mt-2 font-mono text-3xl text-signal tabular-nums">
          {low.toLocaleString()}
          <span className="text-dim"> – </span>
          {high.toLocaleString()}
          <span className="ml-2 text-base text-dim">kg CO2e</span>
        </p>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-dim">
          The lower figure uses the full-chain system average of 2.4 kg CO2e per kg collected. The
          upper figure assumes reused clothing fully displaces new production, at 25 kg CO2e per kg.
          The real number sits between the two, and depends on the substitution rate. Any figure
          used in a grant application should state which end it uses and why.
        </p>
      </div>
    </div>
  );
}
