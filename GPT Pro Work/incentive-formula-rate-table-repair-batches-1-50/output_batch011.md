{
"schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
"researchedAt": "2026-07-02",
"source": "gpt_pro",
"batchNumber": 11,
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1715",
"opportunityName": "IID Energy - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "rate_table"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Select the IID residential measure. Fixed rows pay the listed amount per eligible unit; HVAC and envelope rows use the listed per-ton or per-square-foot rate.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 5000,
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
"requiredInputs": ["measure_type", "unit_count", "tons", "square_feet", "hvac_tier", "equipment_efficiency", "installation_date"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "unit_count", "tons_or_square_feet_when_applicable", "equipment_tier_or_efficiency"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "iid_2026_residential_rebates",
"selectionInput": "measure_type",
"rows": [
{"measure": "ENERGY STAR refrigerator", "amountCents": 7500, "unit": "unit", "maxUnits": 1},
{"measure": "ENERGY STAR clothes washer", "amountCents": 7500, "unit": "unit", "maxUnits": 1},
{"measure": "ENERGY STAR electric clothes dryer", "amountCents": 7500, "unit": "unit", "maxUnits": 1},
{"measure": "ENERGY STAR thermostat", "amountCents": 5000, "unit": "unit", "maxUnits": 2},
{"measure": "ductless mini-split system", "amountCents": 20000, "unit": "system"},
{"measure": "HVAC gas-to-electric heat pump conversion", "rateCents": 40000, "rateUnit": "per_ton", "maxUnits": 5},
{"measure": "HVAC system Tier 1", "rateCents": 12500, "rateUnit": "per_ton"},
{"measure": "HVAC system Tier 2", "rateCents": 20000, "rateUnit": "per_ton"},
{"measure": "HVAC system Tier 3", "rateCents": 30000, "rateUnit": "per_ton"},
{"measure": "attic insulation", "rateCents": 30, "rateUnit": "per_square_foot"},
{"measure": "radiant barrier", "rateCents": 30, "rateUnit": "per_square_foot"},
{"measure": "dual-pane windows", "rateCents": 200, "rateUnit": "per_square_foot"},
{"measure": "room air conditioner", "amountCents": 10000, "unit": "unit"},
{"measure": "evaporative cooler", "amountCents": 30000, "unit": "unit"},
{"measure": "variable-speed pool pump", "amountCents": 20000, "unit": "unit"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "IID's 2026 residential page lists fixed appliance, thermostat and mini-split rebates plus per-ton HVAC and per-square-foot envelope rates.",
"sourceUrls": ["[https://www.iid.com/customer-service/save-energy-and-money/your-home/residential-rebates](https://www.iid.com/customer-service/save-energy-and-money/your-home/residential-rebates)"]
}
],
"edgeActions": [
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "IID supports ductless mini-splits and gas-to-electric heat-pump HVAC conversions with published rates."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "IID publishes HVAC replacement tier rates and cooling equipment rebates."},
{"retrofitTypeId": "high_efficiency_laundry_equipment", "action": "keep", "reason": "Source-backed only for residential ENERGY STAR clothes washers and electric dryers."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "keep", "reason": "Source-backed only for residential ENERGY STAR refrigerators, not commercial refrigeration."},
{"retrofitTypeId": "insulation_upgrade", "action": "keep", "reason": "IID publishes attic insulation and radiant-barrier per-square-foot rates."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "IID publishes an ENERGY STAR thermostat rebate with a two-unit limit."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Program terms may restrict combining with other IID offers; no source-backed federal tax credit stacking restriction found."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "2026-12-31",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.iid.com/customer-service/save-energy-and-money/your-home/residential-rebates](https://www.iid.com/customer-service/save-energy-and-money/your-home/residential-rebates)",
"[https://programs.dsireusa.org/system/program/detail/1715/iid-energy-residential-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/1715/iid-energy-residential-energy-efficiency-rebate-program)"
],
"evidenceText": "IID publishes a 2026 residential rebate catalog with fixed unit rebates, HVAC per-ton rebates, and envelope per-square-foot rebates.",
"reasoningNotes": "Input target data supplied in uploaded batch file:  Legacy single $400/unit IID rule was expanded into the current multi-measure catalog.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1916",
"opportunityName": "SMUD - Residential Energy Efficiency Rebate Program",
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
"timing": "point_of_sale",
"formulaText": "Use the SMUD residential catalog. Instant appliance and thermostat rows pay fixed amounts; heat-pump HVAC and HPWH rows are caps, not guaranteed amounts.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 5000,
"maxAmountCents": 400000,
"caps": {
"maxAwardCents": 400000,
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
"requiredInputs": ["measure_type", "unit_count", "conversion_type", "equipment_tier", "contractor_network_status", "eligible_project_cost"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "unit_count", "conversion_type_or_equipment_tier", "eligible_project_cost_for_up_to_rows"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "smud_2026_residential_rebates",
"selectionInput": "measure_type",
"rows": [
{"measure": "heat pump HVAC replacement", "maxAmountCents": 300000, "unit": "system"},
{"measure": "heat pump water heater", "maxAmountCents": 400000, "unit": "unit"},
{"measure": "ENERGY STAR clothes washer", "amountCents": 10000, "unit": "unit"},
{"measure": "ENERGY STAR refrigerator", "amountCents": 5000, "unit": "unit"},
{"measure": "smart thermostat", "amountCents": 5000, "unit": "unit"},
{"measure": "electric-to-induction cooktop or range", "amountCents": 10000, "unit": "unit"},
{"measure": "gas-to-induction cooktop or range", "amountCents": 75000, "unit": "unit"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "SMUD lists instant appliance and thermostat rebates plus contractor-submitted heat pump HVAC and water-heater rebates up to published caps.",
"sourceUrls": [
"[https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home](https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home)",
"[https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home/Home-Appliances-and-Electronics-Rebates](https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home/Home-Appliances-and-Electronics-Rebates)",
"[https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home/Heating-and-Cooling-Rebates](https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home/Heating-and-Cooling-Rebates)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "SMUD supports qualifying residential heat pump HVAC systems up to the published cap."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "SMUD supports qualifying residential heat pump water heaters up to the published cap."},
{"retrofitTypeId": "high_efficiency_laundry_equipment", "action": "keep", "reason": "Source-backed only for residential ENERGY STAR clothes washers at participating retailers."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "keep", "reason": "Source-backed only for residential ENERGY STAR refrigerators, not commercial refrigeration."},
{"retrofitTypeId": "induction_cooking_equipment", "action": "needs_review", "reason": "SMUD supports residential induction cooktops/ranges; the target category is commercial kitchen equipment and should be remapped."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "SMUD publishes a fixed instant smart thermostat rebate."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "SMUD up-to amounts should be modeled as caps; contractor-network submissions are required for major heat-pump measures."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home](https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home)",
"[https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home/Home-Appliances-and-Electronics-Rebates](https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home/Home-Appliances-and-Electronics-Rebates)",
"[https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home/Heating-and-Cooling-Rebates](https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home/Heating-and-Cooling-Rebates)",
"[https://www.smud.org/Rebates-and-Savings-Tips/Improve-Home-Efficiency](https://www.smud.org/Rebates-and-Savings-Tips/Improve-Home-Efficiency)",
"[https://programs.dsireusa.org/system/program/detail/1916/smud-residential-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/1916/smud-residential-energy-efficiency-rebate-program)"
],
"evidenceText": "SMUD publishes residential fixed instant rebates and capped contractor-installed heat-pump HVAC and HPWH rebates.",
"reasoningNotes": "Induction is real but the current retrofit type is commercially scoped; keep only if RetroFi has a residential induction retrofit type.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2264",
"opportunityName": "Coweta-Fayette EMC - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "fixed_amount"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Pay the fixed SmartChoice Existing Home rebate amount for the selected eligible residential measure purchased within the program lookback period.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 5000,
"maxAmountCents": 25000,
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
"requiredInputs": ["measure_type", "unit_count", "purchase_date", "equipment_approval", "member_account"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "unit_count"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "coweta_fayette_smartchoice_existing_home",
"selectionInput": "measure_type",
"rows": [
{"measure": "programmable thermostat", "amountCents": 5000, "unit": "unit"},
{"measure": "Level 2 EV charging station", "amountCents": 10000, "unit": "charger"},
{"measure": "heat pump or air-conditioner replacement", "amountCents": 10000, "unit": "system"},
{"measure": "heat pump water heater", "amountCents": 25000, "unit": "unit"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Coweta-Fayette's SmartChoice Existing Home list gives fixed amounts for programmable thermostats, Level 2 EV chargers, HVAC replacement and HPWHs.",
"sourceUrls": ["[https://utility.org/smart-choice-home/](https://utility.org/smart-choice-home/)"]
}
],
"edgeActions": [
{"retrofitTypeId": "ev_charger_installation", "action": "delete_bad_edge", "reason": "The verified rebate is only for Level 2 240-volt NRTL/UL EV charging stations, not generic EV charging."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "The SmartChoice table supports heat pump replacement."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "The SmartChoice table supports heat pump water heaters."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "The SmartChoice table supports heat pump or air-conditioner replacement."},
{"retrofitTypeId": "level_2_ev_charger_installation", "action": "keep", "reason": "The source specifically supports Level 2 charging stations."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "The source supports programmable thermostats."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "No source-backed stacking restriction found; purchases must generally be within the last 12 months."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://utility.org/smart-choice-home/](https://utility.org/smart-choice-home/)",
"[https://programs.dsireusa.org/system/program/detail/2264/coweta-fayette-emc-residential-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/2264/coweta-fayette-emc-residential-energy-efficiency-rebate-program)"
],
"evidenceText": "Coweta-Fayette publishes fixed residential SmartChoice Existing Home rebates for thermostats, Level 2 chargers, HVAC replacement and HPWHs.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5707",
"opportunityName": "TVA - Residential Energy Efficiency Rebate Program",
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
"timing": "post_installation_reimbursement",
"formulaText": "TVA pays the fixed residential rebate for the selected measure after installation by a Quality Contractor Network contractor and customer redemption.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 5000,
"maxAmountCents": 150000,
"caps": {
"maxAwardCents": 150000,
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
"requiredInputs": ["measure_type", "equipment_efficiency_tier", "unit_count", "qcn_contractor_status", "local_power_company"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "equipment_efficiency_tier"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "tva_energyright_residential_rebates",
"selectionInput": "measure_type",
"rows": [
{"measure": "air-source or dual-fuel heat pump 15.0-16.99 SEER2", "amountCents": 50000, "unit": "system"},
{"measure": "air-source or dual-fuel heat pump 17.0+ SEER2", "amountCents": 80000, "unit": "system"},
{"measure": "geothermal heat pump", "amountCents": 150000, "unit": "system"},
{"measure": "duct sealing, duct insulation, repair or replacement", "amountCents": 30000, "unit": "project"},
{"measure": "envelope air sealing", "amountCents": 30000, "unit": "project"},
{"measure": "attic insulation", "amountCents": 50000, "unit": "project"},
{"measure": "wall insulation", "amountCents": 30000, "unit": "project"},
{"measure": "HVAC tune-up for existing heat pump or central AC", "amountCents": 5000, "unit": "system"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "TVA EnergyRight publishes fixed residential rebates for heat pumps, geothermal systems, duct work, air sealing, insulation and tune-ups.",
"sourceUrls": [
"[https://energyright.com/residential/rebates/](https://energyright.com/residential/rebates/)",
"[https://energyright.com/residential/rebates/geothermal-heat-pump/](https://energyright.com/residential/rebates/geothermal-heat-pump/)",
"[https://energyright.com/residential/rebates/heat-pump/](https://energyright.com/residential/rebates/heat-pump/)",
"[https://energyright.com/residential/rebates/home-insulation-air-sealing/](https://energyright.com/residential/rebates/home-insulation-air-sealing/)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "air_sealing_weatherization", "action": "keep", "reason": "TVA publishes an envelope air-sealing rebate."},
{"retrofitTypeId": "duct_sealing_and_insulation", "action": "keep", "reason": "TVA publishes duct sealing, insulation, repair and replacement rebates."},
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "keep", "reason": "TVA publishes a geothermal heat pump rebate."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "TVA publishes tiered air-source and dual-fuel heat pump rebates."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "TVA supports eligible heat-pump and central-AC related HVAC measures through EnergyRight."},
{"retrofitTypeId": "insulation_upgrade", "action": "keep", "reason": "TVA publishes attic and wall insulation rebates."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Contractor submits rebate to TVA and customer claims a redemption code; do not treat as statewide Georgia availability."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://energyright.com/residential/rebates/](https://energyright.com/residential/rebates/)",
"[https://energyright.com/residential/rebates/geothermal-heat-pump/](https://energyright.com/residential/rebates/geothermal-heat-pump/)",
"[https://energyright.com/residential/rebates/heat-pump/](https://energyright.com/residential/rebates/heat-pump/)",
"[https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/](https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/)",
"[https://energyright.com/residential/rebates/home-insulation-air-sealing/](https://energyright.com/residential/rebates/home-insulation-air-sealing/)",
"[https://programs.dsireusa.org/system/program/detail/5707/tva-residential-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/5707/tva-residential-energy-efficiency-rebate-program)"
],
"evidenceText": "TVA's EnergyRight pages publish fixed residential rebates through participating local power companies and QCN contractors.",
"reasoningNotes": "Georgia record is not statewide; it applies only in participating TVA-served local power company territories.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1368",
"opportunityName": "Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "fixed_tier_amount"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "point_of_sale",
"formulaText": "Use Hawaii Energy's residential catalog. HPWH and refrigerator rows pay fixed amounts; mini-split VRF AC is an up-to cap depending on qualifying equipment and contractor path.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 7500,
"maxAmountCents": 70000,
"caps": {
"maxAwardCents": 70000,
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
"requiredInputs": ["measure_type", "unit_count", "island", "equipment_size_gallons", "trade_in_or_recycling_status", "contractor_status"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "unit_count", "equipment_size_or_trade_in_status"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "hawaii_energy_residential_rebates",
"selectionInput": "measure_type",
"rows": [
{"measure": "mini-split VRF air conditioner", "maxAmountCents": 55000, "unit": "unit"},
{"measure": "heat pump water heater 40-54 gallons", "amountCents": 50000, "unit": "unit"},
{"measure": "heat pump water heater 55-82 gallons", "amountCents": 70000, "unit": "unit"},
{"measure": "ENERGY STAR refrigerator trade-up", "amountCents": 25000, "unit": "unit"},
{"measure": "Rid-A-Fridge refrigerator/freezer recycling", "amountCents": 7500, "unit": "unit"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Hawaii Energy lists HPWH instant rebates, mini-split VRF AC rebates, refrigerator trade-up and Rid-A-Fridge recycling incentives.",
"sourceUrls": [
"[https://hawaiienergy.com/for-homes/rebates/](https://hawaiienergy.com/for-homes/rebates/)",
"[https://hawaiienergy.com/for-homes/rebates/appliances/](https://hawaiienergy.com/for-homes/rebates/appliances/)",
"[https://hawaiienergy.com/for-homes/rebates/hvac/](https://hawaiienergy.com/for-homes/rebates/hvac/)",
"[https://hawaiienergy.com/for-homes/rebates/water-heating/](https://hawaiienergy.com/for-homes/rebates/water-heating/)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "delete_bad_edge", "reason": "The residential cooling page supports mini-split/VRF air-conditioning rebates, not a source-backed space-heating heat-pump retrofit edge."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "Hawaii Energy publishes heat pump water heater rebate tiers."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Source-backed for eligible residential cooling equipment such as mini-split VRF AC."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "keep", "reason": "Source-backed only for residential refrigerator trade-up or refrigerator/freezer recycling."},
{"retrofitTypeId": "variable_frequency_drive_retrofit", "action": "delete_bad_edge", "reason": "VFDs are not supported by the current residential rebate pages."},
{"retrofitTypeId": "window_replacement", "action": "delete_bad_edge", "reason": "The verified residential measure is window air conditioning, not window replacement."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Hawaii Energy HPWH rebate cannot be combined with other Hawaii Energy rebates or offers for the same measure where specified."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://hawaiienergy.com/for-homes/rebates/](https://hawaiienergy.com/for-homes/rebates/)",
"[https://hawaiienergy.com/for-homes/rebates/appliances/](https://hawaiienergy.com/for-homes/rebates/appliances/)",
"[https://hawaiienergy.com/for-homes/rebates/hvac/](https://hawaiienergy.com/for-homes/rebates/hvac/)",
"[https://hawaiienergy.com/for-homes/rebates/water-heating/](https://hawaiienergy.com/for-homes/rebates/water-heating/)",
"[https://programs.dsireusa.org/system/program/detail/1368/residential-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/1368/residential-energy-efficiency-rebate-program)"
],
"evidenceText": "Hawaii Energy residential rebates include HPWHs, mini-split VRF AC, refrigerator trade-up and refrigerator/freezer recycling, with island exclusions.",
"reasoningNotes": "Kauai is excluded. Mini-split AC is a cooling measure and should not be treated as generic heat-pump space heating.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22485",
"opportunityName": "Linn County Rural Electric Cooperative - Commercial (>75KW) Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "hybrid_rate_plus_cap", "rate_table"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "For prescriptive Corridor measures, apply the published unit, horsepower or ton rate, subject to per-measure caps and any 50% installed-cost limit.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 4000000,
"caps": {
"maxAwardCents": 4000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.5,
"maxUnits": 4,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["equipment", "installation_labor", "eligible_incremental_cost"],
"ineligibleCostCategories": [],
"requiredInputs": ["measure_type", "unit_count", "tons", "horsepower", "installed_cost", "summer_winter_demand_threshold", "rate_class", "preapproval_status"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "unit_count_or_tons_or_horsepower", "installed_cost", "rate_class"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "corridor_2026_large_commercial_prescriptive",
"selectionInput": "measure_type",
"rows": [
{"measure": "Level II EV charger", "amountCents": 100000, "unit": "charger", "maxUnits": 4, "maxPercentOfEligibleCost": 0.5},
{"measure": "Level II forklift charger", "amountCents": 100000, "unit": "charger", "maxUnits": 4, "maxPercentOfEligibleCost": 0.5},
{"measure": "VFD on eligible fan or pump", "rateCents": 3500, "rateUnit": "per_horsepower"},
{"measure": "closed-loop ground-source heat pump first 40 tons", "rateCents": 40000, "rateUnit": "per_ton", "maxAwardCents": 4000000},
{"measure": "closed-loop ground-source heat pump remaining tons", "rateCents": 17500, "rateUnit": "per_ton", "maxAwardCents": 4000000},
{"measure": "air-source heat pump first 40 tons", "rateCents": 30000, "rateUnit": "per_ton", "maxAwardCents": 4000000},
{"measure": "air-source heat pump remaining tons", "rateCents": 12500, "rateUnit": "per_ton", "maxAwardCents": 4000000}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Corridor publishes large-account EV, forklift charger, VFD, air-source heat-pump and ground-source heat-pump commercial incentive formulas.",
"sourceUrls": [
"[https://corridorenergy.coop/rebates/commercial-custom/](https://corridorenergy.coop/rebates/commercial-custom/)",
"[https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-Heat-Pumps.pdf](https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-Heat-Pumps.pdf)",
"[https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-VFD.pdf](https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-VFD.pdf)",
"[https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-EV-Charger.pdf](https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-EV-Charger.pdf)"
]
},
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "Custom demand-reduction projects receive $100 per summer coincident kW saved plus $100 per winter coincident kW saved, capped at $50,000 per service location per calendar year.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 5000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": 5000000,
"annualCapCents": 5000000,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": ["summer_coincident_kw_saved", "winter_coincident_kw_saved", "service_location", "eligible_rate_class", "preapproval_status"],
"missingInputsForTypicalRetroFiEstimate": ["summer_coincident_kw_saved", "winter_coincident_kw_saved"],
"rateTable": {
"tableId": "corridor_custom_demand_reduction",
"dimensions": ["season", "coincident_kw_saved"],
"rows": [
{"season": "summer_peak", "rateCents": 10000, "rateUnit": "per_coincident_kw_saved"},
{"season": "winter_peak", "rateCents": 10000, "rateUnit": "per_coincident_kw_saved"}
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
"evidenceText": "Corridor's custom pathway pays separate summer and winter coincident demand-reduction rates with preapproval and an annual site cap.",
"sourceUrls": ["[https://corridorenergy.coop/rebates/commercial-custom/](https://corridorenergy.coop/rebates/commercial-custom/)"]
}
],
"edgeActions": [
{"retrofitTypeId": "ev_charger_installation", "action": "delete_bad_edge", "reason": "The verified rebate is specifically for Level II EV or forklift chargers, not generic EV charging."},
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "keep", "reason": "Corridor publishes a closed-loop ground-source heat-pump per-ton incentive."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "Corridor publishes commercial air-source heat-pump and VRF incentives."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Keep only when the HVAC replacement is a qualifying heat pump or VRF measure."},
{"retrofitTypeId": "level_2_ev_charger_installation", "action": "keep", "reason": "Corridor publishes Level II EV charger and Level II forklift charger rebates."},
{"retrofitTypeId": "variable_frequency_drive_retrofit", "action": "keep", "reason": "Corridor publishes a VFD per-horsepower incentive for eligible fans and pumps."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebates cannot exceed specified installed-cost caps for charger measures; preapproval is required for custom projects and large expected heat-pump incentives."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://corridorenergy.coop/rebates/commercial-custom/](https://corridorenergy.coop/rebates/commercial-custom/)",
"[https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-Heat-Pumps.pdf](https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-Heat-Pumps.pdf)",
"[https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-Rebate-Flyer.pdf](https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-Rebate-Flyer.pdf)",
"[https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-VFD.pdf](https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-VFD.pdf)",
"[https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-EV-Charger.pdf](https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-EV-Charger.pdf)",
"[https://programs.dsireusa.org/system/program/detail/22485/linn-county-rural-electric-cooperative-commercial-75kw-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/22485/linn-county-rural-electric-cooperative-commercial-75kw-energy-efficiency-rebate-program)"
],
"evidenceText": "Corridor's large commercial program has published EV, VFD, heat-pump and custom demand-reduction formulas for eligible large accounts.",
"reasoningNotes": "Linn County REC now uses Corridor Energy branding; this repair keeps the large-account demand threshold.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4128",
"opportunityName": "Nicor Gas - Residential Energy Efficiency Rebates",
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
"timing": "post_installation_reimbursement",
"formulaText": "Apply the Nicor Gas residential fixed rebate for the selected natural-gas equipment or approved weatherization measure; window rows also have per-home caps.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 2500,
"maxAmountCents": 60000,
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
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": ["measure_type", "unit_count", "equipment_efficiency", "contractor_approved", "installation_date", "nicor_account_status"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "unit_count", "equipment_efficiency"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "nicor_2026_residential_rebates",
"selectionInput": "measure_type",
"rows": [
{"measure": "smart thermostat", "amountCents": 2500, "unit": "unit", "maxUnits": 1},
{"measure": "natural gas furnace 95%+ AFUE", "amountCents": 15000, "unit": "unit"},
{"measure": "natural gas furnace 97%+ AFUE", "amountCents": 22500, "unit": "unit"},
{"measure": "natural gas boiler 95%+ AFUE", "amountCents": 35000, "unit": "unit"},
{"measure": "combination boiler/water heater", "amountCents": 50000, "unit": "unit"},
{"measure": "tankless natural gas water heater", "amountCents": 15000, "unit": "unit"},
{"measure": "storage natural gas water heater", "amountCents": 15000, "unit": "unit"},
{"measure": "air sealing", "amountCents": 50000, "unit": "home"},
{"measure": "attic insulation", "amountCents": 40000, "unit": "home"},
{"measure": "exterior wall insulation", "amountCents": 15000, "unit": "home"},
{"measure": "foundation sidewall insulation", "amountCents": 20000, "unit": "home"},
{"measure": "duct sealing", "amountCents": 60000, "unit": "home"},
{"measure": "low-e storm window inserts", "amountCents": 10000, "unit": "window", "maxAwardCents": 100000},
{"measure": "high-performance windows", "minAmountCents": 10000, "maxAmountCents": 12500, "unit": "window", "maxAwardCents": 300000}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Nicor Gas's 2026 residential materials list fixed smart thermostat, gas HVAC, water-heating, duct-sealing, insulation and window-measure rebates.",
"sourceUrls": [
"[https://www.nicorgas.com/ways-to-save/residential-savings/rebates.html](https://www.nicorgas.com/ways-to-save/residential-savings/rebates.html)",
"[https://www.nicorgas.com/ways-to-save/residential-savings/rebates/air-sealing-and-insulation-rebates.html](https://www.nicorgas.com/ways-to-save/residential-savings/rebates/air-sealing-and-insulation-rebates.html)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "air_sealing_weatherization", "action": "keep", "reason": "Nicor publishes an approved-contractor residential air sealing rebate."},
{"retrofitTypeId": "duct_sealing_and_insulation", "action": "keep", "reason": "Nicor publishes duct sealing and insulation/weatherization rebates."},
{"retrofitTypeId": "high_efficiency_boiler_retrofit", "action": "keep", "reason": "Nicor publishes residential high-efficiency natural gas boiler rebates."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Keep only for qualifying natural gas furnaces, boilers or listed residential gas HVAC equipment."},
{"retrofitTypeId": "insulation_upgrade", "action": "keep", "reason": "Nicor publishes attic, wall and foundation insulation rebates."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "Nicor publishes a fixed smart thermostat rebate for eligible natural gas heating systems."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Weatherization must use approved contractors. No source-backed federal tax credit stacking restriction found."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "2027-01-31",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.nicorgas.com/ways-to-save/residential-savings/rebates.html](https://www.nicorgas.com/ways-to-save/residential-savings/rebates.html)",
"[https://www.nicorgas.com/content/dam/southern-co-gas/nicor-gas/docs/energy-efficiency/residential/20251218-heer-residential-fact-sheet.pdf](https://www.nicorgas.com/content/dam/southern-co-gas/nicor-gas/docs/energy-efficiency/residential/20251218-heer-residential-fact-sheet.pdf)",
"[https://www.nicorgas.com/ways-to-save/residential-savings/rebates/air-sealing-and-insulation-rebates.html](https://www.nicorgas.com/ways-to-save/residential-savings/rebates/air-sealing-and-insulation-rebates.html)",
"[https://programs.dsireusa.org/system/program/detail/4128/nicor-gas-residential-energy-efficiency-rebates](https://programs.dsireusa.org/system/program/detail/4128/nicor-gas-residential-energy-efficiency-rebates)"
],
"evidenceText": "Nicor's current residential rebate page and fact sheet publish fixed gas equipment and weatherization rebate values.",
"reasoningNotes": "Old DSIRE-linked Nicor URL is stale; this repair uses current Nicor residential savings URLs.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5727",
"opportunityName": "NIPSCO (Gas & Electric) - Commercial & Industrial Energy Efficiency Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "rate_table"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use the NIPSCO business prescriptive list. Fixed rows pay per unit or trap; rate rows multiply by MBH, horsepower or the listed unit count.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 800,
"maxAmountCents": 18000,
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
"requiredInputs": ["measure_type", "unit_count", "MBH", "horsepower", "lamp_count", "rate_class", "preapproval_required"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "unit_count_or_size"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "nipsco_2026_business_prescriptive",
"selectionInput": "measure_type",
"rows": [
{"measure": "commercial heating steam trap replacement", "amountCents": 7000, "unit": "trap"},
{"measure": "industrial steam trap replacement", "amountCents": 18000, "unit": "trap"},
{"measure": "hot-water boiler under 300 MBH, 96%+ AFUE", "rateCents": 165, "rateUnit": "per_MBH"},
{"measure": "hot-water boiler 300-2500 MBH, 92%+ thermal efficiency", "rateCents": 165, "rateUnit": "per_MBH"},
{"measure": "steam boiler under 300 MBH, 92%+ AFUE", "rateCents": 165, "rateUnit": "per_MBH"},
{"measure": "steam boiler 300-2500 MBH, 92%+ thermal efficiency", "rateCents": 165, "rateUnit": "per_MBH"},
{"measure": "boiler hot-water lockout/reset control", "rateCents": 200, "rateUnit": "per_MBH"},
{"measure": "natural gas furnace 93%+ AFUE", "rateCents": 45, "rateUnit": "per_MBH"},
{"measure": "smart thermostat, heat pump", "amountCents": 4000, "unit": "unit"},
{"measure": "smart thermostat, gas heat only", "amountCents": 6500, "unit": "unit"},
{"measure": "LED refrigerated display case lamp", "amountCents": 800, "unit": "4-foot lamp"},
{"measure": "LED freezer display case lamp", "amountCents": 1100, "unit": "4-foot lamp"},
{"measure": "evaporator fan control", "amountCents": 11500, "unit": "controller"},
{"measure": "ECM cooler motor", "amountCents": 12500, "unit": "motor"},
{"measure": "ECM freezer motor", "amountCents": 14500, "unit": "motor"},
{"measure": "VSD HVAC pump", "rateCents": 8500, "rateUnit": "per_horsepower"},
{"measure": "VSD supply or return fan", "rateCents": 10000, "rateUnit": "per_horsepower"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "NIPSCO's 2026 prescriptive list includes boiler, controls, furnace, steam-trap, refrigeration, lighting and VSD measures.",
"sourceUrls": [
"[https://www.nipsco.com/energy-efficiency/for-your-business](https://www.nipsco.com/energy-efficiency/for-your-business)",
"[https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/prescriptive-incentive-program/prescriptive-incentive-list.pdf](https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/prescriptive-incentive-program/prescriptive-incentive-list.pdf)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "boiler_controls_burner_retrofit", "action": "keep", "reason": "Keep only for listed boiler controls such as hot-water lockout/reset controls, not unsupported standalone burner retrofits."},
{"retrofitTypeId": "high_efficiency_boiler_retrofit", "action": "keep", "reason": "NIPSCO publishes hot-water and steam boiler incentive rates."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Keep only for listed business HVAC measures such as qualifying furnaces, boilers, thermostats and VSDs."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "keep", "reason": "NIPSCO publishes commercial refrigeration measure incentives."},
{"retrofitTypeId": "led_lighting_retrofit", "action": "keep", "reason": "NIPSCO business materials support eligible lighting measures, including refrigerated case LEDs."},
{"retrofitTypeId": "steam_trap_replacement", "action": "keep", "reason": "NIPSCO publishes commercial heating and industrial steam trap replacement rebates."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Prescriptive incentives over program thresholds and all custom incentives may require preapproval."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.nipsco.com/energy-efficiency/for-your-business](https://www.nipsco.com/energy-efficiency/for-your-business)",
"[https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/prescriptive-incentive-program/prescriptive-incentive-list.pdf](https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/prescriptive-incentive-program/prescriptive-incentive-list.pdf)",
"[https://www.nipsco.com/energy-efficiency/for-your-business/custom-incentive-program](https://www.nipsco.com/energy-efficiency/for-your-business/custom-incentive-program)",
"[https://programs.dsireusa.org/system/program/detail/5727/nipsco-gas-and-electric-commercial-and-industrial-energy-efficiency-program](https://programs.dsireusa.org/system/program/detail/5727/nipsco-gas-and-electric-commercial-and-industrial-energy-efficiency-program)"
],
"evidenceText": "NIPSCO's current business program has a detailed prescriptive list for gas, electric, lighting, refrigeration and steam measures.",
"reasoningNotes": "Steam traps are commercial heating/industrial steam measures, not compressed-air retrofits.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5819",
"opportunityName": "Washington Gas - Residential Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate", "process_value", "non_cash"],
"primaryValueModelKinds": ["measure_catalog", "non_cash_process_value"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Apply the fixed Maryland residential gas-equipment rebate for the selected Washington Gas measure; Smart Energy Rewards is excluded because it ended before the research date.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 9000,
"maxAmountCents": 90000,
"caps": {
"maxAwardCents": 90000,
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
"requiredInputs": ["measure_type", "unit_count", "equipment_efficiency", "contractor_network_status", "installation_date"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "unit_count", "equipment_efficiency"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "washington_gas_md_residential_rebates",
"selectionInput": "measure_type",
"rows": [
{"measure": "natural gas furnace 95.1%+ AFUE", "amountCents": 50000, "unit": "unit"},
{"measure": "natural gas furnace 97%+ AFUE", "amountCents": 70000, "unit": "unit"},
{"measure": "natural gas boiler 90%+ AFUE", "amountCents": 47500, "unit": "unit"},
{"measure": "natural gas boiler 95%+ AFUE", "amountCents": 77500, "unit": "unit"},
{"measure": "combination heating unit", "amountCents": 90000, "unit": "unit"},
{"measure": "furnace or boiler tune-up", "amountCents": 10000, "unit": "system"},
{"measure": "storage water heater", "amountCents": 17500, "unit": "unit"},
{"measure": "tankless water heater", "amountCents": 45000, "unit": "unit"},
{"measure": "ENERGY STAR gas dryer", "amountCents": 9000, "unit": "unit"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Washington Gas Maryland pages publish fixed rebates for gas furnaces, boilers, water heaters, tune-ups and clothes dryers.",
"sourceUrls": [
"[https://wgsmartsavings.com/programs-rebates/home/md](https://wgsmartsavings.com/programs-rebates/home/md)",
"[https://wgsmartsavings.com/programs-rebates/md/home-heating](https://wgsmartsavings.com/programs-rebates/md/home-heating)",
"[https://wgsmartsavings.com/programs-rebates/md/water-heaters](https://wgsmartsavings.com/programs-rebates/md/water-heaters)",
"[https://wghomesavings.com/](https://wghomesavings.com/)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "process_value",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Income-qualified weatherization is delivered as no-additional-cost upgrades through the Maryland DHCD/Community Action pathway; no generic user cash value is calculable.",
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
"requiredInputs": ["income_qualification", "property_type", "dhcd_or_community_action_approval", "audit_results"],
"missingInputsForTypicalRetroFiEstimate": ["income_qualification", "program_approval"],
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
"probabilityRequired": true,
"probabilityDiscount": null,
"probabilityEvidenceType": "eligibility_only"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "The Maryland income-qualified pathway offers energy-saving upgrades at no additional cost, based on program qualification and audit results.",
"sourceUrls": ["[https://wgsmartsavings.com/programs-rebates/md/income-qualifying-energy-efficiency-program](https://wgsmartsavings.com/programs-rebates/md/income-qualifying-energy-efficiency-program)"]
}
],
"edgeActions": [
{"retrofitTypeId": "automated_demand_response_controls", "action": "delete_bad_edge", "reason": "Smart Energy Rewards ended March 31, 2026 and is not a current retrofit incentive."},
{"retrofitTypeId": "high_efficiency_boiler_retrofit", "action": "keep", "reason": "Washington Gas publishes Maryland natural gas boiler rebate tiers."},
{"retrofitTypeId": "high_efficiency_furnace_retrofit", "action": "keep", "reason": "Washington Gas publishes Maryland natural gas furnace rebate tiers."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Keep only for listed gas furnaces, boilers, combination heating units and tune-ups."},
{"retrofitTypeId": "insulation_upgrade", "action": "move_to_special_workflow", "reason": "Insulation is supported only through income-qualified weatherization at no additional cost, not a simple unrestricted rebate."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "delete_bad_edge", "reason": "The current Maryland smart-thermostat cash path is the ended demand-response offer; the appliance application does not list Maryland smart thermostats."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Contractor-network requirements apply to gas heating measures. Income-qualified weatherization is a separate program workflow."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://wgsmartsavings.com/programs-rebates/home/md](https://wgsmartsavings.com/programs-rebates/home/md)",
"[https://wgsmartsavings.com/programs-rebates/md/home-heating](https://wgsmartsavings.com/programs-rebates/md/home-heating)",
"[https://wgsmartsavings.com/programs-rebates/md/water-heaters](https://wgsmartsavings.com/programs-rebates/md/water-heaters)",
"[https://wgsmartsavings.com/programs-rebates/md/smart-energy-rewards](https://wgsmartsavings.com/programs-rebates/md/smart-energy-rewards)",
"[https://wgsmartsavings.com/programs-rebates/md/income-qualifying-energy-efficiency-program](https://wgsmartsavings.com/programs-rebates/md/income-qualifying-energy-efficiency-program)",
"[https://wghomesavings.com/](https://wghomesavings.com/)",
"[https://programs.dsireusa.org/system/program/detail/5819/washington-gas-residential-rebate-program](https://programs.dsireusa.org/system/program/detail/5819/washington-gas-residential-rebate-program)"
],
"evidenceText": "Washington Gas Maryland publishes gas heating and water-heating rebates; demand response ended and weatherization is income-qualified workflow value.",
"reasoningNotes": "The legacy $50 Maryland smart thermostat rule should not be retained after the March 31, 2026 Smart Energy Rewards end date.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4299",
"opportunityName": "Consumers Energy (Electric) - Commercial Energy Efficiency Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["formula_grant", "custom_quote", "rate_table"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "For custom business electric projects, incentive equals $0.10 per verified annual kWh saved, subject to Consumers Energy business program caps and review.",
"amountCents": null,
"percent": null,
"rate": 0.1,
"rateUnit": "dollars_per_annual_kwh_saved",
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 50000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.35,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": 50000000,
"programBudgetCents": null
},
"eligibleCostCategories": ["incremental_project_cost", "eligible_equipment", "eligible_installation_labor"],
"ineligibleCostCategories": [],
"requiredInputs": ["annual_kwh_saved", "incremental_project_cost", "measure_type", "pre_notification_status", "consumers_business_account"],
"missingInputsForTypicalRetroFiEstimate": ["annual_kwh_saved", "incremental_project_cost", "measure_type"],
"rateTable": {
"tableId": "consumers_energy_business_custom_electric",
"dimensions": ["annual_kwh_saved"],
"rows": [
{"savingsType": "electricity", "rateCents": 10, "rateUnit": "per_annual_kwh_saved"},
{"savingsType": "natural_gas_context_only", "rateDollars": 12, "rateUnit": "per_Mcf_saved"}
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
"evidenceText": "Consumers Energy states custom business electric incentives pay $0.10 per kWh saved, with program cost-offset and annual caps.",
"sourceUrls": [
"[https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts](https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts)",
"[https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts/custom-business-incentives](https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts/custom-business-incentives)",
"[https://consumers-energy.clearesult.com/](https://consumers-energy.clearesult.com/)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "keep", "reason": "Consumers Energy business HVAC pages support ground-loop heat-pump measures."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Consumers Energy business rebates include qualifying HVAC measures."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "keep", "reason": "Consumers Energy business rebates include commercial refrigeration measures."},
{"retrofitTypeId": "insulation_upgrade", "action": "keep", "reason": "Consumers Energy business rebates include building envelope and insulation measures."},
{"retrofitTypeId": "led_lighting_retrofit", "action": "keep", "reason": "Consumers Energy business rebates include lighting measures."},
{"retrofitTypeId": "lighting_controls_retrofit", "action": "keep", "reason": "Consumers Energy business rebates include lighting controls and networked controls."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Business rebates may offset only allowed portions of incremental cost and may require pre-notification before work begins."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts](https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts)",
"[https://consumers-energy.clearesult.com/](https://consumers-energy.clearesult.com/)",
"[https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts/custom-business-incentives](https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts/custom-business-incentives)",
"[https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts/lighting-rebates](https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts/lighting-rebates)",
"[https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts/kitchen-refrigeration-laundry-rebates](https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts/kitchen-refrigeration-laundry-rebates)",
"[https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts/hvac-business-rebates](https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts/hvac-business-rebates)",
"[https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts/envelope-and-insulation-rebates](https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts/envelope-and-insulation-rebates)"
],
"evidenceText": "Consumers Energy business rebates include multiple measure catalogs and a custom electric formula of $0.10 per annual kWh saved.",
"reasoningNotes": "The electric DSIRE record should use the electric custom formula when no prescriptive row is selected.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3406",
"opportunityName": "Connexus Energy - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": ["rebate", "tariff_or_rate"],
"primaryValueModelKinds": ["measure_catalog", "capped_percent_of_eligible_cost", "tariff_or_rate"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use the Connexus residential catalog. BEV charger rebate is 50% of project cost up to $500; other rows pay fixed measure amounts when requirements are met.",
"amountCents": null,
"percent": 0.5,
"rate": null,
"rateUnit": null,
"minAmountCents": 2500,
"maxAmountCents": 100000,
"caps": {
"maxAwardCents": 100000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.5,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["eligible_equipment", "meter_socket", "installation_labor"],
"ineligibleCostCategories": [],
"requiredInputs": ["measure_type", "unit_count", "eligible_project_cost", "equipment_tier", "vehicle_type", "ev_rate_enrollment", "contractor_status"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "unit_count", "eligible_project_cost_or_equipment_tier"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "connexus_2026_residential_rebates",
"selectionInput": "measure_type",
"rows": [
{"measure": "Level 2 BEV charger with EV rate enrollment", "maxAmountCents": 50000, "maxPercentOfEligibleCost": 0.5, "unit": "charger"},
{"measure": "Level 2 PHEV charger with EV rate enrollment", "amountCents": 10000, "unit": "charger"},
{"measure": "ductless mini-split ASHP 17.2 SEER2 / 7.8 HSPF2", "amountCents": 50000, "unit": "system"},
{"measure": "ducted ASHP 15.2 SEER2 / 7.8 HSPF2", "amountCents": 63000, "unit": "system"},
{"measure": "ducted ASHP 17.2 SEER2 / 7.8 HSPF2", "amountCents": 70000, "unit": "system"},
{"measure": "ducted ASHP 19.0 SEER2 / 7.8 HSPF2", "amountCents": 85000, "unit": "system"},
{"measure": "ducted cold-climate ASHP", "amountCents": 100000, "unit": "system"},
{"measure": "heat pump water heater", "amountCents": 10000, "unit": "unit"},
{"measure": "Wi-Fi PowerNap thermostat", "amountCents": 2500, "unit": "thermostat"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Connexus publishes EV charger, ASHP, HPWH and PowerNap thermostat rebate amounts, with BEV charger capped at 50% of project cost.",
"sourceUrls": [
"[https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs](https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs)",
"[https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/heating-and-cooling](https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/heating-and-cooling)",
"[https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/electric-vehicles/electric-vehicle-charger-rebate](https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/electric-vehicles/electric-vehicle-charger-rebate)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "monthly",
"formulaText": "Heat pump and EV programs may require or offer special electric rates; recurring bill savings depend on metered kWh shifted or served on those rates.",
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
"requiredInputs": ["program_rate", "baseline_rate", "monthly_kwh_on_special_rate", "load_shape"],
"missingInputsForTypicalRetroFiEstimate": ["monthly_kwh_on_special_rate", "baseline_rate"],
"rateTable": {
"tableId": "connexus_special_rates",
"dimensions": ["rate_program"],
"rows": [
{"rateProgram": "ASHP reduced-rate reference", "rateDollarsPerKwh": 0.0766, "comparisonRateDollarsPerKwh": 0.129}
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
"evidenceText": "Connexus heating and EV offerings include rate enrollment elements; actual recurring savings require usage on the relevant rate.",
"sourceUrls": [
"[https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/heating-and-cooling](https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/heating-and-cooling)",
"[https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/electric-vehicles/electric-vehicle-charger-rebate](https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/electric-vehicles/electric-vehicle-charger-rebate)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "ev_charger_installation", "action": "delete_bad_edge", "reason": "The verified rebate requires Level 2 equipment and EV rate/metering conditions, so generic EV charger is too broad."},
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "keep", "reason": "Connexus materials identify ground-source heat pumps as a residential program category, though exact current row may require form review."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "Connexus publishes ASHP and ductless mini-split rebate tiers."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "Connexus publishes a fixed heat pump water heater rebate."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Keep only for qualifying ASHP, ductless or related heat-pump measures."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "move_to_special_workflow", "reason": "Thermostat value is tied to PowerNap demand-response enrollment, not generic zoning."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "EV charger rebate requires off-peak metering and EV rate enrollment; PowerNap credits should be modeled separately from the thermostat device rebate."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "2026-12-31",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs](https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs)",
"[https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/heating-and-cooling](https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/heating-and-cooling)",
"[https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/heating-and-cooling/ductless-ashp-rebate](https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/heating-and-cooling/ductless-ashp-rebate)",
"[https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/water-heating](https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/water-heating)",
"[https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/electric-vehicles/electric-vehicle-charger-rebate](https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/electric-vehicles/electric-vehicle-charger-rebate)",
"[https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/heating-and-cooling/wi-fi-powernap-air-conditioning](https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/heating-and-cooling/wi-fi-powernap-air-conditioning)",
"[https://programs.dsireusa.org/system/program/detail/3406/connexus-energy-residential-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/3406/connexus-energy-residential-energy-efficiency-rebate-program)"
],
"evidenceText": "Connexus publishes fixed ASHP, HPWH and thermostat incentives plus a capped Level 2 EV charger rebate and related rate-program requirements.",
"reasoningNotes": "Ground-source heat-pump edge remains source-backed as a category but may need current form details for exact amount.",
"humanReviewRequired": true,
"humanReviewReasons": ["Ground-source heat pump amount was not captured in the static source text and should be verified from the current form before estimating."]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3576",
"opportunityName": "Lake Region Electric Cooperative - Residential Energy Efficiency Rebate Program",
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
"timing": "post_installation_reimbursement",
"formulaText": "Apply the LREC 2026 residential rebate row selected by measure type, equipment size and efficiency tier; rebate cannot exceed purchase plus installation cost.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 10000,
"maxAmountCents": 400000,
"caps": {
"maxAwardCents": 400000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["equipment", "installation_labor"],
"ineligibleCostCategories": [],
"requiredInputs": ["measure_type", "unit_count", "tons", "equipment_efficiency_tier", "purchase_and_install_cost", "rate_program_enrollment"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "unit_count_or_tons", "equipment_efficiency_tier", "purchase_and_install_cost"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "lrec_2026_residential_rebates",
"selectionInput": "measure_type",
"rows": [
{"measure": "Level 2 EV charger", "amountCents": 50000, "unit": "charger", "maxUnits": 1},
{"measure": "ductless ASHP <=1 ton, base efficiency", "amountCents": 15000, "unit": "system"},
{"measure": "ductless ASHP <=1 ton, high efficiency", "amountCents": 25000, "unit": "system"},
{"measure": "ductless ASHP >1 ton, base efficiency", "amountCents": 75000, "unit": "system"},
{"measure": "ductless ASHP >1 ton, high efficiency", "amountCents": 100000, "unit": "system"},
{"measure": "ducted ASHP <=5 tons, base efficiency", "amountCents": 75000, "unit": "system"},
{"measure": "ducted ASHP <=5 tons, high efficiency", "amountCents": 100000, "unit": "system"},
{"measure": "geothermal closed-loop new", "rateCents": 40000, "rateUnit": "per_ton", "maxAmountCents": 400000},
{"measure": "geothermal closed-loop replacement", "rateCents": 20000, "rateUnit": "per_ton"},
{"measure": "quality-install ASHP", "rateCents": 4000, "rateUnit": "per_ton"},
{"measure": "heat pump water heater", "amountCents": 40000, "unit": "unit"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "LREC's 2026 schedule lists Level 2 EV, ASHP, geothermal, HPWH and related residential water-heating rebate amounts.",
"sourceUrls": [
"[https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/](https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/)",
"[https://www.lrec.coop/energy-services/electric-vehicles/](https://www.lrec.coop/energy-services/electric-vehicles/)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "ev_charger_installation", "action": "delete_bad_edge", "reason": "The current verified rebate is for a Level 2 charger, not generic EV charging."},
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "keep", "reason": "LREC publishes closed-loop geothermal new and replacement rates."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "LREC publishes ducted and ductless ASHP rebate tiers."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "LREC publishes a fixed HPWH rebate."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Keep only for qualifying ASHP or geothermal measures."},
{"retrofitTypeId": "level_2_ev_charger_installation", "action": "keep", "reason": "LREC publishes a Level 2 EV charger rebate limited to one per account."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "LREC states rebates are subject to funding and cannot exceed purchase and installation cost."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "2026-12-15",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/](https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/)",
"[https://www.lrec.coop/energy-services/electric-vehicles/](https://www.lrec.coop/energy-services/electric-vehicles/)",
"[https://programs.dsireusa.org/system/program/detail/3576/lake-region-electric-cooperative-residential-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/3576/lake-region-electric-cooperative-residential-energy-efficiency-rebate-program)"
],
"evidenceText": "LREC publishes a 2026 residential rebate schedule with fixed, tiered and per-ton heat-pump, water-heating and EV charger values.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22091",
"opportunityName": "Minnesota Energy Resources (Gas) - New Construction Rebates",
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
"timing": "post_installation_reimbursement",
"formulaText": "For eligible newly constructed homes, pay the listed fixed rebate for each selected Minnesota Energy Resources gas or ventilation measure; thermostat is capped at 50% of cost.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 5000,
"maxAmountCents": 40000,
"caps": {
"maxAwardCents": 40000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.5,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["eligible_equipment", "eligible_installation_labor"],
"ineligibleCostCategories": [],
"requiredInputs": ["measure_type", "unit_count", "new_construction_status", "equipment_efficiency", "total_improvement_cost", "installation_date"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "unit_count", "equipment_efficiency", "new_construction_status"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "mer_2026_builder_new_construction",
"selectionInput": "measure_type",
"rows": [
{"measure": "natural gas furnace 94% AFUE", "amountCents": 20000, "unit": "unit"},
{"measure": "natural gas furnace 97% AFUE", "amountCents": 30000, "unit": "unit"},
{"measure": "natural gas boiler 90% AFUE", "amountCents": 20000, "unit": "unit"},
{"measure": "integrated gas space/water heating system 92% AFUE", "amountCents": 25000, "unit": "unit"},
{"measure": "advanced or Wi-Fi thermostat", "amountCents": 5000, "unit": "unit", "maxPercentOfEligibleCost": 0.5},
{"measure": "natural gas storage water heater, standard UEF qualifying", "amountCents": 12500, "unit": "unit"},
{"measure": "natural gas storage water heater 0.82+ UEF", "amountCents": 25000, "unit": "unit"},
{"measure": "natural gas tank or tankless water heater 0.87+ UEF", "amountCents": 30000, "unit": "unit"},
{"measure": "drain water heat recovery device", "amountCents": 15000, "unit": "unit"},
{"measure": "direct vent gas hearth/fireplace with electronic ignition", "amountCents": 7500, "unit": "unit"},
{"measure": "HRV/ERV whole-home system", "amountCents": 40000, "unit": "unit"},
{"measure": "ENERGY STAR V7 window", "amountCents": 5000, "unit": "window"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Minnesota Energy Resources 2026 builder table lists gas HVAC, water heating, thermostat, HRV/ERV, DHR and window rebate amounts.",
"sourceUrls": [
"[https://www.minnesotaenergyresources.com/partners/builders/construction-rebates](https://www.minnesotaenergyresources.com/partners/builders/construction-rebates)",
"[https://www.minnesotaenergyresources.com/partners/builders/pdf/builders_construction_rebates.pdf](https://www.minnesotaenergyresources.com/partners/builders/pdf/builders_construction_rebates.pdf)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "energy_recovery_ventilation_retrofit", "action": "keep", "reason": "The source publishes a whole-home HRV/ERV new-construction rebate."},
{"retrofitTypeId": "high_efficiency_boiler_retrofit", "action": "keep", "reason": "The source publishes a new-construction natural gas boiler rebate."},
{"retrofitTypeId": "high_efficiency_furnace_retrofit", "action": "keep", "reason": "The source publishes new-construction natural gas furnace rebate tiers."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Keep only for listed new-construction gas furnaces, boilers or integrated systems."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "The source publishes an advanced or Wi-Fi thermostat rebate tied to gas-heated new construction."},
{"retrofitTypeId": "waste_heat_recovery", "action": "delete_bad_edge", "reason": "The source supports HRV/ERV and drain-water heat recovery, not industrial waste-heat recovery."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Offers cannot be combined for the same equipment/service, and rebate cannot exceed improvement or service cost."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.minnesotaenergyresources.com/partners/builders/construction-rebates](https://www.minnesotaenergyresources.com/partners/builders/construction-rebates)",
"[https://www.minnesotaenergyresources.com/partners/builders/pdf/builders_construction_rebates.pdf](https://www.minnesotaenergyresources.com/partners/builders/pdf/builders_construction_rebates.pdf)",
"[https://programs.dsireusa.org/system/program/detail/22091/minnesota-energy-resources-gas-new-construction-rebates](https://programs.dsireusa.org/system/program/detail/22091/minnesota-energy-resources-gas-new-construction-rebates)"
],
"evidenceText": "Minnesota Energy Resources publishes fixed builder rebates for new homes, including gas HVAC, water heating, thermostat and HRV/ERV.",
"reasoningNotes": "Existing-home retrofit users should not match this new-construction record unless the home meets the program definition.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2249",
"opportunityName": "Wright-Hennepin Cooperative Electric Association - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": ["rebate", "tariff_or_rate"],
"primaryValueModelKinds": ["measure_catalog", "rate_table", "tariff_or_rate"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Apply Wright-Hennepin's residential rebate row selected by measure, vehicle type, tons or equipment tier; up-to rows are caps, not guaranteed amounts.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 2500,
"maxAmountCents": 195000,
"caps": {
"maxAwardCents": 195000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": 6,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [],
"requiredInputs": ["measure_type", "unit_count", "vehicle_type", "tons", "equipment_tier", "program_enrollment", "metering_status"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "unit_count_or_tons", "vehicle_type_or_equipment_tier"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "whe_2026_residential_rebates",
"selectionInput": "measure_type",
"rows": [
{"measure": "Level 2 BEV charger", "maxAmountCents": 50000, "unit": "charger"},
{"measure": "Level 2 PHEV charger", "maxAmountCents": 15000, "unit": "charger"},
{"measure": "ground-source heat pump", "rateCents": 32500, "rateUnit": "per_ton", "maxUnits": 6, "maxAmountCents": 195000},
{"measure": "air-source heat pump ESP", "maxAmountCents": 67500, "unit": "system"},
{"measure": "air-source heat pump ECO high efficiency", "amountCents": 58000, "unit": "system"},
{"measure": "air-source heat pump ECO premium efficiency", "amountCents": 63000, "unit": "system"},
{"measure": "air-source heat pump tune-up", "amountCents": 2500, "unit": "system"},
{"measure": "dual fuel heating", "maxAmountCents": 80000, "unit": "system"},
{"measure": "electronically commutated motor", "amountCents": 5000, "unit": "motor", "maxUnits": 2},
{"measure": "refrigerator or freezer recycling", "maxAmountCents": 8000, "unit": "unit"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Wright-Hennepin publishes 2026 residential EV, ground-source, air-source, dual-fuel, ECM and recycling rebate values.",
"sourceUrls": [
"[https://www.whe.org/rebates](https://www.whe.org/rebates)",
"[https://www.whe.org/electric-vehicle-charging-program](https://www.whe.org/electric-vehicle-charging-program)",
"[https://www.whe.org/ground-source-heat-pumps](https://www.whe.org/ground-source-heat-pumps)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "monthly",
"formulaText": "EV and ground-source heat-pump programs include special rates; bill savings require metered kWh on the program rate compared with the otherwise applicable rate.",
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
"requiredInputs": ["special_rate", "baseline_rate", "monthly_kwh_on_rate"],
"missingInputsForTypicalRetroFiEstimate": ["monthly_kwh_on_rate", "baseline_rate"],
"rateTable": {
"tableId": "whe_2026_special_rates",
"dimensions": ["rate_program", "period"],
"rows": [
{"rateProgram": "EV time-of-use", "period": "10pm-5am", "rateDollarsPerKwh": 0.0775},
{"rateProgram": "EV time-of-use", "period": "5am-5pm", "rateDollarsPerKwh": 0.1447},
{"rateProgram": "EV time-of-use", "period": "5pm-10pm", "rateDollarsPerKwh": 0.3177},
{"rateProgram": "ground-source heat pump", "rateDollarsPerKwh": 0.11}
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
"evidenceText": "Wright-Hennepin EV and ground-source heat-pump programs include special electric rates effective in 2026.",
"sourceUrls": [
"[https://www.whe.org/electric-vehicle-charging-program](https://www.whe.org/electric-vehicle-charging-program)",
"[https://www.whe.org/ground-source-heat-pumps](https://www.whe.org/ground-source-heat-pumps)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "ev_charger_installation", "action": "delete_bad_edge", "reason": "The verified offering requires Level 2 EV equipment, separate metering and TOU enrollment, so generic EV charging is too broad."},
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "keep", "reason": "Wright-Hennepin publishes a per-ton ground-source heat-pump rebate."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "Wright-Hennepin publishes air-source heat-pump and dual-fuel rebates."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Keep only for qualifying ASHP, ground-source or dual-fuel measures."},
{"retrofitTypeId": "level_2_ev_charger_installation", "action": "keep", "reason": "Wright-Hennepin publishes BEV and PHEV Level 2 charger rebate caps."},
{"retrofitTypeId": "refrigeration_ec_motor_retrofit", "action": "delete_bad_edge", "reason": "The source supports generic residential ECMs and recycling, not a specific refrigeration EC-motor retrofit."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "EV charger rebate requires separate outdoor meter and time-of-use enrollment; ground-source rate requires program enrollment."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.whe.org/rebates](https://www.whe.org/rebates)",
"[https://www.whe.org/electric-vehicle-charging-program](https://www.whe.org/electric-vehicle-charging-program)",
"[https://www.whe.org/ground-source-heat-pumps](https://www.whe.org/ground-source-heat-pumps)",
"[https://www.whe.org/sites/default/files/2026-01/residential-ev-charging-station-2026.pdf](https://www.whe.org/sites/default/files/2026-01/residential-ev-charging-station-2026.pdf)",
"[https://programs.dsireusa.org/system/program/detail/2249/wright-hennepin-cooperative-electric-association-residential-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/2249/wright-hennepin-cooperative-electric-association-residential-energy-efficiency-rebate-program)"
],
"evidenceText": "Wright-Hennepin publishes fixed, tiered, per-ton and capped residential rebate values plus EV and ground-source rate effects.",
"reasoningNotes": "Use tariff rows only when usage on the special rate is known; do not include recurring value by default.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2702",
"opportunityName": "City Utilities of Springfield - Commercial Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": ["rebate", "process_value", "non_cash"],
"primaryValueModelKinds": ["measure_catalog", "capped_percent_of_eligible_cost", "custom_quote", "non_cash_process_value"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Thermostat is a fixed $75 rebate; WaterSense toilet is 50% of purchase price up to $75; commercial lighting and controls require pre-evaluation/workbook with a $40,000 cap.",
"amountCents": null,
"percent": 0.5,
"rate": null,
"rateUnit": null,
"minAmountCents": 7500,
"maxAmountCents": 4000000,
"caps": {
"maxAwardCents": 4000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.5,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": ["thermostat_purchase", "toilet_purchase_price", "lighting_equipment", "eligible_lighting_project_cost"],
"ineligibleCostCategories": ["old_toilet_disposal_fee", "work_started_before_lighting_pre_evaluation"],
"requiredInputs": ["measure_type", "unit_count", "purchase_price", "lighting_workbook_result", "service_type", "pre_evaluation_status"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "unit_count", "purchase_price_or_lighting_workbook_result"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "city_utilities_springfield_rebates",
"selectionInput": "measure_type",
"rows": [
{"measure": "ENERGY STAR smart thermostat", "amountCents": 7500, "unit": "unit"},
{"measure": "WaterSense high-efficiency toilet", "maxAmountCents": 7500, "maxPercentOfEligibleCost": 0.5, "unit": "toilet"},
{"measure": "commercial lighting rebate", "maxAmountCents": 4000000, "unit": "project"},
{"measure": "occupancy sensor or lighting control", "maxAmountCents": 4000000, "unit": "project"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "City Utilities publishes a $75 thermostat rebate, 50% up to $75 WaterSense toilet rebate, and capped commercial lighting rebate.",
"sourceUrls": [
"[https://www.cityutilities.net/263/Commercial-Lighting-Rebate](https://www.cityutilities.net/263/Commercial-Lighting-Rebate)",
"[https://www.cityutilities.net/267/Thermostat-Rebate](https://www.cityutilities.net/267/Thermostat-Rebate)",
"[https://www.cityutilities.net/266/WaterSense-Toilet-Rebate](https://www.cityutilities.net/266/WaterSense-Toilet-Rebate)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "process_value",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Commercial energy and lighting audits are no-cost utility services that provide analysis and recommendations; no direct cash amount should be added to user totals.",
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
"requiredInputs": ["commercial_customer_status", "service_type", "audit_request"],
"missingInputsForTypicalRetroFiEstimate": ["audit_request"],
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
"evidenceText": "City Utilities describes commercial energy and lighting audits as no-cost service offerings, not equipment rebates.",
"sourceUrls": [
"[https://www.cityutilities.net/265/Commercial-Energy-Audit](https://www.cityutilities.net/265/Commercial-Energy-Audit)",
"[https://www.cityutilities.net/264/Commercial-Lighting-Audit](https://www.cityutilities.net/264/Commercial-Lighting-Audit)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "energy_audit", "action": "move_to_special_workflow", "reason": "Audits are non-physical no-cost services and should be modeled as process value."},
{"retrofitTypeId": "high_efficiency_toilet_urinal", "action": "keep", "reason": "Source-backed only for WaterSense toilets, not urinals."},
{"retrofitTypeId": "led_lighting_retrofit", "action": "keep", "reason": "Commercial lighting rebate supports eligible LED lighting through pre-evaluation/workbook."},
{"retrofitTypeId": "lighting_controls_retrofit", "action": "keep", "reason": "Lighting controls are supported through the commercial lighting rebate workbook."},
{"retrofitTypeId": "low_flow_fixture_retrofit", "action": "delete_bad_edge", "reason": "The verified water rebate is WaterSense toilet replacement, not broad low-flow fixtures."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "City Utilities publishes a fixed ENERGY STAR smart thermostat rebate."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Commercial lighting work begun before required pre-evaluation is not eligible."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.cityutilities.net/165/Rebates](https://www.cityutilities.net/165/Rebates)",
"[https://www.cityutilities.net/263/Commercial-Lighting-Rebate](https://www.cityutilities.net/263/Commercial-Lighting-Rebate)",
"[https://www.cityutilities.net/267/Thermostat-Rebate](https://www.cityutilities.net/267/Thermostat-Rebate)",
"[https://www.cityutilities.net/266/WaterSense-Toilet-Rebate](https://www.cityutilities.net/266/WaterSense-Toilet-Rebate)",
"[https://www.cityutilities.net/265/Commercial-Energy-Audit](https://www.cityutilities.net/265/Commercial-Energy-Audit)",
"[https://www.cityutilities.net/264/Commercial-Lighting-Audit](https://www.cityutilities.net/264/Commercial-Lighting-Audit)",
"[https://programs.dsireusa.org/system/program/detail/2702/city-utilities-of-springfield-commercial-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/2702/city-utilities-of-springfield-commercial-energy-efficiency-rebate-program)"
],
"evidenceText": "City Utilities publishes thermostat, WaterSense toilet and commercial lighting rebates plus no-cost commercial audit services.",
"reasoningNotes": "Lighting exact value requires the utility workbook, so the cap is source-backed but project estimate needs additional inputs.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5874",
"opportunityName": "Spire Energy - Commercial and Industrial Energy Efficiency Rebate Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "needs_repair_review",
"sourceConfidence": "medium",
"estimateConfidence": "low",
"cashValueClassifications": ["rebate", "process_value"],
"primaryValueModelKinds": ["custom_quote", "capped_percent_of_eligible_cost", "non_cash_process_value"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "custom_quote",
"timing": "post_installation_reimbursement",
"formulaText": "Spire's business rebate page requires selecting a Missouri location and measure-specific application path; target-measure amounts should be quoted from the current location-specific table or application before estimating.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 10000000,
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
"requiredInputs": ["spire_service_area", "measure_type", "equipment_efficiency", "installed_cost", "natural_gas_account_status", "application_or_quote"],
"missingInputsForTypicalRetroFiEstimate": ["spire_service_area", "measure_type", "current_measure_table_or_application"],
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
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Spire confirms business natural-gas rebates by location, but static target-measure tables were not fully accessible without location/application selection.",
"sourceUrls": [
"[https://www.spireenergy.com/commercial-rebates](https://www.spireenergy.com/commercial-rebates)",
"[https://www.spireenergy.com/rebates-offers](https://www.spireenergy.com/rebates-offers)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "process_value",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Energy audit support is a workflow/service value; Spire materials indicate audit-related rebates require installation of an eligible identified measure.",
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
"requiredInputs": ["audit_type", "eligible_measure_installed", "spire_service_area"],
"missingInputsForTypicalRetroFiEstimate": ["eligible_measure_installed", "current_audit_terms"],
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
"evidenceText": "Spire program notes tie audit value to eligible measure follow-through rather than a standalone physical retrofit.",
"sourceUrls": ["[https://www.spireenergy.com/commercial-rebates](https://www.spireenergy.com/commercial-rebates)"]
}
],
"edgeActions": [
{"retrofitTypeId": "boiler_controls_burner_retrofit", "action": "keep", "reason": "Repaired source notes support C&I natural-gas boiler-system measures, but exact burner/control rate needs current location-specific table verification."},
{"retrofitTypeId": "energy_audit", "action": "move_to_special_workflow", "reason": "Audit is a service/process workflow and not standalone installed equipment."},
{"retrofitTypeId": "high_efficiency_boiler_retrofit", "action": "keep", "reason": "Spire business rebates support natural-gas boiler equipment, but exact target amount needs current location-specific table verification."},
{"retrofitTypeId": "high_efficiency_furnace_retrofit", "action": "keep", "reason": "Spire business rebates support natural-gas furnace equipment, but exact target amount needs current location-specific table verification."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Keep only for qualifying natural-gas HVAC measures, not electric heat pumps or broad HVAC."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "Keep only for qualifying gas-efficiency thermostat measures after location-specific amount verification."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Applications are first-come and subject to budget availability; standard/custom rebates may be capped by program year."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "2026-09-30",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.spireenergy.com/commercial-rebates](https://www.spireenergy.com/commercial-rebates)",
"[https://www.spireenergy.com/rebates-offers](https://www.spireenergy.com/rebates-offers)",
"[https://www.spireenergy.com/sites/default/files/2025-09/25-CandIRebates-SteamTrap-FINAL-REV-1003.pdf](https://www.spireenergy.com/sites/default/files/2025-09/25-CandIRebates-SteamTrap-FINAL-REV-1003.pdf)",
"[https://programs.dsireusa.org/system/program/detail/5874/spire-energy-commercial-and-industrial-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/5874/spire-energy-commercial-and-industrial-energy-efficiency-rebate-program)"
],
"evidenceText": "Spire's current public business page confirms location-based rebates, but exact target-measure tables require location/application verification.",
"reasoningNotes": "A steam-trap application confirms current program mechanics and caps, but steam traps are not among this record's target edges.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Static official pages did not expose current Missouri target-measure rate tables for boiler, furnace and thermostat rows.",
"Verify Eastern or Western Missouri location-specific forms before computing an amount."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5705",
"opportunityName": "TVA - Residential Energy Efficiency Rebate Program",
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
"timing": "post_installation_reimbursement",
"formulaText": "TVA pays the fixed residential rebate for the selected measure after installation by a Quality Contractor Network contractor and customer redemption.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 5000,
"maxAmountCents": 150000,
"caps": {
"maxAwardCents": 150000,
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
"requiredInputs": ["measure_type", "equipment_efficiency_tier", "unit_count", "qcn_contractor_status", "local_power_company"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "equipment_efficiency_tier"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "tva_energyright_residential_rebates",
"selectionInput": "measure_type",
"rows": [
{"measure": "air-source or dual-fuel heat pump 15.0-16.99 SEER2", "amountCents": 50000, "unit": "system"},
{"measure": "air-source or dual-fuel heat pump 17.0+ SEER2", "amountCents": 80000, "unit": "system"},
{"measure": "geothermal heat pump", "amountCents": 150000, "unit": "system"},
{"measure": "duct sealing, duct insulation, repair or replacement", "amountCents": 30000, "unit": "project"},
{"measure": "envelope air sealing", "amountCents": 30000, "unit": "project"},
{"measure": "attic insulation", "amountCents": 50000, "unit": "project"},
{"measure": "wall insulation", "amountCents": 30000, "unit": "project"},
{"measure": "HVAC tune-up for existing heat pump or central AC", "amountCents": 5000, "unit": "system"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "TVA EnergyRight publishes fixed residential rebates for heat pumps, geothermal systems, duct work, air sealing, insulation and tune-ups.",
"sourceUrls": [
"[https://energyright.com/residential/rebates/](https://energyright.com/residential/rebates/)",
"[https://energyright.com/residential/rebates/geothermal-heat-pump/](https://energyright.com/residential/rebates/geothermal-heat-pump/)",
"[https://energyright.com/residential/rebates/heat-pump/](https://energyright.com/residential/rebates/heat-pump/)",
"[https://energyright.com/residential/rebates/home-insulation-air-sealing/](https://energyright.com/residential/rebates/home-insulation-air-sealing/)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "air_sealing_weatherization", "action": "keep", "reason": "TVA publishes an envelope air-sealing rebate."},
{"retrofitTypeId": "duct_sealing_and_insulation", "action": "keep", "reason": "TVA publishes duct sealing, insulation, repair and replacement rebates."},
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "keep", "reason": "TVA publishes a geothermal heat pump rebate."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "TVA publishes tiered air-source and dual-fuel heat pump rebates."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "TVA supports eligible heat-pump and central-AC related HVAC measures through EnergyRight."},
{"retrofitTypeId": "insulation_upgrade", "action": "keep", "reason": "TVA publishes attic and wall insulation rebates."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Contractor submits rebate to TVA and customer claims a redemption code; do not treat as statewide Mississippi availability."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://energyright.com/residential/rebates/](https://energyright.com/residential/rebates/)",
"[https://energyright.com/residential/rebates/geothermal-heat-pump/](https://energyright.com/residential/rebates/geothermal-heat-pump/)",
"[https://energyright.com/residential/rebates/heat-pump/](https://energyright.com/residential/rebates/heat-pump/)",
"[https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/](https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/)",
"[https://energyright.com/residential/rebates/home-insulation-air-sealing/](https://energyright.com/residential/rebates/home-insulation-air-sealing/)",
"[https://programs.dsireusa.org/system/program/detail/5705/tva-residential-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/5705/tva-residential-energy-efficiency-rebate-program)"
],
"evidenceText": "TVA's EnergyRight pages publish fixed residential rebates through participating local power companies and QCN contractors.",
"reasoningNotes": "Mississippi record is not statewide; it applies only in participating TVA-served local power company territories.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3721",
"opportunityName": "Dominion Energy (Gas) - Energy-Efficient Appliance Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "fixed_tier_amount", "rate_table"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use Enbridge Gas North Carolina ThermWise residential or business row selected by customer sector and gas equipment type; fixed rows pay per unit and commercial water heaters may use kBTU.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 2500,
"maxAmountCents": 75000,
"caps": {
"maxAwardCents": 100000,
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
"requiredInputs": ["customer_sector", "measure_type", "unit_count", "equipment_efficiency", "natural_gas_account_status", "installation_date", "kBTU_for_commercial_water_heater"],
"missingInputsForTypicalRetroFiEstimate": ["customer_sector", "measure_type", "unit_count", "equipment_efficiency"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "enbridge_gas_nc_thermwise_rebates",
"selectionInput": "measure_type",
"rows": [
{"measure": "residential gas storage water heater 0.64+ UEF", "amountCents": 10000, "unit": "unit"},
{"measure": "residential gas tankless water heater 0.82+ UEF", "amountCents": 15000, "unit": "unit"},
{"measure": "residential gas tankless water heater 0.95+ UEF", "amountCents": 30000, "unit": "unit"},
{"measure": "residential gas furnace 92%+ AFUE", "amountCents": 20000, "unit": "unit"},
{"measure": "residential gas furnace 97%+ AFUE", "amountCents": 40000, "unit": "unit"},
{"measure": "residential gas boiler 90%+ AFUE", "amountCents": 20000, "unit": "unit"},
{"measure": "smart thermostat with natural gas heat", "amountCents": 5000, "unit": "unit"},
{"measure": "business gas furnace 92%+ AFUE", "amountCents": 20000, "unit": "unit"},
{"measure": "business gas furnace 97%+ AFUE", "amountCents": 40000, "unit": "unit"},
{"measure": "business gas boiler 90%+ AFUE", "amountCents": 20000, "unit": "unit"},
{"measure": "commercial-grade gas storage water heater", "rateCents": 200, "rateUnit": "per_kBTU"},
{"measure": "infrared heating system", "amountCents": 50000, "unit": "unit"},
{"measure": "ENERGY STAR gas convection oven", "amountCents": 50000, "unit": "unit"},
{"measure": "ENERGY STAR gas commercial fryer", "amountCents": 40000, "unit": "unit"},
{"measure": "gas commercial griddle", "amountCents": 30000, "unit": "unit"},
{"measure": "gas steam cooker", "amountCents": 75000, "unit": "unit"},
{"measure": "pre-rinse spray valve 1.25 GPM", "amountCents": 2500, "unit": "unit"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Enbridge Gas North Carolina publishes residential gas equipment and business gas heating and food-service rebate values.",
"sourceUrls": [
"[https://www.enbridgegas.com/north-carolina/save-energy/thermwise](https://www.enbridgegas.com/north-carolina/save-energy/thermwise)",
"[https://www.enbridgegas.com/north-carolina/save-energy/thermwise/residential-rebates](https://www.enbridgegas.com/north-carolina/save-energy/thermwise/residential-rebates)",
"[https://www.enbridgegas.com/north-carolina/save-energy/thermwise/business-rebates](https://www.enbridgegas.com/north-carolina/save-energy/thermwise/business-rebates)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "high_efficiency_boiler_retrofit", "action": "keep", "reason": "Enbridge publishes natural-gas boiler rebate values."},
{"retrofitTypeId": "high_efficiency_fryer", "action": "keep", "reason": "Enbridge publishes an ENERGY STAR gas commercial fryer rebate."},
{"retrofitTypeId": "high_efficiency_furnace_retrofit", "action": "keep", "reason": "Enbridge publishes natural-gas furnace rebate tiers."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Keep only for qualifying natural-gas furnace, boiler or infrared heating measures."},
{"retrofitTypeId": "high_efficiency_oven", "action": "keep", "reason": "Enbridge publishes an ENERGY STAR gas convection oven rebate."},
{"retrofitTypeId": "smart_thermostat_zoning_retrofit", "action": "keep", "reason": "Enbridge publishes a smart thermostat rebate for natural gas heat."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Residential and business rebates are separate; use sector-specific tables and submit within program deadlines."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.enbridgegas.com/north-carolina/save-energy/thermwise](https://www.enbridgegas.com/north-carolina/save-energy/thermwise)",
"[https://www.enbridgegas.com/north-carolina/save-energy/thermwise/residential-rebates](https://www.enbridgegas.com/north-carolina/save-energy/thermwise/residential-rebates)",
"[https://www.enbridgegas.com/north-carolina/save-energy/thermwise/business-rebates](https://www.enbridgegas.com/north-carolina/save-energy/thermwise/business-rebates)",
"[https://www.enbridgegas.com/-/media/Extranet-Pages/north-carolina/save-money/thermwise/residential-rebates/appliance-rebate-form.pdf?hash=253975D8BA85203980ADCDA9A6E678C1&rev=be32e8aacb1745019c80691d23c16e7f](https://www.enbridgegas.com/-/media/Extranet-Pages/north-carolina/save-money/thermwise/residential-rebates/appliance-rebate-form.pdf?hash=253975D8BA85203980ADCDA9A6E678C1&rev=be32e8aacb1745019c80691d23c16e7f)",
"[https://programs.dsireusa.org/system/program/detail/3721/dominion-energy-gas-energy-efficient-appliance-rebate-program](https://programs.dsireusa.org/system/program/detail/3721/dominion-energy-gas-energy-efficient-appliance-rebate-program)"
],
"evidenceText": "Enbridge Gas North Carolina ThermWise publishes fixed residential and business natural-gas rebate values for target gas measures.",
"reasoningNotes": "The old Dominion name maps to Enbridge Gas North Carolina after the utility transition.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5248",
"opportunityName": "Jones-Onslow EMC - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": ["rebate"],
"primaryValueModelKinds": ["measure_catalog", "fixed_amount", "custom_quote"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Apply the fixed residential row when published: $300 for HPWH 55 gallons or less and $250 for Level 2 EV charger. HVAC and appliance amounts require current form details before estimating.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 25000,
"maxAmountCents": 30000,
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
"requiredInputs": ["measure_type", "unit_count", "equipment_size_gallons", "equipment_efficiency", "installation_year", "current_form_amount"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "unit_count", "current_form_amount_for_hvac_or_appliance"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "joemc_2026_residential_rebates",
"selectionInput": "measure_type",
"rows": [
{"measure": "heat pump water heater 55 gallons or less", "amountCents": 30000, "unit": "unit"},
{"measure": "Level 2 residential EV charger", "amountCents": 25000, "unit": "charger"},
{"measure": "qualifying ENERGY STAR heat pump or air-to-air heat pump", "amountCents": null, "unit": "system", "requirements": "current form required for amount"},
{"measure": "ENERGY STAR residential appliance", "amountCents": null, "unit": "appliance", "requirements": "current appliance form required for amount and eligible product"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "JOEMC's residential page publishes a $300 HPWH rebate and Level 2 EV charger rebate; heat-pump and appliance forms require measure details.",
"sourceUrls": [
"[https://joemc.com/energywise/products-rebates/](https://joemc.com/energywise/products-rebates/)",
"[https://formstack.io/1B5B7](https://formstack.io/1B5B7)",
"[https://formstack.io/D2646](https://formstack.io/D2646)",
"[https://formstack.io/B9CDF](https://formstack.io/B9CDF)"
]
}
],
"edgeActions": [
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "delete_bad_edge", "reason": "Current verified JOEMC categories do not support a ground-source/geothermal heat-pump rebate."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "JOEMC supports qualifying residential ENERGY STAR heat pumps and air-to-air heat pumps."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "JOEMC publishes a $300 rebate for HPWHs of 55 gallons or less."},
{"retrofitTypeId": "high_efficiency_commercial_dishwasher", "action": "delete_bad_edge", "reason": "JOEMC residential appliance rebates are not commercial dishwasher incentives."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Keep only for qualifying residential heat-pump HVAC equipment."},
{"retrofitTypeId": "high_efficiency_refrigeration_equipment", "action": "delete_bad_edge", "reason": "No current official support found for commercial refrigeration equipment under this residential JOEMC program."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Use only residential member rebates; do not map commercial appliances or refrigeration."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://joemc.com/energywise/products-rebates/](https://joemc.com/energywise/products-rebates/)",
"[https://formstack.io/1B5B7](https://formstack.io/1B5B7)",
"[https://formstack.io/D2646](https://formstack.io/D2646)",
"[https://formstack.io/B9CDF](https://formstack.io/B9CDF)",
"[https://programs.dsireusa.org/system/program/detail/5248/jones-onslow-emc-residential-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/5248/jones-onslow-emc-residential-energy-efficiency-rebate-program)"
],
"evidenceText": "JOEMC supports residential HPWH, Level 2 EV, qualifying heat-pump HVAC and residential appliance rebates; commercial edges are false positives.",
"reasoningNotes": "Heat-pump HVAC and appliance forms should be checked for current exact rows before using an amount.",
"humanReviewRequired": true,
"humanReviewReasons": ["Current static page did not expose all residential heat-pump HVAC and appliance form rate details."]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3861",
"opportunityName": "South River EMC - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": ["rebate", "process_value"],
"primaryValueModelKinds": ["measure_catalog", "fixed_tier_amount", "non_cash_process_value"],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use the South River EMC residential bill-credit catalog. Heat-pump and central-AC rows pay fixed unit amounts by home type and efficiency; HPWH and weatherization rows pay fixed amounts when requirements are met.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 7500,
"maxAmountCents": 30000,
"caps": {
"maxAwardCents": 30000,
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
"requiredInputs": ["measure_type", "unit_count", "home_type", "equipment_efficiency", "installation_date", "sremc_service_status", "contractor_license_status"],
"missingInputsForTypicalRetroFiEstimate": ["measure_type", "unit_count", "home_type", "equipment_efficiency"],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "sremc_residential_rebates",
"selectionInput": "measure_type",
"rows": [
{"measure": "air-source heat pump 16 SEER2, single-family", "amountCents": 15000, "unit": "unit"},
{"measure": "air-source heat pump 17 SEER2 or greater, single-family", "amountCents": 20000, "unit": "unit"},
{"measure": "air-source heat pump 16 SEER2, manufactured home", "amountCents": 10000, "unit": "unit"},
{"measure": "air-source heat pump 17 SEER2 or greater, manufactured home", "amountCents": 15000, "unit": "unit"},
{"measure": "central AC 16 SEER2 or greater", "amountCents": 7500, "unit": "unit"},
{"measure": "geothermal heat pump", "amountCents": 30000, "unit": "unit"},
{"measure": "heat pump water heater", "amountCents": 15000, "unit": "unit"},
{"measure": "solar water heater", "amountCents": 20000, "unit": "system"},
{"measure": "low-income weatherization package", "amountCents": 30000, "unit": "home"}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "South River EMC publishes fixed bill-credit amounts for ASHP, central AC, geothermal, HPWH, solar water heating and low-income weatherization.",
"sourceUrls": [
"[https://www.sremc.com/rebates-efficiency-tips](https://www.sremc.com/rebates-efficiency-tips)",
"[https://www.sremc.com/energy-star-heating-cooling](https://www.sremc.com/energy-star-heating-cooling)",
"[https://www.sremc.com/energy-efficient-water-heating](https://www.sremc.com/energy-efficient-water-heating)",
"[https://www.sremc.com/weatherization](https://www.sremc.com/weatherization)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "process_value",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Weatherization requires a Community Action package including air/duct sealing, insulation, HVAC work and thermostat measures; model as special workflow plus fixed bill credit only when package is complete.",
"amountCents": 30000,
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
"requiredInputs": ["low_income_weatherization_status", "community_action_completion", "home_age", "all_electric_home"],
"missingInputsForTypicalRetroFiEstimate": ["low_income_weatherization_status", "community_action_completion"],
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
"probabilityEvidenceType": "eligibility_only"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "South River's weatherization rebate is tied to a completed low-income Community Action package, not standalone insulation work.",
"sourceUrls": ["[https://www.sremc.com/weatherization](https://www.sremc.com/weatherization)"]
}
],
"edgeActions": [
{"retrofitTypeId": "air_sealing_weatherization", "action": "move_to_special_workflow", "reason": "Air sealing is supported only as part of the low-income weatherization package."},
{"retrofitTypeId": "ground_source_geothermal_heat_pump", "action": "keep", "reason": "South River publishes a geothermal heat pump rebate."},
{"retrofitTypeId": "heat_pump_hvac_retrofit", "action": "keep", "reason": "South River publishes air-source, dual-fuel, ductless and geothermal heat-pump rebate rows."},
{"retrofitTypeId": "heat_pump_water_heater", "action": "keep", "reason": "South River publishes an HPWH rebate for qualifying replacements."},
{"retrofitTypeId": "high_efficiency_hvac_replacement", "action": "keep", "reason": "Keep only for qualifying heat-pump or central-AC rows."},
{"retrofitTypeId": "insulation_upgrade", "action": "move_to_special_workflow", "reason": "Insulation is supported only within the low-income weatherization package, not as a standalone unrestricted rebate."}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "If a member qualifies for low-income weatherization and heat pump or central AC rebate, they do not qualify for an additional HVAC rebate for the same project."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.sremc.com/rebates-efficiency-tips](https://www.sremc.com/rebates-efficiency-tips)",
"[https://www.sremc.com/energy-star-heating-cooling](https://www.sremc.com/energy-star-heating-cooling)",
"[https://www.sremc.com/energy-efficient-water-heating](https://www.sremc.com/energy-efficient-water-heating)",
"[https://www.sremc.com/weatherization](https://www.sremc.com/weatherization)",
"[https://www.sremc.com/form/hvac-rebate](https://www.sremc.com/form/hvac-rebate)",
"[https://sremc.com/form/water-heating-pool-pump-rebate](https://sremc.com/form/water-heating-pool-pump-rebate)",
"[https://programs.dsireusa.org/system/program/detail/3861/south-river-emc-residential-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/3861/south-river-emc-residential-energy-efficiency-rebate-program)"
],
"evidenceText": "South River EMC publishes residential bill-credit rebates for heat pumps, central AC, HPWH and low-income weatherization packages.",
"reasoningNotes": "Weatherization and insulation edges should route to the income-qualified Community Action package workflow.",
"humanReviewRequired": false,
"humanReviewReasons": []
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:5708"
}

