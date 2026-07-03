You are helping RetroFi create realistic synthetic tax-document fixtures for sample test cases.

Task: Create synthetic tax documents and tax-profile extracted values for sample profiles 11-20.
Research date: 2026-07-03
Batch number: 2

Important constraints:
- These are synthetic test fixtures, not real confidential tax documents.
- Values should be realistic for the profile's location, organization type, building type, size, and utility profile, but they must be marked synthetic.
- Do not claim the synthetic values came from real public documents.
- Use public/official tax rules only to shape plausible fields and document types.
- Do not overfit to a tax incentive. Include the documents a real user would likely upload so RetroFi can later calculate or review tax effects.
- Minimize user input by pre-populating values that a tax document could plausibly provide, but mark every value with sourceType = "synthetic_tax_document".
- If a value would normally require accountant or assessor confirmation, include it as a review item rather than a trusted final answer.
- Return JSON only. No markdown outside the JSON object.

Current RetroFi tax geography rules:
```json
[
  {
    "id": "tax_geo_wa_solar_manufacturing_bo_preferential_rate_2026_v1",
    "version": 2,
    "active": true,
    "taxType": "business_and_occupation_tax",
    "ruleKind": "state_tax_rate_preference",
    "geography": {
      "country": "US",
      "state": "WA",
      "stateFips": "53",
      "notes": "Washington state B&O tax classification and rate preference. County, city, ZIP, tract, and parcel geography do not change the state preferential B&O rate under RCW 82.04.294. Local city B&O taxes, if any, are separate local tax issues and should not be included in this state opportunity unless RetroFi adds a separate city B&O module."
    },
    "opportunityIds": [
      "SOURCE_DSIRE:dsire_program_id:381"
    ],
    "effectiveStartDate": null,
    "effectiveEndDate": "2032-07-01",
    "sourceConfidence": "high",
    "localityMatters": false,
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
        "inputKey": "preferential_solar_b_and_o_rate_decimal",
        "value": 0.00275,
        "valueType": "number",
        "source": "official_source",
        "userOverrideAllowed": false,
        "confidence": "high",
        "evidenceText": "Legacy v2-package alias for the same Washington solar manufacturing preferential B&O rate."
      },
      {
        "inputKey": "wa_solar_manufacturing_preference_expiration_date",
        "value": "2032-07-01",
        "valueType": "date",
        "source": "official_source",
        "userOverrideAllowed": false,
        "confidence": "high",
        "evidenceText": "RCW 82.04.294 and Washington Department of Revenue guidance identify July 1, 2032 as the preference expiration."
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
        "evidenceText": "RCW 82.04.294 requires businesses claiming the preferential rate to file the annual tax performance report under RCW 82.32.534."
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
        "userOverrideAllowed": true,
        "confidence": "high",
        "evidenceText": "RCW 82.04.240 states that the general manufacturing B&O rate is 0.484 percent until January 1, 2027."
      },
      {
        "inputKey": "wa_standard_manufacturing_bo_rate_from_2027",
        "value": 0.005,
        "valueType": "number",
        "source": "official_source",
        "userOverrideAllowed": true,
        "confidence": "high",
        "evidenceText": "RCW 82.04.240 states that the general manufacturing B&O rate is 0.5 percent beginning January 1, 2027."
      },
      {
        "inputKey": "wa_standard_wholesaling_bo_rate_until_2027",
        "value": 0.00484,
        "valueType": "number",
        "source": "official_source",
        "userOverrideAllowed": true,
        "confidence": "high",
        "evidenceText": "RCW 82.04.270 states that the wholesaling B&O rate is 0.484 percent until January 1, 2027."
      },
      {
        "inputKey": "wa_standard_wholesaling_bo_rate_from_2027",
        "value": 0.005,
        "valueType": "number",
        "source": "official_source",
        "userOverrideAllowed": true,
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
        "reason": "Eligibility depends on the taxpayer's actual activities and product or component definitions, not on location alone.",
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
        "reason": "Washington DOR guidance notes that deductions may apply for products delivered outside Washington, and deductions depend on transaction facts.",
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
    "calculationImpact": {
      "canCalculateWithoutUserTaxData": false,
      "canCalculateWithGeographyOnly": false,
      "canCalculateWithOfficialLocalDataset": false,
      "canCalculateWithUserTaxBill": false,
      "recommendedEstimateStatus": "needs_accountant_review"
    },
    "humanReviewRequired": true,
    "humanReviewReasons": [
      "Tax-return or accountant inputs are required before estimating the dollar benefit.",
      "The ordinary B&O rate and tax base depend on taxpayer-specific activity, deductions, and Multiple Activities Tax Credit treatment."
    ],
    "sourceUrls": [
      "https://apps.leg.wa.gov/rcw/default.aspx?cite=82.04.294",
      "https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems",
      "https://dor.wa.gov/taxes-rates/tax-incentives/tax-incentive-programs",
      "https://apps.leg.wa.gov/rcw/default.aspx?cite=82.32.534",
      "https://dor.wa.gov/education/industry-guides/manufacturing-guide/multiple-activities-tax-credit-matc",
      "https://apps.leg.wa.gov/rcw/default.aspx?cite=82.04.240",
      "https://app.leg.wa.gov/rcw/default.aspx?cite=82.04.270"
    ],
    "evidenceText": "Washington RCW 82.04.294 currently provides a 0.275 percent B&O rate for qualifying solar energy system and component manufacturing, processing for hire, and manufacturer wholesale sales, and the provision expires July 1, 2032. DOR guidance confirms no application is required, annual tax performance reporting is required by May 31 after a claim year, retail consumer sales are not under this preferential manufacturing or wholesaling classification, and MATC or deductions may affect actual filing. State ordinary manufacturing and wholesaling rates are 0.484 percent until January 1, 2027 and 0.5 percent beginning January 1, 2027 under RCW 82.04.240 and RCW 82.04.270."
  },
  {
    "id": "tax_geo_ri_renewable_property_tax_local_assessor_workflow_v1",
    "version": 2,
    "active": true,
    "taxType": "property_tax",
    "ruleKind": "local_assessor_workflow",
    "geography": {
      "country": "US",
      "state": "RI",
      "stateFips": "44",
      "notes": "Rhode Island has statewide statutory valuation or tax caps for renewable energy resources and associated equipment, but municipal assessor jurisdiction still matters for assessment administration and local ordinance waivers."
    },
    "opportunityIds": [
      "SOURCE_DSIRE:dsire_program_id:22798"
    ],
    "effectiveStartDate": "2025-07-02",
    "effectiveEndDate": null,
    "sourceConfidence": "high",
    "localityMatters": true,
    "derivedInputs": [
      {
        "inputKey": "ri_tangible_renewable_tax_rate_per_kw_ac",
        "value": 5,
        "valueType": "number",
        "source": "official_source",
        "userOverrideAllowed": false,
        "confidence": "high",
        "evidenceText": "R.I. Gen. Laws section 44-5-3(c) states that cities and towns shall only tax renewable energy resources and associated equipment at $5.00 per kilowatt of AC nameplate capacity for tangible property."
      },
      {
        "inputKey": "ri_real_property_renewable_tax_rate_per_kw_ac",
        "value": 3.5,
        "valueType": "number",
        "source": "official_source",
        "userOverrideAllowed": false,
        "confidence": "high",
        "evidenceText": "R.I. Gen. Laws section 44-5-12(a)(5) states that real property on which renewable resources are located shall only be taxed at $3.50 per kilowatt of AC nameplate capacity, subject to the statute's conditions."
      },
      {
        "inputKey": "ri_residential_renewable_system_exemption_available",
        "value": true,
        "valueType": "boolean",
        "source": "official_source",
        "userOverrideAllowed": false,
        "confidence": "high",
        "evidenceText": "R.I. Gen. Laws section 44-3-3(a)(48) exempts renewable energy resources used in residential systems and associated equipment in service after December 31, 2015."
      },
      {
        "inputKey": "ri_manufacturer_renewable_system_exemption_available",
        "value": true,
        "valueType": "boolean",
        "source": "official_source",
        "userOverrideAllowed": false,
        "confidence": "high",
        "evidenceText": "R.I. Gen. Laws section 44-3-3(a)(49) exempts renewable energy resources employed by a manufacturer."
      },
      {
        "inputKey": "ri_municipal_waiver_option_exists",
        "value": true,
        "valueType": "boolean",
        "source": "official_source",
        "userOverrideAllowed": false,
        "confidence": "high",
        "evidenceText": "R.I. Gen. Laws section 44-3-21 authorizes city or town councils by ordinance to exempt renewable energy systems from taxation, and OER regulations describe municipal waiver options for commercial or net-metered systems."
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
        "reason": "The statutory Rhode Island calculation uses AC nameplate capacity; this is a project or equipment attribute, not a geography attribute.",
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
        "reason": "The current real-property statute references the farmland reclassification exemption, which cannot be inferred safely from city or town geography alone.",
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
    "calculationImpact": {
      "canCalculateWithoutUserTaxData": false,
      "canCalculateWithGeographyOnly": false,
      "canCalculateWithOfficialLocalDataset": false,
      "canCalculateWithUserTaxBill": false,
      "recommendedEstimateStatus": "needs_assessor_review"
    },
    "humanReviewRequired": true,
    "humanReviewReasons": [
      "Assessor or tax bill confirmation is required before estimating savings versus ordinary assessment.",
      "Municipal waiver status and project tax classification cannot be determined from state geography alone."
    ],
    "sourceUrls": [
      "https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-3.htm",
      "https://webserver.rilegislature.gov/Statutes/TITLE44/44-5/44-5-12.htm",
      "https://webserver.rilegislature.gov/Statutes/TITLE44/44-3/44-3-3.htm",
      "https://webserver.rilegislature.gov/Statutes/TITLE44/44-3/44-3-21.htm",
      "https://rules.sos.ri.gov/regulations/part/300-00-00-2",
      "https://energy.ri.gov/renewable-energy/solar",
      "https://planning.ri.gov/planning-areas/data-center/rhode-island-geographic-information-system-rigis",
      "https://www.rigis.org/datasets/edc%3A%3Amunicipalities-1997/about",
      "https://www.arcgis.com/sharing/rest/content/items/9993ee194a024b21bfa6ae286de0d1f6/info/metadata/metadata.xml?format=default&output=html"
    ],
    "evidenceText": "Current Rhode Island law sets renewable energy resources and associated tangible equipment at $5.00 per AC kW and real property on which renewable resources are located at $3.50 per AC kW, with residential and manufacturer-employed systems separately exempt. OER regulations describe the statewide commercial-system formula, municipal waiver option, and required interconnection or program documentation. Municipal boundaries are available from RIGIS for assessor routing, but ordinance status and project classification require local review or user/assessor documentation."
  },
  {
    "id": "tax_geo_mi_rerz_tax_exemption_workflow_v1",
    "version": 2,
    "active": true,
    "taxType": "property_income_tax_exemption",
    "ruleKind": "approved_zone_tax_exemption_workflow",
    "geography": {
      "country": "US",
      "state": "MI",
      "stateFips": "26",
      "notes": "Michigan geography alone is not sufficient. Renewable Energy Renaissance Zones are approved-zone and company/project-specific, and official sources state that benefits apply only to operations of the designated company within approved geographic boundaries."
    },
    "opportunityIds": [
      "SOURCE_DSIRE:dsire_program_id:3216"
    ],
    "effectiveStartDate": null,
    "effectiveEndDate": null,
    "sourceConfidence": "medium",
    "localityMatters": true,
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
    "calculationImpact": {
      "canCalculateWithoutUserTaxData": false,
      "canCalculateWithGeographyOnly": false,
      "canCalculateWithOfficialLocalDataset": false,
      "canCalculateWithUserTaxBill": false,
      "recommendedEstimateStatus": "needs_assessor_review"
    },
    "humanReviewRequired": true,
    "humanReviewReasons": [
      "Approved zone documents and parcel-level confirmation are required before estimating the dollar benefit.",
      "Actual eligible tax lines and phaseout schedule depend on approved program documents, assessor records, and tax filings."
    ],
    "sourceUrls": [
      "https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/cy2023-renaissance-zone-annual-report.pdf",
      "https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones",
      "https://www.michigan.gov/taxes/-/media/Project/Websites/taxes/Forms/IIT/TY2025/MI-1040-Book.pdf",
      "https://www.michiganbusiness.org/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf",
      "https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/cy-2024-msf-specific-policy-change-report.pdf",
      "https://legislature.michigan.gov/documents/2023-2024/publicact/htm/2024-PA-0040.htm",
      "https://www.michiganbusiness.org/globalassets/documents/msf-board/meeting-minutes/msf-meeting-minutes-july-9-2024---final-approved.pdf",
      "https://www.michiganbusiness.org/about-medc/michigan-strategic-fund/"
    ],
    "evidenceText": "Official MEDC and Michigan Treasury sources show that Renewable Energy Renaissance Zone benefits are approved-zone and company/project-specific, can include abatement of property taxes and local income tax where applicable, exclude sales/use tax and several local obligations, and phase out during the final three years. The Michigan tax return instructions require assessor approval for Renaissance Zone income-tax deduction treatment. PA 40 of 2024 and MSF 2024 materials indicate the Renaissance Zone framework was amended, so current approved documents are necessary for active-zone records."
  }
]
```

Current tax target packages:
```json
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3216",
    "programName": "Renewable Energy Renaissance Zones",
    "calculationStatus": "calculable_with_missing_inputs",
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effects": [
      {
        "effectType": "tax_credit",
        "expressionId": "tax_exempt_liability",
        "expression": "gross_benefit_cents = (eligible_state_education_tax_cents + eligible_real_property_tax_cents + eligible_personal_property_tax_cents + eligible_local_income_tax_cents) * phaseout_multiplier",
        "taxBenefitClassification": "tax_abatement",
        "cashValueClassification": "tax_exemption",
        "displayRecommendation": {
          "label": "Approved Renaissance Zone tax relief",
          "caveat": "Only applies to approved renewable-energy company operations in a designated Michigan zone. This is tax abatement, not a retrofit rebate, and depends on actual eligible tax liabilities and approved program documents.",
          "estimate_status": "needs_accountant_review"
        },
        "variables": [
          "approved_rerz_designation",
          "qualified_company_operations",
          "company_current_on_state_and_local_taxes",
          "approved_zone_term_years",
          "program_year",
          "phaseout_multiplier",
          "eligible_state_education_tax_cents",
          "eligible_real_property_tax_cents",
          "eligible_personal_property_tax_cents",
          "eligible_local_income_tax_cents"
        ],
        "requiredInputs": [
          {
            "inputKey": "approved_rerz_designation",
            "label": "Approved Renewable Energy Renaissance Zone designation",
            "valueType": "boolean",
            "sourcePrecedence": [
              "program_approval",
              "admin_review"
            ],
            "uiPlacement": "admin_only",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": false
          },
          {
            "inputKey": "qualified_company_operations",
            "label": "Qualified renewable-energy company operations in approved zone",
            "valueType": "boolean",
            "sourcePrecedence": [
              "program_approval",
              "admin_review"
            ],
            "uiPlacement": "organization_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": false
          },
          {
            "inputKey": "company_current_on_state_and_local_taxes",
            "label": "Company is current on applicable state and local taxes",
            "valueType": "boolean",
            "sourcePrecedence": [
              "tax_profile",
              "accountant_review",
              "user_profile"
            ],
            "uiPlacement": "tax_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "approved_zone_term_years",
            "label": "Approved zone term",
            "valueType": "number",
            "sourcePrecedence": [
              "program_approval",
              "admin_review"
            ],
            "uiPlacement": "admin_only",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": false
          },
          {
            "inputKey": "program_year",
            "label": "Current year within approved zone term",
            "valueType": "number",
            "sourcePrecedence": [
              "derived_runtime",
              "admin_review"
            ],
            "uiPlacement": "hidden_derived",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": false
          },
          {
            "inputKey": "phaseout_multiplier",
            "label": "Approved tax-relief phaseout multiplier",
            "valueType": "number",
            "sourcePrecedence": [
              "program_approval",
              "admin_review"
            ],
            "uiPlacement": "admin_only",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": false
          },
          {
            "inputKey": "eligible_state_education_tax_cents",
            "label": "Eligible Michigan state education tax otherwise due",
            "valueType": "currency_cents",
            "sourcePrecedence": [
              "property_tax_bill",
              "tax_profile",
              "user_profile"
            ],
            "uiPlacement": "property_tax_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "eligible_real_property_tax_cents",
            "label": "Eligible real property tax otherwise due",
            "valueType": "currency_cents",
            "sourcePrecedence": [
              "property_tax_bill",
              "tax_profile",
              "user_profile"
            ],
            "uiPlacement": "property_tax_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "eligible_personal_property_tax_cents",
            "label": "Eligible personal property tax otherwise due",
            "valueType": "currency_cents",
            "sourcePrecedence": [
              "property_tax_bill",
              "tax_profile",
              "user_profile"
            ],
            "uiPlacement": "property_tax_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "eligible_local_income_tax_cents",
            "label": "Eligible local income tax otherwise due",
            "valueType": "currency_cents",
            "sourcePrecedence": [
              "tax_profile",
              "accountant_review",
              "user_profile"
            ],
            "uiPlacement": "tax_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          }
        ]
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22798",
    "programName": "Renewable Energy Tax Valuation",
    "calculationStatus": "non_monetary_workflow",
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effects": [
      {
        "effectType": "process_value",
        "expressionId": "property_tax_valuation_formula",
        "expression": "annual_statutory_tax_cents = (tangible_property_applicable ? ac_kw_capacity * 500 : 0) + (real_property_applicable ? ac_kw_capacity * 350 : 0)",
        "taxBenefitClassification": "property_tax_valuation",
        "cashValueClassification": "process_value",
        "displayRecommendation": {
          "label": "Rhode Island renewable property-tax valuation workflow",
          "caveat": "Shows statutory renewable property/tangible tax treatment, not guaranteed incentive cash. Positive savings require counterfactual assessment, property tax bill, municipal exemption status, and assessor or tax-professional review.",
          "estimate_status": "needs_property_tax_profile"
        },
        "variables": [
          "ac_kw_capacity",
          "renewable_resource_type",
          "municipality",
          "commercial_tax_status",
          "tangible_property_applicable",
          "real_property_applicable",
          "municipal_exemption_or_waiver_status",
          "residential_system_exemption",
          "manufacturer_system_exemption",
          "interconnection_agreement_date",
          "counterfactual_ordinary_annual_property_tax_cents",
          "local_assessor_confirmation"
        ],
        "requiredInputs": [
          {
            "inputKey": "ac_kw_capacity",
            "label": "Renewable energy system AC nameplate capacity",
            "valueType": "number",
            "sourcePrecedence": [
              "quote",
              "retrofit_assumptions",
              "user_profile"
            ],
            "uiPlacement": "retrofit_details",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "renewable_resource_type",
            "label": "Eligible renewable energy resource type",
            "valueType": "enum",
            "sourcePrecedence": [
              "retrofit_assumptions",
              "quote",
              "user_profile"
            ],
            "uiPlacement": "retrofit_details",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "municipality",
            "label": "Rhode Island municipality",
            "valueType": "text",
            "sourcePrecedence": [
              "user_profile",
              "retrofit_assumptions"
            ],
            "uiPlacement": "property_tax_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "commercial_tax_status",
            "label": "Property tax status",
            "valueType": "enum",
            "sourcePrecedence": [
              "property_tax_bill",
              "tax_profile",
              "user_profile"
            ],
            "uiPlacement": "property_tax_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "tangible_property_applicable",
            "label": "Tangible property tax treatment applies",
            "valueType": "boolean",
            "sourcePrecedence": [
              "admin_review",
              "user_profile"
            ],
            "uiPlacement": "property_tax_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "real_property_applicable",
            "label": "Real property renewable-resource tax treatment applies",
            "valueType": "boolean",
            "sourcePrecedence": [
              "admin_review",
              "user_profile"
            ],
            "uiPlacement": "property_tax_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "municipal_exemption_or_waiver_status",
            "label": "Municipal exemption or waiver status",
            "valueType": "enum",
            "sourcePrecedence": [
              "admin_review",
              "user_profile"
            ],
            "uiPlacement": "property_tax_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "residential_system_exemption",
            "label": "Residential renewable system exemption applies",
            "valueType": "boolean",
            "sourcePrecedence": [
              "admin_review",
              "user_profile"
            ],
            "uiPlacement": "property_tax_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "manufacturer_system_exemption",
            "label": "Manufacturer-used renewable system exemption applies",
            "valueType": "boolean",
            "sourcePrecedence": [
              "admin_review",
              "user_profile"
            ],
            "uiPlacement": "property_tax_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "interconnection_agreement_date",
            "label": "Interconnection agreement date",
            "valueType": "date",
            "sourcePrecedence": [
              "program_approval",
              "admin_review"
            ],
            "uiPlacement": "retrofit_details",
            "missingSeverity": "optional",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "counterfactual_ordinary_annual_property_tax_cents",
            "label": "Counterfactual ordinary annual property or tangible tax",
            "valueType": "currency_cents",
            "sourcePrecedence": [
              "property_tax_bill",
              "tax_profile",
              "user_profile"
            ],
            "uiPlacement": "property_tax_profile",
            "missingSeverity": "optional",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "local_assessor_confirmation",
            "label": "Local assessor confirmed renewable tax treatment",
            "valueType": "boolean",
            "sourcePrecedence": [
              "admin_review",
              "user_profile"
            ],
            "uiPlacement": "admin_only",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": false
          }
        ]
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
    "programName": "Tax Abatement for Solar Manufacturers",
    "calculationStatus": "calculable_with_missing_inputs",
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effects": [
      {
        "effectType": "tax_credit",
        "expressionId": "tax_rate_difference",
        "expression": "gross_benefit_cents = max(0, qualifying_tax_base_after_deductions_and_matc_cents * (otherwise_applicable_b_and_o_rate_decimal - 0.00275))",
        "taxBenefitClassification": "tax_rate_preference",
        "cashValueClassification": "tax_rate_preference",
        "displayRecommendation": {
          "label": "Washington solar manufacturing B&O rate preference",
          "caveat": "Applies to qualifying Washington solar manufacturers, processors for hire, and manufacturer wholesalers, not customers installing solar. Value depends on actual B&O tax base, deductions, MATC treatment, and required reporting.",
          "estimate_status": "needs_accountant_review"
        },
        "variables": [
          "qualifying_solar_b_and_o_classification",
          "tax_period_start_date",
          "tax_period_end_date",
          "qualifying_tax_base_after_deductions_and_matc_cents",
          "otherwise_applicable_b_and_o_rate_decimal",
          "preferential_solar_b_and_o_rate_decimal",
          "annual_tax_performance_report_filed",
          "interstate_or_foreign_sales_deductions_cents",
          "multiple_activities_tax_credit_adjustments_cents"
        ],
        "requiredInputs": [
          {
            "inputKey": "qualifying_solar_b_and_o_classification",
            "label": "Qualifying solar B&O activity classification",
            "valueType": "enum",
            "sourcePrecedence": [
              "tax_profile",
              "accountant_review",
              "user_profile"
            ],
            "uiPlacement": "organization_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "tax_period_start_date",
            "label": "Tax period start date",
            "valueType": "date",
            "sourcePrecedence": [
              "tax_profile",
              "accountant_review",
              "user_profile"
            ],
            "uiPlacement": "tax_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "tax_period_end_date",
            "label": "Tax period end date",
            "valueType": "date",
            "sourcePrecedence": [
              "tax_profile",
              "accountant_review",
              "user_profile"
            ],
            "uiPlacement": "tax_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "qualifying_tax_base_after_deductions_and_matc_cents",
            "label": "Qualifying B&O tax base after deductions and MATC adjustments",
            "valueType": "currency_cents",
            "sourcePrecedence": [
              "tax_profile",
              "accountant_review",
              "user_profile"
            ],
            "uiPlacement": "tax_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "otherwise_applicable_b_and_o_rate_decimal",
            "label": "Otherwise applicable Washington B&O tax rate",
            "valueType": "number",
            "sourcePrecedence": [
              "program_source",
              "admin_review"
            ],
            "uiPlacement": "hidden_derived",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "preferential_solar_b_and_o_rate_decimal",
            "label": "Preferential solar B&O tax rate",
            "valueType": "number",
            "sourcePrecedence": [
              "program_source",
              "admin_review"
            ],
            "uiPlacement": "hidden_derived",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": false
          },
          {
            "inputKey": "annual_tax_performance_report_filed",
            "label": "Annual Tax Performance Report filed",
            "valueType": "boolean",
            "sourcePrecedence": [
              "tax_profile",
              "accountant_review",
              "user_profile"
            ],
            "uiPlacement": "tax_profile",
            "missingSeverity": "blocks_calculation",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "interstate_or_foreign_sales_deductions_cents",
            "label": "Interstate or foreign sales deductions",
            "valueType": "currency_cents",
            "sourcePrecedence": [
              "tax_profile",
              "accountant_review",
              "user_profile"
            ],
            "uiPlacement": "tax_profile",
            "missingSeverity": "optional",
            "userOverrideAllowed": true
          },
          {
            "inputKey": "multiple_activities_tax_credit_adjustments_cents",
            "label": "Multiple-activities tax credit adjustments",
            "valueType": "currency_cents",
            "sourcePrecedence": [
              "tax_profile",
              "accountant_review",
              "user_profile"
            ],
            "uiPlacement": "tax_profile",
            "missingSeverity": "optional",
            "userOverrideAllowed": true
          }
        ]
      }
    ]
  }
]
```

Target sample profiles:
```json
[
  {
    "sampleUserId": "via-verde-bronx-renter-household",
    "companyName": "Anonymized renter household at Via Verde",
    "website": "https://www.phippsny.org/locations/via-verde/",
    "organizationType": "Residential",
    "organizationSize": "Household",
    "siteAddress": "700 Brook Avenue, Bronx, NY 10455, USA",
    "state": "NY",
    "electricUtilityProvider": "Consolidated Edison Company of New York",
    "gasUtilityProvider": "Consolidated Edison Company of New York",
    "ownershipStatus": "Lease",
    "buildingType": "Multifamily / Apartment Building",
    "squareFootage": null,
    "primaryActivityText": "Residential occupancy in affordable or mixed-income multifamily housing with tenant and common-area utility ambiguity",
    "naicsCodes": [
      "531110",
      "814110"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Consolidated Edison Company of New York",
        "annualUsage": 3600,
        "annualCost": 1080,
        "averageUnitCost": 0.3,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "Consolidated Edison Company of New York",
        "annualUsage": 210,
        "annualCost": 345,
        "averageUnitCost": 1.6429,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "New York City Department of Environmental Protection",
        "annualUsage": 43000,
        "annualCost": 360,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      }
    ],
    "publicSourceNotes": "Via Verde is a publicly identified mixed-income multifamily property at 700 Brook Avenue with 222 units and sustainability features. Household is anonymized.",
    "notes": "Tests residential tenant versus building-owner eligibility, low-income multifamily logic, and competitive supplier confusion in ConEd territory."
  },
  {
    "sampleUserId": "hoa-mai-gardens-seattle-household",
    "companyName": "Anonymized household at Hoa Mai Gardens",
    "website": "https://www.seattlehousing.org/",
    "organizationType": "Residential",
    "organizationSize": "Household",
    "siteAddress": "221 10th Avenue S, Seattle, WA 98104, USA",
    "state": "WA",
    "electricUtilityProvider": "Seattle City Light",
    "gasUtilityProvider": "Puget Sound Energy",
    "ownershipStatus": "Lease",
    "buildingType": "Multifamily / Apartment Building",
    "squareFootage": 150730,
    "primaryActivityText": "Residential occupancy in income-qualified public housing with tenant and housing-authority control split",
    "naicsCodes": [
      "531110",
      "925110"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Seattle City Light",
        "annualUsage": 4200,
        "annualCost": 640,
        "averageUnitCost": 0.1524,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "Puget Sound Energy",
        "annualUsage": 240,
        "annualCost": 370,
        "averageUnitCost": 1.5417,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "Seattle Public Utilities",
        "annualUsage": 40000,
        "annualCost": 520,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      }
    ],
    "publicSourceNotes": "Seattle Housing Authority lists Hoa Mai Gardens at 221 10th Ave S. Public project records report roughly 150,730 square feet.",
    "notes": "Tests public-housing applicant logic, tenant versus housing authority control, municipal electric utility territory, and low-income multifamily qualification."
  },
  {
    "sampleUserId": "tapiz-mariposa-denver-household",
    "companyName": "Anonymized senior or disabled household at Tapiz at Mariposa",
    "website": "https://www.denverhousing.org/",
    "organizationType": "Residential",
    "organizationSize": "Household",
    "siteAddress": "1099 Osage Street, Denver, CO 80204, USA",
    "state": "CO",
    "electricUtilityProvider": "Xcel Energy",
    "gasUtilityProvider": "Xcel Energy",
    "ownershipStatus": "Lease",
    "buildingType": "Multifamily / Apartment Building",
    "squareFootage": null,
    "primaryActivityText": "Residential occupancy in senior or disabled public housing",
    "naicsCodes": [
      "531110",
      "623312"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Xcel Energy",
        "annualUsage": 3800,
        "annualCost": 620,
        "averageUnitCost": 0.1632,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "Xcel Energy",
        "annualUsage": 360,
        "annualCost": 420,
        "averageUnitCost": 1.1667,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "Denver Water",
        "annualUsage": 36000,
        "annualCost": 300,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      }
    ],
    "publicSourceNotes": "Denver Housing Authority identifies Tapiz at Mariposa at 1099 Osage Street with 100 units. Household is anonymized.",
    "notes": "Tests medically vulnerable and income-qualified residential matching, multifamily ownership ambiguity, and Denver electric/gas utility alignment."
  },
  {
    "sampleUserId": "keauhou-lane-honolulu-renter",
    "companyName": "Anonymized workforce-housing household at Keauhou Lane",
    "website": "https://www.edlenandco.com/projects-middle-income/keauhou-lane",
    "organizationType": "Residential",
    "organizationSize": "Household",
    "siteAddress": "502 Keawe Street, Honolulu, HI 96813, USA",
    "state": "HI",
    "electricUtilityProvider": "Hawaiian Electric",
    "gasUtilityProvider": "Hawaii Gas",
    "ownershipStatus": "Lease",
    "buildingType": "Mixed-use",
    "squareFootage": 179800,
    "primaryActivityText": "Residential occupancy in workforce housing with shared mixed-use building loads",
    "naicsCodes": [
      "531110"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Hawaiian Electric",
        "annualUsage": 5200,
        "annualCost": 2240,
        "averageUnitCost": 0.4308,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "Hawaii Gas",
        "annualUsage": 90,
        "annualCost": 390,
        "averageUnitCost": 4.3333,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "Board of Water Supply, City and County of Honolulu",
        "annualUsage": 45000,
        "annualCost": 470,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      }
    ],
    "publicSourceNotes": "Keauhou Lane is a publicly described mixed-use workforce-housing development in Honolulu with reserved housing units and commercial space.",
    "notes": "Tests island utility costs, mixed-use building classification, workforce-housing eligibility, and landlord-controlled solar or hot-water systems."
  },
  {
    "sampleUserId": "the-rose-minneapolis-household",
    "companyName": "Anonymized household at The Rose",
    "website": "https://aeon.org/communities/the-rose/",
    "organizationType": "Residential",
    "organizationSize": "Household",
    "siteAddress": "1928 Portland Avenue S, Minneapolis, MN 55404, USA",
    "state": "MN",
    "electricUtilityProvider": "Xcel Energy",
    "gasUtilityProvider": "CenterPoint Energy",
    "ownershipStatus": "Lease",
    "buildingType": "Multifamily / Apartment Building",
    "squareFootage": 86195,
    "primaryActivityText": "Residential occupancy in sustainable mixed-income multifamily housing",
    "naicsCodes": [
      "531110"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Xcel Energy",
        "annualUsage": 4300,
        "annualCost": 720,
        "averageUnitCost": 0.1674,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "CenterPoint Energy",
        "annualUsage": 410,
        "annualCost": 500,
        "averageUnitCost": 1.2195,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "City of Minneapolis Public Works",
        "annualUsage": 39000,
        "annualCost": 330,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      }
    ],
    "publicSourceNotes": "The Rose is a publicly identified mixed-income multifamily property at 1928 Portland Avenue S in Minneapolis.",
    "notes": "Tests dual electric/gas utility assignment, mixed-income housing status, and household versus property-owner eligibility."
  },
  {
    "sampleUserId": "bens-chili-bowl-dc",
    "companyName": "Ben's Chili Bowl - U Street Location",
    "website": "https://www.benschilibowl.com/",
    "organizationType": "Commercial Business",
    "organizationSize": "11-50 employees",
    "siteAddress": "1213 U Street NW, Washington, DC 20009, USA",
    "state": "DC",
    "electricUtilityProvider": "Pepco",
    "gasUtilityProvider": "Washington Gas",
    "ownershipStatus": "Not sure",
    "buildingType": "Restaurant / Commercial Kitchen",
    "squareFootage": 3000,
    "primaryActivityText": "Counter-service and dine-in restaurant with cooking, refrigeration, ventilation, and late-night loads",
    "naicsCodes": [
      "722513",
      "722511"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Pepco",
        "annualUsage": 176000,
        "annualCost": 27800,
        "averageUnitCost": 0.158,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "Washington Gas",
        "annualUsage": 9300,
        "annualCost": 13200,
        "averageUnitCost": 1.4194,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "DC Water",
        "annualUsage": 1050000,
        "annualCost": 6200,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      },
      {
        "utilityCategory": "waste",
        "utilityProvider": "Private commercial hauler - Washington DC",
        "annualUsage": null,
        "annualCost": 13800,
        "averageUnitCost": null,
        "usageUnit": "USD"
      }
    ],
    "publicSourceNotes": "Ben's Chili Bowl lists the U Street restaurant at 1213 U St NW. Floor area is estimated for matching tests.",
    "notes": "Tests a small urban commercial kitchen in a deregulated retail-supply context where Pepco remains the electric distribution utility."
  },
  {
    "sampleUserId": "zingermans-deli-ann-arbor",
    "companyName": "Zingerman's Delicatessen",
    "website": "https://www.zingermansdeli.com/",
    "organizationType": "Commercial Business",
    "organizationSize": "51-250 employees",
    "siteAddress": "422 Detroit Street, Ann Arbor, MI 48104, USA",
    "state": "MI",
    "electricUtilityProvider": "DTE Electric",
    "gasUtilityProvider": "DTE Gas",
    "ownershipStatus": "Not sure",
    "buildingType": "Restaurant / Commercial Kitchen",
    "squareFootage": 13000,
    "primaryActivityText": "Deli, cafe, prepared foods, retail specialty grocery, and refrigerated food merchandising",
    "naicsCodes": [
      "722513",
      "445299"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "DTE Electric",
        "annualUsage": 540000,
        "annualCost": 81000,
        "averageUnitCost": 0.15,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "DTE Gas",
        "annualUsage": 23000,
        "annualCost": 28500,
        "averageUnitCost": 1.2391,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "City of Ann Arbor",
        "annualUsage": 2400000,
        "annualCost": 13500,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      },
      {
        "utilityCategory": "waste",
        "utilityProvider": "Private commercial hauler - Ann Arbor",
        "annualUsage": null,
        "annualCost": 46000,
        "averageUnitCost": null,
        "usageUnit": "USD"
      }
    ],
    "publicSourceNotes": "Zingerman's lists its public address at 422 Detroit Street. Floor area is an estimated planning value.",
    "notes": "Tests a food-service/retail hybrid where refrigeration and kitchen measures should rank ahead of generic office measures."
  },
  {
    "sampleUserId": "big-dipper-missoula",
    "companyName": "Big Dipper Ice Cream - Missoula",
    "website": "https://www.bigdippericecream.com/",
    "organizationType": "Commercial Business",
    "organizationSize": "1-10 employees",
    "siteAddress": "631 S Higgins Avenue, Missoula, MT 59801, USA",
    "state": "MT",
    "electricUtilityProvider": "NorthWestern Energy",
    "gasUtilityProvider": "NorthWestern Energy",
    "ownershipStatus": "Lease",
    "buildingType": "Restaurant / Commercial Kitchen",
    "squareFootage": 2000,
    "primaryActivityText": "Retail ice-cream sales, frozen-product storage, and small-scale food preparation",
    "naicsCodes": [
      "722515",
      "311520"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "NorthWestern Energy",
        "annualUsage": 78000,
        "annualCost": 10050,
        "averageUnitCost": 0.1288,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "NorthWestern Energy",
        "annualUsage": 1600,
        "annualCost": 1700,
        "averageUnitCost": 1.0625,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "City of Missoula Water",
        "annualUsage": 180000,
        "annualCost": 1100,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      },
      {
        "utilityCategory": "waste",
        "utilityProvider": "Republic Services",
        "annualUsage": null,
        "annualCost": 4200,
        "averageUnitCost": null,
        "usageUnit": "USD"
      }
    ],
    "publicSourceNotes": "Big Dipper lists its Missoula shop at 631 S Higgins Avenue. Floor area is estimated.",
    "notes": "Tests small-business refrigeration logic in a colder-climate IOU territory with likely tenant control limitations."
  },
  {
    "sampleUserId": "burlington-beer-company",
    "companyName": "Burlington Beer Company",
    "website": "https://www.burlingtonbeercompany.com/",
    "organizationType": "Commercial Business",
    "organizationSize": "51-250 employees",
    "siteAddress": "180 Flynn Avenue, Burlington, VT 05401, USA",
    "state": "VT",
    "electricUtilityProvider": "Burlington Electric Department",
    "gasUtilityProvider": "Vermont Gas Systems",
    "ownershipStatus": "Lease",
    "buildingType": "Industrial / Manufacturing",
    "squareFootage": 15000,
    "primaryActivityText": "Beer production, taproom sales, restaurant food service, cold storage, and barrel aging",
    "naicsCodes": [
      "312120",
      "722511"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Burlington Electric Department",
        "annualUsage": 430000,
        "annualCost": 75250,
        "averageUnitCost": 0.175,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "Vermont Gas Systems",
        "annualUsage": 19000,
        "annualCost": 31000,
        "averageUnitCost": 1.6316,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "City of Burlington Water Resources",
        "annualUsage": 4800000,
        "annualCost": 22000,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      },
      {
        "utilityCategory": "waste",
        "utilityProvider": "Casella Waste Systems",
        "annualUsage": null,
        "annualCost": 24000,
        "averageUnitCost": null,
        "usageUnit": "USD"
      }
    ],
    "publicSourceNotes": "Burlington Beer Company identifies its taproom, restaurant, and barrel house at 180 Flynn Avenue.",
    "notes": "Tests municipal electric territory, process-load classification, and a brewery/restaurant hybrid with water and energy measures."
  },
  {
    "sampleUserId": "bluebird-cafe-nashville",
    "companyName": "The Bluebird Cafe",
    "website": "https://bluebirdcafe.com/",
    "organizationType": "Commercial Business",
    "organizationSize": "11-50 employees",
    "siteAddress": "4104 Hillsboro Pike, Nashville, TN 37215, USA",
    "state": "TN",
    "electricUtilityProvider": "Nashville Electric Service",
    "gasUtilityProvider": "Spire",
    "ownershipStatus": "Lease",
    "buildingType": "Restaurant / Commercial Kitchen",
    "squareFootage": 2500,
    "primaryActivityText": "Live music events, food and beverage service, small commercial kitchen, and public assembly space",
    "naicsCodes": [
      "722511",
      "711110"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Nashville Electric Service",
        "annualUsage": 96000,
        "annualCost": 12960,
        "averageUnitCost": 0.135,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "Spire",
        "annualUsage": 4800,
        "annualCost": 6200,
        "averageUnitCost": 1.2917,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "Metro Water Services Nashville",
        "annualUsage": 380000,
        "annualCost": 2200,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      },
      {
        "utilityCategory": "waste",
        "utilityProvider": "Waste Management",
        "annualUsage": null,
        "annualCost": 8600,
        "averageUnitCost": null,
        "usageUnit": "USD"
      }
    ],
    "publicSourceNotes": "The Bluebird Cafe lists its location at 4104 Hillsboro Pike. Floor area is estimated.",
    "notes": "Tests event-driven operating schedules and stale gas utility naming after the Nashville provider transition to Spire."
  }
]
```

Return JSON only using this schema:
```json
{
  "schemaVersion": "retrofi_test_case_tax_document_updates.v1",
  "researchedAt": "2026-07-03",
  "source": "gpt_pro",
  "batchNumber": 2,
  "profileTaxDocumentUpdates": [
    {
      "sampleUserId": "",
      "profileSummary": {
        "companyName": "",
        "siteAddress": "",
        "state": "",
        "organizationType": "",
        "buildingType": "",
        "squareFootage": null
      },
      "syntheticTaxFiles": [
        {
          "fileId": "",
          "clientIntakeId": "",
          "siteId": "",
          "originalFilename": "",
          "taxDocumentType": "property_tax_bill | assessor_notice | business_tax_return_summary | gross_receipts_tax_workpaper | sales_use_tax_workpaper | tax_credit_form | exemption_certificate | abatement_approval_letter | local_tax_bill | other",
          "taxYear": 2026,
          "jurisdiction": "",
          "issuingAuthority": "",
          "syntheticNotice": "Synthetic estimated tax profile for test fixtures; not an actual tax document.",
          "processingStatus": "processed",
          "uploadedAt": "2026-07-03T00:00:00.000Z",
          "processedAt": "2026-07-03T00:00:00.000Z"
        }
      ],
      "syntheticTaxExtractedValues": [
        {
          "extractedValueId": "",
          "clientIntakeId": "",
          "fileId": "",
          "fieldId": "",
          "fieldDisplayName": "",
          "value": null,
          "unit": "USD | cents | decimal | percent | date | text | boolean | kW AC | square_feet | other",
          "taxYear": 2026,
          "periodStart": null,
          "periodEnd": null,
          "confidence": "high | medium | low",
          "sourceType": "synthetic_tax_document",
          "sourceText": "Synthetic GPT Pro estimate based on public profile, location, business type, square footage, and tax-document fixture assumptions.",
          "sourcePath": ""
        }
      ],
      "taxProfileFacts": [
        {
          "inputKey": "",
          "value": null,
          "sourceFileId": "",
          "sourceStrategy": "synthetic_tax_document | accountant_review | assessor_review | admin_review",
          "uiPlacement": "tax_profile | property_tax_profile | organization_profile | admin_only | hidden_derived",
          "userOverrideAllowed": true,
          "defaultIsSynthetic": true,
          "confidenceImpactUntilConfirmed": "high | medium | low"
        }
      ],
      "opportunitySpecificTaxInputs": [
        {
          "opportunityId": "",
          "inputKey": "",
          "value": null,
          "sourceFileId": "",
          "estimateStatusIfUsed": "deterministic_estimate | needs_accountant_review | needs_assessor_review | needs_property_tax_profile | suppressed",
          "includeInUserFacingTotalBeforeConfirmation": false,
          "notes": ""
        }
      ],
      "missingOrReviewInputs": [],
      "sourceUrlsChecked": [],
      "reasoningNotes": ""
    }
  ],
  "globalWarnings": []
}
```
