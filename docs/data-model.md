# Data Model

The local development app writes to DynamoDB in the Green Business Solution AWS account.

## Tables

### `gbs-users`

Primary key:

- `userId` string, an internal account identifier. New records use an opaque `user_...` or `admin_...` ID.
- Legacy records may still have six-digit IDs from the removed temporary-code prototype, but those IDs are no longer accepted as login credentials.

Representative fields:

- `role`: `client` or `admin`
- `status`: `active`
- `fullName`
- `email`
- `companyName`
- `authProvider`: currently `google`
- `googleLinked`: boolean
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
- Building type: `Office`, `Retail`, `Restaurant`, `Warehouse`, `Manufacturing`, `Grocery`, `Hospitality`, `Healthcare`, `Education`, or `Other`
- Square footage, approximate accepted
- Interested improvements: `LED`, `HVAC`, `Refrigeration`, `Solar`, `EV Charging`, `Water Efficiency`, `Building Controls`, or `Show Me Everything`

### `gbs-opportunity-candidates`

Prototype storage for validated green-business opportunity records gathered from external sources.

Primary key:

- `opportunityId` string, currently composed from the source, external ID type, and source external ID

Current DSIRE, CEC, SDG&E, SCE, and SVP fields include:

- `sourceKey`: currently `SOURCE_DSIRE`, `SOURCE_CA_ENERGY_COMMISSION`, `SOURCE_SDGE_BUSINESS`, `SOURCE_SCE_BUSINESS`, or `SOURCE_SILICON_VALLEY_POWER`
- `sourceName`
- `origin`: structured source metadata including source key, source name, source URL, base URL, and document type
- `externalId`: DSIRE numeric program ID for public-table records; DSIRE program code plus title hash for RSS records; CEC solicitation number or URL hash for CEC records; SDG&E program URL fingerprint or source section hash; SVP source URL fingerprint plus section-title slug
- `canonicalTitle`
- `normalizedTitle`
- `sourceUrl`
- `state`
- `stateName`
- `category`
- `categoryId`
- `programType`
- `summary`
- `summaryHtml`
- `websiteUrl`
- `lastUpdated`
- `deadlineDate`
- `applicationUrl`
- `documents`
- `technologies`
- `matchingParameters`
- `eligibilityRules`
- `details`
- `publishedAt`
- `published`
- `ingestionMode`: currently `public_table_inventory`, `rss_delta_feed`, `cec_sitemap_detail`, `sdge_business_seed_pages`, `sce_bounded_business_sections`, or `svp_static_section_splitter`
- `contentHash`
- `dsire`
- `cec`
- `sdge`
- `sce`
- `svp`
- `evidence`
- `raw`
- `dataQuality`
- `reviewStatus`
- `reviewNotes`
- `duplicateOf`
- `reviewedAt`
- `reviewedBy`
- `firstSeenAt`
- `lastSeenAt`
- `createdAt`
- `updatedAt`

This is not the final relational opportunity schema. It is a DynamoDB-backed prototype table so admins
can inspect gathered source records while we build the normalized opportunity database.

Admins can review records from the `gbs-opportunity-candidates` admin tab. Review actions update
`reviewStatus`, `reviewNotes`, `duplicateOf`, `reviewedAt`, `reviewedBy`, and `updatedAt` on the same
DynamoDB row. Supported review statuses are `approved`, `rejected`, `needs_review`, and `duplicate`.

Public-table records preserve DSIRE's numeric program ID at `dsire.programId`. RSS records preserve the
raw DSIRE program code at `dsire.programCode`; the RSS importer includes a title hash in `externalId`
because the feed can contain repeated program codes with different titles.

CEC records preserve source metadata under `cec`, including solicitation number, solicitation type,
status, division, and program. CEC records also include `matchingParameters` for the four current
business-profile matching dimensions: ZIP code, utility provider, business classification, and square
footage. These are inferred from CEC detail-page text and should be reviewed before production use.

SDG&E records preserve source metadata under `sdge`, including the SDG&E seed page, section heading,
section category, contractor/delivery partner, and program URL. SDG&E records also include `origin`
and `evidence` on every writable record so admins can see where each opportunity originated.

SCE records preserve source metadata under `sce`, including the official SCE page title, section heading,
section category, and parser version. The SCE importer uses bounded official business pages and stores
external partner or aggregator links as evidence/application links without crawling those external domains.
SCE records are currently marked for review because the source mixes utility-run programs, statewide
programs, third-party implementer programs, external portals, and potentially duplicate records.

SVP records preserve source metadata under `svp`, including the official SVP source page, section
heading, section category, fetch mode, and parser version. The SVP importer uses curated official pages
and splits pages into multiple business-program opportunity sections because one SVP page can contain many
distinct rebates, grants, scholarships, technical-assistance offers, or EV charging incentives.

## Local API

The browser does not receive AWS credentials. The React app calls the local Node API through Vite's `/api` proxy. The API uses the local AWS CLI SSO profile:

```text
gbs
```

Before running the app, sign in with:

```sh
aws sso login --profile gbs
```

## Diagnostics

Use this checklist when Google sign-in, intake submission, or admin loading works on one laptop but fails on another:

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

If only Vite is running, the browser can render the pages but intake submission and Google-authenticated dashboard loading will fail because `/api` has nothing to talk to.
