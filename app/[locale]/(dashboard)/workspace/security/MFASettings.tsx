import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { ShieldCheck } from "lucide-react";

export function MFASettings() {
    return (
        <Card>
            <CardHeader>
                <span className="inline-flex gap-2 items-center">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    <span className="text-lg font-bold text-white">Multi‑Factor Authentication</span>
                </span>
            </CardHeader>
            <CardContent>
                <div>
                    <div className="mb-3 flex items-center gap-4">
                        <span className="text-emerald-400 font-bold">Enabled</span>
                        <Button variant="outline" className="text-xs px-3">Manage</Button>
                    </div>
                    <div className="text-slate-400 text-sm mb-1">
                        Secure your workspace by requiring both password and device verification on sensitive actions.
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}