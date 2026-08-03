"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, Check, ChevronDown, Plus } from "lucide-react";

import { useWorkspace } from "../../../../context/WorkspaceContext";
import { useRouter }    from "@/i18n/navigation";
import { CreateWorkspaceModal } from "../../../(marketing)/components/CreateWorkspaceModal";

export default function WorkspaceSwitcher() {
  const router = useRouter();
  const {
    activeWorkspace,
    workspaces,
    switchWorkspace,
    refreshWorkspaces,
    createWorkspace,
  } = useWorkspace();

  const [open,       setOpen]       = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* CLOSE ON OUTSIDE CLICK */
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [open]);

  /* CLOSE ON ESC */
  useEffect(() => {
    if (!open) return;
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  async function handleSelect(workspaceId: string) {
    setOpen(false);
    if (workspaceId === activeWorkspace?.id) return;
    await switchWorkspace(workspaceId);
    await refreshWorkspaces();
    router.replace("/workspace/overview");
  }

  async function handleCreate(name: string) {
    const newWorkspace = await createWorkspace({ name });
    await switchWorkspace(newWorkspace.id);
    await refreshWorkspaces();
    setCreateOpen(false);
    setOpen(false);
    router.replace("/workspace/overview");
  }

  // ── لو مفيش workspaces — زرار Create فقط ────────────────────────
  if (workspaces.length === 0) {
    return (
      <div className="px-3 pt-3">
        <button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="w-full flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 text-left transition-colors hover:bg-white/[0.05]"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-white/60">
            <Plus className="h-3.5 w-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium text-white/60">Create workspace</div>
            <div className="text-[11px] text-white/30">No workspaces yet</div>
          </div>
        </button>

        <CreateWorkspaceModal
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          onCreate={handleCreate}
        />
      </div>
    );
  }

  // ── في workspaces — trigger + dropdown ───────────────────────────
  return (
    <div ref={containerRef} className="relative px-3 pt-3">

      {/* TRIGGER */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.03] px-3 py-2.5 text-left transition-colors hover:bg-white/[0.05]"
      >
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-white/60">
          <Building2 className="h-3.5 w-3.5" />
        </div>

        <div className="flex-1 min-w-0">
          {activeWorkspace ? (
            <>
              <div className="truncate text-[13px] font-medium text-white">{activeWorkspace.name}</div>
              <div className="truncate text-[11px] text-white/35">{activeWorkspace.plan}</div>
            </>
          ) : (
            <>
              <div className="text-[13px] font-medium text-white/60">Select workspace</div>
              <div className="text-[11px] text-white/30">{workspaces.length} available</div>
            </>
          )}
        </div>

        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.18 }}>
          <ChevronDown className="h-3.5 w-3.5 text-white/35" />
        </motion.div>
      </button>

      {/* DROPDOWN */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-3 right-3 top-[calc(100%+6px)] z-50 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d10]/98 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="max-h-[280px] overflow-y-auto p-1.5">
              {workspaces.map((ws) => {
                const isActive = ws.id === activeWorkspace?.id;
                return (
                  <button
                    type="button"
                    key={ws.id}
                    onClick={() => handleSelect(ws.id)}
                    className={`w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors ${
                      isActive ? "bg-red-500/[0.08]" : "hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                      isActive ? "bg-red-500/15 text-red-300" : "bg-white/[0.06] text-white/50"
                    }`}>
                      <Building2 className="h-3.5 w-3.5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className={`truncate text-[13px] font-medium ${isActive ? "text-white" : "text-white/80"}`}>
                        {ws.name}
                      </div>
                      <div className="truncate text-[11px] text-white/35">
                        {ws.plan} · {ws.members_count ?? 1} member{(ws.members_count ?? 1) !== 1 ? "s" : ""}
                      </div>
                    </div>

                    {isActive && <Check className="h-4 w-4 shrink-0 text-red-400" />}
                  </button>
                );
              })}
            </div>

            <div className="border-t border-white/[0.06] p-1.5">
              <button
                type="button"
                onClick={() => { setOpen(false); setCreateOpen(true); }}
                className="w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-[13px] font-medium text-red-300 transition-colors hover:bg-red-500/[0.08] hover:text-red-200"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-500/10">
                  <Plus className="h-3.5 w-3.5" />
                </div>
                Create new workspace
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CreateWorkspaceModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreate}
      />
    </div>
  );
}