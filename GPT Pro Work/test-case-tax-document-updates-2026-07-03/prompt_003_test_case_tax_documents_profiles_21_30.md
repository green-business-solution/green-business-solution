You are helping RetroFi create realistic synthetic tax-document fixtures for sample test cases.

Task: Create synthetic tax documents and tax-profile extracted values for sample profiles 21-30.
Research date: 2026-07-03
Batch number: 3

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
    "sampleUserId": "la-montanita-nob-hill-albuquerque",
    "companyName": "La Montanita Co-op - Nob Hill",
    "website": "https://lamontanita.coop/",
    "organizationType": "Commercial Business",
    "organizationSize": "51-250 employees",
    "siteAddress": "3500 Central Avenue SE, Albuquerque, NM 87106, USA",
    "state": "NM",
    "electricUtilityProvider": "Public Service Company of New Mexico",
    "gasUtilityProvider": "New Mexico Gas Company",
    "ownershipStatus": "Lease",
    "buildingType": "Grocery / Convenience / Cold Storage",
    "squareFootage": 15000,
    "primaryActivityText": "Cooperative grocery retail, refrigerated food merchandising, produce handling, and prepared foods",
    "naicsCodes": [
      "445110",
      "445299"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Public Service Company of New Mexico",
        "annualUsage": 720000,
        "annualCost": 86400,
        "averageUnitCost": 0.12,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "New Mexico Gas Company",
        "annualUsage": 9000,
        "annualCost": 9900,
        "averageUnitCost": 1.1,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "Albuquerque Bernalillo County Water Utility Authority",
        "annualUsage": 1300000,
        "annualCost": 7800,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      },
      {
        "utilityCategory": "waste",
        "utilityProvider": "City of Albuquerque Solid Waste / contracted commercial hauler",
        "annualUsage": null,
        "annualCost": 27500,
        "averageUnitCost": null,
        "usageUnit": "USD"
      }
    ],
    "publicSourceNotes": "La Montanita store information identifies the Nob Hill location at 3500 Central Avenue SE. Floor area is estimated.",
    "notes": "Tests grocery refrigeration in a Southwest IOU territory with different electric and gas utilities and cooperative ownership features."
  },
  {
    "sampleUserId": "food-bank-rockies-aurora-dc",
    "companyName": "Food Bank of the Rockies - Denver Metro Distribution Center",
    "website": "https://www.foodbankrockies.org/",
    "organizationType": "Nonprofit Organization",
    "organizationSize": "51-250 employees",
    "siteAddress": "20600 E 38th Avenue, Aurora, CO 80019, USA",
    "state": "CO",
    "electricUtilityProvider": "Xcel Energy",
    "gasUtilityProvider": "Xcel Energy",
    "ownershipStatus": "Own",
    "buildingType": "Warehouse / Logistics",
    "squareFootage": 270000,
    "primaryActivityText": "Food storage, cold storage, regional distribution, volunteer operations, and fleet logistics",
    "naicsCodes": [
      "624210",
      "493120",
      "493110"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Xcel Energy",
        "annualUsage": 3600000,
        "annualCost": 396000,
        "averageUnitCost": 0.11,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "Xcel Energy",
        "annualUsage": 65000,
        "annualCost": 61750,
        "averageUnitCost": 0.95,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "Aurora Water",
        "annualUsage": 1900000,
        "annualCost": 11200,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      },
      {
        "utilityCategory": "waste",
        "utilityProvider": "Waste Management / food-bank contracted hauler",
        "annualUsage": null,
        "annualCost": 68800,
        "averageUnitCost": null,
        "usageUnit": "USD"
      }
    ],
    "publicSourceNotes": "Food Bank of the Rockies describes its Denver metro distribution center at 20600 E 38th Avenue as roughly 270,000 square feet.",
    "notes": "Tests nonprofit eligibility, cold-storage measures, fleet charging, and large warehouse demand-management programs."
  },
  {
    "sampleUserId": "eastern-market-detroit",
    "companyName": "Eastern Market Partnership",
    "website": "https://easternmarket.org/",
    "organizationType": "Nonprofit Organization",
    "organizationSize": "11-50 employees",
    "siteAddress": "2934 Russell Street, Detroit, MI 48207, USA",
    "state": "MI",
    "electricUtilityProvider": "DTE Electric",
    "gasUtilityProvider": "DTE Gas",
    "ownershipStatus": "Not sure",
    "buildingType": "Mixed-use",
    "squareFootage": null,
    "primaryActivityText": "Public market operations, events, vendor leasing, food business support, and district management",
    "naicsCodes": [
      "531120",
      "813319",
      "445230"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "DTE Electric",
        "annualUsage": 1050000,
        "annualCost": 157500,
        "averageUnitCost": 0.15,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "DTE Gas",
        "annualUsage": 55000,
        "annualCost": 52250,
        "averageUnitCost": 0.95,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "Detroit Water and Sewerage Department",
        "annualUsage": 3800000,
        "annualCost": 24500,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      },
      {
        "utilityCategory": "waste",
        "utilityProvider": "Priority Waste / market district contracted hauler",
        "annualUsage": null,
        "annualCost": 97900,
        "averageUnitCost": null,
        "usageUnit": "USD"
      }
    ],
    "publicSourceNotes": "Eastern Market identifies itself as a nonprofit at 2934 Russell Street operating Detroit public market infrastructure.",
    "notes": "Tests district-scale nonprofit logic where the operator controls common infrastructure but vendors may own equipment."
  },
  {
    "sampleUserId": "okc-national-memorial-museum",
    "companyName": "Oklahoma City National Memorial & Museum",
    "website": "https://memorialmuseum.com/",
    "organizationType": "Nonprofit Organization",
    "organizationSize": "11-50 employees",
    "siteAddress": "620 N Harvey Avenue, Oklahoma City, OK 73102, USA",
    "state": "OK",
    "electricUtilityProvider": "Oklahoma Gas & Electric",
    "gasUtilityProvider": "Oklahoma Natural Gas",
    "ownershipStatus": "Not sure",
    "buildingType": "Public Institution",
    "squareFootage": 30000,
    "primaryActivityText": "Museum operations, memorial site management, public education, events, and visitor services",
    "naicsCodes": [
      "712110",
      "813410"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Oklahoma Gas & Electric",
        "annualUsage": 420000,
        "annualCost": 46200,
        "averageUnitCost": 0.11,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "Oklahoma Natural Gas",
        "annualUsage": 9500,
        "annualCost": 8700,
        "averageUnitCost": 0.916,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "City of Oklahoma City Utilities",
        "annualUsage": 700000,
        "annualCost": 4100,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      },
      {
        "utilityCategory": "waste",
        "utilityProvider": "Republic Services",
        "annualUsage": null,
        "annualCost": 8400,
        "averageUnitCost": null,
        "usageUnit": "USD"
      }
    ],
    "publicSourceNotes": "The Oklahoma City National Memorial & Museum lists 620 N Harvey Avenue. Floor area is estimated for matching tests.",
    "notes": "Tests nonprofit museum eligibility, preservation and visitor constraints, outdoor memorial water use, and electric/gas split by Oklahoma utilities."
  },
  {
    "sampleUserId": "museum-life-science-durham",
    "companyName": "Museum of Life and Science",
    "website": "https://www.lifeandscience.org/",
    "organizationType": "Nonprofit Organization",
    "organizationSize": "51-250 employees",
    "siteAddress": "433 W Murray Avenue, Durham, NC 27704, USA",
    "state": "NC",
    "electricUtilityProvider": "Duke Energy Progress",
    "gasUtilityProvider": "Dominion Energy North Carolina",
    "ownershipStatus": "Not sure",
    "buildingType": "Public Institution",
    "squareFootage": 100000,
    "primaryActivityText": "Science education, exhibits, animal care, outdoor learning, events, and visitor services",
    "naicsCodes": [
      "712110",
      "611710"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Duke Energy Progress",
        "annualUsage": 1350000,
        "annualCost": 148500,
        "averageUnitCost": 0.11,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "Dominion Energy North Carolina",
        "annualUsage": 27000,
        "annualCost": 29700,
        "averageUnitCost": 1.1,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "City of Durham Water Management",
        "annualUsage": 7500000,
        "annualCost": 42000,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      },
      {
        "utilityCategory": "waste",
        "utilityProvider": "GFL Environmental / museum contracted hauler",
        "annualUsage": null,
        "annualCost": 22100,
        "averageUnitCost": null,
        "usageUnit": "USD"
      }
    ],
    "publicSourceNotes": "The Museum of Life and Science lists 433 W Murray Avenue and operates an 84-acre museum campus. Indoor area is estimated.",
    "notes": "Tests campus-like nonprofit facilities with animal-care, outdoor water, and museum loads in Duke Energy Progress territory."
  },
  {
    "sampleUserId": "portland-food-coop-maine",
    "companyName": "Portland Food Co-op",
    "website": "https://www.portlandfood.coop/",
    "organizationType": "Commercial Business",
    "organizationSize": "51-250 employees",
    "siteAddress": "290 Congress Street, Portland, ME 04101, USA",
    "state": "ME",
    "electricUtilityProvider": "Central Maine Power",
    "gasUtilityProvider": "Unitil / Northern Utilities",
    "ownershipStatus": "Lease",
    "buildingType": "Grocery / Convenience / Cold Storage",
    "squareFootage": 10000,
    "primaryActivityText": "Retail grocery sales, local food merchandising, refrigerated foods, and prepared foods",
    "naicsCodes": [
      "445110"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Central Maine Power",
        "annualUsage": 430000,
        "annualCost": 64500,
        "averageUnitCost": 0.15,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "Unitil / Northern Utilities",
        "annualUsage": 16500,
        "annualCost": 24750,
        "averageUnitCost": 1.5,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "Portland Water District",
        "annualUsage": 850000,
        "annualCost": 6200,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      },
      {
        "utilityCategory": "waste",
        "utilityProvider": "ecomaine / Casella Waste Systems",
        "annualUsage": null,
        "annualCost": 20900,
        "averageUnitCost": null,
        "usageUnit": "USD"
      }
    ],
    "publicSourceNotes": "Portland Food Co-op lists 290 Congress Street in Portland. Floor area is estimated.",
    "notes": "Tests a cold-climate grocery in Central Maine Power territory with gas utility ambiguity after Maine gas-market changes."
  },
  {
    "sampleUserId": "phipps-conservatory-pittsburgh",
    "companyName": "Phipps Conservatory and Botanical Gardens",
    "website": "https://www.phipps.conservatory.org/",
    "organizationType": "Nonprofit Organization",
    "organizationSize": "51-250 employees",
    "siteAddress": "1 Schenley Park, Pittsburgh, PA 15213, USA",
    "state": "PA",
    "electricUtilityProvider": "Duquesne Light Company",
    "gasUtilityProvider": "Peoples Natural Gas",
    "ownershipStatus": "Not sure",
    "buildingType": "Public Institution",
    "squareFootage": 55500,
    "primaryActivityText": "Conservatory exhibits, greenhouse plant care, events, education, cafe operations, and visitor services",
    "naicsCodes": [
      "712130",
      "611710"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Duquesne Light Company",
        "annualUsage": 1800000,
        "annualCost": 216000,
        "averageUnitCost": 0.12,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "Peoples Natural Gas",
        "annualUsage": 120000,
        "annualCost": 126000,
        "averageUnitCost": 1.05,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "Pittsburgh Water and Sewer Authority",
        "annualUsage": 10000000,
        "annualCost": 53000,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      },
      {
        "utilityCategory": "waste",
        "utilityProvider": "Republic Services / conservatory contracted hauler",
        "annualUsage": null,
        "annualCost": 24050,
        "averageUnitCost": null,
        "usageUnit": "USD"
      }
    ],
    "publicSourceNotes": "Phipps is located at 1 Schenley Park and public venue profiles report about 55,500 square feet.",
    "notes": "Tests greenhouse and conservatory loads that differ from standard commercial HVAC because humidity and plant health drive operations."
  },
  {
    "sampleUserId": "boise-coop-north-end",
    "companyName": "Boise Co-op - North End",
    "website": "https://www.boise.coop/",
    "organizationType": "Commercial Business",
    "organizationSize": "51-250 employees",
    "siteAddress": "888 W Fort Street, Boise, ID 83702, USA",
    "state": "ID",
    "electricUtilityProvider": "Idaho Power",
    "gasUtilityProvider": "Intermountain Gas Company",
    "ownershipStatus": "Not sure",
    "buildingType": "Grocery / Convenience / Cold Storage",
    "squareFootage": 26000,
    "primaryActivityText": "Cooperative grocery retail, refrigerated food merchandising, prepared foods, and specialty retail",
    "naicsCodes": [
      "445110"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Idaho Power",
        "annualUsage": 1000000,
        "annualCost": 95000,
        "averageUnitCost": 0.095,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "Intermountain Gas Company",
        "annualUsage": 17000,
        "annualCost": 17850,
        "averageUnitCost": 1.05,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "City of Boise Public Works Utility Billing",
        "annualUsage": 1500000,
        "annualCost": 6800,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      },
      {
        "utilityCategory": "waste",
        "utilityProvider": "Republic Services",
        "annualUsage": null,
        "annualCost": 32200,
        "averageUnitCost": null,
        "usageUnit": "USD"
      }
    ],
    "publicSourceNotes": "Boise Co-op lists its North End store at 888 W Fort Street. Public history references about 26,000 square feet.",
    "notes": "Tests a grocery co-op in Idaho Power territory with separate gas utility and moderate floor area for prescriptive and custom measures."
  },
  {
    "sampleUserId": "common-ground-coop-urbana",
    "companyName": "Common Ground Food Co-op",
    "website": "https://www.commonground.coop/",
    "organizationType": "Commercial Business",
    "organizationSize": "11-50 employees",
    "siteAddress": "300 S Broadway Avenue, Suite 166, Urbana, IL 61801, USA",
    "state": "IL",
    "electricUtilityProvider": "Ameren Illinois",
    "gasUtilityProvider": "Ameren Illinois",
    "ownershipStatus": "Lease",
    "buildingType": "Grocery / Convenience / Cold Storage",
    "squareFootage": 8000,
    "primaryActivityText": "Retail grocery sales, refrigerated food merchandising, local food sales, and prepared-food operations",
    "naicsCodes": [
      "445110"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Ameren Illinois",
        "annualUsage": 285000,
        "annualCost": 33060,
        "averageUnitCost": 0.116,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "Ameren Illinois",
        "annualUsage": 7800,
        "annualCost": 8580,
        "averageUnitCost": 1.1,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "Illinois American Water / Urbana & Champaign Sanitary District",
        "annualUsage": 540000,
        "annualCost": 3200,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      },
      {
        "utilityCategory": "waste",
        "utilityProvider": "City of Urbana commercial waste program / contracted hauler",
        "annualUsage": null,
        "annualCost": 12800,
        "averageUnitCost": null,
        "usageUnit": "USD"
      }
    ],
    "publicSourceNotes": "Common Ground Food Co-op lists its store at 300 S Broadway Avenue, Suite 166. Floor area is estimated.",
    "notes": "Tests a grocery tenant in a shared building where Ameren remains the delivery utility despite competitive supply options."
  },
  {
    "sampleUserId": "trees-atlanta-kendeda-treehouse",
    "companyName": "Trees Atlanta - Kendeda TreeHouse",
    "website": "https://www.treesatlanta.org/",
    "organizationType": "Nonprofit Organization",
    "organizationSize": "11-50 employees",
    "siteAddress": "825 Warner Street SW, Suite A, Atlanta, GA 30310, USA",
    "state": "GA",
    "electricUtilityProvider": "Georgia Power",
    "gasUtilityProvider": "Atlanta Gas Light",
    "ownershipStatus": "Not sure",
    "buildingType": "Office / Administrative",
    "squareFootage": 22000,
    "primaryActivityText": "Urban forestry, education, volunteer operations, nonprofit administration, events, and landscape stewardship",
    "naicsCodes": [
      "813312",
      "611710"
    ],
    "projectStage": "exploring",
    "annualUtilitySummaries": [
      {
        "utilityCategory": "electric",
        "utilityProvider": "Georgia Power",
        "annualUsage": 240000,
        "annualCost": 30000,
        "averageUnitCost": 0.125,
        "usageUnit": "kWh"
      },
      {
        "utilityCategory": "gas",
        "utilityProvider": "Atlanta Gas Light",
        "annualUsage": 8200,
        "annualCost": 9400,
        "averageUnitCost": 1.146,
        "usageUnit": "therms"
      },
      {
        "utilityCategory": "water_sewer",
        "utilityProvider": "City of Atlanta Department of Watershed Management",
        "annualUsage": 2800000,
        "annualCost": 19000,
        "averageUnitCost": null,
        "usageUnit": "gallons"
      },
      {
        "utilityCategory": "waste",
        "utilityProvider": "Waste Management / local recycling hauler",
        "annualUsage": null,
        "annualCost": 9400,
        "averageUnitCost": null,
        "usageUnit": "USD"
      }
    ],
    "publicSourceNotes": "Trees Atlanta lists the Kendeda TreeHouse at 825 Warner Street SW. Public project information describes roughly 22,000 square feet.",
    "notes": "Tests nonprofit sustainability campus logic, Atlanta gas marketer confusion, and water-efficiency-heavy landscape measures."
  }
]
```

Return JSON only using this schema:
```json
{
  "schemaVersion": "retrofi_test_case_tax_document_updates.v1",
  "researchedAt": "2026-07-03",
  "source": "gpt_pro",
  "batchNumber": 3,
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
