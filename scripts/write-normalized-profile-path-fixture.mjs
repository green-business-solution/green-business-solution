import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  USER_MATCH_PROFILE_SCHEMA_VERSION,
  normalizeUserProfile
} from "../apps/api/server/matching/normalizeUserProfile.mjs";
import {
  deriveNormalizedProfilePathContract
} from "./generate-operational-savings-review-pages.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const fixturePath = join(
  root,
  "docs/operational-savings-fixtures/profile/normalized-profile-paths.json"
);
const contract = deriveNormalizedProfilePathContract(
  normalizeUserProfile,
  USER_MATCH_PROFILE_SCHEMA_VERSION
);

await writeFile(fixturePath, `${JSON.stringify(contract, null, 2)}\n`, "utf8");
console.log(`Wrote ${contract.paths.length} normalized Profile path descriptors.`);
