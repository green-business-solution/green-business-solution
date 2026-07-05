import { describe, expect, it } from "vitest";

import { classifyCiChecks } from "./select-ci-checks.mjs";

describe("select-ci-checks", () => {
  it("routes API source changes to API checks only", () => {
    expect(classifyCiChecks(["apps/api/server/index.mjs"]).checks).toEqual(["api"]);
  });

  it("routes frontend source changes to web checks only", () => {
    expect(classifyCiChecks(["apps/web/src/App.tsx"]).checks).toEqual(["web"]);
  });

  it("does not run code checks for docs-only changes", () => {
    expect(classifyCiChecks(["docs/architecture-resource-map.md", "AI_CHANGELOG.md"]).checks).toEqual([]);
  });

  it("runs all checks for shared workflow changes", () => {
    expect(classifyCiChecks([".github/workflows/ci-deploy.yml"]).checks).toEqual([
      "api",
      "web",
      "scripts",
      "audit"
    ]);
  });

  it("routes frontend build-tool lockfile changes to web checks and audits", () => {
    const baseLock = lockfile({
      viteVersion: "7.3.5",
      esbuildVersion: "0.27.7"
    });
    const headLock = lockfile({
      viteVersion: "7.3.6",
      esbuildVersion: "0.28.1"
    });

    expect(classifyCiChecks(["package-lock.json"], { baseLock, headLock }).checks).toEqual(["web", "audit"]);
  });

  it("routes test-only lockfile changes to script checks and audits", () => {
    const baseLock = lockfile({ vitestVersion: "3.2.5" });
    const headLock = lockfile({ vitestVersion: "3.2.6" });

    expect(classifyCiChecks(["package-lock.json"], { baseLock, headLock }).checks).toEqual(["scripts", "audit"]);
  });
});

function lockfile(options = {}) {
  const viteVersion = options.viteVersion || "7.3.6";
  const esbuildVersion = options.esbuildVersion || "0.28.1";
  const expressVersion = options.expressVersion || "5.2.1";
  const vitestVersion = options.vitestVersion || "3.2.6";

  return {
    lockfileVersion: 3,
    packages: {
      "": {
        devDependencies: {
          vite: viteVersion,
          vitest: vitestVersion
        }
      },
      "apps/api": {
        dependencies: {
          express: expressVersion
        }
      },
      "apps/web": {
        dependencies: {
          react: "19.0.0",
          "react-dom": "19.0.0"
        },
        devDependencies: {
          "@vitejs/plugin-react": "5.2.0",
          typescript: "5.9.3",
          vite: viteVersion,
          vitest: vitestVersion
        }
      },
      "node_modules/@esbuild/linux-x64": {
        optional: true,
        version: esbuildVersion
      },
      "node_modules/@vitejs/plugin-react": {
        dependencies: {
          vite: "^7.0.0"
        },
        dev: true,
        version: "5.2.0"
      },
      "node_modules/esbuild": {
        dev: true,
        optionalDependencies: {
          "@esbuild/linux-x64": esbuildVersion
        },
        version: esbuildVersion
      },
      "node_modules/express": {
        version: expressVersion
      },
      "node_modules/react": {
        version: "19.0.0"
      },
      "node_modules/react-dom": {
        dependencies: {
          react: "^19.0.0"
        },
        version: "19.0.0"
      },
      "node_modules/typescript": {
        dev: true,
        version: "5.9.3"
      },
      "node_modules/vite": {
        dependencies: {
          esbuild: "^0.28.0",
          rollup: "^4.43.0"
        },
        dev: true,
        version: viteVersion
      },
      "node_modules/vitest": {
        dependencies: {
          "@vitest/runner": vitestVersion
        },
        dev: true,
        version: vitestVersion
      },
      "node_modules/@vitest/runner": {
        dev: true,
        version: vitestVersion
      },
      "node_modules/rollup": {
        version: "4.53.5"
      }
    }
  };
}
