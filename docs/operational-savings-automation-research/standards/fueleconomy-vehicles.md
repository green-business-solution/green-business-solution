# STD-FUELECONOMY-VEHICLES - FuelEconomy.gov vehicle efficiency data

## 1. RetroFi role

This Standard is used by 2 categories and 2 category-local process instances.
The categories are ITC-28, ITC-29.
The process keys are fueleconomy_vehicles.
The formula terms supplied are existing_combined_mpg, proposed_combE, vehicle_kWh_per_mile.
The current claimed output set contains 3 distinct output descriptions.
The present automation limitation is: Arbitrary class medians without population review and commercial fleet duty not represented by light-duty labels.

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-FUELECONOMY-COMB08 | FuelEconomy.gov Web Services exact Hyundai Kona vehicle records | Vehicle record 43764 modified 2021-08-24; retrieved 2026-07-22 | VERIFIED | GET /ws/rest/vehicle/43764 |
| E-FUELECONOMY-COMBE | FuelEconomy.gov Web Services exact Hyundai Kona vehicle records | Vehicle record 44444 modified 2022-10-26; retrieved 2026-07-22 | VERIFIED | GET /ws/rest/vehicle/44444 |
| E-FUELECONOMY-DISTRIBUTION-UNSUPPORTED | FuelEconomy.gov vehicle table | 1984-current | UNSUPPORTED | No approved eligible-population fixture |

## 2. Official source inventory

The primary organization is U.S. Department of Energy and U.S. Environmental Protection Agency.
The selected official source is FuelEconomy.gov vehicle data.
The pinned version is 1984-current bulk vehicle table downloaded 2026-07-23.
The release date or release state is Continuously updated by model year and corrections.
The expected update cadence is Frequent during model-year certification cycles.
The license finding is U.S. government data; retain agency attribution and inspect any linked third-party content separately.
The legal-review requirement is Low, subject to confirmation of bulk-download terms.

- https://www.fueleconomy.gov/feg/epadata/vehicles.csv.zip
- https://www.fueleconomy.gov/feg/ws/index.shtml

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
The retained inspected artifact is vehicles.csv.zip, ZIP CSV, 2185627 bytes, sha256:83ee4bf48e65e8e962e55952e0bfbdc6ab94d4bf63f42e2d38aa39143d6f1ecc.
The access-cost classification is completely free.

## 4. Real source structure

The observed source-native fields or model inputs are:

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

| Field or structure | Shape to validate and pin | Native unit | Key or filter role | Null handling | Enumeration handling |
| --- | --- | --- | --- | --- | --- |
| id | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Natural-key candidate or key component | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| year | Date, timestamp, or source date string | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| make | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| model | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| VClass | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Mandatory filter or version dimension | Preserve source nulls; reject null only when the process requires the field | Preserve and pin native enumeration values per release |
| drive | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Preserve and pin native enumeration values per release |
| fuelType | Numeric scalar or numeric series | Source-declared fuel or thermal unit | Mandatory filter or version dimension | Preserve source nulls; reject null only when the process requires the field | Preserve and pin native enumeration values per release |
| comb08 | Numeric scalar or numeric series | Miles/gallon | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| combE | Numeric scalar or numeric series | kWh/100 miles | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| modifiedOn | Date, timestamp, or source date string | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |

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
| Measured kilowatt-hours per mile from a Project Document, when available | fueleconomy_vehicles; ITC-28 | Project Document | Annual Operational Cost Impact > Vehicle Electricity Intensity > Measured Kilowatt-Hours per Mile from Fleet Study or Contractor Charging Design | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Exact proposed vehicle make, model, year, and drivetrain from the linked opportunity, when named | fueleconomy_vehicles; ITC-28 | Linked Opportunity | Annual Operational Cost Impact > Vehicle Electricity Intensity > Exact Proposed Vehicle Model, Year, and Drivetrain, when Named by the Opportunity | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Vehicle class and service need | fueleconomy_vehicles; ITC-28 | User | Annual Operational Cost Impact > Vehicle Class and Service Need | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Class-matched electricity intensity from the connected Fleet DNA benchmark | fueleconomy_vehicles; ITC-28 | Standard Output | Annual Operational Cost Impact > Fleet Charging Activity > Standard 1.3 - Fleet Charging Activity and Vehicle Benchmark | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing vehicle make and model | fueleconomy_vehicles; ITC-29 | User | Annual Operational Savings > Avoided Gasoline Cost > Existing Vehicle Make and Model | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed vehicle make and model | fueleconomy_vehicles; ITC-29 | Linked Opportunity | Annual Operational Savings > Added Electricity Cost > Proposed Vehicle Make and Model | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing approximate model year | fueleconomy_vehicles; ITC-29 | User | Annual Operational Savings > Avoided Gasoline Cost > Approximate Model Year | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed approximate model year | fueleconomy_vehicles; ITC-29 | Linked Opportunity | Annual Operational Savings > Added Electricity Cost > Approximate Model Year | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing version or drivetrain details only when needed to resolve an ambiguous match | fueleconomy_vehicles; ITC-29 | User | Annual Operational Savings > Avoided Gasoline Cost > Additional Version or Drivetrain Details, only when the match is ambiguous | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed version or drivetrain details only when needed to resolve an ambiguous match | fueleconomy_vehicles; ITC-29 | Linked Opportunity | Annual Operational Savings > Added Electricity Cost > Additional Version or Drivetrain Details, only when the match is ambiguous | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Vehicle electricity intensity at the wall | fueleconomy_vehicles; ITC-28 | vehicles.csv.zip | id; year; make; model; VClass; drive; fuelType; comb08; combE; modifiedOn | existing_gallons_per_mile = 1 / comb08_mpg; proposed_wall_kwh_per_mile = combE_kwh_per_100_miles / 100 | kWh/mile | DERIVABLE_FROM_SOURCE | Arbitrary class medians without population review and commercial fleet duty not represented by light-duty labels |
| Existing combined fuel economy | fueleconomy_vehicles; ITC-29 | vehicles.csv.zip | id; year; make; model; VClass; drive; fuelType; comb08; combE; modifiedOn | existing_gallons_per_mile = 1 / comb08_mpg; proposed_wall_kwh_per_mile = combE_kwh_per_100_miles / 100 | miles/gallon | DERIVABLE_FROM_SOURCE | Arbitrary class medians without population review and commercial fleet duty not represented by light-duty labels |
| Proposed electricity use at the wall | fueleconomy_vehicles; ITC-29 | vehicles.csv.zip | id; year; make; model; VClass; drive; fuelType; comb08; combE; modifiedOn | existing_gallons_per_mile = 1 / comb08_mpg; proposed_wall_kwh_per_mile = combE_kwh_per_100_miles / 100 | kWh/100 miles | DERIVABLE_FROM_SOURCE | Arbitrary class medians without population review and commercial fleet duty not represented by light-duty labels |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: existing_gallons_per_mile = 1 / comb08_mpg; proposed_wall_kwh_per_mile = combE_kwh_per_100_miles / 100.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition workflow

```text
FuelEconomy.gov vehicle data
-> Public vehicles.csv.zip bulk download
-> immutable raw snapshot
-> SHA-256 checksum and media-type validation
-> schema and enumeration validation
-> source-specific normalization and deduplication
-> equipment_products + equipment_performance_fields + product_taxonomy_crosswalks
-> deterministic fueleconomy-vehicles adapter
-> typed formula input
-> calculation result with provenance
```

Acquisition runs under a scheduler or operator action and never during a customer estimate.
A failed checksum, schema drift, or incomplete artifact leaves the prior published release active.

## 7. Internal database schema

The source uses the shared registry tables plus these target tables: equipment_products, equipment_performance_fields, product_taxonomy_crosswalks.

```sql
CREATE TABLE os_fueleconomy_vehicles_records (
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
CREATE INDEX os_fueleconomy_vehicles_active_exact_idx
  ON os_fueleconomy_vehicles_records ((normalized_payload->>'normalized_identifier'), effective_from, effective_to)
  WHERE active;
CREATE INDEX os_fueleconomy_vehicles_requirements_idx
  ON os_fueleconomy_vehicles_records USING gin (normalized_payload jsonb_path_ops)
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
The unsupported boundary is Arbitrary class medians without population review and commercial fleet duty not represented by light-duty labels.

## 11. Calculation or local-model execution

The exact output contract contains: Vehicle electricity intensity at the wall; Existing combined fuel economy; Proposed electricity use at the wall.
The governing source equation or transformation is existing_gallons_per_mile = 1 / comb08_mpg; proposed_wall_kwh_per_mile = combE_kwh_per_100_miles / 100.
The local execution mode is Scheduled bulk CSV ingestion into versioned vehicle records and exact-pair resolution.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid effective dates, out-of-range physical values, or a mismatched model version.
Outputs retain their native unit and a normalized unit from the repository unit registry.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the raw-artifact checksum, source release, adapter version, input hash, model or formula version, and output hash.

## 12. Refresh and versioning

Refresh follows Frequent during model-year certification cycles.
Release detection compares official release metadata and artifact checksums.
A changed checksum under an unchanged source version is quarantined for review.
Schema drift compares columns, types, required fields, enumeration values, workbook sheets, or model input declarations against the prior accepted fingerprint.
Raw snapshots, normalized releases, crosswalks, and selection outputs are immutable.
Publication uses an atomic pointer to the accepted release.
Rollback changes only that pointer and records an operator reason.
Deprecated releases remain available for historical calculation replay.
Stale data is labeled and blocked when an effective-date or certification-status guarantee can no longer be made.

## 13. Runtime design

The selected runtime design is Scheduled bulk CSV ingestion into versioned vehicle records and exact-pair resolution.
The required number of external calls during a customer estimate is zero.
The adapter reads a published internal release or executes a pinned local model only.
If the source is offline, existing published releases and reproducible historical calculations continue to work.

## 14. Cost

One-time engineering effort is 40-70 hours.
Estimated raw storage is 0.1 GB.
Estimated published storage is 0.1 GB.
Refresh effort is 1-2 monthly.
Maintenance burden is Low.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.03 at 100 calculations per month, $0.05 at 1,000, and $0.20 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 15. Prototype proof

The offline command is:

```bash
node scripts/research/operational-savings/run-prototypes.mjs --json
```

The acquired or inspected source evidence is Reviewed exact FuelEconomy.gov fields.
The retained compact sample is `docs/operational-savings-automation-research/samples/fueleconomy-vehicles.sample.json`.
The source or model interface inspected is vehicles.csv.zip.
The local output kind is `model_result_set`, the selection rule is `PINNED_LOCAL_FORMULA:vehicleIntensity`, and the output unit is `gallon/mile and kWh/mile`.
The prototype runs without network access after acquisition.
The prototype completed without warnings.
The prototype proves parsing, filtering, or calculation behavior only within the retained sample boundary.

## 16. Feasibility verdict

**FEASIBLE_NOW**

The supported boundary is Exact vehicle records and explicit compatible vehicle pairs.
The unsupported boundary is Arbitrary class medians without population review and commercial fleet duty not represented by light-duty labels.

## 17. Final recommended strategy

Ingest the bulk file, normalize exact IDs and conservative make-model aliases, retain model year and modification date, and require either exact records or a separately approved compatible pair.
This is the single recommended production path for this Standard.
The rejected alternative is: Live per-vehicle web-service calls are rejected because the bulk file is smaller, cheaper, versionable, and offline.

## 18. Potential later Information Card changes

No Information Card change is made on this research branch.
Later review may update the visible source version, fallback wording, input ownership, category scope, or status to match the supported boundary documented above.
Any formula change must be separately researched, reviewed, and approved.
Any fallback must name its authoritative population and exact numeric selection rule.
