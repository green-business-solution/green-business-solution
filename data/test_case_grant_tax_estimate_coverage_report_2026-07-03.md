# Test Case Grant/Tax Estimate Coverage

Generated: 2026-07-04T01:04:57.816Z

## Summary

- Test cases: 50
- Retrofit previews: 890
- Matched v2 package evaluations: 560
- Runtime-included packages: 259
- Computed but suppressed packages: 34
- Missing evidence/input packages: 0
- Tax opportunity packages in database: 3
- Tax opportunity packages matched by current test cases: 2
- Local tax workflow evaluations: 11

## Runtime Inclusion Status

| Status | Count |
| --- | --- |
| included | 259 |
| not_user_facing_default | 93 |
| no_calculable_value | 72 |
| human_review_required | 39 |
| source_inaccessible_repair_failure | 39 |
| low_confidence | 20 |
| custom_quote_estimate | 12 |
| no_supported_effect_amount | 12 |
| non_monetary_workflow | 12 |
| legacy_rule_preferred | 2 |

## Outcome Classes

| Status | Count |
| --- | --- |
| calculated_and_included | 259 |
| source_or_package_blocked | 123 |
| suppressed_without_amount | 118 |
| computed_but_suppressed | 34 |
| calculated_zero_or_no_supported_amount | 12 |
| non_monetary_workflow | 12 |
| legacy_rule_preferred | 2 |

## Local Tax Workflow Status

| Status | Count |
| --- | --- |
| calculated | 3 |
| missing_inputs | 3 |
| needs_tax_bill | 3 |
| review_required | 2 |

## Top Missing Inputs

_None._

## Unmatched Tax Opportunity Packages

| Opportunity | Program | Status | Effects |
| --- | --- | --- | --- |
| SOURCE_DSIRE:dsire_program_id:22798 | Renewable Energy Tax Valuation | non_monetary_workflow | property_tax_valuation |

## Interpretation

- The current 50 retrofit previews now match 2 of 3 tax opportunity packages.
- Local tax workflows can be selected for some test-case addresses after city inference, but they remain internal-only and are not part of customer-facing savings totals.
- Packages classified as `computed_but_suppressed` have enough runtime inputs to produce an internal amount, but are held out because of low confidence, review flags, or default user-facing inclusion policy.
- Packages classified as `source_or_package_blocked` need source/data repair or intentional archive/suppression decisions, not UI fields.
- No packages are currently classified as missing evidence/input repair gaps.
