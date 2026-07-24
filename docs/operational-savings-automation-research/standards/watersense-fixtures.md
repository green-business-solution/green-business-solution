# STD-WATERSENSE-FIXTURES - WaterSense fixture performance

## 1. RetroFi role

This Standard is used by 2 categories and 4 category-local process instances.
The categories are ITC-32, ITC-33.
The process keys are exact-proposed-fixture-rating, requirement-proposed-fixture-rating.
The formula terms supplied are gpf_proposed, gpm_proposed.
The current claimed output set contains 4 distinct output descriptions.
The present automation limitation is: Existing fixture performance, public lavatory products outside the specification scope, and commercial usage frequency.

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-WATERSENSE-PROPOSED | WaterSense best management practices | Current page, exact guide version unpinned | UNVERIFIED | WaterSense at Work plumbing sections and product specifications |
| E-WATERSENSE-EXISTING-UNSUPPORTED | WaterSense commercial buildings | Current | UNSUPPORTED | No reviewed installed-baseline or commercial-frequency fixture |

## 2. Official source inventory

The primary organization is U.S. Environmental Protection Agency.
The selected official source is WaterSense Product Search and product specifications.
The pinned version is Live labeled-product search.
The release date or release state is Continuously updated.
The expected update cadence is Certification event based.
The license finding is EPA states WaterSense-published documents are public domain and asks for EPA WaterSense attribution.
The legal-review requirement is Review the Product Search data-service terms and WaterSense mark usage.

- https://www.epa.gov/watersense/product-search
- https://www.epa.gov/watersense/watersense-label
- https://www.epa.gov/watersense/watersense-frequently-asked-questions

## 3. What can actually be acquired

- Product Search web application
- Download full product list from the web application
- Product specification documents
- Operator export

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Product Search web application | https://www.epa.gov/watersense/product-search | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Live labeled-product search; Certification event based; UI route is change-prone | Human-mediated acquisition only; automate validation and import after export | The public page loaded, but the guessed full-list URL returned HTTP 404 and the application obtains an environment API key dynamically; no secret or environment endpoint was accessed |
| Download full product list from the web application | https://www.epa.gov/watersense/product-search | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Live labeled-product search; Certification event based; UI route is change-prone | Human-mediated acquisition only; automate validation and import after export | The public page loaded, but the guessed full-list URL returned HTTP 404 and the application obtains an environment API key dynamically; no secret or environment endpoint was accessed |
| Product specification documents | https://www.epa.gov/watersense/product-search | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Live labeled-product search; Certification event based; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| Operator export | https://www.epa.gov/watersense/product-search | Operator interaction; account requirement depends on the source UI | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Live labeled-product search; Certification event based; UI route is change-prone | Human-mediated acquisition only; automate validation and import after export | Not separately probed; retained as a documented alternative |

The tested access result is: The public page loaded, but the guessed full-list URL returned HTTP 404 and the application obtains an environment API key dynamically; no secret or environment endpoint was accessed.
The retained inspected artifact is Product Search access probe and public specification pages, HTML and manual export; source repository content is pinned by commit where applicable.
The access-cost classification is free with manual export.

## 4. Real source structure

The observed source-native fields or model inputs are:

- `product type`
- `brand`
- `model number`
- `certification status`
- `rated flow or flush volume`
- `specification version`
- `certification date`

These names are research requirements from the source inventory, not claims about an observed source schema.
Exact source types, units, enumerations, nullability, keys, workbook coordinates, or model declarations must come from the source-specific proof manifest under `scripts/research/operational-savings/adapters/watersense-fixtures/`.
If no proof manifest records direct inspection evidence, this Standard remains incomplete.

Product and record sources must preserve a natural source identifier plus a release identifier as the composite natural key.
Model sources must preserve the complete input schema, package version, configuration, warnings, and output schema.
Dates remain source-native timestamps in raw snapshots and normalize to UTC timestamps or date-only effective intervals in query tables.
Enumerations remain source-native in raw storage and map through versioned crosswalk rows.
Null means unknown or not reported and must never be converted to zero.
Withdrawn, expired, superseded, and inactive records remain historically retained but are excluded from current resolution by default.
Duplicate manufacturer and model strings are normalized for search only, while the original source text remains immutable.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Exact proposed fixture make and model from the linked opportunity | exact-proposed-fixture-rating; ITC-32, ITC-33 | Linked Opportunity | Annual Operational Savings > Annual Water and Heating-Resource Reduction > Flow Fixture Performance > Linked Opportunity names an exact flow fixture > Exact Flow Fixture Product Information | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Fixture type and application | exact-proposed-fixture-rating, requirement-proposed-fixture-rating; ITC-32, ITC-33 | Linked Opportunity | Annual Operational Savings > Annual Water and Heating-Resource Reduction > Flow Fixture Performance > Linked Opportunity names an exact flow fixture > Exact Flow Fixture Product Information | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Fixture requirements from the linked opportunity | requirement-proposed-fixture-rating; ITC-32, ITC-33 | Linked Opportunity | Annual Operational Savings > Annual Water and Heating-Resource Reduction > Flow Fixture Performance > Linked Opportunity specifies flow fixture requirements but no exact product > Flow Fixture Requirements | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Required water-use criterion | requirement-proposed-fixture-rating; ITC-32, ITC-33 | Linked Opportunity | Annual Operational Savings > Annual Water and Heating-Resource Reduction > Flow Fixture Performance > Linked Opportunity specifies flow fixture requirements but no exact product > Flow Fixture Requirements | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed rated flow with units and product provenance | exact-proposed-fixture-rating; ITC-32 | Product Search access probe and public specification pages | product type; brand; model number; certification status; rated flow or flush volume; specification version; certification date | normalized_flow_gpm = native_flow_gpm; normalized_flush_gallons = native_gpf; no installed baseline or usage frequency is derived from labeled-product records | gallons/minute | DIRECTLY_AVAILABLE | Existing fixture performance, public lavatory products outside the specification scope, and commercial usage frequency |
| One selected proposed rated flow, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally | requirement-proposed-fixture-rating; ITC-32 | Product Search access probe and public specification pages | product type; brand; model number; certification status; rated flow or flush volume; specification version; certification date | normalized_flow_gpm = native_flow_gpm; normalized_flush_gallons = native_gpf; no installed baseline or usage frequency is derived from labeled-product records | gallons/minute | DIRECTLY_AVAILABLE | Existing fixture performance, public lavatory products outside the specification scope, and commercial usage frequency |
| Proposed rated gallons per flush with units and product provenance | exact-proposed-fixture-rating; ITC-33 | Product Search access probe and public specification pages | product type; brand; model number; certification status; rated flow or flush volume; specification version; certification date | normalized_flow_gpm = native_flow_gpm; normalized_flush_gallons = native_gpf; no installed baseline or usage frequency is derived from labeled-product records | gallons/flush | DIRECTLY_AVAILABLE | Existing fixture performance, public lavatory products outside the specification scope, and commercial usage frequency |
| One selected proposed rated gallons per flush, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally | requirement-proposed-fixture-rating; ITC-33 | Product Search access probe and public specification pages | product type; brand; model number; certification status; rated flow or flush volume; specification version; certification date | normalized_flow_gpm = native_flow_gpm; normalized_flush_gallons = native_gpf; no installed baseline or usage frequency is derived from labeled-product records | gallons/flush | DIRECTLY_AVAILABLE | Existing fixture performance, public lavatory products outside the specification scope, and commercial usage frequency |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: normalized_flow_gpm = native_flow_gpm; normalized_flush_gallons = native_gpf; no installed baseline or usage frequency is derived from labeled-product records.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition workflow

```text
WaterSense Product Search and product specifications
-> Product Search web application
-> immutable raw snapshot
-> SHA-256 checksum and media-type validation
-> schema and enumeration validation
-> source-specific normalization and deduplication
-> equipment_products + equipment_certifications + equipment_performance_fields
-> deterministic watersense-fixtures adapter
-> typed formula input
-> calculation result with provenance
```

Acquisition runs under a scheduler or operator action and never during a customer estimate.
A failed checksum, schema drift, or incomplete artifact leaves the prior published release active.

## 7. Internal database schema

The intended normalized targets are equipment_products, equipment_certifications, equipment_performance_fields.
Implementation evidence must come from executed migrations and populated table counts in the committed compact proof export.
No generic per-Standard JSON payload table is claimed as an implemented source schema.
Each source-specific adapter must publish typed columns derived from its inspected native structure or remain incomplete.

## 8. Exact resolution

Identifiers are Unicode-normalized, trimmed, case-folded for search, and compared with punctuation-insensitive aliases only after exact original matching fails.
Manufacturer aliases and model aliases are versioned rows, never destructive edits.
Equipment class, capacity, geography, effective date, active status, source version, and test procedure are mandatory filters whenever the source exposes them.
An exact path must return one compatible active record.
Zero records returns a typed unavailable result.
Multiple compatible records return an ambiguity error unless the source defines a deterministic edition or submodel key.
The original identifier, matched alias, filters, and rejected candidates remain in provenance.

## 9. Requirements-based resolution

Mandatory filters are the category's explicit equipment class, performance requirement, capacity boundary, geography, date, active status, test-procedure version, and source release.
The eligible population contains only records satisfying every mandatory filter.
Inactive, withdrawn, superseded, incompatible-unit, missing-required-field, and cross-test-procedure records are excluded.
The source release is never mixed with another release inside one population.
A single eligible record may be selected directly.
Multiple eligible records use an official recommended value only when the source defines one, then a weighted median only when a defensible source weight exists, then an ordinary median only for a true scalar benchmark population.
Structured records and model result sets are never median-selected.

## 10. Benchmark resolution

The benchmark population must be authoritative, category-specific, unit-compatible, and filtered to the same context dimensions used by the formula.
The minimum sample size is five unless an official source explicitly publishes one typical value or a category-specific report approves a different threshold.
The weighting field must come from the source and is never inferred from record order.
The weighted median is the first value whose cumulative positive weight reaches at least half of total eligible weight after sorting by value.
The ordinary median is permitted only when no defensible weight exists and the population is an exchangeable scalar population.
The selected value retains filters, population size, sample size, method, fallback level, and uncertainty.
The unsupported boundary is Existing fixture performance, public lavatory products outside the specification scope, and commercial usage frequency.

## 11. Calculation or local-model execution

The exact output contract contains: Proposed rated flow with units and product provenance; One selected proposed rated flow, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally; Proposed rated gallons per flush with units and product provenance; One selected proposed rated gallons per flush, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally.
The governing source equation or transformation is normalized_flow_gpm = native_flow_gpm; normalized_flush_gallons = native_gpf; no installed baseline or usage frequency is derived from labeled-product records.
The local execution mode is Operator-assisted full-list export with automated schema validation and product normalization.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid effective dates, out-of-range physical values, or a mismatched model version.
Outputs retain their native unit and a normalized unit from the repository unit registry.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the raw-artifact checksum, source release, adapter version, input hash, model or formula version, and output hash.

## 12. Refresh and versioning

Refresh follows Certification event based.
Release detection compares official release metadata and artifact checksums.
A changed checksum under an unchanged source version is quarantined for review.
Schema drift compares columns, types, required fields, enumeration values, workbook sheets, or model input declarations against the prior accepted fingerprint.
Raw snapshots, normalized releases, crosswalks, and selection outputs are immutable.
Publication uses an atomic pointer to the accepted release.
Rollback changes only that pointer and records an operator reason.
Deprecated releases remain available for historical calculation replay.
Stale data is labeled and blocked when an effective-date or certification-status guarantee can no longer be made.

## 13. Runtime design

The selected runtime design is Operator-assisted full-list export with automated schema validation and product normalization.
The required number of external calls during a customer estimate is zero.
The adapter reads a published internal release or executes a pinned local model only.
If the source is offline, existing published releases and reproducible historical calculations continue to work.

## 14. Cost

One-time engineering effort is 70-120 hours.
Estimated raw storage is 0.5 GB.
Estimated published storage is 0.3 GB.
Refresh effort is 3-6 monthly plus operator time.
Maintenance burden is Medium.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.08 at 100 calculations per month, $0.12 at 1,000, and $0.40 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 15. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/watersense-fixtures.sample.json`.
Its local output kind is `input_set`, its selection rule is `MANDATORY_REQUIREMENTS_FILTER`, and its output unit is `product population`.
This synthetic regression executes without network access, but it does not prove acquisition, schema inspection, source-specific parsing, a real model run, database publication, or formula-term reachability.
Only the separate real-proof registry and source-backed tests may satisfy those gates.

## 16. Feasibility verdict

**FEASIBLE_AFTER_MANUAL_SEED**

The supported boundary is Exact or requirements-filtered proposed labeled fixtures after a retained official export.
The unsupported boundary is Existing fixture performance, public lavatory products outside the specification scope, and commercial usage frequency.

## 17. Final recommended strategy

Use the official full-list export through an operator workflow, validate the product-family schema, and publish only active compatible products and their native rated values.
This is the single recommended production path for this Standard.
The rejected alternative is: Reverse engineering the application's API key is rejected because the official export route is available and secrets are outside scope.

## 18. Potential later Information Card changes

No Information Card change is made on this research branch.
Later review may update the visible source version, fallback wording, input ownership, category scope, or status to match the supported boundary documented above.
Any formula change must be separately researched, reviewed, and approved.
Any fallback must name its authoritative population and exact numeric selection rule.
