import React from "react";

export function Input({
    className = "",
    ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            className={`w-full h-11 rounded-xl px-4 border border-white/10 bg-white/5 text-white text-base font-medium outline-none transition focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/25 ${className}`}
            {...props}
        />
    );
}