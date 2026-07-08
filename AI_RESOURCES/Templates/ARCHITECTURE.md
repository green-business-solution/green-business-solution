# Architecture

This file explains the major architecture of the project.
Keep it practical.
Future agents should be able to read this file and understand system boundaries before editing code.

## System Overview

Describe what the system does and who uses it.
Include the main runtime surfaces and the most important external dependencies.

## Major Components

| Component | Purpose | Owner Path | Runtime Surface |
| --- | --- | --- | --- |
| Frontend | User interface | `apps/web/` | Browser |
| Backend API | Application logic and privileged operations | `apps/api/` | API service |
| Data | Durable project data and migrations | `data/` | Database or object storage |
| Infrastructure | Cloud resources and deployment configuration | `infra/` | AWS or other cloud provider |

## Boundaries

Document frontend, backend, data, infrastructure, and deployment boundaries.
Do not expose backend secrets or cloud credentials to browser code.

## Open Questions

- [ ] Document unresolved architecture questions here.
