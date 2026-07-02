{
"schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
"researchedAt": "2026-07-02",
"source": "gpt_pro",
"batchNumber": 37,
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2673",
"opportunityName": "NineStar Connect - Residential Energy Efficient Equipment Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"fixed_tier_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Select the qualifying PowerMoves residential measure and replacement scenario; pay the listed fixed rebate amount for that row.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"member_utility",
"measure_type",
"replacement_type",
"heat_pump_scope",
"cold_climate_qualification",
"geothermal_loop_type",
"UEF_or_AHRI_rating",
"project_cost",
"purchase_or_install_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"replacement_type",
"equipment_rating_or_AHRI_certificate",
"project_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "powermoves_2026_residential_rebates",
"selectionInput": "measure_type_and_replacement_scenario",
"rows": [
{
"measure": "geothermal_heat_pump_closed_loop_new_or_replacing_electric_fossil_ashp",
"amountCents": 200000,
"requirements": "Closed-loop geothermal replacing electric resistance, fossil fuel, air-source heat pump, or new construction."
},
{
"measure": "geothermal_heat_pump_open_loop_new_or_replacing_electric_fossil_ashp",
"amountCents": 100000,
"requirements": "Open-loop geothermal replacing electric resistance, fossil fuel, air-source heat pump, or new construction."
},
{
"measure": "geothermal_heat_pump_replacing_existing_geothermal",
"amountCents": 25000,
"requirements": "Open- or closed-loop geothermal replacing existing geothermal."
},
{
"measure": "whole_home_cold_climate_air_source_heat_pump",
"amountCents": 180000,
"requirements": "Whole-home cold-climate ASHP for eligible replacement type or new construction."
},
{
"measure": "whole_home_non_cold_air_source_heat_pump_replacing_electric_or_fossil",
"amountCents": 75000,
"requirements": "Whole-home non-cold-climate ASHP replacing electric resistance or fossil fuel."
},
{
"measure": "whole_home_non_cold_air_source_heat_pump_replacing_ashp",
"amountCents": 25000,
"requirements": "Whole-home non-cold-climate ASHP replacing an ASHP; not listed for new construction."
},
{
"measure": "partial_home_cold_climate_air_source_heat_pump",
"amountCents": 80000,
"requirements": "Partial-home cold-climate ASHP for eligible replacement type or new construction."
},
{
"measure": "partial_home_non_cold_air_source_heat_pump",
"amountCents": 25000,
"requirements": "Partial-home non-cold-climate ASHP for eligible replacement type; not listed for new construction."
},
{
"measure": "ducted_split_system_dual_fuel_heat_pump",
"amountCents": 50000,
"requirements": "Dual-fuel heat pump with gas, propane, or fuel-oil backup under listed replacement or new-construction cases."
},
{
"measure": "heat_pump_water_heater",
"amountCents": 80000,
"requirements": "UEF at least 3.3, replacing electric resistance tank, gas/propane water heater, or new construction."
},
{
"measure": "wifi_thermostat",
"amountCents": 7500,
"requirements": "Approved Wi-Fi thermostat replacing non-Wi-Fi thermostat."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "PowerMoves 2026 residential flyer lists fixed rebates for geothermal, air-source, dual-fuel heat pumps, HPWHs, and Wi-Fi thermostats.",
"sourceUrls": [
"[https://www.powermoves.com/rebates/residential/](https://www.powermoves.com/rebates/residential/)",
"[https://www.powermoves.com/wp-content/uploads/2026/01/2026-PowerMoves-Residential-Rebates-Flyer-PDF-1.pdf](https://www.powermoves.com/wp-content/uploads/2026/01/2026-PowerMoves-Residential-Rebates-Flyer-PDF-1.pdf)",
"[https://wvpa.my.site.com/](https://wvpa.my.site.com/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "The 2026 residential flyer lists geothermal heat pump rebates with open-loop, closed-loop, and replacement tiers."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "The flyer lists air-source, cold-climate, partial-home, whole-home, and dual-fuel heat pump rebates."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "The flyer lists an $800 heat pump water heater rebate for qualifying UEF and replacement scenarios."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "The source supports qualifying heat pumps, not generic high-efficiency HVAC replacement."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "The flyer lists a fixed Wi-Fi thermostat rebate for replacing a non-Wi-Fi thermostat."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "No explicit stacking rule found in reviewed program materials."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "2026-12-31",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.powermoves.com/rebates/residential/](https://www.powermoves.com/rebates/residential/)",
"[https://www.powermoves.com/wp-content/uploads/2026/01/2026-PowerMoves-Residential-Rebates-Flyer-PDF-1.pdf](https://www.powermoves.com/wp-content/uploads/2026/01/2026-PowerMoves-Residential-Rebates-Flyer-PDF-1.pdf)",
"[https://wvpa.my.site.com/](https://wvpa.my.site.com/)"
],
"evidenceText": "PowerMoves publishes 2026 fixed residential rebate amounts for qualifying heat pumps, geothermal, HPWHs and Wi-Fi thermostats.",
"reasoningNotes": "Batch targets were supplied in the uploaded prompt . Broad HVAC was removed because the source-backed HVAC measures are heat-pump-specific.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2667",
"opportunityName": "Southern Indiana Power - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"fixed_tier_amount",
"capped_percent_of_eligible_cost"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Select the qualifying 2026 residential HVAC or water-heater measure; rebate is the fixed row amount, capped at 50% of eligible equipment cost.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.5,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"customer_account",
"measure_type",
"efficiency_tier",
"SEER2",
"HSPF2",
"UEF",
"project_cost",
"installation_date",
"licensed_contractor_for_tune_up_if_applicable"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"efficiency_tier",
"equipment_efficiency",
"project_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "sip_2026_residential_rebates",
"selectionInput": "measure_type_and_efficiency_tier",
"rows": [
{
"measure": "air_source_or_dual_fuel_heat_pump_tier_1",
"amountCents": 30000,
"requirements": "SEER2 14.3-15.3 and HSPF2 at least 7.5."
},
{
"measure": "air_source_or_dual_fuel_heat_pump_tier_2",
"amountCents": 40000,
"requirements": "SEER2 15.4-17.2 and HSPF2 at least 7.5."
},
{
"measure": "air_source_or_dual_fuel_heat_pump_tier_3",
"amountCents": 50000,
"requirements": "SEER2 at least 17.3 and HSPF2 at least 7.5."
},
{
"measure": "mini_split_multi_zone",
"amountCents": 50000,
"requirements": "One outdoor unit with at least two indoor units; SEER2 at least 17.3 and HSPF2 at least 7.5."
},
{
"measure": "mini_split_single_zone",
"amountCents": 30000,
"requirements": "SEER2 at least 17.3 and HSPF2 at least 7.5."
},
{
"measure": "geothermal_heat_pump",
"amountCents": 200000,
"requirements": "Qualifying geothermal heat pump."
},
{
"measure": "heat_pump_water_heater",
"amountCents": 50000,
"requirements": "Qualifying heat pump water heater."
},
{
"measure": "wifi_enabled_electric_storage_water_heater",
"amountCents": 20000,
"requirements": "Wi-Fi-enabled electric storage water heater, UEF at least 0.90."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "SIP 2026 residential rebate materials publish tiered heat pump, geothermal, mini-split and water-heater amounts with a 50% equipment-cost cap.",
"sourceUrls": [
"[https://www.southernindianapower.com/energy-efficiency/rebates/](https://www.southernindianapower.com/energy-efficiency/rebates/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "energy_management_system",
"action": "delete_bad_edge",
"reason": "The current residential rebate list does not support energy management systems."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "The 2026 residential HVAC table lists a geothermal heat pump rebate."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "The table lists air-source, dual-fuel and mini-split heat pump rebates."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "The water-heater materials list a heat pump water heater rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "The source supports qualifying heat pumps, not generic high-efficiency HVAC replacement."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate cannot exceed 50% of eligible equipment cost under reviewed forms."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "2026-12-15",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.southernindianapower.com/energy-efficiency/rebates/](https://www.southernindianapower.com/energy-efficiency/rebates/)"
],
"evidenceText": "Southern Indiana Power publishes 2026 fixed residential rebate tiers for qualifying heat pumps, geothermal systems, mini-splits and HPWHs.",
"reasoningNotes": "Repaired as a measure catalog because the current table has multiple equipment and efficiency-tier rows.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3696",
"opportunityName": "Kentucky Power - Targeted Energy Efficiency Program",
"repairStatus": "non_monetary_workflow",
"calculationStatus": "non_monetary_workflow",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"technical_assistance",
"process_value",
"non_cash"
],
"primaryValueModelKinds": [
"non_cash_process_value",
"no_calculable_value"
],
"effects": [
{
"effectType": "process_value",
"cashValueClassification": "technical_assistance",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Income-qualified customers are routed through Community Action agencies for audits and installed weatherization or efficiency services; no customer-facing per-measure cash rebate formula is published.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"kentucky_power_customer_status",
"income_qualification",
"agency_intake",
"home_heating_or_water_heating_usage"
],
"missingInputsForTypicalRetroFiEstimate": [
"agency_scope_of_work",
"installed_measures",
"project_cost_or_agency_funding_share"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": null,
"selectionInput": null,
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Kentucky Power describes agency-delivered energy audit, air sealing, insulation, duct work, lighting, hot-water and weatherization services.",
"sourceUrls": [
"[https://www.kentuckypower.com/savings/home/targeted-energy-efficiency](https://www.kentuckypower.com/savings/home/targeted-energy-efficiency)",
"[https://www.kentuckypower.com/lib/docs/savings/energyefficiencyprograms/TEE_Program_Quick_Reference_Guide.pdf](https://www.kentuckypower.com/lib/docs/savings/energyefficiencyprograms/TEE_Program_Quick_Reference_Guide.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "Air sealing is listed as an agency-delivered weatherization service, not a cash rebate."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "keep",
"reason": "Duct sealing and insulation are listed as delivered program measures."
},
{
"retrofitTypeId": "energy_audit",
"action": "move_to_special_workflow",
"reason": "The energy audit is part of an income-qualified assistance workflow rather than a standalone retrofit rebate."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Attic, floor and side-wall insulation are listed as program-delivered weatherization measures."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Efficient lighting is listed as a program-delivered measure, but no customer cash formula is published."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Stacking is not described as a customer rebate rule; the program supplements weatherization assistance delivery."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.kentuckypower.com/savings/home/targeted-energy-efficiency](https://www.kentuckypower.com/savings/home/targeted-energy-efficiency)",
"[https://www.kentuckypower.com/lib/docs/savings/energyefficiencyprograms/TEE_Program_Quick_Reference_Guide.pdf](https://www.kentuckypower.com/lib/docs/savings/energyefficiencyprograms/TEE_Program_Quick_Reference_Guide.pdf)"
],
"evidenceText": "Kentucky Power TEE is an income-qualified assistance workflow delivered through Community Action agencies, not a published customer rebate table.",
"reasoningNotes": "No user-facing cash amount should be estimated because measure scope and funding are assigned through the agency process.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3217",
"opportunityName": "NextZero - Offered by 21 Utilities through the MMWEC",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "medium",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"tariff_or_rate",
"process_value"
],
"primaryValueModelKinds": [
"measure_catalog",
"per_unit_award",
"capped_percent_of_eligible_cost",
"tariff_or_rate"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Use the participating municipal utility's town-specific page; Sterling examples publish per-ton heat-pump rates, fixed HPWH value, thermostat cost-share caps, and battery base rebate rates.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 200000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": 3,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"participating_town",
"measure_type",
"tons",
"battery_kWh",
"product_cost",
"battery_brand_or_model",
"connected_homes_enrollment",
"purchase_or_install_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"participating_town",
"measure_type",
"tons_or_kWh",
"product_cost",
"local_program_availability"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "nextzero_town_specific_selected_values",
"selectionInput": "participating_town_and_measure_type",
"rows": [
{
"measure": "air_source_heat_pump",
"rateCents": 50000,
"rateUnit": "per_ton",
"maxUnits": 3,
"requirements": "Town-specific page; Sterling page lists all heat pumps installed by Massachusetts licensed contractor."
},
{
"measure": "ground_source_heat_pump",
"rateCents": 75000,
"rateUnit": "per_ton",
"maxUnits": 3,
"requirements": "Town-specific page; Sterling page lists GSHP rebate per ton."
},
{
"measure": "heat_pump_water_heater",
"amountCents": 50000,
"requirements": "Qualifying residential HPWH where town offers appliance rebate."
},
{
"measure": "wifi_thermostat",
"percent": 0.5,
"maxAmountCents": 12500,
"requirements": "Qualifying thermostat cost, town-specific availability."
},
{
"measure": "mini_split_hvac_control",
"percent": 0.5,
"maxAmountCents": 12500,
"requirements": "Qualifying mini-split HVAC control, town-specific availability."
},
{
"measure": "residential_battery_base_rebate",
"rateCents": 10000,
"rateUnit": "per_kWh",
"minCapacityKWh": 7.5,
"maxCapacityKWh": 20,
"maxAmountCents": 200000,
"requirements": "Sterling battery program; qualifying lithium-ion battery and Connected Homes enrollment."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "NextZero rebates vary by municipal light plant; Sterling pages publish heat pump, appliance, thermostat and battery rates.",
"sourceUrls": [
"[https://nextzero.org/](https://nextzero.org/)",
"[https://rebates.nextzero.org/](https://rebates.nextzero.org/)",
"[https://nextzero.org/sterling/heat-pumps/](https://nextzero.org/sterling/heat-pumps/)",
"[https://nextzero.org/sterling/battery-program/](https://nextzero.org/sterling/battery-program/)",
"[https://nextzero.org/sterling/appliances/](https://nextzero.org/sterling/appliances/)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "monthly",
"formulaText": "Where offered, enrolled residential batteries may receive an additional monthly peak-event participation incentive; Sterling lists $30 per month for participation.",
"amountCents": 3000,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"participating_town",
"battery_program_availability",
"connected_homes_enrollment",
"event_participation"
],
"missingInputsForTypicalRetroFiEstimate": [
"participating_town",
"enrollment_status",
"event_participation"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": null,
"selectionInput": null,
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "The Sterling battery page lists a recurring monthly participation incentive tied to Connected Homes events.",
"sourceUrls": [
"[https://nextzero.org/sterling/battery-program/](https://nextzero.org/sterling/battery-program/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "battery_storage_system",
"action": "keep",
"reason": "Some NextZero towns publish a residential battery rebate and monthly Connected Homes participation incentive."
},
{
"retrofitTypeId": "energy_audit",
"action": "move_to_special_workflow",
"reason": "Energy audits are town-specific service workflows, not a universal installed-retrofit rebate value."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Town pages publish heat pump rebates, including per-ton examples."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "needs_review",
"reason": "High-efficiency HVAC is supported only where narrowed to a town-specific heat-pump or commercial prescriptive/custom measure."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "needs_review",
"reason": "Commercial lighting exists in some local menus, but rates and eligibility are town-specific."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Town-specific pages may impose additional annual, cost-share or product limits."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "2027-01-31",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://nextzero.org/](https://nextzero.org/)",
"[https://rebates.nextzero.org/](https://rebates.nextzero.org/)",
"[https://nextzero.org/sterling/heat-pumps/](https://nextzero.org/sterling/heat-pumps/)",
"[https://nextzero.org/sterling/battery-program/](https://nextzero.org/sterling/battery-program/)",
"[https://nextzero.org/sterling/appliances/](https://nextzero.org/sterling/appliances/)"
],
"evidenceText": "NextZero is active, but rebates vary by participating municipal light plant; Sterling pages provide usable example rate logic.",
"reasoningNotes": "Town-specific availability must be checked before showing a value. Battery recurring payments should be separated from one-time rebates.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3749",
"opportunityName": "CenterPoint Energy (Gas) - Commercial Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate",
"technical_assistance"
],
"primaryValueModelKinds": [
"measure_catalog",
"fixed_amount",
"per_unit_award",
"percent_of_eligible_cost",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Select the eligible Minnesota commercial natural-gas measure; calculate the fixed, per-unit, per-input, or percentage rebate row, subject to measure caps and fund availability.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"centerpoint_mn_gas_customer_status",
"measure_type",
"equipment_input_MMBtuh",
"boiler_count",
"linear_feet",
"controls_count",
"washer_capacity_lb",
"dryer_kits",
"project_cost",
"installation_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"equipment_size_or_units",
"project_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "centerpoint_mn_2026_commercial_gas_rebates",
"selectionInput": "measure_type_and_equipment_size",
"rows": [
{
"measure": "smart_thermostat",
"amountCents": 5000,
"unit": "per thermostat"
},
{
"measure": "boiler_tune_up",
"percent": 0.25,
"maxAmountCents": 30000,
"unit": "per boiler"
},
{
"measure": "boiler_turbulators",
"percent": 0.35,
"maxAmountCents": 75000,
"unit": "per boiler"
},
{
"measure": "modulating_burner",
"rateCents": 45000,
"rateUnit": "per MMBtu input",
"maxPercentOfEligibleCost": 0.25
},
{
"measure": "stack_damper",
"rateCents": 25000,
"rateUnit": "per MMBtu input",
"maxPercentOfEligibleCost": 0.35
},
{
"measure": "boiler_reset_or_cut_out_control",
"amountCents": 15000,
"unit": "per control"
},
{
"measure": "linkageless_boiler_control",
"rateCents": 30000,
"rateUnit": "per MMBtu input",
"maxPercentOfEligibleCost": 0.35
},
{
"measure": "pipe_insulation",
"rateCents": 250,
"rateUnit": "per linear foot"
},
{
"measure": "hot_water_boiler_85_to_87_9_percent",
"rateCents": 180000,
"rateUnit": "per MMBtuh input"
},
{
"measure": "condensing_hot_water_boiler_88_percent_or_higher",
"rateCents": 350000,
"rateUnit": "per MMBtuh input"
},
{
"measure": "steam_boiler_83_percent_or_higher",
"rateCents": 50000,
"rateUnit": "per MMBtuh input"
},
{
"measure": "commercial_laundry_ozone",
"rateCents": 1000,
"rateUnit": "per pound washer capacity"
},
{
"measure": "modulating_clothes_dryer_retrofit",
"amountCents": 25000,
"unit": "per kit"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "CenterPoint Minnesota ECO book publishes commercial natural-gas rebate rows for boilers, controls, pipe insulation, thermostats and laundry retrofits.",
"sourceUrls": [
"[https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates?sa=mn](https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates?sa=mn)",
"[https://www.centerpointenergy.com/en-us/Documents/251104-08-MNTA-ECO-Book-Web.pdf](https://www.centerpointenergy.com/en-us/Documents/251104-08-MNTA-ECO-Book-Web.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "The commercial gas materials publish boiler, boiler controls and boiler tune-up rebate rates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Supported only for qualifying natural-gas heating equipment, not electric HVAC."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "Commercial laundry support is limited to ozone laundry and modulating clothes dryer retrofit measures."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "delete_bad_edge",
"reason": "The source supports pipe and process insulation, not broad commercial building-envelope insulation."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "The ECO book lists a commercial smart thermostat rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Funds are limited and paid first-come, first-served; multifamily bonuses may apply only under specific listed paths."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "2026-12-31",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates?sa=mn](https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/equipment-programs-and-rebates?sa=mn)",
"[https://www.centerpointenergy.com/en-us/Documents/251104-08-MNTA-ECO-Book-Web.pdf](https://www.centerpointenergy.com/en-us/Documents/251104-08-MNTA-ECO-Book-Web.pdf)"
],
"evidenceText": "CenterPoint Minnesota publishes commercial natural-gas rebate rows for boilers, heating controls, thermostats, pipe insulation and laundry retrofits.",
"reasoningNotes": "Generic insulation and laundry edges were narrowed to the specific gas-program measures shown in the ECO book.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4739",
"opportunityName": "MMPA - Commercial and Industrial Energy Efficiency Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"per_unit_award",
"capped_percent_of_eligible_cost",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use the participating municipal utility's current We Save Business form; lighting and VFD rebates are per unit or per horsepower and generally capped at 50% of project cost.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.5,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"participating_municipal_utility",
"measure_type",
"fixture_or_control_counts",
"VFD_horsepower",
"project_cost",
"preapproval_status",
"installation_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"participating_utility",
"measure_type",
"unit_count_or_horsepower",
"project_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "mmpa_2026_we_save_business_lighting_vfd",
"selectionInput": "measure_type_and_unit_count",
"rows": [
{
"measure": "variable_frequency_drive",
"rateCents": 4000,
"rateUnit": "per horsepower",
"maxPercentOfEligibleCost": 0.5,
"requirements": "New VFD for fan or pump speed control; 1-200 hp; replacement drives not eligible."
},
{
"measure": "led_lamps_30w_or_less",
"amountCents": 500,
"unit": "per lamp"
},
{
"measure": "led_2_or_4_pin_30w_or_less",
"amountCents": 700,
"unit": "per lamp"
},
{
"measure": "led_t8_t5_lamps",
"amountCents": 500,
"unit": "per lamp"
},
{
"measure": "led_mogul_119w_or_less",
"amountCents": 5000,
"unit": "per lamp"
},
{
"measure": "led_mogul_120_to_250w",
"amountCents": 7500,
"unit": "per lamp"
},
{
"measure": "track_lighting_fixture",
"amountCents": 1500,
"unit": "per fixture"
},
{
"measure": "linear_ambient_fixture_low_tier",
"amountCents": 2500,
"unit": "per fixture"
},
{
"measure": "linear_ambient_fixture_high_tier",
"amountCents": 4000,
"unit": "per fixture"
},
{
"measure": "troffer_fixture",
"amountCents": 3000,
"unit": "per fixture"
},
{
"measure": "high_low_bay_fixture_94w_or_less",
"amountCents": 5000,
"unit": "per fixture"
},
{
"measure": "high_low_bay_fixture_95_to_290w",
"amountCents": 15000,
"unit": "per fixture"
},
{
"measure": "high_low_bay_fixture_291_to_464w",
"amountCents": 20000,
"unit": "per fixture"
},
{
"measure": "high_low_bay_fixture_465_to_625w",
"amountCents": 25000,
"unit": "per fixture"
},
{
"measure": "refrigerated_case_door_lighting",
"amountCents": 5000,
"unit": "per door"
},
{
"measure": "exit_sign",
"amountCents": 2500,
"unit": "per sign"
},
{
"measure": "occupancy_or_photocell_sensor",
"amountCents": 2000,
"unit": "per sensor"
},
{
"measure": "exterior_wallpack_25w_or_less",
"amountCents": 2500,
"unit": "per fixture"
},
{
"measure": "exterior_wallpack_26_to_60w",
"amountCents": 4000,
"unit": "per fixture"
},
{
"measure": "exterior_wallpack_61_to_150w",
"amountCents": 6000,
"unit": "per fixture"
},
{
"measure": "exterior_area_89w_or_less",
"amountCents": 4000,
"unit": "per fixture"
},
{
"measure": "exterior_area_90_to_149w",
"amountCents": 5000,
"unit": "per fixture"
},
{
"measure": "exterior_area_150_to_299w",
"amountCents": 7500,
"unit": "per fixture"
},
{
"measure": "exterior_area_300_to_550w",
"amountCents": 10000,
"unit": "per fixture"
},
{
"measure": "parking_garage_100w_or_less",
"amountCents": 12500,
"unit": "per fixture"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "MMPA and local 2026 forms publish prescriptive lighting, lighting control and VFD rebate rows with project-cost caps.",
"sourceUrls": [
"[https://www.mmpa.org/conservation/overview/](https://www.mmpa.org/conservation/overview/)",
"[https://northstpaul.org/DocumentCenter/View/7462/2026-We-Save-Business-Rebate-Information-Sheetpdf](https://northstpaul.org/DocumentCenter/View/7462/2026-We-Save-Business-Rebate-Information-Sheetpdf)",
"[https://www.ci.buffalo.mn.us/DocumentCenter/View/2521/We-Save-Business-Lighting-Retrofit-Rebate-Form](https://www.ci.buffalo.mn.us/DocumentCenter/View/2521/We-Save-Business-Lighting-Retrofit-Rebate-Form)",
"[https://ci.buffalo.mn.us/DocumentCenter/View/2522/We-Save-Business-VFD-Rebate-Form](https://ci.buffalo.mn.us/DocumentCenter/View/2522/We-Save-Business-VFD-Rebate-Form)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "exterior_site_lighting_retrofit",
"action": "keep",
"reason": "Local We Save Business forms publish exterior lighting rebate rows."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "needs_review",
"reason": "HVAC appears only as local custom or preapproved work; no universal prescriptive HVAC rate was verified."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Local forms publish multiple interior LED lighting retrofit rows."
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"action": "keep",
"reason": "Occupancy and photocell sensors are listed as eligible lighting controls."
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"action": "keep",
"reason": "The VFD form publishes a per-horsepower rebate for qualifying new fan or pump drives."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Lighting and VFD forms cap rebates at 50% of project cost and are subject to local utility funding."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "2026-11-30",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.mmpa.org/conservation/overview/](https://www.mmpa.org/conservation/overview/)",
"[https://northstpaul.org/DocumentCenter/View/7462/2026-We-Save-Business-Rebate-Information-Sheetpdf](https://northstpaul.org/DocumentCenter/View/7462/2026-We-Save-Business-Rebate-Information-Sheetpdf)",
"[https://www.ci.buffalo.mn.us/DocumentCenter/View/2521/We-Save-Business-Lighting-Retrofit-Rebate-Form](https://www.ci.buffalo.mn.us/DocumentCenter/View/2521/We-Save-Business-Lighting-Retrofit-Rebate-Form)",
"[https://ci.buffalo.mn.us/DocumentCenter/View/2522/We-Save-Business-VFD-Rebate-Form](https://ci.buffalo.mn.us/DocumentCenter/View/2522/We-Save-Business-VFD-Rebate-Form)"
],
"evidenceText": "MMPA We Save Business forms provide prescriptive lighting and VFD rates; other measures can be local or custom.",
"reasoningNotes": "Use the customer's municipal utility form before finalizing a value, because member-utility rules and availability can vary.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3985",
"opportunityName": "Citizens Electric Corporation - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"fixed_amount",
"per_unit_award",
"capped_percent_of_eligible_cost"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Select the qualifying Citizens Electric Powerful Paybacks residential measure; apply the fixed or per-ton amount, not exceeding 75% of total installation cost or the residential annual cap.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.75,
"maxUnits": null,
"perCustomerCapCents": 400000,
"perSiteCapCents": null,
"annualCapCents": 400000,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"active_account_status",
"measure_type",
"replacement_type",
"SEER2",
"HSPF2",
"COP_at_5F",
"AFUE",
"AHRI_capacity",
"project_cost",
"application_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"equipment_rating",
"project_cost",
"replacement_type"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "cecmo_powerful_paybacks_residential",
"selectionInput": "measure_type_and_equipment_qualification",
"rows": [
{
"measure": "ducted_split_ashp_existing_home_forced_air_furnace_plus_split_ac_or_add_on",
"amountCents": 50000,
"requirements": "Existing home only; minimum 16.0 SEER2; not new construction."
},
{
"measure": "non_cold_climate_ducted_split_ashp_existing_home",
"amountCents": 75000,
"requirements": "Existing eligible electric, fossil fuel or ASHP replacement; minimum 15.2 SEER2 and 8.1 HSPF2."
},
{
"measure": "cold_climate_ducted_split_ashp",
"amountCents": 150000,
"requirements": "NEEP-approved cold-climate heat pump; minimum 15.2 SEER2, 8.1 HSPF2 and COP at 5°F at least 1.75."
},
{
"measure": "dual_fuel_ducted_split_ashp",
"amountCents": 100000,
"requirements": "Matched condenser, coil and fossil-fuel furnace; minimum 15.2 SEER2, 7.5 HSPF2 and 90% AFUE."
},
{
"measure": "geothermal_open_or_closed_loop",
"rateCents": 75000,
"rateUnit": "per ton",
"maxAmountCents": 400000,
"requirements": "Qualifying water-to-air or water-to-water geothermal; tons from AHRI cooling capacity divided by 12,000."
},
{
"measure": "wifi_smart_thermostat",
"amountCents": 5000,
"requirements": "ENERGY STAR Wi-Fi thermostat replacing a non-Wi-Fi thermostat for ducted central AC or heat pump."
},
{
"measure": "heat_pump_water_heater",
"amountCents": 80000,
"requirements": "ENERGY STAR HPWH, UEF at least 3.3, 40-80 gallons, replacing eligible water heater."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Direct Efficiency pages publish Citizens Electric rebates for ducted heat pumps, geothermal, Wi-Fi thermostats and HPWHs with a 75% cost cap.",
"sourceUrls": [
"[https://directefficiency.com/citizens-electric-corporation-powerful-paybacks-program-rules/](https://directefficiency.com/citizens-electric-corporation-powerful-paybacks-program-rules/)",
"[https://directefficiency.com/cecmo-ducted-air-source-heat-pump-rebate/](https://directefficiency.com/cecmo-ducted-air-source-heat-pump-rebate/)",
"[https://directefficiency.com/cecmo-geothermal-heat-pump-rebate/](https://directefficiency.com/cecmo-geothermal-heat-pump-rebate/)",
"[https://directefficiency.com/cecmo-smart-thermostat-rebate/](https://directefficiency.com/cecmo-smart-thermostat-rebate/)",
"[https://directefficiency.com/cecmo-heat-pump-water-heater-rebate/](https://directefficiency.com/cecmo-heat-pump-water-heater-rebate/)",
"[https://directefficiency.com/cecmo-ductless-heat-pump-rebate/](https://directefficiency.com/cecmo-ductless-heat-pump-rebate/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "The geothermal page publishes a per-ton rebate for open- and closed-loop systems."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "The ducted air-source heat pump page publishes fixed rebates for qualifying ASHP and dual-fuel systems."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "The HPWH page publishes a fixed rebate for qualifying heat pump water heaters."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "The program supports specific heat pump types, not generic high-efficiency HVAC replacement."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "The smart thermostat page publishes a fixed Wi-Fi thermostat rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Residential rebates are capped at 75% of total project cost and $4,000 per customer per calendar year."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "within 60 days of installation or purchase",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://directefficiency.com/citizens-electric-corporation-powerful-paybacks-program-rules/](https://directefficiency.com/citizens-electric-corporation-powerful-paybacks-program-rules/)",
"[https://directefficiency.com/cecmo-ducted-air-source-heat-pump-rebate/](https://directefficiency.com/cecmo-ducted-air-source-heat-pump-rebate/)",
"[https://directefficiency.com/cecmo-geothermal-heat-pump-rebate/](https://directefficiency.com/cecmo-geothermal-heat-pump-rebate/)",
"[https://directefficiency.com/cecmo-smart-thermostat-rebate/](https://directefficiency.com/cecmo-smart-thermostat-rebate/)",
"[https://directefficiency.com/cecmo-heat-pump-water-heater-rebate/](https://directefficiency.com/cecmo-heat-pump-water-heater-rebate/)",
"[https://directefficiency.com/cecmo-ductless-heat-pump-rebate/](https://directefficiency.com/cecmo-ductless-heat-pump-rebate/)"
],
"evidenceText": "Citizens Electric's implementer pages publish fixed and per-ton residential rebates with 60-day application and 75% cost-cap rules.",
"reasoningNotes": "Ductless heat pump category appears supported, but a current ductless amount was not extracted from accessible text.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4482",
"opportunityName": "Missouri Rural Electric Cooperative - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"per_unit_award",
"capped_percent_of_eligible_cost"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Select the qualifying MOREC residential measure; use the per-ton, per-unit or 50%-of-cost row subject to unit and tonnage limits.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"member_account",
"measure_type",
"tons",
"outdoor_unit_count",
"thermostat_count",
"HPWH_cost",
"equipment_efficiency",
"Manual_J_or_AHRI_if_required"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"tons_or_unit_count",
"equipment_cost_if_cost_share",
"equipment_rating"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "morec_residential_rebates",
"selectionInput": "measure_type_and_units",
"rows": [
{
"measure": "heat_pump_water_heater",
"percent": 0.5,
"maxAmountCents": 105000,
"maxUnits": 2,
"requirements": "Qualifying HPWH; brand, model, serial, size, UEF and receipt required."
},
{
"measure": "ground_source_heat_pump_new_or_replacement_new_ground_loops",
"rateCents": 75000,
"rateUnit": "per ton",
"maxUnitsResidential": 10,
"requirements": "Qualifying GSHP with new ground loops and listed EER/COP requirements."
},
{
"measure": "ground_source_heat_pump_inside_unit_replacement_only",
"rateCents": 40000,
"rateUnit": "per ton",
"maxUnitsResidential": 10,
"requirements": "Inside unit only, no new ground loops; replaced unit over 10 years old; no warranty replacement."
},
{
"measure": "air_source_heat_pump_with_new_fossil_backup",
"rateCents": 50000,
"rateUnit": "per ton",
"maxUnitsResidential": 10,
"requirements": "ENERGY STAR, HSPF2 at least 8.1, no electric backup."
},
{
"measure": "air_source_heat_pump_with_existing_fossil_backup",
"rateCents": 30000,
"rateUnit": "per ton",
"maxUnitsResidential": 10,
"requirements": "ENERGY STAR, HSPF2 at least 8.1, no electric backup."
},
{
"measure": "ductless_mini_split",
"amountCents": 25000,
"unit": "per outdoor unit",
"maxUnits": 2,
"requirements": "ENERGY STAR, SEER2 at least 15.2, no electric backup."
},
{
"measure": "advanced_thermostat",
"percent": 0.5,
"maxAmountCents": 5000,
"maxUnits": 2,
"requirements": "Programmable ENERGY STAR rated thermostat."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "MOREC publishes current residential rates for HPWHs, geothermal, air-source and ductless heat pumps, and advanced thermostats.",
"sourceUrls": [
"[https://www.morec.org/rebates-products/](https://www.morec.org/rebates-products/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "The MOREC page publishes geothermal heat pump rates for new loops and inside-unit replacement."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "The page publishes air-source and ductless heat pump rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Standard central air conditioning or generic HVAC replacement is not supported unless it is a qualifying heat pump measure."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "delete_bad_edge",
"reason": "The reviewed residential efficiency source does not support a Level 2 EV charger rebate under this record."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "The page publishes an advanced thermostat rebate capped at 50% of cost."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Cost-share and unit limits apply by measure; no separate stacking rule was found."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.morec.org/rebates-products/](https://www.morec.org/rebates-products/)"
],
"evidenceText": "MOREC publishes per-ton, per-unit and cost-share rebates for residential heat pumps, geothermal, HPWHs and advanced thermostats.",
"reasoningNotes": "The target's EV and broad HVAC edges are unsupported by the current residential efficiency rebate page.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2221",
"opportunityName": "Pearl River Valley Electric Power Association - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"process_value",
"non_cash"
],
"primaryValueModelKinds": [
"measure_catalog",
"fixed_amount",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "For qualifying Comfort Advantage projects, pay the fixed cash incentive row for existing-home heat pump installation, new-home Plus heat pump or geothermal, and additional qualified systems.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"project_type",
"comfort_advantage_tier",
"heat_pump_efficiency",
"geothermal_qualification",
"number_of_qualified_systems",
"home_standards_compliance"
],
"missingInputsForTypicalRetroFiEstimate": [
"project_type",
"comfort_advantage_tier",
"equipment_qualification",
"system_count"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "prvepa_comfort_advantage_cash",
"selectionInput": "project_type_and_system_count",
"rows": [
{
"measure": "existing_non_comfort_advantage_home_heat_pump",
"amountCents": 40000,
"requirements": "Install a qualifying heat pump in a non-Comfort Advantage existing home."
},
{
"measure": "new_home_comfort_advantage_plus_heat_pump_or_geothermal",
"amountCents": 50000,
"requirements": "Comfort Advantage Plus new home with 15.2 SEER2 or 16 SEER or higher heat pump, or qualifying GSHP."
},
{
"measure": "additional_qualified_heat_pump_system",
"amountCents": 15000,
"unit": "per additional system",
"requirements": "Additional qualified heat pump system."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "PRVEPA lists fixed cash incentives for qualifying Comfort Advantage heat pump and geothermal installations.",
"sourceUrls": [
"[https://help.prvepa.com/article/29-comfort-advantage](https://help.prvepa.com/article/29-comfort-advantage)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "non_cash",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Qualifying new Comfort Advantage homes may receive free underground service up to 150 feet; no dollar value is calculable without PRVEPA service construction costs.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"project_type",
"underground_service_length_feet",
"comfort_advantage_tier",
"service_construction_cost"
],
"missingInputsForTypicalRetroFiEstimate": [
"service_construction_cost",
"underground_service_length_feet"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "prvepa_comfort_advantage_non_cash",
"selectionInput": "project_type",
"rows": [
{
"measure": "comfort_advantage_basic_non_cash_underground_service",
"amountCents": null,
"requirements": "Free underground service up to 150 feet for qualifying new home; non-cash value depends on service construction cost."
},
{
"measure": "comfort_advantage_plus_non_cash_underground_service",
"amountCents": null,
"requirements": "Free underground service up to 150 feet plus cash incentive for qualifying Plus new home."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Comfort Advantage Basic and Plus include free underground service up to 150 feet for qualifying new homes.",
"sourceUrls": [
"[https://help.prvepa.com/article/29-comfort-advantage](https://help.prvepa.com/article/29-comfort-advantage)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "move_to_special_workflow",
"reason": "Air sealing is a Comfort Advantage standard or requirement, not a standalone prescriptive rebate."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "A qualifying ground-source heat pump is supported in the Comfort Advantage Plus incentive."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "The source lists cash incentives for qualifying heat pump installations."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Generic high-efficiency HVAC replacement is unsupported unless narrowed to a qualifying heat pump or geothermal system."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "move_to_special_workflow",
"reason": "Insulation is a Comfort Advantage home standard, not a separate rebate measure."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "No explicit stacking rule found in reviewed source."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://help.prvepa.com/article/29-comfort-advantage](https://help.prvepa.com/article/29-comfort-advantage)"
],
"evidenceText": "PRVEPA Comfort Advantage provides fixed heat pump/geothermal incentives and non-cash underground service value for qualifying homes.",
"reasoningNotes": "Envelope measures remain requirements in the Comfort Advantage workflow and should not be presented as separate standalone rebates.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3466",
"opportunityName": "Duke Energy - Non-Residential Energy Efficiency Rebate Program",
"repairStatus": "source_inaccessible",
"calculationStatus": "source_inaccessible_repair_failure",
"sourceConfidence": "medium",
"estimateConfidence": "low",
"cashValueClassifications": [
"unknown"
],
"primaryValueModelKinds": [
"source_inaccessible"
],
"effects": [
{
"effectType": "no_cash_value",
"cashValueClassification": "unknown",
"valueModelKind": "source_inaccessible",
"timing": "unknown",
"formulaText": "Current Duke Smart Saver business pages did not expose a reliable official rate table for the targeted compressed-air, refrigeration, insulation or window-film measures.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"service_territory",
"measure_type",
"equipment_specifications",
"project_cost",
"kWh_savings_or_unit_count"
],
"missingInputsForTypicalRetroFiEstimate": [
"current_official_rate_table",
"measure_type",
"eligible_units_or_savings"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": null,
"selectionInput": null,
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "none"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Official Duke Smart Saver pages were not sufficiently accessible to extract current formulas for the target measures.",
"sourceUrls": [
"[https://www.duke-energy.com/business/products/smartsaver/all-smartsaver-rebates](https://www.duke-energy.com/business/products/smartsaver/all-smartsaver-rebates)",
"[https://www.duke-energy.com/business/products/smartsaver](https://www.duke-energy.com/business/products/smartsaver)",
"[https://www.duke-energy.com/business/products/smartsaver/industrial-equipment](https://www.duke-energy.com/business/products/smartsaver/industrial-equipment)",
"[https://dukeenergyefficiency.secure.force.com/onlineportal/](https://dukeenergyefficiency.secure.force.com/onlineportal/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "efficient_air_compressor",
"action": "needs_review",
"reason": "Compressed-air measures appear program-relevant, but the current official formula was inaccessible."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "needs_review",
"reason": "Refrigeration appears program-relevant, but no current official rate table was accessible."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "needs_review",
"reason": "Only narrow roof or cool-roof/insulation measures may be supported; generic insulation requires official verification."
},
{
"retrofitTypeId": "window_film_shading_retrofit",
"action": "needs_review",
"reason": "Window film appears in business efficiency materials, but the current official formula was inaccessible."
},
{
"retrofitTypeId": "window_replacement",
"action": "delete_bad_edge",
"reason": "Reviewed sources support window film, not replacement windows, for this nonresidential record."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Unknown because current official program terms were not accessible."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.duke-energy.com/business/products/smartsaver/all-smartsaver-rebates](https://www.duke-energy.com/business/products/smartsaver/all-smartsaver-rebates)",
"[https://www.duke-energy.com/business/products/smartsaver](https://www.duke-energy.com/business/products/smartsaver)",
"[https://www.duke-energy.com/business/products/smartsaver/industrial-equipment](https://www.duke-energy.com/business/products/smartsaver/industrial-equipment)",
"[https://dukeenergyefficiency.secure.force.com/onlineportal/](https://dukeenergyefficiency.secure.force.com/onlineportal/)"
],
"evidenceText": "Duke's current Smart Saver pages were not sufficiently accessible to extract official current formulas for the target measures.",
"reasoningNotes": "Do not use older DSIRE or third-party amounts as final proof. Human review should obtain the current Duke application or rate table.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Current official Duke Smart Saver rate table or application was not accessible in reliable text.",
"Target measures require official current values before a calculation rule is created."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4645",
"opportunityName": "Eversource - Commercial New Construction Energy Efficiency Rebate Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate",
"technical_assistance",
"process_value"
],
"primaryValueModelKinds": [
"custom_quote",
"competitive_cost_share",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "custom_quote",
"timing": "application_process",
"formulaText": "NHSaves commercial new construction incentives are determined by the selected project pathway, preapproval, eligible measures, modeled performance or savings, and utility review; no reusable fixed formula was verified.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"project_pathway",
"service_territory",
"project_type",
"building_square_feet",
"modeled_kWh_savings",
"modeled_therm_savings",
"peak_demand_savings",
"eligible_incremental_cost",
"preapproval_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"project_pathway",
"utility_approved_incentive",
"modeled_savings",
"eligible_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": null,
"selectionInput": null,
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "NHSaves describes pathways for new construction, major renovation, systems, prescriptive and custom equipment, but project review controls value.",
"sourceUrls": [
"[https://www.eversource.com/content/business/save-money-energy/equipment-rebates-discounts](https://www.eversource.com/content/business/save-money-energy/equipment-rebates-discounts)",
"[https://nhsaves.com/learn/service/new-construction-high-performance-buildings/](https://nhsaves.com/learn/service/new-construction-high-performance-buildings/)",
"[https://nhsaves.com/instant-rebates-new-or-replacement-equipment/](https://nhsaves.com/instant-rebates-new-or-replacement-equipment/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "boiler_controls_burner_retrofit",
"action": "keep",
"reason": "Boiler reset and related controls are listed among eligible business equipment measures, subject to current pathway review."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "Boilers are listed among eligible business equipment measures, subject to current pathway review."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Commercial HVAC and systems pathways are supported for eligible new construction, renovation or replacement projects."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "needs_review",
"reason": "Refrigeration was not verified as a target-specific rate in the new-construction pathway; allow only if utility approves under prescriptive or custom rules."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Programmable or limited thermostat controls are eligible business equipment measures when included in the approved pathway."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Many commercial incentives require preapproval; stacking must follow NHSaves project-specific approval."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.eversource.com/content/business/save-money-energy/equipment-rebates-discounts](https://www.eversource.com/content/business/save-money-energy/equipment-rebates-discounts)",
"[https://nhsaves.com/learn/service/new-construction-high-performance-buildings/](https://nhsaves.com/learn/service/new-construction-high-performance-buildings/)",
"[https://nhsaves.com/instant-rebates-new-or-replacement-equipment/](https://nhsaves.com/instant-rebates-new-or-replacement-equipment/)"
],
"evidenceText": "The current NHSaves route supports commercial new construction and equipment pathways, but incentive value is project-specific.",
"reasoningNotes": "Treat this as a custom-quote workflow until the applicable NHSaves current measure table or approved incentive is available.",
"humanReviewRequired": true,
"humanReviewReasons": [
"A current project pathway or approved incentive is needed before calculating a customer-facing amount."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4982",
"opportunityName": "PSE&G - Government and Non-Profit Facility Direct Install Efficiency Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate",
"financing",
"process_value",
"non_cash"
],
"primaryValueModelKinds": [
"custom_quote",
"capped_percent_of_eligible_cost",
"loan_or_financing",
"non_cash_process_value"
],
"effects": [
{
"effectType": "process_value",
"cashValueClassification": "process_value",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Program begins with a free on-site assessment and detailed cost estimate for eligible PSE&G business customers; the assessment itself has no customer cash formula.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"pseg_business_customer_status",
"facility_size_or_usage",
"assessment_completed"
],
"missingInputsForTypicalRetroFiEstimate": [
"assessment_scope"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": null,
"selectionInput": null,
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "PSE&G Direct Install starts with a free on-site assessment and measure-specific proposal.",
"sourceUrls": [
"[https://bizenergy.pseg.com/direct-install-program](https://bizenergy.pseg.com/direct-install-program)",
"[https://bizenergy.pseg.com/public-service](https://bizenergy.pseg.com/public-service)",
"[https://bizsaveportal.pseg.com/](https://bizsaveportal.pseg.com/)"
]
},
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "capped_percent_of_eligible_cost",
"timing": "post_installation_reimbursement",
"formulaText": "For approved Direct Install projects, PSE&G may cover a share of project cost; reviewed materials indicate customer repayment can be as little as 20%, so treat 80% as a maximum cap, not an expected value.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.8,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"approved_scope_of_work",
"total_project_cost",
"pseg_approved_incentive",
"customer_repayment_share",
"on_bill_repayment_terms"
],
"missingInputsForTypicalRetroFiEstimate": [
"approved_scope_of_work",
"total_project_cost",
"approved_incentive"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": null,
"selectionInput": null,
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Direct Install incentives depend on the approved assessment and proposal; an 80% incentive share is only an upper-bound scenario.",
"sourceUrls": [
"[https://bizenergy.pseg.com/direct-install-program](https://bizenergy.pseg.com/direct-install-program)",
"[https://bizenergy.pseg.com/public-service](https://bizenergy.pseg.com/public-service)",
"[https://bizsaveportal.pseg.com/](https://bizsaveportal.pseg.com/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "energy_audit",
"action": "move_to_special_workflow",
"reason": "The audit is a free assessment step in the direct-install workflow."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Direct Install covers approved commercial HVAC measures after assessment."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Business energy-saving programs include approved refrigeration measures, subject to assessment."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "delete_bad_edge",
"reason": "Generic insulation is not a default Direct Install measure in the reviewed source."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Lighting is a typical Direct Install measure under the program."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Direct Install incentive and on-bill repayment terms are determined in the approved project proposal."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://bizenergy.pseg.com/direct-install-program](https://bizenergy.pseg.com/direct-install-program)",
"[https://bizenergy.pseg.com/public-service](https://bizenergy.pseg.com/public-service)",
"[https://bizsaveportal.pseg.com/](https://bizsaveportal.pseg.com/)"
],
"evidenceText": "PSE&G Direct Install is a site-assessment and approved-proposal workflow, not a reusable prescriptive formula.",
"reasoningNotes": "Show the free assessment and approved incentive only after PSE&G produces a proposal; do not default to the maximum cost-share cap.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2599",
"opportunityName": "Central New Mexico Electric Cooperative - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"fixed_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Use the current CNMEC appliance or HPWH form row for qualifying residential appliances; application must include member documentation and be submitted within the form deadline.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"cnmec_account_or_bill",
"measure_type",
"purchase_date",
"ENERGY_STAR_status",
"product_size",
"replacement_fuel",
"proof_of_recycling_or_photos",
"receipt"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"purchase_date",
"qualification_documentation"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "cnmec_2025_appliance_hpwh_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "refrigerator_or_freezer_recycling",
"amountCents": 6000,
"maxUnits": 2,
"requirements": "Recycle full-size refrigerator/freezer at least 7.75 cubic feet; proof of recycling required."
},
{
"measure": "electric_clothes_dryer",
"amountCents": 3000,
"requirements": "ENERGY STAR appliance form."
},
{
"measure": "heat_pump_clothes_dryer",
"amountCents": 9000,
"requirements": "ENERGY STAR appliance form."
},
{
"measure": "induction_cooktop_or_range_electric_to_induction",
"amountCents": 10000,
"requirements": "Residential 30-inch or larger induction cooktop/range replacing electric cooking."
},
{
"measure": "induction_cooktop_or_range_gas_to_induction_or_new_construction",
"amountCents": 35000,
"requirements": "Residential 30-inch or larger induction cooktop/range; gas replacement verification required."
},
{
"measure": "heat_pump_water_heater",
"amountCents": 35000,
"requirements": "30-55 gallon ENERGY STAR HPWH; EnergyGuide card and receipt required."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "CNMEC forms publish fixed rebates for refrigerator/freezer recycling, dryers, induction cooking and HPWHs.",
"sourceUrls": [
"[https://cnmec.org/cnmec-member-rebates](https://cnmec.org/cnmec-member-rebates)",
"[https://cnmec.org/sites/default/files/appliance-rebate-form-2025.pdf](https://cnmec.org/sites/default/files/appliance-rebate-form-2025.pdf)",
"[https://cnmec.org/sites/default/files/electric-heat-pump-water-heater-rebate-form-2025.pdf](https://cnmec.org/sites/default/files/electric-heat-pump-water-heater-rebate-form-2025.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "needs_review",
"reason": "The CNMEC page lists heat pump rebates, but an accessible current ASHP/GSHP amount was not verified in the reviewed forms."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "The HPWH form publishes a fixed heat pump water heater rebate."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "delete_bad_edge",
"reason": "The source supports refrigerator/freezer recycling, not a high-efficiency refrigeration retrofit."
},
{
"retrofitTypeId": "induction_cooking_equipment",
"action": "keep",
"reason": "The appliance form publishes residential induction cooktop/range rebates."
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"action": "delete_bad_edge",
"reason": "No current CNMEC low-flow water fixture rebate was verified."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "No explicit stacking rule found in reviewed appliance and HPWH forms."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "within 90 days of purchase or installation",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://cnmec.org/cnmec-member-rebates](https://cnmec.org/cnmec-member-rebates)",
"[https://cnmec.org/sites/default/files/appliance-rebate-form-2025.pdf](https://cnmec.org/sites/default/files/appliance-rebate-form-2025.pdf)",
"[https://cnmec.org/sites/default/files/electric-heat-pump-water-heater-rebate-form-2025.pdf](https://cnmec.org/sites/default/files/electric-heat-pump-water-heater-rebate-form-2025.pdf)"
],
"evidenceText": "CNMEC forms provide fixed residential appliance, induction and HPWH values; heat-pump HVAC rates require separate form verification.",
"reasoningNotes": "Do not map refrigerator/freezer recycling to commercial refrigeration or low-flow fixtures to this program.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4524",
"opportunityName": "NV Energy -Energy Smart Schools Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate",
"technical_assistance",
"process_value"
],
"primaryValueModelKinds": [
"custom_quote",
"competitive_cost_share",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "custom_quote",
"timing": "application_process",
"formulaText": "Schools submit a pre-application for prescriptive or custom measures; NV Energy performs review, pre-inspection, preapproval, reservation, final application and post-inspection before payment.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"eligible_school_status",
"measure_type",
"proposed_scope",
"estimated_kWh_savings",
"project_cost",
"preapproval_status",
"post_inspection_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"approved_scope",
"approved_incentive",
"verified_savings"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": null,
"selectionInput": null,
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "The Energy Smart Schools summary lists eligible measure families but requires preapproval and verification before rebate payment.",
"sourceUrls": [
"[https://www.nvenergy.com/save-with-powershift/schools](https://www.nvenergy.com/save-with-powershift/schools)",
"[https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/smart-school/EnergySmartSchools_ProgramSummary.pdf](https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/smart-school/EnergySmartSchools_ProgramSummary.pdf)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "technical_assistance",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Program advisors may help identify energy-efficiency opportunities at no cost; advisor support has no standalone cash formula.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"school_contact",
"facility_information",
"advisor_engagement"
],
"missingInputsForTypicalRetroFiEstimate": [
"advisor_scope"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": null,
"selectionInput": null,
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "NV Energy describes advisor help for schools to identify opportunities and navigate the program.",
"sourceUrls": [
"[https://www.nvenergy.com/save-with-powershift/schools](https://www.nvenergy.com/save-with-powershift/schools)",
"[https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/smart-school/EnergySmartSchools_ProgramSummary.pdf](https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/smart-school/EnergySmartSchools_ProgramSummary.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "energy_management_system",
"action": "keep",
"reason": "EMS optimization and retrocommissioning are listed as eligible school measures."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "HVAC upgrades and VFDs on HVAC systems are listed as eligible school measures."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Interior and exterior lighting upgrades are listed as eligible measures."
},
{
"retrofitTypeId": "window_film_shading_retrofit",
"action": "keep",
"reason": "Window film is listed as an eligible project type."
},
{
"retrofitTypeId": "window_replacement",
"action": "delete_bad_edge",
"reason": "The current school summary supports window film, not replacement windows."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Funding is limited and projects require preapproval and fund reservation."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.nvenergy.com/save-with-powershift/schools](https://www.nvenergy.com/save-with-powershift/schools)",
"[https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/smart-school/EnergySmartSchools_ProgramSummary.pdf](https://www.nvenergy.com/publish/content/dam/nvenergy/brochures_arch/save-with-powershift/smart-school/EnergySmartSchools_ProgramSummary.pdf)"
],
"evidenceText": "NV Energy's school program lists eligible efficiency project types but uses a preapproval and verified-savings workflow.",
"reasoningNotes": "Do not convert example project savings or rebate amounts into a reusable formula.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Current prescriptive rates were not found in reviewed school materials."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4845",
"opportunityName": "American Municipal Power (Public Electric Utilities) - Efficiency Smart Residential Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"fixed_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Select the qualifying Efficiency Smart home rebate row for the participating utility customer; rebate is the fixed amount and cannot exceed purchase price.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1.0,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"participating_utility",
"service_address",
"measure_type",
"purchase_date",
"ENERGY_STAR_or_efficiency_rating",
"tons_or_capacity",
"purchase_price"
],
"missingInputsForTypicalRetroFiEstimate": [
"participating_utility",
"measure_type",
"purchase_date",
"equipment_rating",
"purchase_price"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "efficiency_smart_home_energy_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "smart_thermostat",
"amountCents": 10000,
"maxUnitsPerYear": 2
},
{
"measure": "refrigerator",
"amountCents": 5000,
"maxUnitsPerYear": 2,
"requirements": "ENERGY STAR, 10-30 cubic feet."
},
{
"measure": "clothes_washer",
"amountCents": 5000,
"maxUnitsPerYear": 1
},
{
"measure": "electric_clothes_dryer",
"amountCents": 5000,
"maxUnitsPerYear": 1
},
{
"measure": "combined_washer_dryer",
"amountCents": 10000,
"requirements": "Eligible washer plus dryer combination."
},
{
"measure": "heat_pump_water_heater",
"amountCents": 30000,
"maxUnitsPerYear": 1
},
{
"measure": "central_air_conditioner",
"amountCents": 10000,
"maxUnitsPerYear": 2,
"requirements": "Split SEER2 at least 15.2 and EER2 at least 12.0, or single package SEER2 at least 15.2 and EER2 at least 11.5."
},
{
"measure": "cold_climate_air_source_heat_pump_less_than_2_tons",
"amountCents": 35000,
"maxUnitsPerYear": 2
},
{
"measure": "cold_climate_air_source_heat_pump_2_tons_or_more",
"amountCents": 75000,
"maxUnitsPerYear": 2
},
{
"measure": "air_source_heat_pump",
"amountCents": 10000,
"maxUnitsPerYear": 2
},
{
"measure": "window_room_air_conditioner_promo_through_2026_09_30",
"amountCents": 15000,
"requirements": "Window air conditioner promotion; not replacement windows."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Efficiency Smart publishes fixed home rebate amounts for heat pumps, AC, thermostats, refrigerators and laundry appliances.",
"sourceUrls": [
"[https://www.efficiencysmart.org/home-energy-rebates](https://www.efficiencysmart.org/home-energy-rebates)",
"[https://www.efficiencysmart.org/home-energy-rebates/apply](https://www.efficiencysmart.org/home-energy-rebates/apply)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "The home rebate table lists air-source and cold-climate air-source heat pump rebates."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "The table lists residential clothes washer and electric dryer rebates, not commercial laundry."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "The table lists residential refrigerator rebates, not commercial refrigeration systems."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "The table lists a smart thermostat rebate."
},
{
"retrofitTypeId": "window_replacement",
"action": "delete_bad_edge",
"reason": "The source lists a window room air conditioner rebate, not replacement windows."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate covers up to purchase price; no additional stacking rule was found."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "within three months of purchase and no later than January 7 of the following year",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.efficiencysmart.org/home-energy-rebates](https://www.efficiencysmart.org/home-energy-rebates)",
"[https://www.efficiencysmart.org/home-energy-rebates/apply](https://www.efficiencysmart.org/home-energy-rebates/apply)"
],
"evidenceText": "Efficiency Smart publishes fixed residential rebate amounts for participating public-power customers, subject to purchase-price and timing limits.",
"reasoningNotes": "Residential appliance rebates should not be broadened into commercial refrigeration or laundry retrofit categories.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3639",
"opportunityName": "OG&E - Commercial Energy Efficiency Rebate Programs",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate",
"process_value",
"technical_assistance"
],
"primaryValueModelKinds": [
"custom_quote",
"capped_percent_of_eligible_cost",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "capped_percent_of_eligible_cost",
"timing": "application_process",
"formulaText": "For eligible Small Business projects, OG&E materials state that up to 90% of energy-efficient upgrade costs may be covered; exact value requires assessment, approved measures and contractor scope.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.9,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"customer_segment",
"measure_type",
"assessment_result",
"approved_scope",
"project_cost",
"approved_incentive"
],
"missingInputsForTypicalRetroFiEstimate": [
"customer_segment",
"approved_scope",
"project_cost",
"approved_incentive"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": null,
"selectionInput": null,
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "OG&E describes small-business assessments and installations with up to 90% of upgrade costs covered.",
"sourceUrls": [
"[https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/commercial-industrial-energy-efficiency](https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/commercial-industrial-energy-efficiency)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "process_value",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "C&I, school and small-business paths include consultation, assessments, benchmarking or guidance; these support services have no standalone cash formula.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"customer_segment",
"facility_type",
"program_path"
],
"missingInputsForTypicalRetroFiEstimate": [
"program_path"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": null,
"selectionInput": null,
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "OG&E lists consultations, benchmarking, assessments and guidance as part of its business efficiency offerings.",
"sourceUrls": [
"[https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/commercial-industrial-energy-efficiency](https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/commercial-industrial-energy-efficiency)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "building_benchmarking_compliance",
"action": "move_to_special_workflow",
"reason": "Benchmarking is a support or analysis feature, not a physical retrofit or compliance rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Commercial HVAC systems, tune-ups and smart thermostats are listed in OG&E business efficiency offerings."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Refrigeration is listed among business efficiency and midstream offerings."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "delete_bad_edge",
"reason": "Current OG&E commercial materials reviewed do not support generic insulation upgrades."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "LED lighting retrofits and instant discounts are listed in business offerings."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Small-business support is described as up to 90% of upgrade costs; other paths are program-specific."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/commercial-industrial-energy-efficiency](https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/commercial-industrial-energy-efficiency)"
],
"evidenceText": "OG&E lists business HVAC, lighting, refrigeration, controls and support services, but exact measure rates are assessment or channel dependent.",
"reasoningNotes": "Use approved project or midstream discount data rather than defaulting to a generic per-unit formula.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22431",
"opportunityName": "OTEC - Commercial Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"per_unit_award",
"rate_table",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Select the OTEC commercial packet row for HVAC, thermostat, window or insulation measure; calculate per-ton, per-horsepower, per-square-foot or fixed amount, with OTEC/BPA approval where required.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"otec_commercial_member_status",
"measure_type",
"tons",
"horsepower",
"outdoor_unit_count",
"glass_square_feet",
"insulation_square_feet",
"existing_heating_type",
"existing_insulation_level",
"qualified_product_status",
"buy_local_status",
"preapproval_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"units_or_area",
"precondition_status",
"qualified_product_status"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "otec_commercial_rebate_packets",
"selectionInput": "measure_type_and_units",
"rows": [
{
"measure": "heat_pump_retrofit_all_other",
"rateCents": 65000,
"rateUnit": "per ton",
"requirements": "Electric-resistance precondition and qualifying efficiency."
},
{
"measure": "heat_pump_upgrade_all_other",
"rateCents": 10000,
"rateUnit": "per ton",
"requirements": "Existing electric heat pump precondition and qualifying efficiency."
},
{
"measure": "ductless_heat_pump_retrofit",
"rateCents": 65000,
"rateUnit": "per ton",
"requirements": "Electric-resistance precondition and qualified product list."
},
{
"measure": "ductless_heat_pump_upgrade",
"rateCents": 20000,
"rateUnit": "per ton",
"requirements": "Qualifying upgrade under ductless packet."
},
{
"measure": "ductless_heat_pump_other_heating_or_not_qpl",
"amountCents": 50000,
"unit": "per outdoor unit"
},
{
"measure": "advanced_rooftop_unit_controls",
"minRateCents": 6500,
"maxRateCents": 10000,
"rateUnit": "per ton",
"requirements": "Qualified product list; RTU at least 5 tons with constant-speed supply fan."
},
{
"measure": "vrf_system",
"rateCents": 65000,
"rateUnit": "per ton"
},
{
"measure": "vfd_on_air_handling_unit",
"rateCents": 20000,
"rateUnit": "per horsepower"
},
{
"measure": "connected_thermostat",
"amountCents": 10000,
"requirements": "Qualified product; exclusions for lodging, 24/7 operation and semi-conditioned spaces."
},
{
"measure": "connected_thermostat_programming_verification",
"amountCents": 4000,
"maxUnits": 4,
"requirements": "Up to four verification rebates in first two years."
},
{
"measure": "commercial_windows",
"rateCents": 1170,
"rateUnit": "per square foot of glass",
"requirements": "Electric heat, building under 20,000 square feet, eligible existing windows and U-factor requirements."
},
{
"measure": "wall_insulation",
"minRateCents": 65,
"maxRateCents": 81,
"rateUnit": "per square foot",
"requirements": "Electric heat and zero existing insulation."
},
{
"measure": "attic_or_floor_insulation",
"minRateCents": 114,
"maxRateCents": 127,
"rateUnit": "per square foot",
"requirements": "Electric heat and zero existing insulation."
},
{
"measure": "buy_local_bonus",
"percent": 0.1,
"maxAmountCents": 5000,
"requirements": "Where packet allows a buy-local bonus."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "OTEC commercial packets publish rates for heat pumps, RTU controls, VRF, VFDs, thermostats, windows and insulation.",
"sourceUrls": [
"[https://www.otec.coop/commercial-rebates](https://www.otec.coop/commercial-rebates)",
"[https://www.otec.coop/commercial](https://www.otec.coop/commercial)",
"[https://www.otec.coop/sites/default/files/commercial-heating-cooling-packet-all-other-options-fillable-6_22.pdf](https://www.otec.coop/sites/default/files/commercial-heating-cooling-packet-all-other-options-fillable-6_22.pdf)",
"[https://www.otec.coop/sites/default/files/commercial-heating-cooling-packet-ductless-fillable-6_22.pdf](https://www.otec.coop/sites/default/files/commercial-heating-cooling-packet-ductless-fillable-6_22.pdf)",
"[https://www.otec.coop/sites/default/files/commercial-web-enabled-connected-thermostat-packet-fillable-6_22.pdf](https://www.otec.coop/sites/default/files/commercial-web-enabled-connected-thermostat-packet-fillable-6_22.pdf)",
"[https://www.otec.coop/sites/default/files/commercial-windows-packet-fillable-6_22.pdf](https://www.otec.coop/sites/default/files/commercial-windows-packet-fillable-6_22.pdf)",
"[https://www.otec.coop/sites/default/files/commercial-insulation-packet-fillable-6_22.pdf](https://www.otec.coop/sites/default/files/commercial-insulation-packet-fillable-6_22.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Commercial heat pump packets publish per-ton retrofit and upgrade rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Supported when narrowed to qualifying heat pumps, VRF, advanced RTU controls or VFD-on-AHU measures."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Commercial insulation packets publish per-square-foot rates for eligible electric-heated buildings."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "The connected thermostat packet publishes a fixed thermostat rebate and verification payments."
},
{
"retrofitTypeId": "window_replacement",
"action": "keep",
"reason": "The commercial window packet publishes a per-square-foot glass rebate for qualifying replacement windows."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Some packets allow a local-vendor bonus; projects may require OTEC or BPA approval before installation."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "within 90 days of signed agreement where preapproval applies",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.otec.coop/commercial-rebates](https://www.otec.coop/commercial-rebates)",
"[https://www.otec.coop/commercial](https://www.otec.coop/commercial)",
"[https://www.otec.coop/sites/default/files/commercial-heating-cooling-packet-all-other-options-fillable-6_22.pdf](https://www.otec.coop/sites/default/files/commercial-heating-cooling-packet-all-other-options-fillable-6_22.pdf)",
"[https://www.otec.coop/sites/default/files/commercial-heating-cooling-packet-ductless-fillable-6_22.pdf](https://www.otec.coop/sites/default/files/commercial-heating-cooling-packet-ductless-fillable-6_22.pdf)",
"[https://www.otec.coop/sites/default/files/commercial-web-enabled-connected-thermostat-packet-fillable-6_22.pdf](https://www.otec.coop/sites/default/files/commercial-web-enabled-connected-thermostat-packet-fillable-6_22.pdf)",
"[https://www.otec.coop/sites/default/files/commercial-windows-packet-fillable-6_22.pdf](https://www.otec.coop/sites/default/files/commercial-windows-packet-fillable-6_22.pdf)",
"[https://www.otec.coop/sites/default/files/commercial-insulation-packet-fillable-6_22.pdf](https://www.otec.coop/sites/default/files/commercial-insulation-packet-fillable-6_22.pdf)"
],
"evidenceText": "OTEC commercial packets provide calculable per-unit and fixed rates for HVAC, thermostats, windows and insulation.",
"reasoningNotes": "Lighting and other projects may still require OTEC custom review if not listed in the packets.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4132",
"opportunityName": "FirstEnergy (Met-Ed, Penelec, Penn Power, and West Penn) - Commercial and Industrial Energy Efficiency Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate",
"technical_assistance",
"process_value"
],
"primaryValueModelKinds": [
"rate_table",
"formula_grant",
"custom_quote",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "Select the applicable BizSolutions track; calculate incentive from verified annual kWh savings, average summer/winter peak kW reduction, or controlled watts, subject to project caps and preapproval rules.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 50000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.8,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"firstenergy_pa_utility",
"program_track",
"annual_kWh_savings",
"average_peak_kW_savings",
"controlled_watts",
"eligible_project_cost",
"preapproval_required",
"installation_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"program_track",
"verified_savings_or_controlled_watts",
"eligible_project_cost"
],
"rateTable": {
"tableId": "firstenergy_pa_bizsolutions_2026_rates",
"dimensions": [
"program_track",
"annual_kWh_savings",
"average_peak_kW_savings",
"controlled_watts",
"eligible_cost"
],
"rows": [
{
"programTrack": "custom_projects",
"kWhRateDollars": 0.04,
"demandRateDollarsPerKW": 250,
"maxAwardCents": 50000000
},
{
"programTrack": "prescriptive_non_lighting_projects",
"kWhRateDollars": 0.04,
"demandRateDollarsPerKW": 250,
"maxAwardCents": 50000000
},
{
"programTrack": "prescriptive_lighting",
"kWhRateDollars": 0.01,
"demandRateDollarsPerKW": 100,
"maxAwardCents": 50000000
},
{
"programTrack": "lighting_controls",
"controlledWattRateDollars": 0.15,
"maxAwardCents": 50000000
},
{
"programTrack": "solar_and_combined_heat_and_power",
"kWhRateDollars": 0.04,
"demandRateDollarsPerKW": 250,
"maxAwardCents": 50000000
},
{
"programTrack": "agriculture",
"kWhRateDollars": 0.04,
"demandRateDollarsPerKW": 250,
"maxAwardCents": 50000000
},
{
"programTrack": "custom_building_improvement",
"maxPercentOfEligibleCost": 0.8,
"maxAwardCents": 50000000
},
{
"programTrack": "instant_discount",
"maxAwardCents": 1000000
}
]
},
"measureCatalog": {
"catalogId": null,
"selectionInput": null,
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "BizSolutions publishes kWh, kW and controlled-watt incentive rates plus project caps for multiple C&I tracks.",
"sourceUrls": [
"[https://www.firstenergycorp.com/save_energy/save_energy_pennsylvania/for_your_business_pa.html](https://www.firstenergycorp.com/save_energy/save_energy_pennsylvania/for_your_business_pa.html)",
"[https://www.energysavepa-bizsolutions.com/](https://www.energysavepa-bizsolutions.com/)",
"[https://www.energysavepa-bizsolutions.com/fepa/programs/](https://www.energysavepa-bizsolutions.com/fepa/programs/)",
"[https://www.energysavepa-bizsolutions.com/fepa/apply-now/](https://www.energysavepa-bizsolutions.com/fepa/apply-now/)",
"[https://energysavepa-rcx.com/](https://energysavepa-rcx.com/)",
"[https://energysavepa-tuneup.com/program-ally](https://energysavepa-tuneup.com/program-ally)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "technical_assistance",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Virtual commissioning, building tune-up, audits and design assistance are service workflows; use approved program terms rather than a fixed customer cash estimate.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"service_path",
"facility_type",
"utility_account",
"approved_scope"
],
"missingInputsForTypicalRetroFiEstimate": [
"approved_scope",
"service_path"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": null,
"selectionInput": null,
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "FirstEnergy PA program pages list commissioning, tune-up, design and application support paths alongside rebates.",
"sourceUrls": [
"[https://www.firstenergycorp.com/save_energy/save_energy_pennsylvania/for_your_business_pa.html](https://www.firstenergycorp.com/save_energy/save_energy_pennsylvania/for_your_business_pa.html)",
"[https://www.energysavepa-bizsolutions.com/](https://www.energysavepa-bizsolutions.com/)",
"[https://www.energysavepa-bizsolutions.com/fepa/programs/](https://www.energysavepa-bizsolutions.com/fepa/programs/)",
"[https://www.energysavepa-bizsolutions.com/fepa/apply-now/](https://www.energysavepa-bizsolutions.com/fepa/apply-now/)",
"[https://energysavepa-rcx.com/](https://energysavepa-rcx.com/)",
"[https://energysavepa-tuneup.com/program-ally](https://energysavepa-tuneup.com/program-ally)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "combined_heat_and_power_system",
"action": "keep",
"reason": "BizSolutions lists solar and combined heat and power with a kWh plus kW incentive formula."
},
{
"retrofitTypeId": "energy_audit",
"action": "move_to_special_workflow",
"reason": "Audits and design assistance are service workflows, not simple installed-equipment rebate edges."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "HVAC measures can qualify under prescriptive non-lighting or custom tracks using published savings formulas."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Prescriptive lighting has a published kWh plus kW formula."
},
{
"retrofitTypeId": "retro_commissioning_study",
"action": "move_to_special_workflow",
"reason": "Retro-commissioning is a study/service workflow with project-specific implementation value."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Project incentives are capped; custom building improvement can be limited to 80% of project cost."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.firstenergycorp.com/save_energy/save_energy_pennsylvania/for_your_business_pa.html](https://www.firstenergycorp.com/save_energy/save_energy_pennsylvania/for_your_business_pa.html)",
"[https://www.energysavepa-bizsolutions.com/](https://www.energysavepa-bizsolutions.com/)",
"[https://www.energysavepa-bizsolutions.com/fepa/programs/](https://www.energysavepa-bizsolutions.com/fepa/programs/)",
"[https://www.energysavepa-bizsolutions.com/fepa/apply-now/](https://www.energysavepa-bizsolutions.com/fepa/apply-now/)",
"[https://energysavepa-rcx.com/](https://energysavepa-rcx.com/)",
"[https://energysavepa-tuneup.com/program-ally](https://energysavepa-tuneup.com/program-ally)"
],
"evidenceText": "FirstEnergy PA BizSolutions publishes current C&I savings-based formulas and caps for custom, prescriptive, lighting, controls and CHP tracks.",
"reasoningNotes": "Demand savings must use the program's defined average of summer and winter peak periods.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5756",
"opportunityName": "Rhode Island Energy (Electric) Commercial and Industrial Rebate Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"custom_quote",
"measure_catalog"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "custom_quote",
"timing": "point_of_sale",
"formulaText": "Rhode Island Energy commercial incentives are offered through instant or approved business incentive channels; use the current product/dealer or application quote for HVAC, refrigeration, controls, lighting or custom measures.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"commercial_account_status",
"measure_type",
"fuel_or_electric_service",
"equipment_specification",
"participating_dealer_or_application",
"approved_incentive",
"project_cost"
],
"missingInputsForTypicalRetroFiEstimate": [
"current_official_rate_table",
"measure_type",
"approved_incentive"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": null,
"selectionInput": null,
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Current RI sources identify commercial HVAC, refrigeration, lighting, controls, foodservice and custom incentive categories, but exact target rates were not extracted.",
"sourceUrls": [
"[https://energy.ri.gov/incentives](https://energy.ri.gov/incentives)",
"[https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/savings-for-your-business/instant-commercial-rebates](https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/savings-for-your-business/instant-commercial-rebates)",
"[https://www.rienergy.com/site/-/media/rie-jss-app/home/ways-to-save/rebates-and-savings-programs/commercial-savings/0125-rie-hvac-ri_commercial_collateral-hvac-customerflyer.ashx?hash=44D7FCBEF644B6A4969EA7DD4B2E5A66&sc_lang=en](https://www.rienergy.com/site/-/media/rie-jss-app/home/ways-to-save/rebates-and-savings-programs/commercial-savings/0125-rie-hvac-ri_commercial_collateral-hvac-customerflyer.ashx?hash=44D7FCBEF644B6A4969EA7DD4B2E5A66&sc_lang=en)",
"[https://www.rienergy.com/site/-/media/rie-jss-app/home/ways-to-save/rebates-and-savings-programs/commercial-savings/0125_RIE_CM_4747382_Foodservice_FLY_Updates_CLEAN-Final.ashx?hash=A71F781A400113CA76864FB28F2DC3DA&sc_lang=en](https://www.rienergy.com/site/-/media/rie-jss-app/home/ways-to-save/rebates-and-savings-programs/commercial-savings/0125_RIE_CM_4747382_Foodservice_FLY_Updates_CLEAN-Final.ashx?hash=A71F781A400113CA76864FB28F2DC3DA&sc_lang=en)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Commercial heat pumps are listed in current Rhode Island business incentive materials."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Commercial HVAC and AC incentives are listed, subject to product and program rules."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Commercial refrigeration incentives are listed in current business materials."
},
{
"retrofitTypeId": "hvac_controls_retrofit",
"action": "keep",
"reason": "Economizer and HVAC control measures are within the current commercial HVAC/control categories."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Commercial lighting and lighting controls are listed as instant or business incentives."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "The same equipment generally cannot receive duplicate Rhode Island Energy incentives; exact stacking is measure-specific."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://energy.ri.gov/incentives](https://energy.ri.gov/incentives)",
"[https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/savings-for-your-business/instant-commercial-rebates](https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/savings-for-your-business/instant-commercial-rebates)",
"[https://www.rienergy.com/site/-/media/rie-jss-app/home/ways-to-save/rebates-and-savings-programs/commercial-savings/0125-rie-hvac-ri_commercial_collateral-hvac-customerflyer.ashx?hash=44D7FCBEF644B6A4969EA7DD4B2E5A66&sc_lang=en](https://www.rienergy.com/site/-/media/rie-jss-app/home/ways-to-save/rebates-and-savings-programs/commercial-savings/0125-rie-hvac-ri_commercial_collateral-hvac-customerflyer.ashx?hash=44D7FCBEF644B6A4969EA7DD4B2E5A66&sc_lang=en)",
"[https://www.rienergy.com/site/-/media/rie-jss-app/home/ways-to-save/rebates-and-savings-programs/commercial-savings/0125_RIE_CM_4747382_Foodservice_FLY_Updates_CLEAN-Final.ashx?hash=A71F781A400113CA76864FB28F2DC3DA&sc_lang=en](https://www.rienergy.com/site/-/media/rie-jss-app/home/ways-to-save/rebates-and-savings-programs/commercial-savings/0125_RIE_CM_4747382_Foodservice_FLY_Updates_CLEAN-Final.ashx?hash=A71F781A400113CA76864FB28F2DC3DA&sc_lang=en)"
],
"evidenceText": "Rhode Island Energy's current business materials confirm eligible C&I categories, but exact rate rows were not reliably extracted.",
"reasoningNotes": "Use current dealer/application incentive data before calculating a customer-facing value.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Current official commercial HVAC/refrigeration/lighting rate rows should be extracted from the live application or PDFs before numeric estimates."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5171",
"opportunityName": "AEP (Central) - CitySmart Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "medium",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate",
"technical_assistance",
"process_value"
],
"primaryValueModelKinds": [
"custom_quote",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "custom_quote",
"timing": "application_process",
"formulaText": "CitySmart is a public-sector project workflow; incentive value must come from AEP Texas approval of the eligible measure scope and documented savings, not from a reusable per-unit refrigeration or compressor formula.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"aep_texas_central_service",
"public_sector_customer_status",
"measure_type",
"approved_scope",
"documented_kWh_or_kW_savings",
"project_cost",
"approved_incentive"
],
"missingInputsForTypicalRetroFiEstimate": [
"approved_scope",
"savings_documentation",
"approved_incentive"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": null,
"selectionInput": null,
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "AEP Texas commercial references list CitySmart/public-sector efficiency categories, but the detailed CitySmart rate table was not readable.",
"sourceUrls": [
"[https://aeptxsaves.com/](https://aeptxsaves.com/)",
"[https://aeptxsaves.com/commercial-programs/](https://aeptxsaves.com/commercial-programs/)",
"[https://aeptxsaves.com/commercial-programs/commercial-standard-offer/](https://aeptxsaves.com/commercial-programs/commercial-standard-offer/)",
"[https://aeptexasefficiency.com/#/](https://aeptexasefficiency.com/#/)",
"[https://programs.dsireusa.org/system/program/detail/5171/aep-central-citysmart-program](https://programs.dsireusa.org/system/program/detail/5171/aep-central-citysmart-program)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "technical_assistance",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Benchmarking and master planning are technical-assistance steps for public-sector customers and should not be valued as physical retrofit rebates.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"facility_data",
"program_path",
"technical_assistance_scope"
],
"missingInputsForTypicalRetroFiEstimate": [
"technical_assistance_scope"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": null,
"selectionInput": null,
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Benchmarking and planning are support activities rather than installed retrofit value formulas.",
"sourceUrls": [
"[https://aeptxsaves.com/](https://aeptxsaves.com/)",
"[https://aeptxsaves.com/commercial-programs/](https://aeptxsaves.com/commercial-programs/)",
"[https://aeptxsaves.com/commercial-programs/commercial-standard-offer/](https://aeptxsaves.com/commercial-programs/commercial-standard-offer/)",
"[https://aeptexasefficiency.com/#/](https://aeptexasefficiency.com/#/)",
"[https://programs.dsireusa.org/system/program/detail/5171/aep-central-citysmart-program](https://programs.dsireusa.org/system/program/detail/5171/aep-central-citysmart-program)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "building_benchmarking_compliance",
"action": "move_to_special_workflow",
"reason": "Benchmarking is technical assistance or planning, not a physical compliance retrofit rebate."
},
{
"retrofitTypeId": "efficient_air_compressor",
"action": "delete_bad_edge",
"reason": "Efficient air compressor was not verified for the current CitySmart public-sector offering."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "HVAC and controls measures are supported for eligible CitySmart/public-sector projects."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "delete_bad_edge",
"reason": "Refrigeration was not verified for CitySmart and appears, if at all, in separate commercial offerings."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Lighting efficiency is supported for eligible CitySmart/public-sector projects."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Stacking and incentive caps must be determined from AEP Texas project approval."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://aeptxsaves.com/](https://aeptxsaves.com/)",
"[https://aeptxsaves.com/commercial-programs/](https://aeptxsaves.com/commercial-programs/)",
"[https://aeptxsaves.com/commercial-programs/commercial-standard-offer/](https://aeptxsaves.com/commercial-programs/commercial-standard-offer/)",
"[https://aeptexasefficiency.com/#/](https://aeptexasefficiency.com/#/)",
"[https://programs.dsireusa.org/system/program/detail/5171/aep-central-citysmart-program](https://programs.dsireusa.org/system/program/detail/5171/aep-central-citysmart-program)"
],
"evidenceText": "AEP Texas CitySmart remains a public-sector project workflow, but current detailed rate logic was not accessible enough for a numeric formula.",
"reasoningNotes": "False refrigeration and compressor edges were removed because the current CitySmart support evidence centers on public-sector HVAC, lighting, controls and envelope work.",
"humanReviewRequired": true,
"humanReviewReasons": [
"CitySmart detail page did not expose a current usable rate table.",
"AEP approval is needed for the exact project incentive."
]
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:5853"
}
