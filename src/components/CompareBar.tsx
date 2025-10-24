import React from "react";
import { useNavigate } from "react-router-dom";
import { useComparatorSelection } from "../contexts/ComparatorContext";

export const CompareBar: React.FC = () => {
  const { selectedIds, clear, count } = useComparatorSelection();
  const navigate = useNavigate();

  if (count < 2) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-2xl border border-white/10 bg-[#1a1a1a]/95 px-6 py-4 shadow-xl backdrop-blur-xl">
      <span className="text-sm text-[#F5F5F7]">
        {count} composants sélectionnés
      </span>
      <button
        className="px-5 py-2 rounded-lg bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] text-white font-semibold shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={() => navigate(`/comparateur?compare=${selectedIds.join(",")}`)}
        aria-label="Comparer ces composants"
      >
        Comparer ({count})
      </button>
      <button
        className="ml-2 px-3 py-2 rounded-lg bg-white/5 text-[#4F8BF7] border border-[#4F8BF7]/30 hover:bg-[#4F8BF7]/10 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={clear}
        aria-label="Vider la sélection"
      >
        Vider
      </button>
    </div>
  );
};
