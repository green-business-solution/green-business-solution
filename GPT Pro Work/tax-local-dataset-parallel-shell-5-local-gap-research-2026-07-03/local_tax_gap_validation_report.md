# Local Tax Gap Validation Report

Date: 2026-07-03

This shell completed targeted local tax gap research only. It does not claim nationwide local tax completion and does not edit runtime tax data.

## Deterministic Enough After User Inputs

- Everett, WA local B&O: official city sources prove local B&O exists. Address can route applicability, but estimates require business class, Everett gross receipts, deductions, credits, and FileLocal/account facts. Keep out of default totals until inputs are present.
- Burbank, CA business tax: official city sources prove the workflow and formula bases. Address can route, but calculation requires business category and employee/square-foot/room/gross-receipts inputs. Numeric class table still needs extraction from the adopted fee schedule.
- Anaheim, CA services license tax: official code confirms services formula of `$68 + $10 * average employees`. Other classes need code normalization. Include only if class is confirmed as services and employee count is supplied.
- Vernon, CA business license tax: official code confirms employee-bracket, warehousing square-footage, and special waste formulas. Special parcel tax remains tax-bill/current-city-rate workflow. Include only after class and activity inputs are supplied.
- San Diego, CA business tax certificate: official city sources support base certificate calculation from employee count plus SB-1186 and minimum wage enforcement fees. Suppress total until employee count, filing date, and add-on exclusions/confirmations are supplied.

## Workflow Or Routing Records

- Rhode Island DSIRE 22798: state formulas are source-backed, but user-facing savings require AC kW, classification, municipal waiver/exemption status, real/tangible applicability, assessor confirmation, and counterfactual ordinary tax.
- Michigan DSIRE 3216 / Detroit-Wayne RERZ: official sources support a document/accountant workflow only. Calculation requires approved zone/company documents, local-unit approvals, parcel inclusion, phaseout year, and eligible tax-line documents.
- Pasadena, CA business license tax: official city page proves annual license tax and most formulas use flat plus employee count, but the public page directs users to staff for class-specific rates. Keep as workflow until complete official rate schedule is normalized.
- All property tax adapter terms: counties can generally route parcel lookup from official GIS/open data or official lookup tools, but user-facing property-tax calculations need parcel/account/tax-bill line items.

## Still Unresolved

- Quincy, WA local B&O/business tax status: unresolved. This pass did not find official Quincy evidence proving a local B&O tax exists or proving it does not exist. Do not infer either way.
- Rhode Island municipality-by-municipality renewable waiver/adoption table: unresolved. Official state law and OER rules are clear, and East Greenwich proves municipal code evidence exists, but no complete current official statewide table was found.
- Michigan Detroit/Wayne RERZ project-specific evidence: unresolved. No official source found here ties a sample Detroit/Wayne property or Factory ZERO-like project to an approved DSIRE 3216 Renewable Energy Renaissance Zone calculation package with eligible tax lines.
- Pasadena numeric class rates: unresolved until the current official classification schedule is extracted from the adopted schedule/code or confirmed by the city.
- Anaheim non-services class rates: unresolved until all relevant Title 3 chapters are normalized.
- Burbank full numeric class rates: unresolved until Article VII of the current adopted fee schedule is extracted into machine-readable rows.
- Property tax commercial production terms remain partly unresolved where official sources provide lookup or open GIS but not explicit commercial bulk reuse terms for tax-bill/account line items.

## Suppressed From User-Facing Totals By Default

Suppress every record in `local_tax_gap_research_records.json` by default. The safest first product behavior is to show routing and missing-input workflows, then include only adapter-calculated amounts when required user/accountant/assessor/tax-bill inputs are present.

Exact suppression reasons:

- RI DSIRE 22798: savings require assessor-confirmed actual treatment and counterfactual tax.
- MI DSIRE 3216: eligibility and eligible tax lines require approved program documents and accountant/assessor review.
- Everett/Burbank/Pasadena/Anaheim/Vernon/San Diego: address alone cannot determine classification, tax base, employees, deductions, special districts, or account-specific add-ons.
- Quincy: local tax status is not proven from official sources.
- County property tax adapters: parcel geometry or lookup access is not enough for line-item property-tax savings.

## Validation

JSON parse validation should be run with:

```bash
node -e "JSON.parse(require('fs').readFileSync('GPT Pro Work/tax-local-dataset-parallel-shell-5-local-gap-research-2026-07-03/local_tax_gap_research_records.json','utf8')); console.log('ok')"
```
