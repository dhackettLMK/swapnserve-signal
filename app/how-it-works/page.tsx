import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { CreditMeter } from "@/components/CreditMeter";
import { ProvenanceChip } from "@/components/ProvenanceChip";
import { EntityWorkflowDiagram } from "@/components/EntityWorkflowDiagram";
import type { Provenance } from "@/lib/schema/provenance";

export const metadata: Metadata = { title: "How it works" };

const demoProvenance: Provenance = {
  calaTool: "entity_retrieval",
  input: "Analog Devices, properties [registered_address, employee_count]",
  entityUuid: "00000000-0000-0000-0000-000000000000",
  sourceUrls: ["https://cala.ai"],
  sourceTitles: ["Cala knowledge graph, illustrative"],
  retrievedAt: "2026-09-05T00:00:00.000Z",
  confidence: "verified",
  creditsSpent: 1,
  verifierNote: "Illustrative record. Real marks appear once Phase 2 data lands.",
};

export default function HowItWorksPage() {
  return (
    <div>
      <PageHeader
        eyebrow="For the curious, and for Cala"
        title="How it works"
        intro="Signal treats Cala as a knowledge graph, not a search box with citations. This page sets out the architecture and the deliberate trade-offs behind it."
      />

      <div className="mt-4">
        <Section n="01" title="The problem, in two sentences">
          <p>
            Swap&rsquo;n&rsquo;Serve needs to win grants, land corporate partners, and get ahead of
            textile regulation, with numbers a funder&rsquo;s due diligence cannot knock down. That
            is a data problem before it is a website problem: every fact needs a source, a
            timestamp, and a way to reproduce it.
          </p>
        </Section>

        <Section n="02" title="Why Cala rather than web search">
          <p>
            The work needs typed rows to fill tables and drive a fit score, deterministic facts so a
            figure can be committed and compared over time, and entity identity so a company is an
            identifier with a schema rather than a name matched across sources. A web search returns
            prose a human must re-verify. Cala returns structured, sourced facts. Where Cala does not
            model a domain, such as Irish grant programmes, that is stated on the limitations page
            and the work falls back to primary-source verification.
          </p>
        </Section>

        <Section n="03" title="The entity workflow">
          <p className="mb-6">
            Most integrations only ever call a search endpoint. Signal uses the full workflow and
            shows it. Introspection is the step people skip: one credit that returns the real field
            names and relationships, so retrieval projects exactly what exists instead of guessing
            and getting empty results.
          </p>
          <Reveal>
            <EntityWorkflowDiagram />
          </Reveal>
        </Section>

        <Section n="04" title="Provenance, on every fact">
          <p className="mb-4">
            No fact renders without a provenance record: the tool that produced it, the exact input
            sent, the entity identifier, the sources, the timestamp, and a confidence label. It
            looks like this. Open it.
          </p>
          <ProvenanceChip provenance={demoProvenance} />
        </Section>

        <Section n="05" title="Static first, with a live demo">
          <p>
            Cala returns verified, deterministic facts. Facts of that kind should be fetched once,
            committed to git, compared over time, and re-verified on a schedule, not fetched again on
            every page view. Committing them gives a version history of how the funding and
            regulatory landscape shifts month to month, means the site costs nothing to serve and
            survives an outage, and keeps the whole thing inside a hundred-credit budget. One metered,
            rate-limited endpoint lets a visitor watch the real thing work, and falls back to a
            cached answer when the daily cap is reached.
          </p>
        </Section>

        <Section n="06" title="The credit economy, in the open">
          <div className="max-w-md">
            <Reveal>
              <CreditMeter />
            </Reveal>
          </div>
        </Section>

        <Section n="07" title="A note on privacy">
          <p>
            Cala exposes people as entities. This site stays at company and role level. &ldquo;Head
            of Sustainability&rdquo; is fine, a named individual is not. Publishing a page of named,
            profiled individuals at Irish companies would be a data-protection problem regardless of
            the data being public elsewhere. Person-level research stays in a private operator layer
            and is never committed to this public repository.
          </p>
        </Section>
      </div>
    </div>
  );
}

function Section({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <Reveal>
      <section className="grid gap-3 border-b border-line py-9 sm:grid-cols-[3rem_1fr] sm:gap-8">
        <span className="font-mono text-sm text-faint">{n}</span>
        <div>
          <h2 className="text-xl font-medium tracking-tight">{title}</h2>
          <div className="mt-3 max-w-2xl leading-relaxed text-dim">{children}</div>
        </div>
      </section>
    </Reveal>
  );
}
