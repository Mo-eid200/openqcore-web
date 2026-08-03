// app/[locale]/(dashboard)/workspace/members/MembersTable.tsx

"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UserPlus, Mail, Clock } from "lucide-react";
import { createPortal } from "react-dom";

import MemberRow from "./MemberRow";
import { InviteMemberModal } from "./InviteMemberModal";

import { useWorkspace } from "@/app/context/WorkspaceContext";
import {
  getWorkspaceMembers,
  getWorkspaceInvitations,
  inviteWorkspaceMember,
  updateWorkspaceMemberRole,
  removeWorkspaceMember,
  revokeWorkspaceInvitation,
  getErrorCode,
  type WorkspaceMember,
  type WorkspaceInvitation,
  type MemberRole,
} from "@/app/lib/api/workspace/members";

// ─── Fade ─────────────────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="animate-fade-in-up" style={{ animationDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function TableSkeleton() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-16 border-b border-white/[0.04] last:border-0 bg-white/[0.02] animate-pulse"
          style={{ animationDelay: `${i * 60}ms` }}
        />
      ))}
    </div>
  );
}

// ─── Format ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
}

// ─── Page ─────────────────────────────────────────────────────────────────────

type MembersTableProps = {
  workspaceId: string;
  currentUserId: number;
  currentUserRole: MemberRole;
};

export default function MembersTable({
  workspaceId,
  currentUserId,
  currentUserRole,
}: MembersTableProps) {
  const queryClient = useQueryClient();
  const { activeWorkspace } = useWorkspace();
  const [showInvite, setShowInvite] = useState(false);
  const [inviteError, setInviteError] = useState<string | null>(null);
  const canManage = currentUserRole === "owner" || currentUserRole === "admin";

  const membersKey = ["workspace-members", workspaceId];
  const invitationsKey = ["workspace-invitations", workspaceId];

  // ── Queries ──────────────────────────────────────────────────────────────
  const { data: members = [], isLoading: membersLoading } = useQuery({
    queryKey: membersKey,
    queryFn: () => getWorkspaceMembers(workspaceId),
    enabled: !!workspaceId,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 1,
  });

  const { data: invitations = [] } = useQuery({
    queryKey: invitationsKey,
    queryFn: () => getWorkspaceInvitations(workspaceId),
    enabled: !!workspaceId && canManage,
    staleTime: 60_000,
    gcTime: 5 * 60_000,
    retry: 1,
  });

  // ── Seat / plan awareness ────────────────────────────────────────────────
  // members.length (live query) is the source of truth for "seats used" —
  // activeWorkspace.members_count comes from the bootstrap call and can be
  // one request stale right after an invite/remove.
  const seatsLimit = activeWorkspace?.seats ?? 1;
  const seatsUsed = members.length;
  const seatsFull = seatsUsed >= seatsLimit;
  const isFreePlan = activeWorkspace?.plan === "Free Plan";

  // ── Invite ───────────────────────────────────────────────────────────────
  const { mutateAsync: doInvite, isPending: inviting } = useMutation({
    mutationFn: ({ email, role }: { email: string; role: Exclude<MemberRole, "owner"> }) =>
      inviteWorkspaceMember(workspaceId, email, role),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: invitationsKey });
      setInviteError(null);
      setShowInvite(false);
    },
    onError: (err) => {
      // Safety net: even if the client-side seat check somehow missed it
      // (stale data, race with another admin inviting at the same time),
      // the backend is the real source of truth here.
      if (getErrorCode(err) === "SEAT_LIMIT_REACHED") {
        queryClient.invalidateQueries({ queryKey: membersKey });
      }
      setInviteError(err instanceof Error ? err.message : "Failed to send invitation.");
    },
  });

  // ── Change role ──────────────────────────────────────────────────────────
  const { mutateAsync: doChangeRole } = useMutation({
    mutationFn: ({ memberId, role }: { memberId: number; role: Exclude<MemberRole, "owner"> }) =>
      updateWorkspaceMemberRole(workspaceId, memberId, role),
    onSuccess: (_res, vars) => {
      queryClient.setQueryData(membersKey, (old: WorkspaceMember[] | undefined) =>
        old?.map((m) => (m.id === vars.memberId ? { ...m, role: vars.role } : m)),
      );
    },
  });

  // ── Remove member ────────────────────────────────────────────────────────
  const { mutateAsync: doRemove } = useMutation({
    mutationFn: (memberId: number) => removeWorkspaceMember(workspaceId, memberId),
    onSuccess: (_res, memberId) => {
      queryClient.setQueryData(membersKey, (old: WorkspaceMember[] | undefined) =>
        old?.filter((m) => m.id !== memberId),
      );
    },
  });

  // ── Revoke invitation ────────────────────────────────────────────────────
  const { mutateAsync: doRevoke } = useMutation({
    mutationFn: (invitationId: string) => revokeWorkspaceInvitation(workspaceId, invitationId),
    onSuccess: (_res, invitationId) => {
      queryClient.setQueryData(invitationsKey, (old: WorkspaceInvitation[] | undefined) =>
        old?.filter((i) => i.invitation_id !== invitationId),
      );
    },
  });

  return (
    <>
      <div className="flex flex-col gap-6">

        <FadeIn delay={0}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
              <UserPlus className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-white/40">
                {seatsUsed} / {seatsLimit} {seatsLimit === 1 ? "seat" : "seats"}
                {canManage && invitations.length > 0 && (
                  <span className="text-white/25"> · {invitations.length} pending</span>
                )}
              </p>
            </div>
            {canManage && (
              <button
                onClick={() => {
                  setInviteError(null);
                  setShowInvite(true);
                }}
                className="ml-auto flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-400"
              >
                <UserPlus className="w-4 h-4" />
                Invite Member
              </button>
            )}
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          {membersLoading ? (
            <TableSkeleton />
          ) : (
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06] text-left">
                    <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-white/30">Member</th>
                    <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-white/30">Role</th>
                    <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-white/30">Joined</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <MemberRow
                      key={member.id}
                      member={member}
                      isSelf={member.user_id === currentUserId}
                      canManage={canManage}
                      onChangeRole={(role) => doChangeRole({ memberId: member.id, role })}
                      onRemove={() => doRemove(member.id)}
                    />
                  ))}
                </tbody>
              </table>

              {members.length === 0 && (
                <div className="py-12 text-center text-sm text-white/30">
                  No members yet.
                </div>
              )}
            </div>
          )}
        </FadeIn>

        {canManage && invitations.length > 0 && (
          <FadeIn delay={200}>
            <div>
              <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-white/30">
                Pending Invitations
              </h3>
              <div className="flex flex-col gap-2">
                {invitations.map((invite) => (
                  <div
                    key={invite.invitation_id}
                    className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] text-white/40">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-sm text-white/80">{invite.invited_email}</p>
                        <p className="flex items-center gap-1 text-xs text-white/30">
                          <Clock className="h-3 w-3" />
                          Expires {formatDate(invite.expires_at)}
                          <span className="mx-1">·</span>
                          {invite.role === "admin" ? "Admin" : "Member"}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => doRevoke(invite.invitation_id)}
                      className="text-xs text-white/30 transition hover:text-red-400"
                    >
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        )}

      </div>

      {createPortal(
        <InviteMemberModal
          open={showInvite}
          loading={inviting}
          error={inviteError}
          seatsFull={seatsFull}
          isFreePlan={isFreePlan}
          seatsUsed={seatsUsed}
          seatsLimit={seatsLimit}
          onClose={() => {
            setShowInvite(false);
            setInviteError(null);
          }}
          onInvite={async (email, role) => {
            await doInvite({ email, role });
          }}
        />,
        document.body,
      )}
    </>
  );
}