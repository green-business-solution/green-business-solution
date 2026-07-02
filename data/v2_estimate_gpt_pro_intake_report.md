# V2 Estimate GPT Pro Intake Report

Generated: 2026-07-02T20:11:54.309Z

## Output Validation

- Output files parsed: 6
- Input-resolution outputs: 2
- Grant probability outputs: 4
- Trailing text recoveries: 2
- Input warnings: 0
- Grant warnings: 2

## Warnings

- output_004_grant_probability_targets_015_028.md contained 3348 trailing characters after the first JSON object; imported the first JSON object and ignored trailing text.
- output_006_grant_probability_targets_043_054.md contained 1460 trailing characters after the first JSON object; imported the first JSON object and ignored trailing text.

## Input Resolution

- Input mappings: 125
- Global rules: 16
- Retrofit quantity override rows: 18
- Missing UI TODOs: 17

### Source Strategy Counts

| Key | Count |
| --- | ---: |
| user_input | 56 |
| quote_or_invoice | 25 |
| safe_placeholder_default | 11 |
| utility_bill_or_interval_data | 11 |
| admin_review | 6 |
| derive_from_retrofit_model | 6 |
| derive_from_runtime | 5 |
| program_source_repair_required | 5 |

### UI Placement Counts

| Key | Count |
| --- | ---: |
| equipment_details | 47 |
| retrofit_quantity | 17 |
| organization_profile | 14 |
| project_quote | 14 |
| admin_only | 9 |
| timing_preapproval | 9 |
| rate_selection | 7 |
| utility_bill_upload | 6 |
| tax_profile | 2 |

## Grant Probability Repairs

- Repairs imported: 54
- Repairs applied to v2 packages: 54
- Repairs with source-backed probability discount: 3
- Repairs included in user-facing totals by default: 0

### Estimate Status Counts

| Key | Count |
| --- | ---: |
| suppressed | 14 |
| needs_project_scope | 12 |
| human_review_required | 8 |
| needs_funding_check | 8 |
| needs_quote | 7 |
| zero_value | 4 |
| not_calculable | 1 |

### Value Model Counts

| Key | Count |
| --- | ---: |
| competitive_cost_share | 16 |
| hybrid_rate_plus_cap | 9 |
| capped_percent_of_eligible_cost | 6 |
| competitive_award_range | 4 |
| formula_grant | 4 |
| fixed_tier_amount | 3 |
| no_calculable_value | 3 |
| competitive_max_only | 2 |
| non_cash_technical_assistance | 2 |
| per_unit_award | 2 |
| fixed_amount | 1 |
| loan_or_financing_labeled_as_grant | 1 |
| other | 1 |

### Probability Evidence Counts

| Key | Count |
| --- | ---: |
| not_required | 17 |
| none | 12 |
| scoring_criteria_only | 8 |
| first_come_funding_unknown | 7 |
| eligibility_only | 6 |
| historical_success_rate | 3 |
| historical_awards_only | 1 |

## Package Validation

- Packages validated: 984
- Invalid packages: 0

## Artifacts

- Input artifact: `data/v2_estimate_input_resolution_research_gpt_pro_2026-07-02.json`
- Grant artifact: `data/grant_probability_research_repairs_gpt_pro_2026-07-02.json`
- Updated packages: `data/opportunity_incentive_calculation_packages_v2.json`
