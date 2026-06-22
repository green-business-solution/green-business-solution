# Data Model

The local development app writes to DynamoDB in the Green Business Solution AWS account.

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
- `createdAt`
- `updatedAt`

Current intake form fields include:

- Site address, later used to derive state, county, city, ZIP, and utility territory
- Electric utility provider: `PG&E`, `SCE`, `SDG&E`, `SVP`, or `Other`
- Organization type: `Business`, `Nonprofit`, `Government`, `School`, or `Hospital`
- Ownership status: `Own`, `Lease`, or `Manage`
- Building type: `Office`, `Retail`, `Restaurant`, `Warehouse`, `Manufacturing`, `Grocery`,
  `Hospitality`, `Healthcare`, `Education`, or `Other`
- Square footage, approximate accepted
- Interested improvements: `LED`, `HVAC`, `Refrigeration`, `Solar`, `EV Charging`, `Water Efficiency`,
  `Building Controls`, or `Show Me Everything`

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
gbs
```

Before running the app, sign in with:

```sh
aws sso login --profile gbs
```

## Diagnostics

Use this checklist when Google sign-in, intake submission, or admin loading works on one laptop but fails
on another:

```sh
git pull --ff-only
npm install
aws sso login --profile gbs
aws sts get-caller-identity --profile gbs
npm run dev
curl http://127.0.0.1:8787/api/diagnostics
```

Expected:

- `aws sts get-caller-identity --profile gbs` shows account `448016109714`.
- `npm run dev` starts both the API and Vite.
- the API prints `Green Business Solution API running at http://127.0.0.1:8787`.
- `/api/diagnostics` returns `"ok": true`.

The admin dashboard displays one tab per table returned by the local API, including
`gbs-opportunity-candidates` after that table has been created in AWS.

If only Vite is running, the browser can render the pages but intake submission and authenticated
dashboard loading will fail because `/api` has nothing to talk to.
