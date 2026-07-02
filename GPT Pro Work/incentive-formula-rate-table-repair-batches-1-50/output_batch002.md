{
"schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
"researchedAt": "2026-07-02",
"source": "gpt_pro",
"batchNumber": 2,
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3689",
"opportunityName": "PEPCO - Commercial and Industrial Energy Efficiency Incentives Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"custom_quote",
"capped_percent_of_eligible_cost"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use Pepco Maryland business prescriptive incentive-reference amount for the selected qualifying measure, subject to application requirements and program caps; custom projects require Pepco savings review and may cover up to 50% of eligible project cost.",
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
"eligibleCostCategories": [
"qualifying equipment",
"eligible installation costs where allowed",
"custom electric efficiency project costs"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"measure_type",
"equipment_quantity",
"tons_or_horsepower_or_square_feet_or_linear_feet_as_applicable",
"annual_kwh_savings_for_custom_or_glazing_measures",
"eligible_project_cost",
"preapproval_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"quantity",
"equipment_size_or_area",
"eligible_project_cost",
"annual_kwh_savings_for_custom_measures"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "pepco_md_business_2026_reference",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Heat pump water heater",
"amountCents": 160000,
"unit": "unit"
},
{
"measure": "Commercial clothes washer",
"minAmountCents": 10000,
"maxAmountCents": 20000,
"unit": "unit"
},
{
"measure": "Window film",
"rate": 100,
"rateUnit": "cents_per_square_foot"
},
{
"measure": "Window glazing",
"rate": 250,
"rateUnit": "cents_per_annual_kwh_reduced"
},
{
"measure": "Demand-controlled kitchen ventilation",
"rate": 60000,
"rateUnit": "cents_per_exhaust_fan_hp"
},
{
"measure": "Air-source heat pump",
"rate": 50000,
"rateUnit": "cents_per_ton"
},
{
"measure": "Air conditioner",
"rate": 30000,
"rateUnit": "cents_per_ton"
},
{
"measure": "Ductless mini-split AC",
"rate": 22500,
"rateUnit": "cents_per_ton"
},
{
"measure": "Water-source heat pump",
"rate": 30000,
"rateUnit": "cents_per_ton"
},
{
"measure": "Geothermal heat pump",
"minAmountCents": 50000,
"maxAmountCents": 70000,
"unit": "unit"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Pepco's current Maryland business materials publish prescriptive measure incentives for HVAC, HPWH, laundry, windows, lighting, refrigeration, compressed air, VFDs, and foodservice; custom projects require review and are subject to cost caps.",
"sourceUrls": [
"[https://homeenergysavings.pepco.com/md/business/overview](https://homeenergysavings.pepco.com/md/business/overview)",
"[https://homeenergysavings.pepco.com/md/business/applyMLB](https://homeenergysavings.pepco.com/md/business/applyMLB)",
"[https://homeenergysavings.pepco.com/sites/default/files/public/Pepco_CI_IncentiveReference_Sheet.pdf](https://homeenergysavings.pepco.com/sites/default/files/public/Pepco_CI_IncentiveReference_Sheet.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "efficient_air_compressor",
"action": "keep",
"reason": "Compressed-air measures are listed in Pepco's business incentive reference."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Geothermal heat pump incentives are listed for business customers."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Heat pump and ductless mini-split measures are supported."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Heat pump water heater is a listed prescriptive measure."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Air conditioners, chillers and other high-efficiency HVAC measures are listed."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "Commercial clothes washer incentives are listed as product-specific measures."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Commercial refrigeration measures are listed."
},
{
"retrofitTypeId": "hvac_controls_retrofit",
"action": "keep",
"reason": "HVAC controls and thermostats are supported in the business program."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "LED lighting and controls are supported."
},
{
"retrofitTypeId": "refrigeration_controls_retrofit",
"action": "keep",
"reason": "Refrigeration controls are listed in the business reference."
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"action": "keep",
"reason": "VFD incentives are listed."
},
{
"retrofitTypeId": "window_film_shading_retrofit",
"action": "keep",
"reason": "Window film is a listed prescriptive measure."
},
{
"retrofitTypeId": "window_replacement",
"action": "keep",
"reason": "Glazing/window measures are supported, but must be limited to listed qualifying glazing measures."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Program incentives are subject to Pepco review, caps, and funding availability."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://homeenergysavings.pepco.com/md/business/overview](https://homeenergysavings.pepco.com/md/business/overview)",
"[https://homeenergysavings.pepco.com/md/business/applyMLB](https://homeenergysavings.pepco.com/md/business/applyMLB)",
"[https://homeenergysavings.pepco.com/sites/default/files/public/Pepco_CI_IncentiveReference_Sheet.pdf](https://homeenergysavings.pepco.com/sites/default/files/public/Pepco_CI_IncentiveReference_Sheet.pdf)"
],
"evidenceText": "Current Pepco business sources provide measure-specific rates and a custom path, rather than one universal 50% rebate for every edge.",
"reasoningNotes": "Legacy 50% rule is only safe as a custom cap, not an expected prescriptive value. File source: ",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1882",
"opportunityName": "Modesto Irrigation District - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "medium",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"tariff_or_rate"
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
"formulaText": "Apply the MID residential rebate amount for the selected qualifying home measure. Known current examples include $500 per ENERGY STAR heat pump water heater, $100 per qualifying 30-inch induction cooktop/range, and $0.17 per square foot for attic insulation.",
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
"qualifying residential equipment",
"eligible insulation area"
],
"ineligibleCostCategories": [
"commercial kitchen equipment",
"commercial refrigeration",
"EV chargers under this home rebate record"
],
"requiredInputs": [
"measure_type",
"equipment_quantity",
"insulation_square_feet_if_applicable",
"equipment_efficiency",
"MID_account_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"quantity",
"square_feet_for_insulation"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "mid_residential_rebates_current_examples",
"selectionInput": "measure_type",
"rows": [
{
"measure": "ENERGY STAR heat pump water heater",
"amountCents": 50000,
"unit": "unit"
},
{
"measure": "Induction cooktop or range, 30 inches or larger",
"amountCents": 10000,
"unit": "unit"
},
{
"measure": "Attic insulation",
"rate": 17,
"rateUnit": "cents_per_square_foot"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Official MID pages identify residential rebates for heat pump water heaters, induction cooking, insulation, HVAC, windows, appliances, and smart thermostats; exact amount tables require current form details.",
"sourceUrls": [
"[https://www.mid.org/saving-energy-money/rebates/residential-rebates/](https://www.mid.org/saving-energy-money/rebates/residential-rebates/)",
"[https://www.mid.org/mid-home-rebate-application/](https://www.mid.org/mid-home-rebate-application/)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "fixed_amount",
"timing": "annual",
"formulaText": "Power Smart thermostat participation provides a one-time $50 bill credit and $20 annual bill credits while the customer remains enrolled with a qualifying thermostat.",
"amountCents": 2000,
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
"annualCapCents": 2000,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": [
"qualifying_smart_thermostat",
"Power_Smart_enrollment_status"
],
"missingInputsForTypicalRetroFiEstimate": [
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
"evidenceText": "MID Power Smart thermostat program offers a first-year bill credit and ongoing annual participation credits.",
"sourceUrls": [
"[https://www.mid.org/saving-energy-money/rebates/power-smart/](https://www.mid.org/saving-energy-money/rebates/power-smart/)",
"[https://www.mid.org/saving-energy-money/rebates/power-smart/approved-thermostat-models/](https://www.mid.org/saving-energy-money/rebates/power-smart/approved-thermostat-models/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_filtration_system",
"action": "delete_bad_edge",
"reason": "Current official MID residential rebate support for air filtration was not verified."
},
{
"retrofitTypeId": "energy_management_system",
"action": "delete_bad_edge",
"reason": "Only smart thermostat demand-response participation is supported, not general energy management systems."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Residential heat pumps are identified in MID residential rebate materials."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "ENERGY STAR heat pump water heater rebate is identified."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Residential HVAC rebates are identified."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "Residential clothes washer/appliance rebates are identified."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Residential refrigerator/appliance support is identified, not commercial refrigeration."
},
{
"retrofitTypeId": "induction_cooking_equipment",
"action": "keep",
"reason": "Residential induction cooking support is identified."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Attic insulation rebate is identified."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "delete_bad_edge",
"reason": "EV charger support appears separate and is not part of this residential home rebate record."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "MID Power Smart smart thermostat bill-credit program is supported."
},
{
"retrofitTypeId": "window_replacement",
"action": "keep",
"reason": "Residential window or sunscreen measures are identified in MID residential rebate materials."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "MID pages should be checked at application because exact amounts and active forms can change."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.mid.org/saving-energy-money/rebates/residential-rebates/](https://www.mid.org/saving-energy-money/rebates/residential-rebates/)",
"[https://www.mid.org/mid-home-rebate-application/](https://www.mid.org/mid-home-rebate-application/)",
"[https://www.mid.org/saving-energy-money/rebates/power-smart/](https://www.mid.org/saving-energy-money/rebates/power-smart/)",
"[https://www.mid.org/saving-energy-money/rebates/power-smart/approved-thermostat-models/](https://www.mid.org/saving-energy-money/rebates/power-smart/approved-thermostat-models/)"
],
"evidenceText": "The legacy $350 Level 2 EV charger rule belongs to a separate EV program and should not be used for this home efficiency rebate record.",
"reasoningNotes": "Use MID residential measure-specific tables where readable; avoid commercial or EV cross-program matches.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1924",
"opportunityName": "Silicon Valley Power - Commercial Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use SVP's current business rebate amount for the qualifying measure after required engineer contact, pre-inspection, written preapproval, installation, post-inspection, and invoice upload. Demand-controlled kitchen ventilation remains calculable at $1,400 per exhaust fan horsepower where qualifying.",
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
"qualifying business equipment",
"eligible installation costs",
"approved custom electric savings measures"
],
"ineligibleCostCategories": [
"unsupported anti-sweat heater controls",
"unsupported induction cooking",
"unsupported oven line items"
],
"requiredInputs": [
"measure_type",
"quantity",
"exhaust_fan_horsepower_for_DCKV",
"eligible_project_cost",
"preapproval_status",
"annual_kwh_savings_for_custom_projects"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"quantity",
"exhaust_fan_horsepower",
"eligible_project_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "svp_business_current_known_measures",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Demand-controlled kitchen ventilation",
"rate": 140000,
"rateUnit": "cents_per_exhaust_fan_hp"
},
{
"measure": "Lighting",
"valueModelKind": "measure_catalog_or_custom_review"
},
{
"measure": "HVAC or heat pump",
"valueModelKind": "measure_catalog_or_custom_review"
},
{
"measure": "Heat pump water heater",
"valueModelKind": "measure_catalog_or_custom_review"
},
{
"measure": "Building optimization or controls",
"valueModelKind": "custom_quote"
},
{
"measure": "Commercial refrigerator/freezer",
"valueModelKind": "measure_catalog_or_custom_review"
},
{
"measure": "Qualifying fryer",
"valueModelKind": "measure_catalog_or_custom_review"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "SVP's current business page lists lighting, HVAC, heat pumps, HPWH, building optimization, controls, customer-directed projects, and foodservice, with written preapproval before installation.",
"sourceUrls": [
"[https://www.siliconvalleypower.com/businesses/rebates](https://www.siliconvalleypower.com/businesses/rebates)",
"[https://www.siliconvalleypower.com/businesses/electrification-programs-rebates](https://www.siliconvalleypower.com/businesses/electrification-programs-rebates)",
"[https://siliconvalleypower2.my.site.com](https://siliconvalleypower2.my.site.com)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "anti_sweat_heater_controls",
"action": "delete_bad_edge",
"reason": "Current official SVP page reviewed did not support anti-sweat heater controls as a current measure."
},
{
"retrofitTypeId": "building_automation_system",
"action": "keep",
"reason": "Building optimization and controls are supported with review."
},
{
"retrofitTypeId": "demand_controlled_kitchen_ventilation",
"action": "keep",
"reason": "Demand-controlled kitchen ventilation is explicitly listed."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Heat pump measures are supported."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Heat pump water heater measures are supported."
},
{
"retrofitTypeId": "high_efficiency_fryer",
"action": "keep",
"reason": "Qualifying fryer foodservice rebates are supported."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Business HVAC measures are supported."
},
{
"retrofitTypeId": "high_efficiency_oven",
"action": "delete_bad_edge",
"reason": "Current official SVP page reviewed did not verify ovens as a current foodservice rebate category."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Commercial refrigerator/freezer equipment is supported."
},
{
"retrofitTypeId": "induction_cooking_equipment",
"action": "delete_bad_edge",
"reason": "Induction cooking was not verified as a current SVP business foodservice measure."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Lighting rebates are supported."
},
{
"retrofitTypeId": "walk_in_cooler_freezer_upgrade",
"action": "delete_bad_edge",
"reason": "Walk-in cooler/freezer upgrades were not verified as a separate current measure."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "SVP requires project review; customer-directed custom projects cannot be estimated without savings and cost inputs."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.siliconvalleypower.com/businesses/rebates](https://www.siliconvalleypower.com/businesses/rebates)",
"[https://www.siliconvalleypower.com/businesses/electrification-programs-rebates](https://www.siliconvalleypower.com/businesses/electrification-programs-rebates)",
"[https://siliconvalleypower2.my.site.com](https://siliconvalleypower2.my.site.com)"
],
"evidenceText": "Preserve supported SVP business categories, but remove stale anti-sweat, oven, induction, and walk-in cooler edges absent from the current official page reviewed.",
"reasoningNotes": "Legacy anti-sweat rule should be deleted; DCKV remains a valid rate-based measure.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1463",
"opportunityName": "SoCalGas - Non-Residential Energy Efficiency Rebate Programs",
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
"formulaText": "Apply SoCalGas 2026 business rebate guide amount for the selected qualifying natural-gas measure. Foodservice and steam-trap examples are per unit, per vat, per oven cavity, per compartment, or per trap as specified.",
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
"new qualifying natural gas equipment",
"eligible replacement natural gas foodservice equipment",
"steam trap replacement",
"eligible gas-system insulation or controls"
],
"ineligibleCostCategories": [
"fuel switching",
"electric-only equipment",
"generic HVAC not tied to qualifying gas equipment"
],
"requiredInputs": [
"measure_type",
"equipment_quantity",
"fryer_vat_count",
"oven_cavity_count",
"steamer_compartment_count",
"steam_trap_count",
"equipment_efficiency",
"gas_service_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"quantity",
"equipment_configuration"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "socalgas_2026_business_rebate_guide_examples",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Commercial fryer",
"minAmountCents": 75000,
"maxAmountCents": 120000,
"unit": "vat"
},
{
"measure": "ENERGY STAR commercial dishwasher",
"minAmountCents": 25000,
"maxAmountCents": 75000,
"unit": "unit"
},
{
"measure": "Commercial steam trap",
"amountCents": 10000,
"unit": "trap"
},
{
"measure": "Combination oven",
"minAmountCents": 70000,
"maxAmountCents": 120000,
"unit": "oven"
},
{
"measure": "Convection oven",
"minAmountCents": 60000,
"maxAmountCents": 75000,
"unit": "oven_cavity"
},
{
"measure": "Pressureless steamer",
"amountCents": 200000,
"unit": "compartment"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "SoCalGas business materials publish 2026 rebate amounts for qualifying natural gas boilers, controls, steam traps, insulation, solar thermal water heating, and foodservice equipment.",
"sourceUrls": [
"[https://www.socalgas.com/business/savings/equipment-rebates](https://www.socalgas.com/business/savings/equipment-rebates)",
"[https://eecp.socalgas.com](https://eecp.socalgas.com)",
"[https://www.socalgas.com/sites/default/files/2026_Business_Rebate_Guide.pdf](https://www.socalgas.com/sites/default/files/2026_Business_Rebate_Guide.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "boiler_controls_burner_retrofit",
"action": "keep",
"reason": "Gas boiler controls and modulating controller measures are supported."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "High-efficiency gas boilers are supported."
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"action": "keep",
"reason": "Commercial dishwasher rebates are listed."
},
{
"retrofitTypeId": "high_efficiency_fryer",
"action": "keep",
"reason": "Commercial fryer rebates are listed."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Broad HVAC replacement is unsupported; only qualifying gas space-heating or boiler equipment should match."
},
{
"retrofitTypeId": "high_efficiency_oven",
"action": "keep",
"reason": "Commercial oven rebates are listed."
},
{
"retrofitTypeId": "high_efficiency_steamer",
"action": "keep",
"reason": "Commercial steamer rebates are listed."
},
{
"retrofitTypeId": "hvac_controls_retrofit",
"action": "keep",
"reason": "Supported only for specified gas controls or economizers."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Pipe, fitting, and tank insulation measures are supported."
},
{
"retrofitTypeId": "solar_water_heating_system",
"action": "keep",
"reason": "Commercial solar thermal water heating is supported."
},
{
"retrofitTypeId": "steam_trap_replacement",
"action": "keep",
"reason": "Steam trap replacement is a listed measure."
},
{
"retrofitTypeId": "waste_heat_recovery",
"action": "keep",
"reason": "Steam boiler stack economizers and approved heat-recovery measures are supported."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebates are limited to qualifying gas measures; fuel switching does not qualify."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.socalgas.com/business/savings/equipment-rebates](https://www.socalgas.com/business/savings/equipment-rebates)",
"[https://eecp.socalgas.com](https://eecp.socalgas.com)",
"[https://www.socalgas.com/sites/default/files/2026_Business_Rebate_Guide.pdf](https://www.socalgas.com/sites/default/files/2026_Business_Rebate_Guide.pdf)"
],
"evidenceText": "The old foodservice and steam-trap amounts are mostly valid, but the broad HVAC edge must be constrained to qualifying natural-gas measures.",
"reasoningNotes": "Use measure-specific gas rebate rows; do not estimate electric or fuel-switching projects.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4281",
"opportunityName": "Black Hills Energy (Electric) - Residential Energy Efficiency Program",
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
"formulaText": "Apply Black Hills Energy 2026 Colorado electric residential prescriptive amount for the qualifying measure. Examples include HPWH $500, ENERGY STAR smart thermostat $65, ECM furnace blower motor $50, air-source heat pump $1,500, cold-climate air-source heat pump $2,500, geothermal heat pump $1,700, attic insulation $0.50/sq ft up to $500, and wall insulation $1/sq ft up to $750.",
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
"qualifying residential electric equipment",
"eligible envelope retrofit area"
],
"ineligibleCostCategories": [
"new construction envelope measures",
"garage or shop envelope measures",
"full gas furnace replacement under this electric record"
],
"requiredInputs": [
"measure_type",
"equipment_quantity",
"tons_if_HVAC",
"insulation_square_feet",
"existing_central_cooling_status_for_envelope",
"equipment_efficiency",
"installation_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"quantity",
"HVAC_tons",
"insulation_square_feet"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "black_hills_co_electric_residential_2026",
"selectionInput": "measure_type",
"rows": [
{
"measure": "ENERGY STAR heat pump water heater",
"amountCents": 50000,
"unit": "unit"
},
{
"measure": "ENERGY STAR smart thermostat",
"amountCents": 6500,
"unit": "unit"
},
{
"measure": "ECM furnace blower motor",
"amountCents": 5000,
"unit": "unit"
},
{
"measure": "Air-source heat pump",
"amountCents": 150000,
"unit": "system"
},
{
"measure": "Ductless mini-split heat pump",
"amountCents": 150000,
"unit": "system"
},
{
"measure": "Cold-climate air-source heat pump",
"amountCents": 250000,
"unit": "system"
},
{
"measure": "Geothermal heat pump",
"amountCents": 170000,
"unit": "system"
},
{
"measure": "Attic insulation",
"rate": 50,
"rateUnit": "cents_per_square_foot",
"maxAmountCents": 50000
},
{
"measure": "Wall insulation",
"rate": 100,
"rateUnit": "cents_per_square_foot",
"maxAmountCents": 75000
},
{
"measure": "ENERGY STAR clothes washer",
"amountCents": 2500,
"unit": "unit"
},
{
"measure": "ENERGY STAR refrigerator",
"amountCents": 5000,
"unit": "unit"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Black Hills Energy's 2026 Colorado electric residential application publishes fixed and area-based rebates for heat pumps, HPWH, thermostats, ECM motors, envelope work, and appliances.",
"sourceUrls": [
"[https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/colorado-electric-residential-rebates](https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/colorado-electric-residential-rebates)",
"[https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/2026-COE-EE-Residential-Precriptive-Rebate-App.pdf](https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/2026-COE-EE-Residential-Precriptive-Rebate-App.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "Air sealing is supported as a residential electric envelope measure."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "keep",
"reason": "Duct sealing is supported under residential electric envelope/HVAC measures."
},
{
"retrofitTypeId": "efficient_fan_blower_replacement",
"action": "keep",
"reason": "ECM furnace blower motor rebate is listed."
},
{
"retrofitTypeId": "energy_management_system",
"action": "keep",
"reason": "Limited to listed smart thermostats, smart strips, or home energy management measures."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Geothermal heat pump rebate is listed."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Air-source, ductless, and cold-climate heat pumps are listed."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "ENERGY STAR heat pump water heater is listed."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "delete_bad_edge",
"reason": "Full furnace replacement is not supported by this electric residential record; only ECM blower motor is supported."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Air conditioners, evaporative coolers, and heat-pump HVAC measures are supported."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "Residential clothes washer rebate is listed."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Insulation rebates are listed with caps."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "ENERGY STAR smart thermostat rebate is listed."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebates are first-come, first-served and end when budget is depleted."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "2027-01-31",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/colorado-electric-residential-rebates](https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/colorado-electric-residential-rebates)",
"[https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/2026-COE-EE-Residential-Precriptive-Rebate-App.pdf](https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/2026-COE-EE-Residential-Precriptive-Rebate-App.pdf)"
],
"evidenceText": "The current 2026 electric residential form supports fixed and area-based rebates. Remove the full furnace edge and keep only ECM blower under furnace-related equipment.",
"reasoningNotes": "Legacy HPWH and thermostat rules are valid but should be part of a broader 2026 measure catalog.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4312",
"opportunityName": "San Miguel Power Association - Energy Efficiency Rebate Program",
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
"capped_percent_of_eligible_cost",
"fixed_tier_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Apply SMPA's stated measure amount or 50% cost cap, whichever is lower where a cap applies. EV examples: private Level 2 50% equipment plus 50% installation capped at $500 total; public Level 2 50% equipment and installation capped at $2,000; DCFC 50% equipment and installation capped by kW tier.",
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
"eligibleCostCategories": [
"equipment cost",
"installation cost for EV charging where allowed",
"eligible heat pump equipment cost"
],
"ineligibleCostCategories": [
"efficient refrigerator replacement under this record",
"unsupported fan or blower replacement"
],
"requiredInputs": [
"measure_type",
"equipment_quantity",
"eligible_equipment_cost",
"eligible_installation_cost",
"heat_pump_tons",
"charger_power_kw",
"public_or_private_EV_charger_status",
"other_incentives_received"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"eligible_cost",
"charger_type_or_heat_pump_tons",
"public_access_status"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "smpa_current_rebate_schedule",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Private Level 2 EV charger",
"percent": 0.5,
"maxAmountCents": 50000,
"unit": "charger"
},
{
"measure": "Public Level 2 EV charger",
"percent": 0.5,
"maxAmountCents": 200000,
"unit": "charger"
},
{
"measure": "DC fast charger 50-75 kW",
"percent": 0.5,
"maxAmountCents": 300000,
"unit": "charger"
},
{
"measure": "DC fast charger 76-149 kW",
"percent": 0.5,
"maxAmountCents": 500000,
"unit": "charger"
},
{
"measure": "DC fast charger 150+ kW",
"percent": 0.5,
"maxAmountCents": 750000,
"unit": "charger"
},
{
"measure": "Air-source heat pump, up to 1.5 tons",
"amountCents": 50000,
"unit": "system"
},
{
"measure": "Air-source heat pump, greater than 1.5 tons",
"amountCents": 150000,
"unit": "system"
},
{
"measure": "Air-to-water or ground-source heat pump",
"rate": 50000,
"rateUnit": "cents_per_ton",
"maxAmountCents": 2000000
},
{
"measure": "Heat pump water heater",
"amountCents": 70000,
"unit": "unit"
},
{
"measure": "Smart thermostat",
"amountCents": 2500,
"unit": "unit"
},
{
"measure": "Induction range, electric replacement",
"amountCents": 10000,
"unit": "unit"
},
{
"measure": "Induction range, gas/propane replacement or new construction",
"amountCents": 40000,
"unit": "unit"
},
{
"measure": "Residential energy audit",
"amountCents": 10000,
"unit": "audit"
},
{
"measure": "Commercial energy audit",
"amountCents": 25000,
"unit": "audit"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "SMPA publishes current fixed, per-ton, percent-of-cost, and EV kW-tier rebates, with applications due by the annual deadline and rebates subject to funding.",
"sourceUrls": [
"[https://www.smpa.com/energy](https://www.smpa.com/energy)",
"[https://www.ecoactionpartners.org/smparebates](https://www.ecoactionpartners.org/smparebates)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "dc_fast_charger_installation",
"action": "keep",
"reason": "DC fast charger tiers are explicitly listed by kW."
},
{
"retrofitTypeId": "efficient_fan_blower_replacement",
"action": "delete_bad_edge",
"reason": "Current official rebate support for efficient fan/blower replacement was not verified."
},
{
"retrofitTypeId": "energy_audit",
"action": "move_to_special_workflow",
"reason": "Energy audit is an assessment/process rebate, not a physical retrofit installation."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "SMPA supports qualifying Level 2 and DC fast chargers."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Ground-source heat pump per-ton rebate is listed."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Air-source, air-to-water, and ground-source heat pumps are supported."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Heat pump water heater rebate is listed."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Broad high-efficiency HVAC replacement is unsupported; current support is heat-pump specific."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "delete_bad_edge",
"reason": "Current refrigerator/freezer support is disposal reimbursement, not efficient replacement equipment."
},
{
"retrofitTypeId": "induction_cooking_equipment",
"action": "keep",
"reason": "Induction cooking rebates are listed."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Private and public Level 2 EV charger rebates are listed."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Smart thermostat rebate is listed."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": true,
"mustDeductOtherIncentivesFromEligibleCost": true,
"notes": "SMPA states rebates are deducted after other incentives except tax credits; many rebates cannot exceed 50% of eligible cost."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "2026-12-15",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.smpa.com/energy](https://www.smpa.com/energy)",
"[https://www.ecoactionpartners.org/smparebates](https://www.ecoactionpartners.org/smparebates)"
],
"evidenceText": "The legacy EV rules are valid but should be expressed as a tiered catalog; delete fan/blower, broad HVAC, and refrigeration-replacement false positives.",
"reasoningNotes": "Audit should be classified as process value, not a physical retrofit.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4608",
"opportunityName": "JEA - Commercial Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use JEA's business rebate table or trade-ally application for the selected qualifying commercial measure. EV charging belongs to JEA's separate business electrification rebate program, with Level 2 chargers listed at a minimum $850 per charger and DC fast chargers at a minimum $3,000 per charger.",
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
"qualifying commercial electric efficiency equipment",
"qualifying commercial water efficiency equipment",
"eligible EV charging equipment under electrification program"
],
"ineligibleCostCategories": [
"residential-only measures",
"window replacement",
"unverified heat pump water heater distinct measure"
],
"requiredInputs": [
"measure_type",
"equipment_quantity",
"eligible_project_cost",
"annual_kwh_savings_for_custom_measures",
"charger_type_if_EV",
"preapproval_status",
"trade_ally_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"quantity",
"eligible_project_cost",
"EV_charger_type",
"custom_savings"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "jea_business_current_known_measures",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Business Level 2 EV charger",
"minAmountCents": 85000,
"unit": "charger"
},
{
"measure": "Business DC fast charger",
"minAmountCents": 300000,
"unit": "charger"
},
{
"measure": "Lighting",
"valueModelKind": "measure_catalog_or_custom_review"
},
{
"measure": "HVAC",
"valueModelKind": "measure_catalog_or_custom_review"
},
{
"measure": "Refrigeration",
"valueModelKind": "measure_catalog_or_custom_review"
},
{
"measure": "Cool roof or window film",
"valueModelKind": "measure_catalog_or_custom_review"
},
{
"measure": "Custom electric measure",
"valueModelKind": "custom_quote"
},
{
"measure": "Water cooling tower or ice machine measure",
"valueModelKind": "measure_catalog_or_custom_review"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "JEA current business pages list lighting, HVAC, refrigeration, water heaters, cool roof/window film, custom electric, water measures, and separate Level 2/DCFC electrification rebates.",
"sourceUrls": [
"[https://www.jea.com/business_resources/rebates_for_businesses/](https://www.jea.com/business_resources/rebates_for_businesses/)",
"[https://www.jea.com/business_resources/rebates_for_businesses/business_rebate_program/](https://www.jea.com/business_resources/rebates_for_businesses/business_rebate_program/)",
"[https://www.jea.com/business_resources/rebates_for_businesses/electrification_rebates_program/](https://www.jea.com/business_resources/rebates_for_businesses/electrification_rebates_program/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "cool_roof_reflective_roof",
"action": "keep",
"reason": "Cool roof/window film category is listed."
},
{
"retrofitTypeId": "dc_fast_charger_installation",
"action": "move_to_special_workflow",
"reason": "DC fast charging is supported by JEA's separate business electrification rebate program."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "move_to_special_workflow",
"reason": "EV charging is separate from the core business efficiency rebate."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Commercial HVAC support includes heat pump HVAC where qualifying."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "delete_bad_edge",
"reason": "Current readable JEA business sources did not verify HPWH as a distinct business measure."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Commercial HVAC rebates are listed."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Commercial refrigeration rebates are listed."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Commercial lighting rebates are listed."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "move_to_special_workflow",
"reason": "Level 2 charging is supported through the separate electrification program."
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"action": "keep",
"reason": "Lighting controls are supported with lighting measures."
},
{
"retrofitTypeId": "window_film_shading_retrofit",
"action": "keep",
"reason": "Window film is listed."
},
{
"retrofitTypeId": "window_replacement",
"action": "delete_bad_edge",
"reason": "JEA business source supports window film, not full window replacement."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Most business rebate projects require preapproval; limited-time enhanced rebates run through the stated JEA deadline."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "2026-08-31",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.jea.com/business_resources/rebates_for_businesses/](https://www.jea.com/business_resources/rebates_for_businesses/)",
"[https://www.jea.com/business_resources/rebates_for_businesses/business_rebate_program/](https://www.jea.com/business_resources/rebates_for_businesses/business_rebate_program/)",
"[https://www.jea.com/business_resources/rebates_for_businesses/electrification_rebates_program/](https://www.jea.com/business_resources/rebates_for_businesses/electrification_rebates_program/)"
],
"evidenceText": "Keep JEA business efficiency categories and move EV charging to the separate electrification workflow; delete full window replacement and unverified HPWH edge.",
"reasoningNotes": "Legacy EV minimum amounts are real but should not be classified as the core business efficiency rebate.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4723",
"opportunityName": "JEA - Residential Energy Efficiency Rebate Program",
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
"formulaText": "Apply JEA's residential rebate amount for the selected qualifying measure. Current examples include attic insulation $0.20/sq ft up to $200, clothes washer $75, heat pump water heater $350, ENERGY STAR HVAC system $200, HVAC tune-up $50, smart irrigation controller $150, room AC $25, smart thermostat $50, and toilet replacement $25 instant discount.",
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
"qualifying residential electric equipment",
"qualifying residential water equipment",
"eligible attic insulation"
],
"ineligibleCostCategories": [
"combined heat and power",
"commercial dishwasher",
"solar water heating under current residential page"
],
"requiredInputs": [
"measure_type",
"equipment_quantity",
"attic_insulation_square_feet",
"electric_or_water_service_status",
"ENERGY_STAR_or_WaterSense_status",
"purchase_or_installation_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"quantity",
"insulation_square_feet",
"service_type"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "jea_residential_2026_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Attic insulation",
"rate": 20,
"rateUnit": "cents_per_square_foot",
"maxAmountCents": 20000
},
{
"measure": "ENERGY STAR clothes washer",
"amountCents": 7500,
"unit": "unit"
},
{
"measure": "Heat pump water heater",
"amountCents": 35000,
"unit": "unit"
},
{
"measure": "ENERGY STAR HVAC system",
"amountCents": 20000,
"unit": "system"
},
{
"measure": "HVAC tune-up",
"amountCents": 5000,
"unit": "service"
},
{
"measure": "Smart irrigation controller",
"amountCents": 15000,
"unit": "controller"
},
{
"measure": "Room air conditioner",
"amountCents": 2500,
"unit": "unit"
},
{
"measure": "ENERGY STAR smart thermostat",
"amountCents": 5000,
"unit": "unit"
},
{
"measure": "Toilet replacement instant discount",
"amountCents": 2500,
"unit": "toilet"
},
{
"measure": "Irrigation nozzle head",
"amountCents": 300,
"unit": "head"
},
{
"measure": "Showerhead",
"amountCents": 1000,
"unit": "showerhead"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "JEA residential pages publish fixed rebates and an attic insulation rate for current home efficiency and water-saving measures, with service-type requirements.",
"sourceUrls": [
"[https://www.jea.com/ways_to_save/residential_rebates/](https://www.jea.com/ways_to_save/residential_rebates/)",
"[https://www.jea.com/residential_customers/residential_rebates/heating_and_cooling_rebates/](https://www.jea.com/residential_customers/residential_rebates/heating_and_cooling_rebates/)",
"[https://www.jea.com/residential_customers/residential_rebates/heat_pump_water_heaters/](https://www.jea.com/residential_customers/residential_rebates/heat_pump_water_heaters/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "combined_heat_and_power_system",
"action": "delete_bad_edge",
"reason": "CHP is not supported by current JEA residential rebate sources."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Residential ENERGY STAR HVAC systems include qualifying heat pumps."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Residential heat pump water heater rebate is listed."
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"action": "delete_bad_edge",
"reason": "Commercial dishwasher is unsupported in this residential program."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "ENERGY STAR HVAC system rebate is listed."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "Residential ENERGY STAR clothes washer rebate is listed."
},
{
"retrofitTypeId": "high_efficiency_toilet_urinal",
"action": "keep",
"reason": "WaterSense toilet replacement discount is listed for water customers."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Attic insulation rebate is listed."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "delete_bad_edge",
"reason": "Current JEA residential rebate page reviewed does not support a general LED retrofit rebate."
},
{
"retrofitTypeId": "smart_irrigation_controller",
"action": "keep",
"reason": "Smart irrigation controller rebate is listed."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "ENERGY STAR smart thermostat rebate is listed."
},
{
"retrofitTypeId": "solar_water_heating_system",
"action": "delete_bad_edge",
"reason": "Solar water heating is not supported by current JEA residential rebate sources reviewed."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Many measures have per-premise quantity limits over a seven-year period."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "2026-10-10",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.jea.com/ways_to_save/residential_rebates/](https://www.jea.com/ways_to_save/residential_rebates/)",
"[https://www.jea.com/residential_customers/residential_rebates/attic_insulation_rebates/](https://www.jea.com/residential_customers/residential_rebates/attic_insulation_rebates/)",
"[https://www.jea.com/residential_customers/residential_rebates/clothes_washers_rebates/](https://www.jea.com/residential_customers/residential_rebates/clothes_washers_rebates/)",
"[https://www.jea.com/residential_customers/residential_rebates/heat_pump_water_heaters/](https://www.jea.com/residential_customers/residential_rebates/heat_pump_water_heaters/)",
"[https://www.jea.com/residential_customers/residential_rebates/heating_and_cooling_rebates/](https://www.jea.com/residential_customers/residential_rebates/heating_and_cooling_rebates/)",
"[https://www.jea.com/residential_customers/residential_rebates/irrigation_controller_and_nozzle_rebates/](https://www.jea.com/residential_customers/residential_rebates/irrigation_controller_and_nozzle_rebates/)",
"[https://www.jea.com/residential_customers/residential_rebates/toilet_replacement_rebates/](https://www.jea.com/residential_customers/residential_rebates/toilet_replacement_rebates/)"
],
"evidenceText": "The HPWH, HVAC, and smart thermostat legacy rules remain valid. CHP, commercial dishwasher, solar water heating, and LED lighting edges should be deleted.",
"reasoningNotes": "Use the current JEA residential measure catalog and service-type requirements.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4130",
"opportunityName": "Nicor Gas - Commercial Energy Efficiency Rebates",
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
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Apply current Nicor Gas business or multifamily rebate amount for the qualifying gas-saving measure. Steam-trap examples: commercial steam traps under 15 psig with survey receive $100 per trap; no-survey or untested steam traps receive $25 per trap; dry-cleaner or industrial/process traps at 15 psig or higher with survey receive $300 per trap.",
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
"qualifying natural gas equipment",
"eligible steam trap replacement",
"multifamily weatherization where approved",
"eligible pipe or tank insulation"
],
"ineligibleCostCategories": [
"full exterior door replacement",
"generic non-gas efficiency measures"
],
"requiredInputs": [
"measure_type",
"quantity",
"steam_pressure_psig",
"survey_status",
"customer_class",
"gas_service_status",
"approved_contractor_status_for_multifamily_weatherization"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"quantity",
"steam_trap_survey_status",
"customer_class"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "nicor_gas_2026_business_examples",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Commercial steam trap under 15 psig with survey",
"amountCents": 10000,
"unit": "trap"
},
{
"measure": "Untested or no-survey steam trap",
"amountCents": 2500,
"unit": "trap"
},
{
"measure": "Dry-cleaner or industrial/process steam trap 15 psig or higher with survey",
"amountCents": 30000,
"unit": "trap"
},
{
"measure": "Boiler, boiler reset control, thermostat, pipe insulation, ozone laundry, dryer modulation, DCV or heat recovery",
"valueModelKind": "measure_catalog_or_custom_review"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Nicor Gas current business and multifamily materials support gas space and water heating, boiler controls, steam traps, insulation, laundry controls, ventilation, heat recovery, and weatherization.",
"sourceUrls": [
"[https://www.nicorgas.com/ways-to-save/business-savings/rebates.html](https://www.nicorgas.com/ways-to-save/business-savings/rebates.html)",
"[https://apply.nicorgasrebates.com](https://apply.nicorgasrebates.com)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "Supported only under multifamily weatherization pathways."
},
{
"retrofitTypeId": "boiler_controls_burner_retrofit",
"action": "keep",
"reason": "Boiler controls and reset controls are supported."
},
{
"retrofitTypeId": "demand_controlled_ventilation",
"action": "keep",
"reason": "Demand-controlled ventilation is supported."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "keep",
"reason": "Supported only as qualifying multifamily duct sealing or related gas-saving measures."
},
{
"retrofitTypeId": "exterior_door_replacement",
"action": "delete_bad_edge",
"reason": "Current sources support weatherstripping or door-sweep type measures, not full exterior door replacement."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "High-efficiency boiler rebates are supported."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Supported only for qualifying gas space-heating equipment, not broad HVAC."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "Limited to ozone laundry and dryer modulation controls where eligible."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Pipe/tank insulation and multifamily attic insulation are supported."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Thermostat measures are supported."
},
{
"retrofitTypeId": "steam_trap_replacement",
"action": "keep",
"reason": "Steam trap replacement rates are published."
},
{
"retrofitTypeId": "waste_heat_recovery",
"action": "keep",
"reason": "Compressed-air heat recovery or specified efficiency-improvement equipment is supported."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Steam trap rebates may not exceed cost and require survey documentation for full rates."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.nicorgas.com/ways-to-save/business-savings/rebates.html](https://www.nicorgas.com/ways-to-save/business-savings/rebates.html)",
"[https://www.nicorgas.com/ways-to-save/multi-family-savings/multi-family-rebates.html](https://www.nicorgas.com/ways-to-save/multi-family-savings/multi-family-rebates.html)",
"[https://apply.nicorgasrebates.com](https://apply.nicorgasrebates.com)"
],
"evidenceText": "Nicor's steam-trap rates are valid but must be tiered by survey status and pressure; delete full exterior door replacement.",
"reasoningNotes": "Keep broad gas categories only when constrained to supported Nicor gas-saving measures.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2176",
"opportunityName": "New Hampshire Electric Co-op - Commercial and Municipal Retrofit Energy Efficiency Programs",
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
"formulaText": "Use current NHEC or NHSaves C&I prescriptive/custom measure amount for qualifying lighting, HVAC, refrigeration, controls, and foodservice projects. NHEC's EV charging incentive pays 75% of installed cost up to $2,500 per qualifying Level 2 or larger station, with a $5,000 property cap.",
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
"perSiteCapCents": 500000,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying C&I electric efficiency equipment",
"EV charging installed cost",
"eligible custom project costs"
],
"ineligibleCostCategories": [
"unlisted foodservice equipment",
"custom measures without utility approval"
],
"requiredInputs": [
"measure_type",
"equipment_quantity",
"installed_cost",
"EV_station_count",
"preapproval_status",
"annual_kwh_savings_for_custom_projects",
"equipment_efficiency"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"quantity",
"installed_cost",
"preapproval_status",
"custom_kwh_savings"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "nhec_nhsaves_business_current",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Level 2 or larger EV charging station",
"percent": 0.75,
"maxAmountCents": 250000,
"unit": "station",
"perSiteCapCents": 500000
},
{
"measure": "Lighting",
"valueModelKind": "measure_catalog_or_custom_review"
},
{
"measure": "Electric HVAC or heat pump",
"valueModelKind": "measure_catalog_or_custom_review"
},
{
"measure": "Ground-source heat pump",
"valueModelKind": "measure_catalog_or_custom_review"
},
{
"measure": "Refrigeration or ice machine",
"valueModelKind": "measure_catalog_or_custom_review"
},
{
"measure": "Commercial dishwasher, fryer, oven, or steamer",
"valueModelKind": "measure_catalog_or_point_of_sale"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "NHEC and NHSaves current materials support C&I electric, HVAC, refrigeration, foodservice, and EV charging incentives; EV requires preapproval before installation.",
"sourceUrls": [
"[https://www.nhec.com/commercial-savings-programs/](https://www.nhec.com/commercial-savings-programs/)",
"[https://nhsaves.com/businesses-towns/electric/](https://nhsaves.com/businesses-towns/electric/)",
"[https://www.nhec.com/commercial-savings-programs/electric-vehicle-charging-incentive-application/](https://www.nhec.com/commercial-savings-programs/electric-vehicle-charging-incentive-application/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "efficient_ice_machine",
"action": "keep",
"reason": "Qualifying commercial foodservice/refrigeration equipment includes ice machines."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "NHEC has a current EV charging incentive for Level 2 or larger stations."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Ground-source heat pumps are supported through NHSaves C&I materials."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Electric heat pump equipment is supported."
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"action": "keep",
"reason": "Qualifying commercial dishwasher foodservice incentives are supported."
},
{
"retrofitTypeId": "high_efficiency_fryer",
"action": "keep",
"reason": "Qualifying commercial fryer foodservice incentives are supported."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "C&I HVAC incentives are supported."
},
{
"retrofitTypeId": "high_efficiency_oven",
"action": "keep",
"reason": "Qualifying commercial oven foodservice incentives are supported."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "C&I refrigeration incentives are supported."
},
{
"retrofitTypeId": "high_efficiency_steamer",
"action": "keep",
"reason": "Qualifying commercial steamer foodservice incentives are supported."
},
{
"retrofitTypeId": "hvac_controls_retrofit",
"action": "keep",
"reason": "HVAC controls and economizer-related measures are supported."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "C&I lighting incentives are supported."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "EV incentive is limited to up to two qualifying stations and $5,000 per property."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.nhec.com/commercial-savings-programs/](https://www.nhec.com/commercial-savings-programs/)",
"[https://nhsaves.com/businesses-towns/electric/](https://nhsaves.com/businesses-towns/electric/)",
"[https://nhsaves.com/businesses-towns/electric/electric-hvac-equipment/](https://nhsaves.com/businesses-towns/electric/electric-hvac-equipment/)",
"[https://nhsaves.com/businesses-towns/commercial-food-service-equipment/](https://nhsaves.com/businesses-towns/commercial-food-service-equipment/)",
"[https://www.nhec.com/commercial-savings-programs/electric-vehicle-charging-incentive-application/](https://www.nhec.com/commercial-savings-programs/electric-vehicle-charging-incentive-application/)"
],
"evidenceText": "The existing 75% EV rule is valid, with per-station and per-property caps; other edges remain supported by NHEC/NHSaves C&I materials.",
"reasoningNotes": "Use product-specific foodservice and custom-review boundaries; do not generalize to unlisted kitchen equipment.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4644",
"opportunityName": "Orange and Rockland Utilities (Electric) - Commercial Efficiency Programs",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"tariff_or_rate"
],
"primaryValueModelKinds": [
"hybrid_rate_plus_cap",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "hybrid_rate_plus_cap",
"timing": "post_installation_reimbursement",
"formulaText": "For New York business custom incentives, electric projects are paid at $0.15 per annual kWh saved, capped at 25% of project cost; gas projects are paid at $1.50 per annual therm saved, capped at 25% of project cost. Projects require preapproval, engineering analysis, pre-inspection, and at least a one-year payback.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.25,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"approved custom electric efficiency project cost",
"approved custom gas efficiency project cost"
],
"ineligibleCostCategories": [
"unsupported prescriptive foodservice equipment",
"unsupported low-flow fixtures",
"unsupported residential appliances"
],
"requiredInputs": [
"project_type_electric_or_gas",
"annual_kwh_savings",
"annual_therm_savings",
"eligible_project_cost",
"simple_payback_years",
"preapproval_status",
"preinspection_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"annual_kwh_savings",
"annual_therm_savings",
"eligible_project_cost",
"payback"
],
"rateTable": {
"tableId": "oru_ny_custom_incentive_rates",
"dimensions": [
"fuel_type"
],
"rows": [
{
"fuel_type": "electric",
"rate": 15,
"rateUnit": "cents_per_annual_kwh_saved",
"maxPercentOfEligibleCost": 0.25,
"minimumPaybackYears": 1
},
{
"fuel_type": "gas",
"rate": 150,
"rateUnit": "cents_per_annual_therm_saved",
"maxPercentOfEligibleCost": 0.25,
"minimumPaybackYears": 1
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
"probabilityEvidenceType": "eligibility_only"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "O&R's current New York custom page supports electric and gas custom savings formulas, but not the old New Jersey $0.16/kWh and 50% cap rule.",
"sourceUrls": [
"[https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-business-customers-ny/custom-incentive-program](https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-business-customers-ny/custom-incentive-program)",
"[https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-business-customers-ny](https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-business-customers-ny)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "automated_demand_response_controls",
"action": "move_to_special_workflow",
"reason": "Demand response is a separate Smart Usage Rewards offering, not the custom efficiency rebate."
},
{
"retrofitTypeId": "demand_controlled_ventilation",
"action": "keep",
"reason": "Can be supported only as an approved custom electric or gas savings project."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "Can be supported only through custom gas savings analysis and preapproval."
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"action": "delete_bad_edge",
"reason": "Prescriptive commercial dishwasher rebate was not verified on current O&R business pages."
},
{
"retrofitTypeId": "high_efficiency_fryer",
"action": "delete_bad_edge",
"reason": "Prescriptive fryer rebate was not verified on current O&R business pages."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "Can be supported only as an approved custom gas savings project."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "delete_bad_edge",
"reason": "Laundry equipment rebate was not verified on current O&R business pages."
},
{
"retrofitTypeId": "high_efficiency_oven",
"action": "delete_bad_edge",
"reason": "Prescriptive oven rebate was not verified on current O&R business pages."
},
{
"retrofitTypeId": "high_efficiency_steamer",
"action": "delete_bad_edge",
"reason": "Prescriptive steamer rebate was not verified on current O&R business pages."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "delete_bad_edge",
"reason": "Generic insulation rebate was not verified on current O&R business pages."
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"action": "delete_bad_edge",
"reason": "Low-flow fixture rebate was not verified on current O&R business pages."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "delete_bad_edge",
"reason": "Standalone smart thermostat rebate was not verified for this current O&R business custom record."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Custom incentives are limited by project cost cap and payback rules; separate demand response should be handled independently."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-business-customers-ny](https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-business-customers-ny)",
"[https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-business-customers-ny/custom-incentive-program](https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-business-customers-ny/custom-incentive-program)"
],
"evidenceText": "Replace the stale New Jersey custom formula with New York custom rates: $0.15/kWh and $1.50/therm, each capped at 25% of project cost.",
"reasoningNotes": "Delete unsupported prescriptive foodservice, plumbing, appliance, insulation, and thermostat edges.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2593",
"opportunityName": "EWEB - Commercial Energy Efficiency Rebates Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate",
"financing"
],
"primaryValueModelKinds": [
"measure_catalog",
"fixed_tier_amount",
"custom_quote",
"loan_or_financing"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Apply EWEB's current business measure amount for the selected qualifying measure. Examples include Level 2 public/multifamily EVSE $1,500 per port or affordable housing $2,000 per port; consumer HPWH $1,800; commercial unitary HPWH $2,000; DCKV $400 or $800 per hood horsepower depending on sensor configuration; and anti-sweat heater controls $40 per linear foot.",
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
"qualifying business electric efficiency equipment",
"eligible EVSE ports",
"qualifying water fixture replacement",
"approved custom project costs"
],
"ineligibleCostCategories": [
"DC fast charging under current EWEB business EV page",
"water measures for non-water customers"
],
"requiredInputs": [
"measure_type",
"equipment_quantity",
"port_count",
"affordable_housing_status_for_EV",
"hood_horsepower",
"sensor_configuration",
"linear_feet_for_refrigeration_controls",
"tons_or_cfm_or_hp_as_applicable",
"preapproval_status_if_rebate_over_2500"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"quantity",
"equipment_size_or_area",
"EV_port_type",
"preapproval_status"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "eweb_business_current_measure_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Commercial public or multifamily Level 2 EVSE",
"amountCents": 150000,
"unit": "port"
},
{
"measure": "Affordable-housing Level 2 EVSE",
"amountCents": 200000,
"unit": "port"
},
{
"measure": "Consumer heat pump water heater",
"amountCents": 180000,
"unit": "unit"
},
{
"measure": "Commercial unitary heat pump water heater",
"amountCents": 200000,
"unit": "unit"
},
{
"measure": "Ductless heat pump, electric retrofit",
"amountCents": 100000,
"unit": "system"
},
{
"measure": "Air-source heat pump, electric retrofit",
"rate": 100000,
"rateUnit": "cents_per_ton"
},
{
"measure": "VRF, electric retrofit",
"rate": 150000,
"rateUnit": "cents_per_ton"
},
{
"measure": "Heat recovery ventilation Tier 1",
"rate": 250,
"rateUnit": "cents_per_cfm"
},
{
"measure": "Heat recovery ventilation Tier 2",
"rate": 400,
"rateUnit": "cents_per_cfm"
},
{
"measure": "Pump VFD",
"rate": 18000,
"rateUnit": "cents_per_horsepower"
},
{
"measure": "Kitchen ventilation demand control, single sensor",
"rate": 40000,
"rateUnit": "cents_per_horsepower"
},
{
"measure": "Kitchen ventilation demand control, multiple sensors",
"rate": 80000,
"rateUnit": "cents_per_horsepower"
},
{
"measure": "Anti-sweat heater controls",
"rate": 4000,
"rateUnit": "cents_per_linear_foot"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "EWEB current pages publish specific business rebate amounts for HVAC, HPWH, refrigeration controls, kitchen ventilation, Level 2 EVSE, water fixtures, and custom projects.",
"sourceUrls": [
"[https://www.eweb.org/business-rebates](https://www.eweb.org/business-rebates)",
"[https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/hvac-systems-rebates](https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/hvac-systems-rebates)",
"[https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/refrigeration-rebates](https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/refrigeration-rebates)",
"[https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives-business](https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives-business)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "anti_sweat_heater_controls",
"action": "keep",
"reason": "Anti-sweat heater controls are supported as refrigeration controls."
},
{
"retrofitTypeId": "demand_controlled_kitchen_ventilation",
"action": "keep",
"reason": "Kitchen ventilation demand control incentives are published per horsepower."
},
{
"retrofitTypeId": "energy_recovery_ventilation_retrofit",
"action": "keep",
"reason": "Heat recovery ventilation incentives are published per CFM."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "move_to_special_workflow",
"reason": "EV charging is supported through a separate EWEB electric mobility incentive."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Ductless, air-source, and VRF heat pumps are supported."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Commercial and consumer HPWH business rebates are listed."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Business HVAC rebates are supported."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Commercial refrigeration measures are supported."
},
{
"retrofitTypeId": "high_efficiency_toilet_urinal",
"action": "keep",
"reason": "Water-efficient toilets and urinals are supported for EWEB water customers."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Commercial windows and insulation measures are supported."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "move_to_special_workflow",
"reason": "Level 2 EVSE is supported through EWEB electric mobility incentives."
},
{
"retrofitTypeId": "waste_heat_recovery",
"action": "keep",
"reason": "Supported only as approved heat recovery, HRV, or custom efficiency work."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebates over $2,500 commonly require preapproval before purchase."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.eweb.org/business-rebates](https://www.eweb.org/business-rebates)",
"[https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/hvac-systems-rebates](https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/hvac-systems-rebates)",
"[https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/hpwh](https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/hpwh)",
"[https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/refrigeration-rebates](https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/refrigeration-rebates)",
"[https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives-business](https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives-business)",
"[https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/water-conservation-rebates](https://www.eweb.org/rebates-and-savings/business-incentives-rebates-and-conservation/water-conservation-rebates)"
],
"evidenceText": "EWEB legacy Level 2 EV rules are valid, but EV charging is a separate mobility workflow; no DCFC edge should be inferred.",
"reasoningNotes": "Financing exists, but without a stated buy-down or forgiveness it should not be counted as cash savings.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4636",
"opportunityName": "Burlington Electric Department - Residential Energy Efficiency Rebate Program",
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
"capped_percent_of_eligible_cost",
"tariff_or_rate"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Apply BED's current measure amount, with total rebate generally capped at 75% of installed cost where stated. Examples include residential EV charger $900 for an all-electric vehicle or $700 for a plug-in hybrid, income-qualified EV charger $1,000, mini-split heat pump $2,100 to $2,500 by size, HPWH $800 plus possible income-qualified adder, and air-to-water heat pump $2,000 per ton capped at 75%.",
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
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying residential equipment",
"installed cost",
"eligible EV charger equipment and installation"
],
"ineligibleCostCategories": [
"window replacement",
"generic blower replacement",
"generic waste heat recovery",
"commercial kitchen equipment"
],
"requiredInputs": [
"measure_type",
"equipment_quantity",
"installed_cost",
"heat_pump_size_tons",
"income_qualified_status",
"EV_type_AEV_or_PHEV",
"EV_rate_enrollment_status",
"qualifying_product_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"installed_cost",
"heat_pump_size",
"income_qualified_status",
"EV_type"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "bed_residential_current_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Residential EV charger with all-electric vehicle",
"amountCents": 90000,
"maxPercentOfEligibleCost": 0.75,
"unit": "charger"
},
{
"measure": "Residential EV charger with plug-in hybrid",
"amountCents": 70000,
"maxPercentOfEligibleCost": 0.75,
"unit": "charger"
},
{
"measure": "Income-qualified residential EV charger",
"amountCents": 100000,
"maxPercentOfEligibleCost": 0.75,
"unit": "charger"
},
{
"measure": "Mini-split heat pump, up to 2 tons",
"amountCents": 210000,
"unit": "system"
},
{
"measure": "Mini-split heat pump, greater than 2 tons",
"amountCents": 250000,
"unit": "system"
},
{
"measure": "Heat pump water heater",
"amountCents": 80000,
"unit": "unit"
},
{
"measure": "Income-qualified HPWH adder",
"amountCents": 40000,
"unit": "unit"
},
{
"measure": "Air-to-water heat pump",
"rate": 200000,
"rateUnit": "cents_per_ton",
"maxPercentOfEligibleCost": 0.75
},
{
"measure": "Bathroom fan or controller",
"amountCents": 11000,
"maxPercentOfEligibleCost": 0.75,
"unit": "unit"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "BED's current rebate form lists EV charger, heat pumps, HPWH, HRV/ERV, bathroom fan, induction cooking, laundry, refrigerator/freezer, and window AC measures with cost caps.",
"sourceUrls": [
"[https://www.burlingtonelectric.com/rebate-form/](https://www.burlingtonelectric.com/rebate-form/)",
"[https://www.burlingtonelectric.com/rebates](https://www.burlingtonelectric.com/rebates)",
"[https://www.burlingtonelectric.com/coolhome/](https://www.burlingtonelectric.com/coolhome/)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "monthly",
"formulaText": "Residential EV charger participants may receive off-peak EV charging rate credits only when enrolled in the required BED EV rate; calculate from metered off-peak kWh and applicable tariff credit.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": "cents_per_kwh",
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
"EV_rate_enrollment_status",
"off_peak_EV_kwh",
"current_tariff_credit"
],
"missingInputsForTypicalRetroFiEstimate": [
"off_peak_EV_kwh",
"current_tariff_credit"
],
"rateTable": {
"tableId": "bed_ev_rate_credit",
"dimensions": [
"charging_period"
],
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
"evidenceText": "BED EV charger rebate requires EV rate enrollment; recurring value depends on actual metered off-peak charging usage.",
"sourceUrls": [
"[https://www.burlingtonelectric.com/rebate-form/](https://www.burlingtonelectric.com/rebate-form/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "efficient_fan_blower_replacement",
"action": "delete_bad_edge",
"reason": "Blower replacement is not supported as a BED residential building retrofit category."
},
{
"retrofitTypeId": "energy_recovery_ventilation_retrofit",
"action": "keep",
"reason": "HRV/ERV ventilation is listed."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "Residential EV charger rebates are listed."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Mini-split, central ducted, and air-to-water heat pumps are listed."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Heat pump water heater rebate is listed."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Broad HVAC replacement is not supported beyond listed heat pump and window/room AC products."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "Residential clothes washer/laundry rebate is listed."
},
{
"retrofitTypeId": "induction_cooking_equipment",
"action": "keep",
"reason": "Residential induction cooktop incentive is listed."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "delete_bad_edge",
"reason": "General residential LED retrofit was not verified in the current BED rebate form."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "needs_review",
"reason": "BED home-cooling materials reference smart thermostat rebates, but main rebate form support is limited."
},
{
"retrofitTypeId": "waste_heat_recovery",
"action": "delete_bad_edge",
"reason": "Generic heat recovery is unsupported; only HRV/ERV ventilation is supported."
},
{
"retrofitTypeId": "window_replacement",
"action": "delete_bad_edge",
"reason": "Window wording maps to window/room air conditioner, not window replacement."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "BED total rebate, including contractor or online rebate components, is generally capped at 75% of installed cost where stated."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "2026-12-31",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.burlingtonelectric.com/rebate-form/](https://www.burlingtonelectric.com/rebate-form/)",
"[https://www.burlingtonelectric.com/rebates](https://www.burlingtonelectric.com/rebates)",
"[https://www.burlingtonelectric.com/coolhome/](https://www.burlingtonelectric.com/coolhome/)"
],
"evidenceText": "The legacy 75% cap is real but not a standalone value; it caps measure-specific BED rebates. Delete false window, blower, LED, and generic heat-recovery edges.",
"reasoningNotes": "BED EV and heat pump formulas need installed cost, vehicle type, equipment type, and income status.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2290",
"opportunityName": "Carbon Power & Light - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "medium",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"process_value"
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
"formulaText": "Credits are applied to the Carbon Power member-owner account. Apply the current official measure amount: HPWH $350, ducted or ductless air-source heat pump $500 up to 1.5 tons or $1,500 above 1.5 tons, ground-source heat pump $500/ton new or $250/ton replacement, induction $100 or $350 by fuel-switch/new-construction condition, Level 2 EV charger 50% up to $250 or $1,000 by charger type, and DCFC 50% up to kW-tier caps.",
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
"eligibleCostCategories": [
"qualifying equipment",
"EV charging equipment cost",
"low-income weatherization agency approved measures"
],
"ineligibleCostCategories": [
"general market weatherization",
"building blower replacement",
"commercial refrigeration"
],
"requiredInputs": [
"measure_type",
"quantity",
"heat_pump_tons",
"new_or_replacement_ground_source",
"EV_charger_type",
"DCFC_power_kw",
"eligible_cost",
"income_qualified_weatherization_agency_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"quantity",
"heat_pump_tons",
"EV_charger_type",
"eligible_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "carbon_power_current_rebate_schedule",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Heat pump water heater",
"amountCents": 35000,
"unit": "unit"
},
{
"measure": "Air-source heat pump, up to 1.5 tons",
"amountCents": 50000,
"unit": "system"
},
{
"measure": "Air-source heat pump, greater than 1.5 tons",
"amountCents": 150000,
"unit": "system"
},
{
"measure": "Ground-source heat pump, new",
"rate": 50000,
"rateUnit": "cents_per_ton"
},
{
"measure": "Ground-source heat pump, replacement",
"rate": 25000,
"rateUnit": "cents_per_ton"
},
{
"measure": "Ground-source desuperheater",
"amountCents": 10000,
"unit": "unit"
},
{
"measure": "Smart thermostat",
"amountCents": 2500,
"unit": "unit"
},
{
"measure": "Induction, electric-to-induction",
"amountCents": 10000,
"unit": "unit"
},
{
"measure": "Induction, gas-to-electric or new construction",
"amountCents": 35000,
"unit": "unit"
},
{
"measure": "Refrigerator/freezer recycling",
"amountCents": 6000,
"unit": "unit"
},
{
"measure": "Level 2 non-managed EV charger",
"percent": 0.5,
"maxAmountCents": 25000,
"unit": "charger"
},
{
"measure": "Retail-sale or fee-capable Level 2 EV charger",
"percent": 0.5,
"maxAmountCents": 100000,
"unit": "charger"
},
{
"measure": "DCFC 50-75 kW",
"percent": 0.5,
"maxAmountCents": 300000,
"unit": "charger"
},
{
"measure": "DCFC 76-149 kW",
"percent": 0.5,
"maxAmountCents": 500000,
"unit": "charger"
},
{
"measure": "DCFC 150+ kW",
"percent": 0.5,
"maxAmountCents": 750000,
"unit": "charger"
},
{
"measure": "Low-income weatherization agency match",
"maxAmountCents": 50000,
"unit": "project"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Carbon Power official rebate detail lists bill-credit amounts for water heating, heat pumps, induction, appliances, low-income weatherization, EV charging, and related electrification measures.",
"sourceUrls": [
"[https://www.carbonpower.com/rebates-2025](https://www.carbonpower.com/rebates-2025)",
"[https://www.carbonpower.com/products](https://www.carbonpower.com/products)",
"[https://www.carbonpower.com/light-lines-2026](https://www.carbonpower.com/light-lines-2026)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "move_to_special_workflow",
"reason": "Weatherization is limited to income-qualified Weatherization Agency work, not general market weatherization."
},
{
"retrofitTypeId": "dc_fast_charger_installation",
"action": "keep",
"reason": "DC fast charger kW-tier rebates are listed."
},
{
"retrofitTypeId": "efficient_fan_blower_replacement",
"action": "delete_bad_edge",
"reason": "Building fan/blower replacement was not verified as a current Carbon Power rebate."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "EV charger rebates are listed."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Ground-source heat pump per-ton rebates are listed."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Air-source heat pump rebates are listed."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Heat pump water heater rebate is listed."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Supported only for listed heat pump or evaporative cooling equipment."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Limited to residential ENERGY STAR or refrigerator/freezer recycling terms."
},
{
"retrofitTypeId": "induction_cooking_equipment",
"action": "keep",
"reason": "Residential induction cooking rebates are listed."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "delete_bad_edge",
"reason": "General LED lighting rebate was not verified in current Carbon Power rebate detail."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Level 2 EV charger rebates are listed."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Credits are applied to member-owner accounts; several measures are limited by 50% cost caps."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "within 90 days of purchase or installation",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.carbonpower.com/rebates-2025](https://www.carbonpower.com/rebates-2025)",
"[https://www.carbonpower.com/products](https://www.carbonpower.com/products)",
"[https://www.carbonpower.com/light-lines-2026](https://www.carbonpower.com/light-lines-2026)"
],
"evidenceText": "Replace the stale $500 generic rule with measure-specific bill-credit rows. Keep confidence medium because the detailed page found is labeled 2025.",
"reasoningNotes": "Use current Carbon Power pages when available; detailed schedule freshness should be rechecked during implementation.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Detailed official schedule located is labeled 2025 while newer site content only confirms continuing rebates."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1615",
"opportunityName": "Anaheim Public Utilities - Commercial Energy Efficiency Rebate Programs",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"process_value"
],
"primaryValueModelKinds": [
"hybrid_rate_plus_cap",
"measure_catalog",
"custom_quote",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "hybrid_rate_plus_cap",
"timing": "post_installation_reimbursement",
"formulaText": "For Anaheim commercial air conditioner, heat pump, and customized energy incentives, calculate the applicable incentive from $0.20 per annual kWh saved or $500 per kW reduced under the program method, then apply the lesser of the calculated incentive, $75,000, and 75% of eligible project cost. Public EV charging is separate, with up to $3,500 per public charger or up to $7,500 for eligible school, affordable housing, or public DC fast charger projects.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 7500000,
"caps": {
"maxAwardCents": 7500000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.75,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"approved commercial energy efficiency project cost",
"qualifying HVAC or heat pump equipment",
"public EV charger equipment and installation where eligible"
],
"ineligibleCostCategories": [
"custom measures without APU approval",
"private residential EV chargers under this business record"
],
"requiredInputs": [
"measure_type",
"annual_kwh_savings",
"kw_reduction",
"eligible_project_cost",
"preapproval_status",
"EV_public_access_status",
"EV_site_type",
"charger_count"
],
"missingInputsForTypicalRetroFiEstimate": [
"annual_kwh_savings",
"kw_reduction",
"eligible_project_cost",
"EV_site_type",
"charger_count"
],
"rateTable": {
"tableId": "anaheim_business_energy_formula",
"dimensions": [
"measure_path"
],
"rows": [
{
"measure_path": "air_conditioner_or_heat_pump_or_custom_energy",
"rate": 20,
"rateUnit": "cents_per_annual_kwh_saved",
"alternateRate": 50000,
"alternateRateUnit": "cents_per_kw_reduced",
"maxAwardCents": 7500000,
"maxPercentOfEligibleCost": 0.75
},
{
"measure_path": "public_EV_charger_standard",
"maxAmountCents": 350000,
"unit": "charger"
},
{
"measure_path": "public_EV_charger_school_affordable_housing_or_public_DCFC",
"maxAmountCents": 750000,
"unit": "charger"
}
]
},
"measureCatalog": {
"catalogId": "anaheim_business_current_categories",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Lighting and lighting controls",
"valueModelKind": "measure_catalog_or_rate_table"
},
{
"measure": "Motor or VFD",
"valueModelKind": "measure_catalog_or_custom_review"
},
{
"measure": "Cooling tower, refrigeration, EMS or process equipment",
"valueModelKind": "custom_quote"
},
{
"measure": "Comprehensive energy assessment",
"valueModelKind": "non_cash_process_value"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Anaheim business pages publish formula-based AC, heat pump and custom incentives, public EV charger caps, and assessment/direct-install pathways.",
"sourceUrls": [
"[https://www.anaheim.net/5353/Business-Energy-Rebates](https://www.anaheim.net/5353/Business-Energy-Rebates)",
"[https://www.anaheim.net/2543/Air-Conditioner-Incentive](https://www.anaheim.net/2543/Air-Conditioner-Incentive)",
"[https://www.anaheim.net/958/Heat-Pump-Incentives-Program](https://www.anaheim.net/958/Heat-Pump-Incentives-Program)",
"[https://www.anaheim.net/1533/Customized-Energy-Incentives](https://www.anaheim.net/1533/Customized-Energy-Incentives)",
"[https://www.anaheim.net/3312/Public-EV-Charger-Rebate](https://www.anaheim.net/3312/Public-EV-Charger-Rebate)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "cooling_tower_controls_optimization",
"action": "keep",
"reason": "Cooling towers are supported as custom electric-savings or separate water-efficiency projects with review."
},
{
"retrofitTypeId": "dc_fast_charger_installation",
"action": "move_to_special_workflow",
"reason": "DC fast charging is supported through public EV charger workflow."
},
{
"retrofitTypeId": "energy_audit",
"action": "move_to_special_workflow",
"reason": "Comprehensive energy assessment is a service/process value, not an equipment rebate."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "move_to_special_workflow",
"reason": "EV charger support is a public EV charger workflow separate from core energy rebates."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Heat pump incentive program is listed."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Air conditioner incentive program is listed."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Refrigeration is supported as custom or small-business enhancement work."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Lighting incentive program is listed."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "move_to_special_workflow",
"reason": "Level 2 chargers are supported through public EV charger workflow."
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"action": "keep",
"reason": "Lighting controls are supported."
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"action": "keep",
"reason": "Motor/VFD and custom project support is listed."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Custom and HVAC incentives are limited by $75,000 and 75% of eligible cost; EV charger amounts are stated as up to caps."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.anaheim.net/5353/Business-Energy-Rebates](https://www.anaheim.net/5353/Business-Energy-Rebates)",
"[https://www.anaheim.net/2543/Air-Conditioner-Incentive](https://www.anaheim.net/2543/Air-Conditioner-Incentive)",
"[https://www.anaheim.net/1533/Customized-Energy-Incentives](https://www.anaheim.net/1533/Customized-Energy-Incentives)",
"[https://www.anaheim.net/3312/Public-EV-Charger-Rebate](https://www.anaheim.net/3312/Public-EV-Charger-Rebate)",
"[https://www.anaheim.net/958/Heat-Pump-Incentives-Program](https://www.anaheim.net/958/Heat-Pump-Incentives-Program)",
"[https://www.anaheim.net/961/Lighting-Incentives-Program](https://www.anaheim.net/961/Lighting-Incentives-Program)",
"[https://www.anaheim.net/2544/Motor-Incentive-Program](https://www.anaheim.net/2544/Motor-Incentive-Program)",
"[https://www.anaheim.net/940/Comprehensive-Energy-Assessment](https://www.anaheim.net/940/Comprehensive-Energy-Assessment)"
],
"evidenceText": "Replace stale private EV charger rules with current public EV charger workflow and formula-based APU business energy incentives.",
"reasoningNotes": "APU custom measures require savings and cost inputs before a user-facing estimate.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4815",
"opportunityName": "Poudre Valley REA - Energy Efficiency Rebate Program",
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
"fixed_tier_amount",
"capped_percent_of_eligible_cost"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Apply PVREA's current rebate schedule. Examples include Level 2 EV charger 50% of equipment and electric service costs up to $500 standard or $1,000 managed/TOU; public DCFC $3,000 for 50-75 kW, $5,000 for 76-149 kW, or $7,000 for 150+ kW; air-source heat pump $500 up to 1.5 tons or $1,500 above 1.5 tons; ground-source heat pump $500/ton new or $250/ton replacement; HPWH $350.",
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
"eligibleCostCategories": [
"qualifying equipment",
"EV charging equipment",
"electric service installation costs for Level 2 EV"
],
"ineligibleCostCategories": [
"lighting under current main rebate page",
"efficient refrigeration replacement",
"lighting controls"
],
"requiredInputs": [
"measure_type",
"quantity",
"eligible_cost",
"heat_pump_tons",
"new_or_replacement_ground_source",
"EV_charger_type",
"DCFC_power_kw",
"managed_charging_or_TOU_status",
"public_access_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"eligible_cost",
"heat_pump_tons",
"EV_charger_type",
"public_access_status"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "pvrea_current_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Level 2 EV charger standard",
"percent": 0.5,
"maxAmountCents": 50000,
"unit": "charger"
},
{
"measure": "Level 2 EV charger managed or TOU",
"percent": 0.5,
"maxAmountCents": 100000,
"unit": "charger"
},
{
"measure": "Public DCFC 50-75 kW",
"amountCents": 300000,
"unit": "charger"
},
{
"measure": "Public DCFC 76-149 kW",
"amountCents": 500000,
"unit": "charger"
},
{
"measure": "Public DCFC 150+ kW",
"amountCents": 700000,
"unit": "charger"
},
{
"measure": "Air-source heat pump up to 1.5 tons",
"amountCents": 50000,
"unit": "system"
},
{
"measure": "Air-source heat pump greater than 1.5 tons",
"amountCents": 150000,
"unit": "system"
},
{
"measure": "Ground-source heat pump new",
"rate": 50000,
"rateUnit": "cents_per_ton"
},
{
"measure": "Ground-source heat pump replacement",
"rate": 25000,
"rateUnit": "cents_per_ton"
},
{
"measure": "Heat pump water heater",
"amountCents": 35000,
"unit": "unit"
},
{
"measure": "Smart thermostat",
"amountCents": 2500,
"unit": "unit"
},
{
"measure": "Smart thermostat with Power Peak enrollment",
"amountCents": 10000,
"unit": "unit"
},
{
"measure": "Induction, electric-to-induction",
"amountCents": 10000,
"unit": "unit"
},
{
"measure": "Induction, gas-to-electric or new construction",
"amountCents": 35000,
"unit": "unit"
},
{
"measure": "Refrigerator/freezer recycling",
"amountCents": 6000,
"unit": "unit"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "PVREA current pages publish EV charger, heat pump, thermostat, HPWH, induction, and appliance recycling rebates, with public DCFC reviewed case-by-case.",
"sourceUrls": [
"[https://pvrea.coop/for-members/rebates/](https://pvrea.coop/for-members/rebates/)",
"[https://pvrea.coop/for-members/rebates/ev-rebates/](https://pvrea.coop/for-members/rebates/ev-rebates/)",
"[https://pvrea.coop/for-members/rebates/heating-cooling-rebates/](https://pvrea.coop/for-members/rebates/heating-cooling-rebates/)",
"[https://pvrea.coop/for-members/rebates/appliance-rebates/](https://pvrea.coop/for-members/rebates/appliance-rebates/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "dc_fast_charger_installation",
"action": "keep",
"reason": "Public DC fast charger kW-tier rebates are listed."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "EV charger rebates are listed."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Ground-source heat pump per-ton rebates are listed."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Air-source heat pump rebates are listed."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Supported only through listed heat pump or cooling equipment measures."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "delete_bad_edge",
"reason": "Current support is refrigerator/freezer recycling, not efficient refrigeration replacement."
},
{
"retrofitTypeId": "induction_cooking_equipment",
"action": "keep",
"reason": "Induction cooking rebates are listed."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "delete_bad_edge",
"reason": "No current PVREA lighting rebate was verified on the main rebate pages."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Level 2 EV charger rebates are listed."
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"action": "delete_bad_edge",
"reason": "Lighting-control rebate was not verified on current PVREA pages."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Smart thermostat rebates and Power Peak enrollment incentives are listed."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "DC fast charger incentives are public-use only and subject to case-by-case review."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "within 90 days of purchase or installation",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://pvrea.coop/for-members/rebates/](https://pvrea.coop/for-members/rebates/)",
"[https://pvrea.coop/for-members/rebates/appliance-rebates/](https://pvrea.coop/for-members/rebates/appliance-rebates/)",
"[https://pvrea.coop/for-members/rebates/heating-cooling-rebates/](https://pvrea.coop/for-members/rebates/heating-cooling-rebates/)",
"[https://pvrea.coop/for-members/rebates/ev-rebates/](https://pvrea.coop/for-members/rebates/ev-rebates/)"
],
"evidenceText": "The EV rules are valid but need tiering and public/managed-charging inputs. Delete unsupported lighting and efficient refrigeration edges.",
"reasoningNotes": "Do not treat refrigerator/freezer recycling as high-efficiency refrigeration replacement.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3161",
"opportunityName": "NIPSCO (Gas & Electric) - Residential Energy Efficiency Program",
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
"formulaText": "Apply NIPSCO's current residential measure amount. Examples include ENERGY STAR heat pump water heater $750; air-source heat pump $800 for 15.2-16.1 SEER2, $900 for 16.2-17.0 SEER2, and $1,000 for 17.1+ SEER2; and residential dishwasher $30 standard or $15 compact where supported by the application.",
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
"qualifying residential electric equipment",
"qualifying residential gas equipment",
"qualifying residential appliances"
],
"ineligibleCostCategories": [
"commercial dishwasher",
"full window replacement",
"unverified general air sealing"
],
"requiredInputs": [
"measure_type",
"quantity",
"NIPSCO_electric_or_gas_service_status",
"equipment_efficiency",
"SEER2_rating_for_heat_pumps",
"purchase_or_installation_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"quantity",
"service_type",
"equipment_efficiency"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "nipsco_residential_current",
"selectionInput": "measure_type",
"rows": [
{
"measure": "ENERGY STAR heat pump water heater",
"amountCents": 75000,
"unit": "unit"
},
{
"measure": "Air-source heat pump 15.2-16.1 SEER2",
"amountCents": 80000,
"unit": "system"
},
{
"measure": "Air-source heat pump 16.2-17.0 SEER2",
"amountCents": 90000,
"unit": "system"
},
{
"measure": "Air-source heat pump 17.1+ SEER2",
"amountCents": 100000,
"unit": "system"
},
{
"measure": "Residential dishwasher, standard",
"amountCents": 3000,
"unit": "unit"
},
{
"measure": "Residential dishwasher, compact",
"amountCents": 1500,
"unit": "unit"
},
{
"measure": "Furnace, boiler, smart thermostat, clothes washer or dryer, room AC, storm window, tune-up",
"valueModelKind": "measure_catalog"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "NIPSCO residential rebate materials publish fixed HVAC, HPWH, appliance, thermostat, boiler, furnace, storm window, and tune-up rebates by fuel service and equipment criteria.",
"sourceUrls": [
"[https://www.nipsco.com/energy-efficiency/for-your-home/rebates](https://www.nipsco.com/energy-efficiency/for-your-home/rebates)",
"[https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/available-rebates/applications/nipsco-energy-efficiency-home-rebate-application.pdf](https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/available-rebates/applications/nipsco-energy-efficiency-home-rebate-application.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "delete_bad_edge",
"reason": "General air sealing/weatherization was not verified on current NIPSCO residential rebate page."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Air-source and ductless heat pump rebates are supported."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "ENERGY STAR HPWH rebate is listed."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "Residential boiler rebates are supported where the customer has applicable gas service."
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"action": "delete_bad_edge",
"reason": "Only residential dishwasher support is verified; commercial dishwasher taxonomy is false."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "Residential furnace rebates are supported where applicable."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Residential HVAC and air-conditioning rebates are supported."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "Residential clothes washer and dryer rebates are supported."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Residential refrigerator/freezer appliance rebates are supported, not commercial refrigeration."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Smart thermostat rebate is supported."
},
{
"retrofitTypeId": "window_replacement",
"action": "delete_bad_edge",
"reason": "NIPSCO support is for low-E storm window panes/inserts, not full window replacement."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Measure eligibility depends on whether the customer receives NIPSCO electric service, gas service, or both."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.nipsco.com/energy-efficiency/for-your-home/rebates](https://www.nipsco.com/energy-efficiency/for-your-home/rebates)",
"[https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/available-rebates/applications/nipsco-energy-efficiency-home-rebate-application.pdf](https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/available-rebates/applications/nipsco-energy-efficiency-home-rebate-application.pdf)"
],
"evidenceText": "HPWH and heat pump legacy rules are valid; delete air-sealing, commercial dishwasher, and full-window-replacement edges.",
"reasoningNotes": "Residential dishwasher support should not be mapped to commercial dishwasher retrofit type.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2288",
"opportunityName": "Crow Wing Power - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
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
"formulaText": "Apply Crow Wing Power's current residential rebate amount for the selected qualifying measure. The ECM motor rebate is $25 as an account credit; current materials also identify residential rebates for lighting, HVAC, heat pumps, smart thermostats, geothermal systems, HPWH, appliances, and EV charging, with measure forms needed for exact amounts.",
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
"qualifying residential equipment",
"account-credit eligible measures"
],
"ineligibleCostCategories": [
"battery storage",
"commercial refrigeration",
"commercial laundry equipment"
],
"requiredInputs": [
"measure_type",
"quantity",
"equipment_efficiency",
"load_management_status_for_electric_heating_or_water_heating",
"purchase_or_installation_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"quantity",
"load_management_status",
"current_measure_form_amount"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "crow_wing_power_current_known_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Electronically commutated motor",
"amountCents": 2500,
"unit": "unit"
},
{
"measure": "Ground-source heat pump",
"amountCents": 150000,
"unit": "system"
},
{
"measure": "Lighting, HVAC, heat pump, smart thermostat, HPWH, appliance, EV charger",
"valueModelKind": "measure_catalog_form_lookup_required"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Crow Wing Power current rebate page lists residential lighting, HVAC, heat pump, thermostat, geothermal, HPWH, appliance, EV charging, and ECM motor rebates.",
"sourceUrls": [
"[https://www.cwpower.com/rebates](https://www.cwpower.com/rebates)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "battery_storage_system",
"action": "delete_bad_edge",
"reason": "Battery storage was not verified in the current Crow Wing Power rebate list."
},
{
"retrofitTypeId": "efficient_fan_blower_replacement",
"action": "keep",
"reason": "ECM motor rebate is supported, limited to eligible residential ECM motor products."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Geothermal heat pump rebate is identified."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Heat pump HVAC rebates are listed."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Heat pump water heater rebates are listed."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "Supported only for listed electric boiler or plenum heater measures requiring load management."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Residential air-conditioning and HVAC rebates are listed."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "Residential clothes washer/dryer appliance rebates are supported."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Residential refrigerator/freezer appliance rebates are supported, not commercial refrigeration."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Residential LED lighting rebates are listed."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Smart thermostat rebates are listed."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Credits are issued to the member's Crow Wing Power electric account; some electric heating measures require load management."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.cwpower.com/rebates](https://www.cwpower.com/rebates)"
],
"evidenceText": "The old $25 rule applies to an ECM motor account credit, not refrigeration. Battery storage should be deleted.",
"reasoningNotes": "Exact amount catalog needs current form lookup for measures beyond ECM and published snippets.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3348",
"opportunityName": "Hutchinson Utilities Commission - Residential Energy Efficiency Program",
"repairStatus": "needs_human_review",
"calculationStatus": "needs_repair_review",
"sourceConfidence": "medium",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate",
"unknown"
],
"primaryValueModelKinds": [
"source_inaccessible",
"measure_catalog"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "unknown",
"valueModelKind": "source_inaccessible",
"timing": "unknown",
"formulaText": "Current Bright Energy Solutions/Hutchinson sources identify residential rebate families, but exact official amount tables were not reliably accessible from current source text. Do not use the legacy garbled $900 rule; require current Bright Energy Solutions form lookup for each selected measure.",
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
"qualifying residential products",
"qualifying residential HVAC or heat pump equipment",
"qualifying residential Level 2 EV charger"
],
"ineligibleCostCategories": [
"commercial dishwasher",
"low-flow fixture retrofit not verified",
"commercial/public EV charging"
],
"requiredInputs": [
"measure_type",
"current_Bright_Energy_Solutions_form",
"equipment_quantity",
"equipment_efficiency",
"EV_charger_type"
],
"missingInputsForTypicalRetroFiEstimate": [
"current_official_amount_table",
"measure_type",
"quantity"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "hutchinson_bright_energy_residential_family_unpriced",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Residential HVAC, heat pump, geothermal, HPWH, ENERGY STAR products, EV charger, lighting",
"valueModelKind": "source_inaccessible_form_lookup_required"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "none"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Current official sources identify residential rebate categories but did not provide reliable machine-readable amount tables for this repair.",
"sourceUrls": [
"[https://www.brightenergysolutions.com/members/hutchinson-utilities-commission](https://www.brightenergysolutions.com/members/hutchinson-utilities-commission)",
"[https://www.hutchinsonutilities.com/](https://www.hutchinsonutilities.com/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "Residential EV charger pathway is identified, limited to residential Level 2 charger context."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Residential geothermal heat pump rebate family is identified."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Residential heat pump rebate family is identified."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Residential heat pump water heater rebate family is identified."
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"action": "delete_bad_edge",
"reason": "This is a residential record; commercial dishwasher taxonomy is unsupported."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Residential HVAC rebate family is identified."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "Residential appliance rebate family is identified."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Residential lighting-related forms are identified."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Residential Level 2 EV charger pathway is identified."
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"action": "delete_bad_edge",
"reason": "Low-flow fixture retrofit was not verified from current official residential source text."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Residential thermostat rebate family is identified."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Exact amount rules require current Bright Energy Solutions form review."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.brightenergysolutions.com/members/hutchinson-utilities-commission](https://www.brightenergysolutions.com/members/hutchinson-utilities-commission)",
"[https://www.hutchinsonutilities.com/](https://www.hutchinsonutilities.com/)",
"[https://www.hutchinsonutilities.com/category/latest-news/](https://www.hutchinsonutilities.com/category/latest-news/)"
],
"evidenceText": "The legacy $900 rule is garbled and unsupported. Keep verified residential category edges but require human review for exact amount tables.",
"reasoningNotes": "Do not output an amount estimate until current Bright Energy Solutions measure forms are confirmed.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Current official amount tables were not reliably accessible in source text.",
"Existing simple rule evidence appears to mix unrelated rebate snippets."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2256",
"opportunityName": "Lake Country Power - Residential Energy Efficiency Rebate Program",
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
"fixed_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Apply Lake Country Power's 2026 residential rebate form amount for the selected qualifying measure. The current EV charger form lists up to $500 for a qualifying hardwired Level 2 charger when purchased and metered on Off-Peak Energy Wise; current pages also identify residential heat pumps, ground-source heat pumps, HPWH, appliances, thermostats, lighting, and water-heating rebates.",
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
"qualifying residential equipment",
"hardwired Level 2 EV charger",
"load-managed or off-peak equipment where required"
],
"ineligibleCostCategories": [
"standalone furnace replacement",
"standalone blower replacement",
"commercial refrigeration"
],
"requiredInputs": [
"measure_type",
"quantity",
"equipment_efficiency",
"off_peak_or_Energy_Wise_status",
"hardwired_EV_charger_status",
"purchase_or_installation_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"quantity",
"off_peak_status",
"current_form_amount_for_non_EV_measures"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "lake_country_power_2026_known_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Qualifying hardwired Level 2 EV charger on Off-Peak Energy Wise",
"maxAmountCents": 50000,
"unit": "charger"
},
{
"measure": "Heat pump water heater",
"amountCents": 50000,
"unit": "unit"
},
{
"measure": "Residential heat pump, ground-source heat pump, appliance, thermostat, lighting, water heater",
"valueModelKind": "measure_catalog_form_lookup_required"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Lake Country Power current 2026 materials identify EV charger, heat pump, ground-source heat pump, HPWH, appliance, thermostat, lighting, and water-heating rebate forms.",
"sourceUrls": [
"[https://lakecountrypower.coop/rates-and-rebates](https://lakecountrypower.coop/rates-and-rebates)",
"[https://lakecountrypower.coop/electric-vehicles](https://lakecountrypower.coop/electric-vehicles)",
"[https://lakecountrypower.coop/sites/default/files/2026-02/2026-ev-car-charging-rebate-complete.pdf](https://lakecountrypower.coop/sites/default/files/2026-02/2026-ev-car-charging-rebate-complete.pdf)",
"[https://lakecountrypower.coop/sites/default/files/2026-02/2026-energy-star-appliances-complete.pdf](https://lakecountrypower.coop/sites/default/files/2026-02/2026-energy-star-appliances-complete.pdf)",
"[https://lakecountrypower.coop/sites/default/files/2026-02/2026-ground-source-hp-rebate-complete.pdf](https://lakecountrypower.coop/sites/default/files/2026-02/2026-ground-source-hp-rebate-complete.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "efficient_fan_blower_replacement",
"action": "delete_bad_edge",
"reason": "Standalone efficient fan/blower or ECM replacement was not verified in current 2026 materials."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "Residential EV charger rebate is supported."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Ground-source heat pump rebate form is current."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Residential heat pump rebates are supported."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Heat pump water heater rebate is identified."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "delete_bad_edge",
"reason": "Current furnace rebate was not verified."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Supported only for listed residential cooling or heat pump measures."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Residential refrigerator/freezer appliance rebate is supported, not commercial refrigeration."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Residential LED lighting rebate form is identified."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Hardwired Level 2 EV charger rebate is supported."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Residential thermostat rebates are supported."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "EV charger rebate requires off-peak Energy Wise metering; many forms require applications within 90 days."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "within 90 days where form requires",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://lakecountrypower.coop/rates-and-rebates](https://lakecountrypower.coop/rates-and-rebates)",
"[https://lakecountrypower.coop/electric-vehicles](https://lakecountrypower.coop/electric-vehicles)",
"[https://lakecountrypower.coop/sites/default/files/2026-02/2026-ev-car-charging-rebate-complete.pdf](https://lakecountrypower.coop/sites/default/files/2026-02/2026-ev-car-charging-rebate-complete.pdf)",
"[https://lakecountrypower.coop/sites/default/files/2026-02/2026-energy-star-appliances-complete.pdf](https://lakecountrypower.coop/sites/default/files/2026-02/2026-energy-star-appliances-complete.pdf)",
"[https://lakecountrypower.coop/sites/default/files/2026-02/2026-ground-source-hp-rebate-complete.pdf](https://lakecountrypower.coop/sites/default/files/2026-02/2026-ground-source-hp-rebate-complete.pdf)"
],
"evidenceText": "The Level 2 EV charger rule is valid. Delete unsupported furnace and blower edges; residential appliance support is not commercial refrigeration.",
"reasoningNotes": "Use Lake Country's current PDF forms for exact non-EV amounts at calculation time.",
"humanReviewRequired": false,
"humanReviewReasons": []
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:1941"
}

