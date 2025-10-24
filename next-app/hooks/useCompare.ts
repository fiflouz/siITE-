"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const MAX_ITEMS = 4;
const STORAGE_KEY = "pc-builder-compare";

export function useCompare() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setSelectedIds(parsed.slice(0, MAX_ITEMS));
        }
      } catch (error) {
        console.warn("Failed to parse compare list", error);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
  }, [selectedIds]);

  const add = useCallback((id: string): boolean => {
    if (!id) return false;
    const exists = selectedIds.includes(id);
    if (exists) return true;
    if (selectedIds.length >= MAX_ITEMS) {
      return false;
    }
    setSelectedIds((current) => [...current, id]);
    return true;
  }, [selectedIds]);

  const remove = useCallback((id: string) => {
    setSelectedIds((current) => current.filter((item) => item !== id));
  }, []);

  const clear = useCallback(() => {
    setSelectedIds([]);
  }, []);

  const setFromUrl = useCallback((ids: string[]) => {
    setSelectedIds(ids.slice(0, MAX_ITEMS));
  }, []);

  return useMemo(
    () => ({
      selectedIds,
      add,
      remove,
      clear,
      setFromUrl,
      max: MAX_ITEMS,
      count: selectedIds.length,
    }),
    [add, clear, remove, selectedIds, setFromUrl],
  );
}
