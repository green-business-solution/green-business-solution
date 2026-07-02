You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 33
Targets in this prompt: 641-660 of 984
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
  "batchNumber": 33,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2587"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2680",
    "opportunityName": "Residential Rental Property Rebate Program",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2680/residential-rental-property-rebate-program",
    "websiteUrl": "https://www.efficiencyvermont.com/rebates/list?cat=&hvacfilter=&type=rental",
    "applicationUrl": null,
    "administrator": "Efficiency Vermont",
    "programType": "Rebate Program",
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
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
        "notes": "Efficiency Vermont generally serves Vermont customers outside Burlington Electric Department territory. Rental-property offer eligibility varies by measure, owner, renter, and income qualification."
      },
      "eligibleApplicantTypes": [
        "rental_property_owner",
        "landlord",
        "renter",
        "income_qualified_resident",
        "multifamily_property_owner"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential",
        "rental_housing"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "home_performance_weatherization",
        "ducted_heat_pump",
        "ductless_mini_split_heat_pump",
        "air_to_water_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "high_efficiency_laundry_equipment",
        "energy_star_refrigerator",
        "energy_star_freezer",
        "bath_fan",
        "air_purifier",
        "building_performance_custom",
        "rental_energy_consultation",
        "window_air_conditioner"
      ],
      "hardRequirements": [
        "Measure must be listed under the current Efficiency Vermont rental-property rebate filter or the applicable rental owner or renter offer.",
        "Applicant must satisfy the owner, renter, income-qualified, multifamily, or building-performance eligibility rules for the chosen offer.",
        "Products and projects must meet Efficiency Vermont specifications and application timing requirements.",
        "Partner programs and currently unavailable free-product offers should not be treated as active rebates unless reopened."
      ],
      "blockers": [
        "Window replacement was a false positive; the current rental list shows window air conditioners, not replacement windows.",
        "Low-flow fixture retrofit should not be matched from the current rental list because free renter products were shown as unavailable or separate.",
        "Residential refrigerators and freezers should not be generalized into commercial refrigeration equipment.",
        "EV charging appears as a partner offer and should be treated as separate from this rental efficiency rebate list.",
        "Do not infer commercial or industrial measures from residential rental offers."
      ],
      "programType": "Rebate Program",
      "administrator": "Efficiency Vermont",
      "applicationUrl": null,
      "websiteUrl": "https://www.efficiencyvermont.com/rebates/list?cat=&hvacfilter=&type=rental",
      "sourceUrlsChecked": [
        "https://www.efficiencyvermont.com/rebates/list?cat=&hvacfilter=&type=rental",
        "https://www.efficiencyvermont.com/news-blog/news/efficiency-vermont-announces-2026-rebates-to-help-vermonters-achieve-their-home-energy-goals-in-the-new-year"
      ],
      "evidenceText": "The]( current rental-property rebate list includes weatherization, home performance, ducted and ductless heat pumps, air-to-water and ground-source heat pumps, heat pump water heaters, appliances, smart thermostats, bath fans, air purifiers, consultations, and window air conditioners.",
      "reasoningNotes": "Most original matches are supported, but window replacement and low-flow fixtures should be removed or blocked because the current rental list does not support them as active retrofit categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Efficiency Vermont rental rebate page was inaccessible, and matched terms span heat pumps, weatherization, windows and washers.",
        "sourceUrlsChecked": [
          "https://www.efficiencyvermont.com/rebates/list?cat=&hvacfilter=&type=rental"
        ],
        "reasoningNotes": "No current official measure amount was verified for the rental-property target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2041",
    "opportunityName": "Cedarburg Light & Water Utility - Residential Energy Efficiency Rebate Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2041/cedarburg-light-and-water-utility-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://focusonenergy.com/utility-partners/cedarburg-light-amp-water",
    "applicationUrl": "https://focusonenergy.com/residential-rebates-and-discounts",
    "administrator": "Focus on Energy / Cedarburg Light & Water Utility",
    "programType": "Rebate/Discount Program",
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
          "WI"
        ],
        "counties": [
          "Ozaukee County"
        ],
        "cities": [
          "Cedarburg"
        ],
        "utilityTerritories": [
          "Cedarburg Light & Water",
          "Focus on Energy participating Wisconsin utility territories"
        ],
        "notes": "Cedarburg Light & Water is listed as a participating Focus on Energy utility; eligibility depends on Focus on Energy participating utility service and measure rules."
      },
      "eligibleApplicantTypes": [
        "Cedarburg Light & Water residential customers",
        "Focus on Energy participating utility residential customers",
        "homeowners",
        "residential account holders",
        "residential customers using qualified trade allies where required"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential_limited"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "geothermal_ground_source_heat_pump",
        "smart_thermostat",
        "heat_pump_water_heater",
        "insulation",
        "air_sealing",
        "diy_attic_insulation_air_sealing",
        "home_energy_assessment",
        "free_energy_saving_packs_limited",
        "online_marketplace_led_lighting_limited",
        "ecm_furnace_blower_motor_replacement",
        "ecm_variable_speed_pumps"
      ],
      "hardRequirements": [
        "Customer must be served by Cedarburg Light & Water or another Focus on Energy participating utility for applicable incentives.",
        "Measures must meet Focus on Energy residential rebate and product eligibility rules.",
        "Many HVAC, water-heating, insulation and air-sealing incentives require a qualified trade ally, eligible equipment and current application timing.",
        "Current 2026 Focus materials require some applications within 60 days of installation and no later than the stated 2026 program deadline.",
        "Instant discounts and marketplace offers require purchase through eligible participating channels."
      ],
      "blockers": [
        "The imported motor, VFD, pump or compressed-air mapping is not valid for this residential Focus on Energy record; only residential ECM blower or variable-speed pump categories were retained where supported.",
        "Duct sealing was not retained because the current Focus residential sources checked did not verify a standalone duct-sealing rebate for this record.",
        "LED lighting support is limited to Focus marketplace or pack/product channels, not a broad residential lighting retrofit project.",
        "This residential program should not be matched to commercial or industrial Focus on Energy measures.",
        "Solar, new homes and business programs on the Focus website are separate paths and were not merged into this repair."
      ],
      "programType": "Rebate/Discount Program",
      "administrator": "Focus on Energy / Cedarburg Light & Water Utility",
      "applicationUrl": "https://focusonenergy.com/residential-rebates-and-discounts",
      "websiteUrl": "https://focusonenergy.com/utility-partners/cedarburg-light-amp-water",
      "sourceUrlsChecked": [
        "https://focusonenergy.com/utility-partners/cedarburg-light-amp-water",
        "https://focusonenergy.com/about/participating-utilities",
        "https://focusonenergy.com/residential",
        "https://focusonenergy.com/residential-rebates-and-discounts",
        "https://focusonenergy.com/residential/heating-and-cooling",
        "https://focusonenergy.com/residential/water-heating",
        "https://focusonenergy.com/residential/insulation-and-air-sealing",
        "https://www.cedarburglightandwater.org/energy-saving-programs",
        "https://programs.dsireusa.org/system/program/detail/2041/cedarburg-light-and-water-utility-residential-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Focus on Energy's Cedarburg Light & Water partner page says Focus partners with the utility to deliver savings for residents and businesses. Current residential Focus pages list home assessments, heating and cooling incentives, smart thermostats, heat pump water heaters, insulation and air sealing, free energy-saving packs and marketplace products, with current 2026 application and timing rules for several measures.",
      "reasoningNotes": "The opportunity remains active through Focus on Energy. Categories were narrowed to residential Focus measures and the false commercial motor/VFD interpretation was blocked."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "GPT Pro found a Focus on Energy smart-thermostat amount, but this target is mapped to motor/VFD efficiency.",
        "sourceUrlsChecked": [
          "https://focusonenergy.com/residential/smart-thermostats",
          "https://www.cedarburglightandwater.org/rebates/"
        ],
        "reasoningNotes": "Do not import a thermostat rule for a motor/VFD target.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3194",
    "opportunityName": "Eau Claire Energy Cooperative - Residential Energy Efficiency Rebate Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3194/eau-claire-energy-cooperative-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.ecec.com/energy-efficiency/save_energy_and_money",
    "applicationUrl": null,
    "administrator": "Eau Claire Energy Cooperative",
    "programType": "Rebate Program",
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
          "Eau Claire Energy Cooperative"
        ],
        "notes": "Equipment must be connected to Eau Claire Energy Cooperative lines; some forms also cover farm, commercial, industrial, institutional and government members."
      },
      "eligibleApplicantTypes": [
        "residential_member",
        "farm_member",
        "commercial_member",
        "industrial_member",
        "institutional_member",
        "government_member"
      ],
      "eligibleSectors": [
        "residential",
        "agricultural",
        "commercial",
        "industrial",
        "institutional",
        "government"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "efficient_ecm_furnace_blower",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "residential_appliance_rebate",
        "led_lighting_retrofit",
        "lighting_controls_retrofit"
      ],
      "hardRequirements": [
        "Member must receive electric service from Eau Claire Energy Cooperative for the rebated equipment.",
        "2026 incentive forms require purchase and installation documentation and generally require submission within three months.",
        "HVAC rebates require AHRI/model documentation and equipment efficiency thresholds.",
        "Home performance incentives require an in-home evaluation by a qualified consultant, implementation within the allowed period and post-testing.",
        "Lighting incentives are capped and apply to qualifying LEDs, LED exit signs, LED fixtures and occupancy sensors."
      ],
      "blockers": [
        "Low-flow fixture or broad plumbing retrofits are not supported by the current ECEC incentive forms checked.",
        "High-efficiency furnace matching should be limited to the efficient ECM furnace blower measure, not a broad gas-furnace efficiency rebate.",
        "Residential appliance rebates do not imply commercial kitchen or refrigeration equipment unless a business-specific form independently qualifies the equipment.",
        "Load-control rules may apply to certain electric water-heater measures."
      ],
      "programType": "Rebate Program",
      "administrator": "Eau Claire Energy Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.ecec.com/energy-efficiency/save_energy_and_money",
      "sourceUrlsChecked": [
        "https://www.ecec.com/energy-efficiency/save_energy_and_money",
        "https://documents.ecec.com/documents/incentives/appliances/Incentive_Appliances.pdf",
        "https://documents.ecec.com/documents/incentives/appliances/Incentive_Water_Heater.pdf",
        "https://documents.ecec.com/documents/incentives/home-performance/Incentive_HPE_Implementation.pdf",
        "https://documents.ecec.com/documents/incentives/lighting/Incentive_Lighting.pdf",
        "https://documents.ecec.com/documents/incentives/heating-and-cooling/Incentive_HVAC.pdf",
        "https://documents.ecec.com/newsroom/bill_inserts/202602Cash%20in%20on%202026%20Incentives.pdf"
      ],
      "evidenceText": "ECEC’s]( current incentive forms cover heat pumps, geothermal, heat-pump water heaters, ECM furnace blowers, home-performance weatherization, appliances, LED fixtures and occupancy sensors.",
      "reasoningNotes": "Official 2026 ECEC forms support the retained categories. The water-fixture match was a false positive and furnace matching was narrowed to the listed ECM blower measure."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official page lists broad appliance, lighting, heating/cooling and equipment categories.",
        "sourceUrlsChecked": [
          "https://www.ecec.com/energy-efficiency/save_energy_and_money"
        ],
        "reasoningNotes": "The target is whole-building custom efficiency; no reusable per-kWh formula was found.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5494",
    "opportunityName": "Entergy Arkansas - Small Business Energy Efficiency Programs",
    "state": "AR",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5494/entergy-arkansas-small-business-energy-efficiency-programs",
    "websiteUrl": "https://www.entergyarkansas.com/energyefficiency/business/small-business",
    "applicationUrl": null,
    "administrator": "Entergy Arkansas",
    "programType": "Small Business Incentive/Rebate Program",
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
          "duct sealing"
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
          "AR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Entergy Arkansas"
        ],
        "notes": "Available to qualifying Entergy Arkansas small-business electric customers in the utility service territory."
      },
      "eligibleApplicantTypes": [
        "small_business",
        "commercial_customer"
      ],
      "eligibleSectors": [
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "high_efficiency_refrigeration_equipment",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "window_film",
        "smart_thermostat_zoning_retrofit",
        "retro_commissioning_lite",
        "commercial_kitchen_pre_rinse_spray_valve",
        "low_flow_faucet_aerator",
        "low_flow_showerhead"
      ],
      "hardRequirements": [
        "Customer must be a current Entergy Arkansas small-business customer.",
        "Peak demand must be below the program threshold.",
        "Measures must follow the Small Business Program Manual and applicable measure matrix.",
        "Some measures are limited by building type, electric water heating, savings caps or direct-install delivery."
      ],
      "blockers": [
        "Duct sealing and ceiling insulation are limited to converted residences and should not match all small businesses.",
        "Pre-rinse spray valves, faucet aerators and showerheads are product-specific direct installs, not broad plumbing retrofit categories.",
        "Mission-based offerings exclude religious facilities.",
        "Do not infer residential-only appliances or whole-home weatherization outside the small-business manual."
      ],
      "programType": "Small Business Incentive/Rebate Program",
      "administrator": "Entergy Arkansas",
      "applicationUrl": null,
      "websiteUrl": "https://www.entergyarkansas.com/energyefficiency/business/small-business",
      "sourceUrlsChecked": [
        "https://www.entergyarkansas.com/energyefficiency/business/small-business",
        "https://www.entergyarkansas.com/wp-content/uploads/2025/06/Small_Business_Program_Manual.pdf",
        "https://programs.dsireusa.org/system/program/detail/5494/entergy-arkansas-small-business-energy-efficiency-programs"
      ],
      "evidenceText": "Entergy]( Arkansas small-business program is for current small-business customers under 100 kW and lists lighting, controls, HVAC, refrigeration, converted-residence duct sealing and insulation, direct installs, Wi-Fi thermostats and RCx lite.",
      "reasoningNotes": "The lighting, HVAC, refrigeration and controls matches are correct. Envelope and plumbing-like measures require strong narrowing because the official manual restricts them to specific building or direct-install cases."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Entergy Arkansas small business page describes cash incentives but did not publish a refrigeration formula.",
        "sourceUrlsChecked": [
          "http://www.entergyarkansas.com/smallbusiness",
          "https://www.entergyarkansas.com/energyefficiency/business"
        ],
        "reasoningNotes": "No source-backed per-unit refrigeration or controls rule was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1630",
    "opportunityName": "Burbank Water & Power - Energy Solutions Business Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1630/burbank-water-and-power-energy-solutions-business-rebate-program",
    "websiteUrl": "https://www.burbankwaterandpower.com/business-rebates",
    "applicationUrl": null,
    "administrator": "Burbank Water and Power",
    "programType": "Business Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "CA"
        ],
        "counties": [],
        "cities": [
          "Burbank"
        ],
        "utilityTerritories": [
          "Burbank Water and Power electric service territory"
        ],
        "notes": "Limited to Burbank Water and Power business customers making qualifying energy-efficiency retrofits."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business_customer",
        "nonprofit_customer",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "commercial_hvac_equipment",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_fuel_substitution",
        "package_terminal_heat_pump",
        "commercial_refrigeration_equipment",
        "high_efficiency_commercial_dishwasher",
        "efficient_electric_commercial_fryer",
        "custom_electric_energy_efficiency_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Burbank Water and Power business customer.",
        "Catalog rebates are capped by eligible project cost.",
        "Custom rebates require qualifying electric energy savings and program approval."
      ],
      "blockers": [
        "Do not match battery storage; BWP battery storage is a separate solar-paired program.",
        "Do not match low-flow plumbing fixtures in this energy rebate record.",
        "Do not match thermal energy storage unless a current custom or catalog measure explicitly approves it."
      ],
      "programType": "Business Rebate Program",
      "administrator": "Burbank Water and Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.burbankwaterandpower.com/business-rebates",
      "sourceUrlsChecked": [
        "https://www.burbankwaterandpower.com/business-rebates",
        "https://www.burbankwaterandpower.com/commercial-rebates-and-incentives",
        "https://www.burbankwaterandpower.com/battery-storage-program"
      ],
      "evidenceText": "BWP's business rebate catalog covers foodservice, HVAC, heat-pump fuel substitution, lighting, refrigeration, and custom electric-efficiency measures; battery storage and plumbing fixtures are listed separately.",
      "reasoningNotes": "Preserve business lighting, HVAC, heat pump, foodservice, refrigeration, and custom electric measures. Remove storage and low-flow fixture matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "BWP business rebates are split between catalog and custom rebates, but current formulas were not verified.",
        "sourceUrlsChecked": [
          "https://www.burbankwaterandpower.com/business-rebates"
        ],
        "reasoningNotes": "Target includes storage and thermal measures; no direct storage formula found.",
        "originalGapReason": "source_text_unavailable",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1902",
    "opportunityName": "Roseville Electric - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1902/roseville-electric-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.roseville.ca.gov/electric_utility/rebates_and_energy_savings/index.php",
    "applicationUrl": null,
    "administrator": "Roseville Electric Utility",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "CA"
        ],
        "counties": [
          "Placer"
        ],
        "cities": [
          "Roseville"
        ],
        "utilityTerritories": [
          "Roseville Electric Utility service territory"
        ],
        "notes": "The DSIRE website URL is stale and returns a missing page, but Roseville Electric publishes a current replacement rebates and energy savings page."
      },
      "eligibleApplicantTypes": [
        "Roseville Electric residential customers",
        "homeowners",
        "residential property owners",
        "income-qualified residential customers where applicable",
        "residential EV charger customers"
      ],
      "eligibleSectors": [
        "residential",
        "income-qualified residential",
        "transportation electrification"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_laundry_equipment",
        "induction_cooking_equipment",
        "efficient_pump_replacement",
        "electric_panel_upgrade",
        "ev_charger_installation",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must receive residential electric service from Roseville Electric Utility.",
        "Equipment must be new qualifying equipment and meet the applicable Roseville Electric rebate specifications.",
        "EV charger rebates require qualifying new Level 2 equipment, installation at a residential dwelling served by Roseville Electric, and compliance with installation and documentation requirements.",
        "Residential rebate applications are subject to program budget availability, invoice documentation, and postmark or purchase-date requirements.",
        "Income-qualified EV charger or equipment pathways require income-qualified eligibility where claimed."
      ],
      "blockers": [
        "The old DSIRE-linked Roseville rebate URL is stale; use the current Roseville Electric rebates and energy savings replacement page.",
        "smart_thermostat_zoning_retrofit should not be matched as an upfront equipment rebate from the current reviewed sources; PowerFlex or thermostat rewards are demand-response/bill-credit pathways.",
        "high_efficiency_hvac_replacement is too broad; current support is heat-pump or HVAC tune-up specific.",
        "Solar, commercial rebates, and PowerFlex demand response appear as separate programs and should not be conflated with this residential equipment rebate set.",
        "EV charging is residential Level 2 only; do not match DC fast charging or commercial charging."
      ],
      "programType": "Rebate Program",
      "administrator": "Roseville Electric Utility",
      "applicationUrl": null,
      "websiteUrl": "https://www.roseville.ca.gov/electric_utility/rebates_and_energy_savings/index.php",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/1902/roseville-electric-residential-energy-efficiency-rebate-program",
        "https://www.roseville.ca.us/cms/One.aspx?portalId=7964922&pageId=20438359",
        "https://www.roseville.ca.gov/electric_utility/rebates_and_energy_savings/index.php",
        "https://www.roseville.ca.gov/electric_utility/rebates_and_energy_savings/electric_vehicles_ev.php",
        "https://www.thermostatrewards.com/roseville/"
      ],
      "evidenceText": "Roseville Electric's current rebates and energy savings page lists residential rebates for HVAC heat pumps, heat pump dryers, heat pump water heaters, induction stoves, panel replacement, pool pumps, and EV charging, with a separate EV page describing Level 2 residential charger requirements.",
      "reasoningNotes": "The record remains active through a replacement official source. The repair keeps current residential electrification and Level 2 EV charger categories while blocking stale-page, demand-response, and broad HVAC false positives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Roseville residential EV charger or Level 2 incentive amount was not verified from current official source text.",
        "sourceUrlsChecked": [
          "https://www.roseville.ca.us/government/departments/electric_utility/residential/rebates",
          "https://programs.dsireusa.org/system/program/detail/1902"
        ],
        "reasoningNotes": "Do not use third-party or DSIRE-only EV amounts as final proof.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22718",
    "opportunityName": "Colorado - Home Electrification and Appliance Rebate (HEAR) Program",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22718/colorado-home-electrification-and-appliance-rebate-hear-program",
    "websiteUrl": "https://energyoffice.colorado.gov/home-energy-rebates",
    "applicationUrl": null,
    "administrator": "Colorado Energy Office",
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
        "retrofitTypeId": "process_electrification_equipment",
        "displayName": "Process electrification equipment",
        "parentCategory": "compressed_air_industrial",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "electrification equipment"
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
        "utilityTerritories": [],
        "notes": "As of July 1, 2026, current sources indicate Colorado HEAR Region 1 is closed and Region 2 is open only until August 1, 2026 or until funds are fully reserved."
      },
      "eligibleApplicantTypes": [
        "income_qualified_homeowner",
        "income_qualified_renter",
        "single_family_household",
        "multifamily_household"
      ],
      "eligibleSectors": [
        "residential",
        "income_qualified_residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "cold_climate_heat_pump",
        "ductless_heat_pump",
        "heat_pump_water_heater",
        "electric_panel_upgrade",
        "electrical_wiring_upgrade",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "ventilation_upgrade",
        "electric_cooking_appliance",
        "heat_pump_clothes_dryer"
      ],
      "hardRequirements": [
        "Household must meet HEAR income requirements, generally at or below 150 percent of area median income.",
        "Project must be in an eligible Colorado HEAR region with available funds.",
        "Work must use registered or participating contractors where required.",
        "Rebates are point-of-sale or reserved through program process, not post-hoc unrestricted rebates.",
        "Only existing residential home electrification and related shell measures are eligible."
      ],
      "blockers": [
        "Do not match high_efficiency_oven as commercial kitchen equipment; supported cooking measures are residential electric stove, cooktop, range or oven appliances.",
        "Do not match process_electrification_equipment; this is not an industrial process electrification program.",
        "Do not match Region 1 projects after its closure unless official reopening is verified.",
        "Do not match projects after August 1, 2026 or after funds are reserved unless official sources show continued availability."
      ],
      "programType": "Rebate Program",
      "administrator": "Colorado Energy Office",
      "applicationUrl": null,
      "websiteUrl": "https://energyoffice.colorado.gov/home-energy-rebates",
      "sourceUrlsChecked": [
        "https://energyoffice.colorado.gov/home-energy-rebates",
        "https://content.govdelivery.com/accounts/USDOESCEP/bulletins/3bf14ad",
        "https://www.swenergy.org/colorados-home-electrification-rebates-end-august-1-heres-how-to-apply/",
        "https://unicolorado.com/colorado-hear-rebates-2026/"
      ],
      "evidenceText": "Current Colorado HEAR sources show Region 1 closed and Region 2 open only until August 1, 2026 or until funds are reserved. Measures are residential electrification and shell upgrades for income-qualified households.",
      "reasoningNotes": "Official state page was not fully readable, so confidence is medium. DOE and current program implementation sources support the measure list and regional availability limits."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "Official Colorado Energy Office home energy rebates page returned HTTP 403 in source fetch.",
        "sourceUrlsChecked": [
          "https://energyoffice.colorado.gov/home-energy-rebates"
        ],
        "reasoningNotes": "No official measure table could be verified from accessible source text.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1581",
    "opportunityName": "Xcel Energy - Residential Energy Efficiency Rebate Programs",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1581/xcel-energy-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://co.my.xcelenergy.com/s/residential/home-rebates",
    "applicationUrl": null,
    "administrator": "Xcel Energy",
    "programType": "Residential Energy Efficiency Rebate Program",
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
          "CO"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Xcel Energy Colorado residential electric and natural gas service territory"
        ],
        "notes": "Limited to eligible Colorado residential Xcel Energy customers; individual measures may require electric or natural gas service."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_central_air_conditioning"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Colorado residential Xcel Energy customer.",
        "Measures must meet Xcel Energy equipment and documentation requirements.",
        "Insulation and air sealing rebates require eligible residential project conditions.",
        "Heat pump rebates require qualifying equipment and may vary by customer fuel and income status.",
        "Rebates are subject to program funding and current measure rules."
      ],
      "blockers": [
        "Commercial refrigeration is not eligible under this residential rebate program.",
        "Do not infer commercial, industrial, or food-service equipment from the residential home rebates page.",
        "Gas furnace and boiler rebates should not be matched unless confirmed in current Xcel rules for the specific program year.",
        "Separate renewable energy, EV, or demand response offers should not be merged into this record."
      ],
      "programType": "Residential Energy Efficiency Rebate Program",
      "administrator": "Xcel Energy",
      "applicationUrl": null,
      "websiteUrl": "https://co.my.xcelenergy.com/s/residential/home-rebates",
      "sourceUrlsChecked": [
        "https://co.my.xcelenergy.com/s/residential/home-rebates",
        "https://co.my.xcelenergy.com/s/residential/heating-cooling",
        "https://co.my.xcelenergy.com/s/residential/heating-cooling/heat-pumps",
        "https://co.my.xcelenergy.com/s/residential/home-rebates/insulation-air-sealing",
        "https://co.my.xcelenergy.com/s/residential/heating-cooling/residential-cooling-rebates"
      ],
      "evidenceText": "Xcel Colorado residential pages identify home rebates for heat pumps, heat pump water heaters, insulation, air sealing, and cooling equipment for residential customers.",
      "reasoningNotes": "The major correction is removal of commercial refrigeration. Xcel pages are partly dynamic, so confidence is medium, but current official pages support the residential envelope and heat pump categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Xcel Colorado residential rebates vary by heat pump, insulation, and weatherization pathway.",
        "sourceUrlsChecked": [
          "https://co.my.xcelenergy.com/s/residential/home-rebates",
          "https://programs.dsireusa.org/system/program/detail/1581"
        ],
        "reasoningNotes": "No current whole-building per-kWh rule or single matched measure amount was safely verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4145",
    "opportunityName": "Cedar Falls Utilities - Commercial Energy Efficiency Rebate Program",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4145/cedar-falls-utilities-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.cfu.net/save-energy/business-rebates/",
    "applicationUrl": null,
    "administrator": "Cedar Falls Utilities",
    "programType": "Commercial Energy Efficiency Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
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
          "IA"
        ],
        "counties": [],
        "cities": [
          "Cedar Falls"
        ],
        "utilityTerritories": [
          "Cedar Falls Utilities service territory"
        ],
        "notes": "Available to Cedar Falls Utilities commercial customers; measure eligibility depends on electric or gas service and rebate rules."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business_customer",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_water_heater",
        "high_efficiency_gas_water_heater",
        "high_efficiency_boiler_retrofit",
        "air_source_heat_pump",
        "dual_fuel_heat_pump_system",
        "ground_source_geothermal_heat_pump",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_hvac_replacement",
        "ductless_mini_split_heat_pump",
        "smart_thermostat_zoning_retrofit",
        "insulation_upgrade",
        "led_lighting_retrofit",
        "level_2_ev_charger_installation",
        "custom_energy_efficiency_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a CFU commercial customer.",
        "Custom projects require preapproval.",
        "Lighting projects must comply with disposal and recycling requirements for replaced fluorescent or HID equipment."
      ],
      "blockers": [
        "Do not infer residential-only appliance rebates into this commercial program.",
        "EV support is specifically listed as Level 2 EV charger or electric-vehicle community measures.",
        "Insulation categories should follow CFU's listed attic, sidewall, crawlspace, floor, duct, and rim-joist measures."
      ],
      "programType": "Commercial Energy Efficiency Rebate Program",
      "administrator": "Cedar Falls Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.cfu.net/save-energy/business-rebates/",
      "sourceUrlsChecked": [
        "https://www.cfu.net/save-energy/residential-business/business-services-rebates"
      ],
      "evidenceText": "CFU's business rebate page lists commercial water heating, boilers, heat pumps, furnaces, central A/C, ductless mini-splits, thermostats, insulation, LED lighting, Level 2 EV charging, and custom projects.",
      "reasoningNotes": "The target HVAC, geothermal, HPWH, furnace, insulation, and thermostat matches are supported; lighting and Level 2 EV charging are also current CFU business measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "CFU/Commercial programs point customers to custom business rebates and contact paths, but no reusable EV or HVAC formula was verified.",
        "sourceUrlsChecked": [
          "https://www.cfu.net/save-energy/residential-business/business-rebates"
        ],
        "reasoningNotes": "Target maps to fleet fuel replacement but official checked text did not provide a commercial EV charger amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3105",
    "opportunityName": "Indianola Municipal Utilities - Energy Efficiency Rebate Program",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3105/indianola-municipal-utilities-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.indianola.com/about/utility-programs/energy-efficiency/",
    "applicationUrl": null,
    "administrator": "Indianola Municipal Utilities",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
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
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "IA"
        ],
        "counties": [],
        "cities": [
          "Indianola"
        ],
        "utilityTerritories": [
          "Indianola Municipal Utilities electric service territory"
        ],
        "notes": "Program applies to Indianola Municipal Utilities customers; some measures distinguish residential, commercial, and MEAN-related offerings."
      },
      "eligibleApplicantTypes": [
        "residential_utility_customer",
        "commercial_utility_customer"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "high_efficiency_hvac_replacement",
        "high_efficiency_laundry_equipment",
        "residential_refrigerator_freezer",
        "appliance_recycling",
        "led_lighting_retrofit",
        "smart_thermostat_zoning_retrofit",
        "room_air_conditioner_rebate"
      ],
      "hardRequirements": [
        "Applicant must be an Indianola Municipal Utilities customer for applicable residential or commercial measures.",
        "Appliance and lighting measures require qualifying ENERGY STAR or listed eligible products where specified.",
        "Some measures are limited to residential customers; commercial lighting and selected HVAC measures are separate commercial offerings."
      ],
      "blockers": [
        "Commercial dishwasher is not supported by the current official IMU efficiency page.",
        "Residential refrigerators, freezers, and clothes washers should not be matched as commercial refrigeration or commercial laundry.",
        "Maintenance rebates for air conditioners, heat pumps, and geothermal equipment are service incentives, not new physical retrofits."
      ],
      "programType": "Rebate",
      "administrator": "Indianola Municipal Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.indianola.com/about/utility-programs/energy-efficiency/",
      "sourceUrlsChecked": [
        "https://www.indianola.com/about/utility-programs/energy-efficiency/",
        "https://www.indianola.com/news/save-money-and-energy-with-imu-rebates-2"
      ],
      "evidenceText": "The]( official IMU page lists 2026 residential appliance, HVAC, thermostat, lighting, and recycling rebates plus commercial lighting and selected heat pump/geothermal rebates.",
      "reasoningNotes": "Keep residential appliance and HVAC categories, but do not generalize them into commercial kitchen, commercial refrigeration, or broad water-efficiency matches."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Indianola/SMMPA page lists many 2026 residential rebate forms but no whole-building per-kWh formula.",
        "sourceUrlsChecked": [
          "https://smmpa.com/members/indianola"
        ],
        "reasoningNotes": "The target is whole-building custom efficiency; no reusable source-backed formula was found.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2410",
    "opportunityName": "Rocky Mountain Power - wattsmart Residential Efficiency Program",
    "state": "ID",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2410/rocky-mountain-power-wattsmart-residential-efficiency-program",
    "websiteUrl": "https://wattsmarthomes.com/",
    "applicationUrl": "https://wattsmarthomes.com/rebate-application/",
    "administrator": "Rocky Mountain Power / Wattsmart Homes",
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
          "Rocky Mountain Power Idaho residential electric service territory"
        ],
        "notes": "Applies to eligible Rocky Mountain Power residential customers in Idaho on approved residential rate schedules."
      },
      "eligibleApplicantTypes": [
        "Rocky Mountain Power Idaho residential electric customers",
        "homeowners",
        "landlords of qualifying residential rental properties",
        "manufactured-home owners where eligible",
        "multifamily property owners for eligible measures"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential_limited",
        "manufactured_home"
      ],
      "eligibleRetrofitCategories": [
        "air_source_heat_pump",
        "dual_fuel_heat_pump",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "duct_sealing",
        "duct_insulation",
        "air_sealing",
        "insulation",
        "windows_weatherization_limited",
        "central_air_conditioner_limited",
        "bathroom_exhaust_fan_limited",
        "all_in_one_heat_pump_washer_dryer_limited"
      ],
      "hardRequirements": [
        "Applicant must buy electricity from Rocky Mountain Power in Idaho on an approved residential schedule, including schedules listed in the current Idaho rebate pages.",
        "Many measures are limited to existing homes and are not available for new construction.",
        "Many measures must be installed by a program-participating contractor; do-it-yourself installations are not eligible where contractor installation is required.",
        "Applications generally must be submitted through the online portal within 90 days of completed installation or purchase.",
        "Heat pump water heater rebates require replacement of an electric storage water heater; gas water heater conversions do not qualify under the checked Idaho HPWH page.",
        "Equipment must satisfy the current Wattsmart Homes technical specifications and measure-specific eligibility criteria."
      ],
      "blockers": [
        "Matched geothermal or ground-source heat pump was not retained as a current eligible category because the current public Idaho rebate pages checked did not expose an active ground-source heat pump rebate line, even though older technical specifications include GSHP requirements.",
        "This is a residential program and should not be mapped to commercial refrigeration, motors, VFDs or business measures.",
        "Weatherization categories are retained only where the current Wattsmart source supports air sealing, duct sealing, duct insulation, insulation or windows, not as a general whole-building grant.",
        "Heat pump water heater support does not include gas-to-electric water heater conversions under the checked Idaho HPWH rules."
      ],
      "programType": "Rebate Program",
      "administrator": "Rocky Mountain Power / Wattsmart Homes",
      "applicationUrl": "https://wattsmarthomes.com/rebate-application/",
      "websiteUrl": "https://wattsmarthomes.com/",
      "sourceUrlsChecked": [
        "https://wattsmarthomes.com/",
        "https://wattsmarthomes.com/rebates/ductless-heat-pumps-id/",
        "https://wattsmarthomes.com/rebates/heat-pump-water-heaters-id/",
        "https://wattsmarthomes.com/rebate-categories/heating-and-cooling/",
        "https://wattsmarthomes.com/rebates/",
        "https://wattsmarthomes.com/wp-content/uploads/2022/10/id-technical-specifications-manual.pdf",
        "https://programs.dsireusa.org/system/program/detail/2410/rocky-mountain-power-wattsmart-residential-efficiency-program"
      ],
      "evidenceText": "Wattsmart Homes Idaho pages list active residential rebates for ductless heat pumps, heat pump water heaters and other heating/cooling and weatherization measures. The Idaho pages state customer eligibility by Rocky Mountain Power residential schedules, existing-home limits, participating-contractor requirements for many measures, and 90-day application timing. HPWH rules require replacement of an electric storage water heater and exclude gas conversions.",
      "reasoningNotes": "The record is active and residential. Current sources support heat pumps, ductless heat pumps, HPWH and weatherization, but geothermal was blocked because current public Idaho rebate availability was not verified from the checked pages."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Idaho residential Wattsmart materials did not verify a current refrigeration purchase rebate.",
        "sourceUrlsChecked": [
          "https://www.rockymountainpower.net/savings-energy-choices/home.html",
          "https://programs.dsireusa.org/system/program/detail/2410"
        ],
        "reasoningNotes": "Target is refrigeration; heat-pump or envelope incentives should not be substituted without matched official amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1549",
    "opportunityName": "Duke Energy -  Residential Efficiency Rebate Program",
    "state": "KY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1549/duke-energy-residential-efficiency-rebate-program",
    "websiteUrl": "https://www.duke-energy.com/home/products/smart-saver",
    "applicationUrl": null,
    "administrator": "Duke Energy Kentucky",
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "KY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Duke Energy Kentucky residential service territory"
        ],
        "notes": "Available to eligible Duke Energy Kentucky residential customers where current Smart Saver and Home Energy Improvement requirements are met."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "homeowner",
        "renter_with_required_property_approval"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "air_sealing_weatherization",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "duct_test_and_repair",
        "energy_audit",
        "hvac_tune_up",
        "window_replacement"
      ],
      "hardRequirements": [
        "Must be an eligible Duke Energy Kentucky residential customer.",
        "Some measures require a Duke-approved Home Energy Check or duct test recommendation before repair.",
        "Heat pump water heaters must meet current ENERGY STAR and efficiency requirements.",
        "HVAC and envelope measures must meet current program specifications and contractor or trade ally rules.",
        "Energy audit is a prerequisite or service, not a physical retrofit."
      ],
      "blockers": [
        "Do not match high_efficiency_hvac_replacement broadly; current support is for qualifying heat pump or specific HVAC efficiency measures.",
        "Do not treat energy_audit as a physical retrofit.",
        "Do not match commercial, industrial or multifamily programs from other Duke jurisdictions.",
        "Do not match heat pump water heaters that fail current ENERGY STAR or UEF requirements."
      ],
      "programType": "Rebate Program",
      "administrator": "Duke Energy Kentucky",
      "applicationUrl": null,
      "websiteUrl": "https://www.duke-energy.com/home/products/smart-saver",
      "sourceUrlsChecked": [
        "https://www.duke-energy.com/home/products/smart-saver",
        "https://www.duke-energy.com/home/products/home-energy-improvement/prerequisites",
        "https://www.duke-energy.com/home/products/home-energy-improvement/hvac-replacement",
        "https://www.duke-energy.com/home/products/home-energy-improvement/heat-pump-water-heater",
        "https://psc.ky.gov/tariffs/Electric/Duke%20Energy%20Kentucky/Cancelled%20Tariff%20Pages/2016/DSM-Residential%20Smart%20Saver%20Energy%20Efficient%20Residences%20Program/03-01.pdf"
      ],
      "evidenceText": "Duke’s current search snippets and Kentucky tariff materials support Smart Saver residential measures including heat pumps, HPWH, insulation, duct testing/repair, duct sealing and audit prerequisites, but Duke pages were browser-blocked.",
      "reasoningNotes": "Confidence is medium because official Duke pages were not fully readable, but multiple current Duke snippets plus Kentucky tariff materials support the repaired categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "source_inaccessible",
        "confidence": "low",
        "evidenceText": "Duke Energy residential Smart Saver pages require JavaScript and did not expose current Kentucky rebate tables.",
        "sourceUrlsChecked": [
          "https://www.duke-energy.com/home/products/smart-saver",
          "https://programs.dsireusa.org/system/program/detail/1549"
        ],
        "reasoningNotes": "Do not use DSIRE alone; official formula could not be verified in accessible text.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3488",
    "opportunityName": "Cape Light Compact - Commercial Energy Efficiency Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3488/cape-light-compact-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.capelightcompact.org/business-incentives/",
    "applicationUrl": null,
    "administrator": "Cape Light Compact and Mass Save",
    "programType": "Commercial Energy Efficiency Rebate Program",
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
          "Barnstable",
          "Dukes"
        ],
        "cities": [],
        "utilityTerritories": [
          "Cape Light Compact member electric customers"
        ],
        "notes": "Cape Light Compact serves Cape Cod and Martha's Vineyard as a Mass Save sponsor; eligibility depends on business energy use and measure pathway."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business_customer",
        "municipal_customer",
        "nonprofit_customer",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "municipal"
      ],
      "eligibleRetrofitCategories": [
        "insulation_upgrade",
        "air_sealing_weatherization",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "variable_refrigerant_flow_hvac",
        "high_efficiency_hvac_replacement",
        "chiller_replacement_or_optimization",
        "smart_thermostat_controls",
        "hvls_fans",
        "high_efficiency_refrigeration_equipment",
        "heat_pump_water_heater",
        "lighting_controls_retrofit",
        "led_lighting_retrofit",
        "custom_energy_efficiency_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a Cape Light Compact or Mass Save eligible non-residential customer.",
        "Many measures require an assessment, participating contractor, distributor, or preapproval.",
        "Custom measures must demonstrate qualifying energy savings."
      ],
      "blockers": [
        "Do not match residential appliances or single-family home rebates.",
        "Refrigeration matches must be limited to commercial refrigeration measures.",
        "Fan or blower matches should be limited to supported fan or HVLS measures."
      ],
      "programType": "Commercial Energy Efficiency Rebate Program",
      "administrator": "Cape Light Compact and Mass Save",
      "applicationUrl": null,
      "websiteUrl": "https://www.capelightcompact.org/business-incentives/",
      "sourceUrlsChecked": [
        "https://www.capelightcompact.org/commercial/",
        "https://www.capelightcompact.org/program/incentives-for-your-business/",
        "https://www.capelightcompact.org/program/heating-and-cooling/",
        "https://www.capelightcompact.org/program/foodservice-and-refrigeration/",
        "https://www.capelightcompact.org/program/water-heating-commercial/"
      ],
      "evidenceText": "Cape Light Compact commercial pages route businesses to Mass Save incentives for insulation and air sealing, heating and cooling, lighting and controls, foodservice and refrigeration, water heating, and custom measures.",
      "reasoningNotes": "Commercial building and equipment categories are supported, but residential appliance interpretations should be blocked."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Cape Light Compact commercial incentives are Mass Save measure/project-specific and no refrigeration formula was verified.",
        "sourceUrlsChecked": [
          "https://www.capelightcompact.org/business/",
          "https://www.masssave.com/business"
        ],
        "reasoningNotes": "Target is refrigeration; current Mass Save measure table needs extraction before a rule is safe.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4300",
    "opportunityName": "Consumers Energy (Gas) - Residential Energy Efficiency Program",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4300/consumers-energy-gas-residential-energy-efficiency-program",
    "websiteUrl": "https://www.consumersenergy.com/residential/save-money-and-energy/rebates",
    "applicationUrl": null,
    "administrator": "Consumers Energy",
    "programType": "Residential Natural Gas Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "Consumers Energy natural gas service territory"
        ],
        "notes": "Some current Consumers pages combine gas and electric rebates, so gas-only matching should be restricted."
      },
      "eligibleApplicantTypes": [
        "residential_gas_customer",
        "homeowner",
        "renter_with_account_or_owner_authorization"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_gas_water_heater",
        "hvac_tune_up",
        "insulation_upgrade",
        "window_replacement",
        "exterior_door_replacement",
        "smart_thermostat_zoning_retrofit",
        "water_pipe_insulation",
        "low_flow_showerhead",
        "faucet_aerator"
      ],
      "hardRequirements": [
        "Customer must be an eligible Consumers Energy residential customer receiving the service required by the measure.",
        "Heating and cooling equipment must meet current Consumers Energy efficiency and application requirements.",
        "Home Energy Analysis follow-up rebates require completion of the assessment pathway."
      ],
      "blockers": [
        "Do not match central air conditioners, electric heat pumps, EV chargers, or electric-only rebates to this gas-labeled opportunity.",
        "Window and door rebates are Home Energy Analysis follow-up measures, not a standalone remodeling rebate.",
        "Low-flow fixtures are limited to showerheads and faucet aerators through assessment pathways."
      ],
      "programType": "Residential Natural Gas Rebate Program",
      "administrator": "Consumers Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.consumersenergy.com/residential/save-money-and-energy/rebates",
      "sourceUrlsChecked": [
        "https://www.consumersenergy.com/residential/savings-and-clean-energy/rebates",
        "https://www.consumersenergy.com/residential/savings-and-clean-energy/rebates/heating-and-cooling",
        "https://www.consumersenergy.com/home-energy-analysis-rebates"
      ],
      "evidenceText": "Consumers Energy residential pages list furnace, boiler, water-heating, thermostat, tune-up, and Home Energy Analysis follow-up rebates for insulation, windows, doors, and in-home efficiency products.",
      "reasoningNotes": "Keep gas-related and assessment-related measures. Block electric-only HVAC and EV matches for the gas opportunity."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official rebates page lists categories but no whole-building per-kWh formula.",
        "sourceUrlsChecked": [
          "https://www.consumersenergy.com/residential/save-money-and-energy/rebates",
          "https://www.consumersenergy.com/residential/savings-and-clean-energy/rebates"
        ],
        "reasoningNotes": "The official page is measure-specific and does not publish a reusable per-kWh rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3947",
    "opportunityName": "Energy Smart - Residential Energy Efficiency Rebate Program (19 Municipalities)",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3947/energy-smart-residential-energy-efficiency-rebate-program-19-municipalities",
    "websiteUrl": "https://mienergysmart.com/residential-programs/",
    "applicationUrl": null,
    "administrator": "Franklin Energy",
    "programType": "Residential Rebate And Assessment Program",
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
          "mini split"
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
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "MI"
        ],
        "counties": [],
        "cities": [
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
          "Participating Michigan municipal utilities served by Energy Smart"
        ],
        "notes": "Current Energy Smart pages list participating cities and indicate that residential offerings vary by city application; Bay City appeared in navigation but the checked Bay City page showed business programs only."
      },
      "eligibleApplicantTypes": [
        "residential_municipal_utility_customer",
        "income_qualified_residential_customer",
        "homeowner",
        "renter_with_account_or_owner_authorization"
      ],
      "eligibleSectors": [
        "residential",
        "income_qualified_residential"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "residential_dehumidifier",
        "residential_refrigerator",
        "room_air_conditioner",
        "residential_clothes_washer",
        "electric_clothes_dryer",
        "smart_thermostat",
        "furnace_ecm",
        "portable_air_purifier",
        "residential_freezer",
        "heat_pump_water_heater",
        "intelligent_surge_protector",
        "weatherstripping"
      ],
      "hardRequirements": [
        "Customer must live in a participating Michigan municipal utility community and use the applicable city residential application.",
        "Rebated products must be qualifying ENERGY STAR or program-listed products where required.",
        "Level 2 home EV charger rebate requires a qualifying Wi-Fi connected model and managed charging enrollment where applicable."
      ],
      "blockers": [
        "Do not match mini-split or heat pump HVAC retrofits; current residential support is for heat pump water heaters, not HVAC heat pumps.",
        "Do not match broad insulation or weatherization; current residential sources support virtual assessments and possible weatherstripping, not insulation rebates.",
        "Do not match commercial refrigeration or commercial laundry."
      ],
      "programType": "Residential Rebate And Assessment Program",
      "administrator": "Franklin Energy",
      "applicationUrl": null,
      "websiteUrl": "https://mienergysmart.com/residential-programs/",
      "sourceUrlsChecked": [
        "https://mienergysmart.com/residential-programs/",
        "https://mienergysmart.com/ev-programs",
        "https://mienergysmart.com/ev-chargers",
        "https://mienergysmart.com/hart",
        "https://mienergysmart.com/wyandotte",
        "https://mienergysmart.com/zeeland",
        "https://mienergysmart.com/bay-city"
      ],
      "evidenceText": "Energy Smart's current residential page lists virtual assessments and rebates for ENERGY STAR appliances, thermostats, furnace ECMs, air purifiers, freezers, and heat pump water heaters; EV pages list a Level 2 home charger rebate.",
      "reasoningNotes": "The old municipality count appears stale. Repair to current city list and narrow heat-pump, weatherization, refrigeration, and laundry matches to product-specific residential measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official page describes participating cities, assessments and residential rebates, but no specific reusable formula was verified.",
        "sourceUrlsChecked": [
          "https://mienergysmart.com/residential-programs/"
        ],
        "reasoningNotes": "No single current measure amount was safely selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4754",
    "opportunityName": "Lansing Board of Water & Light - Hometown Energy Savers Commercial Rebates",
    "state": "MI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4754/lansing-board-of-water-and-light-hometown-energy-savers-commercial-rebates",
    "websiteUrl": "https://www.lbwl.com/customers/save-money-energy/commercial-industrial-incentives",
    "applicationUrl": "https://www.lbwl.com/customers/save-money-energy/receive-your-incentives",
    "administrator": "Lansing Board of Water & Light",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
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
        "cities": [
          "Lansing"
        ],
        "utilityTerritories": [
          "Lansing Board of Water & Light"
        ],
        "notes": "Available to qualifying commercial and industrial customers served by Lansing Board of Water & Light."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "business",
        "institution"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "compressed_air_leak_detection_and_repair",
        "compressed_air_system_energy_audit",
        "compressed_air_efficiency",
        "variable_frequency_drive_retrofit",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "hvac_controls_retrofit",
        "commercial_refrigeration_measures",
        "commercial_foodservice_equipment",
        "custom_energy_efficiency_measures"
      ],
      "hardRequirements": [
        "Customer must have a qualifying BWL commercial or industrial electric account.",
        "Applications must be submitted within the program’s deadline unless preapproval is required.",
        "Compressed-air leak detection, audit and repair measures require preapproval and documented leak repair.",
        "Custom, new construction and large incentive projects may require preapproval."
      ],
      "blockers": [
        "Leak detection is compressed-air-specific, not a water-efficiency leak detection system.",
        "Energy audit support is for compressed-air system audit with leak detection and repair, not a broad building energy audit rebate.",
        "Replacement of existing operational lighting sensors is not eligible as a controls retrofit.",
        "Do not infer residential measures from this commercial and industrial program."
      ],
      "programType": "Rebate Program",
      "administrator": "Lansing Board of Water & Light",
      "applicationUrl": "https://www.lbwl.com/customers/save-money-energy/receive-your-incentives",
      "websiteUrl": "https://www.lbwl.com/customers/save-money-energy/commercial-industrial-incentives",
      "sourceUrlsChecked": [
        "https://www.lbwl.com/customers/save-money-energy/commercial-industrial-incentives",
        "https://www.lbwl.com/customers/save-money-energy/receive-your-incentives",
        "https://www.lbwl.com/customers/save-money-energy/small-business-incentives",
        "https://www.lbwl.com/documents/compressed-air-application",
        "https://www.lbwl.com/documents/lighting-application",
        "https://www.lbwl.com/documents/non-lighting-application",
        "https://programs.dsireusa.org/system/program/detail/4754/lansing-board-of-water-and-light-hometown-energy-savers-commercial-rebates"
      ],
      "evidenceText": "BWL’s]( C&I pages and 2026 applications cover compressed air, lighting and controls, HVAC, VFDs, refrigeration, food service, industrial and custom measures; leak detection is compressed-air-specific.",
      "reasoningNotes": "Most original commercial and industrial matches are supported, but the water leak detection match is a false positive caused by compressed-air leak terminology."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "BWL commercial source did not expose exact compressed-air leak, refrigeration, or controls amounts in accessible text.",
        "sourceUrlsChecked": [
          "http://www.lbwl.com/EnergySavers",
          "https://www.lbwl.com/business"
        ],
        "reasoningNotes": "No source-backed motor/refrigeration rule was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3413",
    "opportunityName": "East Central Energy - Commercial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3413/east-central-energy-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.eastcentralenergy.com/rebates-commercial",
    "applicationUrl": null,
    "administrator": "East Central Energy",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 7,
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
          "dcv"
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
          "MN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "East Central Energy"
        ],
        "notes": "Available to East Central Energy business electric members in the utility service territory."
      },
      "eligibleApplicantTypes": [
        "business",
        "commercial_customer",
        "industrial_customer",
        "agricultural_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "ductless_mini_split_heat_pump",
        "high_efficiency_hvac_replacement",
        "economizer_hvac_retrofit",
        "high_efficiency_chiller",
        "ptac_pthp_replacement",
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "variable_frequency_drive_retrofit",
        "commercial_refrigeration_measures",
        "commercial_foodservice_equipment",
        "livestock_agricultural_efficiency",
        "compressed_air_efficiency"
      ],
      "hardRequirements": [
        "Applicant must be an East Central Energy business member.",
        "Equipment must meet the requirements in the current measure-specific form.",
        "Most rebates are capped at a percentage of project cost and may require invoices, specifications, and timely application.",
        "Some commercial EV charging and custom or non-prescriptive measures require preapproval."
      ],
      "blockers": [
        "Demand-controlled ventilation was not found in the current official 2026 HVAC form and should not match from old DSIRE text alone.",
        "EV charging support is for qualifying commercial Level 2 chargers; do not infer DC fast charging or pay-for-use public charging eligibility unless separately approved.",
        "VFD incentives are limited to qualifying new drive installations and measure-specific restrictions.",
        "Do not infer residential appliances or home weatherization from this commercial program."
      ],
      "programType": "Rebate Program",
      "administrator": "East Central Energy",
      "applicationUrl": null,
      "websiteUrl": "https://www.eastcentralenergy.com/rebates-commercial",
      "sourceUrlsChecked": [
        "https://www.eastcentralenergy.com/rebates-commercial",
        "https://www.eastcentralenergy.com/sites/default/files/documents/Business%20accounts/2026/2026%20Commercial%20EV%20Charging-FILLABLE.pdf",
        "https://www.eastcentralenergy.com/sites/default/files/documents/Business%20accounts/2026/2026%20Commercial%20Lighting-FiLLABLE.pdf",
        "https://www.eastcentralenergy.com/sites/default/files/documents/Business%20accounts/2026/2026%20Commercial%20Refrigeration-Fillable.pdf",
        "https://www.eastcentralenergy.com/sites/default/files/documents/Business%20accounts/2026/2026%20Motors%20and%20Drives-FILLABLE.pdf",
        "https://www.eastcentralenergy.com/sites/default/files/documents/Business%20accounts/2026/2026%20HVAC%20Rebate%20Program.pdf",
        "https://www.eastcentralenergy.com/sites/default/files/documents/Business%20accounts/2026/2026%20Commercial%20Food%20Service-FILLABLE.pdf"
      ],
      "evidenceText": "ECE’s]( 2026 commercial page and forms list business rebates for Level 2 EV charging, lighting and controls, HVAC heat pumps, ground-source heat pumps, ductless mini-splits, refrigeration, motors and drives, compressed air and food service.",
      "reasoningNotes": "The current official sources support most commercial HVAC, EV, lighting, refrigeration and VFD matches, but not the legacy demand-controlled ventilation match."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "ECE commercial rebate page lists categories and says custom projects should contact a business accounts specialist.",
        "sourceUrlsChecked": [
          "https://eastcentralenergy.com/rebates-commercial"
        ],
        "reasoningNotes": "No source-backed amount was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4740",
    "opportunityName": "MMPA - Residential Energy Efficiency Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4740/mmpa-residential-energy-efficiency-program",
    "websiteUrl": "https://www.mmpa.org/conservation/overview/",
    "applicationUrl": null,
    "administrator": "Minnesota Municipal Power Agency member municipal utilities",
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
          "Anoka",
          "Arlington",
          "Brownton",
          "Buffalo",
          "Chaska",
          "East Grand Forks",
          "Elk River",
          "Le Sueur",
          "North St. Paul",
          "Olivia",
          "Shakopee",
          "Winthrop"
        ],
        "utilityTerritories": [
          "Minnesota Municipal Power Agency member municipal utilities"
        ],
        "notes": "Programs are implemented through participating MMPA hometown municipal utilities and local forms."
      },
      "eligibleApplicantTypes": [
        "residential_customers"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "residential_energy_star_appliance_rebate",
        "residential_dishwasher",
        "residential_clothes_washer",
        "residential_refrigerator_freezer",
        "electric_clothes_dryer",
        "dehumidifier",
        "air_purifier",
        "led_lighting_retrofit",
        "ceiling_fan_light_kit",
        "central_air_conditioner",
        "air_source_heat_pump"
      ],
      "hardRequirements": [
        "Applicant must be a residential electric customer of a participating MMPA member utility.",
        "ENERGY STAR qualification applies to listed appliance categories where required by local forms.",
        "Rebate amount, deadlines, proof of purchase, and eligibility are controlled by the local municipal utility form."
      ],
      "blockers": [
        "Residential appliance rebates are not commercial dishwasher, commercial refrigeration, or commercial kitchen equipment rebates.",
        "No current official support was found for low-flow fixture retrofits under this residential electric program.",
        "Generic high-efficiency HVAC is too broad; current support is for central air conditioners and air-source heat pumps."
      ],
      "programType": "Rebate Program",
      "administrator": "Minnesota Municipal Power Agency member municipal utilities",
      "applicationUrl": null,
      "websiteUrl": "https://www.mmpa.org/conservation/overview/",
      "sourceUrlsChecked": [
        "https://www.mmpa.org/conservation/overview/",
        "https://www.mmpa.org/wp-content/uploads/2026/01/BUF_2026ESApplianceandRecycling_RebateForm.pdf"
      ],
      "evidenceText": "MMPA]( residential conservation materials list rebates for LED lighting, ceiling fans with light kits, ENERGY STAR household appliances, central air conditioners, air-source heat pumps, and appliance recycling.",
      "reasoningNotes": "The current match should be narrowed to residential appliances and residential electric HVAC measures; commercial foodservice and low-flow plumbing categories are false positives."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "MMPA/Efficiency Smart residential rebates include many measures; current refrigerator/freezer amounts were not safely selected.",
        "sourceUrlsChecked": [
          "https://www.efficiencysmart.org/home-energy-rebates",
          "https://www.mmpa.org/"
        ],
        "reasoningNotes": "Target maps to refrigeration; utility-specific current rebate table review is needed.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2585",
    "opportunityName": "Saint Peter Municipal Utilities - Commercial & Industrial Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2585/saint-peter-municipal-utilities-commercial-and-industrial-energy-efficiency-rebate-program",
    "websiteUrl": "https://smmpa.com/members/saint-peter",
    "applicationUrl": null,
    "administrator": "Saint Peter Municipal Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 7,
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
        "retrofitTypeId": "walk_in_cooler_freezer_upgrade",
        "displayName": "Walk-in cooler/freezer upgrade",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
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
          "Saint Peter"
        ],
        "utilityTerritories": [
          "Saint Peter Municipal Utilities",
          "Southern Minnesota Municipal Power Agency"
        ],
        "notes": "Applies to Saint Peter municipal electric utility business customers."
      },
      "eligibleApplicantTypes": [
        "business_electric_customer",
        "commercial_customer",
        "industrial_customer",
        "institutional_customer",
        "manufacturing_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "manufacturing"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "water_source_heat_pump",
        "high_efficiency_hvac_replacement",
        "hvac_controls_retrofit",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_retrofit",
        "vending_machine_controls",
        "commercial_foodservice_equipment",
        "variable_frequency_drive_retrofit",
        "motors_pumps_fans_drives",
        "compressed_air_system_upgrade",
        "retro_commissioning_study",
        "guestroom_energy_management",
        "aerosol_duct_sealing"
      ],
      "hardRequirements": [
        "Applicant must be a Saint Peter business electric customer.",
        "Customer must use current SMMPA or Saint Peter business rebate forms.",
        "Equipment must meet the applicable 2026 rebate form requirements.",
        "Rebates depend on documentation, installation date and available funds."
      ],
      "blockers": [
        "This commercial and industrial program should not match residential appliance or home weatherization opportunities.",
        "Detailed product-level refrigeration submeasures such as anti-sweat controls require confirmation from the current form because some form links are not fully readable.",
        "Do not infer non-electric or gas-only measures unless the official form supports them."
      ],
      "programType": "Rebate Program",
      "administrator": "Saint Peter Municipal Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://smmpa.com/members/saint-peter",
      "sourceUrlsChecked": [
        "https://www.saveenergyinsaintpeter.com/",
        "https://smmpa.com/members/saint-peter"
      ],
      "evidenceText": "The current Saint Peter/SMMPA page lists 2026 business rebate forms for lighting, HVAC heat pumps, VSDs, refrigeration, food service, VendingMisers, guestroom energy management, motors, compressed air and custom measures. Detailed form documents require utility confirmation.",
      "reasoningNotes": "The official member page supports broad C&I HVAC, refrigeration, controls, vending and industrial categories. Keep exact anti-sweat control matching at medium confidence because current detailed forms were not fully accessible."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Saint Peter/Bright Energy Solutions business rebates include many refrigeration measures, but exact current values vary by form and utility.",
        "sourceUrlsChecked": [
          "https://www.saintpetermn.gov/232/Rebates",
          "https://www.brightenergysolutions.com/find-a-rebate/"
        ],
        "reasoningNotes": "No single anti-sweat heater, freezer, or vending-control value was safely selected.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1947",
    "opportunityName": "Shakopee Public Utilities - Residential Energy Efficiency Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1947/shakopee-public-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://shakopeeutilities.com/2026-residential-rebates/",
    "applicationUrl": null,
    "administrator": "Shakopee Public Utilities",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
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
          "Shakopee"
        ],
        "utilityTerritories": [
          "Shakopee Public Utilities electric and water service territory"
        ],
        "notes": "Electric measures require active SPU electric service; water measures require active SPU water service."
      },
      "eligibleApplicantTypes": [
        "residential_utility_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "high_efficiency_hvac_replacement",
        "heat_pump_water_heater",
        "led_lighting_retrofit",
        "residential_refrigerator_freezer",
        "residential_energy_star_dishwasher",
        "high_efficiency_laundry_equipment",
        "appliance_recycling",
        "high_efficiency_toilet_urinal",
        "smart_irrigation_controller"
      ],
      "hardRequirements": [
        "Applicant must be an active Shakopee Public Utilities residential electric or water customer for the applicable measure.",
        "Products must meet the listed ENERGY STAR or program efficiency requirements.",
        "Rebate applications must meet SPU timing and documentation rules.",
        "WaterSense toilet and irrigation rebates require SPU water service."
      ],
      "blockers": [
        "Dishwasher support is for residential ENERGY STAR dishwashers, not commercial dishwashers.",
        "Refrigerator and freezer support is residential appliance or recycling support, not commercial refrigeration equipment.",
        "Do not infer commercial kitchen, commercial refrigeration, or non-residential lighting from the residential rebate page."
      ],
      "programType": "Rebate",
      "administrator": "Shakopee Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://shakopeeutilities.com/2026-residential-rebates/",
      "sourceUrlsChecked": [
        "https://shakopeeutilities.com/2026-residential-rebates/"
      ],
      "evidenceText": "The]( 2026 SPU residential rebate page lists residential appliances, recycling, LED lighting, central AC, air-source and ground-source heat pumps, ductless systems, HPWHs, toilets, and irrigation controllers.",
      "reasoningNotes": "Current official support is residential. Keep residential appliance categories and remove commercial kitchen and refrigeration interpretations."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Shakopee 2026 residential rebate page was found, but accessible text did not expose current measure amounts.",
        "sourceUrlsChecked": [
          "https://shakopeeutilities.com/2026-residential-rebates/"
        ],
        "reasoningNotes": "Do not use older tables as current proof.",
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
