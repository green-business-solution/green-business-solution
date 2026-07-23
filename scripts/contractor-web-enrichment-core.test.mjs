import { describe, expect, it } from "vitest";

import {
  buildContractorIdentityIndices,
  buildIdentityRecord,
  buildPilotAudit,
  chooseInternalCrawlLinks,
  extractWebsiteFields,
  fieldsNeedingEnrichment,
  generateCandidateDomains,
  isUsableContractor,
  matchOsmRecord,
  scoreDomainIdentity,
  selectStratifiedPilot,
} from "./contractor-web-enrichment-core.mjs";

describe("contractor web-enrichment scope and selection", () => {
  it("uses only exact CLEAR licenses with mapped retrofits", () => {
    expect(
      isUsableContractor({
        licenseStatus: "CLEAR",
        supportedRetrofitIds: ["heat_pump_retrofit"],
      }),
    ).toBe(true);
    expect(
      isUsableContractor({
        licenseStatus: "CLEAR | WC Susp Pending",
        supportedRetrofitIds: ["heat_pump_retrofit"],
      }),
    ).toBe(false);
    expect(
      isUsableContractor({
        licenseStatus: "CLEAR",
        supportedRetrofitIds: [],
      }),
    ).toBe(false);
  });

  it("never treats an existing UNKNOWN value as missing", () => {
    expect(
      fieldsNeedingEnrichment({
        email: "public@example.test",
        servesCommercial: "UNKNOWN",
        servesResidential: "UNKNOWN",
        serviceAreas: ["Bay Area"],
      }),
    ).toEqual([]);
  });

  it("selects a deterministic pilot and retains known-domain records", () => {
    const identities = Array.from({ length: 20 }, (_, index) =>
      identity({
        contractorId: `CA_CSLB_${String(index).padStart(6, "0")}`,
        businessName: `Example ${index} HVAC`,
        county: index % 2 ? "Alameda" : "Los Angeles",
        classification: index % 2 ? "C-20" : "C-10",
      }),
    );
    const known = new Set([
      identities[3].contractorId,
      identities[17].contractorId,
    ]);
    const selected = selectStratifiedPilot({
      identities,
      knownDomainContractorIds: known,
      pilotSize: 10,
      seed: "fixed-seed",
    });
    const repeated = selectStratifiedPilot({
      identities,
      knownDomainContractorIds: known,
      pilotSize: 10,
      seed: "fixed-seed",
    });

    expect(selected).toEqual(repeated);
    expect(selected.map((value) => value.contractorId)).toEqual(
      expect.arrayContaining([...known]),
    );
  });
});

describe("candidate generation and deterministic OpenStreetMap matching", () => {
  it("preserves aliases and produces a bounded strong candidate set", () => {
    const value = buildIdentityRecord({
      aliases: ["Acme Comfort Systems", "Acme HVAC"],
      contractor: contractor(),
    });
    const candidates = generateCandidateDomains(value, {
      limit: 12,
      mode: "fast",
    });

    expect(value.businessNameAliases).toEqual(
      expect.arrayContaining([
        "Acme Mechanical LLC",
        "Acme Comfort Systems",
        "Acme HVAC",
      ]),
    );
    expect(candidates.length).toBeLessThanOrEqual(12);
    expect(candidates).toContain("acmehvac.com");
    expect(candidates).toContain("acmecomfortsystems.net");
    expect(candidates).toContain("acmecomfortsystems.org");
    expect(candidates).toContain("acmecomfortsystems.co");
  });

  it("uses the required exact OpenStreetMap matching order", () => {
    const first = identity({
      contractorId: "CA_CSLB_100001",
      businessName: "Acme Mechanical",
    });
    const second = identity({
      contractorId: "CA_CSLB_100002",
      businessName: "Different Electric",
      phone: "4155550199",
    });
    const indices = buildContractorIdentityIndices([first, second]);

    expect(
      matchOsmRecord({
        contractorIndices: indices,
        osmRecord: {
          name: "Unrelated label",
          phone: "(510) 555-0100",
        },
      }),
    ).toMatchObject({
      status: "matched",
      method: "exact_phone",
      identity: { contractorId: "CA_CSLB_100001" },
    });
    expect(
      matchOsmRecord({
        contractorIndices: indices,
        osmRecord: {
          name: "Acme Mechanical",
          postalCode: "94612",
        },
      }),
    ).toMatchObject({
      status: "matched",
      method: "exact_name_zip",
    });
  });
});

describe("website identity validation and extraction", () => {
  it("does not accept a website from name similarity alone", () => {
    const result = scoreDomainIdentity({
      homepageText:
        "Acme Mechanical provides professional solutions.",
      identity: identity(),
      seed: {
        sourceType: "candidate_generation",
        matchMethod: "generated_from_cslb_identity",
      },
    });

    expect(result.accepted).toBe(false);
    expect(result.disposition).toBe("AMBIGUOUS_DOMAIN");
  });

  it("requires durable location or an exact source seed for a combined match", () => {
    const value = identity();
    const cityOnly = scoreDomainIdentity({
      homepageText:
        "Acme Mechanical provides HVAC services throughout Oakland.",
      identity: value,
      seed: {
        sourceType: "candidate_generation",
        matchMethod: "generated_from_cslb_identity",
      },
    });
    const exactOsmSeed = scoreDomainIdentity({
      homepageText:
        "Acme Mechanical provides HVAC services throughout Oakland.",
      identity: value,
      seed: {
        sourceType: "openstreetmap",
        matchMethod: "exact_phone",
      },
    });

    expect(cityOnly.accepted).toBe(false);
    expect(cityOnly.disposition).toBe("AMBIGUOUS_DOMAIN");
    expect(exactOsmSeed.accepted).toBe(true);
  });

  it("accepts exact license or phone evidence and rejects a conflicting license", () => {
    const value = identity();
    expect(
      scoreDomainIdentity({
        homepageText:
          "Acme Mechanical. California contractor license #123456.",
        identity: value,
        seed: {},
      }).accepted,
    ).toBe(true);
    expect(
      scoreDomainIdentity({
        homepageText:
          "Acme Mechanical HVAC in Oakland. Call (510) 555-0100.",
        identity: value,
        seed: {},
      }).accepted,
    ).toBe(true);
    expect(
      scoreDomainIdentity({
        homepageText:
          "Acme Mechanical HVAC in Oakland. Contractor license #999999.",
        identity: value,
        seed: {},
      }).accepted,
    ).toBe(false);
  });

  it("extracts only explicit missing values with bounded evidence", () => {
    const value = identity();
    const page = {
      url: "https://acmemechanical.com/contact",
      retrievedAt: "2026-07-23T20:00:00.000Z",
      text:
        "We provide commercial HVAC and residential services. We proudly serve Oakland, Berkeley, and Alameda County. Contact info@acmemechanical.com.",
      emails: [
        {
          value: "info@acmemechanical.com",
          snippet: "Contact info@acmemechanical.com",
        },
        {
          value: "developer@marketing-agency.test",
          snippet: "Site developer",
        },
        {
          value: "95924530.277.4853davinciww@gmail.com",
          snippet: "A phone number concatenated with an email",
        },
      ],
    };
    const extracted = extractWebsiteFields({
      domain: "acmemechanical.com",
      identity: value,
      pages: [page],
      placeReference: {
        cities: ["Berkeley", "Oakland"],
        counties: ["Alameda County"],
      },
    });

    expect(extracted.proposal).toEqual({
      email: "info@acmemechanical.com",
      servesCommercial: "YES",
      servesResidential: "YES",
      serviceAreas: [
        "Alameda County",
        "Berkeley",
        "Oakland",
      ],
    });
    expect(extracted.evidence).toHaveLength(6);
    expect(
      extracted.evidence.every(
        (entry) =>
          entry.sourceUrl === page.url &&
          entry.supportingTextSnippet.length <= 280,
      ),
    ).toBe(true);
  });

  it("does not emit city names nested inside stated regions or counties", () => {
    const extracted = extractWebsiteFields({
      domain: "example.test",
      identity: identity(),
      pages: [
        {
          url: "https://example.test/service-area",
          retrievedAt: "2026-07-23T20:00:00.000Z",
          text: "We proudly serve Orange County and Greater Los Angeles.",
          emails: [],
        },
      ],
      placeReference: {
        cities: ["Los Angeles", "Orange"],
        counties: ["Orange County"],
      },
    });

    expect(extracted.proposal.serviceAreas).toEqual([
      "Greater Los Angeles",
      "Orange County",
    ]);
  });

  it("does not infer customer type from unrelated commercial or residential text", () => {
    const extracted = extractWebsiteFields({
      domain: "example.test",
      identity: identity(),
      pages: [
        {
          url: "https://example.test/privacy",
          retrievedAt: "2026-07-23T20:00:00.000Z",
          text:
            "Our commercial privacy policy was prepared by a residential marketing publisher.",
          emails: [],
        },
      ],
      placeReference: { cities: [], counties: [] },
    });

    expect(extracted.proposal).toEqual({});
  });

  it("rejects a phone number concatenated into a visible email", () => {
    const extracted = extractWebsiteFields({
      domain: "davinciwoodworks.com",
      identity: identity(),
      pages: [
        {
          url: "https://davinciwoodworks.com/contact",
          retrievedAt: "2026-07-23T20:00:00.000Z",
          text:
            "CA 95924530.277.4853davinciww@gmail.com",
          emails: [
            {
              value:
                "95924530.277.4853davinciww@gmail.com",
              snippet:
                "CA 95924530.277.4853davinciww@gmail.com",
            },
          ],
        },
      ],
      placeReference: { cities: [], counties: [] },
    });

    expect(extracted.proposal).toEqual({});
  });

  it("selects only relevant same-domain crawl pages", () => {
    expect(
      chooseInternalCrawlLinks({
        homepageUrl: "https://acmemechanical.com/",
        limit: 3,
        links: [
          { href: "/contact", text: "Contact" },
          { href: "/services", text: "Our Services" },
          { href: "/privacy", text: "Privacy" },
          {
            href: "https://facebook.com/acme",
            text: "Facebook",
          },
        ],
      }),
    ).toEqual([
      "https://acmemechanical.com/contact",
      "https://acmemechanical.com/services",
    ]);
  });
});

describe("pilot audit gate", () => {
  it("audits at least 400 accepted domains and keeps statewide writes disabled", () => {
    const accepted = Array.from({ length: 450 }, (_, index) => ({
      contractorId: `CA_CSLB_${index}`,
      domain: `contractor-${index}.com`,
      discoveryMethod: "candidate_generation",
      proposal: { email: `info@contractor-${index}.com` },
      identityVerification: {
        signals: {
          exactLicense: true,
          exactPhone: false,
          nameStrong: true,
          streetMatch: false,
          zipMatch: false,
          tradeMatch: true,
        },
      },
    }));
    const audit = buildPilotAudit({ acceptedResults: accepted });

    expect(audit.sampleSize).toBeGreaterThanOrEqual(400);
    expect(audit.verifiedDomainPrecision).toBe(1);
    expect(audit.gate).toMatchObject({
      precisionPassed: true,
      requiresHumanReview: true,
      statewideWriteAuthorized: false,
      status: "AWAITING_REVIEW",
    });
  });

  it("does not pass the precision gate without the required audit sample", () => {
    const audit = buildPilotAudit({
      acceptedResults: [
        {
          contractorId: "CA_CSLB_1",
          domain: "contractor.example",
          discoveryMethod: "candidate_generation",
          proposal: {},
          identityVerification: {
            signals: {
              exactLicense: true,
              exactPhone: false,
              nameStrong: true,
              streetMatch: false,
              zipMatch: false,
              tradeMatch: true,
            },
          },
        },
      ],
    });

    expect(audit.sampleRequirementMet).toBe(false);
    expect(audit.gate.precisionPassed).toBe(false);
  });
});

function contractor(overrides = {}) {
  return {
    contractorId: "CA_CSLB_123456",
    licenseNumber: "123456",
    businessName: "Acme Mechanical LLC",
    licenseStatus: "CLEAR",
    licenseClassifications: ["C-20"],
    supportedRetrofitIds: ["heat_pump_retrofit"],
    phone: "(510) 555-0100",
    businessAddress: {
      line1: "100 Main Street",
      city: "Oakland",
      county: "Alameda",
      state: "CA",
      postalCode: "94612",
    },
    ...overrides,
  };
}

function identity({
  businessName = "Acme Mechanical LLC",
  classification = "C-20",
  contractorId = "CA_CSLB_123456",
  county = "Alameda",
  phone = "5105550100",
} = {}) {
  return buildIdentityRecord({
    aliases: [],
    contractor: contractor({
      contractorId,
      businessName,
      licenseClassifications: [classification],
      phone,
      businessAddress: {
        line1: "100 Main Street",
        city: "Oakland",
        county,
        state: "CA",
        postalCode: "94612",
      },
    }),
  });
}
