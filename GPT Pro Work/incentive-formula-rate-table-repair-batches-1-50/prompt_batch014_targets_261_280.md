You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 14
Targets in this prompt: 261-280 of 984
Repair objects required: 20

Core distinction:
- Eligibility matching is already handled elsewhere. Do not decide whether a specific user is eligible.
- Your job is to extract the source-backed value/calculation/workflow logic for an already-matched opportunity.
- If current target retrofit edges are unsupported by the source, mark those edges as delete_bad_edge. Do not preserve false physical retrofit edges.
- If the opportunity is real but belongs to a special workflow, classify it as non_monetary_workflow, process_value, permit_fee_waiver, interconnection, technical_assistance, financing, tax_credit, tariff, or another accurate category.

Use current official sources first:
- program administrator pages
- utility rebate pages
- current application forms
- PDFs, program manuals, tariffs, statutes, tax authority pages, solicitation guides, rate sheets
- DSIRE may be used as a lead, but not as final authority when official sources are available.

Do not overstate value:
- Treat 'up to' as a cap, not an expected amount.
- Competitive max-only grants should not get a dollar estimate unless source-backed probability evidence exists.
- Loans/financing are not cash savings unless explicit forgiveness, buy-down, or subsidy value is stated.
- Tax credits are monetary, but classify them as tax_credit effects, not grants.
- Custom incentives should be custom_quote_required unless a formula/rate table is published.
- If project cost, unit count, kW, kWh savings, battery kWh, square feet, tonnage, equipment tier, or eligible cost basis is required, list it in requiredInputs.

Important target interpretation:
- `existingSimpleRules` are current legacy rules. Fact-check them; do not assume they are right.
- `reviewedNoRule` means previous research did not find a simple one-time formula. Re-check for recurring credits, tariffs, tax credits, grants, rate tables, measure catalogs, non-cash workflow value, or bad edges.
- `repairedOpportunityData` contains the latest source-confidence and match repair notes. Use it to avoid false physical edges and source-inaccessible traps.

Output schema:
{
  "schemaVersion": "incentive_formula_rate_table_research_repairs.v1",
  "researchedAt": "2026-07-02",
  "source": "gpt_pro",
  "batchNumber": 14,
  "repairs": [
    {
      "opportunityId": "exact target opportunityId",
      "opportunityName": "",
      "repairStatus": "calculation_package_found | custom_quote_required | non_monetary_workflow | no_monetary_effect | source_inaccessible | unavailable_archive | bad_edge_delete_only | needs_human_review",
      "calculationStatus": "calculable | calculable_with_missing_inputs | estimate_from_range | custom_quote_estimate | source_inaccessible_repair_failure | unavailable_archived | non_monetary_workflow | no_calculable_value | needs_repair_review",
      "sourceConfidence": "high | medium | low",
      "estimateConfidence": "high | medium | low",
      "cashValueClassifications": ["cash_grant | reimbursement | rebate | tax_credit | loan | financing | technical_assistance | process_value | tariff_or_rate | non_cash | unknown"],
      "primaryValueModelKinds": ["fixed_amount | fixed_tier_amount | percent_of_eligible_cost | capped_percent_of_eligible_cost | per_unit_award | rate_table | measure_catalog | hybrid_rate_plus_cap | competitive_max_only | competitive_award_range | competitive_cost_share | formula_grant | tax_credit | loan_or_financing | tariff_or_rate | custom_quote | non_cash_process_value | no_calculable_value | source_inaccessible"],
      "effects": [
        {
          "effectType": "one_time_savings | recurring_savings | recurring_expense | grant_expected_value | tax_credit | financing_subsidy | process_value | no_cash_value",
          "cashValueClassification": "cash_grant | reimbursement | rebate | tax_credit | loan | financing | technical_assistance | process_value | tariff_or_rate | non_cash | unknown",
          "valueModelKind": "fixed_amount | fixed_tier_amount | percent_of_eligible_cost | capped_percent_of_eligible_cost | per_unit_award | rate_table | measure_catalog | hybrid_rate_plus_cap | competitive_max_only | competitive_award_range | competitive_cost_share | formula_grant | tax_credit | loan_or_financing | tariff_or_rate | custom_quote | non_cash_process_value | no_calculable_value | source_inaccessible",
          "timing": "upfront | point_of_sale | post_purchase_rebate | post_installation_reimbursement | annual | monthly | tax_filing | loan_closing | application_process | unknown",
          "formulaText": "plain English formula from source",
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
            "probabilityEvidenceType": "not_required | historical_success_rate | budget_and_expected_awards | historical_awards_only | first_come_funds_confirmed | first_come_funding_unknown | scoring_criteria_only | eligibility_only | human_reviewed | none"
          },
          "includedInUserFacingTotalDefault": false,
          "evidenceText": "under 75 words, no URLs",
          "sourceUrls": []
        }
      ],
      "edgeActions": [
        {
          "retrofitTypeId": "target retrofitTypeId",
          "action": "keep | delete_bad_edge | move_to_special_workflow | needs_review",
          "reason": "source-backed reason"
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
        "fundingStatus": "open_funds_available | open_while_funds_last | waitlist | closed | exhausted | unknown"
      },
      "sourceUrlsChecked": [],
      "evidenceText": "under 75 words, no URLs",
      "reasoningNotes": "",
      "humanReviewRequired": false,
      "humanReviewReasons": []
    }
  ],
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:1344"
}

Validation before responding:
- JSON.parse must succeed.
- repairs.length must equal 20.
- repairs must be in the same order as targets.
- Every target opportunityId must appear exactly once.
- Use raw URL strings only. No markdown links.
- Use cents for USD amounts where amount fields end in Cents.
- Use null for unknown numeric values, not 0.
- Use empty arrays for unknown lists.
- Keep evidenceText fields concise and URL-free.

Targets:
[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3745",
    "opportunityName": "PEPCO - Residential Energy Efficiency Rebate Program",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3745/pepco-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://homeenergysavings.pepco.com/",
    "applicationUrl": "https://homeenergysavings.pepco.com/md/residential/appliance-rebate-program",
    "administrator": "Pepco Maryland Home Energy Savings Program",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigerator",
          "freezer"
        ]
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart thermostat",
          "thermostat"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Pepco Maryland electric service territory"
        ],
        "notes": "Use the Maryland Home Energy Savings pages; Pepco District of Columbia and business offers are separate."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "tenant",
        "landlord"
      ],
      "eligibleSectors": [
        "residential",
        "single_family",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_hvac_replacement",
        "home_energy_assessment",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "refrigerator_freezer_recycling",
        "residential_energy_star_appliance"
      ],
      "hardRequirements": [
        "Applicant must have an active Pepco Maryland residential electric account.",
        "Appliance rebates require qualifying ENERGY STAR or program-listed products and submission through the rebate center.",
        "Appliance recycling requires an old working refrigerator or freezer and qualifying pickup rules.",
        "Home Performance and electrification rebates require an eligible home assessment and qualifying improvements; some offers are single-family only.",
        "HVAC and HPWH incentives require qualifying equipment and program documentation."
      ],
      "blockers": [
        "High-efficiency refrigeration equipment should be blocked; current refrigerator/freezer support is residential appliance recycling or appliance rebates, not commercial refrigeration.",
        "Pepco business programs and District of Columbia programs are separate and should not be inferred here.",
        "Home Performance rebates should not be matched to condos or apartments where the current page limits that offer to single-family homes.",
        "Energy assessment is a service and should not be counted as a physical retrofit."
      ],
      "programType": "Rebate Program",
      "administrator": "Pepco Maryland Home Energy Savings Program",
      "applicationUrl": "https://homeenergysavings.pepco.com/md/residential/appliance-rebate-program",
      "websiteUrl": "https://homeenergysavings.pepco.com/",
      "sourceUrlsChecked": [
        "https://homeenergysavings.pepco.com/",
        "https://homeenergysavings.pepco.com/md/residential/appliance-rebate-program",
        "https://homeenergysavings.pepco.com/md/residential/appliance-rebate-program/electric-heat-pump-water-heater",
        "https://homeenergysavings.pepco.com/md/residential/appliance-rebate-program/smart-thermostats",
        "https://homeenergysavings.pepco.com/md/residential/home-performance-with-energy-star-program"
      ],
      "evidenceText": "Pepco Maryland pages list HPWH and smart thermostat rebates, appliance recycling for old refrigerators/freezers, HVAC/Home Performance programs and electrification/weatherization upgrades.",
      "reasoningNotes": "Repaired refrigerator/freezer matching to residential recycling/appliance context and kept HVAC only for qualifying residential HVAC, heat-pump or Home Performance measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b62a61ec5e88e771_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 10000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$100 per ENERGY STAR certified smart thermostat",
        "evidenceText": "Pepco residential rebate page lists $100 for ENERGY STAR certified smart thermostats.",
        "sourceUrlsChecked": [
          "https://homeenergysavings.pepco.com/md/residential/appliance-rebates",
          "https://homeenergysavings.pepco.com/md/residential/rebates"
        ],
        "reasoningNotes": "Matched smart thermostat term. Returned separately from HPWH.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_dfaaba3805980308_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 160000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$1,600 per ENERGY STAR certified hybrid heat pump water heater",
        "evidenceText": "Pepco residential rebate page lists $1,600 for ENERGY STAR certified hybrid water heaters.",
        "sourceUrlsChecked": [
          "https://homeenergysavings.pepco.com/md/residential/appliance-rebates",
          "https://homeenergysavings.pepco.com/md/residential/rebates"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying water heater.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4909",
    "opportunityName": "DTE Energy (Gas) - Residential Energy Efficiency Program",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4909/dte-energy-gas-residential-energy-efficiency-program",
    "websiteUrl": "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/furnaces.html",
    "applicationUrl": "https://rebates.dteenergy.com/",
    "administrator": "DTE Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "furnace"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "clothes washer"
        ]
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "thermostat"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "DTE Energy natural gas service territory",
          "DTE Energy electric service territory"
        ],
        "notes": "Gas measures require DTE natural gas service; some appliance or electric measures require DTE electric or combo service."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customer",
        "residential_electric_customer",
        "residential_combo_customer",
        "homeowner",
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "furnace_tune_up",
        "insulation_upgrade",
        "window_replacement",
        "high_efficiency_gas_water_heater",
        "tankless_gas_water_heater",
        "smart_thermostat_zoning_retrofit",
        "residential_clothes_washer",
        "high_efficiency_clothes_dryer",
        "heat_pump_clothes_dryer"
      ],
      "hardRequirements": [
        "Applicant must have the relevant DTE residential gas, electric, or combo service for the specific measure.",
        "Home must generally be an eligible residential premises, individually metered and noncommercial.",
        "Some measures require the home to be more than 24 months old.",
        "Furnace tune-ups and some installed measures require participating contractors and primary natural gas heating.",
        "Applications must be submitted within current program deadlines and include required invoices or documentation.",
        "Rebates are subject to current specifications and funding."
      ],
      "blockers": [
        "Do not match electric heat pump HVAC under this gas-focused record unless a separate DTE electric heat pump program is verified.",
        "Commercial laundry and water-efficiency laundry categories are not supported; washer and dryer rebates are residential appliances.",
        "New construction and first-time furnace installations are excluded for furnace replacement rebates.",
        "Do not match commercial, multifamily common-area, or industrial measures."
      ],
      "programType": "Rebate Program",
      "administrator": "DTE Energy",
      "applicationUrl": "https://rebates.dteenergy.com/",
      "websiteUrl": "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/furnaces.html",
      "sourceUrlsChecked": [
        "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/furnaces.html",
        "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/insulation-and-windows.html",
        "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/water-heaters.html",
        "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/wi-fi-enabled-thermostats.html",
        "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/washers-dryers.html",
        "https://rebates.dteenergy.com/"
      ],
      "evidenceText": "DTE]( residential rebate pages support gas furnaces and tune-ups, insulation and windows, gas water heaters, Wi-Fi thermostats, washers, and dryers, with fuel-service, home type, contractor, and deadline requirements.",
      "reasoningNotes": "The record should not become a generic HVAC or commercial laundry program. Fuel-specific DTE eligibility is important for matching."
    },
    "existingSimpleRules": [
      {
        "id": "oir_990a31f63a2a7630_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 5000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$50 per Wi-Fi enabled thermostat",
        "evidenceText": "DTE 2026 gas rebate chart lists thermostat, Wi-Fi enabled, at $50.",
        "sourceUrlsChecked": [
          "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/furnaces.html",
          "https://michiganrebates.com/sites/default/files/2026-02/57562_DTE_HVAC_IncentiveChart_MichiganRebates.com_Gas_v2_Web_Release.pdf"
        ],
        "reasoningNotes": "Matched thermostat term. Use one unit as one eligible thermostat.",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_dd349388cdceb29b_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 40000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$400 per 98% AFUE residential furnace",
        "evidenceText": "DTE 2026 gas rebate chart lists Best furnace, 98% AFUE, at $400.",
        "sourceUrlsChecked": [
          "https://www.dteenergy.com/us/en/residential/save-money-energy/rebates-and-offers/furnaces.html",
          "https://michiganrebates.com/sites/default/files/2026-02/57562_DTE_HVAC_IncentiveChart_MichiganRebates.com_Gas_v2_Web_Release.pdf"
        ],
        "reasoningNotes": "Matched furnace term. Returned the highest current furnace tier.",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22711",
    "opportunityName": "Michigan - Home Electrification and Appliance Rebate (HEAR) Program",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22711/michigan-home-electrification-and-appliance-rebate-hear-program",
    "websiteUrl": "https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs",
    "applicationUrl": "https://mienergyrebates.clearesult.com/help-center",
    "administrator": "Michigan Department of Environment, Great Lakes, and Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air sealing"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Michigan program, with application and rollout conditions; Detroit District income-qualified applications were temporarily suspended on the portal at review."
      },
      "eligibleApplicantTypes": [
        "low_income_household",
        "moderate_income_household",
        "owner_occupant",
        "renter_with_owner_approval"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_heat_pump",
        "heat_pump_water_heater",
        "electric_stove_range_or_oven",
        "heat_pump_clothes_dryer",
        "electrical_panel_upgrade",
        "electrical_wiring_upgrade",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "ventilation_upgrade"
      ],
      "hardRequirements": [
        "Household must meet HEAR income eligibility, generally at or below 150 percent of area median income.",
        "Applicant must use the Michigan rebate process and an approved contractor where required.",
        "Assessment and approval are required before eligible work.",
        "Rebate is paid through the program process and may be paid to the contractor."
      ],
      "blockers": [
        "Do not match generic high-efficiency HVAC unless it is an eligible electric heat pump measure.",
        "Do not match windows, doors, furnaces, standard central air conditioners, or refrigerators to the HEAR record.",
        "Do not combine HOMES and HEAR rebates for the same single upgrade.",
        "New construction is not eligible.",
        "Detroit District application pause may block matching for affected applicants until official portal status changes."
      ],
      "programType": "Rebate Program",
      "administrator": "Michigan Department of Environment, Great Lakes, and Energy",
      "applicationUrl": "https://mienergyrebates.clearesult.com/help-center",
      "websiteUrl": "https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs",
      "sourceUrlsChecked": [
        "https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs",
        "https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs/get-rebate",
        "https://www.michigan.gov/egle/faqs/climate-and-energy/home-energy-rebates-program",
        "https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs/contractors/incentives",
        "https://mienergyrebates.clearesult.com/help-center"
      ],
      "evidenceText": "Michigan describes active home energy rebates for eligible households. HEAR contractor incentives cover electric heat pumps, heat pump water heaters, electric cooking, heat pump dryers, load service center upgrades, insulation, air sealing, ventilation, and wiring.",
      "reasoningNotes": "Separate HEAR from HOMES. The supplied air sealing, heat pump, heat pump water heater, and insulation matches are supported; broad HVAC should be narrowed to heat-pump equipment."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0e63a8dc535562bd_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 160000
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $1,600 for eligible insulation, air sealing, and mechanical ventilation",
        "evidenceText": "DOE/Michigan MiHER materials list up to $1,600 for insulation, air sealing, and mechanical ventilation.",
        "sourceUrlsChecked": [
          "https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs/get-rebate",
          "https://content.govdelivery.com/accounts/USDOESCEP/bulletins/3bedb4f"
        ],
        "reasoningNotes": "HEAR rebates depend on income qualification and approved project pathway.",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_619aae9487f903ba_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 175000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $1,750 for eligible heat pump water heater",
        "evidenceText": "DOE/Michigan MiHER materials list up to $1,750 for heat pump water heater.",
        "sourceUrlsChecked": [
          "https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs/get-rebate",
          "https://content.govdelivery.com/accounts/USDOESCEP/bulletins/3bedb4f"
        ],
        "reasoningNotes": "HEAR rebates depend on income qualification and approved project pathway.",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_637fbe33acf796fd_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 800000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $8,000 for eligible heat pump for space heating and cooling",
        "evidenceText": "DOE/Michigan MiHER materials list up to $8,000 for heat pump for space heating and cooling.",
        "sourceUrlsChecked": [
          "https://www.michigan.gov/egle/about/organization/materials-management/energy/rfps-loans/home-energy-rebate-programs/get-rebate",
          "https://content.govdelivery.com/accounts/USDOESCEP/bulletins/3bedb4f"
        ],
        "reasoningNotes": "HEAR rebates depend on income qualification and approved project pathway.",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3332",
    "opportunityName": "Lincoln Electric System - Sustainable Energy Program",
    "state": "NE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3332/lincoln-electric-system-sustainable-energy-program",
    "websiteUrl": "https://www.les.com/sustainability/sustainable-energy-program",
    "applicationUrl": null,
    "administrator": "Lincoln Electric System",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "geothermal heat pump",
          "geothermal"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "mini split"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner"
        ]
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NE"
        ],
        "counties": [],
        "cities": [
          "Lincoln"
        ],
        "utilityTerritories": [
          "Lincoln Electric System"
        ],
        "notes": "Applies to eligible LES electric customers and premises in the LES service area."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "business_customer",
        "commercial_customer",
        "industrial_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "variable_frequency_drive_retrofit",
        "energy_management_system"
      ],
      "hardRequirements": [
        "Customer must receive electric service from Lincoln Electric System.",
        "Residential projects must use participating contractors where required by the Sustainable Energy Program.",
        "Commercial and industrial projects may require preauthorization and LES review.",
        "Incentives are first-come, first-served and available only while annual program funds remain."
      ],
      "blockers": [
        "Do not infer residential appliance, commercial kitchen, refrigeration, or motor incentives from this target unless matching to the separate business measures in the current LES guide.",
        "Insulation and sealing measures are limited by preconditions such as existing insulation level and required testing where applicable."
      ],
      "programType": "Rebate Program",
      "administrator": "Lincoln Electric System",
      "applicationUrl": null,
      "websiteUrl": "https://www.les.com/sustainability/sustainable-energy-program",
      "sourceUrlsChecked": [
        "https://www.les.com/sustainability/sustainable-energy-program",
        "https://www.les.com/sustainable-energy-program"
      ],
      "evidenceText": "LES]( lists 2026 Sustainable Energy Program incentives for heat pumps, geothermal heat pumps, efficient air conditioners, heat pump water heaters, insulation and sealing, and business efficiency measures.",
      "reasoningNotes": "The target HVAC, HPWH, geothermal, and insulation categories are supported. Business-only categories should not be attached to residential matches."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8fb67c9bd69bf9b4_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 50000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$500 per eligible heat pump water heater",
        "evidenceText": "LES Sustainable Energy Program lists a $500 incentive for qualifying heat pump water heaters.",
        "sourceUrlsChecked": [
          "https://www.les.com/sustainability/sustainable-energy-program",
          "https://www.les.com/sites/default/files/2025-12/2026-sep-incentive-menu.pdf"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying water heater.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c4826afac606481c_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 30000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$300 per high-efficiency air conditioner, air-source heat pump, or mini-split",
        "evidenceText": "LES 2026 incentive menu lists high-efficiency AC, air-source heat pump, and mini-split at $300.",
        "sourceUrlsChecked": [
          "https://www.les.com/sustainability/sustainable-energy-program",
          "https://www.les.com/sites/default/files/2025-12/2026-sep-incentive-menu.pdf"
        ],
        "reasoningNotes": "Matched air conditioner, heat pump, and mini-split terms. Returned separately from HPWH.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22060",
    "opportunityName": "Southern Power District - Commercial Energy Efficiency Rebate Programs",
    "state": "NE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22060/southern-power-district-commercial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://southernpd.energywisenebraska.com/business/",
    "applicationUrl": null,
    "administrator": "Southern Power District",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "geothermal heat pump",
          "geothermal"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner"
        ]
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fixture"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NE"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Southern Power District electric service territory",
          "EnergyWise Nebraska participating utility territory"
        ],
        "notes": "Business incentives are administered through Southern Power District and EnergyWise Nebraska program forms."
      },
      "eligibleApplicantTypes": [
        "commercial_customers",
        "industrial_customers",
        "large_commercial_customers",
        "master_metered_multifamily_customers",
        "agricultural_business_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "master_metered_multifamily"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "air_source_heat_pump",
        "ground_source_geothermal_heat_pump",
        "water_source_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "hvac_optimization",
        "hvac_controls_retrofit",
        "economizer_controls",
        "variable_frequency_drive_retrofit",
        "industrial_process_efficiency",
        "compressed_air_efficiency",
        "high_efficiency_refrigeration_equipment",
        "process_chiller_optimization",
        "custom_lighting_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Southern Power District business customer.",
        "Lighting incentives generally apply to existing facilities and require qualifying DLC or program-listed products.",
        "Commercial HVAC equipment must be permanently installed and meet efficiency requirements.",
        "Industrial process and VFD projects require preapproval before equipment is ordered.",
        "Some incentive totals require preapproval and project cost caps apply."
      ],
      "blockers": [
        "Low_flow_fixture_retrofit is a false positive; fixture refers to lighting fixtures, not plumbing or water-efficiency fixtures.",
        "Residential smart thermostats and general home weatherization are not supported.",
        "Custom lighting and prescriptive lighting generally exclude new construction, while commercial HVAC may allow new or existing nonresidential buildings.",
        "Do not infer solar, EV charging, or residential appliance rebates."
      ],
      "programType": "Rebate Program",
      "administrator": "Southern Power District",
      "applicationUrl": null,
      "websiteUrl": "https://southernpd.energywisenebraska.com/business/",
      "sourceUrlsChecked": [
        "https://southernpd.energywisenebraska.com/business/",
        "https://southernpd.energywisenebraska.com/wp-content/uploads/PrescriptiveLightingApplication.pdf",
        "https://southernpd.energywisenebraska.com/wp-content/uploads/CommercialHVACApplication2023.pdf",
        "https://southernpd.energywisenebraska.com/wp-content/uploads/VariableFrequencyDriveApplication.pdf",
        "https://southernpd.energywisenebraska.com/wp-content/uploads/HeatPumpWaterHeaterApplication2022.pdf"
      ],
      "evidenceText": "EnergyWise Southern Power District business incentives cover existing lighting, commercial HVAC, industrial process, VFDs, custom lighting, HVAC optimization and heat pump water heaters.",
      "reasoningNotes": "The HVAC, heat pump, lighting and industrial categories are supported. The low-flow fixture match must be blocked because it came from lighting fixture language, not water conservation."
    },
    "existingSimpleRules": [
      {
        "id": "oir_cb5e63a65cae0030_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.5
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "50% of eligible project cost",
        "evidenceText": "In no case will the incentive be more than 50% of the invoiced project cost",
        "sourceUrlsChecked": [
          "https://southernpd.energywisenebraska.com/business/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null,
          "businessRelevance": "business_relevant",
          "v1Readiness": "needs_project_scope"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1406",
    "opportunityName": "Liberty Utilities (Gas) - Commercial Energy Efficiency Programs",
    "state": "NH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1406/liberty-utilities-gas-commercial-energy-efficiency-programs",
    "websiteUrl": "https://new-hampshire.libertyutilities.com/allenstown/commercial/smart-energy-use/natural-gas/natural-gas-programs.html",
    "applicationUrl": null,
    "administrator": "Liberty Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air sealing",
          "weatherization"
        ]
      },
      {
        "retrofitTypeId": "boiler_controls_burner_retrofit",
        "displayName": "Boiler controls / burner retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "boiler reset"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_boiler_retrofit",
        "displayName": "High-efficiency boiler retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "boiler"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NH"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Liberty Utilities natural gas service territory in New Hampshire"
        ],
        "notes": "Limited to eligible New Hampshire Liberty natural gas commercial, industrial, and municipal customers."
      },
      "eligibleApplicantTypes": [
        "commercial_gas_customer",
        "industrial_gas_customer",
        "municipal_gas_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "municipal",
        "institutional",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_furnace_retrofit",
        "boiler_controls_burner_retrofit",
        "high_efficiency_water_heater",
        "steam_trap_replacement",
        "commercial_kitchen_equipment",
        "custom_gas_efficiency_project"
      ],
      "hardRequirements": [
        "Customer must be an eligible Liberty New Hampshire natural gas customer.",
        "Project may require pre-qualification and is subject to available funds.",
        "Equipment must meet NHSaves gas program eligibility and efficiency requirements."
      ],
      "blockers": [
        "Do not match electric lighting, electric motors, VFDs, or compressed air to this gas-program record unless they are part of a separate NHSaves electric program.",
        "Do not infer residential-only weatherization from this commercial gas program.",
        "On-bill financing is a related payment option, not a separate rebate category."
      ],
      "programType": "Rebate Program",
      "administrator": "Liberty Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://new-hampshire.libertyutilities.com/allenstown/commercial/smart-energy-use/natural-gas/natural-gas-programs.html",
      "sourceUrlsChecked": [
        "https://new-hampshire.libertyutilities.com/allenstown/commercial/smart-energy-use/natural-gas/natural-gas-programs.html",
        "https://new-hampshire.libertyutilities.com/uploads/Commercial%20Heaters%20Water%20Heating%202022%20Rebates.pdf",
        "https://new-hampshire.libertyutilities.com/uploads/On%20Bill%20Financing%20Flyer%202022.pdf",
        "https://nhsaves.com/wp-content/uploads/2025/01/2025-NHSaves-Gas_Locked.pdf"
      ],
      "evidenceText": "Liberty and NHSaves gas materials identify rebates and assistance for commercial gas heating, water heating, building insulation, air sealing, thermostats, steam measures, custom gas projects, energy assessments, and commercial kitchen equipment.",
      "reasoningNotes": "The original matches for air sealing, boilers, insulation, and weatherization are supported. Remove broad electric efficiency categories that belong to separate electric programs."
    },
    "existingSimpleRules": [
      {
        "id": "oir_17167638b7d57327_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 8500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$85 per wireless thermostat",
        "evidenceText": "2026 NHSaves commercial gas rebate PDF lists wireless thermostat at $85.",
        "sourceUrlsChecked": [
          "https://new-hampshire.libertyutilities.com/allenstown/commercial/smart-energy-use/natural-gas/natural-gas-programs.html",
          "https://nhsaves.com/wp-content/uploads/2026/01/2026_NaturalGasRebates_Commercial.pdf"
        ],
        "reasoningNotes": "Matched thermostat term. Use one unit as one qualifying wireless thermostat.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_5a91cc75eab37e34_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 5000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$50 per repaired or replaced steam trap",
        "evidenceText": "2026 NHSaves commercial gas rebate PDF lists steam traps at $50 per repaired/replaced trap.",
        "sourceUrlsChecked": [
          "https://new-hampshire.libertyutilities.com/allenstown/commercial/smart-energy-use/natural-gas/natural-gas-programs.html",
          "https://nhsaves.com/wp-content/uploads/2026/01/2026_NaturalGasRebates_Commercial.pdf"
        ],
        "reasoningNotes": "Matched steam trap term. Use one unit as one qualifying trap.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_e53ea55e9aab309b_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 22500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$225 per aftermarket boiler reset control",
        "evidenceText": "2026 NHSaves commercial gas rebate PDF lists aftermarket boiler reset controls at $225.",
        "sourceUrlsChecked": [
          "https://new-hampshire.libertyutilities.com/allenstown/commercial/smart-energy-use/natural-gas/natural-gas-programs.html",
          "https://nhsaves.com/wp-content/uploads/2026/01/2026_NaturalGasRebates_Commercial.pdf"
        ],
        "reasoningNotes": "Matched boiler reset term. Use one unit as one qualifying control.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22200",
    "opportunityName": "Clean Fleet EV Incentive Program",
    "state": "NJ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22200/clean-fleet-ev-incentive-program",
    "websiteUrl": "https://chargeup.njcleanenergy.com/clean-fleet",
    "applicationUrl": "https://chargeup.njcleanenergy.com/clean-fleet",
    "administrator": "New Jersey Board of Public Utilities Clean Energy Program",
    "programType": "Grant Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "dc_fast_charger_installation",
        "displayName": "DC fast charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "dcfc"
        ]
      },
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charging",
          "charging station"
        ]
      },
      {
        "retrofitTypeId": "ev_make_ready_electrical_upgrade",
        "displayName": "EV make-ready electrical upgrade",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "make ready",
          "make-ready"
        ]
      },
      {
        "retrofitTypeId": "fleet_charging_infrastructure",
        "displayName": "Fleet charging infrastructure",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fleet charging"
        ]
      },
      {
        "retrofitTypeId": "level_2_ev_charger_installation",
        "displayName": "Level 2 EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "level 2",
          "level-2"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NJ"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "New Jersey electric utility territories"
        ],
        "notes": "Statewide New Jersey program for eligible public and nonprofit fleets; charger make-ready rules vary by charger use and utility territory."
      },
      "eligibleApplicantTypes": [
        "state_government_entity",
        "local_government_entity",
        "county_government_entity",
        "municipal_authority",
        "public_school",
        "state_university",
        "community_college",
        "nonprofit_organization"
      ],
      "eligibleSectors": [
        "government",
        "education",
        "nonprofit",
        "fleet",
        "transportation"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "public_level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "fleet_charging_infrastructure",
        "ev_make_ready_electrical_upgrade"
      ],
      "hardRequirements": [
        "Applicant must be an eligible New Jersey governmental, public education, authority or nonprofit fleet entity.",
        "Phase 1 approval is required before purchases or installation.",
        "Chargers must meet program requirements, including dual-port and networking requirements where applicable.",
        "Fleet-only make-ready is eligible only with charging equipment funded under the same program.",
        "Awards are reimbursements subject to available funds and program caps."
      ],
      "blockers": [
        "Do not match private commercial fleets unless they qualify under the listed public or nonprofit applicant types.",
        "Do not combine with NJDEP It Pay$ to Plug In incentives for the same charger.",
        "Vehicle purchase incentives are part of the program but are not building retrofit categories.",
        "Public charging and fleet charging have different incentive and make-ready rules."
      ],
      "programType": "Grant Program",
      "administrator": "New Jersey Board of Public Utilities Clean Energy Program",
      "applicationUrl": "https://chargeup.njcleanenergy.com/clean-fleet",
      "websiteUrl": "https://chargeup.njcleanenergy.com/clean-fleet",
      "sourceUrlsChecked": [
        "https://www.njcleanenergy.com/commercial-industrial/programs/electric-vehicle-programs",
        "https://chargeup.njcleanenergy.com/clean-fleet",
        "https://chargeup.njcleanenergy.com/clean-fleet-incentive-statistics",
        "https://chargeup.njcleanenergy.com/sites/default/files/docs/Clean_Fleets_Terms_and_Conditions_and_Extension_Policy.pdf"
      ],
      "evidenceText": "The FY2027 Clean Fleet program supports eligible New Jersey public and nonprofit fleets with Level 2, DC fast-charging and qualifying fleet make-ready incentives.",
      "reasoningNotes": "Kept charging and make-ready categories; EV vehicle purchase support is noted but not added as a retrofit category."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2d563239feea77d2_v1",
        "incentiveType": "grant",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 400000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.9
        },
        "confidence": "medium",
        "formula": "Up to $4,000 per fleet Level 2 dual-port charger, capped at 90% of charger cost",
        "evidenceText": "FY26 table lists Level 2 Chargers Fleet, up to $4,000 per dual-port charger.",
        "sourceUrlsChecked": [
          "https://chargeup.njcleanenergy.com/sites/default/files/docs/Clean_Fleets_Terms_and_Conditions_and_Extension_Policy.pdf"
        ],
        "reasoningNotes": "Matched fleet charging and Level 2 terms. Medium confidence because source uses up to and FY26 funding ends June 30, 2026.",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_2e6ce9acf9bcdc23_v1",
        "incentiveType": "grant",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 6000000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.9
        },
        "confidence": "medium",
        "formula": "Up to $60,000 per 50-100 kW DC fast dual-port charger, capped at 90% of charger cost",
        "evidenceText": "FY26 table lists DCFC, 50-100 kW, up to $60,000 per dual-port charger.",
        "sourceUrlsChecked": [
          "https://chargeup.njcleanenergy.com/sites/default/files/docs/Clean_Fleets_Terms_and_Conditions_and_Extension_Policy.pdf"
        ],
        "reasoningNotes": "Matched DCFC terms. Use the lowest DCFC power band as the safest candidate when charger kW is unknown.",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3907",
    "opportunityName": "PSE&G - Residential Efficiency Program",
    "state": "NJ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3907/pse-and-g-residential-efficiency-program",
    "websiteUrl": "https://homeenergy.pseg.com/",
    "applicationUrl": null,
    "administrator": "PSE&G",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_commercial_dishwasher",
        "displayName": "High-efficiency commercial dishwasher",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "dishwasher"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigerator",
          "freezer"
        ]
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NJ"
        ],
        "counties": [
          "Bergen",
          "Burlington",
          "Camden",
          "Essex",
          "Gloucester",
          "Hudson",
          "Hunterdon",
          "Mercer",
          "Middlesex",
          "Monmouth",
          "Morris",
          "Ocean",
          "Passaic",
          "Somerset",
          "Union"
        ],
        "cities": [],
        "utilityTerritories": [
          "PSE&G residential electric service territory",
          "PSE&G residential gas service territory",
          "Butler Electric customers with PSE&G residential gas service for certain offers"
        ],
        "notes": "Specific residential offers can depend on fuel, electric or gas service, housing type, income, and participating contractor requirements."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners",
        "owner_occupants",
        "renters",
        "landlords"
      ],
      "eligibleSectors": [
        "residential",
        "low_income_residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_hvac_replacement",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "heat_pump_water_heater",
        "residential_energy_star_dishwasher",
        "residential_refrigerator_or_freezer",
        "appliance_recycling",
        "smart_thermostat",
        "energy_audit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "electrical_panel_upgrade",
        "electrical_wiring_upgrade",
        "water_heater_pipe_insulation",
        "low_flow_fixture_retrofit",
        "advanced_power_strip",
        "whole_home_assessment_led_bulbs"
      ],
      "hardRequirements": [
        "Applicant must be an eligible PSE&G residential customer or otherwise meet the offer-specific service requirements.",
        "HVAC and water-heating rebates require qualified equipment and participating contractor or program rules.",
        "Whole Home Energy Solutions generally requires a BPI contractor assessment and qualifying one-to-four-family residential housing.",
        "Appliance rebates are for residential ENERGY STAR products and exclude commercial or multifamily-commercial appliance purchases."
      ],
      "blockers": [
        "Commercial dishwasher is a false positive; only residential ENERGY STAR dishwashers are supported.",
        "Commercial refrigeration is a false positive; this record covers residential refrigerators, freezers, and recycling.",
        "Broad LED lighting retrofit is too broad; only assessment-installed bulbs or direct-install residential items are supported.",
        "Do not infer motors, VFDs, commercial kitchen equipment, or industrial measures."
      ],
      "programType": "Rebate Program",
      "administrator": "PSE&G",
      "applicationUrl": null,
      "websiteUrl": "https://homeenergy.pseg.com/",
      "sourceUrlsChecked": [
        "https://homeenergy.pseg.com/",
        "https://homeenergy.pseg.com/appliance-offers",
        "https://homeenergy.pseg.com/heatingandcooling",
        "https://homeenergy.pseg.com/WHES",
        "https://homeenergy.pseg.com/WHAssessment"
      ],
      "evidenceText": "PSE&G residential programs include appliance rebates, appliance recycling, HVAC and water-heating rebates, building decarbonization equipment, home assessments, weatherization, and small direct-install items.",
      "reasoningNotes": "The current matched heat pump and HVAC categories are partly supported, but commercial dishwasher, commercial refrigeration, and broad commercial lighting categories must be replaced with residential appliance and assessment-specific categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4711bba1831d62b9_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 2500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$25 per qualifying freezer",
        "evidenceText": "PSE&G all-appliances page lists freezer rebates up to $25.",
        "sourceUrlsChecked": [
          "https://homeenergy.pseg.com/all-appliances"
        ],
        "reasoningNotes": "Matched freezer term. Use one unit as one eligible freezer.",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_938b6f24bc2d167b_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 10000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $100 per qualifying refrigerator",
        "evidenceText": "PSE&G all-appliances page lists refrigerator rebates up to $100.",
        "sourceUrlsChecked": [
          "https://homeenergy.pseg.com/all-appliances"
        ],
        "reasoningNotes": "Matched refrigerator term. Medium because source uses up to.",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_95148ca1a52c3cd9_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 75000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$750 per ENERGY STAR heat pump water heater",
        "evidenceText": "PSE&G all-appliances page lists a $750 rebate for ENERGY STAR heat pump water heaters.",
        "sourceUrlsChecked": [
          "https://homeenergy.pseg.com/all-appliances"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Eligible residential appliance rule.",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4304",
    "opportunityName": "RG&E (Electric) - Small Business Lighting Retrofit Program",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4304/rg-and-e-electric-small-business-lighting-retrofit-program",
    "websiteUrl": "https://www.rge.com/smartenergy/businesssolutions/smallbusiness",
    "applicationUrl": "https://tradeally.efficiencynavigator.com/",
    "administrator": "RG&E",
    "programType": "Small Business Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air sealing"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "lighting retrofit"
        ]
      },
      {
        "retrofitTypeId": "lighting_controls_retrofit",
        "displayName": "Lighting controls retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "lighting controls"
        ]
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "thermostat"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "RG&E electric service territory",
          "RG&E natural gas service territory"
        ],
        "notes": "Small business eligibility is tied to RG&E account status and demand or annual gas-use thresholds."
      },
      "eligibleApplicantTypes": [
        "small_businesses",
        "commercial_customers",
        "gas_only_business_customers"
      ],
      "eligibleSectors": [
        "small_business",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "hvac_controls_retrofit",
        "commercial_thermostat_controls",
        "high_efficiency_refrigeration_equipment",
        "air_sealing_weatherization",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_furnace_retrofit",
        "steam_trap_repair_or_replacement",
        "boiler_economizer",
        "motor_vfd_retrofit",
        "energy_management_system"
      ],
      "hardRequirements": [
        "Applicant must be an eligible RG&E small business or qualifying gas-only customer.",
        "Electric small business eligibility is based on a monthly demand threshold.",
        "Gas-only business eligibility is based on annual therm-use threshold.",
        "Applications and measures must meet RG&E rebate catalog and program rules."
      ],
      "blockers": [
        "Residential air sealing, home weatherization, and residential smart thermostats are not supported.",
        "Commercial heat pumps may be handled through a separate Building Electrification pathway and should not be assumed under this old lighting-only DSIRE label.",
        "Do not infer broad non-lighting eligibility without using current RG&E small-business or C&I rebate categories."
      ],
      "programType": "Small Business Energy Efficiency Rebate Program",
      "administrator": "RG&E",
      "applicationUrl": "https://tradeally.efficiencynavigator.com/",
      "websiteUrl": "https://www.rge.com/smartenergy/businesssolutions/smallbusiness",
      "sourceUrlsChecked": [
        "https://www.rge.com/smartenergy/businesssolutions/smallbusiness",
        "https://www.rge.com/smartenergy/businesssolutions/commercialandindustrialrebates/commercial-and-industrial-rebate-catalogs",
        "https://www.rge.com/business-rebates-and-programs",
        "https://tradeally.efficiencynavigator.com/"
      ],
      "evidenceText": "RG&E Small Business applies to electric customers at or below the demand threshold or gas-only customers at or below the therm threshold and includes lighting plus HVAC, refrigeration and weatherization.",
      "reasoningNotes": "The current official program is broader than the older lighting-only DSIRE name, but matching must remain commercial and small-business specific."
    },
    "existingSimpleRules": [
      {
        "id": "oir_92844cb7619127b3_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.6
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.6
        },
        "confidence": "medium",
        "formula": "Up to 60% of eligible small-business electric equipment upgrade cost",
        "evidenceText": "NYSEG/RG&E small business direct-install materials state eligible small businesses can receive up to 60% of electric equipment rebates.",
        "sourceUrlsChecked": [
          "https://www.rge.com/business-rebates-and-programs",
          "https://www.nyseg.com/smartenergy/businesssolutions/smallbusinessdirectinstall"
        ],
        "reasoningNotes": "Matched small-business lighting retrofit/direct-install target. Measure-level costs depend on approved scope.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3329",
    "opportunityName": "Butler Rural Electric Cooperative - Residential Rebate Program",
    "state": "OH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3329/butler-rural-electric-cooperative-residential-rebate-program",
    "websiteUrl": "https://butlerrural.coop/co-op-rebates",
    "applicationUrl": "https://butlerrural.coop/co-op-rebates",
    "administrator": "Butler Rural Electric Cooperative, Inc.",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "geothermal heat pump",
          "geothermal"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "furnace"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart thermostat",
          "thermostat"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "OH"
        ],
        "counties": [
          "Butler County",
          "Hamilton County",
          "Preble County",
          "Montgomery County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Butler Rural Electric Cooperative"
        ],
        "notes": "Residential member-owners in Butler Rural Electric Cooperative service territory in southwest Ohio."
      },
      "eligibleApplicantTypes": [
        "residential_members",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump",
        "dual_fuel_heat_pump",
        "high_efficiency_hvac_replacement",
        "central_air_conditioner_rebate",
        "heat_pump_water_heater",
        "grid_enabled_electric_water_heater",
        "level_2_ev_charger_installation",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "energy_star_refrigerator_freezer",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a qualifying Butler Rural residential member.",
        "Geothermal systems require listed closed-loop, all-electric, ENERGY STAR and efficiency requirements and use of qualified contractors.",
        "Air-source heat pump rebates require qualifying homes and equipment; ductless systems do not qualify.",
        "Appliance rebates are residential only, limited by equipment type, size and purchase period.",
        "Applicants should contact the cooperative before installation because program rules, funding and inspection requirements apply."
      ],
      "blockers": [
        "High-efficiency furnace alone is not a supported rebate except as backup in a qualifying dual-fuel heat pump system.",
        "Ductless mini-splits do not qualify under the current heat pump rebate rules.",
        "Commercial and industrial buildings are excluded from the ENERGY STAR appliance rebate.",
        "Low-interest loans are separate financing and should not be treated as rebates.",
        "Distributed generation, seasonal, net-metering and net-billing accounts are excluded from some HVAC programs."
      ],
      "programType": "Rebate Program",
      "administrator": "Butler Rural Electric Cooperative, Inc.",
      "applicationUrl": "https://butlerrural.coop/co-op-rebates",
      "websiteUrl": "https://butlerrural.coop/co-op-rebates",
      "sourceUrlsChecked": [
        "https://butlerrural.coop/co-op-rebates",
        "https://butlerrural.coop/geothermal-rebates",
        "https://butlerrural.coop/heat-pump-rebates",
        "https://butlerrural.coop/energy-star-appliance-rebates",
        "https://butlerrural.coop/low-interest-loans"
      ],
      "evidenceText": "Butler Rural's current rebate page lists geothermal, air-source or dual-fuel heat pumps, Level 2 EV chargers, water heaters, insulation and air sealing, ENERGY STAR appliances and smart thermostats.",
      "reasoningNotes": "Kept current residential rebate categories and blocked furnace-only, ductless mini-split and commercial appliance matches; treated loans as separate financing."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0e938d65585dba99_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 60000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$600 per qualifying new or replacement dual-fuel or air-source heat pump",
        "evidenceText": "Butler Rural heat pump page lists $600 for qualifying dual-fuel and air-source heat pump installations.",
        "sourceUrlsChecked": [
          "https://butlerrural.coop/heat-pump-rebates",
          "https://butlerrural.coop/co-op-rebates"
        ],
        "reasoningNotes": "Matched heat pump term. Applies to eligible non-ductless systems installed by participating contractors.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_497749e26bc4c0ce_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 15000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "high",
        "formula": "50% of thermostat cost, capped at $150 per smart thermostat",
        "evidenceText": "Butler Rural smart thermostat page says maximum $150, not to exceed 50% of thermostat unit cost.",
        "sourceUrlsChecked": [
          "https://butlerrural.coop/smart-thermostat-rebates"
        ],
        "reasoningNotes": "Matched smart thermostat term. Modeled as a per-unit maximum with 50% equipment-cost cap.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_bd5256101e687df3_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 120000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$1,200 per new geothermal system",
        "evidenceText": "Butler Rural geothermal page says $1,200 for purchase of a new geothermal system.",
        "sourceUrlsChecked": [
          "https://butlerrural.coop/geothermal-rebates",
          "https://butlerrural.coop/co-op-rebates"
        ],
        "reasoningNotes": "Matched geothermal heat pump term. Use one unit as one new qualifying geothermal system.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2469",
    "opportunityName": "Lane Electric Cooperative - Commercial/Residential Weatherization & Energy Efficiency Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2469/lane-electric-cooperative-commercial-residential-weatherization-and-energy-efficiency-program",
    "websiteUrl": "https://www.laneelectric.com/energy-efficiency/energy-saving-programs/",
    "applicationUrl": null,
    "administrator": "Lane Electric Cooperative",
    "programType": "Grant Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "weatherization"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "ductless"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Lane Electric Cooperative"
        ],
        "notes": "Limited to eligible Lane Electric Cooperative members."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "commercial_member",
        "low_income_household"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "ductless_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be a Lane Electric Cooperative member.",
        "Heat pump rebates and loans require preapproval before installation.",
        "Heat pump work must use a Lane Electric-approved HVAC contractor where required.",
        "Weatherization may require qualifying income or electric heat depending on program track.",
        "Projects must meet Lane Electric and Bonneville Power Administration requirements."
      ],
      "blockers": [
        "Do not match renewable energy incentives; Lane Electric states member renewable incentives ended January 1, 2023.",
        "Do not broaden ductless heat pump support into all HVAC replacements.",
        "Do not infer commercial refrigeration, lighting, or industrial measures.",
        "Solar net metering is not a rebate or weatherization incentive."
      ],
      "programType": "Grant Program",
      "administrator": "Lane Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.laneelectric.com/energy-efficiency/energy-saving-programs/",
      "sourceUrlsChecked": [
        "https://www.laneelectric.com/energy-efficiency/energy-saving-programs/",
        "https://www.laneelectric.com/energy-efficiency/weatherization-programs/",
        "https://www.laneelectric.com/energy-efficiency/heat-pump-program/",
        "https://www.laneelectric.com/energy-efficiency/heat-pump-water-heaters/",
        "https://www.laneelectric.com/energy-efficiency/renewable-energy/member-renewable-programs/"
      ],
      "evidenceText": "Lane Electric official snippets identify weatherization, heat pump, and heat pump water heater programs, and state renewable member incentives ended in 2023.",
      "reasoningNotes": "Direct access remained limited, but official snippets are adequate for medium source confidence. Keep core weatherization and heat-pump categories and block expired renewable incentives."
    },
    "existingSimpleRules": [
      {
        "id": "oir_f99f79ddf5bcea87_v1",
        "incentiveType": "grant",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.25
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 100000
        },
        "confidence": "high",
        "formula": "25% of eligible project cost, capped at $1,000",
        "evidenceText": "Another option is a cash grant for 25% of the measure cost, up to $1,000",
        "sourceUrlsChecked": [
          "https://laneelectric.com/programs-services/current-programs/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null,
          "businessRelevance": "mixed",
          "v1Readiness": "needs_quote"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2493",
    "opportunityName": "Salem Electric - Residential, Commercial, and Industrial Efficiency Rebate Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2493/salem-electric-residential-commercial-and-industrial-efficiency-rebate-program",
    "websiteUrl": "https://www.salemelectric.com/energy-efficiency/incentives/",
    "applicationUrl": null,
    "administrator": "Salem Electric",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "weatherization"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "ductless"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart thermostat",
          "thermostat"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "OR"
        ],
        "counties": [],
        "cities": [
          "Salem"
        ],
        "utilityTerritories": [
          "Salem Electric service territory"
        ],
        "notes": "Official Salem Electric pages were reachable in search results but blocked by 403 in browser rendering; eligibility is limited to Salem Electric members or customers."
      },
      "eligibleApplicantTypes": [
        "residential_members",
        "commercial_customers",
        "industrial_customers"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "heat_pump_clothes_dryer",
        "smart_thermostat",
        "weatherization",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "commercial_lighting_retrofit",
        "variable_frequency_drive_retrofit",
        "custom_energy_efficiency_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Salem Electric member or customer.",
        "Qualifying equipment and incentive forms are required.",
        "Heat pump and weatherization incentives may require approved contractors or program-specific contractor documentation.",
        "Program details and amounts vary by measure and are subject to current Salem Electric rules."
      ],
      "blockers": [
        "Generic high_efficiency_hvac_replacement is too broad; verified residential HVAC measures are heat pumps and mini-splits.",
        "Outdoor electric equipment rebates, if present, are not building retrofits.",
        "Do not infer commercial kitchen, commercial refrigeration, motors beyond listed VFD or custom project review, or solar."
      ],
      "programType": "Rebate Program",
      "administrator": "Salem Electric",
      "applicationUrl": null,
      "websiteUrl": "https://www.salemelectric.com/energy-efficiency/incentives/",
      "sourceUrlsChecked": [
        "https://www.salemelectric.com/energy-efficiency/incentives/",
        "https://www.salemelectric.com/energy-efficiency/incentives/smart-thermostat-incentive/",
        "https://www.salemelectric.com/energy-efficiency/incentives/appliance-incentive-request/",
        "https://www.salemelectric.com/member-services/forms-applications-service-documents/"
      ],
      "evidenceText": "Official Salem Electric pages were blocked by 403, but current official search snippets verify incentives for heat pumps, heat pump water heaters, heat pump clothes dryers, smart thermostats, weatherization and C&I projects.",
      "reasoningNotes": "Because official page rendering was blocked, confidence is medium. The accessible official snippets still support active status and the listed measure boundaries."
    },
    "existingSimpleRules": [
      {
        "id": "oir_779c9a5e9b7ff17f_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 12500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$125 per professionally installed smart thermostat",
        "evidenceText": "Salem Electric smart thermostat incentive page lists a $125 professional installation incentive.",
        "sourceUrlsChecked": [
          "https://www.salemelectric.com/energy-efficiency/incentives/smart-thermostat-incentive/",
          "https://www.salemelectric.com/energy-efficiency/incentives/"
        ],
        "reasoningNotes": "Returned separately because professionally installed thermostats receive a higher amount.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_7e5dc1de6d243f82_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 10000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$100 per homeowner-installed smart thermostat",
        "evidenceText": "Salem Electric smart thermostat incentive page lists a $100 homeowner installation incentive.",
        "sourceUrlsChecked": [
          "https://www.salemelectric.com/energy-efficiency/incentives/smart-thermostat-incentive/",
          "https://www.salemelectric.com/energy-efficiency/incentives/"
        ],
        "reasoningNotes": "Matched smart thermostat term. Professional installation has a separate higher value.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4831",
    "opportunityName": "Philadelphia Gas Works - Residential and Small Business Equipment Rebate Program",
    "state": "PA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4831/philadelphia-gas-works-residential-and-small-business-equipment-rebate-program",
    "websiteUrl": "https://pgwenergysense.com/",
    "applicationUrl": null,
    "administrator": "Philadelphia Gas Works",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air sealing"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_boiler_retrofit",
        "displayName": "High-efficiency boiler retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "boiler"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "furnace"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "PA"
        ],
        "counties": [],
        "cities": [
          "Philadelphia"
        ],
        "utilityTerritories": [
          "Philadelphia Gas Works firm natural gas service territory"
        ],
        "notes": "Limited to PGW firm natural gas customers and qualifying PGW EnergySense service-area premises."
      },
      "eligibleApplicantTypes": [
        "homeowners",
        "landlords",
        "small_businesses",
        "building_owners",
        "commercial_building_owners",
        "business_owners",
        "restaurant_owners"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily",
        "small_business",
        "commercial",
        "restaurant"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "natural_gas_combination_boiler",
        "natural_gas_tankless_water_heater",
        "residential_roof_attic_insulation",
        "air_sealing_weatherization",
        "smart_thermostat",
        "commercial_roof_insulation",
        "commercial_vrf_heat_pump",
        "boiler_reset_control",
        "steam_trap_repair_or_replacement",
        "low_flow_commercial_faucet_or_showerhead",
        "high_efficiency_commercial_gas_fryer",
        "high_efficiency_commercial_steam_cooker",
        "high_efficiency_commercial_water_heater",
        "low_intensity_infrared_heater"
      ],
      "hardRequirements": [
        "Customer must be in PGW firm natural gas service territory.",
        "Equipment must meet PGW EnergySense qualifying efficiency and sizing criteria.",
        "Residential roof insulation and air sealing require natural gas as the primary space-heating fuel.",
        "Weatherization work must be retrofit work and generally requires a qualified or BPI-certified contractor.",
        "Rebates are subject to program dates, funds availability, and application documentation."
      ],
      "blockers": [
        "Generic high_efficiency_hvac_replacement is too broad; only specified PGW natural gas equipment and listed commercial heat-pump measures qualify.",
        "Do not infer residential electric appliances, commercial refrigeration, solar, EV charging, or demand response.",
        "Air sealing and insulation matches must be limited to PGW roof or attic weatherization requirements, not general whole-home weatherization."
      ],
      "programType": "Rebate Program",
      "administrator": "Philadelphia Gas Works",
      "applicationUrl": null,
      "websiteUrl": "https://pgwenergysense.com/",
      "sourceUrlsChecked": [
        "https://pgwenergysense.com/",
        "https://pgwenergysense.com/residential-rebates/",
        "https://pgwenergysense.com/residential-roof-insulation-and-air-sealing-rebates/",
        "https://pgwenergysense.com/commercial-rebates/"
      ],
      "evidenceText": "PGW EnergySense covers residential equipment, roof insulation and air sealing, smart thermostats, and commercial natural gas measures; rebates require qualifying PGW service and equipment.",
      "reasoningNotes": "The combined DSIRE record should keep specific PGW residential and commercial measures, but should not generalize those measures into all HVAC or all envelope retrofits."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b3c069fc080ced04_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 150000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $1,500 per qualifying residential boiler",
        "evidenceText": "PGW efficiency page says residential customers can receive rebates up to $1,500 on boilers.",
        "sourceUrlsChecked": [
          "https://pgwenergysense.com/residential-rebates/"
        ],
        "reasoningNotes": "Matched boiler term. Boiler has a distinct maximum rebate.",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_bef01b43042c2578_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 50000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $500 per qualifying residential furnace",
        "evidenceText": "PGW efficiency page says residential customers can receive rebates up to $500 on furnaces.",
        "sourceUrlsChecked": [
          "https://pgwenergysense.com/residential-rebates/"
        ],
        "reasoningNotes": "Matched furnace term. Medium because final amount depends on equipment/application.",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5354",
    "opportunityName": "Philadelphia Gas Works - Residential Incentives Program",
    "state": "PA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5354/philadelphia-gas-works-residential-incentives-program",
    "websiteUrl": "https://pgwenergysense.com/residential-rebates/",
    "applicationUrl": null,
    "administrator": "Philadelphia Gas Works",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air sealing"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_boiler_retrofit",
        "displayName": "High-efficiency boiler retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "boiler"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "furnace"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "PA"
        ],
        "counties": [],
        "cities": [
          "Philadelphia"
        ],
        "utilityTerritories": [
          "Philadelphia Gas Works firm natural gas service territory"
        ],
        "notes": "Residential incentives apply to qualifying PGW residential premises and residential-size equipment."
      },
      "eligibleApplicantTypes": [
        "homeowners",
        "landlords",
        "residential_customers",
        "small_businesses",
        "building_owners"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "natural_gas_combination_boiler",
        "natural_gas_tankless_water_heater",
        "residential_roof_attic_insulation",
        "air_sealing_weatherization",
        "smart_thermostat"
      ],
      "hardRequirements": [
        "Premise must receive PGW firm natural gas service.",
        "Natural gas furnace, boiler, combi boiler, and tankless water heater measures must meet PGW qualifying efficiency and equipment requirements.",
        "Roof insulation and air sealing require natural gas as primary space heat and qualifying retrofit documentation.",
        "Smart thermostat rebates apply only to qualifying devices and eligible PGW customers.",
        "Rebates are subject to program term, application rules, and available funds."
      ],
      "blockers": [
        "Commercial kitchen, commercial roof insulation, commercial water-heating, and commercial controls belong to PGW commercial rebates, not this residential incentives record.",
        "Generic high_efficiency_hvac_replacement is too broad for this record.",
        "Do not infer central air-conditioning, electric heat pumps, solar, EV charging, or demand response."
      ],
      "programType": "Rebate Program",
      "administrator": "Philadelphia Gas Works",
      "applicationUrl": null,
      "websiteUrl": "https://pgwenergysense.com/residential-rebates/",
      "sourceUrlsChecked": [
        "https://pgwenergysense.com/residential-rebates/",
        "https://pgwenergysense.com/residential-roof-insulation-and-air-sealing-rebates/",
        "https://pgwenergysense.com/"
      ],
      "evidenceText": "Residential PGW rebates cover specified natural gas furnaces, boilers, combi boilers, tankless water heaters, roof insulation with optional air sealing, and smart thermostats.",
      "reasoningNotes": "This record overlaps with DSIRE 4831 but should be narrowed to residential PGW EnergySense measures rather than the commercial measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1916ecc9635fe8d8_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 50000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $500 per qualifying residential furnace",
        "evidenceText": "PGW EnergySense residential materials say residential customers can receive rebates up to $500 on furnaces.",
        "sourceUrlsChecked": [
          "https://pgwenergysense.com/residential-rebates/",
          "https://www.pgworks.com/customer-care/efficiency"
        ],
        "reasoningNotes": "Matched furnace term. Confidence is medium because exact amount depends on equipment/application.",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_84268734301507f3_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 150000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $1,500 per qualifying residential boiler",
        "evidenceText": "PGW EnergySense residential materials say residential customers can receive rebates up to $1,500 on boilers.",
        "sourceUrlsChecked": [
          "https://pgwenergysense.com/residential-rebates/",
          "https://www.pgworks.com/customer-care/efficiency"
        ],
        "reasoningNotes": "Matched boiler term. Returned separately because boiler has a distinct maximum rebate.",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22725",
    "opportunityName": "Rhode Island – Home Electrification and Appliance Rebate (HEAR) Program",
    "state": "RI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22725/rhode-island-home-electrification-and-appliance-rebate-hear-program",
    "websiteUrl": "https://energy.ri.gov/incentives/home-energy-rebate-programs/home-electrification-and-appliance-rebate-hear",
    "applicationUrl": "https://energy.ri.gov/incentives/home-energy-rebate-programs/home-electrification-and-appliance-rebate-hear/hear-application",
    "administrator": "Rhode Island Office of Energy Resources",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "high_efficiency_oven",
        "displayName": "High-efficiency oven",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "oven"
        ]
      },
      {
        "retrofitTypeId": "induction_cooking_equipment",
        "displayName": "Induction cooking equipment",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "induction"
        ]
      },
      {
        "retrofitTypeId": "process_electrification_equipment",
        "displayName": "Process electrification equipment",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electrification equipment"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "RI"
        ],
        "counties": [],
        "cities": [
          "Pawtucket",
          "East Providence",
          "Barrington",
          "Warren",
          "Bristol",
          "Little Compton",
          "Tiverton",
          "Portsmouth",
          "Middletown",
          "Newport",
          "Jamestown"
        ],
        "utilityTerritories": [],
        "notes": "Retail Pathway Pilot is limited to the listed municipalities; LIHEAP pathway serves eligible households statewide through CAP agencies."
      },
      "eligibleApplicantTypes": [
        "low_income_households",
        "moderate_income_households",
        "liheap_households",
        "homeowners",
        "renters",
        "landlords"
      ],
      "eligibleSectors": [
        "residential",
        "low_income_residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_energy_star_electric_cooking_appliance",
        "residential_induction_cooking_equipment",
        "heat_pump_clothes_dryer",
        "electrical_wiring_upgrade",
        "electrical_panel_upgrade",
        "gas_line_capping"
      ],
      "hardRequirements": [
        "Household must meet HEAR income eligibility rules.",
        "Retail Pathway Pilot applicants must be in one of the listed pilot municipalities.",
        "Applications must be reviewed and approved by Rhode Island OER before purchase, electrical work, or gas capping.",
        "Eligible appliances must meet ENERGY STAR or program specifications.",
        "Contractor rules apply to electrical upgrades and gas capping."
      ],
      "blockers": [
        "Residential HVAC heat pumps and high-efficiency HVAC replacement are not supported by this HEAR appliance pilot; they belong to separate programs such as Clean Heat RI or other home energy rebate pathways.",
        "Commercial ovens and commercial induction cooking are false positives; this is a residential appliance rebate.",
        "Process electrification equipment is a false positive."
      ],
      "programType": "Rebate Program",
      "administrator": "Rhode Island Office of Energy Resources",
      "applicationUrl": "https://energy.ri.gov/incentives/home-energy-rebate-programs/home-electrification-and-appliance-rebate-hear/hear-application",
      "websiteUrl": "https://energy.ri.gov/incentives/home-energy-rebate-programs/home-electrification-and-appliance-rebate-hear",
      "sourceUrlsChecked": [
        "https://energy.ri.gov/incentives/home-energy-rebate-programs",
        "https://energy.ri.gov/incentives/home-energy-rebate-programs/home-electrification-and-appliance-rebate-hear",
        "https://energy.ri.gov/incentives/home-energy-rebate-programs/home-electrification-and-appliance-rebate-hear/hear-application",
        "https://energy.ri.gov/press-releases/rhode-island-office-energy-resources-announces-expansion-home-electrification-and",
        "https://energy.ri.gov/sites/g/files/xkgbur741/files/2026-06/HEAR%20FAQ%20June%202026_0.pdf"
      ],
      "evidenceText": "RI OER HEAR is income-restricted; the retail pilot is limited to named municipalities and covers ENERGY STAR electric cooking appliances, heat pump dryers, wiring, panels and gas capping after approval.",
      "reasoningNotes": "The DSIRE matched terms should be narrowed to residential electric cooking, heat pump dryer, wiring, panels, and gas capping. HVAC heat pumps and process electrification are separate or false-positive categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_9cf4c5764279e505_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 84000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $840 per eligible electric stove, cooktop, range, or oven",
        "evidenceText": "ENERGY STAR HEAR table lists electric stove, cooktop, range, or oven at $840.",
        "sourceUrlsChecked": [
          "https://energy.ri.gov/energy-incentives/home-energy-rebate-program",
          "https://www.energystar.gov/partner-resources/state-and-tribal-rebate-programs/hear-program"
        ],
        "reasoningNotes": "Matched induction/oven electrification terms. Confidence is medium because Rhode Island eligibility and implementation path control availability.",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c0369764b139c038_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 800000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $8,000 per eligible heat pump for space heating and cooling",
        "evidenceText": "ENERGY STAR HEAR table lists heat pump for space heating/cooling at $8,000.",
        "sourceUrlsChecked": [
          "https://energy.ri.gov/energy-incentives/home-energy-rebate-program",
          "https://www.energystar.gov/partner-resources/state-and-tribal-rebate-programs/hear-program"
        ],
        "reasoningNotes": "Matched heat pump term. Returned separately from cooking electrification.",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2029",
    "opportunityName": "College Station Utilities - Residential Energy Efficiency Rebate Programs",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2029/college-station-utilities-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.cstx.gov/living-here/utilities/energy-conservation-and-rebates/",
    "applicationUrl": "https://forms.cstx.gov/forms/EnergyBackRebate",
    "administrator": "College Station Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "geothermal heat pump",
          "geothermal"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner",
          "air conditioning"
        ]
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "led lighting"
        ]
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "thermostat"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "TX"
        ],
        "counties": [],
        "cities": [
          "College Station"
        ],
        "utilityTerritories": [
          "College Station Utilities electric service territory"
        ],
        "notes": "Only College Station Utilities electric customers are eligible."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump",
        "high_efficiency_hvac_replacement",
        "central_air_conditioner_replacement",
        "smart_thermostat_zoning_retrofit",
        "residential_led_lighting_products",
        "energy_audit"
      ],
      "hardRequirements": [
        "Applicant must be a College Station Utilities electric customer.",
        "Energy Back II HVAC applies to replacement of whole central AC systems, air-to-air heat pumps or geothermal heat pumps in existing residences.",
        "HVAC equipment must meet SEER and sizing requirements and pass final City inspection.",
        "Connected thermostat rebate requires a qualifying Wi-Fi programmable thermostat and eligible HVAC system.",
        "LED rebates are residential product credits with per-customer limits."
      ],
      "blockers": [
        "Do not match commercial LED lighting retrofits; LED support is a residential product rebate.",
        "Do not match solar or wind as retrofits under this rebate record; College Station green power or renewable offerings are separate.",
        "Do not match heat pump water heaters; no current College Station residential rebate was verified for that measure."
      ],
      "programType": "Rebate Program",
      "administrator": "College Station Utilities",
      "applicationUrl": "https://forms.cstx.gov/forms/EnergyBackRebate",
      "websiteUrl": "https://www.cstx.gov/living-here/utilities/energy-conservation-and-rebates/",
      "sourceUrlsChecked": [
        "https://www.cstx.gov/living-here/utilities/energy-conservation-and-rebates/",
        "https://www.cstx.gov/living-here/utilities/energy-conservation-and-rebates/energy-back-rebates/",
        "https://www.cstx.gov/living-here/utilities/energy-conservation-and-rebates/connected-thermostat-rebate/",
        "https://forms.cstx.gov/forms/EnergyBackRebate"
      ],
      "evidenceText": "College Station Utilities lists residential Energy Back HVAC rebates for central AC, air-to-air heat pumps and geothermal heat pumps, plus connected thermostat and LED programs.",
      "reasoningNotes": "Kept geothermal, heat pump, HVAC, thermostat and residential LED matches; excluded unrelated renewable and water-heating matches."
    },
    "existingSimpleRules": [
      {
        "id": "oir_6f96e67bb97089e7_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 3000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$30 per eligible connected thermostat",
        "evidenceText": "College Station connected thermostat page states a $30 rebate for eligible thermostats.",
        "sourceUrlsChecked": [
          "https://www.cstx.gov/living-here/utilities/energy-conservation-and-rebates/connected-thermostat-rebate/"
        ],
        "reasoningNotes": "Matched thermostat term. Use one unit as one qualifying Wi-Fi programmable thermostat.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_cf93c3ecddeb056f_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 80000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $800 per qualifying high-efficiency central AC, air-to-air heat pump, or geothermal heat pump",
        "evidenceText": "College Station Energy Back page offers up to $800 for qualifying AC, air-to-air heat pumps, or geothermal heat pumps.",
        "sourceUrlsChecked": [
          "https://www.cstx.gov/living-here/utilities/energy-conservation-and-rebates/energy-back-rebates/"
        ],
        "reasoningNotes": "Matched heat pump, air conditioner, and geothermal terms. Medium because amount is up to.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3838",
    "opportunityName": "El Paso Electric Company - Residential Energy Efficiency Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3838/el-paso-electric-company-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.epelectric.com/energy-efficiency/texas-residential-energy-efficiency-programs/texas-residential-energy-rebates-and-incentives",
    "applicationUrl": "https://epe.clearesult.com/",
    "administrator": "El Paso Electric Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump"
        ]
      },
      {
        "retrofitTypeId": "heat_pump_water_heater",
        "displayName": "Heat pump water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump water heater"
        ]
      },
      {
        "retrofitTypeId": "insulation_upgrade",
        "displayName": "Insulation upgrade",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "insulation"
        ]
      },
      {
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "low flow",
          "showerhead"
        ]
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart thermostat",
          "thermostat"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "TX"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "El Paso Electric Texas electric service territory"
        ],
        "notes": "This repair is limited to EPE Texas residential efficiency rebates; New Mexico residential programs are separate."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "single_family_customer",
        "multifamily_customer",
        "income_qualified_residential_customer"
      ],
      "eligibleSectors": [
        "residential",
        "income_qualified_residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "cool_roof",
        "window_replacement",
        "solar_screen",
        "low_flow_fixture_retrofit",
        "water_heater_pipe_insulation",
        "smart_thermostat_zoning_retrofit",
        "residential_led_lighting_products",
        "room_air_conditioner",
        "evaporative_cooler",
        "high_efficiency_hvac_replacement",
        "efficient_pool_pump"
      ],
      "hardRequirements": [
        "Customer must reside in Texas and receive EPE electric service.",
        "Some forms are limited to single-family homes of one to four units; all single and multifamily customers may participate in the broader residential program.",
        "Rebates are first-come, first-served and subject to funding.",
        "Direct-install low-flow and pipe-insulation measures require an electric or heat pump water heater.",
        "Refrigerated cooling systems must be installed by a licensed HVAC contractor."
      ],
      "blockers": [
        "Do not match generic heat_pump_hvac_retrofit from the word heat pump unless a current form confirms a qualifying HVAC heat pump; verified heat-pump support here is heat pump water heating.",
        "Low-flow support is limited to showerheads and faucet aerators in the direct-install measure, not broad plumbing retrofits.",
        "Do not use New Mexico-only EPE rebate pages for this Texas record."
      ],
      "programType": "Rebate Program",
      "administrator": "El Paso Electric Company",
      "applicationUrl": "https://epe.clearesult.com/",
      "websiteUrl": "https://www.epelectric.com/energy-efficiency/texas-residential-energy-efficiency-programs/texas-residential-energy-rebates-and-incentives",
      "sourceUrlsChecked": [
        "https://www.epelectric.com/save-money-and-energy/residential",
        "https://www.epelectric.com/energy-efficiency/texas-residential-energy-efficiency-programs/texas-residential-energy-rebates-and-incentives",
        "https://www.epelectric.com/el-paso-electric/uploads/energy-efficiency/2026_epe_tx_direct_intall_rebate_app.pdf",
        "https://www.epelectric.com/el-paso-electric/uploads/resreb_br_2025-english.pdf"
      ],
      "evidenceText": "EPE Texas residential rebates list insulation, air infiltration, duct sealing, cool roofs, windows, solar screens, refrigerated cooling, heat pump water heaters, smart thermostats and direct-install low-flow measures.",
      "reasoningNotes": "The target heat-pump HVAC category was removed because the verified heat-pump measure is water heating; HVAC support is refrigerated or evaporative cooling."
    },
    "existingSimpleRules": [
      {
        "id": "oir_a7caa2c0ec33880b_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 5000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$50 per ENERGY STAR certified smart thermostat",
        "evidenceText": "EPE 2026 Texas smart thermostat application states SMART THERMOSTAT REBATE $50.",
        "sourceUrlsChecked": [
          "https://www.epelectric.com/energy-efficiency/texas-residential-energy-efficiency-programs/texas-residential-energy-rebates-and-incentives",
          "https://www.epelectric.com/el-paso-electric/uploads/energy-efficiency/2026_epe_tx_smarttstat_rebate_app.pdf"
        ],
        "reasoningNotes": "Matched smart thermostat terms. Use one unit as one eligible ENERGY STAR smart thermostat.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1592",
    "opportunityName": "Xcel Energy - Commercial and Industrial Standard Offer Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1592/xcel-energy-commercial-and-industrial-standard-offer-program",
    "websiteUrl": "https://tx.my.xcelenergy.com/s/business/cost-savings/commercial-standard-offer",
    "applicationUrl": null,
    "administrator": "Xcel Energy",
    "programType": "Standard Offer Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_sealing_weatherization",
        "displayName": "Air sealing / weatherization",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air sealing"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "led lighting"
        ]
      },
      {
        "retrofitTypeId": "lighting_controls_retrofit",
        "displayName": "Lighting controls retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "lighting controls"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "TX"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Xcel Energy Southwestern Public Service Texas service territory"
        ],
        "notes": "Project must be located in Xcel Energy's Texas service area and qualify through the Commercial Standard Offer process."
      },
      "eligibleApplicantTypes": [
        "project_sponsor",
        "energy_efficiency_service_provider",
        "commercial_customer",
        "industrial_customer",
        "nonresidential_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "commercial_hvac_efficiency",
        "high_efficiency_hvac_replacement",
        "chiller_retrofit",
        "motor_retrofit",
        "high_efficiency_refrigeration_equipment",
        "building_envelope_retrofit",
        "industrial_process_efficiency"
      ],
      "hardRequirements": [
        "Participant must follow the Commercial Standard Offer application and project-sponsor process.",
        "Projects must be in Xcel Energy's Texas service territory.",
        "Savings must be eligible, documented and verified under program rules.",
        "Preapproval or reservation is required before incentives are paid.",
        "Funding and measure eligibility are subject to current program manuals and utility review."
      ],
      "blockers": [
        "This is not a residential air sealing or weatherization rebate.",
        "Incentives are handled through the Standard Offer project process, not a simple point-of-sale customer rebate.",
        "Refrigeration support should be limited to commercial refrigeration measures or approved custom measures, not residential appliances.",
        "Load management, retro-commissioning and solar programs are separate unless the current SOP documentation explicitly includes the project."
      ],
      "programType": "Standard Offer Incentive Program",
      "administrator": "Xcel Energy",
      "applicationUrl": null,
      "websiteUrl": "https://tx.my.xcelenergy.com/s/business/cost-savings/commercial-standard-offer",
      "sourceUrlsChecked": [
        "https://tx.my.xcelenergy.com/s/business/cost-savings/commercial-standard-offer",
        "https://www.xcelenergy.com/staticfiles/xe-responsive/Business%20Programs%20%26%20Rebates/Xcel_Comm_Manual_2023_Final.pdf",
        "https://www.xcelenergy.com/staticfiles/xe-responsive/Company/Rates%20%26%20Regulations/Regulatory%20Filings/2023-EEPR.pdf"
      ],
      "evidenceText": "Xcel's current page identifies the Commercial SOP as an incentive program; official Xcel materials describe nonresidential lighting, controls, HVAC, refrigeration, envelope and process measures.",
      "reasoningNotes": "The current official page is dynamic, so measure detail was checked against official Xcel program and regulatory documents. Keep confidence medium."
    },
    "existingSimpleRules": [
      {
        "id": "oir_63a20ae3e3124fae_v1",
        "incentiveType": "custom_efficiency_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kwh",
          "amountCentsPerKwh": 7,
          "kwhSource": "annual_kwh_delta_abs"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$0.07 per annual kWh saved for approved commercial efficiency measures",
        "evidenceText": "Xcel Texas commercial program materials state incentives are calculated using $0.07 per kWh saved.",
        "sourceUrlsChecked": [
          "https://www.xcelenergy.com/company/rates_and_regulations/filings/texas_energy_efficiency_programs"
        ],
        "reasoningNotes": "Matched custom C&I efficiency terms. Use for approved measures with verified first-year kWh savings.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_d9e2c2ef87fd29ac_v1",
        "incentiveType": "custom_efficiency_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kw",
          "amountCentsPerKw": 22000,
          "kwSource": "demand_reduction_kw"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$220 per kW of deemed demand reduction for approved commercial efficiency measures",
        "evidenceText": "Xcel Texas commercial program materials state demand savings incentives can use $220 per kW saved.",
        "sourceUrlsChecked": [
          "https://www.xcelenergy.com/company/rates_and_regulations/filings/texas_energy_efficiency_programs"
        ],
        "reasoningNotes": "Returned separately because source includes both kWh and kW savings components.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4127",
    "opportunityName": "Columbia Gas of Virginia - Home Savings Rebate Program",
    "state": "VA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4127/columbia-gas-of-virginia-home-savings-rebate-program",
    "websiteUrl": "https://www.columbiagasva.com/energy-efficiency/for-your-home/available-rebates",
    "applicationUrl": "https://cva.ri-app.com/",
    "administrator": "Columbia Gas of Virginia",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_boiler_retrofit",
        "displayName": "High-efficiency boiler retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "boiler"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_furnace_retrofit",
        "displayName": "High-efficiency furnace retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "furnace"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_gas_water_heater",
        "displayName": "High-efficiency gas water heater",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "gas water heater"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart thermostat",
          "thermostat"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "VA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Columbia Gas of Virginia natural gas service territory"
        ],
        "notes": "Program applies to Columbia Gas of Virginia residential natural gas customers and eligible existing homes."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customer",
        "residential_customer",
        "homeowner",
        "authorized_agent"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_gas_water_heater",
        "tankless_gas_water_heater",
        "smart_thermostat_zoning_retrofit",
        "window_replacement",
        "door_replacement",
        "skylight_replacement",
        "high_efficiency_gas_fireplace",
        "high_efficiency_gas_clothes_dryer"
      ],
      "hardRequirements": [
        "Applicant must be a Columbia Gas of Virginia residential customer for gas measures.",
        "Furnace, boiler, and related measures must meet current efficiency and primary natural gas heating requirements.",
        "Existing homes are required for furnace and boiler rebates; new construction is not eligible for those measures.",
        "Applications must be submitted within the current program deadline after purchase and installation.",
        "No duplicate natural gas rebate may be claimed for the same equipment.",
        "Rebates are first-come and subject to funding."
      ],
      "blockers": [
        "Do not match electric heat pumps or electric air conditioning under this gas program.",
        "Do not use broad HVAC replacement unless the measure is an eligible gas furnace, boiler, fireplace, or thermostat control.",
        "Do not match non-gas water heaters.",
        "Window, door, and skylight categories must remain product-specific."
      ],
      "programType": "Rebate Program",
      "administrator": "Columbia Gas of Virginia",
      "applicationUrl": "https://cva.ri-app.com/",
      "websiteUrl": "https://www.columbiagasva.com/energy-efficiency/for-your-home/available-rebates",
      "sourceUrlsChecked": [
        "https://www.columbiagasva.com/energy-efficiency/for-your-home/available-rebates",
        "https://www.columbiagasva.com/docs/librariesprovider10/energy-efficiency/warmwise-applications/residential/applications/furnace-and-boiler-rebate-application.pdf",
        "https://www.columbiagasva.com/docs/librariesprovider10/energy-efficiency/energy-efficiency-flyers/warmwise-residential-flyer0ac64da5-92c1-4810-8fc8-f9a5d1f2a9ef.pdf?sfvrsn=ac5f1c51_7",
        "https://cva.ri-app.com/"
      ],
      "evidenceText": "Columbia]( Gas residential rebate materials list gas furnace and boiler, smart thermostat, gas storage and tankless water heaters, windows, doors, skylights, direct vent gas fireplace, and natural gas dryer rebates.",
      "reasoningNotes": "The current WarmWise sources support gas equipment and specific envelope products. Broad HVAC should be constrained to gas heating measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_96fd31f11e46f47e_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 5000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$50 per eligible smart thermostat",
        "evidenceText": "Columbia Gas of Virginia rebate page lists a $50 smart thermostat rebate.",
        "sourceUrlsChecked": [
          "https://www.columbiagasva.com/energy-efficiency/for-your-home",
          "https://www.columbiagasva.com/energy-efficiency/for-your-home/rebates"
        ],
        "reasoningNotes": "Matched thermostat term. Furnace and water-heater values were not used because exact current tiers were less clear.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4056",
    "opportunityName": "Agricultural Lighting and Equipment Rebate Program",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4056/agricultural-lighting-and-equipment-rebate-program",
    "websiteUrl": "https://www.efficiencyvermont.com/rebates/list?cat=agricultural+equipment&type=",
    "applicationUrl": "https://rebates.efficiencyvermont.com/",
    "administrator": "Efficiency Vermont",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 5,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "efficient_ventilation_system",
        "displayName": "Efficient ventilation system",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "efficient ventilation"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "led lighting"
        ]
      },
      {
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fixture"
        ]
      },
      {
        "retrofitTypeId": "waste_heat_recovery",
        "displayName": "Waste heat recovery",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat recovery"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "VT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Efficiency Vermont participating electric utility service territories"
        ],
        "notes": "Statewide Vermont electric-utility customers served by Efficiency Vermont; some gas-related hot-water projects may be directed to Vermont Gas."
      },
      "eligibleApplicantTypes": [
        "farms",
        "agricultural_businesses",
        "dairy_farms",
        "greenhouses",
        "indoor_growing_operations",
        "maple_producers",
        "businesses"
      ],
      "eligibleSectors": [
        "agricultural",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "agricultural_led_lighting",
        "indoor_growing_led_lighting",
        "efficient_agricultural_ventilation_fans",
        "ventilation_fan_vfd_controls",
        "agricultural_heat_recovery_unit",
        "plate_cooler",
        "milk_vacuum_pump_vfd",
        "maple_sap_vacuum_pump_vfd",
        "maple_reverse_osmosis_system",
        "high_efficiency_refrigeration_condensing_unit",
        "greenhouse_equipment",
        "custom_agricultural_efficiency_project"
      ],
      "hardRequirements": [
        "Applicant must be a Vermont farm, agricultural operation or qualifying business served through Efficiency Vermont.",
        "Measures must meet Efficiency Vermont's product-specific eligibility criteria.",
        "Dairy heat recovery, plate cooler and VFD measures have herd-size, new-construction or equipment restrictions.",
        "Custom projects and certain equipment require Efficiency Vermont review or preapproval.",
        "Funding and eligibility can vary by measure and utility service."
      ],
      "blockers": [
        "Low-flow fixture is a false positive from the word fixture and is not supported by this agricultural equipment program.",
        "Heat recovery means dairy or agricultural heat-recovery units, not generic industrial waste heat recovery.",
        "Refrigeration support is product-specific, such as condensing units and plate coolers, not broad commercial refrigeration replacement.",
        "This program is not residential weatherization."
      ],
      "programType": "Rebate Program",
      "administrator": "Efficiency Vermont",
      "applicationUrl": "https://rebates.efficiencyvermont.com/",
      "websiteUrl": "https://www.efficiencyvermont.com/rebates/list?cat=agricultural+equipment&type=",
      "sourceUrlsChecked": [
        "https://www.efficiencyvermont.com/rebates/list?cat=agricultural+equipment&type=",
        "https://www.efficiencyvermont.com/rebates/list/ventilation-fans-agriculture",
        "https://www.efficiencyvermont.com/rebates/list/heat-recovery-units-agriculture",
        "https://www.efficiencyvermont.com/rebates/list/plate-coolers-agriculture",
        "https://www.efficiencyvermont.com/rebates/list/variable-frequency-drives-milk-vacuum-pumps",
        "https://www.efficiencyvermont.com/rebates/list/high-efficiency-condensing-unit"
      ],
      "evidenceText": "Efficiency Vermont's agricultural equipment list verifies farm lighting, ventilation fans, dairy heat recovery, plate coolers, VFDs, maple RO, greenhouse or indoor-growing and condensing-unit measures.",
      "reasoningNotes": "Narrowed fixtures, heat recovery and refrigeration to agriculture-specific products and removed unsupported water-fixture interpretations."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1fed9e9720d606e6_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 157500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$1,575 per VFD on a milk vacuum pump",
        "evidenceText": "Efficiency Vermont lists VFDs on milk vacuum pumps at $1,575 cash back.",
        "sourceUrlsChecked": [
          "https://www.efficiencyvermont.com/rebates/list/variable-frequency-drives-milk-vacuum-pumps",
          "https://www.efficiencyvermont.com/rebates/list?cat=agricultural+equipment&type="
        ],
        "reasoningNotes": "Matched motor/VFD model. Use one unit as one qualifying VFD on a milk vacuum pump.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_82b438f26c090593_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 262500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$2,625 per agricultural heat recovery unit",
        "evidenceText": "Efficiency Vermont lists Heat Recovery Units for Agricultural Use at $2,625 cash back per unit.",
        "sourceUrlsChecked": [
          "https://www.efficiencyvermont.com/rebates/list/heat-recovery-units-agriculture",
          "https://www.efficiencyvermont.com/rebates/list?cat=agricultural+equipment&type="
        ],
        "reasoningNotes": "Matched heat recovery term. Applies to qualifying dairy-farm HRUs.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_befc6d27b91e537e_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 27500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $275 per efficient agricultural ventilation fan",
        "evidenceText": "Efficiency Vermont lists ventilation fans for agricultural use at up to $275 cash back per fan.",
        "sourceUrlsChecked": [
          "https://www.efficiencyvermont.com/rebates/list/ventilation-fans-agriculture",
          "https://www.efficiencyvermont.com/rebates/list?cat=agricultural+equipment&type="
        ],
        "reasoningNotes": "Matched efficient ventilation term. Confidence is medium because rebate varies by fan type and size.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  }
]
