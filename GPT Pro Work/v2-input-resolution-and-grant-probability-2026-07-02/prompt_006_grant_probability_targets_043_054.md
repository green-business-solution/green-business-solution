You are helping RetroFi refine grant and incentive expected-value estimates.

Current date: 2026-07-02. Program status, deadlines, budgets, and award statistics are time-sensitive. Check official sources wherever possible.

## Prompt grant_probability_043_054: grant expected-value metadata repair

For each target below, repair the grant-related estimate metadata. We need two separate things:

1. Conditional award amount: what could the matched applicant/project receive if selected or approved, using source-backed formulas/ranges/caps.
2. Probability evidence: whether there is enough evidence to discount a competitive grant into a conservative expected value.

Do not confuse these. A source saying "up to $250,000" gives a possible cap, not an expected value. Do not include max-only competitive grants in user-facing savings totals unless probability evidence exists or RetroFi later approves a human-reviewed prior.

## Output JSON schema

Return one JSON object only, no markdown fences.

{
  "schemaVersion": "retrofi_grant_probability_repair.v1",
  "researchedAt": "2026-07-02",
  "promptId": "grant_probability_043_054",
  "batchRange": "043-054",
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

## Targets 043-054

[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5411",
    "programName": "Bryan Texas Utilities - SmartHOME Residential Energy Efficiency Rebate Program",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "insulation_upgrade"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_one_time_savings_1_7fc9743b97312001",
    "effectType": "one_time_savings",
    "label": "SmartHOME rebate for qualifying envelope projects is calculated from BTU's predetermined average kW savings and program incentive calculation. Each qualifying project is guaranteed at least 10% of total project cost and capped at 25% of total project cost.",
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
        "cap_type": "maximum_percent_of_cost",
        "percent": 0.25,
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
          "effect_one_time_savings_1_7fc9743b97312001"
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
          "effect_one_time_savings_1_7fc9743b97312001"
        ]
      },
      {
        "inputKey": "btu_calculated_incentive",
        "label": "BTU calculated incentive",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_7fc9743b97312001"
        ]
      },
      {
        "inputKey": "before_and_after_documentation",
        "label": "before-and-after documentation",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_7fc9743b97312001"
        ]
      },
      {
        "inputKey": "central_electric_heat_and_air_confirmation",
        "label": "central electric heat and air confirmation",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_7fc9743b97312001"
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
        "evidenceId": "evidence_776ba3ec6bd9a75f",
        "sourceType": "gpt_pro_research_summary",
        "quote": "The old 25% rule overstated the value as a guaranteed percentage; current logic is a calculated incentive with a 10% floor and 25% cap.",
        "sourceUrls": [
          "https://www.btutilities.com/smarthome",
          "https://www.btutilities.com/energy-efficiency/smarthome-programs/"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5558",
    "programName": "City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "high_efficiency_hvac_replacement"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_grant_expected_value_2_a28bd747b9260955",
    "effectType": "grant_expected_value",
    "label": "CORE implementation grants for larger, long-term, impactful existing-building projects may provide up to $200,000 when rebates are insufficient. Grant award depends on greenhouse-gas impact analysis, application review, and available funds.",
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
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "property_type",
        "label": "property type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_22733c30bc9dd9f9"
        ]
      },
      {
        "inputKey": "county_or_service_geography",
        "label": "county or service geography",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_22733c30bc9dd9f9"
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
          "effect_one_time_savings_1_22733c30bc9dd9f9"
        ]
      },
      {
        "inputKey": "participant_priority_category",
        "label": "participant priority category",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_22733c30bc9dd9f9"
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
          "effect_one_time_savings_1_22733c30bc9dd9f9"
        ]
      },
      {
        "inputKey": "core_preapproval_requirements",
        "label": "CORE preapproval requirements",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_22733c30bc9dd9f9"
        ]
      },
      {
        "inputKey": "measure_eligibility",
        "label": "measure eligibility",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_22733c30bc9dd9f9"
        ]
      },
      {
        "inputKey": "greenhouse_gas_impact_analysis",
        "label": "greenhouse-gas impact analysis",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a28bd747b9260955"
        ]
      },
      {
        "inputKey": "core_grant_application",
        "label": "CORE grant application",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a28bd747b9260955"
        ]
      },
      {
        "inputKey": "rebate_insufficiency_rationale",
        "label": "rebate insufficiency rationale",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a28bd747b9260955"
        ]
      },
      {
        "inputKey": "award_decision",
        "label": "award decision",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a28bd747b9260955"
        ]
      },
      {
        "inputKey": "grant_request",
        "label": "grant request",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a28bd747b9260955"
        ]
      },
      {
        "inputKey": "ghg_impact_analysis",
        "label": "GHG impact analysis",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a28bd747b9260955"
        ]
      },
      {
        "inputKey": "award_probability",
        "label": "award probability",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a28bd747b9260955"
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
        "value_model_competitive_max_only"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_9b09b26d9683ee6c",
        "sourceType": "gpt_pro_research_summary",
        "quote": "CORE publishes rebate caps and grant maximums for qualifying efficiency and electrification projects.",
        "sourceUrls": [
          "https://www.aspencore.org/grants-and-funding-programs",
          "https://www.aspencore.org/funding-criteria",
          "https://www.aspencore.org/commercial-multifamily-funding",
          "https://www.aspencore.org/residential-rebates-updated"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5558",
    "programName": "City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "high_efficiency_hvac_replacement"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_one_time_savings_1_22733c30bc9dd9f9",
    "effectType": "one_time_savings",
    "label": "Commercial and multifamily rebates generally cover 50% of eligible project cost, capped at $25,000 for standard participants or $50,000 for Community Priority Participants, for qualifying existing-building efficiency and electrification measures.",
    "existingCalculation": {
      "method": "percent_of_cost",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": null,
      "minAwardCents": null,
      "percent": 50,
      "costInput": "eligible_project_cost_cents",
      "amount": null,
      "formula": null,
      "reason": null
    },
    "caps": [
      {
        "cap_type": "maximum_amount",
        "amount": {
          "value": 25000,
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
        "inputKey": "property_type",
        "label": "property type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_22733c30bc9dd9f9"
        ]
      },
      {
        "inputKey": "county_or_service_geography",
        "label": "county or service geography",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_22733c30bc9dd9f9"
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
          "effect_one_time_savings_1_22733c30bc9dd9f9"
        ]
      },
      {
        "inputKey": "participant_priority_category",
        "label": "participant priority category",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_22733c30bc9dd9f9"
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
          "effect_one_time_savings_1_22733c30bc9dd9f9"
        ]
      },
      {
        "inputKey": "core_preapproval_requirements",
        "label": "CORE preapproval requirements",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_22733c30bc9dd9f9"
        ]
      },
      {
        "inputKey": "measure_eligibility",
        "label": "measure eligibility",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_22733c30bc9dd9f9"
        ]
      },
      {
        "inputKey": "greenhouse_gas_impact_analysis",
        "label": "greenhouse-gas impact analysis",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a28bd747b9260955"
        ]
      },
      {
        "inputKey": "core_grant_application",
        "label": "CORE grant application",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a28bd747b9260955"
        ]
      },
      {
        "inputKey": "rebate_insufficiency_rationale",
        "label": "rebate insufficiency rationale",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a28bd747b9260955"
        ]
      },
      {
        "inputKey": "award_decision",
        "label": "award decision",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a28bd747b9260955"
        ]
      },
      {
        "inputKey": "grant_request",
        "label": "grant request",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a28bd747b9260955"
        ]
      },
      {
        "inputKey": "ghg_impact_analysis",
        "label": "GHG impact analysis",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a28bd747b9260955"
        ]
      },
      {
        "inputKey": "award_probability",
        "label": "award probability",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a28bd747b9260955"
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
        "value_model_capped_percent_of_eligible_cost"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_9b09b26d9683ee6c",
        "sourceType": "gpt_pro_research_summary",
        "quote": "CORE publishes rebate caps and grant maximums for qualifying efficiency and electrification projects.",
        "sourceUrls": [
          "https://www.aspencore.org/grants-and-funding-programs",
          "https://www.aspencore.org/funding-criteria",
          "https://www.aspencore.org/commercial-multifamily-funding",
          "https://www.aspencore.org/residential-rebates-updated"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5618",
    "programName": "Weatherization Program",
    "packageCalculationStatus": "non_monetary_workflow",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "air_sealing_weatherization"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_process_value_1_46168ef875f4a0b9",
    "effectType": "process_value",
    "label": "Income-qualified applicants apply through regional service providers; approved homes receive provider-delivered weatherization services at no cost, with no published per-home rebate or grant amount for direct estimating.",
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
      "reason": "non_cash_process_value is not included in automated totals without additional estimator support."
    },
    "caps": [],
    "requiredInputs": [
      {
        "inputKey": "household_income_eligibility",
        "label": "household income eligibility",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_46168ef875f4a0b9"
        ]
      },
      {
        "inputKey": "regional_service_provider",
        "label": "regional service provider",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_46168ef875f4a0b9"
        ]
      },
      {
        "inputKey": "home_type",
        "label": "home type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_46168ef875f4a0b9"
        ]
      },
      {
        "inputKey": "provider_scope_approval",
        "label": "provider scope approval",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_46168ef875f4a0b9"
        ]
      }
    ],
    "confidence": {
      "overall": 0.38,
      "calculation": 0.38,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_non_monetary_workflow",
        "calculation_status_non_monetary_workflow",
        "source_confidence_high",
        "estimate_confidence_low",
        "value_model_non_cash_process_value"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_d079d66ea4003e66",
        "sourceType": "gpt_pro_research_summary",
        "quote": "AHFC weatherization is a no-cost service workflow for income-qualified households through regional providers, not a customer rebate table.",
        "sourceUrls": [
          "https://www.ahfc.us/efficiency/weatherization",
          "https://www.ahfc.us/efficiency/weatherization/weatherization-service-providers",
          "https://www.ahfc.us/efficiency/weatherization/weatherization-operations-manual"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5712",
    "programName": "Low Income Home Energy Assistance Program (LIHEAP)",
    "packageCalculationStatus": "no_calculable_value",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "air_sealing_weatherization"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_no_cash_value_1_2c3a4534ab53f492",
    "effectType": "no_cash_value",
    "label": "LIHEAP benefit amounts and service types are set by the administering state, territory, tribe, or local grantee. Weatherization and minor repairs are optional local pathways, not a national retrofit rebate formula.",
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
    "caps": [],
    "requiredInputs": [
      {
        "inputKey": "administering_liheap_grantee",
        "label": "administering LIHEAP grantee",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_no_cash_value_1_2c3a4534ab53f492"
        ]
      },
      {
        "inputKey": "local_benefit_type",
        "label": "local benefit type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_no_cash_value_1_2c3a4534ab53f492"
        ]
      },
      {
        "inputKey": "approved_household_benefit_or_service_scope",
        "label": "approved household benefit or service scope",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_no_cash_value_1_2c3a4534ab53f492"
        ]
      },
      {
        "inputKey": "approved_benefit_amount_or_service_scope",
        "label": "approved benefit amount or service scope",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_no_cash_value_1_2c3a4534ab53f492"
        ]
      }
    ],
    "confidence": {
      "overall": 0.38,
      "calculation": 0.38,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_custom_quote_required",
        "calculation_status_no_calculable_value",
        "source_confidence_high",
        "estimate_confidence_low",
        "value_model_custom_quote"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_e8649d64525cd03a",
        "sourceType": "gpt_pro_research_summary",
        "quote": "LIHEAP is local-grantee assistance; no national weatherization dollar formula is available for a typical project estimate.",
        "sourceUrls": [
          "https://www.acf.hhs.gov/ocs/low-income-home-energy-assistance-program-liheap",
          "https://www.acf.hhs.gov/ocs/fact-sheet/liheap-fact-sheet",
          "https://www.acf.hhs.gov/ocs/programs/liheap/about"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:5796",
    "programName": "Efficiency Works - Business Energy Efficiency Rebate Program (Offered by 4 Utilities)",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_one_time_savings_1_2750a32ce554031b",
    "effectType": "one_time_savings",
    "label": "Community Efficiency Grant adds an incentive equal to 100% of the standard Efficiency Works rebate, capped at total project cost and limited to the grant pathway.",
    "existingCalculation": {
      "method": "percent_of_cost",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": null,
      "minAwardCents": null,
      "percent": 1,
      "costInput": "eligible_project_cost_cents",
      "amount": null,
      "formula": null,
      "reason": null
    },
    "caps": [
      {
        "cap_type": "maximum_percent_of_cost",
        "percent": 1,
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "standard_rebate_cents",
        "label": "standard rebate cents",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_2750a32ce554031b"
        ]
      },
      {
        "inputKey": "eligible_project_cost_cents",
        "label": "eligible project cost cents",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_2750a32ce554031b"
        ]
      },
      {
        "inputKey": "community_grant_qualification",
        "label": "community grant qualification",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_2750a32ce554031b"
        ]
      },
      {
        "inputKey": "completion_date",
        "label": "completion date",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_2750a32ce554031b"
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
        "value_model_capped_percent_of_eligible_cost"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_78439f95e32bccbf",
        "sourceType": "gpt_pro_research_summary",
        "quote": "The legacy 100% rule is not a base formula; it is a special additional grant incentive equal to the standard rebate.",
        "sourceUrls": [
          "https://efficiencyworks.org/for-your-business-rebates-and-incentives/",
          "https://efficiencyworks.org/wp-content/uploads/2025/02/Efficiency-Works-Business-Programs-Guide.pdf"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:918",
    "programName": "Office of Indian Energy Policy and Programs - Funding Opportunities",
    "packageCalculationStatus": "no_calculable_value",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_grant_expected_value_2_c767034e167ad0f6",
    "effectType": "grant_expected_value",
    "label": "Current DOE Indian Energy funding opportunities are competitive FOAs. Award value depends on the FOA, topic area, budget, cost share, and application review; no expected value should be assigned without probability evidence.",
    "existingCalculation": {
      "method": "expected_value",
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
        "inputKey": "eligible_tribal_or_alaska_native_entity",
        "label": "eligible Tribal or Alaska Native entity",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_b76fbb43e2475d79"
        ]
      },
      {
        "inputKey": "technical_assistance_request_scope",
        "label": "technical assistance request scope",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_b76fbb43e2475d79"
        ]
      },
      {
        "inputKey": "current_foa_topic",
        "label": "current FOA topic",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_c767034e167ad0f6"
        ]
      },
      {
        "inputKey": "eligible_project_budget",
        "label": "eligible project budget",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_c767034e167ad0f6"
        ]
      },
      {
        "inputKey": "cost_share_requirement",
        "label": "cost share requirement",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_c767034e167ad0f6"
        ]
      },
      {
        "inputKey": "application_score_or_award_probability",
        "label": "application score or award probability",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_c767034e167ad0f6"
        ]
      },
      {
        "inputKey": "award_probability",
        "label": "award probability",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_c767034e167ad0f6"
        ]
      }
    ],
    "confidence": {
      "overall": 0.38,
      "calculation": 0.38,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_bad_edge_delete_only",
        "calculation_status_no_calculable_value",
        "source_confidence_high",
        "estimate_confidence_low",
        "value_model_competitive_max_only"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_aa4cd62b6805247b",
        "sourceType": "gpt_pro_research_summary",
        "quote": "DOE Indian Energy is a competitive FOA and technical-assistance portal, not a standalone weatherization rebate.",
        "sourceUrls": [
          "https://www.energy.gov/indianenergy/current-funding-and-technical-assistance-opportunities",
          "https://ie-exchange.energy.gov/",
          "https://www.energy.gov/indianenergy/office-indian-energy-policy-and-programs"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891",
    "programName": "National Electric Vehicle Infrastructure (NEVI) Program",
    "packageCalculationStatus": "non_monetary_workflow",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_grant_expected_value_2_78ea28615e9acd08",
    "effectType": "grant_expected_value",
    "label": "For the CEC-administered California NEVI solicitation, potential funding is competitive and may use the federal NEVI cost-share limit of up to 80% of eligible project cost; no expected value should be counted without award probability evidence.",
    "existingCalculation": {
      "method": "expected_value",
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
        "cap_type": "maximum_percent_of_cost",
        "percent": 0.8,
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "sdge_service_area_site",
        "label": "SDGE service area site",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_cf6d168f0142b014"
        ]
      },
      {
        "inputKey": "nevi_corridor_group",
        "label": "NEVI corridor group",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_cf6d168f0142b014"
        ]
      },
      {
        "inputKey": "project_concept",
        "label": "project concept",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_cf6d168f0142b014"
        ]
      },
      {
        "inputKey": "cec_solicitation_application",
        "label": "CEC solicitation application",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_cf6d168f0142b014"
        ]
      },
      {
        "inputKey": "site_nevi_fit",
        "label": "site NEVI fit",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_cf6d168f0142b014"
        ]
      },
      {
        "inputKey": "application_status",
        "label": "application status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_cf6d168f0142b014"
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
          "effect_grant_expected_value_2_78ea28615e9acd08"
        ]
      },
      {
        "inputKey": "cec_application_score_or_award",
        "label": "CEC application score or award",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_78ea28615e9acd08"
        ]
      },
      {
        "inputKey": "nevi_corridor_site",
        "label": "NEVI corridor site",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_78ea28615e9acd08"
        ]
      },
      {
        "inputKey": "approved_cost_share",
        "label": "approved cost share",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_78ea28615e9acd08"
        ]
      },
      {
        "inputKey": "dc_fast_charger_scope",
        "label": "DC fast charger scope",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_78ea28615e9acd08"
        ]
      },
      {
        "inputKey": "award_selection_probability",
        "label": "award selection probability",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_78ea28615e9acd08"
        ]
      },
      {
        "inputKey": "approved_award_amount",
        "label": "approved award amount",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_78ea28615e9acd08"
        ]
      }
    ],
    "confidence": {
      "overall": 0.38,
      "calculation": 0.38,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_non_monetary_workflow",
        "calculation_status_non_monetary_workflow",
        "source_confidence_high",
        "estimate_confidence_low",
        "value_model_competitive_cost_share"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_e7184fbf66a1f4fc",
        "sourceType": "gpt_pro_research_summary",
        "quote": "SDG&E's page is application support. The monetary opportunity is a CEC competitive NEVI solicitation for public high-powered DC fast charging, not a direct utility rebate.",
        "sourceUrls": [
          "https://www.sdge.com/business/electric-vehicles/nevi",
          "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
          "https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs",
          "https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891",
    "programName": "National Electric Vehicle Infrastructure (NEVI) Program",
    "packageCalculationStatus": "non_monetary_workflow",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_process_value_1_cf6d168f0142b014",
    "effectType": "process_value",
    "label": "SDG&E provides customer support for businesses pursuing California NEVI funding, but the SDG&E page is not a direct charger rebate or grant award.",
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
      "reason": "non_cash_process_value is not included in automated totals without additional estimator support."
    },
    "caps": [],
    "requiredInputs": [
      {
        "inputKey": "sdge_service_area_site",
        "label": "SDGE service area site",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_cf6d168f0142b014"
        ]
      },
      {
        "inputKey": "nevi_corridor_group",
        "label": "NEVI corridor group",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_cf6d168f0142b014"
        ]
      },
      {
        "inputKey": "project_concept",
        "label": "project concept",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_cf6d168f0142b014"
        ]
      },
      {
        "inputKey": "cec_solicitation_application",
        "label": "CEC solicitation application",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_cf6d168f0142b014"
        ]
      },
      {
        "inputKey": "site_nevi_fit",
        "label": "site NEVI fit",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_cf6d168f0142b014"
        ]
      },
      {
        "inputKey": "application_status",
        "label": "application status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_process_value_1_cf6d168f0142b014"
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
          "effect_grant_expected_value_2_78ea28615e9acd08"
        ]
      },
      {
        "inputKey": "cec_application_score_or_award",
        "label": "CEC application score or award",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_78ea28615e9acd08"
        ]
      },
      {
        "inputKey": "nevi_corridor_site",
        "label": "NEVI corridor site",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_78ea28615e9acd08"
        ]
      },
      {
        "inputKey": "approved_cost_share",
        "label": "approved cost share",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_78ea28615e9acd08"
        ]
      },
      {
        "inputKey": "dc_fast_charger_scope",
        "label": "DC fast charger scope",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_78ea28615e9acd08"
        ]
      },
      {
        "inputKey": "award_selection_probability",
        "label": "award selection probability",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_78ea28615e9acd08"
        ]
      },
      {
        "inputKey": "approved_award_amount",
        "label": "approved award amount",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_78ea28615e9acd08"
        ]
      }
    ],
    "confidence": {
      "overall": 0.38,
      "calculation": 0.38,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_non_monetary_workflow",
        "calculation_status_non_monetary_workflow",
        "source_confidence_high",
        "estimate_confidence_low",
        "value_model_non_cash_process_value"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_e7184fbf66a1f4fc",
        "sourceType": "gpt_pro_research_summary",
        "quote": "SDG&E's page is application support. The monetary opportunity is a CEC competitive NEVI solicitation for public high-powered DC fast charging, not a direct utility rebate.",
        "sourceUrls": [
          "https://www.sdge.com/business/electric-vehicles/nevi",
          "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
          "https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs",
          "https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:emerging-technologies-grant",
    "programName": "Emerging Technologies Grant",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_grant_expected_value_1_23a2e7833c383169",
    "effectType": "grant_expected_value",
    "label": "Potential grant equals approved annual kWh savings multiplied by $0.35 per kWh, subject to SVP approval, not more than 85% of total measure cost, $250,000 per customer per program year, and $500,000 annual program funding.",
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
          "value": 250000,
          "currency": "USD"
        },
        "applies_to": "effect"
      },
      {
        "cap_type": "maximum_percent_of_cost",
        "percent": 0.85,
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "approved_annual_kwh_savings",
        "label": "approved annual kwh savings",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_23a2e7833c383169"
        ]
      },
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
          "effect_grant_expected_value_1_23a2e7833c383169"
        ]
      },
      {
        "inputKey": "svp_preapproval",
        "label": "svp preapproval",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_23a2e7833c383169"
        ]
      },
      {
        "inputKey": "verified_savings",
        "label": "verified savings",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_23a2e7833c383169"
        ]
      },
      {
        "inputKey": "project_risk_adjustment",
        "label": "project risk adjustment",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_23a2e7833c383169"
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
        "value_model_hybrid_rate_plus_cap"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_b51f9dd620210659",
        "sourceType": "gpt_pro_research_summary",
        "quote": "SVP publishes an emerging technologies grant based on approved annual kWh savings with project-cost and program caps.",
        "sourceUrls": [
          "https://www.siliconvalleypower.com/businesses/rebates",
          "https://www.siliconvalleypower.com/home/showpublisheddocument/46967/638868862568870000",
          "https://www.siliconvalleypower.com/home/showpublisheddocument/5082/638917985630870000"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations",
    "programName": "Energy Efficiency Grant Program for Nonprofit Organizations",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "air_sealing_weatherization",
      "high_efficiency_hvac_replacement",
      "led_lighting_retrofit"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_grant_expected_value_1_6f580262ed2e24cd",
    "effectType": "grant_expected_value",
    "label": "Grant can fund up to 80% of eligible electricity-saving project cost, capped at $25,000 for a single project; award is application-based and not an expected cash estimate without award probability.",
    "existingCalculation": {
      "method": "percent_of_cost",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": null,
      "minAwardCents": null,
      "percent": 0.8,
      "costInput": "eligible_project_cost_cents",
      "amount": null,
      "formula": null,
      "reason": null
    },
    "caps": [
      {
        "cap_type": "maximum_amount",
        "amount": {
          "value": 25000,
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
          "effect_grant_expected_value_1_6f580262ed2e24cd"
        ]
      },
      {
        "inputKey": "project_scope",
        "label": "project scope",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6f580262ed2e24cd"
        ]
      },
      {
        "inputKey": "estimated_electricity_savings",
        "label": "estimated electricity savings",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6f580262ed2e24cd"
        ]
      },
      {
        "inputKey": "nonprofit_status",
        "label": "nonprofit status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6f580262ed2e24cd"
        ]
      },
      {
        "inputKey": "svp_customer_of_record_status",
        "label": "SVP customer of record status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6f580262ed2e24cd"
        ]
      },
      {
        "inputKey": "application_period",
        "label": "application period",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6f580262ed2e24cd"
        ]
      },
      {
        "inputKey": "svp_preapproval",
        "label": "SVP preapproval",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6f580262ed2e24cd"
        ]
      },
      {
        "inputKey": "svp_award_decision",
        "label": "SVP award decision",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6f580262ed2e24cd"
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
        "value_model_capped_percent_of_eligible_cost"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_ea48566b4319cb92",
        "sourceType": "gpt_pro_research_summary",
        "quote": "The legacy $250,000 cap was corrected to $25,000 for the nonprofit energy efficiency grant.",
        "sourceUrls": [
          "https://www.siliconvalleypower.com/businesses/rebates",
          "https://www.siliconvalleypower.com/home/showpublisheddocument/65401/638892913182770000"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:nonprofit-solar-grant",
    "programName": "Nonprofit Solar Grant",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "rooftop_solar_pv"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_grant_expected_value_1_5bab9aa147dbe71e",
    "effectType": "grant_expected_value",
    "label": "Grant reimburses up to 100% of eligible nonprofit-owned solar PV system cost, capped at $100,000. No more than 10% of grant funds may be used for building repairs or PV-ready infrastructure, leases and PPAs are ineligible, and system size may not exceed 80% of annual electricity use.",
    "existingCalculation": {
      "method": "percent_of_cost",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": null,
      "minAwardCents": null,
      "percent": 1,
      "costInput": "eligible_project_cost_cents",
      "amount": null,
      "formula": null,
      "reason": null
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
        "percent": 1,
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "eligible_system_cost",
        "label": "eligible system cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_5bab9aa147dbe71e"
        ]
      },
      {
        "inputKey": "nonprofit_status",
        "label": "nonprofit status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_5bab9aa147dbe71e"
        ]
      },
      {
        "inputKey": "system_ownership_model",
        "label": "system ownership model",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_5bab9aa147dbe71e"
        ]
      },
      {
        "inputKey": "annual_electric_usage_kwh",
        "label": "annual electric usage kwh",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_5bab9aa147dbe71e"
        ]
      },
      {
        "inputKey": "project_preapproval",
        "label": "project preapproval",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_5bab9aa147dbe71e"
        ]
      },
      {
        "inputKey": "pv_ready_costs",
        "label": "pv ready costs",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_5bab9aa147dbe71e"
        ]
      },
      {
        "inputKey": "annual_usage_kwh",
        "label": "annual usage kwh",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
          "effect_grant_expected_value_1_5bab9aa147dbe71e"
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
        "value_model_capped_percent_of_eligible_cost"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_e9bf78fd2b846895",
        "sourceType": "gpt_pro_research_summary",
        "quote": "SVP's nonprofit grant application supports nonprofit-owned solar PV systems up to $100,000 and 100% of eligible cost.",
        "sourceUrls": [
          "https://www.siliconvalleypower.com/home/showpublisheddocument/82370/638409969485570000",
          "https://www.siliconvalleypower.com/businesses/rebates"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  }
]
