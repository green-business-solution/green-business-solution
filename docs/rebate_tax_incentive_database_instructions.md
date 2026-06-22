# Rebate, Tax Incentive, and Green Opportunity Database Instructions

This file is the durable planning reference for the future rebate, tax incentive, grant, financing, and green-business opportunity ingestion system.

Do not implement crawler code, database migrations, AI agents, cron jobs, extraction code, or production publication behavior until this file has been reviewed and the next implementation step has been explicitly confirmed.

## Repository Inspection Findings

Current project stack as of this planning note:

- Frontend: React + Vite + TypeScript in `src/`.
- Local backend: Node/Express API in `server/index.mjs`.
- Current database access: AWS SDK for DynamoDB, using the local AWS CLI profile `gbs`.
- Current tables documented in `docs/data-model.md`: `gbs-users` and `gbs-client-intake`.
- Current app storage pattern: the browser calls the local Node API through Vite's `/api` proxy; browser code does not receive AWS credentials.
- Existing docs directory: `docs/`.

Not currently visible in the repository:

- No crawler implementation.
- No rebate or incentive database schema.
- No SQL migrations, Prisma, SQLAlchemy, Rails, Django, Laravel, Supabase, or FastAPI stack.
- No job queue.
- No cron or scheduled job configuration.
- No raw document storage layer, such as S3, configured in code.
- No AI model or provider configuration.
- No admin review UI for opportunity publication.

These instructions should guide future design without assuming that the current intake-form DynamoDB tables are the final storage model for this system.

## Purpose

Build an internal database of rebates, tax incentives, grants, loans, financing programs, utility incentives, demand-response programs, EV charging incentives, energy-efficiency programs, and related green-business opportunities.

The long-term plan is a weekly automated server-side process that expands and updates the internal database while preserving auditability, source evidence, and human review for uncertain or high-impact changes.

## Conceptual Architecture

Do not design this as one generic crawler that finds links and turns each link into one opportunity.

Use this architecture instead:

```text
source registry
-> source-specific adapter
-> candidate source documents
-> document cleaning
-> opportunity splitting
-> deterministic extraction
-> AI-assisted classification
-> deduplication and merge logic
-> normalized opportunity records
-> human review for uncertain or high-impact changes
-> publication/update in the internal database
```

The key principle is that one URL is not always one opportunity.

Examples:

- Silicon Valley Power pages may contain many business rebates and grants on one page.
- Utility hub pages may list many programs, partner programs, PDFs, forms, and application links.
- California Energy Commission solicitation detail pages are closer to one opportunity per detail page.
- DSIRE should be treated as an API-backed source if proper access is available.
- DOE Better Buildings Financing Navigator is better treated as a financing taxonomy/reference source than as a core rebate database.

The database and crawler should therefore separate source documents from opportunity records.

## Core Data Model Concepts

### Source

A trusted organization or website.

Examples:

- DSIRE
- PG&E
- Southern California Edison
- San Diego Gas & Electric
- Silicon Valley Power
- DOE Better Buildings
- California Energy Commission

### Source Document

A raw page, file, or structured response discovered from a source.

Examples:

- HTML page
- PDF rebate catalog
- PDF application form
- DOCX
- XLSX
- structured API response
- solicitation detail page
- program hub page
- third-party implementer page

Store raw source documents separately from normalized opportunities.

### Opportunity Section

A specific section, heading, card, table row, accordion panel, PDF section, or structured record that appears to describe a distinct opportunity.

One source document can produce zero, one, or many opportunity sections.

### Canonical Opportunity

The normalized internal record representing one actual opportunity.

Multiple source documents can support the same canonical opportunity. For example, a utility page, a DSIRE record, and a PDF application form may all describe the same program. Those should become one canonical opportunity with multiple evidence documents, not three unrelated database records.

### Eligibility Rules

Structured constraints that determine who can use an opportunity.

Examples:

- geography
- state
- city
- county
- zip code
- utility territory
- business type
- nonprofit eligibility
- government or public-sector eligibility
- agricultural eligibility
- industrial eligibility
- commercial eligibility
- multifamily eligibility
- technology type
- project type
- square footage, only when explicitly stated
- demand threshold in kW
- customer class
- ownership type
- deadline
- program status

### Evidence

Every important extracted field should be traceable to source evidence.

Evidence should include:

- source URL
- canonical URL
- page title
- source name
- document type
- extracted text span or section reference
- retrieval timestamp
- raw content hash
- cleaned content hash
- parser version
- AI model or rule version if AI was used

Do not allow the AI layer to produce facts without source evidence.

## Initial Sources

The initial source list is:

1. DSIRE: <https://www.dsireusa.org/>
2. PG&E Business Programs: <https://www.pge.com/>
3. Southern California Edison, SCE: <https://www.sce.com/>
4. San Diego Gas & Electric, SDG&E: <https://www.sdge.com/>
5. Silicon Valley Power, SVP: <https://www.siliconvalleypower.com/>
6. DOE Better Buildings Financing Navigator: <https://betterbuildingssolutioncenter.energy.gov/financing-navigator>
7. California Energy Commission, CEC: <https://www.energy.ca.gov/>

## Source Registry

The implementation should maintain a global source registry. This should eventually live in code as a single source of truth. For now, this table captures the intended registry.

| Key | Display Name | Base URL | Role | Recommended Adapter | Supplemental/Fallback Adapter | Count Class | Complexity | Priority | Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `SOURCE_DSIRE` | DSIRE | `https://www.dsireusa.org/` | primary national incentives database | `licensed_api_adapter` | `public_dynamic_site_adapter` | very_high | low_with_api_high_without_api | P0_if_api_available | Best source for tax incentives, rebates, grants, loans, geography, sectors, and technologies. |
| `SOURCE_CA_ENERGY_COMMISSION` | California Energy Commission | `https://www.energy.ca.gov/` | state funding, solicitations, loans, grants | `structured_listing_detail_adapter` | none initially | high | low_medium | P0 | Best public structured source after DSIRE. Use solicitation numbers as external IDs. |
| `SOURCE_SDGE_BUSINESS` | San Diego Gas & Electric Business Programs | `https://www.sdge.com/` | utility business rebates, efficiency, DR, EV | `business_program_table_adapter` | `partner_allowlist_adapter` | medium | medium | P1 | Good bang-for-buck. Program pages are relatively structured by business type and sector. |
| `SOURCE_SILICON_VALLEY_POWER` | Silicon Valley Power Business Programs | `https://www.siliconvalleypower.com/` | municipal utility rebates, grants, electrification, EV | `static_section_splitter_adapter` | none initially | low_medium | low | P1 | Easy quick win. Pages often contain many opportunities on one URL. |
| `SOURCE_SCE_BUSINESS` | Southern California Edison Business Programs | `https://www.sce.com/` | utility business rebates, third-party efficiency, EV, OBF, DR | `third_party_program_index_adapter` | `hub_crawler_adapter` | medium_high | high | P2 | Valuable but complex due to third-party implementers and statewide program duplication. |
| `SOURCE_PGE_BUSINESS` | PG&E Business Programs | `https://www.pge.com/` | utility business rebates, financing, DR, EV, PDF catalogs | `bounded_hub_pdf_catalog_adapter` | none initially | medium_high | high_very_high | P2 | Valuable but sprawling. Requires PDF handling and strong deduplication. |
| `SOURCE_DOE_BB_FINANCING_NAVIGATOR` | DOE Better Buildings Financing Navigator | `https://betterbuildingssolutioncenter.energy.gov/financing-navigator` | financing taxonomy reference | `financing_taxonomy_adapter` | none initially | low_for_direct_opportunities | low_medium_as_taxonomy_medium_high_as_interactive_crawler | P3 | Use for financing classification enrichment, not as a core weekly opportunity source. |

## Bang-for-Buck Ranking

### 1. `SOURCE_DSIRE`

Best value if proper API access is available.

Role: primary national incentives database.

Expected yield: very high nationally. Likely thousands of incentives and policies nationally, with a California/business/rebate/tax subset likely in the dozens to low hundreds after filtering.

Complexity:

- Low if using licensed or official API access.
- High if scraping the public website.

Bang-for-buck:

- 10/10 with API access.
- Low without API access.

Implementation approach:

- Use a licensed API adapter if available.
- Store DSIRE program IDs.
- Use DSIRE as the best source for tax incentives, geographic coverage, eligible sectors, technologies, and zip-code association if the API provides that data.
- Avoid making DSIRE public-site scraping the core engineering path unless there is no alternative.

### 2. `SOURCE_CA_ENERGY_COMMISSION`

Best non-DSIRE public structured source.

Role: state grants, loans, solicitations, public-sector energy financing, clean transportation funding, energy-efficiency programs, and funding opportunities.

Expected yield: high. CEC solicitation listings appear structured and paginated. Not every record will be relevant to business rebates, but many are relevant funding opportunities.

Complexity: low to medium.

Bang-for-buck: 8/10.

Implementation approach:

- Use a structured listing/detail crawler.
- Crawl funding opportunity listing pages, solicitation listing pages, detail pages, and attached files.
- Use solicitation numbers as stable external IDs where available.
- Implement CEC early.

### 3. `SOURCE_SDGE_BUSINESS`

Good utility source with manageable complexity.

Role: business energy-efficiency programs, rebates, no-cost audits, demand-response incentives, EV charging programs, commercial/industrial/agricultural programs, and third-party implementer programs.

Expected yield: medium. Roughly 20 to 35 program-level opportunities from initial inspection.

Complexity: medium.

Bang-for-buck: 7/10.

Implementation approach:

- Use a business program table/card adapter.
- Extract visible program names and descriptions.
- Follow named third-party implementer links only through a curated allowlist.

### 4. `SOURCE_SILICON_VALLEY_POWER`

Fastest utility quick win, but geographically narrow.

Role: municipal utility business rebates, grants, electrification incentives, EV charging rebates, commercial solar, data center rebates, nonprofit grants, food service rebates, and load-development credits.

Expected yield: low to medium. Roughly 15 to 25 program-level opportunities from initial inspection.

Complexity: low.

Bang-for-buck: 7/10 because it is easy to implement, even though total coverage is smaller.

Implementation approach:

- Use a static section-splitter adapter.
- Do not assume one URL equals one opportunity.
- Split pages by headings and sections.

### 5. `SOURCE_SCE_BUSINESS`

Valuable but more complex.

Role: business energy-efficiency programs, third-party implementer programs, on-bill financing, demand response, EV charging programs, Charge Ready, transportation electrification advisory services, and statewide utility programs.

Expected yield: medium-high. Roughly 25 to 45 program-level opportunities, more if partner measure catalogs are expanded.

Complexity: high.

Bang-for-buck: 6.5/10.

Implementation approach:

- Use a hub-card crawler plus a third-party program index parser.
- Avoid crawling uncontrolled external sites.
- Use a curated external-domain allowlist and strong duplicate detection.

### 6. `SOURCE_PGE_BUSINESS`

Valuable but sprawling.

Role: business rebates, rebate catalog PDFs, on-bill financing, demand-response programs, self-generation incentives, microgrid programs, EV fleet programs, sector-specific business programs, and partner programs.

Expected yield: medium-high. Roughly 25 to 50 program-level opportunities. Higher if individual measure-level rebate lines from PDFs are treated as separate opportunities.

Complexity: high to very high.

Bang-for-buck: 6/10.

Implementation approach:

- Use a bounded hub crawler with PDF catalog support.
- Expect broad pages, PDFs, third-party links, and statewide programs that may duplicate DSIRE, CEC, SCE, or SDG&E records.

### 7. `SOURCE_DOE_BB_FINANCING_NAVIGATOR`

Low value as a direct opportunity source; useful as a taxonomy/reference source.

Role: financing education and taxonomy. It helps classify financing mechanisms such as C-PACE, on-bill financing, on-bill repayment, leases, loans, ESPC, and other financing structures.

Expected yield: low for direct rebate/tax-incentive records.

Complexity: medium if automating the interactive navigator. Low to medium if used as static taxonomy.

Bang-for-buck: 2/10 for direct opportunity extraction.

Implementation approach:

- Do not make this a weekly core opportunity crawler.
- Use it to enrich classification and standardize financing terminology.

## Recommended Build Order

If DSIRE API access is available:

1. DSIRE
2. California Energy Commission
3. SDG&E
4. Silicon Valley Power
5. SCE
6. PG&E
7. DOE Better Buildings as taxonomy enrichment

If DSIRE API access is not available:

1. California Energy Commission
2. Silicon Valley Power
3. SDG&E
4. SCE
5. PG&E
6. DSIRE public-site fallback only if feasible
7. DOE Better Buildings as taxonomy enrichment

Proof-of-concept recommendation:

1. CEC, to validate structured listing/detail ingestion.
2. SVP, to validate static-page section splitting where one page contains many opportunities.
3. SDG&E, to validate utility program pages and partner-program handling.

## Adapter Types

### `licensed_api_adapter`

Used for DSIRE if official API access is available.

Responsibilities:

- Pull records from the official API.
- Use updated-since or date-range endpoints if available.
- Store external program IDs.
- Store raw API responses.
- Normalize incentive type, eligible sector, geography, technology, and amounts.
- Avoid public website scraping where API access is available.

### `public_dynamic_site_adapter`

Fallback for sites that require dynamic rendering.

Responsibilities:

- Use only if necessary.
- Respect robots.txt and rate limits.
- Prefer official APIs, feeds, sitemaps, and structured pages first.
- Consider headless browser rendering only when static HTTP fetch is insufficient.

### `structured_listing_detail_adapter`

Used for CEC-style listing pages.

Responsibilities:

- Crawl listing pages.
- Extract each row/card as a candidate.
- Follow detail links.
- Store stable external IDs such as solicitation numbers.
- Extract release dates, deadlines, status, type, program, division, application method, and attachments.
- Revisit active/open records weekly.
- Revisit closed records less often.

### `business_program_table_adapter`

Used for SDG&E-style grouped business program pages.

Responsibilities:

- Extract program tables, cards, and sections.
- Split grouped business categories into distinct opportunities.
- Preserve category labels such as commercial, small business, industrial, agriculture, public sector, statewide, EV, or demand response.
- Follow named program links.
- Follow third-party links only if they are on a curated allowlist.

### `partner_allowlist_adapter`

Used for utility sites that link to third-party implementers.

Responsibilities:

- Maintain allowed external domains.
- Track source utility and parent page.
- Avoid crawling the entire partner website.
- Only extract pages directly related to named programs.
- Mark implementer as administrator or delivery partner, while preserving the utility as source/territory when applicable.

### `static_section_splitter_adapter`

Used for SVP-style static pages.

Responsibilities:

- Crawl curated seed pages.
- Split content by headings, cards, links, and form/application references.
- Treat each section as a candidate opportunity.
- Detect statuses such as active, fully subscribed, closed, waitlist, or upcoming.
- Extract amounts, caps, eligibility, and application instructions from section text.

### `third_party_program_index_adapter`

Used for SCE-style pages listing many third-party programs.

Responsibilities:

- Extract each named third-party program.
- Preserve program name, implementer, utility territory, customer segment, eligible technologies, and links.
- Deduplicate against statewide programs listed on other utilities.
- Follow only approved program links.

### `hub_crawler_adapter`

Used for utility hubs.

Responsibilities:

- Start from curated seed pages.
- Use sitemap and internal links where helpful.
- Limit depth.
- Filter aggressively for rebate/incentive/funding terms.
- Avoid account, billing, outage, careers, search, regulatory archive, and unrelated pages.
- Extract PDFs and application forms when linked from relevant pages.

### `bounded_hub_pdf_catalog_adapter`

Used for PG&E-style hubs and rebate catalogs.

Responsibilities:

- Crawl bounded hub pages.
- Download and parse linked PDF catalogs, application forms, and fact sheets.
- Decide whether to create program-level opportunities or measure-level opportunities.
- Store PDF text, page numbers, and table evidence.
- Version parsed catalog results by file hash.

### `financing_taxonomy_adapter`

Used for DOE Better Buildings.

Responsibilities:

- Extract financing mechanism definitions and taxonomy.
- Do not treat financing education pages as direct rebate opportunities unless they clearly point to a specific active program.
- Use the taxonomy to enrich internal classifications.

## Discovery and Crawl Rules

Prefer data sources in this order:

1. Official API
2. Official bulk export
3. RSS/feed/updated-since feed
4. Sitemap
5. Structured listing page
6. Curated seed pages
7. Bounded internal crawl
8. Headless/browser rendering
9. Search-engine discovery only as a fallback

Every source should define:

- base URL
- allowed domains
- disallowed domains or paths
- seed URLs
- adapter type
- crawl depth
- rate limit
- user-agent string
- file types to include
- file types to ignore
- parser version
- schedule
- priority
- owner/reviewer if applicable

## Canonicalization Rules

Normalize discovered links before storing or comparing:

- Strip tracking parameters such as `utm_source`, `utm_medium`, `utm_campaign`, `gclid`, and `fbclid`.
- Resolve redirects.
- Normalize trailing slashes.
- Lowercase hostnames.
- Preserve meaningful query parameters only if they affect content.
- Remove page anchors unless they point to meaningful section IDs.
- Store original URL and canonical URL.
- Store final redirected URL.
- Store fetch timestamp.
- Store HTTP status and content type.

## Deduplication Model

Do not deduplicate only by URL.

Use four layers:

1. Canonical URL match: same normalized source URL.
2. External ID match: DSIRE program ID, CEC solicitation number, utility program slug, PDF form ID, application ID, named program ID, or equivalent.
3. Content hash match: if cleaned content is unchanged, skip expensive extraction; if cleaned content changed, reprocess even if URL is already known.
4. Opportunity fingerprint match: normalized title plus administrator plus utility/geography plus incentive type plus technology/measure category.

Possible document/opportunity states:

- `new_document_new_opportunity`
- `new_document_existing_opportunity`
- `existing_document_changed`
- `existing_document_unchanged`
- `existing_document_removed_from_navigation`
- `existing_opportunity_status_changed`
- `closed_or_removed_candidate`
- `possible_duplicate`
- `needs_human_review`

A removed link should not automatically close an opportunity. It should trigger review or require corroborating evidence.

## Suggested Database Schema

This schema is conceptual and should guide future migrations. It is not implemented yet.

### `sources`

Purpose: one row per source.

Suggested fields:

- `id`
- `key`
- `display_name`
- `base_url`
- `source_role`
- `active`
- `created_at`
- `updated_at`

### `source_adapters`

Purpose: configuration for how each source is crawled or ingested.

Suggested fields:

- `id`
- `source_id`
- `adapter_type`
- `seed_urls`
- `allowed_domains`
- `disallowed_paths`
- `max_depth`
- `rate_limit`
- `include_file_types`
- `exclude_file_types`
- `schedule`
- `parser_version`
- `active`
- `created_at`
- `updated_at`

### `crawl_runs`

Purpose: track each run.

Suggested fields:

- `id`
- `source_id`
- `adapter_id`
- `run_type`, such as `full`, `delta`, `retry`, or `manual`
- `status`, such as `started`, `completed`, `failed`, or `partial`
- `started_at`
- `completed_at`
- `documents_discovered_count`
- `documents_fetched_count`
- `documents_changed_count`
- `opportunities_created_count`
- `opportunities_updated_count`
- `opportunities_flagged_count`
- `error_summary`
- `logs_location`

### `source_documents`

Purpose: store raw fetched documents and metadata.

Suggested fields:

- `id`
- `source_id`
- `crawl_run_id`
- `original_url`
- `canonical_url`
- `final_url`
- `title`
- `content_type`
- `http_status`
- `raw_storage_path`
- `raw_text_storage_path`
- `cleaned_text_storage_path`
- `raw_hash`
- `cleaned_hash`
- `first_seen_at`
- `last_seen_at`
- `last_changed_at`
- `parser_version`
- `extraction_status`

### `document_links`

Purpose: store links discovered from source documents.

Suggested fields:

- `id`
- `source_document_id`
- `href_original`
- `href_canonical`
- `anchor_text`
- `link_context`
- `internal_external`
- `link_type`, such as `html`, `pdf`, `docx`, `xlsx`, `application`, `portal`, or `email`
- `discovered_at`

### `opportunity_sections`

Purpose: store candidate sections extracted from documents before canonical merge.

Suggested fields:

- `id`
- `source_document_id`
- `heading`
- `section_text`
- `section_hash`
- `section_order`
- `evidence_locator`, such as CSS path, heading path, PDF page number, or table row
- `candidate_status`
- `ai_relevance_score`
- `created_at`

### `opportunities`

Purpose: canonical opportunity records.

Suggested fields:

- `id`
- `canonical_title`
- `source_primary_id`
- `administrator`
- `delivery_partner`
- `program_type`
- `status`
- `summary`
- `open_date`
- `deadline_date`
- `last_verified_at`
- `confidence_score`
- `review_status`
- `created_at`
- `updated_at`

### `opportunity_documents`

Purpose: many-to-many bridge between canonical opportunities and supporting documents.

Suggested fields:

- `id`
- `opportunity_id`
- `source_document_id`
- `relationship_type`, such as `primary_page`, `application_form`, `rebate_catalog`, `program_rules`, or `supporting_reference`
- `evidence_summary`
- `created_at`

### `benefit_terms`

Purpose: store incentive amount and structure.

Suggested fields:

- `id`
- `opportunity_id`
- `incentive_amount_text`
- `amount_type`, such as `flat`, `per_unit`, `percentage`, `tax_credit_percentage`, `loan`, `grant`, `custom`, or `performance_based`
- `amount_min`
- `amount_max`
- `cap_amount`
- `rate`
- `unit`, such as `kW`, `kWh`, `therm`, `fixture`, `charger`, `project`, `square_foot`, or `percentage`
- `loan_interest_rate`
- `loan_term_months`
- `repayment_method`
- `requires_preapproval`
- `notes`
- `evidence_locator`

### `eligibility_rules`

Purpose: store structured eligibility constraints.

Suggested fields:

- `id`
- `opportunity_id`
- `geography_type`
- `state`
- `county`
- `city`
- `zip_codes`
- `utility_company`
- `business_classifications`
- `eligible_sectors`
- `excluded_sectors`
- `customer_class`
- `building_type`
- `ownership_type`
- `square_footage_min`
- `square_footage_max`
- `demand_kw_min`
- `demand_kw_max`
- `technology_requirements`
- `project_requirements`
- `income_or_disadvantaged_community_requirements`
- `notes`
- `evidence_locator`

### `measures_technologies`

Purpose: store measures and technology categories.

Suggested fields:

- `id`
- `opportunity_id`
- `category`
- `subcategory`
- `technology_name`
- `measure_name`
- `equipment_type`
- `fuel_type`
- `normalized_tags`
- `evidence_locator`

### `application_steps`

Purpose: store application instructions.

Suggested fields:

- `id`
- `opportunity_id`
- `application_url`
- `application_portal_url`
- `application_form_document_id`
- `contact_name`
- `contact_email`
- `contact_phone`
- `steps_text`
- `required_documents`
- `preapproval_required`
- `inspection_required`
- `notes`
- `evidence_locator`

### `classifications`

Purpose: store deterministic and AI-produced classifications.

Suggested fields:

- `id`
- `opportunity_id`
- `classification_type`
- `classification_value`
- `confidence`
- `method`, such as `deterministic_rule`, `api_field`, `ai_model`, or `human_review`
- `model_name`
- `model_version`
- `rule_version`
- `evidence_locator`
- `created_at`

### `audit_events`

Purpose: track changes over time.

Suggested fields:

- `id`
- `entity_type`
- `entity_id`
- `event_type`
- `old_value`
- `new_value`
- `reason`
- `source_document_id`
- `actor_type`, such as `system`, `ai`, or `human`
- `actor_id`
- `created_at`

## Extraction Approach

Use deterministic extraction first.

Good deterministic targets:

- dates
- solicitation numbers
- program titles
- status labels
- dollar amounts
- percentages
- caps
- application URLs
- PDF links
- contact information
- utility names
- known business category labels

Use AI only after deterministic extraction.

Good AI tasks:

- Determine whether a page or section is a real opportunity.
- Split dense pages into opportunity sections.
- Classify business type.
- Summarize eligibility.
- Extract ambiguous program requirements.
- Suggest duplicate matches.
- Flag contradictions.
- Normalize opportunity titles.
- Identify whether a program appears active, closed, fully subscribed, waitlisted, or unknown, with evidence.

Bad AI tasks:

- Invent missing eligibility rules.
- Guess zip-code coverage without territory data.
- Guess square footage requirements.
- Decide final duplicate merges without evidence.
- Publish high-impact changes without review.
- Treat generic financing education as an active incentive.

## Classification Rules

### Zip Code

Prefer deterministic source data, utility territory maps, DSIRE API fields if available, or a service-territory-to-zip resolver.

Do not rely solely on AI for zip-code eligibility.

Store uncertainty.

### Utility Company

Use deterministic mapping when possible:

- PG&E source pages generally map to PG&E territory unless a statewide program is clearly indicated.
- SCE source pages generally map to SCE territory unless statewide.
- SDG&E source pages generally map to SDG&E territory unless statewide.
- SVP pages map to Silicon Valley Power and Santa Clara where applicable.
- CEC programs may be statewide, public-sector-specific, school-specific, project-specific, or solicitation-specific.
- DSIRE may contain its own geography and utility fields if using the API.

### Business Classification

Allowed classifications should include at least:

- `agricultural`
- `nonprofit`
- `industrial`
- `commercial`
- `government`
- `public_sector`
- `education`
- `healthcare`
- `multifamily`
- `small_business`
- `large_business`
- `data_center`
- `food_service`
- `lodging_hospitality`
- `retail`
- `mixed`
- `unknown`

### Square Footage

Do not force square-footage classification.

Many energy programs use:

- demand thresholds
- utility territory
- customer class
- sector
- technology
- equipment type
- project type
- public/nonprofit status

Store square footage only when explicitly stated. Keep kW demand thresholds separate from square footage.

### Program Type

Use a controlled vocabulary:

- `rebate`
- `tax_credit`
- `tax_deduction`
- `grant`
- `loan`
- `financing`
- `on_bill_financing`
- `demand_response`
- `technical_assistance`
- `solicitation`
- `voucher`
- `rate_discount`
- `performance_incentive`
- `renewable_energy_credit`
- `unknown`

### Status

Use a controlled vocabulary:

- `active`
- `open`
- `closed`
- `upcoming`
- `waitlist`
- `fully_subscribed`
- `suspended`
- `expired`
- `unknown`

### Measure and Technology Categories

Use normalized tags:

- `HVAC`
- `heat_pump`
- `lighting`
- `refrigeration`
- `food_service_equipment`
- `EV_charging`
- `fleet_electrification`
- `solar_PV`
- `battery_storage`
- `microgrid`
- `energy_storage`
- `building_controls`
- `energy_management_system`
- `water_heating`
- `process_load`
- `industrial_efficiency`
- `agriculture`
- `data_center`
- `building_envelope`
- `custom_efficiency`
- `demand_response`
- `renewable_energy`
- `clean_transportation`

## Weekly Cron Workflow

The weekly process should roughly:

1. Start a `crawl_run` record.
2. Load active sources from the source registry.
3. For each source, run its configured adapter.
4. Discover candidate source documents.
5. Canonicalize URLs.
6. Check existing `source_documents` by canonical URL and external ID.
7. Fetch documents that are new or scheduled for refresh.
8. Hash raw and cleaned content.
9. Skip unchanged documents except to update `last_seen_at`.
10. Reprocess changed documents.
11. Clean HTML, PDF, and other document content.
12. Split documents into opportunity sections.
13. Run deterministic field extraction.
14. Run AI extraction/classification only where useful.
15. Deduplicate and merge against existing opportunities.
16. Create or update opportunity records.
17. Flag uncertain, conflicting, closed, or high-impact changes for human review.
18. Complete the `crawl_run` record with counts and errors.

## Backfill Versus Delta Behavior

### Initial Backfill

- Run each source in full discovery mode.
- Store all candidate documents.
- Extract all opportunities.
- Build fingerprints.
- Review duplicates and taxonomy.

### Weekly Delta

- DSIRE should use updated-since/date-range API behavior if available.
- CEC should recheck active/current solicitations and recently changed listings.
- Utility sites should recheck seed pages, known opportunity URLs, linked PDFs, and relevant partner links.
- Static pages should be hash-checked.
- Closed or removed programs should not be deleted automatically.

## Opportunity Review Workflow

Auto-publish only when confidence is high and no major ambiguity exists.

Require review for:

- new high-value opportunities
- changed incentive amounts
- changed deadlines
- changed eligibility
- status changed to closed, expired, waitlist, or fully subscribed
- conflicting information across sources
- possible duplicates
- low-confidence AI classifications
- programs with missing application links
- tax incentives with ambiguous jurisdiction
- opportunities that affect many zip codes or many business types

Store review status:

- `draft`
- `auto_published`
- `needs_review`
- `approved`
- `rejected`
- `archived`
- `superseded`

## Compliance and Operational Requirements

The implementation should:

- Respect robots.txt.
- Use a descriptive user-agent string.
- Rate-limit requests per domain.
- Avoid crawling account, billing, login, search, outage, careers, and unrelated pages.
- Store request logs.
- Store raw artifacts for auditability.
- Store hashes to avoid unnecessary repeated extraction.
- Preserve source evidence.
- Avoid uncontrolled crawling of external partner domains.
- Use a curated allowlist for partner domains.
- Be able to run from cron once per week.
- Be idempotent.
- Be safe to rerun.
- Produce a clear crawl report.

## First-Version Guidance

Do not design the first version around full automation with no review.

The first version should optimize for:

- reliable discovery
- clean source storage
- strong deduplication
- auditable evidence
- explainable classifications
- human review for uncertain records

Once extraction results are consistently accurate, more records can be auto-published.

## Current Product Decisions

These decisions were added after the initial architecture note:

- DSIRE API access is not required for the first exploration pass. If the project has permission to access relevant DSIRE data, an adapter may use normal HTTP requests to fetch HTML and clean it when the public pages return usable static content. Still prefer official APIs, structured feeds, or bulk exports if they are available because they are usually more stable, complete, and easier to audit than cleaned HTML.
- Data format handling can be source-specific. Some sources will be HTML pages, some will be PDFs, and some may expose structured listings or files. Make the fetch/clean/parser strategy a case-by-case adapter decision.
- Admin review should extend the existing admin page. All admin workflows should appear as tabs in the admin interface rather than as separate admin apps.
- The current admin page includes a `Data` tab for inspecting the existing DynamoDB tables so humans can validate records while development is underway.
- Classification for zip code, utility provider, business classification, and square footage is deferred. The current likely approach is to use OpenAI models through an API key after deterministic extraction has captured source evidence.
- Scheduled jobs should likely use AWS EventBridge and a compute target such as Lambda, but this should be decided after the crawler, document fetching, extraction, and review tools exist.
- Utility rebate catalogs may eventually need both program-level and measure-level records. The first implementation should preserve enough source document and section evidence to support either choice.

## Planned Actions

Do not implement these until the user explicitly confirms the next implementation step:

- Build source-specific adapters for the first proof-of-concept sources, likely CEC and Silicon Valley Power.
- Decide whether opportunity storage should use DynamoDB, a relational database, or a hybrid design after the first schema and query needs are clearer.
- Decide where scheduled jobs should run after the ingestion tools exist. Compare EventBridge plus Lambda, EventBridge plus ECS/Fargate, GitHub Actions, and any long-running server option.
- Add source document storage, likely S3, once raw HTML/PDF retention is needed.
- Add an admin review workflow as additional tabs on the existing admin page.
- Add OpenAI-based classification for zip code, utility provider, business classification, and square footage after deterministic evidence extraction is working.
- Decide whether PG&E/SCE/SDG&E/SVP catalogs should publish program-level records, measure-level records, or both.

## Open Implementation Decisions

The following decisions materially affect implementation:

- Whether the final storage model should remain DynamoDB-only or use a relational database for normalized opportunity tables.
- Whether raw source documents should be stored in S3.
- Where scheduled jobs should run, such as local cron, GitHub Actions, AWS EventBridge plus Lambda, ECS scheduled tasks, or another server.
- Whether a job queue is needed for fetch/extract/classify/review stages.
- Which OpenAI model and budget should be used for classification and extraction.
- Whether utility rebate catalogs should produce program-level opportunities, measure-level opportunities, or both.
- What partner domains should be allowed for utility third-party implementers.
- What service-territory-to-zip dataset or API should be used.
