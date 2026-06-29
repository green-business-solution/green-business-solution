# Utility Restriction Review

Generated: 2026-06-29T06:44:43.047Z
Opportunities reviewed: 75
Source-page fetch enabled: yes
Source fetch attempts: 2
Source fetch retry delay: 1000 ms

## Status Counts

```json
{
  "required": 64,
  "not_applicable": 8,
  "unknown": 3
}
```

## Status Meanings

- `required`: a utility/customer/service-territory requirement was found.
- `none`: source text explicitly says no utility restriction or any utility is accepted.
- `not_applicable`: the opportunity type is not utility-gated, such as a federal/state tax credit, loan, or broad grant.
- `none_found_after_review`: source corpus and fetched pages were checked and no utility restriction language was found.
- `unknown`: utility language was ambiguous or the source looked utility-administered but no normalized utility could be confirmed. If source fetches were rate-limited, wait for the retry window and rerun the review before accepting this status.

## Sample Rows

- required: Ameren Illinois - Energy-Efficiency Program (SOURCE_DSIRE:dsire_program_id:4698)
  - required: UTIL_AMEREN_IL
  - evidence: Inferred from utility-like source/title/administrator: Ameren Illinois
- required: Avista Utilities (Gas) - Commercial Energy Efficiency Incentives Program (SOURCE_DSIRE:dsire_program_id:4637)
  - required: Avista Utilities (Gas), Avista Utilities
  - evidence: Inferred from utility-like source/title/administrator: Avista Utilities (Gas), Avista Utilities
- required: Elk River Municipal Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1939)
  - required: Elk River Municipal Utilities
  - evidence: Inferred from utility-like source/title/administrator: Elk River Municipal Utilities
- required: Rochester Public Utilities - Commercial and Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1946)
  - required: Rochester Public Utilities
  - evidence: Inferred from utility-like source/title/administrator: Rochester Public Utilities
- required: AEP Public Service Company of Oklahoma - Commercial Rebate Program (SOURCE_DSIRE:dsire_program_id:3659)
  - required: AEP Public Service Company of Oklahoma
  - evidence: Inferred from utility-like source/title/administrator: AEP Public Service Company of Oklahoma
- required: Black Hills Energy - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3157)
  - required: Black Hills Energy
  - evidence: Inferred from utility-like source/title/administrator: Black Hills Energy
- required: Xcel Energy - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:1580)
  - required: UTIL_XCEL
  - evidence: Inferred from utility-like source/title/administrator: Xcel Energy
- required: AES Indiana - Business Energy Incentives Program (SOURCE_DSIRE:dsire_program_id:4365)
  - required: AES Indiana
  - evidence: Inferred from utility-like source/title/administrator: AES Indiana
- required: Lodi Electric Utility - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1810)
  - required: Lodi Electric Utility
  - evidence: Inferred from utility-like source/title/administrator: Lodi Electric Utility
- required: Modesto Irrigation District - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1885)
  - required: Modesto Irrigation District
  - evidence: Inferred from utility-like source/title/administrator: Modesto Irrigation District
- required: Alameda Municipal Power - Commercial Rebate Program (SOURCE_DSIRE:dsire_program_id:1613)
  - required: Alameda Municipal Power
  - evidence: Inferred from utility-like source/title/administrator: Alameda Municipal Power
- required: Corn Belt Energy Coop - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5136)
  - required: Wabash Valley Power Association
  - evidence: Inferred from utility-like source/title/administrator: Wabash Valley Power Association
- required: Efficiency Works - Business Energy Efficiency Rebate Program (Offered by 4 Utilities) (SOURCE_DSIRE:dsire_program_id:5796)
  - required: Estes Park Power, Fort Collins Utilities, Longmont Power & Communications, City of Loveland Utilities
  - evidence: isor for assistance. Electric efficiency incentives are available to commercial electric customers of Estes Park Power and Communications, Fort Collins Utilities, Longmont Power & Communications, and City of Loveland
- required: Idaho Power - Easy Upgrades for Simple Retrofits Rebate Program (SOURCE_DSIRE:dsire_program_id:2620)
  - required: UTIL_IDAHO_POWER
  - evidence: Inferred from utility-like source/title/administrator: Idaho Power, Idaho Power Company
- required: Minnesota Valley Electric Cooperative - Commercial and Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2253)
  - required: Minnesota Valley Electric Cooperative
  - evidence: Inferred from utility-like source/title/administrator: Minnesota Valley Electric Cooperative
- required: NYSEG (Electric) - Commercial and Industrial Efficiency Program (SOURCE_DSIRE:dsire_program_id:4244)
  - required: NYSEG (Electric)
  - evidence: Inferred from utility-like source/title/administrator: NYSEG (Electric)
- required: Otter Tail Power Company - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4586)
  - required: Otter Tail Power Company
  - evidence: Inferred from utility-like source/title/administrator: Otter Tail Power Company
- required: Pasadena Water and Power - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1889)
  - required: UTIL_PWP
  - evidence: Inferred from utility-like source/title/administrator: Pasadena Water and Power, PWP Business Center
- required: Riverland Energy Cooperative - Commercial, Industrial, and Agricultural Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2516)
  - required: Riverland Energy Cooperative, the cooperative
  - evidence: Inferred from utility-like source/title/administrator: Riverland Energy Cooperative
- required: SoCalGas - Custom Non-Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4952)
  - required: SoCalGas, Southern California Gas Company
  - evidence: Inferred from utility-like source/title/administrator: SoCalGas, Southern California Gas Company
- required: Wabash Valley Power Association (23 Member Cooperatives) - Commercial and Industrial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:22050)
  - required: Wabash Valley Power Association (23 Member Cooperatives), Wabash Valley Power Association
  - evidence: Inferred from utility-like source/title/administrator: Wabash Valley Power Association (23 Member Cooperatives), Wabash Valley Power Association
- required: Wabash Valley Power Association (23 Member Cooperatives) - Commercial and Industrial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4653)
  - required: Wabash Valley Power Association (23 Member Cooperatives), Wabash Valley Power Association
  - evidence: Inferred from utility-like source/title/administrator: Wabash Valley Power Association (23 Member Cooperatives), Wabash Valley Power Association
- required: CenterPoint Energy - Residential and Hard-to-Reach Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:2650)
  - required: CenterPoint Energy
  - evidence: Inferred from utility-like source/title/administrator: CenterPoint Energy
- required: Entergy New Orleans - Small and Large Commercial and Industrial Incentives Program (SOURCE_DSIRE:dsire_program_id:3754)
  - required: Entergy New Orleans
  - evidence: Inferred from utility-like source/title/administrator: Entergy New Orleans
- required: PECO Energy (Electric) - Non-Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4052)
  - required: PECO Energy (Electric)
  - evidence: Inferred from utility-like source/title/administrator: PECO Energy (Electric)
- required: PEPCO - Commercial and Industrial Energy Efficiency Incentives Program (SOURCE_DSIRE:dsire_program_id:3689)
  - required: UTIL_PEPCO, Potomac Electric Power Co.
  - evidence: Inferred from utility-like source/title/administrator: PEPCO, Potomac Electric Power Co.
- required: Residential Energy Efficiency Rebate (Offered by 18 Utilities) (SOURCE_DSIRE:dsire_program_id:5144)
  - required: UTIL_SCE
  - evidence: Residential Energy Efficiency Rebate (Offered by 18 Utilities) / Bright Energy Solutions/Missouri River Energy Services
- required: Springfield Utility Board - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2183)
  - required: Springfield Utility Board
  - evidence: Inferred from utility-like source/title/administrator: Springfield Utility Board
- required: Black Hills Energy - Commercial Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:3154)
  - required: Black Hills Energy
  - evidence: Inferred from utility-like source/title/administrator: Black Hills Energy
- required: Black Hills Energy (Electric) - Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4281)
  - required: Black Hills Energy (Electric)
  - evidence: Inferred from utility-like source/title/administrator: Black Hills Energy (Electric)
- required: Burlington Electric Department - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4636)
  - required: UTIL_BURLINGTON_ELECTRIC
  - evidence: Inferred from utility-like source/title/administrator: Burlington Electric Department
- required: Carbon Power & Light - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2290)
  - required: Carbon Power & Light, Carbon Power & Light, Inc.
  - evidence: Inferred from utility-like source/title/administrator: Carbon Power & Light, Carbon Power & Light, Inc.
- not_applicable: Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5355)
  - required: none
  - evidence: Program type/source appears not utility-gated.
- not_applicable: Energize Delaware - Home Performance with ENERGY STAR (SOURCE_DSIRE:dsire_program_id:5449)
  - required: none
  - evidence: Program type/source appears not utility-gated.
- required: EWEB - Commercial Energy Efficiency Rebates Program (SOURCE_DSIRE:dsire_program_id:2593)
  - required: Eugene Water & Electric Board
  - evidence: Inferred from utility-like source/title/administrator: Eugene Water & Electric Board
- required: Gunnison County Electric - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3372)
  - required: Gunnison County Electric, Gunnison County Electric Association, Inc.
  - evidence: Inferred from utility-like source/title/administrator: Gunnison County Electric, Gunnison County Electric Association, Inc.
- not_applicable: JEA - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4608)
  - required: none
  - evidence: Program type/source appears not utility-gated.
- not_applicable: JEA - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4723)
  - required: none
  - evidence: Program type/source appears not utility-gated.
- required: MassSAVE (Electric) - Commercial New Construction/Major Renovation Program (SOURCE_DSIRE:dsire_program_id:4791)
  - required: UTIL_EVERSOURCE, MassSAVE (Electric), Cape Light Compact, Unitil, National Grid, NSTAR, Western Massachusets Electric
  - evidence: Inferred from utility-like source/title/administrator: MassSAVE (Electric), Cape Light Compact, Unitil, National Grid, NSTAR, Western Massachusets Electric
- required: National Grid (Electric) - Non-Residential Energy Efficiency Program (Upstate New York) (SOURCE_DSIRE:dsire_program_id:3026)
  - required: National Grid (Electric)
  - evidence: Inferred from utility-like source/title/administrator: National Grid (Electric)
- required: New Hampshire Electric Co-op - Commercial and Municipal Retrofit Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:2176)
  - required: New Hampshire Electric Co-op
  - evidence: Inferred from utility-like source/title/administrator: New Hampshire Electric Co-op
- required: New Prague Utilities Commission - Commercial & Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2549)
  - required: New Prague Utilities Commission
  - evidence: Inferred from utility-like source/title/administrator: New Prague Utilities Commission
- required: Nicor Gas - Commercial Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4130)
  - required: Nicor Gas
  - evidence: Inferred from utility-like source/title/administrator: Nicor Gas
- required: Pacific Power - wattsmart Business Program (SOURCE_DSIRE:dsire_program_id:2415)
  - required: UTIL_ROCKY_MOUNTAIN_POWER, Pacific Power
  - evidence: Inferred from utility-like source/title/administrator: Pacific Power
- required: San Miguel Power Association - Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4312)
  - required: San Miguel Power Association
  - evidence: Inferred from utility-like source/title/administrator: San Miguel Power Association
- required: Silicon Valley Power - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1924)
  - required: UTIL_SVP
  - evidence: Inferred from utility-like source/title/administrator: Silicon Valley Power
- required: SoCalGas - Non-Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:1463)
  - required: SoCalGas, Southern California Gas Company
  - evidence: Inferred from utility-like source/title/administrator: SoCalGas, Southern California Gas Company
- required: Texas-New Mexico Power Company - Residential and Hard-to-Reach Standard Offer Programs (SOURCE_DSIRE:dsire_program_id:1543)
  - required: Texas-New Mexico Power Company
  - evidence: Inferred from utility-like source/title/administrator: Texas-New Mexico Power Company
- unknown: (Electric and Gas) Residential Rebate Program (SOURCE_DSIRE:dsire_program_id:5738)
  - required: none
  - evidence: (Electric and Gas) Residential Rebate Program
- required: Anaheim Public Utilities - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:1615)
  - required: UTIL_ANAHEIM
  - evidence: Inferred from utility-like source/title/administrator: Anaheim Public Utilities
