import {
    LayoutGrid,
    Activity,

    FolderKanban,
    Bot,
    Database,

    KeyRound,
    Server,
    HardDrive,
    PlugZap,
    ShieldCheck,

    BarChart3,
    FileText,
    Gauge,

    Users,
    CreditCard,
    Shield,
    Settings,

} from "lucide-react";

export const WORKSPACE_SIDEBAR = [
    // =========================================================
    // WORKSPACE
    // =========================================================
    {
        title: "Workspace",

        items: [
            {
                href: "/workspace/overview",
                label: "Overview",
                icon: LayoutGrid,
            },

            {
                href: "/workspace/activity",
                label: "Activity",
                icon: Activity,
            },
        ],
    },

    // =========================================================
    // BUILD
    // =========================================================
    {
        title: "Build",

        items: [
            {
                href: "/workspace/projects",
                label: "Projects",
                icon: FolderKanban,
            },

            {
                href: "/workspace/agents",
                label: "Agents",
                icon: Bot,
            },

            {
                href: "/workspace/knowledge",
                label: "Knowledge",
                icon: Database,
            },
        ],
    },

    // =========================================================
    // PLATFORM
    // =========================================================
    {
        title: "Platform",

        items: [
            {
                href: "/workspace/apis",
                label: "API & SDK",
                icon: KeyRound,
            },

            {
                href: "/workspace/compute",
                label: "Compute",
                icon: Server,
            },

            {
                href: "/workspace/storage",
                label: "Storage",
                icon: HardDrive,
            },

        ],
    },

    // =========================================================
    // OBSERVABILITY
    // =========================================================
    {
        title: "Observability",

        items: [
            {
                href: "/workspace/analytics",
                label: "Analytics",
                icon: BarChart3,
            },


        ],
    },

    // =========================================================
    // ORGANIZATION
    // =========================================================
    {
        title: "Organization",

        items: [
            {
                href: "/workspace/members",
                label: "Members",
                icon: Users,
            },

            {
                href: "/workspace/billing",
                label: "Billing",
                icon: CreditCard,
            },

            {
                href: "/workspace/security",
                label: "Security",
                icon: Shield,
            },

            {
                href: "/workspace/settings",
                label: "Settings",
                icon: Settings,
            },
        ],
    },
];