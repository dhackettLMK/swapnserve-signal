"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CAUSES,
  COUNTRIES,
  LEGAL_STATUSES,
  LENS_LABEL,
  LENS_ORDER,
  signalsFor,
  type Cause,
  type Lens,
  type Signal,
} from "@/lib/console-data";
import { CountrySelect } from "./CountrySelect";

type Phase = "idle" | "analysing" | "done";
type LensState = "idle" | "scanning" | "done";

export function AnalysisConsole() {
  const [country, setCountry] = useState("Ireland");
  const [cause, setCause] = useState<Cause>("Circular economy & reuse");
  const [legal, setLegal] = useState(LEGAL_STATUSES[0]);
  const [phase, setPhase] = useState<Phase>("idle");
  const [lensState, setLensState] = useState<Record<Lens, LensState>>({
    funding: "idle", policy: "idle", partners: "idle", impact: "idle",
  });
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const results = useMemo(() => signalsFor(country, cause), [country, cause]);
  const total = LENS_ORDER.reduce((n, l) => n + results[l].length, 0);

  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => () => clearTimers(), []);
  useEffect(() => {
    clearTimers();
    setPhase("idle");
    setLensState({ funding: "idle", policy: "idle", partners: "idle", impact: "idle" });
  }, [country, cause, legal]);

  const run = () => {
    clearTimers();
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
      timers.current.push(setTimeout(() => setLensState((s) => ({ ...s, [lens]: "scanning" })), i * 420));
      timers.current.push(setTimeout(() => setLensState((s) => ({ ...s, [lens]: "done" })), i * 420 + 300));
    });
    timers.current.push(setTimeout(() => setPhase("done"), LENS_ORDER.length * 420 + 150));
  };

  const unincorporated = legal === LEGAL_STATUSES[0];

  return (
    <div className="panel overflow-hidden text-left">
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="tag">Analysis console</span>
        <span className={`mono text-[11px] uppercase tracking-[0.14em] ${phase === "analysing" ? "pulse text-ink" : "text-faint"}`}>
          {phase === "analysing" ? "scanning" : phase === "done" ? `${total} signals` : "ready"}
        </span>
      </div>

      <div className="grid md:grid-cols-[300px_1fr]">
        <div className="border-b border-line p-5 md:border-b-0 md:border-r">
          <p className="tag">Your organisation</p>
          <div className="mt-4 space-y-3.5">
            <Field label="Country"><CountrySelect value={country} onChange={setCountry} options={COUNTRIES} /></Field>
            <Field label="Cause / sector"><Select value={cause} onChange={(v) => setCause(v as Cause)} options={CAUSES} /></Field>
            <Field label="Legal status"><Select value={legal} onChange={setLegal} options={LEGAL_STATUSES} /></Field>
          </div>
          <button onClick={run} className="btn-action mt-6 w-full px-4 py-2.5 text-sm font-medium">
            {phase === "analysing" ? "Analysing" : "Run analysis"}
          </button>
          <p className="mt-3 mono text-[11px] text-faint">0 credits, cached results</p>
          {unincorporated ? (
            <p className="mt-3 text-[12px] leading-relaxed text-dim">
              Unincorporated: some funds need a constituted group with a bank account. Those are
              flagged so you can weigh incorporating.
            </p>
          ) : null}
        </div>

        <div className="min-h-[340px] p-5">
          {phase === "idle" ? (
            <Idle country={country} cause={cause} total={total} />
          ) : (
            <div className="space-y-4">
              {LENS_ORDER.map((lens) => (
                <LensBlock key={lens} lens={lens} state={lensState[lens]} signals={results[lens]} />
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
      <span className="mono text-[10px] uppercase tracking-[0.14em] text-faint">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="well w-full appearance-none px-3 py-2 pr-8 text-sm text-ink outline-none"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-dim">▾</span>
    </div>
  );
}

function Idle({ country, cause, total }: { country: string; cause: string; total: number }) {
  return (
    <div className="flex h-full min-h-[300px] flex-col items-start justify-center">
      <p className="max-w-sm text-sm text-dim">
        Set a country, a cause and a legal status, then run the analysis to read what Cala surfaces
        across funding, regulation, partners and impact. Every result carries its source and a link
        to act on it.
      </p>
      <p className="mt-4 mono text-[11px] uppercase tracking-[0.14em] text-faint">
        {total} cached signals for {country}, {cause.toLowerCase()} · awaiting run
      </p>
    </div>
  );
}

function LensBlock({ lens, state, signals }: { lens: Lens; state: LensState; signals: Signal[] }) {
  return (
    <div className="border-b border-line pb-3 last:border-b-0">
      <div className="flex items-center justify-between">
        <span className="mono text-[11px] uppercase tracking-[0.14em] text-dim">{LENS_LABEL[lens]}</span>
        <span className="mono text-[10px] tracking-[0.14em] text-faint">
          {state === "scanning" ? <span className="pulse">scanning</span>
            : state === "done" ? `${signals.length} ${signals.length === 1 ? "signal" : "signals"}` : ""}
        </span>
      </div>

      {state === "done" ? (
        signals.length === 0 ? (
          <p className="mt-2 text-[13px] text-faint">
            No cached signal for this combination. A live run would query Cala directly.
          </p>
        ) : (
          <div className="mt-2 space-y-2 animate-[fadeup_0.4s_ease]">
            {signals.map((s, i) => <SignalCard key={i} s={s} />)}
          </div>
        )
      ) : (
        <div className="groove mt-2 h-7 w-full" />
      )}
    </div>
  );
}

function SignalCard({ s }: { s: Signal }) {
  return (
    <div className="well p-3">
      <p className="text-sm font-medium">{s.title}</p>
      <p className="mt-1 text-[13px] leading-relaxed text-dim">{s.detail}</p>
      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
        <a
          href={s.actionUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-action px-2.5 py-1 text-[11px] font-medium"
        >
          {s.actionLabel} &rarr;
        </a>
        <span className="mono text-[10px] text-faint">
          <a href={s.sourceUrl} target="_blank" rel="noreferrer" className="text-ink underline underline-offset-2">
            {s.sourceLabel}
          </a>
          {" / "}{s.confidence}{" / via "}{s.via}
        </span>
      </div>
    </div>
  );
}
