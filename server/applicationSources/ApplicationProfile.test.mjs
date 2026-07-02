import { describe, expect, it } from "vitest";
import { composeDraftApplicationProfile, validateApplicationProfile } from "./ApplicationProfile.mjs";

describe("ApplicationProfile", () => {
  it("composes a draft AI-extracted profile from path and requirement outputs", () => {
    const profile = composeDraftApplicationProfile({
      opportunity: { opportunityId: "opp_profile", canonicalTitle: "Profile Program" },
      officialProgramWebsiteProfile: {
        programSourceUrl: "https://programs.dsireusa.org/system/program/detail/1/example",
        programWebsiteUrl: "https://official.example.com/program",
        programWebsiteSource: "raw.websiteUrl",
        sourceChain: [{ role: "official_program_website", url: "https://official.example.com/program", status: "selected" }]
      },
      applicationPathProfile: {
        applicationUrl: "https://official.example.com/apply",
        applicationMethod: "online_portal",
        applicationStatus: "open",
        applicationArtifacts: [{ type: "application_portal", label: "Apply", url: "https://official.example.com/apply", confidence: "High" }]
      },
      applicationRequirementProfile: {
        extractionStatus: "requirements_extracted",
        requiredFields: [
          {
            id: "contact_email",
            label: "Contact email",
            requirementType: "field",
            required: true,
            sourceUrl: "https://official.example.com/apply",
            evidenceSnippet: "Applicants must provide contact email.",
            confidence: "High"
          }
        ],
        requiredDocuments: [],
        optionalFields: [],
        applicationSteps: ["Submit application online."],
        evidence: []
      }
    });

    expect(profile.reviewStatus).toBe("ai_extracted");
    expect(profile.createdFrom).toBe("extraction");
    expect(profile.programWebsiteUrl).toBe("https://official.example.com/program");
    expect(profile.requiredFields).toHaveLength(1);
  });

  it("requires evidence for extracted requirements", () => {
    const validation = validateApplicationProfile(
      {
        opportunityId: "opp_missing_evidence",
        applicationMethod: "online_portal",
        programWebsiteUrl: "https://official.example.com/program",
        requiredFields: [{ id: "phone", label: "Phone", requirementType: "field", required: true }],
        requiredDocuments: [],
        optionalFields: [],
        applicationStatus: "open"
      },
      { extractionStatus: "requirements_extracted" }
    );

    expect(validation.valid).toBe(false);
    expect(validation.errors.join(" ")).toMatch(/missing source evidence/i);
  });

  it("rejects ready-to-apply closed profiles and automatic admin_reviewed status", () => {
    const validation = validateApplicationProfile(
      {
        opportunityId: "opp_closed",
        applicationMethod: "online_portal",
        programWebsiteUrl: "https://official.example.com/program",
        applicationStatus: "closed",
        readyToApply: true,
        reviewStatus: "admin_reviewed",
        requiredFields: [],
        requiredDocuments: [],
        optionalFields: []
      },
      { createdAutomatically: true }
    );

    expect(validation.valid).toBe(false);
    expect(validation.errors.join(" ")).toMatch(/must not be marked ready-to-apply/i);
    expect(validation.errors.join(" ")).toMatch(/explicit admin action/i);
  });

  it("rejects invented requirements on unreadable profiles", () => {
    const validation = validateApplicationProfile({
      opportunityId: "opp_unreadable",
      applicationMethod: "unknown",
      applicationStatus: "source_unreadable_or_js_required",
      requiredFields: [{ id: "phone", label: "Phone", requirementType: "field", required: true }],
      requiredDocuments: [],
      optionalFields: []
    });

    expect(validation.valid).toBe(false);
    expect(validation.errors.join(" ")).toMatch(/should not contain extracted requirements/i);
  });
});
