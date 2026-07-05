import { describe, expect, it } from "vitest";
import { extractOpportunityApplicationRequirements } from "./ApplicationRequirementExtractor.mjs";

function makeSourceProfile(overrides = {}) {
  return {
    opportunityId: "opp_requirement_base",
    opportunityName: "Commercial rebate",
    programSourceUrl: "https://example.com/program",
    applicationMethod: "unknown",
    notes: [],
    ...overrides
  };
}

function makePathProfile(overrides = {}) {
  return {
    opportunityId: "opp_requirement_base",
    programSourceUrl: "https://example.com/program",
    discoveredApplicationUrl: "https://example.com/apply",
    applicationMethod: "online_portal",
    discoveryStatus: "application_path_found",
    ...overrides
  };
}

function mockTextFetch(text, { contentType = "text/html; charset=utf-8", status = 200 } = {}) {
  return async () => ({
    ok: status >= 200 && status < 300,
    status,
    headers: {
      get(name) {
        return name.toLowerCase() === "content-type" ? contentType : "";
      }
    },
    async text() {
      return text;
    }
  });
}

function fixedOptions(fetchFn) {
  return { fetchFn };
}

describe("extractOpportunityApplicationRequirements", () => {
  it("extracts utility rebate account number, bill, quote, and pre-approval requirements", async () => {
    const result = await extractOpportunityApplicationRequirements(
      {
        sourceProfile: makeSourceProfile({ applicationMethod: "utility_portal" }),
        pathProfile: makePathProfile({ applicationMethod: "utility_portal", discoveredApplicationUrl: "https://utility.example.com/apply" })
      },
      fixedOptions(
        mockTextFetch(`
          <html><body>
            <h2>Before you apply</h2>
            <p>Pre-approval is required before installation.</p>
            <h2>Application requirements</h2>
            <p>Applicants must provide business legal name, service address, utility account number, and project cost.</p>
            <p>Required documents include a recent utility bill and itemized quote.</p>
            <ol><li>Confirm eligibility.</li><li>Submit application before installation.</li><li>Upload recent utility bill.</li></ol>
          </body></html>
        `)
      )
    );

    expect(result.extractionStatus).toBe("requirements_extracted");
    expect(result.applicationMethod).toBe("utility_portal");
    expect(result.requiredFields.map((item) => item.id)).toEqual(expect.arrayContaining(["business_legal_name", "site_service_address", "utility_account_number", "project_cost"]));
    expect(result.requiredDocuments.map((item) => item.id)).toEqual(expect.arrayContaining(["recent_utility_bill", "itemized_quote"]));
    expect(result.preApprovalRequired).toBe(true);
    expect(result.applicationSteps.length).toBeGreaterThan(0);
    expect(result.evidence.some((item) => /pre-approval/i.test(item.textSnippet || ""))).toBe(true);
  });

  it("extracts required fields from PDF-like application text", async () => {
    const result = await extractOpportunityApplicationRequirements(
      {
        sourceProfile: makeSourceProfile(),
        pathProfile: makePathProfile({
          discoveredApplicationUrl: "https://example.com/rebate-application.pdf",
          discoveredPdfUrl: "https://example.com/rebate-application.pdf",
          pdfUrl: "https://example.com/rebate-application.pdf",
          applicationMethod: "pdf"
        })
      },
      fixedOptions(
        mockTextFetch(
          `
          Business Rebate Application Form
          Business Legal Name:
          Contact Name:
          Contact Email:
          Phone:
          Installation Address:
          Contractor Name:
          Authorized Signature:
          Required attachments: equipment specification sheet and W-9.
          `,
          { contentType: "application/pdf" }
        )
      )
    );

    expect(result.sourceUrl).toBe("https://example.com/rebate-application.pdf");
    expect(result.applicationMethod).toBe("pdf");
    expect(result.requiredFields.map((item) => item.id)).toEqual(expect.arrayContaining(["business_legal_name", "contact_name", "contact_email", "phone", "site_service_address", "contractor_name", "signature"]));
    expect(result.requiredDocuments.map((item) => item.id)).toEqual(expect.arrayContaining(["equipment_spec_sheet", "w9"]));
    expect(result.notes.join(" ")).toMatch(/pdf/i);
  });

  it("extracts email application instructions", async () => {
    const result = await extractOpportunityApplicationRequirements(
      {
        sourceProfile: makeSourceProfile({ applicationMethod: "email" }),
        pathProfile: makePathProfile({
          discoveredApplicationUrl: undefined,
          discoveredContactEmail: "rebates@example.com",
          contactEmail: "rebates@example.com",
          applicationMethod: "email",
          methodStatus: "confirmed"
        })
      },
      fixedOptions(
        mockTextFetch(`
          <html><body>
            <p>Email completed rebate application materials to rebates@example.com.</p>
            <p>The email must include business legal name, contact email, phone, and service address.</p>
            <p>Attach a recent utility bill.</p>
          </body></html>
        `)
      )
    );

    expect(result.applicationMethod).toBe("email");
    expect(result.requiredFields.map((item) => item.id)).toEqual(expect.arrayContaining(["business_legal_name", "contact_email", "phone", "site_service_address"]));
    expect(result.requiredDocuments.map((item) => item.id)).toContain("recent_utility_bill");
    expect(result.applicationSteps.some((step) => /email/i.test(step))).toBe(true);
    expect(result.extractionStatus).not.toBe("needs_review");
  });

  it("detects contractor-submitted program requirements", async () => {
    const result = await extractOpportunityApplicationRequirements(
      {
        sourceProfile: makeSourceProfile({ applicationMethod: "contractor_submitted" }),
        pathProfile: makePathProfile({ applicationMethod: "contractor_submitted", methodStatus: "confirmed", discoveredApplicationUrl: undefined, programWebsiteUrl: "https://example.com/contractor-program" })
      },
      fixedOptions(
        mockTextFetch(`
          <html><body>
            <p>Applications must be submitted by a participating contractor.</p>
            <p>Required documents include contractor license and itemized quote.</p>
          </body></html>
        `)
      )
    );

    expect(result.contractorRequired).toBe(true);
    expect(result.applicationMethod).toBe("contractor_submitted");
    expect(result.requiredDocuments.map((item) => item.id)).toEqual(expect.arrayContaining(["contractor_license_certification", "itemized_quote"]));
    expect(result.evidence.some((item) => /contractor/i.test(item.textSnippet || ""))).toBe(true);
  });

  it("detects tax/accountant filing guidance", async () => {
    const result = await extractOpportunityApplicationRequirements(
      {
        sourceProfile: makeSourceProfile({ applicationMethod: "tax_accountant_filing" }),
        pathProfile: makePathProfile({ applicationMethod: "tax_accountant_filing", methodStatus: "confirmed", discoveredApplicationUrl: undefined, programWebsiteUrl: "https://irs.example.com/credit" })
      },
      fixedOptions(
        mockTextFetch(`
          <html><body>
            <p>Businesses claim this tax credit on their tax return and should consult an accountant.</p>
            <p>Include IRS Form 3468 with your tax filing.</p>
          </body></html>
        `)
      )
    );

    expect(result.taxReviewRequired).toBe(true);
    expect(result.applicationMethod).toBe("tax_accountant_filing");
    expect(result.requiredDocuments.map((item) => item.id)).toContain("tax_forms");
    expect(result.applicationUrl).toBeUndefined();
    expect(result.evidence.some((item) => /tax/i.test(item.textSnippet || ""))).toBe(true);
  });

  it("extracts a deadline", async () => {
    const result = await extractOpportunityApplicationRequirements(
      { sourceProfile: makeSourceProfile(), pathProfile: makePathProfile() },
      fixedOptions(
        mockTextFetch(`
          <html><body>
            <p>Applications are due by December 31, 2026.</p>
            <p>Required documents include invoice and proof of purchase.</p>
          </body></html>
        `)
      )
    );

    expect(result.deadline).toMatch(/December 31, 2026/i);
    expect(result.requiredDocuments.map((item) => item.id)).toEqual(expect.arrayContaining(["invoice", "proof_of_purchase"]));
    expect(result.evidence.some((item) => item.label === "Deadline language found")).toBe(true);
  });

  it("does not extract requirements from DSIRE boilerplate/source-only text", async () => {
    const result = await extractOpportunityApplicationRequirements(
      {
        sourceProfile: makeSourceProfile({
          opportunityId: "opp_dsire_boilerplate",
          programSourceUrl: "https://programs.dsireusa.org/system/program/detail/999/boilerplate"
        }),
        pathProfile: makePathProfile({
          opportunityId: "opp_dsire_boilerplate",
          programSourceUrl: "https://programs.dsireusa.org/system/program/detail/999/boilerplate",
          discoveredApplicationUrl: undefined,
          applicationMethod: "source_only",
          discoveryStatus: "source_only",
          linkDiscoveryStatus: "source_only",
          isAggregatorSource: true,
          aggregatorType: "dsire"
        })
      },
      fixedOptions(
        mockTextFetch(`
          <html><body>
            <h1>DSIRE Program Summary</h1>
            <p>{{ contact.contact.email }}</p>
            <p>Get free, expert advice (no phone calls required)</p>
            <p>Expiration Date:</p>
            <p>This page summarizes eligibility and incentive amounts.</p>
          </body></html>
        `)
      )
    );

    expect(result.extractionStatus).toBe("needs_review");
    expect(result.requiredFields).toHaveLength(0);
    expect(result.requiredDocuments).toHaveLength(0);
    expect(result.optionalFields).toHaveLength(0);
    expect(result.applicationSteps).toHaveLength(0);
    expect(result.deadline).toBeUndefined();
    expect(result.notes.join(" ")).toMatch(/only a general program\/source page/i);
    expect(result.extractionDiagnostics?.extractionAllowed).toBe(false);
  });

  it("extracts phone only when it appears in a real application requirement section", async () => {
    const result = await extractOpportunityApplicationRequirements(
      {
        sourceProfile: makeSourceProfile(),
        pathProfile: makePathProfile({ discoveredApplicationUrl: "https://example.com/apply" })
      },
      fixedOptions(
        mockTextFetch(`
          <html><body>
            <h2>Application Requirements</h2>
            <p>Applicants must provide contact name, phone number, and service address.</p>
          </body></html>
        `)
      )
    );

    expect(result.extractionStatus).not.toBe("needs_review");
    expect(result.requiredFields.map((item) => item.id)).toEqual(expect.arrayContaining(["contact_name", "phone", "site_service_address"]));
  });

  it("ignores phone language from non-application boilerplate", async () => {
    const result = await extractOpportunityApplicationRequirements(
      {
        sourceProfile: makeSourceProfile(),
        pathProfile: makePathProfile({
          discoveredApplicationUrl: undefined,
          applicationMethod: "source_only",
          discoveryStatus: "source_only",
          linkDiscoveryStatus: "source_only"
        })
      },
      fixedOptions(
        mockTextFetch(`
          <html><body>
            <p>Get free, expert advice (no phone calls required)</p>
            <p>Program overview and incentive summary.</p>
          </body></html>
        `)
      )
    );

    expect(result.requiredFields.map((item) => item.id)).not.toContain("phone");
    expect(result.extractionStatus).toBe("needs_review");
  });

  it("ignores an empty Expiration Date label", async () => {
    const result = await extractOpportunityApplicationRequirements(
      {
        sourceProfile: makeSourceProfile(),
        pathProfile: makePathProfile({ discoveredApplicationUrl: "https://example.com/apply" })
      },
      fixedOptions(
        mockTextFetch(`
          <html><body>
            <h2>Application Requirements</h2>
            <p>Expiration Date:</p>
            <p>Applicants must provide business legal name.</p>
          </body></html>
        `)
      )
    );

    expect(result.deadline).toBeUndefined();
    expect(result.requiredFields.map((item) => item.id)).toContain("business_legal_name");
  });

  it("extracts Expiration Date only when a real value is present", async () => {
    const result = await extractOpportunityApplicationRequirements(
      {
        sourceProfile: makeSourceProfile(),
        pathProfile: makePathProfile({ discoveredApplicationUrl: "https://example.com/apply" })
      },
      fixedOptions(
        mockTextFetch(`
          <html><body>
            <h2>Application Requirements</h2>
            <p>Expiration Date: December 31, 2026</p>
            <p>Applicants must provide business legal name.</p>
          </body></html>
        `)
      )
    );

    expect(result.deadline).toMatch(/December 31, 2026/i);
  });

  it("never turns template placeholders into application steps", async () => {
    const result = await extractOpportunityApplicationRequirements(
      {
        sourceProfile: makeSourceProfile(),
        pathProfile: makePathProfile({
          discoveredApplicationUrl: undefined,
          applicationMethod: "source_only",
          discoveryStatus: "source_only",
          linkDiscoveryStatus: "source_only"
        })
      },
      fixedOptions(
        mockTextFetch(`
          <html><body>
            <p>{{ contact.contact.email }}</p>
            <p>Program overview only.</p>
          </body></html>
        `)
      )
    );

    expect(result.applicationSteps).toHaveLength(0);
    expect(result.evidence.map((item) => item.textSnippet || "").join(" ")).not.toMatch(/\{\{/);
  });

  it("does not use Zoho validation or verification strings as field evidence", async () => {
    const result = await extractOpportunityApplicationRequirements(
      {
        sourceProfile: makeSourceProfile(),
        pathProfile: makePathProfile({ discoveredApplicationUrl: "https://forms.zohopublic.com/apply" })
      },
      fixedOptions(
        mockTextFetch(`
          <html><body>
            <h2>Application Requirements</h2>
            <script>
              {"invalidinitialphone":"Enter a phone number that doesnt begin with + or ).","unconfirmeduser":"You haven't verified your email yet, click"}
            </script>
            <p>Applicants must provide project address and contractor name.</p>
          </body></html>
        `)
      )
    );

    const evidence = JSON.stringify(result);
    expect(evidence).not.toMatch(/invalidinitialphone|unconfirmeduser|verified your email/i);
    expect(result.requiredFields.map((item) => item.id)).toEqual(expect.arrayContaining(["site_service_address", "contractor_name"]));
    expect(result.requiredFields.map((item) => item.id)).not.toContain("phone");
    expect(result.requiredFields.map((item) => item.id)).not.toContain("contact_email");
  });

  it("does not create a utility provider field from generic utility regulation text", async () => {
    const result = await extractOpportunityApplicationRequirements(
      {
        sourceProfile: makeSourceProfile(),
        pathProfile: makePathProfile({ discoveredApplicationUrl: "https://example.com/interconnection.pdf", applicationMethod: "pdf" })
      },
      fixedOptions(
        mockTextFetch(`
          Level I Interconnection Application
          Applicants must provide contact name, phone, service address, utility account number, and authorized signature.
          This immediate shutdown is required by the National Electric Code (NEC) and also by your local electric utility's regulations.
          `,
          { contentType: "application/pdf" }
        )
      )
    );

    expect(result.requiredFields.map((item) => item.id)).toEqual(expect.arrayContaining(["contact_name", "phone", "site_service_address", "utility_account_number", "signature"]));
    expect(result.requiredFields.map((item) => item.id)).not.toContain("utility_provider");
  });

  it("labels application checklist document evidence instead of generic proof of purchase", async () => {
    const result = await extractOpportunityApplicationRequirements(
      {
        sourceProfile: makeSourceProfile({ opportunityName: "Efficiency Maine C-PACE" }),
        pathProfile: makePathProfile({
          discoveredApplicationUrl: "https://portal.example.com/cpace",
          programWebsiteUrl: "https://example.com/c-pace/",
          applicationMethod: "online_portal"
        })
      },
      fixedOptions(
        mockTextFetch(`
          <html><body>
            <h2>Application Requirements</h2>
            <p>Upon receipt of all required application documents identified in the Application Checklist, the program will review the application.</p>
            <p>Applicants must provide business legal name, project cost, and contact email.</p>
          </body></html>
        `)
      )
    );

    expect(result.requiredDocuments.map((item) => item.id)).toContain("application_checklist_documents");
    expect(result.requiredDocuments.map((item) => item.label)).toContain("Application Checklist documents");
    expect(result.requiredDocuments.map((item) => item.id)).not.toContain("proof_of_purchase");
  });

  it("returns needs_review for a vague readable source", async () => {
    const result = await extractOpportunityApplicationRequirements(
      { sourceProfile: makeSourceProfile(), pathProfile: makePathProfile({ discoveredApplicationUrl: undefined, programWebsiteUrl: "https://example.com/program" }) },
      fixedOptions(
        mockTextFetch(`
          <html><body>
            <h1>Business incentive overview</h1>
            <p>This page describes eligible technologies and rebate amounts.</p>
          </body></html>
        `)
      )
    );

    expect(result.requiredFields).toHaveLength(0);
    expect(result.requiredDocuments).toHaveLength(0);
    expect(result.extractionStatus).toBe("needs_review");
    expect(result.notes.join(" ")).toMatch(/no reliable application requirements/i);
  });

  it("returns source_unavailable for unreadable sources", async () => {
    const result = await extractOpportunityApplicationRequirements(
      { sourceProfile: makeSourceProfile(), pathProfile: makePathProfile() },
      fixedOptions(async () => {
        throw new Error("network failed");
      })
    );

    expect(result.extractionStatus).toBe("source_unavailable");
    expect(result.error).toMatch(/network failed/i);
    expect(result.requiredFields).toHaveLength(0);
    expect(result.requiredDocuments).toHaveLength(0);
  });
});
