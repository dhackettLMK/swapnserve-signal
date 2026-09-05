# Architecture Decision Records

Every non-obvious choice, with reasoning. Newest decisions appended.

---

## ADR-001 — Static-first, with a single metered live demo

**Status:** accepted (Phase 0)

**Context.** The site is powered by Cala on a 100-credit/month free tier. A
naive design would query Cala on every page view, which would (a) exhaust the
budget in a day, (b) make the site fail when Cala is slow or down, and (c) make
facts non-reproducible.

**Decision.** Cala returns verified, deterministic, typed facts. We fetch each
fact **once**, commit it to `data/*.json` with its provenance, validate it in
CI, and serve the site as static/cached content. Credits are spent only during
ingestion (by the operator, via the Cala MCP or ingest scripts) and through one
metered, rate-limited `/api/ask` endpoint. A page view costs **zero** credits.

**Consequences.**
- The repo's git history becomes a month-over-month record of how the funding
  and regulatory landscape changed — a feature no live-query app has.
- The site survives a Cala outage and stays inside budget.
- Facts can go stale; `scripts/verify.ts` (Phase 3+) re-checks citations, and a
  monthly refresh diffs and opens a PR.
- `/api/ask` must degrade honestly when its daily ceiling is hit (serve cached,
  say so) rather than error.

---

## ADR-002 — Provenance is a schema requirement, not a convention

**Status:** accepted (Phase 0)

**Context.** The site's operational value (grant due diligence) and its
interview value (a data company judging rigour) both depend on every fact being
traceable.

**Decision.** `Provenance` is a Zod schema (`lib/schema/provenance.ts`) and
`Fact<T>` pairs every value with one. Data in `data/` is validated against these
schemas at build time (`npm run validate`, wired into `prebuild`), so a fact
without a source, timestamp, tool, and confidence label cannot ship. The
`ProvenanceChip` component renders the record inline on every fact.

**Consequences.** More friction to add a fact (you must record where it came
from) — which is the point. Confidence is one of `verified` / `single-source` /
`inferred`; nothing is labelled `verified` on a single weak source.

---

## ADR-003 — Primary source is the backbone for policy dates; Cala is a supplement

**Status:** accepted (Phase 0)

**Context.** The regulatory anchors (Directive (EU) 2025/1892 textile EPR, the
2026 "Omnibus" CSRD narrowing, Irish transposition) are recent and legally
precise. A wrong transposition date would discredit the entire site to a funder,
and Cala's coverage of 2025–26 EU directives may be thin.

**Decision.** For the policy/EPR module, EUR-Lex and gov.ie primary sources are
authoritative; Cala is used for context and cross-checking. Such facts carry
`calaTool: "primary-source"` in their provenance. When Cala and a primary source
disagree, the primary source wins and the disagreement is logged to
`data/_meta/coverage-gaps.json` and surfaced on `/limitations`.

**Consequences.** The entity-workflow showcase is concentrated in the corporate
partner module (Phase 2), where Cala models the domain well. This is stated
honestly on `/how-it-works` rather than hidden.

---

## ADR-004 — Funding fit score rubric

**Status:** placeholder (defined in Phase 3)

The `fitScore` (0–100) on each `FundingOpportunity` will be a documented,
transparent rubric — weighting eligibility for an unincorporated body,
geography, amount vs effort, deadline proximity, and youth-led fit. Written up
in full here when Phase 3 lands, so no number is a black box.
