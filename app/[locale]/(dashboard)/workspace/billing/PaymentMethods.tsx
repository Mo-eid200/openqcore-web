import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { CreditCard } from "lucide-react";
import { Button } from "../../components/ui/Button";

const METHODS = [
    { brand: "Visa", last4: "4242", exp: "03/28", primary: true },
    { brand: "Mastercard", last4: "8790", exp: "12/26", primary: false }
];

export function PaymentMethods() {
    return (
        <Card>
            <CardHeader>
                <span className="text-lg font-bold text-white">Payment Methods</span>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-5">
                    {METHODS.map((m, i) => (
                        <div key={i} className="flex items-center gap-5 px-2">
                            <CreditCard className="w-6 h-6 text-[#d4af37]" />
                            <span className="font-mono font-bold text-white text-sm">
                                **** {m.last4}
                            </span>
                            <span className="text-xs text-slate-400">{m.brand}</span>
                            <span className="text-xs text-slate-400">Exp: {m.exp}</span>
                            {m.primary && <Badge color="gold">Primary</Badge>}
                            <Button variant="outline" className="ml-auto text-xs px-3">Remove</Button>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}