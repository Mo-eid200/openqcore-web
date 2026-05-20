import React from "react";
import type { SecuritySettingsData } from "./types";
import { Shield, Lock, Smartphone } from "lucide-react";

export default function SecuritySettings({
    value,
    onPasswordChange,
    onToggle2FA,
    onSignOutDevice
}: {
    value: SecuritySettingsData;
    onPasswordChange?: () => void;
    onToggle2FA?: () => void;
    onSignOutDevice?: (deviceId: string) => void;
}) {
    return (
        <div className="rounded-2xl border border-amber-400/15 bg-[#181106]/75 p-5 shadow mb-8 flex flex-col gap-5">
            <div className="font-bold text-amber-200">Security</div>
            <div className="flex gap-3 items-center text-amber-100 text-sm">
                <Shield className="w-5 h-5 text-amber-400" />
                Password: <b className="ml-2">{value.passwordSet ? "Set" : "Unset"}</b>
                <button
                    className="ml-4 bg-amber-400/90 px-3 py-1 rounded font-bold text-black text-xs hover:bg-amber-300 transition"
                    onClick={onPasswordChange}
                >
                    Change
                </button>
                {value.lastPasswordChange && (
                    <span className="ml-4 text-xs text-amber-200/70">
                        Last changed: {new Date(value.lastPasswordChange).toLocaleDateString()}
                    </span>
                )}
            </div>
            <div className="flex gap-3 items-center text-amber-100 text-sm">
                <Lock className="w-5 h-5 text-emerald-400" />
                2FA: <b className="ml-2">{value.twoFactorEnabled ? "Enabled" : "Disabled"}</b>
                <button
                    className={`ml-4 px-3 py-1 rounded font-bold text-xs ${value.twoFactorEnabled ? "bg-red-500/90 text-white hover:bg-red-500" : "bg-emerald-400/90 text-black hover:bg-emerald-300"} transition`}
                    onClick={onToggle2FA}
                >
                    {value.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                </button>
            </div>
            <div className="mt-2">
                <div className="mb-2 text-amber-200/80 font-medium">Active Devices</div>
                <div className="flex flex-col gap-2">
                    {value.devices.map(d => (
                        <div key={d.id} className="flex items-center gap-3 py-2 px-4 rounded bg-[#23200c]">
                            <Smartphone className="w-5 h-5 text-amber-300" />
                            <span className="text-white">{d.name}</span>
                            <span className="text-xs text-amber-100/60 ml-2">Last active: {new Date(d.lastActive).toLocaleString()}</span>
                            <button
                                className="ml-auto px-3 py-1 rounded bg-red-500/80 text-white text-xs font-bold hover:bg-red-500 transition"
                                onClick={() => onSignOutDevice?.(d.id)}
                            >
                                Sign out
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}