import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile
} from "node:fs/promises";
import { createHash } from "node:crypto";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";

import { expect, test, vi } from "vitest";

import {
  RESEARCH_AWS_PROFILE,
  RESEARCH_AWS_REGION,
  RESEARCH_S3_BUCKET,
  invalidateExecutionReceiptsAfterHydration,
  manifestSourceSha256,
  writeManifestAtomically
} from "../storage/aws-guard.mjs";
import {
  RESTORE_ALL_OFFLINE_VALIDATION_COMMAND,
  assertRestoreAllManifestMayProceed,
  exactVerifiedRemoteRecords,
  planRestoreAllPackages,
  restoreAllPackagesCheckpointed
} from "../storage/restore-all.mjs";
import {
  CACHE_RELATIVE_PATH,
  STORAGE_SCHEMA_VERSION,
  sha256CanonicalJson,
  sha256Path
} from "../storage/inventory.mjs";

const destination = Object.freeze({
  profile: RESEARCH_AWS_PROFILE,
  bucket: RESEARCH_S3_BUCKET,
  region: RESEARCH_AWS_REGION
});
const TEST_HEAD =
  "0123456789abcdef0123456789abcdef01234567";

function resealManifest(manifest) {
  delete manifest.manifestContentSha256;
  manifest.manifestContentSha256 =
    sha256CanonicalJson(manifest);
  return manifest;
}

function packageRecord({
  packageId,
  localPath,
  content,
  packageType = "SOURCE_ARTIFACT",
  localRetentionPolicy =
    "DELETE_AFTER_VERIFIED_MIGRATION",
  parentPackageId = null,
  localLifecycle = null,
  coverage = null,
  fingerprint = null,
  embeddedMember = null,
  plannedObjectExtras = null
}) {
  const bytes = Buffer.from(content);
  const sha256 = createHash("sha256")
    .update(bytes)
    .digest("hex");
  const key =
    `raw/test/release/${sha256}/` +
    `${packageId.replaceAll(":", "-")}.bin`;
  return {
    packageId,
    packageType,
    localPath,
    coverage:
      coverage ?? {
        mode: "EXACT_FILE",
        fileCount: 1,
        totalSizeBytes: bytes.length
      },
    fingerprint:
      fingerprint ?? {
        algorithm: "SHA-256",
        digest: sha256
      },
    plannedObject: {
      key,
      contentType: "application/octet-stream",
      expectedSizeBytes: bytes.length,
      expectedSha256: sha256,
      uploadReady: true,
      state: "PLANNED",
      ...plannedObjectExtras
    },
    localRetentionPolicy,
    parentPackageId,
    localLifecycle,
    embeddedMember,
    sourceOrganization: "Test",
    source: {
      status: "DOCUMENTED",
      urls: ["https://example.test/source"],
      standardIds: ["TEST"],
      blocker: null
    },
    release: {
      status: "PINNED",
      identities: ["test-release"],
      commitShas: [],
      blocker: null
    },
    acquisition: {
      status: "DOCUMENTED",
      modes: ["TEST"],
      timestamps: ["2026-07-24T00:00:00.000Z"],
      blocker: null
    },
    license: {
      status: "DOCUMENTED_REVIEW_RETAINED",
      statements: ["Test license"],
      legalReview: [],
      blocker: null
    },
    ingestion: {
      status: "REFERENCED_BY_RESEARCH_PROOF",
      manifests: ["test"],
      adapters: [],
      blocker: null
    },
    acquisitionTimestamp: "2026-07-24T00:00:00.000Z",
    remote: {
      s3: {
        bucket: RESEARCH_S3_BUCKET,
        key,
        s3Uri: `s3://${RESEARCH_S3_BUCKET}/${key}`,
        versionId: `version-${packageId}`,
        etag: '"etag"',
        contentLength: bytes.length,
        contentType: "application/octet-stream",
        checksumSha256Base64:
          Buffer.from(sha256, "hex").toString("base64"),
        metadataSha256: sha256,
        serverSideEncryption: "AES256",
        kmsKeyId: null,
        uploadedAt: "2026-07-24T00:00:00.000Z",
        verifiedAt: "2026-07-24T00:00:00.000Z",
        verificationStatus: "VERIFIED",
        deletionStatus: "LOCAL_DELETED_AFTER_VERIFICATION"
      }
    },
    cleanupEligibility: {
      status: "BLOCKED",
      activeConsumerPaths: [],
      validatedConsumerPaths: [],
      validationCommand: null,
      validationStatus: "NOT_RUN",
      validatedAt: null,
      validatedSourceCommit: null,
      validatedRepositoryTreeDigest: null,
      restoredVersionId: `version-${packageId}`,
      restoredSha256: sha256,
      restoredAt: "2026-07-24T00:00:00.000Z",
      blocker: "test"
    },
    testContent: content
  };
}

function testManifest(packages) {
  return resealManifest({
    schemaVersion: STORAGE_SCHEMA_VERSION,
    destination: {
      s3: {
        accountId: "945129430686",
        profile: RESEARCH_AWS_PROFILE,
        region: RESEARCH_AWS_REGION,
        bucket: RESEARCH_S3_BUCKET,
        verificationStatus:
          "CALLER_AND_BUCKET_CONTROLS_VERIFIED",
        infrastructureStatus:
          "VERIFIED_FOR_OBJECT_IO",
        blocker: null
      }
    },
    packages,
    execution: {
      uploadsPerformed: true,
      localFilesDeleted: true
    }
  });
}

function simplePackages() {
  const repository = packageRecord({
    packageId: "repository:model",
    packageType: "PINNED_GIT_REPOSITORY",
    localPath: `${CACHE_RELATIVE_PATH}/repos/model`,
    content: "repository-bundle",
    coverage: {
      mode: "RECURSIVE_LOGICAL_PACKAGE",
      includesVersionControlMetadata: true
    },
    fingerprint: {
      algorithm:
        "GIT_TREE_PLUS_SHA256_INDEX_LISTING",
      commitSha: TEST_HEAD,
      gitTreeObjectSha1:
        "1234567890abcdef1234567890abcdef12345678",
      gitIndexListingSha256:
        "1".repeat(64),
      workingTreeClean: true
    }
  });
  const repositoryLicense = packageRecord({
    packageId: "license:model",
    packageType: "REPOSITORY_LICENSE_ARTIFACT",
    localPath: `${repository.localPath}/LICENSE`,
    content: "license",
    localRetentionPolicy:
      "DELETE_WITH_PARENT_REPOSITORY",
    parentPackageId: repository.packageId,
    localLifecycle: {
      ownerPackageId: repository.packageId
    },
    coverage: {
      mode: "DUPLICATE_CHILD_OBJECT",
      fileCount: 1,
      totalSizeBytes: 7
    }
  });
  const archive = packageRecord({
    packageId: "archive:source",
    localPath: `${CACHE_RELATIVE_PATH}/artifacts/source.zip`,
    content: "archive"
  });
  const embedded = packageRecord({
    packageId: "license:embedded",
    packageType: "EMBEDDED_LICENSE_ARTIFACT",
    localPath: archive.localPath,
    content: "embedded-license",
    localRetentionPolicy:
      "DELETE_WITH_PARENT_ARCHIVE",
    parentPackageId: archive.packageId,
    localLifecycle: {
      ownerPackageId: archive.packageId
    },
    coverage: {
      mode: "DUPLICATE_CHILD_OBJECT",
      fileCount: 1,
      totalSizeBytes: 16
    },
    embeddedMember: {
      parentPackageId: archive.packageId,
      parentLocalPath: archive.localPath,
      parentExpectedSha256:
        archive.plannedObject.expectedSha256,
      archiveFormat: "ZIP",
      memberPath: "LICENSE"
    },
    plannedObjectExtras: {
      localFilePath:
        `${CACHE_RELATIVE_PATH}/migration-staging/embedded-licenses/license.txt`,
      extractionPlan: {
        parentPackageId: archive.packageId,
        parentLocalPath: archive.localPath,
        parentExpectedSha256:
          archive.plannedObject.expectedSha256,
        archiveFormat: "ZIP",
        memberPath: "LICENSE"
      }
    }
  });
  const fixture = packageRecord({
    packageId: "fixture:source-controlled",
    localPath: "fixtures/source-controlled.json",
    content: "fixture",
    localRetentionPolicy:
      "RETAIN_SOURCE_CONTROLLED_FIXTURE"
  });
  return {
    repository,
    repositoryLicense,
    archive,
    embedded,
    fixture,
    packages: [
      embedded,
      repositoryLicense,
      fixture,
      repository,
      archive
    ]
  };
}

function remoteHead(packageRecord) {
  return {
    ContentLength:
      packageRecord.plannedObject.expectedSizeBytes,
    ContentType:
      packageRecord.plannedObject.contentType,
    ChecksumSHA256:
      packageRecord.remote.s3.checksumSha256Base64,
    Metadata: {
      sha256:
        packageRecord.plannedObject.expectedSha256
    },
    VersionId: packageRecord.remote.s3.versionId,
    ETag: '"etag"',
    ServerSideEncryption: "AES256"
  };
}

function fakeContext() {
  return {
    identity: {
      accountId: "945129430686",
      arn:
        "arn:aws:sts::945129430686:assumed-role/RetroFiOperationalSavingsResearchRole/test",
      userId: "test"
    },
    bucketControls: {
      versioningStatus: "Enabled"
    }
  };
}

function fakeReadRemote(manifest, events = []) {
  return vi.fn(
    async (_destination, key, options) => {
      const packageRecord = manifest.packages.find(
        (candidate) =>
          candidate.plannedObject.key === key
      );
      events.push(`head:${packageRecord.packageId}`);
      expect(options.versionId).toBe(
        packageRecord.remote.s3.versionId
      );
      return remoteHead(packageRecord);
    }
  );
}

function fakeProof(packageRecord) {
  return {
    restoredVersionId:
      packageRecord.remote.s3.versionId,
    restoredSha256:
      packageRecord.plannedObject.expectedSha256,
    restoredSizeBytes:
      packageRecord.plannedObject.expectedSizeBytes,
    restoredAt: "2026-07-24T01:00:00.000Z"
  };
}

function cleanStartGitRunner() {
  return vi.fn(async (_repoRoot, args) => {
    if (args[0] === "rev-parse") {
      return {
        exitCode: 0,
        stdout: `${TEST_HEAD}\n`,
        stderr: ""
      };
    }
    return { exitCode: 0, stdout: "", stderr: "" };
  });
}

function resumeGitRunner(originalSource) {
  return vi.fn(async (_repoRoot, args) => {
    if (args[0] === "rev-parse") {
      return {
        exitCode: 0,
        stdout: `${TEST_HEAD}\n`,
        stderr: ""
      };
    }
    if (args[0] === "show") {
      return {
        exitCode: 0,
        stdout: originalSource,
        stderr: ""
      };
    }
    return { exitCode: 0, stdout: "", stderr: "" };
  });
}

async function withTemporaryRoot(callback) {
  const root = await mkdtemp(
    join(tmpdir(), "retrofi-restore-all-")
  );
  try {
    await mkdir(
      join(root, CACHE_RELATIVE_PATH),
      { recursive: true }
    );
    return await callback(root);
  } finally {
    await rm(root, { recursive: true, force: true });
  }
}

async function persistManifest(root, manifest) {
  const path = join(root, "manifest.json");
  const source = `${JSON.stringify(manifest, null, 2)}\n`;
  await writeFile(path, source, "utf8");
  return { path, source };
}

function sequencedNow() {
  let counter = 0;
  return () => {
    counter += 1;
    return new Date(
      Date.UTC(2026, 6, 24, 0, 0, counter)
    ).toISOString();
  };
}

test("restore-all requires exact committed remote records before planning", async () => {
  const { packages } = simplePackages();
  const manifest = testManifest(packages);
  manifest.packages[0].remote.s3.versionId = null;
  resealManifest(manifest);
  expect(() =>
    exactVerifiedRemoteRecords(manifest, destination)
  ).toThrow(/RESTORE_EXACT_VERIFIED_REMOTE_REQUIRED/);
});

test("dry-run plans parent packages before repository and embedded license children without AWS", async () => {
  await withTemporaryRoot(async (root) => {
    const records = simplePackages();
    const manifest = testManifest(records.packages);
    const verifyExistingPackage = vi.fn(
      async ({ packageRecord }) => ({
        kind: "TEST",
        packageId: packageRecord.packageId,
        sha256:
          packageRecord.plannedObject.expectedSha256,
        sizeBytes:
          packageRecord.plannedObject.expectedSizeBytes
      })
    );
    const plan = await planRestoreAllPackages({
      repoRoot: root,
      manifest,
      destination,
      verifyExistingPackage
    });
    expect(plan.wouldCallAws).toBe(true);
    expect(plan.wouldOverwrite).toBe(false);
    expect(plan.blockedCount).toBe(0);
    expect(
      plan.dependencyOrder.indexOf(
        records.repository.packageId
      )
    ).toBeLessThan(
      plan.dependencyOrder.indexOf(
        records.repositoryLicense.packageId
      )
    );
    expect(
      plan.dependencyOrder.indexOf(
        records.archive.packageId
      )
    ).toBeLessThan(
      plan.dependencyOrder.indexOf(
        records.embedded.packageId
      )
    );
    expect(
      plan.steps.find(
        (step) =>
          step.packageId === records.fixture.packageId
      ).disposition
    ).toBe(
      "VERIFY_SOURCE_CONTROLLED_FIXTURE_AND_EXACT_S3_VERSION"
    );
    expect(verifyExistingPackage).toHaveBeenCalledTimes(
      1
    );
  });
});

test("restore-all rejects an uncheckpointed existing cache target without overwrite", async () => {
  await withTemporaryRoot(async (root) => {
    const record = packageRecord({
      packageId: "cache:existing",
      localPath: `${CACHE_RELATIVE_PATH}/existing.bin`,
      content: "existing"
    });
    const path = join(root, record.localPath);
    await mkdir(dirname(path), { recursive: true });
    await writeFile(path, "existing", "utf8");
    const plan = await planRestoreAllPackages({
      repoRoot: root,
      manifest: testManifest([record]),
      destination
    });
    expect(plan.blockedPackageIds).toEqual([
      record.packageId
    ]);
    expect(plan.steps[0].disposition).toBe(
      "BLOCKED_EXISTING_TARGET"
    );
  });
});

test("restore-all adopts an exact retained package only after a completed cleanup journal and exact remote proof", async () => {
  await withTemporaryRoot(async (root) => {
    const record = packageRecord({
      packageId: "cache:retained-after-partial-cleanup",
      localPath:
        `${CACHE_RELATIVE_PATH}/retained.bin`,
      content: "retained"
    });
    record.remote.s3.deletionStatus =
      "LOCAL_RETAINED";
    const manifest = testManifest([record]);
    manifest.execution.localCleanupJournal = {
      status: "COMPLETE",
      pendingAction: null
    };
    resealManifest(manifest);
    const target = join(root, record.localPath);
    await mkdir(dirname(target), {
      recursive: true
    });
    await writeFile(target, record.testContent, "utf8");

    const plan = await planRestoreAllPackages({
      repoRoot: root,
      manifest,
      destination
    });
    expect(plan.blockedCount).toBe(0);
    expect(plan.steps[0]).toMatchObject({
      packageId: record.packageId,
      disposition:
        "VERIFY_RETAINED_PACKAGE_AND_EXACT_S3_VERSION",
      blocker: null
    });

    const { path, source } = await persistManifest(
      root,
      manifest
    );
    const hydrateOnePackage = vi.fn();
    const proveRemoteVersion = vi.fn(
      async ({ packageRecord }) =>
        fakeProof(packageRecord)
    );
    const result =
      await restoreAllPackagesCheckpointed({
        repoRoot: root,
        manifestPath: path,
        manifest,
        expectedManifestSourceSha256:
          manifestSourceSha256(source),
        destination,
        assertCleanManifest: vi.fn(),
        gitRunner: cleanStartGitRunner(),
        verifyExecutionContext: vi.fn(
          async () => fakeContext()
        ),
        readRemote: fakeReadRemote(manifest),
        hydrateOnePackage,
        proveRemoteVersion,
        now: sequencedNow()
      });
    expect(hydrateOnePackage).not.toHaveBeenCalled();
    expect(proveRemoteVersion).toHaveBeenCalledTimes(1);
    expect(
      manifest.execution.restoreAllJournal
        .completedPackages.find(
        (entry) =>
          entry.packageId === record.packageId
        ).disposition
    ).toBe(
      "RETAINED_PACKAGE_AND_REMOTE_BYTES_VERIFIED"
    );
    expect(record.hydration).toMatchObject({
      status: "HYDRATED_FROM_VERIFIED_S3_VERSION",
      hydrationMode:
        "VERIFIED_EXISTING_RETAINED_PACKAGE"
    });
    expect(await readFile(target, "utf8")).toBe(
      record.testContent
    );
  });
});

test("restore-all checks a clean committed manifest before any AWS preflight", async () => {
  await withTemporaryRoot(async (root) => {
    const manifest = testManifest([
      packageRecord({
        packageId: "cache:one",
        localPath: `${CACHE_RELATIVE_PATH}/one.bin`,
        content: "one"
      })
    ]);
    const { path, source } = await persistManifest(
      root,
      manifest
    );
    const assertCleanManifest = vi.fn(async () => {
      throw new Error("MANIFEST_NOT_CLEAN_COMMITTED");
    });
    const verifyExecutionContext = vi.fn();
    await expect(
      restoreAllPackagesCheckpointed({
        repoRoot: root,
        manifestPath: path,
        manifest,
        expectedManifestSourceSha256:
          manifestSourceSha256(source),
        destination,
        assertCleanManifest,
        gitRunner: cleanStartGitRunner(),
        verifyExecutionContext
      })
    ).rejects.toThrow(/MANIFEST_NOT_CLEAN_COMMITTED/);
    expect(verifyExecutionContext).not.toHaveBeenCalled();
  });
});

test("restore-all heads every exact version before hydrating any package", async () => {
  await withTemporaryRoot(async (root) => {
    const first = packageRecord({
      packageId: "cache:first",
      localPath: `${CACHE_RELATIVE_PATH}/first.bin`,
      content: "first"
    });
    const second = packageRecord({
      packageId: "cache:second",
      localPath: `${CACHE_RELATIVE_PATH}/second.bin`,
      content: "second"
    });
    const manifest = testManifest([first, second]);
    const { path, source } = await persistManifest(
      root,
      manifest
    );
    const readRemote = vi.fn(
      async (_destination, key) => {
        if (key === second.plannedObject.key) {
          throw new Error("REMOTE_OBJECT_MISSING");
        }
        return remoteHead(first);
      }
    );
    const hydrateOnePackage = vi.fn();
    await expect(
      restoreAllPackagesCheckpointed({
        repoRoot: root,
        manifestPath: path,
        manifest,
        expectedManifestSourceSha256:
          manifestSourceSha256(source),
        destination,
        assertCleanManifest: vi.fn(),
        gitRunner: cleanStartGitRunner(),
        verifyExecutionContext: vi.fn(
          async () => fakeContext()
        ),
        readRemote,
        hydrateOnePackage
      })
    ).rejects.toThrow(/REMOTE_OBJECT_MISSING/);
    expect(readRemote).toHaveBeenCalledTimes(2);
    expect(hydrateOnePackage).not.toHaveBeenCalled();
    expect(await readFile(path, "utf8")).toBe(source);
  });
});

test("restore-all checkpoints dependency-ordered hydration and returns the exact offline next command", async () => {
  await withTemporaryRoot(async (root) => {
    const records = simplePackages();
    const manifest = testManifest(records.packages);
    manifest.execution.finalCleanupValidation = {
      status: "PASSED"
    };
    manifest.execution.lastEcrRestoreReplay = {
      status: "PASS"
    };
    resealManifest(manifest);
    const { path, source } = await persistManifest(
      root,
      manifest
    );
    const events = [];
    const verifyExistingPackage = vi.fn(
      async ({ packageRecord }) => ({
        kind: "TEST",
        packageId: packageRecord.packageId,
        sha256:
          packageRecord.plannedObject.expectedSha256,
        sizeBytes:
          packageRecord.plannedObject.expectedSizeBytes
      })
    );
    const hydrateOnePackage = vi.fn(
      async ({ manifest: activeManifest, packageId }) => {
        expect(
          events.filter((event) =>
            event.startsWith("head:")
          )
        ).toHaveLength(manifest.packages.length);
        const packageRecord =
          activeManifest.packages.find(
            (candidate) =>
              candidate.packageId === packageId
          );
        events.push(`hydrate:${packageId}`);
        return {
          disposition:
            "PACKAGE_HYDRATED_WITHOUT_OVERWRITE",
          packageId,
          ...fakeProof(packageRecord)
        };
      }
    );
    const result =
      await restoreAllPackagesCheckpointed({
        repoRoot: root,
        manifestPath: path,
        manifest,
        expectedManifestSourceSha256:
          manifestSourceSha256(source),
        destination,
        assertCleanManifest: vi.fn(),
        gitRunner: cleanStartGitRunner(),
        verifyExecutionContext: vi.fn(
          async () => fakeContext()
        ),
        readRemote: fakeReadRemote(
          manifest,
          events
        ),
        hydrateOnePackage,
        proveRemoteVersion: vi.fn(
          async ({ packageRecord }) =>
            fakeProof(packageRecord)
        ),
        verifyExistingPackage,
        now: sequencedNow()
      });
    expect(result.nextCommand).toBe(
      RESTORE_ALL_OFFLINE_VALIDATION_COMMAND
    );
    expect(result.validation.status).toBe(
      "NOT_REQUESTED"
    );
    expect(
      manifest.execution.restoreAllJournal.status
    ).toBe("COMPLETE");
    expect(
      manifest.execution.finalCleanupValidation.status
    ).toBe("INVALIDATED_BY_HYDRATION");
    expect(
      manifest.execution.lastEcrRestoreReplay.status
    ).toBe("INVALIDATED_BY_HYDRATION");
    expect(
      manifest.execution.restoreAllJournal.completedPackages.map(
        (entry) => entry.packageId
      )
    ).toEqual(result.order);
    const hydrationEvents = events
      .filter((event) => event.startsWith("hydrate:"))
      .map((event) => event.slice("hydrate:".length));
    expect(
      hydrationEvents.indexOf(
        records.repository.packageId
      )
    ).toBeLessThan(
      hydrationEvents.indexOf(
        records.repositoryLicense.packageId
      )
    );
    expect(
      hydrationEvents.indexOf(
        records.archive.packageId
      )
    ).toBeLessThan(
      hydrationEvents.indexOf(
        records.embedded.packageId
      )
    );
    expect(hydrationEvents).not.toContain(
      records.fixture.packageId
    );
    const persisted = JSON.parse(
      await readFile(path, "utf8")
    );
    expect(
      persisted.execution.restoreAllJournal.status
    ).toBe("COMPLETE");
  });
}, 30_000);

test("restore-all starts a new archived generation after a completed restore is cleaned", async () => {
  await withTemporaryRoot(async (root) => {
    const record = packageRecord({
      packageId: "cache:repeatable-restore",
      localPath:
        `${CACHE_RELATIVE_PATH}/repeatable.bin`,
      content: "repeatable"
    });
    const manifest = testManifest([record]);
    const firstPersisted = await persistManifest(
      root,
      manifest
    );
    const hydrateOnePackage = vi.fn(
      async ({ packageId, manifest: active }) => {
        const packageRecord = active.packages.find(
          (candidate) =>
            candidate.packageId === packageId
        );
        return {
          disposition:
            "PACKAGE_HYDRATED_WITHOUT_OVERWRITE",
          packageId,
          ...fakeProof(packageRecord)
        };
      }
    );
    const verifyExistingPackage = vi.fn(
      async ({ packageRecord }) => ({
        kind: "TEST",
        packageId: packageRecord.packageId,
        sha256:
          packageRecord.plannedObject.expectedSha256,
        sizeBytes:
          packageRecord.plannedObject.expectedSizeBytes
      })
    );
    const sharedOptions = {
      repoRoot: root,
      manifestPath: firstPersisted.path,
      manifest,
      destination,
      assertCleanManifest: vi.fn(),
      gitRunner: cleanStartGitRunner(),
      verifyExecutionContext: vi.fn(
        async () => fakeContext()
      ),
      readRemote: fakeReadRemote(manifest),
      hydrateOnePackage,
      verifyExistingPackage
    };
    const first =
      await restoreAllPackagesCheckpointed({
        ...sharedOptions,
        expectedManifestSourceSha256:
          manifestSourceSha256(
            firstPersisted.source
          ),
        now: sequencedNow()
      });
    expect(first.restartMode).toBe("NEW");
    const previousJournal = structuredClone(
      manifest.execution.restoreAllJournal
    );
    expect(previousJournal.status).toBe("COMPLETE");

    record.remote.s3.deletionStatus =
      "LOCAL_DELETED_AFTER_REMOTE_VERIFICATION";
    record.remote.s3.localDeletedAt =
      "2026-07-24T02:00:00.000Z";
    manifest.execution.localFilesDeleted = true;
    manifest.execution.localCleanupJournal = {
      status: "COMPLETE",
      pendingAction: null,
      completedActions: []
    };
    resealManifest(manifest);
    const cleanedPersisted = await persistManifest(
      root,
      manifest
    );

    const second =
      await restoreAllPackagesCheckpointed({
        ...sharedOptions,
        expectedManifestSourceSha256:
          manifestSourceSha256(
            cleanedPersisted.source
          ),
        now: sequencedNow()
      });
    expect(second.restartMode).toBe("NEW");
    expect(hydrateOnePackage).toHaveBeenCalledTimes(2);
    expect(
      manifest.execution.restoreAllJournal.attemptId
    ).not.toBe(previousJournal.attemptId);
    expect(
      manifest.execution.restoreAllJournal
        .previousCompletedAttempt
    ).toEqual(
      expect.objectContaining({
        schemaVersion:
          "operational-savings/s3-restore-all-history-entry-v1",
        attemptId: previousJournal.attemptId,
        status: "COMPLETE",
        packageCount: 1,
        journalContentSha256:
          sha256CanonicalJson(previousJournal)
      })
    );
    const tampered = structuredClone(manifest);
    tampered.execution.restoreAllJournal
      .previousCompletedAttempt
      .packageCount = 2;
    resealManifest(tampered);
    await expect(
      planRestoreAllPackages({
        repoRoot: root,
        manifest: tampered,
        destination,
        verifyExistingPackage
      })
    ).rejects.toThrow(/RESTORE_ALL_JOURNAL_INVALID/);
  });
}, 30_000);

test("restore-all resumes a pending package created before its completion checkpoint", async () => {
  await withTemporaryRoot(async (root) => {
    const first = packageRecord({
      packageId: "cache:first",
      localPath: `${CACHE_RELATIVE_PATH}/first.bin`,
      content: "first"
    });
    const second = packageRecord({
      packageId: "cache:second",
      localPath: `${CACHE_RELATIVE_PATH}/second.bin`,
      content: "second"
    });
    const originalManifest = testManifest([
      first,
      second
    ]);
    const { path, source } = await persistManifest(
      root,
      originalManifest
    );
    let failCompletionCheckpoint = true;
    const checkpointManifest = async (input) => {
      const journal =
        input.manifest.execution.restoreAllJournal;
      if (
        failCompletionCheckpoint &&
        journal.completedPackages.length === 1
      ) {
        failCompletionCheckpoint = false;
        throw new Error("SIMULATED_CHECKPOINT_FAILURE");
      }
      return writeManifestAtomically(input);
    };
    const hydrateOnePackage = vi.fn(
      async ({ manifest, packageId }) => {
        const record = manifest.packages.find(
          (candidate) =>
            candidate.packageId === packageId
        );
        const target = join(root, record.localPath);
        await mkdir(dirname(target), {
          recursive: true
        });
        await writeFile(
          target,
          record.testContent,
          "utf8"
        );
        expect(await sha256Path(target)).toBe(
          record.plannedObject.expectedSha256
        );
        return {
          disposition:
            "PACKAGE_HYDRATED_WITHOUT_OVERWRITE",
          packageId,
          ...fakeProof(record)
        };
      }
    );
    await expect(
      restoreAllPackagesCheckpointed({
        repoRoot: root,
        manifestPath: path,
        manifest: originalManifest,
        expectedManifestSourceSha256:
          manifestSourceSha256(source),
        destination,
        assertCleanManifest: vi.fn(),
        gitRunner: cleanStartGitRunner(),
        verifyExecutionContext: vi.fn(
          async () => fakeContext()
        ),
        readRemote: fakeReadRemote(
          originalManifest
        ),
        hydrateOnePackage,
        checkpointManifest,
        now: sequencedNow()
      })
    ).rejects.toThrow(/SIMULATED_CHECKPOINT_FAILURE/);

    const resumedSource = await readFile(path, "utf8");
    const resumedManifest = JSON.parse(resumedSource);
    expect(
      resumedManifest.execution.restoreAllJournal
        .pendingPackageId
    ).toBe(first.packageId);
    expect(
      resumedManifest.execution.restoreAllJournal
        .completedPackages
    ).toEqual([]);
    await expect(
      assertRestoreAllManifestMayProceed({
        repoRoot: root,
        manifestPath: path,
        manifest: resumedManifest,
        destination,
        gitRunner: vi.fn(
          async (_repoRoot, args) => {
            if (args[0] === "rev-parse") {
              return {
                exitCode: 0,
                stdout:
                  "fedcba9876543210fedcba9876543210fedcba98\n",
                stderr: ""
              };
            }
            return {
              exitCode: 0,
              stdout: "",
              stderr: ""
            };
          }
        )
      })
    ).rejects.toThrow(
      /RESTORE_ALL_RESUME_COMMIT_CHANGED/
    );

    const resumedHydrate = vi.fn(
      async ({ manifest, packageId }) => {
        const record = manifest.packages.find(
          (candidate) =>
            candidate.packageId === packageId
        );
        const target = join(root, record.localPath);
        await mkdir(dirname(target), {
          recursive: true
        });
        await writeFile(
          target,
          record.testContent,
          "utf8"
        );
        return {
          disposition:
            "PACKAGE_HYDRATED_WITHOUT_OVERWRITE",
          packageId,
          ...fakeProof(record)
        };
      }
    );
    const result =
      await restoreAllPackagesCheckpointed({
        repoRoot: root,
        manifestPath: path,
        manifest: resumedManifest,
        expectedManifestSourceSha256:
          manifestSourceSha256(resumedSource),
        destination,
        gitRunner: resumeGitRunner(source),
        verifyExecutionContext: vi.fn(
          async () => fakeContext()
        ),
        readRemote: fakeReadRemote(
          resumedManifest
        ),
        hydrateOnePackage: resumedHydrate,
        proveRemoteVersion: vi.fn(
          async ({ packageRecord }) =>
            fakeProof(packageRecord)
        ),
        now: sequencedNow()
      });
    expect(result.restartMode).toBe("RESUME");
    expect(resumedHydrate).toHaveBeenCalledTimes(1);
    expect(
      resumedHydrate.mock.calls[0][0].packageId
    ).toBe(second.packageId);
    expect(
      resumedManifest.execution.restoreAllJournal
        .completedPackages.map(
          (entry) => entry.packageId
        )
    ).toEqual(result.order);
  });
});

test("restore-all resumes after hydration invalidates a pre-existing ECR replay receipt", async () => {
  await withTemporaryRoot(async (root) => {
    const first = packageRecord({
      packageId: "cache:first",
      localPath: `${CACHE_RELATIVE_PATH}/first.bin`,
      content: "first"
    });
    const second = packageRecord({
      packageId: "cache:second",
      localPath: `${CACHE_RELATIVE_PATH}/second.bin`,
      content: "second"
    });
    const originalManifest = testManifest([
      first,
      second
    ]);
    originalManifest.execution.lastEcrRestoreReplay = {
      status: "PASS",
      completedAt: "2026-07-23T23:00:00.000Z",
      exactDigestPullsVerified: true
    };
    resealManifest(originalManifest);
    const { path, source } = await persistManifest(
      root,
      originalManifest
    );
    let simulateCrash = true;
    const checkpointManifest = async (input) => {
      const journal =
        input.manifest.execution.restoreAllJournal;
      if (
        simulateCrash &&
        journal.completedPackages.length === 1 &&
        journal.pendingPackageId === second.packageId
      ) {
        simulateCrash = false;
        throw new Error("SIMULATED_PROCESS_CRASH");
      }
      return writeManifestAtomically(input);
    };
    const hydrateOnePackage = vi.fn(
      async ({
        repoRoot,
        manifest,
        packageId
      }) => {
        const record = manifest.packages.find(
          (candidate) =>
            candidate.packageId === packageId
        );
        const target = join(
          repoRoot,
          record.localPath
        );
        await mkdir(dirname(target), {
          recursive: true
        });
        await writeFile(
          target,
          record.testContent,
          "utf8"
        );
        const proof = fakeProof(record);
        invalidateExecutionReceiptsAfterHydration({
          manifest,
          packageId,
          hydratedAt: proof.restoredAt
        });
        return {
          disposition:
            "PACKAGE_HYDRATED_WITHOUT_OVERWRITE",
          packageId,
          ...proof
        };
      }
    );
    await expect(
      restoreAllPackagesCheckpointed({
        repoRoot: root,
        manifestPath: path,
        manifest: originalManifest,
        expectedManifestSourceSha256:
          manifestSourceSha256(source),
        destination,
        assertCleanManifest: vi.fn(),
        gitRunner: cleanStartGitRunner(),
        verifyExecutionContext: vi.fn(
          async () => fakeContext()
        ),
        readRemote: fakeReadRemote(
          originalManifest
        ),
        hydrateOnePackage,
        checkpointManifest,
        now: sequencedNow()
      })
    ).rejects.toThrow(/SIMULATED_PROCESS_CRASH/);

    const resumedSource = await readFile(path, "utf8");
    const resumedManifest = JSON.parse(resumedSource);
    expect(
      resumedManifest.execution.restoreAllJournal
        .completedPackages.map(
          (entry) => entry.packageId
        )
    ).toEqual([first.packageId]);
    expect(
      resumedManifest.execution.lastEcrRestoreReplay
        .status
    ).toBe("INVALIDATED_BY_HYDRATION");

    const unrelatedMutation =
      structuredClone(resumedManifest);
    unrelatedMutation.execution.lastEcrRestoreReplay.completedAt =
      "2026-07-24T09:00:00.000Z";
    resealManifest(unrelatedMutation);
    await expect(
      assertRestoreAllManifestMayProceed({
        repoRoot: root,
        manifestPath: path,
        manifest: unrelatedMutation,
        destination,
        gitRunner: resumeGitRunner(source)
      })
    ).rejects.toThrow(
      /RESTORE_ALL_JOURNAL_INVARIANT_CHANGED/
    );

    const result =
      await restoreAllPackagesCheckpointed({
        repoRoot: root,
        manifestPath: path,
        manifest: resumedManifest,
        expectedManifestSourceSha256:
          manifestSourceSha256(resumedSource),
        destination,
        gitRunner: resumeGitRunner(source),
        verifyExecutionContext: vi.fn(
          async () => fakeContext()
        ),
        readRemote: fakeReadRemote(
          resumedManifest
        ),
        hydrateOnePackage,
        proveRemoteVersion: vi.fn(
          async ({ packageRecord }) =>
            fakeProof(packageRecord)
        ),
        now: sequencedNow()
      });
    expect(result.restartMode).toBe("RESUME");
    expect(hydrateOnePackage).toHaveBeenCalledTimes(2);
    expect(
      resumedManifest.execution.restoreAllJournal
        .completedPackages.map(
          (entry) => entry.packageId
        )
    ).toEqual(result.order);
  });
});

test("restore-all safely retries a pending package when hydration had not created its target", async () => {
  await withTemporaryRoot(async (root) => {
    const record = packageRecord({
      packageId: "cache:pending-absent",
      localPath:
        `${CACHE_RELATIVE_PATH}/pending-absent.bin`,
      content: "pending-absent"
    });
    const manifest = testManifest([record]);
    const { path, source } = await persistManifest(
      root,
      manifest
    );
    await expect(
      restoreAllPackagesCheckpointed({
        repoRoot: root,
        manifestPath: path,
        manifest,
        expectedManifestSourceSha256:
          manifestSourceSha256(source),
        destination,
        assertCleanManifest: vi.fn(),
        gitRunner: cleanStartGitRunner(),
        verifyExecutionContext: vi.fn(
          async () => fakeContext()
        ),
        readRemote: fakeReadRemote(manifest),
        hydrateOnePackage: vi.fn(async () => {
          throw new Error(
            "SIMULATED_FAILURE_BEFORE_TARGET_CREATION"
          );
        }),
        now: sequencedNow()
      })
    ).rejects.toThrow(
      /SIMULATED_FAILURE_BEFORE_TARGET_CREATION/
    );
    const resumedSource = await readFile(path, "utf8");
    const resumedManifest = JSON.parse(resumedSource);
    expect(
      resumedManifest.execution.restoreAllJournal
        .pendingPackageId
    ).toBe(record.packageId);
    const resumedHydrate = vi.fn(
      async ({ packageId, manifest: activeManifest }) => {
        const activeRecord =
          activeManifest.packages.find(
            (candidate) =>
              candidate.packageId === packageId
          );
        const target = join(
          root,
          activeRecord.localPath
        );
        await mkdir(dirname(target), {
          recursive: true
        });
        await writeFile(
          target,
          activeRecord.testContent,
          "utf8"
        );
        return {
          disposition:
            "PACKAGE_HYDRATED_WITHOUT_OVERWRITE",
          packageId,
          ...fakeProof(activeRecord)
        };
      }
    );
    const result =
      await restoreAllPackagesCheckpointed({
        repoRoot: root,
        manifestPath: path,
        manifest: resumedManifest,
        expectedManifestSourceSha256:
          manifestSourceSha256(resumedSource),
        destination,
        gitRunner: resumeGitRunner(source),
        verifyExecutionContext: vi.fn(
          async () => fakeContext()
        ),
        readRemote: fakeReadRemote(
          resumedManifest
        ),
        hydrateOnePackage: resumedHydrate,
        now: sequencedNow()
      });
    expect(result.restartMode).toBe("RESUME");
    expect(resumedHydrate).toHaveBeenCalledTimes(1);
    expect(
      resumedManifest.execution.restoreAllJournal.status
    ).toBe("COMPLETE");
  });
});

test("source-controlled fixtures must match local identity and exact restored remote bytes before checkpoints", async () => {
  await withTemporaryRoot(async (root) => {
    const fixture = packageRecord({
      packageId: "fixture:one",
      localPath: "fixtures/one.bin",
      content: "fixture",
      localRetentionPolicy:
        "RETAIN_SOURCE_CONTROLLED_FIXTURE"
    });
    const manifest = testManifest([fixture]);
    const { path, source } = await persistManifest(
      root,
      manifest
    );
    await expect(
      restoreAllPackagesCheckpointed({
        repoRoot: root,
        manifestPath: path,
        manifest,
        expectedManifestSourceSha256:
          manifestSourceSha256(source),
        destination,
        assertCleanManifest: vi.fn(),
        gitRunner: cleanStartGitRunner(),
        verifyExecutionContext: vi.fn(
          async () => fakeContext()
        ),
        readRemote: fakeReadRemote(manifest),
        verifyExistingPackage: vi.fn(
          async () => ({
            kind: "EXACT_FILE",
            sha256:
              fixture.plannedObject.expectedSha256,
            sizeBytes:
              fixture.plannedObject.expectedSizeBytes
          })
        ),
        proveRemoteVersion: vi.fn(
          async () => ({
            ...fakeProof(fixture),
            restoredSha256: "0".repeat(64)
          })
        )
      })
    ).rejects.toThrow(
      /RESTORE_SOURCE_FIXTURE_REMOTE_BYTES_MISMATCH/
    );
    expect(await readFile(path, "utf8")).toBe(source);
  });
});

test("restore-all runs only the fixed offline validation sequence when requested", async () => {
  await withTemporaryRoot(async (root) => {
    const fixture = packageRecord({
      packageId: "fixture:validated",
      localPath: "fixtures/validated.bin",
      content: "fixture",
      localRetentionPolicy:
        "RETAIN_SOURCE_CONTROLLED_FIXTURE"
    });
    const manifest = testManifest([fixture]);
    const { path, source } = await persistManifest(
      root,
      manifest
    );
    const validationRunner = vi.fn(
      async () => ({
        exitCode: 0,
        stdout: "passed",
        stderr: ""
      })
    );
    const result =
      await restoreAllPackagesCheckpointed({
        repoRoot: root,
        manifestPath: path,
        manifest,
        expectedManifestSourceSha256:
          manifestSourceSha256(source),
        destination,
        runOfflineValidation: true,
        assertCleanManifest: vi.fn(),
        gitRunner: cleanStartGitRunner(),
        verifyExecutionContext: vi.fn(
          async () => fakeContext()
        ),
        readRemote: fakeReadRemote(manifest),
        verifyExistingPackage: vi.fn(
          async () => ({
            kind: "EXACT_FILE",
            sha256:
              fixture.plannedObject.expectedSha256,
            sizeBytes:
              fixture.plannedObject.expectedSizeBytes
          })
        ),
        proveRemoteVersion: vi.fn(
          async () => fakeProof(fixture)
        ),
        validationRunner,
        now: sequencedNow()
      });
    expect(validationRunner).toHaveBeenCalledWith(
      root,
      RESTORE_ALL_OFFLINE_VALIDATION_COMMAND
    );
    expect(result.validation.status).toBe("PASSED");
    expect(result.nextCommand).toBeNull();
  });
});
