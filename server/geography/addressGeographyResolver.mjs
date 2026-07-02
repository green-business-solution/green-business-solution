export const ADDRESS_GEOGRAPHY_SCHEMA_VERSION = "address-geography-v1";

const censusGeocoderUrl = "https://geocoding.geo.census.gov/geocoder/geographies/onelineaddress";
const geocodioUrl = "https://api.geocod.io/v1.7/geocode";
const defaultTimeoutMs = 7000;

export async function resolveAddressGeography(address, options = {}) {
  const normalizedAddress = normalizeAddress(address);
  const resolvedAt = options.resolvedAt || new Date().toISOString();

  if (!normalizedAddress) {
    return baseResult({
      status: "not_attempted",
      provider: null,
      resolvedAt,
      notes: ["No address was provided."]
    });
  }

  const fetchImpl = options.fetchImpl || globalThis.fetch;
  if (typeof fetchImpl !== "function") {
    return baseResult({
      status: "failed",
      provider: null,
      resolvedAt,
      notes: ["Fetch is not available in this runtime."]
    });
  }

  const providerAttempts = [];
  const censusResult = await resolveWithCensusGeocoder(normalizedAddress, {
    fetchImpl,
    resolvedAt,
    timeoutMs: options.timeoutMs
  });
  providerAttempts.push(providerAttempt(censusResult));
  if (censusResult.status === "matched") {
    return {
      ...censusResult,
      normalizedAddress,
      providerAttempts
    };
  }

  const geocodioApiKey = options.geocodioApiKey || process.env.GBS_GEOCODIO_API_KEY || process.env.GEOCODIO_API_KEY || "";
  if (geocodioApiKey) {
    if (typeof options.reserveGeocodioLookup === "function") {
      const quota = await options.reserveGeocodioLookup({
        address: normalizedAddress,
        resolvedAt
      });
      if (!quota?.allowed) {
        providerAttempts.push({
          provider: "geocodio",
          status: "skipped",
          notes: quota?.notes || ["Geocodio fallback was skipped by the quota guard."],
          quota: {
            reason: quota?.reason || "quota_guard_blocked",
            usageDate: quota?.usageDate || null,
            usageCount: quota?.usageCount ?? null,
            limit: quota?.limit ?? null
          }
        });
        return {
          ...baseResult({
            status: "unmatched",
            provider: null,
            resolvedAt,
            notes: [
              "Census Geocoder did not return a usable address match.",
              ...(quota?.notes || ["Geocodio fallback was skipped by the quota guard."])
            ]
          }),
          normalizedAddress,
          providerAttempts
        };
      }
    }

    const geocodioResult = await resolveWithGeocodio(normalizedAddress, {
      fetchImpl,
      geocodioApiKey,
      resolvedAt,
      timeoutMs: options.timeoutMs
    });
    providerAttempts.push(providerAttempt(geocodioResult));
    if (geocodioResult.status === "matched") {
      return {
        ...geocodioResult,
        normalizedAddress,
        providerAttempts
      };
    }
  }

  return {
    ...baseResult({
      status: providerAttempts.some((attempt) => attempt.status === "failed") ? "failed" : "unmatched",
      provider: null,
      resolvedAt,
      notes: [
        "Census Geocoder did not return a usable address match.",
        geocodioApiKey ? "Geocodio fallback did not return a usable address match." : "Geocodio fallback was not configured."
      ]
    }),
    normalizedAddress,
    providerAttempts
  };
}

export async function resolveWithCensusGeocoder(address, options = {}) {
  const url = new URL(censusGeocoderUrl);
  url.searchParams.set("address", address);
  url.searchParams.set("benchmark", options.benchmark || "Public_AR_Current");
  url.searchParams.set("vintage", options.vintage || "Current_Current");
  url.searchParams.set("format", "json");

  try {
    const payload = await fetchJson(url, options);
    const match = payload?.result?.addressMatches?.[0];
    if (!match) {
      return baseResult({
        status: "unmatched",
        provider: "census_geocoder",
        resolvedAt: options.resolvedAt,
        notes: ["Census Geocoder returned no address matches."]
      });
    }

    const geographies = match.geographies || {};
    const state = firstGeography(geographies, ["States"]);
    const county = firstGeography(geographies, ["Counties"]);
    const place = firstGeography(geographies, ["Incorporated Places", "County Subdivisions", "Places"]);
    const tract = firstGeography(geographies, ["Census Tracts"]);
    const block = firstGeography(geographies, ["Census Blocks", "2020 Census Blocks"]);

    return matchedResult({
      provider: "census_geocoder",
      resolvedAt: options.resolvedAt,
      matchedAddress: match.matchedAddress || match.addressComponents?.matchedAddress || null,
      coordinates: coordinatesFromCensus(match.coordinates),
      stateCode: state?.STUSAB || state?.BASENAME || null,
      stateFips: state?.STATE || state?.GEOID || null,
      countyFips: county?.GEOID || null,
      countyName: county?.NAME || county?.BASENAME || null,
      placeGeoid: place?.GEOID || null,
      placeName: place?.NAME || place?.BASENAME || null,
      censusTractGeoid: tract?.GEOID || null,
      censusBlockGeoid: block?.GEOID || null,
      zip5: extractZip5(match.matchedAddress || address),
      rawProvider: {
        tigerLineId: match.tigerLine?.tigerLineId || null,
        side: match.tigerLine?.side || null
      }
    });
  } catch (error) {
    return baseResult({
      status: "failed",
      provider: "census_geocoder",
      resolvedAt: options.resolvedAt,
      notes: [`Census Geocoder request failed: ${safeErrorMessage(error)}`]
    });
  }
}

export async function resolveWithGeocodio(address, options = {}) {
  const url = new URL(geocodioUrl);
  url.searchParams.set("q", address);
  url.searchParams.set("fields", "census2020");
  url.searchParams.set("api_key", options.geocodioApiKey);

  try {
    const payload = await fetchJson(url, options);
    const match = payload?.results?.[0];
    if (!match) {
      return baseResult({
        status: "unmatched",
        provider: "geocodio",
        resolvedAt: options.resolvedAt,
        notes: ["Geocodio returned no address matches."]
      });
    }

    const components = match.address_components || {};
    const census = match.fields?.census2020 || match.fields?.census || {};
    const geographies = census.geographies || {};
    const county = firstGeography(geographies, ["Counties"]);
    const place = firstGeography(geographies, ["Incorporated Places", "County Subdivisions", "Places"]);
    const tract = firstGeography(geographies, ["Census Tracts"]);
    const block = firstGeography(geographies, ["Census Blocks", "2020 Census Blocks"]);
    const countyFips = county?.GEOID || census.county_fips || census.countyFips || null;
    const tractGeoid = tract?.GEOID || census.tract_geoid || census.tractGEOID || census.tract_code || null;
    const blockGeoid = block?.GEOID || census.block_geoid || census.blockGEOID || census.block_code || null;

    return matchedResult({
      provider: "geocodio",
      resolvedAt: options.resolvedAt,
      matchedAddress: match.formatted_address || null,
      coordinates: coordinatesFromGeocodio(match.location),
      stateCode: components.state || components.state_abbreviation || census.state || null,
      stateFips: census.state_fips || null,
      countyFips,
      countyName: county?.NAME || components.county || null,
      placeGeoid: place?.GEOID || null,
      placeName: place?.NAME || components.city || null,
      censusTractGeoid: tractGeoid,
      censusBlockGeoid: blockGeoid,
      zip5: components.zip || extractZip5(match.formatted_address || address),
      rawProvider: {
        accuracy: match.accuracy ?? null,
        accuracyType: match.accuracy_type || null,
        source: match.source || null
      }
    });
  } catch (error) {
    return baseResult({
      status: "failed",
      provider: "geocodio",
      resolvedAt: options.resolvedAt,
      notes: [`Geocodio request failed: ${safeErrorMessage(error)}`]
    });
  }
}

export function normalizeAddress(address) {
  return String(address || "")
    .trim()
    .replace(/\s+/g, " ");
}

async function fetchJson(url, options) {
  const timeoutMs = Number.isFinite(options.timeoutMs) ? options.timeoutMs : defaultTimeoutMs;
  const controller = typeof AbortController === "function" ? new AbortController() : null;
  const timeout = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;
  try {
    const response = await options.fetchImpl(String(url), {
      headers: { accept: "application/json" },
      signal: controller?.signal
    });
    if (!response?.ok) {
      throw new Error(`HTTP ${response?.status || "unknown"}`);
    }
    return response.json();
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

function matchedResult(values) {
  return {
    ...baseResult({
      status: "matched",
      provider: values.provider,
      resolvedAt: values.resolvedAt,
      notes: []
    }),
    matchedAddress: values.matchedAddress,
    coordinates: values.coordinates,
    country: "US",
    stateCode: values.stateCode || null,
    stateFips: values.stateFips || null,
    countyFips: values.countyFips || null,
    countyName: values.countyName || null,
    placeGeoid: values.placeGeoid || null,
    placeName: values.placeName || null,
    censusTractGeoid: values.censusTractGeoid || null,
    censusBlockGeoid: values.censusBlockGeoid || null,
    zip5: values.zip5 || null,
    rawProvider: values.rawProvider || {}
  };
}

function baseResult({ status, provider, resolvedAt, notes }) {
  return {
    schemaVersion: ADDRESS_GEOGRAPHY_SCHEMA_VERSION,
    status,
    provider,
    resolvedAt: resolvedAt || new Date().toISOString(),
    matchedAddress: null,
    coordinates: null,
    country: null,
    stateCode: null,
    stateFips: null,
    countyFips: null,
    countyName: null,
    placeGeoid: null,
    placeName: null,
    censusTractGeoid: null,
    censusBlockGeoid: null,
    zip5: null,
    rawProvider: {},
    notes: notes || []
  };
}

function firstGeography(geographies, names) {
  for (const name of names) {
    const rows = geographies?.[name];
    if (Array.isArray(rows) && rows[0]) return rows[0];
  }
  return null;
}

function coordinatesFromCensus(coordinates) {
  const lng = Number(coordinates?.x);
  const lat = Number(coordinates?.y);
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
}

function coordinatesFromGeocodio(location) {
  const lat = Number(location?.lat);
  const lng = Number(location?.lng);
  return Number.isFinite(lat) && Number.isFinite(lng) ? { lat, lng } : null;
}

function extractZip5(value) {
  const match = String(value || "").match(/\b(\d{5})(?:-\d{4})?\b/);
  return match ? match[1] : null;
}

function providerAttempt(result) {
  return {
    provider: result.provider,
    status: result.status,
    notes: result.notes || []
  };
}

function safeErrorMessage(error) {
  if (error?.name === "AbortError") return "request timed out";
  return String(error?.message || error || "unknown error").slice(0, 180);
}
