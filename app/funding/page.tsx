import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { loadFunding } from "@/lib/data";

export const metadata: Metadata = { title: "Funding" };

export default function FundingPage() {
  const funding = loadFunding();

  return (
    <div>
      <PageHeader
        eyebrow="Pipeline"
        title="Funding opportunities"
        intro={
          <>
            Irish and EU grants for community reuse and circular economy, screened
            unincorporated-first: the single most common silent disqualifier is a fund that
            requires a legal entity or charity status. Those route to the incorporation decision
            rather than being dropped.
          </>
        }
      />
      {funding.length === 0 ? (
        <EmptyState
          phase="Phase 3"
          building="Standing query set → verified deadlines and eligibility → fit rubric → deadline calendar with ICS export. European Solidarity Corps Solidarity Projects is assessed first — the best structural fit for a youth-led unincorporated initiative."
        >
          Acceptance bar: ≥15 opportunities, each marked eligible/blocked for an unincorporated body
          with the reason; deadlines verified against the funder&rsquo;s own page.
        </EmptyState>
      ) : (
        <p className="mt-8 text-muted">{funding.length} opportunities loaded.</p>
      )}
    </div>
  );
}
