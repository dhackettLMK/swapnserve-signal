import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { StatusLine } from "@/components/StatusLine";
import { SpecList } from "@/components/SpecList";
import { Reveal } from "@/components/Reveal";
import { loadCoverageGaps } from "@/lib/data";

export const metadata: Metadata = { title: "Limitations" };

export default function LimitationsPage() {
  const { gaps } = loadCoverageGaps();

  return (
    <div>
      <PageHeader
        eyebrow="Honest coverage"
        title="Limitations"
        intro="Where Cala's coverage was thin for Irish civil-society and Mid-West corporate entities, with reproducible queries. Characterising the edges of the data is the point, not an apology. The same write-up goes to the Cala team."
      />

      {gaps.length === 0 ? (
        <>
          <div className="mt-8">
            <StatusLine phase="PHASE 1 and 6" state="recorded from first queries" />
          </div>
          <SpecList
            label="What this module delivers"
            items={[
              { k: "Reproducible gaps", v: "Each gap paired with the exact query that surfaces it." },
              { k: "Acceptance", v: "At least five concrete coverage gaps with reproducible queries." },
            ]}
          />
        </>
      ) : (
        <div className="mt-10 space-y-4">
          {gaps.map((g, i) => (
            <Reveal key={g.id} delay={i * 50}>
              <article className="panel p-5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-warn">
                    {g.domain}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    {g.calaTool}
                  </span>
                </div>
                <h2 className="mt-2 max-w-2xl text-base font-medium">{g.summary}</h2>
                {g.detail ? <p className="mt-2 max-w-2xl text-sm text-dim">{g.detail}</p> : null}
                <div className="mt-3 rounded-[5px] border border-line bg-raised p-3">
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                    reproduce
                  </p>
                  <p className="mt-1 font-mono text-[12px] leading-relaxed text-dim">
                    {g.reproducibleQuery}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
