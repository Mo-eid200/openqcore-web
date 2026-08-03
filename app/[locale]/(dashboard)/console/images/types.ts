export interface ImageItem {
  id:          string;
  prompt:      string;
  status:      string;  // pending | processing | completed | failed
  provider:    string | null;
  size:        string | null;
  steps:       number | null;
  guidance:    number | null;
  seed:        number | null;
  num_outputs: number;
  output_url:  string | null;
  error:       string | null;
  created_at:  string;
}