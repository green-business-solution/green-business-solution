import fs from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const scriptPath = path.join(__dirname, "deploy-production.sh");

function runRuntimeDataOverrides(env = {}) {
  const result = spawnSync(
    "bash",
    ["-lc", `source "${scriptPath}"; runtime_data_parameter_overrides`],
    {
      env: {
        ...process.env,
        ...env
      },
      encoding: "utf8"
    }
  );

  if (result.status !== 0) {
    throw new Error(result.stderr || result.stdout || "runtime_data_parameter_overrides failed");
  }

  return result.stdout
    .trim()
    .split(/\r?\n/)
    .filter(Boolean);
}

describe("deploy-production runtime-data overrides", () => {
  it("omits the Firstmate principal override when the env var is truly absent", () => {
    const overrides = runRuntimeDataOverrides({});

    expect(overrides).toEqual(
      expect.arrayContaining([
        "ManageCoreRuntimeTables=false",
        "FirstmateTasksTable=gbs-firstmate-tasks"
      ])
    );
    expect(overrides).not.toContain("FirstmateTasksIngestionPrincipalArn=");
    expect(overrides.find((entry) => entry.startsWith("FirstmateTasksIngestionPrincipalArn="))).toBeUndefined();
  });

  it("omits the Firstmate principal override when the env var is explicitly empty", () => {
    const overrides = runRuntimeDataOverrides({
      GBS_FIRSTMATE_TASKS_INGESTION_PRINCIPAL_ARN: ""
    });

    expect(overrides).not.toContain("FirstmateTasksIngestionPrincipalArn=");
    expect(overrides.find((entry) => entry.startsWith("FirstmateTasksIngestionPrincipalArn="))).toBeUndefined();
  });

  it("includes the Firstmate principal override when explicitly set", () => {
    const overrides = runRuntimeDataOverrides({
      GBS_FIRSTMATE_TASKS_INGESTION_PRINCIPAL_ARN:
        "arn:aws:iam::059310317821:role/firstmate-task-publisher"
    });

    expect(overrides).toContain(
      "FirstmateTasksIngestionPrincipalArn=arn:aws:iam::059310317821:role/firstmate-task-publisher"
    );
  });
});

describe("deploy-production fixture patching flow", () => {
  const scriptSource = fs.readFileSync(scriptPath, "utf8");

  it("runs generated fixture download before matching savings patching", () => {
    expect(scriptSource).toMatch(
      /ensure_generated_fixtures\(\)\s*\{[\s\S]*npm run fixtures:generated:download -- --force[\s\S]*npm run matching:test-case-savings[\s\S]*\}/
    );
  });

  it("calls ensure_generated_fixtures before frontend build and API packaging", () => {
    const ensureCall = scriptSource.indexOf("  ensure_generated_fixtures");
    const buildFrontEndCall = scriptSource.indexOf("    build_frontend");
    const packageApiCall = scriptSource.indexOf("    package_api_lambda");

    expect(ensureCall).toBeGreaterThan(-1);
    expect(buildFrontEndCall).toBeGreaterThan(-1);
    expect(packageApiCall).toBeGreaterThan(-1);
    expect(ensureCall).toBeLessThan(buildFrontEndCall);
    expect(ensureCall).toBeLessThan(packageApiCall);
  });
});
