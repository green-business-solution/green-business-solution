{
"schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
"researchedAt": "2026-07-02",
"source": "gpt_pro",
"batchNumber": 7,
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3029",
"opportunityName": "City of Tallahassee Utilities - Residential Energy Efficiency Rebate Program",
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
"timing": "post_installation_reimbursement",
"formulaText": "Bill-credit rebate equals the published fixed amount for each qualifying residential electric HVAC or ENERGY STAR appliance measure; rebate cannot exceed total installed cost where stated.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 4000,
"maxAmountCents": 75000,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying residential electric HVAC equipment",
"qualifying ENERGY STAR residential appliances",
"installation cost where applicable"
],
"ineligibleCostCategories": [
"natural gas heat pump water heater replacements",
"commercial appliances",
"lighting not listed on current pages"
],
"requiredInputs": [
"measure_type",
"unit_count",
"equipment_efficiency_tier",
"ENERGY_STAR_status",
"replacement_fuel",
"installed_cost"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"equipment_efficiency_tier",
"installed_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "tallahassee_residential_2026_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "heat_pump_water_heater",
"amountCents": 30000,
"requirements": "ENERGY STAR heat pump-style water heater; not available when replacing natural gas water heating."
},
{
"measure": "water_source_heat_pump",
"amountCents": 75000,
"requirements": "Must meet listed water-source heat pump efficiency requirements."
},
{
"measure": "central_air_conditioner_or_air_source_heat_pump",
"minAmountCents": 10000,
"maxAmountCents": 35000,
"requirements": "Amount depends on SEER2, EER2, and HSPF2 tier."
},
{
"measure": "ENERGY_STAR_dishwasher",
"amountCents": 4000,
"requirements": "Residential ENERGY STAR dishwasher."
},
{
"measure": "ENERGY_STAR_freezer",
"amountCents": 4000,
"requirements": "Residential ENERGY STAR freezer."
},
{
"measure": "ENERGY_STAR_refrigerator",
"amountCents": 7500,
"requirements": "Residential ENERGY STAR refrigerator."
},
{
"measure": "ENERGY_STAR_clothes_washer",
"amountCents": 10000,
"requirements": "Residential ENERGY STAR clothes washer."
},
{
"measure": "variable_speed_pool_pump",
"amountCents": 20000,
"requirements": "Qualifying residential pool pump."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "City pages list fixed residential bill-credit rebates for heat pumps, water-source heat pumps, heat pump water heaters, ENERGY STAR dishwashers, freezers, refrigerators, clothes washers, and pool pumps.",
"sourceUrls": [
"[https://www.talgov.com/you/you-products-home-hvac-rebates.aspx](https://www.talgov.com/you/you-products-home-hvac-rebates.aspx)",
"[https://www.talgov.com/you/you-products-home-es-rebates](https://www.talgov.com/you/you-products-home-es-rebates)",
"[https://www.talgov.com/you/you-products-home-es-rebates-terms](https://www.talgov.com/you/you-products-home-es-rebates-terms)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Official HVAC page lists qualifying residential electric air-source heat pump rebates by efficiency tier."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Official HVAC page lists a fixed residential heat pump water heater rebate."
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"action": "delete_bad_edge",
"reason": "Official source supports a residential ENERGY STAR dishwasher appliance rebate, not commercial dishwashing equipment."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "delete_bad_edge",
"reason": "The checked residential electric rebate pages do not support furnace replacement under this opportunity."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Central air conditioner and heat pump replacement tiers are source-backed, but the edge should be limited to listed electric HVAC measures."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "Official appliance page lists an ENERGY STAR residential clothes washer rebate."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Official appliance page lists residential refrigerator and freezer rebates; not commercial refrigeration."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "delete_bad_edge",
"reason": "No current official residential LED lighting rebate was verified for this opportunity."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "HVAC rebate is limited so it cannot exceed total installed cost where stated."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "Within 90 days of final inspection for HVAC where stated",
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.talgov.com/you/you-products-home-index](https://www.talgov.com/you/you-products-home-index)",
"[https://www.talgov.com/you/you-products-home-hvac-rebates.aspx](https://www.talgov.com/you/you-products-home-hvac-rebates.aspx)",
"[https://www.talgov.com/you/you-products-home-es-rebates](https://www.talgov.com/you/you-products-home-es-rebates)",
"[https://www.talgov.com/you/you-products-home-es-rebates-terms](https://www.talgov.com/you/you-products-home-es-rebates-terms)"
],
"evidenceText": "Tallahassee residential electric rebate pages list fixed bill-credit rebates for eligible HVAC systems, heat pump water heaters, and selected ENERGY STAR residential appliances.",
"reasoningNotes": "Prompt batch source cited: . Repaired rule keeps source-backed residential electric measures and removes unsupported commercial, furnace, and LED edges.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4656",
"opportunityName": "Georgia Power -  Commercial Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"rate_table"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Rebate equals the applicable 2026 CEEP prescriptive amount per unit, per motor, per room, per ton, per horsepower, or per area, subject to measure specifications, documentation, annual building caps, and 50% equipment-cost caps.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 10000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.5,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": 10000000,
"annualCapCents": 10000000,
"programBudgetCents": null
},
"eligibleCostCategories": [
"eligible equipment cost",
"qualifying commercial HVAC",
"qualifying lighting",
"qualifying water heating",
"qualifying food service and grocery equipment",
"qualifying controls"
],
"ineligibleCostCategories": [
"residential measures",
"nonqualifying ECM refrigeration interpretation"
],
"requiredInputs": [
"measure_type",
"unit_count",
"tons",
"horsepower",
"square_feet",
"equipment_capacity_Btuh",
"efficiency_rating",
"eligible_equipment_cost",
"building_annual_rebate_total"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"tons",
"equipment_capacity_Btuh",
"eligible_equipment_cost"
],
"rateTable": {
"tableId": "georgia_power_ceep_2026_selected_rates",
"dimensions": [
"measure_type",
"capacity",
"unit_basis"
],
"rows": [
{
"measure": "commercial_heat_pump_water_heater",
"amountCents": 50000,
"rateUnit": "unit",
"requirements": "UEF at least 2.2 and first-hour rating at least 45 gallons per hour at 125°F."
},
{
"measure": "commercial_dishwasher",
"amountCents": 35000,
"rateUnit": "unit",
"requirements": "ENERGY STAR 3.0 commercial dishwasher."
},
{
"measure": "smart_wifi_thermostat",
"amountCents": 7500,
"rateUnit": "unit",
"requirements": "Replaces standard or programmable thermostat at least ten years old and meets intelligent recovery requirements."
},
{
"measure": "ductless_mini_split_heat_pump",
"rateCents": 10000,
"rateUnit": "ton",
"requirements": "Under 5.4 tons and meets listed SEER2/HSPF2 requirements."
},
{
"measure": "air_source_heat_pump_under_65k_Btuh",
"amountCents": 40000,
"rateUnit": "unit",
"requirements": "Split or single-packaged air-source heat pump under 65,000 Btu/h."
},
{
"measure": "VFD",
"rateCents": 5000,
"rateUnit": "horsepower",
"requirements": "Qualifying HVAC or process variable-frequency drive."
},
{
"measure": "VAV_box_ECM",
"amountCents": 5000,
"rateUnit": "motor",
"requirements": "ECM on VAV fan-powered box; not a refrigeration EC motor rebate."
}
]
},
"measureCatalog": {
"catalogId": "georgia_power_ceep_2026_catalog",
"selectionInput": "measure_type",
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Georgia Power CEEP publishes 2026 commercial prescriptive tables for HVAC, lighting, water heating, food service, grocery, and controls with annual building and equipment-cost caps.",
"sourceUrls": [
"[https://www.georgiapower.com/business/products-programs/efficiency-maintenance/ceep.html](https://www.georgiapower.com/business/products-programs/efficiency-maintenance/ceep.html)",
"[https://georgiapowercommercialrebates.com/](https://georgiapowercommercialrebates.com/)",
"[https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Heating_and_Cooling_v05_Release_Web.pdf](https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Heating_and_Cooling_v05_Release_Web.pdf)",
"[https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Water_Heater_v05_Release_Web.pdf](https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Water_Heater_v05_Release_Web.pdf)",
"[https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Food_Service_and_Grocery_v05_Release_Web.pdf](https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Food_Service_and_Grocery_v05_Release_Web.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "energy_management_system",
"action": "keep",
"reason": "CEEP includes commercial energy management and guest-room controls measures."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Commercial heat pump and ductless heat pump HVAC measures are published in the CEEP HVAC sheet."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Commercial heat pump water heater rebate is listed at a fixed per-unit amount."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "CEEP includes qualifying air conditioners, heat pumps, chillers, and related HVAC equipment."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "CEEP includes existing-building lighting rebate categories."
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"action": "keep",
"reason": "CEEP includes lighting controls and related control measures."
},
{
"retrofitTypeId": "refrigeration_ec_motor_retrofit",
"action": "delete_bad_edge",
"reason": "The verified ECM measure is for VAV fan-powered boxes, not refrigeration EC motor replacement."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "The CEEP HVAC sheet lists a smart Wi-Fi thermostat rebate with replacement requirements."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Prescriptive incentives are capped at 50% of eligible equipment cost and annual building caps apply."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "Required project documentation must be submitted through the commercial rebate portal under current program rules.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.georgiapower.com/business/products-programs/efficiency-maintenance/ceep.html](https://www.georgiapower.com/business/products-programs/efficiency-maintenance/ceep.html)",
"[https://georgiapowercommercialrebates.com/](https://georgiapowercommercialrebates.com/)",
"[https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Heating_and_Cooling_v05_Release_Web.pdf](https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Heating_and_Cooling_v05_Release_Web.pdf)",
"[https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Water_Heater_v05_Release_Web.pdf](https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Water_Heater_v05_Release_Web.pdf)",
"[https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Existing_Building_Lighting_v05_Release_Web.pdf](https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Existing_Building_Lighting_v05_Release_Web.pdf)",
"[https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Food_Service_and_Grocery_v05_Release_Web.pdf](https://www.georgiapower.com/content/dam/georgia-power/pdfs/programs/ceep/57401_GP_Commercial_26-28_Food_Service_and_Grocery_v05_Release_Web.pdf)"
],
"evidenceText": "Georgia Power’s current CEEP materials provide commercial prescriptive rebate tables and caps for HVAC, lighting, controls, water heating, and food service or grocery equipment.",
"reasoningNotes": "Legacy HPWH and dishwasher rules are source-backed, but the ECM edge was overbroad and should not be treated as refrigeration EC motor support.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2278",
"opportunityName": "Sawnee EMC - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate",
"tariff_or_rate"
],
"primaryValueModelKinds": [
"measure_catalog",
"capped_percent_of_eligible_cost",
"rate_table"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "One-time bill-credit rebate equals the fixed or capped published amount for the selected residential measure; several measures use 50% of total cost up to the listed cap.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 2000,
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
"eligibleCostCategories": [
"qualifying Level 2 EV charger and installation cost",
"qualifying attic insulation",
"qualifying heat pump water heater",
"qualifying HVAC system",
"qualifying smart thermostat"
],
"ineligibleCostCategories": [
"air sealing not listed on current residential page",
"duct sealing not listed on current residential page",
"commercial DC fast charging"
],
"requiredInputs": [
"measure_type",
"unit_count",
"total_cost",
"tons",
"equipment_efficiency",
"load_management_enrollment",
"smart_savers_enrollment",
"rate_participation",
"installation_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"total_cost",
"tons",
"enrollment_status"
],
"rateTable": {
"tableId": "sawnee_residential_2026_selected_rates",
"dimensions": [
"measure_type",
"cost_or_tons"
],
"rows": [
{
"measure": "attic_insulation",
"percent": 0.5,
"maxAmountCents": 20000,
"requirements": "R-49 or greater; newer homes excluded under current rules."
},
{
"measure": "level_2_ev_charger",
"percent": 0.5,
"maxAmountCents": 20000,
"requirements": "Qualifying fully electric vehicle and required TOU, PEV, or CPPR rate participation."
},
{
"measure": "heat_pump_water_heater",
"amountCents": 20000,
"requirements": "Qualifying hybrid or heat pump water heater."
},
{
"measure": "existing_home_heat_pump_or_central_air_conditioner",
"rateCents": 10000,
"rateUnit": "ton",
"requirements": "Qualifying SEER2 and Sawnee load management switch required."
},
{
"measure": "smart_thermostat",
"amountCents": 2500,
"requirements": "Requires Smart Savers or Load Management enrollment."
}
]
},
"measureCatalog": {
"catalogId": "sawnee_residential_2026_catalog",
"selectionInput": "measure_type",
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Sawnee lists current residential incentives for attic insulation, HPWHs, HVAC tune-ups, pool pumps, smart thermostats with enrollment, Level 2 chargers, heat pumps, and central AC.",
"sourceUrls": [
"[https://sawnee.coop/rebates-and-incentives](https://sawnee.coop/rebates-and-incentives)",
"[https://sawnee.coop/level-2-charger-rebate-requirements](https://sawnee.coop/level-2-charger-rebate-requirements)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "annual",
"formulaText": "Demand-response participation can provide seasonal bill credits, such as $30 per eligible switch or thermostat paid in monthly seasonal installments, where enrolled.",
"amountCents": 3000,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 3000,
"caps": {
"maxAwardCents": 3000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": 3000,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"program_enrollment",
"eligible_device_count",
"seasonal_participation"
],
"missingInputsForTypicalRetroFiEstimate": [
"program_enrollment",
"eligible_device_count"
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
"evidenceText": "Sawnee lists seasonal load-management and Smart Savers bill credits in addition to one-time equipment rebates.",
"sourceUrls": [
"[https://sawnee.coop/rebates-and-incentives](https://sawnee.coop/rebates-and-incentives)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "delete_bad_edge",
"reason": "Current Sawnee residential rebate sources checked do not list an air-sealing rebate."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "delete_bad_edge",
"reason": "Current Sawnee residential rebate sources checked do not list duct sealing or duct insulation."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "Source-backed EV support is limited to qualifying Level 2 chargers, not generic EV charging."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Current page lists air-source heat pump rebates by ton with load-management requirements."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Current page supports qualifying central AC and heat pump systems, subject to efficiency and load-management rules."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Current page lists an attic insulation rebate with R-value and home-age restrictions."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Level 2 charger rebate is published with a 50% cost cap and rate-participation requirements."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Smart thermostat rebate is listed when paired with required program enrollment."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Several rebates are first come, first served and issued as bill credits; participation requirements may also create recurring seasonal credits."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "2026 residential rebate submissions must be made by the stated year-end deadline where listed.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://sawnee.coop/rebates-and-incentives](https://sawnee.coop/rebates-and-incentives)",
"[https://sawnee.coop/level-2-charger-rebate-requirements](https://sawnee.coop/level-2-charger-rebate-requirements)"
],
"evidenceText": "Sawnee’s current rebate page supports selected residential equipment rebates and demand-response credits, while air sealing and duct sealing were not verified.",
"reasoningNotes": "Legacy EV charger rule repaired from a fixed $200 assumption to a capped 50% cost model for Level 2 charging only.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5035",
"opportunityName": "Dominion Energy - ThermWise Residential Energy Efficiency Rebate Programs",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"rate_table",
"hybrid_rate_plus_cap"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "ThermWise rebate equals the published fixed amount, per-square-foot rate, per-linear-foot rate, or hybrid base-plus-rate amount for the selected qualifying gas or weatherization measure.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 5000,
"maxAmountCents": 120000,
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
"eligibleCostCategories": [
"qualifying natural gas HVAC equipment",
"qualifying smart thermostats",
"qualifying ERV",
"qualifying weatherization",
"qualifying gas water heating"
],
"ineligibleCostCategories": [
"standalone all-electric heat pumps",
"all-electric heat pump water heaters",
"non-gas measures outside weatherization"
],
"requiredInputs": [
"measure_type",
"unit_count",
"AFUE",
"thermostat_tier",
"conditioned_floor_area_square_feet",
"insulation_square_feet",
"duct_linear_feet",
"window_square_feet",
"single_family_or_multifamily",
"existing_R_value",
"final_R_value"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"AFUE",
"square_feet",
"linear_feet",
"housing_type"
],
"rateTable": {
"tableId": "thermwise_residential_idaho_selected_weatherization_rates",
"dimensions": [
"measure_type",
"housing_type",
"quantity"
],
"rows": [
{
"measure": "window_replacement",
"rateCents": 250,
"rateUnit": "square_foot",
"requirements": "U-value 0.22 or lower."
},
{
"measure": "wall_insulation",
"rateCents": 30,
"rateUnit": "square_foot",
"requirements": "R-11 increment."
},
{
"measure": "floor_insulation",
"rateCents": 20,
"rateUnit": "square_foot",
"requirements": "R-19 increment."
},
{
"measure": "attic_insulation_tier_1",
"rateCents": 32,
"rateUnit": "square_foot",
"requirements": "Add R-19 and finish at R-49 to R-60."
},
{
"measure": "duct_sealing_and_insulation_single_family",
"amountCents": 10000,
"rateCents": 525,
"rateUnit": "linear_foot",
"maxAmountCents": 45000,
"requirements": "Single-family duct sealing and insulation."
},
{
"measure": "duct_sealing_and_insulation_multifamily",
"amountCents": 10000,
"rateCents": 525,
"rateUnit": "linear_foot",
"maxAmountCents": 25000,
"requirements": "Multifamily duct sealing and insulation."
},
{
"measure": "air_sealing_single_family",
"amountCents": 20000,
"rateCents": 10,
"rateUnit": "square_foot_conditioned_floor_area",
"maxAmountCents": 85000,
"requirements": "Single-family air sealing."
}
]
},
"measureCatalog": {
"catalogId": "thermwise_residential_idaho_appliance_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "smart_thermostat_tier_1",
"amountCents": 5000
},
{
"measure": "smart_thermostat_tier_2",
"amountCents": 7500
},
{
"measure": "gas_furnace_95_to_97_4_AFUE",
"amountCents": 30000
},
{
"measure": "gas_furnace_97_5_AFUE_or_greater_with_ECM",
"amountCents": 35000
},
{
"measure": "residential_gas_boiler_reset_control",
"amountCents": 10000
},
{
"measure": "residential_gas_boiler_85_to_94_9_AFUE",
"amountCents": 40000
},
{
"measure": "residential_gas_boiler_95_AFUE_or_greater",
"amountCents": 60000
},
{
"measure": "energy_recovery_ventilation",
"amountCents": 30000
},
{
"measure": "dual_fuel_heat_pump_with_gas_backup",
"minAmountCents": 70000,
"maxAmountCents": 120000,
"requirements": "Amount depends on tier and whether the gas backup is existing or newly installed."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "ThermWise lists fixed gas appliance rebates and published weatherization rates for eligible residential natural gas customers in Idaho, Utah, and Wyoming.",
"sourceUrls": [
"[https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates](https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates)",
"[https://www.enbridgegas.com/utwyid/save-money/thermwise/weatherization-rebates](https://www.enbridgegas.com/utwyid/save-money/thermwise/weatherization-rebates)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "Weatherization page lists residential air sealing incentives with base and square-foot components."
},
{
"retrofitTypeId": "boiler_controls_burner_retrofit",
"action": "keep",
"reason": "Appliance page lists a residential gas boiler reset control rebate."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "keep",
"reason": "Weatherization page lists duct sealing and insulation rates with caps."
},
{
"retrofitTypeId": "energy_recovery_ventilation_retrofit",
"action": "keep",
"reason": "Appliance page lists an energy recovery ventilation rebate for qualifying gas-heated homes."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "Appliance page lists residential gas boiler rebates by AFUE tier."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "Appliance page lists residential gas furnace rebates by AFUE tier."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Weatherization page lists attic, wall, floor, and exterior insulation incentives."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Appliance page lists Tier 1 and Tier 2 smart thermostat rebates."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Application must generally be postmarked within six months of installation; measure-specific contractor and prequalification rules apply."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "Application postmarked within six months of installation where stated.",
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.enbridgegas.com/utwyid/save-money/thermwise](https://www.enbridgegas.com/utwyid/save-money/thermwise)",
"[https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates](https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates)",
"[https://www.enbridgegas.com/utwyid/save-money/thermwise/weatherization-rebates](https://www.enbridgegas.com/utwyid/save-money/thermwise/weatherization-rebates)"
],
"evidenceText": "Current ThermWise pages provide fixed gas appliance rebates and weatherization rate tables for eligible residential natural gas customers.",
"reasoningNotes": "Repaired as a natural-gas and weatherization package; standalone electric heat pumps or electric HPWHs remain blocked.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5233",
"opportunityName": "Peoples Gas - Residential Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"rate_table",
"hybrid_rate_plus_cap"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Rebate equals the published fixed equipment amount, weatherization rate, or capped weatherization amount for an eligible Peoples Gas residential gas customer; rebate may not exceed project cost.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 2000,
"maxAmountCents": 120000,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying gas heating equipment",
"qualifying gas water heating equipment",
"qualifying thermostats",
"qualifying weatherization",
"qualifying pipe insulation"
],
"ineligibleCostCategories": [
"electric measures",
"commercial measures",
"generic HVAC not listed as a gas measure"
],
"requiredInputs": [
"measure_type",
"unit_count",
"AFUE",
"UEF",
"CFM_reduction",
"square_feet",
"linear_feet",
"project_cost",
"installation_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"AFUE",
"CFM_reduction",
"square_feet",
"linear_feet",
"project_cost"
],
"rateTable": {
"tableId": "peoples_gas_residential_weatherization_2026",
"dimensions": [
"measure_type",
"quantity"
],
"rows": [
{
"measure": "air_sealing",
"rateCents": 40,
"rateUnit": "CFM_reduction",
"maxAmountCents": 40000
},
{
"measure": "wall_insulation",
"rateCents": 50,
"rateUnit": "square_foot",
"maxAmountCents": 40000,
"requirements": "Must be bundled with air sealing."
},
{
"measure": "attic_insulation",
"rateCents": 30,
"rateUnit": "square_foot",
"maxAmountCents": 50000,
"requirements": "Existing R-0 to R-14, installed to R-49 or greater, bundled with air sealing."
},
{
"measure": "furnace_duct_sealing",
"rateCents": 200,
"rateUnit": "CFM25_reduction",
"maxAmountCents": 40000
},
{
"measure": "space_heating_or_DHW_pipe_insulation",
"rateCents": 100,
"rateUnit": "linear_foot",
"maxUnits": 300
}
]
},
"measureCatalog": {
"catalogId": "peoples_gas_residential_2026_equipment",
"selectionInput": "measure_type",
"rows": [
{
"measure": "smart_thermostat",
"amountCents": 2500
},
{
"measure": "programmable_thermostat",
"amountCents": 2000
},
{
"measure": "gas_furnace_95_AFUE_or_greater",
"amountCents": 20000
},
{
"measure": "gas_furnace_97_AFUE_or_greater",
"amountCents": 22500
},
{
"measure": "hot_water_boiler_90_AFUE_or_greater",
"amountCents": 30000
},
{
"measure": "hot_water_boiler_95_AFUE_or_greater",
"amountCents": 35000
},
{
"measure": "steam_boiler_82_5_AFUE_or_greater",
"amountCents": 15000
},
{
"measure": "gas_heat_pump_space_heating",
"amountCents": 57500
},
{
"measure": "gas_heat_pump_integrated_space_and_DHW",
"amountCents": 70000
},
{
"measure": "tankless_gas_water_heater_0_95_UEF_or_greater",
"amountCents": 15000
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Peoples Gas residential materials publish 2026 fixed equipment rebates and weatherization rates; applications are first come and rebates may not exceed project cost.",
"sourceUrls": [
"[https://www.peoplesgasdelivery.com/savings/rebates-residential](https://www.peoplesgasdelivery.com/savings/rebates-residential)",
"[https://www.peoplesgasdelivery.com/savings/pdf/residential_hvac.pdf](https://www.peoplesgasdelivery.com/savings/pdf/residential_hvac.pdf)",
"[https://customerrebate-efficiencynavigator.azurewebsites.net/PartnerLink?clientProgramId=304](https://customerrebate-efficiencynavigator.azurewebsites.net/PartnerLink?clientProgramId=304)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "Current residential materials list air sealing as a weatherization rebate with a CFM-reduction rate and cap."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "keep",
"reason": "Current residential materials list furnace duct sealing by CFM25 reduction with a cap."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "Current residential materials list gas boiler rebates by boiler type and AFUE."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "Current residential materials list gas furnace rebates by AFUE."
},
{
"retrofitTypeId": "high_efficiency_gas_water_heater",
"action": "keep",
"reason": "Current residential materials list qualifying gas water heating rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Generic HVAC replacement is overbroad; official support is limited to listed gas furnaces, boilers, gas heat pumps, thermostats, and pipe or duct measures."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Current residential materials list wall and attic insulation incentives with bundling and caps."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Current residential materials list smart and programmable thermostat rebates."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate may not exceed project cost; weatherization instant discounts require approved contractors and program procedures."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "Application received within 30 days of installation or by the year-end deadline where stated.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.peoplesgasdelivery.com/savings/rebates-residential](https://www.peoplesgasdelivery.com/savings/rebates-residential)",
"[https://www.peoplesgasdelivery.com/savings/pdf/residential_hvac.pdf](https://www.peoplesgasdelivery.com/savings/pdf/residential_hvac.pdf)",
"[https://customerrebate-efficiencynavigator.azurewebsites.net/PartnerLink?clientProgramId=304](https://customerrebate-efficiencynavigator.azurewebsites.net/PartnerLink?clientProgramId=304)"
],
"evidenceText": "Peoples Gas publishes residential gas equipment, thermostat, weatherization, and pipe insulation rebate amounts and caps for eligible residential gas customers.",
"reasoningNotes": "Updated duct sealing from a blocker to a supported furnace duct sealing measure based on current residential materials.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1806",
"opportunityName": "Chicopee Electric Light Department - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate",
"tariff_or_rate",
"non_cash"
],
"primaryValueModelKinds": [
"measure_catalog",
"capped_percent_of_eligible_cost",
"tariff_or_rate"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Appliance rebate equals the published fixed amount for each qualifying residential appliance; home-efficiency project incentive equals 50% of installed cost, capped at $750 per project and $3,000 per customer per year.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 3000,
"maxAmountCents": 300000,
"caps": {
"maxAwardCents": 300000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.5,
"maxUnits": null,
"perCustomerCapCents": 300000,
"perSiteCapCents": null,
"annualCapCents": 300000,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying residential ENERGY STAR appliances",
"qualifying heat pump systems",
"qualifying home-efficiency installed cost",
"air sealing",
"insulation",
"duct sealing",
"eligible heating systems"
],
"ineligibleCostCategories": [
"self-installed home-efficiency work",
"commercial induction cooking equipment",
"battery installation under this rebate"
],
"requiredInputs": [
"measure_type",
"unit_count",
"project_cost",
"audit_completed_before_work",
"post_installation_inspection",
"equipment_qualification",
"replacement_fuel"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"project_cost",
"audit_completed_before_work"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "celd_residential_2026_selected_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "heat_pump_water_heater",
"amountCents": 50000
},
{
"measure": "heat_pump_clothes_dryer",
"amountCents": 50000
},
{
"measure": "clothes_washer",
"amountCents": 5000
},
{
"measure": "electric_dryer",
"amountCents": 5000
},
{
"measure": "refrigerator",
"amountCents": 5000
},
{
"measure": "room_air_conditioner",
"amountCents": 4000
},
{
"measure": "wifi_thermostat_or_HVAC_control",
"percent": 0.5,
"maxAmountCents": 12500
},
{
"measure": "residential_induction_range_replacing_gas_or_propane",
"amountCents": 50000
},
{
"measure": "residential_induction_range_replacing_electric",
"amountCents": 10000
},
{
"measure": "qualifying_heat_pump_system",
"maxAmountCents": 225000
},
{
"measure": "home_efficiency_project",
"percent": 0.5,
"maxAmountCents": 75000,
"requirements": "Audit before contractor work; no self-install; post-installation inspection required."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "CEL lists fixed residential appliance rebates, heat pump rebates up to a cap, and a home-efficiency incentive equal to 50% of installed cost with project and annual caps.",
"sourceUrls": [
"[https://www.celd.com/energy-star-appliance-rates](https://www.celd.com/energy-star-appliance-rates)",
"[https://www.celd.com/home-efficiency-incentive-program](https://www.celd.com/home-efficiency-incentive-program)",
"[https://www.celd.com/residential-engery-conservation](https://www.celd.com/residential-engery-conservation)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "monthly",
"formulaText": "Connected Homes participants may receive monthly rewards for enrolled Wi-Fi devices, EV chargers, water heaters, mini-split controllers, or batteries; amount depends on device and program enrollment.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": "device_month",
"minAmountCents": 500,
"maxAmountCents": 3000,
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
"ineligibleCostCategories": [
"battery purchase or installation cost"
],
"requiredInputs": [
"device_type",
"device_count",
"connected_homes_enrollment",
"participation_months"
],
"missingInputsForTypicalRetroFiEstimate": [
"device_type",
"device_count",
"enrollment_status"
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
"evidenceText": "Connected Homes is a separate demand-response workflow with monthly rewards, not a battery installation rebate.",
"sourceUrls": [
"[https://www.celd.com/connected-homes](https://www.celd.com/connected-homes)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "battery_storage_system",
"action": "move_to_special_workflow",
"reason": "Battery support is through Connected Homes demand-response participation, not a purchase or installation rebate in this opportunity."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "CEL lists qualifying heat pump system rebates up to a published cap."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "CEL appliance page lists a fixed heat pump water heater rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "CEL supports qualifying room air conditioner and heat pump HVAC measures."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "CEL appliance page lists clothes washer, dryer, and heat pump dryer rebates."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "CEL appliance page lists a residential refrigerator rebate."
},
{
"retrofitTypeId": "induction_cooking_equipment",
"action": "delete_bad_edge",
"reason": "Source supports a residential induction range rebate, not commercial induction cooking equipment."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "CEL appliance page lists Wi-Fi thermostat and HVAC control rebates."
}
],
"stackingRules": {
"stackableWithRebates": false,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Appliance rebates cannot be combined with other offers where prohibited; home-efficiency projects require audit before work and post-installation inspection."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.celd.com/energy-star-appliance-rates](https://www.celd.com/energy-star-appliance-rates)",
"[https://www.celd.com/home-efficiency-incentive-program](https://www.celd.com/home-efficiency-incentive-program)",
"[https://www.celd.com/residential-engery-conservation](https://www.celd.com/residential-engery-conservation)",
"[https://www.celd.com/connected-homes](https://www.celd.com/connected-homes)"
],
"evidenceText": "CEL supports residential appliance rebates, heat pump rebates, home-efficiency project incentives, and separate Connected Homes demand-response rewards.",
"reasoningNotes": "Separated purchase rebates from demand-response rewards and narrowed induction and refrigeration to residential appliance categories.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1808",
"opportunityName": "Concord Municipal Light Plant - Commercial Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate",
"technical_assistance"
],
"primaryValueModelKinds": [
"rate_table",
"capped_percent_of_eligible_cost",
"hybrid_rate_plus_cap",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "Commercial rebate equals the published per-ton, per-kW, fixed HPWH, or capped EV station amount, subject to project cost, three-year customer caps, and preapproval rules where applicable.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 18500,
"maxAmountCents": 5000000,
"caps": {
"maxAwardCents": 5000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.5,
"maxUnits": null,
"perCustomerCapCents": 5000000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"lighting equipment and controls",
"eligible heat pump installation cost",
"eligible heat pump water heater",
"eligible Level 2 EV charger equipment and installation"
],
"ineligibleCostCategories": [
"residential-only incentives",
"natural gas heat pump projects where excluded",
"EV charger work without preapproval"
],
"requiredInputs": [
"measure_type",
"kW_reduced",
"project_cost",
"tons",
"heat_pump_type",
"water_heater_replacement_type",
"EV_station_public_or_private",
"EV_equipment_cost",
"EV_installation_cost",
"MassEVIP_grant_amount",
"preapproval_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"kW_reduced",
"project_cost",
"tons",
"replacement_type",
"preapproval_status"
],
"rateTable": {
"tableId": "cmlp_business_selected_2026_rates",
"dimensions": [
"measure_type",
"basis"
],
"rows": [
{
"measure": "HELP_existing_lighting",
"rateCents": 100000,
"rateUnit": "kW_reduced",
"percent": 0.5,
"maxAmountCents": 5000000,
"formula": "Lesser of $1,000 per kW reduced demand or 50% of lighting upgrade cost; $50,000 customer cap over three years."
},
{
"measure": "air_source_heat_pump",
"rateCents": 250000,
"rateUnit": "ton"
},
{
"measure": "variable_refrigerant_flow_heat_pump",
"rateCents": 350000,
"rateUnit": "ton"
},
{
"measure": "ground_source_heat_pump",
"rateCents": 450000,
"rateUnit": "ton"
},
{
"measure": "heat_pump_water_heater_replacing_oil_gas_or_propane_or_new_construction",
"amountCents": 75000
},
{
"measure": "heat_pump_water_heater_replacing_electric_resistance",
"amountCents": 18500
},
{
"measure": "public_Level_2_EV_station",
"maxAmountCents": 600000,
"formula": "Up to $3,000 equipment plus up to $3,000 installation, after deducting MassEVIP grant where applicable."
},
{
"measure": "private_Level_2_EV_station",
"maxAmountCents": 450000,
"formula": "Up to $2,250 equipment plus up to $2,250 installation, after deducting MassEVIP grant where applicable."
}
]
},
"measureCatalog": {
"catalogId": "cmlp_business_rebate_catalog",
"selectionInput": "measure_type",
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "CMLP business pages publish lighting, heat pump, heat pump water heater, and commercial Level 2 EV charging rebate formulas with preapproval and cap rules.",
"sourceUrls": [
"[https://concordma.gov/1989/Rebates-for-your-Business](https://concordma.gov/1989/Rebates-for-your-Business)",
"[https://concordma.gov/2003/Commercial-Lighting-Rebates---HELP](https://concordma.gov/2003/Commercial-Lighting-Rebates---HELP)",
"[https://concordma.gov/3372/Heat-Pump-Rebates-for-Your-Business](https://concordma.gov/3372/Heat-Pump-Rebates-for-Your-Business)",
"[https://concordma.gov/2024/Heat-Pump-Water-Heaters](https://concordma.gov/2024/Heat-Pump-Water-Heaters)",
"[https://concordma.gov/3201/Commercial-EV-Charging-Station-Rebate](https://concordma.gov/3201/Commercial-EV-Charging-Station-Rebate)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "energy_audit",
"action": "move_to_special_workflow",
"reason": "Business energy assessment is a technical-assistance workflow, not a physical retrofit rebate."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "Official commercial EV support is specific to preapproved Level 2 stations, not generic EV charging."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "CMLP publishes commercial heat pump rebates by heat pump type and ton."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "CMLP publishes commercial heat pump water heater rebates by replacement type."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Source supports listed commercial heat pump systems; generic HVAC should be constrained to those technologies."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "HELP program supports lighting upgrades using demand-reduction and cost-share formula."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Commercial Level 2 EV station rebate is source-backed and requires preapproval before installation."
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"action": "keep",
"reason": "HELP lighting program includes lighting controls as part of eligible lighting upgrades."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": true,
"notes": "CMLP heat pump rebates cannot combine with National Grid or Mass Save for the same equipment; EV formula deducts MassEVIP grants."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "Commercial EV charging requires preapproval and award letter before installation; HPWH applications have 90-day timing after inspection where stated.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://concordma.gov/1989/Rebates-for-your-Business](https://concordma.gov/1989/Rebates-for-your-Business)",
"[https://concordma.gov/2003/Commercial-Lighting-Rebates---HELP](https://concordma.gov/2003/Commercial-Lighting-Rebates---HELP)",
"[https://concordma.gov/3372/Heat-Pump-Rebates-for-Your-Business](https://concordma.gov/3372/Heat-Pump-Rebates-for-Your-Business)",
"[https://concordma.gov/2024/Heat-Pump-Water-Heaters](https://concordma.gov/2024/Heat-Pump-Water-Heaters)",
"[https://concordma.gov/3201/Commercial-EV-Charging-Station-Rebate](https://concordma.gov/3201/Commercial-EV-Charging-Station-Rebate)",
"[https://concordma.gov/3400/Electric-Vehicles-and-Charging-for-Comme](https://concordma.gov/3400/Electric-Vehicles-and-Charging-for-Comme)",
"[https://concordma.gov/1753/Your-Business](https://concordma.gov/1753/Your-Business)"
],
"evidenceText": "CMLP business pages provide source-backed formulas for commercial lighting, heat pumps, HPWHs, and preapproved Level 2 charging station rebates.",
"reasoningNotes": "Repaired the EV rule from a generic fixed amount to a capped Level 2 station formula with preapproval and public/private station distinctions.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4429",
"opportunityName": "Coldwater Board of Public Utilities - Commercial & Industrial Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"rate_table",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "Prescriptive rebate equals the worksheet rate for the selected measure, subject to equipment specifications, preapproval where required, 50% project-cost cap, and $30,000 per electric meter per year cap; custom incentives use $0.08 per annual kWh saved.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 3000000,
"caps": {
"maxAwardCents": 3000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.5,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": 3000000,
"programBudgetCents": null
},
"eligibleCostCategories": [
"eligible equipment",
"commercial and industrial lighting",
"HVAC controls",
"heat pumps and HVAC",
"HPWH",
"refrigeration",
"commercial kitchen equipment",
"EV charging",
"custom electricity savings"
],
"ineligibleCostCategories": [
"new construction",
"peak shaving",
"demand limiting",
"operating schedule changes",
"broad energy audits"
],
"requiredInputs": [
"measure_type",
"unit_count",
"tons",
"horsepower",
"motor_count",
"door_count",
"square_feet",
"watt_reduction",
"annual_kWh_savings",
"eligible_project_cost",
"preapproval_status",
"operating_hours"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"quantity",
"eligible_project_cost",
"operating_hours",
"preapproval_status"
],
"rateTable": {
"tableId": "cbpu_ci_2026_selected_rates",
"dimensions": [
"measure_type",
"unit_basis"
],
"rows": [
{
"measure": "programmable_smart_thermostat",
"amountCents": 10000,
"rateUnit": "unit"
},
{
"measure": "building_temperature_controls",
"rateCents": 4500,
"rateUnit": "1000_square_feet"
},
{
"measure": "VFD_HVAC_or_process",
"rateCents": 6000,
"rateUnit": "horsepower"
},
{
"measure": "mini_split_heat_pump",
"rateCents": 5000,
"rateUnit": "ton"
},
{
"measure": "packaged_terminal_heat_pump",
"rateCents": 17500,
"rateUnit": "ton"
},
{
"measure": "heat_pump_water_heater_55_gal_or_larger",
"amountCents": 85000,
"rateUnit": "unit"
},
{
"measure": "commercial_dishwasher",
"amountCents": 60000,
"rateUnit": "unit"
},
{
"measure": "walk_in_or_case_ECM",
"amountCents": 5000,
"rateUnit": "motor"
},
{
"measure": "LED_grocery_case_lighting",
"amountCents": 3500,
"rateUnit": "door"
},
{
"measure": "custom_project",
"rateCents": 8,
"rateUnit": "annual_kWh_saved"
}
]
},
"measureCatalog": {
"catalogId": "cbpu_ci_2026_measure_catalog",
"selectionInput": "measure_type",
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "CBPU’s 2026 business application publishes detailed prescriptive measure rates, custom $0.08/kWh incentives, and annual meter and project-cost caps.",
"sourceUrls": [
"[https://www.coldwater.org/232/Energy-Efficiency-Rebates](https://www.coldwater.org/232/Energy-Efficiency-Rebates)",
"[https://www.coldwater.org/DocumentCenter/View/4344/2026-Business--Industrial-Energy-Efficiency-Rebate-Application](https://www.coldwater.org/DocumentCenter/View/4344/2026-Business--Industrial-Energy-Efficiency-Rebate-Application)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "energy_audit",
"action": "delete_bad_edge",
"reason": "Broad energy audits are not a verified physical retrofit rebate in the 2026 C&I application."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "The 2026 C&I application lists heat pump and mini-split HVAC rebate rates."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "The 2026 C&I application lists a heat pump water heater rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "The 2026 C&I application lists packaged/split HVAC and heat pump equipment rates."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "The 2026 C&I application lists refrigeration lighting, controls, motors, gaskets, strip curtains, and related measures."
},
{
"retrofitTypeId": "hvac_controls_retrofit",
"action": "keep",
"reason": "The 2026 C&I application lists HVAC controls, smart thermostats, and building temperature controls."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "The 2026 C&I application lists LED lamps, fixtures, and lighting retrofit rates."
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"action": "keep",
"reason": "The 2026 C&I application lists occupancy sensors, daylight sensors, and central lighting controls."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Incentives are capped at 50% of total project cost and $30,000 per electric meter per year for prescriptive or custom pathways."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "Equipment must be operational by December 31, 2026, and invoices submitted within 30 days where stated.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.coldwater.org/232/Energy-Efficiency-Rebates](https://www.coldwater.org/232/Energy-Efficiency-Rebates)",
"[https://www.coldwater.org/DocumentCenter/View/4344/2026-Business--Industrial-Energy-Efficiency-Rebate-Application](https://www.coldwater.org/DocumentCenter/View/4344/2026-Business--Industrial-Energy-Efficiency-Rebate-Application)"
],
"evidenceText": "CBPU’s 2026 business and industrial application provides prescriptive and custom formulas for lighting, controls, HVAC, refrigeration, commercial kitchen, EV, and other electric measures.",
"reasoningNotes": "Repaired legacy rule mapping from an incorrect refrigeration model to the actual controls worksheet and broader C&I measure catalog.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4275",
"opportunityName": "Coldwater Board of Public Utilities - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
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
"formulaText": "Residential rebate equals the published fixed amount or efficiency-tier amount for each qualifying appliance, HVAC, lighting, thermostat, or EV charger measure; rebate cannot exceed purchase price where stated.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 5000,
"maxAmountCents": 50000,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying residential electric equipment",
"qualifying ENERGY STAR appliances",
"qualifying HVAC systems",
"qualifying lighting",
"qualifying thermostat"
],
"ineligibleCostCategories": [
"commercial dishwasher",
"commercial refrigeration",
"low-flow plumbing fixtures"
],
"requiredInputs": [
"measure_type",
"unit_count",
"efficiency_tier",
"equipment_cost",
"installation_date",
"ENERGY_STAR_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"efficiency_tier",
"equipment_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "cbpu_residential_2026_selected_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "ENERGY_STAR_refrigerator",
"amountCents": 5000
},
{
"measure": "ENERGY_STAR_freezer",
"amountCents": 5000
},
{
"measure": "ENERGY_STAR_heat_pump_water_heater",
"amountCents": 15000
},
{
"measure": "smart_or_wifi_thermostat",
"amountCents": 5000
},
{
"measure": "central_air_source_heat_pump",
"minAmountCents": null,
"maxAmountCents": 50000,
"requirements": "Amount depends on SEER2 efficiency tier; top tier is up to $500."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "CBPU’s 2026 residential materials list fixed rebates for refrigerators, freezers, heat pump water heaters, smart thermostats, and tiered heat pump system incentives.",
"sourceUrls": [
"[https://www.coldwater.org/232/Energy-Efficiency-Rebates](https://www.coldwater.org/232/Energy-Efficiency-Rebates)",
"[https://www.coldwater.org/DocumentCenter/View/5128/2026-Residential-Rebates-List](https://www.coldwater.org/DocumentCenter/View/5128/2026-Residential-Rebates-List)",
"[https://www.coldwater.org/DocumentCenter/View/5127/2026-CBPU-Residential-Rebate-Application-fillable-PDF](https://www.coldwater.org/DocumentCenter/View/5127/2026-CBPU-Residential-Rebate-Application-fillable-PDF)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "CBPU residential materials list central air-source heat pump and ductless or mini-split heat pump rebates."
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"action": "delete_bad_edge",
"reason": "Dishwasher support is residential appliance support, not commercial dishwasher equipment."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "CBPU residential materials list qualifying residential air conditioning and heat pump equipment."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "CBPU residential list includes qualifying laundry appliance categories."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "CBPU residential materials list ENERGY STAR refrigerator and freezer rebates."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "CBPU residential rebate list includes LED lighting or LED lamp measures."
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"action": "delete_bad_edge",
"reason": "Low-flow plumbing fixture rebate support was not verified in the residential materials."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "CBPU residential application lists smart or Wi-Fi thermostat rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate cannot exceed purchase price where stated; program operates first come, first served subject to funds."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "Submit required documentation within 90 days of completion or by December 31, 2026, whichever is earlier.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.coldwater.org/232/Energy-Efficiency-Rebates](https://www.coldwater.org/232/Energy-Efficiency-Rebates)",
"[https://www.coldwater.org/DocumentCenter/View/5128/2026-Residential-Rebates-List](https://www.coldwater.org/DocumentCenter/View/5128/2026-Residential-Rebates-List)",
"[https://www.coldwater.org/DocumentCenter/View/5127/2026-CBPU-Residential-Rebate-Application-fillable-PDF](https://www.coldwater.org/DocumentCenter/View/5127/2026-CBPU-Residential-Rebate-Application-fillable-PDF)"
],
"evidenceText": "CBPU’s 2026 residential rebate materials list residential HVAC, HPWH, thermostats, laundry, dishwasher, refrigeration, LED, induction, room AC, pool pump, and Level 2 EV categories.",
"reasoningNotes": "Kept residential appliance edges but removed commercial dishwasher, commercial interpretation, and unsupported low-flow fixture logic.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2448",
"opportunityName": "Connexus Energy - Commercial Energy Efficiency Rebate Programs",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"capped_percent_of_eligible_cost",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Commercial rebate equals the applicable Connexus prescriptive measure amount or custom-approved incentive, subject to preapproval thresholds, 50% invoiced equipment-cost cap, annual member cap, and funding availability.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 50000,
"maxAmountCents": 3000000,
"caps": {
"maxAwardCents": 3000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.5,
"maxUnits": null,
"perCustomerCapCents": 3000000,
"perSiteCapCents": null,
"annualCapCents": 3000000,
"programBudgetCents": null
},
"eligibleCostCategories": [
"eligible business equipment",
"Level 2 workplace or public EV charging",
"lighting",
"VFDs",
"HVAC and heat pumps",
"custom efficiency projects",
"commercial refrigeration",
"electric forklifts"
],
"ineligibleCostCategories": [
"low-flow water fixtures",
"vehicle purchase",
"DC fast charging under prescriptive Level 2 forms"
],
"requiredInputs": [
"measure_type",
"unit_count",
"eligible_cost",
"preapproval_status",
"charger_port_type",
"charger_kW",
"tons",
"horsepower",
"annual_kWh_savings",
"member_annual_rebate_total"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"eligible_cost",
"preapproval_status",
"quantity",
"annual_kWh_savings"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "connexus_business_selected_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "single_port_Level_2_EV_charger",
"percent": 0.5,
"maxAmountCents": 50000,
"requirements": "Preapproval required; minimum 7.7 kW, 240V, 40A circuit; commercial member."
},
{
"measure": "dual_port_or_commercial_grade_Level_2_EV_station",
"percent": 0.5,
"maxAmountCents": 100000,
"requirements": "Preapproval required; commercial or workplace station requirements apply."
},
{
"measure": "custom_energy_efficiency_project",
"amountCents": null,
"requirements": "Preapproval and custom savings review required."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Connexus business materials list prescriptive and custom commercial rebates, including Level 2 workplace or public charger rebates capped at 50% cost and annual member caps.",
"sourceUrls": [
"[https://www.connexusenergy.com/business/save-money-and-energy/programs-and-rebates](https://www.connexusenergy.com/business/save-money-and-energy/programs-and-rebates)",
"[https://www.connexusenergy.com/download_file/view/d08546ed-a2ac-45ff-b1c3-1ce5ffa3ca37/412](https://www.connexusenergy.com/download_file/view/d08546ed-a2ac-45ff-b1c3-1ce5ffa3ca37/412)",
"[https://www.connexusenergy.com/download_file/view/47815867-f172-4ce4-b3e3-7beb19ff2dc0/412](https://www.connexusenergy.com/download_file/view/47815867-f172-4ce4-b3e3-7beb19ff2dc0/412)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "electric_forklift_material_handling",
"action": "keep",
"reason": "Connexus business program includes electric forklift or material-handling equipment rebates."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "EV support is source-backed only for qualifying Level 2 workplace or public chargers, not vehicle purchases or generic DC fast charging."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Connexus business rebate categories include geothermal or ground-source heat pump measures."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Connexus business rebate categories include ductless and other heat pump HVAC measures."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Connexus business categories include qualifying HVAC, chiller, and heat pump measures."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Connexus business program includes LED lighting rebates."
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"action": "delete_bad_edge",
"reason": "Verified fixture references are lighting fixtures, not water-efficiency low-flow fixtures."
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"action": "keep",
"reason": "Connexus business program includes VFD measures."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Prescriptive and custom incentives are capped at 50% of invoiced equipment cost and a $30,000 annual member limit."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "Applications and supporting materials are due by the stated 2026 program deadline; EV forms require preapproval.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.connexusenergy.com/business/save-money-and-energy/programs-and-rebates](https://www.connexusenergy.com/business/save-money-and-energy/programs-and-rebates)",
"[https://www.connexusenergy.com/download_file/view/d08546ed-a2ac-45ff-b1c3-1ce5ffa3ca37/412](https://www.connexusenergy.com/download_file/view/d08546ed-a2ac-45ff-b1c3-1ce5ffa3ca37/412)",
"[https://www.connexusenergy.com/download_file/view/47815867-f172-4ce4-b3e3-7beb19ff2dc0/412](https://www.connexusenergy.com/download_file/view/47815867-f172-4ce4-b3e3-7beb19ff2dc0/412)"
],
"evidenceText": "Connexus business materials support LED, VFD, HVAC, heat pump, custom, refrigeration, electric forklift, and Level 2 commercial EV charging incentives.",
"reasoningNotes": "Repaired low-flow fixture false positive and narrowed EV support to Level 2 workplace or public charging.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3282",
"opportunityName": "Minnesota Power - Residential New Construction Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate",
"process_value"
],
"primaryValueModelKinds": [
"measure_catalog",
"rate_table",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "New-construction rebate equals the sum of qualifying Residential New Construction measure incentives for the new electrically heated home, including air-sealing tiers, insulation measures, heat pump bonuses, HPWH, ERV/HRV, and certification bonuses.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 10000,
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
"eligibleCostCategories": [
"new construction air sealing",
"new construction insulation",
"new construction heat pumps",
"new construction heat pump water heaters",
"ERV or HRV",
"building certification"
],
"ineligibleCostCategories": [
"existing-home retrofit work",
"LED lighting not listed on RNC page",
"homes not primarily heated with electricity"
],
"requiredInputs": [
"new_construction_status",
"primary_heating_fuel",
"ACH50",
"insulation_measure_type",
"heat_pump_type",
"tons",
"HPWH_status",
"ERV_or_HRV_SRE",
"certification_type",
"affordable_housing_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"new_construction_status",
"ACH50",
"measure_selection",
"heat_pump_type",
"tons",
"certification_type"
],
"rateTable": {
"tableId": "minnesota_power_rnc_2026_selected_rates",
"dimensions": [
"measure_type",
"tier"
],
"rows": [
{
"measure": "air_sealing_ACH50_under_1_00",
"amountCents": 170000
},
{
"measure": "air_sealing_ACH50_1_00_to_1_49",
"amountCents": 120000
},
{
"measure": "air_sealing_ACH50_1_50_to_1_99",
"amountCents": 60000
},
{
"measure": "air_sealing_ACH50_2_00_to_2_49",
"amountCents": 30000
},
{
"measure": "ground_source_heat_pump_MNGHPA_master_installer",
"rateCents": 120000,
"rateUnit": "ton"
},
{
"measure": "ground_source_heat_pump_other",
"rateCents": 100000,
"rateUnit": "ton"
},
{
"measure": "cold_climate_air_source_heat_pump",
"amountCents": 150000
},
{
"measure": "ENERGY_STAR_air_source_heat_pump",
"amountCents": 50000
},
{
"measure": "air_to_water_heat_pump",
"rateCents": 40000,
"rateUnit": "ton"
},
{
"measure": "heat_pump_water_heater",
"amountCents": 60000
},
{
"measure": "ERV_or_HRV",
"amountCents": 30000
}
]
},
"measureCatalog": {
"catalogId": "minnesota_power_rnc_2026_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "continuous_wall_insulation",
"amountCents": 80000
},
{
"measure": "foundation_wall_insulation",
"amountCents": 45000
},
{
"measure": "under_slab_insulation",
"amountCents": 22500
},
{
"measure": "attic_insulation",
"amountCents": 12500
},
{
"measure": "exposed_floor_insulation",
"amountCents": 10000
},
{
"measure": "efficient_windows",
"amountCents": 40000
},
{
"measure": "building_certification",
"amountCents": 25000
},
{
"measure": "affordable_housing_bonus",
"amountCents": 100000
},
{
"measure": "ECM_circulator_pump",
"amountCents": 20000
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Minnesota Power RNC lists new-construction incentives for air sealing, insulation, windows, heat pumps, HPWHs, ERV/HRV, certification, and bonuses.",
"sourceUrls": [
"[https://www.mnpower.com/RNC](https://www.mnpower.com/RNC)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "move_to_special_workflow",
"reason": "Air sealing is source-backed only as a residential new-construction performance measure, not an existing-home retrofit."
},
{
"retrofitTypeId": "energy_recovery_ventilation_retrofit",
"action": "move_to_special_workflow",
"reason": "ERV/HRV support is a new-construction requirement and incentive, not an existing-home retrofit."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "move_to_special_workflow",
"reason": "Ground-source heat pump incentive is source-backed only within Residential New Construction."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "move_to_special_workflow",
"reason": "Heat pump support is a new-construction measure for qualifying electrically heated homes."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "move_to_special_workflow",
"reason": "HPWH support is a new-construction measure, not an existing-home HPWH retrofit rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "move_to_special_workflow",
"reason": "HVAC incentives are for qualifying new-construction heat pump equipment, not replacement HVAC retrofits."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "move_to_special_workflow",
"reason": "Insulation incentives are construction-stage RNC measures, not existing-home insulation upgrades."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "delete_bad_edge",
"reason": "Current RNC page checked did not list an LED lighting incentive."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "This is a new-construction participation package with plan review, inspections, blower-door testing, and thermal-scan requirements."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.mnpower.com/RNC](https://www.mnpower.com/RNC)",
"[https://www.mnpower.com/rebates](https://www.mnpower.com/rebates)"
],
"evidenceText": "Minnesota Power RNC is calculable for new construction but should not be matched as existing-home retrofit work.",
"reasoningNotes": "All physical retrofit edges except LED are moved to a new-construction workflow; LED is unsupported.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2182",
"opportunityName": "Intercounty Electric Cooperative - Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"rate_table",
"capped_percent_of_eligible_cost"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Rebate equals the published Intercounty amount for each qualifying measure, including per-ton heat pump rates, fixed HPWH and thermostat amounts, capped insulation percentages, and current post-July 2025 restrictions.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 5000,
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
"eligibleCostCategories": [
"qualifying heat pump HVAC",
"qualifying ground-source heat pump",
"qualifying heat pump water heater",
"qualifying insulation",
"qualifying smart thermostat"
],
"ineligibleCostCategories": [
"Level 2 EV chargers after December 31, 2025",
"standard water heaters after June 30, 2025",
"room air conditioners after June 30, 2025",
"ducted heat pumps with electric backup after July 1, 2025"
],
"requiredInputs": [
"measure_type",
"unit_count",
"tons",
"total_cost",
"installation_date",
"backup_fuel_type",
"gas_provider_receipt",
"ENERGY_STAR_status",
"existing_insulation_condition",
"IECA_audit_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"tons",
"total_cost",
"backup_fuel_type",
"installation_date"
],
"rateTable": {
"tableId": "intercounty_current_selected_rates",
"dimensions": [
"measure_type",
"basis"
],
"rows": [
{
"measure": "heat_pump_water_heater",
"amountCents": 75000,
"maxPercentOfEligibleCost": 0.5,
"requirements": "ENERGY STAR HPWH; limit two per address; current post-June 2025 amount."
},
{
"measure": "dual_fuel_heat_pump_existing_fossil_backup",
"rateCents": 30000,
"rateUnit": "ton",
"requirements": "No electric backup after July 1, 2025."
},
{
"measure": "dual_fuel_heat_pump_new_fossil_backup",
"rateCents": 50000,
"rateUnit": "ton",
"requirements": "Gas provider receipt required; no electric backup after July 1, 2025."
},
{
"measure": "ductless_mini_split",
"amountCents": 15000,
"rateUnit": "outdoor_unit",
"requirements": "ENERGY STAR, no auxiliary electric backup, limit two per meter."
},
{
"measure": "new_ground_source_heat_pump_residential",
"rateCents": 75000,
"rateUnit": "ton",
"requirements": "Residential ten-ton maximum."
},
{
"measure": "replacement_indoor_ground_source_heat_pump",
"rateCents": 15000,
"rateUnit": "ton"
},
{
"measure": "smart_thermostat",
"amountCents": 5000,
"maxPercentOfEligibleCost": 0.5,
"requirements": "ENERGY STAR; limit two per address."
},
{
"measure": "attic_insulation",
"percent": 0.2,
"maxAmountCents": 25000,
"requirements": "After IECA audit, qualifying attic area and R-value requirements."
},
{
"measure": "basement_crawlspace_slab_insulation_with_new_GSHP",
"percent": 0.5,
"maxAmountCents": 50000
}
]
},
"measureCatalog": {
"catalogId": "intercounty_current_catalog",
"selectionInput": "measure_type",
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Intercounty lists current HPWH, dual-fuel heat pump, ductless, geothermal, insulation, and thermostat rebates and states EV charger rebates ended December 31, 2025.",
"sourceUrls": [
"[https://www.ieca.coop/rebates](https://www.ieca.coop/rebates)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "Official page says the EV charger rebate ended December 31, 2025."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Official page lists ground-source heat pump rebates by ton."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Official page lists dual-fuel ducted heat pump and ductless mini-split rebates with current restrictions."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Official page lists a current heat pump water heater rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for listed heat pump HVAC categories; generic HVAC is not supported."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Official page lists attic and limited basement/crawl/slab insulation incentives."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "delete_bad_edge",
"reason": "Official page says the Level 2 EV charger rebate ended December 31, 2025."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Official page lists an ENERGY STAR smart thermostat rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Applications generally must be submitted within 60 days; current heat pump rules require fossil backup and no electric backup for ducted systems after July 1, 2025."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "Applications generally submitted within 60 days; EV charger rebates ended December 31, 2025.",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.ieca.coop/rebates](https://www.ieca.coop/rebates)"
],
"evidenceText": "Intercounty’s official rebate page supports current HPWH, heat pump, geothermal, insulation, and thermostat rebates and removes expired EV support.",
"reasoningNotes": "Legacy $500 rule was a per-ton dual-fuel heat pump tier, not an EV charging value.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2966",
"opportunityName": "Platte-Clay Electric Cooperative - Residential and Commercial Energy Efficiency Rebates",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"tariff_or_rate"
],
"primaryValueModelKinds": [
"measure_catalog",
"rate_table",
"capped_percent_of_eligible_cost"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Rebate equals the applicable Platte-Clay published amount, per-ton heat pump rate, capped cost-share amount, or business lighting audit amount for the selected measure.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 5000,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.5,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": 3000000,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying heat pumps",
"ground-source heat pumps",
"heat pump water heaters",
"smart thermostats",
"business lighting",
"Level 2 EV chargers"
],
"ineligibleCostCategories": [
"generic EV chargers outside Level 2 requirements",
"non-business residential LED lighting under the business lighting rebate",
"unlisted HVAC replacement"
],
"requiredInputs": [
"measure_type",
"unit_count",
"tons",
"total_cost",
"lighting_equipment_cost",
"audit_result",
"charger_cost",
"annual_kWh_usage",
"off_peak_charging_agreement",
"equipment_efficiency"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"tons",
"total_cost",
"audit_result",
"off_peak_charging_agreement"
],
"rateTable": {
"tableId": "pcec_selected_current_rates",
"dimensions": [
"measure_type",
"basis"
],
"rows": [
{
"measure": "new_ground_source_heat_pump",
"rateCents": 75000,
"rateUnit": "ton"
},
{
"measure": "replacement_ground_source_heat_pump",
"rateCents": 15000,
"rateUnit": "ton"
},
{
"measure": "new_dual_fuel_heat_pump",
"rateCents": 50000,
"rateUnit": "ton"
},
{
"measure": "replacement_dual_fuel_heat_pump",
"rateCents": 30000,
"rateUnit": "ton"
},
{
"measure": "ductless_mini_split",
"amountCents": 15000,
"rateUnit": "outdoor_unit"
},
{
"measure": "heat_pump_water_heater",
"percent": 0.5,
"maxAmountCents": 50000,
"requirements": "ENERGY STAR and replacement or new-construction conditions apply."
},
{
"measure": "smart_thermostat",
"percent": 0.5,
"maxAmountCents": 5000,
"requirements": "ENERGY STAR; limit two per address."
},
{
"measure": "Level_2_EV_charger",
"percent": 0.5,
"maxAmountCents": 25000,
"requirements": "New UL-listed Level 2 charger, off-peak charging agreement, usage requirements, limit two rebates per location."
},
{
"measure": "business_lighting",
"percent": 0.4,
"maxAmountCents": 3000000,
"requirements": "Requires energy audit; existing business facilities with more than ten bulbs or fixtures."
}
]
},
"measureCatalog": {
"catalogId": "pcec_current_catalog",
"selectionInput": "measure_type",
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "PCEC lists heat pump, HPWH, smart thermostat, business lighting, and Level 2 charger rebates with per-ton, cost-share, and audit-based formulas.",
"sourceUrls": [
"[https://pcec.coop/products/energy-product-rebates/](https://pcec.coop/products/energy-product-rebates/)",
"[https://pcec.coop/wp-content/uploads/2024/06/Electric-Vehicle-Charging-Station-Rebate-7.24.pdf](https://pcec.coop/wp-content/uploads/2024/06/Electric-Vehicle-Charging-Station-Rebate-7.24.pdf)",
"[https://pcec.coop/energy/pcec-electric-vehicle-program/](https://pcec.coop/energy/pcec-electric-vehicle-program/)",
"[https://pcec.coop/products/heat-pump-systems/](https://pcec.coop/products/heat-pump-systems/)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "monthly",
"formulaText": "Some dual-fuel heat pump participants may qualify for a winter whole-house rate discount when program tariff conditions are met.",
"amountCents": null,
"percent": null,
"rate": 0.005,
"rateUnit": "dollars_per_kWh_discount",
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
"dual_fuel_heat_pump_participation",
"eligible_winter_kWh"
],
"missingInputsForTypicalRetroFiEstimate": [
"eligible_winter_kWh",
"tariff_participation"
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
"evidenceText": "PCEC heat pump materials reference a winter whole-house rate discount for eligible dual-fuel heat pump participation.",
"sourceUrls": [
"[https://pcec.coop/products/heat-pump-systems/](https://pcec.coop/products/heat-pump-systems/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "EV support is Level 2 charger-specific; the generic EV charger edge is overbroad."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "PCEC lists ground-source heat pump rebates by ton."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "PCEC lists dual-fuel and mini-split heat pump rebates."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "PCEC lists a capped heat pump water heater rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for listed geothermal, dual-fuel, ducted mini-split, or ductless mini-split heat pump categories."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "PCEC supports business lighting rebates that require an energy audit and business conditions."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "PCEC EV form supports qualifying new Level 2 chargers with cost-share cap and off-peak requirements."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "PCEC lists capped ENERGY STAR smart thermostat rebates."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Business lighting is limited by equipment cost and annual member cap; EV charger rebate requires off-peak charging conditions."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "EV charger proof of purchase must be submitted within the stated form period; business lighting requires audit before rebate determination.",
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://pcec.coop/products/energy-product-rebates/](https://pcec.coop/products/energy-product-rebates/)",
"[https://pcec.coop/wp-content/uploads/2024/06/Electric-Vehicle-Charging-Station-Rebate-7.24.pdf](https://pcec.coop/wp-content/uploads/2024/06/Electric-Vehicle-Charging-Station-Rebate-7.24.pdf)",
"[https://pcec.coop/energy/pcec-electric-vehicle-program/](https://pcec.coop/energy/pcec-electric-vehicle-program/)",
"[https://pcec.coop/products/heat-pump-systems/](https://pcec.coop/products/heat-pump-systems/)"
],
"evidenceText": "PCEC current sources support heat pump, HPWH, thermostat, business lighting, and Level 2 charger rebates, with several cost-share and audit requirements.",
"reasoningNotes": "Legacy $750 rule is per ton for new ground-source heat pumps; EV and lighting are narrower than broad retrofit edges.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2990",
"opportunityName": "PNM - Residential Energy Efficiency Rebate Program",
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
"formulaText": "Rebate or instant discount equals the published PNM residential amount for the selected pathway and qualifying product; do not double count Home Checkup, mail-in, and midstream pathways unless current PNM rules allow stacking.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 5000,
"maxAmountCents": 70000,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": 2,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying ENERGY STAR appliances",
"qualifying heat pump water heaters",
"qualifying HVAC",
"qualifying smart thermostats",
"qualifying windows",
"qualifying induction ranges or cooktops"
],
"ineligibleCostCategories": [
"commercial dishwasher",
"commercial refrigeration",
"commercial induction cooking",
"duplicate pathway rebates unless allowed"
],
"requiredInputs": [
"measure_type",
"program_pathway",
"unit_count",
"ENERGY_STAR_status",
"product_price_excluding_taxes_and_installation",
"purchase_date",
"home_checkup_completed",
"participating_distributor_or_contractor"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"program_pathway",
"unit_count",
"product_price",
"home_checkup_status"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "pnm_residential_2026_selected_rebates",
"selectionInput": "measure_type_and_pathway",
"rows": [
{
"measure": "smart_thermostat_mail_in",
"amountCents": 5000,
"requirements": "ENERGY STAR smart thermostat; limit two over program life; rebate cannot exceed product price excluding taxes, fees, and installation."
},
{
"measure": "heat_pump_water_heater_home_checkup",
"amountCents": 30000
},
{
"measure": "heat_pump_water_heater_midstream_55_gallons_or_less",
"amountCents": 70000,
"requirements": "PNM residential instant rebate; while funds available; cannot exceed product purchase price excluding taxes, shipping, and installation."
},
{
"measure": "residential_clothes_washer",
"amountCents": 11000
},
{
"measure": "residential_clothes_dryer",
"amountCents": 11000
},
{
"measure": "heat_pump_clothes_dryer",
"amountCents": 16500
},
{
"measure": "residential_dishwasher",
"amountCents": 8000
},
{
"measure": "induction_cooktop_or_range",
"amountCents": 20000
},
{
"measure": "residential_refrigerator",
"amountCents": 16500
},
{
"measure": "residential_freezer",
"amountCents": 8000
},
{
"measure": "residential_window",
"amountCents": 8000
},
{
"measure": "split_or_packaged_air_source_heat_pump_home_checkup",
"amountCents": 55000
},
{
"measure": "advanced_evaporative_cooler",
"maxAmountCents": 40000
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "PNM publishes 2026 residential appliance, thermostat, HPWH, HVAC, induction, window, and pool pump rebates across mail-in, Home Checkup, and midstream pathways.",
"sourceUrls": [
"[https://www.pnm.com/homerebates](https://www.pnm.com/homerebates)",
"[https://pnmhomecheckup.com/rebates](https://pnmhomecheckup.com/rebates)",
"[https://www.pnm.com/midstream](https://www.pnm.com/midstream)",
"[https://pnm.clearesult.com/heat-pump-water-heaters-55-gallons-or-less](https://pnm.clearesult.com/heat-pump-water-heaters-55-gallons-or-less)",
"[https://www.pnm.com/documents/d/pnm.com/3-7-8-2-18-1125_pnm_res_6208505_2026-smart-thermostat-brochure_resreb_br_clean-1-22](https://www.pnm.com/documents/d/pnm.com/3-7-8-2-18-1125_pnm_res_6208505_2026-smart-thermostat-brochure_resreb_br_clean-1-22)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "PNM residential materials list heat pump system incentives."
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"action": "delete_bad_edge",
"reason": "PNM supports residential ENERGY STAR dishwasher rebates, not commercial dishwasher equipment."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "PNM supports residential HVAC, heat pump, refrigerated air, and evaporative cooling incentives through listed pathways."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "PNM residential rebates include clothes washers, dryers, and heat pump dryers."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "PNM residential rebates include refrigerators and freezers, not commercial refrigeration."
},
{
"retrofitTypeId": "induction_cooking_equipment",
"action": "delete_bad_edge",
"reason": "PNM supports residential induction cooktop or range rebates, not commercial induction cooking equipment."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "PNM publishes a $50 ENERGY STAR smart thermostat rebate."
},
{
"retrofitTypeId": "window_replacement",
"action": "keep",
"reason": "PNM residential materials list window rebates for qualifying products."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Do not double count separate PNM mail-in, Home Checkup, and midstream pathways unless current PNM rules expressly allow the same product to receive multiple incentives."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "2026 rebate submissions must meet the stated purchase and postmark deadlines; midstream offers are while funds last.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.pnm.com/rebates](https://www.pnm.com/rebates)",
"[https://www.pnm.com/homerebates](https://www.pnm.com/homerebates)",
"[https://pnmhomecheckup.com/rebates](https://pnmhomecheckup.com/rebates)",
"[https://www.pnm.com/midstream](https://www.pnm.com/midstream)",
"[https://pnm.clearesult.com/heat-pump-water-heaters-55-gallons-or-less](https://pnm.clearesult.com/heat-pump-water-heaters-55-gallons-or-less)",
"[https://www.pnm.com/documents/d/pnm.com/3-7-8-2-18-1125_pnm_res_6208505_2026-smart-thermostat-brochure_resreb_br_clean-1-22](https://www.pnm.com/documents/d/pnm.com/3-7-8-2-18-1125_pnm_res_6208505_2026-smart-thermostat-brochure_resreb_br_clean-1-22)"
],
"evidenceText": "PNM current residential pages provide fixed rebates and instant discounts for appliances, HVAC, HPWHs, smart thermostats, induction, and windows.",
"reasoningNotes": "Repaired commercial false positives and modeled HPWH with pathway-specific amounts to avoid overcounting.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4371",
"opportunityName": "National Grid (Gas) - Commercial Energy Efficiency Rebate Programs (Metro New York)",
"repairStatus": "needs_human_review",
"calculationStatus": "needs_repair_review",
"sourceConfidence": "medium",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate",
"technical_assistance"
],
"primaryValueModelKinds": [
"custom_quote",
"source_inaccessible"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "custom_quote",
"timing": "application_process",
"formulaText": "Current value must be determined through the National Grid New York gas rebate portal or current program guide for the selected Metro New York nonresidential gas measure; no reliable fixed prescriptive table was extracted from readable current sources.",
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
"eligibleCostCategories": [
"commercial weatherization",
"duct sealing and insulation where verified",
"pipe insulation",
"custom gas efficiency measures",
"commercial gas heating and hot water where portal confirms",
"commercial kitchen gas efficiency equipment where portal confirms"
],
"ineligibleCostCategories": [
"electric measures",
"non-Metro New York territories",
"multifamily forms used to infer C&I eligibility",
"unverified boiler reset or thermostat prescriptive amounts"
],
"requiredInputs": [
"National_Grid_gas_account",
"service_territory",
"customer_class",
"measure_type",
"equipment_specification",
"eligible_project_cost",
"annual_therm_savings",
"portal_quote_or_approval",
"preapproval_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"portal_quote_or_approval",
"measure_type",
"eligible_project_cost",
"annual_therm_savings"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "national_grid_metro_ny_gas_repair_pending_portal_confirmation",
"selectionInput": "measure_type",
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "none"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Readable current sources show an active NYC business gas rebate portal and weatherization, study, facility check, and custom gas pathways, but not a full fixed measure table.",
"sourceUrls": [
"[https://www.nationalgridus.com/Services-Rebates?customerType=View+All&fuelType=Natural+Gas&locations=New+York+City&page=1&r=10](https://www.nationalgridus.com/Services-Rebates?customerType=View+All&fuelType=Natural+Gas&locations=New+York+City&page=1&r=10)",
"[https://www.amplifyincentives.com/NationalGridNYGas/](https://www.amplifyincentives.com/NationalGridNYGas/)",
"[https://www.nationalgridus.com/media/pdfs/bus-ways-to-save/2026-national-grid-large-commercial-gas-and-electric-weatherization-programs-guidebook.pdf](https://www.nationalgridus.com/media/pdfs/bus-ways-to-save/2026-national-grid-large-commercial-gas-and-electric-weatherization-programs-guidebook.pdf)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "technical_assistance",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Facility energy checks, engineering studies, and steam trap surveys are technical-assistance or study workflows; installed measure values require separate rebate or custom approval.",
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
"technical_assistance_type",
"facility_type",
"National_Grid_account",
"study_scope"
],
"missingInputsForTypicalRetroFiEstimate": [
"technical_assistance_type",
"study_scope"
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
"evidenceText": "National Grid sources describe facility checks, engineering studies, and steam trap surveys as workflows that may lead to separately approved measures.",
"sourceUrls": [
"[https://www.nationalgridus.com/ProNet/EE-Solutions-and-Incentives/Commercial-and-Industrial](https://www.nationalgridus.com/ProNet/EE-Solutions-and-Incentives/Commercial-and-Industrial)",
"[https://www.nationalgridus.com/Services-Rebates?customerType=View+All&fuelType=Natural+Gas&locations=New+York+City&page=1&r=10](https://www.nationalgridus.com/Services-Rebates?customerType=View+All&fuelType=Natural+Gas&locations=New+York+City&page=1&r=10)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "boiler_controls_burner_retrofit",
"action": "needs_review",
"reason": "Legacy boiler reset amounts were not verified in readable current official Metro New York gas sources."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "keep",
"reason": "Current sources support commercial weatherization and duct sealing or insulation pathways, but exact measure value needs portal or guide confirmation."
},
{
"retrofitTypeId": "energy_audit",
"action": "move_to_special_workflow",
"reason": "Facility checks and engineering studies are technical-assistance workflows, not physical retrofit rebates."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "needs_review",
"reason": "Commercial gas heating incentives exist, but current fixed boiler amounts were not reliably extracted from official sources."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "needs_review",
"reason": "Generic HVAC replacement is too broad and requires current portal confirmation for eligible gas heating or hot-water measures."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Commercial weatherization guidance supports insulation-type measures, with value requiring current guide or portal confirmation."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "needs_review",
"reason": "Legacy thermostat amount was not verified in readable current official Metro New York gas sources."
},
{
"retrofitTypeId": "steam_trap_replacement",
"action": "move_to_special_workflow",
"reason": "Current sources verified steam trap surveys as technical assistance; replacement rebate value was not confirmed."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Portal or National Grid program guide confirmation is required before committing to any fixed prescriptive amount."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.nationalgridus.com/business](https://www.nationalgridus.com/business)",
"[https://www.nationalgridus.com/ProNet/EE-Solutions-and-Incentives/Commercial-and-Industrial](https://www.nationalgridus.com/ProNet/EE-Solutions-and-Incentives/Commercial-and-Industrial)",
"[https://www.nationalgridus.com/Services-Rebates?customerType=View+All&fuelType=Natural+Gas&locations=New+York+City&page=1&r=10](https://www.nationalgridus.com/Services-Rebates?customerType=View+All&fuelType=Natural+Gas&locations=New+York+City&page=1&r=10)",
"[https://www.nationalgridus.com/media/pdfs/bus-ways-to-save/2026-national-grid-large-commercial-gas-and-electric-weatherization-programs-guidebook.pdf](https://www.nationalgridus.com/media/pdfs/bus-ways-to-save/2026-national-grid-large-commercial-gas-and-electric-weatherization-programs-guidebook.pdf)",
"[https://www.amplifyincentives.com/NationalGridNYGas/](https://www.amplifyincentives.com/NationalGridNYGas/)"
],
"evidenceText": "The program is active, but fixed legacy boiler and thermostat amounts need portal confirmation before automated value calculations.",
"reasoningNotes": "Do not preserve DSIRE-only fixed boiler or thermostat values as final authority; use custom quote or human review until current portal measure table is extracted.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Current official fixed measure table was not reliably accessible.",
"Legacy prescriptive amounts are not sufficient final authority."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3291",
"opportunityName": "Consolidated Electric Cooperative - Residential Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate",
"tariff_or_rate"
],
"primaryValueModelKinds": [
"measure_catalog",
"tariff_or_rate"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Residential bill-credit rebate equals the published fixed amount or capped smart-thermostat amount for the qualifying new equipment; inspection, documentation, and remote-control switch requirements apply by measure.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 10000,
"maxAmountCents": 80000,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.5,
"maxUnits": 1,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying residential electric water heater",
"heat pump water heater",
"dual-fuel heat pump",
"ductless mini-split",
"geothermal heat pump",
"residential refrigerator or freezer",
"Level 2 EV charger",
"central air conditioner",
"smart thermostat"
],
"ineligibleCostCategories": [
"DC fast charging",
"generic EV charger outside Level 2",
"commercial refrigeration",
"cooling-only ductless mini-splits",
"on-demand or solar water heaters for HPWH rebate"
],
"requiredInputs": [
"measure_type",
"unit_count",
"equipment_cost",
"tonnage",
"RCS_switch_agreement",
"inspection_status",
"ENERGY_STAR_status",
"charger_level",
"equipment_specification"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"equipment_cost",
"inspection_status",
"RCS_switch_agreement"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "consolidated_residential_current_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "controlled_electric_storage_water_heater",
"amountCents": 25000,
"requirements": "50 gallons or greater, remote-control switch and five-year agreement."
},
{
"measure": "heat_pump_water_heater",
"amountCents": 40000
},
{
"measure": "dual_fuel_heat_pump",
"amountCents": 60000,
"requirements": "Remote-control switch and five-year agreement."
},
{
"measure": "ductless_mini_split",
"amountCents": 60000,
"requirements": "Must provide heating and cooling."
},
{
"measure": "geothermal_heat_pump",
"amountCents": 80000
},
{
"measure": "ENERGY_STAR_refrigerator",
"amountCents": 10000
},
{
"measure": "ENERGY_STAR_freezer",
"amountCents": 10000
},
{
"measure": "Level_2_EV_charger",
"amountCents": 25000
},
{
"measure": "central_air_conditioner",
"amountCents": 15000
},
{
"measure": "smart_thermostat",
"percent": 0.5,
"maxAmountCents": 15000
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Consolidated lists residential bill-credit rebates for HPWHs, dual-fuel heat pumps, ductless mini-splits, geothermal, appliances, Level 2 chargers, central AC, and smart thermostats.",
"sourceUrls": [
"[https://www.consolidated.coop/electric/residential/rebates/](https://www.consolidated.coop/electric/residential/rebates/)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "monthly",
"formulaText": "Remote-control-switch participation can provide monthly or seasonal bill credits for eligible controlled water heater or dual-fuel heat pump equipment, depending on measure and monthly energy use.",
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
"RCS_participation",
"monthly_kWh",
"heat_pump_tonnage",
"seasonal_months"
],
"missingInputsForTypicalRetroFiEstimate": [
"RCS_participation",
"monthly_kWh",
"heat_pump_tonnage"
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
"evidenceText": "Consolidated’s page lists recurring remote-control-switch credits for controlled water heaters and dual-fuel heat pump participation.",
"sourceUrls": [
"[https://www.consolidated.coop/electric/residential/rebates/](https://www.consolidated.coop/electric/residential/rebates/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "EV support is limited to new Level 2 chargers; the generic EV charger edge is overbroad."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Official residential page lists a geothermal heat pump rebate."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Official residential page lists dual-fuel heat pump and ductless mini-split rebates."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Official residential page lists a heat pump water heater rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Official page lists central air conditioner and heat pump-related residential rebates."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Official page lists residential refrigerator and freezer rebates, not commercial refrigeration."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Official page lists a Level 2 EV charger rebate."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Official page lists a smart thermostat rebate capped at 50% of cost."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "First come, first served; new purchases only; inspection and remote-control-switch agreements apply to selected measures."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "Claim must be made within the specified period, generally within 12 months unless otherwise stated.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.consolidated.coop/electric/residential/rebates/](https://www.consolidated.coop/electric/residential/rebates/)"
],
"evidenceText": "Consolidated’s residential rebate page provides fixed bill-credit values and recurring control credits for selected residential electric equipment.",
"reasoningNotes": "Corrected legacy ambiguity by separating controlled water heater, HPWH, and Level 2 charger values.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22702",
"opportunityName": "Ashland Electric Utility - Commercial Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "medium",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"rate_table",
"measure_catalog",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "Commercial incentive equals the published per-ton, fixed, or per-charger amount for the selected current Ashland commercial measure; refrigeration and building shell require staff contact and custom confirmation.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 35000,
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
"eligibleCostCategories": [
"ductless heat pumps",
"air-source heat pumps",
"variable refrigerant flow systems",
"heat pump water heaters",
"Level 2 EV chargers",
"commercial induction cooktops or ranges",
"refrigeration where staff confirms"
],
"ineligibleCostCategories": [
"fluorescent-to-LED work after August 31, 2025 deadline",
"portable induction equipment",
"dual-fuel induction ranges",
"generic EV chargers outside Level 2"
],
"requiredInputs": [
"measure_type",
"tons",
"replacement_fuel_or_existing_system",
"unit_count",
"charger_count",
"charger_cost",
"installation_cost",
"licensed_electrician_docs",
"permit_final_inspection",
"pre_and_post_inspection_status",
"staff_confirmation"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"tons",
"replacement_fuel_or_existing_system",
"charger_count",
"staff_confirmation"
],
"rateTable": {
"tableId": "ashland_commercial_current_selected_rates",
"dimensions": [
"measure_type",
"replacement_type"
],
"rows": [
{
"measure": "ductless_heat_pump_switching_from_natural_gas",
"rateCents": 30000,
"rateUnit": "ton"
},
{
"measure": "ductless_heat_pump_replacing_electric_resistance",
"rateCents": 100000,
"rateUnit": "ton"
},
{
"measure": "air_source_heat_pump_switching_from_natural_gas",
"rateCents": 15000,
"rateUnit": "ton"
},
{
"measure": "air_source_heat_pump_replacing_electric_resistance",
"rateCents": 70000,
"rateUnit": "ton"
},
{
"measure": "variable_refrigerant_flow_electric_replacement",
"rateCents": 100000,
"rateUnit": "ton"
},
{
"measure": "heat_pump_water_heater_tier_3",
"amountCents": 60000
},
{
"measure": "commercial_induction_replacing_electric",
"amountCents": 35000
},
{
"measure": "commercial_induction_replacing_gas",
"amountCents": 40000
},
{
"measure": "first_Level_2_EV_charger",
"maxAmountCents": 100000
},
{
"measure": "additional_Level_2_EV_chargers_2_to_4",
"maxAmountCents": 50000,
"requirements": "Additional per charger; two chargers total maximum example is $1,500."
}
]
},
"measureCatalog": {
"catalogId": "ashland_commercial_refrigeration_and_shell_custom",
"selectionInput": "staff_confirmed_measure",
"rows": [
{
"measure": "commercial_refrigeration",
"amountCents": null,
"requirements": "Contact city staff; pre- and post-installation inspection required."
},
{
"measure": "commercial_building_shell",
"amountCents": null,
"requirements": "Contact city staff; pre- and post-installation inspection required."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Ashland’s commercial page lists current HVAC, HPWH, induction, and Level 2 charger incentives; LED deadline has passed and refrigeration requires staff contact.",
"sourceUrls": [
"[https://ashlandoregon.gov/590/Commercial-Incentives](https://ashlandoregon.gov/590/Commercial-Incentives)",
"[https://ashlandoregon.gov/FormCenter/Electric-Department-8/Climate-and-Energy-Incentive-Programs-On-81](https://ashlandoregon.gov/FormCenter/Electric-Department-8/Climate-and-Energy-Incentive-Programs-On-81)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "EV support is limited to new Level 2 chargers; generic EV charging is overbroad."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Current page lists ductless and air-source heat pump incentives by ton and replacement type."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Current page lists a Tier 3 heat pump water heater incentive."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Current page supports listed commercial heat pump, VRF, and PTHP-related HVAC measures."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "needs_review",
"reason": "Refrigeration is listed, but source requires staff contact and does not publish a fixed rate table."
},
{
"retrofitTypeId": "induction_cooking_equipment",
"action": "keep",
"reason": "Current page lists commercial induction cooktop or range incentives with fixed amounts by replacement type."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "delete_bad_edge",
"reason": "Fluorescent-to-LED replacement incentive had an August 31, 2025 completion deadline and is not current."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Current page lists new Level 2 commercial charger incentives by charger count."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Pre- and post-installation inspections are required for heating, cooling, refrigeration, shell, and lighting categories; EV projects require permits and licensed electrician documentation."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "LED completion deadline was August 31, 2025 and should be treated as unavailable for new projects.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://ashlandoregon.gov/590/Commercial-Incentives](https://ashlandoregon.gov/590/Commercial-Incentives)",
"[https://ashlandoregon.gov/FormCenter/Electric-Department-8/Climate-and-Energy-Incentive-Programs-On-81](https://ashlandoregon.gov/FormCenter/Electric-Department-8/Climate-and-Energy-Incentive-Programs-On-81)"
],
"evidenceText": "Ashland commercial incentives are active for selected electrification measures, but LED is expired and refrigeration needs city staff confirmation.",
"reasoningNotes": "Legacy $1,000 per unit was actually a per-ton HVAC rate for selected electric replacements, not a generic per-unit EV value.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Refrigeration and building shell values require city staff confirmation.",
"Some commercial page categories are not fully tabulated."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1674",
"opportunityName": "Portland General Electric - Residential Energy Efficiency Rebate Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "estimate_from_range",
"sourceConfidence": "medium",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"financing",
"tariff_or_rate"
],
"primaryValueModelKinds": [
"measure_catalog",
"competitive_award_range",
"tariff_or_rate"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "point_of_sale",
"formulaText": "PGE-linked heat pump incentive equals the applicable instant discount or Energy Trust cash incentive for qualifying ducted or ductless heat pumps, with amount depending on equipment, contractor, income or rental status, and offer pathway.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 20000,
"maxAmountCents": 300000,
"caps": {
"maxAwardCents": 300000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying ductless heat pump",
"qualifying ducted heat pump",
"eligible smart thermostat enrollment",
"partner weatherization measures where eligible"
],
"ineligibleCostCategories": [
"gas furnace retrofit",
"gas water heater retrofit",
"HPWH not verified on current PGE offer pages",
"generic HVAC outside heat pumps"
],
"requiredInputs": [
"measure_type",
"ducted_or_ductless",
"equipment_brand_or_qualification",
"contractor_participation",
"income_qualified_or_rental_status",
"project_cost",
"Energy_Trust_pathway",
"PGE_offer_pathway",
"installation_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"ducted_or_ductless",
"contractor_participation",
"income_qualified_or_rental_status",
"Energy_Trust_pathway",
"project_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "pge_residential_heat_pump_offers",
"selectionInput": "offer_pathway",
"rows": [
{
"measure": "ductless_heat_pump_PGE_approved_contractor_discount",
"amountCents": 20000
},
{
"measure": "ductless_heat_pump_Energy_Trust_or_income_qualified",
"maxAmountCents": 180000
},
{
"measure": "ducted_heat_pump_PGE_approved_contractor_discount",
"amountCents": 20000
},
{
"measure": "ducted_heat_pump_Energy_Trust_or_income_qualified_or_extended_capacity",
"maxAmountCents": 300000
},
{
"measure": "limited_time_qualifying_Trane_ducted_heat_pump_offer",
"maxAmountCents": 200000,
"requirements": "Limited-time offer through August 31, 2026, for qualifying Trane equipment and controls."
},
{
"measure": "limited_time_qualifying_Mitsubishi_ductless_heat_pump_offer",
"amountCents": 60000,
"requirements": "Limited-time offer through participating contractors where eligible."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "PGE current pages point to ducted and ductless heat pump offers and Energy Trust incentives; values depend on pathway, contractor, and customer status.",
"sourceUrls": [
"[https://portlandgeneral.com/save-money/save-money-home/special-offers-incentives](https://portlandgeneral.com/save-money/save-money-home/special-offers-incentives)",
"[https://portlandgeneral.com/save-money/save-money-home/heating-cooling/high-efficiency-heat-pumps](https://portlandgeneral.com/save-money/save-money-home/heating-cooling/high-efficiency-heat-pumps)",
"[https://portlandgeneral.com/save-money/save-money-home/weatherization/weatherization-assistance](https://portlandgeneral.com/save-money/save-money-home/weatherization/weatherization-assistance)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "annual",
"formulaText": "Smart thermostat participation can provide enrollment and seasonal rewards where the customer enrolls an eligible device in the applicable PGE program.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 2500,
"maxAmountCents": 5000,
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
"eligible_smart_thermostat",
"program_enrollment",
"seasonal_participation"
],
"missingInputsForTypicalRetroFiEstimate": [
"program_enrollment",
"seasonal_participation"
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
"evidenceText": "PGE heat pump and special-offers pages reference smart thermostat rewards in addition to marketplace or partner offers.",
"sourceUrls": [
"[https://portlandgeneral.com/save-money/save-money-home/special-offers-incentives](https://portlandgeneral.com/save-money/save-money-home/special-offers-incentives)",
"[https://portlandgeneral.com/save-money/save-money-home/heating-cooling/high-efficiency-heat-pumps](https://portlandgeneral.com/save-money/save-money-home/heating-cooling/high-efficiency-heat-pumps)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "PGE pages route residential customers to partner weatherization offers and assistance."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "delete_bad_edge",
"reason": "Current checked PGE pages did not verify duct sealing or duct insulation as a source-backed measure in this record."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "PGE current heat pump page supports ducted and ductless heat pump incentives through PGE and Energy Trust pathways."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "delete_bad_edge",
"reason": "HPWH eligibility was not verified on current PGE residential offer pages checked."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "delete_bad_edge",
"reason": "Gas furnace retrofit support was not verified on current PGE electric residential offer pages."
},
{
"retrofitTypeId": "high_efficiency_gas_water_heater",
"action": "delete_bad_edge",
"reason": "Gas water heater support was not verified on current PGE electric residential offer pages."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for listed ducted or ductless heat pump offers, not generic HVAC replacement."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "PGE pages route customers to Energy Trust weatherization including insulation and windows where eligible."
}
],
"stackingRules": {
"stackableWithRebates": true,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "PGE states Energy Trust incentives may be combined with certain limited-time heat pump offers where applicable; partner-program boundaries must be preserved."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "Limited-time heat pump offer listed through August 31, 2026, where applicable.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://portlandgeneral.com/save-money/save-money-home/special-offers-incentives](https://portlandgeneral.com/save-money/save-money-home/special-offers-incentives)",
"[https://portlandgeneral.com/save-money/save-money-home/heating-cooling/high-efficiency-heat-pumps](https://portlandgeneral.com/save-money/save-money-home/heating-cooling/high-efficiency-heat-pumps)",
"[https://portlandgeneral.com/save-money/save-money-home/weatherization/weatherization-assistance](https://portlandgeneral.com/save-money/save-money-home/weatherization/weatherization-assistance)"
],
"evidenceText": "PGE residential offer pages support heat pump and partner weatherization pathways, but gas and HPWH matches were not verified.",
"reasoningNotes": "Repaired this old rebate record as a PGE and partner-offer hub with pathway-dependent values rather than a single fixed rebate table.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Partner-administered Energy Trust pathway determines final amount for several measures.",
"Some legacy edges were not verified on current PGE pages."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2084",
"opportunityName": "United Cooperative Services - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate",
"technical_assistance",
"non_cash"
],
"primaryValueModelKinds": [
"measure_catalog",
"capped_percent_of_eligible_cost",
"rate_table",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Residential rebate equals the published fixed, capped cost-share, or insulation formula amount for qualifying purchases or services, subject to documentation, 60-day submission, first-come funding, and $1,200 total rebate cap per home.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 5000,
"maxAmountCents": 120000,
"caps": {
"maxAwardCents": 120000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.5,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": 120000,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"Level 2 EV charger",
"smart thermostat",
"attic insulation",
"air-source heat pump",
"ground-source heat pump",
"heat pump water heater",
"HVAC tune-up"
],
"ineligibleCostCategories": [
"generic EV charger outside Level 2",
"central air with electric furnace or strip heat",
"gas, propane, tankless, or LP water heaters",
"commercial measures"
],
"requiredInputs": [
"measure_type",
"unit_count",
"total_cost",
"attic_square_feet",
"existing_insulation_inches",
"installed_insulation_inches",
"free_audit_completed",
"SEER_or_SEER2",
"EER",
"water_heater_gallons",
"Beat_the_Peak_text_signup",
"delayed_charging_programmed"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"total_cost",
"attic_square_feet",
"installed_insulation_inches",
"equipment_efficiency",
"Beat_the_Peak_status"
],
"rateTable": {
"tableId": "united_coop_2026_selected_rates",
"dimensions": [
"measure_type",
"basis"
],
"rows": [
{
"measure": "Level_2_EV_charger",
"percent": 0.5,
"maxAmountCents": 25000,
"requirements": "New Level 2 240V charger, Beat the Peak text participation, and delayed charging outside summer peak."
},
{
"measure": "smart_thermostat",
"maxAmountCents": 5000,
"requirements": "Qualifying Nest, ecobee, Honeywell, or smart Wi-Fi thermostat."
},
{
"measure": "attic_insulation",
"rateCents": 2,
"rateUnit": "inch_earned_per_square_foot",
"requirements": "Free audit before installation; existing insulation 8 inches or less; paid up to 12 inches."
},
{
"measure": "air_source_heat_pump",
"amountCents": 20000,
"requirements": "Qualifying complete system change-out; minimum 17 SEER or 16.2 SEER2."
},
{
"measure": "ground_source_heat_pump",
"amountCents": 20000,
"requirements": "Qualifying complete system change-out; minimum EER 17.0."
},
{
"measure": "heat_pump_water_heater",
"amountCents": 15000,
"requirements": "Qualifying electric HPWH, at least 40 gallons, energy factor 2.0 or greater."
},
{
"measure": "HVAC_tune_up",
"maxAmountCents": 7500,
"requirements": "Up to $75 per unit per year."
}
]
},
"measureCatalog": {
"catalogId": "united_coop_residential_2026_catalog",
"selectionInput": "measure_type",
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "United’s 2026 materials list residential Level 2 charger, smart thermostat, attic insulation, heat pump, HPWH, and HVAC tune-up rebates with caps and restrictions.",
"sourceUrls": [
"[https://ucs.net/rebate-programs](https://ucs.net/rebate-programs)",
"[https://ucs.net/sites/default/files/2026%20REBATE%20BROCHURE%20FINAL.pdf](https://ucs.net/sites/default/files/2026%20REBATE%20BROCHURE%20FINAL.pdf)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "technical_assistance",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "United offers free energy analyses and certain no-cost items such as water-heater blankets while supplies last; these are process or non-cash value and not installation rebates.",
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
"audit_request",
"water_heater_location",
"supply_availability"
],
"missingInputsForTypicalRetroFiEstimate": [
"supply_availability"
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
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Free audits and water-heater blankets are service or non-cash offerings, not cash rebates for the physical retrofit total.",
"sourceUrls": [
"[https://ucs.net/rebate-programs](https://ucs.net/rebate-programs)",
"[https://ucs.net/sites/default/files/2026%20REBATE%20BROCHURE%20FINAL.pdf](https://ucs.net/sites/default/files/2026%20REBATE%20BROCHURE%20FINAL.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "EV rebate is Level 2 residential charging only; generic EV charger edge is overbroad."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "United lists a residential ground-source heat pump rebate."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "United lists residential air-source and ground-source heat pump rebates with complete-system requirements."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "United lists a residential electric heat pump water heater rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for qualifying heat pump system change-outs; central air with strip heat or electric furnaces are not rebated."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "United lists an attic insulation rebate formula requiring a free audit."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "United lists a 50% up to $250 rebate for new Level 2 chargers with off-peak charging requirements."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "United lists smart thermostat rebates for qualifying Wi-Fi thermostats."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Energy Innovation rebates are first come, first served and capped at $1,200 total per home."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "Required documents must be submitted within 60 days where stated.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://ucs.net/rebate-programs](https://ucs.net/rebate-programs)",
"[https://ucs.net/sites/default/files/2026%20REBATE%20BROCHURE%20FINAL.pdf](https://ucs.net/sites/default/files/2026%20REBATE%20BROCHURE%20FINAL.pdf)"
],
"evidenceText": "United current materials support residential EV Level 2, smart thermostat, attic insulation, heat pump, HPWH, HVAC tune-up, and non-cash audit or blanket offerings.",
"reasoningNotes": "Legacy $250 rule is a 50% cost-share cap for Level 2 EV chargers, not a fixed per-unit rebate.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22565",
"opportunityName": "Columbia REA Residential Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "medium",
"estimateConfidence": "medium",
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
"formulaText": "Current source-backed HPWH rebate equals the listed product-tier amount, capped at the lesser of 70% of actual cost or approved amount; other residential category rates require current form or staff confirmation before automated value calculation.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 140000,
"maxAmountCents": 220000,
"caps": {
"maxAwardCents": 220000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.7,
"maxUnits": 1,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying heat pump water heater actual cost",
"other residential heating and cooling where current form confirms",
"weatherization where current form confirms",
"ENERGY STAR laundry where current form confirms"
],
"ineligibleCostCategories": [
"broad air sealing not confirmed by current weatherization form",
"separate EV charger application",
"commercial or agricultural rebates"
],
"requiredInputs": [
"measure_type",
"HPWH_product_tier",
"HPWH_size_gallons",
"unitary_or_split_system",
"actual_cost",
"replacement_water_heater_type",
"purchase_date",
"installation_photos",
"current_form_version",
"funding_availability"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"HPWH_product_tier",
"size_gallons",
"actual_cost",
"current_form_version",
"funding_availability"
],
"rateTable": {
"tableId": "columbia_rea_hpwh_2025_2026_current_rates",
"dimensions": [
"product_tier",
"configuration",
"size"
],
"rows": [
{
"measure": "unitary_HPWH_40_gallon_all_tiers",
"amountCents": 140000,
"maxPercentOfEligibleCost": 0.7
},
{
"measure": "unitary_HPWH_50_gallon_or_larger_tier_3",
"amountCents": 160000,
"maxPercentOfEligibleCost": 0.7
},
{
"measure": "unitary_HPWH_50_gallon_or_larger_tier_4",
"amountCents": 180000,
"maxPercentOfEligibleCost": 0.7
},
{
"measure": "split_system_HPWH_any_size_tier_3",
"amountCents": 220000,
"maxPercentOfEligibleCost": 0.7
}
]
},
"measureCatalog": {
"catalogId": "columbia_rea_residential_categories_requiring_current_forms",
"selectionInput": "measure_type",
"rows": [
{
"measure": "heating_and_cooling",
"amountCents": null,
"requirements": "Current form and funding confirmation required."
},
{
"measure": "duct_sealing",
"amountCents": null,
"requirements": "Current form and funding confirmation required."
},
{
"measure": "smart_thermostat",
"amountCents": null,
"requirements": "Current form and funding confirmation required."
},
{
"measure": "weatherization_insulation_doors_windows",
"amountCents": null,
"requirements": "Current form and funding confirmation required."
},
{
"measure": "ENERGY_STAR_laundry",
"amountCents": null,
"requirements": "Current form and funding confirmation required."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Columbia REA’s current HPWH form lists 2025-2026 product-tier rebates capped at 70% actual cost; other linked categories need current form confirmation.",
"sourceUrls": [
"[https://www.columbiarea.coop/energy-efficiency/rebate-offers/](https://www.columbiarea.coop/energy-efficiency/rebate-offers/)",
"[https://www.columbiarea.coop/wp-content/uploads/Residential-Heat-Pump-Water-Heater-Rebate-Application-10012025.pdf](https://www.columbiarea.coop/wp-content/uploads/Residential-Heat-Pump-Water-Heater-Rebate-Application-10012025.pdf)",
"[https://www.columbiarea.coop/news-releases/conservation-corner-september-2025/](https://www.columbiarea.coop/news-releases/conservation-corner-september-2025/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "delete_bad_edge",
"reason": "Broad air sealing was not confirmed by the current residential rebate materials checked."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "needs_review",
"reason": "Residential page lists heating and cooling or duct-related categories, but the accessible heating form had an expired validity window."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "needs_review",
"reason": "Heating and cooling category is listed, but current HVAC rates require a current, non-expired form or utility confirmation."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Current 2025-2026 HPWH application lists product-tier rebate amounts and cost cap."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "needs_review",
"reason": "Generic HVAC replacement should not be calculated until current heating and cooling form validity is confirmed."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "needs_review",
"reason": "Residential page lists ENERGY STAR laundry, but current fixed value was not extracted from a current form."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "needs_review",
"reason": "Weatherization category is listed, but current insulation rates require a current form or utility confirmation."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "needs_review",
"reason": "Smart thermostat category is listed, but current fixed value was not extracted from a current form."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "HPWH rebate is capped at the lesser of 70% actual cost or the approved amount; funding availability and current form dates must be verified."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "HPWH form requires submission within 60 days of purchase and is valid until funding expires or September 30, 2026.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.columbiarea.coop/energy-efficiency/rebate-offers/](https://www.columbiarea.coop/energy-efficiency/rebate-offers/)",
"[https://www.columbiarea.coop/wp-content/uploads/Residential-Heating-and-Cooling-HVAC-04212025.pdf](https://www.columbiarea.coop/wp-content/uploads/Residential-Heating-and-Cooling-HVAC-04212025.pdf)",
"[https://www.columbiarea.coop/wp-content/uploads/Residential-Heat-Pump-Water-Heater-Rebate-Application-10012025.pdf](https://www.columbiarea.coop/wp-content/uploads/Residential-Heat-Pump-Water-Heater-Rebate-Application-10012025.pdf)",
"[https://www.columbiarea.coop/news-releases/conservation-corner-january-2024/](https://www.columbiarea.coop/news-releases/conservation-corner-january-2024/)",
"[https://www.columbiarea.coop/news-releases/conservation-corner-september-2025/](https://www.columbiarea.coop/news-releases/conservation-corner-september-2025/)"
],
"evidenceText": "Columbia REA has a current HPWH formula, while several other residential rebate categories need current form confirmation before automated calculation.",
"reasoningNotes": "Repaired HPWH from an older up-to range to the current tiered table; flagged expired or unverified forms rather than preserving stale HVAC and weatherization values.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Accessible heating and cooling form had an expired validity window.",
"Current rates for laundry, thermostat, duct, and weatherization categories were not fully extracted."
]
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22122"
}

