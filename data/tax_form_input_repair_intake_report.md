# Tax/Form Input GPT Pro Intake Report

Generated: 2026-07-02T22:43:02.012Z

## Output Validation

- Output files parsed: 3
- Tax repairs imported: 3
- Question catalog rows imported: 63
- Test profile templates imported: 7
- Warnings: 2

## Warnings

- output_003_test_case_profile_defaults.md had unescaped source="synthetic_test_case" prose; escaped it before JSON parsing.
- Corrected swapped opportunity-specific question sets for SOURCE_DSIRE:dsire_program_id:3216 and SOURCE_DSIRE:dsire_program_id:381 in the normalized question-catalog artifact.

## Tax Package Repairs

- Repairs applied to v2 packages: 3
- Default user-facing tax inclusion count: 0

### Tax Benefit Classification Counts

| Key | Count |
| --- | ---: |
| property_tax_valuation | 1 |
| tax_abatement | 1 |
| tax_rate_preference | 1 |

### Tax Display Status Counts

| Key | Count |
| --- | ---: |
| needs_accountant_review | 2 |
| needs_property_tax_profile | 1 |

## Question Catalog

- Questions: 63
- Sensitive questions: 22
- Form assembly rules: 8
- Retrofit base question sets: 15
- Opportunity-specific question sets: 3

## Test Defaults

- Profile templates: 7
- Synthetic answers: 61
- Recommended test-case additions: 6
- Backlog questions: 32

## Package Validation

- Packages validated: 984
- Invalid packages: 0

## Artifacts

- Tax artifact: `data/tax_credit_package_research_repairs_gpt_pro_2026-07-02.json`
- Question catalog: `data/input_question_catalog_gpt_pro_2026-07-02.json`
- Test defaults: `data/test_case_profile_defaults_gpt_pro_2026-07-02.json`
- Updated packages: `data/opportunity_incentive_calculation_packages_v2.json`

