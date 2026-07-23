# Unmatched Directory Contractor Resolution

This document describes the bounded follow-up review of entries quarantined by the completed California contractor directory dry run.
It resolves only the 223 unmatched entries, 18 ambiguous entries, and 3 other possible-new-contractor outcomes in that reviewed artifact.
It does not search for or enrich the rest of the statewide contractor table.

## Official CSLB Verification

The workflow reconstructs the exact directory records from the reviewed Pass 2 source snapshots and verifies all source hashes before lookup.
It uses a source-provided CSLB license number when one exists.
Otherwise, it searches the official live CSLB business-name system with bounded legal-name, DBA, and normalized-name variants.
Exact phone, name plus ZIP, and address plus ZIP candidates from the retained official CSLB snapshot are also considered.

Every candidate must be opened in the official CSLB license-detail system.
The detail parser retains the official business name, DBA names, current license number, status, classifications, address, phone, issue date, and expiration date.
A business-name match can establish identity.
A phone match must be corroborated by location unless the source supplied the exact license number.
ZIP or city alone cannot establish identity.
When several licenses share a business name, a unique phone or location lead may disambiguate them.
Otherwise, the entry remains ambiguous.

Each official search and detail response is retained locally with its URL, retrieval time, SHA-256, size, and intended immutable S3 key.
The dry run does not upload these snapshots.

## Contractor Row Guards

A new `retrofi-contractor.v1` row is proposed only when all of these conditions hold:

- The live official detail establishes one exact, nonconflicting CSLB license.
- The official license status is current and usable.
- At least one official classification exists in `data/cslb_classification_to_retrofits.v1.json`.
- The resulting `supportedRetrofitIds` array is nonempty.
- The derived `CA_CSLB_<license-number>` contractor ID is absent from the current table.

CSLB business, status, classification, address, and phone data come only from the official license detail.
Directory data can add only `email`, `servesCommercial`, `serviceAreas`, `programMemberships`, `certifications`, and `enrichmentEvidence`.
Existing rows cannot change `supportedRetrofitIds` or any CSLB-derived identity field.

Inactive, suspended, expired, canceled, and otherwise unusable licenses remain unresolved candidates.
Mapped status is evaluated only after identity and live license status are verified.
Manufacturers, distributors, vendors, consultants, program administrators, architects, and engineering-only providers are categorized for a possible future provider dataset rather than added to `gbs-contractors`.

## Dry Run

Run the bounded resolution with:

```sh
npm run contractors:resolve:directories -- \
  --dry-run \
  --profile retrofi-prod \
  --source-report "<pass-2-report-path>"
```

The command reads the live contractor table, the retained CSLB source, the reviewed Pass 2 snapshots, and the official live CSLB lookup system.
It writes local artifacts under `var/contractor-directory-resolution/<run-id>/`.
It performs zero S3 or DynamoDB writes.

The local artifacts are:

- `report.json` with aggregate counts, hashes, invariants, and sanitized examples.
- `proposal.json` with conditional existing-row updates and any guarded new rows.
- `unresolved-candidates.json` with every non-actionable entry categorized for review.
- `raw/cslb-live/` with exact official lookup responses.
- `report.sha256` with the approval hash for `report.json`.

## Completed Dry Run

The completed run ID is `directory-resolution-20260723T185235786Z`.
It reviewed all 244 intended queue entries and recorded no lookup errors.
It performed zero AWS writes.

| Outcome | Count |
| --- | ---: |
| Unmatched entries reviewed | 223 |
| Ambiguous entries reviewed | 18 |
| Other possible-new-contractor entries reviewed | 3 |
| Unique exact CSLB licenses resolved | 167 |
| Directory entries tied to exact licenses | 170 |
| Existing contractors found under alternate identities | 52 |
| Existing contractor rows with proposed enrichment | 52 |
| Verified new contractor rows proposed | 0 |
| Inactive or unusable licenses | 114 |
| Usable licenses with no mapped classification | 3 |
| Legitimate noncontractor providers | 2 |
| Unresolved or still ambiguous entries | 59 |
| Identity conflicts | 13 |

The 52 existing-row proposals add public directory enrichment without changing Pass 1 fields.
They propose 45 email values, 27 commercial-service values, 4 service-area arrays, 48 program-membership arrays, and 4 certification arrays.
One contractor is represented by two resolved directory entries, so there are 53 existing-alternate-identity outcomes but 52 unique existing contractors.

The report SHA-256 is `af1b2579d5c9646bf489b32c447484a258bf1fa8d70768703acad91552218e25`.
The proposal artifact SHA-256 is `eb74e7b6b6dd70388d8de208f1a1168ba2c21007a45b66e4110d017280ff44f9`.
The deterministic proposal content hash is `164c0c4febebee545646a54d596279e33d0bc887f4baee8941a6d4ffc49b99a8`.
The unresolved-candidate artifact SHA-256 is `37f192ed81a4904a6b3afec8c1b0a1c3801ce3abe0aa2a3649db7e20fb7231bc`.

The report contains sanitized examples for every populated outcome category.
The `verified_new_contractor` and `lookup_error` example arrays are empty because both categories have a count of zero.

## Guarded Write Mode

Write mode requires the reviewed run ID, the exact reviewed report hash, the exact proposal artifact hash, and the completed source-write report hash:

```sh
npm run contractors:resolve:directories -- \
  --write \
  --profile retrofi-prod \
  --reviewed-report "<resolution-report-path>" \
  --approval "directory-resolution-20260723T185235786Z" \
  --approved-report-sha256 "af1b2579d5c9646bf489b32c447484a258bf1fa8d70768703acad91552218e25" \
  --approved-proposal-sha256 "eb74e7b6b6dd70388d8de208f1a1168ba2c21007a45b66e4110d017280ff44f9" \
  --approved-source-write-report-sha256 "183ca802b0efe50dc842cbe56f59a5c1b089c4650818ba20a29f724b00b3259a"
```

Before mutation, write mode verifies the Pass 2 report and snapshots, mapping file, retained CSLB source, resolution proposal, and every live lookup snapshot.
It refuses a changed input or proposal.
It uses conditional `UpdateItem` operations only when all reviewed field values still match.
It uses conditional `PutItem` with `attribute_not_exists(contractorId)` for a genuinely new contractor.
An exact prior application is skipped idempotently, while a conflicting existing contractor ID is rejected.

The reviewed production write was completed on July 23, 2026.
See [Contractor Directory Production Write Execution](./contractor-directory-production-write-execution.md) for the write results, conflict handling, report hashes, sanitized verification samples, and S3 report keys.
No infrastructure or application deployment was performed.
