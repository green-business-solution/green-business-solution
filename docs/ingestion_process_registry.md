# DSIRE Ingestion Process Registry

This file is the durable registry for reusable opportunity ingestion processes. Green Business Solution
now uses DSIRE as the only active opportunity database source.

## Active Source

| Source | Source key | Script | Local command | AWS command | Discovery method | Status |
| --- | --- | --- | --- | --- | --- | --- |
| DSIRE | `SOURCE_DSIRE` | `scripts/gather-dsire-opportunities.mjs` | `npm run gather:dsire:public` | `npm run gather:dsire:aws` | DSIRE public table endpoint, defaulting to Financial Incentive records | Active |

## Removed Sources

Previous experimental importers for state, utility, and municipal sources were removed from active code.
Do not run or recreate collectors for those sources unless the product direction changes again and the
team explicitly approves adding a non-DSIRE source.

The current weekly automation surface is intentionally small:

1. Run DSIRE public-table inventory for the current opportunity snapshot.
2. Optionally run DSIRE RSS as a recent-change signal.
3. Write only validated DSIRE records to `gbs-opportunity-candidates`.
4. Show only DSIRE opportunity records in the admin opportunity review tab.

## Required DSIRE Metadata Contract

Every DSIRE opportunity candidate written to `gbs-opportunity-candidates` must include enough metadata
to trace the record back to DSIRE.

Required fields:

- `opportunityId`
- `sourceKey`: must be `SOURCE_DSIRE`
- `sourceName`: must be `DSIRE`
- `sourceUrl`
- `externalId`
- `externalIdType`
- `ingestionMode`
- `ingestRunId` when written to DynamoDB
- `origin.sourceKey`
- `origin.sourceName`
- `origin.sourceUrl`
- `origin.sourceBaseUrl`
- `origin.documentType`
- `evidence[]` with at least one DSIRE evidence object

The admin API derives a compact `sourceRecords[]` array from those fields so reviewers can see where
each opportunity came from without carrying a multi-source schema.

## Supported DSIRE Modes

| Mode | Purpose | Command |
| --- | --- | --- |
| `public-table` | Full public inventory pull. Defaults to Financial Incentive records. | `npm run gather:dsire:public` |
| `rss` | Recent DSIRE updates and removals only. Not a full export. | `npm run gather:dsire:rss` |
| `api` | Configurable licensed/API adapter when official API credentials are available. | `npm run gather:dsire -- --mode api` |

## Automation Notes

The future scheduled job should:

1. Pull the latest repository code from GitHub.
2. Run `npm run gather:dsire:aws`.
3. Optionally run `npm run gather:dsire:aws:rss` as a delta signal.
4. Preserve run artifacts or upload them to durable storage.
5. Report created, updated, unchanged, rejected, and warning counts.
6. Keep records with missing DSIRE metadata out of the database.
7. Leave records in `needs_review` until an admin validates them.

## Schema Principle

Do not model opportunities around many unrelated source adapters right now. The active schema should be
the smallest DSIRE-focused record that supports:

- identifying the DSIRE program,
- showing the title, summary, category, program type, state, sectors, and technologies,
- linking back to DSIRE and the program website,
- reviewing data quality and duplicate decisions,
- comparing content hashes across weekly runs.
