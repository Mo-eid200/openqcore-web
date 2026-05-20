import React from "react";
import { Card, CardHeader, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

const INVOICES = [
    { id: "INV-3082", date: "2026-05-01", amount: "$59.00", status: "paid" },
    { id: "INV-3071", date: "2026-04-01", amount: "$59.00", status: "paid" },
    { id: "INV-3060", date: "2026-03-01", amount: "$59.00", status: "paid" },
    { id: "INV-3059", date: "2026-02-01", amount: "$59.00", status: "unpaid" }
];

export function InvoicesTable() {
    return (
        <Card>
            <CardHeader>
                <span className="text-lg font-bold text-white">Invoices</span>
            </CardHeader>
            <CardContent className="px-0 pb-4">
                <table className="min-w-full text-left">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase">Invoice ID</th>
                            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase">Date</th>
                            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase">Amount</th>
                            <th className="px-5 py-3 text-xs font-semibold text-slate-400 uppercase">Status</th>
                            <th className="px-5 py-3" />
                        </tr>
                    </thead>
                    <tbody>
                        {INVOICES.map((inv) => (
                            <tr key={inv.id} className="border-t border-white/10 hover:bg-white/[0.015]">
                                <td className="px-5 py-3 font-semibold text-white">{inv.id}</td>
                                <td className="px-5 py-3 text-slate-400">{inv.date}</td>
                                <td className="px-5 py-3 text-[#d4af37] font-bold">{inv.amount}</td>
                                <td className="px-5 py-3">
                                    <Badge color={inv.status === "paid" ? "emerald" : "danger"}>
                                        {inv.status}
                                    </Badge>
                                </td>
                                <td className="px-5 py-3 text-right">
                                    <Button variant="outline" className="text-xs px-3">Download</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    );
}