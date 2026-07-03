{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "zingermans-deli-ann-arbor",
"testCaseOrdinal": 17,
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
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:2511"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because no calculable incentive packages or alternative scenarios are present. However, the matched opportunities include potentially relevant ITC, MACRS, and REAP loan-guarantee records for biomass/biogas-like property, while the packet provides no calculation packages, no V2 package summaries, and no stacking metadata. Because REAP is financing/loan-guarantee support and MACRS is tax cost recovery, their absence from direct savings may be correct, but the packet does not explain whether ITC or MACRS were intentionally unsupported versus accidentally omitted. Also, REAP eligibility is blocked by unresolved rural-small-business or agricultural-producer requirements for this Ann Arbor commercial site, so it should not drive a scenario without additional qualification data. Source packet reviewed: ",
"recommendedRepair": "Add package/status metadata explaining why ITC and MACRS do not produce a calculable scenario for this retrofit, and ensure REAP is either gated by rural/agricultural eligibility or retained only as non-savings financing information.",
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
"explanation": "The no-incentives scenario is internally valid and there is no alternative scenario with a higher listed benefit. But scenario selection cannot be fully verified because ITC and MACRS appear category-compatible, REAP appears potentially category-compatible but borrower/site eligibility is unresolved, and Michigan Saves is explicitly flagged as unverified for ground-source geothermal. With no V2 package summaries, no calculation package status, and no stacking/conflict metadata, the packet does not show whether the compatible tax opportunities were intentionally excluded or whether no calculable package exists.",
"recommendedRepair": "Provide calculation package disposition for ITC and MACRS; enforce REAP rural/agricultural gating; and do not treat Michigan Saves as applicable to geothermal unless the eligible-improvements list confirms it.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4633",
"SOURCE_DSIRE:dsire_program_id:1271"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The ITC and MACRS records both caution against generic LED lighting treatment. Michigan Saves is financing rather than a rebate or direct incentive. The 179D deduction may be relevant only if the LED retrofit is part of a certified qualifying interior-lighting or building-level project, so excluding it from a simple no-incentives savings scenario is reasonable in this packet.",
"recommendedRepair": "Keep no-incentives selected unless a verified, user-facing 179D package is added with required certification/project-scope inputs. Present Michigan Saves separately as financing rather than as upfront savings.",
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
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:333",
"SOURCE_DSIRE:dsire_program_id:4633"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but scenario verification is incomplete. ITC and MACRS both list solar water heating or solar thermal-related categories, while the packet provides no calculation package status explaining exclusion. The Michigan business activity tax credit should stay excluded because its blockers say it is not a retrofit opportunity. Michigan Saves should also stay excluded from incentive savings because the record says solar thermal water heating was not verified and the program is financing, not a rebate.",
"recommendedRepair": "Add V2 package summaries or scenario candidates for ITC and MACRS if supported; otherwise add explicit unsupported/suppressed status. Continue excluding the Michigan business activity tax credit and Michigan Saves from direct savings scenarios.",
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
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:333"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid and no alternative scenario is listed. However, ITC and MACRS both list combined heat and power as a compatible category, while no calculation package, V2 package summary, or stacking status is provided. The Michigan business activity tax credit should stay excluded because the opportunity data says it is industry support, not a building retrofit incentive.",
"recommendedRepair": "Add package disposition for ITC and MACRS on CHP. If both can be modeled, add stacking rules for federal tax credit plus depreciation basis/cost-recovery treatment; if unsupported, explain why no calculable scenario is generated.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4633"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The ITC and MACRS records both caution that generic ordinary HVAC replacement is not supported as a clean-energy incentive category. Michigan Saves is compatible as financing but is not a rebate, grant, or direct savings opportunity, so excluding it from incentive savings is reasonable.",
"recommendedRepair": "Keep no-incentives selected for savings. Surface Michigan Saves only as financing support, not as upfront savings or grant money.",
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
"SOURCE_DSIRE:dsire_program_id:333"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but the packet does not fully support the scenario decision. ITC lists battery storage as an eligible category, yet there is no calculation package or V2 disposition explaining why no tax-credit scenario was produced. The Michigan business activity tax credit should stay excluded because its blockers say not to match battery storage installations to that industry tax credit.",
"recommendedRepair": "Add an ITC package disposition for battery storage. Exclude the Michigan business activity tax credit from retrofit savings scenarios.",
"needsMathVerificationLater": false
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
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is Michigan Local PACE, which the packet describes as financing repaid through a property assessment rather than a rebate or grant. Excluding it from direct incentive savings is appropriate.",
"recommendedRepair": "Keep no-incentives selected for direct savings. Present PACE separately as possible financing, subject to property ownership and participating-jurisdiction checks.",
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
"explanation": "The selected no-incentives scenario is internally valid. Michigan Saves is financing rather than a direct rebate, and the opportunity data specifically says air sealing was not directly verified on the current public page checked. It should not be included as a savings scenario from the packet as given.",
"recommendedRepair": "Keep no-incentives selected unless the detailed Michigan Saves eligible-improvements list confirms air sealing and a financing-only display path is available.",
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
"explanation": "The selected no-incentives scenario is internally valid. Michigan Saves lists high-efficiency refrigeration equipment as an eligible category, but the packet characterizes the program as financing rather than a rebate or direct incentive payment. Therefore it should not be counted as upfront savings in the selected scenario.",
"recommendedRepair": "Keep no-incentives selected for savings. Show Michigan Saves as financing support if financing products are displayed separately.",
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
"explanation": "The selected no-incentives scenario is internally valid. Michigan Saves lists insulation upgrade as an eligible category, but the opportunity is financing, not a rebate, grant, or direct savings opportunity, so excluding it from incentive savings is reasonable.",
"recommendedRepair": "Keep no-incentives selected for savings. Present Michigan Saves separately as financing if non-incentive finance options are in scope.",
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
"explanation": "The selected no-incentives scenario is internally valid. Michigan Saves lists lighting controls as an eligible category, but the opportunity is financing rather than a rebate or guaranteed incentive payment. No compatible direct-savings scenario is listed.",
"recommendedRepair": "Keep no-incentives selected for savings. Show Michigan Saves only in a financing-support context.",
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
"explanation": "The selected no-incentives scenario is internally valid. Although the ITC record includes microgrid controllers, its blockers say a microgrid match should be limited to qualifying microgrid controllers and not all microgrid infrastructure. The retrofit is a broader microgrid system, so excluding the ITC from this scenario is reasonable unless the project scope is narrowed to a qualifying controller.",
"recommendedRepair": "Keep no-incentives selected for the broad microgrid system. Add a separate microgrid-controller retrofit or required scope input before considering ITC.",
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
"explanation": "The selected no-incentives scenario is internally valid, but the packet does not fully explain the scenario decision. MACRS lists small wind turbine as a compatible category, yet no calculation package or V2 disposition is supplied. There is no selected alternative to compare, but the exclusion of tax cost recovery cannot be verified from the scenario data alone.",
"recommendedRepair": "Add MACRS package status for small wind, including whether it is unsupported, suppressed, non-user-facing, or intentionally excluded from direct first-year benefit.",
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
"explanation": "The selected no-incentives scenario is internally valid, but ITC lists thermal energy storage as an eligible category and no package disposition explains why no tax-credit scenario was generated. With no V2 summary or alternative scenario, the packet does not establish whether the opportunity was correctly excluded from the selected scenario.",
"recommendedRepair": "Add an ITC calculation-package disposition for thermal energy storage, including any missing inputs or unsupported reasons.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 15,
"highSeverityCount": 0,
"mediumSeverityCount": 8,
"lowSeverityCount": 7,
"noIssueRetrofitCount": 7,
"dataGapRetrofitCount": 8
}
}

