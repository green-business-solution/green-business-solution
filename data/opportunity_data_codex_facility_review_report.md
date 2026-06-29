# Facility Eligibility Review

Generated: 2026-06-29T06:44:43.047Z
Opportunities reviewed: 75
Source-page fetch enabled: yes
Source fetch attempts: 2
Source fetch retry delay: 1000 ms

## Status Counts

```json
{
  "required": 4,
  "broad_commercial": 32,
  "broad_residential": 24,
  "broad_nonresidential": 12,
  "not_applicable": 3
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
- `unknown`: source references facility/property type but no supported value could be normalized. If source fetches were rate-limited, wait for the retry window and rerun the review before accepting this status.

## Sample Rows

- required: Ameren Illinois - Energy-Efficiency Program (SOURCE_DSIRE:dsire_program_id:4698)
  - types: multifamily_residential, restaurant_foodservice, hospitality_lodging, industrial_manufacturing, healthcare, education_campus, agricultural_facility
  - evidence: Facility types inferred: multifamily_residential, restaurant_foodservice, hospitality_lodging, industrial_manufacturing, healthcare, education_campus, agricultural_facility
- broad_commercial: Avista Utilities (Gas) - Commercial Energy Efficiency Incentives Program (SOURCE_DSIRE:dsire_program_id:4637)
  - types: restaurant_foodservice, grocery_food_retail
  - evidence: elebrate Our Rivers Recreation Water Flow Information Contact Us Give us a call Residential customers: (800) 227-9187 Business customers: (800) 936-6629 Hearing impaired: dial 711 Our phone lines are open: 7:00 am - 6:00
- broad_residential: Elk River Municipal Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1939)
  - types: agricultural_facility
  - evidence: Facility types inferred: agricultural_facility
- broad_nonresidential: Rochester Public Utilities - Commercial and Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1946)
  - types: multifamily_residential
  - evidence: Rochester Public Utilities - Commercial and Industrial Energy Efficiency Rebate Program
- broad_commercial: AEP Public Service Company of Oklahoma - Commercial Rebate Program (SOURCE_DSIRE:dsire_program_id:3659)
  - types: multifamily_residential, hospitality_lodging
  - evidence: Facility types inferred: multifamily_residential, hospitality_lodging
- broad_residential: Black Hills Energy - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3157)
  - types: none
  - evidence: Black Hills Energy - Residential Energy Efficiency Rebate Program / Black Hills Energy
- broad_commercial: Xcel Energy - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:1580)
  - types: none
  - evidence: Xcel Energy - Commercial Energy Efficiency Rebate Programs / Xcel Energy
- broad_commercial: AES Indiana - Business Energy Incentives Program (SOURCE_DSIRE:dsire_program_id:4365)
  - types: multifamily_residential, agricultural_facility
  - evidence: a few dollars more each month. Enroll now Learn more Customer opt-out Eligible commercial and industrial customers may opt out of AES Indiana's energy efficiency programs. Learn more Back to top Footer: Indiana My Account Pay / View B
- broad_residential: Lodi Electric Utility - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1810)
  - types: none
  - evidence: Lodi Electric Utility - Residential Energy Efficiency Rebate Program / Customer Programs
- broad_commercial: Modesto Irrigation District - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1885)
  - types: none
  - evidence: Modesto Irrigation District - Commercial Energy Efficiency Rebate Program / Energy Management Department
- broad_commercial: Alameda Municipal Power - Commercial Rebate Program (SOURCE_DSIRE:dsire_program_id:1613)
  - types: restaurant_foodservice
  - evidence: nicipal Power's Commercial Customized Program is designed to provide rebates to commercial customers who install energy-efficiency equipment that does not qualify for the Commercial Lighting Retrofit Program or the HVAC
- broad_commercial: Corn Belt Energy Coop - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5136)
  - types: none
  - evidence: Corn Belt Energy Coop - Commercial Energy Efficiency Rebate Program / Wabash Valley Power Association
- broad_commercial: Efficiency Works - Business Energy Efficiency Rebate Program (Offered by 4 Utilities) (SOURCE_DSIRE:dsire_program_id:5796)
  - types: multifamily_residential, restaurant_foodservice, grocery_food_retail
  - evidence: energy advisor for assistance. Electric efficiency incentives are available to commercial electric customers of Estes Park Power and Communications, Fort Collins Utilities, Longmont Power & Communications, and City of Loveland U
- required: Idaho Power - Easy Upgrades for Simple Retrofits Rebate Program (SOURCE_DSIRE:dsire_program_id:2620)
  - types: education_campus, agricultural_facility
  - evidence: Facility types inferred: education_campus, agricultural_facility
- broad_nonresidential: Minnesota Valley Electric Cooperative - Commercial and Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2253)
  - types: restaurant_foodservice, agricultural_facility
  - evidence: Minnesota Valley Electric Cooperative - Commercial and Industrial Energy Efficiency Rebate Program
- broad_nonresidential: NYSEG (Electric) - Commercial and Industrial Efficiency Program (SOURCE_DSIRE:dsire_program_id:4244)
  - types: none
  - evidence: NYSEG (Electric) - Commercial and Industrial Efficiency Program
- broad_residential: Otter Tail Power Company - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4586)
  - types: none
  - evidence: er Instructions Rebates and Efficiency Programs Rebates and Efficiency Programs Residential Programs Business Programs Contractor Resources Log In Pay My Bill Report an Outage Manage Service Call 800-257-4044 or Contact
- broad_residential: Pasadena Water and Power - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1889)
  - types: multifamily_residential, education_campus
  - evidence: l Rebates and Programs Residential Rebates and Programs PWP offers a variety of residential programs and services to help customers save money while embracing water and energy efficiency. Making your home more energy an
- broad_commercial: Riverland Energy Cooperative - Commercial, Industrial, and Agricultural Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2516)
  - types: agricultural_facility
  - evidence: Facility types inferred: agricultural_facility
- broad_nonresidential: SoCalGas - Custom Non-Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4952)
  - types: agricultural_facility
  - evidence: $0.50 - $3 / MBtuh Steam Boiler Stack Economizer $1 - $2 / MButh Steam Trap for Commercial Customers $100 / unit Storage/Tankless Commercial Water Heaters C $.45 - $15 / Mbtuh Tank Insulation $2 - $3 / sq. ft. This measu
- broad_nonresidential: Wabash Valley Power Association (23 Member Cooperatives) - Commercial and Industrial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:22050)
  - types: none
  - evidence: Wabash Valley Power Association (23 Member Cooperatives) - Commercial and Industrial Energy Efficiency Program
- broad_nonresidential: Wabash Valley Power Association (23 Member Cooperatives) - Commercial and Industrial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4653)
  - types: none
  - evidence: Wabash Valley Power Association (23 Member Cooperatives) - Commercial and Industrial Energy Efficiency Program
- broad_residential: CenterPoint Energy - Residential and Hard-to-Reach Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:2650)
  - types: none
  - evidence: CenterPoint Energy - Residential and Hard-to-Reach Energy Efficiency Program / CenterPoint Energy
- broad_nonresidential: Entergy New Orleans - Small and Large Commercial and Industrial Incentives Program (SOURCE_DSIRE:dsire_program_id:3754)
  - types: none
  - evidence: Entergy New Orleans - Small and Large Commercial and Industrial Incentives Program
- broad_nonresidential: PECO Energy (Electric) - Non-Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4052)
  - types: restaurant_foodservice, grocery_food_retail, hospitality_lodging, industrial_manufacturing, healthcare
  - evidence: Facility types inferred: restaurant_foodservice, grocery_food_retail, hospitality_lodging, industrial_manufacturing, healthcare
- broad_nonresidential: PEPCO - Commercial and Industrial Energy Efficiency Incentives Program (SOURCE_DSIRE:dsire_program_id:3689)
  - types: multifamily_residential, agricultural_facility
  - evidence: PEPCO - Commercial and Industrial Energy Efficiency Incentives Program
- broad_residential: Residential Energy Efficiency Rebate (Offered by 18 Utilities) (SOURCE_DSIRE:dsire_program_id:5144)
  - types: none
  - evidence: cipal Utilities We offer incentives for energy-saving projects and products for residential customers and businesses, and access to our network of Trade Ally contractors. Contact Us Home Rebates Business Rebates Get rewar
- broad_commercial: Springfield Utility Board - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2183)
  - types: none
  - evidence: lity Board (SUB) offers energy audits and Energy Efficiency Incentives (EEI) to Commercial and Industrial customers for eligible, pre-qualified energy efficiency upgrades. Non-residential buildings and facilities are included such as c
- broad_commercial: Black Hills Energy - Commercial Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:3154)
  - types: none
  - evidence: of the cost of Level 2 electric vehicle charging equipment and installation for commercial customers wanting to install chargers for their employees, customers, and fleets. Download Level 3/DC Fast Charger Please contact
- broad_residential: Black Hills Energy (Electric) - Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4281)
  - types: multifamily_residential
  - evidence: Printable application Residential rebate program Black Hills Energy encourages residential customers to purchase and install qualifying energy efficient equipment. We have rebates for many energy products to help custome
- broad_residential: Burlington Electric Department - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4636)
  - types: multifamily_residential
  - evidence: d in Full” or a copy of the qualifying fan and controller purchase invoices for homeowner self-installation. Terms & Conditions This rebate form must be submitted within 90 days of installation. Total rebate a
- broad_residential: Carbon Power & Light - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2290)
  - types: multifamily_residential
  - evidence: Facility types inferred: multifamily_residential
- broad_commercial: Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5355)
  - types: multifamily_residential, restaurant_foodservice, grocery_food_retail, hospitality_lodging, warehouse_logistics, industrial_manufacturing, healthcare, agricultural_facility, office_admin, retail_storefront, mixed_use
  - evidence: Facility types inferred: multifamily_residential, restaurant_foodservice, grocery_food_retail, hospitality_lodging, warehouse_logistics, industrial_manufacturing, healthcare, agricultural_facility, office_admin, retail_storefront, mixed_use
- not_applicable: Energize Delaware - Home Performance with ENERGY STAR (SOURCE_DSIRE:dsire_program_id:5449)
  - types: none
  - evidence: Program type/source appears not facility-type gated.
- broad_commercial: EWEB - Commercial Energy Efficiency Rebates Program (SOURCE_DSIRE:dsire_program_id:2593)
  - types: multifamily_residential, industrial_manufacturing, agricultural_facility
  - evidence: Facility types inferred: multifamily_residential, industrial_manufacturing, agricultural_facility
- broad_residential: Gunnison County Electric - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3372)
  - types: none
  - evidence: Gunnison County Electric - Residential Energy Efficiency Rebate Program / Gunnison County Electric Association, Inc.
- broad_commercial: JEA - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4608)
  - types: multifamily_residential, education_campus
  - evidence: Facility types inferred: multifamily_residential, education_campus
- broad_residential: JEA - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4723)
  - types: multifamily_residential, education_campus
  - evidence: Residential Rebates | Ways to Save | Residential Customers | JEA Skip to main content JavaScript Disabled This site will not function properly without JavaScript enabled. To make
- broad_commercial: MassSAVE (Electric) - Commercial New Construction/Major Renovation Program (SOURCE_DSIRE:dsire_program_id:4791)
  - types: restaurant_foodservice, grocery_food_retail, agricultural_facility
  - evidence: s. Back to Explore Rebates, Offers and Services The Sponsors of Mass Save offer commercial and industrial customers a variety of incentives toward the purchase and installation of specialty equipment, including, but not limited to, com
- broad_nonresidential: National Grid (Electric) - Non-Residential Energy Efficiency Program (Upstate New York) (SOURCE_DSIRE:dsire_program_id:3026)
  - types: none
  - evidence: National Grid (Electric) - Non-Residential Energy Efficiency Program (Upstate New York)
- broad_commercial: New Hampshire Electric Co-op - Commercial and Municipal Retrofit Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:2176)
  - types: restaurant_foodservice
  - evidence: r facility. Visit NHSaves® powered by NHEC for more information. Visit NHSaves® Commercial and Industrial Programs Owning a business is hard enough without worrying about your energy budget and the comfort of your employees a
- broad_commercial: New Prague Utilities Commission - Commercial & Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2549)
  - types: restaurant_foodservice, industrial_manufacturing
  - evidence: Rate - Enrollment Form EV Info and Resources Air Source Heat Pump Resources for Homeowners Air Source Heat Pump Resources for HVAC Contractors Right Light Guide Vampire Power Guide Single-Family Home Energy Gui
- broad_commercial: Nicor Gas - Commercial Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4130)
  - types: none
  - evidence: Nicor Gas - Commercial Energy Efficiency Rebates
- broad_commercial: Pacific Power - wattsmart Business Program (SOURCE_DSIRE:dsire_program_id:2415)
  - types: healthcare, agricultural_facility
  - evidence: Facility types inferred: healthcare, agricultural_facility
- not_applicable: San Miguel Power Association - Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4312)
  - types: none
  - evidence: Program type/source appears not facility-type gated.
- broad_commercial: Silicon Valley Power - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1924)
  - types: industrial_manufacturing, education_campus
  - evidence: Facility types inferred: industrial_manufacturing, education_campus
- broad_nonresidential: SoCalGas - Non-Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:1463)
  - types: agricultural_facility
  - evidence: $0.50 - $3 / MBtuh Steam Boiler Stack Economizer $1 - $2 / MButh Steam Trap for Commercial Customers $100 / unit Storage/Tankless Commercial Water Heaters C $.45 - $15 / Mbtuh Tank Insulation $2 - $3 / sq. ft. This measu
- broad_residential: Texas-New Mexico Power Company - Residential and Hard-to-Reach Standard Offer Programs (SOURCE_DSIRE:dsire_program_id:1543)
  - types: none
  - evidence: Texas-New Mexico Power Company - Residential and Hard-to-Reach Standard Offer Programs / Frontier Energy
- broad_residential: (Electric and Gas) Residential Rebate Program (SOURCE_DSIRE:dsire_program_id:5738)
  - types: none
  - evidence: (Electric and Gas) Residential Rebate Program
- broad_commercial: Anaheim Public Utilities - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:1615)
  - types: multifamily_residential
  - evidence: Facility types inferred: multifamily_residential
