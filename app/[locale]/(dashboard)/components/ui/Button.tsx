import React from "react";

type Variant = "primary" | "secondary" | "outline";

export function Button({
    children,
    className = "",
    type = "button",
    variant = "primary",
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
    let base =
        "inline-flex items-center justify-center font-semibold rounded-xl transition h-11 px-6 gap-2 select-none focus:ring-2 focus:ring-[#d4af37]/30 outline-none";
    let color =
        variant === "primary"
            ? "bg-gradient-to-r from-[#d4af37] via-[#ffe68c] to-[#ffd25a] text-[#161d2a] border border-[#d4af37] shadow hover:opacity-90"
            : variant === "secondary"
                ? "bg-[#171b23] text-white border border-white/10 hover:bg-white/8"
                : "bg-transparent border border-white/14 text-white hover:bg-white/10";
    return (
        <button type={type} className={`${base} ${color} ${className}`} {...props}>
            {children}
        </button>
    );
}