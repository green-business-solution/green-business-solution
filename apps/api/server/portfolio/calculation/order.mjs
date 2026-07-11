export function resolveScenarioOrder({
  requestedItemIds = [],
  fallbackItemIds = [],
}) {
  const requested = cleanIdList(requestedItemIds);
  if (requested.length > 0) {
    return requested;
  }

  const fallback = cleanIdList(fallbackItemIds);
  return [...fallback].sort((a, b) => String(a).localeCompare(String(b)));
}

export function isSameOrder(a = [], b = []) {
  if (!Array.isArray(a) || !Array.isArray(b)) return false;
  if (a.length !== b.length) return false;
  return a.every((itemId, index) => String(itemId) === String(b[index]));
}

function cleanIdList(items = []) {
  return Array.isArray(items)
    ? items.map((itemId) => String(itemId || "").trim()).filter(Boolean)
    : [];
}
