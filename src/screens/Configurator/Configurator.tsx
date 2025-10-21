import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "../../components/Layout";
import { componentsByCategory, Category } from "../../data/componentsData";
import type { Catalog, CPU, GPU, MemoryKit, SSD, Chipset } from "../../data/catalogueTypes";
import { ComponentDetailModal } from "../../components/ComponentDetailModal";
import { fetchBestPrices, fmt, QuoteInput } from "../../utils/priceFetcher";
import { useAuth } from "../../contexts/AuthContext";
import {
  Cpu,
  Zap,
  HardDrive,
  MemoryStick,
  Monitor,
  Download,
  Share2,
  Check,
  AlertCircle,
  TrendingUp,
  Trash2,
  Save,
  Sparkles,
  Settings,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Info,
  X
} from "lucide-react";


// Utilisation typée du catalogue matériel
type Component = CPU | GPU | MemoryKit | SSD | Chipset;

interface ConfigState {
  cpu: Component | null;
  gpu: Component | null;
  ram: Component | null;
  storage: Component | null;
  psu: Component | null;
  motherboard: Component | null;
}

type ConfigStep = keyof ConfigState;

export const Configurator = () => {
  const { user, isLoggedIn, saveConfiguration } = useAuth();
  const [mode, setMode] = useState<"choice" | "ai" | "manual">("choice");
  const [config, setConfig] = useState<ConfigState>({
    cpu: null,
    gpu: null,
    ram: null,
    storage: null,
    psu: null,
    motherboard: null
  });

  // Exemple d'accès aux CPUs du catalogue :
  // const cpuList = componentsByCategory.cpus;
  // const gpuList = componentsByCategory.gpus;
  // const ramList = componentsByCategory.memory_kits;
  // const ssdList = componentsByCategory.ssds;
  // const chipsetList = componentsByCategory.chipsets;
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [configName, setConfigName] = useState("");
  const [configDescription, setConfigDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Step-by-step configuration state
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showCompatibilityAlert, setShowCompatibilityAlert] = useState(false);
  const [compatibilityMessage, setCompatibilityMessage] = useState("");

  // AI Questionnaire State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [showResults, setShowResults] = useState(false);

  // Price Fetcher States
  const [priceMap, setPriceMap] = useState<Record<string, { ttc: number; vendor?: string; url?: string; fetchedAt: string; source: string }>>({});
  const [pricesLoading, setPricesLoading] = useState(false);
  const [pricesErr, setPricesErr] = useState<string | null>(null);

  // Component Detail Modal State
  const [selectedComponentForDetail, setSelectedComponentForDetail] = useState<Component | null>(null);

  // Define configuration steps in order
  const configurationSteps: { key: ConfigStep; name: string; icon: any; color: string; category: Category }[] = [
    { key: "cpu", name: "Processeur", icon: Cpu, color: "from-blue-500 to-cyan-500", category: "cpu" },
    { key: "motherboard", name: "Carte Mère", icon: Cpu, color: "from-orange-500 to-red-500", category: "motherboard" },
    { key: "ram", name: "Mémoire RAM", icon: MemoryStick, color: "from-purple-500 to-pink-500", category: "ram" },
    { key: "gpu", name: "Carte Graphique", icon: Monitor, color: "from-green-500 to-emerald-500", category: "gpu" },
    { key: "storage", name: "Stockage", icon: HardDrive, color: "from-yellow-500 to-orange-500", category: "storage" },
    { key: "psu", name: "Alimentation", icon: Zap, color: "from-red-500 to-pink-500", category: "psu" },
  ];

  const currentStepConfig = configurationSteps[currentStep];

  // Memoized payload for price fetching API
  const partsPayload = useMemo<QuoteInput["parts"]>(() => ({
    CPU: config.cpu?.name,
    GPU: config.gpu?.name,
    "Carte_mère": config.motherboard?.name,
    RAM: config.ram?.name,
    Stockage: config.storage?.name ? [config.storage.name] : []
  }), [config]);

  const hints = useMemo(() => ({
    "AMD Ryzen 7 7800X3D": ["https://www.ldlc.com/fiche/PB00583284.html"],
  }), []);

  // Effect to fetch prices automatically when partsPayload changes
  useEffect(() => {
    let cancel = false;
    (async () => {
      setPricesLoading(true);
      setPricesErr(null);
      try {
        const hasSelectedComponents = Object.values(partsPayload).some(value =>
          (Array.isArray(value) && value.length > 0) || (typeof value === 'string' && value !== null && value !== undefined)
        );

        if (!hasSelectedComponents) {
          if (!cancel) {
            setPriceMap({});
            setPricesErr(null);
          }
          return;
        }

        const resp = await fetchBestPrices(partsPayload, hints);
        const map: Record<string, { ttc: number; vendor?: string; url?: string; fetchedAt: string; source: string }> = {};
        resp.parts.forEach(p => {
          if (p.best) {
            map[p.name] = {
              ttc: p.best.priceTTC + (p.best.shipping ?? 0),
              vendor: p.best.vendor,
              url: p.best.url,
              fetchedAt: resp.generatedAt,
              source: p.best.source
            };
          }
        });
        if (!cancel) setPriceMap(map);
      } catch (error: any) {
        console.error("Error fetching prices:", error);
        if (!cancel) setPricesErr(error.message || "Impossible de vérifier les prix. Affichage des prix par défaut.");
      } finally {
        if (!cancel) setPricesLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, [partsPayload, hints]);

  // Get filtered components based on compatibility
  const getFilteredComponents = (step: ConfigStep): Component[] => {
    let components = getComponentsWithDetails(currentStepConfig.category);

    // Apply compatibility filters based on previous selections
    if (step === "motherboard" && config.cpu) {
      components = components.filter(mb => mb.socket === config.cpu?.socket);
    }

    if (step === "ram" && config.motherboard) {
      components = components.filter(ram =>
        ram.type && config.motherboard?.ramType?.includes(ram.type)
      );
    }

    if (step === "psu") {
      const totalWattage = calculateTotalWattage(config);
      components = components.filter(psu =>
        psu.power && psu.power >= totalWattage * 1.2
      );
    }

    return components;
  };

  const selectComponent = (component: Component) => {
    const newConfig = { ...config, [currentStepConfig.key]: component };
    setConfig(newConfig);

    // Auto-advance to next step after selection
    if (currentStep < configurationSteps.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 300);
    }
  };

  const goToNextStep = () => {
    if (currentStep < configurationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const removeComponent = (step: ConfigStep) => {
    setConfig(prev => ({ ...prev, [step]: null }));
  };

  const calculateTotalWattage = (cfg: ConfigState) => {
    return Object.values(cfg).reduce((sum, component) => {
      let componentWattage = component?.wattage || 0;
      if (component?.name && (component.name.includes("Carte Mère") || component.name.includes("RAM")) && componentWattage === 0) {
        componentWattage = 20;
      }
      return sum + componentWattage;
    }, 0);
  };

  const getTotalPrice = () => {
    return Object.values(config).reduce((sum, component) => {
      return sum + (component?.price || 0);
    }, 0);
  };

  const getPerformanceScore = () => {
    const components = Object.values(config).filter(c => c !== null);
    if (components.length === 0) return 0;

    const totalPerformance = components.reduce((sum, component) => {
      return sum + (component?.performance || 0);
    }, 0);

    return Math.round(totalPerformance / components.length);
  };

  const getCompletionPercentage = () => {
    const totalComponents = Object.keys(config).length;
    const selectedComponents = Object.values(config).filter(c => c !== null).length;
    return Math.round((selectedComponents / totalComponents) * 100);
  };

  const clearConfiguration = () => {
    setConfig({
      cpu: null,
      gpu: null,
      ram: null,
      storage: null,
      psu: null,
      motherboard: null
    });
    setCurrentStep(0);
  };

  const totalTTC = useMemo(() => {
    const rows = [
      { name: config.cpu?.name, fallback: config.cpu?.price ?? 0 },
      { name: config.gpu?.name, fallback: config.gpu?.price ?? 0 },
      { name: config.motherboard?.name, fallback: config.motherboard?.price ?? 0 },
      { name: config.ram?.name, fallback: config.ram?.price ?? 0 },
      { name: config.storage?.name, fallback: config.storage?.price ?? 0 },
      { name: config.psu?.name, fallback: config.psu?.price ?? 0 },
    ];
    return rows.reduce((s, r) => s + (priceMap[r.name || '']?.ttc ?? r.fallback), 0);
  }, [priceMap, config]);

  const generateAIConfig = () => {
    const budget = answers.budget || 1500;
    const usage = answers.usage || "gaming";
    const resolution = answers.resolution || "1080p";
    const fps = answers.fps || "60";
    const storagePref = answers.storage || "1000";

    let tempConfig: ConfigState = {
      cpu: null, gpu: null, motherboard: null,
      ram: null, storage: null, psu: null
    };

    const selectionOrder: { category: Category; budgetShare: number; getScore: (c: Component) => number; }[] = [
      {
        category: "gpu", budgetShare: 0.35, getScore: (gpu: Component) => {
          let score = gpu.performance;
          if (resolution === "4k") score += 20;
          if (fps === "144+") score += 15;
          return score;
        }
      },
      {
        category: "cpu", budgetShare: 0.25, getScore: (cpu: Component) => {
          let score = cpu.performance;
          if (usage === "creation" || usage === "streaming") score += (cpu.specs.filter(s => s.includes("C/")).length || 0) * 5;
          return score;
        }
      },
      { category: "motherboard", budgetShare: 0.15, getScore: (mb: Component) => mb.performance },
      {
        category: "ram", budgetShare: 0.10, getScore: (ram: Component) => {
          let score = ram.performance;
          if (usage === "creation" || usage === "streaming") score += (ram.capacity || 0) / 2;
          return score;
        }
      },
      {
        category: "storage", budgetShare: 0.08, getScore: (storage: Component) => {
          let score = storage.performance;
          if (storagePref === "2000" && storage.name.includes("2TB")) score += 10;
          if (storagePref === "4000" && storage.name.includes("4TB")) score += 15;
          return score;
        }
      },
      { category: "psu", budgetShare: 0.07, getScore: (psu: Component) => 1 / psu.price }
    ];

    const findBestComponent = (
      categoryKey: Category,
      maxPrice: number,
      getScore: (c: Component) => number,
      currentPartialConfig: ConfigState
    ): Component | null => {
      let candidates = getComponentsWithDetails(categoryKey).filter(c => c.price <= maxPrice);

      if (categoryKey === "motherboard" && currentPartialConfig.cpu) {
        candidates = candidates.filter(mb => mb.socket === currentPartialConfig.cpu?.socket);
      }
      if (categoryKey === "ram" && currentPartialConfig.motherboard) {
        candidates = candidates.filter(r => r.type && currentPartialConfig.motherboard?.ramType?.includes(r.type));
        if (usage === "creation" || usage === "streaming") {
          candidates = candidates.filter(r => r.capacity && r.capacity >= 32);
        } else {
          candidates = candidates.filter(r => r.capacity && r.capacity >= 16);
        }
      }
      if (categoryKey === "cpu" && currentPartialConfig.gpu) {
        candidates = candidates.filter(c => c.performance >= (currentPartialConfig.gpu?.performance || 0) * 0.7);
      }
      if (categoryKey === "gpu") {
        if (resolution === "4k" || fps === "144+") {
          candidates = candidates.filter(g => g.performance >= 85);
        } else if (resolution === "1440p" || fps === "120") {
          candidates = candidates.filter(g => g.performance >= 75);
        }
      }
      if (categoryKey === "storage") {
        if (storagePref === "2000" || storagePref === "4000") {
          candidates = candidates.filter(s => s.name.includes("2TB") || s.name.includes("4TB"));
        } else if (storagePref === "1000") {
          candidates = candidates.filter(s => s.name.includes("1TB"));
        }
      }
      if (categoryKey === "psu") {
        const estimatedWattage = calculateTotalWattage(currentPartialConfig);
        candidates = candidates.filter(p => p.power && p.power >= estimatedWattage * 1.2);
      }

      return [...candidates].sort((a, b) => getScore(b) - getScore(a))[0] || null;
    };

    for (const { category, budgetShare, getScore } of selectionOrder) {
      const allocatedBudget = budget * budgetShare;
      const selectedComponent = findBestComponent(category, allocatedBudget, getScore, tempConfig);

      if (selectedComponent) {
        const key = category as keyof ConfigState;
        tempConfig = { ...tempConfig, [key]: selectedComponent };
      }
    }

    const finalEstimatedWattage = calculateTotalWattage(tempConfig);
    let finalPsuCandidates = getComponentsWithDetails("psu").filter(p => p.power && p.power >= finalEstimatedWattage * 1.2);
    tempConfig.psu = [...finalPsuCandidates].sort((a, b) => a.price - b.price)[0] || getComponentsWithDetails("psu")[0];

    setConfig(tempConfig);
    setShowResults(true);
  };

  // Save configuration function
  const handleSaveConfiguration = async () => {
    if (!isLoggedIn) {
      setSaveModalOpen(false);
      // Trigger auth modal opening (handled by parent)
      return;
    }

    if (!configName.trim()) {
      setError("Veuillez entrer un nom pour la configuration.");
      return;
    }

    if (configName.length < 3) {
      setError("Le nom doit contenir au moins 3 caractères.");
      return;
    }

    if (totalTTC === 0) {
      setError("Aucun composant sélectionné à sauvegarder.");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      const configToSave = {
        cpu: config.cpu,
        gpu: config.gpu,
        motherboard: config.motherboard,
        ram: config.ram,
        storage: config.storage,
        psu: config.psu
      };

      const configId = await saveConfiguration(
        configToSave,
        configName.trim(),
        configDescription.trim() || undefined
      );

      // Success feedback
      setSuccess(`Configuration "${configName}" sauvegardée avec succès !`);

      // Reset form and close modal after delay
      setTimeout(() => {
        setSaveModalOpen(false);
        setConfigName("");
        setConfigDescription("");
        setSuccess("");
        setError("");
      }, 2000);

    } catch (error) {
      console.error('Save error:', error);
      setError("Une erreur est survenue lors de la sauvegarde.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-8 pt-32 pb-20">
        {/* Mode Selection */}
        {mode === "choice" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <h1 className="text-5xl font-bold text-[#F5F5F7] mb-4">
                Configurateur PC
              </h1>
              <p className="text-lg text-[#A1A1AA]">
                Choisissez votre méthode de configuration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* AI Mode */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setMode("ai")}
                className="relative bg-gradient-to-br from-[#4F8BF7]/20 to-[#6B9CFF]/20 rounded-2xl p-8 border border-[#4F8BF7]/30 cursor-pointer overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(79,139,247,0.05)_25%,rgba(79,139,247,0.05)_50%,transparent_50%,transparent_75%,rgba(79,139,247,0.05)_75%)] bg-[length:20px_20px]" />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#4F8BF7] to-[#6B9CFF] rounded-2xl flex items-center justify-center mb-6">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#F5F5F7] mb-3">
                    Configuration IA
                  </h3>
                  <p className="text-[#A1A1AA] mb-6">
                    Répondez à quelques questions et laissez notre IA vous proposer la configuration parfaite adaptée à vos besoins et votre budget.
                  </p>
                  <div className="flex items-center gap-2 text-[#4F8BF7] font-semibold">
                    <span>Commencer le questionnaire</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </motion.div>

              {/* Manual Mode */}
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => setMode("manual")}
                className="relative bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10 cursor-pointer group"
              >
                <div className="w-16 h-16 bg-[#0E0E10] border border-white/10 rounded-2xl flex items-center justify-center mb-6">
                  <Settings className="w-8 h-8 text-[#4F8BF7]" />
                </div>
                <h3 className="text-2xl font-bold text-[#F5F5F7] mb-3">
                  Configuration Manuelle
                </h3>
                <p className="text-[#A1A1AA] mb-6">
                  Sélectionnez vous-même chaque composant étape par étape avec vérification automatique de compatibilité.
                </p>
                <div className="flex items-center gap-2 text-[#4F8BF7] font-semibold">
                  <span>Choisir mes composants</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

{/* AI Questionnaire Mode */}
{
  mode === "ai" && !showResults && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setMode("choice")}
          className="px-4 py-2 bg-[#1a1a1a] border border-white/10 text-[#A1A1AA] rounded-lg text-sm hover:text-[#F5F5F7] transition-all"
        >
          ← Retour
        </motion.button>
      </div>

      <div className="text-center p-8">
        <h3 className="text-xl font-bold text-[#F5F5F7] mb-4">Assistant IA temporairement indisponible</h3>
        <p className="text-[#A1A1AA]">Correction des conflits de fusion en cours...</p>
      </div>
    </motion.div>
  )
}

{/* AI Results or Manual Step-by-Step Mode */ }
{
  (mode === "manual" || (mode === "ai" && showResults)) && (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setMode("choice");
                if (mode === "ai") {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                }
              }}
              className="px-4 py-2 bg-[#1a1a1a] border border-white/10 text-[#A1A1AA] rounded-lg text-sm hover:text-[#F5F5F7] transition-all mb-4"
            >
              ← Retour
            </motion.button>
            <h1 className="text-5xl font-bold text-[#F5F5F7] mb-4">
              {mode === "ai" ? "Configuration IA Recommandée" : "Configuration Étape par Étape"}
            </h1>
            <p className="text-lg text-[#A1A1AA]">
              {mode === "ai"
                ? "Voici la configuration optimale basée sur vos réponses"
                : `Étape ${currentStep + 1} sur ${configurationSteps.length} : ${currentStepConfig.name}`}
            </p>
          </div>

          {/* Completion Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="relative w-24 h-24">
              <svg className="w-24 h-24 transform -rotate-90">
                <circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-[#1a1a1a]"
                />
                <motion.circle
                  cx="48"
                  cy="48"
                  r="40"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "251.2 251.2", strokeDashoffset: 251.2 }}
                  animate={{
                    strokeDashoffset: 251.2 - (251.2 * getCompletionPercentage()) / 100
                  }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4F8BF7" />
                    <stop offset="100%" stopColor="#6B9CFF" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-[#F5F5F7]">
                  {getCompletionPercentage()}%
                </span>
              </div>
            </div>
            <span className="text-xs text-[#A1A1AA] font-medium">Complété</span>
          </motion.div>
        </div>

        {/* Progress Steps - Only for Manual Mode */}
        {mode === "manual" && (
          <div className="flex items-center justify-between mb-8">
            {configurationSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = config[step.key] !== null;
              const isCurrent = index === currentStep;
              const isPast = index < currentStep;

              return (
                <React.Fragment key={step.key}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setCurrentStep(index)}
                    className={`flex flex-col items-center gap-2 cursor-pointer ${isCurrent ? 'opacity-100' : isPast ? 'opacity-70' : 'opacity-40'
                      }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all ${isCompleted
                        ? 'bg-[#4F8BF7] border-[#4F8BF7]'
                        : isCurrent
                          ? 'bg-[#1a1a1a] border-[#4F8BF7]'
                          : 'bg-[#1a1a1a] border-white/10'
                      }`}>
                      {isCompleted ? (
                        <Check className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className={`w-6 h-6 ${isCurrent ? 'text-[#4F8BF7]' : 'text-[#A1A1AA]'}`} />
                      )}
                    </div>
                    <span className={`text-xs font-medium ${isCurrent ? 'text-[#F5F5F7]' : 'text-[#A1A1AA]'
                      }`}>
                      {step.name}
                    </span>
                  </motion.div>
                  {index < configurationSteps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 ${isPast ? 'bg-[#4F8BF7]' : 'bg-white/10'
                      }`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Compatibility Alert */}
      <AnimatePresence>
        {showCompatibilityAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-6 p-4 bg-orange-500/10 border border-orange-500/30 rounded-xl flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-orange-400" />
            <p className="text-sm text-orange-400">
              {compatibilityMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel - Component Selection (Manual Mode Only) */}
        {mode === "manual" && (
          <div className="lg:col-span-2 space-y-6">
            {/* Current Step Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-[#4F8BF7]/10 to-[#6B9CFF]/10 rounded-xl p-6 border border-[#4F8BF7]/30"
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${currentStepConfig.color} flex items-center justify-center`}>
                  <currentStepConfig.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#F5F5F7] mb-1">
                    Choisissez votre {currentStepConfig.name}
                  </h2>
                  <p className="text-[#A1A1AA] text-sm">
                    {currentStep === 0 && "Le processeur est le cerveau de votre PC"}
                    {currentStep === 1 && "La carte mère doit être compatible avec votre processeur"}
                    {currentStep === 2 && "La RAM doit correspondre au type supporté par votre carte mère"}
                    {currentStep === 3 && "La carte graphique détermine les performances gaming"}
                    {currentStep === 4 && "Le stockage pour votre système et vos jeux"}
                    {currentStep === 5 && "L'alimentation doit fournir assez de puissance"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Component List */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {getFilteredComponents(currentStepConfig.key).map((component, index) => {
                  const isSelected = config[currentStepConfig.key]?.id === component.id;

                  return (
                    <motion.div
                      key={component.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ y: -4 }}
                      onClick={() => selectComponent(component)}
                      className={`p-6 rounded-xl cursor-pointer transition-all relative overflow-hidden group ${isSelected
                          ? 'bg-[#4F8BF7]/20 border-2 border-[#4F8BF7] shadow-lg shadow-[#4F8BF7]/20'
                          : 'bg-[#1a1a1a] border border-white/10 hover:border-[#4F8BF7]/50'
                        }`}
                    >
                      {isSelected && (
                        <div className={`absolute inset-0 bg-gradient-to-br ${currentStepConfig.color} opacity-5`} />
                      )}

                      <div className="relative z-10">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center border ${isSelected ? 'bg-[#4F8BF7]/20 border-[#4F8BF7]' : 'bg-[#0E0E10] border-white/10'
                              }`}>
                              <currentStepConfig.icon className={`w-6 h-6 ${isSelected ? 'text-[#4F8BF7]' : 'text-[#A1A1AA]'}`} />
                            </div>
                            <div>
                              <span className="text-xs text-[#A1A1AA] uppercase tracking-wider">{component.brand}</span>
                              <h3 className="text-[#F5F5F7] font-semibold">{component.name}</h3>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-6 h-6 bg-[#4F8BF7] rounded-full flex items-center justify-center"
                              >
                                <Check className="w-4 h-4 text-white" />
                              </motion.div>
                            )}
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedComponentForDetail(component);
                              }}
                              className="p-1 rounded-full bg-[#0E0E10]/50 border border-white/10 hover:bg-[#4F8BF7]/20 transition-all opacity-0 group-hover:opacity-100"
                            >
                              <Info className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#4F8BF7]" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Specs */}
                        <div className="space-y-1 mb-4">
                          {component.specs.slice(0, 3).map((spec, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-[#A1A1AA]">
                              <div className="w-1 h-1 bg-[#4F8BF7] rounded-full" />
                              {spec}
                            </div>
                          ))}
                        </div>

                        {/* Performance Bar */}
                        <div className="mb-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-[#A1A1AA]">Performance</span>
                            <span className="text-xs font-semibold text-[#F5F5F7]">{component.performance}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#0E0E10] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${component.performance}%` }}
                              transition={{ duration: 0.5, delay: index * 0.05 }}
                              className={`h-full bg-gradient-to-r ${currentStepConfig.color}`}
                            />
                          </div>
                        </div>

                        {/* Price and Wattage */}
                        <div className="pt-3 border-t border-white/5">
                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-[#4F8BF7]">
                              {fmt(priceMap[component.name]?.ttc ?? component.price)}
                            </div>
                            {component.wattage && component.wattage > 0 && (
                              <div className="flex items-center gap-1 text-xs text-[#A1A1AA]">
                                <Zap className="w-3 h-3" />
                                {component.wattage}W
                              </div>
                            )}
                          </div>
                          {priceMap[component.name] && (
                            <div className="text-xs text-[#A1A1AA] mt-1">
                              via <a className="underline text-[#4F8BF7] hover:text-[#6B9CFF]" href={priceMap[component.name]?.url} target="_blank" rel="noopener noreferrer">
                                {priceMap[component.name]?.vendor}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToPreviousStep}
                disabled={currentStep === 0}
                className="px-6 py-3 bg-[#1a1a1a] border border-white/10 text-[#F5F5F7] rounded-lg font-semibold hover:bg-[#252525] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
                Précédent
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToNextStep}
                disabled={currentStep === configurationSteps.length - 1 || !config[currentStepConfig.key]}
                className="px-6 py-3 bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] text-white rounded-lg font-semibold shadow-lg shadow-[#4F8BF7]/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {currentStep === configurationSteps.length - 1 ? "Terminer" : "Suivant"}
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        )}

        {/* Right Panel - Configuration Summary */}
        <div className={mode === "ai" ? "lg:col-span-3" : "lg:col-span-1"}>
          <div className="sticky top-32 space-y-6">
            {/* Summary Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#F5F5F7]">Ma Configuration</h3>
                {Object.values(config).some(c => c !== null) && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={clearConfiguration}
                    className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </motion.button>
                )}
              </div>

              <div className="space-y-3 mb-6">
                {configurationSteps.map((step) => {
                  const component = config[step.key];
                  const Icon = step.icon;

                  return (
                    <motion.div
                      key={step.key}
                      className="flex items-center justify-between py-3 px-3 rounded-lg bg-[#0E0E10]/50 border border-white/5 hover:border-white/10 transition-all"
                      whileHover={{ x: 4 }}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <Icon className="w-4 h-4 text-[#A1A1AA] flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <span className="text-xs text-[#A1A1AA] block">{step.name}</span>
                          {component ? (
                            <span className="text-sm font-semibold text-[#F5F5F7] block truncate">
                              {component.name}
                            </span>
                          ) : (
                            <span className="text-xs text-[#A1A1AA] italic">Non sélectionné</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {component && (
                          <>
                            <span className="text-sm font-semibold text-[#F5F5F7]">
                              {component.price}€
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                removeComponent(step.key);
                              }}
                              className="p-1 rounded hover:bg-red-500/20 transition-all"
                            >
                              <Trash2 className="w-3 h-3 text-red-400" />
                            </motion.button>
                          </>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Stats */}
              <div className="space-y-4 mb-6 p-4 bg-[#0E0E10]/50 rounded-lg border border-white/5">
                {/* Total Price */}
                <div className="flex items-center justify-between">
                  <span className="text-[#A1A1AA]">Prix total estimé</span>
                  <div className="flex flex-col items-end">
                    <div className="text-3xl font-bold bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] bg-clip-text text-transparent">
                      {fmt(totalTTC)}
                    </div>
                    {pricesLoading && <div className="text-xs text-[#A1A1AA] mt-1">Vérification des prix…</div>}
                    {pricesErr && <div className="text-xs text-red-400 mt-1">{pricesErr}</div>}
                  </div>
                </div>

                {/* Performance Score */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#A1A1AA]" />
                      <span className="text-sm text-[#A1A1AA]">Performance globale</span>
                    </div>
                    <span className="text-sm font-semibold text-[#F5F5F7]">{getPerformanceScore()}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#0E0E10] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getPerformanceScore()}%` }}
                      transition={{ duration: 0.5 }}
                      className="h-full bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF]"
                    />
                  </div>
                </div>

                {/* Wattage */}
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-[#A1A1AA]" />
                    <span className="text-sm text-[#A1A1AA]">Consommation</span>
                  </div>
                  <span className="text-sm font-semibold text-[#F5F5F7]">{calculateTotalWattage(config)}W</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSaveModalOpen(true)}
                  disabled={totalTTC === 0}
                  className="w-full py-3 bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] text-white rounded-lg font-semibold shadow-lg shadow-[#4F8BF7]/30 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  Sauvegarder
                </motion.button>

                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={totalTTC === 0}
                    className="py-3 bg-[#0E0E10] border border-white/10 text-[#F5F5F7] rounded-lg font-semibold hover:bg-[#1a1a1a] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Download className="w-4 h-4" />
                    PDF
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={totalTTC === 0}
                    className="py-3 bg-[#0E0E10] border border-white/10 text-[#F5F5F7] rounded-lg font-semibold hover:bg-[#1a1a1a] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Share2 className="w-4 h-4" />
                    Partager
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Compatibility Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#4F8BF7]/10 border border-[#4F8BF7]/30 rounded-xl p-4"
            >
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-[#6B9CFF] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#6B9CFF] mb-1">
                    Compatibilité vérifiée
                  </p>
                  <p className="text-xs text-[#A1A1AA]">
                    Tous les composants sélectionnés sont compatibles entre eux
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
      </div >

  {/* Component Detail Modal */ }
  < ComponentDetailModal
component = { selectedComponentForDetail }
onClose = {() => setSelectedComponentForDetail(null)}
priceMap = { priceMap }
  />

  {/* Save Configuration Modal */ }
  <AnimatePresence>
{
  saveModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setSaveModalOpen(false)}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md mx-4"
      >
        <div className="bg-[#1a1a1a]/95 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-[#F5F5F7]">
              Sauvegarder la configuration
            </h2>
            <button
              onClick={() => setSaveModalOpen(false)}
              className="p-2 text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors rounded-lg hover:bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <div className="p-6 space-y-4">
            {!isLoggedIn ? (
              <div className="text-center py-4">
                <p className="text-[#A1A1AA] mb-4">
                  Vous devez être connecté pour sauvegarder une configuration.
                </p>
                <button
                  onClick={() => setSaveModalOpen(false)}
                  className="px-4 py-2 bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white rounded-lg font-semibold"
                >
                  Se connecter
                </button>
              </div>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-[#A1A1AA] mb-2">
                    Nom de la configuration
                  </label>
                  <input
                    type="text"
                    value={configName}
                    onChange={(e) => setConfigName(e.target.value)}
                    placeholder="Ma configuration gaming"
                    className="w-full px-4 py-3 bg-[#0E0E10] border border-white/10 rounded-lg text-[#F5F5F7] placeholder-[#A1A1AA] focus:border-[#4A90E2] focus:outline-none transition-colors"
                  />
                </div>

                <div className="bg-[#0E0E10] rounded-lg p-4">
                  <h3 className="text-sm font-medium text-[#F5F5F7] mb-2">Résumé</h3>
                  <div className="space-y-1 text-sm text-[#A1A1AA]">
                    <div>Composants: {Object.values(config).filter(Boolean).length}/6</div>
                    <div>Prix total: {fmt(totalTTC)}</div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSaveModalOpen(false)}
                    className="flex-1 py-3 bg-[#0E0E10] border border-white/10 text-[#F5F5F7] rounded-lg font-semibold hover:bg-[#1a1a1a] transition-all"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleSaveConfiguration}
                    disabled={!configName.trim() || totalTTC === 0}
                    className="flex-1 py-3 bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white rounded-lg font-semibold shadow-lg shadow-[#4A90E2]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Sauvegarder
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
      </AnimatePresence >
    </Layout >
  );
};
