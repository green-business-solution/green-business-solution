export function isLocalDevelopmentHost(hostname = typeof window === "undefined" ? "" : window.location.hostname) {
  return ["localhost", "127.0.0.1", ""].includes(hostname);
}

async function parseResponsePayload(response: Response) {
  const text = await response.text();
  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text) as { error?: string };
  } catch {
    return {};
  }
}

function unreachableApiMessage() {
  return isLocalDevelopmentHost()
    ? "Could not reach the local API. Run `npm run dev` from the repo root and confirm the API is running at http://127.0.0.1:8787."
    : "Could not reach the server. Refresh the page and try again.";
}

function failedPostFallback(status: number) {
  if (status < 500) {
    return `Request failed with HTTP ${status}.`;
  }

  return isLocalDevelopmentHost()
    ? "The local API returned an error. Check the terminal running `npm run dev`; if AWS credentials are mentioned, run `aws sso login --profile gbs` and restart the dev server."
    : "The server returned an error. Try again in a minute.";
}

export async function apiGet<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;

  try {
    response = await fetch(path, init);
  } catch {
    throw new Error(unreachableApiMessage());
  }

  const payload = await parseResponsePayload(response);

  if (!response.ok) {
    throw new Error(payload.error || `Request failed with HTTP ${response.status}.`);
  }

  return payload as T;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  let response: Response;

  try {
    response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });
  } catch {
    throw new Error(unreachableApiMessage());
  }

  const payload = await parseResponsePayload(response);

  if (!response.ok) {
    throw new Error(payload.error || failedPostFallback(response.status));
  }

  return payload as T;
}
