import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";

export function ApiUsageChart() {
    return (
        <Card className="min-h-[320px]">
            <CardHeader>
                <span className="text-lg font-bold text-white">API Usage</span>
            </CardHeader>
            <CardContent className="flex-1 flex items-center justify-center py-7">
                {/* ضع هنا React chart حقيقية عند توفر الداتا */}
                <div className="text-slate-500 text-center">[ Usage Chart goes here ]</div>
            </CardContent>
        </Card>
    );
}