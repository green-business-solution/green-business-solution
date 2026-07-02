You are helping RetroFi refine grant and incentive expected-value estimates.

Current date: 2026-07-02. Program status, deadlines, budgets, and award statistics are time-sensitive. Check official sources wherever possible.

## Prompt grant_probability_001_014: grant expected-value metadata repair

For each target below, repair the grant-related estimate metadata. We need two separate things:

1. Conditional award amount: what could the matched applicant/project receive if selected or approved, using source-backed formulas/ranges/caps.
2. Probability evidence: whether there is enough evidence to discount a competitive grant into a conservative expected value.

Do not confuse these. A source saying "up to $250,000" gives a possible cap, not an expected value. Do not include max-only competitive grants in user-facing savings totals unless probability evidence exists or RetroFi later approves a human-reviewed prior.

## Output JSON schema

Return one JSON object only, no markdown fences.

{
  "schemaVersion": "retrofi_grant_probability_repair.v1",
  "researchedAt": "2026-07-02",
  "promptId": "grant_probability_001_014",
  "batchRange": "001-014",
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

## Targets 001-014

[
  {
    "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308",
    "programName": "GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE)",
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
    "effectId": "effect_grant_expected_value_1_fad24d1a1bf06105",
    "effectType": "grant_expected_value",
    "label": "Competitive CEC grant for distributed-scale clean hydrogen production facilities up to five metric tons per day, co-located with hydrogen storage and onsite end use. Award amount depends on the solicitation manual, project budget, scoring, and CEC award decision.",
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
        "inputKey": "cec_funding_request",
        "label": "CEC funding request",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_fad24d1a1bf06105"
        ]
      },
      {
        "inputKey": "total_eligible_project_budget",
        "label": "total eligible project budget",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_fad24d1a1bf06105"
        ]
      },
      {
        "inputKey": "hydrogen_production_capacity_in_metric_tons_per_day",
        "label": "hydrogen production capacity in metric tons per day",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_fad24d1a1bf06105"
        ]
      },
      {
        "inputKey": "hydrogen_storage_scope",
        "label": "hydrogen storage scope",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_fad24d1a1bf06105"
        ]
      },
      {
        "inputKey": "onsite_hydrogen_end_use_scope",
        "label": "onsite hydrogen end-use scope",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_fad24d1a1bf06105"
        ]
      },
      {
        "inputKey": "application_score_or_award_decision",
        "label": "application score or award decision",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_fad24d1a1bf06105"
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
          "effect_grant_expected_value_1_fad24d1a1bf06105"
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
          "effect_grant_expected_value_1_fad24d1a1bf06105"
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
        "value_model_competitive_max_only"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_86efdd5747770656",
        "sourceType": "gpt_pro_research_summary",
        "quote": "H2ONSITE is a competitive clean-hydrogen demonstration grant, not a battery-storage retrofit program.",
        "sourceUrls": [
          "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite",
          "https://ecams.energy.ca.gov/s/login/"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
    "programName": "GFO-25-603 - California's National Electric Vehicle Infrastructure Formula Program - Solicitation 6 Community Charging",
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
    "effectId": "effect_grant_expected_value_1_42355de1814a8757",
    "effectType": "grant_expected_value",
    "label": "Competitive CEC grant can fund publicly accessible high-powered DC fast charging projects; grant request is capped at 80% of allowable project cost and requires exactly 20% match, with $79,000,000 total solicitation funding and a $27,650,000 maximum grant per applicant.",
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
        "inputKey": "allowable_project_cost",
        "label": "allowable project cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_42355de1814a8757"
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
          "effect_grant_expected_value_1_42355de1814a8757"
        ]
      },
      {
        "inputKey": "match_funding_amount",
        "label": "match funding amount",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_42355de1814a8757"
        ]
      },
      {
        "inputKey": "number_of_dcfc_ports",
        "label": "number of dcfc ports",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_42355de1814a8757"
        ]
      },
      {
        "inputKey": "cost_per_ccs_port",
        "label": "cost per ccs port",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_42355de1814a8757"
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
          "effect_grant_expected_value_1_42355de1814a8757"
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
        "evidenceId": "evidence_017f60f9ba29b179",
        "sourceType": "gpt_pro_research_summary",
        "quote": "GFO-25-603 is an active competitive CEC grant for public high-powered DC fast charging with a posted October 16, 2026 deadline.",
        "sourceUrls": [
          "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
          "https://www.energy.ca.gov/sites/default/files/2026-03/GFO-25-603_NEVI_6_Pre-Application_Workshop_Slides_ADA.pdf",
          "https://ecams.energy.ca.gov/s/login/",
          "https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
    "programName": "GFO-25-605 - Reliable Electric Charging for Eligible School-bus Sites (RECESS)",
    "packageCalculationStatus": "no_calculable_value",
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
    "effectId": "effect_grant_expected_value_1_9badcea914d6d42f",
    "effectType": "grant_expected_value",
    "label": "CEC makes up to $22 million available for EV charging infrastructure serving electric school buses. Lane 1 is first-come; Lanes 2 and 3 are competitive. Project award is determined by lane, eligible costs, application details, and award decision.",
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
        "inputKey": "funding_lane",
        "label": "funding lane",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_9badcea914d6d42f"
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
          "effect_grant_expected_value_1_9badcea914d6d42f"
        ]
      },
      {
        "inputKey": "number_and_type_of_charging_ports",
        "label": "number and type of charging ports",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_9badcea914d6d42f"
        ]
      },
      {
        "inputKey": "electric_school_bus_deployment_details",
        "label": "electric school bus deployment details",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_9badcea914d6d42f"
        ]
      },
      {
        "inputKey": "lea_or_transportation_provider_pathway",
        "label": "LEA or transportation provider pathway",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_9badcea914d6d42f"
        ]
      },
      {
        "inputKey": "first_come_status_or_application_score",
        "label": "first-come status or application score",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_9badcea914d6d42f"
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
          "effect_grant_expected_value_1_9badcea914d6d42f"
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
        "value_model_competitive_max_only"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_197e942737f481e8",
        "sourceType": "gpt_pro_research_summary",
        "quote": "RECESS is a CEC school-bus charging infrastructure grant with lane-specific first-come and competitive awards.",
        "sourceUrls": [
          "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess",
          "https://ecams.energy.ca.gov/s/login/"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607",
    "programName": "GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO)",
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
    "effectId": "effect_grant_expected_value_1_a7ff5e3c336c4dd5",
    "effectType": "grant_expected_value",
    "label": "Competitive HIPO grants must fund eligible California hydrogen refueling infrastructure. Grant requests are $2,000,000 to $15,000,000 per project, require at least 25% match, and are limited by the $45,000,000 solicitation budget; expected value requires award probability.",
    "existingCalculation": {
      "method": "expected_value",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": 200000000,
      "maxAwardCents": 1500000000,
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
          "value": 15000000,
          "currency": "USD"
        },
        "applies_to": "effect"
      },
      {
        "cap_type": "maximum_percent_of_cost",
        "percent": 75,
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "requested_grant_amount_cents",
        "label": "requested grant amount cents",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
          "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
        ]
      },
      {
        "inputKey": "match_amount_cents",
        "label": "match amount cents",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
        ]
      },
      {
        "inputKey": "hydrogen_station_scope",
        "label": "hydrogen station scope",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
          "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
          "effect_grant_expected_value_1_a7ff5e3c336c4dd5"
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
        "evidenceId": "evidence_611e651feb71618c",
        "sourceType": "gpt_pro_research_summary",
        "quote": "GFO-25-607 has calculable grant request bounds and match rules, but its June 19, 2026 deadline has passed.",
        "sourceUrls": [
          "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project",
          "https://www.energy.ca.gov/sites/default/files/2026-04/GFO-25-607_Pre-Application_Workshop_Presentation_ada.pdf",
          "https://www.energy.ca.gov/event/funding-workshop/2026-04/pre-application-workshop-gfo-25-607-clean-transportation-program"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608",
    "programName": "GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME)",
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
    "effectId": "effect_grant_expected_value_1_aa2ca5c972c94202",
    "effectType": "grant_expected_value",
    "label": "CEC competitive grant with up to $10 million available to accelerate EV adoption through incentive navigation, residential charging equipment connection, home charger facilitation, education, outreach, messaging, and related equipment support. Award amount is project-specific.",
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
          "effect_grant_expected_value_1_aa2ca5c972c94202"
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
          "effect_grant_expected_value_1_aa2ca5c972c94202"
        ]
      },
      {
        "inputKey": "cec_funding_request",
        "label": "CEC funding request",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_aa2ca5c972c94202"
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
          "effect_grant_expected_value_1_aa2ca5c972c94202"
        ]
      },
      {
        "inputKey": "application_score_or_award_decision",
        "label": "application score or award decision",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_aa2ca5c972c94202"
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
          "effect_grant_expected_value_1_aa2ca5c972c94202"
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
        "value_model_competitive_max_only"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_bc687df117aee61e",
        "sourceType": "gpt_pro_research_summary",
        "quote": "EV HOME is a CEC competitive grant for EV adoption support, not a reusable per-charger rebate.",
        "sourceUrls": [
          "https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-hub-outreach-messaging-and-equipment-ev-home",
          "https://ecams.energy.ca.gov/s/login/"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902",
    "programName": "GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities",
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
    "effectId": "effect_grant_expected_value_1_f1659ce17e5da4b9",
    "effectType": "grant_expected_value",
    "label": "CEC cost-share funding is available only to applicants that apply for and receive awards under eligible federal geothermal funding opportunities and meet GFO-25-902 requirements. Amount depends on the federal award, eligible cost-share need, and CEC approval.",
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
        "inputKey": "eligible_federal_geothermal_funding_opportunity",
        "label": "eligible federal geothermal funding opportunity",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f1659ce17e5da4b9"
        ]
      },
      {
        "inputKey": "federal_award_amount",
        "label": "federal award amount",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f1659ce17e5da4b9"
        ]
      },
      {
        "inputKey": "federal_cost_share_requirement",
        "label": "federal cost-share requirement",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f1659ce17e5da4b9"
        ]
      },
      {
        "inputKey": "total_eligible_project_budget",
        "label": "total eligible project budget",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f1659ce17e5da4b9"
        ]
      },
      {
        "inputKey": "cec_cost_share_request",
        "label": "CEC cost-share request",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f1659ce17e5da4b9"
        ]
      },
      {
        "inputKey": "cec_award_decision",
        "label": "CEC award decision",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f1659ce17e5da4b9"
        ]
      },
      {
        "inputKey": "cost_share_requirement",
        "label": "cost-share requirement",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f1659ce17e5da4b9"
        ]
      },
      {
        "inputKey": "cec_funding_request",
        "label": "CEC funding request",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
          "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
        "value_model_competitive_cost_share"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_a1f4f6c88d8dc867",
        "sourceType": "gpt_pro_research_summary",
        "quote": "This is a geothermal cost-share grant tied to federal awards, not a geothermal heat-pump incentive.",
        "sourceUrls": [
          "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities",
          "https://ecams.energy.ca.gov/s/login/"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1528",
    "programName": "Otter Tail Power Company - Commercial & Industrial Energy Efficiency Grant Program",
    "packageCalculationStatus": "custom_quote_estimate",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "waste_heat_recovery"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_one_time_savings_1_5eb511fe0f127e08",
    "effectType": "one_time_savings",
    "label": "Custom grant amount is determined by Otter Tail Power from a preapproved custom energy-savings proposal based on kilowatt-hours saved, kilowatts of demand reduced, and project costs. Grant amounts will not exceed 75% of project costs or 90% of incremental costs; other caps may apply.",
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
        "percent": 0.75,
        "applies_to": "effect"
      }
    ],
    "requiredInputs": [
      {
        "inputKey": "custom_energy_savings_proposal",
        "label": "custom energy-savings proposal",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_5eb511fe0f127e08"
        ]
      },
      {
        "inputKey": "estimated_annual_kwh_saved",
        "label": "estimated annual kWh saved",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_5eb511fe0f127e08"
        ]
      },
      {
        "inputKey": "estimated_kw_demand_reduction",
        "label": "estimated kW demand reduction",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_5eb511fe0f127e08"
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
          "effect_one_time_savings_1_5eb511fe0f127e08"
        ]
      },
      {
        "inputKey": "incremental_cost",
        "label": "incremental cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_5eb511fe0f127e08"
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
          "effect_one_time_savings_1_5eb511fe0f127e08"
        ]
      },
      {
        "inputKey": "measurement_and_verification_if_required",
        "label": "measurement and verification if required",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_5eb511fe0f127e08"
        ]
      },
      {
        "inputKey": "approved_grant_amount",
        "label": "approved grant amount",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_5eb511fe0f127e08"
        ]
      },
      {
        "inputKey": "project_specific_kwh_savings",
        "label": "project-specific kWh savings",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_5eb511fe0f127e08"
        ]
      },
      {
        "inputKey": "project_specific_kw_reduction",
        "label": "project-specific kW reduction",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_5eb511fe0f127e08"
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
        "value_model_custom_quote"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_9b8a59f46547323b",
        "sourceType": "gpt_pro_research_summary",
        "quote": "The official page supports custom business grants and caps but not a reusable heat-recovery formula.",
        "sourceUrls": [
          "https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/",
          "https://www.otpco.com/rebates-and-efficiency-programs/business/programs/",
          "https://www.otpco.com/media/pv4pgqyt/2025-program-and-services-guide_final.pdf",
          "https://www.otpco.com/rebates-and-efficiency-programs/topics/heating-and-cooling/heat-recovery-air-exchangers/"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:1774",
    "programName": "City of Tallahassee Utilities - Grant Programs",
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
    "effectId": "effect_one_time_savings_1_6485f6750d0228c1",
    "effectType": "one_time_savings",
    "label": "After a required City of Tallahassee home energy audit and approved-contractor installation, standard ceiling insulation grants cover 80% of installed cost up to $400; low-income grants cover 100% of installed cost up to $500.",
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
          "value": 500,
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
        "inputKey": "installed_insulation_cost",
        "label": "installed insulation cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_6485f6750d0228c1"
        ]
      },
      {
        "inputKey": "standard_or_low_income_grant_tier",
        "label": "standard or low income grant tier",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_6485f6750d0228c1"
        ]
      },
      {
        "inputKey": "audit_result",
        "label": "audit result",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_6485f6750d0228c1"
        ]
      },
      {
        "inputKey": "approved_contractor",
        "label": "approved contractor",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_6485f6750d0228c1"
        ]
      },
      {
        "inputKey": "material_type",
        "label": "material type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_6485f6750d0228c1"
        ]
      },
      {
        "inputKey": "target_r_value",
        "label": "target R value",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_6485f6750d0228c1"
        ]
      },
      {
        "inputKey": "installed_cost",
        "label": "installed cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_6485f6750d0228c1"
        ]
      },
      {
        "inputKey": "grant_tier",
        "label": "grant tier",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_6485f6750d0228c1"
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
        "value_model_rate_table"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_462d1777ce068b8c",
        "sourceType": "gpt_pro_research_summary",
        "quote": "Tallahassee supports only attic or ceiling insulation grants after an energy audit, with cost-share tiers by income status and strict material exclusions.",
        "sourceUrls": [
          "https://www.talgov.com/you/you-products-home-ceiling-insulation",
          "https://www.talgov.com/you/you-products-home-energy-audit"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:21861",
    "programName": "Agricultural Energy Program",
    "packageCalculationStatus": "no_calculable_value",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "battery_storage_system",
      "biomass_biogas_energy_system",
      "high_efficiency_hvac_replacement",
      "insulation_upgrade",
      "led_lighting_retrofit",
      "solar_water_heating_system"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_grant_expected_value_1_d2ac4b4734cc8f4f",
    "effectType": "grant_expected_value",
    "label": "Competitive agricultural energy grants may cover eligible project costs up to a $20,000 award, with at least 10% applicant cost share. Do not estimate an expected grant without award-probability evidence.",
    "existingCalculation": {
      "method": "expected_value",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": 2000000,
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
          "value": 20000,
          "currency": "USD"
        },
        "applies_to": "effect"
      },
      {
        "cap_type": "maximum_percent_of_cost",
        "percent": 0.9,
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
          "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
        ]
      },
      {
        "inputKey": "applicant_cost_share",
        "label": "applicant cost share",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
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
          "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
        ]
      },
      {
        "inputKey": "agricultural_energy_audit_status",
        "label": "agricultural energy audit status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
        ]
      },
      {
        "inputKey": "application_score_or_award_decision",
        "label": "application score or award decision",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
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
          "effect_grant_expected_value_1_d2ac4b4734cc8f4f"
        ]
      }
    ],
    "confidence": {
      "overall": 0.38,
      "calculation": 0.38,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_calculation_package_found",
        "calculation_status_no_calculable_value",
        "source_confidence_high",
        "estimate_confidence_low",
        "value_model_competitive_max_only"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_650b5392cce87724",
        "sourceType": "gpt_pro_research_summary",
        "quote": "RI OER supports agricultural energy efficiency and renewable grants up to $20,000, but awards are competitive and audits are not reimbursable project costs.",
        "sourceUrls": [
          "https://energy.ri.gov/energy-efficiency/farm-energy-programs",
          "https://energy.ri.gov/sites/g/files/xkgbur741/files/2026-06/Farm%20Energy%20Program%20Guidance%20Doc%20V4.pdf",
          "https://energy.ri.gov/energy-efficiency/farm-energy-programs/agricultural-energy-audits"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22149",
    "programName": "Clean Transportation Program",
    "packageCalculationStatus": "needs_repair_review",
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
    "effectId": "effect_grant_expected_value_1_f0c739479f440778",
    "effectType": "grant_expected_value",
    "label": "The Clean Transportation Program is an umbrella funding program. Award value is determined only by a specific CEC solicitation, block grant, or funding opportunity; no standing per-vehicle, per-port, or per-project formula applies.",
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
        "inputKey": "specific_cec_solicitation_or_block_grant",
        "label": "specific cec solicitation or block grant",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f0c739479f440778"
        ]
      },
      {
        "inputKey": "project_type",
        "label": "project type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f0c739479f440778"
        ]
      },
      {
        "inputKey": "requested_grant_amount_cents",
        "label": "requested grant amount cents",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f0c739479f440778"
        ]
      },
      {
        "inputKey": "eligible_cost_basis_cents",
        "label": "eligible cost basis cents",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f0c739479f440778"
        ]
      },
      {
        "inputKey": "match_requirement",
        "label": "match requirement",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f0c739479f440778"
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
          "effect_grant_expected_value_1_f0c739479f440778"
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
          "effect_grant_expected_value_1_f0c739479f440778"
        ]
      }
    ],
    "confidence": {
      "overall": 0.38,
      "calculation": 0.38,
      "extraction": 0.9,
      "reason_codes": [
        "repair_status_needs_human_review",
        "calculation_status_needs_repair_review",
        "source_confidence_high",
        "estimate_confidence_low",
        "value_model_competitive_max_only"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_5af5f23826584985",
        "sourceType": "gpt_pro_research_summary",
        "quote": "CEC Clean Transportation Program funding is real but delivered through specific solicitations, so a generic value rule would overstate awards.",
        "sourceUrls": [
          "https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program",
          "https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-funding-areas-0"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22160",
    "programName": "Electric Vehicle Fast-Charging Plazas Program",
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
    "effectId": "effect_grant_expected_value_1_f3f277efefdea00d",
    "effectType": "grant_expected_value",
    "label": "Colorado EV Fast-Charging Plazas grants may fund up to 80% of eligible project costs at each public DC fast-charging plaza site. Award requires eligible site, public DCFC scope, application approval, and continuous public-use commitments.",
    "existingCalculation": {
      "method": "percent_of_cost",
      "valueModelKind": null,
      "cashValueClassification": null,
      "probabilityDiscount": null,
      "conditionalAwardCents": null,
      "maxAwardCents": null,
      "minAwardCents": null,
      "percent": 80,
      "costInput": "eligible_project_cost_cents",
      "amount": null,
      "formula": null,
      "reason": null
    },
    "caps": [
      {
        "cap_type": "maximum_percent_of_cost",
        "percent": 80,
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
          "effect_grant_expected_value_1_f3f277efefdea00d"
        ]
      },
      {
        "inputKey": "site_location",
        "label": "site location",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f3f277efefdea00d"
        ]
      },
      {
        "inputKey": "number_of_dc_fast_charging_ports",
        "label": "number of DC fast-charging ports",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f3f277efefdea00d"
        ]
      },
      {
        "inputKey": "charger_power_rating",
        "label": "charger power rating",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f3f277efefdea00d"
        ]
      },
      {
        "inputKey": "public_access_commitment",
        "label": "public access commitment",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f3f277efefdea00d"
        ]
      },
      {
        "inputKey": "application_score_or_award_decision",
        "label": "application score or award decision",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f3f277efefdea00d"
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
          "effect_grant_expected_value_1_f3f277efefdea00d"
        ]
      },
      {
        "inputKey": "current_round_per_site_cap",
        "label": "current round per-site cap",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_f3f277efefdea00d"
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
        "value_model_capped_percent_of_eligible_cost"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_16179e93b08f1699",
        "sourceType": "gpt_pro_research_summary",
        "quote": "The EV charger edge is source-backed only for public DCFC plazas with grant approval.",
        "sourceUrls": [
          "https://energyoffice.colorado.gov/ev-fast-charging-plazas",
          "https://socgov27.my.site.com/CEOEVGrants/s/",
          "https://afdc.energy.gov/laws/12432",
          "https://programs.dsireusa.org/system/program/detail/22160/electric-vehicle-fast-charging-plazas-program"
        ],
        "evidenceConfidence": 0.72
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22199",
    "programName": "It Pay$ to Plug in Program",
    "packageCalculationStatus": "calculable_with_missing_inputs",
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
    "effectId": "effect_grant_expected_value_2_a26a941b3c377b51",
    "effectType": "grant_expected_value",
    "label": "DC fast charging funding is handled through separate competitive solicitations; do not assign an expected dollar value without a current solicitation amount and probability model.",
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
          "effect_one_time_savings_1_775c1a75361e123c"
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
          "effect_one_time_savings_1_775c1a75361e123c"
        ]
      },
      {
        "inputKey": "site_type",
        "label": "site type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_775c1a75361e123c"
        ]
      },
      {
        "inputKey": "grant_agreement_before_purchase_or_installation",
        "label": "grant agreement before purchase or installation",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_775c1a75361e123c"
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
          "effect_one_time_savings_1_775c1a75361e123c"
        ]
      },
      {
        "inputKey": "current_dcfc_solicitation",
        "label": "current dcfc solicitation",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a26a941b3c377b51"
        ]
      },
      {
        "inputKey": "site_location",
        "label": "site location",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a26a941b3c377b51"
        ]
      },
      {
        "inputKey": "charger_count",
        "label": "charger count",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a26a941b3c377b51"
        ]
      },
      {
        "inputKey": "award_notice",
        "label": "award notice",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_2_a26a941b3c377b51"
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
          "effect_grant_expected_value_2_a26a941b3c377b51"
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
        "evidenceId": "evidence_49ccdd47516f93f7",
        "sourceType": "gpt_pro_research_summary",
        "quote": "NJDEP It Pay$ to Plug In has rolling Level 1 and Level 2 reimbursement caps and separate competitive DCFC solicitations; private single-family dwellings are excluded.",
        "sourceUrls": [
          "https://dep.nj.gov/drivegreen/it-pays-to-plug-in/",
          "https://dep.nj.gov/grantandloanprograms/it-pays-to-plug-in-njs-electric-vehicle-charging-grant-program/",
          "https://dep.nj.gov/drivegreen/dcfcsolicitation/",
          "https://njdepsage.intelligrants.com/"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22206",
    "programName": "VW Funding for Diesel Replacement and EVSE Projects",
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
    "effectId": "effect_grant_expected_value_1_6f710c93f5265829",
    "effectType": "grant_expected_value",
    "label": "Funding amount is determined by the active Volkswagen settlement subprogram or project sponsor; there is no single statewide formula across diesel replacement, non-road equipment, transit charging, and EVSE projects.",
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
        "inputKey": "active_subprogram",
        "label": "active subprogram",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6f710c93f5265829"
        ]
      },
      {
        "inputKey": "project_sponsor",
        "label": "project sponsor",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6f710c93f5265829"
        ]
      },
      {
        "inputKey": "vehicle_or_equipment_class",
        "label": "vehicle or equipment class",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6f710c93f5265829"
        ]
      },
      {
        "inputKey": "replacement_technology",
        "label": "replacement technology",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6f710c93f5265829"
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
          "effect_grant_expected_value_1_6f710c93f5265829"
        ]
      },
      {
        "inputKey": "scrappage_or_replacement_requirements",
        "label": "scrappage or replacement requirements",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6f710c93f5265829"
        ]
      },
      {
        "inputKey": "site_or_fleet_details",
        "label": "site or fleet details",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6f710c93f5265829"
        ]
      },
      {
        "inputKey": "sponsor_rate_table",
        "label": "sponsor rate table",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6f710c93f5265829"
        ]
      },
      {
        "inputKey": "vehicle_class",
        "label": "vehicle class",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_grant_expected_value_1_6f710c93f5265829"
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
          "effect_grant_expected_value_1_6f710c93f5265829"
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
        "value_model_custom_quote"
      ]
    },
    "sourceEvidence": [
      {
        "evidenceId": "evidence_c352045334811715",
        "sourceType": "gpt_pro_research_summary",
        "quote": "New York DEC's VW funding page lists open and completed sponsor-specific diesel replacement, non-road, transit charging, and EVSE opportunities.",
        "sourceUrls": [
          "https://dec.ny.gov/environmental-protection/air-quality/controlling-motor-vehicle-pollution/vw-settlement-information/vw-funding-for-diesel-replacement-and-evse-projects"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  },
  {
    "opportunityId": "SOURCE_DSIRE:dsire_program_id:22373",
    "programName": "Eugene Water & Electric Board - Electric Vehicle Charging Station Smart Charge Program",
    "packageCalculationStatus": "calculable_with_missing_inputs",
    "availability": {
      "status": "active",
      "source_access_status": "accessible_or_researched"
    },
    "customerSegments": [],
    "retrofitTypes": [
      "level_2_ev_charger_installation"
    ],
    "geography": {
      "country": "US",
      "states": [],
      "counties": [],
      "cities": [],
      "utility_territory_required": false
    },
    "effectId": "effect_one_time_savings_1_7adb20f9b8c9d4e2",
    "effectType": "one_time_savings",
    "label": "Residential Smart Charge rebate is up to $500 for qualified Level 2 home EVSE, not to exceed hardware and installation cost, limited to one rebate per residential electric account. Multifamily public Level 2 Smart Charge rebate is $1,500 per port, or $2,000 per port for qualified affordable housing, capped at 100% of eligible cost after other grants.",
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
          "value": 2000,
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
        "inputKey": "project_path",
        "label": "project path",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_7adb20f9b8c9d4e2"
        ]
      },
      {
        "inputKey": "evse_and_installation_cost",
        "label": "EVSE and installation cost",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_7adb20f9b8c9d4e2"
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
          "effect_one_time_savings_1_7adb20f9b8c9d4e2"
        ]
      },
      {
        "inputKey": "site_type",
        "label": "site type",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_7adb20f9b8c9d4e2"
        ]
      },
      {
        "inputKey": "other_grants",
        "label": "other grants",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_7adb20f9b8c9d4e2"
        ]
      },
      {
        "inputKey": "permit_and_inspection_status",
        "label": "permit and inspection status",
        "valueType": "text",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_7adb20f9b8c9d4e2"
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
          "effect_one_time_savings_1_7adb20f9b8c9d4e2"
        ]
      },
      {
        "inputKey": "port_count_or_account_count",
        "label": "port count or account count",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_7adb20f9b8c9d4e2"
        ]
      },
      {
        "inputKey": "other_grant_amounts",
        "label": "other grant amounts",
        "valueType": "number",
        "missingSeverity": "blocks_calculation",
        "sourcePrecedence": [
          "user_profile",
          "retrofit_assumptions",
          "quote",
          "utility_data"
        ],
        "requiredFor": [
          "effect_one_time_savings_1_7adb20f9b8c9d4e2"
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
        "evidenceId": "evidence_5ec75e549f984331",
        "sourceType": "gpt_pro_research_summary",
        "quote": "EWEB offers up to $500 for residential Level 2 EVSE and $1,500 or $2,000 per multifamily public Level 2 port.",
        "sourceUrls": [
          "https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives",
          "https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives-business",
          "https://myaccount.eweb.org/"
        ],
        "evidenceConfidence": 0.9
      }
    ]
  }
]
