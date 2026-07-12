export type ReportPricingTrack = "homeowner" | "business" | "multifamily" | "nonprofit" | "agriculture" | "industrial";
export type UtilitySpendBand = "under_250" | "250_750" | "750_2000" | "2000_10000" | "10000_50000" | "over_50000";
export type LocationStrength = "low" | "normal" | "strong" | "very_strong";
export type ReportPropertySize = "small" | "normal" | "large" | "very_large";

const REPORT_PRICING_BASES: Record<UtilitySpendBand, number> = {
  under_250: 19,
  "250_750": 29,
  "750_2000": 49,
  "2000_10000": 79,
  "10000_50000": 129,
  over_50000: 199
};

const REPORT_PRICING_TRACKS: Record<ReportPricingTrack, { label: string; multiplier: number }> = {
  homeowner: { label: "Homeowner", multiplier: 0.8 },
  business: { label: "Business / commercial", multiplier: 1 },
  multifamily: { label: "Multifamily", multiplier: 1.1 },
  nonprofit: { label: "Nonprofit / school / government", multiplier: 0.95 },
  agriculture: { label: "Agriculture", multiplier: 1.05 },
  industrial: { label: "Industrial / manufacturing", multiplier: 1.25 }
};

const REPORT_PRICING_LOCATION_MULTIPLIERS: Record<LocationStrength, number> = {
  low: 0.9,
  normal: 1,
  strong: 1.1,
  very_strong: 1.2
};

const REPORT_PRICING_SIZE_MULTIPLIERS: Record<ReportPropertySize, number> = {
  small: 0.95,
  normal: 1,
  large: 1.07,
  very_large: 1.15
};

function roundReportPrice(value: number) {
  return Math.max(0, Math.round(value / 5) * 5);
}

export function calculateEstimatedReportPrice({
  location,
  propertySize,
  track,
  utilitySpend
}: {
  location: LocationStrength;
  propertySize: ReportPropertySize;
  track: ReportPricingTrack;
  utilitySpend: UtilitySpendBand;
}) {
  const midpoint =
    REPORT_PRICING_BASES[utilitySpend] *
    REPORT_PRICING_TRACKS[track].multiplier *
    REPORT_PRICING_LOCATION_MULTIPLIERS[location] *
    REPORT_PRICING_SIZE_MULTIPLIERS[propertySize];

  return {
    high: roundReportPrice(midpoint * 1.35),
    low: roundReportPrice(midpoint * 0.75),
    midpoint
  };
}
