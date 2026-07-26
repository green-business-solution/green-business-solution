# STD-WATERSENSE-FIXTURES - WaterSense fixture performance

## 1. Canonical role and current process proof

This Standard is used by 2 categories and 4 category-local process instances.
The categories are ITC-32, ITC-33.
The process keys are exact-proposed-fixture-rating, requirement-proposed-fixture-rating.
The formula terms supplied are gpf_proposed, gpm_proposed.
The canonical output set contains 4 distinct output descriptions.

| Category and process | Execution-verified proof level | Adapter | Actual adapter test result | Current blocker | Conditional next action |
| --- | --- | --- | --- | --- | --- |
| ITC-32/exact-proposed-fixture-rating | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/watersense-fixtures/operator-import.mjs | watersense-fixtures-access-boundary-proof: PASSED; scripts/research/operational-savings/tests/watersense-fixtures-operator.test.mjs :: pins the repository operator-import contract but not a product schema<br>watersense-fixtures-acquisition-path-failure-proof: PASSED; scripts/research/operational-savings/tests/watersense-fixtures-operator.test.mjs :: rejects secret-derived or guessed acquisition paths<br>watersense-fixtures-operator-contract: PASSED; scripts/research/operational-savings/tests/watersense-fixtures-operator.test.mjs :: rejects incomplete mappings and unsupported unit claims | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| ITC-32/requirement-proposed-fixture-rating | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/watersense-fixtures/operator-import.mjs | watersense-fixtures-access-boundary-proof: PASSED; scripts/research/operational-savings/tests/watersense-fixtures-operator.test.mjs :: pins the repository operator-import contract but not a product schema<br>watersense-fixtures-acquisition-path-failure-proof: PASSED; scripts/research/operational-savings/tests/watersense-fixtures-operator.test.mjs :: rejects secret-derived or guessed acquisition paths<br>watersense-fixtures-operator-contract: PASSED; scripts/research/operational-savings/tests/watersense-fixtures-operator.test.mjs :: rejects incomplete mappings and unsupported unit claims | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| ITC-33/exact-proposed-fixture-rating | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/watersense-fixtures/operator-import.mjs | watersense-fixtures-access-boundary-proof: PASSED; scripts/research/operational-savings/tests/watersense-fixtures-operator.test.mjs :: pins the repository operator-import contract but not a product schema<br>watersense-fixtures-acquisition-path-failure-proof: PASSED; scripts/research/operational-savings/tests/watersense-fixtures-operator.test.mjs :: rejects secret-derived or guessed acquisition paths<br>watersense-fixtures-operator-contract: PASSED; scripts/research/operational-savings/tests/watersense-fixtures-operator.test.mjs :: rejects incomplete mappings and unsupported unit claims | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| ITC-33/requirement-proposed-fixture-rating | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/watersense-fixtures/operator-import.mjs | watersense-fixtures-access-boundary-proof: PASSED; scripts/research/operational-savings/tests/watersense-fixtures-operator.test.mjs :: pins the repository operator-import contract but not a product schema<br>watersense-fixtures-acquisition-path-failure-proof: PASSED; scripts/research/operational-savings/tests/watersense-fixtures-operator.test.mjs :: rejects secret-derived or guessed acquisition paths<br>watersense-fixtures-operator-contract: PASSED; scripts/research/operational-savings/tests/watersense-fixtures-operator.test.mjs :: rejects incomplete mappings and unsupported unit claims | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## 2. Official source inventory

The primary organization is U.S. Environmental Protection Agency.
The selected official source is WaterSense Product Search and product specifications.
The catalog acquisition target is Live labeled-product search.
Its release date or release state is Continuously updated.
The expected update cadence is Certification event based.
The license finding is EPA states WaterSense-published documents are public domain and asks for EPA WaterSense attribution.
The legal-review requirement is Review the Product Search data-service terms and WaterSense mark usage.
These catalog values describe the planned source inventory and do not replace proof-manifest artifact identity.

- https://www.epa.gov/watersense/product-search
- https://www.epa.gov/watersense/watersense-label
- https://www.epa.gov/watersense/watersense-frequently-asked-questions

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-WATERSENSE-PROPOSED | WaterSense best management practices | Current page, exact guide version unpinned | UNVERIFIED | WaterSense at Work plumbing sections and product specifications |
| E-WATERSENSE-EXISTING-UNSUPPORTED | WaterSense commercial buildings | Current | UNSUPPORTED | No reviewed installed-baseline or commercial-frequency fixture |

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
The planning catalog observation is Product Search access probe and public specification pages, HTML and manual export; no artifact checksum is recorded in the planning catalog.
The access-cost classification is free with manual export.

## 4. Proof-backed artifacts, releases, and schemas

The following table is generated from current proof contributions that explicitly name this Standard.
It reports retained artifact releases, versions, locators, and integrity values instead of treating the planning catalog observation as executed proof.

| Artifact ID | Evidence role | Retained release or version | Exact locator | Integrity | Current proof state | Bound processes |
| --- | --- | --- | --- | --- | --- | --- |
| artifact:watersense-product-search-access-probe:2026-07-23 | PUBLIC_HTML_ACCESS_PROBE | Product Search page acquired 2026-07-23 | https://www.epa.gov/watersense/product-search | sha256:25b7f23f3a094c0eb81bc52510977672da547984709ec85be55c64c20db72ce4; 55399 bytes | DOCUMENTATION_ONLY | ITC-32/exact-proposed-fixture-rating, ITC-32/requirement-proposed-fixture-rating, ITC-33/exact-proposed-fixture-rating, ITC-33/requirement-proposed-fixture-rating |

The current proof manifests record these inspected schemas:

| Schema ID | Artifact ID | Format | Extractor | Required native fields | Current proof state |
| --- | --- | --- | --- | --- | --- |
| None inspected | None | None | None | None | DOCUMENTATION_ONLY |

Catalog-native field names that still require proof-backed inspection are:

- `product type`
- `brand`
- `model number`
- `certification status`
- `rated flow or flush volume`
- `specification version`
- `certification date`

Null means unknown or not reported and must never be converted to zero.
Inactive, withdrawn, superseded, and historical records remain immutable and are excluded from current resolution unless an explicit historical query selects them.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Exact proposed fixture make and model from the linked opportunity | exact-proposed-fixture-rating; ITC-32, ITC-33 | Linked Opportunity | Annual Operational Savings > Annual Water and Heating-Resource Reduction > Flow Fixture Performance > Linked Opportunity names an exact flow fixture > Exact Flow Fixture Product Information | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Fixture type and application | exact-proposed-fixture-rating, requirement-proposed-fixture-rating; ITC-32, ITC-33 | Linked Opportunity | Annual Operational Savings > Annual Water and Heating-Resource Reduction > Flow Fixture Performance > Linked Opportunity names an exact flow fixture > Exact Flow Fixture Product Information | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Fixture requirements from the linked opportunity | requirement-proposed-fixture-rating; ITC-32, ITC-33 | Linked Opportunity | Annual Operational Savings > Annual Water and Heating-Resource Reduction > Flow Fixture Performance > Linked Opportunity specifies flow fixture requirements but no exact product > Flow Fixture Requirements | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Required water-use criterion | requirement-proposed-fixture-rating; ITC-32, ITC-33 | Linked Opportunity | Annual Operational Savings > Annual Water and Heating-Resource Reduction > Flow Fixture Performance > Linked Opportunity specifies flow fixture requirements but no exact product > Flow Fixture Requirements | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed rated flow with units and product provenance | exact-proposed-fixture-rating; ITC-32 | artifact:watersense-product-search-access-probe:2026-07-23 | product type; brand; model number; certification status; rated flow or flush volume; specification version; certification date | normalized_flow_gpm = native_flow_gpm; normalized_flush_gallons = native_gpf; no installed baseline or usage frequency is derived from labeled-product records | gallons/minute | DIRECTLY_AVAILABLE | Existing fixture performance, public lavatory products outside the specification scope, and commercial usage frequency |
| One selected proposed rated flow, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally | requirement-proposed-fixture-rating; ITC-32 | artifact:watersense-product-search-access-probe:2026-07-23 | product type; brand; model number; certification status; rated flow or flush volume; specification version; certification date | normalized_flow_gpm = native_flow_gpm; normalized_flush_gallons = native_gpf; no installed baseline or usage frequency is derived from labeled-product records | gallons/minute | DIRECTLY_AVAILABLE | Existing fixture performance, public lavatory products outside the specification scope, and commercial usage frequency |
| Proposed rated gallons per flush with units and product provenance | exact-proposed-fixture-rating; ITC-33 | artifact:watersense-product-search-access-probe:2026-07-23 | product type; brand; model number; certification status; rated flow or flush volume; specification version; certification date | normalized_flow_gpm = native_flow_gpm; normalized_flush_gallons = native_gpf; no installed baseline or usage frequency is derived from labeled-product records | gallons/flush | DIRECTLY_AVAILABLE | Existing fixture performance, public lavatory products outside the specification scope, and commercial usage frequency |
| One selected proposed rated gallons per flush, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally | requirement-proposed-fixture-rating; ITC-33 | artifact:watersense-product-search-access-probe:2026-07-23 | product type; brand; model number; certification status; rated flow or flush volume; specification version; certification date | normalized_flow_gpm = native_flow_gpm; normalized_flush_gallons = native_gpf; no installed baseline or usage frequency is derived from labeled-product records | gallons/flush | DIRECTLY_AVAILABLE | Existing fixture performance, public lavatory products outside the specification scope, and commercial usage frequency |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: normalized_flow_gpm = native_flow_gpm; normalized_flush_gallons = native_gpf; no installed baseline or usage frequency is derived from labeled-product records.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition and internal publication

```text
WaterSense Product Search and product specifications
-> Product Search web application
-> immutable checksummed raw artifact
-> source-specific schema and enumeration validation
-> typed normalization into equipment_products + equipment_certifications + equipment_performance_fields
-> deterministic watersense-fixtures adapter
-> typed Standard output
-> category formula mapping
-> immutable calculation and provenance
```

Acquisition runs under a scheduler or approved operator action and never during a customer estimate.
A failed checksum, schema validation, normalization, or publication step leaves the prior accepted release and publication receipt active.
Implementation evidence must come from executed migrations, populated table counts, exact artifact identities, and the committed compact proof publication.

## 7. Resolution rules

Exact resolution requires one compatible active record after applying every source-supported identity, equipment class, capacity, geography, effective-date, and test-procedure filter.
Zero compatible records returns a typed unavailable result.
Multiple compatible records return an ambiguity error unless the source defines a deterministic edition or submodel key.
Requirements resolution admits only records satisfying every mandatory project and category constraint from one source release.
Benchmark resolution requires an authoritative, category-specific, unit-compatible population and a retained numeric selection rule.
An official recommended value takes precedence, followed by a defensible source-weighted median, then an ordinary median only for an exchangeable scalar population.
Structured records and model result sets are never median-selected.
Every selection retains its filters, eligible population, sample size, method, fallback level, uncertainty, and rejected candidates.

## 8. Calculation and runtime execution

The exact output contract contains: Proposed rated flow with units and product provenance; One selected proposed rated flow, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally; Proposed rated gallons per flush with units and product provenance; One selected proposed rated gallons per flush, with the eligible compatible fixture population, selection rule, units, and source provenance retained internally.
The governing source equation or transformation is normalized_flow_gpm = native_flow_gpm; normalized_flush_gallons = native_gpf; no installed baseline or usage frequency is derived from labeled-product records.
The selected runtime design is Operator-assisted full-list export with automated schema validation and product normalization.
The required number of external calls during a customer estimate is zero.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid dates, impossible physical values, or a mismatched model version.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the source-artifact or content-addressed project-input identity, source release when applicable, adapter version, input hash, model or formula version, and output hash.

## 9. Refresh, immutable identity, and publication receipt

Refresh follows Certification event based.
Source IDs, release IDs, artifact IDs, project-input hashes, calculation IDs, and model-version IDs are content-bound identities.
An upsert may confirm an identical record but may not silently rewrite content behind one of those identities.
A source-backed dependency pins a source artifact and release, while a project-owned dependency may leave those fields null only when its exact input run and input SHA-256 carry the provenance.
Database publication builds the SQLite database, compact export, and receipt in temporary paths.
The publisher verifies byte sizes, SHA-256 values, and one generation ID before replacing the database and compact export, then renames the receipt last as the commit marker.
Consumers verify `docs/operational-savings-automation-research/fixtures/research-database.compact.json` against `docs/operational-savings-automation-research/fixtures/research-database.publication.json`.
A failed publication preserves the prior committed generation.

## 10. Cost

One-time engineering effort is 70-120 hours.
Estimated raw storage is 0.5 GB.
Estimated published storage is 0.3 GB.
Refresh effort is 3-6 monthly plus operator time.
Maintenance burden is Medium.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.08 at 100 calculations per month, $0.12 at 1,000, and $0.40 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 11. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/watersense-fixtures.sample.json`.
Its local output kind is `input_set`, its selection rule is `MANDATORY_REQUIREMENTS_FILTER`, and its output unit is `product population`.
This synthetic regression does not prove acquisition, source-specific parsing, a real model run, database publication, or category formula-term reachability.

## 12. Feasibility and supported boundary

**NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES**

This verdict is derived from 4 bound processes.
No genuine official export reaches the complete source-to-Standard gate set, so an access probe or planned operator workflow is not counted as a manual seed.
The proof ledger records 0 end-to-end real processes, 0 source-verified processes, and 0 processes with genuine manual-export downstream proof.
The supported boundary is Exact or requirements-filtered proposed labeled fixtures after a retained official export.
The unsupported boundary is Existing fixture performance, public lavatory products outside the specification scope, and commercial usage frequency.

## 13. Recommended strategy and later card review

Use the official full-list export through an operator workflow, validate the product-family schema, and publish only active compatible products and their native rated values.
The rejected alternative is: Reverse engineering the application's API key is rejected because the official export route is available and secrets are outside scope.
No Information Card change is made on this research branch.
Later review may update visible source versions, fallback wording, ownership, category scope, or status only after the generated proof view supports the change.
Any formula change requires separate research, review, and approval.
