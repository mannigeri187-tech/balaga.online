/**
 * Balaga Online - Cloudflare Worker
 * 
 * High-performance edge worker providing:
 * 1. Reverse proxy for /api/* to the authoritative Render backend (https://balaga-online.onrender.com)
 * 2. Static asset delivery with SPA fallback for client-side navigation
 * 
 * Security & Integrity:
 * - Fixed trusted backend origin (never accepts arbitrary or user-supplied destination hosts).
 * - Enforces HTTPS and rejects embedded credentials, custom ports, or unapproved domains.
 * - Preserves Authorization headers, world context headers (x-platform-world), methods, and bodies.
 * - Handles multipart form-data without corrupting boundary headers.
 * - Bounded 30-second timeout with clean 504/502 JSON error handling.
 * - Sets redirect: "manual" to prevent open redirect exploitation.
 * - Never returns index.html for API requests.
 */

const APPROVED_PRODUCTION_BACKEND = "https://balaga-online.onrender.com";
const PROXY_TIMEOUT_MS = 30000;

/**
 * Validates and resolves the backend origin.
 * Strictly enforces that only the approved production backend or local test loopback can be targeted.
 */
function resolveBackendOrigin(env) {
  if (env && typeof env.BACKEND_API_ORIGIN === "string" && env.BACKEND_API_ORIGIN.trim()) {
    try {
      const parsed = new URL(env.BACKEND_API_ORIGIN.trim());
      // Reject any userinfo (e.g. user:pass@host)
      if (parsed.username || parsed.password) {
        return APPROVED_PRODUCTION_BACKEND;
      }
      // Exact production origin match
      if (parsed.origin === APPROVED_PRODUCTION_BACKEND) {
        return APPROVED_PRODUCTION_BACKEND;
      }
      // Permit local loopback solely for testing/development environments
      const isLoopback =
        (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1") &&
        (parsed.protocol === "http:" || parsed.protocol === "https:");
      if (isLoopback) {
        return parsed.origin;
      }
    } catch {
      // Invalid URL in env, fallback to approved production origin
    }
  }
  return APPROVED_PRODUCTION_BACKEND;
}

/**
 * Handles reverse proxying of /api/* requests to the backend.
 */
async function handleApiProxy(request, env) {
  const incomingUrl = new URL(request.url);
  const backendOrigin = resolveBackendOrigin(env);
  const backendUrl = new URL(incomingUrl.pathname + incomingUrl.search, backendOrigin);

  // Clone headers and rewrite host for upstream origin
  const proxyHeaders = new Headers(request.headers);
  const targetHost = new URL(backendOrigin).host;
  proxyHeaders.set("host", targetHost);

  // Preserve client origin if present, or set to incoming host
  if (!proxyHeaders.has("origin") && incomingUrl.origin) {
    proxyHeaders.set("origin", incomingUrl.origin);
  }

  // Construct request options
  const hasBody = request.method !== "GET" && request.method !== "HEAD" && request.body !== null;
  const proxyInit = {
    method: request.method,
    headers: proxyHeaders,
    redirect: "manual", // Prevent automatic redirect following to avoid open proxy vulnerability
  };

  if (hasBody) {
    proxyInit.body = request.body;
    // @ts-ignore - duplex is required in standard Node/Fetch stream implementations
    proxyInit.duplex = "half";
  }

  // Bounded timeout and client cancellation controller
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort(new Error("Upstream gateway timeout: backend did not respond within 30s"));
  }, PROXY_TIMEOUT_MS);

  if (request.signal) {
    request.signal.addEventListener("abort", () => {
      controller.abort(new Error("Client cancelled request"));
    });
  }

  proxyInit.signal = controller.signal;

  try {
    const backendResponse = await fetch(backendUrl.toString(), proxyInit);
    clearTimeout(timeoutId);

    // Return backend response with original headers, status, and body stream
    const responseHeaders = new Headers(backendResponse.headers);

    return new Response(backendResponse.body, {
      status: backendResponse.status,
      statusText: backendResponse.statusText,
      headers: responseHeaders,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    const isTimeout = controller.signal.aborted && !request.signal?.aborted;
    const statusCode = isTimeout ? 504 : 502;

    return new Response(
      JSON.stringify({
        error: isTimeout ? "Gateway Timeout" : "Backend API Gateway Error",
        message: err instanceof Error ? err.message : "Failed to reach authoritative API backend",
        path: incomingUrl.pathname,
      }),
      {
        status: statusCode,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
  }
}

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 1. Route /api/* requests to authoritative backend proxy
    if (url.pathname === "/api" || url.pathname.startsWith("/api/")) {
      return handleApiProxy(request, env);
    }

    // 2. Route static assets and client-side SPA navigation
    if (env && env.ASSETS) {
      const response = await env.ASSETS.fetch(request);
      if (response.status === 404) {
        // SPA fallback: return index.html for unknown frontend routes
        const spaUrl = new URL(request.url);
        spaUrl.pathname = "/index.html";
        return env.ASSETS.fetch(new Request(spaUrl.toString(), request));
      }
      return response;
    }

    return new Response("Chill2Build Online Worker Active", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  },
};
