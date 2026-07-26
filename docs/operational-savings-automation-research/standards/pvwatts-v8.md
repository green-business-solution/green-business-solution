# STD-PVWATTS-V8 - PVWatts photovoltaic production

## 1. Canonical role and current process proof

This Standard is used by 3 categories and 3 category-local process instances.
The categories are ITC-17, ITC-24, ITC-26.
The process keys are pvwatts_v8.
The formula terms supplied are PV_AC_kWh_t.
The canonical output set contains 1 distinct output description.

| Category and process | Execution-verified proof level | Adapter | Actual adapter test result | Current blocker | Conditional next action |
| --- | --- | --- | --- | --- | --- |
| ITC-17/pvwatts_v8 | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/pvwatts/run.mjs | pvwatts-publication-failure: NOT_COVERED<br>pvwatts-real-database-publication: NOT_COVERED<br>pvwatts-real-ssc-execution: NOT_COVERED<br>pvwatts-ssc-version-failure: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| ITC-24/pvwatts_v8 | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/pvwatts/run.mjs | pvwatts-publication-failure: NOT_COVERED<br>pvwatts-real-database-publication: NOT_COVERED<br>pvwatts-real-ssc-execution: NOT_COVERED<br>pvwatts-ssc-version-failure: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| ITC-26/pvwatts_v8 | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/pvwatts/run.mjs | pvwatts-publication-failure: NOT_COVERED<br>pvwatts-real-database-publication: NOT_COVERED<br>pvwatts-real-ssc-execution: NOT_COVERED<br>pvwatts-ssc-version-failure: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## 2. Official source inventory

The primary organization is National Laboratory of the Rockies.
The selected official source is PVWatts V8 and SSC pvwattsv8 module.
The catalog acquisition target is API 8.5.0, SSC 280; source repository commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2.
Its release date or release state is API response inspected 2026-07-23.
The expected update cadence is Model and weather-dataset release based.
The license finding is SSC is BSD-3-Clause; weather-source terms must be retained.
The legal-review requirement is Review NSRDB weather-data attribution and redistribution terms.
These catalog values describe the planned source inventory and do not replace proof-manifest artifact identity.

- https://developer.nlr.gov/docs/solar/pvwatts/v8/
- https://github.com/NatLabRockies/ssc

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-PVWATTS-V8 | NREL PVWatts V8 API documentation | 8.0.0 documentation inspected 2026-07-22 | VERIFIED | Reviewed schema snapshot for GET /api/pvwatts/v8 |

## 3. What can actually be acquired

- Public hosted ingestion API
- Local SSC module
- PySAM
- Local weather files

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public hosted ingestion API | https://developer.nlr.gov/docs/solar/pvwatts/v8/ | Free API key; registration required for a non-demo ingestion key | Hosted-service limits apply; one ingestion probe was tested | 1680 bytes observed; JSON; Route-specific source structure | API 8.5.0, SSC 280; source repository commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2; Model and weather-dataset release based; Monitor URL and checksum drift | Permitted only for scheduled ingestion under published terms and limits | A DEMO_KEY request to developer.nlr.gov returned HTTP 200; the legacy developer.nrel.gov hostname failed DNS resolution |
| Local SSC module | https://github.com/NatLabRockies/ssc | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | 1680 bytes observed; JSON; Route-specific source structure | API 8.5.0, SSC 280; source repository commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2; Model and weather-dataset release based; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | A DEMO_KEY request to developer.nlr.gov returned HTTP 200; the legacy developer.nrel.gov hostname failed DNS resolution |
| PySAM | https://github.com/NatLabRockies/ssc | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | API 8.5.0, SSC 280; source repository commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2; Model and weather-dataset release based; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| Local weather files | https://developer.nlr.gov/docs/solar/pvwatts/v8/ | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | API 8.5.0, SSC 280; source repository commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2; Model and weather-dataset release based; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |

The tested access result is: A DEMO_KEY request to developer.nlr.gov returned HTTP 200; the legacy developer.nrel.gov hostname failed DNS resolution.
The planning catalog observation is PVWatts V8 Los Angeles response, JSON, 1680 bytes, sha256:88e37dd4aa5fb6ac1a633989f8f5eb6015691e08ae326d4ad61d60fb83ff671b.
The access-cost classification is free with account or API key.

## 4. Proof-backed artifacts, releases, and schemas

The following table is generated from current proof contributions that explicitly name this Standard.
It reports retained artifact releases, versions, locators, and integrity values instead of treating the planning catalog observation as executed proof.

| Artifact ID | Evidence role | Retained release or version | Exact locator | Integrity | Current proof state | Bound processes |
| --- | --- | --- | --- | --- | --- | --- |
| artifact:pvwatts:official-fixture | Proof-manifest artifact | official repository fixture | https://github.com/NatLabRockies/ssc.git | sha256:b806b704a8542aa22ab2ad9c06ece19dcd766eee75777b426039b73f23dfaa61; commit:ba7a7968a115baa0c250597ce2381c7ffb27fbf2; 3419 bytes | DOCUMENTATION_ONLY | ITC-17/pvwatts_v8, ITC-24/pvwatts_v8, ITC-26/pvwatts_v8 |
| artifact:pvwatts:phoenix-tmy2 | Proof-manifest artifact | official repository weather fixture | https://github.com/NatLabRockies/ssc.git | sha256:311b8871e989b40d0016f7019dcabc06ebf38e16509c51842fce4bf1e6f8c591; commit:ba7a7968a115baa0c250597ce2381c7ffb27fbf2; 501341 bytes | DOCUMENTATION_ONLY | ITC-17/pvwatts_v8, ITC-24/pvwatts_v8, ITC-26/pvwatts_v8 |
| artifact:pvwatts:ssc-303 | Proof-manifest artifact | SSC 303 | https://github.com/NatLabRockies/REopt.jl.git | sha256:db933646389fa94f41af34066d65034681d5836f1bd29644f9b2a934a01b788f; commit:f952cabdf3e60f6e88eef80bb7bc9e7e24bac643; 37852576 bytes | DOCUMENTATION_ONLY | ITC-17/pvwatts_v8, ITC-24/pvwatts_v8, ITC-26/pvwatts_v8 |

The current proof manifests record these inspected schemas:

| Schema ID | Artifact ID | Format | Extractor | Required native fields | Current proof state |
| --- | --- | --- | --- | --- | --- |
| schema:pvwatts:ssc-303:pvwattsv8 | artifact:pvwatts:ssc-303 | SSC_C_API_MODULE_METADATA |  | system_capacity; module_type; array_type; losses; tilt; azimuth; solar_resource_file; gen; annual_energy | DOCUMENTATION_ONLY |

Catalog-native field names that still require proof-backed inspection are:

- `system_capacity`
- `module_type`
- `losses`
- `array_type`
- `tilt`
- `azimuth`
- `station_info`
- `outputs.ac`
- `outputs.ac_monthly`
- `outputs.ac_annual`
- `outputs.capacity_factor`
- `warnings`

Null means unknown or not reported and must never be converted to zero.
Inactive, withdrawn, superseded, and historical records remain immutable and are excluded from current resolution unless an explicit historical query selects them.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| DC capacity | pvwatts_v8; ITC-17, ITC-24, ITC-26 | Linked Opportunity | Annual Operational Savings > PV array configuration > DC capacity | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Module Type | pvwatts_v8; ITC-17, ITC-24, ITC-26 | Linked Opportunity | Annual Operational Savings > PV array configuration > Module Type | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Array type | pvwatts_v8; ITC-17, ITC-24, ITC-26 | Linked Opportunity | Annual Operational Savings > PV array configuration > Array type | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| System losses | pvwatts_v8; ITC-17, ITC-24, ITC-26 | Linked Opportunity | Annual Operational Savings > PV array configuration > System losses | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Tilt | pvwatts_v8; ITC-17, ITC-24, ITC-26 | Linked Opportunity | Annual Operational Savings > PV array configuration > Tilt | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Azimuth | pvwatts_v8; ITC-17, ITC-24, ITC-26 | Linked Opportunity | Annual Operational Savings > PV array configuration > Azimuth | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site Location | pvwatts_v8; ITC-17, ITC-24 | Profile | Annual Operational Savings > Site Location | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site Location when PV or wind is included | pvwatts_v8; ITC-26 | Profile | Annual Operational Savings > Component site and operating inputs > Site Location when PV or wind is included | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Interval or annual AC electricity generation, with model inputs, warnings, units, and source version | pvwatts_v8; ITC-17, ITC-24, ITC-26 | artifact:pvwatts:official-fixture; artifact:pvwatts:phoenix-tmy2; artifact:pvwatts:ssc-303 | system_capacity; module_type; losses; array_type; tilt; azimuth; station_info; outputs.ac; outputs.ac_monthly; outputs.ac_annual; outputs.capacity_factor; warnings | annual_ac_kwh = sum(ac_monthly_kwh); interval output uses the native outputs.ac series without a tariff transformation | kWh/interval | DERIVABLE_FROM_SOURCE | System sizing, tariff value, missing geometry, and assumed losses presented as source outputs |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: annual_ac_kwh = sum(ac_monthly_kwh); interval output uses the native outputs.ac series without a tariff transformation.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition and internal publication

```text
PVWatts V8 and SSC pvwattsv8 module
-> Public hosted ingestion API
-> immutable checksummed raw artifact
-> source-specific schema and enumeration validation
-> typed normalization into model_versions + model_input_schemas + climate_crosswalks + calculation_runs
-> deterministic pvwatts-v8 adapter
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

The exact output contract contains: Interval or annual AC electricity generation, with model inputs, warnings, units, and source version.
The governing source equation or transformation is annual_ac_kwh = sum(ac_monthly_kwh); interval output uses the native outputs.ac series without a tariff transformation.
The selected runtime design is Pinned local SSC execution using internally retained weather files; hosted API is ingestion and regression evidence only.
The required number of external calls during a customer estimate is zero.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid dates, impossible physical values, or a mismatched model version.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the source-artifact or content-addressed project-input identity, source release when applicable, adapter version, input hash, model or formula version, and output hash.

## 9. Refresh, immutable identity, and publication receipt

Refresh follows Model and weather-dataset release based.
Source IDs, release IDs, artifact IDs, project-input hashes, calculation IDs, and model-version IDs are content-bound identities.
An upsert may confirm an identical record but may not silently rewrite content behind one of those identities.
A source-backed dependency pins a source artifact and release, while a project-owned dependency may leave those fields null only when its exact input run and input SHA-256 carry the provenance.
Database publication builds the SQLite database, compact export, and receipt in temporary paths.
The publisher verifies byte sizes, SHA-256 values, and one generation ID before replacing the database and compact export, then renames the receipt last as the commit marker.
Consumers verify `docs/operational-savings-automation-research/fixtures/research-database.compact.json` against `docs/operational-savings-automation-research/fixtures/research-database.publication.json`.
A failed publication preserves the prior committed generation.

## 10. Cost

One-time engineering effort is 80-130 hours.
Estimated raw storage is 25 GB.
Estimated published storage is 3 GB.
Refresh effort is 8-16 per model or weather release.
Maintenance burden is Medium.
External source cost is $0 per month.
Estimated internal storage and compute cost is $1 at 100 calculations per month, $1.50 at 1,000, and $5 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 11. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/pvwatts-v8.sample.json`.
Its local output kind is `scalar`, its selection rule is `SUM_PINNED_INTERVALS`, and its output unit is `kWh/year`.
This synthetic regression does not prove acquisition, source-specific parsing, a real model run, database publication, or category formula-term reachability.

## 12. Feasibility and supported boundary

**NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES**

This verdict is derived from 3 bound processes.
No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary.
The proof ledger records 0 end-to-end real processes, 0 source-verified processes, and 0 processes with genuine manual-export downstream proof.
The supported boundary is PV production after all required project design and location inputs are supplied.
The unsupported boundary is System sizing, tariff value, missing geometry, and assumed losses presented as source outputs.

## 13. Recommended strategy and later card review

Use the real API response as a regression oracle, then execute the same pinned pvwattsv8 module locally with retained weather files and reject any input set that depends on an unstated design assumption.
The rejected alternative is: Calling the hosted API during a customer estimate is rejected because zero-network runtime is required.
No Information Card change is made on this research branch.
Later review may update visible source versions, fallback wording, ownership, category scope, or status only after the generated proof view supports the change.
Any formula change requires separate research, review, and approval.
