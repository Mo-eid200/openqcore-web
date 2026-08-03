"use client";

import { usePathname } from "next/navigation";

export default function DashboardFooter() {
  const pathname = usePathname();

  const isWorkspace = pathname?.includes("/workspace");
  const label = isWorkspace ? "Organization Workspace" : "Personal Dashboard";

  return (
    <footer className="mt-10 pt-2">
      <div className="inline-flex items-center rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-[11px] font-medium tracking-wide text-white/30">
        {label}
      </div>
    </footer>
  );
}