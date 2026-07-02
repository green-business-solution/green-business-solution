{
"schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
"researchedAt": "2026-07-02",
"source": "gpt_pro",
"batchNumber": 50,
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:2813",
"opportunityName": "Richland Energy Services - Energy Efficient Commercial Lighting Program",
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
"formulaText": "For commercial lighting, select the applicable BPA Online Lighting Calculator measure and multiply the published per-lamp, per-tube, per-fixture, per-control, or $0.25/kWh-saved incentive by qualifying units or savings. Apply caps and requirements: incentive cannot exceed 70% of total project cost and BPA lighting incentives are also capped at $0.50/kWh saved; Richland requires preapproval, inspection, at least 30% wattage reduction, and simple payback of at least one year before incentive.",
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
"commercial lighting equipment",
"commercial lighting installation labor",
"lighting controls",
"lighting project implementation costs"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"BPA OLC measure series",
"baseline fixture or lamp type",
"baseline wattage",
"post-installation fixture or lamp model",
"fixture, lamp, tube, or control quantity",
"wattage reduction percentage",
"annual kWh savings for calculated measures",
"total project cost",
"simple payback before incentive",
"pre-installation inspection result",
"RES written approval before purchase or work begins",
"BPA approval after completion"
],
"missingInputsForTypicalRetroFiEstimate": [
"BPA OLC measure series",
"baseline wattage",
"post-installation wattage",
"fixture, lamp, tube, or control quantity",
"annual kWh savings",
"total project cost"
],
"rateTable": {
"tableId": null,
"dimensions": [],
"rows": []
},
"measureCatalog": {
"catalogId": "BPA_OLC_Program_Offerings_Effective_2025_10_01",
"selectionInput": "Select the BPA OLC lighting measure series, then provide wattage range, wattage-reduction tier, quantity, or annual kWh savings as required by the measure.",
"rows": [
{
"series": "A",
"measure": "LED small lamps and fixtures",
"unit": "lamp",
"baselineWattageRange": "1-100 W",
"minimumReductionPercent": 40,
"amountCents": 400
},
{
"series": "A",
"measure": "LED small lamps and fixtures",
"unit": "lamp",
"baselineWattageRange": "101 W or greater",
"minimumReductionPercent": 40,
"amountCents": 1000
},
{
"series": "B",
"measure": "LED tubes",
"unit": "tube",
"minimumReductionPercent": 30,
"amountCents": 400
},
{
"series": "O",
"measure": "Specialty LED tubes",
"unit": "tube",
"minimumReductionPercent": 30,
"amountCents": 1200
},
{
"series": "C",
"measure": "General indoor and outdoor fixtures",
"unit": "standard fixture",
"tiers": [
{
"baselineWattageRange": "1-100 W",
"amountCentsByReductionPercent": {
"40": 4000,
"50": 6000,
"60": 8000,
"70": 10000
}
},
{
"baselineWattageRange": "101-200 W",
"amountCentsByReductionPercent": {
"40": 8000,
"50": 12000,
"60": 16000,
"70": 20000
}
},
{
"baselineWattageRange": "201 W or greater",
"amountCentsByReductionPercent": {
"40": 14000,
"50": 20000,
"60": 24000,
"70": 28000
}
}
]
},
{
"series": "D",
"measure": "High bay fixtures",
"unit": "standard fixture",
"tiers": [
{
"baselineWattageRange": "140-299 W",
"amountCentsByReductionPercent": {
"40": 16000,
"60": 24000,
"70": 30000
}
},
{
"baselineWattageRange": "300-399 W",
"amountCentsByReductionPercent": {
"40": 20000,
"60": 30000,
"70": 40000
}
},
{
"baselineWattageRange": "400-499 W",
"amountCentsByReductionPercent": {
"40": 28000,
"60": 38000,
"70": 50000
}
},
{
"baselineWattageRange": "500 W or greater",
"amountCentsByReductionPercent": {
"40": 50000,
"60": 70000,
"70": 80000
}
}
]
},
{
"series": "E",
"measure": "Exterior fixtures",
"unit": "standard fixture",
"tiers": [
{
"baselineWattageRange": "30-99 W",
"amountCentsByReductionPercent": {
"40": 6000,
"60": 7000,
"70": 8000
}
},
{
"baselineWattageRange": "100-199 W",
"amountCentsByReductionPercent": {
"40": 8000,
"60": 12000,
"70": 14000
}
},
{
"baselineWattageRange": "200-299 W",
"amountCentsByReductionPercent": {
"40": 10000,
"60": 18000,
"70": 25000
}
},
{
"baselineWattageRange": "300-399 W",
"amountCentsByReductionPercent": {
"40": 12000,
"60": 22000,
"70": 30000
}
},
{
"baselineWattageRange": "400-499 W",
"amountCentsByReductionPercent": {
"40": 24000,
"60": 40000,
"70": 50000
}
},
{
"baselineWattageRange": "500 W or greater",
"amountCentsByReductionPercent": {
"40": 50000,
"60": 70000,
"70": 80000
}
}
]
},
{
"series": "F",
"measure": "HID screw-in lamps",
"unit": "lamp",
"minimumReductionPercent": 40,
"amountCentsByBaselineWattageRange": {
"40-200 W": 4000,
"201-300 W": 8000,
"301-400 W": 12000,
"401-999 W": 16000,
"1000 W or greater": 30000
}
},
{
"series": "G",
"measure": "LED linear lighting",
"unit": "kWh saved",
"rateCentsPerKwhSaved": 25
},
{
"series": "H",
"measure": "LED exit signs",
"unit": "fixture",
"baselineWattageRange": "10-100 W",
"minimumReductionPercent": 90,
"amountCents": 3000
},
{
"series": "I",
"measure": "Signage",
"unit": "kWh saved",
"rateCentsPerKwhSaved": 25
},
{
"series": "J",
"measure": "Lighting decommissioning and fixture increase",
"unit": "kWh saved",
"minimumNetSavingsPercent": 10,
"minimumPayoutCents": 500,
"rateCentsPerKwhSaved": 25
},
{
"series": "K",
"measure": "Nonstandard lighting measures",
"unit": "kWh saved",
"minimumNetSavingsPercent": 10,
"minimumPayoutCents": 500,
"rateCentsPerKwhSaved": 25
},
{
"series": "New construction",
"measure": "New construction lighting",
"unit": "kWh saved",
"rateCentsPerKwhSaved": 25
},
{
"series": "L",
"measure": "Lighting controls",
"unit": "control or luminaire-level control",
"rows": [
{
"controlType": "Occupancy sensor",
"defaultSavingsPercent": 25,
"amountCentsByControlledWattageRange": {
"15-44 W": 2000,
"45-200 W": 4000,
"201 W or greater": 6000
}
},
{
"controlType": "Multi-function controls",
"defaultSavingsPercent": 25,
"amountCentsByControlledWattageRange": {
"15-44 W": 2500,
"45-200 W": 5000,
"201 W or greater": 7500
}
},
{
"controlType": "Other controls",
"defaultSavingsPercent": 25,
"amountCentsByControlledWattageRange": {
"15-44 W": 2000,
"45-200 W": 4000,
"201 W or greater": 6000
}
},
{
"controlType": "Luminaire-level lighting controls",
"defaultSavingsPercent": 65,
"amountCentsByControlledWattageRange": {
"15-44 W": 5000,
"45-200 W": 7500,
"201 W or greater": 15000
}
}
]
}
]
},
"probabilityModel": {
"probabilityRequired": false,
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown"
},
"includedInUserFacingTotalDefault": false,
"evidenceText": "Richland requires preapproval and uses BPA OLC lighting calculations. BPA’s current offerings publish fixture, lamp, tube, controls, and kWh-saved rates, subject to project-cost and kWh-saved caps.",
"sourceUrls": [
"[https://www.richlandwa.gov/departments/energy-services/energy-efficiency/commercial-industrial-programs](https://www.richlandwa.gov/departments/energy-services/energy-efficiency/commercial-industrial-programs)",
"[https://www.richlandwa.gov/home/showpublisheddocument/440/639096075459570000](https://www.richlandwa.gov/home/showpublisheddocument/440/639096075459570000)",
"[https://www.bpa.gov/-/media/Aep/energy-efficiency/commercial/online_lighting_calculator/online-lighting-calculator-program-offerings.pdf](https://www.bpa.gov/-/media/Aep/energy-efficiency/commercial/online_lighting_calculator/online-lighting-calculator-program-offerings.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "led_lighting_retrofit",
"action": "keep",
"reason": "Official Richland commercial and industrial program materials support lighting incentives for nonresidential accounts, and BPA OLC publishes LED lighting measure rates used for calculation."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Lighting incentive cannot exceed 70% of total project cost. Source materials did not state broader stacking rules."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": true,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": null,
"fundingStatus": "open_while_funds_last"
},
"sourceUrlsChecked": [
"[https://www.richlandwa.gov/departments/energy-services/energy-efficiency/commercial-industrial-programs](https://www.richlandwa.gov/departments/energy-services/energy-efficiency/commercial-industrial-programs)",
"[https://www.richlandwa.gov/home/showpublisheddocument/440/639096075459570000](https://www.richlandwa.gov/home/showpublisheddocument/440/639096075459570000)",
"[https://www.richlandwa.gov/departments/energy-services/energy-efficiency/contractor-info-and-forms](https://www.richlandwa.gov/departments/energy-services/energy-efficiency/contractor-info-and-forms)",
"[https://bpa.hancocksoftware.com/HEEC/](https://bpa.hancocksoftware.com/HEEC/)",
"[https://www.bpa.gov/-/media/Aep/energy-efficiency/commercial/online_lighting_calculator/online-lighting-calculator-program-offerings.pdf](https://www.bpa.gov/-/media/Aep/energy-efficiency/commercial/online_lighting_calculator/online-lighting-calculator-program-offerings.pdf)"
],
"evidenceText": "Richland offers nonresidential lighting rebates, requires application approval before work, completion within 120 days, at least 30% wattage reduction, and caps lighting incentives at 70% of total project cost.",
"reasoningNotes": "Input target data reviewed from uploaded batch prompt.  LED lighting is source-backed, but value must be calculated through BPA OLC measure rates and project-specific inputs.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:381",
"opportunityName": "Tax Abatement for Solar Manufacturers",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "medium",
"cashValueClassifications": [
"tax_credit"
],
"primaryValueModelKinds": [
"tax_credit",
"tariff_or_rate"
],
"effects": [
{
"effectType": "tax_credit",
"cashValueClassification": "tax_credit",
"valueModelKind": "tax_credit",
"timing": "tax_filing",
"formulaText": "For qualifying Washington solar energy system or component manufacturing, processing for hire, or wholesale sales, compute B&O tax at the preferential solar energy classification rate of 0.275% of taxable gross receipts. The tax benefit equals the difference between tax under the otherwise applicable B&O classification and tax under the 0.275% solar energy classification, after applicable deductions or multiple-activities tax credit adjustments.",
"amountCents": null,
"percent": 0.275,
"rate": 0.00275,
"rateUnit": "taxable gross receipts",
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
"end-use rooftop solar PV installation costs",
"customer-owned solar project costs"
],
"requiredInputs": [
"qualifying taxable gross receipts",
"business activity classification",
"otherwise applicable B&O tax rate",
"tax period",
"deductions for interstate or foreign sales",
"multiple activities tax credit adjustments",
"Annual Tax Performance Report filing status"
],
"missingInputsForTypicalRetroFiEstimate": [
"qualifying taxable gross receipts",
"otherwise applicable B&O tax rate",
"tax period",
"deductions or credits"
],
"rateTable": {
"tableId": "WA_DOR_Solar_Energy_BO_Classification",
"dimensions": [
"activity",
"ratePercent",
"rateDecimal",
"reportingRequirement"
],
"rows": [
{
"activity": "Manufacturing of solar energy systems or qualifying components",
"ratePercent": 0.275,
"rateDecimal": 0.00275,
"reportingRequirement": "Annual Tax Performance Report"
},
{
"activity": "Wholesaling of solar energy systems or qualifying components",
"ratePercent": 0.275,
"rateDecimal": 0.00275,
"reportingRequirement": "Annual Tax Performance Report"
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
"evidenceText": "Washington DOR states qualifying solar manufacturers, processors for hire, and wholesalers use preferential B&O classifications at 0.275%, with annual performance reporting required.",
"sourceUrls": [
"[https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems](https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems)",
"[https://dor.wa.gov/open-business/apply-business-license/plan-taxes/business-and-occupation-bo-tax-classification-definitions](https://dor.wa.gov/open-business/apply-business-license/plan-taxes/business-and-occupation-bo-tax-classification-definitions)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "rooftop_solar_pv",
"action": "delete_bad_edge",
"reason": "The official DOR source applies to solar energy system and component manufacturers, processors for hire, and wholesalers, not to property owners installing rooftop solar PV."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "This is a preferential B&O tax classification for qualifying business activity, not a project rebate. DOR discusses deductions and multiple activities tax credit adjustments for B&O reporting."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": null,
"applicationDeadline": "Preferential solar manufacturing and wholesaling B&O classifications expire July 1, 2032.",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems](https://dor.wa.gov/education/industry-guides/manufacturing-guide/manufacturing-solar-energy-systems-and-components-solar-energy-systems)",
"[https://dor.wa.gov/open-business/apply-business-license/plan-taxes/business-and-occupation-bo-tax-classification-definitions](https://dor.wa.gov/open-business/apply-business-license/plan-taxes/business-and-occupation-bo-tax-classification-definitions)"
],
"evidenceText": "Washington DOR’s solar manufacturing guidance describes preferential B&O tax classifications for qualifying manufacturers, processors for hire, and wholesalers, expiring July 1, 2032.",
"reasoningNotes": "The opportunity is a business tax-rate preference and should not be exposed as a rooftop solar PV retrofit incentive.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:5218",
"opportunityName": "Commercial Retro-Commissioning and New Construction Program",
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
"hybrid_rate_plus_cap",
"non_cash_process_value"
],
"effects": [
{
"effectType": "one_time_savings",
"cashValueClassification": "rebate",
"valueModelKind": "hybrid_rate_plus_cap",
"timing": "post_installation_reimbursement",
"formulaText": "For Retro-Commissioning, verified EUI reduction of at least 3% earns a base incentive of $0.06/ft² plus $0.01/ft² for each additional 1% EUI reduction above 3%, capped at 15% EUI reduction or $0.18/ft². A $0.02/ft² RSP bonus may be passed to the customer if measures are implemented within 15 months. Incentives are capped at 75% of total audit plus implementation cost and the base incentive is capped at $100,000 per project.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": "gross square foot",
"minAmountCents": null,
"maxAmountCents": null,
"caps": {
"maxAwardCents": 10000000,
"minAwardCents": null,
"maxPercentOfEligibleCost": 75,
"maxUnits": null,
"perCustomerCapCents": 40000000,
"perSiteCapCents": null,
"annualCapCents": null,
"programBudgetCents": null
},
"eligibleCostCategories": [
"retro-commissioning audit cost",
"implementation cost for qualifying energy-saving measures"
],
"ineligibleCostCategories": [],
"requiredInputs": [
"gross building square footage",
"verified EUI reduction percentage",
"baseline EUI",
"24 months of recent utility bills",
"annual kWh use",
"annual therm use",
"estimated kWh savings",
"estimated therm savings",
"total audit cost",
"total implementation cost",
"RSP bonus pass-through status",
"implementation completion date",
"existing building age",
"date of last retro-commissioning study",
"participating Wisconsin utility service",
"project-level Focus incentive total",
"customer calendar-year Focus incentive total"
],
"missingInputsForTypicalRetroFiEstimate": [
"gross building square footage",
"verified EUI reduction percentage",
"total audit plus implementation cost",
"RSP bonus pass-through status",
"project-level and customer annual incentive totals"
],
"rateTable": {
"tableId": "Focus_on_Energy_2026_Retro_Commissioning_EUI_Reduction_Incentive",
"dimensions": [
"verifiedEuiReductionPercent",
"baseAmountCentsPerSquareFoot",
"rspBonusCentsPerSquareFoot",
"potentialTotalCentsPerSquareFoot"
],
"rows": [
{
"verifiedEuiReductionPercent": 3,
"baseAmountCentsPerSquareFoot": 6,
"rspBonusCentsPerSquareFoot": 2,
"potentialTotalCentsPerSquareFoot": 8
},
{
"verifiedEuiReductionPercent": 4,
"baseAmountCentsPerSquareFoot": 7,
"rspBonusCentsPerSquareFoot": 2,
"potentialTotalCentsPerSquareFoot": 9
},
{
"verifiedEuiReductionPercent": 5,
"baseAmountCentsPerSquareFoot": 8,
"rspBonusCentsPerSquareFoot": 2,
"potentialTotalCentsPerSquareFoot": 10
},
{
"verifiedEuiReductionPercent": 6,
"baseAmountCentsPerSquareFoot": 9,
"rspBonusCentsPerSquareFoot": 2,
"potentialTotalCentsPerSquareFoot": 11
},
{
"verifiedEuiReductionPercent": 7,
"baseAmountCentsPerSquareFoot": 10,
"rspBonusCentsPerSquareFoot": 2,
"potentialTotalCentsPerSquareFoot": 12
},
{
"verifiedEuiReductionPercent": 8,
"baseAmountCentsPerSquareFoot": 11,
"rspBonusCentsPerSquareFoot": 2,
"potentialTotalCentsPerSquareFoot": 13
},
{
"verifiedEuiReductionPercent": 9,
"baseAmountCentsPerSquareFoot": 12,
"rspBonusCentsPerSquareFoot": 2,
"potentialTotalCentsPerSquareFoot": 14
},
{
"verifiedEuiReductionPercent": 10,
"baseAmountCentsPerSquareFoot": 13,
"rspBonusCentsPerSquareFoot": 2,
"potentialTotalCentsPerSquareFoot": 15
},
{
"verifiedEuiReductionPercent": 11,
"baseAmountCentsPerSquareFoot": 14,
"rspBonusCentsPerSquareFoot": 2,
"potentialTotalCentsPerSquareFoot": 16
},
{
"verifiedEuiReductionPercent": 12,
"baseAmountCentsPerSquareFoot": 15,
"rspBonusCentsPerSquareFoot": 2,
"potentialTotalCentsPerSquareFoot": 17
},
{
"verifiedEuiReductionPercent": 13,
"baseAmountCentsPerSquareFoot": 16,
"rspBonusCentsPerSquareFoot": 2,
"potentialTotalCentsPerSquareFoot": 18
},
{
"verifiedEuiReductionPercent": 14,
"baseAmountCentsPerSquareFoot": 17,
"rspBonusCentsPerSquareFoot": 2,
"potentialTotalCentsPerSquareFoot": 19
},
{
"verifiedEuiReductionPercent": 15,
"baseAmountCentsPerSquareFoot": 18,
"rspBonusCentsPerSquareFoot": 2,
"potentialTotalCentsPerSquareFoot": 20
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
"evidenceText": "Focus on Energy’s 2026 Retro-Commissioning application publishes EUI-reduction incentives from $0.06 to $0.18/ft², optional $0.02/ft² RSP bonus, and 75% cost cap.",
"sourceUrls": [
"[https://focusonenergy.com/business/building-optimization](https://focusonenergy.com/business/building-optimization)",
"[https://assets.focusonenergy.com/production/docs/business/BI-RCx-Application-Fillable-2026.pdf](https://assets.focusonenergy.com/production/docs/business/BI-RCx-Application-Fillable-2026.pdf)"
]
},
{
"effectType": "process_value",
"cashValueClassification": "technical_assistance",
"valueModelKind": "non_cash_process_value",
"timing": "application_process",
"formulaText": "Focus on Energy provides building optimization assistance for existing facilities and new construction or renovation support during design or construction. Non-cash assistance includes identifying and implementing operational changes or design strategies; any new construction financial incentive is project-specific and determined through Focus analysis and verification.",
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
"project path",
"building type",
"design stage or construction stage",
"participating utility service",
"project square footage",
"energy model or online analysis inputs",
"verified savings"
],
"missingInputsForTypicalRetroFiEstimate": [
"project path",
"design-stage inputs",
"verified savings"
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
"evidenceText": "Focus describes building optimization and new construction support as technical and financial assistance; final new construction incentives depend on project analysis and verified savings.",
"sourceUrls": [
"[https://focusonenergy.com/business/building-optimization](https://focusonenergy.com/business/building-optimization)",
"[https://focusonenergy.com/business/new-construction](https://focusonenergy.com/business/new-construction)",
"[https://focusonenergy.com/expresseda](https://focusonenergy.com/expresseda)",
"[https://assets.focusonenergy.com/production/docs/business/BNC-Overview-Flyer-2026.pdf](https://assets.focusonenergy.com/production/docs/business/BNC-Overview-Flyer-2026.pdf)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "retro_commissioning_study",
"action": "keep",
"reason": "The official Focus on Energy building optimization path supports retro-commissioning studies for eligible existing buildings, with published 2026 incentive rates based on verified EUI reduction."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "Focus states a general project incentive limit of $300,000 per project and $400,000 per customer per calendar year across all Focus incentives; RCx base incentive also has a $100,000 project cap and 75% cost cap."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": null,
"approvalRequiredBeforeInstallation": true,
"applicationDeadline": "Projects must be completed by 12/31/2026 for the cited 2026 Retro-Commissioning application.",
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://focusonenergy.com/business/building-optimization](https://focusonenergy.com/business/building-optimization)",
"[https://focusonenergy.com/business/new-construction](https://focusonenergy.com/business/new-construction)",
"[https://focusonenergy.com/expresseda](https://focusonenergy.com/expresseda)",
"[https://assets.focusonenergy.com/production/docs/business/BI-RCx-Application-Fillable-2026.pdf](https://assets.focusonenergy.com/production/docs/business/BI-RCx-Application-Fillable-2026.pdf)",
"[https://assets.focusonenergy.com/production/docs/business/BNC-Overview-Flyer-2026.pdf](https://assets.focusonenergy.com/production/docs/business/BNC-Overview-Flyer-2026.pdf)"
],
"evidenceText": "Focus on Energy publishes a 2026 Retro-Commissioning incentive table based on verified EUI reduction and building square footage, plus separate process support for building optimization and new construction.",
"reasoningNotes": "The retro-commissioning edge is supported as a nonphysical study/process measure. New construction design assistance should stay scoped as separate process support, not a single physical retrofit.",
"humanReviewRequired": false,
"humanReviewReasons": []
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22545",
"opportunityName": "Madison Gas & Electric - Charge Ahead Program",
"repairStatus": "calculation_package_found",
"calculationStatus": "calculable_with_missing_inputs",
"sourceConfidence": "high",
"estimateConfidence": "high",
"cashValueClassifications": [
"rebate",
"tariff_or_rate"
],
"primaryValueModelKinds": [
"fixed_tier_amount",
"tariff_or_rate"
],
"effects": [
{
"effectType": "recurring_savings",
"cashValueClassification": "rebate",
"valueModelKind": "fixed_tier_amount",
"timing": "monthly",
"formulaText": "For eligible MGE standard-rate residential EV customers, pay a monthly reward when the customer charges at least 80% off-peak during the calendar month, keeps smart charging enabled throughout the month, and has no more than three unmanaged sessions. Reward is $8 per month for June through August and $4 per month for September through May, for a maximum of $60 per year.",
"amountCents": null,
"percent": null,
"rate": null,
"rateUnit": "month",
"minAmountCents": 400,
"maxAmountCents": 800,
"caps": {
"maxAwardCents": null,
"minAwardCents": null,
"maxPercentOfEligibleCost": null,
"maxUnits": null,
"perCustomerCapCents": null,
"perSiteCapCents": null,
"annualCapCents": 6000,
"programBudgetCents": null
},
"eligibleCostCategories": [],
"ineligibleCostCategories": [
"EV charger purchase cost",
"EV charger installation cost"
],
"requiredInputs": [
"MGE residential electric customer status",
"rate type",
"calendar month",
"off-peak charging percentage",
"smart charging enabled status for the full month",
"number of unmanaged charging sessions",
"compatible EV or compatible home charger connection",
"registered home charging address",
"PayPal or Venmo reward account"
],
"missingInputsForTypicalRetroFiEstimate": [
"rate type",
"calendar month",
"off-peak charging percentage",
"unmanaged charging session count",
"smart charging enabled status"
],
"rateTable": {
"tableId": "MGE_Charge_Ahead_Standard_Rate_Monthly_Rewards",
"dimensions": [
"season",
"months",
"monthlyRewardCents",
"performanceRequirement"
],
"rows": [
{
"season": "Summer",
"months": [
"June",
"July",
"August"
],
"monthlyRewardCents": 800,
"performanceRequirement": "At least 80% off-peak charging, smart charging enabled throughout the month, and no more than three unmanaged sessions."
},
{
"season": "Fall/Winter/Spring",
"months": [
"September",
"October",
"November",
"December",
"January",
"February",
"March",
"April",
"May"
],
"monthlyRewardCents": 400,
"performanceRequirement": "At least 80% off-peak charging, smart charging enabled throughout the month, and no more than three unmanaged sessions."
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
"evidenceText": "MGE Charge Ahead pays standard-rate customers $8/month in June-August and $4/month in September-May if monthly smart-charging performance rules are met.",
"sourceUrls": [
"[https://www.mge.com/smart-energy/electric-vehicles/ev-programs/charge-ahead](https://www.mge.com/smart-energy/electric-vehicles/ev-programs/charge-ahead)",
"[https://mge.ev.energy/](https://mge.ev.energy/)"
]
},
{
"effectType": "recurring_savings",
"cashValueClassification": "tariff_or_rate",
"valueModelKind": "tariff_or_rate",
"timing": "monthly",
"formulaText": "For eligible MGE time-of-use residential customers, Charge Ahead does not provide a separate cash reward. The app schedules charging to avoid peak periods and target lower-cost off-peak periods; bill savings depend on home EV charging kWh shifted from higher-cost to lower-cost TOU periods and the customer’s applicable TOU rate differential.",
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
"EV charger purchase cost",
"EV charger installation cost"
],
"requiredInputs": [
"TOU rate schedule",
"home EV charging kWh by time period",
"baseline unmanaged charging schedule",
"smart-charged schedule",
"applicable on-peak and off-peak energy prices",
"registered home charging address"
],
"missingInputsForTypicalRetroFiEstimate": [
"TOU rate schedule",
"home EV charging kWh by time period",
"baseline unmanaged charging schedule",
"smart-charged schedule"
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
"evidenceText": "MGE says TOU customers do not receive cash incentives through Charge Ahead; savings come from shifting charging to lower-cost times on the bill.",
"sourceUrls": [
"[https://www.mge.com/smart-energy/electric-vehicles/ev-programs/charge-ahead](https://www.mge.com/smart-energy/electric-vehicles/ev-programs/charge-ahead)",
"[https://mge.ev.energy/](https://mge.ev.energy/)"
]
}
],
"edgeActions": [
{
"retrofitTypeId": "ev_charger_installation",
"action": "delete_bad_edge",
"reason": "Official Charge Ahead materials state no charging station installation is required if the vehicle is supported; the source supports managed charging rewards, not charger purchase or installation rebates."
}
],
"stackingRules": {
"stackableWithRebates": null,
"stackableWithTaxCredits": null,
"mustDeductOtherIncentivesFromEligibleCost": null,
"notes": "No charger-installation rebate stacking rule was found because Charge Ahead is a managed charging reward and TOU optimization program."
},
"timingRequirements": {
"approvalRequiredBeforePurchase": false,
"approvalRequiredBeforeInstallation": false,
"applicationDeadline": null,
"fundingStatus": "open_funds_available"
},
"sourceUrlsChecked": [
"[https://www.mge.com/smart-energy/electric-vehicles/ev-programs/charge-ahead](https://www.mge.com/smart-energy/electric-vehicles/ev-programs/charge-ahead)",
"[https://www.mge.com/our-environment/electric-vehicles/charging/charge-ahead](https://www.mge.com/our-environment/electric-vehicles/charging/charge-ahead)",
"[https://mge.ev.energy/](https://mge.ev.energy/)",
"[https://web.ev.energy/](https://web.ev.energy/)"
],
"evidenceText": "MGE Charge Ahead is a residential managed charging program. Standard-rate customers can earn monthly rewards for off-peak smart charging; TOU customers receive bill savings rather than cash rewards.",
"reasoningNotes": "The EV charger installation edge is unsupported. The calculable value is recurring performance reward for standard-rate customers and tariff-dependent savings for TOU customers.",
"humanReviewRequired": false,
"humanReviewReasons": []
}
],
"continueFromOpportunityId": null
}
