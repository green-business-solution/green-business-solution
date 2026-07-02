You are helping RetroFi refine grant and incentive expected-value estimates.

Current date: 2026-07-02. Program status, deadlines, budgets, and award statistics are time-sensitive. Check official sources wherever possible.

## Prompt grant_probability_015_028: grant expected-value metadata repair

For each target below, repair the grant-related estimate metadata. We need two separate things:

1. Conditional award amount: what could the matched applicant/project receive if selected or approved, using source-backed formulas/ranges/caps.
2. Probability evidence: whether there is enough evidence to discount a competitive grant into a conservative expected value.

Do not confuse these. A source saying "up to $250,000" gives a possible cap, not an expected value. Do not include max-only competitive grants in user-facing savings totals unless probability evidence exists or RetroFi later approves a human-reviewed prior.

## Output JSON schema

Return one JSON object only, no markdown fences.

{
  "schemaVersion": "retrofi_grant_probability_repair.v1",
  "researchedAt": "2026-07-02",
  "promptId": "grant_probability_015_028",
  "batchRange": "015-028",
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

## Targets 015-028

[
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22374",
    "programName": "Portland General Electric (PGE) - Residential EV Charging Pilot Program",
    "packageCalculationStatus": "estimate_from_range",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
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
    "effectId": "effect_one_time_savings_1_f0e22f4ef84898c3",
    "effectType": "one_time_savings",
    "label": "PGE Plus residential Level 2 charger purchase or installation rebates vary by income and project path, with published examples stating customers may qualify for at least $300 and up to $6,000.",
    "existingCalculation": {
      "method": "expected_value",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": 30000,
      "maxAwardCents": 600000,
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
          "value": 6000,
          "currency": "USD"
        },
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "pge_residential_account",
        "label": "PGE residential account",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_f0e22f4ef84898c3"
        ]
      },
      {
        "inputKey": "homeownership_or_eligible_site",
        "label": "homeownership or eligible site",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_f0e22f4ef84898c3"
        ]
      },
      {
        "inputKey": "ev_ownership_or_lease",
        "label": "EV ownership or lease",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_f0e22f4ef84898c3"
        ]
      },
      {
        "inputKey": "income_tier",
        "label": "income tier",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_f0e22f4ef84898c3"
        ]
      },
      {
        "inputKey": "charger_model",
        "label": "charger model",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_f0e22f4ef84898c3"
        ]
      },
      {
        "inputKey": "installation_path",
        "label": "installation path",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_f0e22f4ef84898c3"
        ]
      },
      {
        "inputKey": "smart_charging_enrollment",
        "label": "Smart Charging enrollment",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_f0e22f4ef84898c3"
        ]
      },
      {
        "inputKey": "site_eligibility",
        "label": "site eligibility",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_f0e22f4ef84898c3"
        ]
      },
      {
        "inputKey": "eligible_connected_charger_or_vehicle",
        "label": "eligible connected charger or vehicle",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_recurring_savings_2_4ff7e6e8d88211de"
        ]
      },
      {
        "inputKey": "season_participation",
        "label": "season participation",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_recurring_savings_2_4ff7e6e8d88211de"
        ]
      },
      {
        "inputKey": "charger_connected_at_least_50_of_the_time",
        "label": "charger connected at least 50% of the time",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_recurring_savings_2_4ff7e6e8d88211de"
        ]
      },
      {
        "inputKey": "at_least_13_charges",
        "label": "at least 13 charges",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_recurring_savings_2_4ff7e6e8d88211de"
        ]
      },
      {
        "inputKey": "participation_in_at_least_three_events",
        "label": "participation in at least three events",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_recurring_savings_2_4ff7e6e8d88211de"
        ]
      },
      {
        "inputKey": "seasonal_participation_data",
        "label": "seasonal participation data",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_recurring_savings_2_4ff7e6e8d88211de"
        ]
      }
    ],
    "confidence": {
      "overall": 0.72,
      "calculation": 0.72,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_calculation_package_found",
        "calculation_status_estimate_from_range",
        "source_confidence_high",
        "estimate_confidence_medium",
        "value_model_competitive_award_range"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_1fdf0cb813e6d3b4",
        "sourceType": "gpt_pro_research_summary",
        "quote": "PGE home charging and PGE Plus pages publish residential Level 2 charger rebate ranges and ongoing Smart Charging bill credits.",
        "sourceUrls": [
          "https://portlandgeneral.com/energy-choices/electric-vehicles-charging/charging-your-ev/charging-your-ev-at-home",
          "https://portlandgeneral.com/charge-faster",
          "https://portlandgeneral.com/pge-plus-static",
          "https://portlandgeneral.com/pge-plus-faq",
          "https://portlandgeneral.com/secure/pge-plus/ev-charger/rebate-only"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22529",
    "programName": "Community EV Chargers Incentive Program",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "ev_charger_installation",
      "ev_make_ready_electrical_upgrade",
      "level_2_ev_charger_installation"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_one_time_savings_1_e29ce1b501eddf87",
    "effectType": "one_time_savings",
    "label": "Grant equals eligible costs after required applicant match, subject to charger hardware, make-ready/installation, project, county, and applicant caps. Open workplace and multi-unit residential tracks can cover 90% to 100% of eligible costs, with a $100,000 applicant cap. Public-attraction DCFC funding is not currently open.",
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
          "value": 100000,
          "currency": "USD"
        },
        "applies_to": "effect"
      },
      {
        "cap_type": "maximum_percent_of_cost",
        "percent": 100,
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "site_track",
        "label": "site track",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_e29ce1b501eddf87"
        ]
      },
      {
        "inputKey": "applicant_type",
        "label": "applicant type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_e29ce1b501eddf87"
        ]
      },
      {
        "inputKey": "county",
        "label": "county",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_e29ce1b501eddf87"
        ]
      },
      {
        "inputKey": "charger_level",
        "label": "charger level",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_e29ce1b501eddf87"
        ]
      },
      {
        "inputKey": "ocpp_compliance",
        "label": "OCPP compliance",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_e29ce1b501eddf87"
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
          "effect_one_time_savings_1_e29ce1b501eddf87"
        ]
      },
      {
        "inputKey": "employee_count_or_dwelling_unit_count",
        "label": "employee count or dwelling unit count",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_e29ce1b501eddf87"
        ]
      },
      {
        "inputKey": "eligible_hardware_cost",
        "label": "eligible hardware cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_e29ce1b501eddf87"
        ]
      },
      {
        "inputKey": "eligible_make_ready_and_installation_cost",
        "label": "eligible make-ready and installation cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_e29ce1b501eddf87"
        ]
      },
      {
        "inputKey": "required_applicant_match_percentage",
        "label": "required applicant match percentage",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_e29ce1b501eddf87"
        ]
      },
      {
        "inputKey": "funding_availability",
        "label": "funding availability",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_e29ce1b501eddf87"
        ]
      },
      {
        "inputKey": "eligible_costs",
        "label": "eligible costs",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_e29ce1b501eddf87"
        ]
      },
      {
        "inputKey": "county_funding_status",
        "label": "county funding status",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_e29ce1b501eddf87"
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
        "evidenceId": "evidence_08723a9b6a22fb56",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Charge Vermont grants can cover 90% to 100% of eligible workplace or multi-unit charger costs, subject to equipment, project, county and applicant caps.",
        "sourceUrls": [
          "https://www.chargevermont.com/",
          "https://www.chargevermont.com/apply/",
          "https://www.chargevermont.com/workplace-chargers/",
          "https://www.chargevermont.com/multi-unit-residential-chargers/",
          "https://www.chargevermont.com/public-attraction-chargers/",
          "https://www.chargevermont.com/faqs/",
          "https://www.chargevermont.com/news-updates-2/"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
    "programName": "California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
    "effectId": "effect_grant_expected_value_1_c93b27f2d9d796eb",
    "effectType": "grant_expected_value",
    "label": "California NEVI funding is awarded through competitive CEC solicitations for publicly accessible high-powered DC fast charging; federal grant share is generally capped at 80% of allowable project cost with required match.",
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
        "inputKey": "solicitation_number",
        "label": "solicitation number",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_c93b27f2d9d796eb"
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
          "effect_grant_expected_value_1_c93b27f2d9d796eb"
        ]
      },
      {
        "inputKey": "requested_grant_amount",
        "label": "requested grant amount",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_c93b27f2d9d796eb"
        ]
      },
      {
        "inputKey": "match_funding",
        "label": "match funding",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_c93b27f2d9d796eb"
        ]
      },
      {
        "inputKey": "dcfc_site_and_corridor_compliance",
        "label": "dcfc site and corridor compliance",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_c93b27f2d9d796eb"
        ]
      },
      {
        "inputKey": "award_selection_status",
        "label": "award selection status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_c93b27f2d9d796eb"
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
        "evidenceId": "evidence_83e7014507a30f21",
        "sourceType": "gpt_pro_research_summary",
        "quote": "California NEVI is a competitive public DC fast-charging grant program, not an automatic charger rebate.",
        "sourceUrls": [
          "https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs",
          "https://www.energy.ca.gov/programs-and-topics/programs/national-electric-vehicle-infrastructure-nevi-formula-program",
          "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
          "https://programs.dsireusa.org/system/program/detail/22629/california-national-electric-vehicle-infrastructure-nevi-formula-grant-program"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22630",
    "programName": "Hawaii - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "packageCalculationStatus": "custom_quote_estimate",
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
    "effectId": "effect_grant_expected_value_1_83bd8b19270e1ac1",
    "effectType": "grant_expected_value",
    "label": "For HDOT NEVI deployment, selected public DC fast-charging infrastructure may receive federal NEVI cost-share support up to 80% of eligible project cost, but no open direct customer rebate or standard award table was verified.",
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
          "effect_grant_expected_value_1_83bd8b19270e1ac1"
        ]
      },
      {
        "inputKey": "hdot_selection_or_contract_status",
        "label": "HDOT selection or contract status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_83bd8b19270e1ac1"
        ]
      },
      {
        "inputKey": "nevi_site_location",
        "label": "NEVI site location",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_83bd8b19270e1ac1"
        ]
      },
      {
        "inputKey": "charger_power_and_port_count",
        "label": "charger power and port count",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
          "effect_grant_expected_value_1_83bd8b19270e1ac1"
        ]
      },
      {
        "inputKey": "selection_status",
        "label": "selection status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
          "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
          "effect_grant_expected_value_1_83bd8b19270e1ac1"
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
        "value_model_competitive_cost_share"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_ff65fb7839c8041c",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Hawaii NEVI is a state federal-formula deployment program for public DC fast charging. No standard customer-facing rebate amount or open application was verified.",
        "sourceUrls": [
          "https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/",
          "https://hidot.hawaii.gov/highways/kahului-ev-charging-station-opens-feb-28/",
          "https://hidot.hawaii.gov/highways/files/2025/09/20250911-HDOT-letter-Submitting-2025-NEVI-Plan-for-FY26-funding-approved-by-FHWA.pdf",
          "https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22633",
    "programName": "Arkansas - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
    "effectId": "effect_grant_expected_value_1_83c9b6e21b196f8c",
    "effectType": "grant_expected_value",
    "label": "Competitive reimbursement grant may cover up to 80% federal share of eligible NEVI EV charging project costs; proposer must provide 20% non-federal share and be selected under ARDOT's procurement.",
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
          "effect_grant_expected_value_1_83c9b6e21b196f8c"
        ]
      },
      {
        "inputKey": "requested_grant_amount",
        "label": "requested grant amount",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_83c9b6e21b196f8c"
        ]
      },
      {
        "inputKey": "non_federal_match_amount",
        "label": "non federal match amount",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_83c9b6e21b196f8c"
        ]
      },
      {
        "inputKey": "nevi_site_compliance",
        "label": "nevi site compliance",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_83c9b6e21b196f8c"
        ]
      },
      {
        "inputKey": "award_selection_status",
        "label": "award selection status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_83c9b6e21b196f8c"
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
        "evidenceId": "evidence_7ac79e2770aae24a",
        "sourceType": "gpt_pro_research_summary",
        "quote": "ARDOT describes NEVI as a competitive reimbursement program with 80% federal and 20% non-federal cost share.",
        "sourceUrls": [
          "https://ardot.gov/divisions/local-programs/local-funding-opportunities/national-electric-vehicle-infrastructure-nevi-program/",
          "https://www.adeq.state.ar.us/energy/opportunities/nevi/",
          "https://media.ark.org/ardot/ARDOT_EVID_Program_Requirements.pdf",
          "https://media.ark.org/ardot/Submittal-Packet-FY26-EVID-Plan.pdf",
          "https://programs.dsireusa.org/system/program/detail/22633/arkansas-national-electric-vehicle-infrastructure-nevi-formula-grant-program"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22635",
    "programName": "Georgia - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
    "effectId": "effect_grant_expected_value_1_8aaf3b374a0e6004",
    "effectType": "grant_expected_value",
    "label": "For Georgia NEVI public DC fast-charging projects selected through GDOT procurement, potential federal NEVI participation may cover up to 80% of eligible project cost. Awards are competitive and site-specific, so no expected value should be counted without selection probability and approved eligible cost.",
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
          "effect_grant_expected_value_1_8aaf3b374a0e6004"
        ]
      },
      {
        "inputKey": "gdot_procurement_round_or_award",
        "label": "GDOT procurement round or award",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_8aaf3b374a0e6004"
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
          "effect_grant_expected_value_1_8aaf3b374a0e6004"
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
          "effect_grant_expected_value_1_8aaf3b374a0e6004"
        ]
      },
      {
        "inputKey": "station_power_and_port_count",
        "label": "station power and port count",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_8aaf3b374a0e6004"
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
          "effect_grant_expected_value_1_8aaf3b374a0e6004"
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
          "effect_grant_expected_value_1_8aaf3b374a0e6004"
        ]
      },
      {
        "inputKey": "site_eligibility",
        "label": "site eligibility",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_8aaf3b374a0e6004"
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
        "evidenceId": "evidence_0ed36930a099ee22",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Georgia NEVI supports public DC fast-charging infrastructure through competitive, site-specific procurement. The 80% federal share is a cap, not an expected customer rebate.",
        "sourceUrls": [
          "https://nevi-gdot.hub.arcgis.com/",
          "https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/NEVI%20Fact%20Sheet.pdf",
          "https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/GDOT%20NEVI%20Plan.pdf",
          "https://nevi-gdot.hub.arcgis.com/pages/round2",
          "https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22640",
    "programName": "New Hampshire - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
    "effectId": "effect_grant_expected_value_1_08058b4cd05b18d9",
    "effectType": "grant_expected_value",
    "label": "Selected New Hampshire Round II NEVI projects may receive up to 80% federal cost-share for eligible DC fast-charging infrastructure costs; actual awards depend on NHDOT RFP selection and approved eligible costs.",
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
          "effect_grant_expected_value_1_08058b4cd05b18d9"
        ]
      },
      {
        "inputKey": "nhdot_round_ii_selection",
        "label": "nhdot round ii selection",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_08058b4cd05b18d9"
        ]
      },
      {
        "inputKey": "non_federal_match",
        "label": "non federal match",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_08058b4cd05b18d9"
        ]
      },
      {
        "inputKey": "nevi_equipment_compliance",
        "label": "nevi equipment compliance",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_08058b4cd05b18d9"
        ]
      },
      {
        "inputKey": "site_compliance",
        "label": "site compliance",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_08058b4cd05b18d9"
        ]
      },
      {
        "inputKey": "round_ii_selection",
        "label": "round ii selection",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_08058b4cd05b18d9"
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
        "value_model_competitive_cost_share"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_a15cc4cc0ffea069",
        "sourceType": "gpt_pro_research_summary",
        "quote": "New Hampshire NEVI Round II is an active competitive RFP with project-specific awards and an 80% federal share cap.",
        "sourceUrls": [
          "https://www.dot.nh.gov/projects-plans-and-programs/ev-charging-infrastructure",
          "https://www.dot.nh.gov/news-and-media/nhdot-releases-nevi-round-ii-rfp",
          "https://www.dot.nh.gov/doing-business-nhdot/procurement-information",
          "https://www.fhwa.dot.gov/environment/nevi/"
        ],
        "evidenceConfidence": 0.72
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22647",
    "programName": "Michigan - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
    "effectId": "effect_grant_expected_value_1_cddd6282f92b5b42",
    "effectType": "grant_expected_value",
    "label": "Selected Michigan NEVI projects may receive federal cost-share funding up to 80% of eligible EV charging project costs; the actual award is determined by MDOT solicitation selection and approved eligible costs.",
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
          "effect_grant_expected_value_1_cddd6282f92b5b42"
        ]
      },
      {
        "inputKey": "mdot_round_3_award_selection",
        "label": "mdot round 3 award selection",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_cddd6282f92b5b42"
        ]
      },
      {
        "inputKey": "non_federal_match",
        "label": "non federal match",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_cddd6282f92b5b42"
        ]
      },
      {
        "inputKey": "corridor_site_compliance",
        "label": "corridor site compliance",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_cddd6282f92b5b42"
        ]
      },
      {
        "inputKey": "nevi_equipment_compliance",
        "label": "nevi equipment compliance",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_cddd6282f92b5b42"
        ]
      },
      {
        "inputKey": "award_selection",
        "label": "award selection",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_cddd6282f92b5b42"
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
        "evidenceId": "evidence_38715950260508f7",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Michigan NEVI is an active competitive DC fast-charging procurement with up to 80% federal cost share, not a deterministic rebate.",
        "sourceUrls": [
          "https://www.michigan.gov/mdot/travel/mobility/initiatives/nevi",
          "https://www.michigan.gov/mdot/business/contractors/innovativecontracting/national-electric-vehicle-infrastructure-3",
          "https://content.govdelivery.com/accounts/MIDOT/bulletins/41afcf3",
          "https://www.fhwa.dot.gov/environment/nevi/"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22650",
    "programName": "Wisconsin - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "packageCalculationStatus": "custom_quote_estimate",
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
    "effectId": "effect_grant_expected_value_1_87952524be536771",
    "effectType": "grant_expected_value",
    "label": "Wisconsin Electric Vehicle Infrastructure awards may fund up to 80% of eligible NEVI-compliant charging project costs, with at least 20% non-federal match required. Competitive award value depends on application, eligible costs, and WisDOT selection.",
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
          "effect_grant_expected_value_1_87952524be536771"
        ]
      },
      {
        "inputKey": "corridor_eligibility",
        "label": "corridor eligibility",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_87952524be536771"
        ]
      },
      {
        "inputKey": "charger_configuration",
        "label": "charger configuration",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_87952524be536771"
        ]
      },
      {
        "inputKey": "application_score_or_selection_result",
        "label": "application score or selection result",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_87952524be536771"
        ]
      },
      {
        "inputKey": "non_federal_match_amount",
        "label": "non-federal match amount",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_87952524be536771"
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
          "effect_grant_expected_value_1_87952524be536771"
        ]
      },
      {
        "inputKey": "selection_result",
        "label": "selection result",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_87952524be536771"
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
        "value_model_competitive_cost_share"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_3c149aec023973fc",
        "sourceType": "gpt_pro_research_summary",
        "quote": "WEVI is a competitive up-to-80% cost-share program, so no deterministic customer savings should be included by default.",
        "sourceUrls": [
          "https://wisconsindot.gov/Pages/projects/multimodal/electrification.aspx",
          "https://programs.dsireusa.org/system/program/detail/22650/wisconsin-national-electric-vehicle-infrastructure-nevi-formula-grant-program"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22656",
    "programName": "Montana - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
    "effectId": "effect_grant_expected_value_1_0f0a763b480029a9",
    "effectType": "grant_expected_value",
    "label": "Selected Montana NEVI projects may receive up to 80% federal cost-share for eligible public DC fast-charging project costs; actual funding depends on MDT procurement selection, approved costs, and required non-federal match.",
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
          "effect_grant_expected_value_1_0f0a763b480029a9"
        ]
      },
      {
        "inputKey": "mdt_procurement_selection",
        "label": "mdt procurement selection",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_0f0a763b480029a9"
        ]
      },
      {
        "inputKey": "non_federal_match",
        "label": "non federal match",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_0f0a763b480029a9"
        ]
      },
      {
        "inputKey": "alternative_fuel_corridor_site",
        "label": "alternative fuel corridor site",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_0f0a763b480029a9"
        ]
      },
      {
        "inputKey": "nevi_equipment_compliance",
        "label": "nevi equipment compliance",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_0f0a763b480029a9"
        ]
      },
      {
        "inputKey": "procurement_selection",
        "label": "procurement selection",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_0f0a763b480029a9"
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
        "evidenceId": "evidence_75f82fa23a8974fb",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Montana NEVI is a procurement-based DC fast-charging cost-share program, not a guaranteed charger rebate.",
        "sourceUrls": [
          "https://www.mdt.mt.gov/publications/plans/ev/",
          "https://www.mdt.mt.gov/business/contracting/qacurrent.aspx",
          "https://deq.mt.gov/energy/Programs/fuels",
          "https://www.fhwa.dot.gov/environment/nevi/"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22660",
    "programName": "South Dakota - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
    "packageCalculationStatus": "custom_quote_estimate",
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
    "effectId": "effect_grant_expected_value_1_a6d30fcaf50fc997",
    "effectType": "grant_expected_value",
    "label": "NEVI-supported corridor DC fast charging projects may receive federal cost share up to 80% of eligible project construction costs, but awards are solicitation-, corridor-, and site-specific and should not be treated as guaranteed savings.",
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
          "effect_grant_expected_value_1_a6d30fcaf50fc997"
        ]
      },
      {
        "inputKey": "site_corridor_eligibility",
        "label": "site corridor eligibility",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_a6d30fcaf50fc997"
        ]
      },
      {
        "inputKey": "charger_configuration",
        "label": "charger configuration",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_a6d30fcaf50fc997"
        ]
      },
      {
        "inputKey": "solicitation_terms",
        "label": "solicitation terms",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_a6d30fcaf50fc997"
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
          "effect_grant_expected_value_1_a6d30fcaf50fc997"
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
          "effect_grant_expected_value_1_a6d30fcaf50fc997"
        ]
      }
    ],
    "confidence": {
      "overall": 0.38,
      "calculation": 0.38,
      "extraction": 0.72,
      "reason_codes": [
        "repair_status_custom_quote_required",
        "calculation_status_custom_quote_estimate",
        "source_confidence_medium",
        "estimate_confidence_low",
        "value_model_competitive_cost_share"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_3cf20452e0c096f9",
        "sourceType": "gpt_pro_research_summary",
        "quote": "This is a competitive corridor fast-charging grant context with up-to-80% cost share, not a deterministic rebate.",
        "sourceUrls": [
          "https://dot.sd.gov/projects-studies/planning/south-dakota-ev-fast-charging-plan/",
          "https://dot.sd.gov/media/kxbe0f2h/final-sddot-nevi-plan_letterhead-090425_fhwa-approved.pdf",
          "https://afdc.energy.gov/laws/12744",
          "https://programs.dsireusa.org/system/program/detail/22660/south-dakota-national-electric-vehicle-infrastructure-nevi-formula-grant-program"
        ],
        "evidenceConfidence": 0.72
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22666",
    "programName": "Alaska - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
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
    "effectId": "effect_grant_expected_value_1_eff91e0ede6cdd5f",
    "effectType": "grant_expected_value",
    "label": "For selected Alaska NEVI public EV charging projects, the federal cost share may cover up to 80% of eligible project cost, with at least 20% non-federal match. Do not estimate an award unless a solicitation, selected site, eligible cost, and award decision are known.",
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
        "inputKey": "current_solicitation_round",
        "label": "current solicitation round",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_eff91e0ede6cdd5f"
        ]
      },
      {
        "inputKey": "selected_site_or_application_status",
        "label": "selected site or application status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_eff91e0ede6cdd5f"
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
          "effect_grant_expected_value_1_eff91e0ede6cdd5f"
        ]
      },
      {
        "inputKey": "non_federal_match",
        "label": "non federal match",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_eff91e0ede6cdd5f"
        ]
      },
      {
        "inputKey": "nevi_compliance_requirements",
        "label": "nevi compliance requirements",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_eff91e0ede6cdd5f"
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
        "value_model_competitive_cost_share"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_9af4024cbe556fe6",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Alaska NEVI supports public EV charging infrastructure through solicitation-based cost-share grants, not building efficiency or Level 2-only rebates.",
        "sourceUrls": [
          "https://www.akenergyauthority.org/What-We-Do/Renewable-Energy-and-Energy-Efficiency/Electric-Vehicles",
          "https://www.akenergyauthority.org/Portals/0/What%20We%20Do/Renewable%20Energy%20and%20Energy%20Efficiency/Electric%20Vehicles/20251013%20FINAL%20FY26%20Alaska%20NEVI%20Plan%20508%20Compliant.pdf?ver=1GzaY7TO8_JfAonOxwygFA%3D%3D",
          "https://www.akenergyauthority.org/Portals/0/What%20We%20Do/Renewable%20Energy%20and%20Energy%20Efficiency/Electric%20Vehicles/AKEVWG/2024%20NEVI%20Workshop%20Series.pdf?ver=96Hmt3ZL6uTpOyPsVhWlFg%3D%3D"
        ],
        "evidenceConfidence": 0.72
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22761",
    "programName": "City and County of Denver - Green Workforce Mini Grant",
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
    "effectId": "effect_grant_expected_value_1_fe826aecbd61ca63",
    "effectType": "grant_expected_value",
    "label": "Competitive workforce mini grants are available up to $49,000 for organizations improving green workforce training. This is not an installation rebate; no expected grant value should be estimated without award probability evidence.",
    "existingCalculation": {
      "method": "expected_value",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": 4900000,
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
          "value": 49000,
          "currency": "USD"
        },
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "eligible_organization_type",
        "label": "eligible organization type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_fe826aecbd61ca63"
        ]
      },
      {
        "inputKey": "denver_employer_connection",
        "label": "Denver employer connection",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_fe826aecbd61ca63"
        ]
      },
      {
        "inputKey": "denver_metro_candidate_population",
        "label": "Denver Metro candidate population",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_fe826aecbd61ca63"
        ]
      },
      {
        "inputKey": "green_workforce_training_proposal",
        "label": "green workforce training proposal",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_fe826aecbd61ca63"
        ]
      },
      {
        "inputKey": "project_budget",
        "label": "project budget",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_fe826aecbd61ca63"
        ]
      },
      {
        "inputKey": "timeline_within_program_requirements",
        "label": "timeline within program requirements",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_fe826aecbd61ca63"
        ]
      },
      {
        "inputKey": "w_9",
        "label": "W-9",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_fe826aecbd61ca63"
        ]
      },
      {
        "inputKey": "certificate_of_good_standing",
        "label": "certificate of good standing",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_fe826aecbd61ca63"
        ]
      },
      {
        "inputKey": "proposal_budget",
        "label": "proposal budget",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_fe826aecbd61ca63"
        ]
      },
      {
        "inputKey": "award_decision_probability",
        "label": "award decision probability",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_fe826aecbd61ca63"
        ]
      }
    ],
    "confidence": {
      "overall": 0.38,
      "calculation": 0.38,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_non_monetary_workflow",
        "calculation_status_no_calculable_value",
        "source_confidence_high",
        "estimate_confidence_low",
        "value_model_competitive_max_only"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_bb18b401fdd8a0f3",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Denver's current Green Workforce Mini Grant offers up to $49,000 for training and workforce pathways, not physical retrofit installations.",
        "sourceUrls": [
          "https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Green-Jobs/Green-Workforce-Funding",
          "https://denver-casr.submittable.com/"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22770",
    "programName": "Leading By Example Restoration Grant for Solar PV & Decarbonized Systems",
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
    "effectId": "effect_grant_expected_value_1_753c755368588c1b",
    "effectType": "grant_expected_value",
    "label": "Eligible Massachusetts state entities may request grant funding for up to 100% of eligible restoration costs, subject to a $500,000 per-project cap, $1,500,000 per-entity cap, program budget, and award approval.",
    "existingCalculation": {
      "method": "expected_value",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": 50000000,
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
          "value": 500000,
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
          "effect_grant_expected_value_1_753c755368588c1b"
        ]
      },
      {
        "inputKey": "state_entity_applicant",
        "label": "state entity applicant",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_753c755368588c1b"
        ]
      },
      {
        "inputKey": "existing_system_restoration_scope",
        "label": "existing system restoration scope",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_753c755368588c1b"
        ]
      },
      {
        "inputKey": "site_count",
        "label": "site count",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_753c755368588c1b"
        ]
      },
      {
        "inputKey": "award_approval",
        "label": "award approval",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_753c755368588c1b"
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
        "value_model_competitive_cost_share"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_948a33d9cbaa3a63",
        "sourceType": "gpt_pro_research_summary",
        "quote": "This is a capped restoration grant for eligible Massachusetts state entities, not a private solar rebate.",
        "sourceUrls": [
          "https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems",
          "https://www.mass.gov/leading-by-example-grants",
          "https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-109288&external=true&parentUrl=bid"
        ],
        "evidenceConfidence": 0.72
      }
    ]
  }
]
