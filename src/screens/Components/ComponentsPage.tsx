import { useState } from "react";
import { Layout } from "../../components/Layout";
import Components from "./Components";
import type { Category } from "../../data/catalogueTypes";
import { Search, SlidersHorizontal } from "lucide-react";

export const ComponentsPage = () => {
  const [category, setCategory] = useState<Category>("cpu");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "performance">("price-asc");

  const categories: { value: Category; label: string; icon: string }[] = [
    { value: "cpu", label: "Processeurs", icon: "🔲" },
    { value: "gpu", label: "Cartes Graphiques", icon: "🎮" },
    { value: "ram", label: "Mémoire RAM", icon: "💾" },
    { value: "ssd", label: "Stockage SSD", icon: "💿" },
    { value: "chipset", label: "Chipsets", icon: "⚡" },
  ];

  return (
    <Layout>
      <div className="min-h-screen pt-32 pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl font-bold text-[#F5F5F7] mb-4">
              Catalogue de{" "}
              <span className="bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] bg-clip-text text-transparent">
                Composants
              </span>
            </h1>
            <p className="text-xl text-[#A1A1AA]">
              Explorez notre catalogue complet de composants PC 2021-2025
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  category === cat.value
                    ? "bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] text-white shadow-lg shadow-[#4F8BF7]/30"
                    : "bg-[#1a1a1a] text-[#A1A1AA] hover:text-[#F5F5F7] border border-white/10"
                }`}
              >
                <span className="text-xl">{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" />
              <input
                type="text"
                placeholder="Rechercher un composant..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-[#F5F5F7] placeholder-[#A1A1AA] focus:outline-none focus:border-[#4F8BF7] transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <SlidersHorizontal className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="pl-12 pr-8 py-3 bg-[#1a1a1a] border border-white/10 rounded-xl text-[#F5F5F7] focus:outline-none focus:border-[#4F8BF7] transition-all appearance-none cursor-pointer min-w-[200px]"
              >
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="performance">Performance</option>
              </select>
            </div>
          </div>

          {/* Components Grid */}
          <Components
            category={category}
            search={search}
            sortBy={sortBy}
          />
        </div>
      </div>
    </Layout>
  );
};
