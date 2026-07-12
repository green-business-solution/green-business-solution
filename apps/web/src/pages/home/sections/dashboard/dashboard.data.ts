export const homeDashboardSummaryMetrics = [
  { label: "Total Project Cost", value: "$104K", note: "Across implemented retrofits" },
  { label: "Incentives Received", value: "$6K", note: "Received or approved" },
  { label: "Net Project Cost", value: "$98K", note: "After incentives" },
  { label: "Total Annual Savings", value: "$21K", note: "Estimated / modelled" },
  { label: "CO2e Reduced / Year", value: "14 MT", note: "Metric tons CO2e" },
  { label: "Certification Progress", value: "52%", note: "Average across programs" }
];

export const homeDashboardStatusStrip = [
  {
    accent: "realized",
    label: "Realized",
    note: "Past performance (cumulative)",
    values: [
      { label: "Cost incurred", value: "$104K" },
      { label: "Incentives received", value: "$6K" },
      { label: "Annual savings", value: "$21K" }
    ]
  },
  {
    accent: "current",
    label: "Current",
    note: "Current performance to date",
    values: [
      { label: "Current savings", value: "$11K" },
      { label: "Current incentives", value: "$5K" },
      { label: "Current ROI", value: "22%" }
    ]
  },
  {
    accent: "projected",
    label: "Projected",
    note: "Future performance (forecast)",
    values: [
      { label: "Projected 5-year savings", value: "$106K" },
      { label: "Projected 10-year savings", value: "$213K" },
      { label: "Remaining before payback", value: "$70K" }
    ]
  }
];

export const homeDashboardEnvironmentalPoints = [
  "24,114",
  "70,108",
  "116,96",
  "162,78",
  "208,68",
  "254,56",
  "300,40"
].join(" ");
