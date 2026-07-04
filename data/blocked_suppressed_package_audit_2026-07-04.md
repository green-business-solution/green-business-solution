# Blocked And Suppressed Package Audit

Generated: 2026-07-04T01:35:16.573Z

## Summary

- Blocked/suppressed package evaluations: 241
- Unique package targets: 50
- High-priority targets: 15
- Targets needing GPT Pro/source repair: 0

## Recommendation Counts

| Key | Count |
| --- | --- |
| keep_suppressed_ev_or_probability_gap | 15 |
| needs_formula_or_input_resolution_audit | 12 |
| needs_recurring_or_tariff_workflow | 8 |
| needs_quote_or_custom_calculation_workflow | 6 |
| archive_or_exclude_source_inaccessible | 3 |
| intentional_non_cash_or_process_workflow | 2 |
| keep_review_gated_tax_workflow | 2 |
| needs_runtime_verification_or_document_upload | 2 |

## Runtime Status Counts

| Key | Count |
| --- | --- |
| not_user_facing_default | 90 |
| no_calculable_value | 72 |
| source_inaccessible_repair_failure | 39 |
| low_confidence | 16 |
| custom_quote_estimate | 12 |
| human_review_required | 12 |

## Outcome Class Counts

| Key | Count |
| --- | --- |
| source_or_package_blocked | 123 |
| suppressed_without_amount | 118 |

## Needs Formula Or Input Resolution Audit

| Program | Evaluations | Statuses | Effects | Cash Classes | Samples | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Alliant Energy Interstate Power and Light - Commercial and Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4971) | 6 | not_user_facing_default: 6 | one_time_savings | rebate | quaker-oats-cedar-rapids | Audit runtime inputs and formula rows. This may be a code/input-default issue rather than a source-research issue because the package is direct monetary but computes zero. |
| Anaheim Public Utilities - EV Fleet Charger and Infrastructure Rebate (SOURCE_DSIRE:dsire_program_id:22277) | 2 | not_user_facing_default: 2 | one_time_savings | rebate | northgate-market-anaheim | Audit runtime inputs and formula rows. This may be a code/input-default issue rather than a source-research issue because the package is direct monetary but computes zero. |
| Anaheim Public Utilities - Personal Use EV Charger Rebates (SOURCE_DSIRE:dsire_program_id:22275) | 2 | not_user_facing_default: 2 | one_time_savings | rebate | northgate-market-anaheim | Audit runtime inputs and formula rows. This may be a code/input-default issue rather than a source-research issue because the package is direct monetary but computes zero. |
| Commercial Retro-Commissioning and New Construction Program (SOURCE_DSIRE:dsire_program_id:5218) | 1 | not_user_facing_default: 1 | one_time_savings, process_value | rebate, technical_assistance | organic-valley-lafarge-hq | Audit runtime inputs and formula rows. This may be a code/input-default issue rather than a source-research issue because the package is direct monetary but computes zero. |
| Controls Program (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:controls-program) | 3 | not_user_facing_default: 3 | one_time_savings | rebate | santa-clara-university-campus | Audit runtime inputs and formula rows. This may be a code/input-default issue rather than a source-research issue because the package is direct monetary but computes zero. |
| Customer Directed Electrification Rebate (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6849d4cc60567610:customer-directed-electrification-rebate) | 4 | not_user_facing_default: 4 | one_time_savings | rebate | santa-clara-university-campus | Audit runtime inputs and formula rows. This may be a code/input-default issue rather than a source-research issue because the package is direct monetary but computes zero. |
| Eagle County - Walking Mountains Science Center Solar PV Rebate (SOURCE_DSIRE:dsire_program_id:22786) | 2 | not_user_facing_default: 2 | one_time_savings | rebate | food-bank-rockies-aurora-dc, tapiz-mariposa-denver-household | Audit runtime inputs and formula rows. This may be a code/input-default issue rather than a source-research issue because the package is direct monetary but computes zero. |
| Georgia Power - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4656) | 8 | not_user_facing_default: 8 | one_time_savings | rebate | trees-atlanta-kendeda-treehouse | Audit runtime inputs and formula rows. This may be a code/input-default issue rather than a source-research issue because the package is direct monetary but computes zero. |
| LADWP - Non-Residential Energy Efficiency Incentive Program (SOURCE_DSIRE:dsire_program_id:1866) | 1 | not_user_facing_default: 1 | one_time_savings | rebate | california-endowment-hq | Audit runtime inputs and formula rows. This may be a code/input-default issue rather than a source-research issue because the package is direct monetary but computes zero. |
| Rocky Mountain Power - wattsmart Business Program (SOURCE_DSIRE:dsire_program_id:2412) | 7 | not_user_facing_default: 7 | one_time_savings | rebate | salt-lake-public-safety-building | Audit runtime inputs and formula rows. This may be a code/input-default issue rather than a source-research issue because the package is direct monetary but computes zero. |
| SD Energy Edge (SOURCE_SDGE_BUSINESS:program_url:sdenergyedge_com) | 2 | not_user_facing_default: 2 | one_time_savings | rebate | juniper-and-ivy-san-diego | Audit runtime inputs and formula rows. This may be a code/input-default issue rather than a source-research issue because the package is direct monetary but computes zero. |
| Solar Water Heater Rebate (SOURCE_DSIRE:dsire_program_id:506) | 1 | not_user_facing_default: 1 | one_time_savings | rebate | keauhou-lane-honolulu-renter | Audit runtime inputs and formula rows. This may be a code/input-default issue rather than a source-research issue because the package is direct monetary but computes zero. |

## Archive Or Exclude Source Inaccessible

| Program | Evaluations | Statuses | Effects | Cash Classes | Samples | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Duke Energy - Non-Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3466) | 5 | source_inaccessible_repair_failure: 5 | no_cash_value | unknown | museum-life-science-durham | Archive or exclude from product-visible estimates unless a new accessible official source appears. This matches the current policy for repeated source-inaccessible repair failures. |
| Duke Energy Carolinas - Non-Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3606) | 6 | source_inaccessible_repair_failure: 6 | one_time_savings | rebate | bmw-spartanburg-plant | Archive or exclude from product-visible estimates unless a new accessible official source appears. This matches the current policy for repeated source-inaccessible repair failures. |
| Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067) | 28 | source_inaccessible_repair_failure: 28 | one_time_savings | rebate | california-endowment-hq, ikea-burbank, juniper-and-ivy-san-diego | Archive or exclude from product-visible estimates unless a new accessible official source appears. This matches the current policy for repeated source-inaccessible repair failures. |

## Needs Quote Or Custom Calculation Workflow

| Program | Evaluations | Statuses | Effects | Cash Classes | Samples | Action |
| --- | --- | --- | --- | --- | --- | --- |
| City and County of Denver - Solar Rebate (SOURCE_DSIRE:dsire_program_id:22753) | 1 | low_confidence: 1 | one_time_savings | rebate | tapiz-mariposa-denver-household | Keep suppressed until the user/quote workflow can collect custom project data. Do not send to GPT Pro unless the source formula itself is unclear. |
| Comfortably CA (SOURCE_SDGE_BUSINESS:program_url:comfortablyca_com) | 1 | custom_quote_estimate: 1 | one_time_savings, process_value | rebate, technical_assistance | juniper-and-ivy-san-diego | Keep suppressed until the user/quote workflow can collect custom project data. Do not send to GPT Pro unless the source formula itself is unclear. |
| GRID-Lodging (SOURCE_SDGE_BUSINESS:program_url:mendotagroup_com_sdge_grid_lodging) | 1 | low_confidence: 1 | one_time_savings | rebate | juniper-and-ivy-san-diego | Keep suppressed until the user/quote workflow can collect custom project data. Do not send to GPT Pro unless the source formula itself is unclear. |
| Groceries, Restaurants and Food Storage Program (SOURCE_SDGE_BUSINESS:program_url:aesc_inc_com_groceries_restaurants_and_food_storage_program) | 3 | custom_quote_estimate: 3 | one_time_savings | rebate | juniper-and-ivy-san-diego | Keep suppressed until the user/quote workflow can collect custom project data. Do not send to GPT Pro unless the source formula itself is unclear. |
| Low Income Home Energy Assistance Program (LIHEAP) (SOURCE_DSIRE:dsire_program_id:5712) | 5 | no_calculable_value: 5 | no_cash_value | unknown | boston-latin-school, ocracoke-school-island, santa-clara-university-campus | Keep suppressed until the user/quote workflow can collect custom project data. Do not send to GPT Pro unless the source formula itself is unclear. |
| OG&E - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3639) | 8 | custom_quote_estimate: 8 | one_time_savings, process_value | process_value, rebate | cherokee-ww-hastings-hospital, okc-national-memorial-museum | Keep suppressed until the user/quote workflow can collect custom project data. Do not send to GPT Pro unless the source formula itself is unclear. |

## Needs Runtime Verification Or Document Upload

| Program | Evaluations | Statuses | Effects | Cash Classes | Samples | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Colorado - Home Electrification and Appliance Rebate (HEAR) Program (SOURCE_DSIRE:dsire_program_id:22718) | 7 | human_review_required: 7 | one_time_savings | rebate | tapiz-mariposa-denver-household | Keep suppressed until runtime funding/status, approval documents, or user/accountant/assessor documents are available. |
| Hawaii - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22630) | 1 | human_review_required: 1 | one_time_savings | reimbursement | kauai-coffee-kalaheo | Keep suppressed until runtime funding/status, approval documents, or user/accountant/assessor documents are available. |

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
| LADWP - Feed-in Tariff (FiT) Program (SOURCE_DSIRE:dsire_program_id:5685) | 1 | not_user_facing_default: 1 | one_time_savings, recurring_savings | rebate, tariff_or_rate | california-endowment-hq | Keep suppressed until recurring savings and tariff/rate product treatment is designed. Do not include in upfront totals. |
| Marin Clean Energy - Feed-In Tariff Plus (SOURCE_DSIRE:dsire_program_id:22615) | 40 | not_user_facing_default: 40 | recurring_savings | tariff_or_rate | california-endowment-hq, fender-corona-plant, ikea-burbank | Keep suppressed until recurring savings and tariff/rate product treatment is designed. Do not include in upfront totals. |
| MassSAVE (Electric) - CI Connected Solutions Program (SOURCE_DSIRE:dsire_program_id:22744) | 1 | not_user_facing_default: 1 | recurring_savings | tariff_or_rate | boston-latin-school | Keep suppressed until recurring savings and tariff/rate product treatment is designed. Do not include in upfront totals. |
| Xcel Energy - Solar Rewards Program (SOURCE_DSIRE:dsire_program_id:5295) | 1 | low_confidence: 1 | recurring_savings | tariff_or_rate | food-bank-rockies-aurora-dc | Keep suppressed until recurring savings and tariff/rate product treatment is designed. Do not include in upfront totals. |

## Keep Review Gated Tax Workflow

| Program | Evaluations | Statuses | Effects | Cash Classes | Samples | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Renewable Energy Renaissance Zones (SOURCE_DSIRE:dsire_program_id:3216) | 3 | human_review_required: 3 | tax_exemption | tax_exemption | gm-factory-zero-detroit | Keep suppressed until tax/accountant/assessor inputs are confirmed. This is a tax workflow/input problem, not a GPT Pro source-repair blocker. |
| Tax Abatement for Solar Manufacturers (SOURCE_DSIRE:dsire_program_id:381) | 1 | human_review_required: 1 | tax_rate_preference | tax_rate_preference | boeing-everett-factory | Keep suppressed until tax/accountant/assessor inputs are confirmed. This is a tax workflow/input problem, not a GPT Pro source-repair blocker. |

## Keep Suppressed Ev Or Probability Gap

| Program | Evaluations | Statuses | Effects | Cash Classes | Samples | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Alaska - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22666) | 3 | not_user_facing_default: 3 | grant_expected_value | reimbursement | uaf-akasofu-building | Keep suppressed unless a conditional award and probability model become source-backed. Competitive expected-value grants should not be included just because they matched. |
| California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22629) | 10 | low_confidence: 10 | grant_expected_value | reimbursement | california-endowment-hq, fender-corona-plant, ikea-burbank | Keep suppressed unless a conditional award and probability model become source-backed. Competitive expected-value grants should not be included just because they matched. |
| City of Aspen and Pitkin County - Renewable Energy Mitigation Program Grants (SOURCE_DSIRE:dsire_program_id:5558) | 1 | no_calculable_value: 1 | grant_expected_value, one_time_savings | cash_grant, rebate | tapiz-mariposa-denver-household | Keep suppressed unless a conditional award and probability model become source-backed. Competitive expected-value grants should not be included just because they matched. |
| Electric Vehicle Fast-Charging Plazas Program (SOURCE_DSIRE:dsire_program_id:22160) | 1 | no_calculable_value: 1 | grant_expected_value | reimbursement | food-bank-rockies-aurora-dc | Keep suppressed unless a conditional award and probability model become source-backed. Competitive expected-value grants should not be included just because they matched. |
| GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308) | 10 | no_calculable_value: 10 | grant_expected_value | reimbursement | california-endowment-hq, fender-corona-plant, ikea-burbank | Keep suppressed unless a conditional award and probability model become source-backed. Competitive expected-value grants should not be included just because they matched. |
| GFO-25-603 - California's National Electric Vehicle Infrastructure Formula Program - Solicitation 6 Community Charging (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603) | 7 | no_calculable_value: 7 | grant_expected_value | reimbursement | california-endowment-hq, ikea-burbank, juniper-and-ivy-san-diego | Keep suppressed unless a conditional award and probability model become source-backed. Competitive expected-value grants should not be included just because they matched. |
| GFO-25-605 - Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605) | 7 | no_calculable_value: 7 | grant_expected_value | reimbursement | california-endowment-hq, ikea-burbank, juniper-and-ivy-san-diego | Keep suppressed unless a conditional award and probability model become source-backed. Competitive expected-value grants should not be included just because they matched. |
| GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607) | 14 | no_calculable_value: 14 | grant_expected_value | reimbursement | california-endowment-hq, ikea-burbank, juniper-and-ivy-san-diego | Keep suppressed unless a conditional award and probability model become source-backed. Competitive expected-value grants should not be included just because they matched. |
| GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608) | 1 | no_calculable_value: 1 | grant_expected_value | reimbursement | santa-clara-university-campus | Keep suppressed unless a conditional award and probability model become source-backed. Competitive expected-value grants should not be included just because they matched. |
| GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902) | 7 | no_calculable_value: 7 | grant_expected_value | cash_grant | california-endowment-hq, ikea-burbank, juniper-and-ivy-san-diego | Keep suppressed unless a conditional award and probability model become source-backed. Competitive expected-value grants should not be included just because they matched. |
| Leading By Example Restoration Grant for Solar PV & Decarbonized Systems (SOURCE_DSIRE:dsire_program_id:22770) | 1 | low_confidence: 1 | grant_expected_value | cash_grant | boston-latin-school | Keep suppressed unless a conditional award and probability model become source-backed. Competitive expected-value grants should not be included just because they matched. |
| Michigan - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22647) | 1 | low_confidence: 1 | grant_expected_value | reimbursement | gm-factory-zero-detroit | Keep suppressed unless a conditional award and probability model become source-backed. Competitive expected-value grants should not be included just because they matched. |
| National Electric Vehicle Infrastructure (NEVI) Program (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_23891) | 1 | low_confidence: 1 | grant_expected_value, no_cash_value | reimbursement, technical_assistance | juniper-and-ivy-san-diego | Keep suppressed unless a conditional award and probability model become source-backed. Competitive expected-value grants should not be included just because they matched. |
| Office of Indian Energy Policy and Programs - Funding Opportunities (SOURCE_DSIRE:dsire_program_id:918) | 7 | no_calculable_value: 7 | grant_expected_value, no_cash_value | cash_grant, technical_assistance | bmw-spartanburg-plant, boeing-everett-factory, fender-corona-plant | Keep suppressed unless a conditional award and probability model become source-backed. Competitive expected-value grants should not be included just because they matched. |
| Public Charger Grants (SOURCE_DSIRE:dsire_program_id:22783) | 2 | no_calculable_value: 2 | grant_expected_value | reimbursement | portland-food-coop-maine | Keep suppressed unless a conditional award and probability model become source-backed. Competitive expected-value grants should not be included just because they matched. |

## Interpretation

- This report groups repeated test-case evaluations into unique opportunity/package targets. Counts here should drive repair batching, not the raw repeated evaluation count.
- `archive_or_exclude_source_inaccessible` targets do not need another GPT Pro pass under the current product policy unless a new official source appears.
- Buckets marked as needing GPT Pro/source repair are the only candidates for targeted GPT Pro repair prompts. Expected-value grants, tax workflows, quote workflows, and tariff/rate workflows are intentionally not treated as GPT Pro blockers here.
- `needs_formula_or_input_resolution_audit` should be checked in code/data first because the package is monetary but computed no amount.
- Custom quote, tariff/rate, process-value, and non-cash buckets should stay suppressed until the corresponding product workflow exists.
