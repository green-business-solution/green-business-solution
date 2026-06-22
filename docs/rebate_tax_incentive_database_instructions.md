# DSIRE Opportunity Database Instructions

Green Business Solution now focuses only on DSIRE for rebates, tax incentives, grants, loans, financing
programs, utility incentives, demand-response programs, EV charging incentives, energy-efficiency
programs, and related green-business opportunities.

This file supersedes the earlier multi-source architecture plan. Do not implement crawlers for other
databases or websites unless the team explicitly changes scope.

## Purpose

Build and maintain a clean internal DSIRE opportunity database that can support:

- admin review of gathered DSIRE records,
- future matching between a business profile and relevant incentives,
- weekly change detection,
- future AI-assisted cleanup and classification.

## Active Architecture

The active ingestion path is:

DSIRE public table or configured DSIRE API
-> DSIRE normalized candidate records
-> validation
-> DynamoDB prototype storage
-> admin review
-> future relational opportunity tables

The current implementation is intentionally not a generic website crawler. It should remain a DSIRE
adapter until there is a deliberate decision to add another source.

## Active Source Registry

| Key | Display name | Base URL | Role | Script | Status |
| --- | --- | --- | --- | --- | --- |
| `SOURCE_DSIRE` | DSIRE | `https://www.dsireusa.org/` | Primary incentives and policies source | `scripts/gather-dsire-opportunities.mjs` | Active |

## DSIRE Record Concepts

### DSIRE source record

A single normalized record from DSIRE public-table mode, RSS mode, or configured API mode.

Public-table records usually map to one DSIRE program. RSS records are update notices and may contain
less detail, so they are treated as limited evidence until a full public-table/API record confirms them.

### Candidate opportunity

The DynamoDB row stored in `gbs-opportunity-candidates`.

It is a prototype review record, not the final relational opportunity schema.

### Future canonical opportunity

When the relational database is introduced, a canonical opportunity should represent the reviewed,
deduplicated business-facing opportunity. For now, one DSIRE candidate record is the active unit of admin
review.

## Current Commands

```sh
npm run gather:dsire
npm run gather:dsire:public
npm run gather:dsire:rss
npm run gather:dsire:aws
npm run gather:dsire:aws:rss
```

There are no active non-DSIRE opportunity ingestion commands.

## Minimal DSIRE Schema

Keep the active record shape small and DSIRE-specific.

Core identity:

- `opportunityId`
- `externalId`
- `externalIdType`
- `sourceKey`
- `sourceName`
- `sourceUrl`
- `ingestionMode`
- `ingestRunId`

Display fields:

- `canonicalTitle`
- `normalizedTitle`
- `summary`
- `summaryHtml`
- `category`
- `categoryId`
- `programType`
- `programTypeId`
- `status`
- `state`
- `stateName`
- `administrator`
- `sectors`
- `technologies`
- `websiteUrl`

DSIRE-specific fields:

- `dsire.programId`
- `dsire.programCode` for RSS records
- `dsire.category`
- `dsire.categoryId`
- `dsire.programType`
- `dsire.programTypeId`
- `dsire.state`
- `dsire.stateName`
- `dsire.sectorId`
- `dsire.sectorName`
- `dsire.published`
- `dsire.changeAction` for RSS records
- `dsire.rssGuid` for RSS records

Evidence and audit fields:

- `origin`
- `evidence`
- `contentHash`
- `previousContentHash`
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

The admin API may derive:

- `IUID`: alias of `opportunityId`
- `sourceRecords[]`: compact DSIRE source lineage for review

## Source Records

The admin-facing `sourceRecords[]` structure should be derived from existing DSIRE fields:

```json
[
  {
    "sourceKey": "SOURCE_DSIRE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/123/example-program",
    "externalId": "123",
    "externalIdType": "dsire_program_id",
    "ingestionMode": "public_table_inventory",
    "ingestRunId": "dsire-public-table-20260622T120000000Z",
    "evidence": [
      {
        "sourceName": "DSIRE",
        "sourceUrl": "https://programs.dsireusa.org/system/program/detail/123/example-program",
        "documentType": "public_table_record",
        "retrievedAt": "2026-06-22T12:00:00.000Z"
      }
    ]
  }
]
```

Do not keep separate source adapters, source-specific nested objects, or matching rules for removed
non-DSIRE sources.

## Validation Rules

Writable DSIRE records must have:

- DSIRE source metadata,
- a source URL,
- an external ID,
- a canonical title,
- a 64-character content hash,
- at least one evidence object.

RSS records should be marked with warnings because the RSS feed is a recent-change feed, not a complete
program export.

## Weekly Workflow

1. Start a DSIRE ingestion run.
2. Fetch DSIRE public-table records.
3. Normalize records into the minimal DSIRE candidate schema.
4. Validate required DSIRE metadata.
5. Compare content hashes with existing DynamoDB rows.
6. Upsert new or changed records.
7. Leave records in admin review status.
8. Optionally process DSIRE RSS as a recent-change signal.
9. Generate a run manifest and validation report.

## Planned Work

- Decide whether to keep DynamoDB as the review store or move DSIRE candidates into a relational schema.
- Add scheduled execution through Lambda/EventBridge or another approved scheduler.
- Add a job queue only if DSIRE ingestion or downstream classification needs retryable background work.
- Add OpenAI-assisted classification for zip code, utility provider, business classification, and square
  footage when the business-matching model is ready.
- Build a final reviewed opportunity table separate from raw DSIRE candidate records.

## Important Constraint

Do not begin implementing non-DSIRE crawlers, migrations, AI agents, cron jobs, or extraction adapters
from this document. The active implementation scope is DSIRE only.
