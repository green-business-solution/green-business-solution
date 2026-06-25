# Savings Model Coverage Report - Sample

## Source Database

- Source table inspected: `gbs-opportunity-candidates`
- Source route using the table: `/database`, backed by admin-protected `/api/database/*` endpoints
- DynamoDB rows available in read-only scan: 2096
- Production opportunity records were not mutated.

## Available Opportunity Fields

The current opportunity candidate rows include `opportunityId`, `sourceKey`, `sourceName`, `sourceUrl`, `externalId`, `externalIdType`, `canonicalTitle`, `normalizedTitle`, `status`, `state`, `stateName`, `category`, `categoryId`, `programType`, `programTypeId`, `summary`, `summaryHtml`, `websiteUrl`, `lastUpdated`, `sourceCreatedAt`, `startDate`, `endDate`, `fundingSource`, `budget`, `details`, `geography`, `administrator`, `implementingSector`, `sectors`, `eligibleSectors`, `technologies`, `technologyRecords`, `parameterSets`, `ingestionMode`, `recordKind`, `contentHash`, `previousContentHash`, `dsire`, `dsireClone`, `evidence`, `raw`, `dataQuality`, `reviewStatus`, `reviewNotes`, `duplicateOf`, `reviewedAt`, `reviewedBy`, `ingestRunId`, `firstSeenAt`, `lastSeenAt`, `createdAt`, and `updatedAt`.

## Sample Summary

- Sampled opportunities analyzed: 50
- Savings models in library: 31
- Bill/document fields in dictionary: 78
- Manual-review mappings: 31
- Mappings not requiring manual review: 19

## Top Savings Models By Count

| Savings model | Count | Percent |
| --- | ---: | ---: |
| `financing_cash_flow` | 7 | 14% |
| `electric_usage_reduction` | 6 | 12% |
| `grant_funding` | 5 | 10% |
| `sales_or_property_tax_exemption` | 5 | 10% |
| `solar_electric_offset` | 4 | 8% |
| `commercial_kitchen_equipment_efficiency` | 3 | 6% |
| `controls_building_automation` | 3 | 6% |
| `ev_charging_site_load` | 3 | 6% |
| `motor_vfd_efficiency` | 3 | 6% |
| `water_sewer_reduction` | 3 | 6% |
| `pace_or_on_bill_financing` | 2 | 4% |
| `refrigeration_electric_efficiency` | 2 | 4% |
| `battery_tou_demand_savings` | 1 | 2% |
| `hvac_electric_efficiency` | 1 | 2% |
| `program_rule_value_only` | 1 | 2% |
| `renewable_generation_credit_market_value` | 1 | 2% |

## Value Role Counts

| Value role | Count | Percent |
| --- | ---: | ---: |
| `bill_savings` | 46 | 92% |
| `upfront_cost_reduction` | 35 | 70% |
| `financing` | 9 | 18% |
| `tax_benefit` | 5 | 10% |
| `policy_or_permitting` | 2 | 4% |
| `market_credit` | 1 | 2% |

## Business Relevance Counts

| Business relevance | Count | Percent |
| --- | ---: | ---: |
| `business_relevant` | 25 | 50% |
| `mixed` | 16 | 32% |
| `residential_only` | 4 | 8% |
| `public_nonprofit_only` | 3 | 6% |
| `agriculture_only` | 2 | 4% |

## Manual Review Coverage

| Manual review required | Count | Percent |
| --- | ---: | ---: |
| true | 31 | 62% |
| false | 19 | 38% |

## Confidence Coverage

| Confidence | Count |
| --- | ---: |
| high | 17 |
| medium | 29 |
| low | 4 |

## Uncertain Opportunities

- `SOURCE_DSIRE:dsire_program_id:3831` - AEP (Central, SWEPCO and North) - Commercial Solutions Program: medium confidence, needs_bill, relevance `business_relevant`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:5170` - AEP (Central, SWEPCO and North) - SCORE Program for Schools: medium confidence, needs_bill, relevance `public_nonprofit_only`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:5171` - AEP (Central) - CitySmart Program: medium confidence, needs_bill, relevance `public_nonprofit_only`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:3659` - AEP Public Service Company of Oklahoma - Commercial Rebate Program: medium confidence, needs_equipment_details, relevance `business_relevant`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:3654` - AEP SWEPCO - Commercial and Industrial Energy Efficiency Rebate Programs: medium confidence, needs_equipment_details, relevance `business_relevant`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:5513` - Agricultural Energy Loan Program: medium confidence, needs_quote, relevance `agriculture_only`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:4971` - Alliant Energy Interstate Power and Light - Commercial and Industrial Energy Efficiency Rebate Program: medium confidence, needs_bill, relevance `business_relevant`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:5512` - Commercial Energy Loan Program: medium confidence, needs_quote, relevance `business_relevant`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:3801` - Energy Efficient Schools Initiative - Loans: medium confidence, needs_quote, relevance `public_nonprofit_only`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:4633` - Michigan Saves - Business Energy Financing: medium confidence, needs_quote, relevance `business_relevant`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:4365` - AES Indiana - Business Energy Incentives Program: medium confidence, needs_equipment_details, relevance `business_relevant`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:1613` - Alameda Municipal Power - Commercial Rebate Program: medium confidence, needs_equipment_details, relevance `business_relevant`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:4698` - Ameren Illinois - Energy-Efficiency Program: medium confidence, needs_equipment_details, relevance `business_relevant`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:5307` - City and County of Denver - Elevations Energy Loans: medium confidence, needs_quote, relevance `mixed`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:630` - Delmarva Power - Green Energy Program Incentives: medium confidence, needs_bill, relevance `mixed`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:4387` - DEMEC Member Utilities - Green Energy Program Incentives: medium confidence, needs_bill, relevance `mixed`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:21861` - Agricultural Energy Program: medium confidence, needs_quote, relevance `business_relevant`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:1931` - Alexandria Light and Power - Commercial Energy Efficiency Rebate Program: medium confidence, needs_equipment_details, relevance `business_relevant`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:1935` - Austin Utilities (Gas and Electric) - Residential Conserve and Save Rebate Program: low confidence, needs_equipment_details, relevance `residential_only`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:1939` - Elk River Municipal Utilities - Residential Energy Efficiency Rebate Program: low confidence, needs_equipment_details, relevance `residential_only`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:4723` - JEA - Residential Energy Efficiency Rebate Program: low confidence, needs_equipment_details, relevance `residential_only`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:1544` - Texas-New Mexico Power Company - Commercial Market Transformation Program: medium confidence, needs_bill, relevance `mixed`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:2458` - APS - Energy Efficiency Solutions for Business: medium confidence, needs_equipment_details, relevance `business_relevant`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:3154` - Black Hills Energy - Commercial Energy Efficiency Programs: medium confidence, needs_equipment_details, relevance `business_relevant`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:3677` - Commonwealth Hydropower Program: medium confidence, incentive_only, relevance `business_relevant`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:1596` - Energy Conservation Improvements Property Tax Exemption: medium confidence, needs_tax_review, relevance `residential_only`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:679` - Sustainable Energy Fund (SEF) Loan Program (PPL Territory): medium confidence, needs_quote, relevance `business_relevant`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:2628` - Columbia Water & Light - Solar Rebates: medium confidence, needs_bill, relevance `mixed`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:2526` - EWEB - Solar Electric Program (Rebate): medium confidence, needs_bill, relevance `mixed`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:5686` - Solar Renewable Energy Credits: low confidence, policy_only, relevance `mixed`, manual review true.
- `SOURCE_DSIRE:dsire_program_id:4790` - City of San Diego - Sustainable Building Expedited Permit Program: high confidence, policy_only, relevance `mixed`, manual review true.

## Ambiguous Categories

- Broad commercial energy-efficiency programs often include lighting, HVAC, refrigeration, controls, motors, and custom measures in one record. These should keep one primary model and multiple secondary models until a matched business selects a concrete project scope.
- Loans, PACE, and on-bill financing do not create direct utility savings by themselves. They should attach to `financing_cash_flow` or `pace_or_on_bill_financing`, then add measure-specific secondary models after project scope is known.
- Tax exemptions and credits usually require tax-review inputs even when the underlying project has clear bill savings.
- Residential-only programs appeared in the sample because the source database contains them. They are mapped with low confidence where business applicability is uncertain.
- SREC and REC records now use `renewable_generation_credit_market_value` because they create market-credit value separate from bill offset.
- Net-metering and export-value records should use `net_metering_or_export_value`; interconnection and grid-access rules should use `interconnection_or_grid_access_value`.

## Recommended Savings Model Library Changes

- Add program-rule fields for incentive caps, eligible-cost percentage, maximum award, and application deadline before importing mappings into production tables.
- Add business-relevance review queues so `residential_only`, `mixed`, and `unknown` programs do not become automatic business matches.
- Consider adding explicit incentive-rule fields for market credit price source, export compensation rate, and interconnection queue/timeline.

## Recommendation

The sample is ready for a full-database dry-run classifier after human review of the refined taxonomy. It is not ready for production import. Recommended next step: run a dry run over all opportunity candidates that writes local artifacts only, with low-confidence, residential-only, unknown-relevance, broad/custom, tax-complex, financing-unclear, policy, and market-credit rows queued for manual review.
