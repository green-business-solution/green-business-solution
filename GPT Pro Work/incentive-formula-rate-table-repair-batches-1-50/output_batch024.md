{
"schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
"researchedAt": "2026-07-02",
"source": "gpt_pro",
"batchNumber": 24,
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22282",
"opportunityName": "LADWP - Charge Up LA Used Electric Vehicle Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"fixed_tier_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_tier_amount",
"timing": "post_purchase_rebate",
"formulaText": "For an eligible used electric or plug-in hybrid vehicle purchase, rebate is capped at $1,500 for standard applicants or $4,000 for qualifying EZ-SAVE or Lifeline households. Use the applicable tier per qualifying vehicle; application must be within 12 months of purchase.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 400000,
"caps": {
"maxAwardCents": 400000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": 400000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying_used_electric_vehicle_purchase",
"qualifying_used_plug_in_hybrid_vehicle_purchase"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"rebate_tier_standard_or_ez_save_lifeline",
"qualifying_vehicle_count",
"vehicle_purchase_date",
"vehicle_model_eligibility",
"LADWP_electric_service_account"
],
"missingInputsForTypicalRetroFiEstimate": [
"rebate_tier_standard_or_ez_save_lifeline",
"qualifying_vehicle_count",
"vehicle_model_eligibility"
],
"rateTable": {
"tableId": "ladwp_used_ev_rebate_tiers",
"dimensions": [
"applicant_tier",
"vehicle_type"
],
"rows": [
{
"applicantTier": "standard",
"vehicleType": "used_EVs_or_PHEVs",
"maxAmountCentsPerVehicle": 150000
},
{
"applicantTier": "EZ-SAVE_or_Lifeline",
"vehicleType": "used_EVs_or_PHEVs",
"maxAmountCentsPerVehicle": 400000
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
"evidenceText": "The program offers up to $1,500, or up to $4,000 for EZ-SAVE or Lifeline households, for qualifying used electric or plug-in hybrid vehicle purchases.",
"sourceUrls": [
"[https://www.ladwp.com/residential-services/programs-and-rebates-residential/electric-vehicles/used-electric-vehicle-rebate-program](https://www.ladwp.com/residential-services/programs-and-rebates-residential/electric-vehicles/used-electric-vehicle-rebate-program)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "The source-backed incentive is for a used EV or plug-in hybrid purchase, not charger hardware or installation."
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
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "within 12 months of used vehicle purchase",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.ladwp.com/residential-services/programs-and-rebates-residential/electric-vehicles/used-electric-vehicle-rebate-program](https://www.ladwp.com/residential-services/programs-and-rebates-residential/electric-vehicles/used-electric-vehicle-rebate-program)",
"[https://www.ladwp.com/residential-services/programs-and-rebates-residential/electric-vehicles/residential-ev-charger-rebate-program](https://www.ladwp.com/residential-services/programs-and-rebates-residential/electric-vehicles/residential-ev-charger-rebate-program)",
"[https://www.ladwp.com/commercial-services/programs-and-rebates-commercial/commercial-ev-charging/commercial-ev-charger-rebate-program](https://www.ladwp.com/commercial-services/programs-and-rebates-commercial/commercial-ev-charging/commercial-ev-charger-rebate-program)"
],
"evidenceText": "LADWP supports a capped used EV or plug-in hybrid purchase rebate, with a higher cap for EZ-SAVE or Lifeline households. Charger rebates are separate programs.",
"reasoningNotes": "Input file citation: . The legacy $4,000 per-unit rule overstated the standard tier and was attached to a false EV charger installation edge.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1866",
"opportunityName": "LADWP - Non-Residential Energy Efficiency Incentive Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"rate_table"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "Commercial Lighting Incentive Program rebate equals the applicable cents-per-annual-kWh-saved rate for the lighting measure and qualification tier, multiplied by LADWP-calculated annual kWh savings, capped at 100% of project cost.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": "cents_per_annual_kwh_saved",
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
"newly_purchased_energy_efficient_lighting",
"installed_lighting_controls",
"eligible_project_cost"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"measure_category",
"qualification_tier",
"LADWP_calculated_annual_kwh_savings",
"eligible_project_cost",
"DLC_or_LADWP_qualification",
"LADWP_preapproval"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_category",
"qualification_tier",
"annual_kwh_savings",
"eligible_project_cost"
],
"rateTable": {
"tableId": "ladwp_clip_annual_kwh_saved_rates",
"dimensions": [
"measure_category",
"qualification_tier"
],
"rows": [
{
"measureCategory": "lamp_only",
"qualificationTier": "all",
"rateCentsPerAnnualKwhSaved": 8
},
{
"measureCategory": "lighting_fixture_replacement_or_retrofit",
"qualificationTier": "DLC_Standard",
"rateCentsPerAnnualKwhSaved": 20
},
{
"measureCategory": "lighting_fixture_replacement_or_retrofit",
"qualificationTier": "DLC_Premium",
"rateCentsPerAnnualKwhSaved": 30
},
{
"measureCategory": "lighting_fixture_replacement_or_retrofit",
"qualificationTier": "LADWP_Preferred",
"rateCentsPerAnnualKwhSaved": 40
},
{
"measureCategory": "lighting_controls",
"qualificationTier": "wall_or_ceiling_mounted",
"rateCentsPerAnnualKwhSaved": 10
},
{
"measureCategory": "lighting_controls",
"qualificationTier": "integrated",
"rateCentsPerAnnualKwhSaved": 20
},
{
"measureCategory": "lighting_controls",
"qualificationTier": "network_lighting_controls",
"rateCentsPerAnnualKwhSaved": 30
},
{
"measureCategory": "interactive_effects",
"qualificationTier": "all",
"rateCentsPerAnnualKwhSaved": 8
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
"evidenceText": "LADWP lists lighting incentive rates from $0.08 to $0.40 per annualized kWh saved, depending on lamp, fixture, controls, and qualification tier.",
"sourceUrls": [
"[https://www.ladwp.com/commercial-services/programs-and-rebates-commercial/commercial-lighting-incentive-program](https://www.ladwp.com/commercial-services/programs-and-rebates-commercial/commercial-lighting-incentive-program)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "The official commercial lighting program supports efficient lighting fixtures, lamp replacements, and lighting controls with published annual-kWh-savings rates."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Program incentive cannot exceed 100% of project cost; source did not provide broader stacking rules."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.ladwp.com/commercial-services/programs-and-rebates-commercial/commercial-lighting-incentive-program](https://www.ladwp.com/commercial-services/programs-and-rebates-commercial/commercial-lighting-incentive-program)"
],
"evidenceText": "LADWP publishes a lighting rate table by measure and qualification tier, requires preapproval before purchase, installation, or operation, and caps incentives at project cost.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891",
"opportunityName": "National Electric Vehicle Infrastructure (NEVI) Program",
"repairStatus": "non_monetary_workflow",
"calculationStatus": "non_monetary_workflow",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"technical_assistance",
"cash_grant"
],
"primaryValueModelKinds": [
"non_cash_process_value",
"competitive_cost_share"
],
"effects": [
{
"effectType": "process_value",
"cashValueClassification": "technical_assistance",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "SDG&E provides customer support for businesses pursuing California NEVI funding, but the SDG&E page is not a direct charger rebate or grant award.",
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
"SDGE_service_area_site",
"NEVI_corridor_group",
"project_concept",
"CEC_solicitation_application"
],
"missingInputsForTypicalRetroFiEstimate": [
"site_NEVI_fit",
"application_status"
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
"evidenceText": "SDG&E describes support for customers applying to NEVI opportunities administered through California agencies; no direct utility rebate amount is stated.",
"sourceUrls": [
"[https://www.sdge.com/business/electric-vehicles/nevi](https://www.sdge.com/business/electric-vehicles/nevi)"
]
},
{
"effectType": "grant_expected_value",
"cashValueClassification": "cash_grant",
"valueModelKind": "competitive_cost_share",
"timing": "application_process",
"formulaText": "For the CEC-administered California NEVI solicitation, potential funding is competitive and may use the federal NEVI cost-share limit of up to 80% of eligible project cost; no expected value should be counted without award probability evidence.",
"amountCents": null,
"percent": 0.8,
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
"programBudgetCents": 7900000000
},
"eligibleCostCategories": [
"eligible_public_DC_fast_charging_project_costs"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"eligible_project_cost",
"CEC_application_score_or_award",
"NEVI_corridor_site",
"approved_cost_share",
"DC_fast_charger_scope"
],
"missingInputsForTypicalRetroFiEstimate": [
"eligible_project_cost",
"award_selection_probability",
"approved_award_amount"
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
"probabilityRequired": true,
"probabilityDiscount": null,
"probabilityEvidenceType": "scoring_criteria_only"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "CEC solicitation describes competitive funding for publicly accessible high-powered DC fast charging; NEVI federal share is generally capped at 80% of eligible cost.",
"sourceUrls": [
"[https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula](https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula)",
"[https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs](https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "move_to_special_workflow",
"reason": "EV charging is source-backed only as NEVI application support and competitive public DC fast-charging funding, not an SDG&E direct rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Federal NEVI share is generally capped at 80% of eligible project cost; other cost-share requirements are solicitation-specific."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "2026-10-16",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.sdge.com/business/electric-vehicles/nevi](https://www.sdge.com/business/electric-vehicles/nevi)",
"[https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula](https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula)",
"[https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs](https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs)",
"[https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs](https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs)"
],
"evidenceText": "SDG&E’s page is application support. The monetary opportunity is a CEC competitive NEVI solicitation for public high-powered DC fast charging, not a direct utility rebate.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22526",
"opportunityName": "Redding Electric - Electric Vehicle Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"fixed_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_amount",
"timing": "point_of_sale",
"formulaText": "Income-qualified active Redding Electric Utility residential customers may receive a $3,000 EV voucher for one eligible new or used battery-electric or plug-in hybrid vehicle purchased or leased through a participating dealership.",
"amountCents": 300000,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 300000,
"caps": {
"maxAwardCents": 300000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": 1,
"perCustomerCapCents": 300000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"eligible_BEV_or_PHEV_purchase_or_lease"
],
"ineligibleCostCategories": [
"traditional_hybrid_vehicle",
"EV_charger_installation"
],
"requiredInputs": [
"qualifying_vehicle_count",
"vehicle_type_BEV_or_PHEV",
"income_qualification",
"participating_dealer",
"active_REU_residential_account",
"vehicle_registration_at_REU_service_address"
],
"missingInputsForTypicalRetroFiEstimate": [
"income_qualification",
"vehicle_eligibility",
"participating_dealer"
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
"evidenceText": "REU materials state a $3,000 voucher for eligible new or used BEV or PHEV purchases or leases by income-qualified residential customers.",
"sourceUrls": [
"[https://www.cityofredding.gov/government/departments/redding_electric_utility/going_green/electric_vehicles.php](https://www.cityofredding.gov/government/departments/redding_electric_utility/going_green/electric_vehicles.php)",
"[https://files.cityofredding.gov/Document%20Center/Departments/Redding%20Electric%20Utility/Residential/Residential%20Electrification%20Rebates/REU-Flier-EV.pdf](https://files.cityofredding.gov/Document%20Center/Departments/Redding%20Electric%20Utility/Residential/Residential%20Electrification%20Rebates/REU-Flier-EV.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "The official residential opportunity is an EV purchase or lease voucher; charger installation is addressed through separate commercial charging materials."
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
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.cityofredding.gov/government/departments/redding_electric_utility/going_green/electric_vehicles.php](https://www.cityofredding.gov/government/departments/redding_electric_utility/going_green/electric_vehicles.php)",
"[https://files.cityofredding.gov/Document%20Center/Departments/Redding%20Electric%20Utility/Residential/Residential%20Electrification%20Rebates/REU-Flier-EV.pdf](https://files.cityofredding.gov/Document%20Center/Departments/Redding%20Electric%20Utility/Residential/Residential%20Electrification%20Rebates/REU-Flier-EV.pdf)",
"[https://files.cityofredding.gov/government/departments/redding_electric_utility/going_green/commercial_ev_charging_program.php](https://files.cityofredding.gov/government/departments/redding_electric_utility/going_green/commercial_ev_charging_program.php)"
],
"evidenceText": "REU supports a $3,000 income-qualified vehicle voucher for eligible BEV or PHEV purchases or leases. It does not support this target’s EV charger installation edge.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22800",
"opportunityName": "SMUD - Battery Storage Incentive Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"hybrid_rate_plus_cap",
"fixed_tier_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "hybrid_rate_plus_cap",
"timing": "post_installation_reimbursement",
"formulaText": "For eligible new residential battery storage enrolled within 90 days after SMUD permission to operate, the enrollment incentive is based on $500 per battery kWh minus a 20% holdback, capped at $10,000 per household.",
"amountCents": null,
"percent": null,
"rate": 40000,
"rateUnit": "cents_per_kwh_of_battery_capacity",
"minAmountCents": null,
"maxAmountCents": 1000000,
"caps": {
"maxAwardCents": 1000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": 1000000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"eligible_residential_battery_storage_system"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"battery_capacity_kwh",
"battery_brand_and_model",
"SMUD_permission_to_operate_date",
"enrollment_date",
"Solar_and_Storage_Rate_participation",
"household_identifier"
],
"missingInputsForTypicalRetroFiEstimate": [
"battery_capacity_kwh",
"battery_brand_and_model",
"permission_to_operate_date",
"enrollment_date"
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
"evidenceText": "SMUD states new BESS customers enrolled within 90 days after permission to operate may receive an enrollment incentive up to $10,000 per household.",
"sourceUrls": [
"[https://www.smud.org/Going-Green/Battery-storage/Homeowner](https://www.smud.org/Going-Green/Battery-storage/Homeowner)",
"[https://smud.formstack.com/forms/my_energy_optimizer_incentive_enrollment](https://smud.formstack.com/forms/my_energy_optimizer_incentive_enrollment)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_tier_amount",
"timing": "annual",
"formulaText": "For Tesla batteries enrolled in My Energy Optimizer Partner+, SMUD lists quarterly incentives of $110 for one battery, $220 for two batteries, and $330 for three or more batteries, subject to ongoing program participation.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 132000,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": 132000,
"programBudgetCents": null
},
"eligibleCostCategories": [
"Tesla_residential_battery_VPP_participation"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"Tesla_battery_count",
"ongoing_program_participation",
"quarterly_dispatch_participation"
],
"missingInputsForTypicalRetroFiEstimate": [
"Tesla_battery_count",
"ongoing_participation_status"
],
"rateTable": {
"tableId": "smud_quarterly_tesla_battery_incentives",
"dimensions": [
"tesla_battery_count"
],
"rows": [
{
"teslaBatteryCount": "1",
"quarterlyAmountCents": 11000,
"annualizedAmountCents": 44000
},
{
"teslaBatteryCount": "2",
"quarterlyAmountCents": 22000,
"annualizedAmountCents": 88000
},
{
"teslaBatteryCount": "3_or_more",
"quarterlyAmountCents": 33000,
"annualizedAmountCents": 132000
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
"evidenceText": "SMUD lists quarterly Partner+ incentives for Tesla systems by battery count: $110, $220, or $330 per quarter.",
"sourceUrls": [
"[https://www.smud.org/Going-Green/Battery-storage/Homeowner](https://www.smud.org/Going-Green/Battery-storage/Homeowner)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "battery_storage_system",
"action": "keep",
"reason": "The official SMUD page directly supports residential battery storage enrollment incentives and VPP participation payments for eligible systems."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Income-qualified customers whose battery or solar costs are fully covered by SMUD may participate but do not receive the one-time enrollment incentive."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": "within 90 days after SMUD permission to operate for enrollment incentive",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.smud.org/Going-Green/Battery-storage/Homeowner](https://www.smud.org/Going-Green/Battery-storage/Homeowner)",
"[https://smud.formstack.com/forms/my_energy_optimizer_incentive_enrollment](https://smud.formstack.com/forms/my_energy_optimizer_incentive_enrollment)",
"[https://www.tesla.com/support/energy/virtual-power-plant/smud](https://www.tesla.com/support/energy/virtual-power-plant/smud)"
],
"evidenceText": "SMUD provides a capped enrollment incentive tied to battery kWh and separate quarterly incentives for Tesla battery participation. Eligible brands, rates, and enrollment timing matter.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2508",
"opportunityName": "SoCalGas - Multi-Family Residential Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"fixed_tier_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_tier_amount",
"timing": "post_purchase_rebate",
"formulaText": "For qualifying multifamily residential natural gas ovens replacing an existing natural gas oven, the rebate is $120 for a standard residential natural gas oven or $500 for a qualifying residential natural gas wall oven.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 50000,
"caps": {
"maxAwardCents": 50000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": 1,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying_residential_natural_gas_oven"
],
"ineligibleCostCategories": [
"commercial_foodservice_oven",
"electric_oven",
"new_construction"
],
"requiredInputs": [
"oven_type_standard_or_wall",
"qualifying_oven_count",
"existing_natural_gas_oven_replacement",
"installation_date",
"SoCalGas_service_address"
],
"missingInputsForTypicalRetroFiEstimate": [
"oven_type_standard_or_wall",
"qualifying_oven_count",
"replacement_status"
],
"rateTable": {
"tableId": "socalgas_2026_residential_natural_gas_oven_rebate",
"dimensions": [
"oven_type"
],
"rows": [
{
"ovenType": "standard_residential_natural_gas_oven",
"amountCentsPerUnit": 12000
},
{
"ovenType": "residential_natural_gas_wall_oven",
"amountCentsPerUnit": 50000
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
"evidenceText": "SoCalGas 2026 multifamily materials list residential natural gas oven rebate amounts of $120 for standard ovens and $500 for wall ovens.",
"sourceUrls": [
"[https://www.socalgas.com/savings/multifamily-rebates](https://www.socalgas.com/savings/multifamily-rebates)",
"[https://www.socalgas.com/sites/default/files/2026-Residential-Rebate-Application.pdf](https://www.socalgas.com/sites/default/files/2026-Residential-Rebate-Application.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_oven",
"action": "needs_review",
"reason": "The source supports residential multifamily natural-gas ovens only; the current commercial kitchen foodservice interpretation should be remapped or narrowed."
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
"applicationDeadline": "2026-12-31",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.socalgas.com/savings/multifamily-rebates](https://www.socalgas.com/savings/multifamily-rebates)",
"[https://www.socalgas.com/sites/default/files/2026-Residential-Rebate-Application.pdf](https://www.socalgas.com/sites/default/files/2026-Residential-Rebate-Application.pdf)",
"[https://www.socalgas.com/business/savings/rebates-and-incentives/property-managers-and-owners](https://www.socalgas.com/business/savings/rebates-and-incentives/property-managers-and-owners)"
],
"evidenceText": "SoCalGas supports residential multifamily natural-gas oven rebates, not commercial foodservice ovens. The value depends on standard versus wall oven classification.",
"reasoningNotes": "",
"humanReviewRequired": true,
"humanReviewReasons": [
"Current retrofit type is too broad or miscategorized as commercial kitchen; source-backed measure is residential multifamily natural gas oven."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4220",
"opportunityName": "Colorado Springs Utilities - Builder Incentive Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"fixed_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_amount",
"timing": "post_installation_reimbursement",
"formulaText": "Eligible builder-participating new homes may receive a $350 bonus per home for one or more qualifying home building standards, including LEED, Passive House, NGBS, or ENERGY STAR v3.2 or later, when program requirements are met.",
"amountCents": 35000,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 35000,
"caps": {
"maxAwardCents": 35000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": 1,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying_new_home_certification_bonus"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"builder_participation",
"eligible_new_home",
"HERS_documentation",
"certification_type",
"home_count",
"Colorado_Springs_Utilities_service"
],
"missingInputsForTypicalRetroFiEstimate": [
"builder_participation",
"certification_type",
"home_count"
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
"evidenceText": "Colorado Springs Utilities builder packet lists a $350 certification bonus for LEED and other qualifying home standards.",
"sourceUrls": [
"[https://www.csu.org/business-efficiency/builder-incentives](https://www.csu.org/business-efficiency/builder-incentives)",
"[https://www.csu.org/hubfs/Document%20Library/BIPBuilderParticipationApp.pdf](https://www.csu.org/hubfs/Document%20Library/BIPBuilderParticipationApp.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "leed_certification",
"action": "keep",
"reason": "LEED is expressly supported as a certification bonus within the new-construction builder incentive packet."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Certification bonus may layer with the program's HERS-based base incentive and listed equipment bonuses when all builder program requirements are met."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "2026-12-31",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.csu.org/business-efficiency/builder-incentives](https://www.csu.org/business-efficiency/builder-incentives)",
"[https://www.csu.org/hubfs/Document%20Library/BIPBuilderParticipationApp.pdf](https://www.csu.org/hubfs/Document%20Library/BIPBuilderParticipationApp.pdf)"
],
"evidenceText": "Colorado Springs Utilities supports LEED only as a certification bonus in a builder new-construction program, not as a general retrofit incentive.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22786",
"opportunityName": "Eagle County - Walking Mountains Science Center Solar PV Rebate",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"hybrid_rate_plus_cap"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "hybrid_rate_plus_cap",
"timing": "post_installation_reimbursement",
"formulaText": "For eligible grid-tied, net-metered solar PV projects, Walking Mountains matches the Holy Cross Energy solar PV rebate amount, capped at $1,000 for residential applicants and subject to the listed local eligibility areas.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 100000,
"caps": {
"maxAwardCents": 100000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": 100000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"grid_tied_net_metered_solar_PV_system"
],
"ineligibleCostCategories": [
"off_grid_system",
"battery_storage_unless_separately_eligible"
],
"requiredInputs": [
"Holy_Cross_Energy_solar_rebate_amount",
"applicant_type",
"eligible_local_area",
"grid_tied_net_metered_status",
"solar_PV_project_documentation"
],
"missingInputsForTypicalRetroFiEstimate": [
"Holy_Cross_Energy_solar_rebate_amount",
"eligible_local_area",
"applicant_type"
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
"evidenceText": "Walking Mountains says eligible Eagle County solar PV rebates match the Holy Cross Energy rebate up to $1,000 for grid-tied, net-metered systems.",
"sourceUrls": [
"[https://www.walkingmountains.org/sustainability-hub/energy-efficiency-programs/rebates-incentives/](https://www.walkingmountains.org/sustainability-hub/energy-efficiency-programs/rebates-incentives/)",
"[https://www.walkingmountains.org/sustainability-hub/energy-efficiency-programs/solar-energy-and-storage/solarize-eagle-county/solar-and-storage-rebates/](https://www.walkingmountains.org/sustainability-hub/energy-efficiency-programs/solar-energy-and-storage/solarize-eagle-county/solar-and-storage-rebates/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "rooftop_solar_pv",
"action": "keep",
"reason": "The source directly supports eligible grid-tied, net-metered solar PV systems through a local matching rebate."
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
"[https://www.walkingmountains.org/sustainability-hub/energy-efficiency-programs/rebates-incentives/](https://www.walkingmountains.org/sustainability-hub/energy-efficiency-programs/rebates-incentives/)",
"[https://www.walkingmountains.org/sustainability-hub/energy-efficiency-programs/solar-energy-and-storage/solarize-eagle-county/solar-and-storage-rebates/](https://www.walkingmountains.org/sustainability-hub/energy-efficiency-programs/solar-energy-and-storage/solarize-eagle-county/solar-and-storage-rebates/)",
"[https://programs.dsireusa.org/system/program/detail/22786/eagle-county-walking-mountains-science-center-solar-pv-rebate](https://programs.dsireusa.org/system/program/detail/22786/eagle-county-walking-mountains-science-center-solar-pv-rebate)"
],
"evidenceText": "Walking Mountains provides a capped local match to the Holy Cross Energy solar PV rebate for eligible grid-tied, net-metered projects in specified Eagle River Valley areas.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22163",
"opportunityName": "Connecticut Hydrogen and Electric Automobile Purchase Rebate (CHEAPR)",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"fixed_tier_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_tier_amount",
"timing": "point_of_sale",
"formulaText": "CHEAPR rebate amount depends on vehicle type, new or used status, and Rebate Plus eligibility: BEV standard $1,000, BEV Rebate Plus New $4,000, BEV Rebate Plus Used $5,000, PHEV standard $500, PHEV Rebate Plus New $2,000, and PHEV Rebate Plus Used $3,000.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 500000,
"caps": {
"maxAwardCents": 500000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"eligible_BEV_purchase_or_lease",
"eligible_PHEV_purchase_or_lease"
],
"ineligibleCostCategories": [
"stationary_fuel_cell_system",
"EV_charger_installation",
"hydrogen_fueling_infrastructure"
],
"requiredInputs": [
"vehicle_type_BEV_or_PHEV",
"new_or_used",
"standard_or_Rebate_Plus_eligibility",
"vehicle_MSRP_or_price_cap_compliance",
"dealer_or_OEM_process",
"qualifying_vehicle_count"
],
"missingInputsForTypicalRetroFiEstimate": [
"vehicle_type",
"new_or_used",
"Rebate_Plus_eligibility",
"vehicle_price"
],
"rateTable": {
"tableId": "ct_cheapr_vehicle_rebate_amounts",
"dimensions": [
"vehicle_type",
"rebate_tier"
],
"rows": [
{
"vehicleType": "BEV",
"rebateTier": "standard_new_or_eligible_purchase",
"amountCents": 100000
},
{
"vehicleType": "BEV",
"rebateTier": "Rebate_Plus_New",
"amountCents": 400000
},
{
"vehicleType": "BEV",
"rebateTier": "Rebate_Plus_Used",
"amountCents": 500000
},
{
"vehicleType": "PHEV",
"rebateTier": "standard_new_or_eligible_purchase",
"amountCents": 50000
},
{
"vehicleType": "PHEV",
"rebateTier": "Rebate_Plus_New",
"amountCents": 200000
},
{
"vehicleType": "PHEV",
"rebateTier": "Rebate_Plus_Used",
"amountCents": 300000
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
"evidenceText": "Connecticut CHEAPR currently lists rebate amounts for eligible BEV and PHEV purchases or leases, with larger Rebate Plus amounts for qualifying applicants.",
"sourceUrls": [
"[https://portal.ct.gov/DEEP/Air/Mobile-Sources/CHEAPR/CHEAPR---Home](https://portal.ct.gov/DEEP/Air/Mobile-Sources/CHEAPR/CHEAPR---Home)",
"[https://apply.drivecheapr-ct.org/](https://apply.drivecheapr-ct.org/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "fuel_cell_system",
"action": "delete_bad_edge",
"reason": "The official CHEAPR value is a clean vehicle purchase or lease rebate; a stationary fuel cell system retrofit is not supported."
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
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://portal.ct.gov/DEEP/Air/Mobile-Sources/CHEAPR/CHEAPR---Home](https://portal.ct.gov/DEEP/Air/Mobile-Sources/CHEAPR/CHEAPR---Home)",
"[https://apply.drivecheapr-ct.org/](https://apply.drivecheapr-ct.org/)",
"[https://programs.dsireusa.org/system/program/detail/22163/connecticut-hydrogen-and-electric-automobile-purchase-rebate-cheapr](https://programs.dsireusa.org/system/program/detail/22163/connecticut-hydrogen-and-electric-automobile-purchase-rebate-cheapr)"
],
"evidenceText": "CHEAPR supports eligible BEV and PHEV purchases or leases. The target fuel cell system edge is not a source-backed building or stationary retrofit.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22165",
"opportunityName": "Delaware Clean Vehicle Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"fixed_tier_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_tier_amount",
"timing": "point_of_sale",
"formulaText": "Delaware clean vehicle rebate amount depends on vehicle type, new or used status, and price: new BEV below $40,000 MSRP $2,500; new BEV $40,000 to $50,000 $1,500; new PHEV below $50,000 $1,000; used BEV up to $40,000 fair market purchase price $2,500; used PHEV up to $40,000 $1,000.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 250000,
"caps": {
"maxAwardCents": 250000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"eligible_BEV_purchase_or_lease",
"eligible_PHEV_purchase_or_lease"
],
"ineligibleCostCategories": [
"EV_charger_installation",
"building_retrofit"
],
"requiredInputs": [
"vehicle_type_BEV_or_PHEV",
"new_or_used",
"base_MSRP_or_fair_market_purchase_price",
"lease_term_months_if_applicable",
"purchase_or_lease_date",
"qualifying_vehicle_count"
],
"missingInputsForTypicalRetroFiEstimate": [
"vehicle_type",
"new_or_used",
"vehicle_price_or_MSRP",
"lease_term_if_applicable"
],
"rateTable": {
"tableId": "delaware_clean_vehicle_rebate_amounts_effective_2026_05_01",
"dimensions": [
"vehicle_type",
"new_or_used",
"price_band"
],
"rows": [
{
"vehicleType": "BEV",
"newOrUsed": "new",
"priceBand": "base_MSRP_less_than_40000",
"amountCents": 250000
},
{
"vehicleType": "BEV",
"newOrUsed": "new",
"priceBand": "base_MSRP_40000_to_50000",
"amountCents": 150000
},
{
"vehicleType": "PHEV",
"newOrUsed": "new",
"priceBand": "base_MSRP_less_than_50000",
"amountCents": 100000
},
{
"vehicleType": "BEV",
"newOrUsed": "used",
"priceBand": "fair_market_purchase_price_40000_or_less",
"amountCents": 250000
},
{
"vehicleType": "PHEV",
"newOrUsed": "used",
"priceBand": "fair_market_purchase_price_40000_or_less",
"amountCents": 100000
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
"evidenceText": "DNREC lists Delaware clean vehicle rebate amounts effective May 1, 2026 for qualifying new and used BEV and PHEV purchases or leases.",
"sourceUrls": [
"[https://dnrec.delaware.gov/climate-coastal-energy/clean-transportation/vehicle-rebates/](https://dnrec.delaware.gov/climate-coastal-energy/clean-transportation/vehicle-rebates/)",
"[https://driveelectricdelaware.org/](https://driveelectricdelaware.org/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "electric_vehicle_purchase",
"action": "keep",
"reason": "The official program directly supports eligible electric and plug-in hybrid vehicle purchases or leases."
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
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "within 90 days of purchase or lease unless processed at participating dealer",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://dnrec.delaware.gov/climate-coastal-energy/clean-transportation/vehicle-rebates/](https://dnrec.delaware.gov/climate-coastal-energy/clean-transportation/vehicle-rebates/)",
"[https://driveelectricdelaware.org/](https://driveelectricdelaware.org/)",
"[https://driveelectricdelaware.org/faqs](https://driveelectricdelaware.org/faqs)",
"[https://programs.dsireusa.org/system/program/detail/22165/delaware-clean-vehicle-rebate-program](https://programs.dsireusa.org/system/program/detail/22165/delaware-clean-vehicle-rebate-program)"
],
"evidenceText": "Delaware publishes a vehicle rebate table by BEV/PHEV, new/used status, and price band. It is a transportation purchase rebate, not a charger or building retrofit.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4438",
"opportunityName": "Beaches Energy Services - Solar Water Heating Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"fixed_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_amount",
"timing": "post_installation_reimbursement",
"formulaText": "Residential Beaches Energy customers may receive a solar water heater rebate capped at $500 for qualifying certified solar domestic water heating equipment replacing an electric water heater, with required documentation submitted within 90 days of installation.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 50000,
"caps": {
"maxAwardCents": 50000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": 1,
"perCustomerCapCents": 50000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying_solar_domestic_water_heater"
],
"ineligibleCostCategories": [
"solar_pool_heating",
"new_construction",
"commercial_pool_system",
"non_solar_water_heater"
],
"requiredInputs": [
"qualifying_system_count",
"FSEC_certification",
"electric_water_heater_replacement",
"installation_date",
"licensed_Florida_contractor",
"contractor_invoice"
],
"missingInputsForTypicalRetroFiEstimate": [
"FSEC_certification",
"replacement_status",
"installation_date"
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
"evidenceText": "Beaches Energy lists a $500 maximum solar water heater rebate and requires rebate documents within 90 days of installation.",
"sourceUrls": [
"[https://www.beachesenergy.com/energy-savings/energy-rebates](https://www.beachesenergy.com/energy-savings/energy-rebates)",
"[https://www.beachesenergy.com/sites/default/files/documents/2025-08/solar-water-heater-rebate-form-2022.pdf](https://www.beachesenergy.com/sites/default/files/documents/2025-08/solar-water-heater-rebate-form-2022.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "solar_water_heating_system",
"action": "keep",
"reason": "The source directly supports qualifying residential solar domestic water heating systems."
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
"applicationDeadline": "within 90 days of installation",
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.beachesenergy.com/energy-savings/energy-rebates](https://www.beachesenergy.com/energy-savings/energy-rebates)",
"[https://www.beachesenergy.com/sites/default/files/documents/2025-08/solar-water-heater-rebate-form-2022.pdf](https://www.beachesenergy.com/sites/default/files/documents/2025-08/solar-water-heater-rebate-form-2022.pdf)",
"[https://beachesenergy.com/about-us/resources/forms](https://beachesenergy.com/about-us/resources/forms)"
],
"evidenceText": "Beaches Energy supports a capped residential solar domestic water heater rebate. Pool heating, commercial systems, and non-solar water heating are not supported.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1774",
"opportunityName": "City of Tallahassee Utilities - Grant Programs",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"cash_grant"
],
"primaryValueModelKinds": [
"capped_percent_of_eligible_cost",
"rate_table"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "cash_grant",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "After a required City of Tallahassee home energy audit and approved-contractor installation, standard ceiling insulation grants cover 80% of installed cost up to $400; low-income grants cover 100% of installed cost up to $500.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
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
"approved_blown_fiberglass_ceiling_insulation",
"approved_loose_fill_cellulose_ceiling_insulation",
"approved_installation_labor"
],
"ineligibleCostCategories": [
"foam_insulation",
"rockwool",
"batts",
"radiant_barrier",
"insulation_removal",
"new_construction"
],
"requiredInputs": [
"installed_insulation_cost",
"standard_or_low_income_grant_tier",
"audit_result",
"approved_contractor",
"material_type",
"target_R_value"
],
"missingInputsForTypicalRetroFiEstimate": [
"installed_cost",
"grant_tier",
"audit_result",
"material_type"
],
"rateTable": {
"tableId": "tallahassee_ceiling_insulation_grant_tiers",
"dimensions": [
"applicant_tier"
],
"rows": [
{
"applicantTier": "standard",
"percentOfInstalledCost": 0.8,
"maxAmountCents": 40000
},
{
"applicantTier": "low_income",
"percentOfInstalledCost": 1,
"maxAmountCents": 50000
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
"evidenceText": "Tallahassee lists ceiling insulation grants of 80% up to $400 for standard customers and 100% up to $500 for low-income customers.",
"sourceUrls": [
"[https://www.talgov.com/you/you-products-home-ceiling-insulation](https://www.talgov.com/you/you-products-home-ceiling-insulation)",
"[https://www.talgov.com/you/you-products-home-energy-audit](https://www.talgov.com/you/you-products-home-energy-audit)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "The source supports attic or ceiling insulation only; keep the edge narrowly scoped to eligible blown fiberglass or loose-fill cellulose ceiling insulation."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Grant is applied to the installed cost and is not paid directly to the customer; source did not state broader stacking rules."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.talgov.com/you/you-products-home-ceiling-insulation](https://www.talgov.com/you/you-products-home-ceiling-insulation)",
"[https://www.talgov.com/you/you-products-home-energy-audit](https://www.talgov.com/you/you-products-home-energy-audit)"
],
"evidenceText": "Tallahassee supports only attic or ceiling insulation grants after an energy audit, with cost-share tiers by income status and strict material exclusions.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3695",
"opportunityName": "Florida Public Utilities (Gas) - Residential Energy Efficiency Rebate Programs",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"fixed_tier_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_tier_amount",
"timing": "post_installation_reimbursement",
"formulaText": "For eligible residential natural gas furnace installations, Florida Public Utilities lists $725 when switching from electric to gas and $500 when replacing an old gas furnace.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 72500,
"caps": {
"maxAwardCents": 72500,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"eligible_residential_natural_gas_furnace"
],
"ineligibleCostCategories": [
"electric_heat_pump",
"non_gas_HVAC"
],
"requiredInputs": [
"furnace_count",
"conversion_type_switch_or_replace",
"FPUC_natural_gas_service",
"installation_date",
"invoice_or_rebate_application"
],
"missingInputsForTypicalRetroFiEstimate": [
"conversion_type",
"furnace_count",
"service_status"
],
"rateTable": {
"tableId": "fpuc_residential_natural_gas_furnace_rebate",
"dimensions": [
"installation_type"
],
"rows": [
{
"installationType": "switch_electric_to_natural_gas",
"amountCentsPerUnit": 72500
},
{
"installationType": "replace_old_natural_gas",
"amountCentsPerUnit": 50000
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
"evidenceText": "FPUC residential rebate chart lists natural gas furnace rebates of $725 for switching from electric and $500 for replacing old gas equipment.",
"sourceUrls": [
"[https://fpuc.com/residential/rebates/](https://fpuc.com/residential/rebates/)",
"[https://rebate.fpuc.com/](https://rebate.fpuc.com/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "The official rebate table supports residential natural gas furnace incentives; the edge should be narrowed away from generic or electric HVAC."
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
"applicationDeadline": "within one year of installation for applicable appliance rebates",
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://fpuc.com/residential/rebates/](https://fpuc.com/residential/rebates/)",
"[https://rebate.fpuc.com/](https://rebate.fpuc.com/)"
],
"evidenceText": "FPUC supports residential natural gas furnace rebates with different amounts for fuel switching and gas equipment replacement. The old $1,200 furnace rule was not the furnace table amount.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5166",
"opportunityName": "Fort Pierce Utilities Authority - Solar Water Heating Rebate",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"fixed_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_amount",
"timing": "post_installation_reimbursement",
"formulaText": "FPUA residential electric customers may receive $450 for one new solar hot water heater system installed by a licensed Florida contractor with required invoice and FSEC certification documentation.",
"amountCents": 45000,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 45000,
"caps": {
"maxAwardCents": 45000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": 1,
"perCustomerCapCents": 45000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"new_solar_hot_water_heater"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"solar_hot_water_system_count",
"FSEC_certification",
"licensed_Florida_contractor",
"contractor_invoice",
"FPUA_residential_electric_account"
],
"missingInputsForTypicalRetroFiEstimate": [
"FSEC_certification",
"invoice",
"service_account_status"
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
"evidenceText": "FPUA electric rebate materials list a $450 solar hot water heater rebate with invoice, FSEC certification, licensed contractor, and one-rebate limits.",
"sourceUrls": [
"[https://fpua.com/ways-to-save/](https://fpua.com/ways-to-save/)",
"[https://fpua.com/wp-content/uploads/2025/10/Residential-Electric-Rebate-Form-Updated-10-2-25.pdf](https://fpua.com/wp-content/uploads/2025/10/Residential-Electric-Rebate-Form-Updated-10-2-25.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "solar_water_heating_system",
"action": "keep",
"reason": "The official FPUA electric rebate materials directly support new residential solar hot water heater systems."
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
"applicationDeadline": "2026-09-30 or earlier if funds are depleted",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://fpua.com/ways-to-save/](https://fpua.com/ways-to-save/)",
"[https://fpua.com/wp-content/uploads/2025/10/Residential-Electric-Rebate-Form-Updated-10-2-25.pdf](https://fpua.com/wp-content/uploads/2025/10/Residential-Electric-Rebate-Form-Updated-10-2-25.pdf)"
],
"evidenceText": "FPUA publishes a fixed $450 solar hot water heater rebate for residential electric customers, with FSEC certification and licensed-contractor documentation.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22751",
"opportunityName": "JEA - Commercial Fleet Electrification Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"technical_assistance",
"process_value"
],
"primaryValueModelKinds": [
"capped_percent_of_eligible_cost",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "capped_percent_of_eligible_cost",
"timing": "post_installation_reimbursement",
"formulaText": "JEA's fleet make-ready incentive covers 60% of eligible customer-side make-ready project cost, capped at $15,000, for approved commercial fleet electrification projects.",
"amountCents": null,
"percent": 0.6,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 1500000,
"caps": {
"maxAwardCents": 1500000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.6,
"maxUnits": null,
"perCustomerCapCents": 1500000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"eligible_customer_side_make_ready_project_costs"
],
"ineligibleCostCategories": [
"behind_the_meter_non_make_ready_costs",
"EVSE_hardware_under_make_ready",
"networking_equipment",
"bollards",
"software",
"maintenance"
],
"requiredInputs": [
"eligible_make_ready_cost",
"JEA_non_residential_account",
"fleet_electrification_scope",
"preapproval_or_application_status",
"charger_support_requirements"
],
"missingInputsForTypicalRetroFiEstimate": [
"eligible_make_ready_cost",
"approval_status",
"project_scope"
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
"evidenceText": "JEA lists a make-ready incentive of up to $15,000, capped at 60% of project cost, for commercial fleet electrification.",
"sourceUrls": [
"[https://www.jea.com/business_resources/fleet_electrification_program/](https://www.jea.com/business_resources/fleet_electrification_program/)",
"[https://www.jea.com/Business_Resources/2023_JEA_MakeReady_Application_FINAL/](https://www.jea.com/Business_Resources/2023_JEA_MakeReady_Application_FINAL/)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "technical_assistance",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Eligible JEA commercial fleet customers may receive consultation and a fleet conversion plan; the source does not assign a cash value to this planning support.",
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
"fleet_size",
"current_fleet_use",
"site_electric_service",
"JEA_customer_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"fleet_size",
"site_service_status"
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
"evidenceText": "JEA describes tools, consultation, customized support, and a complimentary fleet conversion plan for commercial customers pursuing fleet electrification.",
"sourceUrls": [
"[https://www.jea.com/business_resources/fleet_electrification_program/](https://www.jea.com/business_resources/fleet_electrification_program/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_make_ready_electrical_upgrade",
"action": "keep",
"reason": "The source directly supports commercial fleet make-ready infrastructure incentives and related planning support."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Access to the separate Electrification Rebates Program may exist, but charger hardware rebates are separate from the make-ready incentive."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.jea.com/business_resources/fleet_electrification_program/](https://www.jea.com/business_resources/fleet_electrification_program/)",
"[https://www.jea.com/Business_Resources/2023_JEA_MakeReady_Application_FINAL/](https://www.jea.com/Business_Resources/2023_JEA_MakeReady_Application_FINAL/)",
"[https://www.jea.com/Business_Resources/Rebates_for_Businesses/Electrification_Rebates_Program/](https://www.jea.com/Business_Resources/Rebates_for_Businesses/Electrification_Rebates_Program/)",
"[https://jeaconnect.my.site.com/fleet/s/interest-form](https://jeaconnect.my.site.com/fleet/s/interest-form)"
],
"evidenceText": "JEA supports a capped make-ready incentive plus non-cash fleet electrification planning. Separate charger hardware rebates should not be bundled into this make-ready formula.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22307",
"opportunityName": "Orlando Utilities Commission - Electric Vehicle Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"fixed_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_amount",
"timing": "post_purchase_rebate",
"formulaText": "OUC electric customers may receive a $200 bill credit for an eligible passenger electric vehicle purchase or lease when the application and proof are submitted within six months.",
"amountCents": 20000,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 20000,
"caps": {
"maxAwardCents": 20000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"eligible_passenger_EV_purchase_or_lease"
],
"ineligibleCostCategories": [
"EV_charger_installation",
"charging_station",
"scooter",
"skateboard",
"bicycle"
],
"requiredInputs": [
"qualifying_EV_count",
"purchase_or_lease_date",
"proof_of_purchase_or_lease",
"OUC_electric_account",
"passenger_vehicle_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"purchase_or_lease_date",
"proof_of_purchase_or_lease",
"OUC_electric_account_status"
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
"evidenceText": "OUC lists a $200 EV purchase or lease rebate paid as a bill credit and states there is no separate charger rebate.",
"sourceUrls": [
"[https://www.ouc.com/solutions-programs/electric-vehicles/](https://www.ouc.com/solutions-programs/electric-vehicles/)",
"[https://www.ouc.com/solutions-programs/savings/rebates/electric-vehicle-purchase-lease/](https://www.ouc.com/solutions-programs/savings/rebates/electric-vehicle-purchase-lease/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "OUC’s current EV purchase or lease rebate explicitly does not provide a separate EV charger or charging-station rebate."
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
"applicationDeadline": "within six months of EV purchase or lease",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.ouc.com/solutions-programs/electric-vehicles/](https://www.ouc.com/solutions-programs/electric-vehicles/)",
"[https://www.ouc.com/solutions-programs/savings/rebates/electric-vehicle-purchase-lease/](https://www.ouc.com/solutions-programs/savings/rebates/electric-vehicle-purchase-lease/)",
"[https://programs.dsireusa.org/system/program/detail/22307/orlando-utilities-commission-electric-vehicle-rebate-program](https://programs.dsireusa.org/system/program/detail/22307/orlando-utilities-commission-electric-vehicle-rebate-program)"
],
"evidenceText": "OUC provides a $200 bill credit for eligible passenger EV purchases or leases. The target EV charger installation edge is unsupported.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2867",
"opportunityName": "Orlando Utilities Commission - Solar Programs",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"capped_percent_of_eligible_cost"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "capped_percent_of_eligible_cost",
"timing": "post_purchase_rebate",
"formulaText": "OUC electric customers may receive 100% of eligible solar thermal water heater cost, capped at $900, for FSEC- or SRCC-certified systems. Receipts and certification must be submitted within six months.",
"amountCents": null,
"percent": 1,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 90000,
"caps": {
"maxAwardCents": 90000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 1,
"maxUnits": null,
"perCustomerCapCents": 90000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"FSEC_or_SRCC_certified_solar_thermal_water_heater"
],
"ineligibleCostCategories": [
"pool_heating",
"water_only_customer_project",
"solar_PV"
],
"requiredInputs": [
"eligible_installed_cost",
"FSEC_or_SRCC_certification",
"purchase_or_installation_date",
"OUC_electric_account",
"system_count"
],
"missingInputsForTypicalRetroFiEstimate": [
"eligible_installed_cost",
"certification",
"OUC_electric_account_status"
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
"evidenceText": "OUC solar thermal water heater page states rebate amount is 100% of cost up to $900, with FSEC or SRCC certification required.",
"sourceUrls": [
"[https://www.ouc.com/solutions-programs/savings/rebates/solar-thermal-water-heater/](https://www.ouc.com/solutions-programs/savings/rebates/solar-thermal-water-heater/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "solar_water_heating_system",
"action": "keep",
"reason": "The official OUC rebate page directly supports certified solar thermal water heaters and excludes pool heating."
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
"applicationDeadline": "within six months of purchase or installation",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.ouc.com/solutions-programs/savings/rebates/solar-thermal-water-heater/](https://www.ouc.com/solutions-programs/savings/rebates/solar-thermal-water-heater/)",
"[https://programs.dsireusa.org/system/program/detail/2867/orlando-utilities-commission-solar-programs](https://programs.dsireusa.org/system/program/detail/2867/orlando-utilities-commission-solar-programs)"
],
"evidenceText": "OUC supports a 100% cost rebate capped at $900 for certified solar thermal water heaters, paid as a bill credit to OUC electric customers.",
"reasoningNotes": "",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22635",
"opportunityName": "Georgia - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"cash_grant"
],
"primaryValueModelKinds": [
"competitive_cost_share"
],
"effects": [
{
"effectType": "grant_expected_value",
"cashValueClassification": "cash_grant",
"valueModelKind": "competitive_cost_share",
"timing": "application_process",
"formulaText": "For Georgia NEVI public DC fast-charging projects selected through GDOT procurement, potential federal NEVI participation may cover up to 80% of eligible project cost. Awards are competitive and site-specific, so no expected value should be counted without selection probability and approved eligible cost.",
"amountCents": null,
"percent": 0.8,
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
"eligibleCostCategories": [
"eligible_NEVI_DC_fast_charging_infrastructure_costs"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"eligible_project_cost",
"GDOT_procurement_round_or_award",
"NEVI_corridor_site",
"approved_cost_share",
"station_power_and_port_count"
],
"missingInputsForTypicalRetroFiEstimate": [
"eligible_project_cost",
"award_selection_probability",
"approved_award_amount",
"site_eligibility"
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
"probabilityRequired": true,
"probabilityDiscount": null,
"probabilityEvidenceType": "scoring_criteria_only"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "GDOT NEVI materials describe public DC fast-charging deployment on alternative fuel corridors; federal NEVI cost share is generally up to 80%.",
"sourceUrls": [
"[https://nevi-gdot.hub.arcgis.com/](https://nevi-gdot.hub.arcgis.com/)",
"[https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/GDOT%20NEVI%20Plan.pdf](https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/GDOT%20NEVI%20Plan.pdf)",
"[https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/NEVI%20Fact%20Sheet.pdf](https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/NEVI%20Fact%20Sheet.pdf)",
"[https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs](https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "EV charger installation is supported only for NEVI-compliant public DC fast-charging infrastructure under GDOT procurement and corridor requirements."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "NEVI awards require non-federal cost share; exact stacking and eligible-cost rules are procurement-specific."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://nevi-gdot.hub.arcgis.com/](https://nevi-gdot.hub.arcgis.com/)",
"[https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/NEVI%20Fact%20Sheet.pdf](https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/NEVI%20Fact%20Sheet.pdf)",
"[https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/GDOT%20NEVI%20Plan.pdf](https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/GDOT%20NEVI%20Plan.pdf)",
"[https://nevi-gdot.hub.arcgis.com/pages/round2](https://nevi-gdot.hub.arcgis.com/pages/round2)",
"[https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs](https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs)"
],
"evidenceText": "Georgia NEVI supports public DC fast-charging infrastructure through competitive, site-specific procurement. The 80% federal share is a cap, not an expected customer rebate.",
"reasoningNotes": "",
"humanReviewRequired": true,
"humanReviewReasons": [
"Open procurement status and site-specific award terms should be checked before presenting any project estimate."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22630",
"opportunityName": "Hawaii - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"cash_grant"
],
"primaryValueModelKinds": [
"competitive_cost_share"
],
"effects": [
{
"effectType": "grant_expected_value",
"cashValueClassification": "cash_grant",
"valueModelKind": "competitive_cost_share",
"timing": "application_process",
"formulaText": "For HDOT NEVI deployment, selected public DC fast-charging infrastructure may receive federal NEVI cost-share support up to 80% of eligible project cost, but no open direct customer rebate or standard award table was verified.",
"amountCents": null,
"percent": 0.8,
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
"eligibleCostCategories": [
"eligible_NEVI_public_DC_fast_charging_costs"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"eligible_project_cost",
"HDOT_selection_or_contract_status",
"NEVI_site_location",
"charger_power_and_port_count",
"approved_cost_share"
],
"missingInputsForTypicalRetroFiEstimate": [
"eligible_project_cost",
"selection_status",
"approved_award_amount",
"award_probability"
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
"probabilityRequired": true,
"probabilityDiscount": null,
"probabilityEvidenceType": "none"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "HDOT NEVI materials describe federal formula funding for public DC fast-charging sites meeting NEVI power, port, corridor, and access requirements.",
"sourceUrls": [
"[https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/](https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/)",
"[https://hidot.hawaii.gov/highways/files/2025/09/20250911-HDOT-letter-Submitting-2025-NEVI-Plan-for-FY26-funding-approved-by-FHWA.pdf](https://hidot.hawaii.gov/highways/files/2025/09/20250911-HDOT-letter-Submitting-2025-NEVI-Plan-for-FY26-funding-approved-by-FHWA.pdf)",
"[https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs](https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "move_to_special_workflow",
"reason": "The EV charger match is valid only as HDOT NEVI public fast-charging deployment or procurement, not an open residential or Level 2 customer rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Federal NEVI share is generally capped at 80% of eligible costs; exact non-federal cost share is procurement-specific."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/](https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/)",
"[https://hidot.hawaii.gov/highways/kahului-ev-charging-station-opens-feb-28/](https://hidot.hawaii.gov/highways/kahului-ev-charging-station-opens-feb-28/)",
"[https://hidot.hawaii.gov/highways/files/2025/09/20250911-HDOT-letter-Submitting-2025-NEVI-Plan-for-FY26-funding-approved-by-FHWA.pdf](https://hidot.hawaii.gov/highways/files/2025/09/20250911-HDOT-letter-Submitting-2025-NEVI-Plan-for-FY26-funding-approved-by-FHWA.pdf)",
"[https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs](https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs)"
],
"evidenceText": "Hawaii NEVI is a state federal-formula deployment program for public DC fast charging. No standard customer-facing rebate amount or open application was verified.",
"reasoningNotes": "",
"humanReviewRequired": true,
"humanReviewReasons": [
"No current public application or standard customer rebate schedule was verified for HDOT NEVI deployment."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2113",
"opportunityName": "KIUC - Energy Wise Commercial Energy Efficiency Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"unknown",
"technical_assistance"
],
"primaryValueModelKinds": [
"custom_quote",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "unknown",
"valueModelKind": "custom_quote",
"timing": "application_process",
"formulaText": "KIUC commercial retrofit incentives are project-specific and may range from 50% to 100% after KIUC review, cost-effectiveness screening, approved trade ally involvement, and an incentive agreement before purchase or installation; the program states it does not offer rebates.",
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
"approved_commercial_air_conditioning",
"approved_motors",
"approved_refrigeration",
"approved_lighting_controls"
],
"ineligibleCostCategories": [
"standalone_LED_fixture_or_lamp_replacement_unless_separately_approved",
"residential_measures"
],
"requiredInputs": [
"technology_category",
"eligible_project_cost_or_incremental_cost",
"estimated_energy_savings",
"TRC_cost_effectiveness_result",
"KIUC_incentive_agreement",
"approved_trade_ally"
],
"missingInputsForTypicalRetroFiEstimate": [
"eligible_project_cost_or_incremental_cost",
"energy_savings",
"TRC_result",
"KIUC_approved_incentive"
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
"evidenceText": "KIUC says commercial members may receive 50% to 100% incentives for approved projects, but amounts are approved case by case and are not standard rebates.",
"sourceUrls": [
"[https://kiuc.coop/commercial-programs](https://kiuc.coop/commercial-programs)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "technical_assistance",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Commercial members begin by contacting KIUC to develop an energy plan and verify program requirements and available funds before purchase or installation; no separate cash value is published for this process support.",
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
"KIUC_commercial_membership",
"project_scope",
"trade_ally_or_supplier"
],
"missingInputsForTypicalRetroFiEstimate": [
"project_scope",
"KIUC_review_status"
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
"evidenceText": "KIUC instructs commercial members to contact the utility, develop an energy plan, and submit projects before purchase or installation.",
"sourceUrls": [
"[https://kiuc.coop/commercial-programs](https://kiuc.coop/commercial-programs)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "delete_bad_edge",
"reason": "Current official language lists lighting controls, not general LED fixture or lamp replacement; broad LED retrofit matching is unsupported."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Exact incentive is set through KIUC approval and an incentive agreement; source did not publish a deterministic rebate formula."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://kiuc.coop/commercial-programs](https://kiuc.coop/commercial-programs)"
],
"evidenceText": "KIUC provides custom commercial efficiency incentives after preapproval and screening. The source supports lighting controls, not a broad LED retrofit edge.",
"reasoningNotes": "",
"humanReviewRequired": true,
"humanReviewReasons": [
"Exact incentive depends on KIUC project review, TRC screening, and approved incentive agreement."
]
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:506"
}

