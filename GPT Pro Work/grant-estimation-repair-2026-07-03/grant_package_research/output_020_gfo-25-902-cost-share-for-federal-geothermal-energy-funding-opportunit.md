{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_CA_ENERGY_COMMISSION:cec_solicitation_number:GFO-25-902",
"programName": "GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities",
"url": "[https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities](https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "CEC lists GFO-25-902 as an active Grant Funding Opportunity released June 4, 2026, and states that the purpose is CEC cost-share funding for applicants that apply for and receive an award under an eligible federal FOA and meet solicitation requirements. The page directs applicants to ECAMS and lists the official solicitation manual, addendum, application form, Q&A, and related files. ([California Energy Commission][1])"
},
{
"title": "00_GFO-25-902_Solicitation_Manual_Addendum_01_ada.docx",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-06/00_GFO-25-902_Solicitation_Manual_Addendum_01_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-06/00_GFO-25-902_Solicitation_Manual_Addendum_01_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "Official manual downloaded from the CEC solicitation files. It states up to $3,000,000 in CEC cost-share grant funding is available; CEC may provide up to 100% of the federal project amount as cost share based on CEC funds availability; the CEC award cannot exceed the federal award; at least 70% of combined CEC and federal award funds must be spent in California; Topic 3A has no minimum and a $2,000,000 maximum; Topic 3C has a $200,000 minimum and a $1,000,000 maximum. The CEC solicitation page lists this manual as an official file. ([California Energy Commission][1])"
},
{
"title": "GFO-25-902 Questions and Answers",
"url": "[https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-902_Questions_and_Answers_ada.docx](https://www.energy.ca.gov/sites/default/files/2026-06/GFO-25-902_Questions_and_Answers_ada.docx)",
"owner": "California Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "Official Q&A dated June 25, 2026 states that if the federal proposal is not selected for a federal award, the applicant will not be eligible to receive CEC cost-share funding, even if CEC issued a Phase I Letter of Intent; if the federal proposal is awarded, the applicant must submit federal award confirmation to begin Phase II. The CEC solicitation page lists the Q&A as an official file. ([California Energy Commission][1])"
},
{
"title": "Cost-Share for Federal Geothermal Energy Funding Opportunities - California Grants Portal",
"url": "[https://www.grants.ca.gov/grants/cost-share-for-federal-geothermal-energy-funding-opportunities/](https://www.grants.ca.gov/grants/cost-share-for-federal-geothermal-energy-funding-opportunities/)",
"owner": "California Grants Portal / CA Energy Commission",
"accessed": "2026-07-03",
"evidenceText": "The California Grants Portal lists the opportunity as active, identifies CA Energy Commission as grantor, states total estimated available funding is $3,000,000, and marks both expected number of awards and estimated amount per award as Dependent. ([California Grants Portal][2])"
},
{
"title": "Critical Minerals and Materials Accelerator - Topic Area 3",
"url": "[https://eere-exchange.energy.gov/Default.aspx?Search=3589&SearchType=](https://eere-exchange.energy.gov/Default.aspx?Search=3589&SearchType=)",
"owner": "U.S. Department of Energy / EERE eXCHANGE",
"accessed": "2026-07-03",
"evidenceText": "DOE EERE eXCHANGE lists DE-TA3-0003589 for Critical Minerals & Materials Accelerator Topic Area 3, with full application deadline July 23, 2026, and subtopics including 3A cost-competitive direct lithium extraction and 3C exploration and characterization of critical materials and rare earth elements from volcanically hosted geothermal systems. ([EERE Exchange][3])"
}
],
"sourceSummary": "Official CEC sources support a competitive geothermal federal-cost-share grant, not a generally calculable retrofit incentive. A conditional cap formula exists only after project/topic/federal-award/CEC-approval facts are known, but no official success rate, expected CEC award count, historical application count, or probability evidence was found. The California Grants Portal explicitly marks expected awards and estimated per-award amount as Dependent, so no expected value should be included by default. Current package context reviewed from the uploaded prompt. ",
"packagePatch": {
"calculation_status": "no_calculable_value",
"availability": {
"status": "active",
"fundingStatus": "open_funds_available"
},
"input_requirements_to_add_or_update": [
{
"input_key": "phase_i_application_submitted_by_deadline",
"label": "CEC Phase I application submitted by the applicable CEC deadline",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_f1659ce17e5da4b9"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "eligible_federal_foa_number",
"label": "Eligible federal FOA or NOFO number",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_f1659ce17e5da4b9"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "federal_topic_area",
"label": "Federal topic area for eligible FOA",
"value_type": "enum",
"allowed_values": [
"3A",
"3C"
],
"required_for": [
"effect_grant_expected_value_1_f1659ce17e5da4b9"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "federal_award_received",
"label": "Federal award received under eligible FOA",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_f1659ce17e5da4b9"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "federal_award_amount_cents",
"label": "Federal award amount",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_f1659ce17e5da4b9"
],
"source_precedence": [
"application_status",
"quote",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "cec_cost_share_request_cents",
"label": "CEC cost-share funding request",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_f1659ce17e5da4b9"
],
"source_precedence": [
"application_status",
"quote",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "cec_award_status",
"label": "CEC award status",
"value_type": "enum",
"allowed_values": [
"not_applied",
"phase_i_submitted",
"letter_of_intent_received",
"federal_award_confirmed_to_cec",
"nopa_proposed",
"business_meeting_approved",
"agreement_executed",
"not_selected",
"cancelled"
],
"required_for": [
"effect_grant_expected_value_1_f1659ce17e5da4b9"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "cec_approved_award_amount_cents",
"label": "CEC approved award amount, if approved or agreement executed",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_f1659ce17e5da4b9"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "applicant_type",
"label": "CEC applicant type",
"value_type": "enum",
"allowed_values": [
"local_jurisdiction",
"private_entity"
],
"required_for": [
"effect_grant_expected_value_1_f1659ce17e5da4b9"
],
"source_precedence": [
"application_status",
"user_profile",
"admin_research"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "combined_cec_federal_spend_in_california_percent",
"label": "Percent of combined CEC and federal award spent within California",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_f1659ce17e5da4b9"
],
"source_precedence": [
"application_status",
"quote",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "field_demonstration_or_deployment_in_california",
"label": "Field demonstration or deployment activities located in California, if applicable",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_f1659ce17e5da4b9"
],
"source_precedence": [
"application_status",
"quote",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_f1659ce17e5da4b9",
"effect_type": "grant_expected_value",
"cash_value_classification": "cash_grant",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Do not estimate for generic users. If CEC award status is agreement_executed or business_meeting_approved and cec_approved_award_amount_cents is known, the conditional cash grant amount is the approved CEC award amount. Otherwise, a non-binding cap may be checked as: cap_cents = min(cec_cost_share_request_cents, federal_award_amount_cents, topic_max_award_cents, remaining_topic_funds_cents if known). Topic 3A topic_max_award_cents = 200000000 and has no minimum. Topic 3C topic_max_award_cents = 100000000 and topic_min_award_cents = 20000000. Eligibility gates: federal_award_received must be true for the matching project; eligible_federal_foa_number must match the CEC manual; applicant must be local_jurisdiction or private_entity; private_entity must satisfy 100% match requirement, with federal award usable as match only if it equals or exceeds the CEC amount; at least 70% of combined CEC and federal award must be spent in California; field demonstration/deployment activities must be in California if present; CEC Phase I and Phase II review, scoring, ranking, NOPA, and approval remain required. Expected value remains null because no defensible probability_discount is available.",
"max_award_cents": 200000000,
"min_award_cents": null,
"rate_rows": [
{
"eligible_federal_foa_number": "DE-FOA-0003589",
"federal_topic_area": "3A",
"description": "Cost-competitive direct lithium extraction",
"min_award_cents": null,
"max_award_cents": 200000000,
"topic_total_cec_funding_cents": 200000000
},
{
"eligible_federal_foa_number": "DE-FOA-0003589",
"federal_topic_area": "3C",
"description": "Exploration and characterization of critical materials and rare earth elements from volcanically hosted geothermal systems",
"min_award_cents": 20000000,
"max_award_cents": 100000000,
"topic_total_cec_funding_cents": 100000000
}
],
"probability_discount": null,
"probability_evidence_type": "scoring_criteria_only"
},
"required_inputs": [
"phase_i_application_submitted_by_deadline",
"eligible_federal_foa_number",
"federal_topic_area",
"federal_award_received",
"federal_award_amount_cents",
"cec_cost_share_request_cents",
"cec_award_status",
"cec_approved_award_amount_cents",
"applicant_type",
"combined_cec_federal_spend_in_california_percent",
"field_demonstration_or_deployment_in_california"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"competitive_cost_share",
"federal_award_dependency",
"cec_phase_i_and_phase_ii_approval_required",
"probability_evidence_not_found",
"expected_awards_dependent",
"estimated_award_amount_dependent",
"letter_of_intent_not_final_award",
"award_amount_subject_to_cec_ranking_and_funds",
"max_award_cap_not_user_estimate",
"project_scope_topic_and_applicant_type_required",
"phase_i_deadline_passed_for_new_applicants_as_of_researched_date",
"do_not_include_in_user_facing_total_default"
],
"calculationTrace": [
"CEC official page identifies GFO-25-902 as an active grant funding opportunity and states the purpose is CEC cost-share for applicants that receive an eligible federal FOA award and meet CEC requirements. ([California Energy Commission][1])",
"CEC manual provides caps and eligibility gates: up to $3,000,000 total; CEC award cannot exceed the federal award; CEC may provide up to 100% of the federal project amount based on CEC funds availability; at least 70% of combined CEC and federal award must be spent in California; private entities require 100% match.",
"CEC manual Table 3 supports topic-specific rows for DE-FOA-0003589: Topic 3A maximum $2,000,000 with no minimum; Topic 3C minimum $200,000 and maximum $1,000,000.",
"CEC evaluation is competitive and two-phased. Phase I can produce a Letter of Intent, but the manual states receipt of the letter does not guarantee final CEC approval or the requested amount.",
"California Grants Portal lists total funding as $3,000,000 but expected number of awards and estimated amount per award as Dependent, so no defensible expected-value probability is available. ([California Grants Portal][2])"
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "phase_i_application_submitted_by_deadline",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "No default. As of 2026-07-03, the only listed CEC Phase I due date in the parsed manual was June 29, 2026, so new applicants should generally be treated as ineligible unless application-status evidence shows timely submission."
},
{
"inputKey": "eligible_federal_foa_number",
"valueType": "text",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use DE-FOA-0003589 / DE-TA3-0003589 only when supported by the CEC manual and applicant records."
},
{
"inputKey": "federal_topic_area",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Expected conservative values are 3A or 3C. Do not infer topic from project description without application records."
},
{
"inputKey": "federal_award_received",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default false unless the applicant has an official federal award confirmation for the same project."
},
{
"inputKey": "federal_award_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "No default. Use the official federal award letter amount."
},
{
"inputKey": "cec_cost_share_request_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "No default. Use the amount requested in the submitted CEC application or revised Phase II materials."
},
{
"inputKey": "cec_award_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default not_applied unless there is evidence of Phase I submission, Letter of Intent, NOPA, Business Meeting approval, or executed agreement."
},
{
"inputKey": "cec_approved_award_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "No default. Only populate from CEC NOPA, Business Meeting approval, or executed grant agreement. Do not substitute the maximum cap."
},
{
"inputKey": "applicant_type",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "Use local_jurisdiction or private_entity only. Federal agencies, national laboratories, state universities, and state agencies are not eligible as CEC prime recipients under the parsed manual."
},
{
"inputKey": "combined_cec_federal_spend_in_california_percent",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Must be at least 0.70. No default."
},
{
"inputKey": "field_demonstration_or_deployment_in_california",
"valueType": "boolean",
"whoProvides": "quote",
"realisticDefaultGuidance": "Must be true when the project includes field demonstration or deployment activities. Use not applicable only if the project contains no such activities."
},
{
"inputKey": "award_probability",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Do not default. No official probability evidence was found; leave null and suppress expected value unless a human-reviewed probability basis is later added."
}
],
"remainingGaps": [
"No official CEC application count, historical success rate, expected CEC award count, or award probability was found for GFO-25-902.",
"The California Grants Portal marks expected number of awards and estimated amount per award as Dependent, which prevents a defensible expected-value estimate. ([California Grants Portal][2])",
"Remaining topic-level funds are unknown until CEC publishes letters of intent, NOPA, awards, or other funding updates.",
"CEC Phase I application deadline for the only parsed eligible FOA row was June 29, 2026, which is before the researched date; existing timely applicants may still be in an active Phase II/federal-award workflow, but new applicants should not be treated as eligible without evidence.",
"Actual award amount requires project-specific CEC review, ranking, federal award confirmation, NOPA or approval, and potentially agreement execution.",
"The manual and Q&A were official DOCX files downloaded from the CEC solicitation page; web indexing does not expose all manual text directly, so maintain source archive copies for audit."
],
"doNotUseAsUserFacingEstimateReasons": [
"Competitive award with scoring criteria but no official probability evidence.",
"Federal award is a hard dependency; CEC cost share is unavailable if the federal proposal is not selected.",
"CEC Letter of Intent is not a final award and does not guarantee approval or the requested amount.",
"The available dollar figures are caps and total funding limits, not a project-specific entitlement.",
"Expected award count and estimated per-award amount are Dependent in the California Grants Portal. ([California Grants Portal][2])",
"Project-specific inputs are required, including topic area, federal award amount, applicant type, California spend share, field-demonstration location, CEC application status, and CEC approved award amount.",
"As of 2026-07-03, the parsed Phase I deadline had passed for new applicants."
]
}

[1]: https://www.energy.ca.gov/solicitations/2026-06/gfo-25-902-cost-share-federal-geothermal-energy-funding-opportunities "GFO-25-902 - Cost-Share for Federal Geothermal Energy Funding Opportunities"
[2]: https://www.grants.ca.gov/grants/cost-share-for-federal-geothermal-energy-funding-opportunities/ "Cost-Share for Federal Geothermal Energy Funding Opportunities - California Grants Portal"
[3]: https://eere-exchange.energy.gov/Default.aspx?Search=3589&SearchType= "
    DOE: CMEI eXCHANGE: Funding Opportunities
"

