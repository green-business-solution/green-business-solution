# GPT Pro Remaining Uncertain Prompts

Date: 2026-07-03

Use official government/tax/assessor/treasurer sources only. Do not use vendor tax databases, blogs, or summaries as final authority.

## 1. Quincy, WA Local Business Tax Status

Find exact official City of Quincy evidence for whether Quincy, WA imposes a local B&O, gross-receipts, occupation, or local business-license tax for 2026.

Return only these fields:

- official source URL and owner;
- municipal code section or finance page title;
- whether local B&O/gross-receipts tax exists;
- if yes: classifications, rates, thresholds, due dates, filing portal/forms, deductions/credits;
- if no: official source text proving no city local B&O/gross-receipts/business tax beyond ordinary licensing;
- required user inputs for calculation;
- whether address alone can flag applicability;
- confidence and exact short evidence quote.

## 2. Rhode Island Municipal Renewable Tax Table

Build a municipality-by-municipality official-source table for Rhode Island renewable energy property/tangible tax treatment relevant to `SOURCE_DSIRE:dsire_program_id:22798`.

Return one row per city/town with:

- municipality;
- official source URL and owner;
- ordinance/code/resolution/assessor page section;
- treatment: state formula only, local waiver, exemption, contractual exemption, no official source found, or other;
- whether $5.00/kW AC tangible formula is adopted/referenced;
- whether $3.50/kW AC real-property treatment is referenced;
- application deadline or assessor form requirement;
- whether assessor confirmation is required;
- unresolved facts;
- exact short evidence quote.

If a municipality lacks official evidence, mark `no_official_source_found` rather than inferring.

## 3. Detroit/Wayne RERZ Approved Project Documents

For `SOURCE_DSIRE:dsire_program_id:3216`, find official project-specific documents for Detroit/Wayne sample relevance, including Factory ZERO only if official RERZ evidence exists.

Return only source-backed fields:

- company/project name;
- official source URL and owner;
- MSF/SAB/local-unit approval document;
- local-unit resolution/certificate;
- approved zone legal description, map, parcel list, or street locator;
- approved term, final year, and current phaseout status;
- eligible tax lines included;
- taxes excluded;
- required taxpayer documents;
- whether public data alone can calculate a sample property;
- exact missing documents/facts blocking calculation.

If no official project-specific Detroit/Wayne RERZ document exists, say so explicitly and identify the searched official owners.

## 4. Pasadena Current Numeric Business License Tax Schedule

Extract current official Pasadena business license tax numeric rates for sample-relevant classes.

Return:

- source URL and owner;
- fiscal year/effective date;
- classes: retail, restaurant/food, warehouse/distribution, hotel/lodging, office/professional, manufacturing, nonprofit, commercial property owner/rental, cannabis if applicable;
- flat amount;
- per-employee amount;
- gross-receipts, unit, room, square-foot, or BID formula if applicable;
- SB-1186/state accessibility fee treatment;
- renewal/due date;
- late fee/penalty if formulaic;
- required user inputs;
- exact short evidence quote per class.

## 5. Anaheim Non-Services Business License Tax Classes

Extract current official Anaheim Title 3 business license tax formulas beyond services.

Return:

- source URL and owner;
- code section;
- classes: retail, restaurant/food, warehouse/distribution/storage, hotel/lodging, office/professional, manufacturing, contractor, regulated permits if sample-relevant;
- flat amount;
- per-employee amount;
- gross-receipts, unit, room, square-foot, or other basis;
- processing/SB-1186/state accessibility fee treatment;
- required user inputs;
- exact short evidence quote per class.

## 6. Burbank FY 2025-26 Article VII Numeric Rate Rows

Extract official City of Burbank FY 2025-26 Article VII Schedule of Business Taxes into machine-readable rows.

Return:

- source URL and owner;
- page/section;
- class/category;
- formula basis: flat, employee, gross receipts, business volume, unit, room, square footage, per job, other;
- numeric rate;
- minimum/maximum;
- state accessibility fee treatment;
- registration/zoning review fees if mandatory;
- required user inputs;
- exact short evidence quote per row.

## 7. Property Tax Adapter Commercial/Bulk Terms For Tax Bill Data

For Los Angeles County CA, San Diego County CA, Orange County CA, King County WA, Wayne/Detroit MI, Washtenaw/Ann Arbor MI, Grant County WA, and Snohomish County WA, confirm official terms for production use of parcel, assessment, and tax-bill line-item data.

Return one row per county/local unit with:

- official source URL and owner;
- parcel geometry access: bulk import, public API, lookup-only, manual, or terms unclear;
- assessment/roll access: bulk import, public API, lookup-only, manual, or terms unclear;
- tax bill line-item access: bulk import, public API, lookup-only, manual/tax bill required, or terms unclear;
- license/terms text governing commercial production use;
- rate limits or account requirements;
- refresh frequency;
- recommended adapter classification;
- exact short evidence quote.
