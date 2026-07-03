{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "seghesio-healdsburg-winery",
"testCaseOrdinal": 10,
"overallAssessment": "issues_found",
"findings": [
{
"retrofitTypeId": "ev_charger_installation",
"retrofitDisplayName": "EV charger installation",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22629",
"SOURCE_DSIRE:dsire_program_id:22278",
"SOURCE_DSIRE:dsire_program_id:22149"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is internally valid. No opportunity is included, so there is no stacking or duplicate-counting issue. The Azusa package is not user-facing by default and has residential/Azusa-account constraints; NEVI is low confidence and competitive; Clean Transportation Program needs repair review. No listed compatible, runtime-includable alternative scenario is available in the packet. ",
"recommendedRepair": "No scenario-combination repair. Keep suppressed packages out of runtime totals unless eligibility, user-facing status, and missing solicitation inputs are repaired.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"retrofitDisplayName": "Biomass / biogas energy system",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentives scenario is stack-valid as selected, but MACRS is matched and lists biomass_biogas_energy_system as an eligible category while no V2 package or scenario candidate exists for it. REAP and USDA 5313 are loan guarantees and MCE FIT is suppressed/not user-facing by default, so they do not create a clear additive runtime scenario from the packet alone.",
"recommendedRepair": "Add or explicitly suppress a MACRS calculation package for biomass/biogas, including tax-basis inputs and stack metadata. Do not include loan guarantees or MCE FIT as cash savings unless a user-facing value model is intentionally supported.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"retrofitDisplayName": "Ground-source / geothermal heat pump",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected empty scenario avoids invalid stacking, but REAP and MACRS are source-backed matched opportunities for geothermal/ground-source heat pump categories and there are no V2 package summaries or alternative scenario candidates. The packet therefore lacks enough repaired package/stacking data to verify that no-incentive is the best complete scenario.",
"recommendedRepair": "Create or explicitly suppress REAP and MACRS scenario packages for geothermal. REAP should remain loan-guarantee/financing-only unless RetroFi supports loan-guarantee benefit modeling; MACRS needs tax-basis and ownership inputs.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "medium",
"findingType": "missing_compatible_opportunity",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:22615",
"SOURCE_DSIRE:dsire_program_id:3527"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The selected no-incentives scenario correctly avoids counting MCE FIT for standalone battery storage, because the packet says storage is valid only as part of required solar-plus-storage project design. However, MACRS elsewhere in the packet lists energy_storage_technology as an eligible category, while battery storage matched opportunities omit MACRS entirely. PACE is financing only and does not create a direct savings scenario.",
"recommendedRepair": "Add MACRS as a considered/matched opportunity for battery storage or add explicit data explaining why battery storage is excluded. Keep MCE FIT excluded for standalone battery storage unless paired solar generation and FIT project requirements are modeled.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"retrofitDisplayName": "High-efficiency HVAC replacement",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3527",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid. PACE is described as financing rather than a rebate, and MACRS blockers say generic ordinary HVAC replacement is not specially supported. No alternative calculable scenario appears in the packet.",
"recommendedRepair": "No scenario-combination repair.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "solar_water_heating_system",
"retrofitDisplayName": "Solar water heating system",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "MACRS is the sole matched opportunity and lists solar_water_heating_system as an eligible category, but the retrofit has no V2 package summaries and only a no-incentives selected scenario. This leaves a source-backed tax-cost-recovery opportunity outside all scenario candidates.",
"recommendedRepair": "Add a MACRS scenario package for solar water heating or explicitly suppress it with a documented reason. Include tax-basis and ownership inputs before including any calculated value.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "combined_heat_and_power_system",
"retrofitDisplayName": "Combined heat and power system",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "MACRS is matched and lists combined_heat_and_power_system as an eligible category, but there is no V2 package and no alternative scenario that evaluates it. The selected empty scenario is stack-safe but likely incomplete as a scenario set.",
"recommendedRepair": "Add or explicitly suppress a MACRS package for CHP, including required tax-basis, placed-in-service, ownership, and current-code inputs.",
"needsMathVerificationLater": true
},
{
"retrofitTypeId": "electric_vehicle_purchase",
"retrofitDisplayName": "Electric vehicle purchase",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:22149"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid. The only matched opportunity, Clean Transportation Program, is marked needs_repair_review, low confidence, and not included in runtime totals; the packet also says broad passenger EV purchase should not match unless a specific current CEC solicitation supports that vehicle class.",
"recommendedRepair": "No scenario-combination repair. Keep excluded unless a specific solicitation and eligible vehicle class are modeled.",
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
"explanation": "No scenario is appropriate. The retrofit is unsupported for savings modeling, and the matched USDA 5313 opportunity explicitly blocks standalone engineering feasibility studies as a source-backed retrofit category.",
"recommendedRepair": "No scenario-combination repair. Keep this out of calculated scenarios unless tied to an eligible commercial-scale biorefinery/manufacturing project package.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "insulation_upgrade",
"retrofitDisplayName": "Insulation upgrade",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:3527"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentives scenario is valid. The only matched opportunity is PACE financing, and the packet says it should not be treated as a rebate or product-specific direct incentive. No alternative scenario is listed.",
"recommendedRepair": "No scenario-combination repair.",
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
"explanation": "Selected no-incentives scenario is valid. MACRS is matched, but the packet explicitly says generic LED lighting is not specially supported under this opportunity. Excluding it from the selected scenario is appropriate.",
"recommendedRepair": "No scenario-combination repair. Consider removing the false-positive LED/MACRS match upstream, but do not add it to the scenario.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "leed_certification",
"retrofitDisplayName": "LEED certification",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": null,
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:4790"
],
"affectedScenarioIds": [],
"explanation": "No calculated scenario is appropriate. The retrofit is unsupported for savings modeling, and the matched San Diego SBEP opportunity is described as CALGreen/sustainable building compliance rather than a general LEED certification incentive.",
"recommendedRepair": "No scenario-combination repair. Keep out of calculated scenarios unless a supported compliance-value model and applicable jurisdiction are provided.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "small_wind_turbine",
"retrofitDisplayName": "Small wind turbine",
"severity": "medium",
"findingType": "no_calculable_scenario_but_should_have_one",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "MACRS is matched and lists small_wind_turbine as an eligible category, but no V2 package or alternative scenario evaluates it. The selected no-incentives scenario is stack-safe but incomplete unless MACRS is intentionally suppressed.",
"recommendedRepair": "Add or explicitly suppress a MACRS package for small wind, including ownership, tax-basis, placed-in-service, and other tax eligibility inputs.",
"needsMathVerificationLater": true
}
],
"summary": {
"retrofitsReviewed": 13,
"highSeverityCount": 0,
"mediumSeverityCount": 6,
"lowSeverityCount": 7,
"noIssueRetrofitCount": 7,
"dataGapRetrofitCount": 6
}
}

