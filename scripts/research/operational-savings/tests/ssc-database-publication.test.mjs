import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterAll, beforeAll, expect, test } from "vitest";

import { publishSscProof } from "../lib/ssc-publication.mjs";
import { openResearchDatabase } from "../lib/sqlite.mjs";

const operationalRoot = fileURLToPath(new URL("../", import.meta.url));
const previousNetworkMode = process.env.OS_RESEARCH_NETWORK;
const cases = [
  {
    slug: "pvwatts",
    standardId: "STD-PVWATTS-V8",
    formulaTerm: "PV_AC_kWh_t",
    unit: "kWh/interval",
    scope: "PROFILE",
    selectedKind: "series",
    expected: {
      count: 8760,
      sha256:
        "a842a7a51583fca8b7c559a1ed12b16aa9d396ec7c6b92dbfabfc282dbaf0f1c"
    }
  },
  {
    slug: "sam-solar-thermal",
    standardId: "STD-SAM-SOLAR-THERMAL",
    formulaTerm: "SAM_output",
    unit: "kWh-thermal/year",
    scope: "PER_YEAR",
    selectedKind: "value",
    expected: 2362.5011296263892
  },
  {
    slug: "wind-sam",
    standardId: "STD-WIND-SAM",
    formulaTerm: "wind_kWh_t",
    unit: "kWh/interval",
    scope: "PROFILE",
    selectedKind: "series",
    expected: {
      count: 8760,
      sha256:
        "9810d820d7f091b4d8439f64c0a51d062b58bd6bf153e8801dccc3a0df69012a"
    }
  }
];

let temporaryDirectory;
let database;
let proofs;
let publications;

beforeAll(async () => {
  process.env.OS_RESEARCH_NETWORK = "disabled";
  temporaryDirectory = await mkdtemp(
    join(tmpdir(), "retrofi-ssc-database-")
  );
  database = await openResearchDatabase(
    join(temporaryDirectory, "research.sqlite")
  );
  proofs = Object.fromEntries(
    await Promise.all(
      cases.map(async ({ slug }) => [
        slug,
        JSON.parse(
          await readFile(
            join(operationalRoot, "adapters", slug, "proof.json"),
            "utf8"
          )
        )
      ])
    )
  );
  publications = Object.fromEntries(
    cases.map(({ slug }) => [
      slug,
      publishSscProof(database, proofs[slug])
    ])
  );
});

afterAll(async () => {
  database?.close();
  await rm(temporaryDirectory, { recursive: true, force: true });
  if (previousNetworkMode === undefined) {
    delete process.env.OS_RESEARCH_NETWORK;
  } else {
    process.env.OS_RESEARCH_NETWORK = previousNetworkMode;
  }
});

for (const modelCase of cases) {
  test(
    `${modelCase.standardId} publishes its pinned model identity, calculation, provenance, and exact formula selection`,
    () => {
      const publication =
        publications[modelCase.slug];
      const model = database.prepare(`
        SELECT
          v.standard_id,
          v.version,
          v.commit_sha,
          v.executable_sha256,
          s.schema_json
        FROM model_versions v
        JOIN model_input_schemas s
          ON s.model_version_id = v.id
        WHERE v.id = ?
      `).get(publication.modelVersionId);
      expect(model).toMatchObject({
        standard_id: modelCase.standardId,
        version: "303",
        commit_sha:
          "f952cabdf3e60f6e88eef80bb7bc9e7e24bac643",
        executable_sha256:
          "db933646389fa94f41af34066d65034681d5836f1bd29644f9b2a934a01b788f"
      });
      expect(JSON.parse(model.schema_json).length).toBeGreaterThan(
        40
      );

      const selected = database.prepare(`
        SELECT
          r.standard_id,
          r.network_disabled,
          r.status,
          v.formula_term,
          v.value,
          v.value_json,
          v.unit,
          v.scope,
          p.source_fields_json,
          p.filters_json,
          p.transformation,
          p.adapter_path
        FROM selected_values v
        JOIN calculation_runs r
          ON r.id = v.calculation_run_id
        JOIN selected_value_provenance p
          ON p.selected_value_id = v.id
        WHERE v.id = ?
      `).get(publication.selectedValueId);
      expect(selected).toMatchObject({
        standard_id: modelCase.standardId,
        network_disabled: 1,
        status: "SUCCESS",
        formula_term: modelCase.formulaTerm,
        unit: modelCase.unit,
        scope: modelCase.scope
      });
      expect(
        JSON.parse(selected.source_fields_json).length
      ).toBeGreaterThan(0);
      expect(JSON.parse(selected.filters_json)).toMatchObject({
        sscVersion: 303
      });
      expect(selected.transformation).toBeTruthy();
      expect(selected.adapter_path).toMatch(
        new RegExp(`${modelCase.slug}/run\\.mjs$`)
      );
      if (modelCase.selectedKind === "series") {
        expect(selected.value).toBeNull();
        expect(JSON.parse(selected.value_json)).toMatchObject(
          modelCase.expected
        );
      } else {
        expect(selected.value_json).toBeNull();
        expect(selected.value).toBeCloseTo(
          modelCase.expected,
          10
        );
      }
    }
  );
}

for (const modelCase of cases) {
  test(
    `${modelCase.standardId} rejects mixed model identity and offline publication violations`,
    () => {
      const mixed = structuredClone(proofs[modelCase.slug]);
      mixed.publicationRows.modelVersion.executableSha256 =
        "0".repeat(64);
      expect(() => publishSscProof(database, mixed)).toThrow(
        /MIXED_MODEL_RELEASES/
      );

      process.env.OS_RESEARCH_NETWORK = "enabled";
      try {
        expect(() =>
          publishSscProof(database, proofs[modelCase.slug])
        ).toThrow(/OFFLINE_GUARD_REQUIRED/);
      } finally {
        process.env.OS_RESEARCH_NETWORK = "disabled";
      }
    }
  );
}

test("publishes three pinned SSC model identities and exact native schemas", () => {
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM source_registry"
    ).get().count
  ).toBe(3);
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM model_versions"
    ).get().count
  ).toBe(3);
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM model_input_schemas"
    ).get().count
  ).toBe(3);
  expect(
    database.prepare(`
      SELECT count(*) AS count
      FROM source_releases
      WHERE status = 'PUBLISHED'
    `).get().count
  ).toBe(3);
  for (const modelCase of cases) {
    const row = database.prepare(`
      SELECT
        v.standard_id,
        v.version,
        v.commit_sha,
        v.executable_sha256,
        s.module_name,
        s.fingerprint_sha256,
        s.schema_json
      FROM model_versions v
      JOIN model_input_schemas s ON s.model_version_id = v.id
      WHERE v.id = ?
    `).get(publications[modelCase.slug].modelVersionId);
    expect(row).toMatchObject({
      standard_id: modelCase.standardId,
      version: "303",
      commit_sha: "f952cabdf3e60f6e88eef80bb7bc9e7e24bac643",
      executable_sha256:
        "db933646389fa94f41af34066d65034681d5836f1bd29644f9b2a934a01b788f"
    });
    const nativeSchema = JSON.parse(row.schema_json);
    expect(nativeSchema.length).toBeGreaterThan(40);
    expect(
      nativeSchema.some(
        (field) =>
          field.name === modelCase.formulaTerm ||
          field.name === "gen" ||
          field.name === "annual_energy"
      )
    ).toBe(true);
  }
});

test("accepts exact standalone SSC publication replays", () => {
  const before = Object.fromEntries(
    [
      "calculation_runs",
      "calculation_warnings",
      "ingestion_runs",
      "selected_value_provenance",
      "selected_values",
      "source_artifacts",
      "source_checksums",
      "source_releases"
    ].map((table) => [
      table,
      database.prepare(
        `SELECT count(*) AS count FROM "${table}"`
      ).get().count
    ])
  );
  for (const { slug } of cases) {
    expect(() =>
      publishSscProof(database, proofs[slug])
    ).not.toThrow();
  }
  const after = Object.fromEntries(
    Object.keys(before).map((table) => [
      table,
      database.prepare(
        `SELECT count(*) AS count FROM "${table}"`
      ).get().count
    ])
  );
  expect(after).toEqual(before);
});

test("rejects warning omissions atomically on SSC replay", () => {
  const changed = structuredClone(proofs.pvwatts);
  changed.warnings = [];
  const before = {
    ingestionWarningCount: database.prepare(`
      SELECT warning_count
      FROM ingestion_runs
      WHERE id = 'ingestion:ssc:pvwatts:303:v1'
    `).get().warning_count,
    warningIds: database.prepare(`
      SELECT id
      FROM calculation_warnings
      WHERE calculation_run_id = ?
      ORDER BY id
    `).all(
      publications.pvwatts.calculationRunId
    ).map(({ id }) => id)
  };
  expect(() =>
    publishSscProof(database, changed)
  ).toThrow("SSC_WARNING_SET_MISMATCH");
  expect({
    ingestionWarningCount: database.prepare(`
      SELECT warning_count
      FROM ingestion_runs
      WHERE id = 'ingestion:ssc:pvwatts:303:v1'
    `).get().warning_count,
    warningIds: database.prepare(`
      SELECT id
      FROM calculation_warnings
      WHERE calculation_run_id = ?
      ORDER BY id
    `).all(
      publications.pvwatts.calculationRunId
    ).map(({ id }) => id)
  }).toEqual(before);
});

for (const replayMutation of [
  {
    label: "ingestion adapter identity",
    mutate(proof) {
      proof.publicationRows.calculationRun.adapterVersion =
        "ssc-adapter-mutated";
    },
    error: "IMMUTABLE_ROW_UPDATE: ingestion_runs"
  },
  {
    label: "model package identity",
    mutate(proof) {
      proof.publicationRows.modelVersion.packageName =
        "mutated-ssc-package";
    },
    error: "IMMUTABLE_ROW_UPDATE: model_versions"
  },
  {
    label: "model schema module identity",
    mutate(proof) {
      proof.publicationRows.modelInputSchema.moduleName =
        "mutated_module";
    },
    error: "IMMUTABLE_ROW_UPDATE: model_input_schemas"
  },
  {
    label: "calculation process identity",
    mutate(proof) {
      proof.publicationRows.calculationRun.processKey =
        "mutated_process";
    },
    error: "IMMUTABLE_ROW_UPDATE: calculation_runs"
  },
  {
    label: "warning code identity",
    mutate(proof) {
      proof.warnings[0].code = "MUTATED_WARNING";
    },
    error: "IMMUTABLE_ROW_UPDATE: calculation_warnings"
  }
]) {
  test(`rejects changed ${replayMutation.label} atomically on SSC replay`, () => {
    const changed = structuredClone(proofs.pvwatts);
    replayMutation.mutate(changed);
    expect(() =>
      publishSscProof(database, changed)
    ).toThrow(replayMutation.error);
    expect(() =>
      publishSscProof(database, proofs.pvwatts)
    ).not.toThrow();
  });
}

test("rolls back every SSC row when the final publication transition fails", async () => {
  const rollbackDatabase = await openResearchDatabase(
    join(temporaryDirectory, "rollback.sqlite")
  );
  try {
    rollbackDatabase.exec(`
      CREATE TRIGGER reject_pvwatts_publication
      BEFORE UPDATE OF status ON source_releases
      FOR EACH ROW
      WHEN
        NEW.id = 'release:ssc:pvwatts:303'
        AND NEW.status = 'PUBLISHED'
      BEGIN
        SELECT RAISE(ABORT, 'TEST_SSC_PUBLICATION_REJECTED');
      END;
    `);
    expect(() =>
      publishSscProof(rollbackDatabase, proofs.pvwatts)
    ).toThrow("TEST_SSC_PUBLICATION_REJECTED");
    for (const table of [
      "calculation_runs",
      "calculation_warnings",
      "ingestion_runs",
      "model_input_schemas",
      "model_versions",
      "selected_value_provenance",
      "selected_values",
      "source_artifacts",
      "source_checksums",
      "source_registry",
      "source_releases",
      "schema_versions"
    ]) {
      expect(
        rollbackDatabase.prepare(
          `SELECT count(*) AS count FROM "${table}"`
        ).get().count
      ).toBe(0);
    }
  } finally {
    rollbackDatabase.close();
  }
});

test("publishes real offline calculation runs and exact formula selections", () => {
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM calculation_runs"
    ).get().count
  ).toBe(3);
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM selected_values"
    ).get().count
  ).toBe(3);
  for (const modelCase of cases) {
    const selected = database.prepare(`
      SELECT
        r.standard_id,
        r.network_disabled,
        r.status,
        v.formula_term,
        v.value,
        v.value_json,
        v.unit,
        v.scope
      FROM selected_values v
      JOIN calculation_runs r ON r.id = v.calculation_run_id
      WHERE v.id = ?
    `).get(publications[modelCase.slug].selectedValueId);
    expect(selected).toMatchObject({
      standard_id: modelCase.standardId,
      network_disabled: 1,
      status: "SUCCESS",
      formula_term: modelCase.formulaTerm,
      unit: modelCase.unit,
      scope: modelCase.scope
    });
    if (modelCase.selectedKind === "series") {
      expect(selected.value).toBeNull();
      expect(JSON.parse(selected.value_json)).toMatchObject(
        modelCase.expected
      );
    } else {
      expect(selected.value_json).toBeNull();
      expect(selected.value).toBeCloseTo(modelCase.expected, 10);
    }
  }
});

test("retains source fields, filters, transformations, and model warnings", () => {
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM selected_value_provenance"
    ).get().count
  ).toBe(3);
  expect(
    database.prepare(
      "SELECT count(*) AS count FROM calculation_warnings"
    ).get().count
  ).toBe(7);
  const provenance = database.prepare(`
    SELECT source_fields_json, filters_json, transformation, adapter_path
    FROM selected_value_provenance
    WHERE selected_value_id = ?
  `).get(publications.pvwatts.selectedValueId);
  expect(JSON.parse(provenance.source_fields_json)).toEqual([
    "gen",
    "annual_energy"
  ]);
  expect(JSON.parse(provenance.filters_json)).toMatchObject({
    sscVersion: 303
  });
  expect(provenance.transformation).toContain("native gen kW");
  expect(provenance.adapter_path).toMatch(/pvwatts\/run\.mjs$/);
});

test("rejects mixed model releases and runtime publication without the offline guard", () => {
  const mixed = structuredClone(proofs.pvwatts);
  mixed.publicationRows.modelVersion.executableSha256 = "0".repeat(64);
  expect(() => publishSscProof(database, mixed)).toThrow(
    /MIXED_MODEL_RELEASES/
  );
  process.env.OS_RESEARCH_NETWORK = "enabled";
  try {
    expect(() => publishSscProof(database, proofs.pvwatts)).toThrow(
      /OFFLINE_GUARD_REQUIRED/
    );
  } finally {
    process.env.OS_RESEARCH_NETWORK = "disabled";
  }
});
