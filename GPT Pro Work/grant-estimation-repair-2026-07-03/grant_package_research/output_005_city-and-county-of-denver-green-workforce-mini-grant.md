{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22761",
"programName": "City and County of Denver - Green Workforce Mini Grant",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "Green Workforce Mini Grant",
"url": "[https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Green-Jobs/Green-Workforce-Funding](https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Green-Jobs/Green-Workforce-Funding)",
"owner": "City and County of Denver, Office of Climate Action, Sustainability and Resiliency",
"accessed": "2026-07-03",
"evidenceText": "Denver's official program page states that organizations may apply for up to $49,000, with the second 2026 round opening June 3, 2026 and closing July 10, 2026 at 12:00 P.M.; it lists eligible applicant types, proposal requirements, a 12-month timeline limit, and required W-9 and Secretary of State Certificate of Good Standing attachments. ([Denver Government][1])"
},
{
"title": "Denver - CASR Submission Manager: Green Workforce Mini Grant 2026",
"url": "[https://denver-casr.submittable.com/submit](https://denver-casr.submittable.com/submit)",
"owner": "Denver CASR / Submittable",
"accessed": "2026-07-03",
"evidenceText": "The primary application portal describes the Green Workforce Mini Grant 2026 as funding for nonprofits, training providers, community colleges, and technical colleges to strengthen green workforce training in Denver, with up to $49,000 available and applications due July 10, 2026 at 12 p.m. MST. ([Denver CASR][2])"
},
{
"title": "Building Denver's Climate Future: 2025 Annual Report",
"url": "[https://denvergov.org/files/assets/public/v/1/climate-action/documents/cpf/annual-reports/casr-2025-annual-report-2026-06-30.pdf](https://denvergov.org/files/assets/public/v/1/climate-action/documents/cpf/annual-reports/casr-2025-annual-report-2026-06-30.pdf)",
"owner": "City and County of Denver, Office of Climate Action, Sustainability and Resiliency",
"accessed": "2026-07-03",
"evidenceText": "The official 2025 annual report reports historical Green Workforce Mini Grant results of $1.49 million awarded, 30 mini grants, and 458 trainees, but it does not provide the 2026 round application count, current round budget, expected 2026 award count, or success rate. ([Denver Government][3])"
}
],
"sourceSummary": "The uploaded package context was used as the repair target, not as final source evidence.  Official Denver/CASR sources support an active 2026 competitive application round and a maximum award of $49,000 for green workforce training, credentials, curricula, and pathway work, not for physical retrofit installation. ([Denver Government][1]) Official historical reporting confirms prior mini grant awards, but only as historical awards without an application denominator or current-round budget; this is not enough to calculate a defensible expected value. ([Denver Government][3])",
"packagePatch": {
"calculation_status": "no_calculable_value",
"availability": {
"status": "active",
"fundingStatus": "open_funds_available"
},
"input_requirements_to_add_or_update": [
{
"input_key": "applicant_organization_type",
"label": "Applicant organization type",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_fe826aecbd61ca63"
],
"allowed_values": [
"nonprofit",
"training_provider",
"for_profit_training_provider_with_apprenticeship_or_training_program",
"community_college",
"technical_college",
"other"
],
"source_precedence": [
"user_profile",
"retrofit_assumptions",
"application_status"
],
"missing_severity": "blocks_confirmed_award_only"
},
{
"input_key": "green_workforce_training_proposal",
"label": "Green workforce training proposal",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_fe826aecbd61ca63"
],
"source_precedence": [
"user_profile",
"retrofit_assumptions",
"application_status"
],
"missing_severity": "blocks_confirmed_award_only"
},
{
"input_key": "serves_denver_metro_candidates_or_denver_employers",
"label": "Proposal serves Denver Metro candidates or Denver employers",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_fe826aecbd61ca63"
],
"source_precedence": [
"user_profile",
"retrofit_assumptions",
"application_status"
],
"missing_severity": "blocks_confirmed_award_only"
},
{
"input_key": "proposal_focus_area",
"label": "Eligible green workforce focus area",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_fe826aecbd61ca63"
],
"allowed_values": [
"clean_energy",
"electric_vehicle_technology",
"natural_resource_management",
"other"
],
"source_precedence": [
"user_profile",
"retrofit_assumptions",
"application_status"
],
"missing_severity": "blocks_confirmed_award_only"
},
{
"input_key": "proposal_timeline_months",
"label": "Proposal timeline in months",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_fe826aecbd61ca63"
],
"source_precedence": [
"user_profile",
"retrofit_assumptions",
"application_status"
],
"missing_severity": "blocks_confirmed_award_only"
},
{
"input_key": "proposal_budget_cents",
"label": "Proposal budget in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_fe826aecbd61ca63"
],
"source_precedence": [
"application_status",
"user_profile",
"retrofit_assumptions"
],
"missing_severity": "blocks_confirmed_award_only"
},
{
"input_key": "w9_available",
"label": "W-9 available",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_fe826aecbd61ca63"
],
"source_precedence": [
"application_status",
"user_profile"
],
"missing_severity": "blocks_application_only"
},
{
"input_key": "certificate_of_good_standing_available",
"label": "Colorado Secretary of State Certificate of Good Standing available",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_fe826aecbd61ca63"
],
"source_precedence": [
"application_status",
"user_profile"
],
"missing_severity": "blocks_application_only"
},
{
"input_key": "application_status",
"label": "Green Workforce Mini Grant application status",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_fe826aecbd61ca63"
],
"allowed_values": [
"not_started",
"draft",
"submitted",
"selected_for_award",
"awarded",
"denied",
"withdrawn"
],
"source_precedence": [
"application_status",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "approved_award_cents",
"label": "Administrator-approved award amount in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_fe826aecbd61ca63"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "signed_award_agreement_present",
"label": "Signed award agreement or official award notice present",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_fe826aecbd61ca63"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_fe826aecbd61ca63",
"effect_type": "grant_expected_value",
"cash_value_classification": "cash_grant",
"value_model_kind": "competitive_max_only",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Pre-award expected value must be null. If an official award notice or signed award agreement exists, the confirmed conditional award is min(approved_award_cents, 4900000). Do not infer the award from requested budget, proposal budget, project cost, eligibility, or the $49,000 maximum alone.",
"max_award_cents": 4900000,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "historical_awards_only"
},
"required_inputs": [
"application_status",
"approved_award_cents",
"signed_award_agreement_present",
"applicant_organization_type",
"green_workforce_training_proposal",
"serves_denver_metro_candidates_or_denver_employers",
"proposal_focus_area",
"proposal_timeline_months",
"proposal_budget_cents",
"w9_available",
"certificate_of_good_standing_available"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"competitive_max_only",
"up_to_amount_only",
"missing_probability_anchor",
"historical_awards_only_no_application_denominator",
"no_current_round_budget_or_expected_award_count_found",
"needs_award_approval",
"project_specific_budget_approval_required",
"not_installation_rebate",
"do_not_include_in_retrofit_savings_total"
],
"calculationTrace": [
"Official Denver/CASR sources describe an active 2026 Green Workforce Mini Grant round with awards up to $49,000 for eligible green workforce training proposals. ([Denver Government][1])",
"The supported conditional award formula after award approval is min(approved_award_cents, 4900000); requested budget or project cost alone is not a valid award amount.",
"Official historical reporting shows 30 prior mini grants and $1.49 million awarded, but does not provide 2026 applications, 2026 expected awards, 2026 budget, or a success rate. ([Denver Government][3])",
"Because probability_discount is null, expected_value_cents must remain null and suppressed.",
"A nonzero value may be used only as a confirmed award amount from application_status/admin evidence, not as a default user-facing savings estimate."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "application_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use not_started, draft, or submitted for pre-award scenarios; all must suppress expected value. Use awarded only when official award evidence exists."
},
{
"inputKey": "approved_award_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Only populate from an official award notice, agreement, or administrator confirmation. Must not exceed 4900000 cents."
},
{
"inputKey": "signed_award_agreement_present",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default false unless the applicant has a signed award agreement or official award notice."
},
{
"inputKey": "applicant_organization_type",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "Expected eligible values are nonprofit, training provider, for-profit training provider with eligible apprenticeship/training program, community college, or technical college."
},
{
"inputKey": "serves_denver_metro_candidates_or_denver_employers",
"valueType": "boolean",
"whoProvides": "user",
"realisticDefaultGuidance": "Default false until the proposal describes a program design model serving Denver Metro candidates or Denver employers."
},
{
"inputKey": "proposal_focus_area",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "Use clean_energy, electric_vehicle_technology, or natural_resource_management when the proposal fits the official categories."
},
{
"inputKey": "proposal_timeline_months",
"valueType": "number",
"whoProvides": "user",
"realisticDefaultGuidance": "Eligible proposals must have a timeline of no more than 12 months; this input does not create an award estimate."
},
{
"inputKey": "proposal_budget_cents",
"valueType": "money_cents",
"whoProvides": "user",
"realisticDefaultGuidance": "Use for application completeness only. Do not treat proposal budget as awarded funds before administrator approval."
},
{
"inputKey": "w9_available",
"valueType": "boolean",
"whoProvides": "user",
"realisticDefaultGuidance": "Default false until the applicant confirms a current W-9 is available."
},
{
"inputKey": "certificate_of_good_standing_available",
"valueType": "boolean",
"whoProvides": "user",
"realisticDefaultGuidance": "Default false until the applicant confirms a Colorado Secretary of State Certificate of Good Standing is available."
}
],
"remainingGaps": [
"No official current-round application count was found.",
"No official current-round expected award count was found.",
"No official current-round total budget or remaining funds balance was found.",
"No official success rate or selection probability was found.",
"No official rule was found allowing the requested proposal budget to be treated as the award amount before administrator approval.",
"Payment timing and whether awards are paid upfront, reimbursed, or through contract milestones were not clearly established in the available official sources."
],
"doNotUseAsUserFacingEstimateReasons": [
"The program is competitive and source language supports only a maximum award of up to $49,000.",
"Eligibility and an open application round do not imply award approval.",
"Historical awards without application counts do not provide a defensible probability discount.",
"The award amount is project-specific and requires administrator approval.",
"This is a workforce training/pathway grant, not a physical retrofit installation rebate.",
"A nonzero value should be included only after official award approval and human/admin review."
]
}

[1]: https://denvergov.org/Government/Agencies-Departments-Offices/Agencies-Departments-Offices-Directory/Climate-Action-Sustainability-and-Resiliency/Cutting-Denvers-Carbon-Pollution/Green-Jobs/Green-Workforce-Funding "Green Workforce Mini Grant - City and County of Denver"
[2]: https://denver-casr.submittable.com/ "Denver - CASR Submission Manager"
[3]: https://denvergov.org/files/assets/public/v/1/climate-action/documents/cpf/annual-reports/casr-2025-annual-report-2026-06-30.pdf "Building Denver’s Climate Future: 2025 Annual Report"

