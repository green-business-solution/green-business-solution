# STD-INTERVAL-TARIFF - Interval tariff resolution and screening bill method

## 1. Canonical role and current process proof

This Standard is used by 10 categories and 10 category-local process instances.
The categories are ITC-16, ITC-17, ITC-19, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31.
The process keys are interval_tariff.
The formula terms supplied are tariff_input_set.
The canonical output set contains 1 distinct output description.

| Category and process | Execution-verified proof level | Adapter | Actual adapter test result | Current blocker | Conditional next action |
| --- | --- | --- | --- | --- | --- |
| ITC-16/interval_tariff | END_TO_END_REAL | scripts/research/operational-savings/adapters/interval-tariff/run.mjs | interval-tariff-real-composite-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: returns the exact tariff_input_set formula term offline<br>interval-tariff-term-schedule-failure-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: fails closed when a required tariff term or schedule is mutated | None | Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change. |
| ITC-17/interval_tariff | END_TO_END_REAL | scripts/research/operational-savings/adapters/interval-tariff/run.mjs | interval-tariff-real-composite-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: returns the exact tariff_input_set formula term offline<br>interval-tariff-term-schedule-failure-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: fails closed when a required tariff term or schedule is mutated | None | Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change. |
| ITC-19/interval_tariff | END_TO_END_REAL | scripts/research/operational-savings/adapters/interval-tariff/run.mjs | interval-tariff-real-composite-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: returns the exact tariff_input_set formula term offline<br>interval-tariff-term-schedule-failure-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: fails closed when a required tariff term or schedule is mutated | None | Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change. |
| ITC-23/interval_tariff | END_TO_END_REAL | scripts/research/operational-savings/adapters/interval-tariff/run.mjs | interval-tariff-real-composite-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: returns the exact tariff_input_set formula term offline<br>interval-tariff-term-schedule-failure-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: fails closed when a required tariff term or schedule is mutated | None | Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change. |
| ITC-24/interval_tariff | END_TO_END_REAL | scripts/research/operational-savings/adapters/interval-tariff/run.mjs | interval-tariff-real-composite-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: returns the exact tariff_input_set formula term offline<br>interval-tariff-term-schedule-failure-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: fails closed when a required tariff term or schedule is mutated | None | Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change. |
| ITC-25/interval_tariff | END_TO_END_REAL | scripts/research/operational-savings/adapters/interval-tariff/run.mjs | interval-tariff-real-composite-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: returns the exact tariff_input_set formula term offline<br>interval-tariff-term-schedule-failure-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: fails closed when a required tariff term or schedule is mutated | None | Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change. |
| ITC-26/interval_tariff | END_TO_END_REAL | scripts/research/operational-savings/adapters/interval-tariff/run.mjs | interval-tariff-real-composite-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: returns the exact tariff_input_set formula term offline<br>interval-tariff-term-schedule-failure-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: fails closed when a required tariff term or schedule is mutated | None | Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change. |
| ITC-27/interval_tariff | END_TO_END_REAL | scripts/research/operational-savings/adapters/interval-tariff/run.mjs | interval-tariff-real-composite-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: returns the exact tariff_input_set formula term offline<br>interval-tariff-term-schedule-failure-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: fails closed when a required tariff term or schedule is mutated | None | Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change. |
| ITC-28/interval_tariff | END_TO_END_REAL | scripts/research/operational-savings/adapters/interval-tariff/run.mjs | interval-tariff-real-composite-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: returns the exact tariff_input_set formula term offline<br>interval-tariff-term-schedule-failure-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: fails closed when a required tariff term or schedule is mutated | None | Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change. |
| ITC-31/interval_tariff | END_TO_END_REAL | scripts/research/operational-savings/adapters/interval-tariff/run.mjs | interval-tariff-real-composite-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: returns the exact tariff_input_set formula term offline<br>interval-tariff-term-schedule-failure-proof: PASSED; scripts/research/operational-savings/tests/interval-tariff-real.test.mjs :: fails closed when a required tariff term or schedule is mutated | None | Accept or connect the proved path only within its recorded boundary, and keep the exact execution record current when code, fixtures, artifacts, or canonical bindings change. |

## 2. Official source inventory

The primary organization is National Laboratory of the Rockies, OpenEI, and controlling utilities.
The selected official source is OpenEI Utility Rate Database plus controlling utility tariff sheets.
The catalog acquisition target is URDB bulk snapshot downloaded 2026-07-23; OEDI page last updated 2025-10-07.
Its release date or release state is Bulk file timestamp 2026-07-23.
The expected update cadence is URDB records checked annually; controlling tariffs change on utility schedules.
The license finding is OEDI page states CC BY 4.0 unless noted; API documentation states CC0 unless noted.
The legal-review requirement is Retain the license attached to the specific bulk artifact and the controlling utility document.
These catalog values describe the planned source inventory and do not replace proof-manifest artifact identity.

- https://data.openei.org/submissions/5
- https://openei.org/apps/USURDB/download/usurdb.csv.gz
- https://apps.openei.org/services/doc/rest/util_rates/?version=4

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-INTERVAL-TARIFF | OpenEI Utility Rates API documentation and Utility Rate Database | Accessed 2026-07-23; exact utility tariff version remains project-specific | LIMITED | OpenEI Utility Rates API contract plus the controlling published utility tariff sheet for the matched account |

## 3. What can actually be acquired

- Public approved-rates CSV gzip bulk download
- Public approved-rates JSON gzip bulk download
- Free-key API with 500-record pagination
- Utility tariff PDFs and tariff books
- Operator-assisted structured import

| Route | Exact endpoint or source | Authentication, registration, and key | Rate limit and pagination | Observed size, format, compression, and partition | History and URL stability | Automation assessment | Research result |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Public approved-rates CSV gzip bulk download | https://openei.org/apps/USURDB/download/usurdb.csv.gz | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | 12218163 bytes observed; Gzip CSV; Gzip-compressed | URDB bulk snapshot downloaded 2026-07-23; OEDI page last updated 2025-10-07; URDB records checked annually; controlling tariffs change on utility schedules; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Bulk CSV downloaded without a key; API without a key returned HTTP 403 and API_KEY_MISSING despite older prose suggesting otherwise |
| Public approved-rates JSON gzip bulk download | https://openei.org/apps/USURDB/download/usurdb.csv.gz | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Gzip-compressed | URDB bulk snapshot downloaded 2026-07-23; OEDI page last updated 2025-10-07; URDB records checked annually; controlling tariffs change on utility schedules; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| Free-key API with 500-record pagination | https://apps.openei.org/services/doc/rest/util_rates/?version=4 | Free API key; registration required | 500 records per page; paginate with API parameters | 12218163 bytes observed; Gzip CSV; Route-specific source structure | URDB bulk snapshot downloaded 2026-07-23; OEDI page last updated 2025-10-07; URDB records checked annually; controlling tariffs change on utility schedules; Monitor URL and checksum drift | Permitted only for scheduled ingestion under published terms and limits | Bulk CSV downloaded without a key; API without a key returned HTTP 403 and API_KEY_MISSING despite older prose suggesting otherwise |
| Utility tariff PDFs and tariff books | Project-specific controlling utility publication | No authentication, registration, or API key observed for this route | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; PDF | URDB bulk snapshot downloaded 2026-07-23; OEDI page last updated 2025-10-07; URDB records checked annually; controlling tariffs change on utility schedules; Monitor URL and checksum drift | Public acquisition appears automatable, subject to artifact-specific license review | Not separately probed; retained as a documented alternative |
| Operator-assisted structured import | https://data.openei.org/submissions/5 | Operator interaction; account requirement depends on the source UI | Not applicable to a static artifact, repository, local package, or manual export | Not separately sized; Route-specific source structure | URDB bulk snapshot downloaded 2026-07-23; OEDI page last updated 2025-10-07; URDB records checked annually; controlling tariffs change on utility schedules; UI route is change-prone | Human-mediated acquisition only; automate validation and import after export | Not separately probed; retained as a documented alternative |

The tested access result is: Bulk CSV downloaded without a key; API without a key returned HTTP 403 and API_KEY_MISSING despite older prose suggesting otherwise.
The planning catalog observation is usurdb.csv.gz, Gzip CSV, 12218163 bytes, sha256:89081ef124080ea322516040dc6b2c1945f9f754eced63f3130d4a8f14947032.
The access-cost classification is completely free.

## 4. Proof-backed artifacts, releases, and schemas

The following table is generated from current proof contributions that explicitly name this Standard.
It reports retained artifact releases, versions, locators, and integrity values instead of treating the planning catalog observation as executed proof.

| Artifact ID | Evidence role | Retained release or version | Exact locator | Integrity | Current proof state | Bound processes |
| --- | --- | --- | --- | --- | --- | --- |
| artifact:sdge-sdcp-jrc:2026-06-01 | PUBLIC_PDF_DOWNLOAD | SDG&E rates effective 2026-06-01 | https://sdge.com/sites/default/files/SDCP_SDGE_JRC_06.01.2026_Final.pdf | sha256:bfde9c41b8daed07eeb293a1e5ac6348f2a290ae1de022b34a7c5055a858e89e; 543670 bytes | END_TO_END_REAL | ITC-16/interval_tariff, ITC-17/interval_tariff, ITC-19/interval_tariff, ITC-23/interval_tariff, ITC-24/interval_tariff, ITC-25/interval_tariff, ITC-26/interval_tariff, ITC-27/interval_tariff, ITC-28/interval_tariff, ITC-31/interval_tariff |
| artifact:sdge-small-commercial-rates:2026-06-01 | PUBLIC_PDF_DOWNLOAD | Effective 2026-06-01 | https://www.sdge.com/sites/default/files/regulatory/Summary%20Table%20for%20Small%20Comm%206-1-26.pdf | sha256:1d2474baa2c253e803c5966fa30a8c58f8ee88e0d338a006df3c8f47a49c0cf9; 403420 bytes | END_TO_END_REAL | ITC-16/interval_tariff, ITC-17/interval_tariff, ITC-19/interval_tariff, ITC-23/interval_tariff, ITC-24/interval_tariff, ITC-25/interval_tariff, ITC-26/interval_tariff, ITC-27/interval_tariff, ITC-28/interval_tariff, ITC-31/interval_tariff |
| artifact:usurdb:2026-07-23 | PUBLIC_BULK_DOWNLOAD | bulk snapshot acquired 2026-07-23 | https://openei.org/apps/USURDB/download/usurdb.csv.gz | sha256:89081ef124080ea322516040dc6b2c1945f9f754eced63f3130d4a8f14947032; 12218163 bytes | END_TO_END_REAL | ITC-16/interval_tariff, ITC-17/interval_tariff, ITC-19/interval_tariff, ITC-23/interval_tariff, ITC-24/interval_tariff, ITC-25/interval_tariff, ITC-26/interval_tariff, ITC-27/interval_tariff, ITC-28/interval_tariff, ITC-31/interval_tariff |

The current proof manifests record these inspected schemas:

| Schema ID | Artifact ID | Format | Extractor | Required native fields | Current proof state |
| --- | --- | --- | --- | --- | --- |
| schema:sdge-sdcp-jrc:2026-06-01 | artifact:sdge-sdcp-jrc:2026-06-01 | PDF_WORKED_COMPARISON |  | Generation Rate; PCIA; SDG&E Delivery Rate; Franchise Fees; Total Electricity Cost; Average Monthly Bill; Average Monthly Usage; Average Monthly Demand | END_TO_END_REAL |
| schema:sdge-small-commercial:2026-06-01 | artifact:sdge-small-commercial-rates:2026-06-01 | PDF_TABLE |  | Eligibility; Basic Service Fee; Total UDC Rate; WF-NBC + DWR-BC; EECC; Total Electric Rate | END_TO_END_REAL |
| schema:usurdb:2026-07-23 | artifact:usurdb:2026-07-23 | GZIP_CSV | scripts/research/operational-savings/adapters/interval-tariff/inspect-schema.mjs | label; eiaid; name; startdate; enddate; latest_update; utility; sector; description; servicetype; source; sourceparent; dgrules; peakkwcapacitymin; peakkwcapacitymax; voltagecategory; fixedchargefirstmeter; fixedchargeunits; mincharge; minchargeunits; demandratestructure; energyratestructure; energyweekdayschedule; energyweekendschedule; supersedes | END_TO_END_REAL |

Catalog-native field names that still require proof-backed inspection are:

- `label`
- `eiaid`
- `utility`
- `name`
- `sector`
- `startdate`
- `enddate`
- `latest_update`
- `approved`
- `source`
- `energy and demand structures`
- `weekday and weekend schedules`
- `fixed and minimum charges`
- `supercedes`

Null means unknown or not reported and must never be converted to zero.
Inactive, withdrawn, superseded, and historical records remain immutable and are excluded from current resolution unless an explicit historical query selects them.

## 5. RetroFi field coverage

| Required RetroFi field | Process and category | Source artifact or owner | Source-native field | Transformation | Target unit | Support classification | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Serving electric utility from the bill | interval_tariff; ITC-16, ITC-17, ITC-19, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31 | Bill | Annual Operational Savings > Chronological Electricity Load and Tariff > Serving Electric Utility | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_BILL | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Published rate schedule and customer class from the bill | interval_tariff; ITC-16, ITC-17, ITC-19, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31 | Bill | Annual Operational Savings > Chronological Electricity Load and Tariff > Rate Schedule and Customer Class | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_BILL | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Tariff effective date covering the analysis period | interval_tariff; ITC-16, ITC-17, ITC-19, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31 | Bill | Annual Operational Savings > Chronological Electricity Load and Tariff > Billing Period Start and End | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_BILL | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Continuous interval energy and demand aligned to the tariff timezone | interval_tariff; ITC-16, ITC-17, ITC-19, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31 | Bill | Annual Operational Savings > Chronological Electricity Load and Tariff > Timestamped Interval Utility Data | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_BILL | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Interconnection and export-credit configuration from the project agreement | interval_tariff; ITC-17, ITC-19 | Linked Opportunity | Annual Operational Savings > Interconnection and Export-Credit Configuration | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| One complete tariff input set with exact or conservative-screening provenance | interval_tariff; ITC-16, ITC-17, ITC-19, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31 | artifact:sdge-sdcp-jrc:2026-06-01; artifact:sdge-small-commercial-rates:2026-06-01; artifact:usurdb:2026-07-23 | label; eiaid; utility; name; sector; startdate; enddate; latest_update; approved; source; energy and demand structures; weekday and weekend schedules; fixed and minimum charges; supercedes | interval_energy_charge = sum_t imported_kwh_t * energy_rate(period_t, tier_t); interval_demand_charge = sum_billing_periods demand_rate(period, tier) * billed_demand_kw after ratchet rules; fixed, minimum, export, and non-bypassable components remain separate | record set | DERIVABLE_FROM_SOURCE | Raw historical URDB records treated as current, missing ratchets or non-bypassable charges, and tariff selection based only on geography |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: interval_energy_charge = sum_t imported_kwh_t * energy_rate(period_t, tier_t); interval_demand_charge = sum_billing_periods demand_rate(period, tier) * billed_demand_kw after ratchet rules; fixed, minimum, export, and non-bypassable components remain separate.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition and internal publication

```text
OpenEI Utility Rate Database plus controlling utility tariff sheets
-> Public approved-rates CSV gzip bulk download
-> immutable checksummed raw artifact
-> source-specific schema and enumeration validation
-> typed normalization into utility_providers + utility_tariffs + tariff_periods + tariff_energy_charges + tariff_demand_charges + tariff_export_rules
-> deterministic interval-tariff adapter
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

The exact output contract contains: One complete tariff input set with exact or conservative-screening provenance.
The governing source equation or transformation is interval_energy_charge = sum_t imported_kwh_t * energy_rate(period_t, tier_t); interval_demand_charge = sum_billing_periods demand_rate(period, tier) * billed_demand_kw after ratchet rules; fixed, minimum, export, and non-bypassable components remain separate.
The selected runtime design is Scheduled bulk ingestion followed by California operator approval and publication to an internal effective-dated tariff database.
The required number of external calls during a customer estimate is zero.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid dates, impossible physical values, or a mismatched model version.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the source-artifact or content-addressed project-input identity, source release when applicable, adapter version, input hash, model or formula version, and output hash.

## 9. Refresh, immutable identity, and publication receipt

Refresh follows URDB records checked annually; controlling tariffs change on utility schedules.
Source IDs, release IDs, artifact IDs, project-input hashes, calculation IDs, and model-version IDs are content-bound identities.
An upsert may confirm an identical record but may not silently rewrite content behind one of those identities.
A source-backed dependency pins a source artifact and release, while a project-owned dependency may leave those fields null only when its exact input run and input SHA-256 carry the provenance.
Database publication builds the SQLite database, compact export, and receipt in temporary paths.
The publisher verifies byte sizes, SHA-256 values, and one generation ID before replacing the database and compact export, then renames the receipt last as the commit marker.
Consumers verify `docs/operational-savings-automation-research/fixtures/research-database.compact.json` against `docs/operational-savings-automation-research/fixtures/research-database.publication.json`.
A failed publication preserves the prior committed generation.

## 10. Cost

One-time engineering effort is 280-460 hours.
Estimated raw storage is 4 GB.
Estimated published storage is 2 GB.
Refresh effort is 20-40 monthly including approval.
Maintenance burden is High.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.50 at 100 calculations per month, $1 at 1,000, and $4 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 11. Synthetic regression boundary

The offline command is:

```bash
node scripts/research/operational-savings/run-synthetic-prototypes.mjs --json
```

The retained compact sample is `docs/operational-savings-automation-research/samples/interval-tariff.sample.json`.
Its local output kind is `unavailable`, its selection rule is `EFFECTIVE_DATE_AND_STATUS_GATE`, and its output unit is `tariff record`.
This synthetic regression does not prove acquisition, source-specific parsing, a real model run, database publication, or category formula-term reachability.

## 12. Feasibility and supported boundary

**FEASIBLE_NOW**

This verdict is derived from 10 bound processes.
Every bound process passes all real-source gates through its exact formula term, offline rerun, provenance, and failure tests.
The proof ledger records 10 end-to-end real processes, 10 source-verified processes, and 0 processes with genuine manual-export downstream proof.
The supported boundary is Complete, approved, effective, account-matched tariffs reconciled to a bill or controlling tariff sheet.
The unsupported boundary is Raw historical URDB records treated as current, missing ratchets or non-bypassable charges, and tariff selection based only on geography.

## 13. Recommended strategy and later card review

Ingest the full bulk snapshot, normalize the nested schedules, then operate a California publication queue that requires utility, schedule, sector, eligibility, effective date, source-document evidence, and bill reconciliation before a tariff can be used.
The rejected alternative is: Runtime API lookup is rejected because the API requires a key, limits results, and cannot prove account eligibility or current controlling terms.
No Information Card change is made on this research branch.
Later review may update visible source versions, fallback wording, ownership, category scope, or status only after the generated proof view supports the change.
Any formula change requires separate research, review, and approval.
