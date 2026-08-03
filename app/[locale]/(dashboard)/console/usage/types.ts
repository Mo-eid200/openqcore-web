export interface UsageStat {
  date:        string;
  completions: number;
  images:      number;
  voice:       number;
  agents:      number;
  tokens_in:   number;
  tokens_out:  number;
}

export interface CategoryStat {
  category: string;
  count:    number;
  tokens:   number;
}