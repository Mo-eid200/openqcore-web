"use client";

import React, { useState } from "react";
import {
  Crown,
  Zap,
  RefreshCw,
  Sparkles,
  Clock,
  Undo2,
} from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { PersonalUpgradeModal } from "../../../(marketing)/components/PersonalUpgradeModal";
import PaymentMethods from "./PaymentMethods";
import TransactionHistory from "./TransactionHistory";
import OpenQCoreLoader from "../../components/ui/OpenQCoreLoader";

import { simulatePersonalUpgrade } from "@/app/lib/api/console/devSimulateUpgrade";
import { useAuth } from "../../../../context/AuthContext";

import {
  getConsoleBilling,
  cancelSubscription,
  undoCancelSubscription,
  undoScheduledDowngrade,
  setDefaultPaymentMethod,
  removePaymentMethod,
  type PaymentMethod as PM,
} from "@/app/lib/api/console/billing";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function InfoBanner({
  tone,
  message,
  actionLabel,
  onAction,
}: {
  tone: "success" | "error";
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const styles =
    tone === "success"
      ? "border-emerald-300/15 bg-emerald-300/[0.06] text-emerald-200"
      : "border-red-300/15 bg-red-300/[0.06] text-red-200";

  return (
    <div
      className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${styles}`}
    >
      <p className="text-xs">{message}</p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="text-xs transition-all hover:opacity-100 opacity-75"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BillingPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [showUpgrade, setShowUpgrade] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionPending, setActionPending] = useState<string | null>(null);

  // ── Query ────────────────────────────────────────────────────────────────

  const {
    data: billing,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["console-billing"],
    queryFn: getConsoleBilling,
    staleTime: 30_000,
    retry: 1,
  });

  const sub = billing?.subscription ?? null;
  const wallet = billing?.wallet ?? null;
  const methods = billing?.payment_methods ?? [];
  const invoices = billing?.invoices ?? [];
  const transactions = billing?.transactions ?? [];

  // ── Actions ───────────────────────────────────────────────────────────────

  async function handleUpgrade(
    planId: number,
    cycle: "monthly" | "yearly"
  ) {
    if (!user) return;

    try {
      const res = await simulatePersonalUpgrade(
        String(user.id),
        planId,
        cycle
      );

      if (res.scheduled) {
        setNotice(
          res.note ||
            `Your plan will switch to ${
              res.scheduled_plan_name || "the new plan"
            } on ${formatDate(res.scheduled_change_at)}.`
        );
      } else {
        setNotice(`You're now on the ${res.plan_name} plan.`);
      }

      await refetch();
      setShowUpgrade(false);
    } catch (err: any) {
      setError(
        err?.response?.data?.detail?.message ||
          err?.message ||
          "Upgrade failed"
      );
    }
  }

  async function handleCancel() {
    if (
      !window.confirm(
        "Cancel your subscription? You'll keep access until the end of your billing period."
      )
    ) {
      return;
    }

    try {
      setActionPending("cancel");
      await cancelSubscription("user");
      setNotice(
        "Your subscription will cancel at the end of the current billing period."
      );
      await refetch();
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to cancel");
    } finally {
      setActionPending(null);
    }
  }

  async function handleUndoCancel() {
    try {
      setActionPending("undo-cancel");
      await undoCancelSubscription("user");
      setNotice("Cancellation reversed — your plan will continue as normal.");
      await refetch();
    } catch (err: any) {
      setError(err?.response?.data?.detail || "Failed to undo cancellation");
    } finally {
      setActionPending(null);
    }
  }

  async function handleUndoDowngrade() {
    try {
      setActionPending("undo-downgrade");
      await undoScheduledDowngrade("user");
      setNotice(
        "Scheduled plan change canceled — you'll stay on your current plan."
      );
      await refetch();
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ||
          "Failed to undo the scheduled change"
      );
    } finally {
      setActionPending(null);
    }
  }

  async function handleSetDefault(id: string) {
    await setDefaultPaymentMethod(id);

    queryClient.setQueryData(["console-billing"], (old: any) => ({
      ...old,
      payment_methods: (old?.payment_methods ?? []).map((m: PM) => ({
        ...m,
        is_default: m.id === id,
      })),
    }));
  }

  async function handleRemove(id: string) {
    if (!window.confirm("Remove this payment method?")) return;

    await removePaymentMethod(id);

    queryClient.setQueryData(["console-billing"], (old: any) => ({
      ...old,
      payment_methods: (old?.payment_methods ?? []).filter(
        (m: PM) => m.id !== id
      ),
    }));
  }

  // ── Derived ───────────────────────────────────────────────────────────────

  const isPaid = sub?.has_subscription && sub.status === "active";
  const isCancelPending =
    isPaid && !!sub?.renews_at && (sub as any)?.cancel_at_period_end;

  const hasScheduledDowngrade =
    !!sub?.scheduled_plan_name && !!sub?.scheduled_change_at;

  const balance = wallet?.balance ?? 0;
  const planName = sub?.plan_name || "Free";
  const hasQuota = (wallet?.monthly_credits ?? 0) > 0;
  const used = wallet?.consumed ?? 0;
  const remaining = wallet?.remaining ?? 0;
  const monthlyLimit = wallet?.monthly_credits ?? 0;
  const usagePercent = wallet?.usage_percent ?? 0;
  const tokensUsed = wallet?.tokens_used ?? 0;

  // ── Render ────────────────────────────────────────────────────────────────

  if (isLoading) {
    return (
      <div className="relative min-h-[70vh] w-full">
        <OpenQCoreLoader />
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-3 py-8 sm:px-6 xl:px-10">
      <FadeIn delay={0}>
        <section className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-amber-300/80">
            <Sparkles className="h-3.5 w-3.5" />
            Account
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white lg:text-3xl">
            Billing
          </h1>

          <p className="max-w-2xl text-sm leading-6 text-white/45">
            Manage your subscription, payment methods, invoices, and QX Power
            usage from one place.
          </p>
        </section>
      </FadeIn>

      {notice && (
        <FadeIn delay={40}>
          <InfoBanner
            tone="success"
            message={notice}
            actionLabel="Dismiss"
            onAction={() => setNotice(null)}
          />
        </FadeIn>
      )}

      {error && (
        <FadeIn delay={50}>
          <InfoBanner
            tone="error"
            message={error}
            actionLabel="Retry"
            onAction={() => {
              setError(null);
              refetch();
            }}
          />
        </FadeIn>
      )}

      {/* 1. Current Plan */}
      <FadeIn delay={80}>
        <section
          className="
            relative overflow-hidden rounded-2xl
            border border-white/[0.06]
            bg-[#0f1012]/92 p-5
            shadow-[0_16px_40px_rgba(0,0,0,0.18)]
            backdrop-blur-xl
          "
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-[-40px] top-[-50px] h-[120px] w-[120px] rounded-full bg-amber-300/[0.04] blur-[70px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_35%)]" />
          </div>

          <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${
                  isPaid
                    ? "border-amber-300/12 bg-amber-300/[0.08] text-amber-300"
                    : "border-white/[0.06] bg-white/[0.03] text-white/30"
                }`}
              >
                <Crown className="h-5 w-5" />
              </div>

              <div>
                <div className="text-base font-semibold text-white">
                  {planName} plan
                </div>

                <div className="mt-0.5 text-xs text-white/35">
                  {isPaid && sub?.billing_cycle
                    ? `${sub.billing_cycle.charAt(0).toUpperCase()}${sub.billing_cycle.slice(1)}`
                    : "Free tier"}

                  {isPaid && sub?.renews_at && !isCancelPending && (
                    <> · Auto renews on {formatDate(sub.renews_at)}</>
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
              className="
                h-10 rounded-xl border border-white/[0.08]
                bg-white/[0.03] px-5 text-sm font-medium text-white/75
                transition-all hover:bg-white/[0.06] hover:text-white
              "
            >
              {isPaid ? "Adjust plan" : "Upgrade"}
            </button>
          </div>

          {isCancelPending && (
            <div className="relative mt-4 flex flex-col gap-3 rounded-xl border border-amber-300/12 bg-amber-300/[0.06] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-amber-200">
                <Clock className="h-3.5 w-3.5" />
                Your plan is set to cancel on {formatDate(sub?.renews_at)}.
              </div>

              <button
                type="button"
                onClick={handleUndoCancel}
                disabled={actionPending === "undo-cancel"}
                className="flex items-center gap-1.5 text-xs font-medium text-amber-200 transition-all hover:text-amber-100 disabled:opacity-40"
              >
                <Undo2 className="h-3 w-3" />
                {actionPending === "undo-cancel"
                  ? "Reversing…"
                  : "Keep my plan"}
              </button>
            </div>
          )}

          {hasScheduledDowngrade && (
            <div className="relative mt-4 flex flex-col gap-3 rounded-xl border border-cyan-300/12 bg-cyan-300/[0.06] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs text-cyan-200">
                <Clock className="h-3.5 w-3.5" />
                Switching to {sub?.scheduled_plan_name} on{" "}
                {formatDate(sub?.scheduled_change_at)}.
              </div>

              <button
                type="button"
                onClick={handleUndoDowngrade}
                disabled={actionPending === "undo-downgrade"}
                className="flex items-center gap-1.5 text-xs font-medium text-cyan-200 transition-all hover:text-cyan-100 disabled:opacity-40"
              >
                <Undo2 className="h-3 w-3" />
                {actionPending === "undo-downgrade"
                  ? "Reversing…"
                  : "Stay on this plan"}
              </button>
            </div>
          )}
        </section>
      </FadeIn>

      {/* 2. Payment Methods */}
      <FadeIn delay={120}>
        <PaymentMethods
          methods={methods}
          onSetDefault={handleSetDefault}
          onRemove={handleRemove}
        />
      </FadeIn>

      {/* 3. QX Power */}
      <FadeIn delay={160}>
        <section
          className="
            relative overflow-hidden rounded-2xl
            border border-white/[0.06]
            bg-[#0f1012]/92 p-5
            shadow-[0_16px_40px_rgba(0,0,0,0.18)]
            backdrop-blur-xl
          "
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute right-[-40px] top-[-50px] h-[120px] w-[120px] rounded-full bg-amber-300/[0.04] blur-[70px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_35%)]" />
          </div>

          <div className="relative">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30">
              QX Power
            </h3>

            <p className="mt-1 text-xs text-white/35">
              Credits are consumed as you use AI services. They refill
              automatically each billing cycle.
            </p>

            <div className="mt-4 border-t border-white/[0.05] pt-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/[0.08]">
                  <Zap className="h-5 w-5 text-amber-300" />
                </div>

                <div>
                  <div className="text-2xl font-bold text-white">
                    {balance.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-white/25">
                    Current balance
                  </div>
                </div>
              </div>

              {!hasQuota && (
                <div className="mt-5 rounded-xl border border-amber-300/10 bg-amber-300/[0.06] p-4">
                  <div className="text-sm font-medium text-amber-200">
                    Free Plan
                  </div>
                  <div className="mt-1 text-xs text-white/45">
                    Upgrade to unlock monthly QXP credits, usage tracking and
                    higher limits.
                  </div>
                </div>
              )}

              {hasQuota && (
                <>
                  <div className="mb-2 mt-5 flex justify-between text-[11px] text-white/40">
                    <span>Usage This Cycle</span>
                    <span>{usagePercent}%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className="h-full bg-gradient-to-r from-amber-300 to-amber-200 transition-all duration-700"
                      style={{ width: `${usagePercent}%` }}
                    />
                  </div>
                </>
              )}

              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <div>
                  <div className="text-[10px] text-white/25">Used</div>
                  <div className="font-medium text-red-200">
                    {used.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-white/25">Remaining</div>
                  <div className="font-medium text-amber-200">
                    {remaining.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-white/25">Monthly Limit</div>
                  <div className="font-medium text-emerald-200">
                    {monthlyLimit.toLocaleString()}
                  </div>
                </div>

                <div>
                  <div className="text-[10px] text-white/25">Tokens Used</div>
                  <div className="font-medium text-cyan-200">
                    {tokensUsed.toLocaleString()}
                  </div>
                </div>
              </div>

              {wallet?.period_start && hasQuota && (
                <div className="mt-3 text-[10px] text-white/25">
                  Current cycle started {formatDate(wallet.period_start)}
                </div>
              )}

              {hasQuota && (
                <div className="mt-4 text-right text-xs text-white/30">
                  {monthlyLimit.toLocaleString()} QXP / month
                </div>
              )}
            </div>
          </div>
        </section>
      </FadeIn>

      {/* 4. Invoices */}
      {invoices.length > 0 && (
        <FadeIn delay={220}>
          <section
            className="
              overflow-hidden rounded-2xl border border-white/[0.06]
              bg-[#0f1012]/92 shadow-[0_16px_40px_rgba(0,0,0,0.18)]
              backdrop-blur-xl
            "
          >
            <div className="border-b border-white/[0.06] px-5 py-3.5">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30">
                Invoices
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-white/[0.04] bg-white/[0.02]">
                    {["Date", "Total", "Status", "Actions"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-[11px] font-medium text-white/25"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {invoices.map((inv) => (
                    <tr
                      key={inv.id}
                      className="border-b border-white/[0.03] transition-colors last:border-b-0 hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-3 text-xs text-white/50">
                        {formatDate(inv.created_at)}
                      </td>

                      <td className="px-5 py-3 font-mono text-xs text-white/65">
                        ${inv.amount} {inv.currency}
                      </td>

                      <td className="px-5 py-3">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            inv.status === "paid"
                              ? "border border-emerald-300/10 bg-emerald-300/[0.08] text-emerald-200"
                              : "border border-amber-300/10 bg-amber-300/[0.08] text-amber-200"
                          }`}
                        >
                          {inv.status.charAt(0).toUpperCase() +
                            inv.status.slice(1)}
                        </span>
                      </td>

                      <td className="px-5 py-3">
                        {inv.hosted_url && (
                          <a
                            href={inv.hosted_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[11px] text-amber-300/65 transition-all hover:text-amber-200"
                          >
                            View
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </FadeIn>
      )}

      {/* 5. Cancellation */}
      {isPaid && !isCancelPending && (
        <FadeIn delay={280}>
          <section
            className="
              rounded-2xl border border-white/[0.06]
              bg-[#0f1012]/92 p-5
              shadow-[0_16px_40px_rgba(0,0,0,0.18)]
              backdrop-blur-xl
            "
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-xs font-semibold text-white/40">
                  Cancellation
                </h3>
                <p className="mt-0.5 text-[11px] text-white/25">
                  Cancel your plan. Access continues until the end of the billing
                  period.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCancel}
                disabled={actionPending === "cancel"}
                className="
                  h-9 rounded-lg border border-red-300/12
                  bg-red-300/[0.06] px-4 text-[11px] font-medium text-red-200/80
                  transition-all hover:bg-red-300/[0.12] hover:text-red-100
                  disabled:opacity-40
                "
              >
                {actionPending === "cancel" ? "Canceling…" : "Cancel plan"}
              </button>
            </div>
          </section>
        </FadeIn>
      )}

      {/* 6. Transactions */}
      {transactions.length > 0 && (
        <FadeIn delay={340}>
          <TransactionHistory transactions={transactions} />
        </FadeIn>
      )}

      <PersonalUpgradeModal
        open={showUpgrade}
        onClose={() => setShowUpgrade(false)}
        onUpgrade={handleUpgrade}
        currentPlanId={sub?.plan_id ?? undefined}
      />
    </div>
  );
}