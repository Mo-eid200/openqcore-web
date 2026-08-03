"use client";

import React, { useState } from "react";
import { CreditCard, Trash2, Star, Plus, Loader2 } from "lucide-react";
import type { PaymentMethod } from "@/app/lib/api/console/billing";
import { addPaymentMethod } from "@/app/lib/api/console/billing";

type Props = {
  methods: PaymentMethod[];
  onSetDefault?: (id: string) => void;
  onRemove?: (id: string) => void;
};

export default function PaymentMethods({
  methods,
  onSetDefault,
  onRemove,
}: Props) {
  const [addingCard, setAddingCard] = useState(false);

  async function handleAddCard() {
    try {
      setAddingCard(true);
      const res = await addPaymentMethod();

      if (res.checkout_url) {
        window.location.href = res.checkout_url;
      }
    } catch {
      alert("Failed to open card setup");
    } finally {
      setAddingCard(false);
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
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-40px] top-[-50px] h-[120px] w-[120px] rounded-full bg-amber-300/[0.04] blur-[70px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.02),transparent_35%)]" />
      </div>

      {/* Header */}
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

      {!methods.length ? (
        <div className="relative flex flex-col items-center gap-3 px-5 py-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.03]">
            <CreditCard className="h-5 w-5 text-white/20" />
          </div>

          <p className="text-xs text-white/30">
            No payment methods saved
          </p>

          <button
            type="button"
            onClick={handleAddCard}
            disabled={addingCard}
            className="
              flex h-8 items-center gap-1.5 rounded-lg
              bg-amber-300 px-4 text-[11px] font-semibold text-black
              transition-all hover:bg-amber-200 disabled:opacity-50
            "
          >
            {addingCard ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                Adding...
              </>
            ) : (
              <>
                <Plus className="h-3 w-3" />
                Add Payment Method
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="relative divide-y divide-white/[0.04]">
          {methods.map((pm) => (
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
                {!pm.is_default && onSetDefault && (
                  <button
                    type="button"
                    onClick={() => onSetDefault(pm.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-white/20 transition-all hover:bg-amber-300/[0.08] hover:text-amber-300"
                    title="Set as default"
                  >
                    <Star className="h-3.5 w-3.5" />
                  </button>
                )}

                {onRemove && (
                  <button
                    type="button"
                    onClick={() => onRemove(pm.id)}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-white/20 transition-all hover:bg-red-300/[0.08] hover:text-red-200"
                    title="Remove"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}