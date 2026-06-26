import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  generateFakeIntakePayload,
  loadFixtureDescriptor,
  parseFixtureForPreview,
  seedFakeGreenButtonClients,
  supportedCustomerTypes,
  validateGeneratedIntakePayload
} from "./seed-fake-green-button-clients.mjs";

const tmpPaths = [];

afterEach(async () => {
  await Promise.all(
    tmpPaths.splice(0).map(async (filePath) => {
      await fs.rm(filePath, { force: true });
    })
  );
});

describe("generateFakeIntakePayload", () => {
  it("creates valid intake payloads for every supported customer type", () => {
    let index = 0;
    const random = () => 0.42;

    for (const customerType of supportedCustomerTypes) {
      const payload = generateFakeIntakePayload({
        customerType,
        index,
        random,
        runId: "test-seed"
      });

      expect(validateGeneratedIntakePayload(payload)).toEqual([]);
      expect(payload.organizationType).toBe(customerType);
      expect(payload.email.endsWith("@example.com")).toBe(true);
      index += 1;
    }
  });
});

describe("Green Button fixture parsing", () => {
  it("parses the vendored cost-inclusive Green Button XML fixture", async () => {
    const fixture = await loadFixtureDescriptor(
      path.join(process.cwd(), "test-fixtures", "green-button", "TestGBDataThirteenMonthsBinnedDailyWCost.xml")
    );
    const preview = await parseFixtureForPreview({
      fixture,
      payload: generateFakeIntakePayload({
        customerType: "business_commercial",
        index: 1,
        random: () => 0.25,
        runId: "fixture-parse"
      })
    });

    expect(preview.processingStatus).toBe("processed");
    expect(preview.extractedFieldIds).toContain("annual_kwh");
    expect(preview.extractedFieldIds).toContain("rate_schedule");
  });
});

describe("seedFakeGreenButtonClients", () => {
  it("attaches parsed utility data in mocked local mode", async () => {
    const reportPath = path.join(os.tmpdir(), `retrofi-seed-report-${Date.now()}.md`);
    tmpPaths.push(reportPath);
    const createIntake = vi.fn(async (payload) => ({
      user: { userId: `user_${payload.email}` },
      uploadSession: {
        userId: `user_${payload.email}`,
        submissionId: `intake_${payload.email}`,
        token: "token"
      }
    }));
    const uploadFixture = vi.fn(async ({ fixture, payload }) => {
      const preview = await parseFixtureForPreview({ fixture, payload });
      return {
        intake: { userId: `user_${payload.email}` },
        utilityExtractedValues: preview.preview.utilityExtractedValues
      };
    });

    const outcome = await seedFakeGreenButtonClients(
      {
        count: 1,
        customerType: "homeowner",
        dryRun: false,
        fixture: path.join(process.cwd(), "test-fixtures", "green-button", "TestGBDataOneYearDailyBinnedMonthly.xml"),
        reportPath,
        seed: 123
      },
      {
        transport: { createIntake, uploadFixture },
        writeFile: fs.writeFile
      }
    );

    expect(createIntake).toHaveBeenCalledTimes(1);
    expect(uploadFixture).toHaveBeenCalledTimes(1);
    expect(outcome.results[0].status).toBe("seeded");
    expect(outcome.results[0].extractedFieldIds).toContain("annual_kwh");
    expect(await fs.readFile(reportPath, "utf8")).toContain("Fake clients generated: 1");
  });
});
