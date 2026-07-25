# STD-SAM-SOLAR-THERMAL - SAM solar water-heating simulation

## 1. Canonical role and current process proof

This Standard is used by 1 category and 1 category-local process instance.
The categories are ITC-08.
The process keys are sam_solar_thermal.
The formula terms supplied are SAM_output.
The canonical output set contains 1 distinct output description.

| Category and process | Execution-verified proof level | Adapter | Actual adapter test result | Current blocker | Conditional next action |
| --- | --- | --- | --- | --- | --- |
| ITC-08/sam_solar_thermal | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/sam-solar-thermal/run.mjs | sam-solar-thermal-publication-failure: NOT_COVERED<br>sam-solar-thermal-real-database-publication: NOT_COVERED<br>sam-solar-thermal-real-ssc-execution: NOT_COVERED<br>sam-solar-thermal-ssc-version-failure: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## 2. Official source inventory

The primary organization is National Laboratory of the Rockies.
The selected official source is System Advisor Model solar water heating module and SSC.
The catalog acquisition target is SSC git commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2.
Its release date or release state is 2026-07-17.
The expected update cadence is SAM and SSC release based.
The license finding is BSD-3-Clause.
The legal-review requirement is Retain license and source attribution.
These catalog values describe the planned source inventory and do not replace proof-manifest artifact identity.

- https://sam.nlr.gov/solar-water-heating.html
- https://github.com/NatLabRockies/ssc

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-SAM-SOLAR-THERMAL | SAM solar water heating model | Unpinned | UNVERIFIED | SAM solar water heating compute module |

## 3. What can actually be acquired

- Public SSC source repository
- Local SSC shared library
- PySAM bindings
- SAM desktop application

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public SSC source repository | https://github.com/NatLabRockies/ssc | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Git tree | SSC git commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2; SAM and SSC release based; Commit pins are stable | Public acquisition appears automatable, subject to artifact-specific license review | SSC repository cloned; swh compute-module input and output declarations and upstream test input were inspected |
| Local SSC shared library | https://github.com/NatLabRockies/ssc | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | SSC git commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2; SAM and SSC release based; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | SSC repository cloned; swh compute-module input and output declarations and upstream test input were inspected |
| PySAM bindings | https://github.com/NatLabRockies/ssc | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | SSC git commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2; SAM and SSC release based; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| SAM desktop application | https://sam.nlr.gov/solar-water-heating.html | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | SSC git commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2; SAM and SSC release based; Monitor URL and checksum drift | Human-mediated acquisition only; automate validation and import after export | Not separately probed; retained as a documented alternative |

The tested access result is: SSC repository cloned; swh compute-module input and output declarations and upstream test input were inspected.
The planning catalog observation is ssc/cmod_swh.cpp and test/input_cases/swh_common.h, C++ source; no artifact checksum is recorded in the planning catalog.
The access-cost classification is completely free.

## 4. Proof-backed artifacts, releases, and schemas

The following table is generated from current proof contributions that explicitly name this Standard.
It reports retained artifact releases, versions, locators, and integrity values instead of treating the planning catalog observation as executed proof.

| Artifact ID | Evidence role | Retained release or version | Exact locator | Integrity | Current proof state | Bound processes |
| --- | --- | --- | --- | --- | --- | --- |
| artifact:sam-solar-thermal:fargo-weather | Proof-manifest artifact | official repository weather fixture | https://github.com/NatLabRockies/ssc.git | sha256:3228bdb487135d66debfd9a4fb215820ae236592e25c508e22e449139e098069; commit:ba7a7968a115baa0c250597ce2381c7ffb27fbf2; 414632 bytes | DOCUMENTATION_ONLY | ITC-08/sam_solar_thermal |
| artifact:sam-solar-thermal:official-fixture | Proof-manifest artifact | official repository fixture | https://github.com/NatLabRockies/ssc.git | sha256:5bc2ecd5a6e241a4f653dfda60d5c02b502ec7700358392ad923e7207f5b119d; commit:ba7a7968a115baa0c250597ce2381c7ffb27fbf2; 22073 bytes | DOCUMENTATION_ONLY | ITC-08/sam_solar_thermal |
| artifact:sam-solar-thermal:ssc-303 | Proof-manifest artifact | SSC 303 | https://github.com/NatLabRockies/REopt.jl.git | sha256:db933646389fa94f41af34066d65034681d5836f1bd29644f9b2a934a01b788f; commit:f952cabdf3e60f6e88eef80bb7bc9e7e24bac643; 37852576 bytes | DOCUMENTATION_ONLY | ITC-08/sam_solar_thermal |

The current proof manifests record these inspected schemas:

| Schema ID | Artifact ID | Format | Extractor | Required native fields | Current proof state |
| --- | --- | --- | --- | --- | --- |
| schema:sam-solar-thermal:ssc-303:swh | artifact:sam-solar-thermal:ssc-303 | SSC_C_API_MODULE_METADATA |  | solar_resource_file; scaled_draw; custom_mains; custom_set; gen; annual_energy | DOCUMENTATION_ONLY |

Catalog-native field names that still require proof-backed inspection are:

- `weather resource`
- `collector area and properties`
- `tank volume`
- `pump power`
- `draw profile`
- `mains and set temperatures`
- `annual_energy`
- `monthly_energy`
- `warnings`

Null means unknown or not reported and must never be converted to zero.
Inactive, withdrawn, superseded, and historical records remain immutable and are excluded from current resolution unless an explicit historical query selects them.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Site location | sam_solar_thermal; ITC-08 | Profile | Annual Operational Savings > Annual Backup-Resource Reduction > Site Location | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Collector and storage design from the linked opportunity | sam_solar_thermal; ITC-08 | Linked Opportunity | Annual Operational Savings > Annual Backup-Resource Reduction > Collector and Storage Design > Collector and Storage Requirements Prescribed by the Opportunity | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Collector and storage design from a Project Document | sam_solar_thermal; ITC-08 | Project Document | Annual Operational Savings > Annual Backup-Resource Reduction > Collector and Storage Design > Collector and Storage Design from Contractor Specification, Engineering Assessment, or Proposed Construction Document | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual hot-water load from a Project Document | sam_solar_thermal; ITC-08 | Project Document | Annual Operational Savings > Annual Backup-Resource Reduction > Annual Hot-Water Load > Hot-Water Load from Audit, Measurement, Engineering Assessment, or Operating Record | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual hot-water load from the connected context benchmark | sam_solar_thermal; ITC-08 | Standard Output | Annual Operational Savings > Annual Backup-Resource Reduction > Annual Hot-Water Load > Standard 1.1 - Solar Water-Heating Input Benchmark | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Backup fuel type | sam_solar_thermal; ITC-08 | User | Annual Operational Savings > Annual Backup-Resource Reduction > Backup Water-Heating System > Backup Fuel Type | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Backup-system efficiency from a Project Document | sam_solar_thermal; ITC-08 | Project Document | Annual Operational Savings > Annual Backup-Resource Reduction > Backup Water-Heating System > Backup Equipment Nameplate, Commissioning Record, or Engineering Assessment | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Backup-system efficiency from the connected context benchmark | sam_solar_thermal; ITC-08 | Standard Output | Annual Operational Savings > Annual Backup-Resource Reduction > Backup Water-Heating System > Standard 1.1 - Solar Water-Heating Input Benchmark | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual useful solar thermal output and displaced backup resource, with simulation inputs, units, and source version | sam_solar_thermal; ITC-08 | artifact:sam-solar-thermal:fargo-weather; artifact:sam-solar-thermal:official-fixture; artifact:sam-solar-thermal:ssc-303 | weather resource; collector area and properties; tank volume; pump power; draw profile; mains and set temperatures; annual_energy; monthly_energy; warnings | displaced_backup_resource = min(annual_useful_solar_thermal, annual_delivered_hot_water_load) / backup_efficiency | kWh-thermal/year | DERIVABLE_FROM_SOURCE | Automatic system sizing, missing draw profiles, and pool-specific or otherwise incompatible thermal systems |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: displaced_backup_resource = min(annual_useful_solar_thermal, annual_delivered_hot_water_load) / backup_efficiency.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition and internal publication

```text
System Advisor Model solar water heating module and SSC
-> Public SSC source repository
-> immutable checksummed raw artifact
-> source-specific schema and enumeration validation
-> typed normalization into model_versions + model_input_schemas + climate_crosswalks + calculation_runs + calculation_warnings
-> deterministic sam-solar-thermal adapter
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

The exact output contract contains: Annual useful solar thermal output and displaced backup resource, with simulation inputs, units, and source version.
The governing source equation or transformation is displaced_backup_resource = min(annual_useful_solar_thermal, annual_delivered_hot_water_load) / backup_efficiency.
The selected runtime design is Pinned local SSC execution with weather files and all project design inputs stored internally.
The required number of external calls during a customer estimate is zero.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid dates, impossible physical values, or a mismatched model version.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the source-artifact or content-addressed project-input identity, source release when applicable, adapter version, input hash, model or formula version, and output hash.

## 9. Refresh, immutable identity, and publication receipt

Refresh follows SAM and SSC release based.
Source IDs, release IDs, artifact IDs, project-input hashes, calculation IDs, and model-version IDs are content-bound identities.
An upsert may confirm an identical record but may not silently rewrite content behind one of those identities.
A source-backed dependency pins a source artifact and release, while a project-owned dependency may leave those fields null only when its exact input run and input SHA-256 carry the provenance.
Database publication builds the SQLite database, compact export, and receipt in temporary paths.
The publisher verifies byte sizes, SHA-256 values, and one generation ID before replacing the database and compact export, then renames the receipt last as the commit marker.
Consumers verify `docs/operational-savings-automation-research/fixtures/research-database.compact.json` against `docs/operational-savings-automation-research/fixtures/research-database.publication.json`.
A failed publication preserves the prior committed generation.

## 10. Cost

One-time engineering effort is 100-170 hours.
Estimated raw storage is 15 GB.
Estimated published storage is 2 GB.
Refresh effort is 12-24 per model release.
Maintenance burden is Medium.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.80 at 100 calculations per month, $1.20 at 1,000, and $4 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 11. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/sam-solar-thermal.sample.json`.
Its local output kind is `model_result_set`, its selection rule is `PINNED_LOCAL_FORMULA:capAndConvertSolarThermal`, and its output unit is `kWh/year`.
This synthetic regression does not prove acquisition, source-specific parsing, a real model run, database publication, or category formula-term reachability.

## 12. Feasibility and supported boundary

**NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES**

This verdict is derived from 1 bound process.
No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary.
The proof ledger records 0 end-to-end real processes, 0 source-verified processes, and 0 processes with genuine manual-export downstream proof.
The supported boundary is One-tank solar water-heating configurations with explicit design, weather, draw, and backup inputs.
The unsupported boundary is Automatic system sizing, missing draw profiles, and pool-specific or otherwise incompatible thermal systems.

## 13. Recommended strategy and later card review

Package SSC or PySAM locally, pin a weather snapshot, validate the complete SWH input schema, and retain both native thermal output and the capped displaced backup-resource derivation.
The rejected alternative is: A generic solar fraction is rejected because production depends materially on collector, storage, draw, weather, and backup configuration.
No Information Card change is made on this research branch.
Later review may update visible source versions, fallback wording, ownership, category scope, or status only after the generated proof view supports the change.
Any formula change requires separate research, review, and approval.
