"use client";

import React from "react";
import { useDashboard } from "./context/DashboardContext";

export default function DashboardBackground() {
  const { dashboardMode } = useDashboard();
  const isConsole = dashboardMode === "console";

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* Base */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isConsole ? "bg-[#0e0e10]" : "bg-[#0d0f12]"
        }`}
      />

      {/* Very subtle mode tint */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isConsole
            ? "bg-[radial-gradient(circle_at_top_right,rgba(255,200,120,0.035),transparent_30%)]"
            : "bg-[radial-gradient(circle_at_top_right,rgba(140,170,255,0.035),transparent_30%)]"
        }`}
      />

      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isConsole
            ? "bg-[radial-gradient(circle_at_bottom_left,rgba(255,170,90,0.025),transparent_26%)]"
            : "bg-[radial-gradient(circle_at_bottom_left,rgba(120,180,255,0.025),transparent_26%)]"
        }`}
      />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "72px 72px",
        }}
      />

      {/* Soft top fade */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.025),transparent_16%)]" />

      {/* Edge vignette */}
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          isConsole
            ? "bg-[radial-gradient(circle_at_center,transparent_42%,rgba(14,14,16,0.32)_78%,#0e0e10_100%)]"
            : "bg-[radial-gradient(circle_at_center,transparent_42%,rgba(13,15,18,0.34)_78%,#0d0f12_100%)]"
        }`}
      />
    </div>
  );
}