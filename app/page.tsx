import Link from "next/link";
import { NAV } from "@/lib/nav";
import { Reveal } from "@/components/Reveal";
import { CreditMeter } from "@/components/CreditMeter";
import { AnalysisConsole } from "@/components/AnalysisConsole";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
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
    <div className="space-y-20">
      <section className="pt-2">
        <Reveal>
          <AnnouncementBanner />
        </Reveal>
        <Reveal delay={60}>
          <h1 className="display mt-7 max-w-4xl text-[2.4rem] leading-[1.04] sm:text-[3.6rem]">
            The opportunities your nonprofit is missing, found and{" "}
            <span className="editorial">sourced</span>.
          </h1>
        </Reveal>
        <Reveal delay={110}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-dim">
            Enter a country, a cause and a legal status. Signal uses Cala to read back the funding an
            organisation can actually apply for, the regulation heading its way, the partners worth
            approaching, and how to frame its impact. Every item carries its source. Shown here on
            Swap&rsquo;n&rsquo;Serve, a Limerick community initiative.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/#console" className="btn-action px-5 py-2.5 text-sm font-medium">
              Run analysis
            </Link>
            <Link href="/how-it-works" className="keycap px-5 py-2.5 text-sm font-medium text-ink">
              How it works
            </Link>
          </div>
          <p className="mt-6 mono text-[11px] uppercase tracking-[0.14em] text-faint">
            Built on Cala · {ledger.totalCredits}/{ledger.budgetPerMonth} credits used · {sources} sources catalogued
          </p>
        </Reveal>
      </section>

      <section id="console" className="scroll-mt-24">
        <Reveal>
          <AnalysisConsole />
        </Reveal>
      </section>

      <section>
        <Reveal><p className="tag">How every reading is built</p></Reveal>
        <div className="mt-5 border-t border-line">
          {PRINCIPLES.map((p, i) => (
            <Reveal key={p.t} delay={i * 70}>
              <div className="grid gap-2 border-b border-line py-6 sm:grid-cols-[3rem_1fr] sm:gap-8">
                <span className="mono text-sm text-faint">{String(i + 1).padStart(2, "0")}</span>
                <div className="max-w-3xl">
                  <h3 className="text-lg font-medium">{p.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-dim">{p.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section>
        <Reveal><p className="tag">The four readings, and the workings behind them</p></Reveal>
        <div className="mt-5 border-t border-line">
          {NAV.map((item, i) => (
            <Reveal key={item.href} delay={i * 35}>
              <Link
                href={item.href}
                className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-line py-4 transition-colors hover:bg-panel"
              >
                <span className="mono text-sm text-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
                  <span className="text-base font-medium">{item.label}</span>
                  <span className="text-sm text-dim">{item.short}</span>
                </span>
                <span className="pr-2 text-dim transition-transform duration-150 group-hover:translate-x-0.5">&rarr;</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="max-w-md">
        <Reveal><CreditMeter /></Reveal>
      </section>
    </div>
  );
}
