import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { StatusLine } from "@/components/StatusLine";
import { SpecList } from "@/components/SpecList";
import { Reveal } from "@/components/Reveal";
import { ProvenanceChip } from "@/components/ProvenanceChip";
import { ImpactCalculator } from "@/components/ImpactCalculator";
import { loadImpactFactors, loadSelfReported } from "@/lib/data";

export const metadata: Metadata = { title: "Impact" };

export default function ImpactPage() {
  const factors = loadImpactFactors();
  const selfReported = loadSelfReported();

  return (
    <div>
      <PageHeader
        index="04"
        eyebrow="Defensible numbers"
        title="Impact calculator"
        intro="Enter kilograms of clothing diverted and read back the carbon avoided as a range, not a single figure. Every factor states its system boundary and substitution assumption, because a reused garment only avoids emissions if it displaces a new purchase, and never one for one."
      />

      {factors.length === 0 ? (
        <>
          <div className="mt-8">
            <StatusLine phase="PHASE 5" state="awaiting cited factors" />
          </div>
          <SpecList
            label="What this module delivers"
            items={[
              { k: "Cited factors", v: "Conversion factors from peer-reviewed life-cycle studies." },
              { k: "Stated assumptions", v: "System boundary and substitution rate on every factor." },
              { k: "Ranges, not points", v: "Each output shown with an honest uncertainty range." },
            ]}
          />
        </>
      ) : (
        <div className="mt-10 space-y-10">
          {selfReported ? (
            <Reveal>
              <section className="panel p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="tag">Swap&rsquo;n&rsquo;Serve so far</p>
                  <span className="mono text-[10px] uppercase tracking-[0.14em] text-faint">self-reported</span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-5">
                  {selfReported.metrics.map((m) => (
                    <div key={m.id}>
                      <dd className="mono text-2xl text-ink tabular-nums">
                        {m.unit === "EUR" ? "€" : ""}
                        {m.value.toLocaleString()}
                        {m.unit !== "EUR" ? "+" : "+"}
                      </dd>
                      <dt className="mt-1 text-[13px] text-dim">{m.label}</dt>
                      {m.note ? <p className="mt-0.5 text-[11px] text-faint">{m.note}</p> : null}
                    </div>
                  ))}
                </dl>
                <p className="mt-5 border-t border-line pt-4 text-xs text-faint">{selfReported.disclaimer}</p>
              </section>
            </Reveal>
          ) : null}

          <Reveal>
            <ImpactCalculator />
          </Reveal>

          <section>
            <Reveal>
              <p className="tag">The factors behind the calculator</p>
            </Reveal>
            <div className="mt-4 space-y-4">
              {factors.map((f, i) => (
                <Reveal key={f.id} delay={i * 50}>
                  <article className="panel p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      <h2 className="max-w-xl text-base font-medium">{f.label}</h2>
                      <span className="mono text-lg text-ink tabular-nums">
                        {f.value.value} <span className="text-xs text-dim">{f.unit}</span>
                      </span>
                    </div>
                    <dl className="mt-4 grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      <Row k="Geography" v={f.geography} />
                      <Row k="Year" v={String(f.year)} />
                      <Row k="System boundary" v={f.systemBoundary} />
                      {typeof f.substitutionRate === "number" ? (
                        <Row k="Substitution rate" v={`${f.substitutionRate} (full displacement)`} />
                      ) : null}
                      <Row k="Uncertainty" v={f.uncertainty} />
                    </dl>
                    <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-line pt-3">
                      <a href={f.methodologyUrl} target="_blank" rel="noreferrer" className="mono text-[11px] text-ink underline underline-offset-2">
                        methodology
                      </a>
                      <ProvenanceChip provenance={f.value.provenance} />
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[9rem_1fr] gap-2">
      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{k}</dt>
      <dd className="text-sm text-dim">{v}</dd>
    </div>
  );
}
