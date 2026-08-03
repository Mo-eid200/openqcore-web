import {
    LayoutGrid,
    Activity,

    FolderKanban,
    Bot,
    Database,

    KeyRound,
    Server,
    Files,
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

export const SIDEBAR_SECTIONS = [
    // =========================================================
    // WORKSPACE
    // =========================================================
    {
        title: "Workspace",

        items: [
            {
                href: "/workspace",
                label: "Overview",
                icon: LayoutGrid,
            },

            {
                href: "/activity",
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
                href: "/projects",
                label: "Projects",
                icon: FolderKanban,
            },

            {
                href: "/agents",
                label: "Agents",
                icon: Bot,
            },

            {
                href: "/knowledge",
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
                href: "/apis",
                label: "API & SDK",
                icon: KeyRound,
            },

            {
                href: "/compute",
                label: "Compute",
                icon: Server,
            },

            {
                href: "/storage",
                label: "Storage",
                icon: Files,
            },

            {
                href: "/integrations",
                label: "Integrations",
                icon: PlugZap,
            },

            {
                href: "/secrets",
                label: "Secrets",
                icon: ShieldCheck,
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
                href: "/analytics",
                label: "Analytics",
                icon: BarChart3,
            },

            {
                href: "/logs",
                label: "Logs",
                icon: FileText,
            },

            {
                href: "/usage",
                label: "Usage",
                icon: Gauge,
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
                href: "/members",
                label: "Members",
                icon: Users,
            },

            {
                href: "/billing",
                label: "Billing",
                icon: CreditCard,
            },

            {
                href: "/security",
                label: "Security",
                icon: Shield,
            },

            {
                href: "/settings",
                label: "Settings",
                icon: Settings,
            },
        ],
    },
];