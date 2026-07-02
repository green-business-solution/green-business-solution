You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 30
Targets in this prompt: 581-600 of 984
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
  "batchNumber": 30,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22453"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22560",
    "opportunityName": "Commercial Energy Efficiency Rebates (Offered by 5 Utilities)",
    "state": "ND",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22560/commercial-energy-efficiency-rebates-offered-by-5-utilities",
    "websiteUrl": "https://www.brightenergysolutions.com/members#nd-list",
    "applicationUrl": null,
    "administrator": "Bright Energy Solutions / Missouri River Energy Services",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
          "lighting controls",
          "occupancy sensor"
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
        "notes": "Program is available through participating Bright Energy Solutions municipal utilities in North Dakota."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business_customer",
        "industrial_customer",
        "municipal_utility_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "efficient_ice_machine",
        "electric_forklift_material_handling",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "variable_refrigerant_flow_heat_pump",
        "high_efficiency_hvac_replacement",
        "heat_pump_water_heater",
        "demand_controlled_ventilation",
        "commercial_refrigeration_equipment",
        "refrigerated_case_lighting_controls",
        "walk_in_strip_curtains",
        "commercial_kitchen_equipment",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_oven",
        "high_efficiency_steamer",
        "kitchen_hood_controls_vfd",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "compressed_air_systems",
        "variable_frequency_drive",
        "efficient_pump_replacement",
        "industrial_infrared_process_heating"
      ],
      "hardRequirements": [
        "Customer must receive electric service from a participating Bright Energy Solutions municipal utility.",
        "Custom, custom electrification, and larger projects require preapproval and program savings review."
      ],
      "blockers": [
        "This is not a residential appliance or home weatherization program.",
        "Electric forklift incentives are material-handling electrification, not generic EV charger installation.",
        "Custom incentives must not be matched automatically without preapproval and project-specific savings documentation."
      ],
      "programType": "Rebate Program",
      "administrator": "Bright Energy Solutions / Missouri River Energy Services",
      "applicationUrl": null,
      "websiteUrl": "https://www.brightenergysolutions.com/members#nd-list",
      "sourceUrlsChecked": [
        "https://www.brightenergysolutions.com/",
        "https://www.brightenergysolutions.com/members",
        "https://www.brightenergysolutions.com/members/valley-city-public-works"
      ],
      "evidenceText": "Bright]( Energy Solutions member pages list North Dakota municipal utilities and business rebates for lighting, HVAC, refrigeration, foodservice, compressed air, forklifts, pumps, VFDs, and custom efficiency.",
      "reasoningNotes": "Kept commercial and industrial categories supported by the Bright business rebate menu; separated forklift electrification from EV charging."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Bright Energy Solutions business pages list many rebate categories but did not expose a single ND utility-specific electric forklift or fleet formula.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/members#nd-list",
          "https://www.brightenergysolutions.com/resources/business",
          "https://www.brightenergysolutions.com/members/hutchinson-utilities-commission"
        ],
        "reasoningNotes": "Target is fleet fuel replacement but the official public pages returned categories without a clear amount for the matched vehicle/forklift scope.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1128",
    "opportunityName": "Ashland Electric Utility - Residential Energy Efficiency Rebate Programs",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1128/ashland-electric-utility-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://ashlandoregon.gov/584/Residential-Incentives",
    "applicationUrl": "https://ashlandoregon.gov/FormCenter/Electric-Department-8/Climate-and-Energy-Incentive-Programs-On-81",
    "administrator": "City of Ashland",
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
        "counties": [],
        "cities": [
          "Ashland"
        ],
        "utilityTerritories": [
          "City of Ashland Electric Utility"
        ],
        "notes": "Limited to City of Ashland Electric Utility customers; some incentives also depend on income qualification, electric heat, or home review."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter",
        "property_owner",
        "income_qualified_resident"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "home_energy_review",
        "electric_panel_upgrade",
        "electric_circuit_upgrade",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "duct_sealing_and_insulation",
        "heat_pump_water_heater",
        "induction_cooktop_range",
        "window_replacement",
        "insulation_upgrade",
        "energy_star_residential_clothes_washer",
        "energy_star_residential_clothes_dryer",
        "smart_thermostat_zoning_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a City of Ashland Electric Utility customer.",
        "Home energy review is required for weatherization, heating, and cooling incentives and encouraged for hot water measures.",
        "Weatherization incentives are limited to homes with electric heat.",
        "Heating, cooling, HPWH, thermostat, appliance, and induction equipment must meet program specifications.",
        "Permits, invoices, photos, receipts, and listed application materials are required.",
        "Income-qualified multipliers require income qualification."
      ],
      "blockers": [
        "Induction support is residential cooktop or range equipment, not commercial kitchen equipment.",
        "Washer and dryer support is residential ENERGY STAR equipment, not commercial laundry.",
        "Smart thermostat incentive cannot be combined with a new heating-system rebate where prohibited.",
        "EV charging, solar, and water conservation should be treated as separate program boundaries except for electric-ready panel or circuit support.",
        "Weatherization should not match non-electric-heat homes."
      ],
      "programType": "Rebate Program",
      "administrator": "City of Ashland",
      "applicationUrl": "https://ashlandoregon.gov/FormCenter/Electric-Department-8/Climate-and-Energy-Incentive-Programs-On-81",
      "websiteUrl": "https://ashlandoregon.gov/584/Residential-Incentives",
      "sourceUrlsChecked": [
        "https://ashlandoregon.gov/584/Residential-Incentives",
        "https://ashlandoregon.gov/FormCenter/Electric-Department-8/Climate-and-Energy-Incentive-Programs-On-81"
      ],
      "evidenceText": "Ashland’s residential incentives page lists electric-ready upgrades, heat pumps, HPWHs, induction cooktops or ranges, windows, insulation, ENERGY STAR washer or dryer rebates and smart thermostat incentives.",
      "reasoningNotes": "The prior match was mostly correct but needed residential-only narrowing and a boundary around EV, solar and commercial induction interpretations."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Ashland residential incentives include several heat-pump and electrification measures, but the target maps to fleet fuel replacement and multiple measure choices.",
        "sourceUrlsChecked": [
          "https://ashlandoregon.gov/590/Commercial-Incentives",
          "https://ashlandoregon.gov/588/Rebates-Incentives"
        ],
        "reasoningNotes": "No single source-backed residential EV or vehicle formula was verified for this target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3129",
    "opportunityName": "Idaho Power - New Building Efficiency Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3129/idaho-power-new-building-efficiency-program",
    "websiteUrl": "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-business/new-construction-major-renovations/",
    "applicationUrl": null,
    "administrator": "Idaho Power Company",
    "programType": "New Construction And Major Renovations Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
          "reflective roof"
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
          "Idaho Power"
        ],
        "notes": "DSIRE target is Oregon; Idaho Power offers similar business programs in Idaho and Oregon with state-specific applicability."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "builder_developer",
        "design_team",
        "contractor"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "new_construction",
        "major_renovation"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "exterior_site_lighting_retrofit",
        "energy_management_system",
        "hvac_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "cool_roof_reflective_roof",
        "high_efficiency_laundry_equipment",
        "high_efficiency_refrigeration_equipment",
        "compressed_air_systems",
        "variable_frequency_drive",
        "kitchen_hood_controls_vfd",
        "high_volume_low_speed_fan",
        "whole_building_energy_modeling"
      ],
      "hardRequirements": [
        "Preliminary application must be submitted before project completion.",
        "Eligible projects are commercial or industrial new construction, additions, expansions, change-of-space, or major renovations."
      ],
      "blockers": [
        "This is not a standard existing-building residential retrofit rebate.",
        "Code-required measures and ordinary replacements without new construction or major renovation context are not eligible.",
        "Fuel switching, onsite generation, and measures covered only by separate programs should not be inferred."
      ],
      "programType": "New Construction And Major Renovations Incentive Program",
      "administrator": "Idaho Power Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-business/new-construction-major-renovations/",
      "sourceUrlsChecked": [
        "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-business/new-construction-major-renovations/",
        "https://docs.idahopower.com/pdfs/energyefficiency/business/proceduresManual.pdf"
      ],
      "evidenceText": "Idaho]( Power's business page and manual cover new construction and major renovations with lighting, HVAC, controls, shell, refrigeration, compressed air, VFD, kitchen hood, and custom whole-building measures.",
      "reasoningNotes": "Recast as a commercial and industrial new construction or major renovation incentive; not a general residential retrofit record."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Idaho Power new building incentives are custom/new-construction project incentives and no reusable formula was verified.",
        "sourceUrlsChecked": [
          "https://www.idahopower.com/ways-to-save/savings-for-your-business/new-construction-major-renovations/"
        ],
        "reasoningNotes": "No safe per-kWh or per-unit rule was found for the broad new-construction target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3337",
    "opportunityName": "Monmouth Power & Light - Residential Energy Efficiency Program",
    "state": "OR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3337/monmouth-power-and-light-residential-energy-efficiency-program",
    "websiteUrl": "https://www.ci.monmouth.or.us/pview.aspx?catid=552&id=55053",
    "applicationUrl": null,
    "administrator": "Monmouth Power & Light",
    "programType": "Residential Energy Efficiency Rebate Program",
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
          "OR"
        ],
        "counties": [],
        "cities": [
          "Monmouth"
        ],
        "utilityTerritories": [
          "Monmouth Power & Light"
        ],
        "notes": "Eligible customer must receive Monmouth Power & Light service; electricity must be and remain the primary heat source for qualifying homes."
      },
      "eligibleApplicantTypes": [
        "residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "smart_thermostat_zoning_retrofit",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "insulation_upgrade",
        "window_replacement",
        "exterior_door_replacement",
        "energy_star_clothes_washer",
        "energy_star_clothes_dryer"
      ],
      "hardRequirements": [
        "Applicant must be a Monmouth Power & Light customer.",
        "Application must be submitted before installation.",
        "Electricity must be and remain the home's primary heat source.",
        "Receipts or invoices are required after installation.",
        "Pre- and post-inspections may be required for many measures."
      ],
      "blockers": [
        "Furnace retrofit is not supported; HVAC rebates are for eligible electric-to-heat-pump conversions.",
        "Broad air sealing or weatherization should be limited to supported insulation, window, and exterior-door measures.",
        "Laundry support is residential ENERGY STAR washer and electric dryer, not commercial laundry or water-efficiency equipment.",
        "Application must be submitted before installation, and electricity must remain the primary heat source."
      ],
      "programType": "Residential Energy Efficiency Rebate Program",
      "administrator": "Monmouth Power & Light",
      "applicationUrl": null,
      "websiteUrl": "https://www.ci.monmouth.or.us/pview.aspx?catid=552&id=55053",
      "sourceUrlsChecked": [
        "https://www.ci.monmouth.or.us/pview.aspx?id=4776",
        "https://www.ci.monmouth.or.us/pview.aspx?catid=552&id=55053"
      ],
      "evidenceText": "Monmouth's current residential program lists rebates for Level 2 EV chargers, heat pump water heaters, smart thermostats, ductless and ducted heat pumps, insulation, windows, exterior doors, and ENERGY STAR washer and dryer.",
      "reasoningNotes": "Retained window replacement because Monmouth explicitly lists window rebates. Furnace and broad weatherization matches were narrowed."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official Monmouth materials did not verify a current Level 2 EV charger formula.",
        "sourceUrlsChecked": [
          "https://www.ci.monmouth.or.us/",
          "https://programs.dsireusa.org/system/program/detail/3337"
        ],
        "reasoningNotes": "Primary target is EV charging; no official one-time charger amount was found.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22561",
    "opportunityName": "Commercial Energy Efficiency Rebates (Offered by 12 Utilities)",
    "state": "SD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22561/commercial-energy-efficiency-rebates-offered-by-12-utilities",
    "websiteUrl": "https://www.brightenergysolutions.com/members",
    "applicationUrl": null,
    "administrator": "Bright Energy Solutions / Missouri River Energy Services",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
          "lighting controls",
          "occupancy sensor"
        ]
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
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
        "notes": "Program is available through participating Bright Energy Solutions municipal utilities in South Dakota."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business_customer",
        "industrial_customer",
        "municipal_utility_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "efficient_ice_machine",
        "electric_forklift_material_handling",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "variable_refrigerant_flow_heat_pump",
        "high_efficiency_hvac_replacement",
        "heat_pump_water_heater",
        "demand_controlled_ventilation",
        "commercial_refrigeration_equipment",
        "refrigerated_case_lighting_controls",
        "walk_in_strip_curtains",
        "commercial_kitchen_equipment",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_oven",
        "high_efficiency_steamer",
        "kitchen_hood_controls_vfd",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "compressed_air_systems",
        "variable_frequency_drive",
        "efficient_pump_replacement",
        "industrial_infrared_process_heating"
      ],
      "hardRequirements": [
        "Customer must receive electric service from a participating Bright Energy Solutions municipal utility.",
        "Custom, custom electrification, and larger projects require preapproval and program savings review."
      ],
      "blockers": [
        "This is not a residential appliance or home weatherization program.",
        "Electric forklift incentives are material-handling electrification, not generic EV charger installation.",
        "Custom incentives must not be matched automatically without preapproval and project-specific savings documentation."
      ],
      "programType": "Rebate Program",
      "administrator": "Bright Energy Solutions / Missouri River Energy Services",
      "applicationUrl": null,
      "websiteUrl": "https://www.brightenergysolutions.com/members",
      "sourceUrlsChecked": [
        "https://www.brightenergysolutions.com/",
        "https://www.brightenergysolutions.com/members",
        "https://www.brightenergysolutions.com/members/brookings-municipal-utilities"
      ],
      "evidenceText": "Bright]( Energy Solutions member pages list South Dakota municipal utilities and business rebates for lighting, HVAC, refrigeration, foodservice, compressed air, forklifts, pumps, VFDs, and custom efficiency.",
      "reasoningNotes": "Kept commercial and industrial categories supported by the Bright business rebate menu; separated forklift electrification from EV charging."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Bright Energy Solutions commercial rebates vary by participating South Dakota utility and measure category.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/find-a-rebate/",
          "https://programs.dsireusa.org/system/program/detail/22561"
        ],
        "reasoningNotes": "Target spans EV/fleet, lighting, refrigeration and controls; a utility-specific form is needed.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4142",
    "opportunityName": "Dominion Virginia Power - Non-Residential Energy Efficiency Programs",
    "state": "VA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4142/dominion-virginia-power-non-residential-energy-efficiency-programs",
    "websiteUrl": "https://www.dominionenergy.com/virginia/save-energy/my-business",
    "applicationUrl": null,
    "administrator": "Dominion Energy Virginia",
    "programType": "Rebate And Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 10,
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
        "retrofitTypeId": "refrigeration_ec_motor_retrofit",
        "displayName": "Refrigeration EC motor retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ec motor"
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
          "Dominion Energy Virginia"
        ],
        "notes": "Applies to eligible Dominion Energy Virginia non-residential electric customers; some vendor pages cover multiple states, so Virginia territory must be enforced for this DSIRE target."
      },
      "eligibleApplicantTypes": [
        "non_residential_electric_customer",
        "commercial_customer",
        "small_business",
        "industrial_customer",
        "institutional_customer",
        "agricultural_customer",
        "data_center",
        "commercial_equipment_distributor"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "agricultural",
        "restaurant",
        "education",
        "healthcare",
        "data_center",
        "manufacturing",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "building_automation_energy_management_system",
        "building_optimization_recommissioning",
        "commercial_lighting_systems_and_controls",
        "small_business_lighting_retrofit",
        "hvac_tune_up",
        "duct_testing_and_sealing",
        "commercial_hvac_controls_and_upgrades",
        "mini_split_hvac_upgrade",
        "commercial_heat_pump_water_heater",
        "commercial_kitchen_equipment_upgrade",
        "commercial_refrigeration_equipment_upgrade",
        "refrigeration_fan_motors_gaskets_controls",
        "commercial_window_film",
        "data_server_room_efficiency",
        "commercial_energy_audit_assistance",
        "agricultural_efficiency_equipment"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Dominion Energy Virginia non-residential electric customer or participating distributor/contractor channel.",
        "Measures must be installed through the applicable business program and meet prescriptive, small business, automation, contractor, or custom program rules.",
        "Some measures require an on-site assessment, pre-approval, contractor participation, or program-specific application."
      ],
      "blockers": [
        "Do not match residential clothes washers, residential dishwashers, or residential appliance rebates.",
        "Do not match ground-source geothermal unless a current non-residential program measure specifically supports it.",
        "Product-specific commercial kitchen and refrigeration measures should not be generalized into unrelated residential appliance categories.",
        "North Carolina or separate-program Dominion offerings should not match this Virginia target."
      ],
      "programType": "Rebate And Incentive",
      "administrator": "Dominion Energy Virginia",
      "applicationUrl": null,
      "websiteUrl": "https://www.dominionenergy.com/virginia/save-energy/my-business",
      "sourceUrlsChecked": [
        "https://www.dominionenergy.com/virginia/save-energy/my-business",
        "https://www.domsavings.com/",
        "https://www.domsavings.com/business-program/commercial-kitchen-refrigeration-products",
        "https://www.domsavings.com/business-program/small-business-improvement",
        "https://www.domsavings.com/business-program/automation-program",
        "https://www.dom-vendor.com/programs",
        "https://news.dominionenergy.com/press-releases/press-releases/2026/Dominion-Energy-Encourages-Businesses-to-Save-Expands-Rebates-for-Limited-Time/default.aspx"
      ],
      "evidenceText": "Dominion business pages list non-residential programs for lighting, controls, HVAC, ductwork, refrigeration, commercial kitchen equipment, data server rooms, agriculture, and small business improvements.",
      "reasoningNotes": "The DSIRE technology match mixed in residential appliance terms. Repaired to non-residential Dominion Energy Virginia business measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Dominion nonresidential efficiency programs include multiple prescriptive/custom measures, but no target refrigeration formula was verified.",
        "sourceUrlsChecked": [
          "https://www.dominionenergy.com/virginia/save-energy/business-programs"
        ],
        "reasoningNotes": "Matched terms require a specific measure table; no safe amount was selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2195",
    "opportunityName": "Grays Harbor PUD - Non-Residential Energy Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2195/grays-harbor-pud-non-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ghpud.org/energy-efficiency/commercial-programs/",
    "applicationUrl": null,
    "administrator": "Grays Harbor PUD",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 10,
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
          "Grays Harbor"
        ],
        "cities": [],
        "utilityTerritories": [
          "Grays Harbor PUD"
        ],
        "notes": "Available to eligible non-residential customers served by Grays Harbor PUD."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "commercial_building_owner",
        "commercial_metered_business",
        "industrial_customer",
        "agricultural_customer",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "commercial_heat_pump_water_heater",
        "commercial_clothes_washer",
        "commercial_foodservice_equipment",
        "pre_rinse_spray_valve",
        "demand_controlled_kitchen_ventilation",
        "smart_power_strip",
        "ductless_heat_pump",
        "commercial_hvac_retrofit",
        "connected_thermostat",
        "commercial_insulation_upgrade",
        "commercial_window_replacement",
        "commercial_lighting_retrofit",
        "commercial_refrigeration_equipment_upgrade",
        "custom_commercial_energy_efficiency",
        "industrial_lighting_retrofit",
        "industrial_motors_and_drives",
        "energy_management"
      ],
      "hardRequirements": [
        "Measures must be installed at a qualifying Grays Harbor PUD commercial, industrial, agricultural, or institutional electric premise.",
        "Appliance rebate applications must be submitted within the stated application period after installation.",
        "Lighting, refrigeration, HVAC, and custom projects may require pre-approval, documentation, and inspection.",
        "Commercial-metered business or industrial facility status is required for business program measures."
      ],
      "blockers": [
        "Do not match residential smart thermostat, residential water heating, or residential weatherization measures.",
        "Pre-rinse spray valves are product-specific and should not become a broad plumbing retrofit.",
        "Commercial clothes washer is a commercial appliance measure, not a residential laundry rebate.",
        "Direct official pages were partially blocked, so avoid unsupported categories beyond official indexed pages and program documents."
      ],
      "programType": "Rebate",
      "administrator": "Grays Harbor PUD",
      "applicationUrl": null,
      "websiteUrl": "https://www.ghpud.org/energy-efficiency/commercial-programs/",
      "sourceUrlsChecked": [
        "https://www.ghpud.org/energy-efficiency",
        "https://www.ghpud.org/energy-efficiency/commercial-programs/",
        "https://www.ghpud.org/energy-efficiency/commercial-programs/commercial-programs-rebate-application/",
        "https://www.ghpud.org/faqs/non-residential-rebate-program-schedule/",
        "https://www.ghpud.org/energy-efficiency/commercial-programs/appliances/",
        "https://ghpud.upgrade.guide/recommendations/print/135/"
      ],
      "evidenceText": "Grays Harbor PUD commercial program materials list lighting, HVAC, insulation, windows, refrigeration, commercial appliances, kitchen ventilation, smart strips, motors and drives, energy management, and custom projects.",
      "reasoningNotes": "The opportunity is non-residential; residential weatherization and appliance interpretations were removed."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Grays Harbor PUD non-residential pages list program categories but no reusable whole-building per-kWh formula was verified.",
        "sourceUrlsChecked": [
          "https://www.ghpud.org/energy-efficiency/commercial-programs/",
          "https://programs.dsireusa.org/system/program/detail/2195"
        ],
        "reasoningNotes": "No safe custom rule should be created without a current measure table or incentive rate.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4713",
    "opportunityName": "Lower Valley Energy - Residential Energy Efficiency Rebate Program",
    "state": "WY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4713/lower-valley-energy-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.lvenergy.com/energy-efficiency/conservation-residential/",
    "applicationUrl": null,
    "administrator": "Lower Valley Energy",
    "programType": "Rebate And Energy Audit",
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
          "WY",
          "ID"
        ],
        "counties": [
          "Teton",
          "Lincoln",
          "Sublette",
          "Caribou",
          "Bonneville"
        ],
        "cities": [],
        "utilityTerritories": [
          "Lower Valley Energy"
        ],
        "notes": "Lower Valley Energy serves northwest Wyoming and southeastern Idaho; DSIRE target state was Wyoming."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "homeowner",
        "multifamily_owner"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "ductless_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat",
        "window_replacement",
        "exterior_door_replacement",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "energy_audit"
      ],
      "hardRequirements": [
        "Applicant must be in Lower Valley Energy's service territory.",
        "All heat pump rebates require pre-approval before work starts.",
        "Heat pumps must be AHRI certified and meet current program requirements.",
        "Window, door, insulation, and weatherization measures must meet housing-type and program documentation rules.",
        "Smart thermostat rebate is limited by household caps."
      ],
      "blockers": [
        "Do not match LED lighting; current residential conservation sources did not verify a lighting rebate.",
        "Do not match customers outside Lower Valley Energy's Wyoming or Idaho service territory.",
        "Do not treat energy audit as a physical retrofit.",
        "Do not match commercial or industrial measures to this residential opportunity.",
        "Official pages were partially blocked, so do not add unsupported categories beyond official indexed conservation pages."
      ],
      "programType": "Rebate And Energy Audit",
      "administrator": "Lower Valley Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.lvenergy.com/energy-efficiency/conservation-residential/",
      "sourceUrlsChecked": [
        "https://www.lvenergy.com/energy-efficiency/conservation-residential/",
        "https://www.lvenergy.com/about-us/service-territory/"
      ],
      "evidenceText": "Lower Valley Energy residential conservation sources list heat pumps, heat pump water heaters, smart thermostats, window and door replacement, insulation, air sealing or weatherization, and energy audits, with heat pump preapproval requirements.",
      "reasoningNotes": "Preserved residential envelope, heat pump, water heating, thermostat, and audit categories; removed unsupported LED lighting."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official conservation page confirms programs but did not expose exact current residential rebate amounts.",
        "sourceUrlsChecked": [
          "https://www.lvenergy.com/energy-efficiency/conservation-residential/"
        ],
        "reasoningNotes": "No safe rule verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3654",
    "opportunityName": "AEP SWEPCO - Commercial and Industrial Energy Efficiency Rebate Programs",
    "state": "AR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3654/aep-swepco-commercial-and-industrial-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.swepco.com/savings/business/rebates/",
    "applicationUrl": null,
    "administrator": "Southwestern Electric Power Company / CLEAResult",
    "programType": "Commercial Industrial Rebate And Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
        "notes": "This repair reflects the Arkansas DSIRE record; SWEPCO pages also present state filters for other service states."
      },
      "eligibleApplicantTypes": [
        "business_customers",
        "commercial_customers",
        "industrial_customers",
        "government_customers",
        "schools",
        "small_business_customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public",
        "institutional",
        "education",
        "food_service"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "hvac_tune_up",
        "high_efficiency_refrigeration_equipment",
        "anti_sweat_heater_controls",
        "door_gasket_strip_curtain_night_cover",
        "evaporator_fan_controls",
        "variable_frequency_drive_retrofit",
        "motors_drives_retrofit",
        "compressed_air_efficiency",
        "commercial_foodservice_equipment",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_oven",
        "high_efficiency_fryer",
        "high_efficiency_ice_machine",
        "pre_rinse_spray_valve",
        "faucet_aerator",
        "ev_charger_installation",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a SWEPCO business customer in the applicable state service territory.",
        "Large-building C&I pathway is for facilities with peak demand greater than 100 kW; small business pathway is for demand less than or equal to 100 kW.",
        "LED retrofits must be DLC or ENERGY STAR certified where specified.",
        "Level 2 EV chargers must be ENERGY STAR certified."
      ],
      "blockers": [
        "Smart thermostat retrofit is not retained because current official commercial pages did not verify it as a business incentive.",
        "Pre-rinse spray valves and faucet aerators are product-specific no-cost measures, not broad plumbing retrofits.",
        "Residential weatherization, residential appliance recycling, and residential CoolSaver offers are separate and should not match this C&I opportunity.",
        "DC fast charging is not supported by the checked SWEPCO commercial pages."
      ],
      "programType": "Commercial Industrial Rebate And Incentive Program",
      "administrator": "Southwestern Electric Power Company / CLEAResult",
      "applicationUrl": null,
      "websiteUrl": "https://www.swepco.com/savings/business/rebates/",
      "sourceUrlsChecked": [
        "https://www.swepco.com/savings/business/rebates/",
        "https://swepcosavings.com/",
        "https://swepcosavings.com/commercial/big-buildings",
        "https://swepcosavings.com/commercial/midstream-lighting",
        "https://swepcosavings.com/commercial/commercial-coolsaver",
        "https://swepcosavings.com/small-business"
      ],
      "evidenceText": "SWEPCO business pages list incentives for lighting, refrigeration, motors and drives, HVAC, foodservice equipment, lighting controls, air compressors, Level 2 EV chargers, CoolSaver tune-ups and small-business measures.",
      "reasoningNotes": "Updated the record using SWEPCO’s current business and commercial program pages; Level 2 EV charging is supported, but smart thermostat matching is not."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "SWEPCO commercial page did not verify a current EVSE or refrigeration incentive formula in accessible text.",
        "sourceUrlsChecked": [
          "https://swepcosavings.com/#/commercial"
        ],
        "reasoningNotes": "No source-backed one-time rule was selected from dynamic program content.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1689",
    "opportunityName": "Glendale Water and Power - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1689/glendale-water-and-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.glendaleca.gov/government/departments/glendale-water-and-power/residential-customers/residential-programs/smart-home-rebate-program",
    "applicationUrl": "https://www.glendaleca.gov/government/departments/glendale-water-and-power/residential-customers/residential-programs/smart-home-rebate-program",
    "administrator": "Glendale Water and Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
          "Los Angeles County"
        ],
        "cities": [
          "Glendale"
        ],
        "utilityTerritories": [
          "Glendale Water and Power electric service territory",
          "Glendale Water and Power water service territory for water measures"
        ],
        "notes": "Applies to residential premises served by Glendale Water and Power; some water measures are processed through SoCalWaterSmart or require Glendale water service."
      },
      "eligibleApplicantTypes": [
        "Glendale Water and Power residential customers",
        "homeowners",
        "residential tenants with required account or owner authorization",
        "Glendale residential water customers for water measures"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_refrigerator",
        "energy_star_freezer",
        "energy_star_dishwasher",
        "electric_heat_pump_clothes_dryer",
        "heat_pump_water_heater",
        "room_air_conditioner",
        "ceiling_fan",
        "whole_house_fan",
        "solar_attic_fan",
        "heat_pump_hvac",
        "ductless_mini_split_heat_pump",
        "electric_range",
        "electric_range_oven_combo",
        "electric_wall_oven",
        "electric_leaf_blower",
        "variable_speed_pool_pump",
        "electric_panel_upgrade_paired_with_gas_to_electric_conversion",
        "high_efficiency_clothes_washer",
        "high_efficiency_toilet",
        "weather_based_irrigation_controller",
        "rotating_sprinkler_nozzles",
        "rain_barrel_or_cistern"
      ],
      "hardRequirements": [
        "Applicant must be a GWP customer and the rebated product must be installed in a residence served by Glendale Water and Power.",
        "Applications generally must be submitted no more than 12 months from purchase date.",
        "Only products listed on GWP's rebate page are eligible, and rebate amount cannot exceed purchase price.",
        "Many appliances must be ENERGY STAR certified where specified.",
        "Gas-to-electric appliance conversions such as heat pump water heaters or electric cooking equipment require permits and related GWP criteria.",
        "Water measures may require Glendale water service and SoCalWaterSmart application requirements."
      ],
      "blockers": [
        "Matched term blower is not a building fan or HVAC blower retrofit; the current official source supports electric leaf blowers only.",
        "Matched oven is limited to electric wall oven or electric range/range-oven combo terms, not a broad commercial cooking measure.",
        "This is a residential program; do not match to commercial HVAC, commercial kitchen or commercial refrigeration measures.",
        "Water fixtures such as toilets are supported only as residential water-efficiency measures, not as commercial plumbing retrofits."
      ],
      "programType": "Rebate Program",
      "administrator": "Glendale Water and Power",
      "applicationUrl": "https://www.glendaleca.gov/government/departments/glendale-water-and-power/residential-customers/residential-programs/smart-home-rebate-program",
      "websiteUrl": "https://www.glendaleca.gov/government/departments/glendale-water-and-power/residential-customers/residential-programs/smart-home-rebate-program",
      "sourceUrlsChecked": [
        "https://www.glendaleca.gov/government/departments/glendale-water-and-power/residential-customers/residential-programs/smart-home-rebate-program",
        "https://programs.dsireusa.org/system/program/detail/1689/glendale-water-and-power-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "GWP's current Home Energy and Water Saving Rebates page states updated rebate amounts effective 11/1/2025 and lists ENERGY STAR refrigerator, freezer and dishwasher, heat pump clothes dryer, heat pump water heater, room AC, heat pump and mini-split heat pump, electric cooking equipment, electric leaf blower, clothes washer, toilets and irrigation measures.",
      "reasoningNotes": "The DSIRE record is active as a current residential GWP rebate page. Product-specific matches were retained, while broad commercial or generic building interpretations of appliance and blower keywords were removed."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "GWP smart home rebate page confirms eligible products, but accessible official text did not expose exact product amounts.",
        "sourceUrlsChecked": [
          "https://www.glendaleca.gov/government/departments/glendale-water-and-power/residential-customers/residential-programs/smart-home-rebate-program"
        ],
        "reasoningNotes": "Do not use social media-only rebate amounts as final proof.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1718",
    "opportunityName": "Lassen Municipal Utility District - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1718/lassen-municipal-utility-district-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.lmud.org/customer-services/rebates/residential-rebates/",
    "applicationUrl": "https://www.lmud.org/customer-services/rebates/residential-rebates/",
    "administrator": "Lassen Municipal Utility District",
    "programType": "Residential Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
          "Lassen County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Lassen Municipal Utility District electric service territory"
        ],
        "notes": "LMUD residential rebate pages appear active, but some official pages were not fully readable directly; current indexed pages and 2026 LMUD communications support availability."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "lmud_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_star_clothes_washer",
        "energy_star_electric_clothes_dryer",
        "energy_star_dishwasher",
        "energy_star_refrigerator",
        "energy_star_freezer",
        "heat_pump_water_heater",
        "air_source_heat_pump",
        "ductless_heat_pump",
        "ground_source_geothermal_heat_pump",
        "central_air_conditioner_replacement",
        "smart_thermostat_zoning_retrofit",
        "room_air_conditioner",
        "whole_house_fan",
        "residential_led_lighting"
      ],
      "hardRequirements": [
        "Applicant must be an eligible LMUD residential electric customer.",
        "Appliances and equipment must meet current LMUD rebate qualifications, generally ENERGY STAR or listed efficiency requirements.",
        "Rebate forms, proof of purchase, and current LMUD program deadlines apply.",
        "HVAC and water-heating measures may have installation, equipment, and inspection requirements."
      ],
      "blockers": [
        "Commercial dishwasher matching is a false positive; current sources support residential appliance rebates only.",
        "Refrigerator and freezer matches are residential ENERGY STAR appliance rebates, not commercial refrigeration equipment.",
        "Exact current rebate amounts and every detailed form condition could not be fully verified from readable official pages.",
        "Do not infer commercial, industrial, or foodservice eligibility."
      ],
      "programType": "Residential Rebate",
      "administrator": "Lassen Municipal Utility District",
      "applicationUrl": "https://www.lmud.org/customer-services/rebates/residential-rebates/",
      "websiteUrl": "https://www.lmud.org/customer-services/rebates/residential-rebates/",
      "sourceUrlsChecked": [
        "https://www.lmud.org/customer-services/rebates/residential-rebates/",
        "https://www.lmud.org/customer-services/rebates/",
        "https://www.lmud.org/customer-services/rebates/residential-rebates/heat-pump-water-heater/",
        "https://www.lmud.org/news-releases/managers-message-january-2026/",
        "https://www.lmud.org/news-releases/lmuds-commitment-to-energy-efficiency/",
        "https://scppa.org/wp-content/uploads/2025/06/2025-POU-EE-Report-Final.pdf"
      ],
      "evidenceText": "LMUD indexed pages list residential rebates for appliances, heat pump water heaters, air-source and geothermal heat pumps, central AC, smart thermostats, room AC, and whole-house fans. A 2026 LMUD message confirms rebates from ENERGY STAR appliances to LED lighting.",
      "reasoningNotes": "Kept residential appliance, HVAC, water-heating, and lighting categories supported by LMUD sources. Marked medium confidence because some official details were not fully readable and blocked commercial equipment false positives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "LMUD residential rebate sources did not verify a current whole-building per-kWh or matched equipment formula.",
        "sourceUrlsChecked": [
          "https://www.lmud.org/",
          "https://programs.dsireusa.org/system/program/detail/1718"
        ],
        "reasoningNotes": "Target has many residential matched measures but no single official current value was safely selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5018",
    "opportunityName": "Loveland Water & Power - Residential Energy Efficiency Rebate Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5018/loveland-water-and-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.lovelandwaterandpower.org/resident/residential-rebates",
    "applicationUrl": "https://www.lovelandwaterandpower.org/resident/residential-rebates",
    "administrator": "Loveland Water and Power / Efficiency Works",
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
          "CO"
        ],
        "counties": [
          "Larimer County"
        ],
        "cities": [
          "Loveland"
        ],
        "utilityTerritories": [
          "City of Loveland Utilities / Loveland Water and Power electric service territory"
        ],
        "notes": "Applies to City of Loveland Utilities residential electric customers; many rebates are delivered through Efficiency Works."
      },
      "eligibleApplicantTypes": [
        "Loveland residential electric customers",
        "homeowners",
        "residential account holders",
        "owners of eligible single-family homes, townhomes or small multifamily properties",
        "customers using qualified Efficiency Works service providers"
      ],
      "eligibleSectors": [
        "residential",
        "small_multifamily_residential_limited"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac",
        "heat_pump_water_heater",
        "whole_home_mechanical_ventilation",
        "windows",
        "exterior_doors",
        "insulation",
        "air_sealing",
        "smart_thermostat",
        "outdoor_led_fixture",
        "advanced_power_strip",
        "electric_panel_upgrade_limited",
        "load_sharing_device_limited",
        "induction_cooking",
        "electric_range_or_cooktop",
        "energy_star_clothes_washer",
        "heat_pump_clothes_dryer",
        "radon_fan"
      ],
      "hardRequirements": [
        "Applicant must be a City of Loveland Utilities residential electric customer for most electric incentives.",
        "Eligible homes generally must be at least one year old and within the residential housing types specified by Efficiency Works.",
        "Many HVAC, window, door, insulation and air-sealing measures require a qualified Efficiency Works service provider.",
        "Envelope and window or door measures may require an assessment before the rebate-eligible work is performed.",
        "Post-purchase rebate applications are subject to current Efficiency Works timing, documentation and funding rules.",
        "Rebate cannot exceed eligible purchase or installed cost where program rules apply."
      ],
      "blockers": [
        "The old Loveland SAVEENERGY URL is stale; the current official source is Loveland's residential rebates page and Efficiency Works pages.",
        "No Loveland EV purchase or lease rebate was verified; Level 2 charging should only match if the current project qualifies for an electric panel upgrade or load-sharing-device incentive.",
        "Residential water rebates were listed as currently unavailable or pending updates and were not retained as active water retrofit categories.",
        "Refrigerator and freezer recycling should not be matched as a stable ongoing category because Loveland/Efficiency Works indicated recycled-appliance rebates are ending or no longer available after July 1, 2026.",
        "This residential program should not be mapped to commercial HVAC, refrigeration, motors or food-service retrofits."
      ],
      "programType": "Rebate Program",
      "administrator": "Loveland Water and Power / Efficiency Works",
      "applicationUrl": "https://www.lovelandwaterandpower.org/resident/residential-rebates",
      "websiteUrl": "https://www.lovelandwaterandpower.org/resident/residential-rebates",
      "sourceUrlsChecked": [
        "http://www.lovelandwaterandpower.org/SAVEENERGY",
        "https://www.lovelandwaterandpower.org/resident/residential-rebates",
        "https://efficiencyworks.org/for-your-home-rebates-and-incentives/",
        "https://www.efficiencyworks.org/homes/rebates/hvac/",
        "https://www.efficiencyworks.org/homes/rebates/windows-doors/",
        "https://www.efficiencyworks.org/homes/rebates/insulation-air-sealing/",
        "https://www.efficiencyworks.org/homes/rebates/electrical/",
        "https://www.efficiencyworks.org/homes/rebates/appliances/",
        "https://programs.dsireusa.org/system/program/detail/5018/loveland-water-and-power-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Loveland's current residential rebates page directs customers to Efficiency Works and lists active residential incentives for HVAC, heat pump water heaters, ventilation, windows and doors, insulation and air sealing, electrical products, appliances and electrification products. Efficiency Works rules require Loveland residential electric service, qualified service providers for many measures, and current documentation and timing requirements.",
      "reasoningNotes": "The program is active, but several imported matches were narrowed. Refrigerator/freezer and EV categories were blocked or limited because current official pages do not support broad ongoing rebates for those interpretations."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Loveland/Efficiency Works materials include multiple residential rebates and bundle bonuses.",
        "sourceUrlsChecked": [
          "https://www.lovgov.org/services/utilities/electric/residential/rebates",
          "https://efficiencyworks.org/homes/rebates/"
        ],
        "reasoningNotes": "Primary target is fleet fuel replacement; matched residential measures do not provide a direct EV or vehicle formula.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3697",
    "opportunityName": "Morgan County REA - Efficiency Credit/Rebate Programs",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3697/morgan-county-rea-efficiency-credit-rebate-programs",
    "websiteUrl": "https://www.mcrea.org/energy-efficiency-rebates",
    "applicationUrl": null,
    "administrator": "Morgan County Rural Electric Association",
    "programType": "Member Rebate Program",
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
          "CO"
        ],
        "counties": [
          "Morgan County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Morgan County Rural Electric Association",
          "Morgan County REA"
        ],
        "notes": "Measures must be installed on Morgan County REA lines; member eligibility and service-type rules apply."
      },
      "eligibleApplicantTypes": [
        "cooperative_member",
        "residential_customer",
        "small_commercial_customer",
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "air_to_water_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "heat_pump_clothes_dryer",
        "electric_clothes_dryer",
        "residential_refrigerator_freezer_recycling",
        "induction_cooking_equipment",
        "whole_house_fan",
        "evaporative_cooler",
        "level_2_ev_charger_installation",
        "dc_fast_ev_charger_installation",
        "pole_mounted_led_lighting",
        "efficient_motor_replacement",
        "variable_speed_drive_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Morgan County REA member and measures must be installed on MCREA lines.",
        "Rebate submittals must be made within the utility deadline with dated invoice or bill of sale.",
        "Residential and small commercial appliance and heat pump measures have specific ENERGY STAR, AHRI, size, and fuel-switching requirements.",
        "Commercial and industrial motor and variable-speed-drive incentives have horsepower and application limits.",
        "EV charger rebates require charger type documentation, installation proof, and eligible member account information."
      ],
      "blockers": [
        "Do not match broad LED lighting; the verified lighting measure is pole-mounted LED for commercial and industrial applications.",
        "Do not match high-efficiency commercial refrigeration; only refrigerator and freezer recycling was verified for the residential or small commercial appliance section.",
        "Induction cooking is a cooktop or range measure and should not be generalized to broad commercial kitchen equipment.",
        "Outdoor power equipment and e-bikes, if offered, are not building retrofit categories.",
        "Income-qualified Colorado HEAR support is a separate external program and should not be merged into this MCREA rebate."
      ],
      "programType": "Member Rebate Program",
      "administrator": "Morgan County Rural Electric Association",
      "applicationUrl": null,
      "websiteUrl": "https://www.mcrea.org/energy-efficiency-rebates",
      "sourceUrlsChecked": [
        "https://www.mcrea.org/energy-efficiency-rebates",
        "https://www.mcrea.org/heat-pumps",
        "https://www.mcrea.org/sites/default/files/Rebates/2026%20Rebates/2026%20E%26S%20Brochure_MCREA.pdf"
      ],
      "evidenceText": "MCREA's 2026 rebate guide lists heat pumps, heat pump water heaters, thermostats, dryers, induction cooktops, EV chargers, pole LEDs, motors, and variable-speed drives.",
      "reasoningNotes": "The opportunity covers multiple member sectors. The repair keeps measure-specific residential, small commercial, and C&I rebates while blocking overly broad lighting, refrigeration, and kitchen matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "GPT Pro found a heat pump water heater amount, but this target is mapped to fleet fuel replacement.",
        "sourceUrlsChecked": [
          "https://mcrea.org/rebates/",
          "https://mcrea.org/"
        ],
        "reasoningNotes": "Do not attach water-heater incentives to a fleet replacement target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3112",
    "opportunityName": "Norwich Public Utilities (Electric) - Residential Energy Efficiency Rebate Program",
    "state": "CT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3112/norwich-public-utilities-electric-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://norwichpublicutilities.com/residential/efficiency-programs-rebates/#nav-anchor-to-2",
    "applicationUrl": "https://norwichpublicutilities.com/309/Efficiency-Programs-Rebates",
    "administrator": "Norwich Public Utilities",
    "programType": "Residential Rebate And Home Energy Assessment Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
          "CT"
        ],
        "counties": [
          "New London County"
        ],
        "cities": [
          "Norwich"
        ],
        "utilityTerritories": [
          "Norwich Public Utilities"
        ],
        "notes": "Applies to Norwich Public Utilities residential electric or gas customers depending on measure."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_owner_permission",
        "income_qualified_customer"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "ductless_mini_split_heat_pump",
        "heat_pump_hvac_retrofit",
        "high_efficiency_hvac_replacement",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_gas_water_heater",
        "heat_pump_water_heater",
        "window_air_conditioner",
        "heat_pump_window_unit",
        "insulation_upgrade",
        "heat_pump_clothes_dryer",
        "smart_thermostat_zoning_retrofit",
        "electric_water_heater"
      ],
      "hardRequirements": [
        "Applicant must be a Norwich Public Utilities residential customer for the applicable electric or gas service.",
        "ENERGY STAR appliance rebates require a completed form, dated receipt, Energy Guide or product documentation, and recent electric bill where required.",
        "Gas heating and gas water-heater rebates require NPU natural gas service and qualifying efficiency levels.",
        "Enhanced or income-qualified heat pump and insulation programs require applicable eligibility documentation.",
        "Contractor or program participation requirements apply for Home Energy Solutions, heat pump, insulation, and related offers."
      ],
      "blockers": [
        "Battery storage was not verified in current NPU residential efficiency sources and should be removed.",
        "Blower-door references in audit programs do not support efficient fan or blower replacement.",
        "Residential refrigerator or commercial refrigeration equipment rebates were not verified in the current NPU residential sources.",
        "Low-flow fixture retrofit was not verified in current NPU residential sources.",
        "Window A/C and heat pump window units are product-specific and do not support window replacement."
      ],
      "programType": "Residential Rebate And Home Energy Assessment Program",
      "administrator": "Norwich Public Utilities",
      "applicationUrl": "https://norwichpublicutilities.com/309/Efficiency-Programs-Rebates",
      "websiteUrl": "https://norwichpublicutilities.com/residential/efficiency-programs-rebates/#nav-anchor-to-2",
      "sourceUrlsChecked": [
        "https://norwichpublicutilities.com/309/Efficiency-Programs-Rebates",
        "https://norwichpublicutilities.com/residential/efficiency-programs-rebates/#nav-anchor-to-2",
        "https://norwichpublicutilities.com/DocumentCenter/View/663/2026-NPU-Efficiency-Programs-Overview"
      ],
      "evidenceText": "NPU residential sources list audits, EV charging, ductless and central heat pumps, gas heating, geothermal, water heating, window A/C, insulation, dryers, and thermostats.",
      "reasoningNotes": "The residential match needed major cleanup. Keep NPU residential HVAC, water heating, insulation, appliance, EV charger, and audit categories; remove battery, fan blower, refrigeration, low-flow fixture, and window replacement false positives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official NPU efficiency path checked, but no clear refrigeration or blower formula verified.",
        "sourceUrlsChecked": [
          "https://norwichpublicutilities.com/residential/efficiency-programs-rebates/#nav-anchor-to-2"
        ],
        "reasoningNotes": "No source-backed one-time rule selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1570",
    "opportunityName": "Alliant Energy Interstate Power and Light - Residential Energy Efficiency Rebate Programs",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1570/alliant-energy-interstate-power-and-light-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.alliantenergy.com/waystosave/rebatesandmarketplace/rebatelocatortool",
    "applicationUrl": null,
    "administrator": "Alliant Energy",
    "programType": "Residential Instant Discount Marketplace And Demand Response Program",
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
          "Alliant Energy Interstate Power and Light Iowa service territory"
        ],
        "notes": "Limited to eligible Alliant Energy Iowa residential customers and participating marketplace or distributor channels."
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
        "high_efficiency_air_conditioner",
        "high_efficiency_furnace_retrofit",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "desuperheater",
        "smart_thermostat_zoning_retrofit",
        "automated_demand_response_controls",
        "smart_water_heater_controller",
        "led_lighting_retrofit",
        "advanced_power_strip",
        "level_2_ev_charger_purchase",
        "ev_charger_demand_response_enrollment"
      ],
      "hardRequirements": [
        "Applicant must be an Alliant Energy residential customer in Iowa where Iowa-specific pages require it.",
        "HVAC and water-heating equipment discounts are instant discounts through participating distributors rather than claim-form rebates.",
        "Smart Hours requires a qualified connected device, Wi-Fi, and program enrollment; thermostat eligibility depends on central air conditioning and heating equipment.",
        "EV/charger Smart Hours support requires an eligible EV or Level 2 charger and enrollment."
      ],
      "blockers": [
        "Do not treat marketplace Level 2 charger offers or Smart Hours rewards as an EV charger installation rebate covering labor or make-ready work.",
        "LEDs, smart thermostats, water heater controllers, and EV chargers are marketplace or demand-response offers, separate from the HVAC Instant Discounts pathway.",
        "Commercial, business, agricultural, or Wisconsin offers should not match this Iowa residential record unless separately eligible."
      ],
      "programType": "Residential Instant Discount Marketplace And Demand Response Program",
      "administrator": "Alliant Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.alliantenergy.com/waystosave/rebatesandmarketplace/rebatelocatortool",
      "sourceUrlsChecked": [
        "https://www.alliantenergy.com/waystosave/rebatesandmarketplace/rebatelocatortool",
        "https://www.alliantenergy.com/ways-to-save/instant-discounts/iowa",
        "https://www.alliantenergy.com/ways-to-save/rebates/terms",
        "https://www.alliantenergy.com/ways-to-save/iowa-general-rebates",
        "https://www.alliantenergy.com/ways-to-save/energy-tech-offers/iowa",
        "https://www.alliantenergy.com/ways-to-save/energy-saving-offers/iowa",
        "https://www.alliantenergy.com/ways-to-save/smart-hours/iowa"
      ],
      "evidenceText": "Alliant Iowa pages list residential instant discounts for HVAC and heat pump water heaters, marketplace discounts for smart thermostats, LEDs and Level 2 chargers, and Smart Hours rewards for connected devices.",
      "reasoningNotes": "Retained HVAC, water-heating, marketplace, and Smart Hours device categories while distinguishing equipment discounts from demand response and installation rebates."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Alliant Iowa source confirms current instant discounts for HVAC and HPWHs, but no Iowa residential Level 2 EV charger formula was verified.",
        "sourceUrlsChecked": [
          "https://www.alliantenergy.com/waystosave/rebatesandmarketplace/rebatelocatortool",
          "https://www.alliantenergy.com/ways-to-save/instant-discounts/iowa"
        ],
        "reasoningNotes": "Primary target is EV charging; do not substitute unrelated equipment discounts for charger project savings.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22138",
    "opportunityName": "CenterPoint Energy - Residential New Construction Rebates",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22138/centerpoint-energy-residential-new-construction-rebates",
    "websiteUrl": "https://www.centerpointenergy.com/en-us/residential/save-energy-money/efficiency-programs-and-rebates?sa=in",
    "applicationUrl": "https://centerpointenergyindiana-residential-rebate.clearesult.com/media/wysiwyg/centerpointenergyindiana/1125_CNPIN__RES_2026_6227739_ResReb__Full_Service_App-updated_FILL.pdf",
    "administrator": "CenterPoint Energy",
    "programType": "Residential Rebate",
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
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "CenterPoint Energy Indiana residential electric and natural gas service territory"
        ],
        "notes": "Applies to eligible CenterPoint Energy Indiana residential customers and new-construction projects within the applicable Indiana utility service territory."
      },
      "eligibleApplicantTypes": [
        "residential_account_holder",
        "homeowner",
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
        "central_air_conditioner_replacement",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "heat_pump_water_heater",
        "natural_gas_water_heater",
        "heat_pump_pool_heater",
        "aeroseal_duct_sealing",
        "attic_insulation",
        "high_performance_window",
        "smart_thermostat_zoning_retrofit",
        "energy_star_clothes_washer",
        "energy_star_electric_clothes_dryer",
        "energy_star_dehumidifier",
        "energy_star_air_purifier",
        "attic_fan"
      ],
      "hardRequirements": [
        "Customer and installation must be in CenterPoint Energy Indiana's applicable residential service territory.",
        "Equipment must meet the program's current efficiency, installation, purchase-date, and documentation requirements.",
        "Some measures require a participating contractor, qualifying service fuel, or direct-install/new-construction pathway.",
        "Applications must be submitted through the current rebate form or online process with required invoices and model information."
      ],
      "blockers": [
        "Do not infer broad weatherization from new-construction rebate text; current insulation and duct-sealing measures are measure-specific.",
        "Do not match commercial kitchen, commercial refrigeration, or industrial measures to this residential program.",
        "Thermostat, appliance, and water-heater rebates are product-specific and should not be generalized to broader HVAC or water-efficiency upgrades.",
        "Eligibility can differ between electric and natural gas customers; fuel-specific measures should require the matching utility service."
      ],
      "programType": "Residential Rebate",
      "administrator": "CenterPoint Energy",
      "applicationUrl": "https://centerpointenergyindiana-residential-rebate.clearesult.com/media/wysiwyg/centerpointenergyindiana/1125_CNPIN__RES_2026_6227739_ResReb__Full_Service_App-updated_FILL.pdf",
      "websiteUrl": "https://www.centerpointenergy.com/en-us/residential/save-energy-money/efficiency-programs-and-rebates?sa=in",
      "sourceUrlsChecked": [
        "https://www.centerpointenergy.com/en-us/residential/save-energy-money/efficiency-programs-and-rebates?sa=in",
        "https://centerpointenergyindiana-residential-rebate.clearesult.com/media/wysiwyg/centerpointenergyindiana/1125_CNPIN__RES_2026_6227739_ResReb__Full_Service_App-updated_FILL.pdf",
        "https://centerpointenergyindiana-residential-rebate.clearesult.com/media/wysiwyg/centerpointenergyindiana/1125_CNPIN__RES_2026_6246581_ResReb__Full_Service_FS_CLEAN.pdf",
        "https://centerpointenergyindiana-residential-rebate.clearesult.com/media/wysiwyg/centerpointenergyindiana/1125_CNPIN__RES_2026_6227682_ResReb_Insulation_App_9x7_FILL.pdf",
        "https://centerpointenergyindiana-residential-rebate.clearesult.com/heat-pump-water-heater-098",
        "https://centerpointenergyindiana-residential-rebate.clearesult.com/natural-gas-water-heater",
        "https://centerpointenergyindiana-residential-rebate.clearesult.com/smart-programmable-thermostat"
      ],
      "evidenceText": "Current CenterPoint Indiana residential materials show rebates for HVAC, furnaces, boilers, water heaters, smart thermostats, insulation, windows, duct sealing, and selected ENERGY STAR appliances.",
      "reasoningNotes": "Kept residential measures supported by current CenterPoint Indiana rebate materials. Narrowed weatherization and appliance terms to listed products and added service-territory and fuel limitations."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "CenterPoint residential new construction rebates are builder/project-specific and exact current measure values were not verified.",
        "sourceUrlsChecked": [
          "https://www.centerpointenergy.com/en-us/business/services/builders-developers",
          "https://programs.dsireusa.org/system/program/detail/22138"
        ],
        "reasoningNotes": "No generic one-time customer rule was selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4854",
    "opportunityName": "Indianapolis Power & Light - Residential Energy Incentives Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4854/indianapolis-power-and-light-residential-energy-incentives-program",
    "websiteUrl": "https://www.aesindiana.com/your-home",
    "applicationUrl": "https://www.aesindiana.com/home-improvement-rebates",
    "administrator": "AES Indiana",
    "programType": "Residential Rebate",
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
          "IN"
        ],
        "counties": [],
        "cities": [
          "Indianapolis"
        ],
        "utilityTerritories": [
          "AES Indiana residential electric service territory"
        ],
        "notes": "Applies to eligible AES Indiana residential electric customers; legacy Indianapolis Power & Light branding is now AES Indiana."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "homeowner",
        "income_eligible_customer",
        "participating_quality_contractor"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "mini_split_heat_pump",
        "central_air_conditioner_replacement",
        "aeroseal_duct_sealing",
        "attic_insulation",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "energy_star_clothes_washer",
        "energy_star_electric_clothes_dryer",
        "energy_star_freezer",
        "variable_speed_pool_pump",
        "energy_audit",
        "income_eligible_weatherization",
        "energy_savings_kit",
        "small_appliance_instant_discount"
      ],
      "hardRequirements": [
        "Applicant must be an eligible AES Indiana residential electric customer.",
        "Contractor-installed home improvement rebates generally require an AES Indiana Quality Contractor Network contractor.",
        "Appliance and self-install rebates must follow purchase-date, application-deadline, model, and documentation requirements.",
        "Some measures require electric water heating, electric heat, income eligibility, or a specific residential program pathway."
      ],
      "blockers": [
        "Freezer and appliance rebates are residential products, not commercial refrigeration equipment.",
        "Clothes washer and dryer rebates are residential appliance rebates, not commercial laundry equipment.",
        "LED lighting should not be treated as a broad retrofit category; current support is through marketplace, kits, or instant-discount products rather than a building lighting retrofit.",
        "Energy assessments, kits, and income weatherization services should not be counted as physical retrofits unless a specific installed measure is identified."
      ],
      "programType": "Residential Rebate",
      "administrator": "AES Indiana",
      "applicationUrl": "https://www.aesindiana.com/home-improvement-rebates",
      "websiteUrl": "https://www.aesindiana.com/your-home",
      "sourceUrlsChecked": [
        "https://www.aesindiana.com/your-home",
        "https://www.aesindiana.com/appliance-rebates",
        "https://www.aesindiana.com/home-improvement-rebates",
        "https://www.aesindiana.com/hea/"
      ],
      "evidenceText": "AES Indiana residential pages list rebates for heat pumps, mini-splits, central AC, duct sealing, attic insulation, HPWHs, smart thermostats, residential appliances, pool pumps, audits, and weatherization.",
      "reasoningNotes": "Updated administrator to AES Indiana and preserved supported residential measures. Blocked commercial refrigeration, commercial laundry, and broad LED retrofit matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "AES Indiana page says home improvement rebates and discounts are available, but no whole-building per-kWh formula was verified.",
        "sourceUrlsChecked": [
          "https://www.aesindiana.com/your-home"
        ],
        "reasoningNotes": "No calculable rule was found.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4581",
    "opportunityName": "Energy Smart - Commercial and Industrial Energy Efficiency Rebate Program (17 Municipalities)",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4581/energy-smart-commercial-and-industrial-energy-efficiency-rebate-program-17-municipalities",
    "websiteUrl": "https://mienergysmart.com/cities/",
    "applicationUrl": "https://mienergysmart.com/commercial-industrial-program",
    "administrator": "Franklin Energy",
    "programType": "Commercial Industrial Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 9,
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
          "hvac controls"
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
          "MI"
        ],
        "counties": [],
        "cities": [
          "Bay City",
          "Charlevoix",
          "Chelsea",
          "Eaton Rapids",
          "Escanaba",
          "Harbor Springs",
          "Hart",
          "Lowell",
          "Niles",
          "Paw Paw",
          "Petoskey",
          "Portland",
          "Sebewaing",
          "South Haven",
          "St. Louis",
          "Sturgis",
          "Wyandotte",
          "Zeeland"
        ],
        "utilityTerritories": [
          "Participating Michigan Energy Smart municipal electric utilities"
        ],
        "notes": "Current Energy Smart site lists 18 participating municipal utility communities; DSIRE name referencing 17 municipalities appears outdated."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "municipal_utility_business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "municipal"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "control_systems_retrofit",
        "hvac_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "compressed_air_system_optimization",
        "mechanical_systems_efficiency",
        "variable_frequency_drive_retrofit",
        "commercial_kitchen_foodservice_equipment",
        "new_construction_energy_efficiency",
        "custom_energy_efficiency_project",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a business customer of a participating Energy Smart municipal utility.",
        "Commercial and industrial measures must follow the applicable city-specific application, program year, and pre-approval rules.",
        "Custom projects require program review and qualifying energy savings.",
        "EV charger rebates are on a separate Energy Smart EV charger pathway and should not be merged into ordinary C&I efficiency matching without that boundary."
      ],
      "blockers": [
        "Energy audits are not listed as a supported current rebate category for this C&I opportunity.",
        "Refrigeration was not verified on the current Energy Smart C&I pages checked; only keep if a city-specific current application supports it.",
        "EV charging is a separate Energy Smart page and must be matched as that separate pathway.",
        "Do not match residential measures to this commercial and industrial program."
      ],
      "programType": "Commercial Industrial Rebate",
      "administrator": "Franklin Energy",
      "applicationUrl": "https://mienergysmart.com/commercial-industrial-program",
      "websiteUrl": "https://mienergysmart.com/cities/",
      "sourceUrlsChecked": [
        "https://mienergysmart.com/",
        "https://mienergysmart.com/cities/",
        "https://mienergysmart.com/commercial-industrial-program",
        "https://mienergysmart.com/ev-chargers",
        "https://mienergysmart.com/bay-city"
      ],
      "evidenceText": "Energy Smart current pages list participating municipal cities and C&I incentives for lighting, controls, compressed air, mechanical systems, commercial kitchen, new construction, custom projects, and EV chargers.",
      "reasoningNotes": "Updated geography to the current 18-city list. Kept C&I categories supported by current Energy Smart pages and marked EV charging as a separate pathway."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Energy Smart lists business rebate contact paths but no single current C&I formula was verified.",
        "sourceUrlsChecked": [
          "https://mienergysmart.com/cities/"
        ],
        "reasoningNotes": "Target spans too many measures for a single rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2532",
    "opportunityName": "Blooming Prairie Public Utilities - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2532/blooming-prairie-public-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/blooming-prairie",
    "applicationUrl": null,
    "administrator": "Blooming Prairie Public Utilities / Southern Minnesota Municipal Power Agency",
    "programType": "Residential Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
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
          "MN"
        ],
        "counties": [],
        "cities": [
          "Blooming Prairie"
        ],
        "utilityTerritories": [
          "Blooming Prairie Public Utilities electric service territory"
        ],
        "notes": "Member-specific SMMPA residential rebates for Blooming Prairie Public Utilities customers."
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
        "ecm_circulator_pump",
        "furnace_fan_motor",
        "pool_pump",
        "aerosol_duct_sealing",
        "battery_powered_outdoor_equipment",
        "e_bike"
      ],
      "hardRequirements": [
        "Applicant must be a Blooming Prairie Public Utilities residential customer.",
        "Use current 2026 Blooming Prairie residential forms for exact product qualifications, amounts, purchase dates, and documentation.",
        "ENERGY STAR product and EV charger measures must satisfy the current member-specific forms."
      ],
      "blockers": [
        "Commercial refrigeration, foodservice, VFDs, motors, compressed air, commercial lighting, geothermal heat pumps, and retrocommissioning appear under separate business rebates and should not match this residential record.",
        "Furnace language is limited to a furnace fan motor form, not a furnace replacement rebate.",
        "Ground-source heat pumps and heat pump programmable thermostats were visible only in the business rebate list checked.",
        "Google Drive form text was not readable in the browser, so categories remain limited to visible official page headings."
      ],
      "programType": "Residential Rebate Program",
      "administrator": "Blooming Prairie Public Utilities / Southern Minnesota Municipal Power Agency",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/blooming-prairie",
      "sourceUrlsChecked": [
        "https://smmpa.com/members/blooming-prairie",
        "https://smmpa.com/energy-efficiency"
      ],
      "evidenceText": "The Blooming Prairie SMMPA page lists 2026 residential forms for ENERGY STAR products, EV chargers, cooling equipment, cooling tune-ups, ECM circulator pumps, furnace fan motors, pool pumps and aerosol sealing.",
      "reasoningNotes": "Separated Blooming Prairie residential forms from the business rebate section on the same page and removed commercial and industrial false positives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "SMMPA/Blooming Prairie page lists many 2026 rebate forms but no whole-building per-kWh formula.",
        "sourceUrlsChecked": [
          "https://smmpa.com/members/blooming-prairie"
        ],
        "reasoningNotes": "Target is broad whole-building custom efficiency; measure-specific selection is needed.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1522",
    "opportunityName": "Minnesota Power - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1522/minnesota-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.mnpower.com/ProgramsRebates/RebatesAndSavings",
    "applicationUrl": "https://www.mnpower.com/rebates",
    "administrator": "Minnesota Power",
    "programType": "Residential Rebate And Energy Analysis Program",
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Minnesota Power"
        ],
        "notes": "Restricted to Minnesota Power residential electric customers in the utility service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_refrigerator_freezer_rebate",
        "residential_refrigerator_freezer_recycling",
        "residential_clothes_washer",
        "residential_dishwasher",
        "heat_pump_clothes_dryer",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "cold_climate_air_source_heat_pump",
        "air_to_water_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "window_replacement",
        "energy_recovery_ventilator",
        "ecm_circulator_pump",
        "energy_audit"
      ],
      "hardRequirements": [
        "Applicant must be a Minnesota Power residential customer.",
        "HVAC rebates require a participating contractor where stated.",
        "Clothes washer and dishwasher rebates require an electric water heater.",
        "Window rebates require qualifying ENERGY STAR windows and electricity as the primary heat source.",
        "Online rebate application availability may change; current utility instructions and invoices are required."
      ],
      "blockers": [
        "Residential appliance rebates do not support commercial dishwasher, commercial refrigeration, or commercial laundry matches.",
        "Heat recovery means residential ERV or HRV and desuperheater measures, not industrial waste heat recovery.",
        "Business, solar, EV, and commercial measures are separate Minnesota Power sections and should not be matched to this residential opportunity.",
        "No current residential LED lighting rebate was verified on the official residential rebate page."
      ],
      "programType": "Residential Rebate And Energy Analysis Program",
      "administrator": "Minnesota Power",
      "applicationUrl": "https://www.mnpower.com/rebates",
      "websiteUrl": "https://www.mnpower.com/ProgramsRebates/RebatesAndSavings",
      "sourceUrlsChecked": [
        "https://www.mnpower.com/rebates",
        "https://www.mnpower.com/ProgramsRebates/RebatesAndSavings"
      ],
      "evidenceText": "Minnesota Power lists residential appliances, heat pumps, ground-source heat pumps, heat pump water heaters, thermostats, windows, ventilation, and energy analysis rebates.",
      "reasoningNotes": "The match must be repaired to residential product-specific appliances and HVAC. Commercial kitchen, refrigeration, LED lighting, and industrial waste heat recovery are false positives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Minnesota Power residential pages contain HPWH and GSHP rebates, but the target is broad whole-building efficiency.",
        "sourceUrlsChecked": [
          "https://www.mnpower.com/ProgramsRebates/RebatesAndSavings",
          "https://www.mnpower.com/ProgramsRebates/WaterHeaterRebate",
          "https://www.mnpower.com/ProgramsRebates/GSHPIncentivePackage"
        ],
        "reasoningNotes": "A later pass should select between HPWH, ground-source heat pump, appliance and other measures.",
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
