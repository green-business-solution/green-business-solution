{
"schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
"researchedAt": "2026-07-02",
"source": "gpt_pro",
"batchNumber": 38,
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5853",
"opportunityName": "Appalachian Power (Electric)- Non-Residential Energy Efficiency Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"hybrid_rate_plus_cap"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use the 2026 Business Energy Solutions measure guide rate for each eligible lighting, lighting controls, HVAC controls or refrigeration measure, then apply the 30% project cost cap and customer caps.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 20000000,
"caps": {
"maxAwardCents": 20000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.3,
"maxUnits": null,
"perCustomerCapCents": 20000000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"eligible LED lighting equipment",
"lighting controls",
"HVAC controls",
"eligible refrigeration equipment",
"eligible labor and project costs as allowed by guide"
],
"ineligibleCostCategories": [
"fuel switching",
"on-site generation",
"gas-driven equipment",
"used or rebuilt equipment"
],
"requiredInputs": [
"eligible measure type",
"unit quantity",
"equipment specifications",
"project cost",
"lighting versus non-lighting category",
"customer annual incentive history",
"preapproval status where required"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure-specific quantity",
"project cost",
"equipment tier",
"customer cap usage"
],
"rateTable": {
"tableId": "apco_va_bes_2026_selected_rates",
"dimensions": [
"measure",
"unit",
"tier"
],
"rows": [
{
"measure": "packaged_terminal_heat_pump",
"amountCents": 2000,
"unit": "unit"
},
{
"measure": "packaged_terminal_air_conditioner",
"amountCents": 1500,
"unit": "unit"
},
{
"measure": "hvac_variable_frequency_drive",
"amountCents": 15000,
"unit": "horsepower"
},
{
"measure": "dual_enthalpy_economizer_control",
"tier": "5 tons or less",
"amountCents": 3600,
"unit": "control"
},
{
"measure": "dual_enthalpy_economizer_control",
"tier": "greater than 5 tons",
"amountCents": 10000,
"unit": "control"
}
]
},
"measureCatalog": {
"catalogId": "apco_va_bes_2026_measure_guide",
"selectionInput": "eligible measure and equipment tier",
"rows": [
{
"category": "lighting",
"calculation": "published per-fixture, per-lamp or per-control rate"
},
{
"category": "refrigeration",
"calculation": "published per-unit refrigeration equipment rate"
},
{
"category": "HVAC controls",
"calculation": "published per-control, per-horsepower or per-unit rate"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "The current guide lists lighting, controls, HVAC and refrigeration rates and caps rebates at 30% of project cost with separate lighting and non-lighting caps.",
"sourceUrls": [
"[https://takechargeva.com/programs/for-your-business/business-energy-solutions](https://takechargeva.com/programs/for-your-business/business-energy-solutions)",
"[https://takechargeva.com/resources/docs/2026.04_Appalachian%20Power_VA%20BES%20Incentive%20Guide_Limited%20Time%20Offer.pdf](https://takechargeva.com/resources/docs/2026.04_Appalachian%20Power_VA%20BES%20Incentive%20Guide_Limited%20Time%20Offer.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Current measure guide includes commercial refrigeration equipment incentives."
},
{
"retrofitTypeId": "hvac_controls_retrofit",
"action": "keep",
"reason": "Current guide includes HVAC controls and related HVAC control measures."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "delete_bad_edge",
"reason": "Current eligible measures do not list insulation for this non-residential BES program."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Current guide includes LED lighting incentives."
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"action": "keep",
"reason": "Current guide includes lighting controls incentives."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Projects cannot receive another Appalachian Power rebate for the same measure."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://takechargeva.com/programs/for-your-business/business-energy-solutions](https://takechargeva.com/programs/for-your-business/business-energy-solutions)",
"[https://takechargeva.com/resources/docs/2026.04_Appalachian%20Power_VA%20BES%20Incentive%20Guide_Limited%20Time%20Offer.pdf](https://takechargeva.com/resources/docs/2026.04_Appalachian%20Power_VA%20BES%20Incentive%20Guide_Limited%20Time%20Offer.pdf)",
"[https://takechargeva.com/](https://takechargeva.com/)",
"[https://www.appalachianpower.com/savings/business/](https://www.appalachianpower.com/savings/business/)"
],
"evidenceText": "Business Energy Solutions has current measure rates for lighting, controls, HVAC and refrigeration and excludes unsupported insulation.",
"reasoningNotes": "Used uploaded target list and repaired notes as the control set. ",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2458",
"opportunityName": "APS - Energy Efficiency Solutions for Business",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
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
"formulaText": "Select the eligible Solutions for Business measure rate from the current quick-look table and multiply by installed quantity or verified savings, subject to program cost caps.",
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
"qualified LED lighting",
"lighting controls",
"energy management systems",
"eligible non-HVAC custom efficiency costs"
],
"ineligibleCostCategories": [
"fuel switching",
"renewable generation",
"natural gas measures",
"discontinued HVAC rebates"
],
"requiredInputs": [
"APS account eligibility",
"measure type",
"installed quantity",
"equipment tier",
"project cost",
"annual kWh savings for custom measures",
"summer peak kWh savings for custom measures",
"preapproval status when required"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure type",
"quantity",
"project cost",
"verified savings for custom measures"
],
"rateTable": {
"tableId": "aps_solutions_for_business_general_measures_quick_look",
"dimensions": [
"measure",
"unit",
"tier"
],
"rows": [
{
"measure": "LED flat panel",
"amountCents": 1500,
"unit": "fixture"
},
{
"measure": "LED high bay",
"tier": "100 watts or less",
"amountCents": 2000,
"unit": "fixture"
},
{
"measure": "LED high bay",
"tier": "greater than 100 and less than 200 watts",
"amountCents": 2500,
"unit": "fixture"
},
{
"measure": "LED high bay",
"tier": "200 watts or greater",
"amountCents": 4500,
"unit": "fixture"
},
{
"measure": "LED MR16 lamp",
"amountCents": 600,
"unit": "lamp"
},
{
"measure": "linear LED lamp",
"amountCents": 300,
"unit": "lamp"
},
{
"measure": "outdoor LED",
"tier": "50 watts or less",
"amountCents": 2000,
"unit": "fixture"
},
{
"measure": "outdoor LED",
"tier": "greater than 50 and less than 300 watts",
"amountCents": 3500,
"unit": "fixture"
},
{
"measure": "outdoor LED",
"tier": "300 watts or greater",
"amountCents": 5000,
"unit": "fixture"
},
{
"measure": "regular-to-smart lighting control",
"amountCents": 500,
"unit": "fixture"
},
{
"measure": "custom non-HVAC annual savings",
"rate": 0.02,
"rateUnit": "dollars per annual kWh"
},
{
"measure": "custom non-HVAC summer peak savings",
"rate": 0.18,
"rateUnit": "dollars per summer peak kWh"
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
"evidenceText": "Current APS materials list lighting, controls, EMS and non-HVAC custom rates, while Existing Facilities HVAC rebates were discontinued.",
"sourceUrls": [
"[https://www.aps.com/en/Business/Save-Money-and-Energy/Business-Solutions](https://www.aps.com/en/Business/Save-Money-and-Energy/Business-Solutions)",
"[https://webtools.dnv.com/projects/Portals/15/APS_S4B_General_Measures_Quick_Look.pdf?ver=DviwmIQoHKcTDDPVaZ5ADA%3D%3D](https://webtools.dnv.com/projects/Portals/15/APS_S4B_General_Measures_Quick_Look.pdf?ver=DviwmIQoHKcTDDPVaZ5ADA%3D%3D)",
"[https://webtools.dnv.com/projects/Portals/15/APS_S4B_Policies_Procedures.pdf?ver=blAwnFHdP3chsBP2JS20UA%3D%3D](https://webtools.dnv.com/projects/Portals/15/APS_S4B_Policies_Procedures.pdf?ver=blAwnFHdP3chsBP2JS20UA%3D%3D)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "delete_bad_edge",
"reason": "APS discontinued Business Existing Facilities HVAC rebates as of January 1, 2026."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "delete_bad_edge",
"reason": "The current general measures quick-look table does not list heat pump water heaters."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Current Existing Facilities HVAC rebates are discontinued and no broad HVAC replacement rate is supported."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Current APS business materials include LED lighting rates."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebates are subject to APS policies, funding and applicable project cost caps."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.aps.com/en/Business/Save-Money-and-Energy/Business-Solutions](https://www.aps.com/en/Business/Save-Money-and-Energy/Business-Solutions)",
"[https://webtools.dnv.com/projects/Portals/15/APS_S4B_Policies_Procedures.pdf?ver=blAwnFHdP3chsBP2JS20UA%3D%3D](https://webtools.dnv.com/projects/Portals/15/APS_S4B_Policies_Procedures.pdf?ver=blAwnFHdP3chsBP2JS20UA%3D%3D)",
"[https://webtools.dnv.com/projects/Portals/15/APS_S4B_General_Measures_Quick_Look.pdf?ver=DviwmIQoHKcTDDPVaZ5ADA%3D%3D](https://webtools.dnv.com/projects/Portals/15/APS_S4B_General_Measures_Quick_Look.pdf?ver=DviwmIQoHKcTDDPVaZ5ADA%3D%3D)"
],
"evidenceText": "APS current tables support lighting and controls, not the target heat pump or HVAC replacement edges.",
"reasoningNotes": "Repair keeps only the supported lighting edge and removes stale HVAC and HPWH edges.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4238",
"opportunityName": "Mohave Electric Cooperative - Energy Efficiency Rebate Program",
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
"formulaText": "Select the MEC HVAC rebate tier by equipment type and SEER rating, then pay the fixed tier amount after required documentation.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 20000,
"maxAmountCents": 200000,
"caps": {
"maxAwardCents": 200000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying heat pump",
"qualifying central air conditioner",
"qualifying ductless mini-split"
],
"ineligibleCostCategories": [
"EV charging equipment",
"LED lighting",
"window air-conditioning units",
"garage or non-home mini-split installations"
],
"requiredInputs": [
"equipment type",
"SEER rating",
"invoice or receipt",
"required photos",
"member account",
"W-9 if rebate exceeds 600 dollars",
"installation date"
],
"missingInputsForTypicalRetroFiEstimate": [
"equipment type",
"SEER rating",
"installation documentation"
],
"rateTable": {
"tableId": "mohave_electric_hvac_rebate_tiers",
"dimensions": [
"equipment",
"SEER"
],
"rows": [
{
"equipment": "central heat pump or central air conditioner",
"SEER": "15",
"amountCents": 20000
},
{
"equipment": "central heat pump or central air conditioner",
"SEER": "16",
"amountCents": 75000
},
{
"equipment": "central heat pump or central air conditioner",
"SEER": "17",
"amountCents": 150000
},
{
"equipment": "central heat pump or central air conditioner",
"SEER": "18 or greater",
"amountCents": 200000
},
{
"equipment": "ductless mini-split",
"SEER": "15",
"amountCents": 20000
},
{
"equipment": "ductless mini-split",
"SEER": "16",
"amountCents": 30000
},
{
"equipment": "ductless mini-split",
"SEER": "17",
"amountCents": 40000
},
{
"equipment": "ductless mini-split",
"SEER": "18 or greater",
"amountCents": 50000
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
"evidenceText": "MEC current pages publish SEER-tiered rebates for heat pumps, air conditioners and mini-splits; Mohave Charged is a battery rebate, not EV charging.",
"sourceUrls": [
"[https://www.mohaveelectric.com/energy-solutions/rebates/](https://www.mohaveelectric.com/energy-solutions/rebates/)",
"[https://www.mohaveelectric.com/energy-solutions/rebates/heat-pump-rebate/](https://www.mohaveelectric.com/energy-solutions/rebates/heat-pump-rebate/)",
"[https://www.mohaveelectric.com/energy-solutions/rebates/air-conditioning-rebate/](https://www.mohaveelectric.com/energy-solutions/rebates/air-conditioning-rebate/)",
"[https://www.mohaveelectric.com/energy-solutions/rebates/mini-split-rebate/](https://www.mohaveelectric.com/energy-solutions/rebates/mini-split-rebate/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "The current Mohave Charged offering is for battery storage, not EV charging."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Current pages include heat pump and heat-pump mini-split rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Current pages include qualifying central air-conditioning rebates."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "delete_bad_edge",
"reason": "Current MEC rebate pages do not list LED lighting under this opportunity."
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
"applicationDeadline": "Submit within one year of purchase or installation as applicable.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.mohaveelectric.com/energy-solutions/rebates/](https://www.mohaveelectric.com/energy-solutions/rebates/)",
"[https://www.mohaveelectric.com/energy-solutions/rebates/heat-pump-rebate/](https://www.mohaveelectric.com/energy-solutions/rebates/heat-pump-rebate/)",
"[https://www.mohaveelectric.com/energy-solutions/rebates/air-conditioning-rebate/](https://www.mohaveelectric.com/energy-solutions/rebates/air-conditioning-rebate/)",
"[https://www.mohaveelectric.com/energy-solutions/rebates/mini-split-rebate/](https://www.mohaveelectric.com/energy-solutions/rebates/mini-split-rebate/)",
"[https://www.mohaveelectric.com/energy-solutions/rebates/mohave-charged-rebates/](https://www.mohaveelectric.com/energy-solutions/rebates/mohave-charged-rebates/)"
],
"evidenceText": "MEC publishes fixed SEER-tiered HVAC rebates and does not support EV charging or LED lighting under this rebate record.",
"reasoningNotes": "Repair converts the target from a broad mixed set to the supported residential HVAC rebate table.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:bright-start-for-new-business",
"opportunityName": "Bright Start for New Business",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate",
"technical_assistance",
"process_value",
"non_cash"
],
"primaryValueModelKinds": [
"custom_quote",
"non_cash_process_value"
],
"effects": [
{
"effectType": "process_value",
"cashValueClassification": "technical_assistance",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "SVP provides free energy audit services, membership and project or installation management support for qualifying new-business facilities; no cash amount is published for the service value.",
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
"energy audit services",
"project management assistance",
"installation management for qualifying small facilities"
],
"ineligibleCostCategories": [
"water fixtures",
"unapproved non-lighting or non-HVAC retrofits"
],
"requiredInputs": [
"new business or prospective tenant status",
"facility square footage",
"SVP service status",
"requested assistance type"
],
"missingInputsForTypicalRetroFiEstimate": [
"facility square footage",
"SVP-approved service scope"
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
"evidenceText": "SVP describes Bright Start as free audit and project support for new businesses, plus enhanced lighting and HVAC retrofit rebates.",
"sourceUrls": [
"[https://www.siliconvalleypower.com/businesses/save-money](https://www.siliconvalleypower.com/businesses/save-money)"
]
},
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "custom_quote",
"timing": "post_installation_reimbursement",
"formulaText": "Enhanced Bright Start rebate equals the SVP-approved normal lighting or HVAC retrofit rebate multiplied by the promotional enhancement, described as up to 130% of normal rebate levels.",
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
"SVP-approved lighting retrofit",
"SVP-approved HVAC retrofit"
],
"ineligibleCostCategories": [
"water fixtures",
"unapproved retrofits"
],
"requiredInputs": [
"normal SVP rebate amount",
"approved retrofit type",
"project cost",
"SVP approval",
"facility square footage"
],
"missingInputsForTypicalRetroFiEstimate": [
"normal approved rebate amount",
"project cost",
"SVP approval status"
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
"evidenceText": "SVP states Bright Start offers rebates for facility lighting and HVAC retrofits at promotional levels up to 130% of normal rebates.",
"sourceUrls": [
"[https://www.siliconvalleypower.com/businesses/save-money](https://www.siliconvalleypower.com/businesses/save-money)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "energy_audit",
"action": "move_to_special_workflow",
"reason": "Energy audit is a no-cost technical assistance workflow, not a physical retrofit rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Bright Start references enhanced rebates for facility HVAC retrofits."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Bright Start references enhanced rebates for facility lighting retrofits."
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"action": "delete_bad_edge",
"reason": "The fixture reference is to facility retrofits and lighting, not plumbing or water fixtures."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Enhanced rebate requires SVP review of the underlying lighting or HVAC rebate."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.siliconvalleypower.com/businesses/save-money](https://www.siliconvalleypower.com/businesses/save-money)"
],
"evidenceText": "Bright Start combines non-cash audit and project support with enhanced SVP-approved lighting or HVAC retrofit rebates.",
"reasoningNotes": "No fixed dollar value is published because the rebate depends on the normal SVP rebate calculation and approval.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:building-optimization-rebate",
"opportunityName": "Building Optimization Rebate",
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
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "hybrid_rate_plus_cap",
"timing": "annual",
"formulaText": "Annual rebate equals approved annual kWh savings multiplied by $0.03/kWh, paid over three years and adjusted by measured performance; total is capped at the lesser of 120% of potential incentive or 100% of measure cost.",
"amountCents": null,
"percent": null,
"rate": 0.03,
"rateUnit": "dollars per verified annual kWh",
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
"reprogramming existing HVAC controls",
"calibration of existing BAS or EMS",
"controls adjustments for HVAC energy savings",
"eligible implementation and verification costs"
],
"ineligibleCostCategories": [
"new building automation system installation",
"major controls expansion",
"high-efficiency HVAC equipment replacement",
"water fixtures",
"repair of broken equipment",
"code-required work"
],
"requiredInputs": [
"approved annual kWh savings",
"total measure cost",
"existing BAS or EMS status",
"SVP preapproval",
"post-project measured performance",
"annual commissioning verification"
],
"missingInputsForTypicalRetroFiEstimate": [
"approved annual kWh savings",
"measure cost",
"performance adjustment",
"SVP approval"
],
"rateTable": {
"tableId": "svp_building_optimization_kwh_incentive",
"dimensions": [
"payment year",
"verified performance"
],
"rows": [
{
"payment": "annual payment",
"rate": 0.03,
"rateUnit": "dollars per approved annual kWh savings"
},
{
"payment": "total potential",
"calculation": "annual rebate multiplied by three annual payments"
},
{
"payment": "performance adjustment",
"calculation": "payment may be adjusted from 0% to 120% of approved amount"
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
"evidenceText": "SVP application states the building optimization rebate is $0.03 per annual kWh, paid over three years and capped by measured performance and cost.",
"sourceUrls": [
"[https://www.siliconvalleypower.com/businesses/rebates](https://www.siliconvalleypower.com/businesses/rebates)",
"[https://www.siliconvalleypower.com/home/showpublisheddocument/74366/638868860247070000](https://www.siliconvalleypower.com/home/showpublisheddocument/74366/638868860247070000)",
"[https://www.siliconvalleypower.com/home/showpublisheddocument/77723/638894793575200000](https://www.siliconvalleypower.com/home/showpublisheddocument/77723/638894793575200000)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "building_automation_system",
"action": "move_to_special_workflow",
"reason": "The rebate optimizes an existing BAS controlling HVAC; it does not fund new BAS installation or major expansion."
},
{
"retrofitTypeId": "energy_management_system",
"action": "move_to_special_workflow",
"reason": "The rebate optimizes an existing EMS controlling HVAC; it is an operational optimization workflow."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Source supports controls optimization, not high-efficiency HVAC equipment replacement."
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"action": "delete_bad_edge",
"reason": "No water fixture or plumbing retrofit is supported."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "SVP determines approved savings and measured performance adjustments."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.siliconvalleypower.com/businesses/rebates](https://www.siliconvalleypower.com/businesses/rebates)",
"[https://www.siliconvalleypower.com/home/showpublisheddocument/74366/638868860247070000](https://www.siliconvalleypower.com/home/showpublisheddocument/74366/638868860247070000)",
"[https://www.siliconvalleypower.com/home/showpublisheddocument/77723/638894793575200000](https://www.siliconvalleypower.com/home/showpublisheddocument/77723/638894793575200000)",
"[https://siliconvalleypower2.my.site.com/eo3__PortalRegistrationSelectionV2](https://siliconvalleypower2.my.site.com/eo3__PortalRegistrationSelectionV2)"
],
"evidenceText": "Building Optimization has a published $0.03/kWh formula for existing HVAC controls optimization with measurement and cost caps.",
"reasoningNotes": "Repair reclassifies BAS and EMS from new-equipment retrofits to an existing-controls optimization workflow.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:lighting-rebate",
"opportunityName": "Lighting Rebate",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "medium",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"custom_quote",
"hybrid_rate_plus_cap"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "custom_quote",
"timing": "post_installation_reimbursement",
"formulaText": "SVP Lighting Rebate Calculator determines annual kWh savings, kW reduction and standard or bonus rebate; final rebate is approved by SVP and generally capped at eligible equipment cost unless a limited-time bonus allows more.",
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
"qualified LED fixtures",
"qualified LED retrofit kits",
"qualified LED lamps and tubes",
"qualified exterior lighting",
"qualified networked lighting controls"
],
"ineligibleCostCategories": [
"low-flow plumbing fixtures",
"screw-in bulbs",
"fluorescent products",
"used or rebuilt equipment",
"inventory for resale",
"equipment installed before preapproval"
],
"requiredInputs": [
"SVP calculator output",
"fixture or lamp quantities",
"existing lighting baseline",
"proposed lighting wattage",
"annual operating hours",
"eligible equipment cost",
"exterior lighting status",
"networked lighting controls status",
"preapproval",
"measurement and verification output if required"
],
"missingInputsForTypicalRetroFiEstimate": [
"SVP calculator output",
"baseline wattage",
"proposed wattage",
"operating hours",
"equipment cost",
"bonus eligibility"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "svp_lighting_rebate_calculator_required",
"selectionInput": "lighting calculator and SVP approval",
"rows": [
{
"category": "standard lighting",
"calculation": "calculator-derived rebate"
},
{
"category": "exterior lighting",
"calculation": "calculator-derived standard or bonus rebate if current bonus terms are active"
},
{
"category": "networked lighting controls",
"calculation": "calculator and measurement-based rebate if qualified"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "SVP requires its lighting rebate calculator and preapproval; eligible LEDs and networked controls are supported but no public fixed rate is exposed.",
"sourceUrls": [
"[https://www.siliconvalleypower.com/businesses/rebates](https://www.siliconvalleypower.com/businesses/rebates)",
"[https://www.siliconvalleypower.com/home/showpublisheddocument/41518/638875751693230000](https://www.siliconvalleypower.com/home/showpublisheddocument/41518/638875751693230000)",
"[https://www.siliconvalleypower.com/home/showpublisheddocument/15851/638894798046770000](https://www.siliconvalleypower.com/home/showpublisheddocument/15851/638894798046770000)",
"[https://www.siliconvalleypower.com/home/showpublisheddocument/5082/638917985630870000](https://www.siliconvalleypower.com/home/showpublisheddocument/5082/638917985630870000)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "exterior_site_lighting_retrofit",
"action": "keep",
"reason": "SVP lighting materials include exterior lighting, subject to current bonus and calculator terms."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "SVP lighting rebate supports qualified LED lighting upgrades."
},
{
"retrofitTypeId": "lighting_controls_retrofit",
"action": "keep",
"reason": "SVP materials support qualified networked lighting controls."
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"action": "delete_bad_edge",
"reason": "Fixture refers to lighting fixtures, not plumbing or low-flow water fixtures."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Final incentive is determined by SVP calculator, approval and any current bonus rules."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.siliconvalleypower.com/businesses/rebates](https://www.siliconvalleypower.com/businesses/rebates)",
"[https://www.siliconvalleypower.com/home/showpublisheddocument/41518/638875751693230000](https://www.siliconvalleypower.com/home/showpublisheddocument/41518/638875751693230000)",
"[https://www.siliconvalleypower.com/home/showpublisheddocument/15851/638894798046770000](https://www.siliconvalleypower.com/home/showpublisheddocument/15851/638894798046770000)",
"[https://www.siliconvalleypower.com/home/showpublisheddocument/5082/638917985630870000](https://www.siliconvalleypower.com/home/showpublisheddocument/5082/638917985630870000)"
],
"evidenceText": "Lighting, exterior lighting and networked controls are supported, but the calculator and current post-June 30 bonus terms are required.",
"reasoningNotes": "The base lighting match is valid, but no standalone public per-fixture formula was found outside SVP's calculator workflow.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Limited-time exterior and networked lighting bonus terms referenced June 30, 2026 and should be reverified after that date."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22615",
"opportunityName": "Marin Clean Energy - Feed-In Tariff Plus",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "medium",
"estimateConfidence": "medium",
"cashValueClassifications": [
"tariff_or_rate"
],
"primaryValueModelKinds": [
"tariff_or_rate"
],
"effects": [
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "monthly",
"formulaText": "FIT revenue equals delivered wholesale MWh multiplied by the accepted Feed-In Tariff price in the applicable open capacity block under MCE's standardized PPA.",
"amountCents": null,
"percent": null,
"rate": 60,
"rateUnit": "dollars per MWh",
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": 5,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"wholesale renewable generation output under PPA"
],
"ineligibleCostCategories": [
"behind-the-meter customer rebates",
"standalone battery storage",
"ground-source heat pumps",
"solar water heating",
"net-energy metering projects"
],
"requiredInputs": [
"project technology",
"project MW AC",
"accepted FIT capacity block",
"delivered MWh",
"PPA price",
"interconnection status",
"storage sizing for solar projects"
],
"missingInputsForTypicalRetroFiEstimate": [
"accepted PPA price",
"annual delivered MWh",
"project MW AC",
"technology type",
"interconnection status"
],
"rateTable": {
"tableId": "mce_fit_plus_open_capacity_prices",
"dimensions": [
"condition",
"remaining MW",
"price"
],
"rows": [
{
"condition": "Condition 5",
"remainingCapacityMW": 10.8,
"rate": 60,
"rateUnit": "dollars per MWh"
},
{
"condition": "Condition 6",
"remainingCapacityMW": 5,
"rate": 55,
"rateUnit": "dollars per MWh"
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
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "MCE FIT is a wholesale PPA tariff for 1 to 5 MW local renewable projects; current open blocks list $60/MWh then $55/MWh.",
"sourceUrls": [
"[https://www.mcecleanenergy.org/feed-in-tariff/](https://www.mcecleanenergy.org/feed-in-tariff/)",
"[https://mcecleanenergy.org/feed-in-tariff/](https://mcecleanenergy.org/feed-in-tariff/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "battery_storage_system",
"action": "move_to_special_workflow",
"reason": "Storage is a required paired component for solar FIT projects, not a standalone storage rebate."
},
{
"retrofitTypeId": "biomass_biogas_energy_system",
"action": "keep",
"reason": "Wholesale biomass renewable generation is within the FIT renewable project scope."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "delete_bad_edge",
"reason": "A building geothermal heat pump is not a wholesale renewable electricity PPA project."
},
{
"retrofitTypeId": "solar_water_heating_system",
"action": "delete_bad_edge",
"reason": "Solar thermal water heating is not a wholesale renewable electricity FIT project."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "This is a standardized wholesale PPA tariff, not a customer rebate stack."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.mcecleanenergy.org/feed-in-tariff/](https://www.mcecleanenergy.org/feed-in-tariff/)",
"[https://mcecleanenergy.org/feed-in-tariff/](https://mcecleanenergy.org/feed-in-tariff/)"
],
"evidenceText": "MCE FIT Plus is a wholesale renewable energy procurement tariff, not an upfront storage, geothermal heat pump or solar thermal rebate.",
"reasoningNotes": "Repair treats the value as recurring PPA revenue and removes unsupported building retrofit edges.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3219",
"opportunityName": "Modesto Irrigation District - Commercial New Construction Rebate Program",
"repairStatus": "bad_edge_delete_only",
"calculationStatus": "no_calculable_value",
"sourceConfidence": "medium",
"estimateConfidence": "low",
"cashValueClassifications": [
"unknown"
],
"primaryValueModelKinds": [
"no_calculable_value"
],
"effects": [
{
"effectType": "no_cash_value",
"cashValueClassification": "unknown",
"valueModelKind": "no_calculable_value",
"timing": "unknown",
"formulaText": "No supported value formula is attached to the current target retrofit edges because the official opportunity is a commercial new-construction efficiency path, not standalone existing-building controls, HVAC or refrigeration retrofits.",
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
"standalone existing-building automated demand response controls",
"standalone existing-building energy management systems",
"standalone HVAC replacement",
"standalone refrigeration retrofit"
],
"requiredInputs": [],
"missingInputsForTypicalRetroFiEstimate": [],
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
"evidenceText": "Official MID snippets support a new-construction high-efficiency equipment rebate; accessible source text did not support the target existing-building edges.",
"sourceUrls": [
"[https://www.mid.org/power/new-construction/](https://www.mid.org/power/new-construction/)",
"[https://www.mid.org/saving-energy-money/rebates/business-rebates/](https://www.mid.org/saving-energy-money/rebates/business-rebates/)",
"[https://www.mid.org/saving-energy-money/rebates/rebate-terms-conditions/](https://www.mid.org/saving-energy-money/rebates/rebate-terms-conditions/)",
"[https://www.mid.org/saving-energy-money/rebates/](https://www.mid.org/saving-energy-money/rebates/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "automated_demand_response_controls",
"action": "delete_bad_edge",
"reason": "The current record is a new-construction program and no standalone ADR controls rebate was verified."
},
{
"retrofitTypeId": "energy_management_system",
"action": "delete_bad_edge",
"reason": "No standalone existing-building EMS rebate was verified for this new-construction record."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "No standalone existing-building HVAC replacement rebate was verified under this new-construction opportunity."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "delete_bad_edge",
"reason": "No standalone existing-building refrigeration rebate was verified under this new-construction opportunity."
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
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.mid.org/power/new-construction/](https://www.mid.org/power/new-construction/)",
"[https://www.mid.org/saving-energy-money/rebates/business-rebates/](https://www.mid.org/saving-energy-money/rebates/business-rebates/)",
"[https://www.mid.org/saving-energy-money/rebates/rebate-terms-conditions/](https://www.mid.org/saving-energy-money/rebates/rebate-terms-conditions/)",
"[https://www.mid.org/saving-energy-money/rebates/](https://www.mid.org/saving-energy-money/rebates/)"
],
"evidenceText": "Current target edges should be deleted because the opportunity is a new-construction efficiency path and accessible sources did not support standalone retrofit edges.",
"reasoningNotes": "Official pages were partly access-blocked, so the repair deletes only unsupported retrofit edges and avoids creating a formula.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Full current MID new-construction rebate terms were not accessible in source text."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1429",
"opportunityName": "Pacific Power - wattsmart Business",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"process_value"
],
"primaryValueModelKinds": [
"rate_table",
"hybrid_rate_plus_cap",
"custom_quote",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "Select the California Wattsmart Business table rate by measure; use per-ton, per-kWh or custom review formulas, with applicable project cost and payback caps.",
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
"eligibleCostCategories": [
"eligible LED lighting",
"eligible lighting controls",
"eligible air-source heat pump or PTAC/PTHP equipment",
"custom non-lighting electric efficiency",
"approved energy management services"
],
"ineligibleCostCategories": [
"ground-source geothermal heat pump",
"solar",
"battery storage",
"EV charging",
"code-required lighting controls"
],
"requiredInputs": [
"measure type",
"installed quantity",
"tons",
"annual kWh savings",
"project cost",
"simple payback",
"qualified product status",
"Pacific Power approval"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure type",
"tons or annual kWh savings",
"project cost",
"payback",
"qualified product status"
],
"rateTable": {
"tableId": "pacific_power_ca_wattsmart_business_selected_rates",
"dimensions": [
"measure",
"unit",
"cap"
],
"rows": [
{
"measure": "custom non-lighting",
"rate": 0.15,
"rateUnit": "dollars per annual kWh",
"cap": "80% project cost and one-year simple payback cap"
},
{
"measure": "energy management",
"rate": 0.02,
"rateUnit": "dollars per annual kWh"
},
{
"measure": "energy project manager cofunding",
"rate": 0.025,
"rateUnit": "dollars per verified annual kWh",
"cap": "up to 100% salary and overhead"
},
{
"measure": "interior lighting site-specific custom",
"rate": 0.25,
"rateUnit": "dollars per annual kWh"
},
{
"measure": "interior lighting with advanced controls",
"rate": 0.3,
"rateUnit": "dollars per annual kWh"
},
{
"measure": "exterior lighting site-specific custom",
"rate": 0.15,
"rateUnit": "dollars per annual kWh"
},
{
"measure": "PTAC or PTHP",
"amountCents": 10000,
"unit": "ton"
},
{
"measure": "air-cooled heat pump replacing electric resistance heat",
"amountCents": 30000,
"unit": "ton"
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
"evidenceText": "Pacific Power's California tables publish rates for lighting, air-source heat pumps, PTAC/PTHP, custom efficiency and energy management services.",
"sourceUrls": [
"[https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-california.html](https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-california.html)",
"[https://www.pacificpower.net/content/dam/pcorp/documents/en/pacificpower/savings-energy-choices/wattsmart-business/california/CA_wattsmartBusiness_Definitions_Incentive_Tables_Information.pdf](https://www.pacificpower.net/content/dam/pcorp/documents/en/pacificpower/savings-energy-choices/wattsmart-business/california/CA_wattsmartBusiness_Definitions_Incentive_Tables_Information.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "energy_management_system",
"action": "move_to_special_workflow",
"reason": "California Wattsmart energy management is a services and operational improvement path unless a specific capital control measure is separately approved."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "delete_bad_edge",
"reason": "Current California tables support air-source heat pumps and PTAC/PTHP, not ground-source geothermal heat pumps."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Current California tables include eligible air-source heat pump and PTAC/PTHP incentives."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Current California tables include lighting retrofit incentives."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Lighting and custom incentives are subject to project cost and payback caps in the Wattsmart tables."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-california.html](https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-california.html)",
"[https://www.pacificorp.com/content/dam/pcorp/documents/en/pacificorp/environment/dsm/california/CA_Wattsmart_Business_2025.pdf](https://www.pacificorp.com/content/dam/pcorp/documents/en/pacificorp/environment/dsm/california/CA_Wattsmart_Business_2025.pdf)",
"[https://www.pacificpower.net/content/dam/pcorp/documents/en/pacificpower/savings-energy-choices/wattsmart-business/california/CA_wattsmartBusiness_Definitions_Incentive_Tables_Information.pdf](https://www.pacificpower.net/content/dam/pcorp/documents/en/pacificpower/savings-energy-choices/wattsmart-business/california/CA_wattsmartBusiness_Definitions_Incentive_Tables_Information.pdf)"
],
"evidenceText": "Wattsmart Business supports LED lighting, selected HVAC and energy management services, but not ground-source geothermal heat pumps.",
"reasoningNotes": "Energy management is preserved as a special workflow; geothermal is removed as an unsupported physical edge.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22067",
"opportunityName": "Plumas-Sierra REC - Commercial and Irrigation Rebate Program",
"repairStatus": "source_inaccessible",
"calculationStatus": "source_inaccessible_repair_failure",
"sourceConfidence": "medium",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate",
"unknown"
],
"primaryValueModelKinds": [
"source_inaccessible"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "source_inaccessible",
"timing": "post_installation_reimbursement",
"formulaText": "Official snippets identify commercial HVAC, lighting and heat pump water heater rebate pages, including a commercial heat pump water heater snippet at $1,500 per unit, but full current forms were inaccessible and should not be auto-estimated.",
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
"commercial heat pump water heater",
"commercial HVAC equipment",
"commercial lighting",
"custom commercial energy efficiency"
],
"ineligibleCostCategories": [
"residential-only rebate forms",
"unsupported irrigation pump assumptions"
],
"requiredInputs": [
"current PSREC rebate form",
"equipment type",
"unit quantity",
"project cost",
"commercial or irrigation account status",
"installation documentation"
],
"missingInputsForTypicalRetroFiEstimate": [
"current form amount",
"measure tier",
"project cost",
"documentation requirements"
],
"rateTable": {
"tableId": "psrec_official_snippet_only_values",
"dimensions": [
"measure",
"source accessibility"
],
"rows": [
{
"measure": "commercial heat pump water heater",
"amountCents": 150000,
"unit": "unit",
"sourceNote": "official search snippet only; full page inaccessible"
},
{
"measure": "commercial HVAC",
"amountCents": null,
"sourceNote": "official page identified but rate inaccessible"
},
{
"measure": "commercial lighting",
"amountCents": null,
"sourceNote": "official page identified but rate inaccessible"
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
"probabilityEvidenceType": "none"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Official PSREC pages were present in snippets but returned inaccessible; only the commercial HPWH $1,500 snippet exposed a value.",
"sourceUrls": [
"[https://www.psrec.coop/energy-solutions/rebates/](https://www.psrec.coop/energy-solutions/rebates/)",
"[https://www.psrec.coop/energy-solutions/rebates/commercial-heating-cooling-rebates/](https://www.psrec.coop/energy-solutions/rebates/commercial-heating-cooling-rebates/)",
"[https://www.psrec.coop/energy-solutions/rebates/commercial-heat-pump-water-heater-rebate/](https://www.psrec.coop/energy-solutions/rebates/commercial-heat-pump-water-heater-rebate/)",
"[https://www.psrec.coop/energy-solutions/rebates/commercial-lighting-rebate/](https://www.psrec.coop/energy-solutions/rebates/commercial-lighting-rebate/)",
"[https://www.psrec.coop/energy-solutions/rebates/commercial-kitchen-food-service-equipment-rebate/](https://www.psrec.coop/energy-solutions/rebates/commercial-kitchen-food-service-equipment-rebate/)",
"[https://www.psrec.coop/energy-solutions/rebates/commercial-custom-project-rebate/](https://www.psrec.coop/energy-solutions/rebates/commercial-custom-project-rebate/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "needs_review",
"reason": "Official commercial HVAC rebate page is identified, but current rate terms were inaccessible."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "needs_review",
"reason": "Official snippet supports a commercial heat pump water heater rebate, but full current form should be reviewed."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "needs_review",
"reason": "Official commercial heating and cooling page exists, but current eligible HVAC categories and rates were inaccessible."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "needs_review",
"reason": "Official commercial lighting page exists, but current lighting rates were inaccessible."
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
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.psrec.coop/energy-solutions/rebates/](https://www.psrec.coop/energy-solutions/rebates/)",
"[https://www.psrec.coop/energy-solutions/rebates/commercial-heating-cooling-rebates/](https://www.psrec.coop/energy-solutions/rebates/commercial-heating-cooling-rebates/)",
"[https://www.psrec.coop/energy-solutions/rebates/commercial-heat-pump-water-heater-rebate/](https://www.psrec.coop/energy-solutions/rebates/commercial-heat-pump-water-heater-rebate/)",
"[https://www.psrec.coop/energy-solutions/rebates/commercial-lighting-rebate/](https://www.psrec.coop/energy-solutions/rebates/commercial-lighting-rebate/)",
"[https://www.psrec.coop/energy-solutions/rebates/commercial-kitchen-food-service-equipment-rebate/](https://www.psrec.coop/energy-solutions/rebates/commercial-kitchen-food-service-equipment-rebate/)",
"[https://www.psrec.coop/energy-solutions/rebates/commercial-custom-project-rebate/](https://www.psrec.coop/energy-solutions/rebates/commercial-custom-project-rebate/)"
],
"evidenceText": "Commercial categories appear supported by official snippets, but current forms were inaccessible and should not drive automatic estimates.",
"reasoningNotes": "Retain only as needs-review edges because official category support exists but source access prevents formula repair.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Full PSREC commercial rebate pages returned access errors.",
"Current commercial HVAC and lighting rates were not readable."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4342",
"opportunityName": "(Electric and Gas)  Residential New Construction Program",
"repairStatus": "bad_edge_delete_only",
"calculationStatus": "no_calculable_value",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"no_calculable_value"
],
"effects": [
{
"effectType": "no_cash_value",
"cashValueClassification": "rebate",
"valueModelKind": "no_calculable_value",
"timing": "unknown",
"formulaText": "No target retrofit formula should be created because the current opportunity is a whole-home all-electric new construction or gut-rehab HERS path, not a standalone heat pump, geothermal or insulation retrofit rebate.",
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
"whole-home new construction efficiency path"
],
"ineligibleCostCategories": [
"standalone heat pump retrofit",
"standalone geothermal heat pump retrofit",
"standalone HVAC replacement",
"standalone insulation retrofit"
],
"requiredInputs": [],
"missingInputsForTypicalRetroFiEstimate": [],
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
"evidenceText": "Energize CT describes a whole-home all-electric new construction and gut-rehab path requiring HERS rating and application before insulation.",
"sourceUrls": [
"[https://www.energizect.com/explore-solutions/new-construction-building-efficiency/new-home-construction](https://www.energizect.com/explore-solutions/new-construction-building-efficiency/new-home-construction)",
"[https://www.energizect.com/media/14596/download?inline=](https://www.energizect.com/media/14596/download?inline=)",
"[https://energizect.com/your-home/solutions-list/residential-new-construction-program](https://energizect.com/your-home/solutions-list/residential-new-construction-program)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "delete_bad_edge",
"reason": "Geothermal is only a component that may appear in whole-home new construction documentation, not a standalone retrofit rebate here."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "delete_bad_edge",
"reason": "The program is a whole-home new construction or gut-rehab pathway, not a standalone heat pump retrofit rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "The source does not support standalone HVAC replacement under this new-construction record."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "delete_bad_edge",
"reason": "Insulation timing is an application requirement and construction component, not a standalone insulation retrofit rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Residential New Construction rebates may not be combined with certain other utility energy service offers."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "Application must be submitted before insulation.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.energizect.com/explore-solutions/new-construction-building-efficiency/new-home-construction](https://www.energizect.com/explore-solutions/new-construction-building-efficiency/new-home-construction)",
"[https://www.energizect.com/media/14596/download?inline=](https://www.energizect.com/media/14596/download?inline=)",
"[https://energizect.com/your-home/solutions-list/residential-new-construction-program](https://energizect.com/your-home/solutions-list/residential-new-construction-program)"
],
"evidenceText": "All target retrofit edges are false positives for a whole-home new construction and significant rehabilitation program.",
"reasoningNotes": "Do not attach existing-home retrofit formulas to this RNC opportunity.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22766",
"opportunityName": "EV Charging Program",
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
"tariff_or_rate"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "hybrid_rate_plus_cap",
"timing": "post_installation_reimbursement",
"formulaText": "Commercial incentive is the lesser of 50% of eligible EVSE costs plus 100% of eligible make-ready costs, or the applicable per-site cap by charger type and underserved status.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 25000000,
"caps": {
"maxAwardCents": 25000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": 25000000,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"eligible EVSE equipment costs",
"eligible make-ready design and engineering",
"eligible permits",
"eligible labor and materials",
"eligible trenching and concrete",
"utility-side and customer-side make-ready as approved"
],
"ineligibleCostCategories": [
"co-located distributed generation",
"co-located battery storage",
"unapproved ancillary work",
"work begun before approval"
],
"requiredInputs": [
"utility",
"site type",
"charger type",
"number of ports",
"underserved community status",
"eligible EVSE cost",
"eligible make-ready cost",
"service upgrade status",
"approval or reservation letter"
],
"missingInputsForTypicalRetroFiEstimate": [
"EVSE cost",
"make-ready cost",
"charger type",
"port count",
"site cap category",
"approval status"
],
"rateTable": {
"tableId": "ct_ev_charging_commercial_caps",
"dimensions": [
"site category",
"charger type",
"underserved status"
],
"rows": [
{
"category": "baseline",
"chargerType": "Level 2",
"maxAmountCents": 2000000,
"minimumPorts": 2
},
{
"category": "baseline",
"chargerType": "DC fast charger",
"maxAmountCents": 15000000
},
{
"category": "underserved",
"chargerType": "Level 2",
"maxAmountCents": 4000000,
"minimumPorts": 2
},
{
"category": "underserved",
"chargerType": "DC fast charger",
"maxAmountCents": 25000000
},
{
"category": "residential single-family",
"chargerType": "Level 2 charger, wiring or both",
"maxAmountCents": 100000
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
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Connecticut's commercial guide supports 50% EVSE plus 100% make-ready incentives with Level 2 and DCFC site caps.",
"sourceUrls": [
"[https://portal.ct.gov/pura/electric/office-of-technical-and-regulatory-analysis/clean-energy-programs/electric-vehicle-charging-program](https://portal.ct.gov/pura/electric/office-of-technical-and-regulatory-analysis/clean-energy-programs/electric-vehicle-charging-program)",
"[https://www.eversource.com/content/docs/default-source/save-money-energy/ct-ev-program-guide-commercial.pdf?sfvrsn=e2898262_6](https://www.eversource.com/content/docs/default-source/save-money-energy/ct-ev-program-guide-commercial.pdf?sfvrsn=e2898262_6)",
"[https://www.uinet.com/w/find-the-best-electric-vehicle-charging-options-for-your-business](https://www.uinet.com/w/find-the-best-electric-vehicle-charging-options-for-your-business)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "annual",
"formulaText": "Managed-charging value is paid only for eligible enrolled customers and varies by track, with residential baseline and advanced annual incentives stated by utility program rules.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 30000,
"caps": {
"maxAwardCents": 30000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": 30000,
"programBudgetCents": null
},
"eligibleCostCategories": [
"managed charging enrollment"
],
"ineligibleCostCategories": [
"unenrolled charging",
"non-networked equipment where networking is required"
],
"requiredInputs": [
"managed charging track",
"charger network status",
"utility",
"customer class",
"annual enrollment compliance"
],
"missingInputsForTypicalRetroFiEstimate": [
"managed charging track",
"utility",
"equipment enrollment"
],
"rateTable": {
"tableId": "ct_ev_managed_charging_selected_values",
"dimensions": [
"track",
"timing"
],
"rows": [
{
"track": "residential baseline managed charging",
"maxAmountCents": 12000,
"unit": "year"
},
{
"track": "residential advanced managed charging",
"maxAmountCents": 30000,
"unit": "year"
},
{
"track": "multi-unit dwelling off-peak",
"amountCents": 5000,
"unit": "upfront"
},
{
"track": "multi-unit dwelling off-peak",
"amountCents": 1000,
"unit": "month"
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
"evidenceText": "PURA materials identify managed-charging incentives as a separate recurring program component.",
"sourceUrls": [
"[https://portal.ct.gov/pura/electric/office-of-technical-and-regulatory-analysis/clean-energy-programs/electric-vehicle-charging-program](https://portal.ct.gov/pura/electric/office-of-technical-and-regulatory-analysis/clean-energy-programs/electric-vehicle-charging-program)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "dc_fast_charger_installation",
"action": "keep",
"reason": "Commercial DCFC incentives and caps are published."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "The program covers eligible EVSE and charging infrastructure."
},
{
"retrofitTypeId": "ev_make_ready_electrical_upgrade",
"action": "keep",
"reason": "Eligible make-ready costs may be reimbursed up to 100% subject to caps."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Level 2 incentives and caps are published for commercial and residential tracks."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Commercial rebate amounts are limited by eligible-cost shares and site caps."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "DCFC application windows are periodic and should be verified for the current program year.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://portal.ct.gov/pura/electric/office-of-technical-and-regulatory-analysis/clean-energy-programs/electric-vehicle-charging-program](https://portal.ct.gov/pura/electric/office-of-technical-and-regulatory-analysis/clean-energy-programs/electric-vehicle-charging-program)",
"[https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/ct](https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/ct)",
"[https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/connecticut-ev-program-changes](https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/connecticut-ev-program-changes)",
"[https://www.uinet.com/w/find-the-best-electric-vehicle-charging-options-for-your-business](https://www.uinet.com/w/find-the-best-electric-vehicle-charging-options-for-your-business)",
"[https://www.uinet.com/single-family-residential-level-2-charging](https://www.uinet.com/single-family-residential-level-2-charging)",
"[https://www.eversource.com/content/docs/default-source/save-money-energy/ct-ev-program-guide-commercial.pdf?sfvrsn=e2898262_6](https://www.eversource.com/content/docs/default-source/save-money-energy/ct-ev-program-guide-commercial.pdf?sfvrsn=e2898262_6)"
],
"evidenceText": "Connecticut EV charging has source-backed EVSE, make-ready, Level 2, DCFC and managed-charging value rules.",
"reasoningNotes": "Commercial incentives are calculable after site cost and cap inputs; recurring managed charging is separate from hardware installation.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22624",
"opportunityName": "Duke Energy Florida - Commercial Charger Rebate",
"repairStatus": "source_inaccessible",
"calculationStatus": "source_inaccessible_repair_failure",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"source_inaccessible",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "source_inaccessible",
"timing": "post_installation_reimbursement",
"formulaText": "Official Duke Energy Florida materials confirm a one-time Charger Prep Credit for eligible plug-in outlets, wiring improvements and electrical upgrades needed for Level 2 or higher EV chargers, but no accessible official amount or reusable formula was found.",
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
"new plug-in outlets",
"wiring improvements",
"electrical upgrades required for Level 2 or higher charging"
],
"ineligibleCostCategories": [
"charger hardware",
"charger software",
"permit fees",
"refrigeration equipment"
],
"requiredInputs": [
"Duke Energy Florida business account",
"charger type",
"eligible wiring or electrical upgrade scope",
"make-ready cost",
"Duke approval",
"installation documentation"
],
"missingInputsForTypicalRetroFiEstimate": [
"credit amount",
"eligible make-ready cost",
"charger type",
"Duke approval status"
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
"evidenceText": "Duke confirms the credit covers wiring, outlets and electrical upgrades for Level 2 or higher chargers, but not charger hardware or permit fees.",
"sourceUrls": [
"[https://investors.duke-energy.com/news/news-details/2025/New-Duke-Energy-programs-offer-Florida-customers-more-choices-related-to-electric-vehicles/default.aspx](https://investors.duke-energy.com/news/news-details/2025/New-Duke-Energy-programs-offer-Florida-customers-more-choices-related-to-electric-vehicles/default.aspx)",
"[https://www.duke-energy.com/business/products/ev-complete/charger-prep-credit](https://www.duke-energy.com/business/products/ev-complete/charger-prep-credit)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "dc_fast_charger_installation",
"action": "keep",
"reason": "Level 2 or higher charger prep infrastructure can include infrastructure supporting DC fast charging, but not charger hardware."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "move_to_special_workflow",
"reason": "The value is for charger-prep infrastructure, not the EV charger hardware itself."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "delete_bad_edge",
"reason": "This EV charger-prep credit has no refrigeration equipment incentive."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "The credit supports infrastructure required for Level 2 or higher charging."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Credit excludes charger hardware, charger software and permit fees."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://investors.duke-energy.com/news/news-details/2025/New-Duke-Energy-programs-offer-Florida-customers-more-choices-related-to-electric-vehicles/default.aspx](https://investors.duke-energy.com/news/news-details/2025/New-Duke-Energy-programs-offer-Florida-customers-more-choices-related-to-electric-vehicles/default.aspx)",
"[https://www.duke-energy.com/business/products/ev-complete/charger-prep-credit](https://www.duke-energy.com/business/products/ev-complete/charger-prep-credit)"
],
"evidenceText": "The opportunity is real as EV charger-prep support, but the current official amount was not accessible.",
"reasoningNotes": "Repair narrows the value to make-ready infrastructure and deletes the refrigeration false edge.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Official business charger-prep credit page did not expose a current amount or formula in accessible source text."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3355",
"opportunityName": "Tampa Electric - Commercial Energy Efficiency Rebate Programs",
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
"per_unit_award",
"custom_quote",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "per_unit_award",
"timing": "post_installation_reimbursement",
"formulaText": "Variable frequency drive and motor controls rebate equals controlled motor horsepower multiplied by $75 per horsepower for eligible Tampa Electric commercial projects.",
"amountCents": null,
"percent": null,
"rate": 75,
"rateUnit": "dollars per controlled horsepower",
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
"eligible variable frequency drive",
"eligible variable speed drive",
"eligible motor controls for qualifying commercial equipment"
],
"ineligibleCostCategories": [
"ended cooling rebates",
"ended chiller rebates",
"ended facility energy management program",
"on-site generation",
"water conservation",
"operational-only custom changes"
],
"requiredInputs": [
"controlled motor horsepower",
"equipment controlled",
"motor efficiency",
"licensed contractor information",
"detailed proposal",
"paid invoice",
"equipment photos",
"commercial account"
],
"missingInputsForTypicalRetroFiEstimate": [
"controlled horsepower",
"equipment type",
"invoice",
"eligibility documentation"
],
"rateTable": {
"tableId": "tampa_electric_vfd_motor_controls",
"dimensions": [
"measure",
"unit"
],
"rows": [
{
"measure": "variable frequency drive or motor controls",
"rate": 75,
"rateUnit": "dollars per controlled horsepower"
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
"evidenceText": "Tampa Electric's current VFD page states a $75 per horsepower rebate for eligible commercial motor controls.",
"sourceUrls": [
"[https://www.tampaelectric.com/business/saveenergy/](https://www.tampaelectric.com/business/saveenergy/)",
"[https://www.tampaelectric.com/business/saveenergy/variablefrequencydriveandmotorcontrols/](https://www.tampaelectric.com/business/saveenergy/variablefrequencydriveandmotorcontrols/)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "technical_assistance",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Tampa Electric commercial audits provide no-cash-value assistance and should not be converted to a dollar rebate without a separate published incentive.",
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
"energy audit assistance"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"audit request",
"commercial account"
],
"missingInputsForTypicalRetroFiEstimate": [],
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
"evidenceText": "The audit component is assistance, not a cash rebate formula.",
"sourceUrls": [
"[https://www.tampaelectric.com/business/saveenergy/](https://www.tampaelectric.com/business/saveenergy/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "energy_audit",
"action": "move_to_special_workflow",
"reason": "Energy audits are assistance workflows, not physical retrofit rebate measures."
},
{
"retrofitTypeId": "energy_management_system",
"action": "delete_bad_edge",
"reason": "Facility energy management is listed as ended for new applications and is not a current EMS rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Cooling and chiller rebate programs have ended for new applications."
},
{
"retrofitTypeId": "variable_frequency_drive_retrofit",
"action": "keep",
"reason": "Current VFD and motor controls program publishes a $75 per horsepower rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Custom projects require prequalification and cannot reduce payback below program limits."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.tampaelectric.com/business/saveenergy/](https://www.tampaelectric.com/business/saveenergy/)",
"[https://www.tampaelectric.com/business/saveenergy/variablefrequencydriveandmotorcontrols/](https://www.tampaelectric.com/business/saveenergy/variablefrequencydriveandmotorcontrols/)",
"[https://www.tampaelectric.com/business/saveenergy/customenergyefficiency/](https://www.tampaelectric.com/business/saveenergy/customenergyefficiency/)"
],
"evidenceText": "The current calculable rule is VFD at $75 per controlled horsepower; stale EMS and HVAC/chiller edges should be removed.",
"reasoningNotes": "The custom demand reduction path remains project-specific and is not used for the target's stale HVAC and EMS edges.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2665",
"opportunityName": "Clark County REMC - Energy Efficiency Rebate Program",
"repairStatus": "source_inaccessible",
"calculationStatus": "source_inaccessible_repair_failure",
"sourceConfidence": "medium",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"source_inaccessible",
"fixed_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "source_inaccessible",
"timing": "post_purchase_rebate",
"formulaText": "Official snippets identify heat pump, geothermal, ductless mini-split, dual-fuel heat pump and heat pump water heater rebates; the HPWH snippet shows $500, but current HVAC amounts were inaccessible.",
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
"air-source heat pump",
"ground-source geothermal heat pump",
"ductless mini-split heat pump",
"dual-fuel heat pump",
"heat pump water heater"
],
"ineligibleCostCategories": [
"broad non-heat-pump HVAC replacement",
"commercial measures",
"lighting",
"refrigeration"
],
"requiredInputs": [
"member account",
"equipment category",
"equipment cost",
"installation date",
"current rebate form",
"AHRI or efficiency documentation",
"invoice"
],
"missingInputsForTypicalRetroFiEstimate": [
"current HVAC rebate amount",
"equipment tier",
"equipment cost",
"installation date"
],
"rateTable": {
"tableId": "clark_remc_official_snippet_only_values",
"dimensions": [
"measure",
"source accessibility"
],
"rows": [
{
"measure": "heat pump water heater",
"amountCents": 50000,
"unit": "unit",
"sourceNote": "official snippet only"
},
{
"measure": "air-source heat pump",
"amountCents": null,
"sourceNote": "official page identified but rate inaccessible"
},
{
"measure": "ground-source geothermal heat pump",
"amountCents": null,
"sourceNote": "official page identified but rate inaccessible"
},
{
"measure": "ductless mini-split heat pump",
"amountCents": null,
"sourceNote": "official page identified but rate inaccessible"
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
"probabilityEvidenceType": "none"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Official snippets support heat pump and HPWH rebate categories, but full current pages were inaccessible; HPWH snippet shows $500.",
"sourceUrls": [
"[https://www.clarkremc.coop/energy-efficiency/rebates/](https://www.clarkremc.coop/energy-efficiency/rebates/)",
"[https://www.clarkremc.coop/energy-efficiency/rebates/hvac-rebates/](https://www.clarkremc.coop/energy-efficiency/rebates/hvac-rebates/)",
"[https://www.clarkremc.coop/energy-efficiency/rebates/water-heaters/](https://www.clarkremc.coop/energy-efficiency/rebates/water-heaters/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "needs_review",
"reason": "Official snippets identify geothermal heat pump rebates, but current value table was inaccessible."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "needs_review",
"reason": "Official snippets identify heat pump rebates, but current value table was inaccessible."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "needs_review",
"reason": "Official snippet supports a heat pump water heater rebate, with $500 shown, but full form should be reviewed."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "needs_review",
"reason": "Keep only when narrowed to an eligible heat pump category; broad HVAC replacement is unsupported."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Official snippets reference a 50% equipment cost cap and application timing."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "Official snippets reference submission within 90 days and the same calendar year.",
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.clarkremc.coop/energy-efficiency/rebates/](https://www.clarkremc.coop/energy-efficiency/rebates/)",
"[https://www.clarkremc.coop/energy-efficiency/rebates/hvac-rebates/](https://www.clarkremc.coop/energy-efficiency/rebates/hvac-rebates/)",
"[https://www.clarkremc.coop/energy-efficiency/rebates/water-heaters/](https://www.clarkremc.coop/energy-efficiency/rebates/water-heaters/)"
],
"evidenceText": "Clark REMC categories are supported by official snippets, but full current rebate tables were inaccessible.",
"reasoningNotes": "Do not compute HVAC/geothermal amounts automatically until the current REMC form is reviewed.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Official Clark County REMC rebate pages were access-blocked.",
"Current HVAC and geothermal rebate amounts were not readable."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2297",
"opportunityName": "Duke Energy - Commercial Energy Efficiency Rebate Program",
"repairStatus": "source_inaccessible",
"calculationStatus": "source_inaccessible_repair_failure",
"sourceConfidence": "medium",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate",
"unknown"
],
"primaryValueModelKinds": [
"source_inaccessible",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "source_inaccessible",
"timing": "post_installation_reimbursement",
"formulaText": "Official Duke Smart Saver Business snippets identify Indiana incentives for lighting, HVAC, chiller, commercial, industrial, agricultural and custom measures, but current rate tables were not accessible enough to calculate a value.",
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
"qualified business lighting",
"qualified business HVAC",
"qualified chiller",
"custom energy efficiency measures"
],
"ineligibleCostCategories": [
"unsupported refrigeration edge",
"unsupported insulation edge",
"residential Smart Saver rebates",
"EV charging",
"solar"
],
"requiredInputs": [
"jurisdiction IN01",
"equipment type",
"quantity",
"tons or capacity where applicable",
"project cost",
"Duke application approval",
"current rebate table"
],
"missingInputsForTypicalRetroFiEstimate": [
"current Duke Indiana rebate rate",
"measure tier",
"quantity",
"project cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "duke_indiana_smartsaver_business_access_limited",
"selectionInput": "current Duke Smart Saver rebate selector or application assistance",
"rows": [
{
"category": "lighting",
"calculation": "current Duke rate table required"
},
{
"category": "HVAC",
"calculation": "current Duke rate table required"
},
{
"category": "custom",
"calculation": "Duke review and approval required"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "none"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Official Duke snippets support business lighting and HVAC categories, but accessible current rate data was insufficient for a formula.",
"sourceUrls": [
"[https://www.duke-energy.com/business/products/smartsaver](https://www.duke-energy.com/business/products/smartsaver)",
"[https://www.duke-energy.com/business/products/smartsaver/application-question](https://www.duke-energy.com/business/products/smartsaver/application-question)",
"[https://www.duke-energy.com/business/products/smartsaver/application-calculation-assistance?jur=IN01](https://www.duke-energy.com/business/products/smartsaver/application-calculation-assistance?jur=IN01)",
"[https://www.duke-energy.com/business/products/smartsaver/all-smartsaver-rebates?jur=IN01](https://www.duke-energy.com/business/products/smartsaver/all-smartsaver-rebates?jur=IN01)",
"[https://www.duke-energy.com/business/products/smartsaver/hvac-incentives](https://www.duke-energy.com/business/products/smartsaver/hvac-incentives)",
"[https://www.duke-energy.com/business/products/smartsaver/chiller](https://www.duke-energy.com/business/products/smartsaver/chiller)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "needs_review",
"reason": "Official snippets support business HVAC incentives, but current Indiana rates were inaccessible."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "delete_bad_edge",
"reason": "Accessible current Duke Indiana materials did not support a refrigeration edge for this record."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "delete_bad_edge",
"reason": "Accessible current Duke Indiana materials did not support an insulation edge for this business record."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "needs_review",
"reason": "Official snippets support business lighting incentives, but current Indiana rates were inaccessible."
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
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.duke-energy.com/business/products/smartsaver](https://www.duke-energy.com/business/products/smartsaver)",
"[https://www.duke-energy.com/business/products/smartsaver/application-question](https://www.duke-energy.com/business/products/smartsaver/application-question)",
"[https://www.duke-energy.com/business/products/smartsaver/application-calculation-assistance?jur=IN01](https://www.duke-energy.com/business/products/smartsaver/application-calculation-assistance?jur=IN01)",
"[https://www.duke-energy.com/business/products/smartsaver/all-smartsaver-rebates?jur=IN01](https://www.duke-energy.com/business/products/smartsaver/all-smartsaver-rebates?jur=IN01)",
"[https://www.duke-energy.com/business/products/smartsaver/hvac-incentives](https://www.duke-energy.com/business/products/smartsaver/hvac-incentives)",
"[https://www.duke-energy.com/business/products/smartsaver/chiller](https://www.duke-energy.com/business/products/smartsaver/chiller)"
],
"evidenceText": "Duke Indiana Smart Saver appears active for lighting and HVAC, but rate-table access was insufficient for an automatic estimate.",
"reasoningNotes": "Unsupported refrigeration and insulation are deleted; supported categories are needs-review until current Duke rate tables are available.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Current Duke Indiana Smart Saver Business rate table was not accessible.",
"Supported categories need measure-level confirmation before estimating."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2664",
"opportunityName": "RushShelby Energy - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "medium",
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
"formulaText": "Select the RushShelby residential equipment rebate by category and heat-pump tier; official snippets list geothermal at $2,000, heat pump tiers at $300, $400 or $500, and heat pump water heater at $500.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 30000,
"maxAmountCents": 200000,
"caps": {
"maxAwardCents": 200000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"geothermal heat pump",
"air-source heat pump",
"dual-fuel heat pump",
"mini-split heat pump",
"heat pump water heater"
],
"ineligibleCostCategories": [
"commercial HVAC",
"commercial water heating",
"non-listed generic HVAC equipment"
],
"requiredInputs": [
"member account",
"equipment category",
"heat pump tier",
"invoice",
"AHRI or efficiency documentation",
"installation date",
"current rebate form"
],
"missingInputsForTypicalRetroFiEstimate": [
"equipment category",
"heat pump tier",
"current form confirmation",
"installation documentation"
],
"rateTable": {
"tableId": "rushshelby_residential_rebate_snippet_values",
"dimensions": [
"measure",
"tier"
],
"rows": [
{
"measure": "geothermal heat pump",
"amountCents": 200000,
"unit": "system"
},
{
"measure": "air-source or dual-fuel heat pump",
"tier": "Tier 1",
"amountCents": 30000,
"unit": "system"
},
{
"measure": "air-source or dual-fuel heat pump",
"tier": "Tier 2",
"amountCents": 40000,
"unit": "system"
},
{
"measure": "air-source or dual-fuel heat pump",
"tier": "Tier 3",
"amountCents": 50000,
"unit": "system"
},
{
"measure": "heat pump water heater",
"amountCents": 50000,
"unit": "unit"
},
{
"measure": "Wi-Fi enabled electric storage water heater",
"amountCents": 20000,
"unit": "unit"
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
"evidenceText": "Official snippets list RushShelby geothermal, heat pump tier and heat pump water heater amounts, but full pages were not fully readable.",
"sourceUrls": [
"[https://www.rse.coop/energy-savings/rebates/residential/](https://www.rse.coop/energy-savings/rebates/residential/)",
"[https://www.rse.coop/energy-savings/rebates/residential/residential-equipment-rebate-form/](https://www.rse.coop/energy-savings/rebates/residential/residential-equipment-rebate-form/)",
"[https://www.rse.coop/energy-savings/rebates/residential/hvac-rebate-request-form/](https://www.rse.coop/energy-savings/rebates/residential/hvac-rebate-request-form/)",
"[https://www.rse.coop/energy-savings/rebates/residential/rebate-request-form/](https://www.rse.coop/energy-savings/rebates/residential/rebate-request-form/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "Official snippets list a geothermal heat pump rebate."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Official snippets list air-source, dual-fuel and mini-split heat pump rebates."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Official snippets list a heat pump water heater rebate."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only when narrowed to an eligible heat pump category; broad non-heat-pump HVAC is unsupported."
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
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.rse.coop/energy-savings/rebates/residential/](https://www.rse.coop/energy-savings/rebates/residential/)",
"[https://www.rse.coop/energy-savings/rebates/residential/residential-equipment-rebate-form/](https://www.rse.coop/energy-savings/rebates/residential/residential-equipment-rebate-form/)"
],
"evidenceText": "RushShelby heat pump, geothermal and HPWH values are source-backed from official snippets, with current-form verification still recommended.",
"reasoningNotes": "Values are kept with medium confidence because official pages were difficult to fully open but official snippets exposed rates.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Full current RushShelby rebate form should be checked before payment matching."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3573",
"opportunityName": "Southeastern Indiana REMC - Residential Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"fixed_tier_amount",
"capped_percent_of_eligible_cost"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_tier_amount",
"timing": "post_purchase_rebate",
"formulaText": "Use the current SEIREMC 2026 equipment form to select the heat pump or water-heater amount; published materials show geothermal up to $2,000 and other residential HVAC or HPWH rebates up to $500, capped at 50% of equipment cost.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 200000,
"caps": {
"maxAwardCents": 200000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.5,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"air-source heat pump",
"dual-fuel heat pump",
"ductless mini-split heat pump",
"geothermal heat pump",
"heat pump water heater",
"eligible electric water heater"
],
"ineligibleCostCategories": [
"non-electric fuel water heaters",
"commercial projects",
"non-listed generic HVAC equipment"
],
"requiredInputs": [
"member account",
"equipment category",
"current 2026 form tier",
"equipment cost",
"SEER2 or AHRI data",
"invoice",
"installation date",
"primary residence status"
],
"missingInputsForTypicalRetroFiEstimate": [
"exact 2026 form tier",
"equipment cost",
"AHRI data",
"installation date"
],
"rateTable": {
"tableId": "seiremc_2026_residential_rebate_caps",
"dimensions": [
"measure",
"cap"
],
"rows": [
{
"measure": "geothermal heat pump",
"maxAmountCents": 200000,
"cap": "not more than 50% of equipment cost"
},
{
"measure": "air-source or dual-fuel heat pump",
"maxAmountCents": 50000,
"cap": "not more than 50% of equipment cost"
},
{
"measure": "mini-split heat pump",
"maxAmountCents": 50000,
"cap": "not more than 50% of equipment cost"
},
{
"measure": "heat pump water heater",
"maxAmountCents": 50000,
"cap": "not more than 50% of equipment cost"
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
"evidenceText": "SEIREMC pages and forms support heat pump, geothermal and water-heater rebates with 2026 form requirements and a 50% equipment cost cap.",
"sourceUrls": [
"[https://www.seiremc.com/rebates](https://www.seiremc.com/rebates)",
"[https://www.seiremc.com/airsourceheatpumprebate](https://www.seiremc.com/airsourceheatpumprebate)",
"[https://www.seiremc.com/minisplitheatpumprebate](https://www.seiremc.com/minisplitheatpumprebate)",
"[https://www.seiremc.com/geothermalheatpumprebate](https://www.seiremc.com/geothermalheatpumprebate)",
"[https://www.seiremc.com/waterheaterrebate](https://www.seiremc.com/waterheaterrebate)",
"[https://www.seiremc.com/forms](https://www.seiremc.com/forms)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "keep",
"reason": "SEIREMC lists a geothermal heat pump rebate."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "SEIREMC lists air-source, dual-fuel and mini-split heat pump rebates."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "SEIREMC lists water heater rebates including heat pump water heaters."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only when the replacement is a qualifying heat pump category."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Incentive cannot exceed 50% of equipment cost."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "Submit within 90 days and in the same calendar year; 2026 forms apply December 12, 2025 through December 11, 2026.",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.seiremc.com/rebates](https://www.seiremc.com/rebates)",
"[https://www.seiremc.com/airsourceheatpumprebate](https://www.seiremc.com/airsourceheatpumprebate)",
"[https://www.seiremc.com/minisplitheatpumprebate](https://www.seiremc.com/minisplitheatpumprebate)",
"[https://www.seiremc.com/geothermalheatpumprebate](https://www.seiremc.com/geothermalheatpumprebate)",
"[https://www.seiremc.com/waterheaterrebate](https://www.seiremc.com/waterheaterrebate)"
],
"evidenceText": "SEIREMC heat pump and water-heater categories are supported; exact payment requires the current 2026 form tier and equipment cost.",
"reasoningNotes": "Broad high-efficiency HVAC is narrowed to eligible heat pump products.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22695",
"opportunityName": "Louisville Gas and Electric and Kentucky Utilities – WeCare for Homeowners and Renters",
"repairStatus": "non_monetary_workflow",
"calculationStatus": "non_monetary_workflow",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"non_cash",
"technical_assistance",
"process_value",
"reimbursement"
],
"primaryValueModelKinds": [
"non_cash_process_value",
"capped_percent_of_eligible_cost"
],
"effects": [
{
"effectType": "process_value",
"cashValueClassification": "non_cash",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Qualified homeowner or renter participants receive no-additional-cost energy education, audit and direct-installed weatherization or efficiency measures as determined by assessment; no customer cash payout formula is published.",
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
"energy audit",
"energy education",
"LED lighting",
"thermostats",
"low-flow water devices",
"weatherization",
"air sealing",
"duct sealing",
"insulation where assessment approves"
],
"ineligibleCostCategories": [
"doors",
"windows",
"unapproved commercial properties",
"broad HVAC replacement outside assessment scope"
],
"requiredInputs": [
"LG&E or KU account",
"income qualification or self-attestation",
"service history",
"prior WeCare service date",
"renter owner consent if applicable",
"assessment scope"
],
"missingInputsForTypicalRetroFiEstimate": [
"assessment-approved measures",
"installed measure scope",
"income pathway",
"prior participation"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "wecare_assessment_direct_install",
"selectionInput": "assessment-approved measure package",
"rows": [
{
"measure": "LED lighting",
"value": "no-cost direct install if assessment approves"
},
{
"measure": "air sealing or weatherization",
"value": "no-cost direct install if assessment approves"
},
{
"measure": "duct sealing or insulation",
"value": "no-cost direct install if assessment approves"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "WeCare provides no-cost education, audit and installed measures for qualified customers; measures depend on assessment and are not a cash rebate.",
"sourceUrls": [
"[https://lge-ku.com/wecare](https://lge-ku.com/wecare)",
"[https://lge-ku.com/sites/default/files/media/files/downloads/WeCare-Application-English.pdf](https://lge-ku.com/sites/default/files/media/files/downloads/WeCare-Application-English.pdf)"
]
},
{
"effectType": "one_time_savings",
"cashValueClassification": "reimbursement",
"valueModelKind": "capped_percent_of_eligible_cost",
"timing": "post_installation_reimbursement",
"formulaText": "For qualifying apartment building owners, whole-building project incentives may cover up to 50% of incremental cost, subject to program review and availability.",
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
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"approved apartment whole-building incremental efficiency costs"
],
"ineligibleCostCategories": [
"doors",
"windows",
"non-qualified tenant buildings"
],
"requiredInputs": [
"apartment owner account",
"number of units",
"income-qualified tenant percentage",
"incremental project cost",
"program approval",
"funding availability"
],
"missingInputsForTypicalRetroFiEstimate": [
"incremental project cost",
"approved scope",
"tenant qualification percentage"
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
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "LG&E and KU state apartment building owner whole-building incentives may be up to 50% of incremental cost.",
"sourceUrls": [
"[https://lge-ku.com/wecare](https://lge-ku.com/wecare)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "WeCare includes weatherization and direct-installed measures based on assessment."
},
{
"retrofitTypeId": "duct_sealing_and_insulation",
"action": "keep",
"reason": "WeCare may include duct sealing and related insulation when assessment approves."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "WeCare may include insulation measures in some homes based on assessment."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "WeCare includes LEDs as no-cost direct-install measures."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Services are no-additional-cost direct install for qualified participants; apartment incentives are subject to program availability."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://lge-ku.com/wecare](https://lge-ku.com/wecare)",
"[https://lge-ku.com/sites/default/files/media/files/downloads/WeCare-Application-English.pdf](https://lge-ku.com/sites/default/files/media/files/downloads/WeCare-Application-English.pdf)"
],
"evidenceText": "WeCare is primarily a no-cost direct-install and education workflow, with a separate apartment owner incremental-cost incentive path.",
"reasoningNotes": "Do not treat homeowner or renter WeCare as a standard cash rebate; measures depend on assessment.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2306",
"opportunityName": "Salt River Electric - Residential Energy Efficiency Rebate Programs",
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
"formulaText": "Select the Salt River heat pump tier: $500 for ENERGY STAR heat pump upgrade, $1,000 for ENERGY STAR cold-climate heat pump upgrade, or up to $1,000 for eligible electric-resistance-to-heat-pump retrofit.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 50000,
"maxAmountCents": 100000,
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
"eligibleCostCategories": [
"ENERGY STAR heat pump upgrade",
"ENERGY STAR cold-climate heat pump upgrade",
"eligible heat pump replacing electric resistance heat"
],
"ineligibleCostCategories": [
"geothermal heat pump unless separately verified",
"LED lighting",
"generic non-heat-pump HVAC",
"non-residential projects"
],
"requiredInputs": [
"Salt River residential member account",
"existing heat source",
"heat pump type",
"ENERGY STAR or cold-climate qualification",
"SEER2 rating",
"HSPF2 rating",
"AHRI documentation",
"invoice"
],
"missingInputsForTypicalRetroFiEstimate": [
"existing heat source",
"ENERGY STAR or cold-climate status",
"SEER2/HSPF2",
"AHRI certificate",
"invoice"
],
"rateTable": {
"tableId": "salt_river_residential_heat_pump_rebates",
"dimensions": [
"measure",
"tier"
],
"rows": [
{
"measure": "existing heat pump upgrade",
"tier": "ENERGY STAR certified",
"amountCents": 50000
},
{
"measure": "existing heat pump upgrade",
"tier": "ENERGY STAR certified cold-climate",
"amountCents": 100000
},
{
"measure": "electric-resistance-to-heat-pump retrofit",
"tier": "at least 14.3 SEER2 and 7.5 HSPF2",
"maxAmountCents": 100000
},
{
"measure": "ENERGY STAR heat pump water heater",
"amountCents": 25000,
"sourceNote": "supported program value but not a current target edge"
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
"evidenceText": "Salt River and TogetherWeSaveKY materials publish fixed heat pump upgrade and retrofit amounts for residential members.",
"sourceUrls": [
"[https://www.srelectric.com/rebates/](https://www.srelectric.com/rebates/)",
"[https://www.srelectric.com/heat-pump-retrofit/](https://www.srelectric.com/heat-pump-retrofit/)",
"[https://www.srelectric.com/heat-pump-upgrades/](https://www.srelectric.com/heat-pump-upgrades/)",
"[https://www.srelectric.com/button-up/](https://www.srelectric.com/button-up/)",
"[https://www.srelectric.com/bring-your-own-thermostat/](https://www.srelectric.com/bring-your-own-thermostat/)",
"[https://togetherwesaveky.com/cooperatives/salt-river-electric/](https://togetherwesaveky.com/cooperatives/salt-river-electric/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "delete_bad_edge",
"reason": "Current Salt River sources did not verify a geothermal heat pump rebate."
},
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Current sources publish heat pump upgrade and retrofit rebates."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only when the replacement is a qualifying heat pump upgrade or retrofit."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "delete_bad_edge",
"reason": "Current Salt River rebate pages did not list a residential LED lighting rebate under this opportunity."
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
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.srelectric.com/rebates/](https://www.srelectric.com/rebates/)",
"[https://www.srelectric.com/heat-pump-retrofit/](https://www.srelectric.com/heat-pump-retrofit/)",
"[https://www.srelectric.com/heat-pump-upgrades/](https://www.srelectric.com/heat-pump-upgrades/)",
"[https://www.srelectric.com/button-up/](https://www.srelectric.com/button-up/)",
"[https://www.srelectric.com/bring-your-own-thermostat/](https://www.srelectric.com/bring-your-own-thermostat/)",
"[https://togetherwesaveky.com/cooperatives/salt-river-electric/](https://togetherwesaveky.com/cooperatives/salt-river-electric/)"
],
"evidenceText": "Salt River supports heat pump rebates but not the target geothermal or LED lighting edges.",
"reasoningNotes": "Repair removes geothermal and lighting while retaining heat-pump-specific HVAC values.",
"humanReviewRequired": false,
"humanReviewReasons": []
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2307"
}
