{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "quaker-oats-cedar-rapids",
"testCaseOrdinal": 40,
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
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid for scenario-combination purposes. The matched opportunities are loan guarantees or tax cost recovery, and no calculable runtime package or alternative incentive scenario is listed in the packet. No invalid stack or duplicate incentive counting is present. Packet source cited: ",
"recommendedRepair": "No scenario-combination repair needed. Later passes may verify whether any financing or tax-cost-recovery presentation should be modeled outside upfront incentive totals.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:4971"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is acceptable. The only rebate-like matched opportunity, Alliant program 4971, has a V2 package marked not_user_facing_default, not included in runtime totals, and totaling zero because the package is measure-catalog based with placeholder/defaulted inputs. REAP is a loan guarantee and MACRS is tax cost recovery, so neither clearly requires inclusion in the selected incentive scenario.",
"recommendedRepair": "No scenario-combination repair needed. Keep Alliant excluded until user-facing inputs and eligible measure selection support a nonzero calculable rebate.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:4971"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is acceptable. MACRS explicitly warns that generic HVAC replacement is not specially supported as a clean-energy MACRS category, and the Alliant package is not included in runtime totals and produces zero expected savings under the provided package summary. No compatible nonzero alternative scenario is listed.",
"recommendedRepair": "No scenario-combination repair needed. Do not include Alliant or MACRS in selected totals unless a later package/input pass produces a supported, user-facing, nonzero rule.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:4971"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is acceptable. MACRS blockers specifically state generic LED lighting is not specially supported. The Alliant package is not user-facing by default and contributes zero under the provided V2 package summary, so exclusion from the selected scenario is not a combination error.",
"recommendedRepair": "No scenario-combination repair needed. Keep Alliant out of selected totals until the measure catalog and user inputs support a calculable nonzero rebate.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid. The only matched opportunity is MACRS tax cost recovery and there is no V2 package summary or alternative calculable scenario in the packet. No stacking, duplicate, or selected-not-optimal issue is visible.",
"recommendedRepair": "No scenario-combination repair needed. Consider separately whether MACRS should appear as informational tax-cost-recovery support rather than as a selected savings scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "energy_management_system",
"retrofitDisplayName": "Energy management system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5410"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid. The only matched opportunity is a revolving loan program, and its blockers say not to match it as a generic building energy-management rebate. No calculable incentive package or alternative scenario is listed.",
"recommendedRepair": "No scenario-combination repair needed. Keep loan financing separate from upfront savings or grant scenario totals unless a supported financing presentation exists.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "engineering_feasibility_study",
"retrofitDisplayName": "Engineering feasibility study",
"severity": "medium",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5313"
],
"affectedScenarioIds": [],
"explanation": "The absence of a selected calculable scenario is appropriate because the retrofit is unsupported and the matched USDA 5313 opportunity explicitly blocks standalone engineering feasibility studies as not source-backed. This is not a no-incentive physical retrofit case; the opportunity should remain excluded from calculable scenario construction.",
"recommendedRepair": "Keep this opportunity excluded for standalone engineering feasibility studies. Consider changing the match status or discovery output so it does not appear eligible for this retrofit category if the product expects matched opportunities to be source-backed at the retrofit level.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "exterior_site_lighting_retrofit",
"retrofitDisplayName": "Exterior/site lighting retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4971"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is acceptable. The Alliant package is suppressed from runtime totals, not user-facing by default, and has zero expected savings under the packet's V2 summary. There is no listed alternative with a higher first-year benefit.",
"recommendedRepair": "No scenario-combination repair needed. Include Alliant only after the measure-specific catalog inputs produce a supported nonzero user-facing rebate.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4971"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is acceptable. The only matched opportunity has a V2 package marked not_user_facing_default, excluded from runtime totals, and zero expected savings under the provided inputs. No invalid stacking or better alternative scenario is shown.",
"recommendedRepair": "No scenario-combination repair needed. Revisit only if a user-facing Alliant package with real equipment inputs produces a nonzero rebate.",
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
"explanation": "Selected no-incentives scenario is internally valid. The only matched opportunity is MACRS tax cost recovery, with no calculable package or alternative scenario included in the packet. No stacking or duplicate-counting issue is present.",
"recommendedRepair": "No scenario-combination repair needed. Separately decide whether MACRS should be displayed as informational tax treatment rather than an incentive scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid. MACRS is the only matched opportunity and no calculable package or alternative incentive scenario is provided. There is no evidence of an omitted compatible additive incentive or an invalid stack.",
"recommendedRepair": "No scenario-combination repair needed. Later product logic may decide how to surface MACRS outside direct incentive totals.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 11,
"highSeverityCount": 0,
"mediumSeverityCount": 1,
"lowSeverityCount": 10,
"noIssueRetrofitCount": 10,
"dataGapRetrofitCount": 0
}
}

