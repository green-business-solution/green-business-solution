import fs from "node:fs/promises";
import { describe, expect, it } from "vitest";
import {
  applyApplicationProfileAdminPatch,
  extractDraftProfilesFromFirstTenAudit,
  normalizeApplicationProfileForRegistry
} from "./ApplicationProfileRegistry.mjs";
import {
  isApplicationProfileCustomerReady,
  validateApplicationProfileApproval
} from "./ApplicationProfileApprovalValidator.mjs";

function readyProfile(overrides = {}) {
  return normalizeApplicationProfileForRegistry(
    {
      opportunityId: "opp_ready",
      opportunityName: "Ready Solar Rebate",
      programWebsiteUrl: "https://program.example.com/solar",
      applicationUrl: "https://program.example.com/apply",
      applicationMethod: "online_portal",
      primaryMethod: "online_portal",
      applicationStatus: "open",
      profileQuality: "requirements_ready_for_admin_review",
      reviewStatus: "ai_extracted",
      primaryApplicationArtifacts: [
        {
          type: "application_portal",
          label: "Apply online",
          url: "https://program.example.com/apply",
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
        },
        {
          id: "site_address",
          label: "Site address",
          requirementType: "field",
          required: true,
          sourceUrl: "https://program.example.com/apply",
          evidenceSnippet: "Applicant must provide site address.",
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
      applicationSteps: ["Open the application portal.", "Upload required documents.", "Review and submit."],
      evidence: [],
      qualityWarnings: [],
      ...overrides
    },
    { statusMode: "draft" }
  );
}

describe("ApplicationProfileRegistry", () => {
  it("normalizes AI draft profiles with stable registry keys", () => {
    const profile = readyProfile();

    expect(profile.profileId).toMatch(/^application_profile_/);
    expect(profile.stateScope).toBe("applicationProfile");
    expect(profile.reviewStatus).toBe("ai_extracted");
    expect(profile.requiredFields).toHaveLength(2);
  });

  it("imports current first-10 audit drafts when available", async () => {
    const audit = JSON.parse(await fs.readFile("APPLICATION_PREP_FIRST_10_AFTER_FIX.json", "utf8"));
    const profiles = extractDraftProfilesFromFirstTenAudit(audit);

    expect(profiles.length).toBeGreaterThan(0);
    expect(profiles[0].profileId).toMatch(/^application_profile_/);
    expect(["ai_extracted", "needs_review", "needs_targeted_cleanup"]).toContain(profiles[0].reviewStatus);
  });

  it("applies admin edit patches without changing protected identity fields", () => {
    const profile = readyProfile();
    const patched = applyApplicationProfileAdminPatch(profile, {
      opportunityId: "opp_hacked",
      profileId: "profile_hacked",
      applicationStatus: "needs_review",
      adminNotes: "Admin corrected status.",
      requiredFields: []
    });

    expect(patched.profileId).toBe(profile.profileId);
    expect(patched.opportunityId).toBe(profile.opportunityId);
    expect(patched.applicationStatus).toBe("needs_review");
    expect(patched.adminNotes).toBe("Admin corrected status.");
    expect(patched.requiredFields).toEqual([]);
  });
});

describe("ApplicationProfileApprovalValidator", () => {
  it("allows approval for clean ready profiles with evidence and primary artifacts", () => {
    const profile = readyProfile();
    const validation = validateApplicationProfileApproval(profile, {
      confirmation: true,
      adminNote: "Reviewed evidence."
    });

    expect(validation.allowed).toBe(true);
  });

  it("blocks Duke-style JavaScript-blocked profiles", () => {
    const profile = readyProfile({
      opportunityId: "opp_duke_blocked",
      applicationStatus: "source_unreadable_or_js_required",
      profileQuality: "source_unreadable_or_js_required",
      requiredFields: [],
      requiredDocuments: [],
      primaryApplicationArtifacts: []
    });

    const validation = validateApplicationProfileApproval(profile, { confirmation: true, adminNote: "Reviewed." });
    expect(validation.allowed).toBe(false);
    expect(validation.errors.join(" ")).toMatch(/source_unreadable_or_js_required/i);
  });

  it("blocks NextZero-style needs-user-selection profiles", () => {
    const profile = readyProfile({
      opportunityId: "opp_nextzero_selection",
      applicationStatus: "needs_user_selection",
      profileQuality: "needs_user_selection",
      requiredFields: [],
      requiredDocuments: [],
      primaryApplicationArtifacts: []
    });

    const validation = validateApplicationProfileApproval(profile, { confirmation: true, adminNote: "Reviewed." });
    expect(validation.allowed).toBe(false);
    expect(validation.errors.join(" ")).toMatch(/needs_user_selection/i);
  });

  it("blocks Illinois-style needs-manual-review profiles", () => {
    const profile = readyProfile({
      opportunityId: "opp_illinois_manual",
      profileQuality: "needs_manual_review"
    });

    const validation = validateApplicationProfileApproval(profile, { confirmation: true, adminNote: "Reviewed." });
    expect(validation.allowed).toBe(false);
    expect(validation.errors.join(" ")).toMatch(/needs_manual_review/i);
  });

  it("allows Maryland-style closed profiles only as reference-only", () => {
    const profile = readyProfile({
      opportunityId: "opp_maryland_closed",
      applicationStatus: "funding_exhausted",
      profileQuality: "closed_but_profile_extractable"
    });

    expect(validateApplicationProfileApproval(profile, { confirmation: true, adminNote: "Reviewed." }).allowed).toBe(false);
    expect(
      validateApplicationProfileApproval(profile, {
        confirmation: true,
        adminNote: "Reviewed as closed reference.",
        approveAsReferenceOnly: true
      }).allowed
    ).toBe(true);
  });

  it("blocks rejected profiles from becoming customer-ready", () => {
    const profile = { ...readyProfile(), reviewStatus: "rejected" };
    const validation = validateApplicationProfileApproval(profile, { confirmation: true, adminNote: "Reviewed." });

    expect(validation.allowed).toBe(false);
    expect(isApplicationProfileCustomerReady(profile)).toBe(false);
  });

  it("blocks system validation evidence and missing primary artifacts", () => {
    const profile = readyProfile({
      primaryApplicationArtifacts: [],
      requiredFields: [
        {
          id: "phone",
          label: "Phone",
          requirementType: "field",
          required: true,
          sourceUrl: "https://forms.example.com",
          evidenceSnippet: '"invalidinitialphone":"Enter a phone number"',
          confidence: "High"
        }
      ],
      requiredDocuments: []
    });

    const validation = validateApplicationProfileApproval(profile, { confirmation: true, adminNote: "Reviewed." });
    expect(validation.allowed).toBe(false);
    expect(validation.errors.join(" ")).toMatch(/validation|primary application artifact/i);
  });

  it("does not add a customer-facing Prepare Application route", async () => {
    const routes = await fs.readFile("src/routes.ts", "utf8");
    expect(routes).not.toMatch(/prepare-application/i);
  });
});
