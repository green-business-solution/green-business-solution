{
"schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
"researchedAt": "2026-07-02",
"source": "gpt_pro",
"batchNumber": 36,
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5254",
"opportunityName": "Brownsville Public Utilities Board - Residential/Small Commercial Rebate Program",
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
"fixed_tier_amount",
"capped_percent_of_eligible_cost"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Select the BPUB measure and apply the published per-unit, per-square-foot, per-ton, or percent-of-cost formula; apply measure and commercial caps.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 2500000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 50,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": 5000000,
"programBudgetCents": null
},
"eligibleCostCategories": [
"equipment cost",
"installation cost",
"listed test cost"
],
"ineligibleCostCategories": [
"standalone air sealing not tied to duct or insulation measures"
],
"requiredInputs": [
"measure_type",
"customer_type",
"project_cost",
"square_feet",
"R_value_added",
"HVAC_efficiency_tier",
"tons",
"unit_count",
"toilet_grade"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"project_size",
"equipment_tier",
"project_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "bpub_gogreen_rebate_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "attic or ceiling insulation",
"formula": "$0.01 times square feet insulated times R-value added",
"maxAwardCents": 50000
},
{
"measure": "duct replacement or repair retrofit",
"formula": "25% of eligible cost plus up to $125 pre-test and $125 final test reimbursement",
"maxPercentOfEligibleCost": 25,
"maxAwardCents": 50000
},
{
"measure": "residential ENERGY STAR windows",
"formula": "30% of invoice cost",
"maxAwardCents": 50000
},
{
"measure": "commercial ENERGY STAR windows",
"formula": "30% of invoice cost",
"maxAwardCents": 2500000
},
{
"measure": "solar screens or films",
"rateCents": 100,
"rateUnit": "per square foot installed",
"maxAwardCentsResidential": 50000,
"maxAwardCentsCommercial": 500000
},
{
"measure": "central air conditioner",
"amountCentsByTier": {
"SEER 15 or SEER2 14.3": 40000,
"SEER 16 or SEER2 15.2": 50000,
"SEER 17 or SEER2 16.2 plus": 60000
}
},
{
"measure": "heat pump HVAC",
"amountCentsByTier": {
"SEER 15 or SEER2 14.3": 35000,
"SEER 16 or SEER2 15.2": 40000,
"SEER 17 or SEER2 16.2 plus": 45000
}
},
{
"measure": "commercial chiller",
"rateCentsByTier": {
"1-20 tons": 10000,
"20.1-63 tons": 7500,
"over 63 tons": 6500
},
"rateUnit": "per ton",
"maxAwardCents": 2500000
},
{
"measure": "WaterSense high-efficiency toilet",
"amountCentsResidential": 5000,
"amountCentsCommercialGrade": 7500,
"amountCentsCommercialResidentialGrade": 5000,
"maxUnitsResidential": 3,
"maxAwardCentsCommercial": 1000000
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "BPUB publishes formulas for insulation, ducts, windows, films, HVAC, chillers and WaterSense toilets.",
"sourceUrls": [
"[https://www.brownsville-pub.com/gogreen/rebate-programs/](https://www.brownsville-pub.com/gogreen/rebate-programs/)",
"[https://www.brownsville-pub.com/gogreen/rebate-programs/hvac/](https://www.brownsville-pub.com/gogreen/rebate-programs/hvac/)",
"[https://www.brownsville-pub.com/gogreen/rebate-programs/watersense-high-efficiency-toilets/](https://www.brownsville-pub.com/gogreen/rebate-programs/watersense-high-efficiency-toilets/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "delete_bad_edge",
"reason": "No standalone BPUB air-sealing rebate was found; only duct-performance and insulation measures are supported."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "BPUB publishes heat pump HVAC rebate tiers by SEER or SEER2."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "BPUB publishes central AC, heat pump, window/wall AC and commercial chiller schedules."
},
{
"retrofitTypeId": "high_efficiency_toilet_urinal",
"action": "keep",
"reason": "BPUB publishes WaterSense high-efficiency toilet rebates."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "BPUB publishes an attic/ceiling insulation formula based on square feet and R-value added."
},
{
"retrofitTypeId": "window_replacement",
"action": "keep",
"reason": "BPUB publishes residential and commercial ENERGY STAR window formulas."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Commercial guidelines include a 50% project-cost cap and annual entity caps; residential and commercial caps vary by measure."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "Residential applications generally within 45 days; commercial chiller applications within 90 days and contact before installation.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.brownsville-pub.com/gogreen/rebate-programs/](https://www.brownsville-pub.com/gogreen/rebate-programs/)",
"[https://www.brownsville-pub.com/gogreen/rebate-programs/attic-ceiling-insulation/](https://www.brownsville-pub.com/gogreen/rebate-programs/attic-ceiling-insulation/)",
"[https://www.brownsville-pub.com/gogreen/rebate-programs/duct-flow-performance/](https://www.brownsville-pub.com/gogreen/rebate-programs/duct-flow-performance/)",
"[https://www.brownsville-pub.com/gogreen/rebate-programs/energy-star-windows/](https://www.brownsville-pub.com/gogreen/rebate-programs/energy-star-windows/)",
"[https://www.brownsville-pub.com/gogreen/rebate-programs/solar-screens-and-films/](https://www.brownsville-pub.com/gogreen/rebate-programs/solar-screens-and-films/)",
"[https://www.brownsville-pub.com/gogreen/rebate-programs/hvac/](https://www.brownsville-pub.com/gogreen/rebate-programs/hvac/)",
"[https://www.brownsville-pub.com/gogreen/rebate-programs/air-cooled-water-chiller/](https://www.brownsville-pub.com/gogreen/rebate-programs/air-cooled-water-chiller/)",
"[https://www.brownsville-pub.com/gogreen/rebate-programs/watersense-high-efficiency-toilets/](https://www.brownsville-pub.com/gogreen/rebate-programs/watersense-high-efficiency-toilets/)",
"[https://www.brownsville-pub.com/wp-content/uploads/2023/04/commercial-air-cooled-water-chiller-rebate-application.pdf](https://www.brownsville-pub.com/wp-content/uploads/2023/04/commercial-air-cooled-water-chiller-rebate-application.pdf)"
],
"evidenceText": "BPUB publishes measure-specific rebates for insulation, ducts, windows, films, HVAC, chillers and toilets.",
"reasoningNotes": "Repaired from no-rule to a measure catalog; air sealing is unsupported as a standalone retrofit. Input batch reviewed from uploaded file. ",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3833",
"opportunityName": "CenterPoint Energy - SCORE and CitySmart Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate",
"technical_assistance"
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
"timing": "post_installation_reimbursement",
"formulaText": "CenterPoint pays project incentives after completion and inspection based on program-approved electric demand and energy savings; current official pages do not publish a reusable rate table.",
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
"eligible_organization_type",
"measure_type",
"baseline_equipment",
"installed_equipment",
"deemed_or_measured_peak_kW_savings",
"annual_kWh_savings",
"project_cost",
"preapproval_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"program-approved savings",
"published current rate"
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
"evidenceText": "The program offers incentives based on demand and energy savings, but public pages do not expose a current rate.",
"sourceUrls": [
"[https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/Schools-and-Non-Profit-Efficiency-Program.aspx?au=bus&sa=ho](https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/Schools-and-Non-Profit-Efficiency-Program.aspx?au=bus&sa=ho)",
"[https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/score-city-smart-programs.aspx?au=bus&sa=ho](https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/score-city-smart-programs.aspx?au=bus&sa=ho)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "technical_assistance",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Eligible customers may receive technical assistance and energy-management support before implementing projects; no cash-equivalent value is published.",
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
"eligible_customer_type",
"facility_information",
"project_scope"
],
"missingInputsForTypicalRetroFiEstimate": [
"technical assistance scope"
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
"evidenceText": "CenterPoint describes technical assistance for eligible schools, cities, nonprofits and similar customers.",
"sourceUrls": [
"[https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/Schools-and-Non-Profit-Efficiency-Program.aspx?au=bus&sa=ho](https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/Schools-and-Non-Profit-Efficiency-Program.aspx?au=bus&sa=ho)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Official pages list HVAC and chillers as eligible efficiency measures."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Official pages list refrigeration as an eligible efficiency measure."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Official pages list lighting measures."
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"action": "keep",
"reason": "Official pages list motors and VFDs as eligible measures."
},
{
"retrofitTypeId": "window_film_shading_retrofit",
"action": "keep",
"reason": "Official pages list window film as an eligible measure."
},
{
"retrofitTypeId": "window_replacement",
"action": "delete_bad_edge",
"reason": "Current official program pages support window film, not window replacement."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": ""
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/Schools-and-Non-Profit-Efficiency-Program.aspx?au=bus&sa=ho](https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/Schools-and-Non-Profit-Efficiency-Program.aspx?au=bus&sa=ho)",
"[https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/score-city-smart-programs.aspx?au=bus&sa=ho](https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/score-city-smart-programs.aspx?au=bus&sa=ho)"
],
"evidenceText": "CenterPoint offers project incentives plus technical assistance, but no current public rate table was found.",
"reasoningNotes": "Use a custom quote pathway; old DSIRE rates were not used because the current official pages do not publish them.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5118",
"opportunityName": "City of San Marcos - Energy Efficient Home Rebate Program",
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
"formulaText": "Select the qualifying Energy Efficient Home measure and apply the published per-ton, per-square-foot, R-value, or percent-of-cost formula; total rebate cannot exceed 50% of purchase price.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
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
"eligibleCostCategories": [
"equipment cost",
"installation cost"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"measure_type",
"project_cost",
"tons",
"SEER_tier",
"conditioned_square_feet",
"insulated_square_feet",
"R_value_added",
"window_or_door_square_feet",
"film_square_feet"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"size_or_tonnage",
"project_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "san_marcos_energy_efficient_home_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "central air conditioner",
"rateCentsBySEER": {
"16": 15000,
"17": 17500,
"18": 20000,
"19 plus": 22500
},
"rateUnit": "per ton"
},
{
"measure": "heat pump",
"rateCentsBySEER": {
"16": 17500,
"17": 20000,
"18": 22500,
"19 plus": 25000
},
"rateUnit": "per ton"
},
{
"measure": "duct sealing or replacement",
"rateCents": 10,
"rateUnit": "per square foot conditioned space"
},
{
"measure": "attic floor insulation",
"formula": "square feet times R-value added times $0.0075"
},
{
"measure": "attic spray foam or wall insulation",
"formula": "square feet times R-value added times $0.0225"
},
{
"measure": "windows and doors",
"rateCents": 150,
"rateUnit": "per square foot"
},
{
"measure": "window film or solar screens",
"rateCents": 30,
"rateUnit": "per square foot"
},
{
"measure": "ENERGY STAR window air conditioner",
"formula": "30% of purchase price"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "San Marcos publishes a residential measure table with HVAC, ducts, insulation, windows, doors and film formulas.",
"sourceUrls": [
"[https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs](https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs)",
"[https://sanmarcostx.gov/DocumentCenter/View/15576](https://sanmarcostx.gov/DocumentCenter/View/15576)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "delete_bad_edge",
"reason": "Air sealing is not a standalone listed measure; duct sealing and listed envelope measures are supported."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "keep",
"reason": "The form lists duct sealing or replacement at a per-conditioned-square-foot amount."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "The form lists central air conditioner and heat pump rates by SEER tier and tonnage."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "The form lists attic and wall insulation formulas using square feet and R-value added."
},
{
"retrofitTypeId": "window_film_shading_retrofit",
"action": "keep",
"reason": "The form lists window film and solar screen rebates per square foot."
},
{
"retrofitTypeId": "window_replacement",
"action": "keep",
"reason": "The form lists ENERGY STAR window and door rebates per square foot."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Total rebate cannot exceed 50% of purchase price."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "Submit within 90 days after purchase.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs](https://www.sanmarcostx.gov/3720/Energy-Rebate-Programs)",
"[https://sanmarcostx.gov/DocumentCenter/View/15576](https://sanmarcostx.gov/DocumentCenter/View/15576)"
],
"evidenceText": "San Marcos publishes formulas for HVAC, ducts, insulation, windows, doors and solar film.",
"reasoningNotes": "Repaired the false motor/VFD mapping to the actual residential home rebate measure table.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5311",
"opportunityName": "Dominion Virginia Power - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"process_value"
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
"formulaText": "Apply the published HPWH gallon tier or smart-thermostat reward amount. Home Energy Evaluation measures are program-contractor scoped and require program measure values or quote.",
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
"measure_type",
"water_heater_gallons",
"replaced_water_heater_fuel",
"thermostat_enrollment",
"contractor_scope",
"installed_measure_cost"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"gallons_or_program_scope"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "dominion_va_residential_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "HPWH replacing electric water heater, 40-59 gallons",
"amountCents": 25000
},
{
"measure": "HPWH replacing electric water heater, 60 gallons or larger",
"amountCents": 40000
},
{
"measure": "smart thermostat rewards enrollment",
"amountCents": 2500
},
{
"measure": "smart thermostat rewards annual participation",
"amountCents": 2500,
"frequency": "annual"
},
{
"measure": "home energy evaluation installed measures",
"formula": "Program contractor identifies air sealing, insulation, duct and heat-pump measures; current public table value not exposed."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Dominion publishes HPWH gallon tiers and smart-thermostat rewards; contractor-scoped measures need program values.",
"sourceUrls": [
"[https://www.domsavings.com/home-program/water-energy-rebate](https://www.domsavings.com/home-program/water-energy-rebate)",
"[https://www.dominionenergy.com/virginia/save-energy/my-home/smart-thermostat-rewards](https://www.dominionenergy.com/virginia/save-energy/my-home/smart-thermostat-rewards)",
"[https://www.domsavings.com/home-program/home-energy-evaluation](https://www.domsavings.com/home-program/home-energy-evaluation)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Home Energy Evaluation materials list heat pump and ductless heat pump upgrades."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Dominion publishes HPWH rebates with gallon-size tiers for electric water heater replacement."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "delete_bad_edge",
"reason": "No current Dominion Virginia residential furnace replacement rebate was verified for this electric program."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "The verified HVAC support is heat pump upgrades and tune-ups, not broad HVAC replacement."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Home Energy Evaluation materials list insulation measures."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Dominion publishes smart thermostat rewards and evaluation-program thermostat measures."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": ""
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "Evaluation rebate applications generally within 45 days; marketplace and thermostat rules vary.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.dominionenergy.com/virginia/save-energy](https://www.dominionenergy.com/virginia/save-energy)",
"[https://www.domsavings.com/home-program/home-energy-evaluation](https://www.domsavings.com/home-program/home-energy-evaluation)",
"[https://www.domsavings.com/home-program/water-energy-rebate](https://www.domsavings.com/home-program/water-energy-rebate)",
"[https://www.dominionenergy.com/virginia/save-energy/my-home/smart-thermostat-rewards](https://www.dominionenergy.com/virginia/save-energy/my-home/smart-thermostat-rewards)",
"[https://uploads-ssl.webflow.com/658357cee09728d449379f11/65d3ab710ac3ab5603adf083_DSM%20VIII%20-%20DEV%20-%20Res%20-%20HEEP%20-%20Terms%20and%20Conditions%20-%20Final%20-%2002132024.pdf](https://uploads-ssl.webflow.com/658357cee09728d449379f11/65d3ab710ac3ab5603adf083_DSM%20VIII%20-%20DEV%20-%20Res%20-%20HEEP%20-%20Terms%20and%20Conditions%20-%20Final%20-%2002132024.pdf)"
],
"evidenceText": "Dominion publishes HPWH tiers and thermostat rewards; some evaluation measures require program scoping.",
"reasoningNotes": "Furnace and broad HVAC edges were removed because current Virginia residential sources support heat-pump-centered measures.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2199",
"opportunityName": "Mason County PUD 3 - Commercial and Industrial Energy Rebates",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "medium",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "custom_quote",
"timing": "post_installation_reimbursement",
"formulaText": "Commercial customers seeking heat pump incentives must contact PUD 3 Conservation; no current public commercial rate table was accessible.",
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
"commercial_customer_status",
"heat_pump_type",
"equipment_specs",
"project_cost",
"PUD3_conservation_quote"
],
"missingInputsForTypicalRetroFiEstimate": [
"PUD3 quote",
"current commercial rate"
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
"evidenceText": "Official PUD 3 material directs commercial heat-pump customers to contact Conservation for incentive details.",
"sourceUrls": [
"[https://www.pud3.org/ways-to-save/rebates-incentives/](https://www.pud3.org/ways-to-save/rebates-incentives/)",
"[https://www.pud3.org/faqs/heat-pump-incentives/](https://www.pud3.org/faqs/heat-pump-incentives/)",
"[https://www.pud3.org/faqs/ductless-heat-pump-incentives/](https://www.pud3.org/faqs/ductless-heat-pump-incentives/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "exterior_site_lighting_retrofit",
"action": "delete_bad_edge",
"reason": "Outdoor lighting service information is not evidence of a commercial exterior lighting efficiency rebate."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "PUD 3 identifies commercial heat-pump incentive inquiries as a Conservation Department contact item."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "delete_bad_edge",
"reason": "Current support found for this C&I target was commercial heat pumps, not heat pump water heaters."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "The source supports heat-pump inquiries only, not broad HVAC replacement."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "delete_bad_edge",
"reason": "Residential weatherization snippets are not support for this commercial and industrial target."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "delete_bad_edge",
"reason": "No commercial smart thermostat rebate was verified for this target."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": ""
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.pud3.org/ways-to-save/rebates-incentives/](https://www.pud3.org/ways-to-save/rebates-incentives/)",
"[https://www.pud3.org/faqs/heat-pump-incentives/](https://www.pud3.org/faqs/heat-pump-incentives/)",
"[https://www.pud3.org/faqs/ductless-heat-pump-incentives/](https://www.pud3.org/faqs/ductless-heat-pump-incentives/)",
"[https://www.pud3.org/faqs/appliance-incentives/](https://www.pud3.org/faqs/appliance-incentives/)",
"[https://www.pud3.org/electric-service/outdoor-lighting/](https://www.pud3.org/electric-service/outdoor-lighting/)",
"[https://www.pud3.org/ways-to-save/electric-vehicles/](https://www.pud3.org/ways-to-save/electric-vehicles/)"
],
"evidenceText": "Mason PUD 3 confirms commercial heat-pump inquiries but does not publish a current C&I amount.",
"reasoningNotes": "Official pages were partly inaccessible, so the only source-backed value pathway is a custom PUD 3 Conservation quote.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Official rate details were not accessible; commercial customers are directed to contact PUD 3 Conservation."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3277",
"opportunityName": "Barron Electric Cooperative - Commercial, Industrial, and Agricultural Energy Efficiency Rebate Program",
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
"timing": "post_purchase_rebate",
"formulaText": "Apply the listed 2026 agricultural, commercial or industrial rebate amount; rebate cannot exceed equipment cost and must be submitted within three months.",
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
"eligibleCostCategories": [
"equipment cost"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"measure_type",
"horsepower",
"fan_diameter_inches",
"unit_count",
"equipment_cost",
"purchase_install_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"equipment_size_or_count",
"equipment_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "barron_2026_ag_ci_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "dairy plate cooler or well water precooler",
"amountCents": 50000
},
{
"measure": "dairy refrigeration heat recovery with electric backup",
"amountCents": 30000
},
{
"measure": "electric forklift battery charger",
"amountCents": 20000
},
{
"measure": "low- or zero-energy livestock waterer",
"amountCents": 5000
},
{
"measure": "agricultural exhaust or circulation fan",
"rateCents": 100,
"rateUnit": "per inch diameter"
},
{
"measure": "scroll refrigeration compressor",
"rateCents": 3000,
"rateUnit": "per horsepower",
"maxAwardCents": 100000
},
{
"measure": "variable frequency drive",
"rateCents": 3000,
"rateUnit": "per horsepower",
"maxAwardCents": 100000
},
{
"measure": "custom efficiency equipment",
"formula": "custom incentive requires cooperative review"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Barron's 2026 form lists fixed and per-horsepower incentives and requires submission within three months.",
"sourceUrls": [
"[https://www.barronelectric.com/2026-energy-rebates](https://www.barronelectric.com/2026-energy-rebates)",
"[https://www.barronelectric.com/sites/default/files/2026%20Ag%20-%20fillable_0.pdf](https://www.barronelectric.com/sites/default/files/2026%20Ag%20-%20fillable_0.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "battery_storage_system",
"action": "delete_bad_edge",
"reason": "The listed forklift battery charger is not a building battery storage system."
},
{
"retrofitTypeId": "electric_forklift_material_handling",
"action": "keep",
"reason": "The form lists an electric forklift battery charger rebate."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "The form lists scroll refrigeration compressors and dairy refrigeration measures."
},
{
"retrofitTypeId": "refrigeration_controls_retrofit",
"action": "delete_bad_edge",
"reason": "Current form support was not found for vending-machine or broad refrigeration controls."
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"action": "keep",
"reason": "The form lists VFD rebates per horsepower with a per-drive cap."
},
{
"retrofitTypeId": "waste_heat_recovery",
"action": "keep",
"reason": "The form lists dairy refrigeration heat recovery with electric backup."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate must not exceed equipment cost."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "Submit within three months of purchase; valid through December 11, 2026 or until funds are depleted.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.barronelectric.com/2026-energy-rebates](https://www.barronelectric.com/2026-energy-rebates)",
"[https://www.barronelectric.com/sites/default/files/2026%20Ag%20-%20fillable_0.pdf](https://www.barronelectric.com/sites/default/files/2026%20Ag%20-%20fillable_0.pdf)"
],
"evidenceText": "Barron's 2026 form lists fixed and per-horsepower incentives for agricultural and C&I equipment.",
"reasoningNotes": "Repaired false battery storage and refrigeration-control edges; retained only listed equipment categories.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4194",
"opportunityName": "River Falls Municipal Utilities - Residential Energy Efficiency Rebate Program",
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
"fixed_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Use the applicable RFMU measure: Focus on Energy match up to $1,000/year and 75% combined cost cap, EV charger cap by customer type, thermostat cap, or central AC tune-up amount.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 100000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 75,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": 100000,
"programBudgetCents": null
},
"eligibleCostCategories": [
"equipment cost",
"installation cost for charger or efficiency project where allowed"
],
"ineligibleCostCategories": [
"used EV charger",
"charger included with vehicle",
"smart thermostat installation labor"
],
"requiredInputs": [
"measure_type",
"customer_type",
"project_cost",
"Focus_on_Energy_incentive",
"charger_heads",
"charger_level",
"thermostat_cost",
"tune_up_completion"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"project_cost_or_Focus_incentive"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "rfmu_powerful_choices_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "home efficiency bonus",
"formula": "RFMU matches Focus on Energy eligible electrification incentives up to $1,000 per year; combined incentive plus bonus cannot exceed 75% of installed project cost.",
"maxAwardCents": 100000
},
{
"measure": "residential Level 2 EV charger",
"formula": "up to 70% of charger and installation cost",
"maxAwardCents": 50000
},
{
"measure": "commercial or multifamily Level 2 or Level 3 charger",
"formula": "up to 70% of charger and installation cost",
"maxAwardCents": 250000
},
{
"measure": "dual-head commercial or multifamily charger",
"formula": "up to 70% of charger and installation cost",
"maxAwardCents": 500000
},
{
"measure": "smart thermostat",
"formula": "up to 75% of thermostat cost, excluding installation",
"maxAwardCents": 5000
},
{
"measure": "central air conditioner tune-up",
"amountCents": 5000
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "RFMU publishes caps for Focus matching, EV chargers, thermostats and AC tune-ups.",
"sourceUrls": [
"[https://www.rfmu.org/928/RFMU-Efficiency-Programs---Residential](https://www.rfmu.org/928/RFMU-Efficiency-Programs---Residential)",
"[https://www.rfmu.org/DocumentCenter/View/7132/RiverFalls_PowerfulChoices_RIV-ResidentialMultiFam_Flyer_85x11_Final](https://www.rfmu.org/DocumentCenter/View/7132/RiverFalls_PowerfulChoices_RIV-ResidentialMultiFam_Flyer_85x11_Final)",
"[https://www.rfcity.org/DocumentCenter/View/7129/RiverFalls_PowerfulChoices_EV-Charger_Flyer_85x11_Final](https://www.rfcity.org/DocumentCenter/View/7129/RiverFalls_PowerfulChoices_EV-Charger_Flyer_85x11_Final)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "RFMU publishes residential, multifamily and commercial EV charging station incentives."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "RFMU's efficiency bonus can match Focus incentives for air-source heat pumps and electrification upgrades."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Current evidence supports heat pumps and central AC tune-ups, not full high-efficiency AC replacement."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "RFMU publishes Level 2 EV charger caps for residential and nonresidential customers."
},
{
"retrofitTypeId": "rooftop_solar_pv",
"action": "delete_bad_edge",
"reason": "The residential efficiency page does not offer a rooftop solar PV rebate."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "RFMU publishes a smart thermostat bill credit capped by thermostat cost."
}
],
"stackingRules": {
"stackableWithRebates": true,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "The RFMU efficiency bonus stacks with a Focus on Energy incentive but combined incentive plus bonus cannot exceed 75% of installed project cost."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.rfmu.org/928/RFMU-Efficiency-Programs---Residential](https://www.rfmu.org/928/RFMU-Efficiency-Programs---Residential)",
"[https://www.rfmu.org/DocumentCenter/View/7132/RiverFalls_PowerfulChoices_RIV-ResidentialMultiFam_Flyer_85x11_Final](https://www.rfmu.org/DocumentCenter/View/7132/RiverFalls_PowerfulChoices_RIV-ResidentialMultiFam_Flyer_85x11_Final)",
"[https://www.rfcity.org/DocumentCenter/View/7129/RiverFalls_PowerfulChoices_EV-Charger_Flyer_85x11_Final](https://www.rfcity.org/DocumentCenter/View/7129/RiverFalls_PowerfulChoices_EV-Charger_Flyer_85x11_Final)",
"[https://www.rfmu.org/DocumentCenter/View/7133/RiverFalls_PowerfulChoices_Smart-Thermostats_Flyer_85x11_Final](https://www.rfmu.org/DocumentCenter/View/7133/RiverFalls_PowerfulChoices_Smart-Thermostats_Flyer_85x11_Final)",
"[https://www.rfcity.org/DocumentCenter/View/7135/RiverFalls_PowerfulChoices_CentralAir-Tune-Up_Flyer_85x11_Final](https://www.rfcity.org/DocumentCenter/View/7135/RiverFalls_PowerfulChoices_CentralAir-Tune-Up_Flyer_85x11_Final)"
],
"evidenceText": "RFMU publishes caps for efficiency bonus matching, EV chargers, smart thermostats and AC tune-ups.",
"reasoningNotes": "Solar was removed; broad HVAC was narrowed to heat pumps or AC tune-up pathways.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3426",
"opportunityName": "Rocky Mountain Power - wattsmart Business Program",
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
"hybrid_rate_plus_cap",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Apply the Wyoming wattsmart Business measure rate for the selected equipment; kWh-savings incentives use program-approved annual savings and are capped by project-cost and one-year-payback rules.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 70,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"energy efficiency project cost"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"measure_type",
"equipment_category",
"tons",
"annual_kWh_savings",
"watts_reduced",
"linear_feet",
"project_cost",
"control_type",
"business_rate_schedule"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"savings_or_size",
"project_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "rmp_wy_wattsmart_business_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "unitary commercial AC or heat pump",
"rateCentsMin": 2500,
"rateCentsMax": 7500,
"rateUnit": "per ton of cooling capacity"
},
{
"measure": "VRF heat pump",
"rateCents": 12500,
"rateUnit": "per ton"
},
{
"measure": "ground or groundwater heat pump loop",
"rateCents": 12500,
"rateUnit": "per ton"
},
{
"measure": "commercial ENERGY STAR clothes washer with electric water heat",
"amountCents": 10000
},
{
"measure": "residential HPWH or washer used in a business",
"formula": "use Wattsmart Homes qualified list and amount in effect on purchase date"
},
{
"measure": "adaptive refrigeration control or fast-acting refrigerated door",
"rateCents": 10,
"rateUnit": "per annual kWh saved"
},
{
"measure": "lighting retrofit",
"rateCentsMin": 10,
"rateCentsMax": 22,
"rateUnit": "per annual kWh saved"
},
{
"measure": "lighting controls only",
"rateCentsMin": 18,
"rateCentsMax": 20,
"rateUnit": "per annual kWh saved"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Wyoming wattsmart Business publishes rates for HVAC, appliances, lighting and refrigeration controls with project-cost caps.",
"sourceUrls": [
"[https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-wyoming.html](https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-wyoming.html)",
"[https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/wyoming/WY_wattsmart_Business_Incentive_Lists.pdf](https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/wyoming/WY_wattsmart_Business_Incentive_Lists.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "The Wyoming incentive list includes unitary, VRF and ground-source heat pump incentives."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "The business application supports residential heat pump water heaters used in a business."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "The business list includes commercial clothes washers and residential washers used in a business."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "The list supports selected refrigeration controls, doors and refrigerated case lighting."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "The list includes LED lighting retrofit and non-general illuminance incentives."
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"action": "keep",
"reason": "The list includes lighting controls-only and advanced controls incentives."
}
],
"stackingRules": {
"stackableWithRebates": false,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "RMP allows only one financial incentive per measure; incentives are capped by eligible project cost and simple payback rules."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-wyoming.html](https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-wyoming.html)",
"[https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/wyoming/WY_wattsmart_Business_Incentive_Lists.pdf](https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/wyoming/WY_wattsmart_Business_Incentive_Lists.pdf)",
"[https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/wyoming/WY_wattsmart_Business_Appliance_Office_Equip_Application.pdf](https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/wyoming/WY_wattsmart_Business_Appliance_Office_Equip_Application.pdf)"
],
"evidenceText": "Rocky Mountain Power publishes Wyoming rates for HVAC, lighting, appliances and refrigeration controls.",
"reasoningNotes": "Rows were narrowed to business-use measures and selected refrigeration controls, with Wattsmart cost-cap rules.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2035",
"opportunityName": "Sulphur Springs Valley EC - Residential Energy Efficiency Rebate",
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
"fixed_tier_amount",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Pay the fixed heat-pump tier amount for qualifying package, split, ductless or dual-fuel heat pumps; free energy audit is a no-cash service.",
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
"heat_pump_type",
"SEER2",
"HSPF2",
"tons",
"dual_fuel_status",
"invoice_date",
"audit_request"
],
"missingInputsForTypicalRetroFiEstimate": [
"heat_pump_type",
"efficiency_tier"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "ssvec_heat_pump_catalog",
"selectionInput": "heat_pump_type",
"rows": [
{
"measure": "package heat pump all-electric",
"amountCents": 50000
},
{
"measure": "split system heat pump all-electric",
"amountCents": 50000
},
{
"measure": "ductless heat pump all-electric",
"amountCents": 50000
},
{
"measure": "dual-fuel heat pump with gas furnace",
"amountCents": 20000
},
{
"measure": "residential energy audit",
"formula": "no-cost member service; no cash rebate amount"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "SSVEC publishes fixed rebates for heat-pump types and separately offers no-cost energy audits.",
"sourceUrls": [
"[https://www.ssvec.org/programs/rebates.php](https://www.ssvec.org/programs/rebates.php)",
"[https://www.ssvec.org/downloads/programs/Heat-Pump-Rebate-Form-2020.pdf](https://www.ssvec.org/downloads/programs/Heat-Pump-Rebate-Form-2020.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "energy_audit",
"action": "move_to_special_workflow",
"reason": "Energy audits are a no-cost service, not a physical retrofit or cash rebate."
},
{
"retrofitTypeId": "energy_management_system",
"action": "delete_bad_edge",
"reason": "No residential energy management system rebate was found."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "SSVEC publishes package, split, ductless and dual-fuel heat pump rebates."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "delete_bad_edge",
"reason": "Dual-fuel heat pump support is not a standalone high-efficiency furnace rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "The rebate is limited to heat pumps, not broad HVAC replacement."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": ""
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "Submit heat-pump rebate form and invoice within 60 days.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.ssvec.org/programs/rebates.php](https://www.ssvec.org/programs/rebates.php)",
"[https://www.ssvec.org/programs/efficiency.php](https://www.ssvec.org/programs/efficiency.php)",
"[https://www.ssvec.org/downloads/programs/Heat-Pump-Rebate-Form-2020.pdf](https://www.ssvec.org/downloads/programs/Heat-Pump-Rebate-Form-2020.pdf)"
],
"evidenceText": "SSVEC publishes fixed heat-pump rebates and a no-cost residential energy audit service.",
"reasoningNotes": "Energy management and furnace edges were removed; dual-fuel is retained only as a heat-pump tier.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1867",
"opportunityName": "LADWP - Residential Energy Efficiency Rebate Program",
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
"fixed_tier_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Select the LADWP Consumer Rebate Program measure and apply its published per-square-foot, per-ton, or fixed HPWH tier amount.",
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
"ineligibleCostCategories": [
"new construction",
"ADUs where excluded",
"unconditioned roof areas"
],
"requiredInputs": [
"measure_type",
"roof_slope",
"SRI",
"roof_square_feet",
"window_square_feet",
"SEER2",
"HSPF2",
"HVAC_tons",
"HPWH_gallons",
"HPWH_UEF",
"permit_status",
"purchase_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"area_or_tonnage",
"efficiency_tier"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "ladwp_crp_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "cool roof",
"rateCentsMin": 20,
"rateCentsMax": 60,
"rateUnit": "per square foot",
"tierBasis": "roof slope and SRI"
},
{
"measure": "ENERGY STAR residential windows or glass doors",
"rateCents": 200,
"rateUnit": "per square foot"
},
{
"measure": "central or split HVAC",
"rateCentsMin": 10000,
"rateCentsMax": 12000,
"rateUnit": "per ton"
},
{
"measure": "ducted heat pump HVAC",
"rateCentsMin": 100000,
"rateCentsMax": 125000,
"rateUnit": "per ton"
},
{
"measure": "ductless mini- or multi-split heat pump HVAC",
"rateCentsMin": 150000,
"rateCentsMax": 250000,
"rateUnit": "per ton"
},
{
"measure": "heat pump water heater",
"amountCentsMin": 150000,
"amountCentsMax": 250000,
"tierBasis": "tank size and UEF"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "LADWP publishes CRP rates for cool roofs, windows, HVAC, heat-pump HVAC and HPWHs.",
"sourceUrls": [
"[https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program](https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program)",
"[https://www.ladwp.com/crp](https://www.ladwp.com/crp)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "cool_roof_reflective_roof",
"action": "keep",
"reason": "LADWP publishes cool-roof rebates per square foot by slope and SRI."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "LADWP publishes ducted and ductless heat-pump HVAC rebates per ton."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "LADWP publishes HPWH fixed tiers by tank size and UEF."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "LADWP publishes central and split HVAC rebates by SEER2 and tonnage."
},
{
"retrofitTypeId": "window_replacement",
"action": "keep",
"reason": "LADWP publishes ENERGY STAR window and glass door rebates per square foot."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": ""
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "Apply within 12 months of purchase and installation.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program](https://www.ladwp.com/residential-services/assistance-programs/consumer-rebate-program)",
"[https://www.ladwp.com/crp](https://www.ladwp.com/crp)",
"[https://www.ladwp.com/sites/default/files/2026-04/2026_FORMS_CRP_Application_NoAtticRebate.pdf](https://www.ladwp.com/sites/default/files/2026-04/2026_FORMS_CRP_Application_NoAtticRebate.pdf)"
],
"evidenceText": "LADWP publishes CRP formulas for cool roofs, windows, HVAC, heat-pump HVAC and HPWHs.",
"reasoningNotes": "New construction, ADUs and unconditioned cool-roof areas remain excluded by program rules.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1920",
"opportunityName": "Silicon Valley Power - Residential Energy Efficiency Rebate Program",
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
"fixed_tier_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Apply the current SVP residential electrification amount for the selected appliance or electrical upgrade; income bonuses apply only when the source criteria are met.",
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
"equipment cost",
"eligible electrical upgrade cost"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"measure_type",
"replacement_fuel",
"income_bonus_eligibility",
"equipment_specifications",
"permit_status",
"project_cost",
"purchase_install_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"replacement_fuel",
"income_bonus_status"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "svp_residential_electrification_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "HPWH gas-to-electric",
"amountCents": 550000,
"maxAmountCentsWithIncomeBonuses": 650000
},
{
"measure": "HPWH electric-to-electric",
"amountCents": 50000,
"maxAmountCentsWithIncomeBonuses": 100000
},
{
"measure": "induction range replacing gas",
"amountCents": 75000
},
{
"measure": "induction cooktop replacing gas",
"amountCents": 25000
},
{
"measure": "wall oven replacing gas",
"amountCents": 20000
},
{
"measure": "heat pump clothes dryer replacing gas",
"amountCents": 25000
},
{
"measure": "electric clothes dryer replacing gas",
"amountCents": 15000
},
{
"measure": "HVAC tune-up",
"amountCents": 7500
},
{
"measure": "main panel upgrade tied to electrification",
"amountCents": 150000
},
{
"measure": "new circuit tied to electrification",
"amountCents": 50000,
"maxAwardCents": 200000
},
{
"measure": "smart electrical panel",
"amountCents": 400000
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "SVP publishes current HPWH, induction, dryer, tune-up, panel and circuit rebate amounts; EV charger and heat-pump HVAC rebates ended.",
"sourceUrls": [
"[https://www.siliconvalleypower.com/residents/rebates](https://www.siliconvalleypower.com/residents/rebates)",
"[https://www.siliconvalleypower.com/residents/rebates/residential-electrification-program-rules](https://www.siliconvalleypower.com/residents/rebates/residential-electrification-program-rules)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "SVP states the residential EV charging station rebate ended January 31, 2026."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "delete_bad_edge",
"reason": "SVP states the heat pump HVAC rebate ended January 31, 2026."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "SVP publishes current HPWH gas-to-electric and electric-to-electric rebates."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "SVP publishes current electric and heat-pump clothes dryer rebates."
},
{
"retrofitTypeId": "induction_cooking_equipment",
"action": "keep",
"reason": "SVP publishes residential induction range and cooktop rebates; this is not commercial kitchen equipment."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Income bonus amounts require separate program qualification."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "Apply within 60 days of installation unless measure rules state otherwise.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.siliconvalleypower.com/residents/rebates](https://www.siliconvalleypower.com/residents/rebates)",
"[https://www.siliconvalleypower.com/residents/rebates/residential-electrification-program-rules](https://www.siliconvalleypower.com/residents/rebates/residential-electrification-program-rules)",
"[https://www.siliconvalleypower.com/residents/electrification-programs](https://www.siliconvalleypower.com/residents/electrification-programs)",
"[https://siliconvalleypower2.my.site.com/](https://siliconvalleypower2.my.site.com/)"
],
"evidenceText": "SVP publishes current electrification rebates but closed EV charging and heat-pump HVAC rebates.",
"reasoningNotes": "Induction was retained as a residential cooking measure despite the legacy commercial-kitchen parent category.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5798",
"opportunityName": "Efficiency Works - Residential Energy Efficiency Rebate Program (Offered by 4 Utilities)",
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
"fixed_tier_amount",
"per_unit_award"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Apply the 2026 Efficiency Works measure amount or rate for the selected retrofit; incentives are capped at project cost and larger incentives may require preapproval.",
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
"eligibleCostCategories": [
"equipment cost",
"installation cost"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"participating_utility",
"measure_type",
"project_cost",
"installed_square_feet",
"R_value_or_leakage_reduction",
"tons",
"equipment_tier",
"replacement_fuel",
"preapproval_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"project_size_or_tier",
"project_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "efficiency_works_residential_2026_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "ducted or partially ducted ASHP Tier 1",
"amountCents": 150000
},
{
"measure": "ducted or partially ducted ASHP Tier 2 cold climate",
"amountCents": 200000
},
{
"measure": "non-ducted ASHP",
"rateCents": 50000,
"rateUnit": "per ton"
},
{
"measure": "non-ducted ASHP replacing electric baseboard",
"rateCents": 100000,
"rateUnit": "per ton"
},
{
"measure": "ground-source heat pump",
"amountCents": 300000
},
{
"measure": "heat pump water heater",
"amountCentsElectricOrPropaneReplacement": 60000,
"amountCentsGasReplacement": 40000
},
{
"measure": "windows",
"rateCentsMin": 375,
"rateCentsMax": 500,
"rateUnit": "per square foot"
},
{
"measure": "insulation",
"rateCentsMin": 77,
"rateCentsMax": 116,
"rateUnit": "per square foot"
},
{
"measure": "air sealing",
"amountCentsByLeakageReduction": {
"over 15%": 31000,
"over 25%": 46000,
"over 33%": 62000,
"over 50%": 77000
}
},
{
"measure": "bundle bonus",
"amountCents": 200000
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Efficiency Works publishes 2026 rates for heat pumps, geothermal, HPWHs, windows, doors, insulation and air sealing.",
"sourceUrls": [
"[https://efficiencyworks.org/for-your-home-rebates-and-incentives/](https://efficiencyworks.org/for-your-home-rebates-and-incentives/)",
"[https://efficiencyworks.org/wp-content/uploads/2025/02/EW_HVAC-Incentives.pdf](https://efficiencyworks.org/wp-content/uploads/2025/02/EW_HVAC-Incentives.pdf)",
"[https://efficiencyworks.org/wp-content/uploads/2025/02/EW_Insulation-Air-Sealing-Incentives.pdf](https://efficiencyworks.org/wp-content/uploads/2025/02/EW_Insulation-Air-Sealing-Incentives.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "Efficiency Works publishes air-sealing tiers based on leakage-reduction percentage."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Efficiency Works publishes a ground-source heat pump rebate amount."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Efficiency Works publishes ducted and non-ducted heat pump incentive amounts."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Generic high-efficiency HVAC is unsupported unless it is an eligible heat pump or listed ventilation/electrification measure."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Efficiency Works publishes insulation rates per square foot by area type."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate plus bundle bonus cannot exceed project cost; incentives over stated thresholds may require preapproval."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "Applications generally within 45 days after completion or purchase; incentives over $2,500 may require preapproval.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://efficiencyworks.org/for-your-home-rebates-and-incentives/](https://efficiencyworks.org/for-your-home-rebates-and-incentives/)",
"[https://efficiencyworks.org/wp-content/uploads/2025/02/Efficiency-Works-Residential-Programs-Guide-2026.pdf](https://efficiencyworks.org/wp-content/uploads/2025/02/Efficiency-Works-Residential-Programs-Guide-2026.pdf)",
"[https://efficiencyworks.org/wp-content/uploads/2025/02/EW_HVAC-Incentives.pdf](https://efficiencyworks.org/wp-content/uploads/2025/02/EW_HVAC-Incentives.pdf)",
"[https://efficiencyworks.org/wp-content/uploads/2025/02/EW_Windows-Incentives.pdf](https://efficiencyworks.org/wp-content/uploads/2025/02/EW_Windows-Incentives.pdf)",
"[https://efficiencyworks.org/wp-content/uploads/2025/02/EW_Insulation-Air-Sealing-Incentives.pdf](https://efficiencyworks.org/wp-content/uploads/2025/02/EW_Insulation-Air-Sealing-Incentives.pdf)",
"[https://efficiencyworks.org/wp-content/uploads/2025/02/Retail-Products-Electric-Rebates.pdf](https://efficiencyworks.org/wp-content/uploads/2025/02/Retail-Products-Electric-Rebates.pdf)"
],
"evidenceText": "Efficiency Works publishes 2026 residential rates for heat pumps, envelope and electrification measures.",
"reasoningNotes": "Generic HVAC was removed; geothermal means ground-source heat pump, not pump replacement.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22775",
"opportunityName": "Affordable Home Electrification Program (AHEP)",
"repairStatus": "non_monetary_workflow",
"calculationStatus": "non_monetary_workflow",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"non_cash",
"technical_assistance",
"process_value"
],
"primaryValueModelKinds": [
"non_cash_process_value"
],
"effects": [
{
"effectType": "process_value",
"cashValueClassification": "non_cash",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Income-qualified DC residents may receive no-cost electrification through DCSEU assessment, DOEE approval and program contractors; the source does not publish a cash rebate formula for user-facing totals.",
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
"DC_residence",
"income_or_categorical_eligibility",
"existing_gas_or_oil_equipment",
"single_family_or_multifamily_path",
"DCSEU_assessment",
"DOEE_approval"
],
"missingInputsForTypicalRetroFiEstimate": [
"program_assessment",
"approved_scope"
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
"probabilityEvidenceType": "scoring_criteria_only"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "AHEP installs selected electrification measures after assessment and approval; current applications are waitlisted.",
"sourceUrls": [
"[https://www.dcseu.com/affordable-home-electrification](https://www.dcseu.com/affordable-home-electrification)",
"[https://www.dcseu.com/ahep-sfa-apply](https://www.dcseu.com/ahep-sfa-apply)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "delete_bad_edge",
"reason": "AHEP is an electrification program, not a general weatherization or air-sealing rebate."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "move_to_special_workflow",
"reason": "Heat pumps are supported only through the no-cost AHEP workflow, not a direct cash rebate formula."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "The supported HVAC scope is heat-pump electrification replacing fossil equipment, not broad high-efficiency HVAC."
},
{
"retrofitTypeId": "induction_cooking_equipment",
"action": "move_to_special_workflow",
"reason": "Induction cooking is supported as residential electrification through AHEP, not a commercial kitchen rebate."
},
{
"retrofitTypeId": "process_electrification_equipment",
"action": "delete_bad_edge",
"reason": "AHEP is not a commercial or industrial process-electrification program."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "No direct cash amount is modeled; scope is determined through DCSEU and DOEE workflow."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "FY2026 applications are being placed on a waitlist until further notice.",
"fundingStatus": "waitlist"
},
"sourceUrlsChecked": [
"[https://www.dcseu.com/affordable-home-electrification](https://www.dcseu.com/affordable-home-electrification)",
"[https://www.dcseu.com/ahep-sfa-apply](https://www.dcseu.com/ahep-sfa-apply)",
"[https://www.dcseu.com/affordable-multifamily-electrification](https://www.dcseu.com/affordable-multifamily-electrification)",
"[https://www.dcseu.com/ahep-mf-apply](https://www.dcseu.com/ahep-mf-apply)",
"[https://doee.dc.gov/service/federal-home-energy-rebates-and-healthy-homes-act-2024](https://doee.dc.gov/service/federal-home-energy-rebates-and-healthy-homes-act-2024)"
],
"evidenceText": "AHEP is a no-cost electrification workflow for approved income-qualified DC homes; applications are waitlisted.",
"reasoningNotes": "Modeled as non-cash workflow value because no direct rebate amount or deterministic project value is published.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22443",
"opportunityName": "DEMEC Member Utilities - Efficiency Smart Residential Program",
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
"fixed_tier_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Apply the Efficiency Smart home rebate amount for the selected qualifying product; payment cannot exceed purchase price and quantity limits apply.",
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
"eligibleCostCategories": [
"purchase price"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"participating_DEMEC_utility",
"measure_type",
"equipment_size_or_tons",
"ENERGY_STAR_or_efficiency_qualification",
"purchase_price",
"purchase_date",
"unit_count"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"utility",
"equipment_tier_or_count"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "efficiency_smart_home_rebates_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "window air conditioner",
"amountCentsStandard": 5000,
"amountCentsTemporaryThroughSeptember30": 15000,
"maxUnits": 4
},
{
"measure": "smart thermostat",
"amountCents": 10000,
"maxUnits": 2
},
{
"measure": "residential refrigerator",
"amountCents": 5000,
"maxUnits": 2
},
{
"measure": "residential clothes washer",
"amountCents": 5000,
"maxUnits": 1
},
{
"measure": "electric clothes dryer",
"amountCents": 5000,
"maxUnits": 1
},
{
"measure": "heat pump water heater",
"amountCents": 30000,
"maxUnits": 1
},
{
"measure": "central air conditioner",
"amountCents": 10000,
"maxUnits": 2
},
{
"measure": "cold-climate air-source heat pump",
"amountCentsUnder2Tons": 35000,
"amountCents2TonsOrLarger": 75000,
"maxUnits": 2
},
{
"measure": "air-source heat pump",
"amountCents": 10000,
"maxUnits": 2
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Efficiency Smart publishes fixed home rebate amounts and quantity limits for qualifying products.",
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
"reason": "Efficiency Smart publishes air-source and cold-climate heat pump rebates."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "Efficiency Smart publishes residential clothes washer and electric dryer rebates."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Efficiency Smart publishes a residential refrigerator rebate; do not generalize to commercial refrigeration."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Efficiency Smart publishes a smart thermostat rebate."
},
{
"retrofitTypeId": "window_replacement",
"action": "delete_bad_edge",
"reason": "The supported window-related product is a window air conditioner, not window replacement."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate cannot exceed purchase price."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "Submit within three months of purchase and no later than January 7 following the program year.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.efficiencysmart.org/](https://www.efficiencysmart.org/)",
"[https://www.efficiencysmart.org/home-energy-rebates](https://www.efficiencysmart.org/home-energy-rebates)",
"[https://www.efficiencysmart.org/home-energy-rebates/apply](https://www.efficiencysmart.org/home-energy-rebates/apply)"
],
"evidenceText": "Efficiency Smart publishes fixed home rebate amounts for participating DEMEC municipal customers.",
"reasoningNotes": "Window replacement was removed; appliance matches are limited to residential products.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3619",
"opportunityName": "Fort Pierce Utilities Authority - Residential Energy Efficiency Rebate Program",
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
"rate_table",
"fixed_tier_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_purchase_rebate",
"formulaText": "Apply the published FPUA residential electric or natural gas rebate amount for the selected measure; electric rebates are first-come until the annual deadline or funds are depleted.",
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
"equipment cost",
"installation cost where allowed"
],
"ineligibleCostCategories": [
"new construction for electric rebates",
"wall insulation",
"WEOP-installed insulation"
],
"requiredInputs": [
"FPUA_account_type",
"measure_type",
"square_feet",
"R_value",
"SEER2",
"BTU_capacity",
"ENERGY_STAR_status",
"solar_hot_water_certification",
"gas_replacement_or_conversion",
"purchase_install_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"equipment_size_or_square_feet"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "fpua_residential_rebate_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "solar hot water",
"amountCents": 45000,
"maxUnits": 1
},
{
"measure": "added insulation",
"formula": "$0.125 per square foot to achieve R-30",
"maxAwardCents": 27500
},
{
"measure": "new insulation",
"rateCents": 40,
"rateUnit": "per square foot to achieve R-30",
"maxAwardCents": 30000
},
{
"measure": "ENERGY STAR refrigerator",
"amountCents": 5000,
"maxUnits": 1
},
{
"measure": "ENERGY STAR room air conditioner",
"amountCents": 15000,
"maxUnits": 2
},
{
"measure": "high-efficiency central air conditioner",
"amountCents": 50000,
"maxUnits": 2
},
{
"measure": "natural gas furnace gas-to-gas replacement",
"amountCents": 50000
},
{
"measure": "natural gas furnace electric-to-gas conversion",
"amountCents": 72500
},
{
"measure": "natural gas water heater",
"amountCentsMin": 35000,
"amountCentsMax": 67500
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "FPUA publishes fixed and per-square-foot residential electric and natural-gas rebate amounts.",
"sourceUrls": [
"[https://fpua.com/ways-to-save/](https://fpua.com/ways-to-save/)",
"[https://fpua.com/wp-content/uploads/2025/10/Residential-Electric-Rebate-Form-Updated-10-2-25.pdf](https://fpua.com/wp-content/uploads/2025/10/Residential-Electric-Rebate-Form-Updated-10-2-25.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "FPUA publishes natural-gas furnace replacement and electric-to-gas conversion rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "FPUA publishes a high-efficiency central air conditioner rebate."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "FPUA publishes a residential ENERGY STAR refrigerator rebate; not commercial refrigeration."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "FPUA publishes added and new insulation rates per square foot with caps."
},
{
"retrofitTypeId": "solar_water_heating_system",
"action": "keep",
"reason": "FPUA publishes a fixed solar hot water rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": ""
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "Electric rebate program ends September 30, 2026 or when funds are depleted; central AC proof within 180 days.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://fpua.com/ways-to-save/](https://fpua.com/ways-to-save/)",
"[https://fpua.com/wp-content/uploads/2025/10/Residential-Electric-Rebate-Form-Updated-10-2-25.pdf](https://fpua.com/wp-content/uploads/2025/10/Residential-Electric-Rebate-Form-Updated-10-2-25.pdf)",
"[https://fpua.com/wp-content/uploads/2025/04/Bill_Insert_April_2025_RT_final.pdf](https://fpua.com/wp-content/uploads/2025/04/Bill_Insert_April_2025_RT_final.pdf)"
],
"evidenceText": "FPUA publishes electric and natural-gas residential rebate amounts, rates, limits and deadlines.",
"reasoningNotes": "Furnace support is limited to natural-gas replacement or electric-to-gas conversion; refrigerator is residential only.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5145",
"opportunityName": "Business Energy Efficiency Rebate (Offered by 18 Utilities)",
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
"timing": "post_installation_reimbursement",
"formulaText": "For custom efficiency, Bright Energy Solutions calculates the incentive from preapproved peak-demand kW savings; prescriptive amounts depend on the selected participating municipal utility and measure form.",
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
"eligibleCostCategories": [
"approved project cost"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"participating_utility",
"measure_type",
"equipment_specs",
"baseline_equipment",
"project_cost",
"peak_period_kW_savings",
"local_utility_form",
"preapproval_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"local utility amount",
"preapproved demand savings"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "bright_energy_business_workflow_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "custom efficiency",
"formula": "preapproved incentive based on kW demand savings during June through September weekdays 1-8 p.m.; capped at 75% of project cost, or 100% if self-installed"
},
{
"measure": "custom electrification",
"formula": "preapproval required for fossil-fuel-to-electric projects such as geothermal HVAC, large ASHPs, VRF HVAC and manufacturing processes"
},
{
"measure": "prescriptive business categories",
"formula": "local utility form determines amount for refrigeration, HVAC, lighting, food service, VFDs, pumps, compressed air and electric forklifts"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Bright lists Iowa business measure categories and custom incentives based on peak-period kW savings with preapproval.",
"sourceUrls": [
"[https://www.brightenergysolutions.com/resources/business](https://www.brightenergysolutions.com/resources/business)",
"[https://www.brightenergysolutions.com/members/alton-municipal-utilities](https://www.brightenergysolutions.com/members/alton-municipal-utilities)",
"[https://d23r6s4dwed217.cloudfront.net/general-uploads/Customize-Your-Own-Efficiency-Incentive_FLYER.pdf](https://d23r6s4dwed217.cloudfront.net/general-uploads/Customize-Your-Own-Efficiency-Incentive_FLYER.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "delete_bad_edge",
"reason": "Current business pages do not list weatherization or air sealing as business rebate categories."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Custom electrification examples include geothermal HVAC."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Participating utility pages list heating and cooling business rebate categories including heat pumps, central AC and chillers."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Participating utility pages list commercial refrigeration equipment and controls."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Participating utility pages list lighting retrofit and new-construction lighting categories."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Custom incentives are capped at 75% of project cost or 100% for self-installed equipment."
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
"[https://www.brightenergysolutions.com/members/alton-municipal-utilities](https://www.brightenergysolutions.com/members/alton-municipal-utilities)",
"[https://d23r6s4dwed217.cloudfront.net/general-uploads/BES_2026_Business_TriFold_Brochure.pdf](https://d23r6s4dwed217.cloudfront.net/general-uploads/BES_2026_Business_TriFold_Brochure.pdf)",
"[https://d23r6s4dwed217.cloudfront.net/general-uploads/Customize-Your-Own-Efficiency-Incentive_FLYER.pdf](https://d23r6s4dwed217.cloudfront.net/general-uploads/Customize-Your-Own-Efficiency-Incentive_FLYER.pdf)"
],
"evidenceText": "Bright lists Iowa participating utilities and business measure categories; custom incentives use peak kW savings.",
"reasoningNotes": "No universal prescriptive amount was assigned because amounts are selected through utility-specific forms or preapproval.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3508",
"opportunityName": "MidAmerican Energy - Commercial Energy Efficiency Rebate Program",
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
"rate_table",
"fixed_tier_amount",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "point_of_sale",
"formulaText": "Apply the current MidAmerican business instant discount or custom program rate for the selected equipment; Small Business Express and custom projects require approval/reservation as applicable.",
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
"approved equipment cost",
"approved project cost"
],
"ineligibleCostCategories": [
"existing LED-to-new LED replacements where excluded"
],
"requiredInputs": [
"state",
"customer_class",
"measure_type",
"equipment_tier",
"tons",
"MBtuh",
"unit_count",
"annual_kWh_savings",
"therm_savings",
"project_cost",
"approval_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"size_or_savings",
"equipment_tier"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "midamerican_business_2026_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "small air-source heat pumps",
"amountCentsMin": 30000,
"amountCentsMax": 56300,
"rateUnit": "per unit"
},
{
"measure": "large air-source heat pumps",
"rateCents": 15000,
"rateUnit": "per ton"
},
{
"measure": "cold-climate air-source heat pumps",
"amountCentsMin": 56300,
"amountCentsMax": 71300,
"rateUnit": "per unit"
},
{
"measure": "ductless split heat pumps",
"amountCents": 37500,
"rateUnit": "per unit"
},
{
"measure": "geothermal heat pumps",
"amountCentsMin": 90000,
"amountCentsMax": 120000,
"rateUnit": "per unit"
},
{
"measure": "small central air conditioners",
"amountCentsMin": 26300,
"amountCentsMax": 41300,
"rateUnit": "per unit"
},
{
"measure": "large central air conditioners",
"rateCents": 15000,
"rateUnit": "per ton"
},
{
"measure": "heat pump water heaters",
"amountCentsMin": 11300,
"amountCentsMax": 22500,
"rateUnit": "per unit"
},
{
"measure": "natural gas furnaces",
"rateCents": 240,
"rateUnit": "per MBtuh"
},
{
"measure": "LED lighting and controls",
"amountCentsMin": 150,
"amountCentsMax": 30000,
"rateUnit": "per unit depending fixture or control type"
},
{
"measure": "Direct Project Assistance custom electric",
"rateCentsMin": 12,
"rateCentsMax": 18,
"rateUnit": "per annual kWh saved"
},
{
"measure": "Direct Project Assistance natural gas",
"rateCents": 150,
"rateUnit": "per therm saved"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "MidAmerican publishes 2026 business discounts for HVAC, lighting and controls plus custom rates for approved projects.",
"sourceUrls": [
"[https://www.midamericanenergy.com/business-discounts-and-rebates](https://www.midamericanenergy.com/business-discounts-and-rebates)",
"[https://www.midamericanenergy.com/media/pdf/sbx-reference-sheet.pdf](https://www.midamericanenergy.com/media/pdf/sbx-reference-sheet.pdf)",
"[https://www.iowadnr.gov/media/9314/download?inline=](https://www.iowadnr.gov/media/9314/download?inline=)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "exterior_site_lighting_retrofit",
"action": "keep",
"reason": "MidAmerican publishes exterior lighting fixture and retrofit-kit discounts."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "MidAmerican publishes geothermal heat pump business discounts."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "MidAmerican publishes air-source, cold-climate, ductless and PTHP heat pump discounts."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "MidAmerican publishes business HVAC discounts for central AC, heat pumps, furnaces, boilers and related equipment."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "MidAmerican publishes LED lighting and lighting-control discounts."
}
],
"stackingRules": {
"stackableWithRebates": false,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Instant discounts cannot be combined with other program incentives."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "Small Business Express projects must be approved before purchase or installation and completed within 90 days of approval/reservation.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.midamericanenergy.com/business-discounts-and-rebates](https://www.midamericanenergy.com/business-discounts-and-rebates)",
"[https://www.midamericanenergy.com/business-programs-and-savings](https://www.midamericanenergy.com/business-programs-and-savings)",
"[https://www.midamericanenergy.com/media/pdf/sbx-reference-sheet.pdf](https://www.midamericanenergy.com/media/pdf/sbx-reference-sheet.pdf)",
"[https://www.iowadnr.gov/media/9314/download?inline=](https://www.iowadnr.gov/media/9314/download?inline=)"
],
"evidenceText": "MidAmerican publishes 2026 business HVAC, lighting and custom incentive rates.",
"reasoningNotes": "Repaired source-inaccessible status using the current business page and 2026 small-business/custom materials.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4735",
"opportunityName": "MidAmerican Energy - Residential Energy Efficiency Rebate Programs",
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
"rate_table",
"capped_percent_of_eligible_cost"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "point_of_sale",
"formulaText": "Apply the current MidAmerican residential discount or rebate amount for the selected equipment; rebate payments cannot exceed 70% of equipment cost.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 70,
"maxUnits": 2,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"equipment cost"
],
"ineligibleCostCategories": [
"labor for equipment-cost-only rebate caps where excluded"
],
"requiredInputs": [
"state",
"measure_type",
"equipment_tier",
"tons",
"MBtuh",
"unit_count",
"equipment_cost",
"purchase_date",
"primary_service_fuel"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"equipment_tier_or_size",
"equipment_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "midamerican_residential_home_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "air-source heat pumps",
"amountCentsMin": 30000,
"amountCentsMax": 56300,
"rateUnit": "per unit"
},
{
"measure": "cold-climate air-source heat pumps",
"amountCentsMin": 56300,
"amountCentsMax": 71300,
"rateUnit": "per unit"
},
{
"measure": "central air conditioners",
"amountCentsMin": 26300,
"amountCentsMax": 41300,
"rateUnit": "per unit"
},
{
"measure": "large central air conditioners",
"rateCents": 15000,
"rateUnit": "per ton"
},
{
"measure": "ductless split heat pumps",
"amountCents": 37500
},
{
"measure": "cold-climate ductless split heat pumps",
"amountCents": 52500
},
{
"measure": "geothermal heat pumps",
"amountCentsMin": 90000,
"amountCentsMax": 120000
},
{
"measure": "electric heat pump water heater",
"amountCents": 22500
},
{
"measure": "natural gas furnace",
"rateCents": 240,
"rateUnit": "per MBtuh"
},
{
"measure": "freezer",
"amountCents": 2500
},
{
"measure": "refrigerator",
"amountCents": 5000
},
{
"measure": "smart thermostat",
"maxAwardCents": 10000
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "MidAmerican publishes residential discounts and rebates for HVAC, HPWHs, refrigerators, freezers and smart thermostats.",
"sourceUrls": [
"[https://www.midamericanenergy.com/home-discounts-and-rebates](https://www.midamericanenergy.com/home-discounts-and-rebates)",
"[https://www.midamericanenergy.com/home-programs-and-savings](https://www.midamericanenergy.com/home-programs-and-savings)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "MidAmerican publishes residential geothermal heat pump discounts."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "MidAmerican publishes air-source, cold-climate and ductless heat pump discounts."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "MidAmerican publishes residential central AC, heat pump and furnace-related equipment discounts."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "MidAmerican publishes residential refrigerator and freezer rebates; not commercial refrigeration."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "MidAmerican publishes a smart thermostat rebate up to the stated cap."
}
],
"stackingRules": {
"stackableWithRebates": false,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Instant discounts cannot be combined with any other rebate or incentive program; payments cannot exceed 70% of equipment cost."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "Apply within 90 days of purchase or by December 31, 2026, whichever comes first.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.midamericanenergy.com/home-discounts-and-rebates](https://www.midamericanenergy.com/home-discounts-and-rebates)",
"[https://www.midamericanenergy.com/home-programs-and-savings](https://www.midamericanenergy.com/home-programs-and-savings)",
"[https://midamerican.ri-esuite.com/about/programs/residential](https://midamerican.ri-esuite.com/about/programs/residential)"
],
"evidenceText": "MidAmerican publishes residential HVAC, appliance and thermostat rebate amounts for current customers.",
"reasoningNotes": "Commercial refrigeration was narrowed to residential refrigerators and freezers.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2407",
"opportunityName": "Rocky Mountain Power - wattsmart Business Program",
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
"hybrid_rate_plus_cap",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Apply the Idaho wattsmart Business rate for the selected HVAC, appliance, lighting or refrigeration measure; savings-based measures require Rocky Mountain Power-approved savings.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 70,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"energy efficiency project cost"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"measure_type",
"equipment_category",
"tons",
"annual_kWh_savings",
"watts_reduced",
"watts_controlled",
"project_cost",
"control_type",
"business_size_class",
"purchase_date"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"savings_or_size",
"project_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "rmp_id_wattsmart_business_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "unitary commercial AC or heat pump",
"rateCentsMin": 2500,
"rateCentsMax": 7500,
"rateUnit": "per ton of cooling capacity"
},
{
"measure": "VRF heat pump",
"rateCents": 12500,
"rateUnit": "per ton"
},
{
"measure": "ground or groundwater heat pump loop",
"rateCents": 12500,
"rateUnit": "per ton"
},
{
"measure": "advanced RTU controls for heat pump RTU",
"amountCentsMin": 40000,
"amountCentsMax": 650000,
"tierBasis": "new or retrofit and tonnage"
},
{
"measure": "commercial ENERGY STAR clothes washer with electric water heat",
"amountCents": 10000
},
{
"measure": "residential clothes washer used in a business",
"amountCents": 5000
},
{
"measure": "residential HPWH used in a business",
"maxAwardCents": 60000
},
{
"measure": "adaptive refrigeration control or fast-acting refrigerated door",
"rateCents": 15,
"rateUnit": "per annual kWh saved"
},
{
"measure": "interior lighting retrofit non-prescriptive",
"rateCentsMin": 60,
"rateCentsMax": 120,
"rateUnit": "per watt reduced"
},
{
"measure": "lighting controls only",
"rateCentsMin": 35,
"rateCentsMax": 75,
"rateUnit": "per watt controlled"
},
{
"measure": "express or SMBE lighting retrofit",
"rateCentsMin": 75,
"rateCentsMax": 350,
"rateUnit": "per watt installed"
},
{
"measure": "custom lighting",
"rateCents": 10,
"rateUnit": "per annual kWh saved"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Idaho wattsmart Business publishes rates for HVAC, appliances used in business, lighting and refrigeration controls.",
"sourceUrls": [
"[https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho/id-incentive-lists.html](https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho/id-incentive-lists.html)",
"[https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/idaho/ID_wattsmart_Business_Incentive_Lists.pdf](https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/idaho/ID_wattsmart_Business_Incentive_Lists.pdf)",
"[https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/idaho/ID_wattsmart_Business_Appliances_Office_Equip.pdf](https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/idaho/ID_wattsmart_Business_Appliances_Office_Equip.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "The Idaho list includes unitary, VRF and heat-pump-loop HVAC incentives."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "The Idaho business application supports residential heat pump water heaters used in a business."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "keep",
"reason": "The Idaho application lists commercial clothes washers and residential clothes washers used in a business."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "The Idaho list includes adaptive refrigeration controls, fast-acting refrigerated doors and related refrigeration measures."
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"action": "keep",
"reason": "The Idaho lighting list includes controls-only and controlled-lighting incentive rates."
}
],
"stackingRules": {
"stackableWithRebates": false,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Only one Rocky Mountain Power financial incentive may be paid per measure; cost and simple-payback caps apply."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "Appliance and office equipment applications are submitted within six months of project completion; other measure deadlines depend on application package.",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho.html](https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho.html)",
"[https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho/id-incentive-lists.html](https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho/id-incentive-lists.html)",
"[https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho/id-incentive-lists/id-hvac.html](https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho/id-incentive-lists/id-hvac.html)",
"[https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho/id-incentive-lists/id-wastewater-other-refrigeration.html](https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho/id-incentive-lists/id-wastewater-other-refrigeration.html)",
"[https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho/id-incentive-lists/id-appliances-office.html](https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-idaho/id-incentive-lists/id-appliances-office.html)",
"[https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/idaho/ID_wattsmart_Business_Incentive_Lists.pdf](https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/idaho/ID_wattsmart_Business_Incentive_Lists.pdf)",
"[https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/idaho/ID_wattsmart_Business_Appliances_Office_Equip.pdf](https://www.rockymountainpower.net/content/dam/pcorp/documents/en/rockymountainpower/savings-energy-choices/wattsmart-business/idaho/ID_wattsmart_Business_Appliances_Office_Equip.pdf)"
],
"evidenceText": "Rocky Mountain Power publishes Idaho rates for HVAC, appliances, lighting and refrigeration controls.",
"reasoningNotes": "Residential appliance references were kept only where the business application expressly permits residential appliances used in a business.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3507",
"opportunityName": "MidAmerican Energy - Residential Energy Efficiency Rebate Programs",
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
"rate_table",
"capped_percent_of_eligible_cost"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "point_of_sale",
"formulaText": "Apply the current MidAmerican residential discount or rebate amount for the selected Illinois-eligible equipment; rebate payments cannot exceed 70% of equipment cost.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 70,
"maxUnits": 2,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"equipment cost"
],
"ineligibleCostCategories": [
"labor for equipment-cost-only rebate caps where excluded"
],
"requiredInputs": [
"Illinois_service_address",
"measure_type",
"equipment_tier",
"tons",
"MBtuh",
"unit_count",
"equipment_cost",
"purchase_date",
"MidAmerican_primary_service"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"equipment_tier_or_size",
"equipment_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "midamerican_il_residential_catalog",
"selectionInput": "measure_type",
"rows": [
{
"measure": "air-source heat pumps",
"amountCentsMin": 30000,
"amountCentsMax": 56300,
"rateUnit": "per unit"
},
{
"measure": "cold-climate air-source heat pumps",
"amountCentsMin": 56300,
"amountCentsMax": 71300,
"rateUnit": "per unit"
},
{
"measure": "central air conditioners",
"amountCentsMin": 26300,
"amountCentsMax": 41300,
"rateUnit": "per unit"
},
{
"measure": "large central air conditioners",
"rateCents": 15000,
"rateUnit": "per ton"
},
{
"measure": "ductless split heat pumps",
"amountCents": 37500
},
{
"measure": "cold-climate ductless split heat pumps",
"amountCents": 52500
},
{
"measure": "geothermal heat pumps",
"amountCentsMin": 90000,
"amountCentsMax": 120000
},
{
"measure": "electric heat pump water heater",
"amountCents": 22500
},
{
"measure": "natural gas furnace",
"rateCents": 240,
"rateUnit": "per MBtuh"
},
{
"measure": "freezer",
"amountCents": 2500
},
{
"measure": "refrigerator",
"amountCents": 5000
},
{
"measure": "smart thermostat",
"maxAwardCents": 10000
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "MidAmerican publishes current home rebates for heat pumps, central AC, geothermal, HPWHs, furnaces, appliances and thermostats.",
"sourceUrls": [
"[https://www.midamericanenergy.com/home-discounts-and-rebates](https://www.midamericanenergy.com/home-discounts-and-rebates)",
"[https://www.midamericanenergy.com/il_qualifications-and-conditions](https://www.midamericanenergy.com/il_qualifications-and-conditions)",
"[https://midamerican.ri-esuite.com/about/programs/residential](https://midamerican.ri-esuite.com/about/programs/residential)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "MidAmerican publishes residential geothermal heat pump discounts."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "MidAmerican publishes air-source, cold-climate and ductless heat pump discounts."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "MidAmerican publishes electric heat pump water heater discounts and rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "MidAmerican publishes residential central AC, furnace and heat pump equipment discounts."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "MidAmerican publishes residential refrigerator and freezer rebates; not commercial refrigeration."
}
],
"stackingRules": {
"stackableWithRebates": false,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Instant discounts cannot be combined with any other rebate or incentive program; payments cannot exceed 70% of equipment cost."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "Apply within 90 days of purchase or by December 31, 2026, whichever comes first.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.midamericanenergy.com/il-ee-rebates](https://www.midamericanenergy.com/il-ee-rebates)",
"[https://www.midamericanenergy.com/home-discounts-and-rebates](https://www.midamericanenergy.com/home-discounts-and-rebates)",
"[https://www.midamericanenergy.com/il_qualifications-and-conditions](https://www.midamericanenergy.com/il_qualifications-and-conditions)",
"[https://www.midamericanenergy.com/media/pdf/mec-hvac-reference-res.pdf](https://www.midamericanenergy.com/media/pdf/mec-hvac-reference-res.pdf)",
"[https://midamerican.ri-esuite.com/about/programs/residential](https://midamerican.ri-esuite.com/about/programs/residential)"
],
"evidenceText": "MidAmerican publishes current residential amounts for Illinois-eligible HVAC, HPWH and appliance measures.",
"reasoningNotes": "Obsolete Illinois URL was replaced by current home rebate and qualification sources.",
"humanReviewRequired": false,
"humanReviewReasons": []
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2673"
}
