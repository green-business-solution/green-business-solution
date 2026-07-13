import { createHash } from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import sharp from "sharp";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const FRAME_FILE_PATTERN = /^ezgif-frame-(\d{3})\.jpg$/;
export const FRAME_PIPELINE_SCHEMA = "retrofi_home_journey_frames.v1";
export const FRAME_PIPELINE_VERSION = 1;
export const DEFAULT_FRAME_TIERS = Object.freeze([
  Object.freeze({ id: "1080p", width: 1920, height: 1080, quality: 82 }),
  Object.freeze({ id: "1440p", width: 2560, height: 1440, quality: 82 }),
]);

const DEFAULT_SOURCE_DIRECTORY = path.join(repoRoot, "public/how-it-works/scroll-frames");
const DEFAULT_OUTPUT_ROOT = path.join(DEFAULT_SOURCE_DIRECTORY, "generated");
const DEFAULT_RUNTIME_CONFIG = path.join(repoRoot, "apps/web/src/lib/homeJourneyFrameBuild.json");
const EXPECTED_FRAME_COUNT = 300;
const WEB_PUBLIC_ROOT = path.join(repoRoot, "public");

function toPosixPath(value) {
  return value.split(path.sep).join("/");
}

function formatFrameNumber(frameNumber) {
  return String(frameNumber).padStart(3, "0");
}

async function hashFile(filePath) {
  const hash = createHash("sha256");
  const bytes = await fs.readFile(filePath);
  hash.update(bytes);
  return hash.digest("hex");
}

function hashJson(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

export async function discoverFrameSequence({
  expectedCount = EXPECTED_FRAME_COUNT,
  sourceDirectory = DEFAULT_SOURCE_DIRECTORY,
} = {}) {
  const directoryEntries = await fs.readdir(sourceDirectory, { withFileTypes: true });
  const numberedFrames = new Map();
  const unexpectedFiles = [];

  for (const entry of directoryEntries) {
    if (!entry.isFile()) {
      continue;
    }

    const match = FRAME_FILE_PATTERN.exec(entry.name);
    if (!match) {
      unexpectedFiles.push(entry.name);
      continue;
    }

    const frameNumber = Number(match[1]);
    if (numberedFrames.has(frameNumber)) {
      throw new Error(`Duplicate frame number ${frameNumber} in ${sourceDirectory}.`);
    }

    numberedFrames.set(frameNumber, {
      fileName: entry.name,
      frameNumber,
      sourcePath: path.join(sourceDirectory, entry.name),
    });
  }

  if (numberedFrames.size === 0) {
    throw new Error(`No frames matching ${FRAME_FILE_PATTERN} were found in ${sourceDirectory}.`);
  }

  const sortedNumbers = [...numberedFrames.keys()].sort((first, second) => first - second);
  const firstFrameNumber = sortedNumbers[0];
  const finalFrameNumber = sortedNumbers.at(-1);
  const missingNumbers = [];

  for (let frameNumber = firstFrameNumber; frameNumber <= finalFrameNumber; frameNumber += 1) {
    if (!numberedFrames.has(frameNumber)) {
      missingNumbers.push(frameNumber);
    }
  }

  if (firstFrameNumber !== 1 || missingNumbers.length > 0) {
    throw new Error(
      `Frame sequence must be continuous from 001. Missing: ${missingNumbers.map(formatFrameNumber).join(", ") || "001"}.`,
    );
  }

  if (expectedCount !== undefined && numberedFrames.size !== expectedCount) {
    throw new Error(`Expected ${expectedCount} frames but found ${numberedFrames.size} in ${sourceDirectory}.`);
  }

  const frames = [];
  let sourceWidth = null;
  let sourceHeight = null;

  for (const frameNumber of sortedNumbers) {
    const frame = numberedFrames.get(frameNumber);
    const [metadata, sourceSha256, stats] = await Promise.all([
      sharp(frame.sourcePath).metadata(),
      hashFile(frame.sourcePath),
      fs.stat(frame.sourcePath),
    ]);

    if (!metadata.width || !metadata.height || metadata.format !== "jpeg") {
      throw new Error(`${frame.fileName} must be a readable JPEG with known dimensions.`);
    }

    sourceWidth ??= metadata.width;
    sourceHeight ??= metadata.height;
    if (metadata.width !== sourceWidth || metadata.height !== sourceHeight) {
      throw new Error(
        `${frame.fileName} is ${metadata.width}x${metadata.height}; expected ${sourceWidth}x${sourceHeight}.`,
      );
    }

    frames.push({
      ...frame,
      bytes: stats.size,
      height: metadata.height,
      sourceSha256,
      width: metadata.width,
    });
  }

  const canonicalByHash = new Map();
  for (const frame of frames) {
    const canonicalFrameNumber = canonicalByHash.get(frame.sourceSha256) ?? frame.frameNumber;
    canonicalByHash.set(frame.sourceSha256, canonicalFrameNumber);
    frame.canonicalFrameNumber = canonicalFrameNumber;
  }

  return {
    frames,
    source: {
      aggregateSha256: hashJson(frames.map(({ frameNumber, sourceSha256 }) => ({ frameNumber, sourceSha256 }))),
      bytes: frames.reduce((total, frame) => total + frame.bytes, 0),
      count: frames.length,
      duplicateCount: frames.filter((frame) => frame.canonicalFrameNumber !== frame.frameNumber).length,
      height: sourceHeight,
      pattern: "ezgif-frame-{number}.jpg",
      uniqueCount: canonicalByHash.size,
      unexpectedFiles: unexpectedFiles.sort(),
      width: sourceWidth,
    },
  };
}

export function createPipelineIdentity({ source, tiers = DEFAULT_FRAME_TIERS }) {
  const pipeline = {
    encoder: {
      effort: 6,
      format: "webp",
      smartSubsample: true,
    },
    qualityMode: "resampled",
    resizeKernel: "lanczos3",
    sharpVersion: sharp.versions.sharp,
    tiers: tiers.map(({ height, id, quality, width }) => ({ height, id, quality, width })),
    version: FRAME_PIPELINE_VERSION,
    vipsVersion: sharp.versions.vips,
  };
  const signature = hashJson({ pipeline, sourceAggregateSha256: source.aggregateSha256 });

  return {
    pipeline,
    signature,
    version: signature.slice(0, 16),
  };
}

async function validateVariant(filePath, tier) {
  const [metadata, stats, sha256] = await Promise.all([
    sharp(filePath).metadata(),
    fs.stat(filePath),
    hashFile(filePath),
  ]);

  if (metadata.format !== "webp" || metadata.width !== tier.width || metadata.height !== tier.height) {
    throw new Error(
      `${filePath} is ${metadata.format ?? "unknown"} ${metadata.width ?? "?"}x${metadata.height ?? "?"}; ` +
        `expected WebP ${tier.width}x${tier.height}.`,
    );
  }

  return { bytes: stats.size, sha256 };
}

async function mapWithConcurrency(items, concurrency, task) {
  let cursor = 0;
  const workers = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (cursor < items.length) {
      const itemIndex = cursor;
      cursor += 1;
      await task(items[itemIndex], itemIndex);
    }
  });
  await Promise.all(workers);
}

function publicUrlFor(filePath) {
  const relativePath = path.relative(WEB_PUBLIC_ROOT, filePath);
  return `/${toPosixPath(relativePath)}`;
}

function assertManifestStructure({ identity, manifest, sequence, tiers, versionDirectory }) {
  if (manifest?.schemaVersion !== FRAME_PIPELINE_SCHEMA) {
    throw new Error(`Generated manifest must use schema ${FRAME_PIPELINE_SCHEMA}.`);
  }
  const expectedPipeline = { ...identity.pipeline, signature: identity.signature };
  if (
    manifest.version !== identity.version ||
    JSON.stringify(manifest.pipeline) !== JSON.stringify(expectedPipeline)
  ) {
    throw new Error("Generated manifest does not match the current source and pipeline identity.");
  }

  const expectedSource = sequence.source;
  for (const key of [
    "aggregateSha256",
    "bytes",
    "count",
    "duplicateCount",
    "height",
    "pattern",
    "uniqueCount",
    "width",
  ]) {
    if (manifest.source?.[key] !== expectedSource[key]) {
      throw new Error(`Generated manifest source.${key} does not match the validated source sequence.`);
    }
  }

  const expectedTiers = tiers.map(({ height, id, quality, width }) => ({
    format: "webp",
    height,
    id,
    quality,
    width,
  }));
  if (JSON.stringify(manifest.tiers) !== JSON.stringify(expectedTiers)) {
    throw new Error("Generated manifest tiers do not match the configured delivery tiers.");
  }
  if (!Array.isArray(manifest.frames) || manifest.frames.length !== sequence.frames.length) {
    throw new Error(
      `Generated manifest must contain exactly ${sequence.frames.length} ordered frame records.`,
    );
  }

  for (let index = 0; index < sequence.frames.length; index += 1) {
    const expectedFrame = sequence.frames[index];
    const manifestFrame = manifest.frames[index];
    if (
      manifestFrame?.frameNumber !== expectedFrame.frameNumber ||
      manifestFrame?.canonicalFrameNumber !== expectedFrame.canonicalFrameNumber
    ) {
      throw new Error(`Generated manifest frame ${index + 1} has an invalid number or canonical mapping.`);
    }

    const expectedSourceRecord = {
      bytes: expectedFrame.bytes,
      height: expectedFrame.height,
      path: publicUrlFor(expectedFrame.sourcePath),
      sha256: expectedFrame.sourceSha256,
      width: expectedFrame.width,
    };
    if (JSON.stringify(manifestFrame.source) !== JSON.stringify(expectedSourceRecord)) {
      throw new Error(`Generated manifest frame ${expectedFrame.frameNumber} has invalid source metadata.`);
    }
    if (!Array.isArray(manifestFrame.variants) || manifestFrame.variants.length !== tiers.length) {
      throw new Error(
        `Generated manifest frame ${expectedFrame.frameNumber} must contain one variant per configured tier.`,
      );
    }

    const variantsByTier = new Map(manifestFrame.variants.map((variant) => [variant.tier, variant]));
    if (variantsByTier.size !== tiers.length) {
      throw new Error(`Generated manifest frame ${expectedFrame.frameNumber} contains duplicate variant tiers.`);
    }
    for (const tier of tiers) {
      const variant = variantsByTier.get(tier.id);
      const expectedPath = publicUrlFor(path.join(
        versionDirectory,
        tier.id,
        `ezgif-frame-${formatFrameNumber(expectedFrame.canonicalFrameNumber)}.webp`,
      ));
      if (
        !variant ||
        variant.format !== "webp" ||
        variant.width !== tier.width ||
        variant.height !== tier.height ||
        variant.path !== expectedPath ||
        !Number.isInteger(variant.bytes) ||
        variant.bytes <= 0 ||
        !/^[a-f0-9]{64}$/.test(variant.sha256)
      ) {
        throw new Error(
          `Generated manifest frame ${expectedFrame.frameNumber} has invalid ${tier.id} variant metadata.`,
        );
      }
    }
  }

  for (const tier of tiers) {
    const canonicalVariants = manifest.frames
      .filter((frame) => frame.frameNumber === frame.canonicalFrameNumber)
      .map((frame) => frame.variants.find((variant) => variant.tier === tier.id));
    const expectedTotal = {
      bytes: canonicalVariants.reduce((total, variant) => total + variant.bytes, 0),
      files: canonicalVariants.length,
    };
    if (JSON.stringify(manifest.totals?.[tier.id]) !== JSON.stringify(expectedTotal)) {
      throw new Error(`Generated manifest totals for ${tier.id} are inconsistent.`);
    }
  }
}

function assertRuntimeConfigStructure({ identity, runtimeConfig, sequence, tiers }) {
  if (runtimeConfig?.schemaVersion !== FRAME_PIPELINE_SCHEMA || runtimeConfig.version !== identity.version) {
    throw new Error("Runtime frame config does not match the current manifest schema and version.");
  }
  const expectedCanonicalFrames = sequence.frames.map((frame) => frame.canonicalFrameNumber);
  if (JSON.stringify(runtimeConfig.canonicalFrameNumbers) !== JSON.stringify(expectedCanonicalFrames)) {
    throw new Error("Runtime frame config has an invalid canonical frame mapping.");
  }
  const expectedTiers = tiers.map(({ height, id, width }) => ({ format: "webp", height, id, width }));
  if (JSON.stringify(runtimeConfig.tiers) !== JSON.stringify(expectedTiers)) {
    throw new Error("Runtime frame config tiers do not match the generated manifest.");
  }
}

export async function generateFrameAssets({
  concurrency = Math.max(1, Math.min(4, Number(process.env.FRAME_GENERATION_CONCURRENCY) || 4)),
  dryRun = false,
  expectedCount = EXPECTED_FRAME_COUNT,
  outputRoot = DEFAULT_OUTPUT_ROOT,
  runtimeConfigPath = DEFAULT_RUNTIME_CONFIG,
  sourceDirectory = DEFAULT_SOURCE_DIRECTORY,
  tiers = DEFAULT_FRAME_TIERS,
} = {}) {
  const sequence = await discoverFrameSequence({ expectedCount, sourceDirectory });
  for (const tier of tiers) {
    if (sequence.source.width * tier.height !== sequence.source.height * tier.width) {
      throw new Error(
        `Source aspect ratio ${sequence.source.width}x${sequence.source.height} does not match tier ${tier.id} (${tier.width}x${tier.height}).`,
      );
    }
  }
  const identity = createPipelineIdentity({ source: sequence.source, tiers });
  const versionDirectory = path.join(outputRoot, identity.version);
  const manifestPath = path.join(versionDirectory, "manifest.json");
  const canonicalFrames = sequence.frames.filter(
    (frame) => frame.canonicalFrameNumber === frame.frameNumber,
  );

  if (dryRun) {
    return {
      generated: false,
      identity,
      manifestPath,
      sequence,
      versionDirectory,
    };
  }

  let existingManifest = null;
  try {
    existingManifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
  } catch (error) {
    if (error?.code !== "ENOENT") {
      throw error;
    }
  }

  if (existingManifest?.pipeline?.signature === identity.signature) {
    assertManifestStructure({
      identity,
      manifest: existingManifest,
      sequence,
      tiers,
      versionDirectory,
    });
    for (const frame of existingManifest.frames) {
      for (const variant of frame.variants) {
        const tier = tiers.find((candidate) => candidate.id === variant.tier);
        if (!tier) {
          throw new Error(`Existing manifest contains unknown tier ${variant.tier}.`);
        }
        const validated = await validateVariant(
          path.join(versionDirectory, variant.tier, path.basename(variant.path)),
          tier,
        );
        if (validated.bytes !== variant.bytes || validated.sha256 !== variant.sha256) {
          throw new Error(
            `${variant.path} does not match its manifest. Remove the corrupt generated version and rerun npm run frames:home-journey.`,
          );
        }
      }
    }

    await writeRuntimeConfig({
      identity,
      runtimeConfigPath,
      sequence,
      tiers,
    });
    return {
      generated: false,
      identity,
      manifest: existingManifest,
      manifestPath,
      sequence,
      versionDirectory,
    };
  }

  const stagingDirectory = path.join(outputRoot, `.staging-${identity.version}-${process.pid}`);
  await fs.rm(stagingDirectory, { force: true, recursive: true });
  await fs.mkdir(stagingDirectory, { recursive: true });

  const canonicalManifestFrames = new Map();

  try {
    for (const tier of tiers) {
      const tierDirectory = path.join(stagingDirectory, tier.id);
      await fs.mkdir(tierDirectory, { recursive: true });

      await mapWithConcurrency(canonicalFrames, concurrency, async (frame) => {
        const outputPath = path.join(tierDirectory, `ezgif-frame-${formatFrameNumber(frame.frameNumber)}.webp`);
        await sharp(frame.sourcePath)
          .resize(tier.width, tier.height, {
            fit: "fill",
            kernel: sharp.kernel.lanczos3,
          })
          .webp({
            effort: 6,
            quality: tier.quality,
            smartSubsample: true,
          })
          .toFile(outputPath);

        const validated = await validateVariant(outputPath, tier);
        const variants = canonicalManifestFrames.get(frame.frameNumber) ?? [];
        variants.push({
          bytes: validated.bytes,
          format: "webp",
          height: tier.height,
          path: publicUrlFor(path.join(versionDirectory, tier.id, path.basename(outputPath))),
          sha256: validated.sha256,
          tier: tier.id,
          width: tier.width,
        });
        canonicalManifestFrames.set(frame.frameNumber, variants);
      });
    }

    const manifestFrames = sequence.frames.map((frame) => ({
      canonicalFrameNumber: frame.canonicalFrameNumber,
      frameNumber: frame.frameNumber,
      source: {
        bytes: frame.bytes,
        height: frame.height,
        path: publicUrlFor(frame.sourcePath),
        sha256: frame.sourceSha256,
        width: frame.width,
      },
      variants: canonicalManifestFrames.get(frame.canonicalFrameNumber),
    }));
    const totals = Object.fromEntries(
      tiers.map((tier) => {
        const variants = [...canonicalManifestFrames.values()].flat().filter((variant) => variant.tier === tier.id);
        return [tier.id, {
          bytes: variants.reduce((total, variant) => total + variant.bytes, 0),
          files: variants.length,
        }];
      }),
    );
    const manifest = {
      frames: manifestFrames,
      pipeline: {
        ...identity.pipeline,
        signature: identity.signature,
      },
      schemaVersion: FRAME_PIPELINE_SCHEMA,
      source: sequence.source,
      tiers: tiers.map(({ height, id, quality, width }) => ({
        format: "webp",
        height,
        id,
        quality,
        width,
      })),
      totals,
      version: identity.version,
    };

    assertManifestStructure({ identity, manifest, sequence, tiers, versionDirectory });

    await fs.writeFile(
      path.join(stagingDirectory, "manifest.json"),
      `${JSON.stringify(manifest, null, 2)}\n`,
    );
    await fs.mkdir(outputRoot, { recursive: true });
    await fs.rename(stagingDirectory, versionDirectory);
    await writeRuntimeConfig({ identity, runtimeConfigPath, sequence, tiers });

    return {
      generated: true,
      identity,
      manifest,
      manifestPath,
      sequence,
      versionDirectory,
    };
  } catch (error) {
    await fs.rm(stagingDirectory, { force: true, recursive: true });
    throw error;
  }
}

async function writeRuntimeConfig({ identity, runtimeConfigPath, sequence, tiers }) {
  const runtimeConfig = {
    canonicalFrameNumbers: sequence.frames.map((frame) => frame.canonicalFrameNumber),
    schemaVersion: FRAME_PIPELINE_SCHEMA,
    tiers: tiers.map(({ height, id, width }) => ({ format: "webp", height, id, width })),
    version: identity.version,
  };
  assertRuntimeConfigStructure({ identity, runtimeConfig, sequence, tiers });
  await fs.mkdir(path.dirname(runtimeConfigPath), { recursive: true });
  const temporaryConfigPath = `${runtimeConfigPath}.tmp-${process.pid}`;
  try {
    await fs.writeFile(temporaryConfigPath, `${JSON.stringify(runtimeConfig, null, 2)}\n`);
    await fs.rename(temporaryConfigPath, runtimeConfigPath);
  } catch (error) {
    await fs.rm(temporaryConfigPath, { force: true });
    throw error;
  }
}

export async function checkGeneratedFrameAssets(options = {}) {
  const result = await generateFrameAssets({ ...options, dryRun: true });
  const runtimeConfigPath = options.runtimeConfigPath ?? DEFAULT_RUNTIME_CONFIG;
  const runtimeConfig = JSON.parse(await fs.readFile(runtimeConfigPath, "utf8"));
  assertRuntimeConfigStructure({
    identity: result.identity,
    runtimeConfig,
    sequence: result.sequence,
    tiers: options.tiers ?? DEFAULT_FRAME_TIERS,
  });

  const manifest = JSON.parse(await fs.readFile(result.manifestPath, "utf8"));
  assertManifestStructure({
    identity: result.identity,
    manifest,
    sequence: result.sequence,
    tiers: options.tiers ?? DEFAULT_FRAME_TIERS,
    versionDirectory: result.versionDirectory,
  });

  for (const frame of manifest.frames) {
    for (const variant of frame.variants) {
      const tier = (options.tiers ?? DEFAULT_FRAME_TIERS).find((candidate) => candidate.id === variant.tier);
      const validated = await validateVariant(
        path.join(result.versionDirectory, variant.tier, path.basename(variant.path)),
        tier,
      );
      if (validated.bytes !== variant.bytes || validated.sha256 !== variant.sha256) {
        throw new Error(`${variant.path} does not match its recorded byte size and SHA-256.`);
      }
    }
  }

  return { ...result, manifest };
}

function parseCliArguments(argv) {
  const options = {};
  let mode = "generate";

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--check") {
      mode = "check";
      continue;
    }
    if (argument === "--dry-run") {
      options.dryRun = true;
      continue;
    }
    if (argument === "--source") {
      options.sourceDirectory = path.resolve(argv[++index]);
      continue;
    }
    if (argument === "--output") {
      options.outputRoot = path.resolve(argv[++index]);
      continue;
    }
    if (argument === "--runtime-config") {
      options.runtimeConfigPath = path.resolve(argv[++index]);
      continue;
    }
    throw new Error(`Unknown argument: ${argument}`);
  }

  return { mode, options };
}

async function main() {
  const { mode, options } = parseCliArguments(process.argv.slice(2));
  const result = mode === "check"
    ? await checkGeneratedFrameAssets(options)
    : await generateFrameAssets(options);
  const generatedTotals = result.manifest?.totals ?? {};

  console.log(`Validated ${result.sequence.source.count} source frames (${result.sequence.source.uniqueCount} unique).`);
  console.log(`Frame asset version: ${result.identity.version}`);
  for (const [tier, total] of Object.entries(generatedTotals)) {
    console.log(`${tier}: ${total.files} WebP files, ${total.bytes} bytes.`);
  }
  if (options.dryRun) {
    console.log(`Dry run: assets would be written to ${result.versionDirectory}.`);
  } else if (mode === "check") {
    console.log("Generated frame assets are current and valid.");
  } else {
    console.log(result.generated ? `Generated assets in ${result.versionDirectory}.` : "Existing generated assets are current.");
  }
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
