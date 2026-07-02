{
"schemaVersion": "retrofi_grant_probability_repair.v1",
"researchedAt": "2026-07-02",
"promptId": "grant_probability_001_014",
"batchRange": "001-014",
"repairs": [
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308",
"effectId": "effect_grant_expected_value_1_fad24d1a1bf06105",
"programName": "GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE)",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "high",
"grantValueModelKind": "competitive_award_range",
"conditionalAward": {
"status": "calculable",
"formulaText": "Competitive CEC grant. Solicitation funding is $4,000,000 total; funding request must be between $2,000,000 and $4,000,000 per project, with at least 50% match. Conditional award equals approved CEC funding request if selected, subject to the solicitation minimum, maximum, total available funding, eligible costs, and match requirements.",
"conditionalAwardCents": null,
"minAwardCents": 200000000,
"maxAwardCents": 400000000,
"costSharePercent": null,
"requiredProjectInputs": [
"cec_funding_request",
"total_eligible_project_budget",
"eligible_match_amount",
"hydrogen_production_capacity_in_metric_tons_per_day",
"hydrogen_storage_scope",
"onsite_hydrogen_end_use_scope",
"award_decision"
],
"calculationTrace": [
"Official solicitation page identifies GFO-25-308 as active with an August 19, 2026 final application deadline.",
"Official pre-application materials state $4,000,000 total available funding.",
"Funding table states minimum award $2,000,000 and maximum award $4,000,000.",
"Match slide states applicants must provide at least 50% match.",
"Conditional award cannot be converted to expected value without selection probability evidence."
]
},
"probabilityEvidence": {
"status": "evidence_not_found",
"probabilityDiscount": null,
"probabilityEvidenceType": "scoring_criteria_only",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": 400000000,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "Official materials provide total budget, award range, scoring, and a minimum passing score, but no historical application count, expected award count, or success rate. A score threshold is not enough to estimate probability."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": 0.1,
"basis": "Low-confidence human-review prior for a statewide competitive CEC demonstration solicitation with a small total budget and likely small award count.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "human_review_required",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"competitive_grant",
"conditional_award_range_found",
"probability_evidence_not_found",
"do_not_use_max_as_expected_value"
]
},
"sourceUrlsChecked": [
"[https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite](https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite)",
"[https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-308_Pre-Application_Workshop_Presentation_ada.pdf](https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-308_Pre-Application_Workshop_Presentation_ada.pdf)",
"[https://ecams.energy.ca.gov/s/login/](https://ecams.energy.ca.gov/s/login/)"
],
"evidenceText": "CEC solicitation page and workshop materials describe GFO-25-308 as H2ONSITE, an active competitive solicitation for distributed clean hydrogen production with onsite end use. The official workshop funding table states $4,000,000 available, minimum award $2,000,000, maximum award $4,000,000, and a 50% match requirement.",
"reasoningNotes": "Repaired from no_calculable_value to competitive_award_range. Conditional award range is source-backed, but expected value is suppressed because no source-backed probability anchor was found. Input prompt citation: "
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-603",
"effectId": "effect_grant_expected_value_1_42355de1814a8757",
"programName": "GFO-25-603 - California's National Electric Vehicle Infrastructure Formula Program - Solicitation 6 Community Charging",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "high",
"grantValueModelKind": "competitive_cost_share",
"conditionalAward": {
"status": "needs_project_cost",
"formulaText": "Conditional award is the approved grant request for eligible publicly accessible DC fast charging projects, capped at 80% of allowable project cost, requiring exactly 20% match, and further capped at the lesser of 35% of total solicitation funding or $27,650,000 per applicant. Applications are ranked by cost per CCS port and funded until funds are exhausted.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": 2765000000,
"costSharePercent": 80,
"requiredProjectInputs": [
"allowable_project_cost",
"requested_grant_amount",
"match_funding_amount",
"number_of_ccs_ports",
"cost_per_ccs_port",
"award_selection_status"
],
"calculationTrace": [
"Official solicitation page states up to $79,000,000 is available.",
"Pre-application materials state 80% grant share and 20% match.",
"Applicant cap is 35% of $79,000,000, which equals $27,650,000.",
"Conditional award is min(requested grant, 80% of allowable project cost, $27,650,000), if selected and approved."
]
},
"probabilityEvidence": {
"status": "evidence_not_found",
"probabilityDiscount": null,
"probabilityEvidenceType": "scoring_criteria_only",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": 7900000000,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "Official materials identify available budget and the ranking mechanism, but not expected number of awards, historical applications, or a success rate. Cost-per-port ranking is not a probability estimate."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": 0.15,
"basis": "Low-confidence human-review prior for a large statewide competitive EV charging solicitation with substantial budget but unknown applicant volume.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "human_review_required",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"competitive_grant",
"project_cost_required",
"probability_evidence_not_found",
"ranking_rule_not_probability"
]
},
"sourceUrlsChecked": [
"[https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula](https://www.energy.ca.gov/solicitations/2026-02/gfo-25-603-californias-national-electric-vehicle-infrastructure-formula)",
"[https://www.energy.ca.gov/sites/default/files/2026-03/GFO-25-603_NEVI_6_Pre-Application_Workshop_Slides_ADA.pdf](https://www.energy.ca.gov/sites/default/files/2026-03/GFO-25-603_NEVI_6_Pre-Application_Workshop_Slides_ADA.pdf)",
"[https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs](https://www.energy.ca.gov/programs-and-topics/programs/federal-ev-infrastructure-programs)",
"[https://ecams.energy.ca.gov/s/login/](https://ecams.energy.ca.gov/s/login/)"
],
"evidenceText": "Official CEC materials state that GFO-25-603 has up to $79,000,000 available, an October 16, 2026 deadline, an 80% allowable-cost grant share, a 20% match requirement, and a $27,650,000 maximum grant per applicant.",
"reasoningNotes": "Conditional amount is calculable once allowable cost and requested amount are known. No award probability was found, so user-facing expected value remains suppressed."
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-605",
"effectId": "effect_grant_expected_value_1_9badcea914d6d42f",
"programName": "GFO-25-605 - Reliable Electric Charging for Eligible School-bus Sites (RECESS)",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "medium",
"grantValueModelKind": "hybrid_rate_plus_cap",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "Lane-specific school-bus charging grant. Total solicitation funding is $22,000,000: Lane 1 first-come, first-served; Lanes 2 and 3 competitive. Indexed solicitation text indicates awards may be calculated from charger scope using $20,000 per eligible L2 charging port and $75,000 per eligible dual-port DCFC or bidirectional DCFC, subject to lane and applicant caps. Lane 2 cap is $2,250,000; Lane 3 cap is $2,250,000 for one LEA or $4,500,000 for more than one LEA. Lane 1 cap depends on eligible HVIP bus count.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": 450000000,
"costSharePercent": null,
"requiredProjectInputs": [
"funding_lane",
"eligible_project_cost",
"number_of_l2_ports",
"number_of_dual_port_dcfc_or_bidirectional_dcfc",
"electric_school_bus_deployment_details",
"lea_or_transportation_provider_pathway",
"lane_specific_cap",
"first_come_status_or_award_decision"
],
"calculationTrace": [
"Official solicitation page states $22,000,000 total funding and an August 31, 2026 deadline.",
"Official page states Lane 1 is first-come and Lanes 2 and 3 are competitive.",
"Indexed solicitation text identifies rate-based charger awards and lane caps.",
"The largest indexed lane cap is $4,500,000 for Lane 3 applications serving more than one LEA.",
"Applicant-specific award requires lane, charger count/type, eligible costs, and award status."
]
},
"probabilityEvidence": {
"status": "first_come_funding_unknown",
"probabilityDiscount": null,
"probabilityEvidenceType": "first_come_funding_unknown",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": 2200000000,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "Lane 1 is first-come, but remaining queue/funding status was not found. Lanes 2 and 3 are competitive with scoring and budget, but no historical or expected success-rate evidence was found."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No single fallback prior is suggested because probability differs materially by lane: first-come queue risk for Lane 1 and competitive selection risk for Lanes 2 and 3.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_funding_check",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"lane_specific_rules",
"first_come_funding_status_unknown",
"competitive_lanes_probability_evidence_not_found",
"project_scope_required"
]
},
"sourceUrlsChecked": [
"[https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess](https://www.energy.ca.gov/solicitations/2026-04/gfo-25-605-reliable-electric-charging-eligible-school-bus-sites-recess)",
"[https://www.energy.ca.gov/sites/default/files/2026-04/00_GFO-25-605_Solicitation_Manual_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-04/00_GFO-25-605_Solicitation_Manual_ada.docx)",
"[https://ecams.energy.ca.gov/s/login/](https://ecams.energy.ca.gov/s/login/)"
],
"evidenceText": "CEC's official solicitation page identifies RECESS as active, states up to $22,000,000 is available, and separates Lane 1 first-come funding from competitive Lanes 2 and 3. Indexed solicitation text provides charger-rate and lane-cap details, but the DOCX manual was not fully machine-extractable through the official page during this repair.",
"reasoningNotes": "Conditional award can be modeled only after funding lane and charger scope are known. Expected value should not be estimated until first-come funding status or competitive probability evidence is available."
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-607",
"effectId": "effect_grant_expected_value_1_a7ff5e3c336c4dd5",
"programName": "GFO-25-607 - Clean Transportation Program Hydrogen Infrastructure Project Opportunity (HIPO)",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "high",
"grantValueModelKind": "competitive_cost_share",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "Competitive hydrogen refueling infrastructure grant. Funding request must be between $2,000,000 and $15,000,000 per project, with at least 25% match, meaning CEC share is up to 75% of eligible project cost. Conditional award equals approved funding request if selected, subject to station-type subcaps, eligible costs, match, and the $45,000,000 solicitation budget.",
"conditionalAwardCents": null,
"minAwardCents": 200000000,
"maxAwardCents": 1500000000,
"costSharePercent": 75,
"requiredProjectInputs": [
"requested_grant_amount_cents",
"eligible_project_cost_cents",
"match_amount_cents",
"hydrogen_station_scope",
"station_type",
"application_score_or_award_decision"
],
"calculationTrace": [
"Official CEC solicitation page shows GFO-25-607 active with July 20, 2026 deadline.",
"Official workshop materials state $45,000,000 total funding.",
"Funding table states minimum award $2,000,000 and maximum award $15,000,000.",
"Match slide states a minimum 25% match, implying CEC funding up to 75% of eligible cost.",
"Conditional award is project-specific and requires approval."
]
},
"probabilityEvidence": {
"status": "evidence_not_found",
"probabilityDiscount": null,
"probabilityEvidenceType": "scoring_criteria_only",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": 4500000000,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "Official materials include budget, min/max award, match, and ranked scoring, but no historical application count, expected award count, or success rate."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": 0.15,
"basis": "Low-confidence human-review prior for a statewide competitive hydrogen infrastructure solicitation with a $45,000,000 budget and large per-project awards.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "human_review_required",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"competitive_grant",
"conditional_award_range_found",
"project_scope_required",
"probability_evidence_not_found"
]
},
"sourceUrlsChecked": [
"[https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project](https://www.energy.ca.gov/solicitations/2026-04/gfo-25-607-clean-transportation-program-hydrogen-infrastructure-project)",
"[https://www.energy.ca.gov/sites/default/files/2026-04/GFO-25-607_Pre-Application_Workshop_Presentation_ada.pdf](https://www.energy.ca.gov/sites/default/files/2026-04/GFO-25-607_Pre-Application_Workshop_Presentation_ada.pdf)",
"[https://www.energy.ca.gov/event/funding-workshop/2026-04/pre-application-workshop-gfo-25-607-clean-transportation-program](https://www.energy.ca.gov/event/funding-workshop/2026-04/pre-application-workshop-gfo-25-607-clean-transportation-program)"
],
"evidenceText": "CEC's official page and pre-application workshop materials state a July 20, 2026 deadline, $45,000,000 total funding, funding requests from $2,000,000 to $15,000,000 per project, and a 25% minimum match requirement.",
"reasoningNotes": "The prior metadata note that the June 19, 2026 deadline had passed is stale; the official solicitation page showed a July 20, 2026 deadline during this repair. Expected value remains suppressed because no probability evidence was found."
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-608",
"effectId": "effect_grant_expected_value_1_aa2ca5c972c94202",
"programName": "GFO-25-608 - Electric Vehicle Hub, Outreach, Messaging, and Equipment (EV HOME)",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "high",
"grantValueModelKind": "competitive_award_range",
"conditionalAward": {
"status": "calculable",
"formulaText": "Competitive EV HOME grant. Phase 1 funding request must be from $500,000 to $5,000,000. Phase 1 total available funding is $10,000,000; an optional Phase 2 may also request $500,000 to $5,000,000 but is contingent on future funding and Phase 1 completion. Conditional award equals approved CEC funding request if selected.",
"conditionalAwardCents": null,
"minAwardCents": 50000000,
"maxAwardCents": 500000000,
"costSharePercent": null,
"requiredProjectInputs": [
"project_scope",
"eligible_project_budget",
"cec_funding_request",
"phase_1_or_phase_2_scope",
"applicant_type",
"application_score_or_award_decision"
],
"calculationTrace": [
"Official CEC page states GFO-25-608 is active with an August 18, 2026 final application deadline.",
"Official workshop materials state Phase 1 available funding is $10,000,000.",
"Funding table states Phase 1 minimum award $500,000 and maximum award $5,000,000.",
"Phase 2 funding is optional and contingent, so Phase 1 range is the reusable conditional award range."
]
},
"probabilityEvidence": {
"status": "evidence_not_found",
"probabilityDiscount": null,
"probabilityEvidenceType": "scoring_criteria_only",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": 1000000000,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "Official materials provide Phase 1 budget, award range, and passing score, but no historical success rate, application count, or expected award count."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": 0.12,
"basis": "Low-confidence human-review prior for a statewide competitive CEC program-administration/outreach grant with broad eligible applicant pool and limited award count implied by the $10,000,000 budget and $500,000-$5,000,000 award range.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "human_review_required",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"competitive_grant",
"conditional_award_range_found",
"probability_evidence_not_found",
"phase_2_contingent"
]
},
"sourceUrlsChecked": [
"[https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-hub-outreach-messaging-and-equipment-ev-home](https://www.energy.ca.gov/solicitations/2026-05/gfo-25-608-electric-vehicle-hub-outreach-messaging-and-equipment-ev-home)",
"[https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-608_Pre-Application_Workshop_ada.pdf](https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-608_Pre-Application_Workshop_ada.pdf)",
"[https://ecams.energy.ca.gov/s/login/](https://ecams.energy.ca.gov/s/login/)"
],
"evidenceText": "CEC's official solicitation page and workshop materials identify GFO-25-608 as active, with an August 18, 2026 deadline, $10,000,000 available for Phase 1, and Phase 1 award requests from $500,000 to $5,000,000.",
"reasoningNotes": "This is not a deterministic EV charger rebate. The conditional award range is usable, but no source-backed probability evidence was found."
},
{
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902",
"effectId": "effect_grant_expected_value_1_f1659ce17e5da4b9",
"programName": "GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "medium",
"grantValueModelKind": "competitive_cost_share",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "CEC cost-share funding is available only to applicants that apply for and receive awards under eligible federal geothermal funding opportunities and meet CEC requirements. Official page confirms purpose but does not expose a reusable formula in the web text. Indexed manual excerpts indicate $3,000,000 total CEC cost-share funding, topic-specific caps including up to $2,000,000 for Topic 3A and $200,000-$1,000,000 for Topic 3C, and match rules that vary by applicant type.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": 200000000,
"costSharePercent": null,
"requiredProjectInputs": [
"eligible_federal_geothermal_funding_opportunity",
"federal_award_amount",
"federal_cost_share_requirement",
"total_eligible_project_budget",
"cec_cost_share_request",
"applicant_type",
"topic_area",
"cec_award_decision"
],
"calculationTrace": [
"Official CEC page confirms GFO-25-902 as a geothermal cost-share solicitation tied to eligible federal awards.",
"Official page provides the solicitation manual as a DOCX but did not expose detailed formula text in the page body.",
"Indexed manual excerpts indicate a $3,000,000 total budget and topic-specific caps.",
"Because topic, applicant type, and federal award terms control the award, a project-specific calculation is required."
]
},
"probabilityEvidence": {
"status": "evidence_not_found",
"probabilityDiscount": null,
"probabilityEvidenceType": "eligibility_only",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": 300000000,
"expectedAwardCount": null,
"competitionScope": "sector_specific",
"probabilityNotes": "Eligibility requires a related federal geothermal award and CEC approval. No historical CEC application count, award count, expected award count, or success rate was found."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": 0.08,
"basis": "Low-confidence human-review prior for a niche competitive/state cost-share program that is conditional on first winning an eligible federal geothermal award.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "human_review_required",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"federal_award_dependency",
"project_scope_required",
"probability_evidence_not_found",
"official_manual_not_fully_extractable"
]
},
"sourceUrlsChecked": [
"[https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities](https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities)",
"[https://www.energy.ca.gov/sites/default/files/2026-06/00_GFO-25-902_Solicitation_Manual_Addendum_01_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-06/00_GFO-25-902_Solicitation_Manual_Addendum_01_ada.docx)",
"[https://ecams.energy.ca.gov/s/login/](https://ecams.energy.ca.gov/s/login/)"
],
"evidenceText": "CEC's official solicitation page says GFO-25-902 provides cost-share funding to applicants that apply for and receive awards under eligible federal geothermal funding opportunities. Detailed calculation rules are in the official DOCX manual; indexed excerpts indicate a $3,000,000 total budget and topic-specific caps.",
"reasoningNotes": "Treat as competitive cost-share, not a geothermal heat-pump rebate. Expected value should remain suppressed without human review and project-specific federal award information."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1528",
"effectId": "effect_one_time_savings_1_5eb511fe0f127e08",
"programName": "Otter Tail Power Company - Commercial & Industrial Energy Efficiency Grant Program",
"availabilityStatus": "active",
"cashValueClassification": "rebate",
"sourceConfidence": "high",
"grantValueModelKind": "hybrid_rate_plus_cap",
"conditionalAward": {
"status": "needs_quote",
"formulaText": "Otter Tail Power may provide custom business grants after a preapproved custom energy-savings proposal. The grant amount is calculated from estimated kWh savings, kW demand reduction, and project costs, and will not exceed 75% of total project cost or 90% of incremental cost.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": null,
"requiredProjectInputs": [
"custom_energy_savings_proposal",
"estimated_annual_kwh_saved",
"estimated_kw_demand_reduction",
"project_cost",
"incremental_cost",
"preapproval",
"approved_grant_amount"
],
"calculationTrace": [
"Official Otter Tail page states custom grants require preapproval based on a custom energy-savings proposal.",
"Official page states grant amounts are calculated based on kWh saved, kW demand reduced, and project costs.",
"Official page caps grant at 75% of project cost and 90% of incremental cost.",
"No public fixed rate per kWh or kW was found; approved amount requires utility review."
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
"probabilityNotes": "This is a utility custom incentive subject to preapproval and project-specific engineering review, not a competitive grant probability model."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No probability prior needed; obtain a utility-approved custom grant amount instead.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_quote",
"expectedValueCents": null,
"estimateConfidence": "medium",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"custom_quote_required",
"deterministic_after_preapproval",
"no_public_rate_table",
"utility_review_required"
]
},
"sourceUrlsChecked": [
"[https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/](https://www.otpco.com/rebates-and-efficiency-programs/programs/custom-grants/)",
"[https://www.otpco.com/rebates-and-efficiency-programs/business/programs/](https://www.otpco.com/rebates-and-efficiency-programs/business/programs/)",
"[https://www.otpco.com/media/pv4pgqyt/2025-program-and-services-guide_final.pdf](https://www.otpco.com/media/pv4pgqyt/2025-program-and-services-guide_final.pdf)"
],
"evidenceText": "Official Otter Tail materials state that custom grant amounts are based on kWh saved, kW demand reduced, and project costs, and that grants will not exceed 75% of project costs or 90% of incremental costs.",
"reasoningNotes": "The existing custom_quote status is directionally correct. This should not be treated as a competitive expected-value grant; it is deterministic only after utility preapproval."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:1774",
"effectId": "effect_one_time_savings_1_6485f6750d0228c1",
"programName": "City of Tallahassee Utilities - Grant Programs",
"availabilityStatus": "active",
"cashValueClassification": "cash_grant",
"sourceConfidence": "high",
"grantValueModelKind": "capped_percent_of_eligible_cost",
"conditionalAward": {
"status": "needs_project_cost",
"formulaText": "Ceiling insulation grant after required City home energy audit and approved-contractor installation. Standard grant pays 80% of installed cost up to $400. Low-income grant pays 100% of installed cost up to $500. Total installed cost must be at least $500 and the work must meet City material and audit requirements.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": 50000,
"costSharePercent": null,
"requiredProjectInputs": [
"installed_insulation_cost",
"standard_or_low_income_grant_tier",
"audit_result",
"approved_contractor",
"material_type",
"target_r_value"
],
"calculationTrace": [
"For standard tier: award = min(0.80 * installed_insulation_cost, $400).",
"For low-income tier: award = min(1.00 * installed_insulation_cost, $500).",
"Grant requires a City home energy audit before installation.",
"Grant requires City-approved contractor and eligible ceiling or attic insulation materials."
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
"competitionScope": "narrow_local",
"probabilityNotes": "Published grant formula is deterministic for eligible customers after required audit, approved contractor, and eligible installation. No competitive probability discount is required."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No fallback prior needed because the grant is formula-based for eligible projects.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_quote",
"expectedValueCents": null,
"estimateConfidence": "high",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"deterministic_formula",
"installed_cost_required",
"audit_required",
"tier_required"
]
},
"sourceUrlsChecked": [
"[https://www.talgov.com/you/you-products-home-ceiling-insulation](https://www.talgov.com/you/you-products-home-ceiling-insulation)",
"[https://www.talgov.com/you/you-products-home-energy-audit](https://www.talgov.com/you/you-products-home-energy-audit)"
],
"evidenceText": "City of Tallahassee ceiling insulation page states that the standard grant covers 80% up to $400 and the low-income grant covers 100% up to $500, after a City energy audit and approved-contractor installation.",
"reasoningNotes": "This is a deterministic capped-percent grant once installed cost and tier are known. It can be included only after project cost and eligibility inputs are available, not as a blanket expected value."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:21861",
"effectId": "effect_grant_expected_value_1_d2ac4b4734cc8f4f",
"programName": "Agricultural Energy Program",
"availabilityStatus": "active",
"cashValueClassification": "reimbursement",
"sourceConfidence": "high",
"grantValueModelKind": "competitive_cost_share",
"conditionalAward": {
"status": "needs_project_cost",
"formulaText": "Rhode Island OER Agricultural Energy Program grant. Applicant must provide at least 10% cost share; maximum award is $20,000. Conditional award is up to 90% of eligible project cost, capped at $20,000, if the application is selected and approved. Energy audits are required for some projects but are not reimbursable project costs.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": 2000000,
"costSharePercent": 90,
"requiredProjectInputs": [
"eligible_project_cost",
"applicant_cost_share",
"measure_type",
"agricultural_energy_audit_status",
"application_score_or_award_decision"
],
"calculationTrace": [
"Official RI OER page states grants are up to $20,000.",
"Official guidance states at least 10% applicant cost share.",
"Award if approved is no more than min(90% of eligible project cost, $20,000).",
"Guidance states applications are reviewed, ranked, and grants are made from highest to lowest ranking."
]
},
"probabilityEvidence": {
"status": "evidence_not_found",
"probabilityDiscount": null,
"probabilityEvidenceType": "scoring_criteria_only",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "sector_specific",
"probabilityNotes": "Official guidance provides ranking criteria, a rolling application deadline, a $20,000 maximum award, and a statement that grants are not guaranteed, but no application count, award count, total budget, expected awards, or historical success rate was found."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": 0.2,
"basis": "Low-confidence human-review prior for a sector-specific state agricultural energy grant with small award cap and unknown applicant volume.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "human_review_required",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"competitive_grant",
"conditional_cap_found",
"project_cost_required",
"probability_evidence_not_found"
]
},
"sourceUrlsChecked": [
"[https://energy.ri.gov/energy-efficiency/farm-energy-programs](https://energy.ri.gov/energy-efficiency/farm-energy-programs)",
"[https://energy.ri.gov/sites/g/files/xkgbur741/files/2026-06/Farm%20Energy%20Program%20Guidance%20Doc%20V4.pdf](https://energy.ri.gov/sites/g/files/xkgbur741/files/2026-06/Farm%20Energy%20Program%20Guidance%20Doc%20V4.pdf)",
"[https://energy.ri.gov/energy-efficiency/farm-energy-programs/agricultural-energy-audits](https://energy.ri.gov/energy-efficiency/farm-energy-programs/agricultural-energy-audits)"
],
"evidenceText": "Rhode Island OER materials state Agricultural Energy Program grants are up to $20,000, require at least 10% applicant cost share, are reviewed and ranked competitively, and are not guaranteed.",
"reasoningNotes": "The $20,000 cap and 90% cost-share ceiling are conditional award rules, not expected value. Suppress from user-facing totals without a probability model or human-approved prior."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22149",
"effectId": "effect_grant_expected_value_1_f0c739479f440778",
"programName": "Clean Transportation Program",
"availabilityStatus": "active",
"cashValueClassification": "unknown",
"sourceConfidence": "high",
"grantValueModelKind": "no_calculable_value",
"conditionalAward": {
"status": "not_calculable",
"formulaText": "The Clean Transportation Program is an umbrella CEC funding program, not a stand-alone grant formula. Award amounts are determined only by specific solicitations, block grants, or funding opportunities under the program.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": null,
"requiredProjectInputs": [
"specific_cec_solicitation_or_block_grant",
"project_type",
"requested_grant_amount_cents",
"eligible_cost_basis_cents",
"match_requirement",
"application_score_or_award_probability"
],
"calculationTrace": [
"Official CEC program page describes the Clean Transportation Program as a funding and investment umbrella.",
"CEC funding-area page states funding is delivered through block grants and competitive solicitations.",
"No reusable per-vehicle, per-port, or per-project value formula was found on the umbrella page."
]
},
"probabilityEvidence": {
"status": "not_applicable",
"probabilityDiscount": null,
"probabilityEvidenceType": "none",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "unknown",
"probabilityNotes": "Probability evidence is not applicable at the umbrella-program level. Each underlying CEC solicitation needs its own award and probability repair."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No fallback prior should be used for an umbrella program because there is no single competition or award model.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "suppressed",
"expectedValueCents": null,
"estimateConfidence": "high",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"umbrella_program",
"no_standing_formula",
"specific_solicitation_required",
"not_a_cash_estimate"
]
},
"sourceUrlsChecked": [
"[https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program](https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program)",
"[https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-funding-areas-0](https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-funding-areas-0)"
],
"evidenceText": "CEC describes the Clean Transportation Program as a broad investment program whose funding is implemented through funding areas, block grants, and competitive solicitations. The umbrella page does not provide a reusable award formula.",
"reasoningNotes": "Repair should suppress any generic expected-value effect and require selection of a specific CEC solicitation or block grant."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22160",
"effectId": "effect_grant_expected_value_1_f3f277efefdea00d",
"programName": "Electric Vehicle Fast-Charging Plazas Program",
"availabilityStatus": "source_inaccessible",
"cashValueClassification": "cash_grant",
"sourceConfidence": "medium",
"grantValueModelKind": "competitive_cost_share",
"conditionalAward": {
"status": "needs_project_cost",
"formulaText": "Colorado EV Fast-Charging Plazas grants may provide up to 80% of eligible project costs at each proposed public DC fast-charging plaza location, subject to current-round requirements, site eligibility, public-use commitments, approval, and any round-specific per-site caps. The official Colorado page and Salesforce portal were not fully accessible during this repair, so current-round caps and funding status require confirmation.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": 80,
"requiredProjectInputs": [
"eligible_project_cost",
"site_location",
"number_of_dc_fast_charging_ports",
"charger_power_rating",
"public_access_commitment",
"current_round_per_site_cap",
"award_decision"
],
"calculationTrace": [
"DOE AFDC page states eligible applicants may receive up to 80% of project costs at each proposed location.",
"AFDC page states awardees must provide continuous public use for five years.",
"Colorado Energy Office page and application portal were not extractable, so current availability and per-site caps were not verified from state source text.",
"Conditional award is no more than 80% of eligible cost, subject to current-round caps once verified."
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
"competitionScope": "statewide_broad",
"probabilityNotes": "The accessible AFDC page confirms an up-to-80% grant rule but does not provide current funding status, application volume, expected award count, or success rate. State source was inaccessible or not machine-readable."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": 0.15,
"basis": "Low-confidence human-review prior for a statewide competitive public DCFC program, pending verification of current Colorado Energy Office round details.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_funding_check",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"state_source_inaccessible",
"current_round_unverified",
"competitive_grant",
"probability_evidence_not_found"
]
},
"sourceUrlsChecked": [
"[https://energyoffice.colorado.gov/ev-fast-charging-plazas](https://energyoffice.colorado.gov/ev-fast-charging-plazas)",
"[https://socgov27.my.site.com/CEOEVGrants/s/](https://socgov27.my.site.com/CEOEVGrants/s/)",
"[https://afdc.energy.gov/laws/12432](https://afdc.energy.gov/laws/12432)",
"[https://programs.dsireusa.org/system/program/detail/22160/electric-vehicle-fast-charging-plazas-program](https://programs.dsireusa.org/system/program/detail/22160/electric-vehicle-fast-charging-plazas-program)"
],
"evidenceText": "AFDC states that the Colorado Energy Office offers DC fast charger grants through the EV Fast-Charging Plazas Program and that eligible applicants may receive up to 80% of project costs at each proposed location. The Colorado Energy Office page and application portal were not fully accessible for current round verification.",
"reasoningNotes": "Keep the 80% conditional cap but do not produce expected value. Current availability should be rechecked directly in the Colorado portal before surfacing any estimate."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22199",
"effectId": "effect_grant_expected_value_2_a26a941b3c377b51",
"programName": "It Pay$ to Plug in Program",
"availabilityStatus": "closed",
"cashValueClassification": "reimbursement",
"sourceConfidence": "high",
"grantValueModelKind": "hybrid_rate_plus_cap",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "For the separate NJDEP DCFC Solicitation 2025, eligible DC fast chargers rated 150 kW or higher could receive up to $100,000 per port. A project required at least two and no more than six 150 kW-or-greater DCFC ports. Publicly accessible chargers on government-owned property could be reimbursed up to 100% of eligible costs up to the per-port maximum; private property projects could be reimbursed up to 80% of eligible costs up to the per-port maximum. The 2025 DCFC solicitation period was August 25, 2025 through October 25, 2025 and is closed as of the research date.",
"conditionalAwardCents": null,
"minAwardCents": 20000000,
"maxAwardCents": 60000000,
"costSharePercent": null,
"requiredProjectInputs": [
"current_dcfc_solicitation",
"site_location",
"property_ownership_type",
"charger_count",
"port_count",
"eligible_cost",
"award_notice"
],
"calculationTrace": [
"Official NJDEP DCFC page states solicitation period August 25, 2025 to October 25, 2025.",
"Official page states reimbursement for 150 kW+ chargers is $100,000 per port.",
"Official page states minimum two and maximum six 150 kW+ ports.",
"Maximum conditional award from the closed 2025 solicitation is 6 * $100,000 = $600,000, before any lower eligible-cost percentage cap."
]
},
"probabilityEvidence": {
"status": "evidence_not_found",
"probabilityDiscount": null,
"probabilityEvidenceType": "scoring_criteria_only",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "statewide_broad",
"probabilityNotes": "The DCFC solicitation states that applications would be ranked after the competitive period and gives criteria, but no application count, award count, total current DCFC budget, or success rate was found. Because the solicitation period is closed, no expected value should be estimated for new applicants."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No fallback prior suggested because the DCFC solicitation is closed. A future solicitation should be modeled separately if opened.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "zero_value",
"expectedValueCents": null,
"estimateConfidence": "high",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"dcfc_solicitation_closed",
"competitive_grant",
"probability_evidence_not_found",
"future_solicitation_required"
]
},
"sourceUrlsChecked": [
"[https://dep.nj.gov/drivegreen/it-pays-to-plug-in/](https://dep.nj.gov/drivegreen/it-pays-to-plug-in/)",
"[https://dep.nj.gov/grantandloanprograms/it-pays-to-plug-in-njs-electric-vehicle-charging-grant-program/](https://dep.nj.gov/grantandloanprograms/it-pays-to-plug-in-njs-electric-vehicle-charging-grant-program/)",
"[https://dep.nj.gov/drivegreen/dcfcsolicitation/](https://dep.nj.gov/drivegreen/dcfcsolicitation/)",
"[https://njdepsage.intelligrants.com/](https://njdepsage.intelligrants.com/)"
],
"evidenceText": "NJDEP's general It Pay$ page lists Level 1 and Level 2 rolling/waitlist reimbursements separately from DCFC. The official DCFC Solicitation 2025 page states a solicitation period from August 25, 2025 through October 25, 2025, reimbursement of $100,000 per 150 kW+ port, and a two-to-six-port project range.",
"reasoningNotes": "This repair is only for the DCFC grant_expected_value effect. Level 1 and Level 2 reimbursements may be active or waitlisted under separate deterministic rules, but the DCFC competitive solicitation is closed."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22206",
"effectId": "effect_grant_expected_value_1_6f710c93f5265829",
"programName": "VW Funding for Diesel Replacement and EVSE Projects",
"availabilityStatus": "active",
"cashValueClassification": "unknown",
"sourceConfidence": "high",
"grantValueModelKind": "no_calculable_value",
"conditionalAward": {
"status": "needs_project_scope",
"formulaText": "New York DEC's VW Settlement funding page lists multiple sponsor-specific and subprogram-specific opportunities for diesel replacement, non-road equipment, transit charging, and EVSE projects. There is no single statewide reusable formula. Conditional award must be taken from the active sponsor/subprogram rate table or award agreement.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": null,
"requiredProjectInputs": [
"active_subprogram",
"project_sponsor",
"vehicle_or_equipment_class",
"replacement_technology",
"eligible_project_cost",
"scrappage_or_replacement_requirements",
"sponsor_rate_table",
"award_decision"
],
"calculationTrace": [
"Official NY DEC page lists active and completed VW-funded opportunities.",
"Open opportunities include sponsor-specific programs such as NYCDOT Clean Trucks, NYPA transit bus charging, and NYSERDA zero-emission non-road vehicles.",
"Other EVSE and DCFC opportunities are completed, awarded, or under installation.",
"Because rules vary by sponsor and subprogram, no single conditional dollar value can be calculated."
]
},
"probabilityEvidence": {
"status": "not_applicable",
"probabilityDiscount": null,
"probabilityEvidenceType": "none",
"historicalAwardsCount": null,
"historicalApplicationsCount": null,
"totalProgramBudgetCents": null,
"expectedAwardCount": null,
"competitionScope": "unknown",
"probabilityNotes": "Probability cannot be evaluated at the aggregate VW funding-page level. Each active subprogram has separate eligibility, award method, budget, and application process."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No fallback prior should be used for the aggregate VW funding page. Select a specific sponsor/subprogram first.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_project_scope",
"expectedValueCents": null,
"estimateConfidence": "low",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"aggregate_program_page",
"subprogram_required",
"no_single_formula",
"mixed_open_and_completed_opportunities"
]
},
"sourceUrlsChecked": [
"[https://dec.ny.gov/environmental-protection/air-quality/controlling-motor-vehicle-pollution/vw-settlement-information/vw-funding-for-diesel-replacement-and-evse-projects](https://dec.ny.gov/environmental-protection/air-quality/controlling-motor-vehicle-pollution/vw-settlement-information/vw-funding-for-diesel-replacement-and-evse-projects)"
],
"evidenceText": "NY DEC's VW funding page lists open and completed sponsor-specific opportunities, including diesel replacement, non-road equipment, transit charging, and EVSE/DCFC programs, with differing statuses and sponsors.",
"reasoningNotes": "Keep this as a project-scope repair, not a cash estimate. A separate repair is needed for each concrete NY VW subprogram."
},
{
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22373",
"effectId": "effect_one_time_savings_1_7adb20f9b8c9d4e2",
"programName": "Eugene Water & Electric Board - Electric Vehicle Charging Station Smart Charge Program",
"availabilityStatus": "active",
"cashValueClassification": "rebate",
"sourceConfidence": "high",
"grantValueModelKind": "fixed_tier_amount",
"conditionalAward": {
"status": "needs_quote",
"formulaText": "EWEB Smart Charge incentive. Residential Level 2 home EVSE rebate is up to $500 and may not exceed EVSE hardware plus installation cost, limited to one per residential electric account. Multifamily public Level 2 rebate is $1,500 per port, or $2,000 per port for qualified affordable multifamily housing, not to exceed 100% of hardware, software, and installation cost after other grants and rebates.",
"conditionalAwardCents": null,
"minAwardCents": null,
"maxAwardCents": null,
"costSharePercent": null,
"requiredProjectInputs": [
"project_path",
"evse_and_installation_cost",
"port_count",
"site_type",
"affordable_housing_status",
"other_grant_amounts",
"permit_and_inspection_status"
],
"calculationTrace": [
"Residential path: award = min($500, EVSE hardware plus installation cost), one rebate per residential electric account.",
"Multifamily standard path: award = min($1,500 * eligible_public_l2_ports, eligible cost after other grants and rebates).",
"Qualified affordable multifamily path: award = min($2,000 * eligible_public_l2_ports, eligible cost after other grants and rebates).",
"Permit, inspection, account, and program eligibility conditions must be met."
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
"probabilityNotes": "Published EWEB rebate tiers are deterministic for eligible customers and projects. No competitive grant probability discount is required."
},
"fallbackPriorSuggestion": {
"probabilityDiscount": null,
"basis": "No fallback prior needed because the incentive is tiered/formula-based for eligible projects.",
"shouldRetroFiUseWithoutHumanApproval": false
},
"expectedValueRecommendation": {
"estimateStatus": "needs_quote",
"expectedValueCents": null,
"estimateConfidence": "high",
"includeInUserFacingTotalDefault": false,
"reasonCodes": [
"deterministic_rebate",
"project_path_required",
"eligible_cost_required",
"port_count_required"
]
},
"sourceUrlsChecked": [
"[https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives](https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives)",
"[https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives-business](https://www.eweb.org/rebates-and-savings/electric-mobility/ev-incentives-business)",
"[https://myaccount.eweb.org/](https://myaccount.eweb.org/)"
],
"evidenceText": "EWEB states that residential Smart Charge provides up to $500 for a Level 2 home charger, not exceeding hardware and installation cost. EWEB's business/multifamily page states public Level 2 multifamily rebates are $1,500 per port, or $2,000 per port for qualified affordable multifamily housing, capped at 100% of eligible costs after other grants and rebates.",
"reasoningNotes": "This is a deterministic rebate, not a competitive expected-value grant. It should be calculated from project path, port count, eligible cost, and other grants."
}
],
"continueFromOpportunityId": null
}
