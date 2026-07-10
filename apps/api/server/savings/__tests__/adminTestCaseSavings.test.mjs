import { describe, expect, it } from "vitest";
import { buildAdminTestCaseSavingsPreview } from "../adminTestCaseSavings.mjs";

const normalizedProfile = {
  site: {
    squareFootage: { value: 12000 },
    geo: { stateCode: "CA" },
    addressStructured: { stateCode: "CA" }
  },
  tax: null,
  grant: null
};

describe("admin test-case savings generation", () => {
  it("builds v2 sustainability impact for supported retrofits", () => {
    const preview = buildAdminTestCaseSavingsPreview({
      retrofitGroup: {
        retrofitTypeId: "ev_charger_installation",
        displayName: "EV charger installation",
        opportunities: [{ opportunityId: "opp-1" }],
        opportunityCount: 1
      },
      sampleUserId: "sample-user",
      normalizedProfile
    });

    const sustainabilityImpact = preview.sustainabilityImpact;
    expect(sustainabilityImpact?.schemaVersion).toBe("sustainability-impact-v2");
    expect(["calculated", "estimated", "partial", "unsupported"].includes(preview.status)).toBe(true);
    expect(["partial", "estimated", "calculated"].includes(sustainabilityImpact?.status)).toBe(true);
    expect(sustainabilityImpact?.metrics?.annualOperationalCO2eReductionKgPerYear?.unit).toBe("kg CO2e/year");

    for (const [metricId, metric] of Object.entries(sustainabilityImpact.metrics || {})) {
      expect(metric).toMatchObject({
        id: expect.any(String),
        unit: expect.any(String),
        status: expect.any(String),
        provenanceState: expect.any(String),
        value: expect.any(Number),
        formulaId: expect.any(String),
        trace: expect.any(Object)
      });
      expect(Number.isFinite(metric.value)).toBe(true);
      expect(["waterConservationGallonsPerYear", "scope1ThermReductionPerYear", "scope2ElectricityReductionKwhPerYear", "siteEuiReductionKbtuPerSquareFootPerYear", "gridPeakDemandReductionKw", "annualOperationalCO2eReductionKgPerYear"]).toContain(
        metricId
      );
    }

    const co2e = sustainabilityImpact.metrics.annualOperationalCO2eReductionKgPerYear;
    expect(co2e.trace?.components).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          scope: "Scope 1",
          factor: expect.objectContaining({
            sourceRegion: expect.any(String),
            sourceLabel: expect.any(String)
          }),
          unit: "kg CO2e/year"
        }),
        expect.objectContaining({
          scope: "Scope 2",
          factor: expect.objectContaining({
            sourceRegion: expect.any(String),
            sourceLabel: expect.any(String),
            valueKgCo2ePerKwh: expect.any(Number)
          }),
          unit: "kg CO2e/year"
        })
      ])
    );
    expect(co2e.trace?.boundary?.included).toEqual(
      expect.arrayContaining(["Scope 1 direct on-site natural gas combustion", "Scope 2 purchased electricity use"])
    );
    expect(sustainabilityImpact.metrics.waterConservationGallonsPerYear.value).toBe(0);
    expect(sustainabilityImpact.metrics.waterConservationGallonsPerYear.provenanceState).toBe("not_applicable");
  });

  it("builds unsupported service-only previews with contract-shaped sustainability impact", () => {
    const preview = buildAdminTestCaseSavingsPreview({
      retrofitGroup: {
        retrofitTypeId: "leed_certification",
        displayName: "LEED certification",
        opportunities: [],
        opportunityCount: 0
      },
      sampleUserId: "sample-user",
      normalizedProfile
    });

    expect(preview.status).toBe("unsupported");
    expect(preview.unsupportedReason).toContain("audit");
    expect(preview.sustainabilityImpact?.schemaVersion).toBe("sustainability-impact-v2");
    expect(["partial", "estimated", "calculated"].includes(preview.sustainabilityImpact?.status)).toBe(true);

    for (const metric of Object.values(preview.sustainabilityImpact.metrics)) {
      expect(typeof metric.value).toBe("number");
      expect(Number.isFinite(metric.value)).toBe(true);
    }

    expect(preview.sustainabilityImpact?.metrics?.annualOperationalCO2eReductionKgPerYear?.value).toBe(0);
    expect(preview.sustainabilityImpact?.metrics?.scope1ThermReductionPerYear?.provenanceState).toBe("not_applicable");
    expect(preview.sustainabilityImpact?.metrics?.scope2ElectricityReductionKwhPerYear?.provenanceState).toBe("not_applicable");
    expect(preview.sustainabilityImpact?.metrics?.siteEuiReductionKbtuPerSquareFootPerYear?.provenanceState).toBe("not_applicable");
  });
});
