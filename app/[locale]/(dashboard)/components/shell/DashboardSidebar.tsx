"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  Bot,
  BookOpen,
  KeyRound,
  Server,
  HardDrive,
  BarChart3,
  Users,
  CreditCard,
  Shield,
  Settings,
  Activity,
  ChevronDown,
  Check,
  Sparkles,
  MessageSquare,
  Cpu,
  Mic,
  Bell,
  FolderKanban,
  Image as ImageIcon,
  Wand2,
  LifeBuoy,
} from "lucide-react";
import { useWorkspace } from "@/app/context/WorkspaceContext";

// ─── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY = "oqc_sidebar_open";
const SIDEBAR_EVENT = "oqc-sidebar-toggle";
const WIDTH_OPEN = 240;
const WIDTH_COLLAPSED = 60;

// ─── Sidebar state (localStorage-backed) ─────────────────────────────────────

function readSidebarOpen(): boolean {
  if (typeof window === "undefined") return true;
  return localStorage.getItem(STORAGE_KEY) !== "false";
}

function writeSidebarOpen(value: boolean) {
  localStorage.setItem(STORAGE_KEY, String(value));
  window.dispatchEvent(new CustomEvent(SIDEBAR_EVENT, { detail: value }));
}

function useSidebarState() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(readSidebarOpen());

    function handleStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) {
        setOpen(e.newValue !== "false");
      }
    }

    function handleSidebarToggle() {
      setOpen(readSidebarOpen());
    }

    window.addEventListener("storage", handleStorage);
    window.addEventListener(SIDEBAR_EVENT, handleSidebarToggle);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener(SIDEBAR_EVENT, handleSidebarToggle);
    };
  }, []);

  function setSidebarOpen(value: boolean) {
    setOpen(value);
    writeSidebarOpen(value);
  }

  function toggle() {
    setSidebarOpen(!open);
  }

  return { open, toggle, setSidebarOpen };
}

// ─── Types ────────────────────────────────────────────────────────────────────

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
  tooltip?: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

// ─── Navigation definitions ──────────────────────────────────────────────────

const CONSOLE_NAV: NavSection[] = [
  {
    title: "GENERAL",
    items: [
      { label: "Overview", href: "/console/overview", icon: LayoutDashboard },
      { label: "Activity", href: "/console/activity", icon: Activity },
    ],
  },
  {
    title: "AI TOOLS",
    items: [
      { label: "Agents", href: "/console/agents", icon: Bot },
      { label: "Generations", href: "/console/generations", icon: Wand2 },
      { label: "Images", href: "/console/images", icon: ImageIcon },
      { label: "Knowledge", href: "/console/knowledge", icon: BookOpen },
      { label: "Voice", href: "/console/voice", icon: Mic },
    ],
  },
  {
    title: "ACCOUNT",
    items: [
      { label: "API Keys", href: "/console/api-keys", icon: KeyRound },
      { label: "Billing", href: "/console/billing", icon: CreditCard },
      { label: "Projects", href: "/console/projects", icon: FolderKanban },
      { label: "Usage", href: "/console/usage", icon: BarChart3 },
      { label: "Settings", href: "/console/settings", icon: Settings },
      { label: "Support", href: "/console/support", icon: LifeBuoy },
    ],
  },
];

const WORKSPACE_NAV: NavSection[] = [
  {
    title: "GENERAL",
    items: [
      { label: "Overview", href: "/workspace/overview", icon: LayoutDashboard },
      { label: "Activity", href: "/workspace/activity", icon: Activity },
      { label: "Projects", href: "/workspace/projects", icon: FolderKanban },
    ],
  },
  {
    title: "AI TOOLS",
    items: [
      { label: "Agents", href: "/workspace/agents", icon: Bot },
      { label: "Knowledge", href: "/workspace/knowledge", icon: BookOpen },
      { label: "Analytics", href: "/workspace/analytics", icon: BarChart3 },
      { label: "Voice", href: "/workspace/voice", icon: Mic },
    ],
  },
  {
    title: "PLATFORM",
    items: [
      { label: "APIs", href: "/workspace/apis", icon: KeyRound },
      { label: "Compute", href: "/workspace/compute", icon: Server },
      { label: "Storage", href: "/workspace/storage", icon: HardDrive },
    ],
  },
  {
    title: "ORGANIZATION",
    items: [
      { label: "Members", href: "/workspace/members", icon: Users },
      { label: "Billing", href: "/workspace/billing", icon: CreditCard },
      { label: "Security", href: "/workspace/security", icon: Shield },
      { label: "Settings", href: "/workspace/settings", icon: Settings },
    ],
  },
];

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function Tooltip({ label, visible }: { label: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.span
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -4 }}
          transition={{ duration: 0.1 }}
          className="pointer-events-none absolute left-full z-50 ml-2 whitespace-nowrap rounded-md border border-white/[0.08] bg-[#1a1a1e] px-2.5 py-1 text-xs text-white shadow-lg"
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

// ─── Workspace Selector ──────────────────────────────────────────────────────

function WorkspaceSelector({ collapsed }: { collapsed: boolean }) {
  const { workspaces, activeWorkspace, switchWorkspace } = useWorkspace();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  if (!workspaces?.length) return null;

  const initial = (activeWorkspace?.name?.[0] || "W").toUpperCase();

  if (collapsed) {
    return (
      <div className="mb-1 flex justify-center px-1.5">
        <div
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.08] text-[11px] font-bold text-white/50"
          title={activeWorkspace?.name}
        >
          {initial}
        </div>
      </div>
    );
  }

  return (
    <div className="relative mb-2 px-2.5" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded-2xl border border-white/[0.05] bg-white/[0.04] px-3 py-2.5 text-left transition hover:bg-white/[0.06]"
      >
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.10] text-[11px] font-bold text-white/65">
            {initial}
          </div>
          <span className="truncate text-sm font-medium text-white/85">
            {activeWorkspace?.name || "Select workspace"}
          </span>
        </div>

        <ChevronDown
          className={`h-4 w-4 shrink-0 text-white/30 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute left-2.5 right-2.5 top-[calc(100%+6px)] z-50 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111113] shadow-2xl"
          >
            {workspaces.map((ws: any) => (
              <button
                key={ws.id}
                type="button"
                onClick={() => {
                  switchWorkspace(ws.id);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm text-white/70 transition hover:bg-white/[0.05]"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[9px] font-bold text-white/50">
                    {(ws.name?.[0] || "W").toUpperCase()}
                  </div>
                  <span className="truncate">{ws.name}</span>
                </div>

                {ws.id === activeWorkspace?.id && (
                  <Check className="h-3.5 w-3.5 text-[#E7B94C]" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Nav Link ────────────────────────────────────────────────────────────────
function NavLink({
  item,
  isActive,
  collapsed,
}: {
  item: NavItem;
  isActive: boolean;
  collapsed: boolean;
}) {
  const Icon = item.icon;
  const [hovered, setHovered] = useState(false);

  if (collapsed) {
    return (
      <div
        className="relative flex justify-center"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Link
          href={item.href}
          className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all ${
            isActive
              ? "bg-white/[0.10] text-white"
              : "text-white/35 hover:bg-white/[0.06] hover:text-white/70"
          }`}
        >
          <Icon
            className={`h-[18px] w-[18px] ${
              isActive ? "text-white" : "text-white/35"
            }`}
            strokeWidth={isActive ? 1.9 : 1.5}
          />
        </Link>

        <Tooltip label={item.label} visible={hovered} />
      </div>
    );
  }

  return (
    <Link
      href={item.href}
      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-[13px] transition-all ${
        isActive
          ? "bg-white/[0.08] font-medium text-white"
          : "text-white/45 hover:bg-white/[0.04] hover:text-white/75"
      }`}
    >
      <Icon
        className={`h-[18px] w-[18px] shrink-0 transition-colors ${
          isActive ? "text-white" : "text-white/30"
        }`}
        strokeWidth={isActive ? 1.9 : 1.5}
      />
      <span>{item.label}</span>
    </Link>
  );
}
// ─── Main Sidebar ────────────────────────────────────────────────────────────

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { open, toggle } = useSidebarState();

  const collapsed = !open;
  const width = collapsed ? WIDTH_COLLAPSED : WIDTH_OPEN;
  const [collapsedLogoHovered, setCollapsedLogoHovered] = useState(false);
    useEffect(() => {
    if (collapsed) {
      setCollapsedLogoHovered(false);
    }
  }, [collapsed]);

  const isWorkspace = pathname?.includes("/workspace");
  const [mode, setMode] = useState<"console" | "workspace">(
    isWorkspace ? "workspace" : "console",
  );

  useEffect(() => {
    setMode(pathname?.includes("/workspace") ? "workspace" : "console");
  }, [pathname]);

  const nav = mode === "workspace" ? WORKSPACE_NAV : CONSOLE_NAV;

  function handleModeSwitch(newMode: "console" | "workspace") {
    setMode(newMode);
    router.push(
      newMode === "console" ? "/console/overview" : "/workspace/overview",
    );
  }

  function isActive(href: string) {
  if (!pathname) return false;
  return pathname === href || pathname.startsWith(href + "/");
}

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-0 left-0 top-0 z-30 flex flex-col overflow-hidden border-r border-white/[0.06] bg-[#0e0e10]"
      >
        <div
          style={{ width: `${width}px`, minWidth: `${width}px` }}
          className="flex h-full flex-col"
        >
          {/* Header */}
          <div
            className={`flex shrink-0 ${
              collapsed
                ? "h-20 items-center justify-center px-1"
                : "h-14 items-center justify-between px-3"
            }`}
          >
            {collapsed ? (
              <button
                type="button"
                onClick={() => {
                setCollapsedLogoHovered(false);
                toggle();
                }}
                onMouseEnter={() => setCollapsedLogoHovered(true)}
                onMouseLeave={() => setCollapsedLogoHovered(false)}
                className="flex h-12 w-12 items-center justify-center rounded-xl transition hover:bg-white/[0.06]"
                aria-label="Open sidebar"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {collapsedLogoHovered ? (
                    <motion.div
                      key="open-icon"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.12 }}
                    >
                      <PanelLeftOpen
                        className="h-[22px] w-[22px] text-white/55"
                        strokeWidth={1.7}
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="logo"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.12 }}
                    >
                      <Image
                        src="/oqc-logo.png"
                        alt="OpenQCore"
                        width={42}
                        height={42}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            ) : (
              <>
                <Link href="/" className="flex items-center gap-2.5">
                  <Image
                    src="/oqc-logo.png"
                    alt="OpenQCore"
                    width={55}
                    height={55}
                    className="shrink-0"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() => {
                  setCollapsedLogoHovered(false);
                  toggle();
                  }}
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-white/25 transition hover:bg-white/[0.06] hover:text-white/50"
                  aria-label="Close sidebar"
                >
                  <PanelLeftClose className="h-[20px] w-[20px]" strokeWidth={1.5} />
                </button>
              </>
            )}
          </div>

          {/* Mode toggle */}

{!collapsed && (
  <div className="mb-3 shrink-0 px-2.5">
    <div className="flex rounded-full bg-white/[0.04] p-1">
      {(["console", "workspace"] as const).map((m) => {
        const active = mode === m;

        return (
          <button
            key={m}
            type="button"
            onClick={() => handleModeSwitch(m)}
            className={`flex-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              active
                ? "bg-white/[0.12] text-white shadow-sm"
                : "text-white/35 hover:text-white/60"
            }`}
          >
            {m === "console" ? "Console" : "Workspace"}
          </button>
        );
      })}
    </div>
  </div>
)}

          {/* Collapsed mode indicator */}
          {collapsed && (
            <div className="mb-3 flex justify-center gap-1.5">
              {(["console", "workspace"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => handleModeSwitch(m)}
                  title={m === "console" ? "Console" : "Workspace"}
                  className={`h-1.5 rounded-full transition-all ${
                    mode === m
                      ? "w-4 bg-red-400"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Workspace selector */}
          {/* Workspace section */}
{mode === "workspace" && (
  <>
    {!collapsed && (
      <div className="mb-2 px-3">
        <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">
          Workspaces
        </div>
      </div>
    )}
    <WorkspaceSelector collapsed={collapsed} />
  </>
)}

          {/* Divider */}
          <div className={`${collapsed ? "mx-3" : "mx-4"} mb-2 border-t border-white/[0.06]`} />

          {/* Navigation */}
          <nav
            className={`flex-1 overflow-y-auto overflow-x-hidden pb-4 ${
              collapsed ? "px-1.5" : "px-2.5"
            }`}
          >
            {nav.map((section, sIdx) => (
              <div key={sIdx} className={sIdx > 0 ? "mt-4" : ""}>
                {section.title && !collapsed && (
                  <div className="mb-1.5 px-2.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/20">
                    {section.title}
                  </div>
                )}

                {section.title && collapsed && (
                  <div className="mx-auto mb-2 mt-1 w-4 border-t border-white/[0.06]" />
                )}

                <div
                  className={`flex flex-col ${
                    collapsed ? "items-center gap-1" : "gap-0.5"
                  }`}
                >
                  {section.items.map((item) => (
                    <NavLink
                      key={item.href}
                      item={item}
                      isActive={isActive(item.href)}
                      collapsed={collapsed}
                    />
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer */}
          <div
            className={`shrink-0 border-t border-white/[0.06] py-3 ${
              collapsed ? "px-1 text-center" : "px-4"
            }`}
          >
            {collapsed ? (
              <span className="text-[12px] font-bold uppercase leading-tight tracking-[0.1em] text-white/90">
                OQC
              </span>
            ) : (
              <span className="text-[25px] tracking-wide text-white/90">
                OpenQCore{" "}
                <span className="font-semibold text-white/90">AI</span>
              </span>
            )}
          </div>
        </div>
      </motion.aside>

      <motion.div
        initial={false}
        animate={{ width }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="shrink-0"
      />
    </>
  );
}