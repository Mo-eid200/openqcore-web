import { useSyncExternalStore } from "react";

const noop = () => () => {};

/** false during server rendering and hydration, true in the browser after it.
 *  Used before createPortal(document.body) and other browser-only output. */
export function useMounted(): boolean {
  return useSyncExternalStore(noop, () => true, () => false);
}
