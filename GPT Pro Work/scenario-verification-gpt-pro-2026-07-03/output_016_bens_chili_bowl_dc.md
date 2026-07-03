{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "bens-chili-bowl-dc",
"testCaseOrdinal": 16,
"overallAssessment": "inconclusive_due_to_data_gaps",
"findings": [
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected scenario includes no incentives, so it has no internal stacking conflicts, duplicate opportunities, or selected-opportunity overlap. The matched federal ITC and MACRS opportunities contain blockers stating generic LED lighting is not supported, and 179D states standalone LED lighting is not eligible unless part of a certified qualifying project. PACE is financing, not a rebate. Based only on the packet, excluding these opportunities from an incentive-value scenario is reasonable for this pass. Packet citation: ",
"recommendedRepair": "No scenario-combination repair required. Keep tax-credit, deduction, and financing opportunities out of rebate-style selected scenarios unless a supported calculable package and required project inputs exist.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5686",
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:5245",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentive scenario has no internal conflict, but the matched opportunities include apparently compatible solar thermal/SWH categories across DC SRECs, federal ITC, DC personal property tax credit, and MACRS. The packet provides no alternative scenarios, incentive rules, stacking metadata, or V2 package summaries explaining whether these were blocked by missing inputs, unsupported calculation, low confidence, or human review. A reliable decision on whether a compatible additive opportunity should have been included is therefore blocked by missing package/status data.",
"recommendedRepair": "Add V2 package summaries or explicit scenario trace reasons for each matched solar-water-heating opportunity, including whether each opportunity is calculable, non-user-facing, requires missing inputs, or is intentionally excluded. Add stacking metadata among SREC, ITC, property tax incentive, and MACRS if calculable packages are later introduced.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentive scenario has no internal stacking conflict, but the packet lists matched federal ITC and MACRS opportunities for qualified biogas/biomass-related property. REAP is also listed but has hard requirements for agricultural producers or rural small businesses and a blocker for non-rural small businesses, while this user is a small urban DC restaurant. The packet lacks scenario traces or V2 package summaries explaining whether REAP was excluded because it is a loan guarantee and/or because rural/agricultural eligibility is not satisfied, and also lacks package status for ITC and MACRS.",
"recommendedRepair": "For this urban DC restaurant profile, explicitly mark REAP as excluded or non-calculable unless an agricultural-producer exception is documented. Add V2 package summaries for ITC and MACRS showing whether they are calculable and how they should stack or remain non-user-facing.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:5245",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentive scenario has no internal conflict, but the matched opportunities include CHP-eligible federal ITC, DC cogeneration personal property tax credit, and MACRS. No alternative scenarios, incentive rules, stacking metadata, or V2 package summaries explain why no calculable incentive scenario was produced. The packet is insufficient to verify whether compatible additive tax-related opportunities were properly excluded or simply omitted.",
"recommendedRepair": "Add package summaries and scenario trace reasons for ITC, DC cogeneration property tax credit, and MACRS. Include stacking/interaction metadata if these tax benefits are later included in a combined scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentive scenario has no internal conflict, but the packet lists geothermal-compatible federal ITC and MACRS opportunities, and REAP loan guarantees with rural/agricultural eligibility requirements. The user profile is an urban DC restaurant, so REAP appears at least unresolved, but the packet does not provide V2 package summaries or scenario traces explaining the exclusion basis for REAP, ITC, or MACRS.",
"recommendedRepair": "Add explicit exclusion or missing-input status for REAP based on rural/agricultural eligibility, and add V2 package summaries for ITC and MACRS indicating whether each is calculable, non-user-facing, blocked, or unsupported for this retrofit.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected scenario includes no incentives and therefore has no stacking or duplicate-counting problem. The matched ITC and MACRS records both include blockers for ordinary/generic high-efficiency HVAC replacement, while PACE is financing rather than a rebate. Based only on the packet, excluding these from a rebate-style selected scenario is acceptable for this pass.",
"recommendedRepair": "No scenario-combination repair required. Keep ordinary HVAC replacement out of ITC/MACRS incentive scenarios unless a qualifying clean-energy property package is present and supported.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:4206"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentive scenario has no internal stacking conflict. However, federal ITC lists battery storage as an eligible category, while PACE includes a blocker stating battery storage was not verified and should not be matched unless separately documented. The packet lacks V2 package summaries explaining why ITC was not included and whether PACE should be excluded from the matched set or just excluded from scenarios as financing/non-verified.",
"recommendedRepair": "Add V2 package status for federal ITC battery storage. For PACE, either remove the battery storage match or mark it explicitly excluded/unsupported unless separate current eligibility documentation is present.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "energy_audit",
"retrofitDisplayName": "Energy audit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": null,
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "No selected scenario exists because the savings preview is unsupported for an audit/study/compliance task and says modeled savings input is required before RetroFi can calculate monthly savings. The single matched opportunity is PACE financing, not a grant or rebate. The absence of a calculable incentive scenario is internally consistent with the packet.",
"recommendedRepair": "No scenario-combination repair required. Keep audit financing separate from calculated savings scenarios unless an audit-cost financing package is intentionally modeled.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentive scenario has no stacking or duplicate-counting issue. The only matched opportunity is PACE financing, whose blockers say not to treat PACE as a rebate program. Excluding it from an incentive-value scenario is reasonable based on the packet.",
"recommendedRepair": "No scenario-combination repair required. Keep PACE represented as financing unless RetroFi supports a separate financing scenario model.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "microgrid_system",
"retrofitDisplayName": "Microgrid system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The only matched opportunity is federal ITC, but its blockers state that a microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure. The retrofit is a broad microgrid system, not explicitly a qualifying microgrid controller. The no-incentive selected scenario is therefore appropriate based on the packet.",
"recommendedRepair": "Keep this opportunity excluded for generic microgrid-system scenarios. Only include ITC if the retrofit category or package is narrowed to qualifying microgrid controller property.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5686"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentive scenario has no internal conflict, but the sole matched opportunity is DC Solar Renewable Energy Credits, and the opportunity lists solar PV as an eligible retrofit category. The packet provides no V2 package summary, missing-input explanation, alternative scenario, or trace warning explaining why a solar PV SREC scenario was not calculated or selected.",
"recommendedRepair": "Add a V2 package summary for DC SRECs showing whether the SREC package is unsupported, blocked by missing system-size/production/certification inputs, non-user-facing, low confidence, or should generate a calculable scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentive scenario has no internal stacking issue, but the sole matched MACRS opportunity lists small wind turbine as an eligible retrofit category. The packet lacks V2 package status or scenario trace detail explaining whether MACRS is non-calculable, intentionally suppressed, blocked by missing tax-basis inputs, or omitted.",
"recommendedRepair": "Add V2 package summary for MACRS small wind treatment and specify whether it should remain non-user-facing or be included in a tax-benefit scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "submetering_energy_monitoring",
"retrofitDisplayName": "Submetering / energy monitoring system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5686"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The only matched opportunity is DC Solar Renewable Energy Credits, but its blockers explicitly state not to match submetering or energy monitoring as a retrofit because metering is only part of certification and reporting. Excluding it from the selected scenario is correct.",
"recommendedRepair": "Remove or suppress the SREC match for standalone submetering/energy monitoring so it does not appear as an eligible retrofit opportunity.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "thermal_energy_storage",
"retrofitDisplayName": "Thermal energy storage",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentive scenario has no stacking conflict, but the sole matched federal ITC opportunity lists thermal energy storage as an eligible category. The packet gives no V2 package summary, missing-input status, alternative scenario, or trace warning explaining why this apparently compatible opportunity was not included in any calculable scenario.",
"recommendedRepair": "Add V2 package status for ITC thermal energy storage, including whether the package is missing required inputs, unsupported, suppressed, or should produce a calculable tax-credit scenario.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 14,
"highSeverityCount": 0,
"mediumSeverityCount": 8,
"lowSeverityCount": 6,
"noIssueRetrofitCount": 4,
"dataGapRetrofitCount": 8
}
}

