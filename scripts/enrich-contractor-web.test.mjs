import { describe, expect, it } from "vitest";

import {
  buildIdentityRecord,
  extractWebsiteFields,
  scoreDomainIdentity,
} from "./contractor-web-enrichment-core.mjs";
import {
  applyReviewedLicenseTransition,
  parseHtmlPage,
  runContractorWebEnrichment,
} from "./enrich-contractor-web.mjs";

describe("contractor website HTML email extraction", () => {
  it("prefers an isolated email node over an adjacent navigation label", () => {
    const page = parseHtmlPage(
      htmlPage(`
        <html>
          <body>
            <nav><span>Use tab to navigate through the menu items.</span></nav>
            <span>rodney@norcalchimneyservice.com</span>
          </body>
        </html>
      `),
    );
    const extracted = extractWebsiteFields({
      domain: "norcalchimneyservice.com",
      identity: identity(),
      pages: [page],
      placeReference: { cities: [], counties: [] },
    });

    expect(extracted.proposal.email).toBe(
      "rodney@norcalchimneyservice.com",
    );
  });

  it("does not retain form labels concatenated into a Gmail address", () => {
    const page = parseHtmlPage(
      htmlPage(`
        <html>
          <body>
            <label>Your email*</label><label>Message*</label>
            <button>Submit</button><span>Contacts</span>
            <span>empirefenixpainting09@gmail.com</span>
          </body>
        </html>
      `),
    );
    const extracted = extractWebsiteFields({
      domain: "empirefenixpainting.com",
      identity: identity(),
      pages: [page],
      placeReference: { cities: [], counties: [] },
    });

    expect(extracted.proposal.email).toBe(
      "empirefenixpainting09@gmail.com",
    );
    expect(extracted.proposal.email).not.toContain("submit");
  });

  it("retains a displayed license from embedded page data for identity checks", () => {
    const page = parseHtmlPage(
      htmlPage(`
        <html>
          <body>Pro Star Mechanical Services. Call 714-999-1177.</body>
          <script>
            window.business = {
              footer: "CA Contractor License #1044879"
            };
          </script>
        </html>
      `),
    );
    const contractorIdentity = buildIdentityRecord({
      aliases: [],
      contractor: {
        businessAddress: {
          city: "Anaheim",
          line1: "2643 W Woodland Drive",
          postalCode: "92801",
          state: "CA",
        },
        businessName: "Pro Star Mechanical Services",
        contractorId: "CA_CSLB_936846",
        licenseClassifications: ["C-20"],
        licenseNumber: "936846",
        licenseStatus: "CLEAR",
        phone: "7149991177",
        supportedRetrofitIds: ["hvac_controls_retrofit"],
      },
    });
    const verification = scoreDomainIdentity({
      homepageText: page.identityText,
      identity: contractorIdentity,
      seed: {},
    });

    expect(verification).toMatchObject({
      accepted: false,
      disposition: "LICENSE_TRANSITION_REVIEW",
      websiteLicenseNumbers: ["1044879"],
    });

    const currentLicensePage = parseHtmlPage(
      htmlPage(`
        <html>
          <body>Pro Star Mechanical Services.</body>
          <script>
            window.business = {
              footer: "CSLB License #936846"
            };
          </script>
        </html>
      `),
    );
    expect(
      scoreDomainIdentity({
        homepageText: currentLicensePage.identityText,
        identity: contractorIdentity,
        seed: {},
      }),
    ).toMatchObject({
      accepted: true,
      confidenceTier: "TIER_A_EXACT_LICENSE",
    });

    const genericLicensePage = parseHtmlPage(
      htmlPage(`
        <html>
          <body>Pro Star Mechanical Services.</body>
          <script>window.library = "software license 1044879";</script>
        </html>
      `),
    );
    expect(genericLicensePage.identityText).not.toContain(
      "1044879",
    );
  });

  it("quarantines a reviewed transition when the current page still matches the business", () => {
    const contractorIdentity = buildIdentityRecord({
      aliases: [],
      contractor: {
        businessAddress: {
          city: "San Marino",
          line1: "2158 Huntington Drive",
          postalCode: "91108",
          state: "CA",
        },
        businessName: "Willbii Inc",
        contractorId: "CA_CSLB_1108001",
        licenseClassifications: ["B"],
        licenseNumber: "1108001",
        licenseStatus: "CLEAR",
        phone: "6268088766",
        supportedRetrofitIds: ["building_envelope_retrofit"],
      },
    });
    const verification = scoreDomainIdentity({
      homepageText:
        "Willbii Inc. Call 626-808-8766. Construction services in San Marino.",
      identity: contractorIdentity,
      seed: {},
    });

    const quarantined = applyReviewedLicenseTransition({
      domain: "www.willbii.net",
      identity: contractorIdentity,
      verification,
    });
    expect(quarantined).toMatchObject({
      accepted: false,
      disposition: "LICENSE_TRANSITION_REVIEW",
      reviewSource:
        "contractor-web-enrichment-manual-audit-regressions.v1",
      websiteLicenseNumbers: ["1113528"],
    });
    expect(
      applyReviewedLicenseTransition({
        domain: "another-contractor.net",
        identity: contractorIdentity,
        verification,
      }),
    ).toBe(verification);
    expect(
      applyReviewedLicenseTransition({
        domain: "willbii.net",
        identity: contractorIdentity,
        verification: {
          accepted: false,
          ambiguous: false,
          disposition: "REJECTED_DOMAIN",
          signals: {},
        },
      }),
    ).toMatchObject({
      disposition: "REJECTED_DOMAIN",
    });
  });
});

describe("contractor web-enrichment write safety", () => {
  it("fails closed before creating any AWS client when write mode is requested", async () => {
    await expect(
      runContractorWebEnrichment({
        profile: "retrofi-prod",
        scope: "full",
        write: true,
      }),
    ).rejects.toThrow("DynamoDB write mode is intentionally unavailable");
  });
});

function htmlPage(html) {
  return {
    finalUrl: "https://example.test/",
    html,
    retrievedAt: "2026-07-23T20:00:00.000Z",
    status: 200,
  };
}

function identity() {
  return buildIdentityRecord({
    aliases: [],
    contractor: {
      businessAddress: {
        city: "Oakland",
        line1: "100 Main Street",
        postalCode: "94612",
        state: "CA",
      },
      businessName: "Example Contractor",
      contractorId: "CA_CSLB_123456",
      licenseClassifications: ["B"],
      licenseNumber: "123456",
      licenseStatus: "CLEAR",
      phone: "5105550100",
      supportedRetrofitIds: ["led_lighting_retrofit"],
    },
  });
}
