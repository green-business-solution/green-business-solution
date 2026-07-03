{
"schemaVersion": "retrofi_property_tax_dataset_rule_research.v1",
"researchedAt": "2026-07-03",
"source": "gpt_pro",
"promptCitation": "Research prompt and current RetroFi rule payload supplied by user. ",
"statePropertyTaxData": [
{
"state": "AL",
"stateFips": "01",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "no",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://www.revenue.alabama.gov/division/property-tax/](https://www.revenue.alabama.gov/division/property-tax/)",
"evidenceText": "Alabama Revenue states that taxable property, except utility property, is assessed locally at the county courthouse; state agency role is advisory and support-oriented.",
"sourceRef": "([revenue.alabama.gov][1])"
},
{
"url": "[https://www.revenue.alabama.gov/property-tax/property-tax-assessment/](https://www.revenue.alabama.gov/property-tax/property-tax-assessment/)",
"evidenceText": "ADOR describes property tax as depending on classification, millage rates, and exemptions, and cautions users to verify millage rate accuracy locally.",
"sourceRef": "([Alabama Department of Revenue][2])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_id_or_account_number",
"property_address",
"tax_year",
"property_class"
],
"effectiveDateHandling": "Use county lien, assessment, and billing dates. Alabama data should be treated as locally administered unless a county assessor or tax collector dataset is integrated.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "AK",
"stateFips": "02",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://www.commerce.alaska.gov/web/dcra/OfficeoftheStateAssessor](https://www.commerce.alaska.gov/web/dcra/OfficeoftheStateAssessor)",
"evidenceText": "Alaska's Office of the State Assessor advises municipalities, develops full value determinations, and monitors assessment practices; ordinary parcel assessment remains municipal where property tax is levied.",
"sourceRef": "([Alaska Department of Commerce][3])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"municipality",
"parcel_id",
"property_address",
"assessment_year"
],
"effectiveDateHandling": "Use municipal assessment year and local tax levy year. State full-value determinations are not substitutes for parcel-level assessor records.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_assessor_review",
"sourceConfidence": "medium"
},
{
"state": "AZ",
"stateFips": "04",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "no",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://azdor.gov/business/property-tax](https://azdor.gov/business/property-tax)",
"evidenceText": "Arizona property tax is jointly administered by the Department of Revenue and county assessors and treasurers.",
"sourceRef": "([Arizona Department of Revenue][4])"
},
{
"url": "[https://www.azleg.gov/ars/42/11054.htm](https://www.azleg.gov/ars/42/11054.htm)",
"evidenceText": "Arizona statutes route certain solar energy devices, grid-tied photovoltaic systems, and on-site solar systems to statutory valuation treatment when characterized as personal property.",
"sourceRef": "([Arizona Legislature][5])"
},
{
"url": "[https://www.azleg.gov/ars/42/13056.htm](https://www.azleg.gov/ars/42/13056.htm)",
"evidenceText": "Arizona statute sets reporting and valuation rules for solar energy devices as personal property, requiring owner-reported cost and statutory valuation treatment.",
"sourceRef": "([Arizona Legislature][6])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_number",
"tax_area_code",
"property_class",
"tax_year"
],
"effectiveDateHandling": "Use county tax year, valuation notice year, tax area code, and any solar-device reporting year. Solar treatment depends on equipment characterization and assessor handling.",
"retrofitRelevantExemptionsOrSpecialValuations": [
{
"type": "solar_personal_property_valuation",
"scope": "state_statutory_but_assessor_administered",
"evidenceText": "Solar energy devices and certain on-site solar systems have statutory valuation rules when treated as personal property.",
"sourceUrls": [
"[https://www.azleg.gov/ars/42/11054.htm](https://www.azleg.gov/ars/42/11054.htm)",
"[https://www.azleg.gov/ars/42/13056.htm](https://www.azleg.gov/ars/42/13056.htm)"
]
}
],
"recommendedRetroFiTreatment": "needs_assessor_review",
"sourceConfidence": "high"
},
{
"state": "AR",
"stateFips": "05",
"centralizedOfficialParcelData": "partial",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "unknown",
"officialSources": [
{
"url": "[https://gis.arkansas.gov/category/parcel/](https://gis.arkansas.gov/category/parcel/)",
"evidenceText": "Arkansas GIS Office has parcel polygon and centroid resources, but available official statewide parcel information is not complete for current annual tax estimation.",
"sourceRef": "([Arkansas GIS Office][7])"
},
{
"url": "[https://www.arcgis.com/home/item.html?id=81960b350dc04284b35046e6a54ed5b2](https://www.arcgis.com/home/item.html?id=81960b350dc04284b35046e6a54ed5b2)",
"evidenceText": "The Arkansas Tax Parcel Viewer is an official GIS Office tool for locating tax parcel information, not a complete statewide annual assessment and millage calculation source.",
"sourceRef": "([ArcGIS][8])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_id",
"property_address",
"owner_name",
"tax_year"
],
"effectiveDateHandling": "Treat statewide parcel layers as locator data unless county vintage and tax-year fields are verified. Use county assessor and collector records for actual values and tax rates.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "CA",
"stateFips": "06",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://www.boe.ca.gov/proptaxes/active-solar-energy-system/](https://www.boe.ca.gov/proptaxes/active-solar-energy-system/)",
"evidenceText": "California BOE describes the active solar energy system property tax incentive as a new-construction exclusion, not an exemption, and states that installation generally will not increase or decrease the existing assessment.",
"sourceRef": "([California State Board of Equalization][9])"
},
{
"url": "[https://www.boe.ca.gov/dataportal/dataset.htm?url=PropTaxGenPropTaxLevies](https://www.boe.ca.gov/dataportal/dataset.htm?url=PropTaxGenPropTaxLevies)",
"evidenceText": "BOE publishes aggregate property tax levy datasets, but county assessors administer parcel assessments and local tax bills.",
"sourceRef": "([California State Board of Equalization][10])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"assessor_parcel_number",
"tax_rate_area",
"roll_year",
"base_year_value",
"property_type"
],
"effectiveDateHandling": "Use county roll year, lien date, base-year value, tax rate area, and installation completion date. The active solar exclusion is tied to new-construction assessment treatment and should not be modeled as a millage reduction.",
"retrofitRelevantExemptionsOrSpecialValuations": [
{
"type": "active_solar_new_construction_exclusion",
"scope": "state_statutory",
"evidenceText": "Active solar energy systems receive new-construction exclusion treatment rather than an ordinary property tax exemption.",
"sourceUrls": [
"[https://www.boe.ca.gov/proptaxes/active-solar-energy-system/](https://www.boe.ca.gov/proptaxes/active-solar-energy-system/)"
]
}
],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "high"
},
{
"state": "CO",
"stateFips": "08",
"centralizedOfficialParcelData": "partial",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://geodata.colorado.gov/datasets/colorado-public-parcels/about](https://geodata.colorado.gov/datasets/colorado-public-parcels/about)",
"evidenceText": "Colorado publishes an official public parcel aggregation with parcel geometry and selected attributes, but county assessor records remain necessary for current tax calculation.",
"sourceRef": "([Colorado Geospatial Portal][11])"
},
{
"url": "[https://treasurer.elpasoco.com/mill-levies/](https://treasurer.elpasoco.com/mill-levies/)",
"evidenceText": "A Colorado county treasurer explains that mill levies are set yearly by taxing authorities and total tax depends on the combined levies for the property.",
"sourceRef": "([El Paso County Treasurer][12])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_number",
"account_number",
"tax_area",
"property_class",
"tax_year"
],
"effectiveDateHandling": "Use county assessment year, reappraisal cycle, tax-area district membership, and current levy certification. State parcel aggregation should be treated as a routing layer unless county currentness is verified.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "CT",
"stateFips": "09",
"centralizedOfficialParcelData": "yes",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://portal.ct.gov/datapolicy/gis-office/parcel-and-cama](https://portal.ct.gov/datapolicy/gis-office/parcel-and-cama)",
"evidenceText": "Connecticut's GIS Office describes annual collection of digital parcel files and standardized CAMA data for every municipality under CGS 7-100l.",
"sourceRef": "([CT.gov][13])"
},
{
"url": "[https://geodata.ct.gov/pages/parcels](https://geodata.ct.gov/pages/parcels)",
"evidenceText": "Connecticut Geodata provides statewide parcel geometry and related CAMA information.",
"sourceRef": "([CT Geodata Portal][14])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"municipality",
"unique_id",
"parcel_id",
"map_block_lot",
"assessment_year",
"grand_list_year"
],
"effectiveDateHandling": "Use municipality grand list year, annual CAMA collection vintage, revaluation year, and local mill rate fiscal year. Statewide parcel/CAMA data should be reconciled against current municipal assessor records for bill estimates.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "high"
},
{
"state": "DE",
"stateFips": "10",
"centralizedOfficialParcelData": "partial",
"centralizedOfficialAssessmentData": "no",
"centralizedOfficialTaxRateOrMillageData": "no",
"officialSources": [
{
"url": "[https://stateplanning.delaware.gov/about/gis-data.shtml](https://stateplanning.delaware.gov/about/gis-data.shtml)",
"evidenceText": "Delaware FirstMap is the state's official GIS platform, but assessment and property tax administration are county and local functions.",
"sourceRef": "([State Planning Coordination][15])"
},
{
"url": "[https://www.kentcountyde.gov/Residents/Tax-Credits-Exemptions-Assessment](https://www.kentcountyde.gov/Residents/Tax-Credits-Exemptions-Assessment)",
"evidenceText": "County-level Delaware sources describe assessment, exemptions, and tax rates as local functions that vary by county, municipality, and school district.",
"sourceRef": "([Kent County Delaware][16])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_id",
"property_address",
"school_district",
"tax_year"
],
"effectiveDateHandling": "Use county assessment records and local school or municipal rate year. State GIS should be used for geocoding and boundary routing only unless parcel-tax attributes are verified.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "DC",
"stateFips": "11",
"centralizedOfficialParcelData": "yes",
"centralizedOfficialAssessmentData": "yes",
"centralizedOfficialTaxRateOrMillageData": "yes",
"officialSources": [
{
"url": "[https://otr.cfo.dc.gov/page/real-property-tax-database-search](https://otr.cfo.dc.gov/page/real-property-tax-database-search)",
"evidenceText": "DC OTR provides a Real Property Tax Database Search with property value, assessment roll, and related parcel tax information.",
"sourceRef": "([Office of Tax and Revenue][17])"
},
{
"url": "[https://datahub-dc-dcgis.hub.arcgis.com/pages/lots-in-dc](https://datahub-dc-dcgis.hub.arcgis.com/pages/lots-in-dc)",
"evidenceText": "DC GIS describes tax and assessment lots maintained in the District's official real property tax systems.",
"sourceRef": "([Open Data DC][18])"
}
],
"localAssessorResearchRequired": false,
"commonJoinKeys": [
"ssl",
"square",
"suffix",
"lot",
"assessment_year",
"tax_class"
],
"effectiveDateHandling": "Use DC assessment year, tax year, tax class, and SSL. Local assessor review is still needed for disputed classifications or exemptions not visible in the database.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "calculate_from_official_data",
"sourceConfidence": "high"
},
{
"state": "FL",
"stateFips": "12",
"centralizedOfficialParcelData": "yes",
"centralizedOfficialAssessmentData": "yes",
"centralizedOfficialTaxRateOrMillageData": "yes",
"officialSources": [
{
"url": "[https://floridarevenue.com/property/Pages/DataPortal.aspx](https://floridarevenue.com/property/Pages/DataPortal.aspx)",
"evidenceText": "Florida DOR publishes property tax data, public tax roll data, and reports through its property tax data portal.",
"sourceRef": "([Florida Department of Revenue][19])"
},
{
"url": "[https://floridarevenue.com/property/Pages/DataPortal_RequestAssessmentRollGISData.aspx](https://floridarevenue.com/property/Pages/DataPortal_RequestAssessmentRollGISData.aspx)",
"evidenceText": "Florida DOR publishes assessment rolls and GIS data received from county property appraisers, with confidential records excluded.",
"sourceRef": "([Florida Department of Revenue][20])"
},
{
"url": "[https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0100-0199/0193/Sections/0193.624.html](https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0100-0199/0193/Sections/0193.624.html)",
"evidenceText": "Florida statute excludes certain just value attributable to renewable energy source devices from real property valuation, with different treatment for residential and nonresidential property.",
"sourceRef": "([Florida Legislature][21])"
},
{
"url": "[https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0100-0199/0196/Sections/0196.182.html](https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0100-0199/0196/Sections/0196.182.html)",
"evidenceText": "Florida statute exempts 80 percent of assessed value of qualifying renewable energy source devices treated as tangible personal property, subject to statutory conditions.",
"sourceRef": "([Florida Legislature][22])"
}
],
"localAssessorResearchRequired": false,
"commonJoinKeys": [
"county",
"parcel_id",
"folio",
"dor_use_code",
"tax_year",
"millage_code"
],
"effectiveDateHandling": "Use county roll year, DOR tax roll year, millage code, installation date, and statutory expiration or sunset fields. Confidential or locally suppressed records require property appraiser or tax bill confirmation.",
"retrofitRelevantExemptionsOrSpecialValuations": [
{
"type": "renewable_energy_real_property_value_exclusion",
"scope": "state_statutory",
"evidenceText": "Residential qualifying renewable energy source device value is disregarded; nonresidential treatment excludes the statutory percentage of just value.",
"sourceUrls": [
"[https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0100-0199/0193/Sections/0193.624.html](https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0100-0199/0193/Sections/0193.624.html)"
]
},
{
"type": "renewable_energy_tangible_personal_property_exemption",
"scope": "state_statutory",
"evidenceText": "Eighty percent of assessed value of qualifying renewable energy source devices treated as tangible personal property may be exempt.",
"sourceUrls": [
"[https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0100-0199/0196/Sections/0196.182.html](https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0100-0199/0196/Sections/0196.182.html)"
]
}
],
"recommendedRetroFiTreatment": "calculate_from_official_data",
"sourceConfidence": "high"
},
{
"state": "GA",
"stateFips": "13",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://dor.georgia.gov/local-government-services/digest-compliance/property-tax-millage-rates](https://dor.georgia.gov/local-government-services/digest-compliance/property-tax-millage-rates)",
"evidenceText": "Georgia DOR publishes property tax millage rate resources and notes that municipal taxes are based on county assessed values with rates set by local authorities.",
"sourceRef": "([Department of Revenue][23])"
},
{
"url": "[https://georgiadata.org/depofrevdata](https://georgiadata.org/depofrevdata)",
"evidenceText": "Georgia tax digest files provide aggregate values, parcel counts, and jurisdiction-level data rather than complete statewide parcel assessment data.",
"sourceRef": "([Georgia Data][24])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_number",
"tax_district",
"digest_year",
"property_class"
],
"effectiveDateHandling": "Use county digest year, local millage adoption year, and tax district. State digest files support rate and aggregate checks but not parcel-specific retrofit estimates.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "HI",
"stateFips": "15",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "no",
"centralizedOfficialTaxRateOrMillageData": "no",
"officialSources": [
{
"url": "[https://hawaiipropertytax.com/](https://hawaiipropertytax.com/)",
"evidenceText": "Hawaii County real property tax records are administered at the county level, including valuation, exemptions, and tax collection.",
"sourceRef": "([Hawaii Property Tax][25])"
},
{
"url": "[https://realproperty.honolulu.gov/](https://realproperty.honolulu.gov/)",
"evidenceText": "Honolulu's Real Property Assessment Division administers real property assessments for tax purposes based on market value.",
"sourceRef": "([Real Property Assessment Division][26])"
},
{
"url": "[https://www.mauicounty.gov/755/Real-Property-Tax-Rates](https://www.mauicounty.gov/755/Real-Property-Tax-Rates)",
"evidenceText": "Maui County publishes real property tax rates by class per $1,000 of net taxable assessed valuation.",
"sourceRef": "([Maui County][27])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"tmk",
"property_class",
"assessment_year",
"tax_year"
],
"effectiveDateHandling": "Use county assessment date, county tax class, TMK, and county rate year. Do not infer county tax treatment from state geography alone.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_assessor_review",
"sourceConfidence": "high"
},
{
"state": "ID",
"stateFips": "16",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "no",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://tax.idaho.gov/taxes/property/gis/data-maps/parcel-maps/](https://tax.idaho.gov/taxes/property/gis/data-maps/parcel-maps/)",
"evidenceText": "Idaho Tax Commission links to county parcel maps and states it does not maintain or store county parcel data; county assessors are authoritative.",
"sourceRef": "([Idaho State Tax Commission][28])"
},
{
"url": "[https://tax.idaho.gov/taxes/property/gis/tax-code-areas/](https://tax.idaho.gov/taxes/property/gis/tax-code-areas/)",
"evidenceText": "Idaho publishes statewide tax code area data by county and year.",
"sourceRef": "([Idaho State Tax Commission][29])"
},
{
"url": "[https://tax.idaho.gov/taxes/property/gis/taxing-districts/](https://tax.idaho.gov/taxes/property/gis/taxing-districts/)",
"evidenceText": "Idaho publishes current and historic taxing district shapefiles, with boundary changes generally effective the following year.",
"sourceRef": "([Idaho State Tax Commission][30])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_number",
"tax_code_area",
"taxing_district",
"tax_year"
],
"effectiveDateHandling": "Use tax code area vintage, taxing district effective year, county assessment year, and bill year. County parcel and valuation data are required for parcel estimates.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "high"
},
{
"state": "IL",
"stateFips": "17",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "no",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://tax.illinois.gov/research/taxstats/propertytaxstatistics.html](https://tax.illinois.gov/research/taxstats/propertytaxstatistics.html)",
"evidenceText": "Illinois DOR publishes property tax statistics and average tax rate tables, but parcel assessment and billing are local.",
"sourceRef": "([Illinois Department of Revenue][31])"
},
{
"url": "[https://www.ilga.gov/legislation/ILCS/details?ActID=596&ActName=Property+Tax+Code.&ChapAct=35+ILCS+200%2F&Chapter=&ChapterID=8&MajorTopic=&Print=True&SeqEnd=30650000&SeqStart=18200000](https://www.ilga.gov/legislation/ILCS/details?ActID=596&ActName=Property+Tax+Code.&ChapAct=35+ILCS+200%2F&Chapter=&ChapterID=8&MajorTopic=&Print=True&SeqEnd=30650000&SeqStart=18200000)",
"evidenceText": "Illinois Property Tax Code provides alternate valuation treatment for qualifying solar energy systems, comparing conventional improvements to solar-equipped improvements.",
"sourceRef": "([Illinois General Assembly][32])"
},
{
"url": "[https://www.ilga.gov/legislation/ILCS/details?ActID=596&ActName=Property+Tax+Code.&ChapAct=35+ILCS+200%2F&Chapter=&ChapterID=8&MajorTopic=&SeqEnd=38300000&SeqStart=11900000](https://www.ilga.gov/legislation/ILCS/details?ActID=596&ActName=Property+Tax+Code.&ChapAct=35+ILCS+200%2F&Chapter=&ChapterID=8&MajorTopic=&SeqEnd=38300000&SeqStart=11900000)",
"evidenceText": "Illinois law requires the owner to claim alternate valuation by filing with the chief county assessment officer.",
"sourceRef": "([Illinois General Assembly][33])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"pin",
"tax_code",
"assessment_year",
"tax_year",
"property_class"
],
"effectiveDateHandling": "Use county assessment year, equalization factors where applicable, tax-code district, and filing date for solar alternate valuation. Average state rate tables are not substitutes for parcel tax bills.",
"retrofitRelevantExemptionsOrSpecialValuations": [
{
"type": "solar_energy_system_alternate_valuation",
"scope": "state_statutory_but_claim_filed_locally",
"evidenceText": "The assessor uses statutory alternate valuation when a qualifying claim is filed with the chief county assessment officer.",
"sourceUrls": [
"[https://www.ilga.gov/legislation/ILCS/details?ActID=596&ActName=Property+Tax+Code.&ChapAct=35+ILCS+200%2F&Chapter=&ChapterID=8&MajorTopic=&Print=True&SeqEnd=30650000&SeqStart=18200000](https://www.ilga.gov/legislation/ILCS/details?ActID=596&ActName=Property+Tax+Code.&ChapAct=35+ILCS+200%2F&Chapter=&ChapterID=8&MajorTopic=&Print=True&SeqEnd=30650000&SeqStart=18200000)"
]
}
],
"recommendedRetroFiTreatment": "needs_assessor_review",
"sourceConfidence": "high"
},
{
"state": "IN",
"stateFips": "18",
"centralizedOfficialParcelData": "yes",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://www.indianamap.org/datasets/INMap%3A%3Aparcel-boundaries-of-indiana-2025/about](https://www.indianamap.org/datasets/INMap%3A%3Aparcel-boundaries-of-indiana-2025/about)",
"evidenceText": "IndianaMap provides a statewide 2025 parcel boundary dataset assembled from county-maintained parcel boundaries.",
"sourceRef": "([IndianaMap][34])"
},
{
"url": "[https://www.in.gov/gis/](https://www.in.gov/gis/)",
"evidenceText": "Indiana's official Geographic Information Office supports statewide GIS data access, but county assessment records remain necessary for bill-level property tax calculations.",
"sourceRef": "([Government of India][35])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_id",
"taxing_district",
"assessment_year",
"pay_year"
],
"effectiveDateHandling": "Use assessment year and pay year separately. County assessor and treasurer data are required to connect parcel geometry to actual assessed value, deductions, and local tax units.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "IA",
"stateFips": "19",
"centralizedOfficialParcelData": "partial",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://geodata.iowa.gov/](https://geodata.iowa.gov/)",
"evidenceText": "Iowa maintains an official geospatial data clearinghouse, but current statewide parcel-assessment-rate integration was not identified.",
"sourceRef": "([Iowa Geospatial Data Clearinghouse][36])"
},
{
"url": "[https://revenue.iowa.gov/media/3905/download?inline=](https://revenue.iowa.gov/media/3905/download?inline=)",
"evidenceText": "Iowa property tax guidance cites statutory solar energy system valuation exclusion treatment, including five-year exclusion treatment for certain solar value.",
"sourceRef": "([Department of Revenue][37])"
},
{
"url": "[https://revenue.iowa.gov/taxes/tax-guidance/property-tax/wind-energy-reporting](https://revenue.iowa.gov/taxes/tax-guidance/property-tax/wind-energy-reporting)",
"evidenceText": "Iowa Revenue describes wind energy conversion property as subject to special valuation under Iowa Code section 427B.26 when applicable.",
"sourceRef": "([Department of Revenue][38])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_number",
"taxing_district",
"assessment_year",
"tax_year",
"installation_year"
],
"effectiveDateHandling": "Track installation year, assessment year, exemption duration, and any local wind ordinance period. Do not estimate solar or wind effects without assessor confirmation of qualifying value and filing status.",
"retrofitRelevantExemptionsOrSpecialValuations": [
{
"type": "solar_energy_system_valuation_exclusion",
"scope": "state_statutory_but_assessor_administered",
"evidenceText": "Certain solar value is disregarded for a defined period or under statutory conditions.",
"sourceUrls": [
"[https://revenue.iowa.gov/media/3905/download?inline=](https://revenue.iowa.gov/media/3905/download?inline=)"
]
},
{
"type": "wind_energy_special_valuation",
"scope": "local_ordinance_or_state_special_valuation",
"evidenceText": "Wind energy conversion property can be subject to special valuation procedure under Iowa law.",
"sourceUrls": [
"[https://revenue.iowa.gov/taxes/tax-guidance/property-tax/wind-energy-reporting](https://revenue.iowa.gov/taxes/tax-guidance/property-tax/wind-energy-reporting)"
]
}
],
"recommendedRetroFiTreatment": "needs_assessor_review",
"sourceConfidence": "medium"
},
{
"state": "KS",
"stateFips": "20",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://www.ksrevenue.gov/pvdindex.html](https://www.ksrevenue.gov/pvdindex.html)",
"evidenceText": "Kansas Property Valuation Division publishes statewide property valuation resources and aggregate data, while parcel assessment remains county-administered.",
"sourceRef": "([Kansas Department of Revenue][39])"
},
{
"url": "[https://ksopendata.ksrevenue.gov/](https://ksopendata.ksrevenue.gov/)",
"evidenceText": "Kansas Revenue open data provides appraised property value trends by class and use, not a complete parcel-level tax calculation dataset.",
"sourceRef": "([Tyler Data & Insights][40])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_id",
"tax_unit",
"property_class",
"tax_year"
],
"effectiveDateHandling": "Use county appraised value year, statutory assessment class, and local mill levy year. State open data supports benchmarking only.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "KY",
"stateFips": "21",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "no",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://revenue.ky.gov/Property/pages/theassessmentprocessforrealproperty.aspx](https://revenue.ky.gov/Property/pages/theassessmentprocessforrealproperty.aspx)",
"evidenceText": "Kentucky Revenue describes the Property Valuation Administrator as the local official responsible for assessing most real property, with real property revalued yearly and inspected at least every four years.",
"sourceRef": "([Department of Revenue][41])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_number",
"tax_district",
"assessment_year",
"tax_year"
],
"effectiveDateHandling": "Use PVA assessment year, inspection/revaluation status, and local rate year. County records and tax bills are required for parcel estimates.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "high"
},
{
"state": "LA",
"stateFips": "22",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://www.latax.la.gov/](https://www.latax.la.gov/)",
"evidenceText": "Louisiana Tax Commission provides a portal for tax rolls and official property tax resources, but parish assessors remain the source for parcel assessment records.",
"sourceRef": "([Louisiana Tax Commission][42])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"parish",
"assessment_number",
"parcel_number",
"taxing_district",
"roll_year"
],
"effectiveDateHandling": "Use parish roll year, tax commission certification status, and local millage year. Treat statewide tax roll access as lookup support, not complete automated retrofit eligibility.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "ME",
"stateFips": "23",
"centralizedOfficialParcelData": "partial",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://mainegeolibrary-maine.hub.arcgis.com/datasets/maine%3A%3Amaine-parcels-organized-towns-feature/about?layer=9](https://mainegeolibrary-maine.hub.arcgis.com/datasets/maine%3A%3Amaine-parcels-organized-towns-feature/about?layer=9)",
"evidenceText": "Maine GeoLibrary provides parcel data for organized towns where submitted and may include assessment database attributes where provided.",
"sourceRef": "([Maine Hub][43])"
},
{
"url": "[https://www.maine.gov/revenue/taxes/property-tax/unorganized-territory/tax-maps-valuation-listings](https://www.maine.gov/revenue/taxes/property-tax/unorganized-territory/tax-maps-valuation-listings)",
"evidenceText": "Maine Revenue publishes tax maps and valuation listings for the Unorganized Territory.",
"sourceRef": "([Maine][44])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"municipality",
"county",
"map_lot",
"parcel_id",
"tax_year"
],
"effectiveDateHandling": "Use municipality-specific parcel vintage, local commitment date, tax year, and unorganized-territory valuation listings where applicable.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "MD",
"stateFips": "24",
"centralizedOfficialParcelData": "yes",
"centralizedOfficialAssessmentData": "yes",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://data.imap.maryland.gov/datasets/maryland%3A%3Amaryland-parcel-boundaries/about](https://data.imap.maryland.gov/datasets/maryland%3A%3Amaryland-parcel-boundaries/about)",
"evidenceText": "Maryland iMap provides statewide parcel boundary data tied to SDAT property data.",
"sourceRef": "([Maryland GIS Data Catalog][45])"
},
{
"url": "[https://dat.maryland.gov/realproperty/Pages/default.aspx](https://dat.maryland.gov/realproperty/Pages/default.aspx)",
"evidenceText": "Maryland SDAT maintains over two million real property accounts, appraises property on a three-year cycle, and certifies assessments to local governments for tax billing.",
"sourceRef": "([MD Assessments & Taxation][46])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"account_identifier",
"map_grid_parcel",
"tax_year",
"assessment_cycle",
"tax_district"
],
"effectiveDateHandling": "Use SDAT assessment cycle, county or municipal tax year, and tax district. Local tax bill is still needed for credits, special assessments, and final levy lines.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "high"
},
{
"state": "MA",
"stateFips": "25",
"centralizedOfficialParcelData": "yes",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "yes",
"officialSources": [
{
"url": "[https://www.mass.gov/info-details/massgis-data-property-tax-parcels](https://www.mass.gov/info-details/massgis-data-property-tax-parcels)",
"evidenceText": "MassGIS provides standardized assessor parcel mapping with boundaries and database information from each municipality's assessor.",
"sourceRef": "([Massachusetts Government][47])"
},
{
"url": "[https://www.mass.gov/lists/property-tax-data-and-statistics](https://www.mass.gov/lists/property-tax-data-and-statistics)",
"evidenceText": "Massachusetts DOR publishes property tax data and statistics including levies and rates.",
"sourceRef": "([Massachusetts Government][48])"
},
{
"url": "[https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter59/Section5](https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter59/Section5)",
"evidenceText": "Massachusetts General Laws chapter 59 section 5 contains property tax exemptions, including renewable-energy-related clauses that require local assessment administration.",
"sourceRef": "([Massachusetts General Court][49])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"municipality",
"map_lot",
"loc_id",
"fiscal_year",
"property_class",
"tax_rate_class"
],
"effectiveDateHandling": "Use fiscal year, municipal valuation date, tax class, parcel dataset vintage, and local assessor treatment of any renewable exemption or PILOT.",
"retrofitRelevantExemptionsOrSpecialValuations": [
{
"type": "renewable_energy_property_exemption_or_pilot_review",
"scope": "state_statutory_with_local_administration",
"evidenceText": "Renewable-energy-related property tax exemptions are statutory but require municipal assessor and, where applicable, PILOT or local documentation review.",
"sourceUrls": [
"[https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter59/Section5](https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter59/Section5)"
]
}
],
"recommendedRetroFiTreatment": "needs_assessor_review",
"sourceConfidence": "high"
},
{
"state": "MI",
"stateFips": "26",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://www.michigan.gov/dtmb/services/maps/mgf-data-hub/boundaries-and-mgf/tax-parcels](https://www.michigan.gov/dtmb/services/maps/mgf-data-hub/boundaries-and-mgf/tax-parcels)",
"evidenceText": "Michigan states that parcel data is maintained by counties and that the statewide parcel layer is stored internally rather than as an open statewide parcel product.",
"sourceRef": "([Michigan][50])"
},
{
"url": "[https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf](https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf)",
"evidenceText": "MEDC describes Renewable Energy Renaissance Zone benefits as applying only to operations of the designated company within approved geographic boundaries.",
"sourceRef": "([MEDC][51])"
},
{
"url": "[https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones](https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones)",
"evidenceText": "Michigan Treasury ESA guidance shows Renaissance Zone reductions during the full exemption period and phaseout years.",
"sourceRef": "([Michigan][52])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"local_unit",
"parcel_id",
"school_district",
"taxable_value_year",
"approved_zone_id"
],
"effectiveDateHandling": "Use local assessment year, taxable value year, tax bill year, approved Renaissance Zone start and end dates, and phaseout year. Do not infer RERZ eligibility from statewide geography alone.",
"retrofitRelevantExemptionsOrSpecialValuations": [
{
"type": "renewable_energy_renaissance_zone_abatement",
"scope": "approved_zone_company_project_specific",
"evidenceText": "Eligibility is tied to approved zone documents, designated company or project operations, approved boundaries, local unit approval, and phaseout schedule.",
"sourceUrls": [
"[https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf](https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf)",
"[https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones](https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones)"
]
}
],
"recommendedRetroFiTreatment": "suppress_until_review",
"sourceConfidence": "medium"
},
{
"state": "MN",
"stateFips": "27",
"centralizedOfficialParcelData": "partial",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://www.mngeo.state.mn.us/chouse/land_own_property.html](https://www.mngeo.state.mn.us/chouse/land_own_property.html)",
"evidenceText": "Minnesota geospatial guidance states parcel data is maintained at the county level by offices such as recorder, assessor, or surveyor.",
"sourceRef": "([MN IT Services][53])"
},
{
"url": "[https://www.revenue.state.mn.us/solar-energy-production-tax](https://www.revenue.state.mn.us/solar-energy-production-tax)",
"evidenceText": "Minnesota Revenue administers solar energy production tax reporting; systems over 1 MW AC are taxed at $1.20 per MWh and smaller systems are exempt from production tax.",
"sourceRef": "([Minnesota Department of Revenue][54])"
},
{
"url": "[https://www.revisor.mn.gov/statutes/cite/272.02](https://www.revisor.mn.gov/statutes/cite/272.02)",
"evidenceText": "Minnesota statutes exempt personal property consisting of solar energy generating systems and set related land classification rules.",
"sourceRef": "([MN Revisor][55])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_id",
"tax_capacity_district",
"assessment_year",
"system_capacity_mw_ac"
],
"effectiveDateHandling": "Use county assessment year, solar production reporting year, January reporting deadlines, and AC capacity thresholds. Production tax and property tax effects must be modeled separately.",
"retrofitRelevantExemptionsOrSpecialValuations": [
{
"type": "solar_personal_property_exemption",
"scope": "state_statutory",
"evidenceText": "Solar energy generating system personal property is exempt under Minnesota statute, with land classification still relevant.",
"sourceUrls": [
"[https://www.revisor.mn.gov/statutes/cite/272.02](https://www.revisor.mn.gov/statutes/cite/272.02)"
]
},
{
"type": "solar_energy_production_tax",
"scope": "state_statutory_county_collected",
"evidenceText": "Solar energy systems above the statutory AC capacity threshold are subject to production tax rather than ordinary property-tax treatment for the generation equipment.",
"sourceUrls": [
"[https://www.revenue.state.mn.us/solar-energy-production-tax](https://www.revenue.state.mn.us/solar-energy-production-tax)",
"[https://www.revisor.mn.gov/statutes/cite/272.0295](https://www.revisor.mn.gov/statutes/cite/272.0295)"
]
}
],
"recommendedRetroFiTreatment": "needs_assessor_review",
"sourceConfidence": "high"
},
{
"state": "MS",
"stateFips": "28",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://www.dor.ms.gov/centrally-assessed-properties](https://www.dor.ms.gov/centrally-assessed-properties)",
"evidenceText": "Mississippi DOR supports county property assessments, collections, and homestead exemptions while centrally assessing public service property.",
"sourceRef": "([Mississippi Department of Revenue][56])"
},
{
"url": "[https://www.dor.ms.gov/county-services/property-tax-frequently-asked-questions](https://www.dor.ms.gov/county-services/property-tax-frequently-asked-questions)",
"evidenceText": "Mississippi DOR property tax FAQs explain millage and county-administered property tax processes.",
"sourceRef": "([Mississippi Department of Revenue][57])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_number",
"tax_district",
"assessment_year",
"tax_year"
],
"effectiveDateHandling": "Use county assessment roll year, local millage year, and tax collection year. State data is not sufficient for parcel retrofit calculation.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "MO",
"stateFips": "29",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://stc.mo.gov/](https://stc.mo.gov/)",
"evidenceText": "Missouri State Tax Commission publishes statewide assessment resources, but county assessors maintain parcel-level records.",
"sourceRef": "([Missouri State Tax Commission][58])"
},
{
"url": "[https://stc.mo.gov/definitions/](https://stc.mo.gov/definitions/)",
"evidenceText": "Missouri assessment definitions set statutory assessment percentages by property class, including residential, agricultural, and other real property categories.",
"sourceRef": "([Missouri State Tax Commission][59])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_number",
"tax_code_area",
"assessment_year",
"property_class"
],
"effectiveDateHandling": "Use county assessment year, statutory class ratio, equalization status, and local levy year. Retrofit-related changes require county assessor treatment.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "MT",
"stateFips": "30",
"centralizedOfficialParcelData": "yes",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://svc.mt.gov/msl/cadastral/](https://svc.mt.gov/msl/cadastral/)",
"evidenceText": "Montana provides an official cadastral application for parcel lookup.",
"sourceRef": "([My MT Homepage][60])"
},
{
"url": "[https://mslservices.mt.gov/geographic_information/data/datalist/datalist_Details.aspx?did=%7B35524afc-669b-4614-9f44-43506ae21a1d%7D](https://mslservices.mt.gov/geographic_information/data/datalist/datalist_Details.aspx?did=%7B35524afc-669b-4614-9f44-43506ae21a1d%7D)",
"evidenceText": "Montana Cadastral Framework includes taxable and exempt parcels for most of Montana, with selected owner, assessed value, and tax district attributes copied from DOR systems.",
"sourceRef": "([MSL Services][61])"
},
{
"url": "[https://svc.mt.gov/dor/oriondataportal/Public/PropertyMTGov/Home.aspx](https://svc.mt.gov/dor/oriondataportal/Public/PropertyMTGov/Home.aspx)",
"evidenceText": "Montana Property.MT.gov supports parcel lookup, market and taxable values, and property tax exemption information.",
"sourceRef": "([My MT Homepage][62])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"geocode",
"county",
"parcel_id",
"tax_code",
"assessment_year",
"property_class"
],
"effectiveDateHandling": "Use DOR ORION data vintage, cadastral publication date, property class year, and tax district year. Tax bill confirmation remains safest for local levies and exemptions.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "high"
},
{
"state": "NE",
"stateFips": "31",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "no",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://revenue.nebraska.gov/PAD/county-assessors-and-parcel-search](https://revenue.nebraska.gov/PAD/county-assessors-and-parcel-search)",
"evidenceText": "Nebraska Revenue provides a county assessor and parcel search directory rather than a complete centralized parcel assessment dataset.",
"sourceRef": "([Nebraska Department of Revenue][63])"
},
{
"url": "[https://revenue.nebraska.gov/about/frequently-asked-questions/nebraska-property-assessment-faqs](https://revenue.nebraska.gov/about/frequently-asked-questions/nebraska-property-assessment-faqs)",
"evidenceText": "Nebraska property assessment FAQs explain that tax equals taxable value multiplied by the total consolidated tax rate, while county assessors are not responsible for tax rates or collection.",
"sourceRef": "([Nebraska Department of Revenue][64])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_id",
"tax_district",
"assessment_year",
"tax_year"
],
"effectiveDateHandling": "Use county assessment year, total consolidated tax rate year, and treasurer tax year. State directories should be used for routing only.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "high"
},
{
"state": "NV",
"stateFips": "32",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "no",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://tax.nv.gov/news-publications/local-government-services-publications/](https://tax.nv.gov/news-publications/local-government-services-publications/)",
"evidenceText": "Nevada Department of Taxation publishes local government property tax resources, but parcel assessment and billing are county-administered.",
"sourceRef": "([Nevada Department of Taxation][65])"
},
{
"url": "[https://www.clarkcountynv.gov/government/assessor/real-property](https://www.clarkcountynv.gov/government/assessor/real-property)",
"evidenceText": "A Nevada county assessor source describes tax rates as district-based and determined through state and local processes, with parcel-level assessed value maintained locally.",
"sourceRef": "([Clark County, NV][66])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_number",
"tax_district",
"fiscal_year",
"property_class"
],
"effectiveDateHandling": "Use county fiscal tax year, tax district, assessed value cap or abatement status, and local rate certification. Project-specific renewable abatements, if any, require approved documents.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_assessor_review",
"sourceConfidence": "medium"
},
{
"state": "NH",
"stateFips": "33",
"centralizedOfficialParcelData": "partial",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://new-hampshire-geodata-portal-1-nhgranit.hub.arcgis.com/datasets/NHGRANIT%3A%3Anh-parcel-mosaic-polygons/about](https://new-hampshire-geodata-portal-1-nhgranit.hub.arcgis.com/datasets/NHGRANIT%3A%3Anh-parcel-mosaic-polygons/about)",
"evidenceText": "New Hampshire's parcel mosaic provides parcel polygons for participating communities, but coverage and attributes vary by municipality.",
"sourceRef": "([New Hampshire Geodata Portal][67])"
},
{
"url": "[https://www.revenue.nh.gov/about-dra/municipal-and-property-division/property-bureau/equalization](https://www.revenue.nh.gov/about-dra/municipal-and-property-division/property-bureau/equalization)",
"evidenceText": "New Hampshire DRA performs municipal equalization and publishes equalization resources, while local municipalities administer assessments.",
"sourceRef": "([NH Revenue Administration][68])"
},
{
"url": "[https://gc.nh.gov/rsa/html/V/72/72-62.htm](https://gc.nh.gov/rsa/html/V/72/72-62.htm)",
"evidenceText": "New Hampshire statute allows each city or town to adopt a solar energy systems exemption under local-option authority.",
"sourceRef": "([New Hampshire General Court][69])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"municipality",
"map_lot",
"parcel_id",
"tax_year",
"equalization_year"
],
"effectiveDateHandling": "Use municipal assessment year, DRA equalization year, local tax rate year, and local-option adoption status. Solar exemption eligibility cannot be inferred from state geography alone.",
"retrofitRelevantExemptionsOrSpecialValuations": [
{
"type": "solar_energy_system_local_option_exemption",
"scope": "local_option",
"evidenceText": "Each city or town may adopt the solar exemption; local adoption and assessor application status are required.",
"sourceUrls": [
"[https://gc.nh.gov/rsa/html/V/72/72-62.htm](https://gc.nh.gov/rsa/html/V/72/72-62.htm)"
]
}
],
"recommendedRetroFiTreatment": "needs_assessor_review",
"sourceConfidence": "high"
},
{
"state": "NJ",
"stateFips": "34",
"centralizedOfficialParcelData": "yes",
"centralizedOfficialAssessmentData": "yes",
"centralizedOfficialTaxRateOrMillageData": "yes",
"officialSources": [
{
"url": "[https://nj.gov/njgin/edata/parcels/](https://nj.gov/njgin/edata/parcels/)",
"evidenceText": "NJGIN provides a statewide parcel composite aligned with Treasury MOD-IV data; county and municipal governments are identified as parcel stewards.",
"sourceRef": "([NJ.gov][70])"
},
{
"url": "[https://www.nj.gov/treasury/taxation/lpt/statdata.shtml](https://www.nj.gov/treasury/taxation/lpt/statdata.shtml)",
"evidenceText": "New Jersey Treasury publishes general tax rates by county and municipality, expressed per $100 of assessed value.",
"sourceRef": "([NJ.gov][71])"
},
{
"url": "[https://www.nj.gov/treasury/taxation/lpt/lpt-abatements.shtml](https://www.nj.gov/treasury/taxation/lpt/lpt-abatements.shtml)",
"evidenceText": "New Jersey Treasury describes the certified renewable energy system property tax exemption as the difference between assessed value before and after system installation, claimed through the official form process.",
"sourceRef": "([NJ.gov][72])"
}
],
"localAssessorResearchRequired": false,
"commonJoinKeys": [
"pams_pin",
"county",
"municipality",
"block",
"lot",
"qualifier",
"tax_year"
],
"effectiveDateHandling": "Use tax year, MOD-IV version, certified assessment list, municipal general tax rate year, and approved exemption application year. Tax bill confirmation is still recommended for special assessments and omitted local charges.",
"retrofitRelevantExemptionsOrSpecialValuations": [
{
"type": "certified_renewable_energy_system_property_tax_exemption",
"scope": "state_statutory_application_based",
"evidenceText": "Exemption equals the assessed valuation increase attributable to the certified renewable energy system, subject to application and assessor certification.",
"sourceUrls": [
"[https://www.nj.gov/treasury/taxation/lpt/lpt-abatements.shtml](https://www.nj.gov/treasury/taxation/lpt/lpt-abatements.shtml)",
"[https://www.nj.gov/treasury/taxation/pdf/other_forms/lpt/cres.pdf](https://www.nj.gov/treasury/taxation/pdf/other_forms/lpt/cres.pdf)"
]
}
],
"recommendedRetroFiTreatment": "calculate_from_official_data",
"sourceConfidence": "high"
},
{
"state": "NM",
"stateFips": "35",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "no",
"centralizedOfficialTaxRateOrMillageData": "yes",
"officialSources": [
{
"url": "[https://www.tax.newmexico.gov/about-us/property-tax-division/](https://www.tax.newmexico.gov/about-us/property-tax-division/)",
"evidenceText": "New Mexico Taxation and Revenue states that residential and nonresidential property is assessed by county assessors and collected by county treasurers under state oversight.",
"sourceRef": "([Taxation and Revenue New Mexico][73])"
},
{
"url": "[https://www.nmdfa.state.nm.us/local-government/budget-finance-bureau/property-taxes/certificates-of-property-tax-rates/](https://www.nmdfa.state.nm.us/local-government/budget-finance-bureau/property-taxes/certificates-of-property-tax-rates/)",
"evidenceText": "New Mexico DFA publishes annual certificates of property tax rates for all 33 counties.",
"sourceRef": "([NMDFA][74])"
},
{
"url": "[https://realfile.tax.newmexico.gov/Property%20Tax%20Code.pdf](https://realfile.tax.newmexico.gov/Property%20Tax%20Code.pdf)",
"evidenceText": "New Mexico property tax law contains valuation-limit rules and solar energy system language that require parcel-specific assessor interpretation.",
"sourceRef": "([RealFile][75])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"account_number",
"parcel_id",
"tax_area",
"tax_year",
"property_class"
],
"effectiveDateHandling": "Use county assessment year, annual DFA rate certificate year, tax area, and installation date. Solar-related valuation-cap effects should be confirmed by county assessor.",
"retrofitRelevantExemptionsOrSpecialValuations": [
{
"type": "solar_energy_system_residential_valuation_limit_interaction",
"scope": "state_statutory_but_assessor_administered",
"evidenceText": "Solar energy system installation interacts with New Mexico valuation-limit rules and should be confirmed at parcel level.",
"sourceUrls": [
"[https://realfile.tax.newmexico.gov/Property%20Tax%20Code.pdf](https://realfile.tax.newmexico.gov/Property%20Tax%20Code.pdf)"
]
}
],
"recommendedRetroFiTreatment": "needs_assessor_review",
"sourceConfidence": "medium"
},
{
"state": "NY",
"stateFips": "36",
"centralizedOfficialParcelData": "yes",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://data.gis.ny.gov/maps/8af5cef967f8474a9f262684b8908737](https://data.gis.ny.gov/maps/8af5cef967f8474a9f262684b8908737)",
"evidenceText": "New York publishes statewide publicly available tax parcel data, with annual publication and updates as needed.",
"sourceRef": "([NYS GIS Clearinghouse][76])"
},
{
"url": "[https://www.tax.ny.gov/research/property/legal/localop/487opt.htm](https://www.tax.ny.gov/research/property/legal/localop/487opt.htm)",
"evidenceText": "New York Tax Department publishes a current list of municipalities and school districts that have filed local laws or resolutions opting out of RPTL 487.",
"sourceRef": "([NY Taxation and Finance][77])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"swis_code",
"print_key",
"parcel_id",
"roll_year",
"school_district"
],
"effectiveDateHandling": "Use assessment roll year, SWIS code, school district, RPTL 487 opt-out filing date, installation date, and any PILOT agreement term. Parcel geometry alone is insufficient for exemption amount.",
"retrofitRelevantExemptionsOrSpecialValuations": [
{
"type": "rptl_487_renewable_energy_exemption_or_pilot",
"scope": "state_statutory_with_local_opt_out_and_pilot",
"evidenceText": "Solar, wind, and certain energy storage property may receive statutory exemption treatment unless the taxing jurisdiction opted out or PILOT terms apply.",
"sourceUrls": [
"[https://www.tax.ny.gov/research/property/legal/localop/487opt.htm](https://www.tax.ny.gov/research/property/legal/localop/487opt.htm)"
]
}
],
"recommendedRetroFiTreatment": "needs_assessor_review",
"sourceConfidence": "high"
},
{
"state": "NC",
"stateFips": "37",
"centralizedOfficialParcelData": "yes",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://www.nconemap.gov/pages/parcels](https://www.nconemap.gov/pages/parcels)",
"evidenceText": "NC OneMap's parcels project transforms parcel data from all 100 counties and the Eastern Band of Cherokee Indians into a statewide standardized dataset.",
"sourceRef": "([NC OneMap][78])"
},
{
"url": "[https://www.nconemap.gov/datasets/nconemap%3A%3Anorth-carolina-parcels-polygons](https://www.nconemap.gov/datasets/nconemap%3A%3Anorth-carolina-parcels-polygons)",
"evidenceText": "North Carolina parcels data includes core cadastral attributes such as ownership, acreage, and assessed value where available.",
"sourceRef": "([NC OneMap][79])"
},
{
"url": "[https://www.ncleg.gov/enactedlegislation/statutes/pdf/bysection/chapter_105/gs_105-275.pdf](https://www.ncleg.gov/enactedlegislation/statutes/pdf/bysection/chapter_105/gs_105-275.pdf)",
"evidenceText": "North Carolina statute excludes 80 percent of the appraised value of a qualifying solar energy electric system from property tax.",
"sourceRef": "([North Carolina General Assembly][80])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"pin",
"parcel_id",
"tax_district",
"assessment_year",
"exemption_application_status"
],
"effectiveDateHandling": "Use county assessment year, reappraisal cycle, tax district, and application status for the solar exclusion. County assessor confirmation is required for qualifying appraised value.",
"retrofitRelevantExemptionsOrSpecialValuations": [
{
"type": "solar_energy_electric_system_80_percent_exclusion",
"scope": "state_statutory_application_based",
"evidenceText": "Eighty percent of appraised value of a qualifying solar energy electric system is excluded, subject to local application and assessor processing.",
"sourceUrls": [
"[https://www.ncleg.gov/enactedlegislation/statutes/pdf/bysection/chapter_105/gs_105-275.pdf](https://www.ncleg.gov/enactedlegislation/statutes/pdf/bysection/chapter_105/gs_105-275.pdf)",
"[https://www.ncdor.gov/taxes-forms/property-tax/property-tax-forms/av-10-application-property-tax-exemption-or-exclusion](https://www.ncdor.gov/taxes-forms/property-tax/property-tax-forms/av-10-application-property-tax-exemption-or-exclusion)"
]
}
],
"recommendedRetroFiTreatment": "needs_assessor_review",
"sourceConfidence": "high"
},
{
"state": "ND",
"stateFips": "38",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://www.tax.nd.gov/property-tax](https://www.tax.nd.gov/property-tax)",
"evidenceText": "North Dakota Tax Department describes property tax assessment as locally and centrally assessed depending on property type, with counties determining tax due and collecting tax.",
"sourceRef": "([ND Tax Commissioner][81])"
},
{
"url": "[https://www.tax.nd.gov/local-government/property-tax](https://www.tax.nd.gov/local-government/property-tax)",
"evidenceText": "North Dakota local government property tax resources confirm the split between state oversight and local property tax administration.",
"sourceRef": "([ND Tax Commissioner][82])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_number",
"taxing_district",
"assessment_year",
"tax_year"
],
"effectiveDateHandling": "Use county assessment year, locally assessed versus centrally assessed classification, and local tax district year.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "OH",
"stateFips": "39",
"centralizedOfficialParcelData": "partial",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://ohioparcels-geohio.hub.arcgis.com/](https://ohioparcels-geohio.hub.arcgis.com/)",
"evidenceText": "Ohio maintains a statewide parcels project, but parcel valuation and billing remain county auditor and treasurer functions.",
"sourceRef": "([Ohio Parcels][83])"
},
{
"url": "[https://tax.ohio.gov/researcher/tax-data-series](https://tax.ohio.gov/researcher/tax-data-series)",
"evidenceText": "Ohio Taxation publishes state and local tax data series for research use.",
"sourceRef": "([Ohio Department of Taxation][84])"
},
{
"url": "[https://tax.ohio.gov/wps/portal/gov/tax/government/school-district-data](https://tax.ohio.gov/wps/portal/gov/tax/government/school-district-data)",
"evidenceText": "Ohio Taxation publishes aggregate property tax rates by school district in downloadable data, but parcel-specific rates require local tax district matching.",
"sourceRef": "([Ohio Department of Taxation][85])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_number",
"tax_district",
"school_district",
"tax_year",
"property_class"
],
"effectiveDateHandling": "Use county tax year, reappraisal or update year, school district, and tax district. Statewide parcel and rate data require local reconciliation for bill estimates.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "OK",
"stateFips": "40",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "no",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://oklahoma.gov/tax/ad-valorem.html](https://oklahoma.gov/tax/ad-valorem.html)",
"evidenceText": "Oklahoma Tax Commission provides ad valorem property tax resources and centrally assessed property functions; county assessors administer ordinary parcel assessment.",
"sourceRef": "([Welcome to Oklahoma's Official Web Site][86])"
},
{
"url": "[https://www.oklahomacounty.org/elected-offices/assessor](https://www.oklahomacounty.org/elected-offices/assessor)",
"evidenceText": "County assessor records provide parcel database and GIS map functionality, illustrating local administration of ordinary property assessment.",
"sourceRef": "([Oklahoma County][87])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"account_number",
"parcel_id",
"tax_area",
"assessment_year"
],
"effectiveDateHandling": "Use county assessment year, local excise board rate year, and county treasurer bill year. State resources support routing, not parcel-level retrofit calculation.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "OR",
"stateFips": "41",
"centralizedOfficialParcelData": "partial",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://ormap.net/](https://ormap.net/)",
"evidenceText": "ORMAP provides access to Oregon tax lot maps and assessor map downloads, with tax lot layer access tied to county assessor data.",
"sourceRef": "([Ormap][88])"
},
{
"url": "[https://www.oregon.gov/dor/gov-research/pages/property_tax_statistics.aspx](https://www.oregon.gov/dor/gov-research/pages/property_tax_statistics.aspx)",
"evidenceText": "Oregon DOR publishes property tax statistics and assessed-value reports, but county assessor data is required for parcel-specific calculations.",
"sourceRef": "([Oregon][89])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"map_taxlot",
"account_number",
"tax_code_area",
"tax_year"
],
"effectiveDateHandling": "Use county account year, tax code area, maximum assessed value versus real market value where applicable, and local levy year.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "PA",
"stateFips": "42",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "no",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://apps.dced.pa.gov/Munstats-public/findmunicipality.aspx](https://apps.dced.pa.gov/Munstats-public/findmunicipality.aspx)",
"evidenceText": "Pennsylvania DCED provides a municipal statistics tool with municipality and school district tax levy data refreshed nightly.",
"sourceRef": "([DCED Apps][90])"
},
{
"url": "[https://dced.pa.gov/local-government/municipal-statistics/](https://dced.pa.gov/local-government/municipal-statistics/)",
"evidenceText": "DCED publishes local tax databases for county, municipal, and school district tax information, but parcel assessments are county administered.",
"sourceRef": "([PA DECD][91])"
},
{
"url": "[https://www.waynecountypa.gov/161/Tax-Assessment](https://www.waynecountypa.gov/161/Tax-Assessment)",
"evidenceText": "A Pennsylvania county assessment office states that it maintains real property records and tax rolls but does not set millage or collect taxes, illustrating local separation of duties.",
"sourceRef": "([Wayne County PA][92])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_id",
"municipality",
"school_district",
"assessment_year",
"tax_year"
],
"effectiveDateHandling": "Use county assessment year, municipal and school levy year, and local tax collector bill year. DCED levy data is useful for rates but not parcel values.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "RI",
"stateFips": "44",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "no",
"centralizedOfficialTaxRateOrMillageData": "yes",
"officialSources": [
{
"url": "[https://www.rigis.org/datasets/edc%3A%3Amunicipalities-1997/about](https://www.rigis.org/datasets/edc%3A%3Amunicipalities-1997/about)",
"evidenceText": "RIGIS publishes official municipal political boundaries for Rhode Island city and town routing.",
"sourceRef": "([RIGIS][93])"
},
{
"url": "[https://municipalfinance.ri.gov/financial-tax-data/tax-rates](https://municipalfinance.ri.gov/financial-tax-data/tax-rates)",
"evidenceText": "Rhode Island Division of Municipal Finance publishes municipal and fire district tax rates by year.",
"sourceRef": "([RI Division of Municipal Finance][94])"
},
{
"url": "[https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm)",
"evidenceText": "Rhode Island statute sets special renewable real-property treatment using AC nameplate capacity rather than ordinary assessed-value millage.",
"sourceRef": "([Rhode Island General Assembly][95])"
},
{
"url": "[https://webserver.rilegislature.gov/PublicLaws/law25/law25398.htm](https://webserver.rilegislature.gov/PublicLaws/law25/law25398.htm)",
"evidenceText": "Rhode Island Public Law 25-398 amended renewable real and tangible property tax treatment and was effective upon passage in 2025.",
"sourceRef": "([Rhode Island General Assembly][96])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"municipality",
"parcel_id",
"plat_lot",
"assessment_date",
"tax_roll_year",
"ac_nameplate_kw"
],
"effectiveDateHandling": "Use municipal assessment date, tax roll year, statutory effective date, AC nameplate capacity, interconnection date, and any municipal waiver or ordinance status. Municipal rates support noncovered components only.",
"retrofitRelevantExemptionsOrSpecialValuations": [
{
"type": "renewable_energy_ac_kw_real_and_tangible_charge",
"scope": "state_statutory_with_municipal_administration",
"evidenceText": "Rhode Island renewable energy resources and associated real property use statutory per-AC-kW components, while municipal assessor administration and waiver status remain material.",
"sourceUrls": [
"[https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-3.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-3.htm)",
"[https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm)",
"[https://webserver.rilegislature.gov/PublicLaws/law25/law25398.htm](https://webserver.rilegislature.gov/PublicLaws/law25/law25398.htm)"
]
},
{
"type": "residential_or_manufacturer_renewable_energy_exemption",
"scope": "state_statutory_but_classification_dependent",
"evidenceText": "Residential renewable energy resources and manufacturer-employed resources may be exempt, but system use and tax classification cannot be inferred from geography.",
"sourceUrls": [
"[https://webserver.rilegislature.gov/Statutes/TITLE44/44-3/44-3-3.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-3/44-3-3.htm)"
]
}
],
"recommendedRetroFiTreatment": "needs_assessor_review",
"sourceConfidence": "high"
},
{
"state": "SC",
"stateFips": "45",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "no",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://rfa.sc.gov/data-research/local-government/property-tax](https://rfa.sc.gov/data-research/local-government/property-tax)",
"evidenceText": "South Carolina Revenue and Fiscal Affairs publishes property tax information and historical values and millage rates, but local governments levy property taxes.",
"sourceRef": "([S.C. Revenue and Fiscal Affairs][97])"
},
{
"url": "[https://www.sccounties.org/research-and-topical-information/property-taxes-and-milliage-limitations/property-tax-rates](https://www.sccounties.org/research-and-topical-information/property-taxes-and-milliage-limitations/property-tax-rates)",
"evidenceText": "The South Carolina Association of Counties publishes annual property tax rate reports compiled with county auditor input.",
"sourceRef": "([South Carolina Association of Counties][98])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_number",
"tax_district",
"assessment_year",
"property_class"
],
"effectiveDateHandling": "Use county assessment year, local millage year, and parcel tax district. State-level rate reports do not replace county tax bills.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "SD",
"stateFips": "46",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://dor.sd.gov/individuals/taxes/property-tax/](https://dor.sd.gov/individuals/taxes/property-tax/)",
"evidenceText": "South Dakota Revenue states that all property is assessed at full and true value and equalized to 85 percent for property tax purposes.",
"sourceRef": "([South Dakota Department of Revenue][99])"
},
{
"url": "[https://sdproptax.info/](https://sdproptax.info/)",
"evidenceText": "South Dakota's property tax portal explains that local rates, data, and property tax resources are locally administered and that the state does not collect or spend property tax.",
"sourceRef": "([SD Property Tax Portal][100])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_id",
"taxing_district",
"assessment_year",
"tax_year"
],
"effectiveDateHandling": "Use county assessment year, equalization year, local levy year, and tax district. State portal supports routing and education, not parcel estimate automation.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "TN",
"stateFips": "47",
"centralizedOfficialParcelData": "partial",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "yes",
"officialSources": [
{
"url": "[https://comptroller.tn.gov/office-functions/pa/gisredistricting/redistricting-and-land-use-maps/parcel-data.html](https://comptroller.tn.gov/office-functions/pa/gisredistricting/redistricting-and-land-use-maps/parcel-data.html)",
"evidenceText": "Tennessee Comptroller offers GIS parcel data by county, updated monthly, but several large counties are not maintained by the Comptroller.",
"sourceRef": "([Comptroller of the Treasury][101])"
},
{
"url": "[https://comptroller.tn.gov/office-functions/pa/tax-resources/assessment-information-for-each-county/property-tax-rates.html](https://comptroller.tn.gov/office-functions/pa/tax-resources/assessment-information-for-each-county/property-tax-rates.html)",
"evidenceText": "Tennessee Comptroller publishes property tax rates by year.",
"sourceRef": "([Comptroller of the Treasury][102])"
},
{
"url": "[https://comptroller.tn.gov/office-functions/pa/property-taxes/how-to-figure-your-tax-bill.html](https://comptroller.tn.gov/office-functions/pa/property-taxes/how-to-figure-your-tax-bill.html)",
"evidenceText": "Tennessee Comptroller explains that the assessor determines appraised value and statutory assessment ratios apply by property class.",
"sourceRef": "([Comptroller of the Treasury][103])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_id",
"map_group_parcel",
"tax_district",
"tax_year",
"property_class"
],
"effectiveDateHandling": "Use county parcel coverage status, appraisal cycle, assessment ratio, tax district, and certified tax rate year. Excluded counties require direct county data feeds.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "high"
},
{
"state": "TX",
"stateFips": "48",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "no",
"centralizedOfficialTaxRateOrMillageData": "yes",
"officialSources": [
{
"url": "[https://comptroller.texas.gov/taxes/property-tax/](https://comptroller.texas.gov/taxes/property-tax/)",
"evidenceText": "Texas Comptroller states that Texas has no state property tax and that local taxing units set rates and collect property taxes.",
"sourceRef": "([Texas Comptroller][104])"
},
{
"url": "[https://comptroller.texas.gov/taxes/property-tax/rates/](https://comptroller.texas.gov/taxes/property-tax/rates/)",
"evidenceText": "Texas Comptroller publishes property tax rate data reported by appraisal districts and taxing units.",
"sourceRef": "([Texas Comptroller][105])"
},
{
"url": "[https://statutes.capitol.texas.gov/docs/TX/htm/TX.11.htm](https://statutes.capitol.texas.gov/docs/TX/htm/TX.11.htm)",
"evidenceText": "Texas Tax Code section 11.27 provides an exemption for appraised value attributable to solar or wind-powered energy devices, subject to statutory conditions.",
"sourceRef": "([Texas Statutes][106])"
},
{
"url": "[https://comptroller.texas.gov/forms/50-123.pdf](https://comptroller.texas.gov/forms/50-123.pdf)",
"evidenceText": "Texas Comptroller Form 50-123 is the official exemption application for solar or wind-powered energy devices.",
"sourceRef": "([Texas Comptroller][107])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"cad_property_id",
"geo_id",
"taxing_unit",
"tax_year",
"exemption_application_status"
],
"effectiveDateHandling": "Use appraisal district tax year, local taxing unit rate year, exemption application year, and appraisal review status. Rates are available centrally, but parcel values and exemption processing are local CAD data.",
"retrofitRelevantExemptionsOrSpecialValuations": [
{
"type": "solar_or_wind_powered_energy_device_exemption",
"scope": "state_statutory_application_based",
"evidenceText": "The exemption applies to appraised value attributable to qualifying solar or wind-powered energy devices and requires appraisal district processing.",
"sourceUrls": [
"[https://statutes.capitol.texas.gov/docs/TX/htm/TX.11.htm](https://statutes.capitol.texas.gov/docs/TX/htm/TX.11.htm)",
"[https://comptroller.texas.gov/forms/50-123.pdf](https://comptroller.texas.gov/forms/50-123.pdf)"
]
}
],
"recommendedRetroFiTreatment": "needs_assessor_review",
"sourceConfidence": "high"
},
{
"state": "UT",
"stateFips": "49",
"centralizedOfficialParcelData": "yes",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://parcels.utah.gov/](https://parcels.utah.gov/)",
"evidenceText": "Utah State Parcels is an official statewide parcel web mapping application.",
"sourceRef": "([Utah State Parcels][108])"
},
{
"url": "[https://tax.utah.gov/propertytax/](https://tax.utah.gov/propertytax/)",
"evidenceText": "Utah Tax Commission describes property tax oversight, centrally assessed property, certified tax rates, and local handling of bills and payments.",
"sourceRef": "([Utah State Tax Commission][109])"
},
{
"url": "[https://opendata.gis.utah.gov/datasets/utah%3A%3Autah-tax-areas-2024/about](https://opendata.gis.utah.gov/datasets/utah%3A%3Autah-tax-areas-2024/about)",
"evidenceText": "Utah publishes tax area GIS data maintained by the Utah State Tax Commission.",
"sourceRef": "([Utah Open Data][110])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_id",
"tax_area",
"serial_number",
"assessment_year",
"tax_year"
],
"effectiveDateHandling": "Use parcel dataset vintage, tax area year, certified tax rate year, and county assessment year. Local tax bill remains required for final charges and exemptions.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "high"
},
{
"state": "VT",
"stateFips": "50",
"centralizedOfficialParcelData": "partial",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://maps.vcgi.vermont.gov/gisdata/metadata/CadastralParcels_VTPARCELS.htm](https://maps.vcgi.vermont.gov/gisdata/metadata/CadastralParcels_VTPARCELS.htm)",
"evidenceText": "Vermont parcel data is aggregated from municipalities, updated weekly, but content periods vary by municipality.",
"sourceRef": "([VCGI Maps][111])"
},
{
"url": "[https://legislature.vermont.gov/statutes/section/32/215/08701](https://legislature.vermont.gov/statutes/section/32/215/08701)",
"evidenceText": "Vermont statute establishes a uniform capacity tax framework for renewable energy plants and storage, with exemptions for smaller systems.",
"sourceRef": "([Vermont General Assembly][112])"
},
{
"url": "[https://legislature.vermont.gov/statutes/section/32/121/03481](https://legislature.vermont.gov/statutes/section/32/121/03481)",
"evidenceText": "Vermont statute contains appraisal-model provisions for solar plants, with exclusions for property exempt under other statutory provisions.",
"sourceRef": "([Vermont General Assembly][113])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"municipality",
"span",
"parcel_id",
"grand_list_year",
"capacity_kw",
"system_type"
],
"effectiveDateHandling": "Use municipal grand list year, parcel data vintage, system capacity, uniform capacity tax year, and any exemption threshold. Separate capacity tax from ordinary property tax.",
"retrofitRelevantExemptionsOrSpecialValuations": [
{
"type": "uniform_capacity_tax_and_small_system_exemption",
"scope": "state_statutory_capacity_tax",
"evidenceText": "Vermont uses a capacity-tax framework for certain renewable energy plants and exempts small systems under statutory thresholds.",
"sourceUrls": [
"[https://legislature.vermont.gov/statutes/section/32/215/08701](https://legislature.vermont.gov/statutes/section/32/215/08701)"
]
}
],
"recommendedRetroFiTreatment": "needs_assessor_review",
"sourceConfidence": "medium"
},
{
"state": "VA",
"stateFips": "51",
"centralizedOfficialParcelData": "no",
"centralizedOfficialAssessmentData": "no",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://www.tax.virginia.gov/property-tax-and-real-estate-tax-questions](https://www.tax.virginia.gov/property-tax-and-real-estate-tax-questions)",
"evidenceText": "Virginia Tax states that real estate and personal property taxes are local, administered by cities, counties, and towns, with rates varying by locality.",
"sourceRef": "([Virginia Tax][114])"
},
{
"url": "[https://www.coopercenter.org/virginia-local-tax-rates](https://www.coopercenter.org/virginia-local-tax-rates)",
"evidenceText": "The Weldon Cooper Center publishes comprehensive Virginia local tax rate data, useful as a public-sector reference but not a parcel assessor record.",
"sourceRef": "([Cooper Center][115])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"locality",
"parcel_id",
"tax_map_number",
"tax_year",
"property_class"
],
"effectiveDateHandling": "Use locality assessment year, tax rate year, and local ordinance status. Local assessor and treasurer records are required for parcel estimates.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_assessor_review",
"sourceConfidence": "medium"
},
{
"state": "WA",
"stateFips": "53",
"centralizedOfficialParcelData": "partial",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://geo.wa.gov/maps/2b603a599a0842a3b2284c04c8927f35](https://geo.wa.gov/maps/2b603a599a0842a3b2284c04c8927f35)",
"evidenceText": "Washington Geoportal publishes statewide tax parcel data, with current dataset vintage shown in official metadata.",
"sourceRef": "([Washington Geospatial Open Data Portal][116])"
},
{
"url": "[https://www.arcgis.com/home/item.html?id=2b603a599a0842a3b2284c04c8927f35](https://www.arcgis.com/home/item.html?id=2b603a599a0842a3b2284c04c8927f35)",
"evidenceText": "Washington parcel metadata states the project provides a statewide dataset for counties that currently have digital tax parcel data.",
"sourceRef": "([ArcGIS][117])"
},
{
"url": "[https://dor.wa.gov/taxes-rates/gis-data-downloads](https://dor.wa.gov/taxes-rates/gis-data-downloads)",
"evidenceText": "Washington DOR publishes GIS property tax district boundary data for certain state valuation purposes, not a complete ordinary parcel tax rate engine.",
"sourceRef": "([Washington Department of Revenue][118])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_number",
"tax_code_area",
"assessment_year",
"tax_year"
],
"effectiveDateHandling": "Use county coverage status, parcel dataset vintage, levy code area, assessment year, and tax year. County assessor or treasurer records are required for final bill lines.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "medium"
},
{
"state": "WV",
"stateFips": "54",
"centralizedOfficialParcelData": "yes",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://www.mapwv.gov/parcel/](https://www.mapwv.gov/parcel/)",
"evidenceText": "West Virginia Property Tax Division supports public access to digital surface tax maps and GIS parcel files.",
"sourceRef": "([MapWV][119])"
},
{
"url": "[https://www.mapwv.gov/assessment/](https://www.mapwv.gov/assessment/)",
"evidenceText": "West Virginia Property Assessment portal displays ownership and location information for all 55 counties through a collaboration of the Tax Division and WV GIS Technical Center.",
"sourceRef": "([MapWV][120])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"district",
"map_parcel",
"parcel_id",
"tax_year",
"property_class"
],
"effectiveDateHandling": "Use annual surface tax map vintage, county assessment year, tax district, and local levy year. State parcel portal supports routing and lookup, but tax bill confirmation is safest.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "high"
},
{
"state": "WI",
"stateFips": "55",
"centralizedOfficialParcelData": "yes",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "partial",
"officialSources": [
{
"url": "[https://maps.sco.wisc.edu/Parcels/](https://maps.sco.wisc.edu/Parcels/)",
"evidenceText": "Wisconsin State Cartographer's Office provides a statewide parcel map assembled from county data and cautions users to consult local sources for current or comprehensive information.",
"sourceRef": "([WiscMaps][121])"
},
{
"url": "[https://www.sco.wisc.edu/parcels/data/](https://www.sco.wisc.edu/parcels/data/)",
"evidenceText": "Wisconsin statewide parcel data is available for download through the State Cartographer's Office.",
"sourceRef": "([State Cartographer's Office][122])"
},
{
"url": "[https://doa.wi.gov/Pages/LocalGovtsGrants/Parcel-Initiative.aspx](https://doa.wi.gov/Pages/LocalGovtsGrants/Parcel-Initiative.aspx)",
"evidenceText": "Wisconsin's Statewide Parcel Map Initiative aggregates local parcel datasets under state statutory directives.",
"sourceRef": "([DOA][123])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_id",
"municipality",
"tax_district",
"tax_year"
],
"effectiveDateHandling": "Use parcel dataset version, county submission vintage, municipal assessment year, and tax district year. Local tax bills are required for exact levies and credits.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "high"
},
{
"state": "WY",
"stateFips": "56",
"centralizedOfficialParcelData": "partial",
"centralizedOfficialAssessmentData": "partial",
"centralizedOfficialTaxRateOrMillageData": "yes",
"officialSources": [
{
"url": "[https://wyo-prop-div.wyo.gov/](https://wyo-prop-div.wyo.gov/)",
"evidenceText": "Wyoming Property Tax Division provides parcel and district viewers, assessment data, and county assessor resources.",
"sourceRef": "([Wyoming Property Division][124])"
},
{
"url": "[https://wyo-prop-div.wyo.gov/residential](https://wyo-prop-div.wyo.gov/residential)",
"evidenceText": "Wyoming county assessors update property values annually and complete detailed review at least every six years.",
"sourceRef": "([Wyoming Property Division][125])"
},
{
"url": "[https://wyo-prop-div.wyo.gov/tax-districts/general-information](https://wyo-prop-div.wyo.gov/tax-districts/general-information)",
"evidenceText": "Wyoming maps entities and special districts able to levy mills and annually publishes tax district maps and data used in statewide CAMA placement.",
"sourceRef": "([Wyoming Property Division][126])"
}
],
"localAssessorResearchRequired": true,
"commonJoinKeys": [
"county",
"parcel_id",
"tax_district",
"assessment_year",
"property_class"
],
"effectiveDateHandling": "Use county annual assessment year, six-year review status, tax district map year, and levy year. Parcel estimate requires current assessor record or tax bill.",
"retrofitRelevantExemptionsOrSpecialValuations": [],
"recommendedRetroFiTreatment": "needs_tax_bill",
"sourceConfidence": "high"
}
],
"specificRuleRepairs": [
{
"ruleId": "tax_geo_ri_renewable_property_tax_local_assessor_workflow_v1",
"overallAction": "keep_with_repairs",
"recommendedEstimateStatus": "needs_assessor_review",
"sourceConfidence": "high",
"estimateConfidence": "low_until_assessor_confirms_project_classification_and_bill_lines",
"repairs": [
{
"field": "calculationImpact.canCalculateWithoutUserTaxData",
"currentOrObservedIssue": "The current rule marks all calculation paths false, which is safe but misses a limited statutory preview that can be computed when AC nameplate capacity and project classification are known.",
"recommendedValue": "false_for_full_tax_savings; true_only_for_nonbinding_statutory_kw_charge_preview_when_ac_nameplate_and_classification_are_known",
"evidenceText": "Rhode Island law expresses renewable real and tangible property components as dollar-per-AC-kW statutory amounts, while full tax savings versus ordinary assessment still requires municipal assessor confirmation and any noncovered tax lines.",
"sourceUrls": [
"[https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-3.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-3.htm)",
"[https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm)",
"[https://webserver.rilegislature.gov/PublicLaws/law25/law25398.htm](https://webserver.rilegislature.gov/PublicLaws/law25/law25398.htm)"
]
},
{
"field": "derivedInputs",
"currentOrObservedIssue": "The rule stores dollar-per-kW amounts as derived inputs but should distinguish statutory kW charge components from ordinary millage inputs.",
"recommendedValue": "Add calculationComponentType = statutory_kw_charge_component for ri_tangible_renewable_tax_rate_per_kw_ac and ri_real_property_renewable_tax_rate_per_kw_ac.",
"evidenceText": "The Rhode Island statutory treatment is not ordinary assessed value multiplied by a municipal rate; municipal tax rates remain relevant only for noncovered property and bill reconciliation.",
"sourceUrls": [
"[https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-3.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-3.htm)",
"[https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm)"
]
},
{
"field": "effectiveStartDate",
"currentOrObservedIssue": "The rule uses 2025-07-02 as an effective date without separating historical OER commercial-system rules from 2025 statutory amendments.",
"recommendedValue": "Retain 2025-07-02 only as the effective date for the 2025 amendment; separately store OER commercial-system rule vintage and pre-2017 interconnection grandfathering logic.",
"evidenceText": "Rhode Island Public Law 25-398 was effective upon passage in 2025, while OER commercial renewable tangible-tax rules and pre-2017 interconnection treatment are separate historical conditions.",
"sourceUrls": [
"[https://webserver.rilegislature.gov/PublicLaws/law25/law25398.htm](https://webserver.rilegislature.gov/PublicLaws/law25/law25398.htm)",
"[https://energy.ri.gov/sites/g/files/xkgbur741/files/documents/renewable/OER-Rules-and-Regulations---Commercial-Renewable-Energy-Systems-Tangible-Tax-Value.pdf](https://energy.ri.gov/sites/g/files/xkgbur741/files/documents/renewable/OER-Rules-and-Regulations---Commercial-Renewable-Energy-Systems-Tangible-Tax-Value.pdf)"
]
},
{
"field": "requiredUserInputs",
"currentOrObservedIssue": "The rule appropriately requires assessor confirmation but should add explicit interconnection date and prior-tax-status fields.",
"recommendedValue": "Add interconnection_service_agreement_date, pre_2017_tax_status, program_enrollment_documents, municipal_waiver_or_ordinance_document, and assessor_confirmed_tax_classification.",
"evidenceText": "Rhode Island renewable-tax treatment depends on AC nameplate capacity, project classification, municipal waiver or ordinance status, interconnection/program documents, and grandfathering provisions for certain pre-2017 projects.",
"sourceUrls": [
"[https://webserver.rilegislature.gov/PublicLaws/law25/law25398.htm](https://webserver.rilegislature.gov/PublicLaws/law25/law25398.htm)",
"[https://rules.sos.ri.gov/regulations/part/300-00-00-2](https://rules.sos.ri.gov/regulations/part/300-00-00-2)"
]
},
{
"field": "serverDerivableInputs",
"currentOrObservedIssue": "Municipality can be derived, but parcel classification, waiver status, and exemption eligibility cannot be derived from state or municipal geography alone.",
"recommendedValue": "Use RIGIS municipal boundaries and RI Division of Municipal Finance rate files for routing and bill context only; do not auto-approve exemptions or waivers without assessor or ordinance evidence.",
"evidenceText": "RIGIS provides official city and town boundaries and Division of Municipal Finance publishes rates, but no complete official statewide municipal waiver dataset was identified.",
"sourceUrls": [
"[https://www.rigis.org/datasets/edc%3A%3Amunicipalities-1997/about](https://www.rigis.org/datasets/edc%3A%3Amunicipalities-1997/about)",
"[https://municipalfinance.ri.gov/financial-tax-data/tax-rates](https://municipalfinance.ri.gov/financial-tax-data/tax-rates)"
]
}
],
"safeUserFacingBehavior": "Show Rhode Island renewable property-tax treatment as an assessor-review workflow. Provide a nonbinding statutory kW charge preview only when AC nameplate capacity and classification are known; do not claim savings versus ordinary assessment without a current tax bill or assessor confirmation."
},
{
"ruleId": "tax_geo_mi_rerz_tax_exemption_workflow_v1",
"overallAction": "split_or_normalize_multi_tax_workflow_and_suppress_until_approved_docs",
"recommendedEstimateStatus": "suppress_until_review",
"sourceConfidence": "medium",
"estimateConfidence": "low_until_approved_zone_documents_boundary_confirmation_phaseout_year_and_tax_lines_are_loaded",
"repairs": [
{
"field": "taxType",
"currentOrObservedIssue": "The current value property_income_tax_exemption mixes property tax, ESA, and possible local income tax effects in a single type.",
"recommendedValue": "Use multi_tax_abatement_workflow as the parent type, with child components for real_property_tax, personal_property_tax_or_ESA, local_income_tax_if_applicable, and noncovered_tax_lines.",
"evidenceText": "MEDC materials describe Renaissance Zone benefits as company- and zone-specific and identify multiple taxes that may be affected; Michigan Treasury ESA guidance separately handles special millages and phaseout treatment.",
"sourceUrls": [
"[https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf](https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf)",
"[https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones](https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones)"
]
},
{
"field": "effectiveStartDate",
"currentOrObservedIssue": "A statewide effective date cannot determine benefits for a project-specific approved zone.",
"recommendedValue": "Set generic rule effectiveStartDate to null and store approved_zone_start_date, approved_zone_end_date, phaseout_year, and abatement_percent on the approved-zone record.",
"evidenceText": "Renewable Energy Renaissance Zone benefits apply only to operations of the designated company within approved zone boundaries and vary by approved duration and phaseout schedule.",
"sourceUrls": [
"[https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf](https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf)",
"[https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones](https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones)"
]
},
{
"field": "calculationImpact.recommendedEstimateStatus",
"currentOrObservedIssue": "The current rule sets needs_assessor_review, which is safe but could still allow users to expect a rough estimate without proof of zone eligibility.",
"recommendedValue": "suppress_until_review before approved designation or agreement, legal description, parcel/facility-in-zone confirmation, and current phaseout year are loaded.",
"evidenceText": "MEDC states RERZ benefits are tied to the designated company and geographic boundaries. No current open statewide Renewable Energy Renaissance Zone parcel-boundary dataset was identified.",
"sourceUrls": [
"[https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf](https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf)",
"[https://www.michigan.gov/dtmb/services/maps/mgf-data-hub/boundaries-and-mgf/tax-parcels](https://www.michigan.gov/dtmb/services/maps/mgf-data-hub/boundaries-and-mgf/tax-parcels)"
]
},
{
"field": "requiredUserInputs",
"currentOrObservedIssue": "The current rule asks for approved documents and tax bills but should explicitly require local unit approval, MSF approval, compliance status, and delinquency status.",
"recommendedValue": "Add local_unit_resolution, MSF_board_approval_or_designation_document, development_agreement, legal_description_or_boundary_file, compliance_status, delinquency_status, and tax_line_exclusion_confirmation.",
"evidenceText": "MEDC materials describe local unit approval and company-specific designation. ESA and Renaissance Zone tax effects depend on active approval, compliance, phaseout, and excluded tax lines.",
"sourceUrls": [
"[https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf](https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf)",
"[https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones](https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones)"
]
},
{
"field": "refreshTriggers",
"currentOrObservedIssue": "The rule should treat the 2024 framework changes as an ongoing refresh trigger.",
"recommendedValue": "Monitor Public Act 40 of 2024, MSF board guidelines, MEDC reports, and Treasury ESA guidance at least annually.",
"evidenceText": "Michigan Public Act 40 of 2024 amended Renaissance Zone provisions, and MEDC reported 2024 program framework updates.",
"sourceUrls": [
"[https://legislature.michigan.gov/documents/2023-2024/publicact/htm/2024-PA-0040.htm](https://legislature.michigan.gov/documents/2023-2024/publicact/htm/2024-PA-0040.htm)",
"[https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/cy-2024-msf-specific-policy-change-report.pdf](https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/cy-2024-msf-specific-policy-change-report.pdf)"
]
}
],
"safeUserFacingBehavior": "Do not estimate Michigan RERZ tax benefits from address, county, municipality, or ZIP alone. Show eligibility as unavailable until approved zone and company/project documents, parcel boundary confirmation, phaseout year, and actual tax lines are reviewed."
}
],
"normalizedRuleSchemaRecommendations": {
"confidenceModel": {
"fields": [
"sourceConfidence",
"estimateConfidence",
"geographyMatchConfidence",
"assessorTreatmentConfidence"
],
"recommendation": "Separate confidence in source authenticity from confidence that a parcel-specific estimate can be calculated. A statute can have high source confidence while estimate confidence remains low until assessor classification, exemption filing, tax bill lines, and effective dates are confirmed."
},
"inputSeparation": {
"geographyDerivedInputs": [
"country",
"state_code",
"state_fips",
"county_fips",
"municipality_or_local_unit",
"coordinates",
"official_boundary_match",
"parcel_candidate",
"tax_district_candidate",
"school_district_candidate"
],
"taxpayerOrProjectSpecificInputs": [
"parcel_account_id",
"current_tax_bill",
"assessor_record",
"property_class",
"owner_occupancy_or_taxpayer_status",
"technology_type",
"installation_date",
"placed_in_service_date",
"interconnection_date",
"ac_nameplate_capacity_kw",
"dc_nameplate_capacity_kw",
"battery_capacity_kwh",
"system_use",
"ownership_model",
"exemption_application_or_certificate",
"approved_zone_or_abatement_document"
],
"recommendation": "Never infer taxpayer eligibility, project classification, exemption filing status, or approved-zone status from geography alone."
},
"calculationModes": [
{
"mode": "calculate_from_official_data",
"whenToUse": "State or district has official parcel, assessment, and rate data with reliable parcel-to-tax-district joins and no unresolved application-based exemption condition.",
"userMessage": "Estimate available from official data; user tax bill may still refine special assessments, credits, and recent changes."
},
{
"mode": "needs_tax_bill",
"whenToUse": "Official statewide or county data can route the parcel, but current assessed value, deductions, exemptions, or bill-line rates require the actual tax bill.",
"userMessage": "Upload or enter the current property tax bill to estimate the property-tax impact."
},
{
"mode": "needs_assessor_review",
"whenToUse": "A local option, assessor classification, application approval, municipal waiver, PILOT, special valuation, or statutory ambiguity controls eligibility.",
"userMessage": "Assessor or tax office confirmation is required before estimating savings."
},
{
"mode": "suppress_until_review",
"whenToUse": "Benefits are approved-zone, project-specific, confidential, or boundary-specific and no official parcel-level eligibility dataset exists.",
"userMessage": "RetroFi cannot estimate this benefit without approved program documents and parcel-level confirmation."
}
],
"effectiveDateModel": {
"requiredFields": [
"law_effective_date",
"assessment_or_lien_date",
"roll_year",
"tax_bill_year",
"fiscal_year",
"rate_certification_date",
"dataset_vintage",
"application_deadline",
"approval_date",
"placed_in_service_date",
"sunset_date",
"phaseout_year"
],
"recommendation": "Store each date separately. Do not collapse statutory effective date, assessment date, tax roll year, and bill year into one field."
},
"jurisdictionResolution": {
"steps": [
"Normalize address and coordinates.",
"Join coordinates to official state, county, municipal, school, and special-district boundaries where available.",
"Resolve candidate parcel from official parcel fabric or county assessor lookup.",
"Map parcel to tax district or tax code area using official assessment or tax data.",
"Reconcile with the current tax bill or assessor record before calculating bill-line effects."
],
"doNotUseAsSoleAuthority": [
"ZIP code",
"mailing city",
"place name",
"utility service territory",
"third-party parcel boundary",
"DSIRE summary without official statute or agency source"
]
},
"exemptionScopeTypes": [
"statewide_mandatory",
"statewide_application_based",
"local_option",
"municipal_waiver_or_ordinance",
"approved_zone_project_specific",
"abatement_or_pilot_agreement",
"valuation_exclusion",
"alternate_valuation",
"capacity_or_production_tax_substitute",
"personal_property_exemption",
"real_property_new_construction_exclusion"
],
"nonAdValoremAndExcludedLineHandling": {
"fieldsToTrack": [
"special_assessments",
"debt_levies",
"school_sinking_fund",
"fire_district_charge",
"stormwater_or_utility_fee",
"PILOT",
"production_tax",
"capacity_tax",
"state_education_tax",
"local_income_tax",
"ESA_or_personal_property_statement"
],
"recommendation": "Store tax lines and exclusions explicitly. Many incentives do not affect special assessments, debt levies, fees, PILOTs, production taxes, or capacity taxes."
},
"sourceHierarchy": [
"state constitution, statute, regulation, or administrative rule",
"state tax agency or revenue department official data",
"state GIS or official open data portal",
"county assessor, auditor, treasurer, collector, or property appraiser",
"municipal ordinance, local option filing, or taxing district certificate",
"approved program agreement, zone designation, certificate, PILOT, or filed tariff",
"current user tax bill or assessment notice",
"third-party summary only as a discovery aid, never as calculation authority"
],
"databaseTables": [
{
"table": "property_tax_source_catalog",
"purpose": "Track official sources, coverage, update cadence, machine-readable formats, data vintage, license, and retrieval metadata."
},
{
"table": "parcel_assessment_snapshot",
"purpose": "Store parcel, assessment, property class, exemption, and tax district attributes by source vintage and roll year."
},
{
"table": "tax_rate_or_millage_snapshot",
"purpose": "Store rates by jurisdiction, tax district, tax class, fiscal year, and certification date."
},
{
"table": "retrofit_tax_rule",
"purpose": "Store normalized statutory, local-option, approved-zone, valuation-exclusion, capacity-tax, and workflow rules."
},
{
"table": "local_option_status",
"purpose": "Store municipality, school district, or taxing-unit adoption, opt-out, waiver, ordinance, and PILOT status with source documents."
},
{
"table": "user_tax_profile_evidence",
"purpose": "Store user-provided tax bills, assessor letters, exemption applications, approvals, and project-specific documents."
}
]
},
"requiredUserOrDocumentInputs": [
{
"inputKey": "parcel_or_account_identifier",
"label": "Parcel, APN, PIN, folio, TMK, SSL, SPAN, geocode, map-lot, or account number",
"reason": "Most property tax systems require the local parcel or account identifier to join assessor records, tax districts, tax bills, and exemptions.",
"sourceStrategy": "user_tax_bill_or_assessor_record"
},
{
"inputKey": "current_property_tax_bill",
"label": "Current property tax bill with all line items",
"reason": "Tax bills reveal actual taxable value, exemptions, tax districts, millage or rate lines, special assessments, credits, and excluded charges.",
"sourceStrategy": "property_tax_bill"
},
{
"inputKey": "assessor_property_record_or_assessment_notice",
"label": "Current assessor property record or assessment notice",
"reason": "Assessor records confirm property class, land and improvement values, exemptions, valuation notices, and local treatment of retrofit improvements.",
"sourceStrategy": "assessor_confirmation"
},
{
"inputKey": "project_technology_and_capacity",
"label": "Technology type, AC/DC nameplate capacity, storage capacity, and placed-in-service date",
"reason": "Many renewable property-tax rules depend on technology, system size, AC capacity, storage capacity, and installation or service date.",
"sourceStrategy": "project_documentation"
},
{
"inputKey": "system_use_and_ownership",
"label": "Residential, commercial, manufacturer, agricultural, utility-scale, net-metered, behind-the-meter, third-party-owned, or other use",
"reason": "Eligibility and tax class often depend on use, ownership, customer class, and whether equipment is real or personal property.",
"sourceStrategy": "user_input_and_assessor_confirmation"
},
{
"inputKey": "interconnection_or_program_documents",
"label": "Interconnection agreement, utility approval, net-metering enrollment, renewable program approval, or tariff enrollment",
"reason": "Rules such as Rhode Island's renewable treatment and production or capacity-tax regimes can depend on interconnection date, program enrollment, and official project attributes.",
"sourceStrategy": "approved_program_document"
},
{
"inputKey": "exemption_application_and_approval",
"label": "Filed exemption application, certificate, assessor approval, or denial",
"reason": "Application-based exemptions cannot be assumed from eligibility criteria alone.",
"sourceStrategy": "assessor_confirmation"
},
{
"inputKey": "local_ordinance_opt_out_waiver_or_pilot",
"label": "Local ordinance, opt-out filing, municipal waiver, PILOT, or abatement agreement",
"reason": "Local-option and PILOT rules materially change calculation and may override default statutory assumptions.",
"sourceStrategy": "official_local_document"
},
{
"inputKey": "approved_zone_or_development_agreement",
"label": "Approved zone designation, legal description, development agreement, certificate, or MSF/local approval document",
"reason": "Approved-zone incentives such as Michigan RERZ are project-specific and cannot be inferred from address alone.",
"sourceStrategy": "approved_program_document"
},
{
"inputKey": "taxpayer_status_documents",
"label": "Owner-occupancy, homestead, manufacturer, agricultural, nonprofit, delinquency, or compliance status documents",
"reason": "Taxpayer status can control exemptions, valuation rules, filing eligibility, and income-tax or local-tax treatment.",
"sourceStrategy": "taxpayer_documentation"
}
],
"refreshPlan": [
{
"workstream": "source_catalog_refresh",
"cadence": "quarterly_plus_on_legislative_change",
"actions": [
"Maintain a state-by-state official source catalog with URL, agency, data type, format, coverage, update cadence, license, retrieval date, and checksum.",
"Record whether data is parcel geometry, CAMA, assessment roll, tax rate, tax district boundary, tax bill, exemption record, or statutory rule."
],
"safeBehaviorWhenMissing": "Mark state or county coverage as partial and route users to tax bill or assessor-review workflow."
},
{
"workstream": "parcel_and_assessment_ingestion",
"cadence": "monthly_where_state_updates_monthly; otherwise_after_annual_roll_or_published_vintage",
"actions": [
"Ingest centralized official parcel and assessment datasets where available.",
"For partial states, maintain county coverage flags and excluded-county lists.",
"Validate parcel counts, county coverage, geometry validity, and join keys against source metadata."
],
"safeBehaviorWhenMissing": "Do not backfill parcel values from third-party data without marking source confidence low and requiring tax bill confirmation."
},
{
"workstream": "rate_millage_and_tax_district_refresh",
"cadence": "annually_after_rate_certification_or_budget_adoption",
"actions": [
"Version rates by tax year, fiscal year, roll year, tax class, district, and certification date.",
"Store tax district boundaries separately from rates.",
"Flag special assessments, fees, debt levies, school levies, and non-ad-valorem charges separately."
],
"safeBehaviorWhenMissing": "If parcel-to-rate-area join or exact bill line is missing, return needs_tax_bill rather than estimating total tax."
},
{
"workstream": "retrofit_rule_refresh",
"cadence": "after_each_state_legislative_session_and_at_least_annually",
"actions": [
"Monitor statutes, regulations, revenue guidance, assessor bulletins, and official forms for solar, wind, storage, efficiency, renewable, abatement, and special valuation changes.",
"Store sunsets, phaseouts, application deadlines, effective dates, and grandfathering provisions as separate fields."
],
"safeBehaviorWhenMissing": "Suppress or require review for rules with unclear effective dates, expired sunsets, local options, or pending guidance."
},
{
"workstream": "local_option_and_ordinance_refresh",
"cadence": "semiannually_or_when_official_state_lists_update",
"actions": [
"Track local opt-outs, local-option exemptions, municipal waivers, PILOTs, approved abatement agreements, and school district participation.",
"Prioritize states with material local options or opt-outs, including NH, NY, RI, MA, TX appraisal-district application workflows, and project-specific zones such as MI RERZ."
],
"safeBehaviorWhenMissing": "Return needs_assessor_review if local adoption, opt-out, waiver, or PILOT status is not confirmed by an official source."
},
{
"workstream": "approved_zone_and_project_specific_incentive_registry",
"cadence": "quarterly_for_program_pages; on_new_board_minutes_or_agreements",
"actions": [
"Create a registry for project-specific incentives with legal description, boundary file, taxpayer or company, approving body, start/end dates, phaseout schedule, affected tax lines, and excluded tax lines.",
"Do not publish user-facing estimates until parcel-in-zone and taxpayer eligibility are confirmed."
],
"safeBehaviorWhenMissing": "Use suppress_until_review until approved documents and parcel-level confirmation are available."
},
{
"workstream": "quality_assurance",
"cadence": "each_ingestion_and_before_user_facing_release",
"actions": [
"Run geometry overlap checks, parcel-to-tax-district join tests, rate outlier detection, duplicate parcel detection, and tax-year consistency checks.",
"Sample official tax bills against calculated outputs for each state and high-volume county.",
"Store audit logs for every derived input and calculation component."
],
"safeBehaviorWhenMissing": "Downgrade estimateConfidence and require tax bill or assessor review when validation fails."
}
]
}

[1]: https://www.revenue.alabama.gov/division/property-tax/?utm_source=chatgpt.com "Property Tax - Alabama Department of Revenue"
[2]: https://www.revenue.alabama.gov/property-tax/property-tax-assessment/?utm_source=chatgpt.com "Property Tax Assessment - Alabama Department of Revenue"
[3]: https://www.commerce.alaska.gov/web/dcra/OfficeoftheStateAssessor?utm_source=chatgpt.com "Office of the State Assessor"
[4]: https://azdor.gov/business/property-tax?utm_source=chatgpt.com "Property Tax | Arizona Department of Revenue"
[5]: https://www.azleg.gov/ars/42/11054.htm "https://www.azleg.gov/ars/42/11054.htm"
[6]: https://www.azleg.gov/ars/42/13056.htm "https://www.azleg.gov/ars/42/13056.htm"
[7]: https://gis.arkansas.gov/category/parcel/?utm_source=chatgpt.com "parcel - Arkansas GIS Office"
[8]: https://www.arcgis.com/home/item.html?id=81960b350dc04284b35046e6a54ed5b2&utm_source=chatgpt.com "Arkansas GIS Office Tax Parcel Viewer - Overview"
[9]: https://www.boe.ca.gov/proptaxes/active-solar-energy-system/ "Active Solar Energy System Exclusion"
[10]: https://www.boe.ca.gov/dataportal/dataset.htm?url=PropTaxGenPropTaxLevies&utm_source=chatgpt.com "Property Tax Allocations (Table 14, 15), Grid View"
[11]: https://geodata.colorado.gov/datasets/colorado-public-parcels/about "https://geodata.colorado.gov/datasets/colorado-public-parcels/about"
[12]: https://treasurer.elpasoco.com/mill-levies/ "https://treasurer.elpasoco.com/mill-levies/"
[13]: https://portal.ct.gov/datapolicy/gis-office/parcel-and-cama "https://portal.ct.gov/datapolicy/gis-office/parcel-and-cama"
[14]: https://geodata.ct.gov/pages/parcels "https://geodata.ct.gov/pages/parcels"
[15]: https://stateplanning.delaware.gov/about/gis-data.shtml?utm_source=chatgpt.com "OSPC - GIS, Demographics, and Data"
[16]: https://www.kentcountyde.gov/Residents/Tax-Credits-Exemptions-Assessment?utm_source=chatgpt.com "Tax Credits, Exemptions & Assessment"
[17]: https://otr.cfo.dc.gov/page/real-property-tax-database-search "https://otr.cfo.dc.gov/page/real-property-tax-database-search"
[18]: https://datahub-dc-dcgis.hub.arcgis.com/pages/lots-in-dc "https://datahub-dc-dcgis.hub.arcgis.com/pages/lots-in-dc"
[19]: https://floridarevenue.com/property/Pages/DataPortal.aspx?utm_source=chatgpt.com "Florida Property Tax Data Portal"
[20]: https://floridarevenue.com/property/Pages/DataPortal_RequestAssessmentRollGISData.aspx?utm_source=chatgpt.com "Request Assessment Roll and GIS Data"
[21]: https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0100-0199%2F0193%2FSections%2F0193.624.html "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&URL=0100-0199%2F0193%2FSections%2F0193.624.html"
[22]: https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&Search_String=&URL=0100-0199%2F0196%2FSections%2F0196.182.html "https://www.leg.state.fl.us/Statutes/index.cfm?App_mode=Display_Statute&Search_String=&URL=0100-0199%2F0196%2FSections%2F0196.182.html"
[23]: https://dor.georgia.gov/local-government-services/digest-compliance/property-tax-millage-rates?utm_source=chatgpt.com "Property Tax Millage Rates | Department of Revenue"
[24]: https://georgiadata.org/depofrevdata?utm_source=chatgpt.com "Department of Revenue Tax Digest Data"
[25]: https://hawaiipropertytax.com/ "https://hawaiipropertytax.com/"
[26]: https://realproperty.honolulu.gov/ "https://realproperty.honolulu.gov/"
[27]: https://www.mauicounty.gov/755/Real-Property-Tax-Rates "https://www.mauicounty.gov/755/Real-Property-Tax-Rates"
[28]: https://tax.idaho.gov/taxes/property/gis/data-maps/parcel-maps/?utm_source=chatgpt.com "County Parcel Maps - Idaho State Tax Commission"
[29]: https://tax.idaho.gov/taxes/property/gis/tax-code-areas/ "https://tax.idaho.gov/taxes/property/gis/tax-code-areas/"
[30]: https://tax.idaho.gov/taxes/property/gis/taxing-districts/ "https://tax.idaho.gov/taxes/property/gis/taxing-districts/"
[31]: https://tax.illinois.gov/research/taxstats/propertytaxstatistics.html "https://tax.illinois.gov/research/taxstats/propertytaxstatistics.html"
[32]: https://www.ilga.gov/legislation/ILCS/details?ActID=596&ActName=Property+Tax+Code.&ChapAct=35+ILCS+200%2F&Chapter=&ChapterID=8&MajorTopic=&Print=True&SeqEnd=30650000&SeqStart=18200000 "https://www.ilga.gov/legislation/ILCS/details?ActID=596&ActName=Property+Tax+Code.&ChapAct=35+ILCS+200%2F&Chapter=&ChapterID=8&MajorTopic=&Print=True&SeqEnd=30650000&SeqStart=18200000"
[33]: https://www.ilga.gov/legislation/ILCS/details?ActID=596&ActName=Property+Tax+Code.&ChapAct=35+ILCS+200%2F&Chapter=&ChapterID=8&MajorTopic=&SeqEnd=38300000&SeqStart=11900000 "https://www.ilga.gov/legislation/ILCS/details?ActID=596&ActName=Property+Tax+Code.&ChapAct=35+ILCS+200%2F&Chapter=&ChapterID=8&MajorTopic=&SeqEnd=38300000&SeqStart=11900000"
[34]: https://www.indianamap.org/datasets/INMap%3A%3Aparcel-boundaries-of-indiana-2025/about?utm_source=chatgpt.com "Parcel Boundaries of Indiana 2025"
[35]: https://www.in.gov/gis/?utm_source=chatgpt.com "GIS: Indiana Geographic Information Office"
[36]: https://geodata.iowa.gov/?utm_source=chatgpt.com "Iowa Geospatial Data Clearinghouse"
[37]: https://revenue.iowa.gov/media/3905/download?inline= "https://revenue.iowa.gov/media/3905/download?inline="
[38]: https://revenue.iowa.gov/taxes/tax-guidance/property-tax/wind-energy-reporting "https://revenue.iowa.gov/taxes/tax-guidance/property-tax/wind-energy-reporting"
[39]: https://www.ksrevenue.gov/pvdindex.html "https://www.ksrevenue.gov/pvdindex.html"
[40]: https://ksopendata.ksrevenue.gov/ "https://ksopendata.ksrevenue.gov/"
[41]: https://revenue.ky.gov/Property/pages/theassessmentprocessforrealproperty.aspx "https://revenue.ky.gov/Property/pages/theassessmentprocessforrealproperty.aspx"
[42]: https://www.latax.la.gov/ "https://www.latax.la.gov/"
[43]: https://maine.hub.arcgis.com/datasets/54cdfff41b214264997d291b76d69886?utm_source=chatgpt.com "Maine Parcels Organized Towns FGDB - ArcGIS Hub Home"
[44]: https://www.maine.gov/revenue/taxes/property-tax/unorganized-territory/tax-maps-valuation-listings?utm_source=chatgpt.com "Tax Maps and Valuation Listings | Maine Revenue Services"
[45]: https://data.imap.maryland.gov/datasets/maryland%3A%3Amaryland-parcel-boundaries/about "Maryland Parcel Boundaries"
[46]: https://dat.maryland.gov/realproperty/Pages/default.aspx?utm_source=chatgpt.com "Real Property"
[47]: https://www.mass.gov/info-details/massgis-data-property-tax-parcels "https://www.mass.gov/info-details/massgis-data-property-tax-parcels"
[48]: https://www.mass.gov/lists/property-tax-data-and-statistics "https://www.mass.gov/lists/property-tax-data-and-statistics"
[49]: https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter59/Section5 "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleIX/Chapter59/Section5"
[50]: https://www.michigan.gov/dtmb/services/maps/mgf-data-hub/boundaries-and-mgf/tax-parcels?utm_source=chatgpt.com "DTMB - Tax Parcels"
[51]: https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf "https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf"
[52]: https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones "https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones"
[53]: https://www.mngeo.state.mn.us/chouse/land_own_property.html?utm_source=chatgpt.com "Minnesota Land Ownership, Detailed"
[54]: https://www.revenue.state.mn.us/solar-energy-production-tax "https://www.revenue.state.mn.us/solar-energy-production-tax"
[55]: https://www.revisor.mn.gov/statutes/cite/272.02 "https://www.revisor.mn.gov/statutes/cite/272.02"
[56]: https://www.dor.ms.gov/centrally-assessed-properties "https://www.dor.ms.gov/centrally-assessed-properties"
[57]: https://www.dor.ms.gov/county-services/property-tax-frequently-asked-questions "https://www.dor.ms.gov/county-services/property-tax-frequently-asked-questions"
[58]: https://stc.mo.gov/ "https://stc.mo.gov/"
[59]: https://stc.mo.gov/definitions/ "https://stc.mo.gov/definitions/"
[60]: https://svc.mt.gov/msl/cadastral/?utm_source=chatgpt.com "Montana Cadastral"
[61]: https://mslservices.mt.gov/geographic_information/data/datalist/datalist_Details.aspx?did=%7B35524afc-669b-4614-9f44-43506ae21a1d%7D&utm_source=chatgpt.com "Montana Cadastral Framework MSDI - MSL Services Dashboard"
[62]: https://svc.mt.gov/dor/oriondataportal/Public/PropertyMTGov/Home.aspx?utm_source=chatgpt.com "Property.MT.Gov"
[63]: https://revenue.nebraska.gov/PAD/county-assessors-and-parcel-search "https://revenue.nebraska.gov/PAD/county-assessors-and-parcel-search"
[64]: https://revenue.nebraska.gov/about/frequently-asked-questions/nebraska-property-assessment-faqs "https://revenue.nebraska.gov/about/frequently-asked-questions/nebraska-property-assessment-faqs"
[65]: https://tax.nv.gov/news-publications/local-government-services-publications/ "https://tax.nv.gov/news-publications/local-government-services-publications/"
[66]: https://www.clarkcountynv.gov/government/assessor/real-property "https://www.clarkcountynv.gov/government/assessor/real-property"
[67]: https://new-hampshire-geodata-portal-1-nhgranit.hub.arcgis.com/datasets/NHGRANIT%3A%3Anh-parcel-mosaic-polygons/about "https://new-hampshire-geodata-portal-1-nhgranit.hub.arcgis.com/datasets/NHGRANIT%3A%3Anh-parcel-mosaic-polygons/about"
[68]: https://www.revenue.nh.gov/about-dra/municipal-and-property-division/property-bureau/equalization "https://www.revenue.nh.gov/about-dra/municipal-and-property-division/property-bureau/equalization"
[69]: https://gc.nh.gov/rsa/html/V/72/72-62.htm "https://gc.nh.gov/rsa/html/V/72/72-62.htm"
[70]: https://nj.gov/njgin/edata/parcels/ "NJ Geographic Information Network | Parcels"
[71]: https://www.nj.gov/treasury/taxation/lpt/statdata.shtml?utm_source=chatgpt.com "NJ Division of Taxation - Statistical Information"
[72]: https://www.nj.gov/treasury/taxation/lpt/lpt-abatements.shtml "https://www.nj.gov/treasury/taxation/lpt/lpt-abatements.shtml"
[73]: https://www.tax.newmexico.gov/about-us/property-tax-division/ "https://www.tax.newmexico.gov/about-us/property-tax-division/"
[74]: https://www.nmdfa.state.nm.us/local-government/budget-finance-bureau/property-taxes/certificates-of-property-tax-rates/ "https://www.nmdfa.state.nm.us/local-government/budget-finance-bureau/property-taxes/certificates-of-property-tax-rates/"
[75]: https://realfile.tax.newmexico.gov/Property%20Tax%20Code.pdf "https://realfile.tax.newmexico.gov/Property%20Tax%20Code.pdf"
[76]: https://data.gis.ny.gov/maps/8af5cef967f8474a9f262684b8908737?utm_source=chatgpt.com "NYS Tax Parcels Public | NYS GIS Clearinghouse Data"
[77]: https://www.tax.ny.gov/research/property/legal/localop/487opt.htm?utm_source=chatgpt.com "RPTL section 487. Exemption for certain energy systems"
[78]: https://www.nconemap.gov/pages/parcels?utm_source=chatgpt.com "NC Parcels"
[79]: https://www.nconemap.gov/datasets/nconemap%3A%3Anorth-carolina-parcels-polygons?utm_source=chatgpt.com "North Carolina Parcels (Polygons)"
[80]: https://www.ncleg.gov/enactedlegislation/statutes/pdf/bysection/chapter_105/gs_105-275.pdf "https://www.ncleg.gov/enactedlegislation/statutes/pdf/bysection/chapter_105/gs_105-275.pdf"
[81]: https://www.tax.nd.gov/property-tax "https://www.tax.nd.gov/property-tax"
[82]: https://www.tax.nd.gov/local-government/property-tax "https://www.tax.nd.gov/local-government/property-tax"
[83]: https://ohioparcels-geohio.hub.arcgis.com/?utm_source=chatgpt.com "Ohio Parcels"
[84]: https://tax.ohio.gov/researcher/tax-data-series?utm_source=chatgpt.com "Ohio Tax Data Series: Historical State and Local Tax Statistics"
[85]: https://tax.ohio.gov/wps/portal/gov/tax/government/school-district-data?utm_source=chatgpt.com "School District Data - Ohio Department of Taxation"
[86]: https://oklahoma.gov/tax/ad-valorem.html "https://oklahoma.gov/tax/ad-valorem.html"
[87]: https://www.oklahomacounty.org/elected-offices/assessor "https://www.oklahomacounty.org/elected-offices/assessor"
[88]: https://ormap.net/?utm_source=chatgpt.com "ORMAP"
[89]: https://www.oregon.gov/dor/gov-research/pages/property_tax_statistics.aspx?utm_source=chatgpt.com "Oregon Property Tax Statistics : Research"
[90]: https://apps.dced.pa.gov/Munstats-public/findmunicipality.aspx "https://apps.dced.pa.gov/Munstats-public/findmunicipality.aspx"
[91]: https://dced.pa.gov/local-government/municipal-statistics/ "https://dced.pa.gov/local-government/municipal-statistics/"
[92]: https://www.waynecountypa.gov/161/Tax-Assessment "https://www.waynecountypa.gov/161/Tax-Assessment"
[93]: https://www.rigis.org/datasets/edc%3A%3Amunicipalities-1997/about "https://www.rigis.org/datasets/edc%3A%3Amunicipalities-1997/about"
[94]: https://municipalfinance.ri.gov/financial-tax-data/tax-rates "https://municipalfinance.ri.gov/financial-tax-data/tax-rates"
[95]: https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm "https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm"
[96]: https://webserver.rilegislature.gov/PublicLaws/law25/law25398.htm "https://webserver.rilegislature.gov/PublicLaws/law25/law25398.htm"
[97]: https://rfa.sc.gov/data-research/local-government/property-tax "https://rfa.sc.gov/data-research/local-government/property-tax"
[98]: https://www.sccounties.org/research-and-topical-information/property-taxes-and-milliage-limitations/property-tax-rates "https://www.sccounties.org/research-and-topical-information/property-taxes-and-milliage-limitations/property-tax-rates"
[99]: https://dor.sd.gov/individuals/taxes/property-tax/ "https://dor.sd.gov/individuals/taxes/property-tax/"
[100]: https://sdproptax.info/ "https://sdproptax.info/"
[101]: https://comptroller.tn.gov/office-functions/pa/gisredistricting/redistricting-and-land-use-maps/parcel-data.html "Parcel Data"
[102]: https://comptroller.tn.gov/office-functions/pa/tax-resources/assessment-information-for-each-county/property-tax-rates.html?utm_source=chatgpt.com "Property Tax Rates - Tennessee Comptroller of the Treasury"
[103]: https://comptroller.tn.gov/office-functions/pa/property-taxes/how-to-figure-your-tax-bill.html?utm_source=chatgpt.com "How to Calculate Your Tax Bill"
[104]: https://comptroller.texas.gov/taxes/property-tax/ "https://comptroller.texas.gov/taxes/property-tax/"
[105]: https://comptroller.texas.gov/taxes/property-tax/rates/ "https://comptroller.texas.gov/taxes/property-tax/rates/"
[106]: https://statutes.capitol.texas.gov/docs/TX/htm/TX.11.htm "https://statutes.capitol.texas.gov/docs/TX/htm/TX.11.htm"
[107]: https://comptroller.texas.gov/forms/50-123.pdf "https://comptroller.texas.gov/forms/50-123.pdf"
[108]: https://parcels.utah.gov/?utm_source=chatgpt.com "Utah State Parcels : Provided by the UGRC"
[109]: https://tax.utah.gov/propertytax/?utm_source=chatgpt.com "Property Tax - Utah State Tax Commission"
[110]: https://opendata.gis.utah.gov/datasets/utah%3A%3Autah-tax-areas-2024/about?utm_source=chatgpt.com "Utah Tax Areas 2024"
[111]: https://maps.vcgi.vermont.gov/gisdata/metadata/CadastralParcels_VTPARCELS.htm "https://maps.vcgi.vermont.gov/gisdata/metadata/CadastralParcels_VTPARCELS.htm"
[112]: https://legislature.vermont.gov/statutes/section/32/215/08701 "https://legislature.vermont.gov/statutes/section/32/215/08701"
[113]: https://legislature.vermont.gov/statutes/section/32/121/03481 "https://legislature.vermont.gov/statutes/section/32/121/03481"
[114]: https://www.tax.virginia.gov/property-tax-and-real-estate-tax-questions?utm_source=chatgpt.com "Property Tax and Real Estate Tax Questions | Virginia Tax"
[115]: https://www.coopercenter.org/virginia-local-tax-rates?utm_source=chatgpt.com "Virginia Local Tax Rates"
[116]: https://geo.wa.gov/maps/2b603a599a0842a3b2284c04c8927f35?utm_source=chatgpt.com "Current Parcels - Washington State Geospatial Open Data Portal"
[117]: https://www.arcgis.com/home/item.html?id=2b603a599a0842a3b2284c04c8927f35&utm_source=chatgpt.com "Current Parcels - Overview"
[118]: https://dor.wa.gov/taxes-rates/gis-data-downloads?utm_source=chatgpt.com "GIS data downloads | Washington Department of Revenue"
[119]: https://www.mapwv.gov/parcel/ "WV Property Viewer"
[120]: https://www.mapwv.gov/assessment/?utm_source=chatgpt.com "Home Page - WV Real Estate Assessment"
[121]: https://maps.sco.wisc.edu/Parcels "Wisconsin Statewide Parcel Map - 2026"
[122]: https://www.sco.wisc.edu/parcels/data/?utm_source=chatgpt.com "Wisconsin Statewide Parcel Map Initiative - Data"
[123]: https://doa.wi.gov/Pages/LocalGovtsGrants/Parcel-Initiative.aspx?utm_source=chatgpt.com "DOA Parcel Initiative - Wisconsin.gov"
[124]: https://wyo-prop-div.wyo.gov/ "https://wyo-prop-div.wyo.gov/"
[125]: https://wyo-prop-div.wyo.gov/residential "https://wyo-prop-div.wyo.gov/residential"
[126]: https://wyo-prop-div.wyo.gov/tax-districts/general-information "https://wyo-prop-div.wyo.gov/tax-districts/general-information"
