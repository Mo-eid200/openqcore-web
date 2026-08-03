// app/lib/api/workspace/devSimulateUpgrade.ts
//
// ⚠️ DEV-ONLY — calls the temporary /dev/simulate/upgrade and
// /dev/simulate/renewal backend endpoints, scoped to
// context_type='workspace' ONLY. Delete this file once real
// 2Checkout credentials are wired up via createCheckout() from
// lib/api/console/billing.ts.
//
// 🔒 By design, this file's functions take NO contextType parameter
// — they always pass "workspace" to the backend. This makes it
// structurally impossible to call this from workspace/billing/page.tsx
// with a personal user id by mistake; the personal equivalent lives
// in its own file (lib/api/console/devSimulateUpgrade.ts) which is
// hardcoded to "user" the same way. Each page imports only the file
// that matches its own context.

import { qxtApiClient } from "../core/qxtClient";

export interface SimulateUpgradeResult {
  success: true;
  scheduled: boolean;

  // Present when scheduled === false (immediate upgrade applied)
  plan_name?: string;
  credited: number;

  // Present when scheduled === true (downgrade scheduled for next renewal)
  scheduled_plan_id?: number;
  scheduled_plan_name?: string;
  scheduled_change_at?: string | null;

  context_type: string;
  context_id: string;
  note?: string;
}

export async function simulateWorkspaceUpgrade(
  workspaceId: string,
  planId: number,
  billingCycle: "monthly" | "yearly" = "monthly"
): Promise<SimulateUpgradeResult> {
  const { data } = await qxtApiClient.post("/api/v1/dev/simulate/upgrade", {
    context_type: "workspace",
    context_id: workspaceId,
    plan_id: planId,
    billing_cycle: billingCycle,
  });
  return data;
}

export interface SimulateRenewalResult {
  success: true;
  canceled: boolean;
  downgrade_applied?: boolean;
  effective_plan_id?: number;
  effective_plan_name?: string;
  credited: number;
  note?: string;
}

export async function simulateWorkspaceRenewal(
  workspaceId: string
): Promise<SimulateRenewalResult> {
  const { data } = await qxtApiClient.post("/api/v1/dev/simulate/renewal", {
    context_type: "workspace",
    context_id: workspaceId,
  });
  return data;
}