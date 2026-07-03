{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22660",
"programName": "South Dakota - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "high",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "South Dakota EV Fast Charging Plan",
"url": "[https://dot.sd.gov/projects-studies/planning/south-dakota-ev-fast-charging-plan/](https://dot.sd.gov/projects-studies/planning/south-dakota-ev-fast-charging-plan/)",
"owner": "South Dakota Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "SDDOT describes the state EV fast charging plan as the framework required to obtain NEVI funding, lists $29,000,000 through FY2026, says IIJA funds could cover approximately 80% of construction costs with 20% private investment, and identifies the initial Interstate corridor focus and NEVI spacing requirements. ([SD DOT][1])"
},
{
"title": "South Dakota EV Infrastructure Deployment Plan 2025 Update",
"url": "[https://dot.sd.gov/media/kxbe0f2h/final-sddot-nevi-plan_letterhead-090425_fhwa-approved.pdf](https://dot.sd.gov/media/kxbe0f2h/final-sddot-nevi-plan_letterhead-090425_fhwa-approved.pdf)",
"owner": "South Dakota Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "SDDOT's September 4, 2025 update states that the 2024 State NEVI plan remains the basis for South Dakota's program guide and that the update covers unobligated FY2022-FY2026 NEVI funding under FHWA's August 11, 2025 guidance. "
},
{
"title": "South Dakota FY2025 State NEVI Plan",
"url": "[https://dot.sd.gov/media/37806a2b/Final%20SD%20FY25%20State%20NEVI%20Plan.pdf](https://dot.sd.gov/media/37806a2b/Final%20SD%20FY25%20State%20NEVI%20Plan.pdf)",
"owner": "South Dakota Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "The FY2025 SDDOT plan states that procurement documents were still being developed, no NOFO or award timeline had been established, no contracts had been awarded, and proposals would use best-value scoring rather than automatic eligibility-based awards. ([SD DOT][2])"
},
{
"title": "South Dakota Electric Vehicle Infrastructure Deployment Plan",
"url": "[https://dot.sd.gov/media/956f1a8d/SDDOTEVPlan_final.pdf](https://dot.sd.gov/media/956f1a8d/SDDOTEVPlan_final.pdf)",
"owner": "South Dakota Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "The initial SDDOT plan describes a competitive grant application process, a 20% applicant/private match corresponding to 80% Federal NEVI participation, potential variation in match by location, applicant screening, and weighted scoring criteria. "
},
{
"title": "NEVI Formula Program Fact Sheet",
"url": "[https://www.fhwa.dot.gov/bipartisan-infrastructure-law/nevi_formula_program.cfm](https://www.fhwa.dot.gov/bipartisan-infrastructure-law/nevi_formula_program.cfm)",
"owner": "Federal Highway Administration",
"accessed": "2026-07-03",
"evidenceText": "FHWA states that NEVI funds are not available to a state for obligation until the state's plan is submitted and approved, that the Federal share is 80%, and that eligible projects must be directly related to vehicle charging and publicly accessible or available to commercial motor vehicle operators from more than one company. ([Federal Highway Administration][3])"
},
{
"title": "23 U.S.C. 151 - National electric vehicle infrastructure program",
"url": "[https://uscode.house.gov/view.xhtml?req=granuleid](https://uscode.house.gov/view.xhtml?req=granuleid):USC-prelim-title23-section151&num=0&edition=prelim",
"owner": "Office of the Law Revision Counsel",
"accessed": "2026-07-03",
"evidenceText": "The federal statute authorizes acquisition and installation work directly related to EV charging and states that the Federal share may not exceed 80% of total project cost, with the private entity responsible for the non-Federal share. ([U.S. Code][4])"
},
{
"title": "23 CFR Part 680 - National Electric Vehicle Infrastructure Standards and Requirements",
"url": "[https://www.ecfr.gov/current/title-23/chapter-I/subchapter-G/part-680](https://www.ecfr.gov/current/title-23/chapter-I/subchapter-G/part-680)",
"owner": "Electronic Code of Federal Regulations",
"accessed": "2026-07-03",
"evidenceText": "Federal NEVI standards require, among other items, at least four network-connected DCFC ports along Alternative Fuel Corridors, at least 150 kW per DCFC port, public availability, payment access, and five years of operation and maintenance compliance. ([eCFR][5])"
},
{
"title": "South Dakota 2026-2029 Statewide Transportation Improvement Program Book",
"url": "[https://dot.sd.gov/media/yblnbbrr/2026-stip-book.pdf](https://dot.sd.gov/media/yblnbbrr/2026-stip-book.pdf)",
"owner": "South Dakota Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "The 2026 STIP includes a 2026 EV NEVI Program entry for various statewide locations with $6,332,000 in Federal funds and $7,914,000 total cost, but this is programming evidence rather than proof of an open applicant solicitation or available first-come funds. "
},
{
"title": "National Electric Vehicle Infrastructure Formula Program",
"url": "[https://afdc.energy.gov/laws/12744](https://afdc.energy.gov/laws/12744)",
"owner": "U.S. Department of Energy Alternative Fuels Data Center",
"accessed": "2026-07-03",
"evidenceText": "AFDC summarizes the NEVI program as funding up to 80% of eligible project costs, including acquisition, installation, network connection, operation and maintenance, and data sharing, subject to public-access and corridor requirements. ([Alternative Fuels Data Center][6])"
}
],
"sourceSummary": "Official SDDOT, FHWA, federal statute, eCFR, and DOE/AFDC sources support only a conservative competitive cost-share model for South Dakota NEVI corridor DC fast charging projects. The defensible conditional formula is capped at an 80% Federal share of approved eligible project costs, but SDDOT materials describe competitive selection, location-specific review, draft or solicitation-dependent procurement terms, and no official success-rate or current application-count evidence. The uploaded package context was used only as the repair target. ",
"packagePatch": {
"calculation_status": "custom_quote_estimate",
"availability": {
"status": "unknown",
"fundingStatus": "unknown"
},
"input_requirements_to_add_or_update": [
{
"input_key": "eligible_project_cost_cents",
"label": "Approved eligible project cost, in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_a6d30fcaf50fc997"
],
"source_precedence": [
"application_status",
"quote",
"admin_research"
],
"missing_severity": "blocks_conditional_award_calculation"
},
{
"input_key": "approved_award_cents",
"label": "Approved award amount from executed SDDOT agreement, in cents",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_a6d30fcaf50fc997"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_conditional_award_calculation_when_award_amount_is_stated"
},
{
"input_key": "approved_cost_share_percent",
"label": "Approved project-specific cost share percent",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_a6d30fcaf50fc997"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_conditional_award_calculation"
},
{
"input_key": "selection_status",
"label": "Project selection or award status",
"value_type": "enum",
"allowed_values": [
"not_applied",
"application_started",
"submitted",
"selected",
"awarded_executed_agreement",
"rejected",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_a6d30fcaf50fc997"
],
"source_precedence": [
"application_status",
"admin_research",
"user"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "executed_agreement",
"label": "Whether an executed SDDOT/FHWA-compliant award agreement exists",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_a6d30fcaf50fc997"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "site_corridor_eligibility",
"label": "Site corridor eligibility and NEVI spacing/location compliance",
"value_type": "enum",
"allowed_values": [
"eligible_confirmed",
"eligible_unconfirmed",
"ineligible",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_a6d30fcaf50fc997"
],
"source_precedence": [
"admin_research",
"application_status",
"user",
"quote"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "charger_configuration",
"label": "Charger configuration and NEVI technical compliance",
"value_type": "array",
"required_for": [
"effect_grant_expected_value_1_a6d30fcaf50fc997"
],
"source_precedence": [
"quote",
"application_status",
"admin_research"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "solicitation_terms",
"label": "Current SDDOT NOFO/RFP/application guide terms",
"value_type": "text",
"required_for": [
"effect_grant_expected_value_1_a6d30fcaf50fc997"
],
"source_precedence": [
"admin_research",
"application_status"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "nepa_clearance_status",
"label": "NEPA/environmental clearance status where required before final design or construction",
"value_type": "enum",
"allowed_values": [
"not_started",
"in_progress",
"cleared",
"not_required_confirmed",
"unknown"
],
"required_for": [
"effect_grant_expected_value_1_a6d30fcaf50fc997"
],
"source_precedence": [
"application_status",
"admin_research"
],
"missing_severity": "blocks_project_readiness_confirmation"
},
{
"input_key": "award_probability",
"label": "Human-reviewed or official probability of award",
"value_type": "number",
"required_for": [
"effect_grant_expected_value_1_a6d30fcaf50fc997"
],
"source_precedence": [
"admin_research",
"application_status"
],
"missing_severity": "suppresses_expected_value"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_a6d30fcaf50fc997",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": 0.8,
"conditional_award_cents": null,
"conditional_award_formula": "Suppress by default. If and only if the project is selected, an executed SDDOT/FHWA-compliant agreement exists, eligible_project_cost_cents is documented, and approved_cost_share_percent or approved_award_cents is stated in official award documents: conditional_award_cents = approved_award_cents when stated; otherwise conditional_award_cents = eligible_project_cost_cents * approved_cost_share_percent. approved_cost_share_percent must come from final solicitation or executed agreement and must not exceed 0.8. Do not assume 0.8 where SDDOT varies match or cost share by location.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "scoring_criteria_only"
},
"required_inputs": [
{
"input_key": "eligible_project_cost_cents",
"value_type": "money_cents",
"required_for": "conditional_award_formula",
"missing_severity": "blocks_conditional_award_calculation"
},
{
"input_key": "approved_award_cents",
"value_type": "money_cents",
"required_for": "conditional_award_formula_when_stated_in_award_documents",
"missing_severity": "blocks_if_no_approved_cost_share_percent"
},
{
"input_key": "approved_cost_share_percent",
"value_type": "number",
"required_for": "conditional_award_formula_when_award_amount_not_stated",
"missing_severity": "blocks_if_no_approved_award_cents"
},
{
"input_key": "selection_status",
"value_type": "enum",
"required_for": "all_calculations",
"missing_severity": "blocks_calculation"
},
{
"input_key": "executed_agreement",
"value_type": "boolean",
"required_for": "user_facing_estimate",
"missing_severity": "blocks_user_facing_estimate"
},
{
"input_key": "site_corridor_eligibility",
"value_type": "enum",
"required_for": "eligibility_confirmation",
"missing_severity": "blocks_calculation"
},
{
"input_key": "charger_configuration",
"value_type": "array",
"required_for": "eligibility_confirmation",
"missing_severity": "blocks_calculation"
},
{
"input_key": "solicitation_terms",
"value_type": "text",
"required_for": "formula_and_cost_basis_confirmation",
"missing_severity": "blocks_calculation"
},
{
"input_key": "nepa_clearance_status",
"value_type": "enum",
"required_for": "project_readiness_confirmation",
"missing_severity": "blocks_project_readiness_confirmation"
},
{
"input_key": "award_probability",
"value_type": "number",
"required_for": "expected_value",
"missing_severity": "suppresses_expected_value"
}
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"competitive_grant_context",
"cost_share_cap_only",
"project_selection_required",
"executed_agreement_required",
"no_current_solicitation_verified",
"funding_status_unknown",
"missing_probability_anchor",
"no_official_success_rate",
"award_amount_project_specific",
"approved_cost_share_may_vary_by_location",
"not_first_come_rebate"
],
"calculationTrace": [
"Confirm a current SDDOT NEVI NOFO/RFP/application guide and verify that the applicant, corridor, exit, site, and charger configuration are eligible.",
"Do not calculate expected value unless an official award probability, historical success rate, or human-reviewed probability is supplied.",
"For a selected project with an executed agreement, use approved_award_cents if the agreement states a dollar award.",
"If the agreement states only eligible cost and approved cost share, multiply eligible_project_cost_cents by approved_cost_share_percent, capped at 0.8.",
"Treat the 80% Federal share as a ceiling, not a guaranteed award.",
"Exclude the value from user-facing savings totals by default."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "eligible_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use only the portion of project cost approved as NEVI-eligible in the final SDDOT solicitation or executed award agreement; do not use total installed cost unless the agreement confirms all costs are eligible."
},
{
"inputKey": "approved_award_cents",
"valueType": "money_cents",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Leave null unless an executed award agreement or official award notice states a specific award amount."
},
{
"inputKey": "approved_cost_share_percent",
"valueType": "number",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use the project-specific approved cost share from official documents. It may not exceed 0.8 and should not default to 0.8 without award documentation."
},
{
"inputKey": "award_probability",
"valueType": "number",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Leave null unless official application and award counts, a defensible historical success rate, or human-reviewed underwriting evidence exists."
},
{
"inputKey": "selection_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use awarded_executed_agreement only when a signed agreement exists; selected without agreement should still suppress user-facing totals."
},
{
"inputKey": "executed_agreement",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default false unless the project has a signed SDDOT/FHWA-compliant award or reimbursement agreement."
},
{
"inputKey": "site_corridor_eligibility",
"valueType": "enum",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Confirm corridor, spacing, and one-travel-mile requirements using current SDDOT solicitation maps or official program documents."
},
{
"inputKey": "charger_configuration",
"valueType": "array",
"whoProvides": "quote",
"realisticDefaultGuidance": "Include number of DCFC ports, per-port kW, connector type, network/payment features, uptime/O&M plan, public availability, and ADA/security details."
},
{
"inputKey": "solicitation_terms",
"valueType": "text",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use the current SDDOT NOFO/RFP/application guide or executed agreement; do not rely only on older planning documents for final award rules."
},
{
"inputKey": "nepa_clearance_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Use cleared or not_required_confirmed only with project-specific administrative documentation."
},
{
"inputKey": "current_funding_status",
"valueType": "enum",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use open_funds_available only when SDDOT has an active solicitation or administrator confirmation of available applicant funding; STIP programming alone is not enough."
}
],
"remainingGaps": [
"No current official SDDOT NEVI NOFO/RFP/application guide with final applicant deadlines, per-project caps, eligible-cost definitions, or award calculation rules was verified.",
"No official South Dakota application count, award count, success rate, or probability benchmark was found.",
"The official SDDOT FY2025 plan stated that no contracts had been awarded at that time; no later official award list was verified during this repair.",
"The 2026 STIP programs NEVI dollars, but it does not prove that applicant funds are currently open or available on a first-come basis.",
"The 80% Federal share is a statutory/program ceiling and planning assumption, not a guaranteed project award.",
"SDDOT planning materials indicate match or cost share may vary by location, so runtime must use the approved project-specific cost share from final documents."
],
"doNotUseAsUserFacingEstimateReasons": [
"Competitive award context with no official probability evidence.",
"Only an up-to-80% Federal cost-share ceiling is supported before project-specific approval.",
"Current open solicitation and open-funds status were not verified from official sources.",
"Project selection, executed agreement, eligible-cost approval, and reimbursement terms are required before a defensible cash value exists.",
"The program is not a deterministic rebate and should not be included in default savings totals."
]
}

[1]: https://dot.sd.gov/projects-studies/planning/south-dakota-ev-fast-charging-plan/?utm_source=chatgpt.com "
    South Dakota EV Fast Charging Plan"
[2]: https://dot.sd.gov/media/37806a2b/Final%20SD%20FY25%20State%20NEVI%20Plan.pdf "Microsoft Word - SD_DOT_EV_Implementation_Plan_SDDOT_12_18_24_Clean (1).docx"
[3]: https://highways.dot.gov/iija/fact-sheets/national-electric-vehicle-infrastructure-formula-program "National Electric Vehicle Infrastructure Formula Program | FHWA"
[4]: https://uscode.house.gov/view.xhtml?edition=prelim&num=0&req=granuleid%3AUSC-prelim-title23-section151 "23 USC 151: National electric vehicle charging and hydrogen, propane, and natural gas fueling corridors"
[5]: https://www.ecfr.gov/current/title-23/chapter-I/subchapter-G/part-680 "
    eCFR :: 23 CFR Part 680 -- National Electric Vehicle Infrastructure Standards and Requirements
  "
[6]: https://afdc.energy.gov/laws/12744 "Alternative Fuels Data Center: National Electric Vehicle Infrastructure (NEVI) Formula Program"

