import { useCallback, useEffect, useMemo, useRef, useState, type ElementType } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useSearchParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  Cpu,
  Filter,
  HardDrive,
  MemoryStick,
  Monitor,
  Pin,
  Search,
  Share2,
  SlidersHorizontal,
  Trash2,
  X,
  Zap,
} from "lucide-react";
import {
  type Category,
  type ComponentWithDetails,
  getComponentsWithDetails,
} from "../../data/componentsData";
import { useAuth, type Configuration } from "../../contexts/AuthContext";
import { fmt } from "../../utils/priceFetcher";
import { CompareTable } from "./CompareTable";
import { SUPPORTED_COMPARISON_CATEGORIES } from "./specMap";
import { useComparatorSelection } from "../../contexts/ComparatorContext";

type ComponentSortKey = "performance" | "price-asc" | "price-desc";

type ConfigKey = "cpu" | "gpu" | "ram" | "motherboard" | "storage" | "psu";

const COMPONENT_CATEGORIES: { key: Category; label: string }[] = [
  { key: "cpu", label: "Processeurs" },
  { key: "gpu", label: "Cartes graphiques" },
  { key: "motherboard", label: "Cartes mères" },
  { key: "ram", label: "Mémoire" },
  { key: "storage", label: "Stockage" },
  { key: "psu", label: "Alimentations" },
];

const COMPONENT_SORT_OPTIONS: { value: ComponentSortKey; label: string }[] = [
  { value: "performance", label: "Performance" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
];

const CONFIG_SECTIONS: { key: ConfigKey; label: string; icon: ElementType }[] = [
  { key: "cpu", label: "Processeur", icon: Cpu },
  { key: "motherboard", label: "Carte mère", icon: Cpu },
  { key: "ram", label: "Mémoire", icon: MemoryStick },
  { key: "gpu", label: "Carte graphique", icon: Monitor },
  { key: "storage", label: "Stockage", icon: HardDrive },
  { key: "psu", label: "Alimentation", icon: Zap },
];

export const Comparator = () => {
  const location = useLocation();
  const [, setSearchParams] = useSearchParams();
  const tabParam = useMemo(() => new URLSearchParams(location.search).get("tab"), [location.search]);
  const [activeTab, setActiveTab] = useState<"components" | "saved">(
    tabParam === "saved" ? "saved" : "components"
  );

  useEffect(() => {
    if (tabParam === "saved" || tabParam === "components") {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    params.set("tab", activeTab);
    setSearchParams(params, { replace: true });
  }, [activeTab, location.search, setSearchParams]);

  return (
    <Layout>
      <div className="container mx-auto px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10 flex flex-col gap-6"
        >
<<<<<<< HEAD
          <h1 className="text-5xl font-bold text-[#F5F5F7] mb-4">
            Comparateur de Configurations
          </h1>
          <p className="text-lg text-[#A1A1AA]">
            Comparez jusqu'à 3 configurations côte à côte
          </p>
        </motion.div>

        {/* Config Selection */}
        {selectedConfigs.length < 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-[#F5F5F7] mb-4">Sélectionner une configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableConfigs.filter(c => !selectedConfigs.find(sc => sc.id === c.id)).map((config) => (
                <motion.div
                  key={config.id}
                  whileHover={{ y: -4 }}
                  onClick={() => addConfig(config)}
                  className="p-6 bg-[#1a1a1a] border border-white/10 rounded-xl cursor-pointer hover:border-[#4A90E2]/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#F5F5F7]">{config.name}</h3>
                    <Plus className="w-5 h-5 text-[#4A90E2]" />
                  </div>
                  <p className="text-2xl font-bold text-[#4A90E2] mb-2">{config.price}€</p>
                  <p className="text-sm text-[#A1A1AA]">Performance: {config.performance}%</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Comparison Table */}
        {selectedConfigs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-6 text-left text-[#A1A1AA] font-semibold">Caractéristiques</th>
                    {selectedConfigs.map((config) => (
                      <th key={config.id} className="p-6 text-center relative">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeConfig(config.id)}
                          className="absolute top-4 right-4 p-1 rounded-full bg-[#0E0E10] hover:bg-red-500/20 transition-all"
                        >
                          <X className="w-4 h-4 text-[#A1A1AA] hover:text-red-500" />
                        </motion.button>
                        <div className="text-xl font-bold text-[#F5F5F7] mb-2">{config.name}</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] bg-clip-text text-transparent">
                          {config.price}€
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Performance */}
                  <tr className="border-b border-white/5">
                    <td className="p-6 text-[#A1A1AA] font-medium">Performance</td>
                    {selectedConfigs.map((config) => (
                      <td key={config.id} className="p-6 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-lg font-bold text-[#F5F5F7]">{config.performance}%</span>
                          <div className="w-full h-2 bg-[#0E0E10] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5]"
                              style={{ width: `${config.performance}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Specs */}
                  {specLabels.map((spec) => (
                    <tr key={spec.key} className="border-b border-white/5">
                      <td className="p-6 text-[#A1A1AA] font-medium">{spec.label}</td>
                      {selectedConfigs.map((config) => (
                        <td key={config.id} className="p-6 text-center text-[#F5F5F7]">
                          {config.specs[spec.key]}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Best Value Indicator */}
                  <tr>
                    <td className="p-6 text-[#A1A1AA] font-medium">Meilleur rapport</td>
                    {selectedConfigs.map((config, index) => {
                      const bestValue = selectedConfigs.reduce((best, current) => 
                        (current.performance / current.price) > (best.performance / best.price) ? current : best
                      );
                      const isBest = config.id === bestValue.id;
                      
                      return (
                        <td key={config.id} className="p-6 text-center">
                          {isBest && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm font-semibold">
                              <Check className="w-4 h-4" />
                              Meilleur choix
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {selectedConfigs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#A1A1AA] text-lg">
              Sélectionnez des configurations pour commencer la comparaison
=======
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-[#4F8BF7]/30 bg-[#4F8BF7]/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#4F8BF7]">
              Comparateur intelligent
            </p>
            <h1 className="mt-4 text-5xl font-bold text-[#F5F5F7]">
              Compare tes composants et configurations sauvegardées
            </h1>
            <p className="mt-3 max-w-2xl text-[#A1A1AA]">
              Ajoute jusqu'à quatre éléments pour analyser instantanément performances, compatibilité et budget. Passe en un clic des composants individuels à tes configurations favorites.
>>>>>>> 81e9197 (feat: revamp comparator experience)
            </p>
          </div>

          <div className="flex w-fit items-center rounded-full border border-white/10 bg-[#1a1a1a]/80 p-1 text-sm font-medium">
            <button
              type="button"
              onClick={() => setActiveTab("components")}
              className={`rounded-full px-5 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F8BF7] focus:ring-offset-2 focus:ring-offset-[#0E0E10] ${
                activeTab === "components"
                  ? "bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] text-white"
                  : "text-[#A1A1AA] hover:text-[#F5F5F7]"
              }`}
              aria-pressed={activeTab === "components"}
            >
              Composants
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`rounded-full px-5 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#4F8BF7] focus:ring-offset-2 focus:ring-offset-[#0E0E10] ${
                activeTab === "saved"
                  ? "bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] text-white"
                  : "text-[#A1A1AA] hover:text-[#F5F5F7]"
              }`}
              aria-pressed={activeTab === "saved"}
            >
              Configurations sauvegardées
            </button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeTab === "components" ? (
            <motion.div
              key="components"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <ComponentCompareSection />
            </motion.div>
          ) : (
            <motion.div
              key="saved"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <SavedConfigsCompareSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

const ComponentCompareSection = () => {
  const selectionLimit = 4;
  const { setCount } = useComparatorSelection();
  const location = useLocation();
  const [ , setSearchParams ] = useSearchParams();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [category, setCategory] = useState<Category>(
    (params.get("cat") as Category) ?? "cpu"
  );
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<ComponentSortKey>("performance");
  const [selectedComponents, setSelectedComponents] = useState<ComponentWithDetails[]>([]);
  const [diffOnly, setDiffOnly] = useState(false);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">("idle");
  const [limitReached, setLimitReached] = useState(false);

  const tableRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);

  const componentIndex = useMemo(() => {
    const map = new Map<string, ComponentWithDetails>();
    COMPONENT_CATEGORIES.forEach(({ key }) => {
      getComponentsWithDetails(key).forEach((component) => {
        map.set(component.id, component);
      });
    });
    return map;
  }, []);

  const availableComponents = useMemo(() => {
    const base = getComponentsWithDetails(category);
    const filtered = base.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === "price-asc") {
      return [...filtered].sort((a, b) => a.price - b.price);
    }
    if (sortBy === "price-desc") {
      return [...filtered].sort((a, b) => b.price - a.price);
    }
    return [...filtered].sort((a, b) => b.performance - a.performance);
  }, [category, search, sortBy]);

  const isCategorySupported = SUPPORTED_COMPARISON_CATEGORIES.includes(category);
  const canCompare = selectedComponents.length >= 2;

  const shareUrl = useMemo(() => {
    if (!selectedComponents.length || typeof window === "undefined") return "";
    const ids = selectedComponents.map((component) => component.id).join(",");
    return `${window.location.origin}${location.pathname}?tab=components&compare=${ids}&cat=${category}`;
  }, [selectedComponents, location.pathname, category]);

  useEffect(() => {
    setCount(selectedComponents.length);
  }, [selectedComponents.length, setCount]);

  useEffect(() => () => setCount(0), [setCount]);

  useEffect(() => {
    if (!limitReached) return;
    const timer = window.setTimeout(() => setLimitReached(false), 2200);
    return () => window.clearTimeout(timer);
  }, [limitReached]);

  useEffect(() => {
    if (shareState === "idle") return;
    const timer = window.setTimeout(() => setShareState("idle"), 2200);
    return () => window.clearTimeout(timer);
  }, [shareState]);

  useEffect(() => {
    if (initializedRef.current) return;
    const compare = params.get("compare");
    if (!compare) {
      initializedRef.current = true;
      return;
    }
    const ids = compare.split(",").filter(Boolean);
    const requestedCategory = params.get("cat") as Category | null;
    let effectiveCategory: Category = category;

    if (requestedCategory && COMPONENT_CATEGORIES.some((c) => c.key === requestedCategory)) {
      effectiveCategory = requestedCategory;
    } else {
      const firstFound = ids
        .map((id) => componentIndex.get(id))
        .find((component) => component);
      if (firstFound) {
        effectiveCategory = firstFound.category as Category;
      }
    }

    const selections = ids
      .map((id) => componentIndex.get(id))
      .filter((component): component is ComponentWithDetails =>
        Boolean(component) && component.category === effectiveCategory
      )
      .slice(0, selectionLimit);

    if (selections.length) {
      setCategory(effectiveCategory);
      setSelectedComponents(selections);
      setPinnedId(selections[0]?.id ?? null);
    }

    initializedRef.current = true;
  }, [category, componentIndex, params, selectionLimit]);

  useEffect(() => {
    if (!initializedRef.current) return;
    const nextParams = new URLSearchParams(location.search);
    if (selectedComponents.length) {
      nextParams.set("compare", selectedComponents.map((component) => component.id).join(","));
      nextParams.set("cat", category);
    } else {
      nextParams.delete("compare");
      nextParams.delete("cat");
    }
    setSearchParams(nextParams, { replace: true });
  }, [selectedComponents, category, location.search, setSearchParams]);

  const handleCategoryChange = useCallback(
    (next: Category) => {
      setCategory(next);
      setSelectedComponents((prev) => {
        const filtered = prev.filter((component) => component.category === next);
        setPinnedId((current) =>
          filtered.some((component) => component.id === current)
            ? current
            : filtered[0]?.id ?? null
        );
        return filtered;
      });
    },
    []
  );

  const handleToggle = useCallback(
    (component: ComponentWithDetails) => {
      setSelectedComponents((prev) => {
        const exists = prev.some((item) => item.id === component.id);
        let next: ComponentWithDetails[];
        if (exists) {
          next = prev.filter((item) => item.id !== component.id);
        } else {
          if (prev.length >= selectionLimit) {
            setLimitReached(true);
            return prev;
          }
          next = [...prev, component];
        }
        setPinnedId((current) =>
          next.some((item) => item.id === current) ? current : next[0]?.id ?? null
        );
        return next;
      });
    },
    [selectionLimit]
  );

  const handleRemove = useCallback((id: string) => {
    setSelectedComponents((prev) => {
      const next = prev.filter((component) => component.id !== id);
      setPinnedId((current) =>
        next.some((component) => component.id === current) ? current : next[0]?.id ?? null
      );
      return next;
    });
  }, []);

  const handleScrollToTable = useCallback(() => {
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleShare = useCallback(async () => {
    if (!canCompare || !shareUrl) return;
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setShareState("copied");
    } catch (error) {
      console.error("Clipboard error", error);
      setShareState("error");
    }
  }, [canCompare, shareUrl]);

  const handleReset = useCallback(() => {
    setSelectedComponents([]);
    setPinnedId(null);
    setDiffOnly(false);
  }, []);

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-white/10 bg-[#111113]/80 p-6 backdrop-blur">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            {COMPONENT_CATEGORIES.map((item) => {
              const isActive = item.key === category;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => handleCategoryChange(item.key)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#4F8BF7] focus:ring-offset-2 focus:ring-offset-[#0E0E10] ${
                    isActive
                      ? "border-[#4F8BF7] bg-[#4F8BF7]/10 text-[#F5F5F7]"
                      : "border-white/10 bg-transparent text-[#A1A1AA] hover:border-[#4F8BF7]/50 hover:text-[#F5F5F7]"
                  }`}
                  aria-pressed={isActive}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative min-w-[220px] flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#4F8BF7]" aria-hidden="true" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher un composant (ex: RTX 4070, Ryzen 7...)"
                className="w-full rounded-xl border border-white/10 bg-[#0E0E10] py-3 pl-11 pr-4 text-sm text-[#F5F5F7] focus:border-[#4F8BF7]/60 focus:outline-none"
                aria-label="Rechercher un composant"
              />
            </div>
            <label className="flex items-center gap-3 text-sm text-[#A1A1AA]">
              <SlidersHorizontal className="h-4 w-4 text-[#4F8BF7]" aria-hidden="true" />
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as ComponentSortKey)}
                className="rounded-xl border border-white/10 bg-[#0E0E10] px-4 py-2 text-sm text-[#F5F5F7] focus:border-[#4F8BF7]/60 focus:outline-none"
              >
                {COMPONENT_SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {availableComponents.map((component) => {
          const isSelected = selectedComponents.some((item) => item.id === component.id);
          return (
            <motion.div
              key={component.id}
              whileHover={{ y: -6 }}
              className={`group flex h-full flex-col justify-between rounded-2xl border p-6 transition-all focus-within:ring-2 focus-within:ring-[#4F8BF7] ${
                isSelected
                  ? "border-[#4F8BF7] bg-[#4F8BF7]/10"
                  : "border-white/10 bg-[#111113]/80 hover:border-[#4F8BF7]/50"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#4F8BF7]">
                      {component.brand}
                    </span>
                    <h3 className="mt-1 text-lg font-semibold text-[#F5F5F7] leading-tight">
                      {component.name}
                    </h3>
                  </div>
                  <span className="rounded-lg bg-[#4F8BF7]/10 px-3 py-1 text-sm font-semibold text-[#4F8BF7]">
                    {Math.round(component.performance)}%
                  </span>
                </div>

                <p className="text-sm text-[#A1A1AA]">
                  {component.description ?? ""}
                </p>

                <ul className="flex flex-wrap gap-2 text-xs text-[#A1A1AA]">
                  {component.specs.slice(0, 4).map((spec) => (
                    <li key={spec} className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A1A1AA]">Prix estimé</p>
                  <p className="text-xl font-semibold text-[#F5F5F7]">
                    {fmt(component.price)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggle(component)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-[#4F8BF7] focus:ring-offset-2 focus:ring-offset-[#111113] ${
                    isSelected
                      ? "bg-white/10 text-white ring-1 ring-white/20"
                      : "bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] text-white shadow-lg shadow-[#4F8BF7]/30"
                  }`}
                  aria-pressed={isSelected}
                >
                  {isSelected ? "✓ Ajouté" : "Comparer"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#111113]/80 px-6 py-4">
        <p className="text-sm text-[#A1A1AA]" aria-live="polite">
          {selectedComponents.length < 2
            ? `Sélectionne ${Math.max(0, 2 - selectedComponents.length)} produit(s) pour comparer`
            : `Comparaison prête (${selectedComponents.length}/${selectionLimit})`}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setDiffOnly((prev) => !prev)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
              diffOnly ? "border-[#4F8BF7] text-[#F5F5F7]" : "border-white/10 text-[#A1A1AA] hover:text-white"
            }`}
          >
            <Filter className="h-3.5 w-3.5" />
            {diffOnly ? "Différences uniquement" : "Voir toutes les lignes"}
          </button>
          <button
            type="button"
            onClick={handleShare}
            disabled={!canCompare}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
              canCompare
                ? "border-[#4F8BF7] text-[#F5F5F7] hover:bg-[#4F8BF7]/10"
                : "border-white/10 text-[#52525b]"
            }`}
          >
            {shareState === "copied" ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Share2 className="h-3.5 w-3.5" />
            )}
            {shareState === "copied" ? "Lien copié" : shareState === "error" ? "Copie impossible" : "Partager"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-[#A1A1AA] hover:text-white"
            disabled={selectedComponents.length === 0}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Réinitialiser
          </button>
        </div>
      </div>

      <div ref={tableRef}>
        {selectedComponents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#0E0E10] p-10 text-center text-sm text-[#A1A1AA]">
            Ajoute au moins deux composants pour lancer la comparaison.
          </div>
        ) : !isCategorySupported ? (
          <div className="rounded-2xl border border-white/10 bg-[#111113]/80 p-10 text-center text-sm text-[#A1A1AA]">
            La comparaison détaillée n'est pas disponible pour cette catégorie pour le moment.
          </div>
        ) : (
          <CompareTable
            category={category}
            items={selectedComponents}
            diffOnly={diffOnly}
            pinnedId={pinnedId}
            onPin={(id) => setPinnedId((current) => (current === id ? null : id))}
            onRemove={handleRemove}
          />
        )}
      </div>

      <AnimatePresence>
        {selectedComponents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="pointer-events-none fixed bottom-6 left-1/2 z-50 w-full max-w-4xl -translate-x-1/2 px-4"
          >
            <div className="pointer-events-auto rounded-2xl border border-white/10 bg-[#0C0C0E]/95 px-6 py-4 shadow-2xl backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm text-[#F5F5F7]" aria-live="polite">
                  {limitReached
                    ? "Limite de 4 produits atteinte"
                    : `Sélection ${selectedComponents.length}/${selectionLimit}`}
                </div>
                <div className="flex flex-1 items-center gap-3 overflow-x-auto">
                  {selectedComponents.map((component) => (
                    <div
                      key={component.id}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${
                        pinnedId === component.id ? "border-[#4F8BF7] text-[#F5F5F7]" : "border-white/10 text-[#A1A1AA]"
                      }`}
                    >
                      <span>{component.name}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setPinnedId((current) => (current === component.id ? null : component.id))}
                          className={`text-[#52525b] transition-colors hover:text-[#4F8BF7] ${
                            pinnedId === component.id ? "text-[#4F8BF7]" : ""
                          }`}
                          aria-label={`Définir ${component.name} comme référence`}
                        >
                          <Pin className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemove(component.id)}
                          className="text-[#52525b] hover:text-red-400"
                          aria-label={`Retirer ${component.name}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleScrollToTable}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#4F8BF7]/30"
                  >
                    Ouvrir le comparateur
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface SavedRow {
  key: string;
  label: string;
  unit?: string;
  better?: "higher" | "lower";
  tooltip?: string;
  getValue: (configuration: Configuration) => unknown;
  getNumeric?: (configuration: Configuration) => number | null;
}

const normalizeNumeric = (value: unknown): number | null => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
};

const savedHeatClass = (value: number | null, better: "higher" | "lower" | undefined, min: number, max: number) => {
  if (value === null || !Number.isFinite(value) || max === min) return "";
  const ratio = (value - min) / (max - min);
  const score = better === "lower" ? 1 - ratio : ratio;
  if (score >= 0.75) return "bg-emerald-500/15 text-emerald-100";
  if (score <= 0.25) return "bg-red-500/10 text-red-100";
  if (score >= 0.55) return "bg-emerald-500/8";
  if (score <= 0.45) return "bg-red-500/6";
  return "bg-white/5";
};

const SavedConfigsCompareSection = () => {
  const selectionLimit = 4;
  const { isLoggedIn, user } = useAuth();
  const savedConfigurations = user?.savedConfigurations ?? [];
  const { setCount } = useComparatorSelection();
  const location = useLocation();
  const [ , setSearchParams ] = useSearchParams();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [diffOnly, setDiffOnly] = useState(false);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [shareState, setShareState] = useState<"idle" | "copied" | "error">("idle");
  const tableRef = useRef<HTMLDivElement | null>(null);
  const initializedRef = useRef(false);

  const selectedConfigs = useMemo(
    () => savedConfigurations.filter((config) => selectedIds.includes(config.id)),
    [savedConfigurations, selectedIds]
  );

  useEffect(() => {
    if (!isLoggedIn) {
      setSelectedIds([]);
      setPinnedId(null);
      setCount(0);
    }
  }, [isLoggedIn, setCount]);

  useEffect(() => {
    setCount(selectedIds.length);
  }, [selectedIds.length, setCount]);

  useEffect(() => () => setCount(0), [setCount]);

  useEffect(() => () => setCount(0), [setCount]);

  useEffect(() => {
    if (shareState === "idle") return;
    const timer = window.setTimeout(() => setShareState("idle"), 2200);
    return () => window.clearTimeout(timer);
  }, [shareState]);

  useEffect(() => {
    if (!savedConfigurations.length || initializedRef.current) return;
    const compare = params.get("compareSaved");
    if (compare) {
      const ids = compare.split(",").filter((id) => savedConfigurations.some((cfg) => cfg.id === id));
      if (ids.length) {
        setSelectedIds(ids.slice(0, selectionLimit));
        setPinnedId(ids[0] ?? null);
      }
    }
    initializedRef.current = true;
  }, [params, savedConfigurations, selectionLimit]);

  useEffect(() => {
    const nextParams = new URLSearchParams(location.search);
    if (selectedIds.length) {
      nextParams.set("compareSaved", selectedIds.join(","));
    } else {
      nextParams.delete("compareSaved");
    }
    setSearchParams(nextParams, { replace: true });
  }, [selectedIds, location.search, setSearchParams]);

  useEffect(() => {
    if (!selectedConfigs.some((config) => config.id === pinnedId)) {
      setPinnedId(selectedConfigs[0]?.id ?? null);
    }
  }, [selectedConfigs, pinnedId]);

  const handleToggle = useCallback(
    (id: string) => {
      setSelectedIds((prev) => {
        const exists = prev.includes(id);
        if (exists) {
          return prev.filter((value) => value !== id);
        }
        if (prev.length >= selectionLimit) {
          return prev;
        }
        return [...prev, id];
      });
    },
    [selectionLimit]
  );

  const handleRemove = useCallback((id: string) => {
    setSelectedIds((prev) => prev.filter((value) => value !== id));
  }, []);

  const handleShare = useCallback(async () => {
    if (!selectedIds.length || typeof window === "undefined") return;
    const shareUrl = `${window.location.origin}${location.pathname}?tab=saved&compareSaved=${selectedIds.join(",")}`;
    try {
      await navigator.clipboard?.writeText(shareUrl);
      setShareState("copied");
    } catch (error) {
      console.error("Clipboard error", error);
      setShareState("error");
    }
  }, [selectedIds, location.pathname]);

  const handleScrollToTable = useCallback(() => {
    tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const rows = useMemo<SavedRow[]>(() => {
    const base: SavedRow[] = [
      {
        key: "total",
        label: "Budget total",
        better: "lower",
        unit: "€",
        getValue: (config) => getTotalPrice(config),
        getNumeric: (config) => getTotalPrice(config),
      },
      {
        key: "perf",
        label: "Performance moyenne",
        better: "higher",
        unit: "%",
        getValue: (config) => computeAveragePerformance(config),
        getNumeric: (config) => computeAveragePerformance(config),
      },
    ];

    CONFIG_SECTIONS.forEach(({ key, label }) => {
      base.push({
        key: `${key}-name`,
        label,
        getValue: (config) => extractComponent(config, key)?.name ?? "—",
      });
      base.push({
        key: `${key}-perf`,
        label: `${label} • perf`,
        unit: "%",
        better: "higher",
        getValue: (config) => extractComponent(config, key)?.performance ?? null,
        getNumeric: (config) => extractComponent(config, key)?.performance ?? null,
      });
    });

    if (!diffOnly) return base;

    return base.filter((row) => {
      const values = selectedConfigs.map((config) => row.getValue(config));
      const serialized = values.map((value) => JSON.stringify(value ?? ""));
      return new Set(serialized).size > 1;
    });
  }, [diffOnly, selectedConfigs]);

  if (!isLoggedIn) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#111113]/80 p-10 text-center">
        <ClipboardCheck className="mx-auto mb-4 h-10 w-10 text-[#4F8BF7]" aria-hidden="true" />
        <h2 className="text-2xl font-semibold text-[#F5F5F7]">Connecte-toi pour comparer tes configurations</h2>
        <p className="mt-3 text-sm text-[#A1A1AA]">
          Sauvegarde tes configurations dans le configurateur puis reviens ici pour les comparer.
        </p>
        <p className="mt-6 text-sm text-[#A1A1AA]">
          Clique sur le bouton « Connexion » en haut à droite pour ouvrir la fenêtre de login et accéder à tes données.
        </p>
      </div>
    );
  }

  if (savedConfigurations.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#111113]/80 p-10 text-center text-sm text-[#A1A1AA]">
        Tu n'as pas encore sauvegardé de configuration. Utilise le configurateur pour en enregistrer et reviens ici pour les comparer !
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {savedConfigurations.map((configuration) => {
          const isSelected = selectedIds.includes(configuration.id);
          const performance = computeAveragePerformance(configuration);
          return (
            <motion.button
              key={configuration.id}
              type="button"
              onClick={() => handleToggle(configuration.id)}
              whileHover={{ y: -6 }}
              className={`flex h-full flex-col rounded-2xl border p-6 text-left transition-all ${
                isSelected
                  ? "border-[#4F8BF7] bg-[#4F8BF7]/10"
                  : "border-white/10 bg-[#111113]/80 hover:border-[#4F8BF7]/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs uppercase tracking-wider text-[#4F8BF7]">
                    {new Date(configuration.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold text-[#F5F5F7] leading-tight">
                    {configuration.name}
                  </h3>
                </div>
                {isSelected && (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4F8BF7] text-white">
                    <Check className="h-4 w-4" aria-hidden="true" />
                  </span>
                )}
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2 text-xs text-[#A1A1AA]">
                {CONFIG_SECTIONS.map(({ key, label }) => {
                  const component = extractComponent(configuration, key);
                  return (
                    <div key={key} className="rounded-xl border border-white/10 bg-[#0E0E10] px-3 py-2">
                      <p className="text-[10px] uppercase tracking-widest text-white/40">{label}</p>
                      <p className="mt-1 font-medium text-[#F5F5F7]">
                        {component?.name ?? "Non défini"}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A1A1AA]">Budget total</p>
                  <p className="text-lg font-semibold text-[#F5F5F7]">
                    {fmt(getTotalPrice(configuration))}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-[#A1A1AA]">Performance moyenne</p>
                  <p className="text-lg font-semibold text-[#F5F5F7]">{performance}%</p>
                </div>
              </div>

              <p className="mt-3 text-xs text-[#52525b]">
                {isSelected ? "Sélectionnée pour la comparaison" : "Clique pour sélectionner (max 4)"}
              </p>
            </motion.button>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-[#111113]/80 px-6 py-4">
        <p className="text-sm text-[#A1A1AA]" aria-live="polite">
          {selectedIds.length < 2
            ? `Sélectionne ${Math.max(0, 2 - selectedIds.length)} configuration(s) pour comparer`
            : `Comparaison prête (${selectedIds.length}/${selectionLimit})`}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setDiffOnly((prev) => !prev)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
              diffOnly ? "border-[#4F8BF7] text-[#F5F5F7]" : "border-white/10 text-[#A1A1AA] hover:text-white"
            }`}
          >
            <Filter className="h-3.5 w-3.5" />
            {diffOnly ? "Différences uniquement" : "Voir toutes les lignes"}
          </button>
          <button
            type="button"
            onClick={handleShare}
            disabled={selectedIds.length < 2}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
              selectedIds.length >= 2
                ? "border-[#4F8BF7] text-[#F5F5F7] hover:bg-[#4F8BF7]/10"
                : "border-white/10 text-[#52525b]"
            }`}
          >
            {shareState === "copied" ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Share2 className="h-3.5 w-3.5" />
            )}
            {shareState === "copied" ? "Lien copié" : shareState === "error" ? "Copie impossible" : "Partager"}
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedIds([]);
              setPinnedId(null);
              setDiffOnly(false);
            }}
            className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-[#A1A1AA] hover:text-white"
            disabled={selectedIds.length === 0}
          >
            <Trash2 className="h-3.5 w-3.5" />
            Réinitialiser
          </button>
        </div>
      </div>

      <div ref={tableRef}>
        {selectedConfigs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#0E0E10] p-10 text-center text-sm text-[#A1A1AA]">
            Ajoute au moins deux configurations pour lancer la comparaison.
          </div>
        ) : (
          <div className="overflow-auto rounded-2xl border border-white/10">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 z-20 backdrop-blur bg-[#08080A]/90">
                <tr className="border-b border-white/10">
                  <th className="sticky left-0 z-20 w-56 px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">
                    Caractéristiques
                  </th>
                  {selectedConfigs.map((config) => (
                    <th
                      key={config.id}
                      className={`min-w-[220px] px-4 py-3 text-left align-top text-[#F5F5F7] ${
                        pinnedId === config.id ? "ring-1 ring-[#4F8BF7]" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-xs uppercase tracking-widest text-[#6B9CFF]">
                            {new Date(config.createdAt).toLocaleDateString("fr-FR")}
                          </div>
                          <div className="text-base font-semibold leading-snug">{config.name}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setPinnedId((current) => (current === config.id ? null : config.id))}
                            className={`rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-wide transition-colors ${
                              pinnedId === config.id
                                ? "bg-[#4F8BF7]/20 text-[#F5F5F7]"
                                : "text-[#A1A1AA] hover:text-white"
                            }`}
                          >
                            <span className="flex items-center gap-1">
                              <Pin className="h-3 w-3" />
                              {pinnedId === config.id ? "Référence" : "Pin"}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemove(config.id)}
                            className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-wide text-[#A1A1AA] hover:text-red-400"
                            aria-label={`Retirer ${config.name} de la comparaison`}
                          >
                            Retirer
                          </button>
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => {
                  const values = selectedConfigs.map((config) => row.getValue(config));
                  const numericValues = selectedConfigs.map((config) => row.getNumeric?.(config) ?? null);
                  const finiteValues = numericValues.filter((value): value is number => value !== null);
                  const min = finiteValues.length ? Math.min(...finiteValues) : 0;
                  const max = finiteValues.length ? Math.max(...finiteValues) : 0;

                  return (
                    <tr key={row.key} className="border-b border-white/10">
                      <td className="sticky left-0 z-10 bg-[#0B0B0C]/85 px-4 py-3 align-top text-[#F5F5F7]">
                        <div className="text-sm font-medium">{row.label}</div>
                        {row.tooltip && (
                          <div className="mt-1 text-xs text-[#A1A1AA]">{row.tooltip}</div>
                        )}
                      </td>
                      {selectedConfigs.map((config, index) => {
                        const value = values[index];
                        const numeric = numericValues[index];
                        const heat = row.getNumeric
                          ? savedHeatClass(numeric, row.better, min, max)
                          : "bg-white/5";
                        const display =
                          typeof value === "number"
                            ? row.unit === "€"
                              ? fmt(value)
                              : `${value}${row.unit ? ` ${row.unit}` : ""}`
                            : value ?? "—";
                        return (
                          <td
                            key={`${config.id}-${row.key}`}
                            className={`px-4 py-3 align-top text-[#F5F5F7] ${heat} ${
                              pinnedId === config.id ? "ring-1 ring-[#4F8BF7]/40" : ""
                            }`}
                          >
                            {display}
                            {row.better && numeric !== null && max !== min && (
                              <div className="mt-1 text-xs text-[#A1A1AA]">
                                {row.better === "higher" ? "Plus élevé est mieux" : "Plus bas est mieux"}
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="pointer-events-none fixed bottom-6 left-1/2 z-50 w-full max-w-4xl -translate-x-1/2 px-4"
          >
            <div className="pointer-events-auto rounded-2xl border border-white/10 bg-[#0C0C0E]/95 px-6 py-4 shadow-2xl backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm text-[#F5F5F7]" aria-live="polite">
                  Sélection {selectedIds.length}/{selectionLimit}
                </div>
                <div className="flex flex-1 items-center gap-3 overflow-x-auto">
                  {selectedConfigs.map((config) => (
                    <div
                      key={config.id}
                      className={`flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${
                        pinnedId === config.id ? "border-[#4F8BF7] text-[#F5F5F7]" : "border-white/10 text-[#A1A1AA]"
                      }`}
                    >
                      <span>{config.name}</span>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => setPinnedId((current) => (current === config.id ? null : config.id))}
                          className={`text-[#52525b] transition-colors hover:text-[#4F8BF7] ${
                            pinnedId === config.id ? "text-[#4F8BF7]" : ""
                          }`}
                          aria-label={`Définir ${config.name} comme référence`}
                        >
                          <Pin className="h-3 w-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemove(config.id)}
                          className="text-[#52525b] hover:text-red-400"
                          aria-label={`Retirer ${config.name}`}
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleScrollToTable}
                    className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#4F8BF7]/30"
                  >
                    Ouvrir la comparaison
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function extractComponent(configuration: Configuration, key: ConfigKey): ComponentWithDetails | undefined {
  const map = configuration.config as Partial<Record<ConfigKey, ComponentWithDetails | null>> | undefined;
  const component = map?.[key];
  return component ?? undefined;
}

function computeAveragePerformance(configuration: Configuration): number {
  const parts = CONFIG_SECTIONS.map(({ key }) => extractComponent(configuration, key)).filter(Boolean) as ComponentWithDetails[];
  if (parts.length === 0) {
    return 0;
  }
  const total = parts.reduce((acc, comp) => acc + (comp.performance ?? 0), 0);
  return Math.round(total / parts.length);
}

function getTotalPrice(configuration: Configuration): number {
  if (typeof configuration.totalPrice === "number") {
    return configuration.totalPrice;
  }
  const parts = CONFIG_SECTIONS.map(({ key }) => extractComponent(configuration, key)).filter(Boolean) as ComponentWithDetails[];
  return parts.reduce((sum, component) => sum + (component.price ?? 0), 0);
}
