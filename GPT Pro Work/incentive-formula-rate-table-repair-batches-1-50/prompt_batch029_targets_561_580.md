You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 29
Targets in this prompt: 561-580 of 984
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
  "batchNumber": 29,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22560"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2588",
    "opportunityName": "Spring Valley Public Utilities - Commercial & Industrial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2588/spring-valley-public-utilities-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/spring-valley",
    "applicationUrl": null,
    "administrator": "Spring Valley Public Utilities",
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
        "counties": [],
        "cities": [
          "Spring Valley"
        ],
        "utilityTerritories": [
          "Spring Valley Public Utilities"
        ],
        "notes": "Limited to Spring Valley Public Utilities commercial and industrial electric customers using SMMPA rebate programs."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "business_customer",
        "manufacturing_customer",
        "municipal_electric_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "manufacturing",
        "institutional",
        "hospitality"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "commercial_cooling_equipment",
        "hvac_tune_up",
        "electric_chiller_tune_up",
        "furnace_fan_motor_ecm",
        "variable_frequency_drive_retrofit",
        "high_efficiency_fans_and_pumps",
        "air_source_heat_pump",
        "ground_source_geothermal_heat_pump",
        "water_source_heat_pump",
        "heat_pump_programmable_thermostat",
        "pool_pump",
        "retrocommissioning",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_retrofit",
        "walk_in_cooler_freezer_upgrade",
        "high_efficiency_food_service_equipment",
        "vending_machine_controls",
        "guestroom_energy_management_controls",
        "aerosol_duct_sealing",
        "high_efficiency_motor_replacement",
        "efficient_air_compressor",
        "compressed_air_leak_repair",
        "custom_energy_efficiency_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Spring Valley Public Utilities business, commercial, industrial, or municipal electric customer.",
        "Customer must use the applicable current SMMPA rebate forms and measure-specific requirements.",
        "Custom and industrial measures require the applicable program application and savings documentation.",
        "Equipment must meet the qualifying efficiency and installation requirements for its measure category."
      ],
      "blockers": [
        "Anti-sweat heater controls, floating head pressure controls, and pre-rinse spray valve details were not independently verified from the accessible official page.",
        "No broad low-flow fixture retrofit is supported by the accessible current SMMPA business rebate listing.",
        "Residential appliances and home weatherization should not be inferred from this commercial and industrial program.",
        "Foodservice support should remain a qualifying foodservice equipment category unless the current form confirms a specific appliance."
      ],
      "programType": "Rebate Program",
      "administrator": "Spring Valley Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/spring-valley",
      "sourceUrlsChecked": [
        "https://smmpa.com/members/spring-valley",
        "https://www.springvalley-mn.com/index.asp?SEC=A3CEF3D5-749C-4166-97A8-CF5CB6BA2370",
        "https://drive.google.com/file/d/1Rcn8giykQM8JGWLLNxyfmxakwdXa9BBG/view?usp=drive_link",
        "https://drive.google.com/file/d/19XIIjdo9gCXbpmF_vXiLmfnh776pqCHR/view?usp=drive_link",
        "https://drive.google.com/file/d/1cPFo1_TfMrT9pxUiGFKNv3TN6oot5pji/view?usp=drive_link",
        "https://drive.google.com/file/d/1bmGwU6avbn_hulM4YotYe5ocfZPN5gBK/view?usp=drive_link"
      ],
      "evidenceText": "SMMPA’s Spring Valley member page lists business rebates for lighting, HVAC, refrigeration, foodservice, guestroom controls, retrocommissioning, motors, compressed air and custom industrial projects.",
      "reasoningNotes": "The accessible official page supports broad C&I categories, but some detailed legacy refrigeration and low-flow terms require current form confirmation before matching."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "SMMPA member page lists forms and business rebate contact paths, but no C&I measure value table was verified.",
        "sourceUrlsChecked": [
          "https://smmpa.com/members/spring-valley"
        ],
        "reasoningNotes": "A project-specific table is needed.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5183",
    "opportunityName": "Multifamily Home Energy Solutions Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5183/multifamily-home-energy-solutions-program",
    "websiteUrl": "https://insider.energytrust.org/programs/existing-multifamily/",
    "applicationUrl": null,
    "administrator": "Energy Trust of Oregon",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 11,
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
          "laundry"
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
        "retrofitTypeId": "pump_fan_controls_retrofit",
        "displayName": "Pump/fan controls retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "pump controls"
        ]
      },
      {
        "retrofitTypeId": "water_heating_controls_recirculation",
        "displayName": "Water-heating controls / recirculation controls",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "recirculation pump"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "OR",
          "WA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Energy Trust of Oregon participating utility territories",
          "Portland General Electric service territory where applicable",
          "Pacific Power service territory where applicable",
          "NW Natural service territory where applicable",
          "Cascade Natural Gas service territory where applicable",
          "Avista Oregon service territory where applicable",
          "Southwest Washington participating gas territory where applicable"
        ],
        "notes": "Energy Trust multifamily eligibility varies by utility, fuel, building type, measure, and whether the property is small multifamily, large multifamily, common area, campus, or assisted living."
      },
      "eligibleApplicantTypes": [
        "multifamily property owners",
        "multifamily property managers",
        "owners of small multifamily properties",
        "large multifamily owners",
        "assisted living or campus housing operators where eligible",
        "trade ally contractors",
        "renters through property owner or manager participation"
      ],
      "eligibleSectors": [
        "multifamily residential",
        "small multifamily",
        "large multifamily",
        "multifamily common areas",
        "assisted living",
        "campus housing",
        "affordable multifamily housing"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_furnace_retrofit",
        "insulation_upgrade",
        "window_replacement",
        "high_efficiency_gas_water_heater",
        "water_heating_controls_recirculation",
        "demand_controlled_kitchen_ventilation",
        "variable_frequency_drive_retrofit"
      ],
      "hardRequirements": [
        "Project must be in an Energy Trust eligible participating utility service territory.",
        "Eligibility depends on the multifamily pathway: small multifamily measures may route through residential programs while large multifamily, common-area, campus, and assisted-living measures may route through Existing Buildings.",
        "Gas measures require eligible gas service and qualifying equipment or systems.",
        "Windows are limited to the territories and building types where current Energy Trust materials support them.",
        "Commercial vent hood, pump VFD, pipe insulation, commercial heat pump, and related common-area or Existing Buildings measures require current measure-specific documentation.",
        "Current 2026 incentive updates should be used instead of stale DSIRE or older measure lists."
      ],
      "blockers": [
        "Do not rely on old DSIRE or older Energy Trust snippets for refrigerators, dishwashers, laundry equipment, or broad appliance rebates unless a current 2026 Energy Trust multifamily source confirms them.",
        "high_efficiency_boiler_retrofit was not verified from the current 2026 multifamily sources reviewed and should not be auto-matched.",
        "Window incentives are geography- and pathway-specific and should not be generalized to all Oregon multifamily properties.",
        "Demand-controlled kitchen ventilation is a commercial vent hood measure and should not be matched as general ventilation.",
        "Lighting, pump VFD, and other common-area measures may route through Existing Buildings rather than a standalone multifamily page; match only when property and utility pathway are eligible.",
        "Main energytrust.org pages may be hard to access in this environment; current Energy Trust Insider and blog pages were used as official replacement/current sources."
      ],
      "programType": "Rebate Program",
      "administrator": "Energy Trust of Oregon",
      "applicationUrl": null,
      "websiteUrl": "https://insider.energytrust.org/programs/existing-multifamily/",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/5183/multifamily-home-energy-solutions-program",
        "http://www.energytrust.org/programs/multifamily/",
        "https://insider.energytrust.org/programs/existing-multifamily/",
        "https://blog.energytrust.org/2026-multifamily-incentive-updates/",
        "https://insider.energytrust.org/existing-multifamily-incentive-changes-coming-january-1-2026-2/",
        "https://insider.energytrust.org/updated-existing-buildings-incentive-go-into-effect-january-1-2026/"
      ],
      "evidenceText": "Current Energy Trust official 2026 update sources describe multifamily and Existing Buildings pathways, including small multifamily routing, ductless and ducted heat pumps, smart thermostats, gas furnaces, insulation, gas tankless water heaters, windows in specified Washington contexts, commercial heat pumps, pump VFDs, pipe insulation, and commercial vent hood demand-controlled kitchen ventilation.",
      "reasoningNotes": "Confidence is medium because the current official Energy Trust sources reviewed were update pages rather than a single complete application table. The repair keeps currently supported multifamily/common-area measures and blocks stale appliance and boiler matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Energy Trust 2026 multifamily update lists ducted heat pumps, but this target's queued terms did not include heat-pump scope.",
        "sourceUrlsChecked": [
          "https://blog.energytrust.org/2026-multifamily-incentive-updates/",
          "http://www.energytrust.org/programs/multifamily/"
        ],
        "reasoningNotes": "Held for manual review instead of importing an unrelated ducted heat pump rule against lighting, boiler, refrigeration, insulation, fixture and pump terms.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4133",
    "opportunityName": "FirstEnergy (MetEdison, Penelec, Penn Power, West Penn Power)  - Residential Energy Efficiency Programs",
    "state": "PA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4133/firstenergy-metedison-penelec-penn-power-west-penn-power-residential-energy-efficiency-programs",
    "websiteUrl": "https://www.firstenergycorp.com/save_energy/save_energy_pennsylvania/for_your_home_pa.html",
    "applicationUrl": null,
    "administrator": "FirstEnergy Pennsylvania utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 11,
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
          "PA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Met-Ed",
          "Penelec",
          "Penn Power",
          "West Penn Power"
        ],
        "notes": "Limited to Pennsylvania FirstEnergy residential customers in the listed electric utility territories."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "income_qualified_residential_customer"
      ],
      "eligibleSectors": [
        "residential",
        "low_income_residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "home_energy_analyzer",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "residential_refrigerator_freezer_replacement",
        "residential_window_wall_air_conditioner",
        "residential_led_lighting",
        "appliance_recycling",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Must be served by a FirstEnergy Pennsylvania electric utility.",
        "Income-qualified WARM measures require income and usage eligibility."
      ],
      "blockers": [
        "Residential appliance measures are not commercial dishwashers, commercial refrigeration, or commercial laundry equipment.",
        "Home Energy Analyzer and audits are planning tools, not physical retrofits.",
        "Business Energy Solutions is a separate commercial program."
      ],
      "programType": "Rebate Program",
      "administrator": "FirstEnergy Pennsylvania utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.firstenergycorp.com/save_energy/save_energy_pennsylvania/for_your_home_pa.html",
      "sourceUrlsChecked": [
        "https://www.firstenergycorp.com/save_energy/save_energy_pennsylvania.html",
        "https://www.firstenergycorp.com/save_energy/save_energy_pennsylvania/for_your_home_pa/warm-info.html"
      ],
      "evidenceText": "FirstEnergy]( Pennsylvania pages list home appliance rebates, recycling, HVAC rebates, home energy analyzer, residential audits, new homes, and WARM no-cost improvements.",
      "reasoningNotes": "Official pages support residential and low-income measures; commercial and product-specific false positives were separated."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "FirstEnergy Pennsylvania page is broad and did not expose a whole-building per-kWh formula for the matched target.",
        "sourceUrlsChecked": [
          "https://www.firstenergycorp.com/save_energy/save_energy_pennsylvania/for_your_home_pa.html"
        ],
        "reasoningNotes": "Measure-specific appliance/HVAC rebates should be selected only with exact source table values.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4810",
    "opportunityName": "Dominion Energy - Commercial EnergyWise Program",
    "state": "SC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4810/dominion-energy-commercial-energywise-program",
    "websiteUrl": "https://www.dominionenergy.com/south-carolina/save-energy?tab=2",
    "applicationUrl": null,
    "administrator": "Dominion Energy South Carolina",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
          "SC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Dominion Energy South Carolina service territory"
        ],
        "notes": "Business incentives are available to qualifying Dominion Energy South Carolina commercial and industrial customers."
      },
      "eligibleApplicantTypes": [
        "commercial_customers",
        "industrial_customers",
        "small_business_customers",
        "agricultural_customers",
        "institutional_customers",
        "municipal_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional",
        "municipal",
        "education",
        "healthcare",
        "hospitality",
        "restaurant",
        "grocery"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "advanced_lighting_controls",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_gas_water_heater",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "commercial_kitchen_equipment",
        "high_efficiency_refrigeration_equipment",
        "energy_management_system",
        "variable_frequency_drive_retrofit",
        "high_efficiency_motor_replacement",
        "compressed_air_system_efficiency",
        "window_film_shading_retrofit",
        "cool_roof_reflective_roof",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Customer must be in Dominion Energy South Carolina territory.",
        "Measures must meet the relevant EnergyWise business program requirements.",
        "Some incentives require preapproval, project completion deadlines, or custom calculations."
      ],
      "blockers": [
        "Window film and cool roof incentives do not support window replacement.",
        "Food-service incentives are commercial equipment measures, not low-flow plumbing fixtures.",
        "Solar and EV charging are separate offerings, not Commercial EnergyWise efficiency rebate categories.",
        "Residential appliance and home weatherization matches should be blocked."
      ],
      "programType": "Rebate Program",
      "administrator": "Dominion Energy South Carolina",
      "applicationUrl": null,
      "websiteUrl": "https://www.dominionenergy.com/south-carolina/save-energy?tab=2",
      "sourceUrlsChecked": [
        "https://www.dominionenergy.com/south-carolina/save-energy?tab=2"
      ],
      "evidenceText": "Dominion Energy South Carolina lists business incentives for lighting, HVAC and mechanical, food service, custom, natural gas, VFD, window film, and cool roof measures.",
      "reasoningNotes": "Commercial-only scope should be preserved; window replacement and low-flow fixtures are false positives from broad text matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Dominion EnergyWise commercial materials describe multiple upgrades and custom paths, but no single kitchen/refrigeration formula was verified.",
        "sourceUrlsChecked": [
          "https://www.dominionenergy.com/south-carolina/save-energy/business-programs"
        ],
        "reasoningNotes": "The target spans HVAC, refrigeration, windows, cool roof and VFDs; no safe one-time rule was selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2036",
    "opportunityName": "CPS Energy (Electric) - Residential Energy Efficiency Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2036/cps-energy-electric-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.cpsenergy.com/content/corporate/en/my-home/savenow/home-efficiency-rebates.html",
    "applicationUrl": "https://resi-savenow.cpsenergy.com/",
    "administrator": "CPS Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 11,
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
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "solar photovoltaic",
          "photovoltaic"
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
          "San Antonio"
        ],
        "utilityTerritories": [
          "CPS Energy electric service territory"
        ],
        "notes": "Eligibility is limited to CPS Energy residential electric customers in the utility service area."
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
        "central_air_conditioner_replacement",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "smart_thermostat_demand_response",
        "attic_insulation_upgrade",
        "window_air_conditioner",
        "cool_roof_reflective_roof",
        "pool_pump_replacement",
        "battery_storage_demand_response",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "residential_retail_energy_efficiency_discounts"
      ],
      "hardRequirements": [
        "Applicant must be a CPS Energy residential customer.",
        "Equipment must meet the measure-specific eligibility rules on the CPS Energy Home Efficiency Incentives site.",
        "Some incentives are delivered through separate portals or demand-response programs."
      ],
      "blockers": [
        "Window air conditioner is not window replacement.",
        "Residential retail discounts do not support commercial refrigeration equipment.",
        "Solar PV appears as a separate Residential Solar offering and solar thermal was not verified in this rebate record.",
        "Water conservation and plumbing fixture incentives are separate from this CPS Energy electric rebate record."
      ],
      "programType": "Rebate Program",
      "administrator": "CPS Energy",
      "applicationUrl": "https://resi-savenow.cpsenergy.com/",
      "websiteUrl": "https://www.cpsenergy.com/content/corporate/en/my-home/savenow/home-efficiency-rebates.html",
      "sourceUrlsChecked": [
        "https://www.cpsenergy.com/en/my-home/savenow.html",
        "https://www.cpsenergy.com/content/corporate/en/my-home/savenow/home-efficiency-rebates.html",
        "https://resi-savenow.cpsenergy.com/"
      ],
      "evidenceText": "CPS Energy lists residential incentives for central air conditioning, heat pumps, thermostats, attic insulation, window air conditioners, cool roofs, pool pumps, EV charging, and battery storage.",
      "reasoningNotes": "The prior refrigerator, commercial refrigeration, window replacement, solar thermal, and broad plumbing matches should be blocked or narrowed to product-specific residential offers."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "CPS EV Smart Rewards provides enrollment and monthly bill credits for managed charging.",
        "sourceUrlsChecked": [
          "https://www.cpsenergy.com/en/my-home/savenow/rebates-rebate/ev-smart-rewards.html"
        ],
        "reasoningNotes": "Managed-charging credits are recurring bill credits, not upfront charger rebates.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5821",
    "opportunityName": "Appalachian Power (Electric)- Residential Energy Efficiency Programs",
    "state": "VA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5821/appalachian-power-electric-residential-energy-efficiency-programs",
    "websiteUrl": "https://takechargeva.com/rebates",
    "applicationUrl": "https://apcova.clearesult.com/",
    "administrator": "Appalachian Power",
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
          "air sealing"
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
          "Appalachian Power Virginia electric service territory"
        ],
        "notes": "Limited to Appalachian Power Virginia residential electric customers under TakeCharge Virginia program rules."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "income_qualified_residential_customer",
        "landlord_with_tenant_agreement"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "home_energy_assessment",
        "direct_install_low_flow_fixture",
        "pipe_insulation",
        "water_heater_tank_wrap",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "ductless_mini_split_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "air_filtration_system",
        "residential_appliance_rebate"
      ],
      "hardRequirements": [
        "Applicant must be an active Appalachian Power residential customer in Virginia.",
        "Home Performance measures require approved contractor participation.",
        "Some enhanced measures require an electric-heated home or income-qualified path.",
        "Direct-install measures are provided through the Home Energy Assessment process.",
        "Mini-split and other measures cannot double-dip across Efficient Products and Home Performance paths."
      ],
      "blockers": [
        "Commercial dishwasher, commercial refrigeration, and commercial kitchen equipment are not supported.",
        "Fossil fuel furnace replacement was not verified under the Appalachian Power Virginia electric program.",
        "Low-flow fixtures should be matched only as direct-install assessment measures, not as standalone water-conservation rebates.",
        "Apartments and commercial customers are not eligible under the residential home program unless a specific approved path applies."
      ],
      "programType": "Rebate Program",
      "administrator": "Appalachian Power",
      "applicationUrl": "https://apcova.clearesult.com/",
      "websiteUrl": "https://takechargeva.com/rebates",
      "sourceUrlsChecked": [
        "https://www.appalachianpower.com/savings/home/",
        "https://takechargeva.com/rebates",
        "https://takechargeva.com/resource/frequently-asked-questions",
        "https://apcova.clearesult.com/"
      ],
      "evidenceText": "TakeCharge Virginia lists home rebates for Efficient Products, Home Performance, home assessments, HPWH, central AC, air cleaners, attic insulation, and ductless mini-splits.",
      "reasoningNotes": "The repair keeps residential electric and home-performance measures while blocking commercial appliance, fossil furnace, and standalone water-conservation interpretations."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "TakeCharge Virginia source describes residential rebates but accessible text did not verify refrigerator/freezer or HPWH amounts.",
        "sourceUrlsChecked": [
          "https://takechargeva.com/programs/for-your-home",
          "https://takechargeva.com/rebates"
        ],
        "reasoningNotes": "No refrigeration-specific rule was safely found.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2639",
    "opportunityName": "Clark Public Utilities - Residential Energy Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2639/clark-public-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.clarkpublicutilities.com/residential-customers/reduce-energy-waste-and-lower-your-bill/all-rebates-incentives/",
    "applicationUrl": null,
    "administrator": "Clark Public Utilities",
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
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
          "Clark"
        ],
        "cities": [],
        "utilityTerritories": [
          "Clark Public Utilities electric service territory"
        ],
        "notes": "Residential rebates are limited to Clark Public Utilities customers. Several HVAC and weatherization measures require electrically heated existing homes and use of the utility contractor network."
      },
      "eligibleApplicantTypes": [
        "Clark Public Utilities residential electric customers",
        "homeowners",
        "renters with owner approval where required",
        "multifamily property owners where a measure pathway allows",
        "residential EV charger customers"
      ],
      "eligibleSectors": [
        "residential",
        "existing electrically heated residential homes",
        "manufactured homes where eligible",
        "multifamily residential where eligible",
        "transportation electrification"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "duct_sealing_and_insulation",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "window_replacement",
        "exterior_door_replacement",
        "ev_charger_installation",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must receive residential electric service from Clark Public Utilities.",
        "Weatherization and most heat pump measures require an existing electrically heated home and qualifying pre-existing conditions.",
        "Weatherization and many HVAC measures must be installed through the Clark Public Utilities Contractor Network unless a measure-specific exception applies.",
        "Heat pump water heater incentives require qualifying equipment and generally require replacement of an electric storage water heater in an existing home.",
        "Smart thermostat rebates require a qualified thermostat installed on eligible electric furnace or ducted heat pump systems; ductless heat pumps, baseboard, in-wall, and cable-ceiling electric resistance systems are excluded.",
        "EV charging rebates apply to qualifying residential Level 2 connected or non-connected chargers and require program documentation, installation, and permit conditions."
      ],
      "blockers": [
        "high_efficiency_hvac_replacement should not be matched as a broad category; current support is heat-pump and selected electric HVAC specific.",
        "high_efficiency_furnace_retrofit is a false-positive category for this record; furnace language primarily appears as existing heating-system eligibility for thermostats or heat pump conversions, not a furnace replacement rebate.",
        "efficient_pump_replacement is unsupported by current reviewed sources; do not confuse heat pumps or heat pump water heaters with pump replacement.",
        "EV charging is a separate residential EV charger program and should be limited to Level 2 residential charger rules, not DC fast charging or commercial charging.",
        "Window and exterior-door matches are weatherization-specific and should not be generalized to all window or door replacement projects."
      ],
      "programType": "Rebate Program",
      "administrator": "Clark Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.clarkpublicutilities.com/residential-customers/reduce-energy-waste-and-lower-your-bill/all-rebates-incentives/",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/2639/clark-public-utilities-residential-energy-efficiency-rebate-program",
        "https://www.clarkpublicutilities.com/residential-customers/reduce-energy-waste-and-lower-your-bill/all-rebates-incentives/",
        "https://www.clarkpublicutilities.com/wp-content/uploads/2025/12/Rebates-and-Incentives11_25-web.pdf",
        "https://www.clarkpublicutilities.com/residential-customers/reduce-energy-waste-and-lower-your-bill/all-rebates-incentives/electric-vehicle-program/",
        "https://www.clarkpublicutilities.com/residential-customers/reduce-energy-waste-and-lower-your-bill/all-rebates-incentives/heat-pump-program/",
        "https://www.clarkpublicutilities.com/residential-customers/reduce-energy-waste-and-lower-your-bill/all-rebates-incentives/weatherization-program/",
        "https://www.clarkpublicutilities.com/residential-customers/reduce-energy-waste-and-lower-your-bill/all-rebates-incentives/heat-pump-water-heater-program/",
        "https://www.clarkpublicutilities.com/residential-customers/reduce-energy-waste-and-lower-your-bill/all-rebates-incentives/smart-thermostat/"
      ],
      "evidenceText": "Current Clark Public Utilities residential rebate sources list heat pumps, smart thermostats, weatherization measures including insulation, duct sealing, air sealing, qualifying windows and exterior doors, heat pump water heaters, and residential Level 2 EV charging rebates. Current forms restrict several measures to Clark customers with electrically heated existing homes and contractor-network installation rules.",
      "reasoningNotes": "The repair keeps heat pump, thermostat, HPWH, weatherization, window/door, and residential Level 2 EV charging matches. Broad furnace replacement, generic HVAC replacement, and pump replacement are blocked as false positives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Clark Public Utilities rebate pages were checked but no current EV or vehicle-related one-time formula was verified.",
        "sourceUrlsChecked": [
          "https://www.clarkpublicutilities.com/residential-customers/reduce-waste-and-save-money/rebates/",
          "https://programs.dsireusa.org/system/program/detail/2639"
        ],
        "reasoningNotes": "The target maps to fleet fuel replacement while source materials are residential efficiency measures.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2289",
    "opportunityName": "Plumas-Sierra REC - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2289/plumas-sierra-rec-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.psrec.coop/energy-solutions/rebates/",
    "applicationUrl": null,
    "administrator": "Plumas-Sierra Rural Electric Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 10,
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
          "CA"
        ],
        "counties": [
          "Plumas County",
          "Sierra County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Plumas-Sierra Rural Electric Cooperative"
        ],
        "notes": "Applies to PSREC residential members in the cooperative service territory; PSREC also serves limited adjacent areas."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner",
        "tenant_with_account_or_owner_approval"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "air_source_heat_pump",
        "ground_source_geothermal_heat_pump",
        "central_air_conditioner",
        "residential_room_air_conditioner",
        "smart_thermostat_zoning_retrofit",
        "heat_pump_water_heater",
        "standard_electric_water_heater",
        "residential_clothes_washer",
        "residential_clothes_dryer",
        "residential_dishwasher",
        "residential_refrigerator_freezer",
        "residential_refrigerator_freezer_recycling",
        "residential_holiday_led_lighting",
        "insulation_upgrade",
        "air_sealing_weatherization"
      ],
      "hardRequirements": [
        "Must be a PSREC residential member and install equipment in PSREC service territory.",
        "Rebates are generally limited to 50% of installed cost and require applications within six months where stated."
      ],
      "blockers": [
        "Residential dishwashers and appliances are not commercial foodservice or commercial refrigeration equipment.",
        "LED support was verified as residential holiday lighting, not a broad whole-building LED retrofit.",
        "GeoExchange includes rebate and financing components and should not be treated as a simple rebate only."
      ],
      "programType": "Rebate Program",
      "administrator": "Plumas-Sierra Rural Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.psrec.coop/energy-solutions/rebates/",
      "sourceUrlsChecked": [
        "https://www.psrec.coop/energy-solutions/rebates/",
        "https://www.psrec.coop/energy-solutions/energy-saving-products/geoexchange-program/",
        "https://www.californiageo.org/wp-content/uploads/Plumas-FY20-Res-HVAC-Rebate-App-FINAL.pdf"
      ],
      "evidenceText": "PSREC]( official snippets and rebate application text support residential HVAC, room AC, smart thermostats, geothermal, HPWH, appliances, recycling, holiday lighting, and weatherization incentives.",
      "reasoningNotes": "Because PSREC pages were not fully readable, the repair is conservative and excludes unsupported commercial and broad LED categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "PSREC residential rebate page did not expose current whole-building per-kWh or a single matched measure value.",
        "sourceUrlsChecked": [
          "https://www.psrec.coop/energy/rebates/"
        ],
        "reasoningNotes": "Broad residential target requires measure-specific application values.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1926",
    "opportunityName": "Turlock Irrigation District - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1926/turlock-irrigation-district-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.tid.org/customer-service/rebates-and-savings/residential-rebates/",
    "applicationUrl": "https://rebates.tid.org/",
    "administrator": "Turlock Irrigation District",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "air_filtration_system",
        "displayName": "Air filtration system",
        "parentCategory": "indoor_air_quality_ventilation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "filtration"
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
          "Stanislaus County",
          "Merced County",
          "Tuolumne County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Turlock Irrigation District"
        ],
        "notes": "Applies to residences in the TID electric service area."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "renter_with_owner_approval"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_clothes_washer",
        "residential_clothes_dryer",
        "residential_induction_cooking",
        "residential_refrigerator",
        "residential_dishwasher",
        "heat_pump_water_heater",
        "hvac_tune_up",
        "central_air_conditioner",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "smart_thermostat_zoning_retrofit",
        "residential_room_air_conditioner",
        "whole_house_fan",
        "solar_sun_screen",
        "variable_speed_pool_pump",
        "window_replacement",
        "shade_tree",
        "gas_to_electric_heat_pump_conversion",
        "gas_to_electric_induction_cooking",
        "gas_to_electric_heat_pump_water_heater"
      ],
      "hardRequirements": [
        "New unit or product must be installed and operating in a residence in the TID service area.",
        "Applications must be received within six months of purchase and include receipts and required documentation."
      ],
      "blockers": [
        "Residential dishwasher is not a commercial dishwasher retrofit.",
        "Residential induction stovetop is not commercial kitchen equipment.",
        "Residential refrigerator is not commercial refrigeration equipment.",
        "No separate air filtration system rebate was verified; the refrigerator image text caused a false match."
      ],
      "programType": "Rebate Program",
      "administrator": "Turlock Irrigation District",
      "applicationUrl": "https://rebates.tid.org/",
      "websiteUrl": "https://www.tid.org/customer-service/rebates-and-savings/residential-rebates/",
      "sourceUrlsChecked": [
        "https://www.tid.org/customer-service/rebates-and-savings/residential-rebates/"
      ],
      "evidenceText": "TID's]( residential rebate page lists appliances, HPWH, HVAC, smart thermostats, room AC, whole-house fans, sun screens, pool pumps, windows, shade trees, and gas-to-electric measures.",
      "reasoningNotes": "Kept TID residential categories and removed commercial kitchen, commercial refrigeration, and false air-filtration interpretations."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "TID residential rebate page lists many categories but did not expose a whole-building formula.",
        "sourceUrlsChecked": [
          "https://www.tid.org/customer-service/save-energy-money/rebates/"
        ],
        "reasoningNotes": "Target is whole-building custom efficiency; measure-specific values should be extracted later.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4630",
    "opportunityName": "Boulder County - EnergySmart Residential Energy Efficiency Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4630/boulder-county-energysmart-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://energysmartyes.com/rebates/income-qualified-rebates/",
    "applicationUrl": "https://bouldercounty.formstack.com/forms/energysmart_preapproval_form",
    "administrator": "Boulder County EnergySmart",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
        "retrofitTypeId": "rooftop_solar_pv",
        "displayName": "Rooftop solar PV",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "solar pv"
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
        "counties": [
          "Boulder County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Xcel Energy",
          "Longmont Power",
          "Estes Park Power",
          "Poudre Valley REA",
          "United Power",
          "Lyons Power"
        ],
        "notes": "Countywide income-qualified EnergySmart rebate program; contractor requirements depend on electric utility. Lafayette may offer a bonus but does not define the whole geography."
      },
      "eligibleApplicantTypes": [
        "income_qualified_resident",
        "low_income_household",
        "moderate_income_household",
        "homeowner",
        "renter_with_owner_authorization",
        "manufactured_home_resident"
      ],
      "eligibleSectors": [
        "residential",
        "manufactured_home"
      ],
      "eligibleRetrofitCategories": [
        "insulation_upgrade",
        "air_sealing_weatherization",
        "cellular_shades",
        "duct_sealing_and_insulation",
        "ducted_air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "air_to_water_heat_pump",
        "heat_pump_water_heater",
        "electric_resistance_water_heater_replacing_gas",
        "induction_cooktop_range",
        "electric_stove_replacing_gas",
        "heat_pump_clothes_dryer",
        "electric_panel_upgrade"
      ],
      "hardRequirements": [
        "Household must be in Boulder County and income-qualified at or below the current AMI threshold or otherwise qualifying through listed assistance programs.",
        "Preapproval and income verification are required before purchase or project start.",
        "Project must be for an existing residential or manufactured home, not new construction.",
        "Project must be completed and invoiced in the applicable program year.",
        "EnergySmart rebate plus other incentives generally cannot exceed the listed share of project cost.",
        "Registered contractor, utility, permit, code, documentation, and owner-authorization rules apply."
      ],
      "blockers": [
        "Standard open-to-all rebates are no longer the current verified offering; current rebates are income-qualified.",
        "Gas furnaces and gas water heaters are not supported by the current 2026 EnergySmart rebate list.",
        "Commercial refrigeration is not supported.",
        "Solar PV and EV chargers are not direct EnergySmart rebate measures here; they only appear as allowable reasons for panel-upgrade support or as separate incentives.",
        "New construction is not eligible."
      ],
      "programType": "Rebate Program",
      "administrator": "Boulder County EnergySmart",
      "applicationUrl": "https://bouldercounty.formstack.com/forms/energysmart_preapproval_form",
      "websiteUrl": "https://energysmartyes.com/rebates/income-qualified-rebates/",
      "sourceUrlsChecked": [
        "https://energysmartyes.com/rebates/income-qualified-rebates/",
        "https://bouldercounty.gov/news/up-to-4000-now-available-for-energy-efficient-home-upgrades-for-boulder-county-residents/",
        "https://content.govdelivery.com/accounts/COBOULDER/bulletins/3f92c11",
        "https://bouldercounty.formstack.com/forms/energysmart_preapproval_form"
      ],
      "evidenceText": "EnergySmart’s 2026 Boulder County page says rebates are income-qualified, require preapproval, and cover insulation, air sealing, heat pumps, HPWHs, induction or electric stoves, heat-pump dryers and panel upgrades.",
      "reasoningNotes": "Older matches for furnace, gas water heater, refrigeration and solar PV should be blocked; current support is income-qualified electrification and envelope work."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "EnergySmart provides advising and links to rebates, but no direct solar PV per-kW formula was verified.",
        "sourceUrlsChecked": [
          "https://bouldercounty.gov/environment/sustainability/energysmart/"
        ],
        "reasoningNotes": "Target is mapped to solar PV, but the program is not a clear upfront solar rebate source.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4730",
    "opportunityName": "MidAmerican Energy - Illinois Business Programs and Rebates",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4730/midamerican-energy-illinois-business-programs-and-rebates",
    "websiteUrl": "https://www.midamericanenergy.com/business-discounts-and-rebates",
    "applicationUrl": null,
    "administrator": "MidAmerican Energy Company",
    "programType": "Business Rebate And Instant Discount Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
          "led lighting",
          "lighting retrofit"
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
          "MidAmerican Energy Company"
        ],
        "notes": "Nonresidential facilities must be in MidAmerican Energy's Illinois electric or natural gas service territory, and MidAmerican must deliver energy to the rebated equipment."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "nonresidential_customer",
        "small_business_customer",
        "agricultural_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "nonprofit",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "energy_assessment",
        "led_lighting_retrofit",
        "exterior_site_lighting_retrofit",
        "refrigeration_case_lighting_retrofit",
        "lighting_controls",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_hvac_replacement",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_oven",
        "high_efficiency_fryer",
        "high_efficiency_steamer",
        "high_efficiency_griddle",
        "hot_food_holding_cabinet",
        "efficient_ice_machine",
        "high_efficiency_refrigeration_equipment",
        "pre_rinse_spray_valve",
        "agricultural_fan_efficiency",
        "grain_bin_fan_controls",
        "compressed_air_efficiency"
      ],
      "hardRequirements": [
        "Customer must be an eligible MidAmerican Energy Illinois commercial or industrial customer.",
        "MidAmerican Energy must deliver the energy type used by the rebated equipment.",
        "Qualifying equipment must be purchased, installed, and operating during the current program year.",
        "Custom, direct, retro-commissioning, and strategic energy management projects may require preapproval.",
        "Rebates and instant discounts are subject to annual budget and program limits."
      ],
      "blockers": [
        "Residential appliances and home weatherization are not eligible under this Illinois business program.",
        "Small Business Express assessment is not a general standalone residential energy audit rebate.",
        "Commercial new construction and custom projects have separate pathways and may require preapproval.",
        "Lighting must meet program wattage reduction and operating-hour requirements; existing LED-to-new LED replacements are generally excluded.",
        "Instant discounts must be obtained through participating providers and are subject to available funds."
      ],
      "programType": "Business Rebate And Instant Discount Program",
      "administrator": "MidAmerican Energy Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.midamericanenergy.com/business-discounts-and-rebates",
      "sourceUrlsChecked": [
        "https://www.midamericanenergy.com/business-discounts-and-rebates",
        "https://www.midamericanenergy.com/il-bus-qualifications-conditions",
        "https://www.midamericanenergy.com/business-programs-and-savings",
        "https://www.midamericanenergy.com/small-business-express"
      ],
      "evidenceText": "MidAmerican's current Illinois business materials list instant discounts and rebates for nonresidential HVAC, lighting, food service, refrigeration, agriculture, compressed air, and assessments.",
      "reasoningNotes": "Kept commercial and industrial measures only. Product-specific food-service and refrigeration items were not generalized into residential appliance categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "MidAmerican Illinois business rebate source did not expose current measure amounts for the broad target.",
        "sourceUrlsChecked": [
          "https://www.midamericanenergy.com/il-business-rebates"
        ],
        "reasoningNotes": "No safe whole-building or dishwasher/heat-pump rule was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5135",
    "opportunityName": "Wabash Valley Power Association (23 Member Cooperatives) - Commercial and Industrial Energy Efficiency Program",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5135/wabash-valley-power-association-23-member-cooperatives-commercial-and-industrial-energy-efficiency-program",
    "websiteUrl": "https://www.powermoves.com/rebates/business/",
    "applicationUrl": "https://www.powermoves.com/wp-content/uploads/2026/01/2026-Web-CI-Booklet.pdf",
    "administrator": "Wabash Valley Power Alliance / PowerMoves",
    "programType": "Commercial Industrial Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "IL",
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "participating Wabash Valley Power Alliance member cooperative service territories"
        ],
        "notes": "Available to nonresidential members on participating cooperative lines; exact participating cooperative coverage should be checked for the account."
      },
      "eligibleApplicantTypes": [
        "business_customers",
        "commercial_customers",
        "industrial_customers",
        "agricultural_customers",
        "institutional_customers",
        "government_customers",
        "schools",
        "nonprofits"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional",
        "public",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "exterior_site_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "packaged_terminal_heat_pump",
        "ground_source_geothermal_heat_pump",
        "hvac_controls_retrofit",
        "variable_frequency_drive_retrofit",
        "high_efficiency_refrigeration_equipment",
        "anti_sweat_heater_controls",
        "door_gasket_strip_curtain_night_cover",
        "energy_management_system",
        "kitchen_ventilation_controls",
        "heat_pump_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be a nonresidential member of a participating electric cooperative.",
        "Equipment must be new, efficient, installed on the member account, and meet the 2026 program manual requirements.",
        "Prescriptive applications must meet post-installation deadlines; custom and new construction projects require preapproval.",
        "Program caps, first-come funding, and cooperative submission rules apply."
      ],
      "blockers": [
        "Low-flow fixture retrofit is a false positive from lighting fixture language; no broad plumbing low-flow category is supported.",
        "Residential appliances and home weatherization should not match this commercial and industrial program.",
        "Custom and new construction measures should not be treated as automatic rebates without preapproval."
      ],
      "programType": "Commercial Industrial Rebate Program",
      "administrator": "Wabash Valley Power Alliance / PowerMoves",
      "applicationUrl": "https://www.powermoves.com/wp-content/uploads/2026/01/2026-Web-CI-Booklet.pdf",
      "websiteUrl": "https://www.powermoves.com/rebates/business/",
      "sourceUrlsChecked": [
        "https://www.powermoves.com/rebates/business/",
        "https://www.powermoves.com/wp-content/uploads/2026/01/2026-Web-CI-Booklet.pdf"
      ],
      "evidenceText": "The 2026 PowerMoves business booklet covers nonresidential cooperative members and lists lighting, lighting controls, HVAC, heat pumps, VFDs, refrigeration controls, energy management, kitchen ventilation and heat pump water heaters.",
      "reasoningNotes": "Kept C&I equipment categories supported by the current booklet and removed the unsupported low-flow fixture interpretation."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "PowerMoves commercial program has many prescriptive and custom measures; target is broad whole-building.",
        "sourceUrlsChecked": [
          "https://www.powermoves.com/rebates/business/",
          "https://www.powermoves.com/wp-content/uploads/2026/01/2026-Prescriptive-Non-Lighting.pdf"
        ],
        "reasoningNotes": "A specific lighting, VFD, refrigeration or heat-pump measure should be selected before creating a rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1811",
    "opportunityName": "Mansfield Municipal Electric Department - Residential Energy Efficiency Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1811/mansfield-municipal-electric-department-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.mansfieldelectric.com/rebates-savings",
    "applicationUrl": null,
    "administrator": "Mansfield Municipal Electric Department",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MA"
        ],
        "counties": [],
        "cities": [
          "Mansfield"
        ],
        "utilityTerritories": [
          "Mansfield Municipal Electric Department"
        ],
        "notes": "Residential account and service location must be in Mansfield, Massachusetts."
      },
      "eligibleApplicantTypes": [
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "energy_audit",
        "ev_charger_installation",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "energy_star_residential_refrigerator",
        "energy_star_clothes_washer",
        "energy_star_clothes_dryer",
        "energy_star_window_air_conditioner",
        "energy_star_dehumidifier"
      ],
      "hardRequirements": [
        "Eligible equipment must be installed at the Mansfield Municipal Electric Department account location.",
        "2026 rebate forms require qualifying purchases or installations during 2026 and postmark by January 31, 2027.",
        "Weatherization measures must be recommended by an ENE Home Energy Assessment and meet the required savings-to-investment ratio.",
        "EV charger rebate requires licensed electrician installation and Connected Homes enrollment."
      ],
      "blockers": [
        "Window and door replacement are excluded from the weatherization rebate.",
        "Refrigeration match must be limited to residential ENERGY STAR refrigerators, not commercial refrigeration equipment.",
        "Window air conditioners are not window replacement.",
        "Generic high-efficiency HVAC or gas HVAC does not qualify; HVAC rebates are air-source or ground-source heat pumps only."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Mansfield Municipal Electric Department",
      "applicationUrl": null,
      "websiteUrl": "https://www.mansfieldelectric.com/rebates-savings",
      "sourceUrlsChecked": [
        "https://www.mansfieldelectric.com/rebates-savings",
        "https://www.mansfieldelectric.com/rebates-savings/files/2026-energy-star-heat-pump-rebate-form",
        "https://www.mansfieldelectric.com/rebates-savings/files/2026-weatherization-rebate-form",
        "https://www.mansfieldelectric.com/rebates-savings/files/2026-electric-vehicle-charger-rebate-form",
        "https://www.mansfieldelectric.com/rebates-savings/files/2026-energy-star-appliance-rebate-form"
      ],
      "evidenceText": "2026 MMED forms cover residential heat pumps, weatherization, EV chargers, and ENERGY STAR appliances. Weatherization excludes doors and windows; EV chargers require Connected Homes enrollment.",
      "reasoningNotes": "Kept only measures directly listed in current MMED forms. Energy audit is included as a required assessment pathway for weatherization, not as a broad standalone retrofit."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Mansfield rebate page points to multiple residential efficiency and electrification programs, but exact current measure amounts were not verified.",
        "sourceUrlsChecked": [
          "https://www.mansfieldelectric.com/rebates-savings",
          "https://nextzero.org/"
        ],
        "reasoningNotes": "Target spans HVAC, weatherization, EV charging, water heating and audits; a measure-specific current table is needed.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1929",
    "opportunityName": "Shrewsbury Electric - Residential Energy Efficiency Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1929/shrewsbury-electric-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://nextzero.org/shrewsbury/",
    "applicationUrl": null,
    "administrator": "Shrewsbury Electric and Cable Operations / NextZero",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MA"
        ],
        "counties": [],
        "cities": [
          "Shrewsbury"
        ],
        "utilityTerritories": [
          "Shrewsbury Electric and Cable Operations electric service territory"
        ],
        "notes": "Limited to SELCO customers served through NextZero programs."
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
        "energy_audit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "residential_clothes_washer",
        "electric_clothes_dryer",
        "heat_pump_clothes_dryer",
        "residential_refrigerator_freezer",
        "residential_dehumidifier",
        "residential_air_purifier",
        "residential_induction_range",
        "smart_thermostat_zoning_retrofit",
        "mini_split_hvac_control"
      ],
      "hardRequirements": [
        "Customer must be served by SELCO/NextZero in Shrewsbury.",
        "Appliance rebates are limited to 1-to-4-unit residential buildings and qualifying new products.",
        "Heat pump and weatherization rebates must meet NextZero tier, contractor, assessment, and installation-date requirements.",
        "Natural gas heating customers are excluded from certain heat pump rebate tiers."
      ],
      "blockers": [
        "Efficient fan or blower replacement is a false positive from blower-door testing language, not a fan motor rebate.",
        "Induction is for residential ranges or cooktops, not commercial kitchen equipment.",
        "Residential refrigerators and laundry appliances should not match commercial refrigeration, commercial laundry, or foodservice categories.",
        "EV and battery offers exist under other NextZero/Connected Homes pathways and are not retained in this repair unless separately matched."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Shrewsbury Electric and Cable Operations / NextZero",
      "applicationUrl": null,
      "websiteUrl": "https://nextzero.org/shrewsbury/",
      "sourceUrlsChecked": [
        "https://www.selco.shrewsburyma.gov/efficiency-renewables",
        "https://nextzero.org/shrewsbury/",
        "https://nextzero.org/shrewsbury/appliances/",
        "https://nextzero.org/shrewsbury/heat-pumps/",
        "https://nextzero.org/shrewsbury/heat-pumps/weatherization/",
        "https://nextzero.org/shrewsbury/energy-audits/",
        "https://nextzero.org/shrewsbury/connected-homes/"
      ],
      "evidenceText": "NextZero’s Shrewsbury pages list residential appliances, heat pumps, weatherization, audits and connected home controls. Appliance rebates are for 1-to-4-unit residential buildings.",
      "reasoningNotes": "Repaired broad commercial and motor categories into residential product-specific appliance, heat pump, weatherization, audit, and control categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "SELCO/Shrewsbury residential efficiency pages include multiple NextZero/electrification measures, but exact current target value was not verified.",
        "sourceUrlsChecked": [
          "https://shrewsburyma.gov/",
          "https://nextzero.org/"
        ],
        "reasoningNotes": "No single current formula was safely selected for the broad whole-building target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3595",
    "opportunityName": "Consumers Energy (Electric) - Residential Energy Efficiency Program",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3595/consumers-energy-electric-residential-energy-efficiency-program",
    "websiteUrl": "https://www.consumersenergy.com/residential/savings-and-clean-energy/rebates",
    "applicationUrl": null,
    "administrator": "Consumers Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "thermostat",
          "zoning"
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
          "MI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Consumers Energy"
        ],
        "notes": "Applies to Consumers Energy residential gas or electric customers; measure eligibility depends on service type and equipment."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_owner_approval"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "smart_thermostat_zoning_retrofit",
        "hvac_tune_up",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "window_replacement",
        "patio_door_replacement",
        "appliance_rebates",
        "appliance_recycling",
        "residential_lighting",
        "level_2_ev_charger_installation",
        "home_energy_analysis"
      ],
      "hardRequirements": [
        "HVAC rebates must be submitted by participating trade allies within program deadlines.",
        "Windows, patio doors, and insulation must meet current Consumers Energy specifications and service-type requirements."
      ],
      "blockers": [
        "Exterior opaque door replacement was not supported except qualified patio or glass doors.",
        "Residential appliance offerings are not commercial refrigeration equipment.",
        "Window rebates exclude ineligible products such as storm windows, skylights, glass block, and some non-living-space installations."
      ],
      "programType": "Rebate Program",
      "administrator": "Consumers Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.consumersenergy.com/residential/savings-and-clean-energy/rebates",
      "sourceUrlsChecked": [
        "https://www.consumersenergy.com/residential/savings-and-clean-energy/rebates",
        "https://www.consumersenergy.com/residential/savings-and-clean-energy/rebates/heating-and-cooling",
        "https://www.consumersenergy.com/-/media/CE/Documents/residential/save-money-and-energy/rebates/windows-and-insulation-rebate-application.pdf"
      ],
      "evidenceText": "Consumers]( Energy pages and forms list residential HVAC, furnaces, heat pumps, tune-ups, thermostats, water heating, insulation, windows, patio doors, lighting, appliances, recycling, and EV rebates.",
      "reasoningNotes": "Retained supported residential categories and narrowed the door category to patio or glass doors; removed commercial refrigeration interpretations."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Consumers Energy residential rebate page lists categories but no whole-building per-kWh formula was verified.",
        "sourceUrlsChecked": [
          "https://www.consumersenergy.com/residential/save-money-and-energy/rebates"
        ],
        "reasoningNotes": "Target is whole-building custom efficiency; measure-specific values need a narrower target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3575",
    "opportunityName": "Great Lakes Energy - Residential Energy Efficiency Rebate Program",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3575/great-lakes-energy-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.gtlakes.com/energy-wise/",
    "applicationUrl": null,
    "administrator": "Great Lakes Energy",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
          "MI"
        ],
        "counties": [
          "Allegan",
          "Antrim",
          "Barry",
          "Charlevoix",
          "Cheboygan",
          "Clare",
          "Crawford",
          "Emmet",
          "Grand Traverse",
          "Kalkaska",
          "Kent",
          "Lake",
          "Manistee",
          "Mason",
          "Mecosta",
          "Missaukee",
          "Montcalm",
          "Montmorency",
          "Muskegon",
          "Newaygo",
          "Oceana",
          "Osceola",
          "Oscoda",
          "Otsego",
          "Ottawa",
          "Wexford"
        ],
        "cities": [],
        "utilityTerritories": [
          "Great Lakes Energy"
        ],
        "notes": "Available to Great Lakes Energy residential members in its western and northern Michigan electric service territory."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_residential_room_air_conditioner",
        "high_efficiency_central_air_conditioner",
        "central_air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "air_to_water_heat_pump",
        "ground_source_geothermal_heat_pump",
        "desuperheater",
        "heat_pump_water_heater",
        "energy_star_residential_clothes_washer",
        "energy_star_residential_standard_electric_dryer",
        "heat_pump_clothes_dryer",
        "energy_star_residential_refrigerator",
        "energy_star_residential_freezer",
        "residential_induction_range_or_cooktop",
        "smart_thermostat",
        "whole_home_dehumidifier",
        "efficient_circulation_pump",
        "central_ac_tune_up",
        "air_purifier"
      ],
      "hardRequirements": [
        "Applicant must be a Great Lakes Energy member with a qualifying residential installation.",
        "Equipment must meet ENERGY STAR, efficiency, installation-date, and documentation requirements for the relevant form.",
        "Heat pump, geothermal, and water heating measures require qualifying contractors, equipment, and supporting documentation where specified.",
        "Completed rebate documentation must be submitted within the required post-installation period."
      ],
      "blockers": [
        "Do not match Level 2 EV charging; current official Energy Wise page did not verify an EV charger rebate.",
        "Do not match commercial kitchen or commercial refrigeration categories.",
        "Induction is a residential range or cooktop measure, not commercial kitchen equipment.",
        "Residential refrigerator and freezer rebates should not become commercial refrigeration equipment."
      ],
      "programType": "Rebate",
      "administrator": "Great Lakes Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.gtlakes.com/energy-wise/",
      "sourceUrlsChecked": [
        "https://www.gtlakes.com/energy-wise/"
      ],
      "evidenceText": "Great Lakes Energy's current Energy Wise page lists residential appliance, HVAC, geothermal, heat pump water heater, smart thermostat, dehumidifier, circulation pump, induction, and tune-up rebates.",
      "reasoningNotes": "Removed EV charging and commercial-category false positives while preserving product-specific residential appliance and HVAC rebates."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official Energy Wise source checked, but no whole-building per-kWh or current appliance/EV formula verified.",
        "sourceUrlsChecked": [
          "https://www.gtlakes.com/energy-wise/"
        ],
        "reasoningNotes": "Target has many matched terms; no single reliable rule selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4787",
    "opportunityName": "Minnesota Energy Resources (Gas) - Low-Income New Construction Rebates",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4787/minnesota-energy-resources-gas-low-income-new-construction-rebates",
    "websiteUrl": "https://www.minnesotaenergyresources.com/partners/builders/affordable-housing-rebates",
    "applicationUrl": "https://www.minnesotaenergyresources.com/partners/builders/pdf/affordable-housing-rebates.pdf",
    "administrator": "Minnesota Energy Resources",
    "programType": "Affordable Housing Natural Gas Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Minnesota Energy Resources natural gas service territory"
        ],
        "notes": "Qualifying affordable-housing dwellings must be served by Minnesota Energy Resources natural gas service in Minnesota."
      },
      "eligibleApplicantTypes": [
        "affordable_housing_developer",
        "nonprofit_organization",
        "property_manager",
        "public_housing_authority",
        "habitat_for_humanity_affiliate",
        "rental_property_owner",
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential",
        "affordable_housing",
        "low_income",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_gas_water_heater",
        "integrated_space_and_water_heating",
        "smart_thermostat_zoning_retrofit",
        "energy_recovery_ventilation_retrofit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "duct_sealing",
        "window_replacement",
        "drain_water_heat_recovery",
        "heating_system_tuneup"
      ],
      "hardRequirements": [
        "Applicant must document qualifying low-income or affordable-housing occupancy.",
        "Project must be served by Minnesota Energy Resources natural gas service.",
        "Applications must be submitted within the program deadline after installation.",
        "Some measures are restricted to existing homes or retrofit applications and do not qualify for new construction.",
        "Home Energy Excellence developments are excluded from certain space-heating, window, and water-heating rebates."
      ],
      "blockers": [
        "Industrial waste_heat_recovery is a false positive; the supported measure is residential drain-water heat recovery.",
        "Electric heat pumps and heat pump water heaters are not part of this gas affordable-housing rebate.",
        "Several measures are marked retrofit or existing-homes only and do not qualify for new construction.",
        "Home Energy Excellence developments cannot use this program for space heating, windows, or water heating.",
        "Applicant must document low-income or affordable-housing occupancy and Minnesota Energy Resources gas service."
      ],
      "programType": "Affordable Housing Natural Gas Rebate Program",
      "administrator": "Minnesota Energy Resources",
      "applicationUrl": "https://www.minnesotaenergyresources.com/partners/builders/pdf/affordable-housing-rebates.pdf",
      "websiteUrl": "https://www.minnesotaenergyresources.com/partners/builders/affordable-housing-rebates",
      "sourceUrlsChecked": [
        "https://www.minnesotaenergyresources.com/partners/builders/affordable-housing-rebates",
        "https://www.minnesotaenergyresources.com/partners/builders/pdf/affordable-housing-rebates.pdf",
        "https://www.minnesotaenergyresources.com/savings/rebates",
        "https://www.minnesotaenergyresources.com/partners/builders/construction-rebates"
      ],
      "evidenceText": "MER's 2026 affordable-housing rebate materials list gas heating, gas water heating, HRV or ERV, drain-water heat recovery, thermostats, duct sealing, insulation, air sealing, and windows.",
      "reasoningNotes": "The source is a gas affordable-housing program. Electric heat-pump and industrial heat-recovery matches were removed or blocked."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Minnesota Energy Resources low-income new construction rebates are builder/project-specific and exact current values were not verified.",
        "sourceUrlsChecked": [
          "https://www.minnesotaenergyresources.com/partners/builders/construction-rebates",
          "https://programs.dsireusa.org/system/program/detail/4787"
        ],
        "reasoningNotes": "A builder/new-construction measure table should be selected before creating a rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1943",
    "opportunityName": "New Ulm Public Utilities - Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1943/new-ulm-public-utilities-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.newulmmn.gov/206/Energy-Rebates",
    "applicationUrl": "https://www.newulmmn.gov/206/Energy-Rebates",
    "administrator": "New Ulm Public Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "MN"
        ],
        "counties": [
          "Brown County"
        ],
        "cities": [
          "New Ulm"
        ],
        "utilityTerritories": [
          "New Ulm Public Utilities"
        ],
        "notes": "Applies to customers of New Ulm Public Utilities; commercial and industrial offers are distinct from residential rebates on the same city website."
      },
      "eligibleApplicantTypes": [
        "New Ulm Public Utilities residential customers",
        "New Ulm Public Utilities commercial customers",
        "industrial customers",
        "business property owners",
        "residential homeowners"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "residential_energy_star_appliances",
        "residential_refrigerator_freezer",
        "residential_clothes_washer",
        "residential_dishwasher",
        "residential_lighting",
        "ceiling_fan",
        "central_air_conditioning_cooling_only",
        "mini_split_cooling_only",
        "smart_thermostat",
        "gas_water_heater",
        "furnace",
        "boiler",
        "furnace_or_boiler_check_and_clean",
        "central_air_conditioner_check_and_clean",
        "residential_energy_audit",
        "commercial_high_efficiency_lighting",
        "commercial_motors",
        "commercial_variable_speed_drives",
        "district_energy_steam",
        "custom_commercial_energy_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be a New Ulm Public Utilities customer for the applicable residential, commercial or industrial program.",
        "Residential and business rebates use separate official pages and forms.",
        "Commercial and industrial custom rebates require contact with New Ulm Public Utilities.",
        "Residential energy audits are limited to NUPU customers and available while funds last.",
        "Measure-specific forms determine equipment standards and documentation requirements."
      ],
      "blockers": [
        "Do not map residential ENERGY STAR appliances to commercial dishwasher, commercial laundry or commercial refrigeration retrofits.",
        "Heat pump terms are not retained as a broad commercial category because the current official business page checked emphasizes lighting, motors, VSDs, district energy/steam and custom rebates.",
        "Energy audit is a service and planning category, not a physical retrofit.",
        "Residential central air and mini-split entries are cooling-oriented and should not be generalized to all heat-pump HVAC projects without a qualifying form."
      ],
      "programType": "Rebate Program",
      "administrator": "New Ulm Public Utilities",
      "applicationUrl": "https://www.newulmmn.gov/206/Energy-Rebates",
      "websiteUrl": "https://www.newulmmn.gov/206/Energy-Rebates",
      "sourceUrlsChecked": [
        "https://www.newulmmn.gov/206/Energy-Rebates",
        "https://www.newulmmn.gov/391/Residential-Rebates",
        "https://www.newulmmn.gov/499/CommercialIndustrial-Rebates",
        "https://www.newulmmn.gov/581/Residential-Energy-Audits",
        "https://programs.dsireusa.org/system/program/detail/1943/new-ulm-public-utilities-energy-efficiency-rebate-program"
      ],
      "evidenceText": "New Ulm's Energy Rebates page separates residential rebates from commercial and industrial rebates. Residential links include ENERGY STAR appliances, cooling, smart thermostat, furnace/boiler and audits. The commercial and industrial page lists high-efficiency lighting, commercial motors, VSDs, district energy/steam and custom rebate contact paths.",
      "reasoningNotes": "The opportunity is active but spans residential and business program pages. Matching must distinguish residential appliance/HVAC offers from the narrower commercial and industrial categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "New Ulm/Bright Energy source includes many residential measures but no whole-building per-kWh formula was verified.",
        "sourceUrlsChecked": [
          "https://www.newulmmn.gov/206/Energy-Rebates",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "No single source-backed rule was selected for broad whole-building terms.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1531",
    "opportunityName": "Otter Tail Power Company - Commercial & Industrial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1531/otter-tail-power-company-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.otpco.com/rebates-and-efficiency-programs/business/programs/",
    "applicationUrl": null,
    "administrator": "Otter Tail Power Company",
    "programType": "Commercial And Industrial Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "Otter Tail Power Company"
        ],
        "notes": "Minnesota commercial forms were checked for this target; Otter Tail also operates in North Dakota and South Dakota with state-specific forms."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "public_entity",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional",
        "government"
      ],
      "eligibleRetrofitCategories": [
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "air_to_water_heat_pump",
        "heat_pump_water_heater",
        "electric_heating_equipment",
        "thermal_storage_heating_cooling",
        "smart_thermostat_zoning_retrofit",
        "led_lighting_retrofit",
        "new_construction_lighting",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_case_lighting_retrofit",
        "commercial_kitchen_equipment",
        "compressed_air_efficiency",
        "adjustable_speed_drive",
        "high_efficiency_motors",
        "ecm_motor_retrofit",
        "electric_forklift_material_handling",
        "electric_commercial_equipment",
        "facility_energy_assessment",
        "retrocommissioning",
        "custom_efficiency_project",
        "integrated_building_design",
        "publicly_owned_solar_pv"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Otter Tail Power business electric customer.",
        "State-specific forms and deadlines apply.",
        "EV charging station rebate requires Level 2 charging and off-peak service.",
        "Water-heating and thermal-storage measures may require qualifying controlled or off-peak service.",
        "Custom grants, integrated design, retro-commissioning, and other project-based measures require Otter Tail review."
      ],
      "blockers": [
        "Boilers and furnaces should not match unless as electric heating equipment or a validated custom project; no generic gas boiler or furnace rebate was verified.",
        "EV charging requires a Level 2 charger on an off-peak rate under the EV charging station program.",
        "Water-heater rebates are tied to qualifying equipment and often off-peak or controlled service; do not generalize to all water heaters.",
        "Publicly owned solar is a separate POP Solar incentive, not a generic commercial solar rebate.",
        "Refrigeration requires licensed contractor installation and is capped by purchase cost or annual electric bill."
      ],
      "programType": "Commercial And Industrial Energy Efficiency Rebate Program",
      "administrator": "Otter Tail Power Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.otpco.com/rebates-and-efficiency-programs/business/programs/",
      "sourceUrlsChecked": [
        "https://www.otpco.com/rebates-and-efficiency-programs/business/programs/",
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/rebates-commercial/",
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/refrigeration/",
        "https://www.otpco.com/media/fspbkton/mn-customer-rebate-application-form-3053_2026-fillable.pdf"
      ],
      "evidenceText": "Otter Tail's current commercial forms list rebates for lighting, heat pumps, EV charging, refrigeration, food service, compressed air, motors, drives, ECMs, electric commercial equipment, assessments, custom grants, thermal storage, and water heating.",
      "reasoningNotes": "Kept broad C&I electric-efficiency categories supported by current Otter Tail business pages. Gas boiler and furnace matches were blocked."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "GPT Pro found a Level 2 charger rebate, but this target is mapped to battery TOU/demand savings.",
        "sourceUrlsChecked": [
          "https://www.otpco.com/ways-to-save/rebates/electric-vehicles/",
          "https://www.otpco.com/business/ways-to-save/"
        ],
        "reasoningNotes": "Do not attach EVSE rebates to a battery-demand target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2178",
    "opportunityName": "Flathead Electric Cooperative - Residential Energy Efficiency Rebate Program",
    "state": "MT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2178/flathead-electric-cooperative-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.flatheadelectric.com/energy-solutions/energy-efficiency-rebate-programs/residential-rebate-programs/",
    "applicationUrl": null,
    "administrator": "Flathead Electric Cooperative",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 10,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MT"
        ],
        "counties": [],
        "cities": [
          "Kalispell",
          "Libby",
          "Whitefish",
          "Bigfork",
          "Columbia Falls",
          "Essex",
          "Lakeside"
        ],
        "utilityTerritories": [
          "Flathead Electric Cooperative"
        ],
        "notes": "Available within Flathead Electric Cooperative service territory in northwest Montana."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner",
        "manufactured_home_owner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "ductless_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat",
        "energy_star_residential_clothes_washer",
        "energy_star_residential_clothes_dryer",
        "insulation_upgrade",
        "duct_sealing",
        "window_replacement",
        "exterior_door_replacement",
        "manufactured_home_efficiency_upgrade"
      ],
      "hardRequirements": [
        "Applicant must be a Flathead Electric Cooperative residential member.",
        "Some measures require qualified installers, eligible equipment lists, pre-approval, or rebate form submission before the project starts.",
        "Smart thermostat rebate is tied to homes with electric heat or qualifying heat pump systems.",
        "Window and door measures must meet program specifications and documentation requirements."
      ],
      "blockers": [
        "Do not match commercial kitchen, refrigeration, industrial, or commercial laundry equipment.",
        "Do not treat general air-sealing tips as a standalone rebate unless tied to a current qualifying duct sealing, insulation, window, door, or manufactured-home measure.",
        "Direct official pages were intermittently inaccessible, so avoid adding unsupported categories beyond current official search-visible rebate pages."
      ],
      "programType": "Rebate",
      "administrator": "Flathead Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.flatheadelectric.com/energy-solutions/energy-efficiency-rebate-programs/residential-rebate-programs/",
      "sourceUrlsChecked": [
        "https://www.flatheadelectric.com/save-money-save-energy/rebates/",
        "https://www.flatheadelectric.com/energy-solutions/energy-efficiency-rebate-programs/residential-rebate-programs/",
        "https://www.flatheadelectric.com/energy-solutions/energy-efficiency-rebate-programs/residential-rebate-programs/heat-pumps/",
        "https://www.flatheadelectric.com/energy-solutions/energy-efficiency-rebate-programs/residential-rebate-programs/heat-pump-water-heaters/",
        "https://www.flatheadelectric.com/energy-solutions/understanding-your-electricity-usage/energy-conservation-ways-to-save/"
      ],
      "evidenceText": "Official Flathead Electric search-visible rebate pages list residential heat pumps, heat pump water heaters, smart thermostats, washers and dryers, insulation, windows, doors, duct sealing, and manufactured-home rebates.",
      "reasoningNotes": "Official pages timed out or blocked direct reading in places, but multiple current official indexed pages supported the repaired residential categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "GPT Pro found a smart-thermostat amount, but this target is mapped to motor/VFD efficiency.",
        "sourceUrlsChecked": [
          "https://www.flatheadelectric.com/energy-solutions/energy-efficiency-rebate-programs/residential-rebate-programs/smart-thermostats/"
        ],
        "reasoningNotes": "Do not attach a thermostat rebate to a motor/VFD target without a matching current motor/VFD formula.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "motor_vfd_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
