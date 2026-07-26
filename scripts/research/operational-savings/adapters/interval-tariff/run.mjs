import { readFile } from "node:fs/promises";
import { basename } from "node:path";

import parsePdf from "pdf-parse";

import {
  assertNetworkDisabled,
  sha256Json,
  verifyArtifact
} from "../../lib/artifact.mjs";
import { upsertSourceProof } from "../../lib/sqlite.mjs";
import {
  inspectUrdbArtifact,
  SELECTED_RATE_ID
} from "./inspect-schema.mjs";

export const SDGE_SMALL_COMMERCIAL_ARTIFACT = Object.freeze({
  byteSize: 403420,
  sha256: "1d2474baa2c253e803c5966fa30a8c58f8ee88e0d338a006df3c8f47a49c0cf9"
});

export const SDGE_JOINT_COMPARISON_ARTIFACT = Object.freeze({
  byteSize: 543670,
  sha256: "bfde9c41b8daed07eeb293a1e5ac6348f2a290ae1de022b34a7c5055a858e89e"
});

const URDB_URL =
  "https://openei.org/apps/USURDB/download/usurdb.csv.gz";
const SDGE_PUBLICATION_URL =
  "https://www.sdge.com/sites/default/files/regulatory/Summary%20Table%20for%20Small%20Comm%206-1-26.pdf";
const JOINT_COMPARISON_URL =
  "https://sdge.com/sites/default/files/SDCP_SDGE_JRC_06.01.2026_Final.pdf";
const SOURCE_ID = "source:interval-tariff-composite-proof";
const URDB_RELEASE_ID = "release:usurdb:2026-07-23";
const URDB_ARTIFACT_ID = "artifact:usurdb:2026-07-23";
const SDGE_RELEASE_ID = "release:sdge-small-commercial:2026-06-01";
const SDGE_ARTIFACT_ID =
  "artifact:sdge-small-commercial-rates:2026-06-01";
const JOINT_RELEASE_ID = "release:sdge-sdcp-jrc:2026-06-01";
const JOINT_ARTIFACT_ID = "artifact:sdge-sdcp-jrc:2026-06-01";
const ADAPTER_PATH =
  "scripts/research/operational-savings/adapters/interval-tariff/run.mjs";

export const INTERVAL_TARIFF_RELEASE_IDS = Object.freeze({
  urdb: URDB_RELEASE_ID,
  controllingPublication: SDGE_RELEASE_ID,
  officialComparison: JOINT_RELEASE_ID
});

export const INTERVAL_TARIFF_ARTIFACT_IDS = Object.freeze({
  urdb: URDB_ARTIFACT_ID,
  controllingPublication: SDGE_ARTIFACT_ID,
  officialComparison: JOINT_ARTIFACT_ID
});

const PERIOD_METADATA = Object.freeze([
  {
    periodIndex: 0,
    season: "Summer",
    periodName: "On-Peak",
    months: [6, 7, 8, 9, 10]
  },
  {
    periodIndex: 1,
    season: "Summer",
    periodName: "Off-Peak",
    months: [6, 7, 8, 9, 10]
  },
  {
    periodIndex: 2,
    season: "Winter",
    periodName: "On-Peak",
    months: [1, 2, 3, 4, 5, 11, 12]
  },
  {
    periodIndex: 3,
    season: "Winter",
    periodName: "Off-Peak",
    months: [1, 2, 3, 4, 5, 11, 12]
  }
]);

function prices(line, label) {
  const values = [...line.matchAll(/\$([\d,]+(?:\.\d+)?)/g)].map(
    (match) => Number(match[1].replaceAll(",", ""))
  );
  if (!values.length || values.some((value) => !Number.isFinite(value))) {
    throw new Error(`SOURCE_SCHEMA_DRIFT: missing numeric values for ${label}`);
  }
  return values;
}

function exactLineIndex(lines, value, start = 0) {
  const index = lines.findIndex(
    (line, candidate) => candidate >= start && line === value
  );
  if (index < 0) {
    throw new Error(`SOURCE_SCHEMA_DRIFT: missing ${value}`);
  }
  return index;
}

export function parseSmallCommercialPublication(text, pageCount = 5) {
  if (pageCount !== 5) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: expected 5 SDG&E rate pages, received ${pageCount}`
    );
  }
  if (
    !text.includes("Available Rates for Small Commercial Customers") ||
    !text.includes("(Effective 6/1/26)") ||
    !text.includes("(SCHEDULE TOU-A)") ||
    !text.includes(
      "Maximum Monthly Demand equals, exceeds, or is"
    )
  ) {
    throw new Error(
      "SOURCE_SCHEMA_DRIFT: current SDG&E TOU-A identity or eligibility text is missing"
    );
  }
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const feeLine = lines.find((line) => line.startsWith("5-20 kW$19.23"));
  if (!feeLine || prices(feeLine, "5-20 kW basic service fee")[0] !== 19.23) {
    throw new Error(
      "SOURCE_SCHEMA_DRIFT: TOU-A 5-20 kW basic service fee changed"
    );
  }
  const summerIndex = exactLineIndex(
    lines,
    "Summer (June 1 - October 31)"
  );
  const summerOn = prices(lines[summerIndex + 1], "summer on-peak");
  const summerOff = prices(lines[summerIndex + 2], "summer off-peak");
  const winterIndex = exactLineIndex(
    lines,
    "Winter (November 1 - May 31)",
    summerIndex + 1
  );
  const winterOn = prices(lines[winterIndex + 1], "winter on-peak");
  const winterOff = prices(lines[winterIndex + 2], "winter off-peak");
  const rows = [
    ["Summer", "On-Peak", summerOn],
    ["Summer", "Off-Peak", summerOff],
    ["Winter", "On-Peak", winterOn],
    ["Winter", "Off-Peak", winterOff]
  ].map(([season, periodName, values], periodIndex) => {
    if (values.length !== 9) {
      throw new Error(
        `SOURCE_SCHEMA_DRIFT: ${season} ${periodName} has ${values.length} rates instead of 9`
      );
    }
    const [
      totalUdcRate,
      nonBypassableRate,
      commodityRate,
      totalElectricRate
    ] = values;
    const recomputed =
      totalUdcRate + nonBypassableRate + commodityRate;
    if (Math.abs(recomputed - totalElectricRate) > 1e-9) {
      throw new Error(
        `INCOMPATIBLE_TARIFF_COMPONENTS: ${season} ${periodName} does not sum to its total`
      );
    }
    return {
      periodIndex,
      season,
      periodName,
      totalUdcRate,
      nonBypassableRate,
      commodityRate,
      totalElectricRate,
      unit: "$/kWh",
      sourcePage: 1
    };
  });
  return {
    effectiveDate: "2026-06-01",
    schedule: "TOU-A",
    sector: "Commercial",
    voltageCategory: "Secondary",
    fixedCharge: 19.23,
    fixedChargeUnit: "$/month",
    eligibility: {
      normalMaximumMonthlyDemandKwExclusive: 20,
      exceptionalDemandKw: 200,
      exceptionalMonthsWithinTwelve: 2
    },
    rows
  };
}

function firstPriceAfter(lines, label, startIndex) {
  const index = exactLineIndex(lines, label, startIndex);
  return prices(lines[index + 1], label)[0];
}

export function parseJointRateComparison(text, pageCount = 18) {
  if (pageCount !== 18) {
    throw new Error(
      `SOURCE_SCHEMA_DRIFT: expected 18 joint comparison pages, received ${pageCount}`
    );
  }
  const start = text.indexOf("SMALL COMMERCIAL");
  const end = text.indexOf(
    "Time-of  -Use –   TOU-A -Commercial (Primary Voltage)",
    start
  );
  if (start < 0 || end < 0) {
    throw new Error(
      "SOURCE_SCHEMA_DRIFT: small-commercial TOU-A secondary comparison is missing"
    );
  }
  const block = text.slice(start, end);
  if (
    !block.includes("Commercial: TOU-A") ||
    !block.includes("(Secondary)")
  ) {
    throw new Error(
      "SOURCE_SCHEMA_DRIFT: TOU-A secondary identity is missing"
    );
  }
  const lines = block
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const commercialIndex = exactLineIndex(lines, "Commercial: TOU-A");
  const generationRate = firstPriceAfter(
    lines,
    "Generation Rate ($/kWh)",
    commercialIndex
  );
  const pciaRate = firstPriceAfter(lines, "PCIA ($/kWh)", commercialIndex);
  const deliveryRate = firstPriceAfter(
    lines,
    "SDG&E Delivery Rate ($/kWh)",
    commercialIndex
  );
  const franchiseFees = firstPriceAfter(
    lines,
    "Franchise Fees ($/%)",
    commercialIndex
  );
  const averageRate = firstPriceAfter(
    lines,
    "Total Electricity Cost ($/kWh)",
    commercialIndex
  );
  const expectedBill = firstPriceAfter(
    lines,
    "Average Monthly Bill ($)",
    commercialIndex
  );
  const usageMatch = block.match(
    /Average Monthly Usage:\s*([\d,]+)\s*kWh/
  );
  const demandMatch = block.match(
    /Average Monthly Demand:\s*([\d.]+)\s*kW/i
  );
  if (!usageMatch || !demandMatch) {
    throw new Error(
      "SOURCE_SCHEMA_DRIFT: representative usage or demand is missing"
    );
  }
  const usageKwh = Number(usageMatch[1].replaceAll(",", ""));
  const demandKw = Number(demandMatch[1]);
  const componentSum =
    generationRate + pciaRate + deliveryRate + franchiseFees;
  if (Math.abs(componentSum - averageRate) > 1e-9) {
    throw new Error(
      "INCOMPATIBLE_TARIFF_COMPONENTS: joint comparison components do not sum"
    );
  }
  const calculatedBill = averageRate * usageKwh;
  const tolerance = 0.01;
  if (Math.abs(calculatedBill - expectedBill) > tolerance) {
    throw new Error(
      `OFFICIAL_RECONCILIATION_FAILED: expected ${expectedBill}, calculated ${calculatedBill}`
    );
  }
  return {
    schedule: "TOU-A",
    sector: "Commercial",
    voltageCategory: "Secondary",
    effectiveDate: "2026-06-01",
    usageKwh,
    demandKw,
    generationRate,
    pciaRate,
    deliveryRate,
    franchiseFees,
    averageRate,
    expectedBill,
    calculatedBill,
    tolerance,
    status: "PASSED",
    sourcePage: 10
  };
}

function sourceIdentity() {
  return {
    id: SOURCE_ID,
    standardId: "STD-INTERVAL-TARIFF",
    organization:
      "National Laboratory of the Rockies, OpenEI, San Diego Gas & Electric, and San Diego Community Power",
    name: "URDB plus current controlling utility publications",
    primaryUrl: URDB_URL,
    license:
      "URDB artifact is CC BY 4.0 unless noted; utility publications retain their posted terms",
    attribution:
      "OpenEI Utility Rate Database, SDG&E, and San Diego Community Power",
    accessMode: "PUBLIC_BULK_AND_PUBLIC_PDF"
  };
}

function publicationProof({
  schemaId,
  schemaKind,
  schema,
  releaseId,
  version,
  publishedAt,
  acquiredAt,
  artifactId,
  sourceUrl,
  artifact,
  mediaType,
  ingestionId,
  recordsRead,
  recordsWritten
}) {
  return {
    source: sourceIdentity(),
    schema: {
      id: schemaId,
      fingerprintSha256: sha256Json(schema),
      kind: schemaKind,
      observed: schema,
      inspectedAt: acquiredAt
    },
    release: {
      id: releaseId,
      version,
      publishedAt,
      acquiredAt,
      status: "PUBLISHED"
    },
    artifact: {
      id: artifactId,
      sourceUrl,
      localName: basename(artifact.path),
      mediaType,
      byteSize: artifact.byteSize,
      sha256: artifact.sha256
    },
    ingestion: {
      id: ingestionId,
      adapterVersion: "interval-tariff-v1",
      startedAt: acquiredAt,
      finishedAt: acquiredAt,
      status: "SUCCEEDED",
      recordsRead,
      recordsWritten,
      warningCount: 0
    }
  };
}

function periodPublicationRow(publication, periodIndex) {
  const row = publication.rows.find(
    (candidate) => candidate.periodIndex === periodIndex
  );
  if (!row) {
    throw new Error(
      `MISSING_TARIFF_TERM: publication period ${periodIndex}`
    );
  }
  return row;
}

function validateCompositeRelease(selectedTariff, publication, comparison) {
  if (
    selectedTariff.startDate !== publication.effectiveDate ||
    selectedTariff.startDate !== comparison.effectiveDate
  ) {
    throw new Error(
      "MIXED_RELEASES: URDB, controlling rate summary, and comparison effective dates differ"
    );
  }
  if (
    selectedTariff.fixedCharge !== publication.fixedCharge ||
    selectedTariff.fixedChargeUnit !== publication.fixedChargeUnit
  ) {
    throw new Error(
      "MIXED_RELEASES: URDB and controlling publication fixed charges differ"
    );
  }
  for (const tier of selectedTariff.structures.energy) {
    if (tier.tierIndex !== 0) continue;
    const published = periodPublicationRow(
      publication,
      tier.periodIndex
    );
    if (
      Math.abs(tier.rate - published.totalUdcRate) > 1e-9 ||
      Math.abs(tier.adj - published.commodityRate) > 1e-9 ||
      tier.unit !== "kWh"
    ) {
      throw new Error(
        `MIXED_RELEASES: URDB period ${tier.periodIndex} differs from the controlling publication`
      );
    }
  }
}

export function intervalTariffReleaseScopedId(
  sourceReleaseId,
  kind,
  identity
) {
  if (
    typeof sourceReleaseId !== "string" ||
    sourceReleaseId.length === 0 ||
    typeof kind !== "string" ||
    !/^[a-z0-9-]+$/.test(kind)
  ) {
    throw new Error(
      "INVALID_RELEASE_SCOPED_ID: source release and kind are required"
    );
  }
  return `interval-tariff:${kind}:${sha256Json({
    sourceReleaseId,
    identity
  }).slice(0, 20)}`;
}

function insertPublicationComponents(
  database,
  publication,
  {
    tariffId,
    sourceReleaseId,
    sourceArtifactId
  }
) {
  const insert = database.prepare(`
    INSERT INTO tariff_publication_components (
      id, tariff_id, source_artifact_id, season, period_name,
      voltage_category, component_name, rate, unit, effective_date,
      source_page, native_label
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      rate = excluded.rate,
      native_label = excluded.native_label
  `);
  const components = [
    ["total_udc", "totalUdcRate", "Total UDC Rate"],
    [
      "non_bypassable",
      "nonBypassableRate",
      "WF-NBC + DWR-BC"
    ],
    ["commodity", "commodityRate", "EECC"],
    ["total_electric", "totalElectricRate", "Total Electric Rate"]
  ];
  for (const row of publication.rows) {
    for (const [componentName, field, nativeLabel] of components) {
      insert.run(
        intervalTariffReleaseScopedId(
          sourceReleaseId,
          "publication-component",
          {
            tariffId,
            periodIndex: row.periodIndex,
            componentName
          }
        ),
        tariffId,
        sourceArtifactId,
        row.season,
        row.periodName,
        publication.voltageCategory,
        componentName,
        row[field],
        row.unit,
        publication.effectiveDate,
        row.sourcePage,
        nativeLabel
      );
    }
  }
}

export function publishIntervalTariffNormalizedRelease(
  database,
  {
    selectedTariff,
    publication,
    comparison,
    sourceReleaseIds = INTERVAL_TARIFF_RELEASE_IDS,
    sourceArtifactIds = INTERVAL_TARIFF_ARTIFACT_IDS
  }
) {
  validateCompositeRelease(
    selectedTariff,
    publication,
    comparison
  );
  for (const role of Object.keys(INTERVAL_TARIFF_RELEASE_IDS)) {
    const artifact = database.prepare(`
      SELECT release_id AS releaseId
      FROM source_artifacts
      WHERE id = ?
    `).get(sourceArtifactIds[role]);
    if (
      !artifact ||
      artifact.releaseId !== sourceReleaseIds[role]
    ) {
      throw new Error(
        `RELEASE_LINEAGE_MISMATCH: ${role} artifact does not belong to its declared release`
      );
    }
  }

  const selected = selectedTariff;
  const utilityId = intervalTariffReleaseScopedId(
    sourceReleaseIds.urdb,
    "utility",
    {
      nativeUtilityId: String(selected.eiaId)
    }
  );
  const tariffId = intervalTariffReleaseScopedId(
    sourceReleaseIds.urdb,
    "tariff",
    {
      nativeRateId: selected.nativeRateId
    }
  );
  const periodIds = [];
  const energyChargeIds = [];
  const demandChargeIds = [];
  const publicationComponentIds = [];

  database.exec("BEGIN IMMEDIATE");
  try {
    database.prepare(`
      INSERT INTO utility_providers (
        id, source_release_id, native_utility_id,
        name, state, eia_id
      ) VALUES (?, ?, ?, ?, 'CA', ?)
      ON CONFLICT(id) DO UPDATE SET
        name = excluded.name,
        eia_id = excluded.eia_id
    `).run(
      utilityId,
      sourceReleaseIds.urdb,
      selected.eiaId,
      selected.utility,
      selected.eiaId
    );
    database.prepare(`
      INSERT INTO utility_tariffs (
        id, source_release_id, native_rate_id, utility_id,
        label, sector, description, service_type,
        voltage_category, peak_kw_min, peak_kw_max,
        fixed_charge, fixed_charge_unit, minimum_charge,
        minimum_charge_unit, start_date, end_date, approved,
        source_url, source_parent_url,
        supersedes_native_rate_id, latest_update,
        eligibility_json
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,
        1, ?, ?, ?, ?, ?
      )
      ON CONFLICT(id) DO UPDATE SET
        latest_update = excluded.latest_update,
        fixed_charge = excluded.fixed_charge,
        eligibility_json = excluded.eligibility_json
    `).run(
      tariffId,
      sourceReleaseIds.urdb,
      selected.nativeRateId,
      utilityId,
      selected.name,
      selected.sector,
      selected.description,
      selected.serviceType,
      selected.voltageCategory,
      selected.peakKwMin,
      selected.peakKwMax,
      selected.fixedCharge,
      selected.fixedChargeUnit,
      selected.minimumCharge,
      selected.minimumChargeUnit,
      selected.startDate,
      selected.endDate,
      selected.sourceUrl,
      selected.sourceParentUrl,
      selected.supersedesNativeRateId,
      selected.latestUpdate,
      JSON.stringify({
        publication: publication.eligibility,
        proofCase: {
          demandKw: comparison.demandKw,
          qualifiesForSelectedBand:
            comparison.demandKw > selected.peakKwMin &&
            comparison.demandKw <= selected.peakKwMax
        }
      })
    );

    const insertPeriod = database.prepare(`
      INSERT INTO tariff_periods (
        id, tariff_id, period_kind, period_index,
        period_name, season_months_json,
        weekday_schedule_json, weekend_schedule_json
      ) VALUES (?, ?, 'ENERGY', ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        period_name = excluded.period_name,
        season_months_json = excluded.season_months_json,
        weekday_schedule_json = excluded.weekday_schedule_json,
        weekend_schedule_json = excluded.weekend_schedule_json
    `);
    const insertEnergy = database.prepare(`
      INSERT INTO tariff_energy_charges (
        id, tariff_id, period_index, tier_index, rate,
        unit, max_usage, adjustment, all_in_rate,
        all_in_rate_source, sell_rate
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        rate = excluded.rate,
        adjustment = excluded.adjustment,
        all_in_rate = excluded.all_in_rate,
        all_in_rate_source = excluded.all_in_rate_source
    `);
    for (const metadata of PERIOD_METADATA) {
      const tier = selected.structures.energy.find(
        (candidate) =>
          candidate.periodIndex === metadata.periodIndex &&
          candidate.tierIndex === 0
      );
      if (!tier) {
        throw new Error(
          `MISSING_TARIFF_TERM: energy period ${metadata.periodIndex}`
        );
      }
      const published = periodPublicationRow(
        publication,
        metadata.periodIndex
      );
      const periodId = intervalTariffReleaseScopedId(
        sourceReleaseIds.urdb,
        "period",
        {
          tariffId,
          periodKind: "ENERGY",
          periodIndex: metadata.periodIndex
        }
      );
      const energyChargeId = intervalTariffReleaseScopedId(
        sourceReleaseIds.urdb,
        "energy-charge",
        {
          tariffId,
          periodIndex: metadata.periodIndex,
          tierIndex: 0
        }
      );
      insertPeriod.run(
        periodId,
        tariffId,
        metadata.periodIndex,
        `${metadata.season} ${metadata.periodName}`,
        JSON.stringify(metadata.months),
        JSON.stringify(selected.weekdaySchedule),
        JSON.stringify(selected.weekendSchedule)
      );
      insertEnergy.run(
        energyChargeId,
        tariffId,
        metadata.periodIndex,
        0,
        tier.rate,
        "$/kWh",
        tier.max ?? null,
        tier.adj,
        published.totalElectricRate,
        sourceArtifactIds.controllingPublication,
        tier.sell ?? null
      );
      periodIds.push(periodId);
      energyChargeIds.push(energyChargeId);
    }

    const insertDemand = database.prepare(`
      INSERT INTO tariff_demand_charges (
        id, tariff_id, charge_kind, period_index,
        tier_index, rate, unit, max_demand, adjustment
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        rate = excluded.rate,
        adjustment = excluded.adjustment
    `);
    for (const [chargeKind, tiers] of [
      ["FLAT", selected.structures.flatDemand],
      ["TOU", selected.structures.demand]
    ]) {
      for (const tier of tiers) {
        const demandChargeId = intervalTariffReleaseScopedId(
          sourceReleaseIds.urdb,
          "demand-charge",
          {
            tariffId,
            chargeKind,
            periodIndex: tier.periodIndex,
            tierIndex: tier.tierIndex
          }
        );
        insertDemand.run(
          demandChargeId,
          tariffId,
          chargeKind,
          tier.periodIndex,
          tier.tierIndex,
          tier.rate ?? null,
          "$/kW",
          tier.max ?? null,
          tier.adj ?? null
        );
        demandChargeIds.push(demandChargeId);
      }
    }

    const exportRuleId = intervalTariffReleaseScopedId(
      sourceReleaseIds.urdb,
      "export-rule",
      { tariffId }
    );
    database.prepare(`
      INSERT INTO tariff_export_rules (
        id, tariff_id, sell_rate, sell_unit,
        net_metering, native_json
      ) VALUES (?, ?, NULL, '$/kWh', ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        native_json = excluded.native_json
    `).run(
      exportRuleId,
      tariffId,
      /Net Metering/i.test(
        selected.distributedGenerationRules
      ) ? 1 : 0,
      JSON.stringify({
        dgrules: selected.distributedGenerationRules,
        conservativeScreeningSellRate: 0,
        restriction:
          "The selected proof is complete only for NO_EXPORT screening because no current sell rate is present in the retained URDB row."
      })
    );

    insertPublicationComponents(
      database,
      publication,
      {
        tariffId,
        sourceReleaseId:
          sourceReleaseIds.controllingPublication,
        sourceArtifactId:
          sourceArtifactIds.controllingPublication
      }
    );
    for (const row of publication.rows) {
      for (const componentName of [
        "total_udc",
        "non_bypassable",
        "commodity",
        "total_electric"
      ]) {
        publicationComponentIds.push(
          intervalTariffReleaseScopedId(
            sourceReleaseIds.controllingPublication,
            "publication-component",
            {
              tariffId,
              periodIndex: row.periodIndex,
              componentName
            }
          )
        );
      }
    }

    const reconciliationId = intervalTariffReleaseScopedId(
      sourceReleaseIds.officialComparison,
      "reconciliation",
      {
        tariffId,
        schedule: comparison.schedule,
        sourcePage: comparison.sourcePage
      }
    );
    database.prepare(`
      INSERT INTO tariff_reconciliation_cases (
        id, tariff_id, source_artifact_id, usage_kwh,
        demand_kw, average_rate_per_kwh, expected_bill,
        calculated_bill, tolerance, status, source_page
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET
        calculated_bill = excluded.calculated_bill,
        status = excluded.status
    `).run(
      reconciliationId,
      tariffId,
      sourceArtifactIds.officialComparison,
      comparison.usageKwh,
      comparison.demandKw,
      comparison.averageRate,
      comparison.expectedBill,
      comparison.calculatedBill,
      comparison.tolerance,
      comparison.status,
      comparison.sourcePage
    );
    database.exec("COMMIT");
    return {
      sourceReleaseIds: { ...sourceReleaseIds },
      sourceArtifactIds: { ...sourceArtifactIds },
      utilityId,
      tariffId,
      periodIds,
      energyChargeIds,
      demandChargeIds,
      exportRuleId,
      publicationComponentIds,
      reconciliationId
    };
  } catch (error) {
    database.exec("ROLLBACK");
    throw error;
  }
}

export async function ingestIntervalTariff({
  urdbArtifactPath,
  sdgePublicationPath,
  jointComparisonPath,
  database
}) {
  assertNetworkDisabled();
  const urdb = await inspectUrdbArtifact(urdbArtifactPath);
  const sdgeArtifact = await verifyArtifact(
    sdgePublicationPath,
    SDGE_SMALL_COMMERCIAL_ARTIFACT
  );
  const comparisonArtifact = await verifyArtifact(
    jointComparisonPath,
    SDGE_JOINT_COMPARISON_ARTIFACT
  );
  const sdgePdf = await parsePdf(await readFile(sdgePublicationPath));
  const comparisonPdf = await parsePdf(await readFile(jointComparisonPath));
  const publication = parseSmallCommercialPublication(
    sdgePdf.text,
    sdgePdf.numpages
  );
  const comparison = parseJointRateComparison(
    comparisonPdf.text,
    comparisonPdf.numpages
  );
  validateCompositeRelease(urdb.selectedTariff, publication, comparison);

  upsertSourceProof(
    database,
    publicationProof({
      schemaId: "schema:usurdb:2026-07-23",
      schemaKind: "GZIP_CSV_HEADER_AND_NESTED_COLUMNS",
      schema: urdb.schema,
      releaseId: URDB_RELEASE_ID,
      version: "bulk snapshot acquired 2026-07-23",
      publishedAt: null,
      acquiredAt: "2026-07-23T00:00:00.000Z",
      artifactId: URDB_ARTIFACT_ID,
      sourceUrl: URDB_URL,
      artifact: urdb.artifact,
      mediaType: "application/gzip",
      ingestionId: "ingestion:usurdb:2026-07-23:v1",
      recordsRead: urdb.recordsRead,
      recordsWritten: 1
    })
  );
  const publicationSchema = {
    format: "PDF_TABLE",
    pages: sdgePdf.numpages,
    fields: [
      { name: "Basic Service Fee", unit: "$/month" },
      { name: "Total UDC Rate", unit: "$/kWh" },
      { name: "WF-NBC + DWR-BC", unit: "$/kWh" },
      { name: "EECC", unit: "$/kWh" },
      { name: "Total Electric Rate", unit: "$/kWh" },
      { name: "Eligibility", unit: "text" }
    ],
    effectiveDate: publication.effectiveDate,
    schedule: publication.schedule
  };
  upsertSourceProof(
    database,
    publicationProof({
      schemaId: "schema:sdge-small-commercial:2026-06-01",
      schemaKind: "PDF_TABLE",
      schema: publicationSchema,
      releaseId: SDGE_RELEASE_ID,
      version: "Effective 2026-06-01",
      publishedAt: "2026-06-01T00:00:00.000Z",
      acquiredAt: "2026-07-24T00:00:00.000Z",
      artifactId: SDGE_ARTIFACT_ID,
      sourceUrl: SDGE_PUBLICATION_URL,
      artifact: sdgeArtifact,
      mediaType: "application/pdf",
      ingestionId: "ingestion:sdge-small-commercial:2026-06-01:v1",
      recordsRead: publication.rows.length,
      recordsWritten: publication.rows.length
    })
  );
  const comparisonSchema = {
    format: "PDF_WORKED_COMPARISON",
    pages: comparisonPdf.numpages,
    fields: [
      { name: "Generation Rate", unit: "$/kWh" },
      { name: "PCIA", unit: "$/kWh" },
      { name: "SDG&E Delivery Rate", unit: "$/kWh" },
      { name: "Franchise Fees", unit: "$/kWh" },
      { name: "Total Electricity Cost", unit: "$/kWh" },
      { name: "Average Monthly Bill", unit: "$/month" },
      { name: "Average Monthly Usage", unit: "kWh/month" },
      { name: "Average Monthly Demand", unit: "kW" }
    ],
    effectiveDate: comparison.effectiveDate,
    schedule: comparison.schedule
  };
  upsertSourceProof(
    database,
    publicationProof({
      schemaId: "schema:sdge-sdcp-jrc:2026-06-01",
      schemaKind: "PDF_WORKED_COMPARISON",
      schema: comparisonSchema,
      releaseId: JOINT_RELEASE_ID,
      version: "SDG&E rates effective 2026-06-01",
      publishedAt: "2026-06-01T00:00:00.000Z",
      acquiredAt: "2026-07-24T00:00:00.000Z",
      artifactId: JOINT_ARTIFACT_ID,
      sourceUrl: JOINT_COMPARISON_URL,
      artifact: comparisonArtifact,
      mediaType: "application/pdf",
      ingestionId: "ingestion:sdge-sdcp-jrc:2026-06-01:v1",
      recordsRead: 1,
      recordsWritten: 1
    })
  );

  const selected = urdb.selectedTariff;
  const normalized =
    publishIntervalTariffNormalizedRelease(database, {
      selectedTariff: selected,
      publication,
      comparison
    });
  return {
    artifacts: {
      urdb: urdb.artifact,
      controllingPublication: sdgeArtifact,
      officialComparison: comparisonArtifact
    },
    schemas: {
      urdb: urdb.schema,
      controllingPublication: publicationSchema,
      officialComparison: comparisonSchema
    },
    recordsRead: urdb.recordsRead,
    currentCaliforniaCommercialCount:
      urdb.currentCaliforniaCommercialCount,
    selectedTariff: selected,
    publication,
    comparison,
    ...normalized,
    normalizedTargets: [
      "utility_providers",
      "utility_tariffs",
      "tariff_periods",
      "tariff_energy_charges",
      "tariff_demand_charges",
      "tariff_export_rules",
      "tariff_publication_components",
      "tariff_reconciliation_cases"
    ]
  };
}

function requireOne(rows, label) {
  if (!rows.length) throw new Error(`NO_EXACT_MATCH: ${label}`);
  if (rows.length !== 1) throw new Error(`AMBIGUOUS_EXACT_MATCH: ${label}`);
  return rows[0];
}

export function resolveCurrentSmbTariff(
  database,
  {
    utilityName,
    schedule,
    sector,
    asOf,
    demandKw,
    voltageCategory,
    serviceType,
    exportMode,
    sourceReleaseId = URDB_RELEASE_ID
  }
) {
  assertNetworkDisabled();
  if (
    utilityName !== "San Diego Gas & Electric Co" ||
    schedule !== "TOU-A" ||
    sector !== "Commercial" ||
    voltageCategory !== "Secondary" ||
    serviceType !== "Bundled"
  ) {
    throw new Error(
      "NO_EXACT_MATCH: utility, schedule, sector, voltage, and service type"
    );
  }
  if (exportMode !== "NO_EXPORT") {
    throw new Error(
      "SOURCE_UNSUPPORTED: retained current tariff proof has no sell rate, so only NO_EXPORT screening is supported"
    );
  }
  const tariff = requireOne(
    database.prepare(`
      SELECT t.*, u.name AS utility_name, u.eia_id
      FROM utility_tariffs t
      JOIN utility_providers u
        ON u.id = t.utility_id
        AND u.source_release_id = t.source_release_id
      WHERE t.source_release_id = ?
        AND t.native_rate_id = ?
        AND u.name = ?
        AND t.sector = ?
        AND t.voltage_category = ?
        AND t.service_type = ?
        AND date(t.start_date) <= date(?)
        AND (t.end_date IS NULL OR date(t.end_date) >= date(?))
        AND t.approved = 1
    `).all(
      sourceReleaseId,
      SELECTED_RATE_ID,
      utilityName,
      sector,
      voltageCategory,
      serviceType,
      asOf,
      asOf
    ),
    "current approved TOU-A tariff"
  );
  if (
    !Number.isFinite(demandKw) ||
    demandKw <= tariff.peak_kw_min ||
    demandKw > tariff.peak_kw_max
  ) {
    throw new Error(
      `INELIGIBLE_TARIFF: ${demandKw} kW is outside (${tariff.peak_kw_min}, ${tariff.peak_kw_max}]`
    );
  }
  const periods = database.prepare(`
    SELECT
      p.period_index,
      p.period_name,
      p.season_months_json,
      p.weekday_schedule_json,
      p.weekend_schedule_json,
      e.rate,
      e.adjustment,
      e.all_in_rate,
      e.all_in_rate_source,
      e.unit,
      e.max_usage
    FROM tariff_periods p
    JOIN tariff_energy_charges e
      ON e.tariff_id = p.tariff_id
      AND e.period_index = p.period_index
      AND e.tier_index = 0
    WHERE p.tariff_id = ?
      AND p.period_kind = 'ENERGY'
    ORDER BY p.period_index
  `).all(tariff.id);
  if (periods.length !== 4) {
    throw new Error(
      `MISSING_TARIFF_TERM: expected 4 energy periods, found ${periods.length}`
    );
  }
  const publicationComponents = database.prepare(`
    SELECT
      season,
      period_name,
      component_name,
      rate,
      unit,
      effective_date,
      source_page,
      native_label,
      source_artifact_id
    FROM tariff_publication_components
    WHERE tariff_id = ?
    ORDER BY season, period_name, component_name
  `).all(tariff.id);
  if (publicationComponents.length !== 16) {
    throw new Error(
      `MISSING_TARIFF_TERM: expected 16 controlling publication components, found ${publicationComponents.length}`
    );
  }
  const demandCharges = database.prepare(`
    SELECT charge_kind, period_index, tier_index, rate, unit, max_demand, adjustment
    FROM tariff_demand_charges
    WHERE tariff_id = ?
    ORDER BY charge_kind, period_index, tier_index
  `).all(tariff.id);
  const exportRule = requireOne(
    database.prepare(`
      SELECT *
      FROM tariff_export_rules
      WHERE tariff_id = ?
    `).all(tariff.id),
    "tariff export rule"
  );
  const reconciliation = requireOne(
    database.prepare(`
      SELECT *
      FROM tariff_reconciliation_cases
      WHERE tariff_id = ?
        AND status = 'PASSED'
    `).all(tariff.id),
    "official tariff reconciliation"
  );
  const controllingArtifactIds = new Set([
    ...periods.map((period) => period.all_in_rate_source),
    ...publicationComponents.map(
      (component) => component.source_artifact_id
    )
  ]);
  if (
    controllingArtifactIds.size !== 1 ||
    controllingArtifactIds.has(null)
  ) {
    throw new Error(
      "RELEASE_LINEAGE_MISMATCH: tariff rates do not share one controlling publication"
    );
  }
  const controllingArtifactId =
    [...controllingArtifactIds][0];
  const artifactStatement = database.prepare(`
    SELECT
      artifact.id AS artifactId,
      artifact.release_id AS sourceReleaseId,
      artifact.sha256,
      artifact.byte_size AS byteSize,
      release.version AS sourceVersion
    FROM source_artifacts AS artifact
    JOIN source_releases AS release
      ON release.id = artifact.release_id
    WHERE artifact.id = ?
  `);
  const urdbArtifacts = database.prepare(`
    SELECT
      artifact.id AS artifactId,
      artifact.release_id AS sourceReleaseId,
      artifact.sha256,
      artifact.byte_size AS byteSize,
      release.version AS sourceVersion
    FROM source_artifacts AS artifact
    JOIN source_releases AS release
      ON release.id = artifact.release_id
    WHERE artifact.release_id = ?
    ORDER BY artifact.id
  `).all(tariff.source_release_id);
  const urdbArtifact = requireOne(
    urdbArtifacts,
    "URDB source artifact"
  );
  const controllingArtifact = requireOne(
    artifactStatement.all(controllingArtifactId),
    "controlling publication artifact"
  );
  const comparisonArtifact = requireOne(
    artifactStatement.all(reconciliation.source_artifact_id),
    "official comparison artifact"
  );
  const sourceReleaseIds = {
    urdb: urdbArtifact.sourceReleaseId,
    controllingPublication:
      controllingArtifact.sourceReleaseId,
    officialComparison: comparisonArtifact.sourceReleaseId
  };
  const sourceArtifacts = [
    urdbArtifact,
    controllingArtifact,
    comparisonArtifact
  ];
  const tariffInputSet = {
    nativeRateId: tariff.native_rate_id,
    utility: {
      name: tariff.utility_name,
      eiaId: tariff.eia_id
    },
    schedule,
    sector: tariff.sector,
    serviceType: tariff.service_type,
    voltageCategory: tariff.voltage_category,
    effective: {
      startDate: tariff.start_date,
      endDate: tariff.end_date,
      asOf
    },
    eligibility: {
      demandKw,
      peakKwMinExclusive: tariff.peak_kw_min,
      peakKwMaxInclusive: tariff.peak_kw_max,
      sourceRules: JSON.parse(tariff.eligibility_json)
    },
    fixedCharge: {
      value: tariff.fixed_charge,
      unit: tariff.fixed_charge_unit
    },
    minimumCharge:
      tariff.minimum_charge === null
        ? null
        : {
            value: tariff.minimum_charge,
            unit: tariff.minimum_charge_unit
          },
    energyPeriods: periods.map((period) => ({
      periodIndex: period.period_index,
      periodName: period.period_name,
      seasonMonths: JSON.parse(period.season_months_json),
      nativeRate: period.rate,
      nativeAdjustment: period.adjustment,
      allInRate: period.all_in_rate,
      unit: period.unit,
      tierMaximum: period.max_usage,
      controllingArtifactId: period.all_in_rate_source
    })),
    weekdaySchedule: JSON.parse(periods[0].weekday_schedule_json),
    weekendSchedule: JSON.parse(periods[0].weekend_schedule_json),
    demandCharges,
    export: {
      mode: exportMode,
      sellRate: 0,
      sellRateUnit: exportRule.sell_unit,
      sourceSaysNetMetering: Boolean(exportRule.net_metering),
      sourceBoundary: JSON.parse(exportRule.native_json)
    },
    controllingPublication: {
      artifactId: controllingArtifactId,
      components: publicationComponents
    },
    officialReconciliation: {
      artifactId: reconciliation.source_artifact_id,
      usageKwh: reconciliation.usage_kwh,
      demandKw: reconciliation.demand_kw,
      averageRatePerKwh: reconciliation.average_rate_per_kwh,
      expectedBill: reconciliation.expected_bill,
      calculatedBill: reconciliation.calculated_bill,
      tolerance: reconciliation.tolerance,
      status: reconciliation.status,
      sourcePage: reconciliation.source_page
    }
  };
  const provenancePayload = {
    standardId: "STD-INTERVAL-TARIFF",
    artifactSha256: sourceArtifacts.map(
      (artifact) => artifact.sha256
    ),
    sourceVersion: sourceArtifacts
      .map((artifact) => artifact.sourceVersion)
      .join(" plus "),
    sourceFields: [
      "label",
      "utility",
      "name",
      "sector",
      "startdate",
      "peakkwcapacitymin",
      "peakkwcapacitymax",
      "fixedchargefirstmeter",
      "energyratestructure",
      "energyweekdayschedule",
      "energyweekendschedule",
      "Total UDC Rate",
      "WF-NBC + DWR-BC",
      "EECC",
      "Total Electric Rate",
      "Average Monthly Bill",
      "Average Monthly Usage"
    ],
    filters: {
      utilityName,
      schedule,
      sector,
      asOf,
      demandKw,
      voltageCategory,
      serviceType,
      exportMode,
      sourceReleaseId,
      sourceReleaseIds
    },
    transformation:
      "Exact effective-dated URDB selection reconciled field-by-field to the controlling rate summary and official representative comparison",
    adapterPath: ADAPTER_PATH
  };
  return {
    standardId: "STD-INTERVAL-TARIFF",
    sourceReleaseId: tariff.source_release_id,
    sourceReleaseIds,
    values: {
      tariff_input_set: tariffInputSet
    },
    formulaBindings: [
      {
        outputName:
          "One complete tariff input set with exact or conservative-screening provenance",
        formulaTerm: "tariff_input_set",
        value: tariffInputSet,
        unit: "record set",
        scope: "RECORD_SET"
      }
    ],
    provenance: {
      ...provenancePayload,
      artifacts: sourceArtifacts,
      provenanceSha256: sha256Json(provenancePayload)
    }
  };
}

export function recordIntervalTariffFormulaMapping(
  database,
  result,
  categoryId = "ITC-17"
) {
  const identityHash = sha256Json({
    categoryId,
    sourceReleaseIds: result.sourceReleaseIds,
    filters: result.provenance.filters
  }).slice(0, 20);
  const calculationId =
    `calculation:interval-tariff:${categoryId}:${identityHash}`;
  const selectedValueId =
    `${calculationId}:tariff-input-set`;
  const value = result.values.tariff_input_set;
  database.prepare(`
    INSERT INTO calculation_runs (
      id, standard_id, process_key, source_release_id, model_version_id,
      adapter_version, input_sha256, output_sha256, network_disabled,
      status, created_at
    ) VALUES (?, 'STD-INTERVAL-TARIFF', 'interval_tariff', ?, NULL,
      'interval-tariff-v1', ?, ?, 1, 'SUCCEEDED', ?)
    ON CONFLICT(id) DO UPDATE SET
      input_sha256 = excluded.input_sha256,
      output_sha256 = excluded.output_sha256,
      status = excluded.status
  `).run(
    calculationId,
    result.sourceReleaseId,
    sha256Json(result.provenance.filters),
    sha256Json(value),
    "2026-07-24T00:00:00.000Z"
  );
  database.prepare(`
    INSERT INTO selected_values (
      id, calculation_run_id, formula_term, value, value_json, unit, scope,
      selection_rule
    ) VALUES (?, ?, 'tariff_input_set', NULL, ?, 'record set', 'RECORD_SET', ?)
    ON CONFLICT(id) DO UPDATE SET
      value_json = excluded.value_json,
      selection_rule = excluded.selection_rule
  `).run(
    selectedValueId,
    calculationId,
    JSON.stringify(value),
    "Exact utility, schedule, sector, service, voltage, effective date, and demand-band resolution with NO_EXPORT screening"
  );
  database.prepare(`
    INSERT INTO selected_value_provenance (
      selected_value_id, source_artifact_id, source_fields_json,
      filters_json, transformation, adapter_path
    ) VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(selected_value_id) DO UPDATE SET
      source_fields_json = excluded.source_fields_json,
      filters_json = excluded.filters_json,
      transformation = excluded.transformation,
      adapter_path = excluded.adapter_path
  `).run(
    selectedValueId,
    value.controllingPublication.artifactId,
    JSON.stringify(result.provenance.sourceFields),
    JSON.stringify(result.provenance.filters),
    result.provenance.transformation,
    ADAPTER_PATH
  );
  return { calculationId, selectedValueId };
}
