export interface UsageStat {
    date: string;            // YYYY-MM-DD
    completions: number;
    images: number;
    voice: number;
    agents: number;
    cost: number;
}

export interface UsageCardStat {
    label: string;
    value: string;
    change: number;         // درصد نسبة التغيير (موجب/سالب)
    icon?: React.ReactNode;
    color?: string;         // tailwind (مثلاً text-emerald-400)
}