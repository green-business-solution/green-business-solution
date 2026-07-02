import { describe, expect, it } from "vitest";
import { findOpportunityApplicationPath } from "./ApplicationPathFinder.mjs";

function makeSourceProfile(overrides = {}) {
  return {
    opportunityId: "opp_path_base",
    opportunityName: "Commercial rebate",
    programSourceUrl: "https://example.com/program",
    sourceType: "webpage",
    applicationMethod: "unknown",
    notes: [],
    ...overrides
  };
}

function mockHtmlFetch(html, { contentType = "text/html; charset=utf-8", status = 200 } = {}) {
  return async () => ({
    ok: status >= 200 && status < 300,
    status,
    headers: {
      get(name) {
        return name.toLowerCase() === "content-type" ? contentType : "";
      }
    },
    async text() {
      return html;
    }
  });
}

function fixedOptions(fetchFn) {
  return {
    fetchFn,
    now: () => new Date("2026-07-02T00:00:00.000Z")
  };
}

describe("findOpportunityApplicationPath", () => {
  it("finds an Apply Now link", async () => {
    const result = await findOpportunityApplicationPath(
      {
        sourceProfile: makeSourceProfile(),
      },
      fixedOptions(
        mockHtmlFetch(`
          <html><head><title>Business Rebate</title></head>
          <body><a href="/apply">Apply Now for this rebate</a></body></html>
        `)
      )
    );

    expect(result.discoveredApplicationUrl).toBe("https://example.com/apply");
    expect(result.confirmedApplicationMethod).toBe("online_portal");
    expect(result.methodStatus).toBe("confirmed");
    expect(result.pathStatus).toBe("application_path_found");
    expect(result.evidence[0]).toMatchObject({ label: "Apply link found", url: "https://example.com/apply" });
  });

  it("finds a PDF application link", async () => {
    const result = await findOpportunityApplicationPath(
      { sourceProfile: makeSourceProfile() },
      fixedOptions(
        mockHtmlFetch(`
          <html><body><a href="/forms/rebate-application.pdf">Download rebate application form</a></body></html>
        `)
      )
    );

    expect(result.discoveredApplicationUrl).toBe("https://example.com/forms/rebate-application.pdf");
    expect(result.discoveredPdfUrl).toBe("https://example.com/forms/rebate-application.pdf");
    expect(result.confirmedApplicationMethod).toBe("pdf");
    expect(result.methodStatus).toBe("confirmed");
    expect(result.pathStatus).toBe("application_path_found");
    expect(result.evidence[0].label).toBe("PDF application link found");
  });

  it("finds an email-based application path", async () => {
    const result = await findOpportunityApplicationPath(
      { sourceProfile: makeSourceProfile() },
      fixedOptions(
        mockHtmlFetch(`
          <html><body>
            <p>Email your completed rebate application to the program team.</p>
            <a href="mailto:rebates@example.com">Send application by email</a>
          </body></html>
        `)
      )
    );

    expect(result.discoveredContactEmail).toBe("rebates@example.com");
    expect(result.confirmedApplicationMethod).toBe("email");
    expect(result.methodStatus).toBe("confirmed");
    expect(["application_path_found", "contact_only"]).toContain(result.pathStatus);
    expect(result.evidence.length).toBeGreaterThan(0);
  });

  it("detects contractor-submitted instructions", async () => {
    const result = await findOpportunityApplicationPath(
      { sourceProfile: makeSourceProfile() },
      fixedOptions(
        mockHtmlFetch(`
          <html><body>
            <p>Applications must be submitted by a participating contractor.</p>
            <a href="/contractor-portal">Contractor application portal</a>
          </body></html>
        `)
      )
    );

    expect(result.discoveredApplicationUrl).toBe("https://example.com/contractor-portal");
    expect(result.confirmedApplicationMethod).toBe("contractor_submitted");
    expect(result.methodStatus).toBe("confirmed");
    expect(result.pathStatus).toBe("application_path_found");
    expect(result.evidence.map((item) => item.label).join(" ")).toMatch(/Contractor-submitted/);
  });

  it("detects tax/accountant filing language", async () => {
    const result = await findOpportunityApplicationPath(
      {
        sourceProfile: makeSourceProfile({
          sourceType: "tax_guidance",
          applicationMethod: "tax_accountant_filing"
        })
      },
      fixedOptions(
        mockHtmlFetch(`
          <html><body>
            <p>Businesses claim this tax credit on their tax return and should consult an accountant.</p>
          </body></html>
        `)
      )
    );

    expect(result.confirmedApplicationMethod).toBe("tax_accountant_filing");
    expect(result.methodStatus).toBe("confirmed");
    expect(result.pathStatus).toBe("program_source_only");
    expect(result.evidence[0].label).toBe("Tax/accountant filing language found");
    expect(result.notes.join(" ")).toMatch(/normal application url may not exist/i);
  });

  it("finds a utility portal link", async () => {
    const result = await findOpportunityApplicationPath(
      {
        sourceProfile: makeSourceProfile({
          sourceType: "utility_portal",
          applicationMethod: "utility_portal",
          programSourceUrl: "https://utility.example.com/rebates"
        })
      },
      fixedOptions(
        mockHtmlFetch(`
          <html><body><a href="/rebate-portal">Enroll in the utility rebate portal</a></body></html>
        `)
      )
    );

    expect(result.discoveredApplicationUrl).toBe("https://utility.example.com/rebate-portal");
    expect(result.confirmedApplicationMethod).toBe("utility_portal");
    expect(result.methodStatus).toBe("confirmed");
    expect(result.pathStatus).toBe("application_path_found");
    expect(result.evidence[0].label).toBe("Utility portal/application link found");
  });

  it("finds an official program website on a DSIRE aggregator page without treating it as an application URL", async () => {
    const result = await findOpportunityApplicationPath(
      {
        sourceProfile: makeSourceProfile({
          opportunityId: "opp_dsire",
          opportunityName: "DSIRE rebate",
          programSourceUrl: "https://programs.dsireusa.org/system/program/detail/123/example-program",
          sourceType: "webpage",
          applicationMethod: "unknown"
        })
      },
      fixedOptions(
        mockHtmlFetch(`
          <html>
            <head><title>DSIRE - Example Program</title></head>
            <body>
              <h1>Example Program</h1>
              <a href="https://utility.example.com/business/rebate-portal">Program Website</a>
              <p>This DSIRE page summarizes eligibility and incentive amounts.</p>
            </body>
          </html>
        `)
      )
    );

    expect(result.programWebsiteUrl).toBe("https://utility.example.com/business/rebate-portal");
    expect(result.discoveredApplicationUrl).toBeUndefined();
    expect(result.discoveredPdfUrl).toBeUndefined();
    expect(result.confirmedApplicationMethod).toBe("unknown");
    expect(result.methodStatus).toBe("unknown");
    expect(result.pathStatus).toBe("program_source_only");
    expect(result.evidence.some((item) => item.label === "Official program website link found")).toBe(true);
    expect(result.notes.join(" ")).toMatch(/program website found, application url not found/i);
  });

  it("returns program_source_only for readable pages with no application path", async () => {
    const result = await findOpportunityApplicationPath(
      { sourceProfile: makeSourceProfile() },
      fixedOptions(
        mockHtmlFetch(`
          <html><head><title>Program details</title></head>
          <body><p>This page describes eligible technologies and incentive amounts.</p></body></html>
        `)
      )
    );

    expect(result.discoveredApplicationUrl).toBeUndefined();
    expect(result.discoveredPdfUrl).toBeUndefined();
    expect(result.confirmedApplicationMethod).toBe("unknown");
    expect(result.methodStatus).toBe("unknown");
    expect(result.pathStatus).toBe("program_source_only");
    expect(result.notes.join(" ")).toMatch(/no direct application path/i);
  });

  it("returns source_unreadable for fetch failures", async () => {
    const result = await findOpportunityApplicationPath(
      { sourceProfile: makeSourceProfile({ applicationMethod: "online_portal" }) },
      fixedOptions(async () => {
        throw new Error("network failed");
      })
    );

    expect(result.confirmedApplicationMethod).toBe("online_portal");
    expect(result.methodStatus).toBe("inferred");
    expect(result.pathStatus).toBe("source_unreadable");
    expect(result.error).toMatch(/network failed/i);
    expect(result.discoveredApplicationUrl).toBeUndefined();
  });
});
