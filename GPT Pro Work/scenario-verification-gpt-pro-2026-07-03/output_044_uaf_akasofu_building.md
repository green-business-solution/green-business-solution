{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "uaf-akasofu-building",
"testCaseOrdinal": 44,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3080"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because no incentive opportunity is included, so there is no stack conflict or double count. However, the matched Renewable Energy Grant Program appears technology-compatible for biomass/biogas and is a grant rather than a loan or tax cost-recovery item. The packet says its availability is uncertain because the latest identified round deadline passed, and there is no V2 package summary explaining whether it was intentionally suppressed, blocked by missing inputs, or unsupported. This prevents reliable verification that no-incentives is the right selected combination. ",
"recommendedRepair": "Add calculation-package or suppression metadata for the Renewable Energy Grant Program showing whether the grant should be excluded due to closed intake/uncertain availability, missing award inputs, low confidence, or non-user-facing status.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3080"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario has no internal stack issue because it includes no opportunities. However, the matched Renewable Energy Grant Program explicitly lists ground-source geothermal heat pump as an eligible category and is a grant-type opportunity. The packet also marks its availability as uncertain because the most recent identified application deadline passed, but provides no V2 package summary explaining why no grant scenario was created. This is a scenario-decision data gap rather than a confirmed missing incentive.",
"recommendedRepair": "Add package-level handling for the Renewable Energy Grant Program for geothermal heat pumps, including whether the closed/uncertain solicitation blocks runtime inclusion or whether missing award/application inputs prevent a calculable scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22666"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is appropriate for this pass. The only matched opportunity, Alaska NEVI, has a V2 package summary marked low confidence and not included in runtime totals, with a missing conditional award amount and multiple placeholder/defaulted inputs. The opportunity is also limited to public EV charging infrastructure and current-round/site-award verification. Excluding it from the selected runtime scenario avoids treating an uncertain competitive grant as a definite incentive.",
"recommendedRepair": "Keep Alaska NEVI excluded from default totals unless current solicitation, site selection/application status, eligible cost, match, compliance, and approved award inputs are available with sufficient confidence.",
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
"explanation": "The selected no-incentives scenario is valid. The only matched opportunity is MACRS, but the packet's own blocker says generic LED lighting is not specially supported under the clean-energy MACRS categories for this opportunity. Excluding it avoids using an overbroad tax-cost-recovery match as an incentive scenario.",
"recommendedRepair": "Keep MACRS out of LED lighting scenarios unless separate opportunity data establishes a qualifying depreciable clean-energy category or other user-facing tax treatment.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "air_sealing_weatherization",
"retrofitDisplayName": "Air sealing / weatherization",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5712"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is appropriate. LIHEAP is residential/low-income household assistance, not a commercial or institutional retrofit program for this public university research building. Its V2 package summary also shows no calculable value and no runtime inclusion. Excluding it from the scenario avoids an invalid institutional-building incentive.",
"recommendedRepair": "Do not include LIHEAP in this retrofit's runtime scenarios for this user profile; consider correcting the match so LIHEAP is not eligible for public university building weatherization.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:115"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is valid. The only matched opportunity is the Power Project Loan Fund, which the packet characterizes as a loan for qualifying electric power facilities and explicitly says not to match standalone customer battery storage systems. Excluding it from a customer battery-storage incentive scenario is the correct scenario-combination outcome.",
"recommendedRepair": "Keep this opportunity excluded from standalone battery-storage scenarios unless the project is represented as a qualifying electric power facility or utility-scale infrastructure project.",
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
"explanation": "No scenario-combination issue found. The only matched opportunity is MACRS, which is tax cost recovery rather than a rebate, grant, or direct incentive. No V2 calculable package or alternative scenario is provided, so the no-incentives selected scenario is internally valid and does not omit a clearly calculable additive incentive based on the packet.",
"recommendedRepair": "No scenario-combination repair needed in this pass.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "energy_audit",
"retrofitDisplayName": "Energy audit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4448"
],
"affectedScenarioIds": [],
"explanation": "No scenario-combination issue found. This retrofit is non-physical and unsupported for savings calculation, so no selected scenario exists. The matched Energy Efficiency Revolving Loan Fund requires an investment-grade audit as a dependency for loan-financed improvements, but the packet states it is not a separate open-ended audit grant. The absence of a calculable incentive scenario is therefore reasonable for this pass.",
"recommendedRepair": "No scenario-combination repair needed; preserve this as an audit/planning dependency rather than a standalone incentive scenario unless a separate calculable audit funding rule is added.",
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
"explanation": "The selected no-incentives scenario is valid. The only matched opportunity is MACRS, and the packet's own blocker says ordinary HVAC replacement is not specially supported under the clean-energy MACRS categories for this opportunity. Excluding it avoids using an overbroad tax-cost-recovery match as a retrofit incentive.",
"recommendedRepair": "Keep MACRS out of ordinary HVAC replacement scenarios unless the opportunity data is narrowed to a qualifying clean-energy property type that applies to the actual equipment.",
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
"explanation": "No scenario-combination issue found. The only matched opportunity is MACRS, which is tax cost recovery rather than a direct rebate or grant. The packet provides no V2 calculable package and no alternative scenario. The selected no-incentives scenario is internally valid and does not double-count or incorrectly stack incentives.",
"recommendedRepair": "No scenario-combination repair needed in this pass.",
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
"explanation": "No scenario-combination issue found. The only matched opportunity is MACRS, which is tax cost recovery rather than a direct incentive, and the packet provides no calculable V2 package or alternative scenario. The selected no-incentives scenario is internally valid and has no stack or overlap problem.",
"recommendedRepair": "No scenario-combination repair needed in this pass.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 11,
"highSeverityCount": 0,
"mediumSeverityCount": 2,
"lowSeverityCount": 9,
"noIssueRetrofitCount": 4,
"dataGapRetrofitCount": 2
}
}

