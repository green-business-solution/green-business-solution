# Data Model

The local development app writes to DynamoDB in the RetroFi production AWS account by default.

## Tables

### `gbs-users`

Primary key:

- `userId` string, an internal account identifier. New active records use an `account_...` ID derived
  from the normalized email so the API can block duplicate accounts for the same email.
- Legacy records may still have six-digit IDs from the removed temporary-code prototype, but those IDs
  are no longer accepted as login credentials.
- Active user records should be unique by normalized email across `email`, `googleEmail`, and
  `passwordUsername`. Intake, Google sign-in, and password signup all use that same email identity.

Representative fields:

- `role`: `client` or `admin`
- `status`: `active`
- `fullName`
- `email`
- `companyName`
- `authProvider`: `google`, `password`, or `google,password`
- `googleLinked`: boolean
- `passwordLinked`: boolean
- `googleSubject`
- `googleEmail`
- `createdAt`
- `updatedAt`
- `lastLoginAt`

Admin users:

- Neer Kuchlous, granted by verified Google email `neerkuchlous@gmail.com`
- Rajvansh Gupta, granted by verified Google email `pmrajvansh@gmail.com`

### `gbs-client-intake`

Primary key:

- `userId` string, matching the user table

Representative fields:

- `submissionId`
- `contact`
- `business`
- `site`
- `sustainability`
- `energyDataUploadSession`
- `uploadedUtilityFiles`
- `utilityExtractedValues`
- `siteEnergyProfile`
- `preRetrofitFormAnswers`
- `createdAt`
- `updatedAt`

Current intake form fields include:

- Site address, used by the server geography resolver to derive state, county, city/place, ZIP,
  Census tract/block, coordinates, and later utility/tax territory context. Census Geocoder is the
  primary provider, with optional Geocodio fallback when configured.
- Electric utility provider: `PG&E`, `SCE`, `SDG&E`, `SVP`, or `Other`
- Organization type: `Business`, `Nonprofit`, `Government`, `School`, or `Hospital`
- Ownership status: `Own`, `Lease`, or `Manage`
- Building type: `Office`, `Retail`, `Restaurant`, `Warehouse`, `Manufacturing`, `Grocery`,
  `Hospitality`, `Healthcare`, `Education`, or `Other`
- Square footage, approximate accepted
- Interested improvements: `LED`, `HVAC`, `Refrigeration`, `Solar`, `EV Charging`, `Water Efficiency`,
  `Building Controls`, or `Show Me Everything`

The browser uploads original utility and Green Button files directly to the private energy-data S3 bucket
using a presigned URL returned by the API. Parsed upload metadata and normalized bill/usage summaries are
stored on the matching intake record; the original documents stay in S3.

Per-retrofit pre-retrofit form answers are stored on the matching intake record under `preRetrofitFormAnswers`.
The field uses schema version `pre-retrofit-form-answers-v1`, keys answer groups by retrofit type ID, and stores sanitized answer values plus question metadata needed to rehydrate the customer form.
Admin test-case preview remains fixture and seeded-answer driven; it does not write through this intake profile field.

### `gbs-opportunity-candidates`

Prototype storage for DSIRE opportunity records.

Primary key:

- `opportunityId` string, composed from `SOURCE_DSIRE`, the DSIRE external ID type, and the DSIRE
  external ID

This table is now DSIRE-only for active ingestion and admin review. Older non-DSIRE rows may still exist
in DynamoDB from earlier experiments, but the application no longer gathers them or shows them in the
opportunity review tab.

Minimal active DSIRE fields:

- `opportunityId`
- `sourceKey`: `SOURCE_DSIRE`
- `sourceName`: `DSIRE`
- `sourceUrl`
- `origin`
- `externalId`: DSIRE numeric program ID for public-table records; DSIRE program code plus title hash
  for RSS records
- `externalIdType`
- `canonicalTitle`
- `normalizedTitle`
- `status`
- `state`
- `stateName`
- `category`
- `categoryId`
- `programType`
- `programTypeId`
- `summary`
- `summaryHtml`
- `websiteUrl`
- `lastUpdated`
- `sourceCreatedAt`
- `startDate`
- `endDate`
- `fundingSource`
- `budget`
- `details`
- `geography`
- `administrator`
- `implementingSector`
- `sectors`
- `eligibleSectors`
- `technologies`
- `technologyRecords`
- `parameterSets`
- `ingestionMode`: `public_table_inventory`, `rss_delta_feed`, or `licensed_api`
- `recordKind`
- `contentHash`
- `previousContentHash`
- `dsire`
- `dsireClone`: DSIRE-like clone projection with `program`, `overviewDetails`, `eligibleSectors`,
  `technologies`, `parameterSets`, `authorities`, `contacts`, `memos`, and `source`
- `evidence`
- `raw`
- `dataQuality`
- `reviewStatus`
- `reviewNotes`
- `duplicateOf`
- `reviewedAt`
- `reviewedBy`
- `ingestRunId`
- `firstSeenAt`
- `lastSeenAt`
- `createdAt`
- `updatedAt`

The admin API derives a compact review shape from the table. It includes:

- `IUID`: alias of `opportunityId`
- `sourceRecords[]`: compact DSIRE lineage containing source key, source name, source URL, external ID,
  external ID type, ingestion mode, ingest run ID, and evidence
- selected DSIRE metadata and review fields

The compact admin payload intentionally does not include every raw DSIRE field for every row because the
full table is large enough to exceed production API response limits. The full `raw`, `details`, and
source fields remain stored in DynamoDB.

This is not the final relational opportunity schema. It is a DynamoDB-backed DSIRE prototype table so
admins can inspect gathered source records while we build the reviewed opportunity database.

### Runtime Tables

Runtime records are split by domain so deployment and migration work can stay scoped:

- `gbs-dashboard-performance`: synthetic/test-case dashboard performance datasets keyed by
  `stateScope`/`stateKey`.
- `gbs-retrofit-recommendation-cache`: recommendation cache metadata keyed by `stateScope`/`stateKey`.
  The larger JSON payloads live in the runtime-cache S3 bucket.
- `gbs-application-profiles`: application source/profile registry records keyed by `stateScope`/`stateKey`.
- `gbs-firstmate-tasks`: sanitized Codex task snapshots and bounded report payloads keyed by
  `stateScope`/`stateKey`.
  Published snapshots also carry manifest metadata such as `sourceGeneratedAt` and
  `sourceModifiedAtEpochMs` so the admin UI can show whether the current manifest-selected snapshot
  is fresh, empty, or unavailable.
- `gbs-api-runtime-state`: small operational state keyed by `stateScope`/`stateKey`, such as Geocodio
  quota usage.

The former shared `gbs-runtime-state` table has been split into those domain tables.

## S3 Buckets

- `gbs-retrofi-org-energy-data-...`: customer uploaded utility bills and Green Button files under
  `energy-data/`.
- `gbs-retrofi-org-runtime-cache-...`: generated runtime cache payloads under `runtime-cache/`.
- `gbs-retrofi-test-fixtures-...`: generated fixtures and synthetic test data under
  `generated-test-fixtures/`.
- `gbs-retrofi-org-artifacts-...`: Lambda deployment zip artifacts under `lambda/`.
- `gbs-retrofi-dev-work-...`: raw GPT Pro prompt/output work under `gpt-pro-work/`.

Admins can review DSIRE records from the `gbs-opportunity-candidates` admin tab. Review actions update
`reviewStatus`, `reviewNotes`, `duplicateOf`, `reviewedAt`, `reviewedBy`, and `updatedAt` on the same
DynamoDB row. Supported review statuses are `approved`, `rejected`, `needs_review`, and `duplicate`.

Public-table records preserve DSIRE's numeric program ID at `dsire.programId`. RSS records preserve the
raw DSIRE program code at `dsire.programCode`; the RSS importer includes a title hash in `externalId`
because the feed can contain repeated program codes with different titles.

## Public DSIRE Clone

The public DSIRE-sourced database browser is available at:

```text
https://retrofi.org/database
```

It is backed by read-only API endpoints under `/api/database/*`. These endpoints currently read from
`gbs-opportunity-candidates`, filter to DSIRE public-table/API inventory records, and project each row
into a DSIRE-like Program shape. This is the first clone layer; it is not yet a separate relational
database.

## Local API

The browser does not receive AWS credentials. The React app calls the local Node API through Vite's
`/api` proxy. The API uses the local AWS CLI SSO profile:

```text
retrofi-prod
```

Before running the app, sign in with:

```sh
aws sso login --profile retrofi-prod
```

## Diagnostics

Use this checklist when Google sign-in, intake submission, or admin loading works on one laptop but fails
on another:

```sh
git pull --ff-only
npm install
aws sso login --profile retrofi-prod
aws sts get-caller-identity --profile retrofi-prod
npm run dev
curl http://127.0.0.1:8787/api/diagnostics
```

Expected:

- `aws sts get-caller-identity --profile retrofi-prod` shows account `059310317821`.
- `npm run dev` starts both the API and Vite.
- the API prints `Green Business Solution API running at http://127.0.0.1:8787`.
- `/api/diagnostics` returns `"ok": true`.

The admin dashboard displays one tab per table returned by the local API, including
`gbs-opportunity-candidates` after that table has been created in AWS.

If only Vite is running, the browser can render the pages but intake submission and authenticated
dashboard loading will fail because `/api` has nothing to talk to.
