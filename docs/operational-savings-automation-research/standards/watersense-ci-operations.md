# STD-WATERSENSE-CI-OPERATIONS - WaterSense commercial operations methods

## 1. RetroFi role

This Standard is used by 2 categories and 2 category-local process instances.
The categories are ITC-35, ITC-36.
The process keys are watersense_ci_operations.
The formula terms supplied are avoided_makeup_gallons, confirmed_leak_minutes_per_year, measured_leak_gpm.
The current claimed output set contains 3 distinct output descriptions.
The present automation limitation is: Default leak rates, default duration, and automatic savings from a checklist item alone.

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-WATERSENSE-CI | WaterSense at Work | Unpinned | UNVERIFIED | Leak and mechanical-system best-management-practice sections |

## 2. Official source inventory

The primary organization is U.S. Environmental Protection Agency.
The selected official source is WaterSense at Work commercial and institutional best-management practices.
The pinned version is WaterSense at Work workbook published 2017-02; current guidance page.
The release date or release state is 2017-02 workbook.
The expected update cadence is Irregular guidance updates.
The license finding is EPA-published WaterSense content is public domain with requested attribution.
The legal-review requirement is Low.

- https://www.epa.gov/watersense/best-management-practices
- https://www.epa.gov/sites/default/files/2017-02/ws-commercial-excel-writeable-tables.xlsx

## 3. What can actually be acquired

- Public best-management-practice pages and PDFs
- Public commercial assessment XLSX
- Manual measurements and project records

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public best-management-practice pages and PDFs | https://www.epa.gov/watersense/best-management-practices | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; PDF | WaterSense at Work workbook published 2017-02; current guidance page; Irregular guidance updates; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| Public commercial assessment XLSX | https://www.epa.gov/sites/default/files/2017-02/ws-commercial-excel-writeable-tables.xlsx | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | 89786 bytes observed; XLSX; XLSX ZIP container | WaterSense at Work workbook published 2017-02; current guidance page; Irregular guidance updates; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | The official 89.8 KB workbook was downloaded and all seven sheet names and relevant input columns were inspected |
| Manual measurements and project records | https://www.epa.gov/watersense/best-management-practices | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | WaterSense at Work workbook published 2017-02; current guidance page; Irregular guidance updates; Monitor URL and checksum drift | Human-mediated acquisition only; automate validation and import after export | Not separately probed; retained as a documented alternative |

The tested access result is: The official 89.8 KB workbook was downloaded and all seven sheet names and relevant input columns were inspected.
The retained inspected artifact is ws-commercial-excel-writeable-tables.xlsx, XLSX, 89786 bytes, sha256:f69facc89beb2073fdaba88206d20e32151b2f30c53a7f21f7981eeab8c0ab52.
The access-cost classification is completely free.

## 4. Real source structure

The observed source-native fields or model inputs are:

- `meter history`
- `equipment inventory`
- `flow or consumption`
- `operating time`
- `measured leak flow`
- `cooling-tower makeup and blowdown records`

These names are research requirements from the source inventory, not claims about an observed source schema.
Exact source types, units, enumerations, nullability, keys, workbook coordinates, or model declarations must come from the source-specific proof manifest under `scripts/research/operational-savings/adapters/watersense-ci-operations/`.
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
| Measured leak flow from a nameplate, measurement, audit, or contractor specification | watersense_ci_operations; ITC-35 | Project Document | Annual Operational Savings > Annual measured leak water reduction > Documented Measured leak flow from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Confirmed leak start date | watersense_ci_operations; ITC-35 | User | Annual Operational Savings > Annual measured leak water reduction > Confirmed leak start date | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing cycles of concentration | watersense_ci_operations; ITC-36 | Project Document | Annual Operational Savings > Annual cooling-tower water and fan-electricity reduction > Documented Existing cycles of concentration from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed cycles of concentration | watersense_ci_operations; ITC-36 | Linked Opportunity | Annual Operational Savings > Annual cooling-tower water and fan-electricity reduction > Proposed cycles of concentration | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual evaporation or equivalent heat rejection | watersense_ci_operations; ITC-36 | Project Document | Annual Operational Savings > Annual cooling-tower water and fan-electricity reduction > Documented Annual evaporation or equivalent heat rejection from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Measured leak flow | watersense_ci_operations; ITC-35 | ws-commercial-excel-writeable-tables.xlsx | meter history; equipment inventory; flow or consumption; operating time; measured leak flow; cooling-tower makeup and blowdown records | avoided_leak_gallons = measured_leak_gpm * confirmed_leak_minutes_per_year; avoided_makeup_gallons = baseline_makeup_gallons - proposed_makeup_gallons after consistent cycles-of-concentration accounting | gallons/minute | DERIVABLE_FROM_SOURCE | Default leak rates, default duration, and automatic savings from a checklist item alone |
| Confirmed annual leak duration | watersense_ci_operations; ITC-35 | ws-commercial-excel-writeable-tables.xlsx | meter history; equipment inventory; flow or consumption; operating time; measured leak flow; cooling-tower makeup and blowdown records | avoided_leak_gallons = measured_leak_gpm * confirmed_leak_minutes_per_year; avoided_makeup_gallons = baseline_makeup_gallons - proposed_makeup_gallons after consistent cycles-of-concentration accounting | minutes/year | DERIVABLE_FROM_SOURCE | Default leak rates, default duration, and automatic savings from a checklist item alone |
| Annual avoided cooling-tower makeup water | watersense_ci_operations; ITC-36 | ws-commercial-excel-writeable-tables.xlsx | meter history; equipment inventory; flow or consumption; operating time; measured leak flow; cooling-tower makeup and blowdown records | avoided_leak_gallons = measured_leak_gpm * confirmed_leak_minutes_per_year; avoided_makeup_gallons = baseline_makeup_gallons - proposed_makeup_gallons after consistent cycles-of-concentration accounting | gallons/year | DERIVABLE_FROM_SOURCE | Default leak rates, default duration, and automatic savings from a checklist item alone |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: avoided_leak_gallons = measured_leak_gpm * confirmed_leak_minutes_per_year; avoided_makeup_gallons = baseline_makeup_gallons - proposed_makeup_gallons after consistent cycles-of-concentration accounting.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition workflow

```text
WaterSense at Work commercial and institutional best-management practices
-> Public best-management-practice pages and PDFs
-> immutable raw snapshot
-> SHA-256 checksum and media-type validation
-> schema and enumeration validation
-> source-specific normalization and deduplication
-> calculation_assumptions + calculation_runs + selected_value_provenance
-> deterministic watersense-ci-operations adapter
-> typed formula input
-> calculation result with provenance
```

Acquisition runs under a scheduler or operator action and never during a customer estimate.
A failed checksum, schema drift, or incomplete artifact leaves the prior published release active.

## 7. Internal database schema

The intended normalized targets are calculation_assumptions, calculation_runs, selected_value_provenance.
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
The unsupported boundary is Default leak rates, default duration, and automatic savings from a checklist item alone.

## 11. Calculation or local-model execution

The exact output contract contains: Measured leak flow; Confirmed annual leak duration; Annual avoided cooling-tower makeup water.
The governing source equation or transformation is avoided_leak_gallons = measured_leak_gpm * confirmed_leak_minutes_per_year; avoided_makeup_gallons = baseline_makeup_gallons - proposed_makeup_gallons after consistent cycles-of-concentration accounting.
The local execution mode is Local measured-input calculator using project documents and meter records; guidance remains a method source rather than a benchmark database.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid effective dates, out-of-range physical values, or a mismatched model version.
Outputs retain their native unit and a normalized unit from the repository unit registry.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the raw-artifact checksum, source release, adapter version, input hash, model or formula version, and output hash.

## 12. Refresh and versioning

Refresh follows Irregular guidance updates.
Release detection compares official release metadata and artifact checksums.
A changed checksum under an unchanged source version is quarantined for review.
Schema drift compares columns, types, required fields, enumeration values, workbook sheets, or model input declarations against the prior accepted fingerprint.
Raw snapshots, normalized releases, crosswalks, and selection outputs are immutable.
Publication uses an atomic pointer to the accepted release.
Rollback changes only that pointer and records an operator reason.
Deprecated releases remain available for historical calculation replay.
Stale data is labeled and blocked when an effective-date or certification-status guarantee can no longer be made.

## 13. Runtime design

The selected runtime design is Local measured-input calculator using project documents and meter records; guidance remains a method source rather than a benchmark database.
The required number of external calls during a customer estimate is zero.
The adapter reads a published internal release or executes a pinned local model only.
If the source is offline, existing published releases and reproducible historical calculations continue to work.

## 14. Cost

One-time engineering effort is 90-150 hours.
Estimated raw storage is 0.1 GB.
Estimated published storage is 0.02 GB.
Refresh effort is 4-8 per guidance update.
Maintenance burden is Low.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.03 at 100 calculations per month, $0.05 at 1,000, and $0.20 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 15. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/watersense-ci-operations.sample.json`.
Its local output kind is `model_result_set`, its selection rule is `PINNED_LOCAL_FORMULA:leakWater`, and its output unit is `gallons/year`.
This synthetic regression executes without network access, but it does not prove acquisition, schema inspection, source-specific parsing, a real model run, database publication, or formula-term reachability.
Only the separate real-proof registry and source-backed tests may satisfy those gates.

## 16. Feasibility verdict

**PARTIALLY_FEASIBLE**

The supported boundary is Exact measured leak and cooling-tower operational calculations.
The unsupported boundary is Default leak rates, default duration, and automatic savings from a checklist item alone.

## 17. Final recommended strategy

Use the workbook to define structured intake fields, require measurements or reconciled meter records, and calculate only after the project evidence establishes flow, duration, and system boundary.
This is the single recommended production path for this Standard.
The rejected alternative is: Treating checklist recommendations as numeric savings is rejected because the workbook is an inventory and assessment instrument, not a universal performance dataset.

## 18. Potential later Information Card changes

No Information Card change is made on this research branch.
Later review may update the visible source version, fallback wording, input ownership, category scope, or status to match the supported boundary documented above.
Any formula change must be separately researched, reviewed, and approved.
Any fallback must name its authoritative population and exact numeric selection rule.
