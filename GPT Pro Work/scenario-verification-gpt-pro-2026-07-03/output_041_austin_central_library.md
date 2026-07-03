{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "austin-central-library",
"testCaseOrdinal": 41,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is scenario-combination valid. REAP is a loan guarantee and its own blockers say loan guarantees should not be treated as rebate incentives; its hard requirements are agricultural producer or rural small business, while the packet user is a municipal public library/government profile. MACRS is tax cost recovery, not a rebate, grant, or direct incentive, and requires depreciable property owned by a taxpayer. No alternative incentive scenario is listed, so there is no selected-not-optimal issue. Source packet citation: ",
"recommendedRepair": "Keep both opportunities out of the calculated incentive scenario. Consider downgrading or suppressing them for this municipal public library profile if the matcher is expected to enforce applicant/taxpayer eligibility before scenario construction.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is scenario-combination valid. REAP is described as a loan guarantee and should not be treated as a rebate incentive; the borrower requirements do not match the municipal government/library profile. MACRS is tax cost recovery rather than a direct incentive and requires taxpayer-owned depreciable property. No calculable package or alternative scenario is present.",
"recommendedRepair": "Keep REAP and MACRS excluded from the calculated incentive scenario. Improve upstream eligibility/suppression handling so these are not treated as normal additive incentive candidates for this user profile.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2011",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is scenario-combination valid. Austin Energy Home Energy Savings has hard requirements for Austin Energy electric service at residential rates and residential/small multifamily applicant categories, which do not fit the municipal public institutional library profile. MACRS blockers state generic ordinary HVAC replacement is not specially supported and that MACRS is tax cost recovery rather than a direct incentive.",
"recommendedRepair": "Keep these opportunities excluded from calculated scenarios for this retrofit. Repair matching metadata so the residential Austin Energy program and generic-HVAC MACRS match are not surfaced as eligible calculated incentive candidates for this profile.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "air_sealing_weatherization",
"retrofitDisplayName": "Air sealing / weatherization",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2011"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is scenario-combination valid. The only matched opportunity, Austin Energy Home Energy Savings, requires residential-rate service and residential/small multifamily eligibility. The packet user is a government-owned public institutional library, so the excluded opportunity should not be included in a calculated scenario.",
"recommendedRepair": "Keep the opportunity excluded. Tighten opportunity matching so this residential program is not marked eligible for municipal public institutional sites.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "automated_demand_response_controls",
"retrofitDisplayName": "Automated demand response controls",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2011"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is reasonable for the listed Austin Energy Home Energy Savings opportunity because that program is residential/small multifamily and its blockers say demand response and Power Partner Thermostats are separate program boundaries. However, this creates a scenario-verification data gap: the matched opportunity itself points to a separate demand-response boundary, but no separate Austin Energy demand-response opportunity or scenario candidate is included in the packet. Using only the packet, it cannot be verified whether a compatible commercial/municipal demand-response incentive was omitted.",
"recommendedRepair": "Keep Austin Energy Home Energy Savings excluded, but add or evaluate the separate demand-response opportunity metadata/package for commercial or municipal customers if it exists in RetroFi's opportunity database. Mark the current scenario decision as not fully reliable until the separate program boundary is represented or explicitly ruled out.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is scenario-combination valid. The only matched opportunity is MACRS, which is tax cost recovery, not a rebate, grant, or direct incentive, and requires depreciable property owned by the taxpayer. No calculable package or competing scenario is provided.",
"recommendedRepair": "Keep MACRS excluded from direct calculated incentive scenarios unless RetroFi intentionally models tax cost recovery for eligible tax-paying owners. For this municipal profile, maintain suppression or require human/tax review.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"retrofitDisplayName": "Duct sealing and duct insulation",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2011"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is scenario-combination valid. Austin Energy Home Energy Savings is restricted by hard requirements to residential-rate service and residential/small multifamily contexts. The municipal public library profile does not support adding this opportunity.",
"recommendedRepair": "Keep the residential Austin Energy opportunity excluded. Repair eligibility metadata to prevent this type of nonresidential false-positive match.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2011"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is scenario-combination valid. The only matched opportunity is Austin Energy Home Energy Savings, which requires residential-rate service and residential/small multifamily eligibility, not a municipal public institutional library profile.",
"recommendedRepair": "Keep the opportunity excluded from the calculated scenario. Improve applicant and site-type gating before scenario construction.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_water_heater",
"retrofitDisplayName": "Heat pump water heater",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2011"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is scenario-combination valid for the matched opportunity. The Austin Energy Home Energy Savings blockers explicitly say heat-pump water heater rebates are a separate residential appliance and equipment program, not this Home Energy Savings opportunity. The listed opportunity should not be included in this scenario.",
"recommendedRepair": "Keep Home Energy Savings excluded. If RetroFi has a separate heat-pump-water-heater program, represent it separately with its own eligibility and package metadata rather than using this opportunity.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2011"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is scenario-combination valid. Austin Energy Home Energy Savings blockers state commercial refrigeration and other commercial categories are not supported, and the hard requirements point to residential-rate/residential program eligibility.",
"recommendedRepair": "Keep this opportunity excluded. Correct retrofit-category matching so the residential Home Energy Savings opportunity does not match commercial refrigeration retrofits.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2011"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is scenario-combination valid. Austin Energy Home Energy Savings supports insulation-like residential upgrades but requires residential-rate service and residential/small multifamily eligibility, while the packet user is a municipal public library.",
"recommendedRepair": "Keep the opportunity excluded. Improve eligibility filters for residential-rate and residential/small multifamily requirements.",
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
"explanation": "Selected no-incentives scenario is scenario-combination valid. MACRS blockers explicitly say generic LED lighting is not a specially supported clean-energy MACRS category for this opportunity, and the program is tax cost recovery rather than a direct incentive.",
"recommendedRepair": "Keep MACRS excluded for generic LED lighting. Prevent the legacy broad lighting technology tag from producing an eligible calculated scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is scenario-combination valid. MACRS appears technology-compatible for small wind in the opportunity category list, but it is tax cost recovery rather than a rebate, grant, or direct incentive and requires taxpayer-owned depreciable property. No calculable package or alternative scenario is supplied.",
"recommendedRepair": "Keep MACRS out of direct incentive scenarios unless RetroFi separately models tax cost recovery with taxpayer eligibility checks. For this municipal user, require suppression or human/tax review.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"retrofitDisplayName": "Smart thermostat / zoning retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2011"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is valid with respect to the listed Austin Energy Home Energy Savings opportunity because that opportunity requires residential-rate/residential eligibility. But the same opportunity blockers identify Demand Response and Power Partner Thermostats as separate program boundaries. Since this retrofit is smart thermostat/zoning controls and no separate thermostat/demand-response opportunity candidate is included, the packet does not provide enough data to verify whether a compatible additive opportunity was omitted.",
"recommendedRepair": "Do not include Home Energy Savings in the scenario. Add or explicitly evaluate the separate Power Partner Thermostats or demand-response opportunity metadata/package for this customer type if present in the database; otherwise mark the no-incentive result as based on incomplete opportunity coverage.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is scenario-combination valid. MACRS lists solar water heating as an eligible retrofit category, but it is tax cost recovery, not a direct incentive, and eligibility depends on taxpayer-owned depreciable property and IRS requirements. No calculable package or alternative scenario is supplied.",
"recommendedRepair": "Keep MACRS excluded from direct incentive scenario construction unless RetroFi has a separate tax-cost-recovery scenario path with taxpayer eligibility validation.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "window_replacement",
"retrofitDisplayName": "Window replacement",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2011"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is scenario-combination valid. The Austin Energy Home Energy Savings blockers explicitly state there are no new window rebates in this program, and the program is residential-rate/residential rather than municipal public institutional.",
"recommendedRepair": "Keep the opportunity excluded. Remove or suppress window replacement from this opportunity's matched retrofit set for scenario construction.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 16,
"highSeverityCount": 0,
"mediumSeverityCount": 2,
"lowSeverityCount": 14,
"noIssueRetrofitCount": 0,
"dataGapRetrofitCount": 2
}
}

