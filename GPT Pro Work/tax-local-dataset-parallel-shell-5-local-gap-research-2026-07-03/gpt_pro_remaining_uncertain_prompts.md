# GPT Pro Remaining Uncertain Prompts

Date: 2026-07-03

Use official government/tax/assessor/treasurer sources only. Do not use vendor tax databases, blogs, or secondary summaries as final authority.

## 1. Quincy, WA General Non-Utility B&O Confirmation

Shell 5 found official Quincy code evidence for business licensing and public utility business tax, but no affirmative official statement proving whether Quincy has or lacks a separate general non-utility local B&O/gross-receipts tax.

Return only:

- official City of Quincy source URL and owner;
- municipal code, ordinance, finance page, or direct city confirmation;
- whether a separate non-utility local B&O/gross-receipts/occupation tax exists;
- if yes: classifications, rates, thresholds, due dates, filing portal/forms, deductions/credits;
- if no: exact official text or city response proving no separate non-utility local B&O/gross-receipts/business tax beyond ordinary licensing and QMC 3.28 public utility tax;
- whether address alone can route applicability;
- exact short evidence quote.

## 2. Rhode Island Direct Municipal Ordinance Verification

Shell 5 added the official Rhode Island Office of Energy Resources 2025 municipal solar ordinance inventory for all 39 municipalities. Before runtime import, verify the linked municipal code/source rows directly.

Return one row per city/town with:

- municipality;
- direct municipal official source URL and owner;
- ordinance/code/resolution/assessor page section;
- treatment: state formula only, local waiver, exemption, stabilization, contractual exemption, no official source found, or other;
- whether `$5.00/kW AC` tangible formula is adopted/referenced;
- whether `$3.50/kW AC` real-property treatment is referenced;
- application deadline or assessor form requirement;
- whether assessor confirmation is required;
- any conflict with the OER 2025 inventory;
- exact short evidence quote.

If a municipality lacks direct municipal evidence, mark `no_direct_municipal_source_found` rather than inferring.

## 3. Detroit/Wayne RERZ Approved Project Documents

Shell 5 found official general Renaissance Zone evidence, official annual reports, and non-Detroit Renewable Energy Renaissance Zone evidence, but no official Detroit/Wayne project-specific DSIRE 3216 RERZ package.

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

If no official project-specific Detroit/Wayne RERZ document exists, say so explicitly and identify the official owners searched.

## 4. Property Tax Adapter Commercial/Bulk Terms For Tax Bill Data

Shell 5 bounded the county/local adapter records using official sources. Before production import, confirm explicit commercial/bulk terms for parcel, assessment, and tax-bill line-item data.

Return one row per county/local unit for Los Angeles County CA, San Diego County CA, Orange County CA, King County WA, Wayne/Detroit MI, Washtenaw/Ann Arbor MI, Grant County WA, and Snohomish County WA:

- official source URL and owner;
- parcel geometry access: bulk import, public API, lookup-only, manual, or terms unclear;
- assessment/roll access: bulk import, public API, lookup-only, manual, or terms unclear;
- tax bill line-item access: bulk import, public API, lookup-only, manual/tax bill required, or terms unclear;
- license/terms text governing commercial production use;
- rate limits or account requirements;
- refresh frequency;
- recommended adapter classification;
- exact short evidence quote.
