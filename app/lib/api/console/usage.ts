import { qxtApiClient } from "../core/qxtClient";

export interface DailyStat {
  date:        string;
  completions: number;
  images:      number;
  voice:       number;
  tokens_in:   number;
  tokens_out:  number;
}

export interface CategoryStat {
  category: string;
  count:    number;
  tokens:   number;
}

export interface UsageSummary {
  total_requests:   number;
  total_tokens_in:  number;
  total_tokens_out: number;
  total_images:     number;
  total_voice:      number;
  total_agents:     number;
  avg_latency_ms:   number;
  daily:            DailyStat[];
  by_category:      CategoryStat[];
}

export async function getUsageStats(days = 7): Promise<UsageSummary> {
  const { data } = await qxtApiClient.get("/api/v1/console/usage", {
    params: { days },
  });
  return data;
}