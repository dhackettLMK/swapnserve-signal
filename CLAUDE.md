# CLAUDE.md — standing instructions for the Signal repo

Regenerated at each phase boundary. Read `BUILD_PROMPT.md` for the full brief.

## What this is

A publicly deployed, Cala-powered intelligence layer for **Swap'n'Serve**, a
Limerick community initiative for clothing reuse. Two objectives, both binding:
(A) an operationally useful tool for grants / partners / EPR readiness; (B) a
portfolio piece that shows the Cala team you understand their product. Build for
A; B follows.

## Current state

- **Phase 0 complete.** Scaffold, schemas, Cala client, data layer, CI checks,
  ADRs, empty-state site.
- **Next: Phase 1** — Cala reconnaissance (~15 credits). Do not spend credits
  without stating the planned cost first and getting the go-ahead.

## Hard rules (do not violate)

1. **The Cala API key is server-only.** Never in a client component, never in
   `NEXT_PUBLIC_*`, never committed. `npm run check-secrets` and the `postbuild`
   bundle scan enforce this.
2. **Provenance or it doesn't render.** Every rendered fact is a `Fact<T>` with
   a `Provenance`. Data validates against Zod at build (`npm run validate`).
3. **No invented numbers, ever.** No fabricated impact totals, deadlines, or
   citations. An honest empty state beats a number you can't defend.
4. **No implied charity status.** Swap'n'Serve is unincorporated. Never state or
   imply registered-charity status, an RCN, a CHY number, or tax-deductible
   receipts. Describe it as "a Limerick community initiative".
5. **Company- and role-level only on the public site.** Never publish a named
   individual (GDPR). Person-level research stays in the private operator layer
   and is never committed to this public repo.
6. **A company on `/partners` is a research target, not a partner.** Label it so
   no visitor could read it as an implied endorsement.
7. **Credit discipline.** Print planned credit cost before any pipeline run;
   stop for confirmation if > 15. Log every call to
   `data/_meta/query-log.jsonl` and meter it in `credit-ledger.json`. Never call
   Cala twice with the same input in one run (the client memoises).
8. **Gmail: drafts only, never send.** Outreach lands in drafts for Dara to send
   himself.

## Cala tool doctrine (§7)

- `knowledge_query` for anything that fills a table/filter/calculation (typed
  rows). `knowledge_search` for narrative a human reads. Never parse a search
  markdown answer into structured data — if you need rows, ask for rows.
- New entity type: `entity_search` (name→UUID) → `entity_introspection`
  (UUID→schema) → `entity_retrieval` (UUID→typed data). Always introspect before
  retrieving. Log introspection results to `docs/CALA_NOTES.md`.
- Write QL first, fall back to NL, and record which worked in `CALA_NOTES.md`.

## Conventions

- Stack: Next.js 16 (App Router) + TS + Tailwind v4 + Zod v4. Package manager: npm.
- Schemas in `lib/schema/`; committed data in `data/`; loaders in `lib/data.ts`.
- Ingestion scripts in `scripts/ingest/` use `makeIngestClient()` so every call
  is logged + metered automatically.
- Commit at every phase boundary with a message describing what became true.
- Record brief errors in `docs/DELTAS.md`; decisions in `docs/DECISIONS.md`.

## Commands

- `npm run dev` — local dev
- `npm run verify` — typecheck + validate data + source secret scan
- `npm run build` — runs `prebuild` (validate + secrets) then build then
  `postbuild` (bundle secret scan)
