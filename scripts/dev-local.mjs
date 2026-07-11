import { spawn } from "node:child_process";
import process from "node:process";

const env = {
  ...process.env,
  GBS_LOCAL_STACK: "1",
  AWS_ACCESS_KEY_ID: "localaccesskey",
  AWS_SECRET_ACCESS_KEY: "localsecretkey",
  AWS_EC2_METADATA_DISABLED: "true",
  GBS_DYNAMODB_ENDPOINT: "http://127.0.0.1:8000",
  GBS_S3_ENDPOINT: "http://127.0.0.1:9000",
  GBS_S3_FORCE_PATH_STYLE: "1",
  GBS_ENERGY_DATA_BUCKET: "gbs-local-energy-data",
  GBS_RUNTIME_CACHE_BUCKET: "gbs-local-runtime-cache",
  GBS_DEV_WORK_BUCKET: "gbs-local-dev-work",
  GBS_GPT_PRO_WORK_BUCKET: "gbs-local-dev-work",
  GBS_USERS_TABLE: "gbs-users",
  GBS_INTAKE_TABLE: "gbs-client-intake",
  GBS_OPPORTUNITIES_TABLE: "gbs-opportunity-candidates",
  GBS_DASHBOARD_PERFORMANCE_TABLE: "gbs-dashboard-performance",
  GBS_RETROFIT_RECOMMENDATION_CACHE_TABLE: "gbs-retrofit-recommendation-cache",
  GBS_APPLICATION_PROFILES_TABLE: "gbs-application-profiles",
  GBS_API_RUNTIME_STATE_TABLE: "gbs-api-runtime-state",
  GBS_ADMIN_EMAILS: "neerkuchlous@gmail.com,pmrajvansh@gmail.com,rshen0210@gmail.com",
  RETROFI_PORTFOLIO_WRITE_ENABLED: "1",
  RETROFI_ENABLE_FIRSTMATE_TASKS: "0",
  RETROFI_FIRSTMATE_TASKS_LOCAL_AUTH_BYPASS: "0"
};

function run(command, args, options = {}) {
  const child = spawn(command, args, {
    cwd: process.cwd(),
    env: options.env || env,
    stdio: "inherit"
  });
  return child;
}

const seed = run("node", ["scripts/local-stack.mjs", "up"]);
seed.on("exit", (code) => {
  if (code !== 0) {
    process.exit(code || 1);
    return;
  }
  const dev = run("npm", [
    "exec",
    "concurrently",
    "--",
    "-k",
    "-n",
    "api,web",
    "-c",
    "blue,green",
    "npm run dev -w @gbs/api",
    "npm run dev -w @gbs/web"
  ]);
  const terminate = () => {
    dev.kill("SIGTERM");
  };
  process.on("SIGINT", terminate);
  process.on("SIGTERM", terminate);
  dev.on("exit", (exitCode) => process.exit(exitCode || 0));
});
