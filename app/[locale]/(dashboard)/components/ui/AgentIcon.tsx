import { Bot, BrainCircuit, Cpu, FolderKanban, Sparkles, type LucideIcon } from "lucide-react";

// The icon an agent was given (stored as a name), rendered as a stable
// component so React keeps its state between renders.
const AGENT_ICONS: Record<string, LucideIcon> = {
  sparkles: Sparkles,
  "folder-kanban": FolderKanban,
  brain: BrainCircuit,
  bot: Bot,
  cpu: Cpu,
};

export function AgentIcon({ icon, className }: { icon?: string | null; className?: string }) {
  const Icon = (icon && AGENT_ICONS[icon]) || Cpu;
  return <Icon className={className} />;
}
