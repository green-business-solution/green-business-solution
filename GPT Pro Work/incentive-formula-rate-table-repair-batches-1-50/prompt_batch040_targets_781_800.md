You are helping RetroFi repair incentive formulas, rate tables, grant estimates, tax credits, and non-cash workflow value rules.

Return strict JSON only. Do not include markdown, code fences, commentary, or citations outside JSON fields.

Batch: 40
Targets in this prompt: 781-800 of 984
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
  "batchNumber": 40,
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
  "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2279"
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3831",
    "opportunityName": "AEP (Central, SWEPCO and North) - Commercial Solutions Program",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3831/aep-central-swepco-and-north-commercial-solutions-program",
    "websiteUrl": "https://aeptxsaves.com/commercial-programs/",
    "applicationUrl": null,
    "administrator": "AEP Texas Energy Efficiency",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 4,
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
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "TX"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "AEP Texas electric service territory"
        ],
        "notes": "Legacy DSIRE naming included AEP Central, North and SWEPCO; current administrator pages route by AEP Texas service territory and program availability."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "industrial_customer",
        "institutional_customer",
        "nonresidential_customer",
        "project_sponsor",
        "energy_efficiency_service_provider"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "government",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "hvac_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "chiller_retrofit",
        "variable_frequency_drive_retrofit",
        "cool_roof_retrofit",
        "window_treatment_retrofit",
        "door_air_infiltration_reduction",
        "building_envelope_retrofit"
      ],
      "hardRequirements": [
        "Facility must be nonresidential and located within the AEP Texas service territory.",
        "Eligible measures and incentive paths vary by AEP Texas commercial program.",
        "Projects may require program registration, approved contractors or sponsor participation, documentation and verification.",
        "Funding is limited and subject to current program rules."
      ],
      "blockers": [
        "Do not generalize door air infiltration or envelope measures into residential air sealing or whole-home weatherization.",
        "Food service, load management and SMART Source solar appear as separate AEP Texas commercial programs unless the customer is applying under those program pages.",
        "Legacy commercial-solutions page content was dynamic; use current AEP Texas commercial program pages and contractor portal rules for active matching.",
        "Residential measures are outside this opportunity."
      ],
      "programType": "Rebate Program",
      "administrator": "AEP Texas Energy Efficiency",
      "applicationUrl": null,
      "websiteUrl": "https://aeptxsaves.com/commercial-programs/",
      "sourceUrlsChecked": [
        "https://aeptxsaves.com/commercial-programs/",
        "https://aeptexasefficiency.com/",
        "https://www.aeptexasefficiency.com/#/commercial/commercial-solutions",
        "https://aeptxsaves.com/contractor-portal/"
      ],
      "evidenceText": "AEP Texas commercial offerings list HVAC, building envelope, LED lighting and lighting or HVAC controls with Commercial Solutions among the applicable programs.",
      "reasoningNotes": "Original air sealing, LED, controls and HVAC matches are partly correct, but air sealing must be narrowed to approved commercial envelope or door-infiltration measures."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "AEP Texas commercial solutions are project- and savings-based; no reusable lighting or air-sealing formula was verified.",
        "sourceUrlsChecked": [
          "https://www.aeptexasefficiency.com/#/commercial/commercial-solutions"
        ],
        "reasoningNotes": "No safe per-kWh or measure rule should be created from inaccessible/dynamic program text.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5170",
    "opportunityName": "AEP (Central, SWEPCO and North) - SCORE Program for Schools",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5170/aep-central-swepco-and-north-score-program-for-schools",
    "websiteUrl": "https://www.aeptexasefficiency.com/#/commercial/score",
    "applicationUrl": null,
    "administrator": "AEP Texas Energy Efficiency",
    "programType": "Rebate Program And Technical Assistance",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 4,
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
        "retrofitTypeId": "building_benchmarking_compliance",
        "displayName": "Building benchmarking compliance",
        "parentCategory": "certifications_compliance",
        "isPhysicalRetrofit": false,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "benchmarking"
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "medium",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "TX"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "AEP Texas electric service territory"
        ],
        "notes": "Limited to eligible schools or educational facilities in AEP Texas territory."
      },
      "eligibleApplicantTypes": [
        "k_12_school",
        "school_district",
        "educational_facility",
        "institutional_customer"
      ],
      "eligibleSectors": [
        "education",
        "institutional"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "lighting_controls_retrofit",
        "hvac_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "chiller_retrofit",
        "variable_frequency_drive_retrofit",
        "building_envelope_retrofit",
        "door_air_infiltration_reduction",
        "energy_benchmarking_and_planning",
        "energy_master_planning"
      ],
      "hardRequirements": [
        "Applicant must be an eligible school or educational facility in AEP Texas service territory.",
        "Projects must use qualifying efficiency measures and current program participation steps.",
        "Financial incentives depend on verified savings, eligible measures and available funding.",
        "Technical assistance, benchmarking and planning support are not themselves physical retrofits."
      ],
      "blockers": [
        "Benchmarking support is planning or technical assistance, not building benchmarking compliance.",
        "Do not match general commercial applicants; non-school facilities should use other AEP Texas commercial programs.",
        "Do not generalize door air infiltration into residential weatherization.",
        "Load management and solar are separate AEP Texas programs."
      ],
      "programType": "Rebate Program And Technical Assistance",
      "administrator": "AEP Texas Energy Efficiency",
      "applicationUrl": null,
      "websiteUrl": "https://www.aeptexasefficiency.com/#/commercial/score",
      "sourceUrlsChecked": [
        "https://aeptxsaves.com/commercial-programs/",
        "https://aeptexasefficiency.com/",
        "https://www.aeptexasefficiency.com/#/commercial/score",
        "https://www.aeptexas.com/community/caring/view?id=10574"
      ],
      "evidenceText": "AEP Texas lists SCORE among commercial programs for HVAC, envelope, LED and controls; AEP Texas also reported school LED upgrades receiving efficiency incentives.",
      "reasoningNotes": "The LED and HVAC-related matches are plausible; benchmarking must be recast as technical assistance rather than a compliance retrofit."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "AEP Texas SCORE is a school efficiency program, but no reusable formula was verified.",
        "sourceUrlsChecked": [
          "https://www.aeptexasefficiency.com/#/commercial/score"
        ],
        "reasoningNotes": "School SCORE incentives are project- and savings-specific.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3840",
    "opportunityName": "El Paso Electric Company - Small Business and Large Commercial Programs",
    "state": "TX",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/3840/el-paso-electric-company-small-business-and-large-commercial-programs",
    "websiteUrl": "https://www.epelectric.com/energy-efficiency/texas-business-energy-efficiency",
    "applicationUrl": null,
    "administrator": "El Paso Electric",
    "programType": "Rebate And Custom Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
          "outdoor lighting"
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
        "currentMatchConfidence": 0.68,
        "matchBasis": "canonical_technology_fallback",
        "matchedTerms": []
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
          "El Paso"
        ],
        "utilityTerritories": [
          "El Paso Electric Texas service territory"
        ],
        "notes": "Limited to El Paso Electric business customers in Texas; New Mexico business programs are separate."
      },
      "eligibleApplicantTypes": [
        "small_business_customer",
        "large_commercial_customer",
        "school_customer",
        "city_customer",
        "county_customer",
        "commercial_customer",
        "industrial_customer",
        "self_sponsor",
        "participating_contractor_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "education",
        "municipal",
        "county_government"
      ],
      "eligibleRetrofitCategories": [
        "led_lighting_retrofit",
        "exterior_site_lighting_retrofit",
        "lighting_controls_retrofit",
        "high_efficiency_hvac_replacement",
        "high_efficiency_refrigeration_equipment",
        "building_envelope_improvement",
        "cool_roof",
        "commercial_foodservice_equipment",
        "pool_pump_retrofit",
        "pumps_motors_vfd",
        "custom_energy_efficiency_measure",
        "new_construction_energy_efficiency"
      ],
      "hardRequirements": [
        "Customer must be an El Paso Electric business customer in Texas.",
        "Small Commercial applies to businesses with less than 100 kW demand or up to 250 kW aggregate demand.",
        "Large Commercial Plus applies to school, city, county and large commercial customers with demand of 100 kW or more.",
        "Projects must improve energy efficiency and reduce peak kW demand for El Paso Electric.",
        "Participants must follow contractor or self-sponsor enrollment, pre-inspection, installation, post-inspection and incentive processes."
      ],
      "blockers": [
        "Do not match New Mexico business program measures to the Texas record.",
        "Do not match residential direct-install, residential low-flow, or residential appliance measures to this business program.",
        "Commercial Load Management is a separate curtailment program, not a retrofit rebate.",
        "Water conservation without electric peak-demand savings is out of scope."
      ],
      "programType": "Rebate And Custom Incentive",
      "administrator": "El Paso Electric",
      "applicationUrl": null,
      "websiteUrl": "https://www.epelectric.com/energy-efficiency/texas-business-energy-efficiency",
      "sourceUrlsChecked": [
        "https://www.epelectric.com/energy-efficiency/texas-business-energy-efficiency",
        "https://www.epelectric.com/energy-efficiency/texas-business-energy-efficiency/texas-small-commercial",
        "https://www.epelectric.com/energy-efficiency/texas-business-energy-efficiency/texas-small-commercial/eligible-projects",
        "https://www.epelectric.com/energy-efficiency/texas-business-energy-efficiency/large-commercial-plus",
        "https://www.epelectric.com/energy-efficiency/texas-business-energy-efficiency/large-commercial-plus/eligible-projects"
      ],
      "evidenceText": "El]( Paso Electric’s Texas business pages list Small Commercial and Large Commercial Plus incentives for lighting, controls, HVAC, refrigeration, envelope, cool roofs, food service, pool pumps and custom projects.",
      "reasoningNotes": "The supplied outdoor lighting, LED, HVAC and refrigeration matches are supported; low-flow or residential measures were excluded as separate or unsupported for this Texas business record."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "EPE commercial program pages did not expose a current outdoor-lighting or refrigeration formula in accessible text.",
        "sourceUrlsChecked": [
          "https://www.epelectric.com/energy-efficiency/texas-business-energy-efficiency-programs"
        ],
        "reasoningNotes": "No source-backed per-fixture or per-unit rule was verified.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22529",
    "opportunityName": "Community EV Chargers Incentive Program",
    "state": "VT",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22529/community-ev-chargers-incentive-program",
    "websiteUrl": "https://www.chargevermont.com/",
    "applicationUrl": "https://www.chargevermont.com/apply/",
    "administrator": "Charge Vermont",
    "programType": "Incentive Grant",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
        "retrofitTypeId": "ev_charger_installation",
        "displayName": "EV charger installation",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "ev charger",
          "evse"
        ]
      },
      {
        "retrofitTypeId": "ev_make_ready_electrical_upgrade",
        "displayName": "EV make-ready electrical upgrade",
        "parentCategory": "ev_charging_transportation",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "make ready",
          "make-ready"
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
          "VT"
        ],
        "counties": [
          "Addison County",
          "Bennington County",
          "Caledonia County",
          "Essex County",
          "Franklin County",
          "Grand Isle County",
          "Lamoille County",
          "Orange County",
          "Orleans County",
          "Rutland County",
          "Windham County",
          "Windsor County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Vermont electric utility service territories participating through Charge Vermont"
        ],
        "notes": "Funding is county-limited; Chittenden and Washington counties were fully subscribed, and Windsor County was nearly full."
      },
      "eligibleApplicantTypes": [
        "workplace_site_host",
        "multi_unit_residential_property_owner",
        "condominium_association",
        "government_entity",
        "nonprofit",
        "public_attraction_site_host"
      ],
      "eligibleSectors": [
        "commercial",
        "multifamily",
        "government",
        "nonprofit",
        "public_sector"
      ],
      "eligibleRetrofitCategories": [
        "level_1_ev_charger_installation",
        "level_2_ev_charger_installation",
        "ev_make_ready_electrical_upgrade"
      ],
      "hardRequirements": [
        "Applications are accepted first-come, first-served while funds remain through August 1, 2026.",
        "Workplace chargers must serve employees only, not patrons or visitors.",
        "Eligible projects must be in Vermont counties with remaining funding.",
        "Applicants must follow Charge Vermont design, installation, and equipment requirements."
      ],
      "blockers": [
        "Do not match DC fast charging unless public-attraction DCFC funding reopens; the public-attraction Level 2 and DCFC track was fully subscribed or on hold.",
        "Do not match Chittenden or Washington County projects while those counties remain fully subscribed.",
        "Do not match general building electrical upgrades unrelated to EV charging make-ready."
      ],
      "programType": "Incentive Grant",
      "administrator": "Charge Vermont",
      "applicationUrl": "https://www.chargevermont.com/apply/",
      "websiteUrl": "https://www.chargevermont.com/",
      "sourceUrlsChecked": [
        "https://www.vermontevchargers.com/",
        "https://www.chargevermont.com/",
        "https://www.chargevermont.com/apply/",
        "https://www.chargevermont.com/charger-options/",
        "https://www.chargevermont.com/workplace-chargers/",
        "https://www.chargevermont.com/multi-unit-residential-chargers/",
        "https://www.chargevermont.com/public-attraction-chargers/"
      ],
      "evidenceText": "Charge]( Vermont accepts applications for workplace and multi-unit residential chargers while funds remain, with county funding limits and a separate fully subscribed public-attraction track.",
      "reasoningNotes": "L1, L2, and make-ready are supported for open tracks; DCFC should be blocked because the current public-attraction DCFC funding track is not open."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Vermont community EV charger incentives depend on charger type, site, and funding round.",
        "sourceUrlsChecked": [
          "https://www.vermontevchargers.com/"
        ],
        "reasoningNotes": "No single reusable charger grant formula was verified for all target projects.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2320",
    "opportunityName": "Inland Power & Light Company - Residential Energy Efficiency Rebate Programs",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2320/inland-power-and-light-company-residential-energy-efficiency-rebate-programs",
    "websiteUrl": "https://www.inlandpower.com/residential-incentives-rebates",
    "applicationUrl": null,
    "administrator": "Inland Power & Light Company",
    "programType": "Residential Energy Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
          "exterior door"
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
          "WA",
          "ID"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Inland Power & Light"
        ],
        "notes": "Inland Power member homes in the cooperative service territory; DSIRE target is indexed in Washington."
      },
      "eligibleApplicantTypes": [
        "residential_members",
        "homeowners",
        "manufactured_home_owners"
      ],
      "eligibleSectors": [
        "residential",
        "manufactured_housing"
      ],
      "eligibleRetrofitCategories": [
        "window_replacement",
        "exterior_door_replacement",
        "heat_pump_hvac_retrofit",
        "ducted_heat_pump",
        "ductless_mini_split_heat_pump",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "smart_thermostat_zoning_retrofit",
        "energy_star_appliance",
        "energy_efficient_manufactured_home"
      ],
      "hardRequirements": [
        "Applicant must be a current Inland Power residential member.",
        "Window, door and insulation measures generally require eligible electrically heated existing homes and documentation such as photos or invoices.",
        "Ductless heat pumps must replace electric resistance heat and meet efficiency and contractor requirements.",
        "Heat pump water heaters must replace qualifying electric storage water heaters and meet product requirements.",
        "Rebate requests must be submitted within the specified post-installation window."
      ],
      "blockers": [
        "Inland Power states it does not currently offer EV charger rebates.",
        "Do not match natural gas or propane forced-air systems to ductless heat pump rebates where electric-resistance replacement is required.",
        "Do not broaden this residential program to commercial or industrial HVAC, lighting, motors or refrigeration."
      ],
      "programType": "Residential Energy Efficiency Rebate",
      "administrator": "Inland Power & Light Company",
      "applicationUrl": null,
      "websiteUrl": "https://www.inlandpower.com/residential-incentives-rebates",
      "sourceUrlsChecked": [
        "https://www.inlandpower.com/residential-incentives-rebates",
        "https://www.inlandpower.com/windows-doors",
        "https://www.inlandpower.com/heat-pumps",
        "https://www.inlandpower.com/hybrid-water-heaters",
        "https://www.inlandpower.com/insulation",
        "https://www.inlandpower.com/advanced-smart-thermo"
      ],
      "evidenceText": "Inland Power residential pages list rebates for windows and doors, heat pumps, hybrid water heaters, insulation, advanced smart thermostats, appliances and efficient manufactured homes, and state EV charger rebates are not currently offered.",
      "reasoningNotes": "Kept door, heat pump and insulation matches and added supported residential measures; removed EV and narrowed HVAC to heat pump programs."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Official page lists residential incentive categories, but whole-building per-kWh formula was not verified.",
        "sourceUrlsChecked": [
          "https://www.inlandpower.com/residential-incentives-rebates"
        ],
        "reasoningNotes": "Target is broad and includes envelope/HVAC measures; needs current measure table review.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5759",
    "opportunityName": "Lewis County PUD - Residential Energy Efficiency Rebate Program",
    "state": "WA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/5759/lewis-county-pud-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://www.lcpud.org/energy-efficiency/rebates/residential/",
    "applicationUrl": null,
    "administrator": "Lewis County PUD",
    "programType": "Residential Energy Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "medium",
    "currentPublicEdgeCount": 4,
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
          "Lewis County"
        ],
        "cities": [],
        "utilityTerritories": [
          "Lewis County PUD"
        ],
        "notes": "Residential customers in Lewis County PUD service territory."
      },
      "eligibleApplicantTypes": [
        "residential_customers",
        "homeowners",
        "manufactured_home_owners"
      ],
      "eligibleSectors": [
        "residential",
        "manufactured_housing"
      ],
      "eligibleRetrofitCategories": [
        "energy_audit",
        "heat_pump_hvac_retrofit",
        "ductless_mini_split_heat_pump",
        "ducted_heat_pump",
        "heat_pump_water_heater",
        "insulation_upgrade",
        "air_sealing_weatherization",
        "window_replacement",
        "energy_star_appliance",
        "energy_efficient_manufactured_home"
      ],
      "hardRequirements": [
        "Applicant must be an eligible Lewis County PUD residential customer.",
        "Energy audit is required before installation of weatherization measures for rebate eligibility.",
        "PUD audits are provided at no charge but do not make every recommended measure eligible.",
        "Heat pump rebates are tied to eligible electrically heated homes and contractor/program verification.",
        "Residential loan terms, if used, are separate and capped by current PUD loan rules."
      ],
      "blockers": [
        "Do not infer commercial, industrial, motors, VFDs or refrigeration measures from this residential program.",
        "Energy audit is a free service and eligibility gate, not broad payment for all retrofit types.",
        "Non-electric heating homes should not match heat pump rebates where current program terms require electric heat.",
        "Official pages returned access restrictions in browser, so full current measure specifications should be confirmed directly with Lewis County PUD."
      ],
      "programType": "Residential Energy Efficiency Rebate",
      "administrator": "Lewis County PUD",
      "applicationUrl": null,
      "websiteUrl": "https://www.lcpud.org/energy-efficiency/rebates/residential/",
      "sourceUrlsChecked": [
        "https://www.lcpud.org/energy-efficiency/rebates/residential/",
        "https://www.lcpud.org/energy-efficiency/energy-audit-request/",
        "https://www.lcpud.org/energy-efficiency/rebates/residential/windows-insulation-weatherization/",
        "https://www.lcpud.org/energy-efficiency/rebates/residential/heat-pumps/",
        "https://www.lcpud.org/energy-efficiency/rebates/residential/heat-pump-water-heaters/",
        "https://www.lcpud.org/energy-efficiency/energy-efficiency-loans/"
      ],
      "evidenceText": "Official Lewis County PUD snippets list residential rebates for heat pumps, heat pump water heaters, windows, insulation, appliances and manufactured homes, with audits required before weatherization work.",
      "reasoningNotes": "Confidence is medium because official pages were access-restricted in the browser, but official indexed snippets supported the current residential measure boundaries."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Lewis County PUD residential pages point to rebates and audits, but no current heat-pump or insulation amount was verified.",
        "sourceUrlsChecked": [
          "https://www.lcpud.org/save-energy/residential/",
          "https://www.lcpud.org/save-energy/rebates/"
        ],
        "reasoningNotes": "Matched audit terms and residential measures need application values before rule creation.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2051",
    "opportunityName": "Marshfield Utilities - Heat Pump Rebate Program",
    "state": "WI",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/2051/marshfield-utilities-heat-pump-rebate-program",
    "websiteUrl": "https://marshfieldutilities.org/efficiency-conservation/save-energy-money.php",
    "applicationUrl": "https://marshfieldutilities.org/efficiency-conservation/pdf/ground-source-appplication.pdf",
    "administrator": "Marshfield Utilities",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 4,
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
          "WI"
        ],
        "counties": [],
        "cities": [
          "Marshfield"
        ],
        "utilityTerritories": [
          "Marshfield Utilities electric service territory"
        ],
        "notes": "Rebate is limited to customers with direct Marshfield Utilities electric service at the installation address."
      },
      "eligibleApplicantTypes": [
        "residential_electric_utility_customer"
      ],
      "eligibleSectors": [
        "residential"
      ],
      "eligibleRetrofitCategories": [
        "ground_source_geothermal_heat_pump"
      ],
      "hardRequirements": [
        "Purchaser must be a Marshfield Utilities customer.",
        "Ground-source heat pump must be installed where direct Marshfield electric service is provided.",
        "Completed application, sales receipt, and customer and contractor information are required.",
        "Utility may inspect installation and funds are limited."
      ],
      "blockers": [
        "Do not match standard air-source heat pumps, general HVAC replacement, furnaces, boilers, or central air conditioning to this specific rebate.",
        "Smart thermostat rewards are a separate Focus on Energy-linked program on the same utility page.",
        "No support found for a general thermostat or zoning retrofit under the heat pump rebate."
      ],
      "programType": "Rebate Program",
      "administrator": "Marshfield Utilities",
      "applicationUrl": "https://marshfieldutilities.org/efficiency-conservation/pdf/ground-source-appplication.pdf",
      "websiteUrl": "https://marshfieldutilities.org/efficiency-conservation/save-energy-money.php",
      "sourceUrlsChecked": [
        "https://marshfieldutilities.org/efficiency-conservation/save-energy-money.php",
        "https://marshfieldutilities.org/efficiency-conservation/pdf/ground-source-appplication.pdf"
      ],
      "evidenceText": "The utility page lists a Ground-Source Heat Pump Rebate Application separately from Smart Thermostat Rewards. The application is for a ground-source heat pump rebate and requires direct Marshfield electric service.",
      "reasoningNotes": "Keep only ground-source geothermal heat pumps. The prior smart thermostat and broad heat pump/HVAC matches were false positives for this opportunity."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "Marshfield Utilities lists heat pump and smart thermostat rebate applications but the current official page did not expose the exact amount table.",
        "sourceUrlsChecked": [
          "https://marshfieldutilities.org/efficiency-conservation/save-energy-money.php",
          "https://programs.dsireusa.org/system/program/detail/2051"
        ],
        "reasoningNotes": "Do not rely on DSIRE alone; extract the current application before creating a rule.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22265",
    "opportunityName": "Chugach Electric - Commercial EV Charging Program",
    "state": "AK",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22265/chugach-electric-commercial-ev-charging-program",
    "websiteUrl": "https://www.chugachelectric.com/energy-solutions/beneficial-electrification/electric-vehicles/commercial-ev-charging-program",
    "applicationUrl": null,
    "administrator": "Chugach Electric Association",
    "programType": "EV Charging Account Credit",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "dc fast"
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
          "electric vehicle charging"
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
          "AK"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Chugach Electric Association"
        ],
        "notes": "Available to qualifying Chugach Electric small or large general service commercial members in the utility's service territory."
      },
      "eligibleApplicantTypes": [
        "commercial_member",
        "business_customer",
        "large_general_service_customer",
        "small_general_service_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "public"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "ev_charger_installation"
      ],
      "hardRequirements": [
        "Applicant must be a Chugach Electric small general service or large general service member.",
        "Charger must be a Level 2 charger installed at a commercial member location in Chugach service territory.",
        "Program credit is limited per charger and per account or location under current rules.",
        "Application, proof of purchase and proof of installation are required.",
        "Preapproval is recommended."
      ],
      "blockers": [
        "DC fast charger installation is not supported by the current official Chugach commercial EV charging program page.",
        "Residential chargers should not match this commercial member program.",
        "Chargers outside Chugach service territory are ineligible."
      ],
      "programType": "EV Charging Account Credit",
      "administrator": "Chugach Electric Association",
      "applicationUrl": null,
      "websiteUrl": "https://www.chugachelectric.com/energy-solutions/beneficial-electrification/electric-vehicles/commercial-ev-charging-program",
      "sourceUrlsChecked": [
        "https://www.chugachelectric.com/energy-solutions/electric-vehicles",
        "https://www.chugachelectric.com/energy-solutions/beneficial-electrification/electric-vehicles/commercial-ev-charging-program"
      ],
      "evidenceText": "Chugach's commercial EV charging page offers account credits for Level 2 chargers at commercial member locations, with limits per charger and account; it does not list DC fast chargers as eligible.",
      "reasoningNotes": "Retain EV charger and Level 2 categories only. Remove DC fast charging as a false-positive category for the current official program."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Commercial EV charger amounts were not verified from an accessible current official Chugach source.",
        "sourceUrlsChecked": [
          "https://www.chugachelectric.com/",
          "https://programs.dsireusa.org/system/program/detail/22265"
        ],
        "reasoningNotes": "Do not use DSIRE-only charger values as final proof when an official current formula was not accessible.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1958",
    "opportunityName": "Central Alabama Electric Cooperative - Residential Energy Efficiency Rebate Program",
    "state": "AL",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1958/central-alabama-electric-cooperative-residential-energy-efficiency-rebate-program",
    "websiteUrl": "https://caec.coop/member-benefits-services/heat-pumps/",
    "applicationUrl": null,
    "administrator": "Central Alabama Electric Cooperative",
    "programType": "Residential Heat Pump Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "mini split"
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
      }
    ],
    "repairedOpportunityData": {
      "confidence": "high",
      "availabilityStatus": "active",
      "geography": {
        "country": "US",
        "states": [
          "AL"
        ],
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "Central Alabama Electric Cooperative"
        ],
        "notes": "Available to qualifying residential members in Central Alabama Electric Cooperative service territory."
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
        "dual_fuel_heat_pump",
        "ductless_mini_split_heat_pump",
        "air_source_heat_pump",
        "manufactured_home_heat_pump_conversion"
      ],
      "hardRequirements": [
        "Rebates are for qualifying dual-fuel systems, mini-split systems, or manufactured-home heat pump replacements.",
        "Manufactured-home rebates apply when replacing an electric furnace with a heat pump under program rules.",
        "Installer license, invoice, load calculation, and equipment documentation may be required.",
        "Skirting inspection and minimum efficiency requirements apply where specified."
      ],
      "blockers": [
        "High-efficiency furnace retrofit is a false positive; the furnace term appears in dual-fuel or replacement context.",
        "Generic HVAC replacement should be narrowed to qualifying heat pump systems.",
        "Commercial and industrial measures are not supported by this residential heat pump page."
      ],
      "programType": "Residential Heat Pump Rebate",
      "administrator": "Central Alabama Electric Cooperative",
      "applicationUrl": null,
      "websiteUrl": "https://caec.coop/member-benefits-services/heat-pumps/",
      "sourceUrlsChecked": [
        "https://caec.coop/member-benefits-services/heat-pumps/"
      ],
      "evidenceText": "CAEC’s]( current heat-pump page lists residential rebates for dual-fuel systems, mini-splits, and manufactured-home heat-pump replacements, with installer, invoice, load calculation, and inspection requirements.",
      "reasoningNotes": "The heat pump and mini-split matches are supported. The high-efficiency furnace match should be blocked because the incentive is for heat pumps, not furnace upgrades."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official CAEC rebate source did not verify a current heat pump replacement formula.",
        "sourceUrlsChecked": [
          "https://caec.coop/energy-efficiency/"
        ],
        "reasoningNotes": "No safe one-time rule should be created without a current measure table.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1611",
    "opportunityName": "Alameda Municipal Power - Commercial New Construction Rebate Program",
    "state": "CA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/1611/alameda-municipal-power-commercial-new-construction-rebate-program",
    "websiteUrl": "https://www.alamedamp.com/243/New-Construction",
    "applicationUrl": null,
    "administrator": "Alameda Municipal Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "Alameda Municipal Power"
        ],
        "notes": "Limited to new commercial construction projects served by Alameda Municipal Power."
      },
      "eligibleApplicantTypes": [
        "commercial_customer",
        "business",
        "developer",
        "building_owner"
      ],
      "eligibleSectors": [
        "commercial",
        "new_construction"
      ],
      "eligibleRetrofitCategories": [
        "commercial_new_construction_whole_building_efficiency",
        "commercial_new_construction_lighting_efficiency",
        "commercial_new_construction_hvac_efficiency",
        "custom_energy_efficiency_project",
        "design_assistance"
      ],
      "hardRequirements": [
        "Project must be commercial new construction in Alameda Municipal Power service territory.",
        "Applicants should contact AMP early in design because the program supports design assistance and new-construction efficiency approaches.",
        "System-specific incentives are limited to eligible lighting and HVAC approaches, while other efficiency projects may require custom review.",
        "Rebate availability and amounts are subject to AMP program rules and funding."
      ],
      "blockers": [
        "Do not match high_efficiency_refrigeration_equipment; the current AMP new-construction page does not list refrigeration rebates.",
        "Do not match residential retrofits or existing-building HVAC replacement as this is a commercial new-construction program.",
        "Do not match general lighting retrofits unless the project is a qualifying commercial new-construction lighting efficiency measure."
      ],
      "programType": "Rebate Program",
      "administrator": "Alameda Municipal Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.alamedamp.com/243/New-Construction",
      "sourceUrlsChecked": [
        "https://www.alamedamp.com/243/New-Construction"
      ],
      "evidenceText": "AMP's]( New Construction page describes commercial new-construction incentives using whole-building, building-systems, and custom approaches; the listed building-systems examples are lighting and HVAC, not refrigeration.",
      "reasoningNotes": "The original refrigeration match is unsupported by the current official AMP page. HVAC and lighting are only appropriate within commercial new construction, not ordinary retrofit replacement."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Official page references design assistance, whole-building and building-systems approaches.",
        "sourceUrlsChecked": [
          "https://www.alamedamp.com/243/New-Construction"
        ],
        "reasoningNotes": "No current refrigeration or motor/VFD formula was found.",
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
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:controls-program",
    "opportunityName": "Controls Program",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/41502/638868861154100000",
    "administrator": "Silicon Valley Power",
    "programType": "Performance Based Controls Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
        "retrofitTypeId": "high_efficiency_hvac_replacement",
        "displayName": "High-efficiency HVAC replacement",
        "parentCategory": "hvac_space_conditioning",
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
          "Santa Clara"
        ],
        "cities": [
          "Santa Clara"
        ],
        "utilityTerritories": [
          "Silicon Valley Power"
        ],
        "notes": "Available to qualifying nonresidential Silicon Valley Power customers in Santa Clara."
      },
      "eligibleApplicantTypes": [
        "nonresidential_customer",
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "government_customer",
        "nonprofit_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government",
        "nonprofit",
        "institutional",
        "manufacturing"
      ],
      "eligibleRetrofitCategories": [
        "building_management_system_controls",
        "energy_management_system",
        "hvac_controls_retrofit",
        "industrial_process_controls",
        "automated_control_system",
        "fault_detection_diagnostics"
      ],
      "hardRequirements": [
        "Customer must obtain SVP preapproval before purchasing or installing equipment.",
        "Controls Program projects must produce more than eighty percent of savings from automated control strategies.",
        "Eligible measures are new control systems or significant expansions or upgrades of existing systems for HVAC or industrial process controls.",
        "Application must include project description, control energy-management capabilities, sequence of operations, engineering savings estimates, and commissioning or verification information."
      ],
      "blockers": [
        "High-efficiency HVAC equipment replacement is not the core eligible measure unless the controls program requirements are met.",
        "Low-flow water fixture retrofit is a false positive; fixture language refers to equipment fixtures or forms, not plumbing water conservation.",
        "Reprogramming existing controls belongs to SVP Building Optimization, not this Controls Program.",
        "The supplied application URL pointed to Building Optimization; the repaired application URL is the Controls Rebate Application."
      ],
      "programType": "Performance Based Controls Rebate",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/41502/638868861154100000",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/41502/638868861154100000",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/77723/638894793575200000",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/74366/638868860247070000"
      ],
      "evidenceText": "SVP’s]( Controls Program covers automated control systems with advanced energy management capabilities for building air conditioning or industrial process controls, with performance-based rebates and preapproval requirements.",
      "reasoningNotes": "Energy management and HVAC/process controls are supported. Generic HVAC replacement and water fixtures are false positives, and the target application URL needed correction."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "SVP controls application was checked but no simple per-unit HVAC controls formula was verified in accessible text.",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/rebates",
          "https://www.siliconvalleypower.com/home/showpublisheddocument/74366/638868860247070000"
        ],
        "reasoningNotes": "Controls incentives appear project- or savings-specific; no safe one-time rule was selected.",
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
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:customer-directed-rebate",
    "opportunityName": "Customer Directed Rebate",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/41500/638875757591930000",
    "administrator": "Silicon Valley Power",
    "programType": "Custom Energy Efficiency Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "combined_heat_and_power_system",
        "displayName": "Combined heat and power system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "cogeneration"
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
          "CA"
        ],
        "counties": [
          "Santa Clara"
        ],
        "cities": [
          "Santa Clara"
        ],
        "utilityTerritories": [
          "Silicon Valley Power"
        ],
        "notes": "Available to qualifying nonresidential Silicon Valley Power customers in Santa Clara for custom efficiency measures not covered by other SVP offerings."
      },
      "eligibleApplicantTypes": [
        "nonresidential_customer",
        "business_customer",
        "commercial_customer",
        "industrial_customer",
        "government_customer",
        "nonprofit_customer"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "government",
        "nonprofit",
        "institutional",
        "manufacturing"
      ],
      "eligibleRetrofitCategories": [
        "custom_energy_efficiency",
        "custom_lighting_efficiency",
        "custom_hvac_efficiency",
        "refrigeration_efficiency",
        "economizer_efficiency",
        "compressed_air_efficiency",
        "fan_pump_system_efficiency",
        "chilled_water_plant_efficiency",
        "custom_process_efficiency"
      ],
      "hardRequirements": [
        "Customer must be an SVP nonresidential customer and receive written preapproval before installation.",
        "Project must decrease electrical usage at the SVP-served facility and be approved by an SVP engineer.",
        "Equipment must be permanently installed with demonstrable savings expected for at least five years.",
        "Application, calculations, pre- and post-inspections, documentation, and measurement and verification may be required.",
        "Incentives are capped by project cost and program rules."
      ],
      "blockers": [
        "Cogeneration, self-generation, and fuel switching are expressly ineligible and should not be matched.",
        "Low-flow water fixture retrofit is unsupported; this is an electric efficiency custom rebate, not a water conservation program.",
        "Projects with more than eighty percent savings from automated controls should use the SVP Controls Program instead.",
        "Large data center projects are handled under SVP’s separate Data Center Program.",
        "Measures covered by other standard SVP programs may be redirected and should not be generalized into this custom rebate."
      ],
      "programType": "Custom Energy Efficiency Rebate",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/41500/638875757591930000",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/41500/638875757591930000",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/58540/638875759726770000"
      ],
      "evidenceText": "SVP’s]( Customer Directed Rebate covers unique nonresidential electric-efficiency projects such as chilled water plants, air compressors, fan and pump systems, and process measures, while excluding cogeneration and self-generation.",
      "reasoningNotes": "Custom electric efficiency is supported. The original cogeneration and low-flow fixture matches are false positives; HVAC should be limited to custom electric-saving measures not covered by other SVP programs."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "SVP Customer Directed Rebate is a custom/electrification offering with project-specific savings and measure requirements.",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/rebates",
          "https://www.siliconvalleypower.com/businesses/electrification-programs-rebates"
        ],
        "reasoningNotes": "No single HVAC/electrification formula was safely selected for the target.",
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
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:data-center-program",
    "opportunityName": "Data Center Program",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/41504/638881794790570000",
    "administrator": "Silicon Valley Power",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
    "targetKind": "reviewed_no_rule_reclassification",
    "currentRelatedRetrofits": [
      {
        "retrofitTypeId": "combined_heat_and_power_system",
        "displayName": "Combined heat and power system",
        "parentCategory": "solar_renewable_electricity",
        "isPhysicalRetrofit": true,
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "cogeneration"
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
          "CA"
        ],
        "counties": [
          "Santa Clara County"
        ],
        "cities": [
          "Santa Clara"
        ],
        "utilityTerritories": [
          "Silicon Valley Power"
        ],
        "notes": "Eligible data center facility must be in Silicon Valley Power's electric service territory in the City of Santa Clara."
      },
      "eligibleApplicantTypes": [
        "business_customers",
        "commercial_customers",
        "industrial_customers",
        "data_center_operators",
        "corporations",
        "partnerships",
        "sole_proprietors",
        "nonprofits",
        "government_entities"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "data_center",
        "telecommunications",
        "government",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "data_center_cooling_efficiency",
        "data_center_fan_energy_reduction",
        "data_center_chiller_efficiency",
        "data_center_liquid_cooling",
        "data_center_heat_exchanger",
        "data_center_vfd_controls",
        "data_center_economizer_optimization"
      ],
      "hardRequirements": [
        "Facility must be in Silicon Valley Power service territory.",
        "Facility or space must primarily house IT or telecommunications equipment.",
        "Retrofit projects must meet program load thresholds of more than 350 kW IT server load or more than 100 tons IT cooling load.",
        "Project must decrease electrical usage at the data center facility.",
        "Applicant must contact Silicon Valley Power for eligibility screening and submit signed application materials and savings calculations.",
        "Pre-installation inspection and written pre-approval are required before purchase or installation.",
        "Measurement and verification and post-installation inspection are required.",
        "Savings must persist for at least five years.",
        "Applicant cannot receive other Silicon Valley Power rebates for the same project."
      ],
      "blockers": [
        "Self-generation, cogeneration, and fuel switching are not eligible under the Data Center Program.",
        "Low-flow fixture, plumbing, and water-efficiency measures are unsupported false-positive matches.",
        "Generic HVAC replacement outside data center cooling or fan-energy savings is not enough for matching.",
        "Projects installed, purchased, or completed before written pre-approval are ineligible.",
        "Virtualization, server consolidation, and easily removed equipment are ineligible.",
        "Measures eligible under other Silicon Valley Power programs should be matched to the separate applicable program."
      ],
      "programType": "Rebate Program",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/41504/638881794790570000",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/41504/638881794790570000",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/84943/638935341760800000",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/87487/638881819076400000"
      ],
      "evidenceText": "SVP lists a Data Center Program for facilities in its territory with IT server loads above 350 kW or cooling loads above 100 tons. Eligible retrofits must reduce electrical use; self-generation, cogeneration, fuel switching, and projects installed before preapproval are ineligible.",
      "reasoningNotes": "Preserved only data-center-specific electric efficiency categories. Removed combined heat and power and water fixture matches as explicit ineligible or unsupported categories. The checked application is a 2025-2026 form and may be superseded after July 1, but the official business rebates page still lists the program."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "SVP data center materials describe eligible efficiency projects and a $1,500,000 program-year maximum, but no reusable supported formula was verified.",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/rebates",
          "https://www.siliconvalleypower.com/home/showpublisheddocument/41504/638881794790570000",
          "https://www.siliconvalleypower.com/home/showpublisheddocument/87487/638881819076400000"
        ],
        "reasoningNotes": "The program appears custom/PUE-based and needs SVP engineering preapproval; a cap alone is not a calculable rule.",
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
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:energy-design-assistance",
    "opportunityName": "Energy Design Assistance",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/save-money",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/save-money",
    "applicationUrl": null,
    "administrator": "Silicon Valley Power",
    "programType": "Technical Assistance / Rebate Support Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "Santa Clara County"
        ],
        "cities": [
          "Santa Clara"
        ],
        "utilityTerritories": [
          "Silicon Valley Power electric service territory"
        ],
        "notes": "Applies to commercial and industrial customers and projects served by Silicon Valley Power in Santa Clara."
      },
      "eligibleApplicantTypes": [
        "Silicon Valley Power commercial customers",
        "industrial customers",
        "building owners",
        "developers",
        "design teams",
        "customers planning major facility retrofits",
        "customers planning new construction or facility expansion"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional_limited",
        "new_construction",
        "major_renovation"
      ],
      "eligibleRetrofitCategories": [
        "energy_design_assistance",
        "technical_assistance",
        "new_construction_major_renovation",
        "building_envelope_design",
        "hvac_design_assistance",
        "lighting_design_assistance",
        "mechanical_electrical_systems_design",
        "interior_lighting_new_construction",
        "exterior_lighting_new_construction",
        "chillers_new_construction",
        "unitary_air_conditioner_new_construction",
        "heat_pump_hvac_new_construction",
        "design_team_incentive"
      ],
      "hardRequirements": [
        "Project must be served by Silicon Valley Power in Santa Clara.",
        "Energy Design Assistance is intended for commercial and industrial customers during major facility retrofits and new construction, preferably at or near the building-program development stage.",
        "SVP reviews drawings and specifications and recommends energy-saving options for envelope, HVAC, lighting, mechanical and electrical systems.",
        "Any associated equipment incentive or new-construction rebate requires the applicable SVP application, calculator, preapproval and equipment approval before purchase or installation.",
        "New construction incentives apply to eligible nonresidential new buildings, additions and qualifying major renovations under current SVP rules."
      ],
      "blockers": [
        "Matched term fixture should not be treated as an arbitrary lighting-fixture retrofit under this record; Energy Design Assistance is a design and technical-assistance pathway, with separate incentive rules for eligible new-construction or retrofit equipment.",
        "Residential measures are not supported by this business program.",
        "EV charging, data center incentives and customer-directed electrification rebates are separate SVP program sections and should not be merged into this Energy Design Assistance repair.",
        "Do not calculate incentive value from this record without the project pathway, SVP preapproval and applicable calculator or application."
      ],
      "programType": "Technical Assistance / Rebate Support Program",
      "administrator": "Silicon Valley Power",
      "applicationUrl": null,
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/save-money",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/save-money",
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/85534/638894799956900000"
      ],
      "evidenceText": "Silicon Valley Power's business Save Money page describes Energy Design Assistance for commercial and industrial customers during major facility retrofits and new construction, including review of construction drawings and recommendations for building envelope, HVAC, lighting, mechanical and electrical systems. SVP's current new-construction rebate materials support eligible nonresidential new construction, additions and major renovations with preapproval for lighting, chillers, unitary AC and heat-pump equipment.",
      "reasoningNotes": "The opportunity is active, but it is primarily a technical-assistance and design-support pathway, not a standalone fixture rebate. Eligible categories were limited to design assistance and associated SVP new-construction/major-renovation measure areas."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Energy Design Assistance is a design-assistance or study support offering, not a direct equipment rebate formula.",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/save-money",
          "https://www.siliconvalleypower.com/businesses/rebates"
        ],
        "reasoningNotes": "Design assistance and audit-only services should not be modeled as upfront project savings.",
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
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:aesc_inc_com_groceries_restaurants_and_food_storage_program",
    "opportunityName": "Groceries, Restaurants and Food Storage Program",
    "state": "CA",
    "sourceName": "San Diego Gas & Electric Business Programs",
    "sourceUrl": "https://www.sdge.com/business/save-energy-and-money",
    "websiteUrl": "https://aesc-inc.com/grfs-program",
    "applicationUrl": "https://aesc-inc.com/grfs-program",
    "administrator": "San Diego Gas & Electric",
    "programType": "Energy Efficiency Incentive",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "battery storage"
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
          "San Diego County"
        ],
        "cities": [],
        "utilityTerritories": [
          "San Diego Gas & Electric"
        ],
        "notes": "Targets eligible grocery stores, restaurants, and food storage warehouses in SDG&E territory."
      },
      "eligibleApplicantTypes": [
        "sdge_commercial_customers",
        "grocery_store_operators",
        "restaurant_operators",
        "food_storage_warehouse_operators",
        "enrolled_aggregators"
      ],
      "eligibleSectors": [
        "commercial",
        "grocery",
        "restaurant",
        "food_storage",
        "small_business"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_refrigeration_equipment",
        "refrigeration_controls_optimization",
        "commercial_food_service_equipment",
        "commercial_hvac_retrofit",
        "commercial_lighting_retrofit",
        "commercial_water_heating_retrofit",
        "commercial_kitchen_ventilation_controls"
      ],
      "hardRequirements": [
        "Customer site must be an eligible SDG&E commercial grocery, restaurant, or food storage facility.",
        "Projects are delivered through enrolled aggregators under the GRFS program.",
        "Savings are paid or measured through approved population NMEC, site NMEC, or deemed rebate pathways.",
        "Projects must comply with program manual rules, measure eligibility, documentation, and no-double-dipping requirements.",
        "Funds are first-come first-served and the program may be modified or terminated."
      ],
      "blockers": [
        "Battery storage is not an eligible retrofit; the program manual treats solar or battery storage installations near the project as an NMEC ineligibility issue.",
        "Demand response participation is separate; DR event days are handled in measurement rules and do not make automated demand response controls an eligible GRFS retrofit.",
        "Residential appliances, home weatherization, and non-food-sector commercial projects should not match."
      ],
      "programType": "Energy Efficiency Incentive",
      "administrator": "San Diego Gas & Electric",
      "applicationUrl": "https://aesc-inc.com/grfs-program",
      "websiteUrl": "https://aesc-inc.com/grfs-program",
      "sourceUrlsChecked": [
        "https://www.sdge.com/business/save-energy-and-money",
        "https://aesc-inc.com/groceries-restaurants-and-food-storage-program",
        "https://aesc-inc.com/grfs-program",
        "https://cedars.cpuc.ca.gov/programs/SDGE4169/details/",
        "https://cedars.cpuc.ca.gov/documents/download/3385/mainchange_summary%7Cmain%7Credline%29/"
      ],
      "evidenceText": "AESC and SDG&E describe GRFS as an aggregator-delivered commercial energy efficiency program for grocery, restaurant, and food storage customers, with refrigeration, foodservice, HVAC, lighting, and water-heating measures.",
      "reasoningNotes": "Refrigeration is correct. Battery storage and automated demand response controls are false positives or separate-program concepts, not eligible GRFS retrofit categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "Program materials describe grocery/restaurant/food-storage incentives and possible demand response/storage measures, but no reusable upfront formula was verified.",
        "sourceUrlsChecked": [
          "https://aesc-inc.com/groceries-restaurants-and-food-storage-program/",
          "https://www.sdge.com/business/save-energy-and-money"
        ],
        "reasoningNotes": "Battery and demand-response components are not one-time, and refrigeration incentives require measure-specific tables.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "project_cost_reduction_only",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_equipment_details",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:hvac-system-and-heat-pump-rebates",
    "opportunityName": "HVAC System and Heat Pump Rebates",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/53818/638874783876570000",
    "administrator": "Silicon Valley Power",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
        "currentMatchConfidence": 0.86,
        "matchBasis": "text_or_source_technology",
        "matchedTerms": [
          "air conditioner",
          "air conditioning"
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
          "CA"
        ],
        "counties": [],
        "cities": [
          "Santa Clara"
        ],
        "utilityTerritories": [
          "Silicon Valley Power"
        ],
        "notes": "Nonresidential SVP electric service territory in the City of Santa Clara."
      },
      "eligibleApplicantTypes": [
        "businesses",
        "commercial_customers",
        "industrial_customers",
        "institutional_customers",
        "local_governments",
        "nonprofits",
        "multifamily_property_owners"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "municipal",
        "nonprofit",
        "multifamily_nonresidential_common_area"
      ],
      "eligibleRetrofitCategories": [
        "high_efficiency_hvac_replacement",
        "heat_pump_hvac_retrofit",
        "advanced_rooftop_unit_controls"
      ],
      "hardRequirements": [
        "Applicant must be a nonresidential Silicon Valley Power customer.",
        "Customer must submit a preapproval application before purchase or installation.",
        "Installed equipment must meet qualifying efficiency and equipment specifications.",
        "Required invoices, specifications and supporting documentation must be submitted.",
        "Inspection or verification may be required before rebate payment."
      ],
      "blockers": [
        "Low-flow fixture retrofit is unsupported and is a false-positive match from the word fixture.",
        "This is not a plumbing or water-efficiency rebate.",
        "Residential projects are not eligible under this business rebate.",
        "Equipment purchased or installed before preapproval may be ineligible."
      ],
      "programType": "Rebate",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/53818/638874783876570000",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/53818/638874783876570000",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/80859/638868864084830000",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/67816/638868865500300000"
      ],
      "evidenceText": "SVP business rebate page supports rebates for new efficient air conditioners, heat pumps and advanced rooftop controls; customers must apply for preapproval before installation.",
      "reasoningNotes": "Efficient air conditioners, heat pumps and advanced rooftop controls are supported. The low-flow fixture match should be removed."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "unavailable",
        "confidence": "medium",
        "evidenceText": "SVP rebate page says the Heat Pump HVAC rebate program ended January 31, 2026 and to check back July 1, 2026.",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/rebates",
          "https://www.siliconvalleypower.com/businesses/rebates"
        ],
        "reasoningNotes": "As of June 28, 2026 the program is between published rounds, so no current rule should be merged.",
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
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:new-construction-incentives",
    "opportunityName": "New Construction Incentives",
    "state": "CA",
    "sourceName": "Silicon Valley Power Business Programs",
    "sourceUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
    "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/41520/638868867879470000",
    "administrator": "Silicon Valley Power",
    "programType": "Rebate",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "Santa Clara"
        ],
        "utilityTerritories": [
          "Silicon Valley Power electric service territory"
        ],
        "notes": "For nonresidential projects in SVP territory, including new construction, additions, and qualifying major renovations."
      },
      "eligibleApplicantTypes": [
        "nonresidential_customer",
        "commercial_customer",
        "industrial_customer",
        "institutional_customer",
        "government_customer",
        "design_team"
      ],
      "eligibleSectors": [
        "commercial",
        "industrial",
        "institutional",
        "government",
        "nonprofit"
      ],
      "eligibleRetrofitCategories": [
        "new_construction_led_lighting",
        "new_construction_high_efficiency_hvac",
        "air_cooled_chiller",
        "packaged_ac_or_heat_pump_efficiency",
        "high_performance_nonresidential_new_construction"
      ],
      "hardRequirements": [
        "Project must be nonresidential new construction, an addition, or a major renovation with new HVAC or lighting systems.",
        "Preapproval is required before equipment installation.",
        "Equipment must be new and installed at the SVP-served facility.",
        "Project permit and installation timing must meet current application rules.",
        "Lighting and HVAC measures must meet the specified technical criteria and documentation requirements."
      ],
      "blockers": [
        "Do not match low-flow fixtures; fixture references are lighting fixtures, not water-efficiency fixtures.",
        "Do not treat this as a normal existing-building retrofit unless the project is a qualifying addition or major renovation.",
        "Residential projects are not eligible.",
        "Installed equipment without required preapproval should not match."
      ],
      "programType": "Rebate",
      "administrator": "Silicon Valley Power",
      "applicationUrl": "https://www.siliconvalleypower.com/home/showpublisheddocument/41520/638868867879470000",
      "websiteUrl": "https://www.siliconvalleypower.com/businesses/rebates",
      "sourceUrlsChecked": [
        "https://www.siliconvalleypower.com/businesses/rebates",
        "https://www.siliconvalleypower.com/home/showpublisheddocument/41520/638868867879470000"
      ],
      "evidenceText": "SVP's new construction application covers nonresidential projects and lists lighting, air-cooled chillers, packaged air conditioners or heat pumps, and high-performance building options.",
      "reasoningNotes": "The lighting and new-construction HVAC matches are supported; the low-flow fixture match is a false positive from lighting fixture terminology."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "formula_not_found",
        "confidence": "medium",
        "evidenceText": "SVP new construction incentives appear design- or project-specific; no fixture/HVAC amount was verified.",
        "sourceUrlsChecked": [
          "https://www.siliconvalleypower.com/businesses/rebates"
        ],
        "reasoningNotes": "No clear calculable one-time rule found for the target terms.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22761",
    "opportunityName": "City and County of Denver - Green Workforce Mini Grant",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22761/city-and-county-of-denver-green-workforce-mini-grant",
    "websiteUrl": "https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-Resiliency/Programs-Services/Workforce-Development/Green-Workforce-Funding",
    "applicationUrl": "https://denver-casr.submittable.com/submit",
    "administrator": "City and County of Denver Office of Climate Action, Sustainability and Resiliency",
    "programType": "Workforce Training Grant",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "Denver"
        ],
        "cities": [
          "Denver"
        ],
        "utilityTerritories": [],
        "notes": "Program serves Denver green workforce outcomes; proposals must connect Denver employers and Denver Metro workforce candidates."
      },
      "eligibleApplicantTypes": [
        "nonprofit",
        "training_provider",
        "for_profit_training_provider",
        "community_college",
        "technical_college"
      ],
      "eligibleSectors": [
        "workforce_development",
        "education",
        "nonprofit",
        "training"
      ],
      "eligibleRetrofitCategories": [],
      "hardRequirements": [
        "Applicant must be a nonprofit, training provider, for-profit apprenticeship or training organization, community college, or technical college under current rules.",
        "Proposal must describe Denver employers and Denver Metro candidates served.",
        "Projects must support green workforce training and generally fit within a twelve-month timeline.",
        "Current round requires application materials such as budget, W-9, and certificate of good standing; 2026 round closes July 10, 2026 at noon."
      ],
      "blockers": [
        "This is not a physical retrofit rebate or installation grant.",
        "Battery storage, EV technology, and infrastructure are eligible career pathways, not eligible building retrofit categories.",
        "Do not match EV charger installation, battery storage installation, or HVAC replacement to this opportunity."
      ],
      "programType": "Workforce Training Grant",
      "administrator": "City and County of Denver Office of Climate Action, Sustainability and Resiliency",
      "applicationUrl": "https://denver-casr.submittable.com/submit",
      "websiteUrl": "https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-Resiliency/Programs-Services/Workforce-Development/Green-Workforce-Funding",
      "sourceUrlsChecked": [
        "https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-Resiliency/Programs-Services/Workforce-Development/Green-Workforce-Funding",
        "https://denver-casr.submittable.com/submit"
      ],
      "evidenceText": "Denver’s]( current Green Workforce Mini Grant funds training and workforce pathways, including clean energy, EV technology and infrastructure, and battery storage careers, not installation rebates.",
      "reasoningNotes": "All supplied physical retrofit categories are false positives. This should remain a workforce development grant with no eligible retrofit categories."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Green Workforce Mini Grant is a workforce/capacity grant, not a direct retrofit equipment incentive.",
        "sourceUrlsChecked": [
          "https://denver-casr.submittable.com/submit/205717d9-7f91-44e6-8ba8-e7363f94055e/green-workforce-mini-grant-2025"
        ],
        "reasoningNotes": "The grant does not map to a one-time customer project rebate/grant rule for energy savings measures.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "grant_funding",
          "incentiveValueMethod": "grant_amount",
          "calculationReadiness": "needs_quote",
          "calculationInputNeed": null
        }
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22301",
    "opportunityName": "San Isabel Electric Association - Electric Vehicle Charger Rebates",
    "state": "CO",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22301/san-isabel-electric-association-electric-vehicle-charger-rebates",
    "websiteUrl": "https://siea.com/wp-content/uploads/2023/04/EvChargerRebateFlyer_2026.pdf",
    "applicationUrl": null,
    "administrator": "San Isabel Electric Association",
    "programType": "Rebate Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "dc fast",
          "dcfc"
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
        "counties": [],
        "cities": [],
        "utilityTerritories": [
          "San Isabel Electric Association electric service territory"
        ],
        "notes": "Applies only where San Isabel Electric Association is the member's electric utility."
      },
      "eligibleApplicantTypes": [
        "San Isabel Electric Association members",
        "residential electric members",
        "commercial electric members"
      ],
      "eligibleSectors": [
        "residential",
        "commercial"
      ],
      "eligibleRetrofitCategories": [
        "level_2_ev_charger_installation",
        "dc_fast_charger_installation"
      ],
      "hardRequirements": [
        "San Isabel Electric must be the applicant's electric utility.",
        "Application must include paid invoice, photo documentation, circuit information, and required inspections or approvals.",
        "Rebates are limited to one rebate per installed charger and are subject to available funds.",
        "Managed residential Level 2 incentives require enrollment in the specified off-peak rate or managed charging arrangement for the required term.",
        "Commercial DCFC incentive level depends on charger kW tier."
      ],
      "blockers": [
        "Multiple ports on one charger do not qualify for multiple rebates under the flyer.",
        "Residential Level 2 chargers with retail sale or fee collection capability are not eligible for residential rebate treatment.",
        "Applications outside the 90-day documentation window or outside San Isabel service territory are blocked."
      ],
      "programType": "Rebate Program",
      "administrator": "San Isabel Electric Association",
      "applicationUrl": null,
      "websiteUrl": "https://siea.com/wp-content/uploads/2023/04/EvChargerRebateFlyer_2026.pdf",
      "sourceUrlsChecked": [
        "https://siea.com/wp-content/uploads/2023/04/EvChargerRebateFlyer_2026.pdf",
        "https://siea.com/rebates/"
      ],
      "evidenceText": "The]( 2026 San Isabel flyer covers residential Level 2 chargers and commercial Level 2 and DC fast chargers, with utility-service, invoice, photo, inspection, managed-charging, and funding requirements.",
      "reasoningNotes": "Confirmed Level 2 and DCFC categories but kept geography strictly to San Isabel Electric Association members."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "manual_review_required",
        "confidence": "medium",
        "evidenceText": "San Isabel EV charger rebate sources indicate Level 2 and DCFC rebates but official current amounts were not verified.",
        "sourceUrlsChecked": [
          "https://siea.com/empowereveducation/",
          "https://programs.dsireusa.org/system/program/detail/22301"
        ],
        "reasoningNotes": "Later pass should extract current SIEA rebate application for Level 2 and DCFC values.",
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
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22509",
    "opportunityName": "Georgia Power - Energy Assistance for Savings & Efficiency (EASE)",
    "state": "GA",
    "sourceName": "DSIRE",
    "sourceUrl": "https://programs.dsireusa.org/system/program/detail/22509/georgia-power-energy-assistance-for-savings-and-efficiency-ease",
    "websiteUrl": "https://www.georgiapower.com/residential/assistance/ease.html",
    "applicationUrl": "https://gpcresidentialease.customerapplication.com/",
    "administrator": "Georgia Power Company",
    "programType": "No Cost Direct Install Program",
    "availabilityStatus": "active",
    "sourceConfidence": "high",
    "currentPublicEdgeCount": 3,
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
          "Georgia Power"
        ],
        "notes": "Eligible customers must be served by Georgia Power in Georgia."
      },
      "eligibleApplicantTypes": [
        "income_qualified_residential_customers",
        "homeowners",
        "renters_with_landlord_consent"
      ],
      "eligibleSectors": [
        "residential",
        "single_family",
        "manufactured_home"
      ],
      "eligibleRetrofitCategories": [
        "attic_insulation_upgrade",
        "air_sealing_weatherization",
        "duct_sealing_and_insulation",
        "hvac_servicing_tune_up",
        "smart_thermostat",
        "water_saving_devices",
        "air_purifier",
        "smart_power_strip",
        "direct_install_led_lighting"
      ],
      "hardRequirements": [
        "Applicant must be a Georgia Power residential customer.",
        "Household income must be at or below the program income threshold.",
        "Applicant must submit an application and be approved.",
        "An in-home assessment is required before measures are installed.",
        "Program contractor determines and installs eligible no-cost measures.",
        "Renters must provide written landlord consent.",
        "Health and safety issues such as roof leaks, mold, faulty wiring, or gas leaks may need correction before service.",
        "Total measure value is subject to program cap."
      ],
      "blockers": [
        "Windows and doors are explicitly not replaced.",
        "HVAC replacement is not supported by the residential EASE page; HVAC is limited to servicing or tune-up where approved.",
        "LED lighting, if applicable, is a direct-install measure and should not be generalized to a broad lighting retrofit.",
        "Commercial projects should not match the residential EASE record.",
        "Self-installed work is not supported.",
        "Health and safety conditions or lack of landlord consent can prevent installation."
      ],
      "programType": "No Cost Direct Install Program",
      "administrator": "Georgia Power Company",
      "applicationUrl": "https://gpcresidentialease.customerapplication.com/",
      "websiteUrl": "https://www.georgiapower.com/residential/assistance/ease.html",
      "sourceUrlsChecked": [
        "https://www.georgiapower.com/residential/save-money-and-energy/products-programs/home-energy-efficiency-programs/ease.html#faq",
        "https://www.georgiapower.com/residential/assistance/ease.html",
        "https://www.georgiapower.com/residential/assistance/ease/ease-donor.html",
        "https://www.georgiapower.com/business/products-programs/efficiency-maintenance/ease-multifamily.html",
        "https://gpcresidentialease.customerapplication.com/"
      ],
      "evidenceText": "Georgia Power EASE is a no-cost program for income-qualified Georgia Power residential customers. It requires application approval and an in-home assessment; approved measures include attic insulation, air sealing, duct sealing, and HVAC servicing, and the FAQ says windows and doors are not replaced.",
      "reasoningNotes": "Kept insulation and duct sealing. Narrowed lighting to direct-install and HVAC to servicing, not replacement. Added explicit window and door blockers."
    },
    "existingSimpleRules": [],
    "reviewedNoRule": [
      {
        "repairStatus": "not_applicable_for_one_time_savings",
        "confidence": "medium",
        "evidenceText": "Georgia Power EASE provides assistance-style energy efficiency upgrades for eligible customers, not a published per-measure customer rebate formula.",
        "sourceUrlsChecked": [
          "https://www.georgiapower.com/residential/save-money-and-energy/products-programs/home-energy-efficiency-programs/ease.html#faq"
        ],
        "reasoningNotes": "Assistance/no-cost service programs should not be converted into a fixed upfront incentive amount.",
        "originalGapReason": "formula_not_found_in_source_text",
        "mapping": {
          "primarySavingsModelId": "gas_usage_reduction",
          "incentiveValueMethod": "per_unit",
          "calculationReadiness": "needs_bill",
          "calculationInputNeed": null
        }
      }
    ]
  }
]
