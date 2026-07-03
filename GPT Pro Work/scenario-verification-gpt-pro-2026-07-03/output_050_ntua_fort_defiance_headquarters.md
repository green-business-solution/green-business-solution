{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "ntua-fort-defiance-headquarters",
"testCaseOrdinal": 50,
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
"SOURCE_DSIRE:dsire_program_id:1683",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because no calculable incentive scenarios are listed. However, four matched opportunities appear potentially relevant to this retrofit, and the packet provides no V2 package summaries or alternative scenarios explaining whether they were excluded because of missing calculation packages, unsupported incentive types, applicant restrictions, or stacking rules. REAP also has hard requirements for agricultural producer or rural small business status that are not established by the provided government/utility user profile, and MACRS depends on ownership of depreciable business property. These data gaps prevent reliable scenario-combination verification for the matched incentive set. ",
"recommendedRepair": "Add explicit scenario/package disposition metadata for each matched opportunity, especially ITC, REAP loan guarantee, Arizona property tax exemption, and MACRS. Mark non-calculable tax/loan/property-tax treatments as intentionally excluded from cash-benefit scenarios or add calculable packages where supported, and resolve applicant/depreciable-property eligibility dependencies.",
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
"SOURCE_DSIRE:dsire_program_id:1683",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid on the listed scenario data, but the matched opportunities include ITC, REAP, Arizona property tax exemption, and MACRS, all with retrofit-category matches or adjacent geothermal support. No V2 package summaries or alternative scenarios explain why no incentive scenario was formed. Because the packet does not provide calculable-package dispositions, stacking/conflict metadata, or confirmation of REAP/MACRS eligibility dependencies, it is not possible to verify whether no incentives is the correct selected combination.",
"recommendedRepair": "Add V2 package summaries or scenario-generation exclusion reasons for each matched opportunity, including whether the property tax exemption and MACRS are excluded from first-year cash benefit by design, whether ITC is calculable for geothermal heat pump property, and whether REAP applicant requirements are satisfied or block inclusion.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2458"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is acceptable for this pass despite the APS rebate package showing an expected one-time savings amount, because the V2 summary marks the package as not user-facing by default, not included in runtime totals, medium confidence, and dependent on low-confidence placeholder defaults. No listed alternative scenario includes the APS rebate with a higher reliable benefit, so there is no scenario-level basis to select another combination.",
"recommendedRepair": "Keep the APS package excluded from default runtime totals until account eligibility, measure type, quantity, equipment tier, project cost, and required preapproval/verified-savings inputs are user-supplied or otherwise validated. Optionally expose it as a non-default estimate with clear low-confidence labeling.",
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
"SOURCE_DSIRE:dsire_program_id:1683",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid as the only listed scenario, but CHP is explicitly present in the matched ITC, Arizona property tax exemption, and MACRS eligible retrofit categories. The packet contains no V2 package summaries or alternative incentive scenarios to explain whether those opportunities are non-calculable, intentionally excluded from first-year cash benefit, blocked by tax/depreciation requirements, or stackable. This prevents reliable verification of the selected combination.",
"recommendedRepair": "Add package disposition and stacking metadata for ITC, Arizona property tax exemption, and MACRS for CHP. If these are excluded because they are tax/property-tax/depreciation treatments rather than direct incentives, make that exclusion explicit in V2 summaries.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No-incentives selection appears appropriate for scenario-combination purposes. The matched ITC opportunity explicitly blocks ordinary high-efficiency HVAC replacement unless it independently qualifies as listed energy property, and the matched MACRS opportunity says ordinary HVAC replacement is not specially supported under the clean-energy MACRS categories. No compatible calculable HVAC incentive or alternative scenario is listed.",
"recommendedRepair": "Keep ITC and MACRS excluded from the default HVAC replacement scenario unless the retrofit is narrowed to a separately qualifying clean-energy property category and a supported calculation package exists.",
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
"SOURCE_DSIRE:dsire_program_id:119",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid as the only listed scenario, but solar water heating is explicitly included in the matched ITC, Arizona sales tax exemption, and MACRS eligible retrofit categories. The packet provides no V2 package summaries, alternative scenarios, or stacking/disposition metadata explaining why no incentive scenario was generated. This blocks reliable verification of whether the compatible sales tax exemption and tax incentives should have entered a scenario.",
"recommendedRepair": "Add V2 package summaries or explicit exclusion reasons for ITC, Arizona solar equipment sales tax exemption, and MACRS. Include stacking metadata indicating whether the sales tax exemption can be modeled alongside federal tax benefits or whether tax/depreciation incentives are intentionally omitted from user-facing scenario totals.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The only matched opportunity is the federal ITC, and battery storage is included in its eligible retrofit categories. The selected no-incentives scenario is the only listed scenario, but there is no V2 package summary or exclusion reason explaining why ITC was not included or why it is non-calculable for this test case.",
"recommendedRepair": "Add a V2 package summary for the ITC showing whether the battery storage project is calculable, blocked by missing tax-credit inputs, intentionally excluded from runtime totals, or unsupported by the available calculation package.",
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
"explanation": "The no-incentives scenario appears acceptable for a broad microgrid system because the ITC opportunity narrows the match to qualifying microgrid controllers and explicitly says not to apply the match to all microgrid infrastructure. The packet does not identify the proposed retrofit as a qualifying microgrid controller, so excluding the opportunity from the selected scenario is reasonable on the provided data.",
"recommendedRepair": "Keep ITC excluded for generic microgrid systems unless the retrofit scope is narrowed to a qualifying microgrid controller and a supported package can calculate the eligible portion.",
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
"explanation": "The selected no-incentives scenario is internally valid as the only listed scenario, but MACRS explicitly includes small wind turbine in its eligible retrofit categories. The packet provides no V2 package summary, alternative scenario, or exclusion reason explaining whether MACRS is non-calculable, intentionally excluded as depreciation/tax cost recovery, or blocked by taxpayer/depreciable-property requirements.",
"recommendedRepair": "Add a package disposition for MACRS on small wind, including whether depreciation benefits are outside first-year scenario totals or require missing tax-basis and taxpayer inputs.",
"needsMathVerificationLater": false
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
"explanation": "No-incentives selection appears correct. The Arizona solar and wind equipment sales tax exemption opportunity explicitly blocks standalone metering, monitoring, storage, and non-solar controls unless integral to a qualifying solar energy device. The selected retrofit is standalone submetering/energy monitoring, so the matched opportunity should not be included in an incentive scenario.",
"recommendedRepair": "Keep this opportunity excluded for standalone submetering/energy monitoring and consider correcting the match status or adding conflict metadata so it does not appear as an eligible standalone opportunity.",
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
"explanation": "The only matched opportunity is the federal ITC, and thermal energy storage is included in its eligible retrofit categories. The selected no-incentives scenario is the only listed scenario, but the packet provides no V2 package summary or alternative scenario explaining why ITC was not included or whether it is blocked by missing inputs.",
"recommendedRepair": "Add a V2 package summary for ITC on thermal energy storage showing calculation status, missing inputs, runtime inclusion status, and any stacking or tax-credit exclusion rationale.",
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
"explanation": "No-incentives selection appears appropriate for a generic window replacement. The Arizona property tax exemption opportunity explicitly says not to match generic window replacement unless the component independently meets the statutory energy-efficient building component standard. The packet does not establish that this window replacement meets that standard, and the incentive is property tax treatment rather than an upfront rebate.",
"recommendedRepair": "Keep this opportunity excluded from the default scenario unless the project is reclassified as qualifying energy-efficient building components with documented efficiency compliance and a supported property-tax calculation treatment.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 12,
"highSeverityCount": 0,
"mediumSeverityCount": 7,
"lowSeverityCount": 5,
"noIssueRetrofitCount": 0,
"dataGapRetrofitCount": 7
}
}

