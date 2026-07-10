const COMPLETED_STATES = new Set(["COMPLETED", "ABANDONED"]);

export function validateItemExists(items, itemId) {
  if (!items[itemId]) {
    const error = new Error("Portfolio item was not found.");
    error.status = 404;
    error.code = "PORTFOLIO_ITEM_NOT_FOUND";
    return error;
  }
  return null;
}

export function validateNotCompleted(item) {
  if (item && COMPLETED_STATES.has(item.status)) {
    const message = item.status === "COMPLETED"
      ? "Portfolio item is already completed."
      : "Portfolio item is already abandoned.";
    const code = item.status === "COMPLETED"
      ? "PORTFOLIO_ITEM_ALREADY_COMPLETED"
      : "PORTFOLIO_ITEM_ALREADY_ABANDONED";
    const status = 409;
    const error = new Error(message);
    error.status = status;
    error.code = code;
    return error;
  }
  return null;
}

export function validateRuleVersion(selection, activeRuleVersion) {
  if ((selection?.calculationBinding || "calc-v1") !== activeRuleVersion) {
    const error = new Error("Expected calculation binding does not match the active scenario binding.");
    error.status = 409;
    error.code = "PORTFOLIO_CALCULATION_BINDING_MISMATCH";
    return error;
  }
  return null;
}

export function validateFinances(selection) {
  const requested = cleanNonNegativeInteger(selection?.financialSelection?.requestedBenefitMinorUnits);
  if (requested === null) {
    const error = new Error("financialSelection.requestedBenefitMinorUnits is required.");
    error.status = 400;
    error.code = "PORTFOLIO_INVALID_FINANCIAL_SELECTION";
    return error;
  }
  if (requested > 5_000_000) {
    const error = new Error("financialSelection.requestedBenefitMinorUnits exceeds system limits.");
    error.status = 400;
    error.code = "PORTFOLIO_FINANCIAL_LIMIT_EXCEEDED";
    return error;
  }
  return null;
}

export function validateOwner(user, portfolioId) {
  const isOwner = user?.role === "client" && user.userId === portfolioId;
  if (!isOwner) {
    const error = new Error("Portfolio ownership is invalid for this principal.");
    error.status = 403;
    error.code = "PORTFOLIO_FORBIDDEN";
    return error;
  }
  return null;
}

export function validateFeatureEnabled(enabled) {
  if (!enabled) {
    const error = new Error("Portfolio APIs are disabled. Set RETROFI_PORTFOLIO_WRITE_ENABLED=1 to enable.");
    error.status = 404;
    error.code = "PORTFOLIO_FEATURE_DISABLED";
    return error;
  }
  return null;
}

function cleanNonNegativeInteger(value) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < 0) return null;
  return number;
}
