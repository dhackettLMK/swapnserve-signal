# Deltas — where the brief was wrong or reality differed

Per BUILD_PROMPT.md: where this brief turns out to be wrong, that fact belongs
here, not in a silent correction.

## Phase 0

- **Cala entity types.** The live `entity_search` schema exposes an `entity_types`
  enum (Company, Person, Law, Industry, Product, Sanction, GPE, Country,
  PrivateCompanyFundingRound, FinancialMetric, MacroIndicator, …). There is **no
  "grant programme" / "funding scheme" entity type**. This supports the brief's
  own suspicion (§7.2) that Irish funders are unlikely to be modelled as
  entities — to be confirmed empirically in Phase 1. If confirmed, the funding
  module leans on `knowledge_search` + primary-source verification.
- **entity_retrieval verb.** BUILD_PROMPT §0 lists `GET /entities/{uuid}` for
  retrieval, but the live MCP tool documents projection retrieval as
  `POST /entities/{entity_id}` with a body. `lib/cala/client.ts` uses POST when a
  projection is supplied and GET otherwise. To be reconciled against
  `https://api.cala.ai/openapi.json` in Phase 1.
- **Stack versions.** Scaffolded on Next.js 16.3, React 19.2, Tailwind v4, Zod v4
  (newer than anything the brief assumed). No issues so far.
- **Credit reality.** Confirmed with the operator: free tier, 100 credits/month.
  Target counts trimmed accordingly, ~8 partners, ~15 funders (vs the brief's
  >=12 / >=25). Ingestion may span two calendar months.

## Cala pass, 2026-09-06 (10 credits)

- **Product pivot.** The operator reframed the site from a Swap'n'Serve-only tool
  to a tool any European nonprofit can use, with Swap'n'Serve as the worked demo.
  The homepage is now an analysis console. Same doctrine (provenance, credit
  discipline, no fabrication) applies unchanged.
- **EPR dates confirmed and made exact.** The brief's ~June 2027 / ~April 2028
  were right. Exact: adopted 10 Sep 2025, in force 16 Oct 2025, transpose by
  17 June 2027, schemes operational by 17 April 2028, micro-enterprise deferral
  to 17 April 2029, Commission review by 31 Dec 2029. Sourced to the EU
  Commission and an Irish gov.ie Circular Textiles roadmap.
- **entity_retrieval verb.** POST with a projection body works (as the live tool
  docs said), returning per-property sources. The §0 brief's GET is superseded.
- **esg_policy is a real property** on Company entities, sourced, and directly
  useful for the partner module. But coverage is uneven (Primark rich, Analog
  Devices Inc empty), logged as a coverage gap.
- **Funders are not entities**, confirming the Phase 0 suspicion. Funding uses
  knowledge_search plus primary-source deadline checks.
- **Self-reported Swap'n'Serve figures** (kg diverted, events) not yet ingested;
  swapnserve.com was not reachable to read them in this pass. Impact ships as the
  cited calculator until those are added, clearly as self-reported estimates.
