import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(repoRoot, "data", "generated_test_fixtures_manifest.json");
const bucket = process.env.GBS_GENERATED_FIXTURE_BUCKET || "gbs-retrofi-dev-work-448016109714-us-east-1";
const prefix = (process.env.GBS_GENERATED_FIXTURE_PREFIX || "generated-test-fixtures").replace(/^\/+|\/+$/g, "");
const profile = process.env.AWS_PROFILE || "gbs";
const region = process.env.AWS_REGION || process.env.AWS_DEPLOY_REGION || "us-east-1";

const fixtures = [
  {
    localPath: "public/sample_matching_test_cases.json",
    description: "Generated public admin-preview matching test cases"
  },
  {
    localPath: "data/sample_user_profiles.json",
    description: "Generated sample user profiles used by matching and grant/tax scripts"
  },
  {
    localPath: "data/retrofi_patch_profiles_01_10.json",
    description: "Generated utility/profile patch fixture batch 01-10"
  },
  {
    localPath: "data/retrofi_patch_profiles_11_20.json",
    description: "Generated utility/profile patch fixture batch 11-20"
  },
  {
    localPath: "data/retrofi_patch_profiles_21_30.json",
    description: "Generated utility/profile patch fixture batch 21-30"
  },
  {
    localPath: "data/retrofi_patch_profiles_31_40.json",
    description: "Generated utility/profile patch fixture batch 31-40"
  },
  {
    localPath: "data/retrofi_patch_profiles_41_50.json",
    description: "Generated utility/profile patch fixture batch 41-50"
  },
  {
    localPath: "data/retrofi_patch_profiles_all_50.json",
    description: "Generated combined utility/profile patch fixture"
  }
];

function usage() {
  console.log(`Usage:
  node scripts/sync-generated-test-fixtures.mjs upload [--dry-run]
  node scripts/sync-generated-test-fixtures.mjs download [--force] [--dry-run]
  node scripts/sync-generated-test-fixtures.mjs list

Environment:
  AWS_PROFILE=${profile}
  AWS_REGION=${region}
  GBS_GENERATED_FIXTURE_BUCKET=${bucket}
  GBS_GENERATED_FIXTURE_PREFIX=${prefix}
`);
}

function s3Uri(fixture) {
  return `s3://${bucket}/${prefix}/${fixture.localPath}`;
}

function localAbsolutePath(fixture) {
  return path.join(repoRoot, fixture.localPath);
}

function runAws(args, { dryRun = false } = {}) {
  const command = ["aws", "--profile", profile, "--region", region, ...args];
  if (dryRun) {
    console.log(command.join(" "));
    return;
  }

  const result = spawnSync(command[0], command.slice(1), {
    cwd: repoRoot,
    stdio: "inherit",
    env: process.env
  });

  if (result.status !== 0) {
    throw new Error(`AWS command failed: ${command.join(" ")}`);
  }
}

function fileSha256(filePath) {
  const hash = createHash("sha256");
  hash.update(fs.readFileSync(filePath));
  return hash.digest("hex");
}

function fileMetadata(fixture) {
  const filePath = localAbsolutePath(fixture);
  const stat = fs.statSync(filePath);
  return {
    localPath: fixture.localPath,
    s3Uri: s3Uri(fixture),
    description: fixture.description,
    sizeBytes: stat.size,
    sha256: fileSha256(filePath)
  };
}

function readManifest() {
  if (!fs.existsSync(manifestPath)) {
    return null;
  }

  return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
}

function manifestFixtureByPath(manifest, localPath) {
  return manifest?.fixtures?.find((fixture) => fixture.localPath === localPath) || null;
}

function writeManifest(entries) {
  const manifest = {
    schemaVersion: "retrofi_generated_test_fixtures_manifest.v1",
    updatedAt: new Date().toISOString(),
    bucket,
    prefix,
    fixtures: entries
  };

  fs.writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(`Wrote ${path.relative(repoRoot, manifestPath)}`);
}

function upload({ dryRun }) {
  const entries = [];

  for (const fixture of fixtures) {
    const filePath = localAbsolutePath(fixture);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Cannot upload missing fixture: ${fixture.localPath}`);
    }

    console.log(`Uploading ${fixture.localPath} -> ${s3Uri(fixture)}`);
    runAws(["s3", "cp", filePath, s3Uri(fixture), "--sse", "AES256", "--only-show-errors"], { dryRun });
    entries.push(fileMetadata(fixture));
  }

  if (!dryRun) {
    writeManifest(entries);
  }
}

function download({ force, dryRun }) {
  const manifest = readManifest();

  for (const fixture of fixtures) {
    const filePath = localAbsolutePath(fixture);
    const manifestFixture = manifestFixtureByPath(manifest, fixture.localPath);

    if (fs.existsSync(filePath) && !force) {
      if (manifestFixture?.sha256 && fileSha256(filePath) !== manifestFixture.sha256) {
        console.log(`Keeping local ${fixture.localPath}; it differs from the S3 manifest. Use --force to overwrite.`);
      } else {
        console.log(`Already present: ${fixture.localPath}`);
      }
      continue;
    }

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    console.log(`Downloading ${s3Uri(fixture)} -> ${fixture.localPath}`);
    runAws(["s3", "cp", s3Uri(fixture), filePath, "--only-show-errors"], { dryRun });

    if (!dryRun && manifestFixture?.sha256 && fileSha256(filePath) !== manifestFixture.sha256) {
      throw new Error(`Downloaded fixture checksum mismatch: ${fixture.localPath}`);
    }
  }
}

function listFixtures() {
  for (const fixture of fixtures) {
    console.log(`${fixture.localPath}\n  ${s3Uri(fixture)}\n  ${fixture.description}`);
  }
}

const mode = process.argv[2];
const force = process.argv.includes("--force");
const dryRun = process.argv.includes("--dry-run");

try {
  if (!mode || mode === "--help" || mode === "-h") {
    usage();
  } else if (mode === "upload") {
    upload({ dryRun });
  } else if (mode === "download") {
    download({ force, dryRun });
  } else if (mode === "list") {
    listFixtures();
  } else {
    usage();
    process.exitCode = 1;
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
