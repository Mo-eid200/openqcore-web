"use client";

import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Mic, Volume2, Loader2 } from "lucide-react";

import * as consoleVoiceApi from "@/app/lib/api/console/voice";
import * as workspaceVoiceApi from "@/app/lib/api/workspace/voice";
import type { VoiceOption } from "@/app/lib/api/console/voice";

type Props =
  | { scopeType: "user" }
  | { scopeType: "workspace"; workspaceId: string };

function VoiceOptionCard({
  capability,
  icon: Icon,
  title,
  description,
  props,
}: {
  capability: "tts" | "stt";
  icon: React.ElementType;
  title: string;
  description: string;
  props: Props;
}) {
  const queryClient = useQueryClient();
  const isWorkspace = props.scopeType === "workspace";
  const workspaceId = isWorkspace ? (props as any).workspaceId : undefined;

  const api = isWorkspace ? workspaceVoiceApi : consoleVoiceApi;

  const optionsKey = isWorkspace
    ? ["voice-options", workspaceId, capability]
    : ["voice-options", "user", capability];

  const defaultKey = isWorkspace
    ? ["voice-default", workspaceId, capability]
    : ["voice-default", "user", capability];

  const { data: options, isLoading: loadingOptions } = useQuery({
    queryKey: optionsKey,
    queryFn: () =>
      isWorkspace
        ? (api as typeof workspaceVoiceApi).getVoiceOptions(workspaceId, capability)
        : (api as typeof consoleVoiceApi).getVoiceOptions(capability),
    staleTime: 60_000,
  });

  const { data: current, isLoading: loadingDefault } = useQuery({
    queryKey: defaultKey,
    queryFn: () =>
      isWorkspace
        ? (api as typeof workspaceVoiceApi).getDefaultVoice(workspaceId, capability)
        : (api as typeof consoleVoiceApi).getDefaultVoice(capability),
    staleTime: 30_000,
  });

  const { mutateAsync: setDefault, isPending } = useMutation({
    mutationFn: (voiceOptionId: string) =>
      isWorkspace
        ? (api as typeof workspaceVoiceApi).setDefaultVoice(workspaceId, capability, voiceOptionId)
        : (api as typeof consoleVoiceApi).setDefaultVoice(capability, voiceOptionId),
    onSuccess: (_, voiceOptionId) => {
      queryClient.setQueryData(defaultKey, (old: any) => ({
        ...old,
        id: voiceOptionId,
      }));
    },
  });

  const isLoading = loadingOptions || loadingDefault;
  const items = options ?? [];

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0f1012]/92 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.05] bg-amber-300/[0.08] text-amber-200">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="mt-0.5 text-xs text-white/40">{description}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="h-5 w-5 animate-spin text-white/30" />
        </div>
      ) : items.length === 0 ? (
        <p className="px-5 py-8 text-center text-xs text-white/40">
          No {capability === "tts" ? "voices" : "transcription models"} available yet.
        </p>
      ) : (
        <div className="divide-y divide-white/[0.05]">
          {items.map((option: VoiceOption) => {
            const isCurrent = current?.id === option.id;

            return (
              <button
                key={option.id}
                type="button"
                disabled={isPending}
                onClick={() => setDefault(option.id)}
                className={`
                  flex w-full items-center gap-3 px-5 py-3.5 text-left
                  transition-colors disabled:opacity-50
                  ${isCurrent ? "bg-amber-300/[0.06]" : "hover:bg-white/[0.03]"}
                `}
              >
                <div
                  className={`
                    flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border
                    ${isCurrent
                      ? "border-amber-300/25 bg-amber-300/[0.10] text-amber-200"
                      : "border-white/[0.06] bg-white/[0.02] text-white/30"
                    }
                  `}
                >
                  {isCurrent ? <Check className="h-4 w-4" /> : <Icon className="h-3.5 w-3.5" />}
                </div>

                <div className="min-w-0 flex-1">
                  <p className={`text-sm font-medium ${isCurrent ? "text-white" : "text-white/75"}`}>
                    {option.public_name}
                  </p>
                  {option.description && (
                    <p className="mt-0.5 truncate text-xs text-white/35">
                      {option.description}
                    </p>
                  )}
                </div>

                {option.languages.length > 0 && (
                  <span className="shrink-0 rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-0.5 text-[10px] font-mono text-white/40">
                    {option.languages.length} lang{option.languages.length !== 1 ? "s" : ""}
                  </span>
                )}

                {isCurrent && (
                  <span className="shrink-0 rounded-full border border-amber-300/20 bg-amber-300/[0.10] px-2 py-0.5 text-[10px] font-semibold text-amber-200">
                    Default
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function VoiceSettingsTab(props: Props) {
  return (
    <div className="space-y-4">
      <VoiceOptionCard
        capability="tts"
        icon={Volume2}
        title="Default Voice (Text-to-Speech)"
        description={
          props.scopeType === "workspace"
            ? "Used automatically for every voice reply in this workspace's ChatQXT sessions."
            : "Used automatically for every voice reply in your ChatQXT sessions."
        }
        props={props}
      />

      <VoiceOptionCard
        capability="stt"
        icon={Mic}
        title="Default Transcription Model"
        description="Used to transcribe spoken audio into text."
        props={props}
      />
    </div>
  );
}