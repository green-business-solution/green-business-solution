import { describe, expect, it } from "vitest";
import { extractGrantRequirementsFromText } from "./GrantApplicationExtractor.mjs";

describe("GrantApplicationExtractor", () => {
  it("extracts NEVI grant package materials", () => {
    const result = extractGrantRequirementsFromText(
      `
        The NEVI NOFO includes an application submission checklist.
        Required documents include Form 1 Compliance Checklist, Form 2 Technical Application,
        Form 3 Detailed Cost Proposal, Form 4 Detailed Project Schedule, Form 5 Utility Form,
        Form 6 Site Host Letter, Form 7 NEPA environmental documentation, and GATA budget,
        agreement, conflict of interest, and risk assessment materials.
      `,
      { sourceUrl: "https://idot.illinois.gov/nevi.html" }
    );

    expect(result.requiredDocuments.map((item) => item.id)).toEqual(expect.arrayContaining([
      "nofo",
      "application_submission_checklist",
      "compliance_checklist",
      "technical_application",
      "detailed_cost_proposal",
      "detailed_project_schedule",
      "utility_form",
      "site_host_letter",
      "nepa_environmental_documentation",
      "gata_materials"
    ]));
  });

  it("extracts Maryland commercial solar closed-program package materials", () => {
    const result = extractGrantRequirementsFromText(
      `
        The FOA and Jotform Questions PDF describe required attachments: IRS Form W-9,
        good standing documentation, facility control evidence, project budget workbook,
        project map/site map, solar contract or letter of intent, tenant synopsis form
        if multifamily, NABCEP professional involvement, and cost match evidence.
      `,
      { sourceUrl: "https://energy.maryland.gov/business/Pages/Commercial-Solar.aspx" }
    );

    expect(result.requiredDocuments.map((item) => item.id)).toEqual(expect.arrayContaining([
      "foa",
      "jotform_questions_pdf",
      "w9",
      "good_standing_documentation",
      "facility_control_evidence",
      "project_budget_workbook",
      "project_map_site_map",
      "solar_contract_or_loi",
      "tenant_synopsis_form",
      "nabcep_professional_involvement",
      "cost_match_evidence"
    ]));
  });

  it("extracts PA Solar for Schools application fields without newsletter fields", () => {
    const result = extractGrantRequirementsFromText(
      `
        Solar for Schools Preparation Checklist: Applicants must provide applicant entity,
        eligible school entity type, project facility address, solar project type, project cost,
        requested grant amount, MV/PI AR, and region. Newsletter signup email is not part of
        the application.
      `,
      { sourceUrl: "https://dced.pa.gov/programs/solar-for-schools-grant-program-s4s/" }
    );

    expect(result.requiredFields.map((item) => item.id)).toEqual(expect.arrayContaining([
      "applicant_entity",
      "eligible_school_entity_type",
      "project_site_facility",
      "solar_project_type",
      "project_cost",
      "requested_grant_amount",
      "mv_pi_ar",
      "region"
    ]));
    expect(JSON.stringify(result)).not.toMatch(/newsletter signup/i);
  });
});
