// app/[locale]/(dashboard)/workspace/members/page.tsx

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { UserPlus } from "lucide-react";

import { useWorkspace } from "../../../../context/WorkspaceContext";
// 🔥 Adjust this import path to match wherever the current
// authenticated user's id actually lives in this codebase (e.g. an
// AuthContext, a useAuth() hook, or decoded from getStoredToken()).
import { useAuth } from "../../../../context/AuthContext";
import { PageHeader } from "../../components/ui/PageHeader";
import { MemberRole } from "@/app/lib/api/workspace/members";

import MembersTable from "./MembersTable";

// 🔥 FIX: WorkspaceContext.tsx's WorkspaceRole has 5 values
// ("owner" | "admin" | "developer" | "member" | "viewer"), but the
// backend (workspace_members.role CHECK constraint) only supports 3:
// "owner" | "admin" | "member". "developer" and "viewer" exist in
// the frontend type as forward-looking values that nothing in the
// backend issues today. This narrows whatever role the context
// reports down to the 3 the backend actually uses, defaulting to the
// safe minimum ("member") for any value the backend can't produce —
// this is purely defensive; in practice activeWorkspace.role will
// always already be one of the 3 supported values.
function toSupportedMemberRole(role: string): MemberRole {
  if (role === "owner" || role === "admin") return role;
  return "member";
}

export default function MembersPage() {
  const router = useRouter();
  const { activeWorkspace, loading } = useWorkspace();
  const { user } = useAuth();

  const currentUserRole = activeWorkspace
    ? toSupportedMemberRole(activeWorkspace.role)
    : "member";

  // 🔒 Defense in depth: the sidebar already hides this page for
  // plain members (requiredRole: "admin" in sidebar.workspace.ts),
  // but a member could still navigate here directly by URL. This
  // redirect is the actual enforcement — the sidebar filter is just
  // UX, not security.
  React.useEffect(() => {
    if (!loading && activeWorkspace && currentUserRole === "member") {
      router.replace("/workspace/overview");
    }
  }, [loading, activeWorkspace, currentUserRole, router]);

  if (loading || !activeWorkspace || !user) {
    return null;
  }

  if (currentUserRole === "member") {
    return null; // redirecting
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-2 sm:px-6 xl:px-10 py-10 flex flex-col gap-10">
      <PageHeader
        title="Members"
        description="Manage who has access to this workspace and what they can do."
        icon={<UserPlus className="w-6 h-6 text-red-400" />}
      />

      <MembersTable
        workspaceId={activeWorkspace.id}
        currentUserId={Number(user.id)}
        currentUserRole={currentUserRole}
      />
    </div>
  );
}