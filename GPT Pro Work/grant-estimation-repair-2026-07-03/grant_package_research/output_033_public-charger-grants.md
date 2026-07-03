{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22783",
"programName": "Public Charger Grants",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "RFP EM-008-2026: Public Level 2 Electric Vehicle Chargers",
"url": "[https://www.efficiencymaine.com/rfp-em-008-2026/](https://www.efficiencymaine.com/rfp-em-008-2026/)",
"owner": "Efficiency Maine Trust",
"accessed": "2026-07-03",
"evidenceText": "The administrator page identifies the opportunity as a competitive RFP with a 960000000-cent budget, reimbursement up to 0.8 of eligible costs, a 20000000-cent per-site cap, a minimum of four ports per site, Maine location requirement, and priority municipalities. ([Efficiency Maine][1])"
},
{
"title": "Request for Proposals: Public Level 2 Electric Vehicle Chargers EM-008-2026, updated 2026-06-23",
"url": "[https://www.efficiencymaine.com/docs/RFP-EM-008-2026-Public-L2-EV-Chargers-EM-008-2026.pdf](https://www.efficiencymaine.com/docs/RFP-EM-008-2026-Public-L2-EV-Chargers-EM-008-2026.pdf)",
"owner": "Efficiency Maine Trust",
"accessed": "2026-07-03",
"evidenceText": "The RFP PDF states the conditional maximum reimbursement formula, 960000000-cent budget, proposal window from 2026-03-03 through 2026-12-03 or until funding is exhausted, monthly award announcements, and a 2027-06-30 completion deadline. ([Efficiency Maine][2])"
},
{
"title": "Responses to Questions: RFP EM-008-2026, last revised 2026-07-01",
"url": "[https://www.efficiencymaine.com/docs/EM_008_2026_Questions_and_Answers_2026-07-01.pdf](https://www.efficiencymaine.com/docs/EM_008_2026_Questions_and_Answers_2026-07-01.pdf)",
"owner": "Efficiency Maine Trust",
"accessed": "2026-07-03",
"evidenceText": "The Q&A confirms there is no maximum incentive cap per port, reiterates the host-site agreement requirement, and states that incentive funds are reserved only for awarded projects. ([Efficiency Maine][3])"
},
{
"title": "Efficiency Maine Public Level 2 EV Chargers Webinar, updated 2026-06-23",
"url": "[https://www.efficiencymaine.com/docs/RFP-EM-008-2026_Webinar_Level_2_Public_Charging.pdf](https://www.efficiencymaine.com/docs/RFP-EM-008-2026_Webinar_Level_2_Public_Charging.pdf)",
"owner": "Efficiency Maine Trust",
"accessed": "2026-07-03",
"evidenceText": "The official webinar restates that the RFP is competitive, has 960000000 cents available, reimburses up to 0.8 of eligible project costs up to 20000000 cents per site, and says final incentive is limited by the requested amount and actual costs. ([Efficiency Maine][4])"
},
{
"title": "Host Site Interest Form for Public Level 2 EV Chargers",
"url": "[https://www.efficiencymaine.com/host-site-interest-form-public-level-2-chargers/](https://www.efficiencymaine.com/host-site-interest-form-public-level-2-chargers/)",
"owner": "Efficiency Maine Trust",
"accessed": "2026-07-03",
"evidenceText": "The host-site page repeats that projects must be physically located in Maine and that bidders must be the property owner or have an executed host-site agreement allowing public operation year-round, 24 hours per day, seven days per week, for at least five years. ([Efficiency Maine][5])"
}
],
"sourceSummary": "The supplied package is a DSIRE-derived grant-like record for Efficiency Maine Public Charger Grants.  Official Efficiency Maine sources support a competitive, capped cost-share reimbursement if selected, not a defensible expected value before award. The published sources provide budget, cap, eligibility, scoring criteria, and monthly award process, but no historical application count, success rate, expected award count, or administrator-provided probability model. Funding is open while funds last and is allocated only to winning proposals, so the package should suppress user-facing expected value by default. ([Efficiency Maine][6])",
"packagePatch": {
"calculation_status": "no_calculable_value",
"availability": {
"status": "rolling",
"fundingStatus": "open_while_funds_last"
},
"input_requirements_to_add_or_update": [
{
"input_key": "eligible_project_cost_cents",
"label": "Eligible project cost for one proposed site, after excluding ineligible costs",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_c8247b1ced6ec8db"
],
"source_precedence": [
"quote",
"application_status",
"user_profile"
],
"missing_severity": "blocks_conditional_award_calculation",
"validation": "Use only costs eligible under RFP section 3.6; exclude ineligible costs under section 3.7."
},
{
"input_key": "requested_incentive_cents",
"label": "Incentive amount requested in the RFP proposal for the site",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_c8247b1ced6ec8db"
],
"source_precedence": [
"application_status",
"user_profile",
"quote"
],
"missing_severity": "blocks_conditional_award_calculation",
"validation": "Requested amount must not exceed the lesser of 0.8 times eligible_project_cost_cents or 20000000 cents per site."
},
{
"input_key": "approved_award_cents",
"label": "Award amount approved in Efficiency Maine award notice or countersigned grant agreement",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_c8247b1ced6ec8db"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_user_facing_value",
"validation": "Do not include a nonzero grant value unless an award notice or countersigned grant agreement is present."
},
{
"input_key": "award_status",
"label": "Efficiency Maine application or award status",
"value_type": "enum",
"allowed_values": [
"not_submitted",
"submitted_pending_review",
"selected_award_pending_contract",
"countersigned_grant_agreement",
"rejected",
"withdrawn"
],
"required_for": [
"effect_grant_expected_value_1_c8247b1ced6ec8db"
],
"source_precedence": [
"application_status",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_user_facing_value",
"validation": "Only selected_award_pending_contract or countersigned_grant_agreement can support conditional award calculation; all other statuses suppress value."
},
{
"input_key": "project_is_physically_in_maine",
"label": "Project site is physically located in Maine",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_c8247b1ced6ec8db"
],
"source_precedence": [
"user_profile",
"quote",
"server_derived"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "site_property_type",
"label": "Eligible site property type",
"value_type": "enum",
"allowed_values": [
"multifamily_5_plus_units",
"business_property",
"public_property"
],
"required_for": [
"effect_grant_expected_value_1_c8247b1ced6ec8db"
],
"source_precedence": [
"user_profile",
"quote"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "host_site_agreement_or_property_owner_attestation",
"label": "Property owner attestation or executed host-site agreement",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_c8247b1ced6ec8db"
],
"source_precedence": [
"application_status",
"user_profile"
],
"missing_severity": "blocks_eligibility",
"validation": "Must allow installation and operation of public EV chargers year-round, 24 hours per day, seven days per week, for at least five years from commissioning."
},
{
"input_key": "number_of_level_2_ports",
"label": "Number of Level 2 charging ports at the site",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_c8247b1ced6ec8db"
],
"source_precedence": [
"quote",
"user_profile"
],
"missing_severity": "blocks_eligibility",
"validation": "Must be at least 4; there is no separate per-port incentive cap in the updated RFP."
},
{
"input_key": "charger_ports_networked",
"label": "Chargers are networked",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_c8247b1ced6ec8db"
],
"source_precedence": [
"quote",
"user_profile"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "each_port_supports_j1772",
"label": "Each port can serve EVs using the J1772 standard",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_c8247b1ced6ec8db"
],
"source_precedence": [
"quote"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "simultaneous_kw_per_port",
"label": "Simultaneous power per AC Level 2 port",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_c8247b1ced6ec8db"
],
"source_precedence": [
"quote"
],
"missing_severity": "blocks_eligibility",
"validation": "Must be at least 6 kW per port simultaneously across all AC ports unless allowed by the RFP smart charging provisions."
},
{
"input_key": "equipment_new_unused_energy_star_ul",
"label": "Equipment is new and unused, ENERGY STAR certified, and UL or equivalent NRTL certified",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_c8247b1ced6ec8db"
],
"source_precedence": [
"quote"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "project_replaces_or_upgrades_existing_charging_equipment",
"label": "Project replaces or upgrades existing charging equipment",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_c8247b1ced6ec8db"
],
"source_precedence": [
"user_profile",
"quote"
],
"missing_severity": "blocks_eligibility_if_true",
"validation": "Must be false."
},
{
"input_key": "chargers_primarily_for_public_or_private_fleet",
"label": "Chargers will be used primarily for a public or private fleet",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_c8247b1ced6ec8db"
],
"source_precedence": [
"user_profile",
"quote"
],
"missing_severity": "blocks_eligibility_if_true",
"validation": "Must be false."
},
{
"input_key": "documentation_verified_for_reimbursement",
"label": "Reimbursement documentation and any post-installation review are complete",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_c8247b1ced6ec8db"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_final_reimbursement_value"
},
{
"input_key": "human_reviewed_probability_discount",
"label": "Human-reviewed award probability for expected value modeling",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_c8247b1ced6ec8db"
],
"source_precedence": [
"admin_research"
],
"missing_severity": "blocks_expected_value_calculation",
"validation": "Leave null unless RetroFi has a documented, human-approved probability model; do not infer probability from the cap, total budget, or scoring criteria."
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_c8247b1ced6ec8db",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": 0.8,
"conditional_award_cents": null,
"conditional_award_formula": "Expected value must be suppressed unless a human-reviewed probability exists. If the site is selected or has a countersigned grant agreement, a conservative per-site conditional reimbursement can be calculated as min(approved_award_cents, requested_incentive_cents, round(eligible_project_cost_cents * 0.8), 20000000). If approved_award_cents is unavailable, do not include a nonzero user-facing value.",
"max_award_cents": 20000000,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "scoring_criteria_only"
},
"required_inputs": [
"eligible_project_cost_cents",
"requested_incentive_cents",
"approved_award_cents",
"award_status",
"project_is_physically_in_maine",
"site_property_type",
"host_site_agreement_or_property_owner_attestation",
"number_of_level_2_ports",
"charger_ports_networked",
"each_port_supports_j1772",
"simultaneous_kw_per_port",
"equipment_new_unused_energy_star_ul",
"project_replaces_or_upgrades_existing_charging_equipment",
"chargers_primarily_for_public_or_private_fleet",
"documentation_verified_for_reimbursement",
"human_reviewed_probability_discount"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"competitive_grant_no_success_rate",
"scoring_criteria_only_not_probability_model",
"budget_without_expected_award_count",
"up_to_cap_not_expected_value",
"award_requires_project_specific_selection",
"funds_not_reserved_until_award",
"conditional_award_requires_approved_award_amount",
"conditional_award_requires_verified_eligible_costs",
"do_not_infer_probability_from_budget_or_cap"
],
"calculationTrace": [
"Official formula is a maximum conditional reimbursement, not an expected value.",
"Published maximum per site is min(0.8 * eligible_project_cost_cents, 20000000).",
"Updated RFP/Q&A indicate no separate per-port incentive cap.",
"Because proposals are scored competitively and official sources do not publish success rates, application counts, or expected award counts, probability_discount remains null.",
"Before an award notice or countersigned grant agreement, expected_value_cents must remain null and excluded from user-facing totals.",
"After award, if approved_award_cents, requested_incentive_cents, eligible_project_cost_cents, and reimbursement documentation are present, use min(approved_award_cents, requested_incentive_cents, round(eligible_project_cost_cents * 0.8), 20000000) per site."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "eligible_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "No default. Use site-level eligible cost only after excluding real estate, landscaping, non-eligible operating costs, pre-opening costs, OEM-required dealer investments, and costs already claimed under prior Efficiency Maine EV charging awards."
},
{
"inputKey": "requested_incentive_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "No default. This is the amount requested in the proposal. Do not assume the applicant requested the maximum."
},
{
"inputKey": "approved_award_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "No default. Required before any nonzero user-facing grant value is included."
},
{
"inputKey": "award_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use submitted_pending_review for pre-award projects. Only selected_award_pending_contract or countersigned_grant_agreement can support conditional award calculation."
},
{
"inputKey": "human_reviewed_probability_discount",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Default null. Use only if RetroFi separately approves a documented probability model from administrator data or validated historical application and award data."
},
{
"inputKey": "project_is_physically_in_maine",
"valueType": "boolean",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Default false unless the site address geocodes to Maine."
},
{
"inputKey": "site_priority_municipality_status",
"valueType": "boolean",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "May affect proposal scoring only. Do not use as a probability discount without human review."
},
{
"inputKey": "site_property_type",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "Allowed eligible values are multifamily_5_plus_units, business_property, or public_property."
},
{
"inputKey": "host_site_agreement_or_property_owner_attestation",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Required if bidder is not the property owner. Must allow public EV charger installation and operation year-round, 24 hours per day, seven days per week, for at least five years from commissioning."
},
{
"inputKey": "number_of_level_2_ports",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Must be at least 4. Do not multiply award value by ports; the published cap is per site."
},
{
"inputKey": "charger_ports_networked",
"valueType": "boolean",
"whoProvides": "quote",
"realisticDefaultGuidance": "Default false unless equipment specifications show networked charger capability meeting the RFP definition."
},
{
"inputKey": "each_port_supports_j1772",
"valueType": "boolean",
"whoProvides": "quote",
"realisticDefaultGuidance": "Default false unless equipment specifications confirm each port can serve EVs using J1772."
},
{
"inputKey": "simultaneous_kw_per_port",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use nameplate or engineered design value. Must satisfy at least 6 kW per AC port simultaneously across all ports unless the RFP smart charging provisions apply."
},
{
"inputKey": "equipment_new_unused_energy_star_ul",
"valueType": "boolean",
"whoProvides": "quote",
"realisticDefaultGuidance": "Default false unless equipment specification sheets confirm new unused equipment, ENERGY STAR certification, and UL or equivalent NRTL certification."
},
{
"inputKey": "project_replaces_or_upgrades_existing_charging_equipment",
"valueType": "boolean",
"whoProvides": "user",
"realisticDefaultGuidance": "Must be false for eligibility."
},
{
"inputKey": "chargers_primarily_for_public_or_private_fleet",
"valueType": "boolean",
"whoProvides": "user",
"realisticDefaultGuidance": "Must be false for eligibility."
},
{
"inputKey": "project_completion_date",
"valueType": "date",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Awarded projects must be completed by 2027-06-30."
},
{
"inputKey": "documentation_verified_for_reimbursement",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default false until invoices, project completion form, and any required project review or inspection documentation are complete."
}
],
"remainingGaps": [
"No official historical application count, success rate, or probability model for EM-008-2026 was found.",
"No official expected award count was found; the 960000000-cent budget and 20000000-cent per-site cap can imply only a theoretical maximum, not expected awards or probability.",
"No live remaining-funds feed was found; because the RFP is open only until 2026-12-03 or until funds are exhausted, runtime should check the administrator page before accepting new applications.",
"A project-specific approved_award_cents value from an award notice or countersigned grant agreement is required before any nonzero user-facing value is defensible.",
"The current package duplicates cost, port, host-site, and award-decision inputs. Use the canonical input keys in this patch and retire duplicate legacy blockers where possible.",
"Priority municipality status affects scoring but does not create an award probability."
],
"doNotUseAsUserFacingEstimateReasons": [
"competitive_grant_no_success_rate",
"scoring_criteria_only_not_probability_model",
"budget_without_expected_award_count",
"up_to_cap_not_expected_value",
"requires_project_specific_award_selection",
"funds_open_while_available_not_reserved_for_all_applicants",
"approved_award_amount_missing",
"verified_eligible_costs_missing",
"post_installation_reimbursement_review_required"
]
}

[1]: https://www.efficiencymaine.com/rfp-em-008-2026/?utm_source=chatgpt.com "RFP EM-008-2026 - Efficiency Maine"
[2]: https://www.efficiencymaine.com/docs/RFP-EM-008-2026-Public-L2-EV-Chargers-EM-008-2026.pdf "RFP Public L2 EV Chargers EM-008-2026_UPDATED_2026-06-23"
[3]: https://www.efficiencymaine.com/docs/EM_008_2026_Questions_and_Answers_2026-07-01.pdf "EM_008_2026_Questions_and_Answers_2026-07-01"
[4]: https://www.efficiencymaine.com/docs/RFP-EM-008-2026_Webinar_Level_2_Public_Charging.pdf "EfficiencyMaine_PublicLevel2EVChargers_Webinar1_UPDATED_2026-06-23"
[5]: https://www.efficiencymaine.com/host-site-interest-form-public-level-2-chargers/ "Host Site Interest Form for Public Level 2 EV Chargers - Efficiency Maine"
[6]: https://www.efficiencymaine.com/rfp-em-008-2026/ "RFP EM-008-2026 - Efficiency Maine"

