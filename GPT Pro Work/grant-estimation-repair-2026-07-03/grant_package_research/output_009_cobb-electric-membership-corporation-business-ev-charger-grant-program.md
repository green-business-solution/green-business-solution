{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22811",
"programName": "Cobb Electric Membership Corporation - Business EV Charger Grant Program",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "EV charging for business",
"url": "[https://www.cobbemc.com/ev-charging-business](https://www.cobbemc.com/ev-charging-business)",
"owner": "Cobb Electric Membership Corporation",
"accessed": "2026-07-03",
"evidenceText": "Cobb EMC states that the EV Grant Program provides funding to businesses, property owners, multifamily unit owners, and government agencies installing EV charging stations; grants are $500 to $5,000; funds are allocated until exhausted; grant amounts vary by application with preference for public access or benefit to the greatest number of EV users; Cobb EMC contacts applicants within 5 business days to state whether a grant will be awarded and the amount; payment is by check after installation verification. ([Cobb EMC][1])"
},
{
"title": "Cobb EMC Commercial Electric Vehicle Supply Equipment or EV Charger Grant Application",
"url": "[https://www.cobbemc.com/sites/default/files/documents/ev/EVGrantApplicationFinal.pdf](https://www.cobbemc.com/sites/default/files/documents/ev/EVGrantApplicationFinal.pdf)",
"owner": "Cobb Electric Membership Corporation",
"accessed": "2026-07-03",
"evidenceText": "The official application says grants range from $500 to $5,000 and are available until allocated funds are exhausted; Cobb EMC determines the appropriate grant amount based on each application, including public access/user benefit, total installation price, charger classification, and number of ports. The application also requires project and account details, bid/proposal information, estimated cost, access/user information, and post-install documentation. ([Cobb EMC][2])"
},
{
"title": "Cobb EMC Commercial Electric Vehicle Grant Program Requirements and Applicant Acknowledgements",
"url": "[https://www.cobbemc.com/sites/default/files/documents/ev/Program%20Requirements%20and%20Acknowledgements.pdf](https://www.cobbemc.com/sites/default/files/documents/ev/Program%20Requirements%20and%20Acknowledgements.pdf)",
"owner": "Cobb Electric Membership Corporation",
"accessed": "2026-07-03",
"evidenceText": "The requirements document limits grants to eligible non-residential Cobb EMC members, requires installation at an active Cobb EMC meter, accepts applications until allocated funds are exhausted, requires invoices/photos/permits and Cobb EMC verification before distribution, excludes EV charger vendors and EV charging businesses, states the $500 minimum and $5,000 maximum, and allows Cobb EMC to modify or terminate the program at any time. ([Cobb EMC][3])"
}
],
"sourceSummary": "Official Cobb EMC materials confirm an active grant workflow with a published $500 to $5,000 award range, but they do not publish a deterministic rate table, a cost-share formula, a fixed per-port amount, remaining budget, historical applications/awards, or any success-rate evidence. The award amount is project-specific and discretionary, funding is only until funds are exhausted, and payment depends on Cobb EMC approval and post-installation verification; therefore the package should be suppressed from user-facing savings totals unless Cobb EMC has issued a project-specific award amount. ([Cobb EMC][1]) ([Cobb EMC][2]) ([Cobb EMC][3]) Uploaded prompt context required conservative suppression when no defensible estimate exists.  ",
"packagePatch": {
"calculation_status": "no_calculable_value",
"availability": {
"status": "active",
"fundingStatus": "open_while_funds_last"
},
"input_requirements_to_add_or_update": [
{
"input_key": "cobb_emc_nonresidential_member_status",
"label": "Eligible non-residential Cobb EMC member status",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_54a6dbe585e8fc1f"
],
"source_precedence": [
"bill",
"user_profile",
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "active_cobb_emc_meter_at_install_address",
"label": "Active Cobb EMC electric meter at installation address",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_54a6dbe585e8fc1f"
],
"source_precedence": [
"bill",
"utility_data",
"application_status"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "cobb_emc_application_status",
"label": "Cobb EMC application decision status",
"value_type": "enum",
"allowed_values": [
"not_submitted",
"submitted_pending",
"approved_award_amount_known",
"rejected",
"withdrawn",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_54a6dbe585e8fc1f"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "cobb_emc_award_amount_cents",
"label": "Cobb EMC project-specific award amount",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_54a6dbe585e8fc1f"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "funding_available_confirmed_by_cobb_emc",
"label": "Funding availability confirmed by Cobb EMC",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_54a6dbe585e8fc1f"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "charger_level",
"label": "EV charger classification",
"value_type": "enum",
"allowed_values": [
"level_2",
"level_3_dc_fast",
"mixed",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_54a6dbe585e8fc1f"
],
"source_precedence": [
"quote",
"program_application",
"retrofit_assumptions"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "port_count",
"label": "Number of EV charging ports",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_54a6dbe585e8fc1f"
],
"source_precedence": [
"quote",
"program_application",
"retrofit_assumptions"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "installation_cost_cents",
"label": "Total EV charger equipment and installation cost",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_54a6dbe585e8fc1f"
],
"source_precedence": [
"quote",
"invoice",
"program_application"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "public_access_or_user_benefit",
"label": "Public access or number of users benefiting from the charger",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_54a6dbe585e8fc1f"
],
"source_precedence": [
"program_application",
"user_profile",
"retrofit_assumptions"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "post_installation_verification_complete",
"label": "Cobb EMC post-installation verification complete",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_54a6dbe585e8fc1f"
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
"effect_id": "effect_grant_expected_value_1_54a6dbe585e8fc1f",
"effect_type": "grant_expected_value",
"cash_value_classification": "cash_grant",
"value_model_kind": "competitive_award_range",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "No pre-approval deterministic award formula is published. Cobb EMC determines whether a grant will be awarded and the grant amount for each application. If and only if Cobb EMC issues a project-specific award notice, the runtime may use cobb_emc_award_amount_cents, constrained to the published 50000- to 500000-cent range and still subject to final invoices, photographs, permits, Cobb EMC branding, and Cobb EMC post-installation verification. Before that award notice and verification status are known, expected value must remain null.",
"max_award_cents": 500000,
"min_award_cents": 50000,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "first_come_funding_unknown"
},
"required_inputs": [
"cobb_emc_nonresidential_member_status",
"active_cobb_emc_meter_at_install_address",
"cobb_emc_application_status",
"cobb_emc_award_amount_cents",
"funding_available_confirmed_by_cobb_emc",
"charger_level",
"port_count",
"installation_cost_cents",
"public_access_or_user_benefit",
"post_installation_verification_complete"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"discretionary_award_amount",
"project_specific_approval_required",
"first_come_funding_unknown",
"funding_remaining_not_published",
"no_award_probability_evidence",
"no_deterministic_rate_table",
"post_installation_verification_required",
"do_not_include_in_user_facing_total_default"
],
"calculationTrace": [
"Published grant range is 50000 to 500000 cents.",
"Cobb EMC determines the grant amount based on each application, with stated factors including public access or greatest user benefit, total installation price, charger classification, and number of ports.",
"Applications are accepted until allocated funds are exhausted; no official source located publishes remaining funds, program budget, historical applications, historical awards, expected award count, or success rate.",
"Cobb EMC contacts applicants with whether a grant will be awarded and the amount; this is a project-specific approval gate, not a deterministic runtime formula.",
"Distribution is by check after installation verification and required final documentation; Cobb EMC can request more documentation and reject, withhold, or modify the award if requirements are not met.",
"Conservative runtime behavior: expected_value_cents remains null and the effect is excluded from user-facing totals unless an official Cobb EMC award amount and verification status are available."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "cobb_emc_nonresidential_member_status",
"valueType": "boolean",
"whoProvides": "bill",
"realisticDefaultGuidance": "No default. Derive from Cobb EMC account type or application record; must be true for eligibility."
},
{
"inputKey": "active_cobb_emc_meter_at_install_address",
"valueType": "boolean",
"whoProvides": "bill",
"realisticDefaultGuidance": "No default. Confirm active Cobb EMC electric service at the installation address."
},
{
"inputKey": "cobb_emc_application_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default to submitted_pending or unknown only if no official decision is present; do not infer approval."
},
{
"inputKey": "cobb_emc_award_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Null unless Cobb EMC has issued a project-specific acceptance and grant amount. Valid official range is 50000 to 500000 cents."
},
{
"inputKey": "funding_available_confirmed_by_cobb_emc",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "No default. Must be confirmed by Cobb EMC; official public materials only state funding is available until exhausted."
},
{
"inputKey": "charger_level",
"valueType": "enum",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use level_2, level_3_dc_fast, or mixed from quote/application. Do not use to estimate an award without Cobb EMC award amount."
},
{
"inputKey": "port_count",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use proposed or installed port count from quote/application. Do not map to dollars without Cobb EMC award determination."
},
{
"inputKey": "installation_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use total eligible EV charger equipment and installation invoice/quote amount. No published percentage of cost applies."
},
{
"inputKey": "public_access_or_user_benefit",
"valueType": "text",
"whoProvides": "user",
"realisticDefaultGuidance": "Describe whether chargers are publicly accessible or how many employees, tenants, customers, or other users benefit."
},
{
"inputKey": "post_installation_verification_complete",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "False until Cobb EMC verifies the installed chargers match the application and required invoices, photos, and permits are submitted."
}
],
"remainingGaps": [
"No official source found publishing remaining funds or current budget utilization.",
"No official source found publishing historical application count, historical award count, success rate, or expected award count.",
"No deterministic official rate table found for charger level, number of ports, installation cost, public access, or expected usage.",
"Cobb EMC project-specific acceptance/rejection, award amount, funding availability, and final verification outcome are required before any user-facing value can be included."
],
"doNotUseAsUserFacingEstimateReasons": [
"The $500 to $5,000 amount is a discretionary award range, not a calculable formula.",
"Cobb EMC determines whether an application receives a grant and the amount on a project-specific basis.",
"Funding is only available until allocated program funds are exhausted, and remaining funds are not published.",
"No probability evidence supports an expected-value estimate.",
"Payment is contingent on post-installation documentation and Cobb EMC verification, and the award may be withheld, modified, or rejected if requirements are not met."
]
}

[1]: https://www.cobbemc.com/ev-charging-business?utm_source=chatgpt.com "EV charging for business | Cobb EMC"
[2]: https://www.cobbemc.com/sites/default/files/documents/ev/EVGrantApplicationFinal.pdf "EVGrantApplicationFinal"
[3]: https://www.cobbemc.com/sites/default/files/documents/ev/Program%20Requirements%20and%20Acknowledgements.pdf "EVGrantApplicationFinal"

