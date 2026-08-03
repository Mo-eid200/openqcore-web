"use client";
import React from "react";
import Link from "next/link";
import { Users, KeyRound, ShieldCheck, ChevronRight } from "lucide-react";

const cardCls = "rounded-2xl border border-white/[0.07] bg-[#0c0a06]/95 backdrop-blur-xl overflow-hidden";

const links = [
  {
    href: "/workspace/members",
    icon: Users,
    title: "Team Members",
    description: "Invite, remove, and manage roles for this workspace",
  },
  {
    href: "/workspace/apis",
    icon: KeyRound,
    title: "API & SDK",
    description: "Create and manage API keys for this workspace",
  },
  {
    href: "/workspace/security",
    icon: ShieldCheck,
    title: "Security",
    description: "Two-factor authentication, sessions, and access logs",
  },
];

export function SettingsQuickLinks() {
  return (
    <div className={cardCls}>
      <div className="p-5 pb-3">
        <div className="text-base font-semibold text-white">More Settings</div>
        <div className="text-xs text-white/35">Team, API access, and security live on their own pages</div>
      </div>
      <div className="flex flex-col divide-y divide-white/[0.06]">
        {links.map(({ href, icon: Icon, title, description }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 px-5 py-4 transition-colors hover:bg-white/[0.03]"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
              <Icon className="h-4 w-4 text-white/50" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm text-white">{title}</div>
              <div className="text-xs text-white/35">{description}</div>
            </div>
            <ChevronRight className="h-4 w-4 shrink-0 text-white/20" />
          </Link>
        ))}
      </div>
    </div>
  );
}