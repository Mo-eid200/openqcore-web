import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export function GeneralSettings() {
    return (
        <Card>
            <CardHeader>
                <span className="text-lg font-bold text-white">General</span>
            </CardHeader>
            <CardContent>
                <form className="space-y-6 max-w-lg">
                    <div>
                        <label className="block mb-1 text-slate-400 text-sm font-semibold">Workspace Name</label>
                        <Input defaultValue="OQC AI Workspace" />
                    </div>
                    <div>
                        <label className="block mb-1 text-slate-400 text-sm font-semibold">Industry</label>
                        <Input defaultValue="AI Infrastructure" />
                    </div>
                    <div>
                        <label className="block mb-1 text-slate-400 text-sm font-semibold">Workspace Domain</label>
                        <Input defaultValue="oqc-core.com" />
                    </div>
                    <div className="flex justify-end">
                        <Button variant="primary">Save Changes</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}