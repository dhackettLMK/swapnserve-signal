# SIGNAL — Remaining-credits brief (Phase 6+)

> Paste this as your first message in a fresh Claude Code session at the repo
> root, with the Cala MCP connected. Read it in full, then work the tasks in
> order. Stop at each task boundary and show what you have. This brief inherits
> every rule in `BUILD_PROMPT.md`, `DESIGN.md`, `CLAUDE.md`, `docs/DECISIONS.md`
> and `docs/CALA_NOTES.md`. Where they conflict, the earlier docs win and you
> record the conflict in `docs/DELTAS.md`.

## 0. State you are starting from

Signal is a deployed, Cala-powered tool for European nonprofits: a browsable
console filters a committed, tagged signal pool (`lib/console-data.ts`) by
country x sector across four lenses (funding, policy, partners, impact), and
every item carries a follow-up link, a source, a confidence label and the Cala
tool behind it. The design system is "Machined Ink" (`DESIGN.md`): ink on warm
ground, one deep-green signal colour reserved for the primary action and the
single live number, machined surfaces from a fixed shadow kit. **39 of 100
Cala credits have been spent this month**, all recorded in
`data/_meta/credit-ledger.json` and `data/_meta/query-log.jsonl`.

## 1. Objective

Spend the remaining budget to (A) make the tool materially more useful and
actionable for a real nonprofit, and (B) strengthen the case to Cala that the
builder understands the product. Build for A; B follows.

## 2. Hard constraints (do not violate)

1. **Provenance or it does not render.** Every new fact is a cited signal with
   `sourceUrl`, `confidence` and `via`. No provenance, no publication.
2. **No fabrication.** No invented deadlines, amounts, benchmark numbers or
   citations. An honest gap beats a figure you cannot defend. Where a figure is
   not verified, label it `single-source` or `inferred`, never `verified`.
3. **Credit discipline.** Before any pipeline run, print the planned credit cost
   and stop for confirmation if it exceeds 15. Append every call to
   `query-log.jsonl` and meter it in `credit-ledger.json`. Never call Cala twice
   with the same input in one run. Keep single-clause `knowledge_search` inputs
   (compound questions are rejected and still cost a credit). Introspect an
   entity type once, then reuse the schema.
4. **Stay in budget.** Do not exceed 100 credits for the month, and **hold ~8 in
   reserve** for the live demo and the first monthly refresh. Target ≤ 45 more.
5. **Design fidelity.** Render everything through existing components and tokens.
   No new colours, no new shadow recipes, no second green, no emoji, single-ink
   1.5px icons only. British/Irish English. No em dashes anywhere.
6. **The Cala key is server-only.** Never in a client bundle. The `postbuild`
   scan must stay green.
7. **Gmail: drafts only, never send.** Outreach and the Cala note land in drafts.
8. **Public site stays company- and role-level.** No named individuals (GDPR).

## 3. Tasks, in priority order

Each task ends with a commit whose message states what became true, and a green
`npm run build` (validate + typecheck + source and bundle secret scans).

### Task 1 — Benchmark: Cala vs web search (~20 credits). Do this first.

The strongest interview artefact and the one unbuilt module. Fill `/benchmark`
from committed JSON (`data/benchmark/latest.json`, schema `BenchmarkRun` already
defined in `lib/schema/benchmark.ts`).

- **Question set.** 25 questions, roughly 6 per domain (funding, policy,
  partners, impact), drawn from this tool's real domain (Irish and EU
  nonprofit funding, textile EPR and related regulation, Mid-West / EU corporate
  commitments, reuse and social-value impact factors). Mix lookup, filter and
  synthesis questions.
- **Ground truth.** Establish the correct answer for each question by hand from a
  primary source first, and record `groundTruth` and `groundTruthSourceUrl`.
- **Method.** Ask each question of (a) Cala (`knowledge_search` or
  `knowledge_query`, whichever fits) and (b) plain web search. For each, record
  `tokensConsumed` (estimate consistently and state the method), `latencyMs`,
  `citationReturned` (boolean), `correct` (graded against ground truth), and a
  short `answerSummary`. Cala's public claim is roughly 8x fewer tokens than web
  search; test it and report what you find, including any result that does not
  replicate or that favours web search.
- **Credit note.** The Cala side is ~25 calls. If that breaches the running
  budget, cut to 20 questions (5 per domain) and say so. The web-search side
  costs no Cala credits.
- **Render.** A results table plus per-domain summaries, in Machined Ink, with a
  methodology section stated well enough to reproduce. Publish losses plainly.
- **Accept.** `/benchmark` renders the committed run; a reader could rerun it;
  at least one honest limitation of Cala is surfaced.

### Task 2 — Widen the country coverage (~12 credits).

For each of Portugal, Poland, Sweden, Italy, Belgium and Denmark, one
single-clause `knowledge_search` for national community/nonprofit funding. Add
2 to 3 tagged funding signals per country to `SIGNALS` in
`lib/console-data.ts` (geography = the country; causes tagged; real apply URL;
confidence honest). Add each country to `COUNTRIES` and give it a flag in
`components/CountryFlag.tsx`.

- **Accept.** Changing the country to any of the six returns national results,
  not only EU-wide fallbacks; flags render; build green.

### Task 3 — More partners across countries and sectors (~10 credits).

Run the full entity workflow (`entity_search` then `entity_retrieval`, reusing
the Company schema) on 3 to 4 more targets: at least one major employer or
retailer with a citable commitment in France, Germany and Spain, and at least
one non-circular-sector target. Add each as a `partners` signal with a real
contact route and its `esg_policy` or a `knowledge_search`-sourced commitment.
Where `esg_policy` is empty, fall back to `knowledge_search` and log the gap.

- **Accept.** The partners lens is populated for more than one sector and more
  than one country; every partner has a contact link and a cited commitment.

### Task 4 — Verify deadlines and eligibility (~8 credits, mostly free web).

For the top ~12 funding signals, confirm the current round dates and whether an
unincorporated body can apply, against the funder's own page (primary source,
usually free). Update the signal detail and confidence. Downgrade anything that
cannot be confirmed rather than asserting it.

- **Accept.** No funding signal claims a specific deadline or eligibility that a
  primary source does not support; unverified ones are labelled as such.

### Task 5 — Limitations page and the Cala note (~2 credits).

Turn `data/_meta/coverage-gaps.json` (add any new gaps found above) into a fully
rendered `/limitations` page with reproducible queries, and draft the same
write-up to `heyeli@cala.ai` as a **Gmail draft only**. Cover, with evidence:
uneven `esg_policy` coverage, no site-level entity for operating locations, no
funding-scheme entity type, and any country or sector where Cala was thin.

- **Accept.** At least five concrete, reproducible gaps on `/limitations`; a
  Gmail draft exists; nothing is sent.

### Reserve (~8 credits). Do not spend without asking.

For wiring the metered live `/api/ask` demo (server-side key, daily ceiling,
honest degradation) and the first scheduled monthly refresh.

## 4. Method, per Cala doctrine (§7 of BUILD_PROMPT)

- `knowledge_query` for anything that fills a table or calculation; `knowledge_
  search` for narrative. Never parse a search answer into structured data.
- New entity type: `entity_search` then `entity_introspection` then
  `entity_retrieval`. Log introspection results to `docs/CALA_NOTES.md`.
- Write QL first, fall back to natural language, and record which worked.
- When Cala and a primary source disagree, the primary source wins and the
  disagreement goes in `coverage-gaps.json`.

## 5. Definition of done

- `/benchmark` and `/limitations` are populated from committed JSON and read
  honestly, including any result unfavourable to Cala.
- The console returns national results for at least twelve countries, and the
  partners lens spans more than one sector and country.
- Every rendered fact is traceable to a logged Cala call or a primary source.
- The Cala note is drafted to `heyeli@cala.ai` (not sent).
- Total monthly credit spend is recorded, under 100, with a reserve intact.
- `npm run build` is green; Lighthouse stays high; the site works on a phone;
  one green per view holds; all display type is at minus two percent tracking.

## 6. First message to send after reading this

> Read docs/NEXT_PHASE.md in full. Confirm the Cala MCP is connected and report
> the current credit total from the ledger. Then start Task 1 (the benchmark):
> propose the 25 questions and your token-measurement method, tell me the
> planned credit cost, and wait for my go before spending. Stop at each task
> boundary and show me what you have.
