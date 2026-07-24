# STD-FEMP-EXTERIOR-LIGHTING - Exterior fixture wattage and proposed-product resolution

## 1. RetroFi role

This Standard is used by 1 category and 3 category-local process instances.
The categories are ITC-02.
The process keys are exact-new-fixture-watts, lighting-replacement-calculation, requirement-new-fixture-watts.
The formula terms supplied are annual_kWh, proposed_kW.
The current claimed output set contains 3 distinct output descriptions.
The present automation limitation is: Existing fixture wattage inferred from FEMP proposed-efficiency requirements.

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-FEMP-PROPOSED | FEMP Purchasing Energy-Efficient Exterior Lighting | Updated June 2023 | VERIFIED | Table 1 - Efficiency Requirements for Exterior Lighting |
| E-FEMP-WALL-EXAMPLE | FEMP Purchasing Energy-Efficient Exterior Lighting | Updated June 2023 | VERIFIED | Table 2 - Lifetime Savings for Efficient Wall-Mounted Luminaires and Performance Column assumptions |
| E-FEMP-EXISTING-UNSUPPORTED | Purchasing Energy-Efficient Exterior Lighting | Updated June 2023 | UNSUPPORTED | Tables 1 and 2 |

## 2. Official source inventory

The primary organization is U.S. Department of Energy Federal Energy Management Program.
The selected official source is Purchasing Energy-Efficient Exterior Lighting.
The pinned version is Updated June 2023.
The release date or release state is 2023-06.
The expected update cadence is Irregular procurement-guidance updates.
The license finding is Federal guidance; retain DOE FEMP attribution.
The legal-review requirement is Low.

- https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting

## 3. What can actually be acquired

- Public HTML tables
- Printable federal procurement guidance

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public HTML tables | https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | 148626 bytes observed; HTML; Route-specific source structure | Updated June 2023; Irregular procurement-guidance updates; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | The official page downloaded and Table 1 LER requirements and Table 2 wall-mounted example were inspected |
| Printable federal procurement guidance | https://www.energy.gov/cmei/femp/purchasing-energy-efficient-exterior-lighting | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | Updated June 2023; Irregular procurement-guidance updates; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |

The tested access result is: The official page downloaded and Table 1 LER requirements and Table 2 wall-mounted example were inspected.
The retained inspected artifact is FEMP exterior-lighting HTML, HTML, 148626 bytes, sha256:cb50171c667e44e0c8fe1681fac57fcfe22d6adffe6ba1229bd9d103b8fc547a.
The access-cost classification is completely free.

## 4. Real source structure

The observed source-native fields or model inputs are:

- `application category`
- `required luminaire efficacy rating`
- `covered lumen range`
- `example luminaire power`
- `annual operating hours`
- `annual energy`

These names are research requirements from the source inventory, not claims about an observed source schema.
Exact source types, units, enumerations, nullability, keys, workbook coordinates, or model declarations must come from the source-specific proof manifest under `scripts/research/operational-savings/adapters/femp-exterior-lighting/`.
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
| Exact replacement product information from the linked opportunity | exact-new-fixture-watts; ITC-02 | Linked Opportunity | Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity names an exact replacement product > Exact Product Information | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Exterior lighting application | exact-new-fixture-watts, requirement-new-fixture-watts; ITC-02 | Linked Opportunity | Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity names an exact replacement product > Exact Product Information | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Product requirements from the linked opportunity | requirement-new-fixture-watts; ITC-02 | Linked Opportunity | Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity specifies requirements but no exact product > Product Requirements | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Required light output or performance criteria | requirement-new-fixture-watts; ITC-02 | Linked Opportunity | Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity specifies requirements but no exact product > Product Requirements | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Replacement fixture count | lighting-replacement-calculation; ITC-02 | User | Annual Operational Savings > Annual Electricity Reduction > Replacement Fixture Count | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing fixture watts | lighting-replacement-calculation; ITC-02 | Standard Output | Annual Operational Savings > Annual Electricity Reduction > Existing Fixture Watts > Standard 1.1 - Existing Fixture Wattage Benchmark | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed fixture watts from the exact-product process, when used | lighting-replacement-calculation; ITC-02 | Standard Output | Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity names an exact replacement product > Standard 1.2 - Exact New Fixture Wattage Lookup | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed fixture watts from the requirement-selected process, when used | lighting-replacement-calculation; ITC-02 | Standard Output | Annual Operational Savings > Annual Electricity Reduction > New Fixture Watts > Linked Opportunity specifies requirements but no exact product > Standard 1.3 - Requirement-Based New Fixture Wattage Resolution | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual operating hours from the fixed-schedule process, when used | lighting-replacement-calculation; ITC-02 | Standard Output | Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting follows a fixed or business schedule > Standard 2.1 - Fixed-Schedule Lighting Hours | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual operating hours from the daylight-based process, when used | lighting-replacement-calculation; ITC-02 | Standard Output | Annual Operational Savings > Annual Electricity Reduction > Annual Operating Hours > Exterior Lighting Operating Pattern > Lighting is dusk-to-dawn or photocell-controlled > Standard 2.2 - Daylight-Based Lighting Hours | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | DERIVABLE_FROM_SOURCE | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed input power per fixture | exact-new-fixture-watts; ITC-02 | FEMP exterior-lighting HTML | application category; required luminaire efficacy rating; covered lumen range; example luminaire power; annual operating hours; annual energy | proposed_fixture_watts = required_lumens / qualifying_ler_lm_per_w; annual_kwh_reduction = fixture_count * (existing_watts - proposed_watts) * annual_hours / 1000 | kW/fixture | DERIVABLE_FROM_SOURCE | Existing fixture wattage inferred from FEMP proposed-efficiency requirements |
| Selected proposed input power per fixture | requirement-new-fixture-watts; ITC-02 | FEMP exterior-lighting HTML | application category; required luminaire efficacy rating; covered lumen range; example luminaire power; annual operating hours; annual energy | proposed_fixture_watts = required_lumens / qualifying_ler_lm_per_w; annual_kwh_reduction = fixture_count * (existing_watts - proposed_watts) * annual_hours / 1000 | kW/fixture | DERIVABLE_FROM_SOURCE | Existing fixture wattage inferred from FEMP proposed-efficiency requirements |
| Annual electricity reduction | lighting-replacement-calculation; ITC-02 | FEMP exterior-lighting HTML | application category; required luminaire efficacy rating; covered lumen range; example luminaire power; annual operating hours; annual energy | proposed_fixture_watts = required_lumens / qualifying_ler_lm_per_w; annual_kwh_reduction = fixture_count * (existing_watts - proposed_watts) * annual_hours / 1000 | kWh/year | DERIVABLE_FROM_SOURCE | Existing fixture wattage inferred from FEMP proposed-efficiency requirements |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: proposed_fixture_watts = required_lumens / qualifying_ler_lm_per_w; annual_kwh_reduction = fixture_count * (existing_watts - proposed_watts) * annual_hours / 1000.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition workflow

```text
Purchasing Energy-Efficient Exterior Lighting
-> Public HTML tables
-> immutable raw snapshot
-> SHA-256 checksum and media-type validation
-> schema and enumeration validation
-> source-specific normalization and deduplication
-> benchmark_values + equipment_performance_fields + calculation_assumptions
-> deterministic femp-exterior-lighting adapter
-> typed formula input
-> calculation result with provenance
```

Acquisition runs under a scheduler or operator action and never during a customer estimate.
A failed checksum, schema drift, or incomplete artifact leaves the prior published release active.

## 7. Internal database schema

The intended normalized targets are benchmark_values, equipment_performance_fields, calculation_assumptions.
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
The unsupported boundary is Existing fixture wattage inferred from FEMP proposed-efficiency requirements.

## 11. Calculation or local-model execution

The exact output contract contains: Proposed input power per fixture; Selected proposed input power per fixture; Annual electricity reduction.
The governing source equation or transformation is proposed_fixture_watts = required_lumens / qualifying_ler_lm_per_w; annual_kwh_reduction = fixture_count * (existing_watts - proposed_watts) * annual_hours / 1000.
The local execution mode is Small reviewed JSON lookup artifact plus deterministic lighting equation.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid effective dates, out-of-range physical values, or a mismatched model version.
Outputs retain their native unit and a normalized unit from the repository unit registry.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the raw-artifact checksum, source release, adapter version, input hash, model or formula version, and output hash.

## 12. Refresh and versioning

Refresh follows Irregular procurement-guidance updates.
Release detection compares official release metadata and artifact checksums.
A changed checksum under an unchanged source version is quarantined for review.
Schema drift compares columns, types, required fields, enumeration values, workbook sheets, or model input declarations against the prior accepted fingerprint.
Raw snapshots, normalized releases, crosswalks, and selection outputs are immutable.
Publication uses an atomic pointer to the accepted release.
Rollback changes only that pointer and records an operator reason.
Deprecated releases remain available for historical calculation replay.
Stale data is labeled and blocked when an effective-date or certification-status guarantee can no longer be made.

## 13. Runtime design

The selected runtime design is Small reviewed JSON lookup artifact plus deterministic lighting equation.
The required number of external calls during a customer estimate is zero.
The adapter reads a published internal release or executes a pinned local model only.
If the source is offline, existing published releases and reproducible historical calculations continue to work.

## 14. Cost

One-time engineering effort is 30-50 hours.
Estimated raw storage is 0.01 GB.
Estimated published storage is 0.001 GB.
Refresh effort is 2-4 per update.
Maintenance burden is Low.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.01 at 100 calculations per month, $0.02 at 1,000, and $0.08 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 15. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/femp-exterior-lighting.sample.json`.
Its local output kind is `model_result_set`, its selection rule is `PINNED_LOCAL_FORMULA:lightingAnnualSavings`, and its output unit is `kWh/year`.
This synthetic regression executes without network access, but it does not prove acquisition, schema inspection, source-specific parsing, a real model run, database publication, or formula-term reachability.
Only the separate real-proof registry and source-backed tests may satisfy those gates.

## 16. Feasibility verdict

**FEASIBLE_NOW**

The supported boundary is FEMP application categories and exact or requirements-matched proposed luminaires.
The unsupported boundary is Existing fixture wattage inferred from FEMP proposed-efficiency requirements.

## 17. Final recommended strategy

Transcribe the seven application rows with page checksum and dual review, then resolve exact proposed power or a requirements-filtered qualifying product before applying the local hours equation.
This is the single recommended production path for this Standard.
The rejected alternative is: Using the FEMP less-efficient example as every site's existing fixture is rejected because it is an example, not an installed baseline.

## 18. Potential later Information Card changes

No Information Card change is made on this research branch.
Later review may update the visible source version, fallback wording, input ownership, category scope, or status to match the supported boundary documented above.
Any formula change must be separately researched, reviewed, and approved.
Any fallback must name its authoritative population and exact numeric selection rule.
