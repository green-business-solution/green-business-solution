# Opportunity Incentive Rule Repair Report

Generated: 2026-06-28T22:32:51.329Z
Targets reviewed: 1058
Rules generated: 153
Manual repair targets: 858
Research-reviewed no-rule targets: 54

## Rule Extraction Counts

```json
{
  "source_url_fetch": 125,
  "gpt_pro_research": 28
}
```

## Rule Confidence Counts

```json
{
  "medium": 107,
  "high": 45,
  "low": 1
}
```

## Remaining Gap Reason Counts

```json
{
  "formula_not_found_in_source_text": 708,
  "source_text_unavailable": 150
}
```

## Research No-Rule Status Counts

```json
{
  "manual_review_required": 5,
  "formula_not_found": 29,
  "not_applicable_for_one_time_savings": 10,
  "unavailable": 1,
  "source_inaccessible": 9
}
```

## Applied Research Batches

```json
[
  {
    "batchId": "gpt_pro_2026-06-28_batch1",
    "appliedAt": "2026-06-28T22:32:51.325Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch1.json",
    "ruleCount": 28,
    "reviewedNoRuleCount": 54,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3838"
  }
]
```

## Notes

- Rules are generated only when deterministic source text or GPT Pro research contains an extractable amount, rate, percentage, or cap.
- GPT Pro research repairs are stored with `extractionMethod: gpt_pro_research` and include source URLs plus short evidence text.
- Targets reviewed by GPT Pro without a safe one-time rule are moved to `researchReviewedNoRule` instead of being repeatedly sent through the same repair queue.
- Broad programs with measure-specific tables often need manual or LLM-assisted extraction because one opportunity can contain many rates.

## First Manual Repair Targets

- El Paso Electric Company - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3838)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.epelectric.com/save-money-and-energy/residential
- Dominion Energy - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:2688)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.thermwise.com/rebates/
- AEP (SWEPCO) - Efficient Products Rebates Program (SOURCE_DSIRE:dsire_program_id:5822)
  - reason: source_text_unavailable; method: per_unit; source: https://www.swepco.com/savings/home/money/rebates/
- Bright Start for New Business (SOURCE_SILICON_VALLEY_POWER:svp_source_section:f69ab77394818965:bright-start-for-new-business)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.siliconvalleypower.com/businesses/save-money
- Cleco Power - Commercial EV Rebate (SOURCE_DSIRE:dsire_program_id:22622)
  - reason: source_text_unavailable; method: per_unit; source: https://www.cleco.com/electrification/commercial-evs
- Holy Cross Energy - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2045)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.holycross.com/member-programs/energy-efficiency-and-rebates
- McMinnville Water and Light - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3963)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.mc-power.com/energy-efficiency/energy-efficiency-rebates-incentives/
- Oregon - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22659)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://www.oregon.gov/odot/climate/pages/nevi.aspx
- Cape Light Compact- Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5782)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.capelightcompact.org/home-energy-assessments/resrebates/
- Orange and Rockland Utilities (Electric) - Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:5011)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.oru.com/en/save-money/rebates-incentives-credits/new-york-customers/incentives-for-residential-customers-ny
- Alameda Municipal Power - Electric Vehicle Rebate Program (SOURCE_DSIRE:dsire_program_id:22274)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.alamedamp.com/349/Electric-Vehicles
- (Electric and Gas) Residential Rebate Program (SOURCE_DSIRE:dsire_program_id:5738)
  - reason: source_text_unavailable; method: per_kwh_saved; source: https://energizect.com/your-home/rebates-and-incentives
- NIPSCO (Gas & Electric) - Commercial & Industrial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:5727)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.nipsco.com/save-energy/business/prescriptive-gas-incentives
- North Shore Gas - Residential Rebate Program (SOURCE_DSIRE:dsire_program_id:5235)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.northshoregasdelivery.com/savings/rebates-residential
- Empire Electric Association - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3585)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://eea.coop/residential-energy-efficiency-program
- AEP Appalachian Power - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4835)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://takechargewv.com/rebates
- South River EMC - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3861)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.sremc.com/rebates-efficiency-tips
- Columbia REA Commercial and Agricultural Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22569)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.columbiarea.coop/energy-efficiency/rebate-offers/
- Green Mountain Power Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:22587)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://greenmountainpower.com/rebates-programs/home-and-yard/
- North Dakota - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22658)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://www.dot.nd.gov/nevi
- GRID-Lodging (SOURCE_SDGE_BUSINESS:program_url:mendotagroup_com_sdge_grid_lodging)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://mendotagroup.com/sdge-grid-lodging
- Clark County REMC - Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2665)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.clarkremc.coop/energy-efficiency/rebates/
- Baltimore Gas and Electric - EVsmart Program (SOURCE_DSIRE:dsire_program_id:22323)
  - reason: source_text_unavailable; method: per_unit; source: https://www.bge.com/SmartEnergy/InnovationTechnology/Pages/ElectricVehicles.aspx
- Spring Valley Public Utilities - Commercial & Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2588)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://smmpa.com/members/spring-valley
- Taunton Municipal Lighting Plant - EV and Level 2 EV Charging Program (SOURCE_DSIRE:dsire_program_id:22807)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.tmlp.com/178/EV-Program
- Green Mountain Power Bring Your Own Device Program (SOURCE_DSIRE:dsire_program_id:22564)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://greenmountainpower.com/rebates-programs/home-energy-storage/bring-your-own-device/
- Commercial and Industrial Grant Program (SOURCE_DSIRE:dsire_program_id:5650)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: http://energy.maryland.gov/business/Pages/incentives/empowermdcigp.aspx
- Minnkota Power Cooperative (11 Utilities) - PowerSavers Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5528)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.minnkota.com/our-programs/business-programs
- Commercial Energy Efficiency Rebate for Existing Buildings (SOURCE_DSIRE:dsire_program_id:2437)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://energytrust.org/commercial
- Decarbonizing Public Schools Program (SOURCE_DSIRE:dsire_program_id:22793)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://energy.maryland.gov/Pages/SchoolDecarbonization.aspx
- CenterPoint Energy - Residential and Hard-to-Reach Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:2650)
  - reason: source_text_unavailable; method: per_kwh_saved; source: https://cnpres.programprocessing.com/
- Oklahoma Municipal Power Authority - Demand and Energy Efficiency Program (DEEP) (SOURCE_DSIRE:dsire_program_id:4528)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://ompa.com/programs/deep/
- Jo-Carroll Energy - Energy Efficiency Rebate Program (Electric) (SOURCE_DSIRE:dsire_program_id:4493)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://jcecoop.com/incentives
- Georgia Power -  Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4656)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.georgiapower.com/business/products-programs/efficiency-maintenance/ceep.html
- Dominion Energy - ThermWise Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5037)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.thermwise.com/business-rebates/
- AEP (Central, SWEPCO and North) - SCORE Program for Schools (SOURCE_DSIRE:dsire_program_id:5170)
  - reason: source_text_unavailable; method: per_kwh_saved; source: https://www.aeptexasefficiency.com/#/commercial/score
- Noble REMC - Residential Energy Efficiency Rebate Incentives (SOURCE_DSIRE:dsire_program_id:5733)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://nobleremc.com/rebates
- Electric Vehicle Fast-Charging Plazas Program (SOURCE_DSIRE:dsire_program_id:22160)
  - reason: source_text_unavailable; method: grant_amount; source: https://energyoffice.colorado.gov/ev-fast-charging-plazas
- Coweta-Fayette EMC - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2264)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://utility.org/energy-efficiency/smart-choice-home/
- MidAmerican Energy - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3507)
  - reason: source_text_unavailable; method: per_kwh_saved; source: https://www.midamericanenergy.com/il-ee-rebates
- Maine - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22637)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://www.efficiencymaine.com/at-work/electric-vehicle-supply-equipment-initiative/
- Sawnee EMC - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2279)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.sawnee.coop/rebates-and-incentives#collapse-accordion-414-1
- Farmers RECC - Heat Pump Retrofit Rebate Program (SOURCE_DSIRE:dsire_program_id:3264)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.farmersrecc.com/heat-pump-retrofit-program
- Avista Utilities - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:4640)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.myavista.com/energy-savings/rebates-washington
- Sustainable Energy Utility (Electric & Gas) - Commercial and Multifamily Rebate Program (SOURCE_DSIRE:dsire_program_id:5167)
  - reason: source_text_unavailable; method: per_unit; source: https://www.dcseu.com/commercial-and-multifamily
- Stowe Electric - Electric Vehicle Purchase Rebate (SOURCE_DSIRE:dsire_program_id:22340)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.stoweelectric.com/rebates/electric-vehicles
- Oklahoma Natural Gas - Residential efficiency rebates (SOURCE_DSIRE:dsire_program_id:22101)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.oklahomanaturalgas.com/save-money/rebates-and-incentives/residential-rebates
- Columbia Gas of Kentucky - Low Income Furnace Replacement Program (SOURCE_DSIRE:dsire_program_id:5238)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.columbiagasky.com/energy-efficiency/for-your-home
- Pacific Power - wattsmart Business Program (SOURCE_DSIRE:dsire_program_id:2415)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.pacificpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-washington.html
- Springfield Utility Board - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3391)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.subutil.com/conservation/for-your-home/rebates-loans/
