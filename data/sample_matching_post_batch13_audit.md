# Sample Matching Post-Batch13 Audit

Generated: 2026-07-01T03:16:47.016Z
Sample cases: 50
Top-result rows inspected: 525
Flagged rows: 355
Flagged rank-1 rows: 47

## Workstream Split

- Opportunity data issues: 271
- Matching/ranking issues: 208
- Pending GPT target top-result rows: 31
- Unrepaired low-confidence top-result rows: 240
- Non-physical top-result rows: 23
- Local scope/state-only risk rows: 11
- Financing/tax high-rank rows: 105

## Interpretation

- The parallel GPT Pro batches should directly reduce the pending-target and unrepaired low-confidence counts.
- Repeated federal tax, loan, certification, permit, or local programs at rank 1 are ranking/category-boundary work, not just source-data cleanup.
- Local city or county programs matched only by state should get stronger geography handling after the data cleanup pass.

## Top Opportunity-Data Targets Appearing In Current Top Results

- Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658): 26 appearances, 12 rank-1, target #61; pending_gpt_repair_target=26, financing_or_tax_program_high_rank=25
- USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313): 11 appearances, 11 rank-1, not in next target list; financing_or_tax_program_high_rank=11, planning_or_certification_high_rank=11, unrepaired_low_confidence_opportunity_data=11
- City of San Diego - Sustainable Building Expedited Permit Program (SOURCE_DSIRE:dsire_program_id:4790): 10 appearances, 8 rank-1, not in next target list; non_physical_top_result=10, planning_or_certification_high_rank=10, unrepaired_low_confidence_opportunity_data=10
- USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511): 46 appearances, 6 rank-1, not in next target list; unrepaired_low_confidence_opportunity_data=46, financing_or_tax_program_high_rank=36
- C-PACE: Efficiency Maine (SOURCE_DSIRE:dsire_program_id:22591): 1 appearances, 1 rank-1, not in next target list; financing_or_tax_program_high_rank=1, unrepaired_low_confidence_opportunity_data=1
- PACE Massachusetts Financing (SOURCE_DSIRE:dsire_program_id:22037): 1 appearances, 1 rank-1, not in next target list; financing_or_tax_program_high_rank=1, unrepaired_low_confidence_opportunity_data=1
- PNM EV Charger Rebate Program (SOURCE_DSIRE:dsire_program_id:22406): 1 appearances, 1 rank-1, not in next target list; unrepaired_low_confidence_opportunity_data=1
- Rocky Mountain Power - wattsmart Business Program (SOURCE_DSIRE:dsire_program_id:2412): 1 appearances, 1 rank-1, not in next target list; unrepaired_low_confidence_opportunity_data=1
- Solar Renewable Energy Credits (SOURCE_DSIRE:dsire_program_id:5686): 1 appearances, 1 rank-1, not in next target list; financing_or_tax_program_high_rank=1, unrepaired_low_confidence_opportunity_data=1
- WSHFC Sustainable Energy Program (SOURCE_DSIRE:dsire_program_id:5840): 1 appearances, 1 rank-1, not in next target list; financing_or_tax_program_high_rank=1, unrepaired_low_confidence_opportunity_data=1
- Energy-Efficient Commercial Buildings Tax Deduction (SOURCE_DSIRE:dsire_program_id:1271): 13 appearances, 0 rank-1, not in next target list; unrepaired_low_confidence_opportunity_data=13
- California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program (SOURCE_DSIRE:dsire_program_id:22629): 9 appearances, 0 rank-1, not in next target list; unrepaired_low_confidence_opportunity_data=9
- GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO) (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607): 7 appearances, 0 rank-1, not in next target list; unrepaired_low_confidence_opportunity_data=7
- GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902): 6 appearances, 0 rank-1, not in next target list; unrepaired_low_confidence_opportunity_data=6
- Office of Indian Energy Policy and Programs - Funding Opportunities (SOURCE_DSIRE:dsire_program_id:918): 6 appearances, 0 rank-1, not in next target list; unrepaired_low_confidence_opportunity_data=6
- San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105): 6 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=6, unrepaired_low_confidence_opportunity_data=6
- Plumas-Sierra REC - Commercial and Irrigation Rebate Program (SOURCE_DSIRE:dsire_program_id:22067): 5 appearances, 0 rank-1, not in next target list; unrepaired_low_confidence_opportunity_data=5
- Low Income Home Energy Assistance Program (LIHEAP) (SOURCE_DSIRE:dsire_program_id:5712): 4 appearances, 0 rank-1, not in next target list; unrepaired_low_confidence_opportunity_data=4
- Azusa Light & Water - EV Charger Rebate (SOURCE_DSIRE:dsire_program_id:22278): 2 appearances, 0 rank-1, not in next target list; unrepaired_low_confidence_opportunity_data=2
- City of Memphis - PILOT Program (SOURCE_DSIRE:dsire_program_id:22676): 2 appearances, 0 rank-1, not in next target list; non_physical_top_result=2, unrepaired_low_confidence_opportunity_data=2

## Top Matching/Ranking Candidates

- Business Energy Investment Tax Credit (ITC) (SOURCE_DSIRE:dsire_program_id:658): 26 appearances, 12 rank-1, target #61; pending_gpt_repair_target=26, financing_or_tax_program_high_rank=25
- USDA - Biorefinery, Renewable Chemical, and Biobased Product Manufacturing Assistance Program (SOURCE_DSIRE:dsire_program_id:5313): 11 appearances, 11 rank-1, not in next target list; financing_or_tax_program_high_rank=11, planning_or_certification_high_rank=11, unrepaired_low_confidence_opportunity_data=11
- City of San Diego - Sustainable Building Expedited Permit Program (SOURCE_DSIRE:dsire_program_id:4790): 10 appearances, 8 rank-1, not in next target list; non_physical_top_result=10, planning_or_certification_high_rank=10, unrepaired_low_confidence_opportunity_data=10
- USDA - Rural Energy for America Program (REAP) Loan Guarantees (SOURCE_DSIRE:dsire_program_id:2511): 46 appearances, 6 rank-1, not in next target list; unrepaired_low_confidence_opportunity_data=46, financing_or_tax_program_high_rank=36
- C-PACE: Efficiency Maine (SOURCE_DSIRE:dsire_program_id:22591): 1 appearances, 1 rank-1, not in next target list; financing_or_tax_program_high_rank=1, unrepaired_low_confidence_opportunity_data=1
- City of Boulder - Solar Grant Program (SOURCE_DSIRE:dsire_program_id:2948): 1 appearances, 1 rank-1, not in next target list; local_scope_matched_by_state_only=1
- ConEd - Multifamily Energy Efficiency Incentives Program (SOURCE_DSIRE:dsire_program_id:3821): 1 appearances, 1 rank-1, not in next target list; empty_retrofit_type_top_result=1
- Electric Vehicle Income Tax Credit (SOURCE_DSIRE:dsire_program_id:22156): 1 appearances, 1 rank-1, not in next target list; financing_or_tax_program_high_rank=1
- PACE Massachusetts Financing (SOURCE_DSIRE:dsire_program_id:22037): 1 appearances, 1 rank-1, not in next target list; financing_or_tax_program_high_rank=1, unrepaired_low_confidence_opportunity_data=1
- Solar Renewable Energy Credits (SOURCE_DSIRE:dsire_program_id:5686): 1 appearances, 1 rank-1, not in next target list; financing_or_tax_program_high_rank=1, unrepaired_low_confidence_opportunity_data=1
- Tax Exemption for Renewable Energy Generation (SOURCE_DSIRE:dsire_program_id:104): 1 appearances, 1 rank-1, not in next target list; financing_or_tax_program_high_rank=1, state_mismatch_visible_top_result=1
- WSHFC Sustainable Energy Program (SOURCE_DSIRE:dsire_program_id:5840): 1 appearances, 1 rank-1, not in next target list; financing_or_tax_program_high_rank=1, unrepaired_low_confidence_opportunity_data=1
- U.S. Department of Energy - Loan Guarantee Program (SOURCE_DSIRE:dsire_program_id:3071): 10 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=10
- GFO-25-307 - Direct Air Capture Pre-Commercial Demonstration and Community Engagement (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-307): 7 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=7
- RFQ-25-401 - Energy Code Compliance Evaluation Support (SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:RFQ-25-401): 7 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=7
- San Diego County - Green Building Program (SOURCE_DSIRE:dsire_program_id:1105): 6 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=6, unrepaired_low_confidence_opportunity_data=6
- Modified Accelerated Cost-Recovery System (MACRS) (SOURCE_DSIRE:dsire_program_id:676): 5 appearances, 0 rank-1, not in next target list; financing_or_tax_program_high_rank=5
- Energy-Efficient Mortgages (SOURCE_DSIRE:dsire_program_id:742): 4 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=4, financing_or_tax_program_high_rank=3
- Alternative Energy Property Tax Exemption (SOURCE_DSIRE:dsire_program_id:22142): 3 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=3
- Energy-Efficient New Homes Tax Credit for Home Builders (SOURCE_DSIRE:dsire_program_id:1272): 3 appearances, 0 rank-1, not in next target list; empty_retrofit_type_top_result=3

## Highest-Issue Sample Cases

- california-endowment-hq: 11 flagged top results (9 data, 5 ranking)
- melissas-vernon-distribution: 11 flagged top results (9 data, 5 ranking)
- northgate-market-anaheim: 11 flagged top results (9 data, 5 ranking)
- one-community-health-midtown: 11 flagged top results (8 data, 6 ranking)
- westin-pasadena: 11 flagged top results (9 data, 5 ranking)
- ikea-burbank: 10 flagged top results (8 data, 5 ranking)
- portland-food-coop-maine: 10 flagged top results (10 data, 3 ranking)
- bmw-spartanburg-plant: 9 flagged top results (7 data, 5 ranking)
- fender-corona-plant: 9 flagged top results (8 data, 3 ranking)
- gm-factory-zero-detroit: 9 flagged top results (5 data, 6 ranking)
- juniper-and-ivy-san-diego: 9 flagged top results (6 data, 4 ranking)
- qts-richmond-data-center: 9 flagged top results (4 data, 6 ranking)
- santa-clara-university-campus: 9 flagged top results (7 data, 6 ranking)
- seghesio-healdsburg-winery: 9 flagged top results (8 data, 5 ranking)
- the-rose-minneapolis-household: 9 flagged top results (6 data, 3 ranking)
- eastern-market-detroit: 8 flagged top results (5 data, 7 ranking)
- food-bank-rockies-aurora-dc: 8 flagged top results (6 data, 3 ranking)
- uaf-akasofu-building: 8 flagged top results (6 data, 5 ranking)
- zingermans-deli-ann-arbor: 8 flagged top results (4 data, 6 ranking)
- boeing-everett-factory: 7 flagged top results (6 data, 4 ranking)
