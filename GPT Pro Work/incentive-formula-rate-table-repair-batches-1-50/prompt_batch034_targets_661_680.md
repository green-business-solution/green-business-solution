You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 34
Targets in this prompt: 661-680 of 984
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
  "batchNumber": 34,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:4533"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2587",
    "opportunityName": "Spring Valley Public Utilities - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2587/spring-valley-public-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/spring-valley",
    "applicationUrl": null,
    "administrator": "Spring Valley Public Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 7,
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
          "MN"
        ],
        "counties": [],
        "cities": [
          "Spring Valley"
        ],
        "utilityTerritories": [
          "Spring Valley Public Utilities",
          "Southern Minnesota Municipal Power Agency"
        ],
        "notes": "Residential rebate list for Spring Valley municipal utility customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "renter"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_residential_appliance",
        "residential_cooling_equipment",
        "cooling_system_tune_up",
        "ecm_circulator_pump",
        "high_efficiency_furnace_fan_motor",
        "pool_pump_upgrade",
        "aerosol_duct_sealing",
        "residential_ev_charger",
        "battery_powered_outdoor_equipment",
        "e_bike"
      ],
      "hardRequirements": [
        "Applicant must be a Spring Valley Public Utilities residential customer.",
        "Applicant must use current 2026 residential rebate forms.",
        "ENERGY STAR products and equipment must meet the applicable form specifications.",
        "Detailed eligibility depends on current form requirements and utility approval."
      ],
      "blockers": [
        "Commercial dishwasher, refrigeration and business lighting measures are listed under separate Business Rebates, not Residential Rebates.",
        "Ground-source geothermal heat pumps are not verified on the current Spring Valley residential page.",
        "The furnace match is a furnace fan motor rebate, not full furnace replacement.",
        "Some linked form details are not fully accessible from the official member page."
      ],
      "programType": "Rebate Program",
      "administrator": "Spring Valley Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/spring-valley",
      "sourceUrlsChecked": [
        "https://smmpa.com/members/spring-valley"
      ],
      "evidenceText": "The current Spring Valley/SMMPA page separates Residential Rebates from Business Rebates. Residential forms include ENERGY STAR products, cooling equipment and tune-up, ECM circulator pumps, furnace fan motors, pool pumps, aerosol sealing, EV chargers and outdoor equipment; refrigeration and food-service forms are business measures.",
      "reasoningNotes": "Clear false commercial categories from a residential record. Do not retain geothermal, commercial dishwasher, refrigeration or LED lighting without current residential-form support."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "SMMPA/Bright Energy materials list many 2026 residential rebate forms but no single whole-building or matched-measure formula was selected.",
        "sourceUrlsChecked": [
          "https://smmpa.com/members/spring-valley",
          "https://programs.dsireusa.org/system/program/detail/2587"
        ],
        "reasoningNotes": "Target is whole-building custom efficiency with heat pump, furnace, geothermal and dishwasher terms; current form extraction is needed.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5368",
    "opportunityName": "Liberty Utilities - Residential and Small Business Energy Efficiency Rebate Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5368/liberty-utilities-residential-and-small-business-energy-efficiency-rebate-program",
    "websiteUrl": "https://missouri.libertyutilities.com/malden/residential/ways-to-save/natural-gas/index.html",
    "applicationUrl": "https://central.libertyutilities.com/uploads/EDG%20Rebate%20Updated%202025.03.21.pdf",
    "administrator": "Liberty Utilities Missouri",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "Liberty Utilities Missouri natural gas service territory"
        ],
        "notes": "Applies to qualifying Missouri Liberty natural-gas customers; exact community depends on the applicable Liberty Missouri gas service area."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "small_business_customer",
        "homeowner",
        "owner_occupant"
      ],
      "eligibleSectors": [
        "residential",
        "small_commercial"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "combination_space_water_heating",
        "natural_gas_tank_water_heater",
        "natural_gas_tankless_water_heater",
        "programmable_thermostat",
        "home_energy_audit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "home_energy_saving_kit"
      ],
      "hardRequirements": [
        "Applicant must be a Liberty Missouri gas customer on an eligible residential or small firm service rate for equipment rebates.",
        "Equipment rebates apply to qualifying natural-gas space-heating or water-heating equipment.",
        "Energize Liberty Homes is for Missouri homeowners with Liberty natural gas and requires an audit and building-shell savings tier.",
        "Program terms, documentation and installation requirements must be satisfied."
      ],
      "blockers": [
        "Battery storage is not supported by current Liberty Missouri gas rebate sources.",
        "Renewable systems, kitchen appliance upgrades, geothermal, high-efficiency air conditioning, electric water heaters and electric heat pumps with electric backup are not eligible.",
        "Energize Liberty Homes is a residential homeowner building-shell program and should not be matched to small-business weatherization.",
        "Do not match electric-only HVAC or non-gas water heating."
      ],
      "programType": "Rebate Program",
      "administrator": "Liberty Utilities Missouri",
      "applicationUrl": "https://central.libertyutilities.com/uploads/EDG%20Rebate%20Updated%202025.03.21.pdf",
      "websiteUrl": "https://missouri.libertyutilities.com/malden/residential/ways-to-save/natural-gas/index.html",
      "sourceUrlsChecked": [
        "https://missouri.libertyutilities.com/malden/residential/ways-to-save/natural-gas/index.html",
        "https://missouri.libertyutilities.com/canton/residential/ways-to-save/natural-gas/high-efficiency-equipment-rebate.html",
        "https://central.libertyutilities.com/all/residential/safety/natural-gas/energize-liberty-homes.html",
        "https://central.libertyutilities.com/uploads/EDG%20Rebate%20Updated%202025.03.21.pdf",
        "https://central.libertyutilities.com/uploads/terms%202024%282%29.pdf",
        "https://programs.dsireusa.org/system/program/detail/5368/liberty-utilities-residential-and-small-business-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Liberty]( Missouri pages list gas furnace, boiler, water-heating and thermostat rebates for residential and small firm gas customers, plus Energize Liberty Homes audit and building-shell savings tiers.",
      "reasoningNotes": "Natural-gas furnace, boiler, thermostat and weatherization matches are supported with sector limits. Battery storage and electric HVAC are false positives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Liberty Missouri gas source lists efficiency programs but exact furnace, boiler, thermostat or weatherization values were not verified.",
        "sourceUrlsChecked": [
          "https://missouri.libertyutilities.com/malden/residential/ways-to-save/natural-gas/index.html"
        ],
        "reasoningNotes": "No whole-building or current measure-specific rule was safely selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4820",
    "opportunityName": "Unitil (Gas) - Commercial and Industrial Energy Efficiency Programs",
    "state": "NH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4820/unitil-gas-commercial-and-industrial-energy-efficiency-programs",
    "websiteUrl": "https://unitil.com/ways-to-save/rebates-incentives",
    "applicationUrl": "https://nhsaves.com/wp-content/uploads/2026/01/2026_NaturalGasRebates_Commercial.pdf",
    "administrator": "Unitil / NHSaves",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
          "NH"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Unitil natural gas service territory in New Hampshire"
        ],
        "notes": "Commercial natural gas rebates are administered through NHSaves forms for Unitil and Liberty natural gas business or municipal customers."
      },
      "eligibleApplicantTypes": [
        "commercial_natural_gas_customer",
        "municipal_natural_gas_customer",
        "multifamily_property_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "municipal",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "boiler_controls_burner_retrofit",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_gas_furnace",
        "high_efficiency_gas_water_heater",
        "programmable_wifi_thermostat",
        "steam_trap_replacement",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "high_efficiency_steamer",
        "high_efficiency_griddle",
        "pre_rinse_spray_valve"
      ],
      "hardRequirements": [
        "Applicant must be a Unitil natural gas business or municipal customer in New Hampshire for the applicable form.",
        "Equipment must be new, qualifying, and installed during the current program year.",
        "Applications and required documentation must be submitted by the program deadline.",
        "Installation must meet NHSaves and licensed contractor requirements where specified."
      ],
      "blockers": [
        "Smart thermostat zoning is too broad; current support is for qualifying programmable or Wi-Fi thermostat/control measures.",
        "Foodservice categories are limited to listed natural-gas commercial kitchen equipment, not all kitchen equipment.",
        "Do not match electric-only or residential appliance measures to this gas commercial and industrial program."
      ],
      "programType": "Rebate",
      "administrator": "Unitil / NHSaves",
      "applicationUrl": "https://nhsaves.com/wp-content/uploads/2026/01/2026_NaturalGasRebates_Commercial.pdf",
      "websiteUrl": "https://unitil.com/ways-to-save/rebates-incentives",
      "sourceUrlsChecked": [
        "https://unitil.com/ways-to-save/rebates-incentives",
        "https://nhsaves.com/wp-content/uploads/2026/01/2026_NaturalGasRebates_Commercial.pdf",
        "https://nhsaves.com/wp-content/uploads/2026/01/2026_NaturalGasKitchenRebates_Commercial-2.pdf",
        "https://nhsaves.com/wp-content/uploads/2026/01/CIM2026NaturalGas_R1.pdf"
      ],
      "evidenceText": "NHSaves]( 2026 forms list Unitil and Liberty commercial natural gas rebates for boilers, furnaces, water heaters, controls, thermostats, steam traps, and qualifying kitchen equipment.",
      "reasoningNotes": "The current source supports the main gas C&I categories; map thermostats narrowly and keep foodservice product-specific."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Unitil C&I gas programs contain measure-specific equipment rebates, but exact boiler/food-service values were not verified in accessible text.",
        "sourceUrlsChecked": [
          "http://www.unitil.com/energy-efficiency/natural-gas-programs-rebates-assistance-for-businesses"
        ],
        "reasoningNotes": "No safe commercial kitchen rule should be created without the current table.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2615",
    "opportunityName": "South Jersey Gas - Residential Energy Efficiency Rebate Program",
    "state": "NJ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2615/south-jersey-gas-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.southjerseygas.com/save-energy-money/energy-efficiency-programs",
    "applicationUrl": "https://sjgsaveenergy.clearesult.com/sjg/hvac-water-heating-rebates/",
    "administrator": "South Jersey Gas",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "NJ"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "South Jersey Gas service territory"
        ],
        "notes": "Applies to eligible South Jersey Gas residential customers in the utility's New Jersey service territory."
      },
      "eligibleApplicantTypes": [
        "South Jersey Gas residential customers",
        "homeowners",
        "residential account holders",
        "income-qualified residential customers for weatherization or enhanced pathways",
        "participating contractors submitting qualifying installations"
      ],
      "eligibleSectors": [
        "residential",
        "low_income_residential"
      ],
      "eligibleRetrofitCategories": [
        "gas_furnace",
        "gas_boiler",
        "gas_combination_boiler_water_heater",
        "boiler_reset_controls",
        "gas_storage_water_heater",
        "tankless_gas_water_heater",
        "indirect_fired_water_heater",
        "central_air_conditioner_limited",
        "smart_thermostat_limited",
        "whole_home_energy_solutions",
        "home_energy_assessment",
        "free_home_weatherization_income_qualified",
        "discounted_smart_thermostats",
        "discounted_energy_saving_water_fixtures"
      ],
      "hardRequirements": [
        "Applicant must have an active South Jersey Gas residential account.",
        "Heating or water-heating rebates require qualifying natural-gas equipment and use of natural gas for the applicable end use as specified in program materials.",
        "Applications and paid invoices must generally be submitted within 120 days of installation.",
        "Current gas and electric rebate form covers installation dates from January 1, 2025 through June 30, 2027, subject to funding and program changes.",
        "Newly constructed homes are not eligible for the listed existing-home HVAC and water-heating rebates.",
        "Smart thermostats may need to be included with eligible HVAC equipment or purchased through the approved marketplace path."
      ],
      "blockers": [
        "This is a residential gas program and should not be matched to commercial measures.",
        "Air conditioner support is limited and should not be generalized to a standalone electric HVAC rebate without confirming the customer's electric utility and rebate form eligibility.",
        "Weatherization and whole-home services are separate program pathways, including income-qualified free weatherization, and should not be treated as ordinary equipment rebates for every customer.",
        "Audit or assessment terms are services and not physical retrofits by themselves.",
        "Do not map this record to electric heat pumps, EV charging, refrigeration, lighting or commercial kitchen measures."
      ],
      "programType": "Rebate Program",
      "administrator": "South Jersey Gas",
      "applicationUrl": "https://sjgsaveenergy.clearesult.com/sjg/hvac-water-heating-rebates/",
      "websiteUrl": "https://www.southjerseygas.com/save-energy-money/energy-efficiency-programs",
      "sourceUrlsChecked": [
        "https://www.southjerseygas.com/save-energy-money/energy-efficiency-programs",
        "https://www.southjerseygas.com/rebate-offers",
        "https://sjgsaveenergy.clearesult.com/sjg/hvac-water-heating-rebates/",
        "https://sjgsaveenergy.clearesult.com/sjg/sites/sjg/files/2025-07/SJG%20Gas%20and%20Electric%20Rebate%20Form.pdf",
        "https://programs.dsireusa.org/system/program/detail/2615/south-jersey-gas-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "South Jersey Gas's energy-efficiency page lists residential HVAC and water-heating rebates, whole-home energy solutions, free home weatherization, and discounted smart thermostats and water fixtures. The HVAC and water-heating rebate page states eligible customers can receive rebates for high-efficiency heating and water-heating equipment, with applications and paid invoices due within 120 days. The current rebate form lists gas furnaces, boilers, reset controls, gas water heaters, tankless and indirect water heaters, smart thermostats and central AC tiers.",
      "reasoningNotes": "The record is active and residential. The repair keeps gas heating and water-heating categories, limited thermostat/AC and separate weatherization pathways, while blocking commercial and unsupported electric retrofit matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "South Jersey Gas page gives up-to ranges for heating and water heating equipment but not a single source-backed measure amount for this target.",
        "sourceUrlsChecked": [
          "https://www.southjerseygas.com/rebate-offers",
          "https://www.southjerseygas.com/save-energy-money/energy-efficiency-programs"
        ],
        "reasoningNotes": "Exact furnace/boiler/thermostat values require the current application table.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4623",
    "opportunityName": "New Mexico Gas Company - Commercial Efficiency Programs",
    "state": "NM",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4623/new-mexico-gas-company-commercial-efficiency-programs",
    "websiteUrl": "https://newmexicoefficiency.com/nmg/",
    "applicationUrl": null,
    "administrator": "New Mexico Gas Company / CLEAResult",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "boiler",
          "condensing boiler"
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
          "NM"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "New Mexico Gas Company"
        ],
        "notes": "Applies to qualifying commercial, school, business and small-business natural gas customers in NMGC service territory."
      },
      "eligibleApplicantTypes": [
        "commercial_gas_customers",
        "small_business_customers",
        "schools",
        "institutional_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional",
        "education",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "smart_thermostat_zoning_retrofit",
        "commercial_water_heating",
        "commercial_kitchen_gas_equipment",
        "commercial_laundry_equipment",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "building_envelope_gas_savings",
        "process_efficiency_gas_savings",
        "pipe_insulation",
        "steam_trap_repair"
      ],
      "hardRequirements": [
        "Customer must have an active qualifying New Mexico Gas Company commercial account.",
        "Measures must reduce natural gas use and meet Efficient Buildings, small-business, prescriptive, custom, or direct-install requirements.",
        "Small-business space-heating rebates require annual therm usage at or below the program threshold and installation by an authorized participating contractor except allowed thermostat measures.",
        "New equipment, invoices, model documentation, deadlines, inspections, and available funding limits apply."
      ],
      "blockers": [
        "Do not match electric heat pumps or electric HVAC under this gas efficiency record.",
        "Do not infer residential appliances from commercial gas-efficiency offers.",
        "Commercial kitchen matches must stay product-specific gas equipment, not broad commercial kitchen electrification."
      ],
      "programType": "Rebate Program",
      "administrator": "New Mexico Gas Company / CLEAResult",
      "applicationUrl": null,
      "websiteUrl": "https://newmexicoefficiency.com/nmg/",
      "sourceUrlsChecked": [
        "https://www.nmgco.com/en/business_energy_efficiency_savings_and_rebates",
        "https://newmexicoefficiency.com/nmg/",
        "https://newmexicoefficiency.com/nmg/programs/equipment-rebates/",
        "https://newmexicoefficiency.com/nmg/programs/custom-incentives/",
        "https://newmexicoefficiency.com/nmg/savings/commercial-industrial/",
        "https://nmgcgetrebates.com/small-business-rebates"
      ],
      "evidenceText": "Current]( NMGC business pages support prescriptive and custom natural-gas incentives for space heating, water heating, commercial kitchen and laundry equipment, building envelope, process improvements and direct-install assessments.",
      "reasoningNotes": "The original dishwasher, fryer and oven matches are valid only as gas commercial kitchen equipment; generic high-efficiency HVAC should be narrowed to qualifying gas space-heating equipment."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "New Mexico Gas commercial rebates include gas equipment and food-service measures, but exact 2026 values were not verified.",
        "sourceUrlsChecked": [
          "https://www.nmgco.com/en/business_energy_efficiency_savings_and_rebates"
        ],
        "reasoningNotes": "A current application table is needed before selecting furnace, boiler, fryer, oven or dishwasher values.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2152",
    "opportunityName": "Columbia River PUD - Commercial Energy Efficiency Rebate Programs",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2152/columbia-river-pud-commercial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.crpud.net/ways-to-save/at-work/",
    "applicationUrl": null,
    "administrator": "Columbia River PUD",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 7,
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration",
          "freezer",
          "display case"
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
          "walk in cooler"
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
        "counties": [
          "Columbia County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Columbia River PUD commercial electric service territory"
        ],
        "notes": "Available to eligible Columbia River PUD business customers in its Oregon service territory."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business_customer",
        "nonresidential_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "nonresidential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_heat_pump",
        "variable_refrigerant_flow_system",
        "advanced_rooftop_unit_controls",
        "connected_thermostat",
        "insulation_upgrade",
        "window_replacement",
        "led_lighting_retrofit",
        "commercial_refrigeration_upgrade",
        "walk_in_cooler_freezer_upgrade",
        "display_case_refrigeration_motor_upgrade",
        "commercial_kitchen_equipment_efficiency",
        "energy_audit"
      ],
      "hardRequirements": [
        "Must be an eligible Columbia River PUD business customer.",
        "Lighting incentives require program site visit or pre-approval before installation.",
        "Connected thermostat rebates require replacing non-web-enabled thermostats in eligible commercial spaces.",
        "Commercial refrigeration and kitchen measures must be qualifying product-specific measures.",
        "Free energy evaluations may identify qualifying measures but are not themselves a rebate payment."
      ],
      "blockers": [
        "Do not match residential measures under this commercial At Work program.",
        "Do not overgeneralize display case or walk-in cooler motor measures into all refrigeration equipment.",
        "Do not match smart thermostat zoning unless the project fits the commercial connected thermostat requirements.",
        "Do not match unsupported industrial process or water measures without separate official confirmation."
      ],
      "programType": "Rebate Program",
      "administrator": "Columbia River PUD",
      "applicationUrl": null,
      "websiteUrl": "https://www.crpud.net/ways-to-save/at-work/",
      "sourceUrlsChecked": [
        "https://www.crpud.net/ways-to-save/at-work/",
        "https://www.crpud.net/ways-to-save/at-work/free-energy-evaluations/",
        "https://www.crpud.net/ways-to-save/at-work/heating-and-cooling/air-source-heat-pumps/",
        "https://www.crpud.net/ways-to-save/at-work/heating-and-cooling/ductless-heat-pumps/",
        "https://www.crpud.net/ways-to-save/at-work/heating-and-cooling/connected-thermostats/",
        "https://www.crpud.net/ways-to-save/at-work/commercial-kitchen-and-refrigeration-programs/",
        "https://www.crpud.net/ways-to-save/at-work/insulation-windows/insulation-upgrade/",
        "https://www.crpud.net/ways-to-save/at-work/insulation-windows/window-replacement/",
        "https://www.crpud.net/ways-to-save/at-work/lighting/lighting-retrofits/",
        "https://www.crpud.net/ways-to-save/at-work/heating-and-cooling/advanced-rooftop-unit-control-arc-retrofits/"
      ],
      "evidenceText": "CRPUD At Work pages list commercial heat pumps, ductless heat pumps, connected thermostats, advanced rooftop controls, VRF, insulation/windows, lighting and commercial kitchen/refrigeration measures.",
      "reasoningNotes": "Some official pages were partially inaccessible, but official page titles, menus and snippets consistently support the commercial measure list."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Columbia River PUD C&I materials identify efficiency programs but no current custom per-kWh or refrigeration formula was verified.",
        "sourceUrlsChecked": [
          "https://www.crpud.net/save-energy-money/business-rebates/",
          "https://programs.dsireusa.org/system/program/detail/2152"
        ],
        "reasoningNotes": "No safe whole-building custom rule found.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4806",
    "opportunityName": "Dominion Energy (Electric) - Residential EnergyWise Program",
    "state": "SC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4806/dominion-energy-electric-residential-energywise-program",
    "websiteUrl": "https://www.dominionenergy.com/south-carolina/save-energy?tab=1",
    "applicationUrl": null,
    "administrator": "Dominion Energy South Carolina",
    "programType": "Residential Electric Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "SC"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Dominion Energy South Carolina electric service territory"
        ],
        "notes": "Residential EnergyWise heating and cooling rebates apply to Dominion Energy South Carolina electric customers; separate natural-gas rebates exist for gas equipment."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "renter_with_account_or_owner_authorization"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "central_air_conditioner",
        "heat_pump_hvac_retrofit",
        "electric_furnace_to_heat_pump_conversion",
        "duct_sealing_and_insulation",
        "ductwork_replacement",
        "heat_pump_water_heater",
        "energy_star_pool_pump",
        "home_energy_checkup"
      ],
      "hardRequirements": [
        "Customer must be an eligible Dominion Energy South Carolina residential electric customer for EnergyWise electric measures.",
        "Heating and cooling rebates require qualifying ENERGY STAR central A/C or heat pump equipment.",
        "Ductwork and heat pump water heater incentives must meet Dominion Energy specifications."
      ],
      "blockers": [
        "Do not match gas furnace or gas water heater replacements to the electric Residential EnergyWise record.",
        "Do not match broad insulation or air-sealing rebates unless a current EnergyWise page explicitly supports them.",
        "Battery, solar, thermostat demand response, and natural-gas neighborhood offers are separate programs."
      ],
      "programType": "Residential Electric Rebate Program",
      "administrator": "Dominion Energy South Carolina",
      "applicationUrl": null,
      "websiteUrl": "https://www.dominionenergy.com/south-carolina/save-energy?tab=1",
      "sourceUrlsChecked": [
        "https://www.dominionenergy.com/en/South-Carolina/Save-Energy",
        "https://www.dominionenergy.com/en/South-Carolina/Save-Energy/Heating-and-Cooling-Rebates"
      ],
      "evidenceText": "Dominion Energy South Carolina lists EnergyWise residential electric savings for ENERGY STAR central A/C and heat pumps, electric-furnace-to-heat-pump conversions, ductwork improvements, heat pump water heaters, and pool pumps.",
      "reasoningNotes": "The original furnace, broad insulation, and air-sealing matches should be blocked for this electric EnergyWise record."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Dominion EnergyWise residential program pages describe services and rebates but did not expose a current motor/HPWH formula in accessible text.",
        "sourceUrlsChecked": [
          "https://www.dominionenergy.com/south-carolina/save-energy/home-energy-check-up",
          "https://programs.dsireusa.org/system/program/detail/4806"
        ],
        "reasoningNotes": "No official source-backed one-time amount was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2016",
    "opportunityName": "Austin Energy - Weatherization Assistance Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2016/austin-energy-weatherization-assistance-program",
    "websiteUrl": "https://savings.austinenergy.com/rebates/residential/offerings/home-improvements/weatherization",
    "applicationUrl": null,
    "administrator": "Austin Energy",
    "programType": "Weatherization Assistance Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
        "notes": "Available to qualifying Austin Energy customers meeting income, home, and prior-participation rules."
      },
      "eligibleApplicantTypes": [
        "income_qualified_residential_customer",
        "homeowner",
        "renter_with_owner_authorization",
        "customer_assistance_program_participant",
        "medically_vulnerable_registry_participant"
      ],
      "eligibleSectors": [
        "residential",
        "income_qualified_residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "attic_insulation",
        "duct_sealing_and_repair",
        "solar_screens",
        "led_lighting_retrofit",
        "hvac_tune_up",
        "smart_thermostat",
        "reflective_roof_coating_mobile_home"
      ],
      "hardRequirements": [
        "Customer must be an Austin Energy customer enrolled in the Customer Assistance Program or Medically Vulnerable Registry and meet income limits.",
        "Eligible homes are limited by dwelling type, size, value, age, and prior receipt of related Austin Energy programs.",
        "Measures are provided or recommended through the Weatherization Assistance pathway."
      ],
      "blockers": [
        "Do not match generic window replacement; the program supports solar screens, not replacement windows.",
        "Do not match general roof replacement; reflective roof coating is limited to qualifying mobile homes.",
        "Full A/C replacement, HPWH, solar, and batteries are separate Austin Energy offerings unless specifically routed through this assistance program."
      ],
      "programType": "Weatherization Assistance Program",
      "administrator": "Austin Energy",
      "applicationUrl": null,
      "websiteUrl": "https://savings.austinenergy.com/rebates/residential/offerings/home-improvements/weatherization",
      "sourceUrlsChecked": [
        "https://savings.austinenergy.com/rebates/residential/offerings/home-improvements/weatherization",
        "https://services.austintexas.gov/edims/document.cfm?id=432183",
        "https://austinenergy.com/energy-efficiency/rebates-incentives/residential"
      ],
      "evidenceText": "Austin Energy weatherization materials list attic insulation, air infiltration work, duct sealing or repair, solar screens, LED lighting, A/C tune-up, smart thermostat, and reflective roof coating for mobile homes.",
      "reasoningNotes": "Keep the income-qualified weatherization measures. Remove broad HVAC replacement, window replacement, and unrelated separate residential rebates."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Austin Weatherization Assistance is an income-qualified service/weatherization pathway rather than a reusable cash rebate formula.",
        "sourceUrlsChecked": [
          "https://savings.austinenergy.com/rebates/residential/offerings/home-improvements/weatherization"
        ],
        "reasoningNotes": "No-cost assistance and inspections should not be forced into a one-time project incentive rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2412",
    "opportunityName": "Rocky Mountain Power - wattsmart Business Program",
    "state": "UT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2412/rocky-mountain-power-wattsmart-business-program",
    "websiteUrl": "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-utah.html",
    "applicationUrl": "https://wattsmartbusiness.com/",
    "administrator": "Rocky Mountain Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "UT"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Rocky Mountain Power Utah service territory"
        ],
        "notes": "Limited to eligible Utah non-residential Rocky Mountain Power rate schedules."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "non_residential_customer",
        "property_owner",
        "trade_ally_assisted_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "agricultural",
        "municipal"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "hvac_controls_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_laundry_equipment",
        "high_efficiency_refrigeration_equipment",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "variable_frequency_drive_retrofit",
        "motors_pumps_fans_drives",
        "compressed_air_system_upgrade",
        "commercial_foodservice_equipment",
        "building_envelope_upgrade"
      ],
      "hardRequirements": [
        "Facility must be served on an eligible Rocky Mountain Power Utah non-residential electric schedule.",
        "Qualifying equipment must be installed at an eligible customer location.",
        "Required application, tax, invoice and technical documentation must be submitted.",
        "Prescriptive and custom incentives are subject to measure specifications, caps and utility approval."
      ],
      "blockers": [
        "This is not the Rocky Mountain Power residential Wattsmart Homes program.",
        "Commercial clothes washer incentives are product-specific and should not imply residential laundry rebates.",
        "Heat pump water heater incentives are for qualifying units used in a business context.",
        "Measures outside the Utah eligible schedules or without required approval should not match."
      ],
      "programType": "Rebate Program",
      "administrator": "Rocky Mountain Power",
      "applicationUrl": "https://wattsmartbusiness.com/",
      "websiteUrl": "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-utah.html",
      "sourceUrlsChecked": [
        "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-utah.html",
        "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-utah/ut-incentive-lists.html",
        "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-utah/ut-incentive-lists/ut-appliances-office.html",
        "https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-utah/ut-incentive-lists/ut-hvac.html"
      ],
      "evidenceText": "Utah wattsmart Business is for Rocky Mountain Power non-residential customers on specified Utah schedules. Current pages list lighting and controls, HVAC, motors and drives, food service, compressed air, building envelope and appliances such as business-use heat pump water heaters and commercial clothes washers.",
      "reasoningNotes": "Retain the C&I equipment categories only in a non-residential context. Appliance terms are supported as business/appliance measures, not residential home upgrades."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official business page points to incentives but does not expose measure values in accessible text.",
        "sourceUrlsChecked": [
          "https://www.rockymountainpower.net/savings-energy-choices/business.html"
        ],
        "reasoningNotes": "The target spans several measure types; no single official table value was safely selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2478",
    "opportunityName": "Grays Harbor PUD - Residential Energy Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2478/grays-harbor-pud-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ghpud.org/energy-efficiency/residential-programs/",
    "applicationUrl": null,
    "administrator": "Grays Harbor PUD",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 7,
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
          "WA"
        ],
        "counties": [
          "Grays Harbor County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Grays Harbor PUD"
        ],
        "notes": "Available to qualifying Grays Harbor PUD residential electric customers. Some pages identify single-family, manufactured-home and multifamily eligibility by measure."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_owner_approval",
        "multifamily_property_owner"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "window_replacement",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_laundry_equipment",
        "air_sealing_weatherization"
      ],
      "hardRequirements": [
        "Applicant must be a Grays Harbor PUD residential customer or qualifying property served by the utility.",
        "Measures must meet the current residential program requirements.",
        "Some water-heating and appliance measures apply to existing homes and are not for new construction.",
        "Required applications and documentation must be submitted for each measure."
      ],
      "blockers": [
        "Duct sealing was not verified in current official indexed program pages and should not be retained without administrator confirmation.",
        "Broad high-efficiency HVAC should be limited to verified heat-pump heating and cooling measures.",
        "Laundry support is residential appliance-specific and not commercial laundry or water-efficiency retrofit generally.",
        "Direct official page fetch returned forbidden, so measure amounts and detailed requirements should be confirmed before automated high-specificity matching."
      ],
      "programType": "Rebate Program",
      "administrator": "Grays Harbor PUD",
      "applicationUrl": null,
      "websiteUrl": "https://www.ghpud.org/energy-efficiency/residential-programs/",
      "sourceUrlsChecked": [
        "https://www.ghpud.org/energy-efficiency/residential-programs/",
        "https://www.ghpud.org/energy-efficiency/residential-programs/heating-cooling/",
        "https://www.ghpud.org/energy-efficiency/residential-programs/residential-insulation-windows/",
        "https://www.ghpud.org/energy-efficiency/energy-audits/",
        "https://www.ghpud.org/energy-efficiency/residential-programs/water-heating/",
        "https://www.ghpud.org/energy-efficiency/residential-programs/residential-rebate-application-for-heat-pump-water-heater/",
        "https://www.ghpud.org/energy-efficiency/residential-programs/residential-rebate-application-for-appliance-rebate-programs/",
        "https://programs.dsireusa.org/system/program/detail/2478/grays-harbor-pud-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Official]( GHPUD indexed pages identify residential heat pump water heater, heating and cooling, smart thermostat, insulation and windows, appliance, and free energy audit offerings; direct page fetch returned forbidden.",
      "reasoningNotes": "Enough official indexed content exists to keep the program active, but confidence is medium because direct pages were inaccessible during review."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official page lists residential program categories and application forms but no whole-building per-kWh formula.",
        "sourceUrlsChecked": [
          "https://www.ghpud.org/energy-efficiency/residential-programs/"
        ],
        "reasoningNotes": "Source supports measure-specific applications only.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2207",
    "opportunityName": "Lewis County PUD - Commercial and Industrial Energy Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2207/lewis-county-pud-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.lcpud.org/save-energy/commercial-industrial/",
    "applicationUrl": null,
    "administrator": "Public Utility District No. 1 of Lewis County",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 7,
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
          "WA"
        ],
        "counties": [
          "Lewis County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Lewis County PUD"
        ],
        "notes": "Available to qualifying commercial and industrial customers served by Public Utility District No. 1 of Lewis County."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "business"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "commercial_weatherization",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "led_lighting_retrofit",
        "commercial_refrigeration_upgrades",
        "compressed_air_efficiency",
        "variable_frequency_drive_retrofit",
        "controls_upgrade",
        "strategic_energy_management"
      ],
      "hardRequirements": [
        "Applicant must be a qualifying Lewis County PUD commercial or industrial customer.",
        "Commercial heat pumps must be installed by a licensed contractor and meet equipment documentation requirements.",
        "Commercial weatherization requires an energy audit before installation and an electrically heated building.",
        "Industrial measures must follow the utility or BPA Energy Smart Industrial requirements."
      ],
      "blockers": [
        "Energy audit is a prerequisite for commercial weatherization and should not be treated as a standalone rebate category unless separately verified.",
        "Broad air conditioner or high-efficiency HVAC replacement was not verified beyond heat-pump measures.",
        "No residential appliance or residential weatherization matches should be inferred from this C&I program.",
        "Direct official page fetch returned forbidden, so amounts and detailed requirements need confirmation before precise automated matching."
      ],
      "programType": "Rebate Program",
      "administrator": "Public Utility District No. 1 of Lewis County",
      "applicationUrl": null,
      "websiteUrl": "https://www.lcpud.org/save-energy/commercial-industrial/",
      "sourceUrlsChecked": [
        "https://www.lcpud.org/save-energy/commercial-industrial/",
        "https://www.lcpud.org/energy-efficiency/rebates/commercial-industrial/",
        "https://www.lcpud.org/energy-efficiency/rebates/commercial-industrial/commercial-heat-pumps/",
        "https://www.lcpud.org/energy-efficiency/rebates/commercial-industrial/commercial-weatherization/",
        "https://www.lcpud.org/energy-efficiency/rebates/commercial-industrial/lighting/",
        "https://www.lcpud.org/energy-efficiency/rebates/commercial-industrial/industrial-programs/",
        "https://programs.dsireusa.org/system/program/detail/2207/lewis-county-pud-commercial-and-industrial-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Lewis]( County PUD official indexed pages identify commercial heat pumps, commercial weatherization, lighting, and industrial lighting, compressed-air, drives-controls, refrigeration and SEM programs, though direct page fetch returned forbidden.",
      "reasoningNotes": "The program appears active from official indexed pages, but confidence is medium because direct pages were not readable during review."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official page points to energy audit, rebates and commercial/industrial resources but no kitchen-equipment formula.",
        "sourceUrlsChecked": [
          "https://www.lcpud.org/save-energy/commercial-industrial/"
        ],
        "reasoningNotes": "No source-backed commercial kitchen or refrigeration measure amount was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2241",
    "opportunityName": "Vera Water & Power - Residential Energy Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2241/vera-water-and-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://verawaterandpower.com/rebates-savings/residential-incentives/",
    "applicationUrl": null,
    "administrator": "Vera Water and Power",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 7,
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
          "ev charger"
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
          "exterior door",
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
          "WA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Vera Water and Power residential service territory"
        ],
        "notes": "Official pages were intermittently access-limited, but current official snippets and Vera news confirmed residential incentive scope."
      },
      "eligibleApplicantTypes": [
        "residential_utility_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "exterior_door_replacement",
        "window_replacement",
        "patio_door_replacement",
        "insulation_upgrade",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a residential customer within Vera Water and Power service territory.",
        "Weatherization incentives apply to qualifying electrically heated homes where specified.",
        "Heat pump, heat pump water heater, EV charger, and smart thermostat incentives require qualifying equipment and program forms.",
        "EV charger incentive is for Level 2 charging equipment."
      ],
      "blockers": [
        "Do not match generic EV charger categories unless the charger is Level 2.",
        "Weatherization rebates should not match non-electric-heated homes when the form limits apply.",
        "Commercial incentives and conservation offerings are separate from this residential rebate record."
      ],
      "programType": "Rebate",
      "administrator": "Vera Water and Power",
      "applicationUrl": null,
      "websiteUrl": "https://verawaterandpower.com/rebates-savings/residential-incentives/",
      "sourceUrlsChecked": [
        "https://verawaterandpower.com/rebates-savings/residential-incentives/",
        "https://verawaterandpower.com/faqs_category/residential-rebates/",
        "https://verawaterandpower.com/rebates-savings/appliance-rebate-form/",
        "https://verawaterandpower.com/rebates-savings/heat-pump-rebate-form/",
        "https://verawaterandpower.com/rebates-savings/smart-thermostat-rebate-form/",
        "https://verawaterandpower.com/2025/01/maximize-your-savings-with-energy-efficiency-incentives/"
      ],
      "evidenceText": "Current]( Vera residential incentive materials identify heat pumps, HPWHs, insulation, windows and patio doors, exterior doors, smart thermostats, and Level 2 EV charger incentives.",
      "reasoningNotes": "Confidence is medium because some official pages were access-limited, but multiple current official results supported the same residential categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Vera source found a small Level 2 charger rebate listing but official appliance rebate form amount needs verification.",
        "sourceUrlsChecked": [
          "https://verawaterandpower.com/rebates-savings/appliance-rebate-form/",
          "https://vera.chooseev.com/promos/"
        ],
        "reasoningNotes": "The EV target should be reviewed against the current official form before merging.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5704",
    "opportunityName": "TVA - Residential Energy Efficiency Rebate Program",
    "state": "AL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5704/tva-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://energyright.com/residential/rebates/",
    "applicationUrl": "https://energyright.com/residential/rebates/",
    "administrator": "TVA EnergyRight",
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
          "AL",
          "GA",
          "KY",
          "MS",
          "NC",
          "TN",
          "VA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "TVA-served participating local power company territories"
        ],
        "notes": "Target state is Kentucky, but TVA EnergyRight residential rebates are administered through participating local power companies across the TVA service area."
      },
      "eligibleApplicantTypes": [
        "residential customers of participating TVA local power companies",
        "homeowners",
        "residential account holders",
        "customers using TVA Quality Contractor Network contractors"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "central_air_conditioner",
        "air_source_heat_pump",
        "dual_fuel_heat_pump",
        "ductless_mini_split_heat_pump",
        "geothermal_ground_source_heat_pump",
        "duct_sealing",
        "duct_repair",
        "duct_insulation",
        "hvac_tune_up",
        "attic_insulation",
        "wall_insulation",
        "envelope_air_sealing",
        "smart_thermostat_rewards_limited"
      ],
      "hardRequirements": [
        "Applicant must be served by a participating TVA local power company for the home receiving the measure.",
        "Many eligible HVAC, duct and insulation measures must be installed by a TVA EnergyRight Quality Contractor Network contractor.",
        "Equipment must satisfy TVA EnergyRight efficiency and installation requirements for the applicable rebate category.",
        "Rebate eligibility and redemption may require TVA EnergyRight application or claim workflow after installation.",
        "Program offerings, financing availability and local participation may vary by local power company."
      ],
      "blockers": [
        "The imported primary savings model mapping to motor, VFD, pump or compressed-air efficiency is a false positive; this is a residential home-efficiency program.",
        "Do not map this record to commercial or industrial measures.",
        "Smart thermostat support is limited to EnergyRight thermostat or rewards offerings and should not be treated as a broad standalone retrofit unless the current program path applies.",
        "Water-heating measures were not retained because the current checked target sources for this repair supported HVAC, duct, insulation, air sealing and thermostat categories more clearly than a current residential HPWH line item."
      ],
      "programType": "Rebate Program",
      "administrator": "TVA EnergyRight",
      "applicationUrl": "https://energyright.com/residential/rebates/",
      "websiteUrl": "https://energyright.com/residential/rebates/",
      "sourceUrlsChecked": [
        "https://energyright.com/residential/rebates/",
        "https://energyright.com/residential/rebates/heat-pump/",
        "https://energyright.com/residential/rebates/duct-sealing-hvac-tune-up/",
        "https://energyright.com/residential/rebates/home-insulation-air-sealing/",
        "https://energyright.com/residential/rebates/smartthermostat/",
        "https://programs.dsireusa.org/system/program/detail/5704/tva-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "TVA EnergyRight's residential rebate pages list eligible upgrades including geothermal heat pumps, mini splits, heat pumps, central air conditioning, duct sealing or HVAC tune-up, air sealing and insulation, and require EnergyRight contractor and measure-specific rules for many rebates.",
      "reasoningNotes": "The record is active as a TVA residential rebate program. Categories were limited to residential EnergyRight measures and false commercial motor/VFD mappings were blocked."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "GPT Pro found HVAC and duct rebate values, but this target is mapped to motor/VFD efficiency.",
        "sourceUrlsChecked": [
          "https://energyright.com/residential/rebates/",
          "https://energyright.com/residential/rebates/heat-pump/"
        ],
        "reasoningNotes": "Do not attach HVAC/duct rules to a motor/VFD target without a matching motor measure.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1903",
    "opportunityName": "Roseville Electric - Commercial Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1903/roseville-electric-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.roseville.ca.gov/electric_utility/commercial_rebates/index.php?id=1205&rz=catalogueDetails",
    "applicationUrl": null,
    "administrator": "Roseville Electric Utility",
    "programType": "Commercial Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 6,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "ev_charging_site_assessment",
        "displayName": "EV charging site assessment",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "site assessment"
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
          "Placer County"
        ],
        "cities": [
          "Roseville"
        ],
        "utilityTerritories": [
          "Roseville Electric Utility"
        ],
        "notes": "Measures must be installed at commercial accounts receiving Roseville Electric Utility service; multifamily eligibility is generally limited to common areas unless the utility directs otherwise."
      },
      "eligibleApplicantTypes": [
        "roseville_electric_commercial_customers",
        "business_customers",
        "commercial_property_owners",
        "multifamily_property_owners"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily_common_areas"
      ],
      "eligibleRetrofitCategories": [
        "commercial_heat_pump_hvac_retrofit",
        "high_efficiency_commercial_air_conditioning",
        "commercial_hvac_tune_up",
        "smart_thermostat",
        "led_lighting_retrofit",
        "commercial_reach_in_refrigerator",
        "commercial_reach_in_freezer"
      ],
      "hardRequirements": [
        "Project site must receive Roseville Electric Utility service.",
        "Commercial HVAC and smart thermostat projects require reservation approval; permits and final permits are required where applicable.",
        "Commercial HVAC program rebates are subject to funding availability and reservation timelines.",
        "For multifamily properties, commercial HVAC rebates are limited to common areas unless Roseville Electric approves otherwise.",
        "Commercial refrigeration equipment must meet the program's qualifying product list or ENERGY STAR requirements as stated on the application."
      ],
      "blockers": [
        "EV site assessment and EV charger incentives are separate Low Carbon Fuel Standard funded EV programs, not this commercial energy efficiency retrofit match.",
        "EV site assessment is planning support, not a physical retrofit.",
        "Do not match residential HVAC or individual multifamily dwelling-unit measures without utility confirmation.",
        "Do not generalize reach-in refrigerator and freezer rebates into all refrigeration equipment."
      ],
      "programType": "Commercial Rebate Program",
      "administrator": "Roseville Electric Utility",
      "applicationUrl": null,
      "websiteUrl": "https://www.roseville.ca.gov/electric_utility/commercial_rebates/index.php?id=1205&rz=catalogueDetails",
      "sourceUrlsChecked": [
        "https://www.roseville.ca.gov/electric_utility/commercial_rebates/index.php?id=1205&rz=catalogueDetails",
        "https://www.roseville.ca.gov/electric_utility/commercial_rebates/commercial_hvac.php",
        "https://www.roseville.ca.gov/electric_utility/commercial_rebates/ev_site_assessment.php"
      ],
      "evidenceText": "Roseville Electric lists commercial programs for HVAC, smart thermostats, lighting, refrigeration, and EV site assessment, while the EV site assessment page identifies a separate LCFS-funded EV program.",
      "reasoningNotes": "Retained commercial EE measures and blocked the EV site-assessment false positive from this retrofit category set."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Roseville commercial sources include HVAC and refrigeration incentives, but exact current values require application/table extraction.",
        "sourceUrlsChecked": [
          "https://www.roseville.ca.us/government/departments/electric_utility/business/rebates",
          "https://programs.dsireusa.org/system/program/detail/1903"
        ],
        "reasoningNotes": "Target maps to fleet fuel replacement despite refrigeration and HVAC matched terms; no direct EV rule was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22092",
    "opportunityName": "Sustainable Energy Utility - Commercial and Multifamily Energy Efficiency Rebate Program",
    "state": "DC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22092/sustainable-energy-utility-commercial-and-multifamily-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.dcseu.com/business-rebates",
    "applicationUrl": null,
    "administrator": "District of Columbia Sustainable Energy Utility",
    "programType": "Commercial Multifamily Rebate Program",
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigeration",
          "display case"
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
          "DC"
        ],
        "counties": [],
        "cities": [
          "Washington"
        ],
        "utilityTerritories": [
          "District of Columbia Sustainable Energy Utility"
        ],
        "notes": "Available to District of Columbia business, commercial property, institutional, and multifamily projects meeting DCSEU requirements."
      },
      "eligibleApplicantTypes": [
        "district_businesses",
        "commercial_property_owners",
        "multifamily_property_owners",
        "institutional_customers",
        "small_businesses",
        "affordable_multifamily_providers"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily",
        "institutional",
        "small_business",
        "affordable_housing"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "occupancy_sensor_lighting_controls",
        "daylight_sensor_lighting_controls",
        "commercial_heat_pump_ductless_mini_split",
        "commercial_heat_pump_hvac_retrofit",
        "commercial_air_conditioning",
        "commercial_reach_in_refrigerator",
        "commercial_reach_in_freezer",
        "refrigeration_controls_retrofit",
        "display_case_lighting",
        "commercial_kitchen_foodservice_equipment",
        "low_flow_pre_rinse_spray_valve",
        "vending_machine_controls",
        "multifamily_bulk_refrigerator",
        "multifamily_bulk_clothes_washer",
        "heat_pump_clothes_dryer"
      ],
      "hardRequirements": [
        "Project must be in a District-based business, commercial, institutional, or multifamily building.",
        "Business rebate projects generally must be submitted for preapproval before equipment purchase; applications not preapproved are not guaranteed rebates.",
        "Total business rebates are generally capped at 100000 dollars per location per fiscal year unless program terms state otherwise.",
        "Small-business enhanced rebates require the stated under-10000-square-foot business criteria.",
        "DCSEU no longer offers rebates for new gas equipment in market-rate commercial, institutional, and multifamily buildings, except possible O&M support for existing gas equipment."
      ],
      "blockers": [
        "Do not match low_flow_fixture_retrofit broadly; the verified food-service water measure is a spray rinse valve at the listed flow rate.",
        "The word fixture on lighting pages refers to LED or display-case lighting fixtures, not plumbing fixtures.",
        "Do not infer single-family residential rebates into this commercial and multifamily record.",
        "Solar and financing are separate DCSEU/custom offerings and should not be matched unless the project meets their separate requirements."
      ],
      "programType": "Commercial Multifamily Rebate Program",
      "administrator": "District of Columbia Sustainable Energy Utility",
      "applicationUrl": null,
      "websiteUrl": "https://www.dcseu.com/business-rebates",
      "sourceUrlsChecked": [
        "https://www.dcseu.com/business-rebates",
        "https://www.dcseu.com/business-rebates/lighting",
        "https://www.dcseu.com/business-rebates/hvac",
        "https://www.dcseu.com/business-rebates/refrigeration",
        "https://www.dcseu.com/business-rebates/bulk-appliances",
        "https://www.dcseu.com/start-a-project",
        "https://www.dcseu.com/terms-and-conditions"
      ],
      "evidenceText": "DCSEU business pages list commercial and multifamily rebates for lighting controls and fixtures, HVAC heat pumps and air conditioning, refrigeration, food and vending equipment, and multifamily bulk appliances.",
      "reasoningNotes": "Kept commercial and multifamily categories but narrowed the fixture and low-flow matches to lighting fixtures and a specific pre-rinse spray valve."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "The official DCSEU lighting-instant source returned HTTP 403 in source fetch.",
        "sourceUrlsChecked": [
          "https://www.dcseu.com/business-rebates/lighting-instant"
        ],
        "reasoningNotes": "No official refrigeration or multifamily rebate table was accessible for verification.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5399",
    "opportunityName": "Sustainable Energy Utility - Residential Energy Efficiency Rebate Program",
    "state": "DC",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5399/sustainable-energy-utility-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.dcseu.com/residential-rebates",
    "applicationUrl": "https://www.dcseu.com/residential-rebates/apply",
    "administrator": "District of Columbia Sustainable Energy Utility",
    "programType": "Residential Rebate Program",
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
          "DC"
        ],
        "counties": [],
        "cities": [
          "Washington"
        ],
        "utilityTerritories": [
          "District of Columbia Sustainable Energy Utility"
        ],
        "notes": "Available to District of Columbia residents, with measure-specific contractor, licensing, and electrification requirements."
      },
      "eligibleApplicantTypes": [
        "district_residents",
        "homeowners",
        "renters"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "electric_heat_pump_hvac",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "window_air_conditioner",
        "smart_thermostat",
        "residential_refrigerator",
        "residential_induction_stove",
        "electric_stove",
        "residential_clothes_washer",
        "residential_clothes_dryer",
        "heat_pump_clothes_dryer",
        "home_electrification_service",
        "electric_circuit_addition",
        "electric_panel_upgrade"
      ],
      "hardRequirements": [
        "Applicant must be a DC resident and install qualifying equipment in a DC residence.",
        "Heating, cooling, and water-heating equipment must be installed by a DC licensed contractor to qualify.",
        "Cooling rebates require a valid DC Master Refrigeration and Air Conditioning Mechanic license; water-heating rebates require a valid DC Master Plumber license.",
        "Appliance rebates are for select ENERGY STAR certified electric or induction appliances and electronics.",
        "Electrification service rebates support heavy-ups and electric circuit additions tied to switching household equipment from gas to electric."
      ],
      "blockers": [
        "Do not match commercial refrigeration equipment; verified support is for residential refrigerators and household appliances.",
        "Induction and electric stove rebates are residential appliances, not commercial kitchen equipment.",
        "Window air conditioner rebates are product-specific and must not be interpreted as window replacement.",
        "Do not match broad high_efficiency_hvac_replacement beyond qualifying electric heat pumps, heat pump water heaters, and air conditioners."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "District of Columbia Sustainable Energy Utility",
      "applicationUrl": "https://www.dcseu.com/residential-rebates/apply",
      "websiteUrl": "https://www.dcseu.com/residential-rebates",
      "sourceUrlsChecked": [
        "https://www.dcseu.com/residential-rebates",
        "https://www.dcseu.com/residential-rebates/apply",
        "https://www.dcseu.com/residential-rebates/heating-cooling",
        "https://www.dcseu.com/residential-rebates/electrify",
        "https://www.dcseu.com/terms-and-conditions"
      ],
      "evidenceText": "DCSEU residential pages list rebates for electric heat pumps, heat pump water heaters, window air conditioners, electrification services, smart thermostats, refrigerators, and electric or induction cooking appliances.",
      "reasoningNotes": "Narrowed the refrigeration and induction matches to residential appliances and excluded commercial kitchen or commercial refrigeration interpretations."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "DCSEU residential source lists many rebate ranges, but exact heat pump, HPWH, thermostat, and appliance values require measure selection.",
        "sourceUrlsChecked": [
          "https://www.dcseu.com/homes",
          "https://www.dcseu.com/residential-rebates/apply"
        ],
        "reasoningNotes": "The target is whole-building custom efficiency; no single source-backed formula was safely selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3618",
    "opportunityName": "Beaches Energy Services - Residential Energy Efficiency Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3618/beaches-energy-services-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.beachesenergy.com/energy-savings/energy-rebates",
    "applicationUrl": null,
    "administrator": "Beaches Energy Services",
    "programType": "Residential Energy Efficiency Rebate Program",
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
          "FL"
        ],
        "counties": [],
        "cities": [
          "Jacksonville Beach"
        ],
        "utilityTerritories": [
          "Beaches Energy Services electric service territory"
        ],
        "notes": "Limited to Beaches Energy Services customers; residential rebate categories apply to residential accounts."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "electric_utility_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "insulation_upgrade",
        "heat_pump_water_heater",
        "solar_water_heater",
        "window_film_shading_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Beaches Energy Services customer.",
        "Residential rebate forms and required documentation must be submitted within 90 days.",
        "Equipment must meet the specific rebate form and efficiency requirements.",
        "Rebate is limited by the program’s stated maximum amounts.",
        "Window-related rebate applies to solar screen or window film, not full window replacement."
      ],
      "blockers": [
        "Window replacement is not supported; current official materials list solar screen or window film.",
        "Commercial lighting is a separate listed commercial rebate and should not be merged into this residential record.",
        "Projects outside Beaches Energy Services territory are not eligible.",
        "Do not infer broad envelope retrofits beyond listed insulation and window film or solar screen measures."
      ],
      "programType": "Residential Energy Efficiency Rebate Program",
      "administrator": "Beaches Energy Services",
      "applicationUrl": null,
      "websiteUrl": "https://www.beachesenergy.com/energy-savings/energy-rebates",
      "sourceUrlsChecked": [
        "https://www.beachesenergy.com/energy-savings/energy-rebates",
        "https://beachesenergy.com/about-us/resources/forms"
      ],
      "evidenceText": "Beaches Energy lists residential rebates for A/C heat pumps, insulation, heat pump water heaters, solar water heaters, and solar screen or window film.",
      "reasoningNotes": "Most residential categories are supported. The window replacement match is a false positive because the official offer is for window film or solar screens."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official page says customers can get up to $1,600 across home upgrades but does not expose a single measure formula.",
        "sourceUrlsChecked": [
          "https://www.beachesenergy.com/energy-savings/energy-rebates",
          "https://beachesenergy.com/about-us/resources/forms"
        ],
        "reasoningNotes": "Target is broad whole-building efficiency; no safe per-kWh or measure rule was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1421",
    "opportunityName": "Duke Energy Florida - Smart $aver Commercial Energy Efficiency Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1421/duke-energy-florida-smart-aver-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.duke-energy.com/business/products/smartsaver",
    "applicationUrl": null,
    "administrator": "Duke Energy Florida",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 6,
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
        "retrofitTypeId": "thermal_energy_storage",
        "displayName": "Thermal energy storage",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "thermal energy storage"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "FL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Duke Energy Florida electric service territory"
        ],
        "notes": "Limited to eligible Duke Energy Florida business, school and facility accounts in Florida."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "public_sector_customer",
        "nonprofit_customer",
        "school_or_facility_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_chiller_replacement",
        "energy_recovery_ventilation_retrofit",
        "demand_controlled_ventilation",
        "high_efficiency_unitary_ac_heat_pump",
        "high_efficiency_hvac_replacement",
        "thermal_energy_storage",
        "insulation_upgrade",
        "custom_commercial_energy_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Duke Energy Florida nonresidential electric customer.",
        "Equipment and project must meet Duke Energy Florida Smart $aver measure requirements and incentive caps.",
        "Custom incentives are project-specific and must be approved under Duke Energy Florida rules."
      ],
      "blockers": [
        "battery_storage_system is not supported by the current official Smart $aver business materials checked.",
        "Energy storage matches should be limited to thermal energy storage, not electrochemical batteries.",
        "Residential measures are outside this commercial Smart $aver opportunity."
      ],
      "programType": "Rebate Program",
      "administrator": "Duke Energy Florida",
      "applicationUrl": null,
      "websiteUrl": "https://www.duke-energy.com/business/products/smartsaver",
      "sourceUrlsChecked": [
        "https://www.duke-energy.com/business/products/smartsaver",
        "https://www.duke-energy.com/business/products/smartsaver/hvac-related-improvements-fl",
        "https://www.duke-energy.com/Business/Products/SmartSaver/Custom-Incentives-FL?jur=FL01",
        "https://investors.duke-energy.com/news/news-details/2025/Duke-Energy-Florida-offers-free-home-and-business-energy-assessments-money-saving-rebate-programs/default.aspx",
        "https://programs.dsireusa.org/system/program/detail/1421/duke-energy-florida-smart-aver-commercial-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Official Duke Energy Florida materials identify commercial rebates for chillers, energy recovery ventilation, unitary AC systems and heat pumps; detailed measure pages were access-restricted.",
      "reasoningNotes": "Official program pages were checked but several returned access restrictions, so fine-grained prescriptive categories are medium confidence. The uploaded batch source was ."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Duke Energy Florida commercial materials describe incentives but did not expose a safe storage or thermal storage formula.",
        "sourceUrlsChecked": [
          "https://www.duke-energy.com/business/products/smart-saver",
          "https://www.duke-energy.com/business/save-energy-and-money"
        ],
        "reasoningNotes": "Target is storage-related; no direct upfront battery or thermal storage rebate formula was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3616",
    "opportunityName": "Lakeland Electric - Residential Conservation Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3616/lakeland-electric-residential-conservation-rebate-program",
    "websiteUrl": "https://lakelandelectric.com/programs-and-services/energy",
    "applicationUrl": null,
    "administrator": "Lakeland Electric",
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
          "FL"
        ],
        "counties": [
          "Polk"
        ],
        "cities": [
          "Lakeland"
        ],
        "utilityTerritories": [
          "Lakeland Electric"
        ],
        "notes": "Available to current residential Lakeland Electric customers in the Lakeland Electric service area."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "electric_utility_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump_hvac",
        "ductless_mini_split_heat_pump",
        "high_efficiency_central_air_conditioner_with_gas_furnace",
        "attic_insulation_upgrade",
        "heat_pump_water_heater",
        "energy_star_residential_refrigerator",
        "energy_star_residential_clothes_washer",
        "smart_wifi_thermostat",
        "variable_speed_pool_pump"
      ],
      "hardRequirements": [
        "Applicant must be a current residential Lakeland Electric customer.",
        "Rebate requests must be submitted within 90 days where the program specifies this deadline.",
        "Heat pump replacement must meet the minimum SEER2 requirement and use required contractor documentation.",
        "Attic insulation requires inspection before installation and must raise attic insulation to the required R-value.",
        "Heat pump water heater, refrigerator, clothes washer, pool pump, and thermostat rebates must meet the listed qualifying product requirements."
      ],
      "blockers": [
        "Do not match commercial refrigeration or commercial laundry equipment.",
        "HVAC maintenance rebates are service measures, not physical retrofit categories.",
        "Straight-cool air conditioning with electric resistance heating is excluded from the heat-pump rebate.",
        "New construction is excluded from the heat-pump replacement rebate."
      ],
      "programType": "Rebate Program",
      "administrator": "Lakeland Electric",
      "applicationUrl": null,
      "websiteUrl": "https://lakelandelectric.com/programs-and-services/energy",
      "sourceUrlsChecked": [
        "https://lakelandelectric.com/programs-and-services/energy",
        "https://cdn.kubra.com/a_published/lakelandelectric/assets-docs/rebate%20application%20october%201.2024.pdf",
        "https://cdn.kubra.com/a_published/LakelandElectric/assets-docs/Lakeland%20Electric%20Service%20Area%20Map.pdf",
        "https://programs.dsireusa.org/system/program/detail/3616/lakeland-electric-residential-conservation-rebate-program"
      ],
      "evidenceText": "Lakeland Electric lists residential rebates for ENERGY STAR appliances, heat pump water heaters, Wi-Fi thermostats, pool pumps, attic insulation, and qualifying heat-pump HVAC replacements.",
      "reasoningNotes": "The residential appliance matches must be product-specific. Refrigeration is a household refrigerator rebate, not commercial refrigeration."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Lakeland Electric residential conservation pages did not expose a current whole-building per-kWh or matched equipment formula.",
        "sourceUrlsChecked": [
          "https://lakelandelectric.com/residential/customers/save-energy/rebates",
          "https://programs.dsireusa.org/system/program/detail/3616"
        ],
        "reasoningNotes": "No safe one-time rule was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4971",
    "opportunityName": "Alliant Energy Interstate Power and Light - Commercial and Industrial Energy Efficiency Rebate Program",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4971/alliant-energy-interstate-power-and-light-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.alliantenergy.com/ways-to-save/instant-discounts/iowa",
    "applicationUrl": null,
    "administrator": "Alliant Energy Interstate Power and Light",
    "programType": "Instant Discount",
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
          "IA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Alliant Energy Interstate Power and Light Iowa service territory"
        ],
        "notes": "Iowa instant discounts are available through participating distributors and dealers for eligible Alliant Energy Iowa customers."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_utility_customer",
        "industrial_utility_customer",
        "agricultural_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "exterior_site_lighting_retrofit",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "high_efficiency_hvac_replacement",
        "heat_pump_water_heater",
        "high_efficiency_boiler_retrofit",
        "commercial_foodservice_equipment",
        "high_efficiency_commercial_refrigeration_equipment"
      ],
      "hardRequirements": [
        "Customer must be an eligible Alliant Energy Iowa business, agricultural, or qualifying customer.",
        "Discounts are provided through participating distributors or dealers.",
        "Lighting generally requires one-for-one replacement of existing non-LED equipment and listed wattage-reduction and DLC requirements.",
        "HVAC and foodservice equipment must meet Alliant's listed efficiency and equipment specifications."
      ],
      "blockers": [
        "Anti-sweat heater controls were not found on the current official Iowa instant-discount page and should not be matched from this record.",
        "Do not infer residential appliance rebates from this commercial and industrial record.",
        "Commercial refrigeration support is through listed foodservice or refrigerated-case measures, not generic refrigeration upgrades."
      ],
      "programType": "Instant Discount",
      "administrator": "Alliant Energy Interstate Power and Light",
      "applicationUrl": null,
      "websiteUrl": "https://www.alliantenergy.com/ways-to-save/instant-discounts/iowa",
      "sourceUrlsChecked": [
        "https://www.alliantenergy.com/ways-to-save/instant-discounts/iowa"
      ],
      "evidenceText": "Alliant's]( Iowa instant-discount page lists commercial and industrial lighting, controls, HVAC, geothermal, heat pumps, boilers, HPWHs, and foodservice or refrigeration equipment.",
      "reasoningNotes": "Current official support is broader than the old DSIRE terms but did not verify anti-sweat heater controls."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Alliant business rebates include many measures, but no matched motor/VFD formula was safely selected for this target.",
        "sourceUrlsChecked": [
          "https://www.alliantenergy.com/waystosave/rebatesandmarketplace/rebatelocatortool",
          "https://www.alliantenergy.com/ways-to-save/instant-discounts/iowa"
        ],
        "reasoningNotes": "A current business measure table should be extracted before merging a rule.",
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
