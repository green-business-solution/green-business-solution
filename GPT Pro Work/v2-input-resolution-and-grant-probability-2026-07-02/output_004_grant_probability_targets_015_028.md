{
"schemaVersion": "retrofi_grant_probability_repair.v1",
"researchedAt": "2026-07-02",
"promptId": "grant_probability_015_028",
"batchRange": "015-028",
"repairs": [
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22374",
"effectId": "effect_one_time_savings_1_f0e22f4ef84898c3",
"programName": "Portland General Electric (PGE) - Residential EV Charging Pilot Program",
"availabilityStatus": "active",
"cashValueClassification": "rebate",
"sourceConfidence": "high",
"grantValueModelKind": "fixed_tier_amount",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "PGE Plus residential rebates are tiered by charger/equipment eligibility, income tier, and installation scope. Published amounts include up to $300 toward a qualified charger, up to $1,000 income-based charger support, up to $1,000 for an electrical panel upgrade, and up to $5,000 income-based panel-upgrade support; PGE also states customers may qualify for at least $300 and up to $6,000 in rebates. Tesla or non-qualified compatible connected-charging enrollment can qualify for a $50 Smart Charging rebate rather than the PGE Plus installation package.",
"conditionalAwardCents": null,
"minAwardCents": 30000,
"maxAwardCents": 600000,
"costSharePercent": null,
"requiredProjectInputs": [
"pge_residential_account",
"homeownership_or_eligible_site",
"ev_ownership_or_lease",
"income_tier",
"charger_model_or_vehicle_telematics_eligibility",
"installation_path",
"panel_upgrade_scope",
"smart_charging_enrollment",
"site_eligibility"
],
"calculationTrace": [
"Use the applicable PGE Plus tier after confirming residential account, eligible site, EV ownership or lease, qualified Level 2 charger, installation path, and Smart Charging enrollment.",
"If the project qualifies for both charger and income-qualified panel upgrade support, the published cap is $6,000.",
"If the customer only uses connected charging with Tesla or another non-qualified compatible charger, use the $50 rebate path instead of the $300-$6,000 PGE Plus installation range."
]
},
"probabilityEvidence": {
"status": "not_required_deterministic",
"probabilityDiscount": null,
"probabilityEvidenceType": "not_required",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "utility_territory",
"probabilityNotes": "This is a utility rebate/credit structure, not a competitive grant. Probability discounting is not required once eligibility, tier, installation path, and program availability are confirmed."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No competitive-award prior is needed because the value is deterministic after eligibility and tier inputs are known.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_project_scope",
"expectedValueCents": null,
"estimateConfidence": "medium",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"deterministic_rebate_but_missing_tier_inputs",
"requires_smart_charging_enrollment",
"needs_installation_path_or_quote"
]
},
"sourceUrlsChecked": [
"[https://portlandgeneral.com/energy-choices/electric-vehicles-charging/charging-your-ev/charging-your-ev-at-home](https://portlandgeneral.com/energy-choices/electric-vehicles-charging/charging-your-ev/charging-your-ev-at-home)",
"[https://portlandgeneral.com/charge-faster](https://portlandgeneral.com/charge-faster)",
"[https://portlandgeneral.com/pge-plus-static](https://portlandgeneral.com/pge-plus-static)",
"[https://portlandgeneral.com/pge-plus-faq](https://portlandgeneral.com/pge-plus-faq)",
"[https://portlandgeneral.com/secure/pge-plus/ev-charger/rebate-only](https://portlandgeneral.com/secure/pge-plus/ev-charger/rebate-only)",
"[https://portlandgeneral.com/blog/how-to-charge-an-ev-at-home](https://portlandgeneral.com/blog/how-to-charge-an-ev-at-home)"
],
"evidenceText": "PGE publishes residential EV charging rebate/credit paths, including Smart Charging rebates and seasonal bill credits, PGE Plus eligibility requirements, and PGE Plus rebate examples stating at least $300 and up to $6,000 depending on income and installation path. ([Portland General Electric][1])",
"reasoningNotes": "Repair based on target record in the uploaded batch plus official PGE sources. Batch source cited:  The prior expected-value framing should be replaced with a deterministic rebate model that stays out of user-facing totals until the tier and project path are known."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22529",
"effectId": "effect_one_time_savings_1_e29ce1b501eddf87",
"programName": "Community EV Chargers Incentive Program",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "high",
"grantValueModelKind": "hybrid_rate_plus_cap",
"conditionalAward": {
"status": "needs_project_cost",
"formulaText": "For eligible workplace or multi-unit residential Level 1/Level 2 projects, grant amount equals eligible charger hardware plus make-ready/installation costs multiplied by the applicable program coverage rate after applicant match, subject to charger/equipment, project/site, county, funding-availability, and applicant caps. Published coverage is generally 90% to 100% depending on applicant type, with a $100,000 applicant cap for eligible L1/L2 workplace and multi-unit residential grants.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": 10000000,
"costSharePercent": null,
"requiredProjectInputs": [
"site_track",
"applicant_type",
"county",
"charger_level",
"ocpp_compliance",
"number_of_ports",
"employee_count_or_dwelling_unit_count",
"eligible_hardware_cost",
"eligible_make_ready_and_installation_cost",
"required_applicant_match_percentage",
"county_funding_status",
"applicant_remaining_cap"
],
"calculationTrace": [
"Determine whether the project is in an open workplace or multi-unit residential track.",
"Apply the applicant-type match rule to identify the coverage rate: 90%, 95%, or 100% where applicable.",
"Calculate eligible cost support and then cap by equipment/project/county limits and the $100,000 applicant cap.",
"Do not apply the public-attraction DCFC track unless that track is separately verified open and funded."
]
},
"probabilityEvidence": {
"status": "first_come_funding_unknown",
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "sector_specific",
"probabilityNotes": "Program FAQs describe eligible applications as awarded on a first-come, first-served basis, but official funding-status updates show county and track-specific funding constraints. A deterministic estimate requires a current funding check for the county and track."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No competitive-prior discount should be applied because the program is first-come/eligibility-and-funding dependent rather than scored competitive; RetroFi should require a funding check.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_funding_check",
"expectedValueCents": null,
"estimateConfidence": "medium",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"first_come_program",
"funding_varies_by_county_and_track",
"needs_project_cost",
"needs_applicant_type"
]
},
"sourceUrlsChecked": [
"[https://www.chargevermont.com/](https://www.chargevermont.com/)",
"[https://www.chargevermont.com/apply/](https://www.chargevermont.com/apply/)",
"[https://www.chargevermont.com/workplace-chargers/](https://www.chargevermont.com/workplace-chargers/)",
"[https://www.chargevermont.com/multi-unit-residential-chargers/](https://www.chargevermont.com/multi-unit-residential-chargers/)",
"[https://www.chargevermont.com/public-attraction-chargers/](https://www.chargevermont.com/public-attraction-chargers/)",
"[https://www.chargevermont.com/faqs/](https://www.chargevermont.com/faqs/)",
"[https://www.chargevermont.com/funding-status-updates/](https://www.chargevermont.com/funding-status-updates/)",
"[https://www.chargevermont.com/news-updates-2/](https://www.chargevermont.com/news-updates-2/)"
],
"evidenceText": "Charge Vermont states that workplace grants can cover 90% to 100% depending on applicant type and lists a $100,000 applicant cap; FAQs state eligible applications are awarded first-come, first-served; the funding-status page reports county/track funding constraints and remaining multi-unit funding. ([Vermont EV Charging][2])",
"reasoningNotes": "This should not be treated as a competitive expected value. It is a conditional grant/reimbursement-like incentive whose calculation needs eligible costs and a current track/county funding check."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22629",
"effectId": "effect_grant_expected_value_1_c93b27f2d9d796eb",
"programName": "California - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "high",
"grantValueModelKind": "competitive_cost_share",
"conditionalAward": {
"status": "needs_project_cost",
"formulaText": "For a selected California CEC NEVI solicitation project, conditional grant amount is the lesser of the requested/approved grant amount, 80% of CEC-approved eligible project cost, and any solicitation-specific funding or site caps.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": 80,
"requiredProjectInputs": [
"solicitation_number",
"eligible_project_cost",
"requested_grant_amount",
"match_funding",
"dcfc_site_and_corridor_compliance",
"award_selection_status",
"solicitation_specific_caps"
],
"calculationTrace": [
"Confirm the applicable CEC NEVI solicitation and whether the site is selected.",
"Calculate 80% of approved eligible project cost.",
"Cap at the requested/approved grant amount and any solicitation-specific limits."
]
},
"probabilityEvidence": {
"status": "evidence_not_found",
"probabilityDiscount": null,
"probabilityEvidenceType": "none",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": 7900000000,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "Official sources identify an active competitive CEC NEVI solicitation and funding amount, but no current application count, historical success-rate denominator, or expected award count was verified for discounting."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "Only a human-reviewed prior should be used for competitive NEVI solicitations without application and award-count evidence.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "suppressed",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"competitive_grant",
"cost_share_cap_only",
"missing_probability_anchor",
"needs_project_cost"
]
},
"sourceUrlsChecked": [
"[https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs](https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs)",
"[https://www.energy.ca.gov/programs-and-topics/programs/national-electric-vehicle-infrastructure-nevi-formula-program](https://www.energy.ca.gov/programs-and-topics/programs/national-electric-vehicle-infrastructure-nevi-formula-program)",
"[https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula](https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula)",
"[https://afdc.energy.gov/laws/12744](https://afdc.energy.gov/laws/12744)",
"[https://programs.dsireusa.org/system/program/detail/22629/california-national-electric-vehicle-infrastructure-nevi-formula-grant-program](https://programs.dsireusa.org/system/program/detail/22629/california-national-electric-vehicle-infrastructure-nevi-formula-grant-program)"
],
"evidenceText": "CEC identifies GFO-25-603 as California's NEVI Formula Program solicitation with up to $79 million available for public high-powered DC fast charging; federal NEVI cost share is up to 80% of eligible costs. ([California Energy Commission][3])",
"reasoningNotes": "The 80% figure is a conditional selected-project cost-share cap, not an expected value. Suppress from default totals unless RetroFi later approves a probability prior or the applicant is selected."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22630",
"effectId": "effect_grant_expected_value_1_83bd8b19270e1ac1",
"programName": "Hawaii - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"availabilityStatus": "active",
"cashValueClassification": "reimbursement",
"sourceConfidence": "high",
"grantValueModelKind": "formula_grant",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "For an HDOT-selected or HDOT-contracted NEVI deployment site, federal NEVI participation may cover up to 80% of approved eligible project cost, with the remaining share supplied by state, private, or other non-federal sources. No standard open customer-facing award table was verified.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": 80,
"requiredProjectInputs": [
"hdot_selection_or_contract_status",
"nevi_site_location",
"charger_power_and_port_count",
"eligible_project_cost",
"approved_cost_share",
"approved_award_amount"
],
"calculationTrace": [
"Confirm the project is part of an HDOT NEVI deployment or contract.",
"Use the approved federal share, capped at 80% of eligible cost.",
"Do not calculate for a general customer unless HDOT selection/contract status and approved costs are known."
]
},
"probabilityEvidence": {
"status": "not_applicable",
"probabilityDiscount": null,
"probabilityEvidenceType": "none",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": 1770000000,
"expectedAwardCount": 11,
"competitionScope": "unknown",
"probabilityNotes": "Hawaii NEVI appears to be HDOT-administered infrastructure deployment rather than a currently verified open direct customer grant. Probability discounting is not applicable to a non-applicant deployment path."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No applicant success-rate prior should be used where no open direct customer application path was verified.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "suppressed",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"no_open_direct_customer_grant_verified",
"state_formula_deployment_contract",
"needs_contract_selection_and_approved_cost"
]
},
"sourceUrlsChecked": [
"[https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/](https://hidot.hawaii.gov/highways/hawaii-nevi-state-plan/)",
"[https://hidot.hawaii.gov/highways/kahului-ev-charging-station-opens-feb-28/](https://hidot.hawaii.gov/highways/kahului-ev-charging-station-opens-feb-28/)",
"[https://hidot.hawaii.gov/blog/2026/05/15/electric-vehicle-fast-chargers-dedicated-at-kapalua-airport/](https://hidot.hawaii.gov/blog/2026/05/15/electric-vehicle-fast-chargers-dedicated-at-kapalua-airport/)",
"[https://hidot.hawaii.gov/highways/files/2025/09/20250911-HDOT-letter-Submitting-2025-NEVI-Plan-for-FY26-funding-approved-by-FHWA.pdf](https://hidot.hawaii.gov/highways/files/2025/09/20250911-HDOT-letter-Submitting-2025-NEVI-Plan-for-FY26-funding-approved-by-FHWA.pdf)",
"[https://afdc.energy.gov/laws/12744](https://afdc.energy.gov/laws/12744)"
],
"evidenceText": "HDOT NEVI materials describe a state deployment plan and installed/contracted fast-charging stations rather than a standard open direct rebate; official releases state HDOT plans 11 stations, and NEVI cost share can fund up to 80% of eligible costs. ([Hawaii Department of Transportation][4])",
"reasoningNotes": "Treat the 80% amount as a selected/contracted-site cost-share ceiling. Do not include as user-facing savings for an unselected customer or generic project."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22633",
"effectId": "effect_grant_expected_value_1_83c9b6e21b196f8c",
"programName": "Arkansas - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"availabilityStatus": "closed",
"cashValueClassification": "reimbursement",
"sourceConfidence": "high",
"grantValueModelKind": "competitive_cost_share",
"conditionalAward": {
"status": "needs_project_cost",
"formulaText": "For an ARDOT-selected NEVI project, conditional reimbursement is the lesser of the requested/approved reimbursement amount, 80% of approved eligible project cost, and any procurement or site-specific cap. The proposer must provide at least 20% non-federal match.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": 80,
"requiredProjectInputs": [
"eligible_project_cost",
"requested_grant_amount",
"non_federal_match_amount",
"nevi_site_compliance",
"award_selection_status",
"ardot_procurement_round"
],
"calculationTrace": [
"Confirm ARDOT procurement round and selection status.",
"Calculate 80% of approved eligible costs.",
"Cap at the requested and ARDOT-approved reimbursement amount."
]
},
"probabilityEvidence": {
"status": "evidence_not_found",
"probabilityDiscount": null,
"probabilityEvidenceType": "none",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": 5410000000,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "ARDOT describes the NEVI opportunity as competitive reimbursement with 80% federal and 20% non-federal cost share, but no application denominator or current success-rate evidence was verified."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "A generic competitive NEVI prior would require human review because official Arkansas sources did not provide applications-versus-awards evidence.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "suppressed",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"competitive_procurement",
"current_rfp_closed",
"cost_share_cap_only",
"missing_probability_anchor"
]
},
"sourceUrlsChecked": [
"[https://ardot.gov/divisions/local-programs/local-funding-opportunities/national-electric-vehicle-infrastructure-nevi-program/](https://ardot.gov/divisions/local-programs/local-funding-opportunities/national-electric-vehicle-infrastructure-nevi-program/)",
"[https://www.adeq.state.ar.us/energy/opportunities/nevi/](https://www.adeq.state.ar.us/energy/opportunities/nevi/)",
"[https://media.ark.org/ardot/ARDOT_EVID_Program_Requirements.pdf](https://media.ark.org/ardot/ARDOT_EVID_Program_Requirements.pdf)",
"[https://media.ark.org/ardot/Submittal-Packet-FY26-EVID-Plan.pdf](https://media.ark.org/ardot/Submittal-Packet-FY26-EVID-Plan.pdf)",
"[https://afdc.energy.gov/laws/12744](https://afdc.energy.gov/laws/12744)",
"[https://programs.dsireusa.org/system/program/detail/22633/arkansas-national-electric-vehicle-infrastructure-nevi-formula-grant-program](https://programs.dsireusa.org/system/program/detail/22633/arkansas-national-electric-vehicle-infrastructure-nevi-formula-grant-program)"
],
"evidenceText": "ARDOT's NEVI page describes the program as competitive reimbursement, notes the current RFP is closed, and states the 80% federal / 20% non-federal cost-share structure. ([Arkansas Department of Transportation][5])",
"reasoningNotes": "The conditional award model is valid only for selected ARDOT projects with approved eligible costs; no expected value should be counted for unselected applicants."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22635",
"effectId": "effect_grant_expected_value_1_8aaf3b374a0e6004",
"programName": "Georgia - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"availabilityStatus": "active",
"cashValueClassification": "reimbursement",
"sourceConfidence": "high",
"grantValueModelKind": "competitive_cost_share",
"conditionalAward": {
"status": "needs_project_cost",
"formulaText": "For a GDOT-selected NEVI site, reimbursement is capped at 80% of eligible capital, operations, and maintenance costs approved by GDOT, subject to project payment caps, procurement terms, and at least 20% private/non-federal match.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": 80,
"requiredProjectInputs": [
"eligible_project_cost",
"gdot_procurement_round_or_award",
"nevi_corridor_site",
"approved_cost_share",
"station_power_and_port_count",
"site_eligibility",
"approved_award_amount"
],
"calculationTrace": [
"Confirm the GDOT NEVI procurement round and whether the site/developer was selected.",
"Calculate 80% of GDOT-approved eligible capital/O&M costs.",
"Apply the approved project payment cap and reimbursement schedule."
]
},
"probabilityEvidence": {
"status": "evidence_not_found",
"probabilityDiscount": null,
"probabilityEvidenceType": "historical_awards_only",
"historicalAwardsCount": 5,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": 13500000000,
"expectedAwardCount": 33,
"competitionScope": "statewide_broad",
"probabilityNotes": "GDOT materials identify prior/targeted site counts and competitive best-value procurement criteria, but no proposal/application denominator was verified. Historical award/site counts alone are insufficient for an expected-value discount."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "Use of a NEVI procurement prior would require human approval because the official Georgia materials checked did not provide applications-versus-awards data.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "suppressed",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"competitive_procurement",
"historical_awards_without_application_denominator",
"cost_share_cap_only",
"needs_project_cost"
]
},
"sourceUrlsChecked": [
"[https://nevi-gdot.hub.arcgis.com/](https://nevi-gdot.hub.arcgis.com/)",
"[https://nevi-gdot.hub.arcgis.com/pages/round2](https://nevi-gdot.hub.arcgis.com/pages/round2)",
"[https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/NEVI%20Fact%20Sheet.pdf](https://www.dot.ga.gov/systems/ProjectDocuments/GANEVI/NEVI%20Fact%20Sheet.pdf)",
"[https://www.dot.ga.gov/PartnerSmart/Innovative/Documents/GA%20NEVI%20Round%202_Industry%20Forum%20Presentation.pdf](https://www.dot.ga.gov/PartnerSmart/Innovative/Documents/GA%20NEVI%20Round%202_Industry%20Forum%20Presentation.pdf)",
"[https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs](https://www.transportation.gov/rural/ev/toolkit/ev-infrastructure-funding-and-financing/federal-funding-programs)"
],
"evidenceText": "GDOT Round 2 materials describe a statewide NEVI procurement, $135 million apportionment, an 80% maximum federal share with 20% minimum private share, reimbursement capped at 80% of eligible costs, best-value criteria, and selected/targeted site counts. ([Georgia Department of Transportation][6])",
"reasoningNotes": "The 80% reimbursement language supports a conditional selected-project award formula only. It does not establish a probability discount."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22640",
"effectId": "effect_grant_expected_value_1_08058b4cd05b18d9",
"programName": "New Hampshire - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"availabilityStatus": "active",
"cashValueClassification": "reimbursement",
"sourceConfidence": "medium",
"grantValueModelKind": "competitive_cost_share",
"conditionalAward": {
"status": "needs_project_cost",
"formulaText": "For a selected New Hampshire NEVI Round II project, conditional reimbursement is capped at 80% of approved eligible DC fast-charging infrastructure cost, with at least 20% non-federal match and compliance with RFP, site, equipment, and operating requirements.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": 80,
"requiredProjectInputs": [
"eligible_project_cost",
"nhdot_round_ii_selection",
"non_federal_match",
"nevi_equipment_compliance",
"site_compliance",
"round_ii_selection"
],
"calculationTrace": [
"Confirm active Round II RFP eligibility and selection status.",
"Calculate 80% of approved eligible cost.",
"Cap at the NHDOT-approved award or reimbursement amount."
]
},
"probabilityEvidence": {
"status": "evidence_not_found",
"probabilityDiscount": null,
"probabilityEvidenceType": "none",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": 1700000000,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "Official procurement/news sources identify an active Round II RFP and program funding, but no verified application count, award count, or success-rate evidence was found."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No source-backed prior should be used without human review because only RFP availability and cost-share structure were verified.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "suppressed",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"competitive_rfp",
"cost_share_cap_only",
"missing_probability_anchor",
"needs_project_cost"
]
},
"sourceUrlsChecked": [
"[https://www.dot.nh.gov/projects-plans-and-programs/ev-charging-infrastructure](https://www.dot.nh.gov/projects-plans-and-programs/ev-charging-infrastructure)",
"[https://www.dot.nh.gov/news-and-media/nhdot-releases-nevi-round-ii-rfp](https://www.dot.nh.gov/news-and-media/nhdot-releases-nevi-round-ii-rfp)",
"[https://www.dot.nh.gov/doing-business-nhdot/procurement-information](https://www.dot.nh.gov/doing-business-nhdot/procurement-information)",
"[https://apps.das.nh.gov/NHProcurement/File/rfp-dot-2027-01.pdf](https://apps.das.nh.gov/NHProcurement/File/rfp-dot-2027-01.pdf)",
"[https://apps.das.nh.gov/NHProcurement/Bid/rfp-dot-202701](https://apps.das.nh.gov/NHProcurement/Bid/rfp-dot-202701)",
"[https://afdc.energy.gov/laws/12744](https://afdc.energy.gov/laws/12744)",
"[https://www.fhwa.dot.gov/environment/nevi/](https://www.fhwa.dot.gov/environment/nevi/)"
],
"evidenceText": "New Hampshire official procurement/news results identify a Round II NEVI RFP with proposals due August 21, 2026 and more than $17 million in NEVI funding; federal NEVI cost share is up to 80% of eligible costs. ([NH DOT][7])",
"reasoningNotes": "Because no application denominator or expected-award count was verified, the program should not be included as expected value by default."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22647",
"effectId": "effect_grant_expected_value_1_cddd6282f92b5b42",
"programName": "Michigan - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"availabilityStatus": "active",
"cashValueClassification": "reimbursement",
"sourceConfidence": "high",
"grantValueModelKind": "competitive_cost_share",
"conditionalAward": {
"status": "needs_project_cost",
"formulaText": "For a selected Michigan NEVI project, reimbursement is capped at 80% of MDOT-approved eligible charging-site costs, subject to RFP terms, project payment caps, public-site requirements, four 150 kW port requirements, and a minimum 20% company/non-federal match.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": 80,
"requiredProjectInputs": [
"eligible_project_cost",
"mdot_round_3_award_selection",
"non_federal_match",
"corridor_site_compliance",
"nevi_equipment_compliance",
"award_selection",
"approved_award_amount"
],
"calculationTrace": [
"Confirm MDOT Round 3 or other applicable NEVI procurement selection.",
"Calculate 80% of approved eligible project cost.",
"Apply the approved award/payment cap and required match."
]
},
"probabilityEvidence": {
"status": "evidence_found",
"probabilityDiscount": 0.39,
"probabilityEvidenceType": "historical_success_rate",
"historicalAwardsCount": 83,
"historicalApplicationsCount": 214,
"totalProgramBudgetCents": 5100000000,
"expectedAwardCount": 60,
"competitionScope": "statewide_broad",
"probabilityNotes": "Michigan FY26/Round 3 materials provide a historical numerator and denominator from prior rounds: 83 selected out of 214 proposals, yielding about 38.8%, rounded to a conservative 0.39. Round 3 still needs project-specific eligibility, scoring, and approved cost."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "Fallback prior not needed because Michigan-specific historical applications and selections were verified; do not use without project cost and proposal fit.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_project_scope",
"expectedValueCents": null,
"estimateConfidence": "medium",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"historical_success_rate_available",
"competitive_procurement",
"needs_project_cost",
"needs_application_fit_review"
]
},
"sourceUrlsChecked": [
"[https://www.michigan.gov/mdot/travel/mobility/initiatives/nevi](https://www.michigan.gov/mdot/travel/mobility/initiatives/nevi)",
"[https://www.michigan.gov/mdot/business/contractors/innovativecontracting/national-electric-vehicle-infrastructure-3](https://www.michigan.gov/mdot/business/contractors/innovativecontracting/national-electric-vehicle-infrastructure-3)",
"[https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/06/09/mdot-expanding-ev-charging-network-accepting-proposals-for-round-3-nevi-procurement](https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/06/09/mdot-expanding-ev-charging-network-accepting-proposals-for-round-3-nevi-procurement)",
"[https://content.govdelivery.com/accounts/MIDOT/bulletins/41afcf3](https://content.govdelivery.com/accounts/MIDOT/bulletins/41afcf3)",
"[https://www.fhwa.dot.gov/environment/nevi/](https://www.fhwa.dot.gov/environment/nevi/)"
],
"evidenceText": "MDOT states Round 3 is open, $106 million was allocated, about $51 million remains, and Round 3 anticipates about 60 stations; Round 3 materials require statewide public NEVI charging sites with four 150 kW ports and identify the RFP due/award schedule. Michigan planning materials provide the historical 83 selected / 214 proposals evidence used for the probability discount. ([Michigan.gov][8])",
"reasoningNotes": "This is one of the few competitive NEVI targets with a usable source-backed probability anchor. Still exclude from default user-facing totals until an eligible project cost and application fit are known."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22650",
"effectId": "effect_grant_expected_value_1_87952524be536771",
"programName": "Wisconsin - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"availabilityStatus": "active",
"cashValueClassification": "reimbursement",
"sourceConfidence": "high",
"grantValueModelKind": "competitive_cost_share",
"conditionalAward": {
"status": "needs_project_cost",
"formulaText": "For a selected Wisconsin Electric Vehicle Infrastructure project, award/reimbursement may fund up to 80% of eligible NEVI-compliant charging project costs, with at least 20% non-federal match and compliance with corridor, equipment, operations, and solicitation requirements.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": 80,
"requiredProjectInputs": [
"eligible_project_cost",
"corridor_eligibility",
"charger_configuration",
"application_score_or_selection_result",
"non_federal_match_amount",
"selection_result",
"approved_award_amount"
],
"calculationTrace": [
"Confirm the current WEVI round and project selection.",
"Calculate 80% of approved eligible project cost.",
"Apply approved award/reimbursement terms and required match."
]
},
"probabilityEvidence": {
"status": "evidence_found",
"probabilityDiscount": 0.2,
"probabilityEvidenceType": "historical_success_rate",
"historicalAwardsCount": 53,
"historicalApplicationsCount": 264,
"totalProgramBudgetCents": 4000000000,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "Official Wisconsin materials provide a prior-round denominator and award count: 53 awards from 264 applications, or about 20.1%, rounded to 0.20. Current-round probability may differ because corridors, funding, and scoring have changed."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "Fallback prior not needed because Wisconsin-specific historical application and award evidence was found; do not use without project cost and round fit.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_project_scope",
"expectedValueCents": null,
"estimateConfidence": "medium",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"historical_success_rate_available",
"competitive_grant",
"needs_project_cost",
"needs_current_round_fit_review"
]
},
"sourceUrlsChecked": [
"[https://wisconsindot.gov/Pages/projects/multimodal/electrification.aspx](https://wisconsindot.gov/Pages/projects/multimodal/electrification.aspx)",
"[https://wisconsindot.gov/Pages/about-wisdot/newsroom/news-rel/052626-WEVI-connecting-corridors.aspx](https://wisconsindot.gov/Pages/about-wisdot/newsroom/news-rel/052626-WEVI-connecting-corridors.aspx)",
"[https://wisconsindot.gov/Documents/projects/multimodal/electrification/WEVI-Round1-Awarded-FAQ.pdf](https://wisconsindot.gov/Documents/projects/multimodal/electrification/WEVI-Round1-Awarded-FAQ.pdf)",
"[https://wisconsindot.gov/Documents/projects/multimodal/electrification/Wisconsin-EV-Infrastructure-Plan.pdf](https://wisconsindot.gov/Documents/projects/multimodal/electrification/Wisconsin-EV-Infrastructure-Plan.pdf)",
"[https://programs.dsireusa.org/system/program/detail/22650/wisconsin-national-electric-vehicle-infrastructure-nevi-formula-grant-program](https://programs.dsireusa.org/system/program/detail/22650/wisconsin-national-electric-vehicle-infrastructure-nevi-formula-grant-program)"
],
"evidenceText": "WisDOT states current WEVI applications are open through July 24, 2026, about $40 million remains unobligated, funding may cover up to 80% with at least 20% match, and $37 million has been awarded to 78 projects to date. Official WEVI prior-round materials report 53 awards from 264 applications. ([Wisconsin DOT][9])",
"reasoningNotes": "A probability discount is supportable for internal expected-value modeling, but the expected value remains null here because eligible project cost and current-round fit are missing."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22656",
"effectId": "effect_grant_expected_value_1_0f0a763b480029a9",
"programName": "Montana - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"availabilityStatus": "unknown",
"cashValueClassification": "reimbursement",
"sourceConfidence": "high",
"grantValueModelKind": "competitive_cost_share",
"conditionalAward": {
"status": "needs_project_cost",
"formulaText": "For a selected Montana NEVI procurement project, federal cost share may cover up to 80% of approved eligible public DC fast-charging project cost, with at least 20% non-federal match and compliance with final MDT solicitation, corridor/site, and equipment requirements.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": 80,
"requiredProjectInputs": [
"eligible_project_cost",
"mdt_procurement_selection",
"non_federal_match",
"alternative_fuel_corridor_site",
"nevi_equipment_compliance",
"procurement_selection",
"final_solicitation_terms"
],
"calculationTrace": [
"Confirm a final MDT solicitation/procurement and selection status.",
"Calculate 80% of approved eligible cost.",
"Apply any final RFP caps, payment milestones, and required non-federal match."
]
},
"probabilityEvidence": {
"status": "evidence_not_found",
"probabilityDiscount": null,
"probabilityEvidenceType": "none",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": 4300000000,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "Montana official planning materials describe expected NEVI funding and a competitive procurement approach, but the checked materials did not provide a verified application count, award count, or current open solicitation probability anchor."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "Use of a competitive NEVI prior would require human review because Montana-specific success-rate evidence was not found.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "suppressed",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"competitive_procurement",
"current_solicitation_not_verified",
"cost_share_cap_only",
"missing_probability_anchor"
]
},
"sourceUrlsChecked": [
"[https://www.mdt.mt.gov/publications/plans/ev/](https://www.mdt.mt.gov/publications/plans/ev/)",
"[https://www.mdt.mt.gov/business/contracting/qacurrent.aspx](https://www.mdt.mt.gov/business/contracting/qacurrent.aspx)",
"[https://deq.mt.gov/energy/Programs/fuels](https://deq.mt.gov/energy/Programs/fuels)",
"[https://www.fhwa.dot.gov/environment/nevi/](https://www.fhwa.dot.gov/environment/nevi/)"
],
"evidenceText": "MDT EV planning materials state Montana expects about $43 million over five years; FY26 planning materials describe competitive two-phase design-build solicitations and an 80/20 cost assumption, while noting prior solicitation responses had not been evaluated. ([Montana Department of Transportation][10])",
"reasoningNotes": "The conditional cost-share ceiling is identifiable, but availability and probability evidence are insufficient for a user-facing expected value."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22660",
"effectId": "effect_grant_expected_value_1_a6d30fcaf50fc997",
"programName": "South Dakota - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"availabilityStatus": "unknown",
"cashValueClassification": "reimbursement",
"sourceConfidence": "medium",
"grantValueModelKind": "competitive_cost_share",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "For a selected South Dakota NEVI corridor DC fast-charging project, federal support may cover up to 80% of approved eligible project construction or eligible project cost, with an approximately 20% private/non-federal match and solicitation-specific requirements.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": 80,
"requiredProjectInputs": [
"eligible_project_cost",
"site_corridor_eligibility",
"charger_configuration",
"solicitation_terms",
"approved_cost_share",
"selection_status"
],
"calculationTrace": [
"Confirm a current SDDOT solicitation and corridor/site eligibility.",
"Calculate 80% of eligible project cost or construction cost as defined in solicitation terms.",
"Apply approved award amount, match, and site-specific requirements."
]
},
"probabilityEvidence": {
"status": "evidence_not_found",
"probabilityDiscount": null,
"probabilityEvidenceType": "none",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": 2900000000,
"expectedAwardCount": 13,
"competitionScope": "statewide_broad",
"probabilityNotes": "South Dakota planning sources describe anticipated competitive grants, 80/20 funding, and potential site counts, but no verified current application count, award count, or success rate was found."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No South Dakota-specific probability anchor was verified; any generic NEVI prior should require human approval.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "suppressed",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"competitive_grant_context",
"current_solicitation_not_verified",
"cost_share_cap_only",
"missing_probability_anchor"
]
},
"sourceUrlsChecked": [
"[https://dot.sd.gov/projects-studies/planning/south-dakota-ev-fast-charging-plan/](https://dot.sd.gov/projects-studies/planning/south-dakota-ev-fast-charging-plan/)",
"[https://dot.sd.gov/media/956f1a8d/SDDOTEVPlan_final.pdf](https://dot.sd.gov/media/956f1a8d/SDDOTEVPlan_final.pdf)",
"[https://dot.sd.gov/media/37806a2b/Final%20SD%20FY25%20State%20NEVI%20Plan.pdf](https://dot.sd.gov/media/37806a2b/Final%20SD%20FY25%20State%20NEVI%20Plan.pdf)",
"[https://afdc.energy.gov/laws/12744](https://afdc.energy.gov/laws/12744)",
"[https://programs.dsireusa.org/system/program/detail/22660/south-dakota-national-electric-vehicle-infrastructure-nevi-formula-grant-program](https://programs.dsireusa.org/system/program/detail/22660/south-dakota-national-electric-vehicle-infrastructure-nevi-formula-grant-program)"
],
"evidenceText": "SDDOT planning materials describe approximately $29 million in NEVI funding through FY2026, an 80% federal / 20% private funding concept, and a competitive grant application process for corridor fast-charging locations. ([South Dakota DOT][11])",
"reasoningNotes": "Planning-level site counts and 80/20 cost-share assumptions do not establish expected value for a particular applicant."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22666",
"effectId": "effect_grant_expected_value_1_eff91e0ede6cdd5f",
"programName": "Alaska - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"availabilityStatus": "active",
"cashValueClassification": "reimbursement",
"sourceConfidence": "medium",
"grantValueModelKind": "competitive_cost_share",
"conditionalAward": {
"status": "needs_project_cost",
"formulaText": "For an Alaska NEVI-selected project, federal NEVI funds may reimburse or fund up to 80% of approved eligible public EV charging project costs, with at least 20% private/non-federal match and compliance with AEA solicitation, installation, ownership, operation, and maintenance terms.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": 80,
"requiredProjectInputs": [
"current_solicitation_round",
"selected_site_or_application_status",
"eligible_project_cost",
"non_federal_match",
"nevi_compliance_requirements",
"approved_award_amount"
],
"calculationTrace": [
"Confirm the Alaska NEVI solicitation phase and selection status.",
"Calculate 80% of approved eligible project cost.",
"Cap at AEA-approved award and apply private/non-federal match."
]
},
"probabilityEvidence": {
"status": "evidence_found",
"probabilityDiscount": 0.26,
"probabilityEvidenceType": "historical_success_rate",
"historicalAwardsCount": 9,
"historicalApplicationsCount": 34,
"totalProgramBudgetCents": 5241529400,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "Alaska materials report 34 first-round grant applications and projects selected in nine communities. Using communities as the conservative selected-project numerator yields about 26.5%, rounded to 0.26; exact project-level award count may differ."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "Fallback prior not needed because Alaska-specific application and selection evidence was found, though the numerator is community-based and should be reviewed before production use.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_project_scope",
"expectedValueCents": null,
"estimateConfidence": "medium",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"historical_success_rate_available",
"competitive_solicitation",
"needs_project_cost",
"community_based_numerator_requires_review"
]
},
"sourceUrlsChecked": [
"[https://www.akenergyauthority.org/What-We-Do/Renewable-Energy-and-Energy-Efficiency/Electric-Vehicles](https://www.akenergyauthority.org/What-We-Do/Renewable-Energy-and-Energy-Efficiency/Electric-Vehicles)",
"[https://www.akenergyauthority.org/Portals/0/What%20We%20Do/Renewable%20Energy%20and%20Energy%20Efficiency/Electric%20Vehicles/20251013%20FINAL%20FY26%20Alaska%20NEVI%20Plan%20508%20Compliant.pdf?ver=1GzaY7TO8_JfAonOxwygFA%3D%3D](https://www.akenergyauthority.org/Portals/0/What%20We%20Do/Renewable%20Energy%20and%20Energy%20Efficiency/Electric%20Vehicles/20251013%20FINAL%20FY26%20Alaska%20NEVI%20Plan%20508%20Compliant.pdf?ver=1GzaY7TO8_JfAonOxwygFA%3D%3D)",
"[https://www.akenergyauthority.org/Portals/0/What%20We%20Do/Renewable%20Energy%20and%20Energy%20Efficiency/Electric%20Vehicles/AKEVWG/2024%20NEVI%20Workshop%20Series.pdf?ver=96Hmt3ZL6uTpOyPsVhWlFg%3D%3D](https://www.akenergyauthority.org/Portals/0/What%20We%20Do/Renewable%20Energy%20and%20Energy%20Efficiency/Electric%20Vehicles/AKEVWG/2024%20NEVI%20Workshop%20Series.pdf?ver=96Hmt3ZL6uTpOyPsVhWlFg%3D%3D)",
"[https://afdc.energy.gov/laws/12744](https://afdc.energy.gov/laws/12744)"
],
"evidenceText": "Alaska NEVI materials identify a total allocation of about $52.4 million, a required 20% match / 80% federal structure, 34 first-round grant applications, and first-round selections in nine communities. ([AK Energy Authority][12])",
"reasoningNotes": "A conservative probability anchor exists, but the conditional award still needs a specific selected site, approved eligible cost, and award amount."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22761",
"effectId": "effect_grant_expected_value_1_fe826aecbd61ca63",
"programName": "City and County of Denver - Green Workforce Mini Grant",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "high",
"grantValueModelKind": "competitive_max_only",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "For an approved eligible Denver Green Workforce Mini Grant proposal, grant amount is the approved proposal budget capped at $49,000. The grant funds green workforce training and pathway activities, not physical retrofit installation.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": 4900000,
"costSharePercent": null,
"requiredProjectInputs": [
"eligible_organization_type",
"denver_employer_connection",
"denver_metro_candidate_population",
"green_workforce_training_proposal",
"project_budget",
"timeline_within_program_requirements",
"w_9",
"certificate_of_good_standing",
"proposal_budget",
"award_decision"
],
"calculationTrace": [
"Confirm the applicant is an eligible nonprofit, training provider, community college, technical college, or similar entity.",
"Confirm the proposal is green workforce training/pathways work serving Denver Metro candidates and employer needs.",
"Use approved budget capped at $49,000 only after award approval."
]
},
"probabilityEvidence": {
"status": "evidence_not_found",
"probabilityDiscount": null,
"probabilityEvidenceType": "none",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "narrow_local",
"probabilityNotes": "Official Denver/Submittable sources provide eligibility, deadline, and max award amount, but no application count, award count, budget, or success-rate evidence for discounting."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "Max-only local competitive mini-grant; any prior should require human approval and should not be used for retrofit savings totals.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "suppressed",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"competitive_max_only",
"missing_probability_anchor",
"not_installation_rebate",
"needs_award_approval"
]
},
"sourceUrlsChecked": [
"[https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Green-Jobs/Green-Workforce-Funding](https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Green-Jobs/Green-Workforce-Funding)",
"[https://denver-casr.submittable.com/submit](https://denver-casr.submittable.com/submit)"
],
"evidenceText": "Denver's official page and Submittable listing show the second 2026 round open from June 3 to July 10, 2026, eligible organization types, required documents, and awards of up to $49,000 for green workforce training/pathways. ([denvergov.org][13])",
"reasoningNotes": "The $49,000 figure is a maximum conditional award cap only; no expected value should be reported without probability evidence or award approval."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22770",
"effectId": "effect_grant_expected_value_1_753c755368588c1b",
"programName": "Leading By Example Restoration Grant for Solar PV & Decarbonized Systems",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "medium",
"grantValueModelKind": "capped_percent_of_eligible_cost",
"conditionalAward": {
"status": "needs_project_cost",
"formulaText": "For an eligible Massachusetts state entity with an approved restoration project, grant request may cover up to 100% of eligible project costs, capped at $500,000 per project and $1,500,000 per entity, subject to rolling review, program budget, and award approval.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": 50000000,
"costSharePercent": 100,
"requiredProjectInputs": [
"eligible_project_cost",
"state_entity_applicant",
"existing_system_restoration_scope",
"site_count",
"entity_remaining_cap",
"award_approval",
"program_budget_availability"
],
"calculationTrace": [
"Confirm the applicant is an eligible Massachusetts state entity.",
"Confirm the project restores eligible existing solar PV or decarbonized systems.",
"Calculate eligible cost support up to 100%, capped at $500,000 per project and by remaining $1,500,000 per-entity cap.",
"Do not count value until rolling review and award approval/funding availability are confirmed."
]
},
"probabilityEvidence": {
"status": "evidence_not_found",
"probabilityDiscount": null,
"probabilityEvidenceType": "eligibility_only",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "sector_specific",
"probabilityNotes": "Official sources checked provide eligibility, rolling-review status, and caps, but no historical applications, award count, remaining budget, or success-rate evidence."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "Rolling state-entity grant with no source-backed probability anchor; any assumed prior requires human review.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "suppressed",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"rolling_grant_approval_required",
"missing_probability_anchor",
"needs_project_cost",
"state_entity_only"
]
},
"sourceUrlsChecked": [
"[https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems](https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems)",
"[https://www.mass.gov/leading-by-example-grants](https://www.mass.gov/leading-by-example-grants)",
"[https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-109288&external=true&parentUrl=bid](https://www.commbuys.com/bso/external/bidDetail.sdo?docId=BD-25-1041-ENE01-ENE01-109288&external=true&parentUrl=bid)"
],
"evidenceText": "Massachusetts official search results state that grant requests may cover up to 100% of eligible project costs, with $500,000 per-project and $1,500,000 per-entity caps, and rolling review; the COMMBUYS solicitation is open for the Leading by Example Solar-Decarbonization Grant Program for State Entities. ([Massachusetts Government][14])",
"reasoningNotes": "The formula is a conditional selected/approved-project cap, not a probability-discounted expected value. The primary Mass.gov detail page was not fully accessible in the browser, so source confidence is medium despite corroborating official snippets and COMMBUYS."
}
],
"continueFromOpportunityId": null
}

[1]: https://portlandgeneral.com/energy-choices/electric-vehicles-charging/charging-your-ev/charging-your-ev-at-home "Smart Charging Program | PGE"
[2]: https://www.chargevermont.com/workplace-chargers/ "Electric Vehicle Chargers for Vermont Workplaces - Vermont EV Charging"
[3]: https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula "https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula"
[4]: https://hidot.hawaii.gov/highways/files/2025/09/20250911-HDOT-letter-Submitting-2025-NEVI-Plan-for-FY26-funding-approved-by-FHWA.pdf "https://hidot.hawaii.gov/highways/files/2025/09/20250911-HDOT-letter-Submitting-2025-NEVI-Plan-for-FY26-funding-approved-by-FHWA.pdf"
[5]: https://ardot.gov/divisions/local-programs/local-funding-opportunities/national-electric-vehicle-infrastructure-nevi-program/ "https://ardot.gov/divisions/local-programs/local-funding-opportunities/national-electric-vehicle-infrastructure-nevi-program/"
[6]: https://www.dot.ga.gov/PartnerSmart/Innovative/Documents/GA%20NEVI%20Round%202_Industry%20Forum%20Presentation.pdf "https://www.dot.ga.gov/PartnerSmart/Innovative/Documents/GA%20NEVI%20Round%202_Industry%20Forum%20Presentation.pdf"
[7]: https://www.dot.nh.gov/news-and-media/nhdot-releases-nevi-round-ii-rfp "https://www.dot.nh.gov/news-and-media/nhdot-releases-nevi-round-ii-rfp"
[8]: https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/06/09/mdot-expanding-ev-charging-network-accepting-proposals-for-round-3-nevi-procurement "https://www.michigan.gov/mdot/news-outreach/pressreleases/2026/06/09/mdot-expanding-ev-charging-network-accepting-proposals-for-round-3-nevi-procurement"
[9]: https://wisconsindot.gov/Pages/about-wisdot/newsroom/news-rel/052626-WEVI-connecting-corridors.aspx "https://wisconsindot.gov/Pages/about-wisdot/newsroom/news-rel/052626-WEVI-connecting-corridors.aspx"
[10]: https://www.mdt.mt.gov/publications/plans/ev/ "https://www.mdt.mt.gov/publications/plans/ev/"
[11]: https://dot.sd.gov/projects-studies/planning/south-dakota-ev-fast-charging-plan/ "https://dot.sd.gov/projects-studies/planning/south-dakota-ev-fast-charging-plan/"
[12]: https://www.akenergyauthority.org/Portals/0/What%20We%20Do/Renewable%20Energy%20and%20Energy%20Efficiency/Electric%20Vehicles/20251013%20FINAL%20FY26%20Alaska%20NEVI%20Plan%20508%20Compliant.pdf?ver=1GzaY7TO8_JfAonOxwygFA%3D%3D "https://www.akenergyauthority.org/Portals/0/What%20We%20Do/Renewable%20Energy%20and%20Energy%20Efficiency/Electric%20Vehicles/20251013%20FINAL%20FY26%20Alaska%20NEVI%20Plan%20508%20Compliant.pdf?ver=1GzaY7TO8_JfAonOxwygFA%3D%3D"
[13]: https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Green-Jobs/Green-Workforce-Funding "https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Green-Jobs/Green-Workforce-Funding"
[14]: https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems "https://www.mass.gov/info-details/leading-by-example-restoration-grant-for-solar-pv-decarbonized-systems"
