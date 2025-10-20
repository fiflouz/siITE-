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
			id: "budget",
			question: "Quel est votre budget total pour la configuration ?",
			type: "range",
			min: 500,
			max: 5000,
			step: 50,
			unit: "€"
		},
		{
			id: "usage",
			question: "Quelle sera l'utilisation principale de votre PC ?",
			type: "choice",
			options: [
				{ value: "gaming_only", label: "Gaming uniquement", icon: "🎮" },
				{ value: "gaming_streaming", label: "Gaming + Streaming", icon: "📹" },
				{ value: "gaming_creation", label: "Gaming + Création de contenu", icon: "🎨" },
				{ value: "gaming_work", label: "Gaming + Travail", icon: "💼" },
				{ value: "competitive", label: "E-sport / Gaming compétitif", icon: "🏆" }
			]
		},
		{
			id: "resolution_fps",
			question: "Quelle résolution et framerate visez-vous ?",
			type: "choice",
			options: [
				{ value: "1080p_60", label: "1080p à 60 FPS - Entrée de gamme", icon: "📺" },
				{ value: "1080p_144", label: "1080p à 144 FPS - Compétitif", icon: "⚡" },
				{ value: "1440p_60", label: "1440p à 60+ FPS - Équilibré", icon: "🖥️" },
				{ value: "1440p_144", label: "1440p à 144 FPS - Haute performance", icon: "💫" },
				{ value: "4k_60", label: "4K à 60 FPS - Qualité maximale", icon: "📽️" },
				{ value: "4k_120", label: "4K à 120+ FPS - Ultra haut de gamme", icon: "🚀" }
			]
		},
		{
			id: "games_type",
			question: "Quels types de jeux jouez-vous principalement ?",
			type: "multiple",
			options: [
				{ value: "competitive", label: "FPS Compétitifs (Valorant, CS2)", icon: "🎯" },
				{ value: "battle_royale", label: "Battle Royale (Fortnite, Warzone)", icon: "🎮" },
				{ value: "aaa_demanding", label: "AAA exigeants (Cyberpunk, RDR2)", icon: "🌟" },
				{ value: "moba", label: "MOBA (LoL, Dota 2)", icon: "⚔️" },
				{ value: "simulation", label: "Simulation (Flight Sim, Racing)", icon: "🏎️" },
				{ value: "vr", label: "Réalité Virtuelle", icon: "🥽" }
			]
		},
		{
			id: "priority",
			question: "Quelle est votre priorité absolue ?",
			type: "choice",
			options: [
				{ value: "max_performance", label: "Performance maximale", icon: "🚀" },
				{ value: "balanced", label: "Équilibre performance/prix", icon: "⚖️" },
				{ value: "quiet", label: "PC silencieux", icon: "🔇" },
				{ value: "aesthetic", label: "Design et RGB", icon: "✨" },
				{ value: "future_proof", label: "Durable et évolutif", icon: "📈" }
			]
		},
		{
			id: "storage",
			question: "De combien de stockage avez-vous besoin ?",
			type: "choice",
			options: [
				{ value: "500_nvme", label: "500 GB NVMe - Juste l'essentiel", icon: "💾" },
				{ value: "1000_nvme", label: "1 TB NVMe - Confortable", icon: "💿" },
				{ value: "2000_nvme", label: "2 TB NVMe - Grande bibliothèque", icon: "📀" },
				{ value: "1000_nvme_2000_hdd", label: "1 TB NVMe + 2 TB HDD - Économique", icon: "🗄️" },
				{ value: "2000_nvme_plus", label: "2 TB+ NVMe - Performance totale", icon: "⚡" }
			]
		},
		{
			id: "experience",
			question: "Quel est votre niveau d'expérience PC ?",
			type: "choice",
			options: [
				{ value: "beginner", label: "Débutant - Mon premier PC gaming", icon: "🌱" },
				{ value: "intermediate", label: "Intermédiaire - Je connais les bases", icon: "📚" },
				{ value: "advanced", label: "Avancé - Je sais optimiser", icon: "🎓" },
				{ value: "expert", label: "Expert - Performance maximale", icon: "⚡" }
			]
		},
		{
			id: "brand_preference",
			question: "Avez-vous une préférence de marque ?",
			type: "choice",
			options: [
				{ value: "amd_full", label: "AMD Ryzen + Radeon", icon: "🔴" },
				{ value: "intel_nvidia", label: "Intel + NVIDIA", icon: "🔵" },
				{ value: "best_performance", label: "Meilleure performance absolue", icon: "🏆" },
				{ value: "best_value", label: "Meilleur rapport qualité/prix", icon: "💰" },
				{ value: "no_preference", label: "Aucune préférence", icon: "🤷" }
			]
		},
		{
			id: "aesthetics",
			question: "Quelle importance accordez-vous à l'esthétique ?",
			type: "choice",
			options: [
				{ value: "full_rgb", label: "RGB complet - Setup spectaculaire", icon: "🌈" },
				{ value: "subtle", label: "Design sobre et élégant", icon: "✨" },
				{ value: "minimal", label: "Minimaliste, pas de fioritures", icon: "⬛" },
				{ value: "none", label: "Performance pure, 0€ en RGB", icon: "⚫" }
			]
		},
		{
			id: "future_plans",
			question: "Vos plans pour cette configuration ?",
			type: "choice",
			options: [
				{ value: "long_term", label: "Configuration finale pour 5+ ans", icon: "🔒" },
				{ value: "upgrade_later", label: "J'upgraderai dans 2-3 ans", icon: "🔄" },
				{ value: "upgrade_soon", label: "J'upgraderai régulièrement", icon: "📈" },
				{ value: "maximize_now", label: "Maximum maintenant, peu importe après", icon: "🚀" }
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
