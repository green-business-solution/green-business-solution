import { describe, expect, it } from "vitest";
import { assessApplicationProfileQuality, composeDraftApplicationProfile, validateApplicationProfile } from "./ApplicationProfile.mjs";

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

  it("marks schema-valid profiles with artifacts but no requirements as quality-incomplete", () => {
    const profile = composeDraftApplicationProfile({
      opportunity: { opportunityId: "opp_quality", canonicalTitle: "Quality Program" },
      applicationPathProfile: {
        programWebsiteUrl: "https://official.example.com/program",
        applicationMethod: "online_form",
        applicationStatus: "open",
        applicationArtifacts: [{ type: "online_form", label: "Interest Form", url: "https://official.example.com/interest-form/" }]
      },
      applicationRequirementProfile: {
        extractionStatus: "needs_review",
        requiredFields: [],
        requiredDocuments: [],
        optionalFields: [],
        notes: ["Form found but fields were not extracted."]
      }
    });
    const validation = validateApplicationProfile(profile, { extractionStatus: "needs_review", createdAutomatically: true });

    expect(validation.valid).toBe(true);
    expect(profile.profileQuality).toBe("needs_form_field_extraction");
    expect(profile.qualityWarnings.join(" ")).toMatch(/artifacts were found/i);
  });

  it("does not mark closed profiles ready even when requirements are extractable", () => {
    const quality = assessApplicationProfileQuality({
      opportunityId: "opp_closed_quality",
      applicationStatus: "funding_exhausted",
      requiredFields: [{ id: "applicant_entity", label: "Applicant entity", sourceUrl: "https://example.com", evidenceSnippet: "Applicant entity", required: true }],
      requiredDocuments: [{ id: "w9", label: "W-9", sourceUrl: "https://example.com", evidenceSnippet: "W-9", required: true }],
      optionalFields: [],
      applicationArtifacts: [{ type: "grant_package", label: "FOA", url: "https://example.com/foa.pdf" }]
    });

    expect(quality.profileQuality).toBe("closed_but_profile_extractable");
  });
});
