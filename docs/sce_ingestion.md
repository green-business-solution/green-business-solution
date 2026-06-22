# Southern California Edison Ingestion

Reusable automation code:

```sh
npm run gather:sce
```

Validate and write records into the AWS DynamoDB opportunity-candidates table:

```sh
npm run gather:sce:aws
```

The importer writes local run artifacts under:

```text
var/opportunity-ingestion/sce/
```

That directory is intentionally ignored by Git. Keep the reusable code and documentation in GitHub, but do not commit bulky run output.

## Source

- Source key: `SOURCE_SCE_BUSINESS`
- Source name: `Southern California Edison Business Programs`
- Base URL: `https://www.sce.com/`
- Script: `scripts/gather-sce-opportunities.mjs`
- Adapter style: bounded official-page section importer
- Parser version: `sce-bounded-business-sections-v1`

## Curated Pages

The current importer uses official SCE pages only:

- `https://www.sce.com/business/save-costs-energy/savings-strategies/what-is-demand-response`
- `https://www.sce.com/business/save-costs-energy/savings-strategies-for-businesses/what-is-demand-response/capacity-bidding-program-elect-aggregators`
- `https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement`
- `https://www.sce.com/business/smart-energy-solar/energy-efficiency-programs`
- `https://www.sce.com/business/save-costs-energy/economic-development-assistance`
- `https://www.sce.com/business/smart-energy-solar/evs-for-business`

## What It Extracts

The importer splits curated SCE business pages into named opportunity sections, then normalizes each section into a candidate record with:

- `sourceKey`, `sourceName`, `sourceUrl`, and `origin`
- source evidence with retrieved timestamp, page URL, section heading, hashes, and parser version
- title, summary, status, program type, technologies, application URL, and supporting links
- deterministic matching parameters for utility provider, business classification, square footage, demand kW, and SCE service-territory mode
- SCE-specific metadata under `sce`

## Current Assessment

Implementation result: moderate partial success.

SCE has useful business opportunities, including demand response, building efficiency, financing, economic development, EV charging, and fleet electrification programs. The source is harder than CEC, SDG&E, and direct DSIRE inventory because the site is sprawling and mixes SCE programs, statewide programs, third-party aggregator programs, old pages, and external portals.

The first AWS run imported 18 validated SCE opportunity candidates into `gbs-opportunity-candidates`.

The current importer is useful and repeatable, but it should not be treated as a complete SCE inventory. External partner and aggregator links are stored for evidence and admin review, but external domains are not crawled.

## Automation Notes

For weekly automation:

1. Pull the latest GitHub code.
2. Run `npm run gather:sce:aws` after DSIRE, CEC, SDG&E, and SVP unless the source ranking changes.
3. Inspect the generated run manifest and validation report.
4. Use the admin dashboard table tab for human review of raw records and warnings.
5. Treat changed incentive amounts, status changes, external partner links, and duplicate-looking statewide programs as review-required.

## Known Limitations

- The importer is bounded to curated official pages and does not crawl the whole SCE site.
- ZIP-level matching requires a future SCE service-territory-to-ZIP resolver.
- External partner domains are intentionally not crawled.
- Some SCE-linked programs may duplicate DSIRE, CEC, PG&E, or SDG&E records.
- Several records are intentionally marked `needs_review` because classifications are deterministic keyword inferences.

## Trim/Keep Signal

Do not trim SCE yet. It has meaningful opportunities, but it should stay marked as high difficulty and partial coverage until duplicate detection and external partner handling improve.
