{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "phipps-conservatory-pittsburgh",
"testCaseOrdinal": 27,
"overallAssessment": "no_issues_found",
"findings": [
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "Selected no-incentives scenario is internally valid. The matched opportunities are a USDA REAP loan guarantee and MACRS tax cost recovery, with no V2 calculation packages included. The packet says REAP loan guarantees should not be treated as rebate incentives and MACRS is tax cost recovery rather than a rebate, grant, or direct incentive, so there is no additive calculable opportunity that should have entered the selected scenario. ",
"recommendedRepair": "No scenario-combination repair needed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "Selected no-incentives scenario is internally valid. The only matched opportunities are REAP loan guarantees and MACRS tax cost recovery, and no calculation package was included for either. Nothing in the packet identifies a compatible user-facing rebate, grant, or calculable incentive scenario that should replace the selected no-incentives scenario.",
"recommendedRepair": "No scenario-combination repair needed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3873",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [],
"explanation": "Selected no-incentives scenario is internally valid. Duquesne Light has a matched rebate package, but the V2 summary marks it not_user_facing_default, excluded from runtime totals, and based on low-confidence placeholder defaults. MACRS is tax cost recovery rather than a rebate, grant, or direct incentive. Excluding both from the selected runtime scenario is supported by the packet.",
"recommendedRepair": "No scenario-combination repair needed. Keep the Duquesne package suppressed until user-facing eligibility and measure inputs are reliable.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3873",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [],
"explanation": "Selected no-incentives scenario is internally valid. The Duquesne Light rebate package is matched but suppressed from user-facing runtime totals because it relies on placeholder/defaulted inputs. MACRS should not be included as a direct incentive scenario for generic LED lighting, per the packet blockers and reasoning notes.",
"recommendedRepair": "No scenario-combination repair needed. Keep the Duquesne rebate out of selected totals until inputs are confirmed and the package becomes user-facing.",
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
"affectedScenarioIds": [],
"explanation": "Selected no-incentives scenario is internally valid. MACRS is the only matched opportunity and has no included calculation package. The packet identifies it as tax cost recovery rather than a rebate, grant, or direct incentive, so its exclusion from an incentive scenario does not create a missing compatible opportunity issue.",
"recommendedRepair": "No scenario-combination repair needed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "energy_audit",
"retrofitDisplayName": "Energy audit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22779"
],
"affectedScenarioIds": [],
"explanation": "No selected scenario is present because the audit retrofit is unsupported for modeled savings. The matched GELF opportunity should remain excluded from a standalone audit scenario because the packet says standalone energy audits are not a funded retrofit category and GELF is financing for implementation projects rather than standalone audit work.",
"recommendedRepair": "No scenario-combination repair needed. Continue excluding GELF from standalone audit scenarios unless the retrofit is tied to an eligible implementation project.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3873"
],
"affectedScenarioIds": [],
"explanation": "Selected no-incentives scenario is internally valid. The Duquesne Light rebate opportunity is matched, but its V2 package is not_user_facing_default, excluded from runtime totals, and relies on low-confidence placeholder/defaulted inputs. No alternative user-facing scenario is listed.",
"recommendedRepair": "No scenario-combination repair needed. Keep the rebate suppressed until required measure and customer inputs are reliable.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"retrofitDisplayName": "Lighting controls retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3873"
],
"affectedScenarioIds": [],
"explanation": "Selected no-incentives scenario is internally valid. The Duquesne Light rebate package is matched but not included in runtime totals because it is not_user_facing_default and depends on placeholder/defaulted inputs. The packet does not list any compatible user-facing alternative scenario that should have been selected.",
"recommendedRepair": "No scenario-combination repair needed. Keep the rebate suppressed until package inputs and user-facing status are resolved.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "retro_commissioning_study",
"retrofitDisplayName": "Retro-commissioning study",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22779"
],
"affectedScenarioIds": [],
"explanation": "Selected no-incentives scenario is internally valid. Although GELF is matched, the packet says standalone retro-commissioning studies are not clearly supported as eligible loan uses and that GELF finances implementation projects meeting energy-performance requirements. Excluding GELF from a standalone retro-commissioning study scenario is appropriate.",
"recommendedRepair": "No scenario-combination repair needed. Do not include GELF for standalone retro-commissioning unless the scenario represents an eligible implementation project.",
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
"affectedScenarioIds": [],
"explanation": "Selected no-incentives scenario is internally valid. MACRS is the only matched opportunity, and it has no included calculation package. The packet frames MACRS as tax cost recovery rather than a rebate, grant, or direct incentive, so it is not a missing additive incentive in the selected scenario.",
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
"affectedScenarioIds": [],
"explanation": "Selected no-incentives scenario is internally valid. MACRS is the only matched opportunity and has no included calculation package. The packet does not provide any user-facing calculable incentive or alternative scenario that should supersede the selected no-incentives scenario.",
"recommendedRepair": "No scenario-combination repair needed.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 11,
"highSeverityCount": 0,
"mediumSeverityCount": 0,
"lowSeverityCount": 11,
"noIssueRetrofitCount": 9,
"dataGapRetrofitCount": 0
}
}

