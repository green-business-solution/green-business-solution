import { describe, expect, it } from "vitest";
import { resolveOfficialProgramWebsite } from "./OfficialProgramWebsiteResolver.mjs";
import { extractOpportunitySummaryLinks } from "./OpportunitySummaryLinks.mjs";

describe("resolveOfficialProgramWebsite", () => {
  it("uses opportunity.websiteUrl before DSIRE source fallback", () => {
    const result = resolveOfficialProgramWebsite({
      opportunityId: "opp_website",
      websiteUrl: "https://utility.example.com/program",
      sourceUrl: "https://programs.dsireusa.org/system/program/detail/1/example"
    });

    expect(result.programWebsiteUrl).toBe("https://utility.example.com/program");
    expect(result.programWebsiteSource).toBe("opportunity.websiteUrl");
    expect(result.sourceChain).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ role: "official_program_website", sourceField: "opportunity.websiteUrl", status: "selected" }),
        expect.objectContaining({ role: "aggregator_source", status: "fallback" })
      ])
    );
  });

  it("uses raw.websiteUrl when top-level websiteUrl is missing", () => {
    const result = resolveOfficialProgramWebsite({
      opportunityId: "opp_raw_website",
      raw: { websiteUrl: "https://provider.example.com/rebates" },
      sourceUrl: "https://programs.dsireusa.org/system/program/detail/2/example"
    });

    expect(result.programWebsiteUrl).toBe("https://provider.example.com/rebates");
    expect(result.programWebsiteSource).toBe("raw.websiteUrl");
  });

  it("uses dsireClone.program.websiteUrl when structured clone website exists", () => {
    const result = resolveOfficialProgramWebsite({
      opportunityId: "opp_clone_website",
      dsireClone: { program: { websiteUrl: "https://state.example.gov/program" } },
      sourceUrl: "https://programs.dsireusa.org/system/program/detail/3/example"
    });

    expect(result.programWebsiteUrl).toBe("https://state.example.gov/program");
    expect(result.programWebsiteSource).toBe("dsireClone.program.websiteUrl");
  });

  it("classifies summary online application links", () => {
    const links = extractOpportunitySummaryLinks({
      websiteUrl: "https://program.example.com/",
      summaryHtml: `<p>Applicants should <a href="/apply">click here</a> for the online application.</p>`
    });

    expect(links).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: "https://program.example.com/apply",
          candidateType: "application_url",
          confidence: "High"
        })
      ])
    );
  });

  it("ignores DSIRE Resources links from summary HTML", () => {
    const result = resolveOfficialProgramWebsite({
      opportunityId: "opp_dsire_resources",
      sourceUrl: "https://programs.dsireusa.org/system/program/detail/4/example",
      summaryHtml: `<p><a href="https://programs.dsireusa.org/resources">DSIRE Resources</a></p>`
    });

    expect(result.summaryLinkCandidates.some((candidate) => candidate.candidateType !== "ignore")).toBe(false);
    expect(result.programWebsiteUrl).toBeUndefined();
    expect(result.programWebsiteSource).toBe("dsire_fallback");
  });
});
