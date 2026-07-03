{
"schemaVersion": "retrofi_tax_gap_repair.v1",
"researchedAt": "2026-07-03",
"gapId": "mi_detroit_wayne_rerz_project_specific",
"status": "no_project_specific_source_found",
"confidence": "high",
"officialSources": [
{
"title": "CY2023 Michigan Renaissance Zone Annual Report",
"url": "[https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/cy2023-renaissance-zone-annual-report.pdf](https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/cy2023-renaissance-zone-annual-report.pdf)",
"owner": "Michigan Strategic Fund / Michigan Economic Development Corporation",
"accessed": "2026-07-03",
"evidenceText": "The report states that Renewable Energy Renaissance Zones are company-specific and limited to renewable energy facilities. Its CY2023 RERZ table lists Ultium Cells, LLC in Lansing/Eaton, LG Energy Solutions Michigan, Inc. in Holland/Allegan, and LG Chem Michigan, Inc. in Holland/Allegan, with no Detroit/Wayne RERZ row. The same report separately lists Detroit/Wayne Ford and Bedrock rows under MSF-designated Renaissance Zones, not Renewable Energy Renaissance Zones. "
},
{
"title": "FY2025 MSF/MEDC Annual Report",
"url": "[https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/fy-2025-msf-medc-annual-report.pdf](https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/fy-2025-msf-medc-annual-report.pdf)",
"owner": "Michigan Strategic Fund / Michigan Economic Development Corporation",
"accessed": "2026-07-03",
"evidenceText": "The report lists Renaissance Zone program types and states that tax relief is phased out in 25% increments over the last three years. FY2025 Renaissance Zone activity identifies a Renewable Energy Facility Renaissance Zone reassignment/amendment for Ultium Cells LLC in Lansing/Eaton, not Detroit/Wayne. "
},
{
"title": "Office of the Assessor: Renaissance Zones",
"url": "[https://detroitmi.gov/departments/office-chief-financial-officer/ocfo-divisions/office-assessor/renaissance-zones](https://detroitmi.gov/departments/office-chief-financial-officer/ocfo-divisions/office-assessor/renaissance-zones)",
"owner": "City of Detroit Office of the Assessor",
"accessed": "2026-07-03",
"evidenceText": "Detroit's assessor page describes the general Detroit Renaissance Zone program, qualification requirements, local/state tax incentives, and the need to apply through the Renaissance Zone Processing Center. It does not provide a Detroit/Wayne Renewable Energy Renaissance Zone project-specific designation package, parcel schedule, final-year phaseout record, or eligible tax-line schedule. ([City of Detroit][1])"
},
{
"title": "ESA Topic: Special Millages and Renaissance Zones",
"url": "[https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones](https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones)",
"owner": "Michigan Department of Treasury",
"accessed": "2026-07-03",
"evidenceText": "Treasury guidance provides general Essential Services Assessment treatment for property in a Renaissance Zone, including 100% reduction during the full exemption period and 25%, 50%, and 75% acquisition-cost multipliers during the three-year phaseout. This source is general program guidance and does not identify a Detroit/Wayne RERZ project or project-specific eligible tax lines. ([Michigan][2])"
},
{
"title": "MSF Board Final Minutes, November 27, 2018",
"url": "[https://www.michiganbusiness.org/globalassets/documents/msf-board/meeting-minutes/msf-board-final-minutes_november-27-2018.pdf](https://www.michiganbusiness.org/globalassets/documents/msf-board/meeting-minutes/msf-board-final-minutes_november-27-2018.pdf)",
"owner": "Michigan Strategic Fund",
"accessed": "2026-07-03",
"evidenceText": "The minutes record approval of Resolution 2018-194 for Ford Motor Company / Corktown Area MSF-Designated Renaissance Zone. This supports treating Ford/Corktown as MSF-designated, not Renewable Energy Renaissance Zone. "
},
{
"title": "Detroit City Council New Business, September 25, 2018",
"url": "[https://detroitmi.gov/sites/detroitmi.localhost/files/events/2018-09/New%20Business%2009-25-18.pdf](https://detroitmi.gov/sites/detroitmi.localhost/files/events/2018-09/New%20Business%2009-25-18.pdf)",
"owner": "Detroit City Council / City of Detroit",
"accessed": "2026-07-03",
"evidenceText": "The agenda item for Corktown Area Renaissance Zone / Ford Motor Company sought authorization to submit an application for a Michigan Strategic Fund Designated Renaissance Zone and described a 30-year benefit request. It does not identify a Renewable Energy Renaissance Zone project-specific calculation package. ([City of Detroit][3])"
},
{
"title": "Dakkota @ Kettering Project Fact Sheet",
"url": "[https://detroitmi.gov/sites/detroitmi.localhost/files/2019-11/Dakkota%20Integrated%20Systems%20Inc.pdf](https://detroitmi.gov/sites/detroitmi.localhost/files/2019-11/Dakkota%20Integrated%20Systems%20Inc.pdf)",
"owner": "City of Detroit / Detroit Economic Growth Corporation",
"accessed": "2026-07-03",
"evidenceText": "The project fact sheet identifies Dakkota at 6101 Van Dyke Street and 5840 Field Street and describes Detroit Next Michigan Development Corporation Renaissance Zone treatment under PA 275 of 2010. This is not evidence of a Renewable Energy Renaissance Zone. "
},
{
"title": "CY2019 Michigan Renaissance Zone Annual Report",
"url": "[https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/cy-2019-michigan-renaissance-zone-act-legislative-report.pdf](https://www.michiganbusiness.org/globalassets/documents/reports/legislative-reports/cy-2019-michigan-renaissance-zone-act-legislative-report.pdf)",
"owner": "Michigan Strategic Fund / Michigan Economic Development Corporation",
"accessed": "2026-07-03",
"evidenceText": "The CY2019 RERZ table lists LG Chem Michigan, Inc. in Holland/Allegan County. Detroit/Wayne rows such as NextEnergy, Sakthi, A123 Systems, and Ford appear in MSF-designated Renaissance Zone tables rather than the Renewable Energy Renaissance Zone table. "
}
],
"projectRows": [],
"runtimePatch": {
"targetDataFile": "data/tax_local_workflow_rules.json",
"workflowId": "local_tax_mi_rerz_detroit_wayne_dsire_3216_v1",
"fieldsToUpdate": {},
"projectRowsToAddOrUpdate": []
},
"remainingGaps": [
"No official Detroit/Wayne Renewable Energy Renaissance Zone project-specific record was found that identifies an approved RERZ company/project, parcel(s) or legal description, final year or phaseout status, eligible otherwise-due tax lines, and revocation/amendment status.",
"Official Detroit/Wayne records found for Ford/Corktown and Dakkota support other Renaissance Zone categories, not Renewable Energy Renaissance Zone treatment.",
"Do not add a Detroit/Wayne project row and do not infer eligible tax amounts from Factory ZERO, EV/manufacturing status, project cost, press releases, general Renaissance Zone rules, or non-RERZ Detroit/Wayne zone records.",
"Keep the workflow gated to user/accountant-supplied approved designation/project documents, parcel or zone confirmation, taxpayer compliance confirmation, phaseout multiplier or final year, and eligible otherwise-due tax lines.",
"Research prompt file citation: "
]
}

[1]: https://detroitmi.gov/departments/office-chief-financial-officer/ocfo-divisions/office-assessor/renaissance-zones "Renaissance Zones | City of Detroit"
[2]: https://www.michigan.gov/taxes/property/ppt/esa/topics/esa-topic-special-millages-and-renaissance-zones "ESA Topic: Special Millages and Renaissance Zones"
[3]: https://detroitmi.gov/sites/detroitmi.localhost/files/events/2018-09/New%20Business%2009-25-18.pdf?utm_source=chatgpt.com "DETROIT CITY COUNCIL"
