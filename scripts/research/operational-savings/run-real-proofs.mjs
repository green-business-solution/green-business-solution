import {
  mkdir,
  mkdtemp,
  readFile,
  rename,
  rm,
  stat,
  unlink,
  writeFile
} from "node:fs/promises";
import { basename, dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  assertProcessWideNetworkDenied,
  NETWORK_ENFORCEMENT
} from "./lib/network-isolation.mjs";
import {
  ingestContextBenchmarks,
  ingestLightingMarketBenchmarks,
  mapExistingExteriorLightingToItc02,
  mapRackDishwasherActivityToItc52,
  recordExistingExteriorLightingBenchmark,
  recordRackDishwasherActivity
} from "./adapters/context-benchmarks/run.mjs";
import {
  ingestArgonneForkliftComparison,
  mapArgonneForkliftComparison,
  recordArgonneForkliftComparison
} from "./adapters/context-benchmarks/argonne-forklift.mjs";
import {
  ingestFemaGeneratorFueling,
  mapFemaFullLoadDieselTestFuel,
  recordFemaFullLoadDieselTestFuel
} from "./adapters/context-benchmarks/fema.mjs";
import {
  ingestWaterSenseFlushActivity,
  mapWaterSenseFlushActivity,
  recordWaterSenseFlushActivity
} from "./adapters/context-benchmarks/watersense-flush.mjs";
import {
  ingestDoeWalkInBenchmarks,
  mapDoeWalkInBenchmarkToItc49,
  recordDoeWalkInBenchmark
} from "./adapters/context-benchmarks/doe-walkin.mjs";
import {
  ingestComstockAnnualDelta,
  mapComstockAnnualDeltaToItc01,
  recordComstockFormulaMapping
} from "./adapters/comstock/run.mjs";
import {
  ingestDishwasherWaterHeatingWorkbook,
  mapDishwasherWaterHeatingToItc52,
  recordDishwasherWaterHeatingRun
} from "./adapters/dishwasher-water-heating/run.mjs";
import {
  publishDoeMeasurCompressedAirProof,
  runDoeMeasurCompressedAirGolden
} from "./adapters/doe-measur/run.mjs";
import {
  publishDoeMeasurEquipmentProof,
  runDoeMeasurEquipmentGolden
} from "./adapters/doe-measur/equipment.mjs";
import {
  ingestEnergyStarDishwashers,
  mapExactProposedDishwasherToItc52,
  mapRequirementProposedDishwasherToItc52,
  recordItc52DishwasherFormulaMapping
} from "./adapters/energy-star/run.mjs";
import {
  ingestEpaBiomassChpCatalog,
  ingestEpaChpCatalog,
  mapBiomassChpSystemToItc22,
  mapChpSystemToProcess,
  mapChpSystemToItc21,
  recordEpaChpFormulaMapping
} from "./adapters/epa-chp/run.mjs";
import {
  composeItc02LightingReplacement,
  ingestFempExteriorLighting,
  mapFempRequirementToItc02,
  recordItc02FempFormulaMapping,
  recordItc02LightingReplacement
} from "./adapters/femp-lighting/run.mjs";
import {
  ingestFuelEconomy,
  mapExactElectricVehicleToItc28,
  mapExactVehiclePairToItc29,
  recordFuelEconomyFormulaMapping,
  recordItc29FormulaMapping
} from "./adapters/fueleconomy/run.mjs";
import {
  ingestIntervalTariff,
  recordIntervalTariffFormulaMapping,
  resolveCurrentSmbTariff
} from "./adapters/interval-tariff/run.mjs";
import {
  inspectAndPublishUsnoReference,
  mapWeeklyScheduleToFormula,
  recordOperatingScheduleFormulaMapping
} from "./adapters/operating-schedule/run.mjs";
import { ingestReoptRealProof } from "./adapters/reopt/run.mjs";
import {
  ingestScoutPreparedMeasure,
  mapScoutPreparedMeasureToItc14,
  recordScoutFormulaMapping
} from "./adapters/scout/run.mjs";
import {
  calculateMeasuredLeakAvoidance,
  ingestWaterSenseCi,
  recordWaterSenseCiFormulaMapping
} from "./adapters/watersense-ci/run.mjs";
import {
  WATERSENSE_V2_METHOD_SOURCE,
  calculateWaterSenseVersion2Allowances,
  ingestWaterSenseLandscape,
  recordWaterSenseLandscapeFormulaMapping
} from "./adapters/watersense-landscape/run.mjs";
import { publishSscProof } from "./lib/ssc-publication.mjs";
import {
  sha256File,
  sha256Json,
  verifyArtifact
} from "./lib/artifact.mjs";
import {
  openResearchDatabase,
  withDeferredReleasePublication,
  writeCompactDatabaseExport
} from "./lib/sqlite.mjs";
import {
  acquirePublicationLocks
} from "./lib/publication-lock.mjs";

const operationalRoot = fileURLToPath(new URL("./", import.meta.url));
const repositoryRoot = fileURLToPath(new URL("../../../", import.meta.url));

export const DEFAULT_RESEARCH_DATABASE_PATH = join(
  operationalRoot,
  ".cache",
  "research-database.sqlite"
);

export const DEFAULT_COMPACT_EXPORT_PATH = join(
  repositoryRoot,
  "docs",
  "operational-savings-automation-research",
  "fixtures",
  "research-database.compact.json"
);

export const DEFAULT_PUBLICATION_RECEIPT_PATH = join(
  repositoryRoot,
  "docs",
  "operational-savings-automation-research",
  "fixtures",
  "research-database.publication.json"
);

export const REPRODUCIBLE_MIGRATION_APPLIED_AT =
  "2026-07-24T00:00:00.000Z";

function defaultPublicationReceiptPath(
  databasePath,
  compactExportPath
) {
  return (
    resolve(databasePath) ===
      resolve(DEFAULT_RESEARCH_DATABASE_PATH) &&
    resolve(compactExportPath) ===
      resolve(DEFAULT_COMPACT_EXPORT_PATH)
  )
    ? DEFAULT_PUBLICATION_RECEIPT_PATH
    : `${databasePath}.publication.json`;
}

export async function verifyRealResearchDatabasePublication({
  databasePath,
  compactExportPath,
  publicationReceiptPath =
    defaultPublicationReceiptPath(
      databasePath,
      compactExportPath
    )
}) {
  const receipt = JSON.parse(
    await readFile(publicationReceiptPath, "utf8")
  );
  if (
    receipt.schemaVersion !==
      "operational-savings/research-database-publication-v1" ||
    receipt.status !== "COMMITTED" ||
    receipt.database.fileName !== basename(databasePath) ||
    receipt.compactExport.fileName !==
      basename(compactExportPath)
  ) {
    throw new Error(
      "DATABASE_PUBLICATION_RECEIPT_INVALID"
    );
  }
  const [database, compactExport] = await Promise.all([
    verifyArtifact(databasePath, {
      byteSize: receipt.database.byteSize,
      sha256: receipt.database.sha256
    }),
    verifyArtifact(compactExportPath, {
      byteSize: receipt.compactExport.byteSize,
      sha256: receipt.compactExport.sha256
    })
  ]);
  const generationId = sha256Json({
    database: {
      byteSize: database.byteSize,
      sha256: database.sha256
    },
    compactExport: {
      byteSize: compactExport.byteSize,
      sha256: compactExport.sha256
    }
  });
  if (generationId !== receipt.generationId) {
    throw new Error(
      "DATABASE_PUBLICATION_GENERATION_MISMATCH"
    );
  }
  return {
    receipt,
    database,
    compactExport
  };
}

export const REAL_PROOF_STANDARD_IDS = Object.freeze([
  "STD-COMSTOCK-ANNUAL-DELTA",
  "STD-FUELECONOMY-VEHICLES",
  "STD-ENERGY-STAR-PRODUCT-DATA",
  "STD-FEMP-EXTERIOR-LIGHTING",
  "STD-EPA-CHP-PERFORMANCE",
  "STD-OPERATING-SCHEDULE",
  "STD-CONTEXT-BENCHMARKS",
  "STD-DISHWASHER-WATER-HEATING",
  "STD-DOE-MEASUR",
  "STD-SCOUT-ECM-SCREEN",
  "STD-REOPT-LOCAL-DISPATCH",
  "STD-INTERVAL-TARIFF",
  "STD-PVWATTS-V8",
  "STD-SAM-SOLAR-THERMAL",
  "STD-WIND-SAM",
  "STD-WATERSENSE-CI-OPERATIONS",
  "STD-WATERSENSE-LANDSCAPE"
]);

const SSC_PROOF_SLUGS = Object.freeze([
  "pvwatts",
  "sam-solar-thermal",
  "wind-sam"
]);

function artifactPath(artifactRoot, name) {
  return join(artifactRoot, name);
}

async function readJson(path) {
  return JSON.parse(await readFile(path, "utf8"));
}

function tableCounts(database) {
  const names = database.prepare(`
    SELECT name
    FROM sqlite_schema
    WHERE type = 'table'
      AND name NOT LIKE 'sqlite_%'
      AND name <> 'research_migrations'
    ORDER BY name
  `).all();
  return Object.fromEntries(
    names.map(({ name }) => [
      name,
      database.prepare(`SELECT count(*) AS count FROM "${name}"`).get().count
    ])
  );
}

async function publishRealProofs(database, {
  artifactRoot,
  repositoryCacheRoot
}) {
  const publications = [];

  const comstock = await ingestComstockAnnualDelta({
    artifactPaths: {
      dataDictionaryPath: artifactPath(
        artifactRoot,
        "comstock-data-dictionary.tsv"
      ),
      enumerationDictionaryPath: artifactPath(
        artifactRoot,
        "comstock-enumeration-dictionary.tsv"
      ),
      measureCrosswalkPath: artifactPath(
        artifactRoot,
        "comstock-measure-name-crosswalk.csv"
      ),
      upgradesLookupPath: artifactPath(
        artifactRoot,
        "comstock-upgrades.json"
      ),
      baselineParquetPath: artifactPath(
        artifactRoot,
        "comstock-ca-g0600750-upgrade0.parquet"
      ),
      upgradeParquetPath: artifactPath(
        artifactRoot,
        "comstock-ca-g0600750-upgrade43.parquet"
      )
    },
    database
  });
  const comstockRunId = recordComstockFormulaMapping(
    database,
    mapComstockAnnualDeltaToItc01(database, {
      retrofitId: "led_lighting_retrofit",
      geography: "CA, San Francisco County",
      buildingType: "SmallOffice",
      areaFt2: 4000,
      resource: "electricity"
    })
  );
  publications.push({
    key: "comstock",
    standardId: "STD-COMSTOCK-ANNUAL-DELTA",
    recordsRead: comstock.recordsRead,
    recordsWritten: comstock.recordsWritten,
    mappedFormulaTerms: [
      "median_ComStock_delta_r_per_ft²"
    ],
    calculationRunIds: [comstockRunId]
  });

  const fuelEconomy = await ingestFuelEconomy({
    artifactPath: artifactPath(artifactRoot, "vehicles.csv.zip"),
    database
  });
  const fuelEconomyRunId = recordItc29FormulaMapping(
    database,
    mapExactVehiclePairToItc29(database, {
      existingVehicleId: 43764,
      proposedVehicleId: 44444
    })
  );
  const fuelEconomyItc28RunId = recordFuelEconomyFormulaMapping(
    database,
    mapExactElectricVehicleToItc28(database, {
      vehicleId: 44444
    })
  );
  publications.push({
    key: "fueleconomy",
    standardId: "STD-FUELECONOMY-VEHICLES",
    recordsRead: fuelEconomy.recordsRead,
    recordsWritten: fuelEconomy.recordsWritten,
    calculationRunIds: [
      fuelEconomyRunId,
      fuelEconomyItc28RunId
    ]
  });

  const energyStar = await ingestEnergyStarDishwashers({
    artifactPath: artifactPath(
      artifactRoot,
      "energy-star-commercial-dishwashers-full.json"
    ),
    metadataPath: artifactPath(
      artifactRoot,
      "energy-star-commercial-dishwashers-metadata.json"
    ),
    database
  });
  const energyStarRunId = recordItc52DishwasherFormulaMapping(
    database,
    mapExactProposedDishwasherToItc52(database, {
      pdId: "2383572",
      operatingMode: "LOW_TEMPERATURE"
    })
  );
  const energyStarRequirementRunId =
    recordItc52DishwasherFormulaMapping(
      database,
      mapRequirementProposedDishwasherToItc52(database, {
        machineType: "Stationary Single Tank Door",
        sanitationMethod: "Dual Sanitizing Machine",
        operatingMode: "LOW_TEMPERATURE",
        minRacksPerHour: 53,
        maxWaterGallonsPerRack: 0.48,
        maxWashingKwhPerRack: 0.11,
        maxIdleKw: 0.07
      })
    );
  publications.push({
    key: "energy-star",
    standardId: "STD-ENERGY-STAR-PRODUCT-DATA",
    recordsRead: energyStar.recordsRead,
    recordsWritten: energyStar.recordsWritten,
    calculationRunIds: [
      energyStarRunId,
      energyStarRequirementRunId
    ]
  });

  const femp = await ingestFempExteriorLighting({
    artifactPath: artifactPath(
      artifactRoot,
      "femp-exterior-lighting.html"
    ),
    database
  });
  const fempMapping = mapFempRequirementToItc02(database, {
    application: "Outdoor wall-mounted luminaires",
    requiredLumens: 10_000
  });
  const fempRunId = recordItc02FempFormulaMapping(
    database,
    fempMapping
  );
  publications.push({
    key: "femp-lighting",
    standardId: "STD-FEMP-EXTERIOR-LIGHTING",
    recordsRead: femp.recordsRead,
    recordsWritten: femp.recordsWritten,
    calculationRunIds: [fempRunId]
  });

  const epaChp = await ingestEpaChpCatalog({
    artifactPath: artifactPath(artifactRoot, "epa-chp-catalog.pdf"),
    database
  });
  const epaBiomassChp = await ingestEpaBiomassChpCatalog({
    artifactPath: artifactPath(
      artifactRoot,
      "epa-biomass-chp-catalog-v1.1.pdf"
    ),
    database
  });
  const epaChpItc21Mapping = mapChpSystemToItc21(database, {
    technology:
      "Natural gas spark-ignition reciprocating engine",
    system: 1,
    annualOperatingHours: 6000
  });
  const epaChpItc20Mapping = mapChpSystemToProcess(database, {
    categoryId: "ITC-20",
    technology: "Fuel cell - MCFC",
    system: 3,
    annualOperatingHours: 6000
  });
  const epaChpItc26Mapping = mapChpSystemToProcess(database, {
    categoryId: "ITC-26",
    technology:
      "Natural gas spark-ignition reciprocating engine",
    system: 1,
    annualOperatingHours: 6000
  });
  const epaChpItc22Mapping = mapBiomassChpSystemToItc22(
    database,
    {
      conversionTechnology:
        "Downdraft gasifier, gas cleanup, IC engine prime mover",
      installedCapacityKw: 50,
      annualOperatingHours: 7008
    }
  );
  const epaChpItc21RunId = recordEpaChpFormulaMapping(
    database,
    epaChpItc21Mapping
  );
  const epaChpItc20RunId = recordEpaChpFormulaMapping(
    database,
    epaChpItc20Mapping
  );
  const epaChpItc26RunId = recordEpaChpFormulaMapping(
    database,
    epaChpItc26Mapping
  );
  const epaChpItc22RunId = recordEpaChpFormulaMapping(
    database,
    epaChpItc22Mapping
  );
  publications.push({
    key: "epa-chp",
    standardId: "STD-EPA-CHP-PERFORMANCE",
    recordsRead: epaChp.records.length + 1,
    recordsWritten: epaChp.records.length + 1,
    warningCount: epaBiomassChp.warnings.length,
    mappedFormulaTerms: [
      ...epaChpItc20Mapping.formulaBindings,
      ...epaChpItc21Mapping.formulaBindings,
      ...epaChpItc22Mapping.formulaBindings,
      ...epaChpItc26Mapping.formulaBindings
    ].map(({ formulaTerm }) => formulaTerm),
    calculationRunIds: [
      epaChpItc20RunId,
      epaChpItc21RunId,
      epaChpItc22RunId,
      epaChpItc26RunId
    ]
  });

  const operatingSchedule = await inspectAndPublishUsnoReference({
    artifactPath: artifactPath(
      artifactRoot,
      "usno-sf-2026-06-21.json"
    ),
    database
  });
  const operatingScheduleMapping = mapWeeklyScheduleToFormula({
    year: 2026,
    timeZone: "America/Los_Angeles",
    weekly: {
      monday: [["09:00", "17:00"]]
    },
    categoryId: "ITC-12",
    processKey: "operating_schedule",
    formulaTerm: "annual_hours"
  });
  const operatingScheduleRunId =
    recordOperatingScheduleFormulaMapping(
      database,
      operatingScheduleMapping
    );
  const lightingScheduleMapping = mapWeeklyScheduleToFormula({
    year: 2026,
    timeZone: "America/Los_Angeles",
    weekly: {
      monday: [["09:00", "17:00"]]
    },
    categoryId: "ITC-02",
    processKey: "fixed-lighting-hours",
    formulaTerm: "annual_on_hours"
  });
  const lightingScheduleRunId =
    recordOperatingScheduleFormulaMapping(
      database,
      lightingScheduleMapping
    );
  publications.push({
    key: "operating-schedule",
    standardId: "STD-OPERATING-SCHEDULE",
    recordsRead: Object.keys(operatingSchedule.events).length,
    recordsWritten: Object.keys(operatingSchedule.events).length,
    mappedFormulaTerms: [
      operatingScheduleMapping.formulaTerm,
      lightingScheduleMapping.formulaTerm
    ],
    calculationRunIds: [
      operatingScheduleRunId,
      lightingScheduleRunId
    ]
  });

  const calculatorPath = artifactPath(
    artifactRoot,
    "energy-star-cfs-calculator.xlsx"
  );
  const contextBenchmarks = await ingestContextBenchmarks({
    artifactPath: calculatorPath,
    database
  });
  const lightingMarketBenchmarks =
    await ingestLightingMarketBenchmarks({
      artifactPath: artifactPath(
        artifactRoot,
        "doe-lmc-2015-tables.xlsx"
      ),
      database
    });
  const existingLightingMapping =
    mapExistingExteriorLightingToItc02(database, {
      application: "Building Exterior: C&I"
    });
  const existingLightingRunId =
    recordExistingExteriorLightingBenchmark(
      database,
      existingLightingMapping
    );
  const contextRunId = recordRackDishwasherActivity(
    database,
    mapRackDishwasherActivityToItc52(database, {
      sanitationMethod: "Low Temperature",
      machineType: "Under Counter",
      operatingDaysPerWeek: 5,
      activeWeeksPerYear: 52
    })
  );
  publications.push({
    key: "context-benchmarks",
    standardId: "STD-CONTEXT-BENCHMARKS",
    recordsRead:
      contextBenchmarks.schema.dishwasherActivityDefaults.length +
      contextBenchmarks.schema.cooktopDuty.length +
      lightingMarketBenchmarks.schema.applicationAverages.length,
    recordsWritten:
      contextBenchmarks.schema.dishwasherActivityDefaults.length +
      contextBenchmarks.schema.cooktopDuty.length +
      lightingMarketBenchmarks.schema.applicationAverages.length,
    calculationRunIds: [
      contextRunId,
      existingLightingRunId
    ]
  });

  const femaGeneratorFueling =
    await ingestFemaGeneratorFueling({
      artifactPath: artifactPath(
        artifactRoot,
        "fema-generator-fueling.html"
      ),
      database
    });
  const femaGeneratorFuelingMapping =
    mapFemaFullLoadDieselTestFuel(database, {
      technology: "generator",
      fuelType: "diesel",
      loadCondition: "FULL_LOAD",
      ratedCapacityKw: 40,
      annualFullLoadTestHoursPerUnit: 24
    });
  const femaGeneratorFuelingRunId =
    recordFemaFullLoadDieselTestFuel(
      database,
      femaGeneratorFuelingMapping
    );
  publications.push({
    key: "context-fema-generator-fueling",
    standardId: "STD-CONTEXT-BENCHMARKS",
    recordsRead: femaGeneratorFueling.recordsRead,
    recordsWritten: femaGeneratorFueling.recordsWritten,
    mappedFormulaTerms:
      femaGeneratorFuelingMapping.formulaBindings.map(
        ({ formulaTerm }) => formulaTerm
      ),
    calculationRunIds: [femaGeneratorFuelingRunId]
  });

  const argonneForklift =
    await ingestArgonneForkliftComparison({
      artifactPath: artifactPath(
        artifactRoot,
        "argonne-forklift-anl-esd.pdf"
      ),
      database
    });
  const argonneForkliftMapping =
    mapArgonneForkliftComparison(database, {
      equipmentClass: "FORKLIFT",
      ratedCapacityLb: 5_000,
      existingPropulsion: "PROPANE",
      proposedPropulsion: "BATTERY_ELECTRIC",
      comparableDuty:
        "EPRI_SIDE_BY_SIDE_COST_COMPARISON",
      annualOperatingHours: 2_000
    });
  const argonneForkliftRunId =
    recordArgonneForkliftComparison(
      database,
      argonneForkliftMapping
    );
  publications.push({
    key: "context-argonne-forklift",
    standardId: "STD-CONTEXT-BENCHMARKS",
    recordsRead: argonneForklift.recordsRead,
    recordsWritten: argonneForklift.recordsWritten,
    mappedFormulaTerms:
      argonneForkliftMapping.formulaBindings.map(
        ({ formulaTerm }) => formulaTerm
      ),
    calculationRunIds: [argonneForkliftRunId]
  });

  const waterSenseFlushActivity =
    await ingestWaterSenseFlushActivity({
      toiletArtifactPath: artifactPath(
        artifactRoot,
        "watersense-at-work-2023.pdf"
      ),
      urinalArtifactPath: artifactPath(
        artifactRoot,
        "watersense-at-work-2023-urinals.pdf"
      ),
      database
    });
  const waterSenseFlushMapping =
    mapWaterSenseFlushActivity(database, {
      fixtureType: "TOILET",
      femaleEligiblePopulation: 10,
      maleEligiblePopulation: 10,
      customerOrVisitorPopulation: 0,
      inScopeFixtureCount: 4,
      operatingDaysPerWeek: 5,
      activeWeeksPerYear: 52,
      allocationMethod: "COMPLETE_ELIGIBLE_GROUP"
    });
  const waterSenseFlushRunId =
    recordWaterSenseFlushActivity(
      database,
      waterSenseFlushMapping
    );
  publications.push({
    key: "context-watersense-flush-activity",
    standardId: "STD-CONTEXT-BENCHMARKS",
    recordsRead: waterSenseFlushActivity.recordsRead,
    recordsWritten: waterSenseFlushActivity.recordsWritten,
    mappedFormulaTerms:
      waterSenseFlushMapping.formulaBindings.map(
        ({ formulaTerm }) => formulaTerm
      ),
    calculationRunIds: [waterSenseFlushRunId]
  });

  const doeWalkIn =
    await ingestDoeWalkInBenchmarks({
      artifactPath: artifactPath(
        artifactRoot,
        "doe-wicf-ecs-nopr-2023.pdf"
      ),
      database
    });
  const doeWalkInMapping =
    mapDoeWalkInBenchmarkToItc49(database, {
      componentType: "PANEL",
      equipmentClass: "PS.L",
      temperatureClass: "LOW",
      indoorOutdoorConfiguration: "NOT_APPLICABLE",
      existingEfficiencyLevel: "BASELINE",
      proposedEfficiencyLevel: "TSL_3",
      panelAreaFt2: 100
    });
  const doeWalkInRunId =
    recordDoeWalkInBenchmark(
      database,
      doeWalkInMapping
    );
  publications.push({
    key: "context-doe-walkin",
    standardId: "STD-CONTEXT-BENCHMARKS",
    recordsRead: doeWalkIn.recordsRead,
    recordsWritten: doeWalkIn.recordsWritten,
    mappedFormulaTerms:
      doeWalkInMapping.formulaBindings.map(
        ({ formulaTerm }) => formulaTerm
      ),
    calculationRunIds: [doeWalkInRunId]
  });

  const itc02LightingComposition =
    composeItc02LightingReplacement({
      existingResult: existingLightingMapping,
      proposedResult: fempMapping,
      scheduleResult: lightingScheduleMapping,
      replacementFixtureCount: 100
    });
  const itc02LightingRunId =
    recordItc02LightingReplacement(
      database,
      itc02LightingComposition,
      {
        existing_fixture_power: existingLightingRunId,
        proposed_fixture_power: fempRunId,
        annual_operating_hours: lightingScheduleRunId
      }
    );
  publications.push({
    key: "itc02-lighting-composition",
    standardId: "STD-FEMP-EXTERIOR-LIGHTING",
    recordsRead: 3,
    recordsWritten: 4,
    mappedFormulaTerms: ["annual_kWh"],
    calculationRunIds: [itc02LightingRunId]
  });

  const waterSenseLandscape =
    await ingestWaterSenseLandscape({
      artifactPath: artifactPath(
        artifactRoot,
        "watersense-climate.xlsx"
      ),
      database
    });
  const waterSenseLandscapeMapping =
    calculateWaterSenseVersion2Allowances(database, {
      postalCode: "94105",
      landscapeAreaFt2: 1_000,
      areaUnit: "square feet",
      growingSeason: {
        startMonth: 1,
        endMonth: 12,
        source: "EPA_WATERSENSE_V2",
        postalCode: "94105",
        methodArtifactSha256:
          WATERSENSE_V2_METHOD_SOURCE.sha256
      },
      proposedHydrozones: [
        {
          areaFt2: 1_000,
          landscapeType: "non_turf_plants",
          irrigationEquipment: "microirrigation",
          irrigationEfficiency: 0.9,
          pressureRegulated: false
        }
      ],
      controllerTreatment: "watersense_weather_based",
      certifiedProfessionalAudit: true
    });
  const waterSenseLandscapeRunId =
    recordWaterSenseLandscapeFormulaMapping(
      database,
      waterSenseLandscapeMapping
    );
  publications.push({
    key: "watersense-landscape",
    standardId: "STD-WATERSENSE-LANDSCAPE",
    recordsRead: waterSenseLandscape.recordsRead,
    recordsWritten: waterSenseLandscape.recordsWritten,
    mappedFormulaTerms:
      waterSenseLandscapeMapping.formulaBindings.map(
        ({ formulaTerm }) => formulaTerm
      ),
    calculationRunIds: [waterSenseLandscapeRunId]
  });

  const waterSenseCi = await ingestWaterSenseCi({
    artifactPath: artifactPath(
      artifactRoot,
      "watersense-ci-worksheets.xlsx"
    ),
    database
  });
  const waterSenseCiMapping =
    calculateMeasuredLeakAvoidance(database, {
      measuredLeakGpm: 0.5,
      measuredLeakUnit: "gallons/minute",
      confirmedLeakMinutesPerYear: 525_600,
      confirmedDurationUnit: "minutes/year"
    });
  const waterSenseCiRunId =
    recordWaterSenseCiFormulaMapping(
      database,
      waterSenseCiMapping
    );
  publications.push({
    key: "watersense-ci",
    standardId: "STD-WATERSENSE-CI-OPERATIONS",
    recordsRead: waterSenseCi.recordsRead,
    recordsWritten: waterSenseCi.recordsWritten,
    mappedFormulaTerms:
      waterSenseCiMapping.formulaBindings.map(
        ({ formulaTerm }) => formulaTerm
      ),
    calculationRunIds: [waterSenseCiRunId]
  });

  const dishwasherWaterHeating =
    await ingestDishwasherWaterHeatingWorkbook({
      artifactPath: calculatorPath,
      database
    });
  const dishwasherWaterHeatingRunId =
    recordDishwasherWaterHeatingRun(
      database,
      mapDishwasherWaterHeatingToItc52({
        nativeBasis: "rack",
        sanitationMethod: "HIGH_TEMPERATURE",
        resource: "electric",
        existingWaterQuantity: 1.29,
        proposedWaterQuantity: 0.89,
        buildingTemperatureRiseF: 70,
        boosterTemperatureRiseF: 40,
        waterHeaterEfficiency: 0.98,
        boosterHeaterEfficiency: 0.98
      })
    );
  publications.push({
    key: "dishwasher-water-heating",
    standardId: "STD-DISHWASHER-WATER-HEATING",
    recordsRead:
      dishwasherWaterHeating.schema.requiredCells.length,
    recordsWritten:
      Object.keys(dishwasherWaterHeating.assumptions).length,
    calculationRunIds: [dishwasherWaterHeatingRunId]
  });

  const doeMeasurExecution =
    await runDoeMeasurCompressedAirGolden({
      repositoryPath: join(
        repositoryCacheRoot,
        "amo-tools-suite"
      )
    });
  const doeMeasur = publishDoeMeasurCompressedAirProof(
    database,
    doeMeasurExecution
  );
  const doeMeasurEquipmentExecution =
    await runDoeMeasurEquipmentGolden({
      repositoryPath: join(
        repositoryCacheRoot,
        "amo-tools-suite"
      )
    });
  const doeMeasurEquipment =
    publishDoeMeasurEquipmentProof(
      database,
      doeMeasurEquipmentExecution
    );
  publications.push({
    key: "doe-measur",
    standardId: "STD-DOE-MEASUR",
    recordsRead: 7,
    recordsWritten: 5,
    mappedFormulaTerms: [
      ...doeMeasur.mapped.formulaBindings,
      ...doeMeasurEquipment.mappings.flatMap(
        ({ formulaBindings }) => formulaBindings
      )
    ].map(({ formulaTerm }) => formulaTerm),
    calculationRunIds: [
      doeMeasur.calculationId,
      ...doeMeasurEquipment.calculations.map(
        ({ calculationId }) => calculationId
      )
    ]
  });

  const scout = await ingestScoutPreparedMeasure({
    repositoryPath: join(repositoryCacheRoot, "scout"),
    database
  });
  const scoutMapping = mapScoutPreparedMeasureToItc14(
    database,
    {
      measureName: "(C) 90.1 Lighting",
      buildingType: "small office",
      climateZone: "AIA_CZ3",
      structureType: "existing",
      endUse: "lighting",
      fuelType: "electricity"
    }
  );
  const scoutRunId = recordScoutFormulaMapping(
    database,
    scoutMapping
  );
  publications.push({
    key: "scout",
    standardId: "STD-SCOUT-ECM-SCREEN",
    recordsRead: scout.recordsRead,
    recordsWritten: scout.recordsWritten,
    mappedFormulaTerms:
      scoutMapping.formulaBindings.map(
        ({ formulaTerm }) => formulaTerm
      ),
    calculationRunIds: [scoutRunId]
  });

  const pvwattsProof = await readJson(
    join(
      operationalRoot,
      "adapters",
      "pvwatts",
      "proof.json"
    )
  );
  const pvwattsPublication = publishSscProof(
    database,
    pvwattsProof
  );
  const reopt = await ingestReoptRealProof({
    repoPath: join(repositoryCacheRoot, "reopt"),
    pvwattsRepoPath: join(repositoryCacheRoot, "ssc"),
    evidenceRoot: join(
      operationalRoot,
      "containers",
      "reopt"
    ),
    pvwattsPublication,
    database
  });
  publications.push({
    key: "reopt",
    standardId: "STD-REOPT-LOCAL-DISPATCH",
    recordsRead: Object.keys(reopt.schema.fileChecksums).length,
    recordsWritten: 2,
    modelExecutionStatus: reopt.modelExecutionStatus,
    mappedFormulaTerms: Object.keys(
      reopt.solarStorage.formulaBindings
    ),
    calculationRunIds: reopt.calculationIds
  });

  const intervalTariff = await ingestIntervalTariff({
    urdbArtifactPath: artifactPath(artifactRoot, "usurdb.csv.gz"),
    sdgePublicationPath: artifactPath(
      artifactRoot,
      "sdge-small-commercial-rates-2026-06-01.pdf"
    ),
    jointComparisonPath: artifactPath(
      artifactRoot,
      "sdge-sdcp-joint-rate-comparison-2026-06-01.pdf"
    ),
    database
  });
  const intervalTariffPublication =
    recordIntervalTariffFormulaMapping(
      database,
      resolveCurrentSmbTariff(database, {
        utilityName: "San Diego Gas & Electric Co",
        schedule: "TOU-A",
        sector: "Commercial",
        asOf: "2026-07-24",
        demandKw: 5.3,
        voltageCategory: "Secondary",
        serviceType: "Bundled",
        exportMode: "NO_EXPORT"
      })
    );
  publications.push({
    key: "interval-tariff",
    standardId: "STD-INTERVAL-TARIFF",
    recordsRead: intervalTariff.recordsRead,
    recordsWritten: 1,
    calculationRunIds: [
      intervalTariffPublication.calculationId
    ]
  });

  for (const slug of SSC_PROOF_SLUGS) {
    const proof =
      slug === "pvwatts"
        ? pvwattsProof
        : await readJson(
            join(
              operationalRoot,
              "adapters",
              slug,
              "proof.json"
            )
          );
    const publication =
      slug === "pvwatts"
        ? pvwattsPublication
        : publishSscProof(database, proof);
    publications.push({
      key: slug,
      standardId: proof.standardId,
      recordsRead:
        proof.nativeModelInterface.variables.length,
      recordsWritten: 1,
      calculationRunIds: [publication.calculationRunId]
    });
  }

  return publications;
}

async function unlinkIfPresent(path) {
  try {
    await unlink(path);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}

function verifyDatabase(database) {
  const integrity = database.prepare("PRAGMA integrity_check").all();
  if (
    integrity.length !== 1 ||
    integrity[0].integrity_check !== "ok"
  ) {
    throw new Error(
      `DATABASE_INTEGRITY_CHECK_FAILED: ${JSON.stringify(integrity)}`
    );
  }
  const foreignKeyErrors = database.prepare(
    "PRAGMA foreign_key_check"
  ).all();
  if (foreignKeyErrors.length) {
    throw new Error(
      `DATABASE_FOREIGN_KEY_CHECK_FAILED: ${JSON.stringify(
        foreignKeyErrors
      )}`
    );
  }
}

export async function buildRealResearchDatabase({
  databasePath = DEFAULT_RESEARCH_DATABASE_PATH,
  compactExportPath = DEFAULT_COMPACT_EXPORT_PATH,
  publicationReceiptPath = null,
  artifactRoot = join(operationalRoot, ".cache", "artifacts"),
  repositoryCacheRoot = join(operationalRoot, ".cache", "repos"),
  sampleLimit = 3,
  publicationHooks = {}
} = {}) {
  const networkControl =
    await assertProcessWideNetworkDenied();
  const resolvedDatabasePath = resolve(databasePath);
  const resolvedCompactExportPath = resolve(compactExportPath);
  const resolvedPublicationReceiptPath = resolve(
    publicationReceiptPath ??
      defaultPublicationReceiptPath(
        resolvedDatabasePath,
        resolvedCompactExportPath
      )
  );
  if (
    new Set([
      resolvedDatabasePath,
      resolvedCompactExportPath,
      resolvedPublicationReceiptPath
    ]).size !== 3
  ) {
    throw new Error(
      "OUTPUT_PATH_COLLISION: database, compact export, and publication receipt paths must differ"
    );
  }

  await Promise.all([
    mkdir(dirname(resolvedDatabasePath), { recursive: true }),
    mkdir(dirname(resolvedCompactExportPath), { recursive: true }),
    mkdir(dirname(resolvedPublicationReceiptPath), {
      recursive: true
    })
  ]);
  const publicationLock = await acquirePublicationLocks([
    resolvedDatabasePath,
    resolvedCompactExportPath,
    resolvedPublicationReceiptPath
  ]);
  let databaseBuildDirectory;
  let exportBuildDirectory;
  let receiptBuildDirectory;
  let temporaryDatabasePath;
  let temporaryExportPath;
  let temporaryReceiptPath;
  let database;

  try {
    await publicationHooks.afterPublicationLockAcquired?.({
      lockId: publicationLock.lockId,
      lockPaths: publicationLock.lockPaths,
      outputPaths: publicationLock.outputPaths
    });
    databaseBuildDirectory = await mkdtemp(
      join(
        dirname(resolvedDatabasePath),
        ".research-database-build-"
      )
    );
    exportBuildDirectory = await mkdtemp(
      join(
        dirname(resolvedCompactExportPath),
        ".research-export-build-"
      )
    );
    receiptBuildDirectory = await mkdtemp(
      join(
        dirname(resolvedPublicationReceiptPath),
        ".research-publication-build-"
      )
    );
    temporaryDatabasePath = join(
      databaseBuildDirectory,
      basename(resolvedDatabasePath)
    );
    temporaryExportPath = join(
      exportBuildDirectory,
      basename(resolvedCompactExportPath)
    );
    temporaryReceiptPath = join(
      receiptBuildDirectory,
      basename(resolvedPublicationReceiptPath)
    );
    database = await openResearchDatabase(temporaryDatabasePath, {
      migrationAppliedAt: REPRODUCIBLE_MIGRATION_APPLIED_AT
    });
    const publications = await withDeferredReleasePublication(
      database,
      () =>
        publishRealProofs(database, {
          artifactRoot: resolve(artifactRoot),
          repositoryCacheRoot: resolve(repositoryCacheRoot)
        })
    );
    const publishedStandards = database.prepare(`
      SELECT DISTINCT standard_id
      FROM source_registry
      ORDER BY standard_id
    `).all().map(({ standard_id: standardId }) => standardId);
    const expectedStandards = [...REAL_PROOF_STANDARD_IDS].sort();
    if (
      JSON.stringify(publishedStandards) !==
      JSON.stringify(expectedStandards)
    ) {
      throw new Error(
        `INCOMPLETE_REAL_PROOF_SET: ${JSON.stringify(
          publishedStandards
        )}`
      );
    }

    verifyDatabase(database);
    const counts = tableCounts(database);
    const compactExport = await writeCompactDatabaseExport(
      database,
      temporaryExportPath,
      { sampleLimit }
    );
    database.exec(
      "PRAGMA wal_checkpoint(TRUNCATE); PRAGMA journal_mode = DELETE;"
    );
    database.close();
    database = undefined;

    const [databaseSha256, compactExportSha256, databaseStat, exportStat] =
      await Promise.all([
        sha256File(temporaryDatabasePath),
        sha256File(temporaryExportPath),
        stat(temporaryDatabasePath),
        stat(temporaryExportPath)
      ]);
    const generationId = sha256Json({
      database: {
        byteSize: databaseStat.size,
        sha256: databaseSha256
      },
      compactExport: {
        byteSize: exportStat.size,
        sha256: compactExportSha256
      }
    });
    const publicationReceipt = {
      schemaVersion:
        "operational-savings/research-database-publication-v1",
      status: "COMMITTED",
      generationId,
      database: {
        fileName: basename(resolvedDatabasePath),
        byteSize: databaseStat.size,
        sha256: databaseSha256
      },
      compactExport: {
        fileName: basename(resolvedCompactExportPath),
        byteSize: exportStat.size,
        sha256: compactExportSha256
      },
      migrationAppliedAt: REPRODUCIBLE_MIGRATION_APPLIED_AT,
      publicationRule:
        "The receipt is renamed last. Consumers must verify both exact hashes against this receipt before using either file."
    };
    await writeFile(
      temporaryReceiptPath,
      `${JSON.stringify(publicationReceipt, null, 2)}\n`,
      "utf8"
    );

    await Promise.all([
      unlinkIfPresent(`${resolvedDatabasePath}-wal`),
      unlinkIfPresent(`${resolvedDatabasePath}-shm`)
    ]);
    await rename(temporaryDatabasePath, resolvedDatabasePath);
    await publicationHooks.afterDatabasePublished?.({
      databasePath: resolvedDatabasePath,
      generationId
    });
    await rename(temporaryExportPath, resolvedCompactExportPath);
    await rename(
      temporaryReceiptPath,
      resolvedPublicationReceiptPath
    );
    const verifiedPublication =
      await verifyRealResearchDatabasePublication({
        databasePath: resolvedDatabasePath,
        compactExportPath: resolvedCompactExportPath,
        publicationReceiptPath:
          resolvedPublicationReceiptPath
      });

    return {
      databasePath: resolvedDatabasePath,
      compactExportPath: resolvedCompactExportPath,
      publicationReceiptPath:
        resolvedPublicationReceiptPath,
      publicationReceipt:
        verifiedPublication.receipt,
      networkDisabled: true,
      networkEnforcement: NETWORK_ENFORCEMENT,
      networkControl,
      publications,
      counts,
      compactExport
    };
  } finally {
    database?.close();
    try {
      await Promise.all([
        databaseBuildDirectory
          ? rm(databaseBuildDirectory, {
              recursive: true,
              force: true
            })
          : Promise.resolve(),
        exportBuildDirectory
          ? rm(exportBuildDirectory, {
              recursive: true,
              force: true
            })
          : Promise.resolve(),
        receiptBuildDirectory
          ? rm(receiptBuildDirectory, {
              recursive: true,
              force: true
            })
          : Promise.resolve()
      ]);
    } finally {
      await publicationLock.release();
    }
  }
}

const invokedPath = process.argv[1]
  ? resolve(process.argv[1])
  : null;

if (invokedPath === fileURLToPath(import.meta.url)) {
  try {
    const result = await buildRealResearchDatabase();
    process.stdout.write(`${JSON.stringify({
      databasePath: result.databasePath,
      compactExportPath: result.compactExportPath,
      networkDisabled: result.networkDisabled,
      publications: result.publications,
      counts: result.counts
    }, null, 2)}\n`);
  } catch (error) {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  }
}
