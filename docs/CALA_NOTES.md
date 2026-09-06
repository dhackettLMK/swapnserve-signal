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

## Entity pass 2, 2026-09-06 (8 credits, Task 3 partners)

Reused the Company schema from the first pass (no second introspection), running
`entity_search` then a projected `entity_retrieval` on four targets across three
countries and three sectors: **Inditex** (Spain, fashion), **adidas** (Germany,
sportswear), **Carrefour** (France, grocery retail) and **SAP** (Germany,
software). Two credits each, eight in total.

- **`esg_policy` was populated for all four**, each individually sourced (GLEIF
  for identity and address, the company's own sustainability pages for the
  policy summary). No `knowledge_search` fallback was needed. This is the
  opposite of the first pass, where `ANALOG DEVICES INC` returned an empty
  `esg_policy`. Coverage is real but uneven, so it cannot be assumed present:
  large, well-reported European issuers (Inditex, adidas, Carrefour, SAP,
  Primark, H&M, M&S) resolve richly; a US-headquartered entity did not.
- The projection (`name, legal_name, esg_policy, employee_count,
  headquarters_address, registered_address` plus outgoing `HAS_HEADQUARTERS_IN`)
  returned every field with its own source, exactly what the provenance model
  needs. `HAS_HEADQUARTERS_IN` resolved to a `CountrySubdivision` (Bayern,
  Essonne, Baden-Württemberg) for the German and French entities and to the
  `Country` (Spain) for Inditex, a small inconsistency in the graph's geography
  granularity worth noting.
- Numeric `employee_count` came back as an integer with a single market-data
  source, not the entity's own filing; treat as single-source for a headline
  figure even though the entity record itself is verified.
