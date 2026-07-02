{
"schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
"researchedAt": "2026-07-02",
"source": "gpt_pro",
"batchNumber": 31,
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22453",
"opportunityName": "Minnkota Power Cooperative - PowerSaves Residential Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Select the current PowerSavers residential prescriptive measure. Electric heat rebates are $25/kW or $45/kW by equipment type; ASHP and mini-split heat pumps are $150/ton; GSHP is $250/ton; water heaters are $125, $200 or $300 by tank size with $100 new-construction and $250 gas/propane conversion adders, subject to caps and local utility rules.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 150000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": 50000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["qualifying residential electric heat equipment", "qualifying heat pumps", "qualifying electric water heaters", "ENERGY STAR clothes washers where local form applies", "qualifying EV charging equipment where local form applies"],
"ineligibleCostCategories": ["unsupported residential refrigerators or freezers", "unsupported LED lighting", "unsupported low-flow plumbing fixtures"],
"requiredInputs": ["selected_measure", "participating_utility", "rated_kW", "tons", "tank_gallons", "new_construction", "fuel_conversion", "off_peak_meter_or_demand_response_requirement"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "equipment_size", "participating_utility"],
"rateTable": {
"tableId": "minnkota_residential_powersaves_2026",
"dimensions": ["measure", "equipment_size"],
"rows": [
{"measure": "baseboard/cove heat, forced-air electric furnace, hanging or wall unit", "rate": 25, "rateUnit": "USD per kW", "capCents": 150000},
{"measure": "electric boiler, brick storage or slab storage electric heat", "rate": 45, "rateUnit": "USD per kW", "capCents": 150000},
{"measure": "air-source or mini-split heat pump", "rate": 150, "rateUnit": "USD per ton"},
{"measure": "ground-source heat pump", "rate": 250, "rateUnit": "USD per ton"},
{"measure": "electric water heater 55 gallons or less", "amountCents": 12500},
{"measure": "electric water heater 56-99 gallons", "amountCents": 20000},
{"measure": "electric water heater 100 gallons or more", "amountCents": 30000},
{"measure": "water-heater new-construction adder", "amountCents": 10000},
{"measure": "natural gas or propane to electric water-heater conversion adder", "amountCents": 25000}
]
},
"measureCatalog": {
"catalogId": "minnkota_residential_powersaves_2026",
"selectionInput": "selected_measure",
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Minnkota publishes residential prescriptive categories and current off-peak rebates for electric heat, heat pumps and water heating; local utility rules still apply.",
"sourceUrls": [
"[https://www.minnkota.com/our-programs/residential-programs](https://www.minnkota.com/our-programs/residential-programs)",
"[https://www.minnkota.com/our-programs/rebates-energy-incentives](https://www.minnkota.com/our-programs/rebates-energy-incentives)",
"[https://cdn.prod.website-files.com/5ef212e2cdca1e094063db4e/696517639fd68eca56f3c321_Electric%20Rebates%20Application-2026-Fillable.pdf](https://cdn.prod.website-files.com/5ef212e2cdca1e094063db4e/696517639fd68eca56f3c321_Electric%20Rebates%20Application-2026-Fillable.pdf)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "ev_charger_installation", "action": "keep", "reason": "Official source supports qualifying Level 2 or Level 3 charging equipment and demand-response requirements, but no general residential charger amount was verified."},
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "keep", "reason": "Current Minnkota table lists ground-source heat pumps at a dollars-per-ton rate."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "Current Minnkota table lists air-source and mini-split heat-pump rebates at a dollars-per-ton rate."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Supported only for listed electric heat and qualifying heat-pump equipment, not generic HVAC."},
{"retrofitTypeId": "high_efficiency_laundry_equipment", "action": "keep", "reason": "Residential program page lists ENERGY STAR clothes washers as a rebate category; exact amount is utility/form dependent."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "delete_bad_edge", "reason": "No current official residential refrigerator or freezer rebate was verified for this Minnkota opportunity."},
{"retrofitTypeId": "led_lighting_retrofit", "action": "delete_bad_edge", "reason": "No current residential LED lighting rebate was verified in the checked Minnkota sources."},
{"retrofitTypeId": "low_flow_fixture_retrofit", "action": "delete_bad_edge", "reason": "Checked residential sources do not support broad low-flow plumbing fixtures."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "delete_bad_edge", "reason": "Checked residential sources do not support a thermostat rebate for this opportunity."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate caps and local member-utility rules apply; other incentives may be handled by the local utility."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.minnkota.com/our-programs/residential-programs](https://www.minnkota.com/our-programs/residential-programs)",
"[https://www.minnkota.com/our-programs/rebates-energy-incentives](https://www.minnkota.com/our-programs/rebates-energy-incentives)",
"[https://cdn.prod.website-files.com/5ef212e2cdca1e094063db4e/696517639fd68eca56f3c321_Electric%20Rebates%20Application-2026-Fillable.pdf](https://cdn.prod.website-files.com/5ef212e2cdca1e094063db4e/696517639fd68eca56f3c321_Electric%20Rebates%20Application-2026-Fillable.pdf)"
],
"evidenceText": "Current Minnkota sources provide calculable heat, heat-pump and water-heater prescriptive rebates; other residential categories remain local/form-specific.",
"reasoningNotes": "Input target batch is from uploaded file . EV charger kept as a supported program category, but no deterministic residential charger value was found.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5528",
"opportunityName": "Minnkota Power Cooperative (11 Utilities) - PowerSavers Commercial Energy Efficiency Rebate Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["custom_quote"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "custom_quote",
"timing": "application_process",
"formulaText": "Business prescriptive incentives use a prescribed amount for each eligible technology; custom projects use Minnkota's set incentive formula based on first-year electric kWh savings, but the current rate table was not published in accessible source text. Business custom projects require prior approval before equipment is purchased or installed.",
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
"eligibleCostCategories": ["business HVAC", "business lighting", "variable speed drives", "food service", "custom electric efficiency"],
"ineligibleCostCategories": ["residential laundry", "low-flow plumbing"],
"requiredInputs": ["selected_measure", "participating_utility", "first_year_kWh_savings", "eligible_project_cost", "equipment_specifications", "preapproval_status"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "published_measure_amount_or_custom_rate", "first_year_kWh_savings"],
"rateTable": {"tableId": null, "dimensions": [], "rows": []},
"measureCatalog": {
"catalogId": "minnkota_business_categories_current",
"selectionInput": "selected_measure",
"rows": [
{"measure": "prescriptive business HVAC", "amountCents": null, "notes": "current amount requires selected technology or local utility form"},
{"measure": "prescriptive business lighting", "amountCents": null, "notes": "current amount requires selected technology or local utility form"},
{"measure": "prescriptive variable speed drive", "amountCents": null, "notes": "current amount requires selected equipment or local utility form"},
{"measure": "custom energy efficiency", "amountCents": null, "notes": "based on approved first-year kWh savings and preapproval"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Minnkota business pages identify prescriptive and custom incentives; custom projects require prior approval before equipment is purchased or installed.",
"sourceUrls": [
"[https://www.minnkota.com/our-programs/business-programs](https://www.minnkota.com/our-programs/business-programs)",
"[https://www.minnkota.com/our-programs/rebates-energy-incentives](https://www.minnkota.com/our-programs/rebates-energy-incentives)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "keep", "reason": "Business HVAC is a supported prescriptive/custom category, but the exact current amount was not published in accessible text."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "Business HVAC and custom efficiency categories support eligible heat-pump measures subject to local utility rules."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Business HVAC is listed as a current rebate category."},
{"retrofitTypeId": "high_efficiency_laundry_equipment", "action": "delete_bad_edge", "reason": "The current business program sources do not support residential laundry equipment."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "keep", "reason": "Commercial/industrial efficiency projects may be prescriptive or custom; exact refrigeration amount requires measure selection or utility form."},
{"retrofitTypeId": "led_lighting_retrofit", "action": "keep", "reason": "Lighting is a listed business prescriptive category."},
{"retrofitTypeId": "lighting_controls_retrofit", "action": "keep", "reason": "Lighting controls are within the business lighting/custom efficiency category when measure rules are met."},
{"retrofitTypeId": "low_flow_fixture_retrofit", "action": "delete_bad_edge", "reason": "Checked business sources do not support broad plumbing fixture rebates."},
{"retrofitTypeId": "variable_frequency_drive_retrofit", "action": "keep", "reason": "Variable speed drives are listed as a current business prescriptive category."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Custom projects require utility approval and may be affected by other incentives or project-cost limitations."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.minnkota.com/our-programs/business-programs](https://www.minnkota.com/our-programs/business-programs)",
"[https://www.minnkota.com/our-programs/rebates-energy-incentives](https://www.minnkota.com/our-programs/rebates-energy-incentives)"
],
"evidenceText": "Minnkota business program is real, but accessible sources do not publish a complete current measure table or custom $/kWh rate.",
"reasoningNotes": "Use custom_quote_required until the participating utility or current application form provides a selected prescriptive amount or custom rate.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2547",
"opportunityName": "Mora Municipal Utilities - Residential Energy Efficiency Rebate Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["custom_quote", "measure_catalog"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "custom_quote",
"timing": "post_purchase_rebate",
"formulaText": "Use the current SMMPA/Mora residential form for the selected measure. Rebate value depends on the form and eligible product category; current official pages list forms but did not fully expose all current amounts in accessible text.",
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
"eligibleCostCategories": ["ENERGY STAR residential products", "ENERGY STAR EV chargers", "cooling equipment", "cooling tune-up", "ECM circulator pump", "furnace fan motor", "pool pump", "aerosol sealing"],
"ineligibleCostCategories": ["business geothermal", "business lighting", "business refrigeration", "broad furnace replacement"],
"requiredInputs": ["selected_residential_form", "equipment_type", "model_number", "purchase_date", "proof_of_purchase", "utility_account", "installed_quantity"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "current_form_amount", "equipment_quantity"],
"rateTable": {"tableId": null, "dimensions": [], "rows": []},
"measureCatalog": {
"catalogId": "mora_smmpa_residential_forms_2026",
"selectionInput": "selected_residential_form",
"rows": [
{"measure": "ENERGY STAR products", "amountCents": null, "notes": "residential product-specific form"},
{"measure": "ENERGY STAR EV charger", "amountCents": null, "notes": "residential charger form listed"},
{"measure": "cooling equipment and tune-up", "amountCents": null, "notes": "separate residential forms"},
{"measure": "ECM pump, furnace fan motor, pool pump or aerosol sealing", "amountCents": null, "notes": "separate residential forms"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Mora points customers to SMMPA 2026 residential rebate forms for products, EV chargers, cooling equipment, fan motors, pumps and aerosol sealing.",
"sourceUrls": [
"[https://www.ci.mora.mn.us/electric-utility/pages/rebates-energy-efficiency](https://www.ci.mora.mn.us/electric-utility/pages/rebates-energy-efficiency)",
"[https://smmpa.com/members/mora](https://smmpa.com/members/mora)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "ev_charger_installation", "action": "keep", "reason": "SMMPA/Mora lists a residential ENERGY STAR EV charger form; exact amount requires current form extraction."},
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "delete_bad_edge", "reason": "Ground-source heat pumps appear in business-only contexts, not the listed Mora residential forms."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "Residential cooling/HVAC forms support qualifying heat-pump or cooling equipment subject to the selected form."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "Residential ENERGY STAR product forms may support qualifying HPWH; exact amount needs current form selection."},
{"retrofitTypeId": "high_efficiency_furnace_retrofit", "action": "delete_bad_edge", "reason": "The residential form supports a furnace fan motor measure, not broad furnace replacement."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Cooling equipment forms support qualifying residential HVAC equipment subject to current requirements."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "delete_bad_edge", "reason": "No current residential refrigerator/freezer rebate amount was verified from the Mora page; commercial refrigeration is separate."},
{"retrofitTypeId": "led_lighting_retrofit", "action": "delete_bad_edge", "reason": "Residential Mora forms checked do not support broad LED lighting."},
{"retrofitTypeId": "level_2_ev_charger_installation", "action": "keep", "reason": "Listed ENERGY STAR EV charger form supports Level 2 charger workflow subject to form rules."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "SMMPA form and local utility rules control final rebate value."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.ci.mora.mn.us/electric-utility/pages/rebates-energy-efficiency](https://www.ci.mora.mn.us/electric-utility/pages/rebates-energy-efficiency)",
"[https://smmpa.com/members/mora](https://smmpa.com/members/mora)"
],
"evidenceText": "Mora residential rebates are active through SMMPA forms, but exact amounts require measure-specific current forms.",
"reasoningNotes": "Do not import business SMMPA geothermal, lighting, refrigeration or VSD measures into this residential opportunity.",
"humanReviewRequired": true,
"humanReviewReasons": ["Current form amount extraction is required before deterministic estimates."]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2865",
"opportunityName": "Rochester Public Utilities - Residential Conserve and Save Rebate",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "rate_table", "capped_percent_of_eligible_cost"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Select the RPU residential measure and apply its fixed amount, tiered amount, rate or percent-of-cost cap. Examples include aerosol duct sealing at $2.50/CFM25 reduction with caps, HPWH at $400 or $90 by tank size with 50% cost cap, Level 2 EV charger at $15, appliances at $25-$65, pool pump at $100 with 50% cost cap, and irrigation controller at 50% up to $75.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 1000,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 50,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["residential HVAC", "duct sealing", "HPWH", "smart thermostats", "residential appliances", "EV chargers", "pool pumps", "water conservation measures"],
"ineligibleCostCategories": ["commercial dishwasher", "commercial refrigeration", "residential LED lighting"],
"requiredInputs": ["selected_measure", "equipment_type", "efficiency_tier", "unit_count", "tons", "CFM25_reduction", "tank_gallons", "project_cost", "heating_fuel", "TOU_enrollment"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "quantity_or_size", "tier"],
"rateTable": {
"tableId": "rpu_residential_conserve_save_2026",
"dimensions": ["measure", "quantity_or_tier"],
"rows": [
{"measure": "aerosol duct sealing", "rate": 2.5, "rateUnit": "USD per CFM25 reduction", "capCents": 50000},
{"measure": "HPWH 20-55 gallons", "amountCents": 40000, "cap": "50 percent of cost"},
{"measure": "HPWH over 55 gallons", "amountCents": 9000, "cap": "50 percent of cost"},
{"measure": "Level 2 EV charger", "amountCents": 1500},
{"measure": "first EV on RPU TOU rate", "amountCents": 50000},
{"measure": "appliance examples", "minAmountCents": 2500, "maxAmountCents": 6500},
{"measure": "efficient pool pump", "amountCents": 10000, "cap": "50 percent of cost"},
{"measure": "weather-based irrigation controller", "percent": 50, "maxAmountCents": 7500}
]
},
"measureCatalog": {
"catalogId": "rpu_residential_conserve_save_2026",
"selectionInput": "selected_measure",
"rows": []
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "RPU publishes current residential rebates for ducts, HVAC, HPWH, thermostats, appliances, EV chargers, pool pumps and water measures.",
"sourceUrls": ["[https://www.rpu.org/rebates-programs/conserve-save-rebates/residential-rebates/](https://www.rpu.org/rebates-programs/conserve-save-rebates/residential-rebates/)"]
}
],
"edgeActions": [
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "keep", "reason": "RPU lists ground-source heat-pump rebates starting at a stated amount."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "RPU lists air-source heat-pump and related HVAC rebates."},
{"retrofitTypeId": "high_efficiency_commercial_dishwasher", "action": "delete_bad_edge", "reason": "RPU lists residential dishwashers only, not commercial dishwasher equipment."},
{"retrofitTypeId": "high_efficiency_furnace_retrofit", "action": "delete_bad_edge", "reason": "RPU supports furnace fan replacement, not broad high-efficiency furnace replacement."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Central AC and heat-pump replacements are supported residential measures."},
{"retrofitTypeId": "high_efficiency_laundry_equipment", "action": "keep", "reason": "Residential clothes washer and washer/dryer combo rebates are listed."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "keep", "reason": "Supported only as residential refrigerator/freezer appliance rebates."},
{"retrofitTypeId": "led_lighting_retrofit", "action": "delete_bad_edge", "reason": "No current residential LED lighting rebate was verified on the RPU residential page."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "RPU lists smart thermostat rebates with tiered amounts."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebates cannot exceed measure-specific caps where stated; other incentives depend on RPU rules."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": ["[https://www.rpu.org/rebates-programs/conserve-save-rebates/residential-rebates/](https://www.rpu.org/rebates-programs/conserve-save-rebates/residential-rebates/)"],
"evidenceText": "RPU publishes a current residential measure catalog with fixed, tiered, rate-based and capped percent-of-cost rebates.",
"reasoningNotes": "Commercial dishwasher and LED retrofit edges were removed because the current page supports residential products and no residential lighting rebate.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1589",
"opportunityName": "Xcel Energy (Electric) - Business Energy Efficiency Rebate Programs",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "rate_table", "custom_quote"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Apply the Xcel Minnesota business prescriptive amount for the selected lighting, control, VFD or refrigeration measure. Examples include VFD table amounts by hp, evaporator fan controls at $35 per motor controller, floating head pressure controls at $50/low-temp ton or $25/medium-temp ton, LED refrigerated case lighting at $45/door, LED tubes at $2-$5/lamp, occupancy controls at $0.05/controlled watt, and networked lighting controls at $0.40/controlled watt.",
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
"eligibleCostCategories": ["business lighting", "networked lighting controls", "VFDs", "commercial refrigeration controls", "commercial refrigeration lighting", "custom HVAC-R"],
"ineligibleCostCategories": ["general building-envelope insulation"],
"requiredInputs": ["selected_measure", "motor_hp", "lamp_count", "door_count", "controlled_watts", "refrigeration_tons", "equipment_specs", "project_cost", "preapproval_status"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "quantity_or_size", "service_fuel"],
"rateTable": {
"tableId": "xcel_mn_business_2024_hvacr_lighting",
"dimensions": ["measure", "size_or_quantity"],
"rows": [
{"measure": "VFD 1-3 hp", "amountCents": 40000},
{"measure": "VFD 10 hp", "amountCents": 100000},
{"measure": "VFD 50 hp", "amountCents": 350000},
{"measure": "VFD 100 hp", "amountCents": 600000},
{"measure": "evaporator fan controls", "amountCents": 3500},
{"measure": "floating head pressure low temperature", "rate": 50, "rateUnit": "USD per ton"},
{"measure": "floating head pressure medium temperature", "rate": 25, "rateUnit": "USD per ton"},
{"measure": "LED refrigerated case lighting", "amountCents": 4500},
{"measure": "LED Type A/B/C tube", "minAmountCents": 200, "maxAmountCents": 500},
{"measure": "standalone occupancy control", "rate": 0.05, "rateUnit": "USD per controlled watt"},
{"measure": "networked lighting control", "rate": 0.4, "rateUnit": "USD per controlled watt"}
]
},
"measureCatalog": {"catalogId": null, "selectionInput": null, "rows": []},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Xcel Minnesota business applications publish prescriptive VFD, refrigeration, LED lighting and lighting-control rows; custom projects require approval.",
"sourceUrls": [
"[https://www.xcelenergy.com/programs_and_rebates/business_programs_and_rebates](https://www.xcelenergy.com/programs_and_rebates/business_programs_and_rebates)",
"[https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates/business-lighting-efficiency](https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates/business-lighting-efficiency)",
"[https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates/hvac-r](https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates/hvac-r)",
"[https://www.xcelenergy.com/staticfiles/xe-responsive/Business%20Programs%20%26%20Rebates/Equipment%20Rebates/17-9181%20%2804-24%29%20MN-HVAC-R_app%20January%201%2C%202024%2C%20or%20later%201%20042224.pdf](https://www.xcelenergy.com/staticfiles/xe-responsive/Business%20Programs%20%26%20Rebates/Equipment%20Rebates/17-9181%20%2804-24%29%20MN-HVAC-R_app%20January%201%2C%202024%2C%20or%20later%201%20042224.pdf)",
"[https://www.xcelenergy.com/staticfiles/xe-responsive/Business%20Programs%20%26%20Rebates/Lighting/17-9158%20MN-Biz_LightNewConstr_app%20invoices%20dated%202024%20or%20later%20020124%20%281%29%20020224.pdf](https://www.xcelenergy.com/staticfiles/xe-responsive/Business%20Programs%20%26%20Rebates/Lighting/17-9158%20MN-Biz_LightNewConstr_app%20invoices%20dated%202024%20or%20later%20020124%20%281%29%20020224.pdf)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Business HVAC-R is supported; some equipment may be prescriptive while nonlisted equipment requires custom review."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "keep", "reason": "Commercial refrigeration measures and controls are listed in the HVAC-R application."},
{"retrofitTypeId": "insulation_upgrade", "action": "delete_bad_edge", "reason": "Current checked sources support pipe or refrigeration insulation, not general building-envelope insulation."},
{"retrofitTypeId": "led_lighting_retrofit", "action": "keep", "reason": "Business lighting application lists multiple LED fixture and lamp rebate rows."},
{"retrofitTypeId": "lighting_controls_retrofit", "action": "keep", "reason": "Lighting controls and networked controls have published per-watt rows."},
{"retrofitTypeId": "refrigeration_controls_retrofit", "action": "keep", "reason": "Floating head pressure and other refrigeration controls have published rows."},
{"retrofitTypeId": "refrigeration_ec_motor_retrofit", "action": "keep", "reason": "Evaporator fan controls/motor controller rows are supported."},
{"retrofitTypeId": "variable_frequency_drive_retrofit", "action": "keep", "reason": "VFD rebates have a published horsepower table."},
{"retrofitTypeId": "walk_in_cooler_freezer_upgrade", "action": "keep", "reason": "Walk-in and refrigeration-related control/case measures are supported in the business HVAC-R catalog."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate and custom project rules may limit incentives by cost and require correct Xcel electric or gas service."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.xcelenergy.com/programs_and_rebates/business_programs_and_rebates](https://www.xcelenergy.com/programs_and_rebates/business_programs_and_rebates)",
"[https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates/business-lighting-efficiency](https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates/business-lighting-efficiency)",
"[https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates/hvac-r](https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates/hvac-r)",
"[https://www.xcelenergy.com/staticfiles/xe-responsive/Business%20Programs%20%26%20Rebates/Equipment%20Rebates/17-9181%20%2804-24%29%20MN-HVAC-R_app%20January%201%2C%202024%2C%20or%20later%201%20042224.pdf](https://www.xcelenergy.com/staticfiles/xe-responsive/Business%20Programs%20%26%20Rebates/Equipment%20Rebates/17-9181%20%2804-24%29%20MN-HVAC-R_app%20January%201%2C%202024%2C%20or%20later%201%20042224.pdf)",
"[https://www.xcelenergy.com/staticfiles/xe-responsive/Business%20Programs%20%26%20Rebates/Lighting/17-9158%20MN-Biz_LightNewConstr_app%20invoices%20dated%202024%20or%20later%20020124%20%281%29%20020224.pdf](https://www.xcelenergy.com/staticfiles/xe-responsive/Business%20Programs%20%26%20Rebates/Lighting/17-9158%20MN-Biz_LightNewConstr_app%20invoices%20dated%202024%20or%20later%20020124%20%281%29%20020224.pdf)"
],
"evidenceText": "Xcel publishes current Minnesota business lighting, VFD and refrigeration rate tables; non-prescriptive measures require custom review.",
"reasoningNotes": "General insulation edge was deleted because checked Xcel sources did not support broad envelope insulation under this electric business record.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5101",
"opportunityName": "Business Energy Efficiency Rebates (Offered by 5 Utilities)",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["custom_quote", "competitive_cost_share"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "custom_quote",
"timing": "application_process",
"formulaText": "Use the selected Bright Energy Solutions business form for prescriptive categories. Custom efficiency incentives are evaluated by the local utility and are based on approved peak-period demand savings, with project-cost caps where applicable. Exact selected measure amount must come from the participating member utility or current form.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 75,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["commercial refrigeration", "food service", "HVAC", "heat pumps", "geothermal", "lighting", "pumps", "VFDs", "compressed air", "custom efficiency", "electric forklifts"],
"ineligibleCostCategories": ["window replacement glazing", "residential projects"],
"requiredInputs": ["participating_utility", "selected_business_category", "equipment_specs", "approved_peak_kW_savings", "first_year_kWh_savings", "eligible_project_cost", "preapproval_status"],
"missingInputsForTypicalRetroFiEstimate": ["participating_utility", "selected_measure", "approved_savings_or_prescriptive_amount"],
"rateTable": {"tableId": null, "dimensions": [], "rows": []},
"measureCatalog": {
"catalogId": "bright_energy_solutions_business_categories_2026",
"selectionInput": "selected_business_category",
"rows": [
{"measure": "commercial refrigeration and food service", "amountCents": null, "notes": "current member utility form required"},
{"measure": "heating and cooling including heat pumps and geothermal", "amountCents": null, "notes": "current member utility form required"},
{"measure": "lighting and networked controls", "amountCents": null, "notes": "current member utility form required"},
{"measure": "pumps, VFDs and compressed air", "amountCents": null, "notes": "current member utility form required"},
{"measure": "custom efficiency or electrification", "amountCents": null, "notes": "requires preapproval and savings evaluation"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Bright Energy Solutions 2026 business materials list categories and state incentives may change and some projects require preapproval.",
"sourceUrls": [
"[https://www.brightenergysolutions.com/resources/business](https://www.brightenergysolutions.com/resources/business)",
"[https://www.brightenergysolutions.com/members](https://www.brightenergysolutions.com/members)",
"[https://www.brightenergysolutions.com/members/valley-city-public-works](https://www.brightenergysolutions.com/members/valley-city-public-works)",
"[https://d23r6s4dwed217.cloudfront.net/general-uploads/BES_2026_Business_TriFold_Brochure.pdf](https://d23r6s4dwed217.cloudfront.net/general-uploads/BES_2026_Business_TriFold_Brochure.pdf)",
"[https://d23r6s4dwed217.cloudfront.net/general-uploads/Customize-Your-Own-Efficiency-Incentive_FLYER.pdf](https://d23r6s4dwed217.cloudfront.net/general-uploads/Customize-Your-Own-Efficiency-Incentive_FLYER.pdf)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "electric_forklift_material_handling", "action": "keep", "reason": "Electric forklifts and material-handling electrification are listed business categories."},
{"retrofitTypeId": "energy_management_system", "action": "keep", "reason": "Supported only for guestroom energy management, controls or approved custom projects, not generic EMS."},
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "keep", "reason": "Business heating/cooling categories include geothermal heat pumps subject to local utility form."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "Business heating/cooling categories include heat pumps subject to local utility form."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "Business heating/cooling or water-heating forms may support HPWH measures subject to member utility rules."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Business HVAC is a supported category."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "keep", "reason": "Commercial refrigeration is a listed business category."},
{"retrofitTypeId": "led_lighting_retrofit", "action": "keep", "reason": "Business lighting is a listed category."},
{"retrofitTypeId": "window_replacement", "action": "delete_bad_edge", "reason": "The source supports window or wall room air-conditioning equipment, not glazing or window replacement."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Custom flyer caps custom incentives at 75% of project cost, or 100% for self-installed projects where allowed."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.brightenergysolutions.com/resources/business](https://www.brightenergysolutions.com/resources/business)",
"[https://www.brightenergysolutions.com/members](https://www.brightenergysolutions.com/members)",
"[https://www.brightenergysolutions.com/members/valley-city-public-works](https://www.brightenergysolutions.com/members/valley-city-public-works)",
"[https://d23r6s4dwed217.cloudfront.net/general-uploads/BES_2026_Business_TriFold_Brochure.pdf](https://d23r6s4dwed217.cloudfront.net/general-uploads/BES_2026_Business_TriFold_Brochure.pdf)",
"[https://d23r6s4dwed217.cloudfront.net/general-uploads/Customize-Your-Own-Efficiency-Incentive_FLYER.pdf](https://d23r6s4dwed217.cloudfront.net/general-uploads/Customize-Your-Own-Efficiency-Incentive_FLYER.pdf)"
],
"evidenceText": "Bright Energy Solutions business rebates are active for the five North Dakota member utilities, but exact value depends on the selected member and form.",
"reasoningNotes": "Do not treat the program as statewide or residential; local municipal utility participation and current form selection are required.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3963",
"opportunityName": "McMinnville Water and Light - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "medium",
"estimateConfidence": "medium",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "rate_table", "competitive_award_range"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Apply the McMinnville residential amount for the selected envelope, heat-pump, HPWH, thermostat or appliance measure. Source-backed examples include window replacement at $4.50/sq ft, HPWH at $525 for 40 gallon and $600 for 50-gallon-or-higher Tier 3, and heat-pump/weatherization incentives with ranges or enhancements that require project and qualification inputs.",
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
"eligibleCostCategories": ["residential insulation", "weatherization", "windows", "doors", "duct sealing", "heat pumps", "HPWH", "thermostats", "washers", "dryers"],
"ineligibleCostCategories": ["commercial refrigeration", "commercial kitchen", "industrial measures"],
"requiredInputs": ["selected_measure", "utility_account", "electric_heat_status", "income_qualification", "square_feet", "tank_gallons", "equipment_tier", "equipment_type", "project_cost"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "quantity_or_area", "income_or_equipment_tier"],
"rateTable": {
"tableId": "mcminnville_residential_current_limited",
"dimensions": ["measure", "quantity_or_tier"],
"rows": [
{"measure": "window replacement", "rate": 4.5, "rateUnit": "USD per square foot"},
{"measure": "HPWH 40 gallon", "amountCents": 52500},
{"measure": "HPWH 50 gallon or larger Tier 3", "amountCents": 60000},
{"measure": "heat pump/weatherization enhanced incentives", "minAmountCents": 92000, "maxAmountCents": 900000},
{"measure": "MW&L enhancement", "maxAmountCents": 150000}
]
},
"measureCatalog": {"catalogId": null, "selectionInput": null, "rows": []},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Official McMinnville sources list envelope, heat-pump, HPWH, thermostat and appliance rebates; some pages were not fully readable.",
"sourceUrls": [
"[https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/](https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/)",
"[https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/energy-star-washer-dryer-rebate/](https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/energy-star-washer-dryer-rebate/)",
"[https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/smart-thermostat-rebate/](https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/smart-thermostat-rebate/)",
"[https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/insulation-weatherization-rebate/](https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/insulation-weatherization-rebate/)",
"[https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/heat-pump-water-heater-rebate/](https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/heat-pump-water-heater-rebate/)",
"[https://www.mc-power.com/news-releases/mwl-adds-250000-to-rebates-for-heat-pumps-weatherization/](https://www.mc-power.com/news-releases/mwl-adds-250000-to-rebates-for-heat-pumps-weatherization/)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "air_sealing_weatherization", "action": "keep", "reason": "Weatherization is listed as a residential rebate category; exact measure amount requires current form/tier."},
{"retrofitTypeId": "duct_sealing_and_insulation", "action": "keep", "reason": "Duct sealing and insulation are listed residential measures subject to electric-heating and form rules."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "Heat-pump rebates and enhanced incentive ranges are supported by official McMinnville sources."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "Official HPWH page snippets provide fixed amounts for selected tank/tier combinations."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Supported when the replacement is a qualifying residential heat-pump measure."},
{"retrofitTypeId": "high_efficiency_laundry_equipment", "action": "keep", "reason": "Washer and dryer rebates are listed as residential appliance measures."},
{"retrofitTypeId": "insulation_upgrade", "action": "keep", "reason": "Insulation/weatherization is a listed residential rebate category."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "Smart thermostat rebates are listed, with exact value subject to current page/form."},
{"retrofitTypeId": "window_replacement", "action": "keep", "reason": "Official snippets support qualifying window replacement at a square-foot rate."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Enhanced and income-based offers should not be assumed generally available."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/](https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/)",
"[https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/energy-star-washer-dryer-rebate/](https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/energy-star-washer-dryer-rebate/)",
"[https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/smart-thermostat-rebate/](https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/smart-thermostat-rebate/)",
"[https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/insulation-weatherization-rebate/](https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/insulation-weatherization-rebate/)",
"[https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/heat-pump-water-heater-rebate/](https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/heat-pump-water-heater-rebate/)",
"[https://www.mc-power.com/news-releases/mwl-adds-250000-to-rebates-for-heat-pumps-weatherization/](https://www.mc-power.com/news-releases/mwl-adds-250000-to-rebates-for-heat-pumps-weatherization/)"
],
"evidenceText": "McMinnville provides residential electric-customer rebates, but some official detail pages were difficult to read and need form confirmation for full precision.",
"reasoningNotes": "Use current form extraction before defaulting user-facing totals for enhanced heat-pump/weatherization offers.",
"humanReviewRequired": true,
"humanReviewReasons": ["Some official detail pages returned limited readable content; exact tiers and caps should be verified."]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2015",
"opportunityName": "Austin Energy - Multi-Family Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate", "process_value"],
"primaryValueModelKinds": ["measure_catalog", "rate_table", "non_cash_process_value"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Select the Austin Energy multifamily measure and apply its per-ton, per-square-foot, per-lamp, fixed or annual reward amount. HVAC replacement is $300-$400/ton and capped at $300,000 per customer site per fiscal year. Other listed values include attic insulation up to $1.31/sf, LED lighting $2-$19/lamp, Power Partner thermostats up to $180/thermostat, Smart Home Rewards $5/year/device up to $10/residence, and window/screen measures up to $3/sf.",
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
"perSiteCapCents": 30000000,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["multifamily HVAC", "duct systems", "attic insulation", "LED lighting", "thermostat rewards", "window replacement", "solar screens", "ECAD audit incentive"],
"ineligibleCostCategories": ["commercial refrigeration", "PACE financing as rebate"],
"requiredInputs": ["selected_measure", "property_account", "tons", "square_feet", "lamp_count", "thermostat_count", "program_enrollment", "property_units", "efficiency_tier"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "quantity_or_size", "program_pathway"],
"rateTable": {
"tableId": "austin_energy_multifamily_current",
"dimensions": ["measure", "quantity_or_tier"],
"rows": [
{"measure": "HVAC replacement", "minAmountCents": 30000, "maxAmountCents": 40000, "rateUnit": "per ton"},
{"measure": "attic insulation", "rate": 1.31, "rateUnit": "USD per square foot"},
{"measure": "duct sealing or remediation", "minAmountCents": 8000, "maxAmountCents": 10000, "rateUnit": "per ton"},
{"measure": "plenum redesign or remediation", "minAmountCents": 33500, "maxAmountCents": 35000, "rateUnit": "per plenum"},
{"measure": "LED lighting", "minAmountCents": 200, "maxAmountCents": 1900, "rateUnit": "per lamp"},
{"measure": "Power Partner thermostat", "maxAmountCents": 18000},
{"measure": "Smart Home Rewards", "rate": 5, "rateUnit": "USD per year per device", "maxAmountCents": 1000},
{"measure": "solar screens or window replacement", "rate": 3, "rateUnit": "USD per square foot"},
{"measure": "ECAD audit incentive", "minAmountCents": 10000, "maxAmountCents": 250000}
]
},
"measureCatalog": {"catalogId": null, "selectionInput": null, "rows": []},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Austin Energy multifamily pages publish HVAC, insulation, duct, lighting, thermostat, audit and window/screen amounts or ranges.",
"sourceUrls": [
"[https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily](https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily)",
"[https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily/cooling-heating/hvac](https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily/cooling-heating/hvac)",
"[https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily/property-improvements/duct-system](https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily/property-improvements/duct-system)",
"[https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily/property-improvements](https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily/property-improvements)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "air_sealing_weatherization", "action": "needs_review", "reason": "Current pages support property improvements and duct measures, but no standalone multifamily air-sealing amount was verified."},
{"retrofitTypeId": "duct_sealing_and_insulation", "action": "keep", "reason": "Duct-system improvements have published per-ton and plenum ranges."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "HVAC replacement page supports qualifying mini-splits and heat pumps at per-ton amounts."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "HVAC replacement page supports qualifying AC, mini-splits and heat pumps."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "delete_bad_edge", "reason": "No multifamily commercial refrigeration measure was verified on Austin Energy pages."},
{"retrofitTypeId": "insulation_upgrade", "action": "keep", "reason": "Attic insulation is listed at an up-to square-foot amount."},
{"retrofitTypeId": "led_lighting_retrofit", "action": "keep", "reason": "Multifamily LED lighting has per-lamp ranges."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "move_to_special_workflow", "reason": "Thermostat value is tied to Power Partner or Smart Home Rewards enrollment, not a simple thermostat purchase rebate."},
{"retrofitTypeId": "window_replacement", "action": "keep", "reason": "Solar screen and window replacement incentives are listed at an up-to square-foot amount."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "PACE is financing and should not be counted as a rebate; Austin Energy measure caps and program-pathway rules apply."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily](https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily)",
"[https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily/cooling-heating/hvac](https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily/cooling-heating/hvac)",
"[https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily/property-improvements/duct-system](https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily/property-improvements/duct-system)",
"[https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily/property-improvements](https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily/property-improvements)"
],
"evidenceText": "Austin Energy multifamily rebates are measure-specific; EV, solar, audit, thermostat reward and financing pathways should remain separate workflows.",
"reasoningNotes": "HVAC cap is not a universal cap for every measure but is relevant to HVAC replacement rows.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4222",
"opportunityName": "Clallam County PUD - Residential Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "medium",
"estimateConfidence": "medium",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "rate_table"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Apply the current Clallam PUD residential amount for the selected qualifying measure. Official snippets identify smart thermostats at $140 each with a two-per-household limit, ductless heat pumps at $920 where replacing electric resistance heat, HPWH examples at $1,400 for 40-gallon and up to $2,200 for other qualifying tanks, and windows or patio doors at $8/sf; form confirmation is required.",
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
"maxUnits": 2,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["ductless heat pumps", "variable-speed heat pumps", "heat pump water heaters", "smart thermostats", "windows", "insulation", "duct measures", "residential appliances"],
"ineligibleCostCategories": ["broad air sealing", "broad LED retrofit"],
"requiredInputs": ["selected_measure", "customer_account", "equipment_type", "tank_gallons", "window_square_feet", "thermostat_count", "heating_system_type", "installed_cost"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "quantity_or_size", "current_form_confirmation"],
"rateTable": {
"tableId": "clallam_pud_residential_current_limited",
"dimensions": ["measure", "quantity_or_tier"],
"rows": [
{"measure": "smart thermostat", "amountCents": 14000, "maxUnits": 2},
{"measure": "ductless heat pump replacing electric resistance", "amountCents": 92000},
{"measure": "HPWH 40 gallon", "amountCents": 140000},
{"measure": "other qualifying HPWH", "maxAmountCents": 220000},
{"measure": "window or patio door replacement", "rate": 8, "rateUnit": "USD per square foot"}
]
},
"measureCatalog": {"catalogId": null, "selectionInput": null, "rows": []},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Official Clallam snippets identify thermostat, ductless heat-pump, HPWH, window and residential rebate categories, but detail pages were limited.",
"sourceUrls": [
"[https://www.clallampud.net/ways-to-save/rebates-incentives/residential/](https://www.clallampud.net/ways-to-save/rebates-incentives/residential/)",
"[https://www.clallampud.net/faqs/ductless-heat-pumps/](https://www.clallampud.net/faqs/ductless-heat-pumps/)",
"[https://www.clallampud.net/faqs/variable-speed-heat-pumps/](https://www.clallampud.net/faqs/variable-speed-heat-pumps/)",
"[https://www.clallampud.net/faqs/heat-pump-water-heaters/](https://www.clallampud.net/faqs/heat-pump-water-heaters/)",
"[https://www.clallampud.net/faqs/smart-thermostat-rebate/](https://www.clallampud.net/faqs/smart-thermostat-rebate/)",
"[https://www.clallampud.net/faqs/windows/](https://www.clallampud.net/faqs/windows/)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "air_sealing_weatherization", "action": "delete_bad_edge", "reason": "Broad air sealing was not verified in current Clallam PUD residential forms."},
{"retrofitTypeId": "duct_sealing_and_insulation", "action": "keep", "reason": "Duct and residential weatherization-related measures are listed, subject to form confirmation."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "Ductless and variable-speed heat-pump rebate pages are current program categories."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Supported only for qualifying heat-pump HVAC equipment, not generic HVAC."},
{"retrofitTypeId": "high_efficiency_laundry_equipment", "action": "keep", "reason": "Residential appliance rebates include clothes washer/dryer categories, with exact amounts requiring form confirmation."},
{"retrofitTypeId": "insulation_upgrade", "action": "keep", "reason": "Residential insulation is listed as a rebate category; exact amount requires current form confirmation."},
{"retrofitTypeId": "led_lighting_retrofit", "action": "delete_bad_edge", "reason": "Lighting support appears limited to area-light or product-specific measures, not broad LED retrofits."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "Official snippets support a smart thermostat rebate with a per-thermostat amount and household limit."},
{"retrofitTypeId": "window_replacement", "action": "keep", "reason": "Official snippets support qualifying window or patio door replacement at a square-foot rate."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Measure-specific limits and funding availability are controlled by Clallam PUD forms."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.clallampud.net/ways-to-save/rebates-incentives/residential/](https://www.clallampud.net/ways-to-save/rebates-incentives/residential/)",
"[https://www.clallampud.net/faqs/ductless-heat-pumps/](https://www.clallampud.net/faqs/ductless-heat-pumps/)",
"[https://www.clallampud.net/faqs/variable-speed-heat-pumps/](https://www.clallampud.net/faqs/variable-speed-heat-pumps/)",
"[https://www.clallampud.net/faqs/heat-pump-water-heaters/](https://www.clallampud.net/faqs/heat-pump-water-heaters/)",
"[https://www.clallampud.net/faqs/smart-thermostat-rebate/](https://www.clallampud.net/faqs/smart-thermostat-rebate/)",
"[https://www.clallampud.net/faqs/windows/](https://www.clallampud.net/faqs/windows/)"
],
"evidenceText": "Clallam residential rebates are active, but several detail pages were not fully readable; use source-backed rows and require form confirmation.",
"reasoningNotes": "Lighting and broad air-sealing edges were removed because current official snippets did not support those broad retrofit categories.",
"humanReviewRequired": true,
"humanReviewReasons": ["Official pages returned limited readable content; full application forms should be verified."]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2197",
"opportunityName": "Mason County PUD 3 - Residential Energy Rebates",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "medium",
"estimateConfidence": "medium",
"cashValueClassifications": ["rebate", "technical_assistance"],
"primaryValueModelKinds": ["measure_catalog", "non_cash_process_value"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Apply the current PUD 3 amount for the selected residential heat-pump, thermostat, insulation, duct or appliance measure. Official snippets identify $1,250 for a heat pump replacing existing electric forced-air furnace, $600 for a variable-speed heat pump in specified cases, and thermostat values of $140 self-installed or $165 contractor-installed; income-qualified enhanced incentives require qualification and form confirmation.",
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
"eligibleCostCategories": ["residential heat pumps", "ductless mini-splits", "HPWH", "duct sealing", "insulation", "smart thermostats", "residential appliances"],
"ineligibleCostCategories": ["broad air sealing", "EV charging in this record", "energy audit as physical retrofit"],
"requiredInputs": ["selected_measure", "customer_account", "existing_heating_system", "equipment_type", "installation_type", "income_qualification", "project_cost", "current_form"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "current_form_amount", "qualification_status"],
"rateTable": {
"tableId": "mason_pud3_residential_current_limited",
"dimensions": ["measure", "installation_case"],
"rows": [
{"measure": "heat pump replacing existing electric forced-air furnace", "amountCents": 125000},
{"measure": "variable-speed heat pump for existing heat pump or new construction", "amountCents": 60000},
{"measure": "ductless heat pump", "amountCents": 80000, "notes": "amount should be form-confirmed"},
{"measure": "smart thermostat self-install", "amountCents": 14000},
{"measure": "smart thermostat contractor install", "amountCents": 16500},
{"measure": "income-qualified ductless heat pump", "maxAmountCents": 600000},
{"measure": "income-qualified air-source heat pump", "maxAmountCents": 900000}
]
},
"measureCatalog": {"catalogId": null, "selectionInput": null, "rows": []},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "PUD 3 official snippets support heat-pump, thermostat, insulation and appliance categories; some pages were access-limited.",
"sourceUrls": [
"[https://www.pud3.org/ways-to-save/rebates-incentives/](https://www.pud3.org/ways-to-save/rebates-incentives/)",
"[https://www.pud3.org/faqs/low-income-incentives/](https://www.pud3.org/faqs/low-income-incentives/)",
"[https://www.pud3.org/faqs/heat-pump-incentives/](https://www.pud3.org/faqs/heat-pump-incentives/)",
"[https://www.pud3.org/faqs/insulation-incentives/](https://www.pud3.org/faqs/insulation-incentives/)",
"[https://www.pud3.org/faqs/appliance-incentives/](https://www.pud3.org/faqs/appliance-incentives/)",
"[https://www.pud3.org/news-releases/bill-credits-expanded-rebates-programs-available/](https://www.pud3.org/news-releases/bill-credits-expanded-rebates-programs-available/)",
"[https://programs.dsireusa.org/system/program/detail/2197/mason-county-pud-3-residential-energy-rebates](https://programs.dsireusa.org/system/program/detail/2197/mason-county-pud-3-residential-energy-rebates)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "air_sealing_weatherization", "action": "delete_bad_edge", "reason": "Current support was not verified beyond duct and insulation measures."},
{"retrofitTypeId": "duct_sealing_and_insulation", "action": "keep", "reason": "PUD 3 residential program supports duct sealing/insulation measures subject to forms."},
{"retrofitTypeId": "energy_audit", "action": "move_to_special_workflow", "reason": "Energy audits or surveys are advisory/technical-assistance workflows, not physical retrofit rebates."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "Official heat-pump incentive snippets provide current rebate values for selected heat-pump cases."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "Residential rebate information supports HPWH category, though exact amount requires current form."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Supported only where the replacement is a qualifying heat-pump measure."},
{"retrofitTypeId": "high_efficiency_laundry_equipment", "action": "keep", "reason": "Residential appliance rebates are supported, with current amount needing form selection."},
{"retrofitTypeId": "insulation_upgrade", "action": "keep", "reason": "Insulation incentives are a listed residential category."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "Official snippets identify thermostat rebate amounts for qualifying homes."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Income-qualified incentives must not be assumed for general customers."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.pud3.org/ways-to-save/rebates-incentives/](https://www.pud3.org/ways-to-save/rebates-incentives/)",
"[https://www.pud3.org/faqs/low-income-incentives/](https://www.pud3.org/faqs/low-income-incentives/)",
"[https://www.pud3.org/faqs/heat-pump-incentives/](https://www.pud3.org/faqs/heat-pump-incentives/)",
"[https://www.pud3.org/faqs/insulation-incentives/](https://www.pud3.org/faqs/insulation-incentives/)",
"[https://www.pud3.org/faqs/appliance-incentives/](https://www.pud3.org/faqs/appliance-incentives/)",
"[https://www.pud3.org/news-releases/bill-credits-expanded-rebates-programs-available/](https://www.pud3.org/news-releases/bill-credits-expanded-rebates-programs-available/)",
"[https://programs.dsireusa.org/system/program/detail/2197/mason-county-pud-3-residential-energy-rebates](https://programs.dsireusa.org/system/program/detail/2197/mason-county-pud-3-residential-energy-rebates)"
],
"evidenceText": "Mason PUD 3 rebates are active but source access was limited; exact current measure forms should be checked before default user totals.",
"reasoningNotes": "Energy audit is moved to a non-cash workflow, and broad air sealing is deleted.",
"humanReviewRequired": true,
"humanReviewReasons": ["Official pages were partially access-restricted; some amounts rely on snippets or directory fallback."]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3680",
"opportunityName": "Entergy Arkansas - Residential Energy Efficiency Programs",
"repairStatus": "non_monetary_workflow",
"calculationStatus": "non_monetary_workflow",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": ["technical_assistance", "process_value", "non_cash"],
"primaryValueModelKinds": ["non_cash_process_value"],
"effects": [
{
"effectType": "process_value",
"cashValueClassification": "process_value",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Home Energy Solutions is delivered through an assessment and approved trade allies; qualifying core and direct-install measures may be installed at no additional customer cost, but no customer-side cash rebate formula is published.",
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
"eligibleCostCategories": ["home energy assessment", "air sealing", "duct sealing", "ceiling insulation", "AC tune-up", "direct-install devices", "qualified smart thermostat workflow"],
"ineligibleCostCategories": ["new heat-pump replacement", "new HVAC replacement", "refrigerators or freezers", "LED lighting rebate"],
"requiredInputs": ["customer_account", "home_type", "ducted_HVAC_status", "electric_water_heating_status", "approved_trade_ally_assessment", "measure_diagnostics"],
"missingInputsForTypicalRetroFiEstimate": ["approved_trade_ally_assessment", "measure_scope"],
"rateTable": {"tableId": null, "dimensions": [], "rows": []},
"measureCatalog": {"catalogId": null, "selectionInput": null, "rows": []},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Entergy Arkansas sources describe no-out-of-pocket assessments, core weatherization measures, direct installs and approved trade-ally delivery.",
"sourceUrls": [
"[https://www.entergyarkansas.com/energyefficiency/residential/home-energy-solutions-program](https://www.entergyarkansas.com/energyefficiency/residential/home-energy-solutions-program)",
"[https://www.entergyarkansas.com/wp-content/uploads/2025/06/HES_Guidebook.pdf](https://www.entergyarkansas.com/wp-content/uploads/2025/06/HES_Guidebook.pdf)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "air_sealing_weatherization", "action": "keep", "reason": "Air sealing is a current Home Energy Solutions measure delivered through the program workflow."},
{"retrofitTypeId": "duct_sealing_and_insulation", "action": "keep", "reason": "Duct sealing is a current Home Energy Solutions measure delivered through approved trade allies."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "delete_bad_edge", "reason": "Checked sources support tune-ups and weatherization, not new heat-pump replacement rebates."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "delete_bad_edge", "reason": "Checked sources support AC tune-ups and diagnostic measures, not broad HVAC replacement rebates."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "delete_bad_edge", "reason": "No refrigerator or freezer rebate is supported by the current HES program."},
{"retrofitTypeId": "insulation_upgrade", "action": "keep", "reason": "Ceiling insulation is a current HES measure when diagnostics and program requirements are met."},
{"retrofitTypeId": "led_lighting_retrofit", "action": "delete_bad_edge", "reason": "No current LED lighting rebate was verified in HES sources."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "Qualified thermostat participation may be supported under HES rules, but it is not broad zoning control."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Program-installed measures are not modeled as customer cash rebates."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.entergyarkansas.com/energyefficiency/residential/home-energy-solutions-program](https://www.entergyarkansas.com/energyefficiency/residential/home-energy-solutions-program)",
"[https://www.entergyarkansas.com/wp-content/uploads/2025/06/HES_Guidebook.pdf](https://www.entergyarkansas.com/wp-content/uploads/2025/06/HES_Guidebook.pdf)"
],
"evidenceText": "Entergy Arkansas HES is primarily a no-cost assessment/direct-install workflow rather than a standard customer rebate table.",
"reasoningNotes": "Do not attach refrigeration, LED, heat-pump replacement or HVAC replacement values to this opportunity.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3357",
"opportunityName": "Alameda Municipal Power - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate", "process_value"],
"primaryValueModelKinds": ["measure_catalog", "capped_percent_of_eligible_cost", "non_cash_process_value"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "For each AMP residential measure, rebate is up to the listed amount and cannot exceed pre-tax purchase price after discounts, credits and other rebates. Examples include HPWH up to $1,500, heat-pump HVAC up to $1,500, Level 2 EV charger up to $500, smart thermostat up to $50 with unit limit, induction cooktop/range up to $300-$600 by appliance and income status, income-qualified solar $500, and residential solar interconnection fee waiver of $330 where applicable.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 150000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 100,
"maxUnits": 2,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["HPWH", "heat pump HVAC", "heat pump clothes dryer", "induction cooking", "smart thermostat", "Level 2 EV charger", "panel upgrade", "energy management device", "income-qualified solar", "interconnection fee waiver"],
"ineligibleCostCategories": ["generic LED lighting", "general rooftop solar PV rebate", "dual-fuel induction", "portable induction"],
"requiredInputs": ["selected_measure", "AMP_account", "project_cost", "income_qualification", "gas_replacement", "permit", "equipment_model", "D1_H_rate", "charger_level", "home_built_before_2020"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "project_cost", "qualification_status"],
"rateTable": {
"tableId": "alameda_mp_residential_2026",
"dimensions": ["measure", "customer_or_equipment_tier"],
"rows": [
{"measure": "HPWH replacing gas water heater", "maxAmountCents": 150000},
{"measure": "heat pump HVAC replacing gas furnace", "maxAmountCents": 150000},
{"measure": "Level 2 EV charger", "maxAmountCents": 50000},
{"measure": "smart thermostat", "maxAmountCents": 5000, "maxUnits": 2},
{"measure": "induction cooktop standard", "maxAmountCents": 30000},
{"measure": "induction range standard", "maxAmountCents": 50000},
{"measure": "induction range income-qualified", "maxAmountCents": 60000},
{"measure": "income-qualified solar PV", "amountCents": 50000},
{"measure": "residential solar interconnection fee waiver", "amountCents": 33000}
]
},
"measureCatalog": {"catalogId": null, "selectionInput": null, "rows": []},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "AMP residential materials publish up-to caps for electrification measures, Level 2 chargers, smart thermostats and limited income-qualified solar support.",
"sourceUrls": [
"[https://www.alamedamp.com/407/Rebates-and-Incentives](https://www.alamedamp.com/407/Rebates-and-Incentives)",
"[https://www.alamedamp.com/DocumentCenter/View/1179](https://www.alamedamp.com/DocumentCenter/View/1179)",
"[https://www.alamedamp.com/480/Electrify-My-Home](https://www.alamedamp.com/480/Electrify-My-Home)",
"[https://www.alamedamp.com/430/Solar-at-AMP](https://www.alamedamp.com/430/Solar-at-AMP)",
"[https://www.alamedamp.com/195/Solar-Compensation-Billing](https://www.alamedamp.com/195/Solar-Compensation-Billing)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "ev_charger_installation", "action": "keep", "reason": "AMP supports installed Level 2 residential EV chargers up to the listed cap."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "AMP supports gas-to-electric heat-pump HVAC under strict all-electric and rate requirements."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "AMP supports HPWH replacement of gas water heaters with an up-to cap."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Supported only as qualifying all-electric heat-pump HVAC replacement, not AC-only or gas backup systems."},
{"retrofitTypeId": "induction_cooking_equipment", "action": "keep", "reason": "AMP supports residential induction cooktops and ranges replacing gas equipment; not broad commercial kitchen."},
{"retrofitTypeId": "led_lighting_retrofit", "action": "delete_bad_edge", "reason": "Current AMP residential sources do not support generic LED lighting rebates."},
{"retrofitTypeId": "rooftop_solar_pv", "action": "keep", "reason": "Keep only for AMP income-qualified solar and related residential interconnection fee waiver, not a general PV rebate."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "AMP supports eligible smart thermostats up to a cap and unit limit, not zoning retrofits."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": true,
"notes": "Rebate cannot exceed pre-tax purchase price after discounts, credits and other rebates."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.alamedamp.com/407/Rebates-and-Incentives](https://www.alamedamp.com/407/Rebates-and-Incentives)",
"[https://www.alamedamp.com/DocumentCenter/View/1179](https://www.alamedamp.com/DocumentCenter/View/1179)",
"[https://www.alamedamp.com/480/Electrify-My-Home](https://www.alamedamp.com/480/Electrify-My-Home)",
"[https://www.alamedamp.com/430/Solar-at-AMP](https://www.alamedamp.com/430/Solar-at-AMP)",
"[https://www.alamedamp.com/195/Solar-Compensation-Billing](https://www.alamedamp.com/195/Solar-Compensation-Billing)"
],
"evidenceText": "AMP has calculable up-to caps for electrification measures; solar support is limited and should not be treated as a general PV incentive.",
"reasoningNotes": "All up-to amounts are caps, not expected values; fuel-switching and permit requirements are essential inputs.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22071",
"opportunityName": "Turlock Irrigation District - Commercial Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "rate_table", "hybrid_rate_plus_cap"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "hybrid_rate_plus_cap",
"timing": "post_installation_reimbursement",
"formulaText": "Apply the TID for-business prescriptive amount for the selected refrigeration, HVAC, pool-pump, agricultural pump or dairy-fan measure; custom projects receive $0.08 per verified first-year kWh saved, capped at 50% of project cost. Examples include new refrigeration case $150/LF, freezer case $200/LF, evaporative condenser $150/ton, strip curtains $3/sf, anti-sweat doors $50/door, smart thermostat $50, pool pump $400, ag pump VFD $50/hp, and dairy fan VFD $100/hp.",
"amountCents": null,
"percent": null,
"rate": 0.08,
"rateUnit": "USD per first-year kWh saved",
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 50,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["commercial refrigeration", "commercial HVAC", "smart thermostats", "pool pumps", "agricultural pump VFDs", "dairy fan VFDs", "custom energy efficiency"],
"ineligibleCostCategories": ["EV chargers", "air filtration systems", "building-envelope insulation"],
"requiredInputs": ["selected_measure", "customer_class", "linear_feet", "tons", "square_feet", "door_count", "unit_count", "pump_hp", "fan_hp", "first_year_kWh_savings", "eligible_project_cost", "preapproval_status"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "quantity_or_size", "preapproval_status"],
"rateTable": {
"tableId": "tid_business_current",
"dimensions": ["measure", "quantity_or_size"],
"rows": [
{"measure": "new refrigeration case", "rate": 150, "rateUnit": "USD per linear foot"},
{"measure": "new freezer case", "rate": 200, "rateUnit": "USD per linear foot"},
{"measure": "evaporative-cooled refrigeration condenser", "rate": 150, "rateUnit": "USD per ton"},
{"measure": "strip curtains", "rate": 3, "rateUnit": "USD per square foot"},
{"measure": "low/no anti-sweat heat doors", "amountCents": 5000},
{"measure": "anti-sweat heat controls", "rate": 14, "rateUnit": "USD per linear foot"},
{"measure": "commercial HVAC under 5 tons", "minAmountCents": 25000, "maxAmountCents": 50000},
{"measure": "HVAC equipment over 5 tons", "rate": 120, "rateUnit": "USD per ton"},
{"measure": "ENERGY STAR smart thermostat", "amountCents": 5000},
{"measure": "ENERGY STAR commercial pool pump", "amountCents": 40000, "maxUnits": 4},
{"measure": "agricultural pump VFD", "rate": 50, "rateUnit": "USD per horsepower"},
{"measure": "dairy fan with VFD", "rate": 100, "rateUnit": "USD per horsepower"},
{"measure": "custom efficiency", "rate": 0.08, "rateUnit": "USD per first-year kWh saved", "cap": "50 percent of project cost"}
]
},
"measureCatalog": {"catalogId": null, "selectionInput": null, "rows": []},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "TID publishes current business rates for refrigeration, HVAC, smart thermostats, pool pumps, pump VFDs, dairy fans and custom kWh savings.",
"sourceUrls": [
"[https://www.tid.org/customer-service/rebates-and-savings/for-business/](https://www.tid.org/customer-service/rebates-and-savings/for-business/)",
"[https://rebates.tid.org/](https://rebates.tid.org/)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "air_filtration_system", "action": "delete_bad_edge", "reason": "The source supports variable-speed pool filtration pumps, not air filtration systems."},
{"retrofitTypeId": "efficient_pump_replacement", "action": "keep", "reason": "Agricultural pump VFD and commercial pool-pump measures are supported."},
{"retrofitTypeId": "ev_charger_installation", "action": "delete_bad_edge", "reason": "No EV charger rebate was verified on the current TID for-business rebate page."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Commercial HVAC equipment and heat pumps have published unit or per-ton amounts."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "keep", "reason": "Commercial refrigeration case, condenser, strip-curtain and anti-sweat measures are supported."},
{"retrofitTypeId": "insulation_upgrade", "action": "delete_bad_edge", "reason": "Only refrigeration suction-line insulation is referenced; broad building-envelope insulation is unsupported."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "ENERGY STAR smart thermostats are supported for commercial HVAC; not residential zoning."},
{"retrofitTypeId": "variable_frequency_drive_retrofit", "action": "keep", "reason": "Agricultural pump VFDs and dairy-fan VFDs are supported with horsepower rates."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "TID rebates are generally limited to the lesser of listed rebate or total cost; custom incentives are capped at 50% of project cost."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.tid.org/customer-service/rebates-and-savings/for-business/](https://www.tid.org/customer-service/rebates-and-savings/for-business/)",
"[https://rebates.tid.org/](https://rebates.tid.org/)"
],
"evidenceText": "TID has a current calculable business measure table and custom $/kWh formula, with preapproval and cost caps.",
"reasoningNotes": "Delete EV, air-filtration and broad envelope-insulation edges as unsupported false positives.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2103",
"opportunityName": "Mountain View Electric Association, Inc - Energy Efficiency Rebates Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "rate_table", "capped_percent_of_eligible_cost"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Select the MVEA 2026 rebate row and apply the fixed amount, dollars-per-ton, dollars-per-horsepower, or percent-of-cost cap. Examples include HPWH $350, ASHP/ducted/ductless heat pump $500 up to 1.5 tons or $1,500 over 1.5 tons with 50% equipment-cost limit, GSHP $500/ton new or $250/ton replacement, smart thermostats $25 or $50 if managed, Level 2 EV charging at 50% up to $250 or $1,000, and DC fast charging up to $3,000-$7,500 by kW.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 2000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 50,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["heat pumps", "geothermal", "HPWH", "EV chargers", "smart thermostats", "induction cooktops", "appliance recycling", "commercial lighting", "motors", "VSDs", "forklift electrification"],
"ineligibleCostCategories": ["HVAC blower replacement based on outdoor equipment terms", "commercial refrigeration installation"],
"requiredInputs": ["selected_measure", "member_account", "equipment_type", "tons", "horsepower", "charger_kW", "installed_cost", "previous_fuel", "managed_program_enrollment", "purchase_date"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "quantity_or_size", "installed_cost"],
"rateTable": {
"tableId": "mvea_2026_rebate_product_guide",
"dimensions": ["measure", "size_or_tier"],
"rows": [
{"measure": "HPWH", "amountCents": 35000},
{"measure": "heat pump up to 1.5 tons", "amountCents": 50000},
{"measure": "heat pump over 1.5 tons", "amountCents": 150000},
{"measure": "GSHP new installation", "rate": 500, "rateUnit": "USD per ton"},
{"measure": "GSHP replacement", "rate": 250, "rateUnit": "USD per ton"},
{"measure": "smart thermostat", "amountCents": 2500},
{"measure": "managed smart thermostat", "amountCents": 5000},
{"measure": "Level 2 unmanaged EV charger", "percent": 50, "maxAmountCents": 25000},
{"measure": "Level 2 managed or retail/fee EV charger", "percent": 50, "maxAmountCents": 100000},
{"measure": "DCFC 50-75 kW", "maxAmountCents": 300000},
{"measure": "DCFC 76-149 kW", "maxAmountCents": 500000},
{"measure": "DCFC 150 kW or greater", "maxAmountCents": 750000},
{"measure": "commercial/industrial motor", "rate": 8, "rateUnit": "USD per horsepower"}
]
},
"measureCatalog": {"catalogId": null, "selectionInput": null, "rows": []},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "MVEA's 2026 guide publishes current heat-pump, geothermal, HPWH, EV charging, thermostat, induction, recycling, motors and electrification rows.",
"sourceUrls": [
"[https://www.mvea.coop/save-energy-money/rebates/](https://www.mvea.coop/save-energy-money/rebates/)",
"[https://www.mvea.coop/save-energy-money/rebates/electric-heat-pump-rebates/](https://www.mvea.coop/save-energy-money/rebates/electric-heat-pump-rebates/)",
"[https://www.mvea.coop/save-energy-money/rebates/smart-thermostat-rebates/](https://www.mvea.coop/save-energy-money/rebates/smart-thermostat-rebates/)",
"[https://www.mvea.coop/wp-content/uploads/2026_MVEA_RebateProductGuide.pdf](https://www.mvea.coop/wp-content/uploads/2026_MVEA_RebateProductGuide.pdf)",
"[https://www.mvea.coop/rebates](https://www.mvea.coop/rebates)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "efficient_fan_blower_replacement", "action": "delete_bad_edge", "reason": "Blower term is a false positive from outdoor equipment; no efficient HVAC fan/blower replacement row is supported."},
{"retrofitTypeId": "ev_charger_installation", "action": "keep", "reason": "MVEA publishes Level 2 and DC fast-charger rebate caps."},
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "keep", "reason": "MVEA publishes new and replacement GSHP per-ton rates."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "MVEA publishes air-source, ducted, ductless and radiant heat-pump rows."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Supported only for listed heat-pump or geothermal equipment, not generic HVAC."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "move_to_special_workflow", "reason": "MVEA supports refrigerator/freezer recycling, not high-efficiency refrigeration installation."},
{"retrofitTypeId": "induction_cooking_equipment", "action": "keep", "reason": "MVEA publishes induction cooktop rebates by project and previous fuel type."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "MVEA publishes smart thermostat rows, including managed-program enrollment."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Some rows are limited to the lower of listed amount or 50% of equipment/installed cost; cap and member-account rules apply."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "2026-12-31",
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.mvea.coop/save-energy-money/rebates/](https://www.mvea.coop/save-energy-money/rebates/)",
"[https://www.mvea.coop/save-energy-money/rebates/electric-heat-pump-rebates/](https://www.mvea.coop/save-energy-money/rebates/electric-heat-pump-rebates/)",
"[https://www.mvea.coop/save-energy-money/rebates/smart-thermostat-rebates/](https://www.mvea.coop/save-energy-money/rebates/smart-thermostat-rebates/)",
"[https://www.mvea.coop/wp-content/uploads/2026_MVEA_RebateProductGuide.pdf](https://www.mvea.coop/wp-content/uploads/2026_MVEA_RebateProductGuide.pdf)",
"[https://www.mvea.coop/rebates](https://www.mvea.coop/rebates)"
],
"evidenceText": "MVEA has a current 2026 product guide with calculable fixed, rate and capped percent-of-cost rows.",
"reasoningNotes": "Refrigeration should be modeled as appliance recycling workflow; fan/blower replacement edge is a false positive.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2734",
"opportunityName": "Clay Electric Cooperative, Inc - Energy Smart Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "rate_table", "hybrid_rate_plus_cap"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Apply the listed Clay Electric fixed amount or square-foot/BTU rate for the selected measure. Current values include high-efficiency heat pump $250, electric hybrid HPWH $175, water-heating heat recovery unit $200, solar water heater $0.01/output BTU up to $600, ceiling/attic insulation $0.11/sf up to $600, attic spray foam $0.28/sf up to $600, and window film or solar shade screen $0.44/sf glass up to a combined $440 cap.",
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
"eligibleCostCategories": ["heat pump HVAC", "heat pump water heater", "water-heating heat recovery unit", "solar water heater", "ceiling insulation", "attic spray foam", "window film", "solar shade screens"],
"ineligibleCostCategories": ["window replacement", "industrial waste heat recovery", "generic HVAC beyond heat pumps"],
"requiredInputs": ["selected_measure", "active_account", "project_cost", "square_feet", "glass_square_feet", "output_BTU", "AHRI_or_FSEC_documentation", "receipt_date"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "quantity_or_size", "documentation"],
"rateTable": {
"tableId": "clay_electric_energy_rebates_current",
"dimensions": ["measure", "quantity_or_size"],
"rows": [
{"measure": "high-efficiency heat pump", "amountCents": 25000},
{"measure": "electric hybrid HPWH", "amountCents": 17500},
{"measure": "water-heating heat recovery unit", "amountCents": 20000},
{"measure": "solar water heater", "rate": 0.01, "rateUnit": "USD per output BTU", "maxAmountCents": 60000},
{"measure": "ceiling or attic insulation", "rate": 0.11, "rateUnit": "USD per square foot", "maxAmountCents": 60000},
{"measure": "attic spray foam", "rate": 0.28, "rateUnit": "USD per square foot", "maxAmountCents": 60000},
{"measure": "window film or solar shade screen", "rate": 0.44, "rateUnit": "USD per square foot glass", "maxAmountCents": 44000}
]
},
"measureCatalog": {"catalogId": null, "selectionInput": null, "rows": []},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Clay Electric publishes current amounts for heat pumps, HPWH, solar water heaters, HRUs, insulation, spray foam, film and shade screens.",
"sourceUrls": ["[https://www.clayelectric.com/energy-rebates-loans](https://www.clayelectric.com/energy-rebates-loans)"]
}
],
"edgeActions": [
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "Qualifying heat pumps have a fixed bill-credit rebate."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "Electric hybrid HPWH has a fixed bill-credit rebate."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Supported only for qualifying high-efficiency heat pumps."},
{"retrofitTypeId": "insulation_upgrade", "action": "keep", "reason": "Ceiling/attic insulation and spray-foam attic insulation have square-foot rates and caps."},
{"retrofitTypeId": "solar_water_heating_system", "action": "keep", "reason": "Solar water heaters have a per-output-BTU rate and cap."},
{"retrofitTypeId": "waste_heat_recovery", "action": "delete_bad_edge", "reason": "The supported measure is a water-heating heat recovery unit, not broad industrial waste heat recovery."},
{"retrofitTypeId": "window_film_shading_retrofit", "action": "keep", "reason": "Window film and solar shade screens have square-foot rates and a combined cap."},
{"retrofitTypeId": "window_replacement", "action": "delete_bad_edge", "reason": "Clay supports film and exterior shade screens on existing windows, not window replacement."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate cannot exceed purchase price where stated; energy loans are excluded from savings totals."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": ["[https://www.clayelectric.com/energy-rebates-loans](https://www.clayelectric.com/energy-rebates-loans)"],
"evidenceText": "Clay Electric’s page provides calculable fixed, square-foot and BTU-based rebates with caps and bill-credit timing.",
"reasoningNotes": "Energy loans are financing and are not included as cash savings.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4237",
"opportunityName": "Ocala Utility Services - Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "rate_table", "custom_quote"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Apply the fixed Ocala rebate, dollars-per-ton, dollars-per-kW, or custom kW-reduction incentive for the selected row. Current values include refrigerator $75, dishwasher $75, clothes washer $100, freezer $50, residential/small-commercial attic insulation $300, large-commercial attic insulation $1,000, AC/heat pump $250, HPWH $450, package terminal AC/HP $50/ton up to $5,000, commercial lighting $100/kW with caps, Wi-Fi thermostat $100, solar water heater $450, HVAC tune-up $75, HVAC repairs $300, and custom incentive $250/kW.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 500000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 100,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["residential ENERGY STAR appliances", "attic insulation", "AC and heat pump", "HPWH", "package terminal AC/HP", "commercial lighting", "Wi-Fi thermostat", "solar water heater", "HVAC tune-up", "HVAC repairs", "custom kW reduction"],
"ineligibleCostCategories": ["commercial dishwasher equipment from residential row", "commercial laundry from residential row", "commercial refrigeration from residential appliance row"],
"requiredInputs": ["selected_measure", "customer_class", "OEU_service", "receipt", "AHRI_or_ENERGY_STAR_documentation", "tons", "kW_reduction", "square_feet", "engineering_documentation"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "customer_class", "quantity_or_savings"],
"rateTable": {
"tableId": "ocala_energy_efficiency_application_current",
"dimensions": ["measure", "customer_class_or_quantity"],
"rows": [
{"measure": "refrigerator", "amountCents": 7500},
{"measure": "dishwasher", "amountCents": 7500},
{"measure": "clothes washer", "amountCents": 10000},
{"measure": "freezer", "amountCents": 5000},
{"measure": "attic insulation residential or small commercial", "amountCents": 30000},
{"measure": "attic insulation large commercial", "amountCents": 100000},
{"measure": "air conditioner or heat pump", "amountCents": 25000},
{"measure": "heat pump water heater", "amountCents": 45000},
{"measure": "package terminal AC or heat pump", "rate": 50, "rateUnit": "USD per ton", "maxAmountCents": 500000},
{"measure": "commercial lighting", "rate": 100, "rateUnit": "USD per kW reduced", "maxAmountCents": 500000},
{"measure": "Wi-Fi programmable thermostat", "amountCents": 10000},
{"measure": "custom incentive", "rate": 250, "rateUnit": "USD per kW reduced"}
]
},
"measureCatalog": {"catalogId": null, "selectionInput": null, "rows": []},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Ocala’s current application publishes appliance, HVAC, HPWH, insulation, commercial lighting, thermostat, solar water heater and custom rows.",
"sourceUrls": [
"[https://www.ocalafl.gov/government/electric-utility/rebates](https://www.ocalafl.gov/government/electric-utility/rebates)",
"[https://www.ocalafl.gov/home/showpublisheddocument/26388/638665758851870000](https://www.ocalafl.gov/home/showpublisheddocument/26388/638665758851870000)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "Air conditioner and heat-pump rebate row supports qualifying heat pumps."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "Heat pump water heater has a fixed current rebate amount."},
{"retrofitTypeId": "high_efficiency_commercial_dishwasher", "action": "delete_bad_edge", "reason": "Ocala lists ENERGY STAR residential dishwasher rebates, not commercial dishwasher equipment."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Qualifying AC and heat-pump equipment have fixed current rebates."},
{"retrofitTypeId": "high_efficiency_laundry_equipment", "action": "keep", "reason": "ENERGY STAR residential clothes washer rebate is listed."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "keep", "reason": "Supported only as residential ENERGY STAR refrigerator/freezer rebates."},
{"retrofitTypeId": "insulation_upgrade", "action": "keep", "reason": "Attic insulation has current fixed rebates by customer class."},
{"retrofitTypeId": "led_lighting_retrofit", "action": "keep", "reason": "Commercial lighting rebates and custom lighting incentives are listed for eligible commercial customers."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Approved rebates are bill credits and cannot exceed installed cost."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.ocalafl.gov/government/electric-utility/rebates](https://www.ocalafl.gov/government/electric-utility/rebates)",
"[https://www.ocalafl.gov/home/showpublisheddocument/26388/638665758851870000](https://www.ocalafl.gov/home/showpublisheddocument/26388/638665758851870000)"
],
"evidenceText": "Ocala’s current application gives calculable fixed and rate-based rebates, with customer-class limits.",
"reasoningNotes": "Residential appliance rows must not be generalized to commercial appliances.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3441",
"opportunityName": "Marietta Power & Water - Residential Energy Efficiency Rebate",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "fixed_tier_amount"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Select the MP&W residential energy or toilet rebate row and apply the fixed amount. Current energy form values include gas-to-ENERGY STAR electric or dual-fuel heat pump conversion $250, electric AC/HP replacing electric AC/HP $100, new-home ENERGY STAR electric AC/HP $150, freezer $25, room AC $30, dishwasher $50, clothes washer $50, refrigerator/freezer $50, HPWH $250, programmable thermostat $30, water heater blanket $10, and WaterSense toilet $75 with up to three toilets.",
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
"maxUnits": 3,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["residential heat pump", "residential central AC", "HPWH", "residential appliances", "programmable thermostat", "water heater blanket", "WaterSense toilet"],
"ineligibleCostCategories": ["commercial dishwasher", "commercial refrigeration", "smart zoning controls"],
"requiredInputs": ["selected_measure", "MPW_electric_or_water_service", "equipment_type", "previous_fuel_or_equipment", "appliance_type", "toilet_count", "home_year", "old_toilet_gpf", "submission_within_60_days"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "service_type", "equipment_condition"],
"rateTable": {
"tableId": "marietta_power_water_residential_current",
"dimensions": ["measure"],
"rows": [
{"measure": "gas to ENERGY STAR electric or dual-fuel heat pump conversion", "amountCents": 25000},
{"measure": "electric AC or HP replacing electric AC or HP", "amountCents": 10000},
{"measure": "new-home ENERGY STAR electric AC or HP", "amountCents": 15000},
{"measure": "freezer", "amountCents": 2500},
{"measure": "room air conditioner", "amountCents": 3000},
{"measure": "dishwasher", "amountCents": 5000},
{"measure": "clothes washer", "amountCents": 5000},
{"measure": "full-size refrigerator/freezer", "amountCents": 5000},
{"measure": "heat pump water heater", "amountCents": 25000},
{"measure": "programmable thermostat", "amountCents": 3000},
{"measure": "water heater blanket", "amountCents": 1000},
{"measure": "WaterSense ultra-high-efficiency toilet", "amountCents": 7500, "maxUnits": 3}
]
},
"measureCatalog": {"catalogId": null, "selectionInput": null, "rows": []},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Marietta’s current forms publish fixed rebates for HVAC, HPWH, appliances, programmable thermostats, water-heater blankets and toilets.",
"sourceUrls": [
"[https://www.mariettaga.gov/765/Rebates-Incentives](https://www.mariettaga.gov/765/Rebates-Incentives)",
"[https://www.mariettaga.gov/FormCenter/Power-Water-Marketing-27/Energy-Efficiency-Rebate-Program-Applica-125](https://www.mariettaga.gov/FormCenter/Power-Water-Marketing-27/Energy-Efficiency-Rebate-Program-Applica-125)",
"[https://www.mariettaga.gov/FormCenter/Power-Water-Marketing-27/Toilet-Rebate-Program-revised-effective--115](https://www.mariettaga.gov/FormCenter/Power-Water-Marketing-27/Toilet-Rebate-Program-revised-effective--115)",
"[https://www.mariettaga.gov/DocumentCenter/View/9103](https://www.mariettaga.gov/DocumentCenter/View/9103)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "Heat-pump HVAC conversions and replacements have fixed residential amounts."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "HPWH has a fixed residential rebate amount."},
{"retrofitTypeId": "high_efficiency_commercial_dishwasher", "action": "delete_bad_edge", "reason": "The dishwasher row is a residential ENERGY STAR appliance, not commercial kitchen equipment."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "ENERGY STAR electric central AC or heat-pump rows are supported."},
{"retrofitTypeId": "high_efficiency_laundry_equipment", "action": "keep", "reason": "ENERGY STAR clothes washer has a fixed residential rebate amount."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "keep", "reason": "Supported only as residential freezer or refrigerator/freezer appliance rebates."},
{"retrofitTypeId": "high_efficiency_toilet_urinal", "action": "keep", "reason": "WaterSense toilet rebate is supported for qualifying MP&W water customers."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "Programmable thermostat rebate is supported, but not smart zoning."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Energy-efficiency form states rebates cannot be combined with other MP&W rebates and are subject to funding."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "within 60 days of purchase or installation",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.mariettaga.gov/765/Rebates-Incentives](https://www.mariettaga.gov/765/Rebates-Incentives)",
"[https://www.mariettaga.gov/FormCenter/Power-Water-Marketing-27/Energy-Efficiency-Rebate-Program-Applica-125](https://www.mariettaga.gov/FormCenter/Power-Water-Marketing-27/Energy-Efficiency-Rebate-Program-Applica-125)",
"[https://www.mariettaga.gov/FormCenter/Power-Water-Marketing-27/Toilet-Rebate-Program-revised-effective--115](https://www.mariettaga.gov/FormCenter/Power-Water-Marketing-27/Toilet-Rebate-Program-revised-effective--115)",
"[https://www.mariettaga.gov/DocumentCenter/View/9103](https://www.mariettaga.gov/DocumentCenter/View/9103)"
],
"evidenceText": "Marietta has a current fixed-amount residential rebate catalog with separate electric-service and water-service requirements.",
"reasoningNotes": "Do not attach commercial dishwasher or commercial refrigeration meanings to residential appliance rows.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3283",
"opportunityName": "Black Hills Energy (Gas) - Residential Energy Efficiency Rebate Programs",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "rate_table", "fixed_tier_amount"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Apply the 2026 Iowa residential gas rebate row for the selected measure. Examples include gas storage water heater $125 or $275 by UEF, tankless gas water heater $625, drain water heat recovery $300, gas furnace $350, combi boiler $1,400, gas boiler $575, boiler reset $250, gas fireplace $100, smart thermostat up to $50, maintenance up to $50, floor insulation up to $350, duct insulation up to $50, low-flow aerators $3, showerhead $15 and restrictor valve $25.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 100,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["natural gas water heating", "gas furnace", "gas boiler", "boiler reset", "gas fireplace", "smart thermostat", "furnace maintenance", "boiler maintenance", "insulation", "pipe insulation", "low-flow fixtures"],
"ineligibleCostCategories": ["electric heat pumps", "electric HPWH", "air conditioners", "appliances", "EV charging"],
"requiredInputs": ["selected_measure", "Iowa_residential_gas_account", "main_heat_source_fuel", "equipment_type", "AFUE", "UEF", "ENERGY_STAR", "unit_count", "pipe_length_feet", "project_cost", "invoice_date"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "equipment_efficiency", "quantity_or_length", "main_heat_source_fuel"],
"rateTable": {
"tableId": "black_hills_iowa_gas_residential_2026",
"dimensions": ["measure", "efficiency_or_quantity"],
"rows": [
{"measure": "storage gas water heater UEF 0.67+", "amountCents": 12500},
{"measure": "ENERGY STAR storage gas water heater UEF 0.80+", "amountCents": 27500},
{"measure": "tankless gas water heater UEF 0.87+", "amountCents": 62500},
{"measure": "drain water heat recovery", "amountCents": 30000},
{"measure": "gas furnace AFUE 96+", "amountCents": 35000},
{"measure": "combi boiler AFUE 90+", "amountCents": 140000},
{"measure": "gas boiler AFUE 90+", "amountCents": 57500},
{"measure": "boiler reset control", "amountCents": 25000},
{"measure": "ENERGY STAR smart thermostat", "maxAmountCents": 5000},
{"measure": "floor insulation R-19", "maxAmountCents": 35000},
{"measure": "duct insulation R-8", "maxAmountCents": 5000},
{"measure": "boiler or domestic hot water pipe insulation", "rate": 10, "rateUnit": "USD per 6 feet"},
{"measure": "bathroom or kitchen aerator", "amountCents": 300},
{"measure": "low-flow showerhead", "amountCents": 1500},
{"measure": "thermostatic restrictor shower valve", "amountCents": 2500}
]
},
"measureCatalog": {"catalogId": null, "selectionInput": null, "rows": []},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Black Hills Energy’s 2026 Iowa gas application publishes water-heating, furnace, boiler, thermostat, maintenance, insulation and low-flow rows.",
"sourceUrls": [
"[https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/iowa-residential-programs](https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/iowa-residential-programs)",
"[https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/IAG-EE-2026-Residential-Rebate-App.pdf](https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/IAG-EE-2026-Residential-Rebate-App.pdf)",
"[https://iagresiprescriptive.customerapplication.com/](https://iagresiprescriptive.customerapplication.com/)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "boiler_controls_burner_retrofit", "action": "keep", "reason": "Boiler reset control has a fixed current amount."},
{"retrofitTypeId": "duct_sealing_and_insulation", "action": "keep", "reason": "Supported only as duct insulation, not duct sealing."},
{"retrofitTypeId": "high_efficiency_boiler_retrofit", "action": "keep", "reason": "High-efficiency gas boiler and combi boiler rows are published."},
{"retrofitTypeId": "high_efficiency_furnace_retrofit", "action": "keep", "reason": "High-efficiency gas furnace row is published."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Supported only as listed natural-gas furnace, boiler, combi boiler or gas fireplace measures."},
{"retrofitTypeId": "insulation_upgrade", "action": "keep", "reason": "Floor, basement wall, pipe and related insulation rows are published."},
{"retrofitTypeId": "low_flow_fixture_retrofit", "action": "keep", "reason": "Supported only for specified aerators, showerheads and restrictor valves."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "ENERGY STAR smart thermostat is supported up to a cap."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebates are first-come, first-served, subject to budget and cannot exceed customer cost."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "2027-01-15",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/iowa-residential-programs](https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/iowa-residential-programs)",
"[https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/IAG-EE-2026-Residential-Rebate-App.pdf](https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/IAG-EE-2026-Residential-Rebate-App.pdf)",
"[https://iagresiprescriptive.customerapplication.com/](https://iagresiprescriptive.customerapplication.com/)"
],
"evidenceText": "Black Hills Energy provides a detailed 2026 Iowa residential gas rebate application with calculable fixed and rate-based values.",
"reasoningNotes": "This is a gas program; do not match electric heat pumps, air conditioners, appliances or EV measures.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5142",
"opportunityName": "Missouri River Energy Services (25 Member Cooperatives) - Business Energy Efficiency Rebate",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["custom_quote", "competitive_cost_share"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "custom_quote",
"timing": "application_process",
"formulaText": "Use the participating Bright Energy Solutions/MRES member utility's current business form for the selected prescriptive measure. Custom efficiency and electrification projects require preapproval and an approved savings evaluation, with project-cost caps where applicable. Exact selected measure amount must come from the current member utility form.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 75,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["commercial refrigeration", "food service", "commercial dishwashers", "HVAC", "heat pumps", "HPWH", "geothermal", "lighting", "VFDs", "pumps", "compressed air", "custom efficiency", "custom electrification"],
"ineligibleCostCategories": ["residential clothes washers", "residential smart thermostats", "expired 2025 LED bonus"],
"requiredInputs": ["participating_member_utility", "selected_business_measure", "equipment_type", "quantity", "approved_peak_kW_savings", "first_year_kWh_savings", "eligible_project_cost", "preapproval_status"],
"missingInputsForTypicalRetroFiEstimate": ["participating_member_utility", "selected_measure", "current_prescriptive_amount_or_approved_custom_savings"],
"rateTable": {"tableId": null, "dimensions": [], "rows": []},
"measureCatalog": {
"catalogId": "mres_bes_business_categories_2026",
"selectionInput": "selected_business_measure",
"rows": [
{"measure": "commercial refrigeration and food service", "amountCents": null, "notes": "current member utility form required"},
{"measure": "HVAC, heat pumps, HPWH and geothermal", "amountCents": null, "notes": "current member utility form required"},
{"measure": "lighting, lighting controls and networked controls", "amountCents": null, "notes": "current member utility form required"},
{"measure": "pumps, VFDs, compressed air and process measures", "amountCents": null, "notes": "current member utility form required"},
{"measure": "custom efficiency or electrification", "amountCents": null, "notes": "requires preapproval and evaluation"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "MRES/BES official materials describe business cash incentives by category and custom projects requiring local utility evaluation and preapproval.",
"sourceUrls": [
"[https://www.mrenergy.com/services/energy-efficiency](https://www.mrenergy.com/services/energy-efficiency)",
"[https://www.brightenergysolutions.com/](https://www.brightenergysolutions.com/)",
"[https://www.brightenergysolutions.com/resources/business](https://www.brightenergysolutions.com/resources/business)",
"[https://www.brightenergysolutions.com/members/st-james-public-utilities](https://www.brightenergysolutions.com/members/st-james-public-utilities)",
"[https://www.brightenergysolutions.com/members/hutchinson-utilities-commission](https://www.brightenergysolutions.com/members/hutchinson-utilities-commission)",
"[https://d23r6s4dwed217.cloudfront.net/general-uploads/BES_2026_Business_TriFold_Brochure.pdf](https://d23r6s4dwed217.cloudfront.net/general-uploads/BES_2026_Business_TriFold_Brochure.pdf)",
"[https://d23r6s4dwed217.cloudfront.net/general-uploads/Customize-Your-Own-Efficiency-Incentive_FLYER.pdf](https://d23r6s4dwed217.cloudfront.net/general-uploads/Customize-Your-Own-Efficiency-Incentive_FLYER.pdf)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "keep", "reason": "Business HVAC categories support geothermal heat pumps subject to the member utility form."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "Business HVAC categories support heat pumps subject to the member utility form."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "Business heating/cooling or water-heating categories may support HPWH measures by form."},
{"retrofitTypeId": "high_efficiency_commercial_dishwasher", "action": "keep", "reason": "Commercial food-service equipment is a listed business category."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Business HVAC equipment is a supported category."},
{"retrofitTypeId": "high_efficiency_laundry_equipment", "action": "delete_bad_edge", "reason": "Residential clothes washers/laundry equipment are not supported under this business record."},
{"retrofitTypeId": "led_lighting_retrofit", "action": "keep", "reason": "Business lighting is a listed category."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "needs_review", "reason": "Only commercial controls or guestroom energy management may be supported; residential smart thermostats should not match."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Custom incentives are capped by the current custom flyer and local member utility rules."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.mrenergy.com/services/energy-efficiency](https://www.mrenergy.com/services/energy-efficiency)",
"[https://www.brightenergysolutions.com/](https://www.brightenergysolutions.com/)",
"[https://www.brightenergysolutions.com/resources/business](https://www.brightenergysolutions.com/resources/business)",
"[https://www.brightenergysolutions.com/members/st-james-public-utilities](https://www.brightenergysolutions.com/members/st-james-public-utilities)",
"[https://www.brightenergysolutions.com/members/hutchinson-utilities-commission](https://www.brightenergysolutions.com/members/hutchinson-utilities-commission)",
"[https://d23r6s4dwed217.cloudfront.net/general-uploads/BES_2026_Business_TriFold_Brochure.pdf](https://d23r6s4dwed217.cloudfront.net/general-uploads/BES_2026_Business_TriFold_Brochure.pdf)",
"[https://d23r6s4dwed217.cloudfront.net/general-uploads/Customize-Your-Own-Efficiency-Incentive_FLYER.pdf](https://d23r6s4dwed217.cloudfront.net/general-uploads/Customize-Your-Own-Efficiency-Incentive_FLYER.pdf)"
],
"evidenceText": "Bright Energy Solutions/MRES business rebates require member-utility and measure-form selection; no single statewide fixed value is safe.",
"reasoningNotes": "The 2025 LED bonus is expired by the researched date and should not be used as a current value.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2296",
"opportunityName": "Duke Energy - Residential and Builder Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "medium",
"estimateConfidence": "medium",
"cashValueClassifications": ["rebate", "technical_assistance"],
"primaryValueModelKinds": ["measure_catalog", "capped_percent_of_eligible_cost"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use the Duke Energy Indiana Home Energy Improvement or Smart Saver pathway for the selected measure. Official snippets provide caps for attic insulation up to $800, duct test and repair up to $450, initial duct test support up to $50, additional-unit duct test support up to $40, and 50-gallon HPWH at $500. HVAC heat-pump replacement, windows and thermostat categories are supported but need dynamic page or service-address validation for exact current values.",
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
"eligibleCostCategories": ["attic insulation", "duct test and repair", "HVAC heat-pump replacement", "HPWH", "energy-efficient windows", "smart thermostat", "home energy check"],
"ineligibleCostCategories": ["geothermal heat pumps not verified", "DSIRE-only amounts", "contractor-only nonofficial values"],
"requiredInputs": ["selected_measure", "Duke_Indiana_account", "program_pathway", "service_address_validation", "project_cost", "equipment_type", "efficiency_tier", "participating_contractor", "program_prerequisites"],
"missingInputsForTypicalRetroFiEstimate": ["selected_measure", "service_address_validation", "complete_current_amount_table"],
"rateTable": {
"tableId": "duke_indiana_residential_current_limited",
"dimensions": ["measure"],
"rows": [
{"measure": "attic insulation", "maxAmountCents": 80000},
{"measure": "duct test and repair pathway", "maxAmountCents": 45000},
{"measure": "initial duct test contribution", "maxAmountCents": 5000},
{"measure": "additional-unit duct test contribution", "maxAmountCents": 4000},
{"measure": "50-gallon heat pump water heater", "amountCents": 50000},
{"measure": "HVAC heat-pump replacement", "amountCents": null, "notes": "category supported but exact amount not fully exposed"},
{"measure": "energy-efficient windows", "amountCents": null, "notes": "category supported but exact amount not fully exposed"},
{"measure": "smart thermostat", "amountCents": null, "notes": "category supported but exact amount not fully exposed"}
]
},
"measureCatalog": {"catalogId": null, "selectionInput": null, "rows": []},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Duke official pages identify residential attic insulation, duct test/repair, HVAC heat-pump replacement, HPWH, windows and prerequisites, but pages were dynamic.",
"sourceUrls": [
"[https://www.duke-energy.com/home/products/smart-saver](https://www.duke-energy.com/home/products/smart-saver)",
"[https://www.duke-energy.com/home/products/home-energy-improvement](https://www.duke-energy.com/home/products/home-energy-improvement)",
"[https://www.duke-energy.com/home/products/home-energy-improvement/prerequisites](https://www.duke-energy.com/home/products/home-energy-improvement/prerequisites)",
"[https://www.duke-energy.com/home/products/home-energy-improvement/duct-test-and-repair](https://www.duke-energy.com/home/products/home-energy-improvement/duct-test-and-repair)",
"[https://www.duke-energy.com/home/products/home-energy-improvement/hvac-replacement](https://www.duke-energy.com/home/products/home-energy-improvement/hvac-replacement)",
"[https://www.duke-energy.com/home/products/home-energy-improvement/heat-pump-water-heater](https://www.duke-energy.com/home/products/home-energy-improvement/heat-pump-water-heater)",
"[https://www.duke-energy.com/home/products/home-energy-improvement/energy-efficient-windows](https://www.duke-energy.com/home/products/home-energy-improvement/energy-efficient-windows)",
"[https://www.duke-energy.com/home/products/home-energy-check](https://www.duke-energy.com/home/products/home-energy-check)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "air_sealing_weatherization", "action": "needs_review", "reason": "Home Energy Improvement prerequisites may include weatherization, but no standalone current air-sealing amount was verified."},
{"retrofitTypeId": "duct_sealing_and_insulation", "action": "keep", "reason": "Official snippets support duct test and repair incentives."},
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "delete_bad_edge", "reason": "Geothermal heat pumps were not verified on current official Duke Indiana pages checked."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "Official pages support HVAC heat-pump replacement as a current category, but amount needs page/form validation."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "Official HPWH page snippet provides a fixed amount for a qualifying 50-gallon HPWH."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Supported where the measure is a qualifying HVAC heat-pump replacement pathway."},
{"retrofitTypeId": "insulation_upgrade", "action": "keep", "reason": "Official snippets support attic insulation up to a published cap."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "Smart thermostat category is supported, but exact current amount requires dynamic source validation."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Service-address validation and program prerequisites may control eligibility and value."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.duke-energy.com/home/products/smart-saver](https://www.duke-energy.com/home/products/smart-saver)",
"[https://www.duke-energy.com/home/products/home-energy-improvement](https://www.duke-energy.com/home/products/home-energy-improvement)",
"[https://www.duke-energy.com/home/products/home-energy-improvement/prerequisites](https://www.duke-energy.com/home/products/home-energy-improvement/prerequisites)",
"[https://www.duke-energy.com/home/products/home-energy-improvement/duct-test-and-repair](https://www.duke-energy.com/home/products/home-energy-improvement/duct-test-and-repair)",
"[https://www.duke-energy.com/home/products/home-energy-improvement/hvac-replacement](https://www.duke-energy.com/home/products/home-energy-improvement/hvac-replacement)",
"[https://www.duke-energy.com/home/products/home-energy-improvement/heat-pump-water-heater](https://www.duke-energy.com/home/products/home-energy-improvement/heat-pump-water-heater)",
"[https://www.duke-energy.com/home/products/home-energy-improvement/energy-efficient-windows](https://www.duke-energy.com/home/products/home-energy-improvement/energy-efficient-windows)",
"[https://www.duke-energy.com/home/products/home-energy-check](https://www.duke-energy.com/home/products/home-energy-check)"
],
"evidenceText": "Duke Indiana pages are current but dynamic; enough official snippets exist for a limited calculation package, with human review required.",
"reasoningNotes": "Do not use DSIRE-only or contractor values for missing current Duke amounts.",
"humanReviewRequired": true,
"humanReviewReasons": ["Official pages were dynamic/access-limited and did not expose a complete current table."]
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:5381"
}
