import { readFileSync } from "node:fs";
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { DatabaseSync } from "node:sqlite";

const MIGRATIONS_ROOT = new URL("../db/migrations/", import.meta.url);
const RELEASE_LIFECYCLE_RANK = new Map([
  ["INSPECTED", 0],
  ["NORMALIZED", 1],
  ["PUBLISHED", 2]
]);
const deferredReleasePublications = new WeakMap();
let nestedTransactionId = 0;

export async function openResearchDatabase(
  path,
  {
    migrationAppliedAt = new Date().toISOString(),
    deferReleasePublicationUntilClose = false
  } = {}
) {
  if (
    typeof migrationAppliedAt !== "string" ||
    Number.isNaN(Date.parse(migrationAppliedAt)) ||
    new Date(migrationAppliedAt).toISOString() !== migrationAppliedAt
  ) {
    throw new Error(
      "INVALID_MIGRATION_APPLIED_AT: expected a canonical ISO timestamp"
    );
  }
  if (
    typeof deferReleasePublicationUntilClose !==
    "boolean"
  ) {
    throw new Error(
      "INVALID_DEFER_RELEASE_PUBLICATION_UNTIL_CLOSE: expected a boolean"
    );
  }
  await mkdir(dirname(path), { recursive: true });
  const database = new DatabaseSync(path);
  database.exec(`
    PRAGMA foreign_keys = ON;
    PRAGMA recursive_triggers = ON;
    PRAGMA journal_mode = WAL;
  `);
  const recursiveTriggers = database.prepare(
    "PRAGMA recursive_triggers"
  ).get()?.recursive_triggers;
  if (recursiveTriggers !== 1) {
    database.close();
    throw new Error(
      "SQLITE_RECURSIVE_TRIGGERS_REQUIRED: immutable rows cannot be protected from REPLACE statements"
    );
  }
  database.exec(`
    CREATE TABLE IF NOT EXISTS research_migrations (
      name TEXT PRIMARY KEY,
      sha256 TEXT NOT NULL,
      applied_at TEXT NOT NULL
    );
  `);
  const names = (await readdir(MIGRATIONS_ROOT)).filter((name) => name.endsWith(".sql")).sort();
  for (const name of names) {
    const url = new URL(name, MIGRATIONS_ROOT);
    const sql = await readFile(url, "utf8");
    const existing = database.prepare(
      "SELECT sha256 FROM research_migrations WHERE name = ?"
    ).get(name);
    const { createHash } = await import("node:crypto");
    const digest = createHash("sha256").update(sql).digest("hex");
    if (existing && existing.sha256 !== digest) {
      database.close();
      throw new Error(`MIGRATION_CHANGED_AFTER_APPLY: ${name}`);
    }
    if (!existing) {
      database.exec("BEGIN IMMEDIATE");
      try {
        database.exec(sql);
        database.prepare(
          "INSERT INTO research_migrations (name, sha256, applied_at) VALUES (?, ?, ?)"
        ).run(name, digest, migrationAppliedAt);
        database.exec("COMMIT");
      } catch (error) {
        database.exec("ROLLBACK");
        database.close();
        throw error;
      }
    }
  }
  if (deferReleasePublicationUntilClose) {
    installDeferredPublicationClose(database);
  }
  return database;
}

export function withTransaction(database, callback) {
  if (database.isTransaction) {
    nestedTransactionId += 1;
    const savepoint = `research_nested_transaction_${nestedTransactionId}`;
    database.exec(`SAVEPOINT ${savepoint}`);
    try {
      const result = callback();
      if (result?.then) {
        throw new Error(
          "ASYNC_SQLITE_TRANSACTION_CALLBACK_UNSUPPORTED"
        );
      }
      database.exec(`RELEASE SAVEPOINT ${savepoint}`);
      return result;
    } catch (error) {
      database.exec(`ROLLBACK TO SAVEPOINT ${savepoint}`);
      database.exec(`RELEASE SAVEPOINT ${savepoint}`);
      throw error;
    }
  }
  database.exec("BEGIN IMMEDIATE");
  try {
    const result = callback();
    if (result?.then) {
      throw new Error(
        "ASYNC_SQLITE_TRANSACTION_CALLBACK_UNSUPPORTED"
      );
    }
    database.exec("COMMIT");
    return result;
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}

function advancePendingReleasePublications(database, pending) {
  for (const [releaseId, requestedStatus] of [...pending].sort(
    ([left], [right]) => left.localeCompare(right)
  )) {
    advanceReleaseStatus(
      database,
      releaseId,
      requestedStatus
    );
  }
}

function installDeferredPublicationClose(database) {
  if (deferredReleasePublications.has(database)) {
    throw new Error(
      "DEFERRED_PUBLICATION_SCOPE_ALREADY_ACTIVE"
    );
  }
  const pending = new Map();
  deferredReleasePublications.set(database, pending);
  const closeDatabase = database.close.bind(database);
  let closed = false;
  database.close = () => {
    if (closed) {
      return closeDatabase();
    }
    let failure = null;
    try {
      if (database.isTransaction) {
        throw new Error(
          "DEFERRED_PUBLICATION_CLOSE_DURING_TRANSACTION"
        );
      }
      withTransaction(database, () => {
        advancePendingReleasePublications(
          database,
          pending
        );
      });
    } catch (error) {
      failure = error;
    } finally {
      deferredReleasePublications.delete(database);
      closed = true;
      closeDatabase();
    }
    if (failure) throw failure;
  };
}

function assertImmutableRow(
  database,
  {
    table,
    keyColumn = "id",
    keyValue,
    expected,
    conflictCode
  }
) {
  const columns = Object.keys(expected);
  const row = database.prepare(`
    SELECT ${columns.join(", ")}
    FROM ${table}
    WHERE ${keyColumn} = ?
  `).get(keyValue);
  if (!row) {
    throw new Error(
      `${conflictCode}: inserted row ${keyValue} is missing`
    );
  }
  const mismatch = columns.find(
    (column) => row[column] !== expected[column]
  );
  if (mismatch) {
    throw new Error(
      `${conflictCode}: ${keyValue}.${mismatch} already has different immutable content`
    );
  }
}

function advanceReleaseStatus(database, releaseId, requestedStatus) {
  const existing = database.prepare(`
    SELECT status
    FROM source_releases
    WHERE id = ?
  `).get(releaseId);
  if (!existing) {
    throw new Error(
      `IMMUTABLE_RELEASE_ID_CONFLICT: inserted row ${releaseId} is missing`
    );
  }
  if (existing.status === requestedStatus) return;

  const currentRank = RELEASE_LIFECYCLE_RANK.get(existing.status);
  const requestedRank = RELEASE_LIFECYCLE_RANK.get(requestedStatus);
  if (currentRank === undefined || requestedRank === undefined) {
    throw new Error(
      `INVALID_RELEASE_STATUS_TRANSITION: ${releaseId} cannot transition from ${existing.status} to ${requestedStatus}`
    );
  }
  if (requestedRank <= currentRank) return;

  database.prepare(`
    UPDATE source_releases
    SET status = ?
    WHERE id = ? AND status = ?
  `).run(requestedStatus, releaseId, existing.status);
}

function requestReleaseStatus(database, releaseId, requestedStatus) {
  const pending = deferredReleasePublications.get(database);
  if (pending && requestedStatus === "PUBLISHED") {
    pending.set(releaseId, requestedStatus);
    return;
  }
  advanceReleaseStatus(database, releaseId, requestedStatus);
}

export async function withDeferredReleasePublication(
  database,
  callback
) {
  if (deferredReleasePublications.has(database)) {
    return callback();
  }
  const pending = new Map();
  deferredReleasePublications.set(database, pending);
  try {
    const result = await callback();
    withTransaction(database, () => {
      advancePendingReleasePublications(database, pending);
    });
    return result;
  } finally {
    deferredReleasePublications.delete(database);
  }
}

export function withAtomicDeferredReleasePublication(
  database,
  callback
) {
  const outerPending = deferredReleasePublications.get(database);
  if (outerPending) {
    const pendingBefore = new Map(outerPending);
    try {
      return withTransaction(database, callback);
    } catch (error) {
      outerPending.clear();
      for (const [releaseId, requestedStatus] of pendingBefore) {
        outerPending.set(releaseId, requestedStatus);
      }
      throw error;
    }
  }

  const pending = new Map();
  deferredReleasePublications.set(database, pending);
  try {
    return withTransaction(database, () => {
      const result = callback();
      advancePendingReleasePublications(database, pending);
      return result;
    });
  } finally {
    deferredReleasePublications.delete(database);
  }
}

export function upsertSourceRelease(database, {
  id,
  sourceId,
  version,
  publishedAt = null,
  acquiredAt,
  status,
  schemaVersionId = null
}) {
  return withTransaction(database, () => {
    const stagedStatus =
      status === "PUBLISHED" ? "INSPECTED" : status;
    database.prepare(`
      INSERT INTO source_releases (
        id, source_id, version, published_at, acquired_at, status,
        schema_version_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO NOTHING
    `).run(
      id,
      sourceId,
      version,
      publishedAt,
      acquiredAt,
      stagedStatus,
      schemaVersionId
    );
    assertImmutableRow(database, {
      table: "source_releases",
      keyValue: id,
      expected: {
        source_id: sourceId,
        version,
        published_at: publishedAt,
        acquired_at: acquiredAt,
        schema_version_id: schemaVersionId
      },
      conflictCode: "IMMUTABLE_RELEASE_ID_CONFLICT"
    });
    requestReleaseStatus(database, id, status);
  });
}

export function upsertSourceProof(database, proof) {
  return withTransaction(database, () =>
    upsertSourceProofWithinTransaction(database, proof)
  );
}

function upsertSourceProofWithinTransaction(database, {
  source,
  schema,
  release,
  artifact,
  ingestion
}) {
  const stagedReleaseStatus =
    release.status === "PUBLISHED" ? "INSPECTED" : release.status;
  database.prepare(`
    INSERT INTO source_registry (
      id, standard_id, organization, name, primary_url, license, attribution, access_mode
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO NOTHING
  `).run(
    source.id,
    source.standardId,
    source.organization,
    source.name,
    source.primaryUrl,
    source.license,
    source.attribution,
    source.accessMode
  );
  assertImmutableRow(database, {
    table: "source_registry",
    keyValue: source.id,
    expected: {
      standard_id: source.standardId,
      organization: source.organization,
      name: source.name,
      primary_url: source.primaryUrl,
      license: source.license,
      attribution: source.attribution,
      access_mode: source.accessMode
    },
    conflictCode: "IMMUTABLE_SOURCE_ID_CONFLICT"
  });
  const schemaJson = JSON.stringify(schema.observed);
  database.prepare(`
    INSERT INTO schema_versions (
      id, source_id, fingerprint_sha256, schema_kind, schema_json, inspected_at
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO NOTHING
  `).run(
    schema.id,
    source.id,
    schema.fingerprintSha256,
    schema.kind,
    schemaJson,
    schema.inspectedAt
  );
  assertImmutableRow(database, {
    table: "schema_versions",
    keyValue: schema.id,
    expected: {
      source_id: source.id,
      fingerprint_sha256: schema.fingerprintSha256,
      schema_kind: schema.kind,
      schema_json: schemaJson,
      inspected_at: schema.inspectedAt
    },
    conflictCode: "IMMUTABLE_SCHEMA_ID_CONFLICT"
  });
  database.prepare(`
    INSERT INTO source_releases (
      id, source_id, version, published_at, acquired_at, status, schema_version_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO NOTHING
  `).run(
    release.id,
    source.id,
    release.version,
    release.publishedAt ?? null,
    release.acquiredAt,
    stagedReleaseStatus,
    schema.id
  );
  assertImmutableRow(database, {
    table: "source_releases",
    keyValue: release.id,
    expected: {
      source_id: source.id,
      version: release.version,
      published_at: release.publishedAt ?? null,
      acquired_at: release.acquiredAt,
      schema_version_id: schema.id
    },
    conflictCode: "IMMUTABLE_RELEASE_ID_CONFLICT"
  });
  database.prepare(`
    INSERT INTO source_artifacts (
      id, release_id, source_url, local_name, media_type, byte_size, sha256,
      acquired_at, official
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
    ON CONFLICT(id) DO NOTHING
  `).run(
    artifact.id,
    release.id,
    artifact.sourceUrl,
    artifact.localName,
    artifact.mediaType,
    artifact.byteSize,
    artifact.sha256,
    release.acquiredAt
  );
  assertImmutableRow(database, {
    table: "source_artifacts",
    keyValue: artifact.id,
    expected: {
      release_id: release.id,
      source_url: artifact.sourceUrl,
      local_name: artifact.localName,
      media_type: artifact.mediaType,
      byte_size: artifact.byteSize,
      sha256: artifact.sha256,
      acquired_at: release.acquiredAt,
      official: 1
    },
    conflictCode: "IMMUTABLE_ARTIFACT_ID_CONFLICT"
  });
  database.prepare(`
    INSERT INTO source_checksums (artifact_id, algorithm, digest, observed_at)
    VALUES (?, 'sha256', ?, ?)
    ON CONFLICT(artifact_id, algorithm) DO NOTHING
  `).run(artifact.id, artifact.sha256, release.acquiredAt);
  const checksum = database.prepare(`
    SELECT digest, observed_at
    FROM source_checksums
    WHERE artifact_id = ? AND algorithm = 'sha256'
  `).get(artifact.id);
  if (
    checksum?.digest !== artifact.sha256 ||
    checksum?.observed_at !== release.acquiredAt
  ) {
    throw new Error(
      `IMMUTABLE_CHECKSUM_CONFLICT: ${artifact.id} already has different immutable content`
    );
  }
  database.prepare(`
    INSERT INTO ingestion_runs (
      id, source_id, release_id, adapter_version, started_at, finished_at, status,
      network_disabled, records_read, records_written, warning_count, error_message
    ) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      source_id = excluded.source_id,
      release_id = excluded.release_id,
      adapter_version = excluded.adapter_version,
      started_at = excluded.started_at,
      finished_at = excluded.finished_at,
      status = excluded.status,
      network_disabled = excluded.network_disabled,
      records_read = excluded.records_read,
      records_written = excluded.records_written,
      warning_count = excluded.warning_count,
      error_message = excluded.error_message
  `).run(
    ingestion.id,
    source.id,
    release.id,
    ingestion.adapterVersion,
    ingestion.startedAt,
    ingestion.finishedAt,
    ingestion.status,
    ingestion.recordsRead,
    ingestion.recordsWritten,
    ingestion.warningCount ?? 0,
    ingestion.errorMessage ?? null
  );
  requestReleaseStatus(database, release.id, release.status);
}

export async function writeCompactDatabaseExport(database, outputPath, {
  sampleLimit = 3
} = {}) {
  const tables = database.prepare(`
    SELECT name
    FROM sqlite_schema
    WHERE type = 'table'
      AND name NOT LIKE 'sqlite_%'
      AND name <> 'research_migrations'
    ORDER BY name
  `).all().map((row) => row.name);
  const exportValue = {
    schemaVersion: "operational-savings/research-database-compact-export-v1",
    generatedBy: "scripts/research/operational-savings/lib/sqlite.mjs",
    tables: {}
  };
  for (const table of tables) {
    const count = database.prepare(`SELECT count(*) AS count FROM "${table}"`).get().count;
    const samples = count
      ? database.prepare(`SELECT * FROM "${table}" ORDER BY rowid LIMIT ?`).all(sampleLimit)
      : [];
    exportValue.tables[table] = { count, samples };
  }
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(exportValue, null, 2)}\n`, "utf8");
  return exportValue;
}

export function readMigrationSql(name = "001_research_database.sql") {
  return readFileSync(new URL(name, MIGRATIONS_ROOT), "utf8");
}
