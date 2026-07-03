{
"schemaVersion": "retrofi_tax_gap_repair.v1",
"researchedAt": "2026-07-03",
"gapId": "property_tax_adapter_production_terms",
"status": "partially_resolved",
"confidence": "medium",
"inputCitation": "",
"jurisdictionRows": [
{
"jurisdictionId": "ca_los_angeles_county",
"state": "CA",
"county": "Los Angeles County",
"city": null,
"sources": [
{
"title": "Los Angeles County Open Data - Parcels",
"url": "[https://data.lacounty.gov/documents/4d67b154ae614d219c58535659128e71](https://data.lacounty.gov/documents/4d67b154ae614d219c58535659128e71)",
"owner": "County of Los Angeles",
"dataFieldsSupported": [
"parcel geometry",
"parcel/account ID by address"
],
"termsClassification": "bulk_import_allowed",
"evidenceText": "Official county open-data records describe the Parcels data as current parcel boundaries and related attributes maintained by the Los Angeles County Assessor, covering about 2.4 million parcels; the county open-data portal describes use cases including filtering data, creating visualizations, developing apps, research, and business development, and provides catalog search/API access. ([Los Angeles County Data][1])"
},
{
"title": "Los Angeles County Open Data - Assessor Parcel Data / Rolls 2021-Present",
"url": "[https://data.lacounty.gov/datasets/785f54236d1644dc975a55af19b3dd70](https://data.lacounty.gov/datasets/785f54236d1644dc975a55af19b3dd70)",
"owner": "Los Angeles County Assessor",
"dataFieldsSupported": [
"assessed value",
"taxable value",
"exemption fields",
"levy/tax-code area"
],
"termsClassification": "bulk_import_allowed",
"evidenceText": "The official open-data record describes annual assessment roll data from 2021-present; the listed fields include homeowner and real-estate exemption fields. ([Los Angeles County Data][2])"
},
{
"title": "Los Angeles County Assessor - Data Sales",
"url": "[https://assessor.lacounty.gov/real-estate-toolkit/data-sales](https://assessor.lacounty.gov/real-estate-toolkit/data-sales)",
"owner": "Los Angeles County Assessor",
"dataFieldsSupported": [
"assessor bulk extracts",
"licensed assessor data"
],
"termsClassification": "vendor_or_license_required",
"evidenceText": "The Assessor's Data Sales page requires an approved contract agreement before delivery, and the Assessor forms page lists a Data Sales Order Form and Agreement. ([Los Angeles County Assessor][3])"
},
{
"title": "Los Angeles County Treasurer and Tax Collector - Property Tax Bill / Balance / Payment History",
"url": "[https://ttc.lacounty.gov/](https://ttc.lacounty.gov/)",
"owner": "Los Angeles County Treasurer and Tax Collector",
"dataFieldsSupported": [
"current tax bill line items",
"payment/delinquency facts"
],
"termsClassification": "manual_user_bill_required",
"evidenceText": "The Treasurer and Tax Collector site provides links for viewing a property tax bill, balance due, and payment history; secured-tax FAQ and payment pages show bill/PIN/AIN-dependent access paths rather than production-cleared bulk or API terms. ([LA County Tax Collector][4])"
}
],
"productionSafeFields": [
"parcel geometry",
"parcel/account ID by address",
"assessed value",
"taxable value",
"exemption fields",
"levy/tax-code area"
],
"requiresUserUploadedBillFields": [
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"runtimePatch": {
"targetDataFile": "data/tax_local_workflow_rules.json",
"workflowId": "property_tax_ca_los_angeles_county",
"fieldsToUpdate": {
"calculationMode": "calculable_with_user_tax_bill",
"productionTermsStatus": "partially_cleared",
"productionSafeFields": [
"parcel geometry",
"parcel/account ID by address",
"assessed value",
"taxable value",
"exemption fields",
"levy/tax-code area"
],
"requiresUserUploadedBillFields": [
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"billLineItemGate": "final_dollar_calculations_require_user_uploaded_tax_bill_or_separately_licensed_current_tax_bill_line_items",
"sourcePolicy": "use county open-data sources for productionSafeFields; do_not_scrape_lookup_only_or_bill_payment_pages_for_unattended_production"
}
},
"remainingGaps": [
"No official production-cleared bulk/API source was confirmed for current tax bill line items.",
"No official production-cleared bulk/API source was confirmed for direct assessments or special assessments as line-item charges.",
"No official production-cleared bulk/API source was confirmed for payment or delinquency facts."
]
},
{
"jurisdictionId": "ca_san_diego_county",
"state": "CA",
"county": "San Diego County",
"city": null,
"sources": [
{
"title": "SANDAG / SanGIS Regional GIS Data Warehouse and Open Data Portal",
"url": "[https://www.sandag.org/data-and-research/geographic-information-systems](https://www.sandag.org/data-and-research/geographic-information-systems)",
"owner": "SANDAG / SanGIS",
"dataFieldsSupported": [
"parcel geometry",
"parcel/account ID by address"
],
"termsClassification": "bulk_import_allowed",
"evidenceText": "The official SANDAG GIS page states that the Regional GIS Data Warehouse provides public-facing shapefile downloads after accepting a disclaimer, and that SANDAG/SanGIS publishes popular data layers as GIS web services; the official parcel layer is a SanGIS parcel dataset. ([SANDAG][5])"
},
{
"title": "San Diego County Assessor/Recorder/County Clerk - Property Information",
"url": "[https://www.sdarcc.gov/content/arcc/home/divisions/assessor/property-records.html](https://www.sdarcc.gov/content/arcc/home/divisions/assessor/property-records.html)",
"owner": "San Diego County Assessor/Recorder/County Clerk",
"dataFieldsSupported": [
"assessed value",
"property characteristics",
"assessor maps"
],
"termsClassification": "lookup_only",
"evidenceText": "The Assessor page states that property ownership, parcel maps, assessed values, property characteristics, sales information, and maps are available to the public, but routes online searching through public lookup tools rather than identifying production bulk/API rights. ([Sdarcc][6])"
},
{
"title": "San Diego County Assessor/Recorder/County Clerk - ParcelQuest Disclaimer",
"url": "[https://arcc-acclaim.sdcounty.ca.gov/](https://arcc-acclaim.sdcounty.ca.gov/)",
"owner": "San Diego County Assessor/Recorder/County Clerk / ParcelQuest",
"dataFieldsSupported": [
"parcel/account ID by address",
"assessed value",
"property characteristics"
],
"termsClassification": "vendor_or_license_required",
"evidenceText": "The official disclaimer says ParcelQuest is a vendor under contract, provides up to 25 searches in 30 days at no cost, and may require a ParcelQuest subscription above that threshold; this is not production-cleared bulk/API access. ([Sdarcc][7])"
},
{
"title": "San Diego County Treasurer-Tax Collector - Tax Bill Search and PACE Information",
"url": "[https://www.sdttc.com/](https://www.sdttc.com/)",
"owner": "San Diego County Treasurer-Tax Collector",
"dataFieldsSupported": [
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"termsClassification": "lookup_only",
"evidenceText": "The Treasurer-Tax Collector site provides tax-bill lookup by parcel, bill, address, or unsecured bill number and allows viewing/paying bills; the PACE page explains that PACE charges appear as special assessments on the tax bill, but no official production bulk/API terms were found for unattended use of these bill lines. ([SDTTC][8])"
}
],
"productionSafeFields": [
"parcel geometry",
"parcel/account ID by address"
],
"requiresUserUploadedBillFields": [
"assessed value",
"taxable value",
"exemption fields",
"levy/tax-code area",
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"runtimePatch": {
"targetDataFile": "data/tax_local_workflow_rules.json",
"workflowId": "property_tax_ca_san_diego_county",
"fieldsToUpdate": {
"calculationMode": "calculable_with_user_tax_bill",
"productionTermsStatus": "partially_cleared",
"productionSafeFields": [
"parcel geometry",
"parcel/account ID by address"
],
"requiresUserUploadedBillFields": [
"assessed value",
"taxable value",
"exemption fields",
"levy/tax-code area",
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"billLineItemGate": "final_dollar_calculations_require_user_uploaded_tax_bill_or_separately_licensed_current_tax_bill_line_items",
"sourcePolicy": "use SANDAG/SanGIS downloads and web services for parcel geometry/address matching; do_not_scrape_ParcelQuest_or_TTC_lookup_pages_for_unattended_production"
}
},
"remainingGaps": [
"Assessor value, exemption, and tax-area fields are available for lookup but were not confirmed as production-cleared bulk/API data.",
"ParcelQuest access is vendor/subscription-gated beyond limited public searches.",
"Current bill line items, PACE/special assessment lines, and payment facts remain gated to user-uploaded bills or licensed access."
]
},
{
"jurisdictionId": "ca_orange_county",
"state": "CA",
"county": "Orange County",
"city": null,
"sources": [
{
"title": "Orange County Public Works / OC Survey - Landbase Information Systems",
"url": "[https://pwadmin.oc.gov/service-areas/oc-survey/products/landbase-information-systems](https://pwadmin.oc.gov/service-areas/oc-survey/products/landbase-information-systems)",
"owner": "Orange County Public Works / OC Survey",
"dataFieldsSupported": [
"parcel geometry"
],
"termsClassification": "bulk_import_allowed",
"evidenceText": "The official Landbase page states that the landbase contains more than 687,000 subdivision parcels, can be downloaded as shapefiles through the OC GIS Data Portal, and should be credited to the County of Orange; it also warns that the landbase reflects legal parcels rather than assessor parcels and directs users to the Assessor for parcel attributes. ([OC Public Works][9])"
},
{
"title": "Orange County Assessor - Property Information and Parcel Maps",
"url": "[https://www.ocassessor.gov/page/property-information-and-parcel-maps](https://www.ocassessor.gov/page/property-information-and-parcel-maps)",
"owner": "Orange County Assessor",
"dataFieldsSupported": [
"parcel/account ID by address",
"assessed value",
"property characteristics",
"exemption fields"
],
"termsClassification": "lookup_only",
"evidenceText": "The Assessor page provides property assessment information and characteristics through public-service and web paths, but places responsibility on the user to verify accuracy and does not identify production-cleared bulk/API rights for assessor attributes. ([Orange County Assessor][10])"
},
{
"title": "Orange County Treasurer-Tax Collector / OCTaxMap",
"url": "[https://www.octreasurer.com/](https://www.octreasurer.com/)",
"owner": "Orange County Treasurer-Tax Collector",
"dataFieldsSupported": [
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"termsClassification": "lookup_only",
"evidenceText": "The Treasurer-Tax Collector site provides view/pay, tax-bill, and OCTaxMap bill-detail workflows; the OCTaxMap disclaimer says the data is not real-time, is provided as-is, and should not be used for business decisions without validation. ([OC Treasurer][11])"
},
{
"title": "Orange County Auditor-Controller - Property Tax Accounting",
"url": "[https://ocauditor.gov/about/central-accounting/property-tax-accounting/](https://ocauditor.gov/about/central-accounting/property-tax-accounting/)",
"owner": "Orange County Auditor-Controller",
"dataFieldsSupported": [
"levy/tax-code area",
"tax rate area reference data",
"direct charge special assessment reference documents"
],
"termsClassification": "bulk_import_allowed",
"evidenceText": "The Auditor-Controller property-tax accounting page describes official administration of tax rolls, allocation of assessed values, calculation of tax rates, and applying tax rates and direct charges, and links official tax-rate-area and direct-charge reference documents. ([OC Auditor Controller][12])"
}
],
"productionSafeFields": [
"parcel geometry",
"levy/tax-code area"
],
"requiresUserUploadedBillFields": [
"parcel/account ID by address",
"assessed value",
"taxable value",
"exemption fields",
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"runtimePatch": {
"targetDataFile": "data/tax_local_workflow_rules.json",
"workflowId": "property_tax_ca_orange_county",
"fieldsToUpdate": {
"calculationMode": "calculable_with_user_tax_bill",
"productionTermsStatus": "partially_cleared",
"productionSafeFields": [
"parcel geometry",
"levy/tax-code area"
],
"requiresUserUploadedBillFields": [
"parcel/account ID by address",
"assessed value",
"taxable value",
"exemption fields",
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"billLineItemGate": "final_dollar_calculations_require_user_uploaded_tax_bill_or_separately_licensed_current_tax_bill_line_items",
"sourcePolicy": "use OC landbase only as parcel geometry/cadaster reference and Auditor-Controller reports for tax-area reference; do_not_treat_lookup_bill_details_as_production_bulk_data"
}
},
"remainingGaps": [
"Open landbase geometry is not equivalent to assessor parcel attributes.",
"Assessor parcel/account-by-address, assessed value, taxable value, and exemption fields were not confirmed as production-cleared bulk/API fields.",
"OCTaxMap and Treasurer bill details remain lookup-only and must not drive unattended final dollar calculations.",
"Direct charge documents may support reference validation but not parcel-level current bill line-item calculations without a production-cleared join or user bill."
]
},
{
"jurisdictionId": "wa_king_county",
"state": "WA",
"county": "King County",
"city": null,
"sources": [
{
"title": "King County GIS Data and Assessments Data Download",
"url": "[https://kingcounty.gov/en/dept/dnrp/data/gis-data-maps](https://kingcounty.gov/en/dept/dnrp/data/gis-data-maps)",
"owner": "King County GIS Center / King County Assessor",
"dataFieldsSupported": [
"parcel geometry",
"parcel/account ID by address",
"assessed value",
"taxable value",
"levy/tax-code area"
],
"termsClassification": "bulk_import_allowed",
"evidenceText": "The official GIS data page links open-data portals and states that extracts from the Assessments database are available for direct download; the Assessor page separately identifies eReal and eMap parcel/account search and public-record copies of Assessor property information files. ([King County][13])"
},
{
"title": "King County Parcel Viewer",
"url": "[https://gismaps.kingcounty.gov/parcelviewer2/](https://gismaps.kingcounty.gov/parcelviewer2/)",
"owner": "King County",
"dataFieldsSupported": [
"parcel geometry",
"parcel/account ID by address",
"assessed value",
"levy/tax-code area"
],
"termsClassification": "unclear_terms",
"evidenceText": "The Parcel Viewer supports searches by parcel and address and displays parcel boundaries, jurisdiction, appraised value, and levy code; however, the disclaimer prohibits sale of the map or information except by written permission and disclaims warranties, so it should not be treated as an unrestricted commercial production source. ([gismaps.kingcounty.gov][14])"
},
{
"title": "King County Treasury - Property Tax Payment Information",
"url": "[https://kingcounty.gov/en/dept/dnrp/governance-leadership/dnrp-directors-office/treasury/treasury-operations/property-tax-info](https://kingcounty.gov/en/dept/dnrp/governance-leadership/dnrp-directors-office/treasury/treasury-operations/property-tax-info)",
"owner": "King County Treasury",
"dataFieldsSupported": [
"current tax bill line items",
"payment/delinquency facts"
],
"termsClassification": "lookup_only",
"evidenceText": "The Treasury page provides account viewing, payment, and eReal search paths, and warns that pending payments may affect accuracy and that King County cannot warrant accuracy, reliability, or timeliness. No bulk/API production terms for tax-bill lines or payment facts were confirmed. ([King County][15])"
}
],
"productionSafeFields": [
"parcel geometry",
"parcel/account ID by address",
"assessed value",
"taxable value",
"levy/tax-code area"
],
"requiresUserUploadedBillFields": [
"exemption fields",
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"runtimePatch": {
"targetDataFile": "data/tax_local_workflow_rules.json",
"workflowId": "property_tax_wa_king_county",
"fieldsToUpdate": {
"calculationMode": "calculable_with_user_tax_bill",
"productionTermsStatus": "partially_cleared",
"productionSafeFields": [
"parcel geometry",
"parcel/account ID by address",
"assessed value",
"taxable value",
"levy/tax-code area"
],
"requiresUserUploadedBillFields": [
"exemption fields",
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"billLineItemGate": "final_dollar_calculations_require_user_uploaded_tax_bill_or_separately_licensed_current_tax_bill_line_items",
"sourcePolicy": "prefer official GIS/assessments downloads over Parcel Viewer scraping; exclude owner-list use unless separately reviewed under Washington public-records commercial-use restrictions"
}
},
"remainingGaps": [
"Parcel Viewer terms contain sale/permission language and should not be the production source unless separately licensed.",
"Exemption fields were not confirmed as production-cleared in bulk/API form.",
"Current tax bill line items, direct or special assessment lines, and payment/delinquency facts remain gated."
]
},
{
"jurisdictionId": "mi_wayne_county_detroit",
"state": "MI",
"county": "Wayne County",
"city": "Detroit",
"sources": [
{
"title": "City of Detroit Open Data - Parcels Current",
"url": "[https://data.detroitmi.gov/datasets/detroitmi::parcels-current-1/explore](https://data.detroitmi.gov/datasets/detroitmi::parcels-current-1/explore)",
"owner": "City of Detroit Office of the Assessor / Detroit Open Data",
"dataFieldsSupported": [
"parcel geometry",
"parcel/account ID by address"
],
"termsClassification": "bulk_import_allowed",
"evidenceText": "Detroit's official open-data portal states that data can be retrieved, combined, downloaded, sorted, searched, analyzed, redistributed, and reused; the current parcels dataset is an Office of the Assessor parcel-boundary dataset, and the portal provides a Search API for programmatic catalog queries. ([Detroit Open Data Portal][16])"
},
{
"title": "City of Detroit Open Data - Tentative Assessment Roll 2025",
"url": "[https://data.detroitmi.gov/datasets/tentative-assessment-roll-2025](https://data.detroitmi.gov/datasets/tentative-assessment-roll-2025)",
"owner": "City of Detroit Office of the Assessor",
"dataFieldsSupported": [
"assessed value",
"taxable value"
],
"termsClassification": "bulk_import_allowed",
"evidenceText": "The official open-data record describes land parcel assessment data from the Office of the Assessor and includes taxable-value fields, but the dataset is labeled tentative and 2025-specific, so it is not sufficient by itself for current final production calculations. ([Detroit Open Data Portal][17])"
},
{
"title": "City of Detroit Assessor Base Units / Assessment Data",
"url": "[https://data.detroitmi.gov/](https://data.detroitmi.gov/)",
"owner": "City of Detroit Office of the Assessor",
"dataFieldsSupported": [
"parcel/account ID by address",
"assessed value",
"taxable value"
],
"termsClassification": "bulk_import_allowed",
"evidenceText": "Official Assessor-related open-data records describe parcel units used to determine taxable status and assessed value and note that Assessor BS&A database rollovers occur with the new tax year. ([baseunits.detroitmi.gov][18])"
},
{
"title": "City of Detroit PayDetroit365 / BS&A Online",
"url": "[https://detroitmi.gov/how-do-i/pay-fine-bill-or-tax/pay-property-taxes](https://detroitmi.gov/how-do-i/pay-fine-bill-or-tax/pay-property-taxes)",
"owner": "City of Detroit Office of the Treasury / BS&A Online",
"dataFieldsSupported": [
"current tax bill line items",
"exemption fields",
"payment/delinquency facts"
],
"termsClassification": "vendor_or_license_required",
"evidenceText": "The official Detroit tax page routes current and delinquent property-tax bill viewing and payment through BS&A Online and lists a per-parcel service fee to view bill information; it also provides owner/customer-service paths for copies of current tax bills and PRE exemption information. ([City of Detroit][19])"
},
{
"title": "Wayne County Treasurer - Property Tax Account Lookup",
"url": "[https://pta.waynecounty.com/](https://pta.waynecounty.com/)",
"owner": "Wayne County Treasurer",
"dataFieldsSupported": [
"payment/delinquency facts"
],
"termsClassification": "lookup_only",
"evidenceText": "The Wayne County Treasurer property tax account site lets taxpayers view delinquent property tax information by parcel ID or street address and pay delinquent taxes; official Wayne County tax information says unpaid local taxes become delinquent on March 1 and are then payable only to the County Treasurer. ([Wayne County PTA][20])"
}
],
"productionSafeFields": [
"parcel geometry",
"parcel/account ID by address"
],
"requiresUserUploadedBillFields": [
"assessed value",
"taxable value",
"exemption fields",
"levy/tax-code area",
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"runtimePatch": {
"targetDataFile": "data/tax_local_workflow_rules.json",
"workflowId": "property_tax_mi_wayne_county_detroit",
"fieldsToUpdate": {
"calculationMode": "calculable_with_user_tax_bill",
"productionTermsStatus": "partially_cleared",
"productionSafeFields": [
"parcel geometry",
"parcel/account ID by address"
],
"requiresUserUploadedBillFields": [
"assessed value",
"taxable value",
"exemption fields",
"levy/tax-code area",
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"billLineItemGate": "final_dollar_calculations_require_user_uploaded_tax_bill_or_separately_licensed_current_tax_bill_line_items",
"sourcePolicy": "use Detroit Open Data for parcel geometry/address matching; do_not_use_tentative_rolls_for_final_current_year_dollar_calculations; do_not_scrape_BS&A_or_Wayne_Treasurer_lookup_for_unattended_production"
}
},
"remainingGaps": [
"A current final certified assessment-roll bulk source was not confirmed for production use.",
"PRE/exemption fields and levy/tax-code area were not confirmed as production-cleared bulk/API fields.",
"Current tax bill line items require user-uploaded bills or a separate BS&A/official license.",
"Wayne County delinquency data is lookup-only for this workflow."
]
},
{
"jurisdictionId": "mi_washtenaw_county_ann_arbor",
"state": "MI",
"county": "Washtenaw County",
"city": "Ann Arbor",
"sources": [
{
"title": "Washtenaw County GIS / Open Data Portal",
"url": "[https://www.washtenaw.org/1236/GIS-Mapping](https://www.washtenaw.org/1236/GIS-Mapping)",
"owner": "Washtenaw County GIS",
"dataFieldsSupported": [
"parcel geometry",
"parcel/account ID by address"
],
"termsClassification": "bulk_import_allowed",
"evidenceText": "Washtenaw County official GIS pages identify downloadable GIS data and a county GIS data portal; however, MapWashtenaw's disclaimer says the data is for reference only, is not suitable for business or financial decisions, and is not guaranteed. ([Washtenaw County Open Data][21])"
},
{
"title": "Washtenaw County Property/Parcel Lookup",
"url": "[https://secure4.ewashtenaw.org/parcelsearch/](https://secure4.ewashtenaw.org/parcelsearch/)",
"owner": "Washtenaw County",
"dataFieldsSupported": [
"parcel/account ID by address",
"assessed value",
"taxable value"
],
"termsClassification": "lookup_only",
"evidenceText": "The official property/parcel lookup provides current real-property data from the Treasurer and Equalization/Property Description, while delinquent tax search is routed to BS&A; no production bulk/API terms were confirmed for these lookup results. ([Ewashtenaw Secure][22])"
},
{
"title": "City of Ann Arbor - Online Assessment and Property Tax Data",
"url": "[https://www.a2gov.org/departments/finance-admin-services/assessing/Pages/Online-Assessment-and-Property-Tax-Data.aspx](https://www.a2gov.org/departments/finance-admin-services/assessing/Pages/Online-Assessment-and-Property-Tax-Data.aspx)",
"owner": "City of Ann Arbor",
"dataFieldsSupported": [
"assessed value",
"taxable value",
"current tax bill line items"
],
"termsClassification": "vendor_or_license_required",
"evidenceText": "Ann Arbor states that assessment rolls and appraisal cards are available for public inspection/copying and links users to Online Tax Data through BS&A; this supports public access but not unattended production bulk/API use. ([City of Ann Arbor][23])"
},
{
"title": "City of Ann Arbor Treasury / Washtenaw Delinquent Tax Search",
"url": "[https://www.a2gov.org/departments/finance-admin-services/finance/Treasury/Pages/Treasury.aspx](https://www.a2gov.org/departments/finance-admin-services/finance/Treasury/Pages/Treasury.aspx)",
"owner": "City of Ann Arbor / Washtenaw County Treasurer / BS&A Online",
"dataFieldsSupported": [
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"termsClassification": "vendor_or_license_required",
"evidenceText": "Ann Arbor Treasury collects property taxes and special assessments and provides online payment/lookup paths; official Washtenaw search results route delinquent and current tax information through BS&A Online, with per-parcel fees for delinquent tax searches. ([City of Ann Arbor][24])"
}
],
"productionSafeFields": [
"parcel geometry",
"parcel/account ID by address"
],
"requiresUserUploadedBillFields": [
"assessed value",
"taxable value",
"exemption fields",
"levy/tax-code area",
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"runtimePatch": {
"targetDataFile": "data/tax_local_workflow_rules.json",
"workflowId": "property_tax_mi_washtenaw_county_ann_arbor",
"fieldsToUpdate": {
"calculationMode": "calculable_with_user_tax_bill",
"productionTermsStatus": "partially_cleared",
"productionSafeFields": [
"parcel geometry",
"parcel/account ID by address"
],
"requiresUserUploadedBillFields": [
"assessed value",
"taxable value",
"exemption fields",
"levy/tax-code area",
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"billLineItemGate": "final_dollar_calculations_require_user_uploaded_tax_bill_or_separately_licensed_current_tax_bill_line_items",
"sourcePolicy": "use Washtenaw GIS downloads for geometry/address matching only; do_not_use_MapWashtenaw_or_BS&A_lookup_outputs_for_business_or_financial_calculations_without_user_bill_or_license"
}
},
"remainingGaps": [
"MapWashtenaw terms warn against business or financial decisions, so assessment/tax calculations cannot rely on that viewer alone.",
"Assessed value, taxable value, exemptions, and tax-code area were not confirmed as production-cleared bulk/API fields.",
"Current bill line items, special assessments, and delinquency/payment facts route through BS&A or lookup workflows and remain gated."
]
},
{
"jurisdictionId": "wa_grant_county",
"state": "WA",
"county": "Grant County",
"city": null,
"sources": [
{
"title": "Grant County GIS - Data Download / Open GIS Data",
"url": "[https://www.grantcountywa.gov/320/GIS](https://www.grantcountywa.gov/320/GIS)",
"owner": "Grant County GIS",
"dataFieldsSupported": [
"parcel geometry",
"parcel/account ID by address",
"levy/tax-code area"
],
"termsClassification": "bulk_import_allowed",
"evidenceText": "Grant County GIS states that it creates and maintains county GIS data and provides data downloads for parcels, district boundaries, land use, elections, and more; the official open GIS portal is described as a place to discover and download GIS data. The county disclaimer provides data as-is and cites RCW 42.56.070(9), which prohibits use of lists of individuals for commercial purposes. ([Grant County, WA][25])"
},
{
"title": "Grant County Assessor - Property Search and County Levies",
"url": "[https://www.grantcountywa.gov/162/Assessor](https://www.grantcountywa.gov/162/Assessor)",
"owner": "Grant County Assessor",
"dataFieldsSupported": [
"parcel/account ID by address",
"assessed value",
"levy/tax-code area"
],
"termsClassification": "lookup_only",
"evidenceText": "The Assessor page describes establishing fair market value, maintaining parcel maps and ownership/legal descriptions, compiling levy rates, and offering property/sales search and county levies; no production-cleared bulk/API terms were confirmed for assessed-value lookup output. ([Grant County, WA][26])"
},
{
"title": "Grant County Treasurer - Tax Statement Download and Payments",
"url": "[https://www.grantcountywa.gov/340/Treasurer](https://www.grantcountywa.gov/340/Treasurer)",
"owner": "Grant County Treasurer",
"dataFieldsSupported": [
"current tax bill line items",
"payment/delinquency facts"
],
"termsClassification": "lookup_only",
"evidenceText": "The Treasurer page provides 2025 and 2026 tax-statement search by property ID, parcel number, or owner name and payment through Point&Pay; payment status can lag several business days, and no production bulk/API terms were confirmed. ([Grant County, WA][27])"
},
{
"title": "Grant County Property Search Disclaimer",
"url": "[https://www.grantcountywa.gov/](https://www.grantcountywa.gov/)",
"owner": "Grant County",
"dataFieldsSupported": [
"parcel/account ID by address",
"assessed value"
],
"termsClassification": "unclear_terms",
"evidenceText": "The property-search disclaimer requires acceptance of terms, disclaims completeness and accuracy, says records are subject to change, and states that tax parcels should not be used to define road rights-of-way. ([Grant County, WA][28])"
}
],
"productionSafeFields": [
"parcel geometry",
"parcel/account ID by address",
"levy/tax-code area"
],
"requiresUserUploadedBillFields": [
"assessed value",
"taxable value",
"exemption fields",
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"runtimePatch": {
"targetDataFile": "data/tax_local_workflow_rules.json",
"workflowId": "property_tax_wa_grant_county",
"fieldsToUpdate": {
"calculationMode": "calculable_with_user_tax_bill",
"productionTermsStatus": "partially_cleared",
"productionSafeFields": [
"parcel geometry",
"parcel/account ID by address",
"levy/tax-code area"
],
"requiresUserUploadedBillFields": [
"assessed value",
"taxable value",
"exemption fields",
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"billLineItemGate": "final_dollar_calculations_require_user_uploaded_tax_bill_or_separately_licensed_current_tax_bill_line_items",
"sourcePolicy": "use Grant County GIS downloads for non-owner parcel geometry/address/tax-area matching; exclude owner-name/list fields from commercial use; do_not_scrape_tax_statement_or_property_search_lookup_for_unattended_production"
}
},
"remainingGaps": [
"Assessed value, taxable value, and exemption fields were not confirmed as production-cleared bulk/API data.",
"Owner-name/list data must be excluded from commercial use unless separately cleared under Washington public-records restrictions.",
"Current tax-statement line items, special assessments, and payment/delinquency facts remain lookup-only or user-bill-gated."
]
},
{
"jurisdictionId": "wa_snohomish_county",
"state": "WA",
"county": "Snohomish County",
"city": null,
"sources": [
{
"title": "Snohomish County GIS Open Data / Assessor Data Downloads",
"url": "[https://snohomishcountywa.gov/5414/Assessor-Data-Downloads](https://snohomishcountywa.gov/5414/Assessor-Data-Downloads)",
"owner": "Snohomish County Assessor / Snohomish County GIS",
"dataFieldsSupported": [
"parcel geometry",
"parcel/account ID by address",
"assessed value",
"taxable value",
"levy/tax-code area"
],
"termsClassification": "bulk_import_allowed",
"evidenceText": "The official GIS open-data page states that Assessor data is electronically available for download, with spatial layers including current parcels and tax code areas, and tabular downloads including the assessment roll; the open-data portal supports common download formats including CSV, KML, ZIP, and GeoJSON. ([Snohomish County][29])"
},
{
"title": "Snohomish County Online Property Information / SCOPI",
"url": "[https://snohomishcountywa.gov/5414/Assessor-Data-Downloads](https://snohomishcountywa.gov/5414/Assessor-Data-Downloads)",
"owner": "Snohomish County Assessor",
"dataFieldsSupported": [
"parcel/account ID by address",
"assessed value",
"levy/tax-code area",
"exemption fields"
],
"termsClassification": "lookup_only",
"evidenceText": "SCOPI is an official property-information map that shows parcel ID, property address, owner, market value, tax code area, tax history, legal descriptions, and related information; the Assessor homepage also points to exemption forms and property information resources. ([Snohomish County][30])"
},
{
"title": "Snohomish County Public Access Service Portal - Treasurer Tax Bill Search",
"url": "[https://snohomishcountywa.gov/5414/Assessor-Data-Downloads](https://snohomishcountywa.gov/5414/Assessor-Data-Downloads)",
"owner": "Snohomish County Treasurer / Assessor",
"dataFieldsSupported": [
"current tax bill line items",
"payment/delinquency facts"
],
"termsClassification": "lookup_only",
"evidenceText": "The Public Access Service Portal provides Assessor property information and Treasurer tax-bill search/payment; the tax-statement help page explains bill breakdowns, levy-rate information, delinquencies, and current taxes due, while payment pages describe posting delays and current/delinquent payment workflows. ([Paydici][31])"
}
],
"productionSafeFields": [
"parcel geometry",
"parcel/account ID by address",
"assessed value",
"taxable value",
"levy/tax-code area"
],
"requiresUserUploadedBillFields": [
"exemption fields",
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"runtimePatch": {
"targetDataFile": "data/tax_local_workflow_rules.json",
"workflowId": "property_tax_wa_snohomish_county",
"fieldsToUpdate": {
"calculationMode": "calculable_with_user_tax_bill",
"productionTermsStatus": "partially_cleared",
"productionSafeFields": [
"parcel geometry",
"parcel/account ID by address",
"assessed value",
"taxable value",
"levy/tax-code area"
],
"requiresUserUploadedBillFields": [
"exemption fields",
"current tax bill line items",
"direct assessments/special assessments",
"payment/delinquency facts"
],
"billLineItemGate": "final_dollar_calculations_require_user_uploaded_tax_bill_or_separately_licensed_current_tax_bill_line_items",
"sourcePolicy": "use official GIS open-data and assessment-roll downloads for productionSafeFields; do_not_scrape_treasurer_bill_search_or_payment_status_for_unattended_production; exclude restricted owner-list use unless separately cleared"
}
},
"remainingGaps": [
"Exemption fields were identified through Assessor lookup/resources but not confirmed as production-cleared bulk/API fields.",
"Current tax bill line items, direct/special assessments, and payment/delinquency facts are available through tax-bill search/payment workflows but were not confirmed as production-cleared bulk/API fields.",
"Final tax dollar calculations remain gated to user-uploaded bills or separately licensed bill-line access."
]
}
]
}

[1]: https://data.lacounty.gov/documents/4d67b154ae614d219c58535659128e71 "https://data.lacounty.gov/documents/4d67b154ae614d219c58535659128e71"
[2]: https://data.lacounty.gov/datasets/785f54236d1644dc975a55af19b3dd70 "https://data.lacounty.gov/datasets/785f54236d1644dc975a55af19b3dd70"
[3]: https://assessor.lacounty.gov/real-estate-toolkit/data-sales "https://assessor.lacounty.gov/real-estate-toolkit/data-sales"
[4]: https://ttc.lacounty.gov/ "Treasurer and Tax Collector – Los Angeles County"
[5]: https://www.sandag.org/data-and-research/geographic-information-systems "https://www.sandag.org/data-and-research/geographic-information-systems"
[6]: https://www.sdarcc.gov/content/arcc/home/divisions/assessor/property-records.html "https://www.sdarcc.gov/content/arcc/home/divisions/assessor/property-records.html"
[7]: https://www.sdarcc.gov/content/arcc/home/divisions/assessor/parcel-quest-disclaimer.html "https://www.sdarcc.gov/content/arcc/home/divisions/assessor/parcel-quest-disclaimer.html"
[8]: https://www.sdttc.com/ "https://www.sdttc.com/"
[9]: https://pwadmin.oc.gov/service-areas/oc-survey/products/landbase-information-systems "https://pwadmin.oc.gov/service-areas/oc-survey/products/landbase-information-systems"
[10]: https://www.ocassessor.gov/page/property-information-and-parcel-maps "https://www.ocassessor.gov/page/property-information-and-parcel-maps"
[11]: https://octreasurer.gov/ "https://octreasurer.gov/"
[12]: https://ocauditor.gov/about/central-accounting/property-tax-accounting/ "https://ocauditor.gov/about/central-accounting/property-tax-accounting/"
[13]: https://kingcounty.gov/en/dept/kcit/data-information-services/gis-center/data-hub "https://kingcounty.gov/en/dept/kcit/data-information-services/gis-center/data-hub"
[14]: https://gismaps.kingcounty.gov/parcelviewer2/ "https://gismaps.kingcounty.gov/parcelviewer2/"
[15]: https://kingcounty.gov/en/dept/executive-services/buildings-property/treasury-operations/property-tax "https://kingcounty.gov/en/dept/executive-services/buildings-property/treasury-operations/property-tax"
[16]: https://data.detroitmi.gov/pages/about-detroit-open-data "https://data.detroitmi.gov/pages/about-detroit-open-data"
[17]: https://data.detroitmi.gov/datasets/tentative-assessment-roll-2025 "https://data.detroitmi.gov/datasets/tentative-assessment-roll-2025"
[18]: https://baseunits.detroitmi.gov/base-unit/parcel "https://baseunits.detroitmi.gov/base-unit/parcel"
[19]: https://detroitmi.gov/departments/office-chief-financial-officer/ocfo-divisions/office-treasury/paydetroit365-pay-property-tax "https://detroitmi.gov/departments/office-chief-financial-officer/ocfo-divisions/office-treasury/paydetroit365-pay-property-tax"
[20]: https://pta.waynecounty.com/ "https://pta.waynecounty.com/"
[21]: https://data-washtenaw.opendata.arcgis.com/?utm_source=chatgpt.com "Washtenaw County"
[22]: https://secure4.ewashtenaw.org/parcelsearch/?utm_source=chatgpt.com "Washtenaw County Property/Parcel Lookup - Ewashtenaw.org"
[23]: https://www.a2gov.org/finance-and-administrative-services/assessing/online-assessment-and-property-tax-data/ "https://www.a2gov.org/finance-and-administrative-services/assessing/online-assessment-and-property-tax-data/"
[24]: https://www.a2gov.org/finance-and-administrative-services/treasury/ "https://www.a2gov.org/finance-and-administrative-services/treasury/"
[25]: https://www.grantcountywa.gov/172/Geographic-Information-Systems-GIS "https://www.grantcountywa.gov/172/Geographic-Information-Systems-GIS"
[26]: https://www.grantcountywa.gov/248/Assessor "https://www.grantcountywa.gov/248/Assessor"
[27]: https://www.grantcountywa.gov/384/Treasurer "https://www.grantcountywa.gov/384/Treasurer"
[28]: https://www.grantcountywa.gov/1355/Property-Search-Disclaimer "https://www.grantcountywa.gov/1355/Property-Search-Disclaimer"
[29]: https://snohomishcountywa.gov/6206/GIS-Open-Data "https://snohomishcountywa.gov/6206/GIS-Open-Data"
[30]: https://snohomishcountywa.gov/5414/Interactive-Map-SCOPI "https://snohomishcountywa.gov/5414/Interactive-Map-SCOPI"
[31]: https://paydici.com/snohomish-county-wa "https://paydici.com/snohomish-county-wa"
