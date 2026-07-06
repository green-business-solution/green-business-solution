# Test Case Grant/Tax Estimate Coverage

Generated: 2026-07-05T23:58:32.447Z

## Summary

- Test cases: 65
- Retrofit previews: 890
- Matched v2 package evaluations: 367
- Runtime-included packages: 233
- Computed but suppressed packages: 4
- Missing evidence/input packages: 77
- Tax opportunity packages in database: 3
- Tax opportunity packages matched by current test cases: 1
- Local tax workflow evaluations: 16
- Tax profile runtime evaluations: 31
- Tax profile runtime ready rows: 7
- Tax profile included benefits: $426,432.19
- Tax profile included liabilities: $216,680.00
- Tax profile net impact: $209,752.19

## Runtime Inclusion Status

| Status | Count |
| --- | --- |
| included | 233 |
| needs_quote | 59 |
| not_user_facing_default | 25 |
| no_calculable_value | 20 |
| needs_funding_check | 9 |
| needs_project_scope | 9 |
| non_monetary_workflow | 8 |
| legacy_rule_preferred | 2 |
| human_review_required | 1 |
| suppressed_by_policy | 1 |

## Outcome Classes

| Status | Count |
| --- | --- |
| calculated_and_included | 233 |
| missing_evidence_or_inputs | 77 |
| suppressed_without_amount | 23 |
| source_or_package_blocked | 20 |
| non_monetary_workflow | 8 |
| computed_but_suppressed | 4 |
| legacy_rule_preferred | 2 |

## Local Tax Workflow Status

| Status | Count |
| --- | --- |
| calculated | 6 |
| review_required | 4 |
| needs_tax_bill | 3 |
| needs_tax_return | 2 |
| missing_inputs | 1 |

## Local Tax Production Action Buckets

| Status | Count |
| --- | --- |
| production_ready_customer_calculation | 6 |
| tax_bill_upload_required | 3 |
| tax_return_input_required | 3 |
| not_applicable_zero_value | 2 |
| assessor_confirmation_required | 1 |
| tax_profile_input_required | 1 |

## Tax Profile Runtime Status

| Status | Count |
| --- | --- |
| unsupported_runtime_model | 11 |
| calculated | 7 |
| missing_inputs | 6 |
| review_required | 4 |
| needs_tax_bill | 3 |

## Tax Opportunity Production Action Buckets

| Status | Count |
| --- | --- |
| assessor_confirmation_required | 1 |

## Grant Production Action Buckets

| Status | Count |
| --- | --- |
| production_ready_included | 233 |
| form_input_required | 68 |
| not_grant_estimation_target | 23 |
| zero_placeholder_no_calculable_value | 10 |
| funding_refresh_required | 9 |
| non_grant_workflow | 4 |
| legacy_rule_preferred | 2 |

## Unresolved Grant Production Samples

| Action | Opportunity | Program | Runtime status | Reason |
| --- | --- | --- | --- | --- |
| form_input_required | SOURCE_DSIRE:dsire_program_id:22629 | California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| zero_placeholder_no_calculable_value | SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603 | GFO-25-603 - California's National Electric Vehicle Infrastructure Formula Program - Solicitation 6 Community Charging | no_calculable_value | No defensible formula or expected-value model exists, so the grant contribution should remain $0. |
| form_input_required | SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605 | GFO-25-605 - Reliable Electric Charging for Eligible School-bus Sites (RECESS) | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| non_grant_workflow | SOURCE_DSIRE:dsire_program_id:5685 | LADWP - Feed-in Tariff (FiT) Program | not_user_facing_default | The opportunity is better handled outside grant estimation. |
| non_grant_workflow | SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_15131 | Power Your Drive for Fleets | not_user_facing_default | The opportunity is better handled outside grant estimation. |
| non_grant_workflow | SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891 | National Electric Vehicle Infrastructure (NEVI) Program | suppressed_by_policy | The opportunity is better handled outside grant estimation. |
| form_input_required | SOURCE_SDGE_BUSINESS:program_url:comfortablyca_com | Comfortably CA | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| form_input_required | SOURCE_SDGE_BUSINESS:program_url:aesc_inc_com_groceries_restaurants_and_food_storage_program | Groceries, Restaurants and Food Storage Program | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| form_input_required | SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations | Energy Efficiency Grant Program for Nonprofit Organizations | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| form_input_required | SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:new-construction-incentives | New Construction Incentives | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| form_input_required | SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608 | GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME) | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| form_input_required | SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:heat-pump-water-heater-rebate | Heat Pump Water Heater Rebate | needs_project_scope | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| form_input_required | SOURCE_DSIRE:dsire_program_id:2794 | CPS Energy - Solar PV Rebate Program | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| form_input_required | SOURCE_DSIRE:dsire_program_id:22786 | Eagle County - Walking Mountains Science Center Solar PV Rebate | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| form_input_required | SOURCE_DSIRE:dsire_program_id:22753 | City and County of Denver - Solar Rebate | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| form_input_required | SOURCE_DSIRE:dsire_program_id:4630 | Boulder County - EnergySmart Residential Energy Efficiency Rebate Program | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| funding_refresh_required | SOURCE_DSIRE:dsire_program_id:22718 | Colorado - Home Electrification and Appliance Rebate (HEAR) Program | needs_funding_check | The estimate depends on current funding availability, waitlist, or while-funds-last status. |
| form_input_required | SOURCE_DSIRE:dsire_program_id:1581 | Xcel Energy - Residential Energy Efficiency Rebate Programs | needs_project_scope | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |
| form_input_required | SOURCE_DSIRE:dsire_program_id:5558 | City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants | needs_quote | The source-backed rule needs user, quote, bill, filing, or project-scope inputs before estimating. |

## Top Missing Inputs

_None._

## Unmatched Tax Opportunity Packages

| Opportunity | Program | Status | Effects |
| --- | --- | --- | --- |
| SOURCE_DSIRE:dsire_program_id:3216 | Renewable Energy Renaissance Zones | calculable_with_missing_inputs | tax_exemption |
| SOURCE_DSIRE:dsire_program_id:381 | Tax Abatement for Solar Manufacturers | calculable_with_missing_inputs | tax_rate_preference |

## Interpretation

- The current 65 test cases now match 1 of 3 tax opportunity packages.
- Local tax workflows can be selected for some test-case addresses after city inference; calculated rows are customer-facing once mandatory pre-opportunity tax inputs are present.
- Local tax rows classified as `tax_return_input_required`, `tax_bill_upload_required`, `assessor_confirmation_required`, or `program_document_required` are mandatory pre-opportunity intake requirements, not optional post-scenario gates.
- Tax profile runtime rows marked `unsupported_runtime_model` have complete profile inputs but still need a structured formula/model before they can create a customer-facing tax amount.
- Tax opportunity rows classified as `not_applicable_zero_value` are resolved to $0 by current test-case facts; rows classified as `assessor_confirmation_required` need a property-tax profile or assessor confirmation before customer-facing savings.
- Grant/incentive rows classified as `form_input_required` are normal production form gates, not source-data blockers.
- Grant/incentive rows classified as `funding_refresh_required` need current budget/funding status automation rather than one-time formula repair.
- Grant/incentive rows classified as `zero_placeholder_no_calculable_value` should contribute $0 to customer-facing grant totals unless later source research finds a defensible formula or expected-value model.
- Grant/incentive rows classified as `non_grant_workflow` should be handled outside the grant estimator, such as financing, technical assistance, tariff, or non-monetary workflows.
- Grant/incentive rows classified as `archive_or_exclude` should be archived, hidden, or repaired only if an official source becomes available.
- Packages classified as `computed_but_suppressed` have enough runtime inputs to produce an internal amount, but are held out because of low confidence, review flags, or default user-facing inclusion policy.
- Packages classified as `source_or_package_blocked` need source/data repair or intentional archive/suppression decisions, not UI fields.
- Packages classified as `missing_evidence_or_inputs` need quote, funding-status, project-scope, award, or runtime-document inputs before they can safely enter customer-facing totals.
