# Blocked And Suppressed Package Audit

Generated: 2026-07-04T07:36:53.137Z

## Summary

- Blocked/suppressed package evaluations: 95
- Unique package targets: 20
- High-priority targets: 0
- Targets needing GPT Pro/source repair: 0

## Recommendation Counts

| Key | Count |
| --- | --- |
| needs_quote_or_custom_calculation_workflow | 8 |
| needs_recurring_or_tariff_workflow | 7 |
| intentional_non_cash_or_process_workflow | 2 |
| keep_review_gated_tax_workflow | 2 |
| needs_runtime_verification_or_document_upload | 1 |

## Runtime Status Counts

| Key | Count |
| --- | --- |
| not_user_facing_default | 47 |
| custom_quote_estimate | 19 |
| no_calculable_value | 15 |
| human_review_required | 11 |
| low_confidence | 3 |

## Outcome Class Counts

| Key | Count |
| --- | --- |
| suppressed_without_amount | 61 |
| source_or_package_blocked | 34 |

## Needs Quote Or Custom Calculation Workflow

| Program | Evaluations | Statuses | Effects | Cash Classes | Samples | Action |
| --- | --- | --- | --- | --- | --- | --- |
| City and County of Denver - Solar Rebate (SOURCE_DSIRE:dsire_program_id:22753) | 1 | low_confidence: 1 | one_time_savings | rebate | tapiz-mariposa-denver-household | Keep suppressed until the user/quote workflow can collect custom project data. Do not send to GPT Pro unless the source formula itself is unclear. |
| Comfortably CA (SOURCE_SDGE_BUSINESS:program_url:comfortablyca_com) | 1 | custom_quote_estimate: 1 | one_time_savings, process_value | rebate, technical_assistance | juniper-and-ivy-san-diego | Keep suppressed until the user/quote workflow can collect custom project data. Do not send to GPT Pro unless the source formula itself is unclear. |
| Eagle County - Walking Mountains Science Center Solar PV Rebate (SOURCE_DSIRE:dsire_program_id:22786) | 2 | custom_quote_estimate: 2 | one_time_savings | rebate | food-bank-rockies-aurora-dc, tapiz-mariposa-denver-household | Keep suppressed until the user/quote workflow can collect custom project data. Do not send to GPT Pro unless the source formula itself is unclear. |
| GRID-Lodging (SOURCE_SDGE_BUSINESS:program_url:mendotagroup_com_sdge_grid_lodging) | 1 | low_confidence: 1 | one_time_savings | rebate | juniper-and-ivy-san-diego | Keep suppressed until the user/quote workflow can collect custom project data. Do not send to GPT Pro unless the source formula itself is unclear. |
| Groceries, Restaurants and Food Storage Program (SOURCE_SDGE_BUSINESS:program_url:aesc_inc_com_groceries_restaurants_and_food_storage_program) | 3 | custom_quote_estimate: 3 | one_time_savings | rebate | juniper-and-ivy-san-diego | Keep suppressed until the user/quote workflow can collect custom project data. Do not send to GPT Pro unless the source formula itself is unclear. |
| Low Income Home Energy Assistance Program (LIHEAP) (SOURCE_DSIRE:dsire_program_id:5712) | 5 | no_calculable_value: 5 | no_cash_value | unknown | boston-latin-school, ocracoke-school-island, santa-clara-university-campus | Keep suppressed until the user/quote workflow can collect custom project data. Do not send to GPT Pro unless the source formula itself is unclear. |
| OG&E - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3639) | 8 | custom_quote_estimate: 8 | one_time_savings, process_value | process_value, rebate | cherokee-ww-hastings-hospital, okc-national-memorial-museum | Keep suppressed until the user/quote workflow can collect custom project data. Do not send to GPT Pro unless the source formula itself is unclear. |
| Rhode Island Energy (Electric) Commercial and Industrial Rebate Program (SOURCE_DSIRE:dsire_program_id:5756) | 5 | custom_quote_estimate: 5 | one_time_savings | rebate | narragansett-organics-recovery-ri | Keep suppressed until the user/quote workflow can collect custom project data. Do not send to GPT Pro unless the source formula itself is unclear. |

## Needs Runtime Verification Or Document Upload

| Program | Evaluations | Statuses | Effects | Cash Classes | Samples | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Colorado - Home Electrification and Appliance Rebate (HEAR) Program (SOURCE_DSIRE:dsire_program_id:22718) | 7 | human_review_required: 7 | one_time_savings | rebate | tapiz-mariposa-denver-household | Keep suppressed until runtime funding/status, approval documents, or user/accountant/assessor documents are available. |

## Intentional Non Cash Or Process Workflow

| Program | Evaluations | Statuses | Effects | Cash Classes | Samples | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Clean Transportation Program (SOURCE_DSIRE:dsire_program_id:22149) | 4 | no_calculable_value: 4 | no_cash_value | unknown | fender-corona-plant, seghesio-healdsburg-winery | Keep as a non-cash/process workflow. It can be modeled later as application, interconnection, permit, technical-assistance, or no-retrofit-needed workflow value. |
| RG&E - Smart Energy Residential Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3464) | 6 | no_calculable_value: 6 | no_cash_value | unknown | via-verde-bronx-renter-household | Keep as a non-cash/process workflow. It can be modeled later as application, interconnection, permit, technical-assistance, or no-retrofit-needed workflow value. |

## Needs Recurring Or Tariff Workflow

| Program | Evaluations | Statuses | Effects | Cash Classes | Samples | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Consolidated Edison - SmartCharge New York (SOURCE_DSIRE:dsire_program_id:22388) | 2 | not_user_facing_default: 2 | recurring_savings | rebate, tariff_or_rate | via-verde-bronx-renter-household | Keep suppressed until recurring savings and tariff/rate product treatment is designed. Do not include in upfront totals. |
| Critical Peak Pricing Plans (SOURCE_SDGE_BUSINESS:program_url:myenergycenter_com) | 2 | not_user_facing_default: 2 | recurring_savings | tariff_or_rate | juniper-and-ivy-san-diego | Keep suppressed until recurring savings and tariff/rate product treatment is designed. Do not include in upfront totals. |
| E-ZPass Minnesota Electric Vehicle Incentive (SOURCE_DSIRE:dsire_program_id:22194) | 1 | not_user_facing_default: 1 | one_time_savings | tariff_or_rate | the-rose-minneapolis-household | Keep suppressed until recurring savings and tariff/rate product treatment is designed. Do not include in upfront totals. |
| Emergency Load Reduction Program (ELRP) (SOURCE_SCE_BUSINESS:sce_source_section:56574423e5e2b946:emergency-load-reduction-program-elrp) | 1 | not_user_facing_default: 1 | recurring_savings | tariff_or_rate | fender-corona-plant | Keep suppressed until recurring savings and tariff/rate product treatment is designed. Do not include in upfront totals. |
| Marin Clean Energy - Feed-In Tariff Plus (SOURCE_DSIRE:dsire_program_id:22615) | 40 | not_user_facing_default: 40 | recurring_savings | tariff_or_rate | california-endowment-hq, fender-corona-plant, ikea-burbank | Keep suppressed until recurring savings and tariff/rate product treatment is designed. Do not include in upfront totals. |
| MassSAVE (Electric) - CI Connected Solutions Program (SOURCE_DSIRE:dsire_program_id:22744) | 1 | not_user_facing_default: 1 | recurring_savings | tariff_or_rate | boston-latin-school | Keep suppressed until recurring savings and tariff/rate product treatment is designed. Do not include in upfront totals. |
| Xcel Energy - Solar Rewards Program (SOURCE_DSIRE:dsire_program_id:5295) | 1 | low_confidence: 1 | recurring_savings | tariff_or_rate | food-bank-rockies-aurora-dc | Keep suppressed until recurring savings and tariff/rate product treatment is designed. Do not include in upfront totals. |

## Keep Review Gated Tax Workflow

| Program | Evaluations | Statuses | Effects | Cash Classes | Samples | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Renewable Energy Renaissance Zones (SOURCE_DSIRE:dsire_program_id:3216) | 3 | human_review_required: 3 | tax_exemption | tax_exemption | gm-factory-zero-detroit | Keep suppressed until tax/accountant/assessor inputs are confirmed. This is a tax workflow/input problem, not a GPT Pro source-repair blocker. |
| Tax Abatement for Solar Manufacturers (SOURCE_DSIRE:dsire_program_id:381) | 1 | human_review_required: 1 | tax_rate_preference | tax_rate_preference | boeing-everett-factory | Keep suppressed until tax/accountant/assessor inputs are confirmed. This is a tax workflow/input problem, not a GPT Pro source-repair blocker. |

## Interpretation

- This report groups repeated test-case evaluations into unique opportunity/package targets. Counts here should drive repair batching, not the raw repeated evaluation count.
- `archive_or_exclude_source_inaccessible` targets do not need another GPT Pro pass under the current product policy unless a new official source appears.
- Buckets marked as needing GPT Pro/source repair are the only candidates for targeted GPT Pro repair prompts. Expected-value grants, tax workflows, quote workflows, and tariff/rate workflows are intentionally not treated as GPT Pro blockers here.
- If `needs_formula_or_input_resolution_audit` appears, check code/data first because the package is monetary but computed no amount.
- Custom quote, tariff/rate, process-value, and non-cash buckets should stay suppressed until the corresponding product workflow exists.
