import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CreditMeter } from "@/components/CreditMeter";
import { ProvenanceChip } from "@/components/ProvenanceChip";
import { EntityWorkflowDiagram } from "@/components/EntityWorkflowDiagram";
import type { Provenance } from "@/lib/schema/provenance";

export const metadata: Metadata = { title: "How it works" };

const demoProvenance: Provenance = {
  calaTool: "entity_retrieval",
  input: "Analog Devices → properties[registered_address, employee_count]",
  entityUuid: "00000000-0000-0000-0000-000000000000",
  sourceUrls: ["https://cala.ai"],
  sourceTitles: ["Cala knowledge graph (illustrative)"],
  retrievedAt: "2026-09-05T00:00:00.000Z",
  creditsSpent: 1,
  confidence: "verified",
  verifierNote: "Illustrative record — real chips appear once Phase 2 data lands.",
};

export default function HowItWorksPage() {
  return (
    <div className="space-y-14">
      <PageHeader
        eyebrow="For the curious — and for Cala"
        title="How it&rsquo;s built"
        intro={
          <>
            Signal treats Cala not as a search box with citations but as a knowledge graph. This
            page explains the architecture and the deliberate trade-offs behind it.
          </>
        }
      />

      <Section title="The problem, in two sentences">
        <p>
          Swap&rsquo;n&rsquo;Serve needs to win grants, land corporate partners, and get ahead of
          textile regulation — and to do it with numbers a funder&rsquo;s due diligence can&rsquo;t
          knock down. That means every fact needs a source, a timestamp, and a way to reproduce it,
          which is a data problem before it is a website problem.
        </p>
      </Section>

      <Section title="Why Cala rather than web search">
        <p>
          The work needs <strong>typed rows</strong> (to fill tables and drive a fit rubric),{" "}
          <strong>deterministic facts</strong> (the same query returns the same answer, so a figure
          can be committed and diffed over time), and <strong>entity identity</strong> (a company
          is a UUID with a schema, not a name to be fuzzy-matched across sources). A web search
          returns prose a human must re-verify; Cala returns structured, sourced facts. Where Cala
          doesn&rsquo;t model a domain — Irish grant programmes, for instance — we say so on the{" "}
          <a href="/limitations" className="text-accent hover:underline">
            limitations
          </a>{" "}
          page and fall back to primary-source verification.
        </p>
      </Section>

      <Section title="The entity workflow">
        <p className="mb-6">
          Most integrations only ever call a search endpoint. Signal uses the full workflow — and
          shows it. <span className="mono text-sm">entity_introspection</span> is the step people
          skip: one credit that returns the real field names and relationships, so retrieval
          projects exactly what exists instead of guessing and getting nulls.
        </p>
        <EntityWorkflowDiagram />
      </Section>

      <Section title="Provenance, on every fact">
        <p className="mb-4">
          No fact renders without a provenance record — the tool that produced it, the exact input
          sent, the entity UUID, the sources, the timestamp, and a confidence label. It looks like
          this (expand it):
        </p>
        <ProvenanceChip provenance={demoProvenance} />
      </Section>

      <Section title="Static-first, with a live demo (ADR-001)">
        <p>
          Cala returns verified, deterministic facts. Facts of that kind should be fetched once,
          committed to git, diffed over time, and re-verified on a schedule — not re-fetched on
          every page view. Committing them gives a version history of how the funding and regulatory
          landscape shifts month over month, means the site costs nothing to serve and survives a
          Cala outage, and keeps the whole thing inside a 100-credit budget. A single metered,
          rate-limited live endpoint lets a visitor watch the real thing work, and falls back to a
          cached answer when the daily cap is hit.
        </p>
      </Section>

      <Section title="The credit economy, in the open">
        <div className="max-w-md">
          <CreditMeter />
        </div>
      </Section>

      <Section title="A note on privacy">
        <p>
          Cala exposes people as entities. This site deliberately stays at company- and role-level —
          &ldquo;Head of Sustainability&rdquo; is fine, a named individual is not. Publishing a page
          of named, profiled individuals at Irish companies would be a GDPR problem regardless of
          the data being public elsewhere. Person-level research stays in a private operator layer
          and is never committed to this public repository.
        </p>
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-3 max-w-2xl leading-relaxed text-muted">{children}</div>
    </section>
  );
}
