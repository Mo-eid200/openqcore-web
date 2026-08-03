// app/[locale]/(dashboard)/workspace/members/InviteMemberModal.tsx

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { X, Loader2, UserPlus, ChevronDown, Check, Zap, Users } from "lucide-react";

import type { MemberRole } from "@/app/lib/api/workspace/members";

type InviteMemberModalProps = {
  open: boolean;
  loading: boolean;
  error: string | null;
  seatsFull: boolean;
  isFreePlan: boolean;
  seatsUsed: number;
  seatsLimit: number;
  onClose: () => void;
  onInvite: (email: string, role: Exclude<MemberRole, "owner">) => Promise<void>;
};

// 🔥 Small nicety: remembers the last role you invited someone as, so
// the field doesn't reset to "Member" every time. Purely cosmetic —
// drop this if you'd rather it always default to "member".
const LAST_ROLE_KEY = "openqcore:last-invite-role";

// 🔥 Adjust to your actual billing/upgrade route.
const UPGRADE_URL = "/workspace/billing";

const ROLE_LABEL: Record<Exclude<MemberRole, "owner">, string> = {
  member: "Member",
  admin: "Admin",
};

export function InviteMemberModal({
  open,
  loading,
  error,
  seatsFull,
  isFreePlan,
  seatsUsed,
  seatsLimit,
  onClose,
  onInvite,
}: InviteMemberModalProps) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<Exclude<MemberRole, "owner">>("member");
  const [roleOpen, setRoleOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const stored = window.localStorage.getItem(LAST_ROLE_KEY);
    if (stored === "admin" || stored === "member") setRole(stored);
  }, [open]);

  useEffect(() => {
    if (!open) setEmail("");
  }, [open]);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) return;
    await onInvite(trimmed, role);
    window.localStorage.setItem(LAST_ROLE_KEY, role);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0d0d10] p-6 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
              <UserPlus className="w-4 h-4 text-red-400" />
            </div>
            <h2 className="text-base font-semibold text-white">Invite a member</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-white/30 hover:bg-white/[0.06] hover:text-white/60"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Seats full — Free plan → Upgrade CTA ── */}
        {seatsFull && isFreePlan ? (
          <div className="flex flex-col items-center text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
              <Zap className="h-5 w-5 text-red-400" />
            </div>
            <p className="mt-4 text-sm font-medium text-white">
              You've used all {seatsLimit} {seatsLimit === 1 ? "seat" : "seats"} on the Free plan
            </p>
            <p className="mt-1.5 text-sm text-white/40">
              Upgrade to invite more people to this workspace.
            </p>
            <Link
              href={UPGRADE_URL}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-400"
            >
              Upgrade to Add Members
            </Link>
          </div>

        /* ── Seats full — Paid plan → informational, no CTA ── */
        ) : seatsFull ? (
          <div className="flex flex-col items-center text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.08]">
              <Users className="h-5 w-5 text-white/40" />
            </div>
            <p className="mt-4 text-sm font-medium text-white">All seats are busy</p>
            <p className="mt-1.5 text-sm text-white/40">
              This workspace is using {seatsUsed} of {seatsLimit} {seatsLimit === 1 ? "seat" : "seats"}.
              Remove a member or upgrade your plan to invite someone new.
            </p>
            <Link
              href={UPGRADE_URL}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/70 transition hover:bg-white/[0.06] hover:text-white"
            >
              Manage Plan & Seats
            </Link>
          </div>

        /* ── Normal invite form ── */
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/40">
                Email address
              </label>
              <input
                type="email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="colleague@company.com"
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-white/20 focus:border-red-500/50 focus:outline-none"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium text-white/40">
                Role
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setRoleOpen((v) => !v)}
                  className="flex w-full items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-white focus:border-red-500/50 focus:outline-none"
                >
                  {ROLE_LABEL[role]}
                  <ChevronDown className={`h-4 w-4 text-white/40 transition-transform ${roleOpen ? "rotate-180" : ""}`} />
                </button>

                {roleOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setRoleOpen(false)} />
                    <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 origin-top overflow-hidden rounded-xl border border-white/[0.08] bg-[#0d0d10] shadow-xl animate-fade-in-up">
                      {(Object.keys(ROLE_LABEL) as Array<Exclude<MemberRole, "owner">>).map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            setRole(value);
                            setRoleOpen(false);
                          }}
                          className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm text-white/80 transition hover:bg-white/[0.06]"
                        >
                          {ROLE_LABEL[value]}
                          {role === value && <Check className="h-3.5 w-3.5 text-red-400" />}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {error && (
              <p className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">
                {error}
              </p>
            )}

            <p className="text-xs text-white/25">
              {seatsUsed} of {seatsLimit} {seatsLimit === 1 ? "seat" : "seats"} used
            </p>

            <button
              type="submit"
              disabled={loading || !email.trim()}
              className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Send Invitation
            </button>
          </form>
        )}
      </div>
    </div>
  );
}