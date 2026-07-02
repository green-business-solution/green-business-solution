You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 5
Targets in this prompt: 81-100 of 984
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
  "batchNumber": 5,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2259"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2592",
    "opportunityName": "Southern Minnesota Municipal Power Agency - (17 Municipal Utilities) - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2592/southern-minnesota-municipal-power-agency-17-municipal-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/energy-efficiency",
    "applicationUrl": null,
    "administrator": "Southern Minnesota Municipal Power Agency and participating member municipal utilities",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "participating SMMPA member municipal utility electric service territories"
        ],
        "notes": "Umbrella program across participating Southern Minnesota Municipal Power Agency member utilities; specific forms vary by member utility."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "municipal_utility_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_energy_star_appliances",
        "energy_star_ev_charger",
        "high_efficiency_cooling_equipment",
        "cooling_tune_up",
        "heat_pump_water_heater",
        "ecm_circulator_pump",
        "furnace_fan_motor",
        "pool_pump",
        "aerosol_duct_sealing",
        "battery_powered_outdoor_equipment",
        "e_bike"
      ],
      "hardRequirements": [
        "Applicant must be a residential customer of a participating SMMPA member municipal utility.",
        "Use the current member-specific 2026 forms and rebate summaries for exact eligible products, amounts, dates, and documentation.",
        "ENERGY STAR product and EV charger rebates must satisfy the current product form requirements."
      ],
      "blockers": [
        "Business rebates are separate and should not match to this residential opportunity.",
        "Commercial dishwasher, commercial refrigeration, commercial lighting, VFDs, industrial motors, and commercial foodservice are business-program false positives.",
        "Furnace language on current residential member pages refers to a furnace fan motor form, not full furnace replacement.",
        "Detailed Google Drive forms did not expose readable text in the browser; categories are limited to official member-page headings."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Southern Minnesota Municipal Power Agency and participating member municipal utilities",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/energy-efficiency",
      "sourceUrlsChecked": [
        "https://smmpa.com/",
        "https://smmpa.com/energy-efficiency",
        "https://smmpa.com/members/blooming-prairie",
        "https://smmpa.com/members/spring-valley"
      ],
      "evidenceText": "SMMPA says it works with member utilities on residential programs. Current member pages list 2026 residential forms for ENERGY STAR products, EV chargers, cooling, furnace fan motors, pumps and aerosol sealing.",
      "reasoningNotes": "Treated this as an umbrella residential member-utility program and kept only categories visible in current SMMPA member pages."
    },
    "existingSimpleRules": [
      {
        "id": "oir_7aac51f8a3cdb8ed_v1",
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
        "evidenceText": "Bright Energy Solutions EV form lists other qualifying Level 2 chargers at $150.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles/electric-vehicle-charging-program",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "Returned separately because charger type changes amount.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_7dfff90c187125ba_v1",
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
        "evidenceText": "Bright Energy Solutions EV form lists connected ChargePoint Home Flex charger at $500.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles/electric-vehicle-charging-program",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "Matched Level 2 EV charger terms. Municipal participation should be verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3578",
    "opportunityName": "Cuivre River Electric - Energy Efficiency Rebate Programs",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3578/cuivre-river-electric-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.cuivre.com/rebates",
    "applicationUrl": null,
    "administrator": "Cuivre River Electric Cooperative",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
        "counties": [
          "Lincoln",
          "Montgomery",
          "Pike",
          "St. Charles",
          "Warren"
        ],
        "cities": [],
        "utilityTerritories": [
          "Cuivre River Electric Cooperative"
        ],
        "notes": "Available to Cuivre River Electric Cooperative members in its Missouri electric service area."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "commercial_member",
        "school",
        "institutional_customer",
        "agricultural_member"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "institutional",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "dual_fuel_ducted_heat_pump",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat",
        "basement_crawlspace_slab_insulation_with_geothermal_heat_pump",
        "business_lighting_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Cuivre River Electric Cooperative member.",
        "Residential insulation rebate is limited to basement, crawlspace, or slab insulation associated with a geothermal heat pump installation and required R-values.",
        "Heat pump water heater must meet program size and replacement rules; tankless and gas water heaters are not eligible.",
        "Business lighting projects must meet minimum fixture, cost-share, annual cap, and application requirements.",
        "Business lighting new construction is not eligible."
      ],
      "blockers": [
        "Do not match EV charger or Level 2 EV charger categories; no current official rebate support was verified in this program.",
        "Do not match window replacement.",
        "Do not match efficient pump replacement.",
        "Do not generalize the limited geothermal-linked insulation rebate to broad standalone insulation.",
        "Do not match gas or tankless water heaters."
      ],
      "programType": "Rebate",
      "administrator": "Cuivre River Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.cuivre.com/rebates",
      "sourceUrlsChecked": [
        "https://www.cuivre.com/rebates",
        "https://www.cuivre.com/sites/default/files/Rebates/2024%20Rebates/Business%20Lighting%20Application%20UPDATED.pdf"
      ],
      "evidenceText": "Official rebate materials list geothermal heat pumps, dual-fuel and ductless heat pumps, heat pump water heaters, smart thermostats, limited geothermal-linked insulation, and business lighting rebates for members.",
      "reasoningNotes": "EV charging, pump replacement, windows, and broad insulation were false-positive matches."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8fbd9628130b5848_v1",
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
        "evidenceText": "View available rebates Ground Source Heat Pump (GSHP) Rebate $750 per Ton for qualifying new installations, 19",
        "sourceUrlsChecked": [
          "https://www.cuivre.com/rebates"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3405",
    "opportunityName": "White River Valley Electric Cooperative - Energy Efficiency Rebate Program",
    "state": "MO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3405/white-river-valley-electric-cooperative-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.whiteriver.org/member-center/rebates-audits/",
    "applicationUrl": null,
    "administrator": "White River Valley Electric Cooperative",
    "programType": "Energy Efficiency Rebate Program",
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
        "cities": [],
        "utilityTerritories": [
          "White River Valley Electric Cooperative service territory"
        ],
        "notes": "Available to qualifying WRVEC member accounts; several measures apply to both residential and commercial accounts."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "commercial_customers",
        "cooperative_members"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "heat_pump_hvac_retrofit",
        "ducted_mini_split_heat_pump",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "smart_thermostat_zoning_retrofit",
        "air_sealing_weatherization",
        "insulation_upgrade"
      ],
      "hardRequirements": [
        "Applicant must be a White River Valley Electric Cooperative member with an eligible account.",
        "Air-source and ducted mini-split heat pump rebates require dual-fuel fossil backup and efficiency documentation.",
        "New ground-source heat pumps require preapproval, Manual J sizing, and certificates before installation.",
        "Weatherization requires a WRVEC energy audit completed within the prior 12 months."
      ],
      "blockers": [
        "Current official rebate page did not verify EV charger or LED lighting rebates for this opportunity.",
        "Weatherization is limited to repairs or improvements identified by the WRVEC audit, not arbitrary envelope work.",
        "Basement, crawl-space, and slab insulation is tied to new ground-source heat pump installation.",
        "Commercial refrigeration and commercial kitchen categories are unsupported."
      ],
      "programType": "Energy Efficiency Rebate Program",
      "administrator": "White River Valley Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.whiteriver.org/member-center/rebates-audits/",
      "sourceUrlsChecked": [
        "https://www.whiteriver.org/member-center/rebates-audits/",
        "https://www.whiteriver.org/member-center/resources/energy/rebates/"
      ],
      "evidenceText": "WRVEC’s current rebates page lists heat pump water heaters, air-source and mini-split heat pumps, smart thermostats, new and replacement ground-source heat pumps, weatherization and insulation-related rebates.",
      "reasoningNotes": "Removed unverified EV and LED matches and narrowed weatherization and insulation to current WRVEC requirements."
    },
    "existingSimpleRules": [
      {
        "id": "oir_bf008e9e9ed04e6a_v1",
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
        "evidenceText": "The rebate for the new appliance is $750 per ton, with a limit of 10 tons residential and 50 tons commercial",
        "sourceUrlsChecked": [
          "https://www.whiteriver.org/member-center/resources/energy/rebates/"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4261",
    "opportunityName": "Mississippi Power - Residential & Commercial Energy Efficiency Rebate Program",
    "state": "MS",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4261/mississippi-power-residential-and-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.mississippipower.com/residential/ways-to-save/rebates---incentives.html",
    "applicationUrl": null,
    "administrator": "Mississippi Power",
    "programType": "Residential And Commercial Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
          "MS"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Mississippi Power"
        ],
        "notes": "Eligibility is limited to Mississippi Power service territory; customer class requirements vary by residential, business, commercial, industrial, and transportation measure."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "commercial_customer",
        "industrial_customer",
        "government_customer",
        "institutional_customer",
        "nonprofit_customer",
        "dealer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "government",
        "institutional",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "electric_forklift_material_handling",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "electric_vehicle_purchase",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "duct_sealing",
        "energy_star_window_air_conditioner",
        "pool_pump",
        "heat_pump_washer_dryer_combo",
        "led_lighting_retrofit",
        "lighting_controls",
        "high_efficiency_refrigeration_equipment",
        "commercial_kitchen_equipment",
        "energy_management_system",
        "high_efficiency_motors_pumps_fans_compressors"
      ],
      "hardRequirements": [
        "Applicant must be a Mississippi Power customer or qualifying dealer for dealer-specific transportation rebates.",
        "Residential and commercial forms require application within the stated post-installation window.",
        "Commercial custom and large commercial or industrial measures may require preapproval.",
        "Business transportation measures require qualifying EV, charger, truck plug, or forklift documentation.",
        "Residential HPWH, HVAC, insulation, and smart thermostat rebates require product and customer eligibility documentation."
      ],
      "blockers": [
        "Window replacement is a false positive for the residential form; current residential support is ENERGY STAR window air conditioners, not replacement windows.",
        "EV purchase rebates are vehicle incentives and should not be treated as building retrofits.",
        "Commercial C&I, forklift, truck plug, and custom measures require the applicable business or transportation pathway and may require preapproval.",
        "Residential insulation is limited to qualifying single-family applications.",
        "Rebates require Mississippi Power service and installation or application windows."
      ],
      "programType": "Residential And Commercial Rebate Program",
      "administrator": "Mississippi Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.mississippipower.com/residential/ways-to-save/rebates---incentives.html",
      "sourceUrlsChecked": [
        "https://www.mississippipower.com/residential/ways-to-save/rebates---incentives.html",
        "https://www.mississippipower.com/business/ways-to-save.html",
        "https://www.mississippipower.com/business/ways-to-save/large-commercial-and-industrial-program.html",
        "https://www.mississippipower.com/residential/products-and-services/electric-vehicles.html",
        "https://www.mississippipower.com/business/products---services/electric-transportation.html",
        "https://www.mississippipower.com/content/dam/mississippi-power/residential/ways-to-save/rebates/02-18_MKT_RESIDENTIAL%20EV%20rebate%20form.pdf",
        "https://www.mississippipower.com/content/dam/mississippi-power/pdfs/residential/ev-rebates/3-23_MKT_Commercial%20EV%20rebate%20form.pdf",
        "https://www.mississippipower.com/content/dam/mississippi-power/pdfs/business/commercial-ee-program/small-biz/MPC-Commercial-HVAC-Replacement-Rebate-Form.pdf",
        "https://www.mississippipower.com/content/dam/mississippi-power/pdfs/business/commercial-ee-program/small-biz/MPC-Commercial-Smart-Thermostat-Rebate-Form.pdf",
        "https://www.mississippipower.com/content/dam/mississippi-power/pdfs/business/commercial-ee-program/small-biz/2024-Ceiling-insulation-Rebate.pdf"
      ],
      "evidenceText": "Current Mississippi Power materials support residential HVAC, smart thermostat, HPWH, duct and air sealing, insulation, EV and charger, window AC, pool pump, and commercial HVAC, lighting, refrigeration, kitchen, custom, EV, and forklift incentives.",
      "reasoningNotes": "Kept both residential and commercial categories because current official materials place them under Mississippi Power's residential and business rebate pathways. Window replacement was blocked."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b3ce57e6b3f0fe7a_v1",
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
        "evidenceText": "HVAC Save up to $200 per ton on a new HVAC system",
        "sourceUrlsChecked": [
          "https://www.mississippipower.com/residential/ways-to-save/rebates---incentives.html"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null,
          "businessRelevance": "mixed",
          "v1Readiness": "needs_project_scope"
        }
      }
    ],
    "reviewedNoRule": []
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4822",
    "opportunityName": "Unitil (Gas) - Residential Energy Efficiency Program",
    "state": "NH",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4822/unitil-gas-residential-energy-efficiency-program",
    "websiteUrl": "https://unitil.com/rebates/high-efficiency-home-heating-equipment-programmablewifi-thermostat-rebates-nh",
    "applicationUrl": null,
    "administrator": "Unitil / NHSaves",
    "programType": "Residential Gas Efficiency Rebate And Weatherization Program",
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
          "NH"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Unitil New Hampshire natural gas service territory"
        ],
        "notes": "Natural gas equipment rebates are for eligible Unitil New Hampshire gas customers; weatherization is through the NHSaves Home Energy Performance pathway."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customers",
        "residential_customers",
        "homeowners",
        "renters"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "boiler_controls_burner_retrofit",
        "high_efficiency_gas_water_heater",
        "smart_thermostat_zoning_retrofit",
        "heat_recovery_ventilator"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Unitil New Hampshire natural gas customer for gas heating and water heating rebates.",
        "Heating and water heating equipment must be purchased and installed in the current program year by a licensed contractor or plumber.",
        "Home Energy Performance weatherization requires a qualified whole-house assessment and program eligibility screening.",
        "Applications must include required invoices, model information, and deadlines."
      ],
      "blockers": [
        "Battery storage is not supported by this Unitil gas residential efficiency program.",
        "LED lighting is not supported by the current Unitil gas equipment pages.",
        "Waste heat recovery is an industrial category and should not match this residential gas program; use heat recovery ventilator only.",
        "Some water heater types shown on NHSaves pages are Liberty-only and should not be matched to Unitil unless the Unitil form lists them."
      ],
      "programType": "Residential Gas Efficiency Rebate And Weatherization Program",
      "administrator": "Unitil / NHSaves",
      "applicationUrl": null,
      "websiteUrl": "https://unitil.com/rebates/high-efficiency-home-heating-equipment-programmablewifi-thermostat-rebates-nh",
      "sourceUrlsChecked": [
        "https://unitil.com/rebates/high-efficiency-home-heating-equipment-programmablewifi-thermostat-rebates-nh",
        "https://unitil.com/rebates/home-energy-performance-nh",
        "https://unitil.com/ways-to-save/rebates-incentives",
        "https://nhsaves.com/rebates-services-appliances/",
        "https://nhsaves.com/residential/natural-gas-heating-furnaces-boilers/",
        "https://nhsaves.com/residential/natural-gas-heating-equipment/",
        "https://nhsaves.com/wp-content/uploads/2026/01/2026_NHS_Resi-Heat-Water_Form_UNITIL_8.5x11_Final_Fillable_2025-12-22.pdf"
      ],
      "evidenceText": "Unitil and NHSaves pages list New Hampshire residential gas heating, boilers, boiler reset controls, thermostats, tankless water heating, heat recovery ventilators, audits and weatherization through Home Energy Performance.",
      "reasoningNotes": "Limited this repair to Unitil gas residential measures and removed electric, battery, lighting, and industrial waste-heat false positives."
    },
    "existingSimpleRules": [
      {
        "id": "oir_bfecfc8ddff778af_v1",
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
        "formula": "$85 per wireless-enabled natural gas thermostat",
        "evidenceText": "NHSaves natural gas thermostat page lists $85 rebate for wireless-enabled thermostat.",
        "sourceUrlsChecked": [
          "https://nhsaves.com/residential/natural-gas-thermostat/",
          "https://unitil.com/rebates/high-efficiency-home-heating-equipment-programmablewifi-thermostat-rebates-nh"
        ],
        "reasoningNotes": "Matched controls/thermostat terms for Unitil gas residential service.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2316",
    "opportunityName": "OTEC - Residential Energy Efficiency Rebate Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2316/otec-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.otec.coop/residential-rebates",
    "applicationUrl": null,
    "administrator": "Oregon Trail Electric Cooperative",
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
          "OR"
        ],
        "counties": [
          "Baker County",
          "Grant County",
          "Harney County",
          "Union County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Oregon Trail Electric Cooperative"
        ],
        "notes": "Applies to OTEC member-owners in the cooperative electric service territory."
      },
      "eligibleApplicantTypes": [
        "residential_member_owner",
        "homeowner",
        "renter_with_owner_approval"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_clothes_washer",
        "residential_clothes_dryer",
        "residential_dishwasher",
        "residential_refrigerator",
        "residential_freezer",
        "heat_pump_water_heater",
        "electric_storage_water_heater",
        "smart_thermostat_zoning_retrofit",
        "level_2_ev_charger_installation",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "high_efficiency_hvac_replacement",
        "central_air_conditioner",
        "insulation_upgrade",
        "window_replacement",
        "exterior_door_replacement",
        "energy_efficient_manufactured_home"
      ],
      "hardRequirements": [
        "Customer must be an OTEC member-owner and the equipment must be installed in OTEC territory.",
        "Weatherization generally requires permanently installed electric heat and approved contractors or measure-specific standards."
      ],
      "blockers": [
        "Residential appliance rebates are not commercial dishwasher, oven, or commercial refrigeration equipment.",
        "Commercial rebates are listed separately and must not be merged into this residential program.",
        "Weatherization has electric-heat and existing-condition restrictions."
      ],
      "programType": "Rebate Program",
      "administrator": "Oregon Trail Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.otec.coop/residential-rebates",
      "sourceUrlsChecked": [
        "https://www.otec.coop/residential-rebates",
        "https://www.otec.coop/residential",
        "https://www.otec.coop/commercial-rebates"
      ],
      "evidenceText": "OTEC]( residential rebate pages list member incentives for appliances, water heaters, smart thermostats, EV charging, heat pumps, central AC, insulation, windows, doors, and efficient manufactured homes.",
      "reasoningNotes": "Kept residential member categories and separated OTEC commercial rebates from the residential program."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3429838a7470c3b5_v1",
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
        "formula": "$100 per qualifying smart or web-enabled thermostat",
        "evidenceText": "OTEC residential rebates list smart and web-enabled thermostats at $100.",
        "sourceUrlsChecked": [
          "https://www.otec.coop/residential-rebates"
        ],
        "reasoningNotes": "Matched thermostat term. Use one unit as one eligible thermostat.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3391",
    "opportunityName": "Springfield Utility Board - Residential Energy Efficiency Rebate Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3391/springfield-utility-board-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.subutil.com/conservation/for-your-home/rebates-loans/",
    "applicationUrl": null,
    "administrator": "Springfield Utility Board",
    "programType": "Residential Rebate And Loan Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
          "OR"
        ],
        "counties": [],
        "cities": [
          "Springfield"
        ],
        "utilityTerritories": [
          "Springfield Utility Board electric service territory"
        ],
        "notes": "Limited to qualifying SUB residential electric customers."
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
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "residential_clothes_washer",
        "electric_clothes_dryer",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "window_replacement"
      ],
      "hardRequirements": [
        "Applicant must be a Springfield Utility Board residential electric customer.",
        "Loans and rebates have separate requirements and may require preapproval or utility assessment.",
        "EV charger support is for newly purchased and installed residential Level 2 chargers.",
        "Appliance rebates are limited to residential ENERGY STAR clothes washers and electric dryers."
      ],
      "blockers": [
        "Official SUB pages returned access errors in the browser, so exact amounts and form deadlines require direct administrator confirmation.",
        "Broad air sealing is not retained except where tied to listed insulation, window, or duct programs.",
        "Window language refers to window weatherization or replacement, not window air conditioners.",
        "This is residential only; do not match commercial kitchen, commercial refrigeration, motors, or industrial measures."
      ],
      "programType": "Residential Rebate And Loan Program",
      "administrator": "Springfield Utility Board",
      "applicationUrl": null,
      "websiteUrl": "https://www.subutil.com/conservation/for-your-home/rebates-loans/",
      "sourceUrlsChecked": [
        "https://www.subutil.com/conservation/for-your-home/rebates-loans/",
        "https://www.subutil.com/conservation/for-your-home/rebates-loans/ductless-heat-pumps/",
        "https://www.subutil.com/conservation/for-your-home/rebates-loans/heat-pumps-ducted/",
        "https://www.subutil.com/conservation/for-your-home/rebates-loans/heat-pump-water-heaters/",
        "https://www.subutil.com/conservation/for-your-home/rebates-loans/electric-vehicle-chargers/",
        "https://www.subutil.com/conservation/for-your-home/rebates-loans/appliance-rebate-form/",
        "https://www.subutil.com/conservation/for-your-home/rebates-loans/insulation/",
        "https://www.subutil.com/conservation/for-your-home/rebates-loans/window-weatherization/"
      ],
      "evidenceText": "Current official SUB snippets list residential rebates or loans for ducted and ductless heat pumps, heat pump water heaters, smart thermostats, Level 2 EV chargers, clothes washers, electric dryers, insulation, windows and duct sealing.",
      "reasoningNotes": "Direct page fetch was blocked, but official search snippets were sufficient to keep supported residential categories and flag access-limited details."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2d8202172d4fc361_v1",
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
        "formula": "$500 per residential Level 2 EV charger",
        "evidenceText": "Springfield Utility Board EV charger page says residential customers may receive a $500 Level 2 charger rebate.",
        "sourceUrlsChecked": [
          "https://www.subutil.com/conservation/for-your-home/rebates-loans/",
          "https://www.subutil.com/conservation/for-your-home/rebates-loans/electric-vehicle-chargers/"
        ],
        "reasoningNotes": "Matched EV charging and Level 2 terms. Medium due limited accessible source text.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3025",
    "opportunityName": "National Grid (Electric) - Residential Energy Efficiency Incentive Program",
    "state": "RI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3025/national-grid-electric-residential-energy-efficiency-incentive-program",
    "websiteUrl": "https://www.rienergy.com/site/ways-to-save/rebates-and-savings-programs",
    "applicationUrl": null,
    "administrator": "Rhode Island Energy",
    "programType": "Residential Electric Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
          "Rhode Island Energy"
        ],
        "notes": "Eligible customer must be a Rhode Island residential electric customer; enhanced heat-pump incentives may require qualifying electric-resistance heating and EnergyWise verification."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "income_eligible_residential_customer",
        "landlord",
        "renter",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential",
        "low_income"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "energy_star_residential_refrigerator",
        "energy_star_room_air_conditioner",
        "energy_star_clothes_dryer",
        "energy_star_room_air_cleaner",
        "residential_led_lighting_direct_install"
      ],
      "hardRequirements": [
        "Applicant must be a Rhode Island Energy residential electric customer for electric-program measures.",
        "Heat-pump equipment must meet current Rhode Island Energy qualified-product requirements.",
        "Enhanced heat-pump incentives may require EnergyWise assessment and completion of recommended weatherization.",
        "Appliance and electronics rebates are limited to qualifying residential products."
      ],
      "blockers": [
        "Target legacy URL is obsolete or returns a 404; use current Rhode Island Energy pages and rebate portal.",
        "Gas boilers, gas furnaces, and gas water heaters are not part of this electric residential opportunity; route to separate gas or clean-heat programs.",
        "Commercial refrigeration equipment is a false positive; appliance rebates are residential products such as refrigerators and room air conditioners.",
        "LED lighting, if available, is a Home Energy Assessment or direct-install measure, not a broad lighting retrofit rebate.",
        "Freezer rebates were not verified in the current checked sources."
      ],
      "programType": "Residential Electric Energy Efficiency Rebate Program",
      "administrator": "Rhode Island Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.rienergy.com/site/ways-to-save/rebates-and-savings-programs",
      "sourceUrlsChecked": [
        "https://www.rienergy.com/RI-Home/Energy-Saving-Programs/rebate-programs",
        "https://www.rienergy.com/site/ways-to-save/rebates-and-savings-programs",
        "https://frontdoor.portal.poweredbyefi.org/initiative/rienergy/program/rirhvc",
        "https://frontdoor.portal.poweredbyefi.org/initiative/rienergy",
        "https://www.rienergy.com/site/-/media/rie-jss-app/home/ways-to-save/rebates-and-savings-programs/heating-and-cooling/ri_electric_heating-cooling_form.ashx",
        "https://www.rienergy.com/site/-/media/rie-jss-app/home/ways-to-save/rebates-and-savings-programs/gas-water-heating/HPWH_2026_3-11-2026.pdf",
        "https://energy.ri.gov/heating-cooling/clean-heating-cooling-incentives",
        "https://rienergy.com/site/-/media/rie-jss-app/home/ways-to-save/rebates-and-savings-programs/appliance-and-electronics-incentives/Residential_Aircleaner_rebateform_rie5553.ashx",
        "https://www.rienergy.com/site/-/media/rie-jss-app/home/ways-to-save/rebates-and-savings-programs/appliance-and-electronics-incentives/electricdryer_rebateform_rie6935.ashx"
      ],
      "evidenceText": "Rhode Island Energy's current materials verify residential electric heat-pump, mini-split, heat-pump water-heater, smart-thermostat, appliance, and Home Energy Assessment weatherization support. The old target URL is now a 404.",
      "reasoningNotes": "Legacy National Grid naming was repaired to Rhode Island Energy. Gas heating matches were blocked because the target is the electric residential incentive program."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8018ce91c930c669_v1",
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
        "formula": "Up to $600 per high-efficiency electric heat pump water heater",
        "evidenceText": "Rhode Island Office of Energy Resources says Rhode Island Energy offers up to $600 for electric HPWHs.",
        "sourceUrlsChecked": [
          "https://energy.ri.gov/incentives",
          "https://www.rienergy.com/RI-Home/Energy-Saving-Programs/rebate-programs"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying HPWH.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_a77c6b0e19684f9f_v1",
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
        "formula": "Up to $75 per eligible smart thermostat",
        "evidenceText": "Rhode Island smart thermostat rebate materials identify up to $75 back for eligible smart thermostats.",
        "sourceUrlsChecked": [
          "https://www.rienergy.com/RI-Home/Energy-Saving-Programs/rebate-programs",
          "https://advancedhvacri.com/smart-thermostat-rebates-in-ri-how-to-save-on-energy-and-installation/"
        ],
        "reasoningNotes": "Matched thermostat term. Confidence is medium because official source was less directly accessible in search text.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5713",
    "opportunityName": "Washington Gas - Commercial Efficiency Rebate Program",
    "state": "VA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5713/washington-gas-commercial-efficiency-rebate-program",
    "websiteUrl": "https://wgsmartsavings.com/programs-rebates/business/va",
    "applicationUrl": "https://wgcommercial-eb.programprocessing.com/",
    "administrator": "Washington Gas",
    "programType": "Commercial Gas Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
          "boiler controls"
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
          "VA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Washington Gas Virginia natural gas service territory"
        ],
        "notes": "Limited to qualifying Washington Gas Virginia commercial and business natural gas customers."
      },
      "eligibleApplicantTypes": [
        "commercial_customers",
        "industrial_customers",
        "government_customers",
        "institutional_customers",
        "nonprofit_customers",
        "multifamily_property_owners",
        "small_business_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public",
        "institutional",
        "nonprofit",
        "multifamily",
        "food_service",
        "hospitality",
        "healthcare",
        "education"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_boiler_retrofit",
        "boiler_controls_burner_retrofit",
        "steam_trap_replacement",
        "high_efficiency_furnace_retrofit",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_gas_water_heater",
        "boiler_pipe_tank_insulation",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "commercial_kitchen_ventilation_controls",
        "pre_rinse_spray_valve",
        "ozone_laundry_system"
      ],
      "hardRequirements": [
        "Applicant must be a Washington Gas Virginia business customer and meet applicable rate or usage eligibility.",
        "All projects require preapproval before equipment removal, purchase, or installation.",
        "Commercial dishwasher incentives require gas water heating where specified.",
        "Small business enhanced incentives have separate qualification rules."
      ],
      "blockers": [
        "Pre-rinse spray valve is product-specific and should not match broad plumbing or low-flow fixture retrofits.",
        "Residential appliance categories should not match this business program, even where miscellaneous residential gas equipment appears on forms.",
        "Non-gas electric equipment is outside this Washington Gas natural gas rebate."
      ],
      "programType": "Commercial Gas Efficiency Rebate Program",
      "administrator": "Washington Gas",
      "applicationUrl": "https://wgcommercial-eb.programprocessing.com/",
      "websiteUrl": "https://wgsmartsavings.com/programs-rebates/business/va",
      "sourceUrlsChecked": [
        "https://wgsmartsavings.com/programs-rebates/business/va",
        "https://wgsmartsavings.com/sites/default/files/54425_WG_VA_Program_Incentive_Sheet_v05_Web_RELEASE.pdf",
        "https://wgsmartsavings.com/sites/default/files/55110_WG_VA_Small_Business_Incentive_Sheet_v05_Web_RELEASE.pdf",
        "https://wgsmartsavings.com/programs-rebates/va/food-service",
        "https://wgsmartsavings.com/programs-rebates/va/manufacturing-and-industrial"
      ],
      "evidenceText": "Washington Gas Virginia business sources list commercial natural gas incentives for boilers, controls, steam traps, furnaces, thermostats, water heating, foodservice equipment, kitchen ventilation, pre-rinse valves and ozone laundry.",
      "reasoningNotes": "Target categories are mostly valid for gas business customers, with product-specific narrowing for foodservice, pre-rinse, laundry, and controls."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3c496144941710fe_v1",
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
        "formula": "$400 per high-pressure steam trap",
        "evidenceText": "DSIRE commercial Washington Gas summary lists high-pressure steam trap at $400.",
        "sourceUrlsChecked": [
          "https://wgsmartsavings.com/programs-rebates/business/va",
          "https://programs.dsireusa.org/system/program/detail/5713"
        ],
        "reasoningNotes": "Matched steam trap/commercial efficiency terms. Confidence is medium pending official application extraction.",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_d769408670593f52_v1",
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
        "formula": "$250 per medium-pressure steam trap",
        "evidenceText": "DSIRE commercial Washington Gas summary lists medium-pressure steam trap at $250.",
        "sourceUrlsChecked": [
          "https://wgsmartsavings.com/programs-rebates/business/va",
          "https://programs.dsireusa.org/system/program/detail/5713"
        ],
        "reasoningNotes": "Returned separately because pressure class changes rebate amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2237",
    "opportunityName": "Snohomish County PUD No 1 - Residential Energy Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2237/snohomish-county-pud-no-1-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.snopud.com/save-energy/residential/rebates/",
    "applicationUrl": null,
    "administrator": "Snohomish County PUD",
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
          "duct sealing"
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
          "Snohomish County PUD electric service territory"
        ],
        "notes": "Available to qualifying residential customers in Snohomish PUD service territory."
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
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "window_replacement",
        "smart_thermostat_zoning_retrofit",
        "residential_clothes_washer",
        "electric_clothes_dryer",
        "heat_pump_clothes_dryer"
      ],
      "hardRequirements": [
        "Customer must be in Snohomish PUD service territory.",
        "Heating and weatherization rebates generally require electrically heated homes and PUD-registered contractors.",
        "Heat pump water heater rebates are for qualifying replacements of existing water heaters, not new construction.",
        "Product rebates must meet current qualifying product and application-deadline rules."
      ],
      "blockers": [
        "Residential EV charger rebate ended December 31, 2025 and should not match this active residential rebate record.",
        "Commercial, industrial, and multifamily EV charger savings are separate from this residential rebate opportunity.",
        "Air sealing is not retained as a standalone category because current official residential weatherization pages identify insulation, duct sealing, and windows.",
        "Generic high-efficiency HVAC replacement is too broad; current support is specific to heat pump equipment and thermostats."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Snohomish County PUD",
      "applicationUrl": null,
      "websiteUrl": "https://www.snopud.com/save-energy/residential/rebates/",
      "sourceUrlsChecked": [
        "https://www.snopud.com/save-energy/residential/rebates/",
        "https://www.snopud.com/save-energy/residential/rebates/heating/",
        "https://www.snopud.com/save-energy/residential/rebates/weatherization/",
        "https://www.snopud.com/save-energy/residential/rebates/smart-thermostats/",
        "https://www.snopud.com/save-energy/residential/rebates/heat-pump-water-heaters/",
        "https://www.snopud.com/save-energy/residential/rebates/washers-dryers/",
        "https://www.snopud.com/save-energy/residential/rebates/ev-chargers/"
      ],
      "evidenceText": "Snohomish PUD residential pages list rebates for heat pumps, windows, insulation, water heaters, thermostats, washers and dryers. The residential EV charger rebate page says that rebate ended in 2025.",
      "reasoningNotes": "Removed EV charging and broad air-sealing matches; kept current residential heat pump, water heating, envelope, thermostat, and laundry product categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3d89907deb708424_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 5000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $50 per ENERGY STAR connected Level 2 EV charger",
        "evidenceText": "Snohomish PUD residential EV charger page lists up to $50 for ENERGY STAR connected Level 2 chargers.",
        "sourceUrlsChecked": [
          "https://www.snopud.com/save-energy/electric-vehicles/ev-charger-rebate/",
          "https://www.snopud.com/save-energy/residential/"
        ],
        "reasoningNotes": "Matched Level 2 EV charger term. Confidence is medium because the source uses up to.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3964",
    "opportunityName": "Southwest Gas Corporation - Commercial High-Efficiency Equipment Rebate Program",
    "state": "AZ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3964/southwest-gas-corporation-commercial-high-efficiency-equipment-rebate-program",
    "websiteUrl": "https://www.swgas.com/en/commercial-rebates-and-promotions",
    "applicationUrl": "https://www.swgas.com/azbusrebate",
    "administrator": "Southwest Gas Corporation",
    "programType": "Commercial Natural Gas Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
        "retrofitTypeId": "combined_heat_and_power_system",
        "displayName": "Combined heat and power system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "combined heat and power"
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
          "low flow",
          "showerhead"
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
          "AZ"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Southwest Gas Arizona natural gas service territory"
        ],
        "notes": "Qualifying Southwest Gas Arizona commercial natural gas customers only."
      },
      "eligibleApplicantTypes": [
        "commercial_natural_gas_customer",
        "business_customer",
        "foodservice_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "foodservice"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_boiler_retrofit",
        "boiler_controls_burner_retrofit",
        "boiler_steam_trap_repair",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_fryer",
        "high_efficiency_commercial_clothes_washer",
        "high_efficiency_steamer",
        "commercial_charbroiler",
        "commercial_air_curtain",
        "pre_rinse_spray_valve",
        "low_flow_showerhead",
        "solar_water_heating_system",
        "high_efficiency_gas_water_heater",
        "custom_gas_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be a qualifying Southwest Gas Arizona commercial customer.",
        "Equipment must meet Arizona commercial rebate criteria.",
        "Solar water heating and custom projects use separate Southwest Gas rebate paths."
      ],
      "blockers": [
        "CHP was not verified in current Arizona commercial sources.",
        "Low-flow matching is limited to showerheads or pre-rinse spray valves.",
        "Do not match electric-only equipment."
      ],
      "programType": "Commercial Natural Gas Rebate Program",
      "administrator": "Southwest Gas Corporation",
      "applicationUrl": "https://www.swgas.com/azbusrebate",
      "websiteUrl": "https://www.swgas.com/en/commercial-rebates-and-promotions",
      "sourceUrlsChecked": [
        "https://www.swgas.com/en/commercial-rebates-and-promotions",
        "https://www.swgas.com/azbusrebate",
        "https://www.swgas.com/1409185755675/AZ-2-Update-2024-WEB.pdf",
        "https://www.swgas.com/en/rebate/arizona-solar-water-heating-business"
      ],
      "evidenceText": "Southwest]( Gas Arizona commercial materials list gas foodservice, laundry, boiler, water heating, steam trap, low-flow, pre-rinse, solar water heating, and custom rebates.",
      "reasoningNotes": "Removed CHP; narrowed low-flow to specific listed products."
    },
    "existingSimpleRules": [
      {
        "id": "oir_5f34b05335b82d33_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 65000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "medium",
        "formula": "Up to $650 per ENERGY STAR or qualifying commercial fryer, capped at 50% of equipment cost",
        "evidenceText": "Southwest Gas Arizona commercial rebate materials list fryer rebates up to $650 and 50% cost cap.",
        "sourceUrlsChecked": [
          "https://www.swgas.com/en/rebates-and-promotions-search-business-arizona",
          "https://www.swgas.com/-/media/Files/Energy-Efficiency/AZ_2026_Commercial_Rebate_Form.ashx"
        ],
        "reasoningNotes": "Matched fryer/food-service term. Confidence is medium because final amount depends on equipment tier.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4051",
    "opportunityName": "SRP - Residential Energy Efficiency Rebate Program",
    "state": "AZ",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4051/srp-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.srpnet.com/energy-savings-rebates/home/rebates/residential-rebates",
    "applicationUrl": null,
    "administrator": "SRP",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
    "targetKind": "existing_simple_rule_v2_repair",
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
          "AZ"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Salt River Project residential electric service territory"
        ],
        "notes": "Eligible SRP residential electric customers."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "tenant_where_program_allows"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "cool_roof_reflective_roof",
        "home_energy_audit",
        "level_2_ev_charger_installation",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "insulation_upgrade",
        "duct_test_and_repair",
        "led_lighting_retrofit",
        "smart_thermostat",
        "window_film_shading_retrofit",
        "window_replacement"
      ],
      "hardRequirements": [
        "Applicant must be an eligible SRP residential electric customer.",
        "Measures must meet SRP product, contractor, installation, and submission requirements.",
        "Window film, shade screens, and window replacement are distinct measures."
      ],
      "blockers": [
        "Do not merge residential EV charging with fleet or commercial charging.",
        "Energy audit is not a physical retrofit.",
        "Do not generalize shade screens to full window replacement unless that measure applies."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "SRP",
      "applicationUrl": null,
      "websiteUrl": "https://www.srpnet.com/energy-savings-rebates/home/rebates/residential-rebates",
      "sourceUrlsChecked": [
        "https://www.srpnet.com/energy-savings-rebates/home/rebates/residential-rebates",
        "https://www.srpnet.com/energy-savings-rebates/home/rebates/air-conditioner",
        "https://www.srpnet.com/energy-savings-rebates/home/rebates/window-shade-screen"
      ],
      "evidenceText": "SRP]( residential pages list AC, HPWH, insulation, duct repair, smart thermostats, LEDs, cool roofs, windows, window treatments, audits, and EV charging.",
      "reasoningNotes": "Kept both window replacement and window film or shade screens as separate supported categories."
    },
    "existingSimpleRules": [
      {
        "id": "oir_279cfd19ce5fa1f1_v1",
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
        "formula": "$250 per eligible residential Level 2 smart EV charger",
        "evidenceText": "SRP residential EV charger page says customers can save $250 on a Level 2 smart charger.",
        "sourceUrlsChecked": [
          "https://www.srpnet.com/energy-savings-rebates/home/rebates/ev-charger",
          "https://www.srpnet.com/energy-savings-rebates/home/ev-benefits-savings"
        ],
        "reasoningNotes": "Matched EV charger and Level 2 terms. Use one unit as one eligible new Level 2 smart charger.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3308",
    "opportunityName": "Colorado Natural Gas - Energy Efficiency Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3308/colorado-natural-gas-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.coloradonaturalgas.com/efficiency",
    "applicationUrl": "https://www.coloradonaturalgas.com/Rebates",
    "administrator": "Colorado Natural Gas",
    "programType": "Natural Gas Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
        "retrofitTypeId": "steam_trap_replacement",
        "displayName": "Steam trap replacement",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "steam trap"
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
          "waste heat recovery",
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
          "CO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Colorado Natural Gas service territory"
        ],
        "notes": "Applies to eligible Colorado Natural Gas customers; custom program eligibility can differ for commercial, industrial, multifamily, and large single-family projects."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customer",
        "commercial_natural_gas_customer",
        "industrial_natural_gas_customer",
        "multifamily_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "smart_thermostat_zoning_retrofit",
        "tankless_natural_gas_water_heater",
        "high_efficiency_boiler_retrofit",
        "insulation_upgrade",
        "energy_audit",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Customer must receive qualifying natural gas service from Colorado Natural Gas.",
        "Prescriptive residential measures must meet listed efficiency specifications, such as furnace AFUE, boiler AFUE, and water-heater requirements.",
        "Insulation and assessment offerings must follow current program rules and provider requirements.",
        "Commercial, industrial, multifamily, and large single-family projects must go through the custom energy efficiency review process when not prescriptive."
      ],
      "blockers": [
        "Energy audits or assessments are services, not physical retrofits.",
        "Boiler burner controls, steam traps, and waste heat recovery are not prescriptive categories on the current rebate page.",
        "Steam trap and waste heat projects should only match through a custom-project category after program review.",
        "Generic HVAC replacement should be narrowed to natural-gas furnace, boiler, or approved custom measures."
      ],
      "programType": "Natural Gas Efficiency Rebate",
      "administrator": "Colorado Natural Gas",
      "applicationUrl": "https://www.coloradonaturalgas.com/Rebates",
      "websiteUrl": "https://www.coloradonaturalgas.com/efficiency",
      "sourceUrlsChecked": [
        "https://www.coloradonaturalgas.com/Rebates",
        "https://www.coloradonaturalgas.com/efficiency"
      ],
      "evidenceText": "Colorado Natural Gas lists rebates for high-efficiency furnaces, smart thermostats, tankless water heaters, high-efficiency boilers, insulation, home energy assessments, and a custom efficiency program.",
      "reasoningNotes": "Preserved gas equipment, insulation, audit, and custom pathways. Blocked inferred industrial steam-trap and waste-heat matches unless the project is reviewed under the custom program."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8850c72cf48a3a7f_v1",
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
        "formula": "$100 per eligible unit",
        "evidenceText": "DOWNLOADABLE FORM ELECTRONIC FORM $100 SMART THERMOSTAT REBATE ENERGY STAR® Certified Smart thermostats can be programmed to control the temperature of your home based on your schedule, and some can automatically learn your schedule to keep you comfortable when you’re home, and adjust when you’re away",
        "sourceUrlsChecked": [
          "https://coloradonaturalgas.com/efficiency"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3169",
    "opportunityName": "Kissimmee Utility Authority - Residential & Commercial Energy Efficiency Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3169/kissimmee-utility-authority-residential-and-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://kua.com/energy-conservation/rebates/",
    "applicationUrl": "https://kua.com/energy-conservation/rebates/",
    "administrator": "Kissimmee Utility Authority",
    "programType": "Residential And Commercial Rebate",
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
          "air sealing"
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
          "level-2",
          "level ii"
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
          "FL"
        ],
        "counties": [
          "Osceola County"
        ],
        "cities": [
          "Kissimmee"
        ],
        "utilityTerritories": [
          "Kissimmee Utility Authority electric service territory"
        ],
        "notes": "Applies to eligible KUA customers; most listed measures are residential, while commercial lighting applies to eligible commercial accounts."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "commercial_electric_customer",
        "homeowner",
        "business_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "central_air_conditioner_heat_pump_replacement",
        "duct_leak_repair_replacement",
        "insulation_upgrade",
        "smart_thermostat_zoning_retrofit",
        "commercial_lighting_retrofit",
        "heat_pump_water_heater",
        "level_2_home_ev_charger"
      ],
      "hardRequirements": [
        "Customer must have an active KUA account and meet the account-type requirements for the measure.",
        "KUA requires an in-home audit before eligible rebate work for listed residential measures.",
        "Required documentation must be submitted within the program deadline after installation.",
        "HVAC work must meet efficiency specifications and use a KUA participating or properly licensed contractor where required."
      ],
      "blockers": [
        "Air sealing is not a supported category; current KUA support is for duct leak repair or replacement and insulation.",
        "LED matching should be limited to commercial lighting retrofit, not residential LED bulbs or broad lighting upgrades.",
        "EV charging should be narrowed to Level 2 home EV charger requirements.",
        "Do not infer commercial HVAC or water-heating rebates where KUA lists residential-only requirements."
      ],
      "programType": "Residential And Commercial Rebate",
      "administrator": "Kissimmee Utility Authority",
      "applicationUrl": "https://kua.com/energy-conservation/rebates/",
      "websiteUrl": "https://kua.com/energy-conservation/rebates/",
      "sourceUrlsChecked": [
        "https://kua.com/energy-conservation/rebates/",
        "https://kua.com/energy-conservation-and-renewables/kua-rebates-and-participating-contractors/"
      ],
      "evidenceText": "KUA lists rebates for heat pump central AC, duct leak repair or replacement, insulation, smart thermostats, commercial lighting retrofit, electric hybrid heat pump water heaters, and Level 2 home EV chargers.",
      "reasoningNotes": "Retained KUA-supported categories and separated residential measures from commercial lighting. Replaced broad air sealing with duct leak repair and narrowed EV charging to Level 2 home chargers."
    },
    "existingSimpleRules": [
      {
        "id": "oir_c8fded6ac4a0a609_v1",
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
        "formula": "$100 per Level 2 home EV charger",
        "evidenceText": "KUA rebate page lists Level 2 Home EV Charger at $100.",
        "sourceUrlsChecked": [
          "https://kua.com/energy-conservation/rebates/",
          "https://kua.com/energy-conservation/rebates/level-2-home-ev-charger-rebate/"
        ],
        "reasoningNotes": "Matched Level 2 EV charger terms. Use one unit as one eligible installed home charger.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22127",
    "opportunityName": "TVA - Commercial Energy Efficiency Rebate Program",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22127/tva-commercial-energy-efficiency-rebate-program",
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
          "GA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "TVA local power company customers",
          "TVA direct-served customers"
        ],
        "notes": "Limited to TVA-served business customers in the Georgia portion of the Tennessee Valley; local power company participation and funding apply."
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
        "id": "oir_e5bb6a891dd4f4b6_v1",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3134",
    "opportunityName": "Idaho Power - Residential Energy Efficiency Rebate Programs",
    "state": "ID",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3134/idaho-power-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/",
    "applicationUrl": "https://docs.idahopower.com/pdfs/energyefficiency/hvac/incentiveapplication.pdf",
    "administrator": "Idaho Power",
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
          "ID",
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Idaho Power residential electric service territory"
        ],
        "notes": "Although the DSIRE target state is Oregon, Idaho Power residential offers apply across eligible Idaho Power service territory in Idaho and Oregon."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "property_owner",
        "property_manager",
        "builder",
        "participating_contractor"
      ],
      "eligibleSectors": [
        "residential",
        "residential_new_construction"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "ductless_heat_pump",
        "ground_source_geothermal_heat_pump",
        "water_source_heat_pump",
        "central_air_conditioner_replacement",
        "duct_sealing_and_insulation",
        "electronically_commutated_air_handler_motor",
        "smart_thermostat_zoning_retrofit",
        "heat_pump_water_heater",
        "evaporative_cooler",
        "whole_house_fan"
      ],
      "hardRequirements": [
        "Customer must be served by Idaho Power and meet the applicable residential rate and dwelling requirements.",
        "Heating and cooling measures must meet Idaho Power's current efficiency specifications and application requirements.",
        "Some measures must be installed by participating contractors or submitted through the trade ally process.",
        "Heat pump water heaters, thermostats, and HVAC measures have measure-specific eligibility and documentation requirements."
      ],
      "blockers": [
        "Air sealing is not verified as a current Idaho Power residential rebate and should not be inferred from duct sealing.",
        "Refrigeration and commercial refrigerator ECM categories are false positives; the supported motor category is an air-handler electronically commutated motor.",
        "Do not match commercial, industrial, or foodservice equipment to this residential program.",
        "Duct sealing should not be generalized into all weatherization."
      ],
      "programType": "Residential Rebate",
      "administrator": "Idaho Power",
      "applicationUrl": "https://docs.idahopower.com/pdfs/energyefficiency/hvac/incentiveapplication.pdf",
      "websiteUrl": "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/",
      "sourceUrlsChecked": [
        "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/",
        "https://docs.idahopower.com/pdfs/energyefficiency/hvac/incentiveapplication.pdf",
        "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/heating-and-cooling-efficiency-program/heat-pump-water-heater/",
        "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/heating-and-cooling-efficiency-program/smart-thermostat-existing-homes/",
        "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/heating-and-cooling-efficiency-program/ducted-air-source-heat-pump-existing-homes/",
        "https://docs.idahopower.com/pdfs/aboutus/ratesregulatory/tariffs/290.pdf"
      ],
      "evidenceText": "Idaho Power residential materials support air-source, ductless, ground-source and water-source heat pumps, central AC, duct sealing, air-handler ECMs, smart thermostats, HPWHs, evaporative coolers, and whole-house fans.",
      "reasoningNotes": "Kept residential HVAC, controls, water-heating, and fan/cooler categories. Removed air sealing and refrigeration false positives by narrowing ECM to air-handler motor measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8032c0dffbc169d1_v1",
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
        "formula": "$50 per smart thermostat",
        "evidenceText": "Idaho Power smart thermostat page lists the incentive as $50.",
        "sourceUrlsChecked": [
          "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/heating-and-cooling-efficiency-program/smart-thermostat-existing-homes/",
          "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/"
        ],
        "reasoningNotes": "Matched smart thermostat term. Use one unit as one qualifying thermostat.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_8a69e5faa5358c29_v1",
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
        "formula": "$300 per hybrid heat pump water heater",
        "evidenceText": "Idaho Power heat pump water heater page lists the incentive as $300.",
        "sourceUrlsChecked": [
          "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/heating-and-cooling-efficiency-program/heat-pump-water-heater/",
          "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-home/rebates-and-offers/"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying Tier 2 or better HPWH.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3166",
    "opportunityName": "ComEd - Energy Efficiency Program for Residential",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3166/comed-energy-efficiency-program-for-residential",
    "websiteUrl": "https://www.comed.com/WaystoSave/ForYourHome/Pages/RebatesDiscounts.aspx",
    "applicationUrl": "https://comedappliancerebates.com/",
    "administrator": "ComEd",
    "programType": "Rebate And Instant Discount Program",
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
          "ComEd electric service territory"
        ],
        "notes": "Eligible ComEd residential electric customers; some offers are income-qualified or contractor-delivered."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "income_qualified_residential_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential",
        "income_qualified_residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "high_efficiency_hvac_replacement",
        "high_efficiency_clothes_washer",
        "heat_pump_clothes_dryer",
        "residential_induction_cooking",
        "led_lighting_retrofit",
        "low_flow_showerhead_aerator",
        "smart_thermostat"
      ],
      "hardRequirements": [
        "Must be an eligible ComEd residential customer.",
        "HVAC and geothermal incentives require qualifying equipment and approved program delivery.",
        "Appliance and weatherization measures must meet product, income, or channel-specific requirements."
      ],
      "blockers": [
        "Residential induction is not commercial kitchen equipment.",
        "Showerheads or aerators are not broad plumbing retrofits.",
        "Do not infer commercial or industrial eligibility."
      ],
      "programType": "Rebate And Instant Discount Program",
      "administrator": "ComEd",
      "applicationUrl": "https://comedappliancerebates.com/",
      "websiteUrl": "https://www.comed.com/WaystoSave/ForYourHome/Pages/RebatesDiscounts.aspx",
      "sourceUrlsChecked": [
        "https://www.comed.com/WaystoSave/ForYourHome/Pages/RebatesDiscounts.aspx",
        "https://comedappliancerebates.com/",
        "https://www.comed.com/cdn/assets/v3/assets/blt3ebb3fed6084be2a/bltb8206206cff6f9c9/68bef7975c76c05195ee2699/2025_HHC_Customer_Guide_V3_September_Update.pdf?branch=prod_alias"
      ],
      "evidenceText": "Current]( ComEd materials support residential appliance rebates, thermostats, heat pump and geothermal HVAC, weatherization, lighting, and limited water-saving direct-install devices.",
      "reasoningNotes": "Narrowed product-specific matches; kept geothermal from the official customer guide."
    },
    "existingSimpleRules": [
      {
        "id": "oir_be7098f7a9845e59_v1",
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
        "confidence": "high",
        "formula": "$75 per ENERGY STAR certified smart thermostat",
        "evidenceText": "ComEd appliance rebates page lists Smart Thermostat at $75.",
        "sourceUrlsChecked": [
          "https://comedappliancerebates.com/",
          "https://goelectric.comed.com/incentives-and-financing/"
        ],
        "reasoningNotes": "Matched smart thermostat term. Use one unit as one qualifying thermostat.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22124",
    "opportunityName": "TVA - Commercial Energy Efficiency Rebate Program",
    "state": "KY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22124/tva-commercial-energy-efficiency-rebate-program",
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
          "KY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "TVA local power company customers",
          "TVA direct-served customers"
        ],
        "notes": "Limited to TVA-served business customers in the Kentucky portion of the Tennessee Valley; local power company participation and funding apply."
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
        "id": "oir_8c6e55f82535de13_v1",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3594",
    "opportunityName": "Consumers Energy (Gas) - Commercial Energy Efficiency Program",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3594/consumers-energy-gas-commercial-energy-efficiency-program",
    "websiteUrl": "https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts",
    "applicationUrl": "https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts",
    "administrator": "Consumers Energy Business Solutions",
    "programType": "Business Energy Efficiency Rebate",
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
          "building automation",
          "building automation system"
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
        "retrofitTypeId": "leed_certification",
        "displayName": "LEED certification",
        "parentCategory": "certifications_compliance",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "leed"
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
          "MI"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Consumers Energy commercial electric and natural gas service territory"
        ],
        "notes": "Applies to eligible Consumers Energy business customers in Michigan; eligibility depends on qualifying electric or natural gas service and measure fuel."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "multifamily_common_area_customer",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional",
        "multifamily_common_area"
      ],
      "eligibleRetrofitCategories": [
        "building_automation_system",
        "high_efficiency_hvac_replacement",
        "advanced_air_distribution_energy_recovery",
        "domestic_water_heating_upgrade",
        "high_efficiency_laundry_equipment",
        "commercial_kitchen_foodservice_equipment",
        "high_efficiency_refrigeration_equipment",
        "insulation_upgrade",
        "pipe_ductwork_insulation",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "variable_frequency_drive_retrofit",
        "compressed_air_system_optimization",
        "manufacturing_process_efficiency",
        "agricultural_energy_efficiency",
        "laboratory_energy_efficiency",
        "retro_commissioning",
        "energy_audit",
        "leed_certification"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Consumers Energy business customer receiving the required electric or natural gas service.",
        "Equipment must be new, meet current Consumers Energy Business Solutions specifications, and be submitted under the correct prescriptive, custom, or study pathway.",
        "Some projects require pre-approval before purchase or installation.",
        "Program policies, incentive caps, baseline rules, and application deadlines in the current manual apply."
      ],
      "blockers": [
        "Do not infer residential appliances or home weatherization from this business program.",
        "Ground-source geothermal, solar, wind, on-site generation, fuel switching, used equipment, and peak-shifting measures are excluded or unsupported by the current manual unless separately authorized.",
        "LEED certification and audits are non-physical support categories, not retrofit equipment.",
        "Laundry and refrigeration are commercial or business measures, not residential appliance rebates."
      ],
      "programType": "Business Energy Efficiency Rebate",
      "administrator": "Consumers Energy Business Solutions",
      "applicationUrl": "https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts",
      "websiteUrl": "https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts",
      "sourceUrlsChecked": [
        "https://www.consumersenergy.com/business/savings-and-energy-solutions/rebates-and-discounts",
        "https://www.consumersenergy.com/business/savings-and-energy-solutions/energy-efficiency",
        "https://www.clearesult.com/partner-hub/program-resources/consumers-energy-business/Policies-Procedures-Manual"
      ],
      "evidenceText": "Consumers Energy business program materials cover BAS, HVAC, air distribution, water heating, kitchen, laundry, refrigeration, insulation, lighting, VFDs, compressed air, studies, and custom projects.",
      "reasoningNotes": "Retained commercial and industrial categories supported by current business manuals. Removed unsupported geothermal inference and noted that LEED and audits are not physical retrofits."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b92b98009f58e2de_v1",
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
        "reasoningNotes": "Matched broad commercial custom efficiency. Use for electric custom projects with verified annual kWh savings.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1930",
    "opportunityName": "Alexandria Light and Power - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1930/alexandria-light-and-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.alputilities.com/residential/rebates-programs/",
    "applicationUrl": null,
    "administrator": "ALP Utilities / Bright Energy Solutions",
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
          "ev charger",
          "ev charging",
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
          "MN"
        ],
        "counties": [
          "Douglas County"
        ],
        "cities": [
          "Alexandria"
        ],
        "utilityTerritories": [
          "ALP Utilities"
        ],
        "notes": "Applies to ALP Utilities residential electric customers through Bright Energy Solutions."
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
        "hvac_tune_up",
        "level_2_ev_charger_installation",
        "residential_clothes_washer",
        "residential_dishwasher",
        "residential_led_lighting",
        "air_purifier",
        "ceiling_fan_replacement",
        "dehumidifier",
        "whole_home_dehumidifier",
        "residential_room_window_air_conditioner",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "central_air_conditioner",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "domestic_hot_water_circulator_ecm",
        "electric_water_heater_load_management"
      ],
      "hardRequirements": [
        "Equipment must be new and installed in a residence or residential space served by ALP or another participating Bright utility.",
        "Applications and required documents must be received within 180 days of installation for 2026 forms."
      ],
      "blockers": [
        "LED fixture means residential LED recessed can fixture or retrofit kit, not broad commercial lighting.",
        "Fixture does not mean low-flow plumbing fixture; no low-flow fixture rebate was verified.",
        "Room/window air conditioner is not window replacement."
      ],
      "programType": "Rebate Program",
      "administrator": "ALP Utilities / Bright Energy Solutions",
      "applicationUrl": null,
      "websiteUrl": "https://www.alputilities.com/residential/rebates-programs/",
      "sourceUrlsChecked": [
        "https://www.alputilities.com/residential/rebates-programs/",
        "https://www.alputilities.com/wp-content/uploads/2026-Heating-and-Cooling-Residential.pdf"
      ],
      "evidenceText": "ALP's]( residential page lists Bright Energy Solutions rebates for tune-ups, Level 2 EV chargers, appliances, LED fixtures, air quality products, heat pumps, geothermal, smart thermostats, HPWH, circulators, and controlled water heaters.",
      "reasoningNotes": "Repaired false matches by narrowing fixtures to LED lighting and room AC to product-specific air conditioning, not windows."
    },
    "existingSimpleRules": [
      {
        "id": "oir_53b8b978f0e7c356_v1",
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
        "evidenceText": "Bright Energy Solutions EV form lists other Level 2 charger rebate at $150.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles/electric-vehicle-charging-program",
          "https://www.alputilities.com/wp-content/uploads/2026-EV-Charger-Rebate-Form.pdf"
        ],
        "reasoningNotes": "Returned separately from ChargePoint-specific amount.",
        "mapping": {
          "primarySavingsModelId": "ev_charging_site_load",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_fb651071bddd3be3_v1",
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
        "evidenceText": "Bright Energy Solutions EV form lists ChargePoint Home Flex connected charger at $500.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles/electric-vehicle-charging-program",
          "https://www.alputilities.com/wp-content/uploads/2026-EV-Charger-Rebate-Form.pdf"
        ],
        "reasoningNotes": "Matched Level 2 EV charging. Medium confidence because local utility participation should be verified.",
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
