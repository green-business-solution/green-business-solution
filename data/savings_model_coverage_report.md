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
- Manual review required: 1845
- Manual review not required: 251
- Uncertain opportunities: 1845
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

## Manual Review Required Vs Not Required

| Manual review required | Count | Percent |
| --- | ---: | ---: |
| true | 1845 | 88% |
| false | 251 | 12% |

## Confidence Distribution

| Confidence | Count | Percent |
| --- | ---: | ---: |
| high | 398 | 19% |
| medium | 719 | 34% |
| low | 979 | 47% |

## Uncertain Opportunities

Total uncertain/manual-review records: 1845. Showing the first 200 for review triage.

- `SOURCE_DSIRE:dsire_program_id:5239` - Chicopee Electric Light - Commercial Energy Efficiency Rebate Program: `financing_cash_flow`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:22328` - NextZero EV Charger Program: `fleet_fuel_replacement`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3821` - ConEd - Multifamily Energy Efficiency Incentives Program: `electric_usage_reduction`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:5215` - Xcel Energy (Electric) - Commercial Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:3136` - OTEC - Agricultural Energy Efficiency Rebate Programs: `motor_vfd_efficiency`, medium, relevance `agriculture_only`.
- `SOURCE_DSIRE:dsire_program_id:22805` - Taunton Municipal Lighting Plant - Residential Heat Pump & Zero-Interest Loan: `financing_cash_flow`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:4300` - Consumers Energy (Gas) - Residential Energy Efficiency Program: `whole_building_custom_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22551` - Duke Energy Indiana Off-Peak Charging Credit: `project_cost_reduction_only`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:5313` - USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program: `financing_cash_flow`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:22643` - Illinois - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, low, relevance `unknown`.
- `SOURCE_DSIRE:dsire_program_id:2448` - Connexus Energy - Commercial Energy Efficiency Rebate Programs: `fleet_fuel_replacement`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:4899` - PG&E - Non-Residential Energy Efficiency Rebates: `hvac_electric_efficiency`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:3312` - Minnesota Energy Resources (Gas) - Home Energy Excellence Program for Builders or Homeowners: `controls_building_automation`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:4054` - Sales and Use Tax Exclusion for Advanced Transportation and Alternative Energy Manufacturing Program: `financing_cash_flow`, low, relevance `unknown`.
- `SOURCE_DSIRE:dsire_program_id:22224` - Oregon Clean Vehicle Rebate Program: `fleet_fuel_replacement`, high, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:2684` - Marshall County REMC - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3233` - Renewable Energy Sales and Use Tax Abatement: `sales_or_property_tax_exemption`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3801` - Energy Efficient Schools Initiative - Loans: `financing_cash_flow`, medium, relevance `public_nonprofit_only`.
- `SOURCE_DSIRE:dsire_program_id:4786` - Questar Gas - Home Builder Gas Appliance Rebate Program: `controls_building_automation`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:2097` - Pee Dee Electric Cooperative - Energy Resource Conservation Loan Program: `financing_cash_flow`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:144` - Residential Renewable Energy Income Tax Credit: `tax_benefit_project_cost_reduction`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3968` - Duke Energy Progress - Residential Energy Efficiency Rebate Program: `whole_building_custom_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22591` - C-PACE: Efficiency Maine: `pace_or_on_bill_financing`, high, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:5109` - Local Option - Property Assessed Clean Energy Financing: `pace_or_on_bill_financing`, high, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:5532` - Entergy Arkansas - Agricultural Energy Solutions Program Rebates: `motor_vfd_efficiency`, medium, relevance `agriculture_only`.
- `SOURCE_DSIRE:dsire_program_id:2075` - Cowlitz County PUD - Residential Energy Efficiency Rebate Program: `financing_cash_flow`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:1467` - Evergy - Residential Programmable Thermostat Program: `controls_building_automation`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3947` - Energy Smart - Residential Energy Efficiency Rebate Program (19 Municipalities): `fleet_fuel_replacement`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:5417` - Xcel Energy - Solar*Rewards Program: `net_metering_or_export_value`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:4791` - MassSAVE (Electric) - Commercial New Construction/Major Renovation Program: `commercial_kitchen_equipment_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:4583` - Lodi Electric Utility - Commercial Energy Efficiency Rebate Program: `ev_charging_site_load`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:22703` - Forest Grove Light & Power -  Residential Solar Rebate Program: `net_metering_or_export_value`, low, relevance `residential_only`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-23-404` - GFO-23-404 - Equitable Building Decarbonization Program Direct Install: `grant_funding`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:2004` - PSEG Long Island - Commercial Energy Efficiency Rebate Program: `refrigeration_electric_efficiency`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:160` - Renewable Energy Property Tax Exemption: `sales_or_property_tax_exemption`, low, relevance `unknown`.
- `SOURCE_DSIRE:dsire_program_id:4946` - Property Tax Exemption for Renewable Energy Generation Facilities: `sales_or_property_tax_exemption`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:2896` - Waverly Light & Power - Residential Energy Efficiency Rebates: `ev_charging_site_load`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:5817` - Florida Public Utilities (Gas) - Commercial Energy Efficiency Rebates: `motor_vfd_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:5735` - Small Business & Municipal Loan Program: `financing_cash_flow`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_code_title_hash:NY101F:a3be869e7f79` - Residential Wood Heating Fuel Exemption: `no_direct_savings`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:679` - Sustainable Energy Fund (SEF) Loan Program (PPL Territory): `financing_cash_flow`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:5406` - Utah Commercial PACE financing program: `pace_or_on_bill_financing`, high, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:5723` - Local Option- Renewable Energy Machinery and Tools Property Tax Exemption: `sales_or_property_tax_exemption`, medium, relevance `public_nonprofit_only`.
- `SOURCE_DSIRE:dsire_program_id:3576` - Lake Region Electric Cooperative - Residential Energy Efficiency Rebate Program: `ev_charging_site_load`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:5100` - Residential Energy Efficiency Rebates (Offered by 5 Utilities): `ev_charging_site_load`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:2103` - Mountain View Electric Association, Inc - Energy Efficiency Rebates Program: `refrigeration_electric_efficiency`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:3589` - Haywood EMC - Residential Heat Pump and Weatherization Loan Program: `financing_cash_flow`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:4790` - City of San Diego - Sustainable Building Expedited Permit Program: `program_rule_value_only`, low, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:3342` - Cascade Natural Gas - Conservation Incentives for New and Existing Homes: `program_rule_value_only`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:5141` - Residential Energy Efficiency Rebates (Offered by 12 Utilities): `ev_charging_site_load`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:2239` - Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program: `whole_building_custom_efficiency`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:5853` - Appalachian Power (Electric)- Non-Residential Energy Efficiency Program: `controls_building_automation`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:2132` - Emerald PUD - Residential Energy Efficiency Rebate Program: `financing_cash_flow`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:2905` - Florida Power and Light - Residential Energy Efficiency Program: `program_rule_value_only`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3605` - Duke Energy (Electric) - Residential Energy Efficiency Rebate Program: `whole_building_custom_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22174` - Electric Vehicle Fleet Fee Exemption: `fleet_fuel_replacement`, low, relevance `unknown`.
- `SOURCE_DSIRE:dsire_program_id:22641` - Tennessee  - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, low, relevance `unknown`.
- `SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:commercial-solar-rebate-program` - Commercial Solar Rebate Program: `solar_electric_offset`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:1611` - Alameda Municipal Power - Commercial New Construction Rebate Program: `motor_vfd_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:215` - MDA - Energy Efficiency Revolving Loan Program: `financing_cash_flow`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:2202` - Benton PUD - Residential Energy Efficiency Rebate Programs: `ev_charging_site_load`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:2817` - Gulf Power - Residential Energy Efficiency Programs: `envelope_insulation_savings`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:5682` - Solar Alternative Energy Credits: `renewable_generation_credit_market_value`, low, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:5512` - Commercial Energy Loan Program: `financing_cash_flow`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:1925` - Truckee Donner Public Utility District - Energy Conservation Rebate Program: `ev_charging_site_load`, medium, relevance `mixed`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-23-308` - GFO-23-308 - DC HVAC Nanogrid Module Development and Demonstration: `grant_funding`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:4952` - SoCalGas - Custom Non-Residential Energy Efficiency Program: `commercial_kitchen_equipment_efficiency`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:3357` - Alameda Municipal Power - Residential Energy Efficiency Rebate Program: `solar_electric_offset`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22170` - Driving a Cleaner Illinois Program: `grant_funding`, high, relevance `public_nonprofit_only`.
- `SOURCE_DSIRE:dsire_program_id:22736` - NextZero Residential Battery Rebate Program: `battery_tou_demand_savings`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22494` - Wakefield Municipal Gas & Light Department - Solar Rebate Program: `solar_electric_offset`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:22104` - Black Hills Energy - Residential New Construction Program: `project_cost_reduction_only`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:1232` - Emerald PUD - Residential Energy Efficiency Loan Programs: `financing_cash_flow`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3873` - Duquesne Light Company - Commercial and Industrial Energy Efficiency Program: `refrigeration_electric_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:nonprofit-solar-grant` - Nonprofit Solar Grant: `grant_funding`, medium, relevance `business_relevant`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-23-604` - GFO-23-604 - Improvements in Maintenance Processes for Reliable Operations that are Verifiable and Effective for Hydrogen Refueling Stations (IMPROVE for H2): `grant_funding`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:2478` - Grays Harbor PUD - Residential Energy Efficiency Rebate Program: `whole_building_custom_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22319` - Delmarva - EVsmart: `fleet_fuel_replacement`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:5854` - Lodi Electric Utility - Commercial and Industrial Energy Efficiency Loan Program: `financing_cash_flow`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:1948` - Shakopee Public Utilities - Commercial and Industrial Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:22119` - Brainerd Public Utilities - Residential Energy Efficiency Rebate Program: `whole_building_custom_efficiency`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:5840` - WSHFC Sustainable Energy Program: `financing_cash_flow`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22790` - Solar for Schools Grant Program (S4S): `interconnection_or_grid_access_value`, low, relevance `public_nonprofit_only`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-22-001` - PON-22-001 - Energy Conservation Assistance Act-Education Subaccount (ECAA-Ed) Zero-Interest Loan Program: `financing_cash_flow`, low, relevance `unknown`.
- `SOURCE_DSIRE:dsire_program_id:22537` - Vermont Gas - Residential Energy Efficiency Leasing Program: `gas_usage_reduction`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:4225` - City of Tallahassee Utilities - Efficiency Loans: `financing_cash_flow`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:2948` - City of Boulder - Solar Grant Program: `sales_or_property_tax_exemption`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3901` - Cascade Natural Gas - Commercial Efficiency Rebate Program: `commercial_kitchen_equipment_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:22092` - Sustainable Energy Utility - Commercial and Multifamily Energy Efficiency Rebate Program: `refrigeration_electric_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:5798` - Efficiency Works - Residential Energy Efficiency Rebate Program (Offered by 4 Utilities): `motor_vfd_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:4798` - Mass Save (Electric) - Large Commercial Retrofit Program: `electric_usage_reduction`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:3571` - La Plata Electric Association - Residential Energy Efficiency Rebate Program: `ev_charging_site_load`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:4194` - River Falls Municipal Utilities - Residential Energy Efficiency Rebate Program: `hvac_electric_efficiency`, low, relevance `residential_only`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-23-309` - GFO-23-309 - Virtual Power Plant Approaches for Demand Flexibility (VPP-FLEX): `grant_funding`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:3131` - Idaho Power - Irrigation Efficiency Rewards Program: `motor_vfd_efficiency`, medium, relevance `agriculture_only`.
- `SOURCE_DSIRE:dsire_program_id:3629` - Central Lincoln People's Utility District - Residential Energy Efficiency Rebate Programs: `whole_building_custom_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:81` - Solar and Wind Energy Device Franchise Tax Deduction: `sales_or_property_tax_exemption`, low, relevance `unknown`.
- `SOURCE_DSIRE:dsire_program_id:22369` - Public Service Company of Oklahoma Electric Car Charger Rebate: `ev_charging_site_load`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_code_title_hash:AZ73F:0e0de7e0c2fa` - Arizona – Home Electrification and Appliance Rebate (HEAR) Program: `no_direct_savings`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:2013` - Austin Energy - Commercial Energy Management Rebate Program: `battery_tou_demand_savings`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:421` - Ashland Electric Utility - Photovoltaic Rebate Program: `solar_electric_offset`, medium, relevance `mixed`.
- `SOURCE_SCE_BUSINESS:sce_source_section:56574423e5e2b946:emergency-load-reduction-program-elrp` - Emergency Load Reduction Program (ELRP): `electric_usage_reduction`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:22718` - Colorado - Home Electrification and Appliance Rebate (HEAR) Program: `whole_building_custom_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22585` - Vermont Electric Coop - Heat Pump Bill Credit: `motor_vfd_efficiency`, high, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:4210` - Property Tax Exemption for Residential Renewable Energy Equipment: `sales_or_property_tax_exemption`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:4547` - DTE Energy (Electric) - Commercial and Industrial Energy Efficiency Program: `motor_vfd_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:22270` - Salt River Project - Business EV Charger Rebate: `ev_charging_site_load`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:22590` - Tennessee C-PACER Financing: `pace_or_on_bill_financing`, high, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_code_title_hash:UT43F:c38795d0e130` - Conversion to Alternative Fuel Grant Program: `grant_funding`, low, relevance `unknown`.
- `SOURCE_DSIRE:dsire_program_id:22056` - Empire District Electric (Gas) - Commercial and Industrial Gas Efficiency Program: `commercial_kitchen_equipment_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:2101` - Blue Ridge Electric Cooperative - Heat Pump Loan Program: `financing_cash_flow`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:1407` - Smart-E loans: `financing_cash_flow`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3161` - NIPSCO (Gas & Electric) - Residential Energy Efficiency Program: `whole_building_custom_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22684` - Southern California Regional Energy Network (SoCalREN) - Multifamily Residential Energy Efficiency Rebate Program: `hvac_electric_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22650` - Wisconsin - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, low, relevance `unknown`.
- `SOURCE_DSIRE:dsire_program_id:3622` - City of High Point Electric - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:3904` - National Fuel (Gas) - Commercial Energy Efficiency Program: `commercial_kitchen_equipment_efficiency`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:4853` - Sales and Use Tax Exemption for Residential Solar and Wind Electricity Sales: `net_metering_or_export_value`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22683` - Tri-County Regional Energy Network (3C-REN) - Multifamily Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3187` - Midwest Energy (Gas and Electric) - How$mart Energy Efficiency Finance Program: `financing_cash_flow`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:1543` - Texas-New Mexico Power Company - Residential and Hard-to-Reach Standard Offer Programs: `ev_charging_site_load`, low, relevance `residential_only`.
- `SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:emerging-technologies-grant` - Emerging Technologies Grant: `grant_funding`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:3954` - Southwest Gas Corporation - Residential Energy Efficiency Rebate Program: `project_cost_reduction_only`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:5106` - Sales and Use Tax Exemption for Electrical Generating Equipment: `interconnection_or_grid_access_value`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:2221` - Pearl River Valley Electric Power Association - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22406` - PNM EV Charger Rebate Program: `ev_charging_site_load`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:355` - Illinois Clean Energy Community Foundation Grants: `grant_funding`, medium, relevance `public_nonprofit_only`.
- `SOURCE_DSIRE:dsire_program_id:22060` - Southern Power District - Commercial Energy Efficiency Rebate Programs: `motor_vfd_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:3259` - Hamilton County - Home Improvement Program: `financing_cash_flow`, high, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:4854` - Indianapolis Power & Light - Residential Energy Incentives Program: `whole_building_custom_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3276` - Barron Electric Cooperative - ENERGY STAR Appliance, Energy Efficient Lighting, HVAC and Water Heater Rebate Program: `whole_building_custom_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22633` - Arkansas - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, low, relevance `unknown`.
- `SOURCE_DSIRE:dsire_program_id:5686` - Solar Renewable Energy Credits: `renewable_generation_credit_market_value`, low, relevance `mixed`.
- `SOURCE_SDGE_BUSINESS:program_url:sdge_com_node_19551` - Emergency Load Reduction Program (ELRP): `no_direct_savings`, low, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:22735` - Belmont Light - Battery Storage Rebate Program: `battery_tou_demand_savings`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22156` - Electric Vehicle Income Tax Credit: `tax_benefit_project_cost_reduction`, medium, relevance `mixed`.
- `SOURCE_SDGE_BUSINESS:program_url:comfortablyca_com` - Comfortably CA: `hvac_electric_efficiency`, high, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:1867` - LADWP - Residential Energy Efficiency Rebate Program: `whole_building_custom_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22497` - Town of Ipswich Electric Light Department - Solar PV Rebate Program: `interconnection_or_grid_access_value`, low, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:22222` - Clean-Burning Motor Vehicle Fuel Property Tax Credit - Personal: `tax_benefit_project_cost_reduction`, low, relevance `residential_only`.
- `SOURCE_SILICON_VALLEY_POWER:svp_source_section:ef0850c0e097a7f9:building-operator-certification-training-scholarships` - Building Operator Certification Training Scholarships: `program_rule_value_only`, low, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:22556` - Energize Delaware - Home Energy-Efficiency Loan Program: `financing_cash_flow`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:1968` - Dixie Electric Cooperative - Residential Energy Efficiency Loan Program: `financing_cash_flow`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:4454` - Retro-Commissioning (RCx) Program: `grant_funding`, low, relevance `unknown`.
- `SOURCE_DSIRE:dsire_program_id:4858` - Cedarburg Light & Water Utility - Commercial Shared Savings Loan Program: `financing_cash_flow`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:22344` - Vermont Electric Coop - EV Charging Station Bill Credit: `ev_charging_site_load`, high, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:4886` - Be SMART Home Energy Loan Program: `financing_cash_flow`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:658` - Business Energy Investment Tax Credit (ITC): `interconnection_or_grid_access_value`, low, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:2080` - Franklin County PUD - Energy Efficiency Rebate Program: `controls_building_automation`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3194` - Eau Claire Energy Cooperative - Residential Energy Efficiency Rebate Program: `whole_building_custom_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:1631` - Burbank Water & Power - Business Bucks Energy Efficiency Grant Program: `grant_funding`, medium, relevance `business_relevant`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-23-310` - GFO-23-310 - Non-Energy Impacts and Process Evaluation of Integrated Energy Retrofit Packages in California’s Residential Buildings: `grant_funding`, high, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:4815` - Poudre Valley REA - Energy Efficiency Rebate Program: `fleet_fuel_replacement`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:22217` - Diesel Emissions Reduction Grant Program: `grant_funding`, low, relevance `unknown`.
- `SOURCE_DSIRE:dsire_program_id:5069` - Energy Loan Fund: `financing_cash_flow`, high, relevance `public_nonprofit_only`.
- `SOURCE_DSIRE:dsire_program_id:2207` - Lewis County PUD - Commercial and Industrial Energy Efficiency Rebate Program: `commercial_kitchen_equipment_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:22761` - City and County of Denver - Green Workforce Mini Grant: `grant_funding`, high, relevance `public_nonprofit_only`.
- `SOURCE_DSIRE:dsire_program_id:3838` - El Paso Electric Company - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:1158` - Deduction For Energy-Conserving Investment: `tax_benefit_project_cost_reduction`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:2688` - Dominion Energy - Residential Energy Efficiency Rebate Programs: `motor_vfd_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:5822` - AEP (SWEPCO) - Efficient Products Rebates Program: `ev_charging_site_load`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_code_title_hash:TX100F:59935a21945f` - Light-Duty Motor Vehicle Purchase or Lease Incentive Program: `no_direct_savings`, low, relevance `unknown`.
- `SOURCE_DSIRE:dsire_program_id:22622` - Cleco Power - Commercial EV Rebate: `fleet_fuel_replacement`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:22772` - Leading by Example Solar-Decarbonization Grant Program: `grant_funding`, high, relevance `public_nonprofit_only`.
- `SOURCE_DSIRE:dsire_program_id:2045` - Holy Cross Energy - Residential Energy Efficiency Rebate Program: `whole_building_custom_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3963` - McMinnville Water and Light - Residential Energy Efficiency Rebate Program: `whole_building_custom_efficiency`, low, relevance `residential_only`.
- `SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-301` - GFO-25-301 - Distributed Resources for Innovative Vehicle Energization Strategies (DRIVES): `grant_funding`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:22659` - Oregon - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, low, relevance `unknown`.
- `SOURCE_DSIRE:dsire_program_id:5782` - Cape Light Compact- Residential Energy Efficiency Rebate Program: `whole_building_custom_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:1684` - City of Palo Alto Utilities - Commercial Energy Efficiency Rebate Program: `refrigeration_electric_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:5011` - Orange and Rockland Utilities (Electric) - Energy Efficiency Program: `refrigeration_electric_efficiency`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:22274` - Alameda Municipal Power - Electric Vehicle Rebate Program: `fleet_fuel_replacement`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:5738` - (Electric and Gas) Residential Rebate Program: `whole_building_custom_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22289` - Pasadena Water and Power - Commercial Charger Incentive Program: `ev_charging_site_load`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:5727` - NIPSCO (Gas & Electric) - Commercial & Industrial Energy Efficiency Program: `commercial_kitchen_equipment_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:5235` - North Shore Gas - Residential Rebate Program: `controls_building_automation`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:1941` - Marshall Municipal Utilities - Commercial Energy Efficiency Rebate Program: `commercial_kitchen_equipment_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:2252` - Minnesota Valley Electric Cooperative -Residential Energy Resource Conservation Loan Program: `financing_cash_flow`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:3585` - Empire Electric Association - Residential Energy Efficiency Rebate Program: `ev_charging_site_load`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:4835` - AEP Appalachian Power - Residential Energy Efficiency Rebate Program: `motor_vfd_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:2266` - Diverse Power - Energy Efficient New Construction Rebate Programs: `motor_vfd_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22105` - Black Hills Energy (Electric) - Commercial Energy Efficiency Programs: `project_cost_reduction_only`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:3861` - South River EMC - Residential Energy Efficiency Rebate Program: `whole_building_custom_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22037` - PACE Massachusetts Financing: `pace_or_on_bill_financing`, high, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:22569` - Columbia REA Commercial and Agricultural Efficiency Rebate Program: `whole_building_custom_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:22587` - Green Mountain Power Energy Efficiency Rebates: `hvac_electric_efficiency`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22118` - Florida Keys Electric Cooperative - Solar Loan Program: `financing_cash_flow`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:4477` - Oklahoma City - Green Home Loan Program: `financing_cash_flow`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22658` - North Dakota - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program: `grant_funding`, high, relevance `agriculture_only`.
- `SOURCE_DSIRE:dsire_program_id:2108` - Clay Electric Cooperative, Inc - Energy Conservation Loans: `financing_cash_flow`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:2511` - USDA - Rural Energy for America Program (REAP) Loan Guarantees: `program_rule_value_only`, low, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:2665` - Clark County REMC - Energy Efficiency Rebate Program: `motor_vfd_efficiency`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:22248` - Diesel Emissions Reduction Grants: `grant_funding`, low, relevance `unknown`.
- `SOURCE_DSIRE:dsire_program_id:22323` - Baltimore Gas and Electric - EVsmart Program: `electric_usage_reduction`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:2588` - Spring Valley Public Utilities - Commercial & Industrial Energy Efficiency Rebate Program: `whole_building_custom_efficiency`, medium, relevance `business_relevant`.
- `SOURCE_DSIRE:dsire_program_id:22807` - Taunton Municipal Lighting Plant - EV and Level 2 EV Charging Program: `ev_charging_site_load`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:142` - Local Option - Special Assessment of Wind Energy Devices: `sales_or_property_tax_exemption`, low, relevance `unknown`.
- `SOURCE_DSIRE:dsire_program_id:1596` - Energy Conservation Improvements Property Tax Exemption: `sales_or_property_tax_exemption`, low, relevance `residential_only`.
- `SOURCE_DSIRE:dsire_program_id:22564` - Green Mountain Power Bring Your Own Device Program: `battery_tou_demand_savings`, medium, relevance `mixed`.
- `SOURCE_DSIRE:dsire_program_id:5562` - Summit County - Energy Smart Colorado Energy Efficiency Rebate Program: `tax_benefit_project_cost_reduction`, low, relevance `residential_only`.

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

1. Review all `residential_only`, `mixed`, `public_nonprofit_only`, `agriculture_only`, and `unknown` relevance rows before they can become business matches.
2. Review `whole_building_custom_efficiency` and broad custom C&I rows because project scope controls the actual model.
3. Review tax, market-credit, net-metering/export, interconnection, and program-rule rows before showing financial value to users.
4. Review `no_direct_savings` rows and either add missing taxonomy or keep them out of business-facing recommendations.
5. Confirm incentive amount/cap fields before production import; current dry-run classification maps value type, not final dollar formulas.

## Recommendation

The full dry run is ready for review/import planning, but not production import. The next step should be human review of manual-review queues and a second dry run that writes no production data but stores reviewed classifier decisions as local artifacts.
