import { qxtAuthClient, qxtApiClient, getStoredToken } from "../core/qxtClient";
import { mapApiKeyFromList } from "./auth.mapper";
import type { AuthUser, RawApiKey } from "./auth.types";

// ─── Simple TTL cache ─────────────────────────────────────────────────────────

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

function makeCache<T>(ttlMs: number) {
  let entry: CacheEntry<T> | null = null;

  return {
    get(): T | null {
      if (!entry || Date.now() > entry.expiresAt) {
        entry = null;
        return null;
      }
      return entry.value;
    },
    set(value: T) {
      entry = { value, expiresAt: Date.now() + ttlMs };
    },
    invalidate() {
      entry = null;
    },
  };
}

// ─── Bootstrap types ──────────────────────────────────────────────────────────

export type RawBootstrapWorkspace = {
  id: string;
  name: string;
  slug?: string | null;
  logo_url?: string | null;
  description?: string | null;
  role: string;
  type?: string | null;
  subscription_status?: string | null;
  wallet_balance?: number;
  projects_count?: number;
  members_count?: number;
  agents_count?: number;
  chats_count?: number;
  api_requests?: number;
  created_at?: string | null;
};

export type RawBootstrapSubscription = {
  has_subscription: boolean;
  plan_name: string;
  plan_id?: number | null;
  monthly_credits?: number;
  billing_cycle?: string | null;
  status: string;
  renews_at?: string | null;
  scheduled_plan_name?: string | null;
  scheduled_change_at?: string | null;
};

export type RawBootstrapResponse = {
  user: AuthUser;
  workspaces: RawBootstrapWorkspace[];
  personal_subscription: RawBootstrapSubscription;
};

// ─── Caches ───────────────────────────────────────────────────────────────────

const meCache        = makeCache<AuthUser>(30_000);
const keyCache       = makeCache<string | null>(60_000);
const bootstrapCache = makeCache<RawBootstrapResponse>(30_000);

// ─── fetchBootstrap ───────────────────────────────────────────────────────────

export async function fetchBootstrap(force = false): Promise<RawBootstrapResponse | null> {
  const token = getStoredToken();
  if (!token) return null;

  if (!force) {
    const cached = bootstrapCache.get();
    if (cached) return cached;
  }

  // Bootstrap is identity-level discovery.
  // It must never inherit a previously selected workspace context.
  const res = await qxtAuthClient.get("/api/v1/bootstrap", {
    timeout: 30_000,
    __forcePersonalContext: true,
  } as any);

  const data: RawBootstrapResponse = res.data;

  if (data.user) meCache.set(data.user);
  bootstrapCache.set(data);
  return data;
}

// ─── fetchMe ──────────────────────────────────────────────────────────────────

export async function fetchMe(force = false): Promise<AuthUser> {
  if (!force) {
    const cached = meCache.get();
    if (cached) return cached;
  }

  const res  = await qxtAuthClient.get("/api/v1/auth/me", { timeout: 12000 });
  const user: AuthUser = res.data?.user ?? res.data;
  meCache.set(user);
  return user;
}

// ─── fetchMyApiKey ────────────────────────────────────────────────────────────

export async function fetchMyApiKey(force = false): Promise<string | null> {
  if (!force) {
    const cached = keyCache.get();
    if (cached !== null) return cached;
  }

  try {
    const res = await qxtApiClient.get("/api/v1/api-keys", { timeout: 10000 });
    const arr: RawApiKey[] = Array.isArray(res.data?.items)
      ? res.data.items
      : Array.isArray(res.data)
      ? res.data
      : [];

    const key = mapApiKeyFromList(arr);
    keyCache.set(key);
    return key;
  } catch {
    return null;
  }
}

// ─── Login / Register ─────────────────────────────────────────────────────────

export async function apiLogin(email: string, password: string): Promise<any> {
  const res = await qxtAuthClient.post("/api/v1/auth/login", { email, password });
  return res.data;
}

export async function apiRegister(
  email: string,
  password: string,
  fullName: string
): Promise<any> {
  const res = await qxtAuthClient.post("/api/v1/auth/register", {
    email,
    password,
    full_name: fullName,
  });

  return res.data;
}

// ─── MFA ──────────────────────────────────────────────────────────────────────
//
// Called after apiLogin() returns { mfa_required: true, challenge_id }
// instead of a token — see AuthContext.tsx's MfaRequiredError.

export async function verifyMfaLogin(challengeId: string, code: string): Promise<any> {
  const res = await qxtAuthClient.post("/api/v1/auth/mfa/verify-login", {
    challenge_id: challengeId,
    code,
  });
  return res.data;
}

// ─── Billing ──────────────────────────────────────────────────────────────────

export async function fetchBillingOverview(): Promise<any> {
  const res = await qxtApiClient.get("/api/v1/company/dashboard/overview", {
    timeout: 12000,
  });
  return res.data;
}

// ─── Cache invalidation ───────────────────────────────────────────────────────

export function invalidateAuthCache(): void {
  meCache.invalidate();
  keyCache.invalidate();
  bootstrapCache.invalidate();
}