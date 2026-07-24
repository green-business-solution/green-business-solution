import fsPromises from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import { describe, expect, it } from "vitest";

import {
  buildIdentityRecord,
  extractWebsiteFields,
  scoreDomainIdentity,
} from "./contractor-web-enrichment-core.mjs";
import {
  applyReviewedLicenseTransition,
  buildProposalArtifact,
  containsCredentialBearingUrl,
  createConcurrencyLimiter,
  fetchHtmlPage,
  fetchRobots,
  isTransientFetchError,
  normalizeResultForArtifacts,
  parseHtmlPage,
  robotsAllows,
  runContractorWebEnrichment,
  sanitizeEvidenceSourceUrl,
  validateFinalArtifacts,
  WEB_ENRICHMENT_SCRIPT_VERSION,
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

describe("contractor web-enrichment resume metadata", () => {
  it("uses valid retained metadata when a legacy report is truncated", async () => {
    const directory = await fsPromises.mkdtemp(
      path.join(os.tmpdir(), "retrofi-web-resume-test-"),
    );
    const options = resumeOptions(directory);
    try {
      await writeRunMetadata(directory, options);
      await fsPromises.writeFile(
        path.join(directory, "report.json"),
        '{"runId":',
      );
      await expect(
        runContractorWebEnrichment(options, {
          aws: {
            async getAccountId() {
              throw new Error("AWS_REACHED");
            },
          },
        }),
      ).rejects.toThrow("AWS_REACHED");
    } finally {
      await fsPromises.rm(directory, {
        force: true,
        recursive: true,
      });
    }
  });

  it("fails closed on missing, truncated, or mismatched run metadata", async () => {
    const directory = await fsPromises.mkdtemp(
      path.join(os.tmpdir(), "retrofi-web-resume-guard-test-"),
    );
    const options = resumeOptions(directory);
    const metadataPath = path.join(
      directory,
      "state",
      "run-metadata.json",
    );
    try {
      await expect(
        runContractorWebEnrichment(options),
      ).rejects.toThrow("without its original run metadata or report");

      await fsPromises.mkdir(path.dirname(metadataPath), {
        recursive: true,
      });
      await fsPromises.writeFile(metadataPath, '{"runId":');
      await expect(
        runContractorWebEnrichment(options),
      ).rejects.toBeInstanceOf(SyntaxError);

      await writeRunMetadata(directory, {
        ...options,
        timeoutMs: options.timeoutMs + 1,
      });
      await expect(
        runContractorWebEnrichment(options),
      ).rejects.toThrow(
        "Run metadata timeoutMs does not match",
      );
    } finally {
      await fsPromises.rm(directory, {
        force: true,
        recursive: true,
      });
    }
  });
});

describe("contractor web-enrichment network safety", () => {
  it("fails closed when robots policy is temporarily unavailable", () => {
    expect(
      robotsAllows(
        {
          rules: [],
          unavailable: true,
        },
        "/",
      ),
    ).toBe(false);
    expect(robotsAllows({ rules: [] }, "/")).toBe(true);
  });

  it("retries only transient socket failures", () => {
    expect(
      isTransientFetchError({
        cause: { code: "ECONNRESET" },
      }),
    ).toBe(true);
    expect(
      isTransientFetchError({
        cause: { code: "ENOTFOUND" },
      }),
    ).toBe(false);
    expect(
      isTransientFetchError({
        cause: { code: "CERT_HAS_EXPIRED" },
      }),
    ).toBe(false);
  });

  it("cancels unusable HTTP response bodies", async () => {
    const cancelled = [];
    const runState = {
      requestMetrics: {
        record() {},
      },
      robotsCache: new Map(),
      async setRobots(origin, value) {
        this.robotsCache.set(origin, value);
      },
    };
    const response = (status, contentType = "text/plain") => ({
      body: {
        async cancel() {
          cancelled.push(status);
        },
      },
      bodyUsed: false,
      headers: new Headers({
        "content-type": contentType,
      }),
      ok: status >= 200 && status < 300,
      status,
      url: "https://example.test/",
    });

    await fetchRobots({
      fetchImpl: async () => response(404),
      origin: "https://example.test",
      retryUnavailable: false,
      runState,
      timeoutMs: 100,
    });
    await fetchHtmlPage({
      fetchImpl: async () => response(200),
      robots: { rules: [] },
      runState,
      timeoutMs: 100,
      url: "https://example.test/",
    });

    expect(cancelled).toEqual([404, 200]);
  });

  it("cancels a server-error body before its one retry", async () => {
    const cancelled = [];
    const statuses = [503, 404];
    const runState = {
      requestMetrics: {
        record() {},
      },
    };
    await fetchHtmlPage({
      fetchImpl: async () => {
        const status = statuses.shift();
        return {
          body: {
            async cancel() {
              cancelled.push(status);
            },
          },
          bodyUsed: false,
          headers: new Headers({
            "content-type": "text/plain",
          }),
          ok: false,
          status,
          url: "https://example.test/",
        };
      },
      robots: { rules: [] },
      runState,
      timeoutMs: 100,
      url: "https://example.test/",
    });

    expect(statuses).toHaveLength(0);
    expect(cancelled).toEqual([503, 404]);
  });

  it("removes credential-bearing query parameters from evidence URLs", () => {
    const signedUrl =
      "https://public-source.example/data.xlsx?AWSAccessKeyId=temporary&Signature=secret&x-amz-security-token=session";
    expect(containsCredentialBearingUrl(signedUrl)).toBe(true);
    expect(sanitizeEvidenceSourceUrl(signedUrl)).toBe(
      "https://public-source.example/data.xlsx",
    );
    expect(
      containsCredentialBearingUrl({
        evidence: [{ sourceUrl: signedUrl }],
      }),
    ).toBe(true);
    expect(
      sanitizeEvidenceSourceUrl(
        "https://contractor.example/contact?location=oakland",
      ),
    ).toBe(
      "https://contractor.example/contact?location=oakland",
    );
  });

  it("serializes only new sanitized evidence as an append operation", () => {
    const signedExistingUrl =
      "https://source.example/data.xlsx?AWSAccessKeyId=temporary&Signature=secret";
    const signedNewUrl =
      "https://examplecontractor.com/contact?X-Amz-Credential=temporary&X-Amz-Signature=secret";
    const existingEvidence = {
      field: "programMemberships",
      sourceId: "existing_directory",
      sourceUrl: signedExistingUrl,
      sourceValue: "Existing program",
    };
    const newEvidence = {
      field: "email",
      matchMethod: "verified_first_party_domain",
      retrievedAt: "2026-07-24T18:00:00.000Z",
      sourceId: "first_party_contractor_website",
      sourceName: "First-party contractor website",
      sourceUrl: signedNewUrl,
      sourceValue: "info@examplecontractor.com",
      supportingTextSnippet: "Email info@examplecontractor.com",
      verificationDate: "2026-07-24",
    };
    const normalized = normalizeResultForArtifacts({
      contractorId: "CA_CSLB_123456",
      contractorIdToken: "token",
      domain: "examplecontractor.com",
      domainDisposition: "VERIFIED_DOMAIN",
      expected: {
        email: undefined,
        enrichmentEvidence: [existingEvidence],
      },
      identityVerification: {
        signals: {
          confidenceTier: "TIER_A_EXACT_LICENSE",
        },
      },
      outcomes: ["VERIFIED_DOMAIN", "FOUND_EMAIL"],
      proposal: {
        email: "info@examplecontractor.com",
        enrichmentEvidence: [
          existingEvidence,
          newEvidence,
        ],
      },
    });
    const artifact = buildProposalArtifact(normalized);

    expect(artifact).toMatchObject({
      schemaVersion:
        "contractor-web-enrichment-proposal.v2",
      contractorId: "CA_CSLB_123456",
      expected: {},
      set: {
        email: "info@examplecontractor.com",
      },
    });
    expect(artifact.set).not.toHaveProperty(
      "enrichmentEvidence",
    );
    expect(artifact.expected).not.toHaveProperty(
      "enrichmentEvidence",
    );
    expect(artifact.append.enrichmentEvidence).toEqual([
      {
        ...newEvidence,
        sourceUrl: "https://examplecontractor.com/contact",
      },
    ]);
    expect(containsCredentialBearingUrl(artifact)).toBe(false);
  });

  it("fails final validation on a credential-bearing artifact URL", () => {
    const result = {
      contractorId: "CA_CSLB_123456",
      domainDisposition: "NO_VERIFIED_DOMAIN",
      expected: {
        sourceUrl:
          "https://source.example/data?X-Amz-Credential=temporary",
      },
      proposal: {},
    };
    expect(() =>
      validateFinalArtifacts({
        contractors: [
          {
            contractorId: "CA_CSLB_123456",
          },
        ],
        eligibleResults: [result],
        fullScope: false,
        licenseTransitionReview: [],
        proposals: [],
        results: [result],
      }),
    ).toThrow("credential-bearing URL");
  });

  it("bounds concurrent domain evaluations", async () => {
    const withPermit = createConcurrencyLimiter(2);
    let active = 0;
    let maximumActive = 0;
    await Promise.all(
      Array.from({ length: 6 }, (_, value) =>
        withPermit(async () => {
          active += 1;
          maximumActive = Math.max(maximumActive, active);
          await new Promise((resolve) => setImmediate(resolve));
          active -= 1;
          return value;
        }),
      ),
    );
    expect(maximumActive).toBe(2);
  });

  it("applies adaptive reductions to queued domain evaluations", async () => {
    const withPermit = createConcurrencyLimiter(2);
    const releases = [];
    const started = [];
    const tasks = Array.from({ length: 4 }, (_, value) =>
      withPermit(async () => {
        started.push(value);
        await new Promise((resolve) => {
          releases[value] = resolve;
        });
      }),
    );

    await new Promise((resolve) => setImmediate(resolve));
    expect(started).toEqual([0, 1]);
    withPermit.setLimit(1);
    releases[0]();
    await new Promise((resolve) => setImmediate(resolve));
    expect(started).toEqual([0, 1]);
    releases[1]();
    await new Promise((resolve) => setImmediate(resolve));
    expect(started).toEqual([0, 1, 2]);
    releases[2]();
    await new Promise((resolve) => setImmediate(resolve));
    releases[3]();
    await Promise.all(tasks);
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

function resumeOptions(outputDirectory) {
  return {
    auditSeed: "audit",
    checkpointEvery: 500,
    concurrency: 32,
    deepIfTime: false,
    excludeContractorsFile: "",
    maxRuntimeHours: 16,
    mode: "fast",
    osmPbfPath: "",
    outputDirectory,
    profile: "retrofi-prod",
    reserveFinalizationMinutes: 60,
    resume: true,
    runId: "resume-metadata-test",
    scope: "pilot",
    selectionSeed: "selection",
    targetContractorsFile: "",
    timeoutMs: 8_000,
  };
}

async function writeRunMetadata(directory, options) {
  const metadataPath = path.join(
    directory,
    "state",
    "run-metadata.json",
  );
  await fsPromises.mkdir(path.dirname(metadataPath), {
    recursive: true,
  });
  await fsPromises.writeFile(
    metadataPath,
    `${JSON.stringify({
      schemaVersion:
        "contractor-web-enrichment-run-metadata.v1",
      runId: options.runId,
      scope: options.scope,
      mode: options.mode,
      scriptVersion: WEB_ENRICHMENT_SCRIPT_VERSION,
      startedAt: "2026-07-24T18:00:00.000Z",
      auditSeed: options.auditSeed,
      checkpointEvery: options.checkpointEvery,
      concurrency: options.concurrency,
      deepIfTime: options.deepIfTime,
      excludeContractorsFile:
        options.excludeContractorsFile,
      maxRuntimeHours: options.maxRuntimeHours,
      osmPbfPath: options.osmPbfPath,
      reserveFinalizationMinutes:
        options.reserveFinalizationMinutes,
      selectionSeed: options.selectionSeed,
      targetContractorsFile:
        options.targetContractorsFile,
      timeoutMs: options.timeoutMs,
    })}\n`,
  );
}
