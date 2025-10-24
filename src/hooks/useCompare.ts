import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

const MAX_ITEMS = 4;
const STORAGE_KEY = 'siite-compare-ids';

interface UseCompareReturn {
  ids: string[];
  add: (id: string) => boolean;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  count: number;
  full: boolean;
  has: (id: string) => boolean;
}

export const useCompare = (): UseCompareReturn => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ids, setIds] = useState<string[]>(() => {
    // 1. Essayer de lire depuis URL (?compare=id1,id2,...)
    const urlIds = searchParams.get('compare');
    if (urlIds) {
      return urlIds.split(',').filter(Boolean).slice(0, MAX_ITEMS);
    }
    
    // 2. Sinon lire depuis localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed.slice(0, MAX_ITEMS) : [];
      }
    } catch {
      // Ignore errors
    }
    
    return [];
  });

  // Sync localStorage quand ids change
  useEffect(() => {
    if (ids.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [ids]);

  // Sync URL quand ids change (optionnel, ne pas forcer si on n'est pas sur /comparateur)
  useEffect(() => {
    // Ne sync l'URL que si on a des IDs
    if (ids.length > 0) {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        newParams.set('compare', ids.join(','));
        return newParams;
      }, { replace: true });
    } else {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        newParams.delete('compare');
        return newParams;
      }, { replace: true });
    }
  }, [ids, setSearchParams]);

  const add = useCallback((id: string): boolean => {
    if (ids.includes(id)) return false;
    if (ids.length >= MAX_ITEMS) return false;
    
    setIds(prev => [...prev, id]);
    return true;
  }, [ids]);

  const remove = useCallback((id: string) => {
    setIds(prev => prev.filter(i => i !== id));
  }, []);

  const toggle = useCallback((id: string) => {
    if (ids.includes(id)) {
      remove(id);
    } else {
      add(id);
    }
  }, [ids, add, remove]);

  const clear = useCallback(() => {
    setIds([]);
  }, []);

  const has = useCallback((id: string) => {
    return ids.includes(id);
  }, [ids]);

  return {
    ids,
    add,
    remove,
    toggle,
    clear,
    count: ids.length,
    full: ids.length >= MAX_ITEMS,
    has,
  };
};
