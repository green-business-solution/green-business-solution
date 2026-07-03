# Bottom-Up Locality Tax Source Coverage

Date: 2026-07-03

## Prioritized Sample/Test Jurisdictions

I prioritized geographies that appear in sample/test fixtures and have local property-tax bills, local business tax documents, or high-impact industrial/business-tax exposure:

- Los Angeles County, CA: Los Angeles, Burbank, Pasadena, Vernon.
- San Diego County, CA: San Diego.
- Orange County, CA: Anaheim.
- Washington: Seattle/King County, Everett/Snohomish County, Quincy/Grant County.
- Michigan: Detroit/Wayne County and Ann Arbor/Washtenaw County.
- Secondary CA property-tax cases: Riverside/Corona and Santa Clara/Santa Clara.

The source list is intentionally not a national locality catalog. It is a first adapter queue tied to real RetroFi sample users.

## Local Tax Data That Can Be Automated From Official Sources

Partial automation is realistic:

- Address-to-county/city routing can choose the correct local source adapter.
- Some county tools support address-to-parcel discovery, such as King County Parcel Viewer, Riverside RivCoView, and Grant County property search.
- Tax-bill lookup can be automated or semi-automated after APN/AIN/parcel ID is known in Los Angeles County, San Diego County, Orange County, King County, Wayne County, Washtenaw County, Snohomish County, and Grant County.
- Los Angeles and Seattle local business tax rate/classification sources are structured enough for source-backed rate catalogs.
- Detroit business income-tax rates/forms are source-backed, but dollar estimates require return/accountant facts.
- San Diego, Pasadena, Burbank, Anaheim, and Vernon business-license workflows can be routed and prompted from official sources, but current formulas need user facts and in some cases GPT Pro confirmation of complete rate schedules.

## Calculations Requiring Parcel, Bill, Account, Accountant, Or Assessor Facts

Property tax:

- All researched property-tax jurisdictions require APN/AIN/parcel ID, tax bill, current tax statement, or assessor/tax collector confirmation for final calculation.
- Direct assessments, special assessments, Mello-Roos/CFD, exemptions, abatements, personal property, and parcel-specific levy areas cannot be inferred from ZIP/city alone.
- Vernon special parcel tax requires tax-bill/city confirmation because the city says the current rate should be checked with the city.
- Detroit/Wayne and Michigan RERZ-like abatements require approved local-unit/zone documents and actual eligible tax lines.

Local business tax:

- Los Angeles and Seattle need classification, taxable gross receipts/gross income, apportionment, deductions, thresholds, and filing facts.
- Detroit needs entity type, taxable income, apportionment, partner/withholding facts, and return workpapers.
- San Diego, Pasadena, Burbank, Anaheim, and Vernon need business-license class, employee count, square footage/units/rooms/gross receipts where applicable, and account/filing status.

## Lookup-Only Sources Not Suitable For Bulk Import Yet

- LA County property tax portal / Treasurer lookup: official but AIN-based and interactive.
- San Diego County Treasurer and special assessment lookup: useful after APN; not a bulk feed.
- Orange County Assessor/Treasurer lookup: official parcel/tax lookup; no bulk adapter confirmed.
- King County Parcel Viewer/eReal links: useful address-to-parcel workflow; API/terms still need confirmation.
- Wayne County delinquent tax lookup and Detroit assessor workflows: current tax details are local-community/account specific.
- Washtenaw/Ann Arbor lookup/payment: parcel/last-name workflow.
- Grant and Snohomish property systems: official property/tax lookup, but production API/terms require follow-up.

## What Engineering Should Build First

1. Source registry and adapter state machine for property tax:
   `address_resolved -> parcel_candidate_found -> parcel_confirmed -> tax_bill_uploaded_or_official_bill_found -> calculation_allowed`.
2. First property-source adapters/checklists for LA County, San Diego County, King County, and Detroit/Wayne because they cover repeated or high-impact sample cases.
3. Local business tax workflow states:
   `city_routed -> classification_candidate -> classification_confirmed -> tax_base_supplied -> calculation_allowed`.
4. Source-backed local business rate catalogs for Los Angeles and Seattle.
5. Detroit business income-tax workflow as an accountant-input calculation, not address-only.
6. UI prompts for APN/AIN/parcel ID, property tax bill, business tax return, city business license account, and assessor confirmation.

## What GPT Pro Should Research Next

- Rhode Island municipal renewable property/tangible tax treatment table.
- Michigan RERZ/local-unit/zone documents for Detroit/Wayne and any current sample-relevant project.
- Everett and Quincy official city B&O/current local business tax status.
- Current business license tax schedules for Burbank, Pasadena, Anaheim, and Vernon.
- Official bulk/API/licensing terms for priority county parcel/assessment/tax-bill data.

## Coverage Conclusion

Bottom-up locality coverage is feasible as targeted source-backed workflows, not as address-only nationwide tax calculation. The first production claim should be: RetroFi can route users to official local property/business tax sources, request the missing authoritative document/fact, and calculate only after parcel/account/tax-base facts are present.
