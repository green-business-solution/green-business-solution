# Opportunity Incentive Rule Repair Report

Generated: 2026-06-29T02:45:00.503Z
Targets reviewed: 1058
Rules generated: 541
Manual repair targets: 258
Research-reviewed no-rule targets: 399

## Rule Extraction Counts

```json
{
  "source_url_fetch": 125,
  "gpt_pro_research": 416
}
```

## Rule Confidence Counts

```json
{
  "medium": 268,
  "high": 272,
  "low": 1
}
```

## Remaining Gap Reason Counts

```json
{
  "formula_not_found_in_source_text": 212,
  "source_text_unavailable": 46
}
```

## Research No-Rule Status Counts

```json
{
  "manual_review_required": 136,
  "formula_not_found": 165,
  "not_applicable_for_one_time_savings": 71,
  "unavailable": 4,
  "source_inaccessible": 23
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
  }
]
```

## Notes

- Rules are generated only when deterministic source text or GPT Pro research contains an extractable amount, rate, percentage, or cap.
- GPT Pro research repairs are stored with `extractionMethod: gpt_pro_research` and include source URLs plus short evidence text.
- Targets reviewed by GPT Pro without a safe one-time rule are moved to `researchReviewedNoRule` instead of being repeatedly sent through the same repair queue.
- Broad programs with measure-specific tables often need manual or LLM-assisted extraction because one opportunity can contain many rates.

## First Manual Repair Targets

- Connexus Energy - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3406)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.connexusenergy.com/residential/save-money-and-energy/rebates-and-programs
- AEP (Central and SWEPCO) - Coolsaver A/C Tune Up or Replacement (SOURCE_DSIRE:dsire_program_id:4594)
  - reason: source_text_unavailable; method: per_unit; source: https://aeptexasefficiency.com/#/commercial/coolsaver
- Sawnee EMC - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2278)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.sawnee.com/rebates-and-incentives
- PPL Electric Utilities - Commercial, Industrial and Agricultural Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3853)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.pplelectricbusinesssavings.com/ppl-business/incentives/overview/
- City and County of Denver - Solar Rebate (SOURCE_DSIRE:dsire_program_id:22753)
  - reason: source_text_unavailable; method: per_kw; source: https://switchtogether.com/en/solar/denver/info/denver-solar-rebate-program
- Redwood Falls Public Utilities - Commercial & Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2584)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: http://www.SaveEnergyInRedwoodFalls.com
- Charging Infrastructure Grant Program (SOURCE_DSIRE:dsire_program_id:22555)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://epa.illinois.gov/topics/ceja.html
- Duke Energy Indiana - Electric School Bus Charging (SOURCE_DSIRE:dsire_program_id:22602)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://www.duke-energy.com/business/products/park-and-plug/electric-school-buses?_gl=1*yb3xfn*_ga*NDkyMTYxOTIuMTY3NjkyMDEyNg..*_ga_HB58MJRNTY*MTY3Njk4MDUxMy42LjEuMTY3Njk4MDY3NC4wLjAuMA..&_ga=2.11200564.1441956738.1676920127-49216192.1676920126
- Indiana Michigan Power - Energy Savings Rebate Program (SOURCE_DSIRE:dsire_program_id:4615)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.electricideas.com/home/home-energy-products-program/
- Evergy - Residential Rebate Programs (SOURCE_DSIRE:dsire_program_id:2932)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.evergy.com/ways-to-save/discounts
- Xcel Energy (Electric and Gas) - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4813)
  - reason: source_text_unavailable; method: per_unit; source: https://www.xcelenergy.com/programs_and_rebates/residential_programs_and_rebates
- National Grid - Charge Smart MA (SOURCE_DSIRE:dsire_program_id:22742)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.nationalgridus.com/Charge-Smart-MA
- Rochester Public Utilities - Commercial and Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1946)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.rpu.org/rebates-programs/commercial/conserve-save-rebates.php
- Consumers Energy (Gas) - Commercial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:3594)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.consumersenergy.com/business/energy-efficiency/rebates-and-programs
- San Isabel Electric Association - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5128)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://siea.com/rebates/
- Orange County REMC - Energy Efficient Equipment Rebate Program (SOURCE_DSIRE:dsire_program_id:2678)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.myremc.coop/rebates
- CenterPoint Energy (Gas) - Commercial Energy Efficiency Rebates (SOURCE_DSIRE:dsire_program_id:3065)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://midwest.centerpointenergy.com/savings/in-business/rebates/gas
- Duke Energy -  Residential Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1549)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.duke-energy.com/home/products/smart-saver
- Office of Indian Energy Policy and Programs - Funding Opportunities (SOURCE_DSIRE:dsire_program_id:918)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://www.energy.gov/indianenergy/office-indian-energy-policy-and-programs
- Sulphur Springs Valley EC - Residential Energy Efficiency Rebate (SOURCE_DSIRE:dsire_program_id:2035)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.ssvec.org/programs/rebates.php
- Duquesne Light Company - PEV Bill Credit Program (SOURCE_DSIRE:dsire_program_id:22376)
  - reason: source_text_unavailable; method: per_unit; source: https://www.duquesnelight.com/energy-money-savings/electric-vehicles
- Fairmont Public Utilities - Commercial & Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2538)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: http://www.SaveEnergyInFairmont.com
- Marshfield Utilities - Heat Pump Rebate Program (SOURCE_DSIRE:dsire_program_id:2051)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://marshfieldutilities.org/efficiency-conservation/save-energy-money.php
- Consumers Energy (Electric) - Commercial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4299)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.consumersenergy.com/business/energy-efficiency/rebates-and-programs
- Berkeley Electric Cooperative - Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3344)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.berkeleyelectric.coop/
- Kentucky Power - Targeted Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:3696)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.kentuckypower.com/save/residential/programs/TargetedEnergyEfficiencyProgram.aspx
- Grays Harbor PUD - Non-Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2195)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.ghpud.org/energy-efficiency
- Nevada - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22631)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://www.dot.nv.gov/mobility/alternative-fueling-infrastructure-plan
- Minnesota Energy Resources (Gas) - Low-Income New Construction Rebates (SOURCE_DSIRE:dsire_program_id:4787)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.minnesotaenergyresources.com/business/builders_low_income_rebates.aspx
- JEA - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4608)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.jea.com/business_resources/rebates_for_businesses/
- Columbia River PUD - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:2152)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: http://crpud.net/ways-to-save/at-work
- Indiana Michigan Power - EV Incentive (SOURCE_DSIRE:dsire_program_id:22331)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.indianamichiganpower.com/clean-energy/electric-cars/
- Spire Energy - Commercial and Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5874)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.spireenergy.com/commercial-rebates
- Lake Country Power - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2256)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.lakecountrypower.coop/rates-and-rebates
- Peoples Gas - Residential Rebate Program (SOURCE_DSIRE:dsire_program_id:5233)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.peoplesgasdelivery.com/home/rebates.aspx
- Duke Energy Carolinas - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3465)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.duke-energy.com/home/products/smart-saver
- Beaches Energy Services - Solar Water Heating Rebate Program (SOURCE_DSIRE:dsire_program_id:4438)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://www.beachesenergy.com/my-account/rebates
- New Hampshire Electric Cooperative - Electric Vehicle Rebates (SOURCE_DSIRE:dsire_program_id:22383)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.nhec.com/electric-vehicle-charging/
- Consolidated Electric Cooperative - Residential Rebate Program (SOURCE_DSIRE:dsire_program_id:3291)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.consolidated.coop/electric/residential/rebates/
- Commercial Energy Efficiency Rebates (Offered by 12 Utilities) (SOURCE_DSIRE:dsire_program_id:22561)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.brightenergysolutions.com/members
- PG&E - EV Fleet Program (SOURCE_DSIRE:dsire_program_id:22283)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.pge.com/en_US/large-business/solar-and-vehicles/clean-vehicles/ev-fleet-program/ev-fleet-program.page?ctx=small-medium-business
- Potomac Edison - EV Driven Program (SOURCE_DSIRE:dsire_program_id:22321)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.evdrivenpe.com/
- Salem Electric - Residential, Commercial, and Industrial Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2493)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.salemelectric.com/energy-efficiency/incentives/
- Central New Mexico Electric Cooperative - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2599)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://cnmec.org/cnmec-member-rebates
- New Mexico Gas Company - Residential Efficiency Programs (SOURCE_DSIRE:dsire_program_id:4619)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.nmgco.com/en/residential_rebate_programs
- Unitil (Gas) - Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4822)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://unitil.com/energy-efficiency/energy-efficiency-programs/natural-gas-programs-rebates-assistance
- Pacific Power - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3325)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://wattsmartsavings.net/california-residential/
- NV Energy - Solar Thermal Heating Program (SOURCE_DSIRE:dsire_program_id:4590)
  - reason: source_text_unavailable; method: per_unit; source: https://www.nvenergy.com/cleanenergy/renewable-energy-incentives/solar-heating
- Wakefield Municipal Gas & Light Department - Residential Conservation Services Program (SOURCE_DSIRE:dsire_program_id:1342)
  - reason: source_text_unavailable; method: per_unit; source: http://wmgld.com/energy-programs/
- Jackson EMC - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5236)
  - reason: source_text_unavailable; method: per_unit; source: http://www.jacksonemc.com/rebates
