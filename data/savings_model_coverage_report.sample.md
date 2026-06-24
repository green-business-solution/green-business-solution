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
- Savings models in library: 26
- Bill/document fields in dictionary: 78
- Manual-review mappings: 50

## Primary Model Coverage

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
| `policy_or_permitting_value` | 2 | 4% |
| `refrigeration_electric_efficiency` | 2 | 4% |
| `battery_tou_demand_savings` | 1 | 2% |
| `hvac_electric_efficiency` | 1 | 2% |

## Confidence Coverage

| Confidence | Count |
| --- | ---: |
| high | 17 |
| medium | 29 |
| low | 4 |

## Unmapped Or Uncertain Opportunities

- `SOURCE_DSIRE:dsire_program_id:1935` - Austin Utilities (Gas and Electric) - Residential Conserve and Save Rebate Program: low confidence, needs_equipment_details.
- `SOURCE_DSIRE:dsire_program_id:1939` - Elk River Municipal Utilities - Residential Energy Efficiency Rebate Program: low confidence, needs_equipment_details.
- `SOURCE_DSIRE:dsire_program_id:4723` - JEA - Residential Energy Efficiency Rebate Program: low confidence, needs_equipment_details.
- `SOURCE_DSIRE:dsire_program_id:5686` - Solar Renewable Energy Credits: low confidence, policy_only.
- `SOURCE_DSIRE:dsire_program_id:4790` - City of San Diego - Sustainable Building Expedited Permit Program: high confidence, policy_only.

## Ambiguous Categories

- Broad commercial energy-efficiency programs often include lighting, HVAC, refrigeration, controls, motors, and custom measures in one record. These should keep one primary model and multiple secondary models until a matched business selects a concrete project scope.
- Loans, PACE, and on-bill financing do not create direct utility savings by themselves. They should attach to `financing_cash_flow` or `pace_or_on_bill_financing`, then add measure-specific secondary models after project scope is known.
- Tax exemptions and credits usually require tax-review inputs even when the underlying project has clear bill savings.
- Residential-only programs appeared in the sample because the source database contains them. They are mapped with low confidence where business applicability is uncertain.
- SREC, net-metering, interconnection, and expedited-permit records should stay in `policy_or_permitting_value` unless an explicit cash compensation formula is captured.

## Recommended Savings Model Library Changes

- Add a future `renewable_generation_credit_market_value` model if SREC, REC, or performance-credit programs become common in business matches.
- Add program-rule fields for incentive caps, eligible-cost percentage, maximum award, and application deadline before importing mappings into production tables.
- Consider a final `whole_building_custom_efficiency` model for custom C&I programs that require engineering studies instead of prescriptive equipment inputs.

## Recommendation

The sample is good enough to review the model taxonomy and import shape, but not yet good enough to run automatically across the full database. Recommended next step: review these 50 mappings with Neer, add any missing model types, then run a dry-run classifier over the full database with all low-confidence rows queued for manual review.
