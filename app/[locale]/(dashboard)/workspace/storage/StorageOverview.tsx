import React from "react";
import { Card } from "../../components/ui/Card";

export function StorageOverview() {
    // استخدم أرقام وهمية/حقيقية حسب الحاجة
    const stats = [
        { label: "Total Usage", value: "14.2 GB" },
        { label: "Files Count", value: "298" },
        { label: "Buckets", value: "3" },
        { label: "Last Upload", value: "3 min ago" }
    ];
    return (
        <Card className="mb-7 px-6 py-5 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                    <span className="text-xs text-slate-400">{s.label}</span>
                    <span className="text-xl text-white font-bold">{s.value}</span>
                </div>
            ))}
        </Card>
    );
}