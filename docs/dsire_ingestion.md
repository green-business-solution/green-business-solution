# DSIRE Opportunity Ingestion

This project now has a reusable DSIRE ingestion script:

```bash
npm run gather:dsire
```

The command runs `scripts/gather-dsire-opportunities.mjs`. It writes local JSON artifacts under `var/opportunity-ingestion/dsire/`, which is intentionally ignored by Git.

This importer is registered in `docs/ingestion_process_registry.md`. Every written record must include
the required source/origin metadata contract from that registry.

## Current Behavior

The script supports three modes:

- `public-table`: gathers the current DSIRE public table inventory from `https://programs.dsireusa.org/api/v1/programs`.
- `api`: gathers full DSIRE program records from a configured licensed/API endpoint.
- `rss`: gathers the public DSIRE update feed for weekly change detection.

The default command uses `auto` mode:

- If `DSIRE_API_BASE_URL` is set, it runs API mode.
- If `DSIRE_API_BASE_URL` is not set, it runs public-table mode.

RSS mode is useful for detecting recently added or updated DSIRE programs, but it is not a full opportunity database export. Public-table mode uses the same structured JSON endpoint that DSIRE's browser table uses. By default, it imports the `Financial Incentive` category because that is closest to rebates, tax incentives, grants, loans, and financing opportunities.

## Commands

Run the public RSS smoke test:

```bash
npm run gather:dsire:rss
```

Run the public DSIRE inventory without writing to AWS:

```bash
npm run gather:dsire:public
```

Validate and write DSIRE financial-incentive inventory records into the AWS DynamoDB opportunity-candidates table:

```bash
npm run gather:dsire:aws
```

Validate and write only the public RSS records into AWS when testing weekly changed-item behavior:

```bash
npm run gather:dsire:aws:rss
```

Run API mode after configuring access:

```bash
DSIRE_API_BASE_URL="https://example.dsire-api-host" npm run gather:dsire -- --mode api
```

Run an API delta pull when the endpoint supports an updated-since filter:

```bash
DSIRE_API_BASE_URL="https://example.dsire-api-host" npm run gather:dsire -- --mode api --updated-since 2026-01-01
```

Limit records during testing:

```bash
npm run gather:dsire:public -- --limit 5
```

## API Configuration

Use environment variables so credentials are not committed:

| Variable | Purpose |
| --- | --- |
| `DSIRE_API_BASE_URL` | Base API URL. Required for API mode. |
| `DSIRE_API_PROGRAMS_PATH` | Program endpoint path. Defaults to `/programs`. |
| `DSIRE_API_KEY` | Optional API token/key. |
| `DSIRE_API_AUTH_HEADER` | Header for the token/key. Defaults to `Authorization`. |
| `DSIRE_API_AUTH_SCHEME` | Auth scheme. Defaults to `Bearer`; set empty if the API expects the raw token. |
| `DSIRE_API_LIMIT_PARAM` | Page-size query parameter. Defaults to `limit`. |
| `DSIRE_API_OFFSET_PARAM` | Offset query parameter. Defaults to `offset`. |
| `DSIRE_API_PAGE_PARAM` | Optional page-number query parameter. If set, page mode is used instead of offset mode. |
| `DSIRE_API_PAGE_START` | First page number. Defaults to `1`. |
| `DSIRE_API_UPDATED_SINCE_PARAM` | Updated-since query parameter. Defaults to `updatedSince`. |
| `DSIRE_USER_AGENT` | Optional user-agent override. |

AWS/DynamoDB variables:

| Variable | Purpose |
| --- | --- |
| `GBS_OPPORTUNITIES_TABLE` | Opportunity-candidates table. Defaults to `gbs-opportunity-candidates`. |
| `AWS_PROFILE` | AWS CLI profile used for DynamoDB writes. Defaults to `gbs`. |
| `AWS_REGION` | AWS region. Defaults to `us-east-2`. |

The adapter is intentionally configurable because the exact licensed DSIRE API shape should come from the DSIRE API documentation or credentials we receive.

Public table variables:

| Variable | Purpose |
| --- | --- |
| `DSIRE_PUBLIC_API_BASE_URL` | Public DSIRE API base URL. Defaults to `https://programs.dsireusa.org/api/v1/`. |
| `DSIRE_PUBLIC_PROGRAMS_PATH` | Public DSIRE program endpoint path. Defaults to `/programs`. |
| `DSIRE_PUBLIC_REFERER` | Referer header expected by the public table endpoint. Defaults to `https://programs.dsireusa.org/system/program`. |
| `DSIRE_PUBLIC_CATEGORY` | `financial`, `regulatory`, or `all`. Defaults to `financial`. |

## Output Files

Each run creates:

- `raw-records.json`: raw API records or RSS items.
- `normalized-opportunities.json`: normalized opportunity candidate records.
- `source-documents.json`: fetched API/RSS document metadata and hashes.
- `validation-report.json`: validator summary, rejected records, and warnings.
- `changes.json`: new, changed, unchanged, and when safe, removed records compared with the previous local snapshot.
- `run-manifest.json`: run metadata, counts, output paths, and limitations.

The script also updates:

- `latest-normalized-opportunities.json`
- `latest-run-manifest.json`

These files are local ingestion artifacts. They are not yet the final relational opportunity database.

## DynamoDB Storage

For the current prototype, validated DSIRE public-table and RSS records can be written to:

```text
gbs-opportunity-candidates
```

Primary key:

- `opportunityId`: composed from source key, external ID type, and source external ID.

Representative fields:

- `sourceKey`
- `sourceName`
- `externalId`
- `canonicalTitle`
- `normalizedTitle`
- `state`
- `stateName`
- `category`
- `categoryId`
- `programTypeId`
- `summary`
- `summaryHtml`
- `publishedAt`
- `published`
- `websiteUrl`
- `lastUpdated`
- `sourceCreatedAt`
- `startDate`
- `endDate`
- `fundingSource`
- `budget`
- `details`
- `implementingSector`
- `sectors`
- `eligibleSectors`
- `technologies`
- `technologyRecords`
- `parameterSets`
- `dsireClone`
- `ingestionMode`
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

The script upserts records by `opportunityId` and reports created, updated, and unchanged counts.
Only records that pass critical validation are written. Public-table records use DSIRE numeric program IDs.
RSS records are marked `clean_with_limitations` because the feed provides update summaries rather than full program details.

RSS identity uses the DSIRE program code plus a normalized-title hash. The raw program code is preserved
under `dsire.programCode`. This prevents one RSS item from overwriting another when the feed repeats a
program code with a different title.

The local admin API includes this table in its `dataTables` response, so it appears as its own tab in
the admin dashboard.

## DSIRE Clone Projection

The ingestion script writes a `dsireClone` projection with `schemaVersion: dsire-clone-v1`. This
projection follows the DSIRE clone specification in `dsire_clone_specification.md` while still using the
current DynamoDB prototype table.

The clone projection includes:

- `program`: DSIRE-like program header with state, category, program type, implementing sector, dates,
  summary text, source URL, and publication status.
- `overviewDetails`: normalized Program Overview details from DSIRE `details`.
- `eligibleSectors`: eligible sector lookup records, primarily derived from DSIRE parameter sets.
- `technologies`: technology lookup records, including category and energy-category IDs where provided.
- `parameterSets`: machine-readable incentive rows with sectors, technologies, and parameter values.
- `authorities`, `contacts`, and `memos`: empty arrays unless the source payload provides those child records.
- `source`: source lineage back to the DSIRE record.

The public site exposes this clone at:

```text
https://retrofi.org/database
```

The read-only API endpoints are:

- `GET /api/database/programs`
- `GET /api/database/programs/{id}`
- `GET /api/database/facets`
- `GET /api/database/states`
- `GET /api/database/program-types`
- `GET /api/database/technologies`
- `GET /api/database/sectors`
- `GET /api/database/summary/maps`
- `GET /api/database/summary/tables`
- `GET /api/database/programs/updates`

## Weekly Reuse

The weekly job should eventually run this script before downstream parsing, classification, review, and publishing jobs.

Suggested future flow:

1. Run DSIRE API mode as a full inventory or updated-since pull.
2. Store raw and normalized artifacts.
3. Compare content hashes and external IDs against existing opportunity records.
4. Insert or update relational opportunity tables.
5. Queue uncertain, changed, or high-impact records for admin review.
6. Show every related table in the admin interface for human validation.

## Current Limitations

- The relational opportunity database has not been implemented yet.
- This script does not create migrations, queues, cron schedules, or Lambda jobs. DSIRE records appear
  in the existing admin opportunity review tab after they are written to DynamoDB.
- RSS mode cannot gather all DSIRE opportunities.
- Public-table mode defaults to financial incentives. Use `--public-category all` to include regulatory policies too.
- API mode is ready for configuration, but the actual licensed DSIRE API base URL, auth format, and pagination parameters need to be confirmed if formal API access is provided later.
- Classification by zip code, utility provider, business classification, and square footage remains planned for a later implementation step.
