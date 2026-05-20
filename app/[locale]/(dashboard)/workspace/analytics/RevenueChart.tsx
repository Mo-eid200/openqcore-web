import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";

export function RevenueChart() {
    return (
        <Card className="min-h-[230px]">
            <CardHeader>
                <span className="text-lg font-bold text-white">Revenue</span>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center py-7">
                <div className="text-slate-500 text-center">[ Revenue Chart Here ]</div>
            </CardContent>
        </Card>
    );
}