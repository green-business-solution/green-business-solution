You are helping RetroFi finish conservative grant estimation.

Prompt 5 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:22761",
  "program_name": "City and County of Denver - Green Workforce Mini Grant",
  "calculation_status": "non_monetary_workflow",
  "availability": {
    "status": "active",
    "source_access_status": "accessible_or_researched"
  },
  "geography": {
    "country": "US",
    "states": [],
    "counties": [],
    "cities": [],
    "utility_territory_required": false
  },
  "grant_effects": [
    {
      "effect_id": "effect_grant_expected_value_1_fe826aecbd61ca63",
      "label": "Competitive workforce mini grants are available up to $49,000 for organizations improving green workforce training. This is not an installation rebate; no expected grant value should be estimated without award probability evidence.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": null,
        "approval_required_before_installation": null,
        "application_deadline": "2026-07-10 12:00 PM MT",
        "funding_status": "open_funds_available"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": 4900000,
        "grant_value_model_kind": "competitive_max_only",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_scope",
          "formula_text": "For an approved eligible Denver Green Workforce Mini Grant proposal, grant amount is the approved proposal budget capped at $49,000. The grant funds green workforce training and pathway activities, not physical retrofit installation.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 4900000,
          "cost_share_percent": null,
          "required_project_inputs": [
            "eligible_organization_type",
            "denver_employer_connection",
            "denver_metro_candidate_population",
            "green_workforce_training_proposal",
            "project_budget",
            "timeline_within_program_requirements",
            "w_9",
            "certificate_of_good_standing",
            "proposal_budget",
            "award_decision"
          ],
          "calculation_trace": [
            "Confirm the applicant is an eligible nonprofit, training provider, community college, technical college, or similar entity.",
            "Confirm the proposal is green workforce training/pathways work serving Denver Metro candidates and employer needs.",
            "Use approved budget capped at $49,000 only after award approval."
          ]
        },
        "probability_model": {
          "status": "evidence_not_found",
          "probability_discount": null,
          "probability_evidence_type": "none",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": null,
          "expected_award_count": null,
          "competition_scope": "narrow_local",
          "probability_notes": "Official Denver/Submittable sources provide eligibility, deadline, and max award amount, but no application count, award count, budget, or success-rate evidence for discounting."
        },
        "expected_value_recommendation": {
          "estimate_status": "suppressed",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "competitive_max_only",
            "missing_probability_anchor",
            "not_installation_rebate",
            "needs_award_approval"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "Max-only local competitive mini-grant; any prior should require human approval and should not be used for retrofit savings totals.",
          "should_retro_fi_use_without_human_approval": false
        },
        "min_award_cents": null
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
      "required_inputs": [
        {
          "input_key": "eligible_organization_type",
          "label": "eligible organization type",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_fe826aecbd61ca63"
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
          "input_key": "denver_employer_connection",
          "label": "Denver employer connection",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_fe826aecbd61ca63"
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
          "input_key": "denver_metro_candidate_population",
          "label": "Denver Metro candidate population",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_fe826aecbd61ca63"
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
          "input_key": "green_workforce_training_proposal",
          "label": "green workforce training proposal",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_fe826aecbd61ca63"
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
          "input_key": "project_budget",
          "label": "project budget",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_fe826aecbd61ca63"
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
          "input_key": "timeline_within_program_requirements",
          "label": "timeline within program requirements",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_fe826aecbd61ca63"
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
          "input_key": "w_9",
          "label": "W-9",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_fe826aecbd61ca63"
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
          "input_key": "certificate_of_good_standing",
          "label": "certificate of good standing",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_fe826aecbd61ca63"
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
          "input_key": "proposal_budget",
          "label": "proposal budget",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_fe826aecbd61ca63"
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
          "input_key": "award_decision_probability",
          "label": "award decision probability",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_fe826aecbd61ca63"
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
          "input_key": "award_decision",
          "label": "Award Decision",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_fe826aecbd61ca63"
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
        "evidence_bb18b401fdd8a0f3",
        "grant_probability_repair_48e04ad455ccc17a"
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
          "value_model_competitive_max_only",
          "grant_probability_repair_applied",
          "estimate_status_suppressed"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "eligible_organization_type",
      "label": "eligible organization type",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_fe826aecbd61ca63"
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
      "input_key": "denver_employer_connection",
      "label": "Denver employer connection",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_fe826aecbd61ca63"
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
      "input_key": "denver_metro_candidate_population",
      "label": "Denver Metro candidate population",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_fe826aecbd61ca63"
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
      "input_key": "green_workforce_training_proposal",
      "label": "green workforce training proposal",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_fe826aecbd61ca63"
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
      "input_key": "project_budget",
      "label": "project budget",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_fe826aecbd61ca63"
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
      "input_key": "timeline_within_program_requirements",
      "label": "timeline within program requirements",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_fe826aecbd61ca63"
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
      "input_key": "w_9",
      "label": "W-9",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_fe826aecbd61ca63"
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
      "input_key": "certificate_of_good_standing",
      "label": "certificate of good standing",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_fe826aecbd61ca63"
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
      "input_key": "proposal_budget",
      "label": "proposal budget",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_fe826aecbd61ca63"
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
      "input_key": "award_decision_probability",
      "label": "award decision probability",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_fe826aecbd61ca63"
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
      "input_key": "award_decision",
      "label": "Award Decision",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_fe826aecbd61ca63"
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
      "evidence_id": "evidence_bb18b401fdd8a0f3",
      "source_type": "gpt_pro_research_summary",
      "quote": "Denver's current Green Workforce Mini Grant offers up to $49,000 for training and workforce pathways, not physical retrofit installations.",
      "source_urls": [
        "https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Green-Jobs/Green-Workforce-Funding",
        "https://denver-casr.submittable.com/"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_48e04ad455ccc17a",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "Denver's official page and Submittable listing show the second 2026 round open from June 3 to July 10, 2026, eligible organization types, required documents, and awards of up to $49,000 for green workforce training/pathways. ([denvergov.org][13])",
      "source_urls": [
        "https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Green-Jobs/Green-Workforce-Funding",
        "https://denver-casr.submittable.com/submit"
      ],
      "evidence_confidence": 0.9
    }
  ],
  "confidence": {
    "overall": 0.38,
    "source_access": 0.9,
    "availability": 0.9,
    "calculation": 0.38,
    "extraction": 0.9,
    "reason_codes": [
      "repair_status_non_monetary_workflow",
      "calculation_status_no_calculable_value",
      "source_confidence_high",
      "estimate_confidence_low"
    ]
  },
  "current_validation_notes": [
    "effect_grant_expected_value_1_fe826aecbd61ca63: missing probability_discount",
    "effect_grant_expected_value_1_fe826aecbd61ca63: missing conditional_award_cents",
    "effect_grant_expected_value_1_fe826aecbd61ca63: conditional award status needs_project_scope",
    "effect_grant_expected_value_1_fe826aecbd61ca63: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:22761",
  "programName": "City and County of Denver - Green Workforce Mini Grant",
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
