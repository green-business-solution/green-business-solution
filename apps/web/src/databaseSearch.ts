type DatabaseLookup = {
  id?: string | null;
  name?: string | null;
  slug?: string | null;
  abbreviation?: string | null;
};

export type DatabaseSearchProgram = {
  id?: string | null;
  opportunityId?: string | null;
  sourceKey?: string | null;
  sourceSystem?: string | null;
  externalId?: string | null;
  externalIdType?: string | null;
  dsireProgramId?: string | number | null;
  code?: string | null;
  name?: string | null;
  administrator?: string | null;
  summaryText?: string | null;
  state?: DatabaseLookup | null;
  category?: DatabaseLookup | null;
  programType?: DatabaseLookup | null;
  implementingSector?: DatabaseLookup | null;
  eligibleSectors?: DatabaseLookup[];
  technologies?: DatabaseLookup[];
  dsire?: unknown;
  dsireClone?: unknown;
  raw?: unknown;
};

export function normalizeDatabaseSearchValue(value: unknown) {
  return String(value || "").trim().toLowerCase();
}

export function databaseProgramMatchesSearch(program: DatabaseSearchProgram, queryValue: string) {
  const query = normalizeDatabaseSearchValue(queryValue);
  if (!query) return true;
  return buildDatabaseProgramSearchText(program).includes(query);
}

export function buildDatabaseProgramSearchText(program: DatabaseSearchProgram) {
  return normalizeDatabaseSearchValue(
    [
      program.id,
      program.opportunityId,
      program.sourceKey,
      program.sourceSystem,
      program.externalId,
      program.externalIdType,
      program.dsireProgramId,
      program.code,
      program.name,
      program.administrator,
      program.summaryText,
      program.state?.id,
      program.state?.abbreviation,
      program.state?.name,
      program.category?.id,
      program.category?.name,
      program.programType?.id,
      program.programType?.name,
      program.implementingSector?.id,
      program.implementingSector?.name,
      ...(program.eligibleSectors || []).flatMap((sector) => [sector.id, sector.name, sector.slug, sector.abbreviation]),
      ...(program.technologies || []).flatMap((technology) => [
        technology.id,
        technology.name,
        technology.slug,
        technology.abbreviation
      ]),
      ...collectNestedSearchValues(program.dsire, ["programId", "program_id", "id", "code", "programCode"]),
      ...collectNestedSearchValues(program.dsireClone, ["sourceProgramId", "programId", "program_id", "id", "code"]),
      ...collectNestedSearchValues(program.raw, ["programId", "program_id", "id", "code", "programCode"])
    ].join(" ")
  );
}

function collectNestedSearchValues(value: unknown, keyNames: string[], depth = 0): string[] {
  if (!value || depth > 4) return [];
  if (typeof value !== "object") return [];

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectNestedSearchValues(item, keyNames, depth + 1));
  }

  const record = value as Record<string, unknown>;
  const results: string[] = [];

  for (const [key, childValue] of Object.entries(record)) {
    if (keyNames.includes(key) && (typeof childValue === "string" || typeof childValue === "number")) {
      results.push(String(childValue));
    }

    if (childValue && typeof childValue === "object") {
      results.push(...collectNestedSearchValues(childValue, keyNames, depth + 1));
    }
  }

  return results;
}
