import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { Layout } from "../../components/Layout";
import { ComponentDetailModal } from "../../components/ComponentDetailModal";
import {
  type Category,
  type ComponentWithDetails,
  getComponentsWithDetails,
} from "../../data/componentsData";
import { fmt } from "../../utils/priceFetcher";

type SortKey = "price-asc" | "price-desc" | "performance";

const categories: { key: Category; label: string }[] = [
  { key: "cpu", label: "Processeurs" },
  { key: "gpu", label: "Cartes graphiques" },
  { key: "motherboard", label: "Cartes mères" },
  { key: "ram", label: "Mémoire" },
  { key: "storage", label: "Stockage" },
  { key: "psu", label: "Alimentations" },
];

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
  { value: "performance", label: "Performance" },
];

const emptyPriceMap: Record<string, {
  ttc: number;
  vendor?: string;
  url?: string;
  fetchedAt: string;
  source: string;
}> = {};

export default function Components() {
  const [category, setCategory] = useState<Category>("cpu");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("price-asc");
  const [selectedComponent, setSelectedComponent] = useState<ComponentWithDetails | null>(null);

  const components = useMemo(() => {
    const base = getComponentsWithDetails(category);

    const filtered = base.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    const sorted = [...filtered];
    if (sortBy === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === "performance") {
      sorted.sort((a, b) => b.performance - a.performance);
    }

    return sorted;
  }, [category, search, sortBy]);

  return (
    <Layout>
      <div className="container mx-auto px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4F8BF7]/30 bg-[#4F8BF7]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#4F8BF7]">
            Explorer les composants
          </span>
          <h1 className="mt-4 text-4xl font-bold text-[#F5F5F7]">
            Trouve le meilleur matériel pour ton PC
          </h1>
          <p className="mt-3 max-w-2xl text-[#A1A1AA]">
            Parcours nos composants triés par catégorie, compare leurs performances et découvre la configuration idéale pour ton setup.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          {categories.map((item) => {
            const isActive = item.key === category;
            return (
              <button
                key={item.key}
                onClick={() => setCategory(item.key)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "border-[#4F8BF7] bg-[#4F8BF7]/10 text-[#F5F5F7]"
                    : "border-white/10 bg-transparent text-[#A1A1AA] hover:border-[#4F8BF7]/50 hover:text-[#F5F5F7]"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-[#111113]/80 p-4 backdrop-blur"
        >
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4F8BF7]" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Rechercher un composant (ex: RTX 4070, Ryzen 7...)"
              className="w-full rounded-xl border border-white/10 bg-[#0E0E10] py-3 pl-11 pr-4 text-sm text-[#F5F5F7] focus:border-[#4F8BF7]/60 focus:outline-none"
            />
          </div>
          <label className="flex items-center gap-3 text-sm text-[#A1A1AA]">
            <SlidersHorizontal className="h-4 w-4 text-[#4F8BF7]" />
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortKey)}
              className="rounded-xl border border-white/10 bg-[#0E0E10] px-4 py-2 text-sm text-[#F5F5F7] focus:border-[#4F8BF7]/60 focus:outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </motion.div>

        {components.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#111113]/60 p-10 text-center text-[#A1A1AA]">
            Aucun composant ne correspond à ta recherche pour le moment.
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {components.map((component, index) => (
              <motion.button
                key={component.id}
                type="button"
                onClick={() => setSelectedComponent(component)}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#111113]/70 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#4F8BF7]/50 hover:shadow-lg hover:shadow-[#4F8BF7]/20"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2, delay: index * 0.01 }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#4F8BF7]">
                      {component.brand}
                    </span>
                    <h2 className="mt-2 text-lg font-semibold text-[#F5F5F7] leading-tight">
                      {component.name}
                    </h2>
                  </div>
                  <div className="rounded-lg bg-[#4F8BF7]/10 px-3 py-1 text-sm font-semibold text-[#4F8BF7]">
                    {Math.round(component.performance)}%
                  </div>
                </div>

                {component.description && (
                  <p className="mt-4 text-sm text-[#A1A1AA]">
                    {component.description}
                  </p>
                )}

                <ul className="mt-4 flex flex-wrap gap-2 text-xs text-[#A1A1AA]">
                  {component.specs.slice(0, 4).map((spec) => (
                    <li
                      key={spec}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#A1A1AA]">Prix estimé</p>
                    <p className="text-xl font-semibold text-[#F5F5F7]">
                      {fmt(component.price)}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-[#4F8BF7]">
                    Voir les détails →
                  </span>
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
      <ComponentDetailModal
        component={selectedComponent}
        onClose={() => setSelectedComponent(null)}
        priceMap={emptyPriceMap}
      />
    </Layout>
  );
}
