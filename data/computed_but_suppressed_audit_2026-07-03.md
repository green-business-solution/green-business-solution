# Computed-But-Suppressed Package Audit

Generated: 2026-07-04T01:17:55.170Z

## Summary

- Computed-but-suppressed package evaluations: 14
- Positive suppressed effect evaluations: 14
- Unique positive package/effect targets: 4
- Ready for default inclusion candidates: 0
- Targets needing GPT Pro/source repair: 0

## Recommendation Counts

| Key | Count |
| --- | --- |
| keep_human_review_source_blocked | 1 |
| keep_suppressed_grant_ev | 1 |
| needs_product_policy | 1 |
| needs_recurring_savings_policy | 1 |

## Runtime Status Counts

| Key | Count |
| --- | --- |
| human_review_required | 7 |
| low_confidence | 4 |
| not_user_facing_default | 3 |

## Effect Type Counts

| Key | Count |
| --- | --- |
| financing_subsidy | 1 |
| grant_expected_value | 1 |
| one_time_savings | 1 |
| recurring_savings | 1 |

## Ready For Default Inclusion

_None._

## Needs Source Repair Or Review

_None._

## Needs Package Recode Or Source Access

| Program | Effect | Cash Class | Method | Evaluations | Amount Range | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Xcel Energy - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:1581) | one_time_savings / measure_catalog | rebate | measure_catalog | 7 | $600-$600 | Keep suppressed. GPT Pro found partial support but unresolved official-source access or term conflicts remain. |

## Policy / Intentional Suppression

| Program | Effect | Cash Class | Method | Evaluations | Amount Range | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Electric Vehicle Fleet Fee Exemption (SOURCE_DSIRE:dsire_program_id:22174) | recurring_savings / fixed_amount | tariff_or_rate | fixed_amount | 1 | $20.00-$20.00 | Do not include in upfront totals. Route to recurring savings display after tariff/rate treatment is finalized. |
| Energy Efficiency Grant Program for Nonprofit Organizations (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations) | grant_expected_value / capped_percent_of_eligible_cost | cash_grant | percent_of_cost | 4 | $25,000-$25,000 | Keep suppressed. This is a competitive/expected-value grant path and should not be promoted without source-backed probability plus conditional award evidence. |
| Power Your Drive for Fleets (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_15131) | financing_subsidy / capped_percent_of_eligible_cost | process_value | percent_of_cost | 2 | $6,784-$16,000 | Do not include in upfront grant/rebate totals until the product decides how to value financing/process benefits. |

## Interpretation

- Most computed-but-suppressed rows are repeated evaluations of deterministic rebate/reimbursement package effects that computed a positive amount but still have `included_in_user_facing_total_default=false`.
- `ready_for_default_inclusion` means the audit found no human-review, low-confidence, expected-value, financing, or recurring/tariff blocker. It does not mean user inputs are perfect; many test-case amounts still use synthetic defaults that the real UI must collect or let the user override.
- `needs_source_repair_or_review` is the only bucket that should go to GPT Pro next. If it is empty, GPT Pro has no immediate computed-suppressed source-repair batch left.
- `needs_package_recode` means GPT Pro found that the current package rows no longer match official source rows; fix the package/effect structure before promoting.
- `needs_product_policy`, `needs_recurring_savings_policy`, and `keep_suppressed_grant_ev` should stay out of upfront totals until the relevant product/calculation path is intentionally designed.
