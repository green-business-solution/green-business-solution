# STD-SCOUT-ECM-SCREEN - Scout ECM performance screen

## 1. RetroFi role

This Standard is used by 3 categories and 3 category-local process instances.
The categories are ITC-05, ITC-11, ITC-14.
The process keys are scout_ecm_screen.
The formula terms supplied are Scout_reduction_fraction_r, duct_loss_reduction_fraction, reduction_fraction.
The current claimed output set contains 1 distinct output description.
The present automation limitation is: Keyword-selected measures, prospective assumptions without review, and generic savings factors applied outside the source market.

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-SCOUT-ECM | Scout source repository | Unpinned | UNVERIFIED | ECM definitions and Scout processing code |

## 2. Official source inventory

The primary organization is U.S. Department of Energy and National Laboratory of the Rockies.
The selected official source is Scout.
The pinned version is Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3.
The release date or release state is 2026-07-23.
The expected update cadence is Continuous source repository with release tags.
The license finding is Apache-2.0, with a conditional BSD alternative.
The legal-review requirement is Retain the selected license text and source commit; do not imply DOE endorsement.

- https://github.com/trynthink/scout
- https://scout-bto.readthedocs.io/

## 3. What can actually be acquired

- Public Git repository
- ECM JSON definitions
- Baseline stock and technology data files
- Local Python execution

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public Git repository | https://github.com/trynthink/scout | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Git tree | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3; Continuous source repository with release tags; Commit pins are stable | Public acquisition appears automatable, subject to artifact-specific license review | Repository cloned and the ECM definitions, schemas, examples, and processing code were inspected |
| ECM JSON definitions | https://github.com/trynthink/scout | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3; Continuous source repository with release tags; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Repository cloned and the ECM definitions, schemas, examples, and processing code were inspected |
| Baseline stock and technology data files | https://github.com/trynthink/scout | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3; Continuous source repository with release tags; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| Local Python execution | https://github.com/trynthink/scout | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Git commit 72bcf419eb1cb37379f163563344b0ec61507fd3; Continuous source repository with release tags; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |

The tested access result is: Repository cloned and the ECM definitions, schemas, examples, and processing code were inspected.
The retained inspected artifact is docs/examples/led_troffers.json, JSON; source repository content is pinned by commit where applicable.
The access-cost classification is completely free.

## 4. Real source structure

The observed source-native fields or model inputs are:

- `name`
- `climate_zone`
- `bldg_type`
- `structure_type`
- `end_use`
- `energy_efficiency`
- `energy_efficiency_units`
- `energy_efficiency_source`

These names are research requirements from the source inventory, not claims about an observed source schema.
Exact source types, units, enumerations, nullability, keys, workbook coordinates, or model declarations must come from the source-specific proof manifest under `scripts/research/operational-savings/adapters/scout-ecm-screen/`.
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
| HVAC share of billed resource, if known | scout_ecm_screen; ITC-05 | Project Document | Annual Operational Savings > Annual HVAC resource reduction > Annual HVAC resource by end use and fuel > Documented HVAC share of billed resource, if known from Submeter, Controls Trend, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing building vintage class | scout_ecm_screen; ITC-05, ITC-11, ITC-14 | User | Annual Operational Savings > Annual HVAC resource reduction > Existing building vintage class | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing duct location and condition | scout_ecm_screen; ITC-05 | User | Annual Operational Savings > Annual HVAC resource reduction > Existing duct location and condition | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed sealing and insulation scope | scout_ecm_screen; ITC-05 | Linked Opportunity | Annual Operational Savings > Annual HVAC resource reduction > Proposed sealing and insulation scope | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Building Type | scout_ecm_screen; ITC-05, ITC-11, ITC-14 | Profile | Annual Operational Savings > Annual HVAC resource reduction > Building Type | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Site Climate Zone | scout_ecm_screen; ITC-05, ITC-11, ITC-14 | Profile | Annual Operational Savings > Annual HVAC resource reduction > Site Climate Zone | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROFILE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Affected-load share, if known | scout_ecm_screen; ITC-11 | Project Document | Annual Operational Savings > Annual refrigeration electricity reduction > Affected refrigeration annual kWh > Documented Affected-load share, if known from Submeter, Controls Trend, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing condition or control | scout_ecm_screen; ITC-11 | User | Annual Operational Savings > Annual refrigeration electricity reduction > Existing condition or control | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed scope or sequence | scout_ecm_screen; ITC-11 | Linked Opportunity | Annual Operational Savings > Annual refrigeration electricity reduction > Proposed scope or sequence | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing Building Condition | scout_ecm_screen; ITC-14 | User | Annual Operational Savings > Annual direct resource reduction by end use and fuel > Existing Building Condition | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed Upgrade Option | scout_ecm_screen; ITC-14 | Linked Opportunity | Annual Operational Savings > Annual direct resource reduction by end use and fuel > Proposed Upgrade Option | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Documented resource-reduction factor for the approved measure and market segment, with source version and units | scout_ecm_screen; ITC-05 | docs/examples/led_troffers.json | name; climate_zone; bldg_type; structure_type; end_use; energy_efficiency; energy_efficiency_units; energy_efficiency_source | When the ECM supplies relative savings, reduction_fraction = energy_efficiency; when it supplies baseline and efficient performance, reduction_fraction = 1 - efficient_performance / baseline_performance | fraction | DERIVABLE_FROM_SOURCE | Keyword-selected measures, prospective assumptions without review, and generic savings factors applied outside the source market |
| Documented resource-reduction factor for the approved measure and market segment, with source version and units | scout_ecm_screen; ITC-11 | docs/examples/led_troffers.json | name; climate_zone; bldg_type; structure_type; end_use; energy_efficiency; energy_efficiency_units; energy_efficiency_source | When the ECM supplies relative savings, reduction_fraction = energy_efficiency; when it supplies baseline and efficient performance, reduction_fraction = 1 - efficient_performance / baseline_performance | fraction | DERIVABLE_FROM_SOURCE | Keyword-selected measures, prospective assumptions without review, and generic savings factors applied outside the source market |
| Documented resource-reduction factor for the approved measure and market segment, with source version and units | scout_ecm_screen; ITC-14 | docs/examples/led_troffers.json | name; climate_zone; bldg_type; structure_type; end_use; energy_efficiency; energy_efficiency_units; energy_efficiency_source | When the ECM supplies relative savings, reduction_fraction = energy_efficiency; when it supplies baseline and efficient performance, reduction_fraction = 1 - efficient_performance / baseline_performance | fraction | DERIVABLE_FROM_SOURCE | Keyword-selected measures, prospective assumptions without review, and generic savings factors applied outside the source market |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: When the ECM supplies relative savings, reduction_fraction = energy_efficiency; when it supplies baseline and efficient performance, reduction_fraction = 1 - efficient_performance / baseline_performance.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition workflow

```text
Scout
-> Public Git repository
-> immutable raw snapshot
-> SHA-256 checksum and media-type validation
-> schema and enumeration validation
-> source-specific normalization and deduplication
-> building_upgrade_measures + retrofit_measure_crosswalks + benchmark_populations + benchmark_values + model_versions
-> deterministic scout-ecm-screen adapter
-> typed formula input
-> calculation result with provenance
```

Acquisition runs under a scheduler or operator action and never during a customer estimate.
A failed checksum, schema drift, or incomplete artifact leaves the prior published release active.

## 7. Internal database schema

The intended normalized targets are building_upgrade_measures, retrofit_measure_crosswalks, benchmark_populations, benchmark_values, model_versions.
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
The unsupported boundary is Keyword-selected measures, prospective assumptions without review, and generic savings factors applied outside the source market.

## 11. Calculation or local-model execution

The exact output contract contains: Documented resource-reduction factor for the approved measure and market segment, with source version and units.
The governing source equation or transformation is When the ECM supplies relative savings, reduction_fraction = energy_efficiency; when it supplies baseline and efficient performance, reduction_fraction = 1 - efficient_performance / baseline_performance.
The local execution mode is Pinned build-time Scout preparation followed by compact approved ECM lookup artifacts.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid effective dates, out-of-range physical values, or a mismatched model version.
Outputs retain their native unit and a normalized unit from the repository unit registry.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the raw-artifact checksum, source release, adapter version, input hash, model or formula version, and output hash.

## 12. Refresh and versioning

Refresh follows Continuous source repository with release tags.
Release detection compares official release metadata and artifact checksums.
A changed checksum under an unchanged source version is quarantined for review.
Schema drift compares columns, types, required fields, enumeration values, workbook sheets, or model input declarations against the prior accepted fingerprint.
Raw snapshots, normalized releases, crosswalks, and selection outputs are immutable.
Publication uses an atomic pointer to the accepted release.
Rollback changes only that pointer and records an operator reason.
Deprecated releases remain available for historical calculation replay.
Stale data is labeled and blocked when an effective-date or certification-status guarantee can no longer be made.

## 13. Runtime design

The selected runtime design is Pinned build-time Scout preparation followed by compact approved ECM lookup artifacts.
The required number of external calls during a customer estimate is zero.
The adapter reads a published internal release or executes a pinned local model only.
If the source is offline, existing published releases and reproducible historical calculations continue to work.

## 14. Cost

One-time engineering effort is 80-130 hours.
Estimated raw storage is 3 GB.
Estimated published storage is 0.1 GB.
Refresh effort is 8-16 per release.
Maintenance burden is Medium.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.15 at 100 calculations per month, $0.20 at 1,000, and $0.50 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 15. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/scout-ecm-screen.sample.json`.
Its local output kind is `product_record`, its selection rule is `EXACT_NORMALIZED_IDENTIFIER`, and its output unit is `lm/W`.
This synthetic regression executes without network access, but it does not prove acquisition, schema inspection, source-specific parsing, a real model run, database publication, or formula-term reachability.
Only the separate real-proof registry and source-backed tests may satisfy those gates.

## 16. Feasibility verdict

**FEASIBLE_AFTER_ADAPTER_WORK**

The supported boundary is Explicit Scout ECM definitions whose markets and efficiency units match a reviewed RetroFi retrofit.
The unsupported boundary is Keyword-selected measures, prospective assumptions without review, and generic savings factors applied outside the source market.

## 17. Final recommended strategy

Pin one Scout release, validate each approved ECM JSON against its source schema, execute preparation offline, and publish only reviewed reduction factors with the complete market selector.
This is the single recommended production path for this Standard.
The rejected alternative is: A generic Scout median is rejected because ECM results are structured scenarios and not an interchangeable benchmark population.

## 18. Potential later Information Card changes

No Information Card change is made on this research branch.
Later review may update the visible source version, fallback wording, input ownership, category scope, or status to match the supported boundary documented above.
Any formula change must be separately researched, reviewed, and approved.
Any fallback must name its authoritative population and exact numeric selection rule.
