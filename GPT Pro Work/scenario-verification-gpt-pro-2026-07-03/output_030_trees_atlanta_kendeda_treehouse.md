{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "trees-atlanta-kendeda-treehouse",
"testCaseOrdinal": 30,
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
"SOURCE_DSIRE:dsire_program_id:1952",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario is conservative, but the packet does not provide enough project detail to verify whether an incentive scenario should exist. ITC is narrowed to qualified biogas property rather than broad biomass, the Georgia biomass sales/use tax exemption is for qualifying biomass material used to produce energy for sale rather than equipment installation, REAP is a loan guarantee with rural/agricultural eligibility constraints, and MACRS depends on depreciable taxpayer-owned property. No V2 package summaries or alternative scenarios are present. ",
"recommendedRepair": "Split this retrofit into narrower biomass combustion, qualified biogas property, biomass material for sold energy production, and financing-only cases; collect project-type, produced-energy-sale, rural/agricultural, ownership, and taxpayer/elective-pay facts before constructing an incentive scenario.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22309"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Georgia Power Business EV Charger Plus appears compatible with the Georgia Power business site and has a positive V2 expected one-time rebate, but the package is marked not_user_facing_default and excluded from runtime totals with key inputs defaulted as placeholders, including charger_type, premises_or_service_account, and applicant_annual_total. The selected no-incentives scenario may be correct for current runtime rules, but the packet does not reliably establish whether a rebate scenario should be selected once real charger and cap inputs are known.",
"recommendedRepair": "Collect actual charger type, charger power, eligible project cost, premises/service-account identity, and applicant annual rebate total; then create a user-facing rebate scenario candidate if the package remains eligible.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The ITC opportunity explicitly includes ground_source_geothermal_heat_pump and includes nonprofit/tax-exempt elective-pay pathways. No V2 package summary or alternative scenario was constructed, so the selected no-incentives scenario omits a potentially compatible monetary opportunity. REAP and MACRS should not be automatically added from the packet because REAP is financing with rural/agricultural eligibility constraints and MACRS depends on depreciable taxpayer-owned property.",
"recommendedRepair": "Add a calculable ITC scenario candidate for qualifying ground-source geothermal heat pump projects, with gating inputs for qualified property status, ownership, placed-in-service timing, elective-pay eligibility, and applicable federal requirements.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The ITC opportunity explicitly includes battery_storage_system and appears compatible with a nonprofit via elective pay, but no V2 package or alternative ITC scenario exists. The C-PACE opportunity is financing rather than a rebate and should not be treated as upfront savings in this pass.",
"recommendedRepair": "Create an ITC scenario candidate for qualifying battery storage, gated by qualified-property, ownership, placed-in-service, elective-pay, and federal compliance inputs; keep C-PACE separate as financing rather than direct incentive savings.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The ITC opportunity explicitly includes combined_heat_and_power_system and includes nonprofit/tax-exempt elective-pay pathways, but the selected scenario is no incentives and there is no V2 package or alternative scenario for the ITC. MACRS is not clearly compatible with the nonprofit user profile because it is tax cost recovery for depreciable taxpayer-owned property.",
"recommendedRepair": "Add a calculable ITC scenario candidate for qualifying CHP property with eligibility gates for qualified property, ownership, placed-in-service date, elective-pay status, and federal compliance requirements.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"retrofitDisplayName": "Level 2 EV charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22309"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The Georgia Power Business EV Charger Plus opportunity explicitly supports Level 2 charger installation and the V2 package shows a positive expected rebate, but it is excluded from runtime totals as not_user_facing_default with placeholder defaulted inputs. Because no user-facing rebate scenario candidate is present, the selected no-incentives scenario cannot be verified as the best scenario from the packet alone.",
"recommendedRepair": "Replace placeholder charger and cap inputs with project-specific values and add a user-facing Level 2 rebate scenario if eligibility remains satisfied.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The ITC opportunity explicitly includes solar_water_heating_system and includes nonprofit/tax-exempt elective-pay pathways, but there is no V2 package or alternative scenario, leaving only the no-incentives scenario. MACRS is not clearly additive for this nonprofit user without taxpayer/depreciable-property facts.",
"recommendedRepair": "Add an ITC scenario candidate for qualifying solar water heating property, with gates for qualified property status, ownership, placed-in-service date, elective-pay eligibility, and federal compliance.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "thermal_energy_storage",
"retrofitDisplayName": "Thermal energy storage",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The ITC opportunity explicitly includes thermal_energy_storage and nonprofit/tax-exempt elective-pay pathways, but the selected scenario excludes all incentives and no V2 ITC package or alternative scenario is present. The TVA rebate should not be used for this Georgia Power site because its hard requirements require a TVA local power company or direct-served customer.",
"recommendedRepair": "Create an ITC scenario candidate for qualifying thermal energy storage and keep the TVA rebate excluded unless the utility/customer evidence changes.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "dc_fast_charger_installation",
"retrofitDisplayName": "DC fast charger installation",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22309"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The Georgia Power Business EV Charger Plus opportunity explicitly supports DC fast charger installation and the V2 package shows a positive expected rebate, but it is not included in runtime totals and relies on placeholder defaulted inputs. The no-incentives scenario is therefore conservative but not reliably verifiable as optimal from the packet alone.",
"recommendedRepair": "Collect charger type, charger power, eligible project cost, premises/service-account, and applicant annual cap inputs; then construct a DC fast charger rebate scenario candidate if eligibility remains satisfied.",
"needsMathVerificationLater": true
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
"explanation": "The ITC opportunity only supports microgrid_controller in the packet, while the retrofit is a broader microgrid system. The opportunity blockers state that a microgrid match should be limited to qualifying microgrid controllers, not all microgrid infrastructure. No V2 package or alternative scenario exists, and the packet does not identify whether the project includes a qualifying controller or its allocable cost.",
"recommendedRepair": "Separate microgrid controller from broader microgrid infrastructure, collect controller-specific scope and cost data, and create an ITC scenario only for the qualifying controller portion if supported.",
"needsMathVerificationLater": true
}
],
"summary": {
"retrofitsReviewed": 25,
"highSeverityCount": 0,
"mediumSeverityCount": 10,
"lowSeverityCount": 0,
"noIssueRetrofitCount": 15,
"dataGapRetrofitCount": 5
}
}

