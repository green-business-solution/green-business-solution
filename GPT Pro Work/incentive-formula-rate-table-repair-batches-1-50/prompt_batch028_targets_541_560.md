You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 28
Targets in this prompt: 541-560 of 984
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
  "batchNumber": 28,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2588"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4791",
    "opportunityName": "MassSAVE (Electric) - Commercial New Construction/Major Renovation Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4791/masssave-electric-commercial-new-construction-major-renovation-program",
    "websiteUrl": "https://www.masssave.com/business/rebates-offers-services/new-construction-and-major-renovations",
    "applicationUrl": null,
    "administrator": "Mass Save Sponsors",
    "programType": "Rebate/Incentive Program",
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
          "weatherization"
        ]
      },
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "combined_heat_and_power_system",
        "displayName": "Combined heat and power system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "combined heat and power",
          "chp"
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
        "retrofitTypeId": "lighting_controls_retrofit",
        "displayName": "Lighting controls retrofit",
        "parentCategory": "lighting",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "networked lighting",
          "lighting control"
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
          "solar thermal"
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
        "cities": [],
        "utilityTerritories": [
          "Berkshire Gas",
          "Cape Light Compact",
          "Eversource",
          "Liberty Utilities",
          "National Grid",
          "Unitil"
        ],
        "notes": "Applies in participating Mass Save Sponsor service territories; customers of nonparticipating municipal light plants are not automatically eligible unless served by a Mass Save Sponsor for the relevant service."
      },
      "eligibleApplicantTypes": [
        "Commercial customers of Mass Save Sponsors",
        "Industrial customers of Mass Save Sponsors",
        "Building owners",
        "Developers",
        "Design teams",
        "Tenant fit-out project sponsors",
        "Multifamily high-rise developers or owners through applicable Mass Save pathway"
      ],
      "eligibleSectors": [
        "Commercial",
        "Industrial",
        "Institutional",
        "Municipal",
        "Multifamily high-rise",
        "New construction",
        "Major renovation"
      ],
      "eligibleRetrofitCategories": [
        "New construction major renovation",
        "Whole-building energy performance",
        "Net zero/low EUI design",
        "Heat pump HVAC",
        "Air-source heat pump",
        "Variable refrigerant flow heat pump",
        "Ground-source heat pump",
        "Building envelope",
        "Lighting controls",
        "Networked lighting controls",
        "Unitary HVAC",
        "High-efficiency chillers",
        "Energy recovery",
        "Demand control ventilation",
        "Variable-flow kitchen hood",
        "Domestic hot water heaters",
        "Low-flow domestic hot water fixtures",
        "VFD",
        "Custom energy efficiency"
      ],
      "hardRequirements": [
        "Project must be in a participating Mass Save Sponsor territory and engage with the program early enough for the applicable pathway.",
        "As of January 1, 2025, Mass Save Sponsors discontinued incentives for fossil-fuel equipment and new construction buildings using fossil-fuel equipment.",
        "Heat pump incentives require the equipment to serve as the primary heating source and meet pathway requirements.",
        "Whole-building pathways have size and EUI-reduction or performance requirements; Path 3 covers high-performance building or discrete measures.",
        "Total project incentives, including construction, post-occupancy and heat pump adders, are capped by current program limits."
      ],
      "blockers": [
        "Administrator list was updated from legacy utility names to current Mass Save Sponsors; NSTAR and Western Massachusetts Electric are represented under Eversource.",
        "Matched CHP and combined heat and power are not supported by the current new construction and major renovation sources checked.",
        "Matched commercial dishwasher and dishwasher are not supported by the current program page checked.",
        "Matched solar thermal is not supported by the current program page checked.",
        "Matched weatherization and window are not standalone retrofit categories here; only building-envelope measures within the current program pathways were retained.",
        "LED lighting as a fixture measure was not retained; current source support was for lighting controls and networked controls."
      ],
      "programType": "Rebate/Incentive Program",
      "administrator": "Mass Save Sponsors",
      "applicationUrl": null,
      "websiteUrl": "https://www.masssave.com/business/rebates-offers-services/new-construction-and-major-renovations",
      "sourceUrlsChecked": [
        "https://www.masssave.com/business/rebates-offers-services/new-construction-and-major-renovations",
        "https://www.masssave.com/business/rebates-offers-services/new-construction-and-major-renovations/high-performance-buildings",
        "https://programs.dsireusa.org/system/program/detail/4791/masssave-electric-commercial-new-construction-major-renovation-program"
      ],
      "evidenceText": "Mass Save's current New Construction and Major Renovations page lists participation pathways for Net Zero/Low EUI, Whole Building EUI Reduction and High Performance Buildings. Current support includes cold-climate heat pump incentives for ASHP, VRF and GSHP, and Path 3 custom measures such as building envelope, lighting controls, unitary HVAC, chillers, energy recovery, demand control ventilation, variable-flow kitchen hoods, DHW heaters, low-flow DHW fixtures and VFDs.",
      "reasoningNotes": "The record remains active but the old administrator list and several imported match terms are stale. The program is for business new construction, major renovation and high-performance projects, not general commercial retrofit or residential measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Mass Save page describes incentives for specialty equipment but does not provide a single kitchen-equipment formula.",
        "sourceUrlsChecked": [
          "http://www.masssave.com/en/business/incentive-programs/new-construction-renovation",
          "https://www.masssave.com/business"
        ],
        "reasoningNotes": "New construction incentives are project- and measure-specific.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2549",
    "opportunityName": "New Prague Utilities Commission - Commercial & Industrial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2549/new-prague-utilities-commission-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/new-prague",
    "applicationUrl": null,
    "administrator": "New Prague Utilities Commission",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 12,
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "hvac replacement",
          "air conditioner",
          "chiller"
        ]
      },
      {
        "retrofitTypeId": "high_efficiency_motor_replacement",
        "displayName": "High-efficiency motor replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "motor replacement"
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
          "low flow"
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
          "vending machine controls",
          "floating head pressure"
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [],
        "cities": [
          "New Prague"
        ],
        "utilityTerritories": [
          "New Prague Utilities Commission electric service territory"
        ],
        "notes": "Program is presented through SMMPA member utility information for New Prague Utilities Commission customers."
      },
      "eligibleApplicantTypes": [
        "business electric customers",
        "commercial electric customers",
        "industrial electric customers",
        "manufacturing customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "manufacturing",
        "food service",
        "hospitality",
        "refrigeration and grocery"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_refrigeration_equipment",
        "walk_in_cooler_freezer_upgrade",
        "refrigeration_controls_retrofit",
        "anti_sweat_heater_controls",
        "energy_management_system",
        "high_efficiency_motor_replacement",
        "efficient_air_compressor",
        "compressed_air_leak_repair"
      ],
      "hardRequirements": [
        "Customer must be served by New Prague Utilities Commission.",
        "Rebate applications and technical forms must be submitted through the current SMMPA/New Prague program materials.",
        "Equipment must meet the measure-specific efficiency and documentation requirements in current forms.",
        "Industrial and manufacturing measures such as motors and compressed air require applicable industrial/manufacturing rebate forms.",
        "Some measures may require pre-approval or utility review before installation."
      ],
      "blockers": [
        "low_flow_fixture_retrofit is unsupported by the current official New Prague/SMMPA page reviewed and should be removed.",
        "Guestroom energy management should not be matched as broad whole-building automation; it is a hospitality-specific control measure unless custom review supports a broader project.",
        "Detailed Google Drive rebate forms linked from the current SMMPA page were not reliably accessible in this environment, so exact specifications and submeasure limits could not be fully verified.",
        "Refrigeration subcategories are supported by the presence of current refrigeration equipment forms and DSIRE clues, but exact submeasure details should be validated against the accessible form before quoting rebate amounts."
      ],
      "programType": "Rebate Program",
      "administrator": "New Prague Utilities Commission",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/new-prague",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/2549/new-prague-utilities-commission-commercial-and-industrial-energy-efficiency-rebate-program",
        "https://smmpa.com/members/new-prague"
      ],
      "evidenceText": "The current SMMPA New Prague member page lists 2026 business rebate materials for lighting, HVAC, cooling tune-ups, electric chiller tune-ups, furnace fan motors, VSDs on HVAC fans and pumps, high-efficiency HVAC fans and clean-water pumps, air-source heat pumps, ground-source heat pumps, water-source heat pumps, refrigeration equipment, foodservice equipment, vending/snack controls, guestroom energy management, motors, compressed air leak correction, compressed air equipment, retrocommissioning, and custom rebates.",
      "reasoningNotes": "Most matched categories are directionally correct for a municipal C&I rebate portfolio. Low-flow fixture retrofit is a false positive. Confidence is medium because several detailed current forms are linked through Google Drive and were not fully accessible for submeasure verification."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "New Prague/SMMPA commercial source exposes contact paths and forms, but no current per-kWh or refrigeration formula was verified.",
        "sourceUrlsChecked": [
          "https://smmpa.com/members/new-prague",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "Target spans many custom commercial measures; select a specific measure table value later.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3026",
    "opportunityName": "National Grid (Electric) - Non-Residential Energy Efficiency Program (Upstate New York)",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3026/national-grid-electric-non-residential-energy-efficiency-program-upstate-new-york",
    "websiteUrl": "https://www.nationalgridus.com/upstate-ny-business/energy-saving-programs/",
    "applicationUrl": null,
    "administrator": "National Grid",
    "programType": "Rebate/Incentive Program",
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
          "weatherization"
        ]
      },
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
          "boiler",
          "condensing boiler"
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
          "lighting controls",
          "occupancy sensor",
          "lighting control"
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
          "NY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "National Grid Upstate New York electric service territory"
        ],
        "notes": "Applies to eligible Upstate New York National Grid non-residential electric customers on qualifying rate codes; several subprograms also require payment of the System Benefits Charge."
      },
      "eligibleApplicantTypes": [
        "National Grid Upstate New York commercial electric customers",
        "Industrial electric customers",
        "Municipal customers",
        "Institutional customers",
        "Agricultural customers",
        "Multifamily property owners through applicable subprograms",
        "Large commercial and industrial customers for electrification"
      ],
      "eligibleSectors": [
        "Commercial",
        "Industrial",
        "Municipal",
        "Institutional",
        "Agriculture",
        "Multifamily",
        "Hospitality",
        "Retail",
        "Grocery",
        "Warehouse"
      ],
      "eligibleRetrofitCategories": [
        "Heat pump HVAC",
        "Commercial/industrial electrification",
        "Heat pump water heater",
        "Air-source heat pump",
        "VRF heat pump",
        "Large unitary heat pump",
        "Ground-source heat pump",
        "Air-to-water heat pump",
        "HRV/ERV",
        "DOAS",
        "Waste heat recovery",
        "Process heating electrification",
        "Industrial heat pump",
        "Heat recovery chiller",
        "Heat pump chiller",
        "Energy management systems",
        "Advanced controls/retrocommissioning",
        "Variable frequency drives",
        "Compressed air",
        "Hotel occupancy sensors",
        "Vending misers",
        "Refrigeration",
        "Custom electric energy efficiency",
        "Weatherization air sealing",
        "Weatherization roof/wall insulation",
        "Pipe insulation",
        "Window replacement or inserts",
        "Exterior door replacement",
        "Duct sealing",
        "Air curtains"
      ],
      "hardRequirements": [
        "Customer must be a National Grid Upstate New York non-residential electric customer on a qualifying rate code.",
        "Commercial electric weatherization requires a qualifying commercial electric rate code and typically a hard-wired electric heating system or heat pump serving at least 50 percent of calculated heating load.",
        "C&I electrification projects require early engagement, pre-inspection, signed offer letter to reserve funding, installation review, final invoices and post-inspection.",
        "C&I electrification contractors must be in the National Grid Clean Energy Trade Ally Network.",
        "Custom electric incentives require technical analysis and are capped by installed project cost limits.",
        "Lighting projects are subject to phase-out deadlines and should not be treated as newly available unless the customer already met the 2025 report/application timing."
      ],
      "blockers": [
        "Boiler and condensing boiler matched terms are not retained for this electric non-residential record; any gas-side boiler incentives are separate from the electric program sources checked.",
        "Demand response is listed by National Grid as a separate program and was not retained as an energy-efficiency retrofit category for this record.",
        "Energy audit is not a standalone rebate category in the checked sources; technical analysis applies to custom or electrification projects.",
        "New lighting fixture, lighting control and generic occupancy-sensor incentives appear phased out to new projects after the 2025 deadline; only already accepted projects have 2026 completion/payment deadlines.",
        "Weatherization eligibility is restricted by electric heating, rate code, pre/post inspection and custom-tool requirements; it is not a general commercial envelope rebate for every National Grid business customer."
      ],
      "programType": "Rebate/Incentive Program",
      "administrator": "National Grid",
      "applicationUrl": null,
      "websiteUrl": "https://www.nationalgridus.com/upstate-ny-business/energy-saving-programs/",
      "sourceUrlsChecked": [
        "https://www.nationalgridus.com/upstate-ny-business/energy-saving-programs/",
        "https://www.nationalgridus.com/Upstate-NY-Business/Energy-Saving-Programs/Large-Business-Program",
        "https://www.nationalgridus.com/media/pdfs/bus-ways-to-save/ee4798_uny_electric-incentive.pdf",
        "https://www.nationalgridus.com/media/pdfs/bus-ways-to-save/national-grid-ci-electrification-program-application-2026.pdf",
        "https://www.nationalgridus.com/media/pdfs/bus-ways-to-save/uny/uny-electric-wx-measures-flyer-2025.pdf",
        "https://www.nationalgridus.com/media/pdfs/bus-ways-to-save/uny-wx-electric-sales-flyer.pdf",
        "https://programs.dsireusa.org/system/program/detail/3026/national-grid-electric-non-residential-energy-efficiency-program-upstate-new-york"
      ],
      "evidenceText": "National Grid's Upstate NY business pages list active programs for heat pumps, weatherization, EV charging, demand response, C&I beneficial electrification, advanced controls, agriculture and financing. The 2026 C&I electrification application supports large C&I customers replacing fossil-fuel heating with heat pumps and other technologies, including ASHP, VRF, GSHP, air-to-water heat pumps, HPWH, ERV/HRV, heat recovery and process electrification. Commercial electric weatherization sources list air sealing, pipe insulation, windows, window inserts, roof/wall insulation, doors, air curtains and custom duct sealing/floor insulation. The electric incentive flyer lists EMS, compressed air, VFDs, refrigeration and custom incentives.",
      "reasoningNotes": "The record is active but has multiple subprograms. Boiler, demand response, audit and current new lighting matches were separated or blocked to prevent false-positive matching to this electric energy-efficiency opportunity."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "National Grid business pages describe service/rebate categories but no current refrigeration or controls amount was verified in accessible official text.",
        "sourceUrlsChecked": [
          "https://www.nationalgridus.com/Upstate-NY-Business/Default",
          "https://www.nationalgridus.com/Services-Rebates.aspx"
        ],
        "reasoningNotes": "Matched terms span refrigeration, HVAC, controls, audits and custom measures; a current measure table is required.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3018",
    "opportunityName": "National Grid (Gas) - Commercial Energy Efficiency Rebate Programs (Upstate New York)",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3018/national-grid-gas-commercial-energy-efficiency-rebate-programs-upstate-new-york",
    "websiteUrl": "https://www.nationalgridus.com/Upstate-NY-Business/Default",
    "applicationUrl": null,
    "administrator": "National Grid",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
          "weatherization"
        ]
      },
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
          "National Grid Upstate New York gas service territory"
        ],
        "notes": "Applies to National Grid gas business customers in Upstate New York; electric measures belong to separate programs."
      },
      "eligibleApplicantTypes": [
        "commercial_gas_customer",
        "industrial_gas_customer",
        "multifamily_gas_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "steam_trap_replacement",
        "pipe_insulation",
        "duct_insulation",
        "high_efficiency_boiler_retrofit",
        "boiler_controls_retrofit",
        "high_efficiency_water_heater",
        "custom_natural_gas_efficiency_project"
      ],
      "hardRequirements": [
        "Applicant must be a National Grid Upstate New York gas business customer.",
        "Measures must save natural gas and meet current National Grid business rebate rules.",
        "Steam trap surveys and related measures are subject to current cost-share and annual limits.",
        "Custom gas measures require current program eligibility review."
      ],
      "blockers": [
        "Air compressors, lighting controls, demand response, and electric heat pumps are not supported by this gas rebate record.",
        "Low-flow fixtures should not be matched unless a current National Grid gas source identifies a qualifying gas-saving measure.",
        "Do not combine separate National Grid electric efficiency programs with this gas program."
      ],
      "programType": "Rebate Program",
      "administrator": "National Grid",
      "applicationUrl": null,
      "websiteUrl": "https://www.nationalgridus.com/Upstate-NY-Business/Default",
      "sourceUrlsChecked": [
        "https://www.nationalgridus.com/Upstate-NY-Business/Default",
        "https://www.nationalgridus.com/Services-Rebates.aspx",
        "https://www.nationalgridus.com/media/pdfs/bus-ways-to-save/steam-trap-uny-ci-gas-brochure.pdf"
      ],
      "evidenceText": "National Grid Upstate gas materials support business gas efficiency measures such as steam traps, pipe insulation, boiler controls, boilers, water heating, audits, and custom gas savings.",
      "reasoningNotes": "The original match included electric and industrial categories that are separate from the Upstate New York gas business rebate program."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "National Grid upstate business gas rebates include many boilers, controls, steam traps and studies.",
        "sourceUrlsChecked": [
          "https://www.nationalgridus.com/Upstate-NY-Business/Default"
        ],
        "reasoningNotes": "Current measure-specific application table must be extracted before selecting a safe commercial kitchen or steam-trap rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3154",
    "opportunityName": "Black Hills Energy - Commercial Energy Efficiency Programs",
    "state": "SD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3154/black-hills-energy-commercial-energy-efficiency-programs",
    "websiteUrl": "https://www.blackhillsenergy.com/efficiency-and-savings/commercial-rebates/commercial-rebates-south-dakota-and-weston-county-wyoming",
    "applicationUrl": "https://bhpciprescriptive.customerapplication.com",
    "administrator": "Black Hills Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 12,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "variable frequency drive"
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
          "SD",
          "WY"
        ],
        "counties": [
          "Weston"
        ],
        "cities": [],
        "utilityTerritories": [
          "Black Hills Energy commercial and industrial electric service territory in South Dakota",
          "Black Hills Energy commercial and industrial electric service territory in Weston County, Wyoming where applicable"
        ],
        "notes": "The DSIRE record is South Dakota-focused, but the current official Black Hills commercial page and form cover South Dakota and Weston County, Wyoming commercial and industrial electric customers."
      },
      "eligibleApplicantTypes": [
        "Black Hills Energy commercial electric customers",
        "industrial electric customers",
        "business customers",
        "restaurant and foodservice customers",
        "grocery and refrigeration customers",
        "commercial EV charger site hosts under the separate Ready EV pathway"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "restaurant and food service",
        "grocery and refrigeration",
        "hospitality",
        "retail",
        "office",
        "compressed air",
        "transportation electrification where separately eligible"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "exterior_site_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "hvac_controls_retrofit",
        "high_efficiency_refrigeration_equipment",
        "walk_in_cooler_freezer_upgrade",
        "refrigeration_ec_motor_retrofit",
        "refrigeration_controls_retrofit",
        "anti_sweat_heater_controls",
        "door_gasket_strip_curtain_night_cover",
        "energy_management_system",
        "demand_controlled_ventilation",
        "demand_controlled_kitchen_ventilation",
        "variable_frequency_drive_retrofit",
        "efficient_air_compressor",
        "compressed_air_leak_repair"
      ],
      "hardRequirements": [
        "Applicant must be a Black Hills Energy commercial or industrial electric customer in the applicable South Dakota or Weston County, Wyoming service area.",
        "Customer must purchase and install new qualifying equipment before submitting a rebate application unless a separate pathway requires preapproval.",
        "Used, refurbished, repaired, or rebuilt equipment does not qualify.",
        "Applications require final itemized invoices for equipment, materials, and labor.",
        "Equipment purchase and installation must occur during the current 2026 program year and applications must be received by the stated deadline.",
        "Funding is limited and applications are processed first-come, first-served.",
        "Equipment must meet measure-specific requirements such as HVAC efficiency, VFD operating-hour requirements, refrigeration controls, compressed-air equipment limits, and lighting specifications."
      ],
      "blockers": [
        "The separate Ready EV commercial charger program on the same Black Hills page should not be merged into this energy-efficiency equipment record unless the opportunity is explicitly EV charging.",
        "Pre-rinse spray valves are product-specific foodservice measures and should not be generalized as a broad low-flow fixture retrofit.",
        "Energy management system should be limited to guest-room energy management controls or supported control measures, not all BAS installations.",
        "High-efficiency refrigeration should be limited to listed refrigerator case lighting, walk-in/reach-in ECMs, strip curtains, case doors, anti-sweat controls, door closers, and similar listed measures.",
        "Air compressor matches should be limited to listed VSD air compressors and related compressed-air measures, not all compressor purchases.",
        "Gas customer rebate forms from other Black Hills states should not be used for this South Dakota electric C&I record."
      ],
      "programType": "Rebate Program",
      "administrator": "Black Hills Energy",
      "applicationUrl": "https://bhpciprescriptive.customerapplication.com",
      "websiteUrl": "https://www.blackhillsenergy.com/efficiency-and-savings/commercial-rebates/commercial-rebates-south-dakota-and-weston-county-wyoming",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/3154/black-hills-energy-commercial-energy-efficiency-programs",
        "https://www.blackhillsenergy.com/efficiency-and-savings/commercial-rebates/commercial-rebates-south-dakota-and-weston-county-wyoming",
        "https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/BHP-2026-SD-Commercial-Prescriptive-Form.pdf",
        "https://www.blackhillsenergy.com/efficiency-and-savings/commercial-rebates"
      ],
      "evidenceText": "Current Black Hills Energy South Dakota/Weston County commercial materials list LED lighting projects, commercial equipment including HVAC, sensors, controls, PTACs, PTHPs and VFDs, and a 2026 commercial prescriptive form with lighting, walk-in cooler/freezer strip curtains, HVAC DCV, ECMs for coolers/freezers, evaporator fan controls, anti-sweat controls, kitchen DCV, VSD air compressors, compressed-air measures, VFD fan and pump measures, chillers, heat pumps, small commercial smart thermostats, and walk-in cooler/freezer door closers.",
      "reasoningNotes": "The current official form supports the main C&I lighting, HVAC, refrigeration, controls, VFD, and compressed-air matches. EV charging appears on the same webpage but is a separate Ready EV pathway."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Black Hills commercial pages list multiple custom and prescriptive equipment categories but exact target measure values were not verified.",
        "sourceUrlsChecked": [
          "https://www.blackhillsenergy.com/efficiency-and-savings/commercial-rebates"
        ],
        "reasoningNotes": "Target spans controls, HVAC, refrigeration and VFDs; a current application table should be extracted.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1543",
    "opportunityName": "Texas-New Mexico Power Company - Residential and Hard-to-Reach Standard Offer Programs",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1543/texas-new-mexico-power-company-residential-and-hard-to-reach-standard-offer-programs",
    "websiteUrl": "https://tnmp.com/energy-efficiency/residential/existing-homes",
    "applicationUrl": "https://tnmp.p3.enertrek.com",
    "administrator": "Frontier Energy for Texas-New Mexico Power Company",
    "programType": "Standard Offer Program",
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
          "evse"
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
          "low flow",
          "aerator",
          "showerhead"
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
          "solar pv"
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
          "Texas-New Mexico Power electric distribution service territory"
        ],
        "notes": "Program is for existing residential TNMP distribution customers, with Residential and Hard-to-Reach standard offer pathways and 2026 Solar+ subprogram constraints."
      },
      "eligibleApplicantTypes": [
        "approved project sponsors",
        "energy service companies",
        "contractors",
        "project aggregators",
        "nonprofit organizations",
        "national or local product providers",
        "retailers installing eligible products",
        "multifamily property owners with required approvals",
        "existing residential TNMP customers as host customers",
        "hard-to-reach income-eligible residential customers"
      ],
      "eligibleSectors": [
        "residential",
        "hard-to-reach residential",
        "low-income residential",
        "multifamily residential"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "duct_sealing_and_insulation",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "rooftop_solar_pv",
        "battery_storage_system",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "low_flow_fixture_retrofit"
      ],
      "hardRequirements": [
        "Incentives are paid to approved project sponsors, not directly to individual homeowners in the ordinary rebate sense.",
        "Project sponsors must enroll and submit projects through the TNMP P3 platform.",
        "Host customer must be an existing residential TNMP distribution customer.",
        "Hard-to-Reach eligibility requires income qualification under applicable PUCT/TNMP program rules.",
        "Water-saving measures such as low-flow showerheads and faucet aerators are limited to homes with electric water heating.",
        "LED replacements cannot replace existing LEDs, CFLs, or empty sockets.",
        "Solar PV must be new, interconnected behind the customer meter, use eligible listed equipment, and meet TNMP Solar+ requirements.",
        "Battery storage is only supported where paired with new qualifying solar under the Solar+ subprogram; standalone storage should not match.",
        "EVSE is only supported under the Solar+ subprogram with qualifying solar, must be ENERGY STAR Level 2 equipment, and must use qualified subprogram installation companies."
      ],
      "blockers": [
        "This is a standard offer program for approved sponsors; do not present it as a direct homeowner retail rebate unless the sponsor delivery path is clear.",
        "rooftop_solar_pv, battery_storage_system, ev_charger_installation, and level_2_ev_charger_installation are 2026 Solar+ subprogram measures, not ordinary standalone Residential/Hard-to-Reach measures.",
        "battery_storage_system is not eligible as standalone storage; it must be paired with new qualifying solar where current Solar+ rules allow.",
        "EV charging is not standalone and must be qualifying ENERGY STAR Level 2 EVSE installed with qualifying solar; do not match DC fast charging.",
        "low_flow_fixture_retrofit is limited to specified water-saving devices for electric-water-heating homes, not all water conservation.",
        "Gas measures replacing non-electric equipment and general self-generation are ineligible except for the explicit Solar+ exception."
      ],
      "programType": "Standard Offer Program",
      "administrator": "Frontier Energy for Texas-New Mexico Power Company",
      "applicationUrl": "https://tnmp.p3.enertrek.com",
      "websiteUrl": "https://tnmp.com/energy-efficiency/residential/existing-homes",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/1543/texas-new-mexico-power-company-residential-and-hard-to-reach-standard-offer-programs",
        "https://tnmpefficiency.com/residential.php#existing-homes",
        "https://tnmp.com/energy-efficiency/residential/existing-homes",
        "https://tnmp.com/sites/default/files/inline-images/2026%20RESHTR%20Program%20Manual%20Updated-TNMPstorageupdate20260515.pdf",
        "https://tnmp.p3.enertrek.com"
      ],
      "evidenceText": "TNMP's current Existing Homes page lists insulation, duct sealing, smart thermostats, A/C tune-ups, heat pump water heaters, water-saving measures for electric water heating, heating and cooling equipment, and custom projects. The 2026 TNMP Residential and Hard-to-Reach manual identifies Frontier Energy as implementer, sponsor enrollment through P3, eligible sponsor types, LEDs, HVAC, heat pumps, duct sealing, HPWHs, low-flow showerheads and aerators, and a 2026 Solar+ set-aside for solar, solar plus new storage, and ENERGY STAR Level 2 EVSE paired with solar.",
      "reasoningNotes": "The DSIRE match is partially correct, but solar, storage, and EVSE require strict Solar+ boundaries. The program is sponsor-driven, so applicant and delivery matching must account for sponsor approval rather than direct consumer rebate access."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "Official residential program source failed to fetch.",
        "sourceUrlsChecked": [
          "https://tnmpefficiency.com/residential.php#existing-homes"
        ],
        "reasoningNotes": "No official EVSE or residential measure formula could be verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2415",
    "opportunityName": "Pacific Power - wattsmart Business Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2415/pacific-power-wattsmart-business-program",
    "websiteUrl": "https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-washington.html",
    "applicationUrl": "https://wattsmartincentives.com",
    "administrator": "Pacific Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 12,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "cool_roof_reflective_roof",
        "displayName": "Cool roof / reflective roof coating",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "cool roof"
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
          "programmable thermostat",
          "thermostat"
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
          "WA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Pacific Power electric service territory in Washington"
        ],
        "notes": "This target is the Washington wattsmart Business incentive program; do not apply Oregon, California, Idaho, Utah, or Wyoming program tables unless separately verified."
      },
      "eligibleApplicantTypes": [
        "Pacific Power business customers",
        "nonresidential electric customers",
        "facility owners",
        "small business customers",
        "very small business customers",
        "named-community eligible customers",
        "vendors or contractors where an offer uses trade ally or midstream delivery"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "agricultural",
        "municipal",
        "public sector",
        "food service",
        "mixed-use or multifamily common areas on eligible nonresidential schedules"
      ],
      "eligibleRetrofitCategories": [
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "window_replacement",
        "cool_roof_reflective_roof",
        "window_film_shading_retrofit",
        "energy_management_system",
        "high_efficiency_laundry_equipment"
      ],
      "hardRequirements": [
        "Project must be for a qualifying Pacific Power Washington business or nonresidential facility.",
        "Measures must meet current 2026 wattsmart Business Washington incentive-list specifications.",
        "Building envelope measures require a qualifying mechanically cooled building and must meet listed NFRC, U-factor, SHGC, SRI, insulation, or window-film requirements.",
        "Heat pump, VRF, ground-source, water-source, and related HVAC measures must meet listed AHRI, CEE, ENERGY STAR, or program technical requirements.",
        "Heat pump water heater incentives are limited to qualifying residential-type HPWHs used in a business setting and meeting NEEA Tier requirements.",
        "Commercial clothes washer incentives require qualifying front-load equipment and electric water heating and/or electric clothes drying.",
        "Energy management incentives are for eligible non-capital operational improvements or approved custom projects and require Pacific Power analysis and verification."
      ],
      "blockers": [
        "Do not match residential wattsmart Homes incentives to this Washington business program.",
        "high_efficiency_laundry_equipment should be limited to qualifying commercial front-load clothes washers with electric water heating and/or electric drying, not all laundry equipment.",
        "energy_management_system is not a generic building automation rebate; current materials emphasize approved energy management or custom operational improvements.",
        "Building envelope matches are limited to listed measures such as cool roofs, roof/attic insulation, wall insulation, qualifying windows, and window film for mechanically cooled buildings.",
        "Custom incentives require review and should not be auto-matched from a keyword alone."
      ],
      "programType": "Rebate Program",
      "administrator": "Pacific Power",
      "applicationUrl": "https://wattsmartincentives.com",
      "websiteUrl": "https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-washington.html",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/2415/pacific-power-wattsmart-business-program",
        "https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-washington.html",
        "https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-washington/wa-incentive-lists.html",
        "https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-washington/wa-incentive-lists/wa-appliances-equipment.html",
        "https://www.pacificpower.net/content/dam/pcorp/documents/en/pacificpower/savings-energy-choices/wattsmart-business/washington/WA_wattsmartBusiness_Incentive_tables_information.pdf",
        "https://www.pacificpower.net/content/dam/pcorp/documents/en/pacificpower/savings-energy-choices/wattsmart-business/washington/WA_wattsmart_Business_Building_Envelope_Application.pdf",
        "https://www.pacificpower.net/content/dam/pcorp/documents/en/pacificpower/savings-energy-choices/wattsmart-business/washington/WA_wattsmart_Business_Appliance_Incentives.pdf",
        "https://wattsmartincentives.com"
      ],
      "evidenceText": "Current Pacific Power Washington wattsmart Business materials list incentives for lighting and controls, HVAC, building envelope, appliances and other equipment, foodservice, compressed air, and custom measures. The 2026 tables include heat pumps, ground-source heat pumps, connected and programmable thermostats, cool roofs, insulation, windows, window film, heat pump water heaters, commercial clothes washers, and energy management incentives.",
      "reasoningNotes": "The matched retrofit categories are correct for the Washington business program when limited to current measure-specific tables and requirements. The repair adds boundaries for building envelope, laundry, HPWH, and energy management."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Wattsmart Washington business tables include many measure-specific HVAC, lighting, and energy-management rates and caps.",
        "sourceUrlsChecked": [
          "https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-washington.html",
          "https://www.pacificpower.net/content/dam/pcorp/documents/en/pacificpower/savings-energy-choices/wattsmart-business/washington/WA_wattsmartBusiness_Incentive_tables_information.pdf"
        ],
        "reasoningNotes": "Target is whole-building custom efficiency with many matched measures.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1614",
    "opportunityName": "Anaheim Public Utilities - Residential Home Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1614/anaheim-public-utilities-residential-home-efficiency-rebate-program",
    "websiteUrl": "https://www.anaheim.net/936/Energy-Rebates-Programs",
    "applicationUrl": "https://www.anaheim.net/1481/Rebate-Guidelines-Application",
    "administrator": "Anaheim Public Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "Orange County"
        ],
        "cities": [
          "Anaheim"
        ],
        "utilityTerritories": [
          "Anaheim Public Utilities electric service territory"
        ],
        "notes": "Limited to residential dwellings in Anaheim Public Utilities service area; new construction is excluded under rebate guidelines."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "income_qualified_residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_dishwasher",
        "residential_refrigerator",
        "residential_heat_pump_clothes_dryer",
        "heat_pump_water_heater",
        "battery_storage_system",
        "insulation_upgrade",
        "window_replacement",
        "window_film_shading_retrofit",
        "level_2_ev_charger_installation",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "high_efficiency_hvac_replacement",
        "hvac_tune_up",
        "smart_thermostat_zoning_retrofit",
        "air_filtration_system",
        "ceiling_fan",
        "refrigerator_recycling"
      ],
      "hardRequirements": [
        "Applicant must be an Anaheim Public Utilities residential customer.",
        "Dwelling must be fully constructed and occupied; new construction is not eligible.",
        "Products must meet Energy Star, efficiency, or project-specific requirements.",
        "Window rebates require the current worksheet and product documentation.",
        "Battery storage must meet minimum capacity and solar, TOU, and MyPower Savings requirements.",
        "EV charger rebate applies to qualifying private Level 2 charging equipment."
      ],
      "blockers": [
        "Commercial dishwasher and commercial refrigeration are false positives for this residential appliance program.",
        "Low-flow fixture retrofit is unsupported; the appliance and fixtures page refers to residential energy products, not plumbing conservation.",
        "Battery storage requires existing solar PV and program enrollment, so it should not match standalone batteries.",
        "Do not infer broad commercial kitchen equipment from residential dishwasher or appliance rebates."
      ],
      "programType": "Rebate Program",
      "administrator": "Anaheim Public Utilities",
      "applicationUrl": "https://www.anaheim.net/1481/Rebate-Guidelines-Application",
      "websiteUrl": "https://www.anaheim.net/936/Energy-Rebates-Programs",
      "sourceUrlsChecked": [
        "https://www.anaheim.net/936/Energy-Rebates-Programs",
        "https://www.anaheim.net/1481/Rebate-Guidelines-Application",
        "https://www.anaheim.net/5241/Appliance-Fixtures",
        "https://www.anaheim.net/5730/Battery-Storage",
        "https://www.anaheim.net/5242/Building-Projects",
        "https://www.anaheim.net/593/Private-EV-Charger-Rebate",
        "https://www.anaheim.net/2579/Heating-Cooling-Systems"
      ],
      "evidenceText": "Anaheim lists residential rebates for appliances, fixtures, battery storage, building products, heating and cooling, EV chargers, tune-ups, and weatherization programs.",
      "reasoningNotes": "The original categories were mostly supported but had to be narrowed to residential products and specific battery, window, and EV eligibility."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Anaheim residential energy page includes many home rebates, but no direct upfront battery-storage formula was verified.",
        "sourceUrlsChecked": [
          "http://anaheim.net/936/Energy-Rebates-Incentives"
        ],
        "reasoningNotes": "Target is battery/demand savings; no direct one-time storage rebate formula was found.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1663",
    "opportunityName": "City of Lompoc Utilities - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1663/city-of-lompoc-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.cityoflompoc.com/government/departments/utilities/conservation",
    "applicationUrl": null,
    "administrator": "City of Lompoc Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
        "retrofitTypeId": "leak_detection_system",
        "displayName": "Leak detection system",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "leak detection"
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
          "showerhead"
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
          "irrigation controller"
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
        "counties": [
          "Santa Barbara County"
        ],
        "cities": [
          "Lompoc"
        ],
        "utilityTerritories": [
          "City of Lompoc Utilities"
        ],
        "notes": "Applies to City of Lompoc residential utility customers and homes in the utility service area."
      },
      "eligibleApplicantTypes": [
        "residential_utility_customer",
        "homeowner",
        "renter_with_owner_approval",
        "mobile_home_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_hvac_rebate",
        "smart_thermostat_zoning_retrofit",
        "residential_clothes_washer",
        "residential_dishwasher",
        "residential_refrigerator_replacement",
        "residential_freezer_replacement",
        "residential_refrigerator_freezer_recycling",
        "variable_speed_pool_pump",
        "residential_led_lighting",
        "ceiling_fan_replacement",
        "smart_power_strip",
        "high_efficiency_toilet_urinal",
        "smart_irrigation_controller",
        "leak_detection_and_repair",
        "rain_barrel",
        "landscape_turf_replacement",
        "low_flow_fixture_retrofit"
      ],
      "hardRequirements": [
        "Must be a City of Lompoc residential utility account holder or otherwise meet program account rules.",
        "Qualifying products must meet ENERGY STAR, WaterSense, or city specifications where applicable."
      ],
      "blockers": [
        "Residential dishwasher is not a commercial dishwasher retrofit.",
        "Residential refrigerators and freezers are not commercial refrigeration equipment.",
        "Leak detection refers to water leak detection and repair, not broad building analytics."
      ],
      "programType": "Rebate Program",
      "administrator": "City of Lompoc Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.cityoflompoc.com/government/departments/utilities/conservation",
      "sourceUrlsChecked": [
        "https://www.cityoflompoc.com/government/departments/utilities/conservation",
        "https://www.cityoflompoc.com/how-do-i/learn-about-conservation-programs",
        "https://directefficiency.com/lompoc-rebates/"
      ],
      "evidenceText": "City]( conservation pages list residential ENERGY STAR and WaterSense appliance, HVAC, lighting, water fixture, irrigation, leak, rain barrel, and landscape rebates.",
      "reasoningNotes": "Kept only residential product-specific measures and water-conservation items. Removed commercial kitchen, commercial refrigeration, and overbroad leak or plumbing interpretations."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Current Lompoc residential rebate amounts for the broad whole-building target were not verified.",
        "sourceUrlsChecked": [
          "https://www.cityoflompoc.com/utilities/conservation/",
          "https://programs.dsireusa.org/system/program/detail/1663"
        ],
        "reasoningNotes": "No safe per-kWh or specific measure rule was found from official current text.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5128",
    "opportunityName": "San Isabel Electric Association - Residential Energy Efficiency Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5128/san-isabel-electric-association-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://siea.com/rebates/",
    "applicationUrl": null,
    "administrator": "San Isabel Electric Association",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "fast charger"
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
          "CO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "San Isabel Electric Association"
        ],
        "notes": "Available to San Isabel Electric Association members where SIEA is the electric utility."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "commercial_member",
        "business_member"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "residential_clothes_dryer",
        "residential_heat_pump_clothes_dryer",
        "residential_refrigerator_freezer_recycling",
        "residential_induction_cooking",
        "smart_thermostat_zoning_retrofit",
        "whole_house_fan",
        "evaporative_cooler",
        "heat_pump_water_heater",
        "electric_water_heater",
        "electric_thermal_storage_heating",
        "heat_pump_hvac_retrofit",
        "air_to_water_heat_pump",
        "ground_source_geothermal_heat_pump",
        "cellular_shades",
        "insulation_upgrade",
        "residential_outdoor_power_equipment_electrification",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "San Isabel Electric must be the electric utility at the installation site.",
        "Rebate applications must generally be submitted within 90 days with receipts and required documentation."
      ],
      "blockers": [
        "Commercial DC fast charging and commercial LED rebates are separate from residential rebates and should not be matched to this residential record.",
        "No current residential dishwasher rebate was verified in the checked 2026 brochure.",
        "Refrigerator/freezer support is recycling, not broad refrigeration equipment."
      ],
      "programType": "Rebate Program",
      "administrator": "San Isabel Electric Association",
      "applicationUrl": null,
      "websiteUrl": "https://siea.com/rebates/",
      "sourceUrlsChecked": [
        "https://siea.com/rebates/",
        "https://siea.com/empower/",
        "https://siea.com/wp-content/uploads/2026/06/Rebates-Brochure-2026-with-EVCHP-compressed.pdf"
      ],
      "evidenceText": "SIEA's]( 2026 brochure lists residential electric appliances, recycling, thermostats, fans, cooling, water heating, heat pumps, insulation, shades, outdoor equipment, and Level 2 EV charging.",
      "reasoningNotes": "Kept current residential categories from the SIEA 2026 brochure and separated commercial EV charging and commercial LED programs."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "San Isabel rebate sources indicate EV charger incentives exist, but exact current official Level 2/DCFC values were not verified.",
        "sourceUrlsChecked": [
          "https://siea.com/empowereveducation/",
          "https://afdc.energy.gov/laws/utilities/26"
        ],
        "reasoningNotes": "Primary model is fleet fuel replacement/EV charging. Later pass should use the current SIEA rebate application.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2399",
    "opportunityName": "Sangre De Cristo Electric Association - Energy Efficiency Credit Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2399/sangre-de-cristo-electric-association-energy-efficiency-credit-program",
    "websiteUrl": "https://www.myelectric.coop/energy-efficiency/energy-efficiency-credit-programs/",
    "applicationUrl": null,
    "administrator": "Sangre de Cristo Electric Association",
    "programType": "Energy Efficiency Credit Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 11,
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
          "CO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Sangre de Cristo Electric Association"
        ],
        "notes": "Limited to SDCEA members in the cooperative service area."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "member_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "electric_water_heater",
        "residential_heat_pump_clothes_dryer",
        "residential_induction_cooking",
        "smart_thermostat_demand_response",
        "level_2_ev_charger_installation",
        "energy_star_room_air_conditioner",
        "whole_house_fan",
        "air_sealing_weatherization",
        "insulation_upgrade"
      ],
      "hardRequirements": [
        "Applicant must be an SDCEA member.",
        "Measure must be installed in SDCEA service territory.",
        "Rebate requests must meet SDCEA current program deadlines and documentation rules.",
        "Some demand-response and managed charging incentives require enrollment or device control participation."
      ],
      "blockers": [
        "Direct official pages were partially access-restricted, so unsupported legacy categories should not be retained.",
        "Do not match LED lighting, commercial refrigeration, or commercial kitchen equipment.",
        "Residential induction cooktops are not commercial foodservice equipment.",
        "Do not broaden whole-house fan or room air conditioner support into all HVAC replacement."
      ],
      "programType": "Energy Efficiency Credit Program",
      "administrator": "Sangre de Cristo Electric Association",
      "applicationUrl": null,
      "websiteUrl": "https://www.myelectric.coop/energy-efficiency/energy-efficiency-credit-programs/",
      "sourceUrlsChecked": [
        "https://www.myelectric.coop/energy-efficiency/energy-efficiency-credit-programs/",
        "https://www.myelectric.coop/energy-efficiency/energy-efficiency-credit-programs/heat-pump-rebates/",
        "https://www.myelectric.coop/energy-efficiency/energy-efficiency-credit-programs/electric-hot-water-rebate/",
        "https://www.myelectric.coop/energy-efficiency/energy-efficiency-credit-programs/smart-thermostat-rebates/",
        "https://www.myelectric.coop/energy-efficiency/energy-efficiency-credit-programs/electric-vehicle-charging-equipment-rebates/",
        "https://www.myelectric.coop/energy-efficiency/energy-efficiency-credit-programs/weatherization-rebates/"
      ],
      "evidenceText": "Official SDCEA result text identifies rebates for heat pumps, electric hot water, smart thermostats, EV charging equipment, weatherization, room air conditioners, and whole-house fans.",
      "reasoningNotes": "Current official snippets support more categories than the prior low-confidence repair, but direct pages remained partly blocked. Confidence rises to medium with conservative residential-only categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Sangre de Cristo offers many bill-credit/rebate categories, but no refrigeration-specific amount was verified.",
        "sourceUrlsChecked": [
          "https://www.myelectric.coop/energy-efficiency/energy-efficiency-credit-programs/"
        ],
        "reasoningNotes": "Target maps to refrigeration despite broad residential matched terms; a specific current form is needed.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5738",
    "opportunityName": "(Electric and Gas) Residential Rebate Program",
    "state": "CT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5738/electric-and-gas-residential-rebate-program",
    "websiteUrl": "https://www.energizect.com/rebates-and-incentives",
    "applicationUrl": null,
    "administrator": "Energize Connecticut / participating Connecticut utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 11,
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
          "condensing water heater"
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Eversource electric service territory in Connecticut",
          "United Illuminating electric service territory",
          "Connecticut Natural Gas service territory where applicable",
          "Southern Connecticut Gas service territory where applicable",
          "Yankee Gas or Eversource Gas service territory where applicable",
          "Participating EnergizeCT utility territories"
        ],
        "notes": "Electric heat pump, HPWH, envelope, and thermostat sources were current and accessible. Current public gas boiler/furnace/gas-water-heater sources were not reliably accessible; stale 2024 gas forms should not be used as final authority."
      },
      "eligibleApplicantTypes": [
        "residential utility customers",
        "homeowners",
        "income-eligible residential customers",
        "eligible renters with owner authorization where required",
        "eligible 2-4 unit residential multifamily customers",
        "participating contractors where required"
      ],
      "eligibleSectors": [
        "residential",
        "income-eligible residential",
        "small multifamily residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "window_replacement"
      ],
      "hardRequirements": [
        "Customer must be served by a participating Connecticut utility and meet the measure-specific customer eligibility rules.",
        "Heat pump incentives require qualifying equipment, HPIN participating contractor installation where applicable, HPQPL/AHRI/ENERGY STAR or equivalent requirements, current installation dates, and postmark deadlines.",
        "Heat pump optimization or fuel-conversion incentives require displacement of eligible existing heating fuels and integrated controls where existing fossil heating equipment remains.",
        "Heat pump water heaters must be ENERGY STAR qualified, meet installation and quantity limits, and follow current rebate or instant-discount rules.",
        "Insulation incentives require Home Energy Solutions participation and CTIIN-approved installer requirements where stated.",
        "Triple-pane window incentives require ENERGY STAR replacement windows meeting listed U-factor or grid-adjusted U-factor requirements and eligible existing window conditions.",
        "Income-eligible enhanced rebates require income verification or program pathway eligibility."
      ],
      "blockers": [
        "high_efficiency_furnace_retrofit, high_efficiency_boiler_retrofit, and high_efficiency_gas_water_heater should not be matched from stale DSIRE or old forms because current official public gas pages were inaccessible or redirected to login and only stale gas documents were found.",
        "high_efficiency_hvac_replacement is too broad; current accessible sources support heat pump-specific HVAC measures rather than all high-efficiency HVAC replacement.",
        "led_lighting_retrofit is not supported for this residential rebate record by the current official sources reviewed.",
        "window_replacement is limited to qualifying ENERGY STAR triple-pane replacement windows and should not match generic window replacement.",
        "insulation_upgrade requires Home Energy Solutions and approved installer conditions; do not match standalone self-installed insulation.",
        "Do not infer gas equipment availability from stale 2024 forms or third-party snippets."
      ],
      "programType": "Rebate Program",
      "administrator": "Energize Connecticut / participating Connecticut utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.energizect.com/rebates-and-incentives",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/5738/electric-and-gas-residential-rebate-program",
        "https://energizect.com/your-home/rebates-and-incentives",
        "https://www.energizect.com/rebates-and-incentives",
        "https://www.energizect.com/rebates-incentives/heating-cooling/heat-pumps/residential-energy-optimization",
        "https://www.energizect.com/rebates-incentives/heating-cooling/heat-pumps/residential-air-source",
        "https://www.energizect.com/rebates-incentives/residential-water-heater/heat-pump",
        "https://www.energizect.com/media/12241/download?inline=",
        "https://www.energizect.com/media/12236/download?inline=",
        "https://www.energizect.com/media/18111/download?inline=",
        "https://www.energizect.com/media/10256/download?inline=",
        "https://www.energizect.com/media/15366/download?inline=",
        "https://www.energizect.com/rebates-incentives/heating-cooling/natural-gas-furnace-residential"
      ],
      "evidenceText": "Current EnergizeCT sources support residential heat pump optimization, residential air-source heat pumps, ground-source heat pumps, ENERGY STAR Wi-Fi thermostats, ENERGY STAR heat pump water heaters, insulation through Home Energy Solutions, and ENERGY STAR triple-pane replacement windows. Current public gas furnace, boiler, and gas water heater pages were inaccessible or redirected, and only stale gas forms were found.",
      "reasoningNotes": "The program is active, but gas HVAC and gas water-heating matches are blocked because current official public sources could not be accessed. The repair keeps only categories supported by current accessible EnergizeCT sources."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "EnergizeCT rebate listing returned inaccessible or dynamic content for measure-level values.",
        "sourceUrlsChecked": [
          "https://energizect.com/your-home/rebates-and-incentives"
        ],
        "reasoningNotes": "Do not rely on DSIRE alone for a broad whole-building target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2453",
    "opportunityName": "Kootenai Electric Cooperative - Residential Efficiency Rebate Program",
    "state": "ID",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2453/kootenai-electric-cooperative-residential-efficiency-rebate-program",
    "websiteUrl": "https://www.directefficiency.com/kec-residential-rebates/",
    "applicationUrl": null,
    "administrator": "Kootenai Electric Cooperative / Direct Efficiency",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "exterior door"
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
          "ID"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Kootenai Electric Cooperative service territory"
        ],
        "notes": "Direct Efficiency rebates apply to eligible Kootenai Electric Cooperative residential members and service locations."
      },
      "eligibleApplicantTypes": [
        "residential_cooperative_members",
        "residential_electric_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "window_replacement",
        "exterior_door_replacement",
        "insulation_upgrade",
        "residential_clothes_washer",
        "residential_clothes_dryer",
        "heat_pump_water_heater",
        "ductless_mini_split_heat_pump",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "smart_thermostat_zoning_retrofit",
        "line_voltage_thermostat",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a Kootenai Electric Cooperative residential member.",
        "Applications generally must be submitted within 90 days of purchase or installation.",
        "Many weatherization measures require electric primary heat and existing-home eligibility.",
        "Heat pump measures require qualified equipment and contractor or certification documentation."
      ],
      "blockers": [
        "Furnace references should not be matched to standalone high-efficiency furnace replacement; supported HVAC categories are heat-pump-based or thermostat measures.",
        "The EV incentive is Level 2 charger-specific and should not be generalized to DC fast charging.",
        "Commercial Direct Efficiency rebates are separate and should not be inferred for this residential record.",
        "Weatherization requirements can exclude non-electric-heated homes or new construction for some measures."
      ],
      "programType": "Rebate Program",
      "administrator": "Kootenai Electric Cooperative / Direct Efficiency",
      "applicationUrl": null,
      "websiteUrl": "https://www.directefficiency.com/kec-residential-rebates/",
      "sourceUrlsChecked": [
        "https://www.directefficiency.com/kec-residential-rebates/"
      ],
      "evidenceText": "The KEC residential rebate page lists windows, doors, insulation, washers and dryers, heat pump water heaters, heat pumps, thermostats, geothermal, and Level 2 EV chargers.",
      "reasoningNotes": "Preserve product-specific residential envelope, appliance, heat-pump, thermostat, and Level 2 EV matches; block standalone furnace and commercial measure inference."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Kootenai/Direct Efficiency page lists categories but did not expose exact current EV charger or heat-pump amounts in accessible source text.",
        "sourceUrlsChecked": [
          "https://www.directefficiency.com/kec-residential-rebates/",
          "https://programs.dsireusa.org/system/program/detail/2453"
        ],
        "reasoningNotes": "No source-backed value was selected for the Level 2 charging target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5782",
    "opportunityName": "Cape Light Compact- Residential Energy Efficiency Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5782/cape-light-compact-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.capelightcompact.org/residential/residential-rebates-and-incentives/",
    "applicationUrl": null,
    "administrator": "Cape Light Compact",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
        "retrofitTypeId": "high_efficiency_boiler_retrofit",
        "displayName": "High-efficiency boiler retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "boiler",
          "condensing boiler"
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
          "MA"
        ],
        "counties": [
          "Barnstable County",
          "Dukes County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Cape Light Compact"
        ],
        "notes": "Cape Light Compact territory covering Cape Cod and Martha's Vineyard; measure eligibility can vary by homeowner and income pathway."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_owner_approval",
        "income_qualified_customer"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "window_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "air_to_water_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "residential_refrigerator_recycling",
        "residential_clothes_washer",
        "residential_clothes_dryer",
        "residential_heat_pump_clothes_dryer",
        "residential_window_room_air_conditioner",
        "residential_dehumidifier_recycling",
        "residential_induction_cooking"
      ],
      "hardRequirements": [
        "Must be a Cape Light Compact residential customer or eligible homeowner in the service territory.",
        "Weatherization and heat pump incentives follow Mass Save and Cape Light installation and income-pathway rules."
      ],
      "blockers": [
        "Residential induction stoves are not commercial induction cooking equipment.",
        "Refrigerator and freezer items are residential appliance rebates or recycling, not commercial refrigeration equipment.",
        "Boiler and furnace rebates were not supported on current pages checked."
      ],
      "programType": "Rebate Program",
      "administrator": "Cape Light Compact",
      "applicationUrl": null,
      "websiteUrl": "https://www.capelightcompact.org/residential/residential-rebates-and-incentives/",
      "sourceUrlsChecked": [
        "https://www.capelightcompact.org/incentives-rebates-market-rate-homeowner/",
        "https://www.capelightcompact.org/residential/residential-rebates-and-incentives/"
      ],
      "evidenceText": "Current]( Cape Light pages list residential assessments, weatherization, windows, heat pumps, heat pump water heaters, smart thermostats, and residential appliance or induction rebates.",
      "reasoningNotes": "Retained residential envelope, heat pump, water heating, thermostat, and product-specific appliance categories; removed commercial kitchen, commercial refrigeration, and unsupported fossil HVAC matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Cape Light Compact residential rebate page lists multiple measure categories without a single whole-building formula.",
        "sourceUrlsChecked": [
          "https://www.capelightcompact.org/home-energy-assessments/resrebates/"
        ],
        "reasoningNotes": "Target is whole-building custom efficiency; measure-specific values require narrower scope.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2538",
    "opportunityName": "Fairmont Public Utilities - Commercial & Industrial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2538/fairmont-public-utilities-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/fairmont",
    "applicationUrl": null,
    "administrator": "Fairmont Public Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 11,
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "high_efficiency_motor_replacement",
        "displayName": "High-efficiency motor replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "motor replacement"
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
          "low flow"
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
          "vending machine controls",
          "floating head pressure"
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [
          "Martin"
        ],
        "cities": [
          "Fairmont"
        ],
        "utilityTerritories": [
          "Fairmont Public Utilities electric service territory",
          "SMMPA/Bright Energy Solutions participating utility territory for Fairmont customers"
        ],
        "notes": "Eligibility is limited to Fairmont Public Utilities commercial and industrial customers using current local or SMMPA business rebate materials."
      },
      "eligibleApplicantTypes": [
        "business electric customers",
        "commercial customers",
        "industrial customers",
        "institutional customers",
        "agricultural customers where applicable",
        "participating contractors or vendors where required"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "agricultural",
        "food service",
        "refrigeration and grocery",
        "manufacturing",
        "compressed air"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_refrigeration_equipment",
        "walk_in_cooler_freezer_upgrade",
        "refrigeration_controls_retrofit",
        "anti_sweat_heater_controls",
        "energy_management_system",
        "high_efficiency_motor_replacement",
        "efficient_air_compressor",
        "compressed_air_leak_repair"
      ],
      "hardRequirements": [
        "Customer must be served by Fairmont Public Utilities.",
        "Projects must follow current Fairmont, SMMPA, or Bright Energy Solutions business rebate procedures.",
        "Equipment must meet current measure-specific efficiency and documentation requirements.",
        "Custom or large projects may require utility review, savings documentation, and pre-approval.",
        "Applications require invoices, product specifications, and account information."
      ],
      "blockers": [
        "low_flow_fixture_retrofit is not supported by the current C&I source reviewed and should be removed.",
        "Do not infer residential appliance rebates from this commercial and industrial record.",
        "Refrigeration controls, anti-sweat heater controls, and floating-head-pressure measures must be limited to listed refrigeration equipment or controls.",
        "Energy management system matches require a listed measure or approved custom project; do not auto-match all BAS work.",
        "Detailed current technical forms were not fully accessible, so exact submeasure specifications should be verified before quoting amounts."
      ],
      "programType": "Rebate Program",
      "administrator": "Fairmont Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/fairmont",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/2538/fairmont-public-utilities-commercial-and-industrial-energy-efficiency-rebate-program",
        "http://www.SaveEnergyInFairmont.com",
        "https://smmpa.com/members/fairmont",
        "https://fairmont.org/public-utilities/",
        "https://www.brightenergysolutions.com/"
      ],
      "evidenceText": "Current SMMPA Fairmont materials show residential and business rebate resources for 2026. Fairmont Public Utilities participates in SMMPA/Bright Energy Solutions-style rebates for qualifying commercial clients, supporting business equipment efficiency categories such as lighting, HVAC, refrigeration, motors, compressed air, and custom efficiency.",
      "reasoningNotes": "The repair follows the same current SMMPA municipal C&I program structure as the other Minnesota municipal utility records and removes the unsupported low-flow fixture match."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Fairmont/Bright Energy Solutions C&I rebates include many refrigeration, motor and custom measures, but no single per-kWh formula was verified.",
        "sourceUrlsChecked": [
          "https://smmpa.com/members/fairmont",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "Target is broad C&I whole-building efficiency; current measure form extraction is needed.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2540",
    "opportunityName": "Grand Marais PUC - Commercial & Industrial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2540/grand-marais-puc-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "http://www.SaveEnergyInGrandMarais.com",
    "applicationUrl": null,
    "administrator": "Grand Marais Public Utilities Commission",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 11,
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
        "retrofitTypeId": "high_efficiency_motor_replacement",
        "displayName": "High-efficiency motor replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "motor replacement"
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
          "low flow"
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
          "vending machine controls",
          "floating head pressure"
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [
          "Cook"
        ],
        "cities": [
          "Grand Marais"
        ],
        "utilityTerritories": [
          "Grand Marais Public Utilities Commission electric service territory",
          "SMMPA/Bright Energy Solutions participating utility territory for Grand Marais customers"
        ],
        "notes": "Eligibility is for Grand Marais PUC commercial and industrial electric customers using the current SMMPA or local SaveEnergyInGrandMarais rebate materials."
      },
      "eligibleApplicantTypes": [
        "business electric customers",
        "commercial customers",
        "industrial customers",
        "institutional customers",
        "agricultural customers where applicable",
        "participating contractors or vendors where required"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "agricultural",
        "food service",
        "refrigeration and grocery",
        "manufacturing",
        "compressed air"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_refrigeration_equipment",
        "walk_in_cooler_freezer_upgrade",
        "refrigeration_controls_retrofit",
        "anti_sweat_heater_controls",
        "energy_management_system",
        "high_efficiency_motor_replacement",
        "efficient_air_compressor",
        "compressed_air_leak_repair"
      ],
      "hardRequirements": [
        "Customer must be served by Grand Marais Public Utilities Commission.",
        "Projects must use the current local or SMMPA business rebate process.",
        "Equipment must meet measure-specific efficiency, installation, and documentation requirements.",
        "Custom or larger projects may require pre-approval and savings review.",
        "Invoices, product specifications, and utility-account documentation are required before payment."
      ],
      "blockers": [
        "low_flow_fixture_retrofit is not supported by the current C&I source reviewed and should be removed.",
        "Do not infer residential rebate categories from this commercial and industrial record.",
        "Refrigeration, motors, and compressed-air measures are equipment-specific; do not match general industrial construction.",
        "Energy management system matches should be limited to listed control measures or custom projects accepted by the utility.",
        "Detailed linked forms were not fully accessible in this environment, so measure amounts and exact submeasure rules should be verified before quoting."
      ],
      "programType": "Rebate Program",
      "administrator": "Grand Marais Public Utilities Commission",
      "applicationUrl": null,
      "websiteUrl": "http://www.SaveEnergyInGrandMarais.com",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/2540/grand-marais-puc-commercial-and-industrial-energy-efficiency-rebate-program",
        "http://www.SaveEnergyInGrandMarais.com",
        "https://www.brightenergysolutions.com/",
        "https://smmpa.com/members"
      ],
      "evidenceText": "Current SaveEnergyInGrandMarais materials show local Grand Marais utility rebate resources and 2026 forms. The municipal Bright Energy/SMMPA business rebate family supports lighting, HVAC, refrigeration, motors, compressed air, and custom efficiency categories; low-flow water fixtures were not verified for the C&I pathway.",
      "reasoningNotes": "The repair mirrors the current SMMPA municipal C&I rebate structure while blocking the low-flow false positive and limiting custom matches to utility-reviewed projects."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "SMMPA/Bright Energy page exposes forms and contact paths, but no single C&I per-kWh or refrigeration formula was verified.",
        "sourceUrlsChecked": [
          "http://www.SaveEnergyInGrandMarais.com",
          "https://smmpa.com/members/grand-marais"
        ],
        "reasoningNotes": "Target spans many custom C&I measures; later pass should extract a specific current rebate form.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2545",
    "opportunityName": "Litchfield Public Utilities - Commercial & Industrial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2545/litchfield-public-utilities-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/litchfield",
    "applicationUrl": null,
    "administrator": "Litchfield Public Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 11,
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "high_efficiency_motor_replacement",
        "displayName": "High-efficiency motor replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "motor replacement"
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
          "low flow"
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
          "vending machine controls",
          "floating head pressure"
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [
          "Meeker"
        ],
        "cities": [
          "Litchfield"
        ],
        "utilityTerritories": [
          "Litchfield Public Utilities electric service territory",
          "SMMPA/Bright Energy Solutions participating utility territory for Litchfield customers"
        ],
        "notes": "Eligibility is limited to Litchfield Public Utilities customers and the current local/SMMPA rebate process."
      },
      "eligibleApplicantTypes": [
        "business electric customers",
        "commercial customers",
        "industrial customers",
        "institutional customers",
        "agricultural customers where a business measure applies",
        "participating contractors or vendors where required"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "agricultural",
        "food service",
        "refrigeration and grocery",
        "manufacturing",
        "compressed air"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_refrigeration_equipment",
        "walk_in_cooler_freezer_upgrade",
        "refrigeration_controls_retrofit",
        "anti_sweat_heater_controls",
        "energy_management_system",
        "high_efficiency_motor_replacement",
        "efficient_air_compressor",
        "compressed_air_leak_repair"
      ],
      "hardRequirements": [
        "Customer must be served by Litchfield Public Utilities.",
        "Projects must use current Litchfield, SMMPA, or Bright Energy Solutions business rebate materials.",
        "Equipment must meet current measure-specific efficiency, sizing, installation, and documentation requirements.",
        "Custom or larger projects may require utility review, savings estimates, and pre-approval before purchase or installation.",
        "Invoices, product specifications, and account documentation are required before rebate payment."
      ],
      "blockers": [
        "low_flow_fixture_retrofit is not supported by the current C&I sources reviewed and should be removed.",
        "Do not infer residential Litchfield rebates from this commercial and industrial record.",
        "Energy management should be limited to listed controls or approved custom projects, not generic building automation claims.",
        "Refrigeration and compressed-air matches are product-specific and should not be generalized into all cold-storage construction or all industrial process work.",
        "Detailed current technical forms were not fully exposed in accessible text, so exact amounts and submeasure limits should be confirmed before quoting incentive values."
      ],
      "programType": "Rebate Program",
      "administrator": "Litchfield Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/litchfield",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/2545/litchfield-public-utilities-commercial-and-industrial-energy-efficiency-rebate-program",
        "http://www.SaveEnergyInLitchfield.com",
        "https://smmpa.com/members/litchfield",
        "https://www.brightenergysolutions.com/"
      ],
      "evidenceText": "Current Litchfield/SMMPA materials identify Litchfield Public Utilities as an SMMPA member with business rebate resources. SMMPA examples and Bright Energy Solutions municipal business rebate families support prescriptive and custom business measures including lighting, HVAC, refrigeration, motors, compressed air, and related efficiency projects; low-flow water fixtures were not verified for the C&I pathway.",
      "reasoningNotes": "The record remains active through current SMMPA/Bright Energy municipal utility sources. Confidence is medium because the public member page confirms the program family and current forms but not every detailed submeasure in accessible text."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "SMMPA/Bright Energy page exposes forms and contact paths, but no single C&I per-kWh or refrigeration formula was verified.",
        "sourceUrlsChecked": [
          "http://www.SaveEnergyInLitchfield.com",
          "https://smmpa.com/members/litchfield"
        ],
        "reasoningNotes": "Target spans many custom C&I measures; later pass should extract a specific current rebate form.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2546",
    "opportunityName": "Mora Municipal Utilities - Commercial & Industrial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2546/mora-municipal-utilities-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ci.mora.mn.us/electric-utility/pages/rebates-energy-efficiency",
    "applicationUrl": null,
    "administrator": "Mora Municipal Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 11,
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "high_efficiency_motor_replacement",
        "displayName": "High-efficiency motor replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "motor replacement"
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
          "low flow"
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
          "vending machine controls",
          "floating head pressure"
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [
          "Kanabec"
        ],
        "cities": [
          "Mora"
        ],
        "utilityTerritories": [
          "Mora Municipal Utilities electric service territory",
          "SMMPA/Bright Energy Solutions participating utility territory for Mora customers"
        ],
        "notes": "Eligibility is for Mora Municipal Utilities customers. The City of Mora page directs customers to current rebate and energy-efficiency programs for business and residential customers."
      },
      "eligibleApplicantTypes": [
        "business electric customers",
        "commercial customers",
        "industrial customers",
        "institutional customers",
        "agricultural customers where applicable",
        "participating contractors or vendors where required"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "agricultural",
        "food service",
        "refrigeration and grocery",
        "manufacturing",
        "compressed air"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_refrigeration_equipment",
        "walk_in_cooler_freezer_upgrade",
        "refrigeration_controls_retrofit",
        "anti_sweat_heater_controls",
        "energy_management_system",
        "high_efficiency_motor_replacement",
        "efficient_air_compressor",
        "compressed_air_leak_repair"
      ],
      "hardRequirements": [
        "Customer must be served by Mora Municipal Utilities.",
        "Projects must use the current Mora, SMMPA, or Bright Energy Solutions rebate materials.",
        "Equipment must meet current measure-specific requirements and documentation requirements.",
        "Custom and larger projects may require utility review or pre-approval before installation.",
        "Rebate requests require invoices, specifications, and customer account documentation."
      ],
      "blockers": [
        "low_flow_fixture_retrofit is not verified for the current C&I pathway and should not be matched.",
        "Do not infer residential Mora rebates from this commercial and industrial record.",
        "Anti-sweat heater, floating-head pressure, and refrigeration control matches should be limited to qualifying refrigeration equipment or control measures.",
        "Energy management is not a generic BAS rebate unless the current measure form or custom review supports the project.",
        "Exact current submeasure specifications should be confirmed from the linked forms before quoting amounts."
      ],
      "programType": "Rebate Program",
      "administrator": "Mora Municipal Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.ci.mora.mn.us/electric-utility/pages/rebates-energy-efficiency",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/2546/mora-municipal-utilities-commercial-and-industrial-energy-efficiency-rebate-program",
        "http://www.SaveEnergyInMora.com",
        "https://www.ci.mora.mn.us/electric-utility/pages/rebates-energy-efficiency",
        "https://smmpa.com/members/mora",
        "https://www.brightenergysolutions.com/"
      ],
      "evidenceText": "The current City of Mora utility page points customers to rebate and energy-efficiency programs for business and residential customers. SMMPA Mora materials show 2026 rebate resources and examples of qualifying HVAC projects, while the Bright Energy municipal program family supports business lighting, HVAC, refrigeration, motor, compressed-air, and custom efficiency categories.",
      "reasoningNotes": "The repair keeps the supported municipal business rebate categories and blocks low-flow and overly broad energy-management interpretations."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Mora and Bright Energy Solutions confirm C&I rebate participation, but exact refrigeration/custom values were not verified.",
        "sourceUrlsChecked": [
          "https://www.ci.mora.mn.us/electric-utility/pages/rebates-energy-efficiency",
          "http://www.SaveEnergyInMora.com"
        ],
        "reasoningNotes": "Target includes multiple refrigeration, controls and motor measures; a current form/table should be extracted.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2553",
    "opportunityName": "Preston Public Utilities - Commercial & Industrial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2553/preston-public-utilities-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/preston",
    "applicationUrl": null,
    "administrator": "Preston Public Utilities / Southern Minnesota Municipal Power Agency",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 11,
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "high_efficiency_motor_replacement",
        "displayName": "High-efficiency motor replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "motor replacement"
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
          "low flow"
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
          "vending machine controls",
          "floating head pressure"
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [],
        "cities": [
          "Preston"
        ],
        "utilityTerritories": [
          "Preston Public Utilities electric service territory"
        ],
        "notes": "SaveEnergyInPreston redirects to the SMMPA Preston member page with 2026 residential and business rebate materials."
      },
      "eligibleApplicantTypes": [
        "commercial_customers",
        "industrial_customers",
        "business_customers",
        "manufacturing_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "manufacturing",
        "food_service",
        "hospitality"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "hvac_tuneup",
        "electric_chiller_tuneup",
        "efficient_fan_blower_replacement",
        "variable_frequency_drive_retrofit",
        "high_efficiency_pump_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "water_source_heat_pump",
        "programmable_thermostat",
        "pool_pump_replacement",
        "retrocommissioning",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_retrofit",
        "walk_in_cooler_freezer_upgrade",
        "commercial_kitchen_equipment",
        "vending_machine_controls",
        "guest_room_energy_management",
        "aerosol_duct_sealing",
        "high_efficiency_motor_replacement",
        "compressed_air_leak_repair",
        "efficient_air_compressor",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Customer must be a Preston Public Utilities business customer.",
        "Projects must follow the applicable SMMPA business rebate forms and eligibility rules.",
        "Industrial, custom, compressed-air, and some refrigeration projects may require preapproval or savings documentation."
      ],
      "blockers": [
        "Low-flow fixture rebates were not verified on the current readable official Preston page.",
        "Guestroom energy management should not be generalized to all building energy management systems.",
        "Anti-sweat heater controls and floating head pressure were not specifically readable on current official pages, so do not auto-match them without form verification.",
        "Residential appliance categories should not be inferred for this commercial and industrial record."
      ],
      "programType": "Rebate Program",
      "administrator": "Preston Public Utilities / Southern Minnesota Municipal Power Agency",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/preston",
      "sourceUrlsChecked": [
        "https://www.saveenergyinpreston.com/",
        "https://smmpa.com/members/preston"
      ],
      "evidenceText": "The current SMMPA Preston page lists 2026 business rebates for lighting, HVAC, pumps, drives, refrigeration, food service, compressed air, motors, and custom projects.",
      "reasoningNotes": "Confidence is medium because some detailed form PDFs were not readable, but the current official page verifies the main eligible business categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "SMMPA/Bright Energy page exposes forms and contact paths, but no single C&I per-kWh or refrigeration formula was verified.",
        "sourceUrlsChecked": [
          "http://www.SaveEnergyInPreston.com",
          "https://smmpa.com/members/preston"
        ],
        "reasoningNotes": "Target spans many custom C&I measures; a later pass should extract a specific current rebate form.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2554",
    "opportunityName": "Princeton PUC - Commercial & Industrial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2554/princeton-puc-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/princeton",
    "applicationUrl": null,
    "administrator": "Princeton Public Utilities / Southern Minnesota Municipal Power Agency",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 11,
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
      },
      {
        "retrofitTypeId": "high_efficiency_motor_replacement",
        "displayName": "High-efficiency motor replacement",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "motor replacement"
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
          "low flow"
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
          "vending machine controls",
          "floating head pressure"
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [],
        "cities": [
          "Princeton"
        ],
        "utilityTerritories": [
          "Princeton Public Utilities electric service territory"
        ],
        "notes": "SaveEnergyInPrinceton redirects to the SMMPA Princeton member page with 2026 residential and business rebate materials."
      },
      "eligibleApplicantTypes": [
        "commercial_customers",
        "industrial_customers",
        "business_customers",
        "manufacturing_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "manufacturing",
        "food_service",
        "hospitality"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "hvac_tuneup",
        "electric_chiller_tuneup",
        "efficient_fan_blower_replacement",
        "variable_frequency_drive_retrofit",
        "high_efficiency_pump_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "water_source_heat_pump",
        "programmable_thermostat",
        "pool_pump_replacement",
        "retrocommissioning",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_retrofit",
        "walk_in_cooler_freezer_upgrade",
        "commercial_kitchen_equipment",
        "vending_machine_controls",
        "guest_room_energy_management",
        "aerosol_duct_sealing",
        "high_efficiency_motor_replacement",
        "compressed_air_leak_repair",
        "efficient_air_compressor",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Customer must be a Princeton Public Utilities business customer.",
        "Projects must follow the applicable SMMPA business rebate forms and eligibility rules.",
        "Industrial, custom, compressed-air, and refrigeration measures may require preapproval or savings documentation."
      ],
      "blockers": [
        "Low-flow fixture rebates were not verified on the current readable official Princeton page.",
        "Guestroom energy management should not be generalized to all building energy management systems.",
        "Anti-sweat heater controls and floating head pressure were not specifically readable on current official pages, so do not auto-match them without form verification.",
        "Residential appliance categories should not be inferred for this commercial and industrial record."
      ],
      "programType": "Rebate Program",
      "administrator": "Princeton Public Utilities / Southern Minnesota Municipal Power Agency",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/princeton",
      "sourceUrlsChecked": [
        "https://www.saveenergyinprinceton.com/",
        "https://smmpa.com/members/princeton"
      ],
      "evidenceText": "The current SMMPA Princeton page lists 2026 business rebates for lighting, HVAC, pumps, drives, refrigeration, food service, compressed air, motors, and custom projects.",
      "reasoningNotes": "Confidence is medium because some detailed form PDFs were not readable, while the official page verifies the major business rebate categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official Princeton/SMMPA path was not found with a reusable current formula.",
        "sourceUrlsChecked": [
          "http://www.SaveEnergyInPrinceton.com",
          "https://smmpa.com/members/princeton"
        ],
        "reasoningNotes": "Target spans many custom commercial measures.",
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
