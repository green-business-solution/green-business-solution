import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { promisify } from "node:util";

import {
  sha256File,
  sha256Json
} from "../../lib/artifact.mjs";

const execFileAsync = promisify(execFile);

export const REOPT_COMMIT =
  "f952cabdf3e60f6e88eef80bb7bc9e7e24bac643";

export const REOPT_FILES = Object.freeze({
  project: {
    path: "Project.toml",
    sha256:
      "f67d05bba64f2d17f3bdb8944e1b17b3713e1de8b87ba8e52a5c742c3737a0c6"
  },
  electricStorage: {
    path: "src/core/energy_storage/electric_storage.jl",
    sha256:
      "a810d89b77ea70b5be440d30e6ec566c5dfd789677bc2825c5e46fb2b4b63248"
  },
  pv: {
    path: "src/core/pv.jl",
    sha256:
      "793b3c51d53402b59c539f51edf2bf6190ad1894201c36d30914eca509b77c33"
  },
  electricTariffResults: {
    path: "src/results/electric_tariff.jl",
    sha256:
      "b2c5faebd7e3eabc46728956f0d4bc34994209cddf2598754b87ce97e1a3b775"
  },
  electricStorageResults: {
    path: "src/results/electric_storage.jl",
    sha256:
      "549f2e3d6b989dcaa141e44b8c2cd62ef418f20844314b7fbf74a09f893a2e26"
  },
  pvResults: {
    path: "src/results/pv.jl",
    sha256:
      "3f9839923264bc75ac5a2f8d11952674f3a0da64009e1968b7af3f89a8a5fae2"
  },
  scenario: {
    path: "test/scenarios/pv_storage.json",
    sha256:
      "1d221fde6f26c8a2cde99669a3d54daade976e66c1e455ead8abd3b5d6fb7a36"
  }
});

function requireTomlValue(source, key) {
  const match = source.match(
    new RegExp(`^${key}\\s*=\\s*"([^"]+)"\\s*$`, "m")
  );
  if (!match) {
    throw new Error(`SOURCE_SCHEMA_DRIFT: Project.toml ${key}`);
  }
  return match[1];
}

export function parseJuliaKwdefStruct(source, structName) {
  const escaped = structName.replaceAll(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(
    new RegExp(
      `Base\\.@kwdef struct ${escaped}\\s*\\n([\\s\\S]*?)\\nend`,
      "m"
    )
  );
  if (!match) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: missing Julia kwdef struct ${structName}`
    );
  }
  const fields = match[1]
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const field = line.match(
        /^([A-Za-z_][A-Za-z0-9_]*)::(.+?)\s*=\s*(.+?)(?:\s+#.*)?$/
      );
      if (!field) {
        throw new Error(
          `SOURCE_SCHEMA_DRIFT: unparsed ${structName} field ${line}`
        );
      }
      return {
        name: field[1],
        juliaType: field[2].trim(),
        defaultExpression: field[3].trim()
      };
    });
  if (!fields.length || new Set(fields.map((field) => field.name)).size !== fields.length) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: invalid Julia kwdef struct ${structName}`
    );
  }
  return fields;
}

export function parseJuliaResultKeys(source) {
  const keys = [
    ...source.matchAll(/\br\["([^"]+)"\]\s*=/g)
  ].map((match) => match[1]);
  return [...new Set(keys)].sort();
}

export function parseJuliaMutableStructFields(source, structName) {
  const escaped = structName.replaceAll(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = source.match(
    new RegExp(
      `mutable struct ${escaped}(?:\\s*<:[^\\n]+)?\\s*\\n([\\s\\S]*?)\\n\\s*function ${escaped}\\(;`,
      "m"
    )
  );
  if (!match) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: missing Julia mutable struct ${structName}`
    );
  }
  const fields = match[1]
    .split(/\r?\n/)
    .map((line) => line.replace(/#.*$/, "").trim())
    .filter(Boolean)
    .map((line) => line.match(/^([A-Za-z_][A-Za-z0-9_]*)$/)?.[1]);
  if (
    fields.some((field) => !field) ||
    !fields.length ||
    new Set(fields).size !== fields.length
  ) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: invalid Julia mutable struct ${structName}`
    );
  }
  return fields;
}

function requireFields(actual, expected, label) {
  const set = new Set(actual);
  const missing = expected.filter((value) => !set.has(value));
  if (missing.length) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: ${label} missing ${missing.join(", ")}`
    );
  }
}

export function schemaFromReoptSources({
  projectSource,
  storageSource,
  pvSource,
  tariffResultsSource,
  storageResultsSource,
  pvResultsSource,
  scenarioSource,
  fileChecksums
}) {
  const packageMetadata = {
    name: requireTomlValue(projectSource, "name"),
    uuid: requireTomlValue(projectSource, "uuid"),
    version: requireTomlValue(projectSource, "version")
  };
  if (
    packageMetadata.name !== "REopt" ||
    packageMetadata.version !== "0.59.2"
  ) {
    throw new Error("SOURCE_SCHEMA_DRIFT: REopt package identity");
  }
  const electricStorageInputs = parseJuliaKwdefStruct(
    storageSource,
    "ElectricStorageDefaults"
  );
  const pvInputs = parseJuliaMutableStructFields(pvSource, "PV");
  const electricTariffResultKeys = parseJuliaResultKeys(
    tariffResultsSource
  );
  const electricStorageResultKeys = parseJuliaResultKeys(
    storageResultsSource
  );
  const pvResultKeys = parseJuliaResultKeys(pvResultsSource);
  const scenario = JSON.parse(scenarioSource);
  const scenarioSections = Object.keys(scenario);
  const scenarioElectricStorageFields = Object.keys(
    scenario.ElectricStorage ?? {}
  ).sort();
  requireFields(
    electricStorageInputs.map((field) => field.name),
    [
      "min_kw",
      "max_kw",
      "min_kwh",
      "max_kwh",
      "charge_efficiency",
      "discharge_efficiency",
      "soc_init_fraction",
      "soc_min_fraction",
      "fixed_soc_series_fraction"
    ],
    "ElectricStorageDefaults"
  );
  requireFields(
    pvInputs,
    [
      "existing_kw",
      "min_kw",
      "max_kw",
      "production_factor_series",
      "can_net_meter",
      "can_wholesale",
      "can_export_beyond_nem_limit",
      "can_curtail"
    ],
    "PV"
  );
  requireFields(
    electricTariffResultKeys,
    [
      "year_one_energy_cost_before_tax",
      "year_one_demand_cost_before_tax",
      "year_one_fixed_cost_before_tax",
      "year_one_min_charge_adder_before_tax",
      "year_one_coincident_peak_cost_before_tax",
      "year_one_bill_before_tax"
    ],
    "ElectricTariff results"
  );
  requireFields(
    pvResultKeys,
    [
      "size_kw",
      "year_one_energy_produced_kwh",
      "electric_to_load_series_kw",
      "electric_to_storage_series_kw",
      "electric_to_grid_series_kw",
      "electric_curtailed_series_kw",
      "production_factor_series"
    ],
    "PV results"
  );
  requireFields(
    electricStorageResultKeys,
    [
      "size_kw",
      "size_kwh",
      "soc_series_fraction",
      "storage_to_load_series_kw"
    ],
    "ElectricStorage results"
  );
  requireFields(
    scenarioSections,
    [
      "Site",
      "ElectricLoad",
      "ElectricStorage",
      "ElectricTariff",
      "Financial"
    ],
    "pv_storage scenario"
  );
  const observed = {
    format: "JULIA_SOURCE_AND_JSON_SCENARIO",
    packageMetadata,
    fileChecksums,
    electricStorageInputs,
    pvInputs,
    electricTariffResultKeys,
    electricStorageResultKeys,
    pvResultKeys,
    scenarioSections,
    scenarioElectricStorageFields,
    fields: [
      { name: "min_kw", unit: "kW" },
      { name: "max_kw", unit: "kW" },
      { name: "min_kwh", unit: "kWh" },
      { name: "max_kwh", unit: "kWh" },
      {
        name: "soc_init_fraction",
        unit: "fraction",
        enumeration: ["0 through 1"]
      },
      {
        name: "year_one_bill_before_tax",
        unit: "USD/year"
      },
      {
        name: "PV.production_factor_series",
        unit: "kW-AC/kW-DC nameplate"
      },
      {
        name: "PV.year_one_energy_produced_kwh",
        unit: "kWh/year"
      },
      {
        name: "storage_to_load_series_kw",
        unit: "kW/time step"
      }
    ]
  };
  return {
    ...observed,
    fingerprintSha256: sha256Json(observed)
  };
}

export async function inspectReoptSourceSchema(repoPath) {
  const { stdout } = await execFileAsync(
    "/usr/bin/git",
    ["-C", repoPath, "rev-parse", "HEAD"],
    { encoding: "utf8" }
  );
  const commitSha = stdout.trim();
  if (commitSha !== REOPT_COMMIT) {
    throw new Error(
      `SOURCE_VERSION_MISMATCH: expected ${REOPT_COMMIT}, received ${commitSha}`
    );
  }
  const entries = await Promise.all(
    Object.entries(REOPT_FILES).map(async ([key, file]) => {
      const path = join(repoPath, file.path);
      const [source, digest] = await Promise.all([
        readFile(path, "utf8"),
        sha256File(path)
      ]);
      if (digest !== file.sha256) {
        throw new Error(
          `CORRUPT_CHECKSUM: ${file.path} expected ${file.sha256}, received ${digest}`
        );
      }
      return [key, { ...file, source }];
    })
  );
  const files = Object.fromEntries(entries);
  const fileChecksums = Object.fromEntries(
    Object.entries(files).map(([key, file]) => [
      key,
      {
        path: file.path,
        sha256: file.sha256
      }
    ])
  );
  return {
    commitSha,
    ...schemaFromReoptSources({
      projectSource: files.project.source,
      storageSource: files.electricStorage.source,
      pvSource: files.pv.source,
      tariffResultsSource: files.electricTariffResults.source,
      storageResultsSource: files.electricStorageResults.source,
      pvResultsSource: files.pvResults.source,
      scenarioSource: files.scenario.source,
      fileChecksums
    })
  };
}
