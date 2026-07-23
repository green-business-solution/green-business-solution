import { describe, expect, it } from "vitest";

import {
  buildIdentityRecord,
  extractWebsiteFields,
} from "./contractor-web-enrichment-core.mjs";
import {
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
