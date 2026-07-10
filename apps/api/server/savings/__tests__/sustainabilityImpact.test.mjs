import { describe, expect, it } from "vitest";
import { buildSustainabilityImpact } from "../../sustainabilityImpact.mjs";
import { buildAdminTestCaseSavingsPreview } from "../adminTestCaseSavings.mjs";

describe("sustainability impact calculations", () => {
  it("aggregates kWh, therms, water, peak demand, and site EUI from bill deltas", () => {
    const impact = buildSustainabilityImpact({
      squareFootage: 10000,
      billLineDeltas: [
        { id: "water", domain: "water_sewer", canonicalField: "annual_water_use_delta", deltaValue: -5000, unit: "gallons/year", period: "annual" },
        { id: "therms", domain: "gas", canonicalField: "annual_therms_delta", deltaValue: -12, unit: "therms/year", period: "annual" },
        { id: "kwh_a", domain: "electric", canonicalField: "annual_kwh_delta", deltaValue: -1200, unit: "kWh/year", period: "annual" },
        { id: "kwh_b", domain: "electric", canonicalField: "annual_kwh_delta", deltaValue: 200, unit: "kWh/year", period: "annual" },
        { id: "peak", domain: "electric", canonicalField: "peak_kw_delta", deltaValue: -8, unit: "kW", period: "monthly" }
      ]
    });

    expect(impact).toMatchObject({
      schemaVersion: "sustainability-impact-v1",
      status: "calculated"
    });
    expect(impact.metrics.waterConservationGallonsPerYear.value).toBe(5000);
    expect(impact.metrics.scope1ThermReductionPerYear.value).toBe(12);
    expect(impact.metrics.scope2ElectricityReductionKwhPerYear.value).toBe(1000);
    expect(impact.metrics.gridPeakDemandReductionKw.value).toBe(96);
    expect(impact.metrics.siteEuiReductionKbtuPerSquareFootPerYear.value).toBeCloseTo((1000 * 3.412 + 12 * 100) / 10000, 6);
  });

  it("converts water units and supports mixed positive and negative deltas", () => {
    const impact = buildSustainabilityImpact({
      squareFootage: 5000,
      billLineDeltas: [
        { id: "water", domain: "water_sewer", canonicalField: "annual_water_use_delta", deltaValue: -10, unit: "CCF/year", period: "annual" },
        { id: "ev", domain: "electric", canonicalField: "annual_kwh_delta", deltaValue: 2400, unit: "kWh/year", period: "annual" },
        { id: "therm", domain: "gas", canonicalField: "annual_therms_delta", deltaValue: 10, unit: "therms/year", period: "annual" }
      ]
    });

    expect(impact.metrics.waterConservationGallonsPerYear.value).toBeCloseTo(7480.52, 2);
    expect(impact.metrics.scope2ElectricityReductionKwhPerYear.status).toBe("increased_consumption");
    expect(impact.metrics.scope1ThermReductionPerYear.status).toBe("increased_consumption");
    expect(impact.metrics.siteEuiReductionKbtuPerSquareFootPerYear.status).toBe("increased_consumption");
    expect(impact.status).toBe("partial");
  });

  it("returns unavailable site EUI when square footage is missing", () => {
    const impact = buildSustainabilityImpact({
      squareFootage: null,
      billLineDeltas: [
        { id: "kwh", domain: "electric", canonicalField: "annual_kwh_delta", deltaValue: -500, unit: "kWh/year", period: "annual" }
      ]
    });

    expect(impact.metrics.siteEuiReductionKbtuPerSquareFootPerYear.status).toBe("unavailable");
    expect(impact.status).toBe("partial");
  });

  it("attaches the sustainability impact contract to the admin savings preview", () => {
    const preview = buildAdminTestCaseSavingsPreview({
      sampleUserId: "sample_led",
      calculationDate: "2026-06-27",
      normalizedProfile: {
        site: {
          squareFootage: {
            value: 10000,
            raw: "10000",
            parsingStatus: "parsed"
          }
        }
      },
      retrofitGroup: {
        retrofitTypeId: "led_lighting_retrofit",
        displayName: "LED lighting retrofit",
        opportunityCount: 12
      }
    });

    expect(preview.sustainabilityImpact).toBeTruthy();
    expect(preview.sustainabilityImpact.status).toBe("partial");
    expect(preview.sustainabilityImpact.metrics.scope2ElectricityReductionKwhPerYear.value).toBeGreaterThan(0);
    expect(preview.sustainabilityImpact.metrics.siteEuiReductionKbtuPerSquareFootPerYear.value).toBeGreaterThan(0);
  });
});
