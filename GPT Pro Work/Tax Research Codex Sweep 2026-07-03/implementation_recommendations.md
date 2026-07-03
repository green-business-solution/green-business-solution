# Implementation Recommendations

## Data Model

Create a runtime tax input resolver that separates four fact classes:

1. Address/geography facts: state, county, place, local unit candidate, coordinates, FIPS/GEOID, geocoder benchmark/vintage.
2. Source constants: statutory rates, expiration dates, required-reporting flags, known formulas.
3. User/accountant/project facts: tax classification, taxable base, deductions, compliance status, project documents.
4. Document/assessor facts: tax bill lines, APN/parcel, assessment, abatement approval, interconnection documents.

Do not store synthetic fixture values in the same confidence tier as confirmed user, accountant, assessor, or official-source data.

## Package-Specific Runtime Rules

### Washington Solar Manufacturer B&O

Implement first. It has the cleanest source-backed formula:

```text
gross_benefit_cents = max(0, qualifying_tax_base_after_deductions_and_matc_cents * (otherwise_applicable_b_and_o_rate_decimal - 0.00275))
```

Block calculation unless the taxpayer is in Washington, the period is before July 1, 2032, and all required taxpayer/accountant inputs are present. Keep out of ordinary retrofit totals.

### Rhode Island Renewable Property Tax Valuation

Implement as a property-tax workflow, not a cash benefit:

```text
annual_statutory_tax_cents = (tangible_property_applicable ? ac_kw_capacity * 500 : 0) + (real_property_applicable ? ac_kw_capacity * 350 : 0)
```

Only display savings if `counterfactual_ordinary_annual_property_tax_cents` and assessor/local treatment are confirmed. Otherwise show statutory treatment with `needs_property_tax_profile`.

### Michigan Renewable Energy Renaissance Zones

Implement as a suppressed special workflow until approved documents are present:

```text
gross_benefit_cents = (eligible_state_education_tax_cents + eligible_real_property_tax_cents + eligible_personal_property_tax_cents + eligible_local_income_tax_cents) * phaseout_multiplier
```

Require `phaseout_multiplier` to mean benefit-share multiplier: 1.00 during the full exemption period, 0.75 two years before final year, 0.50 one year before final year, 0.25 in final year, and 0 after expiration/revocation. Do not use ESA acquisition-cost multipliers as benefit multipliers.

## Resolver Defaults

- If address geocoding fails or is ambiguous, block locality-sensitive tax calculations.
- If the tax package needs parcel/APN/assessor facts, block until a tax document or assessor source is present.
- If taxpayer classification or tax base is missing, block monetary tax estimate and show required input list.
- If only synthetic values are present, allow test-mode calculation only and mark output synthetic/placeholder.
- If official source is stale or effective date is missing, suppress current calculation.

## Synthetic Fixture Assessment

Current synthetic test values are useful for routing and UI/state tests, but they are not enough for production-style test-case calculations:

- Washington fixture fields do not fully match the repaired package keys and do not include accountant-confirmed B&O base/MATC/reporting status.
- Rhode Island has no complete sample profile with RI assessor-confirmed treatment and counterfactual assessment.
- Michigan fixtures intentionally suppress RERZ estimates when approved zone documentation is missing.

Recommended next fixture work:

- Add one synthetic WA solar manufacturer profile using exact repaired package keys.
- Add one RI renewable system profile with AC kW, municipal status, assessor confirmation, and counterfactual ordinary tax.
- Add one MI RERZ approved-company fixture with explicit synthetic approval docs, eligible tax lines, and phaseout year, clearly marked non-production.
