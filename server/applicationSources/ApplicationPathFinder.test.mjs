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

function mockFetchByUrl(responses) {
  return async (url) => {
    const response = responses[String(url)];
    if (response instanceof Error) throw response;
    if (!response) throw new Error(`No mocked response for ${url}`);

    const config = typeof response === "string" ? { html: response } : response;
    const status = config.status || 200;
    const contentType = config.contentType || "text/html; charset=utf-8";
    return {
      ok: status >= 200 && status < 300,
      status,
      headers: {
        get(name) {
          return name.toLowerCase() === "content-type" ? contentType : "";
        }
      },
      async text() {
        return config.html || "";
      }
    };
  };
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
    expect(result.applicationMethod).toBe("online_portal");
    expect(result.discoveryStatus).toBe("application_path_found");
    expect(result.confidence).toBe("High");
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
    expect(result.pdfUrl).toBe("https://example.com/forms/rebate-application.pdf");
    expect(result.applicationMethod).toBe("pdf");
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
    expect(result.contactEmail).toBe("rebates@example.com");
    expect(result.applicationMethod).toBe("email");
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
    expect(result.applicationMethod).toBe("contractor_submitted");
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
    expect(result.applicationMethod).toBe("tax_accountant_filing");
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
    expect(result.applicationMethod).toBe("utility_portal");
    expect(result.confirmedApplicationMethod).toBe("utility_portal");
    expect(result.methodStatus).toBe("confirmed");
    expect(result.pathStatus).toBe("application_path_found");
    expect(result.evidence[0].label).toBe("Utility portal/application link found");
  });

  it("follows a DSIRE official program website one hop to find an Apply Now link", async () => {
    const sourceUrl = "https://programs.dsireusa.org/system/program/detail/123/example-program";
    const programWebsiteUrl = "https://program.example.com/business";
    const result = await findOpportunityApplicationPath(
      {
        sourceProfile: makeSourceProfile({
          opportunityId: "opp_dsire_apply",
          programSourceUrl: sourceUrl,
          sourceType: "webpage",
          applicationMethod: "unknown"
        })
      },
      fixedOptions(
        mockFetchByUrl({
          [sourceUrl]: `
            <html><head><title>DSIRE - Example Program</title></head>
            <body>
              <a href="${programWebsiteUrl}">Program Website</a>
              <p>This DSIRE page summarizes the program.</p>
            </body></html>
          `,
          [programWebsiteUrl]: `
            <html><body>
              <p>Business rebate customers can start online.</p>
              <a href="/apply">Apply Now</a>
            </body></html>
          `
        })
      )
    );

    expect(result.programWebsiteUrl).toBe(programWebsiteUrl);
    expect(result.discoveredApplicationUrl).toBe("https://program.example.com/apply");
    expect(result.applicationMethod).toBe("online_portal");
    expect(result.discoveryStatus).toBe("application_path_found");
    expect(result.evidence.some((item) => item.sourcePage === "program website" && /Apply Now/i.test(item.textSnippet || ""))).toBe(true);
  });

  it("uses structured programWebsiteUrl before DSIRE source fallback", async () => {
    const sourceUrl = "https://programs.dsireusa.org/system/program/detail/100/structured-website";
    const programWebsiteUrl = "https://official.example.com/rebates";
    const result = await findOpportunityApplicationPath(
      {
        sourceProfile: makeSourceProfile({
          opportunityId: "opp_structured_website",
          programSourceUrl: sourceUrl,
          programWebsiteUrl,
          programWebsiteSource: "raw.websiteUrl",
          sourceChain: [
            {
              role: "official_program_website",
              url: programWebsiteUrl,
              sourceField: "raw.websiteUrl",
              status: "selected",
              reason: "Raw opportunity website URL is treated as official."
            },
            {
              role: "aggregator_source",
              url: sourceUrl,
              sourceField: "sourceUrl",
              status: "fallback",
              reason: "DSIRE source URL retained as fallback."
            }
          ]
        })
      },
      fixedOptions(
        mockFetchByUrl({
          [programWebsiteUrl]: `
            <html><body>
              <a href="/apply">Apply Now</a>
            </body></html>
          `
        })
      )
    );

    expect(result.programWebsiteUrl).toBe(programWebsiteUrl);
    expect(result.programWebsiteSource).toBe("raw.websiteUrl");
    expect(result.discoveredApplicationUrl).toBe("https://official.example.com/apply");
    expect(result.bestApplicationUrl).toBe("https://official.example.com/apply");
    expect(result.pagesInspected).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ url: sourceUrl, role: "aggregator", status: "skipped" }),
        expect.objectContaining({ url: programWebsiteUrl, role: "program_website", status: "fetched" })
      ])
    );
  });

  it("follows an official program website one hop to find a PDF application", async () => {
    const sourceUrl = "https://programs.dsireusa.org/system/program/detail/456/pdf-program";
    const programWebsiteUrl = "https://utility.example.com/rebates";
    const result = await findOpportunityApplicationPath(
      {
        sourceProfile: makeSourceProfile({
          opportunityId: "opp_dsire_pdf",
          programSourceUrl: sourceUrl
        })
      },
      fixedOptions(
        mockFetchByUrl({
          [sourceUrl]: `
            <html><body>
              <a href="${programWebsiteUrl}">Official Program Website</a>
            </body></html>
          `,
          [programWebsiteUrl]: `
            <html><body>
              <a href="/forms/rebate-application.pdf">Download application PDF</a>
            </body></html>
          `
        })
      )
    );

    expect(result.programWebsiteUrl).toBe(programWebsiteUrl);
    expect(result.pdfUrl).toBe("https://utility.example.com/forms/rebate-application.pdf");
    expect(result.discoveredPdfUrl).toBe("https://utility.example.com/forms/rebate-application.pdf");
    expect(result.discoveredApplicationUrl).toBe("https://utility.example.com/forms/rebate-application.pdf");
    expect(result.applicationMethod).toBe("pdf");
    expect(result.discoveryStatus).toBe("application_path_found");
  });

  it("follows an official program website one hop to find an email application contact", async () => {
    const sourceUrl = "https://programs.dsireusa.org/system/program/detail/789/email-program";
    const programWebsiteUrl = "https://rebates.example.com/program";
    const result = await findOpportunityApplicationPath(
      {
        sourceProfile: makeSourceProfile({
          opportunityId: "opp_dsire_email",
          programSourceUrl: sourceUrl
        })
      },
      fixedOptions(
        mockFetchByUrl({
          [sourceUrl]: `
            <html><body><a href="${programWebsiteUrl}">Program Website</a></body></html>
          `,
          [programWebsiteUrl]: `
            <html><body>
              <p>Email completed application forms to the rebate administrator.</p>
              <a href="mailto:applications@rebates.example.com">Submit application by email</a>
            </body></html>
          `
        })
      )
    );

    expect(result.programWebsiteUrl).toBe(programWebsiteUrl);
    expect(result.contactEmail).toBe("applications@rebates.example.com");
    expect(result.discoveredContactEmail).toBe("applications@rebates.example.com");
    expect(result.applicationMethod).toBe("email");
    expect(result.methodStatus).toBe("confirmed");
  });

  it("follows an official program website one hop and preserves contractor-submitted instructions", async () => {
    const sourceUrl = "https://programs.dsireusa.org/system/program/detail/321/contractor-program";
    const programWebsiteUrl = "https://utility.example.com/contractor-rebates";
    const result = await findOpportunityApplicationPath(
      {
        sourceProfile: makeSourceProfile({
          opportunityId: "opp_dsire_contractor",
          programSourceUrl: sourceUrl
        })
      },
      fixedOptions(
        mockFetchByUrl({
          [sourceUrl]: `
            <html><body><a href="${programWebsiteUrl}">Program Website</a></body></html>
          `,
          [programWebsiteUrl]: `
            <html><body>
              <p>Applications must be submitted by a participating contractor.</p>
            </body></html>
          `
        })
      )
    );

    expect(result.programWebsiteUrl).toBe(programWebsiteUrl);
    expect(result.discoveredApplicationUrl).toBeUndefined();
    expect(result.applicationMethod).toBe("contractor_submitted");
    expect(result.methodStatus).toBe("confirmed");
    expect(result.evidence.some((item) => /contractor/i.test(item.textSnippet || ""))).toBe(true);
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
    expect(result.applicationMethod).toBe("unknown");
    expect(result.discoveryStatus).toBe("program_website_found");
    expect(result.methodStatus).toBe("unknown");
    expect(result.pathStatus).toBe("program_website_found");
    expect(result.evidence.some((item) => item.label === "Official program website link found")).toBe(true);
    expect(result.notes.join(" ")).toMatch(/program website found, application url not found/i);
  });

  it("returns program_website_only when the one-hop program website has only a general overview", async () => {
    const sourceUrl = "https://programs.dsireusa.org/system/program/detail/654/overview-program";
    const programWebsiteUrl = "https://utility.example.com/business-rebate-overview";
    const result = await findOpportunityApplicationPath(
      {
        sourceProfile: makeSourceProfile({
          opportunityId: "opp_dsire_overview",
          programSourceUrl: sourceUrl
        })
      },
      fixedOptions(
        mockFetchByUrl({
          [sourceUrl]: `
            <html><body><a href="${programWebsiteUrl}">Program Website</a></body></html>
          `,
          [programWebsiteUrl]: `
            <html><body>
              <h1>Business rebate overview</h1>
              <p>This page describes eligible equipment and incentive amounts.</p>
              <a href="/eligibility">Eligibility details</a>
            </body></html>
          `
        })
      )
    );

    expect(result.programWebsiteUrl).toBe(programWebsiteUrl);
    expect(result.discoveredApplicationUrl).toBeUndefined();
    expect(result.pdfUrl).toBeUndefined();
    expect(result.contactEmail).toBeUndefined();
    expect(result.applicationMethod).toBe("unknown");
    expect(result.discoveryStatus).toBe("program_website_found");
    expect(result.evidence.some((item) => /no direct application path/i.test(item.textSnippet || ""))).toBe(true);
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
    expect(result.applicationMethod).toBe("unknown");
    expect(result.discoveryStatus).toBe("source_only");
    expect(result.methodStatus).toBe("unknown");
    expect(result.pathStatus).toBe("program_source_only");
    expect(result.notes.join(" ")).toMatch(/no direct application path/i);
  });

  it("treats DSIRE boilerplate as source-only without contact or application candidates", async () => {
    const sourceUrl = "https://programs.dsireusa.org/system/program/detail/999/boilerplate-program";
    const result = await findOpportunityApplicationPath(
      {
        sourceProfile: makeSourceProfile({
          opportunityId: "opp_dsire_boilerplate",
          programSourceUrl: sourceUrl
        })
      },
      fixedOptions(
        mockHtmlFetch(`
          <html>
            <head><title>DSIRE - Boilerplate Program</title></head>
            <body>
              <h1>Program Summary</h1>
              <p>{{ contact.contact.email }}</p>
              <p>Get free, expert advice (no phone calls required)</p>
              <p>Expiration Date:</p>
              <p>This DSIRE page summarizes eligibility and incentive amounts.</p>
            </body>
          </html>
        `)
      )
    );

    expect(result.isAggregatorSource).toBe(true);
    expect(result.aggregatorType).toBe("dsire");
    expect(result.discoveredApplicationUrl).toBeUndefined();
    expect(result.discoveredPdfUrl).toBeUndefined();
    expect(result.discoveredContactEmail).toBeUndefined();
    expect(result.applicationMethod).toBe("unknown");
    expect(result.discoveryStatus).toBe("source_only");
    expect(result.linkDiscoveryStatus).toBe("source_only");
    expect(result.candidates.some((candidate) => candidate.linkType === "contact_email")).toBe(false);
    expect(result.notes.join(" ")).toMatch(/dsire\/source aggregator page found/i);
  });

  it("follows one relevant forms page from the official program website to find a PDF application", async () => {
    const sourceUrl = "https://programs.dsireusa.org/system/program/detail/777/forms-program";
    const programWebsiteUrl = "https://utility.example.com/business-rebates";
    const formsPageUrl = "https://utility.example.com/business-rebates/forms";
    const pdfUrl = "https://utility.example.com/business-rebates/forms/rebate-application.pdf";
    const result = await findOpportunityApplicationPath(
      {
        sourceProfile: makeSourceProfile({
          opportunityId: "opp_forms_page_pdf",
          programSourceUrl: sourceUrl
        })
      },
      fixedOptions(
        mockFetchByUrl({
          [sourceUrl]: `<html><body><a href="${programWebsiteUrl}">Program Website</a></body></html>`,
          [programWebsiteUrl]: `
            <html><body>
              <h1>Business rebate overview</h1>
              <a href="${formsPageUrl}">Rebate forms and documents</a>
            </body></html>
          `,
          [formsPageUrl]: `
            <html><body>
              <a href="${pdfUrl}">Download rebate application form PDF</a>
            </body></html>
          `
        })
      )
    );

    expect(result.programWebsiteUrl).toBe(programWebsiteUrl);
    expect(result.discoveredApplicationUrl).toBe(pdfUrl);
    expect(result.bestPdfUrl).toBe(pdfUrl);
    expect(result.applicationMethod).toBe("pdf");
    expect(result.linkDiscoveryStatus).toBe("pdf_found");
    expect(result.pagesInspected.map((page) => page.role)).toEqual(expect.arrayContaining(["aggregator", "program_website", "candidate_page"]));
    expect(result.candidates.some((candidate) => candidate.linkType === "forms_page" && candidate.url === formsPageUrl)).toBe(true);
  });

  it("extracts an official program website from DSIRE embedded data without calling it an application URL", async () => {
    const sourceUrl = "https://programs.dsireusa.org/system/program/detail/888/json-program";
    const programWebsiteUrl = "https://program.example.com/overview";
    const result = await findOpportunityApplicationPath(
      {
        sourceProfile: makeSourceProfile({
          opportunityId: "opp_dsire_json",
          programSourceUrl: sourceUrl
        })
      },
      fixedOptions(
        mockFetchByUrl({
          [sourceUrl]: `
            <html><body>
              <script>window.__DATA__ = {"programUrl":"${programWebsiteUrl}","contactEmail":"{{ contact.contact.email }}"}</script>
              <p>DSIRE summary page.</p>
            </body></html>
          `,
          [programWebsiteUrl]: `<html><body><p>Program overview only.</p></body></html>`
        })
      )
    );

    expect(result.programWebsiteUrl).toBe(programWebsiteUrl);
    expect(result.discoveredApplicationUrl).toBeUndefined();
    expect(result.applicationMethod).toBe("unknown");
    expect(result.linkDiscoveryStatus).toBe("program_website_found");
  });

  it("does not classify a general rebate program URL as an application URL without application evidence", async () => {
    const result = await findOpportunityApplicationPath(
      {
        sourceProfile: makeSourceProfile({
          opportunityId: "opp_general_rebate_url",
          programSourceUrl: "https://utility.example.com/business-rebate-program"
        })
      },
      fixedOptions(
        mockHtmlFetch(`
          <html><body>
            <h1>Business rebate program</h1>
            <p>Read about rebate levels, eligibility, and program terms.</p>
          </body></html>
        `)
      )
    );

    expect(result.programSourceUrl).toBe("https://utility.example.com/business-rebate-program");
    expect(result.discoveredApplicationUrl).toBeUndefined();
    expect(result.applicationMethod).toBe("unknown");
    expect(result.discoveryStatus).toBe("source_only");
  });

  it("returns source_unreadable for fetch failures", async () => {
    const result = await findOpportunityApplicationPath(
      { sourceProfile: makeSourceProfile({ applicationMethod: "online_portal" }) },
      fixedOptions(async () => {
        throw new Error("network failed");
      })
    );

    expect(result.confirmedApplicationMethod).toBe("online_portal");
    expect(result.applicationMethod).toBe("unknown");
    expect(result.discoveryStatus).toBe("source_unreadable_or_js_required");
    expect(result.methodStatus).toBe("inferred");
    expect(result.pathStatus).toBe("source_unreadable_or_js_required");
    expect(result.error).toMatch(/network failed/i);
    expect(result.discoveredApplicationUrl).toBeUndefined();
  });
});
