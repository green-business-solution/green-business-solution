import { describe, expect, it, vi } from "vitest";

import {
  assessCslbIdentity,
  buildCslbBusinessNameQueries,
  businessNamesCompatible,
  parseCslbBusinessNameResults,
  parseCslbLicenseDetail,
} from "./cslb-live-license-resolution.mjs";
import {
  assertAppliedSourceReportTransition,
  buildCandidateIndices,
  buildResolutionQueue,
  prepareIdempotentReplay,
  resolveDirectoryRecord,
  resolveQueue,
  selectVerifiedCandidate,
} from "./resolve-unmatched-directory-contractors.mjs";

const retrievedAt = "2026-07-23T18:00:00.000Z";

function directoryRecord(overrides = {}) {
  return {
    sourceId: "official_directory",
    sourceName: "Official Program Directory",
    sourceUrl: "https://program.example/directory",
    sourceRecordId: "entry-1",
    retrievedAt,
    businessName: "Example Mechanical Inc",
    licenseNumber: "",
    phone: "510-555-0100",
    email: "public@example.com",
    zip: "94612",
    address: {
      line1: "100 Main Street",
      city: "Oakland",
      state: "CA",
      postalCode: "94612",
    },
    commercial: "YES",
    serviceAreas: ["Alameda County"],
    programMemberships: ["official_directory"],
    certifications: [],
    description: "Commercial HVAC installation contractor.",
    sourceText: "",
    ...overrides,
  };
}

function officialDetail(overrides = {}) {
  return {
    found: true,
    licenseNumber: "1113528",
    businessName: "EXAMPLE MECHANICAL INC",
    dbaNames: [],
    businessAddress: {
      line1: "100 MAIN STREET",
      city: "OAKLAND",
      state: "CA",
      postalCode: "94612",
    },
    phone: "(510) 555-0100",
    licenseStatus:
      "This license is current and active. All information below should be reviewed.",
    primaryStatus: "ACTIVE",
    licenseIssueDate: "2022-01-01",
    licenseExpirationDate: "2028-01-31",
    licenseClassifications: ["C-20"],
    classificationNames: [
      "C20 - Warm-Air Heating, Ventilating and Air-Conditioning",
    ],
    usableStatus: true,
    sourceUrl:
      "https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=1113528",
    sourceRecordHash: "a".repeat(64),
    snapshot: {
      contentType: "text/html",
      lookupType: "license_detail",
      queryHash: "b".repeat(64),
      relativePath: "raw/cslb-live/license-1113528.html",
      retrievedAt,
      s3Key:
        "raw/enrichment/cslb-resolution/2026-07-23/aaaaaaaaaaaa-license-1113528.html",
      sha256: "c".repeat(64),
      sizeBytes: 100,
      url:
        "https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=1113528",
    },
    ...overrides,
  };
}

describe("official CSLB response parsing", () => {
  it("parses official business-search candidates", () => {
    const results = parseCslbBusinessNameResults(`
      <table>
        <tr><td id="MainContent_dlMain_lblName_0">EXAMPLE MECHANICAL INC</td></tr>
        <tr><td id="MainContent_dlMain_lblType_0">Business Name</td></tr>
        <tr><td><a id="MainContent_dlMain_hlLicense_0" href="/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=1113528">1113528</a></td></tr>
        <tr><td id="MainContent_dlMain_lblCity_0">OAKLAND</td></tr>
        <tr><td id="MainContent_dlMain_lblLicenseStatus_0">Current and Active</td></tr>
      </table>
    `);

    expect(results).toEqual([
      {
        businessName: "EXAMPLE MECHANICAL INC",
        city: "OAKLAND",
        licenseNumber: "1113528",
        nameType: "Business Name",
        status: "Current and Active",
        url:
          "https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=1113528",
      },
    ]);
  });

  it("parses status, DBA, address, phone, dates, and classifications", () => {
    const detail = parseCslbLicenseDetail(`
      <div id="MainContent_Header2Detail">1113528</div>
      <div id="MainContent_BusInfo">
        EXAMPLE HOLDINGS INC<br>
        DBA EXAMPLE MECHANICAL<br>
        100 MAIN STREET<br>
        OAKLAND, CA 94612<br>
        Business Phone Number: (510) 555-0100
      </div>
      <div id="MainContent_Status">This license is current and active. All information below should be reviewed.</div>
      <div id="MainContent_IssDt">01/01/2022</div>
      <div id="MainContent_ExpDt">01/31/2028</div>
      <table id="MainContent_ClassCellTable">
        <tr><td><a href="DescriptionDetail.aspx?Class=C20">C20 - Warm-Air Heating</a></td></tr>
      </table>
    `);

    expect(detail).toMatchObject({
      found: true,
      licenseNumber: "1113528",
      businessName: "EXAMPLE HOLDINGS INC",
      dbaNames: ["EXAMPLE MECHANICAL"],
      businessAddress: {
        line1: "100 MAIN STREET",
        city: "OAKLAND",
        state: "CA",
        postalCode: "94612",
      },
      phone: "(510) 555-0100",
      primaryStatus: "ACTIVE",
      usableStatus: true,
      licenseIssueDate: "2022-01-01",
      licenseExpirationDate: "2028-01-31",
      licenseClassifications: ["C-20"],
    });
  });

  it("does not establish identity from ZIP or city alone", () => {
    const identity = assessCslbIdentity({
      directoryRecord: directoryRecord({
        businessName: "Different Company",
        phone: "",
        address: {
          line1: "200 Other Street",
          city: "Oakland",
          state: "CA",
          postalCode: "94612",
        },
      }),
      detail: officialDetail(),
      sourceProvidedLicense: true,
    });

    expect(identity.verified).toBe(false);
    expect(identity.conflict).toBe(true);
    expect(identity.corroboratingMatches).toEqual(["zip", "city"]);
  });

  it("builds bounded normalized business-name variants", () => {
    const queries = buildCslbBusinessNameQueries(
      "Example Mechanical Incorporated",
    );

    expect(queries.length).toBeLessThanOrEqual(4);
    expect(queries).toContain("Example Mechanical Incorporated");
    expect(queries).toContain("EXAMPLE MECHANICAL");
  });

  it("accepts strong spelling, DBA, and compact-name variants", () => {
    expect(
      businessNamesCompatible(
        "Air-Co Heat and Air Conditioning",
        "AIR-CO HEATING & AIR CONDITIONING",
      ),
    ).toBe(true);
    expect(
      businessNamesCompatible(
        "AC Master - Master Homes, LLC",
        "AC MASTER",
      ),
    ).toBe(true);
    expect(businessNamesCompatible("SDAC", "S D A C")).toBe(true);
    expect(
      businessNamesCompatible(
        "Carbon Zero Buildings",
        "COASTAL HOME REBOOT",
      ),
    ).toBe(false);
  });
});

describe("directory resolution", () => {
  it("reconstructs exactly the reviewed outcome queue", () => {
    const record = directoryRecord();
    const queue = buildResolutionQueue({
      basePlan: {
        decisions: [
          {
            sourceId: record.sourceId,
            sourceRecordId: record.sourceRecordId,
            businessName: record.businessName,
            disposition: "unmatched",
          },
        ],
      },
      directoryRecords: [record],
      sourceReport: {
        combinedTotals: {
          dispositionCounts: { unmatched: 1 },
        },
      },
    });

    expect(queue).toEqual([
      {
        directoryRecord: record,
        originalDisposition: "unmatched",
      },
    ]);
  });

  it("requires an official detail identity match after business search", async () => {
    const detail = officialDetail();
    const lookupRecorder = {
      searchBusinessName: vi.fn().mockResolvedValue([
        {
          businessName: detail.businessName,
          city: "OAKLAND",
          licenseNumber: detail.licenseNumber,
          status: "Current and Active",
        },
      ]),
      lookupLicense: vi.fn().mockResolvedValue(detail),
    };
    const result = await resolveDirectoryRecord({
      candidateIndices: buildCandidateIndices([]),
      directoryRecord: directoryRecord(),
      lookupRecorder,
    });

    expect(result.category).toBe("resolved");
    expect(result.verifiedDetail.licenseNumber).toBe("1113528");
    expect(result.identity.corroboratingMatches).toEqual([
      "business_name",
      "phone",
      "address",
      "zip",
      "city",
    ]);
  });

  it("uses corroborating location evidence to disambiguate licenses", () => {
    const selected = selectVerifiedCandidate([
      {
        detail: officialDetail({ licenseNumber: "1111111" }),
        identity: {
          corroboratingMatches: ["business_name"],
        },
      },
      {
        detail: officialDetail({ licenseNumber: "2222222" }),
        identity: {
          corroboratingMatches: [
            "business_name",
            "address",
            "zip",
            "city",
          ],
        },
      },
    ]);

    expect(selected.detail.licenseNumber).toBe("2222222");
  });

  it("proposes a mapped contractor row with directory enrichment", async () => {
    const detail = officialDetail();
    const lookupRecorder = {
      snapshots: [detail.snapshot],
      searchBusinessName: vi.fn().mockResolvedValue([
        {
          businessName: detail.businessName,
          city: "OAKLAND",
          licenseNumber: detail.licenseNumber,
          status: "Current and Active",
        },
      ]),
      lookupLicense: vi.fn().mockResolvedValue(detail),
    };
    const resolution = await resolveQueue({
      cslbRecords: [],
      existingContractors: [],
      lookupRecorder,
      mapping: new Map([
        [
          "C-20",
          {
            classificationCode: "C-20",
            retrofitIds: ["heat_pump_hvac_retrofit"],
          },
        ],
      ]),
      queue: [
        {
          directoryRecord: directoryRecord(),
          originalDisposition: "unmatched",
        },
      ],
      startedAt: retrievedAt,
    });

    expect(resolution.newItems).toHaveLength(1);
    expect(resolution.newItems[0]).toMatchObject({
      schemaVersion: "retrofi-contractor.v1",
      contractorId: "CA_CSLB_1113528",
      businessName: "EXAMPLE MECHANICAL INC",
      matchedClassificationCodes: ["C-20"],
      supportedRetrofitIds: ["heat_pump_hvac_retrofit"],
      email: "public@example.com",
      servesCommercial: "YES",
      serviceAreas: ["Alameda County"],
      programMemberships: ["official_directory"],
    });
    expect(resolution.updates).toHaveLength(0);
  });

  it("enriches an existing alternate identity without changing CSLB fields", async () => {
    const detail = officialDetail();
    const existing = {
      schemaVersion: "retrofi-contractor.v1",
      contractorId: "CA_CSLB_1113528",
      licenseNumber: "1113528",
      businessName: "EXAMPLE MECHANICAL INC",
      licenseClassifications: ["C-20"],
      matchedClassificationCodes: ["C-20"],
      supportedRetrofitIds: ["heat_pump_hvac_retrofit"],
    };
    const resolution = await resolveQueue({
      cslbRecords: [],
      existingContractors: [existing],
      lookupRecorder: {
        snapshots: [detail.snapshot],
        searchBusinessName: vi.fn().mockResolvedValue([
          {
            businessName: detail.businessName,
            city: "OAKLAND",
            licenseNumber: detail.licenseNumber,
            status: "Current and Active",
          },
        ]),
        lookupLicense: vi.fn().mockResolvedValue(detail),
      },
      mapping: new Map([
        [
          "C-20",
          {
            classificationCode: "C-20",
            retrofitIds: ["heat_pump_hvac_retrofit"],
          },
        ],
      ]),
      queue: [
        {
          directoryRecord: directoryRecord(),
          originalDisposition: "ambiguous_existing_match",
        },
      ],
      startedAt: retrievedAt,
    });

    expect(resolution.newItems).toHaveLength(0);
    expect(resolution.updates).toHaveLength(1);
    expect(resolution.updates[0].set).toMatchObject({
      email: "public@example.com",
      servesCommercial: "YES",
    });
    expect(resolution.updates[0].set).not.toHaveProperty(
      "supportedRetrofitIds",
    );
    expect(resolution.outcomes[0].category).toBe(
      "existing_alternate_identity",
    );
  });
});

describe("guarded idempotent write replay", () => {
  it("accepts only an exact successful Pass 2 write transition", () => {
    const reviewedReport = {
      sourceDryRunArtifact: {
        runId: "directory-enrichment-reviewed",
        proposalHash: "approved-proposal",
      },
    };
    const report = {
      schemaVersion: "contractor-directory-enrichment-report.v1",
      runId: "directory-enrichment-reviewed",
      mode: "write",
      proposalHash: "approved-proposal",
      dryRunConfirmedZeroAwsWrites: false,
      combinedTotals: {
        proposedCslbPatchUpdates: 207_903,
        proposedNewContractors: 0,
      },
      writeSummary: {
        awsWriteCount: 207_920,
        insertedContractorCount: 0,
        updatedContractorCount: 207_903,
      },
      awsWriteCount: 207_920,
    };

    expect(() =>
      assertAppliedSourceReportTransition({
        report,
        reviewedReport,
      }),
    ).not.toThrow();
    expect(() =>
      assertAppliedSourceReportTransition({
        report: {
          ...report,
          writeSummary: {
            ...report.writeSummary,
            updatedContractorCount: 207_902,
          },
        },
        reviewedReport,
      }),
    ).toThrow(/not an exact successful application/);
  });

  it("skips exact prior inserts and exact prior updates", () => {
    const existing = {
      contractorId: "CA_CSLB_1113528",
      email: "public@example.com",
    };
    const replay = prepareIdempotentReplay({
      existingContractors: [existing],
      newItems: [existing],
      updates: [
        {
          contractorId: existing.contractorId,
          expected: { email: undefined },
          set: { email: "public@example.com" },
        },
      ],
    });

    expect(replay.alreadyAppliedNewItems).toEqual([
      "CA_CSLB_1113528",
    ]);
    expect(replay.alreadyAppliedUpdates).toEqual([
      "CA_CSLB_1113528",
    ]);
    expect(replay.newItemsToInsert).toHaveLength(0);
    expect(replay.updatesToApply).toHaveLength(0);
  });

  it("preserves Pass 2 values while applying approved additive deltas", () => {
    const pass2Evidence = {
      field: "email",
      matchMethod: "license",
      sourceId: "pass2",
      sourceName: "Pass 2 Directory",
      sourceUrl: "https://example.com/pass2",
      sourceValue: "pass2@example.com",
      verificationDate: "2026-07-23",
    };
    const resolutionEmailEvidence = {
      ...pass2Evidence,
      sourceId: "resolution",
      sourceName: "Resolution Directory",
      sourceUrl: "https://example.com/resolution",
      sourceValue: "resolution@example.com",
    };
    const resolutionProgramEvidence = {
      ...resolutionEmailEvidence,
      field: "programMemberships",
      sourceValue: "resolution_program",
    };
    const replay = prepareIdempotentReplay({
      existingContractors: [
        {
          contractorId: "CA_CSLB_1113528",
          email: "pass2@example.com",
          enrichmentEvidence: [pass2Evidence],
          programMemberships: ["pass2_program"],
        },
      ],
      newItems: [],
      updates: [
        {
          contractorId: "CA_CSLB_1113528",
          expected: {},
          set: {
            email: "resolution@example.com",
            enrichmentEvidence: [
              resolutionEmailEvidence,
              resolutionProgramEvidence,
            ],
            programMemberships: ["resolution_program"],
          },
        },
      ],
    });

    expect(replay.fieldConflicts).toEqual([
      {
        contractorId: "CA_CSLB_1113528",
        field: "email",
      },
    ]);
    expect(replay.updatesToApply).toHaveLength(1);
    expect(replay.updatesToApply[0].set).not.toHaveProperty("email");
    expect(
      replay.updatesToApply[0].set.programMemberships,
    ).toEqual(["pass2_program", "resolution_program"]);
    expect(
      replay.updatesToApply[0].set.enrichmentEvidence,
    ).toEqual([pass2Evidence, resolutionProgramEvidence]);
  });

  it("deduplicates evidence by the canonical repository key", () => {
    const pass2Evidence = {
      field: "programMemberships",
      matchMethod: "name_zip",
      sourceId: "shared_source",
      sourceName: "Shared Directory",
      sourceUrl: "https://example.com/shared",
      sourceValue: "shared_program",
      verificationDate: "2026-07-23",
    };
    const approvedEvidence = {
      ...pass2Evidence,
      matchMethod: "official_cslb_name_search_and_detail",
    };
    const replay = prepareIdempotentReplay({
      existingContractors: [
        {
          contractorId: "CA_CSLB_1113528",
          enrichmentEvidence: [pass2Evidence],
        },
      ],
      newItems: [],
      updates: [
        {
          contractorId: "CA_CSLB_1113528",
          expected: {},
          set: {
            enrichmentEvidence: [approvedEvidence],
          },
        },
      ],
    });

    expect(
      replay.updatesToApply[0].set.enrichmentEvidence,
    ).toEqual([approvedEvidence]);
  });

  it("refuses to overwrite a conflicting contractor ID", () => {
    expect(() =>
      prepareIdempotentReplay({
        existingContractors: [
          {
            contractorId: "CA_CSLB_1113528",
            businessName: "Existing Identity",
          },
        ],
        newItems: [
          {
            contractorId: "CA_CSLB_1113528",
            businessName: "Different Identity",
          },
        ],
        updates: [],
      }),
    ).toThrow(/Refusing to overwrite existing contractor ID/);
  });
});
