"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronDown, LogOut, CreditCard,
  Shield, KeyRound, Settings,
} from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";
import { useApp }  from "../../../../context/AppContext";

export default function UserMenu() {
  const router = useRouter();
  const { user, logout }  = useAuth();
  const { plan, balance } = useApp();

  const [open, setOpen] = useState(false);
  const menuRef         = useRef<HTMLDivElement>(null);
  const timeoutRef      = useRef<NodeJS.Timeout | null>(null);

  const handleOpen  = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleClose = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 180);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  // ── Computed ────────────────────────────────────────────────────────────────

  const displayName =
    (user as any)?.full_name ||
    (user as any)?.display_name ||
    user?.email?.split("@")[0] ||
    "User";

  const avatarLetter = displayName[0]?.toUpperCase() || "U";

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
    >
      {/* ── Trigger ── */}
      <button className="
        flex items-center gap-2 h-10 px-2
        rounded-xl hover:bg-white/[0.04]
        transition-all duration-200 cursor-pointer
      ">
        {/* Avatar */}
        <div className="
          relative w-8 h-8 rounded-full
          bg-gradient-to-br from-[#d6c28a] to-[#8e7440]
          flex items-center justify-center
          text-black text-[12px] font-semibold
        ">
          {avatarLetter}
          <div className="
            absolute bottom-0 right-0
            w-2 h-2 rounded-full
            bg-emerald-400 border border-[#0b1020]
          " />
        </div>

        {/* Name */}
        <div className="hidden lg:flex items-center gap-1">
          <span className="text-[13px] font-medium text-white/88">
            {displayName}
          </span>
          <ChevronDown className={`
            w-4 h-4 text-white/35
            transition-transform duration-200
            ${open ? "rotate-180" : ""}
          `} />
        </div>
      </button>

      {/* ── Menu ── */}
      <div className={`
        absolute right-0 top-[calc(100%+8px)]
        w-[240px] rounded-2xl
        border border-white/[0.06]
        bg-[#111318]/92 backdrop-blur-2xl
        shadow-[0_10px_40px_rgba(0,0,0,0.45)]
        overflow-hidden z-[999]
        transition-all duration-200 origin-top-right
        ${open
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-[0.98] -translate-y-1 pointer-events-none"
        }
      `}>

        {/* User info */}
        <div className="px-4 py-3 border-b border-white/[0.05]">
          <div className="text-[13px] font-medium text-white">
            {displayName}
          </div>
          <div className="mt-0.5 text-[12px] text-white/38">
            {user?.email || "—"}
          </div>
          {plan && plan !== "free" && (
            <div className="
              mt-2 inline-flex items-center gap-1.5
              px-2 py-0.5 rounded-full
              bg-amber-400/10 border border-amber-400/20
              text-[10px] font-semibold text-amber-300 uppercase tracking-wide
            ">
              {plan}
            </div>
          )}
        </div>

        {/* Items */}
        <div className="p-1.5">
          <MenuItem icon={CreditCard} label="Billing"  onClick={() => router.push("/dashboard/billing")} />
          <MenuItem icon={KeyRound}   label="API Keys" onClick={() => router.push("/dashboard/api-keys")} />
          <MenuItem icon={Shield}     label="Security" onClick={() => router.push("/dashboard/security")} />
          <MenuItem icon={Settings}   label="Settings" onClick={() => router.push("/dashboard/settings")} />
        </div>

        {/* Footer */}
        <div className="p-1.5 border-t border-white/[0.05]">
          <MenuItem icon={LogOut} label="Log out" danger onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
}

// ─── MenuItem ─────────────────────────────────────────────────────────────────

type MenuItemProps = {
  icon:     React.ElementType;
  label:    string;
  danger?:  boolean;
  onClick?: () => void;
};

function MenuItem({ icon: Icon, label, danger, onClick }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-3
        px-3 py-2.5 rounded-xl
        transition-all duration-150 cursor-pointer
        ${danger
          ? "text-red-400 hover:bg-red-500/[0.08]"
          : "text-white/72 hover:bg-white/[0.045] hover:text-white"
        }
      `}
    >
      <Icon className="w-4 h-4 opacity-80" />
      <span className="text-[13px] font-medium">{label}</span>
    </button>
  );
}