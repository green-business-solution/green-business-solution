{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "museum-life-science-durham",
"testCaseOrdinal": 25,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because no calculable incentive packages or alternative scenarios are present. REAP is identified as a loan guarantee that should not be treated as a rebate incentive, and MACRS is identified as tax cost recovery rather than a rebate, grant, or direct incentive. No stacking conflict or missed additive calculable opportunity is shown in the packet. Source: ",
"recommendedRepair": "No scenario-combination repair needed. Eligibility/match-quality questions for REAP and MACRS, if any, should be handled outside this scenario-combination pass.",
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
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because no calculable incentive packages or alternative scenarios are present. REAP is a loan guarantee and MACRS is tax cost recovery, so neither is shown as a calculable rebate/grant scenario candidate in the packet. No compatible additive calculable opportunity is omitted from a listed scenario.",
"recommendedRepair": "No scenario-combination repair needed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3036"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid based on the packet because the only matched opportunity is a property tax exclusion, no calculation package is present, and no alternative scenario is listed. There is no evidence of an omitted compatible calculable scenario or double-counting.",
"recommendedRepair": "No scenario-combination repair needed. A later rule/package pass may decide whether the property tax exclusion should be modeled, but this packet does not provide a calculable package to include.",
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
"explanation": "Selected no-incentives scenario is internally valid because MACRS is the only matched opportunity, no calculable package is present, and no alternative scenario is listed. The packet characterizes MACRS as tax cost recovery, not a rebate, grant, or direct incentive.",
"recommendedRepair": "No scenario-combination repair needed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "efficient_air_compressor",
"retrofitDisplayName": "Efficient air compressor",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3466"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is structurally valid, but the packet cannot support a reliable scenario decision because a matched Duke Energy non-residential rebate package exists and is suppressed due to source_inaccessible_repair_failure with low confidence. The opportunity category includes efficient air compressor, and the package has no runtime totals because the current official rate table and eligible units or savings are unavailable. This means the no-incentives scenario may be correct for runtime, but it cannot be verified as the best combination from the packet alone.",
"recommendedRepair": "Repair or re-source the Duke Energy calculation package, especially current official rate table, eligible units or savings, measure type, equipment specifications, and service territory. Keep it out of runtime totals until repaired or reviewed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario should stand. The only matched opportunity is MACRS, and its blockers specifically say generic HVAC replacement is not specially supported for this clean-energy MACRS opportunity. No alternative scenario or calculable incentive package is present.",
"recommendedRepair": "Consider removing or de-prioritizing this MACRS match for generic high-efficiency HVAC replacement, but do not add it to the selected scenario based on this packet.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3466"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is structurally valid, but the packet cannot verify that it is the best scenario because the matched Duke Energy rebate package was suppressed after source_inaccessible_repair_failure with low confidence. The opportunity categories include commercial refrigeration equipment, matching this retrofit, but no reliable runtime value is available.",
"recommendedRepair": "Repair or re-source the Duke Energy rebate calculation package for refrigeration equipment. Do not include it in runtime totals until the package has reliable inputs and confidence.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3466"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is structurally valid, but the scenario decision is not fully verifiable from the packet. The matched Duke Energy rebate package is suppressed due to source_inaccessible_repair_failure with low confidence, and the listed eligible retrofit categories include roof_insulation_upgrade while the retrofit is the broader insulation_upgrade. The packet does not provide enough data to determine whether this specific insulation measure should receive a calculable rebate.",
"recommendedRepair": "Clarify whether the retrofit is roof insulation specifically and repair the Duke Energy package with official rate table and measure-specific eligibility. Keep the rebate out of runtime totals unless eligibility and value are supported.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario should stand. The only matched opportunity is MACRS, and its blockers specifically say generic LED lighting is not specially supported for this clean-energy MACRS opportunity. No alternative scenario or calculable incentive package is present.",
"recommendedRepair": "Consider removing or de-prioritizing this MACRS match for generic LED lighting, but do not add it to the selected scenario based on this packet.",
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
"explanation": "Selected no-incentives scenario is internally valid because MACRS is the only matched opportunity, no calculation package is present, and no alternative scenario is listed. No stack conflict, duplicate, or omitted compatible calculable scenario is visible in the packet.",
"recommendedRepair": "No scenario-combination repair needed.",
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
"explanation": "Selected no-incentives scenario is internally valid because MACRS is the only matched opportunity, no calculation package is present, and no alternative scenario is listed. The packet does not show a compatible additive calculable incentive that should have been included.",
"recommendedRepair": "No scenario-combination repair needed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "window_film_shading_retrofit",
"retrofitDisplayName": "Window film / shading retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3466"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is structurally valid, but the scenario decision is not fully verifiable because the matched Duke Energy rebate package is suppressed due to source_inaccessible_repair_failure with low confidence. The opportunity categories include window_film_shading_retrofit, directly matching this retrofit, but no reliable calculable runtime value is available.",
"recommendedRepair": "Repair or re-source the Duke Energy rebate calculation package for window film/shading. Do not include it in runtime totals until source-backed inputs and confidence are sufficient.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 12,
"highSeverityCount": 0,
"mediumSeverityCount": 4,
"lowSeverityCount": 8,
"noIssueRetrofitCount": 8,
"dataGapRetrofitCount": 4
}
}

