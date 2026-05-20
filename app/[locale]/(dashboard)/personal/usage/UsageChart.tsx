import React from "react";
import type { UsageStat } from "./types";

export default function UsageChart({ data }: { data: UsageStat[] }) {
    // يعرض بيانات 7 أيام (استبدلها بـ chart.js أو Recharts لو حبيت)
    // القيم: completions (خط اصلی), images (عمود), cost نقاط.

    const maxY = Math.max(...data.map(d => Math.max(d.completions, d.images * 10, d.cost * 100)), 10);
    const days = data.map(d => d.date.slice(5, 10));
    const W = 520, H = 170, gap = W / data.length;

    // Helper: get Y س
    function getY(val: number, factor: number = 1) {
        return H - (val * factor * (H - 30) / maxY || 2) - 18;
    }

    return (
        <div className="rounded-2xl bg-gradient-to-tl from-[#181106]/95 via-[#332909]/70 to-[#191108]/90 border border-amber-400/20 p-5 shadow mb-4">
            <div className="mb-3 font-bold text-amber-100/90 text-sm">Activity Breakdown (7 days)</div>
            <svg width={W} height={H} className="block mx-auto w-full max-w-full" style={{ overflow: 'visible' }}>
                {/* خطوط الأيام */}
                {days.map((d, i) => (
                    <text
                        key={d}
                        x={i * gap + gap / 2} y={H - 3}
                        fontSize={12} fill="#b3975b"
                        textAnchor="middle"
                    >{d.replace('-', '/')}</text>
                ))}
                {/* أعمدة الصور */}
                {data.map((d, i) => (
                    <rect
                        key={i}
                        x={i * gap + gap / 4}
                        width={gap / 2}
                        y={getY(d.images, 10)}
                        height={H - 20 - getY(d.images, 10)}
                        fill="#fdba74"
                        opacity=".35"
                        rx={7}
                    />
                ))}
                {/* نقاط التكلفة */}
                {data.map((d, i) => (
                    <circle
                        key={i}
                        cx={i * gap + gap / 2}
                        cy={getY(d.cost, 100)}
                        r={4}
                        fill="#eab308"
                    />
                ))}
                {/* خط الـcompletions مموج */}
                <polyline
                    fill="none" stroke="#4ade80" strokeWidth={3} opacity="0.90"
                    points={data.map((d, i) => `${i * gap + gap / 2},${getY(d.completions, 1)}`).join(" ")}
                />
            </svg>
            <div className="flex gap-6 mt-3 justify-center text-xs text-amber-100/70">
                <span><span className="inline-block w-3 h-2 mr-2 rounded bg-emerald-400/80" />Completions</span>
                <span><span className="inline-block w-3 h-2 mr-2 rounded bg-orange-300/50" />Images</span>
                <span><span className="inline-block w-3 h-3 mr-2 rounded-full bg-amber-400" />Cost</span>
            </div>
        </div>
    );
}