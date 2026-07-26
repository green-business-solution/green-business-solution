import { createHash } from "node:crypto";
import {
  mkdtemp,
  readFile,
  rm
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, expect, test } from "vitest";

import {
  openResearchDatabase,
  upsertSourceProof,
  withDeferredReleasePublication
} from "../lib/sqlite.mjs";
import { REPRODUCIBLE_MIGRATION_APPLIED_AT } from "../run-real-proofs.mjs";

const temporaryDirectories = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((path) =>
      rm(path, { recursive: true, force: true })
    )
  );
});

async function buildEmptyDatabase(path) {
  const database = await openResearchDatabase(path, {
    migrationAppliedAt: REPRODUCIBLE_MIGRATION_APPLIED_AT
  });
  database.exec(
    "PRAGMA wal_checkpoint(TRUNCATE); PRAGMA journal_mode = DELETE;"
  );
  database.close();
  const bytes = await readFile(path);
  return {
    bytes,
    sha256: createHash("sha256").update(bytes).digest("hex")
  };
}

test("reproduces fresh database bytes with deterministic migration metadata", async () => {
  const directory = await mkdtemp(
    join(tmpdir(), "retrofi-sqlite-reproducibility-")
  );
  temporaryDirectories.push(directory);

  const first = await buildEmptyDatabase(join(directory, "first.sqlite"));
  const second = await buildEmptyDatabase(join(directory, "second.sqlite"));

  expect(second.sha256).toBe(first.sha256);
  expect(second.bytes).toEqual(first.bytes);
});

test("rejects ambiguous migration timestamps", async () => {
  const directory = await mkdtemp(
    join(tmpdir(), "retrofi-sqlite-timestamp-")
  );
  temporaryDirectories.push(directory);

  await expect(
    openResearchDatabase(join(directory, "invalid.sqlite"), {
      migrationAppliedAt: "July 24, 2026"
    })
  ).rejects.toThrow(/INVALID_MIGRATION_APPLIED_AT/);
});

test("publishes an explicitly deferred release atomically when the database closes", async () => {
  const directory = await mkdtemp(
    join(tmpdir(), "retrofi-sqlite-deferred-close-")
  );
  temporaryDirectories.push(directory);
  const databasePath = join(
    directory,
    "research.sqlite"
  );
  const database = await openResearchDatabase(
    databasePath,
    {
      migrationAppliedAt:
        REPRODUCIBLE_MIGRATION_APPLIED_AT,
      deferReleasePublicationUntilClose: true
    }
  );
  upsertSourceProof(database, sourceProof());
  expect(
    database.prepare(`
      SELECT status
      FROM source_releases
      WHERE id = 'release:test:v1'
    `).get()
  ).toEqual({ status: "INSPECTED" });
  database.close();

  const reopened = await openResearchDatabase(
    databasePath,
    {
      migrationAppliedAt:
        REPRODUCIBLE_MIGRATION_APPLIED_AT
    }
  );
  try {
    expect(
      reopened.prepare(`
        SELECT status
        FROM source_releases
        WHERE id = 'release:test:v1'
      `).get()
    ).toEqual({ status: "PUBLISHED" });
  } finally {
    reopened.close();
  }
});

function sourceProof(
  artifactSha256 = "a".repeat(64),
  releaseStatus = "PUBLISHED"
) {
  return {
    source: {
      id: "source:test",
      standardId: "STD-TEST",
      organization: "Test Authority",
      name: "Test Source",
      primaryUrl: "https://example.test/source",
      license: "Public domain",
      attribution: "Test Authority",
      accessMode: "PUBLIC_BULK_DOWNLOAD"
    },
    schema: {
      id: "schema:test:v1",
      fingerprintSha256: "b".repeat(64),
      kind: "JSON",
      observed: { fields: ["value"] },
      inspectedAt: "2026-07-24T00:00:00.000Z"
    },
    release: {
      id: "release:test:v1",
      version: "v1",
      publishedAt: "2026-07-01T00:00:00.000Z",
      acquiredAt: "2026-07-24T00:00:00.000Z",
      status: releaseStatus
    },
    artifact: {
      id: "artifact:test:v1",
      sourceUrl: "https://example.test/source-v1.json",
      localName: "source-v1.json",
      mediaType: "application/json",
      byteSize: 1,
      sha256: artifactSha256
    },
    ingestion: {
      id: "ingestion:test:v1",
      adapterVersion: "test-v1",
      startedAt: "2026-07-24T00:00:00.000Z",
      finishedAt: "2026-07-24T00:00:00.000Z",
      status: "SUCCEEDED",
      recordsRead: 1,
      recordsWritten: 1
    }
  };
}

function sourceProofWithSuffix(suffix) {
  const proof = structuredClone(sourceProof());
  proof.source.id = `source:test:${suffix}`;
  proof.schema.id = `schema:test:${suffix}`;
  proof.release.id = `release:test:${suffix}`;
  proof.release.version = suffix;
  proof.artifact.id = `artifact:test:${suffix}`;
  proof.artifact.sourceUrl =
    `https://example.test/source-${suffix}.json`;
  proof.artifact.localName = `source-${suffix}.json`;
  proof.ingestion.id = `ingestion:test:${suffix}`;
  return proof;
}

test("populates owned proof rows before the transactional publication transition", async () => {
  const directory = await mkdtemp(
    join(tmpdir(), "retrofi-sqlite-publication-order-")
  );
  temporaryDirectories.push(directory);
  const database = await openResearchDatabase(
    join(directory, "research.sqlite"),
    {
      migrationAppliedAt: REPRODUCIBLE_MIGRATION_APPLIED_AT
    }
  );
  try {
    database.exec(`
      CREATE TABLE proof_publication_order (
        sequence INTEGER PRIMARY KEY AUTOINCREMENT,
        event TEXT NOT NULL,
        release_status TEXT NOT NULL
      );
      CREATE TRIGGER audit_test_release_insert
      AFTER INSERT ON source_releases
      FOR EACH ROW
      WHEN NEW.id = 'release:test:v1'
      BEGIN
        INSERT INTO proof_publication_order (event, release_status)
        VALUES ('release', NEW.status);
      END;
      CREATE TRIGGER audit_test_artifact_insert
      AFTER INSERT ON source_artifacts
      FOR EACH ROW
      WHEN NEW.id = 'artifact:test:v1'
      BEGIN
        INSERT INTO proof_publication_order (event, release_status)
        SELECT 'artifact', status
        FROM source_releases
        WHERE id = NEW.release_id;
      END;
      CREATE TRIGGER audit_test_checksum_insert
      AFTER INSERT ON source_checksums
      FOR EACH ROW
      WHEN NEW.artifact_id = 'artifact:test:v1'
      BEGIN
        INSERT INTO proof_publication_order (event, release_status)
        SELECT 'checksum', release.status
        FROM source_artifacts AS artifact
        JOIN source_releases AS release
          ON release.id = artifact.release_id
        WHERE artifact.id = NEW.artifact_id;
      END;
      CREATE TRIGGER audit_test_ingestion_insert
      AFTER INSERT ON ingestion_runs
      FOR EACH ROW
      WHEN NEW.id = 'ingestion:test:v1'
      BEGIN
        INSERT INTO proof_publication_order (event, release_status)
        SELECT 'ingestion', status
        FROM source_releases
        WHERE id = NEW.release_id;
      END;
      CREATE TRIGGER audit_test_release_publish
      AFTER UPDATE OF status ON source_releases
      FOR EACH ROW
      WHEN
        NEW.id = 'release:test:v1'
        AND NEW.status = 'PUBLISHED'
      BEGIN
        INSERT INTO proof_publication_order (event, release_status)
        VALUES ('publish', NEW.status);
      END;
    `);

    upsertSourceProof(database, sourceProof());

    expect(
      database.prepare(`
        SELECT event, release_status AS releaseStatus
        FROM proof_publication_order
        ORDER BY sequence
      `).all()
    ).toEqual([
      { event: "release", releaseStatus: "INSPECTED" },
      { event: "artifact", releaseStatus: "INSPECTED" },
      { event: "checksum", releaseStatus: "INSPECTED" },
      { event: "ingestion", releaseStatus: "INSPECTED" },
      { event: "publish", releaseStatus: "PUBLISHED" }
    ]);
  } finally {
    database.close();
  }
});

test("defers a complete builder publication until release-owned rows are populated", async () => {
  const directory = await mkdtemp(
    join(tmpdir(), "retrofi-sqlite-deferred-publication-")
  );
  temporaryDirectories.push(directory);
  const database = await openResearchDatabase(
    join(directory, "research.sqlite"),
    {
      migrationAppliedAt: REPRODUCIBLE_MIGRATION_APPLIED_AT
    }
  );
  try {
    const proof = sourceProofWithSuffix("deferred");
    await withDeferredReleasePublication(database, () => {
      upsertSourceProof(database, proof);
      expect(
        database.prepare(`
          SELECT status
          FROM source_releases
          WHERE id = ?
        `).get(proof.release.id)
      ).toEqual({ status: "INSPECTED" });
      database.prepare(`
        INSERT INTO calculation_runs (
          id, standard_id, process_key, source_release_id,
          model_version_id, adapter_version, input_sha256,
          output_sha256, network_disabled, status, created_at
        ) VALUES (
          'calculation:test:deferred', 'STD-TEST', 'deferred',
          ?, NULL, 'adapter-v1', ?, ?, 1, 'SUCCEEDED',
          '2026-07-24T00:00:00.000Z'
        )
      `).run(
        proof.release.id,
        "c".repeat(64),
        "d".repeat(64)
      );
    });
    expect(
      database.prepare(`
        SELECT status
        FROM source_releases
        WHERE id = ?
      `).get(proof.release.id)
    ).toEqual({ status: "PUBLISHED" });
  } finally {
    database.close();
  }
});

test("rolls back the complete deferred publication batch when one transition fails", async () => {
  const directory = await mkdtemp(
    join(tmpdir(), "retrofi-sqlite-deferred-rollback-")
  );
  temporaryDirectories.push(directory);
  const database = await openResearchDatabase(
    join(directory, "research.sqlite"),
    {
      migrationAppliedAt: REPRODUCIBLE_MIGRATION_APPLIED_AT
    }
  );
  try {
    const first = sourceProofWithSuffix("batch-a");
    const second = sourceProofWithSuffix("batch-b");
    database.exec(`
      CREATE TRIGGER reject_second_batch_publication
      BEFORE UPDATE OF status ON source_releases
      FOR EACH ROW
      WHEN
        NEW.id = 'release:test:batch-b'
        AND NEW.status = 'PUBLISHED'
      BEGIN
        SELECT RAISE(ABORT, 'TEST_BATCH_PUBLICATION_REJECTED');
      END;
    `);

    await expect(
      withDeferredReleasePublication(database, () => {
        upsertSourceProof(database, first);
        upsertSourceProof(database, second);
      })
    ).rejects.toThrow("TEST_BATCH_PUBLICATION_REJECTED");
    expect(
      database.prepare(`
        SELECT id, status
        FROM source_releases
        WHERE id IN (?, ?)
        ORDER BY id
      `).all(first.release.id, second.release.id)
    ).toEqual([
      { id: first.release.id, status: "INSPECTED" },
      { id: second.release.id, status: "INSPECTED" }
    ]);
  } finally {
    database.close();
  }
});

test("rolls back every staged proof row when the final publication transition fails", async () => {
  const directory = await mkdtemp(
    join(tmpdir(), "retrofi-sqlite-publication-rollback-")
  );
  temporaryDirectories.push(directory);
  const database = await openResearchDatabase(
    join(directory, "research.sqlite"),
    {
      migrationAppliedAt: REPRODUCIBLE_MIGRATION_APPLIED_AT
    }
  );
  try {
    database.exec(`
      CREATE TRIGGER reject_test_publication
      BEFORE UPDATE OF status ON source_releases
      FOR EACH ROW
      WHEN
        NEW.id = 'release:test:rollback'
        AND NEW.status = 'PUBLISHED'
      BEGIN
        SELECT RAISE(ABORT, 'TEST_PUBLICATION_REJECTED');
      END;
    `);
    const proof = sourceProofWithSuffix("rollback");

    expect(() =>
      upsertSourceProof(database, proof)
    ).toThrow("TEST_PUBLICATION_REJECTED");
    for (const [table, id] of [
      ["source_registry", proof.source.id],
      ["schema_versions", proof.schema.id],
      ["source_releases", proof.release.id],
      ["source_artifacts", proof.artifact.id],
      ["ingestion_runs", proof.ingestion.id]
    ]) {
      expect(
        database.prepare(
          `SELECT count(*) AS count FROM "${table}" WHERE id = ?`
        ).get(id).count
      ).toBe(0);
    }
    expect(
      database.prepare(`
        SELECT count(*) AS count
        FROM source_checksums
        WHERE artifact_id = ?
      `).get(proof.artifact.id).count
    ).toBe(0);
  } finally {
    database.close();
  }
});

test("fails closed when a stable artifact ID is reused for new bytes", async () => {
  const directory = await mkdtemp(
    join(tmpdir(), "retrofi-sqlite-immutability-")
  );
  temporaryDirectories.push(directory);
  const database = await openResearchDatabase(
    join(directory, "research.sqlite"),
    {
      migrationAppliedAt: REPRODUCIBLE_MIGRATION_APPLIED_AT
    }
  );
  try {
    upsertSourceProof(database, sourceProof());
    expect(() =>
      upsertSourceProof(database, sourceProof("c".repeat(64)))
    ).toThrow(/IMMUTABLE_ARTIFACT_ID_CONFLICT/);
    expect(
      database.prepare(`
        SELECT sha256
        FROM source_artifacts
        WHERE id = 'artifact:test:v1'
      `).get()
    ).toEqual({ sha256: "a".repeat(64) });
  } finally {
    database.close();
  }
});

test("advances release lifecycle status without weakening immutable identity", async () => {
  const directory = await mkdtemp(
    join(tmpdir(), "retrofi-sqlite-release-status-")
  );
  temporaryDirectories.push(directory);
  const database = await openResearchDatabase(
    join(directory, "research.sqlite"),
    {
      migrationAppliedAt: REPRODUCIBLE_MIGRATION_APPLIED_AT
    }
  );
  try {
    upsertSourceProof(database, sourceProof("a".repeat(64), "INSPECTED"));
    upsertSourceProof(database, sourceProof("a".repeat(64), "PUBLISHED"));
    expect(
      database.prepare(`
        SELECT status
        FROM source_releases
        WHERE id = 'release:test:v1'
      `).get()
    ).toEqual({ status: "PUBLISHED" });

    upsertSourceProof(database, sourceProof("a".repeat(64), "INSPECTED"));
    expect(
      database.prepare(`
        SELECT status
        FROM source_releases
        WHERE id = 'release:test:v1'
      `).get()
    ).toEqual({ status: "PUBLISHED" });
  } finally {
    database.close();
  }
});

test("rejects transitions into or out of quarantine", async () => {
  const directory = await mkdtemp(
    join(tmpdir(), "retrofi-sqlite-release-quarantine-")
  );
  temporaryDirectories.push(directory);
  const database = await openResearchDatabase(
    join(directory, "research.sqlite"),
    {
      migrationAppliedAt: REPRODUCIBLE_MIGRATION_APPLIED_AT
    }
  );
  try {
    upsertSourceProof(database, sourceProof("a".repeat(64), "INSPECTED"));
    expect(() =>
      upsertSourceProof(
        database,
        sourceProof("a".repeat(64), "QUARANTINED")
      )
    ).toThrow(/INVALID_RELEASE_STATUS_TRANSITION/);
  } finally {
    database.close();
  }
});
