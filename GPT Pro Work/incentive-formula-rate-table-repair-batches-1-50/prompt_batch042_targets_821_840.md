You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 42
Targets in this prompt: 821-840 of 984
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
  "batchNumber": 42,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2208"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4816",
    "opportunityName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
    "state": "ND",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4816/xcel-energy-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://nd.my.xcelenergy.com/s/residential/heating-cooling/heating-upgrade-rebates",
    "applicationUrl": "https://www.xcelenergy.com/digital_application",
    "administrator": "Xcel Energy",
    "programType": "Residential Utility Heating Upgrade Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "ND"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Xcel Energy North Dakota service territory"
        ],
        "notes": "Limited to Xcel Energy North Dakota residential customers; detailed eligibility may depend on account type, fuel, and current rebate application screening."
      },
      "eligibleApplicantTypes": [
        "xcel_energy_north_dakota_residential_customer",
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "electric_furnace_replacement",
        "heat_pump_hvac_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be an Xcel Energy North Dakota residential customer.",
        "Heating upgrade rebate details and eligibility must be confirmed through Xcel's current digital application or customer contact process.",
        "Equipment must meet current Xcel measure requirements before rebate payment."
      ],
      "blockers": [
        "Do not match boiler retrofits from older or out-of-state documents unless current North Dakota Xcel materials verify boiler eligibility.",
        "Do not infer Minnesota, Colorado, or other state rebate terms for North Dakota customers.",
        "Do not match commercial HVAC or generic HVAC replacement beyond the supported electric furnace and electric heat pump heating-upgrade content."
      ],
      "programType": "Residential Utility Heating Upgrade Rebate Program",
      "administrator": "Xcel Energy",
      "applicationUrl": "https://www.xcelenergy.com/digital_application",
      "websiteUrl": "https://nd.my.xcelenergy.com/s/residential/heating-cooling/heating-upgrade-rebates",
      "sourceUrlsChecked": [
        "https://nd.my.xcelenergy.com/s/residential/heating-cooling/heating-upgrade-rebates",
        "https://www.xcelenergy.com/digital_application",
        "https://www.xcelenergy.com/programs_and_rebates",
        "https://www.poweredbyefi.org/xcelenergynd/energy-saving-rebates/water-heater-home-rebates-xnd.html",
        "https://programs.dsireusa.org/system/program/detail/4816/xcel-energy-residential-energy-efficiency-rebate-programs"
      ],
      "evidenceText": "Official]( Xcel North Dakota snippets identify heating upgrade rebates for electric furnaces and electric heat pumps, and Xcel's digital application is active for rebate submissions.",
      "reasoningNotes": "Only current North Dakota electric furnace and heat pump heating-upgrade content was retained. Boiler and broad HVAC categories were blocked pending current official confirmation."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Xcel North Dakota gas furnace/boiler rebate amounts were not verified from accessible official current source text.",
        "sourceUrlsChecked": [
          "https://nd.my.xcelenergy.com/s/residential/home-rebates",
          "https://www.xcelenergy.com/programs_and_rebates"
        ],
        "reasoningNotes": "Matched gas equipment terms require current table extraction before a rule is merged.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4193",
    "opportunityName": "MidAmerican Energy (Gas) - Residential Energy Efficiency Rebate Programs",
    "state": "NE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4193/midamerican-energy-gas-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.midamericanenergy.com/ne-residential-rebates",
    "applicationUrl": "https://midamerican.ri-esuite.com/",
    "administrator": "MidAmerican Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
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
          "NE"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "MidAmerican Energy natural gas service territory in Nebraska"
        ],
        "notes": "Limited to Nebraska residential natural gas customers for the listed gas equipment rebates."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "furnace_tune_up",
        "gas_storage_water_heater",
        "gas_tankless_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Nebraska residential customer of MidAmerican Energy for natural gas service.",
        "Equipment must meet the current Nebraska residential rebate qualifications.",
        "Application must include required manufacturer, model, serial, AHRI, receipt, or invoice documentation where applicable.",
        "Applications must be submitted by the stated program deadline.",
        "Rebates are limited to listed qualifying natural gas equipment."
      ],
      "blockers": [
        "Do not match boiler retrofits; boilers were not listed on the current Nebraska residential gas rebate page.",
        "Do not match electric HVAC, heat pumps, or commercial equipment under this gas residential record.",
        "Do not generalize to MidAmerican rebates in other states or sectors.",
        "Incomplete documentation or nonqualifying equipment blocks rebate eligibility."
      ],
      "programType": "Rebate Program",
      "administrator": "MidAmerican Energy",
      "applicationUrl": "https://midamerican.ri-esuite.com/",
      "websiteUrl": "https://www.midamericanenergy.com/ne-residential-rebates",
      "sourceUrlsChecked": [
        "https://www.midamericanenergy.com/ne-residential-rebates",
        "https://www.midamericanenergy.com/home-discounts-and-rebates",
        "https://midamerican.ri-esuite.com/"
      ],
      "evidenceText": "MidAmerican’s Nebraska residential gas page lists rebates for natural gas furnaces, furnace tune-ups, gas storage water heaters, and gas tankless water heaters; boilers are not listed.",
      "reasoningNotes": "The furnace match is supported. The original boiler and generic HVAC matches should be removed or narrowed because the current Nebraska residential gas page supports only the listed gas equipment."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official MidAmerican residential rebate pages did not expose exact gas furnace or boiler values.",
        "sourceUrlsChecked": [
          "https://www.midamericanenergy.com/home-rebates"
        ],
        "reasoningNotes": "No current source-backed gas equipment formula was verified.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3880",
    "opportunityName": "Southwest Gas Corporation - Commercial Energy Efficient Equipment Rebate Program",
    "state": "NV",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3880/southwest-gas-corporation-commercial-energy-efficient-equipment-rebate-program",
    "websiteUrl": "https://www.swgas.com/en/commercial-rebates-and-promotions",
    "applicationUrl": null,
    "administrator": "Southwest Gas Corporation",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "solar water heating"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NV"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Southwest Gas Nevada natural gas service territory"
        ],
        "notes": "Applies to eligible Southwest Gas Nevada commercial natural gas accounts contributing to the conservation and energy-efficiency component."
      },
      "eligibleApplicantTypes": [
        "Southwest Gas Nevada commercial customers",
        "customer of record",
        "master-metered multifamily customers",
        "nonresidential natural gas customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "multifamily",
        "food_service"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_natural_gas_furnace",
        "commercial_tankless_natural_gas_water_heater",
        "high_efficiency_natural_gas_fryer",
        "high_efficiency_natural_gas_convection_oven",
        "high_efficiency_natural_gas_conveyor_oven",
        "high_efficiency_natural_gas_combi_oven"
      ],
      "hardRequirements": [
        "Applicant must have an active eligible Southwest Gas Nevada commercial meter and be the customer of record.",
        "Equipment must be new, qualifying natural gas equipment installed at the service address during the program year before applying.",
        "Application must include required proof of purchase, model documentation, and be submitted by the stated deadline.",
        "Foodservice instant rebates require qualifying ENERGY STAR, California Energy Wise, or specified efficiency listings where applicable.",
        "Rebates are subject to funding availability and cannot be duplicated with other Southwest Gas programs where prohibited."
      ],
      "blockers": [
        "Solar water heating is not part of the Nevada commercial equipment application and should be treated as a separate program if applicable.",
        "Do not match residential rebates to this commercial record.",
        "Do not generalize pre-rinse spray valves or plumbing from product codes into broad plumbing retrofits.",
        "Non-gas equipment and accounts outside Southwest Gas Nevada service territory are ineligible."
      ],
      "programType": "Rebate Program",
      "administrator": "Southwest Gas Corporation",
      "applicationUrl": null,
      "websiteUrl": "https://www.swgas.com/en/commercial-rebates-and-promotions",
      "sourceUrlsChecked": [
        "https://www.swgas.com/en/commercial-rebates-and-promotions",
        "https://www.swgas.com/1409208977742/SWG_2026_NV_COM_Rebate_Application.pdf",
        "https://www.swgas.com/1409183642389/NV-Res-Com-Brochures-Feb-2025.pdf",
        "https://www.swgas.com/en/rebate/nevada-instant-foodservice-rebates"
      ],
      "evidenceText": "The]( 2026 Nevada commercial application covers qualifying natural gas furnaces, tankless water heaters, fryers, conveyor ovens, convection ovens, and combi ovens. Solar water heating is not in this Nevada commercial equipment application.",
      "reasoningNotes": "Retained furnace and high-efficiency oven categories, added supported gas water-heater and foodservice categories, and removed solar water heating."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Southwest Gas commercial Nevada rebate search page is dynamic and did not expose a current formula.",
        "sourceUrlsChecked": [
          "https://www.swgas.com/en/rebates-and-promotions-search-business-nevada"
        ],
        "reasoningNotes": "No calculable one-time rule verified.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22108",
    "opportunityName": "Con Ed Demand Management for Industrial and Commercial Customers",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22108/con-ed-demand-management-for-industrial-and-commercial-customers",
    "websiteUrl": "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/real-time-energy-management-systems",
    "applicationUrl": null,
    "administrator": "Consolidated Edison Company of New York",
    "programType": "Real Time Energy Management Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy storage"
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
        "retrofitTypeId": "hvac_controls_retrofit",
        "displayName": "HVAC controls retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "hvac controls"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NY"
        ],
        "counties": [],
        "cities": [
          "New York"
        ],
        "utilityTerritories": [
          "Con Edison"
        ],
        "notes": "Eligibility is limited to qualifying Con Edison commercial, nonprofit, multifamily, or industrial customers meeting service and usage thresholds."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "nonprofit_customer",
        "multifamily_building_owner",
        "building_manager"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "nonprofit",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "real_time_energy_management_system",
        "energy_management_information_system",
        "fault_detection_diagnostics",
        "building_automation_system_integration",
        "building_management_system_optimization",
        "hvac_controls_retrofit",
        "operational_energy_conservation_measures",
        "automated_system_optimization"
      ],
      "hardRequirements": [
        "Customer must receive qualifying Con Edison gas or electric service.",
        "Current page indicates commercial, nonprofit, or multifamily projects must meet average demand or annual usage thresholds.",
        "Project must install or use RTEM, sensors, analytics, and integration with building automation or management systems to diagnose and manage energy performance.",
        "Customers that previously received Con Edison BAS or BMS incentives may be ineligible.",
        "Program manual and contractor or installation requirements apply."
      ],
      "blockers": [
        "Battery storage is not part of the RTEM rebate and should be treated as a separate Con Edison or non-wires offering.",
        "Broad high-efficiency HVAC replacement is not supported by the RTEM page; match only controls, analytics, BAS/BMS integration, and operational improvements.",
        "Projects without qualifying existing systems, metering, or usage thresholds may be ineligible."
      ],
      "programType": "Real Time Energy Management Rebate",
      "administrator": "Consolidated Edison Company of New York",
      "applicationUrl": null,
      "websiteUrl": "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/real-time-energy-management-systems",
      "sourceUrlsChecked": [
        "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/real-time-energy-management-systems",
        "https://cdnc-dcxprod2-sitecore.azureedge.net/-/media/files/coned/documents/save-energy-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/real-time-energy-management-systems/program-manual.pdf",
        "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers"
      ],
      "evidenceText": "Con]( Edison’s current RTEM page offers incentives for real-time energy management technology that uses BAS integration, sensors, analytics, and fault detection to manage facility energy performance.",
      "reasoningNotes": "The official page is current but the linked manual contains older threshold language, so confidence is medium. Keep RTEM and controls matches; block battery storage and broad HVAC replacement."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Con Edison energy storage/demand management incentives require dispatch or demand response performance terms.",
        "sourceUrlsChecked": [
          "https://www.coned.com/-/media/files/coned/documents/save-energy-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/non-wires-solutions-energy-storage/participant-guide.pdf",
          "https://www.coned.com/en/save-money/rebates-incentives-tax-credits/rebates-incentives-tax-credits-for-commercial-industrial-buildings-customers/real-time-energy-management-systems"
        ],
        "reasoningNotes": "Demand management and storage dispatch programs should not be converted to a one-time equipment rebate without project-specific approval.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "battery_tou_demand_savings",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3462",
    "opportunityName": "National Grid (Electric) - Residential Energy Efficiency Rebate Programs (Upstate New York)",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3462/national-grid-electric-residential-energy-efficiency-rebate-programs-upstate-new-york",
    "websiteUrl": "https://www.nationalgridus.com/Upstate-NY-Home/Energy-Saving-Programs/Electric-Heating-Cooling",
    "applicationUrl": "https://nyscleanheat-hpwh.programprocessing.com/",
    "administrator": "National Grid",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ground source heat pump"
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
          "National Grid electric service territory in Upstate New York"
        ],
        "notes": "Applies to Upstate New York residential electric customers; higher incentives may apply in designated disadvantaged or advancement communities."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "air_to_water_heat_pump",
        "heat_pump_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be a National Grid Upstate New York residential electric customer.",
        "Space-heating incentives must generally be processed by a participating NYS Clean Heat contractor.",
        "Equipment must meet qualifying program specifications.",
        "Higher incentives may require decommissioning or other project conditions.",
        "Heat pump water heater incentives must use the applicable online, retail or installer application path."
      ],
      "blockers": [
        "Natural gas heating prescriptive rebate applications are no longer being accepted and should not be matched here.",
        "Financing and tax credits are separate from this rebate program.",
        "Customers outside National Grid Upstate electric service are not eligible.",
        "Do not infer nonresidential HVAC or industrial measures from this residential program."
      ],
      "programType": "Rebate",
      "administrator": "National Grid",
      "applicationUrl": "https://nyscleanheat-hpwh.programprocessing.com/",
      "websiteUrl": "https://www.nationalgridus.com/Upstate-NY-Home/Energy-Saving-Programs/Electric-Heating-Cooling",
      "sourceUrlsChecked": [
        "https://www.nationalgridus.com/Upstate-NY-Home/Energy-Saving-Programs/",
        "https://www.nationalgridus.com/Upstate-NY-Home/Energy-Saving-Programs/Electric-Heating-Cooling",
        "https://www.nationalgridus.com/Upstate-NY-Home/Energy-Saving-Programs/Electric-Heat-Pump-Water-Heaters",
        "https://www.nationalgridus.com/Upstate-NY-Home/Electric-Heating-Cooling/Ground-Source-Heat-Pumps",
        "https://nyscleanheat-hpwh.programprocessing.com/"
      ],
      "evidenceText": "National Grid lists Upstate New York electric heating and water-heating incentives for central, mini-split, ground-source and air-to-water heat pumps plus heat pump water heaters; space-heating applications must go through NYS Clean Heat participating contractors.",
      "reasoningNotes": "All three original heat-pump categories are supported, and mini-split and air-to-water heat pumps should be recognized as narrower supported measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "National Grid upstate heat pump and clean heat incentives vary by equipment, fuel displacement, and contractor pathway.",
        "sourceUrlsChecked": [
          "https://www.nationalgridus.com/Upstate-NY-Home/Default"
        ],
        "reasoningNotes": "No simple one-time rule verified for the motor/VFD mapping.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3153",
    "opportunityName": "Industrial and Agricultural Production Efficiency Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3153/industrial-and-agricultural-production-efficiency-program",
    "websiteUrl": "https://insider.energytrust.org/programs/industry-ag/",
    "applicationUrl": "https://insider.energytrust.org/programs/industry-ag/forms/",
    "administrator": "Energy Trust of Oregon",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy management"
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
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Portland General Electric",
          "Pacific Power",
          "NW Natural",
          "Cascade Natural Gas",
          "Avista"
        ],
        "notes": "Available to eligible Oregon industrial and agricultural customers served by participating Energy Trust utilities."
      },
      "eligibleApplicantTypes": [
        "industrial_customer",
        "agricultural_customer",
        "manufacturing_business",
        "farm_or_greenhouse_operator"
      ],
      "eligibleSectors": [
        "industrial",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "industrial_lighting_retrofit",
        "lighting_controls_retrofit",
        "building_pipe_insulation",
        "variable_frequency_drive",
        "irrigation_efficiency",
        "drip_irrigation",
        "greenhouse_efficiency",
        "indoor_ag_dehumidifier",
        "boiler_radiant_heating_efficiency",
        "industrial_battery_charger_efficiency",
        "smart_thermostat_zoning_retrofit",
        "steam_trap_repair_replacement",
        "efficient_welder",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Customer must be an eligible Oregon industrial or agricultural customer of a participating Energy Trust utility.",
        "Measures must satisfy the current Energy Trust form or custom-project requirements.",
        "Custom projects require Energy Trust review and savings-based approval.",
        "Incentive availability and rates are subject to the current program year forms and funding."
      ],
      "blockers": [
        "Do not match residential appliances, residential weatherization, or home HVAC measures.",
        "Do not match solar or renewable generation under this production-efficiency opportunity.",
        "Broad building energy management systems are not preserved unless the project is specifically supported as a custom or listed control measure.",
        "Commercial office lighting should not be inferred unless it fits the industrial or agricultural program requirements."
      ],
      "programType": "Rebate Program",
      "administrator": "Energy Trust of Oregon",
      "applicationUrl": "https://insider.energytrust.org/programs/industry-ag/forms/",
      "websiteUrl": "https://insider.energytrust.org/programs/industry-ag/",
      "sourceUrlsChecked": [
        "http://www.energytrust.org/industry-agriculture/",
        "https://insider.energytrust.org/programs/industry-ag/",
        "https://insider.energytrust.org/programs/industry-ag/forms/",
        "https://insider.energytrust.org/production-efficiency-program-announces-updated-2026-incentive-forms-and-project-support/",
        "https://blog.energytrust.org/2026-incentives-easier-ways-to-save-energy-and-money/"
      ],
      "evidenceText": "Energy Trust’s current Industry and Agriculture pages and 2026 forms list lighting controls, insulation, VFDs, irrigation, greenhouse, boiler, battery charger, steam trap, welder, and custom efficiency measures.",
      "reasoningNotes": "Lighting controls are supported. The original broad energy management system match was narrowed because current official pages support specific controls, forms, and custom projects rather than a general EMS category."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Energy Trust industrial/agricultural incentives are project- and equipment-specific; no controls formula was verified.",
        "sourceUrlsChecked": [
          "https://www.energytrust.org/industry-agriculture/"
        ],
        "reasoningNotes": "No reusable one-time controls or energy-management rule was found.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22566",
    "opportunityName": "Solar Planning Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22566/solar-planning-program",
    "websiteUrl": "https://www.energytrust.org/incentives/solar-planning/",
    "applicationUrl": null,
    "administrator": "Energy Trust of Oregon",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "battery storage"
        ]
      },
      {
        "retrofitTypeId": "engineering_feasibility_study",
        "displayName": "Engineering feasibility study",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "feasibility study"
        ]
      },
      {
        "retrofitTypeId": "solar_plus_storage_system",
        "displayName": "Solar-plus-storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "solar plus storage"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Portland General Electric",
          "Pacific Power",
          "NW Natural",
          "Cascade Natural Gas",
          "Avista"
        ],
        "notes": "Energy Trust serves eligible utility customers; some programs may also serve limited Southwest Washington gas customers, but this target is Oregon."
      },
      "eligibleApplicantTypes": [
        "commercial building owners",
        "commercial developers",
        "multifamily owners",
        "multifamily developers",
        "design teams",
        "nonprofits",
        "tribes",
        "affordable housing owners"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily",
        "nonprofit",
        "tribal",
        "affordable_housing",
        "government"
      ],
      "eligibleRetrofitCategories": [
        "solar_feasibility_study",
        "battery_storage_feasibility_study",
        "solar_ready_design",
        "solar_pv_system",
        "battery_storage_system",
        "solar_plus_storage_system"
      ],
      "hardRequirements": [
        "Customer or project must be in eligible Energy Trust service territory and meet program participation requirements.",
        "Planning incentives support early design, development assistance, battery storage feasibility, and solar-ready design.",
        "Installation incentives are tied to qualifying solar or solar-plus-storage projects and documented eligible costs.",
        "Battery incentives require pairing with new or existing solar where specified."
      ],
      "blockers": [
        "Do not treat this as a broad residential solar rebate; the page is for commercial new buildings, major renovations, and multifamily contexts.",
        "Do not match standalone battery storage unrelated to solar planning or solar-plus-storage backup.",
        "Feasibility-study incentives are non-physical planning support and should not be matched as completed equipment retrofits."
      ],
      "programType": "Rebate Program",
      "administrator": "Energy Trust of Oregon",
      "applicationUrl": null,
      "websiteUrl": "https://www.energytrust.org/incentives/solar-planning/",
      "sourceUrlsChecked": [
        "https://www.energytrust.org/incentives/solar-planning/"
      ],
      "evidenceText": "Energy]( Trust's Solar Planning page offers incentives for solar early design, development assistance, battery storage feasibility, solar-ready design, and solar or battery installation tied to commercial and multifamily projects.",
      "reasoningNotes": "Kept both planning and physical solar-plus-storage categories, with non-physical feasibility categories separated."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Program supports solar-plus-storage planning or feasibility work rather than a direct equipment rebate formula.",
        "sourceUrlsChecked": [
          "https://www.energytrust.org/incentives/solar-planning/"
        ],
        "reasoningNotes": "Feasibility studies and planning services should not be forced into an upfront savings rule.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "battery_tou_demand_savings",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1132",
    "opportunityName": "State Home Oil Weatherization (SHOW) Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1132/state-home-oil-weatherization-show-program",
    "websiteUrl": "https://www.oregon.gov/ohcs/energy-weatherization/pages/show.aspx",
    "applicationUrl": "https://www.oregon.gov/ohcs/energy-weatherization/Documents/FINAL%20-%20SHOW%20Cash%20Payment%20Application%2007.2025.pdf",
    "administrator": "Oregon Housing and Community Services",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "duct_sealing_and_insulation",
        "displayName": "Duct sealing and duct insulation",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "duct sealing"
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
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Oregon program for dwellings primarily heated with eligible fuel oil; funding is first-come and subject to current availability."
      },
      "eligibleApplicantTypes": [
        "homeowners",
        "dwelling owners",
        "contractors acting for homeowners",
        "low-income households",
        "nonprofit weatherization contractors",
        "weatherization grantees"
      ],
      "eligibleSectors": [
        "residential",
        "low_income_residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "oil_heating_system_replacement",
        "heating_system_repair",
        "programmable_thermostat",
        "window_and_door_replacement",
        "health_and_safety_weatherization"
      ],
      "hardRequirements": [
        "Dwelling must be in Oregon and use fuel oil dealer fuel as the primary heating fuel at application and after measures are completed.",
        "Applicant must meet homeowner, contractor, tenant, or grantee requirements and provide proof of eligible fuel purchases where required.",
        "Measures must be qualifying energy conservation measures such as heating-system work, ductwork, insulation, windows and doors, air sealing, or health and safety items.",
        "Applications and cash payments are subject to program-year rules, one-year completion windows, tier rules, and funding availability.",
        "Fuel switching away from eligible heating fuel is not allowed."
      ],
      "blockers": [
        "Natural gas or electric primary-heated dwellings are not eligible.",
        "Heat pumps or other measures that discontinue fuel oil use are not eligible.",
        "Recreational vehicles and non-dwelling projects are blocked.",
        "Current funding notices may delay processing or payment until new funds are available.",
        "Contractors must pass the discount or payment benefit through as required."
      ],
      "programType": "Rebate Program",
      "administrator": "Oregon Housing and Community Services",
      "applicationUrl": "https://www.oregon.gov/ohcs/energy-weatherization/Documents/FINAL%20-%20SHOW%20Cash%20Payment%20Application%2007.2025.pdf",
      "websiteUrl": "https://www.oregon.gov/ohcs/energy-weatherization/pages/show.aspx",
      "sourceUrlsChecked": [
        "https://www.oregon.gov/ohcs/energy-weatherization/pages/show.aspx",
        "https://secure.sos.state.or.us/oard/displayDivisionRules.action?selectedDivision=4686",
        "https://www.oregon.gov/ohcs/energy-weatherization/Documents/FINAL%20-%20SHOW%20Cash%20Payment%20Application%2007.2025.pdf"
      ],
      "evidenceText": "Oregon]( SHOW supports energy conservation measures in dwellings primarily heated with fuel-oil dealer fuel, including heating-system work, ductwork, insulation, windows and doors, air sealing, and health and safety measures.",
      "reasoningNotes": "Confirmed weatherization, duct, and insulation matches and added supported oil-heating, thermostat, window, door, and safety measures while blocking fuel switching."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "SHOW is weatherization assistance for oil-heated homes, not a direct customer rebate formula.",
        "sourceUrlsChecked": [
          "https://www.oregon.gov/ohcs/energy-weatherization/Pages/energy-conservation-help.aspx"
        ],
        "reasoningNotes": "Assistance/weatherization service delivery should not be modeled as fixed upfront project savings.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "envelope_insulation_savings",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5851",
    "opportunityName": "PECO Energy (Gas)- Commercial Heating Efficiency Rebate Program",
    "state": "PA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5851/peco-energy-gas-commercial-heating-efficiency-rebate-program",
    "websiteUrl": "https://pecobizsavings.com/peco/",
    "applicationUrl": "https://cr101.my.salesforce-sites.com/",
    "administrator": "PECO Energy",
    "programType": "Business Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "PA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "PECO business electric and natural gas service territory"
        ],
        "notes": "Current PECO business incentives are broader than the older gas-only commercial heating pages."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "institutional_customer",
        "municipal_customer",
        "agricultural_customer",
        "contractor_on_behalf_of_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "municipal",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_commercial_natural_gas_furnace",
        "high_efficiency_commercial_natural_gas_boiler",
        "commercial_hvac_efficiency",
        "commercial_domestic_hot_water_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be a PECO business customer with an eligible account.",
        "Measure eligibility depends on current PECO business prescriptive, instant, or custom incentive rules.",
        "Preapproval, technical review, invoices, specifications, savings calculations, and W-9 documentation may be required.",
        "Old gas-only application forms should not be used past their stated program terms."
      ],
      "blockers": [
        "Do not match residential projects.",
        "Do not rely on expired 2025 commercial gas forms as proof of current gas-only rebate terms.",
        "Do not match installations made before required preapproval.",
        "Do not match non-PECO business accounts or duplicate-incentive projects."
      ],
      "programType": "Business Energy Efficiency Rebate Program",
      "administrator": "PECO Energy",
      "applicationUrl": "https://cr101.my.salesforce-sites.com/",
      "websiteUrl": "https://pecobizsavings.com/peco/",
      "sourceUrlsChecked": [
        "https://pecobizsavings.com/peco/",
        "https://pecobizsavings.com/peco/incentives-overview/prescriptive-incentives/",
        "https://pecobizsavings.com/peco/incentives-overview/large-business/",
        "https://pecobizsavings.com/peco/resources/how-to-apply-for-incentives/"
      ],
      "evidenceText": "PECO's current business savings site offers instant, custom, and prescriptive incentives for business upgrades including HVAC and domestic hot water; older gas heating forms were term-limited.",
      "reasoningNotes": "Commercial furnace and boiler matches are plausible but should be validated against the current PECO business incentive path at application time. Residential gas heating rules should not be imported."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "PECO commercial gas pages/forms were found, but no current commercial furnace or boiler amount was verified in accessible official text.",
        "sourceUrlsChecked": [
          "http://www.peco.com/WaystoSave/ForYourBusiness/Pages/GasEUOverview.aspx",
          "https://pecohomerebateprogram.com/pdf/rebate-forms/2025-PECO-HR-2711400-Commercial-Natural-Gas-Heating-Conversion_FILLABLE.pdf?v=2006",
          "https://programs.dsireusa.org/system/program/detail/5851"
        ],
        "reasoningNotes": "Do not substitute residential or third-party gas rebate values for a commercial gas heating target.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5362",
    "opportunityName": "Commercial Scale Renewable Energy Grants (Commerce RI)",
    "state": "RI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5362/commercial-scale-renewable-energy-grants-commerce-ri",
    "websiteUrl": "https://commerceri.com/renewable-energy-fund/",
    "applicationUrl": null,
    "administrator": "Commerce RI Renewable Energy Fund",
    "programType": "Grant",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy storage"
        ]
      },
      {
        "retrofitTypeId": "biomass_biogas_energy_system",
        "displayName": "Biomass / biogas energy system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "biomass"
        ]
      },
      {
        "retrofitTypeId": "solar_carport",
        "displayName": "Solar carport",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "solar carport"
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
        "cities": [],
        "utilityTerritories": [],
        "notes": "Statewide Rhode Island Renewable Energy Fund commercial-scale solar program with scheduled application rounds."
      },
      "eligibleApplicantTypes": [
        "businesses",
        "nonprofits",
        "academic_institutions",
        "municipal_buildings",
        "state_buildings",
        "large_facility_owners",
        "solar_installers"
      ],
      "eligibleSectors": [
        "commercial",
        "government",
        "nonprofit",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "commercial_solar_pv",
        "solar_carport",
        "battery_storage_system"
      ],
      "hardRequirements": [
        "Project must be a commercial-scale solar project in Rhode Island.",
        "Applicant must apply during an open Commerce RI Renewable Energy Fund round.",
        "Energy storage and solar carport incentives apply as adders to eligible solar projects.",
        "Project cannot be paired with the Renewable Energy Growth Program.",
        "Awards are subject to per-project, per-installer, and round funding caps."
      ],
      "blockers": [
        "Biomass or biogas energy systems are not supported by the current commercial-scale solar grant materials.",
        "Residential homeowner incentives are a separate REF track and were described separately from the commercial-scale program.",
        "Standalone storage without an eligible solar project is not supported by the checked commercial-scale materials."
      ],
      "programType": "Grant",
      "administrator": "Commerce RI Renewable Energy Fund",
      "applicationUrl": null,
      "websiteUrl": "https://commerceri.com/renewable-energy-fund/",
      "sourceUrlsChecked": [
        "https://commerceri.com/renewable-energy-fund/",
        "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Commercial_Flyer_778e7b33-c575-431c-9973-44bc372ed4cc.pdf"
      ],
      "evidenceText": "Commerce RI's commercial flyer describes large-scale solar project grants for businesses, nonprofits, academic institutions, municipal or state buildings, with adders for solar carports and energy storage.",
      "reasoningNotes": "Solar carport and storage matches are supported only as parts of eligible commercial-scale solar projects. Biomass should be removed."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Commerce RI REF materials provide multiple watt-based tiers, carport adders, storage adders, and grant caps.",
        "sourceUrlsChecked": [
          "https://commerceri.com/renewable-energy-fund/"
        ],
        "reasoningNotes": "Tiered/project-type table needs a later focused pass.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1352",
    "opportunityName": "National Grid (Electric) - Large Business Program",
    "state": "RI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1352/national-grid-electric-large-business-program",
    "websiteUrl": "https://www.rienergy.com/RI-Business/Energy-Saving-Programs/Large-Business-Program",
    "applicationUrl": null,
    "administrator": "Rhode Island Energy",
    "programType": "Business Energy Efficiency Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "RI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Rhode Island Energy business electric and gas service territory"
        ],
        "notes": "The legacy National Grid Rhode Island program has transitioned to Rhode Island Energy branding."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "municipal_customer",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "municipal",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_commercial_boiler_retrofit",
        "high_efficiency_commercial_furnace_retrofit",
        "commercial_hvac_efficiency",
        "led_lighting_retrofit",
        "commercial_energy_management_controls",
        "variable_speed_drive_retrofit",
        "commercial_refrigeration_efficiency",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Applicant must be a Rhode Island Energy business customer on an eligible account or rate.",
        "Measure eligibility, incentive caps, and preapproval requirements depend on the applicable prescriptive, custom, or market segment pathway.",
        "Custom and large projects may require technical review and utility approval before installation.",
        "Program funding and incentive levels are subject to current Rhode Island Energy rules."
      ],
      "blockers": [
        "Do not treat this as a residential appliance or home weatherization program.",
        "Do not use old National Grid branding as evidence of current administrator without checking Rhode Island Energy current materials.",
        "Solar, demand response, and EV charging are separate program areas unless specifically included in a current business efficiency pathway."
      ],
      "programType": "Business Energy Efficiency Incentive Program",
      "administrator": "Rhode Island Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.rienergy.com/RI-Business/Energy-Saving-Programs/Large-Business-Program",
      "sourceUrlsChecked": [
        "https://www.rienergy.com/RI-Business/Energy-Saving-Programs/Large-Business-Program",
        "https://energy.ri.gov/incentives"
      ],
      "evidenceText": "Current Rhode Island incentive listings identify Rhode Island Energy business incentives for custom retrofits, HVAC, natural gas heating equipment including boilers, retrofit lighting, controls, refrigeration, and related efficiency measures.",
      "reasoningNotes": "The original boiler, HVAC, and lighting matches are generally supported for business efficiency, but the old National Grid Large Business page is not the best current authority."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Large business gas incentives are project- and measure-specific and no reusable boiler or lighting formula was verified.",
        "sourceUrlsChecked": [
          "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/savings-for-your-business",
          "https://programs.dsireusa.org/system/program/detail/1352"
        ],
        "reasoningNotes": "No safe one-time rule should be created without the current large-business measure table.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5140",
    "opportunityName": "Business Energy Efficiency Rebate (Offered by 11 Utilities)",
    "state": "SD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5140/business-energy-efficiency-rebate-offered-by-11-utilities",
    "websiteUrl": "https://www.brightenergysolutions.com/members",
    "applicationUrl": null,
    "administrator": "Bright Energy Solutions / Missouri River Energy Services",
    "programType": "Business Energy Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "geothermal"
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
          "SD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "participating_bright_energy_solutions_mres_municipal_utilities"
        ],
        "notes": "Target record is South Dakota; eligibility is limited to business customers served by a participating Bright Energy Solutions municipal electric utility."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls",
        "high_efficiency_hvac_equipment",
        "air_source_heat_pump",
        "ground_source_geothermal_heat_pump",
        "ductless_mini_split_heat_pump",
        "variable_refrigerant_flow_heat_pump",
        "heat_pump_water_heater",
        "demand_controlled_ventilation",
        "energy_recovery_ventilation",
        "hvac_ecm_motor",
        "variable_frequency_drive",
        "high_efficiency_pumps",
        "commercial_refrigeration_efficiency",
        "commercial_kitchen_equipment",
        "compressed_air_efficiency",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Customer must be served by a participating Bright Energy Solutions municipal utility.",
        "Business rebate applications are submitted through the local utility or Bright Energy Solutions.",
        "Some projects require preapproval; equipment ordered, purchased, or installed before approval may not qualify.",
        "Measure-specific eligibility and efficiency requirements apply."
      ],
      "blockers": [
        "Residential-only rebates should not be matched to this business program.",
        "Battery storage is not supported; forklift lithium-ion batteries are fleet equipment, not stationary storage.",
        "Window or wall air conditioner rebates are product-specific and should not be treated as window replacement."
      ],
      "programType": "Business Energy Efficiency Rebate",
      "administrator": "Bright Energy Solutions / Missouri River Energy Services",
      "applicationUrl": null,
      "websiteUrl": "https://www.brightenergysolutions.com/members",
      "sourceUrlsChecked": [
        "https://www.mrenergy.com/services/energy-efficiency",
        "https://www.brightenergysolutions.com/members",
        "https://d23r6s4dwed217.cloudfront.net/general-uploads/BES_2026_Business_TriFold_Brochure.pdf",
        "https://www.brightenergysolutions.com/members/hutchinson-utilities-commission"
      ],
      "evidenceText": "Current]( BES business materials list heating and cooling, ground-source heat pumps, lighting retrofit, pumps and VFDs, compressed air, refrigeration, food service, and custom incentives for participating municipal utility business customers.",
      "reasoningNotes": "The original geothermal, HVAC, and LED matches are supported, but the program is broader business efficiency and must be limited to participating municipal utility customers. Input file reference:"
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Bright Energy Solutions business rebates vary by municipal utility and measure category; geothermal value was not safely verified.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/find-a-rebate/",
          "https://www.brightenergysolutions.com/resources/business"
        ],
        "reasoningNotes": "Utility-specific form selection is needed before creating a rule.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2631",
    "opportunityName": "Bryan Texas Utilities - SmartBUSINESS Commercial Energy Efficiency Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2631/bryan-texas-utilities-smartbusiness-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.btutilities.com/smartbusiness",
    "applicationUrl": null,
    "administrator": "Bryan Texas Utilities",
    "programType": "Commercial Energy Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "chiller"
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "led lighting"
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
          "Bryan"
        ],
        "utilityTerritories": [
          "Bryan Texas Utilities"
        ],
        "notes": "Available to eligible BTU commercial and industrial electric customers in BTU service territory."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "business_owner",
        "nonresidential_property_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "high_efficiency_chiller_replacement",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be a Bryan Texas Utilities commercial or industrial customer.",
        "Project must be in a nonresidential structure in BTU service territory.",
        "Applicant must document at least a 20 percent kW demand reduction.",
        "Projects must submit required invoices, before-and-after photos and supporting documentation.",
        "Incentives are limited by project cost percentage, annual customer cap and fiscal-year funding."
      ],
      "blockers": [
        "Insulation is explicitly not eligible because it does not qualify for the required demand reduction.",
        "Do not match residential buildings.",
        "Projects that cannot document the required kW demand reduction should not match.",
        "Measures outside lighting, HVAC, chillers or other large demand-reducing equipment require BTU review."
      ],
      "programType": "Commercial Energy Efficiency Rebate",
      "administrator": "Bryan Texas Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.btutilities.com/smartbusiness",
      "sourceUrlsChecked": [
        "https://www.btutilities.com/smartbusiness"
      ],
      "evidenceText": "BTU's SmartBUSINESS page lists eligible common projects such as LED lighting, HVAC units, chillers and other large equipment replacements, requires at least 20 percent kW demand reduction, and says insulation does not qualify.",
      "reasoningNotes": "Lighting and HVAC/chiller demand-reduction retrofits are valid. Insulation is a false positive and should be blocked."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "BTU SmartBUSINESS page says common projects include LED, HVAC units and chillers but instructs customers to contact the administrator.",
        "sourceUrlsChecked": [
          "https://btutilities.com/smartbusiness"
        ],
        "reasoningNotes": "No calculable rebate rate was published in accessible official source.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2653",
    "opportunityName": "Entergy Texas - Commercial Solutions Programs",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2653/entergy-texas-commercial-solutions-programs",
    "websiteUrl": "https://entergytexassolutions.com/eti/media/commercial-solutions-flyer-.pdf",
    "applicationUrl": "https://applications.entergytxsolutions.com/",
    "administrator": "Entergy Texas, Inc.",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "refrigeration"
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
          "Entergy Texas"
        ],
        "notes": "Specific facility account and meter must be served by Entergy Texas; the program targets select non-industrial commercial electric distribution customers under 69 kVa load."
      },
      "eligibleApplicantTypes": [
        "commercial_customers",
        "businesses",
        "schools",
        "municipalities",
        "commercial_property_owners",
        "commercial_tenants"
      ],
      "eligibleSectors": [
        "commercial",
        "public_sector",
        "education",
        "municipal",
        "healthcare",
        "retail",
        "office",
        "hospitality"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "high_efficiency_refrigeration_equipment",
        "cool_roofing_or_roofing_efficiency",
        "custom_commercial_energy_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be a select non-industrial commercial electric distribution customer of Entergy Texas.",
        "Facility must be below the program load threshold and served by an Entergy Texas electric account and meter.",
        "Applicant must provide a letter of intent, Entergy Texas electric bill, and required vendor documentation.",
        "Retrofit projects require pre-inspection before equipment removal.",
        "Project application and measure documentation must be submitted through the program portal.",
        "Installation must be completed within the applicable program year and before program deadlines.",
        "Post-inspection and verified electric demand or energy savings are required.",
        "Incentives are subject to available program funds."
      ],
      "blockers": [
        "Residential customers are not eligible for this commercial program.",
        "Industrial loads and accounts outside the eligible commercial distribution class are not supported.",
        "Program provides incentives and technical support but does not sell or install products.",
        "Equipment removed before pre-inspection can disqualify a retrofit project.",
        "Residential appliances, home weatherization, and residential HVAC should not match this record.",
        "Projects may be restricted from participation in other Entergy Texas energy efficiency programs for the same facility or project year."
      ],
      "programType": "Rebate Program",
      "administrator": "Entergy Texas, Inc.",
      "applicationUrl": "https://applications.entergytxsolutions.com/",
      "websiteUrl": "https://entergytexassolutions.com/eti/media/commercial-solutions-flyer-.pdf",
      "sourceUrlsChecked": [
        "https://www.entergytxsolutions.com/customers/",
        "https://entergytexassolutions.com/eti/media/commercial-solutions-flyer-.pdf",
        "https://entergytexassolutions.com/eti/media/program-manual-.pdf",
        "https://applications.entergytxsolutions.com/",
        "https://www.entergytexas.com/energyefficiency"
      ],
      "evidenceText": "The 2026 Entergy Texas Commercial Solutions materials list lighting, HVAC, refrigeration, roofing, and custom/other incentives for select non-industrial commercial electric customers under 69 kVa. Projects require LOI enrollment, account verification, pre-inspection, application, post-inspection, and verified electric savings.",
      "reasoningNotes": "Preserved lighting, HVAC, and refrigeration. Added only program-supported roofing and custom commercial energy efficiency. Avoided residential or product categories not supported by the commercial manual."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Entergy Texas commercial solutions are project-specific and no reusable lighting or refrigeration formula was verified.",
        "sourceUrlsChecked": [
          "https://www.entergy-texas.com/energyefficiency/business/"
        ],
        "reasoningNotes": "No safe per-kWh or per-unit rule was found in accessible source text.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5886",
    "opportunityName": "Fairfax County- Conservation Assistance Programs (CAP)",
    "state": "VA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5886/fairfax-county-conservation-assistance-programs-cap",
    "websiteUrl": "https://www.fairfaxcounty.gov/soil-water-conservation/conservation-assistance-programs",
    "applicationUrl": "https://www.fairfaxcounty.gov/soil-water-conservation/vcap",
    "administrator": "Northern Virginia Soil and Water Conservation District",
    "programType": "Cost Share Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "window_replacement",
        "displayName": "Window replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "window"
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
        "counties": [
          "Fairfax County"
        ],
        "cities": [
          "City of Fairfax"
        ],
        "utilityTerritories": [],
        "notes": "CAP and VCAP apply to eligible properties in Fairfax County or the City of Fairfax through the Northern Virginia Soil and Water Conservation District."
      },
      "eligibleApplicantTypes": [
        "property_owners",
        "residential_property_owners",
        "homeowner_associations",
        "civic_associations",
        "places_of_worship"
      ],
      "eligibleSectors": [
        "residential",
        "community_association",
        "nonprofit",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "stormwater_management_practice",
        "impervious_surface_removal",
        "conservation_landscaping",
        "rain_garden",
        "dry_well",
        "bioretention",
        "infiltration_trench",
        "constructed_wetland",
        "living_shoreline",
        "green_roof",
        "rainwater_harvesting",
        "permeable_pavement",
        "vegetated_stormwater_conveyance"
      ],
      "hardRequirements": [
        "Property must be in Fairfax County or the City of Fairfax.",
        "Property must experience detrimental stormwater impacts such as erosion, excess runoff, poor drainage, or poor vegetation.",
        "Applicant must request a site visit and develop an eligible practice plan before approval.",
        "Practice must be approved by the district or program authority before installation.",
        "Installed practice must pass inspection before reimbursement.",
        "Property owner must maintain the installed practice for the required maintenance period.",
        "Reimbursement is limited by program caps and actual eligible costs."
      ],
      "blockers": [
        "Insulation, window replacement, lighting, HVAC, and appliance energy upgrades are unsupported false-positive matches.",
        "Energy Conservation Assistance is a separate ECAP program and should not be conflated with CAP or VCAP stormwater practices.",
        "Work started before approval is not reimbursable.",
        "French drains, foundation drains, retaining walls, stream restorations, non-native landscaping, and similar excluded measures do not qualify.",
        "Projects required solely for regulatory compliance are not eligible voluntary conservation practices."
      ],
      "programType": "Cost Share Rebate Program",
      "administrator": "Northern Virginia Soil and Water Conservation District",
      "applicationUrl": "https://www.fairfaxcounty.gov/soil-water-conservation/vcap",
      "websiteUrl": "https://www.fairfaxcounty.gov/soil-water-conservation/conservation-assistance-programs",
      "sourceUrlsChecked": [
        "https://www.fairfaxcounty.gov/soil-water-conservation/conservation-assistance-programs",
        "https://www.fairfaxcounty.gov/soil-water-conservation/vcap",
        "https://www.fairfaxcounty.gov/soil-water-conservation/cap-vcap-faq"
      ],
      "evidenceText": "Fairfax CAP/VCAP is a stormwater cost-share program for Fairfax County or City of Fairfax properties. Eligible practices include rain gardens, conservation landscaping, impervious surface removal, dry wells, bioretention, green roofs, rainwater harvesting, and permeable pavement; energy upgrades are a separate ECAP program.",
      "reasoningNotes": "Replaced building-envelope and lighting false positives with stormwater practices. Added a blocker to keep ECAP energy conservation separate."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Fairfax CAP is for stormwater/soil-water projects, not energy retrofit or solar PV incentives.",
        "sourceUrlsChecked": [
          "https://www.fairfaxcounty.gov/soil-water-conservation/conservation-assistance-programs"
        ],
        "reasoningNotes": "Matched energy mapping is not supported by official scope.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "solar_electric_offset",
          "incentiveValueMethod": "per_kw",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22569",
    "opportunityName": "Columbia REA Commercial and Agricultural Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22569/columbia-rea-commercial-and-agricultural-efficiency-rebate-program",
    "websiteUrl": "https://www.columbiarea.coop/energy-efficiency/rebate-offers/",
    "applicationUrl": null,
    "administrator": "Columbia Rural Electric Association",
    "programType": "Commercial Agricultural Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "heat pump",
          "mini split",
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
          "WA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Columbia Rural Electric Association"
        ],
        "notes": "Available to eligible Columbia REA commercial, industrial, and agricultural members; specific forms and funding limits apply."
      },
      "eligibleApplicantTypes": [
        "commercial_member",
        "industrial_member",
        "agricultural_member"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "commercial_lighting_retrofit",
        "ductless_heat_pump_retrofit",
        "air_source_heat_pump_retrofit",
        "variable_refrigerant_flow_hvac_retrofit",
        "advanced_rooftop_unit_controls",
        "connected_thermostat",
        "hvac_controls_retrofit",
        "commercial_building_envelope_insulation",
        "commercial_window_retrofit",
        "variable_frequency_drive",
        "agricultural_irrigation_pump_upgrade",
        "agricultural_irrigation_vfd",
        "agricultural_irrigation_system_upgrade"
      ],
      "hardRequirements": [
        "Project site must be served by Columbia REA.",
        "Rebates are subject to current funding, forms, and measure-specific requirements.",
        "Commercial HVAC, controls, lighting, VFD, envelope, and window measures must meet current program criteria.",
        "Agricultural irrigation pump and VFD measures must meet horsepower, equipment, cost-share, and program-year requirements."
      ],
      "blockers": [
        "Residential appliances, residential weatherization, heat pump water heaters, and EV charger rebates are separate residential offerings.",
        "Smart thermostat matches must be limited to connected thermostat controls in eligible commercial buildings.",
        "Generic HVAC replacement should be narrowed to qualifying ductless, air-source, VRF, RTU-control, or listed commercial measures.",
        "Do not infer commercial kitchen or refrigeration unless the current commercial form specifically covers it."
      ],
      "programType": "Commercial Agricultural Efficiency Rebate",
      "administrator": "Columbia Rural Electric Association",
      "applicationUrl": null,
      "websiteUrl": "https://www.columbiarea.coop/energy-efficiency/rebate-offers/",
      "sourceUrlsChecked": [
        "https://www.columbiarea.coop/energy-efficiency/rebate-offers/",
        "https://www.columbiarea.coop/wp-content/uploads/Commercial-Energy-Efficiency-Rebate-Form-20210330.pdf",
        "https://www.columbiarea.coop/wp-content/uploads/Ductless-Heat-Pump-Project-Information-Form_updated.pdf",
        "https://www.columbiarea.coop/wp-content/uploads/ARC-Rebate-Form-20210330.pdf",
        "https://www.columbiarea.coop/wp-content/uploads/CONNECTED_THERMOST_FLYER_4-2020.pdf",
        "https://www.columbiarea.coop/wp-content/uploads/Agricultural_Pump_Efficiency_Upgrade-10012025.pdf"
      ],
      "evidenceText": "Columbia]( REA’s current rebate page lists commercial, industrial, and agricultural offers including lighting, ductless and air-source heat pumps, VRF, advanced RTU controls, connected thermostats, VFDs, and irrigation pump upgrades.",
      "reasoningNotes": "Heat pump and thermostat matches are supported only within the listed commercial, industrial, or agricultural measures. Residential measures and EV charging are separate."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Columbia REA rebate page describes efficiency rebate offers but no clear whole-building per-kWh rule was verified.",
        "sourceUrlsChecked": [
          "https://www.columbiarea.coop/energy-efficiency/rebate-offers/"
        ],
        "reasoningNotes": "Matched HVAC terms require a specific measure table or project savings calculation.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5765",
    "opportunityName": "Columbia Rural Electric Association - Commercial Energy Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5765/columbia-rural-electric-association-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.columbiarea.coop/energy-efficiency/rebate-offers/",
    "applicationUrl": "https://www.columbiarea.coop/wp-content/uploads/Commercial-Energy-Efficiency-Rebate-Form-20210330.pdf",
    "administrator": "Columbia Rural Electric Association",
    "programType": "Commercial Energy Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "WA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Columbia Rural Electric Association"
        ],
        "notes": "Available to eligible Columbia REA commercial and industrial members; agricultural measures are handled under separate agricultural rebate forms."
      },
      "eligibleApplicantTypes": [
        "commercial_member",
        "industrial_member",
        "nonresidential_member"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "commercial_lighting_retrofit",
        "ductless_heat_pump_retrofit",
        "air_source_heat_pump_retrofit",
        "variable_refrigerant_flow_hvac_retrofit",
        "advanced_rooftop_unit_controls",
        "connected_thermostat",
        "hvac_controls_retrofit",
        "commercial_building_envelope_insulation",
        "commercial_window_retrofit",
        "variable_frequency_drive"
      ],
      "hardRequirements": [
        "Project site must be served by Columbia REA.",
        "Commercial energy efficiency rebate form and applicable worksheets must be submitted.",
        "Ductless heat pump, advanced RTU control, connected thermostat, lighting, VFD, envelope, and window measures must meet current program specifications.",
        "Rebates are subject to available funding and case-by-case approval."
      ],
      "blockers": [
        "Agricultural irrigation pump and sprinkler measures belong to agricultural rebate offerings, not the commercial-only repair category.",
        "Residential heat pump, thermostat, appliance, EV, and water-heater rebates should not be matched.",
        "Smart thermostat should be narrowed to eligible connected thermostat retrofit controls in commercial buildings.",
        "Generic HVAC replacement should be narrowed to listed heat-pump, VRF, RTU-control, or HVAC control measures."
      ],
      "programType": "Commercial Energy Efficiency Rebate",
      "administrator": "Columbia Rural Electric Association",
      "applicationUrl": "https://www.columbiarea.coop/wp-content/uploads/Commercial-Energy-Efficiency-Rebate-Form-20210330.pdf",
      "websiteUrl": "https://www.columbiarea.coop/energy-efficiency/rebate-offers/",
      "sourceUrlsChecked": [
        "https://www.columbiarea.coop/energy-efficiency/rebate-offers/",
        "https://www.columbiarea.coop/wp-content/uploads/Commercial-Energy-Efficiency-Rebate-Form-20210330.pdf",
        "https://www.columbiarea.coop/wp-content/uploads/Ductless-Heat-Pump-Project-Information-Form_updated.pdf",
        "https://www.columbiarea.coop/wp-content/uploads/ARC-Rebate-Form-20210330.pdf",
        "https://www.columbiarea.coop/wp-content/uploads/CONNECTED_THERMOST_FLYER_4-2020.pdf"
      ],
      "evidenceText": "The]( Columbia REA commercial form and related current materials list commercial lighting, ductless and air-source heat pumps, VRF, advanced RTU controls, connected thermostats, VFDs, envelope insulation, and window retrofits.",
      "reasoningNotes": "The supplied heat pump and thermostat matches are supported after narrowing to commercial program measures. Agricultural and residential offerings should remain separate."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Columbia REA commercial measures include heat pumps, controls and thermostats, but exact current values were not official-source verified.",
        "sourceUrlsChecked": [
          "https://columbiarea.coop/rebate-offers",
          "https://www.columbiarea.coop/energy-efficiency/rebate-offers/"
        ],
        "reasoningNotes": "No single motor/VFD rule should be created without a current commercial application table.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2080",
    "opportunityName": "Franklin County PUD - Energy Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2080/franklin-county-pud-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.franklinpud.com/programs-services/energy-efficiency/rebates-incentive-programs/",
    "applicationUrl": null,
    "administrator": "Franklin PUD",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "WA"
        ],
        "counties": [
          "Franklin County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Franklin PUD"
        ],
        "notes": "Applies to eligible Franklin PUD residential electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_clothes_washer",
        "energy_star_clothes_dryer",
        "smart_thermostat_zoning_retrofit",
        "insulation_upgrade",
        "energy_audit"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Franklin PUD residential customer.",
        "Appliance rebate applications must be submitted within 60 days of purchase with required documentation.",
        "Clothes washer and dryer equipment must meet ENERGY STAR or listed qualifying criteria.",
        "Smart thermostat must be on the qualifying thermostat list.",
        "Insulation rebates require coordination with Franklin PUD Energy Services."
      ],
      "blockers": [
        "High-efficiency laundry equipment should be narrowed to residential ENERGY STAR clothes washers and dryers.",
        "Commercial laundry, commercial kitchen, and industrial equipment are not supported by the residential rebate page.",
        "Nonqualifying appliances or late rebate submissions should not match."
      ],
      "programType": "Rebate",
      "administrator": "Franklin PUD",
      "applicationUrl": null,
      "websiteUrl": "https://www.franklinpud.com/programs-services/energy-efficiency/rebates-incentive-programs/",
      "sourceUrlsChecked": [
        "https://www.franklinpud.com/programs-services/energy-efficiency/rebates-incentive-programs/",
        "https://www.franklinpud.com/programs-services/energy-efficiency/residential-energy-audits/"
      ],
      "evidenceText": "Franklin PUD's rebate page lists qualifying ENERGY STAR clothes washer, clothes dryer, select smart thermostat, and insulation rebates. Its energy audit page separately describes residential energy audits.",
      "reasoningNotes": "Original insulation and smart thermostat matches are correct. Laundry should be product-specific rather than broad commercial laundry equipment; an audit category is supported by the current redirected residential audit page."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official Franklin PUD page lists energy efficiency services but did not expose current thermostat or insulation values.",
        "sourceUrlsChecked": [
          "https://www.franklinpud.com/index.php/energy-efficiency/residential-rebate-programs/"
        ],
        "reasoningNotes": "DSIRE lists amounts, but no official current formula was found for final proof.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2416",
    "opportunityName": "Pacific Power - Residential wattsmart Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2416/pacific-power-residential-wattsmart-program",
    "websiteUrl": "https://wattsmartsavings.net/washington-residential/",
    "applicationUrl": "https://csapps.pacificpower.net/",
    "administrator": "Pacific Power",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "duct_sealing_and_insulation",
        "displayName": "Duct sealing and duct insulation",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "duct sealing",
          "duct insulation"
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
          "WA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Pacific Power Washington residential service territory"
        ],
        "notes": "Applies to qualifying Pacific Power Washington residential customers."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners",
        "renters",
        "landlords"
      ],
      "eligibleSectors": [
        "residential",
        "low_income_residential",
        "manufactured_home",
        "single_family",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "duct_sealing_and_insulation",
        "heat_pump_hvac_retrofit",
        "smart_thermostat",
        "central_air_conditioner_replacement",
        "evaporative_cooler",
        "line_voltage_thermostat",
        "insulation_upgrade",
        "energy_efficient_window_replacement",
        "heat_pump_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be a Pacific Power Washington residential customer.",
        "Applications must be submitted through the Online Incentive Center or required program path.",
        "Required documentation must be submitted within program deadlines, often 180 days.",
        "Duct sealing is limited to qualifying existing single-family or manufactured homes with ducted electric heat and ducts in unconditioned spaces.",
        "Equipment and installation must meet applicable program specifications.",
        "Incentives are subject to tariff and program changes."
      ],
      "blockers": [
        "Gas, oil, propane or wood primary heat disqualifies duct sealing.",
        "Multifamily and new construction are not eligible for the duct-sealing incentive.",
        "Solar, battery and EV programs are separate.",
        "Window category means efficient window replacement, not window air conditioners."
      ],
      "programType": "Rebate",
      "administrator": "Pacific Power",
      "applicationUrl": "https://csapps.pacificpower.net/",
      "websiteUrl": "https://wattsmartsavings.net/washington-residential/",
      "sourceUrlsChecked": [
        "https://wattsmartsavings.net/washington-residential/",
        "https://wattsmartsavings.net/washington-residential/find-savings-heating-and-cooling/",
        "https://wattsmartsavings.net/washington-residential/find-savings-heating-and-cooling/duct-sealing/",
        "https://wattsmartsavings.net/washington-residential/find-savings-weatherization/",
        "https://wattsmartsavings.net/washington-residential/find-savings-plumbing-and-water-heating/",
        "https://csapps.pacificpower.net/"
      ],
      "evidenceText": "Pacific Power’s Washington residential Wattsmart pages list incentives for heat pumps, duct sealing, thermostats, central AC, evaporative coolers, insulation, windows and heat pump water heaters; duct sealing is limited to qualifying electrically heated homes.",
      "reasoningNotes": "The original duct sealing, heat pump and insulation matches are supported, and the current program also supports related residential HVAC, thermostat, window and heat pump water heater measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Pacific Power Washington residential Wattsmart pages contain multiple heat-pump, duct, insulation, and window rebates.",
        "sourceUrlsChecked": [
          "https://wattsmartsavings.net/washington-residential/"
        ],
        "reasoningNotes": "Later pass should select a specific measure.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4532",
    "opportunityName": "Peninsula Light Company - Commercial Efficient Lighting  Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4532/peninsula-light-company-commercial-efficient-lighting-rebate-program",
    "websiteUrl": "https://www.penlight.org/energy-efficiency/incentives/commercial-incentives/",
    "applicationUrl": null,
    "administrator": "Peninsula Light Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "refrigeration"
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "WA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Peninsula Light Company electric service territory"
        ],
        "notes": "Official detailed page was not fully readable during research, but official indexed text supports a commercial lighting incentive."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "commercial_led_lighting_retrofit",
        "commercial_lighting_controls"
      ],
      "hardRequirements": [
        "Applicant must be a Peninsula Light Company commercial electric customer.",
        "Project must be a qualifying lighting upgrade under the commercial lighting incentive program.",
        "Utility application, approval, and technical requirements should be verified before installation."
      ],
      "blockers": [
        "Do not match refrigeration; no current official source verified refrigeration for this commercial lighting opportunity.",
        "Do not match HVAC from this specific commercial lighting record unless a current official PenLight commercial HVAC incentive source is separately verified.",
        "Do not use residential incentive pages to support commercial lighting matches.",
        "Detailed official page access was blocked, so do not generalize beyond lighting."
      ],
      "programType": "Rebate Program",
      "administrator": "Peninsula Light Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.penlight.org/energy-efficiency/incentives/commercial-incentives/",
      "sourceUrlsChecked": [
        "https://www.penlight.org/energy-efficiency/incentives/commercial-incentives/",
        "https://www.penlight.org/energy-efficiency/incentives/"
      ],
      "evidenceText": "PenLight's official indexed text describes a commercial lighting incentive program that covers part of the cost to upgrade lighting; refrigeration was not verified.",
      "reasoningNotes": "The original refrigeration and HVAC matches should be removed for this lighting-specific opportunity. Confidence is medium because the detailed official page returned access errors."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Peninsula Light commercial incentives page confirms lighting incentives but does not expose a refrigeration or HVAC formula.",
        "sourceUrlsChecked": [
          "https://www.penlight.org/energy-efficiency/incentives/commercial-incentives/"
        ],
        "reasoningNotes": "No safe one-time rule was verified for the target refrigeration mapping.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
