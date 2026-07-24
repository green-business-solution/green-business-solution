# STD-SAM-SOLAR-THERMAL - SAM solar water-heating simulation

## 1. RetroFi role

This Standard is used by 1 category and 1 category-local process instance.
The categories are ITC-08.
The process keys are sam_solar_thermal.
The formula terms supplied are SAM_output.
The current claimed output set contains 1 distinct output description.
The present automation limitation is: Automatic system sizing, missing draw profiles, and pool-specific or otherwise incompatible thermal systems.

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-SAM-SOLAR-THERMAL | SAM solar water heating model | Unpinned | UNVERIFIED | SAM solar water heating compute module |

## 2. Official source inventory

The primary organization is National Laboratory of the Rockies.
The selected official source is System Advisor Model solar water heating module and SSC.
The pinned version is SSC git commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2.
The release date or release state is 2026-07-17.
The expected update cadence is SAM and SSC release based.
The license finding is BSD-3-Clause.
The legal-review requirement is Retain license and source attribution.

- https://sam.nlr.gov/solar-water-heating.html
- https://github.com/NatLabRockies/ssc

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
The retained inspected artifact is ssc/cmod_swh.cpp and test/input_cases/swh_common.h, C++ source; source repository content is pinned by commit where applicable.
The access-cost classification is completely free.

## 4. Real source structure

The observed source-native fields or model inputs are:

- `weather resource`
- `collector area and properties`
- `tank volume`
- `pump power`
- `draw profile`
- `mains and set temperatures`
- `annual_energy`
- `monthly_energy`
- `warnings`

| Field or structure | Shape to validate and pin | Native unit | Key or filter role | Null handling | Enumeration handling |
| --- | --- | --- | --- | --- | --- |
| weather resource | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| collector area and properties | Numeric scalar or numeric series | Source-declared area | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| tank volume | Numeric scalar or numeric series | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| pump power | Numeric scalar or numeric series | Source-declared power unit | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| draw profile | Structured record or array | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| mains and set temperatures | Numeric scalar or numeric series | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| annual_energy | Numeric scalar or numeric series | Source-declared energy unit | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| monthly_energy | Numeric scalar or numeric series | Source-declared energy unit | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| warnings | Array of strings | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |

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
| Site location | sam_solar_thermal; ITC-08 | Profile | Annual Operational Savings > Annual Backup-Resource Reduction > Site Location | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Collector and storage design from the linked opportunity | sam_solar_thermal; ITC-08 | Linked Opportunity | Annual Operational Savings > Annual Backup-Resource Reduction > Collector and Storage Design > Collector and Storage Requirements Prescribed by the Opportunity | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Collector and storage design from a Project Document | sam_solar_thermal; ITC-08 | Project Document | Annual Operational Savings > Annual Backup-Resource Reduction > Collector and Storage Design > Collector and Storage Design from Contractor Specification, Engineering Assessment, or Proposed Construction Document | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual hot-water load from a Project Document | sam_solar_thermal; ITC-08 | Project Document | Annual Operational Savings > Annual Backup-Resource Reduction > Annual Hot-Water Load > Hot-Water Load from Audit, Measurement, Engineering Assessment, or Operating Record | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual hot-water load from the connected context benchmark | sam_solar_thermal; ITC-08 | Standard Output | Annual Operational Savings > Annual Backup-Resource Reduction > Annual Hot-Water Load > Standard 1.1 - Solar Water-Heating Input Benchmark | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Backup fuel type | sam_solar_thermal; ITC-08 | User | Annual Operational Savings > Annual Backup-Resource Reduction > Backup Water-Heating System > Backup Fuel Type | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Backup-system efficiency from a Project Document | sam_solar_thermal; ITC-08 | Project Document | Annual Operational Savings > Annual Backup-Resource Reduction > Backup Water-Heating System > Backup Equipment Nameplate, Commissioning Record, or Engineering Assessment | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Backup-system efficiency from the connected context benchmark | sam_solar_thermal; ITC-08 | Standard Output | Annual Operational Savings > Annual Backup-Resource Reduction > Backup Water-Heating System > Standard 1.1 - Solar Water-Heating Input Benchmark | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual useful solar thermal output and displaced backup resource, with simulation inputs, units, and source version | sam_solar_thermal; ITC-08 | ssc/cmod_swh.cpp and test/input_cases/swh_common.h | weather resource; collector area and properties; tank volume; pump power; draw profile; mains and set temperatures; annual_energy; monthly_energy; warnings | displaced_backup_resource = min(annual_useful_solar_thermal, annual_delivered_hot_water_load) / backup_efficiency | kWh-thermal/year | DERIVABLE_FROM_SOURCE | Automatic system sizing, missing draw profiles, and pool-specific or otherwise incompatible thermal systems |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: displaced_backup_resource = min(annual_useful_solar_thermal, annual_delivered_hot_water_load) / backup_efficiency.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition workflow

```text
System Advisor Model solar water heating module and SSC
-> Public SSC source repository
-> immutable raw snapshot
-> SHA-256 checksum and media-type validation
-> schema and enumeration validation
-> source-specific normalization and deduplication
-> model_versions + model_input_schemas + climate_crosswalks + calculation_runs + calculation_warnings
-> deterministic sam-solar-thermal adapter
-> typed formula input
-> calculation result with provenance
```

Acquisition runs under a scheduler or operator action and never during a customer estimate.
A failed checksum, schema drift, or incomplete artifact leaves the prior published release active.

## 7. Internal database schema

The source uses the shared registry tables plus these target tables: model_versions, model_input_schemas, climate_crosswalks, calculation_runs, calculation_warnings.

```sql
CREATE TABLE os_sam_solar_thermal_records (
  source_release_id uuid NOT NULL REFERENCES source_releases(id),
  source_record_key text NOT NULL,
  effective_from date,
  effective_to date,
  active boolean NOT NULL,
  native_payload jsonb NOT NULL,
  normalized_payload jsonb NOT NULL,
  unit_registry_version text NOT NULL,
  source_artifact_id uuid NOT NULL REFERENCES source_artifacts(id),
  created_at timestamptz NOT NULL,
  PRIMARY KEY (source_release_id, source_record_key)
);
CREATE INDEX os_sam_solar_thermal_active_exact_idx
  ON os_sam_solar_thermal_records ((normalized_payload->>'normalized_identifier'), effective_from, effective_to)
  WHERE active;
CREATE INDEX os_sam_solar_thermal_requirements_idx
  ON os_sam_solar_thermal_records USING gin (normalized_payload jsonb_path_ops)
  WHERE active;
```

Source-native payloads remain queryable for audits, while formula adapters consume only validated normalized columns or pinned local-model results.

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
The unsupported boundary is Automatic system sizing, missing draw profiles, and pool-specific or otherwise incompatible thermal systems.

## 11. Calculation or local-model execution

The exact output contract contains: Annual useful solar thermal output and displaced backup resource, with simulation inputs, units, and source version.
The governing source equation or transformation is displaced_backup_resource = min(annual_useful_solar_thermal, annual_delivered_hot_water_load) / backup_efficiency.
The local execution mode is Pinned local SSC execution with weather files and all project design inputs stored internally.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid effective dates, out-of-range physical values, or a mismatched model version.
Outputs retain their native unit and a normalized unit from the repository unit registry.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the raw-artifact checksum, source release, adapter version, input hash, model or formula version, and output hash.

## 12. Refresh and versioning

Refresh follows SAM and SSC release based.
Release detection compares official release metadata and artifact checksums.
A changed checksum under an unchanged source version is quarantined for review.
Schema drift compares columns, types, required fields, enumeration values, workbook sheets, or model input declarations against the prior accepted fingerprint.
Raw snapshots, normalized releases, crosswalks, and selection outputs are immutable.
Publication uses an atomic pointer to the accepted release.
Rollback changes only that pointer and records an operator reason.
Deprecated releases remain available for historical calculation replay.
Stale data is labeled and blocked when an effective-date or certification-status guarantee can no longer be made.

## 13. Runtime design

The selected runtime design is Pinned local SSC execution with weather files and all project design inputs stored internally.
The required number of external calls during a customer estimate is zero.
The adapter reads a published internal release or executes a pinned local model only.
If the source is offline, existing published releases and reproducible historical calculations continue to work.

## 14. Cost

One-time engineering effort is 100-170 hours.
Estimated raw storage is 15 GB.
Estimated published storage is 2 GB.
Refresh effort is 12-24 per model release.
Maintenance burden is Medium.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.80 at 100 calculations per month, $1.20 at 1,000, and $4 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 15. Prototype proof

The offline command is:

```bash
node scripts/research/operational-savings/run-prototypes.mjs --json
```

The acquired or inspected source evidence is Inspected SSC SWH output contract.
The retained compact sample is `docs/operational-savings-automation-research/samples/sam-solar-thermal.sample.json`.
The source or model interface inspected is ssc/cmod_swh.cpp and test/input_cases/swh_common.h.
The local output kind is `model_result_set`, the selection rule is `PINNED_LOCAL_FORMULA:capAndConvertSolarThermal`, and the output unit is `kWh/year`.
The prototype runs without network access after acquisition.
The prototype completed without warnings.
The prototype proves parsing, filtering, or calculation behavior only within the retained sample boundary.

## 16. Feasibility verdict

**FEASIBLE_AFTER_ADAPTER_WORK**

The supported boundary is One-tank solar water-heating configurations with explicit design, weather, draw, and backup inputs.
The unsupported boundary is Automatic system sizing, missing draw profiles, and pool-specific or otherwise incompatible thermal systems.

## 17. Final recommended strategy

Package SSC or PySAM locally, pin a weather snapshot, validate the complete SWH input schema, and retain both native thermal output and the capped displaced backup-resource derivation.
This is the single recommended production path for this Standard.
The rejected alternative is: A generic solar fraction is rejected because production depends materially on collector, storage, draw, weather, and backup configuration.

## 18. Potential later Information Card changes

No Information Card change is made on this research branch.
Later review may update the visible source version, fallback wording, input ownership, category scope, or status to match the supported boundary documented above.
Any formula change must be separately researched, reviewed, and approved.
Any fallback must name its authoritative population and exact numeric selection rule.
