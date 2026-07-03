# Tax Source Validation Report

Generated: 2026-07-03

## Scope

This shell converts existing tax research artifacts into an import-readiness registry. It does not claim that all tax law has been collected. It is not a complete nationwide local-tax law database.

## Registry Counts

- Total registry records: 399
- By taxDomain: {"assessor_boundary":1,"local_business_tax":10,"parcel_boundary":5,"program_specific_tax_incentive":2,"property_tax":112,"sales_use_tax":159,"special_assessment":1,"special_district_boundary":1,"state_business_tax":108}
- By state: {"AK":4,"AL":6,"AR":7,"AZ":6,"CA":14,"CO":7,"CT":5,"DC":5,"DE":5,"FL":6,"GA":8,"HI":6,"IA":8,"ID":6,"IL":6,"IN":8,"KS":8,"KY":7,"LA":6,"MA":5,"MD":5,"ME":5,"MI":11,"MN":8,"MO":6,"MS":6,"MT":6,"MULTI_OR_UNKNOWN":35,"NC":8,"ND":8,"NE":8,"NH":5,"NJ":8,"NM":7,"NV":8,"NY":7,"OH":8,"OK":8,"OR":5,"PA":6,"RI":9,"SC":7,"SD":8,"TN":8,"TX":6,"UT":8,"VA":6,"VT":8,"WA":14,"WI":8,"WV":8,"WY":8}
- By accessMethod: {"api":11,"download":120,"html_table":115,"lookup_tool":19,"pdf":7,"unknown":127}
- By importReadiness: {"gap":5,"lookup_only":19,"manual_review":123,"needs_adapter":122,"ready_for_import":130}
- By calculationSupported: {"accountant_input_required":118,"address_plus_project_inputs":159,"assessor_confirmation_required":105,"not_supported":7,"tax_document_required":10}

## Automation Boundary

Taxes that can be partly automated from address/geography: sales/use tax rate lookup where an official download/API/lookup source exists, with transaction date and project taxability inputs still required. Boundary and parcel datasets can automate routing, but they do not calculate tax amounts. Registry records marked address-only or address-plus-project-inputs: 159.

Taxes requiring tax bill, parcel/APN, accountant return data, or assessor confirmation:

- Property tax and special assessments require parcel/APN/AIN, tax year, official bill or assessor/treasurer record, taxable/assessed values, exemptions/abatements, and special/direct assessment lines.
- State and local business taxes require entity type, classification, gross receipts or taxable income, apportionment/allocation, deductions, credits, thresholds, and filed-return/accountant facts.
- Program-specific property-tax incentives require local adoption or approval evidence, parcel inclusion, eligible tax-line treatment, and assessor confirmation where applicable.

## Is Existing Research Enough To Finish Tax Calculations?

No. The research is enough to start an import/adaptor queue and to gate calculations conservatively. It is not enough to finish nationwide local tax calculations. Sales/use rate automation is the strongest path, but final sales/use estimates still need project taxability and transaction facts. Property-tax and business-tax calculations remain gated on parcel/bill/accountant/assessor evidence.

## Official URL Spot Checks

1. https://www.streamlinedsalestax.org/Shared-Pages/rate-and-boundary-files - HTTP 200 text/html via official SST site; accessible 2026-07-03.
2. https://cdtfa.ca.gov/taxes-and-fees/sales-use-tax-rates.htm - HTTP 200 text/html via official CDTFA site; accessible 2026-07-03.
3. https://maps.cdtfa.ca.gov/ - HTTP 200 text/html via official CDTFA map/lookup site; accessible 2026-07-03.
4. https://dor.wa.gov/wa-sales-tax-rate-lookup-url-interface - HTTP 200 text/html via official Washington DOR site; accessible 2026-07-03.
5. https://tax.colorado.gov/GIS-info - HTTP 403 from official Colorado DOR site during automated GET; record remains official but needs manual/browser or approved API access validation before import.
6. https://comptroller.texas.gov/taxes/file-pay/edi/sales-tax-rates.php - HTTP 200 text/html via official Texas Comptroller site; accessible 2026-07-03.
7. https://thefinder.tax.ohio.gov/streamlinesalestaxweb/default.aspx - HTTP 200 text/html via official Ohio Finder site; accessible 2026-07-03.
8. https://tax.illinois.gov/research/taxrates/sales-tax-rate-machine-readable-files.html - HTTP 200 text/html via official Illinois DOR site; accessible 2026-07-03.
9. https://floridarevenue.com/property/Pages/DataPortal.aspx - HTTP 200 text/html via official Florida Revenue site; accessible 2026-07-03.
10. https://comptroller.texas.gov/taxes/property-tax/rates/ - HTTP 200 text/html via official Texas Comptroller site; accessible 2026-07-03.
11. https://www.propertytax.lacounty.gov/ - HTTP 200 text/html via official LA County property tax portal; accessible 2026-07-03.
12. https://finance.lacity.gov/tax-information-booklet - HTTP 200 text/html via official Los Angeles Finance site; accessible 2026-07-03.
13. https://www.seattle.gov/city-finance/business-taxes-and-licenses/business-taxes - HTTP 206 text/html partial-content response via official Seattle site; accessible 2026-07-03.
14. https://detroitmi.gov/departments/office-chief-financial-officer/ocfo-divisions/office-treasury/income-tax/business-income-tax - HTTP 206 text/html partial-content response via official Detroit site; accessible 2026-07-03.

## Explicit Non-Calculable Areas

- Rhode Island municipal renewable property/tangible tax treatment is a high-priority gap.
- Michigan RERZ/Detroit-Wayne project-specific property tax treatment is not calculable from geography alone.
- Everett and Quincy city B&O applicability/rates were not proven from official city sources.
- Burbank, Pasadena, Vernon, and Anaheim business-license taxes need current city schedules and business facts before calculation.
- County property portals generally support lookup workflows, not complete bulk imports, until API/licensing/terms are confirmed.

## Import Readiness Interpretation

- ready_for_import: machine-readable official download/API source, still requiring adapter validation.
- needs_adapter: official HTML/PDF/statute/form source needs scraping, normalization, or manual formula adapter.
- lookup_only: official portal or lookup source can support workflow/caching but not bulk import by itself.
- manual_review: source exists but machine readability, access, or effective-date semantics are unclear.
- gap: official source evidence is missing or insufficient for runtime calculation.
