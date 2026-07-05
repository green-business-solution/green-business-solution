# Workspace Architecture

The repository is an npm workspace monorepo. The first workspace pass keeps source files in their
existing locations while separating package/deploy dependency boundaries:

- `apps/web`: React/Vite browser app dependencies and frontend scripts.
- `apps/api`: Express/Lambda runtime dependencies used to build the production Lambda package.
- root package: orchestration scripts, repo-wide tests, data scripts, and shared development tooling.

Current source locations remain:

- frontend source: `src/`, `index.html`, `public/`, `vite.config.ts`
- API source: `server/`
- data/research scripts: `scripts/`
- infrastructure: `infra/`

The root `npm run dev`, `npm run build`, and `npm run typecheck` commands delegate to the relevant
workspace so existing local workflows keep working. Production Lambda packaging copies
`apps/api/package.json` into the build directory before installing runtime dependencies, which keeps
frontend/build packages such as Vite out of the Lambda zip.

Future workspace moves can physically relocate source into `apps/web/src` and `apps/api/src` after the
deploy and dependency boundaries have stayed stable for a few iterations.
