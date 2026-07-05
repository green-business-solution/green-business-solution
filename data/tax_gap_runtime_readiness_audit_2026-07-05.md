# Tax Gap Runtime Readiness Audit

Generated at: 2026-07-05T05:48:53.237Z

## Summary

- Promoted tax candidates audited: 19
- Candidates with any matching test profile: 19
- Candidates with complete matched test inputs: 19
- Ready for direct customer-facing calculation now: 7
- Matched test profiles: 37

## Next Actions

| Bucket | Count |
| --- | --- |
| add_tax_return_model_or_keep_gate | 1 |
| import_as_internal_only_gated_rule | 11 |
| ready_customer_facing_after_mandatory_intake | 7 |

## Runtime Support

| Bucket | Count |
| --- | --- |
| compiled_to_gated_local_workflow | 1 |
| compiled_to_local_tax_workflow | 3 |
| generic_runtime_model_supported_gated | 4 |
| program_document_tax_bill_or_assessor_gate | 11 |

## Formula Support

| Bucket | Count |
| --- | --- |
| source_backed_formula_compiled_to_runtime_model | 7 |
| source_backed_formula_needs_structured_model_rows | 1 |
| source_backed_program_document_workflow | 4 |
| source_backed_property_tax_formula_needs_bill_or_assessor_adapter | 7 |

## Candidate Readiness

| Candidate | Model | Jurisdiction | Runtime Support | Runtime Gate | Test Profiles | Full Inputs | Next Action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| vernon_ca_partial_local_tax_sources_skip_until_code_verified_v1 | local_business_license_or_receipts_tax | City of Vernon, California | compiled_to_local_tax_workflow | needs_tax_profile | 1 | 1 | ready_customer_facing_after_mandatory_intake |
| sales_use_tax_ambiguous_rule_1 | tax_abatement_or_pilot | AL | program_document_tax_bill_or_assessor_gate | needs_program_documentation | 1 | 1 | import_as_internal_only_gated_rule |
| sales_use_tax_ambiguous_rule_4 | sales_use_tax_exemption | IA | generic_runtime_model_supported_gated | needs_tax_profile | 1 | 1 | ready_customer_facing_after_mandatory_intake |
| sales_use_tax_ambiguous_rule_5 | tax_abatement_or_pilot | NV | program_document_tax_bill_or_assessor_gate | needs_program_documentation | 1 | 1 | import_as_internal_only_gated_rule |
| sales_use_tax_ambiguous_rule_8 | gross_receipts_or_bo_rate_preference | NM | compiled_to_local_tax_workflow | needs_filing_confirmation | 1 | 1 | ready_customer_facing_after_mandatory_intake |
| az_renewable_energy_production_tax_credit_skip_v1 | state_income_or_franchise_tax_credit | AZ | generic_runtime_model_supported_gated | needs_filing_confirmation | 3 | 1 | ready_customer_facing_after_mandatory_intake |
| co_heat_pump_systems_registered_contractor_credit_skip_v1 | state_income_or_franchise_tax_credit | CO | generic_runtime_model_supported_gated | needs_filing_confirmation | 3 | 1 | ready_customer_facing_after_mandatory_intake |
| ct_green_buildings_credit_skip_v1 | state_income_or_franchise_tax_credit | CT | generic_runtime_model_supported_gated | needs_program_documentation | 2 | 1 | ready_customer_facing_after_mandatory_intake |
| mt_energy_production_development_abatement_skip_2026_v1 | tax_abatement_or_pilot | MT | program_document_tax_bill_or_assessor_gate | needs_program_documentation | 2 | 1 | import_as_internal_only_gated_rule |
| ct_uniform_solar_capacity_tax_pa26_refresh_watch_2026_v1 | property_tax_special_valuation | CT | program_document_tax_bill_or_assessor_gate | needs_assessor_confirmation | 2 | 1 | import_as_internal_only_gated_rule |
| local_option_followup_1 | property_tax_credit | Baltimore County, MD | program_document_tax_bill_or_assessor_gate | needs_tax_bill | 1 | 1 | import_as_internal_only_gated_rule |
| local_option_followup_2 | property_tax_credit | Prince George's County, MD | program_document_tax_bill_or_assessor_gate | needs_tax_bill | 2 | 1 | import_as_internal_only_gated_rule |
| local_option_followup_3 | property_tax_credit | Anne Arundel County, MD | program_document_tax_bill_or_assessor_gate | needs_tax_bill | 1 | 1 | import_as_internal_only_gated_rule |
| local_option_followup_4 | property_tax_exemption | New York State municipalities and school districts under RPTL §487 | program_document_tax_bill_or_assessor_gate | needs_assessor_confirmation | 2 | 1 | import_as_internal_only_gated_rule |
| local_option_followup_5 | property_tax_exemption | Virginia localities beyond Fairfax, Arlington, Loudoun, and Prince William | program_document_tax_bill_or_assessor_gate | needs_assessor_confirmation | 1 | 1 | import_as_internal_only_gated_rule |
| skip_prince_georges_MD_green_business_amount_unverified_v1 | property_tax_credit | Prince George's County, MD | program_document_tax_bill_or_assessor_gate | needs_filing_confirmation | 2 | 1 | import_as_internal_only_gated_rule |
| skip_unverified_ca_city_business_license_rates | local_business_license_or_receipts_tax | CA | compiled_to_gated_local_workflow | needs_tax_profile | 11 | 1 | add_tax_return_model_or_keep_gate |
| skip_mi_rerz_customer_facing_savings_without_approved_zone_docs | tax_abatement_or_pilot | MI | program_document_tax_bill_or_assessor_gate | needs_program_documentation | 4 | 1 | import_as_internal_only_gated_rule |
| skip_oh_cat_current_exclusion_amount_without_current_return_confirmation | gross_receipts_or_bo_rate_preference | OH | compiled_to_local_tax_workflow | needs_tax_return | 1 | 1 | ready_customer_facing_after_mandatory_intake |

## Test Profile Coverage

| Sample User | Matched Candidates | Fully Satisfied Candidates |
| --- | --- | --- |
| melissas-vernon-distribution | 2 | 1 |
| sample_ct_hartford_gb_carryforward_2025 | 2 | 1 |
| sample_ct_solar_capacity_tax_pa26_001 | 2 | 1 |
| sample_pg_md_green_business_warehouse_001 | 2 | 1 |
| sample_pg_md_green_roof_office_001 | 2 | 1 |
| az-santa-cruz-solar-production-llc | 1 | 1 |
| big-dipper-missoula | 1 | 0 |
| california-endowment-hq | 1 | 0 |
| co-denver-registered-contractor-ashp-townhome | 1 | 1 |
| eastern-market-detroit | 1 | 0 |
| fender-corona-plant | 1 | 0 |
| food-bank-rockies-aurora-dc | 1 | 0 |
| gm-factory-zero-detroit | 1 | 0 |
| gratiot-bioenergy-rerz | 1 | 1 |
| ikea-burbank | 1 | 0 |
| intel-ocotillo-chandler | 1 | 0 |
| juniper-and-ivy-san-diego | 1 | 0 |
| la-montanita-nob-hill-albuquerque | 1 | 1 |
| northgate-market-anaheim | 1 | 0 |
| ntua-fort-defiance-headquarters | 1 | 0 |
| ny-rptl487-albany-small-office-solar-owner | 1 | 1 |
| one-community-health-midtown | 1 | 0 |
| qts-richmond-data-center | 1 | 1 |
| quaker-oats-cedar-rapids | 1 | 1 |
| sample_al_ch9b_huntsville_mfg_001 | 1 | 1 |
| sample_anne_arundel_md_solar_vet_clinic_001 | 1 | 1 |
| sample_md_baltimore_county_high_performance_home_001 | 1 | 1 |
| sample_nv_reta_solar_storage_silver_peak_2026 | 1 | 1 |
| santa-clara-university-campus | 1 | 0 |
| seghesio-healdsburg-winery | 1 | 0 |
| sf-mission-hardware-synthetic | 1 | 1 |
| tapiz-mariposa-denver-household | 1 | 0 |
| via-verde-bronx-renter-household | 1 | 0 |
| westin-pasadena | 1 | 0 |
| whirlpool-clyde-operations | 1 | 1 |
| yellowstone-renewable-gas-billings | 1 | 1 |
| zingermans-deli-ann-arbor | 1 | 0 |

## Non-Promoted Decisions

| Kind | ID | Status | Action |
| --- | --- | --- | --- |
| suppression | skip_wa_quincy_public_utility_tax_until_official_rate_table_accessible | source_unavailable | suppressed_or_archived |
| input_gate | local_option_followup_6 | needs_program_documentation | keep_program_document_gate |
| input_gate | skip_cincinnati_commercial_CRA_without_executed_agreement_v1 | needs_program_documentation | keep_program_document_gate |
| routed | co_electric_bicycle_retailer_credit_skip_v1 | unsupported_tax_model | route_outside_retrofit_tax_runtime |

## Interpretation

- The GPT Pro repairs are source-backed enough to keep as tax rule candidates.
- Compiled runtime support now exists for selected local workflow, sales/use exemption, and state-credit candidates; free-form GPT Pro formula text still is not executed directly.
- 19 candidate(s) now have at least one matching test profile with all audited runtime inputs present. Candidates with executable structured models are ready for customer-facing calculation after mandatory intake.
- Missing program-document, tax-bill, tax-return, filing, assessor, and tax-profile inputs are mandatory pre-opportunity intake requirements; they should block opportunity display until answered or uploaded.
