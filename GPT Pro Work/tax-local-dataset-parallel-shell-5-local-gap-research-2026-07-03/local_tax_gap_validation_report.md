# Local Tax Gap Validation Report

Date: 2026-07-03

This shell completed targeted local tax gap research only. It does not claim nationwide local tax completion and does not edit runtime tax data.

## Deterministic Enough After User Inputs

- Everett, WA local B&O: official city sources prove local B&O exists. Address can route applicability, but estimates require business class, Everett gross receipts, deductions, credits, and FileLocal/account facts. Keep out of default totals until inputs are present.
- Burbank, CA business tax: official city schedule rows now support sample-relevant numeric formulas for manufacturing/wholesale/retail, services, professions, unclassified, contractors, laundry, rentals, hotels/motels, commercial square footage, and vending. Address can route, but calculation requires class and tax-base inputs.
- Pasadena, CA business license tax: official FY2026 schedule rows now support sample-relevant numeric formulas for general/service/take-out/professional, delivery, contractor, and hotel/accommodation classes. Address can route, but calculation requires class and tax-base inputs.
- Anaheim, CA business license tax: official Title 3 rows now support sample-relevant numeric formulas for gross-receipts classes, professional, services, contractors, and nonresidential rental/warehouse/storage. Address can route, but calculation requires class and tax-base inputs.
- Vernon, CA business license tax: official code confirms employee-bracket, warehousing square-footage, and special waste formulas. Special parcel tax remains tax-bill/current-city-rate workflow. Include only after class and activity inputs are supplied.
- San Diego, CA business tax certificate: official city sources support base certificate calculation from employee count plus SB-1186 and minimum wage enforcement fees. Suppress total until employee count, filing date, and add-on exclusions/confirmations are supplied.
- Quincy, WA public utility business tax: official code supports public-utility business tax rates and a general business-license workflow. General non-utility local B&O/gross-receipts status remains not affirmatively resolved either way.

## Workflow Or Routing Records

- Rhode Island DSIRE 22798: state formulas are source-backed, but user-facing savings require AC kW, classification, municipal waiver/exemption status, real/tangible applicability, assessor confirmation, and counterfactual ordinary tax.
- Michigan DSIRE 3216 / Detroit-Wayne RERZ: official sources support a document/accountant workflow only. Calculation requires approved zone/company documents, local-unit approvals, parcel inclusion, phaseout year, and eligible tax-line documents.
- Rhode Island municipal renewable tax table: the official 2025 Rhode Island Office of Energy Resources municipal solar ordinance inventory gives an all-39 municipality routing inventory with adopted-tax-ordinance evidence/statuses. It is still not enough for project-level tax treatment without assessor/tax-bill confirmation.
- All property tax adapter terms: counties can generally route parcel lookup from official GIS/open data or official lookup tools, but user-facing property-tax calculations need parcel/account/tax-bill line items.

## Still Unresolved

- Quincy, WA non-utility local B&O/gross-receipts status: bounded but unresolved. Official code proves business licensing and public utility business tax; no official source found here affirmatively states that Quincy has or lacks a separate general non-utility local B&O/gross-receipts tax. Do not infer either way.
- Rhode Island municipality-by-municipality renewable waiver/adoption table: bounded by the official OER 2025 inventory. Runtime import still needs direct linked municipal ordinance verification for each row and assessor confirmation for project-specific savings.
- Michigan Detroit/Wayne RERZ project-specific evidence: unresolved. No official source found here ties a sample Detroit/Wayne property or Factory ZERO-like project to an approved DSIRE 3216 Renewable Energy Renaissance Zone calculation package with eligible tax lines.
- Burbank/Pasadena/Anaheim uncommon classes: sample-relevant numeric rows are extracted, but any uncommon regulated classes not captured in the records should stay workflow-only until separately normalized.
- Property tax commercial production terms remain partly unresolved where official sources provide lookup or open GIS but not explicit commercial bulk reuse terms for tax-bill/account line items.

## Suppressed From User-Facing Totals By Default

Suppress every record in `local_tax_gap_research_records.json` by default. The safest first product behavior is to show routing and missing-input workflows, then include only adapter-calculated amounts when required user/accountant/assessor/tax-bill inputs are present.

Exact suppression reasons:

- RI DSIRE 22798: savings require assessor-confirmed actual treatment and counterfactual tax.
- MI DSIRE 3216: eligibility and eligible tax lines require approved program documents and accountant/assessor review.
- Everett/Burbank/Pasadena/Anaheim/Vernon/San Diego: address alone cannot determine classification, tax base, employees, deductions, special districts, or account-specific add-ons.
- Quincy: public utility tax is proven, but general non-utility local B&O/gross-receipts status is not affirmatively proven either way.
- County property tax adapters: parcel geometry or lookup access is not enough for line-item property-tax savings.

## Validation

JSON parse validation should be run with:

```bash
node -e "JSON.parse(require('fs').readFileSync('GPT Pro Work/tax-local-dataset-parallel-shell-5-local-gap-research-2026-07-03/local_tax_gap_research_records.json','utf8')); console.log('ok')"
```

Latest run result: `JSON parse ok`; 17 records.
