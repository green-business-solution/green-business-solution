import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { runStandardPrototype } from "./adapter-prototype.mjs";

const catalogPath = fileURLToPath(new URL("./research-catalog.json", import.meta.url));
const catalog = JSON.parse(await readFile(catalogPath, "utf8"));
const results = catalog.standards.map(runStandardPrototype);

if (process.argv.includes("--json")) {
  process.stdout.write(`${JSON.stringify(results, null, 2)}\n`);
} else {
  for (const result of results) {
    process.stdout.write(
      `${result.standardId}: ${result.kind}, ${result.selectionRule}, warnings=${result.warnings.length}\n`
    );
  }
}
