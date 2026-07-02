import { describe, expect, it, vi } from "vitest";
import { resolveAddressGeography } from "./addressGeographyResolver.mjs";

describe("address geography resolver", () => {
  it("uses Census Geocoder as the primary provider and extracts Census geography fields", async () => {
    const fetchImpl = vi.fn(async () => jsonResponse(censusMatchPayload()));

    const result = await resolveAddressGeography("  1 Dr Carlton B Goodlett Pl, San Francisco, CA 94102  ", {
      fetchImpl,
      resolvedAt: "2026-07-02T00:00:00.000Z"
    });

    expect(fetchImpl).toHaveBeenCalledTimes(1);
    expect(String(fetchImpl.mock.calls[0][0])).toContain("geocoding.geo.census.gov");
    expect(result.status).toBe("matched");
    expect(result.provider).toBe("census_geocoder");
    expect(result.normalizedAddress).toBe("1 Dr Carlton B Goodlett Pl, San Francisco, CA 94102");
    expect(result.stateCode).toBe("CA");
    expect(result.countyFips).toBe("06075");
    expect(result.placeGeoid).toBe("0667000");
    expect(result.censusTractGeoid).toBe("060750124021");
    expect(result.censusBlockGeoid).toBe("060750124021001");
    expect(result.zip5).toBe("94102");
    expect(result.coordinates).toEqual({ lat: 37.7793, lng: -122.4193 });
  });

  it("uses Geocodio as a fallback when Census does not match and an API key is configured", async () => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(jsonResponse({ result: { addressMatches: [] } }))
      .mockResolvedValueOnce(jsonResponse(geocodioMatchPayload()));

    const result = await resolveAddressGeography("1600 Pennsylvania Ave NW, Washington, DC 20500", {
      fetchImpl,
      geocodioApiKey: "test-key",
      resolvedAt: "2026-07-02T00:00:00.000Z"
    });

    expect(fetchImpl).toHaveBeenCalledTimes(2);
    expect(String(fetchImpl.mock.calls[0][0])).toContain("geocoding.geo.census.gov");
    expect(String(fetchImpl.mock.calls[1][0])).toContain("api.geocod.io");
    expect(result.status).toBe("matched");
    expect(result.provider).toBe("geocodio");
    expect(result.stateCode).toBe("DC");
    expect(result.countyFips).toBe("11001");
    expect(result.censusTractGeoid).toBe("110010062021");
    expect(result.censusBlockGeoid).toBe("110010062021000");
  });

  it("does not fail intake callers when providers are unavailable", async () => {
    const fetchImpl = vi.fn(async () => {
      throw new Error("network unavailable");
    });

    const result = await resolveAddressGeography("123 Main St, Oakland, CA 94612", {
      fetchImpl,
      resolvedAt: "2026-07-02T00:00:00.000Z"
    });

    expect(result.status).toBe("failed");
    expect(result.provider).toBeNull();
    expect(result.providerAttempts).toEqual([
      {
        provider: "census_geocoder",
        status: "failed",
        notes: ["Census Geocoder request failed: network unavailable"]
      }
    ]);
    expect(result.notes).toContain("Geocodio fallback was not configured.");
  });
});

function jsonResponse(payload) {
  return {
    ok: true,
    status: 200,
    async json() {
      return payload;
    }
  };
}

function censusMatchPayload() {
  return {
    result: {
      addressMatches: [
        {
          matchedAddress: "1 DR CARLTON B GOODLETT PL, SAN FRANCISCO, CA, 94102",
          coordinates: { x: -122.4193, y: 37.7793 },
          tigerLine: { tigerLineId: "123", side: "L" },
          geographies: {
            States: [{ STUSAB: "CA", STATE: "06", GEOID: "06" }],
            Counties: [{ GEOID: "06075", NAME: "San Francisco County" }],
            "Incorporated Places": [{ GEOID: "0667000", NAME: "San Francisco city" }],
            "Census Tracts": [{ GEOID: "060750124021" }],
            "Census Blocks": [{ GEOID: "060750124021001" }]
          }
        }
      ]
    }
  };
}

function geocodioMatchPayload() {
  return {
    results: [
      {
        formatted_address: "1600 Pennsylvania Ave NW, Washington, DC 20500",
        location: { lat: 38.8977, lng: -77.0365 },
        accuracy: 1,
        accuracy_type: "rooftop",
        address_components: {
          city: "Washington",
          county: "District of Columbia",
          state: "DC",
          zip: "20500"
        },
        fields: {
          census2020: {
            state_fips: "11",
            county_fips: "11001",
            geographies: {
              "Census Tracts": [{ GEOID: "110010062021" }],
              "Census Blocks": [{ GEOID: "110010062021000" }]
            }
          }
        }
      }
    ]
  };
}
