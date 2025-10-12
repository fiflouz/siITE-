import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Sparkles } from "lucide-react"; // Standard grouped import

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
        { value: "gaming", label: "Gaming", icon: "🎮" },
        { value: "streaming", label: "Gaming + Streaming", icon: "📹" },
        { value: "creation", label: "Création de contenu", icon: "🎨" },
        { value: "work", label: "Travail + Gaming", icon: "💼" }
      ]
    },
    {
      id: "budget",
      question: "Quel est votre budget ?",
      type: "range",
      min: 500,
      max: 5000,
      step: 100,
      unit: "€"
    },
    {
      id: "resolution",
      question: "À quelle résolution souhaitez-vous jouer ?",
      type: "choice",
      options: [
        { value: "1080p", label: "1080p (Full HD)", icon: "📺" },
        { value: "1440p", label: "1440p (2K)", icon: "🖥️" },
        { value: "4k", label: "4K (Ultra HD)", icon: "📽️" }
      ]
    },
    {
      id: "fps",
      question: "Quel framerate visez-vous ?",
      type: "choice",
      options: [
        { value: "60", label: "60 FPS", icon: "⚡" },
        { value: "120", label: "120 FPS", icon: "⚡⚡" },
        { value: "144+", label: "144+ FPS", icon: "⚡⚡⚡" }
      ]
    },
    {
      id: "games",
      question: "Quels types de jeux jouez-vous principalement ?",
      type: "multiple",
      options: [
        { value: "competitive", label: "Compétitif (FPS, MOBA)", icon: "🎯" },
        { value: "aaa", label: "AAA (Cyberpunk, RDR2)", icon: "🌟" },
        { value: "indie", label: "Indépendants", icon: "🎲" },
        { value: "vr", label: "Réalité Virtuelle", icon: "🥽" }
      ]
    },
    {
      id: "storage",
      question: "De combien de stockage avez-vous besoin ?",
      type: "choice",
      options: [
        { value: "500", label: "500 GB", icon: "💾" },
        { value: "1000", label: "1 TB", icon: "💿" },
        { value: "2000", label: "2 TB", icon: "📀" },
        { value: "4000", label: "4 TB+", icon: "🗄️" }
      ]
    },
    {
      id: "rgb",
      question: "Souhaitez-vous un éclairage RGB ?",
      type: "choice",
      options: [
        { value: "yes", label: "Oui, j'adore le RGB", icon: "🌈" },
        { value: "minimal", label: "Un peu, mais sobre", icon: "✨" },
        { value: "no", label: "Non, performance avant tout", icon: "⚫" }
      ]
    },
    {
      id: "upgrade",
      question: "Prévoyez-vous d'upgrader dans le futur ?",
      type: "choice",
      options: [
        { value: "yes", label: "Oui, je veux de la marge", icon: "📈" },
        { value: "maybe", label: "Peut-être", icon: "🤔" },
        { value: "no", label: "Non, config finale", icon: "🔒" }
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
