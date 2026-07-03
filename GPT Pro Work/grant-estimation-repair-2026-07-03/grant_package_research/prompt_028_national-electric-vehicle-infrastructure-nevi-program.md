You are helping RetroFi finish conservative grant estimation.

Prompt 28 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891",
  "program_name": "National Electric Vehicle Infrastructure (NEVI) Program",
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
      "effect_id": "effect_process_value_1_cf6d168f0142b014",
      "label": "SDG&E provides customer support for businesses pursuing California NEVI funding, but the SDG&E page is not a direct charger rebate or grant award.",
      "effect_type": "process_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2026-10-16",
        "funding_status": "open_funds_available"
      },
      "calculation": {
        "method": "zero_when_not_applicable",
        "reason": "SDG&E provides customer support for businesses pursuing California NEVI funding, but the SDG&E program page is not a direct utility charger rebate or grant award.",
        "source_effect_id": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891:0:effect_process_value_1_cf6d168f0142b014",
        "grant_value_model_kind": "non_cash_technical_assistance",
        "cash_value_classification": "technical_assistance",
        "conditional_award": {
          "status": "zero_value",
          "formula_text": "SDG&E provides customer support for businesses pursuing California NEVI funding, but the SDG&E program page is not a direct utility charger rebate or grant award.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": null,
          "cost_share_percent": null,
          "required_project_inputs": [
            "sdge_service_area_site",
            "nevi_corridor_group",
            "project_concept",
            "cec_solicitation_application",
            "site_nevi_fit",
            "application_status"
          ],
          "calculation_trace": [
            "Confirm the customer is seeking SDG&E support for a NEVI application.",
            "The monetary award, if any, comes from the CEC competitive solicitation rather than SDG&E.",
            "Assign zero direct cash value to the SDG&E support effect."
          ]
        },
        "probability_model": {
          "status": "not_applicable",
          "probability_discount": null,
          "probability_evidence_type": "none",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": null,
          "expected_award_count": null,
          "competition_scope": "unknown",
          "probability_notes": "Not applicable to this SDG&E support effect because it is non-cash assistance, not the CEC monetary grant itself."
        },
        "expected_value_recommendation": {
          "estimate_status": "zero_value",
          "expected_value_cents": null,
          "estimate_confidence": "high",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "non_cash_application_support",
            "not_direct_utility_grant",
            "monetary_award_belongs_to_cec_solicitation"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "Not appropriate. Any probability prior would relate to the separate CEC NEVI grant effect, not SDG&E's application-support workflow.",
          "should_retro_fi_use_without_human_approval": false
        }
      },
      "required_inputs": [
        {
          "input_key": "sdge_service_area_site",
          "label": "SDGE service area site",
          "value_type": "text",
          "required_for": [
            "effect_process_value_1_cf6d168f0142b014"
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
          "input_key": "nevi_corridor_group",
          "label": "NEVI corridor group",
          "value_type": "text",
          "required_for": [
            "effect_process_value_1_cf6d168f0142b014"
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
          "input_key": "project_concept",
          "label": "project concept",
          "value_type": "text",
          "required_for": [
            "effect_process_value_1_cf6d168f0142b014"
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
          "input_key": "cec_solicitation_application",
          "label": "CEC solicitation application",
          "value_type": "text",
          "required_for": [
            "effect_process_value_1_cf6d168f0142b014"
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
          "input_key": "site_nevi_fit",
          "label": "site NEVI fit",
          "value_type": "text",
          "required_for": [
            "effect_process_value_1_cf6d168f0142b014"
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
          "input_key": "application_status",
          "label": "application status",
          "value_type": "text",
          "required_for": [
            "effect_process_value_1_cf6d168f0142b014"
          ],
          "source_precedence": [
            "user_profile",
            "retrofit_assumptions",
            "quote",
            "utility_data",
            "program_application",
            "admin_review"
          ],
          "missing_severity": "blocks_calculation"
        }
      ],
      "evidence_refs": [
        "evidence_e7184fbf66a1f4fc",
        "grant_probability_repair_861b18dc55a8abee"
      ],
      "confidence": {
        "overall": 0.9,
        "calculation": 0.9,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_non_monetary_workflow",
          "calculation_status_non_monetary_workflow",
          "source_confidence_high",
          "estimate_confidence_low",
          "value_model_non_cash_process_value",
          "grant_probability_repair_applied",
          "estimate_confidence_high",
          "value_model_non_cash_technical_assistance",
          "estimate_status_zero_value"
        ]
      }
    },
    {
      "effect_id": "effect_grant_expected_value_2_78ea28615e9acd08",
      "label": "For the CEC-administered California NEVI solicitation, potential funding is competitive and may use the federal NEVI cost-share limit of up to 80% of eligible project cost; no expected value should be counted without award probability evidence.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": "2026-10-16",
        "funding_status": "open_funds_available"
      },
      "calculation": {
        "method": "expected_value",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": 2765000000,
        "grant_value_model_kind": "competitive_cost_share",
        "cash_value_classification": "cash_grant",
        "conditional_award": {
          "status": "needs_project_cost",
          "formula_text": "For California CEC GFO-25-603, potential award = min(80% of total allowable project cost, $27,650,000 applicant maximum), with exactly 20% match funding required; applications are competitively screened, scored, and ranked until funds are exhausted.",
          "conditional_award_cents": null,
          "min_award_cents": null,
          "max_award_cents": 2765000000,
          "cost_share_percent": 0.8,
          "required_project_inputs": [
            "eligible_project_cost_cents",
            "nevi_corridor_site",
            "dc_fast_charger_scope",
            "approved_cost_share",
            "cec_application_score_or_award",
            "award_selection_probability"
          ],
          "calculation_trace": [
            "Confirm the site and scope fit the active California NEVI solicitation.",
            "Calculate 80% of total allowable project cost, reflecting the required 20% match.",
            "Apply the $27.65 million maximum award per applicant; selection remains competitive and ranked."
          ]
        },
        "probability_model": {
          "status": "evidence_not_found",
          "probability_discount": null,
          "probability_evidence_type": "scoring_criteria_only",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": 7900000000,
          "expected_award_count": null,
          "competition_scope": "statewide_broad",
          "probability_notes": "Official CEC materials provide total available funding, maximum award, match requirement, and scoring/ranking process, but no application count, expected award count, or historical success rate for this active solicitation was found."
        },
        "expected_value_recommendation": {
          "estimate_status": "suppressed",
          "expected_value_cents": null,
          "estimate_confidence": "low",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "competitive_cost_share",
            "no_probability_evidence",
            "statewide_scored_solicitation",
            "site_and_scope_required"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "A human-reviewed prior may be appropriate for a statewide competitive infrastructure solicitation, but official materials reviewed do not support an automated probability discount.",
          "should_retro_fi_use_without_human_approval": false
        },
        "min_award_cents": null,
        "cost_share_percent": 0.8
      },
      "caps": [
        {
          "cap_type": "maximum_percent_of_cost",
          "percent": 0.8,
          "applies_to": "effect"
        }
      ],
      "required_inputs": [
        {
          "input_key": "eligible_project_cost",
          "label": "eligible project cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_2_78ea28615e9acd08"
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
          "input_key": "cec_application_score_or_award",
          "label": "CEC application score or award",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_78ea28615e9acd08"
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
          "input_key": "nevi_corridor_site",
          "label": "NEVI corridor site",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_78ea28615e9acd08"
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
          "input_key": "approved_cost_share",
          "label": "approved cost share",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_2_78ea28615e9acd08"
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
          "input_key": "dc_fast_charger_scope",
          "label": "DC fast charger scope",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_78ea28615e9acd08"
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
          "input_key": "award_selection_probability",
          "label": "award selection probability",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_78ea28615e9acd08"
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
          "input_key": "approved_award_amount",
          "label": "approved award amount",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_2_78ea28615e9acd08"
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
          "input_key": "eligible_project_cost_cents",
          "label": "Eligible Project Cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_2_78ea28615e9acd08"
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
        "evidence_e7184fbf66a1f4fc",
        "grant_probability_repair_637bf6b00af0f143"
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
          "value_model_competitive_cost_share",
          "grant_probability_repair_applied",
          "estimate_status_suppressed"
        ]
      }
    }
  ],
  "input_requirements": [
    {
      "input_key": "sdge_service_area_site",
      "label": "SDGE service area site",
      "value_type": "text",
      "required_for": [
        "effect_process_value_1_cf6d168f0142b014"
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
      "input_key": "nevi_corridor_group",
      "label": "NEVI corridor group",
      "value_type": "text",
      "required_for": [
        "effect_process_value_1_cf6d168f0142b014"
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
      "input_key": "project_concept",
      "label": "project concept",
      "value_type": "text",
      "required_for": [
        "effect_process_value_1_cf6d168f0142b014"
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
      "input_key": "cec_solicitation_application",
      "label": "CEC solicitation application",
      "value_type": "text",
      "required_for": [
        "effect_process_value_1_cf6d168f0142b014"
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
      "input_key": "site_nevi_fit",
      "label": "site NEVI fit",
      "value_type": "text",
      "required_for": [
        "effect_process_value_1_cf6d168f0142b014"
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
      "input_key": "application_status",
      "label": "application status",
      "value_type": "text",
      "required_for": [
        "effect_process_value_1_cf6d168f0142b014"
      ],
      "source_precedence": [
        "user_profile",
        "retrofit_assumptions",
        "quote",
        "utility_data",
        "program_application",
        "admin_review"
      ],
      "missing_severity": "blocks_calculation"
    },
    {
      "input_key": "eligible_project_cost",
      "label": "eligible project cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_2_78ea28615e9acd08"
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
      "input_key": "cec_application_score_or_award",
      "label": "CEC application score or award",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_78ea28615e9acd08"
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
      "input_key": "nevi_corridor_site",
      "label": "NEVI corridor site",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_78ea28615e9acd08"
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
      "input_key": "approved_cost_share",
      "label": "approved cost share",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_2_78ea28615e9acd08"
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
      "input_key": "dc_fast_charger_scope",
      "label": "DC fast charger scope",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_78ea28615e9acd08"
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
      "input_key": "award_selection_probability",
      "label": "award selection probability",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_78ea28615e9acd08"
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
      "input_key": "approved_award_amount",
      "label": "approved award amount",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_2_78ea28615e9acd08"
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
      "input_key": "eligible_project_cost_cents",
      "label": "Eligible Project Cost",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_2_78ea28615e9acd08"
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
      "evidence_id": "evidence_e7184fbf66a1f4fc",
      "source_type": "gpt_pro_research_summary",
      "quote": "SDG&E's page is application support. The monetary opportunity is a CEC competitive NEVI solicitation for public high-powered DC fast charging, not a direct utility rebate.",
      "source_urls": [
        "https://www.sdge.com/business/electric-vehicles/nevi",
        "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
        "https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs",
        "https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_637bf6b00af0f143",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "SDG&E describes its role as helping customers with the California NEVI application process, while CEC's active GFO-25-603 is a competitive grant solicitation. CEC materials state up to $79 million is available, awards are capped at 35% of available funding or $27.65 million per applicant, match funding must be exactly 20%, and applications are screened, scored, and ranked. ([SDGE][8])",
      "source_urls": [
        "https://www.sdge.com/business/electric-vehicles/nevi",
        "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula",
        "https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs",
        "https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_861b18dc55a8abee",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "SDG&E's NEVI page describes support for customers applying to California NEVI funding, while CEC's GFO-25-603 is the active grant solicitation that may provide funding. ([SDGE][8])",
      "source_urls": [
        "https://www.sdge.com/business/electric-vehicles/nevi",
        "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula"
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
      "calculation_status_non_monetary_workflow",
      "source_confidence_high",
      "estimate_confidence_low"
    ]
  },
  "current_validation_notes": [
    "effect_grant_expected_value_2_78ea28615e9acd08: missing probability_discount",
    "effect_grant_expected_value_2_78ea28615e9acd08: missing conditional_award_cents",
    "effect_grant_expected_value_2_78ea28615e9acd08: conditional award status needs_project_cost",
    "effect_grant_expected_value_2_78ea28615e9acd08: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891",
  "programName": "National Electric Vehicle Infrastructure (NEVI) Program",
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
