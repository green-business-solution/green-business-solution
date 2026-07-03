{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "okc-national-memorial-museum",
"testCaseOrdinal": 24,
"overallAssessment": "no_issues_found",
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
"explanation": "The selected no-incentives scenario is internally valid. The matched REAP opportunity is a loan guarantee and the packet explicitly says loan guarantees should not be treated as rebate incentives. MACRS is tax cost recovery, not a rebate, grant, or direct incentive, and no calculable runtime package is listed. No alternative scenario is provided with a higher scenario-level benefit. Source packet: ",
"recommendedRepair": "No scenario-combination repair needed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22221"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is limited by the packet to qualified public-access EV recharging systems and other clean-fuel vehicle/fueling property, and no calculable package or alternative incentive scenario is listed.",
"recommendedRepair": "No scenario-combination repair needed. Keep this excluded unless a future package can verify public-access EV charging eligibility and calculate the credit.",
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
"explanation": "The selected no-incentives scenario is internally valid. REAP is listed as a loan guarantee and should not be treated as a rebate incentive. MACRS is tax cost recovery and has no calculable runtime package in the packet. No compatible calculated alternative scenario is listed.",
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
"SOURCE_DSIRE:dsire_program_id:3639",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid for this pass. The OG&E rebate package is present only as a low-confidence custom-quote estimate and is explicitly not included in runtime totals. MACRS is not a direct incentive and has no calculable runtime package. No alternative scenario is listed.",
"recommendedRepair": "No scenario-combination repair needed. If RetroFi later promotes the OG&E custom-quote estimate into runtime totals, create a distinct scenario and verify required inputs such as customer segment, measure type, approved scope, approved incentive, facility type, and program path.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3639",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The OG&E rebate package is marked as a low-confidence custom-quote estimate, with placeholder defaults, and is not included in runtime totals. MACRS is not a rebate, grant, or direct incentive for this generic lighting retrofit and has no runtime package.",
"recommendedRepair": "No scenario-combination repair needed. Add an incentive scenario only if the OG&E package becomes runtime-eligible with reliable project-specific inputs.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "building_benchmarking_compliance",
"retrofitDisplayName": "Building benchmarking compliance",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3639"
],
"affectedScenarioIds": [],
"explanation": "No scenario is required for this nonphysical compliance/support item. The packet states this retrofit type is unsupported for monthly savings without modeled savings input, and the OG&E record describes benchmarking as a support or analysis feature rather than a physical retrofit or compliance mandate.",
"recommendedRepair": "No scenario-combination repair needed.",
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
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is MACRS, which is tax cost recovery rather than a rebate, grant, or direct incentive, and the packet lists no calculable runtime package or alternative scenario.",
"recommendedRepair": "No scenario-combination repair needed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "energy_audit",
"retrofitDisplayName": "Energy audit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3534"
],
"affectedScenarioIds": [],
"explanation": "No scenario is required for this nonphysical audit item. The packet states audit, study, certification, or compliance tasks are unsupported until resulting modeled savings are available. The matched C-PACE opportunity also says standalone energy audits are not the financing purpose and should not be treated as a rebate.",
"recommendedRepair": "No scenario-combination repair needed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "fuel_cell_system",
"retrofitDisplayName": "Fuel cell system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22221"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is for clean-burning motor vehicle fuel property; the packet explicitly says stationary building fuel-cell systems are not supported and fuel cell should be interpreted in a vehicle-fuel context, not as stationary fuel-cell generation.",
"recommendedRepair": "No scenario-combination repair needed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3639"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The OG&E rebate package is a low-confidence custom-quote estimate with placeholder defaults and is explicitly excluded from runtime totals. No alternative scenario is listed.",
"recommendedRepair": "No scenario-combination repair needed. Add a rebate scenario only if reliable program-path and approved-incentive inputs make the OG&E package runtime-eligible.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"retrofitDisplayName": "Level 2 EV charger installation",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22221"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity requires qualified public-access EV recharging property, and the packet warns that private or workplace Level 2 EV charging should not be matched unless it is a qualified public-access recharging system. No calculable package or alternative incentive scenario is listed.",
"recommendedRepair": "No scenario-combination repair needed. Keep excluded unless public-access charging eligibility and a calculable credit package are added.",
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
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is MACRS tax cost recovery, not a rebate, grant, or direct incentive, and no calculable runtime package or better alternative scenario is listed.",
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
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is MACRS tax cost recovery and the packet provides no runtime calculation package or alternative scenario with an incentive benefit.",
"recommendedRepair": "No scenario-combination repair needed.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 13,
"highSeverityCount": 0,
"mediumSeverityCount": 0,
"lowSeverityCount": 0,
"noIssueRetrofitCount": 13,
"dataGapRetrofitCount": 0
}
}

