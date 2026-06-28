# Opportunity Incentive Rule Repair Report

Generated: 2026-06-28T23:42:32.987Z
Targets reviewed: 1058
Rules generated: 252
Manual repair targets: 708
Research-reviewed no-rule targets: 134

## Rule Extraction Counts

```json
{
  "source_url_fetch": 125,
  "gpt_pro_research": 127
}
```

## Rule Confidence Counts

```json
{
  "medium": 145,
  "high": 106,
  "low": 1
}
```

## Remaining Gap Reason Counts

```json
{
  "formula_not_found_in_source_text": 582,
  "source_text_unavailable": 126
}
```

## Research No-Rule Status Counts

```json
{
  "manual_review_required": 26,
  "formula_not_found": 66,
  "not_applicable_for_one_time_savings": 26,
  "unavailable": 2,
  "source_inaccessible": 14
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
  }
]
```

## Notes

- Rules are generated only when deterministic source text or GPT Pro research contains an extractable amount, rate, percentage, or cap.
- GPT Pro research repairs are stored with `extractionMethod: gpt_pro_research` and include source URLs plus short evidence text.
- Targets reviewed by GPT Pro without a safe one-time rule are moved to `researchReviewedNoRule` instead of being repeatedly sent through the same repair queue.
- Broad programs with measure-specific tables often need manual or LLM-assisted extraction because one opportunity can contain many rates.

## First Manual Repair Targets

- Fairmont Public Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2534)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.SaveEnergyInFairmont.com
- Puget Sound Energy - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:1692)
  - reason: source_text_unavailable; method: per_kwh_saved; source: https://www.pse.com/rebates
- Oklahoma Municipal Power Authority - WISE Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_code_title_hash:OK30F:e57fdd96f549)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://programs.dsireusa.org/system/program
- Renewable Energy Renaissance Zones (SOURCE_DSIRE:dsire_program_id:3216)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://www.michiganbusiness.org/4aef8b/globalassets/documents/reports/fact-sheets/renewableenergyrenzones.pdf
- OTEC - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22431)
  - reason: source_text_unavailable; method: per_unit; source: https://www.directefficiency.com/otec-rebates/#otec-commercial
- Lincoln Electric System - Sustainable Energy Program (SOURCE_DSIRE:dsire_program_id:3332)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.les.com/sustainability/sustainable-energy-program
- New Buildings Program (SOURCE_DSIRE:dsire_program_id:2438)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://energytrust.org/newbuildings
- Dakota Electric Association - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2259)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.dakotaelectric.com/member-services/programs-rebates/for-your-home/energy-wise-rebates/
- Portfolio Energy Credits (SOURCE_DSIRE:dsire_program_id:1036)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://www.nvtrec.com
- Rocky Mountain Power - wattsmart Business Program (SOURCE_DSIRE:dsire_program_id:3426)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.rockymountainpower.net/savings-energy-choices/business/wattsmart-efficiency-incentives-wyoming.html
- Vermont Electric Coop - Induction Cooktop Bill Credit (SOURCE_DSIRE:dsire_program_id:22584)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://vermontelectric.coop/energy-transformation-programs
- Community EV Chargers Incentive Program (SOURCE_DSIRE:dsire_program_id:22529)
  - reason: formula_not_found_in_source_text; method: grant_amount; source: https://www.vermontevchargers.com/
- Cedar Falls Utilities - Residential New Construction Program (SOURCE_DSIRE:dsire_program_id:3479)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.cfu.net/save-energy/residential-rebates/#construction
- Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1289)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://focusonenergy.com/residential
- Minnkota Power Cooperative - PowerSaves Residential Rebate Program (SOURCE_DSIRE:dsire_program_id:22453)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.minnkota.com/our-programs/residential-programs
- Liberty Utilities (Gas) - Residential Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:22080)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://new-hampshire.libertyutilities.com/allenstown/residential/smart-energy-use/natural-gas/index.html
- SCE - Charge Ready Program (SOURCE_DSIRE:dsire_program_id:22297)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.sce.com/evbusiness/chargeready
- Delmarva Power - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3744)
  - reason: source_text_unavailable; method: per_unit; source: https://www.delmarva.com/WaysToSave/ForYourHome/Pages/MD/RebatesAndDiscounts.aspx
- Energize Delaware - Home Performance with ENERGY STAR (SOURCE_DSIRE:dsire_program_id:5449)
  - reason: source_text_unavailable; method: per_unit; source: https://www.energizedelaware.org/residential/home-performance-with-energy-star/homeowners/
- Wabash Valley Power Association (23 Member Cooperatives) - Commercial and Industrial Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:22050)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.powermoves.com/rebates/business/
- Entergy Mississippi - Low-to-Moderate Income Residential Incentive Program (SOURCE_DSIRE:dsire_program_id:22542)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://www.entergy-mississippi.com/your_home/tariffs/
- EnergyUnited (Electric) - Residential Energy Efficiency Program (SOURCE_DSIRE:dsire_program_id:22094)
  - reason: source_text_unavailable; method: per_unit; source: https://www.energyunited.com/energy-services/rebates/energy-efficiency-rebates/
- EWEB - Commercial Energy Efficiency Rebates Program (SOURCE_DSIRE:dsire_program_id:2593)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.eweb.org/business-customers/rebates-loans-and-conservation
- Statewide Midstream Water Heating (SOURCE_SDGE_BUSINESS:program_url:statewide_waterheating_com)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.statewide-waterheating.com/
- SDG&E - Residential Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1431)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.sdge.com/buyers-guide/399
- City Utilities of Springfield - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2701)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.cityutilities.net/165/Rebates
- City Utilities of Springfield - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2702)
  - reason: source_text_unavailable; method: per_unit; source: https://www.cityutilities.net/save/commercial/
- Modesto Irrigation District - Electric Vehicle  Charger Rebate Program (SOURCE_DSIRE:dsire_program_id:22525)
  - reason: source_text_unavailable; method: per_unit; source: https://www.mid.org/rebates/ev/default.html
- OTEC - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2316)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://otec.coop/residential
- Central Lincoln PUD Electric Vehicle Charging Station Rebate Program (SOURCE_DSIRE:dsire_program_id:22370)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://clpud.org/energy-efficiency/ev-charging-station-rebate/
- PEPCO - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3745)
  - reason: source_text_unavailable; method: per_kwh_saved; source: https://www.pepco.com/WaysToSave/ForYourHome/Pages/MD/RebatesAndDiscounts.aspx
- Piedmont EMC - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2121)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://pemc.coop/save-energy-money/use-less-save-more/rebates-loans/
- Richland Energy Services - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2837)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.ci.richland.wa.us/departments/energy-services/energy-efficiency/residential-programs-and-rebates
- Indianola Municipal Utilities - Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3105)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.indianola.com/about/utility-programs/energy-efficiency/
- RushShelby Energy - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2664)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://www.rse.coop/energy-savings/rebates/residential/
- Preston Public Utilities - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:2552)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.SaveEnergyInPreston.com
- Central Alabama Electric Cooperative - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1958)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://caec.coop/member-benefits-services/heat-pumps/
- Boulder County - EnergySmart Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4630)
  - reason: formula_not_found_in_source_text; method: per_kw; source: http://www.EnergySmartYES.com/
- Rhode Island Energy (Electric) Commercial and Industrial Rebate Program (SOURCE_DSIRE:dsire_program_id:5756)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.rienergy.com/site/ways-to-save/save-money-with-rebates-and-incentives/savings-for-your-business/instant-commercial-rebates
- Portland General Electric - Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:1674)
  - reason: source_text_unavailable; method: per_kwh_saved; source: https://www.portlandgeneral.com/residential/energy-savings/special-offers-incentives
- Entergy New Orleans - Small and Large Commercial and Industrial Incentives Program (SOURCE_DSIRE:dsire_program_id:3754)
  - reason: source_text_unavailable; method: per_unit; source: https://www.energysmartnola.info/custom-and-prescriptive-incentives/
- Wisconsin - Home Electrification and Appliance Rebate (HEAR) Program (SOURCE_DSIRE:dsire_program_id:22729)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://focusonenergy.com/ira-hear
- North Carolina - Home Electrification and Appliance Rebate (HEAR) Program (SOURCE_DSIRE:dsire_program_id:22748)
  - reason: formula_not_found_in_source_text; method: per_kwh_saved; source: https://energysavernc.org/
- Montana-Dakota Utilities (Gas) - Commercial Natural Gas Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3912)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.montana-dakota.com/conservation/savings-for-your-business
- Hudson Light & Power - Photovoltaic Incentive Program (SOURCE_DSIRE:dsire_program_id:5189)
  - reason: formula_not_found_in_source_text; method: per_kw; source: https://www.hudsonlight.com/rebates
- MidAmerican Energy (Gas) - Residential Energy Efficiency Rebate Programs (SOURCE_DSIRE:dsire_program_id:4193)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.midamericanenergy.com/home-rebates-and-programs
- Louisville Gas and Electric and Kentucky Utilities – WeCare for Homeowners and Renters (SOURCE_DSIRE:dsire_program_id:22695)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://lge-ku.com/wecare
- Dominion Virginia Power - Non-Residential Energy Efficiency Programs (SOURCE_DSIRE:dsire_program_id:4142)
  - reason: source_text_unavailable; method: per_unit; source: https://www.dominionenergy.com/virginia/save-energy/my-business
- Eversource Residential EV Charging Program (SOURCE_DSIRE:dsire_program_id:22548)
  - reason: formula_not_found_in_source_text; method: per_unit; source: https://www.eversource.com/residential/save-money-energy/clean-energy-options/electric-vehicles/charging-stations
- Beaches Energy Services - Commercial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:22062)
  - reason: formula_not_found_in_source_text; method: per_unit; source: http://www.beachesenergy.com/beaches-energy-services-rebates
