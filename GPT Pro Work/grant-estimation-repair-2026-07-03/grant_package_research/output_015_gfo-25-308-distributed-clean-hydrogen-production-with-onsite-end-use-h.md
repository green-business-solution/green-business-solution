{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-308",
"programName": "GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE)",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE)",
"url": "[https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite](https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC lists this as Grant Funding Opportunity GFO-25-308 with status Active, release date June 05, 2026, submission deadline August 19, 2026 at 11:59 pm, ECAMS submission, and purpose to fund distributed-scale hydrogen production up to 5 metric tons per day co-located with storage and end use. Evidence: ([California Energy Commission][1])"
},
{
"title": "00_GFO-25-308_Solicitation_Manual_ada.docx",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-06/00_GFO-25-308_Solicitation_Manual_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-06/00_GFO-25-308_Solicitation_Manual_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "Official manual linked from the CEC solicitation files. Manual funding table states $4,000,000 available CEC funding, $2,000,000 minimum CEC award, $4,000,000 maximum CEC award, and minimum match funding of 50% of CEC funds requested. Manual also states applications are screened/scored, ranked by score, NOPA proposed awards require CEC business meeting approval, and recipients may begin only after full grant agreement execution. File listing evidence: ([California Energy Commission][1])"
},
{
"title": "GFO-25-308 Pre-Application Workshop Presentation",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-308_Pre-Application_Workshop_Presentation_ada.pdf](https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-308_Pre-Application_Workshop_Presentation_ada.pdf)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "Workshop presentation confirms $4,000,000 available funding, $2,000,000 minimum award, $4,000,000 maximum award, 50% match funding required, scoring with a 105-point minimum to be considered for funding, and key dates including August 19, 2026 application deadline, September 30, 2026 anticipated NOPA, December 9, 2026 anticipated business meeting, and January 18, 2027 anticipated agreement start. Evidence:    "
},
{
"title": "Pre-Application Workshop - GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE)",
"url": "[https://www.energy.ca.gov/event/funding-workshop/2026-06/pre-application-workshop-gfo-25-308-distributed-clean-hydrogen](https://www.energy.ca.gov/event/funding-workshop/2026-06/pre-application-workshop-gfo-25-308-distributed-clean-hydrogen)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC event page identifies the June 16, 2026 workshop, links the presentation, and links back to the GFO-25-308 solicitation. Evidence: ([California Energy Commission][2])"
}
],
"sourceSummary": "Official CEC sources show an active competitive grant solicitation, not an automatic incentive. Funding is a competitive reimbursement grant range of $2,000,000 to $4,000,000, with $4,000,000 total available and 50% minimum match of requested CEC funds. Applications are screened, scored, ranked, proposed through a NOPA, require CEC business meeting approval, and require full grant agreement execution before project work may begin. No official historical application count, success rate, expected award count, or other defensible award probability evidence was found. Prompt package context was provided in the uploaded file .",
"packagePatch": {
"calculation_status": "no_calculable_value",
"availability": {
"status": "active",
"fundingStatus": "open_funds_available"
},
"input_requirements_to_add_or_update": [
{
"input_key": "cec_funding_request_cents",
"label": "Requested CEC grant amount",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_fad24d1a1bf06105"
],
"source_precedence": [
"application_status",
"quote",
"retrofit_assumptions",
"user_profile"
],
"missing_severity": "blocks_conditional_award_only",
"notes": "For an application budget, requested CEC funds must be at least 200000000 cents and not exceed 400000000 cents, subject to available funding and CEC approval. Do not use requested amount as an expected value."
},
{
"input_key": "approved_cec_award_cents",
"label": "CEC-approved award amount from NOPA or executed grant agreement",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_fad24d1a1bf06105"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_conditional_award_only",
"notes": "Use only after CEC posts a NOPA and the award is approved/executed; before selection this must remain null."
},
{
"input_key": "application_award_status",
"label": "Application and award status",
"value_type": "enum",
"allowed_values": [
"not_applied",
"application_in_progress",
"submitted",
"not_selected",
"nopa_proposed_award",
"cec_business_meeting_approved",
"fully_executed_grant_agreement",
"cancelled_or_withdrawn"
],
"required_for": [
"effect_grant_expected_value_1_fad24d1a1bf06105"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_conditional_award_only",
"notes": "The program remains suppressed for pre-award savings totals unless status is fully_executed_grant_agreement and approved_cec_award_cents is known."
},
{
"input_key": "fully_executed_grant_agreement",
"label": "Grant agreement fully executed",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_fad24d1a1bf06105"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_conditional_award_only",
"notes": "CEC materials state project work may begin only after full execution of the grant agreement."
},
{
"input_key": "eligible_reimbursable_project_costs_cents",
"label": "Eligible documented reimbursable project costs",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_fad24d1a1bf06105"
],
"source_precedence": [
"quote",
"application_status",
"retrofit_assumptions",
"user_profile"
],
"missing_severity": "blocks_conditional_award_only",
"notes": "Budget must exclude unallowable costs and reflect actual costs during the agreement term; reimbursement cannot exceed eligible documented costs and capped approved rates."
},
{
"input_key": "eligible_match_amount_cents",
"label": "Eligible committed match funding",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_fad24d1a1bf06105"
],
"source_precedence": [
"application_status",
"quote",
"user_profile",
"retrofit_assumptions"
],
"missing_severity": "blocks_conditional_award_only",
"notes": "Minimum match is 50% of total requested CEC funds, supported by commitment letters."
},
{
"input_key": "project_site_in_california",
"label": "Project site located in California",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_fad24d1a1bf06105"
],
"source_precedence": [
"user_profile",
"quote",
"application_status"
],
"missing_severity": "blocks_eligibility",
"notes": "Screening requires one or more site locations in California."
},
{
"input_key": "hydrogen_production_capacity_metric_tons_per_day",
"label": "Annualized average clean hydrogen production capacity in metric tons per day",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_fad24d1a1bf06105"
],
"source_precedence": [
"quote",
"retrofit_assumptions",
"user_profile"
],
"missing_severity": "blocks_eligibility",
"notes": "Solicitation purpose/project requirements cap distributed-scale production at up to 5 metric tons per day."
},
{
"input_key": "colocated_production_storage_end_use",
"label": "Hydrogen production, storage, and end use are co-located on the same property",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_fad24d1a1bf06105"
],
"source_precedence": [
"quote",
"retrofit_assumptions",
"user_profile"
],
"missing_severity": "blocks_eligibility",
"notes": "Projects must demonstrate production, storage, and end use on the same property."
},
{
"input_key": "onsite_hydrogen_end_use_scope",
"label": "Onsite hydrogen end-use scope",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_fad24d1a1bf06105"
],
"source_precedence": [
"quote",
"retrofit_assumptions",
"user_profile"
],
"missing_severity": "blocks_eligibility",
"notes": "Eligible end uses include transportation, hard-to-electrify industrial applications, and power generation; ineligible uses include hydrogen blending, petroleum refining, easily electrified applications, and applications within oil refineries."
},
{
"input_key": "renewable_energy_supply_strategy",
"label": "Renewable energy supply strategy for hydrogen production",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_fad24d1a1bf06105"
],
"source_precedence": [
"quote",
"retrofit_assumptions",
"user_profile"
],
"missing_severity": "blocks_eligibility",
"notes": "Project must use 100% renewable energy resources onsite, PPA/grid power with bundled renewable energy credits, or a combination as allowed by the solicitation."
},
{
"input_key": "water_source_not_for_human_consumption",
"label": "Water source is not otherwise intended for human consumption",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_fad24d1a1bf06105"
],
"source_precedence": [
"quote",
"retrofit_assumptions",
"user_profile"
],
"missing_severity": "blocks_eligibility",
"notes": "Project requirements identify reclaimed, recycled, or repurposed wastewater as examples."
},
{
"input_key": "award_probability",
"label": "Award probability",
"value_type": "number",
"required_for": [],
"source_precedence": [
"admin_research"
],
"missing_severity": "does_not_block_because_estimate_is_suppressed",
"notes": "Remove this from user-facing required inputs. Do not ask users to guess probability. Use only if RetroFi separately approves a human-reviewed probability model."
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_fad24d1a1bf06105",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_award_range",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Do not calculate an expected value unless a defensible probability_discount is supplied by admin/human review or the award has already been fully executed. If fully_executed_grant_agreement is true and approved_cec_award_cents is present, conditional_award_cents = approved_cec_award_cents, capped at 400000000 cents and no lower than 200000000 cents for a compliant award, and further limited to actual documented eligible reimbursable project costs. Before executed award status, conditional_award_cents is null. Minimum committed match must be at least 0.50 * cec_funding_request_cents. Expected value formula would be conditional_award_cents * probability_discount, but probability_discount is null because no official probability evidence was found.",
"max_award_cents": 400000000,
"min_award_cents": 200000000,
"total_program_budget_cents": 400000000,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "scoring_criteria_only"
},
"required_inputs": [
"application_award_status",
"fully_executed_grant_agreement",
"approved_cec_award_cents",
"cec_funding_request_cents",
"eligible_reimbursable_project_costs_cents",
"eligible_match_amount_cents",
"project_site_in_california",
"hydrogen_production_capacity_metric_tons_per_day",
"colocated_production_storage_end_use",
"onsite_hydrogen_end_use_scope",
"renewable_energy_supply_strategy",
"water_source_not_for_human_consumption"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"competitive_grant",
"conditional_award_range_found",
"probability_evidence_not_found",
"scoring_threshold_not_probability",
"award_requires_nopa_and_cec_business_meeting_approval",
"full_grant_execution_required_before_project_start",
"reimbursement_actual_costs_only",
"match_required_50_percent_of_requested_cec_funds",
"do_not_use_max_as_expected_value",
"do_not_request_user_probability_guess",
"exclude_from_user_facing_total_default"
],
"calculationTrace": [
"Official CEC solicitation page lists GFO-25-308 as Active, with release date June 5, 2026 and application deadline August 19, 2026 at 11:59 pm via ECAMS.",
"Official CEC solicitation page and manual describe the purpose as distributed-scale clean hydrogen production up to 5 metric tons per day, co-located with storage and onsite end use.",
"Official manual and workshop funding table state $4,000,000 available CEC funding, $2,000,000 minimum CEC award, $4,000,000 maximum CEC award, and 50% minimum match of requested CEC funds.",
"Official workshop and manual state applications are screened/scored; the minimum passing score of 105 points is only a threshold to be considered for funding, not a probability of award.",
"Manual states eligible passing applications are ranked by score; the NOPA identifies proposed funding amounts, rank order, and each proposed award amount; proposed awards require CEC business meeting approval.",
"Manual and workshop state recipients may begin work only after the grant agreement is fully executed; award level/scope can be negotiated or modified before execution.",
"Manual states CEC reimburses only actual properly documented eligible costs under the agreement and capped approved rates; unallowable costs and insufficient match block eligibility or reimbursement.",
"No official source found with historical applications, historical awards, expected application count, expected award count, or success rate for this solicitation; expected value is therefore suppressed."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "application_award_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use submitted or not_applied before CEC award notices. Do not infer award from eligibility or score."
},
{
"inputKey": "fully_executed_grant_agreement",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default false unless the grant agreement has been approved at a CEC business meeting and signed by both recipient and CEC."
},
{
"inputKey": "approved_cec_award_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Null before NOPA/execution. If known, should be the approved award amount, generally between 200000000 and 400000000 cents."
},
{
"inputKey": "cec_funding_request_cents",
"valueType": "money_cents",
"whoProvides": "user",
"realisticDefaultGuidance": "No default. Solicitation range is 200000000 to 400000000 cents, but request is not an expected value."
},
{
"inputKey": "eligible_reimbursable_project_costs_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use only costs eligible for CEC reimbursement under the approved budget; exclude unallowable costs such as renewable energy acquisition/installation/operation costs, existing onsite eligible electricity resource equipment, most permit costs, and feedstocks such as water."
},
{
"inputKey": "eligible_match_amount_cents",
"valueType": "money_cents",
"whoProvides": "user",
"realisticDefaultGuidance": "Must be at least 0.50 times cec_funding_request_cents and supported by commitment letters."
},
{
"inputKey": "project_site_in_california",
"valueType": "boolean",
"whoProvides": "user",
"realisticDefaultGuidance": "True only if the application identifies one or more California site locations."
},
{
"inputKey": "hydrogen_production_capacity_metric_tons_per_day",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Must be no more than 5 metric tons per day annualized average for this solicitation."
},
{
"inputKey": "colocated_production_storage_end_use",
"valueType": "boolean",
"whoProvides": "quote",
"realisticDefaultGuidance": "True only if production, storage, and end use are on the same property."
},
{
"inputKey": "onsite_hydrogen_end_use_scope",
"valueType": "text",
"whoProvides": "user",
"realisticDefaultGuidance": "Eligible examples include medium/heavy-duty transportation refueling, hard-to-electrify industrial applications, or power generation; oil refinery and easily electrified applications should fail eligibility."
},
{
"inputKey": "award_probability",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Leave null unless RetroFi approves a human-reviewed probability model. Do not collect this from the applicant as a guess."
}
],
"remainingGaps": [
"No official historical application count, historical award count, award success rate, or applicant-count estimate was found for GFO-25-308.",
"Official sources provide scoring criteria and minimum passing scores, but a passing score only allows consideration for funding and does not establish award probability.",
"No NOPA or final award list exists yet as of 2026-07-03; official workshop schedule anticipates NOPA on September 30, 2026 and CEC business meeting on December 9, 2026.",
"CEC may negotiate or modify scope, schedule, award level, and terms before executing any agreement; requested amount cannot be treated as approved amount.",
"Conditional value after award requires approved_cec_award_cents, fully_executed_grant_agreement, eligible reimbursable costs, and match documentation."
],
"doNotUseAsUserFacingEstimateReasons": [
"Competitive grant with ranked evaluation and project-specific approval required.",
"Official materials provide only an award range and total available funding, not a probability of selection.",
"Minimum passing score and scoring criteria are not probability evidence.",
"Maximum award of 400000000 cents must not be used as expected value.",
"Funding request requires at least 50% match and is subject to eligible-cost, reimbursement, NOPA, business meeting, and executed-agreement gates.",
"No award should appear in user-facing savings totals unless a real approved/executed award amount is supplied or RetroFi human review separately approves a probability model."
]
}

[1]: https://www.energy.ca.gov/solicitations/2026-06/gfo-25-308-distributed-clean-hydrogen-production-onsite-end-use-h2onsite?utm_source=chatgpt.com "GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE)"
[2]: https://www.energy.ca.gov/event/funding-workshop/2026-06/pre-application-workshop-gfo-25-308-distributed-clean-hydrogen "Pre-Application Workshop - GFO-25-308 - Distributed Clean Hydrogen Production with Onsite End Use (H2ONSITE)"

