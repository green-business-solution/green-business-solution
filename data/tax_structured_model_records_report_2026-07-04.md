# Structured Tax Model Records Report

Generated at: 2026-07-05T00:25:32.594Z
Source artifact: `data/tax_comprehensive_model_research_gpt_pro_2026-07-04.json`

## Counts

- Source documents: 760
- Source registry records: 52
- State/DC sales-use tax import plans: 51
- Tax rule records: 151
- Local-option authority records: 5
- Unsupported triage rules: 16
- Skipped/gap records: 54
- Import validation rules: 31

## Tax Rule Records By Type

- sales_use_tax_exemption_taxability_rule: 36
- state_tax_credit_exemption_deduction_rule: 26
- property_tax_statewide_rule: 44
- verified_local_option_tax_rule: 16
- state_business_tax_model: 13
- major_local_business_tax_model: 16

## Runtime Gates

- needs_tax_profile: 16
- needs_filing_confirmation: 67
- needs_tax_return: 36
- unsupported_tax_model: 2
- needs_assessor_confirmation: 29
- needs_program_documentation: 1

## Safety

- All normalized records default to customer-facing value of `$0` unless a later runtime package explicitly validates formula, jurisdiction, source confidence, and required taxpayer inputs.
- This file is appropriate for future importer/runtime mapping work; it is not a nationwide tax-rate database yet.

## Import And Normalization Warnings

- Unknown tax model kind "depends_on_official_source" normalized to unsupported_tax_model.
- Unknown tax model kind "same_as_original_if_reauthorized_or_grandfathered" normalized to unsupported_tax_model.
- Unknown tax model kind "sales_use_tax_rate or sales_use_tax_exemption" normalized to unsupported_tax_model.
- Unknown tax model kind "sales_use_tax_rate or sales_use_tax_exemption" normalized to unsupported_tax_model.
- Unknown tax model kind "state_income_or_franchise_tax_credit or depreciation_or_deduction" normalized to unsupported_tax_model.
- Unknown tax model kind "future_federal_income_tax_credit_or_depreciation_model" normalized to unsupported_tax_model.
- Unknown tax model kind "property_tax_exemption, property_tax_credit, or property_tax_special_valuation" normalized to unsupported_tax_model.
- Unknown tax model kind "property_tax_exemption, property_tax_credit, property_tax_special_valuation, or tax_abatement_or_pilot" normalized to unsupported_tax_model.
- Unknown tax model kind "tax_abatement_or_pilot, property_tax_credit, local_business_license_or_receipts_tax, or future_special_assessment_model" normalized to unsupported_tax_model.
- Unknown tax model kind "depends_on_verified_tax_type_and_formula" normalized to unsupported_tax_model.
- Unknown tax model kind "one_supported_model_per_split_effect" normalized to unsupported_tax_model.
- Unknown tax model kind "depends_on_repair" normalized to unsupported_tax_model.
- state_business_tax_model_wa_10ccc208 has no sourceDocumentIds.
- state_business_tax_model_ca_1f969ac3 has no sourceDocumentIds.
- state_business_tax_model_mi_6c53e600 has no sourceDocumentIds.
- state_business_tax_model_mi_18dd1924 has no sourceDocumentIds.
- state_business_tax_model_ri_633f9a80 has no sourceDocumentIds.
- state_business_tax_model_oh_28ba6b8f has no sourceDocumentIds.
- state_business_tax_model_or_acd89820 has no sourceDocumentIds.
- state_business_tax_model_tx_57d4f100 has no sourceDocumentIds.
- state_business_tax_model_nv_c15a2cf2 has no sourceDocumentIds.
- state_business_tax_model_de_1159115b has no sourceDocumentIds.
- state_business_tax_model_tn_39259c9b has no sourceDocumentIds.
- state_business_tax_model_ky_a704eb90 has no sourceDocumentIds.
- state_business_tax_model_ny_8e5ff4dd has no sourceDocumentIds.
