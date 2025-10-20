import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react";

interface Question {
  id: string;
  question: string;
  type: "choice" | "range" | "multiple";
  options?: { value: string; label: string; icon?: string }[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

interface AIQuestionnaireProps {
  currentQuestion: number;
  answers: Record<string, any>;
  onAnswer: (questionId: string, answer: any) => void;
  onNext: () => void;
  onPrevious: () => void;
  onComplete: () => void;
}

export const AIQuestionnaire: React.FC<AIQuestionnaireProps> = ({
  currentQuestion,
  answers,
  onAnswer,
  onNext,
  onPrevious,
  onComplete
}) => {
  const questions: Question[] = [
    {
      id: "usage",
      question: "Quelle sera l'utilisation principale de votre PC ?",
      type: "choice",
      options: [
        { value: "gaming_only", label: "Gaming uniquement", icon: "🎮" },
        { value: "gaming_streaming", label: "Gaming + Streaming/Enregistrement", icon: "📹" },
        { value: "gaming_creation", label: "Gaming + Création de contenu", icon: "🎨" },
        { value: "gaming_work", label: "Gaming + Travail/Productivité", icon: "💼" },
        { value: "professional", label: "Workstation professionnelle", icon: "🖥️" }
      ]
    },
    {
      id: "experience",
      question: "Quel est votre niveau d'expérience en PC gaming ?",
      type: "choice",
      options: [
        { value: "beginner", label: "Débutant - Mon premier PC gaming", icon: "🌱" },
        { value: "intermediate", label: "Intermédiaire - Je connais les bases", icon: "�" },
        { value: "advanced", label: "Avancé - Je sais ce que je veux", icon: "🎓" },
        { value: "expert", label: "Expert - Performance maximale", icon: "⚡" }
      ]
    },
    {
      id: "budget",
      question: "Quel est votre budget total pour la configuration ?",
      type: "range",
      min: 500,
      max: 5000,
      step: 50,
      unit: "€"
    },
    {
      id: "priority",
      question: "Quelle est votre priorité absolue ?",
      type: "choice",
      options: [
        { value: "performance", label: "Performance maximale", icon: "🚀" },
        { value: "balanced", label: "Équilibre performance/prix", icon: "⚖️" },
        { value: "quiet", label: "Silence et températures", icon: "🔇" },
        { value: "aesthetic", label: "Esthétique et RGB", icon: "✨" },
        { value: "future_proof", label: "Évolutivité future", icon: "📈" }
      ]
    },
    {
      id: "resolution",
      question: "À quelle résolution souhaitez-vous jouer ?",
      type: "choice",
      options: [
        { value: "1080p", label: "1080p (Full HD)", icon: "📺" },
        { value: "1440p", label: "1440p (2K/QHD)", icon: "🖥️" },
        { value: "4k", label: "4K (Ultra HD)", icon: "📽️" },
        { value: "ultrawide", label: "Ultrawide (21:9)", icon: "🖼️" }
      ]
    },
    {
      id: "fps_target",
      question: "Quel framerate ciblez-vous ?",
      type: "choice",
      options: [
        { value: "60", label: "60 FPS - Expérience fluide", icon: "⚡" },
        { value: "120", label: "120 FPS - Très fluide", icon: "⚡⚡" },
        { value: "144", label: "144 FPS - Compétitif", icon: "🎯" },
        { value: "240+", label: "240+ FPS - E-sport", icon: "🏆" }
      ]
    },
    {
      id: "games_type",
      question: "Quels types de jeux jouez-vous principalement ?",
      type: "multiple",
      options: [
        { value: "competitive_fps", label: "FPS Compétitifs (CS2, Valorant)", icon: "🎯" },
        { value: "battle_royale", label: "Battle Royale (Fortnite, Apex)", icon: "🎮" },
        { value: "moba", label: "MOBA (LoL, Dota 2)", icon: "⚔️" },
        { value: "aaa_story", label: "AAA Story (GTA, RDR2)", icon: "🌟" },
        { value: "ray_tracing", label: "Jeux avec Ray Tracing", icon: "💎" },
        { value: "simulation", label: "Simulation (Flight Sim, Racing)", icon: "�️" },
        { value: "vr", label: "Réalité Virtuelle", icon: "🥽" },
        { value: "indie", label: "Jeux indépendants", icon: "🎲" }
      ]
    },
    {
      id: "graphics_quality",
      question: "Quelle qualité graphique privilégiez-vous ?",
      type: "choice",
      options: [
        { value: "ultra", label: "Ultra - Maximum de détails", icon: "💎" },
        { value: "high", label: "Élevé - Beau et performant", icon: "🌟" },
        { value: "medium", label: "Moyen - Équilibré", icon: "⚖️" },
        { value: "competitive", label: "Bas - FPS maximum", icon: "🏃" }
      ]
    },
    {
      id: "streaming",
      question: "Prévoyez-vous de streamer ou enregistrer vos sessions ?",
      type: "choice",
      options: [
        { value: "never", label: "Non, jamais", icon: "❌" },
        { value: "occasionally", label: "Occasionnellement", icon: "📸" },
        { value: "regularly", label: "Régulièrement", icon: "📹" },
        { value: "professional", label: "Oui, c'est mon métier", icon: "🎬" }
      ]
    },
    {
      id: "multitasking",
      question: "Combien de programmes utilisez-vous simultanément ?",
      type: "choice",
      options: [
        { value: "single", label: "Jeu uniquement", icon: "1️⃣" },
        { value: "light", label: "Jeu + Discord/Browser", icon: "2️⃣" },
        { value: "moderate", label: "Jeu + Streaming + Browser", icon: "3️⃣" },
        { value: "heavy", label: "Multitâche intensif", icon: "🔢" }
      ]
    },
    {
      id: "storage_needs",
      question: "De combien de stockage avez-vous besoin ?",
      type: "choice",
      options: [
        { value: "500", label: "500 GB - Quelques jeux", icon: "💾" },
        { value: "1000", label: "1 TB - Bibliothèque moyenne", icon: "💿" },
        { value: "2000", label: "2 TB - Grande bibliothèque", icon: "📀" },
        { value: "4000+", label: "4 TB+ - Énorme collection", icon: "🗄️" }
      ]
    },
    {
      id: "storage_type",
      question: "Quel type de stockage préférez-vous ?",
      type: "choice",
      options: [
        { value: "nvme_only", label: "SSD NVMe uniquement (rapide)", icon: "⚡" },
        { value: "nvme_ssd", label: "NVMe + SSD SATA", icon: "💫" },
        { value: "nvme_hdd", label: "NVMe + HDD (économique)", icon: "💰" }
      ]
    },
    {
      id: "brand_preference",
      question: "Avez-vous une préférence de marque ?",
      type: "choice",
      options: [
        { value: "amd", label: "AMD (Ryzen + Radeon)", icon: "🔴" },
        { value: "intel_nvidia", label: "Intel + NVIDIA", icon: "🔵" },
        { value: "best_performance", label: "Meilleure performance", icon: "🏆" },
        { value: "best_value", label: "Meilleur rapport qualité/prix", icon: "💰" },
        { value: "no_preference", label: "Aucune préférence", icon: "🤷" }
      ]
    },
    {
      id: "cooling",
      question: "Quel type de refroidissement souhaitez-vous ?",
      type: "choice",
      options: [
        { value: "air", label: "Air - Simple et fiable", icon: "🌬️" },
        { value: "aio", label: "AIO - Watercooling tout-en-un", icon: "💧" },
        { value: "quiet_priority", label: "Le plus silencieux possible", icon: "🔇" },
        { value: "performance_priority", label: "Performance maximale", icon: "❄️" }
      ]
    },
    {
      id: "rgb",
      question: "Quelle importance accordez-vous à l'esthétique ?",
      type: "choice",
      options: [
        { value: "full_rgb", label: "RGB partout - Spectacle visuel", icon: "🌈" },
        { value: "subtle_rgb", label: "RGB sobre et élégant", icon: "✨" },
        { value: "minimal", label: "Design minimaliste", icon: "⬛" },
        { value: "none", label: "Performance pure - 0 RGB", icon: "⚫" }
      ]
    },
    {
      id: "noise_tolerance",
      question: "Quelle est votre tolérance au bruit ?",
      type: "choice",
      options: [
        { value: "silent", label: "Silence absolu prioritaire", icon: "🔇" },
        { value: "quiet", label: "Discret si possible", icon: "🤫" },
        { value: "moderate", label: "Acceptable", icon: "🔊" },
        { value: "dont_care", label: "Peu m'importe", icon: "🔊" }
      ]
    },
    {
      id: "upgrade_plan",
      question: "Prévoyez-vous d'upgrader votre config ?",
      type: "choice",
      options: [
        { value: "never", label: "Non, config finale pour 5+ ans", icon: "🔒" },
        { value: "later", label: "Peut-être dans 2-3 ans", icon: "🤔" },
        { value: "soon", label: "Oui, dans 1-2 ans", icon: "📈" },
        { value: "regular", label: "Oui, régulièrement", icon: "🔄" }
      ]
    },
    {
      id: "future_proofing",
      question: "Souhaitez-vous être prêt pour les futures technologies ?",
      type: "choice",
      options: [
        { value: "max", label: "Oui, je veux le top pour longtemps", icon: "🚀" },
        { value: "yes", label: "Oui, dans la limite du budget", icon: "📈" },
        { value: "moderate", label: "Un peu, sans excès", icon: "⚖️" },
        { value: "no", label: "Non, juste pour maintenant", icon: "⏱️" }
      ]
    },
    {
      id: "wifi_need",
      question: "Avez-vous besoin du WiFi intégré ?",
      type: "choice",
      options: [
        { value: "ethernet", label: "Non, j'utilise Ethernet", icon: "🔌" },
        { value: "wifi6", label: "Oui, WiFi 6/6E", icon: "📡" },
        { value: "wifi7", label: "Oui, WiFi 7 (dernière génération)", icon: "🛜" }
      ]
    },
    {
      id: "monitor_ready",
      question: "Avez-vous déjà un moniteur ?",
      type: "choice",
      options: [
        { value: "yes_matching", label: "Oui, adapté à mes besoins", icon: "✅" },
        { value: "yes_upgrade", label: "Oui, mais prévu de changer", icon: "🔄" },
        { value: "no", label: "Non, besoin de conseils", icon: "❓" }
      ]
    }
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: any) => {
    if (currentQ.type === "multiple") {
      const current = answers[currentQ.id] || [];
      const newAnswers = current.includes(value)
        ? current.filter((v: any) => v !== value)
        : [...current, value];
      onAnswer(currentQ.id, newAnswers);
    } else {
      onAnswer(currentQ.id, value);
    }
  };

  const isAnswered = () => {
    if (currentQ.type === "multiple") {
      return answers[currentQ.id] && answers[currentQ.id].length > 0;
    }
    return answers[currentQ.id] !== undefined;
  };

  const handleNext = () => {
    if (currentQuestion === questions.length - 1) {
      onComplete();
    } else {
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[#A1A1AA]">Question {currentQuestion + 1} sur {questions.length}</span>
          <span className="text-sm font-semibold text-[#4F8BF7]">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF]"
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
          className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10 mb-8"
        >
          <div className="flex items-start gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#4F8BF7] to-[#6B9CFF] rounded-xl flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#F5F5F7] mb-2">
                {currentQ.question}
              </h2>
              <p className="text-[#A1A1AA]">
                Sélectionnez l'option qui vous correspond le mieux
              </p>
            </div>
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            {currentQ.type === "choice" && currentQ.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQ.options.map((option) => {
                  const isSelected = answers[currentQ.id] === option.value;
                  return (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option.value)}
                      className={`p-6 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-[#4F8BF7]/20 border-2 border-[#4F8BF7] shadow-lg shadow-[#4F8BF7]/20'
                          : 'bg-[#0E0E10] border border-white/10 hover:border-[#4F8BF7]/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{option.icon}</span>
                        <div>
                          <span className="text-lg font-semibold text-[#F5F5F7] block">
                            {option.label}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {currentQ.type === "multiple" && currentQ.options && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQ.options.map((option) => {
                  const isSelected = answers[currentQ.id]?.includes(option.value);
                  return (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswer(option.value)}
                      className={`p-6 rounded-xl text-left transition-all ${
                        isSelected
                          ? 'bg-[#4F8BF7]/20 border-2 border-[#4F8BF7] shadow-lg shadow-[#4F8BF7]/20'
                          : 'bg-[#0E0E10] border border-white/10 hover:border-[#4F8BF7]/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{option.icon}</span>
                        <div>
                          <span className="text-lg font-semibold text-[#F5F5F7] block">
                            {option.label}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {currentQ.type === "range" && (
              <div className="space-y-6">
                <div className="text-center">
                  <span className="text-5xl font-bold bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] bg-clip-text text-transparent">
                    {answers[currentQ.id] || currentQ.min}{currentQ.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={currentQ.min}
                  max={currentQ.max}
                  step={currentQ.step}
                  value={answers[currentQ.id] || currentQ.min}
                  onChange={(e) => handleAnswer(parseInt(e.target.value))}
                  className="w-full h-3 bg-[#0E0E10] rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-[#4F8BF7] [&::-webkit-slider-thumb]:to-[#6B9CFF] [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-[#4F8BF7]/50"
                />
                <div className="flex justify-between text-sm text-[#A1A1AA]">
                  <span>{currentQ.min}{currentQ.unit}</span>
                  <span>{currentQ.max}{currentQ.unit}</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-3 bg-[#1a1a1a] border border-white/10 text-[#F5F5F7] rounded-lg font-semibold hover:bg-[#252525] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-5 h-5" />
          Précédent
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNext}
          disabled={!isAnswered()}
          className="px-6 py-3 bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] text-white rounded-lg font-semibold shadow-lg shadow-[#4F8BF7]/30 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {currentQuestion === questions.length - 1 ? "Voir ma config" : "Suivant"}
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
};
