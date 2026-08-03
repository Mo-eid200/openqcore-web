import React, { useState } from "react";
import { Loader2, X } from "lucide-react";

export function CreateProjectModal({
  open,
  onClose,
  onCreate,
  loading = false,
}: {
  open:     boolean;
  onClose:  () => void;
  onCreate: (args: { name: string; description: string }) => Promise<void>;
  loading?: boolean;
}) {
  const [name,        setName]        = useState("");
  const [description, setDescription] = useState("");

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onCreate({ name, description });
    setName("");
    setDescription("");
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="
          w-full max-w-md
          rounded-2xl border border-white/[0.08]
          bg-[#0d0d10]/98 backdrop-blur-2xl
          shadow-[0_40px_120px_rgba(0,0,0,0.6)]
          overflow-hidden
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <span className="text-[15px] font-semibold text-white">New Project</span>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-white/40 uppercase tracking-wider">
              Project Name
            </label>
            <input
              placeholder="e.g. Voice Infrastructure"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              className="
                w-full h-10 px-3 rounded-xl
                border border-white/[0.08] bg-white/[0.04]
                text-[14px] text-white placeholder:text-white/25
                outline-none transition-all
                focus:border-red-400/40 focus:ring-2 focus:ring-red-400/10
              "
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-white/40 uppercase tracking-wider">
              Description <span className="normal-case text-white/20">(optional)</span>
            </label>
            <textarea
              placeholder="What is this project about?"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={3}
              className="
                w-full px-3 py-2.5 rounded-xl
                border border-white/[0.08] bg-white/[0.04]
                text-[14px] text-white placeholder:text-white/25
                outline-none transition-all resize-none
                focus:border-amber-400/40 focus:ring-2 focus:ring-amber-400/10
              "
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                h-9 px-4 rounded-xl text-xs font-medium
                border border-white/[0.08] bg-transparent
                text-white/50 hover:text-white hover:bg-white/[0.04]
                transition-all disabled:opacity-40
              "
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !name.trim()}
              className="
                h-9 px-5 rounded-xl text-xs font-semibold
                bg-red-400 text-black
                hover:bg-red-300 transition-all
                disabled:opacity-40 disabled:cursor-not-allowed
                flex items-center gap-2
              "
            >
              {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {loading ? "Creating..." : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}