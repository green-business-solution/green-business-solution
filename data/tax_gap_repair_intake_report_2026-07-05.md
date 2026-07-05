# Tax Gap Repair Intake Report

Generated at: 2026-07-05T02:01:36.746Z
Work dir: `GPT Pro Work/tax-skipped-gap-repair-2026-07-05`
Disposition artifact: `data/tax_gap_disposition_2026-07-05.json`

## Counts

- Outputs parsed: 6
- Repairs imported: 23
- Promoted tax rule candidates: 19
- Suppressed/archive decisions: 1
- Input-gated decisions: 2
- Routed decisions: 1
- Source documents: 144

## Dispositions

- keep_input_gate: 2
- promote_to_tax_rule: 19
- route_to_existing_non_tax_or_tax_model: 1
- suppress_archive: 1

## Promoted Rule Candidates By Model

- gross_receipts_or_bo_rate_preference: 2
- local_business_license_or_receipts_tax: 2
- property_tax_credit: 4
- property_tax_exemption: 2
- property_tax_special_valuation: 1
- sales_use_tax_exemption: 1
- state_income_or_franchise_tax_credit: 3
- tax_abatement_or_pilot: 4

## Promoted Rule Candidates By Runtime Gate

- needs_assessor_confirmation: 3
- needs_filing_confirmation: 4
- needs_program_documentation: 5
- needs_tax_bill: 3
- needs_tax_profile: 3
- needs_tax_return: 1

## Promoted Tax Rule Candidates

- vernon_ca_partial_local_tax_sources_skip_until_code_verified_v1: local_business_license_or_receipts_tax, needs_tax_profile, high
- sales_use_tax_ambiguous_rule_1: tax_abatement_or_pilot, needs_program_documentation, high
- sales_use_tax_ambiguous_rule_4: sales_use_tax_exemption, needs_tax_profile, high
- sales_use_tax_ambiguous_rule_5: tax_abatement_or_pilot, needs_program_documentation, high
- sales_use_tax_ambiguous_rule_8: gross_receipts_or_bo_rate_preference, needs_filing_confirmation, high
- az_renewable_energy_production_tax_credit_skip_v1: state_income_or_franchise_tax_credit, needs_filing_confirmation, high
- co_heat_pump_systems_registered_contractor_credit_skip_v1: state_income_or_franchise_tax_credit, needs_filing_confirmation, high
- ct_green_buildings_credit_skip_v1: state_income_or_franchise_tax_credit, needs_program_documentation, high
- mt_energy_production_development_abatement_skip_2026_v1: tax_abatement_or_pilot, needs_program_documentation, high
- ct_uniform_solar_capacity_tax_pa26_refresh_watch_2026_v1: property_tax_special_valuation, needs_assessor_confirmation, high
- local_option_followup_1: property_tax_credit, needs_tax_bill, high
- local_option_followup_2: property_tax_credit, needs_tax_bill, high
- local_option_followup_3: property_tax_credit, needs_tax_bill, high
- local_option_followup_4: property_tax_exemption, needs_assessor_confirmation, high
- local_option_followup_5: property_tax_exemption, needs_assessor_confirmation, high
- skip_prince_georges_MD_green_business_amount_unverified_v1: property_tax_credit, needs_filing_confirmation, high
- skip_unverified_ca_city_business_license_rates: local_business_license_or_receipts_tax, needs_tax_profile, high
- skip_mi_rerz_customer_facing_savings_without_approved_zone_docs: tax_abatement_or_pilot, needs_program_documentation, high
- skip_oh_cat_current_exclusion_amount_without_current_return_confirmation: gross_receipts_or_bo_rate_preference, needs_tax_return, high

## Non-Promoted Decisions

- suppress skip_wa_quincy_public_utility_tax_until_official_rate_table_accessible: source_unavailable
- input gate local_option_followup_6: needs_program_documentation
- input gate skip_cincinnati_commercial_CRA_without_executed_agreement_v1: needs_program_documentation
- routed co_electric_bicycle_retailer_credit_skip_v1: unsupported_tax_model

## Validation

- Errors: 0
- Warnings: 0
- None
