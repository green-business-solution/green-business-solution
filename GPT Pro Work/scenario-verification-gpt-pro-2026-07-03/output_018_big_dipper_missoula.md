{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "big-dipper-missoula",
"testCaseOrdinal": 18,
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
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:154",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:978",
"SOURCE_DSIRE:dsire_program_id:496"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but the packet lists several matched biomass/biogas opportunities and no V2 package summaries or alternative scenarios. Some opportunities are financing, tax, depreciation, or property-tax mechanisms rather than simple rebates, and one has no eligible retrofit categories. The packet does not provide calculable scenario candidates or stacking/conflict metadata sufficient to decide whether any eligible tax/property-tax opportunities should be included. Source packet: ",
"recommendedRepair": "Add package coverage or explicit non-calculable/excluded reasons for each matched biomass/biogas opportunity, especially federal ITC, MACRS, Montana renewable/generation property-tax exemptions, REAP loan guarantee, and the new/expanded generating-facilities abatement.",
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
"SOURCE_DSIRE:dsire_program_id:154",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:978",
"SOURCE_DSIRE:dsire_program_id:496"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but matched geothermal opportunities include federal ITC, REAP loan guarantee, Montana renewable property-tax exemption, and MACRS. The packet also includes opportunities that appear unsupported or generation-only for ground-source heat pumps, such as the generation-facility exemption and new/expanded generating-facilities abatement. Because no V2 packages or scenario candidates are provided, the packet cannot establish whether no incentives is the correct best scenario or whether invalid matches were safely excluded.",
"recommendedRepair": "Provide explicit exclusion reasons for generation-only or categoryless opportunities and add calculable/non-calculable package summaries for the potentially compatible geothermal ITC, MACRS, Montana renewable property-tax exemption, and REAP loan guarantee.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is appropriate for the NorthWestern Energy rebate package in this pass because the V2 package is not user-facing by default, is not included in runtime totals, and relies on low-confidence placeholder defaults. Other matched tax opportunities have blockers or requirements making them unsuitable as simple LED rebate scenario entries without additional certification or tax eligibility details.",
"recommendedRepair": "Keep the NorthWestern Energy lighting package suppressed from default totals until measure selection and required project inputs are user-provided or otherwise high-confidence. Add explicit non-calculable/excluded reasons for LED-related tax deduction matches where no package exists.",
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
"SOURCE_DSIRE:dsire_program_id:154",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:978",
"SOURCE_DSIRE:dsire_program_id:496"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, and the packet correctly indicates that generation-facility exemptions should not apply to standalone solar water heating unless tied to solar electric generation. However, matched solar-water-heating opportunities include federal ITC, Montana renewable property-tax exemption, and MACRS, with no V2 package summaries or alternative scenarios. This prevents reliable verification that no incentives is the correct combination.",
"recommendedRepair": "Add explicit package/exclusion summaries for solar water heating ITC, MACRS, and Montana renewable property-tax exemption, and separately mark generation-only/property-tax abatement opportunities as excluded when the retrofit is not electric generation.",
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
"SOURCE_DSIRE:dsire_program_id:154",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario appears valid. The matched opportunities themselves state that generic or ordinary high-efficiency HVAC replacement is not supported for ITC, Montana renewable property-tax exemption, or MACRS clean-energy treatment unless the installed property independently qualifies under narrower categories. No compatible additive calculable opportunity is shown in the packet.",
"recommendedRepair": "No scenario-combination repair needed. Consider improving matching so generic high-efficiency HVAC is not surfaced against these narrow clean-energy tax opportunities unless the project is a qualifying geothermal or other eligible energy property.",
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
"SOURCE_DSIRE:dsire_program_id:496",
"SOURCE_DSIRE:dsire_program_id:22653"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but the packet lists potentially compatible battery storage opportunities, including federal ITC and Montana C-PACE financing. The C-PACE opportunity is financing rather than a rebate and may not belong in first-year savings totals, while the new/expanded generating-facilities abatement has no eligible retrofit categories and says battery storage should not be matched. Because no V2 package summaries or explicit scenario exclusions are present, the packet does not fully support the no-incentives selection.",
"recommendedRepair": "Add explicit package or exclusion handling for battery ITC and C-PACE, and remove or hard-exclude the new/expanded generating-facilities abatement for battery storage unless future data establishes eligibility.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is appropriate for the NorthWestern Energy package in this pass because the V2 package is not user-facing by default, is excluded from runtime totals, and uses low-confidence placeholder defaults. The packet also notes that wall insulation eligibility is narrow and tied to electric-space-heat requirements, so default inclusion would be unreliable.",
"recommendedRepair": "Keep the utility rebate out of default totals until insulation type, electric space-heating applicability, and other required inputs are confirmed. Add an explicit non-calculable or tax-only handling note for the Montana energy-conserving investment deduction.",
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
"explanation": "The selected no-incentives scenario is internally valid, but both matched opportunities list combined heat and power as an eligible category: federal ITC and MACRS. No V2 package summaries, alternative scenarios, or explicit exclusion reasons are provided. Therefore the packet does not demonstrate that no incentives is the correct best scenario for CHP.",
"recommendedRepair": "Add calculable or explicitly non-calculable scenario package handling for CHP ITC and MACRS, including any stacking/dependency treatment between tax credit and depreciation.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"retrofitDisplayName": "Low-flow fixture retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is appropriate in this pass. The only matched opportunity has a V2 package that is not user-facing by default, is not included in runtime totals, and relies on low-confidence placeholder defaults. The opportunity also requires product-specific and electric-water-heating applicability checks for some water-related measures.",
"recommendedRepair": "Keep excluded from default totals until the actual low-flow measure and required eligibility inputs are confirmed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is appropriate in this pass. The NorthWestern Energy package is not user-facing by default, not included in runtime totals, and depends on low-confidence placeholder defaults. The packet supports refrigeration controls and related measures, but not automatic inclusion without a verified selected measure and unit inputs.",
"recommendedRepair": "Keep excluded from default totals until the refrigeration measure and required project quantities are confirmed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"retrofitDisplayName": "Lighting controls retrofit",
"severity": "medium",
"findingType": "missing_compatible_opportunity",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1658",
"SOURCE_DSIRE:dsire_program_id:1158"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The packet lists only the Montana energy-conserving investment deduction for lighting controls, but the NorthWestern Energy opportunity elsewhere in the same packet explicitly includes lighting_controls as an eligible retrofit category and matches the user's Montana NorthWestern commercial electric profile. This appears to be a missing matched opportunity for this retrofit. Because it is absent, the selected no-incentives scenario cannot be fully verified for lighting controls.",
"recommendedRepair": "Add NorthWestern Energy Commercial Energy Efficiency Rebate Program as a matched opportunity for lighting controls, with the same not-user-facing/default-input safeguards used for LED lighting if required inputs are not confirmed.",
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
"explanation": "The selected no-incentives scenario is internally valid, but the only matched opportunity is federal ITC, which the packet narrows to qualifying microgrid controllers rather than all microgrid infrastructure. No V2 package summary or explicit exclusion states whether this retrofit includes a qualifying controller. That data gap prevents a reliable scenario-combination decision.",
"recommendedRepair": "Require an input or subtype indicating qualifying microgrid controller costs before including ITC; otherwise explicitly exclude the opportunity from the scenario with a non-qualifying-infrastructure reason.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "medium",
"findingType": "missing_compatible_opportunity",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:154",
"SOURCE_DSIRE:dsire_program_id:978",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Only MACRS is listed as matched for small wind, but other opportunities in the same packet list small wind or wind/renewable electric generation categories that appear compatible with a Montana commercial small wind project: federal ITC broadly matches wind in its opportunity technology text, Montana renewable energy systems exemption includes wind energy system, and Montana generation-facility exemption includes small wind turbine. The selected no-incentives scenario cannot be verified because potentially compatible opportunities appear missing from the matched set.",
"recommendedRepair": "Re-run matching for small wind and add or explicitly exclude federal ITC, Montana renewable energy systems exemption, and Montana generation-facility exemption. Then create calculable or non-calculable package summaries and conflict/stacking metadata as applicable.",
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
"explanation": "The selected no-incentives scenario is internally valid, but the matched federal ITC opportunity lists thermal energy storage as an eligible category. No V2 package summary, alternative scenario, or explicit exclusion reason is provided, so the packet cannot show that the no-incentives scenario is the correct best scenario.",
"recommendedRepair": "Add ITC package handling for thermal energy storage or explicitly mark it non-calculable/blocked with the missing inputs needed for scenario inclusion.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"retrofitDisplayName": "Variable frequency drive retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is appropriate in this pass. The only matched opportunity has a V2 package that is not user-facing by default, is excluded from runtime totals, and depends on low-confidence placeholder defaults, including horsepower and selected measure.",
"recommendedRepair": "Keep excluded from default totals until VFD measure selection and horsepower/unit inputs are confirmed.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "waste_heat_recovery",
"retrofitDisplayName": "Waste heat recovery",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1158"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario appears valid for this pass. The only matched opportunity is a Montana tax deduction for approved building energy-conservation capital investment, and the packet warns not to force it into a specific waste-heat category unless the applicant's approved capital investment specifically covers that measure. No calculable package or compatible additive scenario is provided.",
"recommendedRepair": "No scenario-combination repair needed. Add a non-calculable/excluded reason for the tax deduction unless project-specific approval details are available.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 16,
"highSeverityCount": 0,
"mediumSeverityCount": 9,
"lowSeverityCount": 7,
"noIssueRetrofitCount": 2,
"dataGapRetrofitCount": 8
}
}

