{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22149",
"programName": "Clean Transportation Program",
"status": "no_calculable_value",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "high",
"officialSources": [
{
"title": "Clean Transportation Program",
"url": "[https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program](https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC describes the Clean Transportation Program as a program that provides funding to support innovation and accelerate development and deployment of zero-emission transportation and fuel technologies. The same page lists program resources and examples such as CALeVIP as a block grant and Energy Commission/Transportation solicitations, supporting treatment as an umbrella funding program rather than a reusable formula. ([California Energy Commission][1])"
},
{
"title": "Clean Transportation Program Overview",
"url": "[https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-program-overview](https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-program-overview)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC states that the program makes annual investments of up to $100 million, was extended through July 1, 2035, and is administered by the Energy Commission's Fuels and Transportation Division while investing in a broad portfolio of projects throughout California. The phrase 'up to' and broad portfolio language are not a runtime award formula. ([California Energy Commission][2])"
},
{
"title": "Clean Transportation Funding Areas",
"url": "[https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-funding-areas](https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-funding-areas)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC identifies funding areas such as electric vehicles and charging infrastructure, hydrogen vehicles and refueling infrastructure, medium- and heavy-duty vehicles and infrastructure, and workforce training and development. This source identifies categories, not a per-project award formula. ([California Energy Commission][3])"
},
{
"title": "Electric Vehicles & Charging Infrastructure",
"url": "[https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-funding-areas-0](https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-funding-areas-0)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC states that it has block grants for rapid deployment of light-duty PEV infrastructure, including CALeVIP and Communities in Charge, and that it designs competitive funding solicitations targeting specific market segments. This confirms that value rules must be repaired at the block-grant or solicitation level. ([California Energy Commission][4])"
},
{
"title": "Solicitations",
"url": "[https://www.energy.ca.gov/funding-opportunities/solicitations](https://www.energy.ca.gov/funding-opportunities/solicitations)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC's solicitations page lists individual funding opportunities ordered by release date and filterable by solicitation status, type, and division. Current examples under Fuels and Transportation include active grant funding opportunities with individual deadlines and statuses, which means runtime estimation must attach to a specific solicitation or implemented incentive project. ([California Energy Commission][5])"
},
{
"title": "2026–2027 Investment Plan Update for the Clean Transportation Program",
"url": "[https://www.energy.ca.gov/publications/2026/2026-2027-investment-plan-update-clean-transportation-program](https://www.energy.ca.gov/publications/2026/2026-2027-investment-plan-update-clean-transportation-program)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC describes the 2026–2027 Investment Plan Update as guiding allocation of program funding for Fiscal Year 2026–2027, with estimated annual program funding and priorities determined through analysis and stakeholder input. Allocation guidance is not an applicant-level grant formula or award probability model. ([California Energy Commission][6])"
}
],
"sourceSummary": "The uploaded repair context already treats this as an umbrella program with no standing per-vehicle, per-port, or per-project formula.  Official CEC sources confirm that the Clean Transportation Program is active and funds broad clean transportation categories, but funding reaches applicants through specific block grants, implemented incentive programs, or competitive solicitations. No official source supports a reusable conditional award amount, cap, rate table, or probability model for the umbrella opportunity itself. ([California Energy Commission][1])",
"packagePatch": {
"calculation_status": "no_calculable_value",
"availability": {
"status": "active",
"fundingStatus": "unknown"
},
"input_requirements_to_add_or_update": [
{
"input_key": "specific_cec_solicitation_or_block_grant",
"label": "specific CEC solicitation, block grant, or administered incentive program",
"value_type": "text",
"required_for": [
"child_opportunity_selection_only"
],
"source_precedence": [
"admin_research",
"user_profile",
"retrofit_assumptions",
"quote"
],
"missing_severity": "does_not_block_umbrella_suppression",
"runtime_use": "Do not use this input to calculate the umbrella Clean Transportation Program. Use it only to route to or create a separately repaired child opportunity."
},
{
"input_key": "requested_grant_amount_cents",
"label": "requested grant amount cents",
"value_type": "money_cents",
"required_for": [
"child_opportunity_repair_only"
],
"source_precedence": [
"application_status",
"quote",
"user_profile",
"admin_research"
],
"missing_severity": "not_required_for_suppressed_umbrella",
"runtime_use": "A requested amount alone is not a defensible award estimate without a specific solicitation formula, award approval, or approved incentive reservation."
},
{
"input_key": "award_probability",
"label": "award probability",
"value_type": "number",
"required_for": [
"child_opportunity_repair_only"
],
"source_precedence": [
"admin_research",
"application_status"
],
"missing_severity": "not_required_for_suppressed_umbrella",
"runtime_use": "Do not infer probability from eligibility or program existence. Use only official historical applications/awards, official budget-and-expected-awards evidence, first-come funding confirmation, or human-reviewed probability for a child opportunity."
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_f0c739479f440778",
"effect_type": "no_cash_value",
"cash_value_classification": "unknown",
"value_model_kind": "no_calculable_value",
"calculation": {
"method": "zero_when_not_applicable",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "No conditional award can be calculated at the Clean Transportation Program umbrella level. The program funds broad clean transportation categories through specific CEC solicitations, block grants, and implemented incentive programs; each child opportunity must have its own official formula, funding-status check, and probability/funding-contingency model before any user-facing value is calculated.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "none"
},
"required_inputs": [],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": false,
"reasonCodes": [
"umbrella_program",
"no_standing_formula",
"specific_solicitation_required",
"block_grant_or_child_program_required",
"project_specific_award_approval_required",
"no_probability_model_at_umbrella_level",
"not_a_cash_estimate"
],
"calculationTrace": [
"CEC's main program page describes the Clean Transportation Program as providing funding to support broad zero-emission transportation and fuel technology deployment, and links out to program resources and solicitations rather than providing one applicant-level award rule. ([California Energy Commission][1])",
"CEC's overview page says the program makes annual investments of up to $100 million and invests in a broad portfolio of transportation projects; this is budget/allocation language, not an award formula. ([California Energy Commission][2])",
"CEC's funding-area page identifies high-level areas such as EV charging, hydrogen refueling, medium- and heavy-duty vehicles and infrastructure, and workforce development, without rates, caps, eligible-cost percentages, or unit awards. ([California Energy Commission][3])",
"CEC's EV and charging infrastructure page says funding is delivered through block grants and competitive funding solicitations targeting specific market segments, so the correct calculable unit is the specific block grant or solicitation, not the umbrella program. ([California Energy Commission][4])",
"CEC's solicitations page lists individual opportunities with separate status, type, division, release date, deadline, and submission method; a generic Clean Transportation Program award value would overstate certainty and should be suppressed. ([California Energy Commission][5])"
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "specific_cec_solicitation_or_block_grant",
"valueType": "text",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Example format: GFO-25-607, GFO-25-605, CALeVIP, Communities in Charge, EnergIIZE, or another specific CEC-administered child opportunity. This should route to a separate child repair; it should not make the umbrella program estimable."
},
{
"inputKey": "child_opportunity_current_status",
"valueType": "enum",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use the official CEC or administrator status for the selected child opportunity, such as active, closed, awarded, no award, waitlist, exhausted, open while funds last, or unknown."
},
{
"inputKey": "project_type",
"valueType": "text",
"whoProvides": "user",
"realisticDefaultGuidance": "Only relevant for selecting a child opportunity, such as light-duty EV charging, medium/heavy-duty depot charging, hydrogen refueling, school bus infrastructure, workforce training, or manufacturing."
},
{
"inputKey": "eligible_cost_basis_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use only after a specific child solicitation or incentive manual defines eligible and ineligible costs and any cost-share cap."
},
{
"inputKey": "equipment_or_unit_count",
"valueType": "array",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use only for a child opportunity with an official per-unit, per-port, per-kW, or rate-table formula."
},
{
"inputKey": "award_probability",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Leave null unless an official child solicitation or administrator record provides historical applications and awards, budget with expected awards, first-come funding confirmation, or a human-reviewed probability."
},
{
"inputKey": "application_or_reservation_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "For a child opportunity, distinguish not_applied, submitted, waitlisted, selected_for_award, award_agreement_executed, reservation_approved, rejected, closed, and paid."
}
],
"remainingGaps": [
"No umbrella-level official award formula, rate table, cost-share percentage, per-unit amount, minimum award, maximum award, or conditional award value was found.",
"No umbrella-level official probability evidence was found. Probability must be evaluated separately for a specific competitive solicitation, first-come incentive lane, block-grant project, or awarded/reserved application.",
"Current funding availability for a user's project cannot be inferred from the existence of the Clean Transportation Program because individual solicitations and block grants have separate statuses, deadlines, funding lanes, and award processes.",
"Any child opportunity should be repaired from its own official solicitation manual, application guide, program guidelines, notice of funding opportunity, notice of proposed award, or administrator funding-status page."
],
"doNotUseAsUserFacingEstimateReasons": [
"The Clean Transportation Program is an umbrella funding program, not a stand-alone applicant award formula.",
"Official sources use program-budget and allocation language such as annual investments and funding areas, not a reusable conditional award calculation.",
"CEC funding is implemented through specific solicitations, block grants, and incentive administrators, each requiring separate eligibility, formula, timing, and funding-status review.",
"Competitive or project-specific awards require selection, reservation, or approval, and no official umbrella-level award probability supports an expected-value calculation.",
"Including any value for this umbrella opportunity by default would overstate grant certainty."
]
}

[1]: https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program "Clean Transportation Program | California Energy Commission"
[2]: https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-program-overview "Clean Transportation Program Overview"
[3]: https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-funding-areas "Clean Transportation Funding Areas"
[4]: https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program/clean-transportation-funding-areas-0 "Electric Vehicles & Charging Infrastructure"
[5]: https://www.energy.ca.gov/funding-opportunities/solicitations "Solicitations"
[6]: https://www.energy.ca.gov/publications/2026/2026-2027-investment-plan-update-clean-transportation-program "2026–2027 Investment Plan Update for the Clean Transportation Program | California Energy Commission"

