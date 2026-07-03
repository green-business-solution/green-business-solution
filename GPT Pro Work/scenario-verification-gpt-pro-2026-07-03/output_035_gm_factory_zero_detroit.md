{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "gm-factory-zero-detroit",
"testCaseOrdinal": 35,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5313",
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario is internally valid because no calculable incentive packages are included. However, reliable scenario selection is blocked by missing calculable package and stacking metadata for three matched opportunities. The packet identifies USDA 5313 as a loan guarantee only for commercial-scale biorefineries or qualifying biobased manufacturing facilities, REAP 2511 as a loan guarantee subject to agricultural-producer or rural-small-business eligibility, and MACRS 676 as tax cost recovery rather than a rebate. Because none has an included calculation package or explicit scenario treatment, this pass cannot determine whether any finance/tax-cost-recovery item should be shown as an additive scenario, excluded from savings totals, or flagged separately. ",
"recommendedRepair": "Add explicit scenario metadata for financing and tax-cost-recovery opportunities: either mark them non-cash/not runtime-totalable, provide a calculable package, or record why they are intentionally excluded from selected scenarios. Also enforce the USDA commercial-scale and REAP borrower/rural eligibility constraints before creating any incentive scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22647",
"SOURCE_DSIRE:dsire_program_id:4521"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario appears appropriate for runtime totals. NEVI has a V2 package but is low confidence, excluded from runtime totals, and missing conditional_award_amount, with multiple placeholder default inputs for award selection, corridor compliance, equipment compliance, non-federal match, and approved award amount. Michigan Local PACE is matched only as financing and has no calculation package; the packet warns not to treat PACE as a rebate or grant. There is no listed compatible calculable alternative with a higher first-year benefit.",
"recommendedRepair": "Keep NEVI and PACE out of selected cash-benefit totals until project-specific award/compliance inputs and a user-facing calculation package are available. Optionally surface them as non-totaled financing/grant leads rather than no-incentive scenario components.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario is internally valid, but reliable scenario selection is blocked by missing package treatment for REAP 2511 and MACRS 676. REAP is described as a loan guarantee requiring agricultural-producer or rural-small-business eligibility, while the user is an industrial EV assembly plant with no packet evidence of agricultural-producer status or rural-small-business status. MACRS is tax cost recovery, not a rebate or grant, and has no scenario package. The packet does not establish whether either should become a non-totaled scenario component, a calculated tax scenario, or remain excluded.",
"recommendedRepair": "Do not include REAP in incentive totals unless borrower eligibility is established. Add explicit MACRS package/support status for geothermal property or mark MACRS intentionally excluded from scenario totals as tax cost recovery.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "low",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid and there is no alternative scenario listed. MACRS 676 is a matched tax cost-recovery opportunity for solar water heating, but there is no V2 package or scenario metadata explaining whether it is unsupported, suppressed, non-user-facing, or intentionally excluded from totals.",
"recommendedRepair": "Add a clear runtime treatment for MACRS on solar water heating: calculable tax-cost-recovery package, non-totaled informational benefit, or explicit exclusion reason.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "low",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid and no alternative scenario is listed. MACRS 676 is matched for combined heat and power, but the packet includes no V2 package or explicit exclusion/suppression reason. This prevents a reliable decision on whether a tax-cost-recovery scenario should have been created or intentionally omitted.",
"recommendedRepair": "Add package status and scenario-selection metadata for MACRS on combined heat and power, including whether it is calculable, non-totaled, or excluded from runtime totals.",
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
"explanation": "No calculable scenario is present, which is appropriate for this pass. The retrofit is marked unsupported as an audit/study/planning item requiring modeled savings before RetroFi can calculate monthly savings, and the matched USDA 5313 opportunity explicitly says standalone engineering feasibility studies are not a source-backed retrofit category.",
"recommendedRepair": "Keep this retrofit out of calculated incentive scenarios unless it is tied to an eligible commercial-scale biorefinery or qualifying biobased manufacturing facility project with modeled savings and a supported calculation package.",
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
"explanation": "The selected no-incentives scenario appears appropriate. MACRS 676 is the only matched opportunity, but its blockers state that generic HVAC replacement is not a specially supported clean-energy MACRS category. There is no compatible calculable alternative listed.",
"recommendedRepair": "Keep MACRS excluded for generic high-efficiency HVAC replacement unless the retrofit is reclassified into a supported clean-energy property category with source-backed eligibility.",
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
"explanation": "The selected no-incentives scenario appears appropriate. MACRS 676 is the only matched opportunity, but its blockers state that generic LED lighting is not a specially supported clean-energy MACRS category. There is no compatible calculable alternative listed.",
"recommendedRepair": "Keep MACRS excluded for generic LED lighting retrofits unless the opportunity data or retrofit categorization is repaired to support a qualifying depreciable clean-energy property category.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "low",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid and no alternative scenario is listed. MACRS 676 is matched for small wind turbine, but there is no V2 package or explicit exclusion/suppression reason explaining why a tax-cost-recovery opportunity did not enter a scenario.",
"recommendedRepair": "Add package status and scenario-selection metadata for MACRS on small wind, including whether it is calculable, non-totaled, or excluded from runtime totals.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 9,
"highSeverityCount": 0,
"mediumSeverityCount": 2,
"lowSeverityCount": 7,
"noIssueRetrofitCount": 0,
"dataGapRetrofitCount": 5
}
}

