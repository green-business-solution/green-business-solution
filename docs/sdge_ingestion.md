# SDG&E Business Opportunity Ingestion

This importer gathers San Diego Gas & Electric business opportunity candidates from curated SDG&E
business-program seed pages. It is registered in `docs/ingestion_process_registry.md`.

## Commands

Local validation run:

```sh
npm run gather:sdge
```

Write validated records to AWS DynamoDB:

```sh
npm run gather:sdge:aws
```

Limit records while testing:

```sh
node scripts/gather-sdge-opportunities.mjs --limit 10
```

The command writes local JSON artifacts under `var/opportunity-ingestion/sdge/`, which is intentionally
ignored by Git.

## Source

Source key:

```text
SOURCE_SDGE_BUSINESS
```

Default seed pages:

- `https://www.sdge.com/business/save-energy-and-money`
- `https://www.sdge.com/business/savings-center/business-winter-savings-safety-and-solutions`
- `https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response`
- `https://www.sdge.com/business/electric-vehicles/lovelectric`
- `https://www.sdge.com/node/14441`

## Current Adapter Behavior

The importer uses a bounded `business_program_table_adapter` style:

- Parses SDG&E business energy-efficiency program tables by business section.
- Parses named business-program tiles on official SDG&E pages.
- Parses the Economic Development Rate page as one program-level opportunity.
- Stores SDG&E source/origin metadata on every candidate.
- Stores external partner program URLs, but does not crawl uncontrolled partner websites.
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

- External partner sites are not crawled yet.
- PDF/application attachments are recorded when visible on SDG&E pages, but not deeply parsed.
- ZIP-level matching still needs a service-territory-to-ZIP resolver.
- Statewide programs listed by SDG&E may later duplicate opportunities gathered from other utilities,
  CEC, or DSIRE.
- Classifications are deterministic keyword inferences from SDG&E text and should be reviewed in the
  admin dashboard before production matching.

## Automation Notes

This command is safe to rerun weekly. It writes stable opportunity IDs derived from program URLs or
source section hashes, stores content hashes, and reports created, changed, unchanged, rejected, and
warning counts.
