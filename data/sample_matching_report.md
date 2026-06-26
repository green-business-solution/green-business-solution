# Sample Matching Report

Generated: 2026-06-26T20:54:03.930Z
Matching date: 2026-06-26T07:48:44.607Z
Visible opportunities evaluated per profile: 1886
Archived opportunities excluded: 210
Sample profiles: 50
Retrofit taxonomy: retrofit-taxonomy-2026-06-25-v1

## Aggregate Status Counts

```json
{
  "eligible_active": 534,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 137,
  "manual_review": 216,
  "ineligible": 93413,
  "unavailable": 0
}
```

## Notes

- Archived/unavailable opportunities are excluded from the visible opportunity set before matching.
- Utility, facility, and availability repairs are stored in the review artifacts and on DynamoDB opportunity records when the writeback script is run with `--write-dynamodb`.
- Source-page research scripts retry HTTP 429, HTTP 5xx, and timeout failures before accepting unresolved review results.
- `likely_eligible` should be treated as a data-quality regression target; this fixture currently has zero such pairings.

## Test Cases

### california-endowment-hq

Owner-controlled nonprofit office headquarters and conference center in LADWP electric territory.

Status counts:

```json
{
  "eligible_active": 20,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 7,
  "ineligible": 1841,
  "unavailable": 0
}
```

Profile: The California Endowment; Nonprofit Organization; Office / Administrative; Los Angeles Department of Water and Power; 1000 N Alameda Street, Los Angeles, CA 90012, USA.

Top retrofit groups: Ground-source / geothermal heat pump (6); Battery storage system (5); Biomass / biogas energy system (5); EV charger installation (5); High-efficiency HVAC replacement (5); LED lighting retrofit (5); Solar water heating system (3); Combined heat and power system (2).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: LADWP - Feed-in Tariff (FiT) Program (SOURCE_DSIRE:dsire_program_id:5685)
  - source: https://programs.dsireusa.org/system/program/detail/5685/ladwp-feed-in-tariff-fit-program
- eligible_active / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - source: https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project
- eligible_active / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - source: https://www.energy.ca.gov/solicitations/2026-05/rfq-25-401-energy-code-compliance-evaluation-support
- eligible_active / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - source: https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess

Common unresolved requirements among promising matches:

- Opportunity appears upcoming; application timing should be verified. (18)
- No project technology was normalized. (6)


### ikea-burbank

Large-format Burbank retail store with showroom, warehouse, restaurant, and EV/solar potential.

Status counts:

```json
{
  "eligible_active": 18,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 6,
  "ineligible": 1844,
  "unavailable": 0
}
```

Profile: IKEA Burbank; Commercial Business; Retail / Storefront; Burbank Water and Power; 600 South IKEA Way, Burbank, CA 91502, USA.

Top retrofit groups: Battery storage system (6); Ground-source / geothermal heat pump (6); High-efficiency HVAC replacement (6); Biomass / biogas energy system (5); EV charger installation (5); LED lighting retrofit (5); Solar water heating system (3); Combined heat and power system (2).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Burbank Water & Power - Energy Solutions Business Rebate Program (SOURCE_DSIRE:dsire_program_id:1630)
  - source: https://programs.dsireusa.org/system/program/detail/1630/burbank-water-and-power-energy-solutions-business-rebate-program
- eligible_active / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - source: https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project
- eligible_active / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - source: https://www.energy.ca.gov/solicitations/2026-05/rfq-25-401-energy-code-compliance-evaluation-support
- eligible_active / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - source: https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess

Common unresolved requirements among promising matches:

- Opportunity appears upcoming; application timing should be verified. (18)
- No project technology was normalized. (6)


### juniper-and-ivy-san-diego

Independent San Diego restaurant and commercial kitchen in SDG&E distribution territory.

Status counts:

```json
{
  "eligible_active": 28,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 15,
  "manual_review": 7,
  "ineligible": 1836,
  "unavailable": 0
}
```

Profile: Juniper & Ivy; Commercial Business; Restaurant / Commercial Kitchen; San Diego Gas & Electric; 2228 Kettner Boulevard, San Diego, CA 92101, USA.

Top retrofit groups: High-efficiency HVAC replacement (8); Ground-source / geothermal heat pump (5); LED lighting retrofit (5); Biomass / biogas energy system (4); Automated demand response controls (3); Battery storage system (3); Combined heat and power system (2); Resilience / backup power system (2).

Top rendered results:

- eligible_active / 100: Comfortably CA (SOURCE_SDGE_BUSINESS:program_url:comfortablyca_com)
  - source: https://www.sdge.com/business/save-energy-and-money
- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: GRID-Lodging (SOURCE_SDGE_BUSINESS:program_url:mendotagroup_com_sdge_grid_lodging)
  - source: https://www.sdge.com/business/save-energy-and-money
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: SD Energy Edge (SOURCE_SDGE_BUSINESS:program_url:sdenergyedge_com)
  - source: https://www.sdge.com/business/save-energy-and-money
- eligible_active / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - source: https://www.energy.ca.gov/solicitations/2026-05/rfq-25-401-energy-code-compliance-evaluation-support

Common unresolved requirements among promising matches:

- Opportunity appears upcoming; application timing should be verified. (15)
- No project technology was normalized. (6)


### northgate-market-anaheim

Anaheim full-service grocery store with refrigeration, HVAC, lighting, and food-prep loads.

Status counts:

```json
{
  "eligible_active": 22,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 6,
  "ineligible": 1840,
  "unavailable": 0
}
```

Profile: Northgate Gonzalez Market #40; Commercial Business; Grocery / Convenience / Cold Storage; Anaheim Public Utilities; 2030 E Lincoln Avenue, Anaheim, CA 92806, USA.

Top retrofit groups: EV charger installation (8); High-efficiency HVAC replacement (7); Ground-source / geothermal heat pump (6); LED lighting retrofit (6); Battery storage system (5); Biomass / biogas energy system (5); Level 2 EV charger installation (3); Solar water heating system (3).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Anaheim Public Utilities - Small Business Energy & Water Direct Install Program (SOURCE_DSIRE:dsire_program_id:1625)
  - source: https://programs.dsireusa.org/system/program/detail/1625/anaheim-public-utilities-small-business-energy-and-water-direct-install-program
- eligible_active / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - source: https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project
- eligible_active / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - source: https://www.energy.ca.gov/solicitations/2026-05/rfq-25-401-energy-code-compliance-evaluation-support
- eligible_active / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - source: https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess

Common unresolved requirements among promising matches:

- Opportunity appears upcoming; application timing should be verified. (18)
- No project technology was normalized. (6)


### melissas-vernon-distribution

Vernon refrigerated produce distribution and packing facility served by municipal electric and gas utilities.

Status counts:

```json
{
  "eligible_active": 17,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 17,
  "manual_review": 6,
  "ineligible": 1846,
  "unavailable": 0
}
```

Profile: Melissa's / World Variety Produce; Industrial Facility; Warehouse / Industrial Space; Vernon Public Utilities; 5325 S Soto Street, Vernon, CA 90058, USA.

Top retrofit groups: Ground-source / geothermal heat pump (6); Battery storage system (5); Biomass / biogas energy system (5); EV charger installation (5); High-efficiency HVAC replacement (4); LED lighting retrofit (4); Solar water heating system (3); Combined heat and power system (2).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - source: https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project
- eligible_active / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - source: https://www.energy.ca.gov/solicitations/2026-05/rfq-25-401-energy-code-compliance-evaluation-support
- eligible_active / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - source: https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess
- eligible_active / 100: San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105)
  - source: https://programs.dsireusa.org/system/program/detail/1105/san-diego-county-green-building-program

Common unresolved requirements among promising matches:

- Opportunity appears upcoming; application timing should be verified. (17)
- No project technology was normalized. (6)


### fender-corona-plant

Corona musical-instrument manufacturing plant in SCE electric and SoCalGas gas territory.

Status counts:

```json
{
  "eligible_active": 12,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 5,
  "manual_review": 8,
  "ineligible": 1861,
  "unavailable": 0
}
```

Profile: Fender Musical Instruments Corporation - Corona Manufacturing Plant; Industrial Facility; Industrial / Manufacturing; Southern California Edison; 311 Cessna Circle, Corona, CA 92880, USA.

Top retrofit groups: Biomass / biogas energy system (6); Ground-source / geothermal heat pump (5); Battery storage system (4); Combined heat and power system (2); High-efficiency HVAC replacement (2); Small wind turbine (2); Solar water heating system (2); Energy audit (1).

Top rendered results:

- eligible_active / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - source: https://programs.dsireusa.org/system/program/detail/5313/usda-biorefinery-renewable-chemical-and-biobased-product-manufacturing-assistance-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Self-Generation Incentive Program (SOURCE_DSIRE:dsire_program_id:552)
  - source: https://programs.dsireusa.org/system/program/detail/552/self-generation-incentive-program
- eligible_active / 100: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - source: https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite
- eligible_active / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - source: https://programs.dsireusa.org/system/program/detail/3071/u-s-department-of-energy-loan-guarantee-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants

Common unresolved requirements among promising matches:

- Opportunity appears upcoming; application timing should be verified. (5)
- No project technology was normalized. (2)


### westin-pasadena

Full-service Pasadena hotel and conference venue in Pasadena Water and Power electric territory.

Status counts:

```json
{
  "eligible_active": 19,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 6,
  "ineligible": 1843,
  "unavailable": 0
}
```

Profile: The Westin Pasadena; Commercial Business; Hotel / Hospitality; Pasadena Water and Power; 191 N Los Robles Avenue, Pasadena, CA 91101, USA.

Top retrofit groups: EV charger installation (6); Ground-source / geothermal heat pump (6); High-efficiency HVAC replacement (6); Battery storage system (5); Biomass / biogas energy system (5); LED lighting retrofit (5); Solar water heating system (3); Combined heat and power system (2).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: Pasadena Water and Power - Commercial Charger Incentive Program (SOURCE_DSIRE:dsire_program_id:22289)
  - source: https://programs.dsireusa.org/system/program/detail/22289/pasadena-water-and-power-commercial-charger-incentive-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - source: https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project
- eligible_active / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - source: https://www.energy.ca.gov/solicitations/2026-05/rfq-25-401-energy-code-compliance-evaluation-support
- eligible_active / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - source: https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess

Common unresolved requirements among promising matches:

- Opportunity appears upcoming; application timing should be verified. (18)
- No project technology was normalized. (6)


### one-community-health-midtown

Sacramento nonprofit community health center with SMUD electric service and PG&E gas service.

Status counts:

```json
{
  "eligible_active": 21,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 18,
  "manual_review": 7,
  "ineligible": 1840,
  "unavailable": 0
}
```

Profile: One Community Health - Midtown Campus; Nonprofit Organization; Medical / Healthcare; Sacramento Municipal Utility District; 1500 21st Street, Sacramento, CA 95811, USA.

Top retrofit groups: EV charger installation (7); Battery storage system (6); Ground-source / geothermal heat pump (6); High-efficiency HVAC replacement (6); Biomass / biogas energy system (5); LED lighting retrofit (5); Combined heat and power system (3); Solar water heating system (3).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607)
  - source: https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project
- eligible_active / 100: RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401)
  - source: https://www.energy.ca.gov/solicitations/2026-05/rfq-25-401-energy-code-compliance-evaluation-support
- eligible_active / 100: PON-17-401 - Financing for Energy Efficiency and Renewable Energy Generation Projects (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-17-401)
  - source: https://www.energy.ca.gov/solicitations/2019-04/pon-17-401-financing-energy-efficiency-and-renewable-energy-generation
- eligible_active / 100: GFO-25-605 – Reliable Electric Charging for Eligible School-bus Sites (RECESS) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605)
  - source: https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess

Common unresolved requirements among promising matches:

- Opportunity appears upcoming; application timing should be verified. (18)
- No project technology was normalized. (6)


### santa-clara-university-campus

Large nonprofit university campus in Silicon Valley Power electric territory.

Status counts:

```json
{
  "eligible_active": 19,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 5,
  "manual_review": 6,
  "ineligible": 1856,
  "unavailable": 0
}
```

Profile: Santa Clara University; Nonprofit Organization; School / Education Campus; Silicon Valley Power; 500 El Camino Real, Santa Clara, CA 95053, USA.

Top retrofit groups: High-efficiency HVAC replacement (9); Low-flow fixture retrofit (6); Ground-source / geothermal heat pump (5); LED lighting retrofit (5); Battery storage system (4); Biomass / biogas energy system (4); Combined heat and power system (3); Energy management system (2).

Top rendered results:

- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: PON-17-401 - Financing for Energy Efficiency and Renewable Energy Generation Projects (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-17-401)
  - source: https://www.energy.ca.gov/solicitations/2019-04/pon-17-401-financing-energy-efficiency-and-renewable-energy-generation
- eligible_active / 100: Silicon Valley Power - Emerging Technologies Grant Program (SOURCE_DSIRE:dsire_program_id:22068)
  - source: https://programs.dsireusa.org/system/program/detail/22068/silicon-valley-power-emerging-technologies-grant-program
- eligible_active / 100: GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608)
  - source: https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-hub-outreach-messaging-and-equipment-ev-home
- eligible_active / 100: Energy Design Assistance (SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:energy-design-assistance)
  - source: https://www.siliconvalleypower.com/businesses/save-money
- eligible_active / 100: PON-24-002 - K–12 Energy Efficiency Program (KTEP) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:PON-24-002)
  - source: https://www.energy.ca.gov/solicitations/2025-04/pon-24-002-k-12-energy-efficiency-program-ktep

Common unresolved requirements among promising matches:

- Opportunity appears upcoming; application timing should be verified. (5)
- No project technology was normalized. (2)


### seghesio-healdsburg-winery

Healdsburg winery and tasting-room operation in a small municipal electric territory.

Status counts:

```json
{
  "eligible_active": 9,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 5,
  "manual_review": 7,
  "ineligible": 1865,
  "unavailable": 0
}
```

Profile: Seghesio Family Vineyards; Agricultural Operation; Industrial / Manufacturing; City of Healdsburg Electric Utility; 700 Grove Street, Healdsburg, CA 95448, USA.

Top retrofit groups: Biomass / biogas energy system (5); Ground-source / geothermal heat pump (5); Battery storage system (3); High-efficiency HVAC replacement (2); Solar water heating system (2); Combined heat and power system (1); Engineering feasibility study (1); Insulation upgrade (1).

Top rendered results:

- eligible_active / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - source: https://programs.dsireusa.org/system/program/detail/5313/usda-biorefinery-renewable-chemical-and-biobased-product-manufacturing-assistance-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308)
  - source: https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite
- eligible_active / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - source: https://programs.dsireusa.org/system/program/detail/3071/u-s-department-of-energy-loan-guarantee-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Local Option - Municipal Energy Districts (SOURCE_DSIRE:dsire_program_id:3527)
  - source: https://programs.dsireusa.org/system/program/detail/3527/local-option-municipal-energy-districts

Common unresolved requirements among promising matches:

- Opportunity appears upcoming; application timing should be verified. (5)
- No project technology was normalized. (2)


### via-verde-bronx-renter-household

Anonymized renter household in Bronx mixed-income multifamily housing with ConEd electric and gas service.

Status counts:

```json
{
  "eligible_active": 11,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 11,
  "ineligible": 1864,
  "unavailable": 0
}
```

Profile: Anonymized renter household at Via Verde; Residential; Multifamily / Apartment Building; Consolidated Edison Company of New York; 700 Brook Avenue, Bronx, NY 10455, USA.

Top retrofit groups: Rooftop solar PV (4); High-efficiency HVAC replacement (3); Heat pump HVAC retrofit (2); Insulation upgrade (2); Solar water heating system (2); Air sealing / weatherization (1); Automated demand response controls (1); Battery storage system (1).

Top rendered results:

- eligible_active / 100: ConEd - Multifamily Energy Efficiency Incentives Program (SOURCE_DSIRE:dsire_program_id:3821)
  - source: https://programs.dsireusa.org/system/program/detail/3821/coned-multifamily-energy-efficiency-incentives-program
- eligible_active / 100: Energy-Efficient Mortgages (SOURCE_DSIRE:dsire_program_id:742)
  - source: https://programs.dsireusa.org/system/program/detail/742/energy-efficient-mortgages
- eligible_active / 100: NYSERDA -  Residential Financing Options (SOURCE_DSIRE:dsire_program_id:4563)
  - source: https://programs.dsireusa.org/system/program/detail/4563/nyserda-residential-financing-options
- eligible_active / 100: New York City - Residential Solar Sales Tax Exemption (SOURCE_DSIRE:dsire_program_id:4703)
  - source: https://programs.dsireusa.org/system/program/detail/4703/new-york-city-residential-solar-sales-tax-exemption
- eligible_active / 100: Town of Babylon - Long Island Green Homes Program (SOURCE_DSIRE:dsire_program_id:3652)
  - source: https://programs.dsireusa.org/system/program/detail/3652/town-of-babylon-long-island-green-homes-program
- eligible_active / 100: NYSERDA Residential and Retail Energy Storage Incentive Program (SOURCE_DSIRE:dsire_program_id:22098)
  - source: https://programs.dsireusa.org/system/program/detail/22098/nyserda-residential-and-retail-energy-storage-incentive-program


### hoa-mai-gardens-seattle-household

Anonymized household in Seattle public housing with municipal electric service.

Status counts:

```json
{
  "eligible_active": 3,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 3,
  "ineligible": 1880,
  "unavailable": 0
}
```

Profile: Anonymized household at Hoa Mai Gardens; Residential; Multifamily / Apartment Building; Seattle City Light; 221 10th Avenue S, Seattle, WA 98104, USA.

Top retrofit groups: Heat pump HVAC retrofit (1); Heat pump water heater (1); High-efficiency HVAC replacement (1); Insulation upgrade (1); EV charger installation (1); Level 2 EV charger installation (1); Window replacement (1).

Top rendered results:

- eligible_active / 100: Richland Energy Services - Residential Energy Conservation & Solar Loan Program (SOURCE_DSIRE:dsire_program_id:2512)
  - source: https://programs.dsireusa.org/system/program/detail/2512/richland-energy-services-residential-energy-conservation-and-solar-loan-program
- eligible_active / 100: Energy-Efficient Mortgages (SOURCE_DSIRE:dsire_program_id:742)
  - source: https://programs.dsireusa.org/system/program/detail/742/energy-efficient-mortgages
- eligible_active / 100: Richland Energy Services - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2837)
  - source: https://programs.dsireusa.org/system/program/detail/2837/richland-energy-services-residential-energy-efficiency-rebate-program


### tapiz-mariposa-denver-household

Anonymized senior or disabled household in Denver public multifamily housing.

Status counts:

```json
{
  "eligible_active": 12,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 6,
  "ineligible": 1868,
  "unavailable": 0
}
```

Profile: Anonymized senior or disabled household at Tapiz at Mariposa; Residential; Multifamily / Apartment Building; Xcel Energy; 1099 Osage Street, Denver, CO 80204, USA.

Top retrofit groups: High-efficiency HVAC replacement (8); Air sealing / weatherization (6); Insulation upgrade (5); Ground-source / geothermal heat pump (4); Heat pump HVAC retrofit (4); Heat pump water heater (4); Rooftop solar PV (4); EV charger installation (3).

Top rendered results:

- eligible_active / 100: Colorado - Home Electrification and Appliance Rebate (HEAR) Program (SOURCE_DSIRE:dsire_program_id:22718)
  - source: https://programs.dsireusa.org/system/program/detail/22718/colorado-home-electrification-and-appliance-rebate-hear-program
- eligible_active / 100: Colorado Residential Energy Upgrade (RENU) Loan program (SOURCE_DSIRE:dsire_program_id:5349)
  - source: https://programs.dsireusa.org/system/program/detail/5349/colorado-residential-energy-upgrade-renu-loan-program
- eligible_active / 100: Energy-Efficient Mortgages (SOURCE_DSIRE:dsire_program_id:742)
  - source: https://programs.dsireusa.org/system/program/detail/742/energy-efficient-mortgages
- eligible_active / 100: Boulder County - EnergySmart Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4630)
  - source: https://programs.dsireusa.org/system/program/detail/4630/boulder-county-energysmart-residential-energy-efficiency-rebate-program
- eligible_active / 100: Energy Smart Colorado Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5565)
  - source: https://programs.dsireusa.org/system/program/detail/5565/energy-smart-colorado-energy-efficiency-rebate-program
- eligible_active / 100: Xcel Energy - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:1581)
  - source: https://programs.dsireusa.org/system/program/detail/1581/xcel-energy-residential-energy-efficiency-rebate-programs


### keauhou-lane-honolulu-renter

Anonymized workforce-housing household in a mixed-use Honolulu multifamily building.

Status counts:

```json
{
  "eligible_active": 6,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 4,
  "ineligible": 1876,
  "unavailable": 0
}
```

Profile: Anonymized workforce-housing household at Keauhou Lane; Residential; Mixed-use; Hawaiian Electric; 502 Keawe Street, Honolulu, HI 96813, USA.

Top retrofit groups: Solar water heating system (4); Biomass / biogas energy system (3); Ground-source / geothermal heat pump (3); Rooftop solar PV (2); Battery storage system (1); Combined heat and power system (1); High-efficiency HVAC replacement (1); LED lighting retrofit (1).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Solar Water Heater Rebate (SOURCE_DSIRE:dsire_program_id:506)
  - source: https://programs.dsireusa.org/system/program/detail/506/solar-water-heater-rebate
- eligible_active / 100: Solar and Wind Energy Credit (Personal) (SOURCE_DSIRE:dsire_program_id:50)
  - source: https://programs.dsireusa.org/system/program/detail/50/solar-and-wind-energy-credit-personal
- eligible_active / 100: Solar and Wind Energy Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:49)
  - source: https://programs.dsireusa.org/system/program/detail/49/solar-and-wind-energy-credit-corporate
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants


### the-rose-minneapolis-household

Anonymized mixed-income multifamily household in Minneapolis with Xcel electric and CenterPoint gas.

Status counts:

```json
{
  "eligible_active": 12,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 3,
  "ineligible": 1871,
  "unavailable": 0
}
```

Profile: Anonymized household at The Rose; Residential; Multifamily / Apartment Building; Xcel Energy; 1928 Portland Avenue S, Minneapolis, MN 55404, USA.

Top retrofit groups: High-efficiency HVAC replacement (6); Heat pump HVAC retrofit (5); Heat pump water heater (4); High-efficiency refrigeration equipment (4); Rooftop solar PV (4); EV charger installation (3); Ground-source / geothermal heat pump (3); High-efficiency commercial dishwasher (3).

Top rendered results:

- eligible_active / 100: Xcel Energy - Solar*Rewards Program (SOURCE_DSIRE:dsire_program_id:5417)
  - source: https://programs.dsireusa.org/system/program/detail/5417/xcel-energy-solar-rewards-program
- eligible_active / 100: Energy-Efficient Mortgages (SOURCE_DSIRE:dsire_program_id:742)
  - source: https://programs.dsireusa.org/system/program/detail/742/energy-efficient-mortgages
- eligible_active / 100: East Central Energy - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2258)
  - source: https://programs.dsireusa.org/system/program/detail/2258/east-central-energy-residential-energy-efficiency-rebate-program
- eligible_active / 100: Princeton PUC - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2555)
  - source: https://programs.dsireusa.org/system/program/detail/2555/princeton-puc-residential-energy-efficiency-rebate-program
- eligible_active / 100: Grand Marais PUC - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2539)
  - source: https://programs.dsireusa.org/system/program/detail/2539/grand-marais-puc-residential-energy-efficiency-rebate-program
- eligible_active / 100: MMPA - Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4740)
  - source: https://programs.dsireusa.org/system/program/detail/4740/mmpa-residential-energy-efficiency-program


### bens-chili-bowl-dc

Small urban DC restaurant and commercial kitchen in Pepco electric and Washington Gas territory.

Status counts:

```json
{
  "eligible_active": 6,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 0,
  "ineligible": 1880,
  "unavailable": 0
}
```

Profile: Ben's Chili Bowl - U Street Location; Commercial Business; Restaurant / Commercial Kitchen; Pepco; 1213 U Street NW, Washington, DC 20009, USA.

Top retrofit groups: Biomass / biogas energy system (4); Ground-source / geothermal heat pump (4); LED lighting retrofit (4); High-efficiency HVAC replacement (3); Combined heat and power system (2); Solar water heating system (2); Battery storage system (1); Energy audit (1).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: District of Columbia Property Assessed Clean Energy Financing (SOURCE_DSIRE:dsire_program_id:4206)
  - source: https://programs.dsireusa.org/system/program/detail/4206/district-of-columbia-property-assessed-clean-energy-financing
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs
- eligible_active / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - source: https://programs.dsireusa.org/system/program/detail/1271/energy-efficient-commercial-buildings-tax-deduction


### zingermans-deli-ann-arbor

Ann Arbor deli, restaurant, specialty grocery, and refrigeration-heavy food retail site.

Status counts:

```json
{
  "eligible_active": 7,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 5,
  "ineligible": 1874,
  "unavailable": 0
}
```

Profile: Zingerman's Delicatessen; Commercial Business; Restaurant / Commercial Kitchen; DTE Electric; 422 Detroit Street, Ann Arbor, MI 48104, USA.

Top retrofit groups: Ground-source / geothermal heat pump (5); LED lighting retrofit (4); Biomass / biogas energy system (4); High-efficiency HVAC replacement (3); Solar water heating system (3); Combined heat and power system (2); EV charger installation (1); High-efficiency refrigeration equipment (1).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Michigan Saves - Business Energy Financing (SOURCE_DSIRE:dsire_program_id:4633)
  - source: https://programs.dsireusa.org/system/program/detail/4633/michigan-saves-business-energy-financing
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs
- eligible_active / 100: Michigan Local PACE Program (SOURCE_DSIRE:dsire_program_id:4521)
  - source: https://programs.dsireusa.org/system/program/detail/4521/michigan-local-pace-program


### big-dipper-missoula

Small Missoula ice-cream shop with freezer and refrigeration loads.

Status counts:

```json
{
  "eligible_active": 11,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 0,
  "ineligible": 1875,
  "unavailable": 0
}
```

Profile: Big Dipper Ice Cream - Missoula; Commercial Business; Restaurant / Commercial Kitchen; NorthWestern Energy; 631 S Higgins Avenue, Missoula, MT 59801, USA.

Top retrofit groups: Biomass / biogas energy system (5); Ground-source / geothermal heat pump (5); LED lighting retrofit (5); High-efficiency HVAC replacement (4); Insulation upgrade (3); Solar water heating system (3); Combined heat and power system (2); Low-flow fixture retrofit (2).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: Deduction For Energy-Conserving Investment (SOURCE_DSIRE:dsire_program_id:1158)
  - source: https://programs.dsireusa.org/system/program/detail/1158/deduction-for-energy-conserving-investment
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Renewable Energy Systems Exemption (SOURCE_DSIRE:dsire_program_id:154)
  - source: https://programs.dsireusa.org/system/program/detail/154/renewable-energy-systems-exemption
- eligible_active / 100: NorthWestern Energy (Gas) - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5007)
  - source: https://programs.dsireusa.org/system/program/detail/5007/northwestern-energy-gas-commercial-energy-efficiency-rebate-program
- eligible_active / 100: NorthWestern Energy (Electric) - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1658)
  - source: https://programs.dsireusa.org/system/program/detail/1658/northwestern-energy-electric-commercial-energy-efficiency-rebate-program


### burlington-beer-company

Vermont craft brewery, restaurant, and taproom in Burlington Electric territory.

Status counts:

```json
{
  "eligible_active": 8,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 4,
  "ineligible": 1874,
  "unavailable": 0
}
```

Profile: Burlington Beer Company; Commercial Business; Industrial / Manufacturing; Burlington Electric Department; 180 Flynn Avenue, Burlington, VT 05401, USA.

Top retrofit groups: Biomass / biogas energy system (5); Ground-source / geothermal heat pump (3); Combined heat and power system (2); LED lighting retrofit (2); Solar water heating system (2); Engineering feasibility study (1); EV charger installation (1); High-efficiency HVAC replacement (1).

Top rendered results:

- eligible_active / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - source: https://programs.dsireusa.org/system/program/detail/5313/usda-biorefinery-renewable-chemical-and-biobased-product-manufacturing-assistance-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Local Option - Property Tax Exemption (SOURCE_DSIRE:dsire_program_id:45)
  - source: https://programs.dsireusa.org/system/program/detail/45/local-option-property-tax-exemption
- eligible_active / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - source: https://programs.dsireusa.org/system/program/detail/3071/u-s-department-of-energy-loan-guarantee-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs


### bluebird-cafe-nashville

Small Nashville restaurant, cafe, and live music venue with recent gas utility name-change edge case.

Status counts:

```json
{
  "eligible_active": 6,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 1,
  "ineligible": 1879,
  "unavailable": 0
}
```

Profile: The Bluebird Cafe; Commercial Business; Restaurant / Commercial Kitchen; Nashville Electric Service; 4104 Hillsboro Pike, Nashville, TN 37215, USA.

Top retrofit groups: Biomass / biogas energy system (4); Ground-source / geothermal heat pump (4); LED lighting retrofit (4); High-efficiency HVAC replacement (3); Combined heat and power system (2); Solar water heating system (2); Thermal energy storage (2); Battery storage system (1).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs
- eligible_active / 100: TVA - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22126)
  - source: https://programs.dsireusa.org/system/program/detail/22126/tva-commercial-energy-efficiency-rebate-program
- eligible_active / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - source: https://programs.dsireusa.org/system/program/detail/1271/energy-efficient-commercial-buildings-tax-deduction


### la-montanita-nob-hill-albuquerque

Albuquerque grocery co-op with refrigeration and prepared-food loads.

Status counts:

```json
{
  "eligible_active": 10,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 1,
  "ineligible": 1875,
  "unavailable": 0
}
```

Profile: La Montanita Co-op - Nob Hill; Commercial Business; Grocery / Convenience / Cold Storage; Public Service Company of New Mexico; 3500 Central Avenue SE, Albuquerque, NM 87106, USA.

Top retrofit groups: Solar water heating system (7); Ground-source / geothermal heat pump (5); Rooftop solar PV (5); Biomass / biogas energy system (4); LED lighting retrofit (3); Combined heat and power system (2); High-efficiency HVAC replacement (2); LEED certification (2).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Gross Receipts Tax Exemption for Sales of Wind and Solar Systems to Government Entities (SOURCE_DSIRE:dsire_program_id:3980)
  - source: https://programs.dsireusa.org/system/program/detail/3980/gross-receipts-tax-exemption-for-sales-of-wind-and-solar-systems-to-government-entities
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs
- eligible_active / 100: Local Option - Renewable Energy Financing District/Solar Energy Improvement Special Assessments (SOURCE_DSIRE:dsire_program_id:3532)
  - source: https://programs.dsireusa.org/system/program/detail/3532/local-option-renewable-energy-financing-district-solar-energy-improvement-special-assessments


### food-bank-rockies-aurora-dc

Aurora nonprofit food distribution center with cold storage, fleet, warehouse, and solar/storage potential.

Status counts:

```json
{
  "eligible_active": 19,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 6,
  "ineligible": 1861,
  "unavailable": 0
}
```

Profile: Food Bank of the Rockies - Denver Metro Distribution Center; Nonprofit Organization; Warehouse / Logistics; Xcel Energy; 20600 E 38th Avenue, Aurora, CO 80019, USA.

Top retrofit groups: Ground-source / geothermal heat pump (8); High-efficiency HVAC replacement (6); Biomass / biogas energy system (5); LED lighting retrofit (5); Battery storage system (4); Heat pump HVAC retrofit (4); EV charger installation (3); Level 2 EV charger installation (3).

Top rendered results:

- eligible_active / 100: City and County of Denver - Building Electrification Retrofit Pilot (SOURCE_DSIRE:dsire_program_id:22757)
  - source: https://programs.dsireusa.org/system/program/detail/22757/city-and-county-of-denver-building-electrification-retrofit-pilot
- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: Poudre Valley REA - Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4815)
  - source: https://programs.dsireusa.org/system/program/detail/4815/poudre-valley-rea-energy-efficiency-rebate-program
- eligible_active / 100: City and County of Denver - Green Workforce Mini Grant (SOURCE_DSIRE:dsire_program_id:22761)
  - source: https://programs.dsireusa.org/system/program/detail/22761/city-and-county-of-denver-green-workforce-mini-grant
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Xcel Energy - Solar*Rewards Program (SOURCE_DSIRE:dsire_program_id:1255)
  - source: https://programs.dsireusa.org/system/program/detail/1255/xcel-energy-solar-rewards-program


### eastern-market-detroit

Detroit nonprofit public market district with multi-building vendor, event, food, and common-area loads.

Status counts:

```json
{
  "eligible_active": 11,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 9,
  "ineligible": 1866,
  "unavailable": 0
}
```

Profile: Eastern Market Partnership; Nonprofit Organization; Mixed-use; DTE Electric; 2934 Russell Street, Detroit, MI 48207, USA.

Top retrofit groups: Biomass / biogas energy system (6); Ground-source / geothermal heat pump (5); LED lighting retrofit (4); High-efficiency HVAC replacement (3); Solar water heating system (4); Combined heat and power system (3); EV charger installation (2); Battery storage system (2).

Top rendered results:

- eligible_active / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - source: https://programs.dsireusa.org/system/program/detail/5313/usda-biorefinery-renewable-chemical-and-biobased-product-manufacturing-assistance-program
- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Nonrefundable Business Activity Tax Credit (SOURCE_DSIRE:dsire_program_id:333)
  - source: https://programs.dsireusa.org/system/program/detail/333/nonrefundable-business-activity-tax-credit
- eligible_active / 100: Charge Up Michigan Program (SOURCE_DSIRE:dsire_program_id:22193)
  - source: https://programs.dsireusa.org/system/program/detail/22193/charge-up-michigan-program
- eligible_active / 100: Michigan Saves - Business Energy Financing (SOURCE_DSIRE:dsire_program_id:4633)
  - source: https://programs.dsireusa.org/system/program/detail/4633/michigan-saves-business-energy-financing


### okc-national-memorial-museum

Oklahoma City nonprofit museum and memorial with public visitor, exhibit, event, and office loads.

Status counts:

```json
{
  "eligible_active": 7,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 2,
  "ineligible": 1877,
  "unavailable": 0
}
```

Profile: Oklahoma City National Memorial & Museum; Nonprofit Organization; Public Institution; Oklahoma Gas & Electric; 620 N Harvey Avenue, Oklahoma City, OK 73102, USA.

Top retrofit groups: Biomass / biogas energy system (3); Ground-source / geothermal heat pump (3); EV charger installation (2); High-efficiency HVAC replacement (2); LED lighting retrofit (2); Building benchmarking compliance (1); Combined heat and power system (1); Energy audit (1).

Top rendered results:

- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: OG&E - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3639)
  - source: https://programs.dsireusa.org/system/program/detail/3639/og-and-e-commercial-energy-efficiency-rebate-programs
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs
- eligible_active / 100: Electric Vehicle Tax Credit (SOURCE_DSIRE:dsire_program_id:22425)
  - source: https://programs.dsireusa.org/system/program/detail/22425/electric-vehicle-tax-credit
- eligible_active / 100: Local Option - County Energy District Authority (SOURCE_DSIRE:dsire_program_id:3534)
  - source: https://programs.dsireusa.org/system/program/detail/3534/local-option-county-energy-district-authority


### museum-life-science-durham

Durham nonprofit science museum campus with indoor exhibits, outdoor water use, cafe, and animal-care loads.

Status counts:

```json
{
  "eligible_active": 8,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 3,
  "ineligible": 1875,
  "unavailable": 0
}
```

Profile: Museum of Life and Science; Nonprofit Organization; Public Institution; Duke Energy Progress; 433 W Murray Avenue, Durham, NC 27704, USA.

Top retrofit groups: Biomass / biogas energy system (3); Ground-source / geothermal heat pump (3); LED lighting retrofit (2); Combined heat and power system (1); Efficient air compressor (1); High-efficiency HVAC replacement (1); High-efficiency refrigeration equipment (1); Insulation upgrade (1).

Top rendered results:

- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Active Solar Heating and Cooling Systems Exemption (SOURCE_DSIRE:dsire_program_id:183)
  - source: https://programs.dsireusa.org/system/program/detail/183/active-solar-heating-and-cooling-systems-exemption
- eligible_active / 100: Property Tax Abatement for Solar Electric Systems (SOURCE_DSIRE:dsire_program_id:3036)
  - source: https://programs.dsireusa.org/system/program/detail/3036/property-tax-abatement-for-solar-electric-systems
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Duke Energy - Non-Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3466)
  - source: https://programs.dsireusa.org/system/program/detail/3466/duke-energy-non-residential-energy-efficiency-rebate-program
- eligible_active / 100: SystemVision Energy Guarantee Program (SOURCE_DSIRE:dsire_program_id:3541)
  - source: https://programs.dsireusa.org/system/program/detail/3541/systemvision-energy-guarantee-program


### portland-food-coop-maine

Portland Maine urban grocery co-op with refrigeration and cold-climate gas utility ambiguity.

Status counts:

```json
{
  "eligible_active": 11,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 2,
  "ineligible": 1873,
  "unavailable": 0
}
```

Profile: Portland Food Co-op; Commercial Business; Grocery / Convenience / Cold Storage; Central Maine Power; 290 Congress Street, Portland, ME 04101, USA.

Top retrofit groups: Biomass / biogas energy system (5); High-efficiency HVAC replacement (5); Ground-source / geothermal heat pump (4); LED lighting retrofit (4); Combined heat and power system (2); Heat pump HVAC retrofit (2); Solar water heating system (2); Air sealing / weatherization (1).

Top rendered results:

- eligible_active / 100: C-PACE: Efficiency Maine (SOURCE_DSIRE:dsire_program_id:22591)
  - source: https://programs.dsireusa.org/system/program/detail/22591/c-pace-efficiency-maine
- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Small Business Energy Loans (SOURCE_DSIRE:dsire_program_id:22716)
  - source: https://programs.dsireusa.org/system/program/detail/22716/small-business-energy-loans
- eligible_active / 100: Efficiency Maine Appliance Rebate Program (SOURCE_DSIRE:dsire_program_id:5324)
  - source: https://programs.dsireusa.org/system/program/detail/5324/efficiency-maine-appliance-rebate-program
- eligible_active / 100: Efficiency Maine Commercial and Industrial Prescriptive Program (SOURCE_DSIRE:dsire_program_id:1144)
  - source: https://programs.dsireusa.org/system/program/detail/1144/efficiency-maine-commercial-and-industrial-prescriptive-program


### phipps-conservatory-pittsburgh

Pittsburgh nonprofit botanical conservatory with greenhouse, humidity, water, exhibit, and visitor loads.

Status counts:

```json
{
  "eligible_active": 7,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 5,
  "ineligible": 1874,
  "unavailable": 0
}
```

Profile: Phipps Conservatory and Botanical Gardens; Nonprofit Organization; Public Institution; Duquesne Light Company; 1 Schenley Park, Pittsburgh, PA 15213, USA.

Top retrofit groups: Biomass / biogas energy system (3); Ground-source / geothermal heat pump (3); High-efficiency HVAC replacement (3); Combined heat and power system (2); EV charger installation (2); LED lighting retrofit (2); Automated demand response controls (1); Battery storage system (1).

Top rendered results:

- eligible_active / 100: Duquesne Light Company - Commercial and Industrial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:3873)
  - source: https://programs.dsireusa.org/system/program/detail/3873/duquesne-light-company-commercial-and-industrial-energy-efficiency-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Level 2 EV Charging Rebate Program (SOURCE_DSIRE:dsire_program_id:22230)
  - source: https://programs.dsireusa.org/system/program/detail/22230/level-2-ev-charging-rebate-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: The Green Energy Loan Fund (GELF) (SOURCE_DSIRE:dsire_program_id:22779)
  - source: https://programs.dsireusa.org/system/program/detail/22779/the-green-energy-loan-fund-gelf
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs


### boise-coop-north-end

Boise grocery co-op with refrigeration, prepared food, and Idaho Power electric service.

Status counts:

```json
{
  "eligible_active": 6,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 5,
  "ineligible": 1875,
  "unavailable": 0
}
```

Profile: Boise Co-op - North End; Commercial Business; Grocery / Convenience / Cold Storage; Idaho Power; 888 W Fort Street, Boise, ID 83702, USA.

Top retrofit groups: Ground-source / geothermal heat pump (5); Biomass / biogas energy system (4); LED lighting retrofit (3); Combined heat and power system (2); High-efficiency HVAC replacement (2); Solar water heating system (2); Battery storage system (1); Microgrid system (1).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Property Tax Exemption for Wind, Solar, and Geothermal Energy Producers (SOURCE_DSIRE:dsire_program_id:2786)
  - source: https://programs.dsireusa.org/system/program/detail/2786/property-tax-exemption-for-wind-solar-and-geothermal-energy-producers
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs
- eligible_active / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - source: https://programs.dsireusa.org/system/program/detail/1271/energy-efficient-commercial-buildings-tax-deduction


### common-ground-coop-urbana

Urbana Illinois grocery co-op tenant with Ameren delivery utility and supplier-choice ambiguity.

Status counts:

```json
{
  "eligible_active": 9,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 0,
  "ineligible": 1877,
  "unavailable": 0
}
```

Profile: Common Ground Food Co-op; Commercial Business; Grocery / Convenience / Cold Storage; Ameren Illinois; 300 S Broadway Avenue, Suite 166, Urbana, IL 61801, USA.

Top retrofit groups: Biomass / biogas energy system (5); Ground-source / geothermal heat pump (5); LED lighting retrofit (3); Solar water heating system (3); Battery storage system (2); Combined heat and power system (2); High-efficiency HVAC replacement (2); Microgrid system (1).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Illinois PACE Financing Program (SOURCE_DSIRE:dsire_program_id:3626)
  - source: https://programs.dsireusa.org/system/program/detail/3626/illinois-pace-financing-program
- eligible_active / 100: Renewable Energy and Energy Efficiency Project Financing (SOURCE_DSIRE:dsire_program_id:3567)
  - source: https://programs.dsireusa.org/system/program/detail/3567/renewable-energy-and-energy-efficiency-project-financing
- eligible_active / 100: ComEd - Energy Efficiency Program for Commercial New Construction (SOURCE_DSIRE:dsire_program_id:3716)
  - source: https://programs.dsireusa.org/system/program/detail/3716/comed-energy-efficiency-program-for-commercial-new-construction
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants


### trees-atlanta-kendeda-treehouse

Atlanta nonprofit urban-forestry campus with office, education, event, operations, and landscape water loads.

Status counts:

```json
{
  "eligible_active": 11,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 7,
  "ineligible": 1868,
  "unavailable": 0
}
```

Profile: Trees Atlanta - Kendeda TreeHouse; Nonprofit Organization; Office / Administrative; Georgia Power; 825 Warner Street SW, Suite A, Atlanta, GA 30310, USA.

Top retrofit groups: LED lighting retrofit (5); Biomass / biogas energy system (4); Ground-source / geothermal heat pump (4); High-efficiency HVAC replacement (4); Combined heat and power system (2); EV charger installation (2); Heat pump HVAC retrofit (2); Level 2 EV charger installation (2).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Georgia Power -  Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4656)
  - source: https://programs.dsireusa.org/system/program/detail/4656/georgia-power-commercial-energy-efficiency-rebate-program
- eligible_active / 100: Georgia Power - Business EV Charger Plus Rebate Program (SOURCE_DSIRE:dsire_program_id:22309)
  - source: https://programs.dsireusa.org/system/program/detail/22309/georgia-power-business-ev-charger-plus-rebate-program
- eligible_active / 100: Electric Vehicle Supply Equipment Tax Credit (SOURCE_DSIRE:dsire_program_id:22167)
  - source: https://programs.dsireusa.org/system/program/detail/22167/electric-vehicle-supply-equipment-tax-credit
- eligible_active / 100: Local Option - Special Improvement Districts (SOURCE_DSIRE:dsire_program_id:4177)
  - source: https://programs.dsireusa.org/system/program/detail/4177/local-option-special-improvement-districts


### boeing-everett-factory

Enormous aerospace manufacturing complex in Snohomish PUD electric and Puget Sound Energy gas territory.

Status counts:

```json
{
  "eligible_active": 8,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 5,
  "ineligible": 1873,
  "unavailable": 0
}
```

Profile: Boeing Everett Factory; Industrial Facility; Industrial / Manufacturing; Snohomish County Public Utility District; 3003 W Casino Road, Everett, WA 98204, USA.

Top retrofit groups: Biomass / biogas energy system (4); Ground-source / geothermal heat pump (3); High-efficiency HVAC replacement (2); High-efficiency refrigeration equipment (2); LED lighting retrofit (2); Anti-sweat heater controls (1); Combined heat and power system (1); Energy management system (1).

Top rendered results:

- eligible_active / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - source: https://programs.dsireusa.org/system/program/detail/5313/usda-biorefinery-renewable-chemical-and-biobased-product-manufacturing-assistance-program
- eligible_active / 100: Snohomish County PUD No 1 - Commercial and Industrial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:2239)
  - source: https://programs.dsireusa.org/system/program/detail/2239/snohomish-county-pud-no-1-commercial-and-industrial-energy-efficiency-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Tax Abatement for Solar Manufacturers (SOURCE_DSIRE:dsire_program_id:381)
  - source: https://programs.dsireusa.org/system/program/detail/381/tax-abatement-for-solar-manufacturers
- eligible_active / 100: Seattle City Light - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:2208)
  - source: https://programs.dsireusa.org/system/program/detail/2208/seattle-city-light-commercial-energy-efficiency-rebate-programs
- eligible_active / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - source: https://programs.dsireusa.org/system/program/detail/3071/u-s-department-of-energy-loan-guarantee-program


### intel-ocotillo-chandler

Semiconductor fabrication campus in SRP territory with cleanroom, process cooling, water, and large-load constraints.

Status counts:

```json
{
  "eligible_active": 7,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 4,
  "ineligible": 1875,
  "unavailable": 0
}
```

Profile: Intel Ocotillo Campus; Industrial Facility; Industrial / Manufacturing; Salt River Project; 4500 S Dobson Road, Chandler, AZ 85248, USA.

Top retrofit groups: Biomass / biogas energy system (4); Ground-source / geothermal heat pump (3); High-efficiency HVAC replacement (2); LED lighting retrofit (2); Solar water heating system (2); Automated demand response controls (1); Combined heat and power system (1); DC fast charger installation (1).

Top rendered results:

- eligible_active / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - source: https://programs.dsireusa.org/system/program/detail/5313/usda-biorefinery-renewable-chemical-and-biobased-product-manufacturing-assistance-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - source: https://programs.dsireusa.org/system/program/detail/3071/u-s-department-of-energy-loan-guarantee-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Solar and Wind Equipment Sales Tax Exemption (SOURCE_DSIRE:dsire_program_id:119)
  - source: https://programs.dsireusa.org/system/program/detail/119/solar-and-wind-equipment-sales-tax-exemption
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs


### bmw-spartanburg-plant

Large South Carolina automotive manufacturing campus in Duke Energy Carolinas territory.

Status counts:

```json
{
  "eligible_active": 11,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 4,
  "ineligible": 1871,
  "unavailable": 0
}
```

Profile: BMW Manufacturing Co. - Spartanburg Plant; Industrial Facility; Industrial / Manufacturing; Duke Energy Carolinas; 1400 Highway 101 S, Greer, SC 29651, USA.

Top retrofit groups: Ground-source / geothermal heat pump (6); Biomass / biogas energy system (4); High-efficiency HVAC replacement (3); Solar water heating system (3); Automated demand response controls (2); LED lighting retrofit (2); Combined heat and power system (1); Engineering feasibility study (1).

Top rendered results:

- eligible_active / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - source: https://programs.dsireusa.org/system/program/detail/5313/usda-biorefinery-renewable-chemical-and-biobased-product-manufacturing-assistance-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - source: https://programs.dsireusa.org/system/program/detail/3071/u-s-department-of-energy-loan-guarantee-program
- eligible_active / 100: Energy Efficiency Revolving Loan Fund (SOURCE_DSIRE:dsire_program_id:5520)
  - source: https://programs.dsireusa.org/system/program/detail/5520/energy-efficiency-revolving-loan-fund
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs


### whirlpool-clyde-operations

Ohio appliance manufacturing plant served by municipal Clyde Light & Power rather than surrounding IOUs.

Status counts:

```json
{
  "eligible_active": 11,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 3,
  "ineligible": 1872,
  "unavailable": 0
}
```

Profile: Whirlpool Corporation - Clyde Operations; Industrial Facility; Industrial / Manufacturing; Clyde Light & Power; 119 Birdseye Street, Clyde, OH 43410, USA.

Top retrofit groups: Biomass / biogas energy system (6); Ground-source / geothermal heat pump (4); LED lighting retrofit (2); Solar water heating system (2); Combined heat and power system (1); Energy audit (1); Engineering feasibility study (1); High-efficiency HVAC replacement (1).

Top rendered results:

- eligible_active / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - source: https://programs.dsireusa.org/system/program/detail/5313/usda-biorefinery-renewable-chemical-and-biobased-product-manufacturing-assistance-program
- eligible_active / 100: Energy Loan Fund (SOURCE_DSIRE:dsire_program_id:5069)
  - source: https://programs.dsireusa.org/system/program/detail/5069/energy-loan-fund
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Air-Quality Improvement Tax Incentives (SOURCE_DSIRE:dsire_program_id:78)
  - source: https://programs.dsireusa.org/system/program/detail/78/air-quality-improvement-tax-incentives
- eligible_active / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - source: https://programs.dsireusa.org/system/program/detail/3071/u-s-department-of-energy-loan-guarantee-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants


### gm-factory-zero-detroit

Detroit EV assembly plant with facility efficiency, fleet charging, and clean-manufacturing overlap.

Status counts:

```json
{
  "eligible_active": 8,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 8,
  "ineligible": 1870,
  "unavailable": 0
}
```

Profile: General Motors Factory ZERO; Industrial Facility; Industrial / Manufacturing; DTE Electric; 2500 E Grand Boulevard, Detroit, MI 48211, USA.

Top retrofit groups: Biomass / biogas energy system (5); EV charger installation (2); Ground-source / geothermal heat pump (3); High-efficiency HVAC replacement (1); LED lighting retrofit (1); Solar water heating system (2); Combined heat and power system (1); DC fast charger installation (1).

Top rendered results:

- eligible_active / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - source: https://programs.dsireusa.org/system/program/detail/5313/usda-biorefinery-renewable-chemical-and-biobased-product-manufacturing-assistance-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Charge Up Michigan Program (SOURCE_DSIRE:dsire_program_id:22193)
  - source: https://programs.dsireusa.org/system/program/detail/22193/charge-up-michigan-program
- eligible_active / 100: Renewable Energy Renaissance Zones (SOURCE_DSIRE:dsire_program_id:3216)
  - source: https://programs.dsireusa.org/system/program/detail/3216/renewable-energy-renaissance-zones
- eligible_active / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - source: https://programs.dsireusa.org/system/program/detail/3071/u-s-department-of-energy-loan-guarantee-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants


### microsoft-columbia-data-center-quincy

Large Quincy Washington data center in Grant County PUD territory with gas unknown.

Status counts:

```json
{
  "eligible_active": 8,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 2,
  "ineligible": 1876,
  "unavailable": 0
}
```

Profile: Microsoft Columbia Data Center; Commercial Business; Data Center / Server Facility; Grant County Public Utility District; Quincy, WA 98848, USA.

Top retrofit groups: LED lighting retrofit (4); Biomass / biogas energy system (4); Ground-source / geothermal heat pump (4); High-efficiency HVAC replacement (2); Combined heat and power system (2); High-efficiency refrigeration equipment (1); Solar water heating system (2); Battery storage system (1).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Clean Alternative Fuel Commercial Vehicle and Vehicle Infrastructure Tax Credit (SOURCE_DSIRE:dsire_program_id:22256)
  - source: https://programs.dsireusa.org/system/program/detail/22256/clean-alternative-fuel-commercial-vehicle-and-vehicle-infrastructure-tax-credit
- eligible_active / 100: Seattle City Light - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:2208)
  - source: https://programs.dsireusa.org/system/program/detail/2208/seattle-city-light-commercial-energy-efficiency-rebate-programs
- eligible_active / 100: Washington Commercial PACER Program (SOURCE_DSIRE:dsire_program_id:22654)
  - source: https://programs.dsireusa.org/system/program/detail/22654/washington-commercial-pacer-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants


### fedex-world-hub-memphis

Memphis airport cargo hub served by MLGW with warehouse, conveyor, aviation, fleet, and charging loads.

Status counts:

```json
{
  "eligible_active": 6,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 2,
  "ineligible": 1878,
  "unavailable": 0
}
```

Profile: FedEx Express World Hub; Commercial Business; Warehouse / Logistics; Memphis Light, Gas and Water; 2903 Sprankel Avenue, Memphis, TN 38118, USA.

Top retrofit groups: Biomass / biogas energy system (4); Ground-source / geothermal heat pump (4); LED lighting retrofit (4); High-efficiency HVAC replacement (3); Combined heat and power system (2); Solar water heating system (2); Thermal energy storage (2); Battery storage system (1).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs
- eligible_active / 100: TVA - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22126)
  - source: https://programs.dsireusa.org/system/program/detail/22126/tva-commercial-energy-efficiency-rebate-program
- eligible_active / 100: Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271)
  - source: https://programs.dsireusa.org/system/program/detail/1271/energy-efficient-commercial-buildings-tax-deduction


### qts-richmond-data-center

Henrico County data center campus in Dominion Energy Virginia territory with gas unknown.

Status counts:

```json
{
  "eligible_active": 10,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 5,
  "ineligible": 1871,
  "unavailable": 0
}
```

Profile: QTS Richmond Data Center; Commercial Business; Data Center / Server Facility; Dominion Energy Virginia; 6000 Technology Boulevard, Sandston, VA 23150, USA.

Top retrofit groups: Biomass / biogas energy system (4); Ground-source / geothermal heat pump (4); LED lighting retrofit (4); High-efficiency HVAC replacement (3); Combined heat and power system (2); Small wind turbine (2); Solar water heating system (2); Thermal energy storage (2).

Top rendered results:

- eligible_active / 100: Tax Exemption for Renewable Energy Generation (SOURCE_DSIRE:dsire_program_id:104)
  - source: https://programs.dsireusa.org/system/program/detail/104/tax-exemption-for-renewable-energy-generation
- eligible_active / 100: Small Business & Non-Profit Loan Program (SOURCE_DSIRE:dsire_program_id:5504)
  - source: https://programs.dsireusa.org/system/program/detail/5504/small-business-and-non-profit-loan-program
- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Local Option - Commercial Property Assessed Clean Energy (C-PACE) Financing (SOURCE_DSIRE:dsire_program_id:3531)
  - source: https://programs.dsireusa.org/system/program/detail/3531/local-option-commercial-property-assessed-clean-energy-c-pace-financing
- eligible_active / 100: VirginiaSAVES Green Community Loan Program (SOURCE_DSIRE:dsire_program_id:5834)
  - source: https://programs.dsireusa.org/system/program/detail/5834/virginiasaves-green-community-loan-program


### hersheys-chocolate-world-hershey

Hershey visitor attraction with retail, food service, events, and refrigeration loads, distinct from manufacturing.

Status counts:

```json
{
  "eligible_active": 15,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 4,
  "ineligible": 1867,
  "unavailable": 0
}
```

Profile: Hershey's Chocolate World - Hershey; Commercial Business; Retail / Storefront; PPL Electric Utilities; 101 Chocolate World Way, Hershey, PA 17033, USA.

Top retrofit groups: Biomass / biogas energy system (6); High-efficiency HVAC replacement (7); Combined heat and power system (5); Ground-source / geothermal heat pump (5); LED lighting retrofit (5); EV charger installation (3); Retro-commissioning study (3); Battery storage system (2).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: High Performance Buildings Incentive Program (SOURCE_DSIRE:dsire_program_id:3602)
  - source: https://programs.dsireusa.org/system/program/detail/3602/high-performance-buildings-incentive-program
- eligible_active / 100: PECO - Commercial Charger Rebate Program (SOURCE_DSIRE:dsire_program_id:22456)
  - source: https://programs.dsireusa.org/system/program/detail/22456/peco-commercial-charger-rebate-program
- eligible_active / 100: Small Business Advantage Grant Program (SOURCE_DSIRE:dsire_program_id:1185)
  - source: https://programs.dsireusa.org/system/program/detail/1185/small-business-advantage-grant-program
- eligible_active / 100: PPL Electric Utilities - Business Incentive Program (SOURCE_DSIRE:dsire_program_id:22438)
  - source: https://programs.dsireusa.org/system/program/detail/22438/ppl-electric-utilities-business-incentive-program


### quaker-oats-cedar-rapids

Cedar Rapids food manufacturing and grain milling plant with process, dust collection, and steam loads.

Status counts:

```json
{
  "eligible_active": 7,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 2,
  "ineligible": 1877,
  "unavailable": 0
}
```

Profile: Quaker Oats Cedar Rapids Plant; Industrial Facility; Industrial / Manufacturing; Alliant Energy / Interstate Power and Light; 418 2nd Street NE, Cedar Rapids, IA 52401, USA.

Top retrofit groups: Biomass / biogas energy system (4); Ground-source / geothermal heat pump (4); High-efficiency HVAC replacement (2); LED lighting retrofit (2); Anti-sweat heater controls (1); Combined heat and power system (1); Energy management system (1); Engineering feasibility study (1).

Top rendered results:

- eligible_active / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - source: https://programs.dsireusa.org/system/program/detail/5313/usda-biorefinery-renewable-chemical-and-biobased-product-manufacturing-assistance-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - source: https://programs.dsireusa.org/system/program/detail/3071/u-s-department-of-energy-loan-guarantee-program
- eligible_active / 100: IADG Energy Bank Revolving Loan Program (SOURCE_DSIRE:dsire_program_id:5410)
  - source: https://programs.dsireusa.org/system/program/detail/5410/iadg-energy-bank-revolving-loan-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs


### austin-central-library

Municipal public library in Austin Energy territory with civic, cafe, parking, IT, and event loads.

Status counts:

```json
{
  "eligible_active": 3,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 6,
  "ineligible": 1877,
  "unavailable": 0
}
```

Profile: Austin Central Library; Government / Public Agency; Public Institution; Austin Energy; 710 W Cesar Chavez Street, Austin, TX 78701, USA.

Top retrofit groups: Biomass / biogas energy system (3); Ground-source / geothermal heat pump (3); Combined heat and power system (1); High-efficiency HVAC replacement (1); LED lighting retrofit (1); Small wind turbine (1); Solar water heating system (1).

Top rendered results:

- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs


### uw-madison-main-campus

Large public university campus with labs, residence halls, dining, athletics, and district energy complexity.

Status counts:

```json
{
  "eligible_active": 7,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 3,
  "ineligible": 1876,
  "unavailable": 0
}
```

Profile: University of Wisconsin-Madison; Government / Public Agency; School / Education Campus; Madison Gas and Electric; 500 Lincoln Drive, Madison, WI 53706, USA.

Top retrofit groups: Biomass / biogas energy system (4); Ground-source / geothermal heat pump (3); Solar water heating system (2); Battery storage system (1); Combined heat and power system (1); EV charger installation (1); High-efficiency HVAC replacement (1); LED lighting retrofit (1).

Top rendered results:

- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Madison Gas & Electric - Electric Vehicle Charger Leasing Program (SOURCE_DSIRE:dsire_program_id:22363)
  - source: https://programs.dsireusa.org/system/program/detail/22363/madison-gas-and-electric-electric-vehicle-charger-leasing-program
- eligible_active / 100: Local Option - Energy-Efficiency Improvement Loans (SOURCE_DSIRE:dsire_program_id:3538)
  - source: https://programs.dsireusa.org/system/program/detail/3538/local-option-energy-efficiency-improvement-loans
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Renewable Energy Sales Tax Exemptions (SOURCE_DSIRE:dsire_program_id:3223)
  - source: https://programs.dsireusa.org/system/program/detail/3223/renewable-energy-sales-tax-exemptions
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs


### boston-latin-school

Large urban public school in Boston with IAQ-sensitive HVAC, cafeteria, gym, and auditorium loads.

Status counts:

```json
{
  "eligible_active": 13,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 1,
  "ineligible": 1872,
  "unavailable": 0
}
```

Profile: Boston Latin School; Government / Public Agency; School / Education Campus; Eversource; 78 Avenue Louis Pasteur, Boston, MA 02115, USA.

Top retrofit groups: EV charger installation (4); Solar water heating system (4); Biomass / biogas energy system (3); Ground-source / geothermal heat pump (3); Level 2 EV charger installation (3); Battery storage system (2); Rooftop solar PV (1); Combined heat and power system (1).

Top rendered results:

- eligible_active / 100: PACE Massachusetts Financing (SOURCE_DSIRE:dsire_program_id:22037)
  - source: https://programs.dsireusa.org/system/program/detail/22037/pace-massachusetts-financing
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Excise Tax Exemption for Solar or Wind Powered Systems (SOURCE_DSIRE:dsire_program_id:147)
  - source: https://programs.dsireusa.org/system/program/detail/147/excise-tax-exemption-for-solar-or-wind-powered-systems
- eligible_active / 100: Renewable Energy Property Tax Exemption (SOURCE_DSIRE:dsire_program_id:146)
  - source: https://programs.dsireusa.org/system/program/detail/146/renewable-energy-property-tax-exemption
- eligible_active / 100: MassEVIP Public Access Charging (PAC) Program (SOURCE_DSIRE:dsire_program_id:22187)
  - source: https://programs.dsireusa.org/system/program/detail/22187/massevip-public-access-charging-pac-program
- eligible_active / 100: MassEVIP Fleets Charging Program (SOURCE_DSIRE:dsire_program_id:22185)
  - source: https://programs.dsireusa.org/system/program/detail/22185/massevip-fleets-charging-program


### uaf-akasofu-building

Fairbanks public university research building in cooperative electric territory with cold-climate resilience.

Status counts:

```json
{
  "eligible_active": 6,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 3,
  "ineligible": 1877,
  "unavailable": 0
}
```

Profile: University of Alaska Fairbanks - Akasofu Building; Government / Public Agency; School / Education Campus; Golden Valley Electric Association; 2160 Koyukuk Drive, Fairbanks, AK 99775, USA.

Top retrofit groups: Biomass / biogas energy system (4); Ground-source / geothermal heat pump (4); Air sealing / weatherization (1); Combined heat and power system (1); Energy audit (1); High-efficiency HVAC replacement (1); LED lighting retrofit (1); Small wind turbine (1).

Top rendered results:

- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Low Income Home Energy Assistance Program (LIHEAP) (SOURCE_DSIRE:dsire_program_id:5712)
  - source: https://programs.dsireusa.org/system/program/detail/5712/low-income-home-energy-assistance-program-liheap
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs
- eligible_active / 100: Renewable Energy Grant Program (SOURCE_DSIRE:dsire_program_id:3080)
  - source: https://programs.dsireusa.org/system/program/detail/3080/renewable-energy-grant-program
- eligible_active / 100: Energy Efficiency Revolving Loan Fund Program (SOURCE_DSIRE:dsire_program_id:4448)
  - source: https://programs.dsireusa.org/system/program/detail/4448/energy-efficiency-revolving-loan-fund-program


### salt-lake-public-safety-building

Salt Lake City public safety facility with net-zero, emergency operations, and updated gas utility naming.

Status counts:

```json
{
  "eligible_active": 6,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 3,
  "ineligible": 1877,
  "unavailable": 0
}
```

Profile: Salt Lake City Public Safety Building; Government / Public Agency; Public Institution; Rocky Mountain Power; 475 S 300 E, Salt Lake City, UT 84111, USA.

Top retrofit groups: Biomass / biogas energy system (5); Ground-source / geothermal heat pump (5); High-efficiency HVAC replacement (4); Solar water heating system (3); Battery storage system (2); LED lighting retrofit (2); Rooftop solar PV (2); Combined heat and power system (1).

Top rendered results:

- eligible_active / 100: Rocky Mountain Power - wattsmart Business Program (SOURCE_DSIRE:dsire_program_id:2412)
  - source: https://programs.dsireusa.org/system/program/detail/2412/rocky-mountain-power-wattsmart-business-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs
- eligible_active / 100: Renewable Energy Systems Tax Credit (Personal) (SOURCE_DSIRE:dsire_program_id:83)
  - source: https://programs.dsireusa.org/system/program/detail/83/renewable-energy-systems-tax-credit-personal
- eligible_active / 100: Renewable Energy Systems Tax Credit (Corporate) (SOURCE_DSIRE:dsire_program_id:248)
  - source: https://programs.dsireusa.org/system/program/detail/248/renewable-energy-systems-tax-credit-corporate


### kauai-coffee-kalaheo

Kauai agricultural coffee estate and visitor center in KIUC cooperative electric territory with no piped gas assumption.

Status counts:

```json
{
  "eligible_active": 8,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 6,
  "ineligible": 1872,
  "unavailable": 0
}
```

Profile: Kauai Coffee Company Visitor Center and Estate; Agricultural Operation; Agricultural / Greenhouse; Kauai Island Utility Cooperative; 870 Halewili Road, Kalaheo, HI 96741, USA.

Top retrofit groups: Biomass / biogas energy system (5); Ground-source / geothermal heat pump (4); Combined heat and power system (2); Solar water heating system (2); Battery storage system (1); Energy audit (1); Engineering feasibility study (1); High-efficiency HVAC replacement (1).

Top rendered results:

- eligible_active / 100: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - source: https://programs.dsireusa.org/system/program/detail/5313/usda-biorefinery-renewable-chemical-and-biobased-product-manufacturing-assistance-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: KIUC - Solar Water Heating Rebate Program (SOURCE_DSIRE:dsire_program_id:598)
  - source: https://programs.dsireusa.org/system/program/detail/598/kiuc-solar-water-heating-rebate-program
- eligible_active / 100: U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071)
  - source: https://programs.dsireusa.org/system/program/detail/3071/u-s-department-of-energy-loan-guarantee-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Energy Audit and Renewable Energy Development Assistance (EA/REDA) Program (SOURCE_DSIRE:dsire_program_id:5681)
  - source: https://programs.dsireusa.org/system/program/detail/5681/usda-rural-energy-for-america-program-reap-energy-audit-and-renewable-energy-development-assistance-ea-reda-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants


### cherokee-ww-hastings-hospital

Tribal healthcare campus in Tahlequah with municipal electric service and healthcare critical-load resilience.

Status counts:

```json
{
  "eligible_active": 9,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 2,
  "ineligible": 1875,
  "unavailable": 0
}
```

Profile: Cherokee Nation W.W. Hastings Hospital and Outpatient Health Center Campus; Government / Public Agency; Medical / Healthcare; Tahlequah Public Works Authority; 100 S Bliss Avenue, Tahlequah, OK 74464, USA.

Top retrofit groups: Biomass / biogas energy system (4); Ground-source / geothermal heat pump (4); LED lighting retrofit (4); High-efficiency HVAC replacement (3); Combined heat and power system (2); EV charger installation (2); Solar water heating system (2); Battery storage system (1).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: OG&E - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3639)
  - source: https://programs.dsireusa.org/system/program/detail/3639/og-and-e-commercial-energy-efficiency-rebate-programs
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676)
  - source: https://programs.dsireusa.org/system/program/detail/676/modified-accelerated-cost-recovery-system-macrs
- eligible_active / 100: Electric Vehicle Tax Credit (SOURCE_DSIRE:dsire_program_id:22425)
  - source: https://programs.dsireusa.org/system/program/detail/22425/electric-vehicle-tax-credit


### organic-valley-lafarge-hq

Rural Wisconsin agricultural cooperative headquarters in electric cooperative territory with gas unknown.

Status counts:

```json
{
  "eligible_active": 9,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 2,
  "ineligible": 1875,
  "unavailable": 0
}
```

Profile: Organic Valley Headquarters; Agricultural Operation; Office / Administrative; Vernon Electric Cooperative; One Organic Way, La Farge, WI 54639, USA.

Top retrofit groups: Biomass / biogas energy system (5); Ground-source / geothermal heat pump (4); LED lighting retrofit (3); Solar water heating system (3); Combined heat and power system (2); High-efficiency HVAC replacement (2); Battery storage system (1); Energy audit (1).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Commercial Retro-Commissioning and New Construction Program (SOURCE_DSIRE:dsire_program_id:5218)
  - source: https://programs.dsireusa.org/system/program/detail/5218/commercial-retro-commissioning-and-new-construction-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Energy Audit and Renewable Energy Development Assistance (EA/REDA) Program (SOURCE_DSIRE:dsire_program_id:5681)
  - source: https://programs.dsireusa.org/system/program/detail/5681/usda-rural-energy-for-america-program-reap-energy-audit-and-renewable-energy-development-assistance-ea-reda-program
- eligible_active / 100: Local Option - Energy-Efficiency Improvement Loans (SOURCE_DSIRE:dsire_program_id:3538)
  - source: https://programs.dsireusa.org/system/program/detail/3538/local-option-energy-efficiency-improvement-loans
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants


### ocracoke-school-island

Remote North Carolina island public school in Tideland EMC territory with no natural gas distribution assumption.

Status counts:

```json
{
  "eligible_active": 8,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 4,
  "ineligible": 1874,
  "unavailable": 0
}
```

Profile: Ocracoke School; Government / Public Agency; School / Education Campus; Tideland Electric Membership Corporation; 120 Schoolhouse Road, Ocracoke, NC 27960, USA.

Top retrofit groups: Biomass / biogas energy system (3); Ground-source / geothermal heat pump (3); LED lighting retrofit (2); Combined heat and power system (1); EV charger installation (1); EV make-ready electrical upgrade (1); High-efficiency HVAC replacement (1); Level 2 EV charger installation (1).

Top rendered results:

- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: Active Solar Heating and Cooling Systems Exemption (SOURCE_DSIRE:dsire_program_id:183)
  - source: https://programs.dsireusa.org/system/program/detail/183/active-solar-heating-and-cooling-systems-exemption
- eligible_active / 100: Clean Fuel Advanced Technology (CFAT) Project (SOURCE_DSIRE:dsire_program_id:22215)
  - source: https://programs.dsireusa.org/system/program/detail/22215/clean-fuel-advanced-technology-cfat-project
- eligible_active / 100: Property Tax Abatement for Solar Electric Systems (SOURCE_DSIRE:dsire_program_id:3036)
  - source: https://programs.dsireusa.org/system/program/detail/3036/property-tax-abatement-for-solar-electric-systems
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: SystemVision Energy Guarantee Program (SOURCE_DSIRE:dsire_program_id:3541)
  - source: https://programs.dsireusa.org/system/program/detail/3541/systemvision-energy-guarantee-program


### ntua-fort-defiance-headquarters

Navajo Tribal Utility Authority headquarters where the applicant is also the electric distribution utility.

Status counts:

```json
{
  "eligible_active": 8,
  "likely_eligible": 0,
  "needs_information": 0,
  "upcoming": 0,
  "manual_review": 4,
  "ineligible": 1874,
  "unavailable": 0
}
```

Profile: Navajo Tribal Utility Authority Headquarters; Government / Public Agency; Office / Administrative; Navajo Tribal Utility Authority; Indian Route 12, Fort Defiance, AZ 86504, USA.

Top retrofit groups: Biomass / biogas energy system (4); Ground-source / geothermal heat pump (4); LED lighting retrofit (4); High-efficiency HVAC replacement (3); Solar water heating system (3); Combined heat and power system (2); Battery storage system (1); Energy audit (1).

Top rendered results:

- eligible_active / 100: Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658)
  - source: https://programs.dsireusa.org/system/program/detail/658/business-energy-investment-tax-credit-itc
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511)
  - source: https://programs.dsireusa.org/system/program/detail/2511/usda-rural-energy-for-america-program-reap-loan-guarantees
- eligible_active / 100: APS - Energy Efficiency Solutions for Business (SOURCE_DSIRE:dsire_program_id:2458)
  - source: https://programs.dsireusa.org/system/program/detail/2458/aps-energy-efficiency-solutions-for-business
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Energy Audit and Renewable Energy Development Assistance (EA/REDA) Program (SOURCE_DSIRE:dsire_program_id:5681)
  - source: https://programs.dsireusa.org/system/program/detail/5681/usda-rural-energy-for-america-program-reap-energy-audit-and-renewable-energy-development-assistance-ea-reda-program
- eligible_active / 100: USDA - Rural Energy for America Program (REAP) Grants (SOURCE_DSIRE:dsire_program_id:917)
  - source: https://programs.dsireusa.org/system/program/detail/917/usda-rural-energy-for-america-program-reap-grants
- eligible_active / 100: Solar and Wind Equipment Sales Tax Exemption (SOURCE_DSIRE:dsire_program_id:119)
  - source: https://programs.dsireusa.org/system/program/detail/119/solar-and-wind-equipment-sales-tax-exemption
