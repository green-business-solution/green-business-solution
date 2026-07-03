{
"schemaVersion": "retrofi_grant_package_repair.v1",
"researchedAt": "2026-07-03",
"opportunityId": "SOURCE_DSIRE:dsire_program_id:22640",
"programName": "New Hampshire - National Electric Vehicle Infrastructure (NEVI) Formula Grant Program",
"status": "suppress_no_probability_evidence",
"sourceConfidence": "medium",
"estimateConfidenceIfInputsPresent": "low",
"officialSources": [
{
"title": "NHDOT Releases NEVI Round II RFP",
"url": "[https://www.dot.nh.gov/news-and-media/nhdot-releases-nevi-round-ii-rfp](https://www.dot.nh.gov/news-and-media/nhdot-releases-nevi-round-ii-rfp)",
"owner": "New Hampshire Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "NHDOT announced the Round II RFP; the NEVI program will provide more than $17 million to New Hampshire over five years; proposals are accepted until 2:00pm Friday, August 21, 2026. ([NH DOT][1])"
},
{
"title": "RFP DOT 2027-01 - National Electric Vehicle Infrastructure (NEVI) - Phase II",
"url": "[https://apps.das.nh.gov/NHProcurement/Bid/rfp-dot-202701](https://apps.das.nh.gov/NHProcurement/Bid/rfp-dot-202701)",
"owner": "State of New Hampshire Department of Administrative Services",
"accessed": "2026-07-03",
"evidenceText": "The official bid listing identifies RFP DOT 2027-01 as NEVI Phase II and lists the closing date as August 21, 2026 at 2:00 PM. ([NH Administrative Services][2])"
},
{
"title": "State of New Hampshire Request for Proposal RFP DOT 2027-01",
"url": "[https://apps.das.nh.gov/NHProcurement/File/rfp-dot-2027-01.pdf](https://apps.das.nh.gov/NHProcurement/File/rfp-dot-2027-01.pdf)",
"owner": "State of New Hampshire Department of Administrative Services / New Hampshire Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "The RFP seeks qualified proposer(s) to install EVSE and provide associated services; approximately $9.6 million is available for the solicitation; selected proposals may be reimbursed up to 80% of eligible costs; reimbursement requests must describe the reimbursed task or equipment. ([NH Administrative Services][3])"
},
{
"title": "FHWA FY2026 NEVI Apportionment Notice N 4510.909",
"url": "[https://highways.dot.gov/laws-regulations/directives/notices/n-4510909](https://highways.dot.gov/laws-regulations/directives/notices/n-4510909)",
"owner": "Federal Highway Administration",
"accessed": "2026-07-03",
"evidenceText": "FHWA states NEVI funds are available until expended, lists eligible uses, allows contracting with private entities, requires public or AFC charging infrastructure, and sets the federal share payable at 80%; New Hampshire's FY2026 apportionment is listed separately and should not be treated as a project award. ([Federal Highway Administration][4])"
},
{
"title": "FHWA National Electric Vehicle Infrastructure Formula Program Fact Sheet",
"url": "[https://highways.dot.gov/iija/fact-sheets/national-electric-vehicle-infrastructure-formula-program](https://highways.dot.gov/iija/fact-sheets/national-electric-vehicle-infrastructure-formula-program)",
"owner": "Federal Highway Administration",
"accessed": "2026-07-03",
"evidenceText": "FHWA describes NEVI as formula funding to states, subject to approved state plans, with an 80% federal share and eligible EV charging uses; private entities may be involved and may pay the non-federal share. ([Federal Highway Administration][5])"
},
{
"title": "23 CFR Part 680 - National Electric Vehicle Infrastructure Standards and Requirements",
"url": "[https://www.ecfr.gov/current/title-23/chapter-I/subchapter-G/part-680](https://www.ecfr.gov/current/title-23/chapter-I/subchapter-G/part-680)",
"owner": "Federal Highway Administration / eCFR",
"accessed": "2026-07-03",
"evidenceText": "Part 680 applies to NEVI projects and sets minimum standards including four network-connected DCFC ports, CCS, 150 kW simultaneous power for corridor DCFCs, 5-year compliance/stewardship, data reporting, and greater than 97% average annual uptime. ([eCFR][6])"
},
{
"title": "NHDOT Phase I NEVI Award Announcement",
"url": "[https://www.dot.nh.gov/news-and-media/28m-awarded-bids-further-extend-nhs-electric-vehicle-charging-infrastructure](https://www.dot.nh.gov/news-and-media/28m-awarded-bids-further-extend-nhs-electric-vehicle-charging-infrastructure)",
"owner": "New Hampshire Department of Transportation",
"accessed": "2026-07-03",
"evidenceText": "NHDOT reported $2.8 million in Phase I conditional federal awards; a separate official state agenda snippet reports six responses to the Phase I RFP. This is partial historical context only and does not provide a Round II success rate. ([NH DOT][7])"
}
],
"sourceSummary": "The uploaded package context is cited for traceability:  Official sources support an active deadline-driven NHDOT NEVI Phase II competitive RFP, a conditional reimbursement model capped at 80% of approved eligible costs, and approximately $9.6 million available at the solicitation level. They do not support a defensible project-level expected value because Round II selection is competitive and no Round II application count, expected award count, or official success-rate probability anchor was found.",
"packagePatch": {
"calculation_status": "calculable_with_missing_inputs",
"availability": {
"status": "active",
"fundingStatus": "open_funds_available"
},
"input_requirements_to_add_or_update": [
{
"input_key": "approved_eligible_project_cost_cents",
"label": "NHDOT-approved eligible project cost",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_08058b4cd05b18d9"
],
"source_precedence": [
"admin_award_document",
"reimbursement_approval",
"quote"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "nhdot_round_ii_award_status",
"label": "NHDOT Round II award status",
"value_type": "enum",
"allowed_values": [
"not_applied",
"submitted_pending",
"selected",
"contract_executed",
"reimbursement_approved",
"rejected"
],
"required_for": [
"effect_grant_expected_value_1_08058b4cd05b18d9"
],
"source_precedence": [
"application_status",
"admin_award_document",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "nhdot_approved_award_cents",
"label": "NHDOT-approved project award or reimbursement cap",
"value_type": "money_cents",
"required_for": [
"effect_grant_expected_value_1_08058b4cd05b18d9"
],
"source_precedence": [
"admin_award_document",
"executed_contract",
"reimbursement_approval"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "non_federal_match_confirmed",
"label": "At least 20% non-federal match confirmed",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_08058b4cd05b18d9"
],
"source_precedence": [
"admin_award_document",
"quote",
"user_profile"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "nevi_site_equipment_compliance_confirmed",
"label": "NEVI site, equipment, operating, and data compliance confirmed",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_08058b4cd05b18d9"
],
"source_precedence": [
"admin_award_document",
"quote",
"retrofit_assumptions"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "reimbursement_request_approved",
"label": "NHDOT reimbursement request approved",
"value_type": "boolean",
"required_for": [
"effect_grant_expected_value_1_08058b4cd05b18d9"
],
"source_precedence": [
"reimbursement_approval",
"application_status",
"admin_award_document"
],
"missing_severity": "blocks_calculation"
},
{
"input_key": "application_deadline",
"label": "RFP response deadline",
"value_type": "date",
"required_for": [
"availability_check"
],
"source_precedence": [
"server_derived",
"admin_research"
],
"missing_severity": "blocks_availability_check"
}
],
"effects_to_add_or_update": [
{
"effect_id": "effect_grant_expected_value_1_08058b4cd05b18d9",
"effect_type": "grant_expected_value",
"cash_value_classification": "reimbursement",
"value_model_kind": "competitive_cost_share",
"calculation": {
"method": "expected_value",
"amount_cents": null,
"percent": 0.8,
"conditional_award_cents": null,
"conditional_award_formula": "If and only if the project is selected or awarded under NHDOT RFP DOT 2027-01 and an agreement, award, or reimbursement approval exists, conditional reimbursement equals the lesser of: 0.80 multiplied by NHDOT-approved eligible project costs; the NHDOT-approved project award or reimbursement cap; and any applicable remaining available NEVI funds. The proposer must supply at least 20% non-federal match. Do not use gross project cost, solicitation-level funding, or an unapproved proposal amount as the award.",
"max_award_cents": null,
"min_award_cents": null,
"rate_rows": [],
"probability_discount": null,
"probability_evidence_type": "none"
},
"required_inputs": [
"approved_eligible_project_cost_cents",
"nhdot_round_ii_award_status",
"nhdot_approved_award_cents",
"non_federal_match_confirmed",
"nevi_site_equipment_compliance_confirmed",
"reimbursement_request_approved"
],
"missing_input_behavior": "suppress_until_review",
"includedInUserFacingTotalDefault": false,
"humanReviewRequired": true,
"reasonCodes": [
"competitive_rfp",
"cost_share_cap_only",
"missing_probability_anchor",
"needs_project_cost",
"requires_nhdot_selection",
"requires_executed_award_or_reimbursement_approval",
"solicitation_budget_not_project_award",
"do_not_include_expected_value_default"
],
"calculationTrace": [
"Confirm the project is eligible under NHDOT RFP DOT 2027-01 and NEVI requirements.",
"Confirm NHDOT selected or awarded the project and that an award, executed agreement, or reimbursement approval exists.",
"Use only NHDOT-approved eligible project costs as the cost basis.",
"Compute 80% of approved eligible cost.",
"Cap the result by the NHDOT-approved project award or reimbursement amount and any applicable remaining available funds.",
"If selection, award, reimbursement approval, or probability evidence is absent, suppress the user-facing expected value with reason code missing_probability_anchor."
]
}
]
},
"testCaseInputHints": [
{
"inputKey": "approved_eligible_project_cost_cents",
"valueType": "money_cents",
"whoProvides": "quote",
"realisticDefaultGuidance": "Use administrator-approved eligible costs, not total quoted cost unless all quoted costs are verified eligible."
},
{
"inputKey": "nhdot_round_ii_award_status",
"valueType": "enum",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Default to not_applied or submitted_pending unless a project-specific NHDOT selection, executed contract, or reimbursement approval is documented."
},
{
"inputKey": "nhdot_approved_award_cents",
"valueType": "money_cents",
"whoProvides": "admin_research",
"realisticDefaultGuidance": "Use the executed project award, contract amount, or reimbursement approval. Do not infer this value from the approximately $9.6 million solicitation budget."
},
{
"inputKey": "non_federal_match_confirmed",
"valueType": "boolean",
"whoProvides": "quote",
"realisticDefaultGuidance": "Set true only when at least 20% non-federal share is documented."
},
{
"inputKey": "nevi_site_equipment_compliance_confirmed",
"valueType": "boolean",
"whoProvides": "quote",
"realisticDefaultGuidance": "Set true only when the proposed site, chargers, ports, networking, operations, uptime, reporting, and other NEVI/RFP requirements are documented."
},
{
"inputKey": "reimbursement_request_approved",
"valueType": "boolean",
"whoProvides": "application_status",
"realisticDefaultGuidance": "Set true only after NHDOT has approved the reimbursement request; pending or planned reimbursement should not be treated as cash."
},
{
"inputKey": "application_deadline",
"valueType": "date",
"whoProvides": "server_derived",
"realisticDefaultGuidance": "Use 2026-08-21 for the current Round II RFP response deadline."
}
],
"remainingGaps": [
"No official Round II application or proposal count was found before the due date.",
"No official expected Round II award count or project-level maximum award was found in the accessible primary-source evidence; approximately $9.6 million is solicitation-level funding, not a per-project award.",
"Phase I partial history, including conditional awards and a reported response count, does not establish a defensible Round II success rate or probability discount.",
"Actual reimbursement depends on NHDOT selection, executed agreement or award, reimbursement approval, eligible-cost review, non-federal match, and federal NEVI compliance."
],
"doNotUseAsUserFacingEstimateReasons": [
"Competitive RFP with project-specific selection.",
"Official sources support only an up-to-80% reimbursement cap, not a fixed award.",
"No Round II probability discount, application count, expected award count, or defensible success-rate evidence was found.",
"The package needs administrator-approved eligible costs and a project-specific approved award or reimbursement amount.",
"Solicitation-level funding cannot be treated as a project-level grant estimate."
]
}

[1]: https://www.dot.nh.gov/news-and-media/nhdot-releases-nevi-round-ii-rfp?utm_source=chatgpt.com "NHDOT Releases NEVI Round II RFP - NH.gov"
[2]: https://apps.das.nh.gov/NHProcurement/Bid/rfp-dot-202701?utm_source=chatgpt.com "RFP DOT 2027-01 - Bids"
[3]: https://apps.das.nh.gov/NHProcurement/File/rfp-dot-2027-01.pdf?utm_source=chatgpt.com "State of New Hampshire Request for Proposal Issued June ..."
[4]: https://highways.dot.gov/laws-regulations/directives/notices/n-4510909 "N 4510.909 | FHWA"
[5]: https://highways.dot.gov/iija/fact-sheets/national-electric-vehicle-infrastructure-formula-program "National Electric Vehicle Infrastructure Formula Program | FHWA"
[6]: https://www.ecfr.gov/current/title-23/chapter-I/subchapter-G/part-680 "
    eCFR :: 23 CFR Part 680 -- National Electric Vehicle Infrastructure Standards and Requirements
  "
[7]: https://www.dot.nh.gov/news-and-media/28m-awarded-bids-further-extend-nhs-electric-vehicle-charging-infrastructure?utm_source=chatgpt.com "$2.8M Awarded in Bids to Further Extend NH's Electric Vehicle ..."

