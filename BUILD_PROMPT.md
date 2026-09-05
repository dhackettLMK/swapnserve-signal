# MASTER BUILD PROMPT — "SIGNAL"
### A publicly deployed, Cala-powered intelligence layer for Swap'n'Serve (Limerick, Ireland)

> **This is a condensed working copy** of the operating brief, distilled from the
> original paste so the repository is self-contained across sessions. It preserves
> every rule, constraint, phase, and acceptance bar, but abbreviates the long-form
> commentary. Replace it with your canonical full copy if you have one — and record
> any difference in `docs/DELTAS.md`.

---

## 0. INSTALL & PRECONDITIONS

Cala MCP — remote HTTP transport:

```bash
claude mcp add --transport http cala https://api.cala.ai/mcp/ \
  --header "X-API-KEY: $CALA_API_KEY"
```

Five tools must be live: `knowledge_search`, `knowledge_query`, `entity_search`,
`entity_introspection`, `entity_retrieval`.

REST equivalents (base `https://api.cala.ai/v1`, header `X-API-KEY`):
`POST /knowledge/query`, `POST /knowledge/search`, `POST /entities`,
`GET /entities/{uuid}`, `GET /entities/{uuid}/introspection`.
OpenAPI: `https://api.cala.ai/openapi.json`. Keys: `https://console.cala.ai/api-keys`.

**If any of the above has changed, trust the live docs over this file and record the delta in `docs/DELTAS.md`.**

## 1. WHO THIS IS FOR

Dara Hackett, 20, Limerick, Ireland. Founder of **Swap'n'Serve** (swapnserve.com)
— a Limerick community initiative that redistributes clean, usable clothing to
families in need via free swap events and donations, on a circular-fashion model.

**Current legal status: unincorporated and informal.** No CRO registration, no
Charities Regulator RCN, no Revenue CHY number.

## 2. THE DUAL OBJECTIVE

**A — Operational.** A system that materially improves Swap'n'Serve's ability to
win grants, land corporate partners, get ahead of textile regulation, and prove
impact with defensible numbers.

**B — Portfolio.** A publicly deployed web app (Vercel, linkable from Dara's
site) that is the centrepiece of a job interview with Cala. Build for A; B follows.

What impresses Cala, in rough priority: (1) the full entity workflow
(search → introspection → retrieval), shown in the UI; (2) knowing when to use
`knowledge_query` vs `knowledge_search`; (3) real Cala QL, documented;
(4) respecting the credit economy and showing the meter; (5) honesty about
coverage on a `/limitations` page (same write-up to heyeli@cala.ai);
(6) a reproducible benchmark vs web search.

## 3. PRE-VERIFIED RESEARCH FOUNDATION (re-verify in Phase 1)

**3.1 The key commercial fact.** Directive (EU) 2025/1892 amended the Waste
Framework Directive; in force 16 Oct 2025. Transpose within ~20 months (~June
2027); textile & footwear EPR schemes within ~30 months (~April 2028). Separate
textile collection mandatory. **Social-economy enterprises in second-hand textile
collection are exempted from EPR obligations, may run their own collection, and
have their textile waste managed at no cost by PROs.** Strategy: be the obvious
counterparty when Ireland stands up its textile PRO. Open question: how "social
economy enterprise" is defined in Irish transposition — an unincorporated
initiative may not qualify; a CLG or registered charity almost certainly does.

**3.2 ESG landscape shifted.** Directive (EU) 2026/470 ("Omnibus I"), in force
18 Mar 2026, narrowed CSRD/CSDDD. CSRD now bites at >1,000 employees AND >€450m
turnover; ~80% of previously in-scope companies fell out. Segment corporate
targets by: (a) genuinely in-scope large employers, (b) voluntary reporters,
(c) firms facing value-chain data requests. The email differs per segment.

**3.3 Irish legal groundwork.** Charities Act 2009 + Charities (Amendment) Act
2024; Charities Regulator registration; CLG via CRO; CHY exemption; Governance
Code; SORP. Also: Lobbying Act 2015, Vetting Bureau Acts, GDPR, textile hygiene.

**3.4 Funding universe (hypotheses — verify each).** Irish: Rethink Ireland,
Community Foundation Ireland, Circular Economy Innovation Grant Scheme, EPA Green
Enterprise, Pobal (SICAP/CSP), Dormant Accounts, Community Enhancement Programme,
Limerick City & County Council, LCDC, LEADER (Ballyhoura / West Limerick
Resources), LEO Limerick, Ireland Funds Young Leaders, Irish Youth Foundation,
Katharine Howard Foundation, St. Stephen's Green Trust, National Lottery.
EU: **European Solidarity Corps — Solidarity Projects (flag first; best fit for
a youth-led unincorporated initiative; Léargas)**, Erasmus+ KA152/KA154/KA210-YOU,
LIFE, Interreg, CERV, CCRI, Horizon Europe Cluster 6, EIT Climate-KIC. First
filter always: eligibility for an unincorporated applicant.

**3.5 Corporate targets (verify Mid-West presence + citable commitment).**
Mid-West employers: Analog Devices, Regeneron, Stryker, J&J/DePuy, Cook Medical,
Edwards Lifesciences, Dell, Northern Trust, Element Six, Lufthansa Technik, JLR,
Zimmer Biomet, Modular Automation, Aughinish Alumina, Irish Cement, Kostal, ESB,
Limerick Chamber, Shannon Group, Uber. Textile-obligated producers (EPR tier):
Primark/Penneys (ABF), Dunnes, Inditex, H&M, M&S, Brown Thomas Arnotts. Consumer
brands with Irish community funds: BOI, AIB, Vodafone, Three, Aviva, Zurich,
Circle K.

## 4. HARD CONSTRAINTS

1. Public deployment: Next.js (App Router) + TS + Tailwind on Vercel; mobile-ok.
2. The Cala API key never reaches the browser (server-side only; CI leak check).
3. Credit discipline: 100 credits/month; cached data by default; a page view
   costs zero credits; live demo is metered and rate-limited.
4. Provenance or it does not render (source URL, timestamp, tool, entity UUID).
5. No invented numbers, ever.
6. No implied charity status (unincorporated).
7. Person-level data stays private (§12.2).
8. Everything reproducible (every figure traces to a committed JSON record).

## 5. ARCHITECTURE

Two halves, one repo: `app/` (public, Vercel) + `data/` (committed knowledge
layer) + `lib/` (cala client, zod schemas, provenance) + `scripts/` (ingest,
verify, diff) + `.claude/` (private operator toolkit) + `docs/`.

Static-first with a live demo is a deliberate trade (ADR-001): Cala facts are
verified/deterministic/typed → fetch once, commit, diff, re-verify on a schedule;
site costs nothing to serve, survives outages, stays in budget. `/api/ask` is the
metered live demo.

## 6. DATA MODEL

`Provenance` on everything: `{ calaTool, input, entityUuid?, sourceUrls,
sourceTitles?, retrievedAt, creditsSpent, confidence, verifierNote? }`.
`Fact<T> = { value, provenance }`. Types: `PartnerTarget`, `FundingOpportunity`,
`PolicyMilestone`, `ImpactFactor` (with mandatory `systemBoundary` and
`substitutionRate`). Defined with Zod in `lib/schema/`, validated in CI.

## 7. CALA DOCTRINE

- `knowledge_query` for tables/filters/calculations; `knowledge_search` for
  narrative. Never parse a search answer into structured data.
- New entity type: `entity_search` → `entity_introspection` → `entity_retrieval`.
  Always introspect before retrieving. Log results to `docs/CALA_NOTES.md`.
- Write QL first, fall back to NL, record which worked.
- Credit discipline: print planned cost before a run (stop if >15); log every
  call to `data/_meta/query-log.jsonl`; memoise on input hash; `/api/ask` has a
  daily ceiling and degrades honestly.
- Verification: nothing reaches `data/` unverified; primary source wins over Cala
  on disagreement; disagreements → `coverage-gaps.json`.

## 8. PHASED PLAN

- **Phase 0** — Foundation (no credits): scaffold, schemas, client, data
  structure, CI checks, ADRs. Accept: empty site deploys green; `npm run
  validate` passes; a fake key in a client component fails the build.
- **Phase 1** — Cala recon (~15 credits): introspect one multinational, one Irish
  retailer, one grant funder, one EU programme, one EU directive; test 5 QL + 5
  NL. Accept: `CALA_NOTES.md` states which domains Cala models well.
- **Phase 2** — Partners (end-to-end). Accept: ≥8 verified targets across three
  segments; own-words commitments with resolving sources; attributed angles;
  three Gmail drafts; provenance chips.
- **Phase 3** — Funding pipeline. Accept: ≥15 opportunities with verified
  deadlines/eligibility, unincorporated-first; ESC Solidarity Projects assessed;
  ICS export.
- **Phase 4** — Policy & EPR tracker. Accept: dated cited timeline; "what
  incorporation unlocks" brief; every date sourced.
- **Phase 5** — Impact engine. Accept: ≥4 cited factors with boundary +
  uncertainty; calculator shows ranges; auditable methodology.
- **Phase 6** — Benchmark + limitations. Accept: reproducible run from committed
  JSON; ≥5 coverage gaps; write-up drafted to heyeli@cala.ai.
- **Phase 7** — Interview surface + polish. Accept: a Cala engineer landing cold
  understands what was built and why in 60 seconds.

Stop at each phase boundary and show the operator. Commit at each boundary.

## 12. GUARDRAILS

12.1 Do not misrepresent Swap'n'Serve (unincorporated; no charity status/RCN/CHY).
12.2 Person-level data stays out of the public site (company/role-level only).
12.3 No fabrication (impact totals, deadlines, citations).
12.4 No claimed relationships (targets ≠ partners; label clearly).
12.5 Secrets: key in Vercel env only; `.env.local` gitignored; CI leak check.
12.6 Be honest in the benchmark (publish losses).

## 13. DEFINITION OF DONE

Deployed on Vercel; four modules populated with verified cited committed data;
every fact traceable to a logged Cala query; metered live demo that degrades
honestly; reproducible benchmark; `/limitations` + email to heyeli@cala.ai;
Gmail drafts for top 3 targets + top 3 funds; monthly refresh scheduled and
tested; all four docs written; credit spend recorded and under budget;
Lighthouse ≥95; keyboard navigable; works on a phone.

---

_Brief compiled September 2026; regulatory anchors to be re-verified in Phase 1._
