You are helping RetroFi refine grant and incentive expected-value estimates.

Current date: 2026-07-02. Program status, deadlines, budgets, and award statistics are time-sensitive. Check official sources wherever possible.

## Prompt grant_probability_029_042: grant expected-value metadata repair

For each target below, repair the grant-related estimate metadata. We need two separate things:

1. Conditional award amount: what could the matched applicant/project receive if selected or approved, using source-backed formulas/ranges/caps.
2. Probability evidence: whether there is enough evidence to discount a competitive grant into a conservative expected value.

Do not confuse these. A source saying "up to $250,000" gives a possible cap, not an expected value. Do not include max-only competitive grants in user-facing savings totals unless probability evidence exists or RetroFi later approves a human-reviewed prior.

## Output JSON schema

Return one JSON object only, no markdown fences.

{
  "schemaVersion": "retrofi_grant_probability_repair.v1",
  "researchedAt": "2026-07-02",
  "promptId": "grant_probability_029_042",
  "batchRange": "029-042",
  "repairs": [
    {
      "opportunityId": "string",
      "effectId": "string",
      "programName": "string",
      "availabilityStatus": "active|closed|exhausted|waitlist|source_inaccessible|unknown",
      "cashValueClassification": "cash_grant|reimbursement|rebate|tax_credit|loan|financing|technical_assistance|unknown",
      "sourceConfidence": "high|medium|low",
      "grantValueModelKind": "fixed_amount|fixed_tier_amount|percent_of_eligible_cost|capped_percent_of_eligible_cost|per_unit_award|hybrid_rate_plus_cap|competitive_max_only|competitive_award_range|competitive_cost_share|formula_grant|study_or_audit_grant|rebate_labeled_as_grant|loan_or_financing_labeled_as_grant|tax_credit_mixed_with_grant|non_cash_technical_assistance|no_calculable_value|source_inaccessible|other",
      "conditionalAward": {"status": "calculable|needs_project_cost|needs_quote|needs_project_scope|not_calculable|zero_value|source_inaccessible", "formulaText": "string", "conditionalAwardCents": null, "minAwardCents": null, "maxAwardCents": null, "costSharePercent": null, "requiredProjectInputs": ["string"], "calculationTrace": ["string"]},
      "probabilityEvidence": {"status": "evidence_found|evidence_not_found|not_required_deterministic|first_come_funding_unknown|human_review_required|not_applicable", "probabilityDiscount": null, "probabilityEvidenceType": "historical_success_rate|budget_and_expected_awards|historical_awards_only|first_come_funds_confirmed|first_come_funding_unknown|scoring_criteria_only|eligibility_only|human_reviewed_prior|not_required|none", "historicalAwardsCount": null, "historicalApplicationsCount": null, "totalProgramBudgetCents": null, "expectedAwardCount": null, "competitionScope": "narrow_local|utility_territory|sector_specific|statewide_broad|federal_broad|unknown", "probabilityNotes": "string"},
      "fallbackPriorSuggestion": {"probabilityDiscount": null, "basis": "string", "shouldRetroFiUseWithoutHumanApproval": false},
      "expectedValueRecommendation": {"estimateStatus": "deterministic_estimate|expected_value_estimate|needs_quote|needs_project_scope|needs_funding_check|not_calculable|zero_value|human_review_required|suppressed", "expectedValueCents": null, "estimateConfidence": "high|medium|low", "includeInUserFacingTotalDefault": false, "reasonCodes": ["string"]},
      "sourceUrlsChecked": ["string"],
      "evidenceText": "string",
      "reasoningNotes": "string"
    }
  ],
  "continueFromOpportunityId": null
}

## Rules

- Separate source confidence, estimate confidence, and matching. Matching is already repaired.
- If the incentive is deterministic, set probability evidence to `not_required_deterministic`.
- If the incentive is a loan, tax credit, financing product, or non-cash assistance, classify it and do not count it as a cash grant estimate.
- If the source only says "up to" with no probability anchor, set `probabilityDiscount` to null and `includeInUserFacingTotalDefault` to false.
- If direct probability evidence is unavailable, you may suggest a low-confidence fallback prior only in `fallbackPriorSuggestion`, and keep `shouldRetroFiUseWithoutHumanApproval` false.
- Use cents for dollar amounts.
- Cite the official URLs checked.

## Targets 029-042

[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22772",
    "programName": "Leading by Example Solar-Decarbonization Grant Program",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "battery_storage_system",
      "ev_charger_installation",
      "level_2_ev_charger_installation",
      "rooftop_solar_pv"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_grant_expected_value_1_9221facf5f8b2349",
    "effectType": "grant_expected_value",
    "label": "For eligible Massachusetts state-portfolio sites, apply component formulas: battery kWh at $500/kWh, additional EVSE at $5,000/port, decarbonization equal to solar funding, and a 10% EJ adder where applicable.",
    "existingCalculation": {
      "method": "measure_catalog",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": null,
      "minAwardCents": null,
      "percent": null,
      "costInput": null,
      "amount": null,
      "formula": null,
      "reason": null
    },
    "caps": [],
    "requiredInputs": [
      {
        "inputKey": "project_component",
        "label": "project component",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_9221facf5f8b2349"
        ]
      },
      {
        "inputKey": "battery_kwh",
        "label": "battery kwh",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_9221facf5f8b2349"
        ]
      },
      {
        "inputKey": "evse_port_count",
        "label": "evse port count",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_9221facf5f8b2349"
        ]
      },
      {
        "inputKey": "solar_funding_amount_cents",
        "label": "solar funding amount cents",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_9221facf5f8b2349"
        ]
      },
      {
        "inputKey": "environmental_justice_adder_eligibility",
        "label": "environmental justice adder eligibility",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_9221facf5f8b2349"
        ]
      },
      {
        "inputKey": "eligible_state_entity_status",
        "label": "eligible state entity status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_9221facf5f8b2349"
        ]
      },
      {
        "inputKey": "battery_kwh_or_evse_port_count_or_solar_funding_amount",
        "label": "battery kwh or evse port count or solar funding amount",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_9221facf5f8b2349"
        ]
      },
      {
        "inputKey": "ej_adder_status",
        "label": "EJ adder status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_9221facf5f8b2349"
        ]
      }
    ],
    "confidence": {
      "overall": 0.38,
      "calculation": 0.38,
      "extraction": 0.72,
      "reason_codes": [
        "repair_status_calculation_package_found",
        "calculation_status_calculable_with_missing_inputs",
        "source_confidence_medium",
        "estimate_confidence_low",
        "value_model_measure_catalog"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_f37f67a5a26550c5",
        "sourceType": "gpt_pro_research_summary",
        "quote": "LBE Solar-Decarbonization grants support solar PV, battery storage, EVSE and decarbonization for eligible Massachusetts state facilities.",
        "sourceUrls": [
          "https://www.mass.gov/info-details/leading-by-example-solar-decarbonization-grant-program"
        ],
        "evidenceConfidence": 0.72
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22783",
    "programName": "Public Charger Grants",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "ev_charger_installation"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_grant_expected_value_1_c8247b1ced6ec8db",
    "effectType": "grant_expected_value",
    "label": "Competitive RFP EM-008-2026 reimburses awardees up to 80% of total eligible project costs, capped at $200,000 per site, for public Level 2 EV charger projects. A minimum of four ports per site is required. Because awards are competitive, do not include expected value without a probability model.",
    "existingCalculation": {
      "method": "expected_value",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": 20000000,
      "minAwardCents": null,
      "percent": null,
      "costInput": null,
      "amount": null,
      "formula": null,
      "reason": null
    },
    "caps": [
      {
        "cap_type": "maximum_amount",
        "amount": {
          "value": 200000,
          "currency": "USD"
        },
        "applies_to": "effect"
      },
      {
        "cap_type": "maximum_percent_of_cost",
        "percent": 0.8,
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "eligible_project_cost",
        "label": "eligible project cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_c8247b1ced6ec8db"
        ]
      },
      {
        "inputKey": "site_location_in_maine",
        "label": "site location in Maine",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_c8247b1ced6ec8db"
        ]
      },
      {
        "inputKey": "public_level_2_charger_design",
        "label": "public Level 2 charger design",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_c8247b1ced6ec8db"
        ]
      },
      {
        "inputKey": "number_of_ports",
        "label": "number of ports",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_c8247b1ced6ec8db"
        ]
      },
      {
        "inputKey": "host_site_agreement_for_public_access_at_least_five_years",
        "label": "host-site agreement for public access at least five years",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_c8247b1ced6ec8db"
        ]
      },
      {
        "inputKey": "rfp_response_score_and_award_decision",
        "label": "RFP response score and award decision",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_c8247b1ced6ec8db"
        ]
      },
      {
        "inputKey": "award_probability_or_award_decision",
        "label": "award probability or award decision",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_c8247b1ced6ec8db"
        ]
      },
      {
        "inputKey": "site_priority_status",
        "label": "site priority status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_c8247b1ced6ec8db"
        ]
      }
    ],
    "confidence": {
      "overall": 0.38,
      "calculation": 0.38,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_calculation_package_found",
        "calculation_status_calculable_with_missing_inputs",
        "source_confidence_high",
        "estimate_confidence_low",
        "value_model_competitive_cost_share"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_b880cb5e7d77c08b",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Efficiency Maine's current opportunity funds public Level 2 EV chargers competitively; DCFC is not the current target.",
        "sourceUrls": [
          "https://www.efficiencymaine.com/opportunities/",
          "https://www.efficiencymaine.com/at-work/electric-vehicle-supply-equipment-initiative/",
          "https://www.efficiencymaine.com/rfp-em-008-2026/",
          "https://www.efficiencymaine.com/docs/RFP-EM-008-2026-Public-L2-EV-Chargers-EM-008-2026.pdf"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22811",
    "programName": "Cobb Electric Membership Corporation - Business EV Charger Grant Program",
    "packageCalculationStatus": "custom_quote_estimate",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "dc_fast_charger_installation",
      "ev_charger_installation",
      "level_2_ev_charger_installation"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_grant_expected_value_1_54a6dbe585e8fc1f",
    "effectType": "grant_expected_value",
    "label": "Cobb EMC business EV grants range from $500 to $5,000; Cobb EMC determines the award at its sole discretion based on charger classification, number of ports, installation price, and benefit to users.",
    "existingCalculation": {
      "method": "expected_value",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": 50000,
      "maxAwardCents": 500000,
      "minAwardCents": null,
      "percent": null,
      "costInput": null,
      "amount": null,
      "formula": null,
      "reason": null
    },
    "caps": [
      {
        "cap_type": "maximum_amount",
        "amount": {
          "value": 5000,
          "currency": "USD"
        },
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "charger_classification",
        "label": "charger classification",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_54a6dbe585e8fc1f"
        ]
      },
      {
        "inputKey": "port_count",
        "label": "port count",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_54a6dbe585e8fc1f"
        ]
      },
      {
        "inputKey": "installation_price",
        "label": "installation price",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_54a6dbe585e8fc1f"
        ]
      },
      {
        "inputKey": "site_user_benefit",
        "label": "site user benefit",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_54a6dbe585e8fc1f"
        ]
      },
      {
        "inputKey": "cobb_emc_award_determination",
        "label": "Cobb EMC award determination",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_54a6dbe585e8fc1f"
        ]
      }
    ],
    "confidence": {
      "overall": 0.38,
      "calculation": 0.38,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_custom_quote_required",
        "calculation_status_custom_quote_estimate",
        "source_confidence_high",
        "estimate_confidence_low",
        "value_model_competitive_award_range"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_2e856a3290a1d090",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Cobb EMC business EV charger grants range from $500 to $5,000, but final award is discretionary and cannot be deterministically estimated.",
        "sourceUrls": [
          "https://www.cobbemc.com/ev-charging-business",
          "https://www.cobbemc.com/sites/default/files/documents/ev/EVGrantApplicationFinal.pdf",
          "https://www.cobbemc.com/sites/default/files/documents/ev/Program%20Requirements%20and%20Acknowledgements.pdf"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2469",
    "programName": "Lane Electric Cooperative - Commercial/Residential Weatherization & Energy Efficiency Program",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "air_sealing_weatherization",
      "heat_pump_hvac_retrofit",
      "heat_pump_water_heater",
      "insulation_upgrade"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_one_time_savings_1_271dd59527790857",
    "effectType": "one_time_savings",
    "label": "Weatherization cash grant equals 25% of eligible measure cost, capped at $1,000.",
    "existingCalculation": {
      "method": "percent_of_cost",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": null,
      "minAwardCents": null,
      "percent": 0.25,
      "costInput": "eligible_project_cost_cents",
      "amount": null,
      "formula": null,
      "reason": null
    },
    "caps": [
      {
        "cap_type": "maximum_amount",
        "amount": {
          "value": 1000,
          "currency": "USD"
        },
        "applies_to": "effect"
      },
      {
        "cap_type": "maximum_percent_of_cost",
        "percent": 0.25,
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "eligible_measure_cost",
        "label": "eligible measure cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_271dd59527790857"
        ]
      },
      {
        "inputKey": "measure_type",
        "label": "measure type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_271dd59527790857"
        ]
      },
      {
        "inputKey": "preapproval",
        "label": "preapproval",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_271dd59527790857"
        ]
      },
      {
        "inputKey": "lane_electric_member_status",
        "label": "Lane Electric member status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_271dd59527790857"
        ]
      },
      {
        "inputKey": "approved_measure",
        "label": "approved measure",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_no_cash_value_2_61cf863af574bae7"
        ]
      },
      {
        "inputKey": "financed_amount",
        "label": "financed amount",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_no_cash_value_2_61cf863af574bae7"
        ]
      },
      {
        "inputKey": "loan_terms",
        "label": "loan terms",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_no_cash_value_2_61cf863af574bae7"
        ]
      },
      {
        "inputKey": "contractor_quote",
        "label": "contractor quote",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_21f94841996a6378"
        ]
      },
      {
        "inputKey": "equipment_type",
        "label": "equipment type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_21f94841996a6378"
        ]
      },
      {
        "inputKey": "member_account",
        "label": "member account",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_21f94841996a6378"
        ]
      }
    ],
    "confidence": {
      "overall": 0.72,
      "calculation": 0.72,
      "extraction": 0.72,
      "reason_codes": [
        "repair_status_calculation_package_found",
        "calculation_status_calculable_with_missing_inputs",
        "source_confidence_medium",
        "estimate_confidence_medium",
        "value_model_capped_percent_of_eligible_cost"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_fab6cce2d587ecd9",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Lane Electric supports weatherization grants and financing plus heat pump and HPWH programs, but full current measure amounts were not accessible.",
        "sourceUrls": [
          "https://www.laneelectric.com/energy-efficiency/energy-saving-programs/",
          "https://www.laneelectric.com/energy-efficiency/weatherization-programs/",
          "https://www.laneelectric.com/energy-efficiency/heat-pump-program/",
          "https://www.laneelectric.com/energy-efficiency/heat-pump-water-heaters/",
          "https://www.laneelectric.com/energy-efficiency/renewable-energy/member-renewable-programs/"
        ],
        "evidenceConfidence": 0.72
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:2503",
    "programName": "We Energies - Focus-On-Energy Agriculture Rebate Program",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "biomass_biogas_energy_system",
      "rooftop_solar_pv",
      "solar_water_heating_system"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_one_time_savings_2_2513d551481d76a4",
    "effectType": "one_time_savings",
    "label": "Renewable custom incentive is based on Focus-approved first-year savings or generation: $125 per peak kW plus $0.10 per kWh saved or generated and $1.25 per therm saved or generated, capped at the lesser of $300,000, 50% of project cost, or one-year payback.",
    "existingCalculation": {
      "method": "rate_table",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": null,
      "minAwardCents": null,
      "percent": null,
      "costInput": null,
      "amount": null,
      "formula": null,
      "reason": null
    },
    "caps": [
      {
        "cap_type": "maximum_amount",
        "amount": {
          "value": 300000,
          "currency": "USD"
        },
        "applies_to": "effect"
      },
      {
        "cap_type": "maximum_percent_of_cost",
        "percent": 0.5,
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "system_kw_dc",
        "label": "system kw dc",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_a05da9eb8a38483d"
        ]
      },
      {
        "inputKey": "eligible_customer_cost",
        "label": "eligible customer cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_a05da9eb8a38483d"
        ]
      },
      {
        "inputKey": "participating_electric_utility_status",
        "label": "participating electric utility status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_a05da9eb8a38483d"
        ]
      },
      {
        "inputKey": "installation_date",
        "label": "installation date",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_a05da9eb8a38483d"
        ]
      },
      {
        "inputKey": "reservation_status",
        "label": "reservation status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_a05da9eb8a38483d"
        ]
      },
      {
        "inputKey": "focus_approved_peak_kw",
        "label": "Focus approved peak kw",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_2513d551481d76a4"
        ]
      },
      {
        "inputKey": "focus_approved_annual_kwh_saved_or_generated",
        "label": "Focus approved annual kwh saved or generated",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_2513d551481d76a4"
        ]
      },
      {
        "inputKey": "focus_approved_annual_therms_saved_or_generated",
        "label": "Focus approved annual therms saved or generated",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_2513d551481d76a4"
        ]
      },
      {
        "inputKey": "eligible_project_cost",
        "label": "eligible project cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_2513d551481d76a4"
        ]
      },
      {
        "inputKey": "simple_payback_years",
        "label": "simple payback years",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_2513d551481d76a4"
        ]
      },
      {
        "inputKey": "preapproval_status",
        "label": "preapproval status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_2513d551481d76a4"
        ]
      },
      {
        "inputKey": "study_cost",
        "label": "study cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_3_f1cc786b38003ad5"
        ]
      },
      {
        "inputKey": "biogas_or_biomass_project_type",
        "label": "biogas or biomass project type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_3_f1cc786b38003ad5"
        ]
      },
      {
        "inputKey": "project_assessment_application_status",
        "label": "project assessment application status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_3_f1cc786b38003ad5"
        ]
      }
    ],
    "confidence": {
      "overall": 0.72,
      "calculation": 0.72,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_calculation_package_found",
        "calculation_status_calculable_with_missing_inputs",
        "source_confidence_high",
        "estimate_confidence_medium",
        "value_model_formula_grant"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_8c5d81c7ac1e2eab",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Focus on Energy publishes a business solar PV per-kW formula, renewable custom incentive rates, and a biogas/biomass study cost-share cap.",
        "sourceUrls": [
          "https://focusonenergy.com/business/renewables",
          "https://assets.focusonenergy.com/production/docs/business/Focus-2026_Custom_Incentives_Guide_Fillable.pdf",
          "https://focusonenergy.com/business/agribusiness",
          "https://programs.dsireusa.org/system/program/detail/2503/we-energies-focus-on-energy-agriculture-rebate-program"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3021",
    "programName": "Rhode Island Energy (Gas) - Commercial Energy Efficiency Programs",
    "packageCalculationStatus": "estimate_from_range",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "high_efficiency_boiler_retrofit",
      "high_efficiency_furnace_retrofit",
      "high_efficiency_hvac_replacement",
      "smart_thermostat_zoning_retrofit"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_one_time_savings_1_68fd9ee9771b56ee",
    "effectType": "one_time_savings",
    "label": "Rhode Island Energy commercial natural gas heating rebates are published as a range from $300 to $10,000 for businesses installing qualifying natural gas furnaces, water heaters, boilers, and controls; exact value requires the current RI Energy form and equipment details.",
    "existingCalculation": {
      "method": "expected_value",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": 30000,
      "maxAwardCents": 1000000,
      "minAwardCents": null,
      "percent": null,
      "costInput": null,
      "amount": null,
      "formula": null,
      "reason": null
    },
    "caps": [
      {
        "cap_type": "maximum_amount",
        "amount": {
          "value": 10000,
          "currency": "USD"
        },
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "rhode_island_energy_commercial_gas_account",
        "label": "Rhode Island Energy commercial gas account",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_68fd9ee9771b56ee"
        ]
      },
      {
        "inputKey": "equipment_type",
        "label": "equipment type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_68fd9ee9771b56ee"
        ]
      },
      {
        "inputKey": "efficiency_rating",
        "label": "efficiency rating",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_68fd9ee9771b56ee"
        ]
      },
      {
        "inputKey": "capacity_or_size",
        "label": "capacity or size",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_68fd9ee9771b56ee"
        ]
      },
      {
        "inputKey": "quantity",
        "label": "quantity",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_68fd9ee9771b56ee"
        ]
      },
      {
        "inputKey": "eligible_cost",
        "label": "eligible cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_68fd9ee9771b56ee"
        ]
      },
      {
        "inputKey": "contractor_invoice",
        "label": "contractor invoice",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_68fd9ee9771b56ee"
        ]
      },
      {
        "inputKey": "current_ri_energy_form",
        "label": "current RI Energy form",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_68fd9ee9771b56ee"
        ]
      },
      {
        "inputKey": "current_form_amount",
        "label": "current form amount",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_68fd9ee9771b56ee"
        ]
      }
    ],
    "confidence": {
      "overall": 0.38,
      "calculation": 0.38,
      "extraction": 0.72,
      "reason_codes": [
        "repair_status_calculation_package_found",
        "calculation_status_estimate_from_range",
        "source_confidence_medium",
        "estimate_confidence_low",
        "value_model_competitive_award_range"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_212d2c31f1a39e52",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Rhode Island commercial gas materials support furnace, boiler, water-heater, and controls incentives but require current form details for exact values.",
        "sourceUrls": [
          "https://energy.ri.gov/energy-incentives/commercial-incentives",
          "https://energy.ri.gov/incentives",
          "https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating",
          "https://www.rienergy.com/RI-Business/Energy-Saving-Programs/Commercial-Gas"
        ],
        "evidenceConfidence": 0.72
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3323",
    "programName": "Nebraska Public Power District - Residential Energy Efficiency Rebate Programs",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "ev_charger_installation",
      "ground_source_geothermal_heat_pump",
      "heat_pump_hvac_retrofit",
      "heat_pump_water_heater",
      "high_efficiency_hvac_replacement",
      "insulation_upgrade",
      "level_2_ev_charger_installation",
      "smart_thermostat_zoning_retrofit"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_no_cash_value_2_24d6848bb3d44ec8",
    "effectType": "no_cash_value",
    "label": "The Nebraska Dollar and Energy Savings Loan can finance qualifying heat-pump-related work, but no forgiveness, grant value or buy-down amount is published in this opportunity.",
    "existingCalculation": {
      "method": "zero_when_not_applicable",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": null,
      "minAwardCents": null,
      "percent": null,
      "costInput": null,
      "amount": null,
      "formula": null,
      "reason": "loan_or_financing is not included in automated totals without additional estimator support."
    },
    "caps": [],
    "requiredInputs": [
      {
        "inputKey": "selected_measure",
        "label": "selected measure",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_dd854c717ac253c9"
        ]
      },
      {
        "inputKey": "project_cost",
        "label": "project cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_dd854c717ac253c9"
        ]
      },
      {
        "inputKey": "unit_count",
        "label": "unit count",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_dd854c717ac253c9"
        ]
      },
      {
        "inputKey": "square_feet",
        "label": "square feet",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_dd854c717ac253c9"
        ]
      },
      {
        "inputKey": "heat_pump_type",
        "label": "heat pump type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_dd854c717ac253c9"
        ]
      },
      {
        "inputKey": "efficiency_tier",
        "label": "efficiency tier",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_dd854c717ac253c9"
        ]
      },
      {
        "inputKey": "installer_type",
        "label": "installer type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_dd854c717ac253c9"
        ]
      },
      {
        "inputKey": "primary_heat_fuel",
        "label": "primary heat fuel",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_dd854c717ac253c9"
        ]
      },
      {
        "inputKey": "charger_cost",
        "label": "charger cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_dd854c717ac253c9"
        ]
      },
      {
        "inputKey": "equipment_tier",
        "label": "equipment tier",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_dd854c717ac253c9"
        ]
      },
      {
        "inputKey": "loan_interest_rate",
        "label": "loan interest rate",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_no_cash_value_2_24d6848bb3d44ec8"
        ]
      },
      {
        "inputKey": "loan_amount",
        "label": "loan amount",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_no_cash_value_2_24d6848bb3d44ec8"
        ]
      },
      {
        "inputKey": "term_months",
        "label": "term months",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_no_cash_value_2_24d6848bb3d44ec8"
        ]
      },
      {
        "inputKey": "eligible_project_scope",
        "label": "eligible project scope",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_no_cash_value_2_24d6848bb3d44ec8"
        ]
      }
    ],
    "confidence": {
      "overall": 0.9,
      "calculation": 0.9,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_calculation_package_found",
        "calculation_status_calculable_with_missing_inputs",
        "source_confidence_high",
        "estimate_confidence_high",
        "value_model_loan_or_financing"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_b4ec6e820a6314eb",
        "sourceType": "gpt_pro_research_summary",
        "quote": "NPPD publishes residential EnergyWise and goEV incentives with detailed rates for attic insulation, heat pumps, HPWH, thermostats and EV charging.",
        "sourceUrls": [
          "https://nppd.energywisenebraska.com/residential/",
          "https://nppd.energywisenebraskagoev.com/residential-incentives/",
          "https://www.nppd.com/save-money"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3409",
    "programName": "Anoka Municipal Utility - Commercial Energy Efficiency Rebate Program",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "hvac_controls_retrofit",
      "led_lighting_retrofit",
      "lighting_controls_retrofit"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_one_time_savings_1_ca163786a4aef968",
    "effectType": "one_time_savings",
    "label": "Commercial lighting rebate estimate equals total calculated annual kWh savings times $0.10/kWh. Retrofit savings use removed lighting minus new lighting, divided by 1,000 and adjusted by 1.1 for applicable air-conditioned spaces. Cap is the lesser of 60% eligible equipment cost excluding labor or $100,000.",
    "existingCalculation": {
      "method": "zero_when_not_applicable",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": null,
      "minAwardCents": null,
      "percent": null,
      "costInput": null,
      "amount": null,
      "formula": null,
      "reason": "formula_grant is not included in automated totals without additional estimator support."
    },
    "caps": [
      {
        "cap_type": "maximum_amount",
        "amount": {
          "value": 100000,
          "currency": "USD"
        },
        "applies_to": "effect"
      },
      {
        "cap_type": "maximum_percent_of_cost",
        "percent": 0.6,
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "oldfixturecount",
        "label": "oldFixtureCount",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_ca163786a4aef968"
        ]
      },
      {
        "inputKey": "oldwattsperfixture",
        "label": "oldWattsPerFixture",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_ca163786a4aef968"
        ]
      },
      {
        "inputKey": "oldannualhours",
        "label": "oldAnnualHours",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_ca163786a4aef968"
        ]
      },
      {
        "inputKey": "newfixturecount",
        "label": "newFixtureCount",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_ca163786a4aef968"
        ]
      },
      {
        "inputKey": "newwattsperfixture",
        "label": "newWattsPerFixture",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_ca163786a4aef968"
        ]
      },
      {
        "inputKey": "newannualhours",
        "label": "newAnnualHours",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_ca163786a4aef968"
        ]
      },
      {
        "inputKey": "airconditionedarea",
        "label": "airConditionedArea",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_ca163786a4aef968"
        ]
      },
      {
        "inputKey": "eligibleequipmentcostexcludinglaborcents",
        "label": "eligibleEquipmentCostExcludingLaborCents",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_ca163786a4aef968"
        ]
      },
      {
        "inputKey": "invoice",
        "label": "invoice",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_ca163786a4aef968"
        ]
      },
      {
        "inputKey": "oldlightingbaseline",
        "label": "oldLightingBaseline",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_ca163786a4aef968"
        ]
      },
      {
        "inputKey": "newlightingspecs",
        "label": "newLightingSpecs",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_ca163786a4aef968"
        ]
      },
      {
        "inputKey": "annualoperatinghours",
        "label": "annualOperatingHours",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_ca163786a4aef968"
        ]
      },
      {
        "inputKey": "equipmenttype",
        "label": "equipmentType",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_ff086acbf43293d0"
        ]
      },
      {
        "inputKey": "nominaltons",
        "label": "nominalTons",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_ff086acbf43293d0"
        ]
      },
      {
        "inputKey": "seer2_or_eer2_or_ieer2",
        "label": "SEER2 or EER2 or IEER2",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_ff086acbf43293d0"
        ]
      },
      {
        "inputKey": "minimumefficiencythreshold",
        "label": "minimumEfficiencyThreshold",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_ff086acbf43293d0"
        ]
      },
      {
        "inputKey": "projectcostincludinglaborcents",
        "label": "projectCostIncludingLaborCents",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_ff086acbf43293d0"
        ]
      },
      {
        "inputKey": "enthalpyandco2controlsforeconomizer",
        "label": "enthalpyAndCO2ControlsForEconomizer",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_ff086acbf43293d0"
        ]
      },
      {
        "inputKey": "efficiencyrating",
        "label": "efficiencyRating",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_ff086acbf43293d0"
        ]
      }
    ],
    "confidence": {
      "overall": 0.9,
      "calculation": 0.9,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_calculation_package_found",
        "calculation_status_calculable_with_missing_inputs",
        "source_confidence_high",
        "estimate_confidence_high",
        "value_model_formula_grant"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_4e846704e3300623",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Anoka publishes calculable lighting and cooling formulas: lighting at $0.10/kWh saved, and cooling/economizer rates with 60%/$100,000 caps.",
        "sourceUrls": [
          "https://www.anokamn.gov/381/Commercial-Rebates",
          "https://www.anokamn.gov/819/Commercial-Retrofit-Lighting-Rebate",
          "https://www.anokamn.gov/DocumentCenter/View/1170/2024-Commercial-Retrofit-Lighting-Rebate-PDF",
          "https://www.anokamn.gov/818/Commercial-New-Lighting-Rebate",
          "https://www.anokamn.gov/DocumentCenter/View/4567/2024-Commercial-New-Lighting-Rebate-PDF",
          "https://www.anokamn.gov/820/Commercial-Cooling-Rebate",
          "https://www.anokamn.gov/DocumentCenter/View/2238"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3577",
    "programName": "Lake Region Electric Cooperative - Agriculture and Commercial Energy Efficiency Grant Program",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "high_efficiency_hvac_replacement",
      "high_efficiency_refrigeration_equipment",
      "led_lighting_retrofit",
      "refrigeration_controls_retrofit"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_one_time_savings_1_1710faf590c563a5",
    "effectType": "one_time_savings",
    "label": "Commercial lighting incentives use a measure catalog for LED lamps, fixtures, and controls, with the rebate not exceeding 50% of material or equipment cost and a $5,000 annual member cap.",
    "existingCalculation": {
      "method": "measure_catalog",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": null,
      "minAwardCents": null,
      "percent": null,
      "costInput": null,
      "amount": null,
      "formula": null,
      "reason": null
    },
    "caps": [
      {
        "cap_type": "maximum_amount",
        "amount": {
          "value": 5000,
          "currency": "USD"
        },
        "applies_to": "effect"
      },
      {
        "cap_type": "maximum_percent_of_cost",
        "percent": 50,
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "lrec_commercial_account",
        "label": "LREC commercial account",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "lighting_measure_type",
        "label": "lighting measure type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "new_fixture_wattage",
        "label": "new fixture wattage",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "quantity",
        "label": "quantity",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "connected_control_kw",
        "label": "connected control kW",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "material_or_equipment_cost",
        "label": "material or equipment cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "invoice_date",
        "label": "invoice date",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "dlc_or_energy_star_listing",
        "label": "DLC or ENERGY STAR listing",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "measure_type",
        "label": "measure type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "wattage_or_control_kw",
        "label": "wattage or control kW",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "material_cost",
        "label": "material cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "dairy_measure_type",
        "label": "dairy measure type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_8f47bd53eecfe786"
        ]
      },
      {
        "inputKey": "cow_count",
        "label": "cow count",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_8f47bd53eecfe786"
        ]
      },
      {
        "inputKey": "horsepower",
        "label": "horsepower",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_8f47bd53eecfe786"
        ]
      },
      {
        "inputKey": "eligible_equipment_cost",
        "label": "eligible equipment cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_8f47bd53eecfe786"
        ]
      },
      {
        "inputKey": "cow_count_or_horsepower",
        "label": "cow count or horsepower",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_8f47bd53eecfe786"
        ]
      },
      {
        "inputKey": "preapproval_status",
        "label": "preapproval status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "equipment_nameplate_data",
        "label": "equipment nameplate data",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "equipment_specifications",
        "label": "equipment specifications",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "eligible_project_cost",
        "label": "eligible project cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "estimated_kw_reduction",
        "label": "estimated kW reduction",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "estimated_kwh_savings",
        "label": "estimated kWh savings",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "annual_operating_hours",
        "label": "annual operating hours",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "lrec_pre_inspection",
        "label": "LREC pre inspection",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "kw_reduction",
        "label": "kW reduction",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "kwh_savings",
        "label": "kWh savings",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      }
    ],
    "confidence": {
      "overall": 0.72,
      "calculation": 0.72,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_calculation_package_found",
        "calculation_status_calculable_with_missing_inputs",
        "source_confidence_high",
        "estimate_confidence_medium",
        "value_model_measure_catalog"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_9558a9198acccd4e",
        "sourceType": "gpt_pro_research_summary",
        "quote": "LREC publishes 2026 commercial lighting, dairy, and custom rebate forms plus an ag-commercial grants page for eligible electric-efficiency projects.",
        "sourceUrls": [
          "https://www.lrec.coop/energy-services/ag-commercial-energy-grants/",
          "https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/",
          "https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Com-Lighting-Fillable.pdf",
          "https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Custom-Fillable.pdf",
          "https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Dairy-Fillable.pdf"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3577",
    "programName": "Lake Region Electric Cooperative - Agriculture and Commercial Energy Efficiency Grant Program",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "high_efficiency_hvac_replacement",
      "high_efficiency_refrigeration_equipment",
      "led_lighting_retrofit",
      "refrigeration_controls_retrofit"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_one_time_savings_2_8f47bd53eecfe786",
    "effectType": "one_time_savings",
    "label": "Dairy incentives include $2 per cow for plate coolers, $2 per cow for milk pump VFDs, and $20 per horsepower for vacuum pump VFDs.",
    "existingCalculation": {
      "method": "measure_catalog",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": null,
      "minAwardCents": null,
      "percent": null,
      "costInput": null,
      "amount": null,
      "formula": null,
      "reason": null
    },
    "caps": [],
    "requiredInputs": [
      {
        "inputKey": "lrec_commercial_account",
        "label": "LREC commercial account",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "lighting_measure_type",
        "label": "lighting measure type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "new_fixture_wattage",
        "label": "new fixture wattage",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "quantity",
        "label": "quantity",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "connected_control_kw",
        "label": "connected control kW",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "material_or_equipment_cost",
        "label": "material or equipment cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "invoice_date",
        "label": "invoice date",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "dlc_or_energy_star_listing",
        "label": "DLC or ENERGY STAR listing",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "measure_type",
        "label": "measure type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "wattage_or_control_kw",
        "label": "wattage or control kW",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "material_cost",
        "label": "material cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "dairy_measure_type",
        "label": "dairy measure type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_8f47bd53eecfe786"
        ]
      },
      {
        "inputKey": "cow_count",
        "label": "cow count",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_8f47bd53eecfe786"
        ]
      },
      {
        "inputKey": "horsepower",
        "label": "horsepower",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_8f47bd53eecfe786"
        ]
      },
      {
        "inputKey": "eligible_equipment_cost",
        "label": "eligible equipment cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_8f47bd53eecfe786"
        ]
      },
      {
        "inputKey": "cow_count_or_horsepower",
        "label": "cow count or horsepower",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_8f47bd53eecfe786"
        ]
      },
      {
        "inputKey": "preapproval_status",
        "label": "preapproval status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "equipment_nameplate_data",
        "label": "equipment nameplate data",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "equipment_specifications",
        "label": "equipment specifications",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "eligible_project_cost",
        "label": "eligible project cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "estimated_kw_reduction",
        "label": "estimated kW reduction",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "estimated_kwh_savings",
        "label": "estimated kWh savings",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "annual_operating_hours",
        "label": "annual operating hours",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "lrec_pre_inspection",
        "label": "LREC pre inspection",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "kw_reduction",
        "label": "kW reduction",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "kwh_savings",
        "label": "kWh savings",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      }
    ],
    "confidence": {
      "overall": 0.72,
      "calculation": 0.72,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_calculation_package_found",
        "calculation_status_calculable_with_missing_inputs",
        "source_confidence_high",
        "estimate_confidence_medium",
        "value_model_measure_catalog"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_9558a9198acccd4e",
        "sourceType": "gpt_pro_research_summary",
        "quote": "LREC publishes 2026 commercial lighting, dairy, and custom rebate forms plus an ag-commercial grants page for eligible electric-efficiency projects.",
        "sourceUrls": [
          "https://www.lrec.coop/energy-services/ag-commercial-energy-grants/",
          "https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/",
          "https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Com-Lighting-Fillable.pdf",
          "https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Custom-Fillable.pdf",
          "https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Dairy-Fillable.pdf"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:3577",
    "programName": "Lake Region Electric Cooperative - Agriculture and Commercial Energy Efficiency Grant Program",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "high_efficiency_hvac_replacement",
      "high_efficiency_refrigeration_equipment",
      "led_lighting_retrofit",
      "refrigeration_controls_retrofit"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_one_time_savings_3_15fcad37f2268e40",
    "effectType": "one_time_savings",
    "label": "Custom commercial and agricultural electric efficiency projects require pre-approval and LREC review; the rebate may not exceed 50% of project cost and is determined from project demand, energy savings, and annual operating hours.",
    "existingCalculation": {
      "method": "custom_quote",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": null,
      "minAwardCents": null,
      "percent": null,
      "costInput": null,
      "amount": null,
      "formula": null,
      "reason": "Project-specific quote or program review required."
    },
    "caps": [
      {
        "cap_type": "maximum_percent_of_cost",
        "percent": 50,
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "lrec_commercial_account",
        "label": "LREC commercial account",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "lighting_measure_type",
        "label": "lighting measure type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "new_fixture_wattage",
        "label": "new fixture wattage",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "quantity",
        "label": "quantity",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "connected_control_kw",
        "label": "connected control kW",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "material_or_equipment_cost",
        "label": "material or equipment cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "invoice_date",
        "label": "invoice date",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "dlc_or_energy_star_listing",
        "label": "DLC or ENERGY STAR listing",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "measure_type",
        "label": "measure type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "wattage_or_control_kw",
        "label": "wattage or control kW",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "material_cost",
        "label": "material cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_1710faf590c563a5"
        ]
      },
      {
        "inputKey": "dairy_measure_type",
        "label": "dairy measure type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_8f47bd53eecfe786"
        ]
      },
      {
        "inputKey": "cow_count",
        "label": "cow count",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_8f47bd53eecfe786"
        ]
      },
      {
        "inputKey": "horsepower",
        "label": "horsepower",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_8f47bd53eecfe786"
        ]
      },
      {
        "inputKey": "eligible_equipment_cost",
        "label": "eligible equipment cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_8f47bd53eecfe786"
        ]
      },
      {
        "inputKey": "cow_count_or_horsepower",
        "label": "cow count or horsepower",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_2_8f47bd53eecfe786"
        ]
      },
      {
        "inputKey": "preapproval_status",
        "label": "preapproval status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "equipment_nameplate_data",
        "label": "equipment nameplate data",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "equipment_specifications",
        "label": "equipment specifications",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "eligible_project_cost",
        "label": "eligible project cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "estimated_kw_reduction",
        "label": "estimated kW reduction",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "estimated_kwh_savings",
        "label": "estimated kWh savings",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "annual_operating_hours",
        "label": "annual operating hours",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "lrec_pre_inspection",
        "label": "LREC pre inspection",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "kw_reduction",
        "label": "kW reduction",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      },
      {
        "inputKey": "kwh_savings",
        "label": "kWh savings",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_3_15fcad37f2268e40"
        ]
      }
    ],
    "confidence": {
      "overall": 0.72,
      "calculation": 0.72,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_calculation_package_found",
        "calculation_status_calculable_with_missing_inputs",
        "source_confidence_high",
        "estimate_confidence_medium",
        "value_model_custom_quote"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_9558a9198acccd4e",
        "sourceType": "gpt_pro_research_summary",
        "quote": "LREC publishes 2026 commercial lighting, dairy, and custom rebate forms plus an ag-commercial grants page for eligible electric-efficiency projects.",
        "sourceUrls": [
          "https://www.lrec.coop/energy-services/ag-commercial-energy-grants/",
          "https://www.lrec.coop/energy-services/rebates-loans-and-tax-credits/",
          "https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Com-Lighting-Fillable.pdf",
          "https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Custom-Fillable.pdf",
          "https://www.lrec.coop/wp-content/uploads/2026/02/2026-LREC-Dairy-Fillable.pdf"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5361",
    "programName": "Small Scale Solar Grants (Commerce RI)",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "battery_storage_system",
      "rooftop_solar_pv",
      "solar_water_heating_system"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_grant_expected_value_1_4b087fae3c03d391",
    "effectType": "grant_expected_value",
    "label": "Small-scale REF grant is $1.65 per watt for eligible small-scale solar PV or solar domestic hot water projects, with systems above 8.8 kW receiving the maximum grant of $14,500 per project.",
    "existingCalculation": {
      "method": "zero_when_not_applicable",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": null,
      "minAwardCents": null,
      "percent": null,
      "costInput": null,
      "amount": null,
      "formula": null,
      "reason": "hybrid_rate_plus_cap is not included in automated totals without additional estimator support."
    },
    "caps": [
      {
        "cap_type": "maximum_amount",
        "amount": {
          "value": 14500,
          "currency": "USD"
        },
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "approved_system_watts",
        "label": "approved system watts",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_4b087fae3c03d391"
        ]
      },
      {
        "inputKey": "eligible_renewable_measure_type",
        "label": "eligible renewable measure type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_4b087fae3c03d391"
        ]
      },
      {
        "inputKey": "net_metered_direct_ownership_confirmation",
        "label": "net metered direct ownership confirmation",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_4b087fae3c03d391"
        ]
      },
      {
        "inputKey": "ref_round_approval_before_installation",
        "label": "ref round approval before installation",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_4b087fae3c03d391"
        ]
      },
      {
        "inputKey": "qualifying_ref_funded_renewable_project",
        "label": "qualifying ref funded renewable project",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_5d165cb2af3b1006"
        ]
      },
      {
        "inputKey": "battery_storage_integration",
        "label": "battery storage integration",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_5d165cb2af3b1006"
        ]
      },
      {
        "inputKey": "storage_adder_approval",
        "label": "storage adder approval",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_5d165cb2af3b1006"
        ]
      }
    ],
    "confidence": {
      "overall": 0.9,
      "calculation": 0.9,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_calculation_package_found",
        "calculation_status_calculable_with_missing_inputs",
        "source_confidence_high",
        "estimate_confidence_high",
        "value_model_hybrid_rate_plus_cap"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_dcdade6a07275a8e",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Commerce RI publishes small-scale REF grant rates for solar PV, solar hot water, and a paired storage adder.",
        "sourceUrls": [
          "https://commerceri.com/renewable-energy-fund/",
          "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_RFP_c9b2126b-7a3b-47db-941a-9f576e78237c.pdf",
          "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_Flyer_38730e17-9e3b-4e0f-b749-f9b8352c70bc.pdf",
          "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/REF_Storage_Adder_RFP_FINAL_d448fb12-1769-48fd-a04f-2d9922beff15.pdf"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5361",
    "programName": "Small Scale Solar Grants (Commerce RI)",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "battery_storage_system",
      "rooftop_solar_pv",
      "solar_water_heating_system"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_grant_expected_value_2_5d165cb2af3b1006",
    "effectType": "grant_expected_value",
    "label": "An eligible storage adder provides $5,000 for qualifying battery storage when paired with a concurrently awarded REF-funded renewable project.",
    "existingCalculation": {
      "method": "fixed_amount",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": null,
      "minAwardCents": null,
      "percent": null,
      "costInput": null,
      "amount": {
        "value": 5000,
        "currency": "USD"
      },
      "formula": null,
      "reason": null
    },
    "caps": [],
    "requiredInputs": [
      {
        "inputKey": "approved_system_watts",
        "label": "approved system watts",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_4b087fae3c03d391"
        ]
      },
      {
        "inputKey": "eligible_renewable_measure_type",
        "label": "eligible renewable measure type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_4b087fae3c03d391"
        ]
      },
      {
        "inputKey": "net_metered_direct_ownership_confirmation",
        "label": "net metered direct ownership confirmation",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_4b087fae3c03d391"
        ]
      },
      {
        "inputKey": "ref_round_approval_before_installation",
        "label": "ref round approval before installation",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_4b087fae3c03d391"
        ]
      },
      {
        "inputKey": "qualifying_ref_funded_renewable_project",
        "label": "qualifying ref funded renewable project",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_5d165cb2af3b1006"
        ]
      },
      {
        "inputKey": "battery_storage_integration",
        "label": "battery storage integration",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_5d165cb2af3b1006"
        ]
      },
      {
        "inputKey": "storage_adder_approval",
        "label": "storage adder approval",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_5d165cb2af3b1006"
        ]
      }
    ],
    "confidence": {
      "overall": 0.9,
      "calculation": 0.9,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_calculation_package_found",
        "calculation_status_calculable_with_missing_inputs",
        "source_confidence_high",
        "estimate_confidence_high",
        "value_model_fixed_amount"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_dcdade6a07275a8e",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Commerce RI publishes small-scale REF grant rates for solar PV, solar hot water, and a paired storage adder.",
        "sourceUrls": [
          "https://commerceri.com/renewable-energy-fund/",
          "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_RFP_c9b2126b-7a3b-47db-941a-9f576e78237c.pdf",
          "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Small_Scale_Flyer_38730e17-9e3b-4e0f-b749-f9b8352c70bc.pdf",
          "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/REF_Storage_Adder_RFP_FINAL_d448fb12-1769-48fd-a04f-2d9922beff15.pdf"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5362",
    "programName": "Commercial Scale Renewable Energy Grants (Commerce RI)",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "battery_storage_system",
      "solar_carport"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_grant_expected_value_1_6968bbfaaabe9e9d",
    "effectType": "grant_expected_value",
    "label": "Calculate the commercial-scale solar base grant by ownership and DC capacity tiers, then add approved solar carport and energy-storage adders subject to per-project and round caps. Storage adder is based on maximum continuous power deliverable over three hours.",
    "existingCalculation": {
      "method": "rate_table",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": null,
      "minAwardCents": null,
      "percent": null,
      "costInput": null,
      "amount": null,
      "formula": null,
      "reason": null
    },
    "caps": [
      {
        "cap_type": "maximum_amount",
        "amount": {
          "value": 75000,
          "currency": "USD"
        },
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "ownership_model",
        "label": "ownership model",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6968bbfaaabe9e9d"
        ]
      },
      {
        "inputKey": "project_dc_watts_by_tier",
        "label": "project DC watts by tier",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6968bbfaaabe9e9d"
        ]
      },
      {
        "inputKey": "solar_carport_watts",
        "label": "solar carport watts",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6968bbfaaabe9e9d"
        ]
      },
      {
        "inputKey": "storage_three_hour_continuous_power_watts",
        "label": "storage three-hour continuous power watts",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6968bbfaaabe9e9d"
        ]
      },
      {
        "inputKey": "eligible_contract_price_for_sdhw_if_applicable",
        "label": "eligible contract price for SDHW if applicable",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6968bbfaaabe9e9d"
        ]
      },
      {
        "inputKey": "installer_round_cap_status",
        "label": "installer round cap status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6968bbfaaabe9e9d"
        ]
      },
      {
        "inputKey": "application_round",
        "label": "application round",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6968bbfaaabe9e9d"
        ]
      },
      {
        "inputKey": "ownership",
        "label": "ownership",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6968bbfaaabe9e9d"
        ]
      },
      {
        "inputKey": "project_watts",
        "label": "project watts",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6968bbfaaabe9e9d"
        ]
      },
      {
        "inputKey": "adder_quantities",
        "label": "adder quantities",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6968bbfaaabe9e9d"
        ]
      },
      {
        "inputKey": "cap_availability",
        "label": "cap availability",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6968bbfaaabe9e9d"
        ]
      }
    ],
    "confidence": {
      "overall": 0.72,
      "calculation": 0.72,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_calculation_package_found",
        "calculation_status_calculable_with_missing_inputs",
        "source_confidence_high",
        "estimate_confidence_medium",
        "value_model_rate_table"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_981329af0da6297b",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Commerce RI commercial REF uses solar capacity tiers and capped adders for carports and storage.",
        "sourceUrls": [
          "https://commerceri.com/renewable-energy-fund/",
          "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Commercial_RFP_1__0ab2622e-1f9a-44af-b983-3fe495aab483.pdf",
          "https://assets.simpleviewinc.com/simpleview/image/upload/v1/clients/rhodeisland/Commercial_Flyer_778e7b33-c575-431c-9973-44bc372ed4cc.pdf",
          "https://programs.dsireusa.org/system/program/detail/5362/commercial-scale-renewable-energy-grants-commerce-ri"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  }
]
