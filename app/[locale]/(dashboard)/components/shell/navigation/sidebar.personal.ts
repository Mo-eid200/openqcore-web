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

export const PERSONAL_SIDEBAR = [
    // =========================================================
    // PERSONAL
    // =========================================================
    {
        title: "Personal",

        items: [
            {
                href: "/personal/overview",
                label: "Overview",
                icon: LayoutGrid,
            },

            {
                href: "/personal/activity",
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
                href: "/personal/agents",
                label: "Agents",
                icon: Bot,
            },

            {
                href: "/personal/knowledge",
                label: "Knowledge",
                icon: Database,
            },

            {
                href: "/personal/generations",
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
                href: "/personal/images",
                label: "Images",
                icon: Images,
            },

            {
                href: "/personal/voice",
                label: "Voice",
                icon: Mic,
            },
        ],
    },

    // =========================================================
    // APPLICATIONS
    // =========================================================
    {
        title: "Applications",

        items: [
            {
                href: "/qxt",
                label: "ChatQXT",
                icon: MessageSquare,
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
                href: "/personal/api-keys",
                label: "API Keys",
                icon: KeyRound,
            },

            {
                href: "/personal/usage",
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
                href: "/personal/billing",
                label: "Billing",
                icon: CreditCard,
            },


            {
                href: "/personal/settings",
                label: "Settings",
                icon: Settings,
            },

            {
                href: "/personal/support",
                label: "Support",
                icon: LifeBuoy,
            },
        ],
    },
];