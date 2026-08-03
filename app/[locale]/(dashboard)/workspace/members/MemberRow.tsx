// app/[locale]/(dashboard)/workspace/members/MemberRow.tsx

"use client";

import React, { useState } from "react";
import { MoreVertical, Shield, Trash2 } from "lucide-react";

import type { MemberRole, WorkspaceMember } from "@/app/lib/api/workspace/members";

type MemberRowProps = {
  member: WorkspaceMember;
  isSelf: boolean;
  canManage: boolean;
  onChangeRole: (role: Exclude<MemberRole, "owner">) => void;
  onRemove: () => void;
};

const ROLE_LABEL: Record<MemberRole, string> = {
  owner: "Owner",
  admin: "Admin",
  member: "Member",
};

export default function MemberRow({
  member,
  isSelf,
  canManage,
  onChangeRole,
  onRemove,
}: MemberRowProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isOwner = member.role === "owner";
  const editable = canManage && !isOwner && !isSelf;

  const handleRemove = () => {
    if (!window.confirm(`Remove ${member.full_name || member.email} from this workspace?`)) return;
    onRemove();
    setMenuOpen(false);
  };

  return (
    <tr className="border-b border-white/[0.04] last:border-0 text-white/70">
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-xs font-medium text-white/70">
            {(member.full_name || member.email).slice(0, 1).toUpperCase()}
          </div>
          <div>
            <p className="text-sm text-white/90">
              {member.full_name || member.email}
              {isSelf && <span className="ml-2 text-xs text-white/30">(you)</span>}
            </p>
            {member.full_name && (
              <p className="text-xs text-white/30">{member.email}</p>
            )}
          </div>
        </div>
      </td>

      <td className="px-5 py-3.5">
        {editable ? (
          <select
            value={member.role}
            onChange={(e) => onChangeRole(e.target.value as Exclude<MemberRole, "owner">)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 py-1 text-xs text-white/80 focus:border-red-500/50 focus:outline-none"
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
        ) : (
          <span className="inline-flex items-center gap-1 rounded-lg bg-white/[0.04] px-2 py-1 text-xs text-white/50">
            {isOwner && <Shield className="h-3 w-3 text-red-400" />}
            {ROLE_LABEL[member.role]}
          </span>
        )}
      </td>

      <td className="px-5 py-3.5 text-xs text-white/30">
        {member.joined_at
          ? new Date(member.joined_at).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })
          : "—"}
      </td>

      <td className="px-5 py-3.5 text-right">
        {editable && (
          <div className="relative inline-block">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="rounded-lg p-1.5 text-white/30 transition hover:bg-white/[0.06] hover:text-white/60"
            >
              <MoreVertical className="h-4 w-4" />
            </button>
            {menuOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                <div className="absolute right-0 z-20 mt-1 w-40 rounded-xl border border-white/[0.08] bg-[#0d0d10] py-1 shadow-xl">
                  <button
                    onClick={handleRemove}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-xs text-red-400 hover:bg-white/[0.04]"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove member
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </td>
    </tr>
  );
}