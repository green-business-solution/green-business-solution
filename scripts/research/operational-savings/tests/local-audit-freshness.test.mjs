import { createHash } from "node:crypto";
import { execFile } from "node:child_process";
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { promisify } from "node:util";
import { afterEach, expect, test } from "vitest";

import {
  assertLocalArtifactAuditFresh,
  assertLocalArtifactAuditInventoryWorktree,
  assertLocalArtifactAuditWorktree,
  auditedDirectoryTreeIdentity
} from "../storage/local-audit-freshness.mjs";

const temporaryRoots = [];
const execFileAsync = promisify(execFile);

afterEach(async () => {
  await Promise.all(
    temporaryRoots.splice(0).map((path) =>
      rm(path, { recursive: true, force: true })
    )
  );
});

async function fixture() {
  const root = await mkdtemp(
    join(tmpdir(), "audit-freshness-fixture-")
  );
  temporaryRoots.push(root);
  const exactPath = join(root, "proof-ledger-known.json");
  const aggregatePath = join(root, "retrofi-storage-known");
  await writeFile(exactPath, "{}\n", "utf8");
  await mkdir(aggregatePath);
  await writeFile(
    join(aggregatePath, "known.txt"),
    "known\n",
    "utf8"
  );
  const aggregateIdentity =
    await auditedDirectoryTreeIdentity(aggregatePath);
  const audit = {
    artifactGroups: [
      {
        childFiles: [
          {
            originalPath: exactPath,
            byteSize: 3,
            sha256: createHash("sha256")
              .update("{}\n")
              .digest("hex")
          }
        ],
        directoryEntries: [
          {
            originalPath: aggregatePath,
            fileCount: 1,
            symlinkCount: 0,
            logicalBytes: 6,
            treeDigestSchemaVersion:
              aggregateIdentity.treeDigestSchemaVersion,
            fullTreeSha256:
              aggregateIdentity.fullTreeSha256
          }
        ]
      }
    ]
  };
  return {
    root,
    aggregatePath,
    audit
  };
}

test("accepts the exact monitored audit snapshot", async () => {
  const context = await fixture();
  await expect(
    assertLocalArtifactAuditFresh({
      audit: context.audit,
      roots: [context.root],
      prefixes: ["proof-ledger-", "retrofi-storage-"]
    })
  ).resolves.toMatchObject({
    status: "CURRENT",
    roots: [
      {
        root: context.root,
        status: "CURRENT",
        monitoredEntryCount: 2
      }
    ]
  });
});

test("rejects a later matching top-level artifact", async () => {
  const context = await fixture();
  const laterPath = join(
    context.root,
    "proof-ledger-later.json"
  );
  await writeFile(laterPath, "{}\n", "utf8");
  await expect(
    assertLocalArtifactAuditFresh({
      audit: context.audit,
      roots: [context.root],
      prefixes: ["proof-ledger-", "retrofi-storage-"]
    })
  ).rejects.toThrow(
    /UNRECORDED_MONITORED_TOP_LEVEL_PATH.*proof-ledger-later/
  );
});

test("rejects an exact audited file whose bytes changed", async () => {
  const context = await fixture();
  await writeFile(
    join(context.root, "proof-ledger-known.json"),
    '{"changed":true}\n',
    "utf8"
  );
  await expect(
    assertLocalArtifactAuditFresh({
      audit: context.audit,
      roots: [context.root],
      prefixes: ["proof-ledger-", "retrofi-storage-"]
    })
  ).rejects.toThrow(/AUDITED_EXACT_FILE_CONTENT_CHANGED/);
});

test("rejects a later file inside an audited directory", async () => {
  const context = await fixture();
  await writeFile(
    join(context.aggregatePath, "later.txt"),
    "later\n",
    "utf8"
  );
  await expect(
    assertLocalArtifactAuditFresh({
      audit: context.audit,
      roots: [context.root],
      prefixes: ["proof-ledger-", "retrofi-storage-"]
    })
  ).rejects.toThrow(/AUDITED_DIRECTORY_CONTENT_CHANGED/);
});

test("rejects same-size byte changes inside an audited directory", async () => {
  const context = await fixture();
  await writeFile(
    join(context.aggregatePath, "known.txt"),
    "forged\n",
    "utf8"
  );
  await expect(
    assertLocalArtifactAuditFresh({
      audit: context.audit,
      roots: [context.root],
      prefixes: ["proof-ledger-", "retrofi-storage-"]
    })
  ).rejects.toThrow(/AUDITED_DIRECTORY_CONTENT_CHANGED/);
});

test("binds an audit to the exact worktree", async () => {
  const context = await fixture();
  context.audit.scope = {
    worktree: context.root
  };
  expect(
    assertLocalArtifactAuditWorktree({
      audit: context.audit,
      repoRoot: context.root
    })
  ).toBe(context.root);
  expect(() =>
    assertLocalArtifactAuditWorktree({
      audit: context.audit,
      repoRoot: join(context.root, "other")
    })
  ).toThrow(/AUDIT_WORKTREE_MISMATCH/);
});

test("allows read-only inventory from a verified linked Git worktree only", async () => {
  const repository = await mkdtemp(
    join(tmpdir(), "audit-worktree-repository-")
  );
  const linkedWorktree = await mkdtemp(
    join(tmpdir(), "audit-worktree-linked-")
  );
  await rm(linkedWorktree, {
    recursive: true,
    force: true
  });
  temporaryRoots.push(repository, linkedWorktree);
  await execFileAsync("/usr/bin/git", ["init"], {
    cwd: repository
  });
  await execFileAsync(
    "/usr/bin/git",
    ["config", "user.email", "audit@example.invalid"],
    { cwd: repository }
  );
  await execFileAsync(
    "/usr/bin/git",
    ["config", "user.name", "Audit Test"],
    { cwd: repository }
  );
  await writeFile(
    join(repository, "tracked.txt"),
    "tracked\n"
  );
  await execFileAsync(
    "/usr/bin/git",
    ["add", "tracked.txt"],
    { cwd: repository }
  );
  await execFileAsync(
    "/usr/bin/git",
    ["commit", "-m", "audit fixture"],
    { cwd: repository }
  );
  await execFileAsync(
    "/usr/bin/git",
    [
      "worktree",
      "add",
      "--detach",
      linkedWorktree,
      "HEAD"
    ],
    { cwd: repository }
  );
  const audit = {
    scope: {
      worktree: repository
    }
  };

  expect(
    assertLocalArtifactAuditInventoryWorktree({
      audit,
      repoRoot: linkedWorktree
    })
  ).toBe(repository);
  expect(() =>
    assertLocalArtifactAuditWorktree({
      audit,
      repoRoot: linkedWorktree
    })
  ).toThrow(/AUDIT_WORKTREE_MISMATCH/);
  expect(() =>
    assertLocalArtifactAuditInventoryWorktree({
      audit,
      repoRoot: join(repository, "unrelated")
    })
  ).toThrow(/AUDIT_WORKTREE_MISMATCH/);
});

test("ignores an unrelated unmonitored temporary file", async () => {
  const context = await fixture();
  await writeFile(
    join(context.root, "contractor-enrichment-active.json"),
    "{}\n",
    "utf8"
  );
  await expect(
    assertLocalArtifactAuditFresh({
      audit: context.audit,
      roots: [context.root],
      prefixes: ["proof-ledger-", "retrofi-storage-"]
    })
  ).resolves.toMatchObject({
    status: "CURRENT"
  });
});

test("excludes active web-enrichment temporary trees from the operational-savings audit", async () => {
  const context = await fixture();
  await mkdir(
    join(context.root, "retrofi-web-enrichment-active")
  );
  await writeFile(
    join(
      context.root,
      "retrofi-web-enrichment-active",
      "active.json"
    ),
    "{}\n",
    "utf8"
  );
  await expect(
    assertLocalArtifactAuditFresh({
      audit: context.audit,
      roots: [context.root],
      prefixes: ["proof-ledger-", "retrofi-"]
    })
  ).resolves.toMatchObject({
    status: "CURRENT"
  });
});
