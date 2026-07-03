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
  "testCaseOrdinal": 1,
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

Packet 1 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 1,
  "sampleUserId": "california-endowment-hq",
  "description": "Owner-controlled nonprofit office headquarters and conference center in LADWP electric territory.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "nonprofit"
      ],
      "primaryActivityText": "Grantmaking, health-equity philanthropy, nonprofit administration, meetings, and community events",
      "naicsCodes": [
        "813211"
      ],
      "organizationSize": "51-250 employees"
    },
    "site": {
      "address": {
        "raw": "1000 N Alameda Street, Los Angeles, CA 90012, USA",
        "stateCode": "CA",
        "zip5": "90012"
      },
      "geo": {
        "stateCode": "CA",
        "zip5": "90012",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Los Angeles Department of Water and Power",
          "distributionUtilityId": "UTIL_LADWP",
          "territoryCandidates": [
            "UTIL_LADWP"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "owner",
      "buildingTypes": [
        "office_admin"
      ],
      "squareFootage": {
        "value": 210459,
        "raw": "210,459",
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
    "eligible": 18,
    "ineligible": 1501
  },
  "retrofitCount": 16,
  "retrofits": [
    {
      "retrofitTypeId": "ev_charger_installation",
      "displayName": "EV charger installation",
      "parentCategory": "ev_charging_transportation",
      "isPhysicalRetrofit": true,
      "opportunityCount": 4,
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
          "matchedPackageCount": 4,
          "runtimeRuleCount": 0,
          "includedPackageCount": 0,
          "missingInputPackageCount": 0,
          "legacyPreferredPackageCount": 0,
          "suppressedPackageCount": 4
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
            "Applicant type overlaps eligible sector: nonprofit.",
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
            "Applicant type overlaps eligible sector: nonprofit.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Applicant type overlaps eligible sector: nonprofit.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Applicant type overlaps eligible sector: nonprofit.",
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
            "Applicant type overlaps eligible sector: nonprofit.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1866",
          "opportunityName": "LADWP - Non-Residential Energy Efficiency Incentive Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Commercial Lighting Rebate",
          "administrator": "Los Angeles Department of Water and Power",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1866/ladwp-non-residential-energy-efficiency-incentive-program",
          "applicationUrl": "https://www.ladwp.com/commercial-services/programs-and-rebates-commercial/commercial-lighting-incentive-program",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches LADWP.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: lighting, commercial_kitchen, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Limit this opportunity to lighting and lighting controls.",
            "Commercial EV chargers, demand response, direct install, and other LADWP business programs are separate opportunities.",
            "Do not infer residential lighting or non-lighting equipment."
          ],
          "hardRequirements": [
            "Applicant must be a current LADWP commercial customer in good standing.",
            "Monthly electrical use or facilities charge must exceed 200 kW.",
            "DLC or LADWP-qualified products are required where applicable.",
            "LADWP approval is required before purchase, installation, or operation.",
            "Project must achieve at least 25% energy savings.",
            "Project must meet LADWP completion deadlines."
          ],
          "eligibleApplicantTypes": [
            "non_residential_electric_customers",
            "commercial_electric_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "municipal"
          ],
          "eligibleRetrofitCategories": [
            "led_lighting_retrofit",
            "lighting_controls"
          ],
          "evidenceText": "LADWP's]( commercial lighting program provides rebates for newly purchased and installed energy-efficient lighting and controls, including LED fixtures, exterior LEDs, LED lamp replacements and controls. Projects need pre-approval, qualifying equipment, high demand and 25% energy savings.",
          "reasoningNotes": "The LED lighting match is supported, but the record should be narrowed to LADWP's commercial lighting incentive rather than generalized non-residential efficiency."
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:1866",
          "programName": "LADWP - Non-Residential Energy Efficiency Incentive Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "measure_category",
            "qualification_tier",
            "ladwp_calculated_annual_kwh_savings",
            "eligible_project_cost",
            "dlc_or_ladwp_qualification",
            "ladwp_preapproval",
            "annual_kwh_savings"
          ],
          "defaultedInputs": [
            {
              "inputKey": "measure_category",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "qualification_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ladwp_calculated_annual_kwh_savings",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dlc_or_ladwp_qualification",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ladwp_preapproval",
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
              "effectId": "effect_one_time_savings_1_c1d5b880bdf2c226",
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
      "retrofitTypeId": "battery_storage_system",
      "displayName": "Battery storage system",
      "parentCategory": "energy_storage_resilience",
      "isPhysicalRetrofit": true,
      "opportunityCount": 3,
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Applicant type overlaps eligible sector: nonprofit.",
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
            "Applicant type overlaps eligible sector: nonprofit.",
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
      "retrofitTypeId": "biomass_biogas_energy_system",
      "displayName": "Biomass / biogas energy system",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 4,
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Applicant type overlaps eligible sector: nonprofit.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Applicant type overlaps eligible sector: nonprofit.",
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
      "retrofitTypeId": "high_efficiency_hvac_replacement",
      "displayName": "High-efficiency HVAC replacement",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 4,
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Applicant type overlaps eligible sector: nonprofit.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
        }
      ]
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
      "retrofitTypeId": "combined_heat_and_power_system",
      "displayName": "Combined heat and power system",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Applicant type overlaps eligible sector: nonprofit.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5685",
          "opportunityName": "LADWP - Feed-in Tariff (FiT) Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Feed In Tariff",
          "administrator": "Los Angeles Department of Water and Power",
          "state": "CA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.78,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5685/ladwp-feed-in-tariff-fit-program",
          "applicationUrl": "https://www.ladwp.com/sites/default/files/2024-10/FiT%20Application%20Package.pdf",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state CA matches opportunity geography.",
            "Self-reported utility matches LADWP.",
            "Nonresidential applicant is compatible with broad commercial eligibility.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: solar."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match as a behind-the-meter rooftop solar rebate, net-metering program, or customer bill-saving incentive.",
            "FiT+ solar-plus-storage is a related but separate pilot program with separate application and eligibility rules."
          ],
          "hardRequirements": [
            "Applicant must submit a complete hard-copy FiT application package with required fees, deposits, and forms.",
            "Project must be in LADWP service territory and applicant must demonstrate site control and qualified project-development experience.",
            "Output is sold directly to LADWP under a Standard Offer Power Purchase Agreement for up to 20 years."
          ],
          "eligibleApplicantTypes": [
            "property_owner",
            "renewable_energy_developer",
            "project_company"
          ],
          "eligibleSectors": [
            "commercial",
            "public",
            "industrial",
            "institutional"
          ],
          "eligibleRetrofitCategories": [
            "front_of_meter_solar_pv",
            "solar_carport_canopy",
            "eligible_renewable_generation_feed_in_tariff"
          ],
          "evidenceText": "LADWP FiT buys output from local eligible renewable energy projects, with available capacity updated June 2026 and hard-copy applications required.",
          "reasoningNotes": "Solar PV is supported only as a feed-in-tariff renewable generation project. Replaced generic rooftop_solar_pv with front-of-meter and tariff-specific categories."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5685",
          "programName": "LADWP - Feed-in Tariff (FiT) Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "project_capacity_kw",
            "project_location",
            "technology_type",
            "metered_monthly_generation_kwh",
            "soppa_approval",
            "available_fit_capacity",
            "metered_generation_kwh",
            "project_capacity",
            "approved_fit_price",
            "installed_carport_or_canopy_watts",
            "project_size_tier",
            "disadvantaged_community_status",
            "installed_watts",
            "dac_status",
            "approved_carport_or_canopy_eligibility"
          ],
          "defaultedInputs": [
            {
              "inputKey": "project_capacity_kw",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "project_location",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "technology_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "metered_monthly_generation_kwh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "soppa_approval",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "available_fit_capacity",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "metered_generation_kwh",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "project_capacity",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "approved_fit_price",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "installed_carport_or_canopy_watts",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "project_size_tier",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "disadvantaged_community_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "installed_watts",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "dac_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "approved_carport_or_canopy_eligibility",
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
              "effectId": "effect_recurring_savings_1_c3abe3f18b682fb7",
              "effectType": "recurring_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "tariff_or_rate",
              "cashValueClassification": "tariff_or_rate",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 0,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_5c29b07663d6f983",
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
      "retrofitTypeId": "small_wind_turbine",
      "displayName": "Small wind turbine",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
            "Nonresidential applicant is compatible with broad commercial eligibility.",
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
