{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "burlington-beer-company",
"testCaseOrdinal": 19,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5313",
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:45",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is acceptable for this pass because the matched opportunities are loan guarantees, a local-option property tax incentive, or tax cost recovery with no included calculable package in the packet. No listed alternative with a higher compatible user-facing benefit exists. Citation: ",
"recommendedRepair": "Keep no-incentives selected unless later package repair creates a user-facing calculable incentive for one of the matched opportunities.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22250"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is acceptable because the only matched opportunity is a loan program, not a rebate or grant, and no calculable incentive package or alternative scenario is listed.",
"recommendedRepair": "Keep no-incentives selected for cash-incentive totals; avoid treating the loan as upfront savings or grant money.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2680",
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The only repaired rebate package is marked not_user_facing_default and not included in runtime totals, with low-confidence placeholder defaults. The other matched opportunities are loan/tax-cost-recovery structures without included packages. Excluding them from the selected scenario is internally valid.",
"recommendedRepair": "Keep no-incentives selected unless the rental-property rebate is made user-facing and the site/applicant path is confirmed as residential rental or multifamily rather than a commercial brewery/taproom.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:45",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is acceptable. The local-option property tax opportunity explicitly warns not to match broad CHP except qualifying micro-CHP, and MACRS is tax cost recovery with no included calculable package. No compatible additive rebate/grant scenario is listed.",
"recommendedRepair": "Keep no-incentives selected; maintain the blocker narrowing local-option eligibility to qualifying micro-CHP if this retrofit remains broad CHP.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2680",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is acceptable for scenario-combination purposes. The rental-property package is not user-facing by default and excluded from runtime totals, while MACRS is tax cost recovery and includes blockers against generic ordinary HVAC replacement.",
"recommendedRepair": "Keep no-incentives selected unless a commercial HVAC-specific user-facing package is added or the rental-property pathway is confirmed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_v2_ac5d3a679cefcb8e_v1",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22588",
"SOURCE_DSIRE:dsire_program_id:2680"
],
"affectedScenarioIds": [
"scenario_v2_ac5d3a679cefcb8e_v1",
"scenario_no_incentives"
],
"explanation": "Selected scenario uses the commercial Efficiency Vermont rebate package for evaporator fan motor controls, which is compatible with a refrigeration retrofit. The only alternative is no incentives, and the residential rental package is not user-facing by default, so there is no compatible additive scenario shown that should replace the selected scenario.",
"recommendedRepair": "Keep the selected commercial rebate scenario. Do not add the residential rental package unless it becomes user-facing and a residential rental pathway is confirmed.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "high",
"findingType": "missing_compatible_opportunity",
"selectedScenarioId": "scenario_v2_ac5d3a679cefcb8e_v1",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22588"
],
"affectedScenarioIds": [
"scenario_v2_ac5d3a679cefcb8e_v1",
"scenario_no_incentives"
],
"explanation": "The selected scenario is not internally valid for an LED lighting retrofit because its scenario name and savings entry are for evaporator fan motor controls, not lighting. The matched commercial program supports LED lighting, but the selected rule appears to be the refrigeration/control measure reused under the lighting retrofit rather than a lighting-specific rebate rule.",
"recommendedRepair": "Do not use the evaporator fan motor control rule for LED lighting. Replace it with a lighting-specific calculable rule/package for SOURCE_DSIRE:dsire_program_id:22588 if available; otherwise select no-incentives for this retrofit until a lighting package is repaired.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:45",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is acceptable because the matched opportunities are a local-option property tax incentive and tax cost recovery, with no included calculable incentive package or listed alternative scenario.",
"recommendedRepair": "Keep no-incentives selected unless a calculable, user-facing property tax or tax-cost-recovery package is intentionally added.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "air_sealing_weatherization",
"retrofitDisplayName": "Air sealing / weatherization",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2680"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is acceptable because the only matched package is marked not_user_facing_default and excluded from runtime totals, with placeholder defaults and residential rental eligibility context that is not confirmed for this commercial brewery profile.",
"recommendedRepair": "Keep no-incentives selected unless the rental-property pathway is confirmed and made user-facing.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "engineering_feasibility_study",
"retrofitDisplayName": "Engineering feasibility study",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5313"
],
"affectedScenarioIds": [],
"explanation": "No scenario is present because this is an unsupported audit/study/planning item. The matched USDA opportunity also has an explicit blocker stating standalone engineering feasibility studies are not source-backed for this opportunity, so no calculable scenario should be forced in this pass.",
"recommendedRepair": "Keep unsupported/no-scenario treatment for standalone engineering feasibility studies under this opportunity.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2680"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is acceptable because the only repaired package is not_user_facing_default, excluded from runtime totals, and based on low-confidence placeholder defaults. The residential rental pathway is not established by the commercial brewery profile.",
"recommendedRepair": "Keep no-incentives selected unless the rental-property pathway is confirmed and made user-facing.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"retrofitDisplayName": "High-efficiency laundry equipment",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2680"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is acceptable because the only repaired package is not_user_facing_default and excluded from runtime totals, with residential rental eligibility context and placeholder defaults not confirmed for this commercial brewery profile.",
"recommendedRepair": "Keep no-incentives selected unless the rental-property pathway is confirmed and made user-facing.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"retrofitDisplayName": "Level 2 EV charger installation",
"severity": "medium",
"findingType": "duplicate_or_overlapping_opportunity",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22250"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The packet contains both generic EV charger installation and Level 2 EV charger installation with the same cost, same recurring expense profile, same matched VEDA loan opportunity, and the opportunity notes explicitly say not to duplicate a Level 2 category because the official page does not limit financing to Level 2 chargers. This does not change the no-incentives scenario, but it creates overlapping retrofit/opportunity presentation.",
"recommendedRepair": "Deduplicate or merge the generic EV charger and Level 2 EV charger retrofit candidates for this opportunity, or add metadata preventing both from surfacing as separate opportunities from the same source fact.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:45"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is acceptable because the only matched opportunity is a local-option property tax incentive with no included calculable package and no listed additive alternative.",
"recommendedRepair": "Keep no-incentives selected unless a user-facing calculable property tax exemption package is added and municipal adoption is confirmed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is acceptable because the only matched opportunity is MACRS tax cost recovery with no included calculable package or alternative incentive scenario.",
"recommendedRepair": "Keep no-incentives selected unless a user-facing tax-cost-recovery calculation package is intentionally included.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 15,
"highSeverityCount": 1,
"mediumSeverityCount": 1,
"lowSeverityCount": 13,
"noIssueRetrofitCount": 8,
"dataGapRetrofitCount": 0
}
}

