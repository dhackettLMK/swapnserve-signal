import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { loadPolicy } from "@/lib/data";

export const metadata: Metadata = { title: "Policy & EPR" };

export default function PolicyPage() {
  const milestones = loadPolicy();

  return (
    <div>
      <PageHeader
        eyebrow="Textile EPR"
        title="Policy & regulatory tracker"
        intro={
          <>
            The timeline from Directive (EU) 2025/1892 through Irish transposition to the ~2028
            textile-EPR go-live, tracking the social-economy exemption that protects operators like
            Swap&rsquo;n&rsquo;Serve — and what qualifying for it would require.
          </>
        }
      />
      {milestones.length === 0 ? (
        <EmptyState
          phase="Phase 4"
          building="Dates here are verified against EUR-Lex and gov.ie primary sources, with Cala as a supplement — a wrong transposition date would discredit the whole site to a funder, so primary source is the backbone (see docs/DECISIONS.md ADR-003)."
        >
          Acceptance bar: a dated, cited timeline; a one-page &ldquo;what incorporation
          unlocks&rdquo; brief; every date with a source.
        </EmptyState>
      ) : (
        <p className="mt-8 text-muted">{milestones.length} milestones loaded.</p>
      )}
    </div>
  );
}
