# Top-Down Import Priority Plan

Generated: 2026-07-03  
Scope: statewide, federal, and multi-state official imports/adapters only.

## 1. Census Geocoder and TIGER/Line Geography

Source owner: U.S. Census Bureau  
Sources: https://geocoding.geo.census.gov/geocoder/ and https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html

Engineering effort: medium. Build durable address normalization, benchmark/vintage persistence, and joins to state/county/place/county subdivision/tract/block/school district where needed.

Coverage impact: national geography foundation for every tax resolver path.

Runtime use: address-derived routing. This does not calculate taxes by itself.

Refresh: annual TIGER/Line updates plus Census geocoder benchmark/vintage handling.

## 2. Streamlined Sales Tax Rate and Boundary Files

Source owner: Streamlined Sales Tax Governing Board and member states  
Source: https://www.streamlinedsalestax.org/Shared-Pages/rate-and-boundary-files

Engineering effort: medium-high because file formats vary by state and rate/boundary files must be versioned together.

Coverage impact: broad multi-state sales/use rate automation.

Runtime use: address-to-tax-code and tax-code-to-rate resolution for member states. Project taxability remains separate.

Refresh: load member-state files by posted effective date; monitor corrected-file updates.

## 3. California CDTFA Sales/Use Rate Files and API

Source owner: California Department of Tax and Fee Administration  
Sources: https://cdtfa.ca.gov/taxes-and-fees/sales-use-tax-rates.htm and https://maps.cdtfa.ca.gov/

Engineering effort: medium. Import current/archive rate files and optionally add address lookup/API fallback.

Coverage impact: high for a large state with district taxes and frequent retrofit project volume.

Runtime use: California state/local/district rate component resolution.

Refresh: quarterly or as CDTFA posts new effective-date files.

## 4. Washington DOR Sales Tax Lookup URL Interface

Source owner: Washington State Department of Revenue  
Source: https://dor.wa.gov/wa-sales-tax-rate-lookup-url-interface

Engineering effort: low-medium. Build a lookup adapter, response cache, throttling, and provenance logging.

Coverage impact: high for Washington packages and general sales/use estimates.

Runtime use: address/ZIP/coordinate-specific current rate lookup. Does not resolve B&O.

Refresh: live lookup with cached response TTL; verify historic support separately.

## 5. Colorado DOR GIS/SUTS API

Source owner: Colorado Department of Revenue  
Sources: https://tax.colorado.gov/GIS-info and https://tax.colorado.gov/GIS-API

Engineering effort: medium-high because API access requires SUTS setup and Colorado home-rule/special-district handling needs careful provenance.

Coverage impact: high for address-specific state/county/municipality/special-district sales/use rates.

Runtime use: current rate lookup with state/local component detail where available.

Refresh: cache official API responses and track lookup date/effective data returned.

## 6. Texas Comptroller Sales-Tax EDI and Rate Files

Source owner: Texas Comptroller of Public Accounts  
Source: https://comptroller.texas.gov/taxes/file-pay/edi/sales-tax-rates.php

Engineering effort: medium. Parse EDI/rate files, preserve local component types, and validate address-to-overlapping-jurisdiction logic.

Coverage impact: high for large-state local sales/use rate automation.

Runtime use: city/county/transit/special purpose district component rates and rate-change history.

Refresh: current and historical files as posted by Comptroller.

## 7. Ohio Finder and SST Rate/Boundary Data

Source owner: Ohio Department of Taxation  
Sources: https://thefinder.tax.ohio.gov/streamlinesalestaxweb/default.aspx and https://thefinder.tax.ohio.gov/streamlinesalestaxweb/Download/SSTPRateTableInstructions.aspx

Engineering effort: medium. Import rate tables/boundaries and support address/coordinate lookup fallback.

Coverage impact: high for county/transit sales tax and Ohio municipal routing.

Runtime use: sales/use rate lookup and geography validation. Municipal net profits tax still needs accountant facts.

Refresh: use rate-table effective periods and boundary versions.

## 8. Illinois DOR Machine-Readable Sales Tax Files

Source owner: Illinois Department of Revenue  
Source: https://tax.illinois.gov/research/taxrates/sales-tax-rate-machine-readable-files.html

Engineering effort: medium. Parse DOR layouts and preserve effective periods.

Coverage impact: high for local Illinois sales/use rates.

Runtime use: jurisdiction and rate component resolution where transaction sourcing is already known.

Refresh: Illinois local rate changes generally occur January 1 and July 1; still monitor posted files.

## 9. Florida DOR Property Tax Portal and Parcel/Tax Roll Sources

Source owner: Florida Department of Revenue and Florida Geographic Information Office  
Source: https://floridarevenue.com/property/Pages/DataPortal.aspx

Engineering effort: high. Build parcel/tax-roll ingestion, county matching, tax-year versioning, and bill/document gates.

Coverage impact: high for property-tax automation in one of the best statewide official property data environments.

Runtime use: parcel match, assessed/taxable value context, assessor routing, and county/municipality tax-roll facts.

Refresh: annual tax roll/report cycles plus local county updates.

## 10. Texas Property Tax Rates/Levies and Appraisal-District Routing

Source owner: Texas Comptroller of Public Accounts plus county appraisal districts  
Source: https://comptroller.texas.gov/taxes/property-tax/rates/

Engineering effort: high. Import statewide taxing-unit rates, then route parcel matching to appraisal districts.

Coverage impact: high for rate constants, but calculation still needs parcel taxable value and taxing-unit assignments.

Runtime use: property-tax rate constants and assessor routing. User-facing calculations remain gated until parcel/tax-bill facts are present.

Refresh: annual property tax rate submissions and appraisal district updates.

## Deferred From Top-10

New York ORPTS/GIS parcels and MassGIS property tax parcels should be next property-tax imports after the first two property pilots. They are strong official sources but need parcel schema normalization and local bill/exemption gates.

State business tax sources should be represented as versioned formulas and input requirements rather than bulk imports. They are important for calculation packages, but address-only automation is not realistic without taxpayer/accountant facts.
