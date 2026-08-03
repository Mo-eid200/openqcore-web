import {
    LayoutGrid,
    Activity,

    Bot,
    Database,
    Sparkles,

    Images,
    Mic,

    MessageSquare,

    KeyRound,
    BarChart3,

    CreditCard,
    Bell,
    User,
    Settings,
    LifeBuoy,

} from "lucide-react";

export const CONSOLE_SIDEBAR = [
    // =========================================================
    // CONSOLE
    // =========================================================
    {
        title: "Console",

        items: [
            {
                href: "/console/overview",
                label: "Overview",
                icon: LayoutGrid,
            },

            {
                href: "/console/activity",
                label: "Activity",
                icon: Activity,
            },
        ],
    },

    // =========================================================
    // AI TOOLS
    // =========================================================
    {
        title: "AI Tools",

        items: [
            {
                href: "/console/agents",
                label: "Agents",
                icon: Bot,
            },

            {
                href: "/console/knowledge",
                label: "Knowledge",
                icon: Database,
            },

            {
                href: "/console/generations",
                label: "Generations",
                icon: Sparkles,
            },
        ],
    },

    // =========================================================
    // STUDIO
    // =========================================================
    {
        title: "Studio",

        items: [
            {
                href: "/console/images",
                label: "Images",
                icon: Images,
            },

            {
                href: "/console/voice",
                label: "Voice",
                icon: Mic,
            },
        ],
    },

    // =========================================================
    // APPLICATIONS
    // =========================================================
    {
        title: "Projects",

        items: [
            {
                href: "/console/projects",
                label: "Projects",
                icon: User,
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
                href: "/console/api-keys",
                label: "API Keys",
                icon: KeyRound,
            },

            {
                href: "/console/usage",
                label: "Usage",
                icon: BarChart3,
            },
        ],
    },

    // =========================================================
    // ACCOUNT
    // =========================================================
    {
        title: "Account",

        items: [
            {
                href: "/console/billing",
                label: "Billing",
                icon: CreditCard,
            },


            {
                href: "/console/settings",
                label: "Settings",
                icon: Settings,
            },

            {
                href: "/console/support",
                label: "Support",
                icon: LifeBuoy,
            },
        ],
    },
];