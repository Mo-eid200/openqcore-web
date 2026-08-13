export interface GenerationItem {
  id:          string;
  title:       string | null;
  prompt:      string;
  result:      string | null;
  model:       string | null;
  sequence:    number;
  temperature: number | null;
  status:      "pending" | "success" | "failed";
  tokens_used: number | null;
  error_msg:   string | null;
  created_at:  string;
  updated_at:  string;
}