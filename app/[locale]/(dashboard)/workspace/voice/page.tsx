"use client";

import { useEffect, useMemo, useState } from "react";
import {
  deleteVoiceJob,
  getDefaultVoice,
  getVoiceJobs,
  getVoiceOptions,
  getVoiceStats,
  setDefaultVoice,
  type DefaultVoice,
  type VoiceCapability,
  type VoiceItem,
  type VoiceJobStatus,
  type VoiceOption,
  type VoiceStats,
} from "../../../../lib/api/workspace/voice";
import { useWorkspace } from "../../../../context/WorkspaceContext";
import NewVoiceModal from "./NewVoiceModal";
import VoiceGrid from "./VoiceGrid";
import VoiceSettingsTab from "./VoiceSettingsTab";
import VoiceStudioTab from "./VoiceStudioTab";
import VoiceToolbar from "./VoiceToolbar";
import type { VoiceModalMode, VoiceTabId } from "./types";

export default function VoicePage() {
  const { activeWorkspace } = useWorkspace();
  const workspaceId = activeWorkspace?.id;

  const [tab, setTab] = useState<VoiceTabId>("studio");
  const [items, setItems] = useState<VoiceItem[]>([]);
  const [stats, setStats] = useState<VoiceStats | null>(null);
  const [options, setOptions] = useState<VoiceOption[]>([]);
  const [defaultTTS, setDefaultTTS] = useState<DefaultVoice | null>(null);
  const [defaultSTT, setDefaultSTT] = useState<DefaultVoice | null>(null);

  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<VoiceJobStatus | "all">("all");
  const [error, setError] = useState<string | null>(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<VoiceModalMode>("tts");

  async function refreshAll() {
    if (!workspaceId) return;

    try {
      setLoading(true);
      setError(null);

      const [
        jobsData,
        statsData,
        optionsResult,
        ttsDefaultResult,
        sttDefaultResult,
      ] = await Promise.allSettled([
        getVoiceJobs(workspaceId, 50, 0, status === "all" ? undefined : status),
        getVoiceStats(workspaceId),
        getVoiceOptions(workspaceId),
        getDefaultVoice(workspaceId, "tts"),
        getDefaultVoice(workspaceId, "stt"),
      ]);

      if (jobsData.status === "fulfilled") {
        setItems(jobsData.value.items);
      } else {
        setItems([]);
        setError("Failed to load voice jobs.");
      }

      if (statsData.status === "fulfilled") {
        setStats(statsData.value);
      } else {
        setStats(null);
      }

      if (optionsResult.status === "fulfilled") {
        setOptions(optionsResult.value);
      } else {
        setOptions([]);
      }

      if (ttsDefaultResult.status === "fulfilled") {
        setDefaultTTS(ttsDefaultResult.value);
      } else {
        setDefaultTTS(null);
      }

      if (sttDefaultResult.status === "fulfilled") {
        setDefaultSTT(sttDefaultResult.value);
      } else {
        setDefaultSTT(null);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!workspaceId) return;
    refreshAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId, status]);

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;

    return items.filter((item) =>
      [
        item.title,
        item.prompt,
        item.transcript,
        item.type,
        item.status,
        item.provider,
      ]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(q))
    );
  }, [items, search]);

  async function handleDelete(id: string) {
    if (!workspaceId) return;
    await deleteVoiceJob(workspaceId, id);
    await refreshAll();
  }

  async function handleSetDefault(
    capability: VoiceCapability,
    voiceOptionId: string
  ) {
    if (!workspaceId) return;
    await setDefaultVoice(workspaceId, capability, voiceOptionId);
    await refreshAll();
  }

  function handleOpenCreate(mode: VoiceModalMode = "tts") {
    setModalMode(mode);
    setModalOpen(true);
  }

  if (!activeWorkspace || !workspaceId) {
    return (
      <div className="min-h-screen bg-[#0b0b0f] text-white">
        <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-16 text-center">
            <h2 className="text-xl font-semibold text-white">
              No workspace selected
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Please select a workspace first to manage voice jobs.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const safeWorkspaceId = workspaceId;

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-6 px-6 py-8 lg:px-10">
        <VoiceToolbar
          search={search}
          status={status}
          stats={stats}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onCreate={() => handleOpenCreate("tts")}
        />

        <div className="inline-flex w-fit rounded-2xl border border-white/10 bg-white/5 p-1">
          <button
            onClick={() => setTab("studio")}
            className={`rounded-xl px-4 py-2 text-sm ${
              tab === "studio" ? "bg-white text-black" : "text-zinc-300"
            }`}
          >
            Studio
          </button>
          <button
            onClick={() => setTab("jobs")}
            className={`rounded-xl px-4 py-2 text-sm ${
              tab === "jobs" ? "bg-white text-black" : "text-zinc-300"
            }`}
          >
            Jobs
          </button>
          <button
            onClick={() => setTab("settings")}
            className={`rounded-xl px-4 py-2 text-sm ${
              tab === "settings" ? "bg-white text-black" : "text-zinc-300"
            }`}
          >
            Settings
          </button>
        </div>

        {error ? (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        ) : null}

        {tab === "studio" ? (
          <VoiceStudioTab
            workspaceId={safeWorkspaceId}
            refreshAll={refreshAll}
            items={filteredItems}
            stats={stats}
            options={options}
            onOpenCreate={handleOpenCreate}
            onDelete={handleDelete}
          />
        ) : null}

        {tab === "jobs" ? (
          <VoiceGrid
            workspaceId={safeWorkspaceId}
            refreshAll={refreshAll}
            items={filteredItems}
            loading={loading}
            search={search}
            status={status}
            onDelete={handleDelete}
          />
        ) : null}

        {tab === "settings" ? (
          <VoiceSettingsTab
            workspaceId={safeWorkspaceId}
            refreshAll={refreshAll}
            options={options}
            defaultTTS={defaultTTS}
            defaultSTT={defaultSTT}
            onSetDefault={handleSetDefault}
          />
        ) : null}
      </div>

      <NewVoiceModal
        open={modalOpen}
        mode={modalMode}
        workspaceId={safeWorkspaceId}
        options={options}
        defaultTTS={defaultTTS}
        defaultSTT={defaultSTT}
        onClose={() => setModalOpen(false)}
        onCreated={refreshAll}
      />
    </div>
  );
}