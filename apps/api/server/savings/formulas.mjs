export function roundCents(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    throw new Error(`Cannot round non-finite money value: ${value}`);
  }

  if (number >= 0) {
    return Math.floor(number + 0.5 + Number.EPSILON);
  }

  return Math.ceil(number - 0.5 - Number.EPSILON);
}

export function percentOfCents(amountCents, percent) {
  return roundCents(Number(amountCents) * Number(percent));
}

export function applyCaps(rawAmountCents, cap = {}, basisCents = 0) {
  let cappedAmountCents = roundCents(rawAmountCents);

  if (Number.isFinite(cap.maxAmountCents)) {
    cappedAmountCents = Math.min(cappedAmountCents, roundCents(cap.maxAmountCents));
  }

  if (Number.isFinite(cap.maxPercentOfBasis)) {
    cappedAmountCents = Math.min(cappedAmountCents, percentOfCents(basisCents, cap.maxPercentOfBasis));
  }

  return cappedAmountCents;
}

export function annualKwhReduction({ quantity, oldWatts, newWatts, hoursPerDay, operatingDaysPerYear, controlFactor = 1 }) {
  return (
    Number(quantity) *
    ((Number(oldWatts) - Number(newWatts)) / 1000) *
    Number(hoursPerDay) *
    Number(operatingDaysPerYear) *
    Number(controlFactor)
  );
}

export function annualEnergySavingsCents(kwhReduction, averageCostPerKwh) {
  return roundCents(Number(kwhReduction) * Number(averageCostPerKwh) * 100);
}

export function calculateSalesTaxCents({
  equipmentCostCents,
  laborCostCents = 0,
  ratePercent,
  equipmentTaxable = true,
  laborTaxable = false
}) {
  const taxableEquipment = equipmentTaxable ? Number(equipmentCostCents) : 0;
  const taxableLabor = laborTaxable ? Number(laborCostCents) : 0;
  return percentOfCents(taxableEquipment + taxableLabor, Number(ratePercent));
}

export function calculateLaborCents({
  fixedCostCents,
  perUnitCostCents,
  units,
  countyLaborMultiplier = 1,
  retrofitComplexityMultiplier = 1,
  minimumContractorCostCents = 0
}) {
  const rawLaborCents = Number(fixedCostCents) + Number(perUnitCostCents) * Number(units);
  const adjustedLaborCents =
    rawLaborCents * Number(countyLaborMultiplier) * Number(retrofitComplexityMultiplier);

  return Math.max(roundCents(adjustedLaborCents), roundCents(minimumContractorCostCents));
}

export function annualToMonthlyCents(annualCents) {
  return roundCents(Number(annualCents) / 12);
}

export function monthlyToAnnualCents(monthlyCents) {
  return roundCents(Number(monthlyCents) * 12);
}
