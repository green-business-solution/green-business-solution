import fs from "node:fs/promises";
import path from "node:path";
import { GetObjectCommand, PutObjectCommand, paginateListObjectsV2 } from "@aws-sdk/client-s3";

export const defaultGptProWorkPrefix = "gpt-pro-work";
export const defaultGptProWorkBucket = "gbs-retrofi-dev-work-059310317821-us-east-1";
export const defaultGptProWorkProfile = "retrofi-prod";
export const defaultGptProWorkRegion = "us-east-1";
export const defaultGptProWorkLocalFallbackRoot =
  "/Users/neer_kuchlous/Code/firstmate/Green Business Solution/GPT Pro Work";
export const maxGptProOutputContentBytes = 5 * 1024 * 1024;

const posixPath = path.posix;
const textFileExtensions = new Set([".json", ".md", ".txt", ".csv", ".yaml", ".yml"]);

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function hasControlCharacter(value) {
  return /[\0-\x1f\x7f]/.test(value);
}

export function isGptProChatsLocalAuthBypassEnabled(env = process.env) {
  const bypassFlag = String(env.RETROFI_GPT_PRO_CHATS_LOCAL_AUTH_BYPASS || "").trim();
  const isAwsRuntime = Boolean(env.AWS_LAMBDA_FUNCTION_NAME || env.AWS_EXECUTION_ENV);
  return !isAwsRuntime && bypassFlag === "1";
}

export function resolveGptProWorkBucket(env = process.env) {
  return env.GBS_DEV_WORK_BUCKET ?? env.GBS_GPT_PRO_WORK_BUCKET ?? defaultGptProWorkBucket;
}

export function cleanGptProWorkPrefix(value) {
  const prefix = cleanText(value || defaultGptProWorkPrefix).replace(/^\/+|\/+$/g, "");
  if (!prefix || prefix.split("/").some((segment) => !segment || segment === "." || segment === "..")) {
    throw Object.assign(new Error("GPT Pro work prefix is not valid."), { status: 500 });
  }
  if (hasControlCharacter(prefix)) {
    throw Object.assign(new Error("GPT Pro work prefix contains invalid characters."), { status: 500 });
  }
  return prefix;
}

export function validateGptProBatchId(value) {
  const batchId = cleanText(value);
  if (!batchId) {
    throw Object.assign(new Error("Batch is required."), { status: 400 });
  }
  if (batchId === "." || batchId === ".." || batchId.includes("/") || batchId.includes("\\") || hasControlCharacter(batchId)) {
    throw Object.assign(new Error("Batch is not valid."), { status: 400 });
  }
  if (batchId.length > 180) {
    throw Object.assign(new Error("Batch is too long."), { status: 400 });
  }
  return batchId;
}

export function validateGptProArtifactPath(value, { requirePrompt = false } = {}) {
  const artifactPath = cleanText(value).replace(/^\/+|\/+$/g, "");
  if (!artifactPath) {
    throw Object.assign(new Error("Artifact path is required."), { status: 400 });
  }
  if (artifactPath.includes("\\") || hasControlCharacter(artifactPath) || artifactPath.length > 1024) {
    throw Object.assign(new Error("Artifact path is not valid."), { status: 400 });
  }
  const segments = artifactPath.split("/");
  if (segments.some((segment) => !segment || segment === "." || segment === ".." || segment.length > 255)) {
    throw Object.assign(new Error("Artifact path is not valid."), { status: 400 });
  }
  if (isJunkGptProArtifactPath(artifactPath)) {
    throw Object.assign(new Error("Artifact path is not a supported GPT Pro work file."), { status: 400 });
  }
  if (requirePrompt && !isGptProPromptPath(artifactPath)) {
    throw Object.assign(new Error("Prompt path must reference a prompt file."), { status: 400 });
  }
  return artifactPath;
}

export function isJunkGptProArtifactPath(artifactPath) {
  return artifactPath
    .split("/")
    .some((segment) => segment === ".DS_Store" || segment === "__MACOSX" || segment.startsWith("._"));
}

export function isGptProPromptPath(artifactPath) {
  const fileName = posixPath.basename(artifactPath).toLowerCase();
  const extension = posixPath.extname(fileName);
  if (extension && !textFileExtensions.has(extension)) {
    return false;
  }
  if (fileName.includes("prompt")) {
    return true;
  }
  return artifactPath
    .split("/")
    .slice(0, -1)
    .some((segment) => segment.toLowerCase() === "prompts");
}

export function isGptProOutputPath(artifactPath) {
  const fileName = posixPath.basename(artifactPath).toLowerCase();
  const extension = posixPath.extname(fileName);
  if (extension && !textFileExtensions.has(extension)) {
    return false;
  }
  return fileName.includes("output");
}

export function gptProOutputPathForPromptPath(promptPath) {
  const normalizedPromptPath = validateGptProArtifactPath(promptPath, { requirePrompt: true });
  const directory = posixPath.dirname(normalizedPromptPath);
  const fileName = posixPath.basename(normalizedPromptPath);
  const extension = posixPath.extname(fileName);
  const stem = extension ? fileName.slice(0, -extension.length) : fileName;
  const outputStem = /prompts?/i.test(stem)
    ? stem.replace(/prompts?/i, "output")
    : `output_${stem}`;
  return directory === "." ? `${outputStem}${extension}` : posixPath.join(directory, `${outputStem}${extension}`);
}

export function gptProArtifactS3Key({ batchId, prefix = defaultGptProWorkPrefix, relativePath }) {
  return `${cleanGptProWorkPrefix(prefix)}/${validateGptProBatchId(batchId)}/${validateGptProArtifactPath(relativePath)}`;
}

export function gptProObjectPathFromS3Key(key, prefix = defaultGptProWorkPrefix) {
  const normalizedPrefix = `${cleanGptProWorkPrefix(prefix)}/`;
  if (!key || !key.startsWith(normalizedPrefix)) {
    return null;
  }
  const relativeObjectPath = key.slice(normalizedPrefix.length);
  if (!relativeObjectPath || isJunkGptProArtifactPath(relativeObjectPath)) {
    return null;
  }
  const [batchId, ...relativeSegments] = relativeObjectPath.split("/");
  if (!batchId || relativeSegments.length === 0) {
    return null;
  }
  try {
    return {
      batchId: validateGptProBatchId(batchId),
      relativePath: validateGptProArtifactPath(relativeSegments.join("/"))
    };
  } catch {
    return null;
  }
}

function comparePaths(left, right) {
  return left.localeCompare(right, undefined, { numeric: true, sensitivity: "base" });
}

function isoDate(value) {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function buildPromptDescriptor(file, outputByPath, { batchId, prefix }) {
  const outputPath = gptProOutputPathForPromptPath(file.relativePath);
  const output = outputByPath.get(outputPath) || null;
  return {
    batchId,
    displayName: posixPath.basename(file.relativePath),
    promptKey: `${cleanGptProWorkPrefix(prefix)}/${batchId}/${file.relativePath}`,
    promptLastModifiedAt: isoDate(file.lastModified),
    promptPath: file.relativePath,
    promptSizeBytes: file.sizeBytes,
    outputExists: Boolean(output),
    outputKey: `${cleanGptProWorkPrefix(prefix)}/${batchId}/${outputPath}`,
    outputLastModifiedAt: isoDate(output?.lastModified),
    outputPath,
    outputSizeBytes: output?.sizeBytes || 0
  };
}

export function buildGptProWorkIndex(files, { prefix = defaultGptProWorkPrefix, storageStatus = "s3" } = {}) {
  const batchMap = new Map();
  for (const file of files) {
    if (!file?.batchId || !file?.relativePath || isJunkGptProArtifactPath(file.relativePath)) continue;
    if (!batchMap.has(file.batchId)) {
      batchMap.set(file.batchId, []);
    }
    batchMap.get(file.batchId).push(file);
  }

  const batches = [...batchMap.entries()].map(([batchId, batchFiles]) => {
    const outputByPath = new Map(batchFiles.filter((file) => isGptProOutputPath(file.relativePath)).map((file) => [file.relativePath, file]));
    const promptFiles = batchFiles
      .filter((file) => isGptProPromptPath(file.relativePath))
      .sort((left, right) => comparePaths(left.relativePath, right.relativePath))
      .map((file) => buildPromptDescriptor(file, outputByPath, { batchId, prefix }));
    const latestModifiedAt =
      batchFiles
        .map((file) => new Date(file.lastModified || 0).getTime())
        .filter((time) => Number.isFinite(time))
        .sort((left, right) => right - left)[0] || 0;
    const outputCount = batchFiles.filter((file) => isGptProOutputPath(file.relativePath)).length;
    return {
      batchId,
      displayName: batchId,
      latestModifiedAt: latestModifiedAt ? new Date(latestModifiedAt).toISOString() : null,
      objectCount: batchFiles.length,
      outputCount,
      promptCount: promptFiles.length,
      promptFiles,
      storageStatus,
      totalBytes: batchFiles.reduce((sum, file) => sum + Number(file.sizeBytes || 0), 0)
    };
  });

  batches.sort((left, right) => {
    const leftTime = left.latestModifiedAt ? new Date(left.latestModifiedAt).getTime() : 0;
    const rightTime = right.latestModifiedAt ? new Date(right.latestModifiedAt).getTime() : 0;
    if (leftTime !== rightTime) return rightTime - leftTime;
    return comparePaths(left.displayName, right.displayName);
  });

  return {
    batches,
    currentBatchId: batches[0]?.batchId || null,
    prefix: cleanGptProWorkPrefix(prefix),
    storageStatus,
    totals: {
      batchCount: batches.length,
      objectCount: batches.reduce((sum, batch) => sum + batch.objectCount, 0),
      outputCount: batches.reduce((sum, batch) => sum + batch.outputCount, 0),
      promptCount: batches.reduce((sum, batch) => sum + batch.promptCount, 0),
      totalBytes: batches.reduce((sum, batch) => sum + batch.totalBytes, 0)
    }
  };
}

async function listS3GptProFiles({ bucket, prefix, s3 }) {
  const files = [];
  for await (const page of paginateListObjectsV2({ client: s3 }, { Bucket: bucket, Prefix: `${cleanGptProWorkPrefix(prefix)}/` })) {
    for (const object of page.Contents || []) {
      const parsed = gptProObjectPathFromS3Key(object.Key, prefix);
      if (!parsed) continue;
      files.push({
        ...parsed,
        lastModified: object.LastModified || null,
        sizeBytes: Number(object.Size || 0)
      });
    }
  }
  return files;
}

async function walkLocalGptProFiles(root, currentRelativeDirectory = "") {
  const directory = path.join(root, currentRelativeDirectory);
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === ".DS_Store" || entry.name === "__MACOSX" || entry.name.startsWith("._")) {
      continue;
    }
    const relativePath = currentRelativeDirectory
      ? posixPath.join(currentRelativeDirectory.split(path.sep).join("/"), entry.name)
      : entry.name;
    const absolutePath = path.join(root, ...relativePath.split("/"));
    if (entry.isDirectory()) {
      files.push(...(await walkLocalGptProFiles(root, path.join(currentRelativeDirectory, entry.name))));
      continue;
    }
    if (!entry.isFile()) {
      continue;
    }
    const [batchId, ...relativeSegments] = relativePath.split("/");
    if (!batchId || relativeSegments.length === 0) {
      continue;
    }
    try {
      validateGptProBatchId(batchId);
      validateGptProArtifactPath(relativeSegments.join("/"));
    } catch {
      continue;
    }
    const stat = await fs.stat(absolutePath);
    files.push({
      batchId,
      lastModified: stat.mtime,
      relativePath: relativeSegments.join("/"),
      sizeBytes: stat.size
    });
  }

  return files;
}

function localArtifactAbsolutePath({ batchId, localFallbackRoot, relativePath }) {
  const root = path.resolve(localFallbackRoot);
  const target = path.resolve(root, validateGptProBatchId(batchId), ...validateGptProArtifactPath(relativePath).split("/"));
  if (target !== root && !target.startsWith(`${root}${path.sep}`)) {
    throw Object.assign(new Error("Artifact path is outside the GPT Pro work folder."), { status: 400 });
  }
  return target;
}

async function readLocalArtifact(options) {
  const filePath = localArtifactAbsolutePath(options);
  try {
    return {
      content: await fs.readFile(filePath, "utf8"),
      exists: true
    };
  } catch (error) {
    if (error?.code === "ENOENT") {
      return { content: "", exists: false };
    }
    throw error;
  }
}

async function readS3Artifact({ batchId, bucket, prefix, relativePath, s3 }) {
  try {
    const response = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: gptProArtifactS3Key({ batchId, prefix, relativePath })
      })
    );
    return {
      content: await response.Body?.transformToString("utf-8") || "",
      exists: true
    };
  } catch (error) {
    if (error?.name === "NoSuchKey" || error?.$metadata?.httpStatusCode === 404) {
      return { content: "", exists: false };
    }
    throw error;
  }
}

export async function listGptProWorkBatches({ bucket, localFallbackRoot, prefix = defaultGptProWorkPrefix, s3 }) {
  if (bucket) {
    return {
      ...buildGptProWorkIndex(await listS3GptProFiles({ bucket, prefix, s3 }), { prefix, storageStatus: "s3" }),
      bucket
    };
  }

  if (localFallbackRoot) {
    return {
      ...buildGptProWorkIndex(await walkLocalGptProFiles(localFallbackRoot), { prefix, storageStatus: "local-read-only" }),
      bucket: null,
      warnings: ["Using the local GPT Pro Work folder read-only because no S3 dev work bucket is configured."]
    };
  }

  return {
    ...buildGptProWorkIndex([], { prefix, storageStatus: "not-configured" }),
    bucket: null,
    warnings: ["No GPT Pro work S3 bucket is configured."]
  };
}

export async function readGptProPrompt({ batchId, bucket, localFallbackRoot, prefix = defaultGptProWorkPrefix, promptPath, s3 }) {
  const normalizedBatchId = validateGptProBatchId(batchId);
  const normalizedPromptPath = validateGptProArtifactPath(promptPath, { requirePrompt: true });
  const outputPath = gptProOutputPathForPromptPath(normalizedPromptPath);
  if (!bucket && !localFallbackRoot) {
    throw Object.assign(new Error("GPT Pro work storage is not configured."), { status: 503 });
  }
  const result = bucket
    ? await readS3Artifact({ batchId: normalizedBatchId, bucket, prefix, relativePath: normalizedPromptPath, s3 })
    : await readLocalArtifact({ batchId: normalizedBatchId, localFallbackRoot, relativePath: normalizedPromptPath });
  if (!result.exists) {
    throw Object.assign(new Error("Prompt file was not found."), { status: 404 });
  }
  return {
    batchId: normalizedBatchId,
    content: result.content,
    outputPath,
    promptPath: normalizedPromptPath,
    storageStatus: bucket ? "s3" : "local-read-only"
  };
}

export async function readGptProOutput({ batchId, bucket, localFallbackRoot, prefix = defaultGptProWorkPrefix, promptPath, s3 }) {
  const normalizedBatchId = validateGptProBatchId(batchId);
  const normalizedPromptPath = validateGptProArtifactPath(promptPath, { requirePrompt: true });
  const outputPath = gptProOutputPathForPromptPath(normalizedPromptPath);
  if (!bucket && !localFallbackRoot) {
    throw Object.assign(new Error("GPT Pro work storage is not configured."), { status: 503 });
  }
  const result = bucket
    ? await readS3Artifact({ batchId: normalizedBatchId, bucket, prefix, relativePath: outputPath, s3 })
    : await readLocalArtifact({ batchId: normalizedBatchId, localFallbackRoot, relativePath: outputPath });
  return {
    batchId: normalizedBatchId,
    content: result.content,
    exists: result.exists,
    outputPath,
    promptPath: normalizedPromptPath,
    storageStatus: bucket ? "s3" : "local-read-only"
  };
}

export async function writeGptProOutput({ batchId, bucket, content, prefix = defaultGptProWorkPrefix, promptPath, s3 }) {
  if (!bucket) {
    throw Object.assign(new Error("GPT Pro work output saving requires the S3 dev work bucket to be configured."), {
      status: 503
    });
  }

  const normalizedBatchId = validateGptProBatchId(batchId);
  const normalizedPromptPath = validateGptProArtifactPath(promptPath, { requirePrompt: true });
  const outputContent = typeof content === "string" ? content : "";
  const sizeBytes = Buffer.byteLength(outputContent, "utf8");
  if (sizeBytes > maxGptProOutputContentBytes) {
    throw Object.assign(new Error("GPT Pro output is too large for a single save."), { status: 413 });
  }

  const outputPath = gptProOutputPathForPromptPath(normalizedPromptPath);
  const savedAt = new Date().toISOString();
  await s3.send(
    new PutObjectCommand({
      Body: outputContent,
      Bucket: bucket,
      ContentType: "text/markdown; charset=utf-8",
      Key: gptProArtifactS3Key({ batchId: normalizedBatchId, prefix, relativePath: outputPath }),
      Metadata: {
        "gpt-pro-work-batch": encodeURIComponent(normalizedBatchId),
        "gpt-pro-work-prompt-path": encodeURIComponent(normalizedPromptPath),
        "gpt-pro-work-saved-at": savedAt
      },
      ServerSideEncryption: "AES256"
    })
  );
  return {
    batchId: normalizedBatchId,
    outputPath,
    promptPath: normalizedPromptPath,
    savedAt,
    sizeBytes,
    storageStatus: "s3"
  };
}
