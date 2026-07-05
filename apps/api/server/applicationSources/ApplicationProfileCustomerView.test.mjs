import { describe, expect, it } from "vitest";
import {
  buildCustomerApplicationProfileResponse,
  isCustomerReadyApplicationProfile,
  sanitizeApplicationProfileForCustomer
} from "./ApplicationProfileCustomerView.mjs";
import { normalizeApplicationProfileForRegistry } from "./ApplicationProfileRegistry.mjs";

function readyProfile(overrides = {}) {
  return normalizeApplicationProfileForRegistry(
    {
      opportunityId: "opp_ready_customer",
      opportunityName: "Ready Solar Rebate",
      programSourceUrl: "https://programs.dsireusa.org/system/program/detail/1/test",
      programWebsiteUrl: "https://program.example.com/solar",
      applicationUrl: "https://program.example.com/apply",
      pdfUrl: "https://program.example.com/application.pdf",
      contactEmail: "solar@example.com",
      applicationMethod: "online_portal",
      primaryMethod: "online_portal",
      applicationStatus: "open",
      profileQuality: "requirements_ready_for_admin_review",
      reviewStatus: "admin_reviewed",
      primaryApplicationArtifacts: [
        {
          type: "application_portal",
          label: "Apply online",
          url: "https://program.example.com/apply",
          evidenceSnippet: "Apply online",
          confidence: "High"
        }
      ],
      requiredFields: [
        {
          id: "business_name",
          label: "Business legal name",
          requirementType: "field",
          required: true,
          sourceUrl: "https://program.example.com/apply",
          evidenceSnippet: "Applicant must provide business legal name.",
          confidence: "High"
        }
      ],
      requiredDocuments: [
        {
          id: "utility_bill",
          label: "Recent utility bill",
          requirementType: "bill",
          required: true,
          sourceUrl: "https://program.example.com/apply",
          evidenceSnippet: "Upload a recent utility bill.",
          confidence: "High"
        }
      ],
      optionalFields: [],
      applicationSteps: ["Open the application portal.", "Upload required documents."],
      evidence: [{ label: "Application instructions", sourceUrl: "https://program.example.com/apply", textSnippet: "Upload required documents." }],
      extractionDiagnostics: { sourceUsed: "internal" },
      artifactDiagnostics: { filteredArtifacts: [{ label: "Newsletter" }] },
      adminNotes: "Internal admin note.",
      reviewedBy: "admin@example.com",
      reviewedAt: "2026-07-03T08:00:00.000Z",
      qualityWarnings: [],
      ...overrides
    },
    { reviewStatus: overrides.reviewStatus || "admin_reviewed" }
  );
}

describe("ApplicationProfileCustomerView", () => {
  it("returns sanitized customer-ready profiles", () => {
    const profile = readyProfile();
    const response = buildCustomerApplicationProfileResponse(profile);

    expect(response.status).toBe("customer_ready");
    expect(response.customerReady).toBe(true);
    expect(response.profile.programName).toBe("Ready Solar Rebate");
    expect(response.profile.requiredFields).toHaveLength(1);
    expect(response.profile.requiredDocuments).toHaveLength(1);
    expect(response.profile.applicationArtifacts[0].label).toBe("Apply online");
    expect(JSON.stringify(response)).not.toMatch(/adminNotes|reviewedBy|extractionDiagnostics|artifactDiagnostics|Internal admin note|admin@example/);
  });

  it("does not return ai_extracted or needs_review profiles as customer-ready", () => {
    expect(buildCustomerApplicationProfileResponse(readyProfile({ reviewStatus: "ai_extracted" })).status).toBe("unavailable");
    expect(buildCustomerApplicationProfileResponse(readyProfile({ reviewStatus: "needs_review" })).status).toBe("unavailable");
  });

  it("blocks source-unreadable, needs-user-selection, and unknown-status profiles", () => {
    expect(
      buildCustomerApplicationProfileResponse(
        readyProfile({
          applicationStatus: "source_unreadable_or_js_required",
          profileQuality: "source_unreadable_or_js_required",
          requiredFields: [],
          requiredDocuments: [],
          primaryApplicationArtifacts: []
        })
      ).status
    ).toBe("unavailable");
    expect(
      buildCustomerApplicationProfileResponse(
        readyProfile({
          applicationStatus: "needs_user_selection",
          profileQuality: "needs_user_selection",
          requiredFields: [],
          requiredDocuments: [],
          primaryApplicationArtifacts: []
        })
      ).status
    ).toBe("unavailable");
    expect(buildCustomerApplicationProfileResponse(readyProfile({ applicationStatus: "unknown" })).status).toBe("unavailable");
  });

  it("returns closed or funding-exhausted approved profiles as reference-only", () => {
    const response = buildCustomerApplicationProfileResponse(
      readyProfile({
        applicationStatus: "funding_exhausted",
        profileQuality: "closed_but_profile_extractable",
        approvedAsReferenceOnly: true
      })
    );

    expect(response.status).toBe("reference_only");
    expect(response.customerReady).toBe(false);
    expect(response.referenceOnly).toBe(true);
    expect(response.notice).toMatch(/closed or funding-exhausted/i);
  });

  it("requires normal approval validator success for customer readiness", () => {
    const profile = readyProfile({
      requiredFields: [
        {
          id: "phone",
          label: "Phone",
          requirementType: "field",
          required: true,
          sourceUrl: "https://program.example.com/apply",
          evidenceSnippet: '"invalidinitialphone":"Enter a phone number"',
          confidence: "High"
        }
      ]
    });

    expect(isCustomerReadyApplicationProfile(profile)).toBe(false);
    expect(buildCustomerApplicationProfileResponse(profile).status).toBe("unavailable");
  });

  it("sanitizes unsafe artifacts and URLs", () => {
    const sanitized = sanitizeApplicationProfileForCustomer(
      readyProfile({
        primaryApplicationArtifacts: [
          { type: "application_portal", label: "Apply", url: "javascript:alert(1)", confidence: "High" },
          { type: "application_portal", label: "Apply safely", url: "https://program.example.com/apply", confidence: "High" }
        ],
        applicationUrl: "javascript:alert(1)",
        contactEmail: "not an email"
      })
    );

    expect(sanitized.applicationUrl).toBeUndefined();
    expect(sanitized.contactEmail).toBeUndefined();
    expect(sanitized.applicationArtifacts.map((artifact) => artifact.label)).toEqual(["Apply safely"]);
  });
});
