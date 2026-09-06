import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { StatusLine } from "@/components/StatusLine";
import { SpecList } from "@/components/SpecList";
import { Reveal } from "@/components/Reveal";
import { ProvenanceChip } from "@/components/ProvenanceChip";
import { loadPolicy } from "@/lib/data";

export const metadata: Metadata = { title: "Policy and EPR" };

export default function PolicyPage() {
  const milestones = [...loadPolicy()].sort((a, b) => a.date.value.localeCompare(b.date.value));

  return (
    <div>
      <PageHeader
        index="03"
        eyebrow="Textile EPR"
        title="Policy and regulatory tracker"
        intro="The timeline from Directive (EU) 2025/1892 through Irish transposition to the textile producer-responsibility scheme, tracking the social-economy exemption that protects operators like Swap'n'Serve and what qualifying for it would require."
      />

      {milestones.length === 0 ? (
        <>
          <div className="mt-8">
            <StatusLine phase="PHASE 4" state="awaiting verification" />
          </div>
          <SpecList
            label="What this module delivers"
            items={[
              { k: "Dated timeline", v: "Each milestone with a source on every date." },
              { k: "Primary source first", v: "Dates verified against EUR-Lex and gov.ie." },
              { k: "Acceptance", v: "A dated, cited timeline and an incorporation brief." },
            ]}
          />
        </>
      ) : (
        <ol className="mt-10 border-l border-line-2">
          {milestones.map((m, i) => {
            const d = new Date(m.date.value);
            const passed = m.status === "passed";
            return (
              <Reveal key={m.id} as="li" delay={i * 50}>
                <div className="relative pb-9 pl-7">
                  <span
                    className={`absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full ${passed ? "bg-faint" : "bg-ink"}`}
                  />
                  <div className="flex flex-wrap items-baseline gap-3">
                    <time className="mono text-sm text-ink">
                      {d.toLocaleDateString("en-IE", { day: "numeric", month: "short", year: "numeric" })}
                    </time>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                      {m.jurisdiction === "ie" ? "Ireland" : "EU"} · {m.status}
                    </span>
                  </div>
                  <h2 className="mt-1.5 text-base font-medium">{m.event}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-dim">{m.implicationForSNS}</p>
                  <div className="mt-2.5">
                    <ProvenanceChip provenance={m.date.provenance} />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      )}
    </div>
  );
}
