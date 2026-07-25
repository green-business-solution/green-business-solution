# STD-FUELECONOMY-VEHICLES - FuelEconomy.gov vehicle efficiency data

## 1. Canonical role and current process proof

This Standard is used by 2 categories and 2 category-local process instances.
The categories are ITC-28, ITC-29.
The process keys are fueleconomy_vehicles.
The formula terms supplied are existing_combined_mpg, proposed_combE, vehicle_kWh_per_mile.
The canonical output set contains 3 distinct output descriptions.

| Category and process | Execution-verified proof level | Adapter | Actual adapter test result | Current blocker | Conditional next action |
| --- | --- | --- | --- | --- | --- |
| ITC-28/fueleconomy_vehicles | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/fueleconomy/run.mjs | fueleconomy-itc28-electric-intensity-proof: NOT_COVERED<br>fueleconomy-missing-column-failure-proof: NOT_COVERED<br>fueleconomy-offline-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| ITC-29/fueleconomy_vehicles | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/fueleconomy/run.mjs | fueleconomy-incompatible-pair-failure-proof: NOT_COVERED<br>fueleconomy-offline-proof: NOT_COVERED<br>fueleconomy-real-bulk-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## 2. Official source inventory

The primary organization is U.S. Department of Energy and U.S. Environmental Protection Agency.
The selected official source is FuelEconomy.gov vehicle data.
The catalog acquisition target is 1984-current bulk vehicle table downloaded 2026-07-23.
Its release date or release state is Continuously updated by model year and corrections.
The expected update cadence is Frequent during model-year certification cycles.
The license finding is U.S. government data; retain agency attribution and inspect any linked third-party content separately.
The legal-review requirement is Low, subject to confirmation of bulk-download terms.
These catalog values describe the planned source inventory and do not replace proof-manifest artifact identity.

- https://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip
- https://www.fueleconomy.gov/feg/ws/index.shtml

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-FUELECONOMY-COMB08 | FuelEconomy.gov Web Services exact Hyundai Kona vehicle records | Vehicle record 43764 modified 2021-08-24; retrieved 2026-07-22 | VERIFIED | GET /ws/rest/vehicle/43764 |
| E-FUELECONOMY-COMBE | FuelEconomy.gov Web Services exact Hyundai Kona vehicle records | Vehicle record 44444 modified 2022-10-26; retrieved 2026-07-22 | VERIFIED | GET /ws/rest/vehicle/44444 |
| E-FUELECONOMY-DISTRIBUTION-UNSUPPORTED | FuelEconomy.gov vehicle table | 1984-current | UNSUPPORTED | No approved eligible-population fixture |

## 3. What can actually be acquired

- Public vehicles.csv.zip bulk download
- Public XML web services
- Public downloadable data files

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public vehicles.csv.zip bulk download | https://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | 2185627 bytes observed; ZIP CSV; ZIP-compressed | 1984-current bulk vehicle table downloaded 2026-07-23; Frequent during model-year certification cycles; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | The official 2.19 MB ZIP was downloaded and its CSV header and exact vehicle fields were inspected |
| Public XML web services | https://www.fueleconomy.gov/feg/ws/index.shtml | No authentication, registration, or API key observed for this route | No route-specific limit was established; do not use at estimate time | Not separately sized; Route-specific source structure | 1984-current bulk vehicle table downloaded 2026-07-23; Frequent during model-year certification cycles; Monitor URL and checksum drift | Permitted only for scheduled ingestion under published terms and limits | Not separately probed; retained as a documented alternative |
| Public downloadable data files | https://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | 1984-current bulk vehicle table downloaded 2026-07-23; Frequent during model-year certification cycles; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |

The tested access result is: The official 2.19 MB ZIP was downloaded and its CSV header and exact vehicle fields were inspected.
The planning catalog observation is vehicles.csv.zip, ZIP CSV, 2185627 bytes, sha256:83ee4bf48e65e8e962e55952e0bfbdc6ab94d4bf63f42e2d38aa39143d6f1ecc.
The access-cost classification is completely free.

## 4. Proof-backed artifacts, releases, and schemas

The following table is generated from current proof contributions that explicitly name this Standard.
It reports retained artifact releases, versions, locators, and integrity values instead of treating the planning catalog observation as executed proof.

| Artifact ID | Evidence role | Retained release or version | Exact locator | Integrity | Current proof state | Bound processes |
| --- | --- | --- | --- | --- | --- | --- |
| artifact:fueleconomy-vehicles:2026-07-23 | PUBLIC_BULK_DOWNLOAD | bulk snapshot acquired 2026-07-23 | https://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip | sha256:83ee4bf48e65e8e962e55952e0bfbdc6ab94d4bf63f42e2d38aa39143d6f1ecc; 2185627 bytes | DOCUMENTATION_ONLY | ITC-28/fueleconomy_vehicles, ITC-29/fueleconomy_vehicles |

The current proof manifests record these inspected schemas:

| Schema ID | Artifact ID | Format | Extractor | Required native fields | Current proof state |
| --- | --- | --- | --- | --- | --- |
| schema:fueleconomy-vehicles:2026-07-23 | artifact:fueleconomy-vehicles:2026-07-23 | ZIP_CSV | scripts/research/operational-savings/adapters/fueleconomy/inspect-schema.mjs | id; year; make; model; VClass; drive; fuelType1; comb08; combE; modifiedOn | DOCUMENTATION_ONLY |

Catalog-native field names that still require proof-backed inspection are:

- `id`
- `year`
- `make`
- `model`
- `VClass`
- `drive`
- `fuelType`
- `comb08`
- `combE`
- `modifiedOn`

Null means unknown or not reported and must never be converted to zero.
Inactive, withdrawn, superseded, and historical records remain immutable and are excluded from current resolution unless an explicit historical query selects them.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Measured kilowatt-hours per mile from a Project Document, when available | fueleconomy_vehicles; ITC-28 | Project Document | Annual Operational Cost Impact > Vehicle Electricity Intensity > Measured Kilowatt-Hours per Mile from Fleet Study or Contractor Charging Design | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Exact proposed vehicle make, model, year, and drivetrain from the linked opportunity, when named | fueleconomy_vehicles; ITC-28 | Linked Opportunity | Annual Operational Cost Impact > Vehicle Electricity Intensity > Exact Proposed Vehicle Model, Year, and Drivetrain, when Named by the Opportunity | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Vehicle class and service need | fueleconomy_vehicles; ITC-28 | User | Annual Operational Cost Impact > Vehicle Class and Service Need | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Class-matched electricity intensity from the connected Fleet DNA benchmark | fueleconomy_vehicles; ITC-28 | Standard Output | Annual Operational Cost Impact > Fleet Charging Activity > Standard 1.3 - Fleet Charging Activity and Vehicle Benchmark | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing vehicle make and model | fueleconomy_vehicles; ITC-29 | User | Annual Operational Savings > Avoided Gasoline Cost > Existing Vehicle Make and Model | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed vehicle make and model | fueleconomy_vehicles; ITC-29 | Linked Opportunity | Annual Operational Savings > Added Electricity Cost > Proposed Vehicle Make and Model | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing approximate model year | fueleconomy_vehicles; ITC-29 | User | Annual Operational Savings > Avoided Gasoline Cost > Approximate Model Year | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed approximate model year | fueleconomy_vehicles; ITC-29 | Linked Opportunity | Annual Operational Savings > Added Electricity Cost > Approximate Model Year | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing version or drivetrain details only when needed to resolve an ambiguous match | fueleconomy_vehicles; ITC-29 | User | Annual Operational Savings > Avoided Gasoline Cost > Additional Version or Drivetrain Details, only when the match is ambiguous | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed version or drivetrain details only when needed to resolve an ambiguous match | fueleconomy_vehicles; ITC-29 | Linked Opportunity | Annual Operational Savings > Added Electricity Cost > Additional Version or Drivetrain Details, only when the match is ambiguous | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Vehicle electricity intensity at the wall | fueleconomy_vehicles; ITC-28 | artifact:fueleconomy-vehicles:2026-07-23 | id; year; make; model; VClass; drive; fuelType; comb08; combE; modifiedOn | existing_gallons_per_mile = 1 / comb08_mpg; proposed_wall_kwh_per_mile = combE_kwh_per_100_miles / 100 | kWh/mile | DERIVABLE_FROM_SOURCE | Arbitrary class medians without population review and commercial fleet duty not represented by light-duty labels |
| Existing combined fuel economy | fueleconomy_vehicles; ITC-29 | artifact:fueleconomy-vehicles:2026-07-23 | id; year; make; model; VClass; drive; fuelType; comb08; combE; modifiedOn | existing_gallons_per_mile = 1 / comb08_mpg; proposed_wall_kwh_per_mile = combE_kwh_per_100_miles / 100 | miles/gallon | DERIVABLE_FROM_SOURCE | Arbitrary class medians without population review and commercial fleet duty not represented by light-duty labels |
| Proposed electricity use at the wall | fueleconomy_vehicles; ITC-29 | artifact:fueleconomy-vehicles:2026-07-23 | id; year; make; model; VClass; drive; fuelType; comb08; combE; modifiedOn | existing_gallons_per_mile = 1 / comb08_mpg; proposed_wall_kwh_per_mile = combE_kwh_per_100_miles / 100 | kWh/100 miles | DERIVABLE_FROM_SOURCE | Arbitrary class medians without population review and commercial fleet duty not represented by light-duty labels |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: existing_gallons_per_mile = 1 / comb08_mpg; proposed_wall_kwh_per_mile = combE_kwh_per_100_miles / 100.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition and internal publication

```text
FuelEconomy.gov vehicle data
-> Public vehicles.csv.zip bulk download
-> immutable checksummed raw artifact
-> source-specific schema and enumeration validation
-> typed normalization into equipment_products + equipment_performance_fields + product_taxonomy_crosswalks
-> deterministic fueleconomy-vehicles adapter
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

The exact output contract contains: Vehicle electricity intensity at the wall; Existing combined fuel economy; Proposed electricity use at the wall.
The governing source equation or transformation is existing_gallons_per_mile = 1 / comb08_mpg; proposed_wall_kwh_per_mile = combE_kwh_per_100_miles / 100.
The selected runtime design is Scheduled bulk CSV ingestion into versioned vehicle records and exact-pair resolution.
The required number of external calls during a customer estimate is zero.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid dates, impossible physical values, or a mismatched model version.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the source-artifact or content-addressed project-input identity, source release when applicable, adapter version, input hash, model or formula version, and output hash.

## 9. Refresh, immutable identity, and publication receipt

Refresh follows Frequent during model-year certification cycles.
Source IDs, release IDs, artifact IDs, project-input hashes, calculation IDs, and model-version IDs are content-bound identities.
An upsert may confirm an identical record but may not silently rewrite content behind one of those identities.
A source-backed dependency pins a source artifact and release, while a project-owned dependency may leave those fields null only when its exact input run and input SHA-256 carry the provenance.
Database publication builds the SQLite database, compact export, and receipt in temporary paths.
The publisher verifies byte sizes, SHA-256 values, and one generation ID before replacing the database and compact export, then renames the receipt last as the commit marker.
Consumers verify `docs/operational-savings-automation-research/fixtures/research-database.compact.json` against `docs/operational-savings-automation-research/fixtures/research-database.publication.json`.
A failed publication preserves the prior committed generation.

## 10. Cost

One-time engineering effort is 40-70 hours.
Estimated raw storage is 0.1 GB.
Estimated published storage is 0.1 GB.
Refresh effort is 1-2 monthly.
Maintenance burden is Low.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.03 at 100 calculations per month, $0.05 at 1,000, and $0.20 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 11. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/fueleconomy-vehicles.sample.json`.
Its local output kind is `model_result_set`, its selection rule is `PINNED_LOCAL_FORMULA:vehicleIntensity`, and its output unit is `gallon/mile and kWh/mile`.
This synthetic regression does not prove acquisition, source-specific parsing, a real model run, database publication, or category formula-term reachability.

## 12. Feasibility and supported boundary

**NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES**

This verdict is derived from 2 bound processes.
No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary.
The proof ledger records 0 end-to-end real processes, 0 source-verified processes, and 0 processes with genuine manual-export downstream proof.
The supported boundary is Exact vehicle records and explicit compatible vehicle pairs.
The unsupported boundary is Arbitrary class medians without population review and commercial fleet duty not represented by light-duty labels.

## 13. Recommended strategy and later card review

Ingest the bulk file, normalize exact IDs and conservative make-model aliases, retain model year and modification date, and require either exact records or a separately approved compatible pair.
The rejected alternative is: Live per-vehicle web-service calls are rejected because the bulk file is smaller, cheaper, versionable, and offline.
No Information Card change is made on this research branch.
Later review may update visible source versions, fallback wording, ownership, category scope, or status only after the generated proof view supports the change.
Any formula change requires separate research, review, and approval.
