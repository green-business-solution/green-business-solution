# Official Tax Dataset Sources

This file summarizes practical source families for the tax input resolver. Official sources are preferred. Unofficial sources should be discovery-only and must not promote a calculable rule.

## Address And Geography

### Census Geocoder

Official source: https://geocoding.geo.census.gov/geocoder/Geocoding_Services_API.html

Use for normalized address-to-coordinate and Census geography facts. The API documentation says it returns coordinates from MAF/TIGER benchmark data and can add geography lookup results. Store benchmark, vintage, matched address, coordinates, match type, and any ambiguity flags.

Practical import: use live API for address resolution and cache results by benchmark/vintage. Batch support is useful for sample profiles, but batch geography lookup only returns state/county/tract/block, so use single-record or TIGER/TIGERweb joins when place/school/special district layers matter.

### TIGER/Line Shapefiles And TIGERweb

Official source: https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html

Use for state, county, place, county subdivision, tract, block, and related legal/statistical geography joins. Census states TIGER/Line files contain geographic entity codes and annual legal-boundary vintages.

Practical import: import state/county/place/county subdivision and school district layers for regression and locality routing. Do not treat Census boundaries as property tax districts unless the tax authority explicitly uses them.

## Sales And Use Tax

### Streamlined Sales Tax Rate And Boundary Files

Official source: https://www.streamlinedsalestax.org/Shared-Pages/rate-and-boundary-files

SST says member states provide rate and boundary files; boundary files identify tax codes for addresses or ZIPs, and rate files provide rates by tax code. Files are intended for tax calculation applications and are updated quarterly when changes occur.

Practical import: high priority for SST states. Store effective date, state, tax code, boundary file version, rate file version, and whether the boundary method is ZIP5, ZIP9, or address-specific.

### California CDTFA

Official source: https://cdtfa.ca.gov/taxes-and-fees/sales-use-tax-rates.htm

CDTFA provides current rates, address lookup, downloadable city/county files, historical rates, district rates, and operative/sunset date resources. CDTFA warns that some communities within a city or county may not be listed, so address lookup remains important.

Practical import: import downloadable rate files and district/sunset tables; use address lookup/API or CDTFA map service for precise district assignment.

### Washington DOR

Official source: https://dor.wa.gov/wa-sales-tax-rate-lookup-url-interface

Washington DOR provides a URL interface for address-based sales/use tax rate lookup in real time, using address or ZIP+4.

Practical import: use official lookup for current address-specific rates and cache raw responses. Historic calculations need a separate historic source or stored snapshots.

### Other High-Priority State Sources

Use the existing `data/tax_official_dataset_rule_research_gpt_pro_2026-07-03.json` catalog as the next work queue. Prioritize state revenue department APIs/downloads for Texas, Colorado, Ohio, Illinois, Florida, New York, Arizona, and Kansas because existing sample profiles and likely customer geographies need them.

## Property Tax And Millage

Property tax is usually not practical as a single national import. It commonly requires parcel/APN, tax-rate area, assessed value, exemptions, direct levies, special assessments, school districts, and assessor/tax collector records.

Practical import:

- Import state-level property tax rule constants only where source-backed.
- Import county assessor/treasurer parcel and tax-rate-area datasets only for target counties with machine-readable official data and clear licensing.
- Require tax bill, APN, assessor notice, or admin review when parcel-level taxes materially affect an incentive.
- Never infer parcel tax amount from Census place/county alone.

For current packages:

- Rhode Island: import statewide $5.00/kW AC and $3.50/kW AC constants. Municipal waiver/ordinance status should start as case-by-case or GPT Pro follow-up.
- Michigan RERZ: do not import a broad property tax rate. Require approved zone documents, parcel-in-boundary confirmation, and actual eligible tax lines.

## Gross Receipts / B&O / Local Income

Washington B&O:

- Official source for solar preference: https://apps.leg.wa.gov/rcw/default.aspx?cite=82.04.294
- Official DOR guidance: https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems

Practical import: import state preference constants and ordinary rate schedules. Tax base, classification, deductions, MATC, and annual report status must be user/accountant supplied.

Local B&O and local income:

- Treat as separate modules. City business taxes and local income taxes often require city-specific official forms, ordinances, apportionment rules, and taxpayer facts.
- For Michigan RERZ, local income tax is a component only when documented by tax filings or accountant review.

## Practical Import Order

1. Census Geocoder result storage with benchmark/vintage and ambiguity flags.
2. TIGER state/county/place/county subdivision joins for routing only.
3. Current tax package constants for WA, RI, and MI.
4. WA B&O preference constants and ordinary rate schedule.
5. RI municipal waiver/ordinance follow-up table, if official sources can be normalized.
6. Sales/use rate adapters for states with official APIs/downloads.
7. Parcel/property tax adapters only for target jurisdictions where official parcel/tax bill data is machine-readable.

## Datasets To Resolve Case-By-Case

- Michigan Renewable Energy Renaissance Zone boundaries and approved company/project status until an official statewide machine-readable source is found.
- Rhode Island municipal renewable-energy tangible tax waivers and assessor treatment until a normalized official municipal table is built.
- Property tax savings calculations where a counterfactual assessment is needed.
- Local business taxes, local income taxes, tribal taxes, utility taxes, and special assessments unless a source-backed local module exists.
