import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { loadCoverageGaps } from "@/lib/data";

export const metadata: Metadata = { title: "Limitations" };

export default function LimitationsPage() {
  const { gaps } = loadCoverageGaps();

  return (
    <div>
      <PageHeader
        eyebrow="Honest coverage"
        title="Limitations"
        intro={
          <>
            Where Cala&rsquo;s coverage was thin for Irish civil-society and Mid-West corporate
            entities, with reproducible queries. Characterising the edges of the data is the point,
            not an apology — the same write-up goes to the Cala team.
          </>
        }
      />
      {gaps.length === 0 ? (
        <EmptyState
          phase="Phase 1 & 6"
          building="Coverage gaps are recorded from the very first reconnaissance queries onward. When Cala and a primary source disagree, the primary source wins and the disagreement is logged here with a reproducible query."
        >
          Acceptance bar: ≥5 concrete coverage gaps with reproducible queries.
        </EmptyState>
      ) : (
        <p className="mt-8 text-muted">{gaps.length} coverage gaps documented.</p>
      )}
    </div>
  );
}
