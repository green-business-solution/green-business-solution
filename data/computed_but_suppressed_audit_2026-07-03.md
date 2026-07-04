# Computed-But-Suppressed Package Audit

Generated: 2026-07-04T00:41:31.373Z

## Summary

- Computed-but-suppressed package evaluations: 284
- Positive suppressed effect evaluations: 307
- Unique positive package/effect targets: 51
- Ready for default inclusion candidates: 44
- Targets needing GPT Pro/source repair: 4

## Recommendation Counts

| Key | Count |
| --- | --- |
| ready_for_default_inclusion | 44 |
| needs_source_repair_or_review | 4 |
| keep_suppressed_grant_ev | 1 |
| needs_product_policy | 1 |
| needs_recurring_savings_policy | 1 |

## Runtime Status Counts

| Key | Count |
| --- | --- |
| not_user_facing_default | 268 |
| human_review_required | 35 |
| low_confidence | 4 |

## Effect Type Counts

| Key | Count |
| --- | --- |
| one_time_savings | 48 |
| financing_subsidy | 1 |
| grant_expected_value | 1 |
| recurring_savings | 1 |

## Ready For Default Inclusion

| Program | Effect | Cash Class | Method | Evaluations | Amount Range | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Anaheim Public Utilities - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:1615) | one_time_savings / hybrid_rate_plus_cap | rebate | rate_table | 10 | $63,600-$75,000 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| APS - Energy Efficiency Solutions for Business (SOURCE_DSIRE:dsire_program_id:2458) | one_time_savings / rate_table | rebate | rate_table | 4 | $3.00-$36.00 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Azusa Light & Water - EV Charger Rebate (SOURCE_DSIRE:dsire_program_id:22278) | one_time_savings / fixed_amount | rebate | fixed_amount | 20 | $150-$150 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Boulder County - EnergySmart Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4630) | one_time_savings / capped_percent_of_eligible_cost | reimbursement | percent_of_cost | 10 | $2,000-$2,000 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Burbank Water & Power - Energy Solutions Business Rebate Program (SOURCE_DSIRE:dsire_program_id:1630) | one_time_savings / measure_catalog | rebate | measure_catalog | 7 | $1.00-$350 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Duquesne Light Company - Commercial and Industrial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:3873) | one_time_savings / measure_catalog | rebate | measure_catalog | 4 | $7.00-$84.00 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Duquesne Light Company - PEV Bill Credit Program (SOURCE_DSIRE:dsire_program_id:22376) | one_time_savings / fixed_amount | rebate | fixed_amount | 1 | $50.00-$50.00 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Efficiency Maine Commercial and Industrial Prescriptive Program (SOURCE_DSIRE:dsire_program_id:1144) | one_time_savings / measure_catalog | rebate | measure_catalog | 8 | $0.26-$3.12 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Georgia Power - Business EV Charger Plus Rebate Program (SOURCE_DSIRE:dsire_program_id:22309) | one_time_savings / hybrid_rate_plus_cap | rebate | rate_table | 3 | $2,880-$20,700 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| High Country Conservation - Solarize Summit (SOURCE_DSIRE:dsire_program_id:22763) | one_time_savings / capped_percent_of_eligible_cost | rebate | percent_of_cost | 1 | $2,000-$2,000 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Idaho Power - Easy Upgrades for Simple Retrofits Rebate Program (SOURCE_DSIRE:dsire_program_id:2620) | one_time_savings / rate_table | rebate | rate_table | 13 | $50.00-$600 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| MassEVIP Fleets Charging Program (SOURCE_DSIRE:dsire_program_id:22185) | one_time_savings / capped_percent_of_eligible_cost | cash_grant | percent_of_cost | 1 | $5,088-$5,088 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| MassEVIP Multi-Unit Dwelling (MUD) and Educational Campus Charging Program (SOURCE_DSIRE:dsire_program_id:22188) | one_time_savings / capped_percent_of_eligible_cost | reimbursement | percent_of_cost | 2 | $5,088-$5,088 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| MassEVIP Public Access Charging (PAC) Program (SOURCE_DSIRE:dsire_program_id:22187) | one_time_savings / capped_percent_of_eligible_cost | reimbursement | percent_of_cost | 2 | $4,800-$6,784 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| MassEVIP Public Access Charging (PAC) Program (SOURCE_DSIRE:dsire_program_id:22187) | one_time_savings / capped_percent_of_eligible_cost | reimbursement | percent_of_cost | 2 | $6,000-$8,480 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| MassEVIP Workplace and Fleet Charging Program (SOURCE_DSIRE:dsire_program_id:22186) | one_time_savings / capped_percent_of_eligible_cost | cash_grant | percent_of_cost | 3 | $3,600-$12,000 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Minnesota Energy Resources (Gas) - Home Energy Excellence Program for Builders or Homeowners (SOURCE_DSIRE:dsire_program_id:3312) | one_time_savings / measure_catalog | rebate | measure_catalog | 2 | $125-$2,250 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Minnesota Energy Resources (Gas) - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3310) | one_time_savings / measure_catalog | rebate | measure_catalog | 8 | $2.50-$2.50 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| MMPA - Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4740) | one_time_savings / measure_catalog | rebate | measure_catalog | 7 | $25.00-$90.00 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| MOR-EV Trucks Program (SOURCE_DSIRE:dsire_program_id:22191) | one_time_savings / rate_table | rebate | rate_table | 2 | $7,500-$7,500 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| New Construction Incentives (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:new-construction-incentives) | one_time_savings / hybrid_rate_plus_cap | rebate | rate_table | 2 | $82.37-$264 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Northern Lights Inc. - Energy Conservation Rebate Program (SOURCE_DSIRE:dsire_program_id:4198) | one_time_savings / measure_catalog | rebate | measure_catalog | 6 | $30.00-$140 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| NorthWestern Energy (Electric) - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1658) | one_time_savings / measure_catalog | rebate | measure_catalog | 9 | $1.00-$12.00 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Pasadena Water and Power - Commercial Charger Incentive Program (SOURCE_DSIRE:dsire_program_id:22289) | one_time_savings / measure_catalog | rebate | measure_catalog | 2 | $1,500-$4,000 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Pasadena Water and Power - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3260) | one_time_savings / measure_catalog | rebate | measure_catalog | 16 | $1.35-$500 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| PECO - Commercial Charger Rebate Program (SOURCE_DSIRE:dsire_program_id:22456) | one_time_savings / capped_percent_of_eligible_cost | rebate | percent_of_cost | 3 | $3,660-$4,240 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| PNM EV Charger Rebate Program (SOURCE_DSIRE:dsire_program_id:22406) | one_time_savings / measure_catalog | rebate | measure_catalog | 3 | $500-$500 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| PNM EV Charger Rebate Program (SOURCE_DSIRE:dsire_program_id:22406) | one_time_savings / measure_catalog | rebate | measure_catalog | 3 | $5,000-$30,000 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Poudre Valley REA - Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4815) | one_time_savings / measure_catalog | rebate | measure_catalog | 11 | $25.00-$48,000 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| PPL Electric Utilities - Commercial, Industrial and Agricultural Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3853) | one_time_savings / measure_catalog | rebate | measure_catalog | 3 | $15.00-$15.00 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Residential Rental Property Rebate Program (SOURCE_DSIRE:dsire_program_id:2680) | one_time_savings / measure_catalog | rebate | measure_catalog | 8 | $75.00-$2,100 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Salt River Project - Business Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:3256) | one_time_savings / per_unit_award | rebate | per_unit | 10 | $2,500-$30,000 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Salt River Project - Business Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:3256) | one_time_savings / fixed_tier_amount | rebate | fixed_amount | 10 | $20,000-$20,000 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Seattle City Light - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:2208) | one_time_savings / rate_table | rebate | rate_table | 6 | $9.00-$108 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| SMUD - Commercial Electric Vehicle Incentive Program (SOURCE_DSIRE:dsire_program_id:22290) | one_time_savings / rate_table | rebate | rate_table | 3 | $2,500-$2,500 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| SMUD - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1917) | one_time_savings / measure_catalog | rebate | measure_catalog | 4 | $750-$2,800 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| SMUD - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1917) | one_time_savings / hybrid_rate_plus_cap | rebate | rate_table | 4 | $800-$5,860 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:2239) | one_time_savings / measure_catalog | rebate | measure_catalog | 7 | $0.25-$50.00 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Statewide Midstream Water Heating (SOURCE_SDGE_BUSINESS:program_url:statewide_waterheating_com) | one_time_savings / measure_catalog | rebate | measure_catalog | 1 | $88.00-$88.00 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| TVA - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22125) | one_time_savings / measure_catalog | rebate | measure_catalog | 9 | $8.00-$96.00 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| TVA - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22126) | one_time_savings / measure_catalog | rebate | measure_catalog | 18 | $8.00-$96.00 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| TVA - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22127) | one_time_savings / measure_catalog | rebate | measure_catalog | 9 | $50.00-$4,000 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Xcel Energy (Electric and Gas) - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4813) | one_time_savings / measure_catalog | rebate | measure_catalog | 4 | $400-$400 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |
| Xcel Energy (Electric and Gas) - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4813) | one_time_savings / measure_catalog | rebate | measure_catalog | 4 | $500-$500 | Candidate to set included_in_user_facing_total_default=true for this effect. Amount is already computed and suppression appears to be only the conservative default flag. |

## Needs Source Repair Or Review

| Program | Effect | Cash Class | Method | Evaluations | Amount Range | Action |
| --- | --- | --- | --- | --- | --- | --- |
| East Central Energy - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2258) | one_time_savings / measure_catalog | rebate | measure_catalog | 8 | $25.00-$500 | Do not include yet. Use GPT Pro or source review to resolve the human-review or confidence reason, then reconsider default inclusion. |
| Grand Marais PUC - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2539) | one_time_savings / measure_catalog | rebate | measure_catalog | 10 | $150-$500 | Do not include yet. Use GPT Pro or source review to resolve the human-review or confidence reason, then reconsider default inclusion. |
| Princeton PUC - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2555) | one_time_savings / measure_catalog | rebate | measure_catalog | 10 | $150-$500 | Do not include yet. Use GPT Pro or source review to resolve the human-review or confidence reason, then reconsider default inclusion. |
| Xcel Energy - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:1581) | one_time_savings / measure_catalog | rebate | measure_catalog | 7 | $600-$600 | Do not include yet. Use GPT Pro or source review to resolve the human-review or confidence reason, then reconsider default inclusion. |

## Policy / Intentional Suppression

| Program | Effect | Cash Class | Method | Evaluations | Amount Range | Action |
| --- | --- | --- | --- | --- | --- | --- |
| Electric Vehicle Fleet Fee Exemption (SOURCE_DSIRE:dsire_program_id:22174) | recurring_savings / fixed_amount | tariff_or_rate | fixed_amount | 1 | $20.00-$20.00 | Do not include in upfront totals. Route to recurring savings display after tariff/rate treatment is finalized. |
| Energy Efficiency Grant Program for Nonprofit Organizations (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:energy-efficiency-grant-program-for-nonprofit-organizations) | grant_expected_value / capped_percent_of_eligible_cost | cash_grant | percent_of_cost | 4 | $25,000-$25,000 | Keep suppressed. This is a competitive/expected-value grant path and should not be promoted without source-backed probability plus conditional award evidence. |
| Power Your Drive for Fleets (SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_15131) | financing_subsidy / capped_percent_of_eligible_cost | process_value | percent_of_cost | 2 | $6,784-$16,000 | Do not include in upfront grant/rebate totals until the product decides how to value financing/process benefits. |

## Interpretation

- Most computed-but-suppressed rows are repeated evaluations of deterministic rebate/reimbursement package effects that computed a positive amount but still have `included_in_user_facing_total_default=false`.
- `ready_for_default_inclusion` means the audit found no human-review, low-confidence, expected-value, financing, or recurring/tariff blocker. It does not mean user inputs are perfect; many test-case amounts still use synthetic defaults that the real UI must collect or let the user override.
- `needs_source_repair_or_review` is the only bucket that should go to GPT Pro next. Those targets have explicit human-review flags or confidence blockers.
- `needs_product_policy`, `needs_recurring_savings_policy`, and `keep_suppressed_grant_ev` should stay out of upfront totals until the relevant product/calculation path is intentionally designed.
