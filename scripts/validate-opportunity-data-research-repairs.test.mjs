import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  readExpectedOpportunityIds,
  validateOpportunityDataRepairFiles
} from "./validate-opportunity-data-research-repairs.mjs";

const tmpDirs = [];

afterEach(async () => {
  await Promise.all(tmpDirs.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true })));
});

describe("validateOpportunityDataRepairFiles", () => {
  it("accepts normalized GPT Pro repair artifacts", () => {
    const result = validateOpportunityDataRepairFiles([
      "data/opportunity_data_research_repairs_gpt_pro_2026-07-01_batch11.json",
      "data/opportunity_data_research_repairs_gpt_pro_2026-06-30_batch12.json"
    ]);

    expect(result.ok).toBe(true);
    expect(result.errors).toEqual([]);
    expect(result.repairCount).toBe(16);
  });

  it("rejects duplicate IDs, unsupported statuses, corrupted URLs, polluted evidence, and target drift", async () => {
    const dir = await makeTmpDir();
    const repairPath = path.join(dir, "bad-repairs.json");
    await fs.writeFile(
      repairPath,
      `${JSON.stringify(
        {
          schemaVersion: "opportunity_data_research_repairs.v1",
          researchedAt: "2026-07-01",
          source: "gpt_pro",
          repairs: [
            validRepair({
              opportunityId: "SOURCE_TEST:program:1",
              availabilityStatus: "closed",
              applicationUrl: "[Bad](https://example.com/apply)",
              evidenceText: "The model copied sourceUrlsChecked and websiteUrl JSON fragments into this field."
            }),
            validRepair({ opportunityId: "SOURCE_TEST:program:1" })
          ],
          continueFromOpportunityId: null
        },
        null,
        2
      )}\n`
    );

    const result = validateOpportunityDataRepairFiles([repairPath], {
      expectedOpportunityIds: ["SOURCE_TEST:program:1", "SOURCE_TEST:program:2"]
    });
    const messages = result.errors.map((entry) => entry.message).join("\n");

    expect(result.ok).toBe(false);
    expect(messages).toContain("unsupported availabilityStatus");
    expect(messages).toContain("contains markdown or copied-fragment URL corruption");
    expect(messages).toContain("appears polluted with copied JSON");
    expect(messages).toContain("duplicate opportunityId within file");
    expect(messages).toContain("expected SOURCE_TEST:program:2 but found SOURCE_TEST:program:1");
  });

  it("can read expected target IDs from a GPT prompt Targets section", async () => {
    const dir = await makeTmpDir();
    const promptPath = path.join(dir, "prompt.md");
    await fs.writeFile(
      promptPath,
      `Instructions\n\nTargets:\n${JSON.stringify(
        [{ opportunityId: "SOURCE_TEST:one" }, { opportunityId: "SOURCE_TEST:two" }],
        null,
        2
      )}\n`
    );

    expect(readExpectedOpportunityIds(promptPath)).toEqual(["SOURCE_TEST:one", "SOURCE_TEST:two"]);
  });
});

async function makeTmpDir() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "retrofi-opportunity-data-validator-"));
  tmpDirs.push(dir);
  return dir;
}

function validRepair(overrides = {}) {
  return {
    opportunityId: "SOURCE_TEST:program:1",
    confidence: "high",
    availabilityStatus: "active",
    geography: {
      country: "US",
      states: ["CA"],
      counties: [],
      cities: [],
      utilityTerritories: [],
      notes: "Test service territory."
    },
    eligibleApplicantTypes: ["test applicant"],
    eligibleSectors: ["commercial"],
    eligibleRetrofitCategories: ["led_lighting_retrofit"],
    hardRequirements: ["Must be eligible."],
    blockers: ["Do not infer unrelated categories."],
    programType: "Rebate Program",
    administrator: "Test Utility",
    applicationUrl: "https://example.com/apply",
    websiteUrl: "https://example.com/program",
    sourceUrlsChecked: ["https://example.com/program"],
    evidenceText: "Current official source lists the tested program.",
    reasoningNotes: "Test fixture.",
    ...overrides
  };
}
