# Top-Down Statewide Tax Source Coverage Summary

Generated: 2026-07-03  
Scope: Shell 2 statewide, federal, and multi-state official source coverage only. This does not include bottom-up county/city/local tax research except where a statewide source points to a local adapter.

## Direct Answers

1. Did this produce a complete all-locality tax database?

No. It produced a 51-row state/DC coverage matrix and a bulk-source manifest. It did not produce actual local tax rates/rules for every city, county, parcel district, assessor, treasurer, or local business-tax jurisdiction. Official local tax data is fragmented by tax domain: sales/use tax has the best statewide and multi-state machine-readable coverage, property tax remains assessor/treasurer dependent, and local business taxes are mostly city/county administered.

2. Which tax domains can get broad coverage through statewide/multi-state official sources?

Sales/use tax can get the broadest automated coverage. The matrix classifies 35 states/DC as `official_download`, 6 as `official_api`, 4 as `lookup_only`, 3 as `manual`, and 3 as `no_state_tax`. High-leverage official sources include Streamlined Sales Tax rate/boundary files, California CDTFA files/API, Washington DOR lookup URL interface, Colorado GIS/SUTS, Texas Comptroller EDI/rate files, Ohio Finder/SST files, Illinois DOR machine-readable files, and Florida DOR discretionary surtax data.

Property tax has partial top-down coverage. The matrix classifies 18 states as having some `statewide_machine_readable` source, but 22 still require tax bills, 7 are county-level only, and 4 require parcel-level resolution. Statewide parcel/rate examples such as Florida DOR, Texas Comptroller property tax rates, New York ORPTS/GIS parcels, and MassGIS help route and prefill, but they do not replace parcel/APN, tax bill, exemption, special assessment, or assessor verification.

State business tax has source-backed official rate/form coverage, but not address-only calculations. The matrix classifies 48 states/DC as `official_rate_schedule`, 2 as `forms_required`, and 1 as `no_major_business_tax`. In practice, business tax dollar estimates still require entity type, apportionment, tax base, deductions, credits, and filed-return/accountant facts.

3. Which domains cannot be automated from address alone?

Property tax cannot be reliably calculated from address alone. Address can usually identify county/place and likely assessor, but customer-specific calculation needs parcel/APN or a confident parcel match, assessed/taxable value, tax-rate area or millage, exemptions, abatements, and bill-level charges.

State and local business taxes cannot be calculated from address alone. Address can flag a possible state or local filing jurisdiction; it cannot determine gross receipts, net income, taxable margin, apportionment, classification, return liability, or credits.

Sales/use tax rate lookup can often be automated from address, but taxability cannot. Retrofit equipment, installation labor, freight, bundled services, exemption certificates, and use-tax sourcing remain category- and fact-specific.

4. What should shell 3 research bottom-up?

Shell 3 should focus on high-impact local gaps where statewide sources are insufficient: local business taxes in Seattle, Tacoma, Bellevue, Philadelphia, NYC, San Francisco, Los Angeles, Portland/Multnomah/Metro, Detroit, Ohio municipal tax collectors, Kentucky occupational taxes, Alaska municipal sales taxes, Montana resort/local-option taxes, Louisiana parish/local sales taxes, and property-tax/assessor details for the current RI and MI program-specific tax packages.

5. What should engineering import first?

Build imports/adapters in this order:

1. Census Geocoder/TIGER geography normalization.
2. Streamlined Sales Tax rate and boundary files.
3. California CDTFA sales/use rate files/API.
4. Washington DOR sales tax lookup URL interface.
5. Colorado DOR GIS/SUTS API.
6. Texas Comptroller sales-tax EDI/rate files.
7. Ohio Finder/SST rate and boundary files.
8. Illinois DOR machine-readable sales tax files.
9. Florida DOR property tax portal and statewide parcel/tax roll sources.
10. Texas Comptroller property tax rates/levies plus county appraisal-district routing.

## Coverage Counts From Matrix

- Sales/use tax: 35 official downloads, 6 official APIs, 4 lookup-only states, 3 manual/local-only states, 3 no-general-sales-tax states.
- Property tax: 18 statewide machine-readable partial sources, 22 tax-bill-required states, 7 county-level-only states, 4 parcel-required states.
- State business tax: 48 official rate schedule states/DC, 2 forms-required states, 1 no-major-business-tax state.

## Official Source Examples Used

- Streamlined Sales Tax rate/boundary files: https://www.streamlinedsalestax.org/Shared-Pages/rate-and-boundary-files
- U.S. Census TIGER/Line: https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html
- California CDTFA sales/use tax rates: https://cdtfa.ca.gov/taxes-and-fees/sales-use-tax-rates.htm
- Washington DOR sales tax lookup URL interface: https://dor.wa.gov/wa-sales-tax-rate-lookup-url-interface
- Colorado DOR GIS/SUTS: https://tax.colorado.gov/GIS-info
- Texas Comptroller sales-tax EDI files: https://comptroller.texas.gov/taxes/file-pay/edi/sales-tax-rates.php
- Ohio Finder sales tax/SST files: https://thefinder.tax.ohio.gov/streamlinesalestaxweb/default.aspx
- Illinois DOR machine-readable sales tax files: https://tax.illinois.gov/research/taxrates/sales-tax-rate-machine-readable-files.html
- Florida DOR property tax data portal: https://floridarevenue.com/property/Pages/DataPortal.aspx
- Texas Comptroller property tax rates: https://comptroller.texas.gov/taxes/property-tax/rates/
- New York GIS parcels: https://gis.ny.gov/parcels
- MassGIS property tax parcels: https://www.mass.gov/info-details/massgis-data-property-tax-parcels

## Practical Automation Boundary

Address/geography can support:

- State, county, place, tract/block, and sometimes tax jurisdiction routing.
- Sales/use rate lookup when an official API/download/boundary source exists.
- Candidate property assessor/treasurer routing.
- Candidate state and local business-tax exposure flags.

Address/geography cannot safely support:

- Property-tax dollar amounts without parcel/tax-bill/assessor facts.
- Business-tax liability without taxpayer/accountant filing facts.
- Project-specific sales/use taxable base without equipment/labor taxability rules and quote/invoice facts.
- Program-specific tax incentive values without certification, actual tax liability, local adoption, or assessor evidence.

## Files Produced

- `statewide_source_coverage_matrix.json`: 51-state/DC source-backed coverage matrix.
- `official_bulk_source_manifest.json`: high-leverage official source families for import/adapters.
- `top_down_import_priority_plan.md`: first 10 imports/adapters with engineering rationale.
- `handoff_to_shell_3_bottom_up.md`: concrete local gaps for shell 3.
