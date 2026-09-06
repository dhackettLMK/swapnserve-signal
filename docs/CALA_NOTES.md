# Cala notes, QL patterns, entity schemas, what worked and what did not

An interview artifact, recorded from the first reconnaissance pass (10 credits,
2026-09-06).

## Credits and behaviour, confirmed

- One credit per non-cached call, including calls that return nothing useful.
  A compound `knowledge_search` was rejected as "too complex" and still cost a
  credit. Lesson: decompose to a single clause before sending.
- `entity_introspection` is worth its one credit. Knowing the `Company` schema
  up front (see below) let the second company skip introspection and go straight
  to a projected `entity_retrieval`, saving a credit.
- `entity_retrieval` with a projection returns every property individually
  sourced (GLEIF, the company's own pages, Revelio Labs), which is exactly what
  the provenance model needs.

## Entity schema observed, Company (from entity_introspection)

Entity: `PRIMARK LIMITED` (4186dc73-fcec-4932-8aea-d658d3a420fd).

- properties: `lei, employee_count, esg_policy, headquarters_address,
  founding_date, aliases, legal_name, description, name, registered_address`
- relationships: outgoing `HAS_HEADQUARTERS_IN, IS_REGISTERED_IN`; incoming
  `IS_ULTIMATE_PARENT_OF, IS_MEMBER_OF, IS_DIRECT_PARENT_OF`
- numerical_observations: none for this company

`esg_policy` is the standout: a sourced prose summary of the company's published
commitments, ideal for the partner module. But it is unevenly populated (see
limitations): `ANALOG DEVICES INC` returned no `esg_policy` at all.

## Tool selection, per domain, as used

| Domain | Tool that worked | Why |
| --- | --- | --- |
| Corporate identity + ESG | entity_search → introspection → retrieval | typed, individually sourced fields; parent chain resolves (Primark → Wittington) |
| Corporate commitments when esg_policy empty | knowledge_search | rich, multi-source narrative (Analog Devices) |
| Irish funding schemes | knowledge_search | funders are not modelled as entities; gov.ie-sourced detail was excellent |
| EU regulation | knowledge_search (primary source cross-check) | exact dates and the social-economy exemption, cited to the EU Commission |
| Impact factors | knowledge_search | returned a spread of LCA figures with system boundaries |

## Verdict per domain

- **Corporates: strong.** The entity workflow is precise for company identity,
  addresses, headcount and parent chain, and `esg_policy` is excellent when
  present.
- **Funding: knowledge only.** No funding-scheme entity type. `knowledge_search`
  returns first-rate, sourced funding detail, so the gap is in the entity model,
  not the knowledge.
- **Regulation: strong via search, verify dates against primary source.** Exact
  transposition and scheme dates came back and matched the EU Commission.
- **Impact: usable, needs curation.** Figures span 2.4 to 25 kg CO2e per kg
  depending on system boundary and substitution assumption; the tool surfaced
  the range and the reasons it varies.

## QL note

Both endpoints accepted natural-language input cleanly. Dot-notation QL was not
required for these domains; the questions were narrative or entity-lookup shaped.
Worth testing QL filters (for example `companies.headquarters_location=Ireland.
employee_count>500`) in a later pass and recording precision here.
