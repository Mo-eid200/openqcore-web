// app/lib/api/workspace/members.ts

import { qxtApiClient } from "../core/qxtClient";

// Written once, used everywhere below — matches the convention your
// other api/workspace/*.ts files use (qxtApiClient's baseURL does NOT
// include /api/v1, so every call needs it).
const API_V1 = "/api/v1";

// =========================================================
// TYPES — mirrors app/api/v1/workspace/members.py exactly
// =========================================================

export type MemberRole = "owner" | "admin" | "member";
export type MemberStatus = "active" | "paused" | "removed";

export interface WorkspaceMember {
  id: number;
  user_id: number;
  email: string;
  full_name: string | null;
  role: MemberRole;
  status: MemberStatus;
  joined_at: string | null;
}

export interface WorkspaceInvitation {
  invitation_id: string;
  invited_email: string;
  role: MemberRole;
  created_at: string;
  expires_at: string;
}

export interface InviteMemberResult {
  invitation_id: string;
  invited_email: string;
  is_registered_user: boolean;
  accept_url: string;
}

// =========================================================
// Error helper
// =========================================================

/**
 * qxtApiClient is an axios instance — errors land in err.response.data.
 * Your backend's global error envelope (see qxtClient.ts's handleError)
 * is { success: false, error: { code, message, trace_id } } — NOT
 * FastAPI's default { detail: ... } shape.
 */
function extractErrorMessage(err: unknown, fallback: string): string {
  const responseData = (err as any)?.response?.data;
  const message = responseData?.error?.message;
  if (typeof message === "string" && message.trim()) return message;

  // Fallback in case some endpoint still returns the raw FastAPI shape
  const detail = responseData?.detail;
  if (typeof detail === "string") return detail;
  if (detail?.message) return detail.message as string;

  return fallback;
}

export function getErrorCode(err: unknown): string | undefined {
  return (err as any)?.response?.data?.error?.code;
}

// =========================================================
// MEMBERS
// =========================================================

export async function getWorkspaceMembers(
  workspaceId: string,
): Promise<WorkspaceMember[]> {
  try {
    const { data } = await qxtApiClient.get<{ members: WorkspaceMember[] }>(
      `${API_V1}/workspaces/${workspaceId}/members`,
    );
    return data.members;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load members."));
  }
}

export async function updateWorkspaceMemberRole(
  workspaceId: string,
  memberId: number,
  role: Exclude<MemberRole, "owner">,
): Promise<{ success: boolean; member_id: number; role: MemberRole }> {
  try {
    const { data } = await qxtApiClient.patch(
      `${API_V1}/workspaces/${workspaceId}/members/${memberId}`,
      { role },
    );
    return data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to update role."));
  }
}

export async function removeWorkspaceMember(
  workspaceId: string,
  memberId: number,
): Promise<{ success: boolean }> {
  try {
    const { data } = await qxtApiClient.delete(
      `${API_V1}/workspaces/${workspaceId}/members/${memberId}`,
    );
    return data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to remove member."));
  }
}

// =========================================================
// INVITATIONS
// =========================================================

export async function inviteWorkspaceMember(
  workspaceId: string,
  email: string,
  role: Exclude<MemberRole, "owner">,
): Promise<InviteMemberResult> {
  try {
    const { data } = await qxtApiClient.post(
      `${API_V1}/workspaces/${workspaceId}/members/invite`,
      { email, role },
    );
    return data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to send invitation."));
  }
}

export async function getWorkspaceInvitations(
  workspaceId: string,
): Promise<WorkspaceInvitation[]> {
  try {
    const { data } = await qxtApiClient.get<{ invitations: WorkspaceInvitation[] }>(
      `${API_V1}/workspaces/${workspaceId}/members/invitations`,
    );
    return data.invitations;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to load invitations."));
  }
}

export async function revokeWorkspaceInvitation(
  workspaceId: string,
  invitationId: string,
): Promise<{ success: boolean }> {
  try {
    const { data } = await qxtApiClient.delete(
      `${API_V1}/workspaces/${workspaceId}/members/invitations/${invitationId}`,
    );
    return data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Failed to revoke invitation."));
  }
}