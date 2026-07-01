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

describe("apply-all-opportunity-data-research-repairs", () => {
  it("validates a manifest and dry-runs without applying repairs", async () => {
    const dir = await makeTmpDir();
    const manifestPath = path.join(dir, "manifest.json");
    await fs.writeFile(
      manifestPath,
      `${JSON.stringify(
        {
          schemaVersion: "opportunity_data_repair_batches.v1",
          batches: [{ path: "data/opportunity_data_research_repairs_gpt_pro_2026-06-30_batch12.json" }]
        },
        null,
        2
      )}\n`
    );

    const output = execFileSync(
      process.execPath,
      [path.join(repoRoot, "scripts/apply-all-opportunity-data-research-repairs.mjs"), "--manifest", manifestPath, "--dry-run"],
      { cwd: repoRoot, encoding: "utf8" }
    );

    expect(output).toContain("Opportunity data repair validation passed.");
    expect(output).toContain("Dry run only.");
    expect(output).toContain("opportunity_data_research_repairs_gpt_pro_2026-06-30_batch12.json");
  });
});

async function makeTmpDir() {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), "retrofi-opportunity-repair-manifest-"));
  tmpDirs.push(dir);
  return dir;
}
