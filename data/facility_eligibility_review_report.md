# Facility Eligibility Review

Generated: 2026-06-26T05:37:26.016Z
Opportunities reviewed: 2096
Source-page fetch enabled: yes

## Status Counts

```json
{
  "broad_nonresidential": 255,
  "none_found_after_review": 211,
  "required": 381,
  "broad_residential": 596,
  "broad_commercial": 496,
  "not_applicable": 153,
  "none": 4
}
```

## Status Meanings

- `required`: one or more specific eligible site/facility types were found.
- `broad_nonresidential`: source indicates broad nonresidential eligibility.
- `broad_commercial`: source indicates broad commercial facility/customer eligibility.
- `broad_residential`: source indicates broad residential eligibility.
- `none`: source explicitly says no site/facility type restriction.
- `not_applicable`: opportunity type is not gated by site/facility type.
- `none_found_after_review`: source corpus and fetched pages were checked and no facility restriction language was found.
- `unknown`: source references facility/property type but no supported value could be normalized.

## Sample Rows

- broad_nonresidential: Chicopee Electric Light - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5239)
  - types: multifamily_residential
  - evidence: --> Commercial/Industrial Programs & Incenti | Chicopee Electric top of page We&#39;re Hiring! Click Here to View Open Positions PAY BILL / AUTO
- none_found_after_review: NextZero EV Charger Program (SOURCE_DSIRE:dsire_program_id:22328)
  - types: none
  - evidence: No facility-type restriction language was found in the reviewed source corpus.
- required: ConEd - Multifamily Energy Efficiency Incentives Program (SOURCE_DSIRE:dsire_program_id:3821)
  - types: multifamily_residential
  - evidence: Facility types inferred: multifamily_residential
- broad_nonresidential: Xcel Energy (Electric) - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5215)
  - types: none
  - evidence: Xcel Energy offers a variety of incentives to commercial and industrial customers in the New Mexico service territory. Custom rebates and in-depth energy studies are also available through Xcel Energy'
- none_found_after_review: OTEC - Agricultural Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3136)
  - types: none
  - evidence: No facility-type restriction language was found in the reviewed source corpus.
- broad_residential: Taunton Municipal Lighting Plant - Residential Heat Pump & Zero-Interest Loan (SOURCE_DSIRE:dsire_program_id:22805)
  - types: none
  - evidence: Residential customers of Taunton Municipal Lighting Plant (TMLP) are eligible for the TMLP Saves™ -Heat Pump and Zero-Interest Loan Program,
- broad_residential: Consumers Energy (Gas) - Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4300)
  - types: multifamily_residential
  - evidence: Consumers Energy residential gas customers are eligible to apply for a variety of rebates on energy efficient equipment. Furnaces, boilers, water heating units, i
- none_found_after_review: Duke Energy Indiana Off-Peak Charging Credit (SOURCE_DSIRE:dsire_program_id:22551)
  - types: none
  - evidence: No facility-type restriction language was found in the reviewed source corpus.
- required: USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313)
  - types: multifamily_residential, industrial_manufacturing, agricultural_facility
  - evidence: Facility types inferred: multifamily_residential, industrial_manufacturing, agricultural_facility
- required: Illinois - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22643)
  - types: industrial_manufacturing, agricultural_facility
  - evidence: Facility types inferred: industrial_manufacturing, agricultural_facility
- broad_commercial: Connexus Energy - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:2448)
  - types: restaurant_foodservice
  - evidence: ose initiatives is the right thing to do. With a wide variety of commercial and residential programs, we will partner with you in your efforts to go green, whether at home or at work. SolarWise Generate Your Own Energy
- broad_nonresidential: PG&E - Non-Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4899)
  - types: agricultural_facility
  - evidence: Pacific Gas and Electric Company (PG&E) offers a variety of incentives to non-residential customers to increase energy efficiency. These include rebates for upgrading equipment for agricultural and food processing, HVAC
- broad_residential: Minnesota Energy Resources (Gas) - Home Energy Excellence Program for Builders or Homeowners (SOURCE_DSIRE:dsire_program_id:3312)
  - types: education_campus, agricultural_facility
  - evidence: nnesota Energy Resources (Gas) - Home Energy Excellence Program for Builders or Homeowners
- required: Sales and Use Tax Exclusion for Advanced Transportation and Alternative Energy Manufacturing Program (SOURCE_DSIRE:dsire_program_id:4054)
  - types: industrial_manufacturing
  - evidence: Facility types inferred: industrial_manufacturing
- required: NYSERDA - New York Truck Voucher Incentive Program (SOURCE_DSIRE:dsire_program_id:22214)
  - types: multifamily_residential, healthcare, education_campus, agricultural_facility, mixed_use
  - evidence: Facility types inferred: multifamily_residential, healthcare, education_campus, agricultural_facility, mixed_use
- required: Oregon Clean Vehicle Rebate Program (SOURCE_DSIRE:dsire_program_id:22224)
  - types: agricultural_facility
  - evidence: Facility types inferred: agricultural_facility
- broad_residential: Marshall County REMC - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2684)
  - types: none
  - evidence: The Power Moves Residential Rebates program offers homeowners incentives through their local electric cooperative to upgrade high-energy systems in their homes—especially heating, c
- not_applicable: Renewable Energy Sales and Use Tax Abatement (SOURCE_DSIRE:dsire_program_id:3233)
  - types: none
  - evidence: Program type/source appears not facility-type gated.
- required: Energy Efficient Schools Initiative - Loans (SOURCE_DSIRE:dsire_program_id:3801)
  - types: education_campus
  - evidence: Facility types inferred: education_campus
- required: Questar Gas - Home Builder Gas Appliance Rebate Program (SOURCE_DSIRE:dsire_program_id:4786)
  - types: multifamily_residential
  - evidence: Facility types inferred: multifamily_residential
- none_found_after_review: Clean Fleet EV Incentive Program (SOURCE_DSIRE:dsire_program_id:22200)
  - types: none
  - evidence: No facility-type restriction language was found in the reviewed source corpus.
- not_applicable: Pee Dee Electric Cooperative - Energy Resource Conservation Loan Program (SOURCE_DSIRE:dsire_program_id:2097)
  - types: none
  - evidence: Program type/source appears not facility-type gated.
- broad_residential: Residential Renewable Energy Income Tax Credit (SOURCE_DSIRE:dsire_program_id:144)
  - types: none
  - evidence: Residential Renewable Energy Income Tax Credit / Massachusetts Department of Energy Resources (DOER)
- broad_residential: Duke Energy Progress - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3968)
  - types: none
  - evidence: Progress Energy provides incentives for residential customers to increase home energy efficiency. To qualify, the equipment must meet the efficiency requirements outlined on the pro
- broad_commercial: C-PACE: Efficiency Maine (SOURCE_DSIRE:dsire_program_id:22591)
  - types: multifamily_residential, restaurant_foodservice, grocery_food_retail, hospitality_lodging, warehouse_logistics, industrial_manufacturing, healthcare
  - evidence: Qualified Partner Business Customer Consultations Commercial Heating Calculator Commercial and Industrial Prescriptive Incentives Commercial and Industrial Custom Commercial Property Assessed Clean Energy (C-PACE) Find a Qual
- not_applicable: Local Option - Property Assessed Clean Energy Financing (SOURCE_DSIRE:dsire_program_id:5109)
  - types: none
  - evidence: Program type/source appears not facility-type gated.
- required: Entergy Arkansas - Agricultural Energy Solutions Program Rebates (SOURCE_DSIRE:dsire_program_id:5532)
  - types: agricultural_facility
  - evidence: Facility types inferred: agricultural_facility
- broad_residential: Cowlitz County PUD - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2075)
  - types: none
  - evidence: quest Drone Program Vegetation Management Wildfire Mitigation Energy Efficiency Residential Programs Commercial Programs Industrial Efficiency Programs Community Solar Conservation Potential Assessment Renewable Energy
- broad_residential: Evergy - Residential Programmable Thermostat Program (SOURCE_DSIRE:dsire_program_id:1467)
  - types: none
  - evidence: Evergy - Residential Programmable Thermostat Program
- required: Solar Energy Loan Program (SOURCE_DSIRE:dsire_program_id:5945)
  - types: industrial_manufacturing, education_campus, agricultural_facility, data_center
  - evidence: Facility types inferred: industrial_manufacturing, education_campus, agricultural_facility, data_center
- broad_residential: Energy Smart - Residential Energy Efficiency Rebate Program (19 Municipalities) (SOURCE_DSIRE:dsire_program_id:3947)
  - types: none
  - evidence: lities, to offer the Energy Smart Residential Energy Efficiency Rebate Program. Residential electric customers served by one of the 19 participating utilities are eligible for rebates on energy efficient upgrades. Purchased produc
- required: Xcel Energy - Solar*Rewards Program (SOURCE_DSIRE:dsire_program_id:5417)
  - types: multifamily_residential, education_campus
  - evidence: Facility types inferred: multifamily_residential, education_campus
- broad_commercial: MassSAVE (Electric) - Commercial New Construction/Major Renovation Program (SOURCE_DSIRE:dsire_program_id:4791)
  - types: restaurant_foodservice, grocery_food_retail, industrial_manufacturing, agricultural_facility
  - evidence: s. Back to Explore Rebates, Offers and Services The Sponsors of Mass Save offer commercial and industrial customers a variety of incentives toward the purchase and installation of specialty equipment, including, but not limited to, com
- broad_commercial: Lodi Electric Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4583)
  - types: multifamily_residential, restaurant_foodservice
  - evidence: Lodi Electric Utility (LEU) offers energy efficiency incentives to eligible commercial and multifamily residential customers. More information regarding the rebate programs, including application materials and equipment requirements, can be fou
- broad_residential: Forest Grove Light & Power -  Residential Solar Rebate Program (SOURCE_DSIRE:dsire_program_id:22703)
  - types: none
  - evidence: Forest Grove Light & Power offers a rebate to residential customers who install qualified solar photovoltaic (PV) systems. The rebate offered is based on the source of heat used in the ho
- required: GFO-23-404 - Equitable Building Decarbonization Program Direct Install (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-23-404)
  - types: education_campus, multifamily_residential
  - evidence: Facility types inferred: education_campus, multifamily_residential
- broad_nonresidential: PSEG Long Island - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2004)
  - types: none
  - evidence: PSEG Long Island offers a variety of incentives for its non-residential customers to increase the energy efficiency of facilities through the Commercial Efficiency Program. Major renovations of existin
- required: Renewable Energy Property Tax Exemption (SOURCE_DSIRE:dsire_program_id:160)
  - types: industrial_manufacturing, education_campus, agricultural_facility
  - evidence: Facility types inferred: industrial_manufacturing, education_campus, agricultural_facility
- not_applicable: Property Tax Exemption for Renewable Energy Generation Facilities (SOURCE_DSIRE:dsire_program_id:4946)
  - types: none
  - evidence: Program type/source appears not facility-type gated.
- broad_residential: Waverly Light & Power - Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:2896)
  - types: none
  - evidence: Waverly Light & Power - Residential Energy Efficiency Rebates / Waverly Light & Power
- broad_commercial: Florida Public Utilities (Gas) - Commercial Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:5817)
  - types: multifamily_residential, restaurant_foodservice, hospitality_lodging
  - evidence: Florida Public Utilities offers commercial natural gas customers energy efficiency rebates to save energy in facilities. Rebates are available for water hears, dryers, fryers, cooking
- broad_nonresidential: Small Business & Municipal Loan Program (SOURCE_DSIRE:dsire_program_id:5735)
  - types: none
  - evidence: Energize CT offers low interest loans for commercial and industrial customers for investments in energy efficiency improvements. Terms Commercial or industrial businesses participating in the Small
- broad_commercial: GFO-23-318 - BRIDGE 2024: Bringing Rapid Innovation Development to Green Energy (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-23-318)
  - types: none
  - evidence: matchingParameters.businessClassification: commercial, nonprofit, government, public sector
- broad_residential: Residential Wood Heating Fuel Exemption (SOURCE_DSIRE:dsire_program_code_title_hash:NY101F:a3be869e7f79)
  - types: none
  - evidence: Residential Wood Heating Fuel Exemption
- required: Sustainable Energy Fund (SEF) Loan Program (PPL Territory) (SOURCE_DSIRE:dsire_program_id:679)
  - types: office_admin
  - evidence: Facility types inferred: office_admin
- broad_commercial: Utah Commercial PACE financing program (SOURCE_DSIRE:dsire_program_id:5406)
  - types: none
  - evidence: Utah Commercial PACE financing program / Sustainable Real Estate Solutions, Inc. (SRS)
- required: Local Option- Renewable Energy Machinery and Tools Property Tax Exemption (SOURCE_DSIRE:dsire_program_id:5723)
  - types: agricultural_facility, data_center
  - evidence: Facility types inferred: agricultural_facility, data_center
- broad_residential: Lake Region Electric Cooperative - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3576)
  - types: none
  - evidence: Lake Region Electric Cooperative (LREC) offers rebates for residential customers to improve the energy efficiency of homes. Rebates are available for air-source heat pumps and central air conditioning
- broad_residential: Residential Energy Efficiency Rebates (Offered by 5 Utilities) (SOURCE_DSIRE:dsire_program_id:5100)
  - types: none
  - evidence: Bright Energy Solutions offers energy efficiency cash incentive programs to residential customers of municipal utilities that are members of Missouri River Energy Services. In North Dakota, this includes: Cavalier Mun
- broad_commercial: Mountain View Electric Association, Inc - Energy Efficiency Rebates Program (SOURCE_DSIRE:dsire_program_id:2103)
  - types: none
  - evidence: nd Transmission Association Inc., MVEA’s power supplier, offers rebates to MVEA residential and commercial customers who install qualifying energy efficiency equipment and appliances. All equipment requirements must be met in order to r
