import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";

export function ComputeUsageChart() {
    return (
        <Card className="min-h-[220px]">
            <CardHeader>
                <span className="text-lg font-bold text-white">Compute Usage</span>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center py-7">
                <div className="text-slate-500 text-center">[ Compute Usage Chart here ]</div>
            </CardContent>
        </Card>
    );
}