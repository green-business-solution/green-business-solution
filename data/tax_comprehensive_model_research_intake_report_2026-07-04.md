# Comprehensive Tax Model Research Intake Report

Generated at: 2026-07-05T00:14:38.103Z

## Parsed Outputs

- GPT Pro outputs parsed: 10
- Outputs with trailing citation footnotes: 7
- Preserved trailing citation references: 415
- Validation warnings: 7

## Research Counts

- Source registry additions: 52
- Source import candidates for Codex: 11
- State/DC sales-use tax rate plans: 51
- Sales/use exemption and taxability rules: 36
- State credit/exemption/deduction rules: 26
- Statewide property-tax rules: 44
- Verified local-option rules: 16
- State business-tax model rows: 13
- Major local business-tax model rows: 16
- Exotic tax workflow patterns: 6
- Unsupported fallback triage rules: 16
- Import validation rules: 31

## Runtime Readiness

- Artifact: `data/tax_comprehensive_model_research_gpt_pro_2026-07-04.json`
- Registry seed updated: `data/tax_source_registry_seed.json`
- Registry source artifact count: 5

This research is not live runtime tax data by itself. It gives us source-backed candidates, schemas, and validation rules for the next implementation pass.

Ready for Codex implementation:

- Build tax_source_documents and tax_rule_records tables from the import mapping output.
- Implement state sales/use tax rate source importers starting with official machine-readable sources and SST member files.
- Map supported state credit, sales-tax exemption, property-tax, and local-option rules to model records with required runtime inputs.
- Use unsupported fallback triage rules for future tax opportunities that do not map to a supported model.

Not runtime-ready yet:

- Nationwide local rates are not imported into a queryable table yet.
- Product taxability and exemption certificates remain rule-specific inputs.
- Property-tax benefits still require parcel, bill, assessor, or counterfactual taxable-value inputs.
- Income/franchise/gross-receipts credits still require taxpayer tax-return or tax-liability inputs.

## Follow-Up Queues

- Sources needing further research: 11
- Ambiguous sales/use rules: 10
- State credit skips: 13
- Property-tax skips: 4
- Local followups: 6
- Local skips: 8
- Business-tax skips: 7

## Warnings

- output_001_national_source_registry_gap_fill.md contains 122 trailing citation footnotes after the JSON object; preserved as sourceReferences.
- output_002_sales_use_tax_rates_boundaries.md contains 126 trailing citation footnotes after the JSON object; preserved as sourceReferences.
- output_004_state_tax_credits_exemptions_deductions.md contains 36 trailing citation footnotes after the JSON object; preserved as sourceReferences.
- output_006_county_city_local_option_incentives.md contains 24 trailing citation footnotes after the JSON object; preserved as sourceReferences.
- output_007_business_tax_gross_receipts_bo.md contains 75 trailing citation footnotes after the JSON object; preserved as sourceReferences.
- output_008_abatement_pilot_special_assessment_pace.md contains 20 trailing citation footnotes after the JSON object; preserved as sourceReferences.
- output_009_unsupported_tax_fallback_triage.md contains 12 trailing citation footnotes after the JSON object; preserved as sourceReferences.
