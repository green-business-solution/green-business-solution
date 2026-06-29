# Opportunity Incentive Rule Repair Report

Generated: 2026-06-29T03:36:37.565Z
Targets reviewed: 1058
Rules generated: 635
Manual repair targets: 108
Research-reviewed no-rule targets: 490

## Rule Extraction Counts

```json
{
  "source_url_fetch": 125,
  "gpt_pro_research": 510
}
```

## Rule Confidence Counts

```json
{
  "medium": 300,
  "high": 334,
  "low": 1
}
```

## Remaining Gap Reason Counts

```json
{
  "formula_not_found_in_source_text": 89,
  "source_text_unavailable": 19
}
```

## Research No-Rule Status Counts

```json
{
  "manual_review_required": 170,
  "formula_not_found": 204,
  "not_applicable_for_one_time_savings": 85,
  "unavailable": 5,
  "source_inaccessible": 26
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
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch2",
    "appliedAt": "2026-06-28T23:07:13.056Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch2.json",
    "ruleCount": 46,
    "reviewedNoRuleCount": 41,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22308"
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch3",
    "appliedAt": "2026-06-28T23:42:32.982Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch3.json",
    "ruleCount": 53,
    "reviewedNoRuleCount": 39,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2534"
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch4",
    "appliedAt": "2026-06-29T00:20:07.076Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch4.json",
    "ruleCount": 50,
    "reviewedNoRuleCount": 40,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605"
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch5",
    "appliedAt": "2026-06-29T00:35:29.421Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch5.json",
    "ruleCount": 26,
    "reviewedNoRuleCount": 56,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2553"
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch6",
    "appliedAt": "2026-06-29T02:21:01.661Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch6.json",
    "ruleCount": 48,
    "reviewedNoRuleCount": 45,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3135"
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch7",
    "appliedAt": "2026-06-29T02:27:01.604Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch7.json",
    "ruleCount": 67,
    "reviewedNoRuleCount": 35,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:2590"
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch8",
    "appliedAt": "2026-06-29T02:27:52.335Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch8.json",
    "ruleCount": 60,
    "reviewedNoRuleCount": 41,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:22647"
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch9",
    "appliedAt": "2026-06-29T02:45:00.497Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch9.json",
    "ruleCount": 38,
    "reviewedNoRuleCount": 48,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:3406"
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch10",
    "appliedAt": "2026-06-29T03:17:48.166Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch10.json",
    "ruleCount": 43,
    "reviewedNoRuleCount": 44,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:4812"
  },
  {
    "batchId": "gpt_pro_2026-06-28_batch11",
    "appliedAt": "2026-06-29T03:36:37.558Z",
    "repairsPath": "data/opportunity_incentive_rule_research_repairs_gpt_pro_2026-06-28_batch11.json",
    "ruleCount": 51,
    "reviewedNoRuleCount": 47,
    "reviewedOpportunityCount": 75,
    "continueFromOpportunityId": "SOURCE_DSIRE:dsire_program_id:4145"
  }
]
```

## Notes

- Rules are generated only when deterministic source text or GPT Pro research contains an extractable amount, rate, percentage, or cap.
- GPT Pro research repairs are stored with `extractionMethod: gpt_pro_research` and include source URLs plus short evidence text.
- Targets reviewed by GPT Pro without a safe one-time rule are moved to `researchReviewedNoRule` instead of being repeatedly sent through the same repair queue.
- Broad programs with measure-specific tables often need manual or LLM-assisted extraction because one opportunity can contain many rates.

## First Manual Repair Targets

- Cedar Falls Utilities - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4145)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.cfu.net/save-energy/business-rebates/
- Puget Sound Energy - Multi-Family Efficiency Retrofit Program (SOURCE_DSIRE:dsire_program_id:3206)
  - reason: source_text_unavailable; method: per_kwh_saved; source: https://www.pse.com/rebates/multifamily-retrofit
- Renewable Energy Grant Program (SOURCE_DSIRE:dsire_program_id:3080)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://www.akenergyauthority.org/What-We-Do/Grants-Loans/Renewable-Energy-Fund
- Dominion Energy - Home Builder Gas Appliance Rebate Program (SOURCE_DSIRE:dsire_program_id:2690)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.thermwise.com/builder-rebates/
- Southern Public Power District - Electric Vehicle Incentives (SOURCE_DSIRE:dsire_program_id:22380)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://southernpd.energywisenebraskagoev.com/
- Riverland Energy Cooperative - Commercial, Industrial, and Agricultural Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2516)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://riverlandenergy.com/rebates
- Walton EMC - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:2280)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.waltonemc.com/index.php/home/rebates/
- ALT Fuels Colorado (SOURCE_DSIRE:dsire_program_id:22158)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: http://cleanairfleets.org/programs/alt-fuels-colorado
- MidAmerican Energy Residential Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:22552)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.midamericanenergy.com/il-residential-rebates
- Piedmont Natural Gas - Commercial Equipment Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:4200)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.piedmontng.com/Home/Save-Energy-and-Money/Residential-Energy-Efficiency-Resources
- Dominion Energy - Commercial EnergyWise Program (SOURCE_DSIRE:dsire_program_id:4810)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.dominionenergy.com/south-carolina/save-energy?tab=2
- Coast Electric Power Association - Comfort Advantage Home Program (SOURCE_DSIRE:dsire_program_id:2222)
  - reason: source_text_unavailable; method: per_unit; source: https://coastepa.com/comfort-advantage/
- El Paso Electric Company - Small Business and Large Commercial Programs (SOURCE_DSIRE:dsire_program_id:3840)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.epelectric.com/energy-efficiency/texas-business-energy-efficiency
- NextZero - Offered by 21 Utilities through the MMWEC (SOURCE_DSIRE:dsire_program_id:3217)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://nextzero.org/
- Ashland Electric Utility - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:1128)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://ashlandoregon.gov/584/Residential-Incentives
- Portland General Electric (PGE) - EV Charging Station Commercial & Multifamily Rebate Program (SOURCE_DSIRE:dsire_program_id:22375)
  - reason: source_text_unavailable; method: per_unit; source: https://portlandgeneral.com/energy-choices/electric-vehicles-charging/business-charging-fleets/ev-charging-pilot-program-business
- Austin Energy - Multi-Family Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2015)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://savings.austinenergy.com/rebates/multifamily/
- Silicon Valley Power - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1924)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.siliconvalleypower.com/businesses/rebates
- Xcel Energy - Commercial and Industrial Standard Offer Program (SOURCE_DSIRE:dsire_program_id:1592)
  - reason: source_text_unavailable; method: per_kwh_saved; source: https://tx.my.xcelenergy.com/s/business/cost-savings/commercial-standard-offer
- Entergy Mississippi- Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:5793)
  - reason: source_text_unavailable; method: per_unit; source: http://www.entergy-mississippi.com/your_home/save_money/EE/residential-solutions.aspx
- TVA - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5707)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://energyright.com/residential/rebates/
- Barron Electric Cooperative - Electric Vehicle Charging Station Rebate (SOURCE_DSIRE:dsire_program_id:22357)
  - reason: source_text_unavailable; method: per_unit; source: https://www.barronelectric.com/2024-energy-rebates
- Southwest Gas Corporation - Commercial High-Efficiency Equipment Rebate Program (SOURCE_DSIRE:dsire_program_id:3964)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.swgas.com/en/commercial-rebates-and-promotions
- MOR-EV (SOURCE_DSIRE:dsire_program_id:22190)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://mor-ev.org/
- Tucson Electric Power - Home EV Chargers Rebate (SOURCE_DSIRE:dsire_program_id:22271)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.tep.com/electric-vehicles/
- York Electric Cooperative - Dual Fuel Heat Pump Rebate Program (SOURCE_DSIRE:dsire_program_id:3607)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.yorkelectric.net/myhome/heat-pump-rebate/
- Electric Vehicle Charging Station Rebate Program (SOURCE_DSIRE:dsire_program_id:22371)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.hawaiienergy.com/for-business/rebates/electric-vehicle-charging-stations
- Black Hills Energy - Commercial Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:3154)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.blackhillsenergy.com/efficiency-and-savings/commercial-rebates/south-dakota-commercial-rebates
- Electric Vehicle Supply Equipment Rebate Program (SOURCE_DSIRE:dsire_program_id:22210)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://jointutilitiesofny.org/ev/make-ready
- Entergy Arkansas - CitySmart Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:3681)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.entergyarkansas.com/energyefficiency/business/citysmart
- Business Energy Efficiency Rebate (Offered by 18 Utilities) (SOURCE_DSIRE:dsire_program_id:5145)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.brightenergysolutions.com/find-a-rebate/
- Peninsula Light Company - Residential Energy Efficiency  Rebate Program (SOURCE_DSIRE:dsire_program_id:4227)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.penlight.org/energy-efficiency/incentives/
- El Paso Electric Company - SCORE Program for Counties, Municipalities, and Schools (SOURCE_DSIRE:dsire_program_id:4593)
  - reason: source_text_unavailable; method: per_unit; source: https://www.epelectric.com/tx/business/program-manuals-and-guidelines
- Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:22588)
  - reason: source_text_unavailable; method: per_unit; source: https://www.efficiencyvermont.com/rebates/list?cat=&hvacfilter=&type=biz
- Marin Clean Energy - Feed-In Tariff Plus (SOURCE_DSIRE:dsire_program_id:22615)
  - reason: source_text_unavailable; method: per_unit; source: https://www.mcecleanenergy.org/feed-in-tariff/
- Co-Mo Electric Cooperative - Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2188)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.co-mo.coop/rebates/
- SMUD - Battery Storage Incentive Program (SOURCE_DSIRE:dsire_program_id:22800)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.smud.org/Going-Green/Battery-storage/Homeowner
- FirstEnergy (Met-Ed, Penelec, Penn Power, and West Penn) - Commercial and Industrial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4132)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.energysavepa-business.com/
- Saint Peter Municipal Utilities - Commercial & Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2585)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.SaveEnergyInSaintPeter.com
- Vermont Replace Your Ride Program (SOURCE_DSIRE:dsire_program_id:22544)
  - reason: source_text_unavailable; method: per_unit; source: https://www.driveelectricvt.com/incentives/vermont-state-incentives
- SHELD Greenhouse Gas Reduction Rebate Program (SOURCE_DSIRE:dsire_program_id:22799)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.sheld.org/pages/forms/greenhouse-gas-reduction-rebates/
- Florida Public Utilities - Residential HVAC Rebate Program (SOURCE_DSIRE:dsire_program_id:3692)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.fpuc.com/electric/residential/rebates/
- Heat Pump Water Heater Rebate (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:heat-pump-water-heater-rebate)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.siliconvalleypower.com/businesses/rebates
- Chelan County PUD - Residential Weatherization Rebate Program (SOURCE_DSIRE:dsire_program_id:3179)
  - reason: source_text_unavailable; method: per_kwh_saved; source: http://www.chelanpud.org/conservationhome/residential
- Alabama Power - Electric Forklift Rebate (SOURCE_DSIRE:dsire_program_id:22738)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.alabamapower.com/business/save-money-and-energy/offers-for-business-customers/electric-forklifts-and-etrus-.html
- City of Tallahassee Utilities - Grant Programs (SOURCE_DSIRE:dsire_program_id:1774)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: http://www.talgov.com/you/you-products-home-index.aspx
- SoCalGas - Non-Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:1463)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.socalgas.com/for-your-business/energy-savings/rebates-and-incentives
- Mass Save  - Residential Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:4799)
  - reason: source_text_unavailable; method: per_unit; source: https://www.masssave.com/en/saving/residential-rebates/
- Mississippi Power - Battery Storage Incentive Program (SOURCE_DSIRE:dsire_program_id:22606)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.mississippipower.com/residential/pricing---rates.html
- Idaho Power - Easy Upgrades for Simple Retrofits Rebate Program (SOURCE_DSIRE:dsire_program_id:2620)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.idahopower.com/ways-to-save/savings-for-your-business/retrofits/
