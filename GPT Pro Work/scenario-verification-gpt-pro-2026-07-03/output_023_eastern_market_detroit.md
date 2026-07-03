{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "eastern-market-detroit",
"testCaseOrdinal": 23,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid because no calculable incentive package or alternative scenario is listed. However, the packet shows potentially compatible federal tax benefits for qualifying biogas/biomass-related property, especially ITC for qualified biogas property and MACRS for biomass/biogas energy systems, while v2PackageSummaries are empty. The packet does not provide package inclusion/blocking status or stacking metadata, so it is not possible to verify whether no-incentives is the right best scenario rather than simply the only scenario available. Packet source: ",
"recommendedRepair": "Add V2 package summaries or explicit no-calculation reasons for ITC and MACRS. If calculable and user-facing, generate candidate scenarios and define whether ITC and MACRS may stack or require basis adjustments.",
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
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:4633"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid on the listed scenarios, but several matched opportunities could affect financing or tax treatment if calculable: ITC includes ground-source geothermal heat pumps, MACRS includes geothermal energy property, REAP may support geothermal subject to rural/agricultural eligibility, and Michigan Saves financing is matched but has a blocker saying geothermal was not directly verified. Because no V2 package summaries or alternative scenarios are present, the packet does not support a reliable decision that no-incentives is the best scenario.",
"recommendedRepair": "Add explicit package status for ITC, MACRS, REAP, and Michigan Saves. Block Michigan Saves for geothermal unless the eligible-improvements list confirms it. Generate candidate scenarios for calculable tax incentives where supported and record stacking/basis rules.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:4633",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:1271"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid. The matched federal ITC and MACRS records explicitly warn that generic LED lighting is not supported as a clean-energy property category. Michigan Saves is financing, not a direct incentive payment. The 179D deduction match is valid only as part of a certified qualifying interior-lighting or whole-building/retrofit-property savings calculation and should not be treated as a simple LED rebate. With no calculable packages or alternative scenarios listed, excluding these from the selected scenario is acceptable for this combination pass.",
"recommendedRepair": "Keep no-incentives selected unless a certified 179D package or financing-display package is intentionally supported. Ensure 179D is not surfaced as a simple standalone LED rebate.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid only because no calculable package or alternative scenario is listed. The packet identifies solar water heating as an eligible ITC category and MACRS category. Michigan Saves is explicitly not verified for solar thermal water heating, and the Michigan Business Activity Tax Credit is blocked for building retrofits, so those should stay excluded. The missing V2 package summaries prevent verification of whether ITC and/or MACRS should have produced a better candidate scenario.",
"recommendedRepair": "Add package status for ITC and MACRS solar water heating. Keep Michigan Saves and the Michigan Business Activity Tax Credit excluded unless source-backed data changes. Define ITC/MACRS stacking and basis-adjustment metadata before selecting a best scenario.",
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
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid on the listed scenarios, but the packet identifies combined heat and power as eligible under both ITC and MACRS. The Michigan Business Activity Tax Credit is explicitly blocked for building equipment and should stay excluded. Because V2 package summaries are empty and no candidate tax-credit/depreciation scenario is shown, the packet does not provide enough information to confirm that no-incentives is the correct selected scenario.",
"recommendedRepair": "Add included/blocked/missing-input package summaries for ITC and MACRS and generate candidate scenarios if calculable. Add stacking metadata for ITC and MACRS before choosing the selected scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:4633",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid. The packet warns that generic high-efficiency HVAC replacement is not supported by ITC unless the installed property independently qualifies as listed energy property, and MACRS also blocks ordinary HVAC replacement as a specially supported clean-energy category. Michigan Saves is financing, not a rebate or guaranteed incentive payment. No alternative scenario is listed.",
"recommendedRepair": "Keep no-incentives selected for ordinary high-efficiency HVAC replacement. If the retrofit is later specified as a qualifying geothermal heat pump or other listed energy property, remap it to the more specific retrofit and package logic.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "medium",
"findingType": "missing_compatible_opportunity",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario omits the ITC even though the matched opportunity explicitly lists battery_storage_system as an eligible retrofit category and has no battery-specific blocker. The Michigan Business Activity Tax Credit is blocked for battery storage installations and should stay excluded. Because no V2 package summary explains why the ITC was omitted, this appears to be a missing compatible opportunity at the scenario-construction level.",
"recommendedRepair": "Add or repair a calculable ITC battery storage package, or add an explicit package-blocking reason such as missing required inputs, low confidence, unsupported, or not user-facing. Generate an ITC candidate scenario when calculable.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4521"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid. The only matched opportunity is Michigan Local PACE, and the packet repeatedly states this should be treated as financing, not as a rebate or grant. It is reasonable for it not to create an upfront-savings scenario in this pass.",
"recommendedRepair": "Keep no-incentives selected for direct incentive scenario purposes. If RetroFi has a financing scenario display mode, classify PACE separately from rebates, grants, and tax credits.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "air_sealing_weatherization",
"retrofitDisplayName": "Air sealing / weatherization",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4633"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid. The only matched opportunity is Michigan Saves financing, and the packet says air sealing was not directly verified on the current public page and should not be matched unless the full eligible-improvements list confirms it. It should not be converted into an incentive scenario based on the supplied packet.",
"recommendedRepair": "Keep Michigan Saves excluded for air sealing unless a source-backed eligible-improvements list confirms the measure. Continue treating Michigan Saves as financing rather than an upfront incentive.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "energy_audit",
"retrofitDisplayName": "Energy audit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5543"
],
"affectedScenarioIds": [],
"explanation": "No scenario is listed, which is appropriate for this non-physical retrofit. The matched Lean and Green Michigan PACE opportunity says standalone energy audits are due-diligence requirements, not the primary retrofit incentive, and savings preview marks audits/studies as unsupported without modeled savings input.",
"recommendedRepair": "Keep standalone energy audit excluded from incentive scenarios. Attach PACE only to eligible financed improvement retrofits, not to audit-only retrofits.",
"needsMathVerificationLater": false
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
"explanation": "No scenario is listed, which is appropriate for this non-physical retrofit. The matched USDA biorefinery program explicitly blocks standalone engineering feasibility studies as a source-backed retrofit category and says it is not a rebate for building energy equipment.",
"recommendedRepair": "Keep the feasibility-study match excluded from scenarios unless it is tied to a qualifying commercial-scale biorefinery or biobased manufacturing project with a source-backed financeable scope.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4633"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid. The only matched opportunity is Michigan Saves, which supports financing for high-efficiency refrigeration equipment but is not a rebate or guaranteed incentive payment. No compatible calculable incentive or alternative scenario is shown.",
"recommendedRepair": "Keep no-incentives selected for direct benefit scenarios. Represent Michigan Saves only in financing-specific outputs if supported.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4633"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid. Michigan Saves is matched for insulation, but the packet characterizes it as financing rather than a rebate or guaranteed incentive payment. No calculable incentive scenario or alternative is listed.",
"recommendedRepair": "Keep no-incentives selected for direct incentive scenarios. Classify Michigan Saves as financing rather than upfront savings.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"retrofitDisplayName": "Lighting controls retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4633"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid. Michigan Saves is matched for lighting controls but is financing, not a direct rebate or grant, and no alternative scenario is listed.",
"recommendedRepair": "Keep no-incentives selected for direct incentive scenarios. Represent Michigan Saves only as financing if that product mode is supported.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "microgrid_system",
"retrofitDisplayName": "Microgrid system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid on the listed scenarios, but the ITC opportunity lists microgrid_controller as an eligible category and warns that a microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure. The retrofit is broadly labeled microgrid system, and the packet gives no package summary showing whether the scope includes a qualifying controller or why it was blocked. This prevents a reliable scenario decision.",
"recommendedRepair": "Split microgrid system from microgrid controller or require an input confirming qualifying microgrid-controller scope. Add a V2 package summary that either includes a limited ITC package or blocks it for unsupported scope/missing inputs.",
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
"explanation": "Selected no-incentives scenario is internally valid only because no calculable package or alternative scenario is listed. MACRS explicitly includes small_wind_turbine as an eligible retrofit category, but the packet provides no V2 package summary explaining whether depreciation treatment was included, blocked, suppressed, or unsupported. No other candidate scenario is available to compare.",
"recommendedRepair": "Add a MACRS package summary for small wind and generate a candidate scenario if RetroFi intends tax cost recovery to be user-facing/calculable. Otherwise mark the package as suppressed or not user-facing by default.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "thermal_energy_storage",
"retrofitDisplayName": "Thermal energy storage",
"severity": "medium",
"findingType": "missing_compatible_opportunity",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario omits the ITC even though the matched opportunity explicitly lists thermal_energy_storage as an eligible retrofit category and has no thermal-storage-specific blocker. With no V2 package summary or alternative scenario explaining the omission, this appears to be a missing compatible opportunity at the scenario-construction level.",
"recommendedRepair": "Add or repair a calculable ITC thermal energy storage package, or add an explicit blocking reason such as missing inputs, unsupported scope, low confidence, or not user-facing. Generate an ITC candidate scenario when calculable.",
"needsMathVerificationLater": true
}
],
"summary": {
"retrofitsReviewed": 17,
"highSeverityCount": 0,
"mediumSeverityCount": 8,
"lowSeverityCount": 9,
"noIssueRetrofitCount": 5,
"dataGapRetrofitCount": 6
}
}

