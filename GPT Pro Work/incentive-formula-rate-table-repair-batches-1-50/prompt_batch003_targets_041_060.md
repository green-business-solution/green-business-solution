You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 3
Targets in this prompt: 41-60 of 984
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
  "batchNumber": 3,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3571"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1941",
    "opportunityName": "Marshall Municipal Utilities - Commercial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1941/marshall-municipal-utilities-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.marshallutilities.com/index.php/business/commercial-rebates-conservation",
    "applicationUrl": null,
    "administrator": "Marshall Municipal Utilities / Missouri River Energy Services",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 11,
    "targetKind": "existing_simple_rule_v2_repair",
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
          "electronically commutated motor"
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [],
        "cities": [
          "Marshall"
        ],
        "utilityTerritories": [
          "Marshall Municipal Utilities electric service territory"
        ],
        "notes": "Business incentives apply to eligible Marshall Municipal Utilities commercial and industrial electric customers, with many measures administered through Bright Energy Solutions."
      },
      "eligibleApplicantTypes": [
        "commercial_customers",
        "industrial_customers",
        "business_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "food_service",
        "grocery",
        "hospitality",
        "manufacturing"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "demand_controlled_ventilation",
        "energy_recovery_ventilation_retrofit",
        "variable_frequency_drive_retrofit",
        "high_efficiency_pump_replacement",
        "efficient_fan_blower_replacement",
        "efficient_air_compressor",
        "compressed_air_leak_repair",
        "compressed_air_controls",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_ec_motor_retrofit",
        "walk_in_cooler_freezer_upgrade",
        "commercial_kitchen_equipment",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_fryer",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Customer must be a Marshall Municipal Utilities business customer.",
        "Commercial projects must meet the applicable local or Bright Energy Solutions measure requirements.",
        "Custom, compressed-air, and some HVAC or refrigeration projects may require preapproval."
      ],
      "blockers": [
        "No current official support was verified for window replacement.",
        "Window film was not verified on the Marshall business page and should not be assumed.",
        "Water softener and water programs are separate; no broad low-flow fixture rebate was verified.",
        "Food-service dishwasher incentives are commercial-only and should not be matched to residential dishwasher categories."
      ],
      "programType": "Rebate Program",
      "administrator": "Marshall Municipal Utilities / Missouri River Energy Services",
      "applicationUrl": null,
      "websiteUrl": "https://www.marshallutilities.com/index.php/business/commercial-rebates-conservation",
      "sourceUrlsChecked": [
        "https://www.marshallutilities.com/index.php/business/commercial-rebates-conservation",
        "https://www.brightenergysolutions.com/members/brookings-municipal-utilities"
      ],
      "evidenceText": "Marshall business rebates cover lighting, HVAC, pumps and drives, custom projects, compressed air, refrigeration, and food-service equipment through local and Bright Energy Solutions offerings.",
      "reasoningNotes": "Confidence is medium because some measure details are on linked forms or Bright Energy Solutions pages, but the current utility page verifies the main business categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3ba3d07c858bdaf4_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 20000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$200 per eligible unit",
        "evidenceText": "Ground source heat pumps are eligible for a $200 per ton rebate",
        "sourceUrlsChecked": [
          "https://www.marshallutilities.com/index.php/business/commercial-rebates-conservation"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1940",
    "opportunityName": "Marshall Municipal Utilities - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1940/marshall-municipal-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.marshallutilities.com/index.php/residential/rebates-conservation",
    "applicationUrl": null,
    "administrator": "Marshall Municipal Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "MN"
        ],
        "counties": [],
        "cities": [
          "Marshall"
        ],
        "utilityTerritories": [
          "Marshall Municipal Utilities electric service territory"
        ],
        "notes": "Residential incentives are limited to Marshall Municipal Utilities residential customers and eligible service locations."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners",
        "renters"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "central_air_conditioner_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "programmable_thermostat",
        "heat_pump_water_heater",
        "electric_water_heater",
        "solar_water_heating_system",
        "level_2_ev_charger_installation",
        "residential_dishwasher",
        "residential_refrigerator_freezer_replacement",
        "room_air_conditioner",
        "dehumidifier"
      ],
      "hardRequirements": [
        "Applicant must be a Marshall Municipal Utilities residential customer.",
        "Central air conditioning, electric heating, and water-heating measures may require load-management participation.",
        "Electric water heater rebates are limited to new construction or gas-to-electric conversion and do not apply to replacement of an existing electric water heater.",
        "EV charger rebate is for qualifying Level 2 residential charging equipment."
      ],
      "blockers": [
        "Residential refrigerator and freezer incentives are not commercial refrigeration equipment.",
        "Residential dishwasher incentives are not commercial dishwasher retrofits.",
        "EV charging should be limited to Level 2 chargers, not DC fast charging.",
        "Replacement of an existing electric water heater does not qualify for the electric water-heater rebate."
      ],
      "programType": "Rebate Program",
      "administrator": "Marshall Municipal Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.marshallutilities.com/index.php/residential/rebates-conservation",
      "sourceUrlsChecked": [
        "https://www.marshallutilities.com/index.php/residential/rebates-conservation",
        "https://marshallutilities.com/index.php/residential/rebates-conservation/electric-vehicle-rebates"
      ],
      "evidenceText": "Marshall residential rebates include appliances, lighting, central air conditioning, heat pumps, geothermal, thermostats, heat pump water heaters, solar water heating, and Level 2 EV chargers.",
      "reasoningNotes": "Narrow appliance matches to residential appliance categories and retain solar water heating as a verified residential water-heating measure."
    },
    "existingSimpleRules": [
      {
        "id": "oir_5187306a971f8ae9_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 20000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$200 per eligible unit",
        "evidenceText": "To download a rebate application form click here: ENERGY STAR CENTRAL A/C & HEAT PUMP Rebate Form Ground Source heat pumps are eligible for a $200 per ton rebate",
        "sourceUrlsChecked": [
          "https://www.marshallutilities.com/index.php/residential/rebates-conservation"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4812",
    "opportunityName": "Minnesota Xcel Energy - Business Energy Efficiency Rebate Programs",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4812/minnesota-xcel-energy-business-energy-efficiency-rebate-programs",
    "websiteUrl": "https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates",
    "applicationUrl": null,
    "administrator": "Xcel Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
    "targetKind": "existing_simple_rule_v2_repair",
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
        "retrofitTypeId": "exterior_site_lighting_retrofit",
        "displayName": "Exterior/site lighting retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "street lighting"
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
        "retrofitTypeId": "walk_in_cooler_freezer_upgrade",
        "displayName": "Walk-in cooler/freezer upgrade",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "walk in freezer"
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
          "Xcel Energy electric business service territory in Minnesota",
          "Xcel Energy natural gas business service territory in Minnesota where gas measures apply"
        ],
        "notes": "Eligibility is measure- and fuel-specific. Electric measures require an eligible Xcel Energy business electric account; gas measures require eligible Xcel gas service."
      },
      "eligibleApplicantTypes": [
        "Xcel Energy business electric customers",
        "Xcel Energy business natural gas customers where gas measures apply",
        "commercial customers",
        "industrial customers",
        "institutional customers",
        "public-sector customers where eligible",
        "contractors or trade partners with customer authorization"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "public sector",
        "food service",
        "grocery and refrigeration",
        "exterior and site lighting",
        "compressed air and process systems where eligible"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "exterior_site_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "high_efficiency_refrigeration_equipment",
        "walk_in_cooler_freezer_upgrade",
        "refrigeration_controls_retrofit",
        "anti_sweat_heater_controls",
        "high_efficiency_commercial_dishwasher",
        "variable_frequency_drive_retrofit"
      ],
      "hardRequirements": [
        "Customer must be an eligible Xcel Energy business customer in Minnesota.",
        "Lighting rebates require the customer to be an Xcel Energy business electric customer and to install qualifying lighting or controls.",
        "HVAC-R, refrigeration, foodservice, and VFD measures must meet current Xcel Energy equipment and program specifications.",
        "Some projects may require pre-approval, study, custom review, or participation through Xcel's online rebate process.",
        "Gas and electric equipment incentives must be matched to the customer's applicable Xcel service type."
      ],
      "blockers": [
        "low_flow_fixture_retrofit is a false positive here; current matched fixture language is lighting/equipment fixture language, not water fixtures.",
        "high_efficiency_commercial_dishwasher should be limited to listed commercial foodservice dishwasher measures, not residential or all kitchen equipment.",
        "Street or site lighting should be matched only where the customer owns or controls eligible exterior lighting equipment and Xcel rules allow it.",
        "Refrigeration controls and anti-sweat heater matches are limited to listed commercial refrigeration measures.",
        "Do not match gas equipment to electric-only customers or electric-only measures to gas-only accounts."
      ],
      "programType": "Rebate Program",
      "administrator": "Xcel Energy",
      "applicationUrl": null,
      "websiteUrl": "https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/4812/minnesota-xcel-energy-business-energy-efficiency-rebate-programs",
        "https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates",
        "https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates/business-lighting-efficiency",
        "https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates/hvac-r",
        "https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates/commercial-refrigeration",
        "https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates/food-service"
      ],
      "evidenceText": "Current Xcel Energy business pages for Minnesota list lighting and equipment rebates, including business lighting, HVAC-R, commercial refrigeration, and foodservice equipment. Xcel's business pages state that qualifying equipment must be purchased and installed, and that some rebates require the customer to be an existing business electric and/or gas customer.",
      "reasoningNotes": "The repair keeps business lighting, refrigeration, HVAC-R, foodservice dishwasher, and VFD categories and removes the water-fixture false positive caused by generic fixture wording."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b966a76511bde339_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 6000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$60 per anti-sweat heater controlled door for low- or medium-temperature cases",
        "evidenceText": "Xcel Minnesota refrigeration application lists anti-sweat heater controls for coolers and freezers at $60 per door.",
        "sourceUrlsChecked": [
          "https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates/hvac-r",
          "https://www.xcelenergy.com/staticfiles/xe-responsive/Business%20Programs%20%26%20Rebates/Equipment%20Rebates/17-9181%20%2804-24%29%20MN-HVAC-R_app%20January%201%2C%202024%2C%20or%20later%201%20042224.pdf"
        ],
        "reasoningNotes": "Matched refrigeration, freezer and anti-sweat heater terms. Use unit_count as controlled refrigerator/freezer case doors.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1949",
    "opportunityName": "Willmar Municipal Utilities - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1949/willmar-municipal-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.brightenergysolutions.com/members/willmar-municipal-utilities?rebates=residential",
    "applicationUrl": null,
    "administrator": "Willmar Municipal Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "MN"
        ],
        "counties": [],
        "cities": [
          "Willmar"
        ],
        "utilityTerritories": [
          "Willmar Municipal Utilities"
        ],
        "notes": "Limited to Willmar Municipal Utilities residential customers participating through Bright Energy Solutions."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_utility_account"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "central_air_conditioner",
        "energy_star_room_air_conditioner",
        "hvac_tune_up",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "led_recessed_downlight_retrofit",
        "energy_star_residential_clothes_washer",
        "energy_star_residential_dishwasher",
        "energy_star_ceiling_fan",
        "energy_star_dehumidifier",
        "energy_star_room_air_cleaner",
        "ecm_domestic_hot_water_recirculating_pump"
      ],
      "hardRequirements": [
        "Applicant must be a Willmar Municipal Utilities residential electric customer.",
        "Equipment must meet the listed product-specific ENERGY STAR, AHRI, ChargePoint, or program qualification requirements.",
        "Clothes washer rebate is limited to homes with electric water heaters.",
        "EV charger rebate is limited to qualifying Level 2 chargers, with higher incentive for ChargePoint Home Flex.",
        "Customer must submit required rebate documentation, receipts, and forms."
      ],
      "blockers": [
        "Residential dishwasher rebate is not a commercial dishwasher retrofit.",
        "No broad low-flow plumbing fixture retrofit is supported by current Bright Energy Solutions residential categories.",
        "Lighting support is limited to listed residential ENERGY STAR LED recessed downlights, not broad commercial lighting retrofits.",
        "Commercial, industrial, refrigeration, motor, VFD, and foodservice measures are not supported for this residential opportunity.",
        "EV support should be limited to qualifying Level 2 residential chargers for Willmar customers."
      ],
      "programType": "Rebate Program",
      "administrator": "Willmar Municipal Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.brightenergysolutions.com/members/willmar-municipal-utilities?rebates=residential",
      "sourceUrlsChecked": [
        "https://www.brightenergysolutions.com/members/willmar-municipal-utilities?rebates=residential",
        "https://www.brightenergysolutions.com/electric-vehicles"
      ],
      "evidenceText": "Willmar’s Bright Energy Solutions page lists residential rebates for HVAC, geothermal, HPWH, smart thermostats, Level 2 EV chargers, LED recessed downlights and ENERGY STAR residential appliances.",
      "reasoningNotes": "This is the same Bright Energy Solutions residential measure set as other participating utilities, narrowed to Willmar Municipal Utilities territory."
    },
    "existingSimpleRules": [
      {
        "id": "oir_a521025b75c260ef_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 90000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$900 per eligible unit",
        "evidenceText": "$900 Residential Lighting Download Form Earn up to $4 per fixture for ENERGY STAR LED recessed downlights",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/members/willmar-municipal-utilities?rebates=residential"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2354",
    "opportunityName": "Spire - Commercial and Industrial Energy Efficiency Rebate Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2354/spire-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.spireenergy.com/commercial-rebates",
    "applicationUrl": null,
    "administrator": "Spire",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "MO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Spire Missouri natural gas service territory",
          "Spire East Missouri",
          "Spire West Missouri"
        ],
        "notes": "Limited to eligible commercial and industrial natural gas customers in Spire Missouri service territory."
      },
      "eligibleApplicantTypes": [
        "commercial_natural_gas_customer",
        "industrial_natural_gas_customer",
        "nonprofit_customer",
        "government_customer",
        "public_school_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government",
        "nonprofit",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "boiler_controls_burner_retrofit",
        "boiler_tune_up",
        "steam_trap_replacement",
        "high_efficiency_gas_water_heater",
        "commercial_gas_unit_heater",
        "commercial_radiant_infrared_heater",
        "commercial_kitchen_demand_control_ventilation",
        "high_efficiency_fryer",
        "high_efficiency_steamer",
        "high_efficiency_oven",
        "commercial_griddle",
        "low_flow_pre_rinse_spray_nozzle",
        "energy_audit",
        "custom_natural_gas_efficiency_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a current Spire Missouri commercial or industrial natural gas customer.",
        "Equipment must be qualifying new natural gas equipment or a qualifying gas-saving custom measure.",
        "Audit incentives must be tied to qualifying efficiency measures and program requirements.",
        "Custom projects must document eligible natural gas savings and meet program cost-effectiveness requirements.",
        "Required rebate forms, invoices, and equipment documentation must be submitted while funds are available."
      ],
      "blockers": [
        "Electric-only measures are not supported by this Spire natural gas program.",
        "Low-flow support is limited to qualifying commercial pre-rinse spray nozzles, not broad plumbing fixture retrofits.",
        "Standalone energy audits should not be matched unless tied to an eligible Spire measure.",
        "Residential equipment and home weatherization are not supported.",
        "Foodservice categories should remain limited to listed gas-fired commercial kitchen equipment."
      ],
      "programType": "Rebate Program",
      "administrator": "Spire",
      "applicationUrl": null,
      "websiteUrl": "https://www.spireenergy.com/commercial-rebates",
      "sourceUrlsChecked": [
        "https://www.spireenergy.com/commercial-rebates",
        "https://www.spireenergy.com/sites/default/files/2025-02/RulesRegs_Missouri_02112025.pdf",
        "https://www.spireenergy.com/sites/default/files/2024-10/24-02833-CommericalandIndustrialrebateform-FoodServiceEquipment-FINAL-0926.pdf"
      ],
      "evidenceText": "Spire’s commercial rebate materials support Missouri C&I natural gas rebates for boilers, furnaces, boiler controls, steam traps, gas water heating, foodservice equipment, pre-rinse spray nozzles, audits and custom gas-saving projects.",
      "reasoningNotes": "The match is generally correct for gas C&I measures, but low-flow and audit matches require narrowing and residential/electric measures must be blocked."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1367e1afb110abae_v1",
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
        "evidenceText": "DSIRE/current program summary lists commercial fryer rebates up to $350 per unit.",
        "sourceUrlsChecked": [
          "https://www.spireenergy.com/commercial-rebates",
          "https://programs.dsireusa.org/system/program/detail/2354"
        ],
        "reasoningNotes": "Matched fryer/food-service term. Confidence is medium because final amount depends on qualifying equipment.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_5cedbd125e92aa74_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 10000,
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
        "formula": "50% of steam trap equipment cost, capped at $100 per steam trap",
        "evidenceText": "Spire commercial rebates list space-heating steam trap replacement at 50% of equipment cost up to $100 per trap.",
        "sourceUrlsChecked": [
          "https://www.spireenergy.com/commercial-rebates",
          "https://www.spireenergy.com/sites/default/files/2025-09/25-CandIRebates-SteamTrap-FINAL-REV-1003.pdf"
        ],
        "reasoningNotes": "Matched steam trap term. Modeled as per-trap maximum with 50% equipment cost cap.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3139",
    "opportunityName": "Otter Tail Power Company - Energy Efficiency Rebate Program",
    "state": "ND",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3139/otter-tail-power-company-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.otpco.com/rebates-and-efficiency-programs/programs/",
    "applicationUrl": null,
    "administrator": "Otter Tail Power Company",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 11,
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
          "lighting controls"
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
          "Otter Tail Power Company"
        ],
        "notes": "DSIRE target is North Dakota; Otter Tail Power programs also operate in other company service states with state-specific forms."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "commercial_customer",
        "industrial_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "air_to_water_heat_pump",
        "high_efficiency_hvac_replacement",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "window_replacement",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "level_2_ev_charger_installation",
        "appliance_recycling",
        "smart_thermostat_zoning_retrofit",
        "water_heating_equipment",
        "electric_heating_equipment",
        "electrical_panel_upgrade_load_control"
      ],
      "hardRequirements": [
        "Customer must be in Otter Tail Power's electric service territory.",
        "Windows and insulation measures require electric heat where stated by the program."
      ],
      "blockers": [
        "CoolSavings and other load-control offerings are demand-response or rate programs, not general retrofit categories.",
        "EV vehicle rebates and panel rebates are separate from building efficiency measures unless explicitly listed.",
        "Commercial refrigeration was not verified as a standard current measure on pages checked."
      ],
      "programType": "Rebate Program",
      "administrator": "Otter Tail Power Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.otpco.com/rebates-and-efficiency-programs/programs/",
      "sourceUrlsChecked": [
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/",
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/rebates-residential/",
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/heat-pump/"
      ],
      "evidenceText": "Otter]( Tail pages list residential rebates for heat pumps, windows, insulation, lighting, smart thermostats, appliance recycling, water heating, EV charging, and selected business efficiency programs.",
      "reasoningNotes": "Retained only measure categories verified on current Otter Tail pages or forms, with demand-response and rate offerings treated as boundaries."
    },
    "existingSimpleRules": [
      {
        "id": "oir_df7b8182541569a0_v1",
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
        "formula": "$500 per qualifying Level 2 EV charging station on an off-peak rate",
        "evidenceText": "Otter Tail Power says customers may qualify for a $500 rebate when installing a Level 2 EV charging station on a qualified off-peak rate.",
        "sourceUrlsChecked": [
          "https://www.otpco.com/rebates-and-efficiency-programs/programs/electric-vehicle-rate/",
          "https://www.otpco.com/rebates-and-efficiency-programs/programs/electric-vehicle-rebates/"
        ],
        "reasoningNotes": "Matched EV charger and Level 2 terms. Use one unit as one eligible charging station.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5100",
    "opportunityName": "Residential Energy Efficiency Rebates (Offered by 5 Utilities)",
    "state": "ND",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5100/residential-energy-efficiency-rebates-offered-by-5-utilities",
    "websiteUrl": "https://www.brightenergysolutions.com/find-a-rebate/",
    "applicationUrl": null,
    "administrator": "Bright Energy Solutions/Missouri River Energy Services",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "ND"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Cavalier Municipal Utilities",
          "Hillsboro Municipal Utilities",
          "Lakota Municipal Utilities",
          "Northwood Municipal Utilities",
          "Valley City Public Works"
        ],
        "notes": "Limited to North Dakota municipal utilities participating in Bright Energy Solutions; customers must purchase electricity from the participating utility."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_utility_account"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ground_source_geothermal_heat_pump",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "central_air_conditioner",
        "energy_star_room_air_conditioner",
        "hvac_tune_up",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "led_recessed_downlight_retrofit",
        "energy_star_residential_clothes_washer",
        "energy_star_residential_dishwasher",
        "energy_star_ceiling_fan",
        "energy_star_dehumidifier",
        "energy_star_room_air_cleaner",
        "ecm_domestic_hot_water_recirculating_pump"
      ],
      "hardRequirements": [
        "Applicant must be a residential customer of a participating Bright Energy Solutions municipal electric utility.",
        "Equipment must meet the listed product-specific ENERGY STAR, AHRI, ChargePoint, or program qualification requirements.",
        "Clothes washer rebate is limited to homes with electric water heaters.",
        "EV charger rebate is limited to qualifying Level 2 chargers, with higher incentive for ChargePoint Home Flex.",
        "Customer must submit required rebate documentation, receipts, and forms."
      ],
      "blockers": [
        "Residential dishwasher rebate is not a commercial dishwasher retrofit.",
        "No broad low-flow plumbing fixture retrofit is supported by current Bright Energy Solutions residential rebate categories.",
        "Lighting support is limited to listed residential ENERGY STAR LED recessed downlights, not broad commercial lighting retrofits.",
        "Commercial, industrial, refrigeration, motor, VFD, and foodservice measures are not supported for this residential opportunity.",
        "EV support should be limited to qualifying Level 2 residential chargers for participating utility customers."
      ],
      "programType": "Rebate Program",
      "administrator": "Bright Energy Solutions/Missouri River Energy Services",
      "applicationUrl": null,
      "websiteUrl": "https://www.brightenergysolutions.com/find-a-rebate/",
      "sourceUrlsChecked": [
        "https://www.brightenergysolutions.com/members",
        "https://www.brightenergysolutions.com/members/hillsboro-municipal-utilities?rebates=residential",
        "https://www.brightenergysolutions.com/electric-vehicles"
      ],
      "evidenceText": "Bright Energy Solutions lists North Dakota participating municipal utilities and current residential rebates for HVAC, geothermal, HPWH, smart thermostats, Level 2 EV chargers, LED recessed downlights and ENERGY STAR residential appliances.",
      "reasoningNotes": "The original match mostly used residential product terms correctly but overgeneralized dishwasher, lighting, and fixture terms. Categories were narrowed to product-specific residential measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_d23bd6e69dfa58b9_v1",
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
        "evidenceText": "Bright Energy Solutions says customers can receive a $500 rebate for a Wi-Fi ChargePoint Home Flex charger.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles/electric-vehicle-charging-program",
          "http://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "Target is a Bright Energy Solutions residential program with Level 2 terms. Confidence is medium because utility participation can vary.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3919",
    "opportunityName": "Firelands Electric Cooperative - Residential Energy Efficiency Rebate Program",
    "state": "OH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3919/firelands-electric-cooperative-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://firelandsec.com/member-programs",
    "applicationUrl": null,
    "administrator": "Firelands Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "OH"
        ],
        "counties": [
          "Ashland",
          "Huron",
          "Lorain",
          "Richland"
        ],
        "cities": [],
        "utilityTerritories": [
          "Firelands Electric Cooperative service territory"
        ],
        "notes": "Firelands Electric Cooperative serves eligible rural north-central Ohio members; rebates require installation at a co-op service location."
      },
      "eligibleApplicantTypes": [
        "residential_cooperative_members",
        "residential_electric_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_refrigerator_freezer_replacement",
        "residential_dishwasher",
        "residential_clothes_washer",
        "residential_clothes_dryer",
        "dehumidifier",
        "level_2_ev_charger_installation",
        "electric_water_heater",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "smart_thermostat_zoning_retrofit",
        "insulation_upgrade",
        "air_sealing_weatherization"
      ],
      "hardRequirements": [
        "Applicant must be a Firelands Electric Cooperative member for the relevant service location.",
        "Many rebates require new qualified equipment, receipts, and application before the program deadline.",
        "Weatherization applies to electrically heated homes and must be completed by a licensed contractor.",
        "Some water-heating and HVAC measures require cooperative load-management participation."
      ],
      "blockers": [
        "Commercial and industrial lighting is a separate program and should not be attached to this residential record.",
        "Residential dishwasher rebates are not commercial dishwasher retrofits.",
        "Refrigerator and freezer rebates are residential appliance rebates, not commercial refrigeration equipment.",
        "Weatherization is limited to air sealing and insulation and does not include windows, doors, or lighting fixtures.",
        "Solar, tankless, and on-demand water heaters are excluded from the water-heater rebate."
      ],
      "programType": "Rebate Program",
      "administrator": "Firelands Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://firelandsec.com/member-programs",
      "sourceUrlsChecked": [
        "https://firelandsec.com/member-programs",
        "https://firelandsec.com/appliance-rebates",
        "https://firelandsec.com/electric-vehicle-charger-rebates",
        "https://firelandsec.com/electric-water-heater-rebates",
        "https://firelandsec.com/geothermal-and-heat-pump-rebates",
        "https://firelandsec.com/smart-thermostat-rebate",
        "https://firelandsec.com/weatherization-rebates"
      ],
      "evidenceText": "Firelands lists member rebates for residential appliances, Level 2 EV chargers, electric and heat pump water heaters, heat pumps, smart thermostats, and weatherization.",
      "reasoningNotes": "Separate residential appliances from commercial equipment; keep EV only as Level 2 charging and weatherization only as insulation and air sealing."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1269f6953b5ee296_v1",
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
        "formula": "$250 per Level 2 EV charger",
        "evidenceText": "Firelands Electric says it offers a $250 rebate for members installing a Level 2 EV charger.",
        "sourceUrlsChecked": [
          "https://firelandsec.com/electric-vehicle-charger-rebates",
          "https://firelandsec.com/member-programs"
        ],
        "reasoningNotes": "Matched Level 2 EV charging. Applies to qualifying existing cooperative members.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3823",
    "opportunityName": "AEP Public Service Company of Oklahoma - Residential Efficiency Rebate Program",
    "state": "OK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3823/aep-public-service-company-of-oklahoma-residential-efficiency-rebate-program",
    "websiteUrl": "https://powerforwardwithpso.com/rebates/",
    "applicationUrl": "https://pso-esp.com/",
    "administrator": "Public Service Company of Oklahoma",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "OK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Public Service Company of Oklahoma electric service territory"
        ],
        "notes": "Limited to PSO residential electric customers and current Power Forward with PSO rebate rules."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "hvac_tune_up",
        "smart_thermostat_zoning_retrofit",
        "level_2_ev_charger_installation",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "residential_clothes_washer",
        "residential_clothes_dryer"
      ],
      "hardRequirements": [
        "Applicant must have an active PSO residential electric account.",
        "Equipment must be purchased and installed in the current program year and submitted within the required documentation window.",
        "EV charger must be an eligible ENERGY STAR Level 2 smart charger.",
        "Some duct, air sealing, and exterior wall insulation measures require participation in the Multiple Upgrade program."
      ],
      "blockers": [
        "Commercial appliances and commercial kitchen categories are not eligible under this residential program.",
        "Duct sealing, air sealing, and some insulation measures should not be matched unless the project satisfies Multiple Upgrade or program-specific requirements.",
        "Do not match non-PSO or nonresidential customers."
      ],
      "programType": "Rebate Program",
      "administrator": "Public Service Company of Oklahoma",
      "applicationUrl": "https://pso-esp.com/",
      "websiteUrl": "https://powerforwardwithpso.com/rebates/",
      "sourceUrlsChecked": [
        "https://powerforwardwithpso.com/rebates/",
        "https://pso-esp.com/"
      ],
      "evidenceText": "PSO lists home rebates for heat pumps, ductless mini-splits, central AC, HPWH, smart thermostats, EV chargers, insulation, duct measures, and selected appliances.",
      "reasoningNotes": "The repaired categories preserve current residential electric measures and add program-boundary requirements for multiple-upgrade envelope work."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3203686495043892_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 700000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$7,000 per eligible unit",
        "evidenceText": "$7,000 per unit VIEW BUSINESS REBATE Business Heating, Cooling & Ventilation Share Email Facebook Print Print Twitter Bookmark Networked HVAC Controls $250 per thermostat and/or zone sensor VIEW BUSINESS REBATE Business Heating, Cooling & Ventilation Share Email Facebook Print Print Twitter Bookmark Packaged Terminal Units AC/HP Instant Rebate &#8211",
        "sourceUrlsChecked": [
          "https://powerforwardwithpso.com/rebates/"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5141",
    "opportunityName": "Residential Energy Efficiency Rebates (Offered by 12 Utilities)",
    "state": "SD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5141/residential-energy-efficiency-rebates-offered-by-12-utilities",
    "websiteUrl": "https://www.brightenergysolutions.com/find-a-rebate/",
    "applicationUrl": null,
    "administrator": "Bright Energy Solutions / Missouri River Energy Services",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 11,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "SD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Beresford Municipal Power",
          "Big Stone City Municipal Utilities",
          "Brookings Municipal Utilities",
          "Burke Municipal Utilities",
          "City of Pickstown",
          "Faith Municipal Utilities",
          "Flandreau Municipal Utilities",
          "Fort Pierre Municipal Utilities",
          "Pierre Municipal Utilities",
          "Vermillion Light & Power",
          "Watertown Municipal Utilities",
          "Winner Municipal Utilities"
        ],
        "notes": "Bright Energy Solutions residential rebates are limited to customers of participating Missouri River Energy Services municipal utilities in South Dakota."
      },
      "eligibleApplicantTypes": [
        "residential_municipal_utility_customers",
        "homeowners",
        "renters"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "central_air_conditioner_replacement",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "level_2_ev_charger_installation",
        "residential_clothes_washer",
        "residential_dishwasher",
        "residential_refrigerator_freezer_replacement"
      ],
      "hardRequirements": [
        "Customer must buy electricity from a participating Bright Energy Solutions municipal utility.",
        "Local utility participation, available funding, and measure forms can vary.",
        "EV charger incentives are limited to qualifying Level 2 charging equipment."
      ],
      "blockers": [
        "Only customers of the listed participating South Dakota municipal utilities are eligible.",
        "Dishwasher and clothes washer matches are residential appliance rebates, not commercial kitchen or broad water-efficiency categories.",
        "Fixture matches should be treated as lighting unless a current low-flow plumbing rebate is verified.",
        "EV charging is Level 2 only; no DC fast charger rebate was verified for this residential record."
      ],
      "programType": "Rebate Program",
      "administrator": "Bright Energy Solutions / Missouri River Energy Services",
      "applicationUrl": null,
      "websiteUrl": "https://www.brightenergysolutions.com/find-a-rebate/",
      "sourceUrlsChecked": [
        "https://www.brightenergysolutions.com/members",
        "https://www.brightenergysolutions.com/",
        "https://www.brightenergysolutions.com/electric-vehicles",
        "https://www.brightenergysolutions.com/resources/home"
      ],
      "evidenceText": "Bright Energy Solutions identifies participating South Dakota municipal utilities and current residential resources, including EV charging and home energy rebate materials for municipal utility customers.",
      "reasoningNotes": "Confidence is medium because current public pages verify membership and EV charging clearly, while some residential measure details are distributed through local forms and resources."
    },
    "existingSimpleRules": [
      {
        "id": "oir_f2a4f48503fcdda2_v1",
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
        "evidenceText": "Bright Energy Solutions says customers can receive a $500 rebate for a Wi-Fi ChargePoint Home Flex charger.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles/electric-vehicle-charging-program",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "Target is a Bright Energy Solutions residential program with Level 2 terms. Confidence is medium because utility participation can vary.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2689",
    "opportunityName": "Dominion Energy - Commercial Energy Efficiency Rebate Program",
    "state": "UT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2689/dominion-energy-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise/business-rebates",
    "applicationUrl": null,
    "administrator": "Enbridge Gas Utah / ThermWise",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
        "retrofitTypeId": "demand_controlled_ventilation",
        "displayName": "Demand-controlled ventilation",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "dcv"
        ]
      },
      {
        "retrofitTypeId": "efficient_ventilation_system",
        "displayName": "Efficient ventilation system",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ventilation system"
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
          "energy recovery ventilation",
          "erv"
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
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "clothes washer",
          "laundry"
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
          "UT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Enbridge Gas Utah service territory",
          "Dominion Energy Utah natural gas service territory"
        ],
        "notes": "ThermWise Business Rebates apply to eligible Utah business customers on qualifying Enbridge Gas general-service natural gas schedules."
      },
      "eligibleApplicantTypes": [
        "commercial_customers",
        "industrial_customers",
        "business_natural_gas_customers",
        "institutional_customers",
        "multifamily_property_owners"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "multifamily",
        "food_service",
        "commercial_laundry"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "boiler_controls_and_tuneup",
        "high_efficiency_gas_water_heater",
        "smart_thermostat_zoning_retrofit",
        "demand_controlled_ventilation",
        "energy_recovery_ventilation_retrofit",
        "advanced_rooftop_unit_controls",
        "commercial_building_shell_insulation",
        "pipe_insulation",
        "high_efficiency_laundry_equipment",
        "pre_rinse_spray_valve",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "commercial_steam_cooker",
        "commercial_griddle",
        "commercial_charbroiler",
        "commercial_conveyor_oven",
        "solar_pool_water_heating"
      ],
      "hardRequirements": [
        "Customer must have an active eligible Enbridge Gas meter and rate schedule.",
        "Equipment must meet the ThermWise Business measure specifications.",
        "Applications and required invoices must be submitted through the applicable ThermWise business process."
      ],
      "blockers": [
        "This is a natural gas program; electric heat pumps and electrification measures are not supported unless specifically listed.",
        "Air sealing and broad weatherization were not verified beyond insulation and pipe insulation.",
        "Pre-rinse spray valves are product-specific and should not be generalized to all low-flow fixtures.",
        "Solar support is limited to verified solar-assisted pool water heating, not broad solar thermal domestic water heating."
      ],
      "programType": "Rebate Program",
      "administrator": "Enbridge Gas Utah / ThermWise",
      "applicationUrl": null,
      "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise/business-rebates",
      "sourceUrlsChecked": [
        "https://www.enbridgegas.com/utwyid/save-money/thermwise/business-rebates"
      ],
      "evidenceText": "ThermWise Business Rebates list Utah business applications for water heating, boilers, furnaces, demand control ventilation, smart thermostats, food service, laundry, and insulation.",
      "reasoningNotes": "Keep gas business measures and product-specific commercial food-service and laundry incentives; block residential and electric-only retrofit inference."
    },
    "existingSimpleRules": [
      {
        "id": "oir_79b6bb6ca419565a_v1",
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
        "formula": "$100 per commercial smart thermostat",
        "evidenceText": "ThermWise commercial materials list a commercial smart thermostat rebate at $100.",
        "sourceUrlsChecked": [
          "https://www.thermwise.com/business-rebates/",
          "https://www.enbridgegas.com/utwyid/save-money/thermwise/business-rebates"
        ],
        "reasoningNotes": "Matched commercial thermostat term. Confidence is medium because regional application routing may vary.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3206",
    "opportunityName": "Puget Sound Energy - Multi-Family Efficiency Retrofit Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3206/puget-sound-energy-multi-family-efficiency-retrofit-program",
    "websiteUrl": "https://www.pse.com/en/rebates/multifamily-retrofit",
    "applicationUrl": null,
    "administrator": "Puget Sound Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "WA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Puget Sound Energy electric service territory",
          "Puget Sound Energy natural gas service territory where gas measures apply"
        ],
        "notes": "Program is for eligible multifamily buildings, property owners, managers, and some condo or townhome owners in PSE service territory. Incentive levels vary by property type, income/affordable status, and measure."
      },
      "eligibleApplicantTypes": [
        "multifamily property owners",
        "multifamily property managers",
        "condominium owners where eligible",
        "townhome owners where eligible",
        "affordable housing providers",
        "mixed-income multifamily properties",
        "trade allies or contractors where required"
      ],
      "eligibleSectors": [
        "multifamily residential",
        "affordable multifamily housing",
        "mixed-income multifamily housing",
        "condominium and townhome properties where eligible",
        "multifamily common areas",
        "transportation electrification where separately eligible"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "window_replacement",
        "low_flow_fixture_retrofit",
        "high_efficiency_laundry_equipment",
        "ev_charger_installation",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Property must be in PSE service territory and meet multifamily program eligibility rules.",
        "Measures must appear in the current multifamily rebate menu or be accepted by PSE as an eligible custom/common-area project.",
        "Rebate amounts and requirements vary by standard, efficiency-boost, income-qualified, affordable, mixed, tribal, and property-specific pathways.",
        "Smart thermostats must meet current equipment and heating-system requirements.",
        "Lighting, HVAC, water heating, envelope, water-saving, and laundry measures must meet current rebate-menu specifications.",
        "Multifamily EV charging is a separate PSE multifamily clean-energy or EV charging pathway and requires separate eligibility and approval."
      ],
      "blockers": [
        "Do not use the stale DSIRE URL if it redirects or fails; the current official PSE page is the multifamily retrofit page under pse.com/en/rebates.",
        "high_efficiency_hvac_replacement should be limited to listed HVAC and heat pump measures; do not match arbitrary HVAC replacement.",
        "Fixture matches must distinguish lighting fixtures from low-flow water fixtures.",
        "Window replacement is limited to current PSE qualifying window specifications and eligible existing windows.",
        "EV charging is a separate multifamily charging offer and should not be treated as an ordinary efficiency retrofit or DC fast charging program."
      ],
      "programType": "Rebate Program",
      "administrator": "Puget Sound Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.pse.com/en/rebates/multifamily-retrofit",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/3206/puget-sound-energy-multi-family-efficiency-retrofit-program",
        "https://www.pse.com/en/rebates/multifamily-retrofit",
        "https://www.pse.com/-/media/PDFs/REBATES/Multi-Family-Retrofit/7949_Multifamily_Retrofit_Rebate_Menu.pdf",
        "https://www.pse.com/en/business-incentives/multifamily-programs"
      ],
      "evidenceText": "Current PSE multifamily retrofit materials offer rebates and grants for in-unit and common-area upgrades. The 2026 multifamily rebate menu includes smart thermostats, common-area lighting, and other listed efficiency measures, and PSE's multifamily programs page separately describes Level 2 EV charging support for multifamily tenants.",
      "reasoningNotes": "The repair keeps multifamily retrofit categories supported by current PSE sources and explicitly separates the EV charging pathway from the core efficiency rebate menu."
    },
    "existingSimpleRules": [
      {
        "id": "oir_51a00bd089d5c8ee_v1",
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
        "formula": "Up to $1,000 per multifamily heat pump water heater",
        "evidenceText": "PSE 2026 multifamily rebate menu lists heat pump water heater incentives up to $1,000 per unit.",
        "sourceUrlsChecked": [
          "https://www.pse.com/en/rebates/multifamily-retrofit-rebates",
          "https://www.pse.com/-/media/PDFs/Rebates/Business-Incentives/Multifamily-Rebate-Menu.pdf"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Returned separately from space-heating heat pumps.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_ecec55f32c220dd6_v1",
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
        "formula": "Up to $1,500 per multifamily heat pump fuel-switching project unit",
        "evidenceText": "PSE 2026 multifamily rebate menu lists heat pump fuel-switching incentives up to $1,500.",
        "sourceUrlsChecked": [
          "https://www.pse.com/en/rebates/multifamily-retrofit-rebates",
          "https://www.pse.com/-/media/PDFs/Rebates/Business-Incentives/Multifamily-Rebate-Menu.pdf"
        ],
        "reasoningNotes": "Matched heat pump terms. Confidence is medium because final incentive depends on multifamily project eligibility and measure pathway.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1692",
    "opportunityName": "Puget Sound Energy - Residential Energy Efficiency Rebate Programs",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1692/puget-sound-energy-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.pse.com/en/rebates",
    "applicationUrl": null,
    "administrator": "Puget Sound Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "WA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Puget Sound Energy electric service territory",
          "Puget Sound Energy natural gas service territory where gas measures apply"
        ],
        "notes": "Residential eligibility depends on PSE service type, heating fuel, measure, property type, and whether the customer qualifies for Efficiency Boost or other enhanced pathways."
      },
      "eligibleApplicantTypes": [
        "PSE residential electric customers",
        "PSE residential natural gas customers where gas measures apply",
        "homeowners",
        "renters with owner approval where required",
        "manufactured-home customers where eligible",
        "income-qualified residential customers",
        "residential EV charger customers"
      ],
      "eligibleSectors": [
        "residential",
        "income-qualified residential",
        "manufactured homes where eligible",
        "transportation electrification"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "window_replacement",
        "high_efficiency_refrigeration_equipment",
        "high_efficiency_laundry_equipment",
        "ev_charger_installation",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be an eligible PSE residential customer for the fuel and measure claimed.",
        "Heating, heat pump, water-heating, insulation, window, appliance, and EV charger measures must meet current PSE equipment and installation requirements.",
        "Some weatherization and HVAC measures require contractor participation, pre-existing condition requirements, or verification.",
        "Window rebates are limited to qualifying replacement of eligible existing windows or patio doors with listed U-factor requirements.",
        "EV charging is a separate PSE electric vehicle offer and should follow the current charger and rate/enrollment requirements.",
        "Efficiency Boost or income-qualified amounts require separate eligibility verification."
      ],
      "blockers": [
        "high_efficiency_commercial_dishwasher is not appropriate for this residential program; do not match commercial kitchen equipment.",
        "Ground-source geothermal heat pump was not verified from the current PSE residential sources reviewed and should not be auto-matched unless a current measure page confirms it.",
        "Refrigerator and freezer matches should be limited to residential ENERGY STAR appliance or recycling-type offers where current PSE sources support them.",
        "EV charging should be limited to residential Level 2 charger offers and not public, commercial, or DC fast charging.",
        "Do not generalize heating rebates into all HVAC replacements; use current PSE heating measure lists."
      ],
      "programType": "Rebate Program",
      "administrator": "Puget Sound Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.pse.com/en/rebates",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/1692/puget-sound-energy-residential-energy-efficiency-rebate-programs",
        "https://www.pse.com/en/rebates",
        "https://www.pse.com/en/rebates/heating",
        "https://www.pse.com/en/rebates/windows-rebates",
        "https://www.pse.com/en/rebates/electric-vehicles"
      ],
      "evidenceText": "Current PSE residential rebate pages list heating rebates for electric and gas customers, qualifying window and patio-door rebates, and residential rebate pathways. Current PSE materials also describe electric vehicle charging offers separately from the home efficiency rebate catalog.",
      "reasoningNotes": "The repair preserves residential HVAC, heat pump, water-heating, envelope, appliance, and Level 2 EV charging categories only where current PSE sources support them and blocks commercial or unverified geothermal interpretations."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1ba4820bda1d4d21_v1",
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
        "formula": "Up to $1,500 for converting to an eligible air-source heat pump",
        "evidenceText": "PSE rebate page lists up to $1,500 for converting to an air-source heat pump.",
        "sourceUrlsChecked": [
          "https://www.pse.com/en/rebates",
          "https://www.pse.com/en/rebates/heating"
        ],
        "reasoningNotes": "Matched heat pump term. Returned separately because source has distinct HVAC and water-heating values.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_941c20be6116e122_v1",
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
        "evidenceText": "PSE rebate page lists heat pump water heater rebates up to $1,000.",
        "sourceUrlsChecked": [
          "https://www.pse.com/en/rebates",
          "https://www.pse.com/en/rebates/water-heating"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Source uses up to, so rebate depends on equipment and eligibility.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3176",
    "opportunityName": "Tacoma Power - Residential Energy Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3176/tacoma-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.mytpu.org/ways-to-save/residential-incentives/",
    "applicationUrl": null,
    "administrator": "Tacoma Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "duct sealing",
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
        "retrofitTypeId": "heat_pump_hvac_retrofit",
        "displayName": "Heat pump HVAC retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
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
        "retrofitTypeId": "smart_irrigation_controller",
        "displayName": "Smart irrigation controller",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "smart irrigation"
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
          "WA"
        ],
        "counties": [],
        "cities": [
          "Tacoma"
        ],
        "utilityTerritories": [
          "Tacoma Power",
          "Tacoma Water"
        ],
        "notes": "Residential electric measures require Tacoma Power service; smart irrigation and water-saving measures are tied to Tacoma Water eligibility."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "property_owner",
        "renter_with_owner_permission",
        "income_qualified_household"
      ],
      "eligibleSectors": [
        "residential",
        "small_multifamily"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "variable_speed_heat_pump",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "window_replacement",
        "led_lighting_retrofit",
        "level_2_ev_charger_installation",
        "smart_ev_splitter",
        "smart_irrigation_controller",
        "smart_thermostat_zoning_retrofit",
        "line_voltage_programmable_thermostat",
        "water_saving_showerheads"
      ],
      "hardRequirements": [
        "Customer must be served by Tacoma Power for electric efficiency and EV incentives.",
        "Participating contractor is required for many heat pump, insulation, duct, and window measures.",
        "Insulation, windows, and duct measures generally require qualifying electric heat and measure-specific eligibility.",
        "Window incentives are limited to replacing qualifying single-pane or double-pane metal-framed windows.",
        "Smart irrigation and water-saving measures require applicable Tacoma Water eligibility and product requirements.",
        "EV incentives are limited to qualifying Level 2 charging, smart splitter, or related approved electrical work."
      ],
      "blockers": [
        "Smart irrigation is a Tacoma Water water-conservation boundary, not a general electric efficiency category.",
        "EV charging is a separate residential incentive path and should be limited to listed qualifying residential charging equipment and related electrical work.",
        "No commercial, industrial, refrigeration, motor, or foodservice measures are supported by this residential opportunity.",
        "Window support is true replacement of eligible inefficient windows, not window air conditioners or generic window products."
      ],
      "programType": "Rebate Program",
      "administrator": "Tacoma Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.mytpu.org/ways-to-save/residential-incentives/",
      "sourceUrlsChecked": [
        "https://www.mytpu.org/ways-to-save/residential-incentives/",
        "https://www.mytpu.org/ways-to-save/residential-incentives/heat-pump/",
        "https://www.mytpu.org/ways-to-save/residential-incentives/duct-sealing/",
        "https://www.mytpu.org/ways-to-save/residential-incentives/insulation/",
        "https://www.mytpu.org/ways-to-save/residential-incentives/windows/",
        "https://www.mytpu.org/ways-to-save/residential-incentives/thermostats/",
        "https://www.mytpu.org/ways-to-save/residential-incentives/lighting/",
        "https://www.mytpu.org/ways-to-save/residential-incentives/smart-irrigation/",
        "https://www.mytpu.org/ways-to-save/residential-incentives/ev-charging/",
        "https://www.mytpu.org/ways-to-save/residential-incentives/hybrid-water-heater/"
      ],
      "evidenceText": "Tacoma’s residential incentives page lists heat pumps, hybrid water heaters, insulation, windows, duct sealing and insulation, thermostats, lighting, smart irrigation, EV charging and water-saving kits.",
      "reasoningNotes": "The original categories are mostly valid, but EV charging and smart irrigation are distinct incentive paths, and water measures should not be generalized."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e39d972658544a29_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 40000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 60000
        },
        "confidence": "high",
        "formula": "$400 bill credit per eligible Level 2 charger, outlet, smart splitter, or installation item; $600 maximum",
        "evidenceText": "Tacoma Power EV charging page lists $400 credits and a $600 maximum bill credit for more than one item.",
        "sourceUrlsChecked": [
          "https://www.mytpu.org/ways-to-save/residential-incentives/ev-charging/"
        ],
        "reasoningNotes": "Matched Level 2 EV charging. Use one unit as one qualifying charger or electrical-work item.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4785",
    "opportunityName": "Questar Gas - Commercial Energy Efficiency Rebate Program",
    "state": "WY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4785/questar-gas-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise/business-rebates",
    "applicationUrl": null,
    "administrator": "Enbridge Gas Wyoming / ThermWise",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
        "retrofitTypeId": "efficient_ventilation_system",
        "displayName": "Efficient ventilation system",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ventilation system"
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
        "retrofitTypeId": "high_efficiency_laundry_equipment",
        "displayName": "High-efficiency laundry equipment",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "clothes washer",
          "laundry"
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
          "WY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Enbridge Gas Wyoming service territory",
          "Questar Gas natural gas service territory"
        ],
        "notes": "ThermWise Business Rebates apply to qualifying Wyoming business natural gas customers on eligible Enbridge Gas schedules."
      },
      "eligibleApplicantTypes": [
        "commercial_customers",
        "industrial_customers",
        "business_natural_gas_customers",
        "institutional_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "food_service",
        "commercial_laundry"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "boiler_controls_and_tuneup",
        "high_efficiency_gas_water_heater",
        "smart_thermostat_zoning_retrofit",
        "demand_controlled_ventilation",
        "energy_recovery_ventilation_retrofit",
        "commercial_building_shell_insulation",
        "pipe_insulation",
        "high_efficiency_laundry_equipment",
        "pre_rinse_spray_valve",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "commercial_steam_cooker",
        "commercial_griddle",
        "commercial_charbroiler",
        "commercial_conveyor_oven",
        "solar_pool_water_heating"
      ],
      "hardRequirements": [
        "Customer must have an active eligible Enbridge Gas Wyoming business meter and rate schedule.",
        "Equipment must meet the ThermWise business measure specifications.",
        "Applications and invoices must be submitted under the applicable Wyoming ThermWise business process."
      ],
      "blockers": [
        "Air sealing and broad weatherization were not verified beyond insulation and pipe insulation.",
        "Pre-rinse spray valves are product-specific and should not be generalized to all low-flow fixtures.",
        "This gas program does not support electric heat pumps, EV charging, or solar PV.",
        "Ventilation matches should be limited to verified DCV and ERV measures."
      ],
      "programType": "Rebate Program",
      "administrator": "Enbridge Gas Wyoming / ThermWise",
      "applicationUrl": null,
      "websiteUrl": "https://www.enbridgegas.com/utwyid/save-money/thermwise/business-rebates",
      "sourceUrlsChecked": [
        "https://www.enbridgegas.com/utwyid/save-money/thermwise/business-rebates"
      ],
      "evidenceText": "ThermWise business pages list Wyoming applications for water heaters, boilers, furnaces, demand control ventilation, smart thermostats, food service, washers and dryers, and insulation.",
      "reasoningNotes": "Keep gas business measures and commercial food-service products; block broad low-flow fixtures, air sealing, electric HVAC, EV, and solar PV matches."
    },
    "existingSimpleRules": [
      {
        "id": "oir_679697b51e3014a6_v1",
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
        "formula": "$100 per commercial smart thermostat",
        "evidenceText": "2026 ThermWise Wyoming business smart thermostat application lists expected rebate of $100.",
        "sourceUrlsChecked": [
          "https://www.enbridgegas.com/utwyid/save-money/thermwise/business-rebates",
          "https://www.enbridgegas.com/-/media/Extranet-Pages/utidwy/save-money/thermwise/business-rebates/Business_SmartThermostat-Application-WY.pdf"
        ],
        "reasoningNotes": "Matched commercial smart thermostat term. Applies to qualifying thermostats with remote programming capability.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3642",
    "opportunityName": "AEP SWEPCO - Residential Energy Efficiency Rebate Programs",
    "state": "AR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3642/aep-swepco-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://swepcosavings.com/#/residential",
    "applicationUrl": null,
    "administrator": "AEP SWEPCO",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
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
          "AR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "SWEPCO Arkansas electric service territory"
        ],
        "notes": "Limited to eligible Arkansas residential dwellings served by a SWEPCO electric meter."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "tenant_with_owner_approval",
        "property_owner",
        "manufactured_home_owner"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "level_2_ev_charger_installation",
        "variable_speed_pool_pump",
        "smart_thermostat_zoning_retrofit",
        "energy_star_residential_clothes_washer",
        "energy_star_residential_clothes_dryer",
        "heat_pump_clothes_dryer",
        "energy_star_room_air_cleaner",
        "energy_star_dehumidifier",
        "advanced_power_strip",
        "energy_star_refrigerator_freezer",
        "induction_cooktop_range",
        "energy_star_residential_dishwasher",
        "refrigerator_freezer_recycling",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "duct_sealing_and_insulation"
      ],
      "hardRequirements": [
        "Applicant must have an Arkansas residential dwelling served by a SWEPCO electric meter.",
        "Efficient products must meet ENERGY STAR or program-specific qualifications.",
        "Efficient-product rebate applications and receipts must be submitted within the program deadline.",
        "Residential improvement and HVAC measures generally require participating contractor installation.",
        "Tenants must obtain owner approval where required.",
        "Funding and annual program rules apply."
      ],
      "blockers": [
        "Induction support is residential cooktop or range equipment, not commercial kitchen equipment.",
        "Efficient products, HVAC, and weatherization are related residential subprograms with separate rules and application paths.",
        "Commercial, industrial, foodservice, motor, VFD, and commercial refrigeration measures are not supported.",
        "EV support should be limited to qualifying residential Level 2 charger rebates."
      ],
      "programType": "Rebate Program",
      "administrator": "AEP SWEPCO",
      "applicationUrl": null,
      "websiteUrl": "https://swepcosavings.com/#/residential",
      "sourceUrlsChecked": [
        "https://swepcosavings.com/",
        "https://swepcosavings.com/residential/efficient-products",
        "https://swepcosavings.com/residential/residential-improvement-incentives",
        "https://www.swepco.com/savings/home/money/incentives/hvac"
      ],
      "evidenceText": "SWEPCO Arkansas residential pages list efficient-product rebates, Level 2 EV chargers, HPWHs, smart thermostats, induction cooktops and appliances; separate improvement pages support contractor-installed HVAC and home efficiency work.",
      "reasoningNotes": "The original match is broadly supportable, but the commercial induction label was a false positive and the program boundaries should be kept explicit."
    },
    "existingSimpleRules": [
      {
        "id": "oir_29d7980c4785986a_v1",
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
        "formula": "$250 per ENERGY STAR certified Level 2 EV charging station",
        "evidenceText": "SWEPCO says Arkansas customers can qualify for a $250 rebate for an ENERGY STAR Level 2 EV Charging Station.",
        "sourceUrlsChecked": [
          "https://www.swepco.com/savings/home/money/rebates/",
          "https://www.swepco.com/clean-energy/electric-cars/charging-station-rules"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms. Use one unit as one eligible home charging station.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3256",
    "opportunityName": "Salt River Project - Business Energy Efficiency Programs",
    "state": "AZ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3256/salt-river-project-business-energy-efficiency-programs",
    "websiteUrl": "https://www.srpnet.com/energy-savings-rebates/business/savings-tools",
    "applicationUrl": null,
    "administrator": "Salt River Project",
    "programType": "Business Rebate And Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
        "retrofitTypeId": "dc_fast_charger_installation",
        "displayName": "DC fast charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "dc fast"
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
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charger",
          "charging station"
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
          "AZ"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Salt River Project electric service territory"
        ],
        "notes": "Available to qualifying SRP business customers in the SRP service area."
      },
      "eligibleApplicantTypes": [
        "business_customers",
        "commercial_customers",
        "industrial_customers",
        "institutional_customers",
        "government_customers",
        "municipal_customers",
        "schools",
        "nonprofits",
        "multifamily_property_owners"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "public",
        "nonprofit",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "exterior_site_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "hvac_controls_retrofit",
        "energy_management_system",
        "variable_frequency_drive_retrofit",
        "high_efficiency_refrigeration_equipment",
        "retro_commissioning_study",
        "automated_demand_response_controls",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "Customer must be on an eligible SRP business account or subprogram tariff.",
        "Preapproval is required for retrofit lighting, energy management systems, custom, EV charger, demand response, and other measures where specified.",
        "Small Business Solutions is limited by eligible rate schedules, annual kWh use, account history, and building age.",
        "Retrocommissioning requires qualifying facility systems and implementation commitment."
      ],
      "blockers": [
        "Residential measures should not match this business opportunity.",
        "Business EV charger and business demand response are separate SRP business subprograms; match only when their specific requirements are met.",
        "Retrocommissioning is primarily a study/tuning pathway and should not be treated as equipment replacement by itself."
      ],
      "programType": "Business Rebate And Incentive Program",
      "administrator": "Salt River Project",
      "applicationUrl": null,
      "websiteUrl": "https://www.srpnet.com/energy-savings-rebates/business/savings-tools",
      "sourceUrlsChecked": [
        "https://www.srpnet.com/energy-savings-rebates/business/savings-tools",
        "https://www.srpnet.com/energy-savings-rebates/business/rebates/standard-solutions",
        "https://www.srpnet.com/energy-savings-rebates/business/rebates/small-businesses",
        "https://www.srpnet.com/energy-savings-rebates/business/rebates/retrocommissioning",
        "https://www.srpnet.com/energy-savings-rebates/business/rebates/ev-charger",
        "https://www.srpnet.com/energy-savings-rebates/business/rebates/demand-response"
      ],
      "evidenceText": "SRP business pages list standard rebates for LED lighting, HVAC, refrigeration, motors, EMS, smart thermostats and VFDs, plus separate business EV charger, demand response and retrocommissioning offers.",
      "reasoningNotes": "Most target matches are valid for SRP business programs, with subprogram boundaries enforced. Input target list source:"
    },
    "existingSimpleRules": [
      {
        "id": "oir_baa51f2923580715_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 250000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$2,500 per networked Level 2 EV charging station port for businesses",
        "evidenceText": "SRP lists $2,500 per networked Level 2 EV charging station port for businesses.",
        "sourceUrlsChecked": [
          "https://www.srpnet.com/energy-savings-rebates/business/rebates/ev-charger",
          "https://savewithsrpbiz.com/rebates/evcharger.aspx"
        ],
        "reasoningNotes": "Matched business EV charger and Level 2 terms. Government/multifamily/nonprofit/school sites have a separate higher amount.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f53da1c47e1a3ad3_v1",
        "incentiveType": "fixed_amount_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_amount",
          "amountCents": 2000000
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$20,000 per business location installing one to four DC fast charger stations",
        "evidenceText": "SRP lists DC fast charger rebates of $20,000 for business locations installing one to four stations.",
        "sourceUrlsChecked": [
          "https://www.srpnet.com/energy-savings-rebates/business/rebates/ev-charger",
          "https://savewithsrpbiz.com/rebates/evcharger.aspx"
        ],
        "reasoningNotes": "Matched DC fast charger terms. Official source states amount by location for one to four stations.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1925",
    "opportunityName": "Truckee Donner Public Utility District - Energy Conservation Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1925/truckee-donner-public-utility-district-energy-conservation-rebate-program",
    "websiteUrl": "https://www.tdpud.org/departments/energy-and-water-conservation/residential-services-and-programs/residential-home-upgrades",
    "applicationUrl": null,
    "administrator": "Truckee Donner Public Utility District",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
          "duct leakage"
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
          "CA"
        ],
        "counties": [
          "Nevada County"
        ],
        "cities": [
          "Truckee"
        ],
        "utilityTerritories": [
          "Truckee Donner Public Utility District electric and water service territory"
        ],
        "notes": "Electric rebates require a current TDPUD electric account; water conservation measures require TDPUD water service where applicable."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners",
        "landlords",
        "tenants"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "electric_panel_upgrade",
        "residential_induction_cooking",
        "heat_pump_water_heater",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "door_weatherization",
        "window_replacement",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "low_flow_toilet_replacement"
      ],
      "hardRequirements": [
        "Applicant must have an active TDPUD account for the relevant electric or water rebate.",
        "Heat pump water heaters must meet ENERGY STAR and efficiency requirements and be contractor-installed.",
        "EV charger rebate requires a registered EV at a Truckee address and a smart hardwired Level 2 charger meeting required communication standards.",
        "Applications, receipts, photos, and deadlines are required by measure."
      ],
      "blockers": [
        "TDPUD states refrigerators, dishwashers, clothes washers, and dryers are no longer offered, so appliance and commercial refrigeration matches are false positives.",
        "Induction support is residential cooking equipment, not commercial kitchen equipment.",
        "Air sealing should be limited to specific envelope measures such as ducts, doors, windows, and insulation, not broad weatherization unless the current form supports it."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Truckee Donner Public Utility District",
      "applicationUrl": null,
      "websiteUrl": "https://www.tdpud.org/departments/energy-and-water-conservation/residential-services-and-programs/residential-home-upgrades",
      "sourceUrlsChecked": [
        "https://www.tdpud.org/customer-service/conservation",
        "https://www.tdpud.org/departments/energy-and-water-conservation/residential-services-and-programs/residential-home-upgrades",
        "https://www.tdpud.org/home/showpublisheddocument/11501/639082990701200000",
        "https://www.tdpud.org/home/showpublisheddocument/11493/639026925990570000"
      ],
      "evidenceText": "TDPUD’s current residential upgrades page lists induction appliances, heat pump water heaters, envelope upgrades, heat pumps, smart Level 2 EV chargers, electric panels and toilets, while excluding several former appliance rebates.",
      "reasoningNotes": "Repaired appliance matches by removing discontinued refrigerator, dishwasher, clothes washer, and dryer rebates; retained current electrification, envelope, EV, and water categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_0f47c4043f862f74_v1",
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
        "formula": "$500 per residential SMART Level 2 EV charger, not to exceed equipment and installation cost",
        "evidenceText": "TDPUD EV charger application lists Residential SMART EV Charger rebate at $500.",
        "sourceUrlsChecked": [
          "https://www.tdpud.org/customer-service/conservation",
          "https://www.tdpud.org/home/showpublisheddocument/11493/639026925990570000"
        ],
        "reasoningNotes": "Matched EV charger and Level 2 terms. Source caps payment at equipment plus contractor installation cost.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4279",
    "opportunityName": "Black Hills Energy (Electric) - Commercial Energy Efficiency Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4279/black-hills-energy-electric-commercial-energy-efficiency-program",
    "websiteUrl": "https://www.blackhillsenergy.com/efficiency-and-savings/commercial-rebates/colorado-electric-commercial-rebates",
    "applicationUrl": "https://blackhillsenergycocomm.clearesult.com/",
    "administrator": "Black Hills Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
          "Black Hills Energy Colorado electric service territory"
        ],
        "notes": "Limited to eligible Colorado commercial and industrial electric customers of Black Hills Energy."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "industrial_electric_customer",
        "small_business_customer",
        "nonprofit_customer",
        "government_customer",
        "multifamily_property_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government",
        "nonprofit",
        "multifamily",
        "indoor_agriculture",
        "grocery",
        "restaurant_foodservice"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "water_source_heat_pump",
        "hvac_tune_up",
        "hvac_economizer",
        "evaporative_cooling_upgrade",
        "smart_thermostat_zoning_retrofit",
        "demand_controlled_ventilation",
        "advanced_rooftop_controls",
        "high_efficiency_chiller",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_retrofit",
        "anti_sweat_heater_controls",
        "walk_in_cooler_freezer_upgrade",
        "low_flow_pre_rinse_spray_valve",
        "commercial_heat_pump_water_heater",
        "electric_tankless_water_heater",
        "building_energy_management_system",
        "high_efficiency_server",
        "variable_frequency_drive_retrofit",
        "high_efficiency_motor_replacement",
        "efficient_air_compressor",
        "compressed_air_leak_repair",
        "compressed_air_study",
        "commercial_new_construction_efficiency",
        "small_business_direct_install",
        "custom_energy_efficiency_retrofit",
        "indoor_agriculture_efficiency_retrofit",
        "level_2_ev_charger_installation",
        "dc_fast_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a current Black Hills Energy Colorado commercial or industrial electric customer.",
        "Prescriptive rebates require equipment invoices, specifications, and applicable worksheets or documentation.",
        "Custom and site-specific projects may require preapproval and documented savings.",
        "Compressed-air study rebates require preapproval, minimum system size, and repair of required leak-loss share.",
        "Small Business Direct Install is limited to eligible small commercial facilities under the size threshold.",
        "EV charger rebates require nonresidential electric account in good standing, dedicated EV service or meter, approved network provider, qualifying installation period, and licensed electrician."
      ],
      "blockers": [
        "Residential measures are not supported by this commercial electric program.",
        "Low-flow support is limited to qualifying pre-rinse spray valves, not broad plumbing fixture retrofits.",
        "EV charging is a separate EV rebate pathway within Black Hills Energy offerings and should not be treated as ordinary efficiency equipment.",
        "Gas programs are separate and should not be mixed into this electric record.",
        "Foodservice support should not be broadened to fryers or ovens unless current electric application materials explicitly list them."
      ],
      "programType": "Rebate Program",
      "administrator": "Black Hills Energy",
      "applicationUrl": "https://blackhillsenergycocomm.clearesult.com/",
      "websiteUrl": "https://www.blackhillsenergy.com/efficiency-and-savings/commercial-rebates/colorado-electric-commercial-rebates",
      "sourceUrlsChecked": [
        "https://www.blackhillsenergy.com/efficiency-and-savings/commercial-rebates/colorado-electric-commercial-rebates",
        "https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/2026-COE-EE-Commercial-Prescriptive-Rebate-Program-App.pdf",
        "https://blackhillsenergycocomm.clearesult.com/",
        "https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/2026-COE-EV-Commercial-Rebate-Form.pdf"
      ],
      "evidenceText": "Black Hills Energy’s 2026 Colorado electric commercial page and application list lighting, HVAC, refrigeration, water heating, motors, VFDs, compressed air, custom, small-business and EV charger rebate pathways.",
      "reasoningNotes": "The current record supports many C&I categories, including EV as a separate pathway, but low-flow and foodservice terms must remain product-specific."
    },
    "existingSimpleRules": [
      {
        "id": "oir_e113821a492ca24e_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.7
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "70% of eligible project cost",
        "evidenceText": "Examples include: HVAC equipment Smart thermostat Refrigeration Lighting Compressed air equipment Motors / variable frequency drives REBATE AMOUNT - 70% of the equipment and installation costs",
        "sourceUrlsChecked": [
          "https://www.blackhillsenergy.com/efficiency-and-savings/commercial-rebates/colorado-electric-commercial-rebates"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null,
          "businessRelevance": "business_relevant",
          "v1Readiness": "needs_bill_data"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3672",
    "opportunityName": "Black Hills Energy (Gas) - Residential Energy Efficiency Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3672/black-hills-energy-gas-residential-energy-efficiency-program",
    "websiteUrl": "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/colorado-gas-residential-rebates",
    "applicationUrl": "https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/COG-EE-2026-Residential-Rebate-App.pdf",
    "administrator": "Black Hills Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
          "aerator",
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
          "CO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Black Hills Energy Colorado natural gas service territory"
        ],
        "notes": "Limited to eligible Black Hills Energy Colorado residential natural gas customers."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customer",
        "homeowner",
        "renter",
        "landlord"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential",
        "manufactured_home"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_gas_water_heater",
        "high_efficiency_furnace_retrofit",
        "furnace_tune_up",
        "high_efficiency_boiler_retrofit",
        "boiler_reset_control",
        "boiler_tune_up",
        "steam_boiler_retrofit",
        "gas_fireplace",
        "combination_gas_space_water_heater",
        "gas_absorption_heat_pump",
        "gas_furnace_backup_heat_pump",
        "hydronic_driveway_snow_melt_system",
        "programmable_thermostat",
        "smart_thermostat_zoning_retrofit",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "storm_window_installation",
        "window_replacement",
        "exterior_door_replacement",
        "water_heater_tank_wrap",
        "energy_star_residential_clothes_washer",
        "energy_star_residential_clothes_dryer",
        "energy_star_residential_dishwasher",
        "residential_convection_oven",
        "low_flow_faucet_aerator",
        "low_flow_showerhead",
        "thermostatic_shower_restriction_valve",
        "backup_generator"
      ],
      "hardRequirements": [
        "Applicant must be a current Black Hills Energy Colorado residential natural gas customer.",
        "Black Hills Energy must provide the main heat source fuel for heating, thermostat, and insulation-related measures where required.",
        "Equipment must be installed in the applicable program year and meet AHRI, ENERGY STAR, efficiency, and model requirements.",
        "Itemized invoices, manufacturer documentation, and required application materials must be submitted.",
        "Envelope measures are limited to qualifying existing homes and exclude new construction or additions.",
        "Certain appliance and water measures require a natural gas water heater."
      ],
      "blockers": [
        "Electric heat pump HVAC is not supported except for specific gas-fired absorption or gas-backup heat-pump equipment listed by the program.",
        "Oven support is residential convection cooking equipment, not commercial kitchen equipment.",
        "Clothes washer, dishwasher, and low-flow water measures depend on natural gas water-heating requirements where specified.",
        "Commercial and industrial customers are not eligible under this residential gas opportunity.",
        "New construction uses a separate program."
      ],
      "programType": "Rebate Program",
      "administrator": "Black Hills Energy",
      "applicationUrl": "https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/COG-EE-2026-Residential-Rebate-App.pdf",
      "websiteUrl": "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/colorado-gas-residential-rebates",
      "sourceUrlsChecked": [
        "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/colorado-gas-residential-rebates",
        "https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/COG-EE-2026-Residential-Rebate-App.pdf"
      ],
      "evidenceText": "Black Hills Energy’s 2026 Colorado gas residential page and application list water heaters, furnaces, boilers, gas-fired heat pumps, thermostats, envelope measures, residential appliances, aerators, showerheads and ovens.",
      "reasoningNotes": "The original match needed gas-residential narrowing and removal of commercial oven interpretation; low-flow is valid only for listed residential aerator, showerhead and valve measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_a336a68968529b9a_v1",
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
        "formula": "Up to $100 per ENERGY STAR or learning Wi-Fi smart thermostat",
        "evidenceText": "Black Hills Colorado gas application lists smart thermostat at up to $100.",
        "sourceUrlsChecked": [
          "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/colorado-gas-residential-rebates",
          "https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/COG-EE-2026-Residential-Rebate-App.pdf"
        ],
        "reasoningNotes": "Matched thermostat term. Confidence is medium because amount is shown as \"up to.\"",
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
