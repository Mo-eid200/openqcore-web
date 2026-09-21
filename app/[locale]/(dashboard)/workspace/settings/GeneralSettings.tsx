"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, AlertTriangle, Loader2, Check, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWorkspace } from "@/app/context/WorkspaceContext";

const cardCls = "rounded-2xl border border-white/[0.07] bg-[#0c0a06]/95 backdrop-blur-xl p-5";
const inputCls =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-red-500/50 focus:bg-white/[0.07]";
const primaryBtnCls =
  "inline-flex items-center justify-center gap-2 h-10 rounded-xl bg-red-500 px-5 text-sm font-semibold text-white transition-all hover:bg-red-400 disabled:cursor-not-allowed disabled:opacity-40";

export function GeneralSettings() {
  const router = useRouter();
  const { activeWorkspace, updateWorkspace, removeWorkspace, workspaces, switchWorkspace, switchToPersonal } = useWorkspace();
  const [deleted, setDeleted] = useState(false);
  const [deleteConfirmName, setDeleteConfirmName] = useState("");
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [name, setName] = useState(activeWorkspace?.name ?? "");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Rename/delete are admin-only server-side (both endpoints call
  // WorkspaceService.require_admin, see workspaces.py), but the page
  // itself was reachable and rendered its forms for any member
  // before this — a non-admin would only find out their action
  // failed after submitting (a 403 from the backend). This gates the
  // whole page's content on the client too, with a clear explanation
  // instead of a confusing post-submit failure.
  const isAdmin = activeWorkspace?.role === "owner" || activeWorkspace?.role === "admin";

  if (activeWorkspace && !isAdmin) {
    return (
      <div className={cardCls}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
            <ShieldAlert className="h-5 w-5 text-white/40" />
          </div>
          <div>
            <div className="text-base font-semibold text-white">You're not an admin in this workspace</div>
            <div className="mt-0.5 text-xs text-white/35">
              Only the owner or an admin of "{activeWorkspace.name}" can change its name or delete it.
              Ask a workspace admin if you need this changed.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Keep the field in sync if the active workspace changes (e.g.
  // switching workspaces while this page is open).
  useEffect(() => {
    setName(activeWorkspace?.name ?? "");
    setSuccess(false);
    setError(null);
  }, [activeWorkspace?.id]);

  const isDirty = name.trim() !== (activeWorkspace?.name ?? "").trim();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!activeWorkspace) return;

    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setError("Workspace name must be at least 2 characters.");
      return;
    }

    setError(null);
    setSuccess(false);
    setSubmitting(true);
    try {
      await updateWorkspace(activeWorkspace.id, { name: trimmed });
      setSuccess(true);
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || err?.message || "Couldn't save changes.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!activeWorkspace) return;
    if (deleteConfirmName.trim() !== activeWorkspace.name.trim()) {
      setDeleteError("Workspace name doesn't match.");
      return;
    }

    setDeleteError(null);
    setDeleting(true);
    const deletedId = activeWorkspace.id;
    try {
      await removeWorkspace(deletedId);
      setDeleted(true);

      // ✅ No hard-coded "default workspace" — none exists in this
      // system (confirmed: no is_default field anywhere in the
      // backend, and no workspace is auto-created on signup). The
      // industry-standard pattern (Slack/Notion/Linear) is simply:
      // land on another workspace if the user has one, otherwise
      // fall back to their personal space. removeWorkspace() already
      // updated the `workspaces` list by the time this resolves.
      const remaining = workspaces.filter((w) => w.id !== deletedId);

      setTimeout(async () => {
        if (remaining.length > 0) {
          await switchWorkspace(remaining[0].id);
          router.push("/workspace/overview");
        } else {
          switchToPersonal();
          router.push("/console");
        }
      }, 2500);
    } catch (err: any) {
      setDeleteError(err?.response?.data?.error?.message || err?.message || "Couldn't delete workspace.");
      setDeleting(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
    <div className={cardCls}>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
          <Building2 className="h-5 w-5 text-red-400" />
        </div>
        <div>
          <div className="text-base font-semibold text-white">General</div>
          <div className="text-xs text-white/35">Workspace name and identity</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-white/40">Workspace name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSuccess(false);
            }}
            className={inputCls}
          />
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-lg border border-red-400/25 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {error}
              </div>
            </motion.div>
          )}
          {success && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-lg border border-emerald-400/25 bg-emerald-500/10 px-3 py-2 text-xs text-emerald-300">
                Saved.
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end">
          <button type="submit" disabled={submitting || !isDirty} className={primaryBtnCls}>
            {submitting ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>

    {/* ✅ Deletion confirmation — shown for the ~2.5s redirect
        delay in handleDelete(), replacing the Danger Zone card
        entirely so the user isn't left staring at a now-defunct
        "Delete" button while the redirect resolves. */}
    {deleted && (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.04] backdrop-blur-xl p-6 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/15">
          <Check className="h-6 w-6 text-emerald-300" />
        </div>
        <div className="mt-3 text-sm font-medium text-emerald-200">Workspace deleted</div>
        <p className="mt-1 text-xs text-emerald-300/50">Redirecting you now…</p>
      </div>
    )}

    {/* ✅ Danger Zone — visually separated (red border/glow) from the
        rest of the card above, since deleting a workspace is
        irreversible. Requires the admin to type the exact workspace
        name to confirm, matching GitHub's own repo-deletion pattern
        — the strongest realistic guard against an accidental click. */}
    {!deleted && activeWorkspace && (
      <div className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] backdrop-blur-xl p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-500/25 bg-red-500/15">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <div className="text-base font-semibold text-red-200">Danger Zone</div>
            <div className="text-xs text-red-300/50">Irreversible and destructive actions</div>
          </div>
        </div>

        <div className="rounded-xl border border-red-500/15 bg-red-500/[0.04] px-4 py-3.5">
          <div className="text-sm font-medium text-white/85">
            Delete "{activeWorkspace.name}"
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-white/45">
            Are you sure you want to delete this workspace? All members, billing history,
            Q-Power balance, projects, and any other data belonging to "{activeWorkspace.name}"
            will be permanently deleted from the system. This action cannot be undone.
          </p>

          <div className="mt-4 flex max-w-sm flex-col gap-2">
            <label className="text-xs font-medium text-white/40">
              Type <span className="font-mono text-red-300">{activeWorkspace.name}</span> to confirm
            </label>
            <input
              type="text"
              value={deleteConfirmName}
              onChange={(e) => {
                setDeleteConfirmName(e.target.value);
                setDeleteError(null);
              }}
              placeholder={activeWorkspace.name}
              className={inputCls}
            />
          </div>

          {deleteError && (
            <div className="mt-3 rounded-lg border border-red-400/25 bg-red-500/10 px-3 py-2 text-xs text-red-300">
              {deleteError}
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting || deleteConfirmName.trim() !== activeWorkspace.name.trim()}
              className={primaryBtnCls}
            >
              {deleting && <Loader2 className="h-4 w-4 animate-spin" />}
              {deleting ? "Deleting…" : "Delete Workspace"}
            </button>
          </div>
        </div>
      </div>
    )}
    </div>
  );
}