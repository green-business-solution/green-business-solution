import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "..");
const defaultPromptPath = path.join(repoRoot, "prompts", "gpt_pro_comprehensive_test_case_utility_data_prompt.md");
const defaultSampleUsersPath = path.join(repoRoot, "data", "sample_user_profiles.json");
const defaultOutputPath = path.join(repoRoot, "prompts", "gpt_pro_comprehensive_test_case_utility_data_prompt_with_profiles.md");

export function parseArgs(argv) {
  const options = {
    outputPath: defaultOutputPath,
    promptPath: defaultPromptPath,
    sampleUsersPath: defaultSampleUsersPath
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const next = argv[index + 1];
    if (arg === "--output" && next) {
      options.outputPath = resolveRepoPath(next);
      index += 1;
      continue;
    }
    if (arg === "--prompt" && next) {
      options.promptPath = resolveRepoPath(next);
      index += 1;
      continue;
    }
    if (arg === "--sample-users" && next) {
      options.sampleUsersPath = resolveRepoPath(next);
      index += 1;
      continue;
    }
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }

  return options;
}

export function writeSampleTestCaseUtilityDataPrompt(options = {}) {
  const config = {
    outputPath: options.outputPath || defaultOutputPath,
    promptPath: options.promptPath || defaultPromptPath,
    sampleUsersPath: options.sampleUsersPath || defaultSampleUsersPath
  };
  const prompt = fs.readFileSync(config.promptPath, "utf8").trimEnd();
  const sampleUsers = JSON.parse(fs.readFileSync(config.sampleUsersPath, "utf8"));
  const content = [
    prompt,
    "",
    "Required input: current contents of `data/sample_user_profiles.json`",
    "",
    "```json",
    JSON.stringify(sampleUsers, null, 2),
    "```",
    ""
  ].join("\n");

  fs.mkdirSync(path.dirname(config.outputPath), { recursive: true });
  fs.writeFileSync(config.outputPath, content, "utf8");
  return {
    outputPath: config.outputPath,
    profileCount: Array.isArray(sampleUsers) ? sampleUsers.length : 0
  };
}

function resolveRepoPath(value) {
  return path.resolve(repoRoot, value);
}

function printHelp() {
  console.log(`Usage: node scripts/write-sample-test-case-utility-data-prompt.mjs [options]

Options:
  --output prompts/gpt_pro_comprehensive_test_case_utility_data_prompt_with_profiles.md
  --prompt prompts/gpt_pro_comprehensive_test_case_utility_data_prompt.md
  --sample-users data/sample_user_profiles.json
`);
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  const result = writeSampleTestCaseUtilityDataPrompt(options);
  console.log(`Wrote GPT Pro utility-data prompt: ${result.outputPath}`);
  console.log(`Embedded profiles: ${result.profileCount}`);
}

if (process.argv[1] === scriptPath) {
  main().catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
