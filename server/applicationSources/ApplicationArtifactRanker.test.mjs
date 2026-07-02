import { describe, expect, it } from "vitest";
import { rankApplicationArtifacts } from "./ApplicationArtifactRanker.mjs";

describe("ApplicationArtifactRanker", () => {
  it("filters billing portals from TMLP application artifacts", () => {
    const ranked = rankApplicationArtifacts({
      opportunity: { canonicalTitle: "Taunton Municipal Lighting Plant Residential Heat Pump and Zero-Interest Loan" },
      artifacts: [
        { type: "application_portal", label: "Pay My Bill", url: "https://portal.tmlp.com/app/login.jsp" },
        { type: "pdf", label: "TMLP Saves application form", url: "https://www.tmlp.com/forms/tmlp-saves-application-form.pdf" }
      ]
    });

    expect(ranked.artifacts.map((item) => item.label)).toContain("TMLP Saves application form");
    expect(ranked.artifacts.map((item) => item.label)).not.toContain("Pay My Bill");
    expect(ranked.diagnostics.filteredArtifacts.some((item) => /pay my bill/i.test(item.label))).toBe(true);
  });

  it("filters unrelated Wakefield solar site-wide utility forms", () => {
    const ranked = rankApplicationArtifacts({
      opportunity: { canonicalTitle: "Wakefield Residential Solar Rebate" },
      artifacts: [
        { type: "pdf", label: "Solar Interconnection Application", url: "https://wmgld.com/solar-application.pdf" },
        { type: "supporting_document", label: "New Residential Gasline Form", url: "https://wmgld.com/gas-service-application" },
        { type: "supporting_document", label: "EFV Form", url: "https://wmgld.com/efv-form" },
        { type: "supporting_document", label: "Time of Use Form", url: "https://wmgld.com/residential/time-of-use-form" },
        { type: "pdf", label: "Cutoff Demo Form", url: "https://wmgld.com/service-cut-off-demo-form.pdf" }
      ]
    });

    const labels = ranked.artifacts.map((item) => item.label);
    expect(labels).toContain("Solar Interconnection Application");
    expect(labels).not.toEqual(expect.arrayContaining(["New Residential Gasline Form", "EFV Form", "Time of Use Form", "Cutoff Demo Form"]));
    expect(ranked.diagnostics.filteredArtifacts.length).toBeGreaterThanOrEqual(4);
  });

  it("filters generic IDOT Forms & Reports when NEVI materials are needed", () => {
    const ranked = rankApplicationArtifacts({
      opportunity: { canonicalTitle: "Illinois NEVI EV Charging Program" },
      artifacts: [
        { type: "supporting_document", label: "Forms & Reports", url: "https://idot.illinois.gov/form-and-reports.html" },
        { type: "pdf", label: "NEVI NOFO", url: "https://idot.illinois.gov/nevi/nofo.pdf" }
      ]
    });

    expect(ranked.artifacts.map((item) => item.label)).toContain("NEVI NOFO");
    expect(ranked.artifacts.map((item) => item.label)).not.toContain("Forms & Reports");
  });
});
