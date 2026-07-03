{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22206",
"programName": "VW Funding for Diesel Replacement and EVSE Projects",
"status": "no_calculable_value",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "VW Funding For Diesel Replacement And EVSE Projects",
"url": "[https://dec.ny.gov/environmental-protection/air-quality/controlling-motor-vehicle-pollution/vw-settlement-information/vw-funding-for-diesel-replacement-and-evse-projects](https://dec.ny.gov/environmental-protection/air-quality/controlling-motor-vehicle-pollution/vw-settlement-information/vw-funding-for-diesel-replacement-and-evse-projects)",
"owner": "New York State Department of Environmental Conservation",
"accessed": "2026-07-03",
"evidenceText": "The DEC page is the aggregate VW funding list. It says VW settlement funding is available for diesel vehicle and equipment replacement projects and EVSE, and that the list includes sponsor-specific funding amounts, application links, and documentation archives. It also shows mixed statuses across open, closed, completed, awarded, and underway opportunities. ([Department of Environmental Conservation][1])"
},
{
"title": "New York Truck Voucher Incentive Program",
"url": "[https://www.nyserda.ny.gov/All-Programs/Programs/Truck-Voucher-Program](https://www.nyserda.ny.gov/All-Programs/Programs/Truck-Voucher-Program)",
"owner": "New York State Energy Research and Development Authority",
"accessed": "2026-07-03",
"evidenceText": "NYSERDA says it is no longer accepting new Class 3-8 Zero Emission Vehicle applications, Class 8 applications submitted in a specified period were placed on a waitlist, Class 3-7 funding was completely subscribed, and Non-Road Equipment funding is still available. NYSERDA also says voucher levels vary by funding track, vehicle or equipment type, vehicle weight class, domicile, fleet size, dismantling, funding availability, and per-project caps. ([NYSERDA][2])"
},
{
"title": "NYC Clean Trucks Program - Available Funding",
"url": "[https://www.nycctp.com/available-funding/](https://www.nycctp.com/available-funding/)",
"owner": "New York City Department of Transportation / NYC Clean Trucks Program Administrator",
"accessed": "2026-07-03",
"evidenceText": "The NYC Clean Trucks Program page states incentives for Class 4-8 trucks were updated as of April 2026. It provides technology-specific class matrices and formulas, including BEV incentives based on the lesser of 0.75 of dealer invoice or the base matrix amount, with class caps and bonus rules; non-electric replacement truck incentives use separate CNG, hybrid, plug-in hybrid, and diesel matrices. ([NYC Clean Trucks Program][3])"
},
{
"title": "NYC Clean Trucks Program - Application and Eligibility Requirements",
"url": "[https://www.nycctp.com/application/](https://www.nycctp.com/application/)",
"owner": "New York City Department of Transportation / NYC Clean Trucks Program Administrator",
"accessed": "2026-07-03",
"evidenceText": "The NYC Clean Trucks Program accepts applications on a first-come, first-served basis, requires a document package and a vendor quote dated within 60 days, and requires an older diesel truck to scrap for many replacement pathways. The eligibility tool is informational and not a binding eligibility determination; final approval comes from the program administrator. ([NYC Clean Trucks Program][4])"
}
],
"sourceSummary": "The uploaded package correctly identifies this as an aggregate DSIRE opportunity with no single statewide formula.  Current official sources confirm that the DEC page is a sponsor/subprogram index, not a reusable award formula: it combines NYCDOT, NYPA, NYSERDA, PANYNJ, and other project sponsors with different open, closed, completed, awarded, and underway statuses. ([Department of Environmental Conservation][1]) Some child programs have calculable formulas when separately modeled, such as NYSERDA non-road equipment and NYC Clean Trucks, but they require the selected subprogram, current funding status, eligibility verification, quote or invoice inputs, and administrator review. ([NYSERDA][2]) Therefore the aggregate opportunity should be suppressed from user-facing savings totals and should route to child subprogram packages or approved-award inputs only.",
"packagePatch": {
"calculation_status": "no_calculable_value",
"availability": {
"status": "active",
"fundingStatus": "open_while_funds_last"
},
"input_requirements_to_add_or_update": [
{
"input_key": "selected_vw_subprogram",
"label": "Specific active VW-funded sponsor or subprogram",
"value_type": "enum",
"required_for": [
"effect_grant_expected_value_1_6f710c93f5265829"
],
"source_precedence": [
"admin_research",
"quote",
"user_profile"
],
"missing_severity": "blocks_calculation",
"notes": "This aggregate record cannot calculate without routing to a separately researched active child subprogram."
},
{
"input_key": "subprogram_official_formula_source_url",
"label": "Official source URL for selected subprogram formula",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_6f710c93f5265829"
],
"source_precedence": [
"admin_research"
],
"missing_severity": "blocks_calculation",
"notes": "Do not reuse formulas across sponsors; the selected sponsor page, manual, application guide, or award document must control."
},
{
"input_key": "subprogram_funding_status_verified_at",
"label": "Date current funding status was verified",
"value_type": "date",
"required_for": [
"effect_grant_expected_value_1_6f710c93f5265829"
],
"source_precedence": [
"admin_research",
"application_status"
],
"missing_severity": "blocks_user_facing_total",
"notes": "Open opportunities are subject to funding availability, waitlists, or sponsor-specific closing."
},
{
"input_key": "applicant_eligibility_verified",
"label": "Applicant eligibility verified by selected subprogram rules",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_6f710c93f5265829"
],
"source_precedence": [
"application_status",
"admin_research",
"quote",
"user_profile"
],
"missing_severity": "blocks_user_facing_total",
"notes": "Eligibility depends on sponsor, geography, fleet type, vehicle or equipment class, scrappage, domicile, operation, and program-specific rules."
},
{
"input_key": "eligible_quote_or_invoice_cents",
"label": "Eligible quote, invoice, purchase order, or base equipment cost",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_6f710c93f5265829"
],
"source_precedence": [
"quote",
"application_status"
],
"missing_severity": "blocks_calculation",
"notes": "Only usable after selected subprogram formula identifies the correct cost basis."
},
{
"input_key": "approved_award_cents",
"label": "Approved award amount from award letter or administrator decision",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_6f710c93f5265829"
],
"source_precedence": [
"application_status",
"quote"
],
"missing_severity": "blocks_user_facing_total",
"notes": "If an award letter exists, model the amount in the child subprogram or approved-award record, not from this aggregate page."
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_6f710c93f5265829",
"effect_type": "grant_expected_value",
"cash_value_classification": "unknown",
"value_model_kind": "no_calculable_value",
"calculation": {
"method": "zero_when_not_applicable",
"amount_cents": null,
"percent": null,
"conditional_award_cents": null,
"conditional_award_formula": "Suppress this aggregate opportunity. Do not calculate a conditional award from the DEC index page. A defensible value requires a separately selected active child subprogram with its own official formula, current funding check, eligibility verification, quote or invoice inputs, and either a formula-based first-come voucher/rebate workflow or an approved award amount.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "none"
},
"required_inputs": [
"selected_vw_subprogram",
"subprogram_official_formula_source_url",
"subprogram_funding_status_verified_at",
"applicant_eligibility_verified",
"eligible_quote_or_invoice_cents",
"approved_award_cents"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"aggregate_program_page",
"subprogram_required",
"no_single_formula",
"mixed_open_closed_completed_and_awarded_statuses",
"sponsor_specific_rules",
"funding_status_varies_by_subprogram",
"administrator_or_application_review_required",
"no_aggregate_probability_evidence",
"do_not_include_in_user_facing_total_default"
],
"calculationTrace": [
"The DEC page is an aggregate funding-opportunity list that points to multiple Project Sponsors and status categories, not a statewide formula table. ([Department of Environmental Conservation][1])",
"Active child programs use materially different formulas and constraints; NYSERDA and NYC Clean Trucks show different rate bases, caps, funding status, and application rules. ([NYSERDA][2])",
"The aggregate page does not provide historical applications, a success-rate denominator, expected award count, or a live funds-remaining value that would support an expected-value probability discount.",
"Runtime behavior should be suppress-and-route: select a child subprogram package or use an approved award amount, otherwise return no calculable value."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "selected_vw_subprogram",
"valueType": "enum",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "No default. Examples must be explicit child programs, such as NYCDOT NYC Clean Trucks, NYSERDA NYTVIP Non-Road Equipment, NYPA Transit Bus Charging Infrastructure, or another active sponsor listed by DEC."
},
{
"inputKey": "subprogram_official_formula_source_url",
"valueType": "text",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use the active sponsor page, manual, application guide, solicitation, rate table, or award document. Do not use the DEC aggregate page as the formula source."
},
{
"inputKey": "subprogram_funding_status_verified_at",
"valueType": "date",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use the date the sponsor page or administrator confirmed open funding, waitlist, exhaustion, or closure."
},
{
"inputKey": "applicant_eligibility_verified",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "False or null until the selected sponsor rules are checked against applicant, fleet, location, equipment, scrappage, and operating requirements."
},
{
"inputKey": "eligible_quote_or_invoice_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use only after the selected child formula defines whether the basis is dealer invoice, purchase order, base equipment cost, eligible project cost, or approved reimbursable cost."
},
{
"inputKey": "approved_award_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use only from an award letter, voucher approval, rebate reservation, grant agreement, or administrator decision. Without this or a child formula, suppress."
},
{
"inputKey": "award_or_voucher_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Expected values include not_started, submitted, waitlisted, reserved, approved, denied, closed, canceled, or paid. User-facing totals should require reserved, approved, or paid unless a child first-come formula is separately modeled."
}
],
"remainingGaps": [
"No single statewide conditional award formula exists for the aggregate opportunity.",
"Current funds remaining are not provided at the aggregate level and must be checked for the selected sponsor immediately before calculation.",
"The NYPA Transit Bus Charging Infrastructure Round 2 item is listed as open by DEC, but no reusable public rate formula was identified from the aggregate DEC page.",
"Child packages should be created or repaired separately for active sponsor programs with official formulas, including NYSERDA NYTVIP Non-Road Equipment and NYC Clean Trucks, with their own eligibility gates and funding-status checks.",
"No aggregate award probability is defensible because applications, approvals, expected award counts, and live fund balance are not available across the mixed sponsor list."
],
"doNotUseAsUserFacingEstimateReasons": [
"Aggregate DEC page only; no single reusable award formula.",
"Open, closed, completed, awarded, and underway opportunities are mixed in one record.",
"Sponsor and subprogram selection is mandatory.",
"Funding availability and waitlist status vary by sponsor.",
"Application or administrator review may be required before an award is reserved or approved.",
"No aggregate probability evidence supports expected-value inclusion.",
"Approved award amounts must be modeled from child program records or award documents, not this aggregate package."
]
}

[1]: https://dec.ny.gov/environmental-protection/air-quality/controlling-motor-vehicle-pollution/vw-settlement-information/vw-funding-for-diesel-replacement-and-evse-projects "VW Funding For Diesel Replacement And EVSE Projects - NYSDEC"
[2]: https://www.nyserda.ny.gov/All-Programs/Programs/Truck-Voucher-Program?utm_campaign=truck-vip-ny-gov&utm_medium=subdomain&utm_source=ITS "New York Truck Voucher Incentive Program (NYTVIP) | NYSERDA"
[3]: https://www.nycctp.com/available-funding/ "Available Funding - NYC Clean Trucks Program"
[4]: https://www.nycctp.com/application/ "Application - NYC Clean Trucks Program"

