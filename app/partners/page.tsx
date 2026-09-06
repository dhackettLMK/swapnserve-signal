import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { StatusLine } from "@/components/StatusLine";
import { SpecList } from "@/components/SpecList";
import { Reveal } from "@/components/Reveal";
import { ProvenanceChip } from "@/components/ProvenanceChip";
import { loadPartners } from "@/lib/data";
import type { PartnerTarget } from "@/lib/schema";

export const metadata: Metadata = { title: "Partners" };

export default function PartnersPage() {
  const partners = loadPartners();

  return (
    <div>
      <PageHeader
        index="01"
        eyebrow="Research targets, not partners"
        title="Corporate targets"
        intro="Mid-West employers, Irish retailers, and textile-obligated producers. Each one carries a specific public commitment quoted in its own words, with a tailored approach angle. Company and role level only, never a named individual."
      />

      {partners.length === 0 ? (
        <>
          <div className="mt-8">
            <StatusLine phase="PHASE 2" state="awaiting Cala ingestion" />
          </div>
          <SpecList
            label="What this module delivers"
            items={[
              { k: "Entity workflow", v: "entity_search, then entity_introspection, then entity_retrieval for every company." },
              { k: "Cited commitments", v: "Each statement quoted verbatim with a resolving source." },
              { k: "Approach angle", v: "A specific opening for each target, written by Dara and attributed." },
              { k: "Acceptance", v: "At least eight verified targets across three segments." },
            ]}
          />
        </>
      ) : (
        <div className="mt-10 space-y-6">
          {partners.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <PartnerCard partner={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

const TIER_LABEL: Record<number, string> = { 1: "Tier 1", 2: "Tier 2", 3: "Tier 3" };
const EPR_LABEL: Record<string, string> = {
  "textile-producer": "Textile-obligated producer",
  none: "No EPR exposure",
  unknown: "EPR exposure unknown",
};

function PartnerCard({ partner: p }: { partner: PartnerTarget }) {
  return (
    <article className="panel p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">{p.legalName}</h2>
          <p className="mt-1 text-sm text-dim">{p.midWestPresence.value.sites.join(" · ")}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-[4px] border border-line-2 px-2 py-0.5 font-mono text-[11px] text-dim">
            {TIER_LABEL[p.tier]}
          </span>
          {p.eprExposure.value === "textile-producer" ? (
            <span className="rounded-[4px] bg-signal-deep px-2 py-0.5 font-mono text-[11px] text-signal">
              {EPR_LABEL[p.eprExposure.value]}
            </span>
          ) : (
            <span className="rounded-[4px] border border-line-2 px-2 py-0.5 font-mono text-[11px] text-dim">
              {EPR_LABEL[p.eprExposure.value]}
            </span>
          )}
        </div>
      </div>

      <div className="mt-5 space-y-3">
        <p className="tag">Published commitments</p>
        {p.commitments.map((c, i) => (
          <div key={i} className="rounded-[5px] border border-line bg-raised p-4">
            <p className="text-[15px] leading-relaxed">
              <span className="text-signal">&ldquo;</span>
              {c.value.quote}
              <span className="text-signal">&rdquo;</span>
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] text-faint">
                {c.value.documentTitle}, {c.value.documentYear}
              </span>
              <ProvenanceChip provenance={c.provenance} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="tag">Approach angle</p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-dim">{p.angle}</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
            written by Dara, not by Cala
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-line pt-4">
        <span className="font-mono text-[11px] text-faint">EPR basis</span>
        <ProvenanceChip provenance={p.eprExposure.provenance} />
        <span className="font-mono text-[11px] text-faint">Presence</span>
        <ProvenanceChip provenance={p.midWestPresence.provenance} />
      </div>
    </article>
  );
}
