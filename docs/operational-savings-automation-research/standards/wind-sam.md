# STD-WIND-SAM - Wind Toolkit and SAM small-wind production

## 1. RetroFi role

This Standard is used by 2 categories and 2 category-local process instances.
The categories are ITC-19, ITC-26.
The process keys are wind_sam.
The formula terms supplied are wind_kWh_t.
The current claimed output set contains 1 distinct output description.
The present automation limitation is: Turbine selection, hub-height inference, and generic statewide wind production.

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-WIND-SAM | SAM wind power model | Unpinned | UNVERIFIED | SAM wind compute module and Wind Toolkit resource |

## 2. Official source inventory

The primary organization is National Laboratory of the Rockies.
The selected official source is SAM wind power module, SSC, and Wind Toolkit resources.
The pinned version is SSC git commit ba7a7968a115baa0c250597ce2381c7ffb27fbf2.
The release date or release state is 2026-07-17.
The expected update cadence is Model and wind-resource release based.
The license finding is SSC is BSD-3-Clause; wind-resource terms vary by artifact.
The legal-review requirement is Retain resource-specific license and attribution.

- https://sam.nlr.gov/wind.html
- https://github.com/NatLabRockies/ssc
- https://www.nlr.gov/Wind/Data-Tools

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
The retained inspected artifact is ssc/cmod_windpower.cpp, C++ source; source repository content is pinned by commit where applicable.
The access-cost classification is completely free.

## 4. Real source structure

The observed source-native fields or model inputs are:

- `wind_resource_filename or wind_resource_data`
- `wind_turbine_powercurve_windspeeds`
- `wind_turbine_powercurve_powerout`
- `wind_turbine_hub_ht`
- `system_capacity`
- `losses`
- `gen`
- `annual_energy`

| Field or structure | Shape to validate and pin | Native unit | Key or filter role | Null handling | Enumeration handling |
| --- | --- | --- | --- | --- | --- |
| wind_resource_filename or wind_resource_data | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| wind_turbine_powercurve_windspeeds | Numeric scalar or numeric series | Source-declared power unit | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| wind_turbine_powercurve_powerout | Numeric scalar or numeric series | Source-declared power unit | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| wind_turbine_hub_ht | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| system_capacity | Numeric scalar or numeric series | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| losses | Numeric scalar or numeric series | Fraction, ratio, or source-declared efficiency unit | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| gen | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| annual_energy | Numeric scalar or numeric series | Source-declared energy unit | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |

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
| Wind Turbine Class or Intended Application | wind_sam; ITC-19, ITC-26 | Linked Opportunity | Annual Operational Savings > Wind Turbine Class or Intended Application | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Exact Turbine Model or Power Curve | wind_sam; ITC-19, ITC-26 | Linked Opportunity | Annual Operational Savings > Exact Turbine Model or Power Curve | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Hub Height | wind_sam; ITC-19, ITC-26 | Linked Opportunity | Annual Operational Savings > Hub Height | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Loss factor | wind_sam; ITC-19, ITC-26 | Linked Opportunity | Annual Operational Savings > Loss factor | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Analysis Year | wind_sam; ITC-19, ITC-26 | User | Annual Operational Savings > Analysis Year | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site Location | wind_sam; ITC-19 | Profile | Annual Operational Savings > Site Location | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site Location when PV or wind is included | wind_sam; ITC-26 | Profile | Annual Operational Savings > Component site and operating inputs > Site Location when PV or wind is included | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance | wind_sam; ITC-19, ITC-26 | ssc/cmod_windpower.cpp | wind_resource_filename or wind_resource_data; wind_turbine_powercurve_windspeeds; wind_turbine_powercurve_powerout; wind_turbine_hub_ht; system_capacity; losses; gen; annual_energy | annual_ac_kwh = sum(interval_generation_kw * interval_hours); no wind speed to power conversion may occur outside the pinned turbine curve and SSC execution | kWh/interval | DERIVABLE_FROM_SOURCE | Turbine selection, hub-height inference, and generic statewide wind production |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: annual_ac_kwh = sum(interval_generation_kw * interval_hours); no wind speed to power conversion may occur outside the pinned turbine curve and SSC execution.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition workflow

```text
SAM wind power module, SSC, and Wind Toolkit resources
-> Public SSC repository
-> immutable raw snapshot
-> SHA-256 checksum and media-type validation
-> schema and enumeration validation
-> source-specific normalization and deduplication
-> model_versions + model_input_schemas + climate_crosswalks + calculation_runs
-> deterministic wind-sam adapter
-> typed formula input
-> calculation result with provenance
```

Acquisition runs under a scheduler or operator action and never during a customer estimate.
A failed checksum, schema drift, or incomplete artifact leaves the prior published release active.

## 7. Internal database schema

The source uses the shared registry tables plus these target tables: model_versions, model_input_schemas, climate_crosswalks, calculation_runs.

```sql
CREATE TABLE os_wind_sam_records (
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
CREATE INDEX os_wind_sam_active_exact_idx
  ON os_wind_sam_records ((normalized_payload->>'normalized_identifier'), effective_from, effective_to)
  WHERE active;
CREATE INDEX os_wind_sam_requirements_idx
  ON os_wind_sam_records USING gin (normalized_payload jsonb_path_ops)
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
The unsupported boundary is Turbine selection, hub-height inference, and generic statewide wind production.

## 11. Calculation or local-model execution

The exact output contract contains: Interval and annual AC electricity generation, with wind resource, turbine, loss, unit, and source provenance.
The governing source equation or transformation is annual_ac_kwh = sum(interval_generation_kw * interval_hours); no wind speed to power conversion may occur outside the pinned turbine curve and SSC execution.
The local execution mode is Pinned local SSC execution with a bounded internally retained California wind-resource cache.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid effective dates, out-of-range physical values, or a mismatched model version.
Outputs retain their native unit and a normalized unit from the repository unit registry.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the raw-artifact checksum, source release, adapter version, input hash, model or formula version, and output hash.

## 12. Refresh and versioning

Refresh follows Model and wind-resource release based.
Release detection compares official release metadata and artifact checksums.
A changed checksum under an unchanged source version is quarantined for review.
Schema drift compares columns, types, required fields, enumeration values, workbook sheets, or model input declarations against the prior accepted fingerprint.
Raw snapshots, normalized releases, crosswalks, and selection outputs are immutable.
Publication uses an atomic pointer to the accepted release.
Rollback changes only that pointer and records an operator reason.
Deprecated releases remain available for historical calculation replay.
Stale data is labeled and blocked when an effective-date or certification-status guarantee can no longer be made.

## 13. Runtime design

The selected runtime design is Pinned local SSC execution with a bounded internally retained California wind-resource cache.
The required number of external calls during a customer estimate is zero.
The adapter reads a published internal release or executes a pinned local model only.
If the source is offline, existing published releases and reproducible historical calculations continue to work.

## 14. Cost

One-time engineering effort is 130-220 hours.
Estimated raw storage is 80 GB.
Estimated published storage is 8 GB.
Refresh effort is 16-32 per resource or model release.
Maintenance burden is High.
External source cost is $0 per month.
Estimated internal storage and compute cost is $2.50 at 100 calculations per month, $4 at 1,000, and $10 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 15. Prototype proof

The offline command is:

```bash
node scripts/research/operational-savings/run-prototypes.mjs --json
```

The acquired or inspected source evidence is Inspected SSC wind interval and annual output contract.
The retained compact sample is `docs/operational-savings-automation-research/samples/wind-sam.sample.json`.
The source or model interface inspected is ssc/cmod_windpower.cpp.
The local output kind is `model_result_set`, the selection rule is `PINNED_LOCAL_FORMULA:intervalEnergy`, and the output unit is `kWh`.
The prototype runs without network access after acquisition.
The prototype completed without warnings.
The prototype proves parsing, filtering, or calculation behavior only within the retained sample boundary.

## 16. Feasibility verdict

**FEASIBLE_AFTER_ADAPTER_WORK**

The supported boundary is Specified turbine, hub height, losses, and compatible wind resource.
The unsupported boundary is Turbine selection, hub-height inference, and generic statewide wind production.

## 17. Final recommended strategy

Cache only the California resource cells required by active projects, execute SSC locally, and retain the exact resource cell, turbine curve, hub height, loss inputs, and warnings.
This is the single recommended production path for this Standard.
The rejected alternative is: A statewide capacity-factor lookup is rejected because small-wind production is highly site and turbine specific.

## 18. Potential later Information Card changes

No Information Card change is made on this research branch.
Later review may update the visible source version, fallback wording, input ownership, category scope, or status to match the supported boundary documented above.
Any formula change must be separately researched, reviewed, and approved.
Any fallback must name its authoritative population and exact numeric selection rule.
