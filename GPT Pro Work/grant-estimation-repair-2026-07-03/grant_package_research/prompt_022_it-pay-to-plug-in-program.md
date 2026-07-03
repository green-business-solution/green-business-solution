You are helping RetroFi finish conservative grant estimation.

Prompt 22 of 37.

Research only official or primary administrator sources when possible. Third-party summaries can be used only to find official sources, not as final support for formula/probability fields.

## Goal

Repair this grant-like v2 incentive package so Codex can calculate the grant value conservatively at runtime, or suppress it with explicit reason codes when no defensible estimate exists.

Do not make every grant estimable. If the source only says "up to", if the award is competitive with no probability evidence, if funding status is unknown, or if project-specific award approval is required, return suppressed or missing-input status.

## Current Package Context

```json
{
  "opportunity_id": "SOURCE_DSIRE:dsire_program_id:22199",
  "program_name": "It Pay$ to Plug in Program",
  "calculation_status": "calculable_with_missing_inputs",
  "availability": {
    "status": "active",
    "source_access_status": "accessible_or_researched"
  },
  "retrofit_types": [
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
  "grant_effects": [
    {
      "effect_id": "effect_grant_expected_value_2_a26a941b3c377b51",
      "label": "DC fast charging funding is handled through separate competitive solicitations; do not assign an expected dollar value without a current solicitation amount and probability model.",
      "effect_type": "grant_expected_value",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "custom",
        "source_timing": "application_process",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": null,
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "zero_when_not_applicable",
        "probability_discount": null,
        "conditional_award_cents": null,
        "max_award_cents": 60000000,
        "grant_value_model_kind": "hybrid_rate_plus_cap",
        "cash_value_classification": "reimbursement",
        "conditional_award": {
          "status": "needs_project_scope",
          "formula_text": "For the separate NJDEP DCFC Solicitation 2025, eligible DC fast chargers rated 150 kW or higher could receive up to $100,000 per port. A project required at least two and no more than six 150 kW-or-greater DCFC ports. Publicly accessible chargers on government-owned property could be reimbursed up to 100% of eligible costs up to the per-port maximum; private property projects could be reimbursed up to 80% of eligible costs up to the per-port maximum. The 2025 DCFC solicitation period was August 25, 2025 through October 25, 2025 and is closed as of the research date.",
          "conditional_award_cents": null,
          "min_award_cents": 20000000,
          "max_award_cents": 60000000,
          "cost_share_percent": null,
          "required_project_inputs": [
            "current_dcfc_solicitation",
            "site_location",
            "property_ownership_type",
            "charger_count",
            "port_count",
            "eligible_cost",
            "award_notice"
          ],
          "calculation_trace": [
            "Official NJDEP DCFC page states solicitation period August 25, 2025 to October 25, 2025.",
            "Official page states reimbursement for 150 kW+ chargers is $100,000 per port.",
            "Official page states minimum two and maximum six 150 kW+ ports.",
            "Maximum conditional award from the closed 2025 solicitation is 6 * $100,000 = $600,000, before any lower eligible-cost percentage cap."
          ]
        },
        "probability_model": {
          "status": "evidence_not_found",
          "probability_discount": null,
          "probability_evidence_type": "scoring_criteria_only",
          "historical_awards_count": null,
          "historical_applications_count": null,
          "total_program_budget_cents": null,
          "expected_award_count": null,
          "competition_scope": "statewide_broad",
          "probability_notes": "The DCFC solicitation states that applications would be ranked after the competitive period and gives criteria, but no application count, award count, total current DCFC budget, or success rate was found. Because the solicitation period is closed, no expected value should be estimated for new applicants."
        },
        "expected_value_recommendation": {
          "estimate_status": "zero_value",
          "expected_value_cents": null,
          "estimate_confidence": "high",
          "include_in_user_facing_total_default": false,
          "reason_codes": [
            "dcfc_solicitation_closed",
            "competitive_grant",
            "probability_evidence_not_found",
            "future_solicitation_required"
          ]
        },
        "fallback_prior_suggestion": {
          "probability_discount": null,
          "basis": "No fallback prior suggested because the DCFC solicitation is closed. A future solicitation should be modeled separately if opened.",
          "should_retro_fi_use_without_human_approval": false
        },
        "min_award_cents": 20000000,
        "reason": "For the separate NJDEP DCFC Solicitation 2025, eligible DC fast chargers rated 150 kW or higher could receive up to $100,000 per port. A project required at least two and no more than six 150 kW-or-greater DCFC ports. Publicly accessible chargers on government-owned property could be reimbursed up to 100% of eligible costs up to the per-port maximum; private property projects could be reimbursed up to 80% of eligible costs up to the per-port maximum. The 2025 DCFC solicitation period was August 25, 2025 through October 25, 2025 and is closed as of the research date."
      },
      "required_inputs": [
        {
          "input_key": "current_dcfc_solicitation",
          "label": "current dcfc solicitation",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_a26a941b3c377b51"
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
          "input_key": "site_location",
          "label": "site location",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_a26a941b3c377b51"
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
          "input_key": "charger_count",
          "label": "charger count",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_2_a26a941b3c377b51"
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
          "input_key": "eligible_cost",
          "label": "eligible cost",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_2_a26a941b3c377b51"
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
          "input_key": "award_notice",
          "label": "award notice",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_a26a941b3c377b51"
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
            "effect_grant_expected_value_2_a26a941b3c377b51"
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
          "input_key": "property_ownership_type",
          "label": "Property Ownership Type",
          "value_type": "text",
          "required_for": [
            "effect_grant_expected_value_2_a26a941b3c377b51"
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
          "input_key": "port_count",
          "label": "Port Count",
          "value_type": "number",
          "required_for": [
            "effect_grant_expected_value_2_a26a941b3c377b51"
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
        "evidence_49ccdd47516f93f7",
        "grant_probability_repair_1fd01792b69e5449"
      ],
      "confidence": {
        "overall": 0.9,
        "calculation": 0.9,
        "extraction": 0.9,
        "reason_codes": [
          "repair_status_calculation_package_found",
          "calculation_status_calculable_with_missing_inputs",
          "source_confidence_high",
          "estimate_confidence_medium",
          "value_model_competitive_max_only",
          "grant_probability_repair_applied",
          "estimate_confidence_high",
          "value_model_hybrid_rate_plus_cap",
          "estimate_status_zero_value"
        ]
      }
    }
  ],
  "related_non_grant_effects": [
    {
      "effect_id": "effect_one_time_savings_1_775c1a75361e123c",
      "label": "Level 1 and Level 2 reimbursement is up to $750 per Level 1 charging port or up to $4,000 per Level 2 charging port for eligible non-single-family sites.",
      "effect_type": "one_time_savings",
      "cash_flow_direction": "benefit",
      "timing": {
        "cadence": "one_time",
        "source_timing": "post_installation_reimbursement",
        "approval_required_before_purchase": true,
        "approval_required_before_installation": true,
        "application_deadline": null,
        "funding_status": "open_while_funds_last"
      },
      "calculation": {
        "method": "measure_catalog",
        "measure_catalog_id": "njdep_it_pays_l1_l2_2026",
        "measure_selection_input": "charger level"
      },
      "required_inputs": [
        {
          "input_key": "charger_level",
          "label": "charger level",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_775c1a75361e123c"
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
          "input_key": "port_count",
          "label": "port count",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_775c1a75361e123c"
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
          "input_key": "site_type",
          "label": "site type",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_775c1a75361e123c"
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
          "input_key": "grant_agreement_before_purchase_or_installation",
          "label": "grant agreement before purchase or installation",
          "value_type": "text",
          "required_for": [
            "effect_one_time_savings_1_775c1a75361e123c"
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
          "input_key": "eligible_cost",
          "label": "eligible cost",
          "value_type": "number",
          "required_for": [
            "effect_one_time_savings_1_775c1a75361e123c"
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
        "evidence_49ccdd47516f93f7"
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
      }
    }
  ],
  "measure_catalogs": [
    {
      "catalog_id": "njdep_it_pays_l1_l2_2026",
      "name": "njdep_it_pays_l1_l2_2026",
      "selection_input": "charger level",
      "measures": [
        {
          "measure_id": "level_1_charging_port",
          "name": "Level 1 charging port",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "zero_when_not_applicable",
            "reason": "Measure row requires custom interpretation.",
            "source_row": {
              "measure": "Level 1 charging port",
              "maxAwardCents": 75000,
              "unit": "port"
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "measure": "Level 1 charging port",
            "maxAwardCents": 75000,
            "unit": "port"
          }
        },
        {
          "measure_id": "level_2_charging_port",
          "name": "Level 2 charging port",
          "category": null,
          "customer_filters": [],
          "equipment_filters": [],
          "calculation": {
            "method": "zero_when_not_applicable",
            "reason": "Measure row requires custom interpretation.",
            "source_row": {
              "measure": "Level 2 charging port",
              "maxAwardCents": 400000,
              "unit": "port"
            }
          },
          "limits": [],
          "required_inputs": [],
          "evidence_refs": [],
          "confidence": {
            "overall": 0.72,
            "calculation": 0.72,
            "extraction": 0.72,
            "reason_codes": [
              "gpt_pro_measure_catalog_row"
            ]
          },
          "source_row": {
            "measure": "Level 2 charging port",
            "maxAwardCents": 400000,
            "unit": "port"
          }
        }
      ]
    }
  ],
  "input_requirements": [
    {
      "input_key": "charger_level",
      "label": "charger level",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_775c1a75361e123c"
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
      "input_key": "port_count",
      "label": "port count",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_775c1a75361e123c",
        "effect_grant_expected_value_2_a26a941b3c377b51"
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
      "input_key": "site_type",
      "label": "site type",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_775c1a75361e123c"
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
      "input_key": "grant_agreement_before_purchase_or_installation",
      "label": "grant agreement before purchase or installation",
      "value_type": "text",
      "required_for": [
        "effect_one_time_savings_1_775c1a75361e123c"
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
      "input_key": "eligible_cost",
      "label": "eligible cost",
      "value_type": "number",
      "required_for": [
        "effect_one_time_savings_1_775c1a75361e123c",
        "effect_grant_expected_value_2_a26a941b3c377b51"
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
      "input_key": "current_dcfc_solicitation",
      "label": "current dcfc solicitation",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_a26a941b3c377b51"
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
      "input_key": "site_location",
      "label": "site location",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_a26a941b3c377b51"
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
      "input_key": "charger_count",
      "label": "charger count",
      "value_type": "number",
      "required_for": [
        "effect_grant_expected_value_2_a26a941b3c377b51"
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
      "input_key": "award_notice",
      "label": "award notice",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_a26a941b3c377b51"
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
        "effect_grant_expected_value_2_a26a941b3c377b51"
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
      "input_key": "property_ownership_type",
      "label": "Property Ownership Type",
      "value_type": "text",
      "required_for": [
        "effect_grant_expected_value_2_a26a941b3c377b51"
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
      "evidence_id": "evidence_49ccdd47516f93f7",
      "source_type": "gpt_pro_research_summary",
      "quote": "NJDEP It Pay$ to Plug In has rolling Level 1 and Level 2 reimbursement caps and separate competitive DCFC solicitations; private single-family dwellings are excluded.",
      "source_urls": [
        "https://dep.nj.gov/drivegreen/it-pays-to-plug-in/",
        "https://dep.nj.gov/grantandloanprograms/it-pays-to-plug-in-njs-electric-vehicle-charging-grant-program/",
        "https://dep.nj.gov/drivegreen/dcfcsolicitation/",
        "https://njdepsage.intelligrants.com/"
      ],
      "evidence_confidence": 0.9
    },
    {
      "evidence_id": "grant_probability_repair_1fd01792b69e5449",
      "source_type": "gpt_pro_grant_probability_repair",
      "quote": "NJDEP's general It Pay$ page lists Level 1 and Level 2 rolling/waitlist reimbursements separately from DCFC. The official DCFC Solicitation 2025 page states a solicitation period from August 25, 2025 through October 25, 2025, reimbursement of $100,000 per 150 kW+ port, and a two-to-six-port project range.",
      "source_urls": [
        "https://dep.nj.gov/drivegreen/it-pays-to-plug-in/",
        "https://dep.nj.gov/grantandloanprograms/it-pays-to-plug-in-njs-electric-vehicle-charging-grant-program/",
        "https://dep.nj.gov/drivegreen/dcfcsolicitation/",
        "https://njdepsage.intelligrants.com/"
      ],
      "evidence_confidence": 0.9
    }
  ],
  "confidence": {
    "overall": 0.72,
    "source_access": 0.9,
    "availability": 0.9,
    "calculation": 0.72,
    "extraction": 0.9,
    "reason_codes": [
      "repair_status_calculation_package_found",
      "calculation_status_calculable_with_missing_inputs",
      "source_confidence_high",
      "estimate_confidence_medium"
    ]
  },
  "current_validation_notes": [
    "effect_grant_expected_value_2_a26a941b3c377b51: currently suppressed because method is unsupported or not applicable",
    "effect_grant_expected_value_2_a26a941b3c377b51: conditional award status needs_project_scope",
    "effect_grant_expected_value_2_a26a941b3c377b51: probability status evidence_not_found"
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
  "opportunityId": "SOURCE_DSIRE:dsire_program_id:22199",
  "programName": "It Pay$ to Plug in Program",
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
