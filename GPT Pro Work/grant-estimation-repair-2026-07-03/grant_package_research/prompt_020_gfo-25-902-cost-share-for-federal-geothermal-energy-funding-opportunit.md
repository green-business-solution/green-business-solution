You are helping RetroFi finish conservative grant estimation.

Prompt 20 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902",
  "program_name": "GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities",
  "calculation_status": "no_calculable_value",
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
      "effect_id": "effect_grant_expected_value_1_f1659ce17e5da4b9",
      "label": "CEC cost-share funding is available only to applicants that apply for and receive awards under eligible federal geothermal funding opportunities and meet GFO-25-902 requirements. Amount depends on the federal award, eligible cost-share need, and CEC approval.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": null,
        "funding_status": "open_funds_available"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": 200000000,
        "grant_value_model_kind": "competitive_cost_share",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_scope",
          "formula_text": "CEC cost-share funding is available only to applicants that apply for and receive awards under eligible federal geothermal funding opportunities and meet CEC requirements. Official page confirms purpose but does not expose a reusable formula in the web text. Indexed manual excerpts indicate $3,000,000 total CEC cost-share funding, topic-specific caps including up to $2,000,000 for Topic 3A and $200,000-$1,000,000 for Topic 3C, and match rules that vary by applicant type.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 200000000,
          "cost_share_percent": null,
          "required_project_inputs": [
            "eligible_federal_geothermal_funding_opportunity",
            "federal_award_amount",
            "federal_cost_share_requirement",
            "total_eligible_project_budget",
            "cec_cost_share_request",
            "applicant_type",
            "topic_area",
            "cec_award_decision"
          ],
          "calculation_trace": [
            "Official CEC page confirms GFO-25-902 as a geothermal cost-share solicitation tied to eligible federal awards.",
            "Official page provides the solicitation manual as a DOCX but did not expose detailed formula text in the page body.",
            "Indexed manual excerpts indicate a $3,000,000 total budget and topic-specific caps.",
            "Because topic, applicant type, and federal award terms control the award, a project-specific calculation is required."
          ]
        },
        "probability_model": {
          "status": "evidence_not_found",
          "probability_discount": null,
          "probability_evidence_type": "eligibility_only",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": 300000000,
          "expected_award_count": null,
          "competition_scope": "sector_specific",
          "probability_notes": "Eligibility requires a related federal geothermal award and CEC approval. No historical CEC application count, award count, expected award count, or success rate was found."
        },
        "expected_value_recommendation": {
          "estimate_status": "human_review_required",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "federal_award_dependency",
            "project_scope_required",
            "probability_evidence_not_found",
            "official_manual_not_fully_extractable"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": 0.08,
          "basis": "Low-confidence human-review prior for a niche competitive/state cost-share program that is conditional on first winning an eligible federal geothermal award.",
          "should_retro_fi_use_without_human_approval": false
        },
        "min_award_cents": null
      },
      "required_inputs": [
        {
          "input_key": "eligible_federal_geothermal_funding_opportunity",
          "label": "eligible federal geothermal funding opportunity",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
          "input_key": "federal_award_amount",
          "label": "federal award amount",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
          "input_key": "federal_cost_share_requirement",
          "label": "federal cost-share requirement",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
          "input_key": "total_eligible_project_budget",
          "label": "total eligible project budget",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
          "input_key": "cec_cost_share_request",
          "label": "CEC cost-share request",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
          "input_key": "cec_award_decision",
          "label": "CEC award decision",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
          "input_key": "cost_share_requirement",
          "label": "cost-share requirement",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
          "input_key": "cec_funding_request",
          "label": "CEC funding request",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
            "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
          "input_key": "applicant_type",
          "label": "Applicant Type",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
          "input_key": "topic_area",
          "label": "Topic Area",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_1_f1659ce17e5da4b9"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data"
          ],
          "missing_severity": "blocks_calculation"
        }
      ],
      "evidence_refs": [
        "evidence_a1f4f6c88d8dc867",
        "grant_probability_repair_5cc2e8f0f1a59bd9"
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
          "value_model_competitive_cost_share",
          "grant_probability_repair_applied",
          "source_confidence_medium",
          "estimate_status_human_review_required"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "eligible_federal_geothermal_funding_opportunity",
      "label": "eligible federal geothermal funding opportunity",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
      "input_key": "federal_award_amount",
      "label": "federal award amount",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
      "input_key": "federal_cost_share_requirement",
      "label": "federal cost-share requirement",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
      "input_key": "total_eligible_project_budget",
      "label": "total eligible project budget",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
      "input_key": "cec_cost_share_request",
      "label": "CEC cost-share request",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
      "input_key": "cec_award_decision",
      "label": "CEC award decision",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
      "input_key": "cost_share_requirement",
      "label": "cost-share requirement",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
      "input_key": "cec_funding_request",
      "label": "CEC funding request",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
        "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
      "input_key": "applicant_type",
      "label": "Applicant Type",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_f1659ce17e5da4b9"
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
      "input_key": "topic_area",
      "label": "Topic Area",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_1_f1659ce17e5da4b9"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data"
      ],
      "missing_severity": "blocks_calculation"
    }
  ],
  "source_evidence": [
    {
      "evidence_id": "evidence_a1f4f6c88d8dc867",
      "source_type": "gpt_pro_research_summary",
      "quote": "This is a geothermal cost-share grant tied to federal awards, not a geothermal heat-pump incentive.",
      "source_urls": [
        "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities",
        "https://ecams.energy.ca.gov/s/login/"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_5cc2e8f0f1a59bd9",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "CEC's official solicitation page says GFO-25-902 provides cost-share funding to applicants that apply for and receive awards under eligible federal geothermal funding opportunities. Detailed calculation rules are in the official DOCX manual; indexed excerpts indicate a $3,000,000 total budget and topic-specific caps.",
      "source_urls": [
        "https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities",
        "https://www.energy.ca.gov/sites/default/files/2026-06/00_GFO-25-902_Solicitation_Manual_Addendum_01_ada.docx",
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
    "effect_grant_expected_value_1_f1659ce17e5da4b9: missing probability_discount",
    "effect_grant_expected_value_1_f1659ce17e5da4b9: missing conditional_award_cents",
    "effect_grant_expected_value_1_f1659ce17e5da4b9: conditional award status needs_project_scope",
    "effect_grant_expected_value_1_f1659ce17e5da4b9: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902",
  "programName": "GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities",
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
