# Savings Model Coverage Report - Full Dry Run

## Source Database

- Source table inspected: `gbs-opportunity-candidates`
- Source file: `/tmp/retrofi-opportunity-scan-all.json`
- Production opportunity records were not mutated.
- No records were imported into production.

## Summary

- Total opportunities analyzed: 2096
- Total mapped: 2096
- Total skipped: 0
- Savings models in library: 31
- Manual review required: 525
- Manual review not required: 1571
- True classification-uncertain opportunities: 525
- Unmapped/no-direct-savings records: 26
- Residential-only count: 685
- Business-relevant count: 646

## Savings Model Distribution

| Savings model | Count | Percent |
| --- | ---: | ---: |
| `grant_funding` | 336 | 16% |
| `financing_cash_flow` | 217 | 10% |
| `ev_charging_site_load` | 200 | 10% |
| `whole_building_custom_efficiency` | 175 | 8% |
| `motor_vfd_efficiency` | 159 | 8% |
| `sales_or_property_tax_exemption` | 135 | 6% |
| `fleet_fuel_replacement` | 115 | 5% |
| `program_rule_value_only` | 96 | 5% |
| `refrigeration_electric_efficiency` | 66 | 3% |
| `commercial_kitchen_equipment_efficiency` | 55 | 3% |
| `controls_building_automation` | 55 | 3% |
| `project_cost_reduction_only` | 53 | 3% |
| `pace_or_on_bill_financing` | 52 | 2% |
| `tax_benefit_project_cost_reduction` | 51 | 2% |
| `solar_electric_offset` | 50 | 2% |
| `hvac_electric_efficiency` | 49 | 2% |
| `battery_tou_demand_savings` | 41 | 2% |
| `gas_usage_reduction` | 39 | 2% |
| `electric_usage_reduction` | 37 | 2% |
| `interconnection_or_grid_access_value` | 34 | 2% |
| `net_metering_or_export_value` | 27 | 1% |
| `no_direct_savings` | 26 | 1% |
| `envelope_insulation_savings` | 12 | 1% |
| `renewable_generation_credit_market_value` | 10 | 0% |
| `water_sewer_reduction` | 6 | 0% |

## Top 20 Savings Models By Count

| Savings model | Count | Percent |
| --- | ---: | ---: |
| `grant_funding` | 336 | 16% |
| `financing_cash_flow` | 217 | 10% |
| `ev_charging_site_load` | 200 | 10% |
| `whole_building_custom_efficiency` | 175 | 8% |
| `motor_vfd_efficiency` | 159 | 8% |
| `sales_or_property_tax_exemption` | 135 | 6% |
| `fleet_fuel_replacement` | 115 | 5% |
| `program_rule_value_only` | 96 | 5% |
| `refrigeration_electric_efficiency` | 66 | 3% |
| `commercial_kitchen_equipment_efficiency` | 55 | 3% |
| `controls_building_automation` | 55 | 3% |
| `project_cost_reduction_only` | 53 | 3% |
| `pace_or_on_bill_financing` | 52 | 2% |
| `tax_benefit_project_cost_reduction` | 51 | 2% |
| `solar_electric_offset` | 50 | 2% |
| `hvac_electric_efficiency` | 49 | 2% |
| `battery_tou_demand_savings` | 41 | 2% |
| `gas_usage_reduction` | 39 | 2% |
| `electric_usage_reduction` | 37 | 2% |
| `interconnection_or_grid_access_value` | 34 | 2% |

## Value Role Distribution

| Value role | Count | Percent |
| --- | ---: | ---: |
| `bill_savings` | 1544 | 74% |
| `upfront_cost_reduction` | 1448 | 69% |
| `financing` | 269 | 13% |
| `tax_benefit` | 186 | 9% |
| `policy_or_permitting` | 167 | 8% |
| `no_direct_savings` | 26 | 1% |
| `market_credit` | 10 | 0% |

## Business Relevance Distribution

| Business relevance | Count | Percent |
| --- | ---: | ---: |
| `residential_only` | 685 | 33% |
| `business_relevant` | 646 | 31% |
| `mixed` | 461 | 22% |
| `unknown` | 173 | 8% |
| `public_nonprofit_only` | 88 | 4% |
| `agriculture_only` | 43 | 2% |

## V1 Readiness Distribution

| V1 readiness | Count | Percent |
| --- | ---: | ---: |
| `not_v1_relevant` | 816 | 39% |
| `needs_project_scope` | 298 | 14% |
| `needs_quote` | 288 | 14% |
| `unknown` | 183 | 9% |
| `needs_bill_data` | 173 | 8% |
| `needs_financing_terms` | 138 | 7% |
| `policy_only` | 101 | 5% |
| `needs_tax_context` | 99 | 5% |

## Exclusion Or Delay Reason Distribution

| Reason | Count | Percent |
| --- | ---: | ---: |
| `residential_only` | 685 | 33% |
| `broad_custom_program` | 423 | 20% |
| `project_scope_required` | 360 | 17% |
| `insufficient_data` | 159 | 8% |
| `financing_only` | 138 | 7% |
| `policy_only` | 101 | 5% |
| `tax_context_required` | 99 | 5% |
| `public_nonprofit_only` | 88 | 4% |
| `agriculture_only` | 43 | 2% |

## Manual Review Required Vs Not Required

| Manual review required | Count | Percent |
| --- | ---: | ---: |
| true | 525 | 25% |
| false | 1571 | 75% |

## Confidence Distribution

| Confidence | Count | Percent |
| --- | ---: | ---: |
| high | 660 | 31% |
| medium | 1245 | 59% |
| low | 191 | 9% |

## Examples No Longer Requiring Manual Review

These records are clearly classified but delayed or excluded from V1 for product-readiness reasons.

- `SOURCE_DSIRE:dsire_program_id:5239` - Chicopee Electric Light - Commercial Energy Efficiency Rebate Program: `financing_cash_flow`, readiness `needs_financing_terms`, reason `financing_only`.
- `SOURCE_DSIRE:dsire_program_id:22328` - NextZero EV Charger Program: `fleet_fuel_replacement`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3821` - ConEd - Multifamily Energy Efficiency Incentives Program: `electric_usage_reduction`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22805` - Taunton Municipal Lighting Plant - Residential Heat Pump & Zero-Interest Loan: `financing_cash_flow`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:4300` - Consumers Energy (Gas) - Residential Energy Efficiency Program: `whole_building_custom_efficiency`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22551` - Duke Energy Indiana Off-Peak Charging Credit: `project_cost_reduction_only`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:2448` - Connexus Energy - Commercial Energy Efficiency Rebate Programs: `fleet_fuel_replacement`, readiness `needs_project_scope`, reason `broad_custom_program`.
- `SOURCE_DSIRE:dsire_program_id:4899` - PG&E - Non-Residential Energy Efficiency Rebates: `hvac_electric_efficiency`, readiness `needs_bill_data`, reason `broad_custom_program`.
- `SOURCE_DSIRE:dsire_program_id:22214` - NYSERDA - New York Truck Voucher Incentive Program: `fleet_fuel_replacement`, readiness `needs_project_scope`, reason `project_scope_required`.
- `SOURCE_DSIRE:dsire_program_id:22224` - Oregon Clean Vehicle Rebate Program: `fleet_fuel_replacement`, readiness `needs_project_scope`, reason `project_scope_required`.
- `SOURCE_DSIRE:dsire_program_id:2684` - Marshall County REMC - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3233` - Renewable Energy Sales and Use Tax Abatement: `sales_or_property_tax_exemption`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3801` - Energy Efficient Schools Initiative - Loans: `financing_cash_flow`, readiness `not_v1_relevant`, reason `public_nonprofit_only`.
- `SOURCE_DSIRE:dsire_program_id:22200` - Clean Fleet EV Incentive Program: `grant_funding`, readiness `needs_quote`, reason `project_scope_required`.
- `SOURCE_DSIRE:dsire_program_id:2097` - Pee Dee Electric Cooperative - Energy Resource Conservation Loan Program: `financing_cash_flow`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:144` - Residential Renewable Energy Income Tax Credit: `tax_benefit_project_cost_reduction`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3968` - Duke Energy Progress - Residential Energy Efficiency Rebate Program: `whole_building_custom_efficiency`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22591` - C-PACE: Efficiency Maine: `pace_or_on_bill_financing`, readiness `needs_financing_terms`, reason `financing_only`.
- `SOURCE_DSIRE:dsire_program_id:5109` - Local Option - Property Assessed Clean Energy Financing: `pace_or_on_bill_financing`, readiness `needs_financing_terms`, reason `financing_only`.
- `SOURCE_DSIRE:dsire_program_id:2075` - Cowlitz County PUD - Residential Energy Efficiency Rebate Program: `financing_cash_flow`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:5945` - Solar Energy Loan Program: `financing_cash_flow`, readiness `needs_financing_terms`, reason `financing_only`.
- `SOURCE_DSIRE:dsire_program_id:3947` - Energy Smart - Residential Energy Efficiency Rebate Program (19 Municipalities): `fleet_fuel_replacement`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:5417` - Xcel Energy - Solar*Rewards Program: `net_metering_or_export_value`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:4791` - MassSAVE (Electric) - Commercial New Construction/Major Renovation Program: `commercial_kitchen_equipment_efficiency`, readiness `needs_project_scope`, reason `broad_custom_program`.
- `SOURCE_DSIRE:dsire_program_id:4583` - Lodi Electric Utility - Commercial Energy Efficiency Rebate Program: `ev_charging_site_load`, readiness `needs_quote`, reason `project_scope_required`.
- `SOURCE_DSIRE:dsire_program_id:22703` - Forest Grove Light & Power -  Residential Solar Rebate Program: `net_metering_or_export_value`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-23-404` - GFO-23-404 - Equitable Building Decarbonization Program Direct Install: `grant_funding`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:2004` - PSEG Long Island - Commercial Energy Efficiency Rebate Program: `refrigeration_electric_efficiency`, readiness `needs_project_scope`, reason `broad_custom_program`.
- `SOURCE_DSIRE:dsire_program_id:4946` - Property Tax Exemption for Renewable Energy Generation Facilities: `sales_or_property_tax_exemption`, readiness `needs_tax_context`, reason `tax_context_required`.
- `SOURCE_DSIRE:dsire_program_id:2896` - Waverly Light & Power - Residential Energy Efficiency Rebates: `ev_charging_site_load`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-23-318` - GFO-23-318 - BRIDGE 2024: Bringing Rapid Innovation Development to Green Energy: `grant_funding`, readiness `needs_quote`, reason `project_scope_required`.
- `SOURCE_DSIRE:dsire_program_id:679` - Sustainable Energy Fund (SEF) Loan Program (PPL Territory): `financing_cash_flow`, readiness `needs_financing_terms`, reason `financing_only`.
- `SOURCE_DSIRE:dsire_program_id:5406` - Utah Commercial PACE financing program: `pace_or_on_bill_financing`, readiness `needs_financing_terms`, reason `financing_only`.
- `SOURCE_DSIRE:dsire_program_id:5723` - Local Option- Renewable Energy Machinery and Tools Property Tax Exemption: `sales_or_property_tax_exemption`, readiness `not_v1_relevant`, reason `public_nonprofit_only`.
- `SOURCE_DSIRE:dsire_program_id:3576` - Lake Region Electric Cooperative - Residential Energy Efficiency Rebate Program: `ev_charging_site_load`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:5100` - Residential Energy Efficiency Rebates (Offered by 5 Utilities): `ev_charging_site_load`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:2103` - Mountain View Electric Association, Inc - Energy Efficiency Rebates Program: `refrigeration_electric_efficiency`, readiness `needs_project_scope`, reason `broad_custom_program`.
- `SOURCE_DSIRE:dsire_program_id:3589` - Haywood EMC - Residential Heat Pump and Weatherization Loan Program: `financing_cash_flow`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:4790` - City of San Diego - Sustainable Building Expedited Permit Program: `program_rule_value_only`, readiness `policy_only`, reason `policy_only`.
- `SOURCE_DSIRE:dsire_program_id:5141` - Residential Energy Efficiency Rebates (Offered by 12 Utilities): `ev_charging_site_load`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:2239` - Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program: `whole_building_custom_efficiency`, readiness `needs_bill_data`, reason `broad_custom_program`.
- `SOURCE_DSIRE:dsire_program_id:2132` - Emerald PUD - Residential Energy Efficiency Rebate Program: `financing_cash_flow`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3979` - Energy Efficiency Loans for State Government Agencies: `financing_cash_flow`, readiness `needs_financing_terms`, reason `financing_only`.
- `SOURCE_DSIRE:dsire_program_id:3605` - Duke Energy (Electric) - Residential Energy Efficiency Rebate Program: `whole_building_custom_efficiency`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:commercial-solar-rebate-program` - Commercial Solar Rebate Program: `solar_electric_offset`, readiness `needs_bill_data`, reason `broad_custom_program`.
- `SOURCE_DSIRE:dsire_program_id:215` - MDA - Energy Efficiency Revolving Loan Program: `financing_cash_flow`, readiness `needs_financing_terms`, reason `financing_only`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-22-304` - GFO-22-304 - Assessing the Role of Hydrogen in California’s Decarbonizing Electric System: `grant_funding`, readiness `needs_quote`, reason `project_scope_required`.
- `SOURCE_DSIRE:dsire_program_id:2202` - Benton PUD - Residential Energy Efficiency Rebate Programs: `ev_charging_site_load`, readiness `not_v1_relevant`, reason `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22245` - Workplace EV Charging Funding Assistance Program: `grant_funding`, readiness `needs_quote`, reason `project_scope_required`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-24-307` - GFO-24-307 - Advancing Designs and Analysis of High Voltage Direct Current Substations and Environmental Monitoring for Floating Offshore Wind: `grant_funding`, readiness `needs_quote`, reason `project_scope_required`.

## Remaining True Manual-Review Records

Total true manual-review records: 525. Showing the first 200 with classifier-uncertainty reasons.

- `SOURCE_DSIRE:dsire_program_id:5215` - Xcel Energy (Electric) - Commercial Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:3136` - OTEC - Agricultural Energy Efficiency Rebate Programs: `motor_vfd_efficiency`, medium, relevance `agriculture_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5313` - USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program: `financing_cash_flow`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22643` - Illinois - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:3312` - Minnesota Energy Resources (Gas) - Home Energy Excellence Program for Builders or Homeowners: `controls_building_automation`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:4054` - Sales and Use Tax Exclusion for Advanced Transportation and Alternative Energy Manufacturing Program: `financing_cash_flow`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:4786` - Questar Gas - Home Builder Gas Appliance Rebate Program: `controls_building_automation`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5532` - Entergy Arkansas - Agricultural Energy Solutions Program Rebates: `motor_vfd_efficiency`, medium, relevance `agriculture_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:1467` - Evergy - Residential Programmable Thermostat Program: `controls_building_automation`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:160` - Renewable Energy Property Tax Exemption: `sales_or_property_tax_exemption`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:5817` - Florida Public Utilities (Gas) - Commercial Energy Efficiency Rebates: `motor_vfd_efficiency`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5735` - Small Business & Municipal Loan Program: `financing_cash_flow`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_code_title_hash:NY101F:a3be869e7f79` - Residential Wood Heating Fuel Exemption: `no_direct_savings`, low, relevance `residential_only`, reason `no_value_path_identified`.
- `SOURCE_DSIRE:dsire_program_id:3342` - Cascade Natural Gas - Conservation Incentives for New and Existing Homes: `program_rule_value_only`, high, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5853` - Appalachian Power (Electric)- Non-Residential Energy Efficiency Program: `controls_building_automation`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2905` - Florida Power and Light - Residential Energy Efficiency Program: `program_rule_value_only`, high, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22174` - Electric Vehicle Fleet Fee Exemption: `fleet_fuel_replacement`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:22641` - Tennessee  - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:1611` - Alameda Municipal Power - Commercial New Construction Rebate Program: `motor_vfd_efficiency`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:1232` - Emerald PUD - Residential Energy Efficiency Loan Programs: `financing_cash_flow`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-23-604` - GFO-23-604 - Improvements in Maintenance Processes for Reliable Operations that are Verifiable and Effective for Hydrogen Refueling Stations (IMPROVE for H2): `grant_funding`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5854` - Lodi Electric Utility - Commercial and Industrial Energy Efficiency Loan Program: `financing_cash_flow`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:1948` - Shakopee Public Utilities - Commercial and Industrial Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-22-001` - PON-22-001 - Energy Conservation Assistance Act-Education Subaccount (ECAA-Ed) Zero-Interest Loan Program: `financing_cash_flow`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:3131` - Idaho Power - Irrigation Efficiency Rewards Program: `motor_vfd_efficiency`, medium, relevance `agriculture_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:81` - Solar and Wind Energy Device Franchise Tax Deduction: `sales_or_property_tax_exemption`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_code_title_hash:AZ73F:0e0de7e0c2fa` - Arizona – Home Electrification and Appliance Rebate (HEAR) Program: `no_direct_savings`, low, relevance `residential_only`, reason `no_value_path_identified`.
- `SOURCE_DSIRE:dsire_program_id:4547` - DTE Energy (Electric) - Commercial and Industrial Energy Efficiency Program: `motor_vfd_efficiency`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_code_title_hash:UT43F:c38795d0e130` - Conversion to Alternative Fuel Grant Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:22650` - Wisconsin - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:3622` - City of High Point Electric - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22683` - Tri-County Regional Energy Network (3C-REN) - Multifamily Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:emerging-technologies-grant` - Emerging Technologies Grant: `grant_funding`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:3954` - Southwest Gas Corporation - Residential Energy Efficiency Rebate Program: `project_cost_reduction_only`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:355` - Illinois Clean Energy Community Foundation Grants: `grant_funding`, medium, relevance `public_nonprofit_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22060` - Southern Power District - Commercial Energy Efficiency Rebate Programs: `motor_vfd_efficiency`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22633` - Arkansas - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_19551` - Emergency Load Reduction Program (ELRP): `no_direct_savings`, low, relevance `business_relevant`, reason `no_value_path_identified`.
- `SOURCE_DSIRE:dsire_program_id:22497` - Town of Ipswich Electric Light Department - Solar PV Rebate Program: `interconnection_or_grid_access_value`, high, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_SILICON_VALLEY_POWER:svp_source_section:ef0850c0e097a7f9:building-operator-certification-training-scholarships` - Building Operator Certification Training Scholarships: `program_rule_value_only`, high, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:4454` - Retro-Commissioning (RCx) Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:658` - Business Energy Investment Tax Credit (ITC): `interconnection_or_grid_access_value`, high, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:1631` - Burbank Water & Power - Business Bucks Energy Efficiency Grant Program: `grant_funding`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22217` - Diesel Emissions Reduction Grant Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:3838` - El Paso Electric Company - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2688` - Dominion Energy - Residential Energy Efficiency Rebate Programs: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_code_title_hash:TX100F:59935a21945f` - Light-Duty Motor Vehicle Purchase or Lease Incentive Program: `no_direct_savings`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:22659` - Oregon - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:5235` - North Shore Gas - Residential Rebate Program: `controls_building_automation`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2252` - Minnesota Valley Electric Cooperative -Residential Energy Resource Conservation Loan Program: `financing_cash_flow`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:4835` - AEP Appalachian Power - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2266` - Diverse Power - Energy Efficient New Construction Rebate Programs: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22105` - Black Hills Energy (Electric) - Commercial Energy Efficiency Programs: `project_cost_reduction_only`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2108` - Clay Electric Cooperative, Inc - Energy Conservation Loans: `financing_cash_flow`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2665` - Clark County REMC - Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22248` - Diesel Emissions Reduction Grants: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:142` - Local Option - Special Assessment of Wind Energy Devices: `sales_or_property_tax_exemption`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_code_title_hash:VA74F:6d5c0a1964f2` - CMAQ Incentive Program: `no_direct_savings`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_code_title_hash:TX87F:8e58dcb07404` - City of Sunset Valley - PV Rebate Program: `no_direct_savings`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:3870` - Hawaii C-PACE program: `pace_or_on_bill_financing`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:4528` - Oklahoma Municipal Power Authority - Demand and Energy Efficiency Program (DEEP): `motor_vfd_efficiency`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5733` - Noble REMC - Residential Energy Efficiency Rebate Incentives: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:3602` - High Performance Buildings Incentive Program: `program_rule_value_only`, high, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22637` - Maine - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:22340` - Stowe Electric - Electric Vehicle Purchase Rebate: `project_cost_reduction_only`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2416` - Pacific Power - Residential wattsmart Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22526` - Redding Electric - Electric Vehicle Rebate Program: `fleet_fuel_replacement`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:2694` - Carroll White REMC - Residential Heat Pump Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:3909` - Montana-Dakota Utilities - Residential Energy Efficiency Rebate Program: `controls_building_automation`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:3796` - South River EMC - Energy Efficient New Homes Rebate Program: `project_cost_reduction_only`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22774` - Tucson Electric Power - Energy Storage Rewards Program: `battery_tou_demand_savings`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:4333` - Austin Utilities - Solar Rebate Program: `interconnection_or_grid_access_value`, high, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2177` - New Hampshire Electric Co-op - Commercial and Municipal New Equipment and Construction Program: `program_rule_value_only`, high, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:4471` - Benton PUD -  ENERGY STAR Certified Manufactured Homes Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22759` - City and County of Denver - Heat Pump Installation Bonus for Contractors: `hvac_electric_efficiency`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:22305` - Duke Energy - Park and Plug Program: `ev_charging_site_load`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:5153` - City of Concord Electric Department - Residential Energy Efficiency Rebate Program: `program_rule_value_only`, high, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFP-25-802` - RFP-25-802 - Enhancing Behind-the-Meter PV and Storage Adoption Modeling in California: `net_metering_or_export_value`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:3842` - El Paso Electric Company - Residential Efficiency Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:3508` - MidAmerican Energy - Commercial Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2512` - Richland Energy Services - Residential Energy Conservation & Solar Loan Program: `financing_cash_flow`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_code_title_hash:NC100F:d65589ad47d2` - North Carolina - Home Electrification and Appliance Rebate (HEAR) Program: `no_direct_savings`, low, relevance `residential_only`, reason `no_value_path_identified`.
- `SOURCE_DSIRE:dsire_program_id:22731` - City and County of Denver - Steam to Electric Conversion Incentive: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:2671` - Dubois REC - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:3462` - National Grid (Electric) - Residential Energy Efficiency Rebate Programs (Upstate New York): `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:3936` - Independence Power and Light - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5422` - Renewable Energy Facility Sales and Use Tax Reimbursement: `interconnection_or_grid_access_value`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:4789` - CPS Energy - New Residential Construction Incentives: `program_rule_value_only`, high, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:3937` - Independence Power and Light - New Homes Rebate Program: `program_rule_value_only`, high, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:4575` - RG&E (Gas) - Commercial and Industrial Efficiency Program: `motor_vfd_efficiency`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22242` - Governmental Alternative Fuel Fleet Grant Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:2199` - Mason County PUD 3 - Commercial and Industrial Energy Rebates: `motor_vfd_efficiency`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_code_title_hash:NY100F:19a5badb1d1c` - Energy Conservation Improvements Property Tax Exemption: `sales_or_property_tax_exemption`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:3475` - Central Hudson Gas & Electric (Gas) - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:1373` - Unitil (Electric) - Residential Energy Efficiency Programs: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:4577` - Anne Arundel County - High Performance Building Property Tax Credit: `program_rule_value_only`, high, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-24-310` - GFO-24-310 - Retrofitting Existing Residential Buildings with Innovative Envelope Solutions: `grant_funding`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22066` - Burbank Water and Power - LEED Certification Incentive Program: `program_rule_value_only`, high, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2029` - College Station Utilities - Residential Energy Efficiency Rebate Programs: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5834` - VirginiaSAVES Green Community Loan Program: `financing_cash_flow`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22648` - Missouri - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:5811` - NJ Clean Energy- Residential New Construction Program: `program_rule_value_only`, high, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2181` - Ozark Border Electric Cooperative - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22238` - Texas Clean Fleet Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:1492` - Black Hills Energy - Residential Customer Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:3262` - Taylor County RECC - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_SCE_BUSINESS:sce_source_section:bcdeae04c5863d3b:retrocommissioning-program` - Retrocommissioning Program: `program_rule_value_only`, high, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2140` - Blue Grass Energy - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:IFB-25-001` - IFB-25-001 – Translation/Interpretation Services: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:3283` - Black Hills Energy (Gas) - Residential Energy Efficiency Rebate Programs: `controls_building_automation`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:558` - Property Tax Exclusion for Solar Energy Systems and Solar Plus Storage System: `sales_or_property_tax_exemption`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:2668` - Utilities District of Western Indiana REMC - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2179` - Flathead Electric Cooperative - New and Manufactured Home Incentive Program: `project_cost_reduction_only`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2567` - Alternative Energy Product Manufacturers Tax Credit: `tax_benefit_project_cost_reduction`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:22225` - Alternative Fuels Incentive Grant Program (AFIG): `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:3332` - Lincoln Electric System - Sustainable Energy Program: `motor_vfd_efficiency`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5785` - Arkansas Oklahoma Gas (AOG) Residential Rebate Program: `controls_building_automation`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:4426` - Sales Tax Holiday for Energy-Efficient Appliances: `sales_or_property_tax_exemption`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:178` - Biogas, Solar, and Wind Energy Equipment Exemption: `financing_cash_flow`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:936` - Solar Electric Incentive Program: `interconnection_or_grid_access_value`, high, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:1036` - Portfolio Energy Credits: `solar_electric_offset`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:22408` - Diesel Emissions Mitigation Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:1289` - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2286` - Dakota Electric Association - Commercial and Industrial Custom Energy Grant Program: `grant_funding`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:4479` - Seattle City Light - Multifamily New Construction Rebate Program: `program_rule_value_only`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:5449` - Energize Delaware - Home Performance with ENERGY STAR: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:1431` - SDG&E - Residential Efficiency Rebate Program: `controls_building_automation`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:4567` - Town of Carrboro - Worthwhile Investments Save Energy (WISE) Homes and Buildings Program: `financing_cash_flow`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2702` - City Utilities of Springfield - Commercial Energy Efficiency Rebate Program: `controls_building_automation`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22504` - Construction and Building Performance Rebate Programs: `project_cost_reduction_only`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-21-304` - GFO-21-304 - Realizing Accelerated Manufacturing and Production for Clean Energy Technologies: `grant_funding`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5114` - Wabash Valley Power Association (28 Member Cooperatives) - Residential Energy Efficiency Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22227` - Clean Diesel Grant Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:4552` - Sales and Use Taxes for Items Used in Renewable Energy Industries: `sales_or_property_tax_exemption`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:22568` - Oklahoma Municipal Power Authority - Turn Down the Watts: `controls_building_automation`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5903` - City of Miami - Green Building Density Bonus: `program_rule_value_only`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_url_hash:url_hash:5c082382a1743f59` - California Electric Vehicle Infrastructure Project 2.0 (CALeVIP 2.0) – Fast Charge California Project: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:22444` - DEMEC Member Utilities - Efficiency Smart Business Program: `project_cost_reduction_only`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:3153` - Industrial and Agricultural Production Efficiency Program: `controls_building_automation`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5708` - TVA - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2796` - Sales Tax Exemption for Energy-Efficient Products (Sales Tax Holiday): `sales_or_property_tax_exemption`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-24-306` - GFO-24-306 - Applications of Open Data to Support Climate Resilience in California’s Electricity Sector: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:22351` - Vermont Public Power Supply Authority - Electric Bicycle and Retrofit Kit Rebate: `motor_vfd_efficiency`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:22419` - Renewable Energy and Energy Storage Property Tax Exemption: `interconnection_or_grid_access_value`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:3148` - Citizens Gas - Commercial Efficiency Rebates: `controls_building_automation`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22403` - Burlington Electric Department - Electric Vehicle Rebate Program: `fleet_fuel_replacement`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:3939` - Independence Power and Light - Commercial Energy Efficiency Rebate Program: `controls_building_automation`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:3639` - OG&E - Commercial Energy Efficiency Rebate Programs: `controls_building_automation`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-17-401` - PON-17-401 - Financing for Energy Efficiency and Renewable Energy Generation Projects: `financing_cash_flow`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:22783` - Public Charger Grants: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:5862` - Ameren Missouri (Electric) - Residential Heating and Cooling Energy Efficiency  Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5251` - Aiken Electric Cooperative Inc - Residential Energy Efficiency Rebate Program: `controls_building_automation`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22169` - Vehicle Replacement Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_SDGE_BUSINESS:program_url:pep_clearesult_com_pep_heep_program` - Higher Education Efficiency Performance (HEEP): `no_direct_savings`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:3669` - AEP Texas North Company - SMART Source Solar PV Rebate Program: `interconnection_or_grid_access_value`, high, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2178` - Flathead Electric Cooperative - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:2662` - Bartholomew County REMC - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-22-002` - PON-22-002 - Energy Conservation Assistance Act (ECAA) Low-Interest Loan Program: `financing_cash_flow`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-901` - GFO-25-901 - California Training for Residential Energy Contractors (CA-TREC): `program_rule_value_only`, high, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:3130` - Idaho Power - Commercial Custom Efficiency Program: `program_rule_value_only`, high, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:4067` - Green Communities Grant Program: `program_rule_value_only`, high, relevance `public_nonprofit_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:3661` - AEP Texas Central Company - SMART Source Solar PV Rebate Program: `interconnection_or_grid_access_value`, high, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:3724` - Burlington Electric Department - Multi-Family Rental Energy Efficiency Rebate Program: `motor_vfd_efficiency`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:22645` - Iowa - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:2306` - Salt River Electric - Residential Energy Efficiency Rebate Programs: `motor_vfd_efficiency`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22068` - Silicon Valley Power - Emerging Technologies Grant Program: `grant_funding`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5804` - Lewis County PUD - Loans for Energy Efficiency Program: `financing_cash_flow`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22377` - PECO - EV Rebate Program: `project_cost_reduction_only`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_url_hash:url_hash:a530fbc239afb0af` - Supporting Applications of Open Data for Electricity Sector Planning and Outreach: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:1715` - IID Energy - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:185` - Methane Gas Conversion Property Tax Exemption: `sales_or_property_tax_exemption`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:2260` - Dakota Electric Association - Commercial and Industrial Energy Efficiency Rebate Program: `program_rule_value_only`, high, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_SDGE_BUSINESS:program_url:mendotagroup_com_sdge_grid_map_home` - GRID-MAP: `project_cost_reduction_only`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5704` - TVA - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22634` - Florida - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:966` - Energy Replacement Generation Tax Exemption: `sales_or_property_tax_exemption`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:2041` - Cedarburg Light & Water Utility - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5550` - Tax Credit for Forest Derived Biomass: `tax_benefit_project_cost_reduction`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:4632` - Michigan Saves - Home Energy Loan Program: `financing_cash_flow`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22470` - Mass Save - Residential New Home Construction Incentives: `project_cost_reduction_only`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_code_title_hash:CO209F:46611d374aab` - Roaring Fork Valley - Energy Smart Colorado Home Energy Upgrade Rebates: `no_direct_savings`, low, relevance `residential_only`, reason `no_value_path_identified`.
- `SOURCE_DSIRE:dsire_program_id:22646` - Kentucky - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:2693` - Tipmont REMC - Energy Efficiency Equipment Rebate Program: `electric_usage_reduction`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-23-315` - GFO-23-315 - Clean, Dispatchable Generation: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_SDGE_BUSINESS:program_url:smallbusinesssaver_net` - Small Business Saver Program (SBS): `no_direct_savings`, low, relevance `business_relevant`, reason `no_value_path_identified`.
- `SOURCE_DSIRE:dsire_program_id:22048` - Sales and Use Tax Exemption for Electric Power Generation and Storage Equipment: `sales_or_property_tax_exemption`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:1578` - Alliant Energy (Wisconsin Power and Light) - Farm Wiring Grant Program: `grant_funding`, medium, relevance `agriculture_only`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:4217` - Qualified Energy Property Tax Exemption for Projects 250 kW or Less: `interconnection_or_grid_access_value`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:3464` - RG&E - Smart Energy Residential Efficiency Rebate Programs: `motor_vfd_efficiency`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:4206` - District of Columbia Property Assessed Clean Energy Financing: `pace_or_on_bill_financing`, medium, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22660` - South Dakota - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-23-306` - GFO-23-306 - Grid-Supportive Transportation Electrification: `grant_funding`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:1787` - City Water Light and Power - Commercial Energy Efficiency Rebate Programs: `motor_vfd_efficiency`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:22562` - NY-Sun PV Incentive Program (Commercial and Industrial): `interconnection_or_grid_access_value`, high, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:​​​​GFO-23-701` - GFO-23-701 - California’s Fifth Climate Change Assessment Tribal Research Grant Program: `grant_funding`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_code_title_hash:VA28R:12e95a61997a` - Energy Storage Target: `battery_tou_demand_savings`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:3021` - Rhode Island Energy (Gas) - Commercial Energy Efficiency Programs: `controls_building_automation`, medium, relevance `business_relevant`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:597` - KIUC - Solar Water Heating Loan Program: `financing_cash_flow`, low, relevance `unknown`, reason `business_relevance_unknown`.
- `SOURCE_DSIRE:dsire_program_id:21865` - PSEG Long Island- Commercial Solar PV Feed-in Tariff: `interconnection_or_grid_access_value`, high, relevance `mixed`, reason `classification_conflict_or_ambiguity`.
- `SOURCE_DSIRE:dsire_program_id:5311` - Dominion Virginia Power - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `residential_only`, reason `classification_conflict_or_ambiguity`.

## Unmapped Records

Total no-direct-savings/unmapped records: 26. Showing the first 100.

- `SOURCE_DSIRE:dsire_program_code_title_hash:NY101F:a3be869e7f79` - Residential Wood Heating Fuel Exemption
- `SOURCE_DSIRE:dsire_program_code_title_hash:AZ73F:0e0de7e0c2fa` - Arizona – Home Electrification and Appliance Rebate (HEAR) Program
- `SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_19551` - Emergency Load Reduction Program (ELRP)
- `SOURCE_DSIRE:dsire_program_code_title_hash:TX100F:59935a21945f` - Light-Duty Motor Vehicle Purchase or Lease Incentive Program
- `SOURCE_DSIRE:dsire_program_code_title_hash:VA74F:6d5c0a1964f2` - CMAQ Incentive Program
- `SOURCE_DSIRE:dsire_program_code_title_hash:TX87F:8e58dcb07404` - City of Sunset Valley - PV Rebate Program
- `SOURCE_DSIRE:dsire_program_code_title_hash:NC100F:d65589ad47d2` - North Carolina - Home Electrification and Appliance Rebate (HEAR) Program
- `SOURCE_SDGE_BUSINESS:program_url:pep_clearesult_com_pep_heep_program` - Higher Education Efficiency Performance (HEEP)
- `SOURCE_DSIRE:dsire_program_code_title_hash:CO209F:46611d374aab` - Roaring Fork Valley - Energy Smart Colorado Home Energy Upgrade Rebates
- `SOURCE_SDGE_BUSINESS:program_url:smallbusinesssaver_net` - Small Business Saver Program (SBS)
- `SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_13556` - Demand Response Programs
- `SOURCE_SDGE_BUSINESS:program_url:lincusenergy_com_wise` - Water Infrastructure and System Efficiency
- `SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_589` - San Diego LEARN Program
- `SOURCE_DSIRE:dsire_program_code_title_hash:GA38F:b64502dca8d5` - Georgia Power - Home Energy Improvement Program
- `SOURCE_DSIRE:dsire_program_id:364` - Clean Energy Revenue Bond Program
- `SOURCE_SCE_BUSINESS:sce_source_section:56574423e5e2b946:base-interruptible-program-bip` - Base Interruptible Program (BIP)
- `SOURCE_DSIRE:dsire_program_code_title_hash:OK49F:e2ada733159a` - Oklahoma Municipal Power Authority - Turn Down the Watts
- `SOURCE_DSIRE:dsire_program_code_title_hash:CO78F:4ce622607633` - Colorado - Home Electrification and Appliance Rebate (HEAR) Program
- `SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_555` - Capacity Bidding Program (CBP)
- `SOURCE_DSIRE:dsire_program_id:22203` - Green Pass Discount
- `SOURCE_DSIRE:dsire_program_code_title_hash:NY07F:dc27912da9b7` - Local Option - Solar, Wind & Biomass Energy Systems Exemption
- `SOURCE_SDGE_BUSINESS:program_url:sdge_com_residential_savings_center_energy_saving_programs_market_access_program` - Market Access Program (MAP)
- `SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:small-business-efficiency-services` - Small Business Efficiency Services
- `SOURCE_SDGE_BUSINESS:program_url:willdan_com_programs_ceda` - California Energy Design Assistance (CEDA)
- `SOURCE_DSIRE:dsire_program_code_title_hash:NY27R:b7028224c966` - Community Distributed Generation
- `SOURCE_DSIRE:dsire_program_code_title_hash:CT100F:bd5968d14e28` - Connecticut Hydrogen and Electric Automobile Purchase Rebate (CHEAPR)

## Recommended Manual-Review Priorities Before Production Import

1. Review true manual-review rows first: unknown business relevance, no-direct-savings rows, and broad/custom rows with unclear model support.
2. Separately plan V1 gating for `residential_only`, `public_nonprofit_only`, `agriculture_only`, policy-only, tax-context, financing-term, and project-scope queues.
3. Confirm incentive amount/cap fields before production import; current dry-run classification maps value type, not final dollar formulas.

## Recommendation

The full dry run is ready for review/import planning, but not production import. The next step should be human review of true classifier-uncertainty rows, followed by V1 queue planning using `v1_readiness` and `exclusion_or_delay_reason`.
