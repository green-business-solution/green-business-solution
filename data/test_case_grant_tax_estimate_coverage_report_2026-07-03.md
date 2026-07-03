# Test Case Grant/Tax Estimate Coverage

Generated: 2026-07-03T23:44:46.217Z

## Summary

- Test cases: 50
- Retrofit previews: 779
- Matched v2 package evaluations: 383
- Runtime-included packages: 6
- Computed but suppressed packages: 211
- Missing evidence/input packages: 31
- Tax opportunity packages in database: 3
- Tax opportunity packages matched by current test cases: 0
- Local tax workflow evaluations: 11

## Runtime Inclusion Status

| Status | Count |
| --- | --- |
| not_user_facing_default | 242 |
| source_inaccessible_repair_failure | 38 |
| human_review_required | 30 |
| no_calculable_value | 28 |
| low_confidence | 17 |
| custom_quote_estimate | 8 |
| non_monetary_workflow | 8 |
| included | 6 |
| no_supported_effect_amount | 4 |
| legacy_rule_preferred | 2 |

## Outcome Classes

| Status | Count |
| --- | --- |
| computed_but_suppressed | 211 |
| suppressed_without_amount | 65 |
| source_or_package_blocked | 56 |
| missing_evidence_or_inputs | 31 |
| non_monetary_workflow | 8 |
| calculated_and_included | 6 |
| calculated_zero_or_no_supported_amount | 4 |
| legacy_rule_preferred | 2 |

## Local Tax Workflow Status

| Status | Count |
| --- | --- |
| calculated | 5 |
| needs_tax_bill | 3 |
| review_required | 2 |
| missing_inputs | 1 |

## Top Missing Inputs

| Input | Count |
| --- | --- |
| award_probability | 30 |
| conditional_award_amount | 1 |

## Unmatched Tax Opportunity Packages

| Opportunity | Program | Status | Effects |
| --- | --- | --- | --- |
| SOURCE_DSIRE:dsire_program_id:3216 | Renewable Energy Renaissance Zones | calculable_with_missing_inputs | tax_exemption |
| SOURCE_DSIRE:dsire_program_id:22798 | Renewable Energy Tax Valuation | non_monetary_workflow | property_tax_valuation |
| SOURCE_DSIRE:dsire_program_id:381 | Tax Abatement for Solar Manufacturers | calculable_with_missing_inputs | tax_rate_preference |

## Interpretation

- The current 50 retrofit previews exercise grant/incentive packages, but they do not currently match the three tax opportunity packages.
- Local tax workflows can be selected for some test-case addresses after city inference, but they remain internal-only and are not part of customer-facing savings totals.
- Packages classified as `computed_but_suppressed` have enough runtime inputs to produce an internal amount, but are held out because of low confidence, review flags, or default user-facing inclusion policy.
- Packages classified as `source_or_package_blocked` need source/data repair or intentional archive/suppression decisions, not UI fields.
- Remaining missing inputs are mostly competitive expected-value evidence, especially award probability, and are the highest-priority candidates for follow-up data repair.
