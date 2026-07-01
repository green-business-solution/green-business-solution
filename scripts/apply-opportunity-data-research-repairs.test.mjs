import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tmpDirs = [];

afterEach(async () => {
  await Promise.all(tmpDirs.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true })));
});

describe("apply-opportunity-data-research-repairs", () => {
  it("lets later duplicate repairs win and maps expired repair status to unavailable", async () => {
    const dir = await makeTmpDir();
    const retrofitIndexPath = path.join(dir, "retrofit_opportunity_index.json");
    const testCasesPath = path.join(dir, "sample_matching_test_cases.json");
    const reportPath = path.join(dir, "report.md");
    const firstRepairPath = path.join(dir, "first.json");
    const secondRepairPath = path.join(dir, "second.json");

    await fs.writeFile(
      retrofitIndexPath,
      `${JSON.stringify(
        {
          retrofits: [
            {
              retrofitId: "lighting",
              opportunities: [
                {
                  opportunityId: "SOURCE_TEST:program:1",
                  availabilityStatus: "active",
                  programType: "Old Program"
                }
              ]
            }
          ],
          upcomingOpportunities: []
        },
        null,
        2
      )}\n`
    );
    await fs.writeFile(testCasesPath, `${JSON.stringify({ testCases: [] }, null, 2)}\n`);
    await fs.writeFile(firstRepairPath, `${JSON.stringify(repairArtifact("active", "Old Program"), null, 2)}\n`);
    await fs.writeFile(secondRepairPath, `${JSON.stringify(repairArtifact("expired", "Expired Program"), null, 2)}\n`);

    execFileSync(
      process.execPath,
      [path.join(repoRoot, "scripts/apply-opportunity-data-research-repairs.mjs"), firstRepairPath, secondRepairPath],
      {
        cwd: repoRoot,
        env: {
          ...process.env,
          RETROFIT_INDEX_PATH: retrofitIndexPath,
          MATCHING_TEST_CASES_PATH: testCasesPath,
          OPPORTUNITY_DATA_REPAIR_REPORT_PATH: reportPath
        },
        stdio: "pipe"
      }
    );

    const patchedIndex = JSON.parse(await fs.readFile(retrofitIndexPath, "utf8"));
    const patchedOpportunity = patchedIndex.retrofits[0].opportunities[0];
    expect(patchedOpportunity.programType).toBe("Expired Program");
    expect(patchedOpportunity.availabilityStatus).toBe("unavailable");
    expect(patchedOpportunity.opportunityDataRepair).toMatchObject({
      availabilityStatus: "expired",
      batchId: "second",
      opportunityId: "SOURCE_TEST:program:1"
    });
    expect(await fs.readFile(reportPath, "utf8")).toContain("Duplicate opportunity repairs overwritten by later files: 1");
  });
});

async function makeTmpDir() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "retrofi-opportunity-data-repairs-"));
  tmpDirs.push(dir);
  return dir;
}

function repairArtifact(availabilityStatus, programType) {
  return {
    schemaVersion: "opportunity_data_research_repairs.v1",
    researchedAt: "2026-07-01",
    source: "gpt_pro",
    repairs: [
      {
        opportunityId: "SOURCE_TEST:program:1",
        confidence: "high",
        availabilityStatus,
        geography: {
          country: "US",
          states: ["PA"],
          counties: [],
          cities: [],
          utilityTerritories: []
        },
        eligibleApplicantTypes: [],
        eligibleSectors: [],
        eligibleRetrofitCategories: [],
        hardRequirements: [],
        blockers: [],
        programType,
        administrator: "Test Utility",
        applicationUrl: null,
        websiteUrl: "https://example.com/rebate",
        sourceUrlsChecked: ["https://example.com/rebate"],
        evidenceText: "Official source status.",
        reasoningNotes: "Regression fixture."
      }
    ]
  };
}
