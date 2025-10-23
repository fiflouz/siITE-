import { createContext, useContext, useState, useMemo, type ReactNode } from "react";

interface ComparatorContextValue {
  count: number;
  setCount: (next: number) => void;
}

const ComparatorContext = createContext<ComparatorContextValue | undefined>(undefined);

export const ComparatorSelectionProvider = ({ children }: { children: ReactNode }) => {
  const [count, setCount] = useState(0);

  const value = useMemo(() => ({ count, setCount }), [count]);

  return (
    <ComparatorContext.Provider value={value}>{children}</ComparatorContext.Provider>
  );
};

export const useComparatorSelection = () => {
  const ctx = useContext(ComparatorContext);
  if (!ctx) {
    throw new Error("useComparatorSelection must be used within ComparatorSelectionProvider");
  }
  return ctx;
};
