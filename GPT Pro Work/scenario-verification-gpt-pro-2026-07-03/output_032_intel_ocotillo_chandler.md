{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "intel-ocotillo-chandler",
"testCaseOrdinal": 32,
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
"SOURCE_DSIRE:dsire_program_id:1683",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid for combination purposes. The matched opportunities are loan guarantees, property tax treatment, or tax cost recovery, and the packet provides no calculable user-facing rule/package for them. No listed alternative scenario provides a compatible calculable benefit. Packet citation: ",
"recommendedRepair": "No scenario-combination repair required. Keep these opportunities out of runtime incentive totals unless a supported, user-facing calculation package is added later.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3256"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The only matched opportunity has a V2 package, but it is not included in runtime totals because runtimeInclusionStatus is not_user_facing_default and all relevant inputs are placeholder/defaulted. Excluding it from the selected user-facing scenario is appropriate for this pass.",
"recommendedRepair": "No scenario-combination repair required. Do not include this SRP package in the selected scenario until the package is allowed to be user-facing and required project/account inputs are reliable.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:1683",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The packet provides no calculable user-facing package for the matched loan-guarantee, property-tax, or MACRS opportunities, and no alternative scenario is listed.",
"recommendedRepair": "No scenario-combination repair required. Add calculable packages only if RetroFi later supports these non-rebate value types in scenario totals.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1683",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The matched opportunities are property tax treatment and MACRS, and no calculable scenario package or compatible alternative scenario is provided.",
"recommendedRepair": "No scenario-combination repair required for the current packet.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3256"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is defensible only because the SRP package is suppressed/not_user_facing_default. However, the V2 package attached to this HVAC retrofit lists EV-charger-specific required inputs such as level_2_port_count, networked_charger_confirmation, and dc_fast_charger_station_count. That makes the package-to-retrofit mapping unreliable and blocks verification of whether a valid SRP HVAC rebate scenario should have been considered.",
"recommendedRepair": "Repair the SRP Business Energy Efficiency package mapping so high_efficiency_hvac_replacement uses HVAC-specific required inputs and effects, then regenerate scenario candidates. Keep the current no-incentives scenario out of incentive totals until that repair is complete.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3256"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is defensible only because the SRP package is suppressed/not_user_facing_default. But the V2 package attached to this lighting retrofit contains EV-charger-specific required inputs and effects, which do not align with led_lighting_retrofit. This prevents reliable verification of whether a compatible SRP lighting rebate scenario should have been generated.",
"recommendedRepair": "Repair the SRP package mapping so led_lighting_retrofit uses lighting-specific inputs/effects, then regenerate alternatives. Do not include the current package in selected totals until the mapping is corrected.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:119",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid for combination purposes. The matched opportunities are a sales tax incentive and MACRS, but the packet provides no calculable runtime package or alternative scenario for either.",
"recommendedRepair": "No scenario-combination repair required in this pass.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "automated_demand_response_controls",
"retrofitDisplayName": "Automated demand response controls",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3256"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The only matched SRP opportunity is suppressed/not_user_facing_default, so the selected no-incentives scenario is not invalid on its face. However, the attached V2 package uses EV-charger-specific required inputs rather than demand-response-specific inputs. This mapping problem prevents reliable verification of whether a valid demand response controls scenario should have been considered.",
"recommendedRepair": "Repair the SRP package mapping for automated_demand_response_controls and regenerate scenario candidates. Keep the current package excluded until the correct demand-response package is available and user-facing.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "dc_fast_charger_installation",
"retrofitDisplayName": "DC fast charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3256"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is appropriate for this pass because the only matched SRP package is not_user_facing_default, not included in runtime totals, and depends on placeholder/defaulted inputs. No included alternative scenario is listed.",
"recommendedRepair": "No scenario-combination repair required. Consider a calculable SRP EV-charger scenario only after the package is user-facing and project-specific charger/account inputs are reliable.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "energy_management_system",
"retrofitDisplayName": "Energy management system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3256"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is defensible only because the SRP package is suppressed/not_user_facing_default. The package inputs are EV-charger-specific rather than energy-management-system-specific, so the packet does not reliably show whether a valid SRP EMS rebate scenario should have existed.",
"recommendedRepair": "Repair the SRP package mapping for energy_management_system with EMS-specific inputs/effects, then regenerate scenarios.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "engineering_feasibility_study",
"retrofitDisplayName": "Engineering feasibility study",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5313"
],
"affectedScenarioIds": [],
"explanation": "No scenario is present because the retrofit is unsupported and non-physical, and the matched USDA opportunity explicitly blocks standalone engineering feasibility studies. Excluding it from scenario construction is appropriate.",
"recommendedRepair": "No scenario-combination repair required. Consider removing or downgrading the opportunity match upstream if standalone feasibility studies should not be matched at all.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3256"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is defensible only because the SRP package is suppressed/not_user_facing_default. The attached V2 package uses EV-charger-specific required inputs rather than refrigeration-specific inputs, so the packet cannot support a reliable decision about whether a valid refrigeration rebate scenario should have been generated.",
"recommendedRepair": "Repair the SRP package mapping for high_efficiency_refrigeration_equipment with refrigeration-specific inputs/effects, then regenerate scenario candidates.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"retrofitDisplayName": "Level 2 EV charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3256"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The only matched SRP package is EV-charger-aligned but is suppressed/not_user_facing_default and not included in runtime totals, with placeholder/defaulted inputs. Excluding it from the selected scenario is appropriate for current scenario construction.",
"recommendedRepair": "No scenario-combination repair required. Reconsider inclusion only when the package is user-facing and project-specific inputs are available.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "retro_commissioning_study",
"retrofitDisplayName": "Retro-commissioning study",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3256"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is defensible because the SRP package is suppressed/not_user_facing_default, but the attached V2 package appears to be the same EV-charger-oriented package used across many SRP retrofits. Retro-commissioning is described as a study/tuning pathway with its own requirements, so the current packet does not reliably show whether a valid retro-commissioning incentive scenario should have been considered.",
"recommendedRepair": "Repair the SRP package mapping for retro_commissioning_study with retro-commissioning-specific requirements/effects, then regenerate scenarios.",
"needsMathVerificationLater": true
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
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is MACRS, and no calculable user-facing package or alternative scenario is listed.",
"recommendedRepair": "No scenario-combination repair required.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"retrofitDisplayName": "Smart thermostat / zoning retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3256"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is defensible only because the SRP package is suppressed/not_user_facing_default. The V2 package inputs are EV-charger-specific rather than thermostat/zoning-specific, which blocks reliable verification of whether a compatible SRP smart thermostat or zoning scenario should have been generated.",
"recommendedRepair": "Repair the SRP package mapping for smart_thermostat_zoning_retrofit and regenerate scenario candidates.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "submetering_energy_monitoring",
"retrofitDisplayName": "Submetering / energy monitoring system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:119"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives selected scenario is appropriate. The matched Arizona sales tax opportunity explicitly says standalone submetering or energy monitoring is not a supported category unless integral to a qualifying solar energy device, and no such dependency is present in the retrofit scenario.",
"recommendedRepair": "No scenario-combination repair required. Consider removing or blocking this matched opportunity upstream for standalone submetering/monitoring.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "window_replacement",
"retrofitDisplayName": "Window replacement",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1683"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives selected scenario is appropriate for current data. The matched property tax exemption says generic window replacement should not match unless the component independently meets the statutory energy-efficient building component standard. The packet does not provide enough window-performance detail to include the opportunity in a selected scenario.",
"recommendedRepair": "Keep excluded from runtime totals unless the retrofit is specifically qualified as an eligible energy-efficient building component with supporting inputs/documentation.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 18,
"highSeverityCount": 0,
"mediumSeverityCount": 7,
"lowSeverityCount": 11,
"noIssueRetrofitCount": 5,
"dataGapRetrofitCount": 7
}
}

