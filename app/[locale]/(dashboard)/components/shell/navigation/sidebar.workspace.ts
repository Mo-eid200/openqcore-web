import {
    LayoutGrid,
    Activity,

    FolderKanban,
    Bot,
    Database,

    KeyRound,
    Server,
    HardDrive,

    BarChart3,

    Users,
    CreditCard,
    Shield,
    Settings,

} from "lucide-react";

// ============================================================
// Role gating
// ============================================================
// "member"  → visible to everyone (owner, admin, member)
// "admin"   → visible to owner + admin only — hidden for plain members
//
// This mirrors the backend exactly: every "admin" item below maps to
// an endpoint protected by WorkspaceService.require_admin() in the
// API (members, billing, dashboard). Items without an explicit
// requiredRole are implicitly "member" — visible to anyone with an
// active membership in the workspace, regardless of role.
//
// Compute, API & SDK, and Analytics are admin-only by deliberate
// decision (not because the backend currently restricts them) —
// they expose cost-affecting controls (compute scaling), a direct
// gateway to the workspace's wallet (API keys), and aggregated
// team-wide usage/cost data — none of which a day-to-day member
// needs to do their actual work in Projects/Agents/Knowledge/Storage.

export type WorkspaceRole = "owner" | "admin" | "member";
export type RequiredRole = "member" | "admin";

export interface WorkspaceSidebarItem {
    href: string;
    label: string;
    icon: typeof LayoutGrid;
    requiredRole: RequiredRole;
}

export interface WorkspaceSidebarSection {
    title: string;
    items: WorkspaceSidebarItem[];
}

export const WORKSPACE_SIDEBAR: WorkspaceSidebarSection[] = [
    // =========================================================
    // WORKSPACE — everyone
    // =========================================================
    {
        title: "Workspace",
        items: [
            {
                href: "/workspace/overview",
                label: "Overview",
                icon: LayoutGrid,
                requiredRole: "member",
            },
            {
                href: "/workspace/activity",
                label: "Activity",
                icon: Activity,
                requiredRole: "member",
            },
        ],
    },

    // =========================================================
    // BUILD — everyone (this is the day-to-day work surface)
    // =========================================================
    {
        title: "Build",
        items: [
            {
                href: "/workspace/projects",
                label: "Projects",
                icon: FolderKanban,
                requiredRole: "member",
            },
            {
                href: "/workspace/agents",
                label: "Agents",
                icon: Bot,
                requiredRole: "member",
            },
            {
                href: "/workspace/knowledge",
                label: "Knowledge",
                icon: Database,
                requiredRole: "member",
            },
        ],
    },

    // =========================================================
    // PLATFORM — Storage is everyone; API/SDK + Compute are admin
    // =========================================================
    {
        title: "Platform",
        items: [
            {
                href: "/workspace/apis",
                label: "API & SDK",
                icon: KeyRound,
                requiredRole: "admin",
            },
            {
                href: "/workspace/compute",
                label: "Compute",
                icon: Server,
                requiredRole: "admin",
            },
            {
                href: "/workspace/storage",
                label: "Storage",
                icon: HardDrive,
                requiredRole: "member",
            },
        ],
    },

    // =========================================================
    // OBSERVABILITY — admin only (team-wide aggregated cost/usage)
    // =========================================================
    {
        title: "Observability",
        items: [
            {
                href: "/workspace/analytics",
                label: "Analytics",
                icon: BarChart3,
                requiredRole: "admin",
            },
        ],
    },

    // =========================================================
    // ORGANIZATION — admin only, all four
    // =========================================================
    {
        title: "Organization",
        items: [
            {
                href: "/workspace/members",
                label: "Members",
                icon: Users,
                requiredRole: "admin",
            },
            {
                href: "/workspace/billing",
                label: "Billing",
                icon: CreditCard,
                requiredRole: "admin",
            },
            {
                href: "/workspace/security",
                label: "Security",
                icon: Shield,
                requiredRole: "admin",
            },
            {
                href: "/workspace/settings",
                label: "Settings",
                icon: Settings,
                requiredRole: "admin",
            },
        ],
    },
];

// ============================================================
// Filter helper — used by the sidebar layout component
// ============================================================
// "owner" and "admin" both satisfy an "admin" requirement — there is
// no owner-only item in this sidebar (owner-only actions, like
// transferring ownership or deleting the workspace, live inside
// Settings itself, not as separate sidebar entries).

export function getVisibleSidebar(role: WorkspaceRole): WorkspaceSidebarSection[] {
    const canSeeAdminItems = role === "owner" || role === "admin";

    return WORKSPACE_SIDEBAR
        .map((section) => ({
            ...section,
            items: section.items.filter(
                (item) => item.requiredRole === "member" || canSeeAdminItems
            ),
        }))
        .filter((section) => section.items.length > 0);
}