import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scriptPath = path.join(repoRoot, "scripts/intake-opportunity-data-research-repairs.mjs");
const tmpDirs = [];

afterEach(async () => {
  await Promise.all(tmpDirs.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true })));
});

describe("intake-opportunity-data-research-repairs", () => {
  it("normalizes GPT output, validates prompt order, writes output, and appends the manifest", async () => {
    const dir = await makeTmpDir();
    const promptPath = path.join(dir, "prompt.md");
    const inputPath = path.join(dir, "gpt-output.txt");
    const outputPath = path.join(dir, "batch14.json");
    const manifestPath = path.join(dir, "manifest.json");

    await fs.writeFile(promptPath, promptFor(["SOURCE_TEST:one", "SOURCE_TEST:two"]));
    await fs.writeFile(
      inputPath,
      `Here is the strict JSON:\n\n\`\`\`json\n${JSON.stringify(
        {
          schemaVersion: "opportunity_data_research_repairs.v1",
          researchedAt: "2026-07-01",
          source: "gpt_pro",
          repairs: [
            repair("SOURCE_TEST:one", {
              applicationUrl: "[Apply](https://example.com/apply)",
              websiteUrl: "[https://example.com/program",
              sourceUrlsChecked: ["[Official](https://example.com/program)", "https://example.com/form"],
              evidenceText: "Official page at https://example.com/program says this is active."
            }),
            repair("SOURCE_TEST:two", {
              programType: "loan_program",
              availabilityStatus: "closed",
              applicationUrl: null
            })
          ],
          continueFromOpportunityId: null
        },
        null,
        2
      )}\n\`\`\`\n`
    );
    await fs.writeFile(
      manifestPath,
      `${JSON.stringify({ schemaVersion: "opportunity_data_repair_batches.v1", updatedAt: "2026-07-01", batches: [] }, null, 2)}\n`
    );

    const output = execFileSync(
      process.execPath,
      [
        scriptPath,
        "--input",
        inputPath,
        "--prompt",
        promptPath,
        "--output",
        outputPath,
        "--manifest",
        manifestPath,
        "--update-manifest",
        "--expected-count",
        "2"
      ],
      { cwd: repoRoot, encoding: "utf8" }
    );

    const artifact = JSON.parse(await fs.readFile(outputPath, "utf8"));
    const manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));

    expect(output).toContain("intake passed");
    expect(artifact.repairs).toHaveLength(2);
    expect(artifact.repairs[0].applicationUrl).toBe("https://example.com/apply");
    expect(artifact.repairs[0].websiteUrl).toBe("https://example.com/program");
    expect(artifact.repairs[0].sourceUrlsChecked).toEqual(["https://example.com/program", "https://example.com/form"]);
    expect(artifact.repairs[0].evidenceText).not.toContain("https://");
    expect(artifact.repairs[1].availabilityStatus).toBe("unavailable");
    expect(artifact.repairs[1].programType).toBe("Loan Program");
    expect(manifest.batches).toEqual([{ path: path.relative(repoRoot, outputPath) }]);
  });

  it("fails without writing when repair IDs drift from the prompt order", async () => {
    const dir = await makeTmpDir();
    const promptPath = path.join(dir, "prompt.md");
    const inputPath = path.join(dir, "gpt-output.json");
    const outputPath = path.join(dir, "bad-batch.json");

    await fs.writeFile(promptPath, promptFor(["SOURCE_TEST:one", "SOURCE_TEST:two"]));
    await fs.writeFile(
      inputPath,
      `${JSON.stringify(
        {
          schemaVersion: "opportunity_data_research_repairs.v1",
          researchedAt: "2026-07-01",
          source: "gpt_pro",
          repairs: [repair("SOURCE_TEST:two"), repair("SOURCE_TEST:one")],
          continueFromOpportunityId: null
        },
        null,
        2
      )}\n`
    );

    expect(() =>
      execFileSync(
        process.execPath,
        [
          scriptPath,
          "--input",
          inputPath,
          "--prompt",
          promptPath,
          "--output",
          outputPath,
          "--expected-count",
          "2"
        ],
        { cwd: repoRoot, encoding: "utf8", stdio: "pipe" }
      )
    ).toThrow();
    await expect(fs.stat(outputPath)).rejects.toThrow();
  });
});

async function makeTmpDir() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "retrofi-opportunity-intake-"));
  tmpDirs.push(dir);
  return dir;
}

function promptFor(ids) {
  return `Instructions\n\nTargets:\n${JSON.stringify(ids.map((opportunityId) => ({ opportunityId })), null, 2)}\n`;
}

function repair(opportunityId, overrides = {}) {
  return {
    opportunityId,
    confidence: "high",
    availabilityStatus: "active",
    geography: {
      country: "US",
      states: ["CA"],
      counties: [],
      cities: [],
      utilityTerritories: [],
      notes: "Test geography."
    },
    eligibleApplicantTypes: ["test applicant"],
    eligibleSectors: ["commercial"],
    eligibleRetrofitCategories: ["led_lighting_retrofit"],
    hardRequirements: ["Must qualify."],
    blockers: ["Do not infer unrelated measures."],
    programType: "Rebate Program",
    administrator: "Test Administrator",
    applicationUrl: "https://example.com/apply",
    websiteUrl: "https://example.com/program",
    sourceUrlsChecked: ["https://example.com/program"],
    evidenceText: "Official source lists this test program.",
    reasoningNotes: "Test repair.",
    ...overrides
  };
}
