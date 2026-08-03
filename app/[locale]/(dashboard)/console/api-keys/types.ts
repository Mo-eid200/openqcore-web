export interface ApiKey {
  id:         number; 
  key:        string;
  name:       string | null;
  active:     boolean;
  created_at: string;
  // frontend-only (for newly created keys)
  raw_key?:   string;
}