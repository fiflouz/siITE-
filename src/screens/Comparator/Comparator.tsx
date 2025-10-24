import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "../../components/Layout";
import { Plus, X, Check, Cpu } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { getComponentsWithDetails, type ComponentWithDetails } from "../../data/componentsData";
import { fmt } from "../../utils/priceFetcher";

interface ConfigOption {
  key: string;
  id: string;
  name: string;
  price: number;
  specs: {
    cpu: string;
    motherboard: string;
    gpu: string;
    ram: string;
    storage: string;
    psu: string;
  };
  performance: number;
  origin?: "preset" | "saved" | "component";
  meta?: {
    description?: string;
    tags?: string[];
    isPublic?: boolean;
    createdAt?: string;
    sourceLabel?: string;
    componentCategory?: string;
  };
}

const createEmptySpecs = (): ConfigOption["specs"] => ({
  cpu: "—",
  motherboard: "—",
  gpu: "—",
  ram: "—",
  storage: "—",
  psu: "—",
});

const specLabels: { key: keyof ConfigOption["specs"]; label: string }[] = [
  { key: "cpu", label: "Processeur" },
  { key: "gpu", label: "Carte Graphique" },
  { key: "ram", label: "Mémoire RAM" },
  { key: "storage", label: "Stockage" },
  { key: "psu", label: "Alimentation" },
  { key: "motherboard", label: "Carte Mère" },
];

const presets: ConfigOption[] = [
  {
    key: "preset:starter",
    id: "preset-starter",
    name: "Gaming Starter",
    price: 799,
    specs: {
      cpu: "Intel Core i5-13400F",
      motherboard: "ASUS Prime B760-PLUS",
      gpu: "NVIDIA RTX 4060",
      ram: "16GB DDR4 3200MHz",
      storage: "500GB NVMe Gen4",
      psu: "550W 80+ Bronze",
    },
    performance: 65,
    origin: "preset",
    meta: {
      description: "Une base équilibrée pour jouer en 1080p sans se ruiner.",
      tags: ["1080p", "Budget"],
    },
  },
  {
    key: "preset:pro",
    id: "preset-pro",
    name: "Gaming Pro",
    price: 1499,
    specs: {
      cpu: "AMD Ryzen 7 7700X",
      motherboard: "MSI PRO B650-P",
      gpu: "NVIDIA RTX 4070 SUPER",
      ram: "32GB DDR5 6000MHz",
      storage: "1TB NVMe Gen4",
      psu: "750W 80+ Gold",
    },
    performance: 85,
    origin: "preset",
    meta: {
      description: "Pensé pour le 1440p à haut taux de rafraîchissement.",
      tags: ["1440p", "Streaming"],
    },
  },
  {
    key: "preset:elite",
    id: "preset-elite",
    name: "Gaming Elite",
    price: 2999,
    specs: {
      cpu: "AMD Ryzen 9 7950X3D",
      motherboard: "ASUS ROG Strix X670E",
      gpu: "NVIDIA RTX 4090",
      ram: "64GB DDR5 6400MHz",
      storage: "2TB NVMe Gen4",
      psu: "1000W 80+ Platinum",
    },
    performance: 100,
    origin: "preset",
    meta: {
      description: "Le top pour jouer en 4K ou créer du contenu sans compromis.",
      tags: ["4K", "Création"],
    },
  },
];

const formatPerformance = (value: number) => {
  if (!Number.isFinite(value)) return 0;
  if (value < 0) return 0;
  if (value > 100) return 100;
  return Math.round(value);
};

const mapSavedConfiguration = (saved: any): ConfigOption | null => {
  const payload = saved?.config ?? {};
  const summary = typeof payload?.summary === "object" && payload.summary !== null ? payload.summary : {};
  const components = Array.isArray(payload?.components) ? payload.components : [];
  const specs = createEmptySpecs();

  components.forEach((entry: any) => {
    const slot = entry?.slot as keyof ConfigOption["specs"] | undefined;
    const component = entry?.component as ComponentWithDetails | undefined;
    if (!slot || !(slot in specs)) return;
    if (!component) return;
    const name = component.name ?? component.brand ?? "—";

    switch (slot) {
      case "cpu":
        specs.cpu = name;
        break;
      case "gpu":
        specs.gpu = name;
        break;
      case "ram":
        specs.ram = component.capacity ? `${name} · ${component.capacity}GB` : name;
        break;
      case "storage":
        specs.storage = name;
        break;
      case "psu":
        specs.psu = name;
        break;
      case "motherboard":
        specs.motherboard = name;
        break;
      default:
        break;
    }
  });

  const totalPrice = typeof summary?.totalPrice === "number" ? summary.totalPrice : saved.totalPrice;
  const performance = formatPerformance(
    typeof summary?.performance === "number" ? summary.performance : saved.totalPrice > 0 ? saved.totalPrice / 25 : 0,
  );

  return {
    key: `saved:${saved.id}`,
    id: saved.id,
    name: saved.name ?? "Configuration",
    price: Math.round(totalPrice ?? 0),
    specs,
    performance,
    origin: "saved",
    meta: {
      description: payload?.metadata?.description,
      tags: Array.isArray(payload?.metadata?.tags) ? payload.metadata.tags : undefined,
      isPublic: Boolean(payload?.metadata?.isPublic),
      createdAt: saved.createdAt,
      sourceLabel: typeof payload?.mode === "string" ? payload.mode.toUpperCase() : undefined,
    },
  };
};

const mapCpuToConfig = (component: ComponentWithDetails): ConfigOption => {
  const specs = createEmptySpecs();
  specs.cpu = component.name;
  specs.motherboard = component.socket ? `Socket ${component.socket}` : "—";
  specs.ram = component.ramType ? `RAM ${component.ramType}` : "—";
  specs.psu = component.wattage ? `${component.wattage}W recommandés` : "—";

  return {
    key: `component:${component.id}`,
    id: component.id,
    name: component.name,
    price: Math.round(component.price ?? 0),
    specs,
    performance: formatPerformance(component.performance ?? 0),
    origin: "component",
    meta: {
      description: component.description,
      componentCategory: "Processeur",
      tags: component.ramType ? [component.ramType] : undefined,
    },
  };
};

export const Comparator = () => {
  const { user } = useAuth();
  const [selectedConfigs, setSelectedConfigs] = useState<ConfigOption[]>([]);

  const savedConfigOptions = useMemo(() => {
    if (!user?.savedConfigurations) return [] as ConfigOption[];
    return user.savedConfigurations
      .map((saved) => mapSavedConfiguration(saved))
      .filter((entry): entry is ConfigOption => Boolean(entry));
  }, [user?.savedConfigurations]);

  const cpuComponentOptions = useMemo(() => {
    return getComponentsWithDetails("cpu")
      .slice(0, 8)
      .map(mapCpuToConfig);
  }, []);

  const selectedKeys = useMemo(() => new Set(selectedConfigs.map((config) => config.key)), [selectedConfigs]);

  const availableSaved = useMemo(
    () => savedConfigOptions.filter((config) => !selectedKeys.has(config.key)),
    [savedConfigOptions, selectedKeys],
  );

  const availablePresets = useMemo(
    () => presets.filter((config) => !selectedKeys.has(config.key)),
    [selectedKeys],
  );

  const availableComponents = useMemo(
    () => cpuComponentOptions.filter((config) => !selectedKeys.has(config.key)),
    [cpuComponentOptions, selectedKeys],
  );

  const addConfig = (config: ConfigOption) => {
    if (selectedConfigs.length >= 3) return;
    if (selectedKeys.has(config.key)) return;
    setSelectedConfigs((prev) => [...prev, config]);
  };

  const removeConfig = (key: string) => {
    setSelectedConfigs((prev) => prev.filter((config) => config.key !== key));
  };

  const bestValueConfig = useMemo(() => {
    if (selectedConfigs.length === 0) {
      return null;
    }

    return selectedConfigs.reduce((best, current) => {
      const bestRatio = best.price > 0 ? best.performance / best.price : 0;
      const currentRatio = current.price > 0 ? current.performance / current.price : 0;
      return currentRatio > bestRatio ? current : best;
    }, selectedConfigs[0]);
  }, [selectedConfigs]);

  const renderOptionCard = (config: ConfigOption) => {
    const isComponent = config.origin === "component";
    const isSaved = config.origin === "saved";

    return (
      <motion.div
        key={config.key}
        whileHover={{ y: -4 }}
        onClick={() => addConfig(config)}
        className="relative flex h-full cursor-pointer flex-col gap-4 rounded-2xl border border-white/10 bg-[#1a1a1a]/80 p-6 transition-all hover:border-[#4F8BF7]/50"
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#4F8BF7]">
              {isSaved ? "Config sauvegardée" : isComponent ? "Composant" : "Config recommandée"}
            </span>
            <h3 className="text-lg font-bold text-[#F5F5F7] leading-tight">{config.name}</h3>
          </div>
          <Plus className="h-5 w-5 text-[#4F8BF7]" />
        </div>

        <div className="flex flex-col gap-3 text-sm text-[#A1A1AA]">
          <div className="flex items-baseline justify-between">
            <span>Prix estimé</span>
            <span className="text-xl font-semibold text-[#F5F5F7]">{fmt(config.price)}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <span>Performance</span>
            <span className="font-semibold text-[#F5F5F7]">{config.performance}%</span>
          </div>
        </div>

        {config.meta?.description && (
          <p className="line-clamp-2 text-sm text-[#A1A1AA]">{config.meta.description}</p>
        )}

        {config.meta?.tags && config.meta.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 text-[11px]">
            {config.meta.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-[#74A3FF]">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {isComponent && (
          <div className="flex items-center gap-2 text-xs text-[#A1A1AA]">
            <Cpu className="h-4 w-4" />
            <span>{config.meta?.componentCategory ?? "—"}</span>
          </div>
        )}

        {isSaved && config.meta?.createdAt && (
          <div className="mt-auto text-xs text-[#80808A]">
            Sauvegardée le {new Date(config.meta.createdAt).toLocaleDateString("fr-FR")}
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-[#F5F5F7] mb-4">Comparateur de Configurations</h1>
          <p className="text-lg text-[#A1A1AA]">
            Ajoute tes configurations sauvegardées ou explore nos suggestions pour les comparer côte à côte.
          </p>
        </motion.div>

        {selectedConfigs.length < 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 space-y-10"
          >
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#F5F5F7]">Mes configurations sauvegardées</h2>
                <span className="text-xs uppercase tracking-[0.3em] text-[#A1A1AA]">
                  {availableSaved.length}/{savedConfigOptions.length}
                </span>
              </div>
              {savedConfigOptions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/10 bg-[#111113]/60 p-8 text-sm text-[#A1A1AA]">
                  Sauvegarde une configuration depuis le configurateur pour la retrouver ici.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {availableSaved.length === 0 ? (
                    <div className="rounded-2xl border border-white/10 bg-[#111113]/60 p-6 text-sm text-[#A1A1AA]">
                      Toutes tes configurations sauvegardées sont déjà sélectionnées.
                    </div>
                  ) : (
                    availableSaved.map(renderOptionCard)
                  )}
                </div>
              )}
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#F5F5F7]">Nos recommandations</h2>
                <span className="text-xs uppercase tracking-[0.3em] text-[#A1A1AA]">
                  Choisis jusqu'à 3 configurations
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {availablePresets.map(renderOptionCard)}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#F5F5F7]">Comparer avec un processeur</h2>
                <span className="text-xs uppercase tracking-[0.3em] text-[#A1A1AA]">
                  Aperçu rapide CPU
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {availableComponents.map(renderOptionCard)}
              </div>
            </div>
          </motion.div>
        )}

        {selectedConfigs.length > 0 ? (
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
                      <th key={config.key} className="p-6 text-center relative min-w-[220px] align-top">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeConfig(config.key)}
                          className="absolute top-4 right-4 p-1 rounded-full bg-[#0E0E10] hover:bg-red-500/20 transition-all"
                        >
                          <X className="w-4 h-4 text-[#A1A1AA] hover:text-red-500" />
                        </motion.button>
                        <div className="text-xs uppercase tracking-[0.3em] text-[#6B9CFF] mb-1">
                          {config.origin === "saved"
                            ? config.meta?.sourceLabel ?? "CONFIG"
                            : config.origin === "component"
                            ? config.meta?.componentCategory ?? "COMPOSANT"
                            : "PRESET"}
                        </div>
                        <div className="text-xl font-bold text-[#F5F5F7] leading-tight mb-1">
                          {config.name}
                        </div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] bg-clip-text text-transparent">
                          {fmt(config.price)}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/5">
                    <td className="p-6 text-[#A1A1AA] font-medium">Performance</td>
                    {selectedConfigs.map((config) => (
                      <td key={`${config.key}-perf`} className="p-6 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-lg font-bold text-[#F5F5F7]">{config.performance}%</span>
                          <div className="w-full h-2 bg-[#0E0E10] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF]"
                              style={{ width: `${config.performance}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {specLabels.map((spec) => (
                    <tr key={spec.key} className="border-b border-white/5">
                      <td className="p-6 text-[#A1A1AA] font-medium">{spec.label}</td>
                      {selectedConfigs.map((config) => (
                        <td key={`${config.key}-${spec.key}`} className="p-6 text-center text-[#F5F5F7]">
                          {config.specs[spec.key] ?? "—"}
                        </td>
                      ))}
                    </tr>
                  ))}

                  <tr>
                    <td className="p-6 text-[#A1A1AA] font-medium">Meilleur rapport</td>
                    {selectedConfigs.map((config) => {
                      const isBest = bestValueConfig?.key === config.key;
                      return (
                        <td key={`${config.key}-best`} className="p-6 text-center">
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
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-[#111113]/60 py-24 text-center text-[#A1A1AA]">
            Sélectionne des configurations ou des composants pour commencer la comparaison.
          </div>
        )}
      </div>
    </Layout>
  );
};
