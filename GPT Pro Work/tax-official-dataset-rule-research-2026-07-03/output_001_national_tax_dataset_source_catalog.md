{
"schemaVersion": "retrofi_official_tax_dataset_source_catalog.v1",
"researchedAt": "2026-07-03",
"source": "gpt_pro; task_file: ",
"datasetFamilies": [
{
"taxDataFamily": "sales_use_tax",
"jurisdictionLevel": "mixed",
"jurisdictionsCovered": [
"Streamlined Sales Tax member states"
],
"officialSourceName": "Streamlined Sales Tax Rate and Boundary Files",
"officialOwner": "Streamlined Sales Tax Governing Board",
"sourceUrls": [
"[https://www.streamlinedsalestax.org/Shared-Pages/rate-and-boundary-files](https://www.streamlinedsalestax.org/Shared-Pages/rate-and-boundary-files)",
"[https://www.streamlinedsalestax.org/Shared-Pages/rate-and-boundary-files/rate-and-boundary-file-updates](https://www.streamlinedsalestax.org/Shared-Pages/rate-and-boundary-files/rate-and-boundary-file-updates)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"state rate files",
"state boundary files",
"format varies by state"
],
"updateFrequency": "As posted by member states; update page lists effective update dates.",
"effectiveDateHandling": "Use each member-state rate file, boundary file, and update posting date; do not assume a uniform national effective date.",
"addressOrGeographyJoinKeys": [
"state",
"address",
"ZIP5",
"ZIP+4",
"tax code",
"state/local jurisdiction code"
],
"licensingOrUseNotes": "Official Streamlined Sales Tax source. Confirm state-specific file terms before redistribution.",
"priority": "high",
"implementationNotes": "Evidence: the official SST page says each member state provides a rate file and boundary file, and the boundary file maps an address to tax codes while the rate file supplies rates by tax code; the update page publishes dated file updates. ([Default][1])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "sales_use_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"California"
],
"officialSourceName": "City and County Sales and Use Tax Rate Information",
"officialOwner": "California Department of Tax and Fee Administration",
"sourceUrls": [
"[https://cdtfa.ca.gov/taxes-and-fees/sales-use-tax-rates.htm](https://cdtfa.ca.gov/taxes-and-fees/sales-use-tax-rates.htm)",
"[https://maps.cdtfa.ca.gov/](https://maps.cdtfa.ca.gov/)",
"[https://cdtfa.ca.gov/taxes-and-fees/archive-rates.htm](https://cdtfa.ca.gov/taxes-and-fees/archive-rates.htm)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"XLSX",
"XLS",
"lookup tool",
"archived rate files"
],
"updateFrequency": "Quarterly or as CDTFA posts new effective-date files.",
"effectiveDateHandling": "Use CDTFA current effective-date files for current estimates and archived rate files for historic transaction dates.",
"addressOrGeographyJoinKeys": [
"address",
"city",
"county",
"district",
"ZIP"
],
"licensingOrUseNotes": "Official state source; use address lookup for precise district assignment when city/county names are ambiguous.",
"priority": "high",
"implementationNotes": "Evidence: CDTFA provides downloadable files for California city and county tax rates, an address lookup, and archived historic rate files with state/local/county/district components. ([CDTFA][2])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "sales_use_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Texas"
],
"officialSourceName": "Local Sales and Use Tax Rates and EDI Sales Tax Rate Files",
"officialOwner": "Texas Comptroller of Public Accounts",
"sourceUrls": [
"[https://comptroller.texas.gov/taxes/sales/city.php](https://comptroller.texas.gov/taxes/sales/city.php)",
"[https://comptroller.texas.gov/taxes/file-pay/edi/sales-tax-rates.php](https://comptroller.texas.gov/taxes/file-pay/edi/sales-tax-rates.php)",
"[https://comptroller.texas.gov/transparency/local/allocations/sales-tax/cities-by-county.php](https://comptroller.texas.gov/transparency/local/allocations/sales-tax/cities-by-county.php)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"XLSX",
"EDI rate files",
"PDF",
"open-data download"
],
"updateFrequency": "Current and historical files as posted by the Comptroller.",
"effectiveDateHandling": "Use the current or historical Comptroller file matching the transaction date; local rate changes must be tied to reported effective periods.",
"addressOrGeographyJoinKeys": [
"city",
"county",
"local taxing unit",
"special purpose district",
"transit authority",
"tax code"
],
"licensingOrUseNotes": "Official state source. Texas local rate tables are not a substitute for address-level boundary validation in overlapping districts.",
"priority": "high",
"implementationNotes": "Evidence: Texas publishes downloadable city-rate XLSX files, current and historical EDI sales-tax rate files, and local allocation/open data with rate-change history. ([Texas Comptroller][3])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "sales_use_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Washington"
],
"officialSourceName": "Sales Tax Rate Lookup URL Interface",
"officialOwner": "Washington State Department of Revenue",
"sourceUrls": [
"[https://dor.wa.gov/wa-sales-tax-rate-lookup-url-interface](https://dor.wa.gov/wa-sales-tax-rate-lookup-url-interface)",
"[https://webgis.dor.wa.gov/taxratelookup/salestax.aspx](https://webgis.dor.wa.gov/taxratelookup/salestax.aspx)",
"[https://dor.wa.gov/taxes-rates/retail-sales-tax/sales-and-use-tax-tools](https://dor.wa.gov/taxes-rates/retail-sales-tax/sales-and-use-tax-tools)"
],
"machineReadable": true,
"accessMethod": "API",
"fileFormats": [
"URL query response",
"lookup response"
],
"updateFrequency": "DOR-maintained live lookup/API; validate cache refresh cadence against API terms.",
"effectiveDateHandling": "Use the DOR lookup/API for current address-based rates; do not backcast unless DOR provides a historic rate endpoint or file for the period.",
"addressOrGeographyJoinKeys": [
"address",
"city",
"ZIP",
"latitude",
"longitude"
],
"licensingOrUseNotes": "Official state source; confirm interface terms and throttling limits before production use.",
"priority": "high",
"implementationNotes": "Evidence: Washington DOR describes a URL interface for direct address-based sales-tax lookup integration and a lookup tool that supports address, city, ZIP, map, and latitude/longitude inputs. ([Washington Department of Revenue][4])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "sales_use_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Colorado"
],
"officialSourceName": "Sales and Use Tax System GIS Database and API",
"officialOwner": "Colorado Department of Revenue",
"sourceUrls": [
"[https://tax.colorado.gov/GIS-info](https://tax.colorado.gov/GIS-info)",
"[https://tax.colorado.gov/GIS-API](https://tax.colorado.gov/GIS-API)",
"[https://tax.colorado.gov/SUTS-FAQ](https://tax.colorado.gov/SUTS-FAQ)",
"[https://tax.colorado.gov/SUTS-info](https://tax.colorado.gov/SUTS-info)"
],
"machineReadable": true,
"accessMethod": "API",
"fileFormats": [
"GIS API response",
"web lookup"
],
"updateFrequency": "State-maintained SUTS/GIS data; API access requires SUTS setup.",
"effectiveDateHandling": "Use GIS/SUTS current rate calculation for address-specific rates; maintain transaction-date snapshots for auditability.",
"addressOrGeographyJoinKeys": [
"address",
"map location",
"state",
"county",
"municipality",
"special district"
],
"licensingOrUseNotes": "Official state GIS/API source; API key requirements apply.",
"priority": "high",
"implementationNotes": "Evidence: Colorado DOR says its GIS supports individual address or map-location lookup and includes state, county, municipal, and special-district sales-tax information; the SUTS FAQ describes an API for retrieving sales-tax rate calculations from the GIS database. ([Colorado Department of Revenue][5])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "sales_use_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Ohio"
],
"officialSourceName": "The Finder Sales Tax Lookup, Rate Tables, and GIS Boundary Data",
"officialOwner": "Ohio Department of Taxation",
"sourceUrls": [
"[https://tax.ohio.gov/business/sales-and-use-tax](https://tax.ohio.gov/business/sales-and-use-tax)",
"[https://thefinder.tax.ohio.gov/streamlinesalestaxweb/default.aspx](https://thefinder.tax.ohio.gov/streamlinesalestaxweb/default.aspx)",
"[https://thefinder.tax.ohio.gov/streamlinesalestaxweb/Download/SSTPRateTableInstructions.aspx](https://thefinder.tax.ohio.gov/streamlinesalestaxweb/Download/SSTPRateTableInstructions.aspx)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"rate table",
"GIS boundary data",
"lookup tool"
],
"updateFrequency": "As posted by Ohio Department of Taxation.",
"effectiveDateHandling": "Use the rate-table effective period and matching GIS boundary version; do not rely on ZIP-only matching if address or latitude/longitude is available.",
"addressOrGeographyJoinKeys": [
"address",
"ZIP",
"latitude",
"longitude",
"county",
"taxing jurisdiction"
],
"licensingOrUseNotes": "Official state source.",
"priority": "high",
"implementationNotes": "Evidence: Ohio’s sales/use tax page links to downloadable tax rates and GIS boundary data, and The Finder supports lookup by address, ZIP, and latitude/longitude. ([Ohio Department of Taxation][6])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "sales_use_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Illinois"
],
"officialSourceName": "Sales Tax Machine-Readable Files and Tax Rate Finder",
"officialOwner": "Illinois Department of Revenue",
"sourceUrls": [
"[https://tax.illinois.gov/research/taxrates.html](https://tax.illinois.gov/research/taxrates.html)",
"[https://tax.illinois.gov/research/taxrates/sales-tax-rate-machine-readable-files.html](https://tax.illinois.gov/research/taxrates/sales-tax-rate-machine-readable-files.html)",
"[https://tax.illinois.gov/research/taxinformation/sales/rot.html](https://tax.illinois.gov/research/taxinformation/sales/rot.html)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"machine-readable rate files",
"layout guides",
"lookup tool"
],
"updateFrequency": "Local Illinois sales-tax rate changes generally occur January 1 and July 1; use official files as posted.",
"effectiveDateHandling": "Load jurisdiction-wide machine-readable files by effective period and retain prior versions for historic transactions.",
"addressOrGeographyJoinKeys": [
"jurisdiction",
"business location",
"destination",
"local tax code"
],
"licensingOrUseNotes": "Official state source.",
"priority": "high",
"implementationNotes": "Evidence: Illinois DOR publishes a Tax Rate Finder, property-tax tables, and downloadable sales-tax machine-readable files with file-format/layout guides. ([Illinois Department of Revenue][7])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "sales_use_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Florida"
],
"officialSourceName": "Discretionary Sales Surtax Rates and DR-15DSS",
"officialOwner": "Florida Department of Revenue",
"sourceUrls": [
"[https://floridarevenue.com/taxes/taxesfees/Pages/discretionary.aspx](https://floridarevenue.com/taxes/taxesfees/Pages/discretionary.aspx)",
"[https://pointmatch.floridarevenue.com/General/DiscretionarySalesSurtaxRates.aspx](https://pointmatch.floridarevenue.com/General/DiscretionarySalesSurtaxRates.aspx)",
"[https://floridarevenue.com/Pages/forms_index.aspx](https://floridarevenue.com/Pages/forms_index.aspx)",
"[https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx](https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx)"
],
"machineReadable": true,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML table",
"downloadable table where available",
"PDF form"
],
"updateFrequency": "DR-15DSS is updated yearly in November for the following calendar year; PointMatch displays current jurisdiction information.",
"effectiveDateHandling": "Use calendar-year DR-15DSS or current PointMatch data; retain prior annual files for historic transactions.",
"addressOrGeographyJoinKeys": [
"county",
"jurisdiction",
"delivery county"
],
"licensingOrUseNotes": "Official state source. County-level surtax data is not sufficient for all transaction-specific sourcing questions.",
"priority": "high",
"implementationNotes": "Evidence: Florida DOR identifies county discretionary surtax rates, says DR-15DSS is updated yearly in November, and provides a PointMatch table for current discretionary surtax information for all jurisdictions. ([Florida Department of Revenue][8])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "sales_use_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"New York"
],
"officialSourceName": "Sales Tax Rate Publications",
"officialOwner": "New York State Department of Taxation and Finance",
"sourceUrls": [
"[https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/sales_tax_rate_publications.htm](https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/sales_tax_rate_publications.htm)",
"[https://www.tax.ny.gov/bus/st/rates.htm](https://www.tax.ny.gov/bus/st/rates.htm)",
"[https://www.tax.ny.gov/pubs_and_bulls/publications/sales/st_pubs_and_bulls_by_number.htm](https://www.tax.ny.gov/pubs_and_bulls/publications/sales/st_pubs_and_bulls_by_number.htm)"
],
"machineReadable": false,
"accessMethod": "PDF",
"fileFormats": [
"PDF",
"HTML index"
],
"updateFrequency": "As rate publications and local-rate-change notices are posted.",
"effectiveDateHandling": "Use Pub 718 current rates and Pub 718-A enactment/effective/expiration dates; manual QA required for local-option addenda.",
"addressOrGeographyJoinKeys": [
"county",
"city",
"school district where applicable",
"locality code"
],
"licensingOrUseNotes": "Official state source but primarily manual/PDF; treat as official manual source until a verified machine-readable state file is identified.",
"priority": "high",
"implementationNotes": "Evidence: New York provides combined state/local sales-tax rate publications, Pub 718 current rates/codes, Pub 718-A effective/expiration dates, and local-option publications such as 718-F and 718-PPA. ([NY Taxation and Finance][9])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "sales_use_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Arizona"
],
"officialSourceName": "Transaction Privilege Tax Rate Table and Address Lookup",
"officialOwner": "Arizona Department of Revenue",
"sourceUrls": [
"[https://azdor.gov/business/transaction-privilege-tax/tax-rate-table](https://azdor.gov/business/transaction-privilege-tax/tax-rate-table)",
"[https://www.aztaxes.gov/Home/Address/](https://www.aztaxes.gov/Home/Address/)",
"[https://azdor.gov/news-center/latest-press-releases/tpt-newsletters/tpt-updates/archive/202508](https://azdor.gov/news-center/latest-press-releases/tpt-newsletters/tpt-updates/archive/202508)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"CSV",
"lookup response"
],
"updateFrequency": "Monthly or as TPT updates are posted; confirm CSV publication cadence.",
"effectiveDateHandling": "Use the rate table for the relevant month and business classification; preserve state/county/city/reservation components.",
"addressOrGeographyJoinKeys": [
"address",
"ZIP",
"jurisdiction",
"business classification",
"business code"
],
"licensingOrUseNotes": "Official state source.",
"priority": "high",
"implementationNotes": "Evidence: ADOR provides a TPT rate table by location, an AZTaxes address lookup for exact jurisdiction/rate, and downloadable CSV rate information for business classifications in TPT updates. ([Arizona Department of Revenue][10])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "sales_use_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Kansas"
],
"officialSourceName": "Sales Tax Rate Lookup and 5-Digit ZIP Excel Table",
"officialOwner": "Kansas Department of Revenue",
"sourceUrls": [
"[https://www.ksrevenue.gov/atrladdress.html](https://www.ksrevenue.gov/atrladdress.html)",
"[https://www.ksrevenue.gov/5digitzip.html](https://www.ksrevenue.gov/5digitzip.html)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"Excel",
"lookup response"
],
"updateFrequency": "As KDOR posts rate-table updates.",
"effectiveDateHandling": "Use the official address lookup for precise current rates; use the Excel table as a bulk import with effective-period versioning.",
"addressOrGeographyJoinKeys": [
"address",
"city",
"ZIP",
"jurisdiction code"
],
"licensingOrUseNotes": "Official state source. ZIP-level table should not override address-level lookup where districts overlap.",
"priority": "medium",
"implementationNotes": "Evidence: Kansas DOR provides an official address lookup and an Excel download by city/ZIP with rates and jurisdiction codes. ([Kansas Department of Revenue][11])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "sales_use_tax",
"jurisdictionLevel": "mixed",
"jurisdictionsCovered": [
"Louisiana"
],
"officialSourceName": "Louisiana Uniform Local Sales Tax Board Lookup and Louisiana Department of Revenue State Sales Tax Sources",
"officialOwner": "Louisiana Uniform Local Sales Tax Board and Louisiana Department of Revenue",
"sourceUrls": [
"[https://lulstb.com/](https://lulstb.com/)",
"[https://lataonline.org/](https://lataonline.org/)",
"[https://revenue.louisiana.gov/businesses/sales-taxes/general-sales-use-tax/](https://revenue.louisiana.gov/businesses/sales-taxes/general-sales-use-tax/)"
],
"machineReadable": false,
"accessMethod": "lookup_tool",
"fileFormats": [
"lookup response",
"bulk lookup output where authorized",
"PDF/HTML state-rate source"
],
"updateFrequency": "Lookup-tool data as maintained by the local board; LDR state sources as posted.",
"effectiveDateHandling": "Use the official lookup for current address/location determinations; verify whether bulk lookup supports historic dates before use for past transactions.",
"addressOrGeographyJoinKeys": [
"address",
"geocode",
"parish",
"local collector",
"jurisdiction"
],
"licensingOrUseNotes": "Official local/state sources, but bulk access terms and historic-date support require legal/technical review.",
"priority": "high",
"implementationNotes": "Evidence: the Louisiana local sales-tax board/LATA pages identify free tax-rate lookup and bulk lookup tools, while LDR separately publishes state sales/use tax materials. ([Louisiana Uniform Local Sales Tax Board][12])",
"sourceConfidence": "medium"
},
{
"taxDataFamily": "sales_use_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Georgia"
],
"officialSourceName": "Sales Tax Rates, Current, Historical, and Upcoming",
"officialOwner": "Georgia Department of Revenue",
"sourceUrls": [
"[https://dor.georgia.gov/taxes/sales-use-tax/sales-tax-rates-current-historical-and-upcoming](https://dor.georgia.gov/taxes/sales-use-tax/sales-tax-rates-current-historical-and-upcoming)",
"[https://dor.georgia.gov/sales-tax-rates-general](https://dor.georgia.gov/sales-tax-rates-general)",
"[https://dor.georgia.gov/historical-sales-tax-chart](https://dor.georgia.gov/historical-sales-tax-chart)"
],
"machineReadable": false,
"accessMethod": "PDF",
"fileFormats": [
"PDF",
"HTML index"
],
"updateFrequency": "Quarterly and as upcoming/historic rate charts are posted.",
"effectiveDateHandling": "Use the chart matching the sale date; manual extraction/QA needed before production import.",
"addressOrGeographyJoinKeys": [
"county",
"jurisdiction",
"local tax type"
],
"licensingOrUseNotes": "Official state source but primarily manual/PDF.",
"priority": "medium",
"implementationNotes": "Evidence: Georgia DOR publishes current, historical, and upcoming sales-tax rates, including quarterly general rate charts and historical charts. ([Department of Revenue][13])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "sales_use_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Tennessee"
],
"officialSourceName": "Streamlined Sales Tax Rate and Boundary Data",
"officialOwner": "Tennessee Department of Revenue",
"sourceUrls": [
"[https://www.tn.gov/revenue/taxes/sales-and-use-tax/streamlined-sales-tax.html](https://www.tn.gov/revenue/taxes/sales-and-use-tax/streamlined-sales-tax.html)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"sales tax rate tables",
"boundary database"
],
"updateFrequency": "As Tennessee posts updated rate tables and boundary databases.",
"effectiveDateHandling": "Use the state-posted effective date for rate tables and boundary database versions.",
"addressOrGeographyJoinKeys": [
"address",
"boundary code",
"jurisdiction",
"ZIP"
],
"licensingOrUseNotes": "Official state/SST source.",
"priority": "medium",
"implementationNotes": "Evidence: Tennessee DOR links to sales-tax rate tables and a boundary database with stated effective dates. ([Tennessee State Government][14])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "sales_use_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Minnesota"
],
"officialSourceName": "Streamlined Sales and Use Tax Rates and Boundaries",
"officialOwner": "Minnesota Department of Revenue",
"sourceUrls": [
"[https://www.revenue.state.mn.us/streamlined-sales-and-use-tax](https://www.revenue.state.mn.us/streamlined-sales-and-use-tax)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"rates data",
"boundaries data"
],
"updateFrequency": "Updated quarterly according to Minnesota Revenue.",
"effectiveDateHandling": "Import quarterly rates and boundaries as separate versions; use the version effective on the transaction date.",
"addressOrGeographyJoinKeys": [
"address",
"ZIP",
"jurisdiction code",
"boundary code"
],
"licensingOrUseNotes": "Official state/SST source.",
"priority": "medium",
"implementationNotes": "Evidence: Minnesota Revenue says SST rates and boundaries data are updated quarterly and are available for download. ([Minnesota Department of Revenue][15])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "special_district_boundary",
"jurisdictionLevel": "federal",
"jurisdictionsCovered": [
"United States"
],
"officialSourceName": "TIGER/Line Shapefiles and Boundary Files",
"officialOwner": "U.S. Census Bureau",
"sourceUrls": [
"[https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html](https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html)",
"[https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html](https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html)",
"[https://www.census.gov/programs-surveys/sdrp/updates/school-district-boundaries.html](https://www.census.gov/programs-surveys/sdrp/updates/school-district-boundaries.html)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"Shapefile",
"File geodatabase",
"GeoPackage",
"KML"
],
"updateFrequency": "Annual or as Census releases new vintages.",
"effectiveDateHandling": "Use the boundary vintage date; Census legal-boundary files do not by themselves encode tax-rate effective dates.",
"addressOrGeographyJoinKeys": [
"GEOID",
"state FIPS",
"county FIPS",
"place FIPS",
"school district code",
"geometry"
],
"licensingOrUseNotes": "Official federal boundary source; suitable for geography joins but not a tax-rate source.",
"priority": "high",
"implementationNotes": "Evidence: Census publishes TIGER/Line legal-boundary files, cartographic boundary files in multiple GIS formats, and school district boundaries released through TIGER/Line. ([Census.gov][16])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "parcel_boundary",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Florida"
],
"officialSourceName": "Property Tax Oversight Data Portal, Assessment Roll, and Statewide Parcels",
"officialOwner": "Florida Department of Revenue and Florida Geographic Information Office",
"sourceUrls": [
"[https://floridarevenue.com/property/Pages/DataPortal.aspx](https://floridarevenue.com/property/Pages/DataPortal.aspx)",
"[https://floridarevenue.com/property/Pages/DataPortal_RequestAssessmentRollGISData.aspx](https://floridarevenue.com/property/Pages/DataPortal_RequestAssessmentRollGISData.aspx)",
"[https://www.floridagio.gov/datasets/FGIO%3A%3Aflorida-statewide-parcels/about](https://www.floridagio.gov/datasets/FGIO%3A%3Aflorida-statewide-parcels/about)",
"[https://floridarevenue.com/property/Pages/DataPortal_DataBook.aspx](https://floridarevenue.com/property/Pages/DataPortal_DataBook.aspx)",
"[https://floridarevenue.com/property/Pages/LocalOfficials.aspx](https://floridarevenue.com/property/Pages/LocalOfficials.aspx)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"tax roll files",
"GIS data",
"statewide parcel layer",
"data book"
],
"updateFrequency": "Annual assessment rolls and data books; GIS parcel layer as maintained by state/county contributors.",
"effectiveDateHandling": "Use tax-roll year, January 1 assessment date, and county appraiser/collector effective periods; do not mix roll years.",
"addressOrGeographyJoinKeys": [
"parcel ID",
"county",
"property address",
"tax roll year",
"GIS geometry"
],
"licensingOrUseNotes": "Official state/county-derived source. Parcel-specific bill status remains a county tax collector fact.",
"priority": "high",
"implementationNotes": "Evidence: Florida DOR provides a property-tax data portal, statewide parcel/GIS request path, and valuation/millage/tax data book; the statewide parcels layer is compiled from each of Florida’s 67 county property appraisers. ([Florida Department of Revenue][17])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "property_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Texas"
],
"officialSourceName": "Property Tax Rates and Levies",
"officialOwner": "Texas Comptroller of Public Accounts",
"sourceUrls": [
"[https://comptroller.texas.gov/taxes/property-tax/rates/](https://comptroller.texas.gov/taxes/property-tax/rates/)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"XLSX"
],
"updateFrequency": "Annual or as reported by taxing units to the Comptroller.",
"effectiveDateHandling": "Use the tax year and taxing-unit reporting year; do not infer parcel tax without appraisal district value and exemption data.",
"addressOrGeographyJoinKeys": [
"taxing unit",
"school district",
"city",
"county",
"special district",
"tax year"
],
"licensingOrUseNotes": "Official state source for reported rates/levies; parcel valuation and exemptions must come from county appraisal districts.",
"priority": "high",
"implementationNotes": "Evidence: Texas Comptroller publishes XLSX files for school, city, county, and special-district property tax rates and levies reported by taxing units. ([Texas Comptroller][18])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "property_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"New York"
],
"officialSourceName": "ORPTS Municipal Data Portal, Real Property Tax Rates and Levy Data, and Statewide Parcel Resources",
"officialOwner": "New York State Department of Taxation and Finance, Office of Real Property Tax Services, New York State GIS Program Office, and Office of the State Comptroller",
"sourceUrls": [
"[https://www.tax.ny.gov/pit/property/munidataportal.htm](https://www.tax.ny.gov/pit/property/munidataportal.htm)",
"[https://catalog.data.gov/dataset/real-property-tax-rates-levy-data-by-municipality-beginning-2004](https://catalog.data.gov/dataset/real-property-tax-rates-levy-data-by-municipality-beginning-2004)",
"[https://gis.ny.gov/parcels](https://gis.ny.gov/parcels)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"open data",
"GIS service",
"download"
],
"updateFrequency": "Annual for tax-rate/levy files; parcel resources as state GIS updates.",
"effectiveDateHandling": "Use levy/tax-rate fiscal year, assessment-roll date, equalization rate date, and parcel data vintage separately.",
"addressOrGeographyJoinKeys": [
"SWIS code",
"municipality",
"school district segment",
"parcel centroid",
"tax map parcel identifier"
],
"licensingOrUseNotes": "Official state sources; use local assessor/collector data for parcel bills, exemptions, and abatement status.",
"priority": "high",
"implementationNotes": "Evidence: NY ORPTS provides municipal property profiles with equalization rates and roll dates; Data.gov lists annual real-property tax-rate and levy data by municipality; NY GIS publishes tax-parcel centroid and state-owned parcel GIS data. ([NY Taxation and Finance][19])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "parcel_boundary",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Massachusetts"
],
"officialSourceName": "MassGIS Property Tax Parcels",
"officialOwner": "MassGIS",
"sourceUrls": [
"[https://www.mass.gov/info-details/massgis-data-property-tax-parcels](https://www.mass.gov/info-details/massgis-data-property-tax-parcels)",
"[https://gis.data.mass.gov/](https://gis.data.mass.gov/)",
"[https://geo-massdot.opendata.arcgis.com/maps/b5f19318e90841d4bcf15e97b55851b7](https://geo-massdot.opendata.arcgis.com/maps/b5f19318e90841d4bcf15e97b55851b7)"
],
"machineReadable": true,
"accessMethod": "GIS_service",
"fileFormats": [
"Shapefile",
"File geodatabase",
"ArcGIS feature service"
],
"updateFrequency": "As municipalities and MassGIS publish updates.",
"effectiveDateHandling": "Use the parcel layer vintage and municipal assessor fiscal year; do not assume parcel geometry and assessed-value tables have identical effective dates.",
"addressOrGeographyJoinKeys": [
"municipality",
"map/lot",
"local parcel identifier",
"site address",
"geometry"
],
"licensingOrUseNotes": "Official state GIS source derived from local assessor data.",
"priority": "high",
"implementationNotes": "Evidence: MassGIS describes standardized assessor parcel mapping with land lot boundaries and downloadable city/town data; the ArcGIS item states the boundaries and database information come from community assessors. ([Massachusetts Government][20])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "parcel_boundary",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Wisconsin"
],
"officialSourceName": "Statewide Parcel Map Initiative",
"officialOwner": "Wisconsin State Cartographer's Office",
"sourceUrls": [
"[https://www.sco.wisc.edu/parcels/data/](https://www.sco.wisc.edu/parcels/data/)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"File geodatabase",
"Shapefile"
],
"updateFrequency": "Versioned statewide releases.",
"effectiveDateHandling": "Use release version and county source vintage; parcel geometry is not a property-tax bill or exemption determination.",
"addressOrGeographyJoinKeys": [
"parcel ID",
"county",
"site address",
"municipality",
"geometry"
],
"licensingOrUseNotes": "Official statewide parcel aggregation; confirm county attribution requirements.",
"priority": "high",
"implementationNotes": "Evidence: the Wisconsin parcel program publishes a statewide parcel dataset, individual county datasets, and downloadable geodatabase/shapefile formats. ([State Cartographer's Office][21])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "parcel_boundary",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Washington"
],
"officialSourceName": "Current Parcels and County Assessor/Treasurer Index",
"officialOwner": "Washington State Geospatial Program and Washington Department of Revenue",
"sourceUrls": [
"[https://geo.wa.gov/maps/2b603a599a0842a3b2284c04c8927f35](https://geo.wa.gov/maps/2b603a599a0842a3b2284c04c8927f35)",
"[https://dor.wa.gov/taxes-rates/property-tax/county-assessor-and-treasurer-websites](https://dor.wa.gov/taxes-rates/property-tax/county-assessor-and-treasurer-websites)",
"[https://dor.wa.gov/about/statistics-reports/property-tax-statistics](https://dor.wa.gov/about/statistics-reports/property-tax-statistics)"
],
"machineReadable": true,
"accessMethod": "GIS_service",
"fileFormats": [
"GDB",
"ArcGIS feature layer",
"web directory"
],
"updateFrequency": "Statewide parcel layer as updated; local assessor/treasurer data as each county updates.",
"effectiveDateHandling": "Use parcel layer update date, county assessment year, and tax-year levy/bill dates separately.",
"addressOrGeographyJoinKeys": [
"parcel number",
"county",
"site address",
"geometry",
"taxing district"
],
"licensingOrUseNotes": "Official state GIS layer plus official county-source directory. County assessor/treasurer remains the parcel-specific authority.",
"priority": "high",
"implementationNotes": "Evidence: Washington GeoPortal provides statewide tax-parcel data with direct geodatabase download; DOR states property tax is administered locally and provides county assessor/treasurer links, while DOR also publishes property-tax statistics. ([Washington Geospatial Open Data Portal][22])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "parcel_boundary",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"North Carolina"
],
"officialSourceName": "NC Parcels",
"officialOwner": "NC OneMap",
"sourceUrls": [
"[https://www.nconemap.gov/pages/parcels](https://www.nconemap.gov/pages/parcels)"
],
"machineReadable": true,
"accessMethod": "GIS_service",
"fileFormats": [
"standardized parcel dataset",
"GIS service"
],
"updateFrequency": "As NC OneMap standardizes and republishes county/EBCI parcel data.",
"effectiveDateHandling": "Use dataset vintage and county source date; tax bills, exemptions, and appraised values require county validation.",
"addressOrGeographyJoinKeys": [
"parcel ID",
"county",
"address",
"geometry"
],
"licensingOrUseNotes": "Official state parcel aggregation.",
"priority": "medium",
"implementationNotes": "Evidence: NC OneMap says its parcels transformer standardizes parcel data from all 100 counties and the Eastern Band of Cherokee Indians. ([NC OneMap][23])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "property_tax",
"jurisdictionLevel": "county",
"jurisdictionsCovered": [
"Cook County, Illinois"
],
"officialSourceName": "Cook County Assessor Community Data and Assessed Values",
"officialOwner": "Cook County Assessor's Office",
"sourceUrls": [
"[https://www.cookcountyassessoril.gov/community-data](https://www.cookcountyassessoril.gov/community-data)",
"[https://datacatalog.cookcountyil.gov/Property-Taxation/Assessor-Assessed-Values/uzyt-m557](https://datacatalog.cookcountyil.gov/Property-Taxation/Assessor-Assessed-Values/uzyt-m557)",
"[https://www.cookcountyassessoril.gov/news/cook-county-assessor-publishes-20-years-historic-assessment-data](https://www.cookcountyassessoril.gov/news/cook-county-assessor-publishes-20-years-historic-assessment-data)"
],
"machineReadable": true,
"accessMethod": "API",
"fileFormats": [
"Socrata API",
"CSV",
"JSON",
"data catalog export"
],
"updateFrequency": "As Assessor/data catalog publishes assessment updates.",
"effectiveDateHandling": "Use assessment year, reassessment cycle, and parcel PIN; tax bills require Treasurer/Clerk rate and collection data.",
"addressOrGeographyJoinKeys": [
"PIN",
"property address",
"township",
"assessment year"
],
"licensingOrUseNotes": "Official county assessor data. Final tax liability requires full Cook County property-tax pipeline.",
"priority": "high",
"implementationNotes": "Evidence: Cook County Assessor publishes community data and assessed-value datasets; the county data catalog covers land, building, and total assessed values for parcels, and the assessor announced 20 years of historic assessment data. ([Cook County Assessor's Office][24])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "property_tax",
"jurisdictionLevel": "city",
"jurisdictionsCovered": [
"New York City"
],
"officialSourceName": "NYC Department of Finance Property Tax, Rates, All Property Data, and ACRIS",
"officialOwner": "New York City Department of Finance",
"sourceUrls": [
"[https://www.nyc.gov/site/finance/taxes/property.page](https://www.nyc.gov/site/finance/taxes/property.page)",
"[https://www.nyc.gov/site/finance/property/property-tax-rates.page](https://www.nyc.gov/site/finance/property/property-tax-rates.page)",
"[https://www.nyc.gov/assets/finance/jump/nycproperty.html](https://www.nyc.gov/assets/finance/jump/nycproperty.html)",
"[https://www.nyc.gov/site/finance/property/acris.page](https://www.nyc.gov/site/finance/property/acris.page)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"download files",
"lookup pages",
"ACRIS records"
],
"updateFrequency": "Annual tax-year rates and assessment notices; ACRIS as records are filed.",
"effectiveDateHandling": "Use NYC tax year, tax class, BBL, assessment roll status, and filed-record date separately.",
"addressOrGeographyJoinKeys": [
"BBL",
"borough",
"block",
"lot",
"address",
"tax class"
],
"licensingOrUseNotes": "Official city source. Lookup pages may warn data may not be current; use official tax-year files for stored estimates.",
"priority": "high",
"implementationNotes": "Evidence: NYC DOF publishes property-tax information, tax-year property rates, all-property data downloads, and ACRIS records searchable by BBL/address and document data. ([NYC.gov][25])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "assessor_boundary",
"jurisdictionLevel": "county",
"jurisdictionsCovered": [
"United States county-by-county gap"
],
"officialSourceName": "County Assessor, Treasurer, Collector, Auditor, and Clerk Sources",
"officialOwner": "County and local property tax officials",
"sourceUrls": [],
"machineReadable": false,
"accessMethod": "unknown",
"fileFormats": [
"lookup tool",
"PDF",
"CSV where locally available",
"GIS service where locally available"
],
"updateFrequency": "Varies by county and tax year.",
"effectiveDateHandling": "Use the county assessment date, levy date, tax-bill date, delinquency date, and exemption filing year exactly as published by the local official.",
"addressOrGeographyJoinKeys": [
"parcel ID",
"tax account number",
"owner name where legally usable",
"site address",
"taxing district",
"millage code"
],
"licensingOrUseNotes": "No single official national parcel-tax bill database was identified. Use official county sources for parcel bills, exemptions, abatements, special assessments, and payment status.",
"priority": "high",
"implementationNotes": "Safest user-facing behavior: when a parcel-specific assessor/treasurer source is not imported, show a geography-derived estimate only and ask for a tax bill, parcel number, or county lookup confirmation before presenting a precise liability.",
"sourceConfidence": "medium"
},
{
"taxDataFamily": "state_business_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Texas"
],
"officialSourceName": "Franchise Tax Rates, Thresholds, and Forms",
"officialOwner": "Texas Comptroller of Public Accounts",
"sourceUrls": [
"[https://comptroller.texas.gov/taxes/franchise/](https://comptroller.texas.gov/taxes/franchise/)",
"[https://comptroller.texas.gov/taxes/franchise/forms/2026-franchise.php](https://comptroller.texas.gov/taxes/franchise/forms/2026-franchise.php)",
"[https://comptroller.texas.gov/taxes/publications/98-806.php](https://comptroller.texas.gov/taxes/publications/98-806.php)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"PDF/forms"
],
"updateFrequency": "Annual report year/forms as posted.",
"effectiveDateHandling": "Use report year and accounting-year rules from official forms/instructions.",
"addressOrGeographyJoinKeys": [
"Texas nexus",
"entity type",
"report year",
"NAICS/activity where applicable"
],
"licensingOrUseNotes": "Official state source; taxpayer-specific margin, apportionment, deductions, and exemptions require user/project facts.",
"priority": "high",
"implementationNotes": "Evidence: Texas Comptroller publishes franchise-tax rate/threshold pages, report-year forms, and an official overview. ([Texas Comptroller][26])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "state_business_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Ohio"
],
"officialSourceName": "Commercial Activity Tax",
"officialOwner": "Ohio Department of Taxation",
"sourceUrls": [
"[https://tax.ohio.gov/business/commercial-activity-tax](https://tax.ohio.gov/business/commercial-activity-tax)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"forms/instructions"
],
"updateFrequency": "As Ohio posts tax-year updates.",
"effectiveDateHandling": "Use tax period and calendar-year statutory changes; do not apply rates without taxable gross receipts facts.",
"addressOrGeographyJoinKeys": [
"Ohio sitused gross receipts",
"filing period",
"taxpayer account"
],
"licensingOrUseNotes": "Official state source; estimate confidence depends on taxpayer-specific Ohio gross receipts and exclusions.",
"priority": "high",
"implementationNotes": "Evidence: Ohio Taxation maintains the Commercial Activity Tax page and describes current statutory changes including post-2024 updates. ([Ohio Department of Taxation][27])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "state_business_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Washington"
],
"officialSourceName": "Business and Occupation Tax Classifications and Rates",
"officialOwner": "Washington State Department of Revenue",
"sourceUrls": [
"[https://dor.wa.gov/taxes-rates/business-occupation-tax](https://dor.wa.gov/taxes-rates/business-occupation-tax)",
"[https://dor.wa.gov/open-business/apply-business-license/plan-taxes/business-and-occupation-bo-tax-classification-definitions](https://dor.wa.gov/open-business/apply-business-license/plan-taxes/business-and-occupation-bo-tax-classification-definitions)",
"[https://dor.wa.gov/forms-publications/publications-subject/special-notices/service-and-other-activities-rate-changes](https://dor.wa.gov/forms-publications/publications-subject/special-notices/service-and-other-activities-rate-changes)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"special notices"
],
"updateFrequency": "As DOR updates classifications, rates, and special notices.",
"effectiveDateHandling": "Use activity classification, tax period, and any special-notice effective date.",
"addressOrGeographyJoinKeys": [
"Washington nexus",
"business activity classification",
"gross receipts",
"tax period"
],
"licensingOrUseNotes": "Official state source; classification is taxpayer/project-specific and must not be inferred solely from geography.",
"priority": "high",
"implementationNotes": "Evidence: Washington DOR says B&O is a gross-receipts tax with more than 50 classifications, provides classification definitions/rates, and posts effective-date notices for rate changes. ([Washington Department of Revenue][28])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "state_business_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Oregon"
],
"officialSourceName": "Corporate Activity Tax and Corporation Excise/Income Tax",
"officialOwner": "Oregon Department of Revenue",
"sourceUrls": [
"[https://www.oregon.gov/dor/programs/businesses/pages/corporate-activity-tax.aspx](https://www.oregon.gov/dor/programs/businesses/pages/corporate-activity-tax.aspx)",
"[https://www.oregon.gov/dor/programs/businesses/pages/corp-requirements.aspx](https://www.oregon.gov/dor/programs/businesses/pages/corp-requirements.aspx)",
"[https://www.oregon.gov/dor/forms/pages/default.aspx](https://www.oregon.gov/dor/forms/pages/default.aspx)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"forms",
"instructions"
],
"updateFrequency": "Tax-year forms and program pages as posted.",
"effectiveDateHandling": "Use tax year, filing period, and official form instructions.",
"addressOrGeographyJoinKeys": [
"Oregon commercial activity",
"Oregon nexus",
"tax year",
"entity type"
],
"licensingOrUseNotes": "Official state source; CAT and corporation tax estimates require taxpayer-specific receipts, apportionment, and entity facts.",
"priority": "high",
"implementationNotes": "Evidence: Oregon DOR maintains Corporate Activity Tax, corporate excise/income requirements, and official form pages. ([Oregon][29])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "state_business_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Delaware"
],
"officialSourceName": "Gross Receipts Tax",
"officialOwner": "Delaware Division of Revenue",
"sourceUrls": [
"[https://revenue.delaware.gov/frequently-asked-questions/gross-receipts-tax-faqs/](https://revenue.delaware.gov/frequently-asked-questions/gross-receipts-tax-faqs/)",
"[https://revenue.delaware.gov/business-tax-forms/doing-business-in-delaware/step-4-gross-receipts-taxes/](https://revenue.delaware.gov/business-tax-forms/doing-business-in-delaware/step-4-gross-receipts-taxes/)",
"[https://revenue.delaware.gov/business-tax-forms/gross-receipts-tax-forms/](https://revenue.delaware.gov/business-tax-forms/gross-receipts-tax-forms/)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"online filing forms",
"PDF/forms"
],
"updateFrequency": "As Delaware updates forms and GRT guidance.",
"effectiveDateHandling": "Use tax period and business activity category; do not apply activity rates without taxpayer classification.",
"addressOrGeographyJoinKeys": [
"Delaware business activity",
"license category",
"gross receipts",
"tax period"
],
"licensingOrUseNotes": "Official state source; taxpayer classification and exclusions require user/project facts.",
"priority": "medium",
"implementationNotes": "Evidence: Delaware Division of Revenue states GRT is imposed on total gross revenues with rates varying by business activity, and it publishes GRT forms/online filing materials. ([Division of Revenue - State of Delaware][30])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "state_business_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Tennessee"
],
"officialSourceName": "Franchise and Excise Tax",
"officialOwner": "Tennessee Department of Revenue",
"sourceUrls": [
"[https://www.tn.gov/revenue/taxes/franchise---excise-tax.html](https://www.tn.gov/revenue/taxes/franchise---excise-tax.html)",
"[https://www.tn.gov/revenue/taxes/franchise---excise-tax/due-dates-and-tax-rates.html](https://www.tn.gov/revenue/taxes/franchise---excise-tax/due-dates-and-tax-rates.html)",
"[https://www.tn.gov/revenue/taxes/franchise---excise-tax/forms.html](https://www.tn.gov/revenue/taxes/franchise---excise-tax/forms.html)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"forms"
],
"updateFrequency": "Annual forms and rate pages as posted.",
"effectiveDateHandling": "Use tax year, accounting period, and official due-date/rate page.",
"addressOrGeographyJoinKeys": [
"Tennessee nexus",
"entity type",
"net worth",
"income",
"tax year"
],
"licensingOrUseNotes": "Official state source; taxpayer balance-sheet and income facts are required.",
"priority": "medium",
"implementationNotes": "Evidence: Tennessee DOR describes franchise tax as based on net worth and excise tax as based on income, and publishes due-date/rate and form pages. ([Tennessee State Government][31])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "state_business_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"New York"
],
"officialSourceName": "Corporation Tax Article 9-A and CT-3 Instructions",
"officialOwner": "New York State Department of Taxation and Finance",
"sourceUrls": [
"[https://www.tax.ny.gov/bus/ct/ctidx.htm](https://www.tax.ny.gov/bus/ct/ctidx.htm)",
"[https://www.tax.ny.gov/bus/ct/article9a.htm](https://www.tax.ny.gov/bus/ct/article9a.htm)",
"[https://www.tax.ny.gov/forms/current-forms/ct/ct3i.htm](https://www.tax.ny.gov/forms/current-forms/ct/ct3i.htm)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"form instructions"
],
"updateFrequency": "Tax-year forms and instructions as posted.",
"effectiveDateHandling": "Use tax year, Article 9-A basis, and CT-3 instruction year.",
"addressOrGeographyJoinKeys": [
"New York nexus",
"tax year",
"corporation type",
"income base",
"capital base",
"fixed-dollar minimum tier"
],
"licensingOrUseNotes": "Official state source; tax-base and manufacturer/QETC status are taxpayer-specific.",
"priority": "high",
"implementationNotes": "Evidence: New York Taxation publishes corporation tax and Article 9-A pages; CT-3 instructions describe multiple bases and tax-rate schedules by taxpayer category. ([NY Taxation and Finance][32])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "state_business_tax",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"California"
],
"officialSourceName": "Corporation and S Corporation Tax Forms and Rates",
"officialOwner": "California Franchise Tax Board",
"sourceUrls": [
"[https://www.ftb.ca.gov/file/business/types/corporations/c-corporations.html](https://www.ftb.ca.gov/file/business/types/corporations/c-corporations.html)",
"[https://www.ftb.ca.gov/file/business/types/corporations/s-corporations.html](https://www.ftb.ca.gov/file/business/types/corporations/s-corporations.html)",
"[https://www.ftb.ca.gov/forms/search/](https://www.ftb.ca.gov/forms/search/)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"forms",
"instructions"
],
"updateFrequency": "Tax-year forms and FTB pages as posted.",
"effectiveDateHandling": "Use tax year, entity type, and official form/instruction year.",
"addressOrGeographyJoinKeys": [
"California nexus",
"entity type",
"tax year",
"business income"
],
"licensingOrUseNotes": "Official state source; liability depends on taxpayer entity type, apportionment, credits, and exemptions.",
"priority": "high",
"implementationNotes": "Evidence: California FTB publishes corporation and S corporation pages and a searchable official forms database by tax year and taxpayer/form type. ([State of California Franchise Tax Board][33])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "local_business_tax",
"jurisdictionLevel": "city",
"jurisdictionsCovered": [
"Seattle, Washington"
],
"officialSourceName": "Seattle Business and Occupation Tax",
"officialOwner": "City of Seattle Department of Finance and Administrative Services",
"sourceUrls": [
"[https://www.seattle.gov/city-finance/business-taxes-and-licenses/business-taxes](https://www.seattle.gov/city-finance/business-taxes-and-licenses/business-taxes)",
"[https://www.seattle.gov/city-finance/business-taxes-and-licenses/business-taxes/seattle-shield-business-and-occupation-%28bando%29-tax-changes](https://www.seattle.gov/city-finance/business-taxes-and-licenses/business-taxes/seattle-shield-business-and-occupation-%28bando%29-tax-changes)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"online filing guidance"
],
"updateFrequency": "As city tax pages and filing guidance are updated.",
"effectiveDateHandling": "Use city tax year and effective dates for threshold/rate changes.",
"addressOrGeographyJoinKeys": [
"Seattle business location",
"business activity",
"gross receipts",
"tax year"
],
"licensingOrUseNotes": "Official city source; business activity and apportionment facts are taxpayer-specific.",
"priority": "high",
"implementationNotes": "Evidence: Seattle publishes business-tax guidance, filing/reporting pages, and Seattle Shield B&O threshold/rule changes effective for 2026. ([Seattle.gov][34])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "local_business_tax",
"jurisdictionLevel": "city",
"jurisdictionsCovered": [
"San Francisco, California"
],
"officialSourceName": "Gross Receipts Tax and Proposition M Business Tax Reform",
"officialOwner": "San Francisco Office of the Treasurer and Tax Collector",
"sourceUrls": [
"[https://sftreasurer.org/business/taxes-fees/gross-receipts-tax-gr-0](https://sftreasurer.org/business/taxes-fees/gross-receipts-tax-gr-0)",
"[https://sftreasurer.org/proposition-m-2024-business-tax-reform](https://sftreasurer.org/proposition-m-2024-business-tax-reform)",
"[https://codelibrary.amlegal.com/codes/san_francisco/latest/sf_business/0-0-0-51593](https://codelibrary.amlegal.com/codes/san_francisco/latest/sf_business/0-0-0-51593)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"municipal code"
],
"updateFrequency": "Tax-year city pages and municipal-code updates as posted.",
"effectiveDateHandling": "Use tax year, business activity category, and Proposition M transition rules.",
"addressOrGeographyJoinKeys": [
"San Francisco business activity",
"gross receipts",
"tax year",
"NAICS/activity category"
],
"licensingOrUseNotes": "Official city/code sources; taxpayer classification and apportionment require user facts.",
"priority": "high",
"implementationNotes": "Evidence: San Francisco publishes gross-receipts tax tables for 2025 and 2026, Proposition M business-tax reform information, and municipal-code rate provisions. ([Treasurer & Tax Collector][35])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "local_business_tax",
"jurisdictionLevel": "city",
"jurisdictionsCovered": [
"Philadelphia, Pennsylvania"
],
"officialSourceName": "Business Income and Receipts Tax",
"officialOwner": "City of Philadelphia Department of Revenue",
"sourceUrls": [
"[https://www.phila.gov/services/payments-assistance-taxes/taxes/business-taxes/business-taxes-by-type/business-income-receipts-tax-birt/](https://www.phila.gov/services/payments-assistance-taxes/taxes/business-taxes/business-taxes-by-type/business-income-receipts-tax-birt/)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"forms/guidance"
],
"updateFrequency": "As Philadelphia updates tax-year pages and forms.",
"effectiveDateHandling": "Use tax year and BIRT rate component effective dates.",
"addressOrGeographyJoinKeys": [
"Philadelphia business activity",
"gross receipts",
"net income",
"tax year"
],
"licensingOrUseNotes": "Official city source; gross-receipts and net-income components depend on taxpayer facts.",
"priority": "high",
"implementationNotes": "Evidence: Philadelphia publishes its BIRT page with rate components and business-tax filing guidance. ([City of Philadelphia][36])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "local_business_tax",
"jurisdictionLevel": "city",
"jurisdictionsCovered": [
"New York City"
],
"officialSourceName": "Business Corporation Tax",
"officialOwner": "New York City Department of Finance",
"sourceUrls": [
"[https://www.nyc.gov/site/finance/business/business-corporation-tax.page](https://www.nyc.gov/site/finance/business/business-corporation-tax.page)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"forms"
],
"updateFrequency": "Tax-year city pages and forms as posted.",
"effectiveDateHandling": "Use tax year, NYC corporation-tax base, and official form instructions.",
"addressOrGeographyJoinKeys": [
"NYC nexus",
"corporation type",
"business income base",
"capital base",
"tax year"
],
"licensingOrUseNotes": "Official city source; calculation depends on taxpayer entity, base, apportionment, credits, and exclusions.",
"priority": "high",
"implementationNotes": "Evidence: NYC DOF publishes business corporation tax information and business-income-base rate categories. ([NYC.gov][37])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "local_business_tax",
"jurisdictionLevel": "mixed",
"jurisdictionsCovered": [
"Portland, Oregon",
"Multnomah County, Oregon",
"Metro, Oregon"
],
"officialSourceName": "Portland Business License Tax, Multnomah County Business Income Tax, and Metro Supportive Housing Services Business Income Tax",
"officialOwner": "City of Portland Revenue Division, Multnomah County, and Metro",
"sourceUrls": [
"[https://www.portland.gov/revenue/business-tax](https://www.portland.gov/revenue/business-tax)",
"[https://multco.us/info/multnomah-county-business-income-tax-mcbit](https://multco.us/info/multnomah-county-business-income-tax-mcbit)",
"[https://www.oregonmetro.gov/what-metro-does/housing-and-homelessness/supportive-housing-services/funding](https://www.oregonmetro.gov/what-metro-does/housing-and-homelessness/supportive-housing-services/funding)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"forms/guidance"
],
"updateFrequency": "As city/county/Metro update tax-year pages and forms.",
"effectiveDateHandling": "Use tax year and each jurisdiction’s filing threshold/effective period separately.",
"addressOrGeographyJoinKeys": [
"Portland business activity",
"Multnomah County nexus",
"Metro district nexus",
"gross receipts",
"net income",
"tax year"
],
"licensingOrUseNotes": "Official local/special-district sources; overlapping local taxes require separate jurisdiction tests.",
"priority": "high",
"implementationNotes": "Evidence: Portland publishes business tax guidance including local rates/thresholds; Multnomah publishes MCBIT guidance; Metro publishes SHS business income tax funding/rule information. ([Portland.gov][38])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "local_business_tax",
"jurisdictionLevel": "city",
"jurisdictionsCovered": [
"Los Angeles, California"
],
"officialSourceName": "Los Angeles Business Tax and Gross Receipts Rate Categories",
"officialOwner": "City of Los Angeles Office of Finance",
"sourceUrls": [
"[https://finance.lacity.gov/tax-education/business-taxes/know-your-rates](https://finance.lacity.gov/tax-education/business-taxes/know-your-rates)",
"[https://finance.lacity.gov/tax-information-booklet](https://finance.lacity.gov/tax-information-booklet)",
"[https://finance.lacity.gov/tax-education/business-taxes/about-business-tax](https://finance.lacity.gov/tax-education/business-taxes/about-business-tax)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"PDF booklet"
],
"updateFrequency": "Annual tax booklet and city page updates.",
"effectiveDateHandling": "Use business-tax year, gross-receipts category, and current city booklet.",
"addressOrGeographyJoinKeys": [
"Los Angeles business location",
"business activity",
"gross receipts",
"tax year"
],
"licensingOrUseNotes": "Official city source; category selection is taxpayer-specific.",
"priority": "medium",
"implementationNotes": "Evidence: Los Angeles Office of Finance publishes rate-category guidance, a tax information booklet, and explains that most business taxes are based on gross receipts using rates per $1,000. ([Los Angeles Office of Finance][39])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "local_business_tax",
"jurisdictionLevel": "city",
"jurisdictionsCovered": [
"Denver, Colorado"
],
"officialSourceName": "Denver Occupational Privilege Tax and Business Tax Information",
"officialOwner": "City and County of Denver Treasury Division",
"sourceUrls": [
"[https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Department-of-Finance/Our-Divisions/Treasury/Business-Tax-Information/Business-Tax-FAQ](https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Department-of-Finance/Our-Divisions/Treasury/Business-Tax-Information/Business-Tax-FAQ)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"topic guides"
],
"updateFrequency": "As Denver Treasury updates tax pages and topic guides.",
"effectiveDateHandling": "Use payroll period/month and employee work-location facts.",
"addressOrGeographyJoinKeys": [
"Denver work location",
"employee wages",
"employer business presence",
"month"
],
"licensingOrUseNotes": "Official city source; liability depends on employee-by-employee work and wage facts.",
"priority": "medium",
"implementationNotes": "Evidence: Denver’s Business Tax FAQ describes OPT as having employee and business components and applying when earnings meet the monthly threshold. ([Denvergov][40])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "local_business_tax",
"jurisdictionLevel": "municipality",
"jurisdictionsCovered": [
"Ohio municipalities",
"Ohio JEDD/JEDZ areas"
],
"officialSourceName": "The Finder Municipal Tax Lookup, Municipal Rate Database, RITA Rates, and CCA Rates",
"officialOwner": "Ohio Department of Taxation, Regional Income Tax Agency, and Central Collection Agency",
"sourceUrls": [
"[https://thefinder.tax.ohio.gov/streamlinesalestaxweb/default_municipal.aspx](https://thefinder.tax.ohio.gov/streamlinesalestaxweb/default_municipal.aspx)",
"[https://thefinder.tax.ohio.gov/streamlinesalestaxweb/download/muniratetableinstructions.aspx](https://thefinder.tax.ohio.gov/streamlinesalestaxweb/download/muniratetableinstructions.aspx)",
"[https://www.ritaohio.com/TaxRatesTable](https://www.ritaohio.com/TaxRatesTable)",
"[https://tax.ohio.gov/business/municipal-net-profit-tax](https://tax.ohio.gov/business/municipal-net-profit-tax)",
"[https://www.ccaohio.gov/tax-rates](https://www.ccaohio.gov/tax-rates)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"rate database",
"GIS boundary data",
"lookup tool",
"exportable rate table"
],
"updateFrequency": "As state/local collection agencies update municipal rates and boundaries.",
"effectiveDateHandling": "Use municipal rate effective dates and boundary versions; verify JEDD/JEDZ inclusion by address or coordinates.",
"addressOrGeographyJoinKeys": [
"address",
"ZIP",
"latitude",
"longitude",
"municipality",
"JEDD",
"JEDZ",
"municipal code"
],
"licensingOrUseNotes": "Official and quasi-official municipal collection sources; reconcile Ohio Department of Taxation, RITA, and CCA where coverage differs.",
"priority": "high",
"implementationNotes": "Evidence: Ohio Finder provides municipal tax lookup by address/ZIP/latitude-longitude and downloadable rate/GIS data; rate-table instructions say the municipal database contains rates for municipalities, and RITA/CCA publish rate tables for their administered municipalities. ([Ohio Finder][41])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "tax_incentive_rules",
"jurisdictionLevel": "federal",
"jurisdictionsCovered": [
"United States"
],
"officialSourceName": "General Business Credits, Form 3800, Form 3468, and Inflation Reduction Act Credit Guidance",
"officialOwner": "Internal Revenue Service",
"sourceUrls": [
"[https://www.irs.gov/businesses/small-businesses-self-employed/business-tax-credits](https://www.irs.gov/businesses/small-businesses-self-employed/business-tax-credits)",
"[https://www.irs.gov/forms-pubs/about-form-3800](https://www.irs.gov/forms-pubs/about-form-3800)",
"[https://www.irs.gov/forms-pubs/about-form-3468](https://www.irs.gov/forms-pubs/about-form-3468)",
"[https://www.irs.gov/inflation-reduction-act-of-2022](https://www.irs.gov/inflation-reduction-act-of-2022)",
"[https://www.irs.gov/credits-deductions/elective-pay-and-transferability](https://www.irs.gov/credits-deductions/elective-pay-and-transferability)",
"[https://www.irs.gov/credits-deductions/register-for-elective-payment-or-transfer-of-credits](https://www.irs.gov/credits-deductions/register-for-elective-payment-or-transfer-of-credits)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"forms",
"instructions",
"registration portal"
],
"updateFrequency": "As IRS updates forms, instructions, IRA guidance, and registration pages.",
"effectiveDateHandling": "Use tax year, placed-in-service date, beginning-of-construction rules, registration date, and current IRS guidance separately.",
"addressOrGeographyJoinKeys": [
"taxpayer type",
"project location",
"technology type",
"placed-in-service date",
"credit registration number"
],
"licensingOrUseNotes": "Official federal source; taxpayer eligibility, basis, bonus-credit qualification, elective pay, and transferability are taxpayer/project-specific facts.",
"priority": "high",
"implementationNotes": "Evidence: IRS publishes business tax credit lists, Form 3800 for general business credits, Form 3468 for investment credits, IRA credit guidance, and elective-pay/transferability registration guidance. ([IRS][42])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "tax_incentive_rules",
"jurisdictionLevel": "federal",
"jurisdictionsCovered": [
"United States"
],
"officialSourceName": "Qualifying Advanced Energy Project Credit 48C Program",
"officialOwner": "U.S. Department of Energy",
"sourceUrls": [
"[https://www.energy.gov/infrastructure/qualifying-advanced-energy-project-credit-48c-program](https://www.energy.gov/infrastructure/qualifying-advanced-energy-project-credit-48c-program)",
"[https://eco.energy.gov/licbonus/s/](https://eco.energy.gov/licbonus/s/)"
],
"machineReadable": false,
"accessMethod": "lookup_tool",
"fileFormats": [
"HTML",
"application portal"
],
"updateFrequency": "Program rounds and portal notices as DOE posts them.",
"effectiveDateHandling": "Use DOE program-round dates, application deadlines, certification dates, and IRS credit-claim tax year separately.",
"addressOrGeographyJoinKeys": [
"project location",
"facility type",
"technology type",
"application round",
"DOE portal account"
],
"licensingOrUseNotes": "Official DOE program source; not usable as a public bulk rules API without additional extraction and legal review.",
"priority": "high",
"implementationNotes": "Evidence: DOE publishes the official 48C program page and directs future program actions through the 48C/ECO portal. ([The Department of Energy's Energy.gov][43])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "tax_incentive_rules",
"jurisdictionLevel": "federal",
"jurisdictionsCovered": [
"United States"
],
"officialSourceName": "New Markets Tax Credit Program Awards and Allocation Data",
"officialOwner": "Community Development Financial Institutions Fund",
"sourceUrls": [
"[https://www.cdfifund.gov/programs-training/programs/new-markets-tax-credit](https://www.cdfifund.gov/programs-training/programs/new-markets-tax-credit)",
"[https://www.cdfifund.gov/awards/state-awards](https://www.cdfifund.gov/awards/state-awards)",
"[https://www.cdfifund.gov/documents/awards](https://www.cdfifund.gov/documents/awards)"
],
"machineReadable": true,
"accessMethod": "download",
"fileFormats": [
"searchable database",
"downloadable award documents",
"HTML"
],
"updateFrequency": "Award rounds and annual/historical award documents as CDFI Fund posts them.",
"effectiveDateHandling": "Use allocation round, award date, awardee coverage, and project closing date separately.",
"addressOrGeographyJoinKeys": [
"state",
"awardee",
"CDE",
"allocation round",
"qualified low-income community"
],
"licensingOrUseNotes": "Official federal source. Awardee allocation data does not itself prove a specific project qualifies.",
"priority": "medium",
"implementationNotes": "Evidence: CDFI Fund publishes the NMTC program page, downloadable notices/award materials, and a searchable awards database by state and program. ([CDFI Fund][44])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "tax_incentive_rules",
"jurisdictionLevel": "federal",
"jurisdictionsCovered": [
"United States"
],
"officialSourceName": "Low-Income Housing Tax Credit Database GIS Services",
"officialOwner": "U.S. Department of Housing and Urban Development",
"sourceUrls": [
"[https://egis.hud.gov/arcgis/rest/services/pmt/PmtThematic/MapServer/0](https://egis.hud.gov/arcgis/rest/services/pmt/PmtThematic/MapServer/0)",
"[https://egis.hud.gov/arcgis/rest/services/gotit/LIHTCProperties/MapServer/info/iteminfo](https://egis.hud.gov/arcgis/rest/services/gotit/LIHTCProperties/MapServer/info/iteminfo)"
],
"machineReadable": true,
"accessMethod": "GIS_service",
"fileFormats": [
"ArcGIS REST service"
],
"updateFrequency": "HUD GIS service as maintained; verify current coverage before production use.",
"effectiveDateHandling": "Use placed-in-service year and HUD dataset vintage; do not treat historic project presence as current eligibility.",
"addressOrGeographyJoinKeys": [
"project address",
"latitude",
"longitude",
"state",
"placed-in-service year",
"HUD project identifier where available"
],
"licensingOrUseNotes": "Official HUD GIS service, but currency limitations require manual validation against current HUD/state housing finance agency records.",
"priority": "medium",
"implementationNotes": "Evidence: HUD ArcGIS services expose LIHTC project data through map services and item metadata; use as a machine-readable official GIS source with currency review. ([HUD Open Data][45])",
"sourceConfidence": "medium"
},
{
"taxDataFamily": "tax_incentive_rules",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"California"
],
"officialSourceName": "California Competes Tax Credit and California Business Incentives List",
"officialOwner": "California Governor's Office of Business and Economic Development",
"sourceUrls": [
"[https://business.ca.gov/california-competes-tax-credit/](https://business.ca.gov/california-competes-tax-credit/)",
"[https://business.ca.gov/awardee-list/](https://business.ca.gov/awardee-list/)",
"[https://business.ca.gov/resources/incentives-grants-and-financing/calbis-resources/california-business-incentives-list/](https://business.ca.gov/resources/incentives-grants-and-financing/calbis-resources/california-business-incentives-list/)",
"[https://business.ca.gov/about/publication/](https://business.ca.gov/about/publication/)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"awardee list",
"program notices"
],
"updateFrequency": "Application periods, award lists, and fiscal-year notices as GO-Biz posts them.",
"effectiveDateHandling": "Use application period, award date, agreement term, tax year, and statutory/reporting updates separately.",
"addressOrGeographyJoinKeys": [
"California project location",
"business applicant",
"NAICS/activity",
"jobs",
"investment",
"tax year"
],
"licensingOrUseNotes": "Official state source; eligibility and award amounts are project/application-specific, not purely geography-derived.",
"priority": "high",
"implementationNotes": "Evidence: GO-Biz publishes California Competes program pages, awardee lists, statewide business incentive list entries, and program notices/publications. ([CalGOBiz][46])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "tax_incentive_rules",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"New York"
],
"officialSourceName": "Excelsior Jobs Program",
"officialOwner": "Empire State Development",
"sourceUrls": [
"[https://esd.ny.gov/excelsior-jobs-program](https://esd.ny.gov/excelsior-jobs-program)",
"[https://www.esd.ny.gov/esd-media-center/reports](https://www.esd.ny.gov/esd-media-center/reports)",
"[https://www.esd.ny.gov/esd-media-center/reports/excelsior-jobs-program-quarterly-report-63025](https://www.esd.ny.gov/esd-media-center/reports/excelsior-jobs-program-quarterly-report-63025)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"reports",
"PDF where posted"
],
"updateFrequency": "Program pages and quarterly/annual reports as ESD posts them.",
"effectiveDateHandling": "Use application date, eligibility period, credit component, performance year, and reporting period separately.",
"addressOrGeographyJoinKeys": [
"New York project location",
"industry",
"jobs",
"investment",
"benefit-cost threshold",
"reporting period"
],
"licensingOrUseNotes": "Official state source; credit eligibility depends on project commitments and performance, not just geography.",
"priority": "high",
"implementationNotes": "Evidence: ESD publishes the Excelsior Jobs Program page and program reports, including quarterly reporting for jobs/investment incentives. ([Empire State Development][47])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "tax_incentive_rules",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Texas"
],
"officialSourceName": "Texas Enterprise Zone Program",
"officialOwner": "Office of the Texas Governor",
"sourceUrls": [
"[https://gov.texas.gov/business/page/texas-enterprise-zone-program](https://gov.texas.gov/business/page/texas-enterprise-zone-program)",
"[https://tez.gov.texas.gov/](https://tez.gov.texas.gov/)"
],
"machineReadable": false,
"accessMethod": "lookup_tool",
"fileFormats": [
"HTML",
"application portal"
],
"updateFrequency": "Application rounds and portal content as the Governor's office posts them.",
"effectiveDateHandling": "Use application round, designation date, project designation term, and refund claim period separately.",
"addressOrGeographyJoinKeys": [
"Texas project location",
"enterprise zone status",
"jobs",
"investment",
"application round"
],
"licensingOrUseNotes": "Official state source; eligibility and refund amount depend on application and performance facts.",
"priority": "medium",
"implementationNotes": "Evidence: the Governor’s office describes the Texas Enterprise Zone Program as a state sales/use tax refund program tied to private investment and job creation, with an official application portal. ([Texas.gov][48])",
"sourceConfidence": "high"
},
{
"taxDataFamily": "tax_incentive_rules",
"jurisdictionLevel": "state",
"jurisdictionsCovered": [
"Washington"
],
"officialSourceName": "B&O Tax Credits, Preferential Rates, and Annual Tax Performance Reporting",
"officialOwner": "Washington State Department of Revenue",
"sourceUrls": [
"[https://dor.wa.gov/taxes-rates/business-occupation-tax](https://dor.wa.gov/taxes-rates/business-occupation-tax)",
"[https://dor.wa.gov/open-business/apply-business-license/plan-taxes/business-and-occupation-bo-tax-classification-definitions](https://dor.wa.gov/open-business/apply-business-license/plan-taxes/business-and-occupation-bo-tax-classification-definitions)"
],
"machineReadable": false,
"accessMethod": "HTML_table",
"fileFormats": [
"HTML",
"forms/guidance"
],
"updateFrequency": "As DOR updates credit/rate guidance and reporting requirements.",
"effectiveDateHandling": "Use tax period, activity classification, credit effective period, and annual tax performance report due date separately.",
"addressOrGeographyJoinKeys": [
"Washington project location",
"B&O classification",
"activity type",
"gross receipts",
"tax period"
],
"licensingOrUseNotes": "Official state source; credit use depends on taxpayer activity, reporting compliance, and project facts.",
"priority": "medium",
"implementationNotes": "Evidence: Washington DOR B&O pages identify credits and classifications, including manufacturing-specific classifications and annual tax performance report requirements. ([Washington Department of Revenue][28])",
"sourceConfidence": "high"
}
],
"recommendedFirstImports": [
{
"name": "Streamlined Sales Tax rate and boundary files",
"reason": "Highest-leverage multi-state official machine-readable sales-tax import; supports address-to-tax-code separation from tax-code-to-rate logic. ([Default][1])"
},
{
"name": "High-quality state sales-tax machine-readable/API sources",
"reason": "Prioritize California CDTFA, Texas Comptroller, Washington DOR URL interface, Colorado SUTS GIS/API, Ohio Finder, Illinois machine-readable files, Arizona CSV/lookup, Kansas Excel/lookup, Tennessee SST, and Minnesota SST because they materially reduce user-entered sales-tax inputs."
},
{
"name": "Census TIGER/Line boundaries plus state parcel aggregations",
"reason": "Use Census for stable official geography keys and import state/county parcel datasets where available, beginning with Florida, New York, Massachusetts, Wisconsin, Washington, North Carolina, Cook County, and NYC. ([Census.gov][16])"
},
{
"name": "Property tax rate and levy datasets",
"reason": "Start with Texas statewide rate/levy XLSX, Florida DOR valuation/millage/tax data book, New York real-property tax rates and levy data, and high-volume local portals such as NYC and Cook County. ([Texas Comptroller][18])"
},
{
"name": "State business tax rule pages for gross-receipts/franchise/CAT/B&O states",
"reason": "Prioritize Texas franchise, Ohio CAT, Washington B&O, Oregon CAT, Delaware GRT, Tennessee franchise/excise, New York Article 9-A, and California FTB corporation rules because they are common incentive-modeling dependencies."
},
{
"name": "Local business tax sources for major local gross-receipts/income/occupational taxes",
"reason": "Prioritize Seattle, San Francisco, Philadelphia, NYC, Portland/Multnomah/Metro, Los Angeles, Denver OPT, and Ohio municipal-income sources because they can materially change project economics and are not captured by state tax tables."
},
{
"name": "Federal and flagship state incentive-rule sources",
"reason": "Import IRS Form 3800/Form 3468/IRA guidance, DOE 48C, CDFI NMTC awards, HUD LIHTC GIS, California Competes, New York Excelsior, Texas Enterprise Zone, and Washington B&O credits as source-backed rule records rather than simple rate tables. ([IRS][49])"
}
],
"datasetsNeedingGPTProGapResearch": [
{
"gap": "All remaining non-SST and local-administered sales-tax states not covered by a verified official bulk/API source in this catalog.",
"safestUserFacingBehavior": "Use an imported official source only where available; otherwise route to the state/local official lookup or ask for address confirmation and show that the estimate is source-limited."
},
{
"gap": "Louisiana LULSTB/LATA bulk lookup technical terms, historic-date support, and redistribution permissions.",
"safestUserFacingBehavior": "Use official lookup for current user-facing address checks; do not cache or redistribute bulk results until terms are confirmed."
},
{
"gap": "New York sales-tax machine-readable official bulk source.",
"safestUserFacingBehavior": "Use official publications and local-rate notices with manual QA; do not scrape unofficial rate tables."
},
{
"gap": "National parcel-level current property-tax bill database.",
"safestUserFacingBehavior": "Do not claim precise parcel tax liability unless county assessor/treasurer/collector data or the user’s tax bill is available."
},
{
"gap": "County-by-county property exemptions, abatements, special assessments, TIF districts, and millage-code crosswalks.",
"safestUserFacingBehavior": "Treat exemptions and abatements as taxpayer/project-specific until verified by the local assessor, treasurer, or authorizing program document."
},
{
"gap": "Local business taxes outside high-priority cities and Ohio municipal systems.",
"safestUserFacingBehavior": "At project intake, ask for business location and local nexus; only auto-calculate local B&O, gross-receipts, income, or occupational taxes after official local-source import."
},
{
"gap": "Utility, franchise-fee, energy-excise, and filed-tariff tax riders that may affect energy project economics.",
"safestUserFacingBehavior": "Exclude from tax estimate or label as not yet modeled unless official utility tariff/regulatory filings are imported for the applicable utility service territory."
},
{
"gap": "State and local incentive program annual reporting, clawback, prevailing-wage, domestic-content, energy-community, and low-income-community rule normalization.",
"safestUserFacingBehavior": "Show potential eligibility only; require user/project facts and human review before representing incentive amount or compliance obligations."
}
],
"humanReviewWarnings": [
"Do not infer tax by ZIP alone unless the official source expressly supports ZIP-level assignment. Prefer address, parcel, latitude/longitude, or official boundary joins.",
"Geography-derived facts include jurisdiction, boundary, parcel location, taxing district, sales-tax district, and enterprise-zone geography. Taxpayer/project-specific facts include entity type, nexus, activity classification, NAICS, gross receipts, payroll, investment, jobs, wages, placed-in-service date, exemption status, credit election, and application approval.",
"Source confidence is not estimate confidence. A high-confidence official source can still produce a low-confidence estimate if the geocode, parcel match, activity classification, tax year, or taxpayer-specific facts are incomplete.",
"Effective dates must be first-class data. Sales-tax rates, property-tax levy years, assessment rolls, local business-tax thresholds, and incentive application windows change on different calendars.",
"Property-tax estimates require parcel value, assessment class, exemptions, millage/taxing districts, special assessments, and collection status. If any required parcel-specific field is missing, present a range or source-limited estimate rather than a precise liability.",
"PDF/manual sources should be converted into structured rules only after human QA against the official PDF, statute, regulation, form instruction, or local ordinance.",
"Lookup-only sources should not be treated as reusable bulk datasets until API, scraping, caching, and redistribution terms are reviewed.",
"Program-specific incentives should not be shown as guaranteed. Many require application approval, annual certification, performance reporting, or post-award compliance."
]
}

[1]: https://www.streamlinedsalestax.org/Shared-Pages/rate-and-boundary-files?utm_source=chatgpt.com "Rate and Boundary Files - Streamlined Sales Tax"
[2]: https://cdtfa.ca.gov/taxes-and-fees/sales-use-tax-rates.htm?utm_source=chatgpt.com "California City & County Sales & Use Tax Rate Information"
[3]: https://comptroller.texas.gov/taxes/sales/city.php?utm_source=chatgpt.com "City Sales and Use Tax - Texas Comptroller"
[4]: https://dor.wa.gov/wa-sales-tax-rate-lookup-url-interface?utm_source=chatgpt.com "WA Sales Tax Rate Lookup URL Interface"
[5]: https://tax.colorado.gov/GIS-info?utm_source=chatgpt.com "Geographic Information System (GIS) Information"
[6]: https://tax.ohio.gov/business/sales-and-use-tax?utm_source=chatgpt.com "Sales and Use Tax - Ohio Department of Taxation"
[7]: https://tax.illinois.gov/research/taxrates.html?utm_source=chatgpt.com "Tax Rate Database - Illinois Department of Revenue"
[8]: https://floridarevenue.com/taxes/taxesfees/Pages/discretionary.aspx?utm_source=chatgpt.com "Florida Dept. of Revenue - Discretionary Sales Surtax"
[9]: https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/sales_tax_rate_publications.htm?utm_source=chatgpt.com "Sales Tax Rate Publications"
[10]: https://azdor.gov/business/transaction-privilege-tax/tax-rate-table?utm_source=chatgpt.com "Tax Rate Table | Arizona Department of Revenue"
[11]: https://www.ksrevenue.gov/atrladdress.html?utm_source=chatgpt.com "Sales Tax by Address Lookup"
[12]: https://lulstb.com/?utm_source=chatgpt.com "Louisiana Uniform Local Sales Tax Board"
[13]: https://dor.georgia.gov/taxes/sales-use-tax/sales-tax-rates-current-historical-and-upcoming?utm_source=chatgpt.com "Sales Tax Rates -- Current, Historical, and Upcoming"
[14]: https://www.tn.gov/revenue/taxes/sales-and-use-tax/streamlined-sales-tax.html?utm_source=chatgpt.com "Streamlined Sales Tax"
[15]: https://www.revenue.state.mn.us/streamlined-sales-and-use-tax?utm_source=chatgpt.com "Streamlined Sales and Use Tax"
[16]: https://www.census.gov/geographies/mapping-files/time-series/geo/tiger-line-file.html?utm_source=chatgpt.com "TIGER/Line Shapefiles"
[17]: https://floridarevenue.com/property/Pages/DataPortal.aspx "https://floridarevenue.com/property/Pages/DataPortal.aspx"
[18]: https://comptroller.texas.gov/taxes/property-tax/rates/?utm_source=chatgpt.com "Tax Rates and Levies - Texas Comptroller"
[19]: https://www.tax.ny.gov/pit/property/munidataportal.htm "https://www.tax.ny.gov/pit/property/munidataportal.htm"
[20]: https://www.mass.gov/info-details/massgis-data-property-tax-parcels "https://www.mass.gov/info-details/massgis-data-property-tax-parcels"
[21]: https://www.sco.wisc.edu/parcels/data/?utm_source=chatgpt.com "Wisconsin Statewide Parcel Map Initiative - Data"
[22]: https://geo.wa.gov/maps/2b603a599a0842a3b2284c04c8927f35?utm_source=chatgpt.com "Current Parcels - Washington State Geospatial Open Data Portal"
[23]: https://www.nconemap.gov/pages/parcels?utm_source=chatgpt.com "NC Parcels"
[24]: https://www.cookcountyassessoril.gov/community-data "https://www.cookcountyassessoril.gov/community-data"
[25]: https://www.nyc.gov/site/finance/taxes/property.page "https://www.nyc.gov/site/finance/taxes/property.page"
[26]: https://comptroller.texas.gov/taxes/franchise/ "https://comptroller.texas.gov/taxes/franchise/"
[27]: https://tax.ohio.gov/business/commercial-activity-tax "https://tax.ohio.gov/business/commercial-activity-tax"
[28]: https://dor.wa.gov/taxes-rates/business-occupation-tax "https://dor.wa.gov/taxes-rates/business-occupation-tax"
[29]: https://www.oregon.gov/dor/programs/businesses/pages/corporate-activity-tax.aspx "https://www.oregon.gov/dor/programs/businesses/pages/corporate-activity-tax.aspx"
[30]: https://revenue.delaware.gov/frequently-asked-questions/gross-receipts-tax-faqs/ "https://revenue.delaware.gov/frequently-asked-questions/gross-receipts-tax-faqs/"
[31]: https://www.tn.gov/revenue/taxes/franchise---excise-tax.html "https://www.tn.gov/revenue/taxes/franchise---excise-tax.html"
[32]: https://www.tax.ny.gov/bus/ct/ctidx.htm "https://www.tax.ny.gov/bus/ct/ctidx.htm"
[33]: https://www.ftb.ca.gov/file/business/types/corporations/c-corporations.html "https://www.ftb.ca.gov/file/business/types/corporations/c-corporations.html"
[34]: https://www.seattle.gov/city-finance/business-taxes-and-licenses/business-taxes "https://www.seattle.gov/city-finance/business-taxes-and-licenses/business-taxes"
[35]: https://sftreasurer.org/business/taxes-fees/gross-receipts-tax-gr-0 "https://sftreasurer.org/business/taxes-fees/gross-receipts-tax-gr-0"
[36]: https://www.phila.gov/services/payments-assistance-taxes/taxes/business-taxes/business-taxes-by-type/business-income-receipts-tax-birt/ "https://www.phila.gov/services/payments-assistance-taxes/taxes/business-taxes/business-taxes-by-type/business-income-receipts-tax-birt/"
[37]: https://www.nyc.gov/site/finance/business/business-corporation-tax.page "https://www.nyc.gov/site/finance/business/business-corporation-tax.page"
[38]: https://www.portland.gov/revenue/business-tax "https://www.portland.gov/revenue/business-tax"
[39]: https://finance.lacity.gov/tax-education/business-taxes/know-your-rates "https://finance.lacity.gov/tax-education/business-taxes/know-your-rates"
[40]: https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Department-of-Finance/Our-Divisions/Treasury/Business-Tax-Information/Business-Tax-FAQ "https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Department-of-Finance/Our-Divisions/Treasury/Business-Tax-Information/Business-Tax-FAQ"
[41]: https://thefinder.tax.ohio.gov/streamlinesalestaxweb/default_municipal.aspx "https://thefinder.tax.ohio.gov/streamlinesalestaxweb/default_municipal.aspx"
[42]: https://www.irs.gov/businesses/small-businesses-self-employed/business-tax-credits?utm_source=chatgpt.com "Business tax credits | Internal Revenue Service"
[43]: https://www.energy.gov/infrastructure/qualifying-advanced-energy-project-credit-48c-program "https://www.energy.gov/infrastructure/qualifying-advanced-energy-project-credit-48c-program"
[44]: https://www.cdfifund.gov/programs-training/programs/new-markets-tax-credit "https://www.cdfifund.gov/programs-training/programs/new-markets-tax-credit"
[45]: https://egis.hud.gov/arcgis/rest/services/pmt/PmtThematic/MapServer/0 "https://egis.hud.gov/arcgis/rest/services/pmt/PmtThematic/MapServer/0"
[46]: https://business.ca.gov/california-competes-tax-credit/ "https://business.ca.gov/california-competes-tax-credit/"
[47]: https://esd.ny.gov/excelsior-jobs-program "https://esd.ny.gov/excelsior-jobs-program"
[48]: https://gov.texas.gov/business/page/texas-enterprise-zone-program "https://gov.texas.gov/business/page/texas-enterprise-zone-program"
[49]: https://www.irs.gov/forms-pubs/about-form-3800?utm_source=chatgpt.com "About Form 3800, General Business Credit"
