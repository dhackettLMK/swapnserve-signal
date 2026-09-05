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
  Target counts trimmed accordingly — ~8 partners, ~15 funders (vs the brief's
  ≥12 / ≥25). Ingestion may span two calendar months.
