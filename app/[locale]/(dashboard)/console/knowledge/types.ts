export interface KnowledgeItem {
  id:          string;
  title:       string;
  type:        "pdf" | "doc" | "url" | "snippet" | "faq";
  status:      "pending" | "processing" | "processed" | "failed";
  description: string | null;
  file_url:    string | null;
  file_size:   number | null;
  mime_type:   string | null;
  tags:        string[];
  doc_id:      string | null;
  error_msg:   string | null;
  created_at:  string;
  updated_at:  string;
}