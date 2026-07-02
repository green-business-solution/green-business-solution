You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 31
Targets in this prompt: 601-620 of 984
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
  "batchNumber": 31,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:5381"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22453",
    "opportunityName": "Minnkota Power Cooperative - PowerSaves Residential Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22453/minnkota-power-cooperative-powersaves-residential-rebate-program",
    "websiteUrl": "https://www.minnkota.com/our-programs/residential-programs",
    "applicationUrl": "https://cdn.prod.website-files.com/5ef212e2cdca1e094063db4e/696517639fd68eca56f3c321_Electric%20Rebates%20Application-2026-Fillable.pdf",
    "administrator": "Minnkota Power Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 9,
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
          "programmable thermostat",
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Minnkota PowerSavers participating member cooperatives and municipal utilities"
        ],
        "notes": "Not statewide; implemented by participating Minnkota utilities with local requirements."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "member_customer",
        "low_income_household_for_weatherization_agency_program"
      ],
      "eligibleSectors": [
        "residential",
        "low_income_residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "high_efficiency_hvac_replacement",
        "electric_water_heater",
        "high_efficiency_clothes_washer",
        "low_income_weatherization"
      ],
      "hardRequirements": [
        "Customer must be served by a participating PowerSavers utility.",
        "Local utility requirements and budgets apply.",
        "EV charging must be Level 2 or Level 3, 240 volts, hard-wired, and on demand response where required."
      ],
      "blockers": [
        "Do not treat this as statewide.",
        "Do not match broad low-flow fixtures.",
        "Do not infer refrigerator or freezer rebates without a current participating-utility form."
      ],
      "programType": "Rebate Program",
      "administrator": "Minnkota Power Cooperative",
      "applicationUrl": "https://cdn.prod.website-files.com/5ef212e2cdca1e094063db4e/696517639fd68eca56f3c321_Electric%20Rebates%20Application-2026-Fillable.pdf",
      "websiteUrl": "https://www.minnkota.com/our-programs/residential-programs",
      "sourceUrlsChecked": [
        "https://www.minnkota.com/our-programs/residential-programs",
        "https://www.minnkota.com/our-programs/rebates-energy-incentives",
        "https://cdn.prod.website-files.com/5ef212e2cdca1e094063db4e/696517639fd68eca56f3c321_Electric%20Rebates%20Application-2026-Fillable.pdf"
      ],
      "evidenceText": "Minnkota]( pages describe residential PowerSavers incentives for HVAC, water heaters, ENERGY STAR clothes washers, low-income weatherization, and qualifying electric charging equipment.",
      "reasoningNotes": "Removed unsupported broad plumbing and refrigeration matches; local utility confirmation remains necessary."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Minnkota residential program page lists rebate categories but no target EV or appliance formula was verified.",
        "sourceUrlsChecked": [
          "https://www.minnkota.com/our-programs/rebates-energy-incentives"
        ],
        "reasoningNotes": "Matched terms span several residential measures; no single current formula was safely selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5528",
    "opportunityName": "Minnkota Power Cooperative (11 Utilities) - PowerSavers Commercial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5528/minnkota-power-cooperative-11-utilities-powersavers-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.minnkota.com/our-programs/business-programs",
    "applicationUrl": null,
    "administrator": "Minnkota Power Cooperative",
    "programType": "Commercial Rebate And Custom Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "led fixture",
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
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "variable frequency drive"
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
          "Minnkota PowerSavers participating member cooperatives and municipal utilities"
        ],
        "notes": "Available through participating Minnkota utilities; preapproval and local participation may control eligibility."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "industrial_electric_customer",
        "agricultural_electric_customer",
        "school",
        "retail_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "public",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "high_efficiency_refrigeration_equipment",
        "commercial_foodservice_equipment",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "variable_frequency_drive_retrofit",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Project must be served by a participating PowerSavers utility.",
        "Business custom projects require preapproval.",
        "Measures must produce verifiable electric savings."
      ],
      "blockers": [
        "Do not infer residential laundry or appliance rebates.",
        "Do not match low-flow plumbing unless a current business form lists it.",
        "Exclude power generation and unrelated renewables unless expressly allowed."
      ],
      "programType": "Commercial Rebate And Custom Incentive Program",
      "administrator": "Minnkota Power Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.minnkota.com/our-programs/business-programs",
      "sourceUrlsChecked": [
        "https://www.minnkota.com/our-programs/business-programs",
        "https://www.minnkota.com/our-programs/rebates-energy-incentives"
      ],
      "evidenceText": "Minnkota]( business pages identify prescriptive and custom incentives for HVAC, lighting, variable speed drives, food service, and other commercial or industrial efficiency projects.",
      "reasoningNotes": "Kept business HVAC, lighting, foodservice, refrigeration, VFD, and custom categories; removed residential and broad plumbing matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Minnkota business materials reference multiple commercial rebates and custom opportunities.",
        "sourceUrlsChecked": [
          "https://www.minnkota.com/our-programs/business-programs"
        ],
        "reasoningNotes": "Specific measure selection is required.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2547",
    "opportunityName": "Mora Municipal Utilities - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2547/mora-municipal-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ci.mora.mn.us/electric-utility/pages/rebates-energy-efficiency",
    "applicationUrl": "https://smmpa.com/members/mora",
    "administrator": "Mora Municipal Utilities",
    "programType": "Residential Rebate Program Through SMMPA",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MN"
        ],
        "counties": [
          "Kanabec County"
        ],
        "cities": [
          "Mora"
        ],
        "utilityTerritories": [
          "Mora Municipal Utilities"
        ],
        "notes": "Restricted to Mora Municipal Utilities electric customers participating through SMMPA rebate forms."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_energy_star_appliances",
        "heat_pump_water_heater",
        "level_2_ev_charger_installation",
        "high_efficiency_hvac_replacement",
        "cooling_tune_up",
        "ecm_circulator_pump",
        "efficient_fan_blower_replacement",
        "efficient_pool_pump",
        "aerosol_duct_sealing"
      ],
      "hardRequirements": [
        "Applicant must be a Mora Municipal Utilities electric customer.",
        "Use the current SMMPA 2026 residential form for the specific measure.",
        "ENERGY STAR product, EV charger, cooling equipment, tune-up, fan motor, pool pump, and aerosol sealing forms have separate documentation requirements.",
        "Receipts, model information, and utility account information are required where specified."
      ],
      "blockers": [
        "Ground-source heat pumps, commercial lighting, commercial refrigeration, food-service equipment, motors, and variable-speed drives are listed under SMMPA Business Rebates, not this residential opportunity.",
        "Furnace fan motor is a fan or motor measure, not a broad furnace replacement rebate.",
        "ENERGY STAR product rebates are residential product-specific and should not be generalized to commercial refrigeration or kitchen equipment.",
        "EV eligibility is limited to the ENERGY STAR EV charger form and should not be treated as vehicle purchase support."
      ],
      "programType": "Residential Rebate Program Through SMMPA",
      "administrator": "Mora Municipal Utilities",
      "applicationUrl": "https://smmpa.com/members/mora",
      "websiteUrl": "https://www.ci.mora.mn.us/electric-utility/pages/rebates-energy-efficiency",
      "sourceUrlsChecked": [
        "https://www.ci.mora.mn.us/electric-utility/pages/rebates-energy-efficiency",
        "https://smmpa.com/members/mora"
      ],
      "evidenceText": "SMMPA lists 2026 Mora residential forms for ENERGY STAR products, EV chargers, cooling equipment, tune-ups, ECM circulator pumps, furnace fan motors, pool pumps, and aerosol sealing.",
      "reasoningNotes": "The original match mixed residential and business measures. Retain only the SMMPA residential form categories and block business-only lighting, refrigeration, food service, VSD, and geothermal categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Mora municipal rebate pages point to residential rebate forms but no current EV charger amount was verified.",
        "sourceUrlsChecked": [
          "https://smmpa.com/members/mora",
          "https://programs.dsireusa.org/system/program/detail/2547"
        ],
        "reasoningNotes": "Primary target is EV charging; no source-backed Level 2 formula was found.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2865",
    "opportunityName": "Rochester Public Utilities - Residential Conserve and Save Rebate",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2865/rochester-public-utilities-residential-conserve-and-save-rebate",
    "websiteUrl": "https://www.rpu.org/rebates-programs/conserve-save-rebates/residential-rebates/",
    "applicationUrl": "https://www.rpu.org/rebates-programs/conserve-save-rebates/residential-rebates/",
    "administrator": "Rochester Public Utilities",
    "programType": "Residential Electric And Water Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
          "mini split"
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
        "counties": [
          "Olmsted County"
        ],
        "cities": [
          "Rochester"
        ],
        "utilityTerritories": [
          "Rochester Public Utilities"
        ],
        "notes": "Restricted to Rochester Public Utilities residential electric or water customers depending on measure."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_owner_permission"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "aerosol_duct_sealing",
        "duct_sealing_and_insulation",
        "central_air_conditioner_replacement",
        "cooling_tune_up",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "ecm_circulator_pump",
        "efficient_fan_blower_replacement",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "air_purifier",
        "residential_clothes_washer",
        "washer_dryer_combination",
        "heat_pump_clothes_dryer",
        "residential_dishwasher",
        "residential_refrigerator_freezer_rebate",
        "induction_cooking_equipment",
        "room_air_conditioner",
        "level_2_ev_charger_installation",
        "efficient_pool_pump",
        "high_efficiency_toilet",
        "rain_barrel",
        "weather_based_irrigation_controller"
      ],
      "hardRequirements": [
        "Applicant must be an RPU residential customer for the applicable electric or water measure.",
        "EV charger rebate requires RPU Time-of-Use rate participation where stated.",
        "Induction cooktop or range rebate requires replacing gas equipment or installation in a new home.",
        "ENERGY STAR appliance rebates require eligible products and completed RPU application documentation.",
        "Aerosol duct sealing, cooling tune-up, HVAC, water heating, pool pump, and water rebates each have separate measure requirements."
      ],
      "blockers": [
        "Do not match residential dishwashers to commercial dishwasher equipment.",
        "Do not match residential refrigerator and freezer rebates to commercial refrigeration equipment.",
        "Induction cooking is residential cooktop or range support and not a commercial kitchen retrofit.",
        "EV Time-of-Use enrollment and bill credits are separate from the Level 2 charger rebate.",
        "No current residential LED lighting rebate was verified on the RPU residential rebate page."
      ],
      "programType": "Residential Electric And Water Rebate Program",
      "administrator": "Rochester Public Utilities",
      "applicationUrl": "https://www.rpu.org/rebates-programs/conserve-save-rebates/residential-rebates/",
      "websiteUrl": "https://www.rpu.org/rebates-programs/conserve-save-rebates/residential-rebates/",
      "sourceUrlsChecked": [
        "https://www.rpu.org/rebates-programs/conserve-save-rebates/residential-rebates/"
      ],
      "evidenceText": "RPU residential rebates include aerosol duct sealing, HVAC, heat pumps, HPWH, thermostats, ENERGY STAR appliances, induction cooking, EV Level 2 chargers, pool pumps, and water rebates.",
      "reasoningNotes": "The repair keeps many residential product-specific categories and removes commercial dishwasher, commercial refrigeration, and LED false positives. Water conservation measures are supported because RPU explicitly lists residential water rebates."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "GPT Pro found heat pump water heater and thermostat values, but this target is mapped to whole-building custom efficiency.",
        "sourceUrlsChecked": [
          "https://www.rpu.org/rebates-programs/rebates/residential-rebates.php",
          "https://www.rpu.org/rebates-programs/residential/conserve-save.php"
        ],
        "reasoningNotes": "A measure-specific rule should not be attached to a whole-building per-kWh target without a clear target measure selection.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1589",
    "opportunityName": "Xcel Energy (Electric) - Business Energy Efficiency Rebate Programs",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1589/xcel-energy-electric-business-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.xcelenergy.com/programs_and_rebates/business_programs_and_rebates",
    "applicationUrl": null,
    "administrator": "Xcel Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
          "refrigeration",
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Xcel Energy Minnesota electric service territory",
          "Xcel Energy Minnesota natural gas service territory"
        ],
        "notes": "Measure eligibility depends on whether the customer receives Xcel electric, gas or both at the Minnesota business premise."
      },
      "eligibleApplicantTypes": [
        "business_electric_customers",
        "business_gas_customers",
        "commercial_customers",
        "industrial_customers",
        "multifamily_business_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "municipal",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "networked_lighting_controls",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "boiler_controls_burner_retrofit",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_furnace_retrofit",
        "commercial_water_heater",
        "pipe_insulation",
        "steam_trap_repair_replacement",
        "energy_recovery_ventilation",
        "hvls_destratification_fans",
        "variable_frequency_drive_retrofit",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_retrofit",
        "refrigeration_ec_motor_retrofit",
        "anti_sweat_heater_controls",
        "walk_in_cooler_freezer_upgrade",
        "efficient_motors",
        "ecm_pump_fan_retrofit",
        "custom_energy_efficiency_project"
      ],
      "hardRequirements": [
        "Qualifying equipment must be installed in Xcel Energy Minnesota business electric and/or natural gas service territory.",
        "Submit completed application, itemized invoices and required specifications or photos within current program timeframes.",
        "Rebate cannot exceed applicable project-cost caps and program rules.",
        "Lighting retrofits require pre-installation pictures and completed lighting calculator.",
        "Custom efficiency projects require approval before equipment is ordered, purchased or installed."
      ],
      "blockers": [
        "Do not treat the word insulation as general building-envelope insulation; current business HVAC-R sources support pipe insulation only.",
        "Refrigeration measures are for commercial refrigeration equipment, controls, motors and cases, not residential refrigerators or freezers.",
        "VFDs on compressors and many non-prescriptive process applications require custom review or are not eligible under the prescriptive VFD schedule.",
        "Measure must use the correct Xcel fuel or service type; gas-only measures cannot match electric-only premises."
      ],
      "programType": "Rebate Program",
      "administrator": "Xcel Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.xcelenergy.com/programs_and_rebates/business_programs_and_rebates",
      "sourceUrlsChecked": [
        "https://www.xcelenergy.com/programs_and_rebates/business_programs_and_rebates",
        "https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates/business-lighting-efficiency",
        "https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates/hvac-r",
        "https://www.xcelenergy.com/staticfiles/xe-responsive/Business%20Programs%20%26%20Rebates/Equipment%20Rebates/17-9181%20%2804-24%29%20MN-HVAC-R_app%20January%201%2C%202024%2C%20or%20later%201%20042224.pdf",
        "https://www.xcelenergy.com/staticfiles/xe-responsive/Business%20Programs%20%26%20Rebates/Equipment%20Rebates/mn-hvacr-pipe-insulation.pdf"
      ],
      "evidenceText": "Xcel’s Minnesota business HVAC-R and lighting sources apply to business electric or gas customers and support commercial lighting, HVAC, heat pumps, VFDs, motors, pipe insulation, refrigeration controls/equipment and custom efficiency. General building insulation is not supported.",
      "reasoningNotes": "Retained refrigeration, VFD, HVAC and lighting categories; narrowed insulation to pipe insulation rather than envelope insulation."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Xcel Minnesota business rebates include multiple refrigeration and lighting-control measures, but exact current measure value was not selected.",
        "sourceUrlsChecked": [
          "https://mn.my.xcelenergy.com/s/business/energy-savings/business-rebates",
          "https://www.xcelenergy.com/programs_and_rebates"
        ],
        "reasoningNotes": "Target includes many refrigeration submeasures; a current measure table extraction is needed before creating a rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5101",
    "opportunityName": "Business Energy Efficiency Rebates (Offered by 5 Utilities)",
    "state": "ND",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5101/business-energy-efficiency-rebates-offered-by-5-utilities",
    "websiteUrl": "https://www.brightenergysolutions.com/resources/business",
    "applicationUrl": "https://www.brightenergysolutions.com/members",
    "administrator": "Bright Energy Solutions / Missouri River Energy Services",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
    "targetKind": "reviewed_no_rule_reclassification",
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
          "ND"
        ],
        "counties": [],
        "cities": [
          "Cavalier",
          "Hillsboro",
          "Lakota",
          "Northwood",
          "Valley City"
        ],
        "utilityTerritories": [
          "Cavalier Municipal Utilities",
          "Hillsboro Municipal Utilities",
          "Lakota Municipal Utilities",
          "Northwood Municipal Utilities",
          "Valley City Public Works"
        ],
        "notes": "Applies to business customers of the North Dakota municipal utilities participating in Bright Energy Solutions through Missouri River Energy Services."
      },
      "eligibleApplicantTypes": [
        "business customers of participating municipal electric utilities",
        "commercial electric customers",
        "industrial electric customers",
        "food-service businesses",
        "grocery and refrigeration customers",
        "manufacturing customers",
        "public or institutional customers served by a participating utility",
        "trade allies and contractors supporting eligible customer applications"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "municipal",
        "institutional",
        "food_service",
        "grocery",
        "cold_storage",
        "manufacturing",
        "hospitality",
        "warehouse"
      ],
      "eligibleRetrofitCategories": [
        "commercial_refrigeration",
        "refrigeration_ec_motors",
        "glass_door_reach_in_cases",
        "efficient_ice_machines",
        "refrigerated_case_lighting",
        "refrigeration_occupancy_sensors",
        "no_heat_or_low_heat_reach_in_doors",
        "strip_curtains",
        "commercial_food_service_equipment",
        "commercial_dishwashers",
        "commercial_fryers",
        "commercial_griddles",
        "commercial_induction_cooking",
        "commercial_steamers",
        "commercial_ovens",
        "demand_controlled_kitchen_ventilation",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "geothermal_ground_source_heat_pump",
        "variable_refrigerant_flow_heat_pump",
        "central_air_conditioning",
        "chillers",
        "heat_pump_water_heater",
        "energy_recovery_ventilation",
        "guestroom_energy_management",
        "window_wall_room_air_conditioner",
        "compressed_air",
        "compressed_air_controls",
        "compressed_air_vfd_compressors",
        "pumps_and_variable_frequency_drives",
        "lighting_retrofit",
        "new_construction_lighting",
        "networked_lighting_controls",
        "custom_energy_efficiency",
        "custom_electrification",
        "electric_forklift_or_tow_tractor",
        "new_construction_design_review"
      ],
      "hardRequirements": [
        "Applicant must be served by one of the participating North Dakota municipal electric utilities listed by Bright Energy Solutions.",
        "Many business projects require preapproval before equipment is ordered, purchased or installed.",
        "Measure eligibility and documentation requirements are governed by the current Bright Energy Solutions business forms and the local municipal utility.",
        "Custom efficiency and custom electrification incentives require project-specific review and approval.",
        "Incentives are subject to funding availability and may change without notice."
      ],
      "blockers": [
        "Matched term window is supported only as window or wall room air-conditioning equipment, not window replacement or glazing.",
        "Energy management is limited to guestroom energy management, lighting or HVAC controls, or approved custom projects.",
        "Electric forklift incentives are business transportation or electrification measures and should not be mapped to building HVAC or appliance savings.",
        "This is a business program and should not be matched to residential appliance or home-weatherization projects.",
        "Refrigeration support is commercial refrigeration only, not residential refrigerator or freezer replacement."
      ],
      "programType": "Rebate Program",
      "administrator": "Bright Energy Solutions / Missouri River Energy Services",
      "applicationUrl": "https://www.brightenergysolutions.com/members",
      "websiteUrl": "https://www.brightenergysolutions.com/resources/business",
      "sourceUrlsChecked": [
        "https://www.brightenergysolutions.com/members",
        "https://www.brightenergysolutions.com/resources/business",
        "https://www.brightenergysolutions.com/members/valley-city-public-works",
        "https://d23r6s4dwed217.cloudfront.net/general-uploads/BES_2026_Business_TriFold_Brochure.pdf",
        "http://www.brightenergysolutions.com/find-a-rebate/",
        "https://programs.dsireusa.org/system/program/detail/5101/business-energy-efficiency-rebates-offered-by-5-utilities"
      ],
      "evidenceText": "Bright Energy Solutions lists five North Dakota public power utility members and current business rebate categories covering commercial refrigeration, food service, heating and cooling, compressed air, pumps and VFDs, lighting, custom projects, electric forklifts and new construction design review. The 2026 business brochure states that rebates are offered through the customer's local municipal utility in partnership with Missouri River Energy Services and that some projects require preapproval.",
      "reasoningNotes": "The opportunity is active but should be treated as a Bright Energy Solutions/MRES business rebate platform for specific participating North Dakota municipal utilities, not a statewide or residential program."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Bright Energy Solutions business rebates vary by member utility and equipment category.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/find-a-rebate/",
          "https://programs.dsireusa.org/system/program/detail/5101"
        ],
        "reasoningNotes": "Target refrigeration measure needs a utility-specific current measure table value.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3963",
    "opportunityName": "McMinnville Water and Light - Residential Energy Efficiency Rebate Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3963/mcminnville-water-and-light-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/",
    "applicationUrl": "https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/",
    "administrator": "McMinnville Water & Light",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
          "Yamhill County"
        ],
        "cities": [
          "McMinnville"
        ],
        "utilityTerritories": [
          "McMinnville Water & Light"
        ],
        "notes": "Restricted to McMinnville Water & Light electric customers; many major measures require an electrically heated home."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "income_qualified_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "insulation_upgrade",
        "air_sealing_weatherization",
        "window_replacement",
        "exterior_door_replacement",
        "duct_sealing_and_insulation",
        "ductless_mini_split_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "residential_clothes_washer",
        "electric_clothes_dryer"
      ],
      "hardRequirements": [
        "Applicant must be a McMinnville Water & Light electric customer.",
        "Many weatherization and heat pump measures require an electrically heated home.",
        "Many projects require pre-approval before installation.",
        "Heat pump water heater rebate is capped by program rules and installation costs are excluded where stated.",
        "Equipment must meet ENERGY STAR, BPA, or utility specifications where applicable."
      ],
      "blockers": [
        "Do not match commercial kitchen, commercial refrigeration, industrial, or agricultural categories to this residential opportunity.",
        "Income-based enhanced incentives require income eligibility and should not be treated as generally available.",
        "Window and door incentives are building-envelope measures; do not confuse them with window air conditioners.",
        "EV charging and business efficiency offers, if present elsewhere, are separate from this residential rebate match."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "McMinnville Water & Light",
      "applicationUrl": "https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/",
      "websiteUrl": "https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/",
      "sourceUrlsChecked": [
        "https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/",
        "https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/energy-star-washer-dryer-rebate/",
        "https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/smart-thermostat-rebate/",
        "https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/insulation-weatherization-rebate/",
        "https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/heat-pump-water-heater-rebate/",
        "https://www.mc-power.com/news-releases/mwl-adds-250000-to-rebates-for-heat-pumps-weatherization/",
        "https://mcminnville.org/faq-items/what-conservation-rebates-are-available-to-make-my-home-business-more-energy-efficient/",
        "https://www.mc-power.com/energy-efficiency/income-based-programs/"
      ],
      "evidenceText": "Official McMinnville sources list insulation, weatherization, windows, doors, duct sealing, heat pumps, heat pump water heaters, thermostats, washers, and dryers.",
      "reasoningNotes": "The DSIRE-derived match is mostly correct, but should be narrowed to residential electric-customer measures. Window replacement is supported, and appliance matches must remain residential product-specific."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official residential rebate page lists categories, but no current whole-building per-kWh formula was found.",
        "sourceUrlsChecked": [
          "https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/"
        ],
        "reasoningNotes": "Matched terms are measure-specific; target is whole-building custom efficiency.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2015",
    "opportunityName": "Austin Energy - Multi-Family Energy Efficiency Rebate Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2015/austin-energy-multi-family-energy-efficiency-rebate-program",
    "websiteUrl": "https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily",
    "applicationUrl": null,
    "administrator": "Austin Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
        "counties": [
          "Travis",
          "Williamson"
        ],
        "cities": [
          "Austin"
        ],
        "utilityTerritories": [
          "Austin Energy electric service territory"
        ],
        "notes": "Program applies to eligible multifamily properties served by Austin Energy. Some offers on the multifamily hub are distinct subprograms such as EV charging, solar, demand response, and financing."
      },
      "eligibleApplicantTypes": [
        "multifamily property owners",
        "multifamily property managers",
        "affordable housing or income-qualified multifamily properties where applicable",
        "contractors participating in Austin Energy program pathways",
        "multifamily EV charger site hosts"
      ],
      "eligibleSectors": [
        "multifamily residential",
        "affordable multifamily housing",
        "income-qualified multifamily housing",
        "transportation electrification",
        "solar where applicable"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "window_replacement",
        "window_film_shading_retrofit",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "energy_audit",
        "rooftop_solar_pv"
      ],
      "hardRequirements": [
        "Property must be an eligible multifamily property served by Austin Energy.",
        "Many rebate pathways require a property assessment before work begins.",
        "HVAC replacement rebates are tied to qualifying air conditioners, mini-splits, or heat pumps and current efficiency requirements.",
        "Duct, attic insulation, window, solar screen, and other property-improvement measures must meet current Austin Energy specifications.",
        "EV charging, solar, Power Partner thermostat, ECAD, and PACE financing appear as separate offers or pathways and require their own program rules.",
        "Income-qualified enhanced rebates require income-qualified or affordable-housing eligibility documentation where applicable."
      ],
      "blockers": [
        "PACE financing is not a rebate and should not be treated as an upfront incentive for deterministic matching.",
        "EV charging and solar are separate subprograms on the multifamily hub; keep them only when the user project is explicitly EVSE or solar and eligibility is verified.",
        "Power Partner or Smart Home Rewards thermostat participation is demand-response or rewards based and should not be generalized into a thermostat purchase rebate.",
        "Energy audit or ECAD incentives are assessment/compliance services and should not be treated as physical retrofit installation.",
        "Do not infer refrigeration or commercial kitchen measures from this multifamily page unless a current Austin Energy multifamily measure page explicitly supports them."
      ],
      "programType": "Rebate Program",
      "administrator": "Austin Energy",
      "applicationUrl": null,
      "websiteUrl": "https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/2015/austin-energy-multi-family-energy-efficiency-rebate-program",
        "https://savings.austinenergy.com/rebates/multifamily/",
        "https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily",
        "https://austinenergy.com/energy-efficiency/rebates-incentives/multifamily/cooling-heating/hvac"
      ],
      "evidenceText": "Austin Energy's current multifamily rebate hub lists attic insulation, duct system improvements, ECAD audit incentives, EV charger rebates, HVAC replacement, HVAC tune-ups, solar systems, income-qualified rebates, LED lighting, PACE financing, Power Partner thermostats, ENERGY STAR products, solar screens and window replacement, and related offers. The HVAC page supports qualifying air conditioners, mini-splits, and heat pumps.",
      "reasoningNotes": "The repair keeps multifamily lighting, HVAC, envelope, EV, solar, thermostat, and audit categories but marks EV, solar, demand response, financing, and audit boundaries."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Austin Energy multifamily efficiency rebates are measure- and project-specific with multiple eligible equipment categories.",
        "sourceUrlsChecked": [
          "https://savings.austinenergy.com/rebates/residential/multifamily-property-rebates"
        ],
        "reasoningNotes": "Target is whole-building custom efficiency; no single reusable rule was selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4222",
    "opportunityName": "Clallam County PUD - Residential Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4222/clallam-county-pud-residential-efficiency-rebate-program",
    "websiteUrl": "https://www.clallampud.net/ways-to-save/rebates-incentives/residential/",
    "applicationUrl": "https://www.clallampud.net/ways-to-save/rebates-incentives/residential/",
    "administrator": "PUD #1 of Clallam County",
    "programType": "Residential Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 9,
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
          "WA"
        ],
        "counties": [
          "Clallam County"
        ],
        "cities": [],
        "utilityTerritories": [
          "PUD #1 of Clallam County electric service territory"
        ],
        "notes": "Official pages are current but some detail pages were difficult to read directly; public official page snippets and state directory references support active residential rebates."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "pud_member"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ductless_heat_pump",
        "variable_speed_heat_pump",
        "heat_pump_hvac_retrofit",
        "duct_sealing_and_insulation",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "window_replacement",
        "smart_thermostat_zoning_retrofit",
        "energy_star_clothes_washer",
        "energy_star_clothes_dryer",
        "led_area_light_replacement",
        "manufactured_home_efficiency"
      ],
      "hardRequirements": [
        "Customer must be in Clallam PUD residential service territory.",
        "Measures must meet current Clallam PUD rebate specifications and be submitted on current program forms.",
        "Some heat pump, duct, and envelope measures may require approved contractors, inspections, or pre-approval.",
        "Rebates are subject to current program funding and measure-specific eligibility."
      ],
      "blockers": [
        "Exact rebate amounts and all form details were not fully verified because official pages returned limited readable content.",
        "Do not match broad air sealing unless a current Clallam PUD form specifically supports it.",
        "LED matching should be limited to listed area-light or product-specific lighting rebates, not broad whole-building LED retrofits.",
        "Clothes washer and dryer matches are residential appliance rebates, not commercial laundry equipment."
      ],
      "programType": "Residential Rebate",
      "administrator": "PUD #1 of Clallam County",
      "applicationUrl": "https://www.clallampud.net/ways-to-save/rebates-incentives/residential/",
      "websiteUrl": "https://www.clallampud.net/ways-to-save/rebates-incentives/residential/",
      "sourceUrlsChecked": [
        "https://www.clallampud.net/ways-to-save/rebates-incentives/residential/",
        "https://www.clallampud.net/faqs/ductless-heat-pumps/",
        "https://www.clallampud.net/faqs/variable-speed-heat-pumps/",
        "https://www.clallampud.net/faqs/heat-pump-water-heaters/",
        "https://www.clallampud.net/faqs/smart-thermostat-rebate/",
        "https://ccwa.doh.wa.gov/search/c9213df9-e8b7-5cca-9aa3-0aab25b258c1"
      ],
      "evidenceText": "Clallam PUD residential rebate pages and official snippets identify heat pumps, heat pump water heaters, smart thermostats, insulation, windows, ducts, appliances, and limited lighting measures.",
      "reasoningNotes": "Kept supported residential categories but marked medium confidence because current official pages were not fully readable. Narrowed lighting and removed unsupported broad air-sealing inference."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Clallam PUD residential page lists many rebate applications but no whole-building formula was verified.",
        "sourceUrlsChecked": [
          "https://www.clallampud.net/ways-to-save/rebates-incentives/residential/"
        ],
        "reasoningNotes": "Target is broad whole-building efficiency; measure-specific forms should be extracted.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2197",
    "opportunityName": "Mason County PUD 3 - Residential Energy Rebates",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2197/mason-county-pud-3-residential-energy-rebates",
    "websiteUrl": "https://www.pud3.org/ways-to-save/rebates-incentives/",
    "applicationUrl": null,
    "administrator": "Mason County PUD 3",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 9,
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
          "WA"
        ],
        "counties": [
          "Mason County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Mason County PUD 3"
        ],
        "notes": "Restricted to Mason County PUD 3 electric customers in the utility service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "income_qualified_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ductless_mini_split_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "smart_thermostat_zoning_retrofit",
        "residential_clothes_washer"
      ],
      "hardRequirements": [
        "Applicant must be a Mason County PUD 3 residential electric customer.",
        "Equipment and installation must meet PUD 3 and BPA program requirements.",
        "Income-qualified enhanced incentives are limited to qualifying households.",
        "Duct sealing and insulation incentives require qualifying existing conditions and required forms or documentation."
      ],
      "blockers": [
        "Do not match commercial, industrial, or agricultural applicants to this residential program.",
        "Energy audits or home energy surveys are advisory and not verified as a rebated retrofit category for this opportunity.",
        "EV Level 2 charging appears on a separate PUD 3 FAQ and should not be included in this residential energy rebate match.",
        "Official PUD pages were partially access-restricted, so unsupported broad weatherization categories should not be inferred beyond listed duct sealing and insulation measures."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Mason County PUD 3",
      "applicationUrl": null,
      "websiteUrl": "https://www.pud3.org/ways-to-save/rebates-incentives/",
      "sourceUrlsChecked": [
        "https://www.pud3.org/ways-to-save/rebates-incentives/",
        "https://www.pud3.org/faqs/low-income-incentives/",
        "https://www.pud3.org/faqs/heat-pump-incentives/",
        "https://www.pud3.org/faqs/insulation-incentives/",
        "https://www.pud3.org/faqs/appliance-incentives/",
        "https://www.pud3.org/news-releases/bill-credits-expanded-rebates-programs-available/",
        "https://programs.dsireusa.org/system/program/detail/2197/mason-county-pud-3-residential-energy-rebates"
      ],
      "evidenceText": "Official PUD information supports ductless heat pumps, heat pump water heaters, duct sealing, insulation, thermostats, and residential appliance rebates for PUD 3 customers.",
      "reasoningNotes": "The current match is partly correct. Keep residential heat pump, heat pump water heater, duct sealing, insulation, thermostat, and clothes washer measures. Remove audit as a retrofit and avoid broad commercial or EV matching."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Mason PUD 3 pages confirm heat-pump and appliance incentives, but exact current general residential values were not fully verified from official source text.",
        "sourceUrlsChecked": [
          "https://www.pud3.org/ways-to-save/rebates-incentives/",
          "https://www.pud3.org/faqs/heat-pump-incentives/",
          "https://programs.dsireusa.org/system/program/detail/2197"
        ],
        "reasoningNotes": "Target is whole-building custom efficiency; use of DSIRE-only ranges would be insufficient for a mergeable rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3680",
    "opportunityName": "Entergy Arkansas - Residential Energy Efficiency Programs",
    "state": "AR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3680/entergy-arkansas-residential-energy-efficiency-programs",
    "websiteUrl": "https://www.entergyarkansas.com/energyefficiency/residential/home-energy-solutions-program",
    "applicationUrl": null,
    "administrator": "Entergy Arkansas, LLC",
    "programType": "Residential Direct-Install And Instant-Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "Entergy Arkansas electric service territory"
        ],
        "notes": "Applies to eligible single-family residential electric customers in Entergy Arkansas territory; renter participation requires owner consent."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_owner_consent"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "hvac_tune_up",
        "smart_thermostat_demand_response",
        "low_flow_showerheads_and_aerators",
        "advanced_power_strip"
      ],
      "hardRequirements": [
        "Customer must be an Entergy Arkansas electric customer in a qualifying single-family home.",
        "Program is delivered through approved trade allies; participants do not submit broad equipment-replacement rebate claims directly.",
        "Weatherization measures require electric space conditioning, applicable HVAC/duct conditions and diagnostic testing.",
        "Low-flow showerheads and aerators are limited to homes with electric water heating.",
        "Smart thermostat measure requires qualified central air conditioning or heat pump, Wi-Fi and demand-response enrollment conditions."
      ],
      "blockers": [
        "No current support for refrigerator, freezer or commercial refrigeration equipment in this residential program.",
        "Do not match broad HVAC or heat-pump replacement; the checked program supports tune-ups and weatherization, not new HVAC equipment rebates.",
        "Do not match LED lighting from this program.",
        "Smart thermostat eligibility is tied to the program rules and demand-response limitations, not broad zoning controls."
      ],
      "programType": "Residential Direct-Install And Instant-Incentive Program",
      "administrator": "Entergy Arkansas, LLC",
      "applicationUrl": null,
      "websiteUrl": "https://www.entergyarkansas.com/energyefficiency/residential/home-energy-solutions-program",
      "sourceUrlsChecked": [
        "https://www.entergyarkansas.com/energyefficiency/residential/home-energy-solutions-program",
        "https://www.entergyarkansas.com/wp-content/uploads/2025/06/HES_Guidebook.pdf"
      ],
      "evidenceText": "Entergy]( Arkansas’s 2026 guidebook covers single-family Home Energy Solutions measures including air sealing, duct sealing, ceiling insulation, HVAC tune-ups, direct-install devices and qualified smart thermostats.",
      "reasoningNotes": "The old matches for high-efficiency HVAC replacement, heat-pump replacement, refrigeration and LED lighting were false positives for the current Home Energy Solutions program."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official residential solutions source did not verify a refrigerator/freezer purchase rebate formula.",
        "sourceUrlsChecked": [
          "https://www.entergy-arkansas.com/your_home/save_money/ee/residential-solutions/"
        ],
        "reasoningNotes": "Do not substitute HVAC or weatherization values for a refrigeration model without an official amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3357",
    "opportunityName": "Alameda Municipal Power - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3357/alameda-municipal-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.alamedamp.com/407/Rebates-and-Incentives",
    "applicationUrl": "https://www.alamedamp.com/407/Rebates-and-Incentives",
    "administrator": "Alameda Municipal Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "CA"
        ],
        "counties": [],
        "cities": [
          "Alameda"
        ],
        "utilityTerritories": [
          "Alameda Municipal Power electric service territory"
        ],
        "notes": "Must have an active Alameda Municipal Power residential electric account at the service address."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customers",
        "homeowners",
        "income_qualified_residential_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "heat_pump_hvac_retrofit",
        "heat_pump_clothes_dryer",
        "induction_cooking_equipment",
        "smart_thermostat_zoning_retrofit",
        "level_2_ev_charger_installation",
        "electric_panel_upgrade",
        "home_energy_management_device",
        "income_qualified_solar_pv"
      ],
      "hardRequirements": [
        "Applicant must be a current Alameda Municipal Power account holder and install at an AMP residential service address.",
        "Gas-to-electric replacement is required for heat pump water heater, heat pump HVAC and gas dryer replacement categories where specified.",
        "Required documentation includes receipts or invoices, pre/post photos, manufacturer/model/serial information and final City of Alameda permits where required.",
        "Heat pump HVAC requires SEER at least 16 and HSPF at least 9.2, D1-H rate enrollment and proof of gas decommissioning.",
        "Rebates are subject to measure-specific timing, account limits and income-qualified rules."
      ],
      "blockers": [
        "Current AMP residential sources do not support a generic LED lighting rebate; do not match led_lighting_retrofit.",
        "Heat pump HVAC must be gas-to-all-electric, requires gas furnace decommissioning, D1-H rate and no gas backup; do not match AC-only or hybrid gas backup replacements.",
        "Solar should match only AMP income-qualified solar, not a general rooftop PV rebate.",
        "Used EVs and e-bikes are transportation rebates; only installed Level 2 EV chargers should match building charging infrastructure.",
        "Induction excludes portable units and dual-fuel appliances; heat pump water heater and HVAC require current program documentation and permits."
      ],
      "programType": "Rebate Program",
      "administrator": "Alameda Municipal Power",
      "applicationUrl": "https://www.alamedamp.com/407/Rebates-and-Incentives",
      "websiteUrl": "https://www.alamedamp.com/407/Rebates-and-Incentives",
      "sourceUrlsChecked": [
        "https://www.alamedamp.com/407/Rebates-and-Incentives",
        "https://www.alamedamp.com/DocumentCenter/View/1179",
        "https://www.alamedamp.com/480/Electrify-My-Home",
        "https://www.alamedamp.com/217/Businesses"
      ],
      "evidenceText": "AMP’s current residential rebate materials list HPWH, heat pump HVAC, heat pump dryer, induction cooking, smart thermostat, Level 2 EV charger, panel upgrade, energy management device and income-qualified solar. Several measures require gas-to-electric replacement and permits.",
      "reasoningNotes": "Removed unsupported LED lighting and narrowed solar to the income-qualified solar offering shown in current AMP residential materials."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official rebates page did not expose a current solar PV per-kW or per-watt rebate formula.",
        "sourceUrlsChecked": [
          "https://www.alamedamp.com/407/Rebates-and-Incentives"
        ],
        "reasoningNotes": "The target is mapped to solar PV, but the official source text did not provide a calculable amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22071",
    "opportunityName": "Turlock Irrigation District - Commercial Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22071/turlock-irrigation-district-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.tid.org/customer-service/rebates-and-savings/for-business/",
    "applicationUrl": "https://rebates.tid.org/",
    "administrator": "Turlock Irrigation District",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "CA"
        ],
        "counties": [],
        "cities": [
          "Turlock"
        ],
        "utilityTerritories": [
          "Turlock Irrigation District electric service territory"
        ],
        "notes": "The current commercial rebate page requires equipment to be installed at facilities served by TID and within TID boundaries."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "dairy_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "dairy"
      ],
      "eligibleRetrofitCategories": [
        "commercial_refrigeration_case_replacement",
        "commercial_freezer_case_replacement",
        "evaporative_cooled_refrigeration_condenser",
        "walk_in_cooler_freezer_strip_curtains",
        "anti_sweat_heat_doors",
        "anti_sweat_heater_controls",
        "refrigeration_suction_line_insulation",
        "commercial_hvac_equipment",
        "commercial_heat_pump",
        "smart_thermostat_zoning_retrofit",
        "variable_speed_pool_pump",
        "agricultural_pump_vfd_replacement",
        "efficient_pump_replacement",
        "dairy_fan_vfd_retrofit",
        "custom_energy_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be an active TID customer with equipment installed at a facility served by TID and within TID boundaries.",
        "Commercial rebate applications must generally be submitted within six months, and inspections may be required.",
        "Preapproval is required before purchase and installation for listed rebate programs.",
        "Agricultural pump and dairy fan rebates must include VFD or listed retrofit requirements and meet operating-hour and equipment specifications.",
        "Custom projects are based on verified first-year kWh savings and are capped by project cost."
      ],
      "blockers": [
        "EV charger installation is not supported on the current TID for-business rebate page checked and should be removed from this opportunity.",
        "Filtration is a false-positive if interpreted as air filtration; the current source supports variable-speed pool pumps for pool filtration.",
        "Insulation should be limited to refrigeration suction-line insulation or strip curtains, not building envelope insulation.",
        "Smart thermostats apply to commercial HVAC equipment and should not be matched as residential thermostats.",
        "Do not generalize agricultural pump VFDs to unrelated pumps without TID measure eligibility."
      ],
      "programType": "Rebate Program",
      "administrator": "Turlock Irrigation District",
      "applicationUrl": "https://rebates.tid.org/",
      "websiteUrl": "https://www.tid.org/customer-service/rebates-and-savings/for-business/",
      "sourceUrlsChecked": [
        "https://www.tid.org/customer-service/rebates-and-savings/for-business/",
        "https://rebates.tid.org/"
      ],
      "evidenceText": "TID's]( current for-business page lists commercial refrigeration cases, freezer cases, condensers, strip curtains, anti-sweat measures, suction-line insulation, commercial HVAC and heat pumps, smart thermostats, variable-speed pool pumps, agricultural pump VFDs, dairy fan VFDs, and custom rebates.",
      "reasoningNotes": "The current official page strongly supports refrigeration, HVAC, pump, dairy, and custom measures. It does not support EV chargers or building-envelope insulation for this commercial opportunity."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "TID commercial rebates include multiple measure categories, but current refrigeration, VFD, and pump replacement formulas were not verified.",
        "sourceUrlsChecked": [
          "https://www.tid.org/business/save-energy-money/rebates/"
        ],
        "reasoningNotes": "No single source-backed refrigeration or VFD value was safely selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2103",
    "opportunityName": "Mountain View Electric Association, Inc - Energy Efficiency Rebates Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2103/mountain-view-electric-association-inc-energy-efficiency-rebates-program",
    "websiteUrl": "https://www.mvea.coop/save-energy-money/rebates/",
    "applicationUrl": "https://www.mvea.coop/rebates",
    "administrator": "Mountain View Electric Association, Inc.",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "Mountain View Electric Association service territory"
        ],
        "notes": "Eligibility is limited to MVEA member accounts in the cooperative service territory. Commercial and industrial measures are separate sections of the same current rebate guide."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "small_commercial_customer",
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer",
        "cooperative_member"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "electric_resistance_water_heater",
        "electric_thermal_storage",
        "level_2_ev_charger_installation",
        "dc_fast_charging_equipment",
        "smart_thermostat_zoning_retrofit",
        "induction_cooktop",
        "refrigerator_freezer_recycling",
        "electric_clothes_dryer",
        "heat_pump_clothes_dryer",
        "whole_house_fan",
        "evaporative_cooler",
        "commercial_led_lighting",
        "commercial_industrial_motor_rebate",
        "variable_speed_drive_retrofit",
        "forklift_electrification"
      ],
      "hardRequirements": [
        "Applicant must be a current MVEA member with an eligible account.",
        "Equipment must be new or qualifying recycled equipment as specified and must be purchased and installed in the eligible program year.",
        "Applications require invoices, model or serial information, and any listed photos or documentation by the program deadline or measure-specific deadline.",
        "Heat pumps, smart thermostats, EV chargers, motors, drives, lighting, and water heaters must meet the specifications in the current MVEA rebate product guide."
      ],
      "blockers": [
        "Do not match efficient fan or blower replacement to this opportunity based on snow blower, leaf blower, or outdoor power equipment rebates.",
        "Do not generalize refrigerator and freezer recycling into broad commercial refrigeration equipment.",
        "Induction eligibility is for cooktops or residential or small-commercial cooking appliances, not broad commercial kitchen equipment.",
        "Do not match generic high-efficiency HVAC unless the measure is a listed heat pump or geothermal system.",
        "EV charging is limited to listed charger types and program requirements; do not infer unrelated transportation measures."
      ],
      "programType": "Rebate Program",
      "administrator": "Mountain View Electric Association, Inc.",
      "applicationUrl": "https://www.mvea.coop/rebates",
      "websiteUrl": "https://www.mvea.coop/save-energy-money/rebates/",
      "sourceUrlsChecked": [
        "https://www.mvea.coop/save-energy-money/rebates/",
        "https://www.mvea.coop/save-energy-money/rebates/electric-heat-pump-rebates/",
        "https://www.mvea.coop/save-energy-money/rebates/smart-thermostat-rebates/",
        "https://www.mvea.coop/wp-content/uploads/2026_MVEA_RebateProductGuide.pdf",
        "https://www.mvea.coop/rebates"
      ],
      "evidenceText": "MVEA's]( 2026 rebate guide lists member rebates for heat pumps, geothermal, water heating, EV chargers, smart thermostats, induction cooktops, recycling, whole-house fans, evaporative coolers, commercial lighting, motors, drives, and forklift electrification.",
      "reasoningNotes": "The current official guide supports many original matches but the fan or blower term was a false positive from outdoor equipment, and refrigeration and induction should be product-specific rather than broad commercial categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "MVEA publishes a 2026 rebate guide, but the refrigeration target needs a precise measure selection.",
        "sourceUrlsChecked": [
          "https://mvea.coop/save-energy-money/rebates/",
          "https://www.mvea.coop/wp-content/uploads/2026_MVEA_RebateProductGuide.pdf"
        ],
        "reasoningNotes": "No refrigeration-specific value was selected with confidence.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2734",
    "opportunityName": "Clay Electric Cooperative, Inc - Energy Smart Energy Efficiency Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2734/clay-electric-cooperative-inc-energy-smart-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.clayelectric.com/energy-rebates-loans",
    "applicationUrl": null,
    "administrator": "Clay Electric Cooperative",
    "programType": "Utility Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
        "retrofitTypeId": "solar_water_heating_system",
        "displayName": "Solar water heating system",
        "parentCategory": "water_heating",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "solar water heating"
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
        "cities": [],
        "utilityTerritories": [
          "Clay Electric Cooperative service territory"
        ],
        "notes": "Limited to active Clay Electric accounts; some measures apply to residences or facilities receiving Clay Electric service."
      },
      "eligibleApplicantTypes": [
        "electric cooperative member",
        "residential customer",
        "commercial customer",
        "facility owner"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "heat_recovery_unit_water_heating",
        "solar_water_heating_system",
        "ceiling_insulation_upgrade",
        "attic_spray_foam_insulation",
        "window_film_shading_retrofit",
        "solar_shade_screen_retrofit"
      ],
      "hardRequirements": [
        "Applicant must have an active Clay Electric account for the service location.",
        "Rebate applications require detailed receipt or invoice, equipment documentation, and submission within the required post-installation period.",
        "Heat pump and heat pump water heater rebates require qualifying efficiency documentation such as AHRI information where applicable.",
        "Solar water heaters require certified contractor installation and qualifying Florida Solar Energy Center specifications.",
        "Insulation, window film, and solar shade screen offers are limited to existing qualifying conditions and may require photographs and inspections."
      ],
      "blockers": [
        "Do not match window replacement; the official offer supports window film and solar shade screens on existing windows only.",
        "Do not match broad industrial waste heat recovery; the heat recovery measure is a water-heating heat recovery unit.",
        "Do not match generic HVAC replacement beyond qualifying heat pumps.",
        "Loans, energy surveys, generators, high-reflectance roofing, and solar pool heating are separate or non-rebate items on the same page."
      ],
      "programType": "Utility Rebate Program",
      "administrator": "Clay Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.clayelectric.com/energy-rebates-loans",
      "sourceUrlsChecked": [
        "https://www.clayelectric.com/energy-rebates-loans"
      ],
      "evidenceText": "Clay Electric lists rebates for ceiling insulation, attic spray foam, high-efficiency heat pumps, electric hybrid heat pump water heaters, solar water heaters, heat recovery units, window film, and solar shade screens.",
      "reasoningNotes": "Corrected window and heat-recovery false positives by narrowing them to film/shade screens and water-heating heat recovery units."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official rebate/loan page identified, but no current heat pump or solar water heating amount verified.",
        "sourceUrlsChecked": [
          "https://www.clayelectric.com/energy-rebates-loans"
        ],
        "reasoningNotes": "No source-backed formula without current measure table.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4237",
    "opportunityName": "Ocala Utility Services - Energy Efficiency Rebate Program",
    "state": "FL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4237/ocala-utility-services-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ocalafl.gov/government/electric-utility/rebates",
    "applicationUrl": "https://www.ocalafl.gov/home/showpublisheddocument/26388/638665758851870000",
    "administrator": "Ocala Electric Utility",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "Marion County"
        ],
        "cities": [
          "Ocala"
        ],
        "utilityTerritories": [
          "Ocala Electric Utility service territory"
        ],
        "notes": "Applies primarily to Ocala Electric Utility residential customers, with some listed measures available to commercial or small commercial customers where the current Ocala application specifies."
      },
      "eligibleApplicantTypes": [
        "Ocala Electric Utility residential customers",
        "homeowners",
        "permanent residential customers",
        "small commercial customers for eligible insulation or package terminal equipment where specified",
        "large commercial customers for eligible lighting or insulation where specified",
        "commercial electric customers for custom or lighting incentives where specified"
      ],
      "eligibleSectors": [
        "residential",
        "commercial_limited",
        "small_commercial_limited",
        "large_commercial_limited"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_refrigerator",
        "energy_star_freezer",
        "energy_star_clothes_washer",
        "energy_star_dishwasher",
        "central_air_conditioner",
        "heat_pump_hvac",
        "heat_pump_water_heater",
        "attic_insulation",
        "commercial_lighting_limited",
        "package_terminal_air_conditioner_or_heat_pump",
        "wifi_thermostat",
        "solar_water_heating",
        "hvac_tune_up",
        "hvac_repair_coil_cleaning_leak_repair_duct_leak_repair",
        "custom_energy_efficiency_limited"
      ],
      "hardRequirements": [
        "Applicant must receive Ocala Electric Utility service for the premises associated with the rebate.",
        "Residential appliance rebates require qualifying ENERGY STAR appliances and new, unused equipment.",
        "Applications generally require a completed rebate form and paid receipt or invoice and must be submitted within the stated post-purchase window, including the 90-day window shown on current Ocala rebate materials.",
        "Rebates are issued as credits on the customer's Municipal Services Statement where applicable.",
        "Commercial lighting and custom incentives require current Ocala application terms and may require engineering documentation or demand/kW reduction calculations.",
        "Some measures have different residential, small commercial and large commercial eligibility and caps."
      ],
      "blockers": [
        "Current Ocala sources support both residential and limited commercial measures; do not treat every listed measure as available to every customer class.",
        "Residential appliance rebates should not be mapped to commercial dishwasher, commercial laundry or commercial refrigeration projects.",
        "Custom incentive and commercial lighting categories require project-specific documentation and should not be modeled as broad per-kWh whole-building rebates without current calculations.",
        "The City of Ocala page requires JavaScript in a browser, but the current rebate application PDF was accessible and provided measure detail.",
        "No EV charging, battery storage or solar PV categories are supported by this energy-efficiency rebate record."
      ],
      "programType": "Rebate Program",
      "administrator": "Ocala Electric Utility",
      "applicationUrl": "https://www.ocalafl.gov/home/showpublisheddocument/26388/638665758851870000",
      "websiteUrl": "https://www.ocalafl.gov/government/electric-utility/rebates",
      "sourceUrlsChecked": [
        "https://www.ocalafl.org/government/city-departments-a-h/electric-utility/rebates",
        "https://www.ocalafl.gov/government/electric-utility/rebates",
        "https://www.ocalafl.gov/home/showpublisheddocument/26388/638665758851870000",
        "https://programs.dsireusa.org/system/program/detail/4237/ocala-utility-services-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Ocala's current rebate page states that OEU offers rebates to residential customers for qualifying ENERGY STAR appliances and issues approved rebates as Municipal Services Statement credits. The current rebate application lists refrigerator, dishwasher, clothes washer, freezer, attic insulation, air conditioner and heat pump, heat pump water heater, package terminal AC or heat pump, commercial lighting, Wi-Fi thermostat, solar water heater, HVAC tune-up, HVAC repairs and custom incentives, with service, timing and documentation requirements.",
      "reasoningNotes": "The opportunity is active. The repair preserves current Ocala residential measures and limited commercial categories while blocking unsupported broad commercial appliance and whole-building interpretations."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Ocala materials list multiple appliance and efficiency rebates but exact target measure selection is unclear.",
        "sourceUrlsChecked": [
          "https://www.ocalafl.gov/government/city-departments-i-z/utility-services/conservation",
          "https://programs.dsireusa.org/system/program/detail/4237"
        ],
        "reasoningNotes": "Target is broad whole-building efficiency; no reusable per-kWh or single matched measure formula was selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3441",
    "opportunityName": "Marietta Power & Water - Residential Energy Efficiency Rebate",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3441/marietta-power-and-water-residential-energy-efficiency-rebate",
    "websiteUrl": "https://www.mariettaga.gov/765/Rebates-Incentives",
    "applicationUrl": "https://www.mariettaga.gov/FormCenter/Power-Water-Marketing-27/Energy-Efficiency-Rebate-Program-Applica-125",
    "administrator": "Marietta Power & Water",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
        "cities": [
          "Marietta"
        ],
        "utilityTerritories": [
          "Marietta Power & Water electric service territory",
          "Marietta Power & Water water service territory for toilet rebates"
        ],
        "notes": "Energy rebates require permanent single-family MP&W electric service; toilet rebates require MP&W water service."
      },
      "eligibleApplicantTypes": [
        "single_family_residential_electric_customer",
        "residential_water_customer_for_toilet_rebate"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "electric_water_heater",
        "high_efficiency_hvac_replacement",
        "residential_dishwasher",
        "high_efficiency_clothes_washer",
        "residential_refrigerator_freezer_rebate",
        "room_air_conditioner",
        "programmable_thermostat",
        "water_heater_blanket",
        "high_efficiency_toilet_urinal"
      ],
      "hardRequirements": [
        "Energy rebate applicant must have permanent single-family residential MP&W electric service.",
        "Energy applications must be submitted within 60 days.",
        "Toilet rebate requires MP&W water service and qualifying replacement of pre-1994 high-flow toilets."
      ],
      "blockers": [
        "Residential dishwasher is not commercial kitchen equipment.",
        "Residential refrigerator/freezer is not commercial refrigeration.",
        "Toilet rebate does not imply broad low-flow plumbing.",
        "Programmable thermostat is not smart zoning."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Marietta Power & Water",
      "applicationUrl": "https://www.mariettaga.gov/FormCenter/Power-Water-Marketing-27/Energy-Efficiency-Rebate-Program-Applica-125",
      "websiteUrl": "https://www.mariettaga.gov/765/Rebates-Incentives",
      "sourceUrlsChecked": [
        "https://www.mariettaga.gov/765/Rebates-Incentives",
        "https://www.mariettaga.gov/FormCenter/Power-Water-Marketing-27/Energy-Efficiency-Rebate-Program-Applica-125",
        "https://www.mariettaga.gov/FormCenter/Power-Water-Marketing-27/Toilet-Rebate-Program-revised-effective--115",
        "https://www.mariettaga.gov/DocumentCenter/View/9103"
      ],
      "evidenceText": "Marietta]( official pages and forms list heat pump, electric water heater, HPWH, appliances, programmable thermostat, water heater blanket, and qualifying toilet rebates.",
      "reasoningNotes": "Narrowed appliance matches to residential products and separated the water-service toilet rebate."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "GPT Pro found a $150 heat pump rebate, but this target is mapped to refrigeration savings in the one-time savings engine.",
        "sourceUrlsChecked": [
          "https://www.mariettaga.gov/456/Residential-Rebates",
          "https://www.mariettaga.gov/1378/Rebates"
        ],
        "reasoningNotes": "Do not attach a heat pump rebate to a refrigeration-mapped target without a matching current appliance amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3283",
    "opportunityName": "Black Hills Energy (Gas) - Residential Energy Efficiency Rebate Programs",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3283/black-hills-energy-gas-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/iowa-residential-programs",
    "applicationUrl": "https://iagresiprescriptive.customerapplication.com/",
    "administrator": "Black Hills Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "IA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Black Hills Energy Iowa natural gas service territory"
        ],
        "notes": "Residential natural gas customers; heating, thermostat and insulation measures require Black Hills Energy to provide the main heat source fuel."
      },
      "eligibleApplicantTypes": [
        "residential_natural_gas_customers",
        "homeowners",
        "renters",
        "liheap_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "boiler_controls_burner_retrofit",
        "combination_boiler_water_heater",
        "high_efficiency_natural_gas_water_heater",
        "tankless_natural_gas_water_heater",
        "water_heater_temperature_setback",
        "drain_water_heat_recovery",
        "smart_thermostat_zoning_retrofit",
        "furnace_maintenance",
        "boiler_maintenance",
        "insulation_upgrade",
        "duct_insulation",
        "boiler_pipe_insulation",
        "domestic_hot_water_pipe_insulation",
        "water_heater_wrap",
        "low_flow_faucet_aerator",
        "low_flow_showerhead",
        "thermostatic_restrictor_shower_valve",
        "gas_fireplace_upgrade",
        "energy_assessment",
        "air_sealing_weatherization"
      ],
      "hardRequirements": [
        "Applicant must be a current Iowa residential natural gas customer of Black Hills Energy.",
        "Equipment must be new, installed in heated living space and purchased or installed during the 2026 program year.",
        "Applications must include a final itemized invoice or receipt and be received within 45 days of dealer invoice or by January 15 2027.",
        "Heating equipment must meet listed AFUE, UEF, AHRI or ENERGY STAR requirements and be served by Black Hills as the main heat source fuel.",
        "Rebates are first-come, first-served, subject to budget, and cannot exceed customer cost."
      ],
      "blockers": [
        "This Iowa residential record is for natural gas customers; do not match electric heat pumps, electric heat pump water heaters, air conditioners, appliances or EV charging.",
        "Low-flow measures must be narrowed to faucet aerators, low-flow showerheads and thermostatic restrictor shower valves, not broad plumbing retrofits.",
        "Insulation, heating and thermostat rebates are unavailable if Black Hills Energy does not provide the home’s main heat source fuel or if the home has electric heat.",
        "Measures installed in garages or shops are not eligible."
      ],
      "programType": "Rebate Program",
      "administrator": "Black Hills Energy",
      "applicationUrl": "https://iagresiprescriptive.customerapplication.com/",
      "websiteUrl": "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/iowa-residential-programs",
      "sourceUrlsChecked": [
        "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/iowa-residential-programs",
        "https://www.blackhillsenergy.com/sites/blackhillsenergy.com/files/IAG-EE-2026-Residential-Rebate-App.pdf",
        "https://iagresiprescriptive.customerapplication.com/"
      ],
      "evidenceText": "Black Hills Energy’s 2026 Iowa residential gas application lists natural gas water heating, furnaces, boilers, boiler reset, gas fireplaces, smart thermostats, maintenance, insulation, pipe insulation, water-heater wrap, faucet aerators, showerheads and restrictor valves. Heating, thermostat and insulation require Black Hills as main heat fuel.",
      "reasoningNotes": "Kept gas HVAC, insulation and low-flow measures but narrowed all low-flow and water-heating matches to the specific natural-gas residential rebate items."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Black Hills Iowa gas rebate application was found, but exact table values were not exposed in accessible text.",
        "sourceUrlsChecked": [
          "https://www.blackhillsenergy.com/efficiency-and-savings/residential-rebates/iowa-residential-rebates"
        ],
        "reasoningNotes": "Later pass should extract the PDF table.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5142",
    "opportunityName": "Missouri River Energy Services (25 Member Cooperatives) - Business Energy Efficiency Rebate",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5142/missouri-river-energy-services-25-member-cooperatives-business-energy-efficiency-rebate",
    "websiteUrl": "https://www.brightenergysolutions.com/",
    "applicationUrl": null,
    "administrator": "Bright Energy Solutions/Missouri River Energy Services",
    "programType": "Business Energy-Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 8,
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
          "IA",
          "MN",
          "ND",
          "SD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Participating Bright Energy Solutions and Missouri River Energy Services member utilities"
        ],
        "notes": "Target DSIRE record references Minnesota members, but the official Bright Energy Solutions business portfolio is offered only through participating local MRES/BES member utilities across the member-service area."
      },
      "eligibleApplicantTypes": [
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "institutional_customer",
        "municipal_customer",
        "agricultural_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "municipal",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_refrigeration_equipment",
        "refrigeration_ec_motor_retrofit",
        "refrigeration_lighting_controls",
        "compressed_air_efficiency",
        "variable_frequency_drive_retrofit",
        "custom_energy_efficiency_project",
        "custom_electrification",
        "electric_forklift",
        "commercial_dishwasher",
        "commercial_kitchen_equipment",
        "commercial_kitchen_demand_ventilation_control",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "high_efficiency_chiller_retrofit",
        "energy_recovery_ventilation_retrofit",
        "demand_control_ventilation_retrofit",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "networked_lighting_controls",
        "high_efficiency_pumps",
        "infrared_process_heating"
      ],
      "hardRequirements": [
        "Customer must receive service from a participating Bright Energy Solutions or Missouri River Energy Services member utility.",
        "Business rebate eligibility and forms depend on the local member utility and measure category.",
        "Custom efficiency, custom electrification and some process measures require preapproval and energy-savings evaluation.",
        "Equipment must meet the Bright Energy Solutions specifications for the relevant business category.",
        "Not every member utility necessarily offers every measure or funding level."
      ],
      "blockers": [
        "Residential clothes washers, residential appliances and residential smart thermostats are not part of the business rebate opportunity.",
        "Smart thermostat matching should be limited to qualifying guest-room energy management or commercial controls when applicable.",
        "Do not match businesses outside a participating member utility service area.",
        "Custom electrification is not a general rebate and must satisfy fuel-switching, preapproval and savings requirements."
      ],
      "programType": "Business Energy-Efficiency Rebate Program",
      "administrator": "Bright Energy Solutions/Missouri River Energy Services",
      "applicationUrl": null,
      "websiteUrl": "https://www.brightenergysolutions.com/",
      "sourceUrlsChecked": [
        "https://www.mrenergy.com/services/energy-efficiency",
        "https://www.brightenergysolutions.com/",
        "https://www.brightenergysolutions.com/members/st-james-public-utilities",
        "https://www.brightenergysolutions.com/members/hutchinson-utilities-commission"
      ],
      "evidenceText": "Bright]( Energy Solutions business pages list refrigeration, compressed air, custom projects, electrification, food service, HVAC, lighting, VFDs, pumps and process incentives through participating MRES member utilities.",
      "reasoningNotes": "Kept broad business efficiency categories supported by official BES member pages. Removed residential clothes washer and residential smart thermostat interpretations from the business record."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Bright Energy Solutions business rebates vary by member utility and equipment category.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/resources/business",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "No single commercial kitchen value was safely selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2296",
    "opportunityName": "Duke Energy - Residential and Builder Energy Efficiency Rebate Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2296/duke-energy-residential-and-builder-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.duke-energy.com/home/products/smart-saver",
    "applicationUrl": null,
    "administrator": "Duke Energy",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 8,
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
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Duke Energy Indiana"
        ],
        "notes": "Limited to eligible Duke Energy residential service addresses in Indiana; specific rebates and prerequisites vary by service address."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "builder"
      ],
      "eligibleSectors": [
        "residential",
        "residential_new_construction"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_hvac_replacement",
        "insulation_upgrade",
        "smart_thermostat_zoning_retrofit",
        "window_replacement"
      ],
      "hardRequirements": [
        "Customer must have an eligible Duke Energy Indiana residential account or qualifying builder project.",
        "Home Energy Improvement prerequisites, home energy check or program enrollment may be required before some rebates.",
        "Eligible work must meet Duke equipment specifications and efficiency thresholds and use required channels such as participating contractors or instant-rebate processes.",
        "Rebate amounts, eligible measures and forms are subject to Duke Energy territory rules and available funding."
      ],
      "blockers": [
        "Ground-source or geothermal heat pumps were not verified on current Duke Home Energy Improvement pages for this opportunity.",
        "Do not match non-residential projects.",
        "Do not generalize attic insulation, duct test and repair, HVAC replacement, heat-pump water heater, smart thermostat or energy-efficient windows into unrelated envelope, appliance or renewable measures.",
        "Overview access was restricted, so service-address validation is required before final eligibility."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Duke Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.duke-energy.com/home/products/smart-saver",
      "sourceUrlsChecked": [
        "https://www.duke-energy.com/home/products/smart-saver",
        "https://www.duke-energy.com/home/products/home-energy-improvement",
        "https://www.duke-energy.com/home/products/home-energy-improvement/prerequisites",
        "https://www.duke-energy.com/home/products/home-energy-improvement/duct-test-and-repair",
        "https://www.duke-energy.com/home/products/home-energy-improvement/hvac-replacement",
        "https://www.duke-energy.com/home/products/home-energy-improvement/heat-pump-water-heater",
        "https://www.duke-energy.com/home/products/home-energy-improvement/energy-efficient-windows",
        "https://www.duke-energy.com/home/products/home-energy-check"
      ],
      "evidenceText": "Current]( Duke pages identify rebates for attic insulation, duct test and repair, HVAC heat-pump replacement, heat-pump water heaters, windows and home-energy prerequisites; geothermal was not verified.",
      "reasoningNotes": "Kept only current Duke-supported residential energy-efficiency measures. Removed geothermal because no current official page checked supported it for this Indiana Smart Saver/Home Energy Improvement opportunity."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "Duke Smart Saver page requires dynamic application content and did not expose exact current measure values.",
        "sourceUrlsChecked": [
          "https://www.duke-energy.com/home/products/smart-saver"
        ],
        "reasoningNotes": "Do not rely on DSIRE alone for heat pump or weatherization amounts.",
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
