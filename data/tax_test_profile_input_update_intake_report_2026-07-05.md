# Tax Test Profile Input Update Intake Report

Generated at: 2026-07-05T03:39:13.537Z

## Summary

- GPT Pro output files parsed: 19
- Profile patches imported: 19
- Existing sample profiles updated: 5
- New sample profiles added: 14
- Existing public test cases updated: 5
- New public tax fixture test cases added: 14
- Tax profile facts imported: 251
- Synthetic tax documents imported: 104

## Expected Runtime Statuses

| Bucket | Count |
| --- | --- |
| calculated | 18 |
| needs_assessor_confirmation | 1 |

## Imported Patches

| Tax Rule Candidate | Sample User | Requested Action | Facts | Documents | Expected Runtime Status |
| --- | --- | --- | --- | --- | --- |
| vernon_ca_partial_local_tax_sources_skip_until_code_verified_v1 | melissas-vernon-distribution | update_existing_profile | 12 | 3 | calculated |
| sales_use_tax_ambiguous_rule_1 | sample_al_ch9b_huntsville_mfg_001 | create_new_profile | 18 | 9 | calculated |
| sales_use_tax_ambiguous_rule_4 | quaker-oats-cedar-rapids | update_existing_profile | 15 | 4 | calculated |
| sales_use_tax_ambiguous_rule_5 | sample_nv_reta_solar_storage_silver_peak_2026 | create_new_profile | 16 | 10 | calculated |
| sales_use_tax_ambiguous_rule_8 | la-montanita-nob-hill-albuquerque | update_existing_profile | 8 | 4 | calculated |
| az_renewable_energy_production_tax_credit_skip_v1 | az-santa-cruz-solar-production-llc | create_new_profile | 13 | 6 | calculated |
| co_heat_pump_systems_registered_contractor_credit_skip_v1 | co-denver-registered-contractor-ashp-townhome | create_new_profile | 18 | 3 | calculated |
| ct_green_buildings_credit_skip_v1 | sample_ct_hartford_gb_carryforward_2025 | create_new_profile | 12 | 6 | calculated |
| mt_energy_production_development_abatement_skip_2026_v1 | yellowstone-renewable-gas-billings | create_new_profile | 12 | 5 | calculated |
| ct_uniform_solar_capacity_tax_pa26_refresh_watch_2026_v1 | sample_ct_solar_capacity_tax_pa26_001 | create_new_profile | 11 | 8 | needs_assessor_confirmation |
| local_option_followup_1 | sample_md_baltimore_county_high_performance_home_001 | create_new_profile | 13 | 4 | calculated |
| local_option_followup_2 | sample_pg_md_green_roof_office_001 | create_new_profile | 11 | 6 | calculated |
| local_option_followup_3 | sample_anne_arundel_md_solar_vet_clinic_001 | create_new_profile | 12 | 5 | calculated |
| local_option_followup_4 | ny-rptl487-albany-small-office-solar-owner | create_new_profile | 11 | 7 | calculated |
| local_option_followup_5 | qts-richmond-data-center | create_new_profile | 14 | 6 | calculated |
| skip_prince_georges_MD_green_business_amount_unverified_v1 | sample_pg_md_green_business_warehouse_001 | create_new_profile | 13 | 5 | calculated |
| skip_unverified_ca_city_business_license_rates | sf-mission-hardware-synthetic | create_new_profile | 13 | 4 | calculated |
| skip_mi_rerz_customer_facing_savings_without_approved_zone_docs | gratiot-bioenergy-rerz | create_new_profile | 14 | 7 | calculated |
| skip_oh_cat_current_exclusion_amount_without_current_return_confirmation | whirlpool-clyde-operations | update_existing_profile | 15 | 2 | calculated |

## Warnings

- output_015_local-option-followup-5.md: requested create_new_profile but qts-richmond-data-center already existed; updated existing profile.

## Validation Notes

- Broken outputs: 0
- Schema errors: 0
- Mismatched outputs: 0
