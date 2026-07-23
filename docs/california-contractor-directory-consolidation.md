# California Contractor Directory Consolidation

This document describes the one-time Pass 2 consolidation of official California contractor and program directories.
The workflow enriches the retained `gbs-contractors` records and can add a contractor only after deterministic CSLB verification.
It does not crawl contractor websites, use Google Places, generate email addresses, create outreach logic, or change `supportedRetrofitIds` on an existing row.

## Supported Fields

The workflow can add the following missing fields from public official sources:

- `email`
- `servesCommercial`
- `serviceAreas`
- `programMemberships`
- `certifications`
- `enrichmentEvidence`

The temporary website value from a source may only help identify the directory entry.
The workflow never stores a website, contact form URL, `verifiedRetrofitIds`, or advertised retrofit IDs.
The retained evidence records the source ID, source name, source URL, verification date, matching method, field, and public source value.

The workflow also plans a missing-only CSLB patch for:

- `businessAddress.county`
- `primaryStatus`
- `secondaryStatus`
- `pendingSuspension`
- `pendingClassRemoval`
- `pendingClassReplace`

An existing nonempty value is never overwritten.
A different nonempty source value is reported as a conflict.

## Official Source Disposition

| Source | Tier | Disposition | Reason |
| --- | --- | --- | --- |
| SoCalGas Trade Professional Directory | Primary | Processed | The official directory exposes a stable paginated public list with contact data, technologies, and sectors. |
| SoCalREN Public Agencies Trade Allies | Primary | Processed | The official page exposes a complete public list with emails, descriptions, and explicit service regions. |
| SoCalREN Multifamily Contractors | Primary | Processed | The official page exposes a complete public participating-contractor list. |
| TECH Clean California Contractor Project Data | Primary | Processed | The official page publishes a downloadable workbook with contractor names, CSLB numbers, ZIP codes, and an explicit service-area field. |
| SoCalREN Residential Contractors | Secondary | Processed | The official page exposes a complete public participating-contractor list. |
| Building Performance Institute Company Locator | Secondary | Processed | The official issuer directory exposes California company cards and certifications. Individual professional cards are excluded. |
| PG&E Trade Professional Alliance | Primary | Not processed | The public directory is a location-driven embedded form with no stable statewide record list or official export. |
| SCE Find-A-Vendor | Primary | Not processed | The public Salesforce directory requires interactive search criteria and has no stable statewide record list or official export. |
| SDG&E Find a Trade Professional | Primary | Not processed | The public form requires combinations of filters and has no complete official export. |
| The Switch Is On Contractor Finder | Secondary | Not processed | The interactive finder has no stable statewide export, and automated retrieval is access-restricted. |
| BayREN | Additional | Not processed | The available contractor list is a stale 2024 Home+ PDF for a program that has closed. |
| LADWP | Additional | Not processed | No current official public contractor directory or compatible export was found. |
| SMUD Contractor Network | Additional | Not processed | The public directory requires an interactive disclaimer and filtered search and has no complete official export. |

The report retains this disposition for every requested and inspected source.
A source access or parse failure changes its status to `source_error` instead of silently producing an empty result.

## Deterministic Matching

Each public directory entry is matched in this exact order:

1. Exact normalized CSLB license number.
2. Exact normalized phone number.
3. Exact normalized business name plus ZIP code.
4. Exact normalized business name plus complete address.
5. Exact normalized business name only when the name is unique statewide.

Normalization only removes formatting differences such as case, punctuation, and phone punctuation.
The workflow performs no fuzzy or similarity-based automatic matching.
An exact key with more than one candidate is quarantined as ambiguous.

An unmatched entry is checked against the retained raw CSLB snapshot with the same matching order.
A new row requires a usable `CLEAR` primary status, at least one classification in `data/cslb_classification_to_retrofits.v1.json`, at least one resulting `supportedRetrofitIds` value, and a nonconflicting identity.
Possible manufacturers, distributors, wholesalers, consultants, architects, and engineering-only entries are not added as new contractor rows.
Records that are inactive, ambiguous, noncontractor, identity-conflicting, or unmapped are quarantined in the report.
The report separately identifies exact source license numbers above the maximum license number in the retained CSLB snapshot for a bounded official-detail review of at most 25 candidates.

## Dry Run

Run the complete read-only workflow with:

```sh
npm run contractors:enrich:directories -- --dry-run --profile retrofi-prod
```

The dry run verifies the expected AWS account and reads the live `gbs-contractors` table and retained raw CSLB object.
It downloads current official source pages and the current TECH workbook.
It writes exact local source snapshots and `report.json` under `var/contractor-directory-enrichment/<run-id>/`.
It performs zero S3 or DynamoDB writes.

The report includes source hashes, per-source entry and outcome counts, combined totals, patch field counts, enrichment field counts, conflicts, bounded sanitized examples, and a deterministic proposal hash.
Raw directory pages and the TECH workbook remain local until a separately reviewed write is authorized.

## Guarded Write Mode

Write mode is implemented but must not be run without explicit approval:

```sh
npm run contractors:enrich:directories -- \
  --write \
  --profile retrofi-prod \
  --reviewed-report "<dry-run-report-path>" \
  --approval "<dry-run-run-id>"
```

Write mode loads the reviewed local snapshots instead of fetching changed source pages.
It verifies every snapshot SHA-256 and recomputes the plan against the current live table and raw CSLB source.
It refuses to continue if the recomputed proposal hash differs from the reviewed proposal hash.

Existing rows are changed with DynamoDB `UpdateItem` operations and optimistic conditions against the reviewed values.
New rows use conditional `PutItem` operations with `attribute_not_exists(contractorId)`.
The update planner asserts that `supportedRetrofitIds` is absent from every existing-row update.
The exact source snapshots are retained under `raw/enrichment/<source-id>/<date>/`, and the final report is retained under `imports/enrichment/<run-id>/`.

This task does not authorize write mode or any deployment.

The unmatched and ambiguous follow-up workflow is documented in [Unmatched Directory Contractor Resolution](./unmatched-directory-contractor-resolution.md).
