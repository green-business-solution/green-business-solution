# Test Case Grant/Tax Estimate Coverage

Generated: 2026-07-04T09:10:42.621Z

## Summary

- Test cases: 51
- Retrofit previews: 890
- Matched v2 package evaluations: 531
- Runtime-included packages: 292
- Computed but suppressed packages: 15
- Missing evidence/input packages: 68
- Tax opportunity packages in database: 3
- Tax opportunity packages matched by current test cases: 3
- Local tax workflow evaluations: 12

## Runtime Inclusion Status

| Status | Count |
| --- | --- |
| included | 292 |
| needs_quote | 65 |
| not_user_facing_default | 53 |
| suppressed_by_policy | 50 |
| human_review_required | 20 |
| no_supported_effect_amount | 16 |
| no_calculable_value | 15 |
| non_monetary_workflow | 12 |
| low_confidence | 3 |
| needs_funding_check | 3 |
| legacy_rule_preferred | 2 |

## Outcome Classes

| Status | Count |
| --- | --- |
| calculated_and_included | 292 |
| suppressed_without_amount | 111 |
| missing_evidence_or_inputs | 68 |
| calculated_zero_or_no_supported_amount | 16 |
| computed_but_suppressed | 15 |
| source_or_package_blocked | 15 |
| non_monetary_workflow | 12 |
| legacy_rule_preferred | 2 |

## Local Tax Workflow Status

| Status | Count |
| --- | --- |
| calculated | 5 |
| needs_tax_bill | 3 |
| review_required | 3 |
| missing_inputs | 1 |

## Grant Production Action Buckets

| Status | Count |
| --- | --- |
| production_ready_included | 292 |
| form_input_required | 65 |
| grant_formula_repair_required | 57 |
| not_grant_estimation_target | 48 |
| zero_placeholder_no_calculable_value | 23 |
| non_grant_workflow | 11 |
| funding_refresh_required | 3 |

## Unresolved Grant Production Samples

| Action | Opportunity | Program | Runtime status | Reason |
| --- | --- | --- | --- | --- |
| grant_formula_repair_required | SOURCE_DSIRE:dsire_program_id:22629 | California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program | suppressed_by_policy | The package is grant/rebate-related but policy or confidence metadata still prevents a production estimate. |
| zero_placeholder_no_calculable_value | SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603 | GFO-25-603 - California's National Electric Vehicle Infrastructure Formula Program - Solicitation 6 Community Charging | suppressed_by_policy | No defensible formula or expected-value model exists, so the grant contribution should remain $0. |
| zero_placeholder_no_calculable_value | SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607 | GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) | suppressed_by_policy | No defensible formula or expected-value model exists, so the grant contribution should remain $0. |
| form_input_required | SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605 | GFO-25-605 - Reliable Electric Charging for Eligible School-bus Sites (RECESS) | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| form_input_required | SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902 | GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| form_input_required | SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308 | GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| non_grant_workflow | SOURCE_DSIRE:dsire_program_id:5685 | LADWP - Feed-in Tariff (FiT) Program | not_user_facing_default | The opportunity is better handled outside grant estimation. |
| non_grant_workflow | SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_15131 | Power Your Drive for Fleets | not_user_facing_default | The opportunity is better handled outside grant estimation. |
| non_grant_workflow | SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891 | National Electric Vehicle Infrastructure (NEVI) Program | suppressed_by_policy | The opportunity is better handled outside grant estimation. |
| form_input_required | SOURCE_SDGE_BUSINESS:program_url:comfortablyca_com | Comfortably CA | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| form_input_required | SOURCE_SDGE_BUSINESS:program_url:aesc_inc_com_groceries_restaurants_and_food_storage_program | Groceries, Restaurants and Food Storage Program | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| grant_formula_repair_required | SOURCE_SDGE_BUSINESS:program_url:mendotagroup_com_sdge_grid_lodging | GRID-Lodging | low_confidence | The package is grant/rebate-related but policy or confidence metadata still prevents a production estimate. |
| grant_formula_repair_required | SOURCE_DSIRE:dsire_program_id:22275 | Anaheim Public Utilities - Personal Use EV Charger Rebates | not_user_facing_default | The package is grant/rebate-related but policy or confidence metadata still prevents a production estimate. |
| non_grant_workflow | SOURCE_DSIRE:dsire_program_id:918 | Office of Indian Energy Policy and Programs - Funding Opportunities | suppressed_by_policy | The opportunity is better handled outside grant estimation. |

## Top Missing Inputs

_None._

## Unmatched Tax Opportunity Packages

All tax opportunity packages were matched by at least one test-case retrofit.

## Interpretation

- The current 51 test cases now match 3 of 3 tax opportunity packages.
- Local tax workflows can be selected for some test-case addresses after city inference, but they remain internal-only and are not part of customer-facing savings totals.
- Grant/incentive rows classified as `form_input_required` are normal production form gates, not source-data blockers.
- Grant/incentive rows classified as `funding_refresh_required` need current budget/funding status automation rather than one-time formula repair.
- Grant/incentive rows classified as `zero_placeholder_no_calculable_value` should contribute $0 to customer-facing grant totals unless later source research finds a defensible formula or expected-value model.
- Grant/incentive rows classified as `non_grant_workflow` should be handled outside the grant estimator, such as financing, technical assistance, tariff, or non-monetary workflows.
- Grant/incentive rows classified as `archive_or_exclude` should be archived, hidden, or repaired only if an official source becomes available.
- Packages classified as `computed_but_suppressed` have enough runtime inputs to produce an internal amount, but are held out because of low confidence, review flags, or default user-facing inclusion policy.
- Packages classified as `source_or_package_blocked` need source/data repair or intentional archive/suppression decisions, not UI fields.
- Packages classified as `missing_evidence_or_inputs` need quote, funding-status, project-scope, award, or runtime-document inputs before they can safely enter customer-facing totals.
