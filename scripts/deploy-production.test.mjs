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
        "FirstmateTasksTable=gbs-firstmate-tasks",
        "ContractorsTable=gbs-contractors"
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

describe("deploy-production contractor import resources", () => {
  const scriptSource = fs.readFileSync(scriptPath, "utf8");

  it("passes the contractor source bucket to the runtime bucket stack", () => {
    expect(scriptSource).toContain(
      '"ContractorSourceBucketName=${CONTRACTOR_SOURCE_BUCKET}"',
    );
  });

  it("allows explicit contractor resource overrides", () => {
    const overrides = runRuntimeDataOverrides({
      GBS_CONTRACTORS_TABLE: "example-contractors",
    });

    expect(overrides).toContain("ContractorsTable=example-contractors");
    expect(scriptSource).toContain(
      'CONTRACTOR_SOURCE_BUCKET="${GBS_CONTRACTOR_SOURCE_BUCKET:-gbs-retrofi-contractor-source-data-059310317821-us-east-1}"',
    );
  });
});

describe("deploy-production fixture patching flow", () => {
  const scriptSource = fs.readFileSync(scriptPath, "utf8");

  it("packages the canonical award-audit overlay with the API", () => {
    expect(scriptSource).toContain("copy_data_file data/opportunity_award_audit_overlay.v1.json");
  });

  it("packages the canonical availability dispositions with the API", () => {
    expect(scriptSource).toContain("copy_data_file data/opportunity_availability_dispositions.v1.json");
  });

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

describe("deploy-production homepage scroll-media caching", () => {
  const scriptSource = fs.readFileSync(scriptPath, "utf8");

  it("excludes versioned scroll media from the short-lived site sync", () => {
    expect(scriptSource).toMatch(
      /s3 sync dist\/[^]*--exclude "home-scroll-media\/\*"[^]*--cache-control "public,max-age=60"/,
    );
  });

  it("uploads immutable scroll media without deleting prior versions", () => {
    const mediaSync = scriptSource.match(
      /aws_region s3 sync dist\/home-scroll-media\/[^]*?--cache-control "public,max-age=31536000,immutable"/,
    )?.[0];

    expect(mediaSync).toBeDefined();
    expect(mediaSync).not.toContain("--delete");
  });

  it("publishes immutable media before the site bundle that references it", () => {
    const mediaSyncIndex = scriptSource.indexOf(
      "aws_region s3 sync dist/home-scroll-media/",
    );
    const siteSyncIndex = scriptSource.indexOf(
      'aws_region s3 sync dist/ "s3://${frontend_bucket}/"',
    );

    expect(mediaSyncIndex).toBeGreaterThan(-1);
    expect(siteSyncIndex).toBeGreaterThan(mediaSyncIndex);
  });
});
