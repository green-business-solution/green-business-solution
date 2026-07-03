{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "northgate-market-anaheim",
"testCaseOrdinal": 4,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1615",
"SOURCE_DSIRE:dsire_program_id:22275",
"SOURCE_DSIRE:dsire_program_id:22277",
"SOURCE_DSIRE:dsire_program_id:22629",
"SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
"SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because every calculable or estimated EV package is suppressed from runtime totals, low confidence, not user-facing by default, or no calculable value. However, the packet does not provide an alternative scenario or explicit stacking/conflict metadata for the several EV opportunities that could represent mutually exclusive lanes: private Level 2, fleet charger, public/shared APU EV charger, NEVI/DC fast charging, and school-bus charging. Several matched opportunities also have project-scope blockers, so the packet does not support a reliable affirmative decision about which EV incentive combination should be user-facing. ",
"recommendedRepair": "Add EV-specific scenario eligibility metadata that separates private Level 2, fleet, public DCFC/NEVI, and school-bus charging scopes; encode conflicts between mutually exclusive EV program lanes; keep low-confidence grant and non-user-facing default packages out of selected runtime totals unless the project scope and required inputs support them.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No scenario-combination issue is visible. Although federal ITC, REAP loan guarantee, PACE financing, and MACRS opportunities matched, the packet lists no V2 calculation packages for this retrofit and no alternative scenarios. The no-incentives scenario therefore does not appear to omit a currently includable calculated incentive.",
"recommendedRepair": "No scenario repair needed in this pass. A separate package-building pass may decide whether tax-credit, depreciation, loan-guarantee, or financing scenarios should be modeled.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1615",
"SOURCE_DSIRE:dsire_program_id:22067"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is defensible only because the two repaired packages are excluded from runtime totals: Anaheim Public Utilities is not user-facing by default and Plumas-Sierra is blocked by source-inaccessible repair failure. The packet shows a positive expected one-time Anaheim value but suppresses it, so the selected scenario cannot be verified as optimal without policy metadata explaining whether not-user-facing default packages should remain excluded from all selected scenarios or appear as non-default alternatives.",
"recommendedRepair": "Add explicit scenario policy for not_user_facing_default packages and, if appropriate, generate a separate non-default Anaheim rebate scenario while keeping Plumas-Sierra excluded unless the source and utility eligibility are repaired.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1615",
"SOURCE_DSIRE:dsire_program_id:1625",
"SOURCE_DSIRE:dsire_program_id:22067",
"SOURCE_DSIRE:dsire_program_id:1271"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario avoids double-counting and does not include any invalid stack. However, the packet includes a positive Anaheim Public Utilities lighting rebate package marked not_user_facing_default, a small-business direct-install workflow with non-cash value, a Plumas-Sierra package blocked by source access, and a 179D tax deduction match that is valid only under certified project rules. There is not enough scenario-policy metadata to determine whether the Anaheim rebate should remain excluded, be shown as a separate non-default alternative, or stack with the direct-install workflow or 179D pathway.",
"recommendedRepair": "Clarify whether not_user_facing_default rebates should create alternative scenarios; add stacking metadata between Anaheim commercial rebates, the small-business direct-install workflow, and federal 179D; keep Plumas-Sierra excluded unless source and utility eligibility are repaired.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22615"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario is appropriate for the only V2 package shown. Marin Clean Energy Feed-In Tariff Plus is described as a wholesale renewable generation procurement program where storage is only valid as paired storage for solar projects, not a standalone battery storage rebate. Its package is also not_user_facing_default and contributes zero runtime value.",
"recommendedRepair": "Keep this opportunity excluded for standalone battery storage scenarios unless the retrofit is reframed as a qualifying wholesale solar-plus-storage generation project.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22615"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is reasonable for the only V2 package shown because the MCE Feed-In Tariff Plus package is not_user_facing_default and has zero value. The opportunity is a wholesale power procurement tariff, not a direct rebate or ordinary onsite retrofit incentive. No alternative scenario is provided.",
"recommendedRepair": "Keep the MCE tariff out of selected onsite retrofit totals unless the project is explicitly modeled as a qualifying 1 MW to 5 MW wholesale renewable generation project.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"retrofitDisplayName": "Level 2 EV charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1615",
"SOURCE_DSIRE:dsire_program_id:22275",
"SOURCE_DSIRE:dsire_program_id:22277"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because none of the three Level 2 EV packages is included in runtime totals. But scenario verification is blocked by missing conflict metadata among Anaheim's private Level 2 rebate, fleet charger rebate, and commercial public/shared EV charger pathway. These appear to be different EV use cases and should not be freely stacked unless the same installation can satisfy all program-specific requirements, which the packet does not establish.",
"recommendedRepair": "Add conflict rules and project-scope selectors for private/business Level 2, fleet charging, and public/shared charging. Generate only the scenario matching the confirmed EV use case, or show mutually exclusive alternatives when scope is unresolved.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No scenario-combination issue is visible. The matched ITC and MACRS opportunities have no V2 package summaries and no scenario candidates in the packet, so there is no calculable additive scenario to compare against the selected no-incentives scenario.",
"recommendedRepair": "No scenario repair needed in this pass. Tax credit and depreciation package creation can be handled separately.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No scenario-combination issue is visible. The matched ITC and MACRS opportunities have no calculable V2 package summaries and no listed alternative scenarios, so the selected no-incentives scenario cannot be displaced in this packet.",
"recommendedRepair": "No scenario repair needed in this pass. Add tax-credit or depreciation scenario packages only after separate package validation.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"retrofitDisplayName": "Heat pump HVAC retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1615",
"SOURCE_DSIRE:dsire_program_id:22067"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid only because both available packages are excluded from runtime totals. Anaheim has a positive expected one-time value but is not_user_facing_default; Plumas-Sierra is source-inaccessible and should remain excluded. The packet does not say whether Anaheim's suppressed package should generate a non-default alternative scenario, so optimal scenario selection cannot be reliably verified.",
"recommendedRepair": "Clarify scenario-generation rules for not_user_facing_default Anaheim commercial rebate packages. Keep Plumas-Sierra excluded unless the source and utility/customer eligibility are repaired.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "cooling_tower_controls_optimization",
"retrofitDisplayName": "Cooling tower controls / optimization",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1615"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario excludes the only matched Anaheim package, which has a positive expected one-time value but is marked not_user_facing_default. The opportunity text says cooling tower controls are eligible only where supported as a custom electric-savings project or separate water-efficiency pathway, and the V2 package relies on placeholder/defaulted inputs. This blocks a reliable scenario decision.",
"recommendedRepair": "Require custom-measure eligibility inputs and preapproval status before creating a selected incentive scenario; otherwise keep no-incentives selected and optionally show a non-default review-required Anaheim custom scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "dc_fast_charger_installation",
"retrofitDisplayName": "DC fast charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1615"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because the only APU commercial rebate package is not_user_facing_default. However, the package shows a positive expected one-time value and the opportunity text flags inconsistent public EV charger rebate amount and cap language plus a need for current reservation or agreement confirmation. The packet therefore does not support selecting an APU DC fast charger scenario, but it also does not establish whether a non-default alternative should be shown.",
"recommendedRepair": "Keep no-incentives selected until current APU public EV charger reservation/agreement terms and public/shared access inputs are confirmed; add a review-required alternative if RetroFi wants suppressed public EV charger packages surfaced.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "energy_audit",
"retrofitDisplayName": "Energy audit",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": null,
"affectedOpportunityIds": [],
"affectedScenarioIds": [],
"explanation": "No scenario-combination issue is visible. This retrofit is non-physical and unsupported for savings/scenario calculation in the packet, with no scenario candidates to validate.",
"recommendedRepair": "No scenario repair needed. Keep audit and assessment services outside physical retrofit incentive scenarios unless a modeled savings or service-value package is added.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "heat_pump_water_heater",
"retrofitDisplayName": "Heat pump water heater",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22067"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario is appropriate because the only package is blocked by source_inaccessible_repair_failure, has low confidence, and is not included in runtime totals. The packet also indicates the applicant must be a Plumas-Sierra customer, while the user utility is Anaheim Public Utilities.",
"recommendedRepair": "Keep Plumas-Sierra excluded for this Anaheim site unless utility/service-territory eligibility and the current rebate form are repaired.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1615"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario excludes the only package, which has a positive expected one-time Anaheim value but is not_user_facing_default. The opportunity text says refrigeration is supported through custom incentives or small-business refrigeration enhancements rather than a broad prescriptive rebate. Without custom-project eligibility, savings/preapproval, and stacking metadata, the packet does not prove the Anaheim value should be selected.",
"recommendedRepair": "Require refrigeration custom-measure inputs and preapproval status before including the Anaheim package in a selected scenario; otherwise keep no-incentives selected and optionally surface it as a review-required alternative.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No scenario-combination issue is visible. The only matched opportunity is PACE financing, and no V2 calculation package or alternative financing scenario is provided. The selected no-incentives scenario therefore does not exclude a calculable direct incentive in this packet.",
"recommendedRepair": "No scenario repair needed in this pass. Add a separate financing scenario only if RetroFi chooses to model PACE as a financing product rather than an incentive benefit.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "leed_certification",
"retrofitDisplayName": "LEED certification",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4790"
],
"affectedScenarioIds": [],
"explanation": "No scenario should be created from the matched San Diego sustainable building expedited permit program for this Anaheim project. The packet says the current private SBEP source supports CALGreen-based compliance, not a general LEED certification match, and the user site is in Anaheim rather than San Diego.",
"recommendedRepair": "Keep this opportunity out of LEED certification scenarios for this test case; repair matching geography and category mapping separately.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"retrofitDisplayName": "Lighting controls retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1615"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because the only package is not_user_facing_default. But the package has a positive expected one-time Anaheim value and the matched opportunity appears category-compatible for lighting controls. The packet lacks policy metadata explaining whether this suppressed package should remain excluded or be offered as a non-default incentive scenario.",
"recommendedRepair": "Clarify not_user_facing_default scenario behavior for Anaheim commercial lighting controls. If such packages should be scenario candidates, create an Anaheim rebate alternative rather than selecting only no incentives.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "microgrid_system",
"retrofitDisplayName": "Microgrid system",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No scenario-combination issue is visible. The only matched opportunity is the federal ITC, but no V2 package summary or alternative scenario is present. The opportunity text also narrows support to microgrid controllers rather than all microgrid infrastructure, so no additive scenario should be inferred from this packet alone.",
"recommendedRepair": "No scenario repair needed in this pass. Add a tax-credit package only if the retrofit is specifically a qualifying microgrid controller and required tax-credit inputs are available.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No scenario-combination issue is visible. The only matched opportunity is MACRS, and the packet provides no V2 calculation package or alternative scenario. The selected no-incentives scenario therefore does not omit a calculable scenario candidate in this packet.",
"recommendedRepair": "No scenario repair needed in this pass. Model depreciation separately if RetroFi supports tax-cost-recovery scenarios.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "thermal_energy_storage",
"retrofitDisplayName": "Thermal energy storage",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "No scenario-combination issue is visible. The federal ITC match has no V2 package summary and no alternative scenario in the packet, so there is no currently calculable additive incentive to compare against no incentives.",
"recommendedRepair": "No scenario repair needed in this pass. Add a tax-credit package only after confirming the property qualifies and the required tax inputs are available.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"retrofitDisplayName": "Variable frequency drive retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:1615"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because the only package is not_user_facing_default. The matched Anaheim opportunity appears to support custom measures including VFDs and the package has a positive expected one-time value, but the packet does not provide enough scenario-policy metadata to decide whether the suppressed package should be included, excluded, or shown as an alternative.",
"recommendedRepair": "Clarify not_user_facing_default handling for Anaheim custom/VFD packages; require measure type, kWh/kw savings, eligible cost, and preapproval inputs before selecting an incentive scenario.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 22,
"highSeverityCount": 0,
"mediumSeverityCount": 10,
"lowSeverityCount": 12,
"noIssueRetrofitCount": 7,
"dataGapRetrofitCount": 10
}
}

