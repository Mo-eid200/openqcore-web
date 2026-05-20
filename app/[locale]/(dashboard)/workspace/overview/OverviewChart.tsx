import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";

export default function OverviewChart() {
    return (
        <section className="w-full">
            <Card className="flex flex-col min-h-[300px] h-full rounded-2xl border border-white/8 bg-[#101827]/85 shadow">
                <CardHeader className="flex items-center justify-between px-5 pt-4 pb-2">
                    <span className="text-lg font-bold text-white">System Activity</span>
                    <select
                        className="
              rounded-lg bg-[#181e2a]
              border border-white/10
              text-sm text-white px-3 py-1
              shadow focus:ring-2
              focus:ring-[#d4af37]/15
              transition
            "
                    >
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                    </select>
                </CardHeader>
                <CardContent className="flex-1 flex items-center justify-center px-2 py-7">
                    <div className="text-slate-500 text-center">
                        [ Chart goes here ]
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}