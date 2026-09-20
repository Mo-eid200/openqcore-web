"use client";

import React from "react";
import { Zap, ShoppingBag } from "lucide-react";

function formatDate(value?: string | null) {
  if (!value) return "";
  return new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ✅ Deliberately separate card from the Subscription section —
// distinct amber/orange accent (matching the AddOnsModal design
// language in qxt-chat) so a one-time top-up balance is never
// confused with the monthly subscription allotment. Two distinct
// states: has a balance (shows it + expiry if set) vs. empty
// (simple prompt to buy).
export default function AddOnsCard({
  addonBalance,
  addonExpiresAt,
  onBuyClick,
}: {
  addonBalance: number;
  addonExpiresAt: string | null;
  onBuyClick: () => void;
}) {
  const hasBalance = addonBalance > 0;

  return (
    <section
      className="
        relative overflow-hidden rounded-2xl
        border border-amber-500/[0.12]
        bg-[#100b06]/92 p-5
        shadow-[0_16px_40px_rgba(0,0,0,0.18)]
        backdrop-blur-xl
      "
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-40px] top-[-50px] h-[120px] w-[120px] rounded-full bg-amber-500/[0.06] blur-[70px]" />
      </div>

      <div className="relative flex items-center justify-between">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-amber-300/60">
            Add-ons
          </h3>
          <p className="mt-1 text-xs text-white/35">
            One-time Q-Power top-ups, separate from your subscription.
          </p>
        </div>

        <button
          type="button"
          onClick={onBuyClick}
          className="
            flex h-9 items-center gap-1.5 rounded-xl
            bg-amber-500 px-4 text-xs font-semibold text-black
            transition-opacity hover:opacity-90
          "
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          {hasBalance ? "Buy more" : "Buy Add-ons"}
        </button>
      </div>

      {hasBalance ? (
        <div className="mt-4 border-t border-amber-500/[0.08] pt-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-500/15 bg-amber-500/[0.1]">
              <Zap className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {addonBalance.toLocaleString()}
              </div>
              <div className="text-[10px] text-white/25">Add-on balance</div>
            </div>
          </div>

          {addonExpiresAt && (
            <div className="mt-3 rounded-xl border border-amber-500/10 bg-amber-500/[0.05] px-3.5 py-2.5 text-[11px] text-amber-200/80">
              Your subscription has lapsed — this balance expires on{" "}
              <span className="font-semibold">{formatDate(addonExpiresAt)}</span> unless you renew.
            </div>
          )}

          {!addonExpiresAt && (
            <div className="mt-3 text-[10px] text-white/25">
              Never expires while your subscription stays active
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 border-t border-amber-500/[0.08] pt-4 text-xs text-white/30">
          No add-on balance yet. Top up whenever you need extra Q-Power.
        </div>
      )}
    </section>
  );
}
