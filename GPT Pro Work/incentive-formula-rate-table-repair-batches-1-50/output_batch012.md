{
"schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
"researchedAt": "2026-07-02",
"source": "gpt_pro",
"batchNumber": 12,
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5708",
"opportunityName": "TVA - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Select the applicable TVA EnergyRight residential rebate measure and multiply the fixed published rebate by the qualifying unit count where a unit count applies.",
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
"qualifying HVAC equipment",
"qualifying duct work",
"qualifying insulation",
"qualifying air sealing"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"selected_measure",
"unit_count",
"seer2_rating",
"equipment_type",
"qcn_contractor_confirmation",
"participating_tva_local_power_company"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"unit_count",
"seer2_rating",
"equipment_type",
"qcn_contractor_confirmation"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "tva_energyright_residential_2026",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "Geothermal heat pump",
"amountCents": 150000,
"unit": "system"
},
{
"measure": "Air-source or dual-fuel heat pump, 17+ SEER2",
"amountCents": 80000,
"unit": "system"
},
{
"measure": "Air-source or dual-fuel heat pump, 15-16.99 SEER2",
"amountCents": 50000,
"unit": "system"
},
{
"measure": "Ductless mini-split heat pump, 17+ SEER2",
"amountCents": 80000,
"unit": "system"
},
{
"measure": "Central air conditioner, 17+ SEER2",
"amountCents": 40000,
"unit": "system"
},
{
"measure": "Central air conditioner, 15-16.99 SEER2",
"amountCents": 25000,
"unit": "system"
},
{
"measure": "Duct sealing, repair, insulation or replacement",
"amountCents": 30000,
"unit": "project"
},
{
"measure": "Attic insulation",
"amountCents": 50000,
"unit": "project"
},
{
"measure": "Wall insulation",
"amountCents": 30000,
"unit": "project"
},
{
"measure": "Whole-home envelope air sealing",
"amountCents": 30000,
"unit": "project"
},
{
"measure": "HVAC tune-up for existing heat pump or central AC",
"amountCents": 5000,
"unit": "system"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Current TVA EnergyRight residential pages publish fixed rebates for geothermal, air-source heat pumps, mini-splits, central AC, duct work, attic and wall insulation, air sealing, and HVAC tune-ups.",
"sourceUrls": [
"[https://energyright.com/residential/rebates/](https://energyright.com/residential/rebates/)",
"[https://energyright.com/residential/rebates/geothermal-heat-pump/](https://energyright.com/residential/rebates/geothermal-heat-pump/)",
"[https://energyright.com/residential/rebates/heat-pump/](https://energyright.com/residential/rebates/heat-pump/)",
"[https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/](https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/)",
"[https://energyright.com/residential/rebates/home-insulation-air-sealing/](https://energyright.com/residential/rebates/home-insulation-air-sealing/)",
"[https://energyright.com/residential/rebates/central-air-conditioner/](https://energyright.com/residential/rebates/central-air-conditioner/)",
"[https://energyright.com/residential/rebates/mini-split/](https://energyright.com/residential/rebates/mini-split/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "TVA publishes a whole-home air sealing rebate."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "keep",
"reason": "TVA publishes a duct sealing, repair, insulation or replacement rebate."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "TVA publishes a geothermal heat pump rebate."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "TVA publishes air-source, dual-fuel and ductless mini-split heat pump rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for listed TVA central AC, heat pump and HVAC tune-up measures."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "TVA publishes attic and wall insulation rebates."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": true,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "TVA states EnergyRight rebates may be stackable with federal tax credits and state rebates where applicable."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://energyright.com/residential/rebates/](https://energyright.com/residential/rebates/)",
"[https://energyright.com/residential/rebates/geothermal-heat-pump/](https://energyright.com/residential/rebates/geothermal-heat-pump/)",
"[https://energyright.com/residential/rebates/heat-pump/](https://energyright.com/residential/rebates/heat-pump/)",
"[https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/](https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/)",
"[https://energyright.com/residential/rebates/home-insulation-air-sealing/](https://energyright.com/residential/rebates/home-insulation-air-sealing/)",
"[https://programs.dsireusa.org/system/program/detail/5708/tva-residential-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/5708/tva-residential-energy-efficiency-rebate-program)"
],
"evidenceText": "TVA EnergyRight current residential rebate pages list fixed rebate amounts for QCN-installed heat pump, geothermal, AC, duct, air sealing and insulation measures.",
"reasoningNotes": "Target list came from uploaded batch file . The NC record is territory-limited to TVA-served local power company customers, not statewide North Carolina.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3327",
"opportunityName": "Nebraska Public Power District - Commercial Energy Efficiency Rebate Programs",
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
"formulaText": "Use the applicable EnergyWise Nebraska business incentive table: fixed per unit, dollars per ton, dollars per horsepower, or a custom kWh-savings formula where published.",
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
"qualifying commercial lighting",
"qualifying commercial HVAC equipment",
"qualifying heat pump water heaters",
"qualifying variable frequency drives",
"approved custom efficiency project costs"
],
"ineligibleCostCategories": [
"new construction lighting where excluded",
"existing VFD replacements",
"single-phase drives",
"projects already covered by another EnergyWise program"
],
"requiredInputs": [
"selected_measure",
"fixture_count",
"fixture_wattage_tier",
"cooling_tons",
"eligible_horsepower",
"eligible_annual_kwh_savings",
"project_cost",
"preapproval_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"fixture_count",
"fixture_wattage_tier",
"cooling_tons",
"eligible_horsepower",
"eligible_annual_kwh_savings",
"project_cost"
],
"rateTable": {
"tableId": "nppd_energywise_business_2026",
"dimensions": [
"measure",
"tier"
],
"rows": [
{
"measure": "Variable frequency drive",
"rate": 3000,
"rateUnit": "cents_per_horsepower",
"conditions": "Eligible three-phase centrifugal fan or pump drive; 1 to 200 horsepower."
},
{
"measure": "Custom LED lighting",
"rate": 7,
"rateUnit": "cents_per_annual_kwh_saved",
"maxPercentOfEligibleCost": 0.5,
"conditions": "Lesser of annual kWh savings multiplied by $0.07/kWh or 50% of installation cost."
}
]
},
"measureCatalog": {
"catalogId": "nppd_energywise_business_prescriptive_2026",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "Air conditioner qualifying tier",
"amountCents": 3000,
"unit": "ton"
},
{
"measure": "Variable-capacity air conditioner",
"amountCents": 6000,
"unit": "ton"
},
{
"measure": "Air-source heat pump lower tier",
"amountCents": 6000,
"unit": "ton"
},
{
"measure": "Air-source heat pump higher tier",
"amountCents": 12000,
"unit": "ton"
},
{
"measure": "Variable-capacity air-source heat pump",
"amountCents": 15000,
"unit": "ton"
},
{
"measure": "Water-source heat pump",
"amountCents": 15000,
"unit": "ton"
},
{
"measure": "Geothermal heat pump",
"amountCents": 33000,
"unit": "ton"
},
{
"measure": "Air-source heat pump water heater",
"amountCents": 40000,
"unit": "unit"
},
{
"measure": "Water-source or ground-source heat pump water heater",
"amountCents": 65000,
"unit": "unit"
},
{
"measure": "Linear fluorescent replacement with new LED fixture",
"minAmountCents": 500,
"maxAmountCents": 2000,
"unit": "fixture",
"conditions": "Amount depends on replacement fixture wattage tier."
},
{
"measure": "High-bay or exterior LED fixture",
"minAmountCents": 2000,
"maxAmountCents": 8000,
"unit": "fixture",
"conditions": "Amount depends on wattage tier."
},
{
"measure": "LED exit sign",
"amountCents": 1000,
"unit": "sign"
},
{
"measure": "Occupancy sensor",
"minAmountCents": 500,
"maxAmountCents": 1500,
"unit": "sensor",
"conditions": "Built-in and external sensors have different fixed amounts."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "EnergyWise Nebraska business materials publish prescriptive lighting, HVAC, heat pump water heater and VFD incentives, plus custom lighting and process formulas subject to preapproval and cost caps.",
"sourceUrls": [
"[https://nppd.energywisenebraska.com/business/](https://nppd.energywisenebraska.com/business/)",
"[https://www.nppd.com/save-money](https://www.nppd.com/save-money)",
"[https://nppd.energywisenebraska.com/wp-content/uploads/VariableFrequencyDriveApplication.pdf](https://nppd.energywisenebraska.com/wp-content/uploads/VariableFrequencyDriveApplication.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "NPPD publishes a commercial geothermal heat pump incentive per ton."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "NPPD publishes air-source, water-source and geothermal heat pump incentives."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "NPPD publishes commercial air-source and water/ground-source heat pump water heater incentives."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for listed commercial HVAC equipment categories and efficiency tiers."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "NPPD publishes prescriptive and custom commercial LED lighting incentives."
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"action": "keep",
"reason": "NPPD publishes a VFD incentive per eligible horsepower."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Prescriptive and custom lighting incentives should not both be applied to the same fixture or same savings basis."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.nppd.com/save-money](https://www.nppd.com/save-money)",
"[https://nppd.energywisenebraska.com/business/](https://nppd.energywisenebraska.com/business/)",
"[https://nppd.energywisenebraska.com/wp-content/uploads/VariableFrequencyDriveApplication.pdf](https://nppd.energywisenebraska.com/wp-content/uploads/VariableFrequencyDriveApplication.pdf)",
"[https://programs.dsireusa.org/system/program/detail/3327/nebraska-public-power-district-commercial-energy-efficiency-rebate-programs](https://programs.dsireusa.org/system/program/detail/3327/nebraska-public-power-district-commercial-energy-efficiency-rebate-programs)"
],
"evidenceText": "NPPD EnergyWise business tables support commercial lighting, HVAC, heat pump water heater, VFD and custom efficiency measures, with preapproval for larger or custom projects.",
"reasoningNotes": "Use measure-specific rate tables; the legacy VFD rule was directionally correct but incomplete because the business program has multiple tables and custom pathways.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22080",
"opportunityName": "Liberty Utilities (Gas) - Residential Energy Efficiency Programs",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate",
"reimbursement"
],
"primaryValueModelKinds": [
"measure_catalog",
"capped_percent_of_eligible_cost"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "For gas equipment and thermostats, use the published fixed NHSaves/Liberty amount, subject to equipment and installation cost caps where stated. Weatherization uses the listed percentage of installed cost up to the program cap.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 600000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying natural gas heating equipment",
"qualifying natural gas water heating equipment",
"qualifying thermostats",
"installed air sealing",
"installed insulation"
],
"ineligibleCostCategories": [
"electric heat pumps",
"electric heat pump water heaters",
"residential clothes washers"
],
"requiredInputs": [
"selected_measure",
"unit_count",
"afue",
"uef",
"equipment_cost",
"installation_cost",
"weatherization_installed_cost",
"qualified_contractor"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"unit_count",
"afue",
"uef",
"equipment_cost",
"installation_cost",
"weatherization_installed_cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "liberty_nh_nhsaves_residential_gas_2026",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "Natural gas furnace with ECM, 95% AFUE or greater",
"amountCents": 30000,
"unit": "unit",
"maxPercentOfEligibleCost": 0.5
},
{
"measure": "Natural gas furnace with ECM, 97% AFUE or greater",
"amountCents": 45000,
"unit": "unit",
"maxPercentOfEligibleCost": 0.5
},
{
"measure": "Natural gas hot water boiler, 90% AFUE or greater",
"amountCents": 100000,
"unit": "unit",
"maxPercentOfEligibleCost": 0.5
},
{
"measure": "Natural gas hot water boiler, 95% AFUE or greater",
"amountCents": 150000,
"unit": "unit",
"maxPercentOfEligibleCost": 0.5
},
{
"measure": "On-demand tankless natural gas water heater, 0.87 UEF or greater",
"amountCents": 50000,
"unit": "unit",
"maxPercentOfEligibleCost": 0.5
},
{
"measure": "Qualifying natural gas storage water heater",
"amountCents": 10000,
"unit": "unit",
"maxPercentOfEligibleCost": 0.5
},
{
"measure": "Condensing natural gas water heater, 0.80 UEF or greater",
"amountCents": 50000,
"unit": "unit",
"maxPercentOfEligibleCost": 0.5
},
{
"measure": "Indirect water heater connected to gas forced hot water boiler",
"amountCents": 40000,
"unit": "unit",
"maxPercentOfEligibleCost": 0.5
},
{
"measure": "Aftermarket boiler reset control",
"amountCents": 22500,
"unit": "control",
"maxPercentOfEligibleCost": 0.5
},
{
"measure": "Programmable thermostat",
"maxAmountCents": 2500,
"unit": "thermostat",
"maxUnits": 2,
"conditions": "Rebate is up to purchase price."
},
{
"measure": "Wireless smart thermostat",
"maxAmountCents": 8500,
"unit": "thermostat",
"maxUnits": 2,
"conditions": "Rebate is up to purchase price."
},
{
"measure": "Home Energy Performance air sealing",
"percent": 1,
"unit": "installed_cost",
"conditions": "100% of installed air sealing cost; combined with insulation subject to $6,000 cap."
},
{
"measure": "Home Energy Performance insulation",
"percent": 0.75,
"unit": "installed_cost",
"conditions": "75% of installed insulation cost; combined with air sealing subject to $6,000 cap."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Liberty and NHSaves materials list 2026 gas equipment, thermostat and weatherization incentives, including a weatherization cap and equipment rebates capped by eligible cost.",
"sourceUrls": [
"[https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/index.html](https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/index.html)",
"[https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/energy-audits-and-insulation.html](https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/energy-audits-and-insulation.html)",
"[https://nhsaves.com/residential/natural-gas-heating-equipment/](https://nhsaves.com/residential/natural-gas-heating-equipment/)",
"[https://nhsaves.com/residential/weatherization/](https://nhsaves.com/residential/weatherization/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "Weatherization path includes air sealing incentives."
},
{
"retrofitTypeId": "high_efficiency_gas_water_heater",
"action": "keep",
"reason": "Program lists natural gas storage, tankless, condensing and indirect water-heater rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for listed natural gas furnaces, boilers, boiler controls and related gas equipment."
},
{
"retrofitTypeId": "high_efficiency_laundry_equipment",
"action": "delete_bad_edge",
"reason": "Current Liberty gas sources checked do not support residential clothes washer rebates under this gas program."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Weatherization path includes insulation incentives."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "NHSaves/Liberty gas materials list programmable and wireless thermostat rebates."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Gas equipment rebates are capped by equipment and installation cost; do not exceed source cost limits."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "2027-01-31 for listed 2026 gas equipment forms",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/index.html](https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/index.html)",
"[https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/energy-audits-and-insulation.html](https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/energy-audits-and-insulation.html)",
"[https://nhsaves.com/residential/natural-gas-heating-equipment/](https://nhsaves.com/residential/natural-gas-heating-equipment/)",
"[https://nhsaves.com/residential/weatherization/](https://nhsaves.com/residential/weatherization/)",
"[https://programs.dsireusa.org/system/program/detail/22080/liberty-utilities-gas-residential-energy-efficiency-programs](https://programs.dsireusa.org/system/program/detail/22080/liberty-utilities-gas-residential-energy-efficiency-programs)"
],
"evidenceText": "Current Liberty and NHSaves pages support residential gas heating, gas water heating, thermostats, air sealing and insulation, but not clothes washer rebates.",
"reasoningNotes": "The legacy thermostat-only simple rule was incomplete; the program has a broader gas equipment table and a capped weatherization percentage model.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3904",
"opportunityName": "National Fuel (Gas) - Commercial Energy Efficiency Program",
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
"formulaText": "Apply the 2026 National Fuel non-residential pre-qualified measure rate, or the performance-based dollars per annual Mcf saved formula, subject to published project and cost caps.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 15000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying natural gas heating equipment",
"qualifying gas-saving controls",
"duct insulation for gas heating systems",
"pipe insulation for gas heating systems",
"approved performance-based gas efficiency costs"
],
"ineligibleCostCategories": [
"new construction",
"electric-only equipment",
"duct insulation not serving gas combustion heating"
],
"requiredInputs": [
"selected_measure",
"unit_count",
"input_mbtuh",
"boiler_capacity_mbtuh",
"linear_feet",
"doorway_count",
"sensor_count",
"annual_mcf_savings",
"project_cost",
"program_path"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"unit_count",
"input_mbtuh",
"boiler_capacity_mbtuh",
"linear_feet",
"annual_mcf_savings",
"project_cost",
"program_path"
],
"rateTable": {
"tableId": "national_fuel_ny_nonresidential_2026",
"dimensions": [
"measure",
"size_or_path"
],
"rows": [
{
"measure": "Gas air furnace, 95% AFUE or greater",
"rate": 500,
"rateUnit": "cents_per_mbtuh_input"
},
{
"measure": "Low-intensity infrared heater",
"rate": 250,
"rateUnit": "cents_per_mbtuh_input"
},
{
"measure": "Gas-fired unit heater, 90% efficiency or greater",
"rate": 200,
"rateUnit": "cents_per_mbtuh_input"
},
{
"measure": "Steam boiler, qualifying tier",
"minRate": 100,
"maxRate": 200,
"rateUnit": "cents_per_mbtuh_input"
},
{
"measure": "Duct insulation for gas heating systems",
"rate": 725,
"rateUnit": "cents_per_linear_foot",
"maxPercentOfEligibleCost": 0.5
},
{
"measure": "Pipe insulation for gas heating systems",
"rate": 200,
"rateUnit": "cents_per_linear_foot",
"maxPercentOfEligibleCost": 0.5
},
{
"measure": "Strategic performance-based project",
"rate": 2500,
"rateUnit": "cents_per_annual_mcf_saved",
"maxAwardCents": 10000000
},
{
"measure": "Conditional neutral performance-based project",
"rate": 1000,
"rateUnit": "cents_per_annual_mcf_saved",
"maxAwardCents": 5000000
}
]
},
"measureCatalog": {
"catalogId": "national_fuel_ny_prequalified_2026",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "Condensing hot water boiler",
"minAmountCents": 100000,
"maxAmountCents": 450000,
"unit": "boiler",
"conditions": "Amount depends on boiler input size tier."
},
{
"measure": "Air curtain",
"amountCents": 250000,
"unit": "doorway",
"maxPercentOfEligibleCost": 0.75
},
{
"measure": "Demand control ventilation sensor",
"amountCents": 20000,
"unit": "sensor"
},
{
"measure": "Connected or ENERGY STAR smart thermostat",
"amountCents": 20000,
"unit": "thermostat"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "National Fuel 2026 non-residential applications publish pre-qualified gas equipment, insulation and controls rates, plus performance-based incentives per annual Mcf saved with project caps.",
"sourceUrls": [
"[https://fuelingtomorrowtoday.com/non-residential-customers/about-the-non-residential-program/](https://fuelingtomorrowtoday.com/non-residential-customers/about-the-non-residential-program/)",
"[https://fuelingtomorrowtoday.com/wp-content/uploads/2026/02/59865-National-Fuels_Non-Residential_Pre-Qualified_Application_2026_M.pdf](https://fuelingtomorrowtoday.com/wp-content/uploads/2026/02/59865-National-Fuels_Non-Residential_Pre-Qualified_Application_2026_M.pdf)",
"[https://fuelingtomorrowtoday.com/wp-content/uploads/2026/04/National-Fuels_Non-Residential_PerformanceBased_Application_2026_M2.pdf](https://fuelingtomorrowtoday.com/wp-content/uploads/2026/04/National-Fuels_Non-Residential_PerformanceBased_Application_2026_M2.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "keep",
"reason": "Keep only for published duct insulation serving gas combustion heating systems; duct sealing is not the supported measure."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "Program publishes condensing hot water and steam boiler incentives."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "Program publishes gas furnace and gas unit heater incentives."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for listed non-residential natural gas heating equipment and controls."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Keep only for gas-saving duct, pipe or approved performance-based insulation measures."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Program publishes a connected or ENERGY STAR smart thermostat rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Performance-based and pre-qualified incentives should not be double-counted for the same gas savings."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "Pre-qualified applications specify submission within 90 days of installation; performance-based projects require program application timing before work proceeds.",
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://fuelingtomorrowtoday.com/non-residential-customers/about-the-non-residential-program/](https://fuelingtomorrowtoday.com/non-residential-customers/about-the-non-residential-program/)",
"[https://fuelingtomorrowtoday.com/wp-content/uploads/2026/02/59865-National-Fuels_Non-Residential_Pre-Qualified_Application_2026_M.pdf](https://fuelingtomorrowtoday.com/wp-content/uploads/2026/02/59865-National-Fuels_Non-Residential_Pre-Qualified_Application_2026_M.pdf)",
"[https://fuelingtomorrowtoday.com/wp-content/uploads/2026/04/National-Fuels_Non-Residential_PerformanceBased_Application_2026_M2.pdf](https://fuelingtomorrowtoday.com/wp-content/uploads/2026/04/National-Fuels_Non-Residential_PerformanceBased_Application_2026_M2.pdf)",
"[https://programs.dsireusa.org/system/program/detail/3904/national-fuel-gas-commercial-energy-efficiency-program](https://programs.dsireusa.org/system/program/detail/3904/national-fuel-gas-commercial-energy-efficiency-program)"
],
"evidenceText": "National Fuel's current non-residential materials list gas furnaces, boilers, unit heaters, thermostats, duct and pipe insulation, air curtains and performance-based gas savings.",
"reasoningNotes": "This opportunity is a non-residential natural gas savings program. Broad envelope or HVAC matches must remain tied to gas-saving source language.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3668",
"opportunityName": "CenterPoint Energy (Gas) - Residential Energy Efficiency Rebates",
"repairStatus": "needs_human_review",
"calculationStatus": "needs_repair_review",
"sourceConfidence": "medium",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use the current CenterPoint Ohio gas measure amount when verified; available public consumer and utility materials list fixed gas equipment, thermostat and weatherization maximums.",
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
"qualifying natural gas furnace",
"qualifying natural gas boiler",
"qualifying natural gas water heater",
"qualifying thermostat",
"qualifying air sealing",
"qualifying insulation"
],
"ineligibleCostCategories": [
"electric heat pumps",
"commercial equipment",
"new construction weatherization where excluded"
],
"requiredInputs": [
"selected_measure",
"unit_count",
"afue",
"ef_or_uef",
"project_cost",
"approved_contractor_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"unit_count",
"afue",
"ef_or_uef",
"project_cost",
"approved_contractor_status"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "centerpoint_oh_residential_gas_public_materials",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "Natural gas furnace, 95% to 96.99% AFUE",
"amountCents": 15000,
"unit": "unit"
},
{
"measure": "Natural gas furnace, 97% AFUE or greater",
"amountCents": 40000,
"unit": "unit"
},
{
"measure": "Natural gas boiler, 95% AFUE or greater",
"amountCents": 50000,
"unit": "unit"
},
{
"measure": "Natural gas tankless water heater",
"amountCents": 25000,
"unit": "unit"
},
{
"measure": "Natural gas storage water heater",
"amountCents": 10000,
"unit": "unit"
},
{
"measure": "Smart thermostat",
"amountCents": 5000,
"unit": "thermostat"
},
{
"measure": "Wi-Fi thermostat",
"amountCents": 3000,
"unit": "thermostat"
},
{
"measure": "Air sealing",
"maxAmountCents": 25000,
"unit": "project"
},
{
"measure": "Attic insulation",
"maxAmountCents": 60000,
"unit": "project"
},
{
"measure": "Wall insulation",
"maxAmountCents": 70000,
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
"evidenceText": "CenterPoint Ohio materials and consumer summaries support residential gas furnace, boiler, water heater, thermostat, air sealing and insulation incentives, but current amount verification needs review.",
"sourceUrls": [
"[https://midwest.centerpointenergy.com/savings/oh-home](https://midwest.centerpointenergy.com/savings/oh-home)",
"[https://www.centerpointenergy.com/en-us/Documents/Midwest/CNP_Customer_Booklet_Res-Comm_O_NG_digital.pdf](https://www.centerpointenergy.com/en-us/Documents/Midwest/CNP_Customer_Booklet_Res-Comm_O_NG_digital.pdf)",
"[https://www.occ.ohio.gov/factsheet/centerpoint-energys-energy-efficiency-programs](https://www.occ.ohio.gov/factsheet/centerpoint-energys-energy-efficiency-programs)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "Public CenterPoint Ohio materials support an air sealing rebate."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "Public materials support a qualifying natural gas boiler rebate."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "Public materials support qualifying natural gas furnace rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for listed high-efficiency natural gas heating equipment; do not include electric HVAC."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Public materials support attic and wall insulation rebates."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Public materials support smart or Wi-Fi thermostat rebates."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Review current utility application terms before applying final cost caps or multiple-incentive limits."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://midwest.centerpointenergy.com/savings/oh-home](https://midwest.centerpointenergy.com/savings/oh-home)",
"[https://www.centerpointenergy.com/en-us/Documents/Midwest/CNP_Customer_Booklet_Res-Comm_O_NG_digital.pdf](https://www.centerpointenergy.com/en-us/Documents/Midwest/CNP_Customer_Booklet_Res-Comm_O_NG_digital.pdf)",
"[https://www.occ.ohio.gov/factsheet/centerpoint-energys-energy-efficiency-programs](https://www.occ.ohio.gov/factsheet/centerpoint-energys-energy-efficiency-programs)"
],
"evidenceText": "CenterPoint Ohio sources identify residential natural gas furnace, boiler, water heater, thermostat, air sealing and insulation rebates for eligible gas customers.",
"reasoningNotes": "The official landing page is hard to parse and detailed materials may be program-year dated; rates should be reviewed by a human before production use.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Current official rate table could not be fully verified from a stable current application page.",
"Some detailed amount evidence comes from consumer or program-year materials rather than a clear 2026 official application table."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1510",
"opportunityName": "The Energy Cooperative - Residential Energy Efficiency Rebate Program",
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
"timing": "post_installation_reimbursement",
"formulaText": "Apply the fixed rebate for the selected Energy Cooperative electric-member measure; Level 2 EV chargers are paid per charger subject to a residential cap.",
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
"eligibleCostCategories": [
"qualifying heat pump equipment",
"qualifying geothermal equipment",
"qualifying central air conditioner",
"qualifying residential refrigerator or freezer",
"qualifying Level 2 EV charger"
],
"ineligibleCostCategories": [
"gas-only member measures",
"non-Level 2 EV charging",
"commercial refrigeration systems"
],
"requiredInputs": [
"selected_measure",
"unit_count",
"energy_star_certified",
"seer_rating",
"charger_count",
"member_type",
"old_appliance_recycling_confirmation"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"unit_count",
"energy_star_certified",
"seer_rating",
"charger_count",
"old_appliance_recycling_confirmation"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "the_energy_cooperative_rebates_2026",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "Heat pump",
"amountCents": 40000,
"unit": "unit"
},
{
"measure": "ENERGY STAR heat pump",
"amountCents": 60000,
"unit": "unit"
},
{
"measure": "ENERGY STAR geothermal heat pump",
"amountCents": 80000,
"unit": "unit"
},
{
"measure": "Central air conditioner, minimum 16 SEER",
"amountCents": 15000,
"unit": "unit"
},
{
"measure": "Air conditioner load-control switch",
"amountCents": 20000,
"unit": "unit"
},
{
"measure": "ENERGY STAR refrigerator replacement",
"amountCents": 10000,
"unit": "unit"
},
{
"measure": "ENERGY STAR stand-alone freezer replacement",
"amountCents": 10000,
"unit": "unit"
},
{
"measure": "Level 2 electric vehicle charger",
"amountCents": 25000,
"unit": "charger",
"perSiteCapCents": 50000
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "The Energy Cooperative rebate page lists fixed rebates for electric members for heat pumps, geothermal, central AC, residential ENERGY STAR refrigerator or freezer, load-control switches and Level 2 EV chargers.",
"sourceUrls": [
"[https://myenergycoop.com/rebate-programs](https://myenergycoop.com/rebate-programs)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "Source supports Level 2 EV chargers only; generic EV charger edge is overbroad because a Level 2 edge exists."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Source lists an ENERGY STAR geothermal heat pump rebate."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Source lists heat pump and ENERGY STAR heat pump rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for the listed heat pump, geothermal and central AC measures."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Keep only for residential ENERGY STAR refrigerator or freezer replacement with old-unit removal."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Source lists a Level 2 EV charger rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Electric members are limited to a maximum of two total rebates per calendar year."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://myenergycoop.com/rebate-programs](https://myenergycoop.com/rebate-programs)",
"[https://programs.dsireusa.org/system/program/detail/1510/the-energy-cooperative-residential-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/1510/the-energy-cooperative-residential-energy-efficiency-rebate-program)"
],
"evidenceText": "The Energy Cooperative current rebate page lists electric-member rebates for heat pumps, geothermal, ENERGY STAR residential appliances, central AC, load-control switches and Level 2 EV chargers.",
"reasoningNotes": "Narrow refrigeration to residential appliance replacement and EV charging to Level 2 chargers. Do not apply these rebates to gas-only members.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4525",
"opportunityName": "Oklahoma Municipal Power Authority - WISE Energy Efficiency Rebate Program",
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
"per_unit_award"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use the WISE program table for the selected measure: heat pump dollars per cooling ton, fixed ceiling-insulation amount by existing R-value, fixed water heater amount by conversion type, or fixed smart thermostat amount capped by cost.",
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
"eligibleCostCategories": [
"qualifying heat pump equipment",
"qualifying ceiling insulation",
"qualifying electric or heat pump water heater",
"qualifying smart thermostat"
],
"ineligibleCostCategories": [
"air sealing",
"tankless water heaters",
"gas water heaters",
"commercial heat pumps above WISE capacity threshold"
],
"requiredInputs": [
"selected_measure",
"cooling_tons",
"seer_or_seer2_rating",
"sector",
"heat_pump_type",
"existing_attic_r_value",
"water_heater_conversion_type",
"water_heater_gallons",
"thermostat_cost",
"participating_city"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"cooling_tons",
"seer_or_seer2_rating",
"sector",
"heat_pump_type",
"existing_attic_r_value",
"water_heater_conversion_type",
"water_heater_gallons",
"thermostat_cost",
"participating_city"
],
"rateTable": {
"tableId": "ompa_wise_heat_pump_2025_2026",
"dimensions": [
"customer_class",
"equipment_type",
"efficiency_tier"
],
"rows": [
{
"measure": "Residential air-source heat pump",
"minRate": 17500,
"maxRate": 30000,
"rateUnit": "cents_per_cooling_ton"
},
{
"measure": "Residential dual-fuel heat pump",
"minRate": 12500,
"maxRate": 25000,
"rateUnit": "cents_per_cooling_ton"
},
{
"measure": "Commercial air-source heat pump",
"minRate": 12500,
"maxRate": 25000,
"rateUnit": "cents_per_cooling_ton"
},
{
"measure": "Commercial dual-fuel heat pump",
"minRate": 7500,
"maxRate": 20000,
"rateUnit": "cents_per_cooling_ton"
},
{
"measure": "Mini-split heat pump",
"minRate": 10000,
"maxRate": 15000,
"rateUnit": "cents_per_cooling_ton"
},
{
"measure": "Geothermal heat pump",
"minRate": 25000,
"maxRate": 80000,
"rateUnit": "cents_per_cooling_ton",
"conditions": "Amount depends on geothermal and dual-fuel/new-well/replacement category."
}
]
},
"measureCatalog": {
"catalogId": "ompa_wise_non_heatpump_2025_2026",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "Ceiling insulation, existing R-0 to R-4",
"amountCents": 50000,
"unit": "project"
},
{
"measure": "Ceiling insulation, existing R-5 to R-14",
"amountCents": 30000,
"unit": "project"
},
{
"measure": "Ceiling insulation, existing R-15 to R-22",
"amountCents": 25000,
"unit": "project"
},
{
"measure": "Electric resistance water heater, 30 to less than 40 gallons",
"amountCents": 20000,
"unit": "unit"
},
{
"measure": "Electric resistance or heat pump water heater, at least 40 gallons",
"amountCents": 25000,
"unit": "unit"
},
{
"measure": "Gas to electric resistance water heater conversion",
"amountCents": 35000,
"unit": "unit"
},
{
"measure": "Gas to electric heat pump water heater conversion",
"amountCents": 50000,
"unit": "unit"
},
{
"measure": "Smart thermostat",
"amountCents": 5000,
"unit": "thermostat",
"conditions": "Rebate cannot exceed purchase price."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "OMPA WISE source materials publish heat pump, ceiling insulation, water heater and smart thermostat rebate tables for participating member-city electric customers.",
"sourceUrls": [
"[https://www.ompa.com/services/rebate-programs/](https://www.ompa.com/services/rebate-programs/)",
"[https://www.ompa.com/wp-content/uploads/2025/03/WISE-Participation-By-City.pdf](https://www.ompa.com/wp-content/uploads/2025/03/WISE-Participation-By-City.pdf)",
"[https://www.ompa.com/wp-content/uploads/2026/01/WISE-Heat-Pump-Rebate-Program-Trifold-Brochure-2025-WEB.pdf](https://www.ompa.com/wp-content/uploads/2026/01/WISE-Heat-Pump-Rebate-Program-Trifold-Brochure-2025-WEB.pdf)",
"[https://www.ompa.com/wp-content/uploads/2025/12/Ceiling-Insulation-Rebate-Program-Guidlines-2025.pdf](https://www.ompa.com/wp-content/uploads/2025/12/Ceiling-Insulation-Rebate-Program-Guidlines-2025.pdf)",
"[https://www.ompa.com/wp-content/uploads/2025/12/WISE-Water-Heater-Rebate-Summary-2025.pdf](https://www.ompa.com/wp-content/uploads/2025/12/WISE-Water-Heater-Rebate-Summary-2025.pdf)",
"[https://www.ompa.com/wp-content/uploads/2025/12/Smart-Thermostat-Rebate-Summary-updated.pdf](https://www.ompa.com/wp-content/uploads/2025/12/Smart-Thermostat-Rebate-Summary-updated.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "delete_bad_edge",
"reason": "Current WISE materials checked support ceiling insulation but not a standalone air sealing rebate."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "WISE heat pump materials include geothermal heat pump rebate rates."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "WISE materials include air-source, dual-fuel, mini-split and geothermal heat pump rebates."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "WISE water heater materials include qualifying heat pump water heater rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for WISE-listed heat pump HVAC categories; larger C&I projects may belong to DEEP."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "WISE materials include ceiling insulation rebates by existing R-value."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Customer city participation must be checked for the specific WISE rebate type before applying an amount."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.ompa.com/services/rebate-programs/](https://www.ompa.com/services/rebate-programs/)",
"[https://www.ompa.com/wp-content/uploads/2025/03/WISE-Participation-By-City.pdf](https://www.ompa.com/wp-content/uploads/2025/03/WISE-Participation-By-City.pdf)",
"[https://www.ompa.com/wp-content/uploads/2026/01/WISE-Heat-Pump-Rebate-Program-Trifold-Brochure-2025-WEB.pdf](https://www.ompa.com/wp-content/uploads/2026/01/WISE-Heat-Pump-Rebate-Program-Trifold-Brochure-2025-WEB.pdf)",
"[https://www.ompa.com/wp-content/uploads/2025/12/Ceiling-Insulation-Rebate-Program-Guidlines-2025.pdf](https://www.ompa.com/wp-content/uploads/2025/12/Ceiling-Insulation-Rebate-Program-Guidlines-2025.pdf)",
"[https://www.ompa.com/wp-content/uploads/2025/12/WISE-Water-Heater-Rebate-Summary-2025.pdf](https://www.ompa.com/wp-content/uploads/2025/12/WISE-Water-Heater-Rebate-Summary-2025.pdf)",
"[https://www.ompa.com/wp-content/uploads/2025/12/Smart-Thermostat-Rebate-Summary-updated.pdf](https://www.ompa.com/wp-content/uploads/2025/12/Smart-Thermostat-Rebate-Summary-updated.pdf)",
"[https://programs.dsireusa.org/system/program/detail/4525/oklahoma-municipal-power-authority-wise-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/4525/oklahoma-municipal-power-authority-wise-energy-efficiency-rebate-program)"
],
"evidenceText": "OMPA WISE materials list rebates for heat pumps, ceiling insulation, electric and heat pump water heaters and smart thermostats, but not standalone air sealing.",
"reasoningNotes": "The existing thermostat-only simple rule was incomplete and mapped to the wrong retrofit family. The repaired package includes heat-pump, water-heater and ceiling-insulation tables.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2925",
"opportunityName": "Austin Energy - Commercial New Construction Efficiency Rebates",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
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
"formulaText": "For qualifying commercial new construction measures, multiply the approved kW shifted, peak kW reduction, device count, unit count or lighting kW tier by the Austin Energy published rate.",
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
"qualifying new construction lighting",
"qualifying HVAC equipment exceeding code",
"thermal energy storage",
"variable frequency drives",
"heat pump water heaters",
"guest room controls",
"custom efficiency technologies"
],
"ineligibleCostCategories": [
"battery storage",
"code-required equipment",
"building envelope measures",
"existing-building retrofits outside eligible major remodel or build-out scope"
],
"requiredInputs": [
"selected_measure",
"approved_kw_savings",
"kw_shifted",
"device_count",
"unit_count",
"lighting_reduction_tier",
"building_type",
"nonprofit_or_small_business_bonus_status",
"application_submitted_before_installation"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"approved_kw_savings",
"kw_shifted",
"device_count",
"unit_count",
"lighting_reduction_tier",
"building_type",
"nonprofit_or_small_business_bonus_status"
],
"rateTable": {
"tableId": "austin_energy_commercial_new_construction_2026",
"dimensions": [
"measure",
"tier"
],
"rows": [
{
"measure": "New construction lighting, non-parking or non-warehouse Tier 1",
"rate": 10500,
"rateUnit": "cents_per_kw"
},
{
"measure": "New construction lighting, non-parking or non-warehouse Tier 2",
"rate": 21000,
"rateUnit": "cents_per_kw"
},
{
"measure": "New construction lighting, non-parking or non-warehouse Tier 3",
"rate": 37000,
"rateUnit": "cents_per_kw"
},
{
"measure": "Cooling towers",
"rate": 55000,
"rateUnit": "cents_per_kw"
},
{
"measure": "Energy recovery ventilation",
"rate": 55000,
"rateUnit": "cents_per_kw"
},
{
"measure": "Custom equipment",
"rate": 55000,
"rateUnit": "cents_per_kw"
},
{
"measure": "Process change",
"rate": 31000,
"rateUnit": "cents_per_kw"
},
{
"measure": "Electronically commutated motor",
"rate": 55000,
"rateUnit": "cents_per_kw"
},
{
"measure": "Thermal energy storage",
"rate": 45000,
"rateUnit": "cents_per_kw_shifted"
},
{
"measure": "Uninterruptible power supply efficiency",
"rate": 55000,
"rateUnit": "cents_per_kw"
},
{
"measure": "Variable frequency drive",
"rate": 62500,
"rateUnit": "cents_per_kw"
}
]
},
"measureCatalog": {
"catalogId": "austin_energy_new_construction_device_measures_2026",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "Guest room controller",
"amountCents": 6500,
"unit": "device"
},
{
"measure": "Smart thermostat",
"amountCents": 5000,
"unit": "device"
},
{
"measure": "Heat pump water heater",
"amountCents": 100000,
"unit": "unit"
},
{
"measure": "Eligible nonprofit or small business bonus",
"percent": 0.3,
"unit": "base_rebate",
"conditions": "Add 30% where source bonus eligibility is met."
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Austin Energy commercial new construction materials publish rates for lighting, HVAC, TES, VFDs, heat pump water heaters, guest room controls and custom technologies.",
"sourceUrls": [
"[https://austinenergy.com/energy-efficiency/rebates-incentives/commercial/new-construction-rebates](https://austinenergy.com/energy-efficiency/rebates-incentives/commercial/new-construction-rebates)",
"[https://rebates.austinenergy.com/](https://rebates.austinenergy.com/)",
"[https://austinenergy.com/-/media/Project/Websites/AustinEnergy/Energy-Efficiency/Rebates/PDFs/Commercial-Rebate-Summary.pdf?hash=DAFD7A94996969832329470CD188BED1&rev=6a1e786c02d74711980cb81ec29e2e98&sc_lang=en](https://austinenergy.com/-/media/Project/Websites/AustinEnergy/Energy-Efficiency/Rebates/PDFs/Commercial-Rebate-Summary.pdf?hash=DAFD7A94996969832329470CD188BED1&rev=6a1e786c02d74711980cb81ec29e2e98&sc_lang=en)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "battery_storage_system",
"action": "delete_bad_edge",
"reason": "Battery storage is not a supported measure in this commercial new construction efficiency rebate."
},
{
"retrofitTypeId": "energy_management_system",
"action": "keep",
"reason": "Keep only for listed guest room controls, smart thermostats or approved custom efficiency technologies."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Keep only for eligible new construction, build-out or major-remodel HVAC measures that exceed code."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for Austin Energy listed commercial HVAC equipment measures."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Keep only for new construction, addition, build-out, finish-out or major-remodel lighting measures."
},
{
"retrofitTypeId": "thermal_energy_storage",
"action": "keep",
"reason": "Austin Energy publishes a thermal energy storage rate per kW shifted."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "A 30% bonus may apply for eligible nonprofit and small business customers; do not apply to ineligible customers."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://austinenergy.com/energy-efficiency/rebates-incentives/commercial](https://austinenergy.com/energy-efficiency/rebates-incentives/commercial)",
"[https://austinenergy.com/energy-efficiency/rebates-incentives/commercial/new-construction-rebates](https://austinenergy.com/energy-efficiency/rebates-incentives/commercial/new-construction-rebates)",
"[https://rebates.austinenergy.com/](https://rebates.austinenergy.com/)",
"[https://austinenergy.com/-/media/Project/Websites/AustinEnergy/Energy-Efficiency/Rebates/PDFs/Commercial-Rebate-Summary.pdf?hash=DAFD7A94996969832329470CD188BED1&rev=6a1e786c02d74711980cb81ec29e2e98&sc_lang=en](https://austinenergy.com/-/media/Project/Websites/AustinEnergy/Energy-Efficiency/Rebates/PDFs/Commercial-Rebate-Summary.pdf?hash=DAFD7A94996969832329470CD188BED1&rev=6a1e786c02d74711980cb81ec29e2e98&sc_lang=en)"
],
"evidenceText": "Austin Energy lists commercial new construction incentives for lighting, HVAC, thermal energy storage, VFDs, HPWH, guest room controls and custom technologies.",
"reasoningNotes": "Thermal energy storage is supported, but battery storage is not. This is a new construction or major-remodel program, not a generic retrofit program.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3322",
"opportunityName": "Guadalupe Valley Electric Cooperative - Residential Energy Efficiency Rebate Programs",
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
"timing": "post_installation_reimbursement",
"formulaText": "Use the fixed GVEC HVAC or Peak-Time Payback enrollment amount, the lesser-of EV charger installation formula, or the published battery initial rebate rate by eligible battery product and installation date.",
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
"qualifying Level 2 EV charging installation cost",
"qualifying all-electric heat pump AC or heating system",
"qualifying smart thermostat enrollment",
"qualifying eligible battery system enrollment"
],
"ineligibleCostCategories": [
"Level 1 charging",
"unsupported EV charger brands",
"mini-split or ductless HVAC for the HVAC rebate",
"general solar or generator systems"
],
"requiredInputs": [
"selected_measure",
"installation_cost",
"customer_class",
"unit_count",
"battery_product",
"battery_continuous_rated_kw",
"battery_installation_date",
"thermostat_count",
"peak_time_payback_enrollment"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"installation_cost",
"customer_class",
"unit_count",
"battery_product",
"battery_continuous_rated_kw",
"battery_installation_date",
"thermostat_count",
"peak_time_payback_enrollment"
],
"rateTable": {
"tableId": "gvec_peak_time_payback_initial_rates",
"dimensions": [
"measure",
"date_or_customer_class"
],
"rows": [
{
"measure": "Residential Level 2 EV charger installation",
"percent": 0.5,
"maxAmountCents": 60000,
"unit": "service_location"
},
{
"measure": "Commercial Level 2 EV charger installation",
"percent": 0.5,
"maxAmountCents": 300000,
"unit": "service_location"
},
{
"measure": "Enphase battery installed before July 1, 2024",
"rate": 7500,
"rateUnit": "cents_per_kw"
},
{
"measure": "Enphase battery installed on or after July 1, 2024",
"rate": 22000,
"rateUnit": "cents_per_kw"
},
{
"measure": "Tesla Powerwall installed before January 1, 2025",
"rate": 7500,
"rateUnit": "cents_per_kw"
},
{
"measure": "Tesla Powerwall installed January 1, 2025 through March 30, 2026",
"rate": 22000,
"rateUnit": "cents_per_kw"
},
{
"measure": "Tesla Powerwall first eligible Powerwall installed on or after April 1, 2026",
"rate": 51500,
"rateUnit": "cents_per_kw"
},
{
"measure": "Tesla Powerwall additional eligible Powerwall installed on or after April 1, 2026",
"rate": 22000,
"rateUnit": "cents_per_kw"
}
]
},
"measureCatalog": {
"catalogId": "gvec_residential_rebates_2026",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "All-electric heat pump AC or heating system, 17 SEER2 or greater",
"amountCents": 65000,
"unit": "unit"
},
{
"measure": "Smart thermostat Peak-Time Payback signup",
"amountCents": 8500,
"unit": "thermostat"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "GVEC source pages publish Level 2 EV charger formulas, a fixed qualifying heat pump rebate, smart thermostat Peak-Time Payback signup credit and battery initial rebate rates.",
"sourceUrls": [
"[https://www.gvec.org/electric/rebates/](https://www.gvec.org/electric/rebates/)",
"[https://www.gvec.org/electric/hvac_rebate/](https://www.gvec.org/electric/hvac_rebate/)",
"[https://www.gvec.org/ev-rebate/](https://www.gvec.org/ev-rebate/)",
"[https://www.gvec.org/peak-time-payback/](https://www.gvec.org/peak-time-payback/)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "annual",
"formulaText": "For eligible Peak-Time Payback enrollment, multiply $30 per qualifying thermostat per year and $75 per installed eligible battery kW per year, subject to enrollment and verification.",
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
"thermostat_count",
"battery_continuous_rated_kw",
"months_enrolled",
"peak_time_payback_enrollment"
],
"missingInputsForTypicalRetroFiEstimate": [
"thermostat_count",
"battery_continuous_rated_kw",
"months_enrolled",
"peak_time_payback_enrollment"
],
"rateTable": {
"tableId": "gvec_peak_time_payback_annual",
"dimensions": [
"enrolled_asset"
],
"rows": [
{
"measure": "Smart thermostat annual Peak-Time Payback participation",
"rate": 3000,
"rateUnit": "cents_per_thermostat_per_year"
},
{
"measure": "Battery annual Peak-Time Payback participation",
"rate": 7500,
"rateUnit": "cents_per_kw_per_year"
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
"evidenceText": "GVEC Peak-Time Payback materials describe recurring annual bill credits for qualifying enrolled thermostats and eligible battery kW.",
"sourceUrls": [
"[https://www.gvec.org/peak-time-payback/](https://www.gvec.org/peak-time-payback/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "battery_storage_system",
"action": "keep",
"reason": "GVEC Peak-Time Payback includes eligible battery systems with initial and annual credits."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "GVEC rebate requires Level 2 charging; generic EV charger edge is overbroad because a Level 2 edge exists."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "GVEC publishes a qualifying all-electric heat pump AC or heating system rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for qualifying all-electric heat pump AC or heating systems."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "GVEC publishes residential and commercial Level 2 EV charger installation rebate formulas."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "GVEC Peak-Time Payback includes smart thermostat signup and annual credits."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "GVEC notes battery reward amounts are subject to change without notice; do not count financing as cash savings."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.gvec.org/electric/rebates/](https://www.gvec.org/electric/rebates/)",
"[https://www.gvec.org/electric/hvac_rebate/](https://www.gvec.org/electric/hvac_rebate/)",
"[https://www.gvec.org/ev-rebate/](https://www.gvec.org/ev-rebate/)",
"[https://www.gvec.org/peak-time-payback/](https://www.gvec.org/peak-time-payback/)",
"[https://programs.dsireusa.org/system/program/detail/3322/guadalupe-valley-electric-cooperative-residential-energy-efficiency-rebate-programs](https://programs.dsireusa.org/system/program/detail/3322/guadalupe-valley-electric-cooperative-residential-energy-efficiency-rebate-programs)"
],
"evidenceText": "GVEC official rebate materials list heat pump HVAC, Level 2 EV charging, smart thermostat Peak-Time Payback and battery Peak-Time Payback incentives.",
"reasoningNotes": "EV charging is retained only as Level 2. Battery storage is supported as a Peak-Time Payback incentive, not as a general solar or generator rebate.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2690",
"opportunityName": "Dominion Energy - Home Builder Gas Appliance Rebate Program",
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
"rate_table"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "For qualifying Utah new single-family builder measures, use the fixed ThermWise amount or, for windows, multiply qualifying square feet by the published dollars-per-square-foot rate.",
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
"eligibleCostCategories": [
"qualifying new construction gas furnace",
"qualifying new construction gas boiler",
"qualifying dual-fuel system",
"qualifying energy recovery ventilation",
"qualifying insulation",
"qualifying windows",
"qualifying smart thermostat",
"qualifying gas water heating"
],
"ineligibleCostCategories": [
"existing-home retrofit work",
"non-gas-service homes",
"equipment already receiving another ThermWise rebate"
],
"requiredInputs": [
"selected_measure",
"unit_count",
"window_square_feet",
"afue",
"dual_fuel_tier",
"thermostat_tier",
"gas_service_turn_on_date",
"builder_or_owner_builder_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"unit_count",
"window_square_feet",
"afue",
"dual_fuel_tier",
"thermostat_tier",
"gas_service_turn_on_date",
"builder_or_owner_builder_status"
],
"rateTable": {
"tableId": "enbridge_thermwise_ut_builder_rates_2026",
"dimensions": [
"measure"
],
"rows": [
{
"measure": "High-performance windows, U-factor below 0.22",
"rate": 250,
"rateUnit": "cents_per_square_foot"
}
]
},
"measureCatalog": {
"catalogId": "enbridge_thermwise_ut_builder_2026",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "Continuous exterior rigid insulation, R-5 or greater",
"amountCents": 20000,
"unit": "dwelling"
},
{
"measure": "Exterior wall insulation, 2x6 R-23 or code equivalent",
"amountCents": 15000,
"unit": "dwelling"
},
{
"measure": "High-efficiency gas furnace, 95% to 97.4% AFUE",
"amountCents": 30000,
"unit": "unit"
},
{
"measure": "High-efficiency gas furnace, 97.5% AFUE or greater",
"amountCents": 35000,
"unit": "unit"
},
{
"measure": "Dual-fuel Tier 1, furnace plus heat pump",
"amountCents": 100000,
"unit": "system"
},
{
"measure": "Dual-fuel Tier 1, heat pump only",
"amountCents": 70000,
"unit": "system"
},
{
"measure": "Dual-fuel Tier 2, furnace plus heat pump",
"amountCents": 120000,
"unit": "system"
},
{
"measure": "Dual-fuel Tier 2, heat pump only",
"amountCents": 85000,
"unit": "system"
},
{
"measure": "Energy recovery ventilation",
"amountCents": 30000,
"unit": "system"
},
{
"measure": "Residential gas boiler, 85% to 94.9% AFUE",
"amountCents": 40000,
"unit": "unit"
},
{
"measure": "Residential gas boiler, 95% AFUE or greater",
"amountCents": 60000,
"unit": "unit"
},
{
"measure": "Smart thermostat Tier 1",
"amountCents": 5000,
"unit": "thermostat"
},
{
"measure": "Smart thermostat Tier 2",
"amountCents": 7500,
"unit": "thermostat"
},
{
"measure": "ENERGY STAR gas storage water heater",
"amountCents": 10000,
"unit": "unit"
},
{
"measure": "ENERGY STAR gas tankless water heater",
"amountCents": 30000,
"unit": "unit"
},
{
"measure": "ENERGY STAR gas condensing storage water heater",
"amountCents": 35000,
"unit": "unit"
},
{
"measure": "Combined space and water heating unit, 95% AFUE or greater",
"amountCents": 75000,
"unit": "unit"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "ThermWise Utah builder materials publish 2026 fixed and per-square-foot rebates for new single-family gas-service dwellings and builder-installed measures.",
"sourceUrls": [
"[https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates](https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates)",
"[https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/UTBuilderApp-SF.pdf?hash=8CB0CAFD6E9FAB2E306706BB084A3123&rev=0701dd92b34149d4bd79677db4dfc70e](https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/UTBuilderApp-SF.pdf?hash=8CB0CAFD6E9FAB2E306706BB084A3123&rev=0701dd92b34149d4bd79677db4dfc70e)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "energy_recovery_ventilation_retrofit",
"action": "keep",
"reason": "Keep only as a new-construction builder ERV measure for qualifying gas-service dwellings."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "Keep only as a new-construction builder gas boiler measure."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "Keep only as a new-construction builder gas furnace measure."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for listed builder gas furnace, boiler and dual-fuel system measures."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Keep only for listed new-construction continuous rigid or exterior wall insulation measures."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "ThermWise builder materials publish Tier 1 and Tier 2 smart thermostat rebates."
}
],
"stackingRules": {
"stackableWithRebates": false,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "ThermWise builder materials state the same equipment cannot receive another ThermWise rebate."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "2026-12-31 promotion end; request postmarked within six months of gas service turn-on",
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates](https://www.enbridgegas.com/utwyid/save-money/thermwise/appliance-rebates)",
"[https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates](https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates)",
"[https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/UTBuilderApp-SF.pdf?hash=8CB0CAFD6E9FAB2E306706BB084A3123&rev=0701dd92b34149d4bd79677db4dfc70e](https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/UTBuilderApp-SF.pdf?hash=8CB0CAFD6E9FAB2E306706BB084A3123&rev=0701dd92b34149d4bd79677db4dfc70e)",
"[https://pscdocs.utah.gov/gas/25docs/2505722/342527EGUExhbt1.9LgsltvTrfRvsns10-31-2025.pdf](https://pscdocs.utah.gov/gas/25docs/2505722/342527EGUExhbt1.9LgsltvTrfRvsns10-31-2025.pdf)"
],
"evidenceText": "ThermWise builder materials list new-construction rebates for gas furnaces, boilers, dual-fuel systems, ERV, insulation, windows, smart thermostats and gas water heating.",
"reasoningNotes": "This opportunity should not match ordinary existing-home retrofits; it is a builder or owner-builder new residential construction rebate.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5709",
"opportunityName": "TVA - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Select the applicable TVA EnergyRight residential rebate measure and multiply the fixed published rebate by the qualifying unit count where a unit count applies.",
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
"qualifying HVAC equipment",
"qualifying duct work",
"qualifying insulation",
"qualifying air sealing"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"selected_measure",
"unit_count",
"seer2_rating",
"equipment_type",
"qcn_contractor_confirmation",
"participating_tva_local_power_company"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"unit_count",
"seer2_rating",
"equipment_type",
"qcn_contractor_confirmation"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "tva_energyright_residential_2026",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "Geothermal heat pump",
"amountCents": 150000,
"unit": "system"
},
{
"measure": "Air-source or dual-fuel heat pump, 17+ SEER2",
"amountCents": 80000,
"unit": "system"
},
{
"measure": "Air-source or dual-fuel heat pump, 15-16.99 SEER2",
"amountCents": 50000,
"unit": "system"
},
{
"measure": "Ductless mini-split heat pump, 17+ SEER2",
"amountCents": 80000,
"unit": "system"
},
{
"measure": "Central air conditioner, 17+ SEER2",
"amountCents": 40000,
"unit": "system"
},
{
"measure": "Central air conditioner, 15-16.99 SEER2",
"amountCents": 25000,
"unit": "system"
},
{
"measure": "Duct sealing, repair, insulation or replacement",
"amountCents": 30000,
"unit": "project"
},
{
"measure": "Attic insulation",
"amountCents": 50000,
"unit": "project"
},
{
"measure": "Wall insulation",
"amountCents": 30000,
"unit": "project"
},
{
"measure": "Whole-home envelope air sealing",
"amountCents": 30000,
"unit": "project"
},
{
"measure": "HVAC tune-up for existing heat pump or central AC",
"amountCents": 5000,
"unit": "system"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Current TVA EnergyRight residential pages publish fixed rebates for geothermal, air-source heat pumps, mini-splits, central AC, duct work, attic and wall insulation, air sealing, and HVAC tune-ups.",
"sourceUrls": [
"[https://energyright.com/residential/rebates/](https://energyright.com/residential/rebates/)",
"[https://energyright.com/residential/rebates/geothermal-heat-pump/](https://energyright.com/residential/rebates/geothermal-heat-pump/)",
"[https://energyright.com/residential/rebates/heat-pump/](https://energyright.com/residential/rebates/heat-pump/)",
"[https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/](https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/)",
"[https://energyright.com/residential/rebates/home-insulation-air-sealing/](https://energyright.com/residential/rebates/home-insulation-air-sealing/)",
"[https://energyright.com/residential/rebates/central-air-conditioner/](https://energyright.com/residential/rebates/central-air-conditioner/)",
"[https://energyright.com/residential/rebates/mini-split/](https://energyright.com/residential/rebates/mini-split/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "TVA publishes a whole-home air sealing rebate."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "keep",
"reason": "TVA publishes a duct sealing, repair, insulation or replacement rebate."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "TVA publishes a geothermal heat pump rebate."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "TVA publishes air-source, dual-fuel and ductless mini-split heat pump rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for listed TVA central AC, heat pump and HVAC tune-up measures."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "TVA publishes attic and wall insulation rebates."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": true,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "TVA states EnergyRight rebates may be stackable with federal tax credits and state rebates where applicable."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://energyright.com/residential/rebates/](https://energyright.com/residential/rebates/)",
"[https://energyright.com/residential/rebates/geothermal-heat-pump/](https://energyright.com/residential/rebates/geothermal-heat-pump/)",
"[https://energyright.com/residential/rebates/heat-pump/](https://energyright.com/residential/rebates/heat-pump/)",
"[https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/](https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/)",
"[https://energyright.com/residential/rebates/home-insulation-air-sealing/](https://energyright.com/residential/rebates/home-insulation-air-sealing/)",
"[https://programs.dsireusa.org/system/program/detail/5709/tva-residential-energy-efficiency-rebate-program](https://programs.dsireusa.org/system/program/detail/5709/tva-residential-energy-efficiency-rebate-program)"
],
"evidenceText": "TVA EnergyRight current residential rebate pages list fixed rebate amounts for QCN-installed heat pump, geothermal, AC, duct, air sealing and insulation measures.",
"reasoningNotes": "The VA record shares the TVA EnergyRight residential rebate structure but is limited to TVA-served local power company customers in Virginia.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3179",
"opportunityName": "Chelan County PUD - Residential Weatherization Rebate Program",
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
"per_unit_award"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Apply the Chelan PUD fixed rebate or dollars-per-square-foot rate for the selected eligible measure, subject to home type, existing heat source, R-value and project cost limits.",
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
"maxUnits": 2,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying heat pump conversion or upgrade",
"qualifying ductless mini-split",
"qualifying duct sealing",
"qualifying insulation",
"qualifying thermostat",
"qualifying heat pump water heater",
"qualifying windows and exterior doors"
],
"ineligibleCostCategories": [
"standalone air sealing",
"gas-heated homes where electric heat is required",
"new construction where measure pages exclude it"
],
"requiredInputs": [
"selected_measure",
"home_type",
"existing_primary_heat_source",
"current_heat_pump_status",
"square_feet",
"existing_r_value",
"unit_count",
"project_cost",
"licensed_contractor_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"home_type",
"existing_primary_heat_source",
"current_heat_pump_status",
"square_feet",
"existing_r_value",
"unit_count",
"project_cost"
],
"rateTable": {
"tableId": "chelan_pud_residential_weatherization_2026_2027",
"dimensions": [
"measure",
"existing_condition",
"home_type"
],
"rows": [
{
"measure": "Attic insulation, no existing insulation",
"rate": 200,
"rateUnit": "cents_per_square_foot"
},
{
"measure": "Attic insulation, existing R-11 or below",
"rate": 60,
"rateUnit": "cents_per_square_foot"
},
{
"measure": "Exterior wall insulation, no existing insulation",
"rate": 125,
"rateUnit": "cents_per_square_foot"
},
{
"measure": "Floor insulation, no existing insulation",
"rate": 60,
"rateUnit": "cents_per_square_foot"
},
{
"measure": "Site-built single-family window or patio door replacement",
"minRate": 600,
"maxRate": 800,
"rateUnit": "cents_per_square_foot"
},
{
"measure": "Manufactured home window or patio door replacement",
"minRate": 1000,
"maxRate": 2000,
"rateUnit": "cents_per_square_foot"
},
{
"measure": "Multifamily window or patio door replacement",
"minRate": 2000,
"maxRate": 2500,
"rateUnit": "cents_per_square_foot"
}
]
},
"measureCatalog": {
"catalogId": "chelan_pud_residential_fixed_rebates_2026_2027",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "Heat pump conversion from electric resistance furnace",
"amountCents": 330000,
"unit": "system"
},
{
"measure": "Heat pump upgrade to variable-speed inverter heat pump",
"amountCents": 60000,
"unit": "system"
},
{
"measure": "Ductless mini-split conversion, existing site-built single-family",
"amountCents": 160000,
"unit": "system"
},
{
"measure": "Ductless mini-split conversion, existing manufactured home",
"amountCents": 200000,
"unit": "system"
},
{
"measure": "Ductless mini-split conversion, existing multifamily",
"amountCents": 100000,
"unit": "system"
},
{
"measure": "Duct sealing, site-built single-family",
"amountCents": 50000,
"unit": "project",
"maxPercentOfEligibleCost": 1
},
{
"measure": "Duct sealing, manufactured home",
"amountCents": 70000,
"unit": "project",
"maxPercentOfEligibleCost": 1
},
{
"measure": "Heat pump water heater conversion",
"amountCents": 130000,
"unit": "unit",
"maxUnits": 2,
"maxPercentOfEligibleCost": 1
},
{
"measure": "Smart thermostat",
"amountCents": 10000,
"unit": "thermostat",
"maxUnits": 2,
"maxPercentOfEligibleCost": 1
},
{
"measure": "Line-voltage communicating thermostat",
"amountCents": 5000,
"unit": "thermostat",
"maxPercentOfEligibleCost": 1
},
{
"measure": "ENERGY STAR exterior door",
"amountCents": 8000,
"unit": "door"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Chelan PUD publishes fixed and per-square-foot residential rebates for electric-heated homes, including heat pumps, duct sealing, insulation, thermostats, HPWH, windows and doors.",
"sourceUrls": [
"[https://www.chelanpud.org/conservationhome/residential](https://www.chelanpud.org/conservationhome/residential)",
"[https://www.chelanpud.org/conservationhome/residential/heat-pump-rebates](https://www.chelanpud.org/conservationhome/residential/heat-pump-rebates)",
"[https://www.chelanpud.org/conservationhome/residential/insulation-rebates](https://www.chelanpud.org/conservationhome/residential/insulation-rebates)",
"[https://www.chelanpud.org/conservationhome/residential/site-built-home-duct-sealing](https://www.chelanpud.org/conservationhome/residential/site-built-home-duct-sealing)",
"[https://www.chelanpud.org/conservationhome/residential/thermostats](https://www.chelanpud.org/conservationhome/residential/thermostats)",
"[https://www.chelanpud.org/conservationhome/residential/heat-pump-water-heater-rebates](https://www.chelanpud.org/conservationhome/residential/heat-pump-water-heater-rebates)",
"[https://www.chelanpud.org/conservationhome/residential/window-rebates](https://www.chelanpud.org/conservationhome/residential/window-rebates)",
"[https://www.chelanpud.org/conservationhome/residential/door-rebates](https://www.chelanpud.org/conservationhome/residential/door-rebates)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "delete_bad_edge",
"reason": "Current Chelan PUD pages checked do not list standalone air sealing as a separate rebate."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "keep",
"reason": "Chelan PUD publishes duct sealing rebates."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Chelan PUD publishes heat pump conversion, upgrade and ductless mini-split rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for listed heat pump conversion, upgrade or ductless mini-split measures."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Chelan PUD publishes attic, wall and floor insulation rebate rates."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Chelan PUD publishes smart and line-voltage thermostat rebates."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Several Chelan PUD rebates cannot exceed total project cost; verify measure-specific caps before totaling."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "Current rebate period shown as April 1, 2026 through March 31, 2027 for listed residential rebates",
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.chelanpud.org/conservationhome/residential](https://www.chelanpud.org/conservationhome/residential)",
"[https://www.chelanpud.org/conservationhome/residential/heat-pump-rebates](https://www.chelanpud.org/conservationhome/residential/heat-pump-rebates)",
"[https://www.chelanpud.org/conservationhome/residential/insulation-rebates](https://www.chelanpud.org/conservationhome/residential/insulation-rebates)",
"[https://www.chelanpud.org/conservationhome/residential/site-built-home-duct-sealing](https://www.chelanpud.org/conservationhome/residential/site-built-home-duct-sealing)",
"[https://www.chelanpud.org/conservationhome/residential/window-rebates](https://www.chelanpud.org/conservationhome/residential/window-rebates)",
"[https://www.chelanpud.org/conservationhome/residential/thermostats](https://www.chelanpud.org/conservationhome/residential/thermostats)",
"[https://www.chelanpud.org/conservationhome/residential/rebate-application](https://www.chelanpud.org/conservationhome/residential/rebate-application)"
],
"evidenceText": "Chelan PUD residential rebate pages list heat pumps, thermostats, duct sealing, HPWH, windows, exterior doors and insulation for qualifying electric-heated homes.",
"reasoningNotes": "Standalone air sealing was not supported. HVAC and weatherization values require home type, existing heat source, R-values and square footage.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2130",
"opportunityName": "Orcas Power & Light - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "estimate_from_range",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"rate_table",
"per_unit_award"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use the OPALCO fixed rebate for the selected measure; insulation uses the published dollars-per-square-foot range by installed measure and conditions.",
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
"qualifying ductless heat pump",
"qualifying heat pump water heater",
"qualifying Level 2 EV charging station",
"qualifying insulation",
"qualifying windows"
],
"ineligibleCostCategories": [
"ducted PTCS heat pumps after applications stopped",
"gas water heater replacement for HPWH rebate",
"new construction HPWH",
"non-Level 2 charging"
],
"requiredInputs": [
"selected_measure",
"unit_count",
"home_type",
"water_heater_type",
"tank_size",
"tier",
"square_feet",
"level_2_charger_confirmation",
"existing_equipment_type"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"unit_count",
"home_type",
"water_heater_type",
"tank_size",
"tier",
"square_feet",
"level_2_charger_confirmation",
"existing_equipment_type"
],
"rateTable": {
"tableId": "opalco_insulation_rebate_range",
"dimensions": [
"insulation_measure"
],
"rows": [
{
"measure": "Insulation",
"minRate": 9,
"maxRate": 200,
"rateUnit": "cents_per_square_foot",
"conditions": "Specific rate depends on insulation location and qualifying conditions."
}
]
},
"measureCatalog": {
"catalogId": "opalco_residential_rebates_current",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "Unitary heat pump water heater, 40-gallon tank",
"amountCents": 140000,
"unit": "unit"
},
{
"measure": "Unitary heat pump water heater, Tier 3, 50+ gallons",
"amountCents": 160000,
"unit": "unit"
},
{
"measure": "Unitary heat pump water heater, Tier 4, 50+ gallons",
"amountCents": 180000,
"unit": "unit"
},
{
"measure": "Split-system heat pump water heater",
"amountCents": 220000,
"unit": "unit"
},
{
"measure": "Level 2 EV charging station",
"amountCents": 50000,
"unit": "station"
},
{
"measure": "Ductless heat pump",
"amountCents": 92000,
"unit": "system"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "OPALCO residential pages list rebates for Level 2 EV charging, heat pump water heaters, ductless heat pumps and insulation; the ducted PTCS rebate stopped taking applications in 2023.",
"sourceUrls": [
"[https://www.opalco.com/save/residential-rebates/](https://www.opalco.com/save/residential-rebates/)",
"[https://www.opalco.com/save/residential-rebates/heat-pump-water-heater/](https://www.opalco.com/save/residential-rebates/heat-pump-water-heater/)",
"[https://www.opalco.com/save/residential-rebates/ev-charging-station/](https://www.opalco.com/save/residential-rebates/ev-charging-station/)",
"[https://www.opalco.com/save/residential-rebates/ductless-heat-pump/](https://www.opalco.com/save/residential-rebates/ductless-heat-pump/)",
"[https://www.opalco.com/save/residential-rebates/window/](https://www.opalco.com/save/residential-rebates/window/)",
"[https://www.opalco.com/save/residential-rebates/insulation/](https://www.opalco.com/save/residential-rebates/insulation/)",
"[https://www.opalco.com/save/residential-rebates/ducted-heat-pump/](https://www.opalco.com/save/residential-rebates/ducted-heat-pump/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "OPALCO supports Level 2 charging stations; generic EV charger edge is overbroad because a Level 2 edge exists."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Keep for current ductless heat pump rebates; do not use stale ducted PTCS rebate."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "OPALCO publishes heat pump water heater rebate tiers."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Broad high-efficiency HVAC replacement is unsupported; current support is specific ductless heat pump measures."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "OPALCO publishes insulation rebate rates."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "OPALCO publishes a Level 2 EV charging station rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "OPALCO Switch It Up financing is separate and should not be counted as a rebate value."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.opalco.com/save/residential-rebates/](https://www.opalco.com/save/residential-rebates/)",
"[https://www.opalco.com/save/residential-rebates/heat-pump-water-heater/](https://www.opalco.com/save/residential-rebates/heat-pump-water-heater/)",
"[https://www.opalco.com/save/residential-rebates/ev-charging-station/](https://www.opalco.com/save/residential-rebates/ev-charging-station/)",
"[https://www.opalco.com/save/residential-rebates/ductless-heat-pump/](https://www.opalco.com/save/residential-rebates/ductless-heat-pump/)",
"[https://www.opalco.com/save/residential-rebates/window/](https://www.opalco.com/save/residential-rebates/window/)",
"[https://www.opalco.com/save/residential-rebates/ducted-heat-pump/](https://www.opalco.com/save/residential-rebates/ducted-heat-pump/)"
],
"evidenceText": "OPALCO lists residential insulation, windows, HPWH, EV charging station and ductless heat pump rebates; its ducted PTCS rebate page says applications stopped in 2023.",
"reasoningNotes": "Use range confidence for insulation because the source gives a broad per-square-foot range without enough measure detail for a typical estimate.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1289",
"opportunityName": "Residential Energy Efficiency Rebate Program",
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
"formulaText": "Select the applicable Focus on Energy residential rebate measure and apply the fixed amount, per-square-foot amount, or income-qualified tier where published.",
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
"perCustomerCapCents": 40000000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying insulation and air sealing",
"qualifying heating and cooling equipment",
"qualifying geothermal heat pump",
"qualifying smart thermostat",
"qualifying heat pump or gas water heater"
],
"ineligibleCostCategories": [
"standalone residential LED lighting retrofit not verified",
"commercial or industrial measures",
"solar measures under separate programs"
],
"requiredInputs": [
"selected_measure",
"income_tier",
"housing_type",
"square_feet",
"existing_r_value",
"unit_count",
"afue",
"seer2",
"hspf2",
"uef",
"trade_ally_or_ira_contractor_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"income_tier",
"housing_type",
"square_feet",
"existing_r_value",
"unit_count",
"afue",
"seer2",
"hspf2",
"uef",
"trade_ally_or_ira_contractor_status"
],
"rateTable": {
"tableId": "focus_wisconsin_residential_multifamily_envelope_2026",
"dimensions": [
"measure",
"existing_r_value"
],
"rows": [
{
"measure": "Multifamily attic air sealing and insulation, existing below R-11",
"rate": 100,
"rateUnit": "cents_per_square_foot"
},
{
"measure": "Multifamily attic air sealing and insulation, existing R-12 to R-19",
"rate": 70,
"rateUnit": "cents_per_square_foot"
},
{
"measure": "Multifamily attic air sealing and insulation, existing R-20 to R-38",
"rate": 55,
"rateUnit": "cents_per_square_foot"
},
{
"measure": "Multifamily exterior wall insulation, existing below R-5",
"rate": 80,
"rateUnit": "cents_per_square_foot"
}
]
},
"measureCatalog": {
"catalogId": "focus_wisconsin_residential_2026",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "DIY attic insulation and air sealing",
"amountCents": 20000,
"unit": "project"
},
{
"measure": "Single-family air sealing, standard income",
"amountCents": 85000,
"unit": "project"
},
{
"measure": "Single-family air sealing, moderate income",
"amountCents": 116000,
"unit": "project"
},
{
"measure": "Single-family air sealing, low income",
"amountCents": 147500,
"unit": "project"
},
{
"measure": "Single-family attic insulation",
"minAmountCents": 65000,
"maxAmountCents": 85000,
"unit": "project",
"conditions": "Amount varies by income tier."
},
{
"measure": "Single-family wall insulation",
"amountCents": 57500,
"unit": "project"
},
{
"measure": "Seal and insulate ducts in semi-conditioned space",
"amountCents": 9000,
"unit": "project"
},
{
"measure": "Seal and insulate ducts in unconditioned space",
"amountCents": 100000,
"unit": "project"
},
{
"measure": "Smart thermostat",
"amountCents": 5000,
"unit": "thermostat"
},
{
"measure": "Natural gas furnace, 95% AFUE or greater",
"minAmountCents": 10000,
"maxAmountCents": 40000,
"unit": "unit",
"conditions": "Amount varies by income tier."
},
{
"measure": "Natural gas boiler",
"minAmountCents": 30000,
"maxAmountCents": 65000,
"unit": "unit",
"conditions": "Amount varies by AFUE and income tier."
},
{
"measure": "Air-source heat pump",
"minAmountCents": 40000,
"maxAmountCents": 125000,
"unit": "unit",
"conditions": "Amount varies by tier, income and propane-replacement adder."
},
{
"measure": "Geothermal heat pump with natural gas service",
"amountCents": 100000,
"unit": "unit"
},
{
"measure": "Geothermal heat pump with no natural gas service",
"amountCents": 75000,
"unit": "unit"
},
{
"measure": "Heat pump water heater",
"amountCents": 30000,
"unit": "unit"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Focus on Energy 2026 residential pages publish rebates for insulation, air sealing, DIY attic work, smart thermostats, heating and cooling, geothermal and water heating.",
"sourceUrls": [
"[https://focusonenergy.com/residential](https://focusonenergy.com/residential)",
"[https://focusonenergy.com/residential-rebates-and-discounts](https://focusonenergy.com/residential-rebates-and-discounts)",
"[https://focusonenergy.com/residential/insulation-and-air-sealing](https://focusonenergy.com/residential/insulation-and-air-sealing)",
"[https://focusonenergy.com/residential/diy](https://focusonenergy.com/residential/diy)",
"[https://focusonenergy.com/residential/smart-thermostats](https://focusonenergy.com/residential/smart-thermostats)",
"[https://focusonenergy.com/residential/heating-and-cooling](https://focusonenergy.com/residential/heating-and-cooling)",
"[https://focusonenergy.com/residential/water-heating](https://focusonenergy.com/residential/water-heating)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "Focus on Energy publishes residential air sealing and insulation rebate pathways."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Focus on Energy publishes geothermal heat pump rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for listed residential heating and cooling measures such as gas furnaces, gas boilers and heat pumps."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Focus on Energy publishes DIY and installed insulation rebate tables."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "delete_bad_edge",
"reason": "Current core residential pages checked did not verify a standalone residential LED retrofit rebate."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Focus on Energy publishes a smart thermostat rebate or instant discount."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebates cannot exceed purchase price or eligible project costs where stated; some projects over $10,000 expected rebate need preapproval."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "Many 2026 residential rebate pages specify applications within 60 days and no later than August 31, 2026",
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://focusonenergy.com/residential](https://focusonenergy.com/residential)",
"[https://focusonenergy.com/residential-rebates-and-discounts](https://focusonenergy.com/residential-rebates-and-discounts)",
"[https://focusonenergy.com/residential/insulation-and-air-sealing](https://focusonenergy.com/residential/insulation-and-air-sealing)",
"[https://focusonenergy.com/residential/diy](https://focusonenergy.com/residential/diy)",
"[https://focusonenergy.com/residential/smart-thermostats](https://focusonenergy.com/residential/smart-thermostats)",
"[https://focusonenergy.com/residential/heating-and-cooling](https://focusonenergy.com/residential/heating-and-cooling)",
"[https://focusonenergy.com/residential/water-heating](https://focusonenergy.com/residential/water-heating)",
"[https://focus-ira.clearesult.com/](https://focus-ira.clearesult.com/)"
],
"evidenceText": "Focus on Energy lists Wisconsin residential rebates for insulation, air sealing, DIY attic insulation, smart thermostats, heating and cooling, geothermal and water heating.",
"reasoningNotes": "Keep residential envelope, HVAC, geothermal and thermostat categories; block LED retrofit because current residential lighting rebate support was not verified in the checked core pages.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4786",
"opportunityName": "Questar Gas - Home Builder Gas Appliance Rebate Program",
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
"rate_table"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "For qualifying Wyoming new construction builder measures, use the fixed ThermWise amount for the selected measure, or multiply qualifying high-performance window square feet by $2.50 per square foot.",
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
"eligibleCostCategories": [
"qualifying new construction gas furnace",
"qualifying new construction gas boiler",
"qualifying dual-fuel system",
"qualifying energy recovery ventilation",
"qualifying insulation",
"qualifying windows",
"qualifying smart thermostat",
"qualifying gas water heating"
],
"ineligibleCostCategories": [
"existing-home retrofit work",
"all-electric projects without Enbridge Gas service",
"equipment already receiving another ThermWise rebate"
],
"requiredInputs": [
"selected_measure",
"dwelling_type",
"unit_count",
"window_square_feet",
"afue",
"dual_fuel_tier",
"thermostat_tier",
"gas_service_turn_on_date",
"builder_or_owner_builder_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"dwelling_type",
"unit_count",
"window_square_feet",
"afue",
"dual_fuel_tier",
"thermostat_tier",
"gas_service_turn_on_date",
"builder_or_owner_builder_status"
],
"rateTable": {
"tableId": "enbridge_thermwise_wy_builder_rates_2026",
"dimensions": [
"measure"
],
"rows": [
{
"measure": "High-performance windows, U-factor below 0.22",
"rate": 250,
"rateUnit": "cents_per_square_foot"
}
]
},
"measureCatalog": {
"catalogId": "enbridge_thermwise_wy_builder_2026",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "Continuous exterior rigid insulation, single-family",
"amountCents": 20000,
"unit": "dwelling"
},
{
"measure": "Continuous exterior rigid insulation, multifamily",
"amountCents": 15000,
"unit": "dwelling"
},
{
"measure": "Exterior wall insulation, 2x6 R-23 or code equivalent",
"amountCents": 35000,
"unit": "dwelling"
},
{
"measure": "High-efficiency gas furnace, 95% to 97.4% AFUE",
"amountCents": 30000,
"unit": "unit"
},
{
"measure": "High-efficiency gas furnace, 97.5% AFUE or greater",
"amountCents": 35000,
"unit": "unit"
},
{
"measure": "Single-family dual-fuel Tier 1, furnace plus heat pump",
"amountCents": 100000,
"unit": "system"
},
{
"measure": "Single-family dual-fuel Tier 1, heat pump only",
"amountCents": 70000,
"unit": "system"
},
{
"measure": "Single-family dual-fuel Tier 2, furnace plus heat pump",
"amountCents": 120000,
"unit": "system"
},
{
"measure": "Single-family dual-fuel Tier 2, heat pump only",
"amountCents": 85000,
"unit": "system"
},
{
"measure": "Multifamily dual-fuel Tier 1, furnace plus heat pump",
"amountCents": 50000,
"unit": "system"
},
{
"measure": "Multifamily dual-fuel Tier 1, heat pump only",
"amountCents": 20000,
"unit": "system"
},
{
"measure": "Multifamily dual-fuel Tier 2, furnace plus heat pump",
"amountCents": 60000,
"unit": "system"
},
{
"measure": "Multifamily dual-fuel Tier 2, heat pump only",
"amountCents": 25000,
"unit": "system"
},
{
"measure": "Energy recovery ventilation, single-family",
"amountCents": 30000,
"unit": "system"
},
{
"measure": "Energy recovery ventilation, multifamily",
"amountCents": 15000,
"unit": "system"
},
{
"measure": "Residential gas boiler, 85% to 94.9% AFUE",
"amountCents": 40000,
"unit": "unit"
},
{
"measure": "Residential gas boiler, 95% AFUE or greater",
"amountCents": 60000,
"unit": "unit"
},
{
"measure": "Smart thermostat Tier 1",
"amountCents": 5000,
"unit": "thermostat"
},
{
"measure": "Smart thermostat Tier 2",
"amountCents": 7500,
"unit": "thermostat"
},
{
"measure": "ENERGY STAR gas storage water heater",
"amountCents": 10000,
"unit": "unit"
},
{
"measure": "ENERGY STAR gas tankless water heater",
"amountCents": 30000,
"unit": "unit"
},
{
"measure": "ENERGY STAR gas condensing storage water heater",
"amountCents": 35000,
"unit": "unit"
},
{
"measure": "Combined space and water heating unit, 95% AFUE or greater",
"amountCents": 75000,
"unit": "unit"
},
{
"measure": "Solar assisted domestic water heater",
"amountCents": 75000,
"unit": "system"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "ThermWise Wyoming builder materials publish 2026 fixed and per-square-foot rebates for new residential construction measures tied to Enbridge Gas service.",
"sourceUrls": [
"[https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates](https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates)",
"[https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-SF.pdf?hash=0A6FD2539620A4B58A7EFED75A104881&la=en&rev=50d9b0a510a04690a51a81c639e6a305](https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-SF.pdf?hash=0A6FD2539620A4B58A7EFED75A104881&la=en&rev=50d9b0a510a04690a51a81c639e6a305)",
"[https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-MF.pdf?hash=7A29C0DCC76AA4818749ACC8CBFB3301&la=en&rev=25736d7ab425494e87367b00750436a4](https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-MF.pdf?hash=7A29C0DCC76AA4818749ACC8CBFB3301&la=en&rev=25736d7ab425494e87367b00750436a4)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "energy_recovery_ventilation_retrofit",
"action": "keep",
"reason": "Keep only as a new-construction builder ERV measure for qualifying gas-service dwellings."
},
{
"retrofitTypeId": "high_efficiency_boiler_retrofit",
"action": "keep",
"reason": "Keep only as a new-construction builder gas boiler measure."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "Keep only as a new-construction builder gas furnace measure."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for listed builder gas furnace, boiler and dual-fuel system measures."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Keep only for listed new-construction continuous rigid or exterior wall insulation measures."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "ThermWise builder materials publish Tier 1 and Tier 2 smart thermostat rebates."
}
],
"stackingRules": {
"stackableWithRebates": false,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "ThermWise builder materials state the same equipment cannot receive another ThermWise rebate."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "2026-12-31 promotion end; request received within six months of gas service turn-on or applicable purchase and install timing",
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates](https://www.enbridgegas.com/utwyid/save-money/thermwise/builder-rebates)",
"[https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-SF.pdf?hash=0A6FD2539620A4B58A7EFED75A104881&la=en&rev=50d9b0a510a04690a51a81c639e6a305](https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-SF.pdf?hash=0A6FD2539620A4B58A7EFED75A104881&la=en&rev=50d9b0a510a04690a51a81c639e6a305)",
"[https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-MF.pdf?hash=7A29C0DCC76AA4818749ACC8CBFB3301&la=en&rev=25736d7ab425494e87367b00750436a4](https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/builder-rebates/WYBuilderApp-MF.pdf?hash=7A29C0DCC76AA4818749ACC8CBFB3301&la=en&rev=25736d7ab425494e87367b00750436a4)"
],
"evidenceText": "Current ThermWise Wyoming builder materials describe new-construction rebates for gas HVAC, water heating, ERV, smart thermostats, envelope measures and solar-assisted water heating.",
"reasoningNotes": "Former Questar branding is now Enbridge Gas ThermWise. Eligibility is builder/new-construction specific and should not be treated as an existing-home retrofit rebate.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22546",
"opportunityName": "Alabama Power - Make Ready Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"rate_table",
"per_unit_award"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "Multiply the number of simultaneously charging ports supported by qualifying make-ready infrastructure by the Alabama Power port tier amount; the incentive is for make-ready infrastructure up to but not including the charger.",
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
"qualifying EV make-ready infrastructure behind the meter up to but not including the charger"
],
"ineligibleCostCategories": [
"EV charger equipment",
"window replacement",
"behind-the-meter charging infrastructure outside make-ready scope"
],
"requiredInputs": [
"charging_power_tier",
"eligible_port_count",
"make_ready_scope_confirmation",
"alabama_power_business_customer_status",
"application_approval_status",
"charger_in_service_verification"
],
"missingInputsForTypicalRetroFiEstimate": [
"charging_power_tier",
"eligible_port_count",
"make_ready_scope_confirmation",
"application_approval_status"
],
"rateTable": {
"tableId": "alabama_power_make_ready_ports",
"dimensions": [
"charger_type",
"minimum_power"
],
"rows": [
{
"measure": "Level 2 make-ready support",
"minimumPowerKw": 6.6,
"amountCents": 200000,
"unit": "port"
},
{
"measure": "DC fast charging make-ready support",
"minimumPowerKw": 20,
"amountCents": 500000,
"unit": "port"
},
{
"measure": "DC fast charging make-ready support",
"minimumPowerKw": 150,
"amountCents": 2000000,
"unit": "port"
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
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Alabama Power publishes per-port make-ready amounts for Level 2 and DC fast charging tiers and says program funds are annual and first-come, first-served.",
"sourceUrls": [
"[https://www.alabamapower.com/business/business-customers-and-services/electric-transportation-business-programs/make-ready-program.html](https://www.alabamapower.com/business/business-customers-and-services/electric-transportation-business-programs/make-ready-program.html)",
"[https://apcmakeready.customerapplication.com/](https://apcmakeready.customerapplication.com/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "dc_fast_charger_installation",
"action": "delete_bad_edge",
"reason": "The program funds make-ready infrastructure, not DC fast charger equipment."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "The program funds make-ready infrastructure, not charger purchase or charger installation as the incented measure."
},
{
"retrofitTypeId": "ev_make_ready_electrical_upgrade",
"action": "keep",
"reason": "Alabama Power defines and funds EV make-ready infrastructure."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "delete_bad_edge",
"reason": "The program publishes a Level 2 make-ready port amount but does not fund Level 2 charger equipment."
},
{
"retrofitTypeId": "window_replacement",
"action": "delete_bad_edge",
"reason": "Matched window refers to an application or program window, not a building envelope window measure."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Do not count charger equipment incentives under this opportunity; only the make-ready port incentive is source-backed."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.alabamapower.com/business/business-customers-and-services/electric-transportation-business-programs/make-ready-program.html](https://www.alabamapower.com/business/business-customers-and-services/electric-transportation-business-programs/make-ready-program.html)",
"[https://apcmakeready.customerapplication.com/](https://apcmakeready.customerapplication.com/)",
"[https://programs.dsireusa.org/system/program/detail/22546/alabama-power-make-ready-program](https://programs.dsireusa.org/system/program/detail/22546/alabama-power-make-ready-program)"
],
"evidenceText": "Alabama Power states applications are open and defines make-ready as infrastructure required to support EV charging, up to but not including the charger.",
"reasoningNotes": "Keep only the make-ready electrical upgrade edge. Charger installation may be required for verification but is not the funded retrofit edge.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5785",
"opportunityName": "Arkansas Oklahoma Gas (AOG) Residential Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate",
"non_cash",
"process_value"
],
"primaryValueModelKinds": [
"measure_catalog",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "For qualifying AOG residential gas equipment, use the fixed 2026 rebate for the selected furnace, tankless water heater or smart thermostat measure, capped at equipment purchase price where stated.",
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
"qualifying natural gas furnace",
"qualifying tankless natural gas water heater",
"qualifying ENERGY STAR smart thermostat installed with heating equipment"
],
"ineligibleCostCategories": [
"electric heat pumps",
"natural gas equipment replacing electric equipment",
"broad HVAC replacement beyond qualifying gas furnace"
],
"requiredInputs": [
"selected_measure",
"unit_count",
"afue",
"uef",
"equipment_purchase_price",
"installation_date",
"active_aog_account_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"unit_count",
"afue",
"uef",
"equipment_purchase_price",
"installation_date"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "aog_residential_gas_equipment_2026",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "Natural gas furnace, 90% to 94.9% AFUE",
"amountCents": 40000,
"unit": "unit",
"maxPercentOfEligibleCost": 1
},
{
"measure": "Natural gas furnace, 95% AFUE or greater",
"amountCents": 80000,
"unit": "unit",
"maxPercentOfEligibleCost": 1
},
{
"measure": "Tankless natural gas water heater, 0.90 UEF or greater",
"amountCents": 70000,
"unit": "unit",
"maxPercentOfEligibleCost": 1
},
{
"measure": "ENERGY STAR smart thermostat installed with qualifying heating system",
"amountCents": 10000,
"unit": "thermostat",
"maxPercentOfEligibleCost": 1
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "AOG 2026 gas equipment materials publish furnace, tankless water heater and smart thermostat rebate amounts, with budget and equipment purchase price limits.",
"sourceUrls": [
"[https://aogc.com/ResidentialRebates](https://aogc.com/ResidentialRebates)",
"[https://summitutilities.clearesult.com/](https://summitutilities.clearesult.com/)",
"[https://www.aogc.com/Documents/AOG_Rebate_HeatingEquipment_2026.pdf](https://www.aogc.com/Documents/AOG_Rebate_HeatingEquipment_2026.pdf)",
"[https://www.aogc.com/Documents/AOG_Rebate_WaterHeater_2026.pdf](https://www.aogc.com/Documents/AOG_Rebate_WaterHeater_2026.pdf)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "non_cash",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "AOG weatherization is delivered as qualifying no-cost weatherization services after program screening; no simple customer cash rebate formula was published for this workflow.",
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
"qualifying no-cost weatherization services"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"weatherization_program_screening_result",
"home_type",
"income_or_program_eligibility",
"service_address"
],
"missingInputsForTypicalRetroFiEstimate": [
"weatherization_program_screening_result",
"home_type",
"income_or_program_eligibility"
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
"probabilityEvidenceType": "eligibility_only"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "AOG residential materials describe qualifying residential weatherization services at no cost after screening, rather than a published customer rebate amount.",
"sourceUrls": [
"[https://aogc.com/ResidentialRebates](https://aogc.com/ResidentialRebates)",
"[https://www.aogc.com/energyefficiency.aspx](https://www.aogc.com/energyefficiency.aspx)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "move_to_special_workflow",
"reason": "AOG weatherization appears as screened no-cost services, not a simple cash rebate formula."
},
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "AOG publishes 2026 natural gas furnace rebate tiers."
},
{
"retrofitTypeId": "high_efficiency_gas_water_heater",
"action": "keep",
"reason": "AOG publishes a 2026 tankless natural gas water heater rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for qualifying natural gas furnaces; do not include broad electric HVAC."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "AOG publishes an ENERGY STAR smart thermostat rebate when installed with qualifying heating equipment."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "AOG rebate materials state no rebate may exceed the equipment purchase price and rebates are subject to budget."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "Applications generally must be submitted within 120 days of installation or natural gas meter connection for listed equipment rebates",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.aogc.com/energyefficiency.aspx](https://www.aogc.com/energyefficiency.aspx)",
"[https://aogc.com/ResidentialRebates](https://aogc.com/ResidentialRebates)",
"[https://aogc.com/Article/618/](https://aogc.com/Article/618/)",
"[https://www.aogc.com/Documents/AOG_Rebate_HeatingEquipment_2026.pdf](https://www.aogc.com/Documents/AOG_Rebate_HeatingEquipment_2026.pdf)",
"[https://www.aogc.com/Documents/AOG_Rebate_WaterHeater_2026.pdf](https://www.aogc.com/Documents/AOG_Rebate_WaterHeater_2026.pdf)",
"[https://programs.dsireusa.org/system/program/detail/5785/arkansas-oklahoma-gas-aog-residential-rebate-program](https://programs.dsireusa.org/system/program/detail/5785/arkansas-oklahoma-gas-aog-residential-rebate-program)"
],
"evidenceText": "AOG residential materials verify gas furnace, tankless water-heater, ENERGY STAR smart thermostat and screened no-cost weatherization offerings, subject to budget and rules.",
"reasoningNotes": "The legacy $700 rule captured the tankless water heater tier but was incorrectly mapped to controls. Weatherization is modeled as non-cash process value.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1659",
"opportunityName": "Burbank Water & Power - Residential Energy Efficiency Rebate Program",
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
"per_unit_award"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use the Burbank Water and Power residential measure amount by purchase location and customer category; EV charging uses Level 2 charger and panel-upgrade tables where conditions are met.",
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
"maxUnits": 2,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying Level 2 EV charging station",
"qualifying EV panel upgrade tied to charger rebate",
"qualifying residential refrigerator or freezer",
"qualifying smart thermostat",
"qualifying attic or wall insulation"
],
"ineligibleCostCategories": [
"commercial refrigeration equipment",
"non-Level 2 EV charging",
"new construction insulation"
],
"requiredInputs": [
"selected_measure",
"purchase_location",
"low_income_or_dac_status",
"unit_count",
"square_feet",
"charger_type",
"panel_upgrade_required",
"level_2_charger_confirmation",
"time_of_use_rate_agreement"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"purchase_location",
"low_income_or_dac_status",
"unit_count",
"square_feet",
"charger_type",
"panel_upgrade_required",
"level_2_charger_confirmation",
"time_of_use_rate_agreement"
],
"rateTable": {
"tableId": "bwp_residential_insulation_2025",
"dimensions": [
"purchase_location",
"customer_category"
],
"rows": [
{
"measure": "Attic or wall insulation purchased in Burbank",
"rate": 15,
"rateUnit": "cents_per_square_foot"
},
{
"measure": "Attic or wall insulation purchased online or outside Burbank",
"rate": 10,
"rateUnit": "cents_per_square_foot"
},
{
"measure": "Low-income attic or wall insulation adder",
"rate": 100,
"rateUnit": "cents_per_square_foot"
}
]
},
"measureCatalog": {
"catalogId": "bwp_residential_rebates_2025_2026",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "ENERGY STAR refrigerator or freezer, purchased in Burbank",
"amountCents": 7500,
"unit": "unit"
},
{
"measure": "ENERGY STAR refrigerator or freezer, purchased online or outside Burbank",
"amountCents": 5000,
"unit": "unit"
},
{
"measure": "Low-income refrigerator or freezer adder",
"amountCents": 80000,
"unit": "unit"
},
{
"measure": "Smart thermostat, purchased in Burbank",
"amountCents": 7500,
"unit": "thermostat",
"maxUnits": 2
},
{
"measure": "Smart thermostat, purchased online or outside Burbank",
"amountCents": 5000,
"unit": "thermostat",
"maxUnits": 2
},
{
"measure": "Standard Level 2 residential EV charger",
"amountCents": 20000,
"unit": "charger"
},
{
"measure": "Smart Level 2 residential EV charger",
"amountCents": 50000,
"unit": "charger"
},
{
"measure": "DAC standard Level 2 residential EV charger",
"amountCents": 30000,
"unit": "charger"
},
{
"measure": "DAC smart Level 2 residential EV charger",
"amountCents": 60000,
"unit": "charger"
},
{
"measure": "Residential EV panel upgrade with qualifying charger rebate",
"amountCents": 75000,
"unit": "upgrade"
},
{
"measure": "DAC residential EV panel upgrade with qualifying charger rebate",
"amountCents": 90000,
"unit": "upgrade"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "BWP residential materials publish appliance, thermostat, insulation and Level 2 EV charging rebate amounts, including low-income or DAC adders and panel-upgrade amounts.",
"sourceUrls": [
"[https://www.burbankwaterandpower.com/residential-rebates](https://www.burbankwaterandpower.com/residential-rebates)",
"[https://www.burbankwaterandpower.com/residential-ev-charging-stations-rebate](https://www.burbankwaterandpower.com/residential-ev-charging-stations-rebate)",
"[https://www.burbankwaterandpower.com/documents/d/guest/Residential_Rebate_Application_v09-08-2025](https://www.burbankwaterandpower.com/documents/d/guest/Residential_Rebate_Application_v09-08-2025)",
"[https://www.burbankwaterandpower.com/cool-rewards](https://www.burbankwaterandpower.com/cool-rewards)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "Supported EV charging rebate is specifically Level 2; generic EV charger edge is overbroad because a Level 2 edge exists."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Keep only for residential ENERGY STAR refrigerator or freezer replacement, not commercial refrigeration."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "BWP publishes attic and wall insulation rebates per square foot."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "BWP publishes residential Level 2 EV charger and related panel-upgrade rebates."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "BWP publishes smart thermostat rebates and a separate Cool Rewards demand response program."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Do not count Cool Rewards demand response as the same value as the thermostat purchase rebate; EV panel upgrade requires a qualifying charger rebate."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.burbankwaterandpower.com/residential-rebates](https://www.burbankwaterandpower.com/residential-rebates)",
"[https://www.burbankwaterandpower.com/residential-ev-charging-stations-rebate](https://www.burbankwaterandpower.com/residential-ev-charging-stations-rebate)",
"[https://www.burbankwaterandpower.com/documents/d/guest/Residential_Rebate_Application_v09-08-2025](https://www.burbankwaterandpower.com/documents/d/guest/Residential_Rebate_Application_v09-08-2025)",
"[https://www.burbankwaterandpower.com/residents](https://www.burbankwaterandpower.com/residents)",
"[https://www.burbankwaterandpower.com/home-improvement-program](https://www.burbankwaterandpower.com/home-improvement-program)",
"[https://www.burbankwaterandpower.com/cool-rewards](https://www.burbankwaterandpower.com/cool-rewards)"
],
"evidenceText": "BWP residential pages list ENERGY STAR refrigerator/freezer, smart thermostat, insulation, Level 2 EV charger and no-cost home-improvement measures; Cool Rewards is separate.",
"reasoningNotes": "Commercial refrigeration is a false interpretation; the source supports residential refrigerator or freezer replacement. EV charging is narrowed to residential Level 2 chargers.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3325",
"opportunityName": "Pacific Power - Residential Energy Efficiency Rebate Programs",
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
"formulaText": "Use the Pacific Power California Wattsmart residential incentive table for the selected measure, treating 'up to' values as caps and not expected amounts when project cost or other funding could reduce the rebate.",
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
"qualifying ductless heat pump",
"qualifying heat pump conversion",
"qualifying heat pump water heater",
"qualifying residential refrigerator or freezer",
"qualifying room air conditioner",
"qualifying smart thermostat",
"qualifying central brushless fan motor"
],
"ineligibleCostCategories": [
"commercial refrigeration equipment",
"standalone LED lighting retrofit",
"non-California Pacific Power offers"
],
"requiredInputs": [
"selected_measure",
"home_type",
"customer_segment",
"unit_count",
"conditioned_floor_area",
"equipment_type",
"installation_path",
"replacement_type",
"uef",
"qualified_product_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"home_type",
"customer_segment",
"unit_count",
"conditioned_floor_area",
"equipment_type",
"installation_path",
"replacement_type",
"uef",
"qualified_product_status"
],
"rateTable": {
"tableId": "pacific_power_ca_residential_rates_2026",
"dimensions": [
"measure"
],
"rows": [
{
"measure": "Central brushless fan motor",
"rate": 10,
"rateUnit": "cents_per_square_foot_conditioned_floor_area"
}
]
},
"measureCatalog": {
"catalogId": "pacific_power_ca_wattsmart_residential_2026",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "Heat pump water heater",
"maxAmountCents": 40000,
"unit": "unit",
"conditions": "Up to amount varies by installation path and current table; rebate cannot exceed eligible cost."
},
{
"measure": "Ductless heat pump, multifamily",
"maxAmountCents": 100000,
"unit": "system"
},
{
"measure": "Ductless heat pump, multifamily hard-to-reach",
"maxAmountCents": 150000,
"unit": "system"
},
{
"measure": "Ductless heat pump replacing forced-air furnace",
"maxAmountCents": 125000,
"unit": "system"
},
{
"measure": "Ductless heat pump replacing forced-air furnace, hard-to-reach",
"maxAmountCents": 175000,
"unit": "system"
},
{
"measure": "Ductless heat pump replacing zonal heat",
"maxAmountCents": 125000,
"unit": "system"
},
{
"measure": "Ductless heat pump replacing zonal heat, hard-to-reach",
"maxAmountCents": 175000,
"unit": "system"
},
{
"measure": "Heat pump conversion",
"maxAmountCents": 200000,
"unit": "system"
},
{
"measure": "Residential ENERGY STAR refrigerator or freezer",
"amountCents": 2000,
"unit": "unit"
},
{
"measure": "ENERGY STAR room air conditioner",
"amountCents": 1000,
"unit": "unit"
},
{
"measure": "Smart thermostat for qualifying ducted heat pump home",
"amountCents": 5000,
"unit": "thermostat"
},
{
"measure": "Room air cleaner",
"amountCents": 4000,
"unit": "unit"
},
{
"measure": "Tier 2 smart connected power strip",
"amountCents": 3000,
"unit": "unit"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Pacific Power California residential filings and Wattsmart materials list heat pump, HPWH, appliance, room AC, smart thermostat and fan motor incentives with cost and eligibility limits.",
"sourceUrls": [
"[https://wattsmartsavings.net/california-residential/](https://wattsmartsavings.net/california-residential/)",
"[https://wattsmartsavings.net/heat-pumps/](https://wattsmartsavings.net/heat-pumps/)",
"[https://www.pacificpower.net/content/dam/pcorp/documents/en/pacificpower/rates-regulation/california/filings/advice-797-e/Advice_797-E.pdf](https://www.pacificpower.net/content/dam/pcorp/documents/en/pacificpower/rates-regulation/california/filings/advice-797-e/Advice_797-E.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Pacific Power California materials support ductless heat pumps and heat pump conversions."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Pacific Power California materials list heat pump water heater incentives."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only for listed residential HVAC measures such as ductless heat pumps, heat pump conversions, room AC and fan motor measures."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "delete_bad_edge",
"reason": "Source supports residential ENERGY STAR refrigerator or freezer incentives, not commercial refrigeration equipment."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "delete_bad_edge",
"reason": "Current California residential Wattsmart materials checked do not support a standalone LED retrofit rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Incentives cannot exceed the total price of the product or service; 'up to' amounts should be treated as caps."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.pacificpower.net/savings-energy-choices/home.html](https://www.pacificpower.net/savings-energy-choices/home.html)",
"[https://wattsmartsavings.net/california-residential/](https://wattsmartsavings.net/california-residential/)",
"[https://wattsmartsavings.net/california-residential/find-savings-manufactured-homes/](https://wattsmartsavings.net/california-residential/find-savings-manufactured-homes/)",
"[https://wattsmartsavings.net/heat-pumps/](https://wattsmartsavings.net/heat-pumps/)",
"[https://www.pacificpower.net/content/dam/pcorp/documents/en/pacificpower/rates-regulation/california/filings/advice-797-e/Advice_797-E.pdf](https://www.pacificpower.net/content/dam/pcorp/documents/en/pacificpower/rates-regulation/california/filings/advice-797-e/Advice_797-E.pdf)"
],
"evidenceText": "Pacific Power's California materials list residential incentives for ductless heat pumps, heat pump conversions, HPWH, refrigerators/freezers, room AC, thermostats and smart power strips.",
"reasoningNotes": "Block commercial refrigeration and LED retrofit edges. Treat listed 'up to' values as caps because actual amounts can be reduced by costs or other funding.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1428",
"opportunityName": "PG&E - Residential Energy Savings Rebate Programs",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "medium",
"estimateConfidence": "medium",
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
"timing": "post_installation_reimbursement",
"formulaText": "For standard PG&E residential EV charging, rebate up to 50% of the purchase price of one eligible charging equipment option. Rebate Plus may cover capped charger installation or panel upgrade plus charger amounts for qualifying applicants.",
"amountCents": null,
"percent": 0.5,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
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
"PG&E-approved residential EV charging equipment purchase price",
"qualifying Rebate Plus EV charger installation",
"qualifying Rebate Plus panel upgrade plus charger"
],
"ineligibleCostCategories": [
"non-approved EV charging equipment",
"DIY installation where licensed electrician is required",
"central heat pump HVAC under this PG&E direct rebate record"
],
"requiredInputs": [
"ev_charger_equipment_purchase_price",
"approved_equipment_status",
"bev_or_phev_registration_status",
"rebate_plus_eligibility",
"panel_upgrade_required",
"licensed_electrician_installation_status",
"application_timing"
],
"missingInputsForTypicalRetroFiEstimate": [
"ev_charger_equipment_purchase_price",
"approved_equipment_status",
"bev_or_phev_registration_status",
"rebate_plus_eligibility",
"panel_upgrade_required",
"licensed_electrician_installation_status"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "pge_residential_ev_charging_2026",
"selectionInput": "rebate_path",
"rows": [
{
"measure": "Standard residential EV charging equipment rebate",
"percent": 0.5,
"unit": "eligible_equipment_purchase_price",
"maxUnits": 1
},
{
"measure": "Rebate Plus eligible EV charger installation",
"maxAmountCents": 200000,
"unit": "installation"
},
{
"measure": "Rebate Plus eligible panel upgrade plus charger",
"maxAmountCents": 500000,
"unit": "project"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "PG&E residential EV charging materials publish a standard 50% equipment purchase rebate and capped Rebate Plus installation or panel upgrade pathways for qualifying customers.",
"sourceUrls": [
"[https://www.pge.com/en/clean-energy/electric-vehicles/getting-started-with-electric-vehicles/residential-electric-vehicle-charging-rebate.html](https://www.pge.com/en/clean-energy/electric-vehicles/getting-started-with-electric-vehicles/residential-electric-vehicle-charging-rebate.html)"
]
},
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "point_of_sale",
"formulaText": "For Golden State Rebates products available to PG&E customers, use the listed instant rebate amount or cap for heat pump water heaters, smart thermostats and room air conditioners.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
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
"eligibleCostCategories": [
"qualifying heat pump water heater",
"qualifying smart thermostat",
"qualifying room air conditioner"
],
"ineligibleCostCategories": [
"central heat pump HVAC",
"broad HVAC replacement",
"TECH Clean California measures under separate statewide program"
],
"requiredInputs": [
"selected_measure",
"unit_count",
"replacement_fuel_type",
"tank_size",
"uef",
"participating_retailer_or_coupon_status",
"installation_within_required_days"
],
"missingInputsForTypicalRetroFiEstimate": [
"selected_measure",
"unit_count",
"replacement_fuel_type",
"tank_size",
"uef",
"participating_retailer_or_coupon_status"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "golden_state_rebates_pge_residential_2026",
"selectionInput": "selected_measure",
"rows": [
{
"measure": "Heat pump water heater replacing qualifying gas storage tank",
"minAmountCents": 60000,
"maxAmountCents": 70000,
"unit": "unit",
"conditions": "Amount varies by replacement tank size and qualifying HPWH size."
},
{
"measure": "Heat pump water heater replacing qualifying electric storage tank",
"amountCents": 40000,
"unit": "unit"
},
{
"measure": "Smart thermostat",
"maxAmountCents": 6000,
"unit": "thermostat"
},
{
"measure": "Room air conditioner",
"amountCents": 4000,
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
"evidenceText": "Golden State Rebates materials list PG&E-supported instant rebates for heat pump water heaters, smart thermostats and room air conditioners, with final 2026 reservation and redemption dates.",
"sourceUrls": [
"[https://goldenstaterebates.com/](https://goldenstaterebates.com/)",
"[https://www.goldenstaterebates.com/goldenstaterebates/rebate/instant-rebates/](https://www.goldenstaterebates.com/goldenstaterebates/rebate/instant-rebates/)",
"[https://www.goldenstaterebates.com/goldenstaterebates/rebates/heat-pump-water-heaters/](https://www.goldenstaterebates.com/goldenstaterebates/rebates/heat-pump-water-heaters/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "PG&E publishes a residential EV charging equipment rebate and Rebate Plus pathways."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "delete_bad_edge",
"reason": "Current checked PG&E direct rebate pages did not verify central heat pump HVAC rebates under this record; TECH Clean California is separate."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Golden State Rebates materials support PG&E-customer heat pump water heater instant rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Room air conditioner rebates should not be generalized to central HVAC or broad HVAC replacement."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "keep",
"reason": "Golden State Rebates materials support smart thermostat instant rebates."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Do not combine this PG&E record with separate TECH Clean California HVAC incentives unless modeled as a separate opportunity."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "Golden State Rebates final coupon reservation July 23, 2026 and final redemption July 31, 2026; EV charging has path-specific application timing.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.pge.com/en/save-energy-and-money/rebates-and-incentives.html](https://www.pge.com/en/save-energy-and-money/rebates-and-incentives.html)",
"[https://www.pge.com/en/clean-energy/electric-vehicles/getting-started-with-electric-vehicles/residential-electric-vehicle-charging-rebate.html](https://www.pge.com/en/clean-energy/electric-vehicles/getting-started-with-electric-vehicles/residential-electric-vehicle-charging-rebate.html)",
"[https://goldenstaterebates.com/](https://goldenstaterebates.com/)",
"[https://www.goldenstaterebates.com/goldenstaterebates/rebate/instant-rebates/](https://www.goldenstaterebates.com/goldenstaterebates/rebate/instant-rebates/)",
"[https://www.goldenstaterebates.com/goldenstaterebates/rebates/heat-pump-water-heaters/](https://www.goldenstaterebates.com/goldenstaterebates/rebates/heat-pump-water-heaters/)",
"[https://programs.dsireusa.org/system/program/detail/1428/pg-and-e-residential-energy-savings-rebate-programs](https://programs.dsireusa.org/system/program/detail/1428/pg-and-e-residential-energy-savings-rebate-programs)"
],
"evidenceText": "PG&E pages support residential EV charging rebates and Golden State Rebates supports PG&E-customer HPWH, smart thermostat and room AC instant rebates.",
"reasoningNotes": "Remove central heat pump HVAC and broad HVAC replacement edges from this PG&E opportunity. Treat Golden State Rebates dates as time-sensitive program limits.",
"humanReviewRequired": false,
"humanReviewReasons": []
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:4710"
}

