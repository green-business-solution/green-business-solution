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
  "testCaseOrdinal": 43,
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

Packet 43 of 50:
{
  "schemaVersion": "retrofi_scenario_combination_packet.v1",
  "testCaseOrdinal": 43,
  "sampleUserId": "boston-latin-school",
  "description": "Large urban public school in Boston with IAQ-sensitive HVAC, cafeteria, gym, and auditorium loads.",
  "userProfile": {
    "business": {
      "organizationTypes": [
        "government"
      ],
      "primaryActivityText": "Public secondary education, cafeteria operations, athletics, auditorium events, and school administration",
      "naicsCodes": [
        "611110"
      ],
      "organizationSize": "51-250 employees"
    },
    "site": {
      "address": {
        "raw": "78 Avenue Louis Pasteur, Boston, MA 02115, USA",
        "stateCode": "MA",
        "zip5": "02115"
      },
      "geo": {
        "stateCode": "MA",
        "zip5": "02115",
        "countyFips": null,
        "placeGeoid": null,
        "censusTractGeoid": null,
        "designations": []
      },
      "utility": {
        "electric": {
          "selfReportedName": "Eversource",
          "distributionUtilityId": "UTIL_EVERSOURCE",
          "territoryCandidates": [
            "UTIL_EVERSOURCE"
          ],
          "verificationStatus": "self_reported_unverified",
          "customerClass": null
        }
      },
      "ownershipRelationship": "owner",
      "buildingTypes": [
        "education_campus"
      ],
      "squareFootage": {
        "value": 325000,
        "raw": "325,000",
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
    "eligible": 15,
    "ineligible": 1504
  },
  "retrofitCount": 14,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22187",
          "opportunityName": "MassEVIP Public Access Charging (PAC) Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Grant Program",
          "administrator": "Massachusetts Department of Environmental Protection",
          "state": "MA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22187/massevip-public-access-charging-pac-program",
          "applicationUrl": "https://www.mass.gov/forms/massevip-public-access-charging-pac-program-application",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match private home charging.",
            "Do not match DC fast charging.",
            "Do not match chargers without public-access availability unless a separate MassEVIP program applies."
          ],
          "hardRequirements": [
            "Charging must be public-access and meet MassEVIP PAC requirements.",
            "Equipment must be eligible Level 1 or Level 2 AC charging equipment.",
            "Applicant must submit required application materials and comply with program cost-share and access rules."
          ],
          "eligibleApplicantTypes": [
            "business",
            "nonprofit",
            "public_agency",
            "municipality",
            "site_host",
            "property_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "public",
            "nonprofit",
            "transportation"
          ],
          "eligibleRetrofitCategories": [
            "level_1_ev_charger_installation",
            "level_2_ev_charger_installation"
          ],
          "evidenceText": "MassEVIP PAC materials support incentives for public-access Level 1 and Level 2 charging equipment at eligible Massachusetts sites under program requirements.",
          "reasoningNotes": "Some official content was access-limited, but official application and requirements sources support Level 1 and Level 2 public-access charging."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22185",
          "opportunityName": "MassEVIP Fleets Charging Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Grant Program",
          "administrator": "Massachusetts Department of Environmental Protection",
          "state": "MA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22185/massevip-fleets-charging-program",
          "applicationUrl": "https://www.mass.gov/forms/massevip-workplace-and-fleet-wpf-charging-program-application",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: fleet_electrification, ev_charging, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match to DC fast-charging unless a separate MassEVIP offer explicitly supports it.",
            "Do not match to residential single-family chargers or vehicle purchases.",
            "Do not treat this as a general building energy efficiency rebate."
          ],
          "hardRequirements": [
            "Applicant and site must meet MassEVIP Workplace and Fleet Charging Program eligibility requirements.",
            "Incentives are for eligible Level 1 or Level 2 workplace and fleet charging equipment and installation costs.",
            "Application must be submitted through the MassEVIP program process before relying on funding."
          ],
          "eligibleApplicantTypes": [
            "business_owner",
            "fleet_operator",
            "nonprofit",
            "public_agency",
            "educational_institution",
            "multiunit_dwelling_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "public",
            "nonprofit",
            "institutional",
            "multifamily"
          ],
          "eligibleRetrofitCategories": [
            "level_1_ev_charger",
            "level_2_ev_charger",
            "ev_charger_installation"
          ],
          "evidenceText": "MassEVIP]( Workplace and Fleet materials describe incentives and an application process for eligible Massachusetts workplace and fleet Level 1 and Level 2 charging projects.",
          "reasoningNotes": "Official pages were difficult to access directly, but official Mass.gov application and program references support the EV charging match. Confidence is medium rather than high due limited readable source detail."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22186",
          "opportunityName": "MassEVIP Workplace and Fleet Charging Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant",
          "administrator": "Massachusetts Department of Environmental Protection",
          "state": "MA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22186/massevip-workplace-and-fleet-charging-program",
          "applicationUrl": "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Public charging, DC fast charging and multifamily or private residential charging are handled by other MassEVIP programs.",
            "Non-workplace and non-fleet sites are not eligible for this specific program.",
            "Equipment installed outside program approval rules may be ineligible.",
            "Do not generalize this to all Massachusetts EV charging programs."
          ],
          "hardRequirements": [
            "Site must be an eligible Massachusetts workplace or fleet location.",
            "Applicant must be an eligible employer or fleet operator.",
            "Project must acquire and install qualifying Level 1 or Level 2 charging equipment.",
            "MassDEP application, approvals and required documentation are required.",
            "Reimbursement is subject to program cost-share limits and caps.",
            "Applicant must comply with workplace or fleet charging terms."
          ],
          "eligibleApplicantTypes": [
            "employers",
            "fleet_operators",
            "businesses",
            "nonprofits",
            "local_governments",
            "state_agencies",
            "educational_institutions"
          ],
          "eligibleSectors": [
            "commercial",
            "government",
            "nonprofit",
            "institutional",
            "fleet",
            "workplace"
          ],
          "eligibleRetrofitCategories": [
            "level_1_ev_charger_installation",
            "level_2_ev_charger_installation",
            "fleet_charging_infrastructure"
          ],
          "evidenceText": "MassEVIP materials describe Workplace and Fleet Charging as incentives for employers and fleet operators to acquire and install Level 1 and Level 2 charging; other MassEVIP programs cover public-access, MUD and fast charging.",
          "reasoningNotes": "The official page and MassDEP documents support workplace and fleet Level 1 and Level 2 charging. The main page was partly difficult to read, so confidence is medium rather than high."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22188",
          "opportunityName": "MassEVIP Multi-Unit Dwelling (MUD) and Educational Campus Charging Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Grant Program",
          "administrator": "Massachusetts Department of Environmental Protection",
          "state": "MA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22188/massevip-multi-unit-dwelling-mud-and-educational-campus-charging-program",
          "applicationUrl": "https://www.mass.gov/forms/massevip-multi-unit-dwelling-and-educational-campus-mudc-charging-program-application",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "Site or facility type matches: education_campus.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match single-family residential home chargers.",
            "Do not match DC fast charging.",
            "Do not match generic EV charging outside the multi-unit dwelling or educational campus program scope."
          ],
          "hardRequirements": [
            "Site must be an eligible multi-unit dwelling or educational campus.",
            "Charging equipment must meet MassEVIP program requirements.",
            "Application and supporting documentation are required before or as required by program rules."
          ],
          "eligibleApplicantTypes": [
            "multifamily_property_owner",
            "condominium_association",
            "educational_institution",
            "property_manager"
          ],
          "eligibleSectors": [
            "multifamily",
            "education",
            "commercial"
          ],
          "eligibleRetrofitCategories": [
            "level_1_ev_charger_installation",
            "level_2_ev_charger_installation"
          ],
          "evidenceText": "MassEVIP materials identify charging incentives for multi-unit dwellings and educational campuses, with Level 1 and Level 2 equipment within defined site eligibility rules.",
          "reasoningNotes": "Some official page content was access-limited, but official forms and program snippets support the core match; confidence remains medium."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22186",
          "programName": "MassEVIP Workplace and Fleet Charging Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "street_address",
            "charger_level",
            "hardware_cost",
            "installation_cost",
            "eligible_cost_after_other_funding",
            "workplace_or_fleet_path"
          ],
          "defaultedInputs": [
            {
              "inputKey": "street_address",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "charger_level",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "hardware_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_cost_after_other_funding",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "workplace_or_fleet_path",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 360000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_ce189e33678bb98d",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "cash_grant",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 360000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22188",
          "programName": "MassEVIP Multi-Unit Dwelling (MUD) and Educational Campus Charging Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "eligible_cost",
            "street_address",
            "site_type",
            "charger_level",
            "charger_count",
            "applicant_type"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_count",
              "source": "derived_or_placeholder_quantity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "street_address",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "charger_level",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "applicant_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 360000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_52088637b4b65779",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "reimbursement",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 360000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22187",
          "programName": "MassEVIP Public Access Charging (PAC) Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "eligible_cost",
            "address",
            "ownership_type",
            "charger_level",
            "public_access_hours",
            "government_ownership_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_level",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "address",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ownership_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "public_access_hours",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "government_ownership_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 1080000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_fdd1bc36b4477e63",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "reimbursement",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 480000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_13993b61b086fb80",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "reimbursement",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 600000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22185",
          "programName": "MassEVIP Fleets Charging Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "eligible_hardware_and_installation_cost",
            "street_address",
            "charger_level",
            "applicant_type",
            "application_approval"
          ],
          "defaultedInputs": [
            {
              "inputKey": "street_address",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "charger_level",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "applicant_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_hardware_and_installation_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "application_approval",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 360000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_0fd8d12183e965b4",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "cash_grant",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 360000,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:146",
          "opportunityName": "Renewable Energy Property Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Massachusetts Department of Revenue",
          "state": "MA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/146/renewable-energy-property-tax-exemption",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "Site or facility type matches: education_campus.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, wind, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match solar water heating or generic solar thermal; the current statute is framed around electricity generation and qualifying fuel cells.",
            "Do not match standalone batteries that are not co-located with or part of a qualifying solar or wind system.",
            "Do not match utility-owned distribution-company systems where the statute excludes them."
          ],
          "hardRequirements": [
            "Solar or wind systems, including co-located storage, must meet the statutory size, property-use, or PILOT conditions.",
            "Qualifying systems generally must be no more than 125 percent of the property's annual electricity needs, 25 kW or less with required verification, or covered by a PILOT agreement.",
            "Fuel cell systems must meet the statutory qualified fuel cell definition and energy-use limitation.",
            "Exemption is limited to the statutory period and does not apply to systems owned by distribution or electric companies where excluded."
          ],
          "eligibleApplicantTypes": [
            "property owners",
            "renewable energy system owners",
            "fuel cell system owners",
            "municipal PILOT participants"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "government",
            "nonprofit",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "wind_energy_system",
            "renewable_energy_storage_system",
            "fuel_cell_system"
          ],
          "evidenceText": "Massachusetts]( law exempts qualifying solar or wind systems and co-located storage under Clause 45, and qualifying fuel cell systems under Clause 45B. The statute does not support solar water heating as a current match.",
          "reasoningNotes": "Repaired solar thermal to solar or wind electricity-related categories and qualifying fuel cell systems."
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22037",
          "opportunityName": "PACE Massachusetts Financing",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "C Pace Financing",
          "administrator": "Massachusetts Development Finance Agency",
          "state": "MA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.79,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22037/pace-massachusetts-financing",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: energy_efficiency, renewable_energy, solar, battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match one-to-four-unit residential properties.",
            "Do not treat as a rebate or grant.",
            "Power purchase agreements and equipment leases are not eligible PACE-financed improvements.",
            "Standalone storage must meet dispatch and performance rules; it is not an unrestricted battery rebate.",
            "Do not match municipalities that have not opted in."
          ],
          "hardRequirements": [
            "Property must be commercial, industrial, nonprofit, or multifamily with five or more units.",
            "Municipality must have opted into PACE Massachusetts.",
            "Project must meet MassDevelopment technical guidelines and be permanently affixed to the property.",
            "Project must satisfy savings-to-investment or renewable/storage eligibility requirements.",
            "Financing is arranged through an approved capital provider and repaid by assessment."
          ],
          "eligibleApplicantTypes": [
            "commercial_property_owner",
            "industrial_property_owner",
            "multifamily_5_plus_property_owner",
            "nonprofit_property_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "multifamily_5_plus",
            "nonprofit"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_system",
            "energy_efficiency_upgrade",
            "led_lighting_retrofit",
            "lighting_controls",
            "high_efficiency_hvac_replacement",
            "chiller_upgrade",
            "boiler_furnace_upgrade",
            "motor_drive_upgrade",
            "building_envelope",
            "insulation",
            "air_sealing",
            "efficient_electrification",
            "energy_management_system",
            "energy_recovery_system",
            "solar_photovoltaic",
            "solar_thermal",
            "wind_energy",
            "anaerobic_digestion",
            "geothermal_heat_pump",
            "air_source_heat_pump",
            "biomass_heating"
          ],
          "evidenceText": "MassDevelopment]( says PACE Massachusetts finances commercial, industrial, nonprofit, and 5+ multifamily energy improvements; technical guidance includes lighting, HVAC, envelope, renewable energy and stand-alone storage.",
          "reasoningNotes": "The battery match is valid only under PACE Massachusetts storage eligibility and commercial property rules."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:146",
          "opportunityName": "Renewable Energy Property Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Massachusetts Department of Revenue",
          "state": "MA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/146/renewable-energy-property-tax-exemption",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "Site or facility type matches: education_campus.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, wind, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match solar water heating or generic solar thermal; the current statute is framed around electricity generation and qualifying fuel cells.",
            "Do not match standalone batteries that are not co-located with or part of a qualifying solar or wind system.",
            "Do not match utility-owned distribution-company systems where the statute excludes them."
          ],
          "hardRequirements": [
            "Solar or wind systems, including co-located storage, must meet the statutory size, property-use, or PILOT conditions.",
            "Qualifying systems generally must be no more than 125 percent of the property's annual electricity needs, 25 kW or less with required verification, or covered by a PILOT agreement.",
            "Fuel cell systems must meet the statutory qualified fuel cell definition and energy-use limitation.",
            "Exemption is limited to the statutory period and does not apply to systems owned by distribution or electric companies where excluded."
          ],
          "eligibleApplicantTypes": [
            "property owners",
            "renewable energy system owners",
            "fuel cell system owners",
            "municipal PILOT participants"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "government",
            "nonprofit",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "wind_energy_system",
            "renewable_energy_storage_system",
            "fuel_cell_system"
          ],
          "evidenceText": "Massachusetts]( law exempts qualifying solar or wind systems and co-located storage under Clause 45, and qualifying fuel cell systems under Clause 45B. The statute does not support solar water heating as a current match.",
          "reasoningNotes": "Repaired solar thermal to solar or wind electricity-related categories and qualifying fuel cell systems."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22744",
          "opportunityName": "MassSAVE (Electric) - CI Connected Solutions Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Performance Based Demand Response Incentive",
          "administrator": "Mass Save sponsors: Cape Light Compact, Eversource, National Grid, and Unitil",
          "state": "MA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.8,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22744/masssave-electric-ci-connected-solutions-program",
          "applicationUrl": "https://www.masssave.com/business/rebates-offers-services/commercialconnectedsolutions",
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MA matches opportunity geography.",
            "Self-reported utility matches Eversource.",
            "Applicant type overlaps eligible sector: government.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: battery_storage."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "This is a performance-based demand-response incentive, not an upfront battery installation rebate.",
            "Residential battery systems belong to the residential ConnectedSolutions program.",
            "Do not match solar-only, backup-only, or non-dispatchable storage projects."
          ],
          "hardRequirements": [
            "Customer must be an existing commercial electric customer of a participating sponsor utility.",
            "Customer must pay into the Massachusetts energy efficiency fund.",
            "Participant must enroll through an approved curtailment service provider or direct utility participation path.",
            "Asset must be capable of reducing or shifting load during called peak-demand events.",
            "Incentive is based on average kW reduction over the season, not equipment cost."
          ],
          "eligibleApplicantTypes": [
            "commercial_electric_customers",
            "industrial_electric_customers",
            "business_electric_customers"
          ],
          "eligibleSectors": [
            "commercial",
            "industrial",
            "institutional",
            "municipal"
          ],
          "eligibleRetrofitCategories": [
            "battery_storage_demand_response",
            "energy_storage_dispatch",
            "demand_response_controls",
            "active_load_curtailment",
            "peak_load_reduction",
            "energy_management_systems"
          ],
          "evidenceText": "Mass]( Save says Commercial ConnectedSolutions pays businesses performance incentives for lowering or shifting electricity use during peak demand using controls, energy storage and active monitoring. Participants are paid on average kW reduction over the season.",
          "reasoningNotes": "The battery storage match should be modeled as dispatchable battery demand-response participation, not as a general storage purchase or installation rebate."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22744",
          "programName": "MassSAVE (Electric) - CI Connected Solutions Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "participating_mass_save_sponsor",
            "program_pathway",
            "average_kw_reduction_or_battery_contribution",
            "season_event_performance",
            "curtailment_service_provider_terms",
            "site_peak_load_for_battery_cap"
          ],
          "defaultedInputs": [
            {
              "inputKey": "participating_mass_save_sponsor",
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
              "inputKey": "average_kw_reduction_or_battery_contribution",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "season_event_performance",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "curtailment_service_provider_terms",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_peak_load_for_battery_cap",
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
              "effectId": "effect_recurring_savings_1_518b1e4f1047272b",
              "effectType": "recurring_savings",
              "calculationMethod": "rate_table",
              "valueModelKind": "rate_table",
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
      "retrofitTypeId": "level_2_ev_charger_installation",
      "displayName": "Level 2 EV charger installation",
      "parentCategory": "ev_charging_transportation",
      "isPhysicalRetrofit": true,
      "opportunityCount": 3,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22187",
          "opportunityName": "MassEVIP Public Access Charging (PAC) Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Grant Program",
          "administrator": "Massachusetts Department of Environmental Protection",
          "state": "MA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22187/massevip-public-access-charging-pac-program",
          "applicationUrl": "https://www.mass.gov/forms/massevip-public-access-charging-pac-program-application",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "No site or facility type restriction was found after source review.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match private home charging.",
            "Do not match DC fast charging.",
            "Do not match chargers without public-access availability unless a separate MassEVIP program applies."
          ],
          "hardRequirements": [
            "Charging must be public-access and meet MassEVIP PAC requirements.",
            "Equipment must be eligible Level 1 or Level 2 AC charging equipment.",
            "Applicant must submit required application materials and comply with program cost-share and access rules."
          ],
          "eligibleApplicantTypes": [
            "business",
            "nonprofit",
            "public_agency",
            "municipality",
            "site_host",
            "property_owner"
          ],
          "eligibleSectors": [
            "commercial",
            "public",
            "nonprofit",
            "transportation"
          ],
          "eligibleRetrofitCategories": [
            "level_1_ev_charger_installation",
            "level_2_ev_charger_installation"
          ],
          "evidenceText": "MassEVIP PAC materials support incentives for public-access Level 1 and Level 2 charging equipment at eligible Massachusetts sites under program requirements.",
          "reasoningNotes": "Some official content was access-limited, but official application and requirements sources support Level 1 and Level 2 public-access charging."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22186",
          "opportunityName": "MassEVIP Workplace and Fleet Charging Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant",
          "administrator": "Massachusetts Department of Environmental Protection",
          "state": "MA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22186/massevip-workplace-and-fleet-charging-program",
          "applicationUrl": "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Public charging, DC fast charging and multifamily or private residential charging are handled by other MassEVIP programs.",
            "Non-workplace and non-fleet sites are not eligible for this specific program.",
            "Equipment installed outside program approval rules may be ineligible.",
            "Do not generalize this to all Massachusetts EV charging programs."
          ],
          "hardRequirements": [
            "Site must be an eligible Massachusetts workplace or fleet location.",
            "Applicant must be an eligible employer or fleet operator.",
            "Project must acquire and install qualifying Level 1 or Level 2 charging equipment.",
            "MassDEP application, approvals and required documentation are required.",
            "Reimbursement is subject to program cost-share limits and caps.",
            "Applicant must comply with workplace or fleet charging terms."
          ],
          "eligibleApplicantTypes": [
            "employers",
            "fleet_operators",
            "businesses",
            "nonprofits",
            "local_governments",
            "state_agencies",
            "educational_institutions"
          ],
          "eligibleSectors": [
            "commercial",
            "government",
            "nonprofit",
            "institutional",
            "fleet",
            "workplace"
          ],
          "eligibleRetrofitCategories": [
            "level_1_ev_charger_installation",
            "level_2_ev_charger_installation",
            "fleet_charging_infrastructure"
          ],
          "evidenceText": "MassEVIP materials describe Workplace and Fleet Charging as incentives for employers and fleet operators to acquire and install Level 1 and Level 2 charging; other MassEVIP programs cover public-access, MUD and fast charging.",
          "reasoningNotes": "The official page and MassDEP documents support workplace and fleet Level 1 and Level 2 charging. The main page was partly difficult to read, so confidence is medium rather than high."
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22188",
          "opportunityName": "MassEVIP Multi-Unit Dwelling (MUD) and Educational Campus Charging Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Grant Program",
          "administrator": "Massachusetts Department of Environmental Protection",
          "state": "MA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22188/massevip-multi-unit-dwelling-mud-and-educational-campus-charging-program",
          "applicationUrl": "https://www.mass.gov/forms/massevip-multi-unit-dwelling-and-educational-campus-mudc-charging-program-application",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "Site or facility type matches: education_campus.",
            "Opportunity technology is available for retrofit discovery: ev_charging."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match single-family residential home chargers.",
            "Do not match DC fast charging.",
            "Do not match generic EV charging outside the multi-unit dwelling or educational campus program scope."
          ],
          "hardRequirements": [
            "Site must be an eligible multi-unit dwelling or educational campus.",
            "Charging equipment must meet MassEVIP program requirements.",
            "Application and supporting documentation are required before or as required by program rules."
          ],
          "eligibleApplicantTypes": [
            "multifamily_property_owner",
            "condominium_association",
            "educational_institution",
            "property_manager"
          ],
          "eligibleSectors": [
            "multifamily",
            "education",
            "commercial"
          ],
          "eligibleRetrofitCategories": [
            "level_1_ev_charger_installation",
            "level_2_ev_charger_installation"
          ],
          "evidenceText": "MassEVIP materials identify charging incentives for multi-unit dwellings and educational campuses, with Level 1 and Level 2 equipment within defined site eligibility rules.",
          "reasoningNotes": "Some official page content was access-limited, but official forms and program snippets support the core match; confidence remains medium."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22186",
          "programName": "MassEVIP Workplace and Fleet Charging Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "street_address",
            "charger_level",
            "hardware_cost",
            "installation_cost",
            "eligible_cost_after_other_funding",
            "workplace_or_fleet_path"
          ],
          "defaultedInputs": [
            {
              "inputKey": "street_address",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "charger_level",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "hardware_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_cost_after_other_funding",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "workplace_or_fleet_path",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 360000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_ce189e33678bb98d",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "cash_grant",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 360000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22188",
          "programName": "MassEVIP Multi-Unit Dwelling (MUD) and Educational Campus Charging Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "eligible_cost",
            "street_address",
            "site_type",
            "charger_level",
            "charger_count",
            "applicant_type"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_count",
              "source": "derived_or_placeholder_quantity",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "street_address",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "charger_level",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "applicant_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 360000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_52088637b4b65779",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "reimbursement",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 360000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            }
          ]
        },
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22187",
          "programName": "MassEVIP Public Access Charging (PAC) Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "medium",
          "missingInputs": [],
          "requiredInputs": [
            "eligible_cost",
            "address",
            "ownership_type",
            "charger_level",
            "public_access_hours",
            "government_ownership_status"
          ],
          "defaultedInputs": [
            {
              "inputKey": "charger_level",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "address",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "ownership_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "public_access_hours",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "government_ownership_status",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 1080000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_fdd1bc36b4477e63",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "reimbursement",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 480000,
              "annualizedAmountCents": 0,
              "missingInputs": []
            },
            {
              "effectId": "effect_one_time_savings_2_13993b61b086fb80",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "reimbursement",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 600000,
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
      "opportunityCount": 2,
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
            "Applicant type overlaps eligible sector: government.",
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
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "fuel_cell_system",
      "displayName": "Fuel cell system",
      "parentCategory": "solar_renewable_electricity",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 11000000,
        "oneTimeSavingsCents": 0,
        "possibleGrantMoneyCents": 0,
        "annualRecurringSavingsCents": 1232000,
        "annualRecurringExpensesCents": 0,
        "netAnnualRecurringSavingsCents": 1232000,
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
          "upfrontCostAfterSavingsCents": 11000000,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:146",
          "opportunityName": "Renewable Energy Property Tax Exemption",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Property Tax Incentive",
          "administrator": "Massachusetts Department of Revenue",
          "state": "MA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.81,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/146/renewable-energy-property-tax-exemption",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "Site or facility type matches: education_campus.",
            "Opportunity technology is available for retrofit discovery: solar, battery_storage, renewable_energy, wind, fuel_cell_system, clean_transportation."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Do not match solar water heating or generic solar thermal; the current statute is framed around electricity generation and qualifying fuel cells.",
            "Do not match standalone batteries that are not co-located with or part of a qualifying solar or wind system.",
            "Do not match utility-owned distribution-company systems where the statute excludes them."
          ],
          "hardRequirements": [
            "Solar or wind systems, including co-located storage, must meet the statutory size, property-use, or PILOT conditions.",
            "Qualifying systems generally must be no more than 125 percent of the property's annual electricity needs, 25 kW or less with required verification, or covered by a PILOT agreement.",
            "Fuel cell systems must meet the statutory qualified fuel cell definition and energy-use limitation.",
            "Exemption is limited to the statutory period and does not apply to systems owned by distribution or electric companies where excluded."
          ],
          "eligibleApplicantTypes": [
            "property owners",
            "renewable energy system owners",
            "fuel cell system owners",
            "municipal PILOT participants"
          ],
          "eligibleSectors": [
            "residential",
            "commercial",
            "industrial",
            "government",
            "nonprofit",
            "agricultural"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system",
            "wind_energy_system",
            "renewable_energy_storage_system",
            "fuel_cell_system"
          ],
          "evidenceText": "Massachusetts]( law exempts qualifying solar or wind systems and co-located storage under Clause 45, and qualifying fuel cell systems under Clause 45B. The statute does not support solar water heating as a current match.",
          "reasoningNotes": "Repaired solar thermal to solar or wind electricity-related categories and qualifying fuel cell systems."
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "ground_source_geothermal_heat_pump",
      "displayName": "Ground-source / geothermal heat pump",
      "parentCategory": "hvac_space_conditioning",
      "isPhysicalRetrofit": true,
      "opportunityCount": 2,
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
            "Applicant type overlaps eligible sector: government.",
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
        }
      ],
      "v2PackageSummaries": []
    },
    {
      "retrofitTypeId": "air_sealing_weatherization",
      "displayName": "Air sealing / weatherization",
      "parentCategory": "building_envelope",
      "isPhysicalRetrofit": true,
      "opportunityCount": 1,
      "savingsPreview": {
        "status": "calculated",
        "unsupportedReason": null,
        "upfrontCostCents": 194600,
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
          "upfrontCostAfterSavingsCents": 194600,
          "upfrontSavingsEntries": [],
          "recurringSavingsEntries": [],
          "conflictExplanations": [],
          "capExplanations": [],
          "traceWarnings": []
        }
      ],
      "matchedOpportunities": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5712",
          "opportunityName": "Low Income Home Energy Assistance Program (LIHEAP)",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Federal Assistance / Grant Program",
          "administrator": "U.S. Department of Health and Human Services, Administration for Children and Families, Office of Community Services",
          "state": "US",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.77,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5712/low-income-home-energy-assistance-program-liheap",
          "applicationUrl": null,
          "matchedReasons": [
            "Opportunity appears active.",
            "Opportunity appears nationwide.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "Site or facility type matches: education_campus.",
            "Opportunity technology is available for retrofit discovery: building_envelope, energy_efficiency."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not a commercial or institutional retrofit program.",
            "Weatherization is optional and locally administered; do not assume every LIHEAP application funds physical retrofit work.",
            "LIHEAP should not be matched as a building retrofit rebate where the local grantee only provides bill or crisis assistance."
          ],
          "hardRequirements": [
            "Household must meet the applicable state, territory, tribal, or local LIHEAP eligibility rules.",
            "Assistance is administered by local LIHEAP grantees, not directly as a universal federal retrofit rebate.",
            "Weatherization and minor energy-related repairs depend on local grantee program options and funding.",
            "Funding is limited and may be seasonal."
          ],
          "eligibleApplicantTypes": [
            "low_income_household"
          ],
          "eligibleSectors": [
            "residential",
            "low_income"
          ],
          "eligibleRetrofitCategories": [
            "utility_bill_assistance",
            "energy_crisis_assistance",
            "home_weatherization",
            "minor_energy_related_home_repairs"
          ],
          "evidenceText": "ACF describes LIHEAP as federally funded assistance for home energy bills, energy crises, weatherization, and minor energy-related home repairs for low-income households.",
          "reasoningNotes": "The weatherization match is conditionally valid but must be flagged as locally administered and not universal across all LIHEAP grantees."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:5712",
          "programName": "Low Income Home Energy Assistance Program (LIHEAP)",
          "calculationStatus": "no_calculable_value",
          "runtimeInclusionStatus": "no_calculable_value",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [],
          "requiredInputs": [
            "administering_liheap_grantee",
            "local_benefit_type",
            "approved_household_benefit_or_service_scope",
            "approved_benefit_amount_or_service_scope"
          ],
          "defaultedInputs": [
            {
              "inputKey": "administering_liheap_grantee",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "local_benefit_type",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "approved_household_benefit_or_service_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "approved_benefit_amount_or_service_scope",
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
              "effectId": "effect_no_cash_value_1_2c3a4534ab53f492",
              "effectType": "no_cash_value",
              "calculationMethod": "custom_quote",
              "valueModelKind": "no_calculable_value",
              "cashValueClassification": "unknown",
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
      "opportunityCount": 1,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22186",
          "opportunityName": "MassEVIP Workplace and Fleet Charging Program",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "active",
          "programType": "Grant",
          "administrator": "Massachusetts Department of Environmental Protection",
          "state": "MA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "medium",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22186/massevip-workplace-and-fleet-charging-program",
          "applicationUrl": "https://www.mass.gov/how-to/apply-for-massevip-workplace-fleet-charging-incentives",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "User site is compatible with broad nonresidential facility eligibility.",
            "Opportunity technology is available for retrofit discovery: ev_charging, fleet_electrification."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Public charging, DC fast charging and multifamily or private residential charging are handled by other MassEVIP programs.",
            "Non-workplace and non-fleet sites are not eligible for this specific program.",
            "Equipment installed outside program approval rules may be ineligible.",
            "Do not generalize this to all Massachusetts EV charging programs."
          ],
          "hardRequirements": [
            "Site must be an eligible Massachusetts workplace or fleet location.",
            "Applicant must be an eligible employer or fleet operator.",
            "Project must acquire and install qualifying Level 1 or Level 2 charging equipment.",
            "MassDEP application, approvals and required documentation are required.",
            "Reimbursement is subject to program cost-share limits and caps.",
            "Applicant must comply with workplace or fleet charging terms."
          ],
          "eligibleApplicantTypes": [
            "employers",
            "fleet_operators",
            "businesses",
            "nonprofits",
            "local_governments",
            "state_agencies",
            "educational_institutions"
          ],
          "eligibleSectors": [
            "commercial",
            "government",
            "nonprofit",
            "institutional",
            "fleet",
            "workplace"
          ],
          "eligibleRetrofitCategories": [
            "level_1_ev_charger_installation",
            "level_2_ev_charger_installation",
            "fleet_charging_infrastructure"
          ],
          "evidenceText": "MassEVIP materials describe Workplace and Fleet Charging as incentives for employers and fleet operators to acquire and install Level 1 and Level 2 charging; other MassEVIP programs cover public-access, MUD and fast charging.",
          "reasoningNotes": "The official page and MassDEP documents support workplace and fleet Level 1 and Level 2 charging. The main page was partly difficult to read, so confidence is medium rather than high."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22186",
          "programName": "MassEVIP Workplace and Fleet Charging Program",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "not_user_facing_default",
          "includedInRuntimeTotals": false,
          "confidence": "high",
          "missingInputs": [],
          "requiredInputs": [
            "street_address",
            "charger_level",
            "hardware_cost",
            "installation_cost",
            "eligible_cost_after_other_funding",
            "workplace_or_fleet_path"
          ],
          "defaultedInputs": [
            {
              "inputKey": "street_address",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "charger_level",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "hardware_cost",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "eligible_cost_after_other_funding",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "workplace_or_fleet_path",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            }
          ],
          "totals": {
            "expectedOneTimeSavingsCents": 1200000,
            "expectedGrantAmountCents": 0,
            "expectedRecurringSavingsAnnualCents": 0,
            "expectedRecurringExpensesAnnualCents": 0,
            "annualNetRecurringBenefitCents": 0
          },
          "effectSummaries": [
            {
              "effectId": "effect_one_time_savings_1_ce189e33678bb98d",
              "effectType": "one_time_savings",
              "calculationMethod": "percent_of_cost",
              "valueModelKind": "capped_percent_of_eligible_cost",
              "cashValueClassification": "cash_grant",
              "runtimeEligibleForTotals": false,
              "humanReviewRequired": false,
              "amountCents": 1200000,
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
      "opportunityCount": 1,
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
      "opportunityCount": 1,
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
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22770",
          "opportunityName": "Leading By Example Restoration Grant for Solar PV & Decarbonized Systems",
          "eligibilityStatus": "eligible",
          "availabilityStatus": "rolling",
          "programType": "Grant Program",
          "administrator": "Massachusetts Department of Energy Resources",
          "state": "MA",
          "rankScore": 100,
          "matchConfidence": 1,
          "opportunityDataConfidence": 0.82,
          "sourceConfidence": "high",
          "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22770/leading-by-example-restoration-grant-for-solar-pv-and-decarbonized-systems",
          "applicationUrl": "https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-109288&external=true&parentUrl=bid",
          "matchedReasons": [
            "Opportunity appears rolling or no-deadline.",
            "Project site state MA matches opportunity geography.",
            "Utility provider is not applicable to this opportunity.",
            "Applicant type overlaps eligible sector: government.",
            "Site or facility type is not applicable to this opportunity.",
            "Opportunity technology is available for retrofit discovery: solar, renewable_energy."
          ],
          "unresolvedRequirements": [],
          "blockers": [
            "Not for private, residential, municipal, or commercial applicants.",
            "New solar deployment belongs to the separate LBE Solar-Decarbonization Grant Program unless the project restores an existing system.",
            "Do not generalize to generic rooftop solar where the source only supports existing system restoration."
          ],
          "hardRequirements": [
            "Applicant must be an eligible Massachusetts state entity.",
            "Project must restore, repair, or replace existing state-owned solar PV or decarbonized systems at state facilities.",
            "Applications are accepted on a rolling basis until June 30, 2027, or until funding is exhausted.",
            "Per-site grants are capped by the program opportunity notice."
          ],
          "eligibleApplicantTypes": [
            "massachusetts_state_entity",
            "state_agency",
            "public_higher_education_institution"
          ],
          "eligibleSectors": [
            "government",
            "public_higher_education"
          ],
          "eligibleRetrofitCategories": [
            "solar_pv_system_restoration",
            "decarbonized_heating_system_restoration",
            "solar_thermal_system_restoration",
            "geothermal_system_restoration",
            "air_source_heat_pump_restoration"
          ],
          "evidenceText": "COMMBUYS lists the LBE Restoration Grant Program for Solar and Decarbonized Systems as an open DOER grant opportunity with a June 30, 2027 bid opening date.",
          "reasoningNotes": "Solar PV is supported, but the opportunity is narrower than generic rooftop solar: it funds restoration of existing state-owned solar PV and decarbonized systems."
        }
      ],
      "v2PackageSummaries": [
        {
          "opportunityId": "SOURCE_DSIRE:dsire_program_id:22770",
          "programName": "Leading By Example Restoration Grant for Solar PV & Decarbonized Systems",
          "calculationStatus": "calculable_with_missing_inputs",
          "runtimeInclusionStatus": "low_confidence",
          "includedInRuntimeTotals": false,
          "confidence": "low",
          "missingInputs": [
            {
              "inputKey": "award_probability",
              "effectId": "effect_grant_expected_value_1_753c755368588c1b",
              "label": "award_probability"
            }
          ],
          "requiredInputs": [
            "eligible_project_cost",
            "state_entity_applicant",
            "existing_system_restoration_scope",
            "site_count",
            "award_approval",
            "entity_remaining_cap",
            "program_budget_availability"
          ],
          "defaultedInputs": [
            {
              "inputKey": "state_entity_applicant",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "existing_system_restoration_scope",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "site_count",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "award_approval",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "entity_remaining_cap",
              "source": "synthetic_test_case_default",
              "defaultIsPlaceholder": true,
              "defaultConfidence": "low"
            },
            {
              "inputKey": "program_budget_availability",
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
              "effectId": "effect_grant_expected_value_1_753c755368588c1b",
              "effectType": "grant_expected_value",
              "calculationMethod": "expected_value",
              "valueModelKind": "capped_percent_of_eligible_cost",
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
    }
  ]
}
