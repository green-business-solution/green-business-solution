# Property Tax Adapter Notes

Date: 2026-07-03

Scope: bottom-up local property-tax sources for prioritized sample/test geographies. This is not a nationwide property-tax import plan.

## General Rule

Do not calculate property-tax savings from county, city, ZIP, or Census place alone. For these sample localities, address can often find a candidate parcel, but final calculation needs APN/parcel ID, tax bill, assessor notice, exemption/abatement evidence, or assessor confirmation.

## Los Angeles County, CA

Samples: `california-endowment-hq`, `ikea-burbank`, `melissas-vernon-distribution`, `westin-pasadena`.

Official sources:

- Los Angeles County Property Tax Portal: https://www.propertytax.lacounty.gov/
- LA County Assessor Property Search: https://assessor.lacounty.gov/homeowners/property-search
- LA County Treasurer and Tax Collector payment/search: https://ttc.lacounty.gov/pay-your-property-taxes/

Adapter fit: partial. Address can help find the property/AIN through assessor tools, but treasurer payment/tax-detail workflows require Assessor Identification Number. Runtime should ask for a tax bill or AIN before estimating current taxes, direct assessments, welfare exemption effects, or special assessments.

RetroFi fields to map after bill/parcel match:

- `parcel_id` / `assessor_identification_number`
- `tax_year`
- `assessed_land_value`
- `assessed_improvement_value`
- `exemption_value`
- `net_taxable_value`
- `general_levy_amount`
- `direct_assessment_lines`
- `secured_tax_due`

Vernon note: the City of Vernon states it has a special parcel tax on non-refrigerated warehouses, truck terminals, freight terminals, and distribution facilities, collected through the property tax bill. The Melissa's/Vernon distribution sample should be gated on tax-bill upload or city confirmation.

## San Diego County, CA

Sample: `juniper-and-ivy-san-diego`.

Official sources:

- San Diego County Treasurer-Tax Collector: https://www.sdttc.com/
- San Diego County Assessor property records: https://www.sdarcc.gov/content/arcc/home/divisions/assessor/property-records.html
- San Diego County Special Assessments: https://specialassessments.sandiegocounty.gov/

Adapter fit: partial and promising for bill-line validation. The treasurer site supports bill search by parcel/bill number, mailing address, or unsecured bill number. The special-assessment tool can return assessed valuation, tax rates, and special assessment breakdown, but requires secured parcel number.

Runtime should collect APN or tax bill first. Address-only lookup can be a convenience step, not the proof source.

## Orange County / Anaheim, CA

Sample: `northgate-market-anaheim`.

Official sources:

- OC Assessor secured property value lookup: https://assessedvalue.ocassessor.gov/
- OC Treasurer-Tax Collector tax search: https://taxbill.octreasurer.gov/
- OC property tax guide: https://octreasurer.gov/property-tax

Adapter fit: partial. Official lookup supports APN/address tax bill review, but source pages do not prove a bulk import path. Runtime should ask for APN or property tax bill.

## Riverside County / Corona, CA

Sample: `fender-corona-plant`.

Official sources:

- Riverside ACR Property Tax Bills: https://www.rivcoacr.org/PropertyTaxBills
- RivCoView property search: https://rivcoview.rivcoacr.org/
- Riverside Treasurer-Tax Collector: https://countytreasurer.org/

Adapter fit: partial. RivCoView supports PIN/APN or property address search. Tax-bill amount and special lines should still come from the Treasurer or uploaded bill.

## King County / Seattle, WA

Sample: `hoa-mai-gardens-seattle-household`.

Official sources:

- King County Parcel Viewer: https://kingcounty.gov/en/dept/kcit/data-information-services/gis-center/maps-apps/parcel-viewer
- King County property tax payment/search: https://payment.kingcounty.gov/Home/Index?app=PropertyTaxes
- Seattle property tax note: https://www.seattle.gov/city-finance/business-taxes-and-licenses/seattle-taxes/property-tax-and-sales-tax

Adapter fit: partial. King County Parcel Viewer supports address or parcel search and links to Assessor eReal Property. Seattle does not collect land/building property tax, so county parcel/tax records are the relevant local source.

Runtime can use address to route to King County and request parcel confirmation. Final property-tax calculations need parcel/year tax statement or county detail capture.

## Snohomish County / Everett, WA

Sample: `boeing-everett-factory`.

Official sources:

- Snohomish County Assessor: https://www.snohomishcountywa.gov/assessor
- Property Taxes and Assessments: https://www.snohomishcountywa.gov/2251/Property-Taxes-and-Assessments
- SCOPI map: https://www.snohomishcountywa.gov/5414/Interactive-Map-SCOPI

Adapter fit: partial. County says Assessor and Treasurer use the same software for value and taxes due, and SCOPI provides parcel map lookup. For Boeing-scale industrial property, business personal property and exemptions may be separate from real property, so tax bill/accountant input is required.

## Grant County / Quincy, WA

Sample: `microsoft-columbia-data-center-quincy`.

Official sources:

- Grant County Property Search: https://propertysearch.grantcountywa.gov/
- Grant County Assessor: https://www.grantcountywa.gov/248/Assessor
- Grant County Treasurer: https://www.grantcountywa.gov/384/Treasurer

Adapter fit: partial. Treasurer statements can be searched by property ID, parcel number, or exact owner name. Address-only matching is weaker for the sample because the test address is city-level (`Quincy, WA 98848`) rather than a street address.

Runtime should require parcel/tax statement upload for this sample.

## Detroit / Wayne County, MI

Samples: `eastern-market-detroit`, `gm-factory-zero-detroit`.

Official sources:

- Detroit Office of the Assessor: https://detroitmi.gov/departments/office-chief-financial-officer/ocfo-divisions/office-assessor
- Wayne County Treasurer property tax listing: https://pta.waynecounty.com/
- Wayne County property tax information: https://www.waynecountymi.gov/Government/Elected-Officials/Treasurer/Property-Tax-Information
- Wayne County Assessment and Equalization: https://www.waynecountymi.gov/Government/Departments/Management-Budget/Assessment-Equalization

Adapter fit: partial and review-gated. Wayne County delinquent lookup supports parcel ID or street address/city. Current assessment/tax data is local-community-specific; Wayne County directs users to local communities for current assessment data and tax parcel maps. Detroit Assessor is the valuation source for real and tangible personal property.

RERZ/abatement note: for `gm-factory-zero-detroit`, do not estimate from address alone. Require approved abatement/RERZ/local-unit documents, parcel inclusion, and actual eligible tax lines.

## Ann Arbor / Washtenaw County, MI

Sample: `zingermans-deli-ann-arbor`.

Official sources:

- Washtenaw property/parcel lookup: https://secure4.ewashtenaw.org/parcelsearch/
- Washtenaw search page: https://www.washtenaw.org/2014/Search
- Ann Arbor online assessment/property tax data: https://www.a2gov.org/finance-and-administrative-services/assessing/online-assessment-and-property-tax-data/
- Ann Arbor tax payment: https://www.a2gov.org/finance-and-administrative-services/treasury/pay-taxes-online/

Adapter fit: partial. Washtenaw combines current real property data from Treasurer and Equalization/Property Description. Ann Arbor payment workflow requires parcel number and last name. Use address to find parcel; require tax bill or parcel/customer facts for final line items.

## Engineering Build First

1. Add a property-tax resolver state machine: `address_resolved` -> `parcel_candidate_found` -> `parcel_confirmed` -> `tax_bill_uploaded_or_official_bill_found` -> `calculation_allowed`.
2. Store source metadata for each county adapter: owner, URL, access method, lookup keys, effective tax year, and whether use is manual/interactive/API.
3. Implement first convenience lookups for LA County, San Diego County, King County, and Detroit/Wayne because they cover repeated/high-impact samples.
4. Keep final property-tax savings out of user-facing totals until parcel/year bill facts and exemption/abatement lines are present.
