import { describe, expect, it } from "vitest";
import { parseEnergyDataFile } from "./parseEnergyData.mjs";

describe("parseEnergyDataFile", () => {
  it("parses Green Button XML interval readings into kWh totals", () => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
      <feed>
        <entry>
          <content>
            <IntervalBlock>
              <IntervalReading>
                <value>1500</value>
                <timePeriod>
                  <start>1704067200</start>
                  <duration>3600</duration>
                </timePeriod>
              </IntervalReading>
              <IntervalReading>
                <value>500</value>
                <timePeriod>
                  <start>1704070800</start>
                  <duration>3600</duration>
                </timePeriod>
              </IntervalReading>
            </IntervalBlock>
          </content>
        </entry>
        <entry>
          <content>
            <ReadingType>
              <uom>72</uom>
              <powerOfTenMultiplier>0</powerOfTenMultiplier>
            </ReadingType>
          </content>
        </entry>
      </feed>`;

    const result = parseEnergyDataFile({ sourceType: "green_button_xml", text: xml });

    expect(result.normalizedUsage.intervals).toHaveLength(2);
    expect(result.normalizedUsage.monthlyTotals[0]).toMatchObject({
      month: "2024-01",
      kwh: 2,
      cost: null
    });
  });

  it("parses utility export CSV rows into interval summaries", () => {
    const csv = `timestamp,kwh,utility,meter_id
2026-01-01T00:00:00Z,12.5,PG&E,meter-1
2026-01-02T00:00:00Z,10.25,PG&E,meter-1`;

    const result = parseEnergyDataFile({ sourceType: "green_button_csv", text: csv });

    expect(result.utilityName).toBe("PG&E");
    expect(result.meterIds).toEqual(["meter-1"]);
    expect(result.normalizedUsage.intervals).toHaveLength(2);
    expect(result.normalizedUsage.monthlyTotals[0]).toMatchObject({
      month: "2026-01",
      kwh: 22.75
    });
  });
});
