You are helping RetroFi build a source-backed tax dataset and rule database.

Task name: Property tax assessor, millage, parcel, and exemption rule research
Research date: 2026-07-03

Rules:
- Use official government, utility, tax agency, assessor, treasurer, statutory, regulatory, or filed-tariff sources wherever possible.
- Prefer machine-readable official sources over third-party summaries.
- Do not invent rates, jurisdictions, formulas, or effective dates.
- If official data is not complete, mark the gap and state the safest user-facing behavior.
- Separate geography-derived facts from taxpayer/project-specific facts.
- Separate source confidence from estimate confidence.
- Return JSON only. No markdown outside the JSON object.
- Use source URLs and concise evidence text for every material claim.


Task:
Research official property-tax datasets and rules needed to estimate retrofit-related property-tax effects. Focus on official assessor/treasurer/taxing-district/parcel boundary sources and state/local exemption or special valuation rules.

Return a practical database-building plan. Do not try to list every county parcel file if impossible; classify states by whether centralized official data exists, local county/city research is required, or only assessor review is realistic.

Also research the current tax rules already in RetroFi:
```json
[
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

Return JSON only using this schema:
```json
{
  "schemaVersion": "retrofi_property_tax_dataset_rule_research.v1",
  "researchedAt": "2026-07-03",
  "source": "gpt_pro",
  "statePropertyTaxData": [
    {
      "state": "",
      "stateFips": "",
      "centralizedOfficialParcelData": "yes | partial | no | unknown",
      "centralizedOfficialAssessmentData": "yes | partial | no | unknown",
      "centralizedOfficialTaxRateOrMillageData": "yes | partial | no | unknown",
      "officialSources": [],
      "localAssessorResearchRequired": true,
      "commonJoinKeys": [],
      "effectiveDateHandling": "",
      "retrofitRelevantExemptionsOrSpecialValuations": [],
      "recommendedRetroFiTreatment": "calculate_from_official_data | needs_tax_bill | needs_assessor_review | suppress_until_review",
      "sourceConfidence": "high | medium | low"
    }
  ],
  "specificRuleRepairs": [],
  "normalizedRuleSchemaRecommendations": {},
  "requiredUserOrDocumentInputs": [],
  "refreshPlan": []
}
```
