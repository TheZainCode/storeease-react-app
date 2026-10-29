import { API_BASE_URL } from "../config/env";

export async function apiRequest(
  endpoint,
  { method = "GET", body, headers = {}, ...options } = {}
) {
  const normalizedEndpoint = endpoint.replace(/^\/+/, "");
  const url = `${API_BASE_URL}/${normalizedEndpoint}`;

  const requestHeaders = new Headers(headers);

  if (body !== undefined && !requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  let response;

  try {
    response = await fetch(url, {
      ...options,
      method,
      headers: requestHeaders,
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  } catch (error) {
    if (error.name === "AbortError") {
      throw error;
    }

    throw new Error("Network error. Please check your connection.");
  }

  if (!response.ok) {
    let message = `Request failed (${response.status})`;

    try {
      const data = await response.json();
      if (typeof data.message === "string" && data.message.trim()) {
        message = data.message;
      }
    } catch {
      // Keep the fallback message when no JSON error is available.
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}