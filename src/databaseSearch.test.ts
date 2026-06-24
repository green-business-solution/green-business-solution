import { describe, expect, it } from "vitest";
import { databaseProgramMatchesSearch } from "./databaseSearch";

const sampleProgram = {
  id: "1271",
  opportunityId: "SOURCE_DSIRE:dsire_program_id:1271",
  sourceKey: "SOURCE_DSIRE",
  sourceSystem: "DSIRE",
  externalId: "1271",
  externalIdType: "dsire_program_id",
  dsireProgramId: "1271",
  code: "DSIRE PROGRAM 1271",
  name: "Commercial Lighting Rebate Program",
  administrator: "Example Public Utility",
  summaryText: "Rebates for efficient commercial lighting and controls.",
  technologies: [{ name: "LED Lighting" }],
  dsire: { programId: 1271 },
  dsireClone: { program: { sourceProgramId: "1271" } },
  raw: { id: 1271 }
};

describe("databaseProgramMatchesSearch", () => {
  it("matches a plain DSIRE numeric program ID", () => {
    expect(databaseProgramMatchesSearch(sampleProgram, "1271")).toBe(true);
  });

  it("matches a full RetroFi opportunity ID", () => {
    expect(databaseProgramMatchesSearch(sampleProgram, "SOURCE_DSIRE:dsire_program_id:1271")).toBe(true);
  });

  it("keeps normal title, administrator, and technology search working", () => {
    expect(databaseProgramMatchesSearch(sampleProgram, "lighting")).toBe(true);
    expect(databaseProgramMatchesSearch(sampleProgram, "public utility")).toBe(true);
    expect(databaseProgramMatchesSearch(sampleProgram, "LED")).toBe(true);
  });
});
