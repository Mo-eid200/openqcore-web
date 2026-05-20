import React from "react";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

type ApiKey = {
    id: string;
    label: string;
    key: string;
    createdAt: string;
    status: "active" | "revoked";
};

export function ApiKeysTable({
    keys,
    onRevoke,
}: {
    keys: ApiKey[];
    onRevoke: (id: string) => void;
}) {
    return (
        <div className="overflow-x-auto rounded-2xl border border-white/8 bg-[#111827]/90 shadow">
            <table className="min-w-full text-left">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-xs text-slate-400 font-semibold uppercase">Label</th>
                        <th className="px-6 py-3 text-xs text-slate-400 font-semibold uppercase">Key</th>
                        <th className="px-6 py-3 text-xs text-slate-400 font-semibold uppercase">Status</th>
                        <th className="px-6 py-3 text-xs text-slate-400 font-semibold uppercase">Created</th>
                        <th className="px-6 py-3" />
                    </tr>
                </thead>
                <tbody>
                    {keys.map((key) => (
                        <tr key={key.id} className="border-t border-white/10 hover:bg-white/[0.02]">
                            <td className="px-6 py-3 font-semibold text-white">{key.label}</td>
                            <td className="px-6 py-3 font-mono text-slate-300">{key.key}</td>
                            <td className="px-6 py-3">
                                <Badge color={key.status === "active" ? "emerald" : "danger"}>
                                    {key.status}
                                </Badge>
                            </td>
                            <td className="px-6 py-3 text-slate-400 text-xs">{key.createdAt}</td>
                            <td className="px-6 py-3">
                                {key.status === "active" ? (
                                    <Button variant="outline" className="text-xs" onClick={() => onRevoke(key.id)}>
                                        Revoke
                                    </Button>
                                ) : (
                                    <span className="text-slate-700 text-xs">Revoked</span>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}