import { Readable } from "node:stream";
import { expect, test } from "vitest";

import {
  parseCsvRecords,
  parseCsvRows
} from "../lib/csv.mjs";

async function collect(iterable) {
  const values = [];
  for await (const value of iterable) values.push(value);
  return values;
}

test("preserves UTF-8 code points split across byte chunks", async () => {
  const source = Buffer.from(
    'name,description\n"Café","solar ☀ equipment"\n',
    "utf8"
  );
  const splitInsideAccent = source.indexOf(
    Buffer.from("é", "utf8")
  ) + 1;
  const splitInsideSun = source.indexOf(
    Buffer.from("☀", "utf8")
  ) + 2;
  const stream = Readable.from([
    source.subarray(0, splitInsideAccent),
    source.subarray(splitInsideAccent, splitInsideSun),
    source.subarray(splitInsideSun)
  ]);

  await expect(collect(parseCsvRecords(stream))).resolves.toEqual([
    {
      name: "Café",
      description: "solar ☀ equipment"
    }
  ]);
});

test("preserves quoted fields and escaped quotes across chunks", async () => {
  const stream = Readable.from([
    Buffer.from('"alpha","quoted'),
    Buffer.from(' ""value"""\n')
  ]);

  await expect(collect(parseCsvRows(stream))).resolves.toEqual([
    ["alpha", 'quoted "value"']
  ]);
});
