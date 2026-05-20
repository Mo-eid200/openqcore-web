import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";

export function ApiAccessSettings() {
    return (
        <Card>
            <CardHeader>
                <span className="text-lg font-bold text-white">API Access</span>
            </CardHeader>
            <CardContent>
                <form className="space-y-5 max-w-lg">
                    <div>
                        <label className="block mb-1 text-slate-400 text-sm font-semibold">Personal Access Token</label>
                        <div className="flex items-center gap-3">
                            <Input
                                value="sk-live-34ba...xyz"
                                readOnly
                                className="font-mono"
                            />
                            <Button variant="outline" className="text-xs px-3">Copy</Button>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}