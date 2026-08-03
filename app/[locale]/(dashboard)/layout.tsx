"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import DashboardAuthGuard from "./DashboardAuthGuard";

import DashboardBackground from "./components/shell/DashboardBackground";
import DashboardHeader     from "./components/shell/DashboardTopbar";
import DashboardSidebar    from "./components/shell/DashboardSidebar";
import DashboardFooter     from "./components/shell/DashboardFooter";
import { useDashboard }    from "./components/shell/context/DashboardContext";

// ─── Page Transition (CSS only - no unmount) ──────────────────────────────────

function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setVisible(false);
    const t = requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
    return () => cancelAnimationFrame(t);
  }, [pathname]);

  return (
    <div
      className={`
        min-h-full
        transition-all duration-200 ease-out
        ${visible
          ? "opacity-100 translate-y-0 blur-0"
          : "opacity-0 translate-y-2 blur-[2px]"
        }
      `}
    >
      {children}
    </div>
  );
}

// ─── Shell ────────────────────────────────────────────────────────────────────

function DashboardShell({ children }: { children: React.ReactNode }) {
  const { dashboardMode } = useDashboard();
  const isConsole = dashboardMode === "console";

  return (
    <div className={`
      relative h-screen overflow-hidden text-white
      transition-colors duration-500
      ${isConsole ? "bg-[#0b0703]" : "bg-[#060818]"}
    `}>
      <DashboardBackground />

      {/* Glow */}
      {isConsole ? (
        <>
          <div className="pointer-events-none absolute top-[-240px] right-[-140px] w-[640px] h-[640px] rounded-full bg-amber-500/[0.08] blur-[140px]" />
          <div className="pointer-events-none absolute bottom-[-260px] left-[-180px] w-[520px] h-[520px] rounded-full bg-orange-500/[0.07] blur-[140px]" />
        </>
      ) : (
        <>
          <div className="pointer-events-none absolute top-[-260px] right-[-180px] w-[620px] h-[620px] rounded-full bg-cyan-500/[0.07] blur-[140px]" />
          <div className="pointer-events-none absolute bottom-[-240px] left-[-160px] w-[520px] h-[520px] rounded-full bg-blue-500/[0.06] blur-[140px]" />
        </>
      )}

      <div className="relative flex flex-col h-full">
        <DashboardHeader />

        <div className="flex flex-1 min-h-0 overflow-hidden">
          <DashboardSidebar />

          <main className="flex-1 min-w-0 min-h-0 overflow-y-auto overflow-x-hidden">
            <div className="mx-auto w-full max-w-[1700px] px-6 lg:px-8 pt-10 pb-6">
              {/* ✅ CSS transition - مفيش unmount */}
              <PageTransition>
                {children}
                <DashboardFooter />
              </PageTransition>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardAuthGuard>
      <DashboardShell>
        {children}
      </DashboardShell>
    </DashboardAuthGuard>
  );
}

