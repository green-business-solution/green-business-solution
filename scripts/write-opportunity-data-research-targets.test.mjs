import { execFileSync } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { buildTargets } from "./write-opportunity-data-research-targets.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const tmpDirs = [];

afterEach(async () => {
  await Promise.all(tmpDirs.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true })));
});

describe("write-opportunity-data-research-targets", () => {
  it("groups low-confidence opportunities and excludes already repaired records by default", () => {
    const targets = buildTargets(sampleIndex(), { maxTargets: 10, confidenceThreshold: 0.9 });

    expect(targets.map((target) => target.opportunityId)).toEqual(["SOURCE_TEST:unrepaired"]);
    expect(targets[0]).toMatchObject({
      lowestConfidence: 0.52,
      matchBases: ["canonical_technology_fallback", "text_or_source_technology"],
      matchedTerms: ["heat pump", "lighting"],
      relatedRetrofitCount: 2
    });
  });

  it("can exclude opportunity IDs that are already assigned to a pending prompt", () => {
    const targets = buildTargets(sampleIndex(), {
      maxTargets: 10,
      confidenceThreshold: 0.9,
      excludeOpportunityIds: ["SOURCE_TEST:unrepaired"]
    });

    expect(targets).toEqual([]);
  });

  it("writes a target artifact from the CLI", async () => {
    const dir = await makeTmpDir();
    const sourcePath = path.join(dir, "index.json");
    const outputPath = path.join(dir, "targets.json");
    await fs.writeFile(sourcePath, `${JSON.stringify(sampleIndex(), null, 2)}\n`);

    execFileSync(
      process.execPath,
      [
        path.join(repoRoot, "scripts/write-opportunity-data-research-targets.mjs"),
        "--source",
        sourcePath,
        "--output",
        outputPath,
        "--max-targets",
        "5"
      ],
      { cwd: repoRoot, stdio: "pipe" }
    );

    const artifact = JSON.parse(await fs.readFile(outputPath, "utf8"));
    expect(artifact.schemaVersion).toBe("opportunity_data_research_targets.v1");
    expect(artifact.targetCount).toBe(1);
    expect(artifact.selection.excludedOpportunityCount).toBe(0);
    expect(artifact.targets[0].opportunityId).toBe("SOURCE_TEST:unrepaired");
  });
});

async function makeTmpDir() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "retrofi-opportunity-targets-"));
  tmpDirs.push(dir);
  return dir;
}

function sampleIndex() {
  const unrepaired = {
    opportunityId: "SOURCE_TEST:unrepaired",
    opportunityName: "Unrepaired Program",
    sourceName: "Test",
    sourceUrl: "https://example.com/source",
    websiteUrl: "https://example.com/program",
    applicationUrl: null,
    state: "CA",
    programType: "Rebate Program",
    administrator: "Test Utility",
    confidence: 0.52,
    matchBasis: "canonical_technology_fallback",
    matchedTerms: ["lighting"],
    availabilityStatus: "active"
  };
  return {
    retrofits: [
      {
        retrofitTypeId: "led_lighting_retrofit",
        displayName: "LED lighting retrofit",
        parentCategory: "lighting",
        isPhysicalRetrofit: true,
        opportunities: [unrepaired]
      },
      {
        retrofitTypeId: "heat_pump_hvac_retrofit",
        displayName: "Heat pump HVAC retrofit",
        parentCategory: "hvac_space_conditioning",
        isPhysicalRetrofit: true,
        opportunities: [
          {
            ...unrepaired,
            confidence: 0.66,
            matchBasis: "text_or_source_technology",
            matchedTerms: ["heat pump"]
          },
          {
            opportunityId: "SOURCE_TEST:repaired",
            opportunityName: "Repaired Program",
            sourceName: "Test",
            sourceUrl: "https://example.com/repaired",
            websiteUrl: "https://example.com/repaired",
            applicationUrl: null,
            state: "CA",
            programType: "Rebate Program",
            administrator: "Test Utility",
            confidence: 0.5,
            matchBasis: "canonical_technology_fallback",
            matchedTerms: ["heat pump"],
            availabilityStatus: "active",
            opportunityDataRepair: { opportunityId: "SOURCE_TEST:repaired" }
          }
        ]
      }
    ]
  };
}
