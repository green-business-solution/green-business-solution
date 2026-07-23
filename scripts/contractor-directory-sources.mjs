import crypto from "node:crypto";
import fs from "node:fs";
import fsPromises from "node:fs/promises";
import path from "node:path";

import * as cheerio from "cheerio";
import ExcelJS from "exceljs";

const USER_AGENT =
  "RetroFi contractor directory consolidation/1.0 (public official sources)";

export const SOURCE_CATALOG = [
  {
    id: "socalgas_trade_pro",
    name: "SoCalGas Trade Professional Directory",
    category: "primary",
    status: "processed",
    url: "https://www.socalgas.com/business/savings/trade-professionals/directory",
  },
  {
    id: "socalren_trade_ally",
    name: "SoCalREN Public Agencies Trade Allies",
    category: "primary",
    status: "processed",
    url: "https://socalren.org/agencies/find-trade-ally",
  },
  {
    id: "socalren_multifamily_contractor",
    name: "SoCalREN Multifamily Contractors",
    category: "primary",
    status: "processed",
    url: "https://socalren.org/multifamily/contractors",
  },
  {
    id: "tech_clean_california",
    name: "TECH Clean California Contractor Project Data",
    category: "primary",
    status: "processed",
    url: "https://techcleanca.com/heat-pump-data/contractor-data/",
  },
  {
    id: "socalren_residential_contractor",
    name: "SoCalREN Residential Contractors",
    category: "secondary",
    status: "processed",
    url: "https://socalren.org/residential/homeowners/find-a-contractor",
  },
  {
    id: "bpi_certified_company",
    name: "Building Performance Institute Company Locator",
    category: "secondary",
    status: "processed",
    url: "https://www.bpi.org/pages/locator/?type=1&search=1&certs=&lo_name=&lo_state=6&lo_results=all",
  },
  {
    id: "pge_trade_professional_alliance",
    name: "PG&E Trade Professional Alliance",
    category: "primary",
    status: "not_processed",
    url: "https://www.pge.com/en/save-energy-and-money/energy-saving-programs/trade-professional-alliance.html",
    reason:
      "The public directory is a location-driven embedded form and exposes no stable statewide record list or official export.",
  },
  {
    id: "sce_trade_professional",
    name: "SCE Find-A-Vendor",
    category: "primary",
    status: "not_processed",
    url: "https://sce-trade-ally-community.my.site.com/tradeally/s/vendor-search",
    reason:
      "The public Salesforce directory requires interactive search criteria and exposes no stable statewide record list or official export.",
  },
  {
    id: "sdge_trade_professional",
    name: "SDG&E Find a Trade Professional",
    category: "primary",
    status: "not_processed",
    url: "https://www.sdge.com/find-trade-pro",
    reason:
      "The public form requires combinations of sector, technology, service, and business type and exposes no complete official export.",
  },
  {
    id: "switch_is_on",
    name: "The Switch Is On Contractor Finder",
    category: "secondary",
    status: "not_processed",
    url: "https://switchison.org/contractors/",
    reason:
      "The interactive finder has no stable public statewide export, and automated retrieval of its public page is access-restricted.",
  },
  {
    id: "bayren",
    name: "BayREN Contractor Resources",
    category: "additional",
    status: "not_processed",
    url: "https://www.bayren.org/contractors",
    reason:
      "The available contractor list is a stale 2024 Home+ PDF for a program that has closed, not a current directory.",
  },
  {
    id: "ladwp",
    name: "LADWP Contractor Resources",
    category: "additional",
    status: "not_processed",
    url: "https://www.ladwp.com/commercial-services/programs-and-rebates-commercial",
    reason:
      "No current official public contractor directory or statewide-compatible export was found.",
  },
  {
    id: "smud_contractor_network",
    name: "SMUD Contractor Network",
    category: "additional",
    status: "not_processed",
    url: "https://www.smudcontractornetwork.org/all-commercial-contractors",
    reason:
      "The public directory requires an interactive disclaimer and filtered search and exposes no complete official export.",
  },
];

export async function collectOfficialDirectoryRecords({
  outputDirectory,
  fetchedAt = new Date().toISOString(),
  fetchImpl = fetch,
  quiet = false,
}) {
  const rawDirectory = path.join(outputDirectory, "raw");
  await fsPromises.mkdir(rawDirectory, { recursive: true });
  const records = [];
  const snapshots = [];
  const sourceResults = [];

  for (const source of SOURCE_CATALOG) {
    if (source.status !== "processed") {
      sourceResults.push({
        ...source,
        directoryEntryCount: 0,
      });
      continue;
    }

    try {
      let result;
      if (source.id === "socalgas_trade_pro") {
        result = await collectSocalGas({
          fetchImpl,
          fetchedAt,
          outputDirectory,
          source,
        });
      } else if (source.id === "tech_clean_california") {
        result = await collectTech({
          fetchImpl,
          fetchedAt,
          outputDirectory,
          source,
        });
      } else {
        result = await collectHtmlSource({
          fetchImpl,
          fetchedAt,
          outputDirectory,
          source,
        });
      }
      const sourceRecords = deduplicateSourceRecords(result.records);
      records.push(...sourceRecords);
      snapshots.push(...result.snapshots);
      sourceResults.push({
        ...source,
        directoryEntryCount: sourceRecords.length,
        snapshotCount: result.snapshots.length,
      });
      if (!quiet) {
        console.log(
          `${source.name}: ${sourceRecords.length} public directory entries.`,
        );
      }
    } catch (error) {
      sourceResults.push({
        ...source,
        status: "source_error",
        directoryEntryCount: 0,
        reason: error?.message || String(error),
      });
      if (!quiet) {
        console.warn(`${source.name}: ${error?.message || error}`);
      }
    }
  }

  return {
    records: deduplicateSourceRecords(records),
    snapshots,
    sourceResults,
  };
}

export async function loadReviewedDirectoryRecords({
  report,
  reportPath,
}) {
  const reportDirectory = path.dirname(reportPath);
  const snapshots = [];
  for (const snapshot of report.sourceSnapshots || []) {
    const snapshotPath = path.resolve(reportDirectory, snapshot.relativePath);
    const sha256 = await sha256File(snapshotPath);
    if (sha256 !== snapshot.sha256) {
      throw new Error(
        `Reviewed source hash mismatch for ${snapshot.relativePath}.`,
      );
    }
    snapshots.push({ ...snapshot, absolutePath: snapshotPath });
  }

  const records = [];
  for (const source of SOURCE_CATALOG.filter(
    (candidate) => candidate.status === "processed",
  )) {
    const sourceSnapshots = snapshots.filter(
      (snapshot) => snapshot.sourceId === source.id,
    );
    if (source.id === "tech_clean_california") {
      const workbook = sourceSnapshots.find((snapshot) =>
        snapshot.relativePath.endsWith(".xlsx"),
      );
      if (!workbook) {
        throw new Error(`Reviewed TECH workbook snapshot is missing.`);
      }
      records.push(
        ...(await parseTechWorkbook(workbook.absolutePath, {
          fetchedAt: report.startedAt,
          pageUrl: workbook.url,
          source,
        })),
      );
      continue;
    }
    for (const snapshot of sourceSnapshots) {
      if (!snapshot.relativePath.endsWith(".html")) continue;
      const html = await fsPromises.readFile(snapshot.absolutePath, "utf8");
      records.push(
        ...parseHtmlForSource(source, html, {
          fetchedAt: report.startedAt,
          pageUrl: snapshot.url,
        }),
      );
    }
  }

  return {
    records: deduplicateSourceRecords(records),
    snapshots,
    sourceResults: report.sources,
  };
}

async function collectHtmlSource({
  fetchImpl,
  fetchedAt,
  outputDirectory,
  source,
}) {
  const response = await fetchWithRetries(source.url, { fetchImpl });
  const html = await response.text();
  const snapshot = await writeSnapshot({
    body: html,
    contentType: "text/html",
    fetchedAt,
    filename: "directory.html",
    outputDirectory,
    source,
    url: response.url || source.url,
  });
  return {
    records: parseHtmlForSource(source, html, {
      fetchedAt,
      pageUrl: response.url || source.url,
    }),
    snapshots: [snapshot],
  };
}

async function collectSocalGas({
  fetchImpl,
  fetchedAt,
  outputDirectory,
  source,
}) {
  const records = [];
  const snapshots = [];
  let priorPageFingerprint = "";
  for (let page = 0; page < 25; page += 1) {
    const url = `${source.url}?sort_by=title&page=${page}`;
    const response = await fetchWithRetries(url, { fetchImpl });
    const html = await response.text();
    const pageRecords = parseSocalGas(html, {
      fetchedAt,
      pageUrl: response.url || url,
      source,
    });
    if (!pageRecords.length) break;
    const fingerprint = sha256Text(
      pageRecords.map((record) => record.businessName).join("|"),
    );
    if (fingerprint === priorPageFingerprint) break;
    priorPageFingerprint = fingerprint;
    records.push(...pageRecords);
    snapshots.push(
      await writeSnapshot({
        body: html,
        contentType: "text/html",
        fetchedAt,
        filename: `directory-page-${String(page).padStart(2, "0")}.html`,
        outputDirectory,
        source,
        url: response.url || url,
      }),
    );
    if (pageRecords.length < 20) break;
  }
  return { records, snapshots };
}

async function collectTech({
  fetchImpl,
  fetchedAt,
  outputDirectory,
  source,
}) {
  const landingResponse = await fetchWithRetries(source.url, { fetchImpl });
  const landingHtml = await landingResponse.text();
  const landingSnapshot = await writeSnapshot({
    body: landingHtml,
    contentType: "text/html",
    fetchedAt,
    filename: "contractor-data.html",
    outputDirectory,
    source,
    url: landingResponse.url || source.url,
  });
  const $ = cheerio.load(landingHtml);
  const workbookHref = $("a[href]")
    .toArray()
    .map((element) => $(element).attr("href"))
    .find(
      (href) =>
        href &&
        /ContractorProjectData[^/]*\.xlsx(?:$|\?)/i.test(href),
    );
  if (!workbookHref) {
    throw new Error("The TECH contractor workbook link was not found.");
  }
  const workbookUrl = new URL(
    workbookHref,
    landingResponse.url || source.url,
  ).href;
  const workbookResponse = await fetchWithRetries(workbookUrl, {
    fetchImpl,
    timeoutMs: 120_000,
  });
  const workbookBuffer = Buffer.from(await workbookResponse.arrayBuffer());
  const workbookSnapshot = await writeSnapshot({
    body: workbookBuffer,
    contentType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    fetchedAt,
    filename: path.basename(new URL(workbookUrl).pathname),
    outputDirectory,
    source,
    url: workbookResponse.url || workbookUrl,
  });
  const workbookPath = path.join(
    outputDirectory,
    workbookSnapshot.relativePath,
  );
  const records = await parseTechWorkbook(workbookPath, {
    fetchedAt,
    pageUrl: workbookResponse.url || workbookUrl,
    source,
  });
  return {
    records,
    snapshots: [landingSnapshot, workbookSnapshot],
  };
}

function parseHtmlForSource(source, html, context) {
  if (source.id === "socalgas_trade_pro") {
    return parseSocalGas(html, { ...context, source });
  }
  if (source.id === "socalren_trade_ally") {
    return parseSocalRenTradeAllies(html, { ...context, source });
  }
  if (source.id === "socalren_multifamily_contractor") {
    return parseSocalRenMultifamily(html, { ...context, source });
  }
  if (source.id === "socalren_residential_contractor") {
    return parseSocalRenResidential(html, { ...context, source });
  }
  if (source.id === "bpi_certified_company") {
    return parseBpiCompanies(html, { ...context, source });
  }
  return [];
}

export function parseSocalGas(html, context) {
  const $ = cheerio.load(html);
  return $(".vendor-card")
    .toArray()
    .map((element, index) => {
      const card = $(element);
      const text = clean(card.text());
      const businessName = clean(
        card.find(".vendor-name-link, .vendor-name").first().text(),
      );
      const sectors = sectionValues($, card, "Sectors");
      const commercial =
        sectors.some((sector) =>
          /agriculture|commercial|industrial|multifamily|public sector/i.test(
            sector,
          ),
        )
          ? "YES"
          : sectors.length === 1 && /^residential$/i.test(sectors[0])
            ? "NO"
            : "";
      return sourceRecord(context, {
        businessName,
        commercial,
        email: mailto(card),
        phone: tel(card),
        programMemberships: [context.source.id],
        sectors,
        sourceRecordId: `${index}:${businessName}`,
        website: externalWebsite(card, context.source.url),
        address: {
          line1: clean(card.find(".address-line1").first().text()),
          city: clean(card.find(".locality").first().text()),
          state: clean(card.find(".administrative-area").first().text()),
          postalCode: clean(card.find(".postal-code").first().text()),
        },
        sourceText: text,
      });
    })
    .filter((record) => record.businessName);
}

export function parseSocalRenTradeAllies(html, context) {
  const $ = cheerio.load(html);
  return $(".views-row")
    .toArray()
    .map((element, index) => {
      const row = $(element);
      const email = mailto(row);
      if (!email) return null;
      const businessName = clean(row.find("h3").first().text());
      const description = clean(
        row
          .find(".views-field-webform-submission-value")
          .not(":has(h3)")
          .first()
          .text(),
      );
      const serviceAreaText = clean(
        row
          .find(".views-field-webform-submission-value-7 .field-content")
          .text(),
      );
      return sourceRecord(context, {
        businessName,
        commercial: commercialFromText(description),
        description,
        email,
        phone: tel(row),
        programMemberships: [context.source.id],
        serviceAreas: splitServiceAreas(serviceAreaText),
        sourceRecordId: `${index}:${businessName}`,
        sourceText: clean(row.text()),
        website: externalWebsite(row, context.source.url),
      });
    })
    .filter(Boolean);
}

export function parseSocalRenMultifamily(html, context) {
  const $ = cheerio.load(html);
  const candidates = $(".contractor-card").length
    ? $(".contractor-card").toArray()
    : $(".views-row").toArray();
  return candidates
    .map((element, index) => {
      const card = $(element);
      const email = mailto(card);
      const businessName = clean(
        card.find("h2, h3, h4, strong").first().text(),
      );
      if (!email || !businessName) return null;
      return sourceRecord(context, {
        businessName,
        commercial: "YES",
        email,
        phone: tel(card) || phoneFromText(card.text()),
        programMemberships: [context.source.id],
        sourceRecordId: `${index}:${businessName}`,
        sourceText: clean(card.text()),
        website: externalWebsite(card, context.source.url),
      });
    })
    .filter(Boolean);
}

export function parseSocalRenResidential(html, context) {
  const $ = cheerio.load(html);
  return $("div.fac")
    .toArray()
    .map((element, index) => {
      const card = $(element);
      const businessName = clean(card.find("strong").first().text());
      return sourceRecord(context, {
        businessName,
        email: mailto(card),
        phone: tel(card) || phoneFromText(card.text()),
        programMemberships: [context.source.id],
        sourceRecordId: `${index}:${businessName}`,
        sourceText: clean(card.text()),
        website: externalWebsite(card, context.source.url),
      });
    })
    .filter((record) => record.businessName);
}

export function parseBpiCompanies(html, context) {
  const $ = cheerio.load(html);
  const cards = $(".result-contractor").length
    ? $(".result-contractor").toArray()
    : $(".search-result-outer")
        .filter(
          (_, element) =>
            $(element).find(".title-company, .title-goldstar").length > 0,
        )
        .toArray();
  return cards
    .map((element, index) => {
      const card = $(element).closest(".search-result-outer").length
        ? $(element).closest(".search-result-outer")
        : $(element);
      const heading = card.find("h4, b").first().clone();
      heading.find(".title-company, .title-goldstar").remove();
      const businessName = clean(heading.text()).replace(
        /\s*\([^)]*,\s*CA\)\s*$/,
        "",
      );
      const certifications = card
        .find(".search-result-cert-item")
        .toArray()
        .map((certification) => {
          const item = $(certification);
          const name = clean(
            item.attr("title") ||
              item.find("[title]").first().attr("title") ||
              item.text(),
          );
          return name
            ? { issuer: "Building Performance Institute", name }
            : null;
        })
        .filter(Boolean);
      return sourceRecord(context, {
        businessName,
        certifications,
        email: mailto(card),
        phone:
          tel(card) ||
          clean(card.find(".search-result-phone").first().text()),
        sourceRecordId: card.attr("id") || `${index}:${businessName}`,
        sourceText: clean(card.text()),
        website: externalWebsite(card, context.source.url),
      });
    })
    .filter((record) => record.businessName);
}

export async function parseTechWorkbook(workbookPath, context) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(workbookPath);
  const worksheet = workbook.worksheets[0];
  if (!worksheet) throw new Error("The TECH workbook has no worksheet.");
  const headers = new Map();
  worksheet.getRow(1).eachCell((cell, column) => {
    headers.set(clean(cell.text), column);
  });
  for (const required of [
    "Contractor Name",
    "Contractor CSLB #",
    "Contractor ZIP Code",
  ]) {
    if (!headers.has(required)) {
      throw new Error(`TECH workbook is missing ${required}.`);
    }
  }

  const byContractor = new Map();
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return;
    const businessName = clean(
      row.getCell(headers.get("Contractor Name")).text,
    );
    const licenseNumbers = parseLicenseNumbers(
      row.getCell(headers.get("Contractor CSLB #")).text,
    );
    if (!businessName && !licenseNumbers.length) return;
    const zip = clean(
      row.getCell(headers.get("Contractor ZIP Code")).text,
    );
    const keys = licenseNumbers.length
      ? licenseNumbers
      : [`name:${normalizeName(businessName)}:${zip.slice(0, 5)}`];
    for (const key of keys) {
      const licenseNumber = key.startsWith("name:") ? "" : key;
      const existing = byContractor.get(key) || {
        businessName,
        licenseNumber,
        serviceAreas: new Set(),
        zip,
      };
      const serviceAreaColumn = headers.get("Service Area: Counties");
      if (serviceAreaColumn) {
        for (const area of splitServiceAreas(
          row.getCell(serviceAreaColumn).text,
        )) {
          existing.serviceAreas.add(area);
        }
      }
      byContractor.set(key, existing);
    }
  });

  return [...byContractor.values()].map((contractor) =>
    sourceRecord(context, {
      businessName: contractor.businessName,
      commercial: "",
      licenseNumber: contractor.licenseNumber,
      programMemberships: [context.source.id],
      serviceAreas: [...contractor.serviceAreas].sort(compareStrings),
      sourceRecordId: contractor.licenseNumber || contractor.businessName,
      zip: contractor.zip,
    }),
  );
}

function parseLicenseNumbers(value) {
  return [
    ...new Set(
      clean(value)
        .split(/\D+/)
        .map((part) => part.replace(/^0+/, ""))
        .filter((part) => /^\d{5,8}$/.test(part)),
    ),
  ];
}

function sourceRecord(context, input) {
  const website = normalizeWebsite(input.website);
  return {
    sourceId: context.source.id,
    sourceName: context.source.name,
    sourceUrl: context.pageUrl || context.source.url,
    sourceRecordId: clean(input.sourceRecordId),
    retrievedAt: context.fetchedAt,
    businessName: clean(input.businessName),
    licenseNumber: clean(input.licenseNumber).replace(/\D/g, ""),
    phone: clean(input.phone),
    email: normalizeEmail(input.email),
    zip: clean(input.zip || input.address?.postalCode).slice(0, 5),
    address: cleanObject(input.address),
    commercial: input.commercial || "",
    serviceAreas: sortedUnique(input.serviceAreas),
    programMemberships: sortedUnique(input.programMemberships),
    certifications: deduplicateCertifications(input.certifications),
    sectors: sortedUnique(input.sectors),
    description: clean(input.description),
    sourceText: clean(input.sourceText),
    ...(website ? { website } : {}),
  };
}

function sectionValues($, card, heading) {
  const header = card
    .find(".vendor-header")
    .filter((_, element) => clean($(element).text()) === heading)
    .first();
  if (!header.length) return [];
  const container = header.parent();
  return sortedUnique(
    container
      .text()
      .replace(header.text(), "")
      .split(/[\n,|]+/)
      .map(clean)
      .filter(Boolean),
  );
}

function mailto(element) {
  const href = element.find('a[href^="mailto:"]').first().attr("href") || "";
  return decodeURIComponent(href.replace(/^mailto:/i, "").split("?")[0]);
}

function tel(element) {
  const href = element.find('a[href^="tel:"]').first().attr("href") || "";
  return decodeURIComponent(href.replace(/^tel:/i, ""));
}

function externalWebsite(element, sourceUrl) {
  let sourceHost = "";
  try {
    sourceHost = new URL(sourceUrl).hostname.replace(/^www\./, "");
  } catch {
    sourceHost = "";
  }
  for (const anchor of element.find("a[href]").toArray()) {
    const href = clean(element.find(anchor).attr("href"));
    if (!/^https?:\/\//i.test(href)) continue;
    try {
      const url = new URL(href);
      const hostname = url.hostname.toLowerCase().replace(/^www\./, "");
      if (
        !hostname ||
        hostname === sourceHost ||
        hostname.endsWith(`.${sourceHost}`) ||
        /(?:facebook|instagram|linkedin|tiktok|twitter|youtube|yelp)\.com$/i.test(
          hostname,
        )
      ) {
        continue;
      }
      return url.toString();
    } catch {
      continue;
    }
  }
  return "";
}

function phoneFromText(value) {
  return (
    clean(value).match(
      /(?:\+?1[\s.-]?)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/,
    )?.[0] || ""
  );
}

function commercialFromText(value) {
  if (
    /\bcommercial\b|\bbusiness(?:es)?\b|\bindustrial\b|\bmultifamily\b|\bpublic sector\b|\blocal government\b|\bmunicipal\b|\bk-12\b|\binstitutional\b/i.test(
      value,
    )
  ) {
    return "YES";
  }
  if (
    /\b(?:residential|homeowners?|single-family)\s+only\b|\bexclusively residential\b/i.test(
      value,
    )
  ) {
    return "NO";
  }
  return "";
}

function splitServiceAreas(value) {
  return sortedUnique(
    clean(value)
      .split(/\s*(?:,|;|\||\n)\s*/)
      .map(clean)
      .filter(Boolean),
  );
}

function deduplicateSourceRecords(records) {
  const byKey = new Map();
  for (const record of records) {
    const key = [
      record.sourceId,
      record.licenseNumber ||
        `${normalizeName(record.businessName)}:${normalizePhone(record.phone)}:${record.zip}`,
    ].join("|");
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, record);
      continue;
    }
    existing.serviceAreas = sortedUnique([
      ...existing.serviceAreas,
      ...record.serviceAreas,
    ]);
    existing.programMemberships = sortedUnique([
      ...existing.programMemberships,
      ...record.programMemberships,
    ]);
    existing.certifications = deduplicateCertifications([
      ...existing.certifications,
      ...record.certifications,
    ]);
    if (!existing.email) existing.email = record.email;
    if (!existing.phone) existing.phone = record.phone;
    if (!existing.commercial) existing.commercial = record.commercial;
  }
  return [...byKey.values()].sort(
    (left, right) =>
      compareStrings(left.sourceId, right.sourceId) ||
      compareStrings(left.businessName, right.businessName),
  );
}

function deduplicateCertifications(values = []) {
  return [
    ...new Map(
      values
        .filter((value) => value?.name)
        .map((value) => [
          `${clean(value.issuer).toUpperCase()}|${clean(value.name).toUpperCase()}`,
          {
            issuer: clean(value.issuer),
            name: clean(value.name),
          },
        ]),
    ).values(),
  ].sort(
    (left, right) =>
      compareStrings(left.issuer, right.issuer) ||
      compareStrings(left.name, right.name),
  );
}

async function fetchWithRetries(
  url,
  { fetchImpl, maxAttempts = 3, timeoutMs = 30_000 },
) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetchImpl(url, {
        headers: {
          "user-agent": USER_AGENT,
        },
        redirect: "follow",
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status} for ${url}`);
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, 250 * attempt));
      }
    }
  }
  throw lastError;
}

async function writeSnapshot({
  body,
  contentType,
  fetchedAt,
  filename,
  outputDirectory,
  source,
  url,
}) {
  const sourceDirectory = path.join(outputDirectory, "raw", source.id);
  await fsPromises.mkdir(sourceDirectory, { recursive: true });
  const absolutePath = path.join(sourceDirectory, filename);
  await fsPromises.writeFile(absolutePath, body);
  const stat = await fsPromises.stat(absolutePath);
  return {
    sourceId: source.id,
    sourceName: source.name,
    url,
    retrievedAt: fetchedAt,
    contentType,
    relativePath: path.relative(outputDirectory, absolutePath),
    sha256: await sha256File(absolutePath),
    sizeBytes: stat.size,
  };
}

async function sha256File(filePath) {
  const hash = crypto.createHash("sha256");
  for await (const chunk of fs.createReadStream(filePath)) {
    hash.update(chunk);
  }
  return hash.digest("hex");
}

function sha256Text(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function clean(value) {
  return String(value || "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanObject(value = {}) {
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, child]) => [key, clean(child)])
      .filter(([, child]) => child),
  );
}

function normalizeEmail(value) {
  const normalized = clean(value).toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) ? normalized : "";
}

function normalizeWebsite(value) {
  const website = clean(value);
  if (!website) return "";
  try {
    const url = new URL(
      /^https?:\/\//i.test(website)
        ? website
        : `https://${website}`,
    );
    if (!["http:", "https:"].includes(url.protocol)) return "";
    url.hash = "";
    return url.toString();
  } catch {
    return "";
  }
}

function normalizePhone(value) {
  const digits = clean(value).replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("1")
    ? digits.slice(1)
    : digits;
}

function normalizeName(value) {
  return clean(value)
    .toUpperCase()
    .replace(/&/g, " AND ")
    .replace(/[^A-Z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function sortedUnique(values = []) {
  return [...new Set(values.map(clean).filter(Boolean))].sort(compareStrings);
}

function compareStrings(left, right) {
  return String(left).localeCompare(String(right));
}
