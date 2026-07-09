# Green Business Solution

Green Business Solution is a React + Vite application for building operational tools around sustainable business workflows.

For the current website direction, user flow, intake decisions, and long-term product goal, see [docs/product-vision.md](./docs/product-vision.md).

## Source of truth

GitHub is the source of truth for code, docs, workflow files, infrastructure templates, and project history.
AWS is the deployment target and the source of truth for runtime data, customer uploads, runtime cache payloads, generated fixture archives, and durable cloud state.

All LLM-assisted work must follow [AGENTS.md](./AGENTS.md), [AGENT_WORKFLOW.md](./AGENT_WORKFLOW.md), and the review gates in [review.md](./review.md).
Use [ARCHITECTURE.md](./ARCHITECTURE.md) and [RESOURCE_MAP.md](./RESOURCE_MAP.md) before changing system boundaries, AWS resources, deploy routing, or production behavior.

## Development

```sh
aws sso login --profile retrofi-prod
npm install
npm run dev
```

The development command starts:

- local API: `http://127.0.0.1:8787`
- Vite app: first available port starting at `http://127.0.0.1:5173`

Google sign-in is configured for local development with the Green Business Solution web OAuth client. The default public client ID is built into the app for localhost testing. Override it only when switching OAuth clients:

```sh
VITE_GOOGLE_CLIENT_ID=google-web-client-id GOOGLE_CLIENT_ID=google-web-client-id npm run dev
```

The Google client secret is not used by the local browser sign-in flow.

## Local Troubleshooting

If the website shows an API or request error after Google sign-in, intake submission, or admin loading:

```sh
aws sso login --profile retrofi-prod
aws sts get-caller-identity --profile retrofi-prod
npm run dev
curl http://127.0.0.1:8787/api/diagnostics
```

The `sts` command should show account `059310317821`.
The old `gbs` profile and account `448016109714` are legacy rollback context only.
The diagnostics endpoint should return `"ok": true`.

## Checks

```sh
npm run typecheck
npm run build
```

This repository uses npm workspaces. The root commands delegate to the `apps/web` and `apps/api`
workspace manifests while shared scripts and data tooling continue to run from the repository root.

## Production

The `retrofi.org` production hosting stack is documented in [docs/production-deployment.md](./docs/production-deployment.md).
