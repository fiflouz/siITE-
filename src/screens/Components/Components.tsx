import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import { componentsByCategory, type MappedComponent } from "../../data/componentsData";
import type { Category } from "../../data/catalogueTypes";



type SortKey = "price-asc" | "price-desc" | "performance";

interface Props {
  category: Category;
  search?: string;
  sortBy?: SortKey;
  realPrices?: Record<string, number>;
  onPick?: (item: MappedComponent) => void;
}
export default function Components({
  category,
  search = "",
  sortBy = "price-asc",
  realPrices,
  onPick,
}: Props) {
  // 1) base = accès direct au catalogue typé
  const base = useMemo(() => componentsByCategory[category], [category]);

  if (!base) {
    return (
      <div className="text-center text-red-500 py-12">
        Catégorie inconnue : <b>{category}</b>
      </div>
    );
  }

  // 2) merge des prix + filtre + tri, sans mutation
  const list = useMemo(() => {
    const merged = base.map((it) =>
      realPrices?.[it.name] != null ? { ...it, price: realPrices[it.name]! } : it
    );

    const filtered = merged.filter((it) =>
      it.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === "price-asc") return [...filtered].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return [...filtered].sort((a, b) => b.price - a.price);
    if (sortBy === "performance") return [...filtered].sort((a, b) => b.performance - a.performance);
    return filtered;
  }, [base, realPrices, search, sortBy]);

  const handlePick = (it: MappedComponent) => onPick?.({ ...it }); // renvoyer une copie

  if (!list.length) {
    return (
      <div className="text-center text-[#A1A1AA] py-12">
        Aucun composant trouvé pour la catégorie <b>{category}</b>.
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {list.map((item) => (
          <div
            key={item.id}
            className="group relative bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-[#4F8BF7]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#4F8BF7]/10 hover:-translate-y-1"
          >
            {/* Brand Badge */}
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-[#4F8BF7]/20 text-[#4F8BF7] rounded-full text-xs font-semibold">
                {item.brand}
              </span>
            </div>

            {/* Component Name */}
            <h3 className="text-lg font-bold text-[#F5F5F7] mb-3 pr-20">
              {item.name}
            </h3>

            {/* Specs */}
            <div className="space-y-2 mb-4">
              {item.specs.slice(0, 3).map((spec, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                  <div className="w-1.5 h-1.5 bg-[#4F8BF7] rounded-full"></div>
                  <span>{spec}</span>
                </div>
              ))}
            </div>

            {/* Performance Bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-[#A1A1AA] mb-1">
                <span>Performance</span>
                <span className="font-semibold text-[#4F8BF7]">{item.performance}/100</span>
              </div>
              <div className="w-full h-2 bg-[#0E0E10] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] rounded-full transition-all duration-500"
                  style={{ width: `${item.performance}%` }}
                ></div>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <p className="text-xs text-[#A1A1AA]">Prix</p>
                <p className="text-2xl font-bold text-[#F5F5F7]">{Math.round(item.price)}€</p>
              </div>
              {onPick && (
                <button
                  onClick={() => handlePick(item)}
                  className="px-4 py-2 bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#4F8BF7]/30 transition-all"
                >
                  Choisir
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
