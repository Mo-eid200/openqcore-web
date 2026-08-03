"use client";

import React, {
  createContext, useCallback, useContext,
  useEffect, useMemo, useState,
} from "react";
import { fetchChatModels } from "../lib/api/chat/models";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProductKey = "core" | "chat" | "code" | "research" | "vision" | "library";

export type PublicModelItem = {
  object?:         string;
  id:              string;
  public_name:     string;
  product_key:     string;
  type:            string;
  gen:             number;
  status?:         string;
  is_visible?:     boolean;
  provider?:       string;
  backend_model?:  string;
  context_window?: number | null;
  description?:    string | null;
  config?:         Record<string, any>;
};

export type SelectedModel = { id: string; gen: number };

type ModelsState = {
  loading:         boolean;
  error:           string | null;
  models:          PublicModelItem[];
  modelsByProduct: Record<ProductKey, PublicModelItem[]>;
  selected:        SelectedModel | null;
  selectModel:     (id: string, gen?: number) => void;
  setGen:          (gen: number) => void;
  refresh:         () => Promise<void>;
  label:           string;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const LS_KEY = "qxt_selected_model_v1";

const EMPTY_BY_PRODUCT: Record<ProductKey, PublicModelItem[]> = {
  core: [], chat: [], code: [], research: [], vision: [], library: [],
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mapProductKey(backendKey: string): ProductKey | null {
  if (backendKey === "pulse") return "chat";
  if (["core", "code", "research", "vision", "library"].includes(backendKey)) {
    return backendKey as ProductKey;
  }
  return null;
}

function clampGen(gen: number): number {
  return Math.max(1, Math.min(3, gen));
}

function safeParse<T>(s: string | null): T | null {
  if (!s) return null;
  try { return JSON.parse(s) as T; } catch { return null; }
}

function loadSavedSelection(productKey: ProductKey): SelectedModel | null {
  if (typeof window === "undefined") return null;
  const all = safeParse<Record<string, SelectedModel>>(localStorage.getItem(LS_KEY));
  const v   = all?.[productKey];
  if (!v?.id) return null;
  return { id: String(v.id), gen: clampGen(Number(v.gen ?? 1)) };
}

function saveSelection(productKey: ProductKey, sel: SelectedModel | null): void {
  if (typeof window === "undefined") return;
  const all = safeParse<Record<string, SelectedModel>>(localStorage.getItem(LS_KEY)) || {};
  if (!sel) {
    delete all[productKey];
  } else {
    all[productKey] = { id: String(sel.id), gen: clampGen(Number(sel.gen ?? 1)) };
  }
  localStorage.setItem(LS_KEY, JSON.stringify(all));
}

// ─── Context ──────────────────────────────────────────────────────────────────

const Ctx = createContext<ModelsState | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ModelsProvider({
  children,
  productKey = "chat",
}: {
  children:    React.ReactNode;
  productKey?: ProductKey;
}): React.ReactElement {
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState<string | null>(null);
  const [models,   setModels]   = useState<PublicModelItem[]>([]);
  const [selected, setSelected] = useState<SelectedModel | null>({ id: "pulse-core", gen: 1 });

  // ── modelsByProduct ────────────────────────────────────────────────────────

  const modelsByProduct = useMemo<Record<ProductKey, PublicModelItem[]>>(() => {
    const out = { ...EMPTY_BY_PRODUCT } as Record<ProductKey, PublicModelItem[]>;
    for (const m of models) {
      const key = mapProductKey(m.product_key);
      if (key) out[key] = [...(out[key] || []), m];
    }
    (Object.keys(out) as ProductKey[]).forEach((k) => {
      out[k] = out[k].slice().sort((a, b) => a.public_name.localeCompare(b.public_name));
    });
    return out;
  }, [models]);

  // ── selectModel ───────────────────────────────────────────────────────────

  const selectModel = useCallback((id: string, gen?: number): void => {
    const m = models.find((x) => x.id === id);
    if (!m) return;
    const sel: SelectedModel = { id: m.id, gen: clampGen(typeof gen === "number" ? gen : m.gen ?? 1) };
    setSelected(sel);
    saveSelection(productKey, sel);
  }, [models, productKey]);

  // ── setGen ────────────────────────────────────────────────────────────────

  const setGen = useCallback((gen: number): void => {
    if (productKey === "chat") return;
    setSelected((prev) => {
      if (!prev) return prev;
      const next = { ...prev, gen: clampGen(gen) };
      saveSelection(productKey, next);
      return next;
    });
  }, [productKey]);

  // ── label ─────────────────────────────────────────────────────────────────

  const label = useMemo<string>(() => {
    if (!selected) return "Select Model";
    const m    = models.find((x) => x.id === selected.id);
    const name = m?.public_name || (selected.id === "pulse-core" ? "Core" : selected.id);
    return `${name} G${selected.gen}`;
  }, [selected, models]);

  // ── refresh ───────────────────────────────────────────────────────────────

  const refresh = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const backendKey    = productKey === "chat" ? "pulse" : productKey;
      const fetchedModels = await fetchChatModels(backendKey, false);

      if (!fetchedModels.length) {
        setModels([]);
        setError(`No models available for ${productKey}`);
        return;
      }

      const mapped: PublicModelItem[] = fetchedModels.map((m: any) => ({
        object:         m.object || "model",
        id:             m.id,
        public_name:    m.public_name,
        product_key:    m.product_key,
        type:           m.type,
        gen:            Number(m.gen ?? 1),
        status:         m.status,
        is_visible:     m.is_visible,
        provider:       m.provider       || "unknown",
        backend_model:  m.backend_model  || "unknown",
        context_window: m.context_window,
        description:    m.description,
        config:         m.config,
      }));

      setModels(mapped);

      setSelected((current) => {
        // 1. Keep current if still valid
        if (current && mapped.find((m) => m.id === current.id)) return current;

        // 2. pulse-core
        const pulseCore = mapped.find((m) => m.id === "pulse-core");
        if (pulseCore) {
          const sel = { id: pulseCore.id, gen: pulseCore.gen ?? 1 };
          saveSelection(productKey, sel);
          return sel;
        }

        // 3. localStorage
        const saved = loadSavedSelection(productKey);
        if (saved && mapped.find((m) => m.id === saved.id)) {
          saveSelection(productKey, saved);
          return saved;
        }

        // 4. First available
        if (mapped.length > 0) {
          const first = { id: mapped[0].id, gen: clampGen(mapped[0].gen ?? 1) };
          saveSelection(productKey, first);
          return first;
        }

        return current;
      });

    } catch (err: any) {
      if (err?.name === "AbortError") return;
      const msg = err?.message || "Failed to load models";
      if (!msg.includes("404")) setError(msg);
    } finally {
      setLoading(false);
    }
  }, [productKey]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // ── value ─────────────────────────────────────────────────────────────────

  const value = useMemo<ModelsState>(() => ({
    loading, error, models, modelsByProduct,
    selected, selectModel, setGen, refresh, label,
  }), [loading, error, models, modelsByProduct, selected, selectModel, setGen, refresh, label]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useModels(): ModelsState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useModels() must be used within <ModelsProvider />");
  return v;
}