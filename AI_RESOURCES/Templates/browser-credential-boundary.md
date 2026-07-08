# Browser Credential Boundary

The browser should never receive AWS credentials.
Browser code is public code running on a user's machine.
Anything sent to it should be treated as exposed.

## Safe Browser Inputs

The browser can receive public configuration:

- API base URL.
- OAuth client ID.
- CloudFront URL.
- Feature flags that are not sensitive.
- Public asset URLs.

## Unsafe Browser Inputs

The browser should not receive:

- AWS access keys.
- AWS secret access keys.
- AWS session tokens.
- IAM role credentials.
- OAuth client secrets.
- Database credentials.
- Signing secrets.
- Private keys.
- Raw secret values.

## Safe AWS Access Pattern

The backend should own AWS access.

Typical flow:

1. Browser calls the backend API.
2. Backend authenticates and authorizes the request.
3. Backend uses an IAM role or equivalent service identity to access AWS resources.
4. Backend returns only the data or scoped capability the browser needs.

When the browser needs direct file transfer, use presigned URLs:

1. The backend creates a short-lived URL.
2. The URL is scoped to one object and one action.
3. The browser uses that URL without receiving AWS credentials.
