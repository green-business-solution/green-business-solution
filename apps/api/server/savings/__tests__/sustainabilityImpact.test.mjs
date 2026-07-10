import { describe, expect, it } from "vitest";
import { getElectricityEmissionFactor, getNaturalGasEmissionFactor } from "../../savings/sustainabilityFactors.mjs";
import { buildSustainabilityImpact } from "../../sustainabilityImpact.mjs";
import { buildAdminTestCaseSavingsPreview } from "../adminTestCaseSavings.mjs";

describe("sustainability impact calculations", () => {
  it("returns numeric direct inputs and operational CO2e from bill deltas", () => {
    const impact = buildSustainabilityImpact({
      squareFootage: 10000,
      sourceModelInputs: { stateCode: "CA" },
      billLineDeltas: [
        { id: "water", domain: "water_sewer", canonicalField: "annual_water_use_delta", deltaValue: -5000, unit: "gallons/year", period: "annual" },
        { id: "therms", domain: "gas", canonicalField: "annual_therms_delta", deltaValue: -12, unit: "therms/year", period: "annual" },
        { id: "kwh_a", domain: "electric", canonicalField: "annual_kwh_delta", deltaValue: -1200, unit: "kWh/year", period: "annual" },
        { id: "kwh_b", domain: "electric", canonicalField: "annual_kwh_delta", deltaValue: 200, unit: "kWh/year", period: "annual" },
        { id: "peak", domain: "electric", canonicalField: "peak_kw_delta", deltaValue: -8, unit: "kW", period: "monthly" }
      ]
    });

    const electricityFactor = getElectricityEmissionFactor({ stateCode: "CA" });
    const gasFactor = getNaturalGasEmissionFactor();
    const expectedKg = (1000 * electricityFactor.kgPerKwh) + (12 * gasFactor.kgCo2ePerTherm);

    expect(impact).toMatchObject({
      schemaVersion: "sustainability-impact-v2",
      status: "calculated"
    });
    expect(impact.metrics.waterConservationGallonsPerYear.value).toBe(5000);
    expect(impact.metrics.waterConservationGallonsPerYear.provenanceState).toBe("source_calculated");
    expect(impact.metrics.scope1ThermReductionPerYear.value).toBe(12);
    expect(impact.metrics.scope1ThermReductionPerYear.provenanceState).toBe("source_calculated");
    expect(impact.metrics.scope2ElectricityReductionKwhPerYear.value).toBe(1000);
    expect(impact.metrics.scope2ElectricityReductionKwhPerYear.provenanceState).toBe("source_calculated");
    expect(impact.metrics.gridPeakDemandReductionKw.value).toBe(8);
    expect(impact.metrics.siteEuiReductionKbtuPerSquareFootPerYear.value).toBeCloseTo(0.4612, 4);
    expect(impact.metrics.siteEuiReductionKbtuPerSquareFootPerYear.provenanceState).toBe("source_calculated");
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.value).toBeCloseTo(expectedKg, 6);
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.provenanceState).toBe("source_calculated");
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.unit).toBe("kg CO2e/year");
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.value).toBeCloseTo(
      impact.metrics.annualOperationalCO2eReductionKgPerYear.trace.valueKgCO2ePerYear ?? 0,
      6
    );
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.trace.boundary.included).toEqual(
      expect.arrayContaining(["Scope 1 direct on-site natural gas combustion", "Scope 2 purchased electricity use"])
    );
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.trace.boundary.excluded).toEqual(
      expect.arrayContaining(["water", "transportation", "waste", "refrigerants", "embodied carbon"])
    );
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.trace.components).toHaveLength(2);
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.trace.components[0].valueKgCO2ePerYear).toBeGreaterThan(0);
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.trace.components[1].valueKgCO2ePerYear).toBeGreaterThan(0);
  });

  it("returns numeric zeros with not-applicable provenance when a retrofit cannot affect a stream", () => {
    const impact = buildSustainabilityImpact({
      retrofitTypeId: "leed_certification",
      sourceModelInputs: {}
    });

    expect(impact.metrics.waterConservationGallonsPerYear.value).toBe(0);
    expect(impact.metrics.waterConservationGallonsPerYear.provenanceState).toBe("not_applicable");
    expect(impact.metrics.scope1ThermReductionPerYear.value).toBe(0);
    expect(impact.metrics.scope1ThermReductionPerYear.provenanceState).toBe("not_applicable");
    expect(impact.metrics.scope2ElectricityReductionKwhPerYear.value).toBe(0);
    expect(impact.metrics.scope2ElectricityReductionKwhPerYear.provenanceState).toBe("not_applicable");
    expect(impact.metrics.siteEuiReductionKbtuPerSquareFootPerYear.value).toBe(0);
    expect(impact.metrics.siteEuiReductionKbtuPerSquareFootPerYear.provenanceState).toBe("not_applicable");
    expect(impact.metrics.gridPeakDemandReductionKw.value).toBe(0);
    expect(impact.metrics.gridPeakDemandReductionKw.provenanceState).toBe("not_applicable");
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.value).toBe(0);
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.provenanceState).toBe("not_applicable");
  });

  it("estimates peak demand and CO2e from explicit fixture assumptions", () => {
    const impact = buildSustainabilityImpact({
      squareFootage: 10000,
      retrofitTypeId: "rt_modeled_electric_kwh_reduction",
      sourceModelInputs: {
        modeled_kwh_reduction: 4000,
        peak_load_factor: 0.8,
        stateCode: "CA"
      }
    });

    const electricityFactor = getElectricityEmissionFactor({ stateCode: "CA" });

    expect(impact.metrics.scope2ElectricityReductionKwhPerYear.value).toBe(4000);
    expect(impact.metrics.scope2ElectricityReductionKwhPerYear.provenanceState).toBe("estimated");
    expect(impact.metrics.gridPeakDemandReductionKw.value).toBeCloseTo(4000 / (8760 * 0.8), 6);
    expect(impact.metrics.gridPeakDemandReductionKw.provenanceState).toBe("estimated");
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.value).toBeCloseTo(
      4000 * electricityFactor.kgPerKwh,
      6
    );
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.trace.components[1].factor.sourceType).toBe("regional_subregion");
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.trace.components[1].factor.fallbackUsed).toBe(false);
  });

  it("falls back to the national electricity factor when no regional factor is available", () => {
    const impact = buildSustainabilityImpact({
      squareFootage: 10000,
      retrofitTypeId: "rt_modeled_electric_kwh_reduction",
      sourceModelInputs: {
        modeled_kwh_reduction: 4000,
        peak_load_factor: 0.8,
        stateCode: "ZZ"
      }
    });

    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.trace.components[1].factor.sourceRegion).toBe("US");
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.trace.components[1].factor.sourceType).toBe("national_fallback");
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.trace.components[1].factor.fallbackUsed).toBe(true);
  });

  it("preserves increased consumption signs and does not double count non-energy streams", () => {
    const impact = buildSustainabilityImpact({
      squareFootage: null,
      sourceModelInputs: { stateCode: "CA" },
      billLineDeltas: [
        { id: "water", domain: "water_sewer", canonicalField: "annual_water_use_delta", deltaValue: -5000, unit: "gallons/year", period: "annual" },
        { id: "electric", domain: "electric", canonicalField: "annual_kwh_delta", deltaValue: 200, unit: "kWh/year", period: "annual" },
        { id: "gas", domain: "gas", canonicalField: "annual_therms_delta", deltaValue: 5, unit: "therms/year", period: "annual" }
      ]
    });

    expect(impact.metrics.scope2ElectricityReductionKwhPerYear.value).toBe(-200);
    expect(impact.metrics.scope2ElectricityReductionKwhPerYear.provenanceState).toBe("increased_consumption");
    expect(impact.metrics.scope1ThermReductionPerYear.value).toBe(-5);
    expect(impact.metrics.scope1ThermReductionPerYear.provenanceState).toBe("increased_consumption");
    expect(impact.metrics.siteEuiReductionKbtuPerSquareFootPerYear.value).toBe(0);
    expect(impact.metrics.siteEuiReductionKbtuPerSquareFootPerYear.provenanceState).toBe("unavailable");
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.value).toBeLessThan(0);
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.trace.components).toHaveLength(2);
    const componentTotal = impact.metrics.annualOperationalCO2eReductionKgPerYear.trace.components.reduce(
      (sum, component) => sum + Number(component.valueKgCO2ePerYear || 0),
      0
    );
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.trace.valueKgCO2ePerYear).toBeCloseTo(componentTotal, 6);
  });

  it("keeps unsupported delta cadences unavailable instead of annualizing them", () => {
    const impact = buildSustainabilityImpact({
      squareFootage: 10000,
      retrofitTypeId: "rt_modeled_electric_kwh_reduction",
      sourceModelInputs: { stateCode: "CA" },
      billLineDeltas: [
        { id: "electric", domain: "electric", canonicalField: "annual_kwh_delta", deltaValue: -1200, unit: "kWh/week", period: "weekly" }
      ]
    });

    expect(impact.metrics.scope2ElectricityReductionKwhPerYear.provenanceState).toBe("unavailable");
    expect(impact.metrics.scope2ElectricityReductionKwhPerYear.value).toBe(0);
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.provenanceState).toBe("unavailable");
  });

  it("marks mixed-coverage operational CO2e unavailable when one included scope is missing", () => {
    const impact = buildSustainabilityImpact({
      squareFootage: 10000,
      retrofitTypeId: "rt_gas_to_electric",
      sourceModelInputs: { stateCode: "CA" },
      billLineDeltas: [
        { id: "gas", domain: "gas", canonicalField: "annual_therms_delta", deltaValue: -12, unit: "therms/week", period: "weekly" },
        { id: "electric", domain: "electric", canonicalField: "annual_kwh_delta", deltaValue: -1200, unit: "kWh/year", period: "annual" }
      ]
    });

    expect(impact.metrics.scope2ElectricityReductionKwhPerYear.provenanceState).toBe("source_calculated");
    expect(impact.metrics.scope1ThermReductionPerYear.provenanceState).toBe("unavailable");
    expect(impact.metrics.annualOperationalCO2eReductionKgPerYear.provenanceState).toBe("unavailable");
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
    expect(preview.sustainabilityImpact.status).toBe("estimated");
    expect(preview.sustainabilityImpact.metrics.scope2ElectricityReductionKwhPerYear.value).toBeGreaterThan(0);
    expect(preview.sustainabilityImpact.metrics.siteEuiReductionKbtuPerSquareFootPerYear.value).toBeGreaterThan(0);
    expect(preview.sustainabilityImpact.metrics.annualOperationalCO2eReductionKgPerYear.value).toBeGreaterThan(0);
    expect(preview.sustainabilityImpact.metrics.waterConservationGallonsPerYear.value).toBe(0);
    expect(preview.sustainabilityImpact.metrics.waterConservationGallonsPerYear.provenanceState).toBe("not_applicable");
  });
});
