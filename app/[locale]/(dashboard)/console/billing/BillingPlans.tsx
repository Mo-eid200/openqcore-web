"use client";

import React, { useState } from "react";
import { CheckCircle2, Zap, Loader2 } from "lucide-react";
import type { BillingPlan } from "./types";

type Props = {
  plans: BillingPlan[];
  currentPlan: string;
  onSubscribe: (
    planId: number,
    cycle: "monthly" | "yearly"
  ) => Promise<void>;
};

export default function BillingPlans({
  plans,
  currentPlan,
  onSubscribe,
}: Props) {
  const [cycle, setCycle] = useState<"monthly" | "yearly">("monthly");
  const [loadingId, setLoading] = useState<number | null>(null);

  async function handleSubscribe(planId: number) {
    setLoading(planId);
    try {
      await onSubscribe(planId, cycle);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="space-y-5">
      {/* Cycle toggle */}
      <div className="flex items-center justify-center gap-2">
        {(["monthly", "yearly"] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCycle(c)}
            className={`
              h-9 rounded-xl px-5 text-xs font-medium transition-all
              ${
                cycle === c
                  ? "bg-amber-300 text-black shadow-[0_8px_24px_rgba(251,191,36,0.16)]"
                  : "border border-white/[0.08] bg-white/[0.02] text-white/40 hover:text-white/70"
              }
            `}
          >
            {c === "monthly" ? "Monthly" : "Yearly (Save 20%)"}
          </button>
        ))}
      </div>

      {/* Plans grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {plans.map((plan) => {
          const price =
            cycle === "monthly"
              ? plan.monthly_price
              : plan.yearly_price;

          const isCurrent =
            plan.name.toLowerCase() === currentPlan.toLowerCase();

          const isFree = !price || price === 0;

          return (
            <div
              key={plan.id}
              className={`
                relative flex flex-col overflow-hidden rounded-2xl border p-6
                bg-[#0f1012]/92 backdrop-blur-xl
                transition-all duration-300 hover:-translate-y-0.5
                ${
                  plan.recommended
                    ? "border-amber-300/18 shadow-[0_18px_50px_rgba(251,191,36,0.08)]"
                    : "border-white/[0.06] hover:border-amber-300/12 hover:shadow-[0_16px_40px_rgba(0,0,0,0.20)]"
                }
              `}
            >
              {/* Atmosphere */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-[-45px] top-[-55px] h-[130px] w-[130px] rounded-full bg-amber-300/[0.04] blur-[75px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.025),transparent_36%)]" />
              </div>

              {/* Top line */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-300/15 to-transparent" />

              {/* Recommended badge */}
              {plan.recommended && (
                <div className="absolute right-3 top-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-300 px-2.5 py-1 text-[10px] font-bold text-black">
                    <Zap className="h-3 w-3" />
                    Best Value
                  </span>
                </div>
              )}

              {/* Name */}
              <div className="relative">
                <h3 className="text-lg font-bold text-white">
                  {plan.name}
                </h3>
                <p className="mt-0.5 text-[11px] uppercase tracking-wider text-white/30">
                  {plan.plan_type}
                </p>
              </div>

              {/* Price */}
              <div className="relative mb-5 mt-4">
                <span className="text-3xl font-bold text-white">
                  {isFree ? "Free" : `$${price}`}
                </span>

                {!isFree && (
                  <span className="ml-1 text-xs text-white/30">
                    /{cycle === "monthly" ? "mo" : "yr"}
                  </span>
                )}
              </div>

              {/* Credits */}
              {plan.monthly_credits && plan.monthly_credits > 0 && (
                <div className="relative mb-4 flex items-center gap-2 rounded-xl border border-amber-300/10 bg-amber-300/[0.06] px-3 py-2">
                  <Zap className="h-4 w-4 text-amber-300" />
                  <span className="text-sm font-semibold text-amber-200">
                    {plan.monthly_credits.toLocaleString()} QXP / month
                  </span>
                </div>
              )}

              {/* Features */}
              <div className="relative mb-5 flex flex-1 flex-col gap-2">
                {plan.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-xs text-white/55"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-300/75" />
                    {f}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="relative">
                {isCurrent ? (
                  <button
                    disabled
                    className="h-10 w-full rounded-xl border border-emerald-300/12 bg-emerald-300/[0.10] text-xs font-semibold text-emerald-200"
                  >
                    Current Plan
                  </button>
                ) : isFree ? (
                  <button
                    disabled
                    className="h-10 w-full rounded-xl border border-white/[0.06] bg-white/[0.03] text-xs font-medium text-white/30"
                  >
                    Free Tier
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loadingId === plan.id}
                    className="
                      flex h-10 w-full items-center justify-center gap-2 rounded-xl
                      bg-amber-300 text-sm font-semibold text-black
                      transition-all hover:bg-amber-200
                      disabled:opacity-50
                    "
                  >
                    {loadingId === plan.id ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Redirecting...
                      </>
                    ) : (
                      "Upgrade"
                    )}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}