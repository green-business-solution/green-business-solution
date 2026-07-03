{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_SILICON_VALLEY_POWER:svp_source_section:6e6b359eb5fc98c0:nonprofit-solar-grant",
"programName": "Nonprofit Solar Grant",
"status": "suppress_max_only",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "medium",
"officialSources": [
{
"title": "Energy Efficiency Rebates - Nonprofit Solar Grant",
"url": "[https://www.siliconvalleypower.com/businesses/rebates](https://www.siliconvalleypower.com/businesses/rebates)",
"owner": "Silicon Valley Power / City of Santa Clara",
"accessed": "2026-07-03",
"evidenceText": "SVP's current business rebates page lists the Nonprofit Solar Grant, states grants are up to $100,000, may cover up to 100% of system cost, may use up to 10% of grant funds for qualifying building repairs or PV-ready infrastructure, cannot exceed 80% of annual energy usage, and are pre-approved first-come, first-served until funds are exhausted, with a waitlist after funds are reserved. ([Silicon Valley Power][1])"
},
{
"title": "Nonprofit Solar Grant Program Application and Program Rules, v.10.2023",
"url": "[https://www.siliconvalleypower.com/home/showpublisheddocument/82370/638409969485570000](https://www.siliconvalleypower.com/home/showpublisheddocument/82370/638409969485570000)",
"owner": "Silicon Valley Power / City of Santa Clara",
"accessed": "2026-07-03",
"evidenceText": "The official application/rules state that SVP nonprofit customers may receive a grant up to $100,000 for a solar PV system; required attachments include an SVP bill, PV system contract, annual production calculations, system layout, shade analysis, W-9, and proof of nonprofit status. Program rules require a Silicon Valley Power non-residential electric customer classified under IRS 501(c)(3) or 501(c)(19), host-customer ownership, no leases or PPAs, CEC-listed equipment, a minimum 10-year warranty, grid connection by a licensed contractor, sizing not exceeding 80% of annual energy use, no more than 10% of grant funds for PV-ready/building-repair costs, pre-approval before installation, and SVP approval at sole discretion. ([Silicon Valley Power][2])"
}
],
"sourceSummary": "Input package context reviewed from the uploaded prompt.  Official SVP sources support an active listed program with first-come, first-served pre-approval while funds last, but the published value language is maximum-only: up to $100,000 and up to 100% of system cost. Because the source does not publish a deterministic award formula below the caps and states SVP approval is discretionary, do not estimate from eligible cost alone. Runtime may use a documented SVP-approved grant amount if supplied by application status/admin review and capped against eligible system cost and the $100,000 maximum.",
"packagePatch": {
"calculation_status": "custom_quote_estimate",
"availability": {
"status": "active",
"fundingStatus": "open_while_funds_last"
},
"input_requirements_to_add_or_update": [
{
"input_key": "approved_grant_amount_cents",
"label": "SVP-approved grant amount",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_5bab9aa147dbe71e"
],
"source_precedence": [
"application_status",
"admin_research",
"program_application"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "eligible_system_cost_cents",
"label": "Eligible solar PV system cost before SVP grant",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_5bab9aa147dbe71e"
],
"source_precedence": [
"quote",
"final_paid_invoice",
"program_application",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "nonprofit_tax_exempt_status",
"label": "IRS nonprofit tax-exempt status",
"value_type": "enum",
"allowed_values": [
"501c3",
"501c19",
"other",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_5bab9aa147dbe71e"
],
"source_precedence": [
"accountant",
"program_application",
"admin_research",
"user_profile"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "svp_nonresidential_electric_customer",
"label": "Silicon Valley Power non-residential electric customer",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_5bab9aa147dbe71e"
],
"source_precedence": [
"bill",
"utility_data",
"program_application",
"admin_research"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "installation_address_in_svp_service_territory",
"label": "Installation address in Silicon Valley Power service territory",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_5bab9aa147dbe71e"
],
"source_precedence": [
"utility_data",
"bill",
"server_derived",
"program_application"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "system_ownership_model",
"label": "PV system ownership model",
"value_type": "enum",
"allowed_values": [
"host_customer_owned",
"lease",
"ppa",
"third_party_owned",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_5bab9aa147dbe71e"
],
"source_precedence": [
"quote",
"contract",
"program_application",
"user_profile"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "last_12_months_kwh_used",
"label": "Last 12 months kWh used at installation site",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_5bab9aa147dbe71e"
],
"source_precedence": [
"bill",
"utility_data",
"program_application"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "estimated_annual_pv_production_kwh",
"label": "Estimated annual PV energy production",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_5bab9aa147dbe71e"
],
"source_precedence": [
"quote",
"installer_calculation",
"program_application"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "pv_ready_or_building_repair_costs_cents",
"label": "PV-ready infrastructure or qualifying building-repair costs included in grant request",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_5bab9aa147dbe71e"
],
"source_precedence": [
"quote",
"contract",
"program_application"
],
"missing_severity": "blocks_eligibility"
},
{
"input_key": "preapproval_status",
"label": "SVP pre-approval status before installation",
"value_type": "enum",
"allowed_values": [
"approved",
"pending",
"waitlisted",
"denied",
"not_applied",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_5bab9aa147dbe71e"
],
"source_precedence": [
"application_status",
"admin_research",
"program_application"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "program_funds_available",
"label": "Program funds availability or reservation status",
"value_type": "enum",
"allowed_values": [
"funds_reserved_for_project",
"open_funds_available_confirmed",
"waitlist",
"exhausted",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_5bab9aa147dbe71e"
],
"source_precedence": [
"application_status",
"admin_research",
"program_application"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "final_approval_status",
"label": "SVP final grant approval status after completion",
"value_type": "enum",
"allowed_values": [
"approved",
"pending",
"denied",
"not_submitted",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_5bab9aa147dbe71e"
],
"source_precedence": [
"application_status",
"admin_research",
"program_application"
],
"missing_severity": "blocks_confirmed_payment_estimate"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_5bab9aa147dbe71e",
"effect_type": "grant_expected_value",
"cash_value_classification": "cash_grant",
"value_model_kind": "no_calculable_value",
"calculation": {
"method": "custom_quote",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Do not calculate from eligible system cost alone. Published SVP materials provide maximum-only language: grant may be up to 100% of eligible system cost and capped at $100,000, with no more than 10% of grant funds for PV-ready/building-repair costs. Runtime value is allowed only when SVP application status or admin review provides an approved grant amount. If approved_grant_amount_cents is present, preapproval_status is approved, program_funds_available is funds_reserved_for_project or open_funds_available_confirmed, eligibility checks pass, and the system is host-customer-owned, then conditional_award_cents = min(approved_grant_amount_cents, eligible_system_cost_cents, 10000000). Otherwise suppress with null expected value.",
"max_award_cents": 10000000,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "first_come_funding_unknown"
},
"required_inputs": [
"approved_grant_amount_cents",
"eligible_system_cost_cents",
"nonprofit_tax_exempt_status",
"svp_nonresidential_electric_customer",
"installation_address_in_svp_service_territory",
"system_ownership_model",
"last_12_months_kwh_used",
"estimated_annual_pv_production_kwh",
"pv_ready_or_building_repair_costs_cents",
"preapproval_status",
"program_funds_available",
"final_approval_status"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"published_terms_are_up_to_maximum_only",
"no_published_deterministic_award_rate",
"approved_grant_amount_required",
"project_specific_svp_preapproval_required",
"svp_approval_at_sole_discretion",
"first_come_funding_unknown",
"funds_may_be_exhausted_or_waitlisted",
"nonprofit_501c3_or_501c19_required",
"svp_nonresidential_customer_required",
"host_customer_ownership_required",
"leases_and_ppas_ineligible",
"system_must_not_exceed_80_percent_annual_usage",
"pv_ready_costs_limited_to_10_percent_of_grant_funds",
"exclude_from_user_facing_total_by_default"
],
"calculationTrace": [
"Treat the published $100,000 and 100% values as caps, not as a default award formula.",
"Verify applicant is an SVP non-residential electric customer and IRS 501(c)(3) or 501(c)(19) nonprofit.",
"Verify installation address is in SVP service territory and the PV system is host-customer-owned; suppress for leases, PPAs, or third-party ownership.",
"Verify estimated annual PV production does not exceed 80% of last 12 months kWh usage.",
"Verify PV-ready/building-repair costs included in the grant request are no more than 10% of the approved grant amount.",
"Verify pre-approval was received before installation and program funds were available or reserved for the project.",
"If SVP provides an approved grant amount, cap runtime value at the lesser of approved grant amount, eligible system cost, and $100,000.",
"Do not include in user-facing savings totals by default until approved amount, funding reservation, eligibility, and approval status are documented."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "approved_grant_amount_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "No default. Use only an SVP-issued pre-approval or final approval grant amount; do not infer from project cost."
},
{
"inputKey": "eligible_system_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use eligible PV system cost before SVP grant from contract, quote, or final paid invoice."
},
{
"inputKey": "nonprofit_tax_exempt_status",
"valueType": "enum",
"whoProvides": "accountant",
"realisticDefaultGuidance": "Must be 501c3 or 501c19; unknown or other suppresses estimate."
},
{
"inputKey": "svp_nonresidential_electric_customer",
"valueType": "boolean",
"whoProvides": "bill",
"realisticDefaultGuidance": "Must be true and supported by an SVP electric bill/account."
},
{
"inputKey": "installation_address_in_svp_service_territory",
"valueType": "boolean",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Must be true for the listed service address."
},
{
"inputKey": "system_ownership_model",
"valueType": "enum",
"whoProvides": "quote",
"realisticDefaultGuidance": "Must be host_customer_owned; lease, PPA, third_party_owned, or unknown suppresses estimate."
},
{
"inputKey": "last_12_months_kwh_used",
"valueType": "number",
"whoProvides": "bill",
"realisticDefaultGuidance": "Use last 12 months kWh consumption at the installation site."
},
{
"inputKey": "estimated_annual_pv_production_kwh",
"valueType": "number",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use installer annual energy production calculations; must be less than or equal to 0.8 times last_12_months_kwh_used."
},
{
"inputKey": "pv_ready_or_building_repair_costs_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use 0 if none. Grant-funded PV-ready/building-repair portion must not exceed 10% of approved_grant_amount_cents."
},
{
"inputKey": "preapproval_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use approved only when SVP pre-approval was granted before installation; pending, waitlisted, denied, not_applied, or unknown suppresses estimate."
},
{
"inputKey": "program_funds_available",
"valueType": "enum",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use funds_reserved_for_project or open_funds_available_confirmed only with SVP evidence; waitlist, exhausted, or unknown suppresses estimate."
},
{
"inputKey": "final_approval_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use approved for confirmed post-completion payment estimates; pending or unknown should remain non-user-facing."
}
],
"remainingGaps": [
"No official current remaining-fund balance was found.",
"No official historical applications count, historical awards count, success rate, annual budget, or expected award count was found.",
"Official materials publish maximum-only award language but no deterministic formula guaranteeing 100% reimbursement for every eligible project.",
"Actual project award amount appears to require SVP pre-approval/final approval and may be changed by discretionary review.",
"The application/rules PDF is v.10.2023 but is linked from the current SVP rebates page last updated 2026-06-30; monitor for a refreshed form."
],
"doNotUseAsUserFacingEstimateReasons": [
"Published value is up-to/max-only; do not assume 100% of eligible system cost.",
"SVP pre-approval is required before installation and approval is at SVP's sole discretion.",
"Program is first-come, first-served until funds are exhausted, and current remaining funds are not posted.",
"A waitlist may apply after funds are reserved.",
"Eligibility depends on nonprofit status, SVP non-residential customer status, host-customer ownership, no lease/PPA, sizing limit, PV-ready cost limit, equipment/installer rules, and final documentation.",
"Use only a documented SVP-approved grant amount for any user-facing value, and keep default inclusion false."
]
}

[1]: https://www.siliconvalleypower.com/businesses/rebates "
    
    Energy Efficiency Rebates | Silicon Valley Power

"
[2]: https://www.siliconvalleypower.com/home/showpublisheddocument/82370/638409969485570000 "Employment application"

