# Cala notes — QL patterns, entity schemas, what worked and what didn't

This file is an interview artifact. It records, with evidence, how Cala actually
models each of the four domains — populated from Phase 1 reconnaissance onward.

## Assumptions (to confirm in Phase 1)

- **Credits:** one credit ≈ one non-cached query. `entity_introspection` is one
  credit but saves credits downstream by revealing real field names (so
  `entity_retrieval` projects what exists instead of guessing and getting
  nulls). The `CalaClient` memoises on a hash of the input so the same call is
  never billed twice in one run.
- **Two inputs, two output shapes:** `knowledge_search` and `knowledge_query`
  accept the same input (NL or dot-notation QL); the endpoint, not the input,
  decides whether you get prose+citations or structured rows. Use query for
  anything that fills a table; search for narrative a human reads.

## QL patterns tested

_(Phase 1 will fill this table: pattern → worked? → notes.)_

| Domain | Pattern tried | QL or NL | Worked? | Notes |
| --- | --- | --- | --- | --- |
| _pending Phase 1_ | | | | |

## Entity schemas observed (from entity_introspection)

_(Phase 1 records the exact properties, relationships, and numerical
observations returned for: one Limerick multinational, one Irish retailer, one
Irish grant funder, one EU funding programme, one EU directive.)_

## Verdict per domain

_(Phase 1 acceptance: state which of the four domains Cala models well and which
it does not — this determines how the remaining phases are built.)_
