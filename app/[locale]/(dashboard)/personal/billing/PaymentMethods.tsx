import React from "react";
import type { PaymentMethod } from "./types";
import { CreditCard } from "lucide-react";

export default function PaymentMethods({
    methods,
    onSetDefault,
    onRemove
}: {
    methods: PaymentMethod[];
    onSetDefault?: (id: string) => void;
    onRemove?: (id: string) => void;
}) {
    return (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {methods.map(m => (
                <div key={m.id}
                    className={`flex flex-col border rounded-xl p-5 bg-[#181106]/85 border-amber-400/15 shadow-lg gap-2
                        ${m.isDefault ? "ring-2 ring-amber-400" : ""}
                    `}
                >
                    <div className="flex items-center gap-2">
                        {/* لو فيه أيقونات تانية أضفها هنا بناءً على نوع البطاقة */}
                        <CreditCard className="w-5 h-5 text-amber-400" />

                        <span className="font-bold text-white">
                            {/* ابهر المستخدم بتسمية الباك اند لأي وسيلة دفع */}
                            {m.brand ? m.brand : m.type.charAt(0).toUpperCase() + m.type.slice(1)}
                        </span>

                        {m.isDefault && (
                            <span className="bg-emerald-400/90 text-black rounded px-2 py-0.5 text-xs font-bold ml-2">
                                Default
                            </span>
                        )}
                    </div>
                    <div className="text-amber-100/80 ml-7 text-xs">
                        {/* تبسيط عرض آخر أربع أرقام أو معرف المحفظة */}
                        <span>
                            **** {m.last4}
                        </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                        {!m.isDefault && (
                            <button onClick={() => onSetDefault?.(m.id)}
                                className="rounded bg-amber-400 text-black px-3 py-1 text-xs font-bold hover:bg-amber-300 transition">
                                Set Default
                            </button>
                        )}
                        <button onClick={() => onRemove?.(m.id)}
                            className="rounded bg-red-500/80 text-white px-3 py-1 text-xs font-bold hover:bg-red-500 transition">
                            Remove
                        </button>
                    </div>
                    <div className="text-xs text-amber-100/40 mt-2">
                        Added: {new Date(m.addedAt).toLocaleDateString()}
                    </div>
                </div>
            ))}
        </div>
    );
}