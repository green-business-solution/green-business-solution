import { readFile } from "node:fs/promises";

import parsePdf from "pdf-parse";

import { sha256Json } from "../../lib/artifact.mjs";

export const DEFAULT_DOE_WALKIN_FIXTURE_URL = new URL(
  "../../../../../docs/operational-savings-fixtures/sources/doe-walk-in-energy-benchmarks.json",
  import.meta.url
);

const PDF_PAGE_COUNT = 391;
const ENERGY_TABLE_PDF_PAGE = 164;
const ENERGY_TABLE_DOCUMENT_PAGE = 163;
const SOURCE_CHECKSUM =
  "sha256:d46c285120da35349dfe1017b1d2739cfa20efe62f00261e89c8c225c6fd1bbc";

const ROW_DEFINITIONS = Object.freeze([
  {
    componentType: "PANEL",
    equipmentClass: "PF.L",
    componentSubtype: "FLOOR",
    temperatureClass: "LOW",
    indoorOutdoorConfiguration: "NOT_APPLICABLE",
    sourceTable: "Table IV.31",
    nativeUnit: "kWh/(ft2 year)",
    fixtureUnitId: "kwh_ft2_year",
    baselineField: "panel_pf_l_baseline",
    tsl3Field: "panel_pf_l_tsl3",
    baseline: 5.8,
    tsl3: 4,
    nativeRowText: "PF.L 5.8 5.8 5.7 4.0"
  },
  {
    componentType: "PANEL",
    equipmentClass: "PS.L",
    componentSubtype: "STRUCTURAL",
    temperatureClass: "LOW",
    indoorOutdoorConfiguration: "NOT_APPLICABLE",
    sourceTable: "Table IV.31",
    nativeUnit: "kWh/(ft2 year)",
    fixtureUnitId: "kwh_ft2_year",
    baselineField: "panel_ps_l_baseline",
    tsl3Field: "panel_ps_l_tsl3",
    baseline: 9.5,
    tsl3: 5.2,
    nativeRowText: "PS.L 9.5 9.4 9.4 5.2"
  },
  {
    componentType: "PANEL",
    equipmentClass: "PS.M",
    componentSubtype: "STRUCTURAL",
    temperatureClass: "MEDIUM",
    indoorOutdoorConfiguration: "NOT_APPLICABLE",
    sourceTable: "Table IV.31",
    nativeUnit: "kWh/(ft2 year)",
    fixtureUnitId: "kwh_ft2_year",
    baselineField: "panel_ps_m_baseline",
    tsl3Field: "panel_ps_m_tsl3",
    baseline: 2.3,
    tsl3: 1.1,
    nativeRowText: "PS.M 2.3 2.2 2.2 1.1"
  },
  {
    componentType: "DOOR",
    equipmentClass: "DW.L",
    componentSubtype: "DISPLAY_MANUAL",
    temperatureClass: "LOW",
    indoorOutdoorConfiguration: "NOT_APPLICABLE",
    sourceTable: "Table IV.32",
    nativeUnit: "kWh/year",
    fixtureUnitId: "kwh_year",
    baselineField: "door_dw_l_baseline",
    tsl3Field: "door_dw_l_tsl3",
    baseline: 2_698,
    tsl3: 2_120,
    nativeRowText: "DW.L 2,698 2,668 2,663 2,120"
  },
  {
    componentType: "DOOR",
    equipmentClass: "NM.L",
    componentSubtype: "NON_DISPLAY_MANUAL",
    temperatureClass: "LOW",
    indoorOutdoorConfiguration: "NOT_APPLICABLE",
    sourceTable: "Table IV.32",
    nativeUnit: "kWh/year",
    fixtureUnitId: "kwh_year",
    baselineField: "door_nm_l_baseline",
    tsl3Field: "door_nm_l_tsl3",
    baseline: 3_796,
    tsl3: 1_118,
    nativeRowText: "NM.L 3,796 1,318 1,316 1,118"
  },
  {
    componentType: "DOOR",
    equipmentClass: "NO.L",
    componentSubtype: "NON_DISPLAY_MOTORIZED",
    temperatureClass: "LOW",
    indoorOutdoorConfiguration: "NOT_APPLICABLE",
    sourceTable: "Table IV.32",
    nativeUnit: "kWh/year",
    fixtureUnitId: "kwh_year",
    baselineField: "door_no_l_baseline",
    tsl3Field: "door_no_l_tsl3",
    baseline: 5_320,
    tsl3: 1_678,
    nativeRowText: "NO.L 5,320 2,049 2,045 1,678"
  },
  {
    componentType: "REFRIGERATION_SYSTEM",
    equipmentClass: "DC.L.I",
    componentSubtype: "DEDICATED_CONDENSING",
    temperatureClass: "LOW",
    indoorOutdoorConfiguration: "INDOOR",
    sourceTable: "Table IV.33",
    nativeUnit: "kWh/year",
    fixtureUnitId: "kwh_year",
    baselineField: "refrigeration_dc_l_i_baseline",
    tsl3Field: "refrigeration_dc_l_i_tsl3",
    baseline: 26_420,
    tsl3: 25_887,
    nativeRowText: "DC.L.I 26,420 25,917 25,91725,887"
  },
  {
    componentType: "REFRIGERATION_SYSTEM",
    equipmentClass: "DC.M.I",
    componentSubtype: "DEDICATED_CONDENSING",
    temperatureClass: "MEDIUM",
    indoorOutdoorConfiguration: "INDOOR",
    sourceTable: "Table IV.33",
    nativeUnit: "kWh/year",
    fixtureUnitId: "kwh_year",
    baselineField: "refrigeration_dc_m_i_baseline",
    tsl3Field: "refrigeration_dc_m_i_tsl3",
    baseline: 12_178,
    tsl3: 11_615,
    nativeRowText: "DC.M.I 12,178 11,621 11,62111,615"
  },
  {
    componentType: "REFRIGERATION_SYSTEM",
    equipmentClass: "SP.H.I",
    sourceClassCode: "SPU.H.I",
    componentSubtype: "SINGLE_PACKAGED_DEDICATED",
    temperatureClass: "HIGH",
    indoorOutdoorConfiguration: "INDOOR",
    sourceTable: "Table IV.33",
    nativeUnit: "kWh/year",
    fixtureUnitId: "kwh_year",
    baselineField: "refrigeration_sp_h_i_baseline",
    tsl3Field: "refrigeration_sp_h_i_tsl3",
    baseline: 2_275,
    tsl3: 1_999,
    nativeRowText: "SP.H.I 2,275 2,035 2,035 1,999"
  },
  {
    componentType: "REFRIGERATION_SYSTEM",
    equipmentClass: "UC.L",
    componentSubtype: "UNIT_COOLER",
    temperatureClass: "LOW",
    indoorOutdoorConfiguration: "NOT_APPLICABLE",
    sourceTable: "Table IV.33",
    nativeUnit: "kWh/year",
    fixtureUnitId: "kwh_year",
    baselineField: "refrigeration_uc_l_baseline",
    tsl3Field: "refrigeration_uc_l_tsl3",
    baseline: 45_993,
    tsl3: 43_190,
    nativeRowText: "UC.L 45,993 43,845 43,19043,190"
  }
]);

function normalizePdfText(value) {
  return String(value ?? "")
    .normalize("NFKC")
    .replaceAll(/\s+/g, " ")
    .trim();
}

function requireText(text, expected, label) {
  if (!text.includes(expected)) {
    throw new Error(
      `DOE_WALKIN_SOURCE_SCHEMA_DRIFT: missing ${label}`
    );
  }
}

function exactFixtureRows(fixture) {
  if (
    fixture?.fixture_type !== "reviewed_source_fixture" ||
    fixture?.fixture_schema_version !== "1.0.0" ||
    fixture?.source_title !==
      "DOE Walk-In Coolers and Freezers Energy Conservation Standards NOPR" ||
    fixture?.raw_artifacts?.length !== 1 ||
    fixture.raw_artifacts[0].artifact_identifier !==
      "doe-wicf-ecs-nopr-2023" ||
    fixture.raw_artifacts[0].exact_artifact !==
      "Tables IV.31, IV.32, and IV.33" ||
    fixture.raw_artifacts[0].source_checksum !== SOURCE_CHECKSUM ||
    !Array.isArray(fixture.tables) ||
    fixture.tables.length !== ROW_DEFINITIONS.length * 2
  ) {
    throw new Error(
      "DOE_WALKIN_FIXTURE_SCHEMA_DRIFT: fixture identity or shape changed"
    );
  }
  const tableIndex = new Map(
    fixture.tables.map((entry) => [entry.field, entry])
  );
  if (tableIndex.size !== fixture.tables.length) {
    throw new Error(
      "DOE_WALKIN_FIXTURE_SCHEMA_DRIFT: duplicate table fields"
    );
  }
  return ROW_DEFINITIONS.map((definition) => {
    const baseline = tableIndex.get(definition.baselineField);
    const tsl3 = tableIndex.get(definition.tsl3Field);
    const expectedBaselineLocation =
      `${definition.sourceTable}, ${definition.equipmentClass} baseline`;
    const expectedTsl3Location =
      `${definition.sourceTable}, ${definition.equipmentClass} TSL 3`;
    if (
      baseline?.unit_id !== definition.fixtureUnitId ||
      baseline?.source_location !== expectedBaselineLocation ||
      baseline?.value !== definition.baseline ||
      tsl3?.unit_id !== definition.fixtureUnitId ||
      tsl3?.source_location !== expectedTsl3Location ||
      tsl3?.value !== definition.tsl3
    ) {
      throw new Error(
        `DOE_WALKIN_FIXTURE_SCHEMA_DRIFT: ${definition.equipmentClass} values or evidence changed`
      );
    }
    return {
      ...definition,
      sourceLocations: {
        baseline: baseline.source_location,
        tsl3: tsl3.source_location
      }
    };
  });
}

export async function readDoeWalkInReviewedFixture(
  fixturePath = DEFAULT_DOE_WALKIN_FIXTURE_URL
) {
  let fixture;
  try {
    fixture = JSON.parse(await readFile(fixturePath, "utf8"));
  } catch (error) {
    throw new Error(
      `DOE_WALKIN_FIXTURE_SCHEMA_DRIFT: ${error.message}`
    );
  }
  exactFixtureRows(fixture);
  return fixture;
}

async function renderPageText(page) {
  const content = await page.getTextContent({
    normalizeWhitespace: false,
    disableCombineTextItems: false
  });
  let lastY;
  let text = "";
  for (const item of content.items) {
    const y = item.transform[5];
    if (lastY !== undefined && lastY !== y) {
      text += "\n";
    }
    text += item.str;
    lastY = y;
  }
  return text;
}

export async function loadDoeWalkInPdfEvidence(artifactPath) {
  let pageNumber = 0;
  const retainedPages = new Map();
  const parsed = await parsePdf(await readFile(artifactPath), {
    pagerender: async (page) => {
      pageNumber += 1;
      const text = await renderPageText(page);
      if ([1, 2, 56, 58, 61, ENERGY_TABLE_PDF_PAGE].includes(
        pageNumber
      )) {
        retainedPages.set(pageNumber, text);
      }
      return "";
    }
  });
  return {
    pageCount: parsed.numpages,
    metadata: {
      author: parsed.info?.Author,
      creator: parsed.info?.Creator,
      creationDate: parsed.info?.CreationDate
    },
    pages: Object.fromEntries(retainedPages)
  };
}

export function schemaFromDoeWalkInEvidence(
  evidence,
  fixture
) {
  if (
    evidence?.pageCount !== PDF_PAGE_COUNT ||
    evidence?.metadata?.author !== "Watson, Troy" ||
    evidence?.metadata?.creator !==
      "Microsoft® Word for Microsoft 365" ||
    evidence?.metadata?.creationDate !==
      "D:20230811143552-04'00'"
  ) {
    throw new Error(
      "DOE_WALKIN_SOURCE_SCHEMA_DRIFT: PDF identity changed"
    );
  }
  const cover = normalizePdfText(evidence.pages?.[2]);
  requireText(
    cover,
    "EERE-2017-BT-STD-0009 RIN 1905-AD79 Energy Conservation Program: Energy Conservation Standards for Walk-in Coolers and Freezers",
    "source title and docket"
  );
  requireText(
    cover,
    "ACTION: Notice of proposed rulemaking and announcement of public meeting.",
    "NOPR action"
  );

  const doorClasses = normalizePdfText(evidence.pages?.[56]);
  requireText(
    doorClasses,
    "Table IV.1 Proposed Equipment Classes for Walk-in Doors",
    "Table IV.1 title"
  );
  for (const classEvidence of [
    "Display Manual Medium DW.M Low DW.L",
    "Non-display Manual Medium NM.M Low NM.L",
    "Motorized Medium NO.M Low NO.L"
  ]) {
    requireText(
      doorClasses,
      classEvidence,
      `Table IV.1 class evidence ${classEvidence}`
    );
  }

  const panelClasses = normalizePdfText(evidence.pages?.[58]);
  requireText(
    panelClasses,
    "Table IV.2 Equipment Classes for Walk-In Panels",
    "Table IV.2 title"
  );
  requireText(
    panelClasses,
    "Structural Panel Medium PS.M Low PS.L Floor Panel Low PF.L",
    "Table IV.2 class evidence"
  );

  const refrigerationClasses = normalizePdfText(
    evidence.pages?.[61]
  );
  requireText(
    refrigerationClasses,
    "Table IV.3 Walk-in Refrigeration System Equipment Classes Analyzed in the June 2022 Preliminary Analysis",
    "Table IV.3 title"
  );
  for (const classEvidence of [
    "Medium-Temperature Outdoor DC.M.O Indoor DC.M.I",
    "Low-Temperature Outdoor DC.L.O Indoor DC.L.I",
    "Unit Cooler High-Temperature N/A UC.H Medium-Temperature UC.M Low-Temperature UC.L",
    "High-Temperature (Non-ducted) Outdoor SPU.H.O Indoor SPU.H.I"
  ]) {
    requireText(
      refrigerationClasses,
      classEvidence,
      `Table IV.3 class evidence ${classEvidence}`
    );
  }

  const energyPage = normalizePdfText(
    evidence.pages?.[ENERGY_TABLE_PDF_PAGE]
  );
  requireText(
    energyPage,
    `${ENERGY_TABLE_DOCUMENT_PAGE} 4. Estimated Annual Energy Consumption`,
    `document page ${ENERGY_TABLE_DOCUMENT_PAGE} heading`
  );
  for (const tableTitle of [
    "Table IV.31 Annual Energy Consumption Estimates for Panels (kWh/year per ft 2 )",
    "Table IV.32 Annual Energy Consumption Estimates for Doors (kWh/year )",
    "Table IV.33 Annual Energy Consumption Estimates for Refrigeration Systems (kWh/year)"
  ]) {
    requireText(energyPage, tableTitle, tableTitle);
  }

  const rows = exactFixtureRows(fixture);
  for (const row of rows) {
    requireText(
      energyPage,
      row.nativeRowText,
      `${row.sourceTable} row ${row.equipmentClass}`
    );
  }
  const observed = {
    format: "PDF_NATIVE_CLASS_AND_ENERGY_TABLES",
    sourceIdentity: {
      title:
        "Energy Conservation Program: Energy Conservation Standards for Walk-in Coolers and Freezers",
      action:
        "Notice of proposed rulemaking and announcement of public meeting",
      docket: "EERE-2017-BT-STD-0009",
      pdfPageCount: evidence.pageCount
    },
    equipmentClassEvidence: [
      {
        table: "Table IV.1",
        pdfPage: 56,
        componentType: "DOOR"
      },
      {
        table: "Table IV.2",
        pdfPage: 58,
        componentType: "PANEL"
      },
      {
        table: "Table IV.3",
        pdfPage: 61,
        componentType: "REFRIGERATION_SYSTEM"
      }
    ],
    energyTableEvidence: {
      pdfPage: ENERGY_TABLE_PDF_PAGE,
      documentPage: ENERGY_TABLE_DOCUMENT_PAGE,
      tables: ["Table IV.31", "Table IV.32", "Table IV.33"]
    },
    fields: rows.map((row) => ({
      componentType: row.componentType,
      equipmentClass: row.equipmentClass,
      ...(row.sourceClassCode
        ? { sourceClassCode: row.sourceClassCode }
        : {}),
      componentSubtype: row.componentSubtype,
      temperatureClass: row.temperatureClass,
      indoorOutdoorConfiguration:
        row.indoorOutdoorConfiguration,
      sourceTable: row.sourceTable,
      baseline: row.baseline,
      tsl3: row.tsl3,
      unit: row.nativeUnit,
      sourceLocations: row.sourceLocations
    })),
    limitations: [
      "Only the ten class rows retained in the reviewed fixture are supported.",
      "Panel intensities require a project-supplied in-scope panel area.",
      "The values are DOE component estimates, not measured whole-box project energy."
    ]
  };
  return {
    observed,
    fingerprintSha256: sha256Json(observed),
    rows
  };
}

export async function inspectDoeWalkInSchema(
  artifactPath,
  fixturePath = DEFAULT_DOE_WALKIN_FIXTURE_URL
) {
  const [evidence, fixture] = await Promise.all([
    loadDoeWalkInPdfEvidence(artifactPath),
    readDoeWalkInReviewedFixture(fixturePath)
  ]);
  return schemaFromDoeWalkInEvidence(evidence, fixture);
}

export { ROW_DEFINITIONS };
