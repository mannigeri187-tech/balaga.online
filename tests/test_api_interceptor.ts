// Polyfill browser globals and import.meta.env for Node test runner
if (typeof (globalThis as any).import === "undefined") {
  (globalThis as any).import = { meta: { env: {} } };
}

let capturedHeaders: Headers | undefined;
let capturedUrl: string | undefined;

const store = new Map<string, string>();
(globalThis as any).window = globalThis;
(globalThis as any).window.location = { origin: "http://localhost:3000" };
(globalThis as any).localStorage = {
  getItem: (k: string) => store.get(k) || null,
  setItem: (k: string, v: string) => store.set(k, v),
  removeItem: (k: string) => store.delete(k),
};

const mockFetch = async (input: any, init?: any) => {
  capturedUrl = typeof input === "string" ? input : input?.url;
  capturedHeaders = new Headers(init?.headers);
  return new Response(JSON.stringify({ status: "ok" }), { status: 200 });
};

(globalThis as any).fetch = mockFetch;
(globalThis as any).window.fetch = mockFetch;

async function runInterceptorVerification() {
  console.log("=== COMPREHENSIVE API INTERCEPTOR VERIFICATION ===\n");
  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string, detail?: string) {
    if (condition) {
      console.log(`✅ [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`❌ [FAIL] ${testName}: ${detail || ""}`);
      failed++;
    }
  }

  // Import supabase client and mock methods BEFORE installing interceptor
  const { supabase } = await import("../apps/web/src/lib/supabase");

  let mockSession = {
    access_token: "test-supabase-valid-jwt-token-123",
    expires_at: Math.floor(Date.now() / 1000) + 3600, // 1 hour valid
  };

  let refreshCalled = false;
  (supabase.auth as any).getSession = async () => ({
    data: { session: mockSession },
    error: null,
  });

  (supabase.auth as any).refreshSession = async () => {
    refreshCalled = true;
    mockSession = {
      access_token: "fresh-newly-refreshed-jwt-token",
      expires_at: Math.floor(Date.now() / 1000) + 3600,
    };
    return {
      data: { session: mockSession },
      error: null,
    };
  };

  // Now dynamically import api.ts so it wraps the mockFetch
  await import("../apps/web/src/lib/api");

  // 1. Verify interceptor is installed globally
  assert(
    (globalThis as any).__balaga_interceptor_active === true || (globalThis as any).window?.__balaga_interceptor_active === true,
    "1. Global fetch interceptor installed and active on window/globalThis"
  );

  // 2. Internal relative request to /api/founders/hiring/jobs
  localStorage.setItem("balaga_active_world", "founders");
  await (globalThis as any).fetch("/api/founders/hiring/jobs", {
    headers: {
      "x-mock-user": "true",
      "Content-Type": "application/json",
    },
  });

  assert(
    capturedHeaders?.get("Authorization") === "Bearer test-supabase-valid-jwt-token-123",
    "2. Injects Supabase JWT Authorization header on internal /api/* requests",
    `Expected Bearer token, got: ${capturedHeaders?.get("Authorization")}`
  );

  assert(
    capturedHeaders?.get("x-mock-user") === null,
    "3. Strips obsolete 'x-mock-user' header"
  );

  assert(
    capturedHeaders?.get("x-platform-world") === "founders",
    "4. 'x-platform-world' set to 'founders' for founders endpoint"
  );

  // 3. Social endpoint route isolation override
  localStorage.setItem("balaga_active_world", "founders"); // active world is founders, but calling social endpoint
  await (globalThis as any).fetch("/api/social/posts", {});

  assert(
    capturedHeaders?.get("x-platform-world") === "socializing",
    "5. Correctly assigns 'socializing' world for /api/social/* endpoints regardless of localStorage"
  );

  // 4. External URL containing /api/ must NOT be intercepted
  capturedHeaders = undefined;
  await (globalThis as any).fetch("https://api.github.com/api/v3/user", {
    headers: {
      "Accept": "application/json",
    },
  });

  assert(
    capturedHeaders?.get("Authorization") === null && capturedHeaders?.get("x-platform-world") === null,
    "6. External URL containing '/api/' strictly excluded from token/world injection (Prevents token leakage)"
  );

  // 5. Existing Authorization header preservation
  capturedHeaders = undefined;
  await (globalThis as any).fetch("/api/founders/dashboard", {
    headers: {
      "Authorization": "Bearer pre-existing-custom-token-xyz",
    },
  });

  assert(
    capturedHeaders?.get("Authorization") === "Bearer pre-existing-custom-token-xyz",
    "7. Existing custom Authorization headers preserved without overwrite"
  );

  // 6. Token expiration auto-refresh
  mockSession = {
    access_token: "expired-token",
    expires_at: Math.floor(Date.now() / 1000) - 100, // Expired 100s ago
  };

  capturedHeaders = undefined;
  await (globalThis as any).fetch("/api/founders/feed", {});

  assert(
    refreshCalled && capturedHeaders?.get("Authorization") === "Bearer fresh-newly-refreshed-jwt-token",
    "8. Expired Supabase session automatically triggers refreshSession() and injects fresh token"
  );

  // 7. Concurrent requests handling
  const tokens: (string | null)[] = [];
  const makeReq = async (id: number) => {
    await (globalThis as any).fetch(`/api/founders/${id}`);
    tokens.push(capturedHeaders?.get("Authorization") || null);
  };

  await Promise.all([makeReq(1), makeReq(2), makeReq(3)]);

  assert(
    tokens.length === 3 && tokens.every(t => t?.startsWith("Bearer fresh-newly-refreshed")),
    "9. Concurrent requests all succeed with valid tokens without race conditions"
  );

  console.log(`\n=== API INTERCEPTOR VERIFICATION: ${passed} PASSED, ${failed} FAILED ===\n`);
  process.exit(failed > 0 ? 1 : 0);
}

runInterceptorVerification().catch(err => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
