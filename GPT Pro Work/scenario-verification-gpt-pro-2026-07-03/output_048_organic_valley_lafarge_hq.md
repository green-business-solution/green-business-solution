{
"schemaVersion": "retrofi_scenario_combination_verification.v1",
"reviewedBy": "gpt_pro",
"testCaseId": "organic-valley-lafarge-hq",
"testCaseOrdinal": 48,
"overallAssessment": "inconclusive_due_to_data_gaps",
"findings": [
{
"retrofitTypeId": "battery_storage_system",
"retrofitDisplayName": "Battery storage system",
"severity": "medium",
"findingType": "data_gap_blocks_verification",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:178",
"SOURCE_DSIRE:dsire_program_id:3538",
"SOURCE_DSIRE:dsire_program_id:3223"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected scenario is internally valid as a no-incentive scenario and does not double-count anything. However, the packet includes four matched opportunities and no v2 package summaries or alternative scenarios. Several matched opportunities contain blockers narrowing or excluding standalone battery treatment, while the ITC appears category-compatible for battery storage. Because there is no calculable package, stacking metadata, or alternative candidate, the packet does not support a reliable decision on whether any compatible additive opportunity should have entered the scenario. ",
"recommendedRepair": "Add calculation-package status and explicit inclusion/exclusion rationale for each matched battery opportunity, especially ITC, and define whether state tax exemptions or PACE financing are unsupported, blocked, or intentionally excluded for standalone battery storage.",
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
"SOURCE_DSIRE:dsire_program_id:2511",
"SOURCE_DSIRE:dsire_program_id:178",
"SOURCE_DSIRE:dsire_program_id:3223",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected scenario is internally valid as a no-incentive scenario and does not include incompatible stacks. The matched opportunities include several potentially compatible but structurally different benefits: federal ITC, USDA REAP loan guarantee, Wisconsin property tax exemption, Wisconsin sales tax exemption for qualifying anaerobic-digestion gas, and MACRS. The packet provides no calculable package summaries, no conflict rules, and no alternative scenarios, so it cannot confirm whether no incentives is the right selected combination.",
"recommendedRepair": "Provide v2 package summaries and stacking/conflict metadata for ITC, MACRS, Wisconsin sales/property tax exemptions, and REAP loan guarantee treatment. Mark loan guarantee as financing/non-cash where appropriate so it is not compared as a rebate.",
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
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected scenario is internally valid as no incentives, but the matched opportunities include federal ITC, REAP loan guarantee, and MACRS, all with category language that appears potentially relevant to geothermal or ground-source systems. With no package summaries, no candidate incentive scenarios, and no stacking/conflict metadata, the packet does not show whether these were correctly excluded or simply uncalculated.",
"recommendedRepair": "Add package-level inclusion statuses for ITC, REAP loan guarantee, and MACRS, including whether each is unsupported for runtime totals, blocked by missing inputs, non-user-facing, or eligible but uncalculated.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "led_lighting_retrofit",
"retrofitDisplayName": "LED lighting retrofit",
"severity": "low",
"findingType": "excluded_opportunity_should_stay_excluded",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:658",
"SOURCE_DSIRE:dsire_program_id:676",
"SOURCE_DSIRE:dsire_program_id:1271"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "The no-incentive scenario is defensible on scenario-combination grounds. The matched ITC and MACRS records both include blockers stating that generic LED lighting is not supported as an ordinary efficiency measure. The 179D opportunity is only valid if the lighting is part of a certified qualifying commercial building or retrofit-property savings calculation, not as a simple LED rebate. The packet contains no package or alternative scenario showing a certified 179D pathway, so exclusion from runtime totals should stay excluded for this pass.",
"recommendedRepair": "Keep simple LED lighting excluded from ITC and MACRS incentive scenarios. Only create a 179D scenario when the project has certified qualifying savings inputs and a package that treats the deduction as non-rebate tax value.",
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
"SOURCE_DSIRE:dsire_program_id:3223",
"SOURCE_DSIRE:dsire_program_id:676"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected scenario is internally valid as no incentives, but the matched opportunities include ITC, Wisconsin renewable energy sales tax exemption, and MACRS, each with eligible category language that may apply to solar water heating or solar thermal equipment. The packet does not include calculation-package statuses, scenario alternatives, or stacking metadata, so it is not possible to verify that all compatible additive opportunities were correctly excluded.",
"recommendedRepair": "Add v2 package summaries and explicit runtime inclusion/exclusion reasons for ITC, MACRS, and Wisconsin sales tax exemption, including component-level treatment for excluded storage tanks versus qualifying solar thermal collectors or heat-producing equipment.",
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
"explanation": "Selected scenario is internally valid and has no double-counting, but both matched opportunities list combined heat and power or qualified clean energy property in their eligible categories. The packet provides no v2 package summaries, no package-level blocking reason, and no alternative scenario using either opportunity, so the scenario-selection decision cannot be reliably verified.",
"recommendedRepair": "Add package summaries for ITC and MACRS, with explicit stacking rules and whether tax credits/depreciation are user-facing in scenarios.",
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
"explanation": "The selected no-incentive scenario is defensible for ordinary high-efficiency HVAC replacement. The ITC blocker says ordinary high-efficiency HVAC replacement is not supported unless the installed property independently qualifies as listed energy property, and the MACRS blocker says generic HVAC replacement is not specially supported. No alternative qualified clean-energy HVAC scenario is provided in the packet.",
"recommendedRepair": "Keep ordinary HVAC replacement excluded from ITC and clean-energy MACRS scenarios unless the retrofit is reclassified to a qualifying listed property such as ground-source geothermal or another supported energy property category.",
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
"explanation": "The selected no-incentive scenario is defensible for a broad microgrid system because the ITC opportunity is explicitly narrowed to qualifying microgrid controllers, not all microgrid infrastructure. The retrofit is named as a general microgrid system, and the packet does not provide inputs or package data isolating a qualifying microgrid controller.",
"recommendedRepair": "Do not include the broad microgrid system in an ITC scenario unless the project scope identifies a qualifying microgrid controller and the calculation package applies only to the qualifying controller cost basis.",
"needsMathVerificationLater": false
},
{
"retrofitTypeId": "retro_commissioning_study",
"retrofitDisplayName": "Retro-commissioning study",
"severity": "low",
"findingType": "no_issue",
"selectedScenarioId": "scenario_no_incentives",
"affectedOpportunityIds": [
"SOURCE_DSIRE:dsire_program_id:5218"
],
"affectedScenarioIds": [
"scenario_no_incentives"
],
"explanation": "Selected no-incentive scenario is internally valid. The only matched opportunity has a v2 package summary marked not_user_facing_default, not included in runtime totals, with zero expected cash totals and low-confidence placeholder defaults for many required inputs. There is no listed compatible cash scenario that should have displaced no incentives in this pass.",
"recommendedRepair": "No scenario-combination repair required. Separately, improve input collection and package confidence if this Focus on Energy path should become user-facing.",
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
"explanation": "Selected scenario is internally valid as no incentives, but the only matched opportunity, MACRS, lists small wind turbine as an eligible category. The packet does not include a package summary, an exclusion rationale, or an alternative scenario, so it cannot verify whether no incentives is the correct selected scenario or whether MACRS was intentionally unsupported for runtime totals.",
"recommendedRepair": "Add a MACRS package summary for small wind or an explicit exclusion status explaining why depreciation/tax cost recovery is not included in user-facing scenario totals.",
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
"explanation": "Selected scenario is internally valid and contains no conflicting or duplicate opportunities. However, the matched ITC opportunity explicitly lists thermal energy storage as an eligible category, while the packet provides no package summary, no scenario alternative, and no exclusion rationale. The scenario decision is therefore not reliably verifiable from the packet.",
"recommendedRepair": "Add an ITC package summary for thermal energy storage showing whether it is included, blocked by missing inputs, unsupported, or intentionally non-user-facing.",
"needsMathVerificationLater": false
}
],
"summary": {
"retrofitsReviewed": 11,
"highSeverityCount": 0,
"mediumSeverityCount": 7,
"lowSeverityCount": 4,
"noIssueRetrofitCount": 1,
"dataGapRetrofitCount": 7
}
}

