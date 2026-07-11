export function estimateIndependentValue(item) {
  return {
    portfolioItemId: String(item?.portfolioItemId || ""),
    independentFinancialValueMinorUnits: toMinorUnits(
      item?.independentFinancialValueMinorUnits,
    ),
    unit: "USD_CENTS",
  };
}

function toMinorUnits(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || Number.isNaN(number)) return 0;
  return Math.max(0, Math.round(number));
}
