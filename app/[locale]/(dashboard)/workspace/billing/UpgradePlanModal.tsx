import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

export function UpgradePlanModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    if (!open) return null;
    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
            <div className="w-full max-w-md" onClick={e => e.stopPropagation()}>
                <Card className="relative shadow-2xl rounded-2xl overflow-hidden">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <span className="font-bold text-lg text-white">Upgrade plan</span>
                            <button className="text-slate-400 hover:text-[#d4af37]" onClick={onClose}>×</button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="mb-4 text-slate-300">
                            Move to <Badge color="gold">Enterprise</Badge> and unlock:
                            <ul className="list-disc ml-6 mt-2 text-sm text-slate-400">
                                <li>Unlimited usage & requests</li>
                                <li>Dedicated support</li>
                                <li>Advanced analytics</li>
                                <li>Custom rate limits</li>
                                <li>SSO & Compliance</li>
                            </ul>
                        </div>
                        <Button variant="primary" className="w-full">Contact Sales</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}