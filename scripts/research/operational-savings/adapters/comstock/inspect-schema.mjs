import { readFile } from "node:fs/promises";

import { DuckDBInstance } from "@duckdb/node-api";

import {
  assertNetworkDisabled,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { parseCsvRecords } from "../../lib/csv.mjs";

export const COMSTOCK_UPGRADES_ARTIFACT = Object.freeze({
  byteSize: 3752,
  sha256: "c3ba607e650d3b78cd86f08ef3cd6e632b7e622797a970cd8f16812e41a1ce5a"
});

export const COMSTOCK_RELEASE = "2025 ComStock Release 3";
export const COMSTOCK_UPGRADES_URL =
  "https://oedi-data-lake.s3.amazonaws.com/nrel-pds-building-stock/end-use-load-profiles-for-us-building-stock/2025/comstock_amy2018_release_3/upgrades_lookup.json";

const COMSTOCK_RELEASE_ROOT =
  "https://oedi-data-lake.s3.amazonaws.com/nrel-pds-building-stock/end-use-load-profiles-for-us-building-stock/2025/comstock_amy2018_release_3";

export const COMSTOCK_RELEASE_ARTIFACTS = Object.freeze({
  dataDictionary: Object.freeze({
    artifactId: "artifact:comstock-2025-release-3-data-dictionary",
    fileName: "comstock-data-dictionary.tsv",
    sourceUrl: `${COMSTOCK_RELEASE_ROOT}/data_dictionary.tsv`,
    mediaType: "text/tab-separated-values",
    byteSize: 250000,
    sha256: "11c03e4794ed12c5d8fc81c1253d97c033f217c79cc217e00110052b2d23ea4b"
  }),
  enumerationDictionary: Object.freeze({
    artifactId: "artifact:comstock-2025-release-3-enumeration-dictionary",
    fileName: "comstock-enumeration-dictionary.tsv",
    sourceUrl: `${COMSTOCK_RELEASE_ROOT}/enumeration_dictionary.tsv`,
    mediaType: "text/tab-separated-values",
    byteSize: 30953,
    sha256: "0d721355dc3f1cee2f42e6db750c0de2daef1773404bab3125d1bda1960e007e"
  }),
  measureCrosswalk: Object.freeze({
    artifactId: "artifact:comstock-2025-release-3-measure-crosswalk",
    fileName: "comstock-measure-name-crosswalk.csv",
    sourceUrl: `${COMSTOCK_RELEASE_ROOT}/measure_name_crosswalk.csv`,
    mediaType: "text/csv",
    byteSize: 20900,
    sha256: "cf87e5905df7291b4d2bbbd9491ad3f0cde55b3e5e43298308c429c9454b4462"
  }),
  upgradesLookup: Object.freeze({
    artifactId: "artifact:comstock-2025-release-3-upgrades",
    fileName: "comstock-upgrades.json",
    sourceUrl: COMSTOCK_UPGRADES_URL,
    mediaType: "application/json",
    byteSize: COMSTOCK_UPGRADES_ARTIFACT.byteSize,
    sha256: COMSTOCK_UPGRADES_ARTIFACT.sha256
  }),
  baselineParquet: Object.freeze({
    artifactId:
      "artifact:comstock-2025-release-3-ca-g0600750-upgrade-0",
    fileName: "comstock-ca-g0600750-upgrade0.parquet",
    sourceUrl:
      `${COMSTOCK_RELEASE_ROOT}/metadata_and_annual_results/by_state_and_county/full/parquet/state=CA/county=G0600750/CA_G0600750_upgrade0.parquet`,
    mediaType: "application/vnd.apache.parquet",
    byteSize: 16866929,
    sha256: "df4d4e40099a4c73f128fcc621cfc5b7facc6eb621e13eddf21a43bc87afdc40"
  }),
  upgradeParquet: Object.freeze({
    artifactId:
      "artifact:comstock-2025-release-3-ca-g0600750-upgrade-43",
    fileName: "comstock-ca-g0600750-upgrade43.parquet",
    sourceUrl:
      `${COMSTOCK_RELEASE_ROOT}/metadata_and_annual_results/by_state_and_county/full/parquet/state=CA/county=G0600750/CA_G0600750_upgrade43.parquet`,
    mediaType: "application/vnd.apache.parquet",
    byteSize: 19572532,
    sha256: "1c658e2a59a83f24f55fab04187cd0cde6546c6bf5e43dc8beb456479403dbde"
  })
});

export const COMSTOCK_REQUIRED_PARQUET_FIELDS = Object.freeze({
  applicability: "BOOLEAN",
  bldg_id: "BIGINT",
  completed_status: "VARCHAR",
  dataset: "VARCHAR",
  "in.comstock_building_type": "VARCHAR",
  "in.county_name": "VARCHAR",
  "in.sqft..ft2": "DOUBLE",
  "in.state": "VARCHAR",
  "out.electricity.total.energy_consumption..kwh": "DOUBLE",
  upgrade: "BIGINT",
  weight: "DOUBLE"
});

const DATA_DICTIONARY_REQUIREMENTS = Object.freeze({
  applicability: Object.freeze({
    data_type: "boolean",
    units: ""
  }),
  bldg_id: Object.freeze({
    data_type: "integer",
    units: ""
  }),
  completed_status: Object.freeze({
    data_type: "string",
    units: ""
  }),
  "in.comstock_building_type": Object.freeze({
    data_type: "string",
    units: ""
  }),
  "in.county_name": Object.freeze({
    data_type: "string",
    units: ""
  }),
  "in.sqft": Object.freeze({
    data_type: "float",
    units: "ft2"
  }),
  "in.state": Object.freeze({
    data_type: "string",
    units: ""
  }),
  "out.electricity.total.energy_consumption": Object.freeze({
    data_type: "float",
    units: "kwh"
  }),
  upgrade: Object.freeze({
    data_type: "string",
    units: ""
  }),
  weight: Object.freeze({
    data_type: "float",
    units: ""
  })
});

const CROSSWALK_REQUIRED_HEADERS = Object.freeze([
  "measure_id",
  "measure_documentation_name",
  "public_repo_measure_folder_name",
  "2025_comstock_amy2018_release_3_upgrade_id",
  "2025_comstock_amy2018_release_3_upgrade_name"
]);

function parseTsv(source) {
  const [headerLine, ...lines] = source
    .replaceAll("\r\n", "\n")
    .split("\n");
  if (!headerLine) {
    throw new Error("EMPTY_SOURCE_ARTIFACT: TSV has no header");
  }
  const headers = headerLine.split("\t");
  const records = [];
  for (const line of lines) {
    if (!line) {
      continue;
    }
    const values = line.split("\t");
    if (values.length !== headers.length) {
      throw new Error(
        `SOURCE_SCHEMA_DRIFT: TSV expected ${headers.length} columns, received ${values.length}`
      );
    }
    records.push(
      Object.fromEntries(
        headers.map((header, index) => [header, values[index]])
      )
    );
  }
  return {
    headers,
    records
  };
}

function normalizeHeader(value) {
  return value.replace(/^\uFEFF/, "");
}

async function readMeasureCrosswalk(path) {
  const records = [];
  for await (const record of parseCsvRecords(
    await readFile(path, "utf8"),
    {
      requiredHeaders: CROSSWALK_REQUIRED_HEADERS,
      transformHeader: normalizeHeader
    }
  )) {
    records.push(record);
  }
  const ledRows = records.filter(
    (record) =>
      record.measure_id === "ltg_0001" &&
      record.measure_documentation_name === "LED Lighting" &&
      record["2025_comstock_amy2018_release_3_upgrade_id"] === "43" &&
      record["2025_comstock_amy2018_release_3_upgrade_name"] ===
        "LED Lighting"
  );
  if (ledRows.length !== 1) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: expected one Release 3 ltg_0001 to upgrade 43 crosswalk, received ${ledRows.length}`
    );
  }
  return {
    headers: Object.keys(records[0] ?? {}),
    recordCount: records.length,
    selectedMeasure: {
      measureId: "ltg_0001",
      measureName: "LED Lighting",
      sourceFolder: ledRows[0].public_repo_measure_folder_name,
      upgradeId: 43,
      upgradeName: "LED Lighting"
    }
  };
}

function quoteSqlLiteral(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

async function queryRows(connection, sql) {
  const result = await connection.run(sql);
  return result.getRowObjects();
}

export function assertRequiredComstockParquetSchema(columns, label) {
  const observed = new Map(
    columns.map(({ columnName, columnType }) => [
      columnName,
      columnType
    ])
  );
  for (const [name, expectedType] of Object.entries(
    COMSTOCK_REQUIRED_PARQUET_FIELDS
  )) {
    if (!observed.has(name)) {
      throw new Error(
        `MISSING_REQUIRED_COLUMN: ${label} ${name}`
      );
    }
    if (observed.get(name) !== expectedType) {
      throw new Error(
        `SOURCE_SCHEMA_DRIFT: ${label} ${name} expected ${expectedType}, received ${observed.get(name)}`
      );
    }
  }
}

function assertDataDictionary(records) {
  const byName = new Map(
    records.map((record) => [record.field_name, record])
  );
  for (const [name, expected] of Object.entries(
    DATA_DICTIONARY_REQUIREMENTS
  )) {
    const record = byName.get(name);
    if (!record) {
      throw new Error(
        `MISSING_REQUIRED_COLUMN: data dictionary ${name}`
      );
    }
    if (
      record.data_type !== expected.data_type ||
      record.units !== expected.units
    ) {
      throw new Error(
        `INCOMPATIBLE_UNIT_OR_VALUE: data dictionary ${name} expected ${expected.data_type}/${expected.units || "unitless"}, received ${record.data_type}/${record.units || "unitless"}`
      );
    }
  }
}

async function inspectParquet(connection, path, expectedUpgradeId) {
  const quotedPath = quoteSqlLiteral(path);
  const columns = (
    await queryRows(
      connection,
      `DESCRIBE SELECT * FROM read_parquet(${quotedPath})`
    )
  ).map((row) => ({
    columnName: row.column_name,
    columnType: row.column_type
  }));
  assertRequiredComstockParquetSchema(
    columns,
    `ComStock upgrade ${expectedUpgradeId} Parquet`
  );
  const [summary] = await queryRows(
    connection,
    `
      SELECT
        count(*) AS row_count,
        count(DISTINCT (bldg_id, weight)) AS distinct_pair_keys,
        min(upgrade) AS minimum_upgrade,
        max(upgrade) AS maximum_upgrade,
        count(DISTINCT dataset) AS dataset_count,
        min(dataset) AS dataset,
        count(*) FILTER (
          WHERE completed_status = 'Success'
        ) AS successful_rows,
        count(*) FILTER (
          WHERE applicability
        ) AS applicable_rows
      FROM read_parquet(${quotedPath})
    `
  );
  if (
    Number(summary.minimum_upgrade) !== expectedUpgradeId ||
    Number(summary.maximum_upgrade) !== expectedUpgradeId
  ) {
    throw new Error(
      `MIXED_RELEASES: expected only ComStock upgrade ${expectedUpgradeId}`
    );
  }
  if (Number(summary.dataset_count) !== 1) {
    throw new Error(
      `MIXED_RELEASES: expected one ComStock dataset label, received ${summary.dataset_count}`
    );
  }
  return {
    columns,
    rowCount: Number(summary.row_count),
    distinctPairKeys: Number(summary.distinct_pair_keys),
    dataset: summary.dataset,
    successfulRows: Number(summary.successful_rows),
    applicableRows: Number(summary.applicable_rows)
  };
}

export function assertComstockReleaseCompatibility(
  baseline,
  upgrade
) {
  if (
    baseline.dataset !== upgrade.dataset ||
    baseline.rowCount !== upgrade.rowCount
  ) {
    throw new Error(
      "MIXED_RELEASES: baseline and upgrade dataset labels or populations differ"
    );
  }
}

function parseUpgradeId(value) {
  if (!/^(0|[1-9]\d*)$/.test(value)) {
    throw new Error(`SOURCE_SCHEMA_DRIFT: invalid ComStock upgrade id ${value}`);
  }
  return Number(value);
}

export function parseComstockUpgradesLookup(source) {
  let parsed;
  try {
    parsed = JSON.parse(source);
  } catch (error) {
    throw new Error(`SOURCE_SCHEMA_DRIFT: invalid ComStock JSON: ${error.message}`);
  }
  if (
    parsed === null ||
    typeof parsed !== "object" ||
    Array.isArray(parsed)
  ) {
    throw new Error("SOURCE_SCHEMA_DRIFT: ComStock lookup must be a JSON object");
  }

  const records = Object.entries(parsed).map(([nativeId, name]) => {
    if (typeof name !== "string" || !name.trim()) {
      throw new Error(
        `SOURCE_SCHEMA_DRIFT: ComStock upgrade ${nativeId} has no name`
      );
    }
    return {
      upgradeId: parseUpgradeId(nativeId),
      upgradeName: name
    };
  });
  records.sort((left, right) => left.upgradeId - right.upgradeId);
  if (!records.length) {
    throw new Error("SOURCE_SCHEMA_DRIFT: ComStock lookup is empty");
  }
  records.forEach((record, index) => {
    if (record.upgradeId !== index) {
      throw new Error(
        `SOURCE_SCHEMA_DRIFT: expected ComStock upgrade id ${index}, received ${record.upgradeId}`
      );
    }
  });
  if (records[0].upgradeName !== "Baseline") {
    throw new Error("SOURCE_SCHEMA_DRIFT: ComStock upgrade 0 is not Baseline");
  }
  const duplicateNames = records
    .map((record) => record.upgradeName)
    .filter((name, index, names) => names.indexOf(name) !== index);
  if (duplicateNames.length) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: duplicate ComStock upgrade name ${duplicateNames[0]}`
    );
  }
  return records;
}

export async function inspectComstockUpgradesLookup(artifactPath) {
  assertNetworkDisabled();
  const artifact = await verifyArtifact(
    artifactPath,
    COMSTOCK_UPGRADES_ARTIFACT
  );
  const records = parseComstockUpgradesLookup(
    await readFile(artifactPath, "utf8")
  );
  const observedSchema = {
    format: "JSON_OBJECT_ENUMERATION",
    rootType: "object",
    nativeKey: {
      name: "upgrade_id",
      representation: "JSON object key",
      type: "non-negative integer encoded as a decimal string"
    },
    nativeValue: {
      name: "upgrade_name",
      representation: "JSON object value",
      type: "non-empty string"
    },
    recordCount: records.length,
    firstUpgradeId: records[0].upgradeId,
    lastUpgradeId: records.at(-1).upgradeId,
    enumeration: records.map((record) => ({
      id: record.upgradeId,
      name: record.upgradeName
    }))
  };
  return {
    artifact,
    records,
    observedSchema,
    schemaFingerprintSha256: sha256Json(observedSchema)
  };
}

export async function inspectComstockRelease({
  dataDictionaryPath,
  enumerationDictionaryPath,
  measureCrosswalkPath,
  upgradesLookupPath,
  baselineParquetPath,
  upgradeParquetPath
}) {
  assertNetworkDisabled();
  const paths = {
    dataDictionary: dataDictionaryPath,
    enumerationDictionary: enumerationDictionaryPath,
    measureCrosswalk: measureCrosswalkPath,
    upgradesLookup: upgradesLookupPath,
    baselineParquet: baselineParquetPath,
    upgradeParquet: upgradeParquetPath
  };
  const artifacts = Object.fromEntries(
    await Promise.all(
      Object.entries(paths).map(async ([key, path]) => [
        key,
        {
          ...COMSTOCK_RELEASE_ARTIFACTS[key],
          ...(await verifyArtifact(
            path,
            COMSTOCK_RELEASE_ARTIFACTS[key]
          ))
        }
      ])
    )
  );

  const dataDictionary = parseTsv(
    await readFile(dataDictionaryPath, "utf8")
  );
  if (
    JSON.stringify(dataDictionary.headers) !==
    JSON.stringify([
      "field_name",
      "field_location",
      "data_type",
      "units",
      "field_description",
      "allowable_enumeration",
      "in_full_metadata_file",
      "in_basic_metadata_file"
    ])
  ) {
    throw new Error(
      "SOURCE_SCHEMA_DRIFT: unexpected ComStock data dictionary headers"
    );
  }
  assertDataDictionary(dataDictionary.records);

  const enumerationDictionary = parseTsv(
    await readFile(enumerationDictionaryPath, "utf8")
  );
  if (
    JSON.stringify(enumerationDictionary.headers) !==
      JSON.stringify([
        "enumeration",
        "enumeration_description"
      ]) ||
    enumerationDictionary.records.length === 0
  ) {
    throw new Error(
      "SOURCE_SCHEMA_DRIFT: unexpected ComStock enumeration dictionary"
    );
  }

  const upgrades = await inspectComstockUpgradesLookup(
    upgradesLookupPath
  );
  const selectedUpgrade = upgrades.records.find(
    (record) =>
      record.upgradeId === 43 &&
      record.upgradeName === "LED Lighting"
  );
  if (!selectedUpgrade) {
    throw new Error(
      "SOURCE_SCHEMA_DRIFT: Release 3 upgrade 43 is not LED Lighting"
    );
  }
  const measureCrosswalk = await readMeasureCrosswalk(
    measureCrosswalkPath
  );

  const instance = await DuckDBInstance.create(":memory:");
  const connection = await instance.connect();
  let baselineParquet;
  let upgradeParquet;
  try {
    baselineParquet = await inspectParquet(
      connection,
      baselineParquetPath,
      0
    );
    upgradeParquet = await inspectParquet(
      connection,
      upgradeParquetPath,
      43
    );
    assertComstockReleaseCompatibility(
      baselineParquet,
      upgradeParquet
    );
  } finally {
    connection.closeSync();
  }

  const observedSchema = {
    format: "COMSTOCK_RELEASE_BUNDLE",
    release: COMSTOCK_RELEASE,
    nativeDatasetLabel: baselineParquet.dataset,
    dataDictionary: {
      headers: dataDictionary.headers,
      recordCount: dataDictionary.records.length,
      requiredFields: DATA_DICTIONARY_REQUIREMENTS
    },
    enumerationDictionary: {
      headers: enumerationDictionary.headers,
      recordCount: enumerationDictionary.records.length
    },
    measureCrosswalk,
    upgradesLookup: upgrades.observedSchema,
    baselineParquet,
    upgradeParquet
  };
  return {
    artifacts,
    selectedUpgrade,
    measureCrosswalk,
    observedSchema,
    schemaFingerprintSha256: sha256Json(observedSchema)
  };
}
