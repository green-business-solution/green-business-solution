You are helping RetroFi finish conservative grant estimation.

Prompt 17 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
  "program_name": "GFO-25-605 - Reliable Electric Charging for Eligible School-bus Sites (RECESS)",
  "calculation_status": "no_calculable_value",
  "availability": {
    "status": "active",
    "source_access_status": "accessible_or_researched"
  },
  "retrofit_types": [
    "ev_charger_installation"
  ],
  "geography": {
    "country": "US",
    "states": [],
    "counties": [],
    "cities": [],
    "utility_territory_required": false
  },
  "grant_effects": [
    {
      "effect_id": "effect_grant_expected_value_1_9badcea914d6d42f",
      "label": "CEC makes up to $22 million available for EV charging infrastructure serving electric school buses. Lane 1 is first-come; Lanes 2 and 3 are competitive. Project award is determined by lane, eligible costs, application details, and award decision.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2026-08-31 23:59",
        "funding_status": "open_funds_available"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": 450000000,
        "grant_value_model_kind": "hybrid_rate_plus_cap",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_scope",
          "formula_text": "Lane-specific school-bus charging grant. Total solicitation funding is $22,000,000: Lane 1 first-come, first-served; Lanes 2 and 3 competitive. Indexed solicitation text indicates awards may be calculated from charger scope using $20,000 per eligible L2 charging port and $75,000 per eligible dual-port DCFC or bidirectional DCFC, subject to lane and applicant caps. Lane 2 cap is $2,250,000; Lane 3 cap is $2,250,000 for one LEA or $4,500,000 for more than one LEA. Lane 1 cap depends on eligible HVIP bus count.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 450000000,
          "cost_share_percent": null,
          "required_project_inputs": [
            "funding_lane",
            "eligible_project_cost",
            "number_of_l2_ports",
            "number_of_dual_port_dcfc_or_bidirectional_dcfc",
            "electric_school_bus_deployment_details",
            "lea_or_transportation_provider_pathway",
            "lane_specific_cap",
            "first_come_status_or_award_decision"
          ],
          "calculation_trace": [
            "Official solicitation page states $22,000,000 total funding and an August 31, 2026 deadline.",
            "Official page states Lane 1 is first-come and Lanes 2 and 3 are competitive.",
            "Indexed solicitation text identifies rate-based charger awards and lane caps.",
            "The largest indexed lane cap is $4,500,000 for Lane 3 applications serving more than one LEA.",
            "Applicant-specific award requires lane, charger count/type, eligible costs, and award status."
          ]
        },
        "probability_model": {
          "status": "first_come_funding_unknown",
          "probability_discount": null,
          "probability_evidence_type": "first_come_funding_unknown",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": 2200000000,
          "expected_award_count": null,
          "competition_scope": "statewide_broad",
          "probability_notes": "Lane 1 is first-come, but remaining queue/funding status was not found. Lanes 2 and 3 are competitive with scoring and budget, but no historical or expected success-rate evidence was found."
        },
        "expected_value_recommendation": {
          "estimate_status": "needs_funding_check",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "lane_specific_rules",
            "first_come_funding_status_unknown",
            "competitive_lanes_probability_evidence_not_found",
            "project_scope_required"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "No single fallback prior is suggested because probability differs materially by lane: first-come queue risk for Lane 1 and competitive selection risk for Lanes 2 and 3.",
          "should_retro_fi_use_without_human_approval": false
        },
        "min_award_cents": null
      },
      "required_inputs": [
        {
          "input_key": "funding_lane",
          "label": "funding lane",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_9badcea914d6d42f"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "eligible_project_cost",
          "label": "eligible project cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_9badcea914d6d42f"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "number_and_type_of_charging_ports",
          "label": "number and type of charging ports",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_9badcea914d6d42f"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "electric_school_bus_deployment_details",
          "label": "electric school bus deployment details",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_9badcea914d6d42f"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "lea_or_transportation_provider_pathway",
          "label": "LEA or transportation provider pathway",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_9badcea914d6d42f"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "first_come_status_or_application_score",
          "label": "first-come status or application score",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_9badcea914d6d42f"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "award_probability",
          "label": "award probability",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_9badcea914d6d42f"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "number_of_l2_ports",
          "label": "Number Of L2 Ports",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_9badcea914d6d42f"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "number_of_dual_port_dcfc_or_bidirectional_dcfc",
          "label": "Number Of Dual Port Dcfc Or Bidirectional Dcfc",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_9badcea914d6d42f"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "lane_specific_cap",
          "label": "Lane Specific Cap",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_9badcea914d6d42f"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        },
        {
          "input_key": "first_come_status_or_award_decision",
          "label": "First Come Status Or Award Decision",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_9badcea914d6d42f"
          ],
          "source_precedence": [
            "quote",
            "user_profile",
            "retrofit_assumptions"
          ],
          "missing_severity": "blocks_calculation"
        }
      ],
      "evidence_refs": [
        "evidence_197e942737f481e8",
        "grant_probability_repair_62540a6fa88548ee"
      ],
      "confidence": {
        "overall": 0.38,
        "calculation": 0.38,
        "extraction": 0.72,
        "reason_codes": [
          "repair_status_custom_quote_required",
          "calculation_status_no_calculable_value",
          "source_confidence_high",
          "estimate_confidence_low",
          "value_model_competitive_max_only",
          "grant_probability_repair_applied",
          "source_confidence_medium",
          "value_model_hybrid_rate_plus_cap",
          "estimate_status_needs_funding_check"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "funding_lane",
      "label": "funding lane",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_9badcea914d6d42f"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "eligible_project_cost",
      "label": "eligible project cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_9badcea914d6d42f"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "number_and_type_of_charging_ports",
      "label": "number and type of charging ports",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_9badcea914d6d42f"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "electric_school_bus_deployment_details",
      "label": "electric school bus deployment details",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_9badcea914d6d42f"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "lea_or_transportation_provider_pathway",
      "label": "LEA or transportation provider pathway",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_9badcea914d6d42f"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "first_come_status_or_application_score",
      "label": "first-come status or application score",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_9badcea914d6d42f"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "award_probability",
      "label": "award probability",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_9badcea914d6d42f"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "number_of_l2_ports",
      "label": "Number Of L2 Ports",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_9badcea914d6d42f"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "number_of_dual_port_dcfc_or_bidirectional_dcfc",
      "label": "Number Of Dual Port Dcfc Or Bidirectional Dcfc",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_9badcea914d6d42f"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "lane_specific_cap",
      "label": "Lane Specific Cap",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_9badcea914d6d42f"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "first_come_status_or_award_decision",
      "label": "First Come Status Or Award Decision",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_9badcea914d6d42f"
      ],
      "source_precedence": [
        "quote",
        "user_profile",
        "retrofit_assumptions"
      ],
      "missing_severity": "blocks_calculation"
    }
  ],
  "source_evidence": [
    {
      "evidence_id": "evidence_197e942737f481e8",
      "source_type": "gpt_pro_research_summary",
      "quote": "RECESS is a CEC school-bus charging infrastructure grant with lane-specific first-come and competitive awards.",
      "source_urls": [
        "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess",
        "https://ecams.energy.ca.gov/s/login/"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_62540a6fa88548ee",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "CEC's official solicitation page identifies RECESS as active, states up to $22,000,000 is available, and separates Lane 1 first-come funding from competitive Lanes 2 and 3. Indexed solicitation text provides charger-rate and lane-cap details, but the DOCX manual was not fully machine-extractable through the official page during this repair.",
      "source_urls": [
        "https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess",
        "https://www.energy.ca.gov/sites/default/files/2026-04/00_GFO-25-605_Solicitation_Manual_ada.docx",
        "https://ecams.energy.ca.gov/s/login/"
      ],
      "evidence_confidence": 0.72
    }
  ],
  "confidence": {
    "overall": 0.38,
    "source_access": 0.9,
    "availability": 0.9,
    "calculation": 0.38,
    "extraction": 0.9,
    "reason_codes": [
      "repair_status_custom_quote_required",
      "calculation_status_no_calculable_value",
      "source_confidence_high",
      "estimate_confidence_low"
    ]
  },
  "current_validation_notes": [
    "effect_grant_expected_value_1_9badcea914d6d42f: missing probability_discount",
    "effect_grant_expected_value_1_9badcea914d6d42f: missing conditional_award_cents",
    "effect_grant_expected_value_1_9badcea914d6d42f: conditional award status needs_project_scope",
    "effect_grant_expected_value_1_9badcea914d6d42f: probability status first_come_funding_unknown"
  ]
}
```

## What To Research

1. Official current source URLs, manuals, solicitations, application guides, forms, NOFO/FOA pages, or administrator pages.
2. Value model kind: fixed amount, fixed tier, percent of eligible cost, capped percent, per-unit, hybrid/rate table, reimbursement, competitive max-only, competitive award range, competitive cost-share, no calculable value, source inaccessible, loan/financing, tax credit, or non-cash assistance.
3. Conditional award formula if selected/approved: rates, caps, ranges, required cost basis, rate-table dimensions, unit counts, eligible/ineligible costs, timing/preapproval gates.
4. Probability model for competitive or funding-contingent awards: historical awards/applications, budget and expected awards, first-come funds confirmed, first-come funds unknown, scoring criteria only, eligibility only, or none.
5. Required runtime inputs: user/project inputs, quote inputs, bill inputs, application status, selected measure, equipment specs, approval status, project cost, quantity, ownership, applicant status.
6. Whether any value should be included in user-facing savings totals by default. Be conservative.

## Required Output

Return JSON only, using this schema shape. Include nulls where values are unknown. Amounts must be cents. Percentages/rates must be decimal fractions, e.g. 0.8 for 80%.

```json
{
  "schemaVersion": "retrofi_grant_package_repair.v1",
  "researchedAt": "YYYY-MM-DD",
  "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
  "programName": "GFO-25-605 - Reliable Electric Charging for Eligible School-bus Sites (RECESS)",
  "status": "runtime_ready | needs_project_inputs | needs_formula_runtime_support | suppress_no_probability_evidence | suppress_max_only | suppress_low_source_confidence | no_calculable_value | source_inaccessible | non_grant_or_non_cash | closed_or_unavailable",
  "sourceConfidence": "high | medium | low",
  "estimateConfidenceIfInputsPresent": "high | medium | low",
  "officialSources": [
    {
      "title": "",
      "url": "",
      "owner": "",
      "accessed": "YYYY-MM-DD",
      "evidenceText": ""
    }
  ],
  "sourceSummary": "",
  "packagePatch": {
    "calculation_status": "calculable | calculable_with_missing_inputs | custom_quote_estimate | no_calculable_value | non_monetary_workflow | needs_repair_review",
    "availability": {
      "status": "active | rolling | upcoming | closed | unknown",
      "fundingStatus": "open_funds_available | open_while_funds_last | waitlist | closed | exhausted | unknown"
    },
    "input_requirements_to_add_or_update": [],
    "effects_to_add_or_update": [
      {
        "effect_id": "",
        "effect_type": "grant_expected_value | one_time_savings | no_cash_value",
        "cash_value_classification": "cash_grant | reimbursement | rebate | tax_credit | loan | financing | technical_assistance | unknown",
        "value_model_kind": "fixed_amount | fixed_tier_amount | percent_of_eligible_cost | capped_percent_of_eligible_cost | per_unit_award | hybrid_rate_plus_cap | competitive_max_only | competitive_award_range | competitive_cost_share | formula_grant | rebate_labeled_as_grant | study_or_audit_grant | loan_or_financing_labeled_as_grant | tax_credit_mixed_with_grant | non_cash_technical_assistance | no_calculable_value | source_inaccessible",
        "calculation": {
          "method": "fixed_amount | percent_of_cost | per_unit | per_kw | per_port | rate_table | measure_catalog | expected_value | custom_quote | expression | zero_when_not_applicable",
          "amount_cents": null,
          "percent": null,
          "conditional_award_cents": null,
          "conditional_award_formula": "",
          "max_award_cents": null,
          "min_award_cents": null,
          "rate_rows": [],
          "probability_discount": null,
          "probability_evidence_type": "not_required | historical_success_rate | budget_and_expected_awards | historical_awards_only | first_come_funds_confirmed | first_come_funding_unknown | scoring_criteria_only | eligibility_only | human_reviewed | none"
        },
        "required_inputs": [],
        "missing_input_behavior": "calculate_when_present | needs_quote | needs_project_scope | needs_funding_check | suppress_until_review",
        "includedInUserFacingTotalDefault": false,
        "humanReviewRequired": false,
        "reasonCodes": [],
        "calculationTrace": []
      }
    ]
  },
  "testCaseInputHints": [
    {
      "inputKey": "",
      "valueType": "number | boolean | text | date | enum | money_cents | array",
      "whoProvides": "server_derived | user | quote | bill | application_status | accountant | admin_research",
      "realisticDefaultGuidance": ""
    }
  ],
  "remainingGaps": [],
  "doNotUseAsUserFacingEstimateReasons": []
}
```
