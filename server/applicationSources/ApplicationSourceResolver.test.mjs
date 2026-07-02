import { describe, expect, it } from "vitest";
import { resolveOpportunityApplicationSource } from "./ApplicationSourceResolver.mjs";

function makeOpportunity(overrides = {}) {
  return {
    opportunityId: "opp_base",
    canonicalTitle: "Commercial incentive",
    normalizedTitle: "Commercial incentive",
    sourceKey: "SOURCE_DSIRE",
    sourceName: "DSIRE",
    sourceUrl: "https://example.com/program",
    websiteUrl: "https://example.com/program",
    applicationUrl: null,
    category: "Financial Incentive",
    programType: "Rebate Program",
    administrator: "Example Administrator",
    summary: "Standard incentive summary.",
    technologies: ["LED Lighting"],
    sectors: ["Commercial"],
    details: [],
    evidence: [],
    ...overrides
  };
}

describe("resolveOpportunityApplicationSource", () => {
  it("classifies a PDF application source", () => {
    const result = resolveOpportunityApplicationSource(
      makeOpportunity({
        opportunityId: "opp_pdf",
        canonicalTitle: "Business Rebate Application",
        applicationUrl: "https://example.com/files/business-rebate-application.pdf"
      })
    );

    expect(result.sourceType).toBe("pdf");
    expect(result.applicationMethod).toBe("pdf");
    expect(result.extractionStatus).toBe("source_found");
    expect(result.sourceConfidence).toBe("High");
    expect(result.notes.join(" ")).toMatch(/pdf/i);
  });

  it("classifies a utility portal source", () => {
    const result = resolveOpportunityApplicationSource(
      makeOpportunity({
        opportunityId: "opp_utility_portal",
        canonicalTitle: "Utility Business HVAC Rebate",
        administrator: "Franklin Public Utility District",
        applicationUrl: "https://rebate.fpuc.com/",
        websiteUrl: "https://fpuc.com/business/rebates"
      })
    );

    expect(result.sourceType).toBe("utility_portal");
    expect(result.applicationMethod).toBe("utility_portal");
    expect(result.extractionStatus).toBe("source_found");
    expect(result.sourceConfidence).toBe("High");
    expect(result.notes.join(" ")).toMatch(/utility-managed|utility/i);
  });

  it("classifies a tax filing opportunity", () => {
    const result = resolveOpportunityApplicationSource(
      makeOpportunity({
        opportunityId: "opp_tax",
        canonicalTitle: "Section 179D Commercial Buildings Deduction",
        programType: "Tax Deduction",
        websiteUrl: "https://www.irs.gov/credits-deductions/energy-efficient-commercial-buildings-deduction"
      })
    );

    expect(result.sourceType).toBe("tax_guidance");
    expect(result.applicationMethod).toBe("tax_accountant_filing");
    expect(result.extractionStatus).toBe("source_found");
    expect(result.sourceConfidence).toBe("Medium");
    expect(result.notes.join(" ")).toMatch(/tax filing|accountant|tax-credit/i);
  });

  it("classifies an email-based application", () => {
    const result = resolveOpportunityApplicationSource(
      makeOpportunity({
        opportunityId: "opp_email",
        sourceUrl: null,
        websiteUrl: null,
        summary: "Email rebates@program.org to request the business application."
      })
    );

    expect(result.sourceType).toBe("email");
    expect(result.applicationMethod).toBe("email");
    expect(result.extractionStatus).toBe("source_found");
    expect(result.sourceConfidence).toBe("Medium");
    expect(result.contactEmail).toBe("rebates@program.org");
    expect(result.notes.join(" ")).toMatch(/contact email/i);
  });

  it("classifies a normal online application URL", () => {
    const result = resolveOpportunityApplicationSource(
      makeOpportunity({
        opportunityId: "opp_portal",
        applicationUrl: "https://entergyetech.com/apply-online",
        websiteUrl: "https://entergyetech.com/electric-vehicles",
        administrator: "State Clean Transportation Office"
      })
    );

    expect(result.sourceType).toBe("portal");
    expect(result.applicationMethod).toBe("online_portal");
    expect(result.extractionStatus).toBe("source_found");
    expect(result.sourceConfidence).toBe("High");
    expect(result.notes.join(" ")).toMatch(/direct application url/i);
  });

  it("classifies an ambiguous webpage source", () => {
    const result = resolveOpportunityApplicationSource(
      makeOpportunity({
        opportunityId: "opp_webpage",
        websiteUrl: "https://www.energytrust.org/renewable-energy/",
        applicationUrl: null
      })
    );

    expect(result.sourceType).toBe("webpage");
    expect(result.applicationMethod).toBe("unknown");
    expect(result.extractionStatus).toBe("needs_review");
    expect(result.sourceConfidence).toBe("Low");
    expect(result.notes.join(" ")).toMatch(/general program\/source url/i);
  });

  it("classifies a missing source", () => {
    const result = resolveOpportunityApplicationSource(
      makeOpportunity({
        opportunityId: "opp_missing_source",
        sourceUrl: null,
        websiteUrl: null,
        applicationUrl: null,
        summary: "",
        details: [],
        evidence: []
      })
    );

    expect(result.sourceType).toBe("unknown");
    expect(result.applicationMethod).toBe("unknown");
    expect(result.extractionStatus).toBe("source_missing");
    expect(result.sourceConfidence).toBe("Needs review");
    expect(result.notes).toContain("No program source URL, application URL, contact email, or application path found.");
  });

  it("classifies a contractor-submitted opportunity", () => {
    const result = resolveOpportunityApplicationSource(
      makeOpportunity({
        opportunityId: "opp_contractor",
        canonicalTitle: "Trade Ally Heat Pump Incentive",
        summary: "Application must be submitted by a participating contractor through the program.",
        websiteUrl: "https://example.com/trade-ally-program"
      })
    );

    expect(result.sourceType).toBe("contractor_submitted");
    expect(result.applicationMethod).toBe("contractor_submitted");
    expect(result.extractionStatus).toBe("source_found");
    expect(result.sourceConfidence).toBe("Medium");
    expect(result.notes.join(" ")).toMatch(/participating contractor|trade ally|installer/i);
  });
});
