import type {
  VoiceItem,
  VoiceOption,
  DefaultVoice,
  VoiceStats,
  VoiceJobStatus,
  VoiceCapability,
} from "../../../../lib/api/workspace/voice";

export type VoiceTabId = "studio" | "jobs" | "settings";
export type VoiceModalMode = "tts" | "stt";

export interface VoiceFilters {
  search: string;
  status: VoiceJobStatus | "all";
}

export interface VoicePageState {
  items: VoiceItem[];
  stats: VoiceStats | null;
  options: VoiceOption[];
  defaultTTS: DefaultVoice | null;
  defaultSTT: DefaultVoice | null;
}

export interface FilteredVoiceItem extends VoiceItem {
  matchesSearch: boolean;
}

export interface VoiceTabProps {
  workspaceId: string;
  refreshAll: () => Promise<void>;
}

export interface VoiceJobsViewProps extends VoiceTabProps {
  items: VoiceItem[];
  loading?: boolean;
  search: string;
  status: VoiceJobStatus | "all";
  onDelete: (id: string) => Promise<void>;
}

export interface VoiceStudioTabProps extends VoiceTabProps {
  items: VoiceItem[];
  stats: VoiceStats | null;
  options: VoiceOption[];
  onOpenCreate: (mode?: VoiceModalMode) => void;
  onDelete: (id: string) => Promise<void>;
}

export interface VoiceSettingsTabProps extends VoiceTabProps {
  options: VoiceOption[];
  defaultTTS: DefaultVoice | null;
  defaultSTT: DefaultVoice | null;
  onSetDefault: (
    capability: VoiceCapability,
    voiceOptionId: string
  ) => Promise<void>;
}

export interface VoiceToolbarProps {
  search: string;
  status: VoiceJobStatus | "all";
  stats: VoiceStats | null;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: VoiceJobStatus | "all") => void;
  onCreate: () => void;
}

export interface NewVoiceModalProps {
  open: boolean;
  mode: VoiceModalMode;
  workspaceId: string;
  options: VoiceOption[];
  defaultTTS: DefaultVoice | null;
  defaultSTT: DefaultVoice | null;
  onClose: () => void;
  onCreated: () => Promise<void>;
}