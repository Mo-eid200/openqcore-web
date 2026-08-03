// app/lib/api/support/support.api.ts

import { qxtApiClient } from "../core/qxtClient";

export type SupportDepartment = "general" | "billing" | "technical" | "sales" | "security";

export interface CreateTicketPayload {
  department: SupportDepartment;
  subject: string;
  message: string;
}

export interface CreateTicketResult {
  ticket_number: string;
  status: string;
}

function extractErrorMessage(err: unknown, fallback: string): string {
  const responseData = (err as any)?.response?.data;
  const message = responseData?.error?.message;
  if (typeof message === "string" && message.trim()) return message;

  const detail = responseData?.detail;
  if (typeof detail === "string") return detail;
  if (detail?.message) return detail.message as string;

  return fallback;
}

export async function createSupportTicket(payload: CreateTicketPayload): Promise<CreateTicketResult> {
  try {
    const res = await qxtApiClient.post("/api/v1/support/tickets", payload);
    return res.data;
  } catch (err) {
    throw new Error(extractErrorMessage(err, "Couldn't submit your request. Please try again."));
  }
}