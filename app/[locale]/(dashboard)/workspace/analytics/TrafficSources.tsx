import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";

const TRAFFIC = [
    { label: "Web", percent: 55 },
    { label: "API", percent: 27 },
    { label: "CLI Tools", percent: 14 },
    { label: "Mobile", percent: 4 },
];
export function TrafficSources() {
    return (
        <Card>
            <CardHeader>
                <span className="text-lg font-bold text-white">Traffic Sources</span>
            </CardHeader>
            <CardContent className="pt-2">
                <div className="flex flex-col gap-4">
                    {TRAFFIC.map(t => (
                        <div key={t.label} className="flex items-center gap-2 text-white">
                            <span className="w-24 text-xs font-semibold text-slate-400">{t.label}</span>
                            <div className="flex-1 bg-[#233052] h-2 rounded-full">
                                <div
                                    className="h-2 rounded-full bg-gradient-to-r from-[#d4af37] to-[#ffe08c]"
                                    style={{ width: t.percent + "%" }}
                                />
                            </div>
                            <span className="text-xs font-semibold text-[#d4af37] ml-2">{t.percent}%</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}