// components/activity/types.ts

export type Activity = {
  id:          string;
  type:        "agent" | "api" | "system";
  title:       string;
  description: string;
  time:        string;        // ← للعرض (formatted)
  timestamp:   string;        // ← الـ raw date من الـ API
  status:      "success" | "info" | "danger";
};