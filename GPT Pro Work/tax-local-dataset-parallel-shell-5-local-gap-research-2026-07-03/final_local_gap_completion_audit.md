# Final Local Gap Completion Audit

Date: 2026-07-03

## JSON Validation

Command run:

```bash
node -e 'const fs=require("fs"); const p="GPT Pro Work/tax-local-dataset-parallel-shell-5-local-gap-research-2026-07-03/local_tax_gap_research_records.json"; const o=JSON.parse(fs.readFileSync(p,"utf8")); const counts={}; for (const r of o.records){counts[r.calculationStatus]=(counts[r.calculationStatus]||0)+1} console.log("JSON parse ok"); console.log("records", o.records.length); console.log(JSON.stringify(counts,null,2));'
```

Result:

```text
JSON parse ok
records 17
{
  "assessor_or_accountant_review_required": 2,
  "calculable_with_user_inputs": 6,
  "source_inaccessible": 1,
  "calculable_with_tax_bill": 8
}
```

## Counts By Calculation Status

- `assessor_or_accountant_review_required`: 2
- `calculable_with_user_inputs`: 6
- `source_inaccessible`: 1
- `calculable_with_tax_bill`: 8
- Total records: 17

## Unresolved Items Remaining

- Quincy, WA general non-utility local B&O/gross-receipts status remains unresolved. Official code proves business licensing and public utility business tax, but no official source found here affirmatively proves whether a separate general non-utility B&O/gross-receipts tax exists or does not exist.
- Detroit/Wayne DSIRE 3216 RERZ project-specific evidence remains unresolved. Official sources searched did not tie Factory ZERO or another Detroit/Wayne sample property to an approved Renewable Energy Renaissance Zone calculation package with eligible tax lines.
- Rhode Island municipal renewable treatment is bounded by the official 2025 OER all-39 municipal inventory, but direct linked municipal ordinance verification is still needed before importing municipality-specific rows into runtime.
- Property tax adapter commercial/bulk terms remain bounded but not production-cleared where official sources provide lookup/open GIS access without explicit commercial production terms for tax-bill line items.
- Uncommon Burbank, Pasadena, Anaheim, Vernon, San Diego, and Everett classes or account-specific add-ons remain outside default totals unless separately normalized and user/account facts are present.

## Calculable Only With User, Accountant, Assessor, Or Tax-Bill Inputs

- Rhode Island DSIRE 22798: requires AC kW, project classification, municipal treatment, real/tangible applicability, assessor confirmation, current bill lines, and counterfactual ordinary tax.
- Michigan DSIRE 3216: requires approved program documents, parcel inclusion, phaseout/final-year facts, taxpayer compliance, accountant/assessor review, and eligible otherwise-due tax lines.
- Everett, Burbank, Pasadena, Anaheim, Vernon, and San Diego business taxes: require user-supplied class and tax-base inputs such as gross receipts, employee count, square footage, valuation, room/accommodation count, filing date, late status, BID/account add-ons, deductions, and credits.
- Quincy public utility tax: requires confirmation that the activity is a QMC 3.28 public utility business plus gross income and remittance-period facts. Non-utility general B&O is not runtime-ready.
- Los Angeles, San Diego, Orange, King, Wayne/Detroit, Washtenaw/Ann Arbor, Grant, and Snohomish property tax adapters: require parcel/account confirmation and official tax bill, tax portal, assessor, treasurer, or user-uploaded bill line items before calculating dollar impacts.

## Shell 5 Runtime Readiness Statement

Shell 5 is complete enough for a conservative tax-runtime implementation of routing and gated calculation workflows. It is not complete enough for ungated user-facing local tax totals.

Runtime can safely implement:

- geography-based routing to the researched jurisdiction workflows;
- Burbank, Pasadena, Anaheim, Vernon, San Diego, Everett, and Quincy public-utility/base workflows only when required user inputs are supplied;
- Rhode Island and Michigan tax-program workflows as assessor/accountant/tax-bill gated records;
- county property-tax adapter routing with tax-bill/account gating.

Runtime must suppress default dollar totals unless all required user, accountant, assessor, or tax-bill inputs are present. Quincy non-utility local B&O, Detroit/Wayne project-specific RERZ, RI direct municipal ordinance import, and production-grade property-tax bulk terms still need GPT Pro or human research before they can be trusted as deterministic runtime data.
