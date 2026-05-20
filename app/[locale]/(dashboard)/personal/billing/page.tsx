"use client";
import React, { useState } from "react";
import BillingPlans from "./BillingPlans";
import BillingHistory from "./BillingHistory";
import PaymentMethods from "./PaymentMethods";
import type { BillingPlan, BillingHistoryEntry, PaymentMethod } from "./types";

// بيانات وهمية (استبدلها من api أو backend لاحقًا)
const MOCK_PLANS: BillingPlan[] = [
    {
        id: "basic",
        name: "Basic",
        price: "$0",
        period: "monthly",
        features: ["Community Support", "Basic usage limits"]
    },
    {
        id: "pro",
        name: "Pro",
        price: "$14",
        period: "monthly",
        features: ["Priority AI models", "Premium support", "Faster generations", "API access"],
        recommended: true
    },
    {
        id: "team",
        name: "Team",
        price: "$49",
        period: "monthly",
        features: ["Everything in Pro", "Team dashboard", "Centralized billing"]
    },
];

const MOCK_HISTORY: BillingHistoryEntry[] = [
    {
        id: "1", amount: "$14.00", status: "paid", date: new Date(Date.now() - 864e5 * 32).toISOString(),
        method: "Visa ••4957", invoiceUrl: "#"
    },
    {
        id: "2", amount: "$14.00", status: "pending", date: new Date(Date.now() - 864e5 * 2).toISOString(),
        method: "Visa ••4957"
    }
];

const MOCK_METHODS: PaymentMethod[] = [
    {
        id: "m1", type: "card", last4: "4957", brand: "Visa", addedAt: new Date(Date.now() - 864e5 * 75).toISOString(), isDefault: true
    },
    {
        id: "m2", type: "paypal", last4: "0317", addedAt: new Date(Date.now() - 864e5 * 12).toISOString()
    }
];

export default function BillingPage() {
    const [methods, setMethods] = useState(MOCK_METHODS);
    const [plan, setPlan] = useState("pro");

    function handleSubscribe(id: string) {
        setPlan(id);
    }
    function handleSetDefault(mid: string) {
        setMethods(m => m.map(mm => mm.id === mid ?
            { ...mm, isDefault: true }
            : { ...mm, isDefault: false }));
    }
    function handleRemove(mid: string) {
        setMethods(m => m.filter(mm => mm.id !== mid));
    }

    return (
        <div className="w-full max-w-5xl mx-auto min-h-screen px-2 sm:px-8 py-10 flex flex-col gap-8">
            <div>
                <h1 className="text-2xl font-bold text-white mb-2">Billing & Plans</h1>
                <p className="text-xs text-amber-100/70">
                    Upgrade plan, manage payment methods, and view invoices easily.
                </p>
            </div>
            <BillingPlans plans={MOCK_PLANS} current={plan} onSubscribe={handleSubscribe} />
            <div className="font-bold text-lg text-white mt-3">Payment Methods</div>
            <PaymentMethods methods={methods} onSetDefault={handleSetDefault} onRemove={handleRemove} />
            <div className="font-bold text-lg text-white mt-8">Billing History</div>
            <BillingHistory entries={MOCK_HISTORY} />
        </div>
    );
}