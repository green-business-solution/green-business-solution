# STD-WATERSENSE-CI-OPERATIONS - WaterSense commercial operations methods

## 1. Canonical role and current process proof

This Standard is used by 2 categories and 2 category-local process instances.
The categories are ITC-35, ITC-36.
The process keys are watersense_ci_operations.
The formula terms supplied are avoided_makeup_gallons, confirmed_leak_minutes_per_year, measured_leak_gpm.
The canonical output set contains 3 distinct output descriptions.

| Category and process | Execution-verified proof level | Adapter | Actual adapter test result | Current blocker | Conditional next action |
| --- | --- | --- | --- | --- | --- |
| ITC-35/watersense_ci_operations | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/watersense-ci/run.mjs | watersense-ci-native-unit-failure-proof: NOT_COVERED<br>watersense-ci-offline-proof: NOT_COVERED<br>watersense-ci-real-workbook-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |
| ITC-36/watersense_ci_operations | DOCUMENTATION_ONLY | scripts/research/operational-savings/adapters/watersense-ci/run.mjs | watersense-ci-cooling-tower-unsupported-proof: NOT_COVERED<br>watersense-ci-native-unit-failure-proof: NOT_COVERED<br>watersense-ci-offline-proof: NOT_COVERED | EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. | Acquire or implement the missing evidence named by the blocker, then add exact adapter tests before claiming executable coverage. EXECUTION_RUN_RECORD_REQUIRED: The static proof declaration is not counted as executed proof until one current local content-bound run record covers every required exact test. |

## 2. Official source inventory

The primary organization is U.S. Environmental Protection Agency.
The selected official source is WaterSense at Work commercial and institutional best-management practices.
The catalog acquisition target is WaterSense at Work workbook published 2017-02; current guidance page.
Its release date or release state is 2017-02 workbook.
The expected update cadence is Irregular guidance updates.
The license finding is EPA-published WaterSense content is public domain with requested attribution.
The legal-review requirement is Low.
These catalog values describe the planned source inventory and do not replace proof-manifest artifact identity.

- https://www.epa.gov/watersense/best-management-practices
- https://www.epa.gov/sites/default/files/2017-02/ws-commercial-excel-writeable-tables.xlsx

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-WATERSENSE-CI | WaterSense at Work | Unpinned | UNVERIFIED | Leak and mechanical-system best-management-practice sections |

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
The planning catalog observation is ws-commercial-excel-writeable-tables.xlsx, XLSX, 89786 bytes, sha256:f69facc89beb2073fdaba88206d20e32151b2f30c53a7f21f7981eeab8c0ab52.
The access-cost classification is completely free.

## 4. Proof-backed artifacts, releases, and schemas

The following table is generated from current proof contributions that explicitly name this Standard.
It reports retained artifact releases, versions, locators, and integrity values instead of treating the planning catalog observation as executed proof.

| Artifact ID | Evidence role | Retained release or version | Exact locator | Integrity | Current proof state | Bound processes |
| --- | --- | --- | --- | --- | --- | --- |
| artifact:watersense-ci-operations:2012-10 | PUBLIC_XLSX_DOWNLOAD | WaterSense at Work writeable tables, October 2012 | https://www.epa.gov/sites/default/files/2017-02/ws-commercial-excel-writeable-tables.xlsx | sha256:f69facc89beb2073fdaba88206d20e32151b2f30c53a7f21f7981eeab8c0ab52; 89786 bytes | DOCUMENTATION_ONLY | ITC-35/watersense_ci_operations, ITC-36/watersense_ci_operations |

The current proof manifests record these inspected schemas:

| Schema ID | Artifact ID | Format | Extractor | Required native fields | Current proof state |
| --- | --- | --- | --- | --- | --- |
| schema:watersense-ci-operations:2012-10 | artifact:watersense-ci-operations:2012-10 | XLSX | scripts/research/operational-savings/adapters/watersense-ci/inspect-schema.mjs | Title Page!A14; Title Page!A16; Action Plan Checklist!A7:B7; Action Plan Checklist!A43:A44; Water Consumption History!A20:A21; Existing Plumbing Equipment!H2:J2; Water Use Inventory!C2:E2 | DOCUMENTATION_ONLY |

Catalog-native field names that still require proof-backed inspection are:

- `meter history`
- `equipment inventory`
- `flow or consumption`
- `operating time`
- `measured leak flow`
- `cooling-tower makeup and blowdown records`

Null means unknown or not reported and must never be converted to zero.
Inactive, withdrawn, superseded, and historical records remain immutable and are excluded from current resolution unless an explicit historical query selects them.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Measured leak flow from a nameplate, measurement, audit, or contractor specification | watersense_ci_operations; ITC-35 | Project Document | Annual Operational Savings > Annual measured leak water reduction > Documented Measured leak flow from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Confirmed leak start date | watersense_ci_operations; ITC-35 | User | Annual Operational Savings > Annual measured leak water reduction > Confirmed leak start date | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_USER | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Existing cycles of concentration | watersense_ci_operations; ITC-36 | Project Document | Annual Operational Savings > Annual cooling-tower water and fan-electricity reduction > Documented Existing cycles of concentration from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Proposed cycles of concentration | watersense_ci_operations; ITC-36 | Linked Opportunity | Annual Operational Savings > Annual cooling-tower water and fan-electricity reduction > Proposed cycles of concentration | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Annual evaporation or equivalent heat rejection | watersense_ci_operations; ITC-36 | Project Document | Annual Operational Savings > Annual cooling-tower water and fan-electricity reduction > Documented Annual evaporation or equivalent heat rejection from Nameplate, Measurement, Audit, or Contractor Specification | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_PROJECT_DOCUMENT | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Measured leak flow | watersense_ci_operations; ITC-35 | artifact:watersense-ci-operations:2012-10 | meter history; equipment inventory; flow or consumption; operating time; measured leak flow; cooling-tower makeup and blowdown records | avoided_leak_gallons = measured_leak_gpm * confirmed_leak_minutes_per_year; avoided_makeup_gallons = baseline_makeup_gallons - proposed_makeup_gallons after consistent cycles-of-concentration accounting | gallons/minute | DERIVABLE_FROM_SOURCE | Default leak rates, default duration, and automatic savings from a checklist item alone |
| Confirmed annual leak duration | watersense_ci_operations; ITC-35 | artifact:watersense-ci-operations:2012-10 | meter history; equipment inventory; flow or consumption; operating time; measured leak flow; cooling-tower makeup and blowdown records | avoided_leak_gallons = measured_leak_gpm * confirmed_leak_minutes_per_year; avoided_makeup_gallons = baseline_makeup_gallons - proposed_makeup_gallons after consistent cycles-of-concentration accounting | minutes/year | DERIVABLE_FROM_SOURCE | Default leak rates, default duration, and automatic savings from a checklist item alone |
| Annual avoided cooling-tower makeup water | watersense_ci_operations; ITC-36 | artifact:watersense-ci-operations:2012-10 | meter history; equipment inventory; flow or consumption; operating time; measured leak flow; cooling-tower makeup and blowdown records | avoided_leak_gallons = measured_leak_gpm * confirmed_leak_minutes_per_year; avoided_makeup_gallons = baseline_makeup_gallons - proposed_makeup_gallons after consistent cycles-of-concentration accounting | gallons/year | DERIVABLE_FROM_SOURCE | Default leak rates, default duration, and automatic savings from a checklist item alone |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: avoided_leak_gallons = measured_leak_gpm * confirmed_leak_minutes_per_year; avoided_makeup_gallons = baseline_makeup_gallons - proposed_makeup_gallons after consistent cycles-of-concentration accounting.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition and internal publication

```text
WaterSense at Work commercial and institutional best-management practices
-> Public best-management-practice pages and PDFs
-> immutable checksummed raw artifact
-> source-specific schema and enumeration validation
-> typed normalization into calculation_assumptions + calculation_runs + selected_value_provenance
-> deterministic watersense-ci-operations adapter
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

The exact output contract contains: Measured leak flow; Confirmed annual leak duration; Annual avoided cooling-tower makeup water.
The governing source equation or transformation is avoided_leak_gallons = measured_leak_gpm * confirmed_leak_minutes_per_year; avoided_makeup_gallons = baseline_makeup_gallons - proposed_makeup_gallons after consistent cycles-of-concentration accounting.
The selected runtime design is Local measured-input calculator using project documents and meter records; guidance remains a method source rather than a benchmark database.
The required number of external calls during a customer estimate is zero.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid dates, impossible physical values, or a mismatched model version.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the source-artifact or content-addressed project-input identity, source release when applicable, adapter version, input hash, model or formula version, and output hash.

## 9. Refresh, immutable identity, and publication receipt

Refresh follows Irregular guidance updates.
Source IDs, release IDs, artifact IDs, project-input hashes, calculation IDs, and model-version IDs are content-bound identities.
An upsert may confirm an identical record but may not silently rewrite content behind one of those identities.
A source-backed dependency pins a source artifact and release, while a project-owned dependency may leave those fields null only when its exact input run and input SHA-256 carry the provenance.
Database publication builds the SQLite database, compact export, and receipt in temporary paths.
The publisher verifies byte sizes, SHA-256 values, and one generation ID before replacing the database and compact export, then renames the receipt last as the commit marker.
Consumers verify `docs/operational-savings-automation-research/fixtures/research-database.compact.json` against `docs/operational-savings-automation-research/fixtures/research-database.publication.json`.
A failed publication preserves the prior committed generation.

## 10. Cost

One-time engineering effort is 90-150 hours.
Estimated raw storage is 0.1 GB.
Estimated published storage is 0.02 GB.
Refresh effort is 4-8 per guidance update.
Maintenance burden is Low.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.03 at 100 calculations per month, $0.05 at 1,000, and $0.20 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 11. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/watersense-ci-operations.sample.json`.
Its local output kind is `model_result_set`, its selection rule is `PINNED_LOCAL_FORMULA:leakWater`, and its output unit is `gallons/year`.
This synthetic regression does not prove acquisition, source-specific parsing, a real model run, database publication, or category formula-term reachability.

## 12. Feasibility and supported boundary

**NOT_FEASIBLE_WITH_CURRENT_PUBLIC_SOURCES**

This verdict is derived from 2 bound processes.
No bound process has retained real-source execution proof beyond documentation, synthetic evidence, an access block, or an unsupported source boundary.
The proof ledger records 0 end-to-end real processes, 0 source-verified processes, and 0 processes with genuine manual-export downstream proof.
The supported boundary is Exact measured leak and cooling-tower operational calculations.
The unsupported boundary is Default leak rates, default duration, and automatic savings from a checklist item alone.

## 13. Recommended strategy and later card review

Use the workbook to define structured intake fields, require measurements or reconciled meter records, and calculate only after the project evidence establishes flow, duration, and system boundary.
The rejected alternative is: Treating checklist recommendations as numeric savings is rejected because the workbook is an inventory and assessment instrument, not a universal performance dataset.
No Information Card change is made on this research branch.
Later review may update visible source versions, fallback wording, ownership, category scope, or status only after the generated proof view supports the change.
Any formula change requires separate research, review, and approval.
