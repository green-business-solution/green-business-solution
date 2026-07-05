import { describe, expect, it } from "vitest";

import {
  classifyFiles,
  classifyPackageLockChange
} from "./select-production-deploy-targets.mjs";

describe("select-production-deploy-targets", () => {
  it("routes frontend build-tool lockfile changes to frontend only", () => {
    const baseLock = lockfile({
      viteVersion: "7.3.5",
      esbuildVersion: "0.27.7"
    });
    const headLock = lockfile({
      viteVersion: "7.3.6",
      esbuildVersion: "0.28.1"
    });

    expect(classifyFiles(["package-lock.json"], { baseLock, headLock }).targets).toEqual(["frontend"]);
  });

  it("routes API runtime lockfile changes to api only", () => {
    const baseLock = lockfile({ expressVersion: "5.2.0" });
    const headLock = lockfile({ expressVersion: "5.2.1" });

    expect(classifyPackageLockChange(baseLock, headLock).targets).toEqual(["api"]);
  });

  it("does not select an AWS deploy for test-only dependency lockfile changes", () => {
    const baseLock = lockfile({ vitestVersion: "3.2.5" });
    const headLock = lockfile({ vitestVersion: "3.2.6" });

    const result = classifyFiles(["package-lock.json"], { baseLock, headLock });

    expect(result.targets).toEqual([]);
    expect(result.reasons[0].reason).toContain("CI/dev-only");
  });

  it("keeps shared deploy script changes conservative", () => {
    expect(classifyFiles(["scripts/select-production-deploy-targets.mjs"]).targets).toEqual([
      "ci",
      "data",
      "api",
      "infra",
      "frontend"
    ]);
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
          "@aws-sdk/client-s3": "3.1075.0",
          concurrently: "10.0.3",
          vite: "7.3.6",
          vitest: vitestVersion
        }
      },
      "apps/api": {
        dependencies: {
          "@aws-sdk/client-s3": "3.1075.0",
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
      "node_modules/@aws-sdk/client-s3": {
        version: "3.1075.0"
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
        dependencies: {
          router: "2.2.0"
        },
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
      "node_modules/router": {
        version: "2.2.0"
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
