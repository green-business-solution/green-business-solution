# Green Business Solution

Green Business Solution is a React + Vite application for building operational tools around sustainable business workflows.

## Source of truth

GitHub is the source of truth for this project. AWS is a deployment target and should not contain code changes that are missing from GitHub.

All LLM-assisted work must follow [AGENT_WORKFLOW.md](./AGENT_WORKFLOW.md), including committing changes, pushing them to GitHub, and explaining what changed.

## Development

```sh
aws sso login --profile gbs
npm install
npm run dev
```

The development command starts:

- local API: `http://127.0.0.1:8787`
- Vite app: first available port starting at `http://127.0.0.1:5173`

## Local Troubleshooting

If the website shows an API or request error after entering a temporary code:

```sh
aws sso login --profile gbs
aws sts get-caller-identity --profile gbs
npm run dev
curl http://127.0.0.1:8787/api/diagnostics
```

The `sts` command should show account `448016109714`. The diagnostics endpoint should return `"ok": true`.

## Checks

```sh
npm run typecheck
npm run build
```
