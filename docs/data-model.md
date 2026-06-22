# Data Model

The local development app writes to DynamoDB in the Green Business Solution AWS account.

## Tables

### `gbs-users`

Primary key:

- `userId` string, currently a six-digit temporary code

Representative fields:

- `role`: `client` or `admin`
- `status`: `active`
- `fullName`
- `email`
- `companyName`
- `authProvider`: currently `temporaryCode`
- `googleLinked`: boolean, currently `false`
- `createdAt`
- `updatedAt`
- `lastLoginAt`

Seeded admin users:

- Neer Kuchlous, temporary admin code `471140`
- Rajvansh Gupta, temporary admin code `768383`

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

Current DSIRE RSS fields include:

- `sourceKey`: currently `SOURCE_DSIRE`
- `sourceName`: currently `DSIRE`
- `externalId`: DSIRE program code plus title hash for RSS records, such as `OK49F:44a1...`
- `canonicalTitle`
- `normalizedTitle`
- `state`
- `summary`
- `publishedAt`
- `ingestionMode`: currently `rss_delta_feed`
- `contentHash`
- `dsire`
- `evidence`
- `raw`
- `dataQuality`
- `reviewStatus`
- `firstSeenAt`
- `lastSeenAt`
- `createdAt`
- `updatedAt`

This is not the final relational opportunity schema. It is a DynamoDB-backed prototype table so admins
can inspect gathered source records while we build the normalized opportunity database.

The raw DSIRE program code is still preserved at `dsire.programCode`. The RSS importer includes a title
hash in `externalId` because the feed can contain repeated program codes with different titles.

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

Use this checklist when a temporary code works on one laptop but fails on another:

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

If only Vite is running, the browser can render the pages but form and code submission will fail because `/api` has nothing to talk to.
