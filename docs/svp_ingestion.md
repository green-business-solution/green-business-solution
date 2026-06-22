# Silicon Valley Power Opportunity Ingestion

This importer gathers Silicon Valley Power business opportunity candidates from curated official SVP
pages. It is registered in `docs/ingestion_process_registry.md`.

## Commands

Local validation run:

```sh
npm run gather:svp
```

Write validated records to AWS DynamoDB:

```sh
npm run gather:svp:aws
```

Limit records while testing:

```sh
node scripts/gather-svp-opportunities.mjs --limit 10
```

Use previously fetched Markdown snapshots when direct network access and reader fallback are unavailable
from the current machine:

```sh
node scripts/gather-svp-opportunities.mjs --fixture-dir /private/tmp
```

The command writes local JSON artifacts under `var/opportunity-ingestion/svp/`, which is intentionally
ignored by Git.

## Source

Source key:

```text
SOURCE_SILICON_VALLEY_POWER
```

Default curated pages:

- `https://www.siliconvalleypower.com/businesses/rebates`
- `https://www.siliconvalleypower.com/businesses/electrification-programs-rebates`
- `https://www.siliconvalleypower.com/businesses/save-money`
- `https://www.siliconvalleypower.com/businesses/building-operator-certification-training-scholarships`
- `https://www.siliconvalleypower.com/sustainability/electric-vehicles/rebates/commercial-zero-emission-vehicle-fleet-rebate`
- `https://www.siliconvalleypower.com/sustainability/electric-vehicles/rebates/municipal-government-and-nonprofit-ev-charging-station-grant`
- `https://www.siliconvalleypower.com/sustainability/electric-vehicles/ev-charging/ev-charging-rebates/multifamily-residential-and-commercial-ev-charging-station-incentive-program`
- `https://www.siliconvalleypower.com/sustainability/electric-vehicles/ev-charging/ev-charging-rebates/load-development-fee-credit-program`

## Current Adapter Behavior

The importer uses a `static_section_splitter_adapter` style:

- Tries to fetch the official SVP page first.
- Falls back to a reader-rendered copy when SVP's Akamai protection blocks direct automated fetches from
  this environment.
- Can run from cached Markdown snapshots with `--fixture-dir` for validation when both direct fetch and
  reader fallback are blocked.
- Preserves the official `siliconvalleypower.com` URL as `sourceUrl`, `origin.sourceUrl`, and evidence.
- Splits curated SVP pages into distinct opportunity sections because one page often contains many
  programs.
- Skips residential-only summaries unless they support a business, nonprofit, municipal, multifamily, or
  commercial opportunity.
- Records PDFs, applications, calculators, flyers, and other visible attachments as `documents`.
- Infers the four current matching dimensions:
  - ZIP code mode
  - utility provider
  - business classification
  - square footage

## Source Metadata Contract

Every writable record must include:

- `sourceKey`
- `sourceName`
- `sourceUrl`
- `origin.sourceKey`
- `origin.sourceName`
- `origin.sourceUrl`
- `origin.sourceBaseUrl`
- `origin.documentType`
- non-empty `evidence[]`

Records that fail this contract are rejected before DynamoDB write.

## Current Limitations

- The importer is curated and bounded; it does not crawl every SVP page.
- ZIP-level matching still needs a service-territory-to-ZIP resolver. Records are tagged to SVP/Santa
  Clara service territory for now.
- Status labels such as fully subscribed or no longer accepting applications are preserved and flagged for
  admin review.
- Classifications are deterministic keyword inferences from SVP text and should be reviewed in the admin
  dashboard before production matching.
- Reader fallback should be revisited if SVP provides an official API, feed, sitemap access, or allowlisted
  crawler access.

## Automation Notes

This command is safe to rerun weekly. It writes stable opportunity IDs derived from the official source URL
and section title, stores content hashes, and reports created, changed, unchanged, rejected, and warning
counts.
