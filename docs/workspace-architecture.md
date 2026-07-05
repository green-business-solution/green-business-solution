# Workspace Architecture

The repository is an npm workspace monorepo with physically separated app source:

- `apps/web`: React/Vite browser app dependencies, scripts, and source under `apps/web/src`.
- `apps/api`: Express/Lambda runtime dependencies and API source under `apps/api/server`.
- root package: orchestration scripts, repo-wide tests, data scripts, and shared development tooling.

Canonical source locations:

- frontend source: `apps/web/src`, `index.html`, `public/`, `vite.config.ts`
- API source: `apps/api/server`
- data/research scripts: `scripts/`
- shared runtime data files: `data/`
- infrastructure: `infra/`

The root `npm run dev`, `npm run build`, and `npm run typecheck` commands delegate to the relevant
workspace so existing local workflows keep working. Production Lambda packaging copies
`apps/api/server` into the zip as `/server` and installs dependencies from `apps/api/package.json`,
which keeps frontend/build packages such as Vite out of the Lambda runtime package.

There are no canonical root-level `src/` or `server/` source aliases. New code should import API helpers
from `apps/api/server/...` and frontend files from `apps/web/src/...`.
