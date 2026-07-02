You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 1
Targets in this prompt: 1-20 of 984
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
  "batchNumber": 1,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3689"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4698",
    "opportunityName": "Ameren Illinois - Energy-Efficiency Program",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4698/ameren-illinois-energy-efficiency-program",
    "websiteUrl": "https://amerenillinoissavings.com/business/incentives-services/",
    "applicationUrl": "https://amerenillinoissavings.com/business/business-forms-library/",
    "administrator": "Ameren Illinois Energy Efficiency Program",
    "programType": "utility business energy efficiency incentive and services program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 25,
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
        "retrofitTypeId": "cooling_tower_controls_optimization",
        "displayName": "Cooling tower controls / optimization",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "cooling tower"
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
          "occupancy sensor",
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
          "low flow",
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
        "retrofitTypeId": "retro_commissioning_study",
        "displayName": "Retro-commissioning study",
        "parentCategory": "audits_studies_planning",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "retro commissioning",
          "retro-commissioning",
          "commissioning"
        ]
      },
      {
        "retrofitTypeId": "submetering_energy_monitoring",
        "displayName": "Submetering / energy monitoring system",
        "parentCategory": "building_controls_energy_management",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "energy monitoring"
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
          "cooler freezer"
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
          "IL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Ameren Illinois electric and/or gas service territory"
        ],
        "notes": "Available to eligible Ameren Illinois business customers in Illinois."
      },
      "eligibleApplicantTypes": [
        "commercial",
        "industrial",
        "agricultural",
        "nonprofit",
        "government",
        "school",
        "multifamily"
      ],
      "eligibleSectors": [
        "business",
        "commercial",
        "industrial",
        "agricultural",
        "education",
        "healthcare",
        "hospitality",
        "local government",
        "small business",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "lighting",
        "HVAC / heat pump",
        "heat pump water heater",
        "insulation / air sealing",
        "refrigeration",
        "motors / VFD",
        "design assistance / study",
        "energy management and controls",
        "commercial foodservice",
        "compressed air",
        "water-saving devices",
        "custom energy efficiency projects",
        "new construction energy efficiency"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Ameren Illinois business customer.",
        "Measure eligibility is governed by current incentive guidelines and the program application guide.",
        "Custom projects, technical assistance, optimization, and new construction offerings are application-specific and may require program review before implementation.",
        "Technical assistance, retro-commissioning, monitoring-based commissioning, feasibility studies, and strategic energy management should be classified as design assistance/study or services, not direct equipment rebates."
      ],
      "blockers": [
        "Utility service territory and account eligibility must be confirmed before matching."
      ],
      "programType": "utility business energy efficiency incentive and services program",
      "administrator": "Ameren Illinois Energy Efficiency Program",
      "applicationUrl": "https://amerenillinoissavings.com/business/business-forms-library/",
      "websiteUrl": "https://amerenillinoissavings.com/business/incentives-services/",
      "sourceUrlsChecked": [
        "https://amerenillinoissavings.com/business/incentives-services/"
      ],
      "evidenceText": "Ameren Illinois lists current business incentives and services for lighting, HVAC, specialty equipment, weatherization, custom projects, new construction, and technical assistance/optimization.",
      "reasoningNotes": "Official administrator page clearly confirms active business offerings, eligible project categories, and business-sector targeting."
    },
    "existingSimpleRules": [
      {
        "id": "oir_b901a932cc094199_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 14000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$140 per evaporator fan EC motor control",
        "evidenceText": "Ameren Illinois 2026 incentive guide lists Evaporator Fan EC Motor Controls at $140 per control.",
        "sourceUrlsChecked": [
          "https://amerenillinoissavings.com/business/incentives-services/",
          "https://amerenillinoissavings.com/wp-content/uploads/2025/12/PY26-Incentive-Reference-Guide-ver12152025.pdf"
        ],
        "reasoningNotes": "Matched evaporator fan controls and refrigeration terms.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_c3cee504757c24f6_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 12000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$120 per EC motor for walk-in cooler",
        "evidenceText": "Ameren Illinois 2026 incentive guide lists EC Motor for Walk-In Cooler at $120 per motor.",
        "sourceUrlsChecked": [
          "https://amerenillinoissavings.com/business/incentives-services/",
          "https://amerenillinoissavings.com/wp-content/uploads/2025/12/PY26-Incentive-Reference-Guide-ver12152025.pdf"
        ],
        "reasoningNotes": "Matched refrigeration and evaporator/fan motor terms. Use unit_count as motors.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_e40a1f70485ba1c7_v1",
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
        "formula": "$100 per anti-sweat heater control door for freezer or refrigerator",
        "evidenceText": "Ameren Illinois 2026 incentive guide lists anti-sweat heater controls for freezer or refrigerator at $100 per door.",
        "sourceUrlsChecked": [
          "https://amerenillinoissavings.com/business/incentives-services/",
          "https://amerenillinoissavings.com/wp-content/uploads/2025/12/PY26-Incentive-Reference-Guide-ver12152025.pdf"
        ],
        "reasoningNotes": "Matched anti-sweat and refrigeration terms. Use unit_count as controlled doors.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4245",
    "opportunityName": "RG&E (Electric) - Commercial and Industrial Efficiency Program",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4245/rg-and-e-electric-commercial-and-industrial-efficiency-program",
    "websiteUrl": "https://www.rge.com/smartenergy/businesssolutions/commercialandindustrial",
    "applicationUrl": null,
    "administrator": "RG&E",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 23,
    "targetKind": "existing_simple_rule_v2_repair",
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
        "retrofitTypeId": "cooling_tower_controls_optimization",
        "displayName": "Cooling tower controls / optimization",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "cooling tower"
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
          "demand controlled ventilation",
          "dcv"
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
        "retrofitTypeId": "pump_fan_controls_retrofit",
        "displayName": "Pump/fan controls retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fan controls"
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
        "retrofitTypeId": "walk_in_cooler_freezer_upgrade",
        "displayName": "Walk-in cooler/freezer upgrade",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "cooler freezer"
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
          "NY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "RG&E"
        ],
        "notes": "RG&E nonresidential electric and natural gas service territory."
      },
      "eligibleApplicantTypes": [
        "nonresidential_customer",
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
        "agricultural",
        "multifamily_common_area"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "exterior_site_lighting_retrofit",
        "lighting_controls_retrofit",
        "refrigerated_case_lighting",
        "high_efficiency_hvac_replacement",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_furnace_retrofit",
        "boiler_controls_burner_retrofit",
        "high_efficiency_water_heater",
        "demand_controlled_ventilation",
        "smart_thermostat_zoning_retrofit",
        "energy_management_system",
        "variable_frequency_drive_retrofit",
        "efficient_pump_motor_retrofit",
        "steam_trap_replacement",
        "chiller_tune_up",
        "boiler_tune_up",
        "industrial_air_curtain",
        "efficient_air_compressor",
        "compressed_air_dryer",
        "compressed_air_controls",
        "compressed_air_filter",
        "compressed_air_heat_recovery",
        "commercial_laundry_ozone_system",
        "process_exhaust_filtration_recirculation",
        "agricultural_fan",
        "milk_pre_cooler",
        "milk_refrigeration_heat_recovery",
        "vacuum_pump_retrofit"
      ],
      "hardRequirements": [
        "Applicant must be an eligible RG&E nonresidential electric or natural gas customer.",
        "Projects must follow the applicable RG&E catalog, custom, preapproval, and incentive-cap rules.",
        "Custom projects must be cost-effective, non-lighting, and preapproved where required."
      ],
      "blockers": [
        "air_sealing_weatherization, low_flow_fixture_retrofit, high_efficiency_commercial_dishwasher, high_efficiency_oven, and walk_in_cooler_freezer_upgrade were not supported in current RG&E catalogs checked.",
        "Process exhaust filtration is not a broad indoor air filtration or IAQ retrofit.",
        "Compressed-air heat recovery should not be generalized to all waste heat recovery without custom approval."
      ],
      "programType": "Rebate",
      "administrator": "RG&E",
      "applicationUrl": null,
      "websiteUrl": "https://www.rge.com/smartenergy/businesssolutions/commercialandindustrial",
      "sourceUrlsChecked": [
        "https://www.rge.com/smartenergy/businesssolutions/commercialandindustrial",
        "https://www.rge.com/smartenergy/businesssolutions/commercialandindustrialrebates/commercial-and-industrial-rebate-catalogs",
        "https://www.rge.com/business-rebates-and-programs"
      ],
      "evidenceText": "RG&E]( lists C&I rebates for nonresidential customers across lighting, HVAC and refrigeration, process systems, agriculture, and custom non-lighting projects.",
      "reasoningNotes": "Most original C&I equipment categories were directionally correct, but several broad or kitchen/water categories were unsupported by current official catalogs."
    },
    "existingSimpleRules": [
      {
        "id": "oir_a878f665207c6230_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.5
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "medium",
        "formula": "Up to 50% of eligible commercial and industrial energy-efficiency project cost",
        "evidenceText": "RG&E business rebate materials state incentives may cover up to 50% of eligible project costs.",
        "sourceUrlsChecked": [
          "https://www.rge.com/business-rebates-and-programs",
          "https://www.rge.com/web/rge/smartenergy/businesssolutions/commercialandindustrialrebates/commercial-and-industrial-rebate-catalogs"
        ],
        "reasoningNotes": "Matched broad C&I efficiency terms. Use only for eligible approved projects; measure-level rebates may differ.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3235",
    "opportunityName": "Peoples Gas - Commercial & Industrial Prescriptive Rebate Program",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3235/peoples-gas-commercial-and-industrial-prescriptive-rebate-program",
    "websiteUrl": "https://www.peoplesgasdelivery.com/savings/business/rebates-ci",
    "applicationUrl": "https://www.northshoregasdelivery.com/savings/business/pdf/prescriptive.pdf",
    "administrator": "Peoples Gas",
    "programType": "Rebate/Incentive Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 19,
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
          "boiler controls",
          "burner",
          "boiler reset"
        ]
      },
      {
        "retrofitTypeId": "demand_controlled_kitchen_ventilation",
        "displayName": "Demand-controlled kitchen ventilation",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "kitchen ventilation"
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
          "demand controlled ventilation",
          "dcv"
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
          "hvac replacement",
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
          "aerator"
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
          "IL"
        ],
        "counties": [],
        "cities": [
          "Chicago"
        ],
        "utilityTerritories": [
          "Peoples Gas service territory"
        ],
        "notes": "Applies to eligible Peoples Gas commercial, industrial and public-sector natural-gas customers, principally in Chicago."
      },
      "eligibleApplicantTypes": [
        "Peoples Gas commercial customers",
        "industrial customers",
        "public sector customers",
        "small and midsize businesses",
        "building owners",
        "business tenants with authority to install measures",
        "contractors or trade allies supporting eligible customers"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public_sector",
        "institutional",
        "small_business",
        "food_service",
        "hospitality",
        "multifamily_common_areas_limited"
      ],
      "eligibleRetrofitCategories": [
        "commercial_furnace",
        "commercial_boiler",
        "boiler_repair_or_replacement",
        "boiler_reset_controls",
        "boiler_combustion_management",
        "boiler_stack_economizers",
        "burner_controls",
        "steam_trap_repair_replacement",
        "steam_pipe_insulation",
        "process_pipe_and_tank_insulation",
        "commercial_water_heating",
        "commercial_kitchen_equipment",
        "commercial_fryers",
        "commercial_ovens",
        "commercial_steamers",
        "commercial_dishwashers",
        "demand_controlled_kitchen_ventilation",
        "hvac_optimization",
        "rooftop_unit_tune_up",
        "destratification_fans",
        "heat_recovery",
        "dock_seals",
        "custom_natural_gas_efficiency",
        "combined_heat_and_power_limited"
      ],
      "hardRequirements": [
        "Applicant must be a Peoples Gas customer for the affected facility.",
        "Prescriptive projects require preapproval before equipment purchase and installation.",
        "The 2026 prescriptive application applies to projects installed during the 2026 program year and requires final documentation by the stated deadline.",
        "Projects must reduce natural gas energy use; fuel switching, power generation, renewable energy and operating-schedule changes are not eligible under the prescriptive application.",
        "Equipment must be new and installed in a private facility served by Peoples Gas or the paired North Shore Gas program where applicable."
      ],
      "blockers": [
        "Matched chiller is not retained as a standard measure because the current Peoples Gas source is a natural-gas efficiency program and did not support electric chillers.",
        "Matched low flow and aerator terms were not retained; the current Peoples Gas C&I rebate sources checked did not support broad water fixture retrofits.",
        "Smart or programmable thermostat terms are not retained as standalone commercial measures unless part of an eligible gas HVAC control path.",
        "Combined heat and power is a custom or specialized gas-saving category and should not be matched to ordinary HVAC or generator projects without program review.",
        "Do not map electric-only refrigeration, lighting, air-compressor or water-sewer projects to this gas program."
      ],
      "programType": "Rebate/Incentive Program",
      "administrator": "Peoples Gas",
      "applicationUrl": "https://www.northshoregasdelivery.com/savings/business/pdf/prescriptive.pdf",
      "websiteUrl": "https://www.peoplesgasdelivery.com/savings/business/rebates-ci",
      "sourceUrlsChecked": [
        "https://www.peoplesgasdelivery.com/savings/business/rebates-ci",
        "https://www.peoplesgasdelivery.com/savings/business/rebates",
        "https://www.northshoregasdelivery.com/savings/business/pdf/prescriptive.pdf",
        "https://programs.dsireusa.org/system/program/detail/3235/peoples-gas-commercial-and-industrial-prescriptive-rebate-program"
      ],
      "evidenceText": "Peoples Gas's business rebates page lists furnace and boiler repair or replacement, steam pipe insulation, steam trap repair or replacement, boiler and rooftop unit tuneups, boiler reset controls, demand-controlled ventilation kitchen hoods, commercial kitchen equipment and custom efficiency projects. The 2026 prescriptive application states preapproval is required and projects must reduce natural gas use.",
      "reasoningNotes": "The program is active and natural-gas focused. Current official sources support many matched gas HVAC, steam, kitchen ventilation and commercial kitchen equipment categories; electric, water and unsupported broad terms were removed."
    },
    "existingSimpleRules": [
      {
        "id": "oir_61075130a50df677_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 3000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "medium",
        "formula": "$30 per commercial HVAC steam trap repair or replacement without audit",
        "evidenceText": "Peoples Gas/North Shore materials list HVAC steam traps without audit at $30 per trap.",
        "sourceUrlsChecked": [
          "https://www.peoplesgasdelivery.com/savings/business/rebates-ci",
          "https://www.ilsag.info/wp-content/uploads/Peoples-Gas-2026-2029-EE-Plan.pdf"
        ],
        "reasoningNotes": "Returned separately because no-audit steam traps have a lower rebate.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f8cdddbfb2dfb72e_v1",
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
        "formula": "$100 per commercial HVAC steam trap repair or replacement with audit/survey",
        "evidenceText": "Peoples Gas/North Shore commercial materials list HVAC steam trap repair/replacement with audit at $100 per trap.",
        "sourceUrlsChecked": [
          "https://www.peoplesgasdelivery.com/savings/business/rebates-ci",
          "https://www.ilsag.info/wp-content/uploads/Peoples-Gas-2026-2029-EE-Plan.pdf"
        ],
        "reasoningNotes": "Matched steam trap term. Use one unit as one qualifying trap.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1944",
    "opportunityName": "Owatonna Public Utilities - Residential Conserve and Save Rebate Program",
    "state": "MN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1944/owatonna-public-utilities-residential-conserve-and-save-rebate-program",
    "websiteUrl": "https://www.owatonnautilities.com/residential-customers/residential-rebates/",
    "applicationUrl": "https://www.owatonnautilities.com/residential-customers/residential-rebates/",
    "administrator": "Owatonna Public Utilities / Conserve & Save",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 19,
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
        "retrofitTypeId": "low_flow_fixture_retrofit",
        "displayName": "Low-flow fixture retrofit",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fixture",
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
          "Owatonna"
        ],
        "utilityTerritories": [
          "Owatonna Public Utilities"
        ],
        "notes": "Owatonna Public Utilities residential customer service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customer",
        "multifamily_residential_customer"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily_residential"
      ],
      "eligibleRetrofitCategories": [
        "air_sealing_weatherization",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "furnace_fan_retrofit",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_boiler_retrofit",
        "high_efficiency_furnace_retrofit",
        "central_air_conditioner_replacement",
        "residential_dishwasher",
        "residential_clothes_washer",
        "heat_pump_clothes_dryer",
        "residential_refrigerator_freezer",
        "level_2_ev_charger_installation",
        "electric_vehicle_time_of_use_enrollment",
        "low_flow_showerhead",
        "high_efficiency_toilet",
        "smart_irrigation_controller",
        "smart_thermostat_zoning_retrofit",
        "variable_speed_pool_pump",
        "electric_induction_cooking",
        "electric_lawn_equipment",
        "electric_bicycle_purchase"
      ],
      "hardRequirements": [
        "Applicant must be an Owatonna Public Utilities residential customer.",
        "Measure must meet the 2026 OPU Conserve and Save application and equipment requirements.",
        "Some measures require specific program pathways such as House Call energy audit, EV TOU enrollment, or WaterSense qualification."
      ],
      "blockers": [
        "high_efficiency_commercial_dishwasher and commercial refrigeration are false positives; listed appliances are residential.",
        "window_replacement and solar_water_heating_system were not found on the current OPU rebate page.",
        "Commercial, industrial, or agricultural equipment should not match this residential program."
      ],
      "programType": "Rebate",
      "administrator": "Owatonna Public Utilities / Conserve & Save",
      "applicationUrl": "https://www.owatonnautilities.com/residential-customers/residential-rebates/",
      "websiteUrl": "https://www.owatonnautilities.com/residential-customers/residential-rebates/",
      "sourceUrlsChecked": [
        "https://www.owatonnautilities.com/residential-customers/residential-rebates/"
      ],
      "evidenceText": "OPU]( lists 2026 residential rebates for appliances, lighting, HVAC, water heating, EV chargers, weatherization, water fixtures, irrigation controls, and related home measures.",
      "reasoningNotes": "The data should be narrowed to residential products; commercial kitchen and broad refrigeration matches are false positives."
    },
    "existingSimpleRules": [
      {
        "id": "oir_10750371a0d181b0_v1",
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
        "evidenceText": "Bright Energy Solutions says connecting a Wi-Fi-enabled ChargePoint Home Flex charger to local utility earns a $500 rebate.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles",
          "http://www.owatonnautilities.com/residential-customers/residential-rebates"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms. Municipal participation should be confirmed for final eligibility.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_7190a30966560fbc_v1",
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
        "evidenceText": "Bright Energy Solutions says other qualifying Level 2 chargers earn a $150 rebate.",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/electric-vehicles",
          "http://www.owatonnautilities.com/residential-customers/residential-rebates"
        ],
        "reasoningNotes": "Returned separately from the ChargePoint-specific amount.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3074",
    "opportunityName": "ComEd -Energy Efficiency Program For Businesses",
    "state": "IL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3074/comed-energy-efficiency-program-for-businesses",
    "websiteUrl": "https://secure.comed.com/WaystoSave/ToolsAndResources/Pages/FindaServiceProvider.aspx",
    "applicationUrl": "https://azure-na-assets.contentstack.com/v3/assets/blt3ebb3fed6084be2a/blt8565db09730fbd49/CustomApplication.pdf?branch=prod_alias",
    "administrator": "ComEd",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 18,
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
          "street lighting",
          "outdoor lighting"
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
          "freezer",
          "display case"
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
          "lighting controls",
          "occupancy sensor",
          "networked lighting",
          "lighting control"
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
          "fan controls"
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
        "retrofitTypeId": "refrigeration_ec_motor_retrofit",
        "displayName": "Refrigeration EC motor retrofit",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ec motor",
          "electronically commutated motor",
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
          "ComEd"
        ],
        "notes": "ComEd electric service territory for nonresidential customers paying into the Energy Efficiency Program."
      },
      "eligibleApplicantTypes": [
        "nonresidential_customer",
        "commercial_customer",
        "industrial_customer",
        "public_sector_customer",
        "local_government",
        "school_district",
        "community_college",
        "university",
        "state_facility",
        "federal_facility"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "public_sector",
        "education",
        "government",
        "institutional",
        "agricultural"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "exterior_site_lighting_retrofit",
        "demand_controlled_ventilation",
        "energy_management_system",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "variable_frequency_drive_retrofit",
        "efficient_air_compressor",
        "compressed_air_controls",
        "compressed_air_dryer",
        "compressed_air_condensate_drain",
        "compressed_air_filter",
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_retrofit",
        "refrigeration_ec_motor_retrofit",
        "anti_sweat_heater_controls",
        "efficient_fan_blower_replacement",
        "industrial_refrigeration",
        "process_cooling",
        "retro_commissioning",
        "monitoring_based_commissioning",
        "energy_audit"
      ],
      "hardRequirements": [
        "Customer must be an eligible nonresidential ComEd customer receiving electricity over ComEd wires and paying applicable energy-efficiency charges.",
        "Projects must follow the applicable standard, custom, instant discount, service provider, or commissioning pathway.",
        "Preapproval is required for custom projects and many larger incentive applications."
      ],
      "blockers": [
        "Residential appliance rebates and gas equipment are outside this ComEd business electric program.",
        "Commercial kitchen equipment and heat pump water heaters were not verified in the current official sources checked for this repair.",
        "Large private accounts that opted out of the energy-efficiency program should not match."
      ],
      "programType": "Rebate",
      "administrator": "ComEd",
      "applicationUrl": "https://azure-na-assets.contentstack.com/v3/assets/blt3ebb3fed6084be2a/blt8565db09730fbd49/CustomApplication.pdf?branch=prod_alias",
      "websiteUrl": "https://secure.comed.com/WaystoSave/ToolsAndResources/Pages/FindaServiceProvider.aspx",
      "sourceUrlsChecked": [
        "https://azure-na-assets.contentstack.com/v3/assets/blt3ebb3fed6084be2a/blt8565db09730fbd49/CustomApplication.pdf?branch=prod_alias",
        "https://azure-na-assets.contentstack.com/v3/assets/blt3ebb3fed6084be2a/blt31b577d54197a6c2/HVACWorksheet.pdf",
        "https://webtools.dnvgl.com/Midstream/COMED/Home/DownloadSupportDocumentByCaption?caption=Commercial+HVAC+Instant+Discounts+Program+Guide",
        "https://www.comed.com/cdn/assets/v3/assets/blt3ebb3fed6084be2a/blt0dd576334f989cef/69399b2a685dab31f7bc8caa/2026_ComEd_Application_EESPParticipation_FINAL_2.pdf?branch=prod_alias",
        "https://secure.comed.com/WaystoSave/ToolsAndResources/Pages/FindaServiceProvider.aspx"
      ],
      "evidenceText": "ComEd's]( 2026 materials identify eligible nonresidential customers and incentives for custom efficiency, HVAC and VSDs, service providers, commissioning, compressed air, refrigeration, and related measures.",
      "reasoningNotes": "Current sources support broad nonresidential electric efficiency categories, but some original product matches need more current program-specific confirmation."
    },
    "existingSimpleRules": [
      {
        "id": "oir_934964d006d4ad73_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 14000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$140 per ton for advanced rooftop controls with demand-controlled ventilation and fan control",
        "evidenceText": "ComEd 2026 worksheet lists advanced rooftop controls with DCV and fan control at $140 per ton.",
        "sourceUrlsChecked": [
          "https://azure-na-assets.contentstack.com/v3/assets/blt3ebb3fed6084be2a/blt46fd4516ee3720a3/DXTuneUpWorksheet.pdf",
          "https://www.comed.com/WaysToSave/ForYourBusiness/Pages/FactSheets/StandardIncentives.aspx"
        ],
        "reasoningNotes": "Matched demand-controlled ventilation, VFD and HVAC controls. Use unit_count as eligible controlled rooftop-unit tons.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3146",
    "opportunityName": "Otter Tail Power Company - Residential and Commercial Energy Efficiency Rebate Program",
    "state": "SD",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3146/otter-tail-power-company-residential-and-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.otpco.com/rebates-and-efficiency-programs/programs/",
    "applicationUrl": "https://www.otpco.com/rebates-and-efficiency-programs/programs/",
    "administrator": "Otter Tail Power Company",
    "programType": "Rebate, Custom Grant, Rate and Demand Response Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 18,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "battery_storage_system",
        "displayName": "Battery storage system",
        "parentCategory": "energy_storage_resilience",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "storage system"
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
          "SD"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Otter Tail Power Company South Dakota electric service territory"
        ],
        "notes": "Applies to eligible Otter Tail Power Company customers in South Dakota; some measures are residential, some business/custom, and some are rate or demand-response programs rather than rebates."
      },
      "eligibleApplicantTypes": [
        "Otter Tail Power residential customers",
        "Otter Tail Power business customers",
        "commercial customers",
        "industrial customers",
        "agricultural customers where applicable",
        "residential homeowners",
        "trade allies and contractors for eligible installations"
      ],
      "eligibleSectors": [
        "residential",
        "commercial",
        "industrial",
        "agriculture",
        "multifamily_limited",
        "transportation_limited"
      ],
      "eligibleRetrofitCategories": [
        "central_air_conditioner_energy_star",
        "air_source_heat_pump",
        "ductless_mini_split_heat_pump",
        "air_to_water_heat_pump",
        "ground_source_geothermal_heat_pump",
        "heat_pump_tune_up",
        "desuperheater_limited",
        "heat_pump_water_heater_or_electric_water_heating",
        "smart_thermostat",
        "insulation",
        "energy_star_windows",
        "led_lighting",
        "lighting_retrofit",
        "lighting_new_construction",
        "appliance_recycling_refrigerator_freezer",
        "ev_charging_level_2_off_peak_rate_limited",
        "ev_purchase_or_rebate_limited",
        "electrical_panel_upgrade_for_load_control",
        "thermal_storage_heating",
        "deferred_load_or_dual_fuel_rate",
        "cool_savings_demand_response",
        "residential_demand_control",
        "custom_commercial_energy_efficiency",
        "custom_compressed_air",
        "custom_chillers",
        "custom_large_adjustable_speed_drives",
        "custom_refrigeration",
        "custom_electric_cooking_equipment",
        "custom_building_envelope"
      ],
      "hardRequirements": [
        "Applicant must be an Otter Tail Power customer in the applicable state and customer class.",
        "Measure eligibility depends on the state selector, customer class and current Otter Tail Power program form.",
        "Heat pump rebates require qualifying equipment and current heat pump rebate application requirements, including equipment documentation such as AHRI where applicable.",
        "EV charger incentives are tied to Level 2 chargers on an eligible off-peak EV rate or EVantage terms and should be treated separately from building-efficiency rebates.",
        "Electrical panel rebates must be connected to approved load-control technologies such as qualifying cooling, water heating, EV charging or electric heating programs.",
        "Custom business grants require preapproval and are based on project-specific energy savings, demand reduction, installed cost and Otter Tail review."
      ],
      "blockers": [
        "Furnace and boiler matched terms were not retained as equipment rebate categories; Otter Tail's dual-fuel or deferred-load programs may involve backup heating but are not furnace or boiler replacement rebates in the checked sources.",
        "Refrigerator and freezer support is limited to appliance recycling or approved custom refrigeration, not general residential high-efficiency refrigerator or freezer purchases.",
        "Window AC is explicitly not eligible under the checked air-conditioner rebate page; windows are retained only as ENERGY STAR windows where supported.",
        "Storage system was narrowed to thermal storage, deferred-load or demand-control programs, not battery energy storage.",
        "Dishwasher, induction and general cooking terms are not standard residential rebates; only approved custom business efficient electric cooking projects were retained.",
        "Blower was not retained as a generic fan or motor replacement category.",
        "The current official Otter Tail URL structure uses rebates-and-efficiency-programs; the older DSIRE website URL is a starting clue but should not be the only source."
      ],
      "programType": "Rebate, Custom Grant, Rate and Demand Response Program",
      "administrator": "Otter Tail Power Company",
      "applicationUrl": "https://www.otpco.com/rebates-and-efficiency-programs/programs/",
      "websiteUrl": "https://www.otpco.com/rebates-and-efficiency-programs/programs/",
      "sourceUrlsChecked": [
        "https://www.otpco.com/ways-to-save/programs/",
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/",
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/heat-pump/",
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/air-conditioner-rebates-energy-star/",
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/electrical-panel-rebates/",
        "https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/",
        "https://programs.dsireusa.org/system/program/detail/3146/otter-tail-power-company-residential-and-commercial-energy-efficiency-rebate-program"
      ],
      "evidenceText": "Otter Tail Power's current programs page lists rebates, bill credits, off-peak rates, air-conditioner rebates, heat pump rebates, smart thermostats, insulation, ENERGY STAR windows, LED lighting, appliance recycling, electric-vehicle rebates, EV charging, electrical panel rebates, water heating, thermal storage and demand-control programs. The heat pump page lists ductless, ducted, air-to-water and geothermal heat pump support. The custom grants page lists business project examples including compressed air, chillers, large adjustable-speed drives, lighting, motors, refrigeration, efficient electric cooking and building envelope.",
      "reasoningNotes": "The record is active but broad and mixed across residential, commercial, rate and custom programs. Categories were kept only where current Otter Tail sources supported them, with separate-program boundaries for EV charging, demand response, rates and custom grants."
    },
    "existingSimpleRules": [
      {
        "id": "oir_5ca8c0d7b75cf974_v1",
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
        "cap": null,
        "confidence": "high",
        "formula": "$500 per qualifying Level 2 EV charger on an eligible off-peak rate",
        "evidenceText": "Otter Tail Power EV charging materials list a $500 Level 2 charger rebate on a qualified off-peak rate.",
        "sourceUrlsChecked": [
          "https://www.otpco.com/ways-to-save/rebates/electric-vehicles/",
          "https://www.otpco.com/ways-to-save/rebates/"
        ],
        "reasoningNotes": "Matched Level 2 EV charging terms. Use one unit as one eligible charger.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3659",
    "opportunityName": "AEP Public Service Company of Oklahoma - Commercial Rebate Program",
    "state": "OK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3659/aep-public-service-company-of-oklahoma-commercial-rebate-program",
    "websiteUrl": "https://powerforwardwithpso.com/rebates/",
    "applicationUrl": "https://www.psobusinessrebates.com",
    "administrator": "Public Service Company of Oklahoma",
    "programType": "utility business energy efficiency rebate, midstream, small business, multifamily, virtual commissioning, and demand response program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 17,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "demand_controlled_kitchen_ventilation",
        "displayName": "Demand-controlled kitchen ventilation",
        "parentCategory": "commercial_kitchen_foodservice",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "hood controls"
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
          "hvac controls",
          "economizer"
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
          "occupancy sensor"
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
          "fan controls"
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
          "OK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Public Service Company of Oklahoma electric service territory"
        ],
        "notes": "Available to eligible PSO business customers in Oklahoma."
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
        "insulation / air sealing",
        "refrigeration",
        "motors / VFD",
        "demand response",
        "design assistance / study",
        "HVAC controls",
        "duct insulation",
        "window film",
        "foodservice and vending controls",
        "virtual commissioning"
      ],
      "hardRequirements": [
        "Applicant must be a PSO business customer.",
        "Measure eligibility and rebate submission are handled through PSO business rebate channels.",
        "Demand response/Peak Performers should be classified as a demand response program, not an upfront equipment rebate.",
        "Small Business Energy Solutions, Multifamily, Midstream Instant Savings, and Virtual Commissioning have distinct participation rules."
      ],
      "blockers": [
        "Utility account eligibility and program path must be verified before applying a specific incentive type."
      ],
      "programType": "utility business energy efficiency rebate, midstream, small business, multifamily, virtual commissioning, and demand response program",
      "administrator": "Public Service Company of Oklahoma",
      "applicationUrl": "https://www.psobusinessrebates.com",
      "websiteUrl": "https://powerforwardwithpso.com/rebates/",
      "sourceUrlsChecked": [
        "https://powerforwardwithpso.com/rebates/",
        "https://www.psobusinessrebates.com"
      ],
      "evidenceText": "PSO PowerForward lists business rebates and programs including lighting, HVAC controls, insulation, duct insulation, window film, refrigeration measures, small business, multifamily, midstream instant savings, virtual commissioning, and Peak Performers.",
      "reasoningNotes": "Official PSO program site confirms active availability and distinguishes equipment incentives from demand response and commissioning services."
    },
    "existingSimpleRules": [
      {
        "id": "oir_4019f9e341f5b2d8_v1",
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
        "formula": "$250 per networked HVAC thermostat or zone sensor",
        "evidenceText": "PSO rebate listing includes Networked HVAC Controls at $250 per thermostat and/or zone sensor.",
        "sourceUrlsChecked": [
          "https://powerforwardwithpso.com/rebates/"
        ],
        "reasoningNotes": "Matched HVAC controls and whole-building efficiency terms. Confidence is medium because the source is a dynamic rebate listing.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3260",
    "opportunityName": "Pasadena Water and Power - Commercial Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3260/pasadena-water-and-power-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://pwp.cityofpasadena.net/businessrebateprogram/",
    "applicationUrl": "https://pwp.cityofpasadena.net/businessrebateprogram/",
    "administrator": "Pasadena Water and Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 16,
    "targetKind": "existing_simple_rule_v2_repair",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "cooling_tower_controls_optimization",
        "displayName": "Cooling tower controls / optimization",
        "parentCategory": "water_efficiency",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "cooling tower"
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "refrigerator",
          "freezer",
          "display case"
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
          "Los Angeles County"
        ],
        "cities": [
          "Pasadena"
        ],
        "utilityTerritories": [
          "Pasadena Water and Power commercial electric service territory"
        ],
        "notes": "Limited to active PWP commercial electric accounts in good standing."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "institutional_customer",
        "municipal_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional",
        "municipal"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "variable_frequency_drive_retrofit",
        "cooling_tower_controls_optimization",
        "window_film_shading_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "heat_pump_water_heater",
        "high_efficiency_laundry_equipment",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_fryer",
        "high_efficiency_oven",
        "high_efficiency_steamer",
        "commercial_foodservice_equipment",
        "high_efficiency_refrigeration_equipment",
        "walk_in_cooler_freezer_upgrade",
        "door_gasket_strip_curtain_night_cover",
        "induction_cooking_equipment"
      ],
      "hardRequirements": [
        "Applicant must have an active PWP commercial electric account in good standing.",
        "Total rebate is capped by current PWP fiscal-year and project-cost limits.",
        "Application requires paid invoice, product specifications, proof photo, and tax documentation.",
        "Fuel-substitution measures may require nameplate photos and final electrical permit documentation."
      ],
      "blockers": [
        "Window replacement is not supported by the verified PWP business rebate page; only qualifying window film is listed.",
        "Water conservation fixtures, irrigation, turf, EV charging, solar, battery storage, and financing are separate PWP or partner programs.",
        "Do not match residential appliances under this commercial rebate."
      ],
      "programType": "Rebate Program",
      "administrator": "Pasadena Water and Power",
      "applicationUrl": "https://pwp.cityofpasadena.net/businessrebateprogram/",
      "websiteUrl": "https://pwp.cityofpasadena.net/businessrebateprogram/",
      "sourceUrlsChecked": [
        "https://pwp.cityofpasadena.net/businessrebateprogram/",
        "https://pwp.cityofpasadena.net/business/"
      ],
      "evidenceText": "PWP lists active commercial electric rebates for lighting, controls, VFDs, HVAC, heat pump equipment, window film, refrigeration, and commercial foodservice equipment.",
      "reasoningNotes": "The verified business rebate page supports many commercial equipment categories but not window replacement or partner water-conservation measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_afcf58a33b540c6d_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.25
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "25% of eligible project cost",
        "evidenceText": "Total rebate amount (including any applicable bonuses) shall not exceed twenty-five percent (25%) of the total project cost including parts and labor",
        "sourceUrlsChecked": [
          "https://ww5.cityofpasadena.net/water-and-power/businessrebateprogram/"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1896",
    "opportunityName": "Riverside Public Utilities - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1896/riverside-public-utilities-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://riversideca.gov/utilities/residents/rebates/about",
    "applicationUrl": null,
    "administrator": "Riverside Public Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 16,
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
        "retrofitTypeId": "cool_roof_reflective_roof",
        "displayName": "Cool roof / reflective roof coating",
        "parentCategory": "building_envelope",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "cool roof",
          "roof coating"
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
          "refrigerator"
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
          "CA"
        ],
        "counties": [
          "Riverside County"
        ],
        "cities": [
          "Riverside"
        ],
        "utilityTerritories": [
          "Riverside Public Utilities residential service territory"
        ],
        "notes": "Energy rebates apply to RPU residential electric customers; water rebates use separate RPU or partner water rebate rules."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "residential_water_customer",
        "income_qualified_residential_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "heat_pump_water_heater",
        "residential_heat_pump_clothes_dryer",
        "residential_clothes_washer",
        "residential_dishwasher",
        "residential_refrigerator",
        "cool_roof_reflective_roof",
        "insulation_upgrade",
        "duct_sealing_and_insulation",
        "air_sealing_weatherization",
        "window_replacement",
        "window_film_shading_retrofit",
        "level_2_ev_charger_installation",
        "high_efficiency_toilet_urinal",
        "smart_irrigation_controller"
      ],
      "hardRequirements": [
        "Applicant must satisfy RPU residential service and product eligibility requirements.",
        "Energy Star and equipment efficiency requirements apply where specified.",
        "EV charger rebate applies to qualifying residential Level 2 chargers installed in RPU territory.",
        "Some water rebates are administered through separate water-conservation rebate processes."
      ],
      "blockers": [
        "Commercial dishwasher, commercial refrigeration, and commercial kitchen categories are false positives for this residential program.",
        "Water rebates and EV charger rebates are separate residential subprograms and should not be treated as generic energy-efficiency measures.",
        "Do not match nonresidential applicants under this record."
      ],
      "programType": "Rebate Program",
      "administrator": "Riverside Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://riversideca.gov/utilities/residents/rebates/about",
      "sourceUrlsChecked": [
        "https://riversideca.gov/utilities/residents/rebates/about",
        "https://riversideca.gov/utilities/residents/rebates/energy-rebates/air-conditioning-incentives",
        "https://riversideca.gov/utilities/residents/rebates/energy-rebates/energy-star",
        "https://riversideca.gov/utilities/residents/rebates/energy-rebates/weatherization",
        "https://riversideca.gov/utilities/residents/rebates/electrify-riverside",
        "https://riversideca.gov/utilities/residents/rebates/water-rebates/water-rebates"
      ],
      "evidenceText": "RPU residential pages list AC, heat pump, thermostat, Energy Star appliance, weatherization, window, cool roof, EV charger, and water rebate offerings.",
      "reasoningNotes": "The original broad commercial matches should be narrowed to residential products and clearly separated energy, water, and EV subprograms."
    },
    "existingSimpleRules": [
      {
        "id": "oir_2844421a71cb5771_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 150000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "equipment_plus_labor",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 1
        },
        "confidence": "medium",
        "formula": "Up to $1,500 per residential Level 2 EV charger",
        "evidenceText": "Riverside Electrify page says residential Level 2 charger installations are eligible for up to a $1,500 rebate.",
        "sourceUrlsChecked": [
          "https://riversideca.gov/utilities/residents/rebates/electrify-riverside"
        ],
        "reasoningNotes": "Matched EV charger and Level 2 terms. Medium because the source uses up to.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1810",
    "opportunityName": "Lodi Electric Utility - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1810/lodi-electric-utility-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.lodi.gov/909/Residential-Rebates",
    "applicationUrl": null,
    "administrator": "Lodi Electric Utility",
    "programType": "municipal utility residential energy efficiency rebate program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 15,
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
          "San Joaquin County"
        ],
        "cities": [
          "Lodi"
        ],
        "utilityTerritories": [
          "Lodi Electric Utility service territory"
        ],
        "notes": "Available to Lodi Electric Utility residential customers."
      },
      "eligibleApplicantTypes": [
        "residential"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "HVAC / heat pump",
        "heat pump water heater",
        "insulation / air sealing",
        "EV charger",
        "refrigeration",
        "smart thermostat",
        "duct sealing and testing",
        "replacement windows",
        "appliances",
        "induction cooking",
        "variable-speed pool pump",
        "whole house fan"
      ],
      "hardRequirements": [
        "Applicant must be a Lodi Electric Utility residential customer.",
        "ENERGY STAR is required for all products except induction ranges/cooktops.",
        "Gas water-heating customers are not eligible for clothes washer or dishwasher rebates.",
        "Measure-specific applications and documentation are required."
      ],
      "blockers": [
        "Water-heating fuel must be verified before matching clothes washer or dishwasher rebates."
      ],
      "programType": "municipal utility residential energy efficiency rebate program",
      "administrator": "Lodi Electric Utility",
      "applicationUrl": null,
      "websiteUrl": "https://www.lodi.gov/909/Residential-Rebates",
      "sourceUrlsChecked": [
        "https://www.lodi.gov/909/Residential-Rebates"
      ],
      "evidenceText": "Lodi lists residential rebates for appliances/products including HPWH and smart thermostat, home improvements including insulation, replacement windows, AC, ASHP, duct sealing/testing, and a link to EV rebates.",
      "reasoningNotes": "Official City of Lodi page confirms current categories and key eligibility restrictions."
    },
    "existingSimpleRules": [
      {
        "id": "oir_bbff61a41c3511c1_v1",
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
        "formula": "$500 per residential Level II EV charger",
        "evidenceText": "Lodi EV rebates list Residential Level II EV Charger at $500.",
        "sourceUrlsChecked": [
          "https://www.lodi.gov/1143/EV-Charger-and-Installation-Rebates",
          "https://www.lodi.gov/407/Rebates"
        ],
        "reasoningNotes": "Matched residential Level 2 EV charging. Use one unit as one eligible charger.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_f0db928a6b42a294_v1",
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
        "formula": "$500 per residential Level II EV charger installation",
        "evidenceText": "Lodi EV rebates list Residential Level II EV Charger Installation at $500.",
        "sourceUrlsChecked": [
          "https://www.lodi.gov/1143/EV-Charger-and-Installation-Rebates",
          "https://www.lodi.gov/407/Rebates"
        ],
        "reasoningNotes": "Returned separately because source distinguishes charger hardware and installation rebates.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1897",
    "opportunityName": "Riverside Public Utilities - Commercial Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1897/riverside-public-utilities-commercial-energy-efficiency-rebate-program",
    "websiteUrl": "https://riversideca.gov/utilities/businesses/rebates/about",
    "applicationUrl": null,
    "administrator": "Riverside Public Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 15,
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
          "Riverside County"
        ],
        "cities": [
          "Riverside"
        ],
        "utilityTerritories": [
          "Riverside Public Utilities commercial electric service territory"
        ],
        "notes": "Limited to RPU business electric customers and applicable small-business direct-install rules."
      },
      "eligibleApplicantTypes": [
        "commercial_electric_customer",
        "small_business_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "institutional",
        "municipal"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "hvac_tune_up",
        "smart_thermostat_zoning_retrofit",
        "demand_response_capable_hvac",
        "high_efficiency_refrigeration_equipment",
        "high_efficiency_laundry_equipment",
        "high_efficiency_commercial_dishwasher",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "cool_roof_reflective_roof",
        "window_replacement",
        "window_film_shading_retrofit",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "efficient_fan_blower_replacement"
      ],
      "hardRequirements": [
        "Applicant must be an eligible RPU business customer.",
        "Project cost caps, rate schedule limits, and once-per-program or premise restrictions may apply.",
        "Lighting and weatherization measures must meet current RPU product and documentation requirements.",
        "Direct-install measures are limited to qualifying small business participants."
      ],
      "blockers": [
        "Commercial heat pump HVAC was not verified as a separate rebate; keep HVAC matches to AC, chillers, tune-ups, thermostats, and direct-install measures unless the current page confirms heat pumps.",
        "Do not infer broad commercial foodservice beyond the listed dishwasher and Energy Star product incentives.",
        "Residential-only rebates should not be matched to this commercial record.",
        "Energy management should be limited to verified controls, sensors, thermostats, or direct-install measures."
      ],
      "programType": "Rebate Program",
      "administrator": "Riverside Public Utilities",
      "applicationUrl": null,
      "websiteUrl": "https://riversideca.gov/utilities/businesses/rebates/about",
      "sourceUrlsChecked": [
        "https://riversideca.gov/utilities/businesses/rebates/energy-rebates/energy-star-rated-product-incentives",
        "https://riversideca.gov/utilities/businesses/rebates/energy-rebates/lighting-incentives",
        "https://riversideca.gov/utilities/businesses/rebates/energy-rebates/weatherization",
        "https://riversideca.gov/utilities/businesses/rebates/energy-rebates/small-business-direct-install-program-and-outdoor-lighting-program",
        "https://riversideca.gov/utilities/businesses/rebates/energy-rebates/air-conditioning-incentives"
      ],
      "evidenceText": "RPU business pages list commercial lighting, controls, AC, tune-ups, Energy Star products, weatherization, windows, window film, cool roof, and direct-install measures.",
      "reasoningNotes": "Most envelope, lighting, HVAC, and selected product matches are supported; heat pump HVAC and broad foodservice categories should be constrained."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8cde6113843222c1_v1",
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
        "formula": "Up to $750 per ton for eligible heat pump HVAC",
        "evidenceText": "Riverside commercial rebate materials list heat pump HVAC incentives up to $750 per ton.",
        "sourceUrlsChecked": [
          "https://riversideca.gov/utilities/businesses/rebates",
          "https://riversideca.gov/utilities/businesses/rebates/hvac"
        ],
        "reasoningNotes": "Matched commercial heat pump and HVAC terms. Use unit_count as eligible tons when tier is known.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1889",
    "opportunityName": "Pasadena Water and Power - Residential Energy Efficiency Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1889/pasadena-water-and-power-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://pwp.cityofpasadena.net/savemoney/",
    "applicationUrl": "https://myaccount.pwpweb.com/",
    "administrator": "Pasadena Water and Power",
    "programType": "municipal utility residential rebate, electrification, water conservation, EV, solar/battery, and assistance program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 14,
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
        "retrofitTypeId": "high_efficiency_refrigeration_equipment",
        "displayName": "High-efficiency refrigeration equipment",
        "parentCategory": "refrigeration",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
          "level-2",
          "level ii"
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
          "Los Angeles County"
        ],
        "cities": [
          "Pasadena"
        ],
        "utilityTerritories": [
          "Pasadena Water and Power electric and/or water service territory"
        ],
        "notes": "Available to eligible Pasadena Water and Power residential customers; water rebates may use a separate SoCalWaterSmart path."
      },
      "eligibleApplicantTypes": [
        "residential",
        "low_income / income_qualified"
      ],
      "eligibleSectors": [
        "residential",
        "low-income assistance"
      ],
      "eligibleRetrofitCategories": [
        "solar PV",
        "battery storage",
        "EV charger",
        "HVAC / heat pump",
        "heat pump water heater",
        "insulation / air sealing",
        "refrigeration",
        "appliances and fixtures",
        "smart thermostat",
        "toilet and water fixtures",
        "landscaping, irrigation, and pool measures",
        "electric cooking and home electrification",
        "in-home evaluation and whole-house improvement"
      ],
      "hardRequirements": [
        "Applicant must be a Pasadena Water and Power customer for applicable energy or water rebates.",
        "Energy rebate applications require logging in through the PWP account portal.",
        "Water rebate applications may be administered through SoCalWaterSmart.",
        "Bill assistance and low-income programs are separate from equipment rebates.",
        "Measure-specific program rules apply for EV charger, solar, battery storage, water, electrification, and whole-home programs."
      ],
      "blockers": [
        "Confirm whether the project is an electric rebate, water rebate, solar/battery program, EV program, whole-house service, or bill assistance before matching."
      ],
      "programType": "municipal utility residential rebate, electrification, water conservation, EV, solar/battery, and assistance program",
      "administrator": "Pasadena Water and Power",
      "applicationUrl": "https://myaccount.pwpweb.com/",
      "websiteUrl": "https://pwp.cityofpasadena.net/savemoney/",
      "sourceUrlsChecked": [
        "https://ww5.cityofpasadena.net/water-and-power/savemoney/",
        "https://pwp.cityofpasadena.net/savemoney/"
      ],
      "evidenceText": "PWP lists residential rebates for appliances/fixtures, heating and cooling, insulation/building projects, landscaping/irrigation/pools, home electrification, EV and EV charger, green power, solar rebate, battery storage, whole-house evaluation, and bill assistance.",
      "reasoningNotes": "Official city utility page confirms broad active residential offerings but each category uses distinct application and eligibility rules."
    },
    "existingSimpleRules": [
      {
        "id": "oir_3e129a453f45740b_v1",
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
        "confidence": "medium",
        "formula": "$600 per qualifying Wi-Fi enabled residential Level 2 EV charger",
        "evidenceText": "PWP residential EV incentive materials identify a $600 rebate for a Wi-Fi enabled Level 2 charger.",
        "sourceUrlsChecked": [
          "https://pwp.cityofpasadena.net/residentialevrebate/",
          "https://ww5.cityofpasadena.net/water-and-power/savemoney/"
        ],
        "reasoningNotes": "Matched Level 2 EV charger term. Confidence is medium because official text foregrounded vehicle rebates more clearly than charger amounts.",
        "mapping": {
          "primarySavingsModelId": "fleet_fuel_replacement",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_990f0cc76b13c756_v1",
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
        "formula": "$200 per standard non-Wi-Fi residential Level 2 EV charger",
        "evidenceText": "PWP residential EV incentive materials identify a $200 rebate for a standard Level 2 charger.",
        "sourceUrlsChecked": [
          "https://pwp.cityofpasadena.net/residentialevrebate/",
          "https://ww5.cityofpasadena.net/water-and-power/savemoney/"
        ],
        "reasoningNotes": "Returned separately because Wi-Fi and non-Wi-Fi Level 2 chargers have different rebate amounts.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4952",
    "opportunityName": "SoCalGas - Custom Non-Residential Energy Efficiency Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4952/socalgas-custom-non-residential-energy-efficiency-program",
    "websiteUrl": "https://www.socalgas.com/business/savings/equipment-rebates",
    "applicationUrl": "https://eecp.socalgas.com",
    "administrator": "Southern California Gas Company",
    "programType": "utility non-residential natural gas rebate and custom efficiency incentive program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 14,
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
          "CA"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Southern California Gas Company natural gas service territory"
        ],
        "notes": "Available to eligible SoCalGas non-residential natural gas customers; program is gas-focused."
      },
      "eligibleApplicantTypes": [
        "commercial",
        "industrial",
        "agricultural",
        "multifamily",
        "nonprofit",
        "government",
        "school"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "greenhouse",
        "foodservice",
        "pool",
        "process heat",
        "non-residential"
      ],
      "eligibleRetrofitCategories": [
        "HVAC / heat pump",
        "insulation / air sealing",
        "design assistance / study",
        "natural gas boilers and boiler controls",
        "commercial water heating",
        "gas commercial foodservice",
        "solar thermal water heating",
        "steam traps and steam boiler economizers",
        "process heating",
        "pipe and tank insulation",
        "pool covers and pool heaters",
        "customized natural gas efficiency"
      ],
      "hardRequirements": [
        "Applicant must be an eligible SoCalGas business/non-residential natural gas customer.",
        "Rebate equipment must be new natural gas-fired equipment where applicable.",
        "Fuel switching does not qualify.",
        "Rebates generally require replacing older equipment, except commercial cooking equipment.",
        "Equipment must be installed within one year of purchase and applications must be submitted in the same calendar year as installation unless a listed exception applies.",
        "Online application requires W-9, receipt, specification sheet, and other required documentation.",
        "Licensed contractors are required for space-heating boilers.",
        "California Form 590 is required except for government entities.",
        "Funds are first-come, first-served until exhausted and the program may be modified or terminated.",
        "Wildfire-impacted customers with applications submitted in 2025 may have an extension through December 31, 2026."
      ],
      "blockers": [
        "Do not classify this as solar PV, battery storage, electric heat pump, or electric equipment incentive.",
        "Fuel-switching and used/reconditioned equipment are ineligible.",
        "Custom incentives and facility design/expansion projects require application-specific review."
      ],
      "programType": "utility non-residential natural gas rebate and custom efficiency incentive program",
      "administrator": "Southern California Gas Company",
      "applicationUrl": "https://eecp.socalgas.com",
      "websiteUrl": "https://www.socalgas.com/business/savings/equipment-rebates",
      "sourceUrlsChecked": [
        "https://www.socalgas.com/for-your-business/energy-savings/rebates-and-incentives",
        "https://www.socalgas.com/business/savings/equipment-rebates",
        "https://eecp.socalgas.com"
      ],
      "evidenceText": "SoCalGas lists 2026 business rebates for natural gas boilers, controls, pipe/tank insulation, recirculation controls, steam traps, foodservice equipment, commercial water heaters, solar thermal water heating, and customized incentives; requirements include new gas-fired equipment, no fuel switching, same-calendar-year application, documentation, and first-come funds.",
      "reasoningNotes": "Official SoCalGas page clearly confirms non-residential gas scope, eligible categories, replacement/fuel requirements, application documentation, and funding limitations."
    },
    "existingSimpleRules": [
      {
        "id": "oir_9946864d30c0b0c7_v1",
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
        "formula": "$100 per commercial steam trap",
        "evidenceText": "SoCalGas 2026 business equipment rebates list Steam Trap for Commercial Customers, $100 / unit.",
        "sourceUrlsChecked": [
          "https://www.socalgas.com/business/savings/equipment-rebates",
          "https://www.socalgas.com/for-your-business/energy-savings/rebates-and-incentives"
        ],
        "reasoningNotes": "Matched steam trap and commercial kitchen/gas terms. Medium because the target names a custom program but the official prescriptive table gives this measure value.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5796",
    "opportunityName": "Efficiency Works - Business Energy Efficiency Rebate Program (Offered by 4 Utilities)",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5796/efficiency-works-business-energy-efficiency-rebate-program-offered-by-4-utilities",
    "websiteUrl": "https://efficiencyworks.org/for-your-business-rebates-and-incentives/",
    "applicationUrl": "https://efficiencyworks.dsmcentral.com/",
    "administrator": "Efficiency Works",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 14,
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
          "smart thermostat",
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
          "CO"
        ],
        "counties": [],
        "cities": [
          "Estes Park",
          "Fort Collins",
          "Longmont",
          "Loveland"
        ],
        "utilityTerritories": [
          "Estes Park Power and Communications commercial electric service territory",
          "Fort Collins Utilities commercial electric service territory",
          "Longmont Power & Communications commercial electric service territory",
          "City of Loveland Utilities commercial electric service territory"
        ],
        "notes": "Program applies to commercial electric customers of the listed Efficiency Works participating municipal utilities. Water-only incentives are not processed by Efficiency Works as of January 1, 2026."
      },
      "eligibleApplicantTypes": [
        "commercial electric customers",
        "business customers",
        "public-sector customers",
        "municipal customers",
        "commercial property owners",
        "multifamily properties with eligible commercial meters for public EV charging",
        "contractors or vendors with customer authorization"
      ],
      "eligibleSectors": [
        "commercial",
        "public sector",
        "municipal",
        "office",
        "retail",
        "grocery",
        "restaurant",
        "food service",
        "hospitality",
        "multifamily common areas where served by a commercial meter",
        "transportation electrification"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "exterior_site_lighting_retrofit",
        "smart_thermostat_zoning_retrofit",
        "hvac_controls_retrofit",
        "demand_controlled_ventilation",
        "demand_controlled_kitchen_ventilation",
        "high_efficiency_refrigeration_equipment",
        "walk_in_cooler_freezer_upgrade",
        "refrigeration_ec_motor_retrofit",
        "refrigeration_controls_retrofit",
        "anti_sweat_heater_controls",
        "door_gasket_strip_curtain_night_cover",
        "insulation_upgrade",
        "variable_frequency_drive_retrofit",
        "ev_charger_installation",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Project site must be a commercial electric customer of Estes Park Power and Communications, Fort Collins Utilities, Longmont Power & Communications, or City of Loveland Utilities.",
        "Applications must follow the current Efficiency Works Business program guide and rebates page.",
        "Preapproval is required for rebates greater than $10,000, all VFD projects, all EV charging infrastructure rebates, all custom projects, all study incentives, and all building tune-up incentives.",
        "If preapproval is required, it must be obtained before materials are ordered or work begins.",
        "Final paperwork must include required invoices, product documentation, and program forms within the current post-completion window.",
        "Level 2 public EV charging incentives require publicly accessible Level 2 EVSE; Level 1 and Level 3 chargers are not eligible under this specific incentive.",
        "Building envelope rebates are for existing buildings with air conditioning and/or electric heat and must meet insulation and product-rating requirements."
      ],
      "blockers": [
        "Water-only products should not match; current official guidance says Efficiency Works no longer processes water-only product incentives as of January 1, 2026.",
        "cool_roof_reflective_roof, window_replacement, and window_film_shading_retrofit were not supported by the current 2026 business guide reviewed and should not auto-match.",
        "high_efficiency_laundry_equipment and high_efficiency_commercial_dishwasher were not verified in the current 2026 business guide text reviewed and should not be inferred from older or generic appliance wording.",
        "High-efficiency DX air conditioners, chillers, heat pumps, and VRF equipment are not listed as direct prescriptive HVAC equipment rebates in the current guide; HVAC matches should focus on controls, economizers, DCV, and custom review unless a current rebate table confirms the specific equipment.",
        "EV charging is limited to public Level 2 infrastructure and requires preapproval; do not match private fleet-only, Level 1, or DC fast charging.",
        "Custom efficiency measures require measurable and verifiable savings or process electrification and cannot be matched solely from a technology keyword."
      ],
      "programType": "Rebate Program",
      "administrator": "Efficiency Works",
      "applicationUrl": null,
      "websiteUrl": "https://efficiencyworks.org/for-your-business-rebates-and-incentives/",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/5796/efficiency-works-business-energy-efficiency-rebate-program-offered-by-4-utilities",
        "https://efficiencyworks.org/for-your-business-rebates-and-incentives/",
        "https://efficiencyworks.org/wp-content/uploads/2025/02/Efficiency-Works-Business-Programs-Guide.pdf",
        "https://prpa.org/energy-efficiency/"
      ],
      "evidenceText": "The current Efficiency Works Business program guide, effective June 2026, lists business offerings for lighting efficiency, cooling controls, building envelope, foodservice equipment, grocery and refrigeration efficiency, office equipment and appliances, VFDs, Level 2 public EV charging infrastructure, and custom efficiency. It limits eligibility to commercial electric customers of Estes Park, Fort Collins, Longmont, or Loveland utilities and lists preapproval requirements for large, VFD, EV, custom, study, and building tune-up projects.",
      "reasoningNotes": "Most controls, lighting, refrigeration, VFD, envelope-insulation, kitchen vent hood, and public Level 2 EV matches are correct. Several older or generic water, window, cool-roof, and appliance matches are false positives under current 2026 materials."
    },
    "existingSimpleRules": [
      {
        "id": "oir_ec232f011f9f0bc7_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 1
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "100% of eligible project cost",
        "evidenceText": "It offers an additional incentive equal to 100% of the standard rebate , covering up to the total project cost for projects completed before November 15, 2026",
        "sourceUrlsChecked": [
          "https://efficiencyworks.org/business/rebates/"
        ],
        "reasoningNotes": "",
        "mapping": {
          "primarySavingsModelId": "refrigeration_electric_efficiency",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2620",
    "opportunityName": "Idaho Power - Easy Upgrades for Simple Retrofits Rebate Program",
    "state": "ID",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2620/idaho-power-easy-upgrades-for-simple-retrofits-rebate-program",
    "websiteUrl": "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-business/retrofits/",
    "applicationUrl": null,
    "administrator": "Idaho Power",
    "programType": "utility business retrofit, custom, new construction, tune-up, irrigation, multifamily, and demand response program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 14,
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
          "reflective roof"
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
        "retrofitTypeId": "hvac_controls_retrofit",
        "displayName": "HVAC controls retrofit",
        "parentCategory": "hvac_space_conditioning",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "hvac controls",
          "economizer"
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
          "lighting controls"
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
          "ID",
          "OR"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Idaho Power business electric service territory"
        ],
        "notes": "Target state is Oregon, but official Idaho Power retrofit offerings are state-specific for Idaho and Oregon customers."
      },
      "eligibleApplicantTypes": [
        "commercial",
        "industrial",
        "agricultural",
        "multifamily"
      ],
      "eligibleSectors": [
        "business",
        "commercial",
        "industrial",
        "agricultural",
        "irrigation",
        "multifamily",
        "small business"
      ],
      "eligibleRetrofitCategories": [
        "lighting",
        "HVAC / heat pump",
        "insulation / air sealing",
        "refrigeration",
        "motors / VFD",
        "demand response",
        "design assistance / study",
        "HVAC controls",
        "reflective roof",
        "commercial foodservice",
        "compressed air",
        "irrigation efficiency",
        "multifamily efficiency",
        "new construction and major renovation"
      ],
      "hardRequirements": [
        "Applicant must be an Idaho Power business customer in the applicable Idaho or Oregon service territory.",
        "The project state must be selected because retrofit forms and eligibility differ for Idaho and Oregon.",
        "Program continuation, eligibility, and terms apply.",
        "Custom projects and tune-up/study programs have separate requirements.",
        "Flex Peak is a demand response program and should not be classified as an upfront equipment rebate."
      ],
      "blockers": [
        "State-specific form and Idaho Power service territory must be confirmed before matching Oregon projects."
      ],
      "programType": "utility business retrofit, custom, new construction, tune-up, irrigation, multifamily, and demand response program",
      "administrator": "Idaho Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-business/retrofits/",
      "sourceUrlsChecked": [
        "https://www.idahopower.com/ways-to-save/savings-for-your-business/retrofits/",
        "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-business/retrofits/"
      ],
      "evidenceText": "Idaho Power lists business retrofits by Idaho/Oregon state selection and shows retrofit, custom, compressed-air, facility tune-up, Flex Peak, irrigation, multifamily, and new construction/major renovation offerings.",
      "reasoningNotes": "Official source confirms active business offerings and that Oregon matching must use state-specific Idaho Power forms."
    },
    "existingSimpleRules": [
      {
        "id": "oir_89f5708a0927936e_v1",
        "incentiveType": "fixed_per_unit_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "fixed_per_unit",
          "amountCentsPerUnit": 16000,
          "unitAnswerKey": "unit_count"
        },
        "basisPolicy": {
          "basis": "gross_project_cost",
          "applicationOrder": 10
        },
        "cap": null,
        "confidence": "high",
        "formula": "$160 per horsepower for floating head pressure controls",
        "evidenceText": "Idaho Power retrofit materials list floating head pressure controls at $160 per horsepower.",
        "sourceUrlsChecked": [
          "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-business/easy-upgrades/",
          "https://www.idahopower.com/accounts-service/billing-fees-and-payment/business-rates/easy-upgrades-retrofits/"
        ],
        "reasoningNotes": "Matched refrigeration controls. Use unit_count as eligible compressor horsepower.",
        "mapping": {
          "primarySavingsModelId": "whole_building_custom_efficiency",
          "incentiveValueMethod": "per_kwh_saved",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_a3980feba5394eaf_v1",
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
        "formula": "$50 per linear foot for anti-sweat heater controls",
        "evidenceText": "Idaho Power retrofit materials list anti-sweat heat controls at $50 per linear foot.",
        "sourceUrlsChecked": [
          "https://www.idahopower.com/energy-environment/ways-to-save/savings-for-your-business/easy-upgrades/",
          "https://www.idahopower.com/accounts-service/billing-fees-and-payment/business-rates/easy-upgrades-retrofits/"
        ],
        "reasoningNotes": "Matched refrigeration and anti-sweat heater terms. Use unit_count as eligible linear feet.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4653",
    "opportunityName": "Wabash Valley Power Association (23 Member Cooperatives) - Commercial and Industrial Energy Efficiency Program",
    "state": "IN",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4653/wabash-valley-power-association-23-member-cooperatives-commercial-and-industrial-energy-efficiency-program",
    "websiteUrl": "https://www.powermoves.com/rebates/business/",
    "applicationUrl": "https://www.powermoves.com/rebates/business/",
    "administrator": "Wabash Valley Power Alliance / PowerMoves",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 14,
    "targetKind": "existing_simple_rule_v2_repair",
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
          "IN"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Boone Power",
          "Carroll White REMC",
          "Fulton County REMC",
          "Heartland REMC",
          "Hendricks Power Cooperative",
          "Jasper County REMC",
          "Jay County REMC",
          "Kankakee Valley REMC",
          "Kosciusko REMC",
          "LaGrange County REMC",
          "Marshall County REMC",
          "Miami-Cass REMC",
          "Newton County REMC",
          "NineStar Connect",
          "Noble REMC",
          "Parke County REMC",
          "Steuben County REMC",
          "Warren County REMC"
        ],
        "notes": "This is the Indiana DSIRE record for the current WVPA PowerMoves C&I program. The official WVPA member list also includes Illinois cooperatives, but this repair is limited to the Indiana record."
      },
      "eligibleApplicantTypes": [
        "Non-residential electric members of participating WVPA member cooperatives",
        "Commercial customers",
        "Industrial customers",
        "Agricultural non-residential customers",
        "Institutional, nonprofit, public, or other non-residential customers served by a participating member cooperative"
      ],
      "eligibleSectors": [
        "Commercial",
        "Industrial",
        "Agricultural",
        "Institutional",
        "Nonprofit",
        "Government/Public",
        "Education",
        "Healthcare",
        "Hospitality/Lodging",
        "Retail",
        "Office",
        "Warehouse/Distribution",
        "Manufacturing",
        "Grocery/Cold storage",
        "Restaurant/Food service"
      ],
      "eligibleRetrofitCategories": [
        "LED lighting retrofit",
        "Lighting controls retrofit",
        "Exterior/site lighting retrofit",
        "High-efficiency HVAC replacement",
        "Heat pump HVAC retrofit",
        "Smart thermostat / zoning retrofit",
        "HVAC controls retrofit",
        "Ground-source / geothermal heat pump",
        "Heat pump water heater",
        "High-efficiency refrigeration equipment",
        "Refrigeration controls retrofit",
        "Refrigeration EC motor retrofit",
        "Anti-sweat heater controls",
        "Door gasket / strip curtain / night cover retrofit",
        "Energy management system",
        "Demand-controlled kitchen ventilation",
        "Variable frequency drive retrofit"
      ],
      "hardRequirements": [
        "Applicant must be a non-residential member of a participating electric cooperative.",
        "The facility/project must be on an existing electric account served by a participating cooperative line.",
        "Equipment must be new, meet program specifications, and be installed at the qualifying cooperative account.",
        "Prescriptive retrofit applications generally must be submitted within the required post-installation window; custom and new-construction projects require pre-purchase or design-stage review.",
        "For the 2026 program year, qualifying equipment must be installed and operational in the program year and submitted by the stated deadline.",
        "Funding is limited and processed first-come, first-served; the program may inspect projects or change offerings."
      ],
      "blockers": [
        "Do not use the outdated DSIRE title phrase 23 member cooperatives for territory matching; current official WVPA materials identify 21 member distribution cooperatives.",
        "Do not match Missouri Citizens Electric accounts to this WVPA record after May 31, 2025.",
        "Low-flow plumbing fixture retrofit was not found in current PowerMoves C&I materials and should not be included for this opportunity."
      ],
      "programType": "Rebate Program",
      "administrator": "Wabash Valley Power Alliance / PowerMoves",
      "applicationUrl": "https://www.powermoves.com/rebates/business/",
      "websiteUrl": "https://www.powermoves.com/rebates/business/",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/4653/wabash-valley-power-association-23-member-cooperatives-commercial-and-industrial-energy-efficiency-program",
        "https://www.powermoves.com/rebates/business/",
        "https://www.powermoves.com/wp-content/uploads/2026/01/2026-Web-CI-Booklet.pdf",
        "https://www.wvpa.com/who-we-are/member-co-ops/"
      ],
      "evidenceText": "PowerMoves' business page describes rebates for existing-building retrofit projects, prescriptive lighting and non-lighting retrofits, custom rebates, and new-construction rebates. The 2026 booklet states the C&I rebate program is for non-residential members of participating electric cooperatives and includes LED lighting, VFDs, HVAC, geothermal heat pumps, heat-pump water heaters, smart thermostats, guest-room energy management, demand-controlled kitchen ventilation, and refrigeration measures. Current WVPA membership is 21 distribution cooperatives.",
      "reasoningNotes": "The official source supports lighting, HVAC, heat pump, geothermal, heat-pump water heater, refrigeration, EMS, kitchen ventilation, and VFD matches. Low-flow fixtures were treated as a false keyword match because current PowerMoves materials did not show low-flow, aerator, faucet, or similar plumbing-fixture measures."
    },
    "existingSimpleRules": [
      {
        "id": "oir_a38d847ea1bbe99d_v1",
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
        "formula": "$75 per Wi-Fi smart thermostat on an air-source heat pump",
        "evidenceText": "PowerMoves 2026 non-lighting application lists Wi-Fi smart thermostat on air-source heat pump at $75.",
        "sourceUrlsChecked": [
          "https://www.powermoves.com/wp-content/uploads/2026/01/2026-Prescriptive-Non-Lighting.pdf",
          "https://www.powermoves.com/rebates/business/"
        ],
        "reasoningNotes": "Matched thermostat term. Use one unit as one qualifying thermostat.",
        "mapping": {
          "primarySavingsModelId": "commercial_kitchen_equipment_efficiency",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      },
      {
        "id": "oir_a83c7ac9329c034c_v1",
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
        "confidence": "high",
        "formula": "$750 per qualifying commercial heat pump water heater",
        "evidenceText": "PowerMoves 2026 non-lighting application lists Heat Pump Water Heater, UEF >=3.30, at $750/unit.",
        "sourceUrlsChecked": [
          "https://www.powermoves.com/wp-content/uploads/2026/01/2026-Prescriptive-Non-Lighting.pdf",
          "https://www.powermoves.com/rebates/business/"
        ],
        "reasoningNotes": "Matched heat pump water heater term. Use one unit as one qualifying commercial HPWH.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:4244",
    "opportunityName": "NYSEG (Electric) - Commercial and Industrial Efficiency Program",
    "state": "NY",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/4244/nyseg-electric-commercial-and-industrial-efficiency-program",
    "websiteUrl": "https://www.nyseg.com/smartenergy/businesssolutions/commercialandindustrialrebates",
    "applicationUrl": null,
    "administrator": "NYSEG",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 14,
    "targetKind": "existing_simple_rule_v2_repair",
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
          "refrigeration",
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
        "retrofitTypeId": "pump_fan_controls_retrofit",
        "displayName": "Pump/fan controls retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "fan controls"
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
        "retrofitTypeId": "variable_frequency_drive_retrofit",
        "displayName": "Variable frequency drive retrofit",
        "parentCategory": "motors_pumps_fans_drives",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "vfd",
          "variable speed drive"
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
          "NY"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "NYSEG electric service territory",
          "NYSEG natural gas service territory for gas measures where applicable"
        ],
        "notes": "The record name is NYSEG Electric C&I, but current NYSEG C&I efficiency materials include electric and natural gas customer pathways. Gas-specific measures require NYSEG gas service."
      },
      "eligibleApplicantTypes": [
        "NYSEG nonresidential electric customers",
        "NYSEG nonresidential natural gas customers where gas measures apply",
        "commercial customers",
        "industrial customers",
        "agricultural customers",
        "institutional customers",
        "multifamily or hospitality business customers where eligible",
        "contractors or trade allies submitting with customer authorization"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional",
        "hospitality",
        "grocery and refrigeration",
        "laundry",
        "compressed air",
        "process systems"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "hvac_controls_retrofit",
        "high_efficiency_boiler_retrofit",
        "boiler_controls_burner_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_refrigeration_equipment",
        "energy_management_system",
        "variable_frequency_drive_retrofit",
        "pump_fan_controls_retrofit",
        "efficient_air_compressor",
        "waste_heat_recovery",
        "steam_trap_replacement",
        "high_efficiency_laundry_equipment",
        "air_filtration_system",
        "demand_controlled_ventilation"
      ],
      "hardRequirements": [
        "Customer must be an eligible NYSEG nonresidential customer in the applicable electric or natural gas service class.",
        "Prescriptive and custom rebate projects must follow NYSEG program participation instructions and catalog requirements.",
        "Many projects require application submission and approval before installation, especially custom projects and larger prescriptive rebate totals.",
        "Rebates are generally limited by eligible project cost caps and measure-specific rules.",
        "Building electrification measures require an active NYSEG electric account and must follow current heat pump, heat pump water heater, and ground-source rules.",
        "Gas-only measures such as boilers, steam traps, and economizers require eligible gas service and should not be matched for electric-only customers."
      ],
      "blockers": [
        "Do not match gas boiler, steam trap, or boiler control measures to electric-only NYSEG customers.",
        "high_efficiency_laundry_equipment should be limited to listed commercial laundry measures such as ozone laundry, not generic washer replacement.",
        "air_filtration_system should be limited to process exhaust filtration or recirculation measures, not general IAQ filters.",
        "waste_heat_recovery should be limited to listed process, compressed-air, boiler, or refrigeration heat-recovery measures.",
        "Custom rebates require NYSEG preapproval and savings documentation; do not auto-match from a generic technology keyword alone.",
        "The old DSIRE website URL is stale; use current NYSEG Smart Energy C&I rebate and catalog pages."
      ],
      "programType": "Rebate Program",
      "administrator": "NYSEG",
      "applicationUrl": null,
      "websiteUrl": "https://www.nyseg.com/smartenergy/businesssolutions/commercialandindustrialrebates",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/4244/nyseg-electric-commercial-and-industrial-efficiency-program",
        "https://www.nyseg.com/smartenergy/businesssolutions/commercialandindustrialrebates",
        "https://www.nyseg.com/smartenergy/businesssolutions/commercialandindustrialrebates/commercial-and-industrial-rebate-catalogs",
        "https://www.nyseg.com/w/program-participation-instructions",
        "https://www.nyseg.com/documents/d/global/building-electrification-rebate-catalog-pdf"
      ],
      "evidenceText": "Current NYSEG C&I materials describe nonresidential electric and natural gas rebates, with catalogs for lighting, HVAC and refrigeration, process systems, agriculture, custom projects, and building electrification. Current listings include lighting controls, HVAC, boilers, economizers, steam traps, thermostats, demand-controlled ventilation, guestroom EMS, VFDs, compressed-air equipment, heat recovery, process filtration, ozone laundry, ground-source heat pumps, and heat pump water heaters.",
      "reasoningNotes": "The repair preserves a broad C&I portfolio but adds utility-service and preapproval boundaries, especially for gas measures and custom incentives."
    },
    "existingSimpleRules": [
      {
        "id": "oir_251bed1c6c161e08_v1",
        "incentiveType": "custom_efficiency_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "rate_per_kwh",
          "amountCentsPerKwh": 16,
          "kwhSource": "annual_kwh_delta_abs"
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxPercentOfBasis": 0.5
        },
        "confidence": "medium",
        "formula": "Electric custom incentives are the lesser of $0.16/kWh first-year savings or 50% of project cost",
        "evidenceText": "NYSEG/RG&E/O&R custom program materials use $0.16/kWh saved and a 50% project-cost cap for electric custom incentives.",
        "sourceUrlsChecked": [
          "https://www.nyseg.com/business-rebates-and-programs",
          "https://www.oru.com/en/save-money/rebates-incentives-credits/new-jersey-customers/incentives-for-business-customers-nj/custom-rebate-program"
        ],
        "reasoningNotes": "Matched refrigeration, controls and VFD custom terms. Use only for approved projects with verified annual kWh savings.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2516",
    "opportunityName": "Riverland Energy Cooperative - Commercial, Industrial, and Agricultural Energy Efficiency Rebate Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2516/riverland-energy-cooperative-commercial-industrial-and-agricultural-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.riverlandenergy.com/rebates",
    "applicationUrl": "https://www.riverlandenergy.com/rebates",
    "administrator": "Riverland Energy Cooperative",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 14,
    "targetKind": "existing_simple_rule_v2_repair",
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
          "Riverland Energy Cooperative electric service territory",
          "Focus on Energy participating utility territory where applicable"
        ],
        "notes": "Riverland rebates are for cooperative members. Some business incentives may be coordinated with Focus on Energy or other statewide Wisconsin efficiency resources."
      },
      "eligibleApplicantTypes": [
        "Riverland Energy Cooperative members",
        "commercial members",
        "industrial members",
        "agricultural members",
        "local government or institutional members where eligible",
        "business EV charger customers where eligible"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "agricultural",
        "institutional",
        "food service where eligible",
        "refrigeration where eligible",
        "transportation electrification"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "high_efficiency_refrigeration_equipment",
        "high_efficiency_commercial_dishwasher",
        "high_efficiency_oven",
        "variable_frequency_drive_retrofit",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "energy_audit"
      ],
      "hardRequirements": [
        "Applicant must be a Riverland Energy Cooperative member.",
        "Rebates cannot exceed the purchase price of the product.",
        "Rebate documentation must be submitted within the current post-installation window stated by Riverland.",
        "Current Riverland materials state that 2026 rebates are in place through December 18, 2026 and are subject to limited funds.",
        "Detailed forms control eligibility for commercial and agricultural efficiency, EV charger, HVAC, water-heating, and audit measures.",
        "Focus on Energy measures require participation in the applicable Wisconsin utility and program pathway."
      ],
      "blockers": [
        "high_efficiency_toilet_urinal and smart_irrigation_controller should not be matched unless a current Riverland or Focus on Energy business form explicitly supports those water-efficiency measures.",
        "Cool roof and window-film categories were not verified from the current Riverland sources reviewed and should not be auto-matched.",
        "Laundry and dishwasher matches should be limited to listed residential or commercial equipment forms, not broad water-efficiency categories.",
        "Energy audit is an assessment pathway and should not be treated as a physical retrofit.",
        "EV charging is a separate Riverland EV charger form and should be limited to qualifying chargers, not broad transportation projects."
      ],
      "programType": "Rebate Program",
      "administrator": "Riverland Energy Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://www.riverlandenergy.com/rebates",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/2516/riverland-energy-cooperative-commercial-industrial-and-agricultural-energy-efficiency-rebate-program",
        "https://www.riverlandenergy.com/rebates",
        "https://www.riverlandenergy.com/energy-efficiency-resources",
        "https://www.riverlandenergy.com/sites/default/files/2026-01/2026-incentive-form-ev-chargers_2.pdf",
        "https://www.riverlandenergy.com/sites/default/files/2026-02/riverland-february-2026-outlet.pdf",
        "https://focusonenergy.com/business/rebates"
      ],
      "evidenceText": "Riverland's current rebate page says the requestor must be a cooperative member, rebates are submitted within three months of purchase and installation, rebates are in place through December 18, 2026, and funds are limited. Current Riverland materials list HVAC, air-source and geothermal heat pump rebates, commercial and agricultural efficiency rebates, electric water heater rebates, energy audit rebates, and EV charger rebates.",
      "reasoningNotes": "The repair keeps only categories supported by current Riverland or Wisconsin Focus on Energy business-efficiency pathways and blocks unverified water-efficiency and building-envelope false positives."
    },
    "existingSimpleRules": [
      {
        "id": "oir_1985d6783591f74f_v1",
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
        "formula": "$500 per Level 2 EV charger on qualifying control or TOU program",
        "evidenceText": "Riverland EV charger incentive form lists electric vehicle charging station rebate at $500.",
        "sourceUrlsChecked": [
          "https://www.riverlandenergy.com/sites/default/files/2026-01/2026-incentive-form-ev-chargers_2.pdf",
          "https://www.riverlandenergy.com/electric-vehicles"
        ],
        "reasoningNotes": "Matched Level 2 EV charger terms. Confidence is medium because related web text shows varying charger amounts by program path.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5144",
    "opportunityName": "Residential Energy Efficiency Rebate (Offered by 18 Utilities)",
    "state": "IA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5144/residential-energy-efficiency-rebate-offered-by-18-utilities",
    "websiteUrl": "https://www.brightenergysolutions.com/members/manilla-municipal-utilities?rebates=residential",
    "applicationUrl": "https://www.brightenergysolutions.com/members/manilla-municipal-utilities?rebates=residential",
    "administrator": "Bright Energy Solutions / Missouri River Energy Services",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 13,
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
          "Alton",
          "Atlantic",
          "Denison",
          "Hartley",
          "Hawarden",
          "Kimballton",
          "Lake Park",
          "Manilla",
          "Orange City",
          "Paullina",
          "Pella",
          "Primghar",
          "Remsen",
          "Rock Rapids",
          "Sanborn",
          "Shelby",
          "Sioux Center",
          "Woodbine"
        ],
        "utilityTerritories": [
          "Participating Iowa municipal utilities served through Bright Energy Solutions / Missouri River Energy Services",
          "Manilla Municipal Utilities service territory for the current official page checked"
        ],
        "notes": "DSIRE describes the program as offered by 18 Iowa utilities. The current official page checked is the Manilla Municipal Utilities residential Bright Energy Solutions page; other member utility pages should be checked for local variations."
      },
      "eligibleApplicantTypes": [
        "residential municipal utility customers",
        "homeowners",
        "renters with owner approval where required",
        "residential EV charger customers",
        "participating contractors where required"
      ],
      "eligibleSectors": [
        "residential",
        "municipal utility residential",
        "transportation electrification"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "smart_thermostat_zoning_retrofit",
        "ground_source_geothermal_heat_pump",
        "heat_pump_water_heater",
        "ev_charger_installation",
        "level_2_ev_charger_installation",
        "high_efficiency_laundry_equipment",
        "high_efficiency_residential_dishwasher",
        "efficient_pump_replacement"
      ],
      "hardRequirements": [
        "Customer must be served by a participating Iowa Bright Energy Solutions municipal utility.",
        "Rebate availability and amounts may vary by local municipal utility; use the customer's utility-specific Bright Energy Solutions page.",
        "Equipment must meet ENERGY STAR, HVAC, geothermal, smart thermostat, EV charger, or other measure-specific requirements.",
        "EV charger rebates apply to qualifying residential Level 2 chargers, including a higher rebate for connected ChargePoint Home Flex equipment and a lower rebate for other qualifying Level 2 chargers on the current Manilla page.",
        "Clothes washer rebate on the reviewed Manilla page requires electric water heating.",
        "Applications require current forms, invoices, model information, and local utility submission requirements."
      ],
      "blockers": [
        "high_efficiency_commercial_dishwasher is a false positive for this residential record; current support is for residential ENERGY STAR dishwashers, not commercial dishwashers.",
        "refrigeration_ec_motor_retrofit is a business/commercial refrigeration measure and should not match this residential rebate record.",
        "high_efficiency_refrigeration_equipment was not listed on the current Manilla residential page reviewed and should not be inferred from business refrigeration pages.",
        "air_sealing_weatherization was not listed on the current Manilla residential page reviewed and should not be included for this record unless a specific participating utility page supports it.",
        "EV charging should be limited to residential Level 2 chargers and not public, commercial, fleet, or DC fast charging.",
        "Because utility-specific pages can vary, do not generalize a measure from one participating city to all 18 without checking that utility's current page."
      ],
      "programType": "Rebate Program",
      "administrator": "Bright Energy Solutions / Missouri River Energy Services",
      "applicationUrl": null,
      "websiteUrl": "https://www.brightenergysolutions.com/members/manilla-municipal-utilities?rebates=residential",
      "sourceUrlsChecked": [
        "https://programs.dsireusa.org/system/program/detail/5144/residential-energy-efficiency-rebate-offered-by-18-utilities",
        "https://www.brightenergysolutions.com/",
        "https://www.brightenergysolutions.com/members",
        "https://www.brightenergysolutions.com/members/manilla-municipal-utilities?rebates=residential",
        "https://www.brightenergysolutions.com/resources/home",
        "https://www.mrenergy.com/services/energy-efficiency",
        "https://www.mrenergy.com/news/bes-updates-several-rebates-for-2025"
      ],
      "evidenceText": "The current Bright Energy Solutions Manilla Municipal Utilities residential page lists 13 home rebates, including central A/C or heat-pump tune-up, clothes washer, dishwasher, electric vehicle chargers, heat-pump water heater, residential heating and cooling measures, residential lighting, room air conditioner, smart thermostat, air-source heat pumps, mini-split heat pumps, geothermal heat pumps, and domestic hot-water recirculating pumps.",
      "reasoningNotes": "The repair uses the current Manilla page as the official utility-specific source. It removes commercial refrigeration and commercial dishwasher false positives and flags local utility variation across the 18 Iowa municipal utilities."
    },
    "existingSimpleRules": [
      {
        "id": "oir_aee0e449976562f7_v1",
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
        "evidenceText": "$900 Residential Lighting (Gas) Download Form Earn up to $4 per fixture for ENERGY STAR LED recessed downlights",
        "sourceUrlsChecked": [
          "https://www.brightenergysolutions.com/members/manilla-municipal-utilities?rebates=residential"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1812",
    "opportunityName": "Marblehead Municipal Light Department - Residential Energy Efficiency Rebate Program",
    "state": "MA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1812/marblehead-municipal-light-department-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://marbleheadelectric.com/rebates-incentives.html",
    "applicationUrl": null,
    "administrator": "Marblehead Municipal Light Department",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 13,
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
          "Essex County"
        ],
        "cities": [
          "Marblehead"
        ],
        "utilityTerritories": [
          "Marblehead Municipal Light Department electric service territory"
        ],
        "notes": "Limited to MMLD residential electric customers and applicable NextZero Marblehead program rules."
      },
      "eligibleApplicantTypes": [
        "residential_electric_customer",
        "electric_account_owner"
      ],
      "eligibleSectors": [
        "residential",
        "multifamily"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "insulation_upgrade",
        "ground_source_geothermal_heat_pump",
        "heat_pump_hvac_retrofit",
        "high_efficiency_furnace_retrofit",
        "high_efficiency_boiler_retrofit",
        "heat_pump_water_heater",
        "smart_thermostat_zoning_retrofit",
        "residential_appliance_rebate",
        "connected_home_device_demand_response",
        "battery_storage_system",
        "level_2_ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be an MMLD electric account owner or eligible residential customer.",
        "Heat pumps must be installed by a Massachusetts licensed contractor and meet current program deadlines.",
        "Weatherization and duct measures may require audit, blower door, and post-installation inspection.",
        "Connected-home, EV, and battery measures follow separate enrollment or device requirements."
      ],
      "blockers": [
        "Induction cooking, laundry, and refrigeration should be treated as residential appliance rebates only when the current form lists them, not as commercial kitchen or refrigeration.",
        "Efficient fan or blower replacement is unsupported as a standalone category except where embedded in a qualifying furnace measure.",
        "Commercial measures are outside this residential program.",
        "EV, battery, and connected-home offerings are separate subprograms and require their own eligibility checks."
      ],
      "programType": "Rebate Program",
      "administrator": "Marblehead Municipal Light Department",
      "applicationUrl": null,
      "websiteUrl": "https://marbleheadelectric.com/rebates-incentives.html",
      "sourceUrlsChecked": [
        "https://marbleheadelectric.com/rebates-incentives.html",
        "https://nextzero.org/marblehead/heating-cooling/"
      ],
      "evidenceText": "Marblehead and NextZero pages list home audits, appliance rebates, connected homes, heat pumps, high-efficiency furnaces and boilers, and weatherization measures.",
      "reasoningNotes": "The repair keeps residential NextZero-supported measures and blocks commercial appliance interpretations."
    },
    "existingSimpleRules": [
      {
        "id": "oir_8050f5dcf03d41a0_v1",
        "incentiveType": "percent_of_basis_rebate",
        "timing": "upfront",
        "amountRule": {
          "kind": "percent_of_basis",
          "percent": 0.5
        },
        "basisPolicy": {
          "basis": "eligible_cost_categories",
          "applicationOrder": 10
        },
        "cap": {
          "maxAmountCents": 75000
        },
        "confidence": "high",
        "formula": "50% of purchase price for insulation, air sealing, or duct sealing, capped at $750",
        "evidenceText": "NextZero Marblehead page lists insulation, blower-door/air sealing, and duct sealing at 50% up to $750.",
        "sourceUrlsChecked": [
          "https://nextzero.org/marblehead/heating-cooling/",
          "http://marbleheadelectric.com/rebates-incentives.html"
        ],
        "reasoningNotes": "Matched insulation, air sealing and duct sealing terms. Use as project-level weatherization candidate.",
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
