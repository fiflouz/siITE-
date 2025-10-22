import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import { componentsByCategory, type MappedComponent } from "../../data/componentsData";
import type { Category } from "../../data/catalogueTypes";
import { ComponentCard } from "../../components/ComponentCard";



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
          <ComponentCard
            key={item.id}
            item={item}
            onPick={onPick ? handlePick : undefined}
          />
        ))}
      </div>
    </>
  );
}
