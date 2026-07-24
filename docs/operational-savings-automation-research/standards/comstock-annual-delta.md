# STD-COMSTOCK-ANNUAL-DELTA - ComStock annual upgrade resource delta

## 1. RetroFi role

This Standard is used by 1 category and 1 category-local process instance.
The categories are ITC-01.
The process keys are comstock_annual_delta.
The formula terms supplied are median_ComStock_delta_r_per_ft².
The current claimed output set contains 1 distinct output description.
The present automation limitation is: Project-specific equipment performance, combined upgrade arithmetic, and any percentile without retained population size and weights.

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-COMSTOCK-DELTA | ComStock 2025 Release 3 data | 2025 Release 3 | UNVERIFIED | OEDI metadata_and_annual_results Parquet plus data_dictionary.tsv and enumeration_dictionary.tsv |
| E-COMSTOCK-TAXONOMY | ComStock upgrade measures | 2025 Release 3 | UNVERIFIED | measure_name_crosswalk.csv and upgrades_lookup.json |

## 2. Official source inventory

The primary organization is National Laboratory of the Rockies.
The selected official source is ComStock 2025 Release 3.
The pinned version is 2025 Release 3.
The release date or release state is 2025-11.
The expected update cadence is Release based, historically several releases per year.
The license finding is OEDI data is published for public access; retain release-specific license and attribution metadata.
The legal-review requirement is Confirm the license metadata attached to every OEDI release before production publication.

- https://natlabrockies.github.io/ComStock.github.io/docs/data.html
- https://natlabrockies.github.io/ComStock.github.io/docs/upgrade_measures/upgrade_measures.html
- https://oedi-data-lake.s3.amazonaws.com/nrel-pds-building-stock/end-use-load-profiles-for-us-building-stock/2025/comstock_amy2018_release_3/upgrades_lookup.json

## 3. What can actually be acquired

- Public OEDI S3 Parquet partitions
- Public data and enumeration dictionaries
- Public upgrades_lookup.json
- Public measure_name_crosswalk.csv

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public OEDI S3 Parquet partitions | https://natlabrockies.github.io/ComStock.github.io/docs/data.html | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Partitioned Parquet | 2025 Release 3; Release based, historically several releases per year; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| Public data and enumeration dictionaries | https://natlabrockies.github.io/ComStock.github.io/docs/data.html | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | 2025 Release 3; Release based, historically several releases per year; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| Public upgrades_lookup.json | https://oedi-data-lake.s3.amazonaws.com/nrel-pds-building-stock/end-use-load-profiles-for-us-building-stock/2025/comstock_amy2018_release_3/upgrades_lookup.json | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | 3752 bytes observed; JSON; Route-specific source structure | 2025 Release 3; Release based, historically several releases per year; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | HTTP 200 for the Release 3 upgrades lookup; full annual Parquet acquisition was not attempted because of size |
| Public measure_name_crosswalk.csv | https://natlabrockies.github.io/ComStock.github.io/docs/data.html | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | 2025 Release 3; Release based, historically several releases per year; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |

The tested access result is: HTTP 200 for the Release 3 upgrades lookup; full annual Parquet acquisition was not attempted because of size.
The retained inspected artifact is upgrades_lookup.json, JSON, 3752 bytes, sha256:c3ba607e650d3b78cd86f08ef3cd6e632b7e622797a970cd8f16812e41a1ce5a.
The access-cost classification is completely free.

## 4. Real source structure

The observed source-native fields or model inputs are:

- `upgrade_id`
- `upgrade_name`
- `building_id`
- `weight`
- `floor_area`
- `baseline annual resource fields`
- `upgrade annual resource fields`

| Field or structure | Shape to validate and pin | Native unit | Key or filter role | Null handling | Enumeration handling |
| --- | --- | --- | --- | --- | --- |
| upgrade_id | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Natural-key candidate or key component | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| upgrade_name | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| building_id | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Natural-key candidate or key component | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| weight | Numeric scalar or numeric series | Source-declared statistical weight | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| floor_area | Numeric scalar or numeric series | Source-declared area | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| baseline annual resource fields | Numeric scalar or numeric series | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| upgrade annual resource fields | Numeric scalar or numeric series | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |

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
| Existing Building Condition | comstock_annual_delta; ITC-01 | User | Annual Operational Savings > Annual resource delta by resource > Existing Building Condition | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed Upgrade Option | comstock_annual_delta; ITC-01 | Linked Opportunity | Annual Operational Savings > Annual resource delta by resource > Proposed Upgrade Option | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Building Type | comstock_annual_delta; ITC-01 | Profile | Annual Operational Savings > Annual resource delta by resource > Building Type | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site State or County | comstock_annual_delta; ITC-01 | Profile | Annual Operational Savings > Annual resource delta by resource > Site State or County | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Building Area, approximate unless subsequently verified | comstock_annual_delta; ITC-01 | Profile | Annual Operational Savings > Annual resource delta by resource > Building Area, approximate unless subsequently verified | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual electricity and fuel-use change per square foot for the approved measure and building segment, with source version and units | comstock_annual_delta; ITC-01 | upgrades_lookup.json | upgrade_id; upgrade_name; building_id; weight; floor_area; baseline annual resource fields; upgrade annual resource fields | delta_per_ft2 = (baseline_annual_resource - upgrade_annual_resource) / floor_area; population summaries use the release weight after identical eligibility filters | resource-unit/ft2-year | DERIVABLE_FROM_SOURCE | Project-specific equipment performance, combined upgrade arithmetic, and any percentile without retained population size and weights |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: delta_per_ft2 = (baseline_annual_resource - upgrade_annual_resource) / floor_area; population summaries use the release weight after identical eligibility filters.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition workflow

```text
ComStock 2025 Release 3
-> Public OEDI S3 Parquet partitions
-> immutable raw snapshot
-> SHA-256 checksum and media-type validation
-> schema and enumeration validation
-> source-specific normalization and deduplication
-> building_upgrade_measures + building_archetype_benchmarks + retrofit_measure_crosswalks + benchmark_populations + benchmark_values
-> deterministic comstock-annual-delta adapter
-> typed formula input
-> calculation result with provenance
```

Acquisition runs under a scheduler or operator action and never during a customer estimate.
A failed checksum, schema drift, or incomplete artifact leaves the prior published release active.

## 7. Internal database schema

The source uses the shared registry tables plus these target tables: building_upgrade_measures, building_archetype_benchmarks, retrofit_measure_crosswalks, benchmark_populations, benchmark_values.

```sql
CREATE TABLE os_comstock_annual_delta_records (
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
CREATE INDEX os_comstock_annual_delta_active_exact_idx
  ON os_comstock_annual_delta_records ((normalized_payload->>'normalized_identifier'), effective_from, effective_to)
  WHERE active;
CREATE INDEX os_comstock_annual_delta_requirements_idx
  ON os_comstock_annual_delta_records USING gin (normalized_payload jsonb_path_ops)
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
The unsupported boundary is Project-specific equipment performance, combined upgrade arithmetic, and any percentile without retained population size and weights.

## 11. Calculation or local-model execution

The exact output contract contains: Annual electricity and fuel-use change per square foot for the approved measure and building segment, with source version and units.
The governing source equation or transformation is delta_per_ft2 = (baseline_annual_resource - upgrade_annual_resource) / floor_area; population summaries use the release weight after identical eligibility filters.
The local execution mode is Build-time Parquet aggregation published as a compact versioned lookup artifact.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid effective dates, out-of-range physical values, or a mismatched model version.
Outputs retain their native unit and a normalized unit from the repository unit registry.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the raw-artifact checksum, source release, adapter version, input hash, model or formula version, and output hash.

## 12. Refresh and versioning

Refresh follows Release based, historically several releases per year.
Release detection compares official release metadata and artifact checksums.
A changed checksum under an unchanged source version is quarantined for review.
Schema drift compares columns, types, required fields, enumeration values, workbook sheets, or model input declarations against the prior accepted fingerprint.
Raw snapshots, normalized releases, crosswalks, and selection outputs are immutable.
Publication uses an atomic pointer to the accepted release.
Rollback changes only that pointer and records an operator reason.
Deprecated releases remain available for historical calculation replay.
Stale data is labeled and blocked when an effective-date or certification-status guarantee can no longer be made.

## 13. Runtime design

The selected runtime design is Build-time Parquet aggregation published as a compact versioned lookup artifact.
The required number of external calls during a customer estimate is zero.
The adapter reads a published internal release or executes a pinned local model only.
If the source is offline, existing published releases and reproducible historical calculations continue to work.

## 14. Cost

One-time engineering effort is 100-160 hours.
Estimated raw storage is 60 GB.
Estimated published storage is 3 GB.
Refresh effort is 12-24 per release.
Maintenance burden is Medium.
External source cost is $0 per month.
Estimated internal storage and compute cost is $2.50 at 100 calculations per month, $3 at 1,000, and $6 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 15. Prototype proof

The offline command is:

```bash
node scripts/research/operational-savings/run-prototypes.mjs --json
```

The acquired or inspected source evidence is Downloaded official Release 3 upgrades_lookup.json.
The retained compact sample is `docs/operational-savings-automation-research/samples/comstock-annual-delta.sample.json`.
The source or model interface inspected is upgrades_lookup.json.
The local output kind is `product_record`, the selection rule is `EXACT_NORMALIZED_IDENTIFIER`, and the output unit is `record`.
The prototype runs without network access after acquisition.
The prototype completed without warnings.
The prototype proves parsing, filtering, or calculation behavior only within the retained sample boundary.

## 16. Feasibility verdict

**FEASIBLE_AFTER_ADAPTER_WORK**

The supported boundary is Archetype screening for an approved one-to-one measure and eligible building segment.
The unsupported boundary is Project-specific equipment performance, combined upgrade arithmetic, and any percentile without retained population size and weights.

## 17. Final recommended strategy

Acquire the pinned Release 3 dictionaries and annual-result partitions once, aggregate paired baseline and upgrade rows in DuckDB, review the retrofit crosswalk, and publish only the approved California and national segment summaries.
This is the single recommended production path for this Standard.
The rejected alternative is: Runtime OEDI queries are rejected because they add a network dependency and expose a very large analytical dataset to customer-request latency.

## 18. Potential later Information Card changes

No Information Card change is made on this research branch.
Later review may update the visible source version, fallback wording, input ownership, category scope, or status to match the supported boundary documented above.
Any formula change must be separately researched, reviewed, and approved.
Any fallback must name its authoritative population and exact numeric selection rule.
