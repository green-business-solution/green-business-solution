{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22199",
"programName": "It Pay$ to Plug in Program",
"status": "needs_project_inputs",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "high",
"officialSources": [
{
"title": "Drive Green NJ | It Pay$ to Plug In",
"url": "[https://dep.nj.gov/drivegreen/it-pays-to-plug-in/](https://dep.nj.gov/drivegreen/it-pays-to-plug-in/)",
"owner": "New Jersey Department of Environmental Protection",
"accessed": "2026-07-03",
"evidenceText": "Current NJDEP program page lists Level 1 and Level 2 reimbursement maximums of $750 per Level 1 charging port and $4,000 per Level 2 charging port, says new applications are added to a waitlist, and says approvals are first-come, first-served. It also states that applicants must not purchase or install before grant execution and that completed projects are not eligible."
},
{
"title": "It Pay$ to Plug In: NJ’s Electric Vehicle Charging Grant Program Level 1 & Level 2 Overview and Instructions",
"url": "[https://dep.nj.gov/wp-content/uploads/drivegreen/ippi/overview.pdf](https://dep.nj.gov/wp-content/uploads/drivegreen/ippi/overview.pdf)",
"owner": "New Jersey Department of Environmental Protection",
"accessed": "2026-07-03",
"evidenceText": "Version 03/19/2026 overview states the Level 1 and Level 2 program is a reimbursement program processed first-come, first-served when funding is available. It gives eligible costs, ineligible costs, minimum port rules, reimbursement caps, pre-purchase grant execution requirements, and the $500,000 calendar-year approval limit for Level 1 and Level 2 applicants."
},
{
"title": "It Pay$ to Plug In: NJ’s Electric Vehicle Charging Grant Program",
"url": "[https://dep.nj.gov/grantandloanprograms/it-pays-to-plug-in-njs-electric-vehicle-charging-grant-program/](https://dep.nj.gov/grantandloanprograms/it-pays-to-plug-in-njs-electric-vehicle-charging-grant-program/)",
"owner": "New Jersey Department of Environmental Protection",
"accessed": "2026-07-03",
"evidenceText": "NJDEP Grant and Loan Programs page states Level 1 and Level 2 applications are accepted on a rolling basis, DC Fast Charger applications are accepted during competitive solicitation periods only, and Level 1/Level 2 funds are allocated to approved projects until depleted."
},
{
"title": "Drive Green NJ | It Pay$ to Plug In - DCFC Solicitation 2025",
"url": "[https://dep.nj.gov/drivegreen/dcfcsolicitation/](https://dep.nj.gov/drivegreen/dcfcsolicitation/)",
"owner": "New Jersey Department of Environmental Protection",
"accessed": "2026-07-03",
"evidenceText": "NJDEP DCFC Solicitation 2025 page states the solicitation period was 8/25/2025 through 10/25/2025, describes a competitive ranking process after the application period closes, and lists 150kW+ reimbursement of $100,000 per port with a 2-port minimum and 6-port maximum."
},
{
"title": "It Pay$ to Plug In: NJ’s Electric Vehicle Charging Grant Program Overview and Instructions for DC Fast Charger Solicitation",
"url": "[https://dep.nj.gov/wp-content/uploads/drivegreen/ippi/dcfcoverview2025.pdf](https://dep.nj.gov/wp-content/uploads/drivegreen/ippi/dcfcoverview2025.pdf)",
"owner": "New Jersey Department of Environmental Protection",
"accessed": "2026-07-03",
"evidenceText": "Updated 9/22/2025 DCFC overview states the solicitation period was 8/25/2025 through 10/25/2025, applications would not be accepted after closing, applications are ranked using selection criteria, and selected applicants must execute a grant agreement before purchasing or installing charging equipment."
},
{
"title": "It Pay$ to Plug In: DC Fast Charger Solicitation",
"url": "[https://dep.nj.gov/grantandloanprograms/it-pay-to-plug-in-dc-fast-charger-solicitation/](https://dep.nj.gov/grantandloanprograms/it-pay-to-plug-in-dc-fast-charger-solicitation/)",
"owner": "New Jersey Department of Environmental Protection",
"accessed": "2026-07-03",
"evidenceText": "NJDEP Grant and Loan Programs page for the DC Fast Charger Solicitation states: this grant closed October 25, 2025. It repeats the DCFC reimbursement cap of $100,000 per 150kW+ port, 2-port minimum, 6-port maximum, and 100% government-owned-property or 80% non-government-owned-property cost-share structure."
}
],
"sourceSummary": "Prompt context was supplied in the uploaded package . Official NJDEP sources support a conservative split. Level 1 and Level 2 reimbursement has a defensible conditional formula, but current new applications are waitlisted and reimbursement requires NJDEP approval, grant execution before equipment purchase or installation, eligible costs, paid invoices, and funding availability. DCFC funding is not currently estimable for new applicants because the official 2025 DCFC solicitation is closed, it was competitive, and no official probability, award-count, application-count, or budget-to-award model was found.",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "rolling",
"fundingStatus": "waitlist"
},
"input_requirements_to_add_or_update": [
{
"input_key": "charger_level",
"label": "Charger level",
"value_type": "enum",
"allowed_values": [
"level_1",
"level_2",
"dc_fast_charger"
],
"required_for": [
"effect_one_time_savings_1_775c1a75361e123c"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "port_count",
"label": "Eligible charging port count",
"value_type": "number",
"required_for": [
"effect_one_time_savings_1_775c1a75361e123c",
"effect_grant_expected_value_2_a26a941b3c377b51"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "eligible_cost_cents",
"label": "Eligible equipment and program-allowable cost, excluding ineligible costs",
"value_type": "money_cents",
"required_for": [
"effect_one_time_savings_1_775c1a75361e123c",
"effect_grant_expected_value_2_a26a941b3c377b51"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "application_status",
"label": "NJDEP application status",
"value_type": "enum",
"allowed_values": [
"not_applied",
"submitted_waitlist",
"approved_not_executed",
"grant_executed",
"denied",
"withdrawn"
],
"required_for": [
"effect_one_time_savings_1_775c1a75361e123c"
],
"missing_severity": "blocks_user_facing_total"
},
{
"input_key": "grant_agreement_executed_before_purchase_or_installation",
"label": "Grant agreement fully executed before charging equipment purchase or installation",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_775c1a75361e123c",
"effect_grant_expected_value_2_a26a941b3c377b51"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "funding_status_confirmed_by_admin",
"label": "Current NJDEP funding/reservation status for this application",
"value_type": "enum",
"allowed_values": [
"funds_reserved_for_executed_grant",
"waitlist",
"funding_available_not_reserved",
"exhausted",
"unknown"
],
"required_for": [
"effect_one_time_savings_1_775c1a75361e123c"
],
"missing_severity": "blocks_user_facing_total"
},
{
"input_key": "site_type",
"label": "Eligible site type",
"value_type": "enum",
"allowed_values": [
"workplace",
"public_place",
"multi_unit_dwelling",
"private_single_family_residential",
"other"
],
"required_for": [
"effect_one_time_savings_1_775c1a75361e123c"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "site_in_new_jersey",
"label": "Charging stations installed in New Jersey",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_775c1a75361e123c",
"effect_grant_expected_value_2_a26a941b3c377b51"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "applicant_entity_type",
"label": "Applicant entity type",
"value_type": "enum",
"allowed_values": [
"business",
"government",
"non_profit",
"educational_institution",
"multi_unit_dwelling",
"private_single_family_residential",
"other"
],
"required_for": [
"effect_one_time_savings_1_775c1a75361e123c",
"effect_grant_expected_value_2_a26a941b3c377b51"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "applicant_owns_and_operates_equipment",
"label": "Applicant will own and operate the charging stations",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_775c1a75361e123c",
"effect_grant_expected_value_2_a26a941b3c377b51"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "calendar_year_l1_l2_awards_to_date_cents",
"label": "Applicant’s Level 1/Level 2 approvals already received in the calendar year",
"value_type": "money_cents",
"required_for": [
"effect_one_time_savings_1_775c1a75361e123c"
],
"missing_severity": "blocks_max_cap"
},
{
"input_key": "charger_power_kw",
"label": "Charger continuous power per port in kW",
"value_type": "number",
"required_for": [
"effect_one_time_savings_1_775c1a75361e123c",
"effect_grant_expected_value_2_a26a941b3c377b51"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "energy_star_or_pending_certification_for_l1_l2",
"label": "ENERGY STAR certified or pending certification for Level 1/Level 2 equipment where required",
"value_type": "boolean",
"required_for": [
"effect_one_time_savings_1_775c1a75361e123c"
],
"missing_severity": "blocks_payment_or_final_eligibility"
},
{
"input_key": "current_dcfc_solicitation_is_open",
"label": "Current NJDEP DCFC solicitation is open",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_2_a26a941b3c377b51"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "dcfc_application_selected_and_approved",
"label": "DCFC application selected and approved by NJDEP",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_2_a26a941b3c377b51"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "property_ownership_type",
"label": "DCFC property ownership type",
"value_type": "enum",
"allowed_values": [
"government_owned",
"non_government_owned"
],
"required_for": [
"effect_grant_expected_value_2_a26a941b3c377b51"
],
"missing_severity": "blocks_calculation"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_one_time_savings_1_775c1a75361e123c",
"effect_type": "one_time_savings",
"cash_value_classification": "reimbursement",
"value_model_kind": "hybrid_rate_plus_cap",
"calculation": {
"method": "rate_table",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "For Level 1 and Level 2 only, if the applicant and site are eligible, NJDEP approves the application, funding is available or reserved, and the NJDEP grant agreement is fully executed before charging equipment is purchased or installed: award_cents = min(eligible_cost_cents, port_count * rate_cents_per_port, 50000000 - calendar_year_l1_l2_awards_to_date_cents, any lower NJDEP-approved port or reimbursement limit). Level 1 rate is 75000 cents per port and requires at least 5 ports. Level 2 rate is 400000 cents per port and requires at least 2 ports per location and no more than 20 ports per location. Eligible costs include charging stations, delivery and activation fees, warranty, maintenance agreement, network subscription for up to 5 years, and leasing if necessary. Exclude make-ready, installation, bollards, signage, floor paint or markings, real estate, other capital costs, and costs before or after the work period.",
"max_award_cents": 50000000,
"min_award_cents": null,
"rate_rows": [
{
"charger_level": "level_1",
"rate_cents_per_port": 75000,
"unit": "port",
"minimum_ports_per_location": 5,
"maximum_ports_per_location": null,
"minimum_power_kw_per_port": 1.4,
"eligible_cost_cap_applies": true,
"annual_applicant_cap_cents": 50000000
},
{
"charger_level": "level_2",
"rate_cents_per_port": 400000,
"unit": "port",
"minimum_ports_per_location": 2,
"maximum_ports_per_location": 20,
"minimum_power_kw_per_port": 7.2,
"eligible_cost_cap_applies": true,
"annual_applicant_cap_cents": 50000000
}
],
"probability_discount": null,
"probability_evidence_type": "first_come_funding_unknown"
},
"required_inputs": [
"charger_level",
"port_count",
"eligible_cost_cents",
"application_status",
"grant_agreement_executed_before_purchase_or_installation",
"funding_status_confirmed_by_admin",
"site_type",
"site_in_new_jersey",
"applicant_entity_type",
"applicant_owns_and_operates_equipment",
"calendar_year_l1_l2_awards_to_date_cents",
"charger_power_kw",
"energy_star_or_pending_certification_for_l1_l2"
],
"missing_input_behavior": "needs_funding_check",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": false,
"reasonCodes": [
"l1_l2_formula_supported",
"new_applications_waitlisted",
"first_come_first_served_when_funding_available",
"funding_not_confirmed_for_new_applicant",
"project_specific_njdep_approval_required",
"grant_agreement_required_before_purchase_or_installation",
"completed_projects_not_eligible",
"reimbursement_after_installation_and_invoice_review",
"exclude_from_user_total_until_funds_reserved_or_grant_executed"
],
"calculationTrace": [
"NJDEP current page lists $750 per Level 1 charging port and $4,000 per Level 2 charging port.",
"NJDEP overview states reimbursement will not exceed payment receipts and is contingent upon availability of funding.",
"NJDEP overview states applicants must have the grant executed before charging equipment is purchased or installed; costs incurred before the work period are not eligible.",
"NJDEP current page states new applications are added to a waitlist and approved first-come, first-served.",
"Level 1 requires at least 5 charging ports; Level 2 requires at least 2 and at most 20 ports per location.",
"Level 1 and Level 2 applicants may not be approved for more than $500,000 in projects in a calendar year."
]
},
{
"effect_id": "effect_grant_expected_value_2_a26a941b3c377b51",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "zero_when_not_applicable",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Suppress for new applicants unless a current NJDEP DCFC solicitation is open and the application has been selected/approved. For the closed 2025 DCFC solicitation only: if selected, approved, and grant agreement executed before purchase or installation, conditional_award_cents = min(eligible_cost_cents * cost_share_percent, port_count * 10000000). cost_share_percent = 1.0 for publicly accessible chargers on government-owned property and 0.8 for publicly accessible chargers on non-government-owned property. The 2025 solicitation required at least 2 and no more than 6 DCFC ports per proposed project location, and each port had to provide at least 150 kW continuous.",
"max_award_cents": 60000000,
"min_award_cents": null,
"rate_rows": [
{
"charger_type": "dc_fast_charger",
"minimum_power_kw_per_port": 150,
"rate_cents_per_port": 10000000,
"minimum_ports_per_location": 2,
"maximum_ports_per_location": 6,
"property_ownership_type": "government_owned",
"cost_share_percent": 1.0,
"eligible_cost_cap_applies": true
},
{
"charger_type": "dc_fast_charger",
"minimum_power_kw_per_port": 150,
"rate_cents_per_port": 10000000,
"minimum_ports_per_location": 2,
"maximum_ports_per_location": 6,
"property_ownership_type": "non_government_owned",
"cost_share_percent": 0.8,
"eligible_cost_cap_applies": true
}
],
"probability_discount": null,
"probability_evidence_type": "scoring_criteria_only"
},
"required_inputs": [
"current_dcfc_solicitation_is_open",
"dcfc_application_selected_and_approved",
"grant_agreement_executed_before_purchase_or_installation",
"site_in_new_jersey",
"property_ownership_type",
"port_count",
"eligible_cost_cents",
"charger_power_kw",
"applicant_entity_type",
"applicant_owns_and_operates_equipment"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"dcfc_2025_solicitation_closed",
"current_dcfc_solicitation_not_found",
"competitive_grant",
"scoring_criteria_only",
"probability_evidence_not_found",
"project_specific_selection_required",
"grant_agreement_required_before_purchase_or_installation",
"conditional_max_only_not_expected_value",
"future_solicitation_required"
],
"calculationTrace": [
"Official NJDEP DCFC page lists the 2025 solicitation period as August 25, 2025 through October 25, 2025.",
"Official NJDEP Grant and Loan Programs page states the DC Fast Charger Solicitation closed October 25, 2025.",
"The 2025 DCFC materials state applications would be ranked after the competitive solicitation period using selection criteria.",
"The 2025 DCFC materials state reimbursement is $100,000 per 150 kW+ port, with a 2-port minimum and 6-port maximum.",
"The 2025 DCFC materials state Community projects on government-owned property may receive 100% of eligible costs up to the maximum, while non-government-owned-property projects may receive 80% up to the maximum.",
"Maximum conditional cap from the closed 2025 solicitation is 6 ports * $100,000 = $600,000, before lower eligible-cost and cost-share constraints."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "charger_level",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "Use level_1 or level_2 for the rolling/waitlisted formula. Use dc_fast_charger only to trigger DCFC suppression unless a new official solicitation exists."
},
{
"inputKey": "port_count",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Level 1 must be at least 5 ports. Level 2 must be at least 2 and no more than 20 ports per location. Closed 2025 DCFC solicitation required 2 to 6 ports."
},
{
"inputKey": "eligible_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Include only NJDEP-eligible costs such as charging equipment, delivery/activation, warranty, maintenance agreement, network subscription up to 5 years, and lease costs if applicable. Exclude make-ready, installation, bollards, signage, floor paint/markings, real estate, and other capital costs unless an executed grant agreement says otherwise."
},
{
"inputKey": "application_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Do not include in user-facing total unless status is grant_executed or funds are otherwise reserved by NJDEP for the applicant."
},
{
"inputKey": "funding_status_confirmed_by_admin",
"valueType": "enum",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Current public page says new applications are waitlisted. Use waitlist or unknown unless NJDEP/SAGE confirms funds are reserved for the specific application."
},
{
"inputKey": "grant_agreement_executed_before_purchase_or_installation",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Must be true to calculate a user-facing reimbursement. If false or unknown, suppress from user-facing totals."
},
{
"inputKey": "site_type",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "Eligible Level 1/Level 2 site types are workplace, public_place, or multi_unit_dwelling with at least 5 units. Private single-family residential is not eligible."
},
{
"inputKey": "site_in_new_jersey",
"valueType": "boolean",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Must be true."
},
{
"inputKey": "applicant_entity_type",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "Eligible entities include businesses, governments, non-profits, educational institutions, and multi-unit dwellings. Private residential dwellings other than multi-unit dwellings are not eligible."
},
{
"inputKey": "applicant_owns_and_operates_equipment",
"valueType": "boolean",
"whoProvides": "user",
"realisticDefaultGuidance": "Must be true because NJDEP states the applicant must be the entity that owns and operates the charging stations."
},
{
"inputKey": "calendar_year_l1_l2_awards_to_date_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default to 0 only if applicant confirms no other Level 1/Level 2 approvals in the calendar year; otherwise request the application or award history."
},
{
"inputKey": "charger_power_kw",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Level 1 must provide at least 1.4 kW continuous per plug. Level 2 must provide at least 7.2 kW continuous per port. Closed 2025 DCFC required at least 150 kW continuous per port."
},
{
"inputKey": "energy_star_or_pending_certification_for_l1_l2",
"valueType": "boolean",
"whoProvides": "quote",
"realisticDefaultGuidance": "For Level 1/Level 2 EVSE manufactured after January 18, 2023, require ENERGY STAR certification or documented pending certification, with final payment contingent on certification."
},
{
"inputKey": "current_dcfc_solicitation_is_open",
"valueType": "boolean",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "As of 2026-07-03, use false for the 2025 DCFC solicitation because NJDEP states it closed October 25, 2025."
},
{
"inputKey": "dcfc_application_selected_and_approved",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Must be true before any DCFC conditional award formula can be applied. Otherwise suppress expected value."
},
{
"inputKey": "property_ownership_type",
"valueType": "enum",
"whoProvides": "user",
"realisticDefaultGuidance": "For the closed 2025 DCFC formula, government_owned maps to 1.0 cost share; non_government_owned maps to 0.8 cost share."
}
],
"remainingGaps": [
"No official current funding amount, remaining budget, or waitlist queue position for Level 1/Level 2 new applicants was found on accessible NJDEP pages.",
"No official current open NJDEP DCFC solicitation was found; official NJDEP pages identify the 2025 DCFC solicitation as closed October 25, 2025.",
"No official DCFC historical application count, award count, current solicitation budget, expected award count, or success-rate evidence was found.",
"The Level 1/Level 2 formula may change for alternatively funded projects; NJDEP states alternative funding may include different allowable costs or match requirements identified in the grant agreement.",
"SAGE project-specific status, grant execution, and funds-reserved status are required before a user-facing estimate should be included."
],
"doNotUseAsUserFacingEstimateReasons": [
"Level 1/Level 2 new applications are currently waitlisted and funding is not confirmed for a generic applicant.",
"NJDEP approval and a fully executed grant agreement are required before charging equipment purchase or installation.",
"Reimbursement is post-installation and requires eligible paid invoices, proof of payment, photos, and NJDEP review.",
"The 2025 DCFC solicitation is closed and cannot be estimated for new applicants.",
"DCFC awards are competitive, project-specific, and lack official probability evidence.",
"Published DCFC values are maximum conditional amounts, not expected values."
]
}

