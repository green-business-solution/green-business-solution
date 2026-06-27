import { describe, expect, it } from "vitest";
import { buildAdminTestCaseSavingsPreview } from "../adminTestCaseSavings.mjs";

describe("admin test-case savings previews", () => {
  it("calculates the LED admin test fixture preview", () => {
    const preview = buildAdminTestCaseSavingsPreview({
      sampleUserId: "sample_led",
      calculationDate: "2026-06-27",
      normalizedProfile: {
        site: {
          geo: {
            stateCode: "CA",
            countyFips: "06075"
          }
        }
      },
      retrofitGroup: {
        retrofitTypeId: "led_lighting_retrofit",
        displayName: "LED lighting retrofit",
        opportunityCount: 12
      }
    });

    expect(preview).toMatchObject({
      status: "calculated",
      estimateKind: "test_fixture",
      modelCoverage: "retrofit_only",
      upfrontCostCents: 160425,
      upfrontSavingsCents: 0,
      upfrontCostAfterSavingsCents: 160425,
      monthlySavingsCents: 1872,
      annualSavingsCents: 22464
    });
    expect(preview.costBreakdown).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ category: "equipment_cost", amountCents: 102000 }),
        expect.objectContaining({ category: "installation_labor", amountCents: 49500 }),
        expect.objectContaining({ category: "sales_tax", amountCents: 8925 })
      ])
    );
  });

  it("marks non-LED retrofit previews as unsupported in V1", () => {
    const preview = buildAdminTestCaseSavingsPreview({
      sampleUserId: "sample_hvac",
      calculationDate: "2026-06-27",
      normalizedProfile: {},
      retrofitGroup: {
        retrofitTypeId: "high_efficiency_hvac_replacement",
        displayName: "High-efficiency HVAC replacement",
        opportunityCount: 3
      }
    });

    expect(preview).toMatchObject({
      status: "unsupported",
      estimateKind: "not_modeled_v1",
      modelCoverage: "none",
      upfrontCostCents: null,
      annualSavingsCents: null
    });
  });
});
