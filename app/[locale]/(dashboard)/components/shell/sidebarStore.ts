// Sidebar open/collapsed state, kept in localStorage and shared by the
// sidebar and the top bar (and other tabs) through useSyncExternalStore.

import { useSyncExternalStore } from "react";

export const SIDEBAR_STORAGE_KEY = "oqc_sidebar_open";
export const SIDEBAR_EVENT = "oqc-sidebar-toggle";
export const SIDEBAR_OPEN_WIDTH = 240;
export const SIDEBAR_COLLAPSED_WIDTH = 60;

function read(): boolean {
  try {
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) !== "false";
  } catch {
    return true;
  }
}

function subscribe(onChange: () => void): () => void {
  const onStorage = (e: StorageEvent) => {
    if (e.key === SIDEBAR_STORAGE_KEY) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(SIDEBAR_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(SIDEBAR_EVENT, onChange);
  };
}

export function setSidebarOpen(value: boolean): void {
  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(value));
  } catch {
    /* storage unavailable: the event still updates this tab */
  }
  window.dispatchEvent(new CustomEvent(SIDEBAR_EVENT, { detail: value }));
}

/** true while the server renders (the sidebar starts open). */
export function useSidebarOpen(): boolean {
  return useSyncExternalStore(subscribe, read, () => true);
}
