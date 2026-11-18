// app/lib/env.ts
//
// Public URLs the browser needs. Set them in .env; when one is missing, a
// development build falls back to localhost and a production build to the
// live services, so a forgotten variable can never point production users
// at http://localhost.

const isDev = process.env.NODE_ENV === "development";

const trim = (v: string) => v.replace(/\/+$/, "");

export const API_BASE_URL = trim(
  process.env.NEXT_PUBLIC_QXT_API_BASE_URL || (isDev ? "http://127.0.0.1:8000" : "https://api.openqcore.com"),
);

export const CHAT_URL = trim(
  process.env.NEXT_PUBLIC_CHAT_URL || (isDev ? "http://localhost:3001" : "https://chatqxt.com"),
);

export const FRONTEND_CALLBACK_URL =
  process.env.NEXT_PUBLIC_FRONTEND_CALLBACK_URL || "https://openqcore.com/auth/callback";
