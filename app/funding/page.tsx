import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { StatusLine } from "@/components/StatusLine";
import { SpecList } from "@/components/SpecList";
import { Reveal } from "@/components/Reveal";
import { ProvenanceChip } from "@/components/ProvenanceChip";
import { loadFunding } from "@/lib/data";
import type { FundingOpportunity } from "@/lib/schema";

export const metadata: Metadata = { title: "Funding" };

export default function FundingPage() {
  const funding = [...loadFunding()].sort((a, b) => b.fitScore - a.fitScore);

  return (
    <div>
      <PageHeader
        index="02"
        eyebrow="Pipeline"
        title="Funding opportunities"
        intro="Irish and EU grants for community reuse and circular economy, screened first for whether an unincorporated group can apply. A fund that quietly requires a legal entity or charity status is the most common disqualifier, so those route to the incorporation decision rather than being dropped."
      />

      {funding.length === 0 ? (
        <>
          <div className="mt-8">
            <StatusLine phase="PHASE 3" state="awaiting Cala ingestion" />
          </div>
          <SpecList
            label="What this module delivers"
            items={[
              { k: "Eligibility screen", v: "Every opportunity marked eligible or blocked for an unincorporated body." },
              { k: "Verified deadlines", v: "Dates checked against each funder's own page." },
              { k: "Fit score", v: "A transparent, documented rubric." },
              { k: "Acceptance", v: "At least fifteen opportunities with verified deadlines and eligibility." },
            ]}
          />
        </>
      ) : (
        <div className="mt-10 space-y-4">
          {funding.map((f, i) => (
            <Reveal key={f.id} delay={i * 50}>
              <FundingCard opp={f} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

const STATUS_STYLE: Record<string, string> = {
  eligible: "text-ink",
  watching: "text-dim",
  applying: "text-ink",
  submitted: "text-ink",
  won: "text-signal",
  lost: "text-faint",
  blocked: "text-warn",
};

function fmtAmount(a: FundingOpportunity["amountRange"]["value"]): string {
  const { min, max } = a;
  if (min && max) return `€${(min / 1000).toFixed(0)}k–€${(max / 1000).toFixed(0)}k`;
  if (max) return `up to €${(max / 1000).toFixed(0)}k`;
  if (min) return `from €${(min / 1000).toFixed(0)}k`;
  return "amount varies";
}

function fmtDeadline(d: FundingOpportunity["deadline"]["value"]): string {
  if (d.rolling) return "Rolling / by round";
  if (d.date) return new Date(d.date).toLocaleDateString("en-IE", { day: "numeric", month: "short", year: "numeric" });
  return "See funder";
}

function FundingCard({ opp: f }: { opp: FundingOpportunity }) {
  const elig = f.eligibility.value;
  const unincorporatedOk = !elig.requiresLegalEntity && !elig.requiresCharityStatus;

  return (
    <article className="panel p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="max-w-xl">
          <h2 className="text-lg font-semibold tracking-tight">{f.programme}</h2>
          <p className="mt-0.5 text-sm text-dim">{f.funderName}</p>
        </div>
        <span className={`keycap px-2 py-0.5 mono text-[11px] ${STATUS_STYLE[f.status] ?? "text-dim"}`}>
          {f.status}
        </span>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Cell k="Amount" v={fmtAmount(f.amountRange.value)} />
        <Cell k="Deadline" v={fmtDeadline(f.deadline.value)} />
        <Cell k="Fit score" v={`${f.fitScore}/100`} />
        <Cell
          k="Unincorporated"
          v={unincorporatedOk ? "eligible" : "needs a legal entity"}
          warn={!unincorporatedOk}
        />
      </dl>

      <div className="groove mt-3 h-1.5 w-full overflow-hidden">
        <div className="h-full rounded-[2px] bg-ink" style={{ width: `${f.fitScore}%` }} />
      </div>

      <p className="mt-4 text-sm leading-relaxed text-dim">{elig.raw}</p>

      {f.blockers.length > 0 ? (
        <ul className="mt-3 space-y-1">
          {f.blockers.map((b) => (
            <li key={b} className="flex items-start gap-2 text-[13px] text-warn">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-warn" />
              {b}
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-line pt-3">
        <span className="font-mono text-[11px] text-faint">Deadline</span>
        <ProvenanceChip provenance={f.deadline.provenance} />
        <span className="font-mono text-[11px] text-faint">Eligibility</span>
        <ProvenanceChip provenance={f.eligibility.provenance} />
      </div>
    </article>
  );
}

function Cell({ k, v, warn }: { k: string; v: string; warn?: boolean }) {
  return (
    <div>
      <dt className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">{k}</dt>
      <dd className={`mt-0.5 text-sm ${warn ? "text-warn" : "text-ink"}`}>{v}</dd>
    </div>
  );
}
