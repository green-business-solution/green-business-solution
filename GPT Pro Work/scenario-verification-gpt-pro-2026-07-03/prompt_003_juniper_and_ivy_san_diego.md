You are helping RetroFi verify scenario construction for one test case.

Task: Scenario combination verification only.

Do not deeply recalculate formula math in this pass. A later pass will verify dollar math. This pass should decide whether RetroFi picked the right combination of opportunities for each retrofit, given the opportunities and scenario candidates in the packet.

Definitions:
- The selected scenario is RetroFi's current best scenario for a retrofit.
- Alternative scenarios are other combinations RetroFi considered.
- Matched opportunities are opportunities that matched the retrofit/user profile, including opportunities that may not have entered a scenario because no calculable rule/package existed.
- V2 package summaries explain whether repaired calculation packages were included, blocked by missing inputs, low confidence, human review, not user-facing by default, or unsupported.

Review goals:
1. Check whether each selected scenario is internally valid.
2. Check whether it includes two opportunities that should not stack together.
3. Check whether it excludes a compatible additive opportunity that should be included.
4. Check whether an alternative scenario should have been selected instead.
5. Check whether duplicate/overlapping opportunities are being double-counted.
6. Check whether missing stacking/conflict metadata or bad opportunity data prevents a reliable scenario decision.

Rules:
- Use only the packet below. Do not browse the web.
- Do not invent new source facts.
- If source facts are insufficient, mark the issue as a data gap instead of guessing.
- Keep math comments limited to obvious scenario-level inconsistencies, such as a selected scenario with lower first-year benefit than a listed compatible alternative. Do not verify individual formulas or rate tables.
- Return one JSON object only. No markdown outside JSON.

Return schema:
{
  "schemaVersion": "retrofi_scenario_combination_verification.v1",
  "reviewedBy": "gpt_pro",
  "testCaseId": "",
  "testCaseOrdinal": 3,
  "overallAssessment": "no_issues_found | issues_found | inconclusive_due_to_data_gaps",
  "findings": [
    {
      "retrofitTypeId": "",
      "retrofitDisplayName": "",
      "severity": "high | medium | low",
      "findingType": "invalid_stack | missing_compatible_opportunity | selected_not_optimal | duplicate_or_overlapping_opportunity | missing_required_dependency | excluded_opportunity_should_stay_excluded | no_calculable_scenario_but_should_have_one | data_gap_blocks_verification | no_issue",
      "selectedScenarioId": null,
      "affectedOpportunityIds": [],
      "affectedScenarioIds": [],
      "explanation": "",
      "recommendedRepair": "",
      "needsMathVerificationLater": false
    }
  ],
  "summary": {
    "retrofitsReviewed": 0,
    "highSeverityCount": 0,
    "mediumSeverityCount": 0,
    "lowSeverityCount": 0,
    "noIssueRetrofitCount": 0,
    "dataGapRetrofitCount": 0
  }
}

Packet 3 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 3,
  "sampleUserId": "juniper-and-ivy-san-diego",
  "description": "Independent San Diego restaurant and commercial kitchen in SDG&E distribution territory.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "commercial"
      ],
      "primaryActivityText": "Full-service restaurant operations with cooking, ventilation, refrigeration, dishwashing, and guest-service loads",
      "naicsCodes": [
        "722511"
      ],
      "organizationSize": "51-250 employees"
    },
    "site": {
      "address": {
        "raw": "2228 Kettner Boulevard, San Diego, CA 92101, USA",
        "stateCode": "CA",
        "zip5": "92101"
      },
      "geo": {
        "stateCode": "CA",
        "zip5": "92101",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "San Diego Gas & Electric",
          "distributionUtilityId": "UTIL_SDGE",
          "territoryCandidates": [
            "UTIL_SDGE"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "tenant",
      "buildingTypes": [
        "restaurant_foodservice"
      ],
      "squareFootage": {
        "value": 7580,
        "raw": "7,580",
        "parsingStatus": "parsed"
      }
    },
    "project": {
      "stage": "exploring",
      "alreadyPurchasedEquipment": null,
      "targetStartDate": null
    },
    "completeness": {
      "hasState": true,
      "hasZip": true,
      "hasUtility": true,
      "hasOrganizationType": true,
      "hasBuildingType": true,
      "hasSquareFootage": true
    }
  },
  "statusCounts": {
    "eligible": 33,
    "ineligible": 1486
  },
  "retrofitCount": 21,
  "retrofits": [
    {
      "retrofitTypeId": "ev_charger_installation",
      "displayName": "EV charger installation",
      "parentCategory": "ev_charging_transportation",
      "isPhysicalRetrofit": true,
      "opportunityCount": 8,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 848000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 0,
        "annualRecurringExpensesCents": 432000,
        "netAnnualRecurringSavingsCents": -432000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 8,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 8
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 848000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_15131",
          "opportunityName": "Power Your Drive for Fleets",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Utility Program",
          "administrator": "San Diego Gas & Electric",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric",
          "applicationUrl": "https://www.sdge.com/mdhd-interest-form",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match residential or personal light-duty EV charging.",
            "Do not treat this as an electric vehicle purchase rebate.",
            "Additional charger rebates are limited to eligible school bus, transit, disadvantaged community, or similar qualifying fleets under program terms."
          ],
          "hardRequirements": [
            "Project must be in SDG&E service territory.",
            "Applicant must commit to procure at least two Class 2 through Class 8 electric fleet vehicles.",
            "Customer must provide a long-term electrification plan and load increase schedule.",
            "Customer must provide charger usage data for at least five years.",
            "Customer must own or lease the property and operate and maintain the vehicles and chargers for the required program term.",
            "Customers buy, own, and maintain the chargers while SDG&E supports eligible make-ready infrastructure."
          ],
          "eligibleApplicantTypes": [
            "fleet_owners",
            "fleet_operators",
            "businesses",
            "public_agencies",
            "school_districts",
            "transit_agencies"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "public",
            "transportation",
            "fleet"
          ],
          "eligibleRetrofitCategories": [
            "fleet_charging_infrastructure",
            "make_ready_ev_charging_infrastructure",
            "ev_charger_installation",
            "dc_fast_ev_charger_installation"
          ],
          "evidenceText": "SDG&E describes make-ready infrastructure and eligible charger rebates for medium and heavy-duty fleet charging, with Class 2-8 vehicle, data-sharing, and long-term site-operation requirements.",
          "reasoningNotes": "The fleet EV charging infrastructure match is supported. The opportunity should not be generalized to residential EVSE, EV purchases, or non-fleet charging."
        },
        {
          "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
          "opportunityName": "GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant",
          "administrator": "California Energy Commission",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess",
          "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Opportunity explicitly has no electric utility restriction.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match to public light-duty corridor charging.",
            "Do not match to residential EV chargers or general workplace charging.",
            "Eligibility is lane-specific and tied to electric school-bus infrastructure."
          ],
          "hardRequirements": [
            "Application must be submitted through ECAMS.",
            "Solicitation deadline is August 31, 2026 at 11:59 p.m.",
            "Project must install EV charging infrastructure for electric school buses.",
            "Applicant must qualify under one of the solicitation funding lanes.",
            "Lane-specific eligibility for LEAs, prior HVIP school-bus awards, EnergIIZE status, or third-party school transportation service applies."
          ],
          "eligibleApplicantTypes": [
            "local_educational_agency",
            "third_party_school_transportation_provider"
          ],
          "eligibleSectors": [
            "education",
            "school_transportation",
            "clean_transportation"
          ],
          "eligibleRetrofitCategories": [
            "ev_charger_installation",
            "electric_school_bus_charging_infrastructure"
          ],
          "evidenceText": "CEC states GFO-25-605 provides up to $22 million for EV charging infrastructure serving electric school buses through LEA and school transportation funding lanes.",
          "reasoningNotes": "The EV charging match is valid only for electric school-bus charging infrastructure."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
          "opportunityName": "California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Competitive EV Infrastructure Grant",
          "administrator": "California Energy Commission and California Department of Transportation",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22629/california-national-electric-vehicle-infrastructure-nevi-formula-grant-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Does not support residential, private-only, or ordinary workplace charging unless it satisfies NEVI public access and site requirements.",
            "Does not fund vehicle purchase.",
            "Applicants must follow the active CEC grant solicitation rather than treating the program as an open rebate."
          ],
          "hardRequirements": [
            "Projects must meet California NEVI solicitation and federal NEVI requirements.",
            "Funding is for publicly accessible high-powered DC fast charging infrastructure.",
            "Applications for the current solicitation must be submitted through the required CEC system by the stated deadline.",
            "Charging sites must satisfy corridor, equipment, uptime, access, and other solicitation requirements."
          ],
          "eligibleApplicantTypes": [
            "public_entities",
            "private_entities",
            "site_hosts",
            "charging_station_developers"
          ],
          "eligibleSectors": [
            "transportation",
            "commercial",
            "public_sector"
          ],
          "eligibleRetrofitCategories": [
            "ev_charger_installation",
            "public_dc_fast_charging_station"
          ],
          "evidenceText": "California's NEVI solicitation supports publicly accessible high-powered DC fast charging infrastructure under a competitive grant program.",
          "reasoningNotes": "The EV charger installation match is valid, but matching should be limited to public DC fast-charging infrastructure that meets NEVI solicitation requirements."
        },
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:teas_sdge_com",
          "opportunityName": "Transportation Electrification Advisory Services (TEAS)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Technical Assistance",
          "administrator": "San Diego Gas & Electric",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric",
          "applicationUrl": "https://teas.sdge.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification, business_support, demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "TEAS is advisory technical assistance, not a direct EV charger installation rebate.",
            "Do not match as physical ev_charger_installation unless the match engine distinguishes advisory services from funded installation.",
            "Residential EV charger incentives are separate."
          ],
          "hardRequirements": [
            "Customer must engage through SDG&E's TEAS portal or business EV program.",
            "Service provides an advisor to develop personalized electrification strategies for the customer's fleet.",
            "Actual equipment installation, funding, and interconnection are governed by separate programs or utility processes."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "fleet_operator",
            "commercial_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "fleet",
            "public_sector"
          ],
          "eligibleRetrofitCategories": [
            "fleet_electrification_planning",
            "ev_charging_advisory_services",
            "ev_charging_site_planning"
          ],
          "evidenceText": "SDG&E]( describes TEAS as advisor collaboration to develop personalized electrification strategies for a customer's fleet.",
          "reasoningNotes": "EV charging is related, but the deterministic physical installation match should be narrowed to advisory and site-planning services."
        },
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_16456",
          "opportunityName": "Charge with lower pricing",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rate Plan",
          "administrator": "SDG&E",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric",
          "applicationUrl": "https://www.sdge.com/business/electric-vehicles/power-your-drive-for-fleets/ev-hp",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, business_support, demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Does not provide a rebate or incentive for EV charger installation.",
            "Does not pay for vehicle purchase.",
            "Do not match as a physical retrofit; it is an electric rate plan."
          ],
          "hardRequirements": [
            "Customer must qualify for SDG&E's EV-HP or applicable EV charging rate.",
            "Rate applies to eligible EV charging load and subscription or pricing requirements.",
            "Eligibility depends on customer equipment, account configuration, and SDG&E rate rules."
          ],
          "eligibleApplicantTypes": [
            "eligible_ev_charging_customers",
            "fleet_customers",
            "business_customers"
          ],
          "eligibleSectors": [
            "transportation",
            "commercial"
          ],
          "eligibleRetrofitCategories": [
            "ev_charging_rate_plan"
          ],
          "evidenceText": "SDG&E describes EV-HP as a lower-pricing EV charging rate option for eligible EV charging customers, including fleet charging use cases.",
          "reasoningNotes": "The original EV charger installation match is a false positive. The opportunity should be represented as an EV charging rate plan only."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22278",
          "opportunityName": "Azusa Light & Water - EV Charger Rebate",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "Azusa Light & Water",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22278/azusa-light-and-water-ev-charger-rebate",
          "applicationUrl": "https://www.azusaca.gov/DocumentCenter/View/47059/Final-ES-and-Weatherization-Application-Form-08022023",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Current official rebate form verifies an electric vehicle charger rebate but does not state DC fast charging eligibility.",
            "Current official application does not clearly state Level 2 specificity; do not preserve Level 2 matching unless independently verified in current terms.",
            "Azusa public charging station listings are separate city charging services, not customer charger rebates.",
            "Projects outside Azusa Light & Water service addresses should not match."
          ],
          "hardRequirements": [
            "Applicant must have an Azusa Light & Water account and qualifying service address.",
            "Application must include paid receipts or invoices dated within the program deadline.",
            "Required product and efficiency documentation must be submitted.",
            "Limit is one EV charger rebate per residence per year.",
            "Rebate cannot exceed product cost and is subject to available funding."
          ],
          "eligibleApplicantTypes": [
            "residential_customer"
          ],
          "eligibleSectors": [
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "ev_charger_installation",
            "residential_ev_charger"
          ],
          "evidenceText": "Azusa's current rebate application lists an Electric Vehicle Charger rebate with a one-per-residence-per-year limit, account and service-address requirements, receipt requirements, and funding limits.",
          "reasoningNotes": "Repair to generic residential EV charger because current official application verifies the charger rebate but not Level 2 specificity."
        },
        {
          "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
          "opportunityName": "GFO-25-603 - California’s National Electric Vehicle Infrastructure Formula Program – Solicitation 6 Community Charging",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant",
          "administrator": "California Energy Commission",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
          "applicationUrl": "https://ecams.energy.ca.gov/s/login/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Opportunity explicitly has no electric utility restriction.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match to residential EV chargers.",
            "Do not match to workplace-only or fleet-only Level 2 charging unless allowed by the solicitation.",
            "This is a corridor and community DC fast charging solicitation, not a generic EV charger rebate."
          ],
          "hardRequirements": [
            "Application must be submitted through ECAMS.",
            "Solicitation deadline is October 16, 2026 at 11:59 p.m.",
            "Project must deploy publicly accessible high-powered DC fast charging.",
            "Project must support light-duty EV travel along major corridors.",
            "NEVI station, connector, power, corridor, and federal program requirements apply."
          ],
          "eligibleApplicantTypes": [],
          "eligibleSectors": [
            "transportation",
            "public_ev_charging",
            "light_duty_ev_charging"
          ],
          "eligibleRetrofitCategories": [
            "ev_charger_installation",
            "dc_fast_charging_station",
            "public_ev_charging_infrastructure"
          ],
          "evidenceText": "CEC says GFO-25-603 offers up to $79 million for publicly accessible high-powered DC fast charging stations supporting light-duty EV travel along major corridors.",
          "reasoningNotes": "The EV charging match is source-backed and should be narrowed to NEVI public DC fast charging infrastructure; applicant-type details should be validated against the solicitation manual."
        },
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891",
          "opportunityName": "National Electric Vehicle Infrastructure (NEVI) Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Technical Assistance",
          "administrator": "SDG&E",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric",
          "applicationUrl": "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not treat SDG&E’s page as a direct utility rebate for chargers.",
            "Do not match residential chargers or Level 2-only workplace chargers.",
            "Do not match outside California NEVI solicitation requirements even if the customer is in SDG&E territory."
          ],
          "hardRequirements": [
            "Applicants seeking funding must apply through the California Energy Commission NEVI solicitation, not an SDG&E rebate form.",
            "Projects must meet California NEVI requirements for publicly accessible high-powered DC fast charging along eligible corridors.",
            "CEC GFO-25-603 submissions are due October 16, 2026."
          ],
          "eligibleApplicantTypes": [
            "business_owner",
            "site_host",
            "charging_station_developer",
            "public_private_partnership"
          ],
          "eligibleSectors": [
            "transportation",
            "commercial",
            "public_private_partnership"
          ],
          "eligibleRetrofitCategories": [
            "dc_fast_ev_charger",
            "ev_charger_installation",
            "nevi_application_support"
          ],
          "evidenceText": "SDG&E]( describes support for businesses pursuing NEVI opportunities, while the California Energy Commission’s 2026 solicitation funds publicly accessible high-powered DC fast charging with submissions due October 16, 2026.",
          "reasoningNotes": "The EV charging match is valid, but the SDG&E opportunity is technical assistance and application support; the actual funding is the CEC-administered NEVI solicitation."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22278",
          "programName": "Azusa Light & Water - EV Charger Rebate",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "unit_count",
            "eligible_product_cost",
            "residence_identifier",
            "purchase_receipt",
            "utility_account_number"
          ],
          "defaultedInputs": [
            {
              "inputKey": "eligible_product_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "residence_identifier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "purchase_receipt",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "utility_account_number",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 15000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_43dd5492e4176a08",
              "effectType": "one_time_savings",
              "calculationMethod": "fixed_amount",
              "valueModelKind": "fixed_amount",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 15000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_15131",
          "programName": "Power Your Drive for Fleets",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "charger_cost",
            "charger_output_kw",
            "charger_count",
            "eligible_fleet_site_category",
            "class_2_to_8_vehicle_commitment",
            "charger_kw",
            "eligible_site_category",
            "make_ready_ownership_option",
            "eligible_make_ready_cost",
            "site_design_scope",
            "utility_approval",
            "fleet_electrification_plan",
            "make_ready_cost",
            "approved_site_scope"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_count",
              "source": "derived_or_placeholder_quantity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "charger_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_fleet_site_category",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "class_2_to_8_vehicle_commitment",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_site_category",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "make_ready_ownership_option",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_make_ready_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_design_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "utility_approval",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "fleet_electrification_plan",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "make_ready_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "approved_site_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 480000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_fef6e333e43c3fd0",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "hybrid_rate_plus_cap",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_financing_subsidy_2_72cf31805713d39c",
              "effectType": "financing_subsidy",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "process_value",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 480000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
          "programName": "California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "low_confidence",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [
            {
              "inputKey": "award_probability",
              "effectId": "effect_grant_expected_value_1_c93b27f2d9d796eb",
              "label": "award_probability"
            }
          ],
          "requiredInputs": [
            "solicitation_number",
            "eligible_project_cost",
            "requested_grant_amount",
            "match_funding",
            "dcfc_site_and_corridor_compliance",
            "award_selection_status",
            "solicitation_specific_caps"
          ],
          "defaultedInputs": [
            {
              "inputKey": "solicitation_number",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "requested_grant_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "match_funding",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dcfc_site_and_corridor_compliance",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "award_selection_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "solicitation_specific_caps",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_grant_expected_value_1_c93b27f2d9d796eb",
              "effectType": "grant_expected_value",
              "calculationMethod": "expected_value",
              "valueModelKind": "competitive_cost_share",
              "cashValueClassification": "cash_grant",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": [
                "award_probability"
              ]
            }
          ]
        },
        {
          "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
          "programName": "GFO-25-603 - California's National Electric Vehicle Infrastructure Formula Program - Solicitation 6 Community Charging",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "low_confidence",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [
            {
              "inputKey": "award_probability",
              "effectId": "effect_grant_expected_value_1_42355de1814a8757",
              "label": "award_probability"
            }
          ],
          "requiredInputs": [
            "allowable_project_cost",
            "requested_grant_amount",
            "match_funding_amount",
            "number_of_dcfc_ports",
            "cost_per_ccs_port",
            "award_selection_status",
            "number_of_ccs_ports"
          ],
          "defaultedInputs": [
            {
              "inputKey": "requested_grant_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "award_selection_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "allowable_project_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "match_funding_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "number_of_dcfc_ports",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "cost_per_ccs_port",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "number_of_ccs_ports",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_grant_expected_value_1_42355de1814a8757",
              "effectType": "grant_expected_value",
              "calculationMethod": "expected_value",
              "valueModelKind": "competitive_cost_share",
              "cashValueClassification": "cash_grant",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": [
                "award_probability"
              ]
            }
          ]
        },
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891",
          "programName": "National Electric Vehicle Infrastructure (NEVI) Program",
          "calculationStatus": "non_monetary_workflow",
          "runtimeInclusionStatus": "non_monetary_workflow",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [
            {
              "inputKey": "award_probability",
              "effectId": "effect_grant_expected_value_2_78ea28615e9acd08",
              "label": "award_probability"
            }
          ],
          "requiredInputs": [
            "sdge_service_area_site",
            "nevi_corridor_group",
            "project_concept",
            "cec_solicitation_application",
            "site_nevi_fit",
            "application_status",
            "eligible_project_cost",
            "cec_application_score_or_award",
            "nevi_corridor_site",
            "approved_cost_share",
            "dc_fast_charger_scope",
            "award_selection_probability",
            "approved_award_amount",
            "eligible_project_cost_cents"
          ],
          "defaultedInputs": [
            {
              "inputKey": "sdge_service_area_site",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "nevi_corridor_group",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "project_concept",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "cec_solicitation_application",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_nevi_fit",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "application_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "cec_application_score_or_award",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "nevi_corridor_site",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "approved_cost_share",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dc_fast_charger_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "award_selection_probability",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "approved_award_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_process_value_1_cf6d168f0142b014",
              "effectType": "process_value",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "non_cash_technical_assistance",
              "cashValueClassification": "technical_assistance",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_grant_expected_value_2_78ea28615e9acd08",
              "effectType": "grant_expected_value",
              "calculationMethod": "expected_value",
              "valueModelKind": "competitive_cost_share",
              "cashValueClassification": "cash_grant",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": [
                "award_probability"
              ]
            }
          ]
        },
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_16456",
          "programName": "Charge with lower pricing",
          "calculationStatus": "non_monetary_workflow",
          "runtimeInclusionStatus": "non_monetary_workflow",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "ev_charging_kwh_by_tou_period",
            "monthly_subscription_level_kw",
            "otherwise_applicable_rate",
            "bundled_or_cca_generation_status",
            "season",
            "demand_profile",
            "subscription_level_kw"
          ],
          "defaultedInputs": [
            {
              "inputKey": "ev_charging_kwh_by_tou_period",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "monthly_subscription_level_kw",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "otherwise_applicable_rate",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "bundled_or_cca_generation_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "season",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "demand_profile",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "subscription_level_kw",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_recurring_savings_1_d2a595bebbfb6e5f",
              "effectType": "recurring_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "tariff_or_rate",
              "cashValueClassification": "tariff_or_rate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
          "programName": "GFO-25-605 - Reliable Electric Charging for Eligible School-bus Sites (RECESS)",
          "calculationStatus": "no_calculable_value",
          "runtimeInclusionStatus": "no_calculable_value",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [
            {
              "inputKey": "award_probability",
              "effectId": "effect_grant_expected_value_1_9badcea914d6d42f",
              "label": "award_probability"
            }
          ],
          "requiredInputs": [
            "funding_lane",
            "eligible_project_cost",
            "number_and_type_of_charging_ports",
            "electric_school_bus_deployment_details",
            "lea_or_transportation_provider_pathway",
            "first_come_status_or_application_score",
            "award_probability",
            "number_of_l2_ports",
            "number_of_dual_port_dcfc_or_bidirectional_dcfc",
            "lane_specific_cap",
            "first_come_status_or_award_decision"
          ],
          "defaultedInputs": [
            {
              "inputKey": "funding_lane",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "number_and_type_of_charging_ports",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "electric_school_bus_deployment_details",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "lea_or_transportation_provider_pathway",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "first_come_status_or_application_score",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "award_probability",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "number_of_l2_ports",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "number_of_dual_port_dcfc_or_bidirectional_dcfc",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "lane_specific_cap",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "first_come_status_or_award_decision",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_grant_expected_value_1_9badcea914d6d42f",
              "effectType": "grant_expected_value",
              "calculationMethod": "expected_value",
              "valueModelKind": "hybrid_rate_plus_cap",
              "cashValueClassification": "cash_grant",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": [
                "award_probability"
              ]
            }
          ]
        },
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:teas_sdge_com",
          "programName": "Transportation Electrification Advisory Services (TEAS)",
          "calculationStatus": "non_monetary_workflow",
          "runtimeInclusionStatus": "non_monetary_workflow",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "sdg_e_business_customer_status",
            "fleet_details",
            "electrification_planning_needs"
          ],
          "defaultedInputs": [
            {
              "inputKey": "sdg_e_business_customer_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "fleet_details",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "electrification_planning_needs",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_process_value_1_8ea283b54624171e",
              "effectType": "process_value",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "non_cash_process_value",
              "cashValueClassification": "technical_assistance",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 7,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 798000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 72000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 72000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 3,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 3
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 798000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:comfortablyca_com",
          "opportunityName": "Comfortably CA",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate",
          "administrator": "SDG&E and CLEAResult for participating California investor-owned utilities",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.sdge.com/business/save-energy-and-money",
          "applicationUrl": "https://www.comfortablyca.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "No direct customer rebate is offered by Comfortably CA.",
            "Do not match non-HVAC measures such as insulation, windows, lighting, refrigeration, or water heaters.",
            "Only listed qualifying HVAC product types should match."
          ],
          "hardRequirements": [
            "Incentives are provided through eligible distributors and market actors, not as direct customer rebates.",
            "Equipment must meet Comfortably CA qualifying product and utility documentation requirements.",
            "Program funds are first-come, first-served and may be changed or terminated."
          ],
          "eligibleApplicantTypes": [
            "hvac_distributor",
            "hvac_contractor",
            "manufacturer",
            "retailer"
          ],
          "eligibleSectors": [
            "commercial",
            "residential"
          ],
          "eligibleRetrofitCategories": [
            "high_efficiency_hvac_replacement",
            "commercial_air_cooled_air_conditioner",
            "commercial_heat_pump_air_conditioner",
            "commercial_space_heating_boiler",
            "air_cooled_screw_chiller",
            "residential_heat_pump",
            "high_efficiency_furnace"
          ],
          "evidenceText": "Comfortably]( CA provides incentives and training for market actors selling qualifying high-efficiency HVAC equipment; its FAQ states there are no direct customer rebates.",
          "reasoningNotes": "The high-efficiency HVAC match is supported, but the applicant and payment path must be modeled as distributor or contractor-facing rather than customer-facing."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        },
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdenergyedge_com",
          "opportunityName": "SD Energy Edge",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Business Rebate And Custom Incentive Program",
          "administrator": "San Diego Gas & Electric / TRC",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.sdge.com/business/save-energy-and-money",
          "applicationUrl": "https://sdenergyedge.com/apply-now/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, commercial_kitchen."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match indoor LED lighting; the application page states SD Energy Edge does not offer rebates for indoor LED lighting.",
            "Do not infer residential rebates from this business program.",
            "Financing is described as an option but should not be treated as the rebate itself."
          ],
          "hardRequirements": [
            "Customer must be an eligible SDG&E business customer.",
            "Custom incentives require preapproval before purchase, installation, or operation.",
            "Rebate funds are limited and available on a first-come basis.",
            "Equipment must meet SD Energy Edge rebate specifications."
          ],
          "eligibleApplicantTypes": [
            "business_customers",
            "commercial_facility_owners",
            "industrial_facility_owners",
            "public_agencies",
            "agricultural_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "public",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "commercial_hvac_unit_replacement",
            "heat_pump_hvac_retrofit",
            "exterior_led_lighting_retrofit",
            "commercial_heat_pump_water_heater_retrofit",
            "tankless_water_heater_retrofit",
            "hot_water_pipe_tank_insulation",
            "commercial_refrigeration_controls",
            "refrigerated_case_door_retrofit",
            "variable_speed_drive_retrofit",
            "pool_heater_retrofit",
            "pool_cover",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "SD]( Energy Edge lists business rebates for qualifying HVAC units, outdoor Type B LED lighting, water-heating, refrigeration, VSD, and custom efficiency projects.",
          "reasoningNotes": "The HVAC match is valid only for qualifying commercial equipment. The LED match must be narrowed to eligible outdoor or specified Type B LED measures, not broad indoor LED lighting."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22067",
          "opportunityName": "Plumas-Sierra REC - Commercial and Irrigation Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial And Irrigation Rebate Program",
          "administrator": "Plumas-Sierra Rural Electric Cooperative",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22067/plumas-sierra-rec-commercial-and-irrigation-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, water_efficiency, commercial_kitchen."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential heat pump water heater and other residential rebate pages are separate and should not match this commercial and irrigation opportunity.",
            "Do not infer broad water conservation or irrigation pump replacement unless the current PSREC commercial or irrigation form supports it.",
            "Official pages returned 403 in the browser, so measure details should be rechecked before final payment matching."
          ],
          "hardRequirements": [
            "Applicant must be a Plumas-Sierra Rural Electric Cooperative commercial or irrigation customer.",
            "Equipment must be in an eligible commercial or irrigation rebate category and meet the applicable rebate form requirements.",
            "Detailed incentive amounts and documentation requirements must be checked on the current rebate form before approval."
          ],
          "eligibleApplicantTypes": [
            "commercial_customer",
            "irrigation_customer",
            "agricultural_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "agricultural",
            "irrigation"
          ],
          "eligibleRetrofitCategories": [
            "commercial_heat_pump_hvac",
            "high_efficiency_commercial_hvac",
            "heat_pump_water_heater",
            "led_lighting_retrofit",
            "commercial_lighting_retrofit",
            "commercial_kitchen_foodservice_equipment",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Official PSREC search snippets identify commercial lighting, custom projects, commercial HVAC, commercial heat pump water heater, and commercial kitchen or food-service equipment rebate pages.",
          "reasoningNotes": "Current official PSREC pages were present in search results but returned 403 when opened. Categories are therefore kept only where official snippets identified the current rebate page."
        },
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_589",
          "opportunityName": "San Diego LEARN Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Training And Workforce Development",
          "administrator": "San Diego Gas & Electric",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.sdge.com/business/savings-center/business-winter-savings-safety-and-solutions",
          "applicationUrl": "https://www.sandiegolearn.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: energy_efficiency, hvac."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match high-efficiency HVAC replacement as an incentive or rebate.",
            "Do not match lighting, electrification, or building-performance topics as funded retrofit measures.",
            "Do not infer no-cost equipment, financing, or rebates from this LEARN training record.",
            "Separate SDG&E efficiency, financing, or small-business programs must be matched as separate opportunities."
          ],
          "hardRequirements": [
            "Participant must enroll in free LEARN classes or webinars through the program portal.",
            "Program provides training, courses, and certifications rather than direct equipment incentives."
          ],
          "eligibleApplicantTypes": [
            "business_customer",
            "contractor",
            "trade_professional",
            "workforce_participant",
            "student"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "workforce_development"
          ],
          "eligibleRetrofitCategories": [],
          "evidenceText": "SDG&E]( describes LEARN as free energy-efficiency and electrification courses, live webinars and online courses; topics include commercial/industrial, HVAC, lighting and building performance, but not equipment rebates.",
          "reasoningNotes": "No physical retrofit category should be attached; the original HVAC replacement match is a false positive caused by training-topic language."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3527",
          "opportunityName": "Local Option - Municipal Energy Districts",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Pace Financing",
          "administrator": "Local PACE program administrators regulated by the California Department of Financial Protection and Innovation",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3527/local-option-municipal-energy-districts",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, solar, building_envelope, energy_efficiency, renewable_energy, fuel_cell_system, clean_transportation, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is PACE financing, not a rebate.",
            "Do not treat DSIRE technology terms as direct product rebates; measure eligibility is administrator and jurisdiction specific.",
            "Cosmetic or nonqualifying add-ons such as cabinets, tile, countertops and conversions should not match.",
            "Geothermal, HVAC or insulation product matches should be represented as financing only unless a specific PACE administrator list verifies the measure."
          ],
          "hardRequirements": [
            "Property must be in a participating California jurisdiction or special assessment district.",
            "Financing is repaid through a property tax assessment and creates a property lien.",
            "PACE administrator and solicitor requirements, licensing, disclosures and ability-to-pay rules apply.",
            "Eligible measure scope depends on the local PACE program and administrator.",
            "Property owner should confirm sale, refinance, tax and foreclosure implications before proceeding."
          ],
          "eligibleApplicantTypes": [
            "property_owners",
            "homeowners",
            "commercial_property_owners",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "pace_financing",
            "energy_efficiency_financing",
            "renewable_energy_financing",
            "water_efficiency_financing",
            "commercial_pace_financing",
            "solar_pv_financing",
            "battery_storage_financing",
            "building_envelope_financing",
            "hvac_financing",
            "lighting_financing",
            "water_heating_efficiency_financing"
          ],
          "evidenceText": "California PACE sources describe property-tax-assessment financing for energy, water and other qualifying improvements; C-PACE materials cite renewable energy, storage, envelope, HVAC, lighting and water measures.",
          "reasoningNotes": "Converted product-specific matches into financing categories and retained battery only as C-PACE financing, not as a direct incentive."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:676",
          "opportunityName": "Modified Accelerated Cost-Recovery System (MACRS)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Depreciation / Tax Cost Recovery",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs",
          "applicationUrl": "https://www.irs.gov/forms-pubs/about-form-4562",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, solar, renewable_energy, biomass_biogas, wood_heating, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is tax cost recovery, not a rebate, grant, or direct incentive.",
            "Do not match personal residential homeowner projects that are not depreciable property.",
            "Generic LED lighting, ordinary HVAC replacement, and building weatherization are not specially supported clean-energy MACRS categories for this opportunity."
          ],
          "hardRequirements": [
            "Property must be depreciable business or income-producing property owned by the taxpayer.",
            "Post-2024 five-year MACRS treatment is tied to qualified clean electricity facilities, qualified clean energy property, and energy storage technology under current IRS rules.",
            "Taxpayer claims depreciation using applicable IRS depreciation forms and records.",
            "Eligibility depends on placed-in-service date, construction date, tax basis, and current Internal Revenue Code requirements."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayers",
            "owners_of_depreciable_property"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "qualified_clean_energy_property",
            "clean_electricity_generation_property",
            "energy_storage_technology",
            "geothermal_energy_property",
            "combined_heat_and_power_system",
            "biomass_biogas_energy_system",
            "solar_water_heating_system",
            "small_wind_turbine"
          ],
          "evidenceText": "IRS]( cost-recovery guidance supports five-year MACRS for qualified clean energy facilities, qualified clean energy property and energy storage technology, with depreciation claimed by owners of eligible property.",
          "reasoningNotes": "Legacy DSIRE technology terms should not be treated as a rebate menu. Current matching should focus on depreciable qualified clean energy property and exclude generic efficiency retrofits."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22067",
          "programName": "Plumas-Sierra REC - Commercial and Irrigation Rebate Program",
          "calculationStatus": "source_inaccessible_repair_failure",
          "runtimeInclusionStatus": "source_inaccessible_repair_failure",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "current_psrec_rebate_form",
            "equipment_type",
            "unit_quantity",
            "project_cost",
            "commercial_or_irrigation_account_status",
            "installation_documentation",
            "current_form_amount",
            "measure_tier",
            "documentation_requirements"
          ],
          "defaultedInputs": [
            {
              "inputKey": "current_psrec_rebate_form",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_quantity",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "commercial_or_irrigation_account_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "installation_documentation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "current_form_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "documentation_requirements",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_8ac3100d74bc3c6c",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "source_inaccessible",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdenergyedge_com",
          "programName": "SD Energy Edge",
          "calculationStatus": "estimate_from_range",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "equipment_capacity_or_quantity",
            "configuration_or_efficiency_tier",
            "eligible_project_cost_cents",
            "preapproval_status_for_custom"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_capacity_or_quantity",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "configuration_or_efficiency_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "preapproval_status_for_custom",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_9688dc7e7063f804",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "rate_table",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:comfortablyca_com",
          "programName": "Comfortably CA",
          "calculationStatus": "custom_quote_estimate",
          "runtimeInclusionStatus": "custom_quote_estimate",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "participating_distributor",
            "qualified_product",
            "contractor_quote",
            "distributor_pass_through_amount",
            "utility_territory",
            "pass_through_amount",
            "market_actor_role",
            "participation_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "participating_distributor",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "qualified_product",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "contractor_quote",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "distributor_pass_through_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "utility_territory",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "pass_through_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "market_actor_role",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "participation_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_b69cab2ca0999814",
              "effectType": "one_time_savings",
              "calculationMethod": "custom_quote",
              "valueModelKind": "custom_quote",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_process_value_2_ff9ae1f418fa4b46",
              "effectType": "process_value",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "non_cash_process_value",
              "cashValueClassification": "technical_assistance",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "automated_demand_response_controls",
      "displayName": "Automated demand response controls",
      "parentCategory": "building_controls_energy_management",
      "isPhysicalRetrofit": true,
      "opportunityCount": 3,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 212000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 270000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 270000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 212000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_19551",
          "opportunityName": "Emergency Load Reduction Program (ELRP)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Demand Response Performance Incentive",
          "administrator": "San Diego Gas & Electric",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response",
          "applicationUrl": "https://app.olivineinc.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is not an equipment rebate for automated demand response controls or energy management systems.",
            "No specific physical retrofit is required; any eligible operational or technology approach may be used to reduce load.",
            "Residential-only measures and general efficiency retrofits should not match this business demand response program."
          ],
          "hardRequirements": [
            "Customer must nominate at least 1 kW of load reduction.",
            "Events occur during emergency load reduction periods and incentives are based on verified kWh load reduction.",
            "Participants may not already be enrolled in another supply-side demand response program unless program rules allow it.",
            "Participation is voluntary and subject to ELRP terms and conditions."
          ],
          "eligibleApplicantTypes": [
            "nonresidential_electric_customers",
            "commercial_customers",
            "industrial_customers",
            "agricultural_customers",
            "demand_response_aggregators"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "demand_response_program_enrollment",
            "verified_load_reduction"
          ],
          "evidenceText": "SDG&E ELRP pays eligible nonresidential customers for verified emergency load reduction and does not provide a rebate for controls or EMS equipment.",
          "reasoningNotes": "Replace automated controls and EMS retrofit matches with demand response enrollment and verified load reduction categories."
        },
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_13556",
          "opportunityName": "Demand Response Programs",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Demand Response",
          "administrator": "San Diego Gas & Electric",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.sdge.com/business/savings-center/business-winter-savings-safety-and-solutions",
          "applicationUrl": "https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is not an automated demand response controls rebate.",
            "No source-backed incentive for installing controls was found on the demand response page.",
            "Energy efficiency equipment retrofits are separate from demand response participation.",
            "Third-party provider participation is governed by separate provider agreements and tariff rules."
          ],
          "hardRequirements": [
            "Customer must be an eligible SDG&E business electric customer.",
            "Customer must enroll in the applicable demand response option or through an approved third-party provider.",
            "Customer must be able to reduce or shift electric use during called events.",
            "Specific eligibility, notification, and incentive terms vary by demand response program."
          ],
          "eligibleApplicantTypes": [
            "business_electric_customer",
            "commercial_electric_customer",
            "industrial_electric_customer",
            "third_party_demand_response_provider_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial"
          ],
          "eligibleRetrofitCategories": [
            "demand_response_enrollment",
            "capacity_bidding_program",
            "emergency_load_reduction",
            "critical_peak_pricing"
          ],
          "evidenceText": "SDG&E presents business demand response options including capacity bidding, emergency load reduction, pricing events, and third-party demand response providers.",
          "reasoningNotes": "The deterministic demand response text match is correct, but it should not imply physical automated controls are funded or required."
        },
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_555",
          "opportunityName": "Capacity Bidding Program (CBP)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Demand Response",
          "administrator": "SDG&E",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response",
          "applicationUrl": "https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response/capacity-bidding-program",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This program pays for demand response participation, not energy management system installation.",
            "Automated demand response controls may help a site participate but are not directly rebated by this opportunity.",
            "Residential customers are not eligible.",
            "Do not match general building controls retrofits unless the opportunity data model separately represents demand response enrollment."
          ],
          "hardRequirements": [
            "Customer must be on an eligible nonresidential SDG&E rate schedule.",
            "Customer must commit to reduce load during Capacity Bidding Program demand response events.",
            "Participants generally enroll through an approved third-party aggregator or self-aggregate with SDG&E.",
            "Program events occur during defined demand response seasons and event windows."
          ],
          "eligibleApplicantTypes": [
            "nonresidential_electric_customers",
            "commercial_customers",
            "industrial_customers",
            "agricultural_customers",
            "demand_response_aggregators"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "demand_response_participation"
          ],
          "evidenceText": "SDG&E describes CBP as a nonresidential demand response program that pays businesses for committed load reduction during events.",
          "reasoningNotes": "The original control-system retrofit matches overstate the program. It should be treated as demand response participation, not an equipment rebate."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "battery_storage_system",
      "displayName": "Battery storage system",
      "parentCategory": "energy_storage_resilience",
      "isPhysicalRetrofit": true,
      "opportunityCount": 4,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 7280000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 360000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 360000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 7280000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:552",
          "opportunityName": "Self-Generation Incentive Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "California Public Utilities Commission",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/552/self-generation-incentive-program",
          "applicationUrl": "https://www.selfgenca.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standalone rooftop solar PV is not a general SGIP rebate; solar is supported only where paired with storage under the applicable equity offering.",
            "Biogas is an adder or fuel condition for eligible generation, not a standalone biomass or biogas system rebate.",
            "Technologies not listed by SGIP or not in an available budget category should not match."
          ],
          "hardRequirements": [
            "Project must use qualifying distributed energy resources located on the customer side of the meter.",
            "Applications must be submitted through an approved SGIP developer or program administrator.",
            "Residential Solar and Storage Equity eligibility is limited to qualifying low-income residential customers and paired solar plus storage.",
            "Eligible projects must comply with SGIP technology, budget, incentive-step, and demand-response or operational requirements."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "non_residential_customer",
            "low_income_customer",
            "critical_facility",
            "developer"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "public",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "paired_solar_pv_and_battery_storage",
            "fuel_cell_system",
            "small_wind_turbine",
            "combined_heat_and_power_system",
            "waste_heat_to_power_system",
            "pressure_reduction_turbine",
            "linear_generator"
          ],
          "evidenceText": "CPUC]( and SGIP pages list customer-side distributed energy resources including advanced storage, wind, fuel cells, CHP-related generation, and paired solar plus storage for equity customers.",
          "reasoningNotes": "Keep storage and qualifying self-generation technologies. Remove standalone solar PV and broad biomass/biogas matching except when tied to specific eligible SGIP generation rules."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3527",
          "opportunityName": "Local Option - Municipal Energy Districts",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Pace Financing",
          "administrator": "Local PACE program administrators regulated by the California Department of Financial Protection and Innovation",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3527/local-option-municipal-energy-districts",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, solar, building_envelope, energy_efficiency, renewable_energy, fuel_cell_system, clean_transportation, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is PACE financing, not a rebate.",
            "Do not treat DSIRE technology terms as direct product rebates; measure eligibility is administrator and jurisdiction specific.",
            "Cosmetic or nonqualifying add-ons such as cabinets, tile, countertops and conversions should not match.",
            "Geothermal, HVAC or insulation product matches should be represented as financing only unless a specific PACE administrator list verifies the measure."
          ],
          "hardRequirements": [
            "Property must be in a participating California jurisdiction or special assessment district.",
            "Financing is repaid through a property tax assessment and creates a property lien.",
            "PACE administrator and solicitor requirements, licensing, disclosures and ability-to-pay rules apply.",
            "Eligible measure scope depends on the local PACE program and administrator.",
            "Property owner should confirm sale, refinance, tax and foreclosure implications before proceeding."
          ],
          "eligibleApplicantTypes": [
            "property_owners",
            "homeowners",
            "commercial_property_owners",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "pace_financing",
            "energy_efficiency_financing",
            "renewable_energy_financing",
            "water_efficiency_financing",
            "commercial_pace_financing",
            "solar_pv_financing",
            "battery_storage_financing",
            "building_envelope_financing",
            "hvac_financing",
            "lighting_financing",
            "water_heating_efficiency_financing"
          ],
          "evidenceText": "California PACE sources describe property-tax-assessment financing for energy, water and other qualifying improvements; C-PACE materials cite renewable energy, storage, envelope, HVAC, lighting and water measures.",
          "reasoningNotes": "Converted product-specific matches into financing categories and retained battery only as C-PACE financing, not as a direct incentive."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22615",
          "opportunityName": "Marin Clean Energy - Feed-In Tariff Plus",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Feed In Tariff",
          "administrator": "MCE Clean Energy",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22615/marin-clean-energy-feed-in-tariff-plus",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match behind-the-meter customer rooftop solar rebates or net-metering projects.",
            "Do not match standalone battery storage; storage is a required pairing for solar projects, not a separate storage rebate.",
            "Do not match ground-source geothermal heat pumps or solar water heating; this is a wholesale electricity feed-in tariff, not building HVAC or water heating.",
            "Do not match ordinary building retrofits."
          ],
          "hardRequirements": [
            "Projects must be 1 MW to 5 MW local renewable generation projects under MCE's feed-in tariff rules.",
            "Solar projects require paired storage sized to program requirements, including four-hour duration.",
            "Projects use standardized long-term power purchase agreements and must satisfy interconnection, site control, and deliverability requirements."
          ],
          "eligibleApplicantTypes": [
            "renewable_project_developer",
            "power_producer",
            "project_owner",
            "landowner"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "utility_scale",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "wholesale_solar_pv_generation_project",
            "solar_pv_plus_storage_generation_project",
            "wholesale_wind_generation_project",
            "wholesale_biomass_generation_project"
          ],
          "evidenceText": "MCE's]( feed-in tariff is a wholesale local renewable energy procurement program for 1 to 5 MW projects, with solar paired with storage requirements.",
          "reasoningNotes": "Storage is only valid as part of required solar-plus-storage project design. Geothermal heat pump and solar water heating matches are false positives."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22615",
          "programName": "Marin Clean Energy - Feed-In Tariff Plus",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "project_technology",
            "project_mw_ac",
            "accepted_fit_capacity_block",
            "delivered_mwh",
            "ppa_price",
            "interconnection_status",
            "storage_sizing_for_solar_projects",
            "accepted_ppa_price",
            "annual_delivered_mwh",
            "technology_type"
          ],
          "defaultedInputs": [
            {
              "inputKey": "project_technology",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "project_mw_ac",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "accepted_fit_capacity_block",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "delivered_mwh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ppa_price",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "interconnection_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "storage_sizing_for_solar_projects",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "accepted_ppa_price",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "annual_delivered_mwh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "technology_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_recurring_savings_1_bd374e5d89a7ca17",
              "effectType": "recurring_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "tariff_or_rate",
              "cashValueClassification": "tariff_or_rate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "ground_source_geothermal_heat_pump",
      "displayName": "Ground-source / geothermal heat pump",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 4,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 1576000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 112000,
        "annualRecurringExpensesCents": 64800,
        "netAnnualRecurringSavingsCents": 47200,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 1576000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2511",
          "opportunityName": "USDA - Rural Energy for America Program (REAP) Loan Guarantees",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Guarantee",
          "administrator": "USDA Rural Development",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees",
          "applicationUrl": "https://www.rd.usda.gov/programs-services/energy-programs/rural-energy-america-program-renewable-energy-systems-energy-efficiency-improvement-guaranteed-loans",
          "matchedReasons": [
            "Opportunity appears active.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, energy_efficiency, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential-only home retrofits for non-business applicants are not supported.",
            "Non-rural small businesses generally do not qualify unless an agricultural-production exception applies.",
            "Audit costs alone should not be matched as the funded retrofit unless tied to an eligible REAP project.",
            "Loan guarantees should not be treated as rebate incentives."
          ],
          "hardRequirements": [
            "Borrower must be an agricultural producer or rural small business eligible under USDA REAP rules.",
            "Guaranteed loan must finance a renewable energy system, energy-efficiency improvement, or eligible energy-efficient agricultural equipment.",
            "Rural-area requirements apply to small businesses, with specified exceptions for agricultural production.",
            "Energy-efficiency applications must include a qualifying audit or assessment.",
            "Federal debt, tax, judgment, and debarment restrictions apply."
          ],
          "eligibleApplicantTypes": [
            "agricultural_producer",
            "rural_small_business",
            "eligible_lender"
          ],
          "eligibleSectors": [
            "agricultural",
            "commercial",
            "rural_small_business"
          ],
          "eligibleRetrofitCategories": [
            "biomass_renewable_energy_system",
            "anaerobic_digester",
            "geothermal_energy_system",
            "ground_source_geothermal_heat_pump",
            "energy_efficiency_improvements"
          ],
          "evidenceText": "USDA]( REAP guaranteed loans finance renewable energy systems, including biomass and geothermal, and energy-efficiency improvements for agricultural producers and rural small businesses.",
          "reasoningNotes": "The biomass and geothermal matches are source-backed, but matching must enforce agricultural-producer or rural-small-business eligibility and loan-guarantee structure."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3527",
          "opportunityName": "Local Option - Municipal Energy Districts",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Pace Financing",
          "administrator": "Local PACE program administrators regulated by the California Department of Financial Protection and Innovation",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3527/local-option-municipal-energy-districts",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, solar, building_envelope, energy_efficiency, renewable_energy, fuel_cell_system, clean_transportation, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is PACE financing, not a rebate.",
            "Do not treat DSIRE technology terms as direct product rebates; measure eligibility is administrator and jurisdiction specific.",
            "Cosmetic or nonqualifying add-ons such as cabinets, tile, countertops and conversions should not match.",
            "Geothermal, HVAC or insulation product matches should be represented as financing only unless a specific PACE administrator list verifies the measure."
          ],
          "hardRequirements": [
            "Property must be in a participating California jurisdiction or special assessment district.",
            "Financing is repaid through a property tax assessment and creates a property lien.",
            "PACE administrator and solicitor requirements, licensing, disclosures and ability-to-pay rules apply.",
            "Eligible measure scope depends on the local PACE program and administrator.",
            "Property owner should confirm sale, refinance, tax and foreclosure implications before proceeding."
          ],
          "eligibleApplicantTypes": [
            "property_owners",
            "homeowners",
            "commercial_property_owners",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "pace_financing",
            "energy_efficiency_financing",
            "renewable_energy_financing",
            "water_efficiency_financing",
            "commercial_pace_financing",
            "solar_pv_financing",
            "battery_storage_financing",
            "building_envelope_financing",
            "hvac_financing",
            "lighting_financing",
            "water_heating_efficiency_financing"
          ],
          "evidenceText": "California PACE sources describe property-tax-assessment financing for energy, water and other qualifying improvements; C-PACE materials cite renewable energy, storage, envelope, HVAC, lighting and water measures.",
          "reasoningNotes": "Converted product-specific matches into financing categories and retained battery only as C-PACE financing, not as a direct incentive."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:676",
          "opportunityName": "Modified Accelerated Cost-Recovery System (MACRS)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Depreciation / Tax Cost Recovery",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs",
          "applicationUrl": "https://www.irs.gov/forms-pubs/about-form-4562",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, solar, renewable_energy, biomass_biogas, wood_heating, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is tax cost recovery, not a rebate, grant, or direct incentive.",
            "Do not match personal residential homeowner projects that are not depreciable property.",
            "Generic LED lighting, ordinary HVAC replacement, and building weatherization are not specially supported clean-energy MACRS categories for this opportunity."
          ],
          "hardRequirements": [
            "Property must be depreciable business or income-producing property owned by the taxpayer.",
            "Post-2024 five-year MACRS treatment is tied to qualified clean electricity facilities, qualified clean energy property, and energy storage technology under current IRS rules.",
            "Taxpayer claims depreciation using applicable IRS depreciation forms and records.",
            "Eligibility depends on placed-in-service date, construction date, tax basis, and current Internal Revenue Code requirements."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayers",
            "owners_of_depreciable_property"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "qualified_clean_energy_property",
            "clean_electricity_generation_property",
            "energy_storage_technology",
            "geothermal_energy_property",
            "combined_heat_and_power_system",
            "biomass_biogas_energy_system",
            "solar_water_heating_system",
            "small_wind_turbine"
          ],
          "evidenceText": "IRS]( cost-recovery guidance supports five-year MACRS for qualified clean energy facilities, qualified clean energy property and energy storage technology, with depreciation claimed by owners of eligible property.",
          "reasoningNotes": "Legacy DSIRE technology terms should not be treated as a rebate menu. Current matching should focus on depreciable qualified clean energy property and exclude generic efficiency retrofits."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 5,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 9000000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 1269000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 1269000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 9000000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:2511",
          "opportunityName": "USDA - Rural Energy for America Program (REAP) Loan Guarantees",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Loan Guarantee",
          "administrator": "USDA Rural Development",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees",
          "applicationUrl": "https://www.rd.usda.gov/programs-services/energy-programs/rural-energy-america-program-renewable-energy-systems-energy-efficiency-improvement-guaranteed-loans",
          "matchedReasons": [
            "Opportunity appears active.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, energy_efficiency, renewable_energy, biomass_biogas."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential-only home retrofits for non-business applicants are not supported.",
            "Non-rural small businesses generally do not qualify unless an agricultural-production exception applies.",
            "Audit costs alone should not be matched as the funded retrofit unless tied to an eligible REAP project.",
            "Loan guarantees should not be treated as rebate incentives."
          ],
          "hardRequirements": [
            "Borrower must be an agricultural producer or rural small business eligible under USDA REAP rules.",
            "Guaranteed loan must finance a renewable energy system, energy-efficiency improvement, or eligible energy-efficient agricultural equipment.",
            "Rural-area requirements apply to small businesses, with specified exceptions for agricultural production.",
            "Energy-efficiency applications must include a qualifying audit or assessment.",
            "Federal debt, tax, judgment, and debarment restrictions apply."
          ],
          "eligibleApplicantTypes": [
            "agricultural_producer",
            "rural_small_business",
            "eligible_lender"
          ],
          "eligibleSectors": [
            "agricultural",
            "commercial",
            "rural_small_business"
          ],
          "eligibleRetrofitCategories": [
            "biomass_renewable_energy_system",
            "anaerobic_digester",
            "geothermal_energy_system",
            "ground_source_geothermal_heat_pump",
            "energy_efficiency_improvements"
          ],
          "evidenceText": "USDA]( REAP guaranteed loans finance renewable energy systems, including biomass and geothermal, and energy-efficiency improvements for agricultural producers and rural small businesses.",
          "reasoningNotes": "The biomass and geothermal matches are source-backed, but matching must enforce agricultural-producer or rural-small-business eligibility and loan-guarantee structure."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:552",
          "opportunityName": "Self-Generation Incentive Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "California Public Utilities Commission",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/552/self-generation-incentive-program",
          "applicationUrl": "https://www.selfgenca.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standalone rooftop solar PV is not a general SGIP rebate; solar is supported only where paired with storage under the applicable equity offering.",
            "Biogas is an adder or fuel condition for eligible generation, not a standalone biomass or biogas system rebate.",
            "Technologies not listed by SGIP or not in an available budget category should not match."
          ],
          "hardRequirements": [
            "Project must use qualifying distributed energy resources located on the customer side of the meter.",
            "Applications must be submitted through an approved SGIP developer or program administrator.",
            "Residential Solar and Storage Equity eligibility is limited to qualifying low-income residential customers and paired solar plus storage.",
            "Eligible projects must comply with SGIP technology, budget, incentive-step, and demand-response or operational requirements."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "non_residential_customer",
            "low_income_customer",
            "critical_facility",
            "developer"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "public",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "paired_solar_pv_and_battery_storage",
            "fuel_cell_system",
            "small_wind_turbine",
            "combined_heat_and_power_system",
            "waste_heat_to_power_system",
            "pressure_reduction_turbine",
            "linear_generator"
          ],
          "evidenceText": "CPUC]( and SGIP pages list customer-side distributed energy resources including advanced storage, wind, fuel cells, CHP-related generation, and paired solar plus storage for equity customers.",
          "reasoningNotes": "Keep storage and qualifying self-generation technologies. Remove standalone solar PV and broad biomass/biogas matching except when tied to specific eligible SGIP generation rules."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:676",
          "opportunityName": "Modified Accelerated Cost-Recovery System (MACRS)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Depreciation / Tax Cost Recovery",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs",
          "applicationUrl": "https://www.irs.gov/forms-pubs/about-form-4562",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, solar, renewable_energy, biomass_biogas, wood_heating, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is tax cost recovery, not a rebate, grant, or direct incentive.",
            "Do not match personal residential homeowner projects that are not depreciable property.",
            "Generic LED lighting, ordinary HVAC replacement, and building weatherization are not specially supported clean-energy MACRS categories for this opportunity."
          ],
          "hardRequirements": [
            "Property must be depreciable business or income-producing property owned by the taxpayer.",
            "Post-2024 five-year MACRS treatment is tied to qualified clean electricity facilities, qualified clean energy property, and energy storage technology under current IRS rules.",
            "Taxpayer claims depreciation using applicable IRS depreciation forms and records.",
            "Eligibility depends on placed-in-service date, construction date, tax basis, and current Internal Revenue Code requirements."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayers",
            "owners_of_depreciable_property"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "qualified_clean_energy_property",
            "clean_electricity_generation_property",
            "energy_storage_technology",
            "geothermal_energy_property",
            "combined_heat_and_power_system",
            "biomass_biogas_energy_system",
            "solar_water_heating_system",
            "small_wind_turbine"
          ],
          "evidenceText": "IRS]( cost-recovery guidance supports five-year MACRS for qualified clean energy facilities, qualified clean energy property and energy storage technology, with depreciation claimed by owners of eligible property.",
          "reasoningNotes": "Legacy DSIRE technology terms should not be treated as a rebate menu. Current matching should focus on depreciable qualified clean energy property and exclude generic efficiency retrofits."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22615",
          "opportunityName": "Marin Clean Energy - Feed-In Tariff Plus",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Feed In Tariff",
          "administrator": "MCE Clean Energy",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22615/marin-clean-energy-feed-in-tariff-plus",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state CA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match behind-the-meter customer rooftop solar rebates or net-metering projects.",
            "Do not match standalone battery storage; storage is a required pairing for solar projects, not a separate storage rebate.",
            "Do not match ground-source geothermal heat pumps or solar water heating; this is a wholesale electricity feed-in tariff, not building HVAC or water heating.",
            "Do not match ordinary building retrofits."
          ],
          "hardRequirements": [
            "Projects must be 1 MW to 5 MW local renewable generation projects under MCE's feed-in tariff rules.",
            "Solar projects require paired storage sized to program requirements, including four-hour duration.",
            "Projects use standardized long-term power purchase agreements and must satisfy interconnection, site control, and deliverability requirements."
          ],
          "eligibleApplicantTypes": [
            "renewable_project_developer",
            "power_producer",
            "project_owner",
            "landowner"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "utility_scale",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "wholesale_solar_pv_generation_project",
            "solar_pv_plus_storage_generation_project",
            "wholesale_wind_generation_project",
            "wholesale_biomass_generation_project"
          ],
          "evidenceText": "MCE's]( feed-in tariff is a wholesale local renewable energy procurement program for 1 to 5 MW projects, with solar paired with storage requirements.",
          "reasoningNotes": "Storage is only valid as part of required solar-plus-storage project design. Geothermal heat pump and solar water heating matches are false positives."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22615",
          "programName": "Marin Clean Energy - Feed-In Tariff Plus",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "project_technology",
            "project_mw_ac",
            "accepted_fit_capacity_block",
            "delivered_mwh",
            "ppa_price",
            "interconnection_status",
            "storage_sizing_for_solar_projects",
            "accepted_ppa_price",
            "annual_delivered_mwh",
            "technology_type"
          ],
          "defaultedInputs": [
            {
              "inputKey": "project_technology",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "project_mw_ac",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "accepted_fit_capacity_block",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "delivered_mwh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ppa_price",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "interconnection_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "storage_sizing_for_solar_projects",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "accepted_ppa_price",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "annual_delivered_mwh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "technology_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_recurring_savings_1_bd374e5d89a7ca17",
              "effectType": "recurring_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "tariff_or_rate",
              "cashValueClassification": "tariff_or_rate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "led_lighting_retrofit",
      "displayName": "LED lighting retrofit",
      "parentCategory": "lighting",
      "isPhysicalRetrofit": true,
      "opportunityCount": 5,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 160425,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 22464,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 22464,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 2,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 2
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 160425,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        },
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdenergyedge_com",
          "opportunityName": "SD Energy Edge",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Business Rebate And Custom Incentive Program",
          "administrator": "San Diego Gas & Electric / TRC",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.sdge.com/business/save-energy-and-money",
          "applicationUrl": "https://sdenergyedge.com/apply-now/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, commercial_kitchen."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match indoor LED lighting; the application page states SD Energy Edge does not offer rebates for indoor LED lighting.",
            "Do not infer residential rebates from this business program.",
            "Financing is described as an option but should not be treated as the rebate itself."
          ],
          "hardRequirements": [
            "Customer must be an eligible SDG&E business customer.",
            "Custom incentives require preapproval before purchase, installation, or operation.",
            "Rebate funds are limited and available on a first-come basis.",
            "Equipment must meet SD Energy Edge rebate specifications."
          ],
          "eligibleApplicantTypes": [
            "business_customers",
            "commercial_facility_owners",
            "industrial_facility_owners",
            "public_agencies",
            "agricultural_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "public",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "commercial_hvac_unit_replacement",
            "heat_pump_hvac_retrofit",
            "exterior_led_lighting_retrofit",
            "commercial_heat_pump_water_heater_retrofit",
            "tankless_water_heater_retrofit",
            "hot_water_pipe_tank_insulation",
            "commercial_refrigeration_controls",
            "refrigerated_case_door_retrofit",
            "variable_speed_drive_retrofit",
            "pool_heater_retrofit",
            "pool_cover",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "SD]( Energy Edge lists business rebates for qualifying HVAC units, outdoor Type B LED lighting, water-heating, refrigeration, VSD, and custom efficiency projects.",
          "reasoningNotes": "The HVAC match is valid only for qualifying commercial equipment. The LED match must be narrowed to eligible outdoor or specified Type B LED measures, not broad indoor LED lighting."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22067",
          "opportunityName": "Plumas-Sierra REC - Commercial and Irrigation Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial And Irrigation Rebate Program",
          "administrator": "Plumas-Sierra Rural Electric Cooperative",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22067/plumas-sierra-rec-commercial-and-irrigation-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, water_efficiency, commercial_kitchen."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential heat pump water heater and other residential rebate pages are separate and should not match this commercial and irrigation opportunity.",
            "Do not infer broad water conservation or irrigation pump replacement unless the current PSREC commercial or irrigation form supports it.",
            "Official pages returned 403 in the browser, so measure details should be rechecked before final payment matching."
          ],
          "hardRequirements": [
            "Applicant must be a Plumas-Sierra Rural Electric Cooperative commercial or irrigation customer.",
            "Equipment must be in an eligible commercial or irrigation rebate category and meet the applicable rebate form requirements.",
            "Detailed incentive amounts and documentation requirements must be checked on the current rebate form before approval."
          ],
          "eligibleApplicantTypes": [
            "commercial_customer",
            "irrigation_customer",
            "agricultural_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "agricultural",
            "irrigation"
          ],
          "eligibleRetrofitCategories": [
            "commercial_heat_pump_hvac",
            "high_efficiency_commercial_hvac",
            "heat_pump_water_heater",
            "led_lighting_retrofit",
            "commercial_lighting_retrofit",
            "commercial_kitchen_foodservice_equipment",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Official PSREC search snippets identify commercial lighting, custom projects, commercial HVAC, commercial heat pump water heater, and commercial kitchen or food-service equipment rebate pages.",
          "reasoningNotes": "Current official PSREC pages were present in search results but returned 403 when opened. Categories are therefore kept only where official snippets identified the current rebate page."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:676",
          "opportunityName": "Modified Accelerated Cost-Recovery System (MACRS)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Depreciation / Tax Cost Recovery",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs",
          "applicationUrl": "https://www.irs.gov/forms-pubs/about-form-4562",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, solar, renewable_energy, biomass_biogas, wood_heating, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is tax cost recovery, not a rebate, grant, or direct incentive.",
            "Do not match personal residential homeowner projects that are not depreciable property.",
            "Generic LED lighting, ordinary HVAC replacement, and building weatherization are not specially supported clean-energy MACRS categories for this opportunity."
          ],
          "hardRequirements": [
            "Property must be depreciable business or income-producing property owned by the taxpayer.",
            "Post-2024 five-year MACRS treatment is tied to qualified clean electricity facilities, qualified clean energy property, and energy storage technology under current IRS rules.",
            "Taxpayer claims depreciation using applicable IRS depreciation forms and records.",
            "Eligibility depends on placed-in-service date, construction date, tax basis, and current Internal Revenue Code requirements."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayers",
            "owners_of_depreciable_property"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "qualified_clean_energy_property",
            "clean_electricity_generation_property",
            "energy_storage_technology",
            "geothermal_energy_property",
            "combined_heat_and_power_system",
            "biomass_biogas_energy_system",
            "solar_water_heating_system",
            "small_wind_turbine"
          ],
          "evidenceText": "IRS]( cost-recovery guidance supports five-year MACRS for qualified clean energy facilities, qualified clean energy property and energy storage technology, with depreciation claimed by owners of eligible property.",
          "reasoningNotes": "Legacy DSIRE technology terms should not be treated as a rebate menu. Current matching should focus on depreciable qualified clean energy property and exclude generic efficiency retrofits."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1271",
          "opportunityName": "Energy-Efficient Commercial Buildings Tax Deduction",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Deduction",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1271/energy-efficient-commercial-buildings-tax-deduction",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standalone LED lighting is not eligible unless it is part of a certified 179D qualifying interior lighting, whole-building, or retrofit-property savings calculation.",
            "The old partial or interim lighting rule no longer applies after 2022.",
            "Residential single-family projects do not qualify.",
            "Projects beginning construction after June 30, 2026 are not eligible.",
            "This is a federal tax deduction, not a rebate, grant, or financing program."
          ],
          "hardRequirements": [
            "Energy efficient commercial building property or retrofit property must be placed in service by an eligible taxpayer or allocated designer.",
            "Qualifying systems must produce at least 25% energy savings under the applicable modeled or measured pathway.",
            "Retrofit pathway applies to buildings at least five years old and uses measured energy use intensity reduction rules.",
            "Certification, allocation, and tax filing documentation requirements apply.",
            "Higher deduction amounts require prevailing wage and apprenticeship compliance.",
            "Projects whose construction begins after June 30, 2026 are blocked under the current statutory phaseout."
          ],
          "eligibleApplicantTypes": [
            "commercial_building_owner",
            "taxpaying_entity",
            "designer_allocated_by_tax_exempt_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "multifamily",
            "government",
            "nonprofit",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "interior_lighting_systems",
            "hvac_and_hot_water_systems",
            "building_envelope",
            "whole_building_energy_retrofit"
          ],
          "evidenceText": "IRS]( describes 179D for energy efficient commercial building or retrofit property; DOE explains qualifying upgrades must achieve at least 25% savings through modeling or measurement.",
          "reasoningNotes": "The supplied LED match is valid only as interior lighting within a certified 179D project. It should not be treated as a simple LED lighting rebate."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22067",
          "programName": "Plumas-Sierra REC - Commercial and Irrigation Rebate Program",
          "calculationStatus": "source_inaccessible_repair_failure",
          "runtimeInclusionStatus": "source_inaccessible_repair_failure",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "current_psrec_rebate_form",
            "equipment_type",
            "unit_quantity",
            "project_cost",
            "commercial_or_irrigation_account_status",
            "installation_documentation",
            "current_form_amount",
            "measure_tier",
            "documentation_requirements"
          ],
          "defaultedInputs": [
            {
              "inputKey": "current_psrec_rebate_form",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_quantity",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "commercial_or_irrigation_account_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "installation_documentation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "current_form_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "documentation_requirements",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_8ac3100d74bc3c6c",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "source_inaccessible",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdenergyedge_com",
          "programName": "SD Energy Edge",
          "calculationStatus": "estimate_from_range",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "measure_type",
            "equipment_capacity_or_quantity",
            "configuration_or_efficiency_tier",
            "eligible_project_cost_cents",
            "preapproval_status_for_custom"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_capacity_or_quantity",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "configuration_or_efficiency_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "preapproval_status_for_custom",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_9688dc7e7063f804",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "rate_table",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "combined_heat_and_power_system",
      "displayName": "Combined heat and power system",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 3,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 12000000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 1605000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 1605000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 12000000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:552",
          "opportunityName": "Self-Generation Incentive Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "California Public Utilities Commission",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/552/self-generation-incentive-program",
          "applicationUrl": "https://www.selfgenca.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standalone rooftop solar PV is not a general SGIP rebate; solar is supported only where paired with storage under the applicable equity offering.",
            "Biogas is an adder or fuel condition for eligible generation, not a standalone biomass or biogas system rebate.",
            "Technologies not listed by SGIP or not in an available budget category should not match."
          ],
          "hardRequirements": [
            "Project must use qualifying distributed energy resources located on the customer side of the meter.",
            "Applications must be submitted through an approved SGIP developer or program administrator.",
            "Residential Solar and Storage Equity eligibility is limited to qualifying low-income residential customers and paired solar plus storage.",
            "Eligible projects must comply with SGIP technology, budget, incentive-step, and demand-response or operational requirements."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "non_residential_customer",
            "low_income_customer",
            "critical_facility",
            "developer"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "public",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "paired_solar_pv_and_battery_storage",
            "fuel_cell_system",
            "small_wind_turbine",
            "combined_heat_and_power_system",
            "waste_heat_to_power_system",
            "pressure_reduction_turbine",
            "linear_generator"
          ],
          "evidenceText": "CPUC]( and SGIP pages list customer-side distributed energy resources including advanced storage, wind, fuel cells, CHP-related generation, and paired solar plus storage for equity customers.",
          "reasoningNotes": "Keep storage and qualifying self-generation technologies. Remove standalone solar PV and broad biomass/biogas matching except when tied to specific eligible SGIP generation rules."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:676",
          "opportunityName": "Modified Accelerated Cost-Recovery System (MACRS)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Depreciation / Tax Cost Recovery",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs",
          "applicationUrl": "https://www.irs.gov/forms-pubs/about-form-4562",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, solar, renewable_energy, biomass_biogas, wood_heating, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is tax cost recovery, not a rebate, grant, or direct incentive.",
            "Do not match personal residential homeowner projects that are not depreciable property.",
            "Generic LED lighting, ordinary HVAC replacement, and building weatherization are not specially supported clean-energy MACRS categories for this opportunity."
          ],
          "hardRequirements": [
            "Property must be depreciable business or income-producing property owned by the taxpayer.",
            "Post-2024 five-year MACRS treatment is tied to qualified clean electricity facilities, qualified clean energy property, and energy storage technology under current IRS rules.",
            "Taxpayer claims depreciation using applicable IRS depreciation forms and records.",
            "Eligibility depends on placed-in-service date, construction date, tax basis, and current Internal Revenue Code requirements."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayers",
            "owners_of_depreciable_property"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "qualified_clean_energy_property",
            "clean_electricity_generation_property",
            "energy_storage_technology",
            "geothermal_energy_property",
            "combined_heat_and_power_system",
            "biomass_biogas_energy_system",
            "solar_water_heating_system",
            "small_wind_turbine"
          ],
          "evidenceText": "IRS]( cost-recovery guidance supports five-year MACRS for qualified clean energy facilities, qualified clean energy property and energy storage technology, with depreciation claimed by owners of eligible property.",
          "reasoningNotes": "Legacy DSIRE technology terms should not be treated as a rebate menu. Current matching should focus on depreciable qualified clean energy property and exclude generic efficiency retrofits."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "energy_management_system",
      "displayName": "Energy management system",
      "parentCategory": "building_controls_energy_management",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 254400,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 216000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 216000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 254400,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_19551",
          "opportunityName": "Emergency Load Reduction Program (ELRP)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Demand Response Performance Incentive",
          "administrator": "San Diego Gas & Electric",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response",
          "applicationUrl": "https://app.olivineinc.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is not an equipment rebate for automated demand response controls or energy management systems.",
            "No specific physical retrofit is required; any eligible operational or technology approach may be used to reduce load.",
            "Residential-only measures and general efficiency retrofits should not match this business demand response program."
          ],
          "hardRequirements": [
            "Customer must nominate at least 1 kW of load reduction.",
            "Events occur during emergency load reduction periods and incentives are based on verified kWh load reduction.",
            "Participants may not already be enrolled in another supply-side demand response program unless program rules allow it.",
            "Participation is voluntary and subject to ELRP terms and conditions."
          ],
          "eligibleApplicantTypes": [
            "nonresidential_electric_customers",
            "commercial_customers",
            "industrial_customers",
            "agricultural_customers",
            "demand_response_aggregators"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "demand_response_program_enrollment",
            "verified_load_reduction"
          ],
          "evidenceText": "SDG&E ELRP pays eligible nonresidential customers for verified emergency load reduction and does not provide a rebate for controls or EMS equipment.",
          "reasoningNotes": "Replace automated controls and EMS retrofit matches with demand response enrollment and verified load reduction categories."
        },
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_555",
          "opportunityName": "Capacity Bidding Program (CBP)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Demand Response",
          "administrator": "SDG&E",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response",
          "applicationUrl": "https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response/capacity-bidding-program",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This program pays for demand response participation, not energy management system installation.",
            "Automated demand response controls may help a site participate but are not directly rebated by this opportunity.",
            "Residential customers are not eligible.",
            "Do not match general building controls retrofits unless the opportunity data model separately represents demand response enrollment."
          ],
          "hardRequirements": [
            "Customer must be on an eligible nonresidential SDG&E rate schedule.",
            "Customer must commit to reduce load during Capacity Bidding Program demand response events.",
            "Participants generally enroll through an approved third-party aggregator or self-aggregate with SDG&E.",
            "Program events occur during defined demand response seasons and event windows."
          ],
          "eligibleApplicantTypes": [
            "nonresidential_electric_customers",
            "commercial_customers",
            "industrial_customers",
            "agricultural_customers",
            "demand_response_aggregators"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "demand_response_participation"
          ],
          "evidenceText": "SDG&E describes CBP as a nonresidential demand response program that pays businesses for committed load reduction during events.",
          "reasoningNotes": "The original control-system retrofit matches overstate the program. It should be treated as demand response participation, not an equipment rebate."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "solar_water_heating_system",
      "displayName": "Solar water heating system",
      "parentCategory": "water_heating",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 680000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 104000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 104000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 680000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:676",
          "opportunityName": "Modified Accelerated Cost-Recovery System (MACRS)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Depreciation / Tax Cost Recovery",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs",
          "applicationUrl": "https://www.irs.gov/forms-pubs/about-form-4562",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, solar, renewable_energy, biomass_biogas, wood_heating, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is tax cost recovery, not a rebate, grant, or direct incentive.",
            "Do not match personal residential homeowner projects that are not depreciable property.",
            "Generic LED lighting, ordinary HVAC replacement, and building weatherization are not specially supported clean-energy MACRS categories for this opportunity."
          ],
          "hardRequirements": [
            "Property must be depreciable business or income-producing property owned by the taxpayer.",
            "Post-2024 five-year MACRS treatment is tied to qualified clean electricity facilities, qualified clean energy property, and energy storage technology under current IRS rules.",
            "Taxpayer claims depreciation using applicable IRS depreciation forms and records.",
            "Eligibility depends on placed-in-service date, construction date, tax basis, and current Internal Revenue Code requirements."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayers",
            "owners_of_depreciable_property"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "qualified_clean_energy_property",
            "clean_electricity_generation_property",
            "energy_storage_technology",
            "geothermal_energy_property",
            "combined_heat_and_power_system",
            "biomass_biogas_energy_system",
            "solar_water_heating_system",
            "small_wind_turbine"
          ],
          "evidenceText": "IRS]( cost-recovery guidance supports five-year MACRS for qualified clean energy facilities, qualified clean energy property and energy storage technology, with depreciation claimed by owners of eligible property.",
          "reasoningNotes": "Legacy DSIRE technology terms should not be treated as a rebate menu. Current matching should focus on depreciable qualified clean energy property and exclude generic efficiency retrofits."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "small_wind_turbine",
      "displayName": "Small wind turbine",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 8000000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 846000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 846000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 8000000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:552",
          "opportunityName": "Self-Generation Incentive Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "California Public Utilities Commission",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/552/self-generation-incentive-program",
          "applicationUrl": "https://www.selfgenca.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standalone rooftop solar PV is not a general SGIP rebate; solar is supported only where paired with storage under the applicable equity offering.",
            "Biogas is an adder or fuel condition for eligible generation, not a standalone biomass or biogas system rebate.",
            "Technologies not listed by SGIP or not in an available budget category should not match."
          ],
          "hardRequirements": [
            "Project must use qualifying distributed energy resources located on the customer side of the meter.",
            "Applications must be submitted through an approved SGIP developer or program administrator.",
            "Residential Solar and Storage Equity eligibility is limited to qualifying low-income residential customers and paired solar plus storage.",
            "Eligible projects must comply with SGIP technology, budget, incentive-step, and demand-response or operational requirements."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "non_residential_customer",
            "low_income_customer",
            "critical_facility",
            "developer"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "public",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "paired_solar_pv_and_battery_storage",
            "fuel_cell_system",
            "small_wind_turbine",
            "combined_heat_and_power_system",
            "waste_heat_to_power_system",
            "pressure_reduction_turbine",
            "linear_generator"
          ],
          "evidenceText": "CPUC]( and SGIP pages list customer-side distributed energy resources including advanced storage, wind, fuel cells, CHP-related generation, and paired solar plus storage for equity customers.",
          "reasoningNotes": "Keep storage and qualifying self-generation technologies. Remove standalone solar PV and broad biomass/biogas matching except when tied to specific eligible SGIP generation rules."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:676",
          "opportunityName": "Modified Accelerated Cost-Recovery System (MACRS)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Corporate Depreciation / Tax Cost Recovery",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs",
          "applicationUrl": "https://www.irs.gov/forms-pubs/about-form-4562",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, solar, renewable_energy, biomass_biogas, wood_heating, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is tax cost recovery, not a rebate, grant, or direct incentive.",
            "Do not match personal residential homeowner projects that are not depreciable property.",
            "Generic LED lighting, ordinary HVAC replacement, and building weatherization are not specially supported clean-energy MACRS categories for this opportunity."
          ],
          "hardRequirements": [
            "Property must be depreciable business or income-producing property owned by the taxpayer.",
            "Post-2024 five-year MACRS treatment is tied to qualified clean electricity facilities, qualified clean energy property, and energy storage technology under current IRS rules.",
            "Taxpayer claims depreciation using applicable IRS depreciation forms and records.",
            "Eligibility depends on placed-in-service date, construction date, tax basis, and current Internal Revenue Code requirements."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayers",
            "owners_of_depreciable_property"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "qualified_clean_energy_property",
            "clean_electricity_generation_property",
            "energy_storage_technology",
            "geothermal_energy_property",
            "combined_heat_and_power_system",
            "biomass_biogas_energy_system",
            "solar_water_heating_system",
            "small_wind_turbine"
          ],
          "evidenceText": "IRS]( cost-recovery guidance supports five-year MACRS for qualified clean energy facilities, qualified clean energy property and energy storage technology, with depreciation claimed by owners of eligible property.",
          "reasoningNotes": "Legacy DSIRE technology terms should not be treated as a rebate menu. Current matching should focus on depreciable qualified clean energy property and exclude generic efficiency retrofits."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "fleet_charging_infrastructure",
      "displayName": "Fleet charging infrastructure",
      "parentCategory": "ev_charging_transportation",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 2760000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 0,
        "annualRecurringExpensesCents": 1296000,
        "netAnnualRecurringSavingsCents": -1296000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 2760000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_15131",
          "opportunityName": "Power Your Drive for Fleets",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Utility Program",
          "administrator": "San Diego Gas & Electric",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric",
          "applicationUrl": "https://www.sdge.com/mdhd-interest-form",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match residential or personal light-duty EV charging.",
            "Do not treat this as an electric vehicle purchase rebate.",
            "Additional charger rebates are limited to eligible school bus, transit, disadvantaged community, or similar qualifying fleets under program terms."
          ],
          "hardRequirements": [
            "Project must be in SDG&E service territory.",
            "Applicant must commit to procure at least two Class 2 through Class 8 electric fleet vehicles.",
            "Customer must provide a long-term electrification plan and load increase schedule.",
            "Customer must provide charger usage data for at least five years.",
            "Customer must own or lease the property and operate and maintain the vehicles and chargers for the required program term.",
            "Customers buy, own, and maintain the chargers while SDG&E supports eligible make-ready infrastructure."
          ],
          "eligibleApplicantTypes": [
            "fleet_owners",
            "fleet_operators",
            "businesses",
            "public_agencies",
            "school_districts",
            "transit_agencies"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "public",
            "transportation",
            "fleet"
          ],
          "eligibleRetrofitCategories": [
            "fleet_charging_infrastructure",
            "make_ready_ev_charging_infrastructure",
            "ev_charger_installation",
            "dc_fast_ev_charger_installation"
          ],
          "evidenceText": "SDG&E describes make-ready infrastructure and eligible charger rebates for medium and heavy-duty fleet charging, with Class 2-8 vehicle, data-sharing, and long-term site-operation requirements.",
          "reasoningNotes": "The fleet EV charging infrastructure match is supported. The opportunity should not be generalized to residential EVSE, EV purchases, or non-fleet charging."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_15131",
          "programName": "Power Your Drive for Fleets",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "charger_cost",
            "charger_output_kw",
            "charger_count",
            "eligible_fleet_site_category",
            "class_2_to_8_vehicle_commitment",
            "charger_kw",
            "eligible_site_category",
            "make_ready_ownership_option",
            "eligible_make_ready_cost",
            "site_design_scope",
            "utility_approval",
            "fleet_electrification_plan",
            "make_ready_cost",
            "approved_site_scope"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_count",
              "source": "derived_or_placeholder_quantity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "charger_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_fleet_site_category",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "class_2_to_8_vehicle_commitment",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_site_category",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "make_ready_ownership_option",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_make_ready_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_design_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "utility_approval",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "fleet_electrification_plan",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "make_ready_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "approved_site_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 1600000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_fef6e333e43c3fd0",
              "effectType": "one_time_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "hybrid_rate_plus_cap",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_financing_subsidy_2_72cf31805713d39c",
              "effectType": "financing_subsidy",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "process_value",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 1600000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "heat_pump_hvac_retrofit",
      "displayName": "Heat pump HVAC retrofit",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 1172000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 80000,
        "annualRecurringExpensesCents": 54000,
        "netAnnualRecurringSavingsCents": 26000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 1172000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22067",
          "opportunityName": "Plumas-Sierra REC - Commercial and Irrigation Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial And Irrigation Rebate Program",
          "administrator": "Plumas-Sierra Rural Electric Cooperative",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22067/plumas-sierra-rec-commercial-and-irrigation-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, water_efficiency, commercial_kitchen."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential heat pump water heater and other residential rebate pages are separate and should not match this commercial and irrigation opportunity.",
            "Do not infer broad water conservation or irrigation pump replacement unless the current PSREC commercial or irrigation form supports it.",
            "Official pages returned 403 in the browser, so measure details should be rechecked before final payment matching."
          ],
          "hardRequirements": [
            "Applicant must be a Plumas-Sierra Rural Electric Cooperative commercial or irrigation customer.",
            "Equipment must be in an eligible commercial or irrigation rebate category and meet the applicable rebate form requirements.",
            "Detailed incentive amounts and documentation requirements must be checked on the current rebate form before approval."
          ],
          "eligibleApplicantTypes": [
            "commercial_customer",
            "irrigation_customer",
            "agricultural_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "agricultural",
            "irrigation"
          ],
          "eligibleRetrofitCategories": [
            "commercial_heat_pump_hvac",
            "high_efficiency_commercial_hvac",
            "heat_pump_water_heater",
            "led_lighting_retrofit",
            "commercial_lighting_retrofit",
            "commercial_kitchen_foodservice_equipment",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Official PSREC search snippets identify commercial lighting, custom projects, commercial HVAC, commercial heat pump water heater, and commercial kitchen or food-service equipment rebate pages.",
          "reasoningNotes": "Current official PSREC pages were present in search results but returned 403 when opened. Categories are therefore kept only where official snippets identified the current rebate page."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22067",
          "programName": "Plumas-Sierra REC - Commercial and Irrigation Rebate Program",
          "calculationStatus": "source_inaccessible_repair_failure",
          "runtimeInclusionStatus": "source_inaccessible_repair_failure",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "current_psrec_rebate_form",
            "equipment_type",
            "unit_quantity",
            "project_cost",
            "commercial_or_irrigation_account_status",
            "installation_documentation",
            "current_form_amount",
            "measure_tier",
            "documentation_requirements"
          ],
          "defaultedInputs": [
            {
              "inputKey": "current_psrec_rebate_form",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_quantity",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "commercial_or_irrigation_account_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "installation_documentation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "current_form_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "documentation_requirements",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_8ac3100d74bc3c6c",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "source_inaccessible",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "heat_pump_water_heater",
      "displayName": "Heat pump water heater",
      "parentCategory": "water_heating",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 350000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 48000,
        "annualRecurringExpensesCents": 25200,
        "netAnnualRecurringSavingsCents": 22800,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 350000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22067",
          "opportunityName": "Plumas-Sierra REC - Commercial and Irrigation Rebate Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial And Irrigation Rebate Program",
          "administrator": "Plumas-Sierra Rural Electric Cooperative",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22067/plumas-sierra-rec-commercial-and-irrigation-rebate-program",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: hvac, lighting, water_efficiency, commercial_kitchen."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Residential heat pump water heater and other residential rebate pages are separate and should not match this commercial and irrigation opportunity.",
            "Do not infer broad water conservation or irrigation pump replacement unless the current PSREC commercial or irrigation form supports it.",
            "Official pages returned 403 in the browser, so measure details should be rechecked before final payment matching."
          ],
          "hardRequirements": [
            "Applicant must be a Plumas-Sierra Rural Electric Cooperative commercial or irrigation customer.",
            "Equipment must be in an eligible commercial or irrigation rebate category and meet the applicable rebate form requirements.",
            "Detailed incentive amounts and documentation requirements must be checked on the current rebate form before approval."
          ],
          "eligibleApplicantTypes": [
            "commercial_customer",
            "irrigation_customer",
            "agricultural_customer"
          ],
          "eligibleSectors": [
            "commercial",
            "agricultural",
            "irrigation"
          ],
          "eligibleRetrofitCategories": [
            "commercial_heat_pump_hvac",
            "high_efficiency_commercial_hvac",
            "heat_pump_water_heater",
            "led_lighting_retrofit",
            "commercial_lighting_retrofit",
            "commercial_kitchen_foodservice_equipment",
            "custom_energy_efficiency_project"
          ],
          "evidenceText": "Official PSREC search snippets identify commercial lighting, custom projects, commercial HVAC, commercial heat pump water heater, and commercial kitchen or food-service equipment rebate pages.",
          "reasoningNotes": "Current official PSREC pages were present in search results but returned 403 when opened. Categories are therefore kept only where official snippets identified the current rebate page."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22067",
          "programName": "Plumas-Sierra REC - Commercial and Irrigation Rebate Program",
          "calculationStatus": "source_inaccessible_repair_failure",
          "runtimeInclusionStatus": "source_inaccessible_repair_failure",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "current_psrec_rebate_form",
            "equipment_type",
            "unit_quantity",
            "project_cost",
            "commercial_or_irrigation_account_status",
            "installation_documentation",
            "current_form_amount",
            "measure_tier",
            "documentation_requirements"
          ],
          "defaultedInputs": [
            {
              "inputKey": "current_psrec_rebate_form",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "equipment_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "unit_quantity",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "commercial_or_irrigation_account_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "installation_documentation",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "current_form_amount",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "documentation_requirements",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_8ac3100d74bc3c6c",
              "effectType": "one_time_savings",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "source_inaccessible",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": true,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "high_efficiency_refrigeration_equipment",
      "displayName": "High-efficiency refrigeration equipment",
      "parentCategory": "refrigeration",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 345000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 108000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 108000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 345000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:aesc_inc_com_groceries_restaurants_and_food_storage_program",
          "opportunityName": "Groceries, Restaurants and Food Storage Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Energy Efficiency Incentive",
          "administrator": "San Diego Gas & Electric",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.sdge.com/business/save-energy-and-money",
          "applicationUrl": "https://aesc-inc.com/grfs-program",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: refrigeration, battery_storage, commercial_kitchen, energy_efficiency, demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Battery storage is not an eligible retrofit; the program manual treats solar or battery storage installations near the project as an NMEC ineligibility issue.",
            "Demand response participation is separate; DR event days are handled in measurement rules and do not make automated demand response controls an eligible GRFS retrofit.",
            "Residential appliances, home weatherization, and non-food-sector commercial projects should not match."
          ],
          "hardRequirements": [
            "Customer site must be an eligible SDG&E commercial grocery, restaurant, or food storage facility.",
            "Projects are delivered through enrolled aggregators under the GRFS program.",
            "Savings are paid or measured through approved population NMEC, site NMEC, or deemed rebate pathways.",
            "Projects must comply with program manual rules, measure eligibility, documentation, and no-double-dipping requirements.",
            "Funds are first-come first-served and the program may be modified or terminated."
          ],
          "eligibleApplicantTypes": [
            "sdge_commercial_customers",
            "grocery_store_operators",
            "restaurant_operators",
            "food_storage_warehouse_operators",
            "enrolled_aggregators"
          ],
          "eligibleSectors": [
            "commercial",
            "grocery",
            "restaurant",
            "food_storage",
            "small_business"
          ],
          "eligibleRetrofitCategories": [
            "high_efficiency_refrigeration_equipment",
            "refrigeration_controls_optimization",
            "commercial_food_service_equipment",
            "commercial_hvac_retrofit",
            "commercial_lighting_retrofit",
            "commercial_water_heating_retrofit",
            "commercial_kitchen_ventilation_controls"
          ],
          "evidenceText": "AESC and SDG&E describe GRFS as an aggregator-delivered commercial energy efficiency program for grocery, restaurant, and food storage customers, with refrigeration, foodservice, HVAC, lighting, and water-heating measures.",
          "reasoningNotes": "Refrigeration is correct. Battery storage and automated demand response controls are false positives or separate-program concepts, not eligible GRFS retrofit categories."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:aesc_inc_com_groceries_restaurants_and_food_storage_program",
          "programName": "Groceries, Restaurants and Food Storage Program",
          "calculationStatus": "custom_quote_estimate",
          "runtimeInclusionStatus": "custom_quote_estimate",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "sdg_e_commercial_account",
            "grocery_restaurant_or_food_storage_facility_type",
            "enrolled_aggregator",
            "measure_package",
            "approved_pathway",
            "nmec_baseline_or_deemed_measure_details",
            "metered_data",
            "verified_savings",
            "funding_availability",
            "aggregator_approved_scope",
            "program_pathway",
            "verified_savings_or_deemed_measure_details"
          ],
          "defaultedInputs": [
            {
              "inputKey": "sdg_e_commercial_account",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "grocery_restaurant_or_food_storage_facility_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "enrolled_aggregator",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "measure_package",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "approved_pathway",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "nmec_baseline_or_deemed_measure_details",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "metered_data",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "verified_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "funding_availability",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "aggregator_approved_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "program_pathway",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "verified_savings_or_deemed_measure_details",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_3d5a1ee484ccc99b",
              "effectType": "one_time_savings",
              "calculationMethod": "custom_quote",
              "valueModelKind": "custom_quote",
              "cashValueClassification": "rebate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "insulation_upgrade",
      "displayName": "Insulation upgrade",
      "parentCategory": "building_envelope",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 316000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 81000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 81000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 316000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:3527",
          "opportunityName": "Local Option - Municipal Energy Districts",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Pace Financing",
          "administrator": "Local PACE program administrators regulated by the California Department of Financial Protection and Innovation",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3527/local-option-municipal-energy-districts",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: hvac, solar, building_envelope, energy_efficiency, renewable_energy, fuel_cell_system, clean_transportation, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is PACE financing, not a rebate.",
            "Do not treat DSIRE technology terms as direct product rebates; measure eligibility is administrator and jurisdiction specific.",
            "Cosmetic or nonqualifying add-ons such as cabinets, tile, countertops and conversions should not match.",
            "Geothermal, HVAC or insulation product matches should be represented as financing only unless a specific PACE administrator list verifies the measure."
          ],
          "hardRequirements": [
            "Property must be in a participating California jurisdiction or special assessment district.",
            "Financing is repaid through a property tax assessment and creates a property lien.",
            "PACE administrator and solicitor requirements, licensing, disclosures and ability-to-pay rules apply.",
            "Eligible measure scope depends on the local PACE program and administrator.",
            "Property owner should confirm sale, refinance, tax and foreclosure implications before proceeding."
          ],
          "eligibleApplicantTypes": [
            "property_owners",
            "homeowners",
            "commercial_property_owners",
            "multifamily_property_owners"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "pace_financing",
            "energy_efficiency_financing",
            "renewable_energy_financing",
            "water_efficiency_financing",
            "commercial_pace_financing",
            "solar_pv_financing",
            "battery_storage_financing",
            "building_envelope_financing",
            "hvac_financing",
            "lighting_financing",
            "water_heating_efficiency_financing"
          ],
          "evidenceText": "California PACE sources describe property-tax-assessment financing for energy, water and other qualifying improvements; C-PACE materials cite renewable energy, storage, envelope, HVAC, lighting and water measures.",
          "reasoningNotes": "Converted product-specific matches into financing categories and retained battery only as C-PACE financing, not as a direct incentive."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "leed_certification",
      "displayName": "LEED certification",
      "parentCategory": "certifications_compliance",
      "isPhysicalRetrofit": false,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "unsupported",
        "unsupportedReason": "This matched item is an audit, study, certification, or compliance task. It needs a resulting modeled savings input before RetroFi can calculate monthly savings.",
        "upfrontCostCents": null,
        "oneTimeSavingsCents": null,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": null,
        "annualRecurringExpensesCents": null,
        "netAnnualRecurringSavingsCents": null,
        "incentiveCalculationPackageCounts": null
      },
      "scenarios": [],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:4790",
          "opportunityName": "City of San Diego - Sustainable Building Expedited Permit Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Green Building Incentive",
          "administrator": "City of San Diego Development Services Department",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4790/city-of-san-diego-sustainable-building-expedited-permit-program",
          "applicationUrl": "https://www.sandiego.gov/sites/default/files/dsdds531.pdf",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "No utility restriction was found after source review.",
            "Applicant type overlaps eligible sector: commercial.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: energy_efficiency, building_envelope."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "The current private SBEP source supports CALGreen-based sustainable building compliance, not a general LEED certification match.",
            "LEED requirements found in city policy apply to certain city-owned, occupied, or leased facilities and should not be generalized to private SBEP projects.",
            "This is an expedited permitting program, not a direct equipment rebate."
          ],
          "hardRequirements": [
            "Eligible sustainable building projects must meet City SBEP rules and submit required SBEP documentation.",
            "Residential projects of 10 or more units and nonresidential projects must meet applicable CALGreen mandatory and voluntary measures for SBEP sustainable building eligibility.",
            "Sustainability measures must remain in the project or expedited review may be withdrawn."
          ],
          "eligibleApplicantTypes": [
            "developer",
            "builder",
            "property_owner",
            "affordable_housing_developer"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "multifamily_residential",
            "affordable_housing",
            "public"
          ],
          "eligibleRetrofitCategories": [
            "calgreen_tier_compliance",
            "sustainable_building_compliance"
          ],
          "evidenceText": "San]( Diego’s current SBEP materials identify expedited review for eligible sustainable building projects and require SBEP documentation tied to city code and CALGreen compliance.",
          "reasoningNotes": "Remove deterministic LEED matching for private SBEP. Keep only sustainable building compliance categories unless a separate city-owned-facility policy record is created."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "microgrid_system",
      "displayName": "Microgrid system",
      "parentCategory": "energy_storage_resilience",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 10920000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 450000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 450000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 10920000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "rooftop_solar_pv",
      "displayName": "Rooftop solar PV",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 10000000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 960000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 960000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 10000000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:552",
          "opportunityName": "Self-Generation Incentive Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rebate Program",
          "administrator": "California Public Utilities Commission",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/552/self-generation-incentive-program",
          "applicationUrl": "https://www.selfgenca.com/",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, biomass_biogas, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Standalone rooftop solar PV is not a general SGIP rebate; solar is supported only where paired with storage under the applicable equity offering.",
            "Biogas is an adder or fuel condition for eligible generation, not a standalone biomass or biogas system rebate.",
            "Technologies not listed by SGIP or not in an available budget category should not match."
          ],
          "hardRequirements": [
            "Project must use qualifying distributed energy resources located on the customer side of the meter.",
            "Applications must be submitted through an approved SGIP developer or program administrator.",
            "Residential Solar and Storage Equity eligibility is limited to qualifying low-income residential customers and paired solar plus storage.",
            "Eligible projects must comply with SGIP technology, budget, incentive-step, and demand-response or operational requirements."
          ],
          "eligibleApplicantTypes": [
            "residential_customer",
            "non_residential_customer",
            "low_income_customer",
            "critical_facility",
            "developer"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "public",
            "nonprofit",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "paired_solar_pv_and_battery_storage",
            "fuel_cell_system",
            "small_wind_turbine",
            "combined_heat_and_power_system",
            "waste_heat_to_power_system",
            "pressure_reduction_turbine",
            "linear_generator"
          ],
          "evidenceText": "CPUC]( and SGIP pages list customer-side distributed energy resources including advanced storage, wind, fuel cells, CHP-related generation, and paired solar plus storage for equity customers.",
          "reasoningNotes": "Keep storage and qualifying self-generation technologies. Remove standalone solar PV and broad biomass/biogas matching except when tied to specific eligible SGIP generation rules."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "submetering_energy_monitoring",
      "displayName": "Submetering / energy monitoring system",
      "parentCategory": "building_controls_energy_management",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 84800,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 54000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 54000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 1,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 1
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 84800,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_25406",
          "opportunityName": "Electric Vehicle Submeter Billing",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Rate Billing Option",
          "administrator": "SDG&E",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric",
          "applicationUrl": "https://www.sdge.com/business/electric-vehicles/lovelectric/ev-charging-station-submeter-billing",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches SDG&E.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, business_support, demand_response."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is not an EV charger installation incentive.",
            "This is not a general building energy monitoring or non-EV submetering program.",
            "No rebate for EVSE hardware or construction cost is supported.",
            "Rate treatment depends on approved EV submeter equipment and data processes."
          ],
          "hardRequirements": [
            "Submetering must measure EV charging station energy use.",
            "Only approved submetering products may be used.",
            "SDG&E uses the approved product list process identified for EV submeter billing.",
            "Meter data services must be provided by SDG&E or an approved Meter Data Management Agent.",
            "Participation is subject to SDG&E billing option rules."
          ],
          "eligibleApplicantTypes": [
            "sdge_customer",
            "third_party_ev_charging_operator",
            "approved_meter_data_management_agent"
          ],
          "eligibleSectors": [
            "commercial",
            "multifamily",
            "residential",
            "ev_charging"
          ],
          "eligibleRetrofitCategories": [
            "ev_charging_submeter_billing"
          ],
          "evidenceText": "SDG&E describes EV Charging Station Submeter Billing as a billing option using approved submeters and approved meter data services for EV charging energy.",
          "reasoningNotes": "Replace generic EV charger installation and broad submetering categories with EV charging submeter billing only."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_25406",
          "programName": "Electric Vehicle Submeter Billing",
          "calculationStatus": "non_monetary_workflow",
          "runtimeInclusionStatus": "non_monetary_workflow",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "approved_ev_submeter_product",
            "approved_meter_data_management_agent",
            "ev_charging_kwh",
            "qualifying_ev_rate_plan",
            "primary_meter_authorization"
          ],
          "defaultedInputs": [
            {
              "inputKey": "approved_ev_submeter_product",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "approved_meter_data_management_agent",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ev_charging_kwh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "qualifying_ev_rate_plan",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "primary_meter_authorization",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 0,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_process_value_1_e80436c4cc01fd78",
              "effectType": "process_value",
              "calculationMethod": "zero_when_not_applicable",
              "valueModelKind": "non_cash_process_value",
              "cashValueClassification": "process_value",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        }
      ]
    },
    {
      "retrofitTypeId": "thermal_energy_storage",
      "displayName": "Thermal energy storage",
      "parentCategory": "energy_storage_resilience",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 5510000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 324000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 324000,
        "incentiveCalculationPackageCounts": {
          "matchedPackageCount": 0,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 0
        }
      },
      "scenarios": [
        {
          "scenarioRole": "selected",
          "id": "scenario_no_incentives",
          "name": "No incentives",
          "status": "calculated",
          "opportunityIds": [],
          "incentiveRuleIds": [],
          "totalUpfrontSavingsCents": 0,
          "possibleGrantMoneyCents": 0,
          "firstYearRecurringSavingsCents": 0,
          "firstYearRecurringExpensesCents": 0,
          "firstYearNetRecurringSavingsCents": 0,
          "firstYearTotalBenefitCents": 0,
          "upfrontCostAfterSavingsCents": 5510000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:658",
          "opportunityName": "Business Energy Investment Tax Credit (ITC)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Tax Credit",
          "administrator": "U.S. Internal Revenue Service",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc",
          "applicationUrl": "https://www.irs.gov/pub/irs-pdf/f3468.pdf",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: commercial.",
            "User site is compatible with broad commercial facility eligibility.",
            "Opportunity technology is available for retrofit discovery: solar, hvac, lighting, battery_storage, renewable_energy, wind, biomass_biogas, fleet_electrification, clean_transportation, fuel_cell_system."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a rebate or utility incentive; matching should treat this as a federal tax credit.",
            "Generic LED lighting and ordinary high-efficiency HVAC replacement are not supported unless the installed property independently qualifies as listed energy property.",
            "Broad biomass combustion is not supported by current Form 3468 categories; qualified biogas property is narrower.",
            "A microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure."
          ],
          "hardRequirements": [
            "Property must qualify under Internal Revenue Code Section 48 or successor clean electricity investment credit rules as applicable.",
            "Taxpayer must file Form 3468 with the federal income tax return for the qualified property or facility.",
            "Credit rate and bonuses depend on placed-in-service date, prevailing wage and apprenticeship rules, domestic content, energy community, and other federal requirements.",
            "Elective pay and transferability are available only for eligible taxpayers and credits under IRS rules."
          ],
          "eligibleApplicantTypes": [
            "business_taxpayer",
            "corporation",
            "partnership",
            "sole_proprietor",
            "tax_exempt_entity_elective_pay",
            "government_entity_elective_pay",
            "tribal_government_elective_pay"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "agricultural",
            "nonprofit",
            "government",
            "tribal",
            "utility"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "thermal_energy_storage",
            "qualified_biogas_property",
            "combined_heat_and_power_system",
            "ground_source_geothermal_heat_pump",
            "solar_water_heating_system",
            "solar_thermal_energy_property",
            "microgrid_controller"
          ],
          "evidenceText": "IRS Form 3468 and instructions identify energy credit categories including energy storage, combined heat and power, biogas property, geothermal heat pumps, solar thermal property, and microgrid controllers.",
          "reasoningNotes": "Retained only current federal tax-credit energy property categories. Removed unsupported generic efficiency measures and narrowed microgrid and biogas matches to the product types in IRS sources."
        }
      ],
      "v2PackageSummaries": []
    }
  ]
}
