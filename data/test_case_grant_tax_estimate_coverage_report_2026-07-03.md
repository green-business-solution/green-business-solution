# Test Case Grant/Tax Estimate Coverage

Generated: 2026-07-04T07:03:26.082Z

## Summary

- Test cases: 51
- Retrofit previews: 890
- Matched v2 package evaluations: 531
- Runtime-included packages: 292
- Computed but suppressed packages: 15
- Missing evidence/input packages: 0
- Tax opportunity packages in database: 3
- Tax opportunity packages matched by current test cases: 3
- Local tax workflow evaluations: 12

## Runtime Inclusion Status

| Status | Count |
| --- | --- |
| included | 292 |
| not_user_facing_default | 66 |
| needs_repair_review | 57 |
| human_review_required | 30 |
| low_confidence | 20 |
| custom_quote_estimate | 19 |
| no_supported_effect_amount | 16 |
| no_calculable_value | 15 |
| non_monetary_workflow | 14 |
| legacy_rule_preferred | 2 |

## Outcome Classes

| Status | Count |
| --- | --- |
| calculated_and_included | 292 |
| suppressed_without_amount | 101 |
| source_or_package_blocked | 91 |
| calculated_zero_or_no_supported_amount | 16 |
| computed_but_suppressed | 15 |
| non_monetary_workflow | 14 |
| legacy_rule_preferred | 2 |

## Local Tax Workflow Status

| Status | Count |
| --- | --- |
| calculated | 5 |
| needs_tax_bill | 3 |
| review_required | 3 |
| missing_inputs | 1 |

## Top Missing Inputs

_None._

## Unmatched Tax Opportunity Packages

All tax opportunity packages were matched by at least one test-case retrofit.

## Interpretation

- The current 51 test cases now match 3 of 3 tax opportunity packages.
- Local tax workflows can be selected for some test-case addresses after city inference, but they remain internal-only and are not part of customer-facing savings totals.
- Packages classified as `computed_but_suppressed` have enough runtime inputs to produce an internal amount, but are held out because of low confidence, review flags, or default user-facing inclusion policy.
- Packages classified as `source_or_package_blocked` need source/data repair or intentional archive/suppression decisions, not UI fields.
- No packages are currently classified as missing evidence/input repair gaps.
