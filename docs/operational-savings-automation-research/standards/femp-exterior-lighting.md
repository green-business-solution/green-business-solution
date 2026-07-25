# STD-FEMP-EXTERIOR-LIGHTING - Exterior fixture wattage and proposed-product resolution

## 1. Canonical role and current process proof

This Standard is used by 1 category and 3 category-local process instances.
The categories are ITC-02.
The process keys are exact-new-fixture-watts, lighting-replacement-calculation, requirement-new-fixture-watts.
The formula terms supplied are annual_kWh, proposed_kW.
The canonical output set contains 3 distinct output descriptions.

| Category and process | Execution-verified proof level | Adapter | Actual adapter test result | Current blocker | Conditional next action |
| --- | --- | --- | --- | --- | --- |
| ITC-02/exact-new-fixture-watts | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/femp-lighting/run.mjs | femp-exterior-lighting-schema-publication-proof: NOT_COVERED<br>femp-exterior-lighting-source-boundary-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| ITC-02/requirement-new-fixture-watts | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/femp-lighting/run.mjs | femp-exterior-lighting-checksum-mutation-proof: NOT_COVERED<br>femp-exterior-lighting-offline-proof: NOT_COVERED<br>femp-exterior-lighting-requirement-mapping-proof: NOT_COVERED<br>femp-exterior-lighting-resolution-failure-proof: NOT_COVERED<br>femp-exterior-lighting-schema-mutation-proof: NOT_COVERED<br>femp-exterior-lighting-schema-publication-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| ITC-02/lighting-replacement-calculation | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/femp-lighting/run.mjs | femp-exterior-lighting-resolution-failure-proof: NOT_COVERED<br>itc02-lighting-composition-real-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## 2. Official source inventory

The primary organization is U.S. Department of Energy Federal Energy Management Program.
The selected official source is Purchasing Energy-Efficient Exterior Lighting.
The catalog acquisition target is Updated June 2023.
Its release date or release state is 2023-06.
The expected update cadence is Irregular procurement-guidance updates.
The license finding is Federal guidance; retain DOE FEMP attribution.
The legal-review requirement is Low.
These catalog values describe the planned source inventory and do not replace proof-manifest artifact identity.

- https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-FEMP-PROPOSED | FEMP Purchasing Energy-Efficient Exterior Lighting | Updated June 2023 | VERIFIED | Table 1 - Efficiency Requirements for Exterior Lighting |
| E-FEMP-WALL-EXAMPLE | FEMP Purchasing Energy-Efficient Exterior Lighting | Updated June 2023 | VERIFIED | Table 2 - Lifetime Savings for Efficient Wall-Mounted Luminaires and Performance Column assumptions |
| E-FEMP-EXISTING-UNSUPPORTED | Purchasing Energy-Efficient Exterior Lighting | Updated June 2023 | UNSUPPORTED | Tables 1 and 2 |

## 3. What can actually be acquired

- Public HTML tables
- Printable federal procurement guidance

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public HTML tables | https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | 148626 bytes observed; HTML; Route-specific source structure | Updated June 2023; Irregular procurement-guidance updates; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | The official page downloaded and Table 1 LER requirements and Table 2 wall-mounted example were inspected |
| Printable federal procurement guidance | https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Updated June 2023; Irregular procurement-guidance updates; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |

The tested access result is: The official page downloaded and Table 1 LER requirements and Table 2 wall-mounted example were inspected.
The planning catalog observation is FEMP exterior-lighting HTML, HTML, 148626 bytes, sha256:cb50171c667e44e0c8fe1681fac57fcfe22d6adffe6ba1229bd9d103b8fc547a.
The access-cost classification is completely free.

## 4. Proof-backed artifacts, releases, and schemas

The following table is generated from current proof contributions that explicitly name this Standard.
It reports retained artifact releases, versions, locators, and integrity values instead of treating the planning catalog observation as executed proof.

| Artifact ID | Evidence role | Retained release or version | Exact locator | Integrity | Current proof state | Bound processes |
| --- | --- | --- | --- | --- | --- | --- |
| artifact:doe-lmc-2015-tables:2017-11 | PUBLIC_XLSX_DOWNLOAD | 2015 baseline, November 2017 report tables | https://www.energy.gov/sites/default/files/2017/12/f46/LMC%202015%20Tables_0.XLSX | sha256:97c36f8d92a721dc2e3245215987d90c828314fa478050ea24c90c750c6fe5f1; 1112293 bytes | DOCUMENTATION_ONLY | ITC-02/lighting-replacement-calculation |
| artifact:femp-exterior-lighting:2026-07-23 | PUBLIC_HTML_TABLE | page snapshot acquired 2026-07-23; guidance updated June 2023 | https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting | sha256:cb50171c667e44e0c8fe1681fac57fcfe22d6adffe6ba1229bd9d103b8fc547a; 148626 bytes | DOCUMENTATION_ONLY | ITC-02/exact-new-fixture-watts, ITC-02/lighting-replacement-calculation, ITC-02/requirement-new-fixture-watts |

The current proof manifests record these inspected schemas:

| Schema ID | Artifact ID | Format | Extractor | Required native fields | Current proof state |
| --- | --- | --- | --- | --- | --- |
| schema:doe-lmc-2015:table-4-29 | artifact:doe-lmc-2015-tables:2017-11 | XLSX_TABLE_4_29 | scripts/research/operational-savings/adapters/context-benchmarks/inspect-schema.mjs | Table 4-29!A5:A13 outdoor subsectors; Table 4-29!L5:L13 average wattage per lamp or luminaire | DOCUMENTATION_ONLY |
| schema:femp-exterior-lighting:2026-07-23 | artifact:femp-exterior-lighting:2026-07-23 | HTML_TABLE | scripts/research/operational-savings/adapters/femp-lighting/inspect-schema.mjs | Category; Luminaire Efficacy Rating (LER) | DOCUMENTATION_ONLY |

Catalog-native field names that still require proof-backed inspection are:

- `application category`
- `required luminaire efficacy rating`
- `covered lumen range`
- `example luminaire power`
- `annual operating hours`
- `annual energy`

Null means unknown or not reported and must never be converted to zero.
Inactive, withdrawn, superseded, and historical records remain immutable and are excluded from current resolution unless an explicit historical query selects them.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Exact replacement product information from the linked opportunity | exact-new-fixture-watts; ITC-02 | Linked Opportunity | Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity names an exact replacement product > Exact Product Information | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Exterior lighting application | exact-new-fixture-watts, requirement-new-fixture-watts; ITC-02 | Linked Opportunity | Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity names an exact replacement product > Exact Product Information | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Product requirements from the linked opportunity | requirement-new-fixture-watts; ITC-02 | Linked Opportunity | Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity specifies requirements but no exact product > Product Requirements | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Required light output or performance criteria | requirement-new-fixture-watts; ITC-02 | Linked Opportunity | Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity specifies requirements but no exact product > Product Requirements | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Replacement fixture count | lighting-replacement-calculation; ITC-02 | User | Annual Operational Savings > Annual Electricity Reduction > Replacement Fixture Count | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing fixture watts | lighting-replacement-calculation; ITC-02 | Standard Output | Annual Operational Savings > Annual Electricity Reduction > Existing Fixture Watts > Standard 1.1 - Existing Fixture Wattage Benchmark | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed fixture watts from the exact-product process, when used | lighting-replacement-calculation; ITC-02 | Standard Output | Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity names an exact replacement product > Standard 1.2 - Exact New Fixture Wattage Lookup | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed fixture watts from the requirement-selected process, when used | lighting-replacement-calculation; ITC-02 | Standard Output | Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity specifies requirements but no exact product > Standard 1.3 - Requirement-Based New Fixture Wattage Resolution | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual operating hours from the fixed-schedule process, when used | lighting-replacement-calculation; ITC-02 | Standard Output | Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting follows a fixed or business schedule > Standard 2.1 - Fixed-Schedule Lighting Hours | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual operating hours from the daylight-based process, when used | lighting-replacement-calculation; ITC-02 | Standard Output | Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting is dusk-to-dawn or photocell-controlled > Standard 2.2 - Daylight-Based Lighting Hours | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed input power per fixture | exact-new-fixture-watts; ITC-02 | artifact:femp-exterior-lighting:2026-07-23 | application category; required luminaire efficacy rating; covered lumen range; example luminaire power; annual operating hours; annual energy | proposed_fixture_watts = required_lumens / qualifying_ler_lm_per_w; annual_kwh_reduction = fixture_count * (existing_watts - proposed_watts) * annual_hours / 1000 | kW/fixture | DERIVABLE_FROM_SOURCE | Existing fixture wattage inferred from FEMP proposed-efficiency requirements |
| Selected proposed input power per fixture | requirement-new-fixture-watts; ITC-02 | artifact:femp-exterior-lighting:2026-07-23 | application category; required luminaire efficacy rating; covered lumen range; example luminaire power; annual operating hours; annual energy | proposed_fixture_watts = required_lumens / qualifying_ler_lm_per_w; annual_kwh_reduction = fixture_count * (existing_watts - proposed_watts) * annual_hours / 1000 | kW/fixture | DERIVABLE_FROM_SOURCE | Existing fixture wattage inferred from FEMP proposed-efficiency requirements |
| Annual electricity reduction | lighting-replacement-calculation; ITC-02 | artifact:doe-lmc-2015-tables:2017-11; artifact:femp-exterior-lighting:2026-07-23 | application category; required luminaire efficacy rating; covered lumen range; example luminaire power; annual operating hours; annual energy | proposed_fixture_watts = required_lumens / qualifying_ler_lm_per_w; annual_kwh_reduction = fixture_count * (existing_watts - proposed_watts) * annual_hours / 1000 | kWh/year | DERIVABLE_FROM_SOURCE | Existing fixture wattage inferred from FEMP proposed-efficiency requirements |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: proposed_fixture_watts = required_lumens / qualifying_ler_lm_per_w; annual_kwh_reduction = fixture_count * (existing_watts - proposed_watts) * annual_hours / 1000.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition and internal publication

```text
Purchasing Energy-Efficient Exterior Lighting
-> Public HTML tables
-> immutable checksummed raw artifact
-> source-specific schema and enumeration validation
-> typed normalization into benchmark_values + equipment_performance_fields + calculation_assumptions
-> deterministic femp-exterior-lighting adapter
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

The exact output contract contains: Proposed input power per fixture; Selected proposed input power per fixture; Annual electricity reduction.
The governing source equation or transformation is proposed_fixture_watts = required_lumens / qualifying_ler_lm_per_w; annual_kwh_reduction = fixture_count * (existing_watts - proposed_watts) * annual_hours / 1000.
The selected runtime design is Small reviewed JSON lookup artifact plus deterministic lighting equation.
The required number of external calls during a customer estimate is zero.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid dates, impossible physical values, or a mismatched model version.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the source-artifact or content-addressed project-input identity, source release when applicable, adapter version, input hash, model or formula version, and output hash.

## 9. Refresh, immutable identity, and publication receipt

Refresh follows Irregular procurement-guidance updates.
Source IDs, release IDs, artifact IDs, project-input hashes, calculation IDs, and model-version IDs are content-bound identities.
An upsert may confirm an identical record but may not silently rewrite content behind one of those identities.
A source-backed dependency pins a source artifact and release, while a project-owned dependency may leave those fields null only when its exact input run and input SHA-256 carry the provenance.
Database publication builds the SQLite database, compact export, and receipt in temporary paths.
The publisher verifies byte sizes, SHA-256 values, and one generation ID before replacing the database and compact export, then renames the receipt last as the commit marker.
Consumers verify `docs/operational-savings-automation-research/fixtures/research-database.compact.json` against `docs/operational-savings-automation-research/fixtures/research-database.publication.json`.
A failed publication preserves the prior committed generation.

## 10. Cost

One-time engineering effort is 30-50 hours.
Estimated raw storage is 0.01 GB.
Estimated published storage is 0.001 GB.
Refresh effort is 2-4 per update.
Maintenance burden is Low.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.01 at 100 calculations per month, $0.02 at 1,000, and $0.08 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 11. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/femp-exterior-lighting.sample.json`.
Its local output kind is `model_result_set`, its selection rule is `PINNED_LOCAL_FORMULA:lightingAnnualSavings`, and its output unit is `kWh/year`.
This synthetic regression does not prove acquisition, source-specific parsing, a real model run, database publication, or category formula-term reachability.

## 12. Feasibility and supported boundary

**NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES**

This verdict is derived from 3 bound processes.
No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary.
The proof ledger records 0 end-to-end real processes, 0 source-verified processes, and 0 processes with genuine manual-export downstream proof.
The supported boundary is FEMP application categories and exact or requirements-matched proposed luminaires.
The unsupported boundary is Existing fixture wattage inferred from FEMP proposed-efficiency requirements.

## 13. Recommended strategy and later card review

Transcribe the seven application rows with page checksum and dual review, then resolve exact proposed power or a requirements-filtered qualifying product before applying the local hours equation.
The rejected alternative is: Using the FEMP less-efficient example as every site's existing fixture is rejected because it is an example, not an installed baseline.
No Information Card change is made on this research branch.
Later review may update visible source versions, fallback wording, ownership, category scope, or status only after the generated proof view supports the change.
Any formula change requires separate research, review, and approval.
