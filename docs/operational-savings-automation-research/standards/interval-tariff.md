# STD-INTERVAL-TARIFF - Interval tariff resolution and screening bill method

## 1. RetroFi role

This Standard is used by 10 categorys and 10 category-local process instances.
The categories are ITC-16, ITC-17, ITC-19, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31.
The process keys are interval_tariff.
The formula terms supplied are tariff_input_set.
The current claimed output set contains 1 distinct output description.
The present automation limitation is: Raw historical URDB records treated as current, missing ratchets or non-bypassable charges, and tariff selection based only on geography.

| Evidence ID | Source title | Version | Status | Exact artifact |
| --- | --- | --- | --- | --- |
| E-INTERVAL-TARIFF | OpenEI Utility Rates API documentation and Utility Rate Database | Accessed 2026-07-23; exact utility tariff version remains project-specific | LIMITED | OpenEI Utility Rates API contract plus the controlling published utility tariff sheet for the matched account |

## 2. Official source inventory

The primary organization is National Laboratory of the Rockies, OpenEI, and controlling utilities.
The selected official source is OpenEI Utility Rate Database plus controlling utility tariff sheets.
The pinned version is URDB bulk snapshot downloaded 2026-07-23; OEDI page last updated 2025-10-07.
The release date or release state is Bulk file timestamp 2026-07-23.
The expected update cadence is URDB records checked annually; controlling tariffs change on utility schedules.
The license finding is OEDI page states CC BY 4.0 unless noted; API documentation states CC0 unless noted.
The legal-review requirement is Retain the license attached to the specific bulk artifact and the controlling utility document.

- https://data.openei.org/submissions/5
- https://openei.org/apps/USURDB/download/usurdb.csv.gz
- https://apps.openei.org/services/doc/rest/util_rates/?version=4

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
The retained inspected artifact is usurdb.csv.gz, Gzip CSV, 12218163 bytes, sha256:89081ef124080ea322516040dc6b2c1945f9f754eced63f3130d4a8f14947032.
The access-cost classification is completely free.

## 4. Real source structure

The observed source-native fields or model inputs are:

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

| Field or structure | Shape to validate and pin | Native unit | Key or filter role | Null handling | Enumeration handling |
| --- | --- | --- | --- | --- | --- |
| label | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Natural-key candidate or key component | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| eiaid | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| utility | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| name | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Natural-key candidate or key component | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| sector | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Mandatory filter or version dimension | Preserve source nulls; reject null only when the process requires the field | Preserve and pin native enumeration values per release |
| startdate | Date, timestamp, or source date string | Not unit-bearing or unit is source-specific | Mandatory filter or version dimension | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| enddate | Date, timestamp, or source date string | Not unit-bearing or unit is source-specific | Mandatory filter or version dimension | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| latest_update | Date, timestamp, or source date string | Not unit-bearing or unit is source-specific | Mandatory filter or version dimension | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| approved | Boolean or source enum | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| source | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| energy and demand structures | Structured record or array | Source-declared energy unit | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| weekday and weekend schedules | Structured record or array | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| fixed and minimum charges | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |
| supercedes | String, identifier, or source enumeration | Not unit-bearing or unit is source-specific | Payload, calculation input, or output | Preserve source nulls; reject null only when the process requires the field | Not treated as an enumeration unless the source schema declares one |

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
| Serving electric utility from the bill | interval_tariff; ITC-16, ITC-17, ITC-19, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31 | Bill | Annual Operational Savings > Chronological Electricity Load and Tariff > Serving Electric Utility | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_BILL | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Published rate schedule and customer class from the bill | interval_tariff; ITC-16, ITC-17, ITC-19, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31 | Bill | Annual Operational Savings > Chronological Electricity Load and Tariff > Rate Schedule and Customer Class | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_BILL | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Tariff effective date covering the analysis period | interval_tariff; ITC-16, ITC-17, ITC-19, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31 | Bill | Annual Operational Savings > Chronological Electricity Load and Tariff > Billing Period Start and End | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_BILL | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Continuous interval energy and demand aligned to the tariff timezone | interval_tariff; ITC-16, ITC-17, ITC-19, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31 | Bill | Annual Operational Savings > Chronological Electricity Load and Tariff > Timestamped Interval Utility Data | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_BILL | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| Interconnection and export-credit configuration from the project agreement | interval_tariff; ITC-17, ITC-19 | Linked Opportunity | Annual Operational Savings > Interconnection and Export-Credit Configuration | Normalize the owned value to the process input contract without substituting another tree path. | Process-native input unit | REQUIRES_LINKED_OPPORTUNITY | The external source cannot supply a value owned by Profile, Bill, Linked Opportunity, Project Document, or User. |
| One complete tariff input set with exact or conservative-screening provenance | interval_tariff; ITC-16, ITC-17, ITC-19, ITC-23, ITC-24, ITC-25, ITC-26, ITC-27, ITC-28, ITC-31 | usurdb.csv.gz | label; eiaid; utility; name; sector; startdate; enddate; latest_update; approved; source; energy and demand structures; weekday and weekend schedules; fixed and minimum charges; supercedes | interval_energy_charge = sum_t imported_kwh_t * energy_rate(period_t, tier_t); interval_demand_charge = sum_billing_periods demand_rate(period, tier) * billed_demand_kw after ratchet rules; fixed, minimum, export, and non-bypassable components remain separate | record set | DERIVABLE_FROM_SOURCE | Raw historical URDB records treated as current, missing ratchets or non-bypassable charges, and tariff selection based only on geography |

For every `DERIVABLE_FROM_SOURCE` row, the governing derivation is: interval_energy_charge = sum_t imported_kwh_t * energy_rate(period_t, tier_t); interval_demand_charge = sum_billing_periods demand_rate(period, tier) * billed_demand_kw after ratchet rules; fixed, minimum, export, and non-bypassable components remain separate.
No field owned by Profile, Bill, Linked Opportunity, Project Document, or User is silently replaced with a source default.

## 6. Acquisition workflow

```text
OpenEI Utility Rate Database plus controlling utility tariff sheets
-> Public approved-rates CSV gzip bulk download
-> immutable raw snapshot
-> SHA-256 checksum and media-type validation
-> schema and enumeration validation
-> source-specific normalization and deduplication
-> utility_providers + utility_tariffs + tariff_periods + tariff_energy_charges + tariff_demand_charges + tariff_export_rules
-> deterministic interval-tariff adapter
-> typed formula input
-> calculation result with provenance
```

Acquisition runs under a scheduler or operator action and never during a customer estimate.
A failed checksum, schema drift, or incomplete artifact leaves the prior published release active.

## 7. Internal database schema

The source uses the shared registry tables plus these target tables: utility_providers, utility_tariffs, tariff_periods, tariff_energy_charges, tariff_demand_charges, tariff_export_rules.

```sql
CREATE TABLE os_interval_tariff_records (
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
CREATE INDEX os_interval_tariff_active_exact_idx
  ON os_interval_tariff_records ((normalized_payload->>'normalized_identifier'), effective_from, effective_to)
  WHERE active;
CREATE INDEX os_interval_tariff_requirements_idx
  ON os_interval_tariff_records USING gin (normalized_payload jsonb_path_ops)
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
The unsupported boundary is Raw historical URDB records treated as current, missing ratchets or non-bypassable charges, and tariff selection based only on geography.

## 11. Calculation or local-model execution

The exact output contract contains: One complete tariff input set with exact or conservative-screening provenance.
The governing source equation or transformation is interval_energy_charge = sum_t imported_kwh_t * energy_rate(period_t, tier_t); interval_demand_charge = sum_billing_periods demand_rate(period, tier) * billed_demand_kw after ratchet rules; fixed, minimum, export, and non-bypassable components remain separate.
The local execution mode is Scheduled bulk ingestion followed by California operator approval and publication to an internal effective-dated tariff database.
Inputs are rejected for missing required fields, incompatible units, ambiguous identifiers, invalid effective dates, out-of-range physical values, or a mismatched model version.
Outputs retain their native unit and a normalized unit from the repository unit registry.
Warnings are first-class result fields and cannot be dropped by the category adapter.
Reproducibility requires the raw-artifact checksum, source release, adapter version, input hash, model or formula version, and output hash.

## 12. Refresh and versioning

Refresh follows URDB records checked annually; controlling tariffs change on utility schedules.
Release detection compares official release metadata and artifact checksums.
A changed checksum under an unchanged source version is quarantined for review.
Schema drift compares columns, types, required fields, enumeration values, workbook sheets, or model input declarations against the prior accepted fingerprint.
Raw snapshots, normalized releases, crosswalks, and selection outputs are immutable.
Publication uses an atomic pointer to the accepted release.
Rollback changes only that pointer and records an operator reason.
Deprecated releases remain available for historical calculation replay.
Stale data is labeled and blocked when an effective-date or certification-status guarantee can no longer be made.

## 13. Runtime design

The selected runtime design is Scheduled bulk ingestion followed by California operator approval and publication to an internal effective-dated tariff database.
The required number of external calls during a customer estimate is zero.
The adapter reads a published internal release or executes a pinned local model only.
If the source is offline, existing published releases and reproducible historical calculations continue to work.

## 14. Cost

One-time engineering effort is 280-460 hours.
Estimated raw storage is 4 GB.
Estimated published storage is 2 GB.
Refresh effort is 20-40 monthly including approval.
Maintenance burden is High.
External source cost is $0 per month.
Estimated internal storage and compute cost is $0.50 at 100 calculations per month, $1 at 1,000, and $4 at 10,000.
These figures exclude ordinary shared database and observability overhead and are planning estimates, not vendor quotes.

## 15. Prototype proof

The offline command is:

```bash
node scripts/research/operational-savings/run-prototypes.mjs --json
```

The acquired or inspected source evidence is Downloaded official URDB approved-rates CSV and inspected a historical SCE commercial row.
The retained compact sample is `docs/operational-savings-automation-research/samples/interval-tariff.sample.json`.
The source or model interface inspected is usurdb.csv.gz.
The local output kind is `unavailable`, the selection rule is `EFFECTIVE_DATE_AND_STATUS_GATE`, and the output unit is `tariff record`.
The prototype runs without network access after acquisition.
The prototype warning is Tariff record is outside its effective period.
The prototype proves parsing, filtering, or calculation behavior only within the retained sample boundary.

## 16. Feasibility verdict

**FEASIBLE_AFTER_ADAPTER_WORK**

The supported boundary is Complete, approved, effective, account-matched tariffs reconciled to a bill or controlling tariff sheet.
The unsupported boundary is Raw historical URDB records treated as current, missing ratchets or non-bypassable charges, and tariff selection based only on geography.

## 17. Final recommended strategy

Ingest the full bulk snapshot, normalize the nested schedules, then operate a California publication queue that requires utility, schedule, sector, eligibility, effective date, source-document evidence, and bill reconciliation before a tariff can be used.
This is the single recommended production path for this Standard.
The rejected alternative is: Runtime API lookup is rejected because the API requires a key, limits results, and cannot prove account eligibility or current controlling terms.

## 18. Potential later Information Card changes

No Information Card change is made on this research branch.
Later review may update the visible source version, fallback wording, input ownership, category scope, or status to match the supported boundary documented above.
Any formula change must be separately researched, reviewed, and approved.
Any fallback must name its authoritative population and exact numeric selection rule.
