import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { HeadBucketCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const defaultSourceRoot =
  "/Users/neer_kuchlous/Code/firstmate/Green Business Solution/GPT Pro Work";

function parseArgs(argv) {
  const options = {
    bucket: process.env.GBS_DEV_WORK_BUCKET || process.env.GBS_GPT_PRO_WORK_BUCKET || "",
    prefix: process.env.GBS_GPT_PRO_WORK_PREFIX || "gpt-pro-work",
    profile: process.env.AWS_PROFILE ?? "gbs",
    region: process.env.AWS_REGION || process.env.AWS_DEPLOY_REGION || "us-east-1",
    sourceRoot: process.env.GBS_GPT_PRO_WORK_SOURCE || defaultSourceRoot,
    write: false
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];

    if (arg === "--bucket" && next) {
      options.bucket = next;
      index += 1;
    } else if (arg === "--prefix" && next) {
      options.prefix = next;
      index += 1;
    } else if (arg === "--profile" && next) {
      options.profile = next;
      index += 1;
    } else if (arg === "--region" && next) {
      options.region = next;
      index += 1;
    } else if (arg === "--source" && next) {
      options.sourceRoot = next;
      index += 1;
    } else if (arg === "--write") {
      options.write = true;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  options.prefix = options.prefix.replace(/^\/+|\/+$/g, "");
  return options;
}

function usage(options) {
  console.log(`Usage:
  node scripts/migrate-gpt-pro-work-to-s3.mjs --bucket <bucket> [--write]

Options:
  --bucket ${options.bucket || "<required>"}
  --prefix ${options.prefix}
  --source ${options.sourceRoot}
  --profile ${options.profile || "<default credential chain>"}
  --region ${options.region}
  --write

Default mode is a dry run.
The script skips .DS_Store and AppleDouble files, preserves relative paths under the prefix, and never deletes local files.
`);
}

function s3Client(options) {
  return new S3Client({
    region: options.region,
    credentials: options.profile ? fromIni({ profile: options.profile }) : undefined
  });
}

function contentTypeForFile(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === ".json") return "application/json; charset=utf-8";
  if (extension === ".md") return "text/markdown; charset=utf-8";
  if (extension === ".txt") return "text/plain; charset=utf-8";
  if (extension === ".csv") return "text/csv; charset=utf-8";
  if (extension === ".yaml" || extension === ".yml") return "application/yaml; charset=utf-8";
  return "application/octet-stream";
}

function isSkippedArtifactName(name) {
  return name === ".DS_Store" || name === "__MACOSX" || name.startsWith("._");
}

async function listFiles(sourceRoot, currentRelativeDirectory = "") {
  const directory = path.join(sourceRoot, currentRelativeDirectory);
  const entries = await fsp.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (isSkippedArtifactName(entry.name)) continue;

    const relativePath = currentRelativeDirectory
      ? path.join(currentRelativeDirectory, entry.name)
      : entry.name;
    const absolutePath = path.join(sourceRoot, relativePath);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(sourceRoot, relativePath)));
    } else if (entry.isFile()) {
      const stat = await fsp.stat(absolutePath);
      files.push({
        absolutePath,
        relativePath: relativePath.split(path.sep).join("/"),
        sizeBytes: stat.size
      });
    }
  }

  return files.sort((left, right) => left.relativePath.localeCompare(right.relativePath, undefined, { numeric: true }));
}

async function assertReady(options, client) {
  if (!options.bucket) {
    throw new Error("Target bucket is required. Pass --bucket or set GBS_DEV_WORK_BUCKET.");
  }
  if (!options.prefix) {
    throw new Error("Target prefix is required.");
  }
  const stat = await fsp.stat(options.sourceRoot).catch((error) => {
    if (error?.code === "ENOENT") {
      throw new Error(`Source GPT Pro Work folder does not exist: ${options.sourceRoot}`);
    }
    throw error;
  });
  if (!stat.isDirectory()) {
    throw new Error(`Source GPT Pro Work path is not a directory: ${options.sourceRoot}`);
  }
  await client.send(new HeadBucketCommand({ Bucket: options.bucket }));
}

async function uploadFile(options, client, file) {
  const key = `${options.prefix}/${file.relativePath}`;
  if (!options.write) {
    return { key, sizeBytes: file.sizeBytes, uploaded: false };
  }

  await client.send(
    new PutObjectCommand({
      Body: fs.createReadStream(file.absolutePath),
      Bucket: options.bucket,
      ContentType: contentTypeForFile(file.relativePath),
      Key: key,
      ServerSideEncryption: "AES256"
    })
  );
  return { key, sizeBytes: file.sizeBytes, uploaded: true };
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    usage(options);
    return;
  }

  const client = s3Client(options);
  await assertReady(options, client);
  const files = await listFiles(options.sourceRoot);
  const totalBytes = files.reduce((sum, file) => sum + file.sizeBytes, 0);

  console.log(`${options.write ? "Uploading" : "Would upload"} ${files.length} file(s), ${totalBytes} byte(s).`);
  console.log(`Source: ${options.sourceRoot}`);
  console.log(`Target: s3://${options.bucket}/${options.prefix}/`);

  let uploadedBytes = 0;
  for (const file of files) {
    const result = await uploadFile(options, client, file);
    uploadedBytes += result.sizeBytes;
    if (options.write) {
      console.log(`uploaded ${result.sizeBytes} bytes -> s3://${options.bucket}/${result.key}`);
    }
  }

  console.log(
    `${options.write ? "Uploaded" : "Dry run complete for"} ${files.length} file(s), ${uploadedBytes} byte(s). Local files were not modified.`
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
