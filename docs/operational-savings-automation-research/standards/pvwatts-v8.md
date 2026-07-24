# STD-PVWATTS-V8 - PVWatts photovoltaic production

## 1. RetroFi role

This Standard is used by 3 categories and 3 category-local process instances.
The categories are ITC-17, ITC-24, ITC-26.
The process keys are pvwatts_v8.
The formula terms supplied are PV_AC_kWh_t.
The current claimed output set contains 1 distinct output description.
The present automation limitation is: System sizing, tariff value, missing geometry, and assumed losses presented as source outputs.

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-PVWATTS-V8 | NREL PVWatts V8 API documentation | 8.0.0 documentation inspected 2026-07-22 | VERIFIED | Reviewed schema snapshot for GET /api/pvwatts/v8 |

## 2. Official source inventory

The primary organization is National Laboratory of the Rockies.
The selected official source is PVWatts V8 and SSC pvwattsv8 module.
The pinned version is API 8.5.0, SSC 280; source repository commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2.
The release date or release state is API response inspected 2026-07-23.
The expected update cadence is Model and weather-dataset release based.
The license finding is SSC is BSD-3-Clause; weather-source terms must be retained.
The legal-review requirement is Review NSRDB weather-data attribution and redistribution terms.

- https://developer.nlr.gov/docs/solar/pvwatts/v8/
- https://github.com/NatLabRockies/ssc

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
The retained inspected artifact is PVWatts V8 Los Angeles response, JSON, 1680 bytes, sha256:88e37dd4aa5fb6ac1a633989f8f5eb6015691e08ae326d4ad61d60fb83ff671b.
The access-cost classification is free with account or API key.

## 4. Real source structure

The observed source-native fields or model inputs are:

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

These names are research requirements from the source inventory, not claims about an observed source schema.
Exact source types, units, enumerations, nullability, keys, workbook coordinates, or model declarations must come from the source-specific proof manifest under `scripts/research/operational-savings/adapters/pvwatts-v8/`.
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
| DC capacity | pvwatts_v8; ITC-17, ITC-24, ITC-26 | Linked Opportunity | Annual Operational Savings > PV array configuration > DC capacity | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Module Type | pvwatts_v8; ITC-17, ITC-24, ITC-26 | Linked Opportunity | Annual Operational Savings > PV array configuration > Module Type | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Array type | pvwatts_v8; ITC-17, ITC-24, ITC-26 | Linked Opportunity | Annual Operational Savings > PV array configuration > Array type | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| System losses | pvwatts_v8; ITC-17, ITC-24, ITC-26 | Linked Opportunity | Annual Operational Savings > PV array configuration > System losses | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Tilt | pvwatts_v8; ITC-17, ITC-24, ITC-26 | Linked Opportunity | Annual Operational Savings > PV array configuration > Tilt | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Azimuth | pvwatts_v8; ITC-17, ITC-24, ITC-26 | Linked Opportunity | Annual Operational Savings > PV array configuration > Azimuth | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site Location | pvwatts_v8; ITC-17, ITC-24 | Profile | Annual Operational Savings > Site Location | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site Location when PV or wind is included | pvwatts_v8; ITC-26 | Profile | Annual Operational Savings > Component site and operating inputs > Site Location when PV or wind is included | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Interval or annual AC electricity generation, with model inputs, warnings, units, and source version | pvwatts_v8; ITC-17, ITC-24, ITC-26 | PVWatts V8 Los Angeles response | system_capacity; module_type; losses; array_type; tilt; azimuth; station_info; outputs.ac; outputs.ac_monthly; outputs.ac_annual; outputs.capacity_factor; warnings | annual_ac_kwh = sum(ac_monthly_kwh); interval output uses the native outputs.ac series without a tariff transformation | kWh/interval | DERIVABLE_FROM_SOURCE | System sizing, tariff value, missing geometry, and assumed losses presented as source outputs |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: annual_ac_kwh = sum(ac_monthly_kwh); interval output uses the native outputs.ac series without a tariff transformation.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition workflow

```text
PVWatts V8 and SSC pvwattsv8 module
-> Public hosted ingestion API
-> immutable raw snapshot
-> SHA-256 checksum and media-type validation
-> schema and enumeration validation
-> source-specific normalization and deduplication
-> model_versions + model_input_schemas + climate_crosswalks + calculation_runs
-> deterministic pvwatts-v8 adapter
-> typed formula input
-> calculation result with provenance
```

Acquisition runs under a scheduler or operator action and never during a customer estimate.
A failed checksum, schema drift, or incomplete artifact leaves the prior published release active.

## 7. Internal database schema

The intended normalized targets are model_versions, model_input_schemas, climate_crosswalks, calculation_runs.
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
The unsupported boundary is System sizing, tariff value, missing geometry, and assumed losses presented as source outputs.

## 11. Calculation or local-model execution

The exact output contract contains: Interval or annual AC electricity generation, with model inputs, warnings, units, and source version.
The governing source equation or transformation is annual_ac_kwh = sum(ac_monthly_kwh); interval output uses the native outputs.ac series without a tariff transformation.
The local execution mode is Pinned local SSC execution using internally retained weather files; hosted API is ingestion and regression evidence only.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid effective dates, out-of-range physical values, or a mismatched model version.
Outputs retain their native unit and a normalized unit from the repository unit registry.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the raw-artifact checksum, source release, adapter version, input hash, model or formula version, and output hash.

## 12. Refresh and versioning

Refresh follows Model and weather-dataset release based.
Release detection compares official release metadata and artifact checksums.
A changed checksum under an unchanged source version is quarantined for review.
Schema drift compares columns, types, required fields, enumeration values, workbook sheets, or model input declarations against the prior accepted fingerprint.
Raw snapshots, normalized releases, crosswalks, and selection outputs are immutable.
Publication uses an atomic pointer to the accepted release.
Rollback changes only that pointer and records an operator reason.
Deprecated releases remain available for historical calculation replay.
Stale data is labeled and blocked when an effective-date or certification-status guarantee can no longer be made.

## 13. Runtime design

The selected runtime design is Pinned local SSC execution using internally retained weather files; hosted API is ingestion and regression evidence only.
The required number of external calls during a customer estimate is zero.
The adapter reads a published internal release or executes a pinned local model only.
If the source is offline, existing published releases and reproducible historical calculations continue to work.

## 14. Cost

One-time engineering effort is 80-130 hours.
Estimated raw storage is 25 GB.
Estimated published storage is 3 GB.
Refresh effort is 8-16 per model or weather release.
Maintenance burden is Medium.
External source cost is $0 per month.
Estimated internal storage and compute cost is $1 at 100 calculations per month, $1.50 at 1,000, and $5 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 15. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/pvwatts-v8.sample.json`.
Its local output kind is `scalar`, its selection rule is `SUM_PINNED_INTERVALS`, and its output unit is `kWh/year`.
This synthetic regression executes without network access, but it does not prove acquisition, schema inspection, source-specific parsing, a real model run, database publication, or formula-term reachability.
Only the separate real-proof registry and source-backed tests may satisfy those gates.

## 16. Feasibility verdict

**FEASIBLE_AFTER_ADAPTER_WORK**

The supported boundary is PV production after all required project design and location inputs are supplied.
The unsupported boundary is System sizing, tariff value, missing geometry, and assumed losses presented as source outputs.

## 17. Final recommended strategy

Use the real API response as a regression oracle, then execute the same pinned pvwattsv8 module locally with retained weather files and reject any input set that depends on an unstated design assumption.
This is the single recommended production path for this Standard.
The rejected alternative is: Calling the hosted API during a customer estimate is rejected because zero-network runtime is required.

## 18. Potential later Information Card changes

No Information Card change is made on this research branch.
Later review may update the visible source version, fallback wording, input ownership, category scope, or status to match the supported boundary documented above.
Any formula change must be separately researched, reviewed, and approved.
Any fallback must name its authoritative population and exact numeric selection rule.
