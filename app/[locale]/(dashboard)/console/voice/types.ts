export interface VoiceItem {
  id:         string;
  title:      string | null;
  prompt:     string | null;
  type:       string;
  status:     string;
  url:        string | null;
  transcript: string | null;
  duration:   number | null;
  provider:   string | null;
  error:      string | null;
  created_at: string;
}