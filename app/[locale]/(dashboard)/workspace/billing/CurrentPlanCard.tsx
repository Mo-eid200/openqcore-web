import React from "react";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

export function CurrentPlanCard({ onUpgrade }: { onUpgrade?: () => void }) {
    return (
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#ffe08c]/20 via-[#111827] to-[#161d2a] p-6 shadow flex flex-col gap-4 mb-5">
            <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-white">Pro Plan</div>
                <Badge color="gold">Active</Badge>
            </div>
            <div className="text-slate-400 text-sm">Unlimited usage, priority support, increased rate limits, and more.</div>
            <div className="flex items-center gap-4">
                <div className="text-[#d4af37] font-bold text-lg">$59/mo</div>
                <span className="text-slate-500 text-xs">Renews June 16, 2026</span>
                <Button variant="primary" className="ml-auto" onClick={onUpgrade}>
                    Upgrade Plan
                </Button>
            </div>
        </div>
    );
}