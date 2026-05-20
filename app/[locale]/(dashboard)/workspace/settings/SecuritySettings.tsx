import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

export function SecuritySettings() {
    return (
        <Card>
            <CardHeader>
                <span className="text-lg font-bold text-white">Security</span>
            </CardHeader>
            <CardContent>
                <form className="space-y-5 max-w-lg">
                    <div>
                        <label className="block mb-1 text-slate-400 text-sm font-semibold">Password</label>
                        <input readOnly value="•••••••••••••••" className="w-full h-11 rounded-xl px-4 border border-white/10 bg-slate-700 text-white text-base font-medium outline-none" />
                    </div>
                    <div>
                        <label className="block mb-1 text-slate-400 text-sm font-semibold">Two-Factor Authentication</label>
                        <div className="flex items-center gap-3">
                            <span className="text-emerald-400 font-bold">Enabled</span>
                            <Button variant="outline" className="text-xs">Manage</Button>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <Button variant="primary">Change Password</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}