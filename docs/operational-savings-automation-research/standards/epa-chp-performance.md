# STD-EPA-CHP-PERFORMANCE - EPA CHP and fuel-cell performance

## 1. Canonical role and current process proof

This Standard is used by 4 categories and 4 category-local process instances.
The categories are ITC-20, ITC-21, ITC-22, ITC-26.
The process keys are epa_chp_performance.
The formula terms supplied are CHP_input_fuel, added_fuel, annual_generation, generation, input_fuel, scheduled_input_fuel, useful_heat.
The canonical output set contains 5 distinct output descriptions.

| Category and process | Execution-verified proof level | Adapter | Actual adapter test result | Current blocker | Conditional next action |
| --- | --- | --- | --- | --- | --- |
| ITC-20/epa_chp_performance | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/epa-chp/run.mjs | epa-chp-itc20-formula-proof: NOT_COVERED<br>epa-chp-offline-proof: NOT_COVERED<br>epa-chp-required-row-failure-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| ITC-21/epa_chp_performance | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/epa-chp/run.mjs | epa-chp-itc21-formula-proof: NOT_COVERED<br>epa-chp-offline-proof: NOT_COVERED<br>epa-chp-real-catalog-proof: NOT_COVERED<br>epa-chp-required-row-failure-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| ITC-22/epa_chp_performance | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/epa-chp/run.mjs | epa-biomass-chp-real-proof: NOT_COVERED<br>epa-biomass-native-evidence-failure-proof: NOT_COVERED<br>epa-biomass-publication-proof: NOT_COVERED<br>epa-chp-offline-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| ITC-26/epa_chp_performance | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/epa-chp/run.mjs | epa-chp-itc26-formula-proof: NOT_COVERED<br>epa-chp-offline-proof: NOT_COVERED<br>epa-chp-required-row-failure-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## 2. Official source inventory

The primary organization is U.S. Environmental Protection Agency.
The selected official source is CHP technology catalog and screening methods.
The catalog acquisition target is Catalog artifact downloaded 2026-07-23; technology page current February 2026.
Its release date or release state is Catalog editions vary by technology.
The expected update cadence is Irregular catalog and tool updates.
The license finding is Federal EPA publications are generally public domain; retain source attribution.
The legal-review requirement is Confirm terms of linked non-EPA supporting datasets if incorporated.
These catalog values describe the planned source inventory and do not replace proof-manifest artifact identity.

- https://www.epa.gov/chp/chp-technologies
- https://www.epa.gov/chp/chp-energy-and-emissions-savings-calculator

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-EPA-CHP | EPA CHP technologies | Current page and linked catalog, unpinned | UNVERIFIED | Technology and capacity performance tables plus CHP savings calculator workbook |

## 3. What can actually be acquired

- Public technology catalog PDFs
- Public calculator workbook
- Public method pages

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public technology catalog PDFs | https://www.epa.gov/chp/chp-technologies | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | 4135792 bytes observed; PDF; PDF | Catalog artifact downloaded 2026-07-23; technology page current February 2026; Irregular catalog and tool updates; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | A 4.1 MB official CHP technology catalog PDF was downloaded and its tables and method sections were inspected |
| Public calculator workbook | https://www.epa.gov/chp/chp-technologies | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Catalog artifact downloaded 2026-07-23; technology page current February 2026; Irregular catalog and tool updates; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| Public method pages | https://www.epa.gov/chp/chp-technologies | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Catalog artifact downloaded 2026-07-23; technology page current February 2026; Irregular catalog and tool updates; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |

The tested access result is: A 4.1 MB official CHP technology catalog PDF was downloaded and its tables and method sections were inspected.
The planning catalog observation is EPA CHP catalog PDF, PDF, 4135792 bytes, sha256:eccea396f5bcc5c86c16a75b8d41b1a4a7b43df064b7363ee7054d53063f0d09.
The access-cost classification is completely free.

## 4. Proof-backed artifacts, releases, and schemas

The following table is generated from current proof contributions that explicitly name this Standard.
It reports retained artifact releases, versions, locators, and integrity values instead of treating the planning catalog observation as executed proof.

| Artifact ID | Evidence role | Retained release or version | Exact locator | Integrity | Current proof state | Bound processes |
| --- | --- | --- | --- | --- | --- | --- |
| artifact:epa-biomass-chp-catalog:v1.1 | PUBLIC_PDF_DOWNLOAD | Biomass CHP Catalog v1.1 | https://www.epa.gov/sites/default/files/2015-07/documents/biomass_combined_heat_and_power_catalog_of_technologies_v.1.1.pdf | sha256:fbb7af3824eaf83a01ecb97aa070cc250fcdc3cb9702cc25f72061720ce5c959; 5817000 bytes | DOCUMENTATION_ONLY | ITC-22/epa_chp_performance |
| artifact:epa-chp-catalog:2017-09 | PUBLIC_PDF_DOWNLOAD | September 2017 | https://www.epa.gov/chp/catalog-chp-technologies | sha256:eccea396f5bcc5c86c16a75b8d41b1a4a7b43df064b7363ee7054d53063f0d09; 4135792 bytes | DOCUMENTATION_ONLY | ITC-20/epa_chp_performance, ITC-21/epa_chp_performance, ITC-26/epa_chp_performance |

The current proof manifests record these inspected schemas:

| Schema ID | Artifact ID | Format | Extractor | Required native fields | Current proof state |
| --- | --- | --- | --- | --- | --- |
| schema:epa-biomass-chp-catalog:table-7-15 | artifact:epa-biomass-chp-catalog:v1.1 | PDF_TABLE | scripts/research/operational-savings/adapters/epa-chp/run.mjs | Equipment type; Commercialization status; Equipment size (kW); Thermal output (Btu/hr); Power to heat ratio; Biomass fuel use (MMBtu/hr); Electric efficiency (est.) (%); CHP efficiency (%); Plant operating factor | DOCUMENTATION_ONLY |
| schema:epa-chp-catalog:tables-2-2-5-2-and-6-3 | artifact:epa-chp-catalog:2017-09 | PDF_TABLES | scripts/research/operational-savings/adapters/epa-chp/run.mjs | Baseload Electric Capacity (kW); Net Electricity Capacity (kW); Electrical Efficiency (%), HHV; Electric Efficiency (%), HHV; Total Efficiency [%); Total CHP Efficiency (%), HHV [4]; Power / Heat Ratio; Power/Heat Ratio [5]; Fuel Cell Type; Nominal Electricity Capacity (kW); Net Electrical Efficiency (%), HHV); Fuel Input (MMBtu/hr), HHV; Total CHP Efficiency (%), HHV; Power to Heat Ratio | DOCUMENTATION_ONLY |

Catalog-native field names that still require proof-backed inspection are:

- `prime mover`
- `size class`
- `electric efficiency`
- `total CHP efficiency`
- `power-to-heat ratio`
- `fuel input`
- `electric output`
- `useful thermal output`

Null means unknown or not reported and must never be converted to zero.
Inactive, withdrawn, superseded, and historical records remain immutable and are excluded from current resolution unless an explicit historical query selects them.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Prime-mover type | epa_chp_performance; ITC-20 | Linked Opportunity | Annual Operational Savings > Prime-mover type | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Input fuel | epa_chp_performance; ITC-20, ITC-21, ITC-26 | Linked Opportunity | Annual Operational Savings > Input fuel | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Selected Unit Model, if known | epa_chp_performance; ITC-20, ITC-21, ITC-22, ITC-26 | Linked Opportunity | Annual Operational Savings > Selected Unit Model, if known | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Total installed capacity | epa_chp_performance; ITC-20, ITC-21 | Linked Opportunity | Annual Operational Savings > Total installed capacity | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Operating load fraction from an uploaded site study, controls trend, or engineering audit | epa_chp_performance; ITC-20 | Project Document | Annual Operational Savings > Documented Operating load fraction from Controls Trends or Engineering Audit | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Coincident Onsite Electric Load, if known | epa_chp_performance; ITC-20 | Project Document | Annual Operational Savings > Documented Coincident Onsite Electric Load, if known from Submeter, Controls Trend, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual operating hours from the connected schedule process | epa_chp_performance; ITC-20 | Standard Output | Annual Operational Savings > Annual operating hours > Standard 1.1 - Fuel Cell Electricity Generation Annual Operating Hours | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Prime mover | epa_chp_performance; ITC-21, ITC-26 | Linked Opportunity | Annual Operational Savings > Prime mover | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual capacity factor | epa_chp_performance; ITC-21 | Linked Opportunity | Annual Operational Savings > Annual capacity factor | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Coincident onsite electric-load constraint, if known | epa_chp_performance; ITC-21, ITC-22 | Project Document | Annual Operational Savings > Documented Coincident onsite electric-load constraint, if known from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Coincident useful thermal-load constraint | epa_chp_performance; ITC-21, ITC-22 | Project Document | Annual Operational Savings > Documented Coincident useful thermal-load constraint from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing Boiler Nameplate or Combustion-Test Information, if known | epa_chp_performance; ITC-21, ITC-22 | Project Document | Annual Operational Savings > Existing Boiler Nameplate or Combustion-Test Information, if known | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Confirmed annual fuel availability, if known | epa_chp_performance; ITC-22 | User | Annual Operational Savings > Confirmed annual fuel availability, if known | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Fuel unit | epa_chp_performance; ITC-22 | User | Annual Operational Savings > Fuel unit | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Fuel lower heating value, if known from a nameplate, measurement, audit, or contractor specification | epa_chp_performance; ITC-22 | Project Document | Annual Operational Savings > Documented Fuel lower heating value, if known from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Conversion technology | epa_chp_performance; ITC-22 | Linked Opportunity | Annual Operational Savings > Conversion technology | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Installed capacity | epa_chp_performance; ITC-22, ITC-26 | Linked Opportunity | Annual Operational Savings > Installed capacity | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Coincident useful thermal-load constraint when heat recovery is included | epa_chp_performance; ITC-26 | Project Document | Annual Operational Savings > Component site and operating inputs > Fuel-cell or CHP configuration when fuel generation is included > Documented Coincident useful thermal-load constraint when heat recovery is included from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual electricity generation | epa_chp_performance; ITC-20 | artifact:epa-chp-catalog:2017-09 | prime mover; size class; electric efficiency; total CHP efficiency; power-to-heat ratio; fuel input; electric output; useful thermal output | input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency) | kWh/year | DERIVABLE_FROM_SOURCE | Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability |
| Annual input fuel | epa_chp_performance; ITC-20 | artifact:epa-chp-catalog:2017-09 | prime mover; size class; electric efficiency; total CHP efficiency; power-to-heat ratio; fuel input; electric output; useful thermal output | input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency) | fuel-unit/year | DERIVABLE_FROM_SOURCE | Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability |
| Annual electricity generation | epa_chp_performance; ITC-21, ITC-22, ITC-26 | artifact:epa-biomass-chp-catalog:v1.1; artifact:epa-chp-catalog:2017-09 | prime mover; size class; electric efficiency; total CHP efficiency; power-to-heat ratio; fuel input; electric output; useful thermal output | input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency) | kWh/year | DERIVABLE_FROM_SOURCE | Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability |
| Annual CHP input fuel | epa_chp_performance; ITC-21 | artifact:epa-chp-catalog:2017-09 | prime mover; size class; electric efficiency; total CHP efficiency; power-to-heat ratio; fuel input; electric output; useful thermal output | input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency) | fuel-unit/year | DERIVABLE_FROM_SOURCE | Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability |
| Annual useful recovered heat | epa_chp_performance; ITC-21, ITC-22, ITC-26 | artifact:epa-biomass-chp-catalog:v1.1; artifact:epa-chp-catalog:2017-09 | prime mover; size class; electric efficiency; total CHP efficiency; power-to-heat ratio; fuel input; electric output; useful thermal output | input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency) | energy/year | DERIVABLE_FROM_SOURCE | Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability |
| Scheduled annual input fuel | epa_chp_performance; ITC-22 | artifact:epa-biomass-chp-catalog:v1.1 | prime mover; size class; electric efficiency; total CHP efficiency; power-to-heat ratio; fuel input; electric output; useful thermal output | input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency) | resource-unit/year | DERIVABLE_FROM_SOURCE | Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability |
| Annual input fuel | epa_chp_performance; ITC-26 | artifact:epa-chp-catalog:2017-09 | prime mover; size class; electric efficiency; total CHP efficiency; power-to-heat ratio; fuel input; electric output; useful thermal output | input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency) | fuel-unit/year | DERIVABLE_FROM_SOURCE | Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency).
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition and internal publication

```text
CHP technology catalog and screening methods
-> Public technology catalog PDFs
-> immutable checksummed raw artifact
-> source-specific schema and enumeration validation
-> typed normalization into equipment_performance_fields + benchmark_populations + benchmark_values + calculation_assumptions
-> deterministic epa-chp-performance adapter
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

The exact output contract contains: Annual electricity generation; Annual input fuel; Annual CHP input fuel; Annual useful recovered heat; Scheduled annual input fuel.
The governing source equation or transformation is input_fuel_mmbtu = electric_generation_kwh * 0.003412 / electric_efficiency; useful_heat_mmbtu = input_fuel_mmbtu * (total_efficiency - electric_efficiency).
The selected runtime design is Versioned locally transcribed catalog tables with deterministic CHP equations.
The required number of external calls during a customer estimate is zero.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid dates, impossible physical values, or a mismatched model version.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the source-artifact or content-addressed project-input identity, source release when applicable, adapter version, input hash, model or formula version, and output hash.

## 9. Refresh, immutable identity, and publication receipt

Refresh follows Irregular catalog and tool updates.
Source IDs, release IDs, artifact IDs, project-input hashes, calculation IDs, and model-version IDs are content-bound identities.
An upsert may confirm an identical record but may not silently rewrite content behind one of those identities.
A source-backed dependency pins a source artifact and release, while a project-owned dependency may leave those fields null only when its exact input run and input SHA-256 carry the provenance.
Database publication builds the SQLite database, compact export, and receipt in temporary paths.
The publisher verifies byte sizes, SHA-256 values, and one generation ID before replacing the database and compact export, then renames the receipt last as the commit marker.
Consumers verify `docs/operational-savings-automation-research/fixtures/research-database.compact.json` against `docs/operational-savings-automation-research/fixtures/research-database.publication.json`.
A failed publication preserves the prior committed generation.

## 10. Cost

One-time engineering effort is 90-150 hours.
Estimated raw storage is 0.2 GB.
Estimated published storage is 0.02 GB.
Refresh effort is 8-16 per catalog update.
Maintenance burden is Medium.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.05 at 100 calculations per month, $0.10 at 1,000, and $0.40 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 11. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/epa-chp-performance.sample.json`.
Its local output kind is `model_result_set`, its selection rule is `PINNED_LOCAL_FORMULA:chpFuelAndUsefulHeat`, and its output unit is `MMBtu/year`.
This synthetic regression does not prove acquisition, source-specific parsing, a real model run, database publication, or category formula-term reachability.

## 12. Feasibility and supported boundary

**NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES**

This verdict is derived from 4 bound processes.
No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary.
The proof ledger records 0 end-to-end real processes, 0 source-verified processes, and 0 processes with genuine manual-export downstream proof.
The supported boundary is Screening estimates for a matched prime mover and size class with explicit operating schedule.
The unsupported boundary is Manufacturer guarantees, project-specific part-load curves, interconnection, outage performance, and fuel availability.

## 13. Recommended strategy and later card review

Transcribe the current catalog tables with dual review, retain table and page citations, map only compatible prime mover and size classes, and execute the documented fuel and useful-heat equations locally.
The rejected alternative is: PDF parsing at customer runtime is rejected because table interpretation and version control require review.
No Information Card change is made on this research branch.
Later review may update visible source versions, fallback wording, ownership, category scope, or status only after the generated proof view supports the change.
Any formula change requires separate research, review, and approval.
