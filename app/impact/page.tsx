import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { loadImpactFactors, loadSelfReported } from "@/lib/data";

export const metadata: Metadata = { title: "Impact" };

export default function ImpactPage() {
  const factors = loadImpactFactors();
  const selfReported = loadSelfReported();

  return (
    <div>
      <PageHeader
        eyebrow="Defensible numbers"
        title="Impact calculator"
        intro={
          <>
            Enter kilograms of clothing diverted; get CO₂e avoided, water saved, landfill diverted
            and garments rehomed — as ranges, not point estimates. Every conversion factor states
            its system boundary and substitution-rate assumption, because a reused garment only
            avoids emissions if it displaces a new purchase, and never 1:1.
          </>
        }
      />
      {factors.length === 0 && !selfReported ? (
        <EmptyState
          phase="Phase 5"
          building="Conversion factors are drawn from peer-reviewed LCAs (e.g. Sandin & Peters) and cross-checked against WRAP, EEA and JRC primary sources — never a single secondary source. Swap'n'Serve's own kg/events figures will appear as clearly labelled self-reported estimates from swapnserve.com."
        >
          Acceptance bar: ≥4 factors, each with methodology URL, year, geography, boundary and
          uncertainty; a calculator that shows ranges; a plain-English &ldquo;how we calculate
          this&rdquo; a funder could audit.
        </EmptyState>
      ) : (
        <p className="mt-8 text-muted">{factors.length} factors loaded.</p>
      )}
    </div>
  );
}
