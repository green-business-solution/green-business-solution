{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "ocracoke-school-island",
"testCaseOrdinal": 49,
"overallAssessment": "issues_found",
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
"explanation": "Selected no-incentives scenario is internally valid because no calculable package or runtime rule is present for either matched opportunity. REAP is identified as a loan guarantee and explicitly says loan guarantees should not be treated as rebate incentives; MACRS is tax cost recovery and not a rebate, grant, or direct incentive. No alternative scenario is listed in the packet. Source packet: ",
"recommendedRepair": "No scenario-combination repair needed in this pass. Eligibility and tax usability for REAP/MACRS may be handled in matching or later incentive valuation logic, not scenario stacking.",
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
"explanation": "Selected no-incentives scenario is internally valid because no calculable package or runtime rule is present. The matched REAP opportunity is a loan guarantee and the matched MACRS opportunity is tax cost recovery, both of which the packet flags as not rebate or direct incentive value. No compatible calculable additive opportunity or better alternative scenario is provided.",
"recommendedRepair": "No scenario-combination repair needed. Keep these matched opportunities outside runtime totals unless a future package can value them appropriately and with user-specific eligibility.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3351"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario contains no incentives, and no calculable package is present. However, the packet marks the South River EMC solar water heating rebate as eligible even though its hard requirements say the member must receive electric service from South River EMC in the home where the unit is installed, while this user is a Tideland EMC public school. The packet also lists eligible sectors/applicant types as residential homeowner/residential_member, which conflicts with the government education-campus profile. Because this opportunity appears matched on bad opportunity/matching data, it cannot be reliably considered as a compatible additive scenario candidate.",
"recommendedRepair": "Correct the opportunity match so the South River EMC residential member rebate is excluded for a Tideland EMC government school, or add explicit conflict metadata showing the utility/customer-sector mismatch blocks scenario inclusion.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "air_sealing_weatherization",
"retrofitDisplayName": "Air sealing / weatherization",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5712"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is appropriate for scenario construction. LIHEAP is matched but the packet states it is not a commercial or institutional retrofit program and its V2 package has no calculable value, low confidence, placeholder defaults, and required local/grantee inputs. There is no listed calculable alternative scenario that should replace the selected no-incentives scenario.",
"recommendedRepair": "No scenario-combination repair needed. Consider moving LIHEAP exclusion earlier in matching for a public school, but runtime scenario exclusion is correct based on the packet.",
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
"explanation": "Selected no-incentives scenario is internally valid because MACRS is the only matched opportunity, no calculation package or runtime rule is listed, and the packet characterizes MACRS as tax cost recovery rather than a rebate, grant, or direct incentive. No alternative scenario is available in the packet.",
"recommendedRepair": "No scenario-combination repair needed. Add a future non-cash/tax-benefit treatment only if RetroFi wants to model tax cost recovery separately from direct incentives.",
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
"explanation": "The selected scenario correctly excludes MACRS from incentive totals for this retrofit. The packet explicitly says generic ordinary HVAC replacement is not specially supported by the clean-energy MACRS categories for this opportunity, and no calculable package exists.",
"recommendedRepair": "No scenario-combination repair needed. Consider preventing this MACRS match for ordinary HVAC replacement upstream, or preserve it only as non-user-facing tax-context information.",
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
"explanation": "The selected scenario correctly excludes MACRS from incentive totals for LED lighting. The packet explicitly says generic LED lighting is not specially supported by the clean-energy MACRS categories for this opportunity, and no calculable package exists.",
"recommendedRepair": "No scenario-combination repair needed. Consider removing or suppressing this matched opportunity upstream for generic LED lighting.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "rooftop_solar_pv",
"retrofitDisplayName": "Rooftop solar PV",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3036"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid for this pass because the only matched opportunity is a property tax exclusion, not a rebate, and no calculation package or alternative scenario is provided. The packet does not provide enough scenario-level value metadata to say the property tax exclusion should have been included as a first-year incentive.",
"recommendedRepair": "No scenario-combination repair needed. If property tax exclusions are intended to appear in user-facing recurring or one-time benefits, add a calculable package and stacking metadata in a future repair.",
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
"explanation": "Selected no-incentives scenario is internally valid because MACRS is the only matched opportunity, has no calculable package or runtime rule, and is characterized as tax cost recovery rather than a rebate, grant, or direct incentive. No alternative scenario is listed.",
"recommendedRepair": "No scenario-combination repair needed. Model MACRS separately only if tax cost recovery is intended to be represented in scenario totals.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 9,
"highSeverityCount": 0,
"mediumSeverityCount": 1,
"lowSeverityCount": 8,
"noIssueRetrofitCount": 8,
"dataGapRetrofitCount": 1
}
}

