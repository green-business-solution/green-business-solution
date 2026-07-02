{
"schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
"researchedAt": "2026-07-02",
"source": "gpt_pro",
"batchNumber": 47,
"repairs": [
{
"opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:energy-survey",
"opportunityName": "Energy Survey",
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
"formulaText": "Free business energy survey by SVP engineering staff with a report identifying energy-efficiency improvements, financial analysis, potential rebates, and payback. It is not a direct equipment rebate or water-fixture incentive.",
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
"SVP business customer status",
"business site for survey",
"utility account information"
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
"evidenceText": "SVP describes a free energy survey by an engineer that identifies efficiency improvements, potential rebates, financial analysis, and payback.",
"sourceUrls": [
"[https://www.siliconvalleypower.com/businesses/save-money](https://www.siliconvalleypower.com/businesses/save-money)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "low_flow_fixture_retrofit",
"action": "delete_bad_edge",
"reason": "The source supports an energy audit and efficiency recommendations, not water fixtures or low-flow plumbing retrofits."
}
],
"stackingRules": {
"stackableWithRebates": true,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "The survey may identify separate rebate opportunities, but those require their own eligibility and approval."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.siliconvalleypower.com/businesses/save-money](https://www.siliconvalleypower.com/businesses/save-money)",
"[https://www.siliconvalleypower.com/businesses/rebates](https://www.siliconvalleypower.com/businesses/rebates)"
],
"evidenceText": "SVP Energy Survey is a free technical-assistance service for business customers, not a direct retrofit rebate.",
"reasoningNotes": "Input targets reviewed from uploaded batch file . The fixture match is a false positive from generic language.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308",
"opportunityName": "GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE)",
"repairStatus": "custom_quote_required",
"calculationStatus": "no_calculable_value",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"cash_grant"
],
"primaryValueModelKinds": [
"competitive_max_only",
"custom_quote"
],
"effects": [
{
"effectType": "grant_expected_value",
"cashValueClassification": "cash_grant",
"valueModelKind": "competitive_max_only",
"timing": "application_process",
"formulaText": "Competitive CEC grant for distributed-scale clean hydrogen production facilities up to five metric tons per day, co-located with hydrogen storage and onsite end use. Award amount depends on the solicitation manual, project budget, scoring, and CEC award decision.",
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
"clean hydrogen production equipment",
"hydrogen storage equipment",
"onsite hydrogen end-use equipment",
"project development costs allowed by solicitation"
],
"ineligibleCostCategories": [
"standalone building battery storage",
"general energy storage unrelated to hydrogen project"
],
"requiredInputs": [
"CEC funding request",
"total eligible project budget",
"hydrogen production capacity in metric tons per day",
"hydrogen storage scope",
"onsite hydrogen end-use scope",
"application score or award decision"
],
"missingInputsForTypicalRetroFiEstimate": [
"CEC funding request",
"eligible project budget",
"award probability"
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
"evidenceText": "CEC identifies H2ONSITE as an active competitive solicitation for clean hydrogen production co-located with storage and onsite end use.",
"sourceUrls": [
"[https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite](https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "battery_storage_system",
"action": "delete_bad_edge",
"reason": "The official source describes hydrogen storage, not battery storage or a building battery incentive."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Stacking and cost-share treatment must be determined from the solicitation manual and award agreement."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "2026-08-19 23:59",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite](https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite)",
"[https://ecams.energy.ca.gov/s/login/](https://ecams.energy.ca.gov/s/login/)"
],
"evidenceText": "H2ONSITE is a competitive clean-hydrogen demonstration grant, not a battery-storage retrofit program.",
"reasoningNotes": "No reusable customer-facing formula or probability-backed expected award is available from the public solicitation page.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
"opportunityName": "GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS)",
"repairStatus": "custom_quote_required",
"calculationStatus": "no_calculable_value",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"cash_grant"
],
"primaryValueModelKinds": [
"competitive_max_only",
"competitive_award_range",
"custom_quote"
],
"effects": [
{
"effectType": "grant_expected_value",
"cashValueClassification": "cash_grant",
"valueModelKind": "competitive_max_only",
"timing": "application_process",
"formulaText": "CEC makes up to $22 million available for EV charging infrastructure serving electric school buses. Lane 1 is first-come; Lanes 2 and 3 are competitive. Project award is determined by lane, eligible costs, application details, and award decision.",
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
"programBudgetCents": 2200000000
},
"eligibleCostCategories": [
"electric school bus charging infrastructure",
"eligible school bus site infrastructure costs",
"eligible project costs allowed by solicitation"
],
"ineligibleCostCategories": [
"residential EV chargers",
"public light-duty corridor charging unrelated to school buses",
"general workplace charging not tied to eligible school-bus deployment"
],
"requiredInputs": [
"funding lane",
"eligible project cost",
"number and type of charging ports",
"electric school bus deployment details",
"LEA or transportation provider pathway",
"first-come status or application score"
],
"missingInputsForTypicalRetroFiEstimate": [
"funding lane",
"eligible project cost",
"award probability"
],
"rateTable": {
"tableId": "cec_recess_public_lane_budgets",
"dimensions": [
"funding_lane"
],
"rows": [
{
"fundingLane": "Lane 1",
"awardBasis": "first-come first-served",
"programBudgetCents": 400000000
},
{
"fundingLane": "Lane 2",
"awardBasis": "competitive",
"programBudgetCents": 900000000
},
{
"fundingLane": "Lane 3",
"awardBasis": "competitive",
"programBudgetCents": 900000000
}
]
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
"evidenceText": "CEC states RECESS provides up to $22 million for EV charging infrastructure for electric school buses through lane-specific funding.",
"sourceUrls": [
"[https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess](https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "The edge is valid only when narrowed to EV charging infrastructure for eligible electric school-bus sites."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Other funding and cost-share treatment must be checked in the solicitation manual and grant agreement."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "2026-08-31 23:59",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess](https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess)",
"[https://ecams.energy.ca.gov/s/login/](https://ecams.energy.ca.gov/s/login/)"
],
"evidenceText": "RECESS is a CEC school-bus charging infrastructure grant with lane-specific first-come and competitive awards.",
"reasoningNotes": "No deterministic per-port rebate formula was found on the public page.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608",
"opportunityName": "GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME)",
"repairStatus": "custom_quote_required",
"calculationStatus": "no_calculable_value",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"cash_grant",
"technical_assistance",
"process_value"
],
"primaryValueModelKinds": [
"competitive_max_only",
"custom_quote",
"non_cash_process_value"
],
"effects": [
{
"effectType": "grant_expected_value",
"cashValueClassification": "cash_grant",
"valueModelKind": "competitive_max_only",
"timing": "application_process",
"formulaText": "CEC competitive grant with up to $10 million available to accelerate EV adoption through incentive navigation, residential charging equipment connection, home charger facilitation, education, outreach, messaging, and related equipment support. Award amount is project-specific.",
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
"programBudgetCents": 1000000000
},
"eligibleCostCategories": [
"EV incentive navigation",
"EV outreach and messaging",
"EV education",
"home charger facilitation",
"limited residential charging equipment support",
"eligible costs allowed by solicitation"
],
"ineligibleCostCategories": [
"generic commercial EV charger installation rebate",
"standalone building energy retrofits",
"residential charger projects outside solicitation scope"
],
"requiredInputs": [
"project scope",
"eligible project budget",
"CEC funding request",
"applicant type",
"application score or award decision"
],
"missingInputsForTypicalRetroFiEstimate": [
"eligible project budget",
"CEC funding request",
"award probability"
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
"evidenceText": "CEC identifies EV HOME as an active competitive grant with up to $10 million for EV hub, outreach, messaging, and equipment activities.",
"sourceUrls": [
"[https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-hub-outreach-messaging-and-equipment-ev-home](https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-hub-outreach-messaging-and-equipment-ev-home)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "move_to_special_workflow",
"reason": "The opportunity is a competitive EV adoption, outreach, and facilitation grant, not a deterministic EV charger installation rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Stacking rules and eligible-cost treatment must be read from the solicitation manual and grant agreement."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "2026-08-18 23:59",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-hub-outreach-messaging-and-equipment-ev-home](https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-hub-outreach-messaging-and-equipment-ev-home)",
"[https://ecams.energy.ca.gov/s/login/](https://ecams.energy.ca.gov/s/login/)"
],
"evidenceText": "EV HOME is a CEC competitive grant for EV adoption support, not a reusable per-charger rebate.",
"reasoningNotes": "The public page states a competitive program budget but not a per-unit formula.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902",
"opportunityName": "GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities",
"repairStatus": "custom_quote_required",
"calculationStatus": "no_calculable_value",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"cash_grant"
],
"primaryValueModelKinds": [
"competitive_cost_share",
"custom_quote"
],
"effects": [
{
"effectType": "grant_expected_value",
"cashValueClassification": "cash_grant",
"valueModelKind": "competitive_cost_share",
"timing": "application_process",
"formulaText": "CEC cost-share funding is available only to applicants that apply for and receive awards under eligible federal geothermal funding opportunities and meet GFO-25-902 requirements. Amount depends on the federal award, eligible cost-share need, and CEC approval.",
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
"federal geothermal project cost share",
"eligible geothermal research or development project costs allowed by solicitation"
],
"ineligibleCostCategories": [
"residential geothermal heat pump installation",
"commercial building ground-source heat pump installation",
"HVAC retrofit costs unrelated to eligible federal geothermal award"
],
"requiredInputs": [
"eligible federal geothermal funding opportunity",
"federal award amount",
"federal cost-share requirement",
"total eligible project budget",
"CEC cost-share request",
"CEC award decision"
],
"missingInputsForTypicalRetroFiEstimate": [
"federal award amount",
"cost-share requirement",
"CEC funding request",
"award probability"
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
"probabilityEvidenceType": "eligibility_only"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "CEC states GFO-25-902 provides cost-share funding to applicants receiving eligible federal geothermal awards.",
"sourceUrls": [
"[https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities](https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "delete_bad_edge",
"reason": "The solicitation concerns federal geothermal energy funding cost share, not building HVAC or ground-source heat pump rebates."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Federal award terms and CEC grant agreement determine cost-share stacking and eligible cost basis."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities](https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities)",
"[https://ecams.energy.ca.gov/s/login/](https://ecams.energy.ca.gov/s/login/)"
],
"evidenceText": "This is a geothermal cost-share grant tied to federal awards, not a geothermal heat-pump incentive.",
"reasoningNotes": "Application deadlines vary by eligible federal funding opportunity table; no generic amount can be estimated.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_SDGE_BUSINESS:program_url:mendotagroup_com_sdge_grid_lodging",
"opportunityName": "GRID-Lodging",
"repairStatus": "custom_quote_required",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate",
"tariff_or_rate"
],
"primaryValueModelKinds": [
"custom_quote",
"tariff_or_rate"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "custom_quote",
"timing": "post_installation_reimbursement",
"formulaText": "Performance incentive is based on actual normalized metered energy savings produced by qualifying lodging projects, valued using time- and season-dependent avoided-cost rates. Rates change yearly and require program screening, 12 months of data, and post-installation meter analysis.",
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
"custom energy efficiency projects",
"meter-based energy efficiency projects",
"lodging facility energy-saving upgrades"
],
"ineligibleCostCategories": [
"automated demand response controls as a standalone measure",
"projects double-counted with other energy-efficiency programs"
],
"requiredInputs": [
"active SDG&E account",
"eligible lodging NAICS category",
"12 months pre-project interval or billing data",
"project measure scope",
"post-installation metered usage",
"program avoided-cost rate schedule",
"aggregator or self-aggregator participation"
],
"missingInputsForTypicalRetroFiEstimate": [
"metered annual savings",
"avoided-cost rates",
"eligible project scope",
"post-installation performance period"
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
"evidenceText": "GRID-Lodging rewards SDG&E lodging customers for projects that save energy, with payments based on actual savings and avoided-cost rates.",
"sourceUrls": [
"[https://mendotagroup.com/sdge-grid-lodging/](https://mendotagroup.com/sdge-grid-lodging/)",
"[https://www.sdge.com/business/save-energy-and-money](https://www.sdge.com/business/save-energy-and-money)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "automated_demand_response_controls",
"action": "delete_bad_edge",
"reason": "GRID-Lodging is a meter-based energy-efficiency incentive for lodging projects, not a demand response controls rebate."
}
],
"stackingRules": {
"stackableWithRebates": false,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Program materials prohibit double-counting incentives with other energy-efficiency programs."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "2027-12-31",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.sdge.com/business/save-energy-and-money](https://www.sdge.com/business/save-energy-and-money)",
"[https://mendotagroup.com/sdge-grid-lodging/](https://mendotagroup.com/sdge-grid-lodging/)"
],
"evidenceText": "GRID-Lodging uses metered savings and avoided-cost valuation, so a quote and program analysis are required.",
"reasoningNotes": "The demand-response match should be removed; savings may come from many qualifying lodging efficiency projects.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3086",
"opportunityName": "IID Energy - Commercial Rebate Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
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
"formulaText": "Commercial custom incentive equals verified annual kWh savings multiplied by the applicable IID CESP measure-category rate. For HVAC and refrigeration, the published rate is $0.25 per annual kWh saved, subject to preliminary analysis and available funds.",
"amountCents": null,
"percent": null,
"rate": 0.25,
"rateUnit": "USD per annual kWh saved for HVAC/Refrigeration",
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
"lighting equipment",
"refrigeration equipment",
"HVAC equipment",
"food service equipment",
"agricultural equipment",
"process equipment",
"control equipment"
],
"ineligibleCostCategories": [
"residential appliances",
"equipment that does not exceed applicable baseline",
"projects without required preliminary analysis"
],
"requiredInputs": [
"annual kWh savings",
"measure category",
"project type",
"baseline standard",
"preliminary energy analysis",
"IID account and service territory"
],
"missingInputsForTypicalRetroFiEstimate": [
"annual kWh savings",
"measure category",
"baseline"
],
"rateTable": {
"tableId": "iid_cesp_custom_energy_solutions_2026",
"dimensions": [
"measure_category",
"project_type"
],
"rows": [
{
"measureCategory": "Lighting Interior",
"projectType": "custom retrofit",
"rate": 0.11,
"rateUnit": "USD per annual kWh saved"
},
{
"measureCategory": "Lighting Exterior",
"projectType": "custom retrofit",
"rate": 0.03,
"rateUnit": "USD per annual kWh saved"
},
{
"measureCategory": "Process Loads",
"projectType": "custom retrofit",
"rate": 0.18,
"rateUnit": "USD per annual kWh saved"
},
{
"measureCategory": "HVAC/Refrigeration",
"projectType": "custom retrofit",
"rate": 0.25,
"rateUnit": "USD per annual kWh saved"
},
{
"measureCategory": "Whole Building",
"projectType": "new construction exceeding Title 24 by at least 10%",
"rate": 0.08,
"rateUnit": "USD per annual kWh saved",
"maxAwardCents": 15000000
},
{
"measureCategory": "Systems Approach",
"projectType": "new construction lighting/process/HVAC",
"rate": null,
"rateUnit": "per CESP Guidelines",
"maxAwardCents": 5000000
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
"evidenceText": "IID publishes CESP rates including $0.25 per annual kWh saved for HVAC and refrigeration custom measures.",
"sourceUrls": [
"[https://www.iid.com/customer-service/save-energy-and-money/your-business/custom-program](https://www.iid.com/customer-service/save-energy-and-money/your-business/custom-program)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "IID lists refrigeration as an eligible commercial custom efficiency category and publishes an HVAC/Refrigeration kWh-savings rate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Projects require IID preliminary energy analysis and are subject to program funding."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.iid.com/customer-service/save-energy-and-money/your-business/custom-program](https://www.iid.com/customer-service/save-energy-and-money/your-business/custom-program)"
],
"evidenceText": "IID CESP has a published kWh-savings rate table for commercial custom measures, including refrigeration.",
"reasoningNotes": "A formula is available once annual kWh savings and measure category are known.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5685",
"opportunityName": "LADWP - Feed-in Tariff (FiT) Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"tariff_or_rate",
"rebate"
],
"primaryValueModelKinds": [
"tariff_or_rate",
"rate_table",
"hybrid_rate_plus_cap"
],
"effects": [
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "monthly",
"formulaText": "FiT revenue equals metered renewable generation sold to LADWP under the Standard Offer Power Purchase Agreement multiplied by the applicable FiT energy price for project size, location, and technology, for a contract term up to 20 years.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": "USD per kWh",
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
"eligible renewable generation project",
"front-of-meter solar PV",
"eligible non-PV renewable generation"
],
"ineligibleCostCategories": [
"behind-the-meter solar bill offset",
"net metering savings",
"customer rooftop solar rebate"
],
"requiredInputs": [
"project capacity kW",
"project location",
"technology type",
"metered monthly generation kWh",
"SOPPA approval",
"available FiT capacity"
],
"missingInputsForTypicalRetroFiEstimate": [
"metered generation kWh",
"project capacity",
"project location",
"approved FiT price"
],
"rateTable": {
"tableId": "ladwp_fit_energy_price_2026",
"dimensions": [
"project_size",
"technology",
"location"
],
"rows": [
{
"projectSize": "30 kW to 500 kW",
"technology": "In-Basin Solar PV",
"rate": 0.145,
"rateUnit": "USD per kWh"
},
{
"projectSize": "30 kW to 500 kW",
"technology": "In-Basin Non-PV",
"rate": 0.115,
"rateUnit": "USD per kWh"
},
{
"projectSize": "30 kW to 500 kW",
"technology": "Owens Valley Solar PV",
"rate": 0.115,
"rateUnit": "USD per kWh"
},
{
"projectSize": "greater than 500 kW to 3 MW",
"technology": "In-Basin Solar PV",
"rate": 0.14,
"rateUnit": "USD per kWh"
},
{
"projectSize": "greater than 500 kW to 3 MW",
"technology": "In-Basin Non-PV",
"rate": 0.11,
"rateUnit": "USD per kWh"
},
{
"projectSize": "greater than 3 MW",
"technology": "In-Basin Solar PV",
"rate": 0.135,
"rateUnit": "USD per kWh"
},
{
"projectSize": "greater than 3 MW",
"technology": "In-Basin Non-PV",
"rate": 0.105,
"rateUnit": "USD per kWh"
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
"evidenceText": "LADWP publishes FiT prices by project size, technology, and location, and buys output for up to 20 years.",
"sourceUrls": [
"[https://www.ladwp.com/fit](https://www.ladwp.com/fit)"
]
},
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "For eligible carport and canopy projects, one-time capacity incentive equals installed project watts multiplied by the applicable $/W rate based on project size and disadvantaged-community status.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": "USD per watt",
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
"eligible solar carport",
"eligible solar canopy"
],
"ineligibleCostCategories": [
"non-carport rooftop solar",
"behind-the-meter solar rebate"
],
"requiredInputs": [
"installed carport or canopy watts",
"project size tier",
"disadvantaged-community status"
],
"missingInputsForTypicalRetroFiEstimate": [
"installed watts",
"DAC status",
"approved carport or canopy eligibility"
],
"rateTable": {
"tableId": "ladwp_fit_carport_canopy_capacity_incentive_2026",
"dimensions": [
"project_size",
"dac_status"
],
"rows": [
{
"projectSize": "under 500 kW",
"dacStatus": "disadvantaged community",
"rate": 1.7,
"rateUnit": "USD per watt"
},
{
"projectSize": "under 500 kW",
"dacStatus": "all other",
"rate": 1.5,
"rateUnit": "USD per watt"
},
{
"projectSize": "500 kW to 3 MW",
"dacStatus": "disadvantaged community",
"rate": 1.4,
"rateUnit": "USD per watt"
},
{
"projectSize": "500 kW to 3 MW",
"dacStatus": "all other",
"rate": 1.2,
"rateUnit": "USD per watt"
},
{
"projectSize": "3 MW to 10 MW",
"dacStatus": "disadvantaged community",
"rate": 1.1,
"rateUnit": "USD per watt"
},
{
"projectSize": "3 MW to 10 MW",
"dacStatus": "all other",
"rate": 0.9,
"rateUnit": "USD per watt"
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
"evidenceText": "LADWP publishes separate $/W carport and canopy capacity incentives by project size and DAC status.",
"sourceUrls": [
"[https://www.ladwp.com/fit](https://www.ladwp.com/fit)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "rooftop_solar_pv",
"action": "keep",
"reason": "Solar PV is eligible only as a FiT renewable generation project selling output to LADWP, not as a behind-the-meter rooftop rebate."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "FiT project economics depend on SOPPA terms and tariff rules; tax treatment and other incentives require project-specific review."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.ladwp.com/fit](https://www.ladwp.com/fit)",
"[https://www.ladwp.com/sites/default/files/2024-10/FiT%20Application%20Package.pdf](https://www.ladwp.com/sites/default/files/2024-10/FiT%20Application%20Package.pdf)"
],
"evidenceText": "LADWP FiT is a recurring power-purchase tariff with published energy prices and separate carport/canopy capacity incentives.",
"reasoningNotes": "This should not be modeled as customer bill savings or a one-time rooftop solar rebate.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_SCE_BUSINESS:sce_source_section:d049d8b8e95077d7:recharge-rebate",
"opportunityName": "ReCharge Rebate",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
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
"timing": "point_of_sale",
"formulaText": "ReCharge rebate equals eligible converted vehicle battery capacity in kWh multiplied by $200/kWh for standard battery-electric retrofits or $300/kWh for vehicle-to-grid-capable retrofits, subject to eligible Class 4 through 6 commercial vehicle requirements.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": "USD per battery kWh",
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
"Class 4 commercial vehicle electric conversion",
"Class 5 commercial vehicle electric conversion",
"Class 6 commercial vehicle electric conversion",
"approved retrofit kit or conversion"
],
"ineligibleCostCategories": [
"EV charger installation",
"charging infrastructure",
"passenger vehicle purchase",
"vehicles outside eligible Class 4 through 6 scope"
],
"requiredInputs": [
"vehicle class",
"vehicle VIN",
"battery capacity kWh",
"vehicle-to-grid capability",
"approved retrofitter or conversion kit",
"SCE account and eligible community status"
],
"missingInputsForTypicalRetroFiEstimate": [
"battery capacity kWh",
"V2G capability",
"approved retrofit eligibility"
],
"rateTable": {
"tableId": "sce_recharge_battery_kwh_rebate",
"dimensions": [
"retrofit_type"
],
"rows": [
{
"retrofitType": "standard battery-electric conversion",
"rate": 200,
"rateUnit": "USD per battery kWh"
},
{
"retrofitType": "vehicle-to-grid-capable battery-electric conversion",
"rate": 300,
"rateUnit": "USD per battery kWh"
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
"evidenceText": "SCE ReCharge materials state rebates are based on battery kWh for eligible Class 4 through 6 vehicle conversions.",
"sourceUrls": [
"[https://www.sce.com/business/smart-energy-solar/evs-for-business](https://www.sce.com/business/smart-energy-solar/evs-for-business)",
"[https://commercialevrebates.sce.com/consumer/recharge](https://commercialevrebates.sce.com/consumer/recharge)",
"[https://commercialevrebates.sce.com/consumer/pdf/SCE_ReCharge_JobAid.pdf](https://commercialevrebates.sce.com/consumer/pdf/SCE_ReCharge_JobAid.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "ReCharge rebates convert existing commercial vehicles to battery-electric operation; charging infrastructure is covered by separate SCE programs."
}
],
"stackingRules": {
"stackableWithRebates": true,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "SCE materials indicate the rebate can stack with most incentives, but claim-specific restrictions should be checked."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.sce.com/business/smart-energy-solar/evs-for-business](https://www.sce.com/business/smart-energy-solar/evs-for-business)",
"[https://commercialevrebates.sce.com/consumer/recharge](https://commercialevrebates.sce.com/consumer/recharge)",
"[https://commercialevrebates.sce.com/consumer/pdf/SCE_ReCharge_JobAid.pdf](https://commercialevrebates.sce.com/consumer/pdf/SCE_ReCharge_JobAid.pdf)",
"[https://commercialevrebates.sce.com/consumer/pdf/SCE_ReCharge_QUICK_Claim_Submission_Checklist.pdf](https://commercialevrebates.sce.com/consumer/pdf/SCE_ReCharge_QUICK_Claim_Submission_Checklist.pdf)"
],
"evidenceText": "SCE ReCharge is a vehicle conversion rebate, not an EV charger installation incentive.",
"reasoningNotes": "The value formula is battery-kWh based and requires vehicle and conversion details.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_SDGE_BUSINESS:program_url:statewide_waterheating_com",
"opportunityName": "Statewide Midstream Water Heating",
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
"timing": "point_of_sale",
"formulaText": "Instant midstream rebate is determined by qualifying commercial or multifamily water-heating measure, efficiency tier, equipment capacity, dwelling units, or collector effective area. Space-heating equipment is excluded.",
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
"commercial gas water heaters",
"commercial tankless water heaters",
"commercial domestic hot water boilers",
"heat pump water heaters",
"split-system heat pump water heaters",
"domestic hot water pump demand controls",
"solar thermal water heating collectors"
],
"ineligibleCostCategories": [
"space heating equipment",
"general HVAC replacement",
"air conditioning",
"solar PV"
],
"requiredInputs": [
"participating utility territory",
"equipment category",
"equipment model",
"efficiency rating",
"tank size gallons",
"input or output capacity kBtuh",
"affected dwelling units",
"collector effective area square feet"
],
"missingInputsForTypicalRetroFiEstimate": [
"equipment category",
"efficiency tier",
"equipment capacity",
"eligible utility territory"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "statewide_midstream_water_heating_2026",
"selectionInput": "water_heating_measure_and_efficiency_tier",
"rows": [
{
"measure": "Commercial natural gas storage water heater",
"tier": "0.64 UEF, 30-50 gallons",
"amountCents": 22050
},
{
"measure": "Commercial natural gas storage water heater",
"tier": "0.68 UEF, 30-50 gallons",
"amountCents": 43200
},
{
"measure": "Commercial large storage water heater",
"tier": "0.90 TE",
"amountCents": 88200,
"alternateRate": 11.76,
"alternateRateUnit": "USD per kBtuh"
},
{
"measure": "Commercial large storage water heater",
"tier": "0.96 TE",
"amountCents": 115200,
"alternateRate": 15.36,
"alternateRateUnit": "USD per kBtuh"
},
{
"measure": "Small instantaneous natural gas water heater",
"tier": "0.81 UEF",
"amountCents": 8800
},
{
"measure": "Small instantaneous natural gas water heater",
"tier": "0.87 UEF",
"amountCents": 96000
},
{
"measure": "Small instantaneous natural gas water heater",
"tier": "0.92 UEF",
"amountCents": 115200
},
{
"measure": "Small instantaneous natural gas water heater",
"tier": "0.96 UEF",
"amountCents": 131600
},
{
"measure": "Large instantaneous natural gas water heater",
"tier": "0.84 TE",
"amountCents": 58800,
"alternateRate": 2.94,
"alternateRateUnit": "USD per kBtuh"
},
{
"measure": "Large instantaneous natural gas water heater",
"tier": "0.90 TE",
"amountCents": 115200,
"alternateRate": 5.76,
"alternateRateUnit": "USD per kBtuh"
},
{
"measure": "Large instantaneous natural gas water heater",
"tier": "0.96 TE",
"amountCents": 225600,
"alternateRate": 11.28,
"alternateRateUnit": "USD per kBtuh"
},
{
"measure": "Commercial small or medium hot water boiler",
"tier": "87% UEF, less than 200 kBtuh",
"amountCents": 29400
},
{
"measure": "Commercial small or medium hot water boiler",
"tier": "92% UEF, less than 200 kBtuh",
"amountCents": 38400
},
{
"measure": "Commercial small or medium hot water boiler",
"tier": "96% UEF, less than 200 kBtuh",
"amountCents": 45200
},
{
"measure": "Commercial large boiler",
"tier": "90% TE, at least 300 kBtuh",
"amountCents": 58800,
"alternateRate": 1.96,
"alternateRateUnit": "USD per kBtuh"
},
{
"measure": "Commercial large boiler",
"tier": "96% TE, at least 300 kBtuh",
"amountCents": 69300,
"alternateRate": 2.31,
"alternateRateUnit": "USD per kBtuh"
},
{
"measure": "Electric heat pump water heater",
"tier": "45-55 gallons",
"minAmountCents": 67620,
"maxAmountCents": 103400
},
{
"measure": "Electric heat pump water heater",
"tier": "greater than 55-75 gallons",
"minAmountCents": 98000,
"maxAmountCents": 131600
},
{
"measure": "Electric heat pump water heater",
"tier": "greater than 75-99.9 gallons",
"minAmountCents": 98000,
"maxAmountCents": 131600
},
{
"measure": "Electric heat pump water heater",
"tier": "greater than 99.9 gallons, 4.30 COP",
"amountCents": 700000
},
{
"measure": "Fuel-switch heat pump water heater",
"tier": "45-55 gallons",
"minAmountCents": 117600,
"maxAmountCents": 131600
},
{
"measure": "Fuel-switch heat pump water heater",
"tier": "greater than 55-75 gallons",
"minAmountCents": 142100,
"maxAmountCents": 169200
},
{
"measure": "Split-system heat pump water heater",
"tier": "multifamily COP 3.0",
"rate": 95,
"rateUnit": "USD per kBtuh output capacity"
},
{
"measure": "Split-system heat pump water heater",
"tier": "commercial UEF 3.0",
"rate": 30,
"rateUnit": "USD per kBtuh output capacity"
},
{
"measure": "Split-system heat pump water heater",
"tier": "commercial COP 4.3",
"rate": 95,
"rateUnit": "USD per kBtuh output capacity"
},
{
"measure": "DHW pump demand control",
"tier": "multifamily or commercial",
"minRate": 3.36,
"maxRate": 113.28,
"rateUnit": "USD per affected dwelling unit"
},
{
"measure": "Solar thermal water heating collector",
"tier": "OG-100 multifamily or commercial",
"rate": 60,
"rateUnit": "USD per effective area square foot"
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funds_confirmed"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "The program publishes 2026 instant rebate amounts and rates for qualifying commercial and multifamily water-heating equipment.",
"sourceUrls": [
"[https://www.statewide-waterheating.com/](https://www.statewide-waterheating.com/)",
"[https://www.statewide-waterheating.com/eligibility/](https://www.statewide-waterheating.com/eligibility/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "The source explicitly concerns water-heating measures and excludes space-heating equipment, so general HVAC replacement is unsupported."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Midstream incentive is delivered through participating distributors or market partners and depends on available funds."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "2026-12-31",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.statewide-waterheating.com/](https://www.statewide-waterheating.com/)",
"[https://www.statewide-waterheating.com/eligibility/](https://www.statewide-waterheating.com/eligibility/)",
"[https://www.statewide-waterheating.com/benefits/](https://www.statewide-waterheating.com/benefits/)"
],
"evidenceText": "Statewide Midstream Water Heating has a current water-heating rebate catalog, not an HVAC incentive.",
"reasoningNotes": "Delete the HVAC edge and remap to water-heating equipment categories.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_SDGE_BUSINESS:program_url:teas_sdge_com",
"opportunityName": "Transportation Electrification Advisory Services (TEAS)",
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
"formulaText": "SDG&E provides advisory collaboration to develop personalized transportation electrification strategies for a customer's fleet. The service has no published cash rebate or direct EV charger installation incentive.",
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
"EV charger hardware",
"EV charger installation labor",
"charging infrastructure construction"
],
"requiredInputs": [
"SDG&E business customer status",
"fleet details",
"electrification planning needs"
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
"evidenceText": "SDG&E describes TEAS as advisor support for personalized fleet electrification strategy, not a direct equipment rebate.",
"sourceUrls": [
"[https://www.sdge.com/business/electric-vehicles/lovelectric](https://www.sdge.com/business/electric-vehicles/lovelectric)",
"[https://teas.sdge.com/](https://teas.sdge.com/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "move_to_special_workflow",
"reason": "EV charging may be discussed in planning, but TEAS itself is technical assistance rather than a physical charger rebate."
}
],
"stackingRules": {
"stackableWithRebates": true,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "TEAS may help identify separate incentives; those programs have separate rules."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.sdge.com/business/electric-vehicles/lovelectric](https://www.sdge.com/business/electric-vehicles/lovelectric)",
"[https://teas.sdge.com/](https://teas.sdge.com/)"
],
"evidenceText": "TEAS is a non-cash fleet electrification advisory workflow.",
"reasoningNotes": "Do not count TEAS as EV charger installation savings.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22753",
"opportunityName": "City and County of Denver - Solar Rebate",
"repairStatus": "custom_quote_required",
"calculationStatus": "estimate_from_range",
"sourceConfidence": "medium",
"estimateConfidence": "low",
"cashValueClassifications": [
"rebate",
"non_cash"
],
"primaryValueModelKinds": [
"custom_quote",
"capped_percent_of_eligible_cost"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "custom_quote",
"timing": "upfront",
"formulaText": "Denver group-buying participants may save up to 10% compared with average installation cost. Actual savings depend on program intake, site review, selected installer, final quote, and any partner funding confirmed through the current pathway.",
"amountCents": null,
"percent": 10,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 10,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"residential solar installation through group-buying pathway"
],
"ineligibleCostCategories": [
"commercial solar unless separately confirmed",
"solar thermal",
"unrelated electrification measures"
],
"requiredInputs": [
"Denver residential property status",
"solar group-buy intake completion",
"installer site review",
"final solar quote",
"comparison baseline or average installation cost",
"confirmed partner funding"
],
"missingInputsForTypicalRetroFiEstimate": [
"final quote",
"confirmed discount",
"baseline average installation cost"
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
"evidenceText": "Denver states participants can save up to 10% through group buying, with final quote and partner funding determining actual value.",
"sourceUrls": [
"[https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Efficient-Buildings-and-Homes/Group-Buying-Programs](https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Efficient-Buildings-and-Homes/Group-Buying-Programs)",
"[https://switchtogether.com/en/solar/denver/home](https://switchtogether.com/en/solar/denver/home)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "rooftop_solar_pv",
"action": "keep",
"reason": "The official Denver pathway supports residential solar group-buying; value remains quote-dependent."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": true,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Partner funding and federal tax-credit interactions require final quote and current program terms."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Efficient-Buildings-and-Homes/Group-Buying-Programs](https://www.denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Efficient-Buildings-and-Homes/Group-Buying-Programs)",
"[https://switchtogether.com/en/solar/denver/home](https://switchtogether.com/en/solar/denver/home)",
"[https://switchtogether.com/en/solar/denver/info/denver-solar-rebate-program](https://switchtogether.com/en/solar/denver/info/denver-solar-rebate-program)"
],
"evidenceText": "Denver’s current source supports group-buying solar discounts, not a deterministic rebate table.",
"reasoningNotes": "Use a cap-only quote workflow; do not treat up to 10% as guaranteed savings.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5558",
"opportunityName": "City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"cash_grant"
],
"primaryValueModelKinds": [
"capped_percent_of_eligible_cost",
"competitive_max_only"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "capped_percent_of_eligible_cost",
"timing": "post_installation_reimbursement",
"formulaText": "Commercial and multifamily rebates generally cover 50% of eligible project cost, capped at $25,000 for standard participants or $50,000 for Community Priority Participants, for qualifying existing-building efficiency and electrification measures.",
"amountCents": null,
"percent": 50,
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
"perSiteCapCents": 5000000,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"heat pump space heating",
"heat recovery ventilation",
"fuel-switching HVAC",
"building controls",
"insulation and air sealing",
"commercial induction cooking",
"eligible design or commissioning assistance"
],
"ineligibleCostCategories": [
"generic like-for-like HVAC replacement without qualifying efficiency or electrification",
"projects outside CORE geography",
"EV charging outside Aspen Electric where applicable"
],
"requiredInputs": [
"property type",
"county or service geography",
"eligible project cost",
"participant priority category",
"measure type",
"CORE preapproval requirements"
],
"missingInputsForTypicalRetroFiEstimate": [
"eligible project cost",
"participant priority category",
"measure eligibility"
],
"rateTable": {
"tableId": "core_commercial_multifamily_rebate_caps",
"dimensions": [
"participant_category"
],
"rows": [
{
"participantCategory": "standard",
"percent": 50,
"maxAwardCents": 2500000
},
{
"participantCategory": "Community Priority Participant",
"percent": 50,
"maxAwardCents": 5000000
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
"evidenceText": "CORE publishes 50% commercial and multifamily rebate caps of $25,000 standard and $50,000 for priority participants.",
"sourceUrls": [
"[https://www.aspencore.org/commercial-multifamily-funding](https://www.aspencore.org/commercial-multifamily-funding)",
"[https://www.aspencore.org/funding-criteria](https://www.aspencore.org/funding-criteria)"
]
},
{
"effectType": "grant_expected_value",
"cashValueClassification": "cash_grant",
"valueModelKind": "competitive_max_only",
"timing": "application_process",
"formulaText": "CORE implementation grants for larger, long-term, impactful existing-building projects may provide up to $200,000 when rebates are insufficient. Grant award depends on greenhouse-gas impact analysis, application review, and available funds.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 20000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"implementation project costs for larger efficiency or electrification projects"
],
"ineligibleCostCategories": [
"design-only work where handled through rebates",
"projects without CORE greenhouse-gas impact review"
],
"requiredInputs": [
"eligible project cost",
"greenhouse-gas impact analysis",
"CORE grant application",
"rebate insufficiency rationale",
"award decision"
],
"missingInputsForTypicalRetroFiEstimate": [
"grant request",
"GHG impact analysis",
"award probability"
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
"evidenceText": "CORE states grants can reach $200,000 for larger implementation projects, with rolling applications as funds allow.",
"sourceUrls": [
"[https://www.aspencore.org/commercial-multifamily-funding](https://www.aspencore.org/commercial-multifamily-funding)",
"[https://www.aspencore.org/funding-criteria](https://www.aspencore.org/funding-criteria)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Keep only when narrowed to CORE-qualified heat pump, heat recovery, fuel-switching, or high-efficiency electrification HVAC work."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": true,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "CORE and partner incentives must be reviewed project-by-project; grants are used where rebates are insufficient."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.aspencore.org/grants-and-funding-programs](https://www.aspencore.org/grants-and-funding-programs)",
"[https://www.aspencore.org/funding-criteria](https://www.aspencore.org/funding-criteria)",
"[https://www.aspencore.org/commercial-multifamily-funding](https://www.aspencore.org/commercial-multifamily-funding)",
"[https://www.aspencore.org/residential-rebates-updated](https://www.aspencore.org/residential-rebates-updated)"
],
"evidenceText": "CORE publishes rebate caps and grant maximums for qualifying efficiency and electrification projects.",
"reasoningNotes": "Generic HVAC replacement remains overbroad; only qualifying CORE measures should keep the edge.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:3580",
"opportunityName": "Delta-Montrose Electric Association - Residential Weatherization Rebate Program",
"repairStatus": "non_monetary_workflow",
"calculationStatus": "non_monetary_workflow",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"technical_assistance",
"process_value",
"non_cash"
],
"primaryValueModelKinds": [
"non_cash_process_value",
"no_calculable_value"
],
"effects": [
{
"effectType": "process_value",
"cashValueClassification": "technical_assistance",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "DMEA offers free walk-through audits and, for qualifying low-income members through partner weatherization agencies, free weatherization services selected after a comprehensive audit. No public dollar formula or rebate schedule is published for a typical project estimate.",
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
"weatherization services",
"insulation",
"duct sealing",
"appliance replacement",
"lighting upgrades",
"furnace replacement"
],
"ineligibleCostCategories": [
"commercial projects",
"non-DMEA member projects",
"general home improvements not selected by audit"
],
"requiredInputs": [
"DMEA residential member status",
"income qualification for free weatherization",
"home audit results",
"partner agency approval"
],
"missingInputsForTypicalRetroFiEstimate": [
"audit-selected measures",
"program service valuation",
"income-qualified pathway approval"
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
"evidenceText": "DMEA describes free walk-through audits and free low-income weatherization services selected after an audit, without a published dollar formula.",
"sourceUrls": [
"[https://www.dmea.com/efficiency](https://www.dmea.com/efficiency)",
"[https://dmea.com/free-home-weatherization](https://dmea.com/free-home-weatherization)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "energy_audit",
"action": "keep",
"reason": "DMEA explicitly offers free walk-through audits and audit-driven weatherization services for qualifying residential members."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Weatherization services are provided through partner agencies; separate rebates should be evaluated independently."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://www.dmea.com/efficiency](https://www.dmea.com/efficiency)",
"[https://dmea.com/free-home-weatherization](https://dmea.com/free-home-weatherization)",
"[https://programs.dsireusa.org/system/program/detail/3580/delta-montrose-electric-association-residential-weatherization-rebate-program](https://programs.dsireusa.org/system/program/detail/3580/delta-montrose-electric-association-residential-weatherization-rebate-program)"
],
"evidenceText": "DMEA weatherization is best represented as non-cash audit and service delivery, not a calculable rebate.",
"reasoningNotes": "Do not force free audit or weatherization service into a one-time cash estimate without a published valuation.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22160",
"opportunityName": "Electric Vehicle Fast-Charging Plazas Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "medium",
"estimateConfidence": "low",
"cashValueClassifications": [
"cash_grant",
"reimbursement"
],
"primaryValueModelKinds": [
"capped_percent_of_eligible_cost",
"competitive_cost_share"
],
"effects": [
{
"effectType": "grant_expected_value",
"cashValueClassification": "cash_grant",
"valueModelKind": "capped_percent_of_eligible_cost",
"timing": "application_process",
"formulaText": "Colorado EV Fast-Charging Plazas grants may fund up to 80% of eligible project costs at each public DC fast-charging plaza site. Award requires eligible site, public DCFC scope, application approval, and continuous public-use commitments.",
"amountCents": null,
"percent": 80,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 80,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"public DC fast charging plaza equipment",
"eligible installation costs",
"site electrical infrastructure",
"battery storage tied to EV charging plaza where allowed"
],
"ineligibleCostCategories": [
"residential EV chargers",
"Level 2-only projects",
"private non-public charging",
"battery storage unrelated to EV charging"
],
"requiredInputs": [
"eligible project cost",
"site location",
"number of DC fast-charging ports",
"charger power rating",
"public access commitment",
"application score or award decision"
],
"missingInputsForTypicalRetroFiEstimate": [
"eligible project cost",
"award decision",
"current round per-site cap"
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
"evidenceText": "Available sources describe grants up to 80% of eligible costs for public DC fast-charging plaza projects in Colorado.",
"sourceUrls": [
"[https://energyoffice.colorado.gov/ev-fast-charging-plazas](https://energyoffice.colorado.gov/ev-fast-charging-plazas)",
"[https://socgov27.my.site.com/CEOEVGrants/s/](https://socgov27.my.site.com/CEOEVGrants/s/)",
"[https://afdc.energy.gov/laws/12432](https://afdc.energy.gov/laws/12432)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "The edge is valid only when narrowed to public DC fast-charging plazas, not residential or Level 2-only charging."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Cost-share and stacking must be confirmed in the current Colorado Energy Office application guide."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://energyoffice.colorado.gov/ev-fast-charging-plazas](https://energyoffice.colorado.gov/ev-fast-charging-plazas)",
"[https://socgov27.my.site.com/CEOEVGrants/s/](https://socgov27.my.site.com/CEOEVGrants/s/)",
"[https://afdc.energy.gov/laws/12432](https://afdc.energy.gov/laws/12432)",
"[https://programs.dsireusa.org/system/program/detail/22160/electric-vehicle-fast-charging-plazas-program](https://programs.dsireusa.org/system/program/detail/22160/electric-vehicle-fast-charging-plazas-program)"
],
"evidenceText": "The EV charger edge is source-backed only for public DCFC plazas with grant approval.",
"reasoningNotes": "The official CEO page was difficult to access directly; AFDC and the state portal support the cost-share model but not all caps.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Confirm current Colorado Energy Office round guide, per-site caps, and application deadline before production use."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22763",
"opportunityName": "High Country Conservation - Solarize Summit",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"capped_percent_of_eligible_cost",
"fixed_tier_amount",
"custom_quote"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "capped_percent_of_eligible_cost",
"timing": "upfront",
"formulaText": "Solarize Summit installer discount equals 5% of the qualifying solar installation quote, capped at $2,000, when the participant uses the program process and selected installer.",
"amountCents": null,
"percent": 5,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 200000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 5,
"maxUnits": null,
"perCustomerCapCents": 200000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"solar PV installation through Solarize Summit"
],
"ineligibleCostCategories": [
"projects outside Solarize Summit process",
"statewide Colorado solar projects outside local service area"
],
"requiredInputs": [
"final installer quote",
"Solarize Summit participation",
"contract execution by campaign deadline",
"project location"
],
"missingInputsForTypicalRetroFiEstimate": [
"final quote",
"program participation confirmation"
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
"evidenceText": "Solarize Summit states Active Energies Solar provides a 5% discount capped at $2,000.",
"sourceUrls": [
"[https://highcountryconservation.org/solarize-summit/](https://highcountryconservation.org/solarize-summit/)"
]
},
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_tier_amount",
"timing": "upfront",
"formulaText": "Local government upfront discounts are available up to $1,650 for eligible residents of listed Summit County jurisdictions, first-come, first-served while funds last.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 165000,
"caps": {
"maxAwardCents": 165000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": 165000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"local solar PV installation discount"
],
"ineligibleCostCategories": [
"properties outside eligible local jurisdictions"
],
"requiredInputs": [
"eligible local jurisdiction",
"Solarize Summit participation",
"available local funds",
"contract execution by campaign deadline"
],
"missingInputsForTypicalRetroFiEstimate": [
"jurisdiction-specific discount amount",
"funding availability"
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
"evidenceText": "The 2026 Solarize Summit page lists local government upfront discounts up to $1,650 while funds last.",
"sourceUrls": [
"[https://highcountryconservation.org/solarize-summit/](https://highcountryconservation.org/solarize-summit/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "rooftop_solar_pv",
"action": "keep",
"reason": "Solarize Summit directly supports local solar PV installation discounts through the campaign."
}
],
"stackingRules": {
"stackableWithRebates": true,
"stackableWithTaxCredits": true,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Additional Solarize or local discounts may be quote-dependent; federal tax-credit treatment should be handled separately."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "2026-07-15",
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://highcountryconservation.org/solarize-summit/](https://highcountryconservation.org/solarize-summit/)"
],
"evidenceText": "Solarize Summit publishes a 5% installer discount cap and local upfront discount cap for 2026.",
"reasoningNotes": "Do not count broader up-to-25% campaign language without the final quote and confirmed discount stack.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22083",
"opportunityName": "San Isabel Electric Association - Commercial Lighting Rebate Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "no_calculable_value",
"sourceConfidence": "high",
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
"timing": "post_purchase_rebate",
"formulaText": "Commercial lighting rebate is available for qualifying LED equipment purchased by SIEA members, but the current public page does not expose the LED rebate list amounts. Rebate must be calculated from the current LED rebate list or Empower application.",
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
"qualifying LED commercial lighting equipment",
"commercial indoor LED lighting where currently qualified",
"commercial outdoor LED lighting where currently qualified",
"LED signage where currently qualified",
"pole-mounted LED fixtures where currently qualified"
],
"ineligibleCostCategories": [
"residential lighting",
"non-lighting measures",
"projects by non-SIEA members"
],
"requiredInputs": [
"SIEA member status",
"qualifying equipment type",
"current LED rebate list amount",
"invoice or receipt date",
"proof of purchase",
"completed application within 120 days"
],
"missingInputsForTypicalRetroFiEstimate": [
"current LED rebate list",
"qualifying fixture count",
"per-fixture rebate amount"
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
"evidenceText": "SIEA confirms commercial LED lighting rebates for qualifying equipment but does not expose current rebate-list amounts in accessible text.",
"sourceUrls": [
"[https://siea.com/empower-commercial-lighting-efficiency/](https://siea.com/empower-commercial-lighting-efficiency/)",
"[https://siea.com/empower/](https://siea.com/empower/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "SIEA supports commercial LED lighting rebates, but current measure amounts require the LED rebate list or Empower confirmation."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate availability and equipment list must be confirmed with SIEA or Empower."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "within 120 days of invoice or receipt date",
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://siea.com/empower-commercial-lighting-efficiency/](https://siea.com/empower-commercial-lighting-efficiency/)",
"[https://siea.com/empower/](https://siea.com/empower/)",
"[https://siea.com/uncategorized/aguilar-streetlight-project/](https://siea.com/uncategorized/aguilar-streetlight-project/)"
],
"evidenceText": "SIEA confirms the lighting rebate but not a public calculable rate table.",
"reasoningNotes": "A source-backed amount cannot be produced without the current LED rebate list.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Obtain the current SIEA LED rebate list or application form to calculate fixture-level amounts."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5295",
"opportunityName": "Xcel Energy - Solar Rewards Program",
"repairStatus": "custom_quote_required",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "medium",
"estimateConfidence": "low",
"cashValueClassifications": [
"tariff_or_rate"
],
"primaryValueModelKinds": [
"tariff_or_rate",
"custom_quote"
],
"effects": [
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "monthly",
"formulaText": "Solar Rewards REC payment credit equals metered solar production kWh multiplied by the REC purchase contract rate. The applicable cents-per-kWh REC rate is contract- and program-specific and must be obtained from Xcel's application or executed agreement.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": "USD per solar production kWh",
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
"solar photovoltaic system production",
"renewable energy credits under Solar Rewards contract"
],
"ineligibleCostCategories": [
"window replacement",
"building envelope upgrades",
"non-solar retrofits"
],
"requiredInputs": [
"monthly solar production kWh",
"REC purchase contract rate",
"system size",
"Xcel Colorado electric customer status",
"approved Solar Rewards application"
],
"missingInputsForTypicalRetroFiEstimate": [
"REC contract rate",
"monthly solar production kWh",
"program capacity or enrollment approval"
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
"evidenceText": "Xcel Solar Rewards is a production or REC payment program; the payment requires the contract rate and solar production.",
"sourceUrls": [
"[https://co.my.xcelenergy.com/s/renewable/solar-rewards](https://co.my.xcelenergy.com/s/renewable/solar-rewards)",
"[https://co.my.xcelenergy.com/s/renewable/solar-application-process](https://co.my.xcelenergy.com/s/renewable/solar-application-process)",
"[https://www.xcelenergy.com/staticfiles/xe-responsive/Programs%20and%20Rebates/Residential/CO-Solar-Rewards-FAQ.pdf](https://www.xcelenergy.com/staticfiles/xe-responsive/Programs%20and%20Rebates/Residential/CO-Solar-Rewards-FAQ.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "window_replacement",
"action": "delete_bad_edge",
"reason": "The matched word window is unrelated; Solar Rewards applies to solar PV and REC production, not building windows."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": true,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Solar REC contract terms and federal tax treatment should be evaluated separately."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "unknown"
},
"sourceUrlsChecked": [
"[https://co.my.xcelenergy.com/s/renewable/solar-rewards](https://co.my.xcelenergy.com/s/renewable/solar-rewards)",
"[https://co.my.xcelenergy.com/s/renewable/solar-application-process](https://co.my.xcelenergy.com/s/renewable/solar-application-process)",
"[https://www.xcelenergy.com/company/rates_and_regulations/filings/renewable_energy_plans_and_reports](https://www.xcelenergy.com/company/rates_and_regulations/filings/renewable_energy_plans_and_reports)"
],
"evidenceText": "Xcel Solar Rewards should be modeled as solar production or REC revenue, not window retrofit savings.",
"reasoningNotes": "The current public pages do not expose a universal REC rate for all customers.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22787",
"opportunityName": "Low- to Moderate-Income Solar Pilot Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"cash_grant"
],
"primaryValueModelKinds": [
"capped_percent_of_eligible_cost",
"formula_grant"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "cash_grant",
"valueModelKind": "capped_percent_of_eligible_cost",
"timing": "post_installation_reimbursement",
"formulaText": "For low-income qualified homes, the program provides cost-free solar installation up to 4.0 kW. Monetary value requires installed system cost and confirmed low-income pathway approval.",
"amountCents": null,
"percent": 100,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 100,
"maxUnits": 4,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"residential solar PV installation"
],
"ineligibleCostCategories": [
"weatherization measures",
"commercial solar",
"nonresidential projects"
],
"requiredInputs": [
"income pathway",
"installed system cost",
"system size kW",
"WAP referral or approval",
"approved solar contractor or program pathway"
],
"missingInputsForTypicalRetroFiEstimate": [
"installed system cost",
"system size kW",
"income pathway confirmation"
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
"evidenceText": "DNREC says low-income qualified homes receive cost-free solar installation up to 4.0 kW.",
"sourceUrls": [
"[https://dnrec.delaware.gov/climate-coastal-energy/renewable/lmi-solar-pilot-program/](https://dnrec.delaware.gov/climate-coastal-energy/renewable/lmi-solar-pilot-program/)"
]
},
{
"effectType": "one_time_savings",
"cashValueClassification": "cash_grant",
"valueModelKind": "capped_percent_of_eligible_cost",
"timing": "post_installation_reimbursement",
"formulaText": "For moderate-income qualified households, the program pays 70% of the cost and the homeowner pays 30% for solar systems up to 6.0 kW. Monetary value equals eligible installed cost times 70%, subject to the 6.0 kW system-size cap.",
"amountCents": null,
"percent": 70,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 70,
"maxUnits": 6,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"residential solar PV installation"
],
"ineligibleCostCategories": [
"weatherization measures",
"commercial solar",
"nonresidential projects"
],
"requiredInputs": [
"installed system cost",
"system size kW",
"moderate-income verification",
"approved contractor quote"
],
"missingInputsForTypicalRetroFiEstimate": [
"installed system cost",
"system size kW",
"moderate-income verification"
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
"evidenceText": "DNREC says moderate-income households receive 70% program payment for systems up to 6.0 kW.",
"sourceUrls": [
"[https://dnrec.delaware.gov/climate-coastal-energy/renewable/lmi-solar-pilot-program/](https://dnrec.delaware.gov/climate-coastal-energy/renewable/lmi-solar-pilot-program/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "air_sealing_weatherization",
"action": "delete_bad_edge",
"reason": "Weatherization is an intake or prerequisite pathway for low-income applicants, not the solar pilot’s funded retrofit."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": true,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Tax-credit basis and other incentive interactions require tax guidance and program-specific review."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://dnrec.delaware.gov/climate-coastal-energy/renewable/lmi-solar-pilot-program/](https://dnrec.delaware.gov/climate-coastal-energy/renewable/lmi-solar-pilot-program/)",
"[https://dnrec.delaware.gov/climate-coastal-energy/sustainable-communities/weatherization/](https://dnrec.delaware.gov/climate-coastal-energy/sustainable-communities/weatherization/)"
],
"evidenceText": "DNREC LMI Solar has clear low-income and moderate-income cost-share logic for residential solar, not weatherization.",
"reasoningNotes": "Keep the opportunity but delete the weatherization edge.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22062",
"opportunityName": "Beaches Energy Services - Commercial Energy Efficiency Rebate Program",
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
"valueModelKind": "hybrid_rate_plus_cap",
"timing": "post_installation_reimbursement",
"formulaText": "Commercial lighting rebate equals $150 per kW reduced, capped at $5,000 and not exceeding purchase price. Customer must contact the conservation specialist before installation and submit within 90 days of purchase or installation.",
"amountCents": null,
"percent": null,
"rate": 150,
"rateUnit": "USD per kW reduced",
"minAmountCents": null,
"maxAmountCents": 500000,
"caps": {
"maxAwardCents": 500000,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": 500000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"commercial energy-efficient lighting retrofit",
"lighting equipment",
"licensed contractor installation costs where part of purchase price"
],
"ineligibleCostCategories": [
"new construction",
"non-lighting measures",
"residential lighting",
"projects outside Beaches Energy service territory"
],
"requiredInputs": [
"kW reduction",
"purchase price",
"commercial customer account",
"existing building status",
"pre-installation contact",
"licensed Florida contractor",
"application date"
],
"missingInputsForTypicalRetroFiEstimate": [
"kW reduction",
"purchase price",
"pre-installation review status"
],
"rateTable": {
"tableId": "beaches_energy_commercial_lighting_2024",
"dimensions": [
"measure"
],
"rows": [
{
"measure": "Commercial lighting retrofit",
"rate": 150,
"rateUnit": "USD per kW reduced",
"maxAwardCents": 500000,
"notToExceed": "purchase price"
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
"evidenceText": "Beaches Energy’s commercial lighting form states $150 per kW reduced, up to $5,000, not exceeding purchase price.",
"sourceUrls": [
"[https://www.beachesenergy.com/energy-savings/energy-rebates](https://www.beachesenergy.com/energy-savings/energy-rebates)",
"[https://www.beachesenergy.com/sites/default/files/documents/2025-08/commercial-lighting-rebate-2024.pdf](https://www.beachesenergy.com/sites/default/files/documents/2025-08/commercial-lighting-rebate-2024.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "The official rebate form supports commercial lighting upgrades with a kW-reduction formula."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Rebate will not exceed purchase price and may be altered or canceled by the utility."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "within 90 days of purchase or installation",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.beachesenergy.com/energy-savings/energy-rebates](https://www.beachesenergy.com/energy-savings/energy-rebates)",
"[https://www.beachesenergy.com/sites/default/files/documents/2025-08/commercial-lighting-rebate-2024.pdf](https://www.beachesenergy.com/sites/default/files/documents/2025-08/commercial-lighting-rebate-2024.pdf)",
"[https://beachesenergy.com/sites/default/files/documents/2025-09/rebates-brochure.pdf](https://beachesenergy.com/sites/default/files/documents/2025-09/rebates-brochure.pdf)"
],
"evidenceText": "Beaches Energy has a calculable commercial lighting rebate: $150 per kW reduced, capped at $5,000.",
"reasoningNotes": "Formula is source-backed and requires kW reduction and purchase price.",
"humanReviewRequired": false,
"humanReviewReasons": []
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2735"
}
