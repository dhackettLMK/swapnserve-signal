import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { StatusLine } from "@/components/StatusLine";
import { SpecList } from "@/components/SpecList";
import { Reveal } from "@/components/Reveal";
import { loadEvidence } from "@/lib/data";

export const metadata: Metadata = { title: "Evidence" };

const KIND_LABEL: Record<string, string> = {
  legislation: "Legislation",
  government: "Government",
  "company-report": "Company report",
  research: "Research",
  ngo: "NGO",
  news: "News",
  cala: "Cala",
  other: "Other",
};

export default function EvidencePage() {
  const evidence = loadEvidence();

  return (
    <div>
      <PageHeader
        index="05"
        eyebrow="Citation library"
        title="Evidence"
        intro="The shared source of truth that every provenance mark on the site points into. Each entry records its kind and the modules that cite it."
      />

      {evidence.length === 0 ? (
        <>
          <div className="mt-8">
            <StatusLine phase="PHASES 2 to 6" state="populated as modules land" />
          </div>
          <SpecList
            label="What this module delivers"
            items={[
              { k: "Source record", v: "Title, publisher, kind, and citing modules." },
              { k: "Traceability", v: "Every fact links to an entry here and a logged query." },
            ]}
          />
        </>
      ) : (
        <div className="mt-10 overflow-hidden rounded-[6px] border border-line">
          {evidence.map((e, i) => (
            <Reveal key={e.id} delay={i * 30}>
              <a
                href={e.url}
                target="_blank"
                rel="noreferrer"
                className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line px-4 py-4 transition-colors last:border-b-0 hover:bg-raised"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{e.title}</p>
                  <p className="mt-0.5 truncate font-mono text-[11px] text-faint">
                    {e.publisher ? `${e.publisher} · ` : ""}
                    {e.usedBy.join(", ")}
                  </p>
                </div>
                <span className="rounded-[4px] border border-line-2 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-dim">
                  {KIND_LABEL[e.kind] ?? e.kind}
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}
