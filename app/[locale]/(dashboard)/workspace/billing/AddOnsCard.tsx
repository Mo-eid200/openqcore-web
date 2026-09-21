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

// ✅ FIX: now uses the EXACT same card shell (bg-[#0f1012]/92, border
// border-white/[0.06], shadow, backdrop-blur) as every other section
// on this page (QX Power, Cancellation, etc) — previously this had
// its own bg-[#100b06]/92 + border-amber-500 shell that looked
// visually inconsistent with the rest of the dashboard. The amber
// accent lives ONLY in the inner elements (icon, badge, button) now,
// not the card container itself.
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

      <div className="relative flex items-center justify-between">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30">
            Add-ons
          </h3>
          <p className="mt-1 text-xs text-white/35">
            One-time top-ups, separate from your subscription.
          </p>
        </div>

        <button
          type="button"
          onClick={onBuyClick}
          className="
            flex h-9 shrink-0 items-center gap-1.5 rounded-xl
            bg-amber-300 px-4 text-xs font-semibold text-black
            transition-opacity hover:opacity-90
          "
        >
          <ShoppingBag className="h-3.5 w-3.5" />
          {hasBalance ? "Buy more" : "Buy Add-ons"}
        </button>
      </div>

      {hasBalance ? (
        <div className="relative mt-4 border-t border-white/[0.05] pt-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-300/10 bg-amber-300/[0.08]">
              <Zap className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">
                {addonBalance.toLocaleString()}
              </div>
              <div className="text-[10px] text-white/25">Add-on balance</div>
            </div>
          </div>

          {addonExpiresAt && (
            <div className="mt-3 rounded-xl border border-amber-300/10 bg-amber-300/[0.06] px-3.5 py-2.5 text-[11px] text-amber-200/80">
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
        <div className="relative mt-4 border-t border-white/[0.05] pt-4 text-xs text-white/30">
          No add-on balance yet. Top up whenever you need extra Q-Power.
        </div>
      )}
    </section>
  );
}
