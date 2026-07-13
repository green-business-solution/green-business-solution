import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

import sharp from "sharp";
import { afterEach, describe, expect, it } from "vitest";

import {
  checkGeneratedFrameAssets,
  createPipelineIdentity,
  discoverFrameSequence,
  generateFrameAssets,
} from "./generate-home-journey-frames.mjs";

const temporaryDirectories = [];

async function createTemporaryDirectory() {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), "retrofi-frame-pipeline-"));
  temporaryDirectories.push(directory);
  return directory;
}

async function writeJpeg(filePath, color) {
  await sharp({
    create: {
      background: color,
      channels: 3,
      height: 9,
      width: 16,
    },
  })
    .jpeg({ quality: 90 })
    .toFile(filePath);
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      fs.rm(directory, { force: true, recursive: true }),
    ),
  );
});

describe("home journey frame source validation", () => {
  it("discovers a continuous numeric sequence and records exact duplicates", async () => {
    const sourceDirectory = await createTemporaryDirectory();
    await writeJpeg(path.join(sourceDirectory, "ezgif-frame-001.jpg"), "#163c2b");
    await fs.copyFile(
      path.join(sourceDirectory, "ezgif-frame-001.jpg"),
      path.join(sourceDirectory, "ezgif-frame-002.jpg"),
    );
    await writeJpeg(path.join(sourceDirectory, "ezgif-frame-003.jpg"), "#b7d9c4");

    const sequence = await discoverFrameSequence({ expectedCount: 3, sourceDirectory });

    expect(sequence.frames.map((frame) => frame.frameNumber)).toEqual([1, 2, 3]);
    expect(sequence.frames.map((frame) => frame.canonicalFrameNumber)).toEqual([1, 1, 3]);
    expect(sequence.source).toMatchObject({
      count: 3,
      duplicateCount: 1,
      height: 9,
      uniqueCount: 2,
      width: 16,
    });
  });

  it("fails clearly when the numeric sequence has a gap", async () => {
    const sourceDirectory = await createTemporaryDirectory();
    await writeJpeg(path.join(sourceDirectory, "ezgif-frame-001.jpg"), "#163c2b");
    await writeJpeg(path.join(sourceDirectory, "ezgif-frame-003.jpg"), "#b7d9c4");

    await expect(
      discoverFrameSequence({ expectedCount: 2, sourceDirectory }),
    ).rejects.toThrow("Missing: 002");
  });

  it("fails when a source frame has inconsistent dimensions", async () => {
    const sourceDirectory = await createTemporaryDirectory();
    await writeJpeg(path.join(sourceDirectory, "ezgif-frame-001.jpg"), "#163c2b");
    await sharp({
      create: {
        background: "#b7d9c4",
        channels: 3,
        height: 10,
        width: 16,
      },
    }).jpeg().toFile(path.join(sourceDirectory, "ezgif-frame-002.jpg"));

    await expect(
      discoverFrameSequence({ expectedCount: 2, sourceDirectory }),
    ).rejects.toThrow("expected 16x9");
  });

  it("rejects a source aspect ratio that would be distorted by a delivery tier", async () => {
    const workingDirectory = await createTemporaryDirectory();
    const sourceDirectory = path.join(workingDirectory, "source");
    await fs.mkdir(sourceDirectory);
    await sharp({
      create: {
        background: "#163c2b",
        channels: 3,
        height: 10,
        width: 16,
      },
    }).jpeg().toFile(path.join(sourceDirectory, "ezgif-frame-001.jpg"));

    await expect(generateFrameAssets({
      expectedCount: 1,
      outputRoot: path.join(workingDirectory, "generated"),
      runtimeConfigPath: path.join(workingDirectory, "runtime-config.json"),
      sourceDirectory,
      tiers: [{ id: "test", width: 32, height: 18, quality: 80 }],
    })).rejects.toThrow("does not match tier test");
  });
});

describe("home journey frame generation", () => {
  it("writes deterministic WebP tiers and reuses canonical duplicate outputs", async () => {
    const workingDirectory = await createTemporaryDirectory();
    const sourceDirectory = path.join(workingDirectory, "source");
    const outputRoot = path.join(workingDirectory, "generated");
    const runtimeConfigPath = path.join(workingDirectory, "runtime-config.json");
    const tiers = [
      { id: "test", width: 32, height: 18, quality: 80 },
    ];
    await fs.mkdir(sourceDirectory);
    await writeJpeg(path.join(sourceDirectory, "ezgif-frame-001.jpg"), "#163c2b");
    await fs.copyFile(
      path.join(sourceDirectory, "ezgif-frame-001.jpg"),
      path.join(sourceDirectory, "ezgif-frame-002.jpg"),
    );
    await writeJpeg(path.join(sourceDirectory, "ezgif-frame-003.jpg"), "#b7d9c4");

    const firstRun = await generateFrameAssets({
      concurrency: 2,
      expectedCount: 3,
      outputRoot,
      runtimeConfigPath,
      sourceDirectory,
      tiers,
    });
    const firstOutputStats = await fs.stat(
      path.join(firstRun.versionDirectory, "test/ezgif-frame-001.webp"),
    );
    const generatedFiles = await fs.readdir(path.join(firstRun.versionDirectory, "test"));
    const secondRun = await generateFrameAssets({
      concurrency: 2,
      expectedCount: 3,
      outputRoot,
      runtimeConfigPath,
      sourceDirectory,
      tiers,
    });
    const secondOutputStats = await fs.stat(
      path.join(secondRun.versionDirectory, "test/ezgif-frame-001.webp"),
    );

    expect(firstRun.generated).toBe(true);
    expect(secondRun.generated).toBe(false);
    expect(generatedFiles).toEqual(["ezgif-frame-001.webp", "ezgif-frame-003.webp"]);
    expect(secondOutputStats.mtimeMs).toBe(firstOutputStats.mtimeMs);
    expect(firstRun.manifest.frames.map((frame) => frame.canonicalFrameNumber)).toEqual([1, 1, 3]);
    expect(firstRun.manifest.totals.test).toMatchObject({ files: 2 });

    const runtimeConfig = JSON.parse(await fs.readFile(runtimeConfigPath, "utf8"));
    expect(runtimeConfig).toMatchObject({
      canonicalFrameNumbers: [1, 1, 3],
      version: firstRun.identity.version,
    });
  });

  it("changes the content version when encoder settings change", () => {
    const source = { aggregateSha256: "source-hash" };
    const versionA = createPipelineIdentity({
      source,
      tiers: [{ id: "test", width: 32, height: 18, quality: 80 }],
    }).version;
    const versionB = createPipelineIdentity({
      source,
      tiers: [{ id: "test", width: 32, height: 18, quality: 81 }],
    }).version;

    expect(versionA).not.toBe(versionB);
  });

  it("rejects a generated output whose bytes no longer match the manifest", async () => {
    const workingDirectory = await createTemporaryDirectory();
    const sourceDirectory = path.join(workingDirectory, "source");
    const outputRoot = path.join(workingDirectory, "generated");
    const runtimeConfigPath = path.join(workingDirectory, "runtime-config.json");
    const tiers = [{ id: "test", width: 32, height: 18, quality: 80 }];
    await fs.mkdir(sourceDirectory);
    await writeJpeg(path.join(sourceDirectory, "ezgif-frame-001.jpg"), "#163c2b");

    const firstRun = await generateFrameAssets({
      expectedCount: 1,
      outputRoot,
      runtimeConfigPath,
      sourceDirectory,
      tiers,
    });
    const outputPath = path.join(firstRun.versionDirectory, "test/ezgif-frame-001.webp");
    await sharp({
      create: {
        background: "#ffffff",
        channels: 3,
        height: 18,
        width: 32,
      },
    }).webp({ quality: 80 }).toFile(outputPath);

    await expect(generateFrameAssets({
      expectedCount: 1,
      outputRoot,
      runtimeConfigPath,
      sourceDirectory,
      tiers,
    })).rejects.toThrow("does not match its manifest");
  });

  it("rejects incomplete manifests and runtime canonical mappings", async () => {
    const workingDirectory = await createTemporaryDirectory();
    const sourceDirectory = path.join(workingDirectory, "source");
    const outputRoot = path.join(workingDirectory, "generated");
    const runtimeConfigPath = path.join(workingDirectory, "runtime-config.json");
    const tiers = [{ id: "test", width: 32, height: 18, quality: 80 }];
    await fs.mkdir(sourceDirectory);
    await writeJpeg(path.join(sourceDirectory, "ezgif-frame-001.jpg"), "#163c2b");

    const firstRun = await generateFrameAssets({
      expectedCount: 1,
      outputRoot,
      runtimeConfigPath,
      sourceDirectory,
      tiers,
    });
    const manifest = JSON.parse(await fs.readFile(firstRun.manifestPath, "utf8"));
    manifest.frames = [];
    await fs.writeFile(firstRun.manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

    await expect(generateFrameAssets({
      expectedCount: 1,
      outputRoot,
      runtimeConfigPath,
      sourceDirectory,
      tiers,
    })).rejects.toThrow("exactly 1 ordered frame records");

    manifest.frames = firstRun.manifest.frames;
    manifest.pipeline.qualityMode = "tampered";
    await fs.writeFile(firstRun.manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

    await expect(checkGeneratedFrameAssets({
      expectedCount: 1,
      outputRoot,
      runtimeConfigPath,
      sourceDirectory,
      tiers,
    })).rejects.toThrow("pipeline identity");

    manifest.pipeline = firstRun.manifest.pipeline;
    await fs.writeFile(firstRun.manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
    const runtimeConfig = JSON.parse(await fs.readFile(runtimeConfigPath, "utf8"));
    runtimeConfig.canonicalFrameNumbers = [];
    await fs.writeFile(runtimeConfigPath, `${JSON.stringify(runtimeConfig, null, 2)}\n`);

    await expect(checkGeneratedFrameAssets({
      expectedCount: 1,
      outputRoot,
      runtimeConfigPath,
      sourceDirectory,
      tiers,
    })).rejects.toThrow("invalid canonical frame mapping");
  });
});
