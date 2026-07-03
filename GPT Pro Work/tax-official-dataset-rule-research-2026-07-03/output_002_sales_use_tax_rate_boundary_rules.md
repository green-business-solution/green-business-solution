{
"schemaVersion": "retrofi_sales_use_tax_rule_research.v1",
"researchedAt": "2026-07-03",
"source": "gpt_pro",
"artifact": "[Download compact JSON artifact](sandbox:/mnt/data/sales_use_tax_rule_research_compact.json)",
"sourceCatalog": {
"sstContact": {
"url": "[https://www.streamlinedsalestax.org/contacts/state-contact-information](https://www.streamlinedsalestax.org/contacts/state-contact-information)",
"evidence": "SST state contact list reports state rates, whether local jurisdictions impose tax, and state lookup/rate links.",
"citation": "([Default][1])"
},
"sstPolicy": {
"url": "[https://www.streamlinedsalestax.org/Shared-Pages/rate-and-boundary-files](https://www.streamlinedsalestax.org/Shared-Pages/rate-and-boundary-files)",
"evidence": "SST says member states provide rate and boundary files; boundary files identify tax codes by ZIP5, ZIP9, or address and are updated quarterly with possible corrections.",
"citation": "([Default][2])"
},
"sstRateDir": {
"url": "[https://www.streamlinedsalestax.org/ratesandboundry/Rates/](https://www.streamlinedsalestax.org/ratesandboundry/Rates/)",
"evidence": "Directory lists current SST rate files for SST member states.",
"citation": "([Default][3])"
},
"sstBoundaryDir": {
"url": "[https://www.streamlinedsalestax.org/ratesandboundry/Boundary/](https://www.streamlinedsalestax.org/ratesandboundry/Boundary/)",
"evidence": "Directory lists current SST boundary files for SST member states.",
"citation": "([Default][4])"
},
"sstMatrix": {
"url": "[https://www.streamlinedsalestax.org/Shared-Pages/State-taxability-matrix](https://www.streamlinedsalestax.org/Shared-Pages/State-taxability-matrix)",
"evidence": "SST Taxability Matrix identifies member-state treatment of product definitions and administrative practices with legal references.",
"citation": "([Default][5])"
},
"sstMatrixInstructions": {
"url": "[https://www.streamlinedsalestax.org/for-states/taxability-matrix---About/state-instructions-for-taxability-matrix](https://www.streamlinedsalestax.org/for-states/taxability-matrix---About/state-instructions-for-taxability-matrix)",
"evidence": "Member states must keep matrices current, including annual and change-triggered updates.",
"citation": "([Default][6])"
},
"alRates": {
"url": "[https://www.revenue.alabama.gov/sales-use/tax-rates/](https://www.revenue.alabama.gov/sales-use/tax-rates/)",
"evidence": "ALDOR says sales/use rates vary by municipality and county and provides state/local schedules, notices, and local-rate text file.",
"citation": "([Alabama Department of Revenue][7])"
},
"alLookup": {
"url": "[https://www.alabamainteractive.org/ador_taxrate_lookup/welcome.action](https://www.alabamainteractive.org/ador_taxrate_lookup/welcome.action)",
"evidence": "Official Alabama lookup supports address/geolocation lookup for local sales/use/rental/lodgings rates.",
"citation": "([Alabama Interactive][8])"
},
"akInfo": {
"url": "[https://www.commerce.alaska.gov/web/dcra/OfficeoftheStateAssessor/AlaskaSalesTaxInformation.aspx](https://www.commerce.alaska.gov/web/dcra/OfficeoftheStateAssessor/AlaskaSalesTaxInformation.aspx)",
"evidence": "Alaska does not levy state sales tax; local municipalities may levy sales/use tax and control most exemptions/forms.",
"citation": "([Alaska Department of Commerce][9])"
},
"azRateTable": {
"url": "[https://azdor.gov/business/transaction-privilege-tax/tax-rate-table](https://azdor.gov/business/transaction-privilege-tax/tax-rate-table)",
"evidence": "ADOR TPT lookup supports physical address, ZIP, or map locator plus business description and returns state/county/city rates and business codes.",
"citation": "([Arizona Department of Revenue][10])"
},
"azTpt": {
"url": "[https://azdor.gov/business/transaction-privilege-tax](https://azdor.gov/business/transaction-privilege-tax)",
"evidence": "Arizona TPT is a vendor privilege tax commonly called sales tax; rates vary by business activity, city, and county.",
"citation": "([Arizona Department of Revenue][11])"
},
"arLookup": {
"url": "[https://www.dfa.arkansas.gov/office/taxes/excise-tax-administration/sales-use-tax/streamlined-tax-lookup/](https://www.dfa.arkansas.gov/office/taxes/excise-tax-administration/sales-use-tax/streamlined-tax-lookup/)",
"evidence": "Arkansas lookup searches by address or ZIP; DFA provides rate and boundary files with FIPS/effective dates and address-list upload.",
"citation": "([Arkansas Finance Admin][12])"
},
"caLookup": {
"url": "[https://maps.cdtfa.ca.gov/](https://maps.cdtfa.ca.gov/)",
"evidence": "CDTFA lookup requires address fields or coordinates and returns the current rate for the selected point.",
"citation": "([CDTFA Tax Map][13])"
},
"caApi": {
"url": "[https://gis.data.ca.gov/datasets/CDTFA::california-sales-and-use-tax-rate-rest-api](https://gis.data.ca.gov/datasets/CDTFA::california-sales-and-use-tax-rate-rest-api)",
"evidence": "California publishes a CDTFA sales/use tax rate REST API for address or coordinate lookup.",
"citation": "([California State Geoportal][14])"
},
"caContractor": {
"url": "[https://cdtfa.ca.gov/industry/construction-contractors/industry-topics.htm](https://cdtfa.ca.gov/industry/construction-contractors/industry-topics.htm)",
"evidence": "CDTFA construction guidance distinguishes materials, fixtures, machinery/equipment, jobsite local taxes, and installation labor treatment.",
"citation": "([CDTFA][15])"
},
"caReg1521": {
"url": "[https://cdtfa.ca.gov/lawguides/vol1/sutr/1521.html](https://cdtfa.ca.gov/lawguides/vol1/sutr/1521.html)",
"evidence": "Regulation 1521 defines contractor treatment for materials, fixtures, machinery/equipment, and repair contracts.",
"citation": "([CDTFA][16])"
},
"coRates": {
"url": "[https://tax.colorado.gov/how-to-look-up-sales-use-tax-rates](https://tax.colorado.gov/how-to-look-up-sales-use-tax-rates)",
"evidence": "Colorado GIS lookup gives individual-address rates for state, county, municipality, and special districts; spreadsheets are provided twice yearly.",
"citation": "([Colorado Department of Revenue][17])"
},
"coApi": {
"url": "[https://tax.colorado.gov/GIS-API](https://tax.colorado.gov/GIS-API)",
"evidence": "Colorado GIS API retrieves current rate-calculation data from the GIS database for POS systems.",
"citation": "([Colorado Department of Revenue][18])"
},
"coSuts": {
"url": "[https://tax.colorado.gov/SUTS-info](https://tax.colorado.gov/SUTS-info)",
"evidence": "Colorado SUTS GIS identifies correct jurisdictions and rates for an individual address, including special districts.",
"citation": "([Colorado Department of Revenue][19])"
},
"deInfo": {
"url": "[https://revenue.delaware.gov/business-tax-forms/doing-business-in-delaware/](https://revenue.delaware.gov/business-tax-forms/doing-business-in-delaware/)",
"evidence": "Delaware has no state or local sales tax; seller-side business license/gross receipts taxes are separate.",
"citation": "([Division of Revenue - State of Delaware][20])"
},
"flPointMatch": {
"url": "[https://pointmatch.floridarevenue.com/Default.aspx](https://pointmatch.floridarevenue.com/Default.aspx)",
"evidence": "Florida PointMatch searches rates by address, street, jurisdiction, county, or special fire district and can show pending future changes.",
"citation": "([PointMatch][21])"
},
"flSales": {
"url": "[https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx](https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx)",
"evidence": "Florida Address/Jurisdiction Database identifies county and sales/discretionary surtax rates for addresses.",
"citation": "([Florida Department of Revenue][22])"
},
"hiGet": {
"url": "[https://tax.hawaii.gov/geninfo/get/](https://tax.hawaii.gov/geninfo/get/)",
"evidence": "Hawaii GET page lists county surcharge/pass-on rates and effective periods.",
"citation": "([Hawaii Department of Taxation][23])"
},
"hiSurcharge": {
"url": "[https://tax.hawaii.gov/geninfo/countysurcharge/](https://tax.hawaii.gov/geninfo/countysurcharge/)",
"evidence": "Counties may adopt GET/use-tax surcharge up to 0.5%; surcharge applies only to activities taxed at the 4% rate.",
"citation": "([Hawaii Department of Taxation][24])"
},
"idBasics": {
"url": "[https://tax.idaho.gov/taxes/sales-use/online-guide/](https://tax.idaho.gov/taxes/sales-use/online-guide/)",
"evidence": "Idaho has sales/use taxes that apply to goods and services unless an exemption applies.",
"citation": "([Idaho State Tax Commission][25])"
},
"idLocal": {
"url": "[https://tax.idaho.gov/taxes/sales-use/sales-tax/local-sales-tax/city-sales-tax/](https://tax.idaho.gov/taxes/sales-use/sales-tax/local-sales-tax/city-sales-tax/)",
"evidence": "Some Idaho resort cities levy local option sales taxes and may choose what is taxed.",
"citation": "([Idaho State Tax Commission][26])"
},
"ilRateDb": {
"url": "[https://tax.illinois.gov/research/taxrates.html](https://tax.illinois.gov/research/taxrates.html)",
"evidence": "Illinois provides MyTax Rate Finder and machine-readable county/municipality and address-specific files; changes generally occur Jan. 1 or Jul. 1.",
"citation": "([Illinois Department of Revenue][27])"
},
"ilDest": {
"url": "[https://tax.illinois.gov/research/taxinformation/sales/destination-based-sales-tax-assistance.html](https://tax.illinois.gov/research/taxinformation/sales/destination-based-sales-tax-assistance.html)",
"evidence": "For destination sales, Illinois instructs sellers to use Search by Address, validate ZIP9, and record Location Code.",
"citation": "([Illinois Department of Revenue][28])"
},
"laLookup": {
"url": "[https://parishe-file.revenue.louisiana.gov/lookup/lookup.aspx](https://parishe-file.revenue.louisiana.gov/lookup/lookup.aspx)",
"evidence": "Louisiana Parish E-File lookup supports rate lookup by address or geographic coordinates and filing period.",
"citation": "([Parish E-File][29])"
},
"laRate": {
"url": "[https://revenue.louisiana.gov/tax-education-and-faqs/faqs/sales-tax/what-is-the-sales-tax-rate-in-louisiana/](https://revenue.louisiana.gov/tax-education-and-faqs/faqs/sales-tax/what-is-the-sales-tax-rate-in-louisiana/)",
"evidence": "Louisiana state rate as of Jan. 1, 2025 is listed; local political-subdivision taxes are in addition.",
"citation": "([Louisiana Department of Revenue][30])"
},
"laParish": {
"url": "[https://parishe-file.revenue.louisiana.gov/default_1.aspx](https://parishe-file.revenue.louisiana.gov/default_1.aspx)",
"evidence": "Parish E-File centralizes state and parish/city sales/use filing; taxpayers collect and remit both.",
"citation": "([Parish E-File][31])"
},
"msIndex": {
"url": "[https://www.dor.ms.gov/sales-and-use-tax](https://www.dor.ms.gov/sales-and-use-tax)",
"evidence": "Mississippi DOR provides rates, exemptions, use tax, construction contractor guide, and tourism/economic-development local tax resources.",
"citation": "([Mississippi Department of Revenue][32])"
},
"msRates": {
"url": "[https://www.dor.ms.gov/business/sales-use-tax/sales-tax-rates](https://www.dor.ms.gov/business/sales-use-tax/sales-tax-rates)",
"evidence": "Mississippi lists retail TPP, construction contracting, and specified installation/repair categories and rates.",
"citation": "([Mississippi Department of Revenue][33])"
},
"moSales": {
"url": "[https://dor.mo.gov/taxation/business/tax-types/sales-use/](https://dor.mo.gov/taxation/business/tax-types/sales-use/)",
"evidence": "Missouri DOR built a portal from local GIS shapefiles/maps; portal displays address rates and special item rates.",
"citation": "([Missouri Department of Revenue][34])"
},
"moTables": {
"url": "[https://dor.mo.gov/taxation/business/tax-types/sales-use/rate-tables/](https://dor.mo.gov/taxation/business/tax-types/sales-use/rate-tables/)",
"evidence": "Missouri publishes sales/use tax rate tables by year.",
"citation": "([Missouri Department of Revenue][35])"
},
"mtGeneral": {
"url": "[https://revenue.mt.gov/taxes/general-sales-tax](https://revenue.mt.gov/taxes/general-sales-tax)",
"evidence": "Montana does not have a general-use sales tax.",
"citation": "([Montana Department of Revenue][36])"
},
"mtResort": {
"url": "[https://revenue.mt.gov/taxes/miscellaneous/local-resort-tax](https://revenue.mt.gov/taxes/miscellaneous/local-resort-tax)",
"evidence": "Montana DOR does not administer local resort tax; resort tax is local and applies to specified activities/luxuries.",
"citation": "([Montana Department of Revenue][37])"
},
"nhInfo": {
"url": "[https://www.revenue.nh.gov/resource-center/frequently-asked-questions/general-information](https://www.revenue.nh.gov/resource-center/frequently-asked-questions/general-information)",
"evidence": "New Hampshire DRA states there is no general sales tax on goods purchased in New Hampshire.",
"citation": "([NH Revenue Administration][38])"
},
"nmMap": {
"url": "[https://www.tax.newmexico.gov/governments/gross-receipts-location-code-and-tax-rate-map/](https://www.tax.newmexico.gov/governments/gross-receipts-location-code-and-tax-rate-map/)",
"evidence": "New Mexico GRT map identifies location code/rate; map address locators are browsing aids, not TRD data-service results.",
"citation": "([Taxation and Revenue New Mexico][39])"
},
"nmOverview": {
"url": "[https://www.tax.newmexico.gov/businesses/gross-receipts-overview/](https://www.tax.newmexico.gov/businesses/gross-receipts-overview/)",
"evidence": "New Mexico GRT total rate combines state, county, and municipality; rates generally change only in July after July 1, 2025 except special situations.",
"citation": "([Taxation and Revenue New Mexico][40])"
},
"nmTools": {
"url": "[https://www.tax.newmexico.gov/grt-rate-finder-tools/](https://www.tax.newmexico.gov/grt-rate-finder-tools/)",
"evidence": "New Mexico provides an API to input street address and return matched GRT location code and tax rate.",
"citation": "([Taxation and Revenue New Mexico][41])"
},
"nmWho": {
"url": "[https://www.tax.newmexico.gov/businesses/gross-receipts-overview/who-must-file/](https://www.tax.newmexico.gov/businesses/gross-receipts-overview/who-must-file/)",
"evidence": "GRT applies to selling property and performing services; service includes construction and construction materials becoming part of the project.",
"citation": "([Taxation and Revenue New Mexico][42])"
},
"nyRates": {
"url": "[https://www.tax.ny.gov/bus/st/rates.htm](https://www.tax.ny.gov/bus/st/rates.htm)",
"evidence": "New York lookup finds combined state/local rate, jurisdiction, and jurisdiction code by address; rate is destination-based.",
"citation": "([NY Taxation and Finance][43])"
},
"nyPubs": {
"url": "[https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/sales_tax_rate_publications.htm](https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/sales_tax_rate_publications.htm)",
"evidence": "NY publications include general rates/effective dates plus product-specific local publications for clothing, residential energy, and residential solar equipment/installation.",
"citation": "([NY Taxation and Finance][44])"
},
"nyZipWarn": {
"url": "[https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/motor_vehicles_and_boats.htm](https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/motor_vehicles_and_boats.htm)",
"evidence": "NY warns not to rely on city/town or ZIP because ZIP-based collection causes inaccurate reporting.",
"citation": "([NY Taxation and Finance][45])"
},
"ncBoundary": {
"url": "[https://www.ncdor.gov/taxes-forms/sales-and-use-tax/other-sales-and-use-tax-resources/streamlined-sales-tax-information/rate-and-boundary-database-information](https://www.ncdor.gov/taxes-forms/sales-and-use-tax/other-sales-and-use-tax-resources/streamlined-sales-tax-information/rate-and-boundary-database-information)",
"evidence": "NCDOR says North Carolina includes street-address-level data in the SST boundary database and uses rate/boundary databases together by sourcing.",
"citation": "([NCDOR][46])"
},
"ohInstructions": {
"url": "[https://thefinder.tax.ohio.gov/streamlinesalestaxweb/Download/SSTPRateTableInstructions.aspx](https://thefinder.tax.ohio.gov/streamlinesalestaxweb/Download/SSTPRateTableInstructions.aspx)",
"evidence": "Ohio instructions explain FIPS/jurisdiction joins, begin/end effective dates, and per-component tax computation.",
"citation": "([Ohio Finder][47])"
},
"orInfo": {
"url": "[https://www.oregon.gov/dor/programs/businesses/pages/sales-tax.aspx](https://www.oregon.gov/dor/programs/businesses/pages/sales-tax.aspx)",
"evidence": "Oregon has no general sales or use/transaction tax; vehicle use tax is separate.",
"citation": "([Oregon][48])"
},
"paSales": {
"url": "[https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/sales-use-and-hotel-occupancy-tax](https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/sales-use-and-hotel-occupancy-tax)",
"evidence": "Pennsylvania has 6% state sales tax, plus 1% Allegheny County and 2% Philadelphia local tax.",
"citation": "([Pennsylvania Governor's Office][49])"
},
"paUse": {
"url": "[https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/sales-use-and-hotel-occupancy-tax/use-tax/use-tax-for-individuals](https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/sales-use-and-hotel-occupancy-tax/use-tax/use-tax-for-individuals)",
"evidence": "Pennsylvania use tax is the same rate as sales tax plus Allegheny/Philadelphia local tax when purchased, delivered to, or used there.",
"citation": "([Pennsylvania Governor's Office][50])"
},
"riSst": {
"url": "[https://tax.ri.gov/tax-sections/sales-excise-taxes/streamlined-sales-tax](https://tax.ri.gov/tax-sections/sales-excise-taxes/streamlined-sales-tax)",
"evidence": "Rhode Island conformed to SSUTA effective Jan. 1, 2007 and points to the SST Taxability Matrix.",
"citation": "([RI Division of Taxation][51])"
},
"scSales": {
"url": "[https://dor.sc.gov/sales-use-tax-index/sales-tax](https://dor.sc.gov/sales-use-tax-index/sales-tax)",
"evidence": "South Carolina imposes sales tax on goods and certain services; counties may impose additional local tax; separately stated reasonable installation charges are not taxable.",
"citation": "([South Carolina Department of Revenue][52])"
},
"scLocal": {
"url": "[https://dor.sc.gov/sales-use-tax-index/local-sales-taxes](https://dor.sc.gov/sales-use-tax-index/local-sales-taxes)",
"evidence": "South Carolina local taxes have their own restrictions/specifications and recent local changes are posted by effective date.",
"citation": "([South Carolina Department of Revenue][53])"
},
"scMap": {
"url": "[https://dor.sc.gov/sales-use-tax-index](https://dor.sc.gov/sales-use-tax-index)",
"evidence": "SCDOR directs users to SC District Information search map for address rate lookup.",
"citation": "([South Carolina Department of Revenue][54])"
},
"tnSst": {
"url": "[https://www.tn.gov/revenue/taxes/sales-and-use-tax/streamlined-sales-tax.html](https://www.tn.gov/revenue/taxes/sales-and-use-tax/streamlined-sales-tax.html)",
"evidence": "Tennessee links tax-rate lookup, downloadable rate tables, and boundary database downloads with effective dates.",
"citation": "([Tennessee State Government][55])"
},
"tnLookup": {
"url": "[https://tnmap.tn.gov/sst/sst.html](https://tnmap.tn.gov/sst/sst.html)",
"evidence": "Tennessee jurisdiction/rate database asks for street, city, and ZIP to retrieve state/local details.",
"citation": "([TNMap][56])"
},
"txSales": {
"url": "[https://comptroller.texas.gov/taxes/sales/](https://comptroller.texas.gov/taxes/sales/)",
"evidence": "Texas Comptroller links address rate locator and downloadable city, county, transit, SPD, combined-area, and quarterly update files.",
"citation": "([Texas Comptroller][57])"
},
"txLocal": {
"url": "[https://comptroller.texas.gov/taxes/publications/94-105.php](https://comptroller.texas.gov/taxes/publications/94-105.php)",
"evidence": "Texas local boundaries do not follow ZIPs; total local tax is capped at 2%, combined areas use combined local codes, and local use tax has ordering/same-type rules.",
"citation": "([Texas Comptroller][58])"
},
"vaLookup": {
"url": "[https://www.tax.virginia.gov/sales-tax-rate-and-locality-code-lookup](https://www.tax.virginia.gov/sales-tax-rate-and-locality-code-lookup)",
"evidence": "Virginia map finds general sales/use rate and locality code for any location; Excel downloads list city/county rates and locality codes.",
"citation": "([Virginia Tax][59])"
},
"vaSales": {
"url": "[https://www.tax.virginia.gov/retail-sales-and-use-tax](https://www.tax.virginia.gov/retail-sales-and-use-tax)",
"evidence": "Virginia rates vary by locality and item type; rates/locality codes are downloadable.",
"citation": "([Virginia Tax][60])"
},
"waTools": {
"url": "[https://dor.wa.gov/taxes-rates/retail-sales-tax/sales-and-use-tax-tools](https://dor.wa.gov/taxes-rates/retail-sales-tax/sales-and-use-tax-tools)",
"evidence": "Washington provides address/ZIP+4 URL lookup, lat/long URL lookup, source code using address/rate download files, and downloadable city/county rates.",
"citation": "([Washington Department of Revenue][61])"
}
},
"stateRules": [
{
"state": "AL",
"stateFips": "01",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["alRates"],
"officialBoundarySources": ["alLookup"],
"lookupTools": [{"sourceId": "alLookup", "inputs": ["streetAddress", "city", "zip", "geolocation"]}],
"machineReadableImportPlan": "Import ALDOR schedules/local-rate text files; use official address/geolocation lookup for transaction rate; do not infer from ZIP alone.",
"addressResolutionNeeded": true,
"joinKeys": ["streetAddress", "city", "zip", "taxType", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "No official bulk GIS boundary confirmed; use official lookup.", "sourceIds": ["alRates", "alLookup"]}],
"effectiveDateRules": "Use ALDOR source effective dates; do not infer history from current lookup.",
"refreshFrequency": "Transaction-time lookup plus monthly ALDOR monitoring.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review", "no_bulk_boundary_confirmed"]
},
{
"state": "AK",
"stateFips": "02",
"hasStateSalesTax": false,
"localRatesApply": true,
"officialRateSources": ["akInfo"],
"officialBoundarySources": ["akInfo"],
"lookupTools": [],
"machineReadableImportPlan": "No state sales-tax import. Build local municipality records only from official local ordinances/rate schedules.",
"addressResolutionNeeded": true,
"joinKeys": ["municipalityOrBorough", "localOrdinance", "addressOrCoordinates", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Local municipalities decide most sales/use tax bases and exemptions.", "sourceIds": ["akInfo"]}],
"effectiveDateRules": "Local ordinance/voter effective dates only.",
"refreshFrequency": "Municipality-specific; verify before enabling each locality.",
"sourceConfidence": "medium",
"humanReviewRequired": true,
"humanReviewReasons": ["local_source_required", "project_taxability_review"]
},
{
"state": "AZ",
"stateFips": "04",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["azRateTable", "azTpt"],
"officialBoundarySources": ["azRateTable"],
"lookupTools": [{"sourceId": "azRateTable", "inputs": ["physicalAddress", "zip", "mapLocation", "businessDescription"]}],
"machineReadableImportPlan": "Use ADOR TPT lookup by physical address/ZIP/map location and business description; persist business code/rate components and TPT treatment.",
"addressResolutionNeeded": true,
"joinKeys": ["physicalAddress", "zip", "mapLocation", "businessDescription", "city", "county", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "TPT is seller privilege tax and depends on business activity.", "sourceIds": ["azTpt", "azRateTable"]}],
"effectiveDateRules": "Use transaction effective date and ADOR local-rate implementation notices.",
"refreshFrequency": "Transaction lookup plus monthly ADOR table monitoring.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["business_activity_classification_required", "project_taxability_review"]
},
{
"state": "AR",
"stateFips": "05",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:ARR2026Q3JUN02.csv", "arLookup"],
"officialBoundarySources": ["sstBoundaryDir:ARB2026Q3JUN02.zip", "arLookup"],
"lookupTools": [{"sourceId": "arLookup", "inputs": ["address", "zip", "addressUpload"]}],
"machineReadableImportPlan": "Import DFA/SST rate and boundary files; join FIPS/effective dates; validate with official lookup/upload.",
"addressResolutionNeeded": true,
"joinKeys": ["address", "city", "zip5", "zip9", "fips", "jurisdictionCode", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST matrix for product/labor taxability and DFA files for geography.", "sourceIds": ["sstMatrix", "arLookup"]}],
"effectiveDateRules": "Use DFA/SST effective dates and upload month/year.",
"refreshFrequency": "Quarterly SST/DFA polling plus change notices.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "CA",
"stateFips": "06",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["caLookup"],
"officialBoundarySources": ["caApi", "caLookup"],
"lookupTools": [{"sourceId": "caLookup", "inputs": ["streetAddress", "city", "zip", "latitudeLongitude"]}, {"sourceId": "caApi", "inputs": ["address", "latitudeLongitude"]}],
"machineReadableImportPlan": "Use CDTFA API/lookup by normalized address or lat/long; store matched point, tax area code, rate, and query date; do not use ZIP-only.",
"addressResolutionNeeded": true,
"joinKeys": ["streetAddress", "city", "zip", "latitude", "longitude", "taxAreaCode", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Construction rules distinguish materials, fixtures, machinery/equipment, jobsite local taxes, and installation labor.", "sourceIds": ["caContractor", "caReg1521"]}],
"effectiveDateRules": "CDTFA lookup returns current rate; use dated source for historical transactions.",
"refreshFrequency": "Transaction-time API plus quarterly dataset validation.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["contractor_rule_review", "project_taxability_review"]
},
{
"state": "CO",
"stateFips": "08",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["coRates"],
"officialBoundarySources": ["coApi", "coSuts"],
"lookupTools": [{"sourceId": "coApi", "inputs": ["address", "apiKey"]}],
"machineReadableImportPlan": "Use Colorado GIS/API by address; persist state/county/municipality/special-district components and location codes; validate with semiannual spreadsheets.",
"addressResolutionNeeded": true,
"joinKeys": ["address", "jurisdictionCode", "locationCode", "county", "municipality", "specialDistrict", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "GIS includes counties, municipalities, and special taxation districts.", "sourceIds": ["coRates", "coApi", "coSuts"]}],
"effectiveDateRules": "Spreadsheets are Jan-Jun and Jul-Dec; API is current GIS data.",
"refreshFrequency": "Transaction-time GIS/API plus semiannual spreadsheet import.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "CT",
"stateFips": "09",
"hasStateSalesTax": true,
"localRatesApply": false,
"officialRateSources": ["sstContact"],
"officialBoundarySources": [],
"lookupTools": [],
"machineReadableImportPlan": "State-only general rate; no local boundary import.",
"addressResolutionNeeded": false,
"joinKeys": ["stateFips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "No local rate layer found; product/labor review still required.", "sourceIds": ["sstContact"]}],
"effectiveDateRules": "Use state effective dates.",
"refreshFrequency": "Quarterly verification.",
"sourceConfidence": "medium",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "DE",
"stateFips": "10",
"hasStateSalesTax": false,
"localRatesApply": false,
"officialRateSources": ["deInfo"],
"officialBoundarySources": [],
"lookupTools": [],
"machineReadableImportPlan": "No sales/use tax import; model gross receipts/business-license obligations separately if needed.",
"addressResolutionNeeded": false,
"joinKeys": ["stateFips"],
"equipmentTaxabilityDefault": "exempt",
"installationLaborTaxabilityDefault": "exempt",
"retrofitSpecificNotes": [{"note": "No state or local sales tax for retrofit sales/use calculation.", "sourceIds": ["deInfo"]}],
"effectiveDateRules": "Not applicable.",
"refreshFrequency": "Annual verification.",
"sourceConfidence": "high",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"state": "DC",
"stateFips": "11",
"hasStateSalesTax": true,
"localRatesApply": false,
"officialRateSources": ["sstContact"],
"officialBoundarySources": [],
"lookupTools": [],
"machineReadableImportPlan": "District-only general rate; no local boundary import.",
"addressResolutionNeeded": false,
"joinKeys": ["stateFips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Product/labor review still required for retrofit categories.", "sourceIds": ["sstContact"]}],
"effectiveDateRules": "Use District effective dates.",
"refreshFrequency": "Quarterly verification.",
"sourceConfidence": "medium",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "FL",
"stateFips": "12",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["flSales"],
"officialBoundarySources": ["flPointMatch"],
"lookupTools": [{"sourceId": "flPointMatch", "inputs": ["singleAddress", "fullStreet", "jurisdiction", "county", "specialFireDistrict"]}],
"machineReadableImportPlan": "Use PointMatch/Address-Jurisdiction Database as canonical address-to-county/surtax engine; store county, surtax, special district, pending changes, and tax type.",
"addressResolutionNeeded": true,
"joinKeys": ["address", "county", "jurisdiction", "specialFireDistrict", "taxType", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "PointMatch may expose future pending changes; version by effective date.", "sourceIds": ["flPointMatch", "flSales"]}],
"effectiveDateRules": "Use source effective dates and pending-change dates.",
"refreshFrequency": "Transaction-time lookup plus monthly PointMatch monitoring.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "GA",
"stateFips": "13",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:GAR2026Q3JUN05.csv", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:GAB2026Q3MAY19.zip", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "Import SST rate/boundary files; join boundary tax-code/FIPS records to rate rows by jurisdiction and transaction date.",
"addressResolutionNeeded": true,
"joinKeys": ["zip5", "zip9", "jurisdictionCode", "fips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST file begin/end/effective dates and corrected-file updates.",
"refreshFrequency": "Quarterly SST polling plus file-update notices.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "HI",
"stateFips": "15",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["hiGet", "hiSurcharge"],
"officialBoundarySources": ["hiSurcharge"],
"lookupTools": [],
"machineReadableImportPlan": "Model Hawaii as GET/use-tax analog; import county surcharge/pass-on tables by county, rate class, tax type, and effective period.",
"addressResolutionNeeded": true,
"joinKeys": ["county", "activityRateClass", "taxType", "effectiveStart", "effectiveEnd"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "GET/use surcharge applies by county and activity rate; pass-on is separate from conventional sales tax.", "sourceIds": ["hiGet", "hiSurcharge"]}],
"effectiveDateRules": "County surcharge entries have stated start/end dates and rate-class limits.",
"refreshFrequency": "Quarterly DOTAX table check and before period-end dates.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["get_activity_class_review", "project_taxability_review"]
},
{
"state": "ID",
"stateFips": "16",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["idBasics"],
"officialBoundarySources": ["idLocal"],
"lookupTools": [],
"machineReadableImportPlan": "Import state rate and local resort-city option taxes from Idaho Tax Commission and local city sources; no statewide address API confirmed.",
"addressResolutionNeeded": true,
"joinKeys": ["city", "resortCity", "productCategory", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Resort cities choose local tax base.", "sourceIds": ["idLocal"]}],
"effectiveDateRules": "Use source effective dates.",
"refreshFrequency": "Quarterly state check; city-by-city local verification.",
"sourceConfidence": "medium",
"humanReviewRequired": true,
"humanReviewReasons": ["local_tax_base_review", "project_taxability_review"]
},
{
"state": "IL",
"stateFips": "17",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["ilRateDb"],
"officialBoundarySources": ["ilRateDb", "ilDest"],
"lookupTools": [{"sourceId": "ilDest", "inputs": ["address", "zip9", "originOrDestination"]}],
"machineReadableImportPlan": "Import machine-readable county/municipality and address-specific files; for destination sales resolve address, ZIP9, and Location Code.",
"addressResolutionNeeded": true,
"joinKeys": ["address", "zip9", "locationCode", "originOrDestination", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Local taxes include home rule, transit, park, county, and school facility overlays.", "sourceIds": ["ilRateDb", "ilDest"]}],
"effectiveDateRules": "Rate changes generally Jan. 1 or Jul. 1.",
"refreshFrequency": "Semiannual import before Jan/Jul plus transaction validation.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "IN",
"stateFips": "18",
"hasStateSalesTax": true,
"localRatesApply": false,
"officialRateSources": ["sstRateDir:INR2008Q4MAY7.csv", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:INB2005Q1JAN6.csv", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "State-only general rate; optional SST file import for audit/history; no local boundary layer required.",
"addressResolutionNeeded": false,
"joinKeys": ["stateFips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST/state effective dates.",
"refreshFrequency": "Quarterly SST polling plus state notices.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "IA",
"stateFips": "19",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:IAR2025Q3MAY30.zip", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:IAB2026Q3MAY19.zip", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "Import SST rate/boundary files; join tax-code/FIPS records by jurisdiction and transaction date.",
"addressResolutionNeeded": true,
"joinKeys": ["zip5", "zip9", "jurisdictionCode", "fips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST begin/end/effective dates.",
"refreshFrequency": "Quarterly SST polling.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "KS",
"stateFips": "20",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:KSR2026Q3MAY20.zip", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:KSB2026Q3MAY20.zip", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "Import SST files; support product-rate-class boundary overrides such as Kansas alternate boundary file for food-rate reduction.",
"addressResolutionNeeded": true,
"joinKeys": ["zip5", "zip9", "jurisdictionCode", "fips", "productRateClass", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Schema should support product-rate-class boundary overrides.", "sourceIds": ["sstPolicy"]}],
"effectiveDateRules": "Use SST begin/end/effective dates.",
"refreshFrequency": "Quarterly SST polling.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "KY",
"stateFips": "21",
"hasStateSalesTax": true,
"localRatesApply": false,
"officialRateSources": ["sstRateDir:KYR2012Q4Aug13.csv", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:KYB2013Q2MAR13.csv", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "State-only general rate; optional SST file import for audit/history; no local boundary layer required.",
"addressResolutionNeeded": false,
"joinKeys": ["stateFips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST/state effective dates.",
"refreshFrequency": "Quarterly verification.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "LA",
"stateFips": "22",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["laRate", "laParish"],
"officialBoundarySources": ["laLookup"],
"lookupTools": [{"sourceId": "laLookup", "inputs": ["address", "coordinates", "filingPeriod"]}],
"machineReadableImportPlan": "Use Parish E-File/Sales Tax Explorer by address/coordinates and filing period; store parish/city components and local response.",
"addressResolutionNeeded": true,
"joinKeys": ["address", "latitude", "longitude", "parish", "city", "filingPeriod", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Local political-subdivision taxes are in addition to state tax and are centrally filed but locally complex.", "sourceIds": ["laRate", "laParish", "laLookup"]}],
"effectiveDateRules": "Use filing period and transaction date; state rate source notes Jan. 1, 2025 rate.",
"refreshFrequency": "Transaction-time lookup plus monthly LDR/local updates.",
"sourceConfidence": "medium",
"humanReviewRequired": true,
"humanReviewReasons": ["local_complexity_review", "project_taxability_review"]
},
{
"state": "ME",
"stateFips": "23",
"hasStateSalesTax": true,
"localRatesApply": false,
"officialRateSources": ["sstContact"],
"officialBoundarySources": [],
"lookupTools": [],
"machineReadableImportPlan": "State-only general rate; no local boundary import.",
"addressResolutionNeeded": false,
"joinKeys": ["stateFips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "No local rate layer found; product/labor review still required.", "sourceIds": ["sstContact"]}],
"effectiveDateRules": "Use state effective dates.",
"refreshFrequency": "Quarterly verification.",
"sourceConfidence": "medium",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "MD",
"stateFips": "24",
"hasStateSalesTax": true,
"localRatesApply": false,
"officialRateSources": ["sstContact"],
"officialBoundarySources": [],
"lookupTools": [],
"machineReadableImportPlan": "State-only general rate; no local boundary import.",
"addressResolutionNeeded": false,
"joinKeys": ["stateFips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "No local rate layer found; product/labor review still required.", "sourceIds": ["sstContact"]}],
"effectiveDateRules": "Use state effective dates.",
"refreshFrequency": "Quarterly verification.",
"sourceConfidence": "medium",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "MA",
"stateFips": "25",
"hasStateSalesTax": true,
"localRatesApply": false,
"officialRateSources": ["sstContact"],
"officialBoundarySources": [],
"lookupTools": [],
"machineReadableImportPlan": "State-only general rate; no local boundary import.",
"addressResolutionNeeded": false,
"joinKeys": ["stateFips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "No local rate layer found; product/labor review still required.", "sourceIds": ["sstContact"]}],
"effectiveDateRules": "Use state effective dates.",
"refreshFrequency": "Quarterly verification.",
"sourceConfidence": "medium",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "MI",
"stateFips": "26",
"hasStateSalesTax": true,
"localRatesApply": false,
"officialRateSources": ["sstRateDir:MIR2023Q1DEC22.csv", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:MIB2023Q1DEC15.csv", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "State-only general rate; optional SST file import for audit/history; no local boundary layer required.",
"addressResolutionNeeded": false,
"joinKeys": ["stateFips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST/state effective dates.",
"refreshFrequency": "Quarterly verification.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "MN",
"stateFips": "27",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:MNR2026Q3MAY20.zip", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:MNB2026Q3MAY20.zip", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "Import SST rate/boundary files; join tax-code/FIPS records by jurisdiction and transaction date.",
"addressResolutionNeeded": true,
"joinKeys": ["zip5", "zip9", "jurisdictionCode", "fips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST begin/end/effective dates.",
"refreshFrequency": "Quarterly SST polling.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "MS",
"stateFips": "28",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["msIndex", "msRates"],
"officialBoundarySources": ["msIndex"],
"lookupTools": [],
"machineReadableImportPlan": "Import DOR state rates, local tourism/economic-development tables, and city/county filing lists; no official address boundary API confirmed.",
"addressResolutionNeeded": true,
"joinKeys": ["city", "county", "localTaxType", "businessActivity", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Construction contracting and listed installation/repair services can have special rates or tax bases.", "sourceIds": ["msRates"]}],
"effectiveDateRules": "Use DOR effective dates.",
"refreshFrequency": "Monthly DOR rate/local-tax polling.",
"sourceConfidence": "medium",
"humanReviewRequired": true,
"humanReviewReasons": ["no_address_api_confirmed", "construction_category_review", "project_taxability_review"]
},
{
"state": "MO",
"stateFips": "29",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["moSales", "moTables"],
"officialBoundarySources": ["moSales"],
"lookupTools": [{"sourceId": "moSales", "inputs": ["address"]}],
"machineReadableImportPlan": "Use Missouri DOR address portal and yearly rate tables; store jurisdiction stack and special item rate flags.",
"addressResolutionNeeded": true,
"joinKeys": ["address", "city", "county", "district", "specialItemRateClass", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Portal is built from local GIS maps and includes special item rates.", "sourceIds": ["moSales"]}],
"effectiveDateRules": "Local changes and expirations occur on calendar-quarter dates.",
"refreshFrequency": "Quarterly import aligned to Jan/Apr/Jul/Oct plus transaction lookup.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "MT",
"stateFips": "30",
"hasStateSalesTax": false,
"localRatesApply": true,
"officialRateSources": ["mtGeneral", "mtResort"],
"officialBoundarySources": ["mtResort"],
"lookupTools": [],
"machineReadableImportPlan": "No general state tax import. For resort/local taxes, import official local ordinances/rate schedules; do not rely solely on DOR informational list.",
"addressResolutionNeeded": true,
"joinKeys": ["resortArea", "municipalityOrCounty", "localOrdinance", "productCategory", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Local resort tax is limited local sales tax on specified activities/luxuries; DOR does not administer it.", "sourceIds": ["mtGeneral", "mtResort"]}],
"effectiveDateRules": "Local resort tax effective dates/rates are local-voter/local-ordinance driven.",
"refreshFrequency": "Verify active resort areas/local ordinances before enabling.",
"sourceConfidence": "medium",
"humanReviewRequired": true,
"humanReviewReasons": ["local_source_required", "local_product_base_review"]
},
{
"state": "NE",
"stateFips": "31",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:NER2026Q3MAY26.zip", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:NEB2026Q3JUN08.zip", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "Import SST rate/boundary files; join tax-code/FIPS records by jurisdiction and transaction date.",
"addressResolutionNeeded": true,
"joinKeys": ["zip5", "zip9", "jurisdictionCode", "fips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST begin/end/effective dates.",
"refreshFrequency": "Quarterly SST polling.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "NV",
"stateFips": "32",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:NVR2025Q4NOV05.zip", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:NVB2025Q4NOV05.zip", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "Import SST rate/boundary files; join tax-code/FIPS records by jurisdiction and transaction date.",
"addressResolutionNeeded": true,
"joinKeys": ["zip5", "zip9", "jurisdictionCode", "fips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST begin/end/effective dates.",
"refreshFrequency": "Quarterly SST polling.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "NH",
"stateFips": "33",
"hasStateSalesTax": false,
"localRatesApply": false,
"officialRateSources": ["nhInfo"],
"officialBoundarySources": [],
"lookupTools": [],
"machineReadableImportPlan": "No sales/use tax rate import for retrofit sales.",
"addressResolutionNeeded": false,
"joinKeys": ["stateFips"],
"equipmentTaxabilityDefault": "exempt",
"installationLaborTaxabilityDefault": "exempt",
"retrofitSpecificNotes": [{"note": "No general sales tax on goods; no state/local sales/use calculation for retrofit equipment/labor.", "sourceIds": ["nhInfo"]}],
"effectiveDateRules": "Not applicable.",
"refreshFrequency": "Annual verification.",
"sourceConfidence": "high",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"state": "NJ",
"stateFips": "34",
"hasStateSalesTax": true,
"localRatesApply": false,
"officialRateSources": ["sstRateDir:NJR2018Q1OCT16.zip", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:NJB2019Q2MAR27.csv", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "State-only general rate; optional SST file import for audit/history; no local boundary layer required.",
"addressResolutionNeeded": false,
"joinKeys": ["stateFips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST/state effective dates.",
"refreshFrequency": "Quarterly verification.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "NM",
"stateFips": "35",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["nmOverview"],
"officialBoundarySources": ["nmMap", "nmTools"],
"lookupTools": [{"sourceId": "nmTools", "inputs": ["streetAddress"]}],
"machineReadableImportPlan": "Model as gross receipts/compensating tax analog. Use GRT API/GIS files to map street address to location code/rate; do not treat map locator alone as authoritative.",
"addressResolutionNeeded": true,
"joinKeys": ["streetAddress", "grtLocationCode", "county", "municipality", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "GRT covers property sales and services, including construction/materials becoming part of the project.", "sourceIds": ["nmWho"]}],
"effectiveDateRules": "After July 1, 2025 rates generally change only in July except special situations.",
"refreshFrequency": "Annual July import plus exception monitoring; transaction-time API lookup.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["grt_service_deduction_review", "project_taxability_review"]
},
{
"state": "NY",
"stateFips": "36",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["nyRates", "nyPubs"],
"officialBoundarySources": ["nyZipWarn"],
"lookupTools": [{"sourceId": "nyRates", "inputs": ["address", "zip"]}],
"machineReadableImportPlan": "Use Jurisdiction/Rate Lookup by Address; import Publication 718 series for current/historical rates and product-specific local exceptions; never use ZIP-only.",
"addressResolutionNeeded": true,
"joinKeys": ["address", "jurisdictionCode", "county", "cityOrSchoolDistrict", "mctdFlag", "productPublication", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Residential energy and residential solar equipment/installations have product-specific local publications.", "sourceIds": ["nyPubs"]}],
"effectiveDateRules": "Use jurisdiction-code and publication effective dates.",
"refreshFrequency": "Transaction-time address lookup plus monthly publication monitoring.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["address_required_no_zip_shortcut", "product_specific_publication_review"]
},
{
"state": "NC",
"stateFips": "37",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:NCR2026Q3APR23.csv", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:NCB2026Q3APR23.zip", "sstPolicy", "ncBoundary"],
"lookupTools": [],
"machineReadableImportPlan": "Import SST rate/boundary files; North Carolina boundary data includes street-address-level data.",
"addressResolutionNeeded": true,
"joinKeys": ["zip5", "zip9", "streetAddress", "fips", "jurisdictionCode", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "NCDOR says NC SST boundary includes street-address-level data.", "sourceIds": ["ncBoundary"]}],
"effectiveDateRules": "Use SST begin/end/effective dates.",
"refreshFrequency": "Quarterly SST polling.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "ND",
"stateFips": "38",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:NDR2026Q3MAY19.zip", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:NDB2026Q3MAY19.zip", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "Import SST rate/boundary files; join tax-code/FIPS records by jurisdiction and transaction date.",
"addressResolutionNeeded": true,
"joinKeys": ["zip5", "zip9", "jurisdictionCode", "fips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST begin/end/effective dates.",
"refreshFrequency": "Quarterly SST polling.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "OH",
"stateFips": "39",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:OHR2026Q1NOV28.csv", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:OHB2026Q1NOV28.zip", "sstPolicy", "ohInstructions"],
"lookupTools": [],
"machineReadableImportPlan": "Import SST files; validate FIPS/jurisdiction joins and per-component/date-effective computation.",
"addressResolutionNeeded": true,
"joinKeys": ["zip5", "zip9", "fipsState", "fipsCounty", "specialTaxDistrictCode", "jurisdictionFipsCode", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Ohio instructions require FIPS/jurisdiction joins and per-component/date-effective computation.", "sourceIds": ["ohInstructions"]}],
"effectiveDateRules": "Use SST begin/end/effective dates.",
"refreshFrequency": "Quarterly SST polling.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "OK",
"stateFips": "40",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:OKR2026Q3MAY29.zip", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:OKB2026Q3JUN10.zip", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "Import SST rate/boundary files; join tax-code/FIPS records by jurisdiction and transaction date.",
"addressResolutionNeeded": true,
"joinKeys": ["zip5", "zip9", "jurisdictionCode", "fips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST begin/end/effective dates.",
"refreshFrequency": "Quarterly SST polling.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "OR",
"stateFips": "41",
"hasStateSalesTax": false,
"localRatesApply": false,
"officialRateSources": ["orInfo"],
"officialBoundarySources": [],
"lookupTools": [],
"machineReadableImportPlan": "No general sales/use tax import; special vehicle tax is separate and outside retrofit default.",
"addressResolutionNeeded": false,
"joinKeys": ["stateFips"],
"equipmentTaxabilityDefault": "exempt",
"installationLaborTaxabilityDefault": "exempt",
"retrofitSpecificNotes": [{"note": "No general sales/use/transaction tax for retrofit equipment/labor calculation.", "sourceIds": ["orInfo"]}],
"effectiveDateRules": "Not applicable.",
"refreshFrequency": "Annual verification.",
"sourceConfidence": "high",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"state": "PA",
"stateFips": "42",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["paSales", "paUse"],
"officialBoundarySources": ["paSales"],
"lookupTools": [],
"machineReadableImportPlan": "Import state/county/city overlay table: base rate plus Allegheny County and Philadelphia; resolve address to county/city for safety.",
"addressResolutionNeeded": true,
"joinKeys": ["county", "city", "philadelphiaFlag", "alleghenyFlag", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use tax local overlay applies to purchases delivered to/used in Allegheny or Philadelphia; product/service taxability requires review.", "sourceIds": ["paSales", "paUse"]}],
"effectiveDateRules": "Use state/local effective dates.",
"refreshFrequency": "Quarterly verification; product/service lists separate.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["product_service_list_review", "local_overlay_resolution"]
},
{
"state": "RI",
"stateFips": "44",
"hasStateSalesTax": true,
"localRatesApply": false,
"officialRateSources": ["sstRateDir:RIR2019Q2MAR27.csv", "sstContact", "riSst"],
"officialBoundarySources": ["sstBoundaryDir:RIB2019Q2MAR27.csv", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "State-only general rate; optional SST file import for audit/history; no local boundary layer required.",
"addressResolutionNeeded": false,
"joinKeys": ["stateFips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "RI conforms to SSUTA and points to the SST Taxability Matrix.", "sourceIds": ["riSst", "sstMatrix"]}],
"effectiveDateRules": "Use SST/state effective dates.",
"refreshFrequency": "Quarterly verification.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "SC",
"stateFips": "45",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["scSales", "scLocal"],
"officialBoundarySources": ["scMap"],
"lookupTools": [{"sourceId": "scMap", "inputs": ["address"]}],
"machineReadableImportPlan": "Use SC District Information map for address validation and import ST-500/ST-575/local tax lists; preserve each local tax restriction/specification.",
"addressResolutionNeeded": true,
"joinKeys": ["address", "county", "municipality", "district", "localTaxType", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Separately stated reasonable installation charges are not taxable; unseparated/unreasonable charges are taxable.", "sourceIds": ["scSales"]}],
"effectiveDateRules": "Local changes have stated effective dates and restrictions/specifications.",
"refreshFrequency": "Monthly local-change monitoring plus transaction address validation.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["installation_invoice_presentation_review", "local_restriction_review"]
},
{
"state": "SD",
"stateFips": "46",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:SDR2026Q3JUN02.zip", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:SDB2026Q3JUN04.zip", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "Import SST rate/boundary files; join tax-code/FIPS records by jurisdiction and transaction date.",
"addressResolutionNeeded": true,
"joinKeys": ["zip5", "zip9", "jurisdictionCode", "fips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST begin/end/effective dates.",
"refreshFrequency": "Quarterly SST polling.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "TN",
"stateFips": "47",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:TNR2026Q3JUN11.csv", "tnSst"],
"officialBoundarySources": ["sstBoundaryDir:TNB2026Q3MAY22.zip", "tnSst"],
"lookupTools": [{"sourceId": "tnLookup", "inputs": ["street", "city", "zip"]}],
"machineReadableImportPlan": "Import Tennessee SST/downloadable rate and boundary files; validate uncertain addresses with TNMap lookup.",
"addressResolutionNeeded": true,
"joinKeys": ["street", "city", "zip", "jurisdictionCode", "fips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "TN publishes rate-table and boundary-download effective dates.", "sourceIds": ["tnSst", "tnLookup"]}],
"effectiveDateRules": "Use SST/TN downloadable effective dates.",
"refreshFrequency": "Quarterly SST/TN file polling plus transaction lookup.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "TX",
"stateFips": "48",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["txSales", "txLocal"],
"officialBoundarySources": ["txSales", "txLocal"],
"lookupTools": [{"sourceId": "txLocal", "inputs": ["address", "saleLocation", "deliveryLocation"]}],
"machineReadableImportPlan": "Import downloadable city/county/transit/SPD/combined-area files and quarterly updates; validate by address; implement local 2% cap, combined-area codes, same-type exclusion, and use-tax ordering.",
"addressResolutionNeeded": true,
"joinKeys": ["address", "cityCode", "countyCode", "transitCode", "specialPurposeDistrictCode", "combinedAreaCode", "saleLocation", "deliveryLocation", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Texas local calculation is not a simple sum and ZIPs are not boundary-safe.", "sourceIds": ["txLocal"]}],
"effectiveDateRules": "Use quarterly update files and transaction-specific sales/use sourcing rules.",
"refreshFrequency": "Quarterly import plus transaction-time address validation.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["texas_local_cap_and_ordering_required", "address_required_no_zip_shortcut", "project_taxability_review"]
},
{
"state": "UT",
"stateFips": "49",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:UTR2026Q3MAY11.zip", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:UTB2026Q3MAY11.zip", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "Import SST rate/boundary files; join tax-code/FIPS records by jurisdiction and transaction date.",
"addressResolutionNeeded": true,
"joinKeys": ["zip5", "zip9", "jurisdictionCode", "fips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST begin/end/effective dates.",
"refreshFrequency": "Quarterly SST polling.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "VT",
"stateFips": "50",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:VTR2026Q3MAY20.zip", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:VTB2026Q3MAY20.zip", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "Import SST rate/boundary files; join tax-code/FIPS records by jurisdiction and transaction date.",
"addressResolutionNeeded": true,
"joinKeys": ["zip5", "zip9", "jurisdictionCode", "fips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST begin/end/effective dates.",
"refreshFrequency": "Quarterly SST polling.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "VA",
"stateFips": "51",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["vaSales"],
"officialBoundarySources": ["vaLookup"],
"lookupTools": [{"sourceId": "vaLookup", "inputs": ["mapLocation", "cityOrCounty"]}],
"machineReadableImportPlan": "Import Virginia Excel rate/locality-code table; use map/geocoding to validate ambiguous locations; preserve item-type rate differences.",
"addressResolutionNeeded": true,
"joinKeys": ["localityCode", "city", "county", "town", "itemType", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Rates vary by locality and item type; locality codes are official join keys.", "sourceIds": ["vaLookup", "vaSales"]}],
"effectiveDateRules": "Use source effective dates; do not infer history from current-only lookup.",
"refreshFrequency": "Quarterly check; refresh when rate/locality Excel changes.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "WA",
"stateFips": "53",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:WAR2026Q3MAY27.zip", "waTools"],
"officialBoundarySources": ["sstBoundaryDir:WAB2026Q3MAY27.zip", "waTools"],
"lookupTools": [{"sourceId": "waTools", "inputs": ["address", "zipPlus4", "latitudeLongitude"]}],
"machineReadableImportPlan": "Import SST and DOR address/rate download files; use address, ZIP+4, or lat/long URL lookup for real-time validation; persist location code and components.",
"addressResolutionNeeded": true,
"joinKeys": ["address", "zipPlus4", "latitude", "longitude", "locationCode", "jurisdictionCode", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Washington supports address/ZIP+4 and latitude/longitude lookup plus downloadable rate files.", "sourceIds": ["waTools"]}],
"effectiveDateRules": "Use source effective dates; do not infer history from current-only lookup.",
"refreshFrequency": "Quarterly SST/DOR import plus transaction-time URL lookup.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "WV",
"stateFips": "54",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:WVR2026Q3FEB25.csv", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:WVB2026Q3APR29.csv", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "Import SST rate/boundary files; join tax-code/FIPS records by jurisdiction and transaction date.",
"addressResolutionNeeded": true,
"joinKeys": ["zip5", "zip9", "jurisdictionCode", "fips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST begin/end/effective dates.",
"refreshFrequency": "Quarterly SST polling.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "WI",
"stateFips": "55",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:WIR2026Q3MAY22.csv", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:WIB2026Q3MAY22.zip", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "Import SST rate/boundary files; join tax-code/FIPS records by jurisdiction and transaction date.",
"addressResolutionNeeded": true,
"joinKeys": ["zip5", "zip9", "jurisdictionCode", "fips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST begin/end/effective dates.",
"refreshFrequency": "Quarterly SST polling.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
},
{
"state": "WY",
"stateFips": "56",
"hasStateSalesTax": true,
"localRatesApply": true,
"officialRateSources": ["sstRateDir:WYR2026Q3JUN2.CSV", "sstContact"],
"officialBoundarySources": ["sstBoundaryDir:WYB2026Q3MAY18.CSV", "sstPolicy"],
"lookupTools": [],
"machineReadableImportPlan": "Import SST rate/boundary files; join tax-code/FIPS records by jurisdiction and transaction date.",
"addressResolutionNeeded": true,
"joinKeys": ["zip5", "zip9", "jurisdictionCode", "fips", "effectiveDate"],
"equipmentTaxabilityDefault": "category_specific",
"installationLaborTaxabilityDefault": "category_specific",
"retrofitSpecificNotes": [{"note": "Use SST Taxability Matrix, then state guidance for retrofit equipment/labor.", "sourceIds": ["sstMatrix", "sstMatrixInstructions"]}],
"effectiveDateRules": "Use SST begin/end/effective dates.",
"refreshFrequency": "Quarterly SST polling.",
"sourceConfidence": "high",
"humanReviewRequired": true,
"humanReviewReasons": ["project_taxability_review"]
}
],
"normalizedRuleSchemaRecommendations": {
"taskPromptCitation": "",
"separateConcerns": [
"geographyRateLayer: official address/coordinate/ZIP+4/county/city/special-district resolution to rates and jurisdiction components",
"taxabilityLayer: product category, labor category, construction-contract role, real-property treatment, exemption certificate, and customer type",
"taxpayerProjectLayer: nexus/registration, seller location, delivery/jobsite, transaction date, and invoice presentation"
],
"recommendedCoreTables": {
"jurisdiction": ["jurisdictionId", "stateFips", "jurisdictionType", "name", "fipsOrCode", "validFrom", "validTo", "sourceId"],
"boundaryResolution": ["boundaryId", "stateFips", "sourceType", "addressRequired", "zip5", "zip9", "streetRangeOrShape", "taxAreaOrJurisdictionCode", "validFrom", "validTo", "sourceId"],
"rateComponent": ["rateComponentId", "jurisdictionId", "taxType", "productRateClass", "rate", "beginDate", "endDate", "sourceId"],
"rateStack": ["rateStackId", "boundaryId", "transactionDate", "components", "totalRate", "calculationMethod", "sourceConfidence", "estimateConfidence"],
"taxabilityRule": ["taxabilityRuleId", "state", "productCategory", "laborCategory", "projectRole", "realPropertyTreatment", "taxability", "measureOfTax", "documentationRequired", "validFrom", "validTo", "sourceId", "humanReviewRequired"],
"lookupAudit": ["lookupId", "inputAddress", "normalizedAddress", "coordinates", "lookupTool", "responseHash", "matchedJurisdictionStack", "transactionDate", "queriedAt", "warnings"]
},
"confidenceModel": {
"sourceConfidence": "Authority/completeness of official source for baseline rule data.",
"estimateConfidence": "Per-transaction confidence after address quality, effective date, product/labor classification, and exemption/project facts are known."
},
"safestUserFacingBehavior": "If official data is incomplete or no machine-readable boundary/API exists, do not guess a combined rate. Request full address/project facts, use official lookup where available, or return manual_review_required."
},
"importPriorityOrder": [
"SST member-state current rate/boundary files with quarterly corrected-file monitoring",
"Official state address/API tools: CA, CO, FL, IL, LA, MO, NM, NY, TN, TX, VA, WA, and available SST lookup tools",
"State rate/local tables for AL, AZ, ID, MS, PA, SC, HI",
"Local-only/no-state sources for AK municipalities and MT resort/local-option taxes from official local ordinances",
"No-general-sales-tax states DE, NH, OR as no-rate states; model non-sales taxes separately"
],
"validationRules": [
"Require transactionDate for every rate decision.",
"When local rates apply, require full normalized address or official coordinate/address lookup unless state source clearly supports county/city-only resolution.",
"Do not rely on ZIP-only where official sources warn against it or where special districts split ZIPs; NY and TX explicitly require address caution.",
"For SST states, import rate and boundary files together and validate jurisdiction/tax-code/FIPS joins.",
"Compute and store state, county, city, transit, special-district, and combined-area components separately.",
"Keep geography-derived facts separate from taxpayer/project-specific facts.",
"Treat category_specific equipment/labor defaults as blocking flags until taxability rules or human review are applied.",
"Store sourceConfidence separately from estimateConfidence.",
"For no-general-sales-tax states, return no sales/use estimate but preserve separate non-sales tax modules where relevant.",
"Version pending/future changes by begin/end date and never apply before effective start."
]
}

[1]: https://www.streamlinedsalestax.org/contacts/state-contact-information "https://www.streamlinedsalestax.org/contacts/state-contact-information"
[2]: https://www.streamlinedsalestax.org/Shared-Pages/rate-and-boundary-files "https://www.streamlinedsalestax.org/Shared-Pages/rate-and-boundary-files"
[3]: https://streamlinedsalestax.org/ratesandboundry/Rates/ "https://streamlinedsalestax.org/ratesandboundry/Rates/"
[4]: https://streamlinedsalestax.org/ratesandboundry/Boundary/ "https://streamlinedsalestax.org/ratesandboundry/Boundary/"
[5]: https://www.streamlinedsalestax.org/Shared-Pages/State-taxability-matrix "https://www.streamlinedsalestax.org/Shared-Pages/State-taxability-matrix"
[6]: https://www.streamlinedsalestax.org/for-states/taxability-matrix---About/state-instructions-for-taxability-matrix "https://www.streamlinedsalestax.org/for-states/taxability-matrix---About/state-instructions-for-taxability-matrix"
[7]: https://www.revenue.alabama.gov/sales-use/tax-rates/?utm_source=chatgpt.com "Sales and Use Tax Rates - Alabama Department of Revenue"
[8]: https://www.alabamainteractive.org/ador_taxrate_lookup/welcome.action "https://www.alabamainteractive.org/ador_taxrate_lookup/welcome.action"
[9]: https://www.commerce.alaska.gov/web/dcra/OfficeoftheStateAssessor/AlaskaSalesTaxInformation.aspx "https://www.commerce.alaska.gov/web/dcra/OfficeoftheStateAssessor/AlaskaSalesTaxInformation.aspx"
[10]: https://azdor.gov/business/transaction-privilege-tax/tax-rate-table "https://azdor.gov/business/transaction-privilege-tax/tax-rate-table"
[11]: https://azdor.gov/business/transaction-privilege-tax "https://azdor.gov/business/transaction-privilege-tax"
[12]: https://www.dfa.arkansas.gov/office/taxes/excise-tax-administration/sales-use-tax/streamlined-tax-lookup/ "https://www.dfa.arkansas.gov/office/taxes/excise-tax-administration/sales-use-tax/streamlined-tax-lookup/"
[13]: https://maps.cdtfa.ca.gov/ "https://maps.cdtfa.ca.gov/"
[14]: https://gis.data.ca.gov/datasets/CDTFA%3A%3Acalifornia-sales-and-use-tax-rate-rest-api "https://gis.data.ca.gov/datasets/CDTFA%3A%3Acalifornia-sales-and-use-tax-rate-rest-api"
[15]: https://cdtfa.ca.gov/industry/construction-contractors/industry-topics.htm "Industry Topics - Tax Guide for Construction Contractors"
[16]: https://cdtfa.ca.gov/lawguides/vol1/sutr/1521.html "Regulation 1521"
[17]: https://tax.colorado.gov/how-to-look-up-sales-use-tax-rates "https://tax.colorado.gov/how-to-look-up-sales-use-tax-rates"
[18]: https://tax.colorado.gov/GIS-API "https://tax.colorado.gov/GIS-API"
[19]: https://tax.colorado.gov/SUTS-info "https://tax.colorado.gov/SUTS-info"
[20]: https://revenue.delaware.gov/business-tax-forms/doing-business-in-delaware/ "https://revenue.delaware.gov/business-tax-forms/doing-business-in-delaware/"
[21]: https://pointmatch.floridarevenue.com/ "https://pointmatch.floridarevenue.com/"
[22]: https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx "https://floridarevenue.com/taxes/taxesfees/Pages/sales_tax.aspx"
[23]: https://tax.hawaii.gov/geninfo/get/ "https://tax.hawaii.gov/geninfo/get/"
[24]: https://tax.hawaii.gov/geninfo/countysurcharge/ "https://tax.hawaii.gov/geninfo/countysurcharge/"
[25]: https://tax.idaho.gov/taxes/sales-use/online-guide/ "https://tax.idaho.gov/taxes/sales-use/online-guide/"
[26]: https://tax.idaho.gov/taxes/sales-use/sales-tax/local-sales-tax/city-sales-tax/ "https://tax.idaho.gov/taxes/sales-use/sales-tax/local-sales-tax/city-sales-tax/"
[27]: https://tax.illinois.gov/research/taxrates.html "https://tax.illinois.gov/research/taxrates.html"
[28]: https://tax.illinois.gov/research/taxinformation/sales/destination-based-sales-tax-assistance.html "https://tax.illinois.gov/research/taxinformation/sales/destination-based-sales-tax-assistance.html"
[29]: https://parishe-file.revenue.louisiana.gov/lookup/lookup.aspx "https://parishe-file.revenue.louisiana.gov/lookup/lookup.aspx"
[30]: https://revenue.louisiana.gov/tax-education-and-faqs/faqs/sales-tax/what-is-the-sales-tax-rate-in-louisiana/ "https://revenue.louisiana.gov/tax-education-and-faqs/faqs/sales-tax/what-is-the-sales-tax-rate-in-louisiana/"
[31]: https://parishe-file.revenue.louisiana.gov/ "https://parishe-file.revenue.louisiana.gov/"
[32]: https://www.dor.ms.gov/sales-and-use-tax "https://www.dor.ms.gov/sales-and-use-tax"
[33]: https://www.dor.ms.gov/business/sales-use-tax/sales-tax-rates "https://www.dor.ms.gov/business/sales-use-tax/sales-tax-rates"
[34]: https://dor.mo.gov/taxation/business/tax-types/sales-use/ "https://dor.mo.gov/taxation/business/tax-types/sales-use/"
[35]: https://dor.mo.gov/taxation/business/tax-types/sales-use/rate-tables/ "https://dor.mo.gov/taxation/business/tax-types/sales-use/rate-tables/"
[36]: https://revenue.mt.gov/taxes/general-sales-tax "https://revenue.mt.gov/taxes/general-sales-tax"
[37]: https://revenue.mt.gov/taxes/miscellaneous/local-resort-tax "https://revenue.mt.gov/taxes/miscellaneous/local-resort-tax"
[38]: https://www.revenue.nh.gov/resource-center/frequently-asked-questions/general-information "https://www.revenue.nh.gov/resource-center/frequently-asked-questions/general-information"
[39]: https://www.tax.newmexico.gov/governments/gross-receipts-location-code-and-tax-rate-map/ "https://www.tax.newmexico.gov/governments/gross-receipts-location-code-and-tax-rate-map/"
[40]: https://www.tax.newmexico.gov/businesses/gross-receipts-overview/ "https://www.tax.newmexico.gov/businesses/gross-receipts-overview/"
[41]: https://www.tax.newmexico.gov/grt-rate-finder-tools/ "https://www.tax.newmexico.gov/grt-rate-finder-tools/"
[42]: https://www.tax.newmexico.gov/businesses/gross-receipts-overview/who-must-file/ "https://www.tax.newmexico.gov/businesses/gross-receipts-overview/who-must-file/"
[43]: https://www.tax.ny.gov/bus/st/rates.htm "https://www.tax.ny.gov/bus/st/rates.htm"
[44]: https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/sales_tax_rate_publications.htm "https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/sales_tax_rate_publications.htm"
[45]: https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/motor_vehicles_and_boats.htm "https://www.tax.ny.gov/pubs_and_bulls/tg_bulletins/st/motor_vehicles_and_boats.htm"
[46]: https://www.ncdor.gov/taxes-forms/sales-and-use-tax/other-sales-and-use-tax-resources/streamlined-sales-tax-information/rate-and-boundary-database-information "https://www.ncdor.gov/taxes-forms/sales-and-use-tax/other-sales-and-use-tax-resources/streamlined-sales-tax-information/rate-and-boundary-database-information"
[47]: https://thefinder.tax.ohio.gov/streamlinesalestaxweb/Download/SSTPRateTableInstructions.aspx "https://thefinder.tax.ohio.gov/streamlinesalestaxweb/Download/SSTPRateTableInstructions.aspx"
[48]: https://www.oregon.gov/dor/programs/businesses/pages/sales-tax.aspx "https://www.oregon.gov/dor/programs/businesses/pages/sales-tax.aspx"
[49]: https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/sales-use-and-hotel-occupancy-tax "https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/sales-use-and-hotel-occupancy-tax"
[50]: https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/sales-use-and-hotel-occupancy-tax/use-tax/use-tax-for-individuals "https://www.pa.gov/agencies/revenue/resources/tax-types-and-information/sales-use-and-hotel-occupancy-tax/use-tax/use-tax-for-individuals"
[51]: https://tax.ri.gov/tax-sections/sales-excise-taxes/streamlined-sales-tax "https://tax.ri.gov/tax-sections/sales-excise-taxes/streamlined-sales-tax"
[52]: https://dor.sc.gov/sales-use-tax-index/sales-tax "https://dor.sc.gov/sales-use-tax-index/sales-tax"
[53]: https://dor.sc.gov/sales-use-tax-index/local-sales-taxes "https://dor.sc.gov/sales-use-tax-index/local-sales-taxes"
[54]: https://dor.sc.gov/sales-use-tax-index "https://dor.sc.gov/sales-use-tax-index"
[55]: https://www.tn.gov/revenue/taxes/sales-and-use-tax/streamlined-sales-tax.html "https://www.tn.gov/revenue/taxes/sales-and-use-tax/streamlined-sales-tax.html"
[56]: https://tnmap.tn.gov/sst/sst.html "https://tnmap.tn.gov/sst/sst.html"
[57]: https://comptroller.texas.gov/taxes/sales/ "https://comptroller.texas.gov/taxes/sales/"
[58]: https://comptroller.texas.gov/taxes/publications/94-105.php "https://comptroller.texas.gov/taxes/publications/94-105.php"
[59]: https://www.tax.virginia.gov/sales-tax-rate-and-locality-code-lookup "https://www.tax.virginia.gov/sales-tax-rate-and-locality-code-lookup"
[60]: https://www.tax.virginia.gov/retail-sales-and-use-tax "https://www.tax.virginia.gov/retail-sales-and-use-tax"
[61]: https://dor.wa.gov/taxes-rates/retail-sales-tax/sales-and-use-tax-tools "https://dor.wa.gov/taxes-rates/retail-sales-tax/sales-and-use-tax-tools"
