import crypto from "node:crypto";

import * as cheerio from "cheerio";
import makeFetchCookie from "fetch-cookie";

import {
  normalizeClassificationCode,
  normalizeCslbDate,
} from "./import-cslb-contractors.mjs";

const CSLB_SEARCH_URL =
  "https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx";
const USER_AGENT =
  "RetroFi contractor directory resolution/1.0 (official CSLB verification)";

export function createCslbLiveClient({
  fetchImpl = fetch,
  minimumIntervalMs = 150,
  now = () => new Date(),
  sleep = defaultSleep,
} = {}) {
  let nextRequestAt = 0;

  async function throttle() {
    const delayMs = Math.max(0, nextRequestAt - Date.now());
    if (delayMs) await sleep(delayMs);
    nextRequestAt = Date.now() + minimumIntervalMs;
  }

  async function submitSearch(fields) {
    let lastError;
    for (let attempt = 1; attempt <= 3; attempt += 1) {
      try {
        await throttle();
        const cookieFetch = makeFetchCookie(fetchImpl);
        const searchResponse = await cookieFetch(CSLB_SEARCH_URL, {
          headers: { "user-agent": USER_AGENT },
          redirect: "follow",
          signal: AbortSignal.timeout(30_000),
        });
        if (!searchResponse.ok) {
          throw new Error(
            `CSLB search page returned HTTP ${searchResponse.status}.`,
          );
        }
        const searchHtml = await searchResponse.text();
        const $ = cheerio.load(searchHtml);
        const body = new URLSearchParams({
          __VIEWSTATE: $("#__VIEWSTATE").attr("value") || "",
          __VIEWSTATEGENERATOR:
            $("#__VIEWSTATEGENERATOR").attr("value") || "",
          __EVENTVALIDATION:
            $("#__EVENTVALIDATION").attr("value") || "",
          ...fields,
        });
        await throttle();
        const result = await cookieFetch(CSLB_SEARCH_URL, {
          body,
          headers: {
            "content-type": "application/x-www-form-urlencoded",
            referer: CSLB_SEARCH_URL,
            "user-agent": USER_AGENT,
          },
          method: "POST",
          redirect: "follow",
          signal: AbortSignal.timeout(30_000),
        });
        if (!result.ok) {
          throw new Error(
            `CSLB search submission returned HTTP ${result.status}.`,
          );
        }
        return {
          html: await result.text(),
          retrievedAt: now().toISOString(),
          url: result.url,
        };
      } catch (error) {
        lastError = error;
        if (attempt < 3) await sleep(250 * attempt);
      }
    }
    throw lastError;
  }

  return {
    async lookupLicense(licenseNumber) {
      const normalized = normalizeLicenseNumber(licenseNumber);
      if (!normalized) {
        throw new Error(`Invalid CSLB license number: ${licenseNumber}`);
      }
      return submitSearch({
        "ctl00$MainContent$Contractor_License_Number_Search": " ",
        "ctl00$MainContent$LicNo": normalized,
      });
    },

    async searchBusinessName(businessName) {
      const query = clean(businessName).slice(0, 35);
      if (!query) throw new Error("CSLB business-name search is empty.");
      return submitSearch({
        "ctl00$MainContent$Contractor_Business_Name_Button": " ",
        "ctl00$MainContent$NextName": query,
      });
    },
  };
}

export function parseCslbBusinessNameResults(html) {
  const $ = cheerio.load(html);
  const results = [];
  $('a[id^="MainContent_dlMain_hlLicense_"]').each((_, element) => {
    const link = $(element);
    const table = link.closest("table");
    const suffix = (link.attr("id") || "").split("_").at(-1);
    const licenseNumber = normalizeLicenseNumber(link.text());
    if (!licenseNumber) return;
    results.push({
      businessName: clean(
        table.find(`#MainContent_dlMain_lblName_${suffix}`).text(),
      ),
      city: clean(
        table.find(`#MainContent_dlMain_lblCity_${suffix}`).text(),
      ),
      licenseNumber,
      nameType: clean(
        table.find(`#MainContent_dlMain_lblType_${suffix}`).text(),
      ),
      status: clean(
        table
          .find(`#MainContent_dlMain_lblLicenseStatus_${suffix}`)
          .text(),
      ),
      url: new URL(
        link.attr("href"),
        "https://www.cslb.ca.gov",
      ).href,
    });
  });
  return [
    ...new Map(
      results.map((result) => [
        `${result.licenseNumber}|${normalizeBusinessName(
          result.businessName,
        )}|${result.nameType}`,
        result,
      ]),
    ).values(),
  ];
}

export function parseCslbLicenseDetail(html, sourceUrl = "") {
  const $ = cheerio.load(html);
  const licenseNumber = normalizeLicenseNumber(
    $("#MainContent_Header2Detail").text(),
  );
  if (!licenseNumber) {
    return {
      found: false,
      sourceUrl,
    };
  }

  const busInfo = $("#MainContent_BusInfo").clone();
  busInfo.find("br").replaceWith("\n");
  const lines = busInfo
    .text()
    .split(/\n/)
    .map(clean)
    .filter(Boolean);
  const businessName = lines[0] || "";
  const dbaNames = lines
    .filter((line) => /^dba\s+/i.test(line))
    .map((line) => clean(line.replace(/^dba\s+/i, "")));
  const phoneLine = lines.find((line) =>
    /^Business Phone Number:/i.test(line),
  );
  const phone = clean(
    phoneLine?.replace(/^Business Phone Number:/i, "") || "",
  );
  const cityLineIndex = lines.findIndex((line) =>
    /,\s*CA\s+\d{5}(?:-\d{4})?$/i.test(line),
  );
  const cityMatch =
    cityLineIndex >= 0
      ? lines[cityLineIndex].match(
          /^(.*?),\s*CA\s+(\d{5}(?:-\d{4})?)$/i,
        )
      : null;
  const addressStart = 1 + dbaNames.length;
  const addressLines =
    cityLineIndex > addressStart
      ? lines.slice(addressStart, cityLineIndex)
      : [];
  const statusText = clean($("#MainContent_Status").text());
  const classificationLinks = $(
    '#MainContent_ClassCellTable a[href*="Class="]',
  ).toArray();
  const licenseClassifications = [
    ...new Set(
      classificationLinks
        .map((link) => {
          const href = $(link).attr("href") || "";
          const classParameter = new URL(
            href,
            "https://www.cslb.ca.gov",
          ).searchParams.get("Class");
          return normalizeClassificationCode(
            classParameter || $(link).text().split("-")[0],
          );
        })
        .filter(Boolean),
    ),
  ].sort(compareStrings);

  const record = {
    found: true,
    licenseNumber,
    businessName,
    dbaNames,
    businessAddress: cleanObject({
      line1: addressLines.join(", "),
      city: cityMatch?.[1],
      state: cityMatch ? "CA" : "",
      postalCode: cityMatch?.[2],
    }),
    phone,
    licenseStatus: statusText,
    primaryStatus: statusCategory(statusText),
    licenseIssueDate:
      normalizeCslbDate($("#MainContent_IssDt").text()) || undefined,
    licenseExpirationDate:
      normalizeCslbDate($("#MainContent_ExpDt").text()) || undefined,
    licenseClassifications,
    classificationNames: classificationLinks.map((link) =>
      clean($(link).text()),
    ),
    usableStatus: isUsableCslbStatus(statusText),
    sourceUrl:
      sourceUrl ||
      `https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/LicenseDetail.aspx?LicNum=${licenseNumber}`,
  };
  return {
    ...record,
    sourceRecordHash: sha256Text(stableStringify(record)),
  };
}

export function buildCslbBusinessNameQueries(value) {
  const source = clean(value);
  const dbaParts = source.split(/\s+(?:dba|d\/b\/a)\s+/i).map(clean);
  const candidates = [
    source,
    ...dbaParts,
    stripLegalSuffixes(source),
    stripLegalSuffixes(dbaParts[0] || ""),
  ];
  const queries = [];
  for (const candidate of candidates) {
    const compact = clean(candidate);
    if (!compact) continue;
    const bounded = compact.slice(0, 35);
    if (!queries.some((query) => normalizeBusinessName(query) === normalizeBusinessName(bounded))) {
      queries.push(bounded);
    }
    if (compact.length > 15) {
      const prefix = compact.slice(0, 15).trim();
      if (
        !queries.some(
          (query) =>
            normalizeBusinessName(query) ===
            normalizeBusinessName(prefix),
        )
      ) {
        queries.push(prefix);
      }
    }
  }
  return queries.slice(0, 4);
}

export function businessNamesCompatible(left, right) {
  const leftVariants = businessNameVariants(left);
  const rightVariants = businessNameVariants(right);
  return [...leftVariants].some((leftValue) =>
    [...rightVariants].some((rightValue) => {
      if (leftValue === rightValue) return true;
      const leftCompact = leftValue.replace(/\s+/g, "");
      const rightCompact = rightValue.replace(/\s+/g, "");
      if (
        leftCompact.length >= 4 &&
        leftCompact === rightCompact
      ) {
        return true;
      }
      if (
        Math.min(leftValue.length, rightValue.length) >= 6 &&
        (leftValue.includes(rightValue) ||
          rightValue.includes(leftValue))
      ) {
        return true;
      }
      const leftTokens = comparableNameTokens(leftValue);
      const rightTokens = comparableNameTokens(rightValue);
      const overlap = [...leftTokens].filter((token) =>
        rightTokens.has(token),
      ).length;
      return (
        overlap >= 2 &&
        overlap / Math.min(leftTokens.size, rightTokens.size) >= 0.75
      );
    }),
  );
}

export function assessCslbIdentity({
  directoryRecord,
  detail,
  sourceProvidedLicense = false,
}) {
  const officialNames = [
    detail.businessName,
    ...(detail.dbaNames || []),
  ];
  const nameMatch = officialNames.some((name) =>
    businessNamesCompatible(directoryRecord.businessName, name),
  );
  const phoneMatch =
    normalizePhone(directoryRecord.phone) &&
    normalizePhone(directoryRecord.phone) === normalizePhone(detail.phone);
  const directoryZip = normalizeZip(
    directoryRecord.zip || directoryRecord.address?.postalCode,
  );
  const zipMatch =
    directoryZip &&
    directoryZip === normalizeZip(detail.businessAddress?.postalCode);
  const cityMatch =
    normalizeBusinessName(directoryRecord.address?.city) &&
    normalizeBusinessName(directoryRecord.address?.city) ===
      normalizeBusinessName(detail.businessAddress?.city);
  const addressMatch =
    normalizeBusinessName(directoryRecord.address?.line1) &&
    normalizeBusinessName(directoryRecord.address?.line1) ===
      normalizeBusinessName(detail.businessAddress?.line1);

  const corroboratingMatches = [
    nameMatch && "business_name",
    phoneMatch && "phone",
    addressMatch && "address",
    zipMatch && "zip",
    cityMatch && "city",
  ].filter(Boolean);
  const verified = Boolean(
    nameMatch ||
      (phoneMatch && (zipMatch || cityMatch || addressMatch)) ||
      (sourceProvidedLicense && phoneMatch),
  );
  const hasComparableIdentity = Boolean(
    directoryRecord.businessName ||
      directoryRecord.phone ||
      directoryZip ||
      directoryRecord.address?.line1,
  );

  return {
    verified,
    conflict:
      sourceProvidedLicense && hasComparableIdentity && !verified,
    corroboratingMatches,
    method: sourceProvidedLicense
      ? "source_license_plus_official_cslb_detail"
      : "official_cslb_name_search_and_detail",
  };
}

export function isUsableCslbStatus(statusText) {
  const normalized = clean(statusText).toLowerCase();
  if (
    /inactive|suspend|expired|cancel|revok|not able to contract|not current/.test(
      normalized,
    )
  ) {
    return false;
  }
  return /\bcurrent and active\b|\bactive and able to contract\b|\blicense is active\b|\bthis license is current\b/.test(
    normalized,
  );
}

export function normalizeBusinessName(value) {
  return clean(value)
    .toUpperCase()
    .replace(/&/g, " AND ")
    .replace(/[^A-Z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function businessNameVariants(value) {
  const source = clean(value);
  const normalized = normalizeBusinessName(value);
  const dbaParts = normalized.split(/\s+(?:DBA|D B A)\s+/);
  const separatedParts = source
    .split(
      /\s+(?:dba|d\/b\/a)\s+|\s+-\s+|\s*\([^)]*\)\s*/i,
    )
    .map(normalizeBusinessName);
  const values = new Set();
  for (const part of [normalized, ...dbaParts, ...separatedParts]) {
    const stripped = stripLegalSuffixes(part);
    if (part) values.add(part);
    if (stripped) values.add(stripped);
    if (stripped.startsWith("THE ")) values.add(stripped.slice(4));
  }
  return values;
}

function comparableNameTokens(value) {
  const ignored = new Set([
    "AND",
    "CO",
    "COMPANY",
    "CORP",
    "CORPORATION",
    "INC",
    "INCORPORATED",
    "L",
    "LLC",
    "LP",
    "THE",
  ]);
  return new Set(
    normalizeBusinessName(value)
      .split(" ")
      .filter((token) => token && !ignored.has(token))
      .map((token) =>
        token
          .replace(/IES$/, "Y")
          .replace(/ING$/, "")
          .replace(/S$/, ""),
      )
      .filter(Boolean),
  );
}

function stripLegalSuffixes(value) {
  return normalizeBusinessName(value)
    .replace(
      /\b(?:INCORPORATED|INC|LLC|L L C|CORPORATION|CORP|COMPANY|CO|LP|L P|LIMITED)\b/g,
      " ",
    )
    .replace(/\s+/g, " ")
    .trim();
}

function statusCategory(statusText) {
  const normalized = clean(statusText).toLowerCase();
  if (isUsableCslbStatus(statusText)) return "ACTIVE";
  if (normalized.includes("inactive")) return "INACTIVE";
  if (normalized.includes("suspend")) return "SUSPENDED";
  if (normalized.includes("expired")) return "EXPIRED";
  if (normalized.includes("cancel")) return "CANCELLED";
  if (normalized.includes("revok")) return "REVOKED";
  return "UNUSABLE";
}

function normalizeLicenseNumber(value) {
  const normalized = clean(value).replace(/\D/g, "").replace(/^0+/, "");
  return /^\d{1,8}$/.test(normalized) ? normalized : "";
}

function normalizePhone(value) {
  const digits = clean(value).replace(/\D/g, "");
  return digits.length === 11 && digits.startsWith("1")
    ? digits.slice(1)
    : digits;
}

function normalizeZip(value) {
  return clean(value).match(/\d{5}/)?.[0] || "";
}

function cleanObject(value) {
  return Object.fromEntries(
    Object.entries(value)
      .map(([key, child]) => [key, clean(child)])
      .filter(([, child]) => child),
  );
}

function clean(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function sha256Text(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function stableStringify(value) {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(",")}]`;
  }
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort(compareStrings)
      .map(
        (key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`,
      )
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function compareStrings(left, right) {
  return String(left).localeCompare(String(right));
}

function defaultSleep(delayMs) {
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}
