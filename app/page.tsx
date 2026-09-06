import Link from "next/link";
import { NAV } from "@/lib/nav";
import { Reveal } from "@/components/Reveal";
import { CreditMeter } from "@/components/CreditMeter";
import { AnalysisConsole } from "@/components/AnalysisConsole";
import { loadCreditLedger, loadEvidence } from "@/lib/data";

const PRINCIPLES = [
  {
    t: "Every reading carries its source",
    d: "Nothing is shown without provenance: the source, the Cala tool that produced it, and a confidence label. If it cannot be traced, it is not shown.",
  },
  {
    t: "No invented numbers",
    d: "Amounts and deadlines are never asserted without a verified source. An honest gap beats a figure a funder's due diligence would catch.",
  },
  {
    t: "Metered against a credit budget",
    d: "Cached example organisations cost nothing to explore. Live runs are metered and degrade to a cached report when the daily budget is reached.",
  },
];

export default function Home() {
  const ledger = loadCreditLedger();
  const sources = loadEvidence().length;

  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="pt-2">
        <Link
          href="#console"
          className="banner-dots group inline-flex items-center gap-2 rounded-[8px] border border-line px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-signal-2"
        >
          Worked example: Swap&rsquo;n&rsquo;Serve, Limerick
          <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
        </Link>

        <h1 className="display mt-7 max-w-4xl text-[2.6rem] leading-[1.04] sm:text-[4rem]">
          The opportunities your nonprofit is missing, found and{" "}
          <span className="accent-word">sourced</span>.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-dim sm:text-lg">
          Enter a country, a cause, and a legal status. Signal uses Cala to read back the funding an
          organisation can actually apply for, the regulation heading its way, the partners worth
          approaching, and how to frame its impact. Every item carries its source. Shown here on
          Swap&rsquo;n&rsquo;Serve, a Limerick clothing-reuse initiative.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-faint">
          <span>Built on Cala</span>
          <span className="text-line-2">|</span>
          <span>{ledger.totalCredits}/{ledger.budgetPerMonth} credits used</span>
          <span className="text-line-2">|</span>
          <span>{sources} sources catalogued</span>
        </div>
      </section>

      {/* The tool */}
      <section id="console" className="scroll-mt-28">
        <Reveal>
          <AnalysisConsole />
        </Reveal>
      </section>

      {/* How a reading is built */}
      <section>
        <Reveal>
          <p className="tag">How every reading is built</p>
        </Reveal>
        <div className="mt-6 border-t border-line">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.t} delay={i * 80}>
              <div className="group grid gap-2 border-b border-line py-7 sm:grid-cols-[3rem_1fr] sm:gap-8">
                <span className="font-mono text-sm text-faint">{String(i + 1).padStart(2, "0")}</span>
                <div className="max-w-3xl">
                  <h3 className="text-lg font-medium transition-colors group-hover:text-signal">
                    {p.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-dim">{p.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section>
        <Reveal>
          <p className="tag">The four readings, and the workings behind them</p>
        </Reveal>
        <div className="mt-6 border-t border-line">
          {NAV.map((item, i) => (
            <Reveal key={item.href} delay={i * 40}>
              <Link
                href={item.href}
                className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-line py-5 transition-colors hover:bg-raised"
              >
                <span className="font-mono text-sm text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="text-base font-medium transition-colors group-hover:text-signal">
                    {item.label}
                  </span>
                  <span className="text-sm text-dim">{item.short}</span>
                </span>
                <span className="pr-2 text-dim transition-transform duration-300 group-hover:translate-x-1 group-hover:text-signal">
                  &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Credits */}
      <section className="max-w-md">
        <Reveal>
          <CreditMeter />
        </Reveal>
      </section>
    </div>
  );
}
