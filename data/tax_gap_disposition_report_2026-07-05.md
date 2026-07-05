# Tax Gap Disposition Report

Generated at: 2026-07-05T01:25:17.763Z
Source artifact: `data/tax_structured_model_records_2026-07-04.json`

## Counts

- Total skipped records reviewed: 54
- Suppressed/archive records: 29
- Input-gated records: 2
- GPT Pro repair targets: 23
- Unsupported triage guardrails kept: 16
- GPT Pro prompt batches: 6

## GPT Pro Repair Targets

- vernon_ca_partial_local_tax_sources_skip_until_code_verified_v1 (medium, local_business_license_or_receipts_tax): Verify City of Vernon official code or fee schedule formulas for business license, special parcel, warehouse, hazardous-waste, or related local taxes.
- sales_use_tax_ambiguous_rule_1 (medium, tax_abatement_or_pilot): Determine whether Alabama has any current general retrofit sales/use exemption, or only project-specific Chapter 9B abatement workflows.
- sales_use_tax_ambiguous_rule_4 (high, sales_use_tax_exemption): Find current official Iowa authority for any retrofit, renewable, geothermal, manufacturing, or energy-efficiency sales/use tax exemption.
- sales_use_tax_ambiguous_rule_5 (high, tax_abatement_or_pilot): Repair Nevada partial sales/use and property-tax abatement program into source-backed project-specific workflow rules.
- sales_use_tax_ambiguous_rule_8 (medium, gross_receipts_or_bo_rate_preference): Determine whether New Mexico has source-backed gross receipts or compensating tax treatment for clean-energy or retrofit equipment.
- az_renewable_energy_production_tax_credit_skip_v1 (medium, state_income_or_franchise_tax_credit): Verify Arizona renewable energy production tax credit current status, legacy eligibility, formulas, caps, certificates, and carryforward.
- co_heat_pump_systems_registered_contractor_credit_skip_v1 (high, state_income_or_franchise_tax_credit): Capture current Colorado DR 1322 heat pump systems registered contractor credit formulas by technology and tax year.
- co_electric_bicycle_retailer_credit_skip_v1 (medium, state_income_or_franchise_tax_credit): Capture current Colorado electric bicycle retailer credit formula, eligible sale rules, assignment or advance-payment mechanics, caps, and forms.
- ct_green_buildings_credit_skip_v1 (high, state_income_or_franchise_tax_credit): Repair Connecticut green buildings credit formula, certification gates, tax-year availability, carryforward, caps, and current form status.
- mt_energy_production_development_abatement_skip_2026_v1 (medium, tax_abatement_or_pilot): Verify Montana energy production/development property-tax abatement status, eligible facilities, local approval rules, and formula.
- ct_uniform_solar_capacity_tax_pa26_refresh_watch_2026_v1 (medium, property_tax_special_valuation): Refresh Connecticut uniform solar capacity tax against 2026 Public Act text and assessor implementation guidance.
- local_option_followup_1 (high, property_tax_credit): Verify Baltimore County high-performance building and high-performance home tax credit code, caps, rating definitions, forms, and active status.
- local_option_followup_2 (high, property_tax_credit): Verify Prince George's County high-performance building and green business real/personal property tax credit formulas, duration, caps, and forms.
- local_option_followup_3 (medium, property_tax_credit): Repair Anne Arundel County solar, geothermal, and high-performance building tax credit calculations with SDAT building/land allocation and stacking rules.
- local_option_followup_4 (high, property_tax_exemption): Build New York RPTL 487 opt-out/PILOT workflow using official Tax Department opt-out list and local taxing-jurisdiction requirements.
- local_option_followup_5 (medium, property_tax_exemption): Verify Virginia solar exemption ordinances beyond Fairfax, Arlington, Loudoun, and Prince William, prioritizing Alexandria, Fairfax City, Richmond, and Virginia Beach.
- local_option_followup_6 (medium, tax_abatement_or_pilot): Verify Ohio CRA municipalities and counties with sustainability-linked terms, caps, or bonuses, beyond the existing Cincinnati workflow.
- skip_prince_georges_MD_green_business_amount_unverified_v1 (high, property_tax_credit): Resolve the exact Prince George's County Green Business real/personal property tax credit amount, percent, duration, cap, and code authority.
- skip_cincinnati_commercial_CRA_without_executed_agreement_v1 (medium, tax_abatement_or_pilot): Clarify Cincinnati commercial CRA calculation boundaries, standard terms, sustainability bonuses, and which values require executed agreement documents.
- skip_wa_quincy_public_utility_tax_until_official_rate_table_accessible (medium, local_business_license_or_receipts_tax): Verify Quincy, Washington public utility business tax rates from official code section 3.28.040 or official fee schedule.
- skip_unverified_ca_city_business_license_rates (medium, local_business_license_or_receipts_tax): Research official business license/gross receipts tax formulas for Burbank, Pasadena, Anaheim, Los Angeles, San Diego, Vernon, and San Francisco.
- skip_mi_rerz_customer_facing_savings_without_approved_zone_docs (medium, tax_abatement_or_pilot): Repair Michigan Renewable Energy Renaissance Zone tax benefit model, including tax lines affected, phaseout, boundary/project approval, and required documents.
- skip_oh_cat_current_exclusion_amount_without_current_return_confirmation (medium, gross_receipts_or_bo_rate_preference): Verify current Ohio Commercial Activity Tax rate, exclusion, filing threshold, tax-year mechanics, and official return/instruction source.

## Suppressed Or Archived

- dsire_discovery_only_not_runtime_authority_v1: NON_AUTHORITATIVE_SOURCE_ONLY
- commercial_sales_tax_rate_calculators_skip_v1: NON_AUTHORITATIVE_SOURCE_ONLY
- tax_foundation_law_firm_accounting_firm_summaries_skip_v1: NON_AUTHORITATIVE_SOURCE_ONLY
- third_party_parcel_aggregators_skip_v1: NON_AUTHORITATIVE_SOURCE_ONLY
- unverified_local_abatement_press_releases_skip_v1: PROGRAM_DOCUMENTS_REQUIRED
- sales_use_tax_ambiguous_rule_2: WRONG_TAX_MODEL_OR_NO_GENERAL_RULE
- sales_use_tax_ambiguous_rule_3: INACTIVE_EXPIRED_REPEALED_OR_LEGALLY_INVALID
- sales_use_tax_ambiguous_rule_6: UNSUPPORTED_OR_UNSAFE_FOR_CUSTOMER_FACING_TAX_ESTIMATE
- sales_use_tax_ambiguous_rule_7: UNSUPPORTED_OR_UNSAFE_FOR_CUSTOMER_FACING_TAX_ESTIMATE
- sales_use_tax_ambiguous_rule_9: WRONG_TAX_MODEL_OR_NO_GENERAL_RULE
- sales_use_tax_ambiguous_rule_10: WRONG_TAX_MODEL_OR_NO_GENERAL_RULE
- az_renewable_energy_self_consumption_manufacturer_ioc_credit_skip_v1: UNSUPPORTED_OR_UNSAFE_FOR_CUSTOMER_FACING_TAX_ESTIMATE
- co_enterprise_zone_renewable_energy_investment_refund_skip_v1: UNSUPPORTED_OR_UNSAFE_FOR_CUSTOMER_FACING_TAX_ESTIMATE
- ia_geothermal_heat_pump_tax_credit_skip_v1: UNSUPPORTED_OR_UNSAFE_FOR_CUSTOMER_FACING_TAX_ESTIMATE
- ia_solar_energy_system_tax_credit_skip_v1: UNSUPPORTED_OR_UNSAFE_FOR_CUSTOMER_FACING_TAX_ESTIMATE
- sc_solar_energy_property_credit_tc58_skip_v1: INACTIVE_EXPIRED_REPEALED_OR_LEGALLY_INVALID
- sc_energy_efficient_manufactured_home_credit_skip_v1: INACTIVE_EXPIRED_REPEALED_OR_LEGALLY_INVALID
- md_energy_storage_income_tax_credit_skip_v1: INACTIVE_EXPIRED_REPEALED_OR_LEGALLY_INVALID
- in_renewable_property_tax_deductions_skip_v1: PROGRAM_DOCUMENTS_REQUIRED
- mt_energy_conservation_installation_credit_skip_v1: INACTIVE_EXPIRED_REPEALED_OR_LEGALLY_INVALID
- in_eliminated_solar_wind_hydro_geothermal_deductions_skip_2026_v1: INACTIVE_EXPIRED_REPEALED_OR_LEGALLY_INVALID
- mo_solar_energy_system_exemption_skip_2026_v1: INACTIVE_EXPIRED_REPEALED_OR_LEGALLY_INVALID
- skip_generic_MD_9_203_or_9_242_without_local_code_v1: LOCAL_ADOPTION_NOT_VERIFIED
- skip_generic_VA_58_1_3661_without_local_ordinance_v1: LOCAL_ADOPTION_NOT_VERIFIED
- skip_generic_NY_RPTL_487_without_optout_PILOT_assessor_check_v1: UNSUPPORTED_OR_UNSAFE_FOR_CUSTOMER_FACING_TAX_ESTIMATE
- skip_montgomery_county_MD_solar_geothermal_new_applications_v1: INACTIVE_EXPIRED_REPEALED_OR_LEGALLY_INVALID
- skip_WA_city_BO_examples_for_clean_energy_local_option_family_v1: UNSUPPORTED_OR_UNSAFE_FOR_CUSTOMER_FACING_TAX_ESTIMATE
- skip_DSIRE_only_local_rows_without_official_adoption_v1: NON_AUTHORITATIVE_SOURCE_ONLY
- skip_generic_state_tax_credits_without_current_program_formula: PROGRAM_DOCUMENTS_REQUIRED

## Input-Gated, Not Source-Repair Targets

- skip_activity_specific_local_taxes_without_tax_profile: needs_tax_profile
- skip_local_business_tax_customer_facing_totals_without_tax_return_inputs: needs_tax_return

## Prompt Files

- prompt_001_tax_gap_repair.md -> output_001_tax_gap_repair.md: vernon_ca_partial_local_tax_sources_skip_until_code_verified_v1, sales_use_tax_ambiguous_rule_1, sales_use_tax_ambiguous_rule_4, sales_use_tax_ambiguous_rule_5
- prompt_002_tax_gap_repair.md -> output_002_tax_gap_repair.md: sales_use_tax_ambiguous_rule_8, az_renewable_energy_production_tax_credit_skip_v1, co_heat_pump_systems_registered_contractor_credit_skip_v1, co_electric_bicycle_retailer_credit_skip_v1
- prompt_003_tax_gap_repair.md -> output_003_tax_gap_repair.md: ct_green_buildings_credit_skip_v1, mt_energy_production_development_abatement_skip_2026_v1, ct_uniform_solar_capacity_tax_pa26_refresh_watch_2026_v1, local_option_followup_1
- prompt_004_tax_gap_repair.md -> output_004_tax_gap_repair.md: local_option_followup_2, local_option_followup_3, local_option_followup_4, local_option_followup_5
- prompt_005_tax_gap_repair.md -> output_005_tax_gap_repair.md: local_option_followup_6, skip_prince_georges_MD_green_business_amount_unverified_v1, skip_cincinnati_commercial_CRA_without_executed_agreement_v1, skip_wa_quincy_public_utility_tax_until_official_rate_table_accessible
- prompt_006_tax_gap_repair.md -> output_006_tax_gap_repair.md: skip_unverified_ca_city_business_license_rates, skip_mi_rerz_customer_facing_savings_without_approved_zone_docs, skip_oh_cat_current_exclusion_amount_without_current_return_confirmation
