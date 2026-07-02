{
"schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
"researchedAt": "2026-07-02",
"source": "gpt_pro",
"batchNumber": 43,
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2208",
"opportunityName": "Seattle City Light - Commercial Energy Efficiency Rebate Programs",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"rate_table",
"measure_catalog",
"hybrid_rate_plus_cap"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "Commercial retrofit incentive equals the published measure rate multiplied by verified annual kWh savings or eligible unit quantity, subject to City Light review, a signed participation agreement, minimum incentive rules, and a 70% eligible project cost cap.",
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
"lighting equipment",
"lighting controls",
"networked lighting controls",
"building automation",
"refrigeration improvements",
"commercial retrofit materials and labor"
],
"ineligibleCostCategories": [
"projects started before City Light approval",
"measures that fail City Light specifications"
],
"requiredInputs": [
"measure_type",
"annual_kWh_savings",
"eligible_project_cost_cents",
"equipment_quantity_if_per_unit",
"control_type_if_lighting",
"refrigeration_measure_type",
"city_light_preapproval_and_participation_agreement"
],
"missingInputsForTypicalRetroFiEstimate": [
"annual_kWh_savings",
"eligible_project_cost_cents",
"measure_type"
],
"rateTable": {
"tableId": "seattle_city_light_2026_commercial_retrofit_rates",
"dimensions": [
"measure_category",
"rate_type"
],
"rows": [
{
"measure_category": "LED fixtures and standard lighting controls",
"rate": 0.28,
"rateUnit": "USD_per_annual_kWh_saved",
"amountCents": null,
"notes": "Prescriptive lighting retrofit rate."
},
{
"measure_category": "Other retrofit kits",
"rate": 0.2,
"rateUnit": "USD_per_annual_kWh_saved",
"amountCents": null,
"notes": "Other lighting kit retrofit rate."
},
{
"measure_category": "Networked lighting controls bonus",
"minAmountCents": 2500,
"maxAmountCents": 5000,
"rateUnit": "USD_per_fixture",
"notes": "Bonus depends on fixture/control category."
},
{
"measure_category": "Building automation system upgrade",
"rate": 0.36,
"rateUnit": "USD_per_annual_kWh_saved",
"notes": "For eligible BAS upgrade savings."
},
{
"measure_category": "Building automation programming",
"rate": 0.06,
"rateUnit": "USD_per_annual_kWh_saved",
"notes": "For eligible BAS programming savings."
},
{
"measure_category": "Refrigeration display cases, doors, and improvements",
"rate": 0.36,
"rateUnit": "USD_per_annual_kWh_saved",
"notes": "For eligible refrigeration savings measures."
},
{
"measure_category": "Anti-sweat heat controls",
"amountCents": 4000,
"rateUnit": "USD_per_unit",
"notes": "Per qualifying control unit."
},
{
"measure_category": "Strip curtains",
"amountCents": 900,
"rateUnit": "USD_per_linear_foot",
"notes": "Per eligible linear foot."
},
{
"measure_category": "ECM display case motor",
"amountCents": 5500,
"rateUnit": "USD_per_unit",
"notes": "Per eligible motor."
},
{
"measure_category": "ECM walk-in motor",
"amountCents": 14000,
"rateUnit": "USD_per_unit",
"notes": "Per eligible motor."
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
"evidenceText": "City Light publishes 2026 commercial retrofit rates for lighting, controls, building automation and refrigeration, with incentives capped at 70% of eligible project cost.",
"sourceUrls": [
"[https://www.seattle.gov/documents/Departments/CityLight/CommercialRetrofitIncentives.pdf](https://www.seattle.gov/documents/Departments/CityLight/CommercialRetrofitIncentives.pdf)",
"[https://www.seattle.gov/documents/Departments/CityLight/CommIndustrialRetrofitReqs.pdf](https://www.seattle.gov/documents/Departments/CityLight/CommIndustrialRetrofitReqs.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "energy_management_system",
"action": "keep",
"reason": "Building automation and energy management style controls are included in the commercial retrofit materials."
},
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "keep",
"reason": "Commercial refrigeration improvements and several refrigeration component measures have published rates."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "LED fixture and lighting control retrofit rates are explicitly listed."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "City Light incentive cap is based on eligible project cost and program review; other incentive deduction rules were not verified."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.seattle.gov/city-light/business-solutions/large-commercial-and-industrial-business-solutions](https://www.seattle.gov/city-light/business-solutions/large-commercial-and-industrial-business-solutions)",
"[https://www.seattle.gov/documents/Departments/CityLight/CommercialRetrofitIncentives.pdf](https://www.seattle.gov/documents/Departments/CityLight/CommercialRetrofitIncentives.pdf)",
"[https://www.seattle.gov/documents/Departments/CityLight/CommIndustrialRetrofitReqs.pdf](https://www.seattle.gov/documents/Departments/CityLight/CommIndustrialRetrofitReqs.pdf)"
],
"evidenceText": "Seattle City Light publishes reusable commercial retrofit rates for lighting, controls, building automation and refrigeration, subject to preapproval and project-cost caps.",
"reasoningNotes": "Target list and legacy edge context came from the uploaded batch prompt . Official 2026 City Light sources publish calculable rates; retained edges match listed commercial measures.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22264",
"opportunityName": "Chugach Electric - Residential EV Charging Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"fixed_amount",
"per_unit_award"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "per_unit_award",
"timing": "post_purchase_rebate",
"formulaText": "Residential credit is $200 per qualifying Level 2 charger or 240-volt receptacle with a mobile Level 2 connector, limited to one credit per charger and no more than two credits per location or account.",
"amountCents": 20000,
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
"perSiteCapCents": 40000,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"Level 2 EV charger",
"240-volt receptacle for mobile Level 2 connector"
],
"ineligibleCostCategories": [
"Level 1-only charging",
"nonresidential charging"
],
"requiredInputs": [
"number_of_qualifying_level_2_chargers_or_receptacles",
"proof_of_home_charging",
"chugach_residential_account_or_location"
],
"missingInputsForTypicalRetroFiEstimate": [
"number_of_qualifying_level_2_chargers_or_receptacles"
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
"evidenceText": "Chugach identifies a $200 residential bill credit for Level 2 home charging, with a two-credit limit per location or account.",
"sourceUrls": [
"[https://www.chugachelectric.com/energy-solutions/beneficial-electrification/electric-vehicles/residential-ev-charging-program](https://www.chugachelectric.com/energy-solutions/beneficial-electrification/electric-vehicles/residential-ev-charging-program)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "The program supports residential home charging when the equipment is Level 2 or an eligible 240-volt receptacle pathway."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Level 2 residential charging is the explicit basis for the $200 credit."
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
"[https://www.chugachelectric.com/energy-solutions/electric-vehicles](https://www.chugachelectric.com/energy-solutions/electric-vehicles)",
"[https://www.chugachelectric.com/energy-solutions/beneficial-electrification/electric-vehicles/residential-ev-charging-program](https://www.chugachelectric.com/energy-solutions/beneficial-electrification/electric-vehicles/residential-ev-charging-program)"
],
"evidenceText": "Official Chugach materials support a fixed $200 residential Level 2 charging credit with one-credit-per-charger and two-credit-per-location limits.",
"reasoningNotes": "Converted the prior source-inaccessible gap to a calculable per-unit credit because the current official page states the credit amount and limits.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1970",
"opportunityName": "Dixie Electric Cooperative - Residential Energy Efficiency Rebate Program",
"repairStatus": "source_inaccessible",
"calculationStatus": "source_inaccessible_repair_failure",
"sourceConfidence": "low",
"estimateConfidence": "low",
"cashValueClassifications": [
"unknown"
],
"primaryValueModelKinds": [
"source_inaccessible"
],
"effects": [
{
"effectType": "no_cash_value",
"cashValueClassification": "unknown",
"valueModelKind": "source_inaccessible",
"timing": "unknown",
"formulaText": "Official snippets confirm heat-pump rebate availability, but accessible current official text did not provide a verified reusable formula, amount, efficiency threshold, cap, or current application table.",
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
"equipment_type",
"tonnage",
"efficiency_rating",
"replacement_scenario",
"current_cooperative_rebate_sheet"
],
"missingInputsForTypicalRetroFiEstimate": [
"current_cooperative_rebate_sheet",
"rebate_amount_or_rate",
"efficiency_threshold"
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
"evidenceText": "Dixie official pages did not expose a current calculable heat-pump amount in accessible text.",
"sourceUrls": [
"[https://www.dixie.coop/energy-efficiency-program](https://www.dixie.coop/energy-efficiency-program)",
"[https://www.dixie.coop/manufacturedhomeprogram](https://www.dixie.coop/manufacturedhomeprogram)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Official snippets support mini-split, dual-fuel, and manufactured-home heat-pump upgrade rebate categories."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "needs_review",
"reason": "Only qualifying heat-pump HVAC appears supported; generic high-efficiency HVAC replacement is too broad."
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
"[https://www.dixie.coop/energy-efficiency-program](https://www.dixie.coop/energy-efficiency-program)",
"[https://www.dixie.coop/manufacturedhomeprogram](https://www.dixie.coop/manufacturedhomeprogram)",
"[http://www.dixie.coop/content.cfm?id=2049&download_id=58#attached_content](http://www.dixie.coop/content.cfm?id=2049&download_id=58#attached_content)"
],
"evidenceText": "Heat-pump rebate categories appear real, but the current official rebate table was not accessible enough to support a formula.",
"reasoningNotes": "Do not import DSIRE-only or snippet-only dollar amounts into RetroFi until the cooperative's current table is accessible.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Official pages or documents did not provide a current verifiable rebate formula or rate table."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5532",
"opportunityName": "Entergy Arkansas - Agricultural Energy Solutions Program Rebates",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"technical_assistance"
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
"formulaText": "Eligible agricultural custom measures receive $0.19 per verified annual kWh saved, capped at 100% of product cost; preapproval is required before ordering, purchasing, or installing equipment.",
"amountCents": null,
"percent": null,
"rate": 0.19,
"rateUnit": "USD_per_annual_kWh_saved",
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
"eligible agricultural electric-saving equipment",
"LED lighting",
"lighting controls",
"VFDs",
"pump tune-ups",
"fans",
"milk pre-coolers",
"vacuum pump controls",
"scroll compressors"
],
"ineligibleCostCategories": [
"free-rider projects",
"projects started before preapproval",
"non-electric-saving measures"
],
"requiredInputs": [
"annual_kWh_savings",
"product_cost_cents",
"measure_type",
"preapproval_status",
"participant_federal_tax_id"
],
"missingInputsForTypicalRetroFiEstimate": [
"annual_kWh_savings",
"product_cost_cents",
"measure_type"
],
"rateTable": {
"tableId": "entergy_arkansas_agricultural_custom_incentive",
"dimensions": [
"measure_pathway"
],
"rows": [
{
"measure_pathway": "custom agricultural electric efficiency",
"rate": 0.19,
"rateUnit": "USD_per_annual_kWh_saved",
"maxPercentOfProductCost": 100
},
{
"measure_pathway": "participant budget limit before September 1",
"rate": 20,
"rateUnit": "percent_of_annual_program_incentive_budget",
"notes": "Applies by Federal Tax ID unless program approval allows more."
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
"evidenceText": "The 2025 agricultural manual lists eligible measures and states custom incentives are $0.19 per kWh saved, up to 100% of product cost.",
"sourceUrls": [
"[https://www.entergyarkansas.com/wp-content/uploads/2025/06/AG_program_manual.pdf](https://www.entergyarkansas.com/wp-content/uploads/2025/06/AG_program_manual.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_refrigeration_equipment",
"action": "delete_bad_edge",
"reason": "Official materials support specific agricultural cooling and compressor measures, not broad high-efficiency refrigeration equipment."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Agricultural LED lighting and controls are listed eligible measures."
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
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.entergyarkansas.com/energyefficiency/business/agricultural-solutions](https://www.entergyarkansas.com/energyefficiency/business/agricultural-solutions)",
"[https://www.entergyarkansas.com/wp-content/uploads/2025/06/AG_program_manual.pdf](https://www.entergyarkansas.com/wp-content/uploads/2025/06/AG_program_manual.pdf)"
],
"evidenceText": "Entergy Arkansas publishes a custom agricultural rate of $0.19 per verified annual kWh saved, subject to product-cost and program caps.",
"reasoningNotes": "The program is calculable for custom savings if annual kWh savings and eligible product cost are supplied.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4345",
"opportunityName": "Mohave Electric Cooperative - Renewable Energy Incentive Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
],
"primaryValueModelKinds": [
"rate_table",
"fixed_amount",
"hybrid_rate_plus_cap"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "SunWatts rebates use published technology-specific rates: PV and wind receive $0.05 per watt up to $2,500 and a 50 kW size limit; solar water heating receives $0.75 per first-year kWh saved; qualifying batteries receive $500.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
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
"member-owned solar PV",
"eligible wind systems",
"solar water heating",
"qualifying battery systems tied to program requirements"
],
"ineligibleCostCategories": [
"leased renewable systems",
"nonmember installations",
"solar thermal space heating"
],
"requiredInputs": [
"technology_type",
"pv_or_wind_system_watts",
"solar_water_heating_first_year_kWh_saved",
"battery_usable_kWh",
"battery_count",
"member_status",
"leased_system_status",
"reservation_preapproval"
],
"missingInputsForTypicalRetroFiEstimate": [
"technology_type",
"system_size_or_first_year_savings"
],
"rateTable": {
"tableId": "mohave_sunwatts_renewable_rebate_rates",
"dimensions": [
"technology"
],
"rows": [
{
"technology": "solar PV",
"rate": 0.05,
"rateUnit": "USD_per_watt",
"maxAmountCents": 250000,
"maxSystemSizeKW": 50
},
{
"technology": "wind",
"rate": 0.05,
"rateUnit": "USD_per_watt",
"maxAmountCents": 250000,
"maxSystemSizeKW": 50
},
{
"technology": "solar water heating",
"rate": 0.75,
"rateUnit": "USD_per_first_year_kWh_saved",
"notes": "Customer contribution rules also apply."
},
{
"technology": "battery storage",
"amountCents": 50000,
"rateUnit": "USD_per_qualifying_battery",
"minUsableKWh": 5
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
"evidenceText": "Mohave publishes renewable rebate rates for PV, wind, solar water heating, and qualifying batteries under SunWatts program rules.",
"sourceUrls": [
"[https://www.mohaveelectric.com/energy-solutions/renewable-energy/sunwatts-renewable-energy-program/](https://www.mohaveelectric.com/energy-solutions/renewable-energy/sunwatts-renewable-energy-program/)",
"[https://www.mohaveelectric.com/wp-content/uploads/Solar-Water-Heating-Application-2020_bn.pdf](https://www.mohaveelectric.com/wp-content/uploads/Solar-Water-Heating-Application-2020_bn.pdf)",
"[https://www.mohaveelectric.com/energy-solutions/rebates/mohave-charged-rebates/](https://www.mohaveelectric.com/energy-solutions/rebates/mohave-charged-rebates/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "rooftop_solar_pv",
"action": "keep",
"reason": "Member-owned solar PV has a published $0.05 per watt incentive with a $2,500 cap."
},
{
"retrofitTypeId": "solar_water_heating_system",
"action": "keep",
"reason": "Solar water heating has a published $0.75 per first-year kWh saved rebate pathway."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": true,
"notes": "Solar water-heating application references customer contribution after federal and state incentives."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.mohaveelectric.com/energy-solutions/renewable-energy/sunwatts-renewable-energy-program/](https://www.mohaveelectric.com/energy-solutions/renewable-energy/sunwatts-renewable-energy-program/)",
"[https://www.mohaveelectric.com/energy-solutions/renewable-energy/sunwatts-renewable-energy-program/solar-water-heating-rebate-application/](https://www.mohaveelectric.com/energy-solutions/renewable-energy/sunwatts-renewable-energy-program/solar-water-heating-rebate-application/)",
"[https://www.mohaveelectric.com/wp-content/uploads/Solar-Water-Heating-Application-2020_bn.pdf](https://www.mohaveelectric.com/wp-content/uploads/Solar-Water-Heating-Application-2020_bn.pdf)",
"[https://www.mohaveelectric.com/energy-solutions/rebates/mohave-charged-rebates/](https://www.mohaveelectric.com/energy-solutions/rebates/mohave-charged-rebates/)"
],
"evidenceText": "Mohave publishes calculable SunWatts rates for PV, wind, solar water heating, and batteries; PV and wind are capped at $2,500.",
"reasoningNotes": "Added technology-specific rates rather than using a generic per-kW assumption.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22149",
"opportunityName": "Clean Transportation Program",
"repairStatus": "needs_human_review",
"calculationStatus": "needs_repair_review",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"cash_grant"
],
"primaryValueModelKinds": [
"competitive_max_only"
],
"effects": [
{
"effectType": "grant_expected_value",
"cashValueClassification": "cash_grant",
"valueModelKind": "competitive_max_only",
"timing": "application_process",
"formulaText": "The Clean Transportation Program is an umbrella funding program. Award value is determined only by a specific CEC solicitation, block grant, or funding opportunity; no standing per-vehicle, per-port, or per-project formula applies.",
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
"specific_cec_solicitation_or_block_grant",
"project_type",
"requested_grant_amount_cents",
"eligible_cost_basis_cents",
"match_requirement",
"application_score_or_award_probability"
],
"missingInputsForTypicalRetroFiEstimate": [
"specific_cec_solicitation_or_block_grant",
"requested_grant_amount_cents",
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
"probabilityEvidenceType": "scoring_criteria_only"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "CEC describes broad clean-transportation funding areas, with award amounts determined by individual solicitations and block grants.",
"sourceUrls": [
"[https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program](https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "electric_vehicle_purchase",
"action": "move_to_special_workflow",
"reason": "Vehicle funding depends on a specific CEC funding opportunity; this is not a standing passenger EV purchase rebate."
},
{
"retrofitTypeId": "ev_charger_installation",
"action": "move_to_special_workflow",
"reason": "EV charging infrastructure can be funded through specific solicitations or block grants, not a generic formula."
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
"[https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program](https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program)",
"[https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-funding-areas-0](https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-funding-areas-0)"
],
"evidenceText": "CEC Clean Transportation Program funding is real but delivered through specific solicitations, so a generic value rule would overstate awards.",
"reasoningNotes": "Classified as a grant workflow requiring solicitation-specific repair rather than a universal incentive estimate.",
"humanReviewRequired": true,
"humanReviewReasons": [
"A specific solicitation or block grant is required before a source-backed formula can be assigned."
]
},
{
"opportunityId": "SOURCE_SDGE_BUSINESS:program_url:myenergycenter_com",
"opportunityName": "Critical Peak Pricing Plans",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
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
"formulaText": "Bill impact equals the customer's otherwise applicable business rate compared with CPP-D charges and credits, using hourly usage, the capacity reservation, and event-period consumption during up to 18 critical peak event days from 4 p.m. to 9 p.m.",
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
"customer_rate_schedule",
"hourly_kWh_usage",
"event_day_4pm_9pm_kWh",
"number_of_CPP_events",
"capacity_reservation_level",
"current_CPP_D_tariff_rates"
],
"missingInputsForTypicalRetroFiEstimate": [
"hourly_kWh_usage",
"capacity_reservation_level",
"current_CPP_D_tariff_rates"
],
"rateTable": {
"tableId": "sdge_cpp_d_tariff_inputs",
"dimensions": [
"tariff_component"
],
"rows": [
{
"tariff_component": "event limit",
"maxEventsPerYear": 18,
"eventWindow": "4 p.m. to 9 p.m.",
"notes": "Critical peak event charges depend on tariff sheet."
},
{
"tariff_component": "rate comparison",
"requiredInput": "current applicable SDG&E tariff and CPP-D tariff",
"notes": "No one-time rebate; recurring bill impact only."
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
"evidenceText": "SDG&E CPP is a business rate plan for shifting or reducing use during called event periods, not an equipment incentive.",
"sourceUrls": [
"[https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response/critical-peak-pricing](https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response/critical-peak-pricing)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "automated_demand_response_controls",
"action": "delete_bad_edge",
"reason": "CPP is a tariff plan; the source does not fund automated demand response controls."
},
{
"retrofitTypeId": "energy_management_system",
"action": "delete_bad_edge",
"reason": "The source does not offer an energy management system installation incentive."
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
"[https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response](https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response)",
"[https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response/critical-peak-pricing](https://www.sdge.com/businesses/savings-center/energy-management-programs/demand-response/critical-peak-pricing)",
"[https://myenergycenter.com/](https://myenergycenter.com/)"
],
"evidenceText": "Critical Peak Pricing is a recurring SDG&E business rate mechanism; physical controls and EMS retrofit edges should be deleted.",
"reasoningNotes": "Use rate/tariff bill modeling only when current tariff inputs and interval load are available.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_25406",
"opportunityName": "Electric Vehicle Submeter Billing",
"repairStatus": "non_monetary_workflow",
"calculationStatus": "non_monetary_workflow",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"tariff_or_rate",
"process_value"
],
"primaryValueModelKinds": [
"tariff_or_rate",
"non_cash_process_value"
],
"effects": [
{
"effectType": "process_value",
"cashValueClassification": "process_value",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Approved EV charging-station submetering lets SDG&E separately measure and bill EV charging energy; any bill effect depends on EV charging kWh, the applicable EV rate, meter data services, and primary-meter adjustments.",
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
"approved_EV_submeter_product",
"approved_meter_data_management_agent",
"EV_charging_kWh",
"qualifying_EV_rate_plan",
"primary_meter_authorization"
],
"missingInputsForTypicalRetroFiEstimate": [
"approved_EV_submeter_product",
"EV_charging_kWh",
"qualifying_EV_rate_plan"
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
"evidenceText": "SDG&E describes EV submeter billing as an approved billing option using approved submeters and meter data services.",
"sourceUrls": [
"[https://www.sdge.com/business/electric-vehicles/lovelectric/ev-charging-station-submeter-billing](https://www.sdge.com/business/electric-vehicles/lovelectric/ev-charging-station-submeter-billing)",
"[https://www.sdge.com/sites/default/files/documents/2025-05/S2590016-EVSubmeterBillingOptionInformation-FS.Final_.pdf](https://www.sdge.com/sites/default/files/documents/2025-05/S2590016-EVSubmeterBillingOptionInformation-FS.Final_.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "The source does not provide an EV charger installation rebate or make-ready incentive."
},
{
"retrofitTypeId": "submetering_energy_monitoring",
"action": "move_to_special_workflow",
"reason": "The supported workflow is EV charging submeter billing, not generic building energy monitoring."
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
"[https://www.sdge.com/business/electric-vehicles/lovelectric/ev-charging-station-submeter-billing](https://www.sdge.com/business/electric-vehicles/lovelectric/ev-charging-station-submeter-billing)",
"[https://www.sdge.com/sites/default/files/documents/2025-05/S2590016-EVSubmeterBillingOptionInformation-FS.Final_.pdf](https://www.sdge.com/sites/default/files/documents/2025-05/S2590016-EVSubmeterBillingOptionInformation-FS.Final_.pdf)"
],
"evidenceText": "EV Submeter Billing is a billing workflow with approved products and data agents, not a rebate for EVSE or monitoring equipment.",
"reasoningNotes": "Classified as a special tariff/process workflow to prevent one-time rebate overstatement.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607",
"opportunityName": "GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO)",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "low",
"cashValueClassifications": [
"cash_grant"
],
"primaryValueModelKinds": [
"competitive_award_range",
"competitive_cost_share",
"competitive_max_only"
],
"effects": [
{
"effectType": "grant_expected_value",
"cashValueClassification": "cash_grant",
"valueModelKind": "competitive_cost_share",
"timing": "application_process",
"formulaText": "Competitive HIPO grants must fund eligible California hydrogen refueling infrastructure. Grant requests are $2,000,000 to $15,000,000 per project, require at least 25% match, and are limited by the $45,000,000 solicitation budget; expected value requires award probability.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": 200000000,
"maxAmountCents": 1500000000,
"caps": {
"maxAwardCents": 1500000000,
"minAwardCents": 200000000,
"maxPercentOfEligibleCost": 75,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": 4500000000
},
"eligibleCostCategories": [
"hydrogen refueling infrastructure",
"eligible station equipment",
"eligible design, engineering, construction, commissioning, and related project costs"
],
"ineligibleCostCategories": [
"battery-electric EV charging",
"standalone stationary fuel cell power systems",
"operations and maintenance alone"
],
"requiredInputs": [
"requested_grant_amount_cents",
"eligible_project_cost_cents",
"match_amount_cents",
"hydrogen_station_scope",
"application_score_or_award_probability"
],
"missingInputsForTypicalRetroFiEstimate": [
"eligible_project_cost_cents",
"requested_grant_amount_cents",
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
"probabilityEvidenceType": "scoring_criteria_only"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "CEC HIPO is a competitive hydrogen infrastructure solicitation with $2M-$15M grant requests, 25% minimum match, and $45M total funding.",
"sourceUrls": [
"[https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project](https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project)",
"[https://www.energy.ca.gov/sites/default/files/2026-04/GFO-25-607_Pre-Application_Workshop_Presentation_ada.pdf](https://www.energy.ca.gov/sites/default/files/2026-04/GFO-25-607_Pre-Application_Workshop_Presentation_ada.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "The solicitation funds hydrogen refueling infrastructure, not battery-electric EV charging."
},
{
"retrofitTypeId": "fuel_cell_system",
"action": "delete_bad_edge",
"reason": "The target is hydrogen refueling infrastructure for FCEVs, not a stationary fuel cell system retrofit."
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
"applicationDeadline": "2026-06-19",
"fundingStatus": "closed"
},
"sourceUrlsChecked": [
"[https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project](https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project)",
"[https://www.energy.ca.gov/sites/default/files/2026-04/GFO-25-607_Pre-Application_Workshop_Presentation_ada.pdf](https://www.energy.ca.gov/sites/default/files/2026-04/GFO-25-607_Pre-Application_Workshop_Presentation_ada.pdf)",
"[https://www.energy.ca.gov/event/funding-workshop/2026-04/pre-application-workshop-gfo-25-607-clean-transportation-program](https://www.energy.ca.gov/event/funding-workshop/2026-04/pre-application-workshop-gfo-25-607-clean-transportation-program)"
],
"evidenceText": "GFO-25-607 has calculable grant request bounds and match rules, but its June 19, 2026 deadline has passed.",
"reasoningNotes": "Use award-range fields only; do not include a user-facing expected value without a probability model.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_SCE_BUSINESS:sce_source_section:bcdeae04c5863d3b:hvac-optimization-program",
"opportunityName": "HVAC Optimization Program",
"repairStatus": "non_monetary_workflow",
"calculationStatus": "non_monetary_workflow",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"technical_assistance",
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
"formulaText": "SCE HVAC Optimization is a business service workflow offering a holistic HVAC system review, installation standards, contractor training, quality control, and performance reporting; no prescriptive equipment rebate formula is published.",
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
"HVAC optimization services",
"retrocommissioning support",
"controls optimization support"
],
"ineligibleCostCategories": [
"standalone EMS purchases",
"generic HVAC equipment replacement"
],
"requiredInputs": [
"facility_type",
"conditioned_square_feet",
"direct_digital_controls_status",
"central_plant_equipment_status",
"SCE_program_enrollment"
],
"missingInputsForTypicalRetroFiEstimate": [
"program_scope",
"facility_controls_status"
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
"evidenceText": "SCE presents HVAC Optimization as services and technical assistance rather than a direct equipment rebate.",
"sourceUrls": [
"[https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement](https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "energy_management_system",
"action": "delete_bad_edge",
"reason": "The source does not support standalone energy management system installation under this program."
},
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "The program is HVAC optimization and retrocommissioning support, not generic equipment replacement."
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
"[https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement](https://www.sce.com/business/save-costs-energy/savings-strategies/building-improvement)"
],
"evidenceText": "SCE HVAC Optimization should be modeled as technical assistance or process value, not a one-time equipment incentive.",
"reasoningNotes": "Moved this opportunity away from physical retrofit savings because no cash formula was published for the listed edges.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5665",
"opportunityName": "Renewable Market Adjusting Tariff (ReMAT)",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
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
"formulaText": "ReMAT revenue equals energy delivered by an RPS-eligible generator under the applicable IOU ReMAT contract and product-category price; current prices, time-of-delivery adjustments, remaining capacity, and contract terms must come from the applicable IOU tariff and CPUC updates.",
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
"IOU",
"RPS_eligible_technology",
"contract_capacity_MW",
"product_category",
"current_ReMAT_price",
"time_of_delivery_adjustment",
"monthly_MWh_delivered",
"contract_term_years"
],
"missingInputsForTypicalRetroFiEstimate": [
"current_ReMAT_price",
"monthly_MWh_delivered",
"product_category",
"IOU"
],
"rateTable": {
"tableId": "cpuc_remat_tariff_inputs",
"dimensions": [
"product_category",
"eligible_generator_limit"
],
"rows": [
{
"product_category": "As-Available Peaking",
"maxProjectMW": 3,
"notes": "Applicable price changes by IOU and CPUC market adjusting mechanism."
},
{
"product_category": "As-Available Non-Peaking",
"maxProjectMW": 3,
"notes": "Applicable price changes by IOU and CPUC market adjusting mechanism."
},
{
"product_category": "Baseload",
"maxProjectMW": 3,
"notes": "Includes eligible baseload renewable generation such as biomass, biomethane, and geothermal power."
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
"evidenceText": "CPUC describes ReMAT as a feed-in tariff for RPS-eligible generators up to 3 MW selling to IOUs.",
"sourceUrls": [
"[https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-power-procurement/rps/rps-procurement-programs/renewable-market-adjusting-tariff](https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-power-procurement/rps/rps-procurement-programs/renewable-market-adjusting-tariff)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "biomass_biogas_energy_system",
"action": "move_to_special_workflow",
"reason": "Biomass and biogas are supported only as RPS-eligible electricity generation selling under the tariff."
},
{
"retrofitTypeId": "ground_source_geothermal_heat_pump",
"action": "delete_bad_edge",
"reason": "ReMAT covers geothermal electricity generation, not ground-source heat-pump HVAC retrofits."
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
"[https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-power-procurement/rps/rps-procurement-programs/renewable-market-adjusting-tariff](https://www.cpuc.ca.gov/industries-and-topics/electrical-energy/electric-power-procurement/rps/rps-procurement-programs/renewable-market-adjusting-tariff)"
],
"evidenceText": "ReMAT is a recurring feed-in tariff for eligible renewable generators, not a building retrofit rebate.",
"reasoningNotes": "Keep only the renewable electricity generation interpretation; delete the geothermal heat-pump false positive.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:4377",
"opportunityName": "SCE - Residential Energy Efficiency Rebate Program",
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
"tariff_or_rate"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_amount",
"timing": "application_process",
"formulaText": "Smart Energy Program participants enrolling through an authorized service provider receive a $75 bill credit and can receive up to $50 in additional June-through-September event credits, for up to $125 tied to smart thermostat demand-response participation.",
"amountCents": 7500,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 12500,
"caps": {
"maxAwardCents": 12500,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"qualifying smart thermostat demand-response enrollment",
"authorized service provider enrollment"
],
"ineligibleCostCategories": [
"broad HVAC replacement",
"nonparticipating thermostat use"
],
"requiredInputs": [
"qualifying_smart_thermostat_model",
"Smart_Energy_Program_enrollment",
"event_participation_status",
"season_participation_months"
],
"missingInputsForTypicalRetroFiEstimate": [
"program_enrollment_status",
"event_participation_status"
],
"rateTable": {
"tableId": "sce_residential_smart_thermostat_credits",
"dimensions": [
"credit_type"
],
"rows": [
{
"credit_type": "Smart Energy Program enrollment",
"amountCents": 7500,
"rateUnit": "USD_one_time_bill_credit"
},
{
"credit_type": "summer event participation",
"maxAmountCents": 5000,
"rateUnit": "USD_seasonal_bill_credits"
},
{
"credit_type": "mercury thermostat disposal",
"amountCents": 3000,
"rateUnit": "USD_rebate",
"notes": "Separate disposal rebate, not a zoning retrofit."
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
"evidenceText": "SCE publishes smart thermostat bill credits tied to Smart Energy Program demand-response participation.",
"sourceUrls": [
"[https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace](https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace)",
"[https://www.sce.com/save-money/savings-programs/enroll-in-savings-programs/smart-energy-program](https://www.sce.com/save-money/savings-programs/enroll-in-savings-programs/smart-energy-program)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "delete_bad_edge",
"reason": "Current SCE materials do not support broad residential HVAC replacement under this opportunity."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "move_to_special_workflow",
"reason": "The supported value is demand-response smart thermostat bill credits, not zoning retrofit savings."
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
"[https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace](https://www.sce.com/save-money/rebates-financial-assistance/rebates-sce-marketplace)",
"[https://www.sce.com/save-money/savings-programs/enroll-in-savings-programs/smart-energy-program](https://www.sce.com/save-money/savings-programs/enroll-in-savings-programs/smart-energy-program)"
],
"evidenceText": "SCE's residential smart thermostat value is a demand-response bill-credit package, with no broad HVAC replacement rebate found.",
"reasoningNotes": "Use demand-response bill-credit modeling rather than treating this as an upfront thermostat or HVAC replacement rebate.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdenergyedge_com",
"opportunityName": "SD Energy Edge",
"repairStatus": "calculation_package_found",
"calculationStatus": "estimate_from_range",
"sourceConfidence": "high",
"estimateConfidence": "medium",
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
"formulaText": "SD Energy Edge rebates use the applicable published measure row and equipment capacity or quantity. Custom incentives require program preapproval before purchase or installation and are based on energy saved.",
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
"qualifying commercial HVAC equipment",
"heat pump equipment",
"outdoor Type B LED lamps",
"water heating",
"refrigeration controls and doors",
"VSDs",
"custom efficiency projects"
],
"ineligibleCostCategories": [
"indoor LED lighting",
"residential equipment",
"projects started before custom preapproval"
],
"requiredInputs": [
"measure_type",
"equipment_capacity_or_quantity",
"configuration_or_efficiency_tier",
"eligible_project_cost_cents",
"preapproval_status_for_custom"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"equipment_capacity_or_quantity",
"configuration_or_efficiency_tier"
],
"rateTable": {
"tableId": "sd_energy_edge_rebate_ranges",
"dimensions": [
"measure_category",
"basis"
],
"rows": [
{
"measure_category": "commercial AC packaged or split systems, 5 tons or larger",
"minRate": 1.38,
"maxRate": 212,
"rateUnit": "USD_per_ton",
"notes": "Exact rate depends on equipment row."
},
{
"measure_category": "commercial heat pump units, 1 to 63 tons",
"minRate": 2.34,
"maxRate": 218,
"rateUnit": "USD_per_ton",
"notes": "Exact rate depends on equipment row."
},
{
"measure_category": "outdoor Type B LED mogul-base lamps",
"minRate": 1.25,
"maxRate": 105,
"rateUnit": "USD_per_bulb",
"notes": "Indoor LED lighting is excluded."
},
{
"measure_category": "refrigerated case doors",
"minRate": 56,
"maxRate": 331,
"rateUnit": "USD_per_linear_foot",
"notes": "Exact rate depends on door row."
},
{
"measure_category": "heat pump water heaters",
"minAmountCents": 2200,
"maxAmountCents": 403400,
"rateUnit": "USD_per_unit_or_capacity_row",
"notes": "Exact rate depends on equipment and capacity."
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
"evidenceText": "SD Energy Edge publishes measure ranges for HVAC, outdoor Type B LEDs, water heating, refrigeration and custom projects.",
"sourceUrls": [
"[https://sdenergyedge.com/rebates/](https://sdenergyedge.com/rebates/)",
"[https://sdenergyedge.com/apply-now/](https://sdenergyedge.com/apply-now/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "Qualifying commercial AC and heat-pump replacement rows are published."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "needs_review",
"reason": "Only outdoor Type B LED measures are supported; broad indoor LED retrofit matching is not supported."
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
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://sdenergyedge.com/rebates/](https://sdenergyedge.com/rebates/)",
"[https://sdenergyedge.com/apply-now/](https://sdenergyedge.com/apply-now/)",
"[https://www.sdge.com/businesses/savings-center/rebates-incentives](https://www.sdge.com/businesses/savings-center/rebates-incentives)"
],
"evidenceText": "SD Energy Edge has published commercial rebate ranges but typical estimates require selecting the exact equipment row and quantity.",
"reasoningNotes": "Modeled as a rate table from published ranges, with LED edge narrowed to outdoor Type B lamps.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22684",
"opportunityName": "Southern California Regional Energy Network (SoCalREN) - Multifamily Residential Energy Efficiency Rebate Program",
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
"rate_table",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "For the Common Area Metered pathway, incentive equals verified savings times the applicable DAC or non-DAC rate: DAC projects receive $0.57 per kWh and $6.00 per therm; non-DAC projects receive $0.33 per kWh and $3.50 per therm.",
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
"multifamily common-area lighting",
"HVAC",
"water heating",
"pool equipment",
"laundry measures",
"technical assistance for eligible multifamily projects"
],
"ineligibleCostCategories": [
"single-family homes",
"non-multifamily commercial properties"
],
"requiredInputs": [
"program_pathway",
"DAC_status",
"verified_kWh_savings",
"verified_therm_savings",
"eligible_multifamily_units",
"installed_measure_list"
],
"missingInputsForTypicalRetroFiEstimate": [
"program_pathway",
"DAC_status",
"verified_kWh_savings",
"verified_therm_savings"
],
"rateTable": {
"tableId": "socalren_multifamily_common_area_metered_rates",
"dimensions": [
"DAC_status",
"savings_fuel"
],
"rows": [
{
"DAC_status": "DAC",
"savings_fuel": "electric",
"rate": 0.57,
"rateUnit": "USD_per_verified_kWh_saved"
},
{
"DAC_status": "DAC",
"savings_fuel": "gas",
"rate": 6,
"rateUnit": "USD_per_verified_therm_saved"
},
{
"DAC_status": "non-DAC",
"savings_fuel": "electric",
"rate": 0.33,
"rateUnit": "USD_per_verified_kWh_saved"
},
{
"DAC_status": "non-DAC",
"savings_fuel": "gas",
"rate": 3.5,
"rateUnit": "USD_per_verified_therm_saved"
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
"evidenceText": "SoCalREN publishes Common Area Metered rates by DAC status and verified electric or gas savings.",
"sourceUrls": [
"[https://socalren.org/multifamily/general_multifamily](https://socalren.org/multifamily/general_multifamily)",
"[https://socalren.org/multifamily/property-owners/cca](https://socalren.org/multifamily/property-owners/cca)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "high_efficiency_hvac_replacement",
"action": "keep",
"reason": "HVAC is included among supported multifamily energy efficiency measures."
},
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Common-area lighting measures are included in SoCalREN multifamily offerings."
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
"[https://socalren.org/multifamily/property-owners](https://socalren.org/multifamily/property-owners)",
"[https://socalren.org/multifamily/general_multifamily](https://socalren.org/multifamily/general_multifamily)",
"[https://socalren.org/multifamily/property-owners/cca](https://socalren.org/multifamily/property-owners/cca)",
"[https://socalren.org/multifamily/small_multifamily_hard-to_reach_program](https://socalren.org/multifamily/small_multifamily_hard-to_reach_program)"
],
"evidenceText": "SoCalREN supports multifamily HVAC and lighting with rate-based common-area incentives and technical assistance.",
"reasoningNotes": "A typical estimate requires program pathway and verified kWh or therm savings.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1801",
"opportunityName": "Black Hills Energy - Solar Power Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"tariff_or_rate"
],
"primaryValueModelKinds": [
"rate_table",
"tariff_or_rate",
"fixed_amount"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "Colorado Solar Program incentives depend on participant category and system size. Income-qualified or disproportionately impacted 0.5-25 kW systems may receive a $1/W solar rebate plus PBI; standard 0.5-25 kW systems receive PBI and paired storage at $100/kW capped at $1,000; larger eligible systems have a separate PBI rate.",
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
"perCustomerCapCents": 100000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"eligible solar PV",
"program-qualified paired storage",
"netting or banking under solar program rules"
],
"ineligibleCostCategories": [
"standalone battery storage",
"systems sized above 200% of expected annual consumption",
"non-Black Hills Colorado Electric sites"
],
"requiredInputs": [
"participant_category",
"solar_system_kW",
"annual_or_metered_kWh_generation",
"paired_storage_kW",
"program_capacity_available",
"customer_expected_annual_kWh_consumption",
"interconnection_approval"
],
"missingInputsForTypicalRetroFiEstimate": [
"participant_category",
"solar_system_kW",
"annual_or_metered_kWh_generation",
"program_capacity_available"
],
"rateTable": {
"tableId": "black_hills_colorado_solar_program_2023_2026",
"dimensions": [
"participant_category",
"system_size"
],
"rows": [
{
"participant_category": "income-qualified or disproportionately impacted",
"system_size": "0.5-25 kW",
"solarRebateRate": 1,
"solarRebateRateUnit": "USD_per_watt",
"pbiRate": 0.038,
"pbiRateUnit": "USD_per_kWh",
"pairedStorageRate": 100,
"pairedStorageRateUnit": "USD_per_kW",
"pairedStorageCapCents": 100000,
"programCapacityWatts": 250000
},
{
"participant_category": "standard",
"system_size": "0.5-25 kW",
"pbiRate": 0.0025,
"pbiRateUnit": "USD_per_kWh",
"pairedStorageRate": 100,
"pairedStorageRateUnit": "USD_per_kW",
"pairedStorageCapCents": 100000,
"programCapacityWatts": 1750000
},
{
"participant_category": "standard or eligible larger system",
"system_size": "25-250 kW",
"pbiRate": 0.02,
"pbiRateUnit": "USD_per_kWh",
"programCapacityWatts": 250000
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
"evidenceText": "Black Hills publishes Colorado solar PBI rates, an income-qualified solar rebate, and paired storage incentives capped at $1,000.",
"sourceUrls": [
"[https://www.blackhillsenergy.com/services/electric-services/solar-program/colorado-solar-program](https://www.blackhillsenergy.com/services/electric-services/solar-program/colorado-solar-program)",
"[https://distributedsolar.programprocessing.com/](https://distributedsolar.programprocessing.com/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "battery_storage_system",
"action": "keep",
"reason": "Paired storage has a published incentive, but standalone battery storage is not supported."
},
{
"retrofitTypeId": "rooftop_solar_pv",
"action": "keep",
"reason": "Solar PV is the core technology for the Colorado Solar Program."
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
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.blackhillsenergy.com/services/electric-services/solar-program/colorado-solar-program](https://www.blackhillsenergy.com/services/electric-services/solar-program/colorado-solar-program)",
"[https://www.blackhillsenergy.com/services/electric-services/solar-program](https://www.blackhillsenergy.com/services/electric-services/solar-program)",
"[https://distributedsolar.programprocessing.com/](https://distributedsolar.programprocessing.com/)"
],
"evidenceText": "Black Hills Energy publishes category-specific solar PBI and paired-storage rates for eligible Colorado Electric customers.",
"reasoningNotes": "Battery edge is retained only for paired storage in the solar program, not as a standalone battery incentive.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22300",
"opportunityName": "Holy Cross Energy - EV Charger Incentives",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"financing"
],
"primaryValueModelKinds": [
"capped_percent_of_eligible_cost",
"fixed_amount",
"loan_or_financing"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "capped_percent_of_eligible_cost",
"timing": "post_purchase_rebate",
"formulaText": "Residential Charge at Home reimburses the cost of an approved Level 2 EV charger up to $549, with one rebate for one EV and up to two rebates for two EVs, provided the charger allows Holy Cross Energy control under program rules.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": 54900,
"caps": {
"maxAwardCents": 54900,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": 2,
"perCustomerCapCents": 109800,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"approved Level 2 EV charger hardware"
],
"ineligibleCostCategories": [
"DC fast charging",
"non-approved chargers",
"non-Holy Cross Energy member sites"
],
"requiredInputs": [
"approved_charger_model",
"charger_cost_cents",
"number_of_EVs",
"receipt_date",
"HCE_network_activation",
"Distribution_Flexibility_tariff_enrollment"
],
"missingInputsForTypicalRetroFiEstimate": [
"charger_cost_cents",
"approved_charger_model",
"number_of_EVs"
],
"rateTable": {
"tableId": "holy_cross_ev_charger_incentives",
"dimensions": [
"pathway"
],
"rows": [
{
"pathway": "residential Charge at Home",
"maxAmountCents": 54900,
"rateUnit": "charger_cost_up_to_cap",
"maxUnits": 2
},
{
"pathway": "multifamily or workplace Level 2 charging",
"maxAmountCents": 200000,
"rateUnit": "USD_per_port",
"minPorts": 2,
"maxPorts": 10,
"notes": "Commercial terms require program-specific metering or control."
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
"evidenceText": "Holy Cross states residential Charge at Home rebates cover approved Level 2 charger cost up to $549.",
"sourceUrls": [
"[https://www.holycross.com/member-programs/charge-at-home](https://www.holycross.com/member-programs/charge-at-home)",
"[https://www.holycross.com/member-programs/charge-at-work](https://www.holycross.com/member-programs/charge-at-work)"
]
},
{
"effectType": "no_cash_value",
"cashValueClassification": "financing",
"valueModelKind": "loan_or_financing",
"timing": "loan_closing",
"formulaText": "Installation-cost repayment may be available as an interest-free financing option, but no standalone cash savings value can be calculated without loan amount, term, and counterfactual financing cost.",
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
"installation_cost_cents",
"repayment_term_months",
"counterfactual_financing_rate"
],
"missingInputsForTypicalRetroFiEstimate": [
"installation_cost_cents",
"counterfactual_financing_rate"
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
"evidenceText": "Holy Cross describes installation-cost repayment as financing rather than an additional rebate.",
"sourceUrls": [
"[https://www.holycross.com/member-programs/charge-at-home](https://www.holycross.com/member-programs/charge-at-home)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "keep",
"reason": "The program supports approved Level 2 EV charger hardware rebates and some charging-site pathways."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "keep",
"reason": "Level 2 equipment is the explicit eligible charger type."
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
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.holycross.com/member-programs](https://www.holycross.com/member-programs)",
"[https://www.holycross.com/member-programs/charge-at-home](https://www.holycross.com/member-programs/charge-at-home)",
"[https://www.holycross.com/member-programs/charge-at-work](https://www.holycross.com/member-programs/charge-at-work)"
],
"evidenceText": "Holy Cross publishes a residential Level 2 charger rebate up to $549, with additional charging pathways requiring program-specific terms.",
"reasoningNotes": "Use the residential charger cap directly; do not value the financing option as cash savings without financing inputs.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22580",
"opportunityName": "Energy Storage Solutions Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate",
"tariff_or_rate"
],
"primaryValueModelKinds": [
"rate_table",
"hybrid_rate_plus_cap",
"tariff_or_rate"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "rate_table",
"timing": "post_installation_reimbursement",
"formulaText": "For Construct 5 applications on or after April 1, 2026, enrollment incentives are based on rated battery kWh and customer category: residential non-Grid Edge $30/kWh, residential Grid Edge $130/kWh, commercial priority $10/kWh, and commercial non-priority has no enrollment incentive.",
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
"eligible battery storage systems",
"critical-facility or priority-customer battery systems",
"approved contractor installations"
],
"ineligibleCostCategories": [
"standalone solar PV",
"non-battery backup generators",
"non-approved equipment"
],
"requiredInputs": [
"customer_class",
"grid_edge_or_priority_status",
"rated_battery_kWh",
"application_date",
"eligible_contractor",
"eligible_equipment",
"dispatch_participation_status"
],
"missingInputsForTypicalRetroFiEstimate": [
"customer_class",
"grid_edge_or_priority_status",
"rated_battery_kWh",
"application_date"
],
"rateTable": {
"tableId": "connecticut_energy_storage_solutions_construct_5",
"dimensions": [
"customer_category"
],
"rows": [
{
"customer_category": "residential non-Grid Edge",
"rate": 30,
"rateUnit": "USD_per_rated_battery_kWh"
},
{
"customer_category": "residential Grid Edge",
"rate": 130,
"rateUnit": "USD_per_rated_battery_kWh"
},
{
"customer_category": "commercial priority",
"rate": 10,
"rateUnit": "USD_per_rated_battery_kWh"
},
{
"customer_category": "commercial non-priority",
"amountCents": null,
"rateUnit": "not_applicable",
"notes": "No Construct 5 enrollment incentive identified for this category."
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
"evidenceText": "Construct 5 Energy Storage Solutions rates are published by residential Grid Edge status and commercial priority status.",
"sourceUrls": [
"[https://energystoragect.com/program-changes-for-april-1-2026/](https://energystoragect.com/program-changes-for-april-1-2026/)",
"[https://energystoragect.com/wp-content/uploads/2026/02/ESS-Program-Manual-Revised-for-02112026-CLEAN.pdf](https://energystoragect.com/wp-content/uploads/2026/02/ESS-Program-Manual-Revised-for-02112026-CLEAN.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "battery_storage_system",
"action": "keep",
"reason": "The program directly incentivizes eligible battery storage systems."
},
{
"retrofitTypeId": "resilience_backup_power_system",
"action": "keep",
"reason": "Resilience is supported only where the backup power system is eligible battery storage participating in the program."
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
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://portal.ct.gov/pura/electric/office-of-technical-and-regulatory-analysis/clean-energy-programs/energy-storage-solutions-program](https://portal.ct.gov/pura/electric/office-of-technical-and-regulatory-analysis/clean-energy-programs/energy-storage-solutions-program)",
"[https://energystoragect.com/](https://energystoragect.com/)",
"[https://energystoragect.com/program-changes-for-april-1-2026/](https://energystoragect.com/program-changes-for-april-1-2026/)",
"[https://energystoragect.com/wp-content/uploads/2026/02/ESS-Program-Manual-Revised-for-02112026-CLEAN.pdf](https://energystoragect.com/wp-content/uploads/2026/02/ESS-Program-Manual-Revised-for-02112026-CLEAN.pdf)"
],
"evidenceText": "Connecticut Energy Storage Solutions has a rate table for battery enrollment incentives, while performance incentives require dispatch data.",
"reasoningNotes": "Modeled current Construct 5 enrollment rates; performance payments are excluded from default totals without seasonal dispatch inputs.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1773",
"opportunityName": "Groton Utilities - Commercial & Industrial Energy Efficiency Rebate Programs",
"repairStatus": "custom_quote_required",
"calculationStatus": "custom_quote_estimate",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"rebate"
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
"timing": "post_installation_reimbursement",
"formulaText": "Commercial and industrial applications are reviewed case by case under limited 2026 funds; rebates require mandatory preapproval, are capped at $25,000 per unit and $50,000 per owner Federal Tax ID per consecutive 12 months, and may not exceed 80% of total project cost.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": null,
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": 80,
"maxUnits": null,
"perCustomerCapCents": 5000000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"commercial lighting",
"commercial HVAC",
"heat pump HVAC",
"heat pump water heaters",
"custom efficiency projects"
],
"ineligibleCostCategories": [
"residential projects",
"projects without mandatory preapproval",
"accounts with outstanding balances"
],
"requiredInputs": [
"measure_type",
"eligible_project_cost_cents",
"utility_preapproval",
"owner_federal_tax_id",
"number_of_units",
"customer_CLM_contribution"
],
"missingInputsForTypicalRetroFiEstimate": [
"measure_type",
"eligible_project_cost_cents",
"utility_preapproval"
],
"rateTable": {
"tableId": "groton_commercial_2026_caps",
"dimensions": [
"cap_type"
],
"rows": [
{
"cap_type": "per unit",
"maxAmountCents": 2500000
},
{
"cap_type": "per owner Federal Tax ID per consecutive 12 months",
"maxAmountCents": 5000000
},
{
"cap_type": "project cost share",
"maxPercentOfEligibleCost": 80
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
"evidenceText": "Groton states 2026 commercial funds are limited, applications are case-by-case, preapproval is mandatory, and rebates are capped by project cost and owner.",
"sourceUrls": [
"[https://ct-grotonutilities.civicplus.com/209/Commercial-Industrial-Incentives](https://ct-grotonutilities.civicplus.com/209/Commercial-Industrial-Incentives)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "heat_pump_hvac_retrofit",
"action": "keep",
"reason": "Commercial HVAC applications remain in scope, including heat-pump HVAC where approved."
},
{
"retrofitTypeId": "heat_pump_water_heater",
"action": "keep",
"reason": "Heat pump water heater applications are explicitly listed."
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
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://ct-grotonutilities.civicplus.com/209/Commercial-Industrial-Incentives](https://ct-grotonutilities.civicplus.com/209/Commercial-Industrial-Incentives)"
],
"evidenceText": "Groton supports C&I HVAC and heat pump water heater applications but does not publish a reusable measure-rate formula.",
"reasoningNotes": "The source provides caps and process rules, so estimates require a custom utility quote or approved application review.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22304",
"opportunityName": "Delaware Electric Cooperative - Beat the Peak With Electric Vehicles",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"tariff_or_rate",
"rebate"
],
"primaryValueModelKinds": [
"fixed_amount",
"tariff_or_rate"
],
"effects": [
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "monthly",
"formulaText": "EV managed-charging participants receive an initial bill credit and a $5 monthly summer credit for avoiding EV charging during Beat the Peak alerts; current official snippets support a $25 initial credit, while an older press item referenced a larger prior amount.",
"amountCents": 500,
"percent": null,
"rate": 5,
"rateUnit": "USD_per_summer_month",
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
"Optiwatt or approved managed EV charging participation",
"EV charging demand response"
],
"ineligibleCostCategories": [
"EV charger installation cost",
"smart thermostat participation under the separate thermostat rider"
],
"requiredInputs": [
"Optiwatt_or_approved_program_enrollment",
"summer_months_participating",
"peak_alert_charging_compliance",
"initial_credit_amount_confirmed_for_current_EV_rider"
],
"missingInputsForTypicalRetroFiEstimate": [
"summer_months_participating",
"peak_alert_charging_compliance",
"current_EV_rider_initial_credit_confirmation"
],
"rateTable": {
"tableId": "delaware_electric_btp_ev_credits",
"dimensions": [
"credit_type"
],
"rows": [
{
"credit_type": "current EV initial credit",
"amountCents": 2500,
"rateUnit": "USD_one_time_bill_credit",
"notes": "Current official snippet indicates $25; confirm against rider before production."
},
{
"credit_type": "summer monthly credit",
"amountCents": 500,
"rateUnit": "USD_per_month",
"months": "June-September"
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
"evidenceText": "Delaware Electric describes EV managed-charging credits for members who avoid charging during Beat the Peak events.",
"sourceUrls": [
"[https://www.delaware.coop/btp/electric-vehicles](https://www.delaware.coop/btp/electric-vehicles)",
"[https://www.delaware.coop/press-room/ways-save-how-members-can-beat-peak](https://www.delaware.coop/press-room/ways-save-how-members-can-beat-peak)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "move_to_special_workflow",
"reason": "The program pays managed-charging bill credits, not charger installation or make-ready costs."
},
{
"retrofitTypeId": "smart_thermostat_zoning_retrofit",
"action": "delete_bad_edge",
"reason": "Smart thermostat credits are a separate Beat the Peak thermostat rider, not this EV program."
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
"[https://www.delaware.coop/btp](https://www.delaware.coop/btp)",
"[https://www.delaware.coop/btp/electric-vehicles](https://www.delaware.coop/btp/electric-vehicles)",
"[https://www.delaware.coop/btp/thermostats](https://www.delaware.coop/btp/thermostats)",
"[https://www.delaware.coop/press-room/ways-save-how-members-can-beat-peak](https://www.delaware.coop/press-room/ways-save-how-members-can-beat-peak)",
"[https://www.delaware.coop/sites/default/files/2025-03/Tariff%20-%20Revised%20March%202025.pdf](https://www.delaware.coop/sites/default/files/2025-03/Tariff%20-%20Revised%20March%202025.pdf)"
],
"evidenceText": "Beat the Peak with Electric Vehicles is a managed-charging bill-credit program, not a physical EV charger rebate.",
"reasoningNotes": "Human review should confirm the current initial EV credit because public pages and older press materials indicate different initial amounts.",
"humanReviewRequired": true,
"humanReviewReasons": [
"Current EV page access redirected during review and older official press materials conflict on the initial credit amount."
]
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22741",
"opportunityName": "Duke Energy Florida - Off-Peak Charging Credit",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"tariff_or_rate",
"rebate"
],
"primaryValueModelKinds": [
"fixed_amount",
"tariff_or_rate"
],
"effects": [
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "fixed_amount",
"timing": "monthly",
"formulaText": "Eligible Duke Energy Florida residential customers with a qualifying Level 2 charger receive a $7.50 monthly bill credit for charging during off-peak periods: 10 a.m. to 6 p.m. and 11 p.m. to 5 a.m. weekdays, and anytime on weekends and holidays.",
"amountCents": 750,
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
"qualifying Level 2 EV charger participation",
"residential off-peak EV charging"
],
"ineligibleCostCategories": [
"charger installation cost",
"charger prep or make-ready work",
"business fleet advisory services"
],
"requiredInputs": [
"duke_energy_florida_residential_account",
"eligible_level_2_charger",
"program_enrollment",
"months_of_off_peak_compliant_charging"
],
"missingInputsForTypicalRetroFiEstimate": [
"program_enrollment",
"months_of_off_peak_compliant_charging"
],
"rateTable": {
"tableId": "duke_florida_off_peak_charging_credit",
"dimensions": [
"credit_type"
],
"rows": [
{
"credit_type": "monthly off-peak charging credit",
"amountCents": 750,
"rateUnit": "USD_per_month",
"offPeakWindows": "10 a.m.-6 p.m. and 11 p.m.-5 a.m. weekdays; anytime weekends and holidays"
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
"evidenceText": "Duke Energy Florida publishes a $7.50 monthly off-peak charging credit for eligible residential Level 2 charging.",
"sourceUrls": [
"[https://www.duke-energy.com/home/products/ev-complete/off-peak-credit](https://www.duke-energy.com/home/products/ev-complete/off-peak-credit)",
"[https://investors.duke-energy.com/news/news-details/2025/New-Duke-Energy-programs-offer-Florida-customers-more-choices-related-to-electric-vehicles/default.aspx](https://investors.duke-energy.com/news/news-details/2025/New-Duke-Energy-programs-offer-Florida-customers-more-choices-related-to-electric-vehicles/default.aspx)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "move_to_special_workflow",
"reason": "The value is an operating bill credit for off-peak charging, not an EV charger installation rebate."
},
{
"retrofitTypeId": "level_2_ev_charger_installation",
"action": "move_to_special_workflow",
"reason": "Level 2 equipment is a participation requirement, but installation cost is not funded by this credit."
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
"[https://www.duke-energy.com/home/products/ev-complete/off-peak-credit](https://www.duke-energy.com/home/products/ev-complete/off-peak-credit)",
"[https://investors.duke-energy.com/news/news-details/2025/New-Duke-Energy-programs-offer-Florida-customers-more-choices-related-to-electric-vehicles/default.aspx](https://investors.duke-energy.com/news/news-details/2025/New-Duke-Energy-programs-offer-Florida-customers-more-choices-related-to-electric-vehicles/default.aspx)"
],
"evidenceText": "Duke Energy Florida's program is a recurring $7.50 monthly off-peak charging bill credit, separate from charger-prep incentives.",
"reasoningNotes": "Treat both EV charger edges as special managed-charging workflow requirements rather than one-time installation incentives.",
"humanReviewRequired": false,
"humanReviewReasons": []
}
],
"continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2817"
}
