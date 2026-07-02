You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 11
Targets in this prompt: 201-220 of 984
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
  "batchNumber": 11,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:5708"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1715",
    "opportunityName": "IID Energy - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1715/iid-energy-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.iid.com/customer-service/save-energy-and-money/your-home/residential-rebates",
    "applicationUrl": null,
    "administrator": "Imperial Irrigation District",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "mini split",
          "ductless"
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
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Imperial Irrigation District electric service territory"
        ],
        "notes": "Limited to residential electric customers served by IID."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "iid_electric_customer",
        "homeowner",
        "tenant_with_required_permission"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ductless_mini_split_hvac",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "energy_star_clothes_washer",
        "energy_star_electric_clothes_dryer",
        "residential_refrigerator",
        "attic_insulation_upgrade",
        "dual_pane_window_replacement",
        "smart_thermostat",
        "room_air_conditioner",
        "evaporative_cooler",
        "variable_speed_pool_pump",
        "solar_attic_fan",
        "radiant_barrier"
      ],
      "hardRequirements": [
        "Products generally must be purchased and installed during the program year and submitted by IID deadlines.",
        "Applications require invoice or receipt with brand and model and evidence that measure requirements are met.",
        "Many HVAC and envelope measures require IID participating contractors unless self-install rules apply.",
        "Gas dryers do not qualify for the electric clothes dryer rebate."
      ],
      "blockers": [
        "high_efficiency_refrigeration_equipment must be narrowed to residential refrigerators, not commercial refrigeration.",
        "Laundry equipment is residential clothes washers and electric dryers, not commercial laundry.",
        "EV charging is a separate IID offering and should not be matched to this residential rebate page."
      ],
      "programType": "Rebate Program",
      "administrator": "Imperial Irrigation District",
      "applicationUrl": null,
      "websiteUrl": "https://www.iid.com/customer-service/save-energy-and-money/your-home/residential-rebates",
      "sourceUrlsChecked": [
        "https://www.iid.com/customer-service/save-energy-and-money/your-home/residential-rebates",
        "https://programs.dsireusa.org/system/program/detail/1715/iid-energy-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "IID's residential rebate page lists 2026 home rebates for mini-splits, HVAC, heat pump gas-to-electric conversion, attic insulation, refrigerators, clothes washers, electric dryers and thermostats.",
      "reasoningNotes": "Added product-specific IID categories and kept residential-only boundaries to avoid commercial refrigeration or laundry matches."
    },
    "existingSimpleRules": [
      {
        "id": "oir_5ff95322d1d1be4b_v1",
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
        "formula": "$400 per eligible unit",
        "evidenceText": "HVAC – Gas to Electric Rebate Requirements $400/ton Must meet the following to qualify: 1) Electric heat pump HVAC system must be new and replace a gas furnace HVAC system",
        "sourceUrlsChecked": [
          "https://www.iid.com/customer-service/save-energy-and-money/your-home/residential-rebates"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null,
          "businessRelevance": "residential_only",
          "v1Readiness": "not_v1_relevant"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1916",
    "opportunityName": "SMUD - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1916/smud-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home",
    "applicationUrl": null,
    "administrator": "Sacramento Municipal Utility District",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Sacramento Municipal Utility District electric service territory"
        ],
        "notes": "Limited to active SMUD residential customers and eligible homes in SMUD's service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "resident"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "home_performance_air_sealing_insulation",
        "energy_star_clothes_washer",
        "energy_star_refrigerator",
        "induction_cooktop_range",
        "smart_thermostat",
        "electric_panel_upgrade_for_electrification"
      ],
      "hardRequirements": [
        "Resident or homeowner must be an active SMUD customer with an active SMUD account.",
        "Heat pump HVAC and heat pump water heater rebates must be submitted by qualified participating contractors through the SMUD Contractor Network.",
        "Heat pump HVAC must be qualifying two-stage or variable-stage equipment meeting SMUD requirements.",
        "Heat pump water heater projects require program specifications such as NEEA tier, mixing valve, permits and inspections where applicable."
      ],
      "blockers": [
        "induction_cooking_equipment is residential cooktop or range replacement, not commercial kitchen equipment.",
        "high_efficiency_refrigeration_equipment must be narrowed to ENERGY STAR residential refrigerator rebates, not commercial refrigeration.",
        "Clothes washer rebates apply only to ENERGY STAR residential washers at participating retailers.",
        "Do not infer general battery storage or solar incentives from this residential efficiency page."
      ],
      "programType": "Rebate Program",
      "administrator": "Sacramento Municipal Utility District",
      "applicationUrl": null,
      "websiteUrl": "https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home",
      "sourceUrlsChecked": [
        "https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home",
        "https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home/Home-Appliances-and-Electronics-Rebates",
        "https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home/Heating-and-Cooling-Rebates",
        "https://www.smud.org/Rebates-and-Savings-Tips/Improve-Home-Efficiency",
        "https://programs.dsireusa.org/system/program/detail/1916/smud-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "SMUD current home rebate pages list heat pump HVAC, heat pump water heaters, seal and insulate, ENERGY STAR refrigerator and clothes washer, induction cooking and smart thermostat rebates.",
      "reasoningNotes": "The original induction match was kept but narrowed from commercial kitchen equipment to residential cooktop or range replacement."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1365bcc8e726ea43_v1",
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
        "formula": "Up to $3,000 per qualifying heat pump HVAC system",
        "evidenceText": "SMUD heating and cooling page says it offers up to $3,000 in rebates on heat pump heating and cooling systems.",
        "sourceUrlsChecked": [
          "https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home/Heating-and-Cooling-Rebates",
          "https://www.smud.org/Corporate/About-us/News-and-Media/2026/2026/SMUD-boosts-rebates-for-heat-pumps"
        ],
        "reasoningNotes": "Matched heat pump HVAC. Confidence is high because official page gives exact maximum and requirements.",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_218a093ec6d8810f_v1",
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
        "formula": "$50 instant rebate per eligible smart thermostat",
        "evidenceText": "SMUD rebates page says customers can claim a $50 instant rebate when shopping smart thermostats online.",
        "sourceUrlsChecked": [
          "https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home"
        ],
        "reasoningNotes": "Matched smart thermostat term. Demand-response enrollment rewards are excluded.",
        "mapping": {
          "primarySavingsModelId": "hvac_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_2ee70d1aa60815ab_v1",
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
        "formula": "Up to $4,000 per qualifying heat pump water heater",
        "evidenceText": "SMUD appliance rebates page says qualifying heat pump water heaters can receive up to a $4,000 rebate.",
        "sourceUrlsChecked": [
          "https://www.smud.org/Rebates-and-Savings-Tips/Rebates-for-My-Home/Home-Appliances-and-Electronics-Rebates",
          "https://www.smud.org/Rebates-and-Savings-Tips/Improve-Home-Efficiency"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Returned separately from HVAC heat pump.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2264",
    "opportunityName": "Coweta-Fayette EMC - Residential Energy Efficiency Rebate Program",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2264/coweta-fayette-emc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://utility.org/smart-choice-home/",
    "applicationUrl": null,
    "administrator": "Coweta-Fayette Electric Membership Corporation",
    "programType": "Rebate And Assessment",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "electric vehicle charging"
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
          "GA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Coweta-Fayette EMC residential electric service territory"
        ],
        "notes": "Rebates apply to qualifying Coweta-Fayette EMC residential members under SmartChoice Existing Home rules."
      },
      "eligibleApplicantTypes": [
        "residential_electric_cooperative_member",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "energy_audit"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Coweta-Fayette EMC residential member.",
        "Existing Home rebate purchases must generally be within the last 12 months.",
        "EV charging rebate is for a Level 2 240-volt NRTL or UL approved charging station with NEMA 14-50 outlet.",
        "Programmable thermostat, heat pump or AC replacement, and HPWH measures must meet SmartChoice rebate requirements."
      ],
      "blockers": [
        "Generic EV charger matching is too broad; current rebate is for a qualifying Level 2 charger only.",
        "Commercial and industrial customers are not supported by this residential SmartChoice Home record.",
        "Do not match non-heat-pump water heaters or non-qualifying thermostats to the listed rebates."
      ],
      "programType": "Rebate And Assessment",
      "administrator": "Coweta-Fayette Electric Membership Corporation",
      "applicationUrl": null,
      "websiteUrl": "https://utility.org/smart-choice-home/",
      "sourceUrlsChecked": [
        "https://utility.org/smart-choice-home/"
      ],
      "evidenceText": "Coweta-Fayette]( EMC lists Existing Home rebates for programmable thermostats, Level 2 EV charging stations, heat pump or AC replacement, and heat pump water heaters.",
      "reasoningNotes": "Keep the Level 2 EV, HVAC, HPWH, thermostat, and assessment categories, with residential-only eligibility."
    },
    "existingSimpleRules": [
      {
        "id": "oir_48ddca15b30d924a_v1",
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
        "formula": "$100 per Level 2 NRTL/UL EV charging station",
        "evidenceText": "Coweta-Fayette SmartChoice existing home table lists a Level 2 EV charging station at $100.",
        "sourceUrlsChecked": [
          "https://utility.org/energy-efficiency/smart-choice-home/"
        ],
        "reasoningNotes": "Matched EV charging and Level 2 terms. Use one unit as one eligible charging station.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5707",
    "opportunityName": "TVA - Residential Energy Efficiency Rebate Program",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5707/tva-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://energyright.com/residential/rebates/",
    "applicationUrl": null,
    "administrator": "TVA EnergyRight",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioning"
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
          "GA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "TVA-served local power company territories in Georgia"
        ],
        "notes": "Not statewide Georgia; only homes served by participating TVA local power companies qualify."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "tenant_with_required_permission"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "attic_insulation_upgrade",
        "wall_insulation_upgrade",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "central_air_conditioner_replacement",
        "hvac_tune_up",
        "smart_thermostat_rewards"
      ],
      "hardRequirements": [
        "Customer must be served by a participating TVA local power company in the listed state.",
        "All rebate-eligible upgrades must be completed by a member of TVA's Quality Contractor Network.",
        "Contractor submits the rebate to TVA EnergyRight, and customer claims the rebate using a redemption code.",
        "Equipment and envelope work must meet TVA standards effective on the installation date."
      ],
      "blockers": [
        "The state field is not statewide eligibility; only TVA-served local power company territories qualify.",
        "Do not match non-TVA utility customers.",
        "Financing and assessments are separate EnergyRight services and should not be treated as physical rebate categories.",
        "Do not infer water-heater, solar, EV charging or appliance rebates from these residential rebate pages unless separately verified."
      ],
      "programType": "Rebate Program",
      "administrator": "TVA EnergyRight",
      "applicationUrl": null,
      "websiteUrl": "https://energyright.com/residential/rebates/",
      "sourceUrlsChecked": [
        "https://energyright.com/residential/rebates/",
        "https://energyright.com/residential/rebates/geothermal-heat-pump/",
        "https://energyright.com/residential/rebates/heat-pump/",
        "https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/",
        "https://energyright.com/residential/rebates/home-insulation-air-sealing/",
        "https://programs.dsireusa.org/system/program/detail/5707/tva-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "TVA EnergyRight current residential rebate pages list air sealing, insulation, duct sealing, HVAC tune-up, central AC, geothermal heat pump, mini-split and heat pump rebates through QCN contractors.",
      "reasoningNotes": "These five DSIRE state records share the same TVA EnergyRight residential rebate structure; geography differs by TVA-served territory in each state."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2b5cb0ab91cd2fa5_v1",
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
        "formula": "$300 for eligible duct sealing, duct insulation, repair, or replacement",
        "evidenceText": "TVA EnergyRight heat pump page lists duct sealing/repair, duct insulation, or replacement at $300.",
        "sourceUrlsChecked": [
          "https://energyright.com/residential/rebates/",
          "https://energyright.com/residential/rebates/heat-pump/"
        ],
        "reasoningNotes": "Matched duct sealing and insulation terms. Use as a project-level duct measure.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_4e9a4e6ee91acb76_v1",
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
        "confidence": "high",
        "formula": "$1,500 per eligible geothermal heat pump",
        "evidenceText": "TVA EnergyRight lists a $1,500 geothermal heat pump rebate.",
        "sourceUrlsChecked": [
          "https://energyright.com/residential/rebates/",
          "https://energyright.com/residential/rebates/geothermal-heat-pump/"
        ],
        "reasoningNotes": "Matched geothermal term. Use one unit as one qualifying system.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_a489e272c7eed472_v1",
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
        "confidence": "high",
        "formula": "$800 per 17+ SEER2 air-source or dual-fuel heat pump",
        "evidenceText": "TVA EnergyRight heat pump page lists 17+ SEER2 air-source or dual-fuel heat pumps at $800.",
        "sourceUrlsChecked": [
          "https://energyright.com/residential/rebates/",
          "https://energyright.com/residential/rebates/heat-pump/"
        ],
        "reasoningNotes": "Matched heat pump term. Returned separately from geothermal candidate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1368",
    "opportunityName": "Residential Energy Efficiency Rebate Program",
    "state": "HI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1368/residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://hawaiienergy.com/for-homes/rebates/",
    "applicationUrl": null,
    "administrator": "Hawaii Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "HI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Hawaii Energy residential electric utility ratepayer service area"
        ],
        "notes": "Eligible islands are Hawaii Island, Lanai, Maui, Molokai and Oahu. Kauai is excluded."
      },
      "eligibleApplicantTypes": [
        "residential_electric_utility_ratepayer",
        "homeowner",
        "tenant_with_required_permission"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "solar_water_heating_system",
        "solar_water_heater_tune_up",
        "heat_pump_water_heater",
        "heat_pump_water_heater_tune_up",
        "central_air_conditioner_retrofit",
        "air_conditioner_tune_up",
        "window_air_conditioner",
        "mini_split_vrf_air_conditioner",
        "residential_refrigerator_trade_up",
        "residential_refrigerator_freezer_recycling"
      ],
      "hardRequirements": [
        "Applicant must be a residential electric utility ratepayer on an eligible island.",
        "Rebates are first-come, first-served and subject to funds, restrictions and program changes.",
        "HVAC retrofit and tune-up rebates must use participating Clean Energy Ally contractors where required.",
        "Heat pump water heaters must be ENERGY STAR certified and within eligible size ranges for the instant rebate."
      ],
      "blockers": [
        "window_replacement is a false positive; the current residential measure is a window air conditioner rebate.",
        "variable_frequency_drive_retrofit is a business or industrial measure and is not part of the residential rebate page.",
        "high_efficiency_refrigeration_equipment must be narrowed to residential refrigerator trade-up or refrigerator/freezer recycling, not commercial refrigeration.",
        "Current appliances page promotes efficient washers and dryers but does not show a current washer or dryer rebate amount or application."
      ],
      "programType": "Rebate Program",
      "administrator": "Hawaii Energy",
      "applicationUrl": null,
      "websiteUrl": "https://hawaiienergy.com/for-homes/rebates/",
      "sourceUrlsChecked": [
        "https://hawaiienergy.com/for-homes/rebates/",
        "https://hawaiienergy.com/for-homes/rebates/appliances/",
        "https://hawaiienergy.com/for-homes/rebates/hvac/",
        "https://hawaiienergy.com/for-homes/rebates/water-heating/",
        "https://programs.dsireusa.org/system/program/detail/1368/residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Hawaii Energy residential rebates cover eligible islands and include solar and heat pump water heating, cooling rebates, window AC, mini-split VRF AC, refrigerator trade-up and Rid-A-Fridge recycling.",
      "reasoningNotes": "Heat pump water heating is retained; heat pump space heating, VFDs and window replacement are blocked as false-positive matches."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3ecc2bed2f3f6220_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 55000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "Up to $550 per residential mini-split AC unit",
        "evidenceText": "Hawaii Energy 2025-2026 rebate announcement lists Mini-Split AC at up to $550 per unit.",
        "sourceUrlsChecked": [
          "https://hawaiienergy.com/uncategorized/hawaii-energy-launches-2025-2026-rebates-for-homes-and-businesses/",
          "https://hawaiienergy.com/for-homes/rebates/hvac/"
        ],
        "reasoningNotes": "Matched mini-split and air-conditioning terms. Source uses up to, so final amount depends on equipment.",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_77b88248ec0e0de2_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 70000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "Up to $700 per residential heat pump water heater",
        "evidenceText": "Hawaii Energy water-heating page lists heat pump water heater instant rebates up to $700.",
        "sourceUrlsChecked": [
          "https://hawaiienergy.com/for-homes/rebates/water-heating/",
          "https://hawaiienergy.com/for-homes/rebates/"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Returned separately from refrigerator trade-up.",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_7c0ca2e355ea4598_v1",
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
        "confidence": "high",
        "formula": "$250 per ENERGY STAR refrigerator trade-up",
        "evidenceText": "Hawaii Energy appliance rebate page lists a $250 rebate for qualifying ENERGY STAR refrigerator trade-up.",
        "sourceUrlsChecked": [
          "https://hawaiienergy.com/for-homes/rebates/appliances/",
          "https://hawaiienergy.com/for-homes/rebates/"
        ],
        "reasoningNotes": "Matched refrigerator/refrigeration term. Requires trade-in of a working old refrigerator.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22485",
    "opportunityName": "Linn County Rural Electric Cooperative - Commercial (>75KW) Energy Efficiency Rebate Program",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22485/linn-county-rural-electric-cooperative-commercial-75kw-energy-efficiency-rebate-program",
    "websiteUrl": "https://corridorenergy.coop/rebates/commercial-custom/",
    "applicationUrl": null,
    "administrator": "Corridor Energy Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
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
          "level-2"
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
          "IA"
        ],
        "counties": [
          "Linn",
          "Johnson",
          "Jones",
          "Cedar",
          "Iowa",
          "Benton"
        ],
        "cities": [],
        "utilityTerritories": [
          "Corridor Energy Cooperative",
          "Linn County Rural Electric Cooperative"
        ],
        "notes": "Linn County REC now operates as Corridor Energy Cooperative. Service is primarily rural and suburban Linn and Johnson counties, with line extensions into nearby counties."
      },
      "eligibleApplicantTypes": [
        "large_commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "electric_cooperative_member"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "commercial_heat_pump_vrf_system",
        "air_source_heat_pump_hvac",
        "ground_source_geothermal_heat_pump",
        "ductless_mini_split_heat_pump",
        "level_2_ev_charger_installation",
        "commercial_level_2_forklift_charger",
        "variable_frequency_drive_retrofit",
        "custom_demand_reduction_project"
      ],
      "hardRequirements": [
        "Program is designated for large commercial, industrial, and agricultural accounts with greater than 75 kW non-coincident 15-minute demand in specified summer and winter months.",
        "Custom projects must be on eligible commercial rate classes and require preapproval.",
        "Commercial heat pumps and VRF systems must meet the applicable program specifications and documentation requirements.",
        "Level 2 EV and forklift chargers must be served by Corridor Energy Cooperative and are capped per program rules.",
        "VFDs must serve qualifying fans or pumps and meet minimum operating-hour requirements."
      ],
      "blockers": [
        "Do not match residential or small commercial accounts below the demand threshold.",
        "Generic EV charger installation must be narrowed to Level 2 or eligible forklift chargers.",
        "VFD rebates are not for failed-drive replacements, soft-start-only applications, or power-factor-only improvements.",
        "Do not treat broad HVAC replacement as eligible unless it is a qualifying heat pump or VRF measure."
      ],
      "programType": "Rebate Program",
      "administrator": "Corridor Energy Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://corridorenergy.coop/rebates/commercial-custom/",
      "sourceUrlsChecked": [
        "https://corridorenergy.coop/rebates/commercial-custom/",
        "https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-Heat-Pumps.pdf",
        "https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-Rebate-Flyer.pdf",
        "https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-VFD.pdf",
        "https://corridorenergy.coop/wp-content/uploads/2026/01/2026-Commercial-EV-Charger.pdf",
        "https://programs.dsireusa.org/system/program/detail/22485/linn-county-rural-electric-cooperative-commercial-75kw-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Corridor Energy lists large commercial, industrial, and agricultural incentives for heat pumps and VRF, custom demand-reduction projects, Level 2 chargers, forklift chargers, and VFDs.",
      "reasoningNotes": "The former Linn County REC program remains active under Corridor Energy Cooperative branding with large-account and measure-specific limits."
    },
    "existingSimpleRules": [
      {
        "id": "oir_dc33cb243140bab7_v1",
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
        "formula": "$1,000 per eligible unit",
        "evidenceText": "Level II EV Charger Rebate for Electric Vehicle Level II Chargers $1000 per charger (up to four) Must be a Level II charger requiring a 240/208 volt input supply Primary location of the charging unit must be served by Corridor Energy Cooperative Rebate for Level II Forklift Chargers $1000 per charger (up to four) Must be a Levell II charger",
        "sourceUrlsChecked": [
          "https://www.linncountyrec.com/energy-solutions/rebates/commercial-rebates"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null,
          "businessRelevance": "business_relevant",
          "v1Readiness": "needs_quote"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4128",
    "opportunityName": "Nicor Gas - Residential Energy Efficiency Rebates",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4128/nicor-gas-residential-energy-efficiency-rebates",
    "websiteUrl": "https://www.nicorgas.com/ways-to-save/residential-savings/rebates.html",
    "applicationUrl": "https://www.nicorgas.com/ways-to-save/residential-savings/rebates.html",
    "administrator": "Nicor Gas",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "IL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Nicor Gas residential natural gas service territory"
        ],
        "notes": "Applies to eligible Nicor Gas residential natural-gas customers in Illinois; does not cover customers served by other Illinois gas utilities such as Peoples Gas."
      },
      "eligibleApplicantTypes": [
        "Nicor Gas residential customers",
        "homeowners",
        "residential account holders",
        "landlords for eligible residential properties",
        "multifamily property owners where eligible",
        "program-approved contractors for installed measures"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential_limited",
        "low_income_residential_limited"
      ],
      "eligibleRetrofitCategories": [
        "smart_thermostat",
        "natural_gas_furnace",
        "natural_gas_boiler",
        "combination_boiler_water_heater",
        "natural_gas_storage_water_heater",
        "tankless_natural_gas_water_heater",
        "air_sealing",
        "attic_insulation",
        "wall_insulation",
        "foundation_or_rim_joist_insulation",
        "duct_sealing",
        "low_e_storm_window_inserts",
        "high_performance_windows",
        "pool_cover_limited"
      ],
      "hardRequirements": [
        "Applicant must be a current residential Nicor Gas customer.",
        "Gas heating and water-heating rebates require qualifying natural-gas equipment meeting the current efficiency criteria.",
        "Smart thermostats must be approved or ENERGY STAR/Wi-Fi capable as required and installed on eligible residential-sized natural-gas space-heating equipment.",
        "Air sealing and insulation incentives require work by a program-approved contractor and measure-specific program requirements.",
        "The current residential fact sheet identifies 2026 rebate availability and measure categories; funding and terms may change.",
        "The stale DSIRE website URL ending in rebates.html.html should not be used as the current application page."
      ],
      "blockers": [
        "The DSIRE website URL https://www.nicorgas.com/residential/ways-to-save/rebates.html.html returned 404 and has been replaced by current Nicor Gas residential savings URLs.",
        "Electric heat pumps, EV charging, lighting, commercial kitchen equipment and commercial HVAC measures are not supported by this residential natural-gas record.",
        "Duct sealing and insulation are retained only through Nicor Gas residential weatherization pathways, not as general electric HVAC duct rebates.",
        "Window terms are limited to current Nicor residential low-e storm window insert or high-performance window weatherization incentives, not broad commercial window replacement.",
        "This residential record should not be merged with Nicor Gas commercial energy-efficiency rebates."
      ],
      "programType": "Rebate Program",
      "administrator": "Nicor Gas",
      "applicationUrl": "https://www.nicorgas.com/ways-to-save/residential-savings/rebates.html",
      "websiteUrl": "https://www.nicorgas.com/ways-to-save/residential-savings/rebates.html",
      "sourceUrlsChecked": [
        "https://www.nicorgas.com/residential/ways-to-save/rebates.html.html",
        "https://www.nicorgas.com/ways-to-save/residential-savings/rebates.html",
        "https://www.nicorgas.com/content/dam/southern-co-gas/nicor-gas/docs/energy-efficiency/residential/20251218-heer-residential-fact-sheet.pdf",
        "https://www.nicorgas.com/ways-to-save/residential-savings/rebates/air-sealing-and-insulation-rebates.html",
        "https://programs.dsireusa.org/system/program/detail/4128/nicor-gas-residential-energy-efficiency-rebates"
      ],
      "evidenceText": "Nicor Gas's current residential rebate page and 2026 residential fact sheet list rebates for smart thermostats, furnaces, boilers, combination boilers, water heaters, pool covers, air sealing, insulation, duct sealing and window measures. The current sources state rebates are for current residential Nicor Gas customers and weatherization work must use approved contractors.",
      "reasoningNotes": "The program is active, but the old DSIRE-linked URL is stale. The repair uses the current Nicor Gas replacement pages and limits categories to residential natural-gas and residential weatherization measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_c28ec7d8e70a0544_v1",
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
        "formula": "$25 per qualifying smart thermostat",
        "evidenceText": "Nicor Gas rebate application materials list smart thermostats at $25.",
        "sourceUrlsChecked": [
          "https://www.nicorgas.com/residential/ways-to-save/rebates.html",
          "https://www.nicorgas.com/content/dam/southern-co-gas/documents/nicor-gas/2026-Rebate-Application-Form.pdf"
        ],
        "reasoningNotes": "Matched smart thermostat term. Use one unit as one eligible thermostat.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5727",
    "opportunityName": "NIPSCO (Gas & Electric) - Commercial & Industrial Energy Efficiency Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5727/nipsco-gas-and-electric-commercial-and-industrial-energy-efficiency-program",
    "websiteUrl": "https://www.nipsco.com/energy-efficiency/for-your-business",
    "applicationUrl": "https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/prescriptive-incentive-program/prescriptive-incentive-list.pdf",
    "administrator": "NIPSCO",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "boiler_controls_burner_retrofit",
        "displayName": "Boiler controls / burner retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "burner"
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
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "NIPSCO"
        ],
        "notes": "Available to eligible NIPSCO business gas and electric customers on qualifying rates in Indiana."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "government_customer",
        "institutional_customer",
        "nonprofit_customer",
        "small_business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "government",
        "institutional",
        "nonprofit",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_natural_gas_furnace",
        "high_efficiency_hot_water_boiler",
        "steam_boiler_replacement",
        "boiler_hot_water_lockout_reset_control",
        "boiler_tune_up",
        "furnace_tune_up",
        "commercial_heating_steam_trap_replacement",
        "pipe_insulation_for_gas_heating",
        "commercial_smart_thermostat",
        "high_efficiency_refrigeration_equipment",
        "refrigerated_display_case_led_lighting",
        "evaporator_fan_controls",
        "walk_in_cooler_freezer_controls",
        "door_heater_controls",
        "ecm_refrigeration_motors",
        "variable_speed_refrigeration_condenser_fans",
        "custom_energy_efficiency",
        "retrocommissioning"
      ],
      "hardRequirements": [
        "Applicant must be a NIPSCO business customer on an eligible electric or non-transport-only natural gas rate.",
        "Prescriptive incentives over the stated threshold require preapproval.",
        "Custom incentives require preapproval and must meet program rules.",
        "Small business direct-install projects must meet the program's replacement and completion requirements.",
        "Applications must be submitted within the applicable program deadline after project completion."
      ],
      "blockers": [
        "Do not match burner retrofit as a standalone category; current prescriptive materials support boilers, lockout/reset controls, tune-ups, furnaces, steam traps, and related gas measures.",
        "Refrigeration measures are commercial refrigeration measures, not residential refrigerators.",
        "Lighting measures must be eligible business measures and not residential lighting.",
        "Program eligibility depends on NIPSCO rate class and whether the customer has opted out.",
        "Steam trap measures are commercial heating measures, not compressed-air retrofits."
      ],
      "programType": "Rebate Program",
      "administrator": "NIPSCO",
      "applicationUrl": "https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/prescriptive-incentive-program/prescriptive-incentive-list.pdf",
      "websiteUrl": "https://www.nipsco.com/energy-efficiency/for-your-business",
      "sourceUrlsChecked": [
        "https://www.nipsco.com/energy-efficiency/for-your-business",
        "https://www.nipsco.com/energy-efficiency/for-your-business/small-business-direct-install-program",
        "https://www.nipsco.com/energy-efficiency/for-your-business/custom-incentive-program",
        "https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/prescriptive-incentive-program/prescriptive-incentive-list.pdf",
        "https://programs.dsireusa.org/system/program/detail/5727/nipsco-gas-and-electric-commercial-and-industrial-energy-efficiency-program"
      ],
      "evidenceText": "NIPSCO business materials list prescriptive and custom incentives for lighting, gas HVAC, boilers, controls, steam traps, pipe insulation, thermostats, refrigeration, custom projects, and retrocommissioning.",
      "reasoningNotes": "The boiler, refrigeration, lighting, and steam-trap matches are supported. The original burner match should be narrowed because no standalone burner retrofit was verified."
    },
    "existingSimpleRules": [
      {
        "id": "oir_07e35a9d9b1dfd91_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 18000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$180 per industrial steam trap replacement",
        "evidenceText": "NIPSCO 2026 prescriptive incentive list shows Industrial Steam Trap Replacement at $180 per trap.",
        "sourceUrlsChecked": [
          "https://www.nipsco.com/save-energy/business/prescriptive-gas-incentives",
          "https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/prescriptive-incentive-program/prescriptive-incentive-list.pdf"
        ],
        "reasoningNotes": "Distinct industrial steam trap value.",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_0ba7e3a551677164_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 7000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$70 per commercial heating steam trap replacement",
        "evidenceText": "NIPSCO 2026 prescriptive incentive list shows Commercial Heating Steam Trap Replacement at $70 per trap.",
        "sourceUrlsChecked": [
          "https://www.nipsco.com/save-energy/business/prescriptive-gas-incentives",
          "https://www.nipsco.com/docs/librariesprovider11/energy-efficiency/prescriptive-incentive-program/prescriptive-incentive-list.pdf"
        ],
        "reasoningNotes": "Matched steam trap term. Commercial heating steam trap is the safer general commercial candidate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5819",
    "opportunityName": "Washington Gas - Residential Rebate Program",
    "state": "MD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5819/washington-gas-residential-rebate-program",
    "websiteUrl": "https://wgsmartsavings.com/programs-rebates/home/md",
    "applicationUrl": "https://wghomesavings.com/",
    "administrator": "Washington Gas",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "existing_simple_rule_v2_repair",
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
          "Washington Gas"
        ],
        "notes": "Maryland residential Washington Gas customers under EmPOWER Maryland."
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
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "combination_heating_unit",
        "furnace_boiler_tune_up",
        "high_efficiency_gas_water_heater",
        "gas_storage_water_heater",
        "gas_tankless_water_heater",
        "residential_gas_clothes_dryer",
        "insulation_upgrade",
        "lighting_retrofit",
        "home_energy_audit",
        "weatherization_assistance",
        "furnace_safety_repair",
        "refrigerator_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Washington Gas Maryland residential customer for direct residential rebates.",
        "Existing home heating, water-heating and tune-up rebates require qualifying gas equipment and participating-contractor submission.",
        "Furnaces, boilers and water heaters must meet listed ENERGY STAR, AFUE or UEF criteria.",
        "Income-qualified weatherization is administered through Maryland DHCD programs and requires income or property eligibility.",
        "Multifamily income-qualified offerings require applicable affordable-housing eligibility."
      ],
      "blockers": [
        "Automated demand response should not match because Smart Energy Rewards ended March 31, 2026.",
        "No broad HVAC replacement beyond listed gas furnace, boiler, combination heating unit and tune-up measures.",
        "No electric heat pump rebate in this residential gas program.",
        "Insulation and broader weatherization are limited to income-qualified or DHCD-administered pathways."
      ],
      "programType": "Rebate Program",
      "administrator": "Washington Gas",
      "applicationUrl": "https://wghomesavings.com/",
      "websiteUrl": "https://wgsmartsavings.com/programs-rebates/home/md",
      "sourceUrlsChecked": [
        "https://wgsmartsavings.com/programs-rebates/home/md",
        "https://wgsmartsavings.com/programs-rebates/md/home-heating",
        "https://wgsmartsavings.com/programs-rebates/md/water-heaters",
        "https://wgsmartsavings.com/programs-rebates/md/smart-energy-rewards",
        "https://wgsmartsavings.com/programs-rebates/md/income-qualifying-energy-efficiency-program",
        "https://wghomesavings.com/"
      ],
      "evidenceText": "Maryland residential pages verify gas furnace, boiler, water-heater, tune-up and clothes-dryer rebates plus DHCD income-qualified weatherization. Smart Energy Rewards shows an end date of March 31, 2026.",
      "reasoningNotes": "Kept gas equipment, selected income-qualified weatherization and audit pathways; blocked demand response because the current source marks that offer ended."
    },
    "existingSimpleRules": [
      {
        "id": "oir_96c09a54edd6f837_v1",
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
        "evidenceText": "Washington Gas home savings materials list Smart Thermostat, ENERGY STAR Certified, at $50.",
        "sourceUrlsChecked": [
          "https://wgsmartsavings.com/programs-rebates/home/md",
          "https://wghomesavings.com/",
          "https://www.washingtongas.com/safety-education/education/netzeroenergyhomes"
        ],
        "reasoningNotes": "Matched smart thermostat term. Use one unit as one eligible thermostat.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4299",
    "opportunityName": "Consumers Energy (Electric) - Commercial Energy Efficiency Program",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4299/consumers-energy-electric-commercial-energy-efficiency-program",
    "websiteUrl": "https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts",
    "applicationUrl": "https://consumers-energy.clearesult.com/",
    "administrator": "Consumers Energy",
    "programType": "Business Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "MI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Consumers Energy Michigan business electric service territory"
        ],
        "notes": "Limited to eligible Consumers Energy business customers; individual measure eligibility may depend on electric or gas service and rate class."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business_customer",
        "industrial_customer",
        "agricultural_customer",
        "nonprofit"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "networked_lighting_controls",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_retrofit",
        "efficient_ice_machine",
        "insulation_upgrade",
        "building_envelope_air_sealing",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_commercial_hvac"
      ],
      "hardRequirements": [
        "Applicant must be a Consumers Energy business customer on eligible rates.",
        "Some measures require pre-notification before work begins.",
        "Final applications are generally required within 60 days of project completion for many rebate tracks.",
        "Equipment must meet Consumers Energy business rebate specifications.",
        "Rebates may offset only allowed portions of incremental project cost."
      ],
      "blockers": [
        "Residential rebates and home weatherization should not be matched to this business program.",
        "Gas-only measures should not be matched to an electric-only customer without verifying measure-specific service eligibility.",
        "Renewable energy, EV, and demand response programs are separate from this business efficiency rebate record.",
        "Do not infer broad geothermal eligibility beyond the listed business HVAC ground-loop heat pump measure."
      ],
      "programType": "Business Energy Efficiency Rebate Program",
      "administrator": "Consumers Energy",
      "applicationUrl": "https://consumers-energy.clearesult.com/",
      "websiteUrl": "https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts",
      "sourceUrlsChecked": [
        "https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts",
        "https://consumers-energy.clearesult.com/",
        "https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts/lighting-rebates",
        "https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts/kitchen-refrigeration-laundry-rebates",
        "https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts/hvac-business-rebates",
        "https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts/envelope-and-insulation-rebates"
      ],
      "evidenceText": "Consumers Energy business pages list rebates for lighting and controls, refrigeration, kitchen and laundry equipment, HVAC, ground-loop heat pumps, and building envelope or insulation measures.",
      "reasoningNotes": "The original lighting, refrigeration, geothermal, HVAC, and insulation matches are supported for business customers. The record should not be used for residential equipment."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0f5f13b72e281f60_v1",
        "incentiveType": "custom_efficiency_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kwh",
          "amountCentsPerKwh": 10,
          "kwhSource": "annual_kwh_delta_abs"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "high",
        "formula": "$0.10 per annual kWh saved for Consumers Energy business custom electric measures",
        "evidenceText": "Consumers Energy custom business incentives page states customers receive $0.10 per kWh of electricity saved.",
        "sourceUrlsChecked": [
          "https://www.consumersenergy.com/business/rebates-and-discounts/custom-business-incentives",
          "https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts"
        ],
        "reasoningNotes": "Matched commercial custom efficiency. Use for electric projects with verified annual kWh savings.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3406",
    "opportunityName": "Connexus Energy - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3406/connexus-energy-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs",
    "applicationUrl": null,
    "administrator": "Connexus Energy",
    "programType": "Residential Rebate, Rate, And Demand Response Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "Connexus Energy electric service territory"
        ],
        "notes": "Limited to Connexus Energy residential members and qualifying installations in Connexus territory."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "electric_cooperative_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ev_make_ready_meter_socket_installation",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_demand_response_enrollment",
        "dual_fuel_interruptible_space_heating_rate"
      ],
      "hardRequirements": [
        "Applicant must be a Connexus Energy residential member.",
        "Level 2 EV charger rebate requires qualifying charger installation with an off-peak meter socket and EV rate enrollment.",
        "Battery electric and plug-in hybrid vehicles are eligible for EV charger incentives; hybrid-only vehicles are not.",
        "Heat pump and water heater equipment must meet listed efficiency and documentation requirements.",
        "Wi-Fi thermostat incentive is tied to PowerNap air conditioning participation and current rebate timing limits."
      ],
      "blockers": [
        "Smart thermostat should be treated as a demand response or PowerNap enrollment measure, not a generic zoning retrofit.",
        "EV charger rebate should not be matched for whole-house time-of-day service without the required off-peak meter socket.",
        "Hybrid-only vehicles are not eligible for EV charger incentives.",
        "Commercial equipment and commercial applicants are not eligible under this residential program.",
        "Solar, e-bike, and mower programs are separate Connexus offerings and should not be merged into this record."
      ],
      "programType": "Residential Rebate, Rate, And Demand Response Program",
      "administrator": "Connexus Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs",
      "sourceUrlsChecked": [
        "https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs",
        "https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/heating-and-cooling",
        "https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/heating-and-cooling/ductless-ashp-rebate",
        "https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/water-heating",
        "https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/electric-vehicles/electric-vehicle-charger-rebate",
        "https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/heating-and-cooling/wi-fi-powernap-air-conditioning"
      ],
      "evidenceText": "Connexus residential pages list EV charger rebates, air source and ductless heat pump rebates, ground source heat pump rebates, heat pump water heaters, and PowerNap thermostat incentives.",
      "reasoningNotes": "The EV, heat pump, geothermal, and HPWH matches are supported. Thermostat and dual-fuel items should be treated as program participation or rate measures, not broad physical retrofits."
    },
    "existingSimpleRules": [
      {
        "id": "oir_d4cd3fb7f2a61aa0_v1",
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
        "formula": "50% of eligible Level 2 EV charger project cost, capped at $500",
        "evidenceText": "Connexus says Level 2 EV charger rebate is up to 50% of total project cost or $500, whichever is less.",
        "sourceUrlsChecked": [
          "https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs/electric-vehicles/electric-vehicle-charger-rebate"
        ],
        "reasoningNotes": "Matched Level 2 EV charger terms. Use eligible charger installation project cost; requires EV rate enrollment.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3576",
    "opportunityName": "Lake Region Electric Cooperative - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3576/lake-region-electric-cooperative-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/",
    "applicationUrl": null,
    "administrator": "Lake Region Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioning"
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
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Lake Region Electric Cooperative service territory"
        ],
        "notes": "Limited to Lake Region Electric Cooperative members; residential rebates are distinct from commercial, industrial and agricultural offerings."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "electric_cooperative_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "electric_thermal_storage_heating",
        "grid_enabled_electric_water_heater"
      ],
      "hardRequirements": [
        "2026 rebate purchases and installations must occur by the program deadline and are subject to funding.",
        "EV charger rebate requires a qualifying Level 2 charger and applicable LREC rate-program requirements.",
        "Heat pump and water heater measures must meet LREC efficiency, size, account and contractor rules.",
        "Rebate may not exceed purchase and installation cost."
      ],
      "blockers": [
        "Use level_2_ev_charger_installation, not generic EV charging.",
        "Commercial EV, dairy, motors, drives and commercial LED rebates are separate C&I or agricultural offerings on the same site.",
        "Do not infer residential appliance or weatherization categories not listed on LREC's current residential rebate schedule."
      ],
      "programType": "Rebate Program",
      "administrator": "Lake Region Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/",
      "sourceUrlsChecked": [
        "https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/",
        "https://www.lrec.coop/energy-services/electric-vehicles/",
        "https://programs.dsireusa.org/system/program/detail/3576/lake-region-electric-cooperative-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "LREC's 2026 rebate page lists ductless and ducted air-source heat pumps, geothermal, heat pump water heaters, electric thermal storage and a Level 2 EV charger rebate.",
      "reasoningNotes": "The EV charger store purchase option has changed, but the one-time Level 2 charger rebate remains supported by current LREC materials."
    },
    "existingSimpleRules": [
      {
        "id": "oir_64e36f0a4c6a73c7_v1",
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
        "formula": "$500 per eligible unit",
        "evidenceText": "0646 rate) Must be at least 100 gallons, grid enabled, with mixing valve $400 Peak Shave Water Heater Must be at least 80 gallons, grid enabled $100 ELECTRIC VEHICLE Electric Vehicle Charger Installation Level 2 chargers (limit one per account) $500 EV Charger Rebate All Rebates are subject to change, please contact LREC to verify availability Downloadable Residential Energy Efficiency Rebate Sheet Ele",
        "sourceUrlsChecked": [
          "https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22091",
    "opportunityName": "Minnesota Energy Resources (Gas) - New Construction Rebates",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22091/minnesota-energy-resources-gas-new-construction-rebates",
    "websiteUrl": "https://www.minnesotaenergyresources.com/partners/builders/construction-rebates",
    "applicationUrl": "https://www.minnesotaenergyresources.com/partners/builders/pdf/builders_construction_rebates.pdf",
    "administrator": "Minnesota Energy Resources",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "energy_recovery_ventilation_retrofit",
        "displayName": "Energy recovery ventilation retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy recovery ventilation"
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
        "retrofitTypeId": "smart_thermostat_zoning_retrofit",
        "displayName": "Smart thermostat / zoning retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "thermostat"
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Minnesota Energy Resources natural gas"
        ],
        "notes": "Available to Minnesota Energy Resources residential natural gas customers or property owners at eligible new-construction installation addresses."
      },
      "eligibleApplicantTypes": [
        "residential_gas_customer",
        "property_owner",
        "home_builder",
        "new_home_owner"
      ],
      "eligibleSectors": [
        "residential_new_construction"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_natural_gas_furnace",
        "high_efficiency_natural_gas_boiler",
        "integrated_gas_space_water_heating_system",
        "advanced_or_wifi_thermostat",
        "high_efficiency_natural_gas_storage_water_heater",
        "tankless_gas_water_heater",
        "drain_water_heat_recovery",
        "energy_star_window_replacement",
        "direct_vent_gas_hearth_fireplace",
        "heat_recovery_ventilation",
        "energy_recovery_ventilation"
      ],
      "hardRequirements": [
        "Home must qualify as new construction under the program definition, generally built within the last two years.",
        "Applicant must be a current Minnesota Energy Resources customer or property owner for the installation address.",
        "Measures must reduce natural gas use unless explicitly listed otherwise.",
        "Applications must be submitted within the stated deadline after installation.",
        "Program funds are limited and rules may change or end without notice."
      ],
      "blockers": [
        "Do not match existing-home retrofit projects unless the home meets the new-construction definition.",
        "Do not match industrial waste heat recovery; the current program supports HRV/ERV and drain-water heat recovery, not industrial waste-heat projects.",
        "Thermostat rebate requires control of a qualifying natural gas heating system.",
        "Water-heating rebates are for qualifying natural gas equipment and drain-water heat recovery, not electric heat pump water heaters."
      ],
      "programType": "Rebate Program",
      "administrator": "Minnesota Energy Resources",
      "applicationUrl": "https://www.minnesotaenergyresources.com/partners/builders/pdf/builders_construction_rebates.pdf",
      "websiteUrl": "https://www.minnesotaenergyresources.com/partners/builders/construction-rebates",
      "sourceUrlsChecked": [
        "https://www.minnesotaenergyresources.com/partners/builders/construction-rebates",
        "https://www.minnesotaenergyresources.com/partners/builders/pdf/builders_construction_rebates.pdf",
        "https://programs.dsireusa.org/system/program/detail/22091/minnesota-energy-resources-gas-new-construction-rebates"
      ],
      "evidenceText": "The 2026 application covers newly constructed homes and lists natural gas furnaces, boilers, integrated systems, gas water heaters, thermostats, HRV/ERV, drain-water heat recovery, ENERGY STAR windows, and gas hearths.",
      "reasoningNotes": "The phrase heat recovery caused a false-positive industrial waste heat match. The supported measures are residential HRV/ERV and drain-water heat recovery."
    },
    "existingSimpleRules": [
      {
        "id": "oir_06769e00446714dd_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 15000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "high",
        "formula": "$150 per drain water heat recovery device",
        "evidenceText": "Minnesota Energy Resources builder rebate table lists Drain Water Heat Recovery Device at $150.",
        "sourceUrlsChecked": [
          "https://www.minnesotaenergyresources.com/partners/builders/construction-rebates"
        ],
        "reasoningNotes": "Matched heat recovery term. Returned separately because it is a distinct eligible measure.",
        "mapping": {
          "primarySavingsModelId": "controls_building_automation",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c5900481dedfd499_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 5000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "high",
        "formula": "$50 per advanced or Wi-Fi enabled thermostat",
        "evidenceText": "Minnesota Energy Resources builder rebate table lists advanced or Wi-Fi enabled thermostats at $50.",
        "sourceUrlsChecked": [
          "https://www.minnesotaenergyresources.com/partners/builders/construction-rebates"
        ],
        "reasoningNotes": "Matched thermostat terms. Listed equipment rebates are limited to 50% of total improvement cost.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2249",
    "opportunityName": "Wright-Hennepin Cooperative Electric Association - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2249/wright-hennepin-cooperative-electric-association-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.whe.org/rebates",
    "applicationUrl": null,
    "administrator": "Wright-Hennepin Cooperative Electric Association",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
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
          "level-2"
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
          "electronically commutated motor"
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
          "Wright-Hennepin Cooperative Electric Association"
        ],
        "notes": "Residential members in Wright-Hennepin's electric service territory."
      },
      "eligibleApplicantTypes": [
        "residential_members",
        "homeowners",
        "renters"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "air_source_heat_pump_tune_up",
        "dual_fuel_heating",
        "electric_water_heater",
        "heat_pump_water_heater",
        "variable_speed_pool_pump",
        "electronically_commutated_motor",
        "refrigerator_freezer_recycling"
      ],
      "hardRequirements": [
        "Applicant must be a Wright-Hennepin residential member and meet the applicable ESP or ECO program rules.",
        "Level 2 EV charger rebate requires a qualifying 240-volt wall-mounted charger, separate outdoor meter and enrollment in the EV time-of-use rate.",
        "Ground-source heat pumps must meet COP and service requirements and be enrolled in the cooperative program.",
        "Heat pump rebates require qualifying equipment and installation requirements.",
        "Rebates are subject to current program forms, inspection, metering and funding rules."
      ],
      "blockers": [
        "EV charging belongs to the cooperative's EV charging and time-of-use offering, not a generic residential efficiency rebate.",
        "Electronically commutated motor support is not specifically a refrigeration EC motor retrofit.",
        "No broad commercial refrigeration, commercial HVAC or industrial measures should match this residential program.",
        "High-efficiency HVAC replacement should be limited to qualifying heat pump or dual-fuel measures."
      ],
      "programType": "Rebate Program",
      "administrator": "Wright-Hennepin Cooperative Electric Association",
      "applicationUrl": null,
      "websiteUrl": "https://www.whe.org/rebates",
      "sourceUrlsChecked": [
        "https://www.whe.org/rebates",
        "https://www.whe.org/electric-vehicle-charging-program",
        "https://www.whe.org/ground-source-heat-pumps"
      ],
      "evidenceText": "Wright-Hennepin's 2026 rebate list includes EV charging, ground-source and air-source heat pumps, ASHP tune-ups, water heating, pool pump, dual fuel, ECM and refrigerator/freezer recycling measures.",
      "reasoningNotes": "Preserved heat pump, geothermal and Level 2 EV charger categories with program boundaries; narrowed ECM and recycling categories to residential context."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7be95e29fc8de71f_v1",
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
        "confidence": "high",
        "formula": "Up to $500 for Level 2 charger for a BEV",
        "evidenceText": "Wright-Hennepin 2026 EV form says Level 2 BEV charger rebate is up to $500.",
        "sourceUrlsChecked": [
          "https://www.whe.org/electric-vehicle-charging-program",
          "https://www.whe.org/sites/default/files/2026-01/residential-ev-charging-station-2026.pdf"
        ],
        "reasoningNotes": "Matched Level 2 charging. Use one unit as one hardwired wall-mounted charging station.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_95467d1f52aec02d_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 15000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "high",
        "formula": "Up to $150 for Level 2 charger for a PHEV",
        "evidenceText": "Wright-Hennepin 2026 EV form says Level 2 PHEV charger rebate is up to $150.",
        "sourceUrlsChecked": [
          "https://www.whe.org/electric-vehicle-charging-program",
          "https://www.whe.org/sites/default/files/2026-01/residential-ev-charging-station-2026.pdf"
        ],
        "reasoningNotes": "Returned separately because BEV and PHEV charger rebates differ.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2702",
    "opportunityName": "City Utilities of Springfield - Commercial Energy Efficiency Rebate Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2702/city-utilities-of-springfield-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.cityutilities.net/165/Rebates",
    "applicationUrl": null,
    "administrator": "City Utilities of Springfield, Missouri",
    "programType": "Rebate And Audit",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "MO"
        ],
        "counties": [],
        "cities": [
          "Springfield"
        ],
        "utilityTerritories": [
          "City Utilities of Springfield electric, natural gas, and water service territory"
        ],
        "notes": "Eligibility varies by measure: lighting measures require commercial electric service, toilets require water service, and thermostat rebates apply to electric or natural gas customers."
      },
      "eligibleApplicantTypes": [
        "commercial_utility_customer",
        "industrial_utility_customer",
        "water_utility_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "lighting_audit",
        "led_lighting_retrofit",
        "exterior_site_lighting_retrofit",
        "lighting_controls_retrofit",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_toilet_urinal"
      ],
      "hardRequirements": [
        "Commercial lighting rebates require City Utilities commercial electric service and pre-evaluation before work begins.",
        "Smart thermostats must be ENERGY STAR qualifying and tied to eligible electric or natural gas accounts.",
        "WaterSense toilet rebates require City Utilities water service.",
        "Commercial audits are Level 1 audits and may be free services rather than equipment rebates."
      ],
      "blockers": [
        "Low-flow fixture retrofit is too broad; the current water measure verified is WaterSense toilet replacement.",
        "Energy audit and lighting audit are non-physical services and should not be treated as installed retrofit equipment.",
        "Do not infer commercial HVAC replacement, insulation, EV charging, or residential appliance measures from this commercial rebate set."
      ],
      "programType": "Rebate And Audit",
      "administrator": "City Utilities of Springfield, Missouri",
      "applicationUrl": null,
      "websiteUrl": "https://www.cityutilities.net/165/Rebates",
      "sourceUrlsChecked": [
        "https://www.cityutilities.net/165/Rebates",
        "https://www.cityutilities.net/263/Commercial-Lighting-Rebate",
        "https://www.cityutilities.net/267/Thermostat-Rebate",
        "https://www.cityutilities.net/266/WaterSense-Toilet-Rebate",
        "https://www.cityutilities.net/265/Commercial-Energy-Audit",
        "https://www.cityutilities.net/264/Commercial-Lighting-Audit"
      ],
      "evidenceText": "City]( Utilities lists commercial energy and lighting audits, commercial lighting rebates, thermostat rebates, and WaterSense toilet rebates with service-specific eligibility.",
      "reasoningNotes": "Keep lighting, thermostat, toilet, and audit categories; narrow plumbing to WaterSense toilets."
    },
    "existingSimpleRules": [
      {
        "id": "oir_35a5f6ae6af5f661_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 7500,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$75 per eligible ENERGY STAR smart thermostat",
        "evidenceText": "City Utilities rebate materials list ENERGY STAR smart thermostat rebate at $75.",
        "sourceUrlsChecked": [
          "https://www.cityutilities.net/save/",
          "https://www.cityutilities.net/save/thermostat/"
        ],
        "reasoningNotes": "Matched thermostat/control terms. Confidence is medium because the accessible thermostat page is not clearly commercial-only.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5874",
    "opportunityName": "Spire Energy - Commercial and Industrial Energy Efficiency Rebate Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5874/spire-energy-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.spireenergy.com/commercial-rebates",
    "applicationUrl": null,
    "administrator": "Spire Energy",
    "programType": "Commercial And Industrial Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "boiler_controls_burner_retrofit",
        "displayName": "Boiler controls / burner retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "burner"
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
          "MO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Spire Missouri East",
          "Spire Missouri West"
        ],
        "notes": "Applies to current Spire commercial or industrial natural gas customers in Missouri."
      },
      "eligibleApplicantTypes": [
        "spire_commercial_customers",
        "spire_industrial_customers",
        "business_customers",
        "nonprofit_customers",
        "government_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "multifamily",
        "government",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_gas_furnace",
        "high_efficiency_gas_boiler",
        "boiler_controls_burner_retrofit",
        "boiler_tune_up",
        "steam_trap_replacement",
        "commercial_gas_water_heater",
        "programmable_thermostat",
        "energy_audit",
        "high_efficiency_gas_fryer",
        "commercial_gas_steam_cooker",
        "kitchen_demand_control_ventilation",
        "low_flow_pre_rinse_spray_nozzle",
        "custom_natural_gas_efficiency_project"
      ],
      "hardRequirements": [
        "Applicant must be a current Spire commercial or industrial customer in Missouri.",
        "Rebates apply to eligible high-efficiency natural gas equipment and services; applications are first-come, first-served and subject to budget availability.",
        "Program year runs October 1 through September 30, with prior-year documentation due by the listed deadline.",
        "Steam trap replacement or rebuild must include a steam trap survey or failure study report and proof of purchase.",
        "Energy audit rebates require at least one eligible measure identified by the audit to be installed."
      ],
      "blockers": [
        "Do not match electric heat pumps; this is a natural gas commercial and industrial rebate program.",
        "Do not match smart thermostat zoning broadly; verified thermostat support is programmable or qualifying thermostat measures tied to gas efficiency.",
        "Low-flow support is limited to pre-rinse spray nozzles or listed food-service measures, not broad water fixture retrofits.",
        "Energy audit is not a standalone physical retrofit and requires follow-through with an eligible measure."
      ],
      "programType": "Commercial And Industrial Rebate Program",
      "administrator": "Spire Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.spireenergy.com/commercial-rebates",
      "sourceUrlsChecked": [
        "https://www.spireenergy.com/commercial-rebates",
        "https://www.spireenergy.com/rebates-offers",
        "https://www.spireenergy.com/sites/default/files/2025-09/25-CandIRebates-SteamTrap-FINAL-REV-1003.pdf"
      ],
      "evidenceText": "Spire's Missouri business rebates cover natural gas commercial and industrial measures including boiler systems, boiler tune-ups, steam traps, thermostats, water heating, food service, audits, and custom gas efficiency.",
      "reasoningNotes": "Kept gas C&I categories and blocked electric heat pump and overly broad thermostat or water-fixture interpretations."
    },
    "existingSimpleRules": [
      {
        "id": "oir_f6bf166b8bddc5c2_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 35000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "Up to $350 per qualifying commercial fryer",
        "evidenceText": "Spire commercial rebate summaries list commercial fryer rebates up to $350 per unit.",
        "sourceUrlsChecked": [
          "https://www.spireenergy.com/commercial-rebates",
          "https://programs.dsireusa.org/system/program/detail/2354"
        ],
        "reasoningNotes": "Matched food-service equipment terms. Confidence is medium because final amount depends on qualifying equipment and service territory.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5705",
    "opportunityName": "TVA - Residential Energy Efficiency Rebate Program",
    "state": "MS",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5705/tva-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://energyright.com/residential/rebates/",
    "applicationUrl": null,
    "administrator": "TVA EnergyRight",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioning"
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
          "MS"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "TVA-served local power company territories in Mississippi"
        ],
        "notes": "Not statewide Mississippi; only homes served by participating TVA local power companies qualify."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "tenant_with_required_permission"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "attic_insulation_upgrade",
        "wall_insulation_upgrade",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "central_air_conditioner_replacement",
        "hvac_tune_up",
        "smart_thermostat_rewards"
      ],
      "hardRequirements": [
        "Customer must be served by a participating TVA local power company in the listed state.",
        "All rebate-eligible upgrades must be completed by a member of TVA's Quality Contractor Network.",
        "Contractor submits the rebate to TVA EnergyRight, and customer claims the rebate using a redemption code.",
        "Equipment and envelope work must meet TVA standards effective on the installation date."
      ],
      "blockers": [
        "The state field is not statewide eligibility; only TVA-served local power company territories qualify.",
        "Do not match non-TVA utility customers.",
        "Financing and assessments are separate EnergyRight services and should not be treated as physical rebate categories.",
        "Do not infer water-heater, solar, EV charging or appliance rebates from these residential rebate pages unless separately verified."
      ],
      "programType": "Rebate Program",
      "administrator": "TVA EnergyRight",
      "applicationUrl": null,
      "websiteUrl": "https://energyright.com/residential/rebates/",
      "sourceUrlsChecked": [
        "https://energyright.com/residential/rebates/",
        "https://energyright.com/residential/rebates/geothermal-heat-pump/",
        "https://energyright.com/residential/rebates/heat-pump/",
        "https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/",
        "https://energyright.com/residential/rebates/home-insulation-air-sealing/",
        "https://programs.dsireusa.org/system/program/detail/5705/tva-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "TVA EnergyRight current residential rebate pages list air sealing, insulation, duct sealing, HVAC tune-up, central AC, geothermal heat pump, mini-split and heat pump rebates through QCN contractors.",
      "reasoningNotes": "These five DSIRE state records share the same TVA EnergyRight residential rebate structure; geography differs by TVA-served territory in each state."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0422bb370fb9988f_v1",
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
        "confidence": "high",
        "formula": "$800 per 17+ SEER2 air-source or dual-fuel heat pump",
        "evidenceText": "TVA EnergyRight heat pump page lists 17+ SEER2 air-source or dual-fuel heat pumps at $800.",
        "sourceUrlsChecked": [
          "https://energyright.com/residential/rebates/",
          "https://energyright.com/residential/rebates/heat-pump/"
        ],
        "reasoningNotes": "Matched heat pump term. Returned higher published efficiency tier.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_a282ff5a7e7fef92_v1",
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
        "formula": "$300 for eligible duct sealing, duct insulation, repair, or replacement",
        "evidenceText": "TVA EnergyRight heat pump page lists duct sealing/repair, duct insulation, or replacement at $300.",
        "sourceUrlsChecked": [
          "https://energyright.com/residential/rebates/",
          "https://energyright.com/residential/rebates/heat-pump/"
        ],
        "reasoningNotes": "Matched duct sealing and insulation terms. Use as a project-level duct measure.",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_cb47033463a27bc1_v1",
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
        "confidence": "high",
        "formula": "$1,500 per eligible geothermal heat pump",
        "evidenceText": "TVA EnergyRight lists a $1,500 geothermal heat pump rebate.",
        "sourceUrlsChecked": [
          "https://energyright.com/residential/rebates/",
          "https://energyright.com/residential/rebates/geothermal-heat-pump/"
        ],
        "reasoningNotes": "Matched geothermal heat pump term. Use one unit as one qualifying system.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3721",
    "opportunityName": "Dominion Energy (Gas) - Energy-Efficient Appliance Rebate Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3721/dominion-energy-gas-energy-efficient-appliance-rebate-program",
    "websiteUrl": "https://www.enbridgegas.com/north-carolina/save-energy/thermwise",
    "applicationUrl": "https://www.enbridgegas.com/-/media/Extranet-Pages/north-carolina/save-money/thermwise/residential-rebates/appliance-rebate-form.pdf?hash=253975D8BA85203980ADCDA9A6E678C1&rev=be32e8aacb1745019c80691d23c16e7f",
    "administrator": "Enbridge Gas North Carolina",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "NC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Enbridge Gas North Carolina"
        ],
        "notes": "Available to qualifying Enbridge Gas North Carolina customers within the utility's North Carolina natural gas service territory."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customer",
        "commercial_natural_gas_customer",
        "business_natural_gas_customer",
        "property_owner",
        "authorized_account_holder"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_gas_water_heater",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "infrared_heating_system",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "commercial_griddle",
        "commercial_steam_cooker",
        "low_flow_pre_rinse_spray_valve"
      ],
      "hardRequirements": [
        "Customer must have an active Enbridge Gas North Carolina natural gas account.",
        "Residential appliance rebates require qualifying natural-gas-to-natural-gas replacement equipment and timely submission after installation.",
        "Business rebates are limited to qualifying natural gas equipment and listed commercial food service products.",
        "Smart thermostats must meet program requirements and be used with natural gas heat."
      ],
      "blockers": [
        "Do not match electric heat pumps, broad electric HVAC replacement, or non-gas water-heating retrofits to this gas appliance program.",
        "Do not generalize pre-rinse spray valves into broad plumbing or water-efficiency retrofits.",
        "Commercial food service rebates are product-specific and should not be expanded to all kitchen equipment.",
        "Equipment outside the current Enbridge measure list should not match."
      ],
      "programType": "Rebate Program",
      "administrator": "Enbridge Gas North Carolina",
      "applicationUrl": "https://www.enbridgegas.com/-/media/Extranet-Pages/north-carolina/save-money/thermwise/residential-rebates/appliance-rebate-form.pdf?hash=253975D8BA85203980ADCDA9A6E678C1&rev=be32e8aacb1745019c80691d23c16e7f",
      "websiteUrl": "https://www.enbridgegas.com/north-carolina/save-energy/thermwise",
      "sourceUrlsChecked": [
        "https://www.enbridgegas.com/north-carolina/save-energy/thermwise",
        "https://www.enbridgegas.com/north-carolina/save-energy/thermwise/residential-rebates",
        "https://www.enbridgegas.com/north-carolina/save-energy/thermwise/business-rebates",
        "https://www.enbridgegas.com/-/media/Extranet-Pages/north-carolina/save-money/thermwise/residential-rebates/appliance-rebate-form.pdf?hash=253975D8BA85203980ADCDA9A6E678C1&rev=be32e8aacb1745019c80691d23c16e7f"
      ],
      "evidenceText": "Current]( Enbridge ThermWise pages list residential gas water heaters, furnaces, boilers and smart thermostats, plus business gas heating and commercial food service equipment rebates.",
      "reasoningNotes": "The DSIRE Dominion record maps to Enbridge Gas North Carolina after the utility transition. Boiler, furnace, smart thermostat, fryer and oven matches are supported when limited to eligible natural gas products. Broad HVAC replacement and broad plumbing matches should be blocked."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3fd6dbd2d6431330_v1",
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
        "formula": "$50 per ENERGY STAR smart thermostat with natural gas heat",
        "evidenceText": "Enbridge North Carolina residential table lists ENERGY STAR smart thermostat at $50.",
        "sourceUrlsChecked": [
          "https://www.enbridgegas.com/north-carolina/save-energy/thermwise/residential-rebates",
          "https://www.enbridgegas.com/north-carolina/save-energy/thermwise"
        ],
        "reasoningNotes": "Matched smart thermostat term. Use one unit as one eligible thermostat.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f29a0a12778dea5e_v1",
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
        "formula": "$400 per 97%+ AFUE gas furnace",
        "evidenceText": "Enbridge North Carolina residential table lists 97%+ AFUE gas furnace at $400.",
        "sourceUrlsChecked": [
          "https://www.enbridgegas.com/north-carolina/save-energy/thermwise/residential-rebates",
          "https://www.enbridgegas.com/north-carolina/save-energy/thermwise"
        ],
        "reasoningNotes": "Matched furnace term. Returned highest furnace tier.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5248",
    "opportunityName": "Jones-Onslow EMC - Residential Energy Efficiency Rebate Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5248/jones-onslow-emc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://joemc.com/energywise/products-rebates/",
    "applicationUrl": null,
    "administrator": "Jones-Onslow EMC",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
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
          "NC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Jones-Onslow EMC"
        ],
        "notes": "Available to residential Jones-Onslow EMC members in the cooperative's North Carolina service territory."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "electric_utility_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_residential_appliances",
        "air_source_heat_pump_hvac",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a Jones-Onslow EMC residential member.",
        "HVAC rebate applies to qualifying ENERGY STAR-rated heat pumps and air-to-air heat pumps meeting the stated SEER or SEER2 threshold.",
        "Heat pump water heater rebate applies to newly installed units of 55 gallons or less.",
        "Level 2 EV charger rebate applies to new residential chargers purchased and installed during the current program year."
      ],
      "blockers": [
        "Residential ENERGY STAR appliance rebates are not commercial kitchen or commercial dishwasher incentives.",
        "No current official support found for commercial refrigeration equipment under this residential program.",
        "Do not match broad HVAC replacement unless the project is a qualifying heat pump.",
        "EV charging is limited to residential Level 2 chargers."
      ],
      "programType": "Rebate Program",
      "administrator": "Jones-Onslow EMC",
      "applicationUrl": null,
      "websiteUrl": "https://joemc.com/energywise/products-rebates/",
      "sourceUrlsChecked": [
        "https://joemc.com/energywise/products-rebates/",
        "https://formstack.io/1B5B7",
        "https://formstack.io/D2646",
        "https://formstack.io/B9CDF",
        "https://programs.dsireusa.org/system/program/detail/5248/jones-onslow-emc-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Jones-Onslow EMC lists residential rebates for ENERGY STAR appliances, qualifying heat pumps, heat pump water heaters, and new Level 2 EV chargers for residential members.",
      "reasoningNotes": "The correct matches are residential product categories. Commercial dishwasher and refrigeration matches are false positives from appliance terminology."
    },
    "existingSimpleRules": [
      {
        "id": "oir_a88e5656c39c9a30_v1",
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
        "formula": "$300 per heat pump water heater of 55 gallons or less",
        "evidenceText": "JOEMC rebates page says it offers a $300 rebate for newly installed HPWHs of 55 gallons or less.",
        "sourceUrlsChecked": [
          "https://joemc.com/energywise/products-rebates/"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one eligible HPWH.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3861",
    "opportunityName": "South River EMC - Residential Energy Efficiency Rebate Program",
    "state": "NC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3861/south-river-emc-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.sremc.com/rebates-efficiency-tips",
    "applicationUrl": null,
    "administrator": "South River Electric Membership Corporation",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
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
          "NC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "South River Electric Membership Corporation"
        ],
        "notes": "Available to South River EMC members at homes receiving South River EMC electric service."
      },
      "eligibleApplicantTypes": [
        "south_river_emc_members",
        "homeowners",
        "low_income_residential_members"
      ],
      "eligibleSectors": [
        "residential",
        "low_income_residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "dual_fuel_air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "central_air_conditioner_replacement",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "solar_water_heating_system",
        "low_income_weatherization_package",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "duct_sealing",
        "programmable_thermostat",
        "variable_speed_pool_pump"
      ],
      "hardRequirements": [
        "Member must receive South River EMC electric service in the home where the qualifying equipment is installed.",
        "HVAC equipment must be newly installed within the 90 days preceding application, meet efficiency requirements, and be installed by a North Carolina licensed heating and cooling contractor.",
        "HVAC application must include the certificate of product rating; systems may be inspected before bill-credit issuance.",
        "Heat pump water heater must replace an existing electric water heater in the same home, with the old unit disconnected and removed.",
        "Low-income weatherization is a package delivered through Community Action and may include air or duct sealing, insulation, HVAC work, and thermostat measures."
      ],
      "blockers": [
        "Do not treat weatherization as a standalone unrestricted insulation rebate; the verified weatherization path is a low-income package with program requirements.",
        "Do not match non-electric or gas equipment that is outside South River EMC's electric service requirements.",
        "Do not infer commercial or industrial measures from this residential member program.",
        "If a member receives the low-income weatherization rebate and heat pump or central AC rebate, they may not receive an additional HVAC rebate for the same project."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "South River Electric Membership Corporation",
      "applicationUrl": null,
      "websiteUrl": "https://www.sremc.com/rebates-efficiency-tips",
      "sourceUrlsChecked": [
        "https://www.sremc.com/energy-star-heating-cooling",
        "https://www.sremc.com/energy-efficient-water-heating",
        "https://www.sremc.com/weatherization",
        "https://www.sremc.com/form/hvac-rebate",
        "https://sremc.com/form/water-heating-pool-pump-rebate"
      ],
      "evidenceText": "South River EMC lists residential rebates for electric air-source, dual-fuel, ductless, and geothermal heat pumps, central AC, heat pump and solar water heaters, plus low-income weatherization handled through Community Action.",
      "reasoningNotes": "Retained HVAC, water-heating, and weatherization categories but noted the package and member-service limitations."
    },
    "existingSimpleRules": [
      {
        "id": "oir_ec7aa1864897f50c_v1",
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
        "formula": "$300 per geothermal heat pump",
        "evidenceText": "South River EMC rebates list a Geothermal Heat Pump rebate at $300.",
        "sourceUrlsChecked": [
          "https://www.sremc.com/rebates-efficiency-tips"
        ],
        "reasoningNotes": "Matched geothermal heat pump terms. Use one unit as one qualifying geothermal heat pump system.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ],
    "reviewedNoRule": []
  }
]
