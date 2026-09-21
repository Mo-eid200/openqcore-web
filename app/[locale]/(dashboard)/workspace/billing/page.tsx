"use client";

import React, { useCallback, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Crown, Zap, RefreshCw, Sparkles, Users, Clock } from "lucide-react";

import { WorkspaceUpgradeModal } from "../../../(marketing)/components/WorkspaceUpgradeModal";
import AddOnsModal from "@/app/[locale]/(marketing)/components/AddOnsModal";
import AddOnsCard from "./AddOnsCard";
import MonthlySummary from "./MonthlySummary";
import { useWorkspace } from "../../../../context/WorkspaceContext";
import { simulateWorkspaceUpgrade } from "@/app/lib/api/workspace/devSimulateUpgrade";

import { getWorkspaceBilling } from "@/app/lib/api/workspace/billing";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function PageSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-28 rounded-2xl bg-amber-400/[0.03] animate-pulse border border-amber-500/10" />
      <div className="h-20 rounded-2xl bg-amber-400/[0.03] animate-pulse border border-amber-500/10" />
      <div className="h-40 rounded-2xl bg-amber-400/[0.03] animate-pulse border border-amber-500/10" />
    </div>
  );
}

function StaggerIn({ children, index = 0 }: { children: React.ReactNode; index?: number }) {
  return <div className="animate-fade-in-up" style={{ animationDelay: `${index * 80}ms` }}>{children}</div>;
}

function formatDate(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WorkspaceBillingPage() {
  const { activeWorkspace, workspaces, loading: workspaceLoading, refreshWorkspaces, createWorkspace } =
    useWorkspace();
  const queryClient = useQueryClient();

  const [error, setError] = useState<string | null>(null);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showAddOns, setShowAddOns] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const billingKey = ["workspace-billing", activeWorkspace?.id];

  const {
    data: billing,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: billingKey,
    queryFn: () => getWorkspaceBilling(activeWorkspace!.id),
    enabled: !!activeWorkspace,
    staleTime: 30_000,
    gcTime: 5 * 60_000,
    retry: 1,
  });

  const sub = billing?.subscription ?? null;
  const wallet = billing?.wallet ?? null;
  const seats = billing?.seats ?? null;
  const monthlySummary = billing?.monthly_summary ?? [];

  const load = useCallback(async () => {
    setError(null);
    try {
      await refetch();
    } catch (err: any) {
      setError(err?.message || "Failed to load");
    }
  }, [refetch]);

  // ── Actions ───────────────────────────────────────────────────────────────

  const handleUpgrade = useCallback(
    async (params: {
      planId: number;
      billing: "monthly" | "yearly";
      workspaceId?: string;
      newWorkspaceName?: string;
    }) => {
      try {
        let targetWorkspaceId = params.workspaceId;

        if (!targetWorkspaceId && params.newWorkspaceName) {
          const newWorkspace = await createWorkspace({ name: params.newWorkspaceName });
          targetWorkspaceId = newWorkspace.id;
        }

        if (!targetWorkspaceId) {
          setError("Please select or create a workspace first.");
          return;
        }

        const res = await simulateWorkspaceUpgrade(targetWorkspaceId, params.planId, params.billing);

        if (res.scheduled) {
          setNotice(
            res.note || `This workspace will switch plans on ${formatDate(res.scheduled_change_at)}.`
          );
        } else {
          setNotice(`This workspace is now on the ${res.plan_name} plan.`);
        }

        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["workspace-billing", targetWorkspaceId] }),
          refreshWorkspaces(),
        ]);
        setShowUpgrade(false);
      } catch (err: any) {
        setError(err?.response?.data?.detail?.message || err?.message || "Upgrade failed");
      }
    },
    [createWorkspace, queryClient, refreshWorkspaces]
  );

  // ── Render ────────────────────────────────────────────────────────────────

  if (workspaceLoading || !activeWorkspace) {
    return (
      <div className="relative w-full max-w-5xl mx-auto min-h-screen px-2 sm:px-6 xl:px-10 py-8">
        <PageSkeleton />
      </div>
    );
  }

  const isPaid = sub?.has_subscription && sub.status === "active";
  const isCancelPending = isPaid && !!sub?.renews_at && (sub as any)?.cancel_at_period_end;
  const hasScheduledDowngrade = !!(sub as any)?.scheduled_plan_name && !!(sub as any)?.scheduled_change_at;

  // ✅ FIX: "balance" is now specifically the SUBSCRIPTION balance
  // (resets each cycle, doesn't roll over) — previously this read
  // wallet.balance, the combined subscription+addon total. Add-ons
  // get their own AddOnsCard using wallet.addon_balance separately.
  const balance = wallet?.subscription_balance ?? 0;
  const addonBalance = wallet?.addon_balance ?? 0;
  const addonExpiresAt = wallet?.addon_expires_at ?? null;
  const planName = sub?.plan_name || "Free";
  const hasQuota = (wallet?.monthly_credits ?? 0) > 0;
  const used = wallet?.consumed ?? 0;
  const remaining = wallet?.remaining ?? 0;
  const monthlyLimit = wallet?.monthly_credits ?? 0;
  const usagePercent = wallet?.usage_percent ?? 0;

  return (
    <div className="relative w-full max-w-5xl mx-auto min-h-screen px-2 sm:px-6 xl:px-10 py-8 flex flex-col gap-5">
      {/* Header */}
      <section className="flex flex-col gap-2 mb-2">
        <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-300/70">
          <Sparkles className="h-3.5 w-3.5" />
          {activeWorkspace.name} · Workspace billing
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">Billing</h1>
        <p className="text-xs text-white/30">
          This is separate from your personal plan — workspace credits, plan, and renewal are shared by
          all members of {activeWorkspace.name}.
        </p>
      </section>

      {notice && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-400/20 bg-emerald-500/[0.07] px-4 py-3">
          <p className="text-xs text-emerald-300">{notice}</p>
          <button onClick={() => setNotice(null)} className="text-xs text-emerald-300/60 hover:text-emerald-200">
            Dismiss
          </button>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-between rounded-xl border border-red-400/20 bg-red-500/[0.07] px-4 py-3">
          <p className="text-xs text-red-300">{error}</p>
          <button onClick={load} className="flex items-center gap-1.5 text-xs text-red-300/70 hover:text-red-200">
            <RefreshCw className="h-3 w-3" /> Retry
          </button>
        </div>
      )}

      {loading ? (
        <PageSkeleton />
      ) : (
        <>
          {/* Current Plan */}
          <StaggerIn index={0}>
            <div className="rounded-2xl border border-white/[0.06] bg-[#0f1012]/92 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl border shrink-0 ${
                      isPaid
                        ? "border-amber-300/12 bg-amber-300/[0.08] text-amber-300"
                        : "border-white/[0.06] bg-white/[0.03] text-white/30"
                    }`}
                  >
                    <Crown className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white">{planName} plan</div>
                    <div className="text-xs text-white/35 mt-0.5">
                      {isPaid && sub?.billing_cycle
                        ? `${sub.billing_cycle.charAt(0).toUpperCase() + sub.billing_cycle.slice(1)}`
                        : "Free tier"}
                      {isPaid && sub?.renews_at && !isCancelPending && (
                        <> · Renews on {formatDate(sub.renews_at)}</>
                      )}
                      {isCancelPending && sub?.renews_at && (
                        <> · Access ends on {formatDate(sub.renews_at)}</>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowUpgrade(true)}
                  className="h-9 px-5 rounded-xl border border-white/[0.1] bg-white/[0.04] text-xs font-medium text-white/70 hover:bg-white/[0.08] hover:text-white transition-all"
                >
                  {isPaid ? "Adjust plan" : "Upgrade"}
                </button>
              </div>

              {hasScheduledDowngrade && (
                <div className="mt-4 flex items-center justify-between rounded-xl border border-cyan-500/15 bg-cyan-500/[0.05] px-4 py-3">
                  <div className="flex items-center gap-2 text-xs text-cyan-300">
                    <Clock className="h-3.5 w-3.5" />
                    Switching to {(sub as any)?.scheduled_plan_name} on{" "}
                    {formatDate((sub as any)?.scheduled_change_at)}.
                  </div>
                </div>
              )}
            </div>
          </StaggerIn>

          {/* Seats — workspace-specific, no equivalent on the personal side */}
          {seats && (
            <StaggerIn index={1}>
              <div className="rounded-2xl border border-white/[0.06] bg-[#0f1012]/92 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl p-5">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-cyan-300" />
                  <div>
                    <div className="text-base font-semibold text-white">
                      {seats.used} / {seats.limit} seats used
                    </div>
                    <div className="text-xs text-white/35 mt-0.5">
                      {seats.available > 0
                        ? `${seats.available} seat${seats.available !== 1 ? "s" : ""} available`
                        : "No seats available — upgrade to invite more members"}
                    </div>
                  </div>
                </div>
              </div>
            </StaggerIn>
          )}

          {/* Subscription (left) and Add-ons (right) — side by side,
              two independent pools so the team can compare "what's
              left in the plan" vs "what's left in top-ups" at a
              glance. */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <StaggerIn index={2}>
              <div className="rounded-2xl border border-white/[0.06] bg-[#0f1012]/92 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl p-5">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-1">QX Power</h3>
                  <p className="text-xs text-white/35">
                    Shared by every member of this workspace. Consumed as the team uses AI services.
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/[0.05]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/[0.08]">
                      <Zap className="h-5 w-5 text-amber-300" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-white">{balance.toLocaleString()}</div>
                      <div className="text-[10px] text-white/25">Current balance</div>
                    </div>
                  </div>

                  <div className="mt-5">
                    {!hasQuota && (
                      <div className="mb-5 rounded-xl border border-amber-300/10 bg-amber-300/[0.06] p-4">
                        <div className="text-sm font-medium text-amber-200">Free Plan</div>
                        <div className="mt-1 text-xs text-white/45">
                          Upgrade to unlock monthly QXP credits, usage tracking and higher limits.
                        </div>
                      </div>
                    )}

                    {hasQuota && (
                      <>
                        <div className="flex justify-between text-[11px] text-white/40 mb-2">
                          <span>Usage This Cycle</span>
                          <span>{usagePercent}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/[0.05] overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-amber-300 to-amber-200 transition-all duration-700"
                            style={{ width: `${usagePercent}%` }}
                          />
                        </div>
                      </>
                    )}

                    {/* ✅ Tokens Used removed — lifetime-cumulative raw
                        token count, unrelated to the QX-Power units
                        shown elsewhere on this card. */}
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div>
                        <div className="text-[10px] text-white/25">Used</div>
                        <div className="text-red-200 font-medium">{used.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-white/25">Remaining</div>
                        <div className="text-amber-200 font-medium">{remaining.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-white/25">Monthly Limit</div>
                        <div className="text-emerald-200 font-medium">{monthlyLimit.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </StaggerIn>

            <StaggerIn index={3}>
              <AddOnsCard
                addonBalance={addonBalance}
                addonExpiresAt={addonExpiresAt}
                onBuyClick={() => setShowAddOns(true)}
              />
            </StaggerIn>
          </div>

          {/* Monthly Summary — replaces the raw per-transaction table */}
          {monthlySummary.length > 0 && (
            <StaggerIn index={4}>
              <MonthlySummary entries={monthlySummary} />
            </StaggerIn>
          )}
        </>
      )}

      <WorkspaceUpgradeModal
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        onUpgrade={handleUpgrade}
        currentPlanId={sub?.plan_id}
        workspaces={workspaces.map((ws) => ({
          id: ws.id,
          name: ws.name,
          plan: ws.plan,
          planId: ws.plan_id,
        }))}
      />

      <AddOnsModal
        open={showAddOns}
        onClose={() => setShowAddOns(false)}
        targetType="workspace"
        workspaceId={activeWorkspace?.id}
      />
    </div>
  );
}
