import React from "react";

export function SectionHeader({
    children,
    className = "",
}: { children: React.ReactNode; className?: string }) {
    return (
        <div className={`text-lg font-bold text-white mb-4 flex items-center gap-2 border-l-4 border-[#d4af37] pl-3 ${className}`}>
            {children}
        </div>
    );
}