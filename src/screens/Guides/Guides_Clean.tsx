import React from "react";
import { motion } from "framer-motion";
import { Layout } from "../../components/Layout";
import { BookOpen, Users, Lightbulb } from "lucide-react";

export const Guides: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-screen pt-8 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A90E2]/20 rounded-full mb-6"
            >
              <BookOpen className="w-4 h-4 text-[#4A90E2]" />
              <span className="text-sm font-medium text-[#4A90E2]">Guides & Tutoriels</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-[#F5F5F7] mb-6">
              Guides <span className="bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] bg-clip-text text-transparent">Gaming</span>
            </h1>
            <p className="text-xl text-[#A1A1AA] max-w-3xl mx-auto">
              Découvrez nos guides complets pour assembler, optimiser et entretenir votre PC gaming
            </p>
          </div>

          {/* Featured Guide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="relative bg-gradient-to-r from-[#4A90E2]/20 to-[#5BA3F5]/20 rounded-2xl p-8 border border-[#4A90E2]/30 overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(100,150,200,0.035)_25%,rgba(100,150,200,0.035)_50%,transparent_50%,transparent_75%,rgba(100,150,200,0.035)_75%)] bg-[length:20px_20px]" />
              
              <div className="relative z-10 max-w-3xl">
                <span className="inline-block px-3 py-1 bg-[#4A90E2]/20 border border-[#4A90E2]/30 rounded-full text-[#5BA3F5] text-xs font-semibold mb-4">
                  Guide Vedette
                </span>
                <h2 className="text-3xl font-bold text-[#F5F5F7] mb-4">
                  Guide Complet du PC Gaming 2024
                </h2>
                <p className="text-[#A1A1AA] mb-6">
                  Apprenez à choisir, assembler et optimiser votre PC gaming pour les jeux les plus récents. 
                  De la sélection des composants à l'overclocking, ce guide couvre tout ce que vous devez savoir.
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[#A1A1AA]">15 min de lecture</span>
                  <span className="text-sm text-[#A1A1AA]">•</span>
                  <span className="text-sm text-[#A1A1AA]">Niveau Débutant</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: "Choisir sa carte graphique",
                description: "Guide pour sélectionner la GPU parfaite selon votre budget et vos besoins",
                time: "10 min",
                level: "Débutant",
                icon: "🎮"
              },
              {
                title: "Assemblage pas à pas",
                description: "Tutorial détaillé pour assembler votre PC en toute sécurité",
                time: "25 min",
                level: "Intermédiaire", 
                icon: "🔧"
              },
              {
                title: "Optimisation Windows",
                description: "Tweaks et réglages pour maximiser les performances gaming",
                time: "15 min",
                level: "Avancé",
                icon: "⚡"
              },
              {
                title: "Watercooling custom",
                description: "Guide complet pour créer un circuit de refroidissement liquide",
                time: "45 min",
                level: "Expert",
                icon: "❄️"
              },
              {
                title: "Cable management",
                description: "Techniques pour un câblage propre et efficace",
                time: "20 min",
                level: "Intermédiaire",
                icon: "🔌"
              },
              {
                title: "Overclocking sécurisé",
                description: "Pousser vos composants en toute sécurité",
                time: "30 min",
                level: "Avancé",
                icon: "🚀"
              }
            ].map((guide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-[#4A90E2]/30 transition-all cursor-pointer"
              >
                <div className="text-4xl mb-4">{guide.icon}</div>
                <h3 className="text-xl font-bold text-[#F5F5F7] mb-2">{guide.title}</h3>
                <p className="text-[#A1A1AA] mb-4 text-sm leading-relaxed">
                  {guide.description}
                </p>
                <div className="flex items-center gap-3 text-xs text-[#A1A1AA]">
                  <span>{guide.time}</span>
                  <span>•</span>
                  <span className={`px-2 py-1 rounded ${
                    guide.level === 'Débutant' ? 'bg-green-500/20 text-green-400' :
                    guide.level === 'Intermédiaire' ? 'bg-yellow-500/20 text-yellow-400' :
                    guide.level === 'Avancé' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {guide.level}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Categories */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-[#F5F5F7] mb-8">Catégories</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { name: "Hardware", count: 24 },
                { name: "Software", count: 18 },
                { name: "Overclocking", count: 12 },
                { name: "Refroidissement", count: 15 },
                { name: "RGB & Modding", count: 9 },
                { name: "Troubleshooting", count: 21 }
              ].map((category) => (
                <motion.div
                  key={category.name}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-lg hover:border-[#4A90E2]/30 transition-all cursor-pointer"
                >
                  <span className="text-[#F5F5F7] font-medium">{category.name}</span>
                  <span className="text-[#A1A1AA] ml-2">({category.count})</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};