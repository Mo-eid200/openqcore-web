"use client";

import React, { useState } from "react";
import { CreditCard, Trash2, Star, Plus, Loader2, AlertCircle } from "lucide-react";
import type { PaymentMethod } from "@/app/lib/api/console/billing";
import { addPaymentMethod } from "@/app/lib/api/console/billing";

type Props = {
  methods: PaymentMethod[];
  onSetDefault?: (id: string) => void;
  onRemove?: (id: string) => void;
};

// ✅ FIX: removed the duplicate "Add Card" button — the old version
// had one in the header AND a second, functionally identical one
// inside the empty state, both calling the exact same
// handleAddCard(). Now there's a single header button always
// present; the empty state just shows a message, no second CTA.
// Also replaced the raw browser alert() on failure with an inline
// error banner (consistent with the rest of this page's
// InfoBanner-style messaging), and added a per-row pending state so
// clicking "Remove" or "Set as default" shows a spinner instead of
// looking unresponsive.
export default function PaymentMethods({
  methods,
  onSetDefault,
  onRemove,
}: Props) {
  const [addingCard, setAddingCard] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function handleAddCard() {
    setError(null);
    try {
      setAddingCard(true);
      const res = await addPaymentMethod();
      if (res.checkout_url) {
        window.location.href = res.checkout_url;
      }
    } catch {
      setError("Couldn't open card setup. Please try again.");
    } finally {
      setAddingCard(false);
    }
  }

  async function handleSetDefault(id: string) {
    if (!onSetDefault) return;
    setPendingId(id);
    try {
      await onSetDefault(id);
    } finally {
      setPendingId(null);
    }
  }

  async function handleRemove(id: string) {
    if (!onRemove) return;
    setPendingId(id);
    try {
      await onRemove(id);
    } finally {
      setPendingId(null);
    }
  }

  return (
    <section
      className="
        relative overflow-hidden rounded-2xl
        border border-white/[0.06]
        bg-[#0f1012]/92
        shadow-[0_16px_40px_rgba(0,0,0,0.18)]
        backdrop-blur-xl
      "
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-40px] top-[-50px] h-[120px] w-[120px] rounded-full bg-amber-300/[0.04] blur-[70px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_35%)]" />
      </div>

      <div className="relative flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30">
          Payment Methods
        </h3>

        <button
          type="button"
          onClick={handleAddCard}
          disabled={addingCard}
          className="flex items-center gap-1.5 text-[11px] text-amber-300/65 transition-all hover:text-amber-300 disabled:opacity-50"
        >
          {addingCard ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <Plus className="h-3 w-3" />
              Add Card
            </>
          )}
        </button>
      </div>

      {error && (
        <div className="relative mx-5 mt-3 flex items-center gap-2 rounded-lg border border-red-300/15 bg-red-300/[0.06] px-3 py-2 text-[11px] text-red-200">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          {error}
        </div>
      )}

      {!methods.length ? (
        <div className="relative flex flex-col items-center gap-3 px-5 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03]">
            <CreditCard className="h-5 w-5 text-white/20" />
          </div>
          <p className="text-xs text-white/30">No payment methods saved</p>
        </div>
      ) : (
        <div className="relative divide-y divide-white/[0.04]">
          {methods.map((pm) => {
            const isPending = pendingId === pm.id;
            return (
              <div
                key={pm.id}
                className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03]">
                  <CreditCard className="h-4 w-4 text-white/40" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-white/72">
                      {pm.brand}
                    </span>
                    <span className="font-mono text-xs text-white/35">
                      •••• {pm.last4}
                    </span>
                    {pm.is_default && (
                      <span className="rounded-full border border-amber-300/10 bg-amber-300/[0.08] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-amber-200">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 text-[10px] text-white/22">
                    Expires {pm.exp_month}/{pm.exp_year}
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {isPending ? (
                    <div className="flex h-7 w-7 items-center justify-center">
                      <Loader2 className="h-3.5 w-3.5 animate-spin text-white/30" />
                    </div>
                  ) : (
                    <>
                      {!pm.is_default && onSetDefault && (
                        <button
                          type="button"
                          onClick={() => handleSetDefault(pm.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-white/20 transition-all hover:bg-amber-300/[0.08] hover:text-amber-300"
                          title="Set as default"
                        >
                          <Star className="h-3.5 w-3.5" />
                        </button>
                      )}
                      {onRemove && (
                        <button
                          type="button"
                          onClick={() => handleRemove(pm.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-lg text-white/20 transition-all hover:bg-red-300/[0.08] hover:text-red-200"
                          title="Remove"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
