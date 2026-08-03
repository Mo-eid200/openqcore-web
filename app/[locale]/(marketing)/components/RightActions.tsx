"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "../../../context/AuthContext";
import { useWorkspace } from "../../../context/WorkspaceContext";
import { getSubscription, type Subscription } from "@/app/lib/api/console/billing";

import AuthModal from "./AuthModal";
import { CreateWorkspaceModal } from "./CreateWorkspaceModal";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { DASHBOARD_ROUTES } from "../../../lib/constants/routes";

type ArrowDownIconProps = {
  className?: string;
};

type QuickLinkProps = {
  id: string;
  href: string;
  title: string;
  description: string;
  hover: string;
};

const ArrowDownIcon = ({ className }: ArrowDownIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.8}
    stroke="currentColor"
    className={`w-3.5 h-3.5 ${className || ""}`}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25L12 15.75 4.5 8.25" />
  </svg>
);

function QuickLink({
  href,
  title,
  description,
  hover,
}: QuickLinkProps) {
  const t = useTranslations("right_actions");

  return (
    <Link
      href={href}
      className={`group/qxt rounded-2xl px-4 py-3 transition-all duration-200 ${hover}`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <div className="text-[14px] font-medium text-white">{title}</div>

          <div className="flex items-center gap-1 text-[12px] text-slate-500 group-hover/qxt:text-white transition-colors">
            <span>{t("open")}</span>
            <span className="transition-transform duration-200 group-hover/qxt:-translate-y-0.5 group-hover/qxt:translate-x-0.5">
              ↗
            </span>
          </div>
        </div>

        <div className="mt-0.5 text-[12px] text-slate-400">{description}</div>
      </div>
    </Link>
  );
}

export default function RightActions() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { activeWorkspace, workspaces, switchWorkspace, refreshWorkspaces, createWorkspace } = useWorkspace();
  const t = useTranslations("right_actions");

  const [authOpen, setAuthOpen] = useState(false);
  const [createWsOpen, setCreateWsOpen] = useState(false);

  const [personalSub, setPersonalSub] = useState<Subscription | null>(null);

  const loadPersonalSubscription = useCallback(async () => {
    if (!user) {
      setPersonalSub(null);
      return;
    }
    try {
      const sub = await getSubscription("user");
      setPersonalSub(sub);
    } catch (err) {
      console.error("[RightActions] Failed loading personal subscription", err);
    }
  }, [user]);

  useEffect(() => {
    loadPersonalSubscription();
  }, [loadPersonalSubscription]);

  const personalPlanName = personalSub?.plan_name || "Free";

  const workspacePlan = activeWorkspace?.plan || "";
  const hasWorkspaceSubscription = !!activeWorkspace && activeWorkspace.plan !== "Free Plan";

  // 🔧 NOTE: "chat" and "pricing" still use href: "#" as placeholders
  // — each has its own unique `id` already, which is what the fix
  // below uses for the React key. Worth swapping these to real
  // routes (e.g. the ChatQXT app URL, and a real /pricing page) when
  // they're ready, same as "api" and "docs" already are.
  const getStartedLinks: QuickLinkProps[] = [
    {
      id: "chat",
      href: "#",
      title: "ChatQXT",
      description: t("quick_links.chat_desc"),
      hover: "hover:bg-[#00ffbf]/[0.04]",
    },
    {
      id: "api",
      href: "/docs/api",
      title: t("quick_links.api_title"),
      description: t("quick_links.api_desc"),
      hover: "hover:bg-[#4f8cff]/[0.04]",
    },
    {
      id: "docs",
      href: "/docs",
      title: t("quick_links.docs_title"),
      description: t("quick_links.docs_desc"),
      hover: "hover:bg-[#ff9d00]/[0.04]",
    },
    {
      id: "pricing",
      href: "#",
      title: t("quick_links.pricing_title"),
      description: t("quick_links.pricing_desc"),
      hover: "hover:bg-[#b26cff]/[0.04]",
    },
  ];

  // 🔥 FIX: this used to open an UpgradeModal that guessed a default
  // workspace name and applied a plan in one step. Per the agreed
  // design, "create" and "upgrade" are now two completely separate
  // flows: this just creates the workspace (Free plan, 1 seat,
  // handled server-side), then navigates into it. Upgrading happens
  // later, from that workspace's own /workspace/billing page.
  const handleCreateWorkspace = useCallback(
    async (name: string) => {
      const newWorkspace = await createWorkspace({ name });
      await refreshWorkspaces();
      await switchWorkspace(newWorkspace.id);
      setCreateWsOpen(false);
      router.replace("/workspace/overview");
    },
    [createWorkspace, refreshWorkspaces, switchWorkspace, router]
  );

  return (
    <>
      <div className="flex items-center gap-4 shrink-0">
        {/* ACCOUNT */}
        <div className="hidden sm:block">
          {!user ? (
            <div className="group">
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                className="h-10 px-4 rounded-xl border border-white/10 bg-white/[0.03] text-[13px] font-medium text-slate-300 flex items-center gap-2 transition-all duration-200 hover:bg-white/[0.06] hover:text-white hover:border-white/20"
              >
                <span>{t("workspace")}</span>
                <span className="text-slate-500 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                  ↗
                </span>
              </button>

              <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
            </div>
          ) : (
            <div className="relative group">
              <button
                type="button"
                className="h-10 pl-2 pr-3 rounded-xl border border-white/10 bg-white/[0.04] flex items-center gap-2 transition-all duration-200 hover:bg-white/[0.06] hover:border-white/20"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8b6b16] flex items-center justify-center text-[11px] font-semibold text-black">
                  {(user.full_name?.charAt(0) || "U").toUpperCase()}
                </div>

                <div className="flex flex-col items-start leading-none">
                  <span className="text-[12px] text-white font-medium max-w-[120px] truncate">
                    {user.full_name || user.email?.split("@")[0]}
                  </span>
                  <div className="mt-0.5 text-[10px] text-slate-500">
                    {t("personal_plan_line", { plan: personalPlanName })}
                  </div>
                </div>

                <ArrowDownIcon className="text-slate-500 ml-1" />
              </button>

              <div className="invisible opacity-0 translate-y-3 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute right-0 top-[calc(100%+8px)] pt-3 w-[340px] rounded-3xl border border-white/10 bg-[#0b1020]/95 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.65)] overflow-hidden z-50 transition-all duration-300">
                <div className="px-4 py-4 border-b border-white/10">
                  <div className="text-white text-[14px] font-medium">{user.full_name || user.email}</div>
                  <div className="mt-1 text-[12px] text-slate-400">
                    {t("personal_plan_line", { plan: personalPlanName })}
                  </div>

                  {hasWorkspaceSubscription ? (
                    <div className="mt-1 text-[12px] text-[#d4af37]">
                      {t("workspace_plan_line", { plan: workspacePlan })}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCreateWsOpen(true)}
                      className="mt-1 text-[12px] text-[#d4af37] hover:text-[#f5d97b] transition-colors"
                    >
                      {t("create_workspace_cta")}
                    </button>
                  )}
                </div>

                <div className="p-2 border-b border-white/10">
                  <Link
                    href={DASHBOARD_ROUTES.console}
                    onClick={(e) => e.preventDefault()}
                    aria-disabled="true"
                    className="flex items-center justify-between rounded-2xl px-3 py-3 text-[13px] text-slate-300 transition-all duration-200 hover:bg-white/[0.04] hover:text-white"
                  >
                    <span>{t("console_dashboard")}</span>
                    <span>↗</span>
                  </Link>

                  {hasWorkspaceSubscription && (
                    <button
                      type="button"
                      onClick={async () => {
                        // if (!workspaces.length) return;
                        // await switchWorkspace(workspaces[0].id);
                        // router.push(DASHBOARD_ROUTES.workspace);
                      }}
                      className="w-full flex items-center justify-between rounded-2xl px-3 py-3 text-[13px] text-slate-300 transition-all duration-200 hover:bg-white/[0.04] hover:text-white"
                    >
                      <span>{t("manage_workspace")}</span>
                      <span>↗</span>
                    </button>
                  )}
                </div>

                {/* 🔥 Workspaces list — always shown when the user has
                    at least one, regardless of plan, plus a "+ New"
                    row so creating an additional workspace doesn't
                    require leaving this menu. */}
                {workspaces.length > 0 && (
                  <div className="border-b border-white/10 p-2">
                    <div className="px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-slate-500">
                      {t("workspaces_label")}
                    </div>

                    {workspaces.map((workspace) => (
                      <button
                        key={workspace.id}
                        type="button"
                        onClick={async () => {
                          //await switchWorkspace(workspace.id);
                          //router.replace("/workspace/overview");
                        }}
                        className="w-full flex items-center justify-between rounded-2xl px-3 py-3 text-[13px] text-slate-300 transition-all duration-200 hover:bg-white/[0.04] hover:text-white"
                      >
                        <div className="flex flex-col items-start">
                          <span className="text-white font-medium">{workspace.name}</span>
                          <span className="text-[11px] text-slate-500">{workspace.plan}</span>
                        </div>

                        {workspace.id === activeWorkspace?.id ? (
                          <span className="text-[#d4af37] text-[11px] font-medium">{t("active")}</span>
                        ) : (
                          <span className="text-slate-600">›</span>
                        )}
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => setCreateWsOpen(true)}
                      className="w-full flex items-center gap-2 rounded-2xl px-3 py-3 text-[13px] text-[#d4af37] transition-all duration-200 hover:bg-white/[0.04] hover:text-[#f5d97b]"
                    >
                      <span>{t("new_workspace")}</span>
                    </button>
                  </div>
                )}

                <div className="p-2">
                  <button
                    type="button"
                    onClick={logout}
                    className="w-full rounded-2xl px-3 py-3 text-left text-[13px] text-red-400 transition-all duration-200 hover:bg-red-500/10"
                  >
                    {t("logout")}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* GET STARTED */}
        <div className="relative group">
          <Link
            href="#"
            className="h-10 px-4 rounded-xl border border-[#d4af37]/20 bg-[#d4af37]/10 text-[13px] font-medium text-white flex items-center gap-2 transition-all duration-200 hover:bg-[#d4af37]/15 hover:border-[#d4af37]/35"
          >
            {t("get_started")}
            <ArrowDownIcon />
          </Link>

          <div className="invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 absolute right-0 top-[calc(100%+14px)] w-[250px] rounded-3xl border border-white/10 bg-[#07111d]/95 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.75)] overflow-hidden z-50 transition-all duration-300">
            <div className="px-4 pt-4 pb-2">
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-semibold">
                {t("qxt_products")}
              </div>
            </div>

            <div className="p-2 pt-1 flex flex-col">
              {getStartedLinks.map((item) => (
                <QuickLink key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CREATE WORKSPACE — name only, Free plan, then navigates to
          /workspace/overview. No plan selection happens here at all;
          upgrading is a separate step from inside the workspace's
          own billing page. */}
      <CreateWorkspaceModal
        open={createWsOpen}
        onClose={() => setCreateWsOpen(false)}
        onCreate={handleCreateWorkspace}
      />
    </>
  );
}