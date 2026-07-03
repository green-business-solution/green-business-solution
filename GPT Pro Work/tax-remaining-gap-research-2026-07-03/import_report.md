# Tax Remaining Gap Import Report

Imported: 2026-07-03T20:31:17.247Z

## Outputs Validated

- output_001_quincy_wa_non_utility_bo.md: resolved_no_tax_found, confidence high; imported no-separate-general-local-B&O finding for Quincy.
- output_002_everett_wa_bo_rates.md: partially_resolved, confidence medium; imported source-backed ordinary Everett B&O class rates and kept utility/special-tier conflicts gated.
- output_003_ri_municipal_renewable_ordinances.md: partially_resolved, confidence medium; imported municipal ordinance routing metadata while preserving assessor/accountant review.
- output_004_mi_detroit_wayne_rerz_project_specific.md: no_project_specific_source_found, confidence high; imported no-project-specific Detroit/Wayne RERZ finding and kept the workflow document-gated.
- output_005_property_tax_adapter_terms.md: partially_resolved, confidence medium; imported production-safe versus tax-bill-gated field terms for eight county adapters.
- output_006_ca_local_business_tax_edge_classes.md: partially_resolved, confidence medium; imported edge-class metadata and refreshed runtime-ready core CA business-tax rows.

## Preserved Gates

- Property-tax adapters still require user tax bill, production-cleared bill-line data, or licensed official source access for final dollar calculations.
- RI renewable property-tax and MI RERZ workflows still require assessor/accountant review before user-facing savings.
- Local business taxes still default to internal-only totals until class and tax-base inputs are supplied.
- Everett utility thresholds, high-receipts special tier, MATC, and complex apportionment remain review-gated.
