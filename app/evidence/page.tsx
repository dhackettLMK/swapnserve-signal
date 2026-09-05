import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { loadEvidence } from "@/lib/data";

export const metadata: Metadata = { title: "Evidence" };

export default function EvidencePage() {
  const evidence = loadEvidence();

  return (
    <div>
      <PageHeader
        eyebrow="Citation library"
        title="Evidence"
        intro={
          <>
            The shared source of truth every provenance chip on the site points into. Each entry is
            checked periodically to confirm it still resolves.
          </>
        }
      />
      {evidence.length === 0 ? (
        <EmptyState
          phase="Phases 2–6"
          building="Populated as each module lands. Entries record the source, its kind (legislation, government, company report, research, NGO), which modules cite it, and its last resolve check."
        >
          Acceptance bar: every rendered fact traceable to an entry here and to a logged Cala query.
        </EmptyState>
      ) : (
        <p className="mt-8 text-muted">{evidence.length} sources catalogued.</p>
      )}
    </div>
  );
}
