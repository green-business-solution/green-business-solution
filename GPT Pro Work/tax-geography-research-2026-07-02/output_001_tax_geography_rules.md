{
"schemaVersion": "retrofi_tax_geography_research_repairs.v1",
"researchedAt": "2026-07-02",
"source": "gpt_pro",
"summary": {
"rulesReviewed": 3,
"rulesWithCalculableDerivedInputs": 2,
"rulesRequiringUserOrProfessionalInput": 3,
"rulesRequiringMoreResearch": 2
},
"rules": [
{
"seedRuleId": "tax_geo_mi_rerz_tax_exemption_workflow_v1",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
"programName": "Renewable Energy Renaissance Zones",
"recommendedAction": "replace_seed_rule",
"sourceConfidence": "medium",
"taxType": "property_income_tax_exemption",
"ruleKind": "approved_zone_tax_exemption_workflow",
"geography": {
"country": "US",
"states": [
"MI"
],
"stateFips": [
"26"
],
"countyFips": [],
"placeGeoids": [],
"municipalities": [],
"specialDistricts": [],
"tracts": [],
"notes": "Michigan geography alone is not sufficient. Renewable Energy Renaissance Zones are approved-zone and company/project-specific, and official sources state that benefits apply only to operations of the designated company within approved geographic boundaries. A server can derive Michigan state jurisdiction from state code/FIPS and can join parcel coordinates to local units, but eligibility requires approved Renaissance Zone designation documents, the zone boundary or legal description, applicable phaseout year, and assessor or program confirmation. No current official statewide GIS boundary layer for Renewable Energy Renaissance Zones was identified."
},
"effectiveStartDate": null,
"effectiveEndDate": null,
"derivedInputs": [
{
"inputKey": "mi_rerz_company_project_specific",
"value": true,
"valueType": "boolean",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "MEDC describes Renewable Energy Renaissance Zones as company-specific and says benefits apply only to operations of the designated company within the geographic boundaries of the zone."
},
{
"inputKey": "mi_rerz_local_unit_approval_required",
"value": true,
"valueType": "boolean",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "MEDC materials state that the city, village, or township in which the proposed zone is located must approve an abatement resolution before the designation can proceed."
},
{
"inputKey": "mi_rerz_tax_categories_potentially_abated",
"value": "State education tax, local personal property taxes, local real property taxes, and local income tax where applicable may be abated for eligible activity in the approved zone, subject to the approved agreement and compliance.",
"valueType": "string",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "MEDC program materials list state education tax, personal property tax, real property tax, and local income tax where applicable as taxes not paid by eligible firms operating in the zone."
},
{
"inputKey": "mi_rerz_taxes_not_exempt",
"value": "Federal taxes, local bond obligations, school sinking fund obligations, special assessments, sales tax, and use tax are not exempt; Michigan Corporate Income Tax is not eligible for Renaissance Zone abatement under the annual report description.",
"valueType": "string",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "MEDC annual report and fact sheet state that federal taxes, local bond obligations, school sinking fund obligations, special assessments, sales tax, and use tax remain due, and the annual report states the Corporate Income Tax is not eligible."
},
{
"inputKey": "mi_rerz_phaseout_schedule",
"value": "Benefits are phased out in 25 percent increments during the final three years of the zone designation; ESA guidance uses 100 percent reduction during full exemption and then 75 percent, 50 percent, and 25 percent reduction in the final three years.",
"valueType": "string",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "MEDC materials state the tax benefits are phased out 25 percent during each of the final three years. Michigan Treasury ESA guidance shows Renaissance Zone multipliers of 0.00, 0.25, 0.50, and 0.75 by remaining years."
},
{
"inputKey": "mi_rerz_2024_program_framework_changed",
"value": true,
"valueType": "boolean",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "medium",
"evidenceText": "Michigan Public Act 40 of 2024 modified Renaissance Zone designation provisions, and MEDC reported that the MSF Board approved updated Renaissance Zone Program Amendment Guidelines in 2024."
}
],
"requiredUserInputs": [
{
"inputKey": "approved_rz_designation_or_development_agreement",
"label": "Approved Renaissance Zone designation, agreement, certificate, or legal description",
"reason": "Eligibility is tied to an approved zone and company/project-specific boundaries, not to a general statewide county, ZIP, tract, or municipal rule.",
"sourceStrategy": "approved_program_document",
"uiPlacement": "admin_only"
},
{
"inputKey": "parcel_or_facility_within_approved_zone_boundary",
"label": "Assessor or program confirmation that the project parcel/facility is inside the approved zone boundary",
"reason": "No official current statewide Renewable Energy Renaissance Zone GIS boundary dataset was identified; parcel-level boundary confirmation is required.",
"sourceStrategy": "assessor_confirmation",
"uiPlacement": "property_tax_profile"
},
{
"inputKey": "taxpayer_eligibility_and_compliance_status",
"label": "Taxpayer eligibility and compliance status",
"reason": "Program benefits require compliance with agreement terms and, for income-tax deductions, tax filing and delinquency conditions that cannot be derived from geography.",
"sourceStrategy": "tax_return_or_accountant",
"uiPlacement": "tax_profile"
},
{
"inputKey": "zone_final_year_and_phaseout_year",
"label": "Approved zone duration and current phaseout year",
"reason": "The abatement percentage depends on the zone-specific approved duration and whether the zone is in one of the final three phaseout years.",
"sourceStrategy": "approved_program_document",
"uiPlacement": "admin_only"
},
{
"inputKey": "actual_abated_tax_lines",
"label": "Property tax bill, ESA statement, and local income-tax documentation showing abated and non-abated lines",
"reason": "Excluded taxes and millages remain due and may vary by parcel, local unit, debt levy, school sinking fund, special assessment, and taxpayer status.",
"sourceStrategy": "property_tax_bill",
"uiPlacement": "property_tax_profile"
}
],
"serverDerivableInputs": [
{
"inputKey": "state_code",
"sourceGeographyField": "stateCode",
"notes": "Derive Michigan jurisdiction from normalized state code MI."
},
{
"inputKey": "state_fips",
"sourceGeographyField": "stateFips",
"notes": "Derive Michigan FIPS 26 for routing to the Michigan Renaissance Zone workflow."
},
{
"inputKey": "local_unit_candidate",
"sourceGeographyField": "coordinates",
"notes": "Use coordinates to identify the likely city, village, or township and assessor jurisdiction for workflow routing only; do not infer zone eligibility from this alone."
},
{
"inputKey": "parcel_county_candidate",
"sourceGeographyField": "countyFips",
"notes": "Use county FIPS for assessor routing and document search only; county alone does not establish Renaissance Zone eligibility."
}
],
"localityMatters": true,
"localityExplanation": "Locality matters because local units must consent and because property tax, local income tax, debt millages, school sinking funds, special assessments, and assessor treatment vary by parcel and local taxing jurisdiction. However, ordinary geographic identifiers cannot safely determine eligibility without the approved zone documents and assessor/program confirmation.",
"calculationImpact": {
"canCalculateWithoutUserTaxData": false,
"canCalculateWithGeographyOnly": false,
"canCalculateWithOfficialLocalDataset": false,
"canCalculateWithUserTaxBill": false,
"recommendedEstimateStatus": "needs_assessor_review"
},
"sourceUrls": [
"[https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/cy2023-renaissance-zone-annual-report.pdf](https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/cy2023-renaissance-zone-annual-report.pdf)",
"[https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones](https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones)",
"[https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/Forms/IIT/TY2025/MI-1040-Book.pdf](https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/Forms/IIT/TY2025/MI-1040-Book.pdf)",
"[https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf](https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf)",
"[https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/cy-2024-msf-specific-policy-change-report.pdf](https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/cy-2024-msf-specific-policy-change-report.pdf)",
"[https://legislature.michigan.gov/documents/2023-2024/publicact/htm/2024-PA-0040.htm](https://legislature.michigan.gov/documents/2023-2024/publicact/htm/2024-PA-0040.htm)",
"[https://www.michiganbusiness.org/globalassets/documents/msf-board/meeting-minutes/msf-meeting-minutes-july-9-2024---final-approved.pdf](https://www.michiganbusiness.org/globalassets/documents/msf-board/meeting-minutes/msf-meeting-minutes-july-9-2024---final-approved.pdf)",
"[https://www.michiganbusiness.org/about-medc/michigan-strategic-fund/](https://www.michiganbusiness.org/about-medc/michigan-strategic-fund/)"
],
"evidenceText": "Official MEDC and Michigan Treasury sources show that Renewable Energy Renaissance Zone benefits are approved-zone and company/project-specific, can include abatement of property taxes and local income tax where applicable, exclude sales/use tax and several local obligations, and phase out during the final three years. The Michigan tax return instructions require assessor approval for Renaissance Zone income-tax deduction treatment. PA 40 of 2024 and MSF 2024 materials indicate the Renaissance Zone framework was amended, so current approved documents are necessary for active-zone records.",
"reasoningNotes": "Replace any simple geography-only rule with an approved-zone workflow. Store MI state-level routing, candidate county/local unit, approved zone identifier, approved boundary artifact, legal description, parcel intersection evidence, designated company, agreement dates, phaseout year, and assessor confirmation. Do not calculate a benefit from ZIP, tract, municipality, or county alone. Treat historical DSIRE program ID as a pointer to a workflow, not as a deterministic boundary dataset."
},
{
"seedRuleId": "tax_geo_ri_renewable_property_tax_local_assessor_workflow_v1",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
"programName": "Renewable Energy Tax Valuation",
"recommendedAction": "replace_seed_rule",
"sourceConfidence": "high",
"taxType": "property_tax",
"ruleKind": "local_assessor_workflow",
"geography": {
"country": "US",
"states": [
"RI"
],
"stateFips": [
"44"
],
"countyFips": [],
"placeGeoids": [],
"municipalities": [],
"specialDistricts": [],
"tracts": [],
"notes": "Rhode Island has statewide statutory valuation/tax caps for renewable energy resources and associated equipment, but municipal assessor jurisdiction still matters for assessment administration and local ordinance waivers. Geography can identify Rhode Island and the likely city/town assessor from coordinates or municipal boundary joins. Geography cannot determine AC nameplate capacity, residential/manufacturer/commercial classification, interconnection status, program enrollment, pre-2017 agreement status, farmland reclassification status, or whether a municipality has adopted a current waiver ordinance unless RetroFi maintains a reviewed municipal ordinance dataset."
},
"effectiveStartDate": "2025-07-02",
"effectiveEndDate": null,
"derivedInputs": [
{
"inputKey": "ri_tangible_renewable_tax_rate_per_kw_ac",
"value": 5,
"valueType": "number",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "R.I. Gen. Laws § 44-5-3(c) states that cities and towns shall only tax renewable energy resources and associated equipment at $5.00 per kilowatt of AC nameplate capacity for tangible property."
},
{
"inputKey": "ri_real_property_renewable_tax_rate_per_kw_ac",
"value": 3.5,
"valueType": "number",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "R.I. Gen. Laws § 44-5-12(a)(5) states that real property on which renewable energy resources are located shall only be taxed at $3.50 per kilowatt of AC nameplate capacity, subject to the statute's conditions."
},
{
"inputKey": "ri_residential_renewable_system_exemption_available",
"value": true,
"valueType": "boolean",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "R.I. Gen. Laws § 44-3-3(a)(48) exempts renewable energy resources used in residential systems and associated equipment in service after December 31, 2015."
},
{
"inputKey": "ri_manufacturer_renewable_system_exemption_available",
"value": true,
"valueType": "boolean",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "R.I. Gen. Laws § 44-3-3(a)(49) exempts renewable energy resources employed by a manufacturer."
},
{
"inputKey": "ri_municipal_waiver_option_exists",
"value": true,
"valueType": "boolean",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "R.I. Gen. Laws § 44-3-21 authorizes city or town councils by ordinance to exempt renewable energy systems from taxation, and OER regulations describe municipal waiver options for commercial or net-metered systems."
},
{
"inputKey": "ri_standard_ad_valorem_millage_required_for_statutory_kw_components",
"value": false,
"valueType": "boolean",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "The current Rhode Island statutes express the renewable energy resource/equipment and associated real-property treatment as dollar amounts per AC kilowatt, rather than as ordinary assessed value multiplied by a municipal tax rate."
}
],
"requiredUserInputs": [
{
"inputKey": "ac_nameplate_capacity_kw",
"label": "AC nameplate capacity in kilowatts",
"reason": "The statutory Rhode Island calculation uses AC nameplate capacity; this is a project/equipment attribute, not a geography attribute.",
"sourceStrategy": "user_input",
"uiPlacement": "property_tax_profile"
},
{
"inputKey": "system_use_and_tax_classification",
"label": "Residential, manufacturer-employed, commercial, net-metered, virtual net-metered, or other classification",
"reason": "Residential systems and manufacturer-employed resources may be exempt, while commercial systems may follow the statutory kW treatment or a municipal waiver; classification cannot be derived from geography.",
"sourceStrategy": "assessor_confirmation",
"uiPlacement": "property_tax_profile"
},
{
"inputKey": "local_ordinance_or_waiver_status",
"label": "Current city/town ordinance or waiver status",
"reason": "Municipalities may waive taxation by ordinance, and no complete current official statewide municipal waiver dataset was identified.",
"sourceStrategy": "official_dataset_refresh",
"uiPlacement": "admin_only"
},
{
"inputKey": "interconnection_and_program_documents",
"label": "Interconnection application/agreement and REG, net-metering, or virtual net-metering enrollment documents",
"reason": "OER regulations require commercial systems to provide these documents to the municipality or assessor, and pre-2017 interconnection agreements may retain prior tax status unless otherwise agreed.",
"sourceStrategy": "approved_program_document",
"uiPlacement": "property_tax_profile"
},
{
"inputKey": "assessor_or_tax_bill_confirmation",
"label": "Municipal assessor confirmation or current tax bill",
"reason": "Assessment administration is municipal; assessor confirmation is needed to verify actual treatment, exemptions, any local waiver, and any noncovered property-tax components.",
"sourceStrategy": "assessor_confirmation",
"uiPlacement": "property_tax_profile"
},
{
"inputKey": "farmland_forest_open_space_reclassification_status",
"label": "Farmland, forest, open-space, or renewable-energy-system reclassification status",
"reason": "The current real-property statute references the farmland reclassification exemption, which cannot be inferred safely from city/town geography alone.",
"sourceStrategy": "assessor_confirmation",
"uiPlacement": "property_tax_profile"
}
],
"serverDerivableInputs": [
{
"inputKey": "state_code",
"sourceGeographyField": "stateCode",
"notes": "Derive Rhode Island jurisdiction from normalized state code RI."
},
{
"inputKey": "state_fips",
"sourceGeographyField": "stateFips",
"notes": "Derive Rhode Island FIPS 44 for routing to the Rhode Island renewable property-tax workflow."
},
{
"inputKey": "municipal_assessor_jurisdiction",
"sourceGeographyField": "coordinates",
"notes": "Use coordinates joined to an official Rhode Island municipal boundary layer to identify the city or town assessor jurisdiction."
},
{
"inputKey": "place_name",
"sourceGeographyField": "placeName",
"notes": "Use as a display/search key for municipal ordinance lookup, but do not rely on place name alone where place and taxing municipality differ."
}
],
"localityMatters": true,
"localityExplanation": "Locality matters for municipal assessment administration and possible city/town ordinance waivers. The statewide statutory dollar-per-kW values are not ordinary municipal millage calculations, but the relevant assessor, local waiver status, documentation process, and actual bill treatment are local.",
"calculationImpact": {
"canCalculateWithoutUserTaxData": false,
"canCalculateWithGeographyOnly": false,
"canCalculateWithOfficialLocalDataset": false,
"canCalculateWithUserTaxBill": false,
"recommendedEstimateStatus": "needs_assessor_review"
},
"sourceUrls": [
"[https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-3.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-3.htm)",
"[https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm)",
"[https://webserver.rilegislature.gov/Statutes/TITLE44/44-3/44-3-3.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-3/44-3-3.htm)",
"[https://webserver.rilegislature.gov/Statutes/TITLE44/44-3/44-3-21.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-3/44-3-21.htm)",
"[https://rules.sos.ri.gov/regulations/part/300-00-00-2](https://rules.sos.ri.gov/regulations/part/300-00-00-2)",
"[https://energy.ri.gov/renewable-energy/solar](https://energy.ri.gov/renewable-energy/solar)",
"[https://planning.ri.gov/planning-areas/data-center/rhode-island-geographic-information-system-rigis](https://planning.ri.gov/planning-areas/data-center/rhode-island-geographic-information-system-rigis)",
"[https://www.rigis.org/datasets/edc%3A%3Amunicipalities-1997/about](https://www.rigis.org/datasets/edc%3A%3Amunicipalities-1997/about)",
"[https://www.arcgis.com/sharing/rest/content/items/9993ee194a024b21bfa6ae286de0d1f6/info/metadata/metadata.xml?format=default&output=html](https://www.arcgis.com/sharing/rest/content/items/9993ee194a024b21bfa6ae286de0d1f6/info/metadata/metadata.xml?format=default&output=html)"
],
"evidenceText": "Current Rhode Island law sets renewable energy resources and associated tangible equipment at $5.00 per AC kW and real property on which renewable resources are located at $3.50 per AC kW, with residential and manufacturer-employed systems separately exempt. OER regulations describe the statewide commercial-system formula, municipal waiver option, and required interconnection/program documentation. Municipal boundaries are available from RIGIS for assessor routing, but ordinance status and project classification require local review or user/assessor documentation.",
"reasoningNotes": "Replace any rule that asks for ordinary property tax millage as the primary formula input. Store state FIPS 44, municipal assessor jurisdiction, parcel/coordinates, AC kW, system classification, exemption category, local waiver ordinance status, and assessor confirmation. Build a separate reviewed municipal ordinance table if RetroFi wants to improve determinism. Do not infer ordinance waiver status from municipality name unless that table has been reviewed and refreshed."
},
{
"seedRuleId": "tax_geo_wa_solar_manufacturing_bo_preferential_rate_2026_v1",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
"programName": "Tax Abatement for Solar Manufacturers",
"recommendedAction": "replace_seed_rule",
"sourceConfidence": "high",
"taxType": "business_and_occupation_tax",
"ruleKind": "state_tax_rate_preference",
"geography": {
"country": "US",
"states": [
"WA"
],
"stateFips": [
"53"
],
"countyFips": [],
"placeGeoids": [],
"municipalities": [],
"specialDistricts": [],
"tracts": [],
"notes": "This is a Washington state B&O tax classification and rate preference. Geography can route taxpayers with Washington taxable activity to the state-level workflow, but county, city, ZIP, tract, and parcel geography do not change the state preferential B&O rate under RCW 82.04.294. Local city B&O taxes, if any, are separate local tax issues and should not be included in this state opportunity unless RetroFi adds a separate city B&O module."
},
"effectiveStartDate": null,
"effectiveEndDate": "2032-07-01",
"derivedInputs": [
{
"inputKey": "wa_solar_manufacturing_preferential_bo_rate",
"value": 0.00275,
"valueType": "number",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "RCW 82.04.294 taxes qualifying manufacturers, processors for hire, and manufacturer-wholesalers of solar energy systems and components at 0.275 percent."
},
{
"inputKey": "wa_solar_manufacturing_preference_expiration_date",
"value": "2032-07-01",
"valueType": "date",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "RCW 82.04.294 is titled as expiring July 1, 2032, and the Department of Revenue manufacturing guide states that the preferential rate expires July 1, 2032."
},
{
"inputKey": "wa_solar_qualifying_activities",
"value": "Manufacturing or processing for hire of solar energy systems using photovoltaic modules or stirling converters; manufacturing solar grade silicon, silicon solar wafers, silicon solar cells, thin film solar devices, or compound semiconductor solar wafers used exclusively in solar energy system components; and wholesale sales by the manufacturer of qualifying solar energy systems or components.",
"valueType": "string",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "RCW 82.04.294 lists qualifying manufacturing, processing for hire, and wholesale-sales activities and defines solar energy systems and components."
},
{
"inputKey": "wa_solar_annual_tax_performance_report_required",
"value": true,
"valueType": "boolean",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "RCW 82.04.294 requires businesses claiming the preferential rate to file the annual tax performance report under RCW 82.32.534; DOR states the report is due May 31 following a year in which the rate is claimed."
},
{
"inputKey": "wa_solar_preference_application_required",
"value": false,
"valueType": "boolean",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "The Washington Department of Revenue tax incentive program table lists no application for the solar manufacturers reduced B&O rate."
},
{
"inputKey": "wa_standard_manufacturing_bo_rate_until_2027",
"value": 0.00484,
"valueType": "number",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "RCW 82.04.240 states that the general manufacturing B&O rate is 0.484 percent until January 1, 2027."
},
{
"inputKey": "wa_standard_manufacturing_bo_rate_from_2027",
"value": 0.005,
"valueType": "number",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "RCW 82.04.240 states that the general manufacturing B&O rate is 0.5 percent beginning January 1, 2027."
},
{
"inputKey": "wa_standard_wholesaling_bo_rate_until_2027",
"value": 0.00484,
"valueType": "number",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "RCW 82.04.270 states that the wholesaling B&O rate is 0.484 percent until January 1, 2027."
},
{
"inputKey": "wa_standard_wholesaling_bo_rate_from_2027",
"value": 0.005,
"valueType": "number",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "RCW 82.04.270 states that the wholesaling B&O rate is 0.5 percent beginning January 1, 2027."
},
{
"inputKey": "wa_solar_preference_locality_affects_state_rate",
"value": false,
"valueType": "boolean",
"source": "official_source",
"userOverrideAllowed": false,
"confidence": "high",
"evidenceText": "The official sources describe the preference as a Washington state B&O classification and rate; no county or municipal variation is specified for the state rate."
}
],
"requiredUserInputs": [
{
"inputKey": "qualifying_activity_and_product_confirmation",
"label": "Confirmation that the business activity and product are qualifying solar manufacturing, processing for hire, or manufacturer wholesale activity",
"reason": "Eligibility depends on the taxpayer's actual activities and product/component definitions, not on location alone.",
"sourceStrategy": "tax_return_or_accountant",
"uiPlacement": "organization_profile"
},
{
"inputKey": "gross_receipts_by_bo_classification",
"label": "Washington gross receipts by B&O tax classification",
"reason": "The benefit calculation requires actual taxable amounts reported under manufacturing, processing for hire, wholesaling, retailing, or other classifications.",
"sourceStrategy": "tax_return_or_accountant",
"uiPlacement": "tax_profile"
},
{
"inputKey": "deductions_and_interstate_foreign_sales",
"label": "Applicable deductions, including interstate or foreign sales deductions",
"reason": "DOR guidance notes that deductions may apply for products delivered outside Washington, and deductions depend on transaction facts.",
"sourceStrategy": "tax_return_or_accountant",
"uiPlacement": "tax_profile"
},
{
"inputKey": "multiple_activities_tax_credit_treatment",
"label": "Multiple Activities Tax Credit treatment",
"reason": "Businesses performing more than one taxable activity for the same product may need MATC so B&O tax is paid once; this depends on the taxpayer's filing facts and taxes paid.",
"sourceStrategy": "tax_return_or_accountant",
"uiPlacement": "tax_profile"
},
{
"inputKey": "annual_tax_performance_report_status",
"label": "Annual Tax Performance Report filing status",
"reason": "The preferential rate requires an annual tax performance report, and late filing can create repayment liability.",
"sourceStrategy": "tax_return_or_accountant",
"uiPlacement": "tax_profile"
},
{
"inputKey": "claim_year_or_tax_period",
"label": "Claim year or tax period",
"reason": "The ordinary comparison rates change on January 1, 2027 and the preference expires July 1, 2032, so the relevant period is required.",
"sourceStrategy": "tax_return_or_accountant",
"uiPlacement": "tax_profile"
}
],
"serverDerivableInputs": [
{
"inputKey": "state_code",
"sourceGeographyField": "stateCode",
"notes": "Derive Washington jurisdiction from normalized state code WA."
},
{
"inputKey": "state_fips",
"sourceGeographyField": "stateFips",
"notes": "Derive Washington FIPS 53 for routing to the Washington B&O workflow."
}
],
"localityMatters": false,
"localityExplanation": "County, city, parcel, tract, and ZIP geography do not alter the Washington state solar manufacturing B&O preferential rate. Locality may matter for separate local business taxes or siting facts, but those are outside this state B&O preference record.",
"calculationImpact": {
"canCalculateWithoutUserTaxData": false,
"canCalculateWithGeographyOnly": false,
"canCalculateWithOfficialLocalDataset": false,
"canCalculateWithUserTaxBill": false,
"recommendedEstimateStatus": "needs_accountant_review"
},
"sourceUrls": [
"[https://apps.leg.wa.gov/rcw/default.aspx?cite=82.04.294](https://apps.leg.wa.gov/rcw/default.aspx?cite=82.04.294)",
"[https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems](https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems)",
"[https://dor.wa.gov/taxes-rates/tax-incentives/tax-incentive-programs](https://dor.wa.gov/taxes-rates/tax-incentives/tax-incentive-programs)",
"[https://apps.leg.wa.gov/rcw/default.aspx?cite=82.32.534](https://apps.leg.wa.gov/rcw/default.aspx?cite=82.32.534)",
"[https://dor.wa.gov/education/industry-guides/manufacturing-guide/multiple-activities-tax-credit-matc](https://dor.wa.gov/education/industry-guides/manufacturing-guide/multiple-activities-tax-credit-matc)",
"[https://apps.leg.wa.gov/rcw/default.aspx?cite=82.04.240](https://apps.leg.wa.gov/rcw/default.aspx?cite=82.04.240)",
"[https://app.leg.wa.gov/rcw/default.aspx?cite=82.04.270](https://app.leg.wa.gov/rcw/default.aspx?cite=82.04.270)"
],
"evidenceText": "Washington RCW 82.04.294 currently provides a 0.275 percent B&O rate for qualifying solar energy system and component manufacturing, processing for hire, and manufacturer wholesale sales, and the provision expires July 1, 2032. DOR guidance confirms no application is required, annual tax performance reporting is required by May 31 after a claim year, retail consumer sales are not under this preferential manufacturing/wholesaling classification, and MATC/deductions may affect actual filing. State ordinary manufacturing and wholesaling rates are 0.484 percent until January 1, 2027 and 0.5 percent beginning January 1, 2027 under RCW 82.04.240 and RCW 82.04.270.",
"reasoningNotes": "Replace the seed if it uses a 2027 sunset or locality-based logic. Store a state-level WA rule with effective end date July 1, 2032, preferential rate 0.00275, ordinary comparison rates by period, and required taxpayer filing inputs. Do not use county/city/ZIP to change the state B&O rate. Any city B&O issue should be modeled separately."
}
],
"databaseRecommendations": {
"officialDatasetsToDownloadOrReference": [
{
"name": "Michigan Renaissance Zone annual reports and MSF board amendment materials",
"jurisdiction": "Michigan Economic Development Corporation and Michigan Strategic Fund",
"datasetType": "forms_instructions",
"url": "[https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/cy2023-renaissance-zone-annual-report.pdf](https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/cy2023-renaissance-zone-annual-report.pdf)",
"refreshFrequency": "annual",
"useInRetroFi": "Use for program status, active/available zone counts, category changes, excluded taxes, phaseout language, and human-review queues for approved-zone records."
},
{
"name": "Michigan Treasury Renaissance Zone ESA guidance",
"jurisdiction": "Michigan Department of Treasury",
"datasetType": "forms_instructions",
"url": "[https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones](https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones)",
"refreshFrequency": "annual",
"useInRetroFi": "Use to validate excluded millages and ESA phaseout percentage treatment for personal property in Renaissance Zones."
},
{
"name": "Michigan MI-1040 Renaissance Zone deduction instructions",
"jurisdiction": "Michigan Department of Treasury",
"datasetType": "forms_instructions",
"url": "[https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/Forms/IIT/TY2025/MI-1040-Book.pdf](https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/Forms/IIT/TY2025/MI-1040-Book.pdf)",
"refreshFrequency": "annual",
"useInRetroFi": "Use to keep individual income-tax deduction workflow current and to confirm assessor approval and taxpayer compliance input requirements."
},
{
"name": "Rhode Island municipal boundaries",
"jurisdiction": "Rhode Island Geographic Information System",
"datasetType": "municipal_boundaries",
"url": "[https://www.rigis.org/datasets/edc%3A%3Amunicipalities-1997/about](https://www.rigis.org/datasets/edc%3A%3Amunicipalities-1997/about)",
"refreshFrequency": "on_change",
"useInRetroFi": "Join project coordinates or parcels to Rhode Island city/town assessor jurisdictions for renewable property-tax workflow routing."
},
{
"name": "Rhode Island renewable property tax statutes",
"jurisdiction": "Rhode Island General Assembly",
"datasetType": "statute_rules",
"url": "[https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-3.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-3.htm)",
"refreshFrequency": "quarterly",
"useInRetroFi": "Monitor statutory dollar-per-kW values, effective dates, exemptions, and amendments for tangible renewable energy resources."
},
{
"name": "Rhode Island renewable real-property valuation statute",
"jurisdiction": "Rhode Island General Assembly",
"datasetType": "statute_rules",
"url": "[https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm)",
"refreshFrequency": "quarterly",
"useInRetroFi": "Monitor the $3.50 per AC kW real-property rule and related reclassification conditions."
},
{
"name": "Rhode Island OER renewable energy tax regulation",
"jurisdiction": "Rhode Island Office of Energy Resources and Secretary of State",
"datasetType": "statute_rules",
"url": "[https://rules.sos.ri.gov/regulations/part/300-00-00-2](https://rules.sos.ri.gov/regulations/part/300-00-00-2)",
"refreshFrequency": "quarterly",
"useInRetroFi": "Use for commercial-system documentation requirements, municipal waiver logic, and project classification workflow."
},
{
"name": "Rhode Island municipal renewable-energy ordinance waiver table",
"jurisdiction": "RetroFi-reviewed municipal ordinance collection",
"datasetType": "other",
"url": "[https://webserver.rilegislature.gov/Statutes/TITLE44/44-3/44-3-21.htm](https://webserver.rilegislature.gov/Statutes/TITLE44/44-3/44-3-21.htm)",
"refreshFrequency": "quarterly",
"useInRetroFi": "Create and maintain a reviewed table of city/town ordinances that waive renewable energy system taxation; no complete official statewide table was identified."
},
{
"name": "Washington RCW 82.04.294 solar manufacturing B&O preference",
"jurisdiction": "Washington State Legislature",
"datasetType": "statute_rules",
"url": "[https://apps.leg.wa.gov/rcw/default.aspx?cite=82.04.294](https://apps.leg.wa.gov/rcw/default.aspx?cite=82.04.294)",
"refreshFrequency": "quarterly",
"useInRetroFi": "Use as the authoritative rate, qualifying activity, reporting requirement, and expiration source for the Washington state solar manufacturing B&O preference."
},
{
"name": "Washington DOR solar manufacturing guide",
"jurisdiction": "Washington Department of Revenue",
"datasetType": "forms_instructions",
"url": "[https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems](https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems)",
"refreshFrequency": "quarterly",
"useInRetroFi": "Use for implementation details on classification, retail sales exclusion, deductions, MATC, annual reporting, and expiration."
},
{
"name": "Washington B&O standard manufacturing and wholesaling rates",
"jurisdiction": "Washington State Legislature",
"datasetType": "statute_rules",
"url": "[https://apps.leg.wa.gov/rcw/default.aspx?cite=82.04.240](https://apps.leg.wa.gov/rcw/default.aspx?cite=82.04.240)",
"refreshFrequency": "quarterly",
"useInRetroFi": "Use with RCW 82.04.270 to compute ordinary comparison rates for accountant-reviewed estimates by tax period."
}
],
"cronRefreshPlan": [
"Quarterly: check Washington RCW 82.04.294, RCW 82.04.240, RCW 82.04.270, DOR solar manufacturing guide, and DOR tax incentive table for rate, expiration, reporting, and classification changes.",
"Quarterly: check Rhode Island statutes §§ 44-5-3, 44-5-12, 44-3-3, and 44-3-21 plus OER regulation 300-RICR-00-00-2 for statutory dollar-per-kW, exemption, and municipal waiver changes.",
"Quarterly: refresh Rhode Island RIGIS municipal boundary metadata and rebuild municipality/assessor jurisdiction joins used for coordinates-to-city-or-town routing.",
"Quarterly or on municipal update: review Rhode Island city/town ordinance sources for renewable energy system waiver ordinances and store effective date, ordinance citation, system classes covered, and reviewer timestamp.",
"Annual: refresh Michigan Renaissance Zone annual reports, Michigan Treasury ESA guidance, and MI-1040 instructions for excluded taxes, phaseout treatment, active zone status, and income-tax workflow requirements.",
"On Michigan legislative or MSF board changes: review Public Act amendments, MSF board minutes, and MSF Renaissance Zone amendment guidelines for active Renewable Energy Renaissance Zone treatment and whether any official boundary artifacts become available.",
"For any approved Michigan zone added to the database: require admin upload or citation of approved boundary/legal description, designated company, local-unit resolution, agreement dates, phaseout schedule, and assessor confirmation before enabling any estimate."
],
"openQuestionsForHuman": [
"Does MEDC or MSF maintain a nonpublic or requestable GIS/legal-description dataset for active and legacy Renewable Energy Renaissance Zones after Public Act 40 of 2024, and can RetroFi license or periodically request it?",
"For Michigan RERZ records, which currently active or legacy zones remain relevant to RetroFi users, and should inactive/expired zones be archived or retained for historical tax-year analysis?",
"For Rhode Island, can OER, Division of Municipal Finance, or a municipal assessor association provide a centralized list of municipalities that have enacted renewable-energy tax waiver ordinances under § 44-3-21?",
"For Rhode Island, how should RetroFi handle projects with interconnection agreements executed by December 31, 2016 that retain prior tax status unless otherwise agreed?",
"For Rhode Island, should the product produce only assessor-review workflow outputs, or may it produce a nonbinding arithmetic estimate when the user provides AC kW, classification, municipal waiver status, and assessor confirmation?",
"For Washington, confirm whether RetroFi wants to model only the state B&O preference or also create separate city-level B&O records for municipalities that impose local gross-receipts taxes.",
"For Washington, confirm whether the ordinary comparison should compare against only general manufacturing/wholesaling rates or also against alternate classifications for retail consumer sales, processing for hire, or other taxpayer-specific activity mixes."
]
}
}

