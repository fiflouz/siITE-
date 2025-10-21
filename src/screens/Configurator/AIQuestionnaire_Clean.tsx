import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

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
  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A90E2]/20 rounded-full mb-6"
        >
          <Sparkles className="w-4 h-4 text-[#4A90E2]" />
          <span className="text-sm font-medium text-[#4A90E2]">Assistant IA</span>
        </motion.div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] mb-4">
          Configuration <span className="bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] bg-clip-text text-transparent">Intelligente</span>
        </h1>
        <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto mb-8">
          Assistant IA temporairement indisponible - Correction des conflits en cours
        </p>
        
        <div className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#4A90E2] to-[#5BA3F5] rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-[#F5F5F7] mb-2">Fonctionnalité en maintenance</h3>
            <p className="text-[#A1A1AA]">
              L'assistant IA sera bientôt disponible. En attendant, utilisez le configurateur manuel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};