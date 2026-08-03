// app/lib/api/workspace/billing.ts
//
// Matches app/api/v1/workspace/billing.py's GET /workspaces/{id}/billing
// response shape field-for-field. If that endpoint's response changes,
// update the types here to match — don't let them drift.

import { qxtApiClient } from "../core/qxtClient";

const API_V1 = "/api/v1";

// =========================================================
// TYPES
// =========================================================

export interface WorkspaceWalletInfo {
  balance: number;
  currency: "QXP";
  added: number;
  consumed: number;
  remaining: number;
  monthly_credits: number;
  usage_percent: number;
  tokens_used: number;
  tokens_remaining: number;
  period_start: string | null;
}

// 🔥 NOTE: plan_id (and plan_name/status/billing_cycle/renews_at)
// are ONLY present on the wire when has_subscription is true — the
// backend's default "no subscription" dict literally omits plan_id
// as a key rather than setting it to null. Marked optional here
// (`?:`) rather than `| null` for that reason; always read it as
// `sub?.plan_id ?? null` on the consuming side, never `sub.plan_id`
// directly.
export interface WorkspaceSubscription {
  has_subscription: boolean;
  plan_id?: number;
  plan_name: string;
  status: string;
  billing_cycle: "monthly" | "yearly" | null;
  renews_at: string | null;
  monthly_credits: number;
  // Present when a downgrade is scheduled — not set by this endpoint
  // today (subscription_payload doesn't include them), but the page
  // reads them defensively via `(sub as any)?.x`. Included here as
  // optional so that can eventually become a real typed field instead
  // of an `any` cast once the backend adds them.
  scheduled_plan_name?: string;
  scheduled_change_at?: string;
  cancel_at_period_end?: boolean;
}

export interface WorkspaceSeats {
  limit: number;
  used: number;
  available: number;
}

export interface WorkspaceBillingPlan {
  id: number;
  name: string;
  plan_type: "personal" | "workspace" | "company";
  monthly_credits: number;
  seat_limit: number;
  storage_gb: number;
  has_api: boolean;
  has_priority_queue: boolean;
  is_active: boolean;
  monthly_price: number | null;
  yearly_price: number | null;
}

export type WorkspaceTransactionType = "credit" | "debit" | "capture" | string;

export interface WorkspaceTransaction {
  id: string | number;
  amount: number;
  transaction_type: WorkspaceTransactionType;
  reason: string | null;
  reference_id: string | null;
  created_at: string;
}

export interface WorkspaceBillingData {
  workspace_id: string;
  wallet: WorkspaceWalletInfo;
  subscription: WorkspaceSubscription;
  seats: WorkspaceSeats;
  transactions: WorkspaceTransaction[];
  payment_methods: unknown[];
  invoices: unknown[];
}

// =========================================================
// ERROR HELPER
// =========================================================

function extractErrorMessage(err: unknown, fallback: string): string {
  const responseData = (err as any)?.response?.data;
  const message = responseData?.error?.message;
  if (typeof message === "string" && message.trim()) return message;

  const detail = responseData?.detail;
  if (typeof detail === "string") return detail;
  if (detail?.message) return detail.message as string;

  return fallback;
}

// =========================================================
// API
// =========================================================

/**
 * GET /api/v1/workspaces/{workspace_id}/billing
 * Admin-only (enforced server-side via WorkspaceService.require_admin).
 */
export async function getWorkspaceBilling(
  workspaceId: string,
): Promise<WorkspaceBillingData> {
  try {
    const { data } = await qxtApiClient.get<WorkspaceBillingData>(
      `${API_V1}/workspaces/${workspaceId}/billing`,
    );
    return data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load workspace billing."));
  }
}