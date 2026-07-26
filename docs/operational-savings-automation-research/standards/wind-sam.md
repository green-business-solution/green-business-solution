# STD-WIND-SAM - Wind Toolkit and SAM small-wind production

## 1. Canonical role and current process proof

This Standard is used by 2 categories and 2 category-local process instances.
The categories are ITC-19, ITC-26.
The process keys are wind_sam.
The formula terms supplied are wind_kWh_t.
The canonical output set contains 1 distinct output description.

| Category and process | Execution-verified proof level | Adapter | Actual adapter test result | Current blocker | Conditional next action |
| --- | --- | --- | --- | --- | --- |
| ITC-19/wind_sam | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/wind-sam/run.mjs | wind-sam-publication-failure: NOT_COVERED<br>wind-sam-real-database-publication: NOT_COVERED<br>wind-sam-real-ssc-execution: NOT_COVERED<br>wind-sam-ssc-version-failure: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| ITC-26/wind_sam | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/wind-sam/run.mjs | wind-sam-publication-failure: NOT_COVERED<br>wind-sam-real-database-publication: NOT_COVERED<br>wind-sam-real-ssc-execution: NOT_COVERED<br>wind-sam-ssc-version-failure: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## 2. Official source inventory

The primary organization is National Laboratory of the Rockies.
The selected official source is SAM wind power module, SSC, and Wind Toolkit resources.
The catalog acquisition target is SSC git commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2.
Its release date or release state is 2026-07-17.
The expected update cadence is Model and wind-resource release based.
The license finding is SSC is BSD-3-Clause; wind-resource terms vary by artifact.
The legal-review requirement is Retain resource-specific license and attribution.
These catalog values describe the planned source inventory and do not replace proof-manifest artifact identity.

- https://sam.nlr.gov/wind.html
- https://github.com/NatLabRockies/ssc
- https://www.nlr.gov/Wind/Data-Tools

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-WIND-SAM | SAM wind power model | Unpinned | UNVERIFIED | SAM wind compute module and Wind Toolkit resource |

## 3. What can actually be acquired

- Public SSC repository
- Local SSC shared library
- PySAM
- Public Wind Toolkit data acquisition

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public SSC repository | https://github.com/NatLabRockies/ssc | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Git tree | SSC git commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2; Model and wind-resource release based; Commit pins are stable | Public acquisition appears automatable, subject to artifact-specific license review | SSC repository cloned and wind compute-module fields inspected; no full Wind Toolkit file was downloaded |
| Local SSC shared library | https://github.com/NatLabRockies/ssc | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | SSC git commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2; Model and wind-resource release based; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | SSC repository cloned and wind compute-module fields inspected; no full Wind Toolkit file was downloaded |
| PySAM | https://github.com/NatLabRockies/ssc | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | SSC git commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2; Model and wind-resource release based; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| Public Wind Toolkit data acquisition | https://sam.nlr.gov/wind.html | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | SSC git commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2; Model and wind-resource release based; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |

The tested access result is: SSC repository cloned and wind compute-module fields inspected; no full Wind Toolkit file was downloaded.
The planning catalog observation is ssc/cmod_windpower.cpp, C++ source; no artifact checksum is recorded in the planning catalog.
The access-cost classification is completely free.

## 4. Proof-backed artifacts, releases, and schemas

The following table is generated from current proof contributions that explicitly name this Standard.
It reports retained artifact releases, versions, locators, and integrity values instead of treating the planning catalog observation as executed proof.

| Artifact ID | Evidence role | Retained release or version | Exact locator | Integrity | Current proof state | Bound processes |
| --- | --- | --- | --- | --- | --- | --- |
| artifact:wind-sam:official-fixture | Proof-manifest artifact | official repository fixture | https://github.com/NatLabRockies/ssc.git | sha256:99d80bffaa75def04d38cca4cb8f5e1e3befd043ce950513fb116d82cb479cf6; commit:ba7a7968a115baa0c250597ce2381c7ffb27fbf2; 5769 bytes | DOCUMENTATION_ONLY | ITC-19/wind_sam, ITC-26/wind_sam |
| artifact:wind-sam:ssc-303 | Proof-manifest artifact | SSC 303 | https://github.com/NatLabRockies/REopt.jl.git | sha256:db933646389fa94f41af34066d65034681d5836f1bd29644f9b2a934a01b788f; commit:f952cabdf3e60f6e88eef80bb7bc9e7e24bac643; 37852576 bytes | DOCUMENTATION_ONLY | ITC-19/wind_sam, ITC-26/wind_sam |
| artifact:wind-sam:wind-resource | Proof-manifest artifact | official repository wind resource fixture | https://github.com/NatLabRockies/ssc.git | sha256:94ebc09260d80bcc6796d89407248c39d9599aa9a046d01533fb8083737314b2; commit:ba7a7968a115baa0c250597ce2381c7ffb27fbf2; 122828 bytes | DOCUMENTATION_ONLY | ITC-19/wind_sam, ITC-26/wind_sam |

The current proof manifests record these inspected schemas:

| Schema ID | Artifact ID | Format | Extractor | Required native fields | Current proof state |
| --- | --- | --- | --- | --- | --- |
| schema:wind-sam:ssc-303:windpower | artifact:wind-sam:ssc-303 | SSC_C_API_MODULE_METADATA |  | wind_resource_filename; wind_turbine_hub_ht; wind_turbine_powercurve_windspeeds; wind_turbine_powercurve_powerout; gen; annual_energy | DOCUMENTATION_ONLY |

Catalog-native field names that still require proof-backed inspection are:

- `wind_resource_filename or wind_resource_data`
- `wind_turbine_powercurve_windspeeds`
- `wind_turbine_powercurve_powerout`
- `wind_turbine_hub_ht`
- `system_capacity`
- `losses`
- `gen`
- `annual_energy`

Null means unknown or not reported and must never be converted to zero.
Inactive, withdrawn, superseded, and historical records remain immutable and are excluded from current resolution unless an explicit historical query selects them.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Wind Turbine Class or Intended Application | wind_sam; ITC-19, ITC-26 | Linked Opportunity | Annual Operational Savings > Wind Turbine Class or Intended Application | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Exact Turbine Model or Power Curve | wind_sam; ITC-19, ITC-26 | Linked Opportunity | Annual Operational Savings > Exact Turbine Model or Power Curve | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Hub Height | wind_sam; ITC-19, ITC-26 | Linked Opportunity | Annual Operational Savings > Hub Height | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Loss factor | wind_sam; ITC-19, ITC-26 | Linked Opportunity | Annual Operational Savings > Loss factor | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Analysis Year | wind_sam; ITC-19, ITC-26 | User | Annual Operational Savings > Analysis Year | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site Location | wind_sam; ITC-19 | Profile | Annual Operational Savings > Site Location | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site Location when PV or wind is included | wind_sam; ITC-26 | Profile | Annual Operational Savings > Component site and operating inputs > Site Location when PV or wind is included | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance | wind_sam; ITC-19, ITC-26 | artifact:wind-sam:official-fixture; artifact:wind-sam:ssc-303; artifact:wind-sam:wind-resource | wind_resource_filename or wind_resource_data; wind_turbine_powercurve_windspeeds; wind_turbine_powercurve_powerout; wind_turbine_hub_ht; system_capacity; losses; gen; annual_energy | annual_ac_kwh = sum(interval_generation_kw * interval_hours); no wind speed to power conversion may occur outside the pinned turbine curve and SSC execution | kWh/interval | DERIVABLE_FROM_SOURCE | Turbine selection, hub-height inference, and generic statewide wind production |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: annual_ac_kwh = sum(interval_generation_kw * interval_hours); no wind speed to power conversion may occur outside the pinned turbine curve and SSC execution.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition and internal publication

```text
SAM wind power module, SSC, and Wind Toolkit resources
-> Public SSC repository
-> immutable checksummed raw artifact
-> source-specific schema and enumeration validation
-> typed normalization into model_versions + model_input_schemas + climate_crosswalks + calculation_runs
-> deterministic wind-sam adapter
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

The exact output contract contains: Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance.
The governing source equation or transformation is annual_ac_kwh = sum(interval_generation_kw * interval_hours); no wind speed to power conversion may occur outside the pinned turbine curve and SSC execution.
The selected runtime design is Pinned local SSC execution with a bounded internally retained California wind-resource cache.
The required number of external calls during a customer estimate is zero.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid dates, impossible physical values, or a mismatched model version.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the source-artifact or content-addressed project-input identity, source release when applicable, adapter version, input hash, model or formula version, and output hash.

## 9. Refresh, immutable identity, and publication receipt

Refresh follows Model and wind-resource release based.
Source IDs, release IDs, artifact IDs, project-input hashes, calculation IDs, and model-version IDs are content-bound identities.
An upsert may confirm an identical record but may not silently rewrite content behind one of those identities.
A source-backed dependency pins a source artifact and release, while a project-owned dependency may leave those fields null only when its exact input run and input SHA-256 carry the provenance.
Database publication builds the SQLite database, compact export, and receipt in temporary paths.
The publisher verifies byte sizes, SHA-256 values, and one generation ID before replacing the database and compact export, then renames the receipt last as the commit marker.
Consumers verify `docs/operational-savings-automation-research/fixtures/research-database.compact.json` against `docs/operational-savings-automation-research/fixtures/research-database.publication.json`.
A failed publication preserves the prior committed generation.

## 10. Cost

One-time engineering effort is 130-220 hours.
Estimated raw storage is 80 GB.
Estimated published storage is 8 GB.
Refresh effort is 16-32 per resource or model release.
Maintenance burden is High.
External source cost is $0 per month.
Estimated internal storage and compute cost is $2.50 at 100 calculations per month, $4 at 1,000, and $10 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 11. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/wind-sam.sample.json`.
Its local output kind is `model_result_set`, its selection rule is `PINNED_LOCAL_FORMULA:intervalEnergy`, and its output unit is `kWh`.
This synthetic regression does not prove acquisition, source-specific parsing, a real model run, database publication, or category formula-term reachability.

## 12. Feasibility and supported boundary

**NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES**

This verdict is derived from 2 bound processes.
No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary.
The proof ledger records 0 end-to-end real processes, 0 source-verified processes, and 0 processes with genuine manual-export downstream proof.
The supported boundary is Specified turbine, hub height, losses, and compatible wind resource.
The unsupported boundary is Turbine selection, hub-height inference, and generic statewide wind production.

## 13. Recommended strategy and later card review

Cache only the California resource cells required by active projects, execute SSC locally, and retain the exact resource cell, turbine curve, hub height, loss inputs, and warnings.
The rejected alternative is: A statewide capacity-factor lookup is rejected because small-wind production is highly site and turbine specific.
No Information Card change is made on this research branch.
Later review may update visible source versions, fallback wording, ownership, category scope, or status only after the generated proof view supports the change.
Any formula change requires separate research, review, and approval.
