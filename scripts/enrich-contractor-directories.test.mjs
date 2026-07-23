import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it, vi } from "vitest";

import {
  parseBpiCompanies,
  parseSocalGas,
  parseSocalRenTradeAllies,
} from "./contractor-directory-sources.mjs";
import {
  ENRICHMENT_REPORT_SCHEMA_VERSION,
  buildExactIndices,
  matchExact,
  planConsolidation,
  runContractorDirectoryConsolidation,
} from "./enrich-contractor-directories.mjs";

const fetchedAt = "2026-07-23T18:00:00.000Z";
const fixturePath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "__fixtures__/cslb-master-license-sample.csv",
);

function context(id, name = id) {
  return {
    fetchedAt,
    pageUrl: `https://official.example/${id}`,
    source: { id, name, url: `https://official.example/${id}` },
  };
}

describe("official contractor directory parsing", () => {
  it("extracts allowed SoCalGas fields and explicit commercial sectors", () => {
    const records = parseSocalGas(
      `<div class="vendor-card">
        <div class="vendor-name-link">Example Energy, Inc.</div>
        <div><div class="vendor-header">Contact Information</div>
          <a href="tel:510-555-0100">Phone</a>
          <a href="mailto:INFO@EXAMPLE.COM">Email</a>
          <span class="address-line1">100 Main St</span>
          <span class="locality">Oakland</span>
          <span class="administrative-area">CA</span>
          <span class="postal-code">94612</span>
        </div>
        <div><div class="vendor-header">Sectors</div>Commercial, Industrial</div>
      </div>`,
      context("socalgas_trade_pro"),
    );

    expect(records).toHaveLength(1);
    expect(records[0]).toMatchObject({
      businessName: "Example Energy, Inc.",
      commercial: "YES",
      email: "info@example.com",
      phone: "510-555-0100",
      programMemberships: ["socalgas_trade_pro"],
    });
    expect(records[0]).not.toHaveProperty("website");
  });

  it("extracts explicit SoCalREN service areas and commercial evidence", () => {
    const records = parseSocalRenTradeAllies(
      `<div class="views-row">
        <div class="views-field-webform-submission-value-1"><h3>Example HVAC</h3></div>
        <div class="views-field-webform-submission-value-5"><a href="tel:2135550100">Phone</a></div>
        <div class="views-field-webform-submission-value-4"><a href="mailto:team@example.com">Email</a></div>
        <div class="views-field-webform-submission-value"><span class="field-content">Licensed commercial HVAC contractor.</span></div>
        <div class="views-field-webform-submission-value-7"><span class="field-content">Los Angeles County, Orange County</span></div>
      </div>`,
      context("socalren_trade_ally"),
    );

    expect(records[0].commercial).toBe("YES");
    expect(records[0].serviceAreas).toEqual([
      "Los Angeles County",
      "Orange County",
    ]);
  });

  it("processes BPI company cards but not individual professionals", () => {
    const records = parseBpiCompanies(
      `<div class="search-result-outer" id="company-1">
        <h4><div class="title-goldstar">BPI GoldStar Contractor</div>Example Performance, Inc.</h4>
        <span class="search-result-cert-item" title="Building Analyst - Professional">BA-P</span>
        <a class="search-result-phone" href="tel:9165550100">Phone</a>
        <a class="search-result-email" href="mailto:bpi@example.com">Email</a>
      </div>
      <div class="search-result-outer" id="person-1">
        <h4><div class="title-certified">Certified Professional</div>Jane Person</h4>
      </div>`,
      context("bpi_certified_company"),
    );

    expect(records).toHaveLength(1);
    expect(records[0].businessName).toBe("Example Performance, Inc.");
    expect(records[0].certifications).toEqual([
      {
        issuer: "Building Performance Institute",
        name: "Building Analyst - Professional",
      },
    ]);
  });
});

describe("deterministic contractor matching and consolidation", () => {
  const existing = {
    contractorId: "CA_CSLB_123456",
    licenseNumber: "123456",
    businessName: "Example Energy Inc",
    phone: "(510) 555-0100",
    businessAddress: {
      line1: "100 Main Street",
      city: "Oakland",
      state: "CA",
      postalCode: "94612",
    },
    supportedRetrofitIds: ["led_lighting_retrofit"],
  };

  it("uses the required exact matching order and rejects ambiguous exact matches", () => {
    const indices = buildExactIndices([
      existing,
      {
        ...existing,
        contractorId: "CA_CSLB_999999",
        licenseNumber: "999999",
      },
    ]);
    expect(
      matchExact({ licenseNumber: "123456", phone: "5105550100" }, indices),
    ).toMatchObject({
      status: "matched",
      method: "license",
      record: { contractorId: "CA_CSLB_123456" },
    });
    expect(
      matchExact({ phone: "510-555-0100" }, indices),
    ).toMatchObject({
      status: "ambiguous",
      method: "phone",
    });
  });

  it("backfills CSLB fields, enriches missing fields, and preserves retrofit support", () => {
    const raw = {
      licenseNumber: "123456",
      businessName: "Example Energy Inc",
      licenseStatus: "CLEAR",
      primaryStatus: "CLEAR",
      secondaryStatus: "",
      pendingSuspension: "N",
      pendingClassRemoval: "N",
      pendingClassReplace: "N",
      businessAddress: {
        line1: "100 Main Street",
        city: "Oakland",
        state: "CA",
        county: "Alameda",
        postalCode: "94612",
      },
      phone: "(510) 555-0100",
      licenseClassifications: ["C-10"],
      sourceRowHashes: ["hash"],
    };
    const directory = {
      sourceId: "socalgas_trade_pro",
      sourceName: "SoCalGas Trade Professional Directory",
      sourceUrl: "https://official.example/directory",
      sourceRecordId: "entry-1",
      retrievedAt: fetchedAt,
      businessName: "Example Energy Inc",
      licenseNumber: "123456",
      phone: "5105550100",
      email: "public@example.com",
      commercial: "YES",
      serviceAreas: [],
      programMemberships: ["socalgas_trade_pro"],
      certifications: [],
    };
    const mapping = new Map([
      [
        "C-10",
        {
          classificationCode: "C-10",
          retrofitIds: ["led_lighting_retrofit"],
        },
      ],
    ]);

    const plan = planConsolidation({
      cslbContext: {
        importId: "cslb-test",
        importedAt: fetchedAt,
        s3SourceKey: "raw/cslb/test.csv",
        sourceReceivedAt: fetchedAt,
      },
      cslbRecords: [raw],
      directoryRecords: [directory],
      existingContractors: [existing],
      mapping,
    });

    expect(plan.newItems).toHaveLength(0);
    expect(plan.updates).toHaveLength(1);
    expect(plan.updates[0].set).toMatchObject({
      email: "public@example.com",
      servesCommercial: "YES",
      primaryStatus: "CLEAR",
      pendingSuspension: "N",
      pendingClassRemoval: "N",
      pendingClassReplace: "N",
      businessAddress: {
        county: "Alameda",
      },
      programMemberships: ["socalgas_trade_pro"],
    });
    expect(plan.updates[0].set).not.toHaveProperty("supportedRetrofitIds");
    expect(plan.updates[0].set).not.toHaveProperty("verifiedRetrofitIds");
    expect(plan.updates[0].set.enrichmentEvidence[0].matchMethod).toBe(
      "license",
    );
  });

  it("only proposes new rows for clear, mapped CSLB licenses", () => {
    const rawBase = {
      businessAddress: { postalCode: "95814" },
      licenseStatus: "CLEAR",
      primaryStatus: "CLEAR",
      secondaryStatus: "",
      phone: "",
      sourceRowHashes: ["hash"],
    };
    const cslbRecords = [
      {
        ...rawBase,
        licenseNumber: "200001",
        businessName: "Clear Mapped Contractor",
        licenseClassifications: ["C-10"],
      },
      {
        ...rawBase,
        licenseNumber: "200002",
        businessName: "Suspended Contractor",
        primaryStatus: "SUSPENDED",
        licenseClassifications: ["C-10"],
      },
      {
        ...rawBase,
        licenseNumber: "200003",
        businessName: "Unmapped Contractor",
        licenseClassifications: ["C-15"],
      },
    ];
    const directoryRecords = cslbRecords.map((record) => ({
      sourceId: "tech_clean_california",
      sourceName: "TECH Clean California",
      sourceUrl: "https://official.example/tech.xlsx",
      sourceRecordId: record.licenseNumber,
      retrievedAt: fetchedAt,
      businessName: record.businessName,
      licenseNumber: record.licenseNumber,
      email: "",
      commercial: "",
      serviceAreas: [],
      programMemberships: ["tech_clean_california"],
      certifications: [],
    }));
    const mapping = new Map([
      [
        "C-10",
        {
          classificationCode: "C-10",
          retrofitIds: ["led_lighting_retrofit"],
        },
      ],
    ]);

    const plan = planConsolidation({
      cslbContext: {
        importId: "cslb-test",
        importedAt: fetchedAt,
        s3SourceKey: "raw/cslb/test.csv",
        sourceReceivedAt: fetchedAt,
      },
      cslbRecords,
      directoryRecords,
      existingContractors: [],
      mapping,
    });

    expect(plan.newItems.map((item) => item.licenseNumber)).toEqual([
      "200001",
    ]);
    expect(plan.decisions.map((entry) => entry.disposition)).toEqual([
      "new_contractor_proposed",
      "inactive_or_unusable_license",
      "unmapped_classification",
    ]);
  });

  it("performs a complete dry run with live reads and zero AWS writes", async () => {
    const outputDirectory = await fs.mkdtemp(
      path.join(os.tmpdir(), "retrofi-directory-enrichment-test-"),
    );
    const updateContractor = vi.fn();
    const putContractor = vi.fn();
    const uploadFile = vi.fn();
    const uploadJson = vi.fn();
    const aws = {
      assertInfrastructure: vi.fn().mockResolvedValue(undefined),
      downloadLatestCslbSource: vi.fn().mockResolvedValue({
        importId: "cslb-test",
        localPath: fixturePath,
        s3Key: "raw/cslb/test.csv",
        sha256: "fixture-hash",
        sizeBytes: 100,
        sourceReceivedAt: fetchedAt,
      }),
      getAccountId: vi.fn().mockResolvedValue("059310317821"),
      putContractor,
      scanContractors: vi.fn().mockResolvedValue([]),
      updateContractor,
      uploadFile,
      uploadJson,
    };

    try {
      const result = await runContractorDirectoryConsolidation(
        {
          outputDirectory,
          profile: "retrofi-prod",
          quiet: true,
          write: false,
        },
        {
          aws,
          now: () => new Date(fetchedAt),
          sourceCollection: {
            records: [],
            snapshots: [],
            sourceResults: [],
          },
        },
      );

      expect(aws.scanContractors).toHaveBeenCalledOnce();
      expect(aws.downloadLatestCslbSource).toHaveBeenCalledOnce();
      expect(updateContractor).not.toHaveBeenCalled();
      expect(putContractor).not.toHaveBeenCalled();
      expect(uploadFile).not.toHaveBeenCalled();
      expect(uploadJson).not.toHaveBeenCalled();
      expect(result.report.awsWriteCount).toBe(0);
      expect(result.report.dryRunConfirmedZeroAwsWrites).toBe(true);
    } finally {
      await fs.rm(outputDirectory, { recursive: true, force: true });
    }
  });

  it("requires an exact reviewed run approval before write-mode AWS access", async () => {
    const outputDirectory = await fs.mkdtemp(
      path.join(os.tmpdir(), "retrofi-directory-write-guard-test-"),
    );
    const reviewedReportPath = path.join(outputDirectory, "report.json");
    await fs.writeFile(
      reviewedReportPath,
      JSON.stringify({
        schemaVersion: ENRICHMENT_REPORT_SCHEMA_VERSION,
        mode: "dry-run",
        dryRunConfirmedZeroAwsWrites: true,
        runId: "directory-enrichment-reviewed",
        proposalHash: "reviewed-proposal",
      }),
    );
    const aws = {
      getAccountId: vi.fn(),
    };

    try {
      await expect(
        runContractorDirectoryConsolidation(
          {
            approval: "wrong-run",
            profile: "retrofi-prod",
            reviewedReport: reviewedReportPath,
            write: true,
          },
          { aws },
        ),
      ).rejects.toThrow(
        "--approval directory-enrichment-reviewed",
      );
      expect(aws.getAccountId).not.toHaveBeenCalled();
    } finally {
      await fs.rm(outputDirectory, { recursive: true, force: true });
    }
  });
});
