You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 6
Targets in this prompt: 101-120 of 984
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
  "batchNumber": 6,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3029"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2259",
    "opportunityName": "Dakota Electric Association - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2259/dakota-electric-association-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.dakotaelectric.com/member-services/programs-rebates/for-your-home/energy-wise-rebates/",
    "applicationUrl": "https://www.dakotaelectric.com/member-services/programs-rebates/for-your-home/energy-wise-rebates/",
    "administrator": "Dakota Electric Association",
    "programType": "Residential Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "efficient_fan_blower_replacement",
        "displayName": "Efficient fan/blower replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "blower"
        ]
      },
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
          "ground source heat pump",
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
          "MN"
        ],
        "counties": [
          "Dakota County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Dakota Electric Association residential electric service territory"
        ],
        "notes": "Applies to eligible residential Dakota Electric members; EV, water-heating, and load-management incentives may require specific meters or rates."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner",
        "participating_contractor"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ev_charging_circuit_installation",
        "level_2_ev_charger_installation",
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump",
        "ductless_heat_pump",
        "central_air_conditioner_replacement",
        "heat_pump_water_heater",
        "electric_water_heater_load_management",
        "residential_led_lighting",
        "refrigerator_freezer_recycling",
        "high_efficiency_electric_clothes_dryer",
        "dehumidifier_rebate",
        "hvac_tune_up"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Dakota Electric residential member.",
        "EV charging incentives require qualifying Level 2 charging circuit or equipment and applicable metering or program requirements.",
        "Water heating and load management incentives must meet Dakota Electric program and rate requirements.",
        "HVAC equipment must meet listed efficiency standards and installation documentation requirements."
      ],
      "blockers": [
        "Efficient fan or blower replacement is not a standalone supported category in current residential materials.",
        "Refrigerator and freezer references are appliance rebates or recycling, not commercial refrigeration equipment.",
        "Generic EV charger matches should be narrowed to Level 2 residential charging circuit or equipment requirements.",
        "Do not infer commercial, industrial, or motor-drive measures from this residential rebate program."
      ],
      "programType": "Residential Rebate",
      "administrator": "Dakota Electric Association",
      "applicationUrl": "https://www.dakotaelectric.com/member-services/programs-rebates/for-your-home/energy-wise-rebates/",
      "websiteUrl": "https://www.dakotaelectric.com/member-services/programs-rebates/for-your-home/energy-wise-rebates/",
      "sourceUrlsChecked": [
        "https://www.dakotaelectric.com/member-services/programs-rebates/for-your-home/energy-wise-rebates/",
        "https://www.dakotaelectric.com/2026/02/27/2026-rebates/",
        "https://www.dakotaelectric.com/wp-content/uploads/2026/02/Circ_0326.pdf",
        "https://www.dakotaelectric.com/wp-content/uploads/2024/05/Electric-Vehicle-Packet_0426_NEW-RATES.pdf"
      ],
      "evidenceText": "Dakota Electric 2026 materials list EV charging, ground-source and air-source heat pumps, ductless heat pumps, central AC, heat pump water heaters, LEDs, appliance recycling, and tune-ups.",
      "reasoningNotes": "Retained current residential member measures and blocked false-positive fan/blower and commercial refrigeration matches. Narrowed EV matching to Level 2 circuit or equipment requirements."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2f53722e6cb29266_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 50000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $500 toward installation of an eligible EV charger",
        "evidenceText": "Dakota Electric says members can get up to $500 toward installing an EV charger on the metered charging program.",
        "sourceUrlsChecked": [
          "https://www.dakotaelectric.com/electric-vehicles/",
          "https://www.dakotaelectric.com/residential/programs-rebates/"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms. Source uses up to, so amount depends on installed cost and program eligibility.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2552",
    "opportunityName": "Preston Public Utilities - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2552/preston-public-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/preston",
    "applicationUrl": "https://smmpa.com/members/preston",
    "administrator": "Preston Public Utilities",
    "programType": "Residential Rebate Program Through SMMPA",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
    "targetKind": "existing_simple_rule_v2_repair",
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner"
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
          "MN"
        ],
        "counties": [
          "Fillmore County"
        ],
        "cities": [
          "Preston"
        ],
        "utilityTerritories": [
          "Preston Public Utilities"
        ],
        "notes": "Restricted to Preston Public Utilities residential electric customers participating through SMMPA rebate forms."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_energy_star_appliances",
        "residential_dishwasher",
        "residential_clothes_washer",
        "heat_pump_clothes_dryer",
        "residential_refrigerator_freezer_rebate",
        "room_air_conditioner",
        "central_air_conditioner_replacement",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "level_2_ev_charger_installation",
        "cooling_tune_up",
        "ecm_circulator_pump",
        "efficient_fan_blower_replacement",
        "efficient_pool_pump",
        "aerosol_duct_sealing"
      ],
      "hardRequirements": [
        "Applicant must be a Preston Public Utilities residential electric customer.",
        "Use the current SMMPA 2026 residential form for each applicable product or measure.",
        "ENERGY STAR product, EV charger, cooling equipment, tune-up, circulator pump, furnace fan motor, pool pump, and aerosol sealing forms have separate documentation requirements.",
        "Receipts, model numbers, product qualifications, and utility account information are required where specified."
      ],
      "blockers": [
        "Commercial dishwashers, commercial refrigeration, food-service equipment, motors, compressed air, VSDs, commercial LED lighting, and ground-source heat pumps are under SMMPA Business Rebates, not this residential opportunity.",
        "Furnace fan motor is not a furnace replacement rebate.",
        "ENERGY STAR product rebates are residential product-specific and should not be generalized to commercial kitchen or refrigeration equipment.",
        "EV charger support is limited to the ENERGY STAR EV charger form and should not be treated as EV purchase support."
      ],
      "programType": "Residential Rebate Program Through SMMPA",
      "administrator": "Preston Public Utilities",
      "applicationUrl": "https://smmpa.com/members/preston",
      "websiteUrl": "https://smmpa.com/members/preston",
      "sourceUrlsChecked": [
        "https://smmpa.com/members/preston",
        "https://programs.dsireusa.org/system/program/detail/2552/preston-public-utilities-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "SMMPA lists 2026 Preston residential forms for ENERGY STAR products, EV chargers, cooling equipment, tune-ups, ECM circulator pumps, furnace fan motors, pool pumps, and aerosol sealing.",
      "reasoningNotes": "The repair keeps residential SMMPA categories and blocks business-only lighting, refrigeration, food service, motors, compressed air, VSD, and geothermal categories. DSIRE was used only as a clue for residential appliance details."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3f47b495a649eeee_v1",
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
        "formula": "$500 per connected ChargePoint Home Flex Level 2 charger",
        "evidenceText": "Bright Energy Solutions 2026 EV charger form lists ChargePoint Home Flex connected charger at $500.",
        "sourceUrlsChecked": [
          "https://smmpa.com/members/preston",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms. Confidence is medium because Bright Energy Solutions participation can vary by utility.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2590",
    "opportunityName": "Waseca Utilities - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2590/waseca-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ci.waseca.mn.us/1435/Electric-Utility-Rebates",
    "applicationUrl": "https://www.ci.waseca.mn.us/1435/Electric-Utility-Rebates",
    "administrator": "Waseca Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [],
        "cities": [
          "Waseca"
        ],
        "utilityTerritories": [
          "Waseca Utilities electric service territory",
          "SMMPA member utility territory"
        ],
        "notes": "Must be an electric customer of Waseca Utilities or another SMMPA member utility at the installation address."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "homeowners",
        "renters",
        "multifamily_common_area_customers"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "residential_refrigerator",
        "residential_freezer",
        "residential_dishwasher",
        "residential_clothes_washer",
        "heat_pump_clothes_dryer",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "dehumidifier",
        "room_air_conditioner",
        "central_air_conditioner",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "efficient_furnace_fan_motor",
        "ecm_circulator_pump",
        "induction_cooking_equipment",
        "room_air_purifier",
        "duct_sealing_and_insulation",
        "variable_speed_pool_pump",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Must be an electric customer of a SMMPA member utility or Waseca Utilities.",
        "Submit the current rebate form with required receipt, invoice and qualifying product information.",
        "Product must meet ENERGY STAR, DLC, AHRI or program-specific requirements where specified.",
        "Rebates are credited to the customer electric account and are limited by program funds and measure caps."
      ],
      "blockers": [
        "The dishwasher, refrigerator, freezer and laundry incentives are residential appliance measures, not commercial kitchen or commercial refrigeration retrofits.",
        "EV charging, e-bikes, battery outdoor equipment and EV rate enrollment appear on the same rebate summary, but only qualifying installed Level 2 chargers should match building charging infrastructure.",
        "Tankless water heaters are not eligible under the ENERGY STAR product heat pump water heater form.",
        "HVAC, duct sealing, ground-source heat pump and pool pump measures require their individual forms and minimum efficiency requirements."
      ],
      "programType": "Rebate Program",
      "administrator": "Waseca Utilities",
      "applicationUrl": "https://www.ci.waseca.mn.us/1435/Electric-Utility-Rebates",
      "websiteUrl": "https://www.ci.waseca.mn.us/1435/Electric-Utility-Rebates",
      "sourceUrlsChecked": [
        "https://www.ci.waseca.mn.us/1435/Electric-Utility-Rebates",
        "https://www.ci.waseca.mn.us/DocumentCenter/View/1143/2026-Rebate-Summary---Residential-and-Commercialpdf",
        "https://www.ci.waseca.mn.us/DocumentCenter/View/1144/2026-Energy-Star-Products-fillablepdf",
        "https://smmpa.com/members/waseca"
      ],
      "evidenceText": "Waseca’s 2026 rebate summary lists residential LED, appliance, HPWH, thermostat, HVAC heat pump, furnace fan, ECM circulator, induction, air purifier, duct sealing, pool pump VFD and EV charger incentives. Participants must be electric customers of an SMMPA member utility.",
      "reasoningNotes": "Converted commercial dishwasher and refrigeration matches into residential appliance categories where supported by current Waseca and SMMPA documents."
    },
    "existingSimpleRules": [
      {
        "id": "oir_73b86f65560f2ffe_v1",
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
        "formula": "$500 per connected ChargePoint Home Flex Level 2 charger",
        "evidenceText": "Bright Energy Solutions says connected ChargePoint Home Flex chargers receive a $500 rebate.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles/electric-vehicle-charging-program",
          "https://smmpa.com/members/waseca"
        ],
        "reasoningNotes": "Matched EV charging and Level 2 terms. Confidence is medium because Bright Energy Solutions participation should be verified by utility.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f3c6f2ff1d87008f_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 15000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$150 per other qualifying Level 2 charger",
        "evidenceText": "Bright Energy Solutions says other qualifying Level 2 chargers receive a $150 rebate.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles/electric-vehicle-charging-program",
          "https://smmpa.com/members/waseca"
        ],
        "reasoningNotes": "Returned separately because non-ChargePoint Level 2 chargers have a lower amount.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2701",
    "opportunityName": "City Utilities of Springfield - Residential Energy Efficiency Rebate Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2701/city-utilities-of-springfield-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.cityutilities.net/165/Rebates",
    "applicationUrl": "https://frontdoor.portal.poweredbyefi.org/initiative/cityutilities",
    "administrator": "City Utilities of Springfield",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charger"
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_toilet_urinal",
        "displayName": "High-efficiency toilet / urinal replacement",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "toilet"
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
          "MO"
        ],
        "counties": [
          "Greene County"
        ],
        "cities": [
          "Springfield"
        ],
        "utilityTerritories": [
          "City Utilities of Springfield"
        ],
        "notes": "Applies to City Utilities of Springfield customers; service type determines electric, natural gas, or water measure eligibility."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "residential_electric_customer",
        "residential_natural_gas_customer",
        "residential_water_customer",
        "builder_developer"
      ],
      "eligibleSectors": [
        "residential",
        "residential_new_construction"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ev_ready_home_wiring",
        "central_air_conditioner",
        "high_efficiency_furnace_retrofit",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "insulation_upgrade",
        "smart_thermostat_zoning_retrofit",
        "thermostat_demand_response",
        "high_efficiency_toilet_urinal"
      ],
      "hardRequirements": [
        "EV charger rebate requires existing CU residential electric service and a new Wi-Fi-enabled smart Level 2 charger.",
        "HVAC eligibility depends on CU electric or natural gas service and current minimum efficiency requirements."
      ],
      "blockers": [
        "Toilet rebate is water conservation, not an energy HVAC measure.",
        "Smart thermostat Peak Rewards is a separate demand-response enrollment incentive.",
        "DC fast chargers are not residential measures under this program."
      ],
      "programType": "Rebate Program",
      "administrator": "City Utilities of Springfield",
      "applicationUrl": "https://frontdoor.portal.poweredbyefi.org/initiative/cityutilities",
      "websiteUrl": "https://www.cityutilities.net/165/Rebates",
      "sourceUrlsChecked": [
        "https://www.cityutilities.net/165/Rebates",
        "https://www.cityutilities.net/269/HVAC-Rebate",
        "https://www.cityutilities.net/168/Electric-Vehicle-Charging-Rebates",
        "https://www.cityutilities.net/268/Residential-Insulation-Rebate",
        "https://www.cityutilities.net/267/Thermostat-Rebate",
        "https://www.cityutilities.net/266/WaterSense-Toilet-Rebate",
        "https://frontdoor.portal.poweredbyefi.org/initiative/cityutilities"
      ],
      "evidenceText": "City]( Utilities residential pages list HVAC, Level 2 EV charging and EV-ready wiring, insulation, smart thermostat, Peak Rewards, and WaterSense toilet rebates.",
      "reasoningNotes": "Kept supported residential electric, gas, and water measures and separated commercial programs and demand-response enrollment boundaries."
    },
    "existingSimpleRules": [
      {
        "id": "oir_aab78514ea2b7ec2_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.5
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 50000
        },
        "confidence": "high",
        "formula": "50% of eligible Wi-Fi smart Level 2 EV charger cost, capped at $500",
        "evidenceText": "City Utilities residential EV charger program offers 50% of charger cost, up to $500.",
        "sourceUrlsChecked": [
          "https://www.cityutilities.net/save/evchargerrebate/",
          "https://www.cityutilities.net/save/"
        ],
        "reasoningNotes": "Matched EV charger and Level 2 terms. Basis is charger purchase/installation cost where eligible.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2981",
    "opportunityName": "Columbia Water & Light - Residential Energy Efficiency Incentives (Including Home Performance with Energy Star)",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2981/columbia-water-and-light-residential-energy-efficiency-incentives-including-home-performance-with-energy-star",
    "websiteUrl": "https://www.como.gov/utilities/columbia-power-partners/residential-programs-and-tools/",
    "applicationUrl": null,
    "administrator": "Columbia Water & Light",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charger"
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
          "MO"
        ],
        "counties": [],
        "cities": [
          "Columbia"
        ],
        "utilityTerritories": [
          "Columbia Water & Light electric service territory"
        ],
        "notes": "City of Columbia residential electric customers served by Columbia Water & Light."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "tenant_with_owner_approval"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_water_heater",
        "attic_insulation_upgrade",
        "duct_insulation",
        "smart_thermostat"
      ],
      "hardRequirements": [
        "Customer must receive Columbia Water & Light electric service.",
        "Level 2 EV chargers must be residential, qualifying, and contractor-installed.",
        "Insulation, HVAC, HPWH, and smart thermostat rebates must meet program technical rules."
      ],
      "blockers": [
        "Window replacement is not supported by current official pages.",
        "Do not match generic EV charging unless it is a qualifying Level 2 residential charger."
      ],
      "programType": "Rebate Program",
      "administrator": "Columbia Water & Light",
      "applicationUrl": null,
      "websiteUrl": "https://www.como.gov/utilities/columbia-power-partners/residential-programs-and-tools/",
      "sourceUrlsChecked": [
        "https://www.como.gov/utilities/columbia-power-partners/residential-programs-and-tools/",
        "https://www.como.gov/utilities/columbia-power-partners/air-conditioner-and-heat-pump-rebates/",
        "https://www.como.gov/utilities/columbia-power-partners/residential-ev-charger-rebates/",
        "https://www.como.gov/utilities/columbia-power-partners/attic-plus-rebates/"
      ],
      "evidenceText": "Official]( Columbia pages list Level 2 EV charging, HVAC including heat pumps and geothermal, HPWH, attic and duct insulation, and smart thermostat rebates.",
      "reasoningNotes": "Uploaded batch target reviewed from . Removed window replacement; retained only measures supported on current official pages."
    },
    "existingSimpleRules": [
      {
        "id": "oir_848d4b2b0443a4f1_v1",
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
        "confidence": "medium",
        "formula": "$50 per eligible unit",
        "evidenceText": "For more information on Residential Heat Pump Water Heater Rebate Program Residential Smart Thermostat Rebate Program Receive a rebate up to $50 when replacing your current thermostat with a new Energy Star certified smart thermostat",
        "sourceUrlsChecked": [
          "https://www.como.gov/utilities/columbia-power-partners/residential-programs-and-tools/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null,
          "businessRelevance": "residential_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3579",
    "opportunityName": "Southwest Electric Cooperative - Energy Efficiency Rebate Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3579/southwest-electric-cooperative-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.swec.org/rebates-audits",
    "applicationUrl": "https://www.swec.org/rebates-audits",
    "administrator": "Southwest Electric Cooperative",
    "programType": "Member Energy Efficiency Rebate And Audit Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "efficient_pump_replacement",
        "displayName": "Efficient pump replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "pump replacement"
        ]
      },
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
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "charging station"
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
          "MO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Southwest Electric Cooperative"
        ],
        "notes": "Restricted to Southwest Electric Cooperative members in good standing with qualifying service usage and applicable measure eligibility."
      },
      "eligibleApplicantTypes": [
        "cooperative_member",
        "residential_customer",
        "commercial_customer",
        "agricultural_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "dual_fuel_heat_pump",
        "ductless_mini_split_heat_pump",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "foundation_insulation_with_ground_source_heat_pump",
        "heat_pump_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be a Southwest Electric Cooperative member in good standing.",
        "Service must meet the cooperative's minimum annual usage requirement.",
        "Rebates are capped by program cost-share rules unless otherwise stated.",
        "Ducted dual-fuel heat pumps require qualifying fossil-fuel backup and exclude electric-resistance or wood backup.",
        "Ductless mini-splits have unit limits and efficiency requirements.",
        "Ground-source heat pumps require Manual J documentation, eligible loop or replacement rules, and exclude direct-expansion systems.",
        "Foundation insulation is eligible only when installed with a qualifying ground-source heat pump.",
        "Heat pump water heaters must be ENERGY STAR and are limited per meter."
      ],
      "blockers": [
        "No current official EV charger or Level 2 charger rebate was verified on the cooperative rebates and audits page.",
        "No standalone efficient pump replacement rebate was verified; pump wording in the matched terms is a heat pump false positive.",
        "Foundation insulation should not be generalized to broad insulation upgrades because it is tied to ground-source heat pump installation.",
        "Residential energy audit is a diagnostic service, not a physical retrofit.",
        "Ducted heat pump rebates require fossil-fuel backup, so all-electric resistance or wood-backup systems are blocked."
      ],
      "programType": "Member Energy Efficiency Rebate And Audit Program",
      "administrator": "Southwest Electric Cooperative",
      "applicationUrl": "https://www.swec.org/rebates-audits",
      "websiteUrl": "https://www.swec.org/rebates-audits",
      "sourceUrlsChecked": [
        "https://www.swec.org/rebates-audits"
      ],
      "evidenceText": "Southwest Electric Cooperative lists member rebates for dual-fuel and ductless heat pumps, ground-source heat pumps, related foundation insulation, heat pump water heaters, and residential energy audits.",
      "reasoningNotes": "The original match should drop EV charging and pump replacement. Verified eligibility is concentrated in heat pumps, heat pump water heaters, GSHP-linked foundation insulation, and residential audits."
    },
    "existingSimpleRules": [
      {
        "id": "oir_27482ffdb5e4de3d_v1",
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
        "confidence": "medium",
        "formula": "$750 per eligible unit",
        "evidenceText": "The rebate for a new ground-source heat pump and loop field is $750 per ton* of heat pump capacity",
        "sourceUrlsChecked": [
          "https://www.swec.org/rebates-audits"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22123",
    "opportunityName": "TVA - Commercial Energy Efficiency Rebate Program",
    "state": "MS",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22123/tva-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://energyright.com/business-industry/incentives/",
    "applicationUrl": "https://energyright.com/business-industry/incentives/getting-started/",
    "administrator": "TVA EnergyRight",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "electric_forklift_material_handling",
        "displayName": "Electric forklift / material handling equipment",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electric forklift"
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
          "led lighting",
          "led lamp"
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
        "retrofitTypeId": "refrigeration_ec_motor_retrofit",
        "displayName": "Refrigeration EC motor retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ec motor",
          "evaporator fan"
        ]
      },
      {
        "retrofitTypeId": "retro_commissioning_study",
        "displayName": "Retro-commissioning study",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "commissioning"
        ]
      },
      {
        "retrofitTypeId": "thermal_energy_storage",
        "displayName": "Thermal energy storage",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ice storage"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MS"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "TVA local power company customers",
          "TVA direct-served customers"
        ],
        "notes": "Limited to TVA-served business customers in the Mississippi portion of the Tennessee Valley; local power company participation and funding apply."
      },
      "eligibleApplicantTypes": [
        "business_electric_customers",
        "commercial_customers",
        "industrial_customers",
        "tva_direct_served_customers",
        "local_power_company_business_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "municipal",
        "federal",
        "agricultural",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_ec_motor_retrofit",
        "refrigeration_controls_retrofit",
        "electric_forklift_material_handling",
        "thermal_energy_storage",
        "variable_frequency_drive_retrofit",
        "retro_commissioning_study",
        "efficient_compressed_air_system",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Must be a TVA local power company business customer or TVA direct-served customer with a qualifying electric-saving project.",
        "Standard projects must be installed or submitted through a TVA Preferred Partners Network member unless TVA rules allow otherwise.",
        "Preapproval is required before removing, purchasing or installing equipment when the measure requires preapproval; formal Application Approval Notice controls eligibility.",
        "Equipment must meet measure-specific minimum efficiency and documentation requirements.",
        "Minimum incentive amounts apply: $150 standard application and $1500 custom application.",
        "Incentives are capped at 70% of material cost and $3000000 per organization per TVA fiscal year."
      ],
      "blockers": [
        "No official TVA business and industry incentive source checked supports broad low-flow plumbing fixture retrofits under this rebate; do not match low_flow_fixture_retrofit.",
        "Residential EnergyRight rebates, Smart Energy Starter Kits, demand response, renewable or solar programs and financing are separate programs and should not match this opportunity.",
        "Projects are subject to TVA and local power company approval, available funding and compliance with applicable laws.",
        "VSD prescriptive incentives are for qualifying existing HVAC applications; other VSD uses may need custom review."
      ],
      "programType": "Rebate Program",
      "administrator": "TVA EnergyRight",
      "applicationUrl": "https://energyright.com/business-industry/incentives/getting-started/",
      "websiteUrl": "https://energyright.com/business-industry/incentives/",
      "sourceUrlsChecked": [
        "https://energyright.com/business-industry/incentives/",
        "https://energyright.com/business-industry/incentives/applying-for-incentives/",
        "https://energyright.com/business-industry/incentives/hvac/",
        "https://energyright.com/business-industry/incentives/refrigeration/",
        "https://energyright.com/business-industry/incentives/led-lights/",
        "https://energyright.com/business-industry/incentives/electric-forklifts/",
        "https://energyright.com/business-industry/incentives/thermal-storage/",
        "https://energyright.com/business-industry/incentives/commissioning/",
        "https://energyright.com/business-industry/incentives/vsd/",
        "https://energyright.com/business-industry/incentives/compressed-air-incentive/"
      ],
      "evidenceText": "Official TVA pages list active business incentives for HVAC, VSDs, refrigeration, LED lighting, electric forklifts, thermal ice storage, commissioning, compressed air and custom projects. Eligibility is tied to TVA local power company or direct-served commercial and industrial customers.",
      "reasoningNotes": "Input target set cited here: . Repaired repeated DSIRE state records as one TVA regional program with state-specific geography and identical category filtering."
    },
    "existingSimpleRules": [
      {
        "id": "oir_c4d92f9c16a6a606_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 2800,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$28 per eligible unit",
        "evidenceText": "Up to $28/fixture with several qualifying fixture types",
        "sourceUrlsChecked": [
          "https://energyright.com/business-industry/incentives/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1658",
    "opportunityName": "NorthWestern Energy (Electric) - Commercial Energy Efficiency Rebate Program",
    "state": "MT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1658/northwestern-energy-electric-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/rebates-incentives",
    "applicationUrl": "https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/rebates-incentives/commercial-electric-rebates",
    "administrator": "NorthWestern Energy",
    "programType": "Commercial Electric Rebate, Lighting Rebate, And Custom Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
    "targetKind": "existing_simple_rule_v2_repair",
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
          "air conditioning",
          "chiller"
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
          "refrigeration",
          "refrigerator",
          "freezer"
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
      },
      {
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "aerator"
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
          "vfd",
          "variable speed drive"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "NorthWestern Energy Montana electric service territory"
        ],
        "notes": "Commercial electric rebates apply in Montana only; no rebates or incentives are offered for South Dakota or Nebraska customers under this page, and former Energy West Montana and Cut Bank Gas Company customers are excluded where stated."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "business_customer",
        "institutional_customer",
        "industrial_customer",
        "agricultural_customer",
        "multifamily_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls",
        "commercial_kitchen_demand_control_ventilation",
        "high_efficiency_commercial_dishwasher",
        "commercial_clothes_dryer",
        "demand_controlled_ventilation",
        "variable_frequency_drive_retrofit",
        "efficient_motor_replacement",
        "smart_thermostat_zoning_retrofit",
        "pre_rinse_spray_valve",
        "high_efficiency_refrigeration_controls",
        "refrigeration_ecm_fan_motor",
        "refrigerated_case_night_covers",
        "low_flow_fixture_retrofit",
        "commercial_secondary_glazing",
        "wall_cavity_insulation",
        "water_heater_pipe_insulation",
        "commercial_air_curtain",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Applicant must be a NorthWestern Energy Montana commercial electric supply customer.",
        "Choice electric supply customers are not eligible.",
        "Existing-construction electric rebate work and materials must meet the current effective program dates and be submitted on the correct form.",
        "Lighting products must meet ENERGY STAR, DLC, or utility approval rules where required.",
        "Pre-rinse spray valves, aerators, showerheads, pipe insulation, dishwasher, and thermostat measures require NorthWestern electric water heating or electric space heating where stated.",
        "Custom projects require NorthWestern review and approval."
      ],
      "blockers": [
        "Do not match heat pump HVAC, heat pump water heater, chiller, or air compressor as prescriptive measures; these were not verified in the current commercial electric forms.",
        "Low-flow fixtures are product-specific aerator, showerhead, and pre-rinse measures and should not be treated as broad water conservation.",
        "Wall insulation and secondary glazing are narrow electric-space-heat measures, not broad building-envelope eligibility.",
        "Commercial electric rebates do not apply to South Dakota, Nebraska, Choice supply, or excluded gas-company customers.",
        "Custom incentive availability does not mean all commercial equipment types are automatically eligible."
      ],
      "programType": "Commercial Electric Rebate, Lighting Rebate, And Custom Incentive Program",
      "administrator": "NorthWestern Energy",
      "applicationUrl": "https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/rebates-incentives/commercial-electric-rebates",
      "websiteUrl": "https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/rebates-incentives",
      "sourceUrlsChecked": [
        "https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/rebates-incentives",
        "https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/rebates-incentives/commercial-electric-rebates",
        "https://northwesternenergy.com/docs/default-source/default-document-library/billing-and-payment/e-programs/commercial-electric-rebate-2021.pdf",
        "https://northwesternenergy.com/docs/default-source/default-document-library/billing-and-payment/e-programs/montana-commercial-electric-lighting-rebate-2021.pdf",
        "https://northwesternenergy.com/docs/default-source/default-document-library/account-services/business-services/4132_commercial_electric_new_const_rebate.pdf"
      ],
      "evidenceText": "NorthWestern commercial electric forms list lighting, controls, VFDs, motors, kitchen ventilation, dishwashers, refrigeration controls, low-flow fixtures, insulation, secondary glazing, and custom projects.",
      "reasoningNotes": "The original match included unsupported HVAC, HPWH, air compressor, and chiller categories. Current forms support commercial electric lighting, controls, motors, VFDs, refrigeration controls, specific water fixtures, and custom incentives."
    },
    "existingSimpleRules": [
      {
        "id": "oir_a21b9f07ab5f276f_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 1500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$15 per foot for refrigerated or freezer case LED lighting",
        "evidenceText": "NorthWestern 2026 commercial lighting form lists refrigerated/freezer case LED lighting at $15 per foot.",
        "sourceUrlsChecked": [
          "https://northwesternenergy.com/docs/default-source/default-document-library/billing-and-payment/e-programs/montana-commercial-electric-lighting-rebate-2021.pdf",
          "https://northwesternenergy.com/account-services/for-business/energy-efficiency-for-business/rebates-incentives/commercial-electric-rebates"
        ],
        "reasoningNotes": "Matched refrigeration terms. Use unit_count as eligible linear feet of case lighting.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22128",
    "opportunityName": "TVA - Commercial Energy Efficiency Rebate Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22128/tva-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://energyright.com/business-industry/incentives/",
    "applicationUrl": "https://energyright.com/business-industry/incentives/getting-started/",
    "administrator": "TVA EnergyRight",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "electric_forklift_material_handling",
        "displayName": "Electric forklift / material handling equipment",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electric forklift"
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
          "led lighting",
          "led lamp"
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
        "retrofitTypeId": "refrigeration_ec_motor_retrofit",
        "displayName": "Refrigeration EC motor retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ec motor",
          "evaporator fan"
        ]
      },
      {
        "retrofitTypeId": "retro_commissioning_study",
        "displayName": "Retro-commissioning study",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "commissioning"
        ]
      },
      {
        "retrofitTypeId": "thermal_energy_storage",
        "displayName": "Thermal energy storage",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ice storage"
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
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "TVA local power company customers",
          "TVA direct-served customers"
        ],
        "notes": "Limited to TVA-served business customers in the North Carolina portion of the Tennessee Valley; local power company participation and funding apply."
      },
      "eligibleApplicantTypes": [
        "business_electric_customers",
        "commercial_customers",
        "industrial_customers",
        "tva_direct_served_customers",
        "local_power_company_business_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "municipal",
        "federal",
        "agricultural",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_ec_motor_retrofit",
        "refrigeration_controls_retrofit",
        "electric_forklift_material_handling",
        "thermal_energy_storage",
        "variable_frequency_drive_retrofit",
        "retro_commissioning_study",
        "efficient_compressed_air_system",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Must be a TVA local power company business customer or TVA direct-served customer with a qualifying electric-saving project.",
        "Standard projects must be installed or submitted through a TVA Preferred Partners Network member unless TVA rules allow otherwise.",
        "Preapproval is required before removing, purchasing or installing equipment when the measure requires preapproval; formal Application Approval Notice controls eligibility.",
        "Equipment must meet measure-specific minimum efficiency and documentation requirements.",
        "Minimum incentive amounts apply: $150 standard application and $1500 custom application.",
        "Incentives are capped at 70% of material cost and $3000000 per organization per TVA fiscal year."
      ],
      "blockers": [
        "No official TVA business and industry incentive source checked supports broad low-flow plumbing fixture retrofits under this rebate; do not match low_flow_fixture_retrofit.",
        "Residential EnergyRight rebates, Smart Energy Starter Kits, demand response, renewable or solar programs and financing are separate programs and should not match this opportunity.",
        "Projects are subject to TVA and local power company approval, available funding and compliance with applicable laws.",
        "VSD prescriptive incentives are for qualifying existing HVAC applications; other VSD uses may need custom review."
      ],
      "programType": "Rebate Program",
      "administrator": "TVA EnergyRight",
      "applicationUrl": "https://energyright.com/business-industry/incentives/getting-started/",
      "websiteUrl": "https://energyright.com/business-industry/incentives/",
      "sourceUrlsChecked": [
        "https://energyright.com/business-industry/incentives/",
        "https://energyright.com/business-industry/incentives/applying-for-incentives/",
        "https://energyright.com/business-industry/incentives/hvac/",
        "https://energyright.com/business-industry/incentives/refrigeration/",
        "https://energyright.com/business-industry/incentives/led-lights/",
        "https://energyright.com/business-industry/incentives/electric-forklifts/",
        "https://energyright.com/business-industry/incentives/thermal-storage/",
        "https://energyright.com/business-industry/incentives/commissioning/",
        "https://energyright.com/business-industry/incentives/vsd/",
        "https://energyright.com/business-industry/incentives/compressed-air-incentive/"
      ],
      "evidenceText": "Official TVA pages list active business incentives for HVAC, VSDs, refrigeration, LED lighting, electric forklifts, thermal ice storage, commissioning, compressed air and custom projects. Eligibility is tied to TVA local power company or direct-served commercial and industrial customers.",
      "reasoningNotes": "Same current TVA regional program as the companion TVA records; state changes only the TVA-served geography."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1977577102de99e3_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 2800,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$28 per eligible unit",
        "evidenceText": "Up to $28/fixture with several qualifying fixture types",
        "sourceUrlsChecked": [
          "https://energyright.com/business-industry/incentives/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3323",
    "opportunityName": "Nebraska Public Power District - Residential Energy Efficiency Rebate Programs",
    "state": "NE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3323/nebraska-public-power-district-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.nppd.com/save-money",
    "applicationUrl": "https://nppd.energywisenebraska.com/residential/",
    "administrator": "Nebraska Public Power District",
    "programType": "Residential Rebate, EV Charger Incentive, And Optional Loan Support",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "charging station"
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
          "Nebraska Public Power District",
          "participating NPPD wholesale utilities"
        ],
        "notes": "Applies to NPPD EnergyWise residential customers and participating local utilities in Nebraska; EV incentives are through NPPD's goEV residential incentive path."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_owner_permission",
        "landlord_owner"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "attic_insulation",
        "cooling_system_tune_up",
        "ductless_mini_split_heat_pump",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "water_source_heat_pump",
        "heat_pump_water_heater",
        "induction_cooking_equipment",
        "smart_thermostat_zoning_retrofit",
        "level_2_ev_charger_installation",
        "ev_charger_pre_wiring"
      ],
      "hardRequirements": [
        "Applicant must be an eligible NPPD or participating local utility residential customer.",
        "Attic insulation applies only to qualifying existing dwellings with electric heat, heat pump, or electric furnace and does not cover walls, floors, crawlspaces, or foundations.",
        "Cooling tune-ups exclude window air conditioners, PTAC, and PTHP units.",
        "Heat pumps must be permanent space-heating systems with required AHRI or qualifying documentation.",
        "Smart thermostat rebates are residential only and require compatible central cooling or heat pump equipment and Wi-Fi.",
        "Residential EV charger and pre-wiring incentives require goEV documentation and eligible installation."
      ],
      "blockers": [
        "Do not match broad insulation; only attic insulation is verified in the residential rebate details.",
        "Do not match residential LED lighting; no current official residential LED rebate was verified.",
        "The Nebraska Dollar and Energy Savings Loan is optional financing support and should not create additional rebate-style retrofit categories.",
        "Do not match commercial or industrial customers to residential thermostat, insulation, or appliance requirements.",
        "Window AC, PTAC, and PTHP equipment are explicitly excluded from the cooling tune-up measure."
      ],
      "programType": "Residential Rebate, EV Charger Incentive, And Optional Loan Support",
      "administrator": "Nebraska Public Power District",
      "applicationUrl": "https://nppd.energywisenebraska.com/residential/",
      "websiteUrl": "https://www.nppd.com/save-money",
      "sourceUrlsChecked": [
        "https://nppd.energywisenebraska.com/residential/",
        "https://www.nppd.com/save-money",
        "https://nppd.energywisenebraskagoev.com/residential-incentives/"
      ],
      "evidenceText": "NPPD EnergyWise residential details support attic insulation, cooling tune-ups, heat pumps, heat pump water heaters, induction cooking, smart thermostats, and goEV charger incentives.",
      "reasoningNotes": "The match should retain NPPD residential heat pump, HPWH, thermostat, insulation, and EV charging categories but remove LED and avoid treating optional loans as separate retrofit measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8cb3a506e0d83585_v1",
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
        "formula": "$50 per qualifying smart thermostat",
        "evidenceText": "EnergyWise Nebraska residential materials list smart thermostat incentives at $50.",
        "sourceUrlsChecked": [
          "https://www.nppd.com/save-money/incentives-programs/energywise-incentives"
        ],
        "reasoningNotes": "Matched smart thermostat term. Returned separately from EVSE candidate.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_8fea63470ffe131b_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.5
        },
        "basisPolicy": {
          "basis": "equipment_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 50000
        },
        "confidence": "medium",
        "formula": "50% of residential Level 2 charging station cost, capped at $500",
        "evidenceText": "EnergyWise Nebraska GoEV materials list Level 2 charging station incentives at 50% of cost up to $500.",
        "sourceUrlsChecked": [
          "https://nppd.energywisenebraskagoev.com/",
          "https://www.nppd.com/save-money"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms. Local utility participation and charger eligibility must be verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1373",
    "opportunityName": "Unitil (Electric) - Residential Energy Efficiency Programs",
    "state": "NH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1373/unitil-electric-residential-energy-efficiency-programs",
    "websiteUrl": "https://unitil.com/ways-to-save/rebates-incentives",
    "applicationUrl": null,
    "administrator": "Unitil Energy Systems",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
          "NH"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Unitil New Hampshire electric service territory",
          "NHSaves participating utility territory"
        ],
        "notes": "Limited to Unitil New Hampshire residential electric or dual gas and electric customers for electric measures; gas measures require Unitil gas service and should not be inferred from this electric record."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "dual_fuel_residential_customers",
        "homeowners",
        "renters",
        "income_eligible_households"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "room_air_conditioner",
        "residential_clothes_washer",
        "residential_clothes_dryer",
        "residential_refrigerator",
        "residential_refrigerator_freezer_recycling",
        "dehumidifier",
        "room_air_purifier",
        "variable_speed_pool_pump"
      ],
      "hardRequirements": [
        "Must be in Unitil New Hampshire service and meet NHSaves or Unitil residential program eligibility for the specific measure.",
        "Appliance and equipment rebates generally require ENERGY STAR or program-qualified products where specified.",
        "Home Energy Performance begins with Home Heating Index or whole-house assessment and qualified auditor recommendations.",
        "Weatherization, heat pump and appliance incentives depend on current program rules, service type and available funding."
      ],
      "blockers": [
        "Residential refrigerator and freezer incentives are appliance rebates or recycling, not commercial refrigeration equipment.",
        "No current Unitil New Hampshire electric source checked supports matching commercial lighting, commercial refrigeration, motors or industrial measures.",
        "Natural gas heating, water-heating and thermostat rebates require eligible natural gas service and are not supported by this electric-only opportunity.",
        "Home Energy Performance weatherization requires audit or qualification and auditor-recommended measures; income-qualified no-cost weatherization is a distinct eligibility path."
      ],
      "programType": "Rebate Program",
      "administrator": "Unitil Energy Systems",
      "applicationUrl": null,
      "websiteUrl": "https://unitil.com/ways-to-save/rebates-incentives",
      "sourceUrlsChecked": [
        "https://unitil.com/ways-to-save/rebates-incentives",
        "https://unitil.com/rebates/energy-starr-appliances-and-electronics-nh",
        "https://unitil.com/rebates/home-energy-performance-nh",
        "https://nhsaves.com/rebates-services-appliances/"
      ],
      "evidenceText": "Unitil’s New Hampshire pages direct residential electric customers to NHSaves appliance rebates and Home Energy Performance. Current sources list ENERGY STAR appliances, HPWH, heat pumps, recycling, pool pumps and whole-house audit/weatherization; gas heating and thermostats require gas service.",
      "reasoningNotes": "Narrowed broad refrigeration and laundry matches to residential appliances; removed unsupported smart thermostat from the electric-only Unitil record except where tied to gas service outside this opportunity."
    },
    "existingSimpleRules": [
      {
        "id": "oir_68a6b5cb1ff1e929_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.75
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 600000
        },
        "confidence": "medium",
        "formula": "75% of approved insulation and weatherization cost, capped at $6,000",
        "evidenceText": "Unitil weatherproofing guidance says most projects qualify for 75% off total cost up to $6,000.",
        "sourceUrlsChecked": [
          "https://unitil.com/blog/weatherproofing-any-season"
        ],
        "reasoningNotes": "Matched insulation, air sealing, and weatherization terms. Medium because final approval occurs through NHSaves/contractor path.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2003",
    "opportunityName": "PSEG Long Island - Residential Energy Efficiency Rebate Program",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2003/pseg-long-island-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.psegliny.com/saveenergyandmoney/energystarrebates",
    "applicationUrl": "https://psegli.capturesportal.com/",
    "administrator": "Long Island Power Authority",
    "programType": "Residential Rebates, Home Performance Rebates, And Energy Assessment",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
    "targetKind": "existing_simple_rule_v2_repair",
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
        "retrofitTypeId": "ground_source_geothermal_heat_pump",
        "displayName": "Ground-source / geothermal heat pump",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ground source heat pump",
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
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
          "NY"
        ],
        "counties": [
          "Nassau County",
          "Suffolk County"
        ],
        "cities": [],
        "utilityTerritories": [
          "PSEG Long Island",
          "Long Island Power Authority"
        ],
        "notes": "Restricted to PSEG Long Island residential customers in the Long Island and Rockaways electric service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "multifamily_property_owner",
        "income_qualified_customer",
        "renter_with_owner_permission"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat_zoning_retrofit",
        "demand_response_smart_thermostat",
        "heat_pump_water_heater",
        "cold_climate_air_source_heat_pump",
        "air_to_water_heat_pump",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "energy_audit",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "window_replacement"
      ],
      "hardRequirements": [
        "Applicant must be a PSEG Long Island residential customer.",
        "Appliance and equipment rebates require purchase of a new eligible product during the current calendar year and model eligibility on the qualifying product list at purchase.",
        "Heat pump, geothermal, and weatherization rebates require participating contractors or partners where specified.",
        "Whole-house heat pump projects require applicable sizing, Manual J, qualifying product lists, and integrated control or fossil-fuel removal requirements where stated.",
        "Income-qualified and multifamily incentives require separate preapproval or eligibility documentation.",
        "Smart Savers thermostat participation is a demand response program separate from the equipment rebate."
      ],
      "blockers": [
        "Do not match PSE&G New Jersey appliance, induction, or lighting offers to PSEG Long Island.",
        "No current official PSEG Long Island clothes washer, commercial kitchen induction, or general LED lighting rebate was verified in the checked pages.",
        "Commercial kitchen and commercial laundry matches are not supported by this residential Long Island opportunity.",
        "Thermostat demand response should be tracked separately from the smart thermostat equipment rebate.",
        "Weatherization and home assessment rebates require participating contractors and are not automatic retail product rebates."
      ],
      "programType": "Residential Rebates, Home Performance Rebates, And Energy Assessment",
      "administrator": "Long Island Power Authority",
      "applicationUrl": "https://psegli.capturesportal.com/",
      "websiteUrl": "https://www.psegliny.com/saveenergyandmoney/energystarrebates",
      "sourceUrlsChecked": [
        "https://www.psegliny.com/saveenergyandmoney/energystarrebates",
        "https://www.psegliny.com/saveenergyandmoney/homeefficiency/homeenergyassessment",
        "https://www.psegliny.com/saveenergyandmoney/homeefficiency/HomeComfort/HeatPumps/Rebates",
        "https://www.psegliny.com/saveenergyandmoney/GreenEnergy/Geothermal"
      ],
      "evidenceText": "PSEG Long Island supports residential smart thermostats, heat pump water heaters, heat pumps, geothermal, home energy assessments, air sealing, insulation, duct sealing, and windows.",
      "reasoningNotes": "The original DSIRE match included false positives from unrelated PSE&G or retail categories. The repair keeps verified PSEG Long Island residential HVAC, water heating, thermostat, geothermal, and home performance measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_73cf961034367f85_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 13000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $130 per eligible smart thermostat",
        "evidenceText": "PSEG Long Island lists smart thermostat rebates up to $100-$130 for eligible models.",
        "sourceUrlsChecked": [
          "https://www.psegliny.com/saveenergyandmoney/energystarrebates",
          "https://www.psegliny.com/saveenergyandmoney/homeefficiency/homecomfort"
        ],
        "reasoningNotes": "Matched smart thermostat term. Modeled as the top published tier because eligible models determine final amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2475",
    "opportunityName": "Consumers Power, Inc - Residential Energy Efficiency Rebate Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2475/consumers-power-inc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://cpi.coop/rebates/",
    "applicationUrl": "https://cpi1.gpfulfillment.com/",
    "administrator": "Consumers Power, Inc.",
    "programType": "Residential Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charger"
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
          "programmable thermostat",
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
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Consumers Power Inc. electric cooperative service territory"
        ],
        "notes": "Applies to eligible residential CPI members in Oregon; some incentives are administered through Direct Efficiency or CPI fulfillment pages."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner",
        "property_owner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "level_2_ev_charger_installation",
        "window_replacement",
        "exterior_door_replacement",
        "insulation_upgrade",
        "high_efficiency_laundry_equipment",
        "ductless_heat_pump",
        "air_source_heat_pump",
        "central_air_conditioner_replacement",
        "new_manufactured_home_efficiency",
        "energy_audit"
      ],
      "hardRequirements": [
        "Applicant must be an eligible CPI residential electric member.",
        "Equipment must meet current CPI and administrator specifications and be installed in an eligible dwelling.",
        "Some envelope measures require an energy audit, inspection, or pre-qualification before rebate approval.",
        "EV charging support is for qualifying Level 2 residential charging equipment or installation."
      ],
      "blockers": [
        "Do not match generic EV charging when only Level 2 residential charger requirements are met.",
        "Air sealing is not verified as a separate current CPI rebate; do not infer it from weatherization text.",
        "Do not match commercial or industrial equipment to this residential program.",
        "Energy audit is a service or prerequisite, not a physical retrofit measure."
      ],
      "programType": "Residential Rebate",
      "administrator": "Consumers Power, Inc.",
      "applicationUrl": "https://cpi1.gpfulfillment.com/",
      "websiteUrl": "https://cpi.coop/rebates/",
      "sourceUrlsChecked": [
        "https://cpi.coop/rebates/",
        "https://directefficiency.com/cpi-rebates/",
        "https://cpi1.gpfulfillment.com/"
      ],
      "evidenceText": "CPI and Direct Efficiency rebate pages list heat pump water heaters, smart thermostats, Level 2 EV chargers, windows, doors, insulation, washers, dryers, and heat pump HVAC measures.",
      "reasoningNotes": "Kept current residential member rebates and narrowed EV and weatherization categories. Removed unsupported broad air sealing and any nonresidential interpretation."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4d891ac4ba83585c_v1",
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
        "confidence": "medium",
        "formula": "$400 per qualifying Level 2 charger",
        "evidenceText": "Oregon Go Electric incentive listing states Consumers Power members can receive a $400 Level 2 charger rebate.",
        "sourceUrlsChecked": [
          "http://www.cpi.coop/rebate/",
          "https://goelectric.oregon.gov/incentives-rebates"
        ],
        "reasoningNotes": "Matched Level 2 EV charging. Confidence is medium because CPI's current rebate form should be verified.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1296",
    "opportunityName": "Midstate Electric Cooperative - Residential Conservation Rebates",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1296/midstate-electric-cooperative-residential-conservation-rebates",
    "websiteUrl": "https://www.midstateelectric.coop/energy-efficiency/incentives/residential/",
    "applicationUrl": "https://www.midstateelectric.coop/energy-efficiency/incentives/residential/",
    "administrator": "Midstate Electric Cooperative",
    "programType": "Residential Rebate And Audit Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 9,
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
          "Midstate Electric Cooperative"
        ],
        "notes": "Restricted to Midstate Electric Cooperative residential members in the cooperative service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "cooperative_member",
        "single_family_customer",
        "multifamily_customer"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_clothes_washer",
        "electric_clothes_dryer",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "duct_sealing_and_insulation",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "window_replacement",
        "exterior_door_replacement",
        "smart_thermostat_zoning_retrofit",
        "energy_audit"
      ],
      "hardRequirements": [
        "Applicant must be a Midstate Electric Cooperative residential member.",
        "Heat pump water heater rebate requires qualifying equipment, member documentation, and receipt or invoice.",
        "Weatherization and window or door incentives depend on single-family or multifamily rules and existing conditions.",
        "Free energy audits are services, not physical retrofit installations."
      ],
      "blockers": [
        "Do not match commercial or industrial retrofit categories to this residential program.",
        "Energy audit should not be counted as a physical retrofit.",
        "Official Midstate web pages were partially access-restricted, so unsupported measures outside the residential incentive page and official snippets should be excluded.",
        "Do not generalize residential clothes washer or dryer incentives into commercial laundry equipment."
      ],
      "programType": "Residential Rebate And Audit Program",
      "administrator": "Midstate Electric Cooperative",
      "applicationUrl": "https://www.midstateelectric.coop/energy-efficiency/incentives/residential/",
      "websiteUrl": "https://www.midstateelectric.coop/energy-efficiency/incentives/residential/",
      "sourceUrlsChecked": [
        "https://www.midstateelectric.coop/energy-efficiency/incentives/residential/",
        "https://www.midstateelectric.coop/energy-efficiency/incentives/electric-heat-pump-water-heater-incentive/",
        "https://www.midstateelectric.coop/community/news-media/podcast/episode-5/",
        "https://www.midstateelectric.coop/member-services/faqs/",
        "https://programs.dsireusa.org/system/program/detail/1296/midstate-electric-cooperative-residential-conservation-rebates"
      ],
      "evidenceText": "Official Midstate information supports residential washers, dryers, thermostats, duct sealing, windows, doors, insulation, heat pumps, heat pump water heaters, and audits.",
      "reasoningNotes": "Most original matches are supported, but the program should be constrained to residential members. Audit remains an eligible service category, not a physical retrofit."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2219b4ef8d82661c_v1",
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
        "confidence": "medium",
        "formula": "Up to $1,600 per Tier 3 unitary heat pump water heater of 50 gallons or more",
        "evidenceText": "Midstate residential incentive page lists up to $1,600 for Tier 3 unitary heat pump water heaters of 50+ gallons.",
        "sourceUrlsChecked": [
          "https://www.midstateelectric.coop/energy-efficiency/incentives/residential/",
          "https://www.midstateelectric.coop/residential"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Confidence is medium because amount depends on tank size and tier.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22126",
    "opportunityName": "TVA - Commercial Energy Efficiency Rebate Program",
    "state": "TN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22126/tva-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://energyright.com/business-industry/incentives/",
    "applicationUrl": "https://energyright.com/business-industry/incentives/getting-started/",
    "administrator": "TVA EnergyRight",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "electric_forklift_material_handling",
        "displayName": "Electric forklift / material handling equipment",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electric forklift"
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
          "led lighting",
          "led lamp"
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
        "retrofitTypeId": "refrigeration_ec_motor_retrofit",
        "displayName": "Refrigeration EC motor retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ec motor",
          "evaporator fan"
        ]
      },
      {
        "retrofitTypeId": "retro_commissioning_study",
        "displayName": "Retro-commissioning study",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "commissioning"
        ]
      },
      {
        "retrofitTypeId": "thermal_energy_storage",
        "displayName": "Thermal energy storage",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ice storage"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "TN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "TVA local power company customers",
          "TVA direct-served customers"
        ],
        "notes": "Limited to TVA-served business customers in Tennessee; local power company participation and funding apply."
      },
      "eligibleApplicantTypes": [
        "business_electric_customers",
        "commercial_customers",
        "industrial_customers",
        "tva_direct_served_customers",
        "local_power_company_business_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "municipal",
        "federal",
        "agricultural",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_ec_motor_retrofit",
        "refrigeration_controls_retrofit",
        "electric_forklift_material_handling",
        "thermal_energy_storage",
        "variable_frequency_drive_retrofit",
        "retro_commissioning_study",
        "efficient_compressed_air_system",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Must be a TVA local power company business customer or TVA direct-served customer with a qualifying electric-saving project.",
        "Standard projects must be installed or submitted through a TVA Preferred Partners Network member unless TVA rules allow otherwise.",
        "Preapproval is required before removing, purchasing or installing equipment when the measure requires preapproval; formal Application Approval Notice controls eligibility.",
        "Equipment must meet measure-specific minimum efficiency and documentation requirements.",
        "Minimum incentive amounts apply: $150 standard application and $1500 custom application.",
        "Incentives are capped at 70% of material cost and $3000000 per organization per TVA fiscal year."
      ],
      "blockers": [
        "No official TVA business and industry incentive source checked supports broad low-flow plumbing fixture retrofits under this rebate; do not match low_flow_fixture_retrofit.",
        "Residential EnergyRight rebates, Smart Energy Starter Kits, demand response, renewable or solar programs and financing are separate programs and should not match this opportunity.",
        "Projects are subject to TVA and local power company approval, available funding and compliance with applicable laws.",
        "VSD prescriptive incentives are for qualifying existing HVAC applications; other VSD uses may need custom review."
      ],
      "programType": "Rebate Program",
      "administrator": "TVA EnergyRight",
      "applicationUrl": "https://energyright.com/business-industry/incentives/getting-started/",
      "websiteUrl": "https://energyright.com/business-industry/incentives/",
      "sourceUrlsChecked": [
        "https://energyright.com/business-industry/incentives/",
        "https://energyright.com/business-industry/incentives/applying-for-incentives/",
        "https://energyright.com/business-industry/incentives/hvac/",
        "https://energyright.com/business-industry/incentives/refrigeration/",
        "https://energyright.com/business-industry/incentives/led-lights/",
        "https://energyright.com/business-industry/incentives/electric-forklifts/",
        "https://energyright.com/business-industry/incentives/thermal-storage/",
        "https://energyright.com/business-industry/incentives/commissioning/",
        "https://energyright.com/business-industry/incentives/vsd/",
        "https://energyright.com/business-industry/incentives/compressed-air-incentive/"
      ],
      "evidenceText": "Official TVA pages list active business incentives for HVAC, VSDs, refrigeration, LED lighting, electric forklifts, thermal ice storage, commissioning, compressed air and custom projects. Eligibility is tied to TVA local power company or direct-served commercial and industrial customers.",
      "reasoningNotes": "Same current TVA regional program as the companion TVA records; state changes only the TVA-served geography."
    },
    "existingSimpleRules": [
      {
        "id": "oir_39b609a36bb08a2a_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 2800,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$28 per eligible unit",
        "evidenceText": "Up to $28/fixture with several qualifying fixture types",
        "sourceUrlsChecked": [
          "https://energyright.com/business-industry/incentives/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1544",
    "opportunityName": "Texas-New Mexico Power Company - Commercial Market Transformation Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1544/texas-new-mexico-power-company-commercial-market-transformation-program",
    "websiteUrl": "https://tnmp.com/energy-efficiency/commercial/large",
    "applicationUrl": null,
    "administrator": "Texas-New Mexico Power",
    "programType": "Commercial Market Transformation Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "building_automation_system",
        "displayName": "Building automation system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "building automation"
        ]
      },
      {
        "retrofitTypeId": "exterior_site_lighting_retrofit",
        "displayName": "Exterior/site lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "exterior lighting"
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "high efficiency hvac",
          "air conditioner"
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
          "Texas-New Mexico Power electric delivery service territory"
        ],
        "notes": "Eligible TNMP nonresidential distribution customers in Texas."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "industrial_electric_customer",
        "project_sponsor",
        "contractor",
        "public_customer",
        "nonprofit_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "building_automation_system",
        "exterior_site_lighting_retrofit",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "chiller_replacement",
        "motor_retrofit",
        "variable_frequency_drive_retrofit",
        "insulation_upgrade",
        "cool_roof_reflective_roof",
        "solar_pv_system",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Project must serve a TNMP nonresidential electric customer.",
        "Incentives are based on eligible electric demand or energy savings.",
        "Project sponsor documentation and program approval are required."
      ],
      "blockers": [
        "Commercial dishwashers are not listed as prescriptive measures.",
        "Refrigeration should only match if approved as custom.",
        "Do not infer residential eligibility."
      ],
      "programType": "Commercial Market Transformation Incentive Program",
      "administrator": "Texas-New Mexico Power",
      "applicationUrl": null,
      "websiteUrl": "https://tnmp.com/energy-efficiency/commercial/large",
      "sourceUrlsChecked": [
        "https://tnmp.com/energy-efficiency/commercial/large"
      ],
      "evidenceText": "TNMP's]( commercial page lists LED lighting, controls, HVAC, chillers, motors, VFDs, building envelope, roofing, solar PV, and custom measures.",
      "reasoningNotes": "Removed foodservice and refrigeration prescriptive matches except custom approval."
    },
    "existingSimpleRules": [
      {
        "id": "oir_deb978c6a911784c_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kw",
          "amountCentsPerKw": 40000,
          "kwSource": "system_kw"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$400 per kW",
        "evidenceText": "The final incentive amount is calculated based on the annual energy savings identified—$400 per kilowatt saved or $0",
        "sourceUrlsChecked": [
          "https://tnmp.com/energy-efficiency/commercial/large"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "solar_electric_offset",
          "incentiveValueMethod": "per_kw",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null,
          "businessRelevance": "mixed",
          "v1Readiness": "needs_bill_data"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22125",
    "opportunityName": "TVA - Commercial Energy Efficiency Rebate Program",
    "state": "VA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22125/tva-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://energyright.com/business-industry/incentives/",
    "applicationUrl": "https://energyright.com/business-industry/incentives/getting-started/",
    "administrator": "TVA EnergyRight",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "electric_forklift_material_handling",
        "displayName": "Electric forklift / material handling equipment",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electric forklift"
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
          "led lighting",
          "led lamp"
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
        "retrofitTypeId": "refrigeration_ec_motor_retrofit",
        "displayName": "Refrigeration EC motor retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ec motor",
          "evaporator fan"
        ]
      },
      {
        "retrofitTypeId": "retro_commissioning_study",
        "displayName": "Retro-commissioning study",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "commissioning"
        ]
      },
      {
        "retrofitTypeId": "thermal_energy_storage",
        "displayName": "Thermal energy storage",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ice storage"
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
          "TVA local power company customers",
          "TVA direct-served customers"
        ],
        "notes": "Limited to TVA-served business customers in the Virginia portion of the Tennessee Valley; local power company participation and funding apply."
      },
      "eligibleApplicantTypes": [
        "business_electric_customers",
        "commercial_customers",
        "industrial_customers",
        "tva_direct_served_customers",
        "local_power_company_business_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "municipal",
        "federal",
        "agricultural",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_ec_motor_retrofit",
        "refrigeration_controls_retrofit",
        "electric_forklift_material_handling",
        "thermal_energy_storage",
        "variable_frequency_drive_retrofit",
        "retro_commissioning_study",
        "efficient_compressed_air_system",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Must be a TVA local power company business customer or TVA direct-served customer with a qualifying electric-saving project.",
        "Standard projects must be installed or submitted through a TVA Preferred Partners Network member unless TVA rules allow otherwise.",
        "Preapproval is required before removing, purchasing or installing equipment when the measure requires preapproval; formal Application Approval Notice controls eligibility.",
        "Equipment must meet measure-specific minimum efficiency and documentation requirements.",
        "Minimum incentive amounts apply: $150 standard application and $1500 custom application.",
        "Incentives are capped at 70% of material cost and $3000000 per organization per TVA fiscal year."
      ],
      "blockers": [
        "No official TVA business and industry incentive source checked supports broad low-flow plumbing fixture retrofits under this rebate; do not match low_flow_fixture_retrofit.",
        "Residential EnergyRight rebates, Smart Energy Starter Kits, demand response, renewable or solar programs and financing are separate programs and should not match this opportunity.",
        "Projects are subject to TVA and local power company approval, available funding and compliance with applicable laws.",
        "VSD prescriptive incentives are for qualifying existing HVAC applications; other VSD uses may need custom review."
      ],
      "programType": "Rebate Program",
      "administrator": "TVA EnergyRight",
      "applicationUrl": "https://energyright.com/business-industry/incentives/getting-started/",
      "websiteUrl": "https://energyright.com/business-industry/incentives/",
      "sourceUrlsChecked": [
        "https://energyright.com/business-industry/incentives/",
        "https://energyright.com/business-industry/incentives/applying-for-incentives/",
        "https://energyright.com/business-industry/incentives/hvac/",
        "https://energyright.com/business-industry/incentives/refrigeration/",
        "https://energyright.com/business-industry/incentives/led-lights/",
        "https://energyright.com/business-industry/incentives/electric-forklifts/",
        "https://energyright.com/business-industry/incentives/thermal-storage/",
        "https://energyright.com/business-industry/incentives/commissioning/",
        "https://energyright.com/business-industry/incentives/vsd/",
        "https://energyright.com/business-industry/incentives/compressed-air-incentive/"
      ],
      "evidenceText": "Official TVA pages list active business incentives for HVAC, VSDs, refrigeration, LED lighting, electric forklifts, thermal ice storage, commissioning, compressed air and custom projects. Eligibility is tied to TVA local power company or direct-served commercial and industrial customers.",
      "reasoningNotes": "Same current TVA regional program as the companion TVA records; state changes only the TVA-served geography."
    },
    "existingSimpleRules": [
      {
        "id": "oir_fd5c9abaaa732a9e_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 2800,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$28 per eligible unit",
        "evidenceText": "Up to $28/fixture with several qualifying fixture types",
        "sourceUrlsChecked": [
          "https://energyright.com/business-industry/incentives/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2325",
    "opportunityName": "Residential Energy Efficiency Rebate Programs",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2325/residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.efficiencyvermont.com/rebates",
    "applicationUrl": "https://www.efficiencyvermont.com/rebates/list?cat=&hvacfilter=&type=res",
    "administrator": "Efficiency Vermont",
    "programType": "Residential Rebates, Instant Discounts, Partner Offers, And Energy Services",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
          "VT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Efficiency Vermont service territory"
        ],
        "notes": "Statewide Vermont efficiency utility service territory; some rebates depend on building type, income, contractor network, partner, or local electric utility participation."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "rental_property_owner",
        "income_qualified_household",
        "renter"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "diy_weatherization_materials",
        "energy_audit",
        "virtual_home_energy_visit",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "ducted_heat_pump",
        "air_to_water_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "heat_pump_clothes_dryer",
        "window_air_conditioner",
        "biomass_wood_pellet_heating",
        "efficient_pool_pump",
        "air_purifier"
      ],
      "hardRequirements": [
        "Applicant must be in the Efficiency Vermont service territory and meet the specific rebate's building-type and customer rules.",
        "Home Performance with ENERGY STAR requires eligible existing homes or rental buildings and work by an Efficiency Excellence Network contractor.",
        "DIY weatherization incentives apply only to qualifying weather-stripping, insulation, and air-sealing materials.",
        "Heat pump, water heater, appliance, thermostat, and advanced wood heating offers require qualifying models and program documentation.",
        "Income-qualified weatherization assistance depends on household eligibility and available funding."
      ],
      "blockers": [
        "Biomass support is advanced wood or pellet heating, not biomass or biogas electric generation and not a solar category.",
        "Broad residential LED lighting was not verified; business lighting and indoor growing offers should not create a general home LED retrofit match.",
        "No current official low-flow fixture rebate was verified for this residential opportunity.",
        "Window air conditioner offers do not support window replacement.",
        "EV charging appears as a partner or transportation offer and should not be merged into building retrofit categories unless separately modeled."
      ],
      "programType": "Residential Rebates, Instant Discounts, Partner Offers, And Energy Services",
      "administrator": "Efficiency Vermont",
      "applicationUrl": "https://www.efficiencyvermont.com/rebates/list?cat=&hvacfilter=&type=res",
      "websiteUrl": "https://www.efficiencyvermont.com/rebates",
      "sourceUrlsChecked": [
        "https://www.efficiencyvermont.com/rebates",
        "https://www.efficiencyvermont.com/rebates/list?cat=&hvacfilter=&type=res",
        "https://www.efficiencyvermont.com/rebates/list/home-performance-with-energy-star",
        "https://www.efficiencyvermont.com/rebates/list/diy-weatherization",
        "https://www.efficiencyvermont.com/rebates/list/income-qualified-weatherization-assistance-program",
        "https://www.efficiencyvermont.com/news-blog/news/efficiency-vermont-announces-2026-rebates-to-help-vermonters-achieve-their-home-energy-goals-in-the-new-year"
      ],
      "evidenceText": "Efficiency Vermont lists residential weatherization, insulation, heat pumps, heat pump water heaters, smart thermostats, dryers, window A/C, wood pellet heating, pool pumps, and air purifiers.",
      "reasoningNotes": "The repair preserves active residential rebate families but narrows biomass, lighting, low-flow fixtures, and windows. Window replacement and low-flow fixtures were not verified in current official residential sources."
    },
    "existingSimpleRules": [
      {
        "id": "oir_5708b72504c998cc_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 100000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $1,000 per heat pump water heater",
        "evidenceText": "Efficiency Vermont rebate list shows heat pump water heaters with up to $1,000 off.",
        "sourceUrlsChecked": [
          "https://www.efficiencyvermont.com/rebates",
          "https://www.efficiencyvermont.com/rebates/list"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Confidence is medium because income and product pathway can affect final amount.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_b7c8e5c9303a8daa_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 950000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $9,500 off Home Performance insulation and air-sealing project costs",
        "evidenceText": "Efficiency Vermont Home Performance with ENERGY STAR materials list up to $9,500 off insulation and air sealing.",
        "sourceUrlsChecked": [
          "https://www.efficiencyvermont.com/rebates/list/home-performance-with-energy-star",
          "https://www.efficiencyvermont.com/rebates"
        ],
        "reasoningNotes": "Matched insulation, air sealing and weatherization terms. Amount was scheduled to decrease July 1, 2026, so use only for current pre-July applications.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2202",
    "opportunityName": "Benton PUD - Residential Energy Efficiency Rebate Programs",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2202/benton-pud-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.bentonpud.org/rebates-savings/rebates/residential-rebates",
    "applicationUrl": null,
    "administrator": "Benton PUD",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
          "Benton County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Benton PUD electric service territory"
        ],
        "notes": "Limited to installations in the Benton PUD service area."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners",
        "renters",
        "multifamily_property_owners"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "residential_clothes_washer",
        "electric_clothes_dryer",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "communicating_line_voltage_thermostat",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "packaged_terminal_heat_pump",
        "insulation_upgrade",
        "door_replacement",
        "window_replacement"
      ],
      "hardRequirements": [
        "Equipment must be installed in Benton PUD service territory and applications generally must be submitted within six months.",
        "Heat pump, ductless heat pump, insulation, doors, and windows require approved contractors.",
        "Many HVAC, thermostat, insulation, door, and window rebates require electrically heated homes.",
        "Heat pump water heaters must replace an electric tank-style water heater in an existing eligible home."
      ],
      "blockers": [
        "Current official page does not list duct sealing or broad air sealing as rebate categories.",
        "Level 2 EV charger rebate is a small BPA-qualified charger rebate, not broad EV infrastructure make-ready support.",
        "Residential washer and dryer rebates should not match commercial laundry, commercial kitchen, or industrial equipment.",
        "Program is effective until funding expires."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Benton PUD",
      "applicationUrl": null,
      "websiteUrl": "https://www.bentonpud.org/rebates-savings/rebates/residential-rebates",
      "sourceUrlsChecked": [
        "https://www.bentonpud.org/Energy-Programs/Rebates/Residential",
        "https://www.bentonpud.org/rebates-savings/rebates/residential-rebates"
      ],
      "evidenceText": "Benton PUD’s current residential page lists clothes washers and dryers, heat pump water heaters, thermostats, Level 2 EV chargers, heat pumps, ductless systems, packaged terminal heat pumps, insulation, doors and windows.",
      "reasoningNotes": "Removed unsupported duct sealing and broad weatherization while keeping specific thermostat, EV, heat pump, appliance, and envelope categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1ea98c5a7b8a508b_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 25000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$250 per eligible unit",
        "evidenceText": "To Qualify for Your Rebate: Verify Level 2 Charger is listed on BPA qualified products list Install Level 2 EV Charger in Benton PUD service area Complete Level 2 Charger form Complete a EV Charger Rebate Application online within six months of purchase Benton PUD also offers $250 rebates for leased or owned fully electric cars",
        "sourceUrlsChecked": [
          "https://www.bentonpud.org/Energy-Programs/Rebates/Residential"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null,
          "businessRelevance": "residential_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4583",
    "opportunityName": "Lodi Electric Utility - Commercial Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4583/lodi-electric-utility-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.lodi.gov/906/Commercial-Rebates",
    "applicationUrl": null,
    "administrator": "Lodi Electric Utility",
    "programType": "Commercial Energy-Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "dc fast",
          "fast charger"
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
          "ev charger"
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
          "air conditioner"
        ]
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
        "retrofitTypeId": "led_lighting_retrofit",
        "displayName": "LED lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
          "level-2",
          "level ii"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [],
        "cities": [
          "Lodi"
        ],
        "utilityTerritories": [
          "Lodi Electric Utility"
        ],
        "notes": "For eligible Lodi Electric Utility business customers; applications are obtained through the utility or Direct Efficiency."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business_owner",
        "commercial_property_owner",
        "multifamily_property_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "custom_energy_efficiency_project",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "high_efficiency_refrigeration_equipment",
        "commercial_dishwasher",
        "commercial_kitchen_equipment",
        "commercial_kitchen_demand_ventilation_control",
        "high_efficiency_laundry_equipment"
      ],
      "hardRequirements": [
        "Applicant must be a Lodi Electric Utility commercial or industrial customer unless the specific multifamily washer measure applies.",
        "Business customers must call or email Lodi Electric Utility to receive a program application.",
        "Lighting and custom projects require preapproval and are capped at 50 percent of project cost up to the stated maximum.",
        "Eligible HVAC includes central air conditioning, heat pumps and PTAC or PTHP equipment.",
        "Eligible foodservice and grocery equipment must match the commercial equipment list."
      ],
      "blockers": [
        "Level 2 and DC fast EV charging are separate Lodi Electric vehicle programs and should not be matched to this commercial efficiency rebate.",
        "Clothes washer matching is limited to multifamily clothes washers, not general residential laundry or water-conservation retrofits.",
        "Do not match residential HPWH, residential appliances or home weatherization.",
        "Custom projects require preapproval and cannot be assumed eligible without utility review."
      ],
      "programType": "Commercial Energy-Efficiency Rebate Program",
      "administrator": "Lodi Electric Utility",
      "applicationUrl": null,
      "websiteUrl": "https://www.lodi.gov/906/Commercial-Rebates",
      "sourceUrlsChecked": [
        "https://www.lodi.gov/906/Commercial-Rebates",
        "https://www.directefficiency.com/Lodi"
      ],
      "evidenceText": "Lodi’s]( commercial rebate page lists lighting, custom projects, heating and cooling, commercial kitchens and foodservice, heat-pump water heaters and multifamily clothes washers; EVs are linked separately.",
      "reasoningNotes": "Removed EV charger categories because they are outside the commercial efficiency rebate page. Laundry was narrowed to multifamily washers and the program was restricted to business customers."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2fb7a80fbb24c904_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 400000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$4,000 per commercial or multifamily DC fast charger",
        "evidenceText": "Lodi EV rebates list DC Fast Charger - Commercial/Multi-Family $4,000.",
        "sourceUrlsChecked": [
          "https://www.lodi.gov/1143/EV-Charger-and-Installation-Rebates",
          "https://www.lodi.gov/906/Commercial-Rebates"
        ],
        "reasoningNotes": "Matched DC fast charger terms. Returned as a separate candidate from the Level II charger incentive.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f0487c74dda86489_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 300000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$3,000 per commercial Level II EV charger",
        "evidenceText": "Lodi EV rebates list Level II EV Charger - Commercial $3,000.",
        "sourceUrlsChecked": [
          "https://www.lodi.gov/1143/EV-Charger-and-Installation-Rebates",
          "https://www.lodi.gov/906/Commercial-Rebates"
        ],
        "reasoningNotes": "Matched EV charger and Level 2 terms. This applies to the charger hardware rebate, separate from installation rebates.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  }
]
