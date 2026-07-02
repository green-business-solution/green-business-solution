{
"schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
"researchedAt": "2026-07-02",
"source": "gpt_pro",
"batchNumber": 44,
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2817",
"opportunityName": "Gulf Power - Residential Energy Efficiency Programs",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable",
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
"timing": "point_of_sale",
"formulaText": "Qualifying new central A/C systems receive a $200 instant invoice credit. Qualifying ceiling insulation receives a $220 instant invoice credit.",
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
"qualifying new central air-conditioning system",
"qualifying ceiling insulation installed by an approved participating independent contractor"
],
"ineligibleCostCategories": [
"unapproved contractors",
"A/C equipment below required SEER2",
"ceiling insulation where existing R-value is not below program threshold"
],
"requiredInputs": [
"measure selected",
"FPL Northwest Florida residential account",
"approved participating independent contractor",
"A/C SEER2 rating if selected",
"existing ceiling insulation R-value if selected"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure selected",
"approved contractor confirmation",
"A/C SEER2 rating or existing ceiling insulation R-value"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "fpl_nw_fl_residential_efficiency_2026",
"selectionInput": "measure selected",
"rows": [
{
"measure": "qualifying new central A/C system",
"amountCents": 20000
},
{
"measure": "ceiling insulation",
"amountCents": 22000
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": true,
"evidenceText": "FPL lists $200 for a qualifying new A/C system and $220 for qualifying ceiling insulation as instant invoice credits.",
"sourceUrls": [
"[https://www.fpl.com/save/programs/ac-rebate.html](https://www.fpl.com/save/programs/ac-rebate.html)",
"[https://www.fpl.com/save/resources/ceiling-insulation.html](https://www.fpl.com/save/resources/ceiling-insulation.html)",
"[https://www.fpl.com/save/lower-my-bill.html?=icidHT6](https://www.fpl.com/save/lower-my-bill.html?=icidHT6)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Supported only when narrowed to qualifying central A/C system replacement meeting FPL SEER2 and approved-contractor rules."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Supported only when narrowed to qualifying ceiling insulation with existing insulation below the program R-value threshold."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Instant credits are applied by participating contractors; no official stacking restriction was found in the checked pages."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.fpl.com/save/programs/ac-rebate.html](https://www.fpl.com/save/programs/ac-rebate.html)",
"[https://www.fpl.com/save/resources/ceiling-insulation.html](https://www.fpl.com/save/resources/ceiling-insulation.html)",
"[https://www.fpl.com/save/lower-my-bill.html?=icidHT6](https://www.fpl.com/save/lower-my-bill.html?=icidHT6)",
"[https://www.fpl.com/save/programs.html](https://www.fpl.com/save/programs.html)"
],
"evidenceText": "FPL publishes fixed instant rebates of $200 for qualifying new A/C systems and $220 for qualifying ceiling insulation installed through approved contractors.",
"reasoningNotes": "Batch target source reviewed: . Legacy no-rule status is repaired because current official FPL pages publish fixed amounts.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3479",
"opportunityName": "Cedar Falls Utilities - Residential New Construction Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"hybrid_rate_plus_cap",
"rate_table",
"fixed_tier_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "hybrid_rate_plus_cap",
"timing": "post_installation_reimbursement",
"formulaText": "For insulation, multiply added R-value by net insulated square feet by the applicable rate, then cap at the lower of the calculated incentive or 60% of project cost. Air sealing pays $200 for at least 20% blower-door improvement, $150 for 10% to 19%, and $0 below 10%.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.6,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"insulation in eligible conditioned spaces",
"qualifying air sealing with blower-door testing"
],
"ineligibleCostCategories": [
"new construction or properties built after 2013",
"batt insulation",
"garages, seasonal rooms, and unconditioned spaces",
"projects started without CFU preapproval"
],
"requiredInputs": [
"preapproval",
"property build year",
"CFU heating fuel service",
"insulation location",
"insulation material type",
"initial R-value",
"final R-value",
"added R-value",
"net insulated area square feet",
"project cost",
"blower-door CFM50 before and after for air sealing"
],
"missingInputsForTypicalRetroFiEstimate": [
"insulation location and material",
"added R-value",
"net insulated area",
"project cost",
"blower-door improvement percentage"
],
"rateTable": {
"tableId": "cfu_2026_insulation_air_sealing",
"dimensions": [
"measure",
"location_or_material",
"rate"
],
"rows": [
{
"measure": "air sealing",
"tier": "CFM50 reduction 20% or greater",
"amountCents": 20000
},
{
"measure": "air sealing",
"tier": "CFM50 reduction 10% to 19%",
"amountCents": 15000
},
{
"measure": "air sealing",
"tier": "CFM50 reduction 9% or less",
"amountCents": 0
},
{
"measure": "insulation",
"location_or_material": "attic/ceiling/roof loose-fill blown cellulose or fiberglass",
"rate": 0.01,
"rateUnit": "USD_per_added_R_value_square_foot"
},
{
"measure": "insulation",
"location_or_material": "attic/ceiling/roof spray or rigid",
"rate": 0.08,
"rateUnit": "USD_per_added_R_value_square_foot"
},
{
"measure": "insulation",
"location_or_material": "crawlspace, ductwork, floor above unconditioned space, sidewalls",
"rate": 0.15,
"rateUnit": "USD_per_added_R_value_square_foot"
},
{
"measure": "insulation",
"location_or_material": "rim or band joists",
"rate": 0.1,
"rateUnit": "USD_per_added_R_value_square_foot"
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
"evidenceText": "CFU's 2026 application gives insulation rates by R-value and square foot with a 60% cost cap, plus air-sealing tiers.",
"sourceUrls": [
"[https://www.cfu.net/save-energy/residential-business/residential-rebates](https://www.cfu.net/save-energy/residential-business/residential-rebates)",
"[https://www.cfu.net/filesimages/save-energy/Residential-Rebates/2026/2026%20Application%20-%20Insulation%20and%20Air%20Sealing.pdf](https://www.cfu.net/filesimages/save-energy/Residential-Rebates/2026/2026%20Application%20-%20Insulation%20and%20Air%20Sealing.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "keep",
"reason": "Supported for qualifying air sealing with required pre/post blower-door testing and CFU preapproval."
},
{
"retrofitTypeId": "insulation_upgrade",
"action": "keep",
"reason": "Supported for approved insulation work in eligible conditioned spaces using the published R-value by area rate table."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate is capped by project cost and requires CFU preapproval."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "2027-01-31",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.cfu.net/save-energy/residential-business/residential-rebates](https://www.cfu.net/save-energy/residential-business/residential-rebates)",
"[https://www.cfu.net/save-energy/residential-rebates/#construction](https://www.cfu.net/save-energy/residential-rebates/#construction)",
"[https://www.cfu.net/filesimages/save-energy/Residential-Rebates/2026/2026%20Application%20-%20Insulation%20and%20Air%20Sealing.pdf](https://www.cfu.net/filesimages/save-energy/Residential-Rebates/2026/2026%20Application%20-%20Insulation%20and%20Air%20Sealing.pdf)"
],
"evidenceText": "The current CFU application is not a new-construction offer; it covers older CFU-heated properties with preapproval, insulation formulas, and air-sealing tiers.",
"reasoningNotes": "Opportunity name is stale; current official calculation package supports insulation and air sealing for older properties, not new construction.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5317",
"opportunityName": "ComEd - Business Instant Lighting Discounts Program",
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
"timing": "point_of_sale",
"formulaText": "Customer value equals the product-specific instant lighting discount shown by the participating distributor or service provider; no reusable public discount table was verified.",
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
"qualifying ComEd business lighting products",
"eligible lighting equipment sold through participating distributor or service-provider channels"
],
"ineligibleCostCategories": [
"plumbing fixtures",
"low-flow water devices",
"residential lighting offers",
"non-lighting equipment"
],
"requiredInputs": [
"eligible lighting product or SKU",
"quantity",
"participating distributor or service provider",
"ComEd business customer site",
"instant discount quoted at purchase"
],
"missingInputsForTypicalRetroFiEstimate": [
"eligible product SKU",
"quantity",
"participating distributor quote"
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
"evidenceText": "ComEd business materials support instant discounts or rebates for qualifying installations and lighting providers, but no public rate table was accessible.",
"sourceUrls": [
"[https://www.comed.com/WaysToSave/ForYourBusiness/Pages/LightingDiscounts.aspx](https://www.comed.com/WaysToSave/ForYourBusiness/Pages/LightingDiscounts.aspx)",
"[https://www.comed.com/business/smart-ideas/instant-discounts](https://www.comed.com/business/smart-ideas/instant-discounts)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Supported for business lighting discounts through qualifying lighting products and participating channels."
},
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"action": "delete_bad_edge",
"reason": "The source context is lighting fixtures, not plumbing fixtures or water conservation devices."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Midstream instant discounts depend on participating distributor and product terms."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.comed.com/WaysToSave/ForYourBusiness/Pages/LightingDiscounts.aspx](https://www.comed.com/WaysToSave/ForYourBusiness/Pages/LightingDiscounts.aspx)",
"[https://www.comed.com/business/smart-ideas/instant-discounts](https://www.comed.com/business/smart-ideas/instant-discounts)",
"[https://www.comed.com/cdn/assets/v3/assets/blt3ebb3fed6084be2a/blt0dd576334f989cef/69399b2a685dab31f7bc8caa/2026_ComEd_Application_EESPParticipation_FINAL_2.pdf?branch=prod_alias](https://www.comed.com/cdn/assets/v3/assets/blt3ebb3fed6084be2a/blt0dd576334f989cef/69399b2a685dab31f7bc8caa/2026_ComEd_Application_EESPParticipation_FINAL_2.pdf?branch=prod_alias)"
],
"evidenceText": "Official ComEd pages confirm a business lighting instant-discount pathway, but accessible sources did not publish a reusable customer formula.",
"reasoningNotes": "Repair away from a water-fixture mapping; compute only from a product-specific ComEd instant-discount quote.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3879",
"opportunityName": "Illinois Municipal Electric Agency - Electric Efficiency Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"measure_catalog",
"hybrid_rate_plus_cap",
"rate_table"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "measure_catalog",
"timing": "post_installation_reimbursement",
"formulaText": "Use the applicable IMEA FY 2026-27 measure amount or rate, then cap the incentive at no more than 75% of project cost. Member municipalities may approve any amount from $0 up to the eligible incentive.",
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
"programBudgetCents": 100000000
},
"eligibleCostCategories": [
"LED lighting",
"occupancy sensors",
"commercial refrigeration equipment and controls"
],
"ineligibleCostCategories": [
"repairs or maintenance without efficiency improvement",
"fuel switching",
"generation or self-generation",
"demand-response-only projects"
],
"requiredInputs": [
"measure selected",
"quantity",
"watts reduced or controlled for lighting",
"project cost",
"IMEA member municipal utility",
"preapproval",
"municipal approval amount"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure selected",
"quantity or watts",
"project cost",
"municipal approval amount"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "imea_fy2026_2027_lighting_refrigeration",
"selectionInput": "measure selected",
"rows": [
{
"measure": "LED fixtures",
"rate": 0.8,
"rateUnit": "USD_per_watt_reduced"
},
{
"measure": "occupancy sensors",
"rate": 0.25,
"rateUnit": "USD_per_watt_controlled"
},
{
"measure": "commercial LED interior exit sign",
"amountCents": 2000
},
{
"measure": "commercial refrigerator",
"amountCents": 10000
},
{
"measure": "commercial glass-door freezer",
"amountCents": 20000
},
{
"measure": "door heater control",
"amountCents": 12500
},
{
"measure": "ECM motor for reach-in",
"amountCents": 18800
},
{
"measure": "ECM motor for walk-in",
"amountCents": 22500
},
{
"measure": "evaporator fan control",
"amountCents": 14000
},
{
"measure": "door gasket",
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
"evidenceText": "IMEA publishes FY 2026-27 lighting and refrigeration measure amounts and rates, capped at 75% of project cost.",
"sourceUrls": [
"[https://www.imea.org/Electric%20Efficiency%20Program.html](https://www.imea.org/Electric%20Efficiency%20Program.html)",
"[https://www.imea.org/EE%20Incentives.asp](https://www.imea.org/EE%20Incentives.asp)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Supported by published commercial refrigeration measure amounts and controls incentives."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Supported by published LED fixture, exit sign, and occupancy-sensor lighting incentives."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Total IMEA incentive cannot exceed 75% of project cost; local member municipalities may apply additional caps or award less."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "2027-04-15",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.imea.org/Electric%20Efficiency%20Program.html](https://www.imea.org/Electric%20Efficiency%20Program.html)",
"[https://www.imea.org/EE%20Incentives.asp](https://www.imea.org/EE%20Incentives.asp)"
],
"evidenceText": "IMEA lists FY 2026-27 applications for LED lighting and refrigeration with published measure incentives, preapproval, funding limits, and a 75% project-cost cap.",
"reasoningNotes": "Calculation is source-backed for target LED and refrigeration measures but final award can be reduced by member municipality approval.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5402",
"opportunityName": "North Shore Gas - Home Energy Jumpstart Program",
"repairStatus": "non_monetary_workflow",
"calculationStatus": "non_monetary_workflow",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"technical_assistance",
"non_cash",
"process_value"
],
"primaryValueModelKinds": [
"non_cash_process_value"
],
"effects": [
{
"effectType": "process_value",
"cashValueClassification": "technical_assistance",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Eligible residential customers may receive a free home energy assessment and free or discounted direct-install products. No fixed customer cash rebate formula is published for this direct-install visit.",
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
"home energy assessment",
"direct-install or discounted thermostat, pipe insulation, aerators, showerheads, door sweeps, or power strips"
],
"ineligibleCostCategories": [
"broad insulation projects under separate rebate pathways",
"large multifamily or commercial accounts",
"general HVAC replacement"
],
"requiredInputs": [
"eligible North Shore Gas residential account",
"home type",
"landlord permission if required",
"program visit participation"
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
"evidenceText": "North Shore Gas describes a residential home visit with free assessment and free or discounted direct-install products, not a cash rebate schedule.",
"sourceUrls": [
"[https://www.northshoregasdelivery.com/savings/rebates-direct](https://www.northshoregasdelivery.com/savings/rebates-direct)",
"[https://www.northshoregasdelivery.com/savings/rebates](https://www.northshoregasdelivery.com/savings/rebates)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "insulation_upgrade",
"action": "delete_bad_edge",
"reason": "This direct-install visit does not support a broad insulation-upgrade rebate; weatherization rebates are separate."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "move_to_special_workflow",
"reason": "Thermostats may be provided as direct-install or discounted products, but the source does not support zoning retrofit work or a cash formula."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Separate North Shore Gas residential rebate pages may offer other rebates; this workflow should not be stacked as a cash formula by default."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.northshoregasdelivery.com/savings/rebates-direct](https://www.northshoregasdelivery.com/savings/rebates-direct)",
"[https://www.northshoregasdelivery.com/savings/rebates](https://www.northshoregasdelivery.com/savings/rebates)",
"[https://www.northshoregasdelivery.com/savings/rebates-residential](https://www.northshoregasdelivery.com/savings/rebates-residential)"
],
"evidenceText": "The current source supports a home energy assessment and direct-install workflow, not a fixed one-time insulation or thermostat rebate.",
"reasoningNotes": "Classified as non-cash process value; delete the false insulation edge and keep thermostat only as a direct-install workflow.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4454",
"opportunityName": "Retro-Commissioning (RCx) Program",
"repairStatus": "non_monetary_workflow",
"calculationStatus": "non_monetary_workflow",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"technical_assistance",
"process_value",
"non_cash"
],
"primaryValueModelKinds": [
"non_cash_process_value"
],
"effects": [
{
"effectType": "process_value",
"cashValueClassification": "technical_assistance",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "EnergySense provides a retro-commissioning assessment and operational-improvement process, including facility assessment, diagnostics, recommendations, reporting, and implementation assistance. Capital equipment replacements are not directly funded by this opportunity.",
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
"retro-commissioning assessment",
"HVAC and building operations optimization review",
"energy report and implementation assistance"
],
"ineligibleCostCategories": [
"direct high-efficiency HVAC replacement rebate",
"residential HVAC replacement",
"major equipment replacement unless funded separately"
],
"requiredInputs": [
"nonresidential facility",
"utility or EnergySense eligibility review",
"application or inquiry",
"facility staff and operator participation"
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
"evidenceText": "EnergySense describes RCx as a nonresidential assessment and operational improvement service focused mainly on HVAC optimization and reporting.",
"sourceUrls": [
"[https://smartenergy.illinois.edu/rcx/](https://smartenergy.illinois.edu/rcx/)",
"[https://forms.illinois.edu/sec/6156089](https://forms.illinois.edu/sec/6156089)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "The program may identify HVAC improvements but does not provide a direct HVAC replacement incentive."
},
{
"retrofitTypeId": "retro_commissioning_study",
"action": "move_to_special_workflow",
"reason": "The supported opportunity is a retro-commissioning study and technical-assistance workflow."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Recommended capital measures may use other incentives separately; this RCx workflow itself has no published cash rebate formula."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://smartenergy.illinois.edu/rcx/](https://smartenergy.illinois.edu/rcx/)",
"[https://forms.illinois.edu/sec/6156089](https://forms.illinois.edu/sec/6156089)"
],
"evidenceText": "EnergySense provides a nonresidential retro-commissioning assessment, diagnosis, recommendations, and implementation assistance, rather than equipment-replacement funding.",
"reasoningNotes": "Repair deletes HVAC replacement and reclassifies the valid commissioning edge as technical assistance.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5238",
"opportunityName": "Columbia Gas of Kentucky - Low Income Furnace Replacement Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate",
"non_cash"
],
"primaryValueModelKinds": [
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "custom_quote",
"timing": "application_process",
"formulaText": "For approved income-eligible customers, the program replaces an old, non-working, or inefficient furnace with a high-efficiency model at no cost. The calculable customer value is the program-approved installed furnace replacement cost, which is not published as a fixed amount.",
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
"program-approved high-efficiency furnace replacement"
],
"ineligibleCostCategories": [
"heat pumps",
"air conditioners",
"generic HVAC replacement outside the furnace program",
"nonresidential projects"
],
"requiredInputs": [
"income-eligible approval",
"existing furnace condition",
"program-approved installed replacement cost",
"Columbia Gas of Kentucky residential account"
],
"missingInputsForTypicalRetroFiEstimate": [
"program approval",
"installed furnace replacement cost"
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
"evidenceText": "Columbia Gas of Kentucky states qualifying customers may have an old, non-working, or inefficient furnace replaced with a high-efficiency model at no cost.",
"sourceUrls": [
"[https://www.columbiagasky.com/energy-efficiency/for-your-home](https://www.columbiagasky.com/energy-efficiency/for-your-home)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_furnace_retrofit",
"action": "keep",
"reason": "Source specifically supports no-cost replacement of qualifying old, non-working, or inefficient furnaces with high-efficiency models."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "The source is furnace-specific and does not support generic HVAC, heat pump, or air-conditioning replacement."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Program is a no-cost replacement service for qualifying customers; no general stacking rule was published."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.columbiagasky.com/energy-efficiency/for-your-home](https://www.columbiagasky.com/energy-efficiency/for-your-home)"
],
"evidenceText": "The official page supports a no-cost furnace replacement service for qualifying low-income customers, but no fixed dollar formula.",
"reasoningNotes": "The value is real but project-specific; use approved installed furnace replacement cost instead of a fixed rebate.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22708",
"opportunityName": "Louisville Gas and Electric and Kentucky Utilities – Optimized EV Charging",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate",
"tariff_or_rate"
],
"primaryValueModelKinds": [
"fixed_amount",
"fixed_tier_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_amount",
"timing": "application_process",
"formulaText": "Eligible participants receive a $25 enrollment reward after enrolling a qualifying EV or compatible Level 2 smart charger in optimized charging.",
"amountCents": 2500,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 2500,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"optimized EV charging enrollment"
],
"ineligibleCostCategories": [
"EV charger purchase",
"EV charger installation",
"make-ready wiring",
"building demand-response controls"
],
"requiredInputs": [
"LG&E or KU residential electric customer",
"qualifying EV or compatible Level 2 smart charger",
"program enrollment"
],
"missingInputsForTypicalRetroFiEstimate": [
"program enrollment confirmation"
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
"evidenceText": "The current enrollment page offers a $25 enrollment reward for eligible optimized EV charging participants.",
"sourceUrls": [
"[https://www.chargingrewards.com/lge-ku-ev/](https://www.chargingrewards.com/lge-ku-ev/)",
"[https://greatergrid.com/enroll/programs/evs/lge-ku-ev](https://greatergrid.com/enroll/programs/evs/lge-ku-ev)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_amount",
"timing": "monthly",
"formulaText": "Participants receive a $5 monthly participation reward while they remain enrolled and comply with optimized charging requirements.",
"amountCents": 500,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 6000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": 6000,
"programBudgetCents": null
},
"eligibleCostCategories": [
"monthly optimized charging participation"
],
"ineligibleCostCategories": [
"months with opt-out or nonparticipation that disqualifies the monthly incentive"
],
"requiredInputs": [
"monthly active enrollment",
"qualifying EV or smart charger connection",
"managed charging participation"
],
"missingInputsForTypicalRetroFiEstimate": [
"active monthly participation data"
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
"evidenceText": "The program page lists ongoing monthly rewards of $5 for allowing optimized charging of a qualifying EV or smart charger.",
"sourceUrls": [
"[https://www.chargingrewards.com/lge-ku-ev/](https://www.chargingrewards.com/lge-ku-ev/)",
"[https://greatergrid.com/enroll/programs/evs/lge-ku-ev](https://greatergrid.com/enroll/programs/evs/lge-ku-ev)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "automated_demand_response_controls",
"action": "delete_bad_edge",
"reason": "This is EV charging enrollment, not automated building demand-response controls."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "The program rewards optimized charging participation and does not fund charger purchase, installation, or make-ready work."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rewards are participation incentives; separate EV charger installation incentives should not be inferred from this program."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.chargingrewards.com/lge-ku-ev/](https://www.chargingrewards.com/lge-ku-ev/)",
"[https://greatergrid.com/enroll/programs/evs/lge-ku-ev](https://greatergrid.com/enroll/programs/evs/lge-ku-ev)",
"[https://lge-ku.com/residential/ev](https://lge-ku.com/residential/ev)",
"[https://programs.dsireusa.org/system/program/detail/22708](https://programs.dsireusa.org/system/program/detail/22708)"
],
"evidenceText": "The program pays a $25 enrollment reward and $5 monthly participation rewards for managed EV charging, not installation incentives.",
"reasoningNotes": "Both physical retrofit edges should be removed; the opportunity should be matched only to a managed EV charging workflow.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5823",
"opportunityName": "AEP (SWEPCO) - Louisiana Commercial Solutions Standard Offer Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"rate_table",
"hybrid_rate_plus_cap",
"per_unit_award"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "Large commercial incentives use published rates by measure, commonly kW and annual kWh savings multiplied by the applicable rates or fixed per-unit amounts. Small commercial HVAC uses published per-ton tiers by equipment type and SEER2. Incentives require preapproval and are limited by program budgets and sponsor caps.",
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
"perCustomerCapCents": 35000000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": 182412400
},
"eligibleCostCategories": [
"nonresidential LED lighting",
"qualifying HVAC upgrades",
"custom electric efficiency measures"
],
"ineligibleCostCategories": [
"residential measures",
"self-generation",
"cogeneration",
"fuel-switching to electric",
"projects already receiving another SWEPCO incentive"
],
"requiredInputs": [
"SWEPCO Louisiana nonresidential site",
"preapproval",
"measure selected",
"annual kWh savings",
"summer peak kW savings",
"equipment quantity",
"tons and SEER2 for small commercial HVAC"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure selected",
"annual kWh savings",
"summer peak kW savings",
"equipment tier or quantity",
"preapproval status"
],
"rateTable": {
"tableId": "swepco_la_csol_2026_target_measures",
"dimensions": [
"measure",
"rate_or_amount"
],
"rows": [
{
"measure": "large commercial LED lighting",
"rateKWDemand": 240,
"rateKWDemandUnit": "USD_per_kW",
"rateEnergy": 0.12,
"rateEnergyUnit": "USD_per_kWh"
},
{
"measure": "large commercial HVAC VRF or heat pump",
"rateKWDemand": 450,
"rateKWDemandUnit": "USD_per_kW",
"rateEnergy": 0.15,
"rateEnergyUnit": "USD_per_kWh"
},
{
"measure": "large commercial HVAC air conditioning only",
"rateKWDemand": 350,
"rateKWDemandUnit": "USD_per_kW",
"rateEnergy": 0.12,
"rateEnergyUnit": "USD_per_kWh"
},
{
"measure": "small commercial central AC SEER2 15.2-15.9",
"rate": 100,
"rateUnit": "USD_per_ton"
},
{
"measure": "small commercial central AC SEER2 16.0-16.9",
"rate": 150,
"rateUnit": "USD_per_ton"
},
{
"measure": "small commercial central AC SEER2 17.0-17.9",
"rate": 200,
"rateUnit": "USD_per_ton"
},
{
"measure": "small commercial central AC SEER2 18.0+",
"rate": 250,
"rateUnit": "USD_per_ton"
},
{
"measure": "small commercial heat pump SEER2 14.8-15.9",
"rate": 350,
"rateUnit": "USD_per_ton"
},
{
"measure": "small commercial heat pump SEER2 16.0-16.9",
"rate": 400,
"rateUnit": "USD_per_ton"
},
{
"measure": "small commercial heat pump SEER2 17.0-17.9",
"rate": 500,
"rateUnit": "USD_per_ton"
},
{
"measure": "small commercial heat pump SEER2 18.0+",
"rate": 600,
"rateUnit": "USD_per_ton"
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
"evidenceText": "SWEPCO's 2026 Louisiana commercial materials publish rates for LED lighting and HVAC using kW/kWh savings or small-commercial per-ton tiers.",
"sourceUrls": [
"[https://swepcosolutions.com/programs/business-programs/louisiana-commercial-solutions-standard-offer-program/](https://swepcosolutions.com/programs/business-programs/louisiana-commercial-solutions-standard-offer-program/)",
"[https://swepcosolutions.com/wp-content/uploads/2026/05/2026-SWEPCO-Louisiana-Large-Commercial-Overview-1.pdf](https://swepcosolutions.com/wp-content/uploads/2026/05/2026-SWEPCO-Louisiana-Large-Commercial-Overview-1.pdf)",
"[https://swepcosolutions.com/wp-content/uploads/2026/05/2026-SWEPCO-Louisiana-Small-Commercial-Solutions-Overview-1.pdf](https://swepcosolutions.com/wp-content/uploads/2026/05/2026-SWEPCO-Louisiana-Small-Commercial-Solutions-Overview-1.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Supported for eligible nonresidential HVAC measures using published large-commercial kW/kWh rates or small-commercial per-ton SEER2 tiers."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Supported for nonresidential LED lighting with a published kW and kWh incentive formula."
}
],
"stackingRules": {
"stackableWithRebates": false,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Projects already receiving another SWEPCO incentive are excluded; incentives also operate under program and sponsor funding limits."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "2026-11-27",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://swepcosolutions.com/programs/business-programs/louisiana-commercial-solutions-standard-offer-program/](https://swepcosolutions.com/programs/business-programs/louisiana-commercial-solutions-standard-offer-program/)",
"[https://swepcosolutions.com/wp-content/uploads/2026/05/2026-SWEPCO-Louisiana-Large-Commercial-Overview-1.pdf](https://swepcosolutions.com/wp-content/uploads/2026/05/2026-SWEPCO-Louisiana-Large-Commercial-Overview-1.pdf)",
"[https://swepcosolutions.com/wp-content/uploads/2026/05/2026-SWEPCO-Louisiana-Small-Commercial-Solutions-Overview-1.pdf](https://swepcosolutions.com/wp-content/uploads/2026/05/2026-SWEPCO-Louisiana-Small-Commercial-Solutions-Overview-1.pdf)",
"[https://swepcola.p3.enertrek.com/Users/Account/Register](https://swepcola.p3.enertrek.com/Users/Account/Register)"
],
"evidenceText": "Current 2026 SWEPCO Louisiana materials provide a rate package for target commercial HVAC and lighting measures with preapproval and budget limits.",
"reasoningNotes": "Calculation is ready only after project-specific deemed or verified kW/kWh savings, equipment tier, and preapproval are known.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22325",
"opportunityName": "Eversource - Commercial Electric Vehicle Charging Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "medium",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate",
"reimbursement",
"process_value"
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
"formulaText": "Preapproved make-ready infrastructure support and possible charger rebates are determined by Eversource after application, site sketch, qualified equipment review, third-party funding applications, Site Host Agreement, and final closeout. No reusable public dollar formula was verified.",
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
"commercial EV charging station equipment where approved",
"EV make-ready infrastructure where approved"
],
"ineligibleCostCategories": [
"single-family residential chargers",
"general electrical work unrelated to EV charging",
"projects installed before required approval"
],
"requiredInputs": [
"Eversource business account and service address",
"site sketch",
"charger type and number of ports",
"qualified charging equipment",
"make-ready infrastructure scope and cost",
"third-party funding applications",
"PowerClerk preapproval",
"Site Host Agreement"
],
"missingInputsForTypicalRetroFiEstimate": [
"preapproved Eversource incentive amount",
"make-ready cost",
"EVSE cost",
"third-party funding amounts"
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
"evidenceText": "Eversource describes a PowerClerk preapproval and make-ready process for Massachusetts business EV charging, but accessible pages do not publish a rate table.",
"sourceUrls": [
"[https://www.eversource.com/business/save-money-energy/clean-energy-options/electric-vehicles/business-ev-charging-rebates](https://www.eversource.com/business/save-money-energy/clean-energy-options/electric-vehicles/business-ev-charging-rebates)",
"[https://www.eversource.com/business/save-money-energy/clean-energy-options/electric-vehicles/business-ev-charging-rebates/massachusetts-ev-charging-rebates-process](https://www.eversource.com/business/save-money-energy/clean-energy-options/electric-vehicles/business-ev-charging-rebates/massachusetts-ev-charging-rebates-process)",
"[https://eversourcemaevprogram.powerclerk.com/](https://eversourcemaevprogram.powerclerk.com/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "Supported for approved Massachusetts business EV charging projects after Eversource application and qualified-equipment review."
},
{
"retrofitTypeId": "ev_make_ready_electrical_upgrade",
"action": "keep",
"reason": "Supported as make-ready infrastructure under the Massachusetts business EV charging preapproval workflow."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": true,
"notes": "Applicant must apply for applicable MassEVIP and other third-party funding; final Eversource incentive is determined after review."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.eversource.com/business/save-money-energy/clean-energy-options/electric-vehicles/business-ev-charging-rebates](https://www.eversource.com/business/save-money-energy/clean-energy-options/electric-vehicles/business-ev-charging-rebates)",
"[https://www.eversource.com/business/save-money-energy/clean-energy-options/electric-vehicles/business-ev-charging-rebates/massachusetts-ev-charging-rebates-process](https://www.eversource.com/business/save-money-energy/clean-energy-options/electric-vehicles/business-ev-charging-rebates/massachusetts-ev-charging-rebates-process)",
"[https://eversourcemaevprogram.powerclerk.com/](https://eversourcemaevprogram.powerclerk.com/)"
],
"evidenceText": "The EVSE and make-ready edges are valid, but the incentive amount remains project-specific and preapproval-driven on accessible official pages.",
"reasoningNotes": "Use custom quote until an official Massachusetts commercial EV rate table or project award amount is available.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Accessible official sources did not publish a reusable Massachusetts commercial EVSE or make-ready formula."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22548",
"opportunityName": "Eversource Residential EV Charging Program",
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
"timing": "post_installation_reimbursement",
"formulaText": "Rebate equals the applicable tier cap or actual eligible project cost paid, whichever is less. Standard wiring/panel upgrades are up to $700 for one-household use and $1,400 for shared 2-4 unit use; environmental justice tiers are up to $1,000 and $2,000; discount-rate tiers combine wiring/panel and charger cost up to $1,700 or $2,700. Managed charging enrollment is required where applicable.",
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
"240V wiring or panel upgrade for Level 2 EV charging",
"qualified Wi-Fi Level 2 smart charger for discount-rate customers",
"managed charging enrollment"
],
"ineligibleCostCategories": [
"commercial or fleet charging",
"general panel upgrades unrelated to EV charging",
"Level 1 chargers",
"non-qualified chargers"
],
"requiredInputs": [
"eligible Eversource Massachusetts residential account",
"single-household or shared 2-4 unit use",
"standard, discount-rate, or environmental-justice status",
"actual eligible cost paid",
"qualified charger model if charger cost claimed",
"managed charging enrollment"
],
"missingInputsForTypicalRetroFiEstimate": [
"customer tier",
"home or shared-use type",
"actual wiring/panel cost",
"charger cost if discount-rate tier applies",
"managed charging enrollment"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "eversource_ma_residential_ev_charging_2026",
"selectionInput": "customer and housing tier",
"rows": [
{
"tier": "standard rate, single-household use",
"eligibleCosts": "wiring or panel upgrade",
"maxAwardCents": 70000
},
{
"tier": "standard rate, shared 2-4 unit use",
"eligibleCosts": "wiring or panel upgrade",
"maxAwardCents": 140000
},
{
"tier": "environmental justice, single-household use",
"eligibleCosts": "wiring or panel upgrade",
"maxAwardCents": 100000
},
{
"tier": "environmental justice, shared 2-4 unit use",
"eligibleCosts": "wiring or panel upgrade",
"maxAwardCents": 200000
},
{
"tier": "discount rate, single-household use",
"eligibleCosts": "wiring or panel upgrade plus qualified EV smart charger",
"maxAwardCents": 170000
},
{
"tier": "discount rate, shared 2-4 unit use",
"eligibleCosts": "wiring or panel upgrade plus qualified EV smart charger",
"maxAwardCents": 270000
},
{
"tier": "managed charging only for existing eligible EV or charger",
"amountCents": 5000
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Eversource Massachusetts publishes residential EV wiring, environmental-justice, discount-rate, charger, and managed-charging tiers with cost-paid caps.",
"sourceUrls": [
"[https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/ema](https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/ema)",
"[https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/wma](https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/wma)",
"[https://eversource.dsmcentral.com/](https://eversource.dsmcentral.com/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "Supported only when narrowed to qualifying residential Level 2 charging and related wiring or approved smart charger costs."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Supported for qualifying Wi-Fi Level 2 smart charger and 240V wiring/panel work under current residential rules."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate cannot exceed actual eligible amount paid; charger rebates are limited to discount-rate cases and managed charging is required where applicable."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/ema](https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/ema)",
"[https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/wma](https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations/wma)",
"[https://www.masssave.com/residential/rebates-offers-services/battery-storage-and-evs/ev-charging-equipment](https://www.masssave.com/residential/rebates-offers-services/battery-storage-and-evs/ev-charging-equipment)",
"[https://eversource.dsmcentral.com/](https://eversource.dsmcentral.com/)"
],
"evidenceText": "Current Eversource Massachusetts pages provide calculable tier caps for residential EV wiring, smart chargers for discount-rate customers, and managed charging.",
"reasoningNotes": "Do not use max tiers as a default total unless customer tier, eligible costs, and managed charging enrollment are known.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5189",
"opportunityName": "Hudson Light & Power - Photovoltaic Incentive Program",
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
"formulaText": "Hudson Light & Power lists a Solar Rebate among customer rebate offerings, but the checked official pages do not publish a current per-watt, per-kW, percent-of-cost, or cap formula. Use the utility-confirmed solar rebate quote or application determination.",
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
"solar photovoltaic system for Hudson Light & Power customer if confirmed by utility"
],
"ineligibleCostCategories": [
"window film",
"building-envelope shading",
"heat pumps or non-solar conservation programs"
],
"requiredInputs": [
"Hudson Light & Power account",
"PV system size",
"current solar rebate terms confirmed by utility",
"project cost and application approval if required"
],
"missingInputsForTypicalRetroFiEstimate": [
"current utility-confirmed rebate amount or formula",
"PV system size"
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
"evidenceText": "Hudson Light & Power's rebates page lists a Solar Rebate, but checked official pages do not expose a current calculation table.",
"sourceUrls": [
"[https://www.hudsonlight.com/rebates](https://www.hudsonlight.com/rebates)",
"[https://www.hudsonlight.com/residential](https://www.hudsonlight.com/residential)",
"[https://www.hudsonlight.com/commercial](https://www.hudsonlight.com/commercial)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "rooftop_solar_pv",
"action": "keep",
"reason": "Official rebate page lists a Solar Rebate, supporting a PV program subject to utility-confirmed terms."
},
{
"retrofitTypeId": "window_film_shading_retrofit",
"action": "delete_bad_edge",
"reason": "The source context is photovoltaic solar, not building-envelope window film or shading retrofits."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "No current official stacking or netting rule was found in checked pages."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.hudsonlight.com/rebates](https://www.hudsonlight.com/rebates)",
"[https://www.hudsonlight.com/residential](https://www.hudsonlight.com/residential)",
"[https://www.hudsonlight.com/commercial](https://www.hudsonlight.com/commercial)",
"[https://www.hudsonlight.com/energy-efficiency/solar](https://www.hudsonlight.com/energy-efficiency/solar)"
],
"evidenceText": "The PV opportunity is real but not calculable from current accessible official pages; shading is a bad edge.",
"reasoningNotes": "Use custom quote until Hudson Light & Power publishes or confirms the current solar rebate formula.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Current official pages list a solar rebate without a reusable public amount or formula."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22742",
"opportunityName": "National Grid - Charge Smart MA",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate",
"tariff_or_rate"
],
"primaryValueModelKinds": [
"fixed_amount",
"rate_table"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_amount",
"timing": "application_process",
"formulaText": "Eligible Off-Peak Charging Program participants receive a $50 enrollment incentive after participating for 90 days. Customers receiving the separate EV Charging Upgrade rebate do not receive this $50 enrollment incentive.",
"amountCents": 5000,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 5000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"Charge Smart MA app enrollment with compatible EV or charger"
],
"ineligibleCostCategories": [
"customers receiving the separate EV Charging Upgrade rebate for the same participation incentive"
],
"requiredInputs": [
"National Grid Massachusetts residential electric account",
"compatible EV or home charger",
"90 days of participation",
"not receiving separate upgrade-program enrollment exclusion"
],
"missingInputsForTypicalRetroFiEstimate": [
"program enrollment status",
"upgrade rebate status"
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
"evidenceText": "National Grid states a $50 enrollment incentive after 90 days for eligible Charge Smart MA off-peak program participants.",
"sourceUrls": [
"[https://www.nationalgridus.com/electric-vehicle-hub/Programs/Massachusetts/Off-Peak-Charging-Program](https://www.nationalgridus.com/electric-vehicle-hub/Programs/Massachusetts/Off-Peak-Charging-Program)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "monthly",
"formulaText": "Monthly off-peak charging rebates equal qualifying off-peak EV charging kWh multiplied by $0.05/kWh during June 1 through September 30 and $0.03/kWh during October 1 through May 31. Starting November 1, 2025, off-peak hours are 9:00 p.m. to 1:00 p.m. the next day; charging must occur in Massachusetts.",
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
"off-peak EV charging kWh recorded by compatible EV or charger"
],
"ineligibleCostCategories": [
"charging outside Massachusetts",
"unsupported EV or charger data",
"charging outside designated off-peak hours"
],
"requiredInputs": [
"monthly off-peak kWh in summer months",
"monthly off-peak kWh in non-summer months",
"compatible EV or charger",
"Charge Smart MA enrollment"
],
"missingInputsForTypicalRetroFiEstimate": [
"off-peak kWh by season"
],
"rateTable": {
"tableId": "national_grid_charge_smart_ma_off_peak_2026",
"dimensions": [
"season",
"rate"
],
"rows": [
{
"season": "June 1 through September 30",
"rate": 0.05,
"rateUnit": "USD_per_off_peak_kWh"
},
{
"season": "October 1 through May 31",
"rate": 0.03,
"rateUnit": "USD_per_off_peak_kWh"
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
"evidenceText": "National Grid publishes $0.05/kWh summer and $0.03/kWh non-summer off-peak EV charging rebates for Charge Smart MA participants.",
"sourceUrls": [
"[https://www.nationalgridus.com/electric-vehicle-hub/Programs/Massachusetts/Off-Peak-Charging-Program](https://www.nationalgridus.com/electric-vehicle-hub/Programs/Massachusetts/Off-Peak-Charging-Program)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "Charge Smart MA rewards off-peak charging behavior; it is not a charger installation rebate."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "delete_bad_edge",
"reason": "A compatible Level 2 charger may enable participation, but installation is funded by a separate National Grid upgrade program."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "The $50 enrollment incentive is not paid to customers participating through the separate Residential EV Charging Upgrade rebate; off-peak kWh rebates can still apply."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.nationalgridus.com/electric-vehicle-hub/Programs/Massachusetts/Off-Peak-Charging-Program](https://www.nationalgridus.com/electric-vehicle-hub/Programs/Massachusetts/Off-Peak-Charging-Program)",
"[https://www.nationalgridus.com/electric-vehicle-hub/Programs/Massachusetts/EV-Charging-Upgrade-Program](https://www.nationalgridus.com/electric-vehicle-hub/Programs/Massachusetts/EV-Charging-Upgrade-Program)",
"[https://www.nationalgridus.com/media/pdfs/ma/cm8897-ev-charging-rebate.pdf](https://www.nationalgridus.com/media/pdfs/ma/cm8897-ev-charging-rebate.pdf)"
],
"evidenceText": "Charge Smart MA has calculable enrollment and per-kWh off-peak charging rewards; charger installation belongs to a separate upgrade program.",
"reasoningNotes": "Delete physical EV charger edges and model this as managed/off-peak EV charging rewards.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22328",
"opportunityName": "NextZero EV Charger Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"fixed_tier_amount",
"measure_catalog"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_tier_amount",
"timing": "post_purchase_rebate",
"formulaText": "Rebate depends on the local municipal light plant and vehicle type. Checked pages show fully electric vehicle charger rebates up to $600 or $700, plug-in hybrid rebates of $300 for batteries above 15 kWh and $200 for batteries below 15 kWh, and a $200 telematics-curtailment option. Installation labor is the customer's responsibility.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 20000,
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
"eligibleCostCategories": [
"ChargePoint or Emporia Smart Level 2 charger",
"scheduled charging enrollment",
"eligible participating MLP residential customer"
],
"ineligibleCostCategories": [
"installation labor unless local terms state otherwise",
"DC fast chargers",
"nonparticipating utility customers",
"non-smart or non-Level 2 chargers"
],
"requiredInputs": [
"participating municipal light plant",
"vehicle type",
"PHEV battery kWh if applicable",
"charger model",
"charger cost",
"scheduled charging enrollment",
"local MLP rebate table"
],
"missingInputsForTypicalRetroFiEstimate": [
"local MLP",
"vehicle type",
"charger cost",
"PHEV battery capacity"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "nextzero_ev_charger_town_examples_2026",
"selectionInput": "local MLP and vehicle type",
"rows": [
{
"exampleUtility": "Hingham Municipal Lighting Plant",
"vehicleType": "fully electric vehicle",
"maxAwardCents": 60000
},
{
"exampleUtility": "Hingham Municipal Lighting Plant",
"vehicleType": "PHEV battery greater than 15 kWh",
"amountCents": 30000
},
{
"exampleUtility": "Hingham Municipal Lighting Plant",
"vehicleType": "PHEV battery less than 15 kWh",
"amountCents": 20000
},
{
"exampleUtility": "West Boylston Municipal Light Plant",
"vehicleType": "fully electric vehicle",
"maxAwardCents": 70000
},
{
"exampleUtility": "West Boylston Municipal Light Plant",
"vehicleType": "telematics curtailment",
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
"evidenceText": "NextZero town pages publish local Level 2 smart-charger rebate tiers tied to scheduled charging enrollment, with amounts varying by MLP and vehicle type.",
"sourceUrls": [
"[https://nextzero.org/](https://nextzero.org/)",
"[https://nextzero.org/west-boylston/ev-charger-program/](https://nextzero.org/west-boylston/ev-charger-program/)",
"[https://nextzero.org/hingham/ev-charger-program/](https://nextzero.org/hingham/ev-charger-program/)",
"[https://rebates.nextzero.org/](https://rebates.nextzero.org/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "Supported only when narrowed to eligible smart Level 2 charger purchase for participating municipal utility customers."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Source specifically supports Wi-Fi-equipped Smart Level 2 chargers paired with scheduled charging enrollment."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Some town pages state customers receiving the EV charger rebate are not eligible for Connected Homes incentives for 36 months."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://nextzero.org/](https://nextzero.org/)",
"[https://nextzero.org/west-boylston/ev-charger-program/](https://nextzero.org/west-boylston/ev-charger-program/)",
"[https://nextzero.org/hingham/ev-charger-program/](https://nextzero.org/hingham/ev-charger-program/)",
"[https://rebates.nextzero.org/](https://rebates.nextzero.org/)"
],
"evidenceText": "The program has source-backed town-level rebate tiers, but the exact amount depends on participating MLP and vehicle type.",
"reasoningNotes": "Use local MLP as a required input instead of a single statewide Massachusetts amount.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22736",
"opportunityName": "NextZero Residential Battery Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"per_unit_award"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "per_unit_award",
"timing": "post_purchase_rebate",
"formulaText": "Residential behind-the-meter lithium-ion battery rebate equals battery rated storage capacity in kWh multiplied by $100/kWh, for eligible Duracell, Emporia, or Tesla Powerwall systems from 7.5 kWh to 20 kWh. Connected Homes enrollment is required.",
"amountCents": null,
"percent": null,
"rate": 100,
"rateUnit": "USD_per_kWh",
"minAmountCents": 75000,
"maxAmountCents": 200000,
"caps": {
"maxAwardCents": 200000,
"minAwardCents": 75000,
"maxPercentOfEligibleCost": null,
"maxUnits": 20,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"residential behind-the-meter lithium-ion battery system",
"Duracell, Emporia, or Tesla Powerwall batteries",
"7.5 to 20 kWh capacity"
],
"ineligibleCostCategories": [
"HVAC, heat pumps, EV chargers, audits, appliances, or weatherization",
"battery brands not approved by current program",
"systems outside capacity range"
],
"requiredInputs": [
"participating municipal utility",
"battery brand",
"rated storage capacity kWh",
"Connected Homes enrollment",
"contractor invoice",
"electric bill or account information"
],
"missingInputsForTypicalRetroFiEstimate": [
"battery brand",
"rated storage capacity kWh",
"participating utility",
"Connected Homes enrollment"
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
"evidenceText": "NextZero publishes a $100/kWh residential battery rebate for eligible brands with 7.5 to 20 kWh capacity and Connected Homes enrollment.",
"sourceUrls": [
"[https://nextzero.org/templeton/battery-program/](https://nextzero.org/templeton/battery-program/)",
"[https://nextzero.org/shrewsbury/battery-program/battery-program-application/](https://nextzero.org/shrewsbury/battery-program/battery-program-application/)",
"[https://rebates.nextzero.org/](https://rebates.nextzero.org/)",
"[https://www.tesla.com/support/energy/virtual-power-plant/MMWEC](https://www.tesla.com/support/energy/virtual-power-plant/MMWEC)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "battery_storage_system",
"action": "keep",
"reason": "Source-backed for eligible residential behind-the-meter lithium-ion battery systems at $100/kWh."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "No HVAC or heat pump work is supported by this battery-specific rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Enrollment in Connected Homes is required and may provide separate monthly peak-event incentives; this rebate should not be merged with HVAC or EV offers."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://nextzero.org/templeton/battery-program/](https://nextzero.org/templeton/battery-program/)",
"[https://nextzero.org/shrewsbury/battery-program/battery-program-application/](https://nextzero.org/shrewsbury/battery-program/battery-program-application/)",
"[https://rebates.nextzero.org/](https://rebates.nextzero.org/)",
"[https://www.tesla.com/support/energy/virtual-power-plant/MMWEC](https://www.tesla.com/support/energy/virtual-power-plant/MMWEC)"
],
"evidenceText": "NextZero's battery page gives a direct $100/kWh formula, eligible brands, and a 7.5 to 20 kWh capacity range.",
"reasoningNotes": "Calculation is ready once the battery capacity and participating municipal utility are known.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22323",
"opportunityName": "Baltimore Gas and Electric - EVsmart Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "medium",
"estimateConfidence": "medium",
"cashValueClassifications": [
"tariff_or_rate",
"rebate"
],
"primaryValueModelKinds": [
"tariff_or_rate",
"fixed_tier_amount"
],
"effects": [
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "monthly",
"formulaText": "Vehicle Charging Time-of-Use savings equal eligible EV charging kWh multiplied by the difference between BGE standard residential charging cost and the EV TOU charging rates at the time of use. Current tariff inputs and EV kWh by period are required.",
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
"eligible BGE residential EV or charger enrolled in Vehicle Charging TOU"
],
"ineligibleCostCategories": [
"charger purchase or installation",
"MEA state EVSE rebates",
"commercial charging infrastructure"
],
"requiredInputs": [
"EV charging kWh by TOU period",
"current BGE EV TOU rates",
"standard residential comparison rate",
"eligible EV or charger enrollment"
],
"missingInputsForTypicalRetroFiEstimate": [
"TOU kWh by period",
"current applicable tariff rates"
],
"rateTable": {
"tableId": "bge_evsmart_tou_inputs_required",
"dimensions": [
"rate_component"
],
"rows": [
{
"component": "EV TOU off-peak rate",
"rate": null,
"rateUnit": "USD_per_kWh"
},
{
"component": "EV TOU on-peak rate",
"rate": null,
"rateUnit": "USD_per_kWh"
},
{
"component": "standard residential comparison rate",
"rate": null,
"rateUnit": "USD_per_kWh"
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
"evidenceText": "BGE EVsmart describes a Vehicle Charging TOU rate with lower off-peak EV charging prices and average savings, but current tariff inputs are required.",
"sourceUrls": [
"[https://bge.chooseev.com/](https://bge.chooseev.com/)",
"[https://bge.chooseev.com/ev/about/](https://bge.chooseev.com/ev/about/)",
"[https://bge.chooseev.com/promos/](https://bge.chooseev.com/promos/)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_tier_amount",
"timing": "monthly",
"formulaText": "Smart Charge Management bill credits are up to $120 annually per enrolled device. Support documentation indicates $5 per month for an enrolled vehicle charging on Level 1 and $10 per month for an enrolled vehicle or enrolled Level 2 charger when requirements are met.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 500,
"maxAmountCents": 1000,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": 12000,
"programBudgetCents": null
},
"eligibleCostCategories": [
"eligible EV or Level 2 charger enrolled in Smart Charge Management",
"monthly smart-charging compliance"
],
"ineligibleCostCategories": [
"months without required at-home charging",
"excess overrides or noncompliance",
"unsupported vehicles or chargers"
],
"requiredInputs": [
"enrollment type",
"charger level",
"number of enrolled devices",
"monthly at-home charging and smart-time compliance"
],
"missingInputsForTypicalRetroFiEstimate": [
"enrollment type",
"charger level",
"monthly compliance data"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "bge_scm_monthly_credit",
"selectionInput": "enrollment type",
"rows": [
{
"enrollmentType": "eligible vehicle charging on Level 1",
"amountCentsPerMonth": 500
},
{
"enrollmentType": "eligible vehicle charging on Level 2",
"amountCentsPerMonth": 1000
},
{
"enrollmentType": "eligible enrolled Level 2 charger",
"amountCentsPerMonth": 1000
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "BGE EVsmart lists Smart Charge Management bill credits up to $120 per device annually for eligible EVs or Level 2 chargers.",
"sourceUrls": [
"[https://bge.chooseev.com/promos/](https://bge.chooseev.com/promos/)",
"[https://bge-support.weavegrid.com/hc/en-us/articles/24167818956439-How-do-I-qualify-for-the-Smart-Charge-Management-monthly-bill-credit-When-will-I-receive-it](https://bge-support.weavegrid.com/hc/en-us/articles/24167818956439-How-do-I-qualify-for-the-Smart-Charge-Management-monthly-bill-credit-When-will-I-receive-it)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "Current BGE EVsmart sources support rate and managed-charging bill credits, not charger installation rebates."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "delete_bad_edge",
"reason": "A Level 2 charger can enable enrollment, but the current EVsmart value is TOU or smart-charge bill credits, not installation funding."
}
],
"stackingRules": {
"stackableWithRebates": true,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "BGE says EV TOU and Smart Charge Management can be paired for up to $240 annual savings; Maryland EVSE purchase/install rebates are separate state programs."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://bge.chooseev.com/](https://bge.chooseev.com/)",
"[https://bge.chooseev.com/ev/about/](https://bge.chooseev.com/ev/about/)",
"[https://bge.chooseev.com/promos/](https://bge.chooseev.com/promos/)",
"[https://www.bge.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehicles.aspx](https://www.bge.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehicles.aspx)",
"[https://bge-support.weavegrid.com/hc/en-us/articles/24167818956439-How-do-I-qualify-for-the-Smart-Charge-Management-monthly-bill-credit-When-will-I-receive-it](https://bge-support.weavegrid.com/hc/en-us/articles/24167818956439-How-do-I-qualify-for-the-Smart-Charge-Management-monthly-bill-credit-When-will-I-receive-it)"
],
"evidenceText": "Current BGE EVsmart value is a TOU rate and managed-charging bill credits; charger installation belongs to separate state or other programs.",
"reasoningNotes": "Use tariff inputs for EV TOU and monthly device type for Smart Charge Management; delete both physical installation edges.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22783",
"opportunityName": "Public Charger Grants",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"cash_grant",
"reimbursement"
],
"primaryValueModelKinds": [
"competitive_cost_share",
"capped_percent_of_eligible_cost"
],
"effects": [
{
"effectType": "grant_expected_value",
"cashValueClassification": "cash_grant",
"valueModelKind": "competitive_cost_share",
"timing": "post_installation_reimbursement",
"formulaText": "Competitive RFP EM-008-2026 reimburses awardees up to 80% of total eligible project costs, capped at $200,000 per site, for public Level 2 EV charger projects. A minimum of four ports per site is required. Because awards are competitive, do not include expected value without a probability model.",
"amountCents": null,
"percent": 0.8,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 20000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.8,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": 20000000,
"annualCapCents": null,
"programBudgetCents": 960000000
},
"eligibleCostCategories": [
"public Level 2 EV charging equipment",
"eligible make-ready and project costs allowed by RFP",
"multifamily, business, and public properties in Maine"
],
"ineligibleCostCategories": [
"DC fast chargers under awarded phases",
"private home chargers",
"fleet-only or non-public charging",
"replacements"
],
"requiredInputs": [
"eligible project cost",
"site location in Maine",
"public Level 2 charger design",
"number of ports",
"host-site agreement for public access at least five years",
"RFP response score and award decision"
],
"missingInputsForTypicalRetroFiEstimate": [
"eligible project cost",
"number of ports",
"award probability or award decision",
"site priority status"
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
"evidenceText": "Efficiency Maine offers $9.6 million through a competitive Public Level 2 EV Chargers RFP, reimbursing up to 80% of eligible costs capped at $200,000 per site.",
"sourceUrls": [
"[https://www.efficiencymaine.com/opportunities/](https://www.efficiencymaine.com/opportunities/)",
"[https://www.efficiencymaine.com/rfp-em-008-2026/](https://www.efficiencymaine.com/rfp-em-008-2026/)",
"[https://www.efficiencymaine.com/docs/RFP-EM-008-2026-Public-L2-EV-Chargers-EM-008-2026.pdf](https://www.efficiencymaine.com/docs/RFP-EM-008-2026-Public-L2-EV-Chargers-EM-008-2026.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "dc_fast_charger_installation",
"action": "delete_bad_edge",
"reason": "Current request is for public Level 2 chargers; DC fast-charger phases are listed as awarded or separate."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "Supported only when narrowed to competitive public Level 2 EV charger installations meeting RFP requirements."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Awardees must comply with RFP and federal requirements; grant reimbursement is capped at 80% of eligible costs and $200,000 per site."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.efficiencymaine.com/opportunities/](https://www.efficiencymaine.com/opportunities/)",
"[https://www.efficiencymaine.com/at-work/electric-vehicle-supply-equipment-initiative/](https://www.efficiencymaine.com/at-work/electric-vehicle-supply-equipment-initiative/)",
"[https://www.efficiencymaine.com/rfp-em-008-2026/](https://www.efficiencymaine.com/rfp-em-008-2026/)",
"[https://www.efficiencymaine.com/docs/RFP-EM-008-2026-Public-L2-EV-Chargers-EM-008-2026.pdf](https://www.efficiencymaine.com/docs/RFP-EM-008-2026-Public-L2-EV-Chargers-EM-008-2026.pdf)"
],
"evidenceText": "Efficiency Maine's current opportunity funds public Level 2 EV chargers competitively; DCFC is not the current target.",
"reasoningNotes": "This is calculable as a maximum reimbursement only; competitive probability is required before any expected grant value is included.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22362",
"opportunityName": "East Central Energy - Electric Vehicle Charging Station Rebate",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate",
"tariff_or_rate"
],
"primaryValueModelKinds": [
"fixed_amount",
"tariff_or_rate"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_amount",
"timing": "post_installation_reimbursement",
"formulaText": "ECE offers a $400 bill-credit rebate to install a metered Level 2 charger on either the time-of-use rate or off-peak storage rate. A meter outside the home is required and the rebate is for a primary residence.",
"amountCents": 40000,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 40000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"metered Level 2 charger at primary residence",
"time-of-use or off-peak storage EV charging program"
],
"ineligibleCostCategories": [
"public charging",
"fleet charging",
"commercial charger rebate under residential page",
"unmetered chargers",
"non-primary residence"
],
"requiredInputs": [
"ECE residential member account",
"Level 2 charger installed",
"additional meter installed outside home",
"time-of-use or off-peak storage enrollment",
"primary residence"
],
"missingInputsForTypicalRetroFiEstimate": [
"metering confirmation",
"rate enrollment"
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
"includedInUserFacingTotalDefault": true,
"evidenceText": "ECE's 2026 EV flyer states a $400 bill-credit rebate for installing a metered Level 2 charger on time-of-use or off-peak storage.",
"sourceUrls": [
"[https://www.eastcentralenergy.com/electric-vehicle-charger-rebate](https://www.eastcentralenergy.com/electric-vehicle-charger-rebate)",
"[https://www.eastcentralenergy.com/sites/default/files/documents/Energy%20Services/2026%20programs%20%26%20rebates/EVs_2026.pdf](https://www.eastcentralenergy.com/sites/default/files/documents/Energy%20Services/2026%20programs%20%26%20rebates/EVs_2026.pdf)",
"[https://www.eastcentralenergy.com/rebate-rules](https://www.eastcentralenergy.com/rebate-rules)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "monthly",
"formulaText": "Optional EV charging rates are bill-rate effects: time-of-use rates shown are 7¢/kWh off-peak, 12¢/kWh intermediate, and 35¢/kWh peak; off-peak storage is 5.3¢/kWh when charging is available. Savings require EV kWh by time period compared with the otherwise applicable rate.",
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
"EV charging energy on applicable ECE EV charging rate"
],
"ineligibleCostCategories": [
"energy use outside EV charging meter or outside available off-peak storage hours"
],
"requiredInputs": [
"EV kWh by rate period",
"selected ECE EV rate",
"comparison rate"
],
"missingInputsForTypicalRetroFiEstimate": [
"EV kWh by time period",
"comparison rate"
],
"rateTable": {
"tableId": "ece_2026_ev_charging_rates",
"dimensions": [
"rate_period"
],
"rows": [
{
"ratePeriod": "time-of-use off-peak weekends/holidays and 9 p.m.-10 a.m. weekdays",
"rate": 0.07,
"rateUnit": "USD_per_kWh"
},
{
"ratePeriod": "time-of-use intermediate 10 a.m.-3 p.m. weekdays",
"rate": 0.12,
"rateUnit": "USD_per_kWh"
},
{
"ratePeriod": "time-of-use peak 3 p.m.-9 p.m. weekdays",
"rate": 0.35,
"rateUnit": "USD_per_kWh"
},
{
"ratePeriod": "off-peak storage available hours",
"rate": 0.053,
"rateUnit": "USD_per_kWh"
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
"evidenceText": "ECE's 2026 EV flyer publishes time-of-use and off-peak storage EV charging rates for metered charging.",
"sourceUrls": [
"[https://www.eastcentralenergy.com/sites/default/files/documents/Energy%20Services/2026%20programs%20%26%20rebates/EVs_2026.pdf](https://www.eastcentralenergy.com/sites/default/files/documents/Energy%20Services/2026%20programs%20%26%20rebates/EVs_2026.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "Supported only for residential metered Level 2 charger installation tied to qualifying ECE EV charging rates."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Source specifically requires a metered Level 2 charger to receive the $400 bill-credit rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebates are first-come, first-served, may change or end when funds are exhausted, and apply only to current program-year purchases installed in ECE service area."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.eastcentralenergy.com/electric-vehicle-charger-rebate](https://www.eastcentralenergy.com/electric-vehicle-charger-rebate)",
"[https://www.eastcentralenergy.com/residential-rebates](https://www.eastcentralenergy.com/residential-rebates)",
"[https://www.eastcentralenergy.com/rebate-rules](https://www.eastcentralenergy.com/rebate-rules)",
"[https://www.eastcentralenergy.com/sites/default/files/documents/Energy%20Services/2026%20programs%20%26%20rebates/EVs_2026.pdf](https://www.eastcentralenergy.com/sites/default/files/documents/Energy%20Services/2026%20programs%20%26%20rebates/EVs_2026.pdf)"
],
"evidenceText": "ECE publishes a fixed $400 residential metered Level 2 charger rebate and EV charging rates in its 2026 flyer.",
"reasoningNotes": "Repair from manual review to calculable fixed rebate; rate savings still require EV kWh by time period.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1528",
"opportunityName": "Otter Tail Power Company - Commercial & Industrial Energy Efficiency Grant Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"cash_grant",
"rebate"
],
"primaryValueModelKinds": [
"custom_quote",
"hybrid_rate_plus_cap"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "cash_grant",
"valueModelKind": "custom_quote",
"timing": "post_installation_reimbursement",
"formulaText": "Custom grant amount is determined by Otter Tail Power from a preapproved custom energy-savings proposal based on kilowatt-hours saved, kilowatts of demand reduced, and project costs. Grant amounts will not exceed 75% of project costs or 90% of incremental costs; other caps may apply.",
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
"custom business energy-savings projects",
"compressed-air improvements",
"chiller equipment",
"large adjustable-speed drives",
"process improvements",
"lighting",
"large motors",
"refrigeration",
"efficient electric cooking",
"building envelope improvements",
"waste heat recovery if approved"
],
"ineligibleCostCategories": [
"projects redirected to existing rebates",
"residential measures",
"projects outside Otter Tail Power service territory",
"projects without approved energy savings"
],
"requiredInputs": [
"custom energy-savings proposal",
"estimated annual kWh saved",
"estimated kW demand reduction",
"project cost",
"incremental cost",
"preapproval",
"measurement and verification if required",
"approved grant amount"
],
"missingInputsForTypicalRetroFiEstimate": [
"project-specific kWh savings",
"project-specific kW reduction",
"project cost",
"incremental cost",
"approved grant amount"
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
"evidenceText": "Otter Tail says custom grants are based on kWh saved, kW demand reduced, and project costs, with 75% project-cost and 90% incremental-cost caps.",
"sourceUrls": [
"[https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/](https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/)",
"[https://www.otpco.com/rebates-and-efficiency-programs/business/programs/](https://www.otpco.com/rebates-and-efficiency-programs/business/programs/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "needs_review",
"reason": "Generic HVAC replacement is too broad; only preapproved chiller, heat-recovery, or other custom electric efficiency projects are supported."
},
{
"retrofitTypeId": "waste_heat_recovery",
"action": "keep",
"reason": "Waste or heat recovery can be supported only as a preapproved custom efficiency project with calculated savings and costs."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Some proposals may be handled through existing rebate programs instead of custom grants; grant caps are 75% of project costs and 90% of incremental costs, with other caps possible."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/](https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/)",
"[https://www.otpco.com/rebates-and-efficiency-programs/business/programs/](https://www.otpco.com/rebates-and-efficiency-programs/business/programs/)",
"[https://www.otpco.com/media/pv4pgqyt/2025-program-and-services-guide_final.pdf](https://www.otpco.com/media/pv4pgqyt/2025-program-and-services-guide_final.pdf)",
"[https://www.otpco.com/rebates-and-efficiency-programs/topics/heating-and-cooling/heat-recovery-air-exchangers/](https://www.otpco.com/rebates-and-efficiency-programs/topics/heating-and-cooling/heat-recovery-air-exchangers/)"
],
"evidenceText": "The official page supports custom business grants and caps but not a reusable heat-recovery formula.",
"reasoningNotes": "The cap is source-backed but not enough for a default estimate; use Otter Tail's preapproved grant amount or project-specific savings calculation.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1948",
"opportunityName": "Shakopee Public Utilities - Commercial and Industrial Energy Efficiency Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"hybrid_rate_plus_cap",
"rate_table"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "hybrid_rate_plus_cap",
"timing": "post_installation_reimbursement",
"formulaText": "C&I rebate equals annualized kWh savings multiplied by the applicable tiered rate: first 1 to 250,000 kWh at $0.08/kWh, 250,001 to 400,000 kWh at $0.05/kWh, and 400,001+ kWh at $0.02/kWh, capped at 40% of total project cost including labor. Rebates may be reduced or denied if payback is under one year or exceeds measure life.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 0.4,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"commercial and industrial electric efficiency projects with annualized kWh savings",
"LED lighting retrofit",
"electric HVAC efficiency measures"
],
"ineligibleCostCategories": [
"residential measures",
"projects without measurable kWh savings",
"projects not approved or not completed within required timeframe"
],
"requiredInputs": [
"SPU commercial or industrial account",
"annualized kWh savings",
"total project cost including labor",
"project type",
"online submission and authorization number",
"measure payback and measure life if reviewed"
],
"missingInputsForTypicalRetroFiEstimate": [
"annualized kWh savings",
"project cost",
"approval status"
],
"rateTable": {
"tableId": "shakopee_2026_ci_kwh_rebate",
"dimensions": [
"annualized_kWh_savings_tier"
],
"rows": [
{
"tier": "1 to 250,000 annual kWh saved",
"rate": 0.08,
"rateUnit": "USD_per_kWh_saved"
},
{
"tier": "250,001 to 400,000 annual kWh saved",
"rate": 0.05,
"rateUnit": "USD_per_kWh_saved"
},
{
"tier": "400,001 or more annual kWh saved",
"rate": 0.02,
"rateUnit": "USD_per_kWh_saved"
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
"evidenceText": "SPU publishes 2026 C&I rebate tiers by annualized kWh savings, capped at 40% of total project cost including labor.",
"sourceUrls": [
"[https://shakopeeutilities.com/2026-commercial-rebates/](https://shakopeeutilities.com/2026-commercial-rebates/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Supported only for commercial or industrial electric HVAC measures that produce approved annualized kWh savings."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Supported as an electric C&I efficiency measure when annualized kWh savings are approved."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate cannot exceed 40% of total project cost including labor; funds are limited and not guaranteed."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://shakopeeutilities.com/2026-commercial-rebates/](https://shakopeeutilities.com/2026-commercial-rebates/)"
],
"evidenceText": "Shakopee Public Utilities' current page provides a reusable 2026 C&I kWh-savings rate table and project-cost cap.",
"reasoningNotes": "Legacy source-inaccessible status is repaired by the current 2026 official page.",
"humanReviewRequired": false,
"humanReviewReasons": []
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2591"
}
