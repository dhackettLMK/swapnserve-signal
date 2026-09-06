"use client";

import { useEffect, useRef, useState } from "react";
import {
  CAUSES,
  COUNTRIES,
  LEGAL_STATUSES,
  LENS_ORDER,
  SWAPNSERVE,
  matchesExample,
  type Lens,
} from "@/lib/demo";

type Phase = "idle" | "analysing" | "done" | "live";
type LensState = "idle" | "scanning" | "done";

export function AnalysisConsole() {
  const [country, setCountry] = useState(SWAPNSERVE.country);
  const [cause, setCause] = useState(SWAPNSERVE.cause);
  const [legal, setLegal] = useState(SWAPNSERVE.legalStatus);
  const [phase, setPhase] = useState<Phase>("idle");
  const [lensState, setLensState] = useState<Record<Lens, LensState>>({
    funding: "idle",
    policy: "idle",
    partners: "idle",
    impact: "idle",
  });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };
  useEffect(() => () => clearTimers(), []);

  // Re-arm when the profile changes.
  useEffect(() => {
    clearTimers();
    setPhase("idle");
    setLensState({ funding: "idle", policy: "idle", partners: "idle", impact: "idle" });
  }, [country, cause, legal]);

  const run = () => {
    clearTimers();
    if (!matchesExample(country, cause)) {
      setPhase("live");
      return;
    }
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setPhase("analysing");
    if (reduced) {
      setLensState({ funding: "done", policy: "done", partners: "done", impact: "done" });
      setPhase("done");
      return;
    }
    setLensState({ funding: "idle", policy: "idle", partners: "idle", impact: "idle" });
    LENS_ORDER.forEach((lens, i) => {
      timers.current.push(
        setTimeout(() => setLensState((s) => ({ ...s, [lens]: "scanning" })), i * 480),
      );
      timers.current.push(
        setTimeout(() => setLensState((s) => ({ ...s, [lens]: "done" })), i * 480 + 360),
      );
    });
    timers.current.push(setTimeout(() => setPhase("done"), LENS_ORDER.length * 480 + 200));
  };

  const isExample = matchesExample(country, cause);

  return (
    <div className="panel overflow-hidden text-left">
      {/* header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-dim">
          <span
            className={`h-1.5 w-1.5 rounded-full ${phase === "analysing" ? "pulse bg-signal" : "bg-signal"}`}
          />
          ANALYSIS CONSOLE
        </span>
        <span className="font-mono text-[11px] tracking-[0.18em] text-faint">
          {phase === "analysing" ? "SCANNING" : phase === "done" ? "COMPLETE" : "READY"}
        </span>
      </div>

      <div className="grid md:grid-cols-[300px_1fr]">
        {/* intake */}
        <div className="border-b border-line p-5 md:border-b-0 md:border-r">
          <p className="tag">Your organisation</p>
          <div className="mt-4 space-y-4">
            <Field label="Country">
              <Select value={country} onChange={setCountry} options={COUNTRIES} />
            </Field>
            <Field label="Cause">
              <Select value={cause} onChange={setCause} options={CAUSES} />
            </Field>
            <Field label="Legal status">
              <Select value={legal} onChange={setLegal} options={LEGAL_STATUSES} />
            </Field>
          </div>

          <button
            onClick={run}
            className="cta-glow mt-6 flex w-full items-center justify-center gap-2 rounded-[6px] bg-signal px-4 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-signal-2"
          >
            {phase === "analysing" ? "Analysing…" : "Run analysis"}
          </button>
          <p className="mt-3 font-mono text-[11px] text-faint">
            {isExample
              ? "0 credits · cached example (Swap'n'Serve)"
              : "live run · spends Cala credits, metered"}
          </p>
        </div>

        {/* readout */}
        <div className="min-h-[320px] p-5">
          {phase === "idle" ? (
            <Idle isExample={isExample} />
          ) : phase === "live" ? (
            <LiveNeeded country={country} cause={cause} />
          ) : (
            <div className="space-y-3">
              {LENS_ORDER.map((lens) => (
                <LensRow key={lens} lens={lens} state={lensState[lens]} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-[5px] border border-line-2 bg-raised px-3 py-2 pr-8 text-sm text-ink outline-none transition-colors hover:border-signal focus:border-signal"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-raised text-ink">
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-dim">
        ▾
      </span>
    </div>
  );
}

function Idle({ isExample }: { isExample: boolean }) {
  return (
    <div className="flex h-full min-h-[280px] flex-col items-start justify-center">
      <p className="max-w-sm text-sm text-dim">
        {isExample
          ? "This profile matches the Swap'n'Serve worked example. Run the analysis to read what Cala surfaces across funding, regulation, partners and impact."
          : "A custom profile runs a live analysis against Cala. Run it to generate a tailored, cited report."}
      </p>
      <p className="mt-4 font-mono text-[11px] tracking-[0.16em] text-faint">AWAITING RUN</p>
    </div>
  );
}

function LiveNeeded({ country, cause }: { country: string; cause: string }) {
  return (
    <div className="flex h-full min-h-[280px] flex-col justify-center">
      <p className="tag">Live analysis</p>
      <p className="mt-3 max-w-sm text-sm text-dim">
        There is no cached report for a {cause.toLowerCase()} organisation in {country}. A live run
        queries Cala directly and builds a tailored, cited report. Live runs are metered and degrade
        to a cached example when the daily budget is reached.
      </p>
      <div className="mt-5">
        <span className="inline-flex items-center gap-2 rounded-[5px] border border-line-2 px-3 py-2 font-mono text-[11px] text-dim">
          <span className="h-1.5 w-1.5 rounded-full bg-warn" />
          live intake opens once Cala credits are provisioned
        </span>
      </div>
    </div>
  );
}

function LensRow({ lens, state }: { lens: Lens; state: LensState }) {
  const result = SWAPNSERVE.results[lens];
  return (
    <div className="border-b border-line pb-3 last:border-b-0">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
          {result.label}
        </span>
        <span className="font-mono text-[10px] tracking-[0.14em] text-faint">
          {state === "scanning" ? "scanning" : state === "done" ? "1 signal" : ""}
        </span>
      </div>

      {state === "scanning" ? (
        <div className="mt-2 h-8 w-full overflow-hidden rounded-[4px] bg-raised">
          <div className="scan h-full w-1/3 bg-gradient-to-r from-transparent via-signal/30 to-transparent" />
        </div>
      ) : state === "done" ? (
        <div className="mt-2 animate-[fadeup_0.5s_ease]">
          <p className="text-sm text-ink">{result.reading}</p>
          <div className="mt-2 rounded-[5px] border border-line bg-raised p-3">
            <p className="text-sm font-medium">{result.signal.title}</p>
            <p className="mt-1 text-[13px] leading-relaxed text-dim">{result.signal.detail}</p>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] text-faint">
              <a
                href={result.signal.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="text-signal"
              >
                {result.signal.sourceLabel}
              </a>
              <span>/ {result.signal.confidence}</span>
              <span>/ via {result.signal.via}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-2 h-8 w-full rounded-[4px] bg-raised/40" />
      )}
    </div>
  );
}
