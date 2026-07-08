# Resource Map

This file maps source paths to runtime surfaces, cloud resources, deploy targets, and checks.
It is operational memory for humans and agents.
Keep it current whenever resources, deployment targets, or ownership boundaries change.

## Source Path Ownership

| Path | Owner | Checks | Deploy Target | Notes |
| --- | --- | --- | --- | --- |
| `apps/web/` | Frontend | frontend typecheck, frontend tests, frontend build | frontend | Browser code and public assets |
| `apps/api/` | Backend API | API tests, typecheck, lint | api | Privileged operations and service logic |
| `data/` | Data | migration checks, data validation | data | Durable runtime data and migrations |
| `infra/` | Infrastructure | infrastructure checks | infra | Cloud resources and deployment configuration |
| `scripts/` | Tooling | script tests | full when shared | Deploy, routing, smoke, and maintenance scripts |
| `docs/` | Documentation | docs checks | none | No deploy unless docs are published runtime artifacts |

## Deploy Targets

| Target | Purpose | Typical Inputs | Smoke Check |
| --- | --- | --- | --- |
| `data` | Durable data resources and migrations | `data/`, `infra/data/` | Verify data resource availability |
| `api` | Backend runtime | `apps/api/`, API infra, shared backend dependencies | Call health endpoint or key API route |
| `frontend` | Browser build and public assets | `apps/web/`, frontend infra, shared frontend dependencies | Load key page through public URL |
| `infra` | Shared hosting, routing, DNS, certificates, or edge resources | `infra/` | Verify affected runtime surface |
| `full` | Bootstrap, recovery, unknown, or shared changes | Any cross-cutting change | Run all relevant smoke checks |

## Secret Safety

Do not put secrets in this file.
Allowed content includes account aliases, profile names, regions, ARNs, resource names, console links, and safe CLI commands.
Forbidden content includes access keys, session tokens, OAuth client secrets, passwords, private keys, database credentials, and plaintext secret values.
