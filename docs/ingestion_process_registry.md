# Opportunity Ingestion Process Registry

This file is the durable registry for reusable opportunity ingestion processes. Each source-specific
importer should be reusable from a local command now and from a scheduled job later.

## Required Source Metadata Contract

Every normalized opportunity candidate must include source/origin metadata before it can be written to
`gbs-opportunity-candidates`.

Required fields:

- `sourceKey`
- `sourceName`
- `sourceUrl`
- `origin.sourceKey`
- `origin.sourceName`
- `origin.sourceUrl`
- `origin.sourceBaseUrl`
- `origin.documentType`
- `evidence[]` with at least one source evidence object

Importers should reject records that do not satisfy this contract. This makes it possible to audit where
each opportunity came from after aggregation, matching, and future AI-assisted classification.

## Current Importers

| Source | Source key | Script | Local command | AWS command | Discovery method | Current status |
| --- | --- | --- | --- | --- | --- | --- |
| DSIRE | `SOURCE_DSIRE` | `scripts/gather-dsire-opportunities.mjs` | `npm run gather:dsire:public` | `npm run gather:dsire:aws` | DSIRE public table endpoint, defaulting to Financial Incentive records | Implemented |
| California Energy Commission | `SOURCE_CA_ENERGY_COMMISSION` | `scripts/gather-cec-opportunities.mjs` | `npm run gather:cec` | `npm run gather:cec:aws` | Official CEC sitemap plus solicitation detail pages | Implemented |
| SDG&E Business Programs | `SOURCE_SDGE_BUSINESS` | `scripts/gather-sdge-opportunities.mjs` | `npm run gather:sdge` | `npm run gather:sdge:aws` | Curated SDG&E business seed pages, program tables, and program tiles | Implemented |

## Planned Importers

| Source | Source key | Recommended adapter | Notes |
| --- | --- | --- | --- |
| Silicon Valley Power | `SOURCE_SILICON_VALLEY_POWER` | `static_section_splitter_adapter` | Good quick win after SDG&E. |
| Southern California Edison | `SOURCE_SCE_BUSINESS` | `third_party_program_index_adapter` plus hub crawler | Requires stronger duplicate and external-domain controls. |
| PG&E Business Programs | `SOURCE_PGE_BUSINESS` | `bounded_hub_pdf_catalog_adapter` | Requires PDF catalog handling. |
| DOE Better Buildings Financing Navigator | `SOURCE_DOE_BB_FINANCING_NAVIGATOR` | `financing_taxonomy_adapter` | Taxonomy enrichment, not a core opportunity crawler. |

## Automation Notes

When this moves to scheduled automation, the weekly job should:

1. Pull the latest repository code from GitHub.
2. Run each source command in a deterministic order.
3. Write validated records to `gbs-opportunity-candidates`.
4. Preserve local run manifests or upload them to durable storage.
5. Report created, updated, unchanged, rejected, and warning counts.
6. Keep records with missing origin metadata out of the database.
7. Let the admin dashboard show raw records for human review before production publishing.
