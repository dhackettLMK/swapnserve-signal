import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { loadPartners } from "@/lib/data";

export const metadata: Metadata = { title: "Partners" };

export default function PartnersPage() {
  const partners = loadPartners();

  return (
    <div>
      <PageHeader
        eyebrow="Research targets — not partners"
        title="Corporate targets"
        intro={
          <>
            Mid-West employers, Irish retailers, and textile-obligated producers, each with a
            specific public commitment quoted in their own words and a written approach angle.
            Company- and role-level only — never a named individual.
          </>
        }
      />
      {partners.length === 0 ? (
        <EmptyState
          phase="Phase 2"
          building="This module is the end-to-end showcase: entity_search → entity_introspection → entity_retrieval for each company, then a knowledge_search for its published commitments, all verified before they land here."
        >
          Acceptance bar: ≥8 verified targets across three segments; every commitment cited to a
          resolving source; each with an attributed angle; provenance chips on every fact.
        </EmptyState>
      ) : (
        <p className="mt-8 text-muted">{partners.length} targets loaded.</p>
      )}
    </div>
  );
}
