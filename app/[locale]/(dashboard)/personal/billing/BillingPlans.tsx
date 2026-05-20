import React from "react";
import type { BillingPlan } from "./types";
import { CheckCircle2 } from "lucide-react";

export default function BillingPlans({
    plans,
    current,
    onSubscribe
}: {
    plans: BillingPlan[],
    current?: string,
    onSubscribe?: (id: string) => void
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 w-full my-5">
            {plans.map(plan => (
                <div key={plan.id}
                    className={`
            flex flex-col rounded-2xl border bg-gradient-to-br from-[#1c1308]/90 via-[#201709]/60 to-[#1c1405]/80
            ${plan.recommended ? "border-amber-400/60 shadow-2xl" : "border-amber-500/15 shadow"}
            p-7
            group hover:scale-[1.02] transition
            relative
          `}
                >
                    {plan.recommended && (
                        <span className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 bg-amber-400 text-black text-xs font-bold px-4 py-1 rounded-full shadow">
                            Recommended
                        </span>
                    )}
                    <div className="text-xl font-extrabold text-white mb-1">{plan.name}</div>
                    <div className="text-3xl font-mono text-amber-400 font-bold mb-4">{plan.price}
                        <span className="text-sm text-amber-100/60 font-normal"> /{plan.period}</span>
                    </div>
                    <div className="flex flex-col gap-2 mb-5 mt-2">
                        {plan.features.map(f =>
                            <div key={f} className="flex items-center gap-2 text-sm text-amber-100/90">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {f}
                            </div>
                        )}
                    </div>
                    {current === plan.id ? (
                        <button
                            disabled
                            className="rounded-lg bg-emerald-600/80 text-white px-6 py-2 font-semibold text-xs cursor-default shadow"
                        >
                            Current Plan
                        </button>
                    ) : (
                        <button
                            onClick={() => onSubscribe?.(plan.id)}
                            className="rounded-lg bg-amber-400 text-black px-6 py-2 font-bold text-xs shadow hover:bg-amber-300 transition"
                        >
                            Upgrade
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
}