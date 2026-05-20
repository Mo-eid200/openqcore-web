import React from "react";
import type { BillingHistoryEntry } from "./types";
import { FileText } from "lucide-react";

export default function BillingHistory({ entries }: { entries: BillingHistoryEntry[] }) {
    if (!entries?.length) return <div className="py-12 text-center text-amber-100/60">No billing history.</div>;
    return (
        <div className="overflow-x-auto rounded-xl border border-amber-500/20 bg-[#191106]/80 mt-5 shadow">
            <table className="min-w-full text-left text-sm">
                <thead>
                    <tr className="text-amber-100/90 border-b border-amber-700/20">
                        <th className="py-3 px-4 font-bold">Time</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">Method</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4"></th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map(e => (
                        <tr key={e.id} className="border-b border-amber-300/10 hover:bg-amber-400/5 transition">
                            <td className="px-4 py-2 text-xs text-amber-100/60">{new Date(e.date).toLocaleDateString()}</td>
                            <td className="px-4 py-2 font-mono text-amber-400">{e.amount}</td>
                            <td className="px-4 py-2 text-xs text-amber-100/80">{e.method}</td>
                            <td className="px-4 py-2">
                                {e.status === "paid" ?
                                    <span className="bg-emerald-500/80 text-white px-2 py-0.5 rounded text-xs font-semibold">Paid</span> :
                                    e.status === "pending" ?
                                        <span className="bg-yellow-400/80 text-yellow-900 px-2 py-0.5 rounded text-xs font-semibold">Pending</span> :
                                        <span className="bg-red-500/80 text-white px-2 py-0.5 rounded text-xs font-semibold">Failed</span>
                                }
                            </td>
                            <td className="px-4 py-2">
                                {e.invoiceUrl && (
                                    <a href={e.invoiceUrl} target="_blank"
                                        className="inline-flex items-center gap-1 text-amber-400 hover:underline hover:text-amber-300 font-semibold text-xs">
                                        <FileText className="w-4 h-4" /><span>Invoice</span>
                                    </a>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}