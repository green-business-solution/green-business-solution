You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 27
Targets in this prompt: 521-540 of 984
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
  "batchNumber": 27,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:4791"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1946",
    "opportunityName": "Rochester Public Utilities - Commercial and Industrial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1946/rochester-public-utilities-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.rpu.org/rebates-programs/conserve-save-rebates/commercial-rebates/",
    "applicationUrl": null,
    "administrator": "Rochester Public Utilities",
    "programType": "municipal utility commercial rebate and custom incentive program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 18,
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
        "retrofitTypeId": "compressed_air_leak_repair",
        "displayName": "Compressed air leak repair",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "compressed air leak"
        ]
      },
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
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy management system",
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
          "chiller"
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
        "retrofitTypeId": "refrigeration_controls_retrofit",
        "displayName": "Refrigeration controls retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "floating head pressure"
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
          "evaporator fan"
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
      },
      {
        "retrofitTypeId": "walk_in_cooler_freezer_upgrade",
        "displayName": "Walk-in cooler/freezer upgrade",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "walk in freezer",
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
        "counties": [],
        "cities": [
          "Rochester"
        ],
        "utilityTerritories": [
          "Rochester Public Utilities service territory"
        ],
        "notes": "Available to eligible RPU business customers in Rochester, Minnesota."
      },
      "eligibleApplicantTypes": [
        "commercial",
        "industrial",
        "government",
        "school",
        "nonprofit"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "municipal",
        "business"
      ],
      "eligibleRetrofitCategories": [
        "lighting",
        "HVAC / heat pump",
        "refrigeration",
        "motors / VFD",
        "EV charger",
        "EV / fleet vehicle",
        "design assistance / study",
        "compressed air",
        "commercial foodservice equipment",
        "water pumps",
        "custom electric efficiency"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Rochester Public Utilities business customer.",
        "Applications are measure-specific.",
        "Custom electric rebates require review under RPU custom rebate rules.",
        "EV offerings include enrollment in RPU's new time-of-use rate and electric bus-related offerings; these should not be classified as simple upfront equipment rebates without checking the specific application."
      ],
      "blockers": [
        "Measure-specific application forms must be checked for exact technical requirements and caps."
      ],
      "programType": "municipal utility commercial rebate and custom incentive program",
      "administrator": "Rochester Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.rpu.org/rebates-programs/conserve-save-rebates/commercial-rebates/",
      "sourceUrlsChecked": [
        "https://www.rpu.org/rebates-programs/conserve-save-rebates/",
        "https://www.rpu.org/rebates-programs/conserve-save-rebates/commercial-rebates/"
      ],
      "evidenceText": "RPU's commercial rebates page lists AC tune-ups, ASHP/mini-split, chillers, compressed air, custom electric rebates, audits, EV/TOU offerings, foodservice, heat pumps, lighting, motors, refrigeration, VSD, and water-source heat pumps.",
      "reasoningNotes": "Official RPU page confirms active commercial rebate categories and separates audits/custom incentives from prescriptive equipment rebates."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "RPU commercial rebates include many HVAC and pump measures, but no current whole-building per-kWh formula was verified.",
        "sourceUrlsChecked": [
          "https://www.rpu.org/rebates-programs/conserve-save-rebates/commercial-rebates/"
        ],
        "reasoningNotes": "Target is whole-building custom efficiency; no safe reusable formula found in accessible source text.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22087",
    "opportunityName": "Willmar Municipal Utilities - Commercial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22087/willmar-municipal-utilities-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.brightenergysolutions.com/members/willmar-municipal-utilities",
    "applicationUrl": "https://www.brightenergysolutions.com/members/willmar-municipal-utilities",
    "administrator": "Willmar Municipal Utilities / Bright Energy Solutions",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 18,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "demand_controlled_ventilation",
        "displayName": "Demand-controlled ventilation",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "demand controlled ventilation"
        ]
      },
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
        "retrofitTypeId": "energy_recovery_ventilation_retrofit",
        "displayName": "Energy recovery ventilation retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "erv"
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration",
          "freezer"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_steamer",
        "displayName": "High-efficiency steamer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "steamer"
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
          "MN"
        ],
        "counties": [],
        "cities": [
          "Willmar"
        ],
        "utilityTerritories": [
          "Willmar Municipal Utilities",
          "Bright Energy Solutions"
        ],
        "notes": "Available to Willmar Municipal Utilities business customers through Bright Energy Solutions."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional",
        "foodservice",
        "refrigeration"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_refrigeration_equipment",
        "refrigeration_ec_motor_retrofit",
        "led_display_case_lighting",
        "walk_in_cooler_freezer_upgrade",
        "efficient_ice_machine",
        "compressed_air_storage",
        "compressed_air_leak_survey",
        "compressed_air_dryer",
        "compressed_air_controls",
        "compressed_air_nozzle",
        "low_pressure_blower",
        "mist_eliminator",
        "no_loss_air_drain",
        "variable_speed_air_compressor",
        "custom_efficiency_project",
        "custom_electrification_project",
        "electric_forklift_material_handling",
        "forklift_lithium_ion_battery",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_fryer",
        "induction_cooking_equipment",
        "high_efficiency_oven",
        "high_efficiency_steamer",
        "demand_controlled_kitchen_ventilation",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "variable_refrigerant_flow_system",
        "high_efficiency_hvac_replacement",
        "energy_star_window_wall_air_conditioner",
        "chiller_replacement",
        "demand_controlled_ventilation",
        "efficient_fan_blower_replacement",
        "energy_recovery_ventilation_retrofit",
        "heat_pump_water_heater",
        "guest_room_energy_management",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "infrared_curing_drying",
        "high_efficiency_pump",
        "variable_frequency_drive_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Willmar Municipal Utilities business customer eligible for Bright Energy Solutions rebates.",
        "Custom efficiency and custom electrification projects require preapproval and documented energy savings.",
        "Equipment must meet the applicable Bright Energy Solutions form requirements for the selected business rebate."
      ],
      "blockers": [
        "window_replacement is a false positive; the current business page lists ENERGY STAR window and wall air conditioners, not building window replacement.",
        "Electric forklifts and lithium-ion forklift batteries are material-handling equipment, not EV charging infrastructure.",
        "Do not infer residential appliance or home weatherization categories from this business rebate page."
      ],
      "programType": "Rebate",
      "administrator": "Willmar Municipal Utilities / Bright Energy Solutions",
      "applicationUrl": "https://www.brightenergysolutions.com/members/willmar-municipal-utilities",
      "websiteUrl": "https://www.brightenergysolutions.com/members/willmar-municipal-utilities",
      "sourceUrlsChecked": [
        "https://www.brightenergysolutions.com/members/willmar-municipal-utilities",
        "https://wmu.willmar.mn.us/energy-programs/rebates/"
      ],
      "evidenceText": "Bright]( Energy Solutions lists Willmar business rebates for refrigeration, compressed air, custom projects, forklifts, foodservice, HVAC, lighting, infrared process heat, VFDs, and pumps.",
      "reasoningNotes": "The target is a business program. Replace window replacement with product-specific window or wall air conditioners and keep electric forklift as material handling, not charging."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Bright Energy Solutions business rebates vary by measure; target includes storage/demand, refrigeration and many equipment types.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/municipalities-container/mn/willmar-municipal-utilities/?rebatetype=Business"
        ],
        "reasoningNotes": "No direct battery storage upfront formula was found; measure-specific table selection is needed.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4493",
    "opportunityName": "Jo-Carroll Energy - Energy Efficiency Rebate Program (Electric)",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4493/jo-carroll-energy-energy-efficiency-rebate-program-electric",
    "websiteUrl": "https://jcecoop.com/incentives",
    "applicationUrl": "https://jcecoop.com/incentives",
    "administrator": "JCE Co-op",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 17,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
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
          "led lighting",
          "led lamp"
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
          "lighting controls",
          "occupancy sensor"
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
          "IL"
        ],
        "counties": [
          "Jo Daviess",
          "Carroll",
          "Whiteside",
          "Henry"
        ],
        "cities": [],
        "utilityTerritories": [
          "JCE Co-op"
        ],
        "notes": "JCE Co-op electric account service territory in northwestern Illinois."
      },
      "eligibleApplicantTypes": [
        "member",
        "residential_customer",
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "institutional_customer",
        "government_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "agricultural",
        "institutional",
        "government"
      ],
      "eligibleRetrofitCategories": [
        "electric_forklift_battery_charger",
        "dairy_plate_cooler",
        "dairy_refrigeration_heat_recovery",
        "low_energy_livestock_waterer",
        "agricultural_exhaust_fan",
        "agricultural_circulation_fan",
        "scroll_refrigerator_compressor",
        "variable_frequency_drive_retrofit",
        "residential_induction_range",
        "heat_pump_clothes_dryer",
        "residential_clothes_washer",
        "residential_dishwasher",
        "residential_refrigerator_freezer",
        "dehumidifier",
        "refrigerator_freezer_recycling",
        "room_air_conditioner_recycling",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "compressed_air_audit",
        "high_efficiency_electric_water_heater",
        "heat_pump_water_heater",
        "heat_pump_hvac_retrofit",
        "high_efficiency_furnace_retrofit",
        "furnace_ecm_blower_motor",
        "smart_thermostat_zoning_retrofit",
        "ground_source_geothermal_heat_pump",
        "energy_audit",
        "air_sealing_weatherization",
        "insulation_upgrade"
      ],
      "hardRequirements": [
        "Applicant must be a JCE Co-op member and installed equipment must be on the cooperative's electric lines where the form requires it.",
        "2026 forms require purchase or installation during the program period, documentation, and submission by the stated deadlines or within three months.",
        "Residential insulation and air sealing require a JCE Co-op Energy Detective audit before work begins."
      ],
      "blockers": [
        "window_replacement is a false positive; JCE lists federal tax credits for windows separately, not a JCE electric rebate.",
        "high_efficiency_commercial_dishwasher is not supported; the JCE electric appliance form lists residential ENERGY STAR dishwashers.",
        "Electric forklift incentives are for chargers or listed ag/commercial equipment, not broad EV charging installation."
      ],
      "programType": "Rebate",
      "administrator": "JCE Co-op",
      "applicationUrl": "https://jcecoop.com/incentives",
      "websiteUrl": "https://jcecoop.com/incentives",
      "sourceUrlsChecked": [
        "https://jcecoop.com/incentives",
        "https://jcecoop.com/sites/default/files/Incentives/2026%20Incentive%20Forms/2026%20Incentive%20Form%20-%20Electric%20Ag%20Commercial%20%26%20Industrial.pdf",
        "https://jcecoop.com/sites/default/files/Incentives/2026%20Incentive%20Forms/2026%20Incentive%20Form%20-%20Electric%20Appliances%20%26%20Lighting.pdf",
        "https://jcecoop.com/sites/default/files/Incentives/2026%20Incentive%20Forms/2026%20Incentive%20Form%20-%20Electric%20Compressed%20Air%20Audit.pdf",
        "https://jcecoop.com/sites/default/files/Incentives/2026%20Incentive%20Forms/2026%20Incentive%20Form%20-%20Electric%20Water%20Heaters.pdf",
        "https://jcecoop.com/sites/default/files/Incentives/2026%20Incentive%20Forms/2026%20Incentive%20Form%20-%20Electric%20Commercial%20HVAC%20Systems%20-%20Air-Source%20Heat%20Pumps%20%26%20PTHPs.pdf",
        "https://jcecoop.com/sites/default/files/Incentives/2026%20Incentive%20Forms/2026%20Incentive%20Form%20-%20Electric%20HVAC%20-%20Geothermal%20-%20Ground%20Source%20System.pdf",
        "https://jcecoop.com/sites/default/files/Incentives/2026%20Incentive%20Forms/2026%20Incentive%20Form%20-%20Insulation%20%26%20Air-Sealing.pdf",
        "https://jcecoop.com/about-jce-co-op"
      ],
      "evidenceText": "JCE's]( 2026 forms cover electric ag, commercial and industrial equipment, appliances, lighting, water heaters, heat pumps, geothermal, compressed-air audits, insulation, and air sealing.",
      "reasoningNotes": "JCE's current electric incentives mix residential, ag, commercial, and industrial forms; remove window replacement and commercial-dishwasher overgeneralization."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Jo-Carroll Energy incentive page contains many residential and commercial measure categories.",
        "sourceUrlsChecked": [
          "https://jcecoop.com/incentives"
        ],
        "reasoningNotes": "Specific measure should be selected later.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1342",
    "opportunityName": "Wakefield Municipal Gas & Light Department - Residential Conservation Services Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1342/wakefield-municipal-gas-and-light-department-residential-conservation-services-program",
    "websiteUrl": "https://wmgld.com/residential/residential-rebates/",
    "applicationUrl": null,
    "administrator": "Wakefield Municipal Gas & Light Department",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 17,
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
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "audit"
        ]
      },
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
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charger",
          "electric vehicle charging"
        ]
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
          "MA"
        ],
        "counties": [],
        "cities": [
          "Wakefield"
        ],
        "utilityTerritories": [
          "Wakefield Municipal Gas & Light Department electric service territory"
        ],
        "notes": "Limited to WMGLD residential electric customers and applicable NextZero/Wakefield subprogram rules."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "multifamily_customer"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "level_2_ev_charger_installation",
        "battery_storage_system",
        "smart_thermostat_zoning_retrofit",
        "residential_appliance_rebate",
        "residential_refrigerator",
        "residential_dishwasher",
        "residential_clothes_washer",
        "residential_clothes_dryer",
        "induction_range",
        "connected_home_device_demand_response"
      ],
      "hardRequirements": [
        "Customer must be served by Wakefield Municipal Gas & Light Department.",
        "Weatherization measures generally require an eligible energy audit and post-work inspection.",
        "Heat pumps must meet current cold-climate equipment and licensed-contractor requirements.",
        "Battery and connected-home incentives require enrollment in the applicable demand response or connected-device program.",
        "EV charger incentives are tied to approved Level 2 equipment and program participation requirements."
      ],
      "blockers": [
        "Commercial dishwashers, commercial refrigeration, commercial kitchen equipment, and industrial fan or blower retrofits are not supported by this residential program.",
        "Do not match exterior door replacement, broad window replacement, or window film unless a current Wakefield source specifically lists that measure.",
        "Energy management should be limited to supported connected-home devices, not broad building energy management systems.",
        "Solar is a separate offering and should not be inferred as part of this efficiency rebate match."
      ],
      "programType": "Rebate Program",
      "administrator": "Wakefield Municipal Gas & Light Department",
      "applicationUrl": null,
      "websiteUrl": "https://wmgld.com/residential/residential-rebates/",
      "sourceUrlsChecked": [
        "https://wmgld.com/residential/residential-rebates/",
        "https://wmgld.com/residential/residential-rebates/insulation-and-windows-rebate/",
        "https://wmgld.com/residential/residential-rebates/residential-appliance-rebates/",
        "https://wmgld.com/residential/residential-rebates/heat-pump-rebate/",
        "https://wmgld.com/residential/ev-charger-programs/",
        "https://nextzero.org/wakefield/",
        "https://nextzero.org/wakefield/battery-program/",
        "https://nextzero.org/wakefield/connected-homes/"
      ],
      "evidenceText": "WMGLD and NextZero list residential appliance, thermostat, insulation, air sealing, heat pump, EV charger, battery, and connected-home incentives with audit or enrollment requirements for some measures.",
      "reasoningNotes": "The original match overgeneralized residential appliance and connected-home language into commercial kitchen, refrigeration, door, window, and energy-management categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "WMGLD/NextZero residential programs include multiple appliance, EV and efficiency rebates, but exact current target measure was not selected.",
        "sourceUrlsChecked": [
          "https://wmgld.com/residential/rebates/",
          "https://nextzero.org/"
        ],
        "reasoningNotes": "Primary model is EV charging with many matched measures; a specific WMGLD/NextZero application is needed.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1942",
    "opportunityName": "Moorhead Public Service Utility - Commercial and Industrial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1942/moorhead-public-service-utility-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.brightenergysolutions.com/members/moorhead-public-service-2",
    "applicationUrl": null,
    "administrator": "Moorhead Public Service / Bright Energy Solutions",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 16,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "demand_controlled_ventilation",
        "displayName": "Demand-controlled ventilation",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "demand controlled ventilation"
        ]
      },
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
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy management system",
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration",
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
          "led lighting",
          "lighting retrofit"
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
          "evaporator fan"
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
          "MN"
        ],
        "counties": [
          "Clay"
        ],
        "cities": [
          "Moorhead"
        ],
        "utilityTerritories": [
          "Moorhead Public Service electric service territory",
          "Bright Energy Solutions participating utility territory for Moorhead Public Service customers"
        ],
        "notes": "Eligibility is for Moorhead Public Service customers using the Bright Energy Solutions rebate platform."
      },
      "eligibleApplicantTypes": [
        "Moorhead Public Service business customers",
        "commercial electric customers",
        "industrial electric customers",
        "agricultural electric customers",
        "institutional customers",
        "multifamily or hospitality properties where a business measure applies",
        "participating trade ally contractors where applicable"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional",
        "food service",
        "grocery and refrigeration",
        "hospitality",
        "manufacturing",
        "data center and IT",
        "compressed air"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "hvac_controls_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "energy_recovery_ventilation_retrofit",
        "high_efficiency_refrigeration_equipment",
        "walk_in_cooler_freezer_upgrade",
        "refrigeration_ec_motor_retrofit",
        "refrigeration_controls_retrofit",
        "efficient_ice_machine",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "high_efficiency_steamer",
        "induction_cooking_equipment",
        "demand_controlled_kitchen_ventilation",
        "demand_controlled_ventilation",
        "energy_management_system",
        "variable_frequency_drive_retrofit",
        "high_efficiency_motor_replacement",
        "efficient_air_compressor",
        "compressed_air_leak_repair"
      ],
      "hardRequirements": [
        "Customer must be served by Moorhead Public Service.",
        "Applications and forms must use the current Bright Energy Solutions or Moorhead Public Service rebate process.",
        "Equipment must meet current measure-specific efficiency, ENERGY STAR, DLC, AHRI, CEE, or program requirements where applicable.",
        "Custom efficiency and custom electrification projects require preapproval and supporting project documentation.",
        "Foodservice, refrigeration, lighting, compressed air, HVAC, and VFD measures are product- and application-specific; invoices and equipment documentation are required."
      ],
      "blockers": [
        "window_replacement is a false-positive category; the current business HVAC list supports window/wall air conditioners, not building window replacement.",
        "low_flow_fixture_retrofit is unsupported by the current official business rebate page reviewed and should not match.",
        "Electric forklift and lithium battery measures are material-handling incentives and should not be forced into building retrofit categories unless a separate taxonomy category exists.",
        "Custom electrification examples such as manufacturing, VRF, large heat pumps, or geothermal require utility review and should not be matched solely from a keyword.",
        "Foodservice and refrigeration incentives are limited to listed qualifying equipment and controls; do not generalize to all kitchen or cold-storage construction."
      ],
      "programType": "Rebate Program",
      "administrator": "Moorhead Public Service / Bright Energy Solutions",
      "applicationUrl": null,
      "websiteUrl": "https://www.brightenergysolutions.com/members/moorhead-public-service-2",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/1942/moorhead-public-service-utility-commercial-and-industrial-energy-efficiency-rebate-program",
        "https://www.brightenergysolutions.com/members/moorhead-public-service-2",
        "https://www.mpsutility.com/index.php/en/energy-conservation/41-bright-energy-solutions-rebates"
      ],
      "evidenceText": "Current Bright Energy Solutions materials for Moorhead Public Service list business rebates for commercial refrigeration, compressed air, custom efficiency, custom electrification, foodservice equipment, heating and cooling equipment, indoor lighting and controls, VFDs, pumps, and related measures.",
      "reasoningNotes": "The repair preserves broad C&I categories only where the current Bright Energy Solutions source provides current measure families. It blocks false-positive window replacement and low-flow fixture matching."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Moorhead/Bright Energy Solutions business rebates include many equipment categories and custom measures.",
        "sourceUrlsChecked": [
          "https://www.mpsutility.com/rebates",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "The target is storage/demand-related and broad; no direct upfront battery or storage formula was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4365",
    "opportunityName": "AES Indiana - Business Energy Incentives Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4365/aes-indiana-business-energy-incentives-program",
    "websiteUrl": "https://www.aesindiana.com/your-business",
    "applicationUrl": null,
    "administrator": "AES Indiana",
    "programType": "utility business prescriptive rebate, custom incentive, direct install, commissioning, demand response, and EV program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 15,
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration",
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
        "retrofitTypeId": "lighting_controls_retrofit",
        "displayName": "Lighting controls retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "lighting controls",
          "networked lighting"
        ]
      },
      {
        "retrofitTypeId": "refrigeration_controls_retrofit",
        "displayName": "Refrigeration controls retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "vending machine controls"
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
      },
      {
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
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
          "IN"
        ],
        "counties": [],
        "cities": [
          "Indianapolis"
        ],
        "utilityTerritories": [
          "AES Indiana electric service territory"
        ],
        "notes": "AES Indiana describes prescriptive rebates for Indianapolis-area business owners."
      },
      "eligibleApplicantTypes": [
        "commercial",
        "industrial",
        "nonprofit",
        "government",
        "school",
        "multifamily"
      ],
      "eligibleSectors": [
        "business",
        "commercial",
        "industrial",
        "small business",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "lighting",
        "HVAC / heat pump",
        "EV charger",
        "demand response",
        "design assistance / study",
        "energy management systems",
        "custom efficiency",
        "commercial kitchen equipment",
        "midstream instant savings",
        "retro-commissioning",
        "strategic energy management",
        "small business direct install"
      ],
      "hardRequirements": [
        "Applicant must be an AES Indiana business customer in the service area.",
        "Prescriptive rebate applications are measure-specific and include lighting, HVAC, and kitchen applications.",
        "Custom incentives require a custom pre-application and program approval before starting the project.",
        "Some programs are direct install, midstream, managed charging, demand response, strategic energy management, or retro-commissioning offerings and should not be classified as simple upfront rebates.",
        "A qualifying HVAC rebate bonus is listed through September 30, 2026."
      ],
      "blockers": [
        "Custom projects started before AES program approval may be ineligible."
      ],
      "programType": "utility business prescriptive rebate, custom incentive, direct install, commissioning, demand response, and EV program",
      "administrator": "AES Indiana",
      "applicationUrl": null,
      "websiteUrl": "https://www.aesindiana.com/your-business",
      "sourceUrlsChecked": [
        "https://www.aesindiana.com/your-business",
        "https://www.aesindiana.com/prescriptive-rebates",
        "https://www.aesindiana.com/custom-incentives",
        "https://www.aesindiana.com/business-ev"
      ],
      "evidenceText": "AES Indiana lists business prescriptive rebates, custom incentives, midstream, SEM, retro-commissioning, small business direct install, CoolCents AC management, EV Charging Rewards, and multifamily direct install; custom incentives require pre-application and approval.",
      "reasoningNotes": "Official pages clearly confirm active availability and distinguish prescriptive rebates from custom, direct-install, EV, and demand-response offerings."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "AES Indiana states custom incentives can be up to $1,000,000, but measure incentives depend on project and catalog details.",
        "sourceUrlsChecked": [
          "https://www.aesindiana.com/your-business"
        ],
        "reasoningNotes": "No reusable per-kWh or per-measure rule was found for the broad C&I target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3195",
    "opportunityName": "Riverland Energy Cooperative - Residential Energy Efficiency Rebate Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3195/riverland-energy-cooperative-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.riverlandenergy.com/rebates",
    "applicationUrl": null,
    "administrator": "Riverland Energy Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 15,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
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
          "ev charger",
          "electric vehicle charging"
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
          "led lighting",
          "led fixture"
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
        "retrofitTypeId": "lighting_controls_retrofit",
        "displayName": "Lighting controls retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "occupancy sensor"
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "WI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Riverland Energy Cooperative service territory"
        ],
        "notes": "Limited to Riverland Energy Cooperative members with qualifying equipment installed on cooperative lines."
      },
      "eligibleApplicantTypes": [
        "member",
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "audit_recommended_improvements",
        "ev_charger_installation",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_furnace_retrofit",
        "efficient_fan_blower_replacement",
        "heat_pump_water_heater",
        "electric_resistance_water_heater",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "residential_appliance_rebate",
        "residential_refrigerator",
        "residential_freezer"
      ],
      "hardRequirements": [
        "Applicant must be a Riverland Energy Cooperative member.",
        "Equipment must be installed on cooperative lines and submitted within the current rebate deadline.",
        "Rebates are subject to fund availability and current form specifications.",
        "Some C&I and agriculture forms are separate from the residential rebate path."
      ],
      "blockers": [
        "Commercial dishwasher, commercial foodservice, broad refrigeration, commercial laundry, and plumbing fixture retrofits are not supported for this residential record.",
        "Do not infer Level 2 EV charger eligibility unless the current EV charger form confirms Level 2 requirements.",
        "C&I and agriculture rebate forms should be matched only to their own customer classes."
      ],
      "programType": "Rebate Program",
      "administrator": "Riverland Energy Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.riverlandenergy.com/rebates",
      "sourceUrlsChecked": [
        "https://www.riverlandenergy.com/rebates",
        "https://www.riverlandenergy.com/energy-efficiency-resources",
        "https://smarthub.tfaforms.net/1462"
      ],
      "evidenceText": "Riverland lists rebates for appliances, audit-recommended improvements, EV chargers, HVAC, lighting, water heaters, and custom incentives for cooperative members.",
      "reasoningNotes": "The record is active but measure detail was less accessible than other cooperative programs, so unsupported commercial categories were removed."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Riverland rebate materials were found but no EV charger or target measure amount was verified.",
        "sourceUrlsChecked": [
          "https://riverlandenergy.com/rebates"
        ],
        "reasoningNotes": "No safe one-time EV or appliance rule could be created from accessible source text.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1613",
    "opportunityName": "Alameda Municipal Power - Commercial Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1613/alameda-municipal-power-commercial-rebate-program",
    "websiteUrl": "https://www.alamedamp.com/217/Businesses",
    "applicationUrl": null,
    "administrator": "Alameda Municipal Power",
    "programType": "municipal utility commercial rebate, customized rebate, EV, and new construction incentive program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 14,
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
        "retrofitTypeId": "high_efficiency_steamer",
        "displayName": "High-efficiency steamer",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "steamer"
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "led lighting",
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
        "retrofitTypeId": "window_film_shading_retrofit",
        "displayName": "Window film / shading retrofit",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "window film"
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
          "CA"
        ],
        "counties": [
          "Alameda County"
        ],
        "cities": [
          "Alameda"
        ],
        "utilityTerritories": [
          "Alameda Municipal Power service territory"
        ],
        "notes": "Available to eligible Alameda Municipal Power commercial customers."
      },
      "eligibleApplicantTypes": [
        "commercial",
        "industrial",
        "government",
        "school",
        "nonprofit"
      ],
      "eligibleSectors": [
        "business",
        "commercial",
        "public sector"
      ],
      "eligibleRetrofitCategories": [
        "lighting",
        "HVAC / heat pump",
        "heat pump water heater",
        "EV charger",
        "EV / fleet vehicle",
        "design assistance / study",
        "commercial foodservice",
        "custom efficiency",
        "new construction energy efficiency"
      ],
      "hardRequirements": [
        "Applicant must be an Alameda Municipal Power commercial customer.",
        "Customized rebates are for energy-efficiency equipment that does not qualify for AMP lighting retrofit or HVAC rebates.",
        "New construction incentives require exceeding California Title 24 standards.",
        "EV business rebates cover forklifts and EV charging stations under separate eligibility rules."
      ],
      "blockers": [
        "Use the specific AMP application path for lighting, HVAC, food service, HPWH, EV, custom, or new construction; do not collapse all into one rebate type."
      ],
      "programType": "municipal utility commercial rebate, customized rebate, EV, and new construction incentive program",
      "administrator": "Alameda Municipal Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.alamedamp.com/217/Businesses",
      "sourceUrlsChecked": [
        "https://www.alamedamp.com/217/Businesses"
      ],
      "evidenceText": "AMP's business page lists customized rebates, EV rebates for businesses, food service, commercial HPWH, HVAC, lighting retrofit, lighting calculator, and new construction.",
      "reasoningNotes": "Official municipal utility page clearly confirms program categories and key custom/new-construction limitations."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "AMP 2026 nonresidential rebate PDF includes HVAC, HPWH, custom kWh, lighting and motor formulas, but not a current EV charger formula.",
        "sourceUrlsChecked": [
          "https://www.alamedamp.com/217/Businesses",
          "https://www.alamedamp.com/DocumentCenter/View/1540"
        ],
        "reasoningNotes": "Official current EV amount needs separate confirmation.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5136",
    "opportunityName": "Corn Belt Energy Coop - Commercial Energy Efficiency Rebate Program",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5136/corn-belt-energy-coop-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.powermoves.com/rebates/business/",
    "applicationUrl": null,
    "administrator": "Wabash Valley Power Alliance / Power Moves",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 14,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "demand_controlled_kitchen_ventilation",
        "displayName": "Demand-controlled kitchen ventilation",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "demand controlled kitchen ventilation",
          "kitchen ventilation"
        ]
      },
      {
        "retrofitTypeId": "energy_management_system",
        "displayName": "Energy management system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy management system",
          "energy management"
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
          "economizer"
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
          "lighting controls",
          "networked lighting"
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
      },
      {
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "vfd"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Corn Belt Energy electric cooperative service territory",
          "Power Moves / Wabash Valley Power Alliance participating cooperative territory for Corn Belt Energy members"
        ],
        "notes": "Eligibility is limited to Corn Belt Energy business, school, farm, commercial, and industrial accounts that qualify under Power Moves C&I program rules."
      },
      "eligibleApplicantTypes": [
        "Corn Belt Energy business members",
        "commercial electric customers",
        "industrial electric customers",
        "school customers",
        "farm and agricultural operations",
        "business new-construction applicants",
        "contractors or vendors with customer authorization"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "education",
        "schools",
        "food service",
        "refrigeration and grocery",
        "new construction",
        "custom commercial efficiency"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "exterior_site_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "hvac_controls_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_refrigeration_equipment",
        "energy_management_system",
        "demand_controlled_kitchen_ventilation",
        "variable_frequency_drive_retrofit"
      ],
      "hardRequirements": [
        "Customer must be a qualifying Corn Belt Energy member or project site served by the cooperative.",
        "Business retrofit projects must use the current Power Moves C&I general application and the applicable lighting, non-lighting, or custom worksheet.",
        "Custom projects and new-construction projects require review before purchase or installation.",
        "Prescriptive measures must meet the 2026 C&I application booklet and worksheet requirements.",
        "Applications must include project documentation, invoices, equipment specifications, and any required worksheets.",
        "Rebate availability is subject to Power Moves and cooperative funding and program rules."
      ],
      "blockers": [
        "Do not treat this record as a battery, storage, or demand-response opportunity; the C&I page is for efficiency rebates and related custom projects.",
        "Residential EV charger, residential heat pump, and residential water-heater rebates on the Corn Belt page are separate residential offerings and should not be merged into this commercial record.",
        "Low-flow water fixtures are not supported by the current Power Moves business source reviewed for this record.",
        "Demand-controlled kitchen ventilation is a commercial-kitchen control measure and should not be generalized to all ventilation projects.",
        "Energy management system, HVAC controls, and custom projects require utility review and should not auto-match from a generic controls keyword alone.",
        "Exact submeasure amounts and technical limits should be checked against the current 2026 Power Moves application booklet before quoting incentive values."
      ],
      "programType": "Rebate Program",
      "administrator": "Wabash Valley Power Alliance / Power Moves",
      "applicationUrl": null,
      "websiteUrl": "https://www.powermoves.com/rebates/business/",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/5136/corn-belt-energy-coop-commercial-energy-efficiency-rebate-program",
        "https://www.powermoves.com/rebates/business/",
        "https://www.powermoves.com/energy-efficiency/businesses-and-farms/",
        "https://cornbeltenergy.com/programs-services/rebate-programs/"
      ],
      "evidenceText": "Power Moves' current business page describes prescriptive retrofit rebates for lighting and non-lighting projects, custom rebates, and new-construction rebates, with 2026 C&I application materials. Corn Belt Energy's current rebate page links commercial and industrial energy efficiency incentives for businesses, schools, and farm/ag operations through Wabash Valley Power Alliance.",
      "reasoningNotes": "The broad C&I match is valid, but several matched categories depend on the detailed 2026 Power Moves worksheets rather than the high-level web page. Residential Corn Belt rebates must be kept separate."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "PowerMoves commercial measures were found, but the target is storage/demand-related and no direct battery incentive formula was verified.",
        "sourceUrlsChecked": [
          "https://www.powermoves.com/energy-efficiency/businesses-and-farms/",
          "https://www.powermoves.com/wp-content/uploads/2026/01/2026-Prescriptive-Non-Lighting.pdf"
        ],
        "reasoningNotes": "Do not substitute lighting/HVAC controls for a battery TOU demand savings target without clear storage incentive terms.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1931",
    "opportunityName": "Alexandria Light and Power - Commercial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1931/alexandria-light-and-power-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.alputilities.com/commercial/rebates-programs/",
    "applicationUrl": null,
    "administrator": "Alexandria Light and Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 14,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "demand_controlled_ventilation",
        "displayName": "Demand-controlled ventilation",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "demand controlled ventilation"
        ]
      },
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
          "commercial dishwasher",
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
          "air conditioning"
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration",
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
          "led lighting",
          "lighting retrofit"
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
          "MN"
        ],
        "counties": [
          "Douglas County"
        ],
        "cities": [
          "Alexandria"
        ],
        "utilityTerritories": [
          "Alexandria Light and Power electric service territory"
        ],
        "notes": "Commercial rebates are offered through ALP Utilities and Bright Energy Solutions for eligible business customers."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "demand_controlled_ventilation",
        "efficient_fan_blower_replacement",
        "electric_forklift_material_handling",
        "energy_management_system",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_hvac_replacement",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "high_efficiency_steamer",
        "commercial_foodservice_equipment",
        "commercial_kitchen_hood_controls",
        "high_efficiency_refrigeration_equipment",
        "efficient_ice_machine",
        "door_gasket_strip_curtain_night_cover",
        "refrigeration_ec_motor_retrofit",
        "walk_in_cooler_freezer_upgrade",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "variable_frequency_drive_retrofit",
        "efficient_air_compressor",
        "compressed_air_system_upgrade"
      ],
      "hardRequirements": [
        "Applicant must be an eligible ALP Utilities commercial or industrial customer.",
        "Projects must meet Bright Energy Solutions measure specifications and rebate limits.",
        "Custom electrification and some industrial projects require preapproval.",
        "Rebates are limited to current program funding and current forms."
      ],
      "blockers": [
        "Window replacement is a false positive; the official page mentions window or wall air conditioners, not building window replacement.",
        "Residential appliance rebates should not be matched to this commercial program.",
        "Custom electrification should not be generalized beyond verified fuel-switching or qualifying electric measures."
      ],
      "programType": "Rebate Program",
      "administrator": "Alexandria Light and Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.alputilities.com/commercial/rebates-programs/",
      "sourceUrlsChecked": [
        "https://www.alputilities.com/commercial/rebates-programs/"
      ],
      "evidenceText": "ALP lists commercial rebates for refrigeration, foodservice, compressed air, electrification, forklifts, HVAC, lighting, controls, pumps, and VFDs.",
      "reasoningNotes": "The official commercial page supports many of the original C&I categories but not window replacement."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Alexandria/Bright Energy commercial sources include many measures but no direct upfront battery-storage formula was verified.",
        "sourceUrlsChecked": [
          "https://www.alputilities.com/rebate-category/business/",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "Target is storage/demand-related; do not substitute unrelated refrigeration or lighting rebates.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4586",
    "opportunityName": "Otter Tail Power Company - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4586/otter-tail-power-company-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.otpco.com/rebates-and-efficiency-programs/programs/rebates-residential/",
    "applicationUrl": "https://www.otpco.com/rebates-and-efficiency-programs/programs/rebates-residential/",
    "administrator": "Otter Tail Power Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 14,
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
          "air conditioner"
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
          "lighting retrofit"
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Otter Tail Power Company electric service territory in Minnesota"
        ],
        "notes": "Otter Tail Power also publishes state-specific forms for North Dakota and South Dakota; this DSIRE record is repaired for the Minnesota residential pathway."
      },
      "eligibleApplicantTypes": [
        "Otter Tail Power residential electric customers",
        "homeowners",
        "residential landlords or property owners where eligible",
        "renters with required property-owner approval",
        "residential EV charger customers"
      ],
      "eligibleSectors": [
        "residential",
        "transportation electrification"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "window_replacement",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "high_efficiency_refrigeration_equipment",
        "high_efficiency_laundry_equipment",
        "induction_cooking_equipment"
      ],
      "hardRequirements": [
        "Equipment must be installed at a premises receiving Otter Tail Power electric service.",
        "Minnesota rebate requests must use the applicable current Minnesota customer rebate form and be submitted by the program deadline.",
        "HVAC and heat pump rebates require applicable equipment specifications, invoices, and AHRI or manufacturer documentation where required.",
        "ENERGY STAR appliance rebates are limited to qualifying equipment types and quantity limits.",
        "ENERGY STAR window incentives are limited to qualified replacement windows in electrically heated homes.",
        "EV charger incentives require qualifying Level 2 charging equipment, a dedicated circuit, and participation in the applicable Otter Tail Power EV or off-peak rate terms."
      ],
      "blockers": [
        "Do not match commercial kitchen categories; dishwasher, induction, clothes dryer, clothes washer, refrigerator, and freezer support is residential appliance-specific.",
        "EV charging should be limited to qualifying residential Level 2 chargers and rate participation; do not match DC fast charging.",
        "Window replacement is limited to ENERGY STAR residential window requirements and electrically heated home conditions.",
        "CoolSavings or demand-response thermostat enrollment should not be treated as a standalone thermostat purchase rebate unless the current form confirms a qualifying equipment incentive.",
        "Air sealing and insulation were not supported as current Minnesota residential rebate categories in the reviewed official Otter Tail pages for this record."
      ],
      "programType": "Rebate Program",
      "administrator": "Otter Tail Power Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.otpco.com/rebates-and-efficiency-programs/programs/rebates-residential/",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/4586/otter-tail-power-company-residential-energy-efficiency-rebate-program",
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/rebates-residential/",
        "https://www.otpco.com/media/fspbkton/mn-customer-rebate-application-form-3053_2026-fillable.pdf",
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/electric-vehicle-rate/",
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/energy-star/",
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/energy-star-window-rebates/",
        "https://www.otpco.com/rebates-and-efficiency-programs/topics/air-conditioning/"
      ],
      "evidenceText": "Otter Tail Power's current residential rebate materials list Minnesota forms for heating and cooling equipment, heat pumps, geothermal heat pumps, smart thermostats, heat pump water heaters, ENERGY STAR appliances, ENERGY STAR windows, and Level 2 EV charging station rebates tied to applicable charging terms.",
      "reasoningNotes": "The repair keeps residential HVAC, heat pump, geothermal, HPWH, ENERGY STAR appliance, window, and Level 2 EV charging categories. It blocks unrelated commercial, insulation, and DC fast charging matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "GPT Pro found a Level 2 charger rebate, but this target is mapped to fleet fuel replacement.",
        "sourceUrlsChecked": [
          "https://www.otpco.com/ways-to-save/rebates/electric-vehicles/",
          "https://www.otpco.com/ways-to-save/rebates/"
        ],
        "reasoningNotes": "Charger incentives should not be attached to a vehicle/fleet replacement target.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2013",
    "opportunityName": "Austin Energy - Commercial Energy Management Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2013/austin-energy-commercial-energy-management-rebate-program",
    "websiteUrl": "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial",
    "applicationUrl": null,
    "administrator": "Austin Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 14,
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
        "retrofitTypeId": "cool_roof_reflective_roof",
        "displayName": "Cool roof / reflective roof coating",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "reflective roof",
          "roof coating"
        ]
      },
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
          "hvac replacement",
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
          "lighting retrofit"
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
          "ec motor"
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
        "retrofitTypeId": "thermal_energy_storage",
        "displayName": "Thermal energy storage",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "thermal energy storage"
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
          "TX"
        ],
        "counties": [],
        "cities": [
          "Austin"
        ],
        "utilityTerritories": [
          "Austin Energy electric service territory"
        ],
        "notes": "Limited to Austin Energy commercial electric customers and current commercial rebate eligibility rules."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "small_business_customer",
        "nonprofit_customer",
        "institutional_customer",
        "multifamily_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "multifamily",
        "institutional",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "commercial_demand_response",
        "automated_demand_response_controls",
        "energy_management_system",
        "hvac_controls_retrofit",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "cool_roof_reflective_roof",
        "thermal_energy_storage",
        "variable_frequency_drive_retrofit",
        "refrigeration_ec_motor_retrofit",
        "energy_recovery_ventilator",
        "ev_charger_installation",
        "commercial_kitchen_equipment",
        "cooling_tower_controls_optimization",
        "window_replacement",
        "window_film_shading_retrofit",
        "ups_efficiency_upgrade"
      ],
      "hardRequirements": [
        "Applicant must be an Austin Energy commercial electric customer.",
        "Most rebates require application before installation and compliance with permit and documentation requirements.",
        "Standard and enhanced incentive caps apply based on customer and project type.",
        "Thermal energy storage requires feasibility and load-shift requirements.",
        "Demand response requires qualifying load reduction and program enrollment."
      ],
      "blockers": [
        "Battery storage is not supported by this commercial efficiency rebate; thermal storage and UPS are separate from battery storage.",
        "Insulation was not verified on the current commercial rebate list.",
        "Financing is a separate offering and should not be treated as a rebate measure.",
        "Demand response should be matched as program participation or controls, not as a generic equipment retrofit."
      ],
      "programType": "Rebate Program",
      "administrator": "Austin Energy",
      "applicationUrl": null,
      "websiteUrl": "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial",
      "sourceUrlsChecked": [
        "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial",
        "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial/appliances-equipment/custom-tech",
        "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial/commercial-demand-response",
        "https://austinenergy.com/energy-efficiency/rebates-incentives/commercial/cooling-heating/thermal-storage"
      ],
      "evidenceText": "Austin Energy lists commercial rebates for demand response, HVAC, lighting, controls, HPWH, reflective roof, thermal storage, VFDs, EC motors, EV charging, and windows.",
      "reasoningNotes": "The original match should keep supported commercial energy-management and storage-adjacent categories but remove battery storage and unverified insulation."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official commercial rebates page is broad and includes demand response, storage and energy management options.",
        "sourceUrlsChecked": [
          "https://savings.austinenergy.com/rebates/commercial/"
        ],
        "reasoningNotes": "No one-time storage rebate formula was verified, and demand response is not one-time.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3276",
    "opportunityName": "Barron Electric Cooperative - ENERGY STAR Appliance, Energy Efficient Lighting, HVAC and Water Heater Rebate Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3276/barron-electric-cooperative-energy-star-appliance-energy-efficient-lighting-hvac-and-water-heater-rebate-program",
    "websiteUrl": "https://www.barronelectric.com/2026-energy-rebates",
    "applicationUrl": null,
    "administrator": "Barron Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 14,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "retrofitTypeId": "energy_audit",
        "displayName": "Energy audit",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
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
          "electric vehicle charging"
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
          "led lighting",
          "led fixture"
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
          "lighting controls",
          "occupancy sensor"
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "WI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Barron Electric Cooperative service territory"
        ],
        "notes": "Limited to Barron Electric Cooperative members and equipment installed on cooperative lines."
      },
      "eligibleApplicantTypes": [
        "member",
        "residential_customer",
        "commercial_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "audit_recommended_improvements",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_furnace_retrofit",
        "efficient_fan_blower_replacement",
        "heat_pump_water_heater",
        "electric_resistance_water_heater",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "level_2_ev_charger_installation",
        "residential_appliance_rebate",
        "residential_clothes_washer",
        "residential_clothes_dryer",
        "residential_dishwasher",
        "residential_refrigerator",
        "residential_freezer",
        "induction_range"
      ],
      "hardRequirements": [
        "Applicant must be a Barron Electric Cooperative member.",
        "Equipment must be purchased, installed, or recycled in the program year and located on cooperative lines.",
        "Forms generally require submission within the stated deadline and are subject to funds.",
        "EV charger rebate requires load management participation.",
        "Audit-recommended improvements require a qualifying assessment and completion within the stated period."
      ],
      "blockers": [
        "Commercial dishwasher and broad foodservice categories are false positives for the appliance rebate.",
        "Broad commercial refrigeration should not be inferred from residential refrigerator or freezer rebates.",
        "Low-flow plumbing fixtures and water-conservation measures are not supported by the current energy rebate forms.",
        "Efficient blower should be limited to qualifying furnace ECM blower rules."
      ],
      "programType": "Rebate Program",
      "administrator": "Barron Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.barronelectric.com/2026-energy-rebates",
      "sourceUrlsChecked": [
        "https://www.barronelectric.com/2026-energy-rebates",
        "https://smarthub.tfaforms.net/973",
        "https://smarthub.tfaforms.net/2488",
        "https://smarthub.tfaforms.net/975",
        "https://smarthub.tfaforms.net/2490",
        "https://smarthub.tfaforms.net/977",
        "https://smarthub.tfaforms.net/2491",
        "https://smarthub.tfaforms.net/1016",
        "https://smarthub.tfaforms.net/2541",
        "https://www.barronelectric.com/electric-vehicles",
        "https://www.barronelectric.com/load-management"
      ],
      "evidenceText": "Barron Electric's 2026 rebate materials list appliances, audit improvements, HVAC, lighting, water heaters, EV chargers, and load management requirements.",
      "reasoningNotes": "The original program name is broad, but the supported product matches are mostly residential appliances, HVAC, lighting, water heaters, and EV charging."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "Official rebate source returned HTTP 403 in source fetch.",
        "sourceUrlsChecked": [
          "https://www.barronelectric.com/rebates-2023"
        ],
        "reasoningNotes": "No current official whole-building or measure-specific formula was accessible.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3637",
    "opportunityName": "Liberty Utilities - Commercial & Industrial Energy Efficiency Rebates",
    "state": "AR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3637/liberty-utilities-commercial-and-industrial-energy-efficiency-rebates",
    "websiteUrl": "https://central.libertyutilities.com/all/residential/ways-to-save/arkansas-electric-commercial-industrial-program.html",
    "applicationUrl": null,
    "administrator": "Liberty Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 13,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "demand_controlled_ventilation",
        "displayName": "Demand-controlled ventilation",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "demand controlled ventilation"
        ]
      },
      {
        "retrofitTypeId": "door_gasket_strip_curtain_night_cover",
        "displayName": "Door gasket / strip curtain / night cover retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "strip curtain"
        ]
      },
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
        "retrofitTypeId": "hvac_controls_retrofit",
        "displayName": "HVAC controls retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "economizer"
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
          "occupancy sensor"
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
          "evaporator fan"
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
          "variable speed drive"
        ]
      },
      {
        "retrofitTypeId": "walk_in_cooler_freezer_upgrade",
        "displayName": "Walk-in cooler/freezer upgrade",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "walk in cooler",
          "cooler freezer"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "AR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Liberty Utilities Arkansas electric service territory"
        ],
        "notes": "Limited to Liberty Utilities Arkansas commercial and industrial electric customers."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "hvac_controls_retrofit",
        "energy_management_system",
        "variable_frequency_drive_retrofit",
        "efficient_motor_replacement",
        "high_efficiency_refrigeration_equipment",
        "walk_in_cooler_freezer_upgrade",
        "refrigeration_ec_motor_retrofit",
        "custom_electric_efficiency_project"
      ],
      "hardRequirements": [
        "Applicant must be a Liberty Utilities Arkansas business customer.",
        "Custom retrofit projects require preapproval before equipment purchase or installation.",
        "Projects must pass current cost-effectiveness, savings, payback, and facility cap rules.",
        "Prescriptive projects must follow current program workbooks and application requirements."
      ],
      "blockers": [
        "Low-flow fixtures and water-conservation measures are not supported by this electric C&I rebate.",
        "Demand-controlled ventilation, strip curtains, and other specific submeasures should be matched only if the current prescriptive workbook or custom approval supports them.",
        "Residential measures should not be matched to this commercial and industrial program."
      ],
      "programType": "Rebate Program",
      "administrator": "Liberty Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://central.libertyutilities.com/all/residential/ways-to-save/arkansas-electric-commercial-industrial-program.html",
      "sourceUrlsChecked": [
        "https://central.libertyutilities.com/all/residential/ways-to-save/arkansas-electric-commercial-industrial-program.html",
        "https://central.libertyutilities.com/all/commercial/ways-to-save/rebates.html"
      ],
      "evidenceText": "Liberty lists Arkansas business incentives for lighting, air conditioning, heating, motors, refrigeration, energy management systems, and custom electric-saving measures.",
      "reasoningNotes": "The official page supports broad C&I electric efficiency categories but not every specific DSIRE-derived submeasure."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Liberty Arkansas C&I efficiency rebates are measure-specific and no current whole-building/custom formula was verified.",
        "sourceUrlsChecked": [
          "https://central.libertyutilities.com/all/residential/ways-to-save/rebates.html",
          "https://central.libertyutilities.com/all/commercial/ways-to-save.html"
        ],
        "reasoningNotes": "Target includes many C&I measures; a current application table is needed.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1788",
    "opportunityName": "Cedar Falls Utilities - Residential Energy Efficiency Rebate Program",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1788/cedar-falls-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.cfu.net/save-energy/residential-business/residential-rebates",
    "applicationUrl": null,
    "administrator": "Cedar Falls Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 13,
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
          "duct insulation"
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
          "ev charging"
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
          "programmable thermostat",
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
          "IA"
        ],
        "counties": [
          "Black Hawk County"
        ],
        "cities": [
          "Cedar Falls"
        ],
        "utilityTerritories": [
          "Cedar Falls Utilities service territory"
        ],
        "notes": "Limited to CFU residential customers and applicable fuel-service requirements."
      },
      "eligibleApplicantTypes": [
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "ductless_mini_split_heat_pump",
        "duct_sealing_and_insulation",
        "smart_thermostat_zoning_retrofit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "residential_refrigerator_recycling",
        "residential_freezer_recycling",
        "window_air_conditioner_recycling",
        "ev_time_of_use_charging_credit"
      ],
      "hardRequirements": [
        "Applicant must be a CFU residential customer.",
        "Some measures require preapproval before purchase or installation.",
        "Water heating rebates require CFU to provide the applicable water heating fuel.",
        "Thermal envelope improvements must meet contractor, insulation, and preapproval requirements.",
        "EV offering is an off-peak charging community credit rather than charger hardware funding."
      ],
      "blockers": [
        "Do not match EV charger installation; the verified CFU EV offering is a credit or community program, not hardware rebate.",
        "Appliance recycling should not be generalized to high-efficiency refrigeration equipment.",
        "Window replacement is unsupported; window air conditioner recycling is product-specific.",
        "Commercial applicants and commercial measures are outside this residential record."
      ],
      "programType": "Rebate Program",
      "administrator": "Cedar Falls Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.cfu.net/save-energy/residential-business/residential-rebates",
      "sourceUrlsChecked": [
        "https://www.cfu.net/save-energy/residential-business/residential-rebates",
        "https://www.cfu.net/save-energy/residential-business/residential-services/tips-for-saving-energy"
      ],
      "evidenceText": "CFU lists residential rebates for water heating, HVAC, ductwork, thermostats, insulation, air sealing, and recycling refrigerators, freezers, and window air conditioners.",
      "reasoningNotes": "The EV match was a false-positive hardware inference; the current CFU source supports an off-peak charging credit rather than charger installation."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "The EV charging source describes an $8 monthly off-peak charging incentive rather than a one-time charger rebate.",
        "sourceUrlsChecked": [
          "https://www.cfu.net/save-energy/residential-business/residential-rebates"
        ],
        "reasoningNotes": "Monthly off-peak EV incentives are recurring bill credits.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3754",
    "opportunityName": "Entergy New Orleans - Small and Large Commercial and Industrial Incentives Program",
    "state": "LA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3754/entergy-new-orleans-small-and-large-commercial-and-industrial-incentives-program",
    "websiteUrl": "https://energysmartnola.info/businesses/equipment-replacement/",
    "applicationUrl": "https://energysmartnola.formstack.com",
    "administrator": "Energy Smart / Entergy New Orleans",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 13,
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "chiller"
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
          "low flow",
          "aerator",
          "showerhead"
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
          "evaporator fan"
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
          "LA"
        ],
        "counties": [
          "Orleans Parish"
        ],
        "cities": [
          "New Orleans"
        ],
        "utilityTerritories": [
          "Entergy New Orleans electric service territory"
        ],
        "notes": "Energy Smart is the New Orleans energy efficiency program for Entergy New Orleans electric customers."
      },
      "eligibleApplicantTypes": [
        "Entergy New Orleans business electric customers",
        "small business customers",
        "large commercial customers",
        "industrial customers",
        "facility managers",
        "commercial property owners",
        "trade ally contractors"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "small business",
        "large commercial",
        "office",
        "retail",
        "education",
        "hospitality",
        "restaurant and food service",
        "grocery and refrigeration",
        "public sector where served by Entergy New Orleans"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "exterior_site_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_ec_motor_retrofit",
        "anti_sweat_heater_controls",
        "energy_management_system",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "variable_frequency_drive_retrofit"
      ],
      "hardRequirements": [
        "Customer must be an Entergy New Orleans electric business customer.",
        "Equipment replacement incentives apply to qualifying equipment on the Energy Smart incentive list or workbook.",
        "Lighting projects use the Energy Smart lighting workbook.",
        "HVAC, refrigeration, commercial kitchen equipment, and window-film projects use the non-lighting workbook and incentive list.",
        "Custom projects must achieve verifiable electric energy reduction and require preapproval.",
        "Building automation, premium-efficiency motor, VFD, and other non-standard projects should be routed through the custom process unless explicitly prescriptive.",
        "Applicants should work with Energy Smart advisors or trade allies and provide required invoices, project forms, and technical documentation."
      ],
      "blockers": [
        "low_flow_fixture_retrofit is not supported by the current official page reviewed and should not be inferred from commercial kitchen sink imagery or generic water-saving language.",
        "Smart thermostat participation may also appear in separate demand-response offers; do not merge demand-response events or annual rewards into equipment-replacement rebates.",
        "Commercial kitchen categories must be limited to equipment on the current incentive list; do not generalize to all kitchen equipment.",
        "Energy management system and VFD projects require custom review when not listed as prescriptive equipment.",
        "Demand response, assessments, and new-construction code-compliance pathways are separate Energy Smart offerings and should not be treated as ordinary equipment rebate matches.",
        "Projects outside Entergy New Orleans electric territory are ineligible."
      ],
      "programType": "Rebate Program",
      "administrator": "Energy Smart / Entergy New Orleans",
      "applicationUrl": "https://energysmartnola.formstack.com",
      "websiteUrl": "https://energysmartnola.info/businesses/equipment-replacement/",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/3754/entergy-new-orleans-small-and-large-commercial-and-industrial-incentives-program",
        "https://energysmartnola.info/",
        "https://energysmartnola.info/businesses/equipment-replacement/",
        "https://energysmartnola.info/custom-and-prescriptive-incentives/",
        "https://nola.gov/flip-the-switch/programs/for-businesses/",
        "https://www.entergy.com/blog/upgrade-your-business-with-energy-efficient-solutions-and-earn-cash-incentives"
      ],
      "evidenceText": "Current Energy Smart pages state that Entergy New Orleans electric customers, including businesses, can receive incentives for eligible upgrades. The business equipment replacement page lists incentives for LED lighting and for HVAC, refrigeration, commercial kitchen equipment, window film, and custom projects such as building automation, premium-efficiency motor and VFD installations. It states that custom projects require preapproval.",
      "reasoningNotes": "The repair keeps the business equipment and custom categories supported by current Energy Smart pages. Water-fixture matching is blocked because current official text reviewed did not verify a low-flow fixture rebate in this C&I target."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official Energy Smart New Orleans commercial pages point to prescriptive/custom incentives but did not expose target measure values.",
        "sourceUrlsChecked": [
          "https://www.energysmartnola.info/commercial-industrial/"
        ],
        "reasoningNotes": "Matched kitchen and refrigeration measures require a measure table; no safe official value was selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2650",
    "opportunityName": "CenterPoint Energy - Residential and Hard-to-Reach Energy Efficiency Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2650/centerpoint-energy-residential-and-hard-to-reach-energy-efficiency-program",
    "websiteUrl": "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/residential-standard-offer-program.aspx?au=res&sa=ho",
    "applicationUrl": "https://centerpoint.anbetrack.com",
    "administrator": "CenterPoint Energy",
    "programType": "Standard Offer Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 13,
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
          "duct insulation"
        ]
      },
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
          "TX"
        ],
        "counties": [],
        "cities": [
          "Houston"
        ],
        "utilityTerritories": [
          "CenterPoint Energy Houston Electric electric distribution service territory"
        ],
        "notes": "Program applies to residential customers within CenterPoint Energy Houston Electric territory. Texas law prevents the utility from offering these programs directly to residential customers; measures are delivered by participating third-party contractors or sponsors."
      },
      "eligibleApplicantTypes": [
        "approved project sponsors",
        "participating contractors",
        "service companies",
        "community agencies",
        "other approved organizations",
        "residential host customers",
        "hard-to-reach income-qualified residential customers"
      ],
      "eligibleSectors": [
        "residential",
        "hard-to-reach residential",
        "income-qualified residential",
        "single-family residential",
        "residential electric efficiency"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "window_replacement",
        "low_flow_fixture_retrofit",
        "efficient_pump_replacement"
      ],
      "hardRequirements": [
        "Host customer must be within CenterPoint Energy Houston Electric service territory.",
        "Program incentives are paid to contractors, service companies, community agencies, or other approved organizations, not as ordinary direct homeowner rebates.",
        "Residential Standard Offer projects must produce verified kW and kWh savings and follow CenterPoint sponsor program rules.",
        "HVAC incentives must be delivered through approved heating and cooling professionals and meet current efficiency requirements.",
        "A/C tune-ups require an eligible central A/C or heat pump, maximum residential system size conditions, and prior-participation limits.",
        "Smart thermostat discounts require qualifying ENERGY STAR equipment and current instant-discount terms.",
        "Water-saving, weatherization, insulation, window, and pump measures must follow current CenterPoint or sponsor pathway requirements."
      ],
      "blockers": [
        "This should not be presented as a direct homeowner retail rebate; CenterPoint states Texas law prevents direct residential program delivery and the programs are implemented by third-party contractors.",
        "high_efficiency_commercial_dishwasher is a false-positive category for this residential record.",
        "high_efficiency_refrigeration_equipment is not supported by the current CenterPoint residential source reviewed and should not be inferred.",
        "ground_source_geothermal_heat_pump and heat_pump_water_heater were not verified from current accessible CenterPoint residential sources and should not be auto-matched.",
        "Window replacement should be limited to ENERGY STAR windows, doors, and skylights where program rules allow, not generic window projects.",
        "Efficient pump replacement should be limited to qualifying residential variable-speed pool pump measures, not all pumps."
      ],
      "programType": "Standard Offer Program",
      "administrator": "CenterPoint Energy",
      "applicationUrl": "https://centerpoint.anbetrack.com",
      "websiteUrl": "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/residential-standard-offer-program.aspx?au=res&sa=ho",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/2650/centerpoint-energy-residential-and-hard-to-reach-energy-efficiency-program",
        "https://www.centerpointenergy.com/en-us/SaveEnergyandMoney/Pages/residential-standard-offer-program.aspx?au=res&sa=ho",
        "https://www.centerpointenergy.com/en-us/residential/save-energy-money/electric-efficiency-programs/residential-electric-efficiency?sa=ho",
        "https://centerpoint.anbetrack.com"
      ],
      "evidenceText": "CenterPoint's current Residential Standard Offer page says the program offers incentives to contractors, service companies, community agencies, and other organizations for energy efficiency retrofit projects in CenterPoint Energy electric territory, and that incentives are paid to contractors for kW and kWh savings. Current residential efficiency pages describe HVAC upgrades, A/C and heat-pump tune-ups, smart thermostats, LED discounts, insulation and air sealing guidance, variable-speed pool pumps, and ENERGY STAR windows.",
      "reasoningNotes": "The repair keeps residential electric efficiency measures that current CenterPoint sources support and blocks unsupported commercial kitchen, refrigeration, geothermal, and HPWH matches. The sponsor-driven delivery model is critical for matching."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "CenterPoint Texas residential program is administered through standard-offer implementers rather than direct published customer rebates.",
        "sourceUrlsChecked": [
          "https://cnpres.programprocessing.com/"
        ],
        "reasoningNotes": "Standard offer programs do not provide a direct reusable customer formula.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4148",
    "opportunityName": "Southeast Colorado Power Association - Energy Efficiency Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4148/southeast-colorado-power-association-energy-efficiency-rebate-program",
    "websiteUrl": "https://secpa.com/rebates",
    "applicationUrl": null,
    "administrator": "Southeast Colorado Power Association",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 12,
    "targetKind": "reviewed_no_rule_reclassification",
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "led lighting",
          "led fixture"
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
      },
      {
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
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
          "CO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Southeast Colorado Power Association service territory"
        ],
        "notes": "Limited to SECPA members and applicable Tri-State or SECPA rebate forms."
      },
      "eligibleApplicantTypes": [
        "member",
        "residential_customer",
        "commercial_customer",
        "agricultural_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "agricultural",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "electric_resistance_water_heater",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_hvac_replacement",
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation",
        "variable_frequency_drive_retrofit",
        "efficient_motor_replacement",
        "residential_clothes_dryer",
        "residential_refrigerator",
        "residential_freezer",
        "induction_range",
        "outdoor_power_equipment"
      ],
      "hardRequirements": [
        "Applicant must be a SECPA member.",
        "Application, receipt, and W-9 documentation are required under current forms.",
        "Appliances must meet ENERGY STAR or form-specific requirements where applicable.",
        "VSD retrofits apply to existing equipment and are subject to member annual caps.",
        "EV charging rebates depend on charger level and public or non-public configuration."
      ],
      "blockers": [
        "Low-flow fixtures and water conservation are not supported by the SECPA energy rebate page.",
        "Induction is a residential appliance or range measure, not commercial kitchen equipment.",
        "Broad commercial refrigeration should not be inferred from residential refrigerator or freezer rebates.",
        "LED lighting was not verified on the current SECPA rebate form list reviewed.",
        "Existing VSD replacement does not qualify under the VSD retrofit fact sheet."
      ],
      "programType": "Rebate Program",
      "administrator": "Southeast Colorado Power Association",
      "applicationUrl": null,
      "websiteUrl": "https://secpa.com/rebates",
      "sourceUrlsChecked": [
        "https://secpa.com/rebates",
        "https://secpa.com/sites/default/files/2024-11/water-heater-rebate-application.pdf",
        "https://secpa.com/sites/default/files/2024-11/heat-pump-mini-split-application.pdf",
        "https://secpa.com/sites/default/files/2024-11/electric-vehicle-charging-equipment-rebate-application.pdf",
        "https://secpa.com/sites/default/files/2024-11/energy-star-air-conditioner-rebate-application.pdf",
        "https://secpa.com/sites/default/files/2024-11/variable-speed-drive-retrofit.pdf",
        "https://secpa.com/sites/default/files/2024-11/energy-star-applicances-rebate.pdf"
      ],
      "evidenceText": "SECPA rebate forms cover water heaters, heat pumps, AC, EV charging, VSD retrofits, motors, and ENERGY STAR appliances including refrigerator, freezer, dryer, and induction cooking.",
      "reasoningNotes": "The current form list supports EV, HVAC, VSD, water heater, and selected appliance measures, but not lighting or low-flow plumbing matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "SECPA rebate materials include many residential and commercial measures, but target whole-building scope is broad.",
        "sourceUrlsChecked": [
          "https://www.secpa.com/rebates/",
          "https://programs.dsireusa.org/system/program/detail/4148"
        ],
        "reasoningNotes": "No single one-time formula was safely selected for the broad matched measure set.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5449",
    "opportunityName": "Energize Delaware - Home Performance with ENERGY STAR",
    "state": "DE",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5449/energize-delaware-home-performance-with-energy-star",
    "websiteUrl": "https://energizedelaware.org/residential/get-started-home-performance-with-energy-star/",
    "applicationUrl": "https://energizedelaware.org/residential/get-started-home-performance-with-energy-star/",
    "administrator": "Energize Delaware",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 12,
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
          "DE"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Statewide Delaware"
        ],
        "notes": "Statewide Delaware residential program administered by Energize Delaware/Delaware Sustainable Energy Utility; eligibility is based on property and program rules rather than a single electric utility territory."
      },
      "eligibleApplicantTypes": [
        "Homeowners",
        "Tenants with owner approval",
        "Residential property owners",
        "Landlords",
        "Income-qualified households",
        "Military and first responders where eligible",
        "Downtown Development District owners or tenants where eligible"
      ],
      "eligibleSectors": [
        "Residential",
        "Low-income residential",
        "Rental residential",
        "Small multifamily"
      ],
      "eligibleRetrofitCategories": [
        "Home energy assessment",
        "Direct-install LEDs, aerators, showerheads and pipe insulation",
        "Air sealing",
        "Duct sealing",
        "Attic insulation",
        "Wall insulation",
        "Crawlspace and floor insulation",
        "Rim joist insulation",
        "Crawlspace encapsulation",
        "Heat pump HVAC",
        "Mini-split heat pump",
        "Central air conditioner",
        "Furnace",
        "Boiler",
        "Condensing boiler",
        "Heat pump water heater",
        "Tankless water heater",
        "Smart thermostat",
        "HRV/ERV ventilation",
        "Whole-home dehumidifier",
        "Weatherization"
      ],
      "hardRequirements": [
        "A Home Performance with ENERGY STAR assessment is mandatory before work is eligible.",
        "Work must be completed through a Program-Participating Contractor or program advisor as applicable.",
        "Contractor must submit rebate reservation and signed agreement before work starts.",
        "Rebates are generally capped at 50 percent of installed cost up to the measure incentive level, with higher assisted caps where applicable.",
        "Self-installed measures and work completed before the assessment or reservation are not eligible.",
        "Multifamily buildings with more than four units under one roof must meet program height and age limits."
      ],
      "blockers": [
        "Geothermal is explicitly excluded from HPwES incentives and redirected to DNREC's Green Energy Program.",
        "Windows and doors are not eligible HPwES incentives even though they can affect home efficiency.",
        "Lighting upgrades are not a rebate category except direct-install items during the assessment.",
        "Smart thermostat incentives must be bundled with other eligible measures.",
        "The old homeowner URL appears replaced by the current Energize Delaware get-started page."
      ],
      "programType": "Rebate Program",
      "administrator": "Energize Delaware",
      "applicationUrl": "https://energizedelaware.org/residential/get-started-home-performance-with-energy-star/",
      "websiteUrl": "https://energizedelaware.org/residential/get-started-home-performance-with-energy-star/",
      "sourceUrlsChecked": [
        "https://energizedelaware.org/residential/get-started-home-performance-with-energy-star/",
        "https://www.energizedelaware.org/residential/home-performance-with-energy-star/homeowners/",
        "https://energizedelaware.org/wp-content/uploads/2025/05/DESEU-HPwES-Available-Incentives-and-Rebates-Nov-2024.pdf",
        "https://energizedelaware.org/help-center/help-center-residential-resources-support/",
        "https://energizedelaware.org/wp-content/uploads/2026/01/HPwES-Request-for-Proposals-Final-1-16-26.pdf",
        "https://programs.dsireusa.org/system/program/detail/5449/energize-delaware-home-performance-with-energy-star"
      ],
      "evidenceText": "Energize Delaware's current HPwES page says the home energy assessment is mandatory, includes direct-install measures, and requires a Program-Participating Contractor for eligible work. The current incentives PDF lists air sealing, duct sealing, multiple insulation measures, heat pumps, mini-splits, AC, furnace, boiler, HPWH, smart thermostats, ERV/HRV and dehumidifiers, with incentive caps and reservation requirements.",
      "reasoningNotes": "The program is active and statewide for eligible Delaware residences. Geothermal, windows, doors and standalone lighting were removed because current HPwES sources do not support them as incentives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Home Performance incentives depend on audit findings, modeled savings, income, and measure package.",
        "sourceUrlsChecked": [
          "https://www.energizedelaware.org/residential/home-performance-with-energy-star/"
        ],
        "reasoningNotes": "Target model/terms are broad and no single one-time formula was safely selected.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5355",
    "opportunityName": "Commercial Energy Efficiency Rebate Program",
    "state": "HI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5355/commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://hawaiienergy.com/for-business/rebates",
    "applicationUrl": "https://hawaiienergy.com/wp-content/uploads/commercial-incentive-application.pdf",
    "administrator": "Hawaii Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 12,
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
          "occupancy sensor"
        ]
      },
      {
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "pv system"
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
          "vfd"
        ]
      },
      {
        "retrofitTypeId": "window_film_shading_retrofit",
        "displayName": "Window film / shading retrofit",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "window film"
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
        "counties": [
          "Honolulu County",
          "Hawaii County",
          "Maui County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Hawaii Energy Public Benefits Fee service territory",
          "Hawaiian Electric service territories excluding Kauai"
        ],
        "notes": "Hawaii Energy rebates are available in the counties of Honolulu, Hawaii and Maui; Kauai is served separately by KIUC and is not included."
      },
      "eligibleApplicantTypes": [
        "Business customers",
        "Commercial property owners",
        "Commercial tenants with authority to install measures",
        "Multifamily property owners",
        "Industrial customers",
        "Institutional customers"
      ],
      "eligibleSectors": [
        "Commercial",
        "Industrial",
        "Institutional",
        "Multifamily",
        "Hospitality",
        "Restaurant",
        "Retail",
        "Grocery",
        "Cold storage",
        "Office",
        "Warehouse"
      ],
      "eligibleRetrofitCategories": [
        "Commercial HVAC heat pump",
        "Variable refrigerant flow HVAC",
        "Heat pump water heater",
        "Solar water heating",
        "Refrigeration",
        "Anti-sweat heater controls",
        "VFD",
        "Lighting controls",
        "Occupancy sensors",
        "Smart building controls",
        "Building envelope cool roof",
        "Window film",
        "Commercial kitchen demand ventilation",
        "Energy storage grid services",
        "Custom energy efficiency"
      ],
      "hardRequirements": [
        "Commercial incentive application is effective for the 2025-2026 program year through June 30, 2026 or while funding lasts.",
        "Applications must generally be submitted within six months of invoice or receipt date.",
        "Preapproval is strongly recommended and is required for custom projects.",
        "Measures must satisfy Hawaii Energy equipment, efficiency and installation requirements for the applicable rebate category.",
        "Program territory excludes Kauai/KIUC customers."
      ],
      "blockers": [
        "Matched term PV system is not supported by the current Hawaii Energy commercial rebate sources checked and was removed.",
        "Matched term insulation is not a standard listed commercial rebate category; only building-envelope measures such as cool roof, window film and eligible custom envelope work were retained.",
        "Matched term window is limited to window film or approved envelope measures, not window replacement.",
        "LED refrigeration case lighting was shown as ending February 28, 2026 and was not retained as an active current category.",
        "EV charging is a separate Hawaii Energy-administered program with separate funding status and was not merged into this commercial efficiency repair."
      ],
      "programType": "Rebate Program",
      "administrator": "Hawaii Energy",
      "applicationUrl": "https://hawaiienergy.com/wp-content/uploads/commercial-incentive-application.pdf",
      "websiteUrl": "https://hawaiienergy.com/for-business/rebates",
      "sourceUrlsChecked": [
        "https://hawaiienergy.com/for-business/rebates",
        "https://hawaiienergy.com/for-business/rebates-for-business/hvac/",
        "https://hawaiienergy.com/for-business/rebates-for-business/water-heating/",
        "https://hawaiienergy.com/for-business/rebates-for-business/refrigeration-2/",
        "https://hawaiienergy.com/for-business/rebates-for-business/building-envelope/",
        "https://hawaiienergy.com/for-business/rebates-for-business/lighting/",
        "https://hawaiienergy.com/for-business/rebates-for-business/smart-devices/",
        "https://hawaiienergy.com/wp-content/uploads/commercial-incentive-application.pdf",
        "https://energy.hawaii.gov/rebates-and-incentives/",
        "https://programs.dsireusa.org/system/program/detail/5355/commercial-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Hawaii Energy business rebate pages and the commercial incentive application list HVAC including AC/heat pump and VRF, water heating including HPWH and solar water heating, refrigeration, building envelope including cool roof and window film, lighting controls, smart building controls, kitchen ventilation, VFDs, custom measures and grid-services energy storage. The application is marked effective July 1, 2025 through June 30, 2026 or while funding lasts.",
      "reasoningNotes": "The record is active as a Hawaii Energy commercial program. Unsupported renewable or generic building terms from the match set were removed unless current Hawaii Energy commercial sources supported the specific retrofit category."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Hawaii Energy commercial rebates cover many measures, but no battery-storage upfront rule was verified.",
        "sourceUrlsChecked": [
          "https://hawaiienergy.com/for-businesses/rebates/"
        ],
        "reasoningNotes": "Target is battery/demand related; no direct storage rebate formula was found.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "battery_tou_demand_savings",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
