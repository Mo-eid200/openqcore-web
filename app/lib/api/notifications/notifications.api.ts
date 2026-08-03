// app/lib/api/notifications/notifications.api.ts

import { qxtAuthClient } from "../core/qxtClient";

export interface Notification {
  id: number;
  category: string;
  type: string;
  title: string;
  body: string | null;
  link: string | null;
  is_read: boolean;
  created_at: string;
}

export interface UnreadCount {
  count: number;
}

export async function getNotifications(params?: {
  limit?: number;
  offset?: number;
  unread_only?: boolean;
}): Promise<Notification[]> {
  const res = await qxtAuthClient.get("/api/v1/notifications", { params });
  return res.data;
}

export async function getUnreadCount(): Promise<UnreadCount> {
  const res = await qxtAuthClient.get("/api/v1/notifications/unread-count");
  return res.data;
}

export async function markAsRead(notificationId: number): Promise<void> {
  await qxtAuthClient.post(`/api/v1/notifications/${notificationId}/read`);
}

export async function markAllAsRead(): Promise<void> {
  await qxtAuthClient.post("/api/v1/notifications/read-all");
}