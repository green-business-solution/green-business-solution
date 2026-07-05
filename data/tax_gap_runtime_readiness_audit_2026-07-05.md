# Tax Gap Runtime Readiness Audit

Generated at: 2026-07-05T02:30:34.414Z

## Summary

- Promoted tax candidates audited: 19
- Candidates with any matching test profile: 11
- Candidates with complete matched test inputs: 0
- Ready for direct customer-facing calculation now: 0
- Matched test profiles: 23

## Next Actions

| Bucket | Count |
| --- | --- |
| add_test_profile_tax_inputs_or_keep_gate | 4 |
| compile_candidate_into_structured_runtime_rows | 4 |
| create_or_update_test_profile_for_jurisdiction | 8 |
| needs_sales_use_exemption_importer | 1 |
| needs_tax_credit_runtime_model | 2 |

## Runtime Support

| Bucket | Count |
| --- | --- |
| needs_sales_use_exemption_importer | 1 |
| needs_tax_credit_runtime_model | 3 |
| partially_supported_after_business_tax_import | 2 |
| supported_after_local_workflow_import | 2 |
| supported_as_gated_workflow_after_import | 11 |

## Formula Support

| Bucket | Count |
| --- | --- |
| source_backed_credit_needs_tax_return_runtime_model | 3 |
| source_backed_exemption_needs_taxability_importer | 1 |
| source_backed_formula_needs_compiler_mapping | 1 |
| source_backed_formula_needs_structured_model_rows | 3 |
| source_backed_program_document_workflow | 4 |
| source_backed_property_tax_formula_needs_bill_or_assessor_adapter | 7 |

## Candidate Readiness

| Candidate | Model | Jurisdiction | Runtime Gate | Test Profiles | Full Inputs | Next Action |
| --- | --- | --- | --- | --- | --- | --- |
| vernon_ca_partial_local_tax_sources_skip_until_code_verified_v1 | local_business_license_or_receipts_tax | City of Vernon, California | needs_tax_profile | 1 | 0 | compile_candidate_into_structured_runtime_rows |
| sales_use_tax_ambiguous_rule_1 | tax_abatement_or_pilot | AL | needs_program_documentation | 0 | 0 | create_or_update_test_profile_for_jurisdiction |
| sales_use_tax_ambiguous_rule_4 | sales_use_tax_exemption | IA | needs_tax_profile | 1 | 0 | needs_sales_use_exemption_importer |
| sales_use_tax_ambiguous_rule_5 | tax_abatement_or_pilot | NV | needs_program_documentation | 0 | 0 | create_or_update_test_profile_for_jurisdiction |
| sales_use_tax_ambiguous_rule_8 | gross_receipts_or_bo_rate_preference | NM | needs_filing_confirmation | 1 | 0 | compile_candidate_into_structured_runtime_rows |
| az_renewable_energy_production_tax_credit_skip_v1 | state_income_or_franchise_tax_credit | AZ | needs_filing_confirmation | 2 | 0 | needs_tax_credit_runtime_model |
| co_heat_pump_systems_registered_contractor_credit_skip_v1 | state_income_or_franchise_tax_credit | CO | needs_filing_confirmation | 2 | 0 | needs_tax_credit_runtime_model |
| ct_green_buildings_credit_skip_v1 | state_income_or_franchise_tax_credit | CT | needs_program_documentation | 0 | 0 | create_or_update_test_profile_for_jurisdiction |
| mt_energy_production_development_abatement_skip_2026_v1 | tax_abatement_or_pilot | MT | needs_program_documentation | 1 | 0 | add_test_profile_tax_inputs_or_keep_gate |
| ct_uniform_solar_capacity_tax_pa26_refresh_watch_2026_v1 | property_tax_special_valuation | CT | needs_assessor_confirmation | 0 | 0 | create_or_update_test_profile_for_jurisdiction |
| local_option_followup_1 | property_tax_credit | Baltimore County, MD | needs_tax_bill | 0 | 0 | create_or_update_test_profile_for_jurisdiction |
| local_option_followup_2 | property_tax_credit | Prince George's County, MD | needs_tax_bill | 0 | 0 | create_or_update_test_profile_for_jurisdiction |
| local_option_followup_3 | property_tax_credit | Anne Arundel County, MD | needs_tax_bill | 0 | 0 | create_or_update_test_profile_for_jurisdiction |
| local_option_followup_4 | property_tax_exemption | New York State municipalities and school districts under RPTL §487 | needs_assessor_confirmation | 1 | 0 | add_test_profile_tax_inputs_or_keep_gate |
| local_option_followup_5 | property_tax_exemption | Virginia localities beyond Fairfax, Arlington, Loudoun, and Prince William | needs_assessor_confirmation | 1 | 0 | add_test_profile_tax_inputs_or_keep_gate |
| skip_prince_georges_MD_green_business_amount_unverified_v1 | property_tax_credit | Prince George's County, MD | needs_filing_confirmation | 0 | 0 | create_or_update_test_profile_for_jurisdiction |
| skip_unverified_ca_city_business_license_rates | local_business_license_or_receipts_tax | CA | needs_tax_profile | 10 | 0 | compile_candidate_into_structured_runtime_rows |
| skip_mi_rerz_customer_facing_savings_without_approved_zone_docs | tax_abatement_or_pilot | MI | needs_program_documentation | 3 | 0 | add_test_profile_tax_inputs_or_keep_gate |
| skip_oh_cat_current_exclusion_amount_without_current_return_confirmation | gross_receipts_or_bo_rate_preference | OH | needs_tax_return | 1 | 0 | compile_candidate_into_structured_runtime_rows |

## Test Profile Coverage

| Sample User | Matched Candidates | Fully Satisfied Candidates |
| --- | --- | --- |
| melissas-vernon-distribution | 2 | 0 |
| big-dipper-missoula | 1 | 0 |
| california-endowment-hq | 1 | 0 |
| eastern-market-detroit | 1 | 0 |
| fender-corona-plant | 1 | 0 |
| food-bank-rockies-aurora-dc | 1 | 0 |
| gm-factory-zero-detroit | 1 | 0 |
| ikea-burbank | 1 | 0 |
| intel-ocotillo-chandler | 1 | 0 |
| juniper-and-ivy-san-diego | 1 | 0 |
| la-montanita-nob-hill-albuquerque | 1 | 0 |
| northgate-market-anaheim | 1 | 0 |
| ntua-fort-defiance-headquarters | 1 | 0 |
| one-community-health-midtown | 1 | 0 |
| qts-richmond-data-center | 1 | 0 |
| quaker-oats-cedar-rapids | 1 | 0 |
| santa-clara-university-campus | 1 | 0 |
| seghesio-healdsburg-winery | 1 | 0 |
| tapiz-mariposa-denver-household | 1 | 0 |
| via-verde-bronx-renter-household | 1 | 0 |
| westin-pasadena | 1 | 0 |
| whirlpool-clyde-operations | 1 | 0 |
| zingermans-deli-ann-arbor | 1 | 0 |

## Non-Promoted Decisions

| Kind | ID | Status | Action |
| --- | --- | --- | --- |
| suppression | skip_wa_quincy_public_utility_tax_until_official_rate_table_accessible | source_unavailable | suppressed_or_archived |
| input_gate | local_option_followup_6 | needs_program_documentation | keep_program_document_gate |
| input_gate | skip_cincinnati_commercial_CRA_without_executed_agreement_v1 | needs_program_documentation | keep_program_document_gate |
| routed | co_electric_bicycle_retailer_credit_skip_v1 | unsupported_tax_model | route_outside_retrofit_tax_runtime |

## Interpretation

- The GPT Pro repairs are source-backed enough to keep as tax rule candidates, but none should enter customer-facing totals yet.
- The current runtime cannot execute free-form tax formulas. Candidates must be compiled into structured local workflow rows, tax geography rows, or v2 package effects.
- Matching test profiles exist for most state/local candidates, but no candidate has all required user/tax inputs present under the current canonical input-key audit.
- Missing inputs are expected for program-document, tax-bill, tax-return, filing, assessor, and tax-profile gates; those should be represented as UI/upload requirements rather than guessed server-side.
