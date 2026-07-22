import { execFileSync } from "node:child_process";
import { cp, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { afterEach, describe, expect, it } from "vitest";

const SOURCE_ROOT = fileURLToPath(new URL("..", import.meta.url));
const fixtureRoots = [];

afterEach(async () => {
  await Promise.all(
    fixtureRoots.splice(0).map((fixtureRoot) =>
      rm(fixtureRoot, { recursive: true, force: true })
    )
  );
});

describe("validate-operational-savings-information-trees", () => {
  it("accepts the canonical taxonomy, trees, registry, and audit", async () => {
    const fixtureRoot = await createFixture();

    expect(runValidator(fixtureRoot)).toContain(
      "Operational-savings information-tree validation passed."
    );
  });

  it("rejects stale category-index metadata", async () => {
    const fixtureRoot = await createFixture();
    const treePath = join(fixtureRoot, "docs/operational-savings-information-trees.md");
    const tree = await readFile(treePath, "utf8");
    await writeFile(
      treePath,
      tree.replace(
        "| `ITC-54` | Backup-power routine resource use | BLOCKED | 1 |",
        "| `ITC-54` | Backup-power routine resource use | DRAFT | 1 |"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /ITC-54 Category Index metadata does not match/
    );
  });

  it("rejects an information-tree terminal without a canonical source label", async () => {
    const fixtureRoot = await createFixture();
    const treePath = join(fixtureRoot, "docs/operational-savings-information-trees.md");
    const tree = await readFile(treePath, "utf8");
    await writeFile(
      treePath,
      tree.replace(
        "Count of identical units in project scope (User)",
        "Count of identical units in project scope (Unknown)"
      )
    );

    expect(() => runValidator(fixtureRoot)).toThrow(
      /BR-SCOPE-QUANTITY terminal leaf lacks an allowed source label/
    );
  });
});

async function createFixture() {
  const fixtureRoot = await mkdtemp(join(tmpdir(), "gbs-operational-savings-validator-"));
  fixtureRoots.push(fixtureRoot);
  for (const directory of [
    "docs",
    "scripts",
    "apps/api/server/matching"
  ]) {
    await mkdir(join(fixtureRoot, directory), { recursive: true });
  }
  for (const file of [
    "docs/operational-savings-information-trees.md",
    "docs/operational-savings-standard-registry.md",
    "docs/operational-savings-information-tree-audit.md",
    "scripts/validate-operational-savings-information-trees.mjs",
    "apps/api/server/matching/retrofitTaxonomy.mjs",
    "apps/api/server/matching/ontologies.mjs"
  ]) {
    await cp(join(SOURCE_ROOT, file), join(fixtureRoot, file));
  }
  return fixtureRoot;
}

function runValidator(fixtureRoot) {
  try {
    return execFileSync(
      process.execPath,
      [join(fixtureRoot, "scripts/validate-operational-savings-information-trees.mjs")],
      { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }
    );
  } catch (error) {
    throw new Error(`${error.stdout || ""}${error.stderr || ""}`);
  }
}
