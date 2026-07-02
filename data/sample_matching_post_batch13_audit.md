# Sample Matching Current Opportunity-Data Audit

Generated: 2026-07-02T01:01:10.125Z
Sample cases: 50
Top-result rows inspected: 525
Flagged rows: 249
Flagged rank-1 rows: 46

## Workstream Split

- Opportunity data issues: 67
- Matching/ranking issues: 208
- Pending GPT target top-result rows: 50
- Unrepaired low-confidence top-result rows: 17
- Non-physical top-result rows: 23
- Local scope/state-only risk rows: 11
- Financing/tax high-rank rows: 105

## Interpretation

- Completed GPT Pro opportunity-data batches should reduce pending-target and unrepaired low-confidence counts as they are applied.
- Repeated federal tax, loan, certification, permit, or local programs at rank 1 are ranking/category-boundary work, not just source-data cleanup.
- Local city or county programs matched only by state should get stronger geography handling after the data cleanup pass.

## Top Opportunity-Data Targets Appearing In Current Top Results

- PACE Massachusetts Financing (SOURCE_DSIRE:dsire_program_id:22037): 1 appearances, 1 rank-1, target #12; financing_or_tax_program_high_rank=1, pending_gpt_repair_target=1
- PNM EV Charger Rebate Program (SOURCE_DSIRE:dsire_program_id:22406): 1 appearances, 1 rank-1, target #278; pending_gpt_repair_target=1
- Solar Renewable Energy Credits (SOURCE_DSIRE:dsire_program_id:5686): 1 appearances, 1 rank-1, target #296; financing_or_tax_program_high_rank=1, pending_gpt_repair_target=1
- WSHFC Sustainable Energy Program (SOURCE_DSIRE:dsire_program_id:5840): 1 appearances, 1 rank-1, target #308; financing_or_tax_program_high_rank=1, pending_gpt_repair_target=1
- GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607): 7 appearances, 0 rank-1, target #377; pending_gpt_repair_target=7
- San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105): 6 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=6, unrepaired_low_confidence_opportunity_data=6
- Azusa Light & Water - EV Charger Rebate (SOURCE_DSIRE:dsire_program_id:22278): 2 appearances, 0 rank-1, target #319; pending_gpt_repair_target=2
- Energy Equipment Property Tax Exemption (SOURCE_DSIRE:dsire_program_id:1683): 2 appearances, 0 rank-1, target #209; financing_or_tax_program_high_rank=2, pending_gpt_repair_target=2
- Level 2 EV Charging Rebate Program (SOURCE_DSIRE:dsire_program_id:22230): 2 appearances, 0 rank-1, target #399; pending_gpt_repair_target=2
- Property Tax Exclusion for Solar Energy Systems and Solar Plus Storage System (SOURCE_DSIRE:dsire_program_id:558): 2 appearances, 0 rank-1, target #218; pending_gpt_repair_target=2
- ACE Georgia - Business Loan Program (SOURCE_DSIRE:dsire_program_id:22478): 1 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=1, unrepaired_low_confidence_opportunity_data=1
- Alliant Energy Interstate Power and Light - Commercial and Industrial Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:4971): 1 appearances, 0 rank-1, target #133; pending_gpt_repair_target=1
- Ameren Illinois Distributed Generation Rebate Program (SOURCE_DSIRE:dsire_program_id:22553): 1 appearances, 0 rank-1, target #313; pending_gpt_repair_target=1
- Anaheim Public Utilities - Personal Use EV Charger Rebates (SOURCE_DSIRE:dsire_program_id:22275): 1 appearances, 0 rank-1, target #315; pending_gpt_repair_target=1
- Burbank Water & Power - Energy Solutions Business Rebate Program (SOURCE_DSIRE:dsire_program_id:1630): 1 appearances, 0 rank-1, target #106; pending_gpt_repair_target=1
- City of Chicago - Green Building Permit Programs (SOURCE_DSIRE:dsire_program_id:2466): 1 appearances, 0 rank-1, target #171; pending_gpt_repair_target=1, planning_or_certification_high_rank=1
- Clean Fuel Advanced Technology (CFAT) Project (SOURCE_DSIRE:dsire_program_id:22215): 1 appearances, 0 rank-1, target #240; pending_gpt_repair_target=1
- ComEd - Energy Efficiency Program for Commercial New Construction (SOURCE_DSIRE:dsire_program_id:3716): 1 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=1, unrepaired_low_confidence_opportunity_data=1
- Consolidated Edison - SmartCharge New York (SOURCE_DSIRE:dsire_program_id:22388): 1 appearances, 0 rank-1, target #346; pending_gpt_repair_target=1
- Duke Energy - Non-Residential Energy Efficiency Rebate Program (SOURCE_DSIRE:dsire_program_id:3466): 1 appearances, 0 rank-1, target #178; pending_gpt_repair_target=1

## Top Matching/Ranking Candidates

- Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658): 25 appearances, 12 rank-1, not in next target list; financing_or_tax_program_high_rank=25
- USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313): 11 appearances, 11 rank-1, not in next target list; financing_or_tax_program_high_rank=11, planning_or_certification_high_rank=11
- City of San Diego - Sustainable Building Expedited Permit Program (SOURCE_DSIRE:dsire_program_id:4790): 10 appearances, 8 rank-1, not in next target list; non_physical_top_result=10, planning_or_certification_high_rank=10, local_scope_matched_by_state_only=9
- USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511): 36 appearances, 6 rank-1, not in next target list; financing_or_tax_program_high_rank=36
- C-PACE: Efficiency Maine (SOURCE_DSIRE:dsire_program_id:22591): 1 appearances, 1 rank-1, not in next target list; financing_or_tax_program_high_rank=1
- City of Boulder - Solar Grant Program (SOURCE_DSIRE:dsire_program_id:2948): 1 appearances, 1 rank-1, not in next target list; local_scope_matched_by_state_only=1
- ConEd - Multifamily Energy Efficiency Incentives Program (SOURCE_DSIRE:dsire_program_id:3821): 1 appearances, 1 rank-1, not in next target list; empty_retrofit_type_top_result=1
- Electric Vehicle Income Tax Credit (SOURCE_DSIRE:dsire_program_id:22156): 1 appearances, 1 rank-1, not in next target list; financing_or_tax_program_high_rank=1
- PACE Massachusetts Financing (SOURCE_DSIRE:dsire_program_id:22037): 1 appearances, 1 rank-1, target #12; financing_or_tax_program_high_rank=1, pending_gpt_repair_target=1
- Solar Renewable Energy Credits (SOURCE_DSIRE:dsire_program_id:5686): 1 appearances, 1 rank-1, target #296; financing_or_tax_program_high_rank=1, pending_gpt_repair_target=1
- Tax Exemption for Renewable Energy Generation (SOURCE_DSIRE:dsire_program_id:104): 1 appearances, 1 rank-1, not in next target list; financing_or_tax_program_high_rank=1, state_mismatch_visible_top_result=1
- WSHFC Sustainable Energy Program (SOURCE_DSIRE:dsire_program_id:5840): 1 appearances, 1 rank-1, target #308; financing_or_tax_program_high_rank=1, pending_gpt_repair_target=1
- U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071): 10 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=10
- GFO-25-307 - Direct Air Capture Pre-Commercial Demonstration and Community Engagement (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-307): 7 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=7
- RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401): 7 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=7
- San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105): 6 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=6, unrepaired_low_confidence_opportunity_data=6
- Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676): 5 appearances, 0 rank-1, not in next target list; financing_or_tax_program_high_rank=5
- Energy-Efficient Mortgages (SOURCE_DSIRE:dsire_program_id:742): 4 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=4, financing_or_tax_program_high_rank=3
- Alternative Energy Property Tax Exemption (SOURCE_DSIRE:dsire_program_id:22142): 3 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=3
- Energy-Efficient New Homes Tax Credit for Home Builders (SOURCE_DSIRE:dsire_program_id:1272): 3 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=3

## Highest-Issue Sample Cases

- common-ground-coop-urbana: 7 flagged top results (4 data, 5 ranking)
- eastern-market-detroit: 7 flagged top results (0 data, 7 ranking)
- ikea-burbank: 7 flagged top results (3 data, 5 ranking)
- melissas-vernon-distribution: 7 flagged top results (3 data, 5 ranking)
- northgate-market-anaheim: 7 flagged top results (3 data, 5 ranking)
- one-community-health-midtown: 7 flagged top results (2 data, 6 ranking)
- via-verde-bronx-renter-household: 7 flagged top results (3 data, 6 ranking)
- big-dipper-missoula: 6 flagged top results (3 data, 3 ranking)
- california-endowment-hq: 6 flagged top results (2 data, 5 ranking)
- fender-corona-plant: 6 flagged top results (3 data, 3 ranking)
- gm-factory-zero-detroit: 6 flagged top results (0 data, 6 ranking)
- hersheys-chocolate-world-hershey: 6 flagged top results (2 data, 5 ranking)
- juniper-and-ivy-san-diego: 6 flagged top results (2 data, 4 ranking)
- la-montanita-nob-hill-albuquerque: 6 flagged top results (2 data, 4 ranking)
- qts-richmond-data-center: 6 flagged top results (0 data, 6 ranking)
- quaker-oats-cedar-rapids: 6 flagged top results (1 data, 5 ranking)
- santa-clara-university-campus: 6 flagged top results (2 data, 6 ranking)
- seghesio-healdsburg-winery: 6 flagged top results (2 data, 5 ranking)
- westin-pasadena: 6 flagged top results (2 data, 5 ranking)
- zingermans-deli-ann-arbor: 6 flagged top results (0 data, 6 ranking)
