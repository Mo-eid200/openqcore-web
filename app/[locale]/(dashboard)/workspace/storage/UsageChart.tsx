import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";

export function UsageChart() {
    return (
        <Card className="min-h-[220px]">
            <CardHeader>
                <span className="text-lg font-bold text-white">Storage Usage</span>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center py-7">
                <div className="text-slate-500 text-center">[ Storage Usage Chart Here ]</div>
            </CardContent>
        </Card>
    );
}