{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "kauai-coffee-kalaheo",
"testCaseOrdinal": 46,
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
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:734"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because no calculable incentive packages or alternative scenarios are present for this retrofit. The matched opportunities are loan guarantee, tax cost-recovery, or production-credit opportunities, and the packet does not provide a calculable package to include them in runtime totals. No invalid stack or duplicate double-counting appears in the selected scenario because it includes no opportunities. Source packet: ",
"recommendedRepair": "No scenario-combination repair needed in this pass. Formula/package availability can be reviewed separately if RetroFi later intends to model tax, loan, or PTC value.",
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
"SOURCE_DSIRE:dsire_program_id:734"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because there are no calculable packages or alternative scenarios. The PTC matched opportunity explicitly states that ground-source geothermal heat pumps are not geothermal electric generation and should not match, so excluding it from the scenario is appropriate. REAP is a loan guarantee and MACRS is tax cost recovery, with no package included for runtime totals.",
"recommendedRepair": "No scenario-combination repair needed. Consider cleaning the opportunity match data for the PTC separately so it does not appear as an eligible matched opportunity for ground-source heat pumps.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3870",
"SOURCE_DSIRE:dsire_program_id:734"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid for this pass. Hawaii C-PACE is financing rather than a rebate or direct savings package, and no V2 calculable package is listed. The PTC matched opportunity explicitly says battery storage is not a standalone renewable electricity production retrofit, so excluding it from the scenario is appropriate. No invalid stack or duplicate double-counting appears because the selected scenario includes no opportunities.",
"recommendedRepair": "No scenario-combination repair needed. Consider keeping C-PACE surfaced as financing outside incentive totals, and clean or suppress the standalone battery-storage PTC match separately.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:734"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because no calculable packages or alternative scenarios are present. MACRS is tax cost recovery with no runtime package, and the PTC opportunity states that CHP is not automatically eligible unless it separately qualifies as renewable electric generation. The selected scenario does not double-count or stack incompatible opportunities.",
"recommendedRepair": "No scenario-combination repair needed. Separately verify whether CHP should remain matched to the PTC only when a qualifying renewable electric generation facility is modeled.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22630"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is appropriate. The NEVI package is suppressed from runtime totals, marked low confidence, requires human review, and lacks award_probability. It also depends on HDOT selection or contract status, site location, charger power and port count, approved cost share, selection status, and approved award amount. Because the package is custom_quote_estimate and not included in runtime totals, it should not be added to the selected scenario.",
"recommendedRepair": "Keep NEVI excluded from selected runtime totals unless the missing award and selection inputs are provided and the package is approved for user-facing calculation.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:598",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario may be incomplete because the matched KIUC Solar Water Heating Rebate Program is a direct rebate and the opportunity evidence says it offers a $1,500 rebate for whole-system solar water heater installations. However, no V2 package summary or scenario candidate explains why this apparently calculable rebate was excluded. The packet also shows the user is a nonresidential agricultural business, while the KIUC rebate opportunity lists eligible sectors as residential and eligible applicant types as KIUC member, residential customer, and property owner. That conflicting eligibility data prevents a reliable decision on whether the rebate should be included or excluded.",
"recommendedRepair": "Repair or clarify the KIUC solar water heating opportunity eligibility for this agricultural nonresidential profile. If eligible, create a calculable package and scenario including the rebate. If residential-only, suppress or mark the opportunity ineligible for this user instead of leaving it as an eligible matched opportunity with no scenario explanation.",
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
"explanation": "No calculable scenario is appropriate. The retrofit is non-physical and unsupported because a study needs resulting modeled savings before monthly savings can be calculated. The matched USDA biorefinery loan guarantee explicitly blocks standalone engineering feasibility studies as a source-backed retrofit category, so no scenario should be created from that opportunity.",
"recommendedRepair": "No scenario-combination repair needed. Separately consider suppressing the matched opportunity for standalone feasibility studies to reduce noise.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is MACRS, whose blockers state that generic ordinary HVAC replacement is not a specially supported clean-energy MACRS category. No calculable package or alternative scenario is present, and the selected scenario does not include any invalid stack.",
"recommendedRepair": "No scenario-combination repair needed. Separately consider suppressing the generic HVAC MACRS match based on the opportunity blockers.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is MACRS, whose blockers state that generic LED lighting is not a specially supported clean-energy MACRS category. No calculable package or alternative scenario is present, and the selected scenario does not include any invalid stack.",
"recommendedRepair": "No scenario-combination repair needed. Separately consider suppressing the generic LED lighting MACRS match based on the opportunity blockers.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2997"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because the only matched opportunity is a Hawaii Department of Agriculture loan, not a direct rebate or grant, and no calculable package or alternative scenario is present. The opportunity notes also say not to force the match to rooftop-only solar, but that is a category-label issue rather than a scenario-combination issue.",
"recommendedRepair": "No scenario-combination repair needed. Consider renaming or mapping the eligible retrofit category to broader solar_pv_system for this opportunity outside the scenario selection pass.",
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
"explanation": "The selected no-incentives scenario is internally valid. The only matched opportunity is MACRS tax cost recovery, and no calculable package or alternative scenario is present. The selected scenario does not include any invalid stack or duplicate opportunity.",
"recommendedRepair": "No scenario-combination repair needed in this pass. Formula/package availability for MACRS can be reviewed separately if RetroFi intends to model tax cost recovery.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 11,
"highSeverityCount": 0,
"mediumSeverityCount": 1,
"lowSeverityCount": 10,
"noIssueRetrofitCount": 10,
"dataGapRetrofitCount": 1
}
}

