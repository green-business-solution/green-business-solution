You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 35
Targets in this prompt: 681-700 of 984
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
  "batchNumber": 35,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:5254"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4533",
    "opportunityName": "Farmers Electric Cooperative (Kalona) - Residential Energy Efficiency Rebate Program",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4533/farmers-electric-cooperative-kalona-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://farmerselectric.coop/energy-solutions/rebates-incentives/",
    "applicationUrl": null,
    "administrator": "Farmers Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 6,
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
          "ground source heat pump",
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
          "air conditioner",
          "air conditioning"
        ]
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "led lighting"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Farmers Electric Cooperative (Kalona) service territory"
        ],
        "notes": "Limited to Farmers Electric Cooperative members served from the Kalona, Iowa cooperative territory."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "electric_cooperative_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_air_conditioner",
        "residential_refrigerator_freezer",
        "residential_led_lighting"
      ],
      "hardRequirements": [
        "Applicant must be a Farmers Electric Cooperative residential member.",
        "Annual residential rebate cap applies per membership.",
        "Appliances and lighting must meet current ENERGY STAR or program specifications where required."
      ],
      "blockers": [
        "high_efficiency_refrigeration_equipment must be narrowed to residential ENERGY STAR refrigerator or freezer, not commercial refrigeration.",
        "led_lighting_retrofit must be narrowed to residential LED bulbs or the program-specific bulb allowance.",
        "Commercial kitchen, motors and business lighting should not be inferred from this residential program."
      ],
      "programType": "Rebate Program",
      "administrator": "Farmers Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://farmerselectric.coop/energy-solutions/rebates-incentives/",
      "sourceUrlsChecked": [
        "https://farmerselectric.coop/energy-solutions/rebates-incentives/",
        "http://www.feckalona.net/energy-efficiency-rebates.html",
        "https://programs.dsireusa.org/system/program/detail/4533/farmers-electric-cooperative-kalona-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Current official search snippets identify FEC residential-member eligibility, a per-membership cap, and rebates for heat pump water heaters, ENERGY STAR refrigerator or freezer and LEDs.",
      "reasoningNotes": "The official current page and legacy page were not fully renderable in the browser, so status and categories are based on official snippets plus DSIRE as a starting clue."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Official rebate page confirms residential rebates and an annual cap, but exact target measure amounts were not verified.",
        "sourceUrlsChecked": [
          "https://farmerselectric.coop/energy-solutions/rebates-incentives/",
          "http://www.feckalona.net/energy-efficiency-rebates.html"
        ],
        "reasoningNotes": "No safe rule selected because the official source did not expose a clear measure formula for the target terms.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4198",
    "opportunityName": "Northern Lights Inc. - Energy Conservation Rebate Program",
    "state": "ID",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4198/northern-lights-inc-energy-conservation-rebate-program",
    "websiteUrl": "https://www.nli.coop/save/rebates/",
    "applicationUrl": null,
    "administrator": "Northern Lights Inc.",
    "programType": "Electric Cooperative Energy Conservation Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 6,
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
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "ID"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Northern Lights Inc. electric service territory"
        ],
        "notes": "The DSIRE target is Idaho; current official snippets did not expose detailed service-territory boundaries or all customer classes."
      },
      "eligibleApplicantTypes": [
        "residential_member_customer",
        "member_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_laundry_equipment"
      ],
      "hardRequirements": [
        "Customer must be served by Northern Lights Inc.",
        "Smart thermostat rebate applies to a qualified smart thermostat installed with an electric furnace or heat pump system.",
        "Current clothes washer rebate requirements, eligible models, documentation, and sector eligibility must be verified from the official rebate form or NLI staff."
      ],
      "blockers": [
        "Do not match heat-pump HVAC, geothermal heat pumps, generic HVAC replacement, low-flow fixtures, or showerheads unless current NLI materials verify them.",
        "A smart thermostat rebate is not an incentive for replacing HVAC equipment.",
        "Do not infer commercial or industrial eligibility from residential appliance and thermostat snippets."
      ],
      "programType": "Electric Cooperative Energy Conservation Rebate Program",
      "administrator": "Northern Lights Inc.",
      "applicationUrl": null,
      "websiteUrl": "https://www.nli.coop/save/rebates/",
      "sourceUrlsChecked": [
        "https://www.nli.coop/save/rebates/",
        "https://www.nli.coop/smart-thermostat-rebate/",
        "https://www.nli.coop/rebate-clothes-washer/",
        "https://www.nli.coop/northern-lights-rebate-updates-2/",
        "https://www.nli.coop/northern-lights-revised-energy-rebate-offers/"
      ],
      "evidenceText": "Official]( NLI snippets verify a qualified smart thermostat rebate for customers with electric furnace or heat-pump systems and identify a clothes washer rebate page; broader measure details were blocked.",
      "reasoningNotes": "Current official snippets supported thermostat and clothes washer only. Heat pump, geothermal, showerhead, and generic HVAC matches were not retained."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "GPT Pro found a smart-thermostat amount, but this target is mapped to whole-building custom efficiency.",
        "sourceUrlsChecked": [
          "https://nli.coop/rebates/",
          "https://www.nli.coop/rebates"
        ],
        "reasoningNotes": "No reusable whole-building or per-kWh rule was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2677",
    "opportunityName": "Jackson County REMC - Energy Efficiency Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2677/jackson-county-remc-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.jacksonremc.com/energy-services/rebates/",
    "applicationUrl": null,
    "administrator": "Jackson County REMC",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "mini split",
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner"
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
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Jackson County REMC electric service territory"
        ],
        "notes": "Residential rebates apply to homes served by Jackson County REMC; C&I incentives are separate packets on the same rebate page."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "electric_cooperative_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "dual_fuel_heat_pump",
        "heat_pump_water_heater",
        "wifi_enabled_electric_storage_water_heater"
      ],
      "hardRequirements": [
        "Residential HVAC rebates require the member to occupy the home year-round.",
        "HVAC units generally must heat and cool the whole home unless the program states otherwise.",
        "Water heater rebates require installation in a home served by Jackson County REMC and required invoices or efficiency documentation.",
        "Heat pump water heater and Wi-Fi electric storage water heater requirements and limits apply per residence."
      ],
      "blockers": [
        "energy_management_system is not supported as a rebate category in the residential HVAC or water-heater materials checked.",
        "smart_thermostat_zoning_retrofit should not be matched to this rebate unless a separate current Jackson REMC thermostat rebate is verified.",
        "Commercial lighting, motors and compressed air incentives are separate C&I offerings and should not be inferred for residential applicants."
      ],
      "programType": "Rebate Program",
      "administrator": "Jackson County REMC",
      "applicationUrl": null,
      "websiteUrl": "https://www.jacksonremc.com/energy-services/rebates/",
      "sourceUrlsChecked": [
        "https://www.jacksonremc.com/energy-services/rebates/",
        "https://www.jacksonremc.com/wp-content/uploads/2026/01/2026_Residential_Water_Heater_Rebate_Application.pdf",
        "https://programs.dsireusa.org/system/program/detail/2677/jackson-county-remc-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Jackson REMC's 2026 rebate page lists residential water heaters, geothermal, air-source, ductless mini-split and dual-fuel heat pumps, with separate C&I materials.",
      "reasoningNotes": "False-positive controls and energy-management terms were removed unless independently verified in a current Jackson REMC rebate document."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Jackson County REMC rebate page did not expose exact current HVAC, thermostat, geothermal, or HPWH amounts in accessible text.",
        "sourceUrlsChecked": [
          "https://www.jacksonremc.com/energy-services/rebates/"
        ],
        "reasoningNotes": "A current application table is needed before creating a rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5832",
    "opportunityName": "Cleco- Power Wise™ Commercial Program",
    "state": "LA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5832/cleco-power-wise-commercial-program",
    "websiteUrl": "https://www.cleco.com/powerwise/commercial-programs",
    "applicationUrl": null,
    "administrator": "Cleco Power Wise",
    "programType": "Commercial Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "efficient_ice_machine",
        "displayName": "Efficient ice machine",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ice machine"
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
          "commercial dishwasher",
          "dishwasher"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_fryer",
        "displayName": "High-efficiency fryer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fryer"
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
          "LA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Cleco electric service territory"
        ],
        "notes": "Limited to eligible Cleco commercial customers and qualifying equipment installed in Cleco service territory."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "restaurant",
        "food_service_business",
        "small_business",
        "large_business"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "hospitality",
        "healthcare",
        "food_service"
      ],
      "eligibleRetrofitCategories": [
        "efficient_ice_machine",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "high_efficiency_steam_cooker",
        "high_efficiency_commercial_griddle",
        "pre_rinse_spray_valve",
        "commercial_kitchen_ecm_motor",
        "high_efficiency_hvac_replacement",
        "led_lighting_retrofit",
        "custom_energy_efficiency_measures"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Cleco commercial customer.",
        "Kitchen equipment must be installed in Cleco service territory and meet ENERGY STAR or listed program requirements.",
        "Kitchen rebate documentation must generally be submitted within 60 days of purchase.",
        "HVAC and lighting incentives depend on qualifying kWh savings and customer demand class.",
        "Program funding is limited and rebates are first come, first served."
      ],
      "blockers": [
        "Residential projects are not eligible under this commercial program.",
        "Pre-rinse spray valve should not be generalized into a broad plumbing retrofit.",
        "Kitchen equipment eligibility is limited to listed commercial food-service measures.",
        "Custom projects must reduce energy use and be approved under Cleco’s custom program.",
        "Projects outside Cleco service territory are ineligible."
      ],
      "programType": "Commercial Energy Efficiency Rebate Program",
      "administrator": "Cleco Power Wise",
      "applicationUrl": null,
      "websiteUrl": "https://www.cleco.com/powerwise/commercial-programs",
      "sourceUrlsChecked": [
        "https://www.cleco.com/powerwise/commercial-programs",
        "https://www.cleco.com/powerwise/commercial-programs/commercial-kitchen-rebates",
        "https://www.cleco.com/powerwise/commercial-programs/hvac-change-outs",
        "https://www.cleco.com/powerwise/commercial-programs/lighting-upgrades",
        "https://www.cleco.com/powerwise/commercial-programs/custom-program"
      ],
      "evidenceText": "Cleco commercial pages list kitchen equipment rebates, HVAC change-out incentives, lighting upgrades, and custom commercial or industrial energy efficiency projects.",
      "reasoningNotes": "The matched commercial kitchen, HVAC, and lighting categories are supported. Product-specific kitchen items should remain narrow and should not be generalized into broader plumbing or appliance categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Cleco commercial kitchen page confirms kitchen equipment rebates, but the checked source did not expose exact appliance amounts in text.",
        "sourceUrlsChecked": [
          "https://www.cleco.com/powerwise/commercial-programs/commercial-kitchen-rebates",
          "https://www.cleco.com/docs/default-source/energy-efficiency/commercial/cleco-commercial-kitchen-trifold.pdf"
        ],
        "reasoningNotes": "A later pass should extract the official kitchen rebate table.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5327",
    "opportunityName": "EmPOWER Maryland Low Income Energy Efficiency Program",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5327/empower-maryland-low-income-energy-efficiency-program",
    "websiteUrl": "https://dhcd.maryland.gov/Energy-Home-Repair/pages/homeowner-grants/empower.aspx",
    "applicationUrl": null,
    "administrator": "Maryland Department of Housing and Community Development",
    "programType": "No Cost Low Income Energy Efficiency Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy audit",
          "audit"
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigerator"
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
          "MD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Baltimore Gas and Electric",
          "Delmarva Power",
          "FirstEnergy",
          "Pepco",
          "Southern Maryland Electric Cooperative",
          "Washington Gas"
        ],
        "notes": "Statewide Maryland limited-income program delivered through DHCD and participating EmPOWER Maryland utilities."
      },
      "eligibleApplicantTypes": [
        "limited_income_household",
        "residential_utility_customer",
        "homeowner",
        "renter_with_owner_permission"
      ],
      "eligibleSectors": [
        "residential",
        "low_income_residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "insulation_upgrade",
        "led_lighting_retrofit",
        "water_heating_system_improvement",
        "residential_appliance_replacement",
        "residential_refrigerator_retrofit",
        "furnace_tune_up_safety_repair",
        "limited_health_safety_repair"
      ],
      "hardRequirements": [
        "Household income must meet the current limited-income threshold used by Maryland DHCD.",
        "Applicant must be served by a participating EmPOWER Maryland utility.",
        "A local agency or program provider performs an energy audit and determines eligible no-charge measures.",
        "Installed measures depend on home conditions, safety conditions and program funding."
      ],
      "blockers": [
        "Do not match commercial refrigeration or other commercial equipment to this residential limited-income program.",
        "Do not treat furnace cleaning, tuning or safety repair as a general high-efficiency furnace replacement rebate.",
        "Do not infer that every listed measure is available to every home; work must be audit-approved.",
        "Utility-specific EmPOWER programs have separate delivery rules and should not be merged without preserving eligibility limits."
      ],
      "programType": "No Cost Low Income Energy Efficiency Program",
      "administrator": "Maryland Department of Housing and Community Development",
      "applicationUrl": null,
      "websiteUrl": "https://dhcd.maryland.gov/Energy-Home-Repair/pages/homeowner-grants/empower.aspx",
      "sourceUrlsChecked": [
        "https://dhcd.maryland.gov/Energy-Home-Repair/pages/homeowner-grants/empower.aspx",
        "https://dhcd.maryland.gov/Energy-Home-Repair/Documents/EmPOWER/DHCD-Limited-Income-Program-Plan.pdf",
        "https://bgesmartenergy.com/residential/help-me-save/limited-income",
        "https://homeenergysavings.pepco.com/md/residential/income-eligible-energy-efficiency-program"
      ],
      "evidenceText": "Maryland]( DHCD and utility pages describe no-charge limited-income energy audits and improvements including insulation, lighting, hot water measures, appliance improvements, furnace service and health or safety repairs.",
      "reasoningNotes": "The original energy audit, insulation, lighting and refrigerator-related matches are supportable when restricted to audit-approved limited-income residential work. Furnace replacement should be narrowed to cleaning, tuning and safety repair unless a provider approves a specific replacement."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "high",
        "evidenceText": "Maryland EmPOWER limited-income program provides installation of efficiency measures at no charge, not a published customer rebate formula.",
        "sourceUrlsChecked": [
          "https://dhcd.maryland.gov/Energy-Home-Repair/pages/homeowner-grants/empower.aspx",
          "https://energy.maryland.gov/pages/facts/empower.aspx"
        ],
        "reasoningNotes": "No-cost service delivery should not be converted to a fixed upfront incentive amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3932",
    "opportunityName": "FirstEnergy (Potomac Edison) - Commercial and Industrial Efficiency Rebate Program",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3932/firstenergy-potomac-edison-commercial-and-industrial-efficiency-rebate-program",
    "websiteUrl": "https://www.firstenergycorp.com/save_energy/save_energy_maryland/for_your_business.html",
    "applicationUrl": "https://energysavemd-bizsolutions.com/potomac-edison/incentives/",
    "administrator": "FirstEnergy Maryland Energy Solutions for Business",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
      },
      {
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "variable frequency drive",
          "vfd"
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
          "Potomac Edison",
          "FirstEnergy Maryland"
        ],
        "notes": "Available to qualifying Potomac Edison and other FirstEnergy Maryland non-residential customers in the applicable Maryland service territory."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "government_customer",
        "institutional_customer",
        "nonprofit_customer",
        "small_business_customer",
        "non_residential_electric_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government",
        "institutional",
        "nonprofit",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "hvac_controls_retrofit",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_retrofit",
        "commercial_kitchen_foodservice_equipment",
        "motors_upgrade",
        "variable_frequency_drive_retrofit",
        "custom_energy_efficiency_project",
        "retro_commissioning_study",
        "building_tune_up"
      ],
      "hardRequirements": [
        "Applicant must be an eligible FirstEnergy Maryland non-residential electric customer.",
        "Projects must comply with the current Energy Solutions for Business incentive rules and measure requirements.",
        "Some measures, custom projects and tune-ups may require preapproval, documentation or program review.",
        "Small Business Direct Install and prescriptive incentives have separate eligibility paths and measure rules."
      ],
      "blockers": [
        "Do not match residential smart thermostat or home energy programs to this commercial and industrial opportunity.",
        "Financing listed by FirstEnergy is separate from the rebate program and should not be merged into rebate categories.",
        "Food service, refrigeration, motors and VFDs are commercial or industrial measures and should not be generalized to residential uses.",
        "Measures outside current Potomac Edison or FirstEnergy Maryland business program rules should not match."
      ],
      "programType": "Rebate Program",
      "administrator": "FirstEnergy Maryland Energy Solutions for Business",
      "applicationUrl": "https://energysavemd-bizsolutions.com/potomac-edison/incentives/",
      "websiteUrl": "https://www.firstenergycorp.com/save_energy/save_energy_maryland/for_your_business.html",
      "sourceUrlsChecked": [
        "https://www.firstenergycorp.com/save_energy/save_energy_maryland.html",
        "https://www.firstenergycorp.com/save_energy/save_energy_maryland/for_your_business.html",
        "https://energysavemd-bizsolutions.com/potomac-edison/incentives/"
      ],
      "evidenceText": "FirstEnergy]( Maryland business pages list incentives for commercial and industrial lighting, controls, HVAC, refrigeration, food service, motors, VFDs, tune-ups and custom projects.",
      "reasoningNotes": "The original heat pump, lighting controls, VFD and lighting matches are supported for non-residential customers. Smart thermostat matching should be narrowed to commercial HVAC controls rather than residential thermostat programs."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Potomac Edison business efficiency source did not expose current lighting-control or VFD values in accessible text.",
        "sourceUrlsChecked": [
          "https://energysavemd-business.com/",
          "https://www.firstenergycorp.com/save_energy/save_energy_maryland.html"
        ],
        "reasoningNotes": "No safe one-time C&I measure rule was verified.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3574",
    "opportunityName": "SMECO - Residential Energy Efficiency Rebate Program",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3574/smeco-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.smeco.coop/energy-efficiency/residential-programs/",
    "applicationUrl": null,
    "administrator": "Southern Maryland Electric Cooperative",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "automated_demand_response_controls",
        "displayName": "Automated demand response controls",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "demand response"
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MD"
        ],
        "counties": [
          "Calvert County",
          "Charles County",
          "Prince George's County",
          "St. Mary's County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Southern Maryland Electric Cooperative"
        ],
        "notes": "SMECO residential programs serve active SMECO residential members in the cooperative service area; some official pages were partially inaccessible but official search snippets and linked terms were readable."
      },
      "eligibleApplicantTypes": [
        "smeco_residential_members",
        "homeowners",
        "renters",
        "landlords"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "smart_thermostat",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "residential_refrigerator_recycling",
        "residential_freezer_recycling",
        "smart_thermostat_demand_response_enrollment"
      ],
      "hardRequirements": [
        "Applicant must be an active SMECO residential member.",
        "Heat pump water heater and smart thermostat rebates require new qualifying products, proof of purchase, serial/model information, and timely online or mailed submission.",
        "Heating and cooling instant rebates require work with SMECO-authorized contractors or distributors.",
        "Appliance recycling requires old working refrigerators or freezers to be picked up and recycled through SMECO's program.",
        "SmartTemp or Switch2Earn incentives require enrollment and connection of an eligible smart thermostat."
      ],
      "blockers": [
        "Do not match commercial refrigeration equipment; SMECO support checked here is residential appliance recycling, not commercial refrigerator or freezer replacement.",
        "Demand response support is residential smart thermostat enrollment, not broad automated demand response controls for buildings.",
        "Do not infer C&I HVAC, motors, or lighting measures from unrelated programs.",
        "Official SMECO pages were partly difficult to read directly, so unsupported extra categories were not added."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Southern Maryland Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.smeco.coop/energy-efficiency/residential-programs/",
      "sourceUrlsChecked": [
        "https://www.smeco.coop/energy-efficiency/residential-programs/",
        "https://www.smeco.coop/energy-efficiency/residential-programs/appliance-rebates/",
        "https://www.smeco.coop/energy-efficiency/residential-programs/appliance-rebates/heat-pump-water-heaters/",
        "https://www.smeco.coop/energy-efficiency/residential-programs/appliance-rebates/smart-thermostats/",
        "https://www.smeco.coop/energy-efficiency/residential-programs/appliance-recycling/",
        "https://www.smeco.coop/energy-efficiency/residential-programs/heating-cooling-rebates/",
        "https://icf-intake-docserver.sightline-icf.com/media/documents/SMECO/SMECO_AppRebate_TC.pdf"
      ],
      "evidenceText": "Official SMECO results list residential appliance rebates for heat pump water heaters and smart thermostats, appliance recycling, heating and cooling rebates, and Switch2Earn smart thermostat participation.",
      "reasoningNotes": "Confidence is medium because several SMECO pages were not fully readable directly, but official snippets and terms documents were sufficient to confirm the listed categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "SMECO residential pages show appliance and thermostat rebate paths, but exact amounts require measure selection.",
        "sourceUrlsChecked": [
          "https://www.smeco.coop/energy-efficiency/residential-programs/"
        ],
        "reasoningNotes": "The target is refrigeration; current purchase formula was not clear.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4527",
    "opportunityName": "Upper Peninsula Power Company - Residential Programs",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4527/upper-peninsula-power-company-residential-programs",
    "websiteUrl": "https://ee.uppco.com/uppco-residential-energy/",
    "applicationUrl": null,
    "administrator": "Upper Peninsula Power Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "Upper Peninsula Power Company"
        ],
        "notes": "UPPCO residential electric customers in the utility service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners",
        "renters",
        "income_qualified_households",
        "multifamily_property_owners"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "residential_energy_star_appliances",
        "residential_refrigerator_freezer_rebate",
        "residential_dishwasher_rebate",
        "residential_clothes_washer_rebate",
        "residential_clothes_dryer_rebate",
        "residential_heat_pump_clothes_dryer",
        "appliance_recycling_refrigerator_freezer",
        "led_lighting_retrofit",
        "insulation_upgrade",
        "duct_sealing",
        "low_flow_fixture_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a UPPCO residential customer for residential offerings.",
        "ENERGY STAR appliance rebates must be submitted within the calendar year of purchase and meet listed equipment specifications.",
        "Appliance recycling is limited to working residential refrigerators, freezers, dehumidifiers, mini-fridges and room air conditioners, with program quantity limits.",
        "Heat pump incentives require qualifying equipment efficiency ratings and applicable bonus criteria.",
        "Empower Program upgrades require income qualification."
      ],
      "blockers": [
        "Commercial dishwasher, commercial refrigeration and commercial laundry matches are false positives for this residential program.",
        "Room air conditioner recycling is not window replacement.",
        "Commercial and industrial accounts are excluded from the appliance recycling offer.",
        "Broad HVAC replacement should match only qualifying heat pump or listed residential equipment."
      ],
      "programType": "Rebate Program",
      "administrator": "Upper Peninsula Power Company",
      "applicationUrl": null,
      "websiteUrl": "https://ee.uppco.com/uppco-residential-energy/",
      "sourceUrlsChecked": [
        "https://ee.uppco.com/uppco-residential-energy/",
        "https://ee.uppco.com/heatpump/",
        "https://ee.uppco.com/uppco-energy-star/",
        "https://ee.uppco.com/appliance-recycling/",
        "https://ee.uppco.com/uppco-empower-program/",
        "https://ee.uppco.com/uppco-residential-energy-insights/"
      ],
      "evidenceText": "UPPCO residential pages list heat pump, ENERGY STAR appliance, appliance recycling, Empower and energy-insights offerings. Appliance recycling is residential-only; Empower adds income-qualified LED, insulation and duct-sealing measures.",
      "reasoningNotes": "Kept residential heat pumps, heat pump water heaters, ENERGY STAR appliances and income-qualified weatherization; removed commercial appliance and refrigeration interpretations."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official/current UPPCO residential measure amounts were not verified from accessible source text.",
        "sourceUrlsChecked": [
          "https://www.uppco.com/energy-efficiency/",
          "https://programs.dsireusa.org/system/program/detail/4527"
        ],
        "reasoningNotes": "Target is broad whole-building efficiency; no safe single rebate formula was found.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2541",
    "opportunityName": "Lake City Utilities - Commercial & Industrial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2541/lake-city-utilities-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/lake-city",
    "applicationUrl": null,
    "administrator": "Lake City Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "anti_sweat_heater_controls",
        "displayName": "Anti-sweat heater controls",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "anti sweat heater",
          "anti-sweat heater"
        ]
      },
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "hvac replacement"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
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
      },
      {
        "retrofitTypeId": "walk_in_cooler_freezer_upgrade",
        "displayName": "Walk-in cooler/freezer upgrade",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "cooler freezer"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [
          "Wabasha"
        ],
        "cities": [
          "Lake City"
        ],
        "utilityTerritories": [
          "Lake City Utilities"
        ],
        "notes": "Business rebates are offered through Lake City Utilities and Southern Minnesota Municipal Power Agency resources for Lake City utility customers."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "municipal_utility_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "commercial_cooling_equipment",
        "air_source_heat_pump_hvac",
        "ground_source_geothermal_heat_pump",
        "water_source_heat_pump",
        "heat_pump_hvac_retrofit",
        "commercial_hvac_controls",
        "variable_frequency_drive_retrofit",
        "high_efficiency_hvac_fans_and_clean_water_pumps",
        "commercial_refrigeration_equipment",
        "commercial_food_service_equipment",
        "vending_machine_controls",
        "guestroom_energy_management",
        "commercial_aerosol_duct_sealing",
        "premium_efficiency_motors",
        "compressed_air_equipment",
        "compressed_air_leak_repair",
        "retrocommissioning",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be a Lake City Utilities business customer.",
        "Measures must use the applicable SMMPA or Lake City business rebate forms and meet listed eligibility criteria.",
        "Custom, industrial, compressed-air, and retrocommissioning measures may require preapproval or project-specific review.",
        "Equipment must be commercial or industrial equipment where specified."
      ],
      "blockers": [
        "Do not infer residential appliances, home weatherization, or residential HVAC from this commercial and industrial program.",
        "Refrigeration should be treated as commercial refrigeration equipment, not residential refrigeration.",
        "Walk-in cooler or anti-sweat heater controls should be matched only if the current rebate form specifically supports those submeasures.",
        "Tune-ups and retrocommissioning are service or optimization measures and should not be treated as simple equipment replacement."
      ],
      "programType": "Rebate Program",
      "administrator": "Lake City Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/lake-city",
      "sourceUrlsChecked": [
        "https://www.saveenergyinlakecity.com/",
        "https://smmpa.com/members/lake-city",
        "https://www.ci.lake-city.mn.us/index.asp?DE=ECE0DA59-FB2C-4A85-BAF3-E31DB83E720D&SEC=F6B14231-8ACA-4C65-9BFE-81C8655E8120",
        "https://programs.dsireusa.org/system/program/detail/2541/lake-city-utilities-commercial-and-industrial-energy-efficiency-rebate-program"
      ],
      "evidenceText": "The current SMMPA Lake City page lists 2026 business rebates for lighting, HVAC, refrigeration, food service, guestroom controls, motors, compressed air, retrocommissioning, and custom projects.",
      "reasoningNotes": "The official current program is broad for business energy efficiency, but the target categories must remain commercial and industrial rather than residential."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Lake City/Bright Energy Solutions commercial rebates include refrigeration categories, but exact current values were not verified.",
        "sourceUrlsChecked": [
          "https://www.ci.lake-city.mn.us/utilities",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "Target includes freezer/cooler and anti-sweat controls; a current measure table is needed.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3433",
    "opportunityName": "Stearns Electric Association - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3433/stearns-electric-association-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.stearnselectric.org/save-money-and-energy/tools-and-resources/rebates-2/",
    "applicationUrl": null,
    "administrator": "Stearns Electric Association",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "mini split",
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Stearns Electric Association"
        ],
        "notes": "Available to Stearns Electric Association member-consumers where electricity is supplied by the cooperative."
      },
      "eligibleApplicantTypes": [
        "stearns_electric_member_consumers",
        "residential_members",
        "homeowners"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "ductless_air_source_heat_pump",
        "ground_source_geothermal_heat_pump",
        "dual_fuel_heating_system",
        "thermal_storage_space_heating",
        "ecm_motor_replacement",
        "heat_pump_water_heater",
        "wifi_thermostat",
        "residential_refrigerator",
        "residential_freezer",
        "residential_appliance_recycling",
        "air_conditioner_tune_up",
        "air_source_heat_pump_tune_up",
        "led_yard_light_fixture",
        "led_a19_bulb"
      ],
      "hardRequirements": [
        "Equipment must be installed where electricity is supplied by Stearns Electric Association.",
        "Rebate applications must be submitted within 90 days of purchase.",
        "EnergyWise rebates require enrollment in the associated program where applicable.",
        "Appliance rebates are for new ENERGY STAR rated appliances purchased on or after January 1, 2026.",
        "Refrigerator and freezer rebates require recycling of the old unit."
      ],
      "blockers": [
        "Do not match commercial refrigeration equipment; verified refrigerator and freezer rebates are residential ENERGY STAR appliances with old-unit recycling.",
        "Do not match broad high_efficiency_hvac_replacement; support is for listed heat pump, dual-fuel, tune-up, and thermal-storage measures.",
        "WiFi thermostat is a residential thermostat rebate, not a broad zoning or building automation category.",
        "EV charger or ChargeWise enrollment is a separate supported offering and should not be inferred into unrelated categories."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Stearns Electric Association",
      "applicationUrl": null,
      "websiteUrl": "https://www.stearnselectric.org/save-money-and-energy/tools-and-resources/rebates-2/",
      "sourceUrlsChecked": [
        "https://www.stearnselectric.org/save-money-and-energy/tools-and-resources/rebates-2/",
        "https://www.stearnselectric.org/wp-content/uploads/2026/01/SEA_RebatesInsert2026_web.pdf",
        "https://www.stearnselectric.org/save-money-and-energy/energystar-rebates/residential-appliance-rebates/",
        "https://www.stearnselectric.org/save-money-and-energy/energywise-rebates/heating-and-cooling-rebates/",
        "https://www.stearnselectric.org/save-money-and-energy/heating-and-cooling/smart-thermostats/"
      ],
      "evidenceText": "Stearns Electric's 2026 residential rebate materials list air-source, ductless, ground-source, dual-fuel, water-heating, WiFi thermostat, appliance, tune-up, and limited LED lighting rebates for member-consumers.",
      "reasoningNotes": "Narrowed appliance and refrigeration matches to residential ENERGY STAR products and retained EnergyWise enrollment requirements."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Stearns residential rebates include heat pump, geothermal, water-heating, thermostat and appliance measures, but exact current target value was not selected.",
        "sourceUrlsChecked": [
          "https://www.stearnselectric.org/rebates/"
        ],
        "reasoningNotes": "Target is refrigeration-electric efficiency despite HVAC matched terms; a current measure table should be reviewed.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3320",
    "opportunityName": "Four-County EMC - Residential Energy Efficiency Rebate Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3320/four-county-emc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.fourcty.org/energy-efficiency/rebates/",
    "applicationUrl": null,
    "administrator": "Four County EMC",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 6,
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Four County EMC"
        ],
        "notes": "Available to qualifying Four County EMC residential members in the cooperative's North Carolina electric service area."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "residential_electric_customer",
        "homeowner",
        "authorized_account_holder"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "residential_refrigerator",
        "residential_freezer",
        "residential_dishwasher",
        "residential_clothes_washer"
      ],
      "hardRequirements": [
        "Applicant must be a Four County EMC member for eligible residential rebates.",
        "Heat pump equipment must meet the program's current efficiency requirements.",
        "Heat pump water heater rebates require qualifying ENERGY STAR equipment and primary-residence eligibility where specified.",
        "Appliance rebates are limited to qualifying ENERGY STAR residential appliances and proof of purchase."
      ],
      "blockers": [
        "Official detail pages were partially inaccessible, so do not add measures beyond the current official snippets and clearly verified residential appliance categories.",
        "Do not match high-efficiency commercial dishwasher to this residential ENERGY STAR dishwasher rebate.",
        "Do not match commercial refrigeration, commercial laundry or commercial kitchen equipment.",
        "Vacation homes or non-primary residences may be ineligible for heat pump water heater rebates."
      ],
      "programType": "Rebate Program",
      "administrator": "Four County EMC",
      "applicationUrl": null,
      "websiteUrl": "https://www.fourcty.org/energy-efficiency/rebates/",
      "sourceUrlsChecked": [
        "https://www.fourcty.org/energy-efficiency/rebates/",
        "https://www.fourcty.org/faqs/heat-pump-water-heater-rebate/",
        "https://www.fourcty.org/faqs/heat-pump-rebates-2/",
        "https://www.fourcty.org/faqs/energy-star-appliance-rebate-program/"
      ],
      "evidenceText": "Current]( Four County EMC pages identify member rebates for heat pumps, heat pump water heaters and qualifying ENERGY STAR residential appliances such as refrigerators, dishwashers, clothes washers and freezers.",
      "reasoningNotes": "The heat pump and heat pump water heater matches are supported. Dishwasher, laundry and refrigeration matches must be narrowed to residential appliances, not commercial kitchen, commercial laundry or commercial refrigeration retrofit categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Four-County EMC rebate materials include multiple residential energy measures, but no current whole-building formula was verified.",
        "sourceUrlsChecked": [
          "https://www.fourcty.org/energy-efficiency/rebates/"
        ],
        "reasoningNotes": "Target is broad whole-building custom efficiency; a measure-specific value should be extracted.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3467",
    "opportunityName": "Lumbee River EMC - Residential Energy Efficiency Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3467/lumbee-river-emc-residential-energy-efficiency-program",
    "websiteUrl": "https://www.lumbeeriver.com/rebate-programs",
    "applicationUrl": null,
    "administrator": "Lumbee River Electric Membership Corporation",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "air sealing",
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
          "duct sealing",
          "duct insulation"
        ]
      },
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
          "NC"
        ],
        "counties": [
          "Cumberland County",
          "Hoke County",
          "Robeson County",
          "Moore County",
          "Scotland County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Lumbee River EMC service territory"
        ],
        "notes": "Applies only to Lumbee River EMC residential member accounts in its North Carolina service territory."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "electric_cooperative_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "window_replacement",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_water_heater",
        "variable_speed_pool_pump",
        "smart_thermostat"
      ],
      "hardRequirements": [
        "Applicant must be the active residential member of record.",
        "Heating and cooling rebates require current equipment and replacement equipment to meet program efficiency rules.",
        "Weatherization rebates require electric heating source where specified.",
        "Program limits, inspection rights and rebate caps apply by account and measure."
      ],
      "blockers": [
        "Do not match commercial or industrial retrofit categories to this residential program.",
        "Weatherization should be limited to the listed insulation, air sealing and duct measures, not broad remodeling.",
        "HVAC replacements must meet the program's old-equipment and new-efficiency requirements."
      ],
      "programType": "Rebate Program",
      "administrator": "Lumbee River Electric Membership Corporation",
      "applicationUrl": null,
      "websiteUrl": "https://www.lumbeeriver.com/rebate-programs",
      "sourceUrlsChecked": [
        "https://www.lumbeeriver.com/rebate-programs",
        "https://www.lumbeeriver.com/sites/lumbeeriver/files/documents/2020-Weatherization-Rebate.pdf",
        "https://www.lumbeeriver.com/sites/default/files/documents/Heating-and-Cooling-Rebate-flyer%20update.pdf",
        "https://programs.dsireusa.org/system/program/detail/3467/lumbee-river-emc-residential-energy-efficiency-program"
      ],
      "evidenceText": "Lumbee River EMC lists residential rebates for heat pumps, cooling systems, weatherization, windows, heat pump water heaters, pool pumps and smart thermostats.",
      "reasoningNotes": "Official current page supports the target weatherization, duct, geothermal and heat-pump categories; residential limits are explicit."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Official Lumbee River page confirms heat pump, cooling and weatherization rebates but does not expose exact amounts in accessible text.",
        "sourceUrlsChecked": [
          "https://www.lumbeeriver.com/rebate-programs"
        ],
        "reasoningNotes": "No official current measure table was verified for heat pump or weatherization amounts.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22040",
    "opportunityName": "El Paso Electric Company - Low-Income Residential Program",
    "state": "NM",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22040/el-paso-electric-company-low-income-residential-program",
    "websiteUrl": "https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs/residential-low-income",
    "applicationUrl": null,
    "administrator": "El Paso Electric Company",
    "programType": "Direct Install Low Income Energy Efficiency Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "air sealing"
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
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
          "low flow"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "NM"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "El Paso Electric New Mexico service territory"
        ],
        "notes": "Available to qualifying low-income residential El Paso Electric customers in New Mexico."
      },
      "eligibleApplicantTypes": [
        "low_income_residential_customer",
        "homeowner",
        "renter_with_owner_permission",
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential",
        "low_income_residential"
      ],
      "eligibleRetrofitCategories": [
        "evaporative_cooler_replacement",
        "advanced_power_strip",
        "led_lighting_retrofit",
        "smart_thermostat_zoning_retrofit",
        "attic_insulation",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "water_heater_pipe_tank_insulation",
        "low_flow_showerhead",
        "faucet_aerator"
      ],
      "hardRequirements": [
        "Customer must qualify under the program's low-income eligibility rules for New Mexico residential customers.",
        "Measures are provided through the residential low-income program and may vary by home, cooling system and heating system.",
        "Installation is generally no-cost direct installation rather than a customer rebate.",
        "Home must be in El Paso Electric's applicable New Mexico service area."
      ],
      "blockers": [
        "Do not match commercial refrigeration or broad commercial equipment to this residential low-income program.",
        "No current official New Mexico page verified refrigerator replacement for this opportunity.",
        "Low-flow matches must be limited to high-efficiency showerheads and faucet aerators, not broad plumbing retrofits.",
        "Do not infer broad HVAC replacement beyond listed evaporative cooler, thermostat and duct measures."
      ],
      "programType": "Direct Install Low Income Energy Efficiency Program",
      "administrator": "El Paso Electric Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs/residential-low-income",
      "sourceUrlsChecked": [
        "https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs/residential-low-income",
        "https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs",
        "https://www.epelectric.com/residential/customer-programs/energy-efficiency-programs",
        "https://www.epelectric.com/el-paso-electric/uploads/energy-efficiency/59166_9_1614919_filed-040126.pdf"
      ],
      "evidenceText": "El]( Paso Electric's New Mexico low-income page lists no-cost improvements including LED lighting, smart thermostats, attic insulation, air sealing, duct sealing, water-heater insulation, showerheads and faucet aerators.",
      "reasoningNotes": "The original LED, air sealing, duct sealing, insulation and low-flow matches are supported when limited to low-income residential direct-install measures. Refrigeration should be removed because current official New Mexico sources did not verify refrigerator replacement."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Low-income residential program provides direct-install or assistance measures rather than a customer project rebate formula.",
        "sourceUrlsChecked": [
          "https://www.epelectric.com/energy-efficiency/new-mexico-residential-energy-efficiency-programs"
        ],
        "reasoningNotes": "Assistance/direct-install programs should not be modeled as direct upfront incentives.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3464",
    "opportunityName": "RG&E - Smart Energy Residential Efficiency Rebate Programs",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3464/rg-and-e-smart-energy-residential-efficiency-rebate-programs",
    "websiteUrl": "https://www.rge.com/residential-rebates-and-programs",
    "applicationUrl": null,
    "administrator": "RG&E",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 6,
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
      },
      {
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigerator"
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
      "confidence": "medium",
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
          "RG&E natural gas service territory where applicable"
        ],
        "notes": "The current RG&E residential rebates page is a program hub. Specific measure eligibility depends on the relevant NYS Clean Heat, insulation and air sealing, smart thermostat rewards, marketplace, EmPower+, or energy storage pathway."
      },
      "eligibleApplicantTypes": [
        "RG&E residential customers",
        "homeowners",
        "renters with owner approval where applicable",
        "income-eligible residential customers",
        "participating contractors where required",
        "smart thermostat demand-response participants",
        "residential energy storage customers where eligible"
      ],
      "eligibleSectors": [
        "residential",
        "income-qualified residential",
        "demand response",
        "residential energy storage"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "smart_thermostat_zoning_retrofit",
        "battery_storage_system"
      ],
      "hardRequirements": [
        "Customer must be served by RG&E and meet the relevant program pathway rules.",
        "Heat pump incentives are under the NYS Clean Heat pathway and require qualifying equipment and participating contractor or program documentation where applicable.",
        "Insulation and air sealing incentives require applicable home energy or weatherization program requirements.",
        "Smart thermostat rewards are a demand-response or enrollment pathway, not necessarily an upfront equipment rebate.",
        "Energy storage support is a separate Energy Storage Solutions pathway and requires separate eligibility and interconnection/program compliance."
      ],
      "blockers": [
        "high_efficiency_furnace_retrofit and high_efficiency_boiler_retrofit are not supported by the current accessible RG&E residential program hub reviewed for this record.",
        "high_efficiency_refrigeration_equipment and induction_cooking_equipment were not verified from current official RG&E residential sources and should not be matched from generic marketplace or old snippets alone.",
        "Smart thermostat matches should be flagged as demand-response or rewards participation unless a current equipment rebate source is separately verified.",
        "Battery storage is a separate Energy Storage Solutions pathway and should not be matched as a general efficiency rebate.",
        "Do not infer current gas equipment rebates from DSIRE or old snippets when the current official hub emphasizes NYS Clean Heat, insulation and air sealing, rewards, EmPower+, and storage programs."
      ],
      "programType": "Rebate Program",
      "administrator": "RG&E",
      "applicationUrl": null,
      "websiteUrl": "https://www.rge.com/residential-rebates-and-programs",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/3464/rg-and-e-smart-energy-residential-efficiency-rebate-programs",
        "https://www.rge.com/residential-rebates-and-programs",
        "https://www.rge.com/smartenergy"
      ],
      "evidenceText": "The current RG&E residential rebates and programs hub lists NYS Clean Heat, insulation and air sealing rebates, Smart Savings Rewards thermostat participation, EmPower+, Smart Solutions marketplace, and Energy Storage Solutions. Current accessible support was not sufficient to verify furnace, boiler, refrigerator, or induction equipment rebates.",
      "reasoningNotes": "Confidence is medium because the official hub is current but route-specific program pages must be used for final technical details. The repair blocks unsupported furnace, boiler, refrigerator, and induction matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "RG&E residential materials did not expose a current motor/VFD or matched equipment amount for this target.",
        "sourceUrlsChecked": [
          "https://www.rge.com/smartenergy/rebatesandprograms",
          "https://programs.dsireusa.org/system/program/detail/3464"
        ],
        "reasoningNotes": "Matched terms are residential appliances and gas equipment, not a clear motor efficiency formula.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4565",
    "opportunityName": "OG&E - Residential Energy Efficiency Program",
    "state": "OK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4565/og-and-e-residential-energy-efficiency-program",
    "websiteUrl": "https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/rebates",
    "applicationUrl": null,
    "administrator": "OG&E",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "exterior_door_replacement",
        "displayName": "Exterior door replacement",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "door replacement"
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
          "OK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "OG&E Oklahoma"
        ],
        "notes": "This repair uses the Oklahoma residential rebate tab for OG&E customers; Arkansas measures are separate and should not be inferred for Oklahoma."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "attic_insulation_upgrade",
        "energy_star_window_replacement",
        "energy_star_exterior_door_replacement",
        "energy_star_smart_thermostat",
        "hvac_burnout_replacement",
        "air_sealing_weatherization",
        "duct_sealing_and_repair"
      ],
      "hardRequirements": [
        "Applicant must be an eligible OG&E residential customer.",
        "Renters need landlord approval where direct-install or home improvement services are provided.",
        "Oklahoma rebate measures must follow the Oklahoma rebate tab and applicable program requirements.",
        "Income-qualified upgrades are subject to program qualification and limits.",
        "Equipment or envelope products must meet the listed ENERGY STAR or program criteria."
      ],
      "blockers": [
        "Level 2 EV charging is part of OG&E electric vehicle information or a separate offering and was not verified as part of this residential efficiency rebate target.",
        "Do not use Arkansas-tab measures to match Oklahoma customers unless the opportunity is explicitly repaired for Arkansas.",
        "HVAC burnout replacement is not a general HVAC upgrade rebate.",
        "HVAC tune-ups are service measures and should not be treated as physical retrofit categories unless separately modeled."
      ],
      "programType": "Rebate Program",
      "administrator": "OG&E",
      "applicationUrl": null,
      "websiteUrl": "https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/rebates",
      "sourceUrlsChecked": [
        "https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/rebates",
        "https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/residential-energy-efficiency",
        "https://www.oge.com/web/portal/label_ord/energy-solutions/electricvehicles",
        "https://programs.dsireusa.org/system/program/detail/4565/og-and-e-residential-energy-efficiency-program"
      ],
      "evidenceText": "OG&E's Oklahoma residential rebate page lists attic insulation, ENERGY STAR windows and doors, ENERGY STAR smart thermostats, and HVAC burnout replacement, with separate residential efficiency services.",
      "reasoningNotes": "The envelope and thermostat matches are supported for Oklahoma. EV charging should be blocked for this opportunity because it belongs to a separate EV information or rebate context."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official OG&E residential pages checked did not expose a current Level 2 EV charger rebate amount.",
        "sourceUrlsChecked": [
          "https://www.oge.com/web/portal/label_ord/energy-solutions/electricvehicles",
          "https://www.oge.com/web/portal/label_ord/energy-solutions/efficiency-programs/rebates"
        ],
        "reasoningNotes": "Third-party sources mention an EV charger rebate, but no official calculable formula was verified.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3590",
    "opportunityName": "Oklahoma Electric Cooperative - Energy Efficiency Rebate Program",
    "state": "OK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3590/oklahoma-electric-cooperative-energy-efficiency-rebate-program",
    "websiteUrl": "https://okcoop.org/rebates/",
    "applicationUrl": null,
    "administrator": "Oklahoma Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
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
          "OK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Oklahoma Electric Cooperative"
        ],
        "notes": "Available exclusively to Oklahoma Electric Cooperative electric members in the cooperative service territory."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "electric_cooperative_member",
        "small_commercial_customer",
        "school",
        "nonprofit"
      ],
      "eligibleSectors": [
        "residential",
        "small_commercial",
        "education",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "modulating_dual_fuel_heat_pump_new_construction",
        "ductless_mini_split_heat_pump",
        "new_home_led_lighting_bundle",
        "water_heater_timer",
        "level_2_ev_charger_installation",
        "ground_source_geothermal_heat_pump",
        "programmable_thermostat",
        "gas_heat_to_dual_fuel_heat_pump_conversion",
        "electric_resistance_to_ductless_mini_split_conversion",
        "small_commercial_led_lighting_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be an OEC electric member, not only an OEC Fiber customer.",
        "All rebates are subject to OEC verification and funding availability.",
        "New home rebates require homes permitted within the stated recent-construction period.",
        "EV charger rebate requires Level 2 charging and scheduled off-peak charging as specified.",
        "Ductless mini-split and heat-pump conversion rebates must meet backup-heating and efficiency requirements.",
        "Small commercial LED conversion is prioritized for schools and nonprofits and has account caps."
      ],
      "blockers": [
        "Do not match broad residential LED lighting retrofit except as part of the new-home bundle or eligible small-commercial conversion.",
        "Do not match generic EV charging; only qualifying Level 2 charging with the required schedule is supported.",
        "Ductless mini-split conversions with electric resistance backup do not qualify.",
        "Home energy consultation is an audit or service and not a physical retrofit category.",
        "OEC Fiber-only customers using another electric provider are not eligible."
      ],
      "programType": "Rebate Program",
      "administrator": "Oklahoma Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://okcoop.org/rebates/",
      "sourceUrlsChecked": [
        "https://okcoop.org/rebates/",
        "https://okcoop.org/wp-content/uploads/2025/07/2025-Rebate-Program-Proposal-for-website.pdf",
        "https://programs.dsireusa.org/system/program/detail/3590/oklahoma-electric-cooperative-energy-efficiency-rebate-program"
      ],
      "evidenceText": "OEC's rebate materials list member-only incentives for geothermal, Level 2 EV charging, water-heater timers, programmable thermostats, heat-pump conversions, new-home measures, and small commercial LED conversions.",
      "reasoningNotes": "Most target categories are supported only with narrow OEC-specific conditions. LED and EV matches need strict program-boundary handling."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Oklahoma Electric source did not verify a current Level 2 charger or geothermal rule in accessible text.",
        "sourceUrlsChecked": [
          "https://okcoop.org/energy-efficiency-rebates/"
        ],
        "reasoningNotes": "No source-backed EV charging rule was found.",
        "originalGapReason": "source_text_unavailable",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2489",
    "opportunityName": "Douglas Electric Cooperative - Residential Energy Efficiency Rebate Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2489/douglas-electric-cooperative-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.dec.coop/energy-efficiency/rebate-programs/",
    "applicationUrl": null,
    "administrator": "Douglas Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 6,
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
        "cities": [],
        "utilityTerritories": [
          "Douglas Electric Cooperative"
        ],
        "notes": "Available to qualifying Douglas Electric Cooperative residential members in the cooperative's Oregon electric service territory."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "residential_electric_customer",
        "homeowner",
        "authorized_account_holder"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a qualifying Douglas Electric Cooperative residential member.",
        "Measure-specific rules apply for ductless heat pumps, air-source heat pumps, heat pump water heaters, insulation and smart thermostats.",
        "Smart thermostat eligibility is limited to qualifying ducted air-source heat pump configurations with electric forced-air furnace backup."
      ],
      "blockers": [
        "Official detail pages were partially inaccessible, so unsupported measures beyond current official page snippets should not be added.",
        "Do not infer broad weatherization or air sealing when only insulation is verified from current sources.",
        "Do not infer commercial, industrial, refrigeration, motors or appliance measures from this residential cooperative program.",
        "Variable-speed heat pump systems should not be matched to the smart thermostat rebate where the official program excludes them."
      ],
      "programType": "Rebate Program",
      "administrator": "Douglas Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.dec.coop/energy-efficiency/rebate-programs/",
      "sourceUrlsChecked": [
        "https://www.dec.coop/energy-efficiency/rebate-programs/",
        "https://www.dec.coop/energy-efficiency/rebate-programs/ductless-heat-pump/",
        "https://www.dec.coop/energy-efficiency/rebate-programs/heat-pump-water-heater/",
        "https://www.dec.coop/energy-efficiency/rebate-programs/insulation/",
        "https://www.dec.coop/energy-efficiency/rebate-programs/air-source-heat-pump/",
        "https://www.dec.coop/energy-efficiency/rebate-programs/smart-thermostat/"
      ],
      "evidenceText": "Current]( Douglas Electric rebate pages identify residential incentives for ductless heat pumps, air-source heat pumps, heat pump water heaters, insulation and smart thermostats.",
      "reasoningNotes": "The official site was difficult to read directly, but current official page snippets consistently support a narrow residential measure set. Weatherization should be limited to insulation unless a current program document verifies air sealing."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Douglas Electric lists rebate programs, but exact current values were not exposed.",
        "sourceUrlsChecked": [
          "https://www.dec.coop/energy-efficiency/rebate-programs/"
        ],
        "reasoningNotes": "No source-backed rule verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2138",
    "opportunityName": "Emerald PUD - Commercial and Industrial Energy Efficiency Rebate Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2138/emerald-pud-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.epud.org/energy-efficiency/energy-incentive-programs/",
    "applicationUrl": null,
    "administrator": "Emerald People's Utility District",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "efficient_air_compressor",
        "displayName": "Efficient air compressor",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air compressor"
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
        "counties": [
          "Lane County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Emerald People's Utility District"
        ],
        "notes": "Applies to qualifying EPUD non-residential customers in the Oregon utility service area."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "non_residential_electric_customer",
        "business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "window_replacement",
        "insulation_upgrade",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "custom_energy_efficiency_project",
        "agricultural_lighting_efficiency",
        "industrial_lighting_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be a qualifying EPUD non-residential customer.",
        "Commercial, industrial, and agricultural incentives must meet current EPUD and Bonneville Power Administration measure rules.",
        "Lighting incentives may require use of BPA or EPUD calculators.",
        "Some projects may require utility coordination, contractor participation, or preapproval."
      ],
      "blockers": [
        "Do not infer residential insulation, residential weatherization, or residential appliances from this commercial and industrial program.",
        "Do not match refrigeration or compressed air without current EPUD measure confirmation.",
        "Do not match heat pumps beyond EPUD-supported commercial heating and cooling measures.",
        "Renewable energy and EV programs are separate unless independently verified."
      ],
      "programType": "Rebate Program",
      "administrator": "Emerald People's Utility District",
      "applicationUrl": null,
      "websiteUrl": "https://www.epud.org/energy-efficiency/energy-incentive-programs/",
      "sourceUrlsChecked": [
        "https://www.epud.org/energy-efficiency/energy-incentive-programs/",
        "https://www.epud.org/energy-efficiency/energy-incentive-programs/commercial-incentive-programs/",
        "https://www.epud.org/energy-efficiency/energy-incentive-programs/industrial-incentive-programs/",
        "https://www.epud.org/energy-efficiency/energy-incentive-programs/agricultural-incentive-programs/"
      ],
      "evidenceText": "EPUD official snippets identify commercial windows, heating and cooling, lighting upgrades, insulation, custom projects, and BPA-based industrial or agricultural lighting incentives.",
      "reasoningNotes": "Official snippets are stronger than prior access-limited evidence. Confidence rises to medium, while unsupported air compressor and refrigeration categories remain blocked."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Emerald PUD commercial/industrial program page lists incentive categories but no refrigeration values were verified.",
        "sourceUrlsChecked": [
          "https://www.epud.org/energy-efficiency/energy-incentive-programs/"
        ],
        "reasoningNotes": "Target refrigeration measures require a current commercial application table.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5068",
    "opportunityName": "Philadelphia Gas Works - Commercial and Industrial Equipment Rebate Program",
    "state": "PA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5068/philadelphia-gas-works-commercial-and-industrial-equipment-rebate-program",
    "websiteUrl": "https://pgwenergysense.com/commercial-rebates/",
    "applicationUrl": null,
    "administrator": "Philadelphia Gas Works",
    "programType": "Commercial And Industrial Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "heat pump"
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
        "retrofitTypeId": "high_efficiency_fryer",
        "displayName": "High-efficiency fryer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fryer"
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
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "low flow",
          "aerator",
          "showerhead"
        ]
      },
      {
        "retrofitTypeId": "steam_trap_replacement",
        "displayName": "Steam trap replacement",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "steam trap"
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
          "Philadelphia Gas Works"
        ],
        "notes": "Rebates are only for premises served by PGW firm natural gas rates."
      },
      "eligibleApplicantTypes": [
        "pgw_firm_rate_commercial_customers",
        "business_owners",
        "building_owners",
        "multifamily_property_owners",
        "industrial_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_gas_boiler",
        "commercial_gas_water_heater",
        "commercial_vrf_heat_pump",
        "low_flow_showerhead",
        "low_flow_faucet_aerator",
        "boiler_reset_controls",
        "steam_trap_replacement",
        "high_efficiency_gas_fryer",
        "commercial_gas_steam_cooker",
        "roof_insulation"
      ],
      "hardRequirements": [
        "Customer must be a PGW firm-rate natural gas customer.",
        "EnergySense commercial rebates are available for qualified installations from 09/01/2024 through 08/31/2027, subject to available funds.",
        "Low-flow showerhead and faucet aerator rebates are retrofit-only and require a minimum of 10 units per project.",
        "Steam trap and roof insulation rebates are retrofit-only; roof insulation must meet the listed finished R-value and documentation requirements.",
        "Applications must include invoices, PGW bill, and AHRI, ENERGY STAR, or manufacturer specifications as applicable."
      ],
      "blockers": [
        "Do not match residential appliance or home weatherization categories to this commercial and industrial PGW program.",
        "Low-flow support is limited to showerheads and faucet aerators, not broad plumbing retrofits.",
        "Steam traps are steam-system distribution measures, not compressed-air equipment.",
        "Heat pump support is limited to commercial VRF heat pumps listed by PGW, not general residential heat pump HVAC."
      ],
      "programType": "Commercial And Industrial Rebate Program",
      "administrator": "Philadelphia Gas Works",
      "applicationUrl": null,
      "websiteUrl": "https://pgwenergysense.com/commercial-rebates/",
      "sourceUrlsChecked": [
        "https://pgwenergysense.com/commercial-rebates/",
        "https://pgwenergysense.com/program-updates/",
        "https://www.pgworks.com/customer-care/efficiency"
      ],
      "evidenceText": "PGW EnergySense commercial rebates cover firm-rate natural gas premises with measures such as boilers, commercial water heaters, VRF heat pumps, low-flow devices, steam traps, roof insulation, and ENERGY STAR gas fryers or steam cookers.",
      "reasoningNotes": "Matched only C&I natural-gas and retrofit measures supported by PGW, with product-specific treatment for low-flow devices and steam traps."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "PGW confirms commercial equipment rebates through 08/31/2027, but measure values require current table selection.",
        "sourceUrlsChecked": [
          "https://pgwenergysense.com/commercial-rebates/"
        ],
        "reasoningNotes": "Target has too many possible measures.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3606",
    "opportunityName": "Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program",
    "state": "SC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3606/duke-energy-carolinas-non-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.duke-energy.com/business/products/smartsaver",
    "applicationUrl": null,
    "administrator": "Duke Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "refrigeration"
        ]
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
          "SC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Duke Energy Carolinas"
        ],
        "notes": "Applies to qualifying non-residential Duke Energy Carolinas customers in South Carolina where Smart Saver business incentives are offered."
      },
      "eligibleApplicantTypes": [
        "non_residential_electric_customer",
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "school",
        "institutional_customer",
        "agricultural_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "agricultural",
        "education",
        "government"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "hvac_controls_retrofit",
        "commercial_chiller_retrofit",
        "insulation_upgrade",
        "high_efficiency_commercial_dishwasher",
        "commercial_kitchen_foodservice_equipment",
        "high_efficiency_refrigeration_equipment",
        "variable_frequency_drive_retrofit",
        "efficient_air_compressor",
        "efficient_pumps",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Duke Energy Carolinas non-residential customer in the applicable service territory.",
        "Incentives are subject to current Smart Saver measure requirements and funding availability.",
        "Custom and some prescriptive projects may require Duke Energy review or preapproval before purchase or installation.",
        "Measures must be installed at a qualifying business, school or other non-residential facility."
      ],
      "blockers": [
        "Do not infer residential appliances, home weatherization or residential HVAC measures from this non-residential program.",
        "Building envelope matches should be limited to current non-residential measure sheets and not generalized to all insulation projects.",
        "Solar, renewable generation, EV charging and demand response are separate programs unless explicitly included in current Smart Saver documentation.",
        "Official Smart Saver pages were partially access-restricted, so measure-level matches should remain conservative."
      ],
      "programType": "Rebate Program",
      "administrator": "Duke Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.duke-energy.com/business/products/smartsaver",
      "sourceUrlsChecked": [
        "https://www.duke-energy.com/business/products/smartsaver",
        "https://www.duke-energy.com/business/products/smartsaver/hvac-incentives",
        "https://www.duke-energy.com/business/products/smartsaver/commercial-equipment",
        "https://www.duke-energy.com/business/products/smartsaver/chiller"
      ],
      "evidenceText": "Duke]( Energy Smart Saver business pages identify cash incentives for business facilities, including HVAC, commercial equipment, chillers, lighting, pumps, food service and process equipment.",
      "reasoningNotes": "The non-residential program supports commercial HVAC, lighting, controls, refrigeration, food service, drives, pumps, compressed air and custom efficiency categories. The original insulation match is plausible only as a business envelope measure and should not be treated as residential weatherization."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "Duke Smart $aver business page required JavaScript and did not expose measure tables to source text.",
        "sourceUrlsChecked": [
          "https://www.duke-energy.com/business/products/smartsaver"
        ],
        "reasoningNotes": "No official refrigeration, insulation, or dishwasher formula was accessible.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
