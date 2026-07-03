{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "keauhou-lane-honolulu-renter",
"testCaseOrdinal": 14,
"overallAssessment": "inconclusive_due_to_data_gaps",
"findings": [
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:506",
"SOURCE_DSIRE:dsire_program_id:50",
"SOURCE_DSIRE:dsire_program_id:49"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because it contains no stacked opportunities. However, the packet lists four eligible matched opportunities for solar water heating, including federal ITC, Hawaii Energy rebate, Hawaii personal credit, and Hawaii corporate credit. Only the Hawaii Energy rebate has a V2 package summary, and it is not included in runtime totals because it is not user-facing by default and uses low-confidence placeholder defaults. The packet does not include calculable packages or alternative scenarios for the tax credits, and it does not provide stacking/conflict metadata between the federal credit, Hawaii tax credits, and Hawaii Energy rebate. The Hawaii Energy rebate has a stated restriction only against other Hawaii Energy rebates or offers, so the packet does not show an obvious conflict with federal or state tax credits, but it also does not provide enough scenario-ready data to verify whether additive opportunities should have been included. ",
"recommendedRepair": "Add calculation packages or explicit suppression reasons for the federal ITC and Hawaii personal/corporate solar credits, and add stacking metadata among federal ITC, Hawaii tax credits, and the Hawaii Energy solar water heater rebate. Keep the Hawaii Energy rebate excluded from default runtime totals unless low-confidence default inputs are resolved or the product intentionally exposes not-user-facing-default packages.",
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
"SOURCE_DSIRE:dsire_program_id:3870"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because it includes no conflicting or duplicate opportunities. The packet lists two eligible matched opportunities, but no V2 packages, no runtime rules, and no alternative scenarios. The federal ITC appears matched to battery storage in the eligible categories. The Hawaii C-PACE opportunity is financing, not an incentive rebate, and its hard requirements depend on property-owner eligibility, permanent affixation, qualified capital provider, and required consents; the user profile is a tenant. The packet therefore does not provide enough scenario-ready data to determine whether either opportunity should be included or excluded from a benefit scenario.",
"recommendedRepair": "Add an explicit package/suppression reason for the federal ITC and classify Hawaii C-PACE as financing with owner/consent dependencies rather than an upfront incentive. Add scenario-generation rules indicating whether financing opportunities should enter incentive scenarios or remain informational.",
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
"SOURCE_DSIRE:dsire_program_id:2511"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because it includes no conflicting or duplicate opportunities. The packet lists the federal ITC and USDA REAP loan guarantee as eligible matched opportunities, but provides no V2 packages, runtime rules, alternative scenarios, or stacking metadata. The federal ITC match is narrowed to qualified biogas property rather than broad biomass combustion, while REAP requires an agricultural producer or rural small business and is a loan guarantee rather than a rebate. The tenant residential workforce-housing profile does not establish those REAP borrower conditions. The packet is insufficient to verify whether a calculable nonzero scenario should exist.",
"recommendedRepair": "Add explicit exclusion/suppression reasons for REAP when borrower rural-small-business or agricultural-producer eligibility is not established, and add a calculable or explicitly suppressed package for federal qualified biogas ITC if the retrofit is intended to represent qualified biogas property.",
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
"SOURCE_DSIRE:dsire_program_id:2511"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because it includes no conflicting or duplicate opportunities. The packet lists the federal ITC and USDA REAP loan guarantee as eligible matched opportunities, but no V2 packages, runtime rules, alternative scenarios, or stacking metadata. The federal ITC eligible categories include ground-source geothermal heat pump. REAP also lists ground-source geothermal heat pump, but its hard requirements require an agricultural producer or rural small business and it is a loan guarantee, not a rebate. The user profile is a tenant residential household in a mixed-use building and does not establish REAP borrower eligibility. The packet is insufficient to verify whether a calculable nonzero scenario should exist.",
"recommendedRepair": "Add a calculable or explicitly suppressed package for federal geothermal heat pump ITC, and add REAP exclusion logic or missing-dependency handling for borrower type and rural/agricultural eligibility. Keep REAP out of incentive totals unless the financing treatment and eligibility dependencies are satisfied.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:50",
"SOURCE_DSIRE:dsire_program_id:49"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because it includes no conflicting or duplicate opportunities. The packet lists two Hawaii Solar and Wind Energy Credit opportunities for rooftop solar PV: personal and corporate. These appear to be alternate claimant-type versions of the same state renewable energy credit rather than additive opportunities, because one requires a qualifying individual taxpayer and the other requires a qualifying corporate taxpayer. The user profile is a household tenant with residential organization type, but the packet does not provide enough applicant/taxpayer facts to decide claimant type or whether either credit can be calculated. No V2 packages, runtime rules, alternative scenarios, or explicit mutual-exclusion metadata are provided.",
"recommendedRepair": "Add claimant-type gating and mutual-exclusion metadata between the Hawaii personal and corporate solar credits so they cannot both be selected for the same tax claimant. Add explicit package/suppression status for each credit and generate a scenario only for the applicable claimant pathway.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because there is only one matched opportunity and no stack to validate. However, the federal ITC eligible categories include combined heat and power system, while the packet provides no V2 package, runtime rule, alternative scenario, or explicit suppression reason. Because no calculable package data is present, the packet cannot establish whether the no-incentives scenario is the correct selected scenario.",
"recommendedRepair": "Add a calculable or explicitly suppressed package for the federal ITC as applied to combined heat and power, including any required dependency handling for taxpayer and qualifying-property requirements.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario appears appropriate at the scenario-combination level. The only matched opportunity is the federal ITC, but its blockers state that ordinary high-efficiency HVAC replacement is not supported unless the installed property independently qualifies as listed energy property. Its eligible retrofit categories do not include generic high-efficiency HVAC replacement. No additive calculable opportunity is shown in the packet.",
"recommendedRepair": "Keep the federal ITC excluded from the high-efficiency HVAC replacement scenario unless the retrofit is recategorized as a qualifying listed energy property, such as a qualifying geothermal heat pump, with matching evidence and a calculation package.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario appears appropriate at the scenario-combination level. The only matched opportunity is the federal ITC, but its blockers state that generic LED lighting is not supported unless the installed property independently qualifies as listed energy property. Its eligible retrofit categories do not include LED lighting retrofit. No additive calculable opportunity is shown in the packet.",
"recommendedRepair": "Keep the federal ITC excluded from LED lighting scenarios unless the opportunity data is changed to a source-backed lighting-specific incentive with a valid calculation package.",
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
"explanation": "The selected no-incentives scenario appears appropriate based on the packet. The only matched opportunity is the federal ITC, but its blockers state that a microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure. The eligible retrofit category is microgrid_controller, while the retrofit is broader microgrid_system. No package or scenario data shows that the project is limited to a qualifying controller.",
"recommendedRepair": "Keep the federal ITC excluded for broad microgrid_system unless the retrofit is narrowed to microgrid_controller or the package can isolate eligible controller costs from broader microgrid infrastructure.",
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
"explanation": "The selected no-incentives scenario is internally valid because there is only one matched opportunity and no stack to validate. However, the federal ITC eligible categories include thermal energy storage, while the packet provides no V2 package, runtime rule, alternative scenario, or explicit suppression reason. Because no calculable package data is present, the packet cannot establish whether the no-incentives scenario is the correct selected scenario.",
"recommendedRepair": "Add a calculable or explicitly suppressed package for the federal ITC as applied to thermal energy storage, including required taxpayer, placed-in-service, qualifying-property, and credit-rate dependencies.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 10,
"highSeverityCount": 0,
"mediumSeverityCount": 7,
"lowSeverityCount": 3,
"noIssueRetrofitCount": 0,
"dataGapRetrofitCount": 7
}
}

