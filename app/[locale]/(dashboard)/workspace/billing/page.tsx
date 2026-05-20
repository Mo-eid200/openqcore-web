"use client";
import React, { useState } from "react";
import { CurrentPlanCard } from "./CurrentPlanCard";
import { UsageBillingChart } from "./UsageBillingChart";
import { InvoicesTable } from "./InvoicesTable";
import { PaymentMethods } from "./PaymentMethods";
import { UpgradePlanModal } from "./UpgradePlanModal";

export default function BillingPage() {
    const [showUpgrade, setShowUpgrade] = useState(false);

    return (
        <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 pt-8 pb-14">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-1">Billing</h1>
                <p className="text-slate-400 mb-6">
                    Billing, invoice history, usage analytics, and payment methods.
                </p>
            </div>
            <CurrentPlanCard onUpgrade={() => setShowUpgrade(true)} />
            <div className="grid lg:grid-cols-2 gap-9">
                <div className="flex flex-col gap-8">
                    <UsageBillingChart />
                    <InvoicesTable />
                </div>
                <div className="flex flex-col gap-8">
                    <PaymentMethods />
                </div>
            </div>
            <UpgradePlanModal open={showUpgrade} onClose={() => setShowUpgrade(false)} />
        </div>
    );
}