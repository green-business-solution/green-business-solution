# CSLB Contractor Initial Import

This document describes the one-time Pass 1 import of the attached California Contractors State License Board License Master file.
The importer does not download data, schedule refreshes, enrich contractors, or expose contractor matching through an API or UI.

## Inspected Source

The attached source is `MasterLicenseData.csv`.
It is a 77,756,707-byte UTF-8 CSV file with 244,384 data rows and 52 columns.
The source SHA-256 is `055f068649d67dde1168e56094b5c4e35b6a0556926705d52a18e08a7b8cab9b`.
The inspected file has one unique `LicenseNo` per row and uses `|` to separate multiple values in `Classifications(s)`.
Some unquoted business-name and address fields contain literal quotation marks, so the maintained CSV parser is configured to preserve those values.
Its statewide row volume, CSLB-specific headers, license coverage, status fields, and classification values identify it as the License Master data required for this import.

The exact source headers are:

```text
LicenseNo
LastUpdate
BusinessName
BUS-NAME-2
FullBusinessName
MailingAddress
City
State
County
ZIPCode
country
BusinessPhone
BusinessType
IssueDate
ReissueDate
ExpirationDate
InactivationDate
ReactivationDate
PendingSuspension
PendingClassRemoval
PendingClassReplace
PrimaryStatus
SecondaryStatus
Classifications(s)
AsbestosReg
WorkersCompCoverageType
WCInsuranceCompany
WCPolicyNumber
WCEffectiveDate
WCExpirationDate
WCCancellationDate
WCSuspendDate
CBSuretyCompany
CBNumber
CBEffectiveDate
CBCancellationDate
CBAmount
WBSuretyCompany
WBNumber
WBEffectiveDate
WBCancellationDate
WBAmount
DBSuretyCompany
DBNumber
DBEffectiveDate
DBCancellationDate
DBAmount
DateRequired
DiscpCaseRegion
DBBondReason
DBCaseNo
NAME-TP-2
```

## Source Mapping

| CSLB source | RetroFi field | Rule |
| --- | --- | --- |
| `LicenseNo` | `licenseNumber` | Trim and remove whitespace while preserving meaningful leading zeroes. |
| `LicenseNo` | `contractorId` | Prefix the normalized license number with `CA_CSLB_`. |
| `BusinessName` | `businessName` | Collapse whitespace and preserve the CSLB business name. |
| `PrimaryStatus`, `SecondaryStatus` | `licenseStatus` | Preserve both nonempty status values in source order, separated by ` | `. |
| `PrimaryStatus` | `primaryStatus` | Preserve the separate primary status for deterministic filtering and later patching. |
| `SecondaryStatus` | `secondaryStatus` | Preserve the separate secondary status when present. |
| `PendingSuspension` | `pendingSuspension` | Preserve the source value when present. |
| `PendingClassRemoval` | `pendingClassRemoval` | Preserve the source value when present. |
| `PendingClassReplace` | `pendingClassReplace` | Preserve the source value when present. |
| `IssueDate` | `licenseIssueDate` | Convert a valid `MM/DD/YYYY` value to `YYYY-MM-DD`. |
| `ExpirationDate` | `licenseExpirationDate` | Convert a valid `MM/DD/YYYY` value to `YYYY-MM-DD`. |
| `Classifications(s)` | `licenseClassifications` | Split on `|`, normalize official classification codes, deduplicate, and sort. |
| `Classifications(s)` plus `data/cslb_classification_to_retrofits.v1.json` | `matchedClassificationCodes` | Keep only normalized codes present in the existing mapping. |
| Matched mapping entries | `supportedRetrofitIds` | Union, deduplicate, and sort the mapping's existing Retrofit IDs. |
| `MailingAddress` | `businessAddress.line1` | Preserve the complete source address line because the file has no separate line 2 field. |
| `City` | `businessAddress.city` | Collapse whitespace. |
| `State` | `businessAddress.state` | Collapse whitespace. |
| `County` | `businessAddress.county` | Collapse whitespace without interpreting the county as a service area. |
| `ZIPCode` | `businessAddress.postalCode` | Preserve as a string. |
| `BusinessPhone` | `phone` | Collapse whitespace without inventing a new phone format. |
| Attached-file metadata | `source.sourceReceivedAt` | Use the source file modification timestamp recorded by the attachment environment. |
| Standardized source fields | `source.sourceRecordHash` | Hash a stable canonical representation with SHA-256. |

The source does not provide separate address line 2, website, email, contact form URL, customer types, service areas, program memberships, or certifications fields for this standardized record.
The mailing address is not interpreted as a service area.
`BUS-NAME-2` and `FullBusinessName` are not substituted for `BusinessName` because every inspected source row supplies the canonical `BusinessName` column.
Bond, workers' compensation, personnel, discipline, asbestos, and hazardous-substance credential data are not imported.
The `ASB` and `HAZ` tokens found in the classification cell are counted as ignored credentials rather than stored as license classifications.

Pass 2 can backfill the separate CSLB status, pending, and county fields on rows created before those fields were added.
See [California Contractor Directory Consolidation](./california-contractor-directory-consolidation.md) for that missing-only patch and official-directory enrichment workflow.

## Classification Handling

The importer recognizes `A`, `B`, numbered `B`, numbered `C`, and limited-specialty `D` classification formats.
It normalizes `D` codes to the official `C-61/D-<number>` form.
Syntactically valid classifications that are absent from RetroFi's mapping remain in `licenseClassifications` and are reported as unmapped.
Tokens that are neither recognized classification codes nor the known `ASB` and `HAZ` credentials are reported as unknown and are not inferred.

## AWS Resources

The retained source bucket is `gbs-retrofi-contractor-source-data-059310317821-us-east-1` in `us-east-1`.
It stores the original attachment unchanged at `raw/cslb/<received-date>/<original-filename>`.
It stores the manifest and aggregate report under `imports/cslb/<import-id>/`.

The retained DynamoDB table is `gbs-contractors` in `us-east-2`.
Its only key is the string partition key `contractorId`.
The table uses on-demand billing and point-in-time recovery.

## Commands and Guards

Dry run is the default and performs no AWS access:

```sh
npm run contractors:cslb:import -- --dry-run --source-file "<attached-file-path>"
```

The dry-run manifest and report are written under the ignored `var/cslb-imports/<import-id>/` directory unless `--output-dir` is provided.

Write mode is intentionally one-time:

```sh
npm run contractors:cslb:import -- --write --source-file "<attached-file-path>"
```

Write mode requires the `retrofi-prod` profile and account `059310317821`.
It refuses to proceed if any target S3 key already exists or if `gbs-contractors` is not empty.
It retries DynamoDB unprocessed items with a fixed bound, verifies the final table count, and reads back a sanitized sample.

## Aggregate Report Semantics

Source row and classification-token data are parsed as a stream.
Records are deduplicated by normalized license number.
Duplicate counts identify license numbers with more than one source row, while duplicate row counts identify rows beyond the first.
Conflict counts are grouped by field and include bounded contractor ID examples without conflicting values.
Missing-field counts apply to relevant contractors after deduplication.
Unknown classification counts exclude the explicitly recognized `ASB` and `HAZ` credential tokens.
No raw source rows are copied into the report or DynamoDB.
