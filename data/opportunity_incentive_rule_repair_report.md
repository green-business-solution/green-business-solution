# Opportunity Incentive Rule Repair Report

Generated: 2026-06-29T03:17:48.172Z
Targets reviewed: 1058
Rules generated: 584
Manual repair targets: 183
Research-reviewed no-rule targets: 443

## Rule Extraction Counts

```json
{
  "source_url_fetch": 125,
  "gpt_pro_research": 459
}
```

## Rule Confidence Counts

```json
{
  "medium": 279,
  "high": 304,
  "low": 1
}
```

## Remaining Gap Reason Counts

```json
{
  "source_text_unavailable": 35,
  "formula_not_found_in_source_text": 148
}
```

## Research No-Rule Status Counts

```json
{
  "manual_review_required": 160,
  "formula_not_found": 175,
  "not_applicable_for_one_time_savings": 78,
  "unavailable": 5,
  "source_inaccessible": 25
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
  }
]
```

## Notes

- Rules are generated only when deterministic source text or GPT Pro research contains an extractable amount, rate, percentage, or cap.
- GPT Pro research repairs are stored with `extractionMethod: gpt_pro_research` and include source URLs plus short evidence text.
- Targets reviewed by GPT Pro without a safe one-time rule are moved to `researchReviewedNoRule` instead of being repeatedly sent through the same repair queue.
- Broad programs with measure-specific tables often need manual or LLM-assisted extraction because one opportunity can contain many rates.

## First Manual Repair Targets

- Minnesota Xcel Energy - Business Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:4812)
  - reason: source_text_unavailable; method: per_unit; source: https://mn.my.xcelenergy.com/s/business/lighting-equipment-rebates
- Kootenai Electric Cooperative - Residential Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2453)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.directefficiency.com/kec-residential-rebates/
- Controls Program (SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:controls-program)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.siliconvalleypower.com/businesses/rebates
- Delaware Clean Vehicle Rebate Program (SOURCE_DSIRE:dsire_program_id:22165)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://dnrec.alpha.delaware.gov/climate-coastal-energy/clean-transportation/vehicle-rebates/
- NIPSCO (Gas & Electric) Small Business Direct Install Program (SOURCE_DSIRE:dsire_program_id:5726)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://www.nipsco.com/energy-efficiency/for-your-business/small-business-direct-install-program
- Agricultural Lighting and Equipment Rebate Program (SOURCE_DSIRE:dsire_program_id:4056)
  - reason: source_text_unavailable; method: per_unit; source: https://www.efficiencyvermont.com/products-technologies/agricultural-equipment
- Idaho Power - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3134)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.idahopower.com/ways-to-save/savings-for-your-home/
- Anoka Municipal Utility - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3409)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.anokamunicipalutility.com/381/Commercial-Rebates
- Tampa Electric - Commercial Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:3355)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.tampaelectric.com/business/saveenergy/
- Ameren Illinois - Instant Incentives Program (SOURCE_DSIRE:dsire_program_id:3812)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://amerenillinoissavings.com/business/incentives-services/instant-incentives/
- (Electric and Gas)  Residential New Construction Program (SOURCE_DSIRE:dsire_program_id:4342)
  - reason: source_text_unavailable; method: per_unit; source: https://energizect.com/your-home/solutions-list/residential-new-construction-program
- Questar Gas - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4785)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.thermwise.com/business-applications-wyoming/
- Energy Efficiency Program for Manufacturers (SOURCE_DSIRE:dsire_program_id:5587)
  - reason: source_text_unavailable; method: grant_amount; source: https://development.ohio.gov/community/redevelopment/energy-efficiency-program
- It Pay$ to Plug in Program (SOURCE_DSIRE:dsire_program_id:22199)
  - reason: source_text_unavailable; method: grant_amount; source: https://www.drivegreen.nj.gov/plugin.html
- SoCalGas - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:1461)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.socalgas.com/save-money-and-energy/rebates-and-incentives/natural-gas-appliance-rebates
- Peoples Gas - Single Family Direct Install (SOURCE_DSIRE:dsire_program_id:5403)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.peoplesgasdelivery.com/home/rebates_direct.aspx
- MMPA - Commercial and Industrial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:4739)
  - reason: source_text_unavailable; method: per_unit; source: http://mmpa.org/conservation/we-save-business/
- AEP Public Service Company of Oklahoma - Commercial Rebate Program (SOURCE_DSIRE:dsire_program_id:3659)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://powerforwardwithpso.com/rebates/
- El Paso Electric Company - Commercial Efficiency Program (SOURCE_DSIRE:dsire_program_id:3841)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.epesaver.com/
- Baltimore Gas & Electric Company (Electric) - Commercial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:3385)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://bgesmartenergy.com/business/business-programs/energy-solutions-business
- Alexandria Light and Power - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1931)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.alputilities.com/rebate-category/business/
- Duke Energy Florida - Off-Peak Charging Credit (SOURCE_DSIRE:dsire_program_id:22741)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.duke-energy.com/home/products/ev-complete/off-peak-credit
- Vera Water & Power - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2241)
  - reason: source_text_unavailable; method: per_unit; source: https://verawaterandpower.com/residential-rebates-2/
- Ameren Illinois - Energy-Efficiency Program (SOURCE_DSIRE:dsire_program_id:4698)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://amerenillinoissavings.com/business/incentives-services/
- Fort Pierce Utilities Authority - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3619)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://fpua.com/ways-to-save/
- Southeastern Electric - Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5138)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://southeasternelectric.com/member-rebates-incentives/
- Gainesville Regional Utilities - Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1450)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.gru.com/TabID/3659/Default.aspx
- Groton Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1772)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://grotonutilities.com/energy-conservation/rebate-center/
- Butler Rural Electric Cooperative - Residential Rebate Program (SOURCE_DSIRE:dsire_program_id:3329)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.butlerrural.coop/geothermal-rebates
- Alaska - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22666)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://www.akenergyauthority.org/What-We-Do/Alternative-Energy-and-Energy-Efficiency-Programs/Electric-Vehicles/EV-Infrastructure-Implementation-Plan#:~:text=Through%20the%20NEVI%20program%2C%20Alaska,and%20urban%20areas%20across%20Alaska.
- Owen Electric - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2301)
  - reason: source_text_unavailable; method: per_unit; source: https://www.owenelectric.com/energy-efficiency-info-programs-rebates
- Eversource - Home Battery Storage Rebate (SOURCE_DSIRE:dsire_program_id:22576)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.eversource.com/content/residential/save-money-energy/energy-efficiency-programs/demand-response/battery-storage-demand-response/nh
- Saint Peter Municipal Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2586)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.SaveEnergyInSaintPeter.com
- Alaska Power and Telephone - AMP-UP Program (SOURCE_DSIRE:dsire_program_id:22263)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.aptalaska.com/amp-up/
- WIN Energy REMC - Residential Rebate Program (SOURCE_DSIRE:dsire_program_id:2670)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.winenergyremc.com/residential-rebate-program
- Rhode Island Energy (Gas) - Residential Gas Heating Rebate Programs (SOURCE_DSIRE:dsire_program_id:3024)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/natural-gas-heating
- Hawaii - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22630)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/
- FirstEnergy (MetEdison, Penelec, Penn Power, West Penn Power)  - Residential Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:4133)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.firstenergycorp.com/save_energy/save_energy_pennsylvania/for_your_home_pa.html
- Missouri Rural Electric Cooperative - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4482)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.morec.org/rebates-products/
- DC Fast Charging and Hydrogen Fueling Grant Program (SOURCE_DSIRE:dsire_program_id:22229)
  - reason: source_text_unavailable; method: grant_amount; source: https://gis.dep.pa.gov/DrivingPAForward/
- Critical Peak Pricing Plans (SOURCE_SDGE_BUSINESS:program_url:myenergycenter_com)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://myenergycenter.com/
- Lansing Board of Water & Light - Hometown Energy Savers Commercial Rebates (SOURCE_DSIRE:dsire_program_id:4754)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.lbwl.com/EnergySavers
- Duke Energy - Residential and Builder Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2296)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.duke-energy.com/home/products/smart-saver
- Owatonna Public Utilities - Residential Conserve and Save Rebate Program (SOURCE_DSIRE:dsire_program_id:1944)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.owatonnautilities.com/residential-customers/residential-rebates
- Johnson County REMC - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:5381)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://jcremc.com/savings/rebates/
- Lake City Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2543)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.SaveEnergyInLakeCity.com
- Dominion Energy - ThermWise Home Builder Rebate Program (SOURCE_DSIRE:dsire_program_id:5036)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.thermwise.com/builder-rebates/
- Louisiana - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22636)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: http://wwwsp.dotd.la.gov/Inside_LaDOTD/Divisions/Operations/Electric-Vehicle/Pages/default.aspx
- Oklahoma Electric Cooperative - Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3590)
  - reason: source_text_unavailable; method: per_unit; source: https://okcoop.org/energy-efficiency-rebates/
- Indiana - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22644)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://chargingthecrossroads.com/
