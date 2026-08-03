"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { getStoredToken } from "../../lib/api/core/qxtClient";
import dynamic from "next/dynamic";

const AuthModal = dynamic(() => import("../(marketing)/components/AuthModal"), {
  ssr: false
});

function SecurityCheckScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#060818]">
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-[#d4af37]/10 blur-xl" />
          <div className="absolute inset-0 animate-ping rounded-full border border-[#d4af37]/30" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-[#d4af37]/25 bg-[#0b1222]">
            <ShieldCheck className="h-6 w-6 text-[#d4af37]" strokeWidth={1.75} />
          </div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-medium text-white/70">Verifying your session</p>
          <p className="text-xs text-white/30">Securing your workspace access</p>
        </div>

        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-[#d4af37]/60"
              style={{
                animation: "pulse-dot 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.15}s`
              }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-dot {
          0%, 80%, 100% { opacity: 0.25; transform: scale(0.85); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function DashboardAuthGuard({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const token = getStoredToken();
      setAuthenticated(!!token);
      setChecked(true);
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  if (!checked) {
    return <SecurityCheckScreen />;
  }

  if (!authenticated) {
    return (
      <>
        <SecurityCheckScreen />
        <AuthModal
          open={true}
          onClose={() => {
            const token = getStoredToken();
            if (token) {
              setAuthenticated(true);
            } else {
              window.location.href = "/";
            }
          }}
          onSuccess={() => {
            setAuthenticated(!!getStoredToken());
          }}
        />
      </>
    );
  }

  return <>{children}</>;
}

export default DashboardAuthGuard;