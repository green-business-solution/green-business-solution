# STD-COMSTOCK-ANNUAL-DELTA - ComStock annual upgrade resource delta

## 1. Canonical role and current process proof

This Standard is used by 1 category and 1 category-local process instance.
The categories are ITC-01.
The process keys are comstock_annual_delta.
The formula terms supplied are median_ComStock_delta_r_per_ft².
The canonical output set contains 1 distinct output description.

| Category and process | Execution-verified proof level | Adapter | Actual adapter test result | Current blocker | Conditional next action |
| --- | --- | --- | --- | --- | --- |
| ITC-01/comstock_annual_delta | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/comstock/run.mjs | comstock-artifact-network-failure-proof: NOT_COVERED<br>comstock-real-release-3-annual-delta-proof: NOT_COVERED<br>comstock-resolution-failure-proof: NOT_COVERED<br>comstock-schema-failure-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## 2. Official source inventory

The primary organization is National Laboratory of the Rockies.
The selected official source is ComStock 2025 Release 3.
The catalog acquisition target is 2025 Release 3.
Its release date or release state is 2025-11.
The expected update cadence is Release based, historically several releases per year.
The license finding is OEDI data is published for public access; retain release-specific license and attribution metadata.
The legal-review requirement is Confirm the license metadata attached to every OEDI release before production publication.
These catalog values describe the planned source inventory and do not replace proof-manifest artifact identity.

- https://natlabrockies.github.io/ComStock.github.io/docs/data.html
- https://natlabrockies.github.io/ComStock.github.io/docs/upgrade_measures/upgrade_measures.html
- https://oedi-data-lake.s3.amazonaws.com/nrel-pds-building-stock/end-use-load-profiles-for-us-building-stock/2025/comstock_amy2018_release_3/upgrades_lookup.json

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-COMSTOCK-DELTA | ComStock 2025 Release 3 data | 2025 Release 3 | UNVERIFIED | OEDI metadata_and_annual_results Parquet plus data_dictionary.tsv and enumeration_dictionary.tsv |
| E-COMSTOCK-TAXONOMY | ComStock upgrade measures | 2025 Release 3 | UNVERIFIED | measure_name_crosswalk.csv and upgrades_lookup.json |

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
The planning catalog observation is upgrades_lookup.json, JSON, 3752 bytes, sha256:c3ba607e650d3b78cd86f08ef3cd6e632b7e622797a970cd8f16812e41a1ce5a.
The access-cost classification is completely free.

## 4. Proof-backed artifacts, releases, and schemas

The following table is generated from current proof contributions that explicitly name this Standard.
It reports retained artifact releases, versions, locators, and integrity values instead of treating the planning catalog observation as executed proof.

| Artifact ID | Evidence role | Retained release or version | Exact locator | Integrity | Current proof state | Bound processes |
| --- | --- | --- | --- | --- | --- | --- |
| artifact:comstock-2025-release-3-ca-g0600750-upgrade-0 | PUBLIC_OEDI_DOWNLOAD | 2025 ComStock Release 3 | https://oedi-data-lake.s3.amazonaws.com/nrel-pds-building-stock/end-use-load-profiles-for-us-building-stock/2025/comstock_amy2018_release_3/metadata_and_annual_results/by_state_and_county/full/parquet/state=CA/county=G0600750/CA_G0600750_upgrade0.parquet | sha256:df4d4e40099a4c73f128fcc621cfc5b7facc6eb621e13eddf21a43bc87afdc40; 16866929 bytes | DOCUMENTATION_ONLY | ITC-01/comstock_annual_delta |
| artifact:comstock-2025-release-3-ca-g0600750-upgrade-43 | PUBLIC_OEDI_DOWNLOAD | 2025 ComStock Release 3 | https://oedi-data-lake.s3.amazonaws.com/nrel-pds-building-stock/end-use-load-profiles-for-us-building-stock/2025/comstock_amy2018_release_3/metadata_and_annual_results/by_state_and_county/full/parquet/state=CA/county=G0600750/CA_G0600750_upgrade43.parquet | sha256:1c658e2a59a83f24f55fab04187cd0cde6546c6bf5e43dc8beb456479403dbde; 19572532 bytes | DOCUMENTATION_ONLY | ITC-01/comstock_annual_delta |
| artifact:comstock-2025-release-3-data-dictionary | PUBLIC_OEDI_DOWNLOAD | 2025 ComStock Release 3 | https://oedi-data-lake.s3.amazonaws.com/nrel-pds-building-stock/end-use-load-profiles-for-us-building-stock/2025/comstock_amy2018_release_3/data_dictionary.tsv | sha256:11c03e4794ed12c5d8fc81c1253d97c033f217c79cc217e00110052b2d23ea4b; 250000 bytes | DOCUMENTATION_ONLY | ITC-01/comstock_annual_delta |
| artifact:comstock-2025-release-3-enumeration-dictionary | PUBLIC_OEDI_DOWNLOAD | 2025 ComStock Release 3 | https://oedi-data-lake.s3.amazonaws.com/nrel-pds-building-stock/end-use-load-profiles-for-us-building-stock/2025/comstock_amy2018_release_3/enumeration_dictionary.tsv | sha256:0d721355dc3f1cee2f42e6db750c0de2daef1773404bab3125d1bda1960e007e; 30953 bytes | DOCUMENTATION_ONLY | ITC-01/comstock_annual_delta |
| artifact:comstock-2025-release-3-measure-crosswalk | PUBLIC_OEDI_DOWNLOAD | 2025 ComStock Release 3 | https://oedi-data-lake.s3.amazonaws.com/nrel-pds-building-stock/end-use-load-profiles-for-us-building-stock/2025/comstock_amy2018_release_3/measure_name_crosswalk.csv | sha256:cf87e5905df7291b4d2bbbd9491ad3f0cde55b3e5e43298308c429c9454b4462; 20900 bytes | DOCUMENTATION_ONLY | ITC-01/comstock_annual_delta |
| artifact:comstock-2025-release-3-upgrades | PUBLIC_OEDI_DOWNLOAD | 2025 ComStock Release 3 | https://oedi-data-lake.s3.amazonaws.com/nrel-pds-building-stock/end-use-load-profiles-for-us-building-stock/2025/comstock_amy2018_release_3/upgrades_lookup.json | sha256:c3ba607e650d3b78cd86f08ef3cd6e632b7e622797a970cd8f16812e41a1ce5a; 3752 bytes | DOCUMENTATION_ONLY | ITC-01/comstock_annual_delta |

The current proof manifests record these inspected schemas:

| Schema ID | Artifact ID | Format | Extractor | Required native fields | Current proof state |
| --- | --- | --- | --- | --- | --- |
| schema:comstock-2025-release-3-bundle |  | COMSTOCK_RELEASE_BUNDLE | scripts/research/operational-savings/adapters/comstock/inspect-schema.mjs | bldg_id; weight; upgrade; applicability; completed_status; dataset; in.comstock_building_type; in.county_name; in.state; in.sqft..ft2; out.electricity.total.energy_consumption..kwh; measure_id; 2025_comstock_amy2018_release_3_upgrade_id; 2025_comstock_amy2018_release_3_upgrade_name | DOCUMENTATION_ONLY |

Catalog-native field names that still require proof-backed inspection are:

- `upgrade_id`
- `upgrade_name`
- `building_id`
- `weight`
- `floor_area`
- `baseline annual resource fields`
- `upgrade annual resource fields`

Null means unknown or not reported and must never be converted to zero.
Inactive, withdrawn, superseded, and historical records remain immutable and are excluded from current resolution unless an explicit historical query selects them.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Existing Building Condition | comstock_annual_delta; ITC-01 | User | Annual Operational Savings > Annual resource delta by resource > Existing Building Condition | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed Upgrade Option | comstock_annual_delta; ITC-01 | Linked Opportunity | Annual Operational Savings > Annual resource delta by resource > Proposed Upgrade Option | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Building Type | comstock_annual_delta; ITC-01 | Profile | Annual Operational Savings > Annual resource delta by resource > Building Type | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site State or County | comstock_annual_delta; ITC-01 | Profile | Annual Operational Savings > Annual resource delta by resource > Site State or County | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Building Area, approximate unless subsequently verified | comstock_annual_delta; ITC-01 | Profile | Annual Operational Savings > Annual resource delta by resource > Building Area, approximate unless subsequently verified | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual electricity and fuel-use change per square foot for the approved measure and building segment, with source version and units | comstock_annual_delta; ITC-01 | artifact:comstock-2025-release-3-ca-g0600750-upgrade-0; artifact:comstock-2025-release-3-ca-g0600750-upgrade-43; artifact:comstock-2025-release-3-data-dictionary; artifact:comstock-2025-release-3-enumeration-dictionary; artifact:comstock-2025-release-3-measure-crosswalk; artifact:comstock-2025-release-3-upgrades | upgrade_id; upgrade_name; building_id; weight; floor_area; baseline annual resource fields; upgrade annual resource fields | delta_per_ft2 = (baseline_annual_resource - upgrade_annual_resource) / floor_area; population summaries use the release weight after identical eligibility filters | resource-unit/ft2-year | DERIVABLE_FROM_SOURCE | Project-specific equipment performance, combined upgrade arithmetic, and any percentile without retained population size and weights |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: delta_per_ft2 = (baseline_annual_resource - upgrade_annual_resource) / floor_area; population summaries use the release weight after identical eligibility filters.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition and internal publication

```text
ComStock 2025 Release 3
-> Public OEDI S3 Parquet partitions
-> immutable checksummed raw artifact
-> source-specific schema and enumeration validation
-> typed normalization into building_upgrade_measures + building_archetype_benchmarks + retrofit_measure_crosswalks + benchmark_populations + benchmark_values
-> deterministic comstock-annual-delta adapter
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

The exact output contract contains: Annual electricity and fuel-use change per square foot for the approved measure and building segment, with source version and units.
The governing source equation or transformation is delta_per_ft2 = (baseline_annual_resource - upgrade_annual_resource) / floor_area; population summaries use the release weight after identical eligibility filters.
The selected runtime design is Build-time Parquet aggregation published as a compact versioned lookup artifact.
The required number of external calls during a customer estimate is zero.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid dates, impossible physical values, or a mismatched model version.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the source-artifact or content-addressed project-input identity, source release when applicable, adapter version, input hash, model or formula version, and output hash.

## 9. Refresh, immutable identity, and publication receipt

Refresh follows Release based, historically several releases per year.
Source IDs, release IDs, artifact IDs, project-input hashes, calculation IDs, and model-version IDs are content-bound identities.
An upsert may confirm an identical record but may not silently rewrite content behind one of those identities.
A source-backed dependency pins a source artifact and release, while a project-owned dependency may leave those fields null only when its exact input run and input SHA-256 carry the provenance.
Database publication builds the SQLite database, compact export, and receipt in temporary paths.
The publisher verifies byte sizes, SHA-256 values, and one generation ID before replacing the database and compact export, then renames the receipt last as the commit marker.
Consumers verify `docs/operational-savings-automation-research/fixtures/research-database.compact.json` against `docs/operational-savings-automation-research/fixtures/research-database.publication.json`.
A failed publication preserves the prior committed generation.

## 10. Cost

One-time engineering effort is 100-160 hours.
Estimated raw storage is 60 GB.
Estimated published storage is 3 GB.
Refresh effort is 12-24 per release.
Maintenance burden is Medium.
External source cost is $0 per month.
Estimated internal storage and compute cost is $2.50 at 100 calculations per month, $3 at 1,000, and $6 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 11. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/comstock-annual-delta.sample.json`.
Its local output kind is `product_record`, its selection rule is `EXACT_NORMALIZED_IDENTIFIER`, and its output unit is `record`.
This synthetic regression does not prove acquisition, source-specific parsing, a real model run, database publication, or category formula-term reachability.

## 12. Feasibility and supported boundary

**NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES**

This verdict is derived from 1 bound process.
No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary.
The proof ledger records 0 end-to-end real processes, 0 source-verified processes, and 0 processes with genuine manual-export downstream proof.
The supported boundary is Archetype screening for an approved one-to-one measure and eligible building segment.
The unsupported boundary is Project-specific equipment performance, combined upgrade arithmetic, and any percentile without retained population size and weights.

## 13. Recommended strategy and later card review

Acquire the pinned Release 3 dictionaries and annual-result partitions once, aggregate paired baseline and upgrade rows in DuckDB, review the retrofit crosswalk, and publish only the approved California and national segment summaries.
The rejected alternative is: Runtime OEDI queries are rejected because they add a network dependency and expose a very large analytical dataset to customer-request latency.
No Information Card change is made on this research branch.
Later review may update visible source versions, fallback wording, ownership, category scope, or status only after the generated proof view supports the change.
Any formula change requires separate research, review, and approval.
