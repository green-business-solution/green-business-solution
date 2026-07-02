{
"schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
"researchedAt": "2026-07-02",
"source": "gpt_pro",
"batchNumber": 9,
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1653",
"opportunityName": "Intermountain Gas Company (IGC) - Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"per_unit_award"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Use the qualifying Intermountain Gas appliance measure amount per installed unit, capped so the rebate does not exceed the eligible equipment and installation price paid.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 80000,
"caps": {
"maxAwardCents": 80000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying new natural gas furnace",
"qualifying new natural gas boiler",
"qualifying tankless natural gas water heater",
"qualifying combination boiler",
"installation labor"
],
"ineligibleCostCategories": [
"amounts exceeding price paid",
"non-natural-gas equipment",
"electric heat pump space heating equipment"
],
"requiredInputs": [
"measure_type",
"unit_count",
"AFUE_or_UEF",
"equipment_and_installation_cost"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"AFUE_or_UEF",
"equipment_and_installation_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "igc_2026_residential_appliance_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Natural gas furnace, 95% AFUE or higher",
"amountCents": 27500,
"unit": "per furnace"
},
{
"measure": "Tankless natural gas water heater, 0.91 UEF or higher",
"amountCents": 32500,
"unit": "per water heater"
},
{
"measure": "Natural gas boiler, 95% AFUE or higher",
"amountCents": 80000,
"unit": "per boiler"
},
{
"measure": "Combination boiler",
"amountCents": 80000,
"unit": "per combination boiler"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "Current Intermountain Gas appliance rebates list $275 for 95% AFUE furnaces, $325 for tankless water heaters, and $800 for qualifying boilers or combination boilers.",
"sourceUrls": [
"[https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/appliance-rebates/](https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/appliance-rebates/)",
"[https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/residential-rebate-terms-and-conditions/](https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/residential-rebate-terms-and-conditions/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "delete_bad_edge",
"reason": "Current official residential rebate table did not verify air sealing or weatherization rebates."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "delete_bad_edge",
"reason": "Current official residential rebate table did not verify duct sealing or duct insulation rebates."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "The current appliance table lists qualifying natural gas boiler and combination boiler rebates."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "The current appliance table lists a 95% AFUE natural gas furnace rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "The current offer is limited to specified natural-gas furnaces and boilers, not broad HVAC replacement."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "delete_bad_edge",
"reason": "Current official residential rebate table did not verify insulation upgrade rebates."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "needs_review",
"reason": "Program terms mention smart thermostats, but the current checked appliance table did not provide a public rebate amount."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate cannot exceed the price paid for equipment and installation."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "Application must be submitted within 90 days of installation.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/](https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/)",
"[https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/appliance-rebates/](https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/appliance-rebates/)",
"[https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/residential-rebate-terms-and-conditions/](https://www.intgas.com/energy-efficiency_program/residential-energy-efficiency/residential-rebate-terms-and-conditions/)",
"[https://customer.intgas.com/login/](https://customer.intgas.com/login/)",
"[https://programs.dsireusa.org/system/program/detail/1653/intermountain-gas-company-igc-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/1653/intermountain-gas-company-igc-energy-efficiency-rebate-program)"
],
"evidenceText": "Intermountain Gas currently publishes fixed residential appliance rebates for qualifying natural-gas furnaces, tankless water heaters, boilers and combination boilers.",
"reasoningNotes": "Legacy envelope and duct edges appear stale. Uploaded target prompt citation: ",
"humanReviewRequired": true,
"humanReviewReasons": [
"Smart thermostat was mentioned in terms but no current public amount was verified."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5235",
"opportunityName": "North Shore Gas - Residential Rebate Program",
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
"formulaText": "Select the qualifying North Shore Gas residential measure and multiply the listed per-unit, per-square-foot, per-linear-foot, or per-CFM rate by the eligible quantity, subject to measure caps and the rule that rebates may not exceed project cost.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 2000,
"maxAmountCents": 120000,
"caps": {
"maxAwardCents": 120000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying gas furnace",
"qualifying gas boiler",
"gas heat pump",
"smart or programmable thermostat",
"air sealing",
"attic insulation",
"wall insulation bundled with air sealing",
"duct sealing",
"pipe insulation"
],
"ineligibleCostCategories": [
"project costs above measure caps",
"non-qualifying electric HVAC",
"rebate amounts exceeding project cost"
],
"requiredInputs": [
"measure_type",
"unit_count",
"AFUE_or_efficiency_tier",
"square_feet",
"linear_feet",
"CFM_reduction",
"project_cost"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"eligible_quantity",
"efficiency_tier",
"project_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "north_shore_gas_residential_2026",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Programmable thermostat",
"amountCents": 2000,
"unit": "per thermostat"
},
{
"measure": "Smart thermostat",
"amountCents": 2500,
"unit": "per thermostat"
},
{
"measure": "Natural gas furnace, 95% AFUE",
"amountCents": 20000,
"unit": "per furnace"
},
{
"measure": "Natural gas furnace, 97% AFUE",
"amountCents": 22500,
"unit": "per furnace"
},
{
"measure": "Hot water boiler, 90% AFUE",
"amountCents": 30000,
"unit": "per boiler"
},
{
"measure": "Hot water boiler, 95% AFUE",
"amountCents": 35000,
"unit": "per boiler"
},
{
"measure": "Boiler with integrated domestic hot water, 90% AFUE",
"amountCents": 40000,
"unit": "per boiler"
},
{
"measure": "Boiler with integrated domestic hot water, 95% AFUE",
"amountCents": 50000,
"unit": "per boiler"
},
{
"measure": "Steam boiler, 82.5% AFUE",
"amountCents": 15000,
"unit": "per boiler"
},
{
"measure": "Gas heat pump for space heating",
"amountCents": 57500,
"unit": "per unit"
},
{
"measure": "Gas heat pump with integrated space and domestic water heating",
"amountCents": 70000,
"unit": "per unit"
},
{
"measure": "Air sealing",
"rateDollars": 0.4,
"unit": "per CFM reduction",
"maxAmountCents": 40000
},
{
"measure": "Wall insulation bundled with air sealing",
"rateDollars": 0.5,
"unit": "per square foot",
"maxAmountCents": 40000
},
{
"measure": "Attic insulation bundled with air sealing",
"rateDollars": 0.3,
"unit": "per square foot",
"maxAmountCents": 50000
},
{
"measure": "Duct sealing",
"rateDollars": 2,
"unit": "per CFM25 reduction",
"maxAmountCents": 40000
},
{
"measure": "Pipe insulation",
"rateDollars": 1,
"unit": "per linear foot"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "North Shore Gas publishes fixed and capped rebates for gas furnaces, boilers, gas heat pumps, thermostats, air sealing, insulation, duct sealing, and pipe insulation.",
"sourceUrls": [
"[https://www.northshoregasdelivery.com/savings/rebates-residential](https://www.northshoregasdelivery.com/savings/rebates-residential)",
"[https://customerrebate-efficiencynavigator.azurewebsites.net/PartnerLink?clientProgramId=305](https://customerrebate-efficiencynavigator.azurewebsites.net/PartnerLink?clientProgramId=305)",
"[https://www.northshoregasdelivery.com/savings/rebates-residential-faq](https://www.northshoregasdelivery.com/savings/rebates-residential-faq)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "Weatherization table includes air sealing at a capped per-CFM reduction rate."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "keep",
"reason": "Weatherization table includes capped duct sealing incentives."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "Residential gas boiler rebates are listed by boiler type and AFUE."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "Residential gas furnace rebates are listed by AFUE."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Supported only as qualifying natural-gas furnace, boiler, or gas heat pump equipment."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Weatherization table includes wall and attic insulation rebates when bundled with air sealing."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Residential rebate table includes programmable and smart thermostats."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebates may not exceed project cost."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.northshoregasdelivery.com/savings/rebates-residential](https://www.northshoregasdelivery.com/savings/rebates-residential)",
"[https://customerrebate-efficiencynavigator.azurewebsites.net/PartnerLink?clientProgramId=305](https://customerrebate-efficiencynavigator.azurewebsites.net/PartnerLink?clientProgramId=305)",
"[https://www.northshoregasdelivery.com/savings/rebates-residential-faq](https://www.northshoregasdelivery.com/savings/rebates-residential-faq)",
"[https://www.northshoregasdelivery.com/savings/rebates](https://www.northshoregasdelivery.com/savings/rebates)"
],
"evidenceText": "The current North Shore Gas residential rebate portal provides a measure table with thermostat, HVAC, weatherization, duct sealing and pipe insulation amounts.",
"reasoningNotes": "Broad HVAC must remain gas-specific and should not be used for electric heat pumps or central A/C.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3063",
"opportunityName": "CenterPoint Energy - Residential Energy Efficiency Rebates",
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
"formulaText": "Use the qualifying CenterPoint Indiana residential rebate amount or instant discount for the selected measure. Attic insulation is 40% of material and labor invoice cost up to $750.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 500,
"maxAmountCents": 200000,
"caps": {
"maxAwardCents": 200000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying electric heat pump or central air conditioner",
"qualifying gas furnace or boiler",
"attic insulation materials and labor",
"duct sealing",
"Aeroseal",
"smart thermostat",
"qualifying residential appliances"
],
"ineligibleCostCategories": [
"dual-fuel or new-construction thermostats where excluded",
"non-qualifying commercial appliances",
"amounts above program caps"
],
"requiredInputs": [
"measure_type",
"unit_count",
"SEER2_or_efficiency_tier",
"AFUE",
"project_cost",
"attic_insulation_invoice_cost"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"efficiency_tier",
"project_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "centerpoint_in_residential_2026",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Wi-Fi or smart programmable thermostat",
"amountCents": 3000,
"unit": "per thermostat"
},
{
"measure": "Gas furnace, 96% AFUE",
"amountCents": 20000,
"unit": "per furnace"
},
{
"measure": "Gas furnace, 97% AFUE or higher",
"amountCents": 25000,
"unit": "per furnace"
},
{
"measure": "Gas boiler, 90% AFUE or higher",
"amountCents": 30000,
"unit": "per boiler"
},
{
"measure": "Air-source heat pump",
"minAmountCents": 15000,
"maxAmountCents": 35000,
"unit": "per system, tiered by SEER2"
},
{
"measure": "Ductless heat pump",
"minAmountCents": 20000,
"maxAmountCents": 45000,
"unit": "per system, tiered by efficiency"
},
{
"measure": "Central air conditioner",
"minAmountCents": 5000,
"maxAmountCents": 35000,
"unit": "per system, tiered by SEER2"
},
{
"measure": "Heat pump water heater",
"amountCents": 50000,
"unit": "per water heater"
},
{
"measure": "Aeroseal",
"maxAmountCents": 200000,
"unit": "per project"
},
{
"measure": "Attic insulation",
"percent": 0.4,
"maxAmountCents": 75000,
"unit": "percent of material and labor invoice"
},
{
"measure": "Duct sealing",
"maxAmountCents": 25000,
"unit": "per project"
},
{
"measure": "High-performance window",
"amountCents": 4500,
"unit": "per window"
},
{
"measure": "Clothes washer",
"amountCents": 5000,
"unit": "per appliance"
},
{
"measure": "Clothes dryer",
"amountCents": 5000,
"unit": "per appliance"
},
{
"measure": "Dishwasher",
"amountCents": 3000,
"unit": "per appliance"
},
{
"measure": "Freezer",
"amountCents": 500,
"unit": "per appliance"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "CenterPoint Indiana publishes residential rebate amounts for gas furnaces and boilers, electric heat pumps and cooling, weatherization, thermostats, windows and appliances.",
"sourceUrls": [
"[https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/home-improvement-rebates-and-discounts.aspx?au=res&sa=in](https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/home-improvement-rebates-and-discounts.aspx?au=res&sa=in)",
"[https://centerpointenergyindiana-residential-rebate.clearesult.com/](https://centerpointenergyindiana-residential-rebate.clearesult.com/)",
"[https://centerpointenergyindiana-residential-rebate.clearesult.com/browse-products/weatherization](https://centerpointenergyindiana-residential-rebate.clearesult.com/browse-products/weatherization)",
"[https://centerpointenergyindiana-residential-rebate.clearesult.com/browse-products/appliances](https://centerpointenergyindiana-residential-rebate.clearesult.com/browse-products/appliances)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "Weatherization offering includes Aeroseal and related building efficiency measures, with listed caps."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Air-source and ductless heat pump tiers are listed."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "Gas furnace rebates are listed by AFUE tier."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Supported as specific qualifying gas furnace, gas boiler, central A/C, heat pump, or ductless heat pump measures."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "Residential clothes washer and dryer rebates are listed."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Attic insulation rebate is published as 40% of eligible material and labor invoice cost up to $750."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Wi-Fi and smart programmable thermostat rebates are listed."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Some measures have instant discount alternatives; use one program path for the same equipment."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "Applications must be submitted within the program’s installation and submission windows, including 2026 installation deadlines where stated.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/home-improvement-rebates-and-discounts.aspx?au=res&sa=in](https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/home-improvement-rebates-and-discounts.aspx?au=res&sa=in)",
"[https://centerpointenergyindiana-residential-rebate.clearesult.com/](https://centerpointenergyindiana-residential-rebate.clearesult.com/)",
"[https://centerpointenergyindiana-residential-rebate.clearesult.com/browse-products/appliances](https://centerpointenergyindiana-residential-rebate.clearesult.com/browse-products/appliances)",
"[https://centerpointenergyindiana-residential-rebate.clearesult.com/browse-products/weatherization](https://centerpointenergyindiana-residential-rebate.clearesult.com/browse-products/weatherization)"
],
"evidenceText": "CenterPoint Indiana residential sources provide a detailed 2026 measure menu covering HVAC, thermostats, weatherization, windows, water heating and residential appliances.",
"reasoningNotes": "The old thermostat-only simple rule was too narrow and used an incorrect savings model; a measure catalog is needed.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3065",
"opportunityName": "CenterPoint Energy (Gas) - Commercial Energy Efficiency Rebates",
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
"hybrid_rate_plus_cap"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Select the qualifying CenterPoint Indiana business natural-gas measure and multiply the published per-unit, per-kBtu/hr, or per-linear-foot rate by the eligible quantity; most non-exempt measures are capped at 50% of total project cost.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 500,
"maxAmountCents": 500000,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.5,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": 2000000,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying commercial gas boiler",
"qualifying commercial gas furnace",
"boiler reset control",
"programmable thermostat",
"steam trap",
"pipe insulation",
"low-flow showerhead",
"pre-rinse spray valve"
],
"ineligibleCostCategories": [
"building-envelope insulation",
"electric HVAC",
"residential equipment",
"non-gas measures under this gas program"
],
"requiredInputs": [
"measure_type",
"unit_count",
"input_capacity_kBtu_per_hour",
"steam_pressure_class",
"linear_feet",
"project_cost",
"premise_annual_rebate_total"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"eligible_quantity",
"equipment_capacity",
"project_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "centerpoint_in_business_gas_2026",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Condensing hot water boiler under 300 MBH",
"amountCents": 50000,
"unit": "per boiler"
},
{
"measure": "Condensing hot water boiler 300-499 MBH",
"amountCents": 150000,
"unit": "per boiler"
},
{
"measure": "Condensing hot water boiler 500-999 MBH",
"amountCents": 250000,
"unit": "per boiler"
},
{
"measure": "Condensing hot water boiler 1000 MBH or larger",
"amountCents": 500000,
"unit": "per boiler"
},
{
"measure": "Steam boiler",
"rateDollars": 0.45,
"unit": "per kBtu/hr"
},
{
"measure": "Small furnace under 90 MBtu/h, 92% AFUE",
"amountCents": 10000,
"unit": "per furnace"
},
{
"measure": "Gas furnace 90 MBtu/h or larger, 92% AFUE",
"amountCents": 15000,
"unit": "per furnace"
},
{
"measure": "Gas furnace, 95% AFUE",
"amountCents": 25000,
"unit": "per furnace"
},
{
"measure": "Gas furnace, 97% AFUE",
"amountCents": 30000,
"unit": "per furnace"
},
{
"measure": "Boiler reset control",
"amountCents": 25000,
"unit": "per control"
},
{
"measure": "Programmable thermostat",
"amountCents": 7500,
"unit": "per thermostat"
},
{
"measure": "Dry-cleaner steam trap",
"amountCents": 25000,
"unit": "per trap"
},
{
"measure": "Low-pressure steam trap under 15 psi",
"amountCents": 5000,
"unit": "per trap"
},
{
"measure": "Steam pipe insulation",
"rateDollars": 10,
"unit": "per linear foot"
},
{
"measure": "Hot water pipe insulation",
"rateDollars": 3,
"unit": "per linear foot"
},
{
"measure": "Low-flow showerhead",
"amountCents": 500,
"unit": "per showerhead"
},
{
"measure": "Pre-rinse spray valve",
"amountCents": 500,
"unit": "per valve"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "CenterPoint Indiana business gas sources publish fixed and rate-based rebates for boilers, furnaces, controls, steam traps, pipe insulation and low-flow hot-water measures.",
"sourceUrls": [
"[https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/natural-gas-service-rebates?sa=in](https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/natural-gas-service-rebates?sa=in)",
"[https://www.centerpointenergy.com/en-us/Documents/Midwest/in-business/applications/2026_CNP-IN_Business_Prescriptive_Application.pdf](https://www.centerpointenergy.com/en-us/Documents/Midwest/in-business/applications/2026_CNP-IN_Business_Prescriptive_Application.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "boiler_controls_burner_retrofit",
"action": "keep",
"reason": "Current business gas table lists boiler reset controls at $250 per control."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "Current business gas table lists condensing hot-water boiler and steam-boiler rebates."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "Current business gas table lists gas furnace rebates by AFUE tier."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "delete_bad_edge",
"reason": "The supported insulation measures are pipe or steam-system insulation, not building-envelope insulation."
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"action": "keep",
"reason": "Current table supports low-flow showerheads and pre-rinse spray valves only."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Current business gas table supports programmable thermostats; it should not be generalized to zoning systems."
},
{
"retrofitTypeId": "steam_trap_replacement",
"action": "keep",
"reason": "Current business gas table lists steam trap rebates by trap type."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Except for stated exceptions, rebates may not exceed 50% of total project cost."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "Equipment must be installed within current program deadlines and applications generally submitted within 90 days.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/natural-gas-service-rebates?sa=in](https://www.centerpointenergy.com/en-us/business/save-energy-money/efficiency-programs-rebates/natural-gas-service-rebates?sa=in)",
"[https://www.centerpointenergy.com/en-us/Documents/Midwest/in-business/applications/2026_CNP-IN_Business_Prescriptive_Application.pdf](https://www.centerpointenergy.com/en-us/Documents/Midwest/in-business/applications/2026_CNP-IN_Business_Prescriptive_Application.pdf)"
],
"evidenceText": "CenterPoint’s 2026 Indiana business gas materials provide prescriptive amounts for heating equipment, controls, steam traps, pipe insulation and hot-water measures.",
"reasoningNotes": "The legacy boiler reset amount was from a wrong-state source; current Indiana gas source supports $250 per boiler reset control.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3752",
"opportunityName": "Entergy New Orleans - Residential Energy Efficiency Program",
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
"formulaText": "Use the Energy Smart New Orleans residential rebate amount for the qualifying installed system or ENERGY STAR appliance, with applications submitted within the stated purchase window and not exceeding eligible purchase price.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 1500,
"maxAmountCents": 100000,
"caps": {
"maxAwardCents": 100000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying central air conditioner",
"qualifying air-source heat pump",
"qualifying ductless mini-split heat pump",
"ENERGY STAR heat pump water heater",
"ENERGY STAR smart thermostat",
"ENERGY STAR residential appliances",
"eligible A/C tune-up"
],
"ineligibleCostCategories": [
"replacement windows",
"commercial laundry",
"commercial refrigeration",
"rebate amounts above purchase price"
],
"requiredInputs": [
"measure_type",
"unit_count",
"efficiency_tier",
"replacement_equipment_type",
"income_status_where_applicable",
"purchase_price"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"efficiency_tier",
"replacement_equipment_type",
"purchase_price"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "energy_smart_nola_residential_2026",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Heat pump water heater",
"amountCents": 100000,
"unit": "per water heater"
},
{
"measure": "Smart thermostat",
"amountCents": 10000,
"unit": "per thermostat"
},
{
"measure": "Heat pump clothes dryer",
"amountCents": 30000,
"unit": "per dryer"
},
{
"measure": "Electric clothes dryer",
"amountCents": 4000,
"unit": "per dryer"
},
{
"measure": "Clothes washer",
"amountCents": 4000,
"unit": "per washer"
},
{
"measure": "Refrigerator",
"amountCents": 1500,
"unit": "per refrigerator"
},
{
"measure": "Freezer",
"amountCents": 1500,
"unit": "per freezer"
},
{
"measure": "Window air conditioner",
"amountCents": 5000,
"unit": "per unit"
},
{
"measure": "Central air conditioner",
"minAmountCents": 15000,
"maxAmountCents": 20000,
"unit": "per system, tiered by efficiency"
},
{
"measure": "Air-source heat pump",
"minAmountCents": 20000,
"maxAmountCents": 25000,
"unit": "per system, tiered by efficiency"
},
{
"measure": "Ductless heat pump replacing heat pump",
"amountCents": 25000,
"unit": "per system"
},
{
"measure": "Ductless heat pump replacing electric strip heat",
"amountCents": 50000,
"unit": "per system"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "Energy Smart NOLA publishes 2026 residential appliance, thermostat, heat pump water heater, A/C, air-source heat pump and ductless heat pump rebate amounts.",
"sourceUrls": [
"[https://energysmartnola.info/residential-appliances/](https://energysmartnola.info/residential-appliances/)",
"[https://energysmartnola.info/eno_home_appliance_rebate_form_2026_fillable/](https://energysmartnola.info/eno_home_appliance_rebate_form_2026_fillable/)",
"[https://energysmartnola.info/a-c-solutions/](https://energysmartnola.info/a-c-solutions/)",
"[https://energysmartnola.info/home-performance-with-energy-star/](https://energysmartnola.info/home-performance-with-energy-star/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "A/C Solutions lists air-source and ductless heat pump rebates."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "The 2026 appliance form lists a heat pump water heater rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Supported as central A/C, air-source heat pump, ductless heat pump or A/C tune-up measures."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "Residential clothes washer and dryer rebates are listed."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Residential refrigerator and freezer rebates are listed; this must not be generalized to commercial refrigeration."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "The 2026 appliance form lists a smart thermostat rebate."
},
{
"retrofitTypeId": "window_replacement",
"action": "delete_bad_edge",
"reason": "The current source supports window air conditioners, not replacement windows."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate cannot exceed purchase price and must follow program submission rules."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "Appliance rebate applications must be submitted within 45 days of purchase under the 2026 form.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.energysmartnola.info/residents/](https://www.energysmartnola.info/residents/)",
"[https://energysmartnola.info/home-performance-with-energy-star/](https://energysmartnola.info/home-performance-with-energy-star/)",
"[https://energysmartnola.info/income-qualified-weatherization-assessment-form/](https://energysmartnola.info/income-qualified-weatherization-assessment-form/)",
"[https://energysmartnola.info/a-c-solutions/](https://energysmartnola.info/a-c-solutions/)",
"[https://energysmartnola.info/residential-appliances/](https://energysmartnola.info/residential-appliances/)",
"[https://energysmartnola.info/eno_home_appliance_rebate_form_2026_fillable/](https://energysmartnola.info/eno_home_appliance_rebate_form_2026_fillable/)"
],
"evidenceText": "Energy Smart NOLA current residential pages and 2026 forms list fixed rebates for HVAC, heat pump water heating, thermostats and residential appliances.",
"reasoningNotes": "Window was a false positive from window air conditioner; refrigeration is limited to residential refrigerator and freezer equipment.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1807",
"opportunityName": "Concord Municipal Light Plant - Residential Energy Efficiency Rebate Program",
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
"fixed_tier_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "For a qualifying residential Level 2 charging system, reimburse up to $250 of eligible 240V circuit, outlet, or home charging station costs. Heat pump water heater rebates use the replacement-fuel tier when applicable.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 18500,
"maxAmountCents": 75000,
"caps": {
"maxAwardCents": 75000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"Level 2 240V circuit",
"NEMA 14-50 or similar outlet",
"home charging station",
"qualifying heat pump water heater",
"licensed installation",
"eligible weatherization or heat pump measures where current program rules apply"
],
"ineligibleCostCategories": [
"vehicle purchase incentives",
"generic non-Level-2 EV charging",
"Mass Save natural gas equipment outside the CMLP record"
],
"requiredInputs": [
"measure_type",
"unit_count",
"installation_cost",
"old_water_heater_fuel",
"tank_gallons",
"UEF"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"installation_cost",
"old_water_heater_fuel"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "cmlp_home_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Residential Level 2 charging system",
"maxAmountCents": 25000,
"unit": "per charging system",
"eligibleBasis": "240V wiring, outlet, or home charging station cost"
},
{
"measure": "Heat pump water heater replacing oil, gas, or propane water heater",
"amountCents": 75000,
"unit": "per account"
},
{
"measure": "Heat pump water heater in new construction",
"amountCents": 75000,
"unit": "per account"
},
{
"measure": "Heat pump water heater replacing electric resistance water heater",
"amountCents": 18500,
"unit": "per account"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "CMLP home pages list a Level 2 charging incentive up to $250 and heat pump water heater tiers of $750 or $185 depending on replacement path.",
"sourceUrls": [
"[https://concordma.gov/1752/Your-Home](https://concordma.gov/1752/Your-Home)",
"[https://concordma.gov/1870/Rebates-for-your-Home](https://concordma.gov/1870/Rebates-for-your-Home)",
"[https://concordma.gov/3021/Heat-Pumps-for-Heating-and-Cooling](https://concordma.gov/3021/Heat-Pumps-for-Heating-and-Cooling)",
"[https://www.concordma.gov/2024/Heat-Pump-Water-Heaters](https://www.concordma.gov/2024/Heat-Pump-Water-Heaters)",
"[https://concordma.gov/2330/Home-Weatherization-Rebates](https://concordma.gov/2330/Home-Weatherization-Rebates)",
"[https://concordma.gov/2029/Solar-Panels](https://concordma.gov/2029/Solar-Panels)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "CMLP home resources include weatherization rebates."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "The source-backed EV building measure is specifically Level 2 charging; generic EV charger duplicates or overstates the edge."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "CMLP home resources include heat pumps for heating and cooling."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "The supported HVAC category is heat pumps, not broad high-efficiency HVAC replacement."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "CMLP home resources include weatherization and insulation-related rebates."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "CMLP lists an EV Level 2 Program covering up to $250 of qualifying charging-system installation cost."
},
{
"retrofitTypeId": "rooftop_solar_pv",
"action": "keep",
"reason": "CMLP home resources list a solar panel program, but current dollar logic needs separate source review before estimating."
}
],
"stackingRules": {
"stackableWithRebates": true,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "A New England Heat Pump Accelerator distributor or installer pass-through incentive may be in addition to the CMLP heat pump water heater rebate where applicable."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "Heat pump water heater applications use the stated 90-day window tied to electrical inspection approval.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://concordma.gov/1752/Your-Home](https://concordma.gov/1752/Your-Home)",
"[https://concordma.gov/1870/Rebates-for-your-Home](https://concordma.gov/1870/Rebates-for-your-Home)",
"[https://concordma.gov/3021/Heat-Pumps-for-Heating-and-Cooling](https://concordma.gov/3021/Heat-Pumps-for-Heating-and-Cooling)",
"[https://www.concordma.gov/2024/Heat-Pump-Water-Heaters](https://www.concordma.gov/2024/Heat-Pump-Water-Heaters)",
"[https://concordma.gov/2330/Home-Weatherization-Rebates](https://concordma.gov/2330/Home-Weatherization-Rebates)",
"[https://concordma.gov/2029/Solar-Panels](https://concordma.gov/2029/Solar-Panels)"
],
"evidenceText": "CMLP home rebate pages support Level 2 EV charging, heat pump water heaters, heat pumps, weatherization and solar resources.",
"reasoningNotes": "Solar appears real but no current public dollar formula was verified in the checked text; avoid estimating solar value from this repair.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Solar PV rebate value was not verified from a current public rate table in the checked material."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4807",
"opportunityName": "Wellesley Municipal Light Plant - Residential Energy Efficiency Rebate Program",
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
"formulaText": "Use the WMLP residential measure amount for the qualifying installed equipment. Level 2 EV charger rebates require Bring Your Own Charger enrollment; induction cooking rebates use the replacement-fuel tier.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 10000,
"maxAmountCents": 50000,
"caps": {
"maxAwardCents": 50000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": 2,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"permanent Level 2 EV charger",
"residential induction cooktop or stove",
"heat pump",
"heat pump water heater",
"weatherization",
"smart thermostat"
],
"ineligibleCostCategories": [
"commercial kitchen equipment",
"new construction where excluded",
"gas-replacement induction where WMLP excludes it",
"non-Level-2 EV charging"
],
"requiredInputs": [
"measure_type",
"unit_count",
"replacement_fuel",
"BYOC_enrollment",
"equipment_cost"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"replacement_fuel",
"BYOC_enrollment"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "wmlp_residential_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Permanent Level 2 EV charger",
"amountCents": 12500,
"unit": "per charger",
"condition": "BYOC enrollment required"
},
{
"measure": "Induction cooktop or stove replacing electric or new install in existing home",
"amountCents": 10000,
"unit": "per appliance"
},
{
"measure": "Induction cooktop or stove replacing propane",
"amountCents": 50000,
"unit": "per appliance"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "WMLP publishes fixed residential rebates including $125 for Level 2 EV chargers and induction cooking tiers of $100 or $500 based on replacement path.",
"sourceUrls": [
"[https://www.wellesleyma.gov/799/Electrification-and-Efficiency-Rebates](https://www.wellesleyma.gov/799/Electrification-and-Efficiency-Rebates)",
"[https://wellesleyma.gov/1711/Wellesley-Drives-Electric](https://wellesleyma.gov/1711/Wellesley-Drives-Electric)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "WMLP lists residential weatherization rebates."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "The source-backed EV charger incentive is specifically for permanent Level 2 charging with BYOC enrollment."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "WMLP lists residential heat pump rebates."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "WMLP lists residential heat pump water heater rebates."
},
{
"retrofitTypeId": "induction_cooking_equipment",
"action": "keep",
"reason": "Supported only as residential induction cooktop or stove equipment, not commercial kitchen equipment."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "WMLP lists a $125 Level 2 EV charger rebate with BYOC enrollment required."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "WMLP lists residential smart thermostat rebates."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "National Grid gas customers and new construction are excluded for specified WMLP rebates."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.wellesleyma.gov/799/Electrification-and-Efficiency-Rebates](https://www.wellesleyma.gov/799/Electrification-and-Efficiency-Rebates)",
"[https://wellesleyma.gov/1711/Wellesley-Drives-Electric](https://wellesleyma.gov/1711/Wellesley-Drives-Electric)"
],
"evidenceText": "WMLP current electrification page lists residential heat pumps, HPWHs, weatherization, induction, Level 2 EV charging and smart thermostat rebates.",
"reasoningNotes": "Induction match must be residential cooking only; commercial kitchen category is a source-edge mismatch.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3286",
"opportunityName": "Baltimore Gas & Electric Company - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"capped_percent_of_eligible_cost",
"fixed_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use the BGE residential fixed rebate for heat pump water heaters or smart thermostats. For Home Performance envelope work, rebate is based on modeled energy savings, capped at 75% of total project cost and the applicable project maximum.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 10000,
"maxAmountCents": 1500000,
"caps": {
"maxAwardCents": 1500000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.75,
"maxUnits": 3,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"ENERGY STAR heat pump water heater",
"home preparation for qualifying fuel-switch HPWH",
"ENERGY STAR smart thermostat with professional installation",
"air sealing",
"insulation",
"duct sealing"
],
"ineligibleCostCategories": [
"new efficient refrigerator or freezer purchase under the recycling offer",
"commercial refrigeration",
"non-modeled Home Performance work"
],
"requiredInputs": [
"measure_type",
"unit_count",
"modeled_energy_savings",
"project_cost",
"fuel_switch_scope",
"home_preparation_cost"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"project_cost",
"modeled_energy_savings",
"fuel_switch_scope"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "bge_residential_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "ENERGY STAR heat pump water heater",
"maxAmountCents": 160000,
"unit": "per water heater"
},
{
"measure": "Fuel-switch HPWH home preparation",
"percent": 0.75,
"maxAmountCents": 150000,
"unit": "percent of eligible home preparation costs"
},
{
"measure": "ENERGY STAR smart thermostat with professional installation",
"amountCents": 10000,
"unit": "per thermostat",
"maxUnits": 3
},
{
"measure": "Air sealing and insulation Home Performance project",
"percent": 0.75,
"maxAmountCents": 1000000,
"unit": "modeled savings-based project cap"
},
{
"measure": "Air sealing, insulation, and qualifying electric heat pump switch project",
"percent": 0.75,
"maxAmountCents": 1500000,
"unit": "modeled savings-based project cap"
},
{
"measure": "Duct sealing",
"amountCents": 50000,
"unit": "per project"
},
{
"measure": "Duct sealing combined with air sealing and insulation",
"amountCents": 75000,
"unit": "per project"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "BGE publishes HPWH rebates up to $1,600, smart thermostat rebates of $100, and Home Performance caps up to $10,000 or $15,000 at 75% of cost.",
"sourceUrls": [
"[https://www.bgesmartenergy.com/residential/rebates-and-discounts](https://www.bgesmartenergy.com/residential/rebates-and-discounts)",
"[https://bgesmartenergy.com/residential/rebates-and-discounts/heat-pump-water-heater](https://bgesmartenergy.com/residential/rebates-and-discounts/heat-pump-water-heater)",
"[https://bgesmartenergy.com/residential/help-me-save/home-performance/rebates](https://bgesmartenergy.com/residential/help-me-save/home-performance/rebates)",
"[https://bgesmartenergy.com/residential/help-me-save/heating-cooling](https://bgesmartenergy.com/residential/help-me-save/heating-cooling)",
"[https://bgesmartenergy.com/residential/help-me-save/appliance-recycling](https://bgesmartenergy.com/residential/help-me-save/appliance-recycling)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "BGE heating and cooling pathway supports qualifying heat pump categories, including geothermal according to current program mapping."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "BGE heating and cooling and Home Performance sources support qualifying heat pump measures."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "BGE lists heat pump water heater rebates up to $1,600."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Supported only through qualifying heating and cooling equipment categories, not as generic HVAC."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "delete_bad_edge",
"reason": "BGE refrigerator and freezer value is an appliance recycling reward, not a new high-efficiency refrigeration rebate."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Home Performance rebates include insulation with modeled savings and project caps."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Home Performance rebates list $100 per ENERGY STAR smart thermostat with professional installation."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Home Performance rebates are capped by project cost percentage and maximum award."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.bgesmartenergy.com/residential/rebates-and-discounts](https://www.bgesmartenergy.com/residential/rebates-and-discounts)",
"[https://bgesmartenergy.com/residential/help-me-save/home-performance/rebates](https://bgesmartenergy.com/residential/help-me-save/home-performance/rebates)",
"[https://bgesmartenergy.com/residential/help-me-save/heating-cooling](https://bgesmartenergy.com/residential/help-me-save/heating-cooling)",
"[https://bgesmartenergy.com/residential/rebates-and-discounts/heat-pump-water-heater](https://bgesmartenergy.com/residential/rebates-and-discounts/heat-pump-water-heater)",
"[https://bgesmartenergy.com/residential/help-me-save/appliance-recycling](https://bgesmartenergy.com/residential/help-me-save/appliance-recycling)"
],
"evidenceText": "BGE current residential sources support Home Performance, heating and cooling, smart thermostat, heat pump water heater and appliance recycling offers.",
"reasoningNotes": "Refrigeration edge is deleted because recycling old working appliances is a different value workflow than efficient refrigeration equipment.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3931",
"opportunityName": "FirstEnergy (Potomac Edison) - Residential Energy Efficiency Rebate Program",
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
"timing": "point_of_sale",
"formulaText": "Use the Potomac Edison Maryland residential HVAC or heat pump water heater discount amount for the qualifying measure and replacement path. Switch-to-electric projects may qualify for higher caps and electrical make-ready support.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 80000,
"maxAmountCents": 710000,
"caps": {
"maxAwardCents": 710000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"geothermal heat pump",
"cold-climate heat pump",
"air-source heat pump",
"ductless heat pump",
"central air conditioner",
"heat pump water heater",
"electrical make-ready for qualifying fuel switch"
],
"ineligibleCostCategories": [
"commercial dishwasher",
"gas furnace replacement under this current residential electric offer",
"commercial refrigeration",
"vehicle or demand response offers"
],
"requiredInputs": [
"measure_type",
"unit_count",
"replacement_fuel",
"equipment_efficiency_tier",
"electrical_make_ready_cost",
"participating_contractor"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"replacement_fuel",
"efficiency_tier",
"make_ready_scope"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "potomac_edison_md_residential_2026",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Geothermal heat pump",
"amountCents": 710000,
"unit": "per system"
},
{
"measure": "Cold-climate heat pump",
"amountCents": 170000,
"unit": "per system"
},
{
"measure": "Air-source heat pump",
"maxAmountCents": 150000,
"unit": "per system"
},
{
"measure": "Central air conditioner",
"maxAmountCents": 140000,
"unit": "per system"
},
{
"measure": "Ductless heat pump",
"maxAmountCents": 80000,
"unit": "per system"
},
{
"measure": "Switch-to-electric cold-climate heat pump",
"maxAmountCents": 400000,
"unit": "per system"
},
{
"measure": "Switch-to-electric air-source heat pump",
"maxAmountCents": 350000,
"unit": "per system"
},
{
"measure": "Switch-to-electric ductless heat pump",
"maxAmountCents": 300000,
"unit": "per system"
},
{
"measure": "Heat pump water heater",
"amountCents": 150000,
"unit": "per water heater"
},
{
"measure": "Switch-to-electric heat pump water heater",
"maxAmountCents": 250000,
"unit": "per water heater"
},
{
"measure": "Electrical make-ready for qualifying fuel switch",
"maxAmountCents": 300000,
"unit": "per project"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "Potomac Edison Maryland pages list residential discounts for geothermal, cold-climate and air-source heat pumps, ductless systems, central A/C, HPWHs and make-ready support.",
"sourceUrls": [
"[https://www.firstenergycorp.com/save_energy/save_energy_maryland/for_your_home.html](https://www.firstenergycorp.com/save_energy/save_energy_maryland/for_your_home.html)",
"[https://energysavemd-home.com/hvac/](https://energysavemd-home.com/hvac/)",
"[https://energysavemd-home.com/heat-pump-water-heater-discounts/](https://energysavemd-home.com/heat-pump-water-heater-discounts/)",
"[https://www.firstenergycorp.com/content/dam/customer/billinserts/2026-03%20MD%20EE%20Products%20HVAC.pdf](https://www.firstenergycorp.com/content/dam/customer/billinserts/2026-03%20MD%20EE%20Products%20HVAC.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Current Maryland HVAC materials list geothermal heat pump discounts."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Current Maryland HVAC materials list cold-climate, air-source and ductless heat pump discounts."
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"action": "delete_bad_edge",
"reason": "This is a residential Potomac Edison program; commercial dishwasher equipment is unsupported."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "delete_bad_edge",
"reason": "Current official residential Maryland sources checked did not support gas furnace replacement rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Supported as qualifying central A/C and heat pump equipment, not generic HVAC."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "delete_bad_edge",
"reason": "Residential refrigerator and freezer references are not commercial or high-efficiency refrigeration equipment rebates."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Residential energy-efficient product pages support lighting or product discounts; keep only for residential products."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Switch-to-electric incentives and make-ready support depend on project path and should not be double-counted across duplicate equipment rows."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.firstenergycorp.com/save_energy/save_energy_maryland/for_your_home.html](https://www.firstenergycorp.com/save_energy/save_energy_maryland/for_your_home.html)",
"[https://energysavemd-home.com/](https://energysavemd-home.com/)",
"[https://energysavemd-home.com/hvac/](https://energysavemd-home.com/hvac/)",
"[https://energysavemd-home.com/heat-pump-water-heater-discounts/](https://energysavemd-home.com/heat-pump-water-heater-discounts/)",
"[https://www.firstenergycorp.com/content/dam/customer/billinserts/2026-03%20MD%20EE%20Products%20HVAC.pdf](https://www.firstenergycorp.com/content/dam/customer/billinserts/2026-03%20MD%20EE%20Products%20HVAC.pdf)"
],
"evidenceText": "Official Potomac Edison Maryland program pages support residential HVAC, heat pump water heater, Home Performance and product discount pathways.",
"reasoningNotes": "Commercial dishwasher, commercial refrigeration and gas furnace edges were false or stale for the current residential electric program.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1932",
"opportunityName": "Anoka Municipal Utility - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
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
"timing": "post_purchase_rebate",
"formulaText": "Use the AMU residential rebate amount for the selected residential product. EV charger rebates are tiered by vehicle type and require a new Level 2 home charger; air conditioner rebates require the separate SEER2 and tonnage calculation.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 2500,
"maxAmountCents": 32500,
"caps": {
"maxAwardCents": 32500,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": 1,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"new Level 2 home EV charger",
"qualifying residential central air conditioner",
"LED bulbs",
"residential clothes washer",
"residential dishwasher",
"residential refrigerator or freezer"
],
"ineligibleCostCategories": [
"Level 1 EV charger",
"Level 3 EV charger",
"hybrid electric vehicle without plug",
"commercial dishwasher",
"commercial refrigeration",
"commercial lighting under this residential record"
],
"requiredInputs": [
"measure_type",
"unit_count",
"vehicle_type",
"SEER2",
"tonnage",
"purchase_date",
"purchase_price"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"vehicle_type",
"SEER2",
"tonnage"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "amu_residential_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Level 2 EV charger for battery electric vehicle",
"amountCents": 32500,
"unit": "per charger"
},
{
"measure": "Level 2 EV charger for plug-in hybrid electric vehicle",
"amountCents": 21500,
"unit": "per charger"
},
{
"measure": "LED bulbs",
"maxAmountCents": 5000,
"unit": "per application"
},
{
"measure": "Clothes washer",
"amountCents": 2500,
"unit": "per washer"
},
{
"measure": "Dishwasher",
"amountCents": 2500,
"unit": "per dishwasher"
},
{
"measure": "Refrigerator or freezer",
"minAmountCents": 2500,
"maxAmountCents": 7500,
"unit": "per appliance"
},
{
"measure": "Central air conditioner",
"valueModelKind": "custom_quote",
"unit": "SEER2 and tonnage calculation required"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "AMU residential pages list EV charger tiers, LED bulb, clothes washer, dishwasher, refrigerator/freezer and A/C rebates; A/C requires SEER2 and tonnage calculation.",
"sourceUrls": [
"[https://www.anokamunicipalutility.com/384/Residential-Rebates](https://www.anokamunicipalutility.com/384/Residential-Rebates)",
"[https://www.anokamn.gov/787/Residential-EV-Charger-Rebate](https://www.anokamn.gov/787/Residential-EV-Charger-Rebate)",
"[https://anokamunicipalutility.com/614/Residential-Clothes-Washer-Rebate](https://anokamunicipalutility.com/614/Residential-Clothes-Washer-Rebate)",
"[https://www.anokaminnesota.com/FormCenter/Anoka-Municipal-Utility-AMU-Rebate-Forms-13](https://www.anokaminnesota.com/FormCenter/Anoka-Municipal-Utility-AMU-Rebate-Forms-13)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "The rebate is specifically for new Level 2 home chargers, so the generic EV charger edge is overbroad and duplicative."
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"action": "delete_bad_edge",
"reason": "The source supports a residential dishwasher rebate, not commercial dishwasher equipment."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Residential air conditioner rebates are listed, but amount requires SEER2 and tonnage calculation."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "Residential clothes washer rebate is listed."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Residential refrigerator and freezer rebates are listed; do not generalize to commercial refrigeration."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Residential LED bulb rebate is listed."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "AMU EV page specifies new Level 2 residential chargers with BEV and PHEV rebate tiers."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "EV charger rebate is limited to one rebate per account per calendar year."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "EV and appliance rebate applications must be submitted within 12 months where stated.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.anokamunicipalutility.com/384/Residential-Rebates](https://www.anokamunicipalutility.com/384/Residential-Rebates)",
"[https://www.anokamn.gov/787/Residential-EV-Charger-Rebate](https://www.anokamn.gov/787/Residential-EV-Charger-Rebate)",
"[https://anokamunicipalutility.com/614/Residential-Clothes-Washer-Rebate](https://anokamunicipalutility.com/614/Residential-Clothes-Washer-Rebate)",
"[https://www.anokaminnesota.com/FormCenter/Anoka-Municipal-Utility-AMU-Rebate-Forms-13](https://www.anokaminnesota.com/FormCenter/Anoka-Municipal-Utility-AMU-Rebate-Forms-13)"
],
"evidenceText": "Anoka residential rebate pages provide fixed residential product amounts and a separate calculated A/C rebate path.",
"reasoningNotes": "The legacy $215 EV rule captured only the PHEV tier; the current Level 2 charger rebate has a $325 BEV tier.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5527",
"opportunityName": "Minnkota Power Cooperative (12 Utilities) - Value of Electricity Campaign Off-Peak Rebates",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"rate_table",
"hybrid_rate_plus_cap"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "For eligible Minnkota member-utility customers, multiply qualifying heat pump tons or EV charging kW by the published rate and apply the listed equipment or meter cap; local utility rules may add requirements.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 150000,
"caps": {
"maxAwardCents": 150000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": 150000,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"air-source heat pump",
"mini-split heat pump",
"ground-source heat pump",
"Level 2 EV charging equipment",
"Level 3 EV charging equipment",
"off-peak electric heating where local rules apply"
],
"ineligibleCostCategories": [
"gas furnace",
"fossil-fuel boiler",
"vehicle purchase",
"generic HVAC replacement outside electric heat pump or off-peak equipment"
],
"requiredInputs": [
"measure_type",
"tons",
"charging_kW",
"unit_count",
"off_peak_or_demand_response_enrollment",
"local_member_utility"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"tons",
"charging_kW",
"off_peak_enrollment",
"local_utility"
],
"rateTable": {
"tableId": "minnkota_value_of_electricity_2026",
"dimensions": [
"measure_type",
"capacity"
],
"rows": [
{
"measure": "Air-source heat pump or mini-split heat pump",
"rate": 150,
"rateUnit": "USD per ton installed",
"capCents": 150000,
"capBasis": "all eligible heating equipment rebates per off-peak meter"
},
{
"measure": "Ground-source heat pump",
"rate": 250,
"rateUnit": "USD per ton installed",
"capCents": 150000,
"capBasis": "all eligible heating equipment rebates per off-peak meter"
},
{
"measure": "Level 2 or Level 3 EV charging equipment",
"rate": 50,
"rateUnit": "USD per kW",
"capCents": 75000
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
"includedInUserFacingTotalDefault": true,
"evidenceText": "Minnkota publishes $150 per ton for air-source or mini-split heat pumps, $250 per ton for ground-source heat pumps, and $50 per kW for Level 2 or 3 EV charging.",
"sourceUrls": [
"[https://www.minnkota.com/our-programs/rebates-energy-incentives](https://www.minnkota.com/our-programs/rebates-energy-incentives)",
"[https://www.valueofelectricity.com/capture-the-value/electric-technology-rebates](https://www.valueofelectricity.com/capture-the-value/electric-technology-rebates)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "The source-backed EV incentive is specifically Level 2 or Level 3 charging equipment, not generic EV charging or vehicle purchase."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Ground-source heat pumps receive a published per-ton rebate."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Air-source and mini-split heat pumps receive a published per-ton rebate."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "delete_bad_edge",
"reason": "Program references are for electric or off-peak heating equipment, not high-efficiency fossil boilers."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "delete_bad_edge",
"reason": "Program references are for electric or off-peak heating equipment, not gas furnace retrofits."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Supported HVAC measures are specific electric heat pumps or off-peak equipment; generic HVAC replacement is overbroad."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Value of Electricity rebates include Level 2 charging equipment at a per-kW rate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Local member utilities may impose additional caps, documentation and demand-response requirements."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.minnkota.com/our-programs/rebates-energy-incentives](https://www.minnkota.com/our-programs/rebates-energy-incentives)",
"[https://www.valueofelectricity.com/capture-the-value/electric-technology-rebates](https://www.valueofelectricity.com/capture-the-value/electric-technology-rebates)"
],
"evidenceText": "Minnkota and Value of Electricity pages provide per-ton heat pump and per-kW EV charging rates with heating-equipment and EV charger caps.",
"reasoningNotes": "The legacy $150 rule used the wrong unit for EV; $150 is per ton for air-source or mini-split heat pumps.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2474",
"opportunityName": "Yellowstone Valley Electric Cooperative - Residential/Commercial Efficiency Rebate Program",
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
"rate_table"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Use the YVEC member rebate amount for the qualifying Energy Star appliance, smart thermostat tier, or add-on heat pump tonnage. Heat pump rebate is $200 per ton capped at $500.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 2500,
"maxAmountCents": 50000,
"caps": {
"maxAwardCents": 50000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"Energy Star residential dishwasher",
"Energy Star washing machine",
"Energy Star refrigerator",
"dryer",
"chest freezer",
"smart thermostat",
"add-on heat pump",
"geothermal or heat pump measures where listed by YVEC"
],
"ineligibleCostCategories": [
"commercial dishwasher",
"commercial refrigeration",
"non-member equipment",
"amounts submitted after program deadline"
],
"requiredInputs": [
"measure_type",
"unit_count",
"purchase_price",
"thermostat_purchase_price",
"tons"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"thermostat_purchase_price",
"tons"
],
"rateTable": {
"tableId": "yvec_heat_pump_rate",
"dimensions": [
"tons"
],
"rows": [
{
"measure": "Add-on heat pump",
"rate": 200,
"rateUnit": "USD per ton",
"capCents": 50000
}
]
},
"measureCatalog": {
"catalogId": "yvec_energy_star_and_controls",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Energy Star dishwasher",
"amountCents": 10000,
"unit": "per appliance"
},
{
"measure": "Energy Star washing machine",
"amountCents": 10000,
"unit": "per appliance"
},
{
"measure": "Energy Star refrigerator",
"amountCents": 10000,
"unit": "per appliance"
},
{
"measure": "Dryer",
"amountCents": 5000,
"unit": "per appliance"
},
{
"measure": "Chest freezer",
"amountCents": 15000,
"unit": "per appliance"
},
{
"measure": "Smart thermostat purchase $50-$149",
"amountCents": 2500,
"unit": "per thermostat"
},
{
"measure": "Smart thermostat purchase $150 or more",
"amountCents": 5000,
"unit": "per thermostat"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "YVEC indexed official pages identify fixed Energy Star appliance rebates, tiered smart thermostat rebates, and an add-on heat pump rebate of $200 per ton up to $500.",
"sourceUrls": [
"[https://www.yvec.com/member-services/rebates/](https://www.yvec.com/member-services/rebates/)",
"[https://www.yvec.com/member-services/rebates/energy-star-rebate/](https://www.yvec.com/member-services/rebates/energy-star-rebate/)",
"[https://www.yvec.com/member-services/rebates/add-on-heat-pump-rebate/](https://www.yvec.com/member-services/rebates/add-on-heat-pump-rebate/)",
"[https://www.yvec.com/smart-thermostat-rebate/](https://www.yvec.com/smart-thermostat-rebate/)",
"[https://www.yvec.com/member-services/rebates/water-heater-rebate/](https://www.yvec.com/member-services/rebates/water-heater-rebate/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "YVEC rebate pages identify geothermal or heat pump categories, though current public amount requires review if not using the add-on heat pump formula."
},
{
"retrofitTypeId": "high_efficiency_commercial_dishwasher",
"action": "delete_bad_edge",
"reason": "The verified dishwasher rebate is an Energy Star residential appliance rebate, not commercial kitchen equipment."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Supported only as YVEC heat pump categories, not broad HVAC replacement."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "YVEC Energy Star rebate table supports washing machines and dryers."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "YVEC supports residential refrigerators and chest freezers; do not generalize to commercial refrigeration."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "YVEC rebate resources identify Energy Star lighting, though current amount requires source confirmation."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "YVEC smart thermostat page provides rebate tiers by thermostat purchase price."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Applications generally must be submitted within the YVEC rebate window after purchase."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "Rebate submissions generally must be made no later than 90 days after purchase.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.yvec.com/member-services/rebates/](https://www.yvec.com/member-services/rebates/)",
"[https://www.yvec.com/member-services/rebates/energy-star-rebate/](https://www.yvec.com/member-services/rebates/energy-star-rebate/)",
"[https://www.yvec.com/member-services/rebates/add-on-heat-pump-rebate/](https://www.yvec.com/member-services/rebates/add-on-heat-pump-rebate/)",
"[https://www.yvec.com/smart-thermostat-rebate/](https://www.yvec.com/smart-thermostat-rebate/)",
"[https://www.yvec.com/member-services/rebates/water-heater-rebate/](https://www.yvec.com/member-services/rebates/water-heater-rebate/)"
],
"evidenceText": "YVEC official rebate pages support member rebates for Energy Star appliances, smart thermostats and heat pump equipment.",
"reasoningNotes": "Some YVEC pages were partly access-limited; amounts are based on official indexed pages and should be rechecked before production updates.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Lighting and geothermal dollar amounts were not fully verified in an accessible current official table."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22748",
"opportunityName": "North Carolina - Home Electrification and Appliance Rebate (HEAR) Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"capped_percent_of_eligible_cost",
"measure_catalog"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "capped_percent_of_eligible_cost",
"timing": "point_of_sale",
"formulaText": "For eligible HEAR households, Tier 1 may receive up to 100% of eligible cost to the measure cap; Tier 2 may receive up to 50% of eligible cost to the measure cap. Total HEAR rebates are capped at $14,000 per dwelling.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 800000,
"caps": {
"maxAwardCents": 800000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": 1400000,
"perSiteCapCents": 1400000,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"ENERGY STAR electric heat pump",
"heat pump water heater",
"insulation",
"mechanical ventilation",
"air sealing",
"electric range or cooktop",
"heat pump dryer or combo washer-dryer",
"electrical panel",
"electrical wiring supporting eligible electrification equipment"
],
"ineligibleCostCategories": [
"self-install projects",
"retroactive purchases",
"commercial kitchen equipment",
"industrial process electrification",
"same upgrade already receiving federal HOMES rebate"
],
"requiredInputs": [
"income_tier_percent_AMI",
"measure_type",
"eligible_project_cost",
"unit_count",
"registered_contractor_quote",
"prior_HEAR_rebates_for_dwelling",
"supporting_electrical_upgrade_cost"
],
"missingInputsForTypicalRetroFiEstimate": [
"income_tier_percent_AMI",
"measure_type",
"eligible_project_cost",
"registered_contractor_quote",
"prior_HEAR_rebates_for_dwelling"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "energy_saver_nc_hear",
"selectionInput": "measure_type",
"rows": [
{
"measure": "ENERGY STAR electric heat pump for space heating and cooling",
"maxAmountCents": 800000,
"unit": "per measure"
},
{
"measure": "Electrical panel",
"maxAmountCents": 400000,
"unit": "per dwelling"
},
{
"measure": "Electrical wiring",
"maxAmountCents": 250000,
"unit": "per dwelling"
},
{
"measure": "Heat pump water heater",
"maxAmountCents": 175000,
"unit": "per measure"
},
{
"measure": "Insulation, mechanical ventilation and air sealing",
"maxAmountCents": 160000,
"unit": "per project"
},
{
"measure": "Heat pump dryer or combo washer-dryer",
"maxAmountCents": 84000,
"unit": "per appliance"
},
{
"measure": "Electric range or cooktop",
"maxAmountCents": 84000,
"unit": "per appliance"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "Energy Saver NC HEAR provides instant discounts with federal measure caps and a $14,000 per-dwelling cap, using 100% or 50% cost coverage by income tier.",
"sourceUrls": [
"[https://www.energysavernc.org/about-the-program/home-electrification-and-appliance-rebates-hear/](https://www.energysavernc.org/about-the-program/home-electrification-and-appliance-rebates-hear/)",
"[https://www.energysavernc.org/frequently-asked-questions/](https://www.energysavernc.org/frequently-asked-questions/)",
"[https://www.deq.nc.gov/energy-climate/state-energy-office/energy-saver-north-carolina/energy-efficiency-rebates](https://www.deq.nc.gov/energy-climate/state-energy-office/energy-saver-north-carolina/energy-efficiency-rebates)",
"[https://www.deq.nc.gov/news/press-releases/2026/02/10/governor-stein-deq-announce-cost-saving-energy-program-now-available-all-100-counties](https://www.deq.nc.gov/news/press-releases/2026/02/10/governor-stein-deq-announce-cost-saving-energy-program-now-available-all-100-counties)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "HEAR includes air sealing with insulation and mechanical ventilation under a shared cap."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "HEAR includes ENERGY STAR electric heat pumps for space heating and cooling."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "HEAR includes heat pump water heaters up to the federal cap."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "HEAR supports qualifying electric heat pumps, not broad high-efficiency HVAC replacement."
},
{
"retrofitTypeId": "induction_cooking_equipment",
"action": "keep",
"reason": "Supported only as residential electric range or cooktop equipment, not commercial induction cooking."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "HEAR includes insulation with air sealing and ventilation under a shared cap."
},
{
"retrofitTypeId": "process_electrification_equipment",
"action": "delete_bad_edge",
"reason": "HEAR is a residential appliance and home electrification rebate, not industrial process electrification."
}
],
"stackingRules": {
"stackableWithRebates": false,
"stackableWithTaxCredits": true,
"mustDeductOtherIncentivesFromEligibleCost": true,
"notes": "The same measure cannot receive both HOMES and HEAR rebates; combined rebates cannot exceed purchase price."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.energysavernc.org/about-the-program/home-electrification-and-appliance-rebates-hear/](https://www.energysavernc.org/about-the-program/home-electrification-and-appliance-rebates-hear/)",
"[https://www.energysavernc.org/frequently-asked-questions/](https://www.energysavernc.org/frequently-asked-questions/)",
"[https://www.deq.nc.gov/energy-climate/state-energy-office/energy-saver-north-carolina/energy-efficiency-rebates](https://www.deq.nc.gov/energy-climate/state-energy-office/energy-saver-north-carolina/energy-efficiency-rebates)",
"[https://www.deq.nc.gov/news/press-releases/2026/02/10/governor-stein-deq-announce-cost-saving-energy-program-now-available-all-100-counties](https://www.deq.nc.gov/news/press-releases/2026/02/10/governor-stein-deq-announce-cost-saving-energy-program-now-available-all-100-counties)"
],
"evidenceText": "North Carolina’s HEAR program is active statewide through registered contractors and uses federal measure caps with income-tier cost shares.",
"reasoningNotes": "Existing fixed rules should be treated as caps, not expected amounts; project cost, income tier and prior HEAR use determine actual value.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3625",
"opportunityName": "Southern Power District - Residential Energy Efficiency Rebate Programs",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"rate_table",
"fixed_tier_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "For Southern Power District residential EnergyWise measures, use the published fixed or rate amount. Attic insulation is $0.30 per square foot up to $600; smart thermostat amount depends on primary heat fuel and professional installation.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 2500,
"maxAmountCents": 60000,
"caps": {
"maxAwardCents": 60000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"attic insulation",
"qualifying smart thermostat",
"qualifying heat pump",
"geothermal heat pump",
"heat pump water heater",
"residential induction cooktop or range"
],
"ineligibleCostCategories": [
"non-attic insulation",
"new construction and additions where excluded",
"commercial smart thermostat projects",
"commercial induction kitchen equipment",
"window air conditioners and PTAC/PTHP tune-ups where excluded"
],
"requiredInputs": [
"measure_type",
"square_feet_attic_insulation",
"thermostat_primary_heat_fuel",
"professional_installation",
"project_cost",
"unit_count"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"square_feet_attic_insulation",
"thermostat_primary_heat_fuel",
"professional_installation",
"unit_count"
],
"rateTable": {
"tableId": "southern_pd_energywise_attic_insulation",
"dimensions": [
"square_feet"
],
"rows": [
{
"measure": "Attic insulation",
"rate": 0.3,
"rateUnit": "USD per square foot",
"capCents": 60000
}
]
},
"measureCatalog": {
"catalogId": "southern_pd_smart_thermostat",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Smart thermostat with electric primary heat",
"amountCents": 7500,
"unit": "per thermostat"
},
{
"measure": "Smart thermostat with fossil-fuel primary heat",
"amountCents": 2500,
"unit": "per thermostat"
},
{
"measure": "Professional thermostat installation adder",
"amountCents": 2500,
"unit": "per thermostat"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "Southern Power District EnergyWise lists residential attic insulation at $0.30 per square foot up to $600 and smart thermostat incentives by heat-fuel and installation path.",
"sourceUrls": [
"[https://southernpd.energywisenebraska.com/residential/](https://southernpd.energywisenebraska.com/residential/)",
"[https://southernpd.com/smart-thermostats/](https://southernpd.com/smart-thermostats/)",
"[https://nppd.energywisenebraska.com/residential/](https://nppd.energywisenebraska.com/residential/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Residential EnergyWise pages identify geothermal heat pump incentives."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Residential EnergyWise pages list high-efficiency heat pumps including ductless and geothermal."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Residential EnergyWise pages list heat pump water heaters."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Supported HVAC measures are specific heat pumps or cooling tune-ups, not broad HVAC replacement."
},
{
"retrofitTypeId": "induction_cooking_equipment",
"action": "keep",
"reason": "Supported only as residential induction cooktop or range equipment, not commercial kitchen equipment."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "The current rebate is specifically for attic insulation, not wall, floor, crawlspace or foundation insulation."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Southern Power District lists residential smart thermostat incentives."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Dollar and Energy Savings Loans are financing and should not be counted as cash rebates."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://southernpd.energywisenebraska.com/residential/](https://southernpd.energywisenebraska.com/residential/)",
"[https://southernpd.com/smart-thermostats/](https://southernpd.com/smart-thermostats/)",
"[https://nppd.energywisenebraska.com/residential/](https://nppd.energywisenebraska.com/residential/)"
],
"evidenceText": "Southern Power District EnergyWise sources support attic insulation, smart thermostats, heat pumps, heat pump water heaters and residential induction equipment.",
"reasoningNotes": "The existing thermostat rule omitted the fossil-fuel tier and professional-installation adder; insulation must be narrowed to attic insulation.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2163",
"opportunityName": "New Hampshire Electric Co-op - Residential Energy Efficiency Rebate Programs",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "medium",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"rate_table",
"fixed_amount",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "For NHEC residential heat pump measures, use $250 per eligible air-source heat pump ton. For heat pump water heaters, use the $750 qualifying rebate. Weatherization requires current audit and program scope, so no simple public formula is assigned.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 25000,
"maxAmountCents": 75000,
"caps": {
"maxAwardCents": 75000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"air-source heat pump",
"heat pump water heater",
"residential weatherization",
"air sealing",
"insulation",
"eligible residential appliance rebates where current NHSaves rules apply"
],
"ineligibleCostCategories": [
"commercial refrigeration",
"unverified LED lighting rebates in this record",
"EV incentives under this energy efficiency record"
],
"requiredInputs": [
"measure_type",
"tons",
"unit_count",
"audit_scope",
"project_cost"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"tons",
"unit_count",
"audit_scope"
],
"rateTable": {
"tableId": "nhec_heat_pump_rate",
"dimensions": [
"tons"
],
"rows": [
{
"measure": "Standard air-source heat pump",
"rate": 250,
"rateUnit": "USD per ton"
}
]
},
"measureCatalog": {
"catalogId": "nhec_residential_water_heating",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Heat pump water heater",
"amountCents": 75000,
"unit": "per water heater"
},
{
"measure": "Weatherization, air sealing or insulation",
"valueModelKind": "custom_quote",
"unit": "audit and approved scope required"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "NHEC materials identify $250 per ton for standard air-source heat pumps, $750 for heat pump water heaters, and weatherization support requiring program scope.",
"sourceUrls": [
"[https://www.nhec.com/energy-savings/](https://www.nhec.com/energy-savings/)",
"[https://www.nhec.com/heat-pumps-and-heat-pump-water-heaters/](https://www.nhec.com/heat-pumps-and-heat-pump-water-heaters/)",
"[https://www.nhsaves.com/learn/incentives-and-rebates/](https://www.nhsaves.com/learn/incentives-and-rebates/)",
"[https://nhsaves.com/rebates-services-appliances/](https://nhsaves.com/rebates-services-appliances/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "NHEC and NHSaves pathways include residential weatherization and air sealing support."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "NHEC heat pump materials list per-ton air-source heat pump incentives."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "NHEC/NHSaves materials identify heat pump water heater rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "The verified HVAC formula is for heat pumps, not broad high-efficiency HVAC replacement."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "delete_bad_edge",
"reason": "Residential appliance references should not be mapped to commercial or broad refrigeration equipment."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "NHEC and NHSaves pathways include insulation/weatherization support."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "delete_bad_edge",
"reason": "No current NHEC source-backed LED lighting rebate was verified for this record."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Income-eligible weatherization and equipment replacement may have separate approval rules."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.nhec.com/energy-savings/](https://www.nhec.com/energy-savings/)",
"[https://www.nhec.com/heat-pumps-and-heat-pump-water-heaters/](https://www.nhec.com/heat-pumps-and-heat-pump-water-heaters/)",
"[https://www.nhsaves.com/learn/incentives-and-rebates/](https://www.nhsaves.com/learn/incentives-and-rebates/)",
"[https://nhsaves.com/rebates-services-appliances/](https://nhsaves.com/rebates-services-appliances/)"
],
"evidenceText": "NHEC energy-savings and NHSaves sources support residential heat pumps, HPWHs, audits, air sealing, insulation and weatherization.",
"reasoningNotes": "Weatherization should remain custom scope; lighting and commercial refrigeration edges are not source-backed in the current record.",
"humanReviewRequired": true,
"humanReviewReasons": [
"NHEC source confidence is medium because some current rebate amounts are routed through NHSaves rather than a single NHEC rate table."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3842",
"opportunityName": "El Paso Electric Company - Residential Efficiency Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"fixed_amount",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Use the El Paso Electric New Mexico residential comprehensive rebate amount for the selected qualifying measure. The verified simple fixed amount is $50 per ENERGY STAR smart thermostat; other listed measures require their current measure-specific table or application.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 5000,
"maxAmountCents": 5000,
"caps": {
"maxAwardCents": 5000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"ENERGY STAR smart thermostat",
"qualifying refrigerated cooling or heat pump equipment",
"cool roof",
"solar screens",
"ENERGY STAR windows",
"air sealing",
"duct sealing",
"insulation",
"heat pump water heater",
"residential induction cooktop or range"
],
"ineligibleCostCategories": [
"commercial induction cooking equipment",
"non-qualifying evaporative-only thermostat applications",
"commercial or industrial measures"
],
"requiredInputs": [
"measure_type",
"unit_count",
"equipment_efficiency",
"cooling_system_type",
"project_cost",
"application_measure_table"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"equipment_efficiency",
"cooling_system_type",
"project_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "epe_nm_residential_comprehensive",
"selectionInput": "measure_type",
"rows": [
{
"measure": "ENERGY STAR smart thermostat",
"amountCents": 5000,
"unit": "per thermostat"
},
{
"measure": "Other Residential Comprehensive measures",
"valueModelKind": "custom_quote",
"unit": "current measure table or application required"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "EPE New Mexico residential sources list many residential comprehensive measures and provide a verified $50 ENERGY STAR smart thermostat rebate.",
"sourceUrls": [
"[https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs](https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs)",
"[https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs/residential-comprehensive](https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs/residential-comprehensive)",
"[https://www.epesaver.com/residential-comprehensive/](https://www.epesaver.com/residential-comprehensive/)",
"[https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs/residential-comprehensive/energy-star-smart-thermostats](https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs/residential-comprehensive/energy-star-smart-thermostats)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "EPE New Mexico residential materials list air sealing."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "keep",
"reason": "EPE New Mexico residential materials list duct sealing and insulation."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "EPE New Mexico residential materials list heat pumps."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Supported through listed refrigerated cooling and heat pump measures, not generic HVAC."
},
{
"retrofitTypeId": "induction_cooking_equipment",
"action": "keep",
"reason": "Supported only as residential induction cooking, not commercial kitchen equipment."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "EPE New Mexico residential materials list insulation."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "EPE New Mexico page lists a $50 ENERGY STAR smart thermostat rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Measures are subject to EPE ENERGY STAR, AHRI, installation and application rules."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs](https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs)",
"[https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs/residential-comprehensive](https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs/residential-comprehensive)",
"[https://www.epesaver.com/residential-comprehensive/](https://www.epesaver.com/residential-comprehensive/)",
"[https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs/residential-comprehensive/energy-star-smart-thermostats](https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs/residential-comprehensive/energy-star-smart-thermostats)",
"[https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs/residential-comprehensive/heat-pump-water-heaters](https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs/residential-comprehensive/heat-pump-water-heaters)"
],
"evidenceText": "EPE New Mexico residential program pages support HVAC, envelope, thermostat, heat pump water heater and residential induction measures.",
"reasoningNotes": "Only the smart thermostat dollar amount was verified as a simple public formula here; other listed measures should use EPE’s current measure-specific forms.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Most EPE comprehensive measure dollar amounts were not captured in an accessible public rate table during this repair."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4619",
"opportunityName": "New Mexico Gas Company - Residential Efficiency Programs",
"repairStatus": "calculation_package_found",
"calculationStatus": "estimate_from_range",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"competitive_award_range",
"fixed_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use the NMGC residential measure amount or published range for the selected gas efficiency measure. Smart thermostats are $50 per qualifying unit; high-efficiency gas furnace or boiler amounts vary by equipment tier and current offer.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 5000,
"maxAmountCents": 67500,
"caps": {
"maxAwardCents": 67500,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"ENERGY STAR smart thermostat",
"high-efficiency gas furnace",
"high-efficiency gas boiler",
"air sealing",
"duct sealing",
"insulation",
"gas water heating",
"water-saving kit measures"
],
"ineligibleCostCategories": [
"electric heat pumps",
"electric HVAC replacement",
"commercial kitchen equipment",
"industrial measures",
"unlisted water fixtures beyond kit items"
],
"requiredInputs": [
"measure_type",
"unit_count",
"equipment_efficiency_tier",
"gas_space_heat_status",
"project_cost",
"contractor_scope"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"equipment_efficiency_tier",
"gas_space_heat_status",
"contractor_scope"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "nmgc_residential_rebates",
"selectionInput": "measure_type",
"rows": [
{
"measure": "ENERGY STAR smart thermostat",
"amountCents": 5000,
"unit": "per thermostat"
},
{
"measure": "High-efficiency gas furnace or boiler",
"minAmountCents": 32500,
"maxAmountCents": 67500,
"unit": "per qualifying unit, tiered by equipment and current offer"
},
{
"measure": "Duct sealing",
"maxAmountCents": 20000,
"unit": "per eligible project"
},
{
"measure": "Insulation, air sealing, or duct sealing package",
"minAmountCents": 20000,
"maxAmountCents": 100000,
"unit": "current scope-dependent offer"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "NMGC current residential sources list smart thermostats, gas furnace and boiler upgrades, insulation, air sealing, duct sealing, gas water heating and savings kit offers.",
"sourceUrls": [
"[https://www.nmgco.com/en/residential_rebate_programs](https://www.nmgco.com/en/residential_rebate_programs)",
"[https://nmgcgetrebates.com/residential-offers](https://nmgcgetrebates.com/residential-offers)",
"[https://nmgcgetrebates.com/insulation-rebates](https://nmgcgetrebates.com/insulation-rebates)",
"[https://nmgcgetrebates.com/smart-thermostat-rebates](https://nmgcgetrebates.com/smart-thermostat-rebates)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "NMGC residential offer includes air sealing for gas-space-heated homes where program rules are met."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "keep",
"reason": "NMGC residential offer includes duct sealing and insulation with program testing and scope requirements."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "NMGC residential offer includes high-efficiency gas boiler rebates."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "NMGC residential offer includes high-efficiency gas furnace rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "The supported HVAC equipment is gas furnace or gas boiler; broad electric or generic HVAC replacement is unsupported."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "NMGC residential offer includes insulation rebates for qualifying gas-space-heated homes."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "NMGC residential offer includes a $50 ENERGY STAR smart thermostat rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Use current NMGC/CLEAResult offer path for tiered gas equipment and envelope package amounts."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.nmgco.com/en/residential_rebate_programs](https://www.nmgco.com/en/residential_rebate_programs)",
"[https://nmgcgetrebates.com/residential-offers](https://nmgcgetrebates.com/residential-offers)",
"[https://nmgcgetrebates.com/insulation-rebates](https://nmgcgetrebates.com/insulation-rebates)",
"[https://nmgcgetrebates.com/smart-thermostat-rebates](https://nmgcgetrebates.com/smart-thermostat-rebates)"
],
"evidenceText": "NMGC current residential pages support gas-specific equipment, thermostat and envelope measures, with some values tiered or scope-dependent.",
"reasoningNotes": "The old $425 top-tier gas furnace/boiler rule may be stale or incomplete; current CLEAResult offers indicate higher up-to caps requiring equipment-tier review.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Current gas furnace and boiler tiers should be confirmed from the live NMGC rebate portal before storing exact tier rows."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4691",
"opportunityName": "ConEd (Gas) - Commercial and Industrial Energy Efficiency Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"rate_table",
"custom_quote",
"hybrid_rate_plus_cap"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "For qualifying Con Edison C&I measures, calculate incentive from approved annual savings using the published custom rate by fuel or measure type. Southeast Queens eligible projects may add $2,000 per kW saved, capped at 100% of eligible equipment upgrade cost.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
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
"building automation system software and programming",
"building envelope air sealing",
"exterior wall insulation",
"roof insulation",
"secondary windows",
"window replacements",
"custom gas-saving measures",
"HVAC and refrigeration measures",
"linear pipe insulation"
],
"ineligibleCostCategories": [
"broken BAS repair",
"retrocommissioning-only BAS work",
"unsupported furnace replacement",
"lighting controls under this gas-labeled record",
"projects installed before notice to proceed"
],
"requiredInputs": [
"measure_type",
"annual_kWh_savings",
"annual_therm_savings",
"annual_steam_savings_Mlbs",
"annual_fuel_oil_gallons_saved",
"peak_kW_savings",
"eligible_project_cost",
"Southeast_Queens_network_status",
"ConEdison_service_classification",
"preapproval_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"annual_savings_by_fuel",
"eligible_project_cost",
"peak_kW_savings",
"preapproval_status"
],
"rateTable": {
"tableId": "coned_ci_custom_2026",
"dimensions": [
"measure_type",
"savings_fuel"
],
"rows": [
{
"measure": "Building automation system upgrades and controls",
"savingsFuel": "electric",
"rate": 0.35,
"rateUnit": "USD per annual kWh saved"
},
{
"measure": "Building automation system upgrades and controls",
"savingsFuel": "steam",
"rate": 80,
"rateUnit": "USD per annual Mlbs steam saved"
},
{
"measure": "Building automation system upgrades and controls",
"savingsFuel": "gas",
"rate": 5,
"rateUnit": "USD per annual therm saved"
},
{
"measure": "Building automation system upgrades and controls",
"savingsFuel": "fuel oil",
"rate": 10,
"rateUnit": "USD per annual gallon saved"
},
{
"measure": "Building envelope",
"savingsFuel": "electric",
"rate": 0.85,
"rateUnit": "USD per annual kWh saved"
},
{
"measure": "Building envelope",
"savingsFuel": "steam",
"rate": 150,
"rateUnit": "USD per annual Mlbs steam saved"
},
{
"measure": "Building envelope",
"savingsFuel": "gas",
"rate": 25,
"rateUnit": "USD per annual therm saved"
},
{
"measure": "Building envelope",
"savingsFuel": "fuel oil",
"rate": 15,
"rateUnit": "USD per annual gallon saved"
},
{
"measure": "Custom electric",
"savingsFuel": "electric",
"rate": 0.35,
"rateUnit": "USD per annual kWh saved"
},
{
"measure": "Boiler outside air reset controls",
"savingsFuel": "gas",
"rate": 1,
"rateUnit": "USD per annual therm saved"
},
{
"measure": "Custom gas insulation for piping and related systems",
"savingsFuel": "gas",
"rate": 2,
"rateUnit": "USD per annual therm saved"
},
{
"measure": "Other custom gas",
"savingsFuel": "gas",
"rate": 5,
"rateUnit": "USD per annual therm saved"
},
{
"measure": "Southeast Queens Neighborhood Program bonus",
"savingsFuel": "peak electric",
"rate": 2000,
"rateUnit": "USD per peak kW saved",
"capPercentOfEligibleCost": 1
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
"evidenceText": "Con Edison C&I manual provides custom rates by fuel savings for BAS, building envelope, custom electric and gas measures, plus a Southeast Queens $2,000 per kW bonus.",
"sourceUrls": [
"[https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/save-with-energy-efficiency-upgrades](https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/save-with-energy-efficiency-upgrades)",
"[https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/save-with-energy-efficiency-upgrades/program-tools-technical-guidelines](https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/save-with-energy-efficiency-upgrades/program-tools-technical-guidelines)",
"[https://www.coned.com/-/media/files/coned/documents/save-energy-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/commercial-and-industrial-program/program-manual.pdf](https://www.coned.com/-/media/files/coned/documents/save-energy-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/commercial-and-industrial-program/program-manual.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "building_automation_system",
"action": "keep",
"reason": "C&I custom rates include building automation system upgrades and controls by fuel savings."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "Current C&I custom gas and HVAC pathways can support approved boiler-related gas-saving measures."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "delete_bad_edge",
"reason": "Current checked sources did not verify a prescriptive commercial furnace replacement measure for this gas record."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Current C&I pages support approved HVAC measures and custom projects, subject to savings-based approval."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Current C&I pages list refrigeration as an eligible prescriptive category."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "C&I custom table supports building envelope insulation and pipe insulation as savings-based measures."
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"action": "delete_bad_edge",
"reason": "Current gas-labeled sources checked did not support lighting controls for this record."
}
],
"stackingRules": {
"stackableWithRebates": false,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Projects may not receive another incentive from Con Edison, NYSERDA, or another utility for the same project where program rules prohibit duplication."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "Current manual requires pre-application and notice to proceed before installation; 2026 completion timing applies for current rates.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/save-with-energy-efficiency-upgrades](https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/save-with-energy-efficiency-upgrades)",
"[https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/save-with-energy-efficiency-upgrades/program-tools-technical-guidelines](https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/save-with-energy-efficiency-upgrades/program-tools-technical-guidelines)",
"[https://www.coned.com/-/media/files/coned/documents/save-energy-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/commercial-and-industrial-program/program-manual.pdf](https://www.coned.com/-/media/files/coned/documents/save-energy-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/commercial-and-industrial-program/program-manual.pdf)"
],
"evidenceText": "Con Edison C&I current sources support prescriptive and custom C&I efficiency incentives, with custom rates driven by approved annual savings.",
"reasoningNotes": "The legacy rule misread the Southeast Queens bonus: it is $2,000 per kW saved up to cost, not a flat $2,000 cap.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3485",
"opportunityName": "National Fuel (Gas) - Residential Energy Efficiency Rebates",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
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
"formulaText": "Use the current WeatherWise residential measure amount for qualifying National Fuel WNY home measures. Smart thermostats are $200 per connected or ENERGY STAR unit; duct and pipe insulation and ERV/HRV measures use published unit rates.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 20000,
"maxAmountCents": 75000,
"caps": {
"maxAwardCents": 75000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"connected or ENERGY STAR smart thermostat",
"duct sealing and insulation",
"domestic hot water pipe insulation",
"steam pipe insulation",
"hot water pipe insulation",
"energy recovery ventilator",
"heat recovery ventilator",
"air leakage sealing and insulation packages where current rules apply"
],
"ineligibleCostCategories": [
"battery storage",
"current furnace replacement under this WNY WeatherWise offer",
"current boiler replacement under this WNY WeatherWise offer",
"heat pump HVAC",
"broad HVAC replacement"
],
"requiredInputs": [
"measure_type",
"unit_count",
"linear_feet",
"project_scope",
"blower_door_test_where_required"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"unit_count",
"linear_feet",
"project_scope"
],
"rateTable": {
"tableId": "national_fuel_wny_weatherwise_rates",
"dimensions": [
"measure_type",
"quantity"
],
"rows": [
{
"measure": "Duct sealing and insulation",
"rate": 7.25,
"rateUnit": "USD per linear foot installed"
},
{
"measure": "Pipe insulation",
"rate": 2,
"rateUnit": "USD per linear foot"
}
]
},
"measureCatalog": {
"catalogId": "national_fuel_wny_weatherwise_fixed",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Connected or ENERGY STAR smart thermostat",
"amountCents": 20000,
"unit": "per thermostat"
},
{
"measure": "Energy or heat recovery ventilator",
"amountCents": 75000,
"unit": "per unit"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "National Fuel’s current WeatherWise materials list smart thermostat, duct and pipe insulation, ERV/HRV, air leakage sealing and insulation/weatherization measures.",
"sourceUrls": [
"[https://www.nationalfuel.com/utility/about-the-rebate-program/](https://www.nationalfuel.com/utility/about-the-rebate-program/)",
"[https://www.nationalfuel.com/utility/about-the-rebate-program/get-your-rebates-ny-home/](https://www.nationalfuel.com/utility/about-the-rebate-program/get-your-rebates-ny-home/)",
"[https://frontdoor.portal.poweredbyefi.org/initiative/national%20fuel/program/nfhe](https://frontdoor.portal.poweredbyefi.org/initiative/national%20fuel/program/nfhe)",
"[https://fuelingtomorrowtoday.com/weatherization/](https://fuelingtomorrowtoday.com/weatherization/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "battery_storage_system",
"action": "delete_bad_edge",
"reason": "Current National Fuel residential gas WeatherWise sources do not support battery storage."
},
{
"retrofitTypeId": "boiler_controls_burner_retrofit",
"action": "delete_bad_edge",
"reason": "Current WNY home sources checked did not list boiler reset or burner-control rebates."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "delete_bad_edge",
"reason": "Current National Fuel residential gas WeatherWise offer does not support heat pump HVAC rebates."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "delete_bad_edge",
"reason": "Current WNY home sources checked did not list boiler equipment rebates."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "delete_bad_edge",
"reason": "Current WNY home sources checked did not list furnace equipment rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Current offer is weatherization and controls oriented, not broad HVAC replacement."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Current residential materials support connected or ENERGY STAR smart thermostats."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "WeatherWise measure caps and testing requirements must be applied from the current application path."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.nationalfuel.com/utility/about-the-rebate-program/](https://www.nationalfuel.com/utility/about-the-rebate-program/)",
"[https://www.nationalfuel.com/utility/about-the-rebate-program/get-your-rebates-ny-home/](https://www.nationalfuel.com/utility/about-the-rebate-program/get-your-rebates-ny-home/)",
"[https://frontdoor.portal.poweredbyefi.org/initiative/national%20fuel/program/nfhe](https://frontdoor.portal.poweredbyefi.org/initiative/national%20fuel/program/nfhe)",
"[https://fuelingtomorrowtoday.com/weatherization/](https://fuelingtomorrowtoday.com/weatherization/)"
],
"evidenceText": "National Fuel’s current Western New York residential WeatherWise offer supports controls and weatherization measures, not the stale furnace, boiler, heat pump or battery edges.",
"reasoningNotes": "Most legacy HVAC edges are stale for the current WNY home page; value logic should be rebuilt around WeatherWise measures.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2004",
"opportunityName": "PSEG Long Island - Commercial Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"technical_assistance"
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
"formulaText": "Use the PSEG Long Island commercial measure rate for eligible equipment quantity, such as $95 per horsepower for variable speed drives. Custom and weatherization measures require approved project savings and pre-approval.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
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
"commercial weatherization",
"duct sealing and insulation",
"refrigeration equipment",
"compressed air improvements",
"variable speed drives",
"heat pump HVAC",
"heat pump water heating",
"energy recovery ventilation",
"heat recovery ventilation",
"kitchen demand control ventilation",
"chillers",
"building management system upgrades"
],
"ineligibleCostCategories": [
"residential weatherization under this commercial record",
"LED lighting not listed in the current 2026 commercial rebate menu unless separately approved",
"EV make-ready or fleet electrification under separate programs"
],
"requiredInputs": [
"measure_type",
"horsepower",
"CFM",
"fan_diameter_feet",
"unit_count",
"project_cost",
"approved_project_savings",
"preapproval_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"eligible_quantity",
"horsepower",
"CFM",
"project_cost",
"preapproval_status"
],
"rateTable": {
"tableId": "pseg_long_island_commercial_2026",
"dimensions": [
"measure_type",
"quantity"
],
"rows": [
{
"measure": "Variable speed drive",
"rate": 95,
"rateUnit": "USD per horsepower"
},
{
"measure": "Energy recovery ventilator",
"rate": 70,
"rateUnit": "USD per 100 CFM"
},
{
"measure": "Heat recovery ventilator",
"rate": 60,
"rateUnit": "USD per 100 CFM"
},
{
"measure": "High-volume low-speed fan",
"rate": 50,
"rateUnit": "USD per foot of fan diameter"
},
{
"measure": "Kitchen demand control ventilation",
"amountCents": 56000,
"unit": "per unit"
}
]
},
"measureCatalog": {
"catalogId": "pseg_li_commercial_nonprescriptive",
"selectionInput": "measure_type",
"rows": [
{
"measure": "Technical assistance benchmarking",
"maxAmountCents": 500000,
"cashValueClassification": "technical_assistance"
},
{
"measure": "Commercial weatherization",
"valueModelKind": "custom_quote",
"unit": "approved scope and savings required"
},
{
"measure": "Heat pump HVAC, refrigeration, chiller, BMS or other custom measure",
"valueModelKind": "custom_quote",
"unit": "approved project savings required"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "PSEG Long Island commercial sources list VSDs at $95 per horsepower plus ventilation rates, weatherization, refrigeration, heat pump, chiller, BMS and technical assistance pathways.",
"sourceUrls": [
"[https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/rebates](https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/rebates)",
"[https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/commercialefficiencyrebateprogram](https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/commercialefficiencyrebateprogram)",
"[https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/-/media/A820FFEE8E784363B5AB7459B1E3EC77.ashx](https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/-/media/A820FFEE8E784363B5AB7459B1E3EC77.ashx)",
"[https://www.psegliny.com/Newsroom/2025/030626-BizGrants](https://www.psegliny.com/Newsroom/2025/030626-BizGrants)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "Current PSEG Long Island commercial program includes commercial weatherization for eligible small businesses."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "keep",
"reason": "Commercial weatherization and HVAC pathways support approved duct sealing or insulation measures."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Current commercial program supports heat pump HVAC and other approved HVAC projects."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Current commercial program supports refrigeration equipment."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Current commercial weatherization includes insulation measures for eligible businesses."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "delete_bad_edge",
"reason": "LED lighting is not listed in the current 2026 commercial rebate menu checked for this record."
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"action": "keep",
"reason": "Current commercial table lists variable speed drives at $95 per horsepower."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Commercial projects generally require pre-approval and cannot be counted until PSEG Long Island approves the scope."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/rebates](https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/rebates)",
"[https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/commercialefficiencyrebateprogram](https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/commercialefficiencyrebateprogram)",
"[https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/-/media/A820FFEE8E784363B5AB7459B1E3EC77.ashx](https://www.psegliny.com/businessandcontractorservices/businessandcommercialsavings/-/media/A820FFEE8E784363B5AB7459B1E3EC77.ashx)",
"[https://www.psegliny.com/Newsroom/2025/030626-BizGrants](https://www.psegliny.com/Newsroom/2025/030626-BizGrants)"
],
"evidenceText": "PSEG Long Island current commercial sources support weatherization, VSD, refrigeration, HVAC, ventilation, chiller, BMS and technical-assistance pathways.",
"reasoningNotes": "The legacy $95 rule used the wrong unit; the source-backed rate is $95 per horsepower for variable speed drives.",
"humanReviewRequired": false,
"humanReviewReasons": []
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3592"
}

