import { supabase } from "./supabase";

/**
 * Returns authorization headers for API requests.
 * Uses real Supabase session access token when authenticated.
 * Includes x-platform-world for strict world context isolation.
 */
export async function getAuthHeaders(world?: "socializing" | "founders"): Promise<Record<string, string>> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (world) {
    headers["x-platform-world"] = world;
  }

  try {
    let { data } = await supabase.auth.getSession();
    let session = data?.session;

    // Check if token is expired or within 10s of expiring, trigger refresh
    if (session?.expires_at && session.expires_at * 1000 < Date.now() + 10000) {
      try {
        const { data: refreshed } = await supabase.auth.refreshSession();
        if (refreshed?.session) {
          session = refreshed.session;
        }
      } catch {
        // Refresh failed, proceed with existing token
      }
    }

    const token = session?.access_token;
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  } catch {
    // Session unavailable or unconfigured
  }

  return headers;
}

/**
 * Authenticated API Fetch wrapper.
 * Injects Supabase Bearer token and headers automatically.
 */
export async function apiFetch(
  endpoint: string,
  options: RequestInit = {},
  world?: "socializing" | "founders"
): Promise<Response> {
  const authHeaders = await getAuthHeaders(world);
  const finalHeaders = {
    ...authHeaders,
    ...(options.headers || {}),
  };

  return fetch(endpoint, {
    ...options,
    headers: finalHeaders,
  });
}

/**
 * Helper to determine if a requested URL is an internal API endpoint.
 * Excludes external third-party URLs to prevent leaking Supabase JWTs or world headers.
 */
function isInternalApiUrl(url: string): boolean {
  if (!url || typeof url !== "string") return false;
  if (url.startsWith("/api/") || url.startsWith("api/")) return true;

  try {
    if (typeof window !== "undefined" && window.location) {
      const parsed = new URL(url, window.location.origin);
      return parsed.origin === window.location.origin && parsed.pathname.startsWith("/api/");
    }
  } catch {
    // Invalid URL string
  }

  return false;
}

/**
 * Global API Fetch Interceptor
 * Automatically intercepts internal /api/* fetch requests in the application,
 * injecting the active Supabase JWT Authorization header and x-platform-world context
 * if not already set, and stripping obsolete x-mock-user headers.
 * Preserves public endpoints, external requests, FormData uploads, and custom headers.
 */
declare global {
  interface Window {
    __balaga_interceptor_active?: boolean;
  }
}

const targetScope = typeof window !== "undefined" ? window : (globalThis as any);

if (targetScope && !targetScope.__balaga_interceptor_active && targetScope.fetch) {
  targetScope.__balaga_interceptor_active = true;
  const originalFetch = targetScope.fetch.bind(targetScope);

  targetScope.fetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    let urlStr = "";
    if (typeof input === "string") {
      urlStr = input;
    } else if (input instanceof URL) {
      urlStr = input.toString();
    } else if (input && typeof (input as any).url === "string") {
      urlStr = (input as any).url;
    }

    // Only intercept internal /api/ routes; never inject into external URLs
    if (isInternalApiUrl(urlStr)) {
      const headers = new Headers(init?.headers || (input instanceof Request ? input.headers : undefined));

      // 1. Inject Authorization header if missing
      if (!headers.has("Authorization")) {
        try {
          let { data } = await supabase.auth.getSession();
          let session = data?.session;

          // Auto-refresh token if expired or about to expire
          if (session?.expires_at && session.expires_at * 1000 < Date.now() + 10000) {
            try {
              const { data: refreshed } = await supabase.auth.refreshSession();
              if (refreshed?.session) {
                session = refreshed.session;
              }
            } catch {
              // Refresh failure handled gracefully
            }
          }

          const token = session?.access_token;
          if (token) {
            headers.set("Authorization", `Bearer ${token}`);
          }
        } catch {
          // Session error or offline
        }
      }

      // 2. Inject x-platform-world header if missing
      if (!headers.has("x-platform-world")) {
        try {
          if (urlStr.includes("/api/social")) {
            headers.set("x-platform-world", "socializing");
          } else if (urlStr.includes("/api/founders")) {
            headers.set("x-platform-world", "founders");
          } else {
            const activeWorld = localStorage.getItem("balaga_active_world");
            if (activeWorld === "socializing" || activeWorld === "founders") {
              headers.set("x-platform-world", activeWorld);
            } else {
              headers.set("x-platform-world", "founders");
            }
          }
        } catch {
          // localStorage unavailable
        }
      }

      // 3. Strip obsolete mock headers
      headers.delete("x-mock-user");

      init = {
        ...init,
        headers,
      };
    }

    return originalFetch(input, init);
  };
}
