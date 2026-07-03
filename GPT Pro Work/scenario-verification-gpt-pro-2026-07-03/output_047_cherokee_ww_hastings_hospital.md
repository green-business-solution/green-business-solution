{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "cherokee-ww-hastings-hospital",
"testCaseOrdinal": 47,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3639",
"SOURCE_DSIRE:dsire_program_id:1271"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid because no opportunity is included, but scenario optimality cannot be fully verified. OG&E has a V2 package with expected one-time savings but it is excluded from runtime totals as a low-confidence custom quote estimate using placeholder defaults, so exclusion is reasonable for runtime totals. Separately, 179D is matched to lighting only as part of a certified 179D project, but there is no calculable package or scenario candidate showing whether it should remain excluded. Citation: ",
"recommendedRepair": "Keep OG&E excluded from default runtime totals unless approved incentive and program-path inputs are available. Add explicit non-calculable or blocked-package metadata for 179D on LED lighting so scenario construction can distinguish intentional exclusion from missing calculation coverage.",
"needsMathVerificationLater": false
},
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
"explanation": "The no-incentives scenario is internally valid, but the packet lists three matched opportunities and no V2 package summaries or alternative scenarios. ITC may apply only to qualified biogas property, not broad biomass combustion. MACRS is tax cost recovery, and REAP is a loan guarantee with borrower eligibility requirements that may not fit a tribal healthcare campus. Because no scenario candidates or blocked-package reasons are supplied, the selected scenario cannot be reliably verified as optimal.",
"recommendedRepair": "Add explicit package status for each matched opportunity: unsupported, blocked by eligibility, custom quote, non-user-facing tax treatment, or calculable. For ITC, distinguish qualified biogas property from broad biomass before scenario generation.",
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
"SOURCE_DSIRE:dsire_program_id:2511"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected scenario contains no invalid stack, but the matched opportunities include ITC, MACRS, and REAP with no V2 package summaries or alternative calculable scenarios. ITC and MACRS appear category-compatible with ground-source geothermal heat pumps in the packet, while REAP has borrower restrictions. Missing package-status metadata blocks verification of whether no incentives is the correct selected scenario.",
"recommendedRepair": "Create explicit scenario-package records for ITC and MACRS, or mark them as non-user-facing/default-excluded with reasons. Mark REAP as blocked unless borrower eligibility and loan-guarantee treatment are confirmed.",
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
"SOURCE_DSIRE:dsire_program_id:3639",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives selection is acceptable for scenario-combination purposes. The packet states generic high-efficiency HVAC replacement is not supported under ITC or MACRS unless it independently qualifies as listed energy property, and the OG&E V2 package is excluded from runtime totals as a low-confidence custom quote estimate using placeholder defaults. There is no selected stack to invalidate.",
"recommendedRepair": "Keep ITC and MACRS out of the HVAC scenario unless a qualifying clean-energy property subtype is identified. Keep OG&E excluded from default totals until approved scope and approved incentive inputs are available.",
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
"explanation": "The selected no-incentives scenario is internally valid, but both ITC and MACRS list combined heat and power as eligible or potentially eligible categories in the packet. No V2 package summaries, blocked-package statuses, or alternative scenarios are supplied, so it is not possible to verify that excluding both opportunities is correct.",
"recommendedRepair": "Add calculable or explicitly blocked package records for ITC and MACRS for CHP. Include stacking metadata for whether ITC and MACRS can be modeled together or whether one affects the basis of the other.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22221"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid. The Oklahoma clean-burning fuel property credit is matched, but the packet says EV recharging property must be a metered-for-fee public access recharging system and private or workplace Level 2 EV charging should not be matched unless it qualifies as public access. The user profile does not state whether the charger would be public-access and metered-for-fee, and there is no V2 package or blocked-status record.",
"recommendedRepair": "Require a public-access and metered-for-fee input before including this opportunity in any EV-charger scenario. Otherwise mark the opportunity as blocked or non-calculable for this retrofit.",
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
"explanation": "The no-incentives scenario has no internal stacking issue, but ITC and MACRS both list solar water heating or clean energy property categories in the packet. No package summaries, exclusion reasons, or alternative scenarios are supplied, so RetroFi's choice to select no incentives cannot be fully verified.",
"recommendedRepair": "Add package-status metadata for ITC and MACRS on solar water heating, including whether each is calculable, default-excluded, blocked, or additive with basis-adjustment handling.",
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
"explanation": "The selected scenario is internally valid but potentially incomplete. The only matched opportunity is ITC, and the packet lists battery storage as an eligible ITC category. No V2 package summary, exclusion reason, or alternative incentive scenario is provided, so there is insufficient scenario-construction data to confirm no incentives is the correct selection.",
"recommendedRepair": "Add an ITC battery-storage package record with calculable or blocked status. If it is intentionally not user-facing by default, record that explicitly so selected-scenario verification can pass.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "building_benchmarking_compliance",
"retrofitDisplayName": "Building benchmarking compliance",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3639"
],
"affectedScenarioIds": [],
"explanation": "No scenario is present because this is non-physical and unsupported without modeled savings. The packet also says OG&E benchmarking is a support or analysis feature, not a physical retrofit or compliance mandate. Excluding it from a calculable scenario is appropriate.",
"recommendedRepair": "No scenario-combination repair needed. Continue treating benchmarking as support/process value unless a modeled savings result or applicable rebate path is provided.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "energy_audit",
"retrofitDisplayName": "Energy audit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3534"
],
"affectedScenarioIds": [],
"explanation": "No scenario is present because this is non-physical and unsupported without modeled savings. The C-PACE opportunity itself says standalone energy audits are not the financing purpose and C-PACE should not be treated as a rebate. Exclusion from a calculable incentive scenario is appropriate.",
"recommendedRepair": "No scenario-combination repair needed for a standalone audit. Link C-PACE only to qualifying permanent improvements, not the audit task itself.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "fuel_cell_system",
"retrofitDisplayName": "Fuel cell system",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22221"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is appropriate for the matched opportunity in the packet. The Oklahoma credit explicitly blocks stationary building fuel-cell systems and says hydrogen fuel cell appears as vehicle fuel technology, not stationary generation. No compatible calculable opportunity is shown for this retrofit.",
"recommendedRepair": "Remove or suppress this opportunity match for stationary fuel-cell-system retrofits, or remap it only to vehicle fuel infrastructure and clean-transportation contexts.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"retrofitDisplayName": "High-efficiency refrigeration equipment",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3639"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives selected scenario is acceptable for runtime scenario construction. The only matched opportunity, OG&E, has a V2 package with expected one-time savings, but it is explicitly excluded from runtime totals as a low-confidence custom quote estimate using placeholder defaults. No stacking issue or better calculable alternative is shown.",
"recommendedRepair": "Keep the OG&E refrigeration package excluded from default scenario totals until program path, approved scope, and approved incentive are provided.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"retrofitDisplayName": "Level 2 EV charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22221"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is internally valid, but eligibility for the matched Oklahoma credit depends on the Level 2 charger being a qualified public-access metered-for-fee recharging system. The packet does not provide that project-use input and does not provide a V2 package or explicit blocked status, so the exclusion cannot be fully verified from scenario data alone.",
"recommendedRepair": "Add required project-use inputs for public access and fee metering. Generate an incentive scenario only when those requirements are satisfied; otherwise mark the opportunity blocked for private or workplace Level 2 charging.",
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
"explanation": "The selected scenario has no invalid included stack, but the only matched opportunity, ITC, is limited to qualifying microgrid controllers rather than all microgrid infrastructure. The packet does not state whether this retrofit is a qualifying controller-only scope or a broader microgrid system, and no V2 package or blocked-status record is included.",
"recommendedRepair": "Split microgrid controller from broader microgrid infrastructure in scenario construction. Include ITC only for a qualifying controller scope, or mark it blocked/non-calculable for general microgrid systems.",
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
"explanation": "The no-incentives scenario is internally valid, but the matched MACRS opportunity lists small wind turbine as an eligible category. No V2 package summary, alternative scenario, or explicit default-exclusion reason is present, so it is not possible to verify that no incentives should be selected.",
"recommendedRepair": "Add a MACRS package status for small wind, including whether it is non-user-facing tax cost recovery, calculable, or blocked for this applicant/property profile.",
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
"explanation": "The selected no-incentives scenario contains no invalid stack, but ITC lists thermal energy storage as an eligible category in the packet. No V2 package summary, blocked reason, or alternative scenario is supplied, so scenario optimality cannot be verified.",
"recommendedRepair": "Add an ITC package record for thermal energy storage with calculable, blocked, or default-excluded status and any required inputs.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 16,
"highSeverityCount": 0,
"mediumSeverityCount": 11,
"lowSeverityCount": 5,
"noIssueRetrofitCount": 0,
"dataGapRetrofitCount": 11
}
}

