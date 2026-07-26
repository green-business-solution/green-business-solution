# STD-WATERSENSE-LANDSCAPE - WaterSense landscape water budget

## 1. Canonical role and current process proof

This Standard is used by 1 category and 1 category-local process instance.
The categories are ITC-34.
The process keys are watersense_landscape.
The formula terms supplied are baseline_design_allowance_gallons, proposed_design_allowance_gallons.
The canonical output set contains 2 distinct output descriptions.

| Category and process | Execution-verified proof level | Adapter | Actual adapter test result | Current blocker | Conditional next action |
| --- | --- | --- | --- | --- | --- |
| ITC-34/watersense_landscape | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/watersense-landscape/run.mjs | watersense-landscape-header-failure-proof: PASSED; scripts/research/operational-savings/tests/watersense-landscape-real.test.mjs :: fails closed when an observed native header drifts<br>watersense-landscape-input-failure-proof: PASSED; scripts/research/operational-savings/tests/watersense-landscape-real.test.mjs :: rejects missing Version 2.0 inputs and incompatible project units<br>watersense-landscape-real-workbook-proof: PASSED; scripts/research/operational-savings/tests/watersense-landscape-real.test.mjs :: executes the exact reviewed Version 2.0 method and reaches both ITC-34 terms | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## 2. Official source inventory

The primary organization is U.S. Environmental Protection Agency.
The selected official source is WaterSense Water Budget Tool Version 2.0.
The catalog acquisition target is Water Budget Tool Version 2.0.
Its release date or release state is Page updated 2026-03-10; climate workbook path dated 2020-10.
The expected update cadence is Irregular tool and climate-data updates.
The license finding is EPA-published WaterSense content is public domain with requested attribution.
The legal-review requirement is Confirm any source datasets embedded in the climate workbook.
These catalog values describe the planned source inventory and do not replace proof-manifest artifact identity.

- https://www.epa.gov/watersense/water-budget-tool
- https://www.epa.gov/sites/production/files/2020-10/ws-data-information-et-rainfall.xlsx

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-WATERSENSE-LANDSCAPE-DESIGN | EPA WaterSense Water Budget Tool Version 2.0 | Version 2.0 | VERIFIED | Water Budget Tool Version 2.0 and downloadable climate data |
| E-WATERSENSE-LANDSCAPE-ACTUAL-UNSUPPORTED | WaterSense Water Budget Tool | Version 2.0 | UNSUPPORTED | Tool scope statement |

## 3. What can actually be acquired

- Public web calculator
- Public full climate-data XLSX
- Water Budget data finder

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public web calculator | https://www.epa.gov/watersense/water-budget-tool | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Water Budget Tool Version 2.0; Irregular tool and climate-data updates; Monitor URL and checksum drift | Human-mediated acquisition only; automate validation and import after export | Not separately probed; retained as a documented alternative |
| Public full climate-data XLSX | https://www.epa.gov/sites/production/files/2020-10/ws-data-information-et-rainfall.xlsx | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | 10078683 bytes observed; XLSX; XLSX ZIP container | Water Budget Tool Version 2.0; Irregular tool and climate-data updates; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | The official 10.08 MB workbook downloaded; artifact-tool import exhausted the available inspection process twice, so bounded XLSX extraction is required |
| Water Budget data finder | https://www.epa.gov/watersense/water-budget-tool | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Water Budget Tool Version 2.0; Irregular tool and climate-data updates; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |

The tested access result is: The official 10.08 MB workbook downloaded; artifact-tool import exhausted the available inspection process twice, so bounded XLSX extraction is required.
The planning catalog observation is ws-data-information-et-rainfall.xlsx, XLSX, 10078683 bytes, sha256:77afb36cff3dcb77eacad4db34a8dba44bd48eb24485c886958afd58e1846273.
The access-cost classification is completely free.

## 4. Proof-backed artifacts, releases, and schemas

The following table is generated from current proof contributions that explicitly name this Standard.
It reports retained artifact releases, versions, locators, and integrity values instead of treating the planning catalog observation as executed proof.

| Artifact ID | Evidence role | Retained release or version | Exact locator | Integrity | Current proof state | Bound processes |
| --- | --- | --- | --- | --- | --- | --- |
| artifact:watersense-landscape:2020-10 | PUBLIC_XLSX_DOWNLOAD | climate workbook path dated 2020-10 | https://www.epa.gov/sites/production/files/2020-10/ws-data-information-et-rainfall.xlsx | sha256:77afb36cff3dcb77eacad4db34a8dba44bd48eb24485c886958afd58e1846273; 10078683 bytes | DOCUMENTATION_ONLY | ITC-34/watersense_landscape |

The current proof manifests record these inspected schemas:

| Schema ID | Artifact ID | Format | Extractor | Required native fields | Current proof state |
| --- | --- | --- | --- | --- | --- |
| schema:watersense-landscape:2020-10 | artifact:watersense-landscape:2020-10 | XLSX | scripts/research/operational-savings/adapters/watersense-landscape/inspect-schema.mjs | About!A1; About!A2; About!C5; About!B6; About!B7; Peak_Month!A1:D31736; ETo!A1:N55915; P50!A1:N55915 | DOCUMENTATION_ONLY |

Catalog-native field names that still require proof-backed inspection are:

- `ZIP code`
- `reference evapotranspiration`
- `rainfall`
- `peak watering month`
- `landscape area by hydrozone`
- `plant factor`
- `irrigation efficiency`
- `baseline and proposed allowances`

Null means unknown or not reported and must never be converted to zero.
Inactive, withdrawn, superseded, and historical records remain immutable and are excluded from current resolution unless an explicit historical query selects them.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Approximate Landscape Area for Each Hydrozone | watersense_landscape; ITC-34 | User | Annual Operational Savings > Annual irrigation water reduction > Repeatable hydrozone definition > Approximate Landscape Area for Each Hydrozone | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Recognizable Plant or Landscape Type for Each Hydrozone | watersense_landscape; ITC-34 | User | Annual Operational Savings > Annual irrigation water reduction > Repeatable hydrozone definition > Recognizable Plant or Landscape Type for Each Hydrozone | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Irrigation method | watersense_landscape; ITC-34 | User | Annual Operational Savings > Annual irrigation water reduction > Existing irrigation configuration > Irrigation method | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Irrigation efficiency, if known from a nameplate, measurement, audit, or contractor specification | watersense_landscape; ITC-34 | Project Document | Annual Operational Savings > Annual irrigation water reduction > Existing irrigation configuration > Documented Irrigation efficiency, if known from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Controller treatment | watersense_landscape; ITC-34 | User | Annual Operational Savings > Annual irrigation water reduction > Existing irrigation configuration > Controller treatment | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site ZIP Code | watersense_landscape; ITC-34 | Profile | Annual Operational Savings > Annual irrigation water reduction > Site ZIP Code | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Baseline annual design water allowance | watersense_landscape; ITC-34 | artifact:watersense-landscape:2020-10 | ZIP code; reference evapotranspiration; rainfall; peak watering month; landscape area by hydrozone; plant factor; irrigation efficiency; baseline and proposed allowances | landscape_water_allowance_gallons = eto_inches * landscape_area_ft2 * 0.623 * landscape_coefficient / irrigation_efficiency, with the exact Version 2.0 monthly and effective-rainfall method preserved | gallons/year | DERIVABLE_FROM_SOURCE | Real-time irrigation scheduling, actual measured water use, and missing landscape design inputs |
| Proposed annual design water allowance | watersense_landscape; ITC-34 | artifact:watersense-landscape:2020-10 | ZIP code; reference evapotranspiration; rainfall; peak watering month; landscape area by hydrozone; plant factor; irrigation efficiency; baseline and proposed allowances | landscape_water_allowance_gallons = eto_inches * landscape_area_ft2 * 0.623 * landscape_coefficient / irrigation_efficiency, with the exact Version 2.0 monthly and effective-rainfall method preserved | gallons/year | DERIVABLE_FROM_SOURCE | Real-time irrigation scheduling, actual measured water use, and missing landscape design inputs |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: landscape_water_allowance_gallons = eto_inches * landscape_area_ft2 * 0.623 * landscape_coefficient / irrigation_efficiency, with the exact Version 2.0 monthly and effective-rainfall method preserved.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition and internal publication

```text
WaterSense Water Budget Tool Version 2.0
-> Public web calculator
-> immutable checksummed raw artifact
-> source-specific schema and enumeration validation
-> typed normalization into climate_crosswalks + geographic_crosswalks + benchmark_values + calculation_assumptions
-> deterministic watersense-landscape adapter
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

The exact output contract contains: Baseline annual design water allowance; Proposed annual design water allowance.
The governing source equation or transformation is landscape_water_allowance_gallons = eto_inches * landscape_area_ft2 * 0.623 * landscape_coefficient / irrigation_efficiency, with the exact Version 2.0 monthly and effective-rainfall method preserved.
The selected runtime design is Bounded build-time workbook extraction to a compact ZIP-climate lookup plus local Water Budget equations.
The required number of external calls during a customer estimate is zero.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid dates, impossible physical values, or a mismatched model version.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the source-artifact or content-addressed project-input identity, source release when applicable, adapter version, input hash, model or formula version, and output hash.

## 9. Refresh, immutable identity, and publication receipt

Refresh follows Irregular tool and climate-data updates.
Source IDs, release IDs, artifact IDs, project-input hashes, calculation IDs, and model-version IDs are content-bound identities.
An upsert may confirm an identical record but may not silently rewrite content behind one of those identities.
A source-backed dependency pins a source artifact and release, while a project-owned dependency may leave those fields null only when its exact input run and input SHA-256 carry the provenance.
Database publication builds the SQLite database, compact export, and receipt in temporary paths.
The publisher verifies byte sizes, SHA-256 values, and one generation ID before replacing the database and compact export, then renames the receipt last as the commit marker.
Consumers verify `docs/operational-savings-automation-research/fixtures/research-database.compact.json` against `docs/operational-savings-automation-research/fixtures/research-database.publication.json`.
A failed publication preserves the prior committed generation.

## 10. Cost

One-time engineering effort is 100-170 hours.
Estimated raw storage is 0.1 GB.
Estimated published storage is 0.03 GB.
Refresh effort is 6-12 per workbook update.
Maintenance burden is Medium.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.04 at 100 calculations per month, $0.08 at 1,000, and $0.30 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 11. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/watersense-landscape.sample.json`.
Its local output kind is `model_result_set`, its selection rule is `PINNED_LOCAL_FORMULA:landscapeAllowance`, and its output unit is `gallons`.
This synthetic regression does not prove acquisition, source-specific parsing, a real model run, database publication, or category formula-term reachability.

## 12. Feasibility and supported boundary

**NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES**

This verdict is derived from 1 bound process.
No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary.
The proof ledger records 0 end-to-end real processes, 0 source-verified processes, and 0 processes with genuine manual-export downstream proof.
The supported boundary is U.S. ZIP-based design comparison for explicit hydrozones, plant factors, areas, and irrigation methods.
The unsupported boundary is Real-time irrigation scheduling, actual measured water use, and missing landscape design inputs.

## 13. Recommended strategy and later card review

Extract only required climate columns in a streaming XLSX reader, recreate the documented Version 2.0 water-budget method locally, and retain the source ZIP and every user-supplied design input.
The rejected alternative is: The web tool is rejected for runtime use because it is external and the official page explicitly says the tool is not irrigation scheduling.
No Information Card change is made on this research branch.
Later review may update visible source versions, fallback wording, ownership, category scope, or status only after the generated proof view supports the change.
Any formula change requires separate research, review, and approval.
