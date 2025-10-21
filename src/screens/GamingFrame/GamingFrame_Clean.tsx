import React from "react";
import { motion } from "framer-motion";
import { Layout } from "../../components/Layout";
import { ScrollReveal } from "../../components/ScrollReveal";
import { AnimatedCounter } from "../../components/AnimatedCounter";
import { Cpu, Zap, Shield, TrendingUp, Users, Award, ArrowRight } from "lucide-react";

export const GamingFrame: React.FC = () => {
  return (
    <Layout>
      <div className="relative">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A90E2]/20 border border-[#4A90E2]/30 rounded-full mb-8"
              >
                <Cpu className="w-4 h-4 text-[#4A90E2]" />
                <span className="text-sm font-medium text-[#4A90E2]">Plateforme PC Gaming #1</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold text-[#F5F5F7] mb-6"
              >
                Configurez votre
                <br />
                <span className="bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] bg-clip-text text-transparent">
                  PC Gaming
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-[#A1A1AA] max-w-3xl mx-auto mb-12"
              >
                Créez la configuration gaming parfaite avec notre IA, comparez les prix en temps réel,
                et rejoignez des milliers de gamers satisfaits.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] rounded-xl text-white font-semibold text-lg shadow-xl shadow-[#4A90E2]/30 flex items-center gap-2"
                >
                  <Cpu className="w-5 h-5" />
                  Configurer maintenant
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[#1a1a1a] border border-white/10 rounded-xl text-[#F5F5F7] font-semibold text-lg hover:border-[#4A90E2]/50 transition-all"
                >
                  Voir les guides
                </motion.button>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#F5F5F7] mb-2">
                    <AnimatedCounter end={50000} duration={2000} />+
                  </div>
                  <div className="text-[#A1A1AA]">Configurations créées</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#F5F5F7] mb-2">
                    <AnimatedCounter end={15000} duration={2000} />+
                  </div>
                  <div className="text-[#A1A1AA]">Gamers satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#F5F5F7] mb-2">
                    <AnimatedCounter end={99} duration={2000} />%
                  </div>
                  <div className="text-[#A1A1AA]">Satisfaction client</div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#4A90E2]/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#5BA3F5]/20 rounded-full blur-3xl" />
          </div>
        </section>

        {/* Features Section */}
        <ScrollReveal delay={0.2}>
          <section className="py-24 relative">
            <div className="max-w-6xl mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-[#F5F5F7] mb-6">
                  Pourquoi choisir <span className="text-[#4A90E2]">siITE</span> ?
                </h2>
                <p className="text-xl text-[#A1A1AA] max-w-2xl mx-auto">
                  La plateforme la plus complète pour créer, comparer et optimiser votre setup gaming
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Zap className="w-8 h-8" />,
                    title: "IA Avancée",
                    description: "Notre intelligence artificielle analyse vos besoins pour vous proposer la configuration optimale"
                  },
                  {
                    icon: <TrendingUp className="w-8 h-8" />,
                    title: "Prix en temps réel",
                    description: "Comparaison automatique des prix chez tous les revendeurs pour trouver les meilleures offres"
                  },
                  {
                    icon: <Shield className="w-8 h-8" />,
                    title: "Compatibilité garantie",
                    description: "Vérification automatique de la compatibilité entre tous vos composants"
                  },
                  {
                    icon: <Users className="w-8 h-8" />,
                    title: "Communauté active",
                    description: "Partagez vos configurations et découvrez celles des autres gamers"
                  },
                  {
                    icon: <Award className="w-8 h-8" />,
                    title: "Support expert",
                    description: "Équipe d'experts disponible pour vous accompagner dans vos choix"
                  },
                  {
                    icon: <Cpu className="w-8 h-8" />,
                    title: "Base de données complète",
                    description: "Plus de 10 000 composants référencés et mis à jour quotidiennement"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -10 }}
                    className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-[#4A90E2]/30 transition-all cursor-pointer group"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-[#4A90E2] to-[#5BA3F5] rounded-xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#F5F5F7] mb-3">{feature.title}</h3>
                    <p className="text-[#A1A1AA] leading-relaxed">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* CTA Section */}
        <ScrollReveal delay={0.3}>
          <section className="py-24">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="bg-gradient-to-r from-[#4A90E2]/20 to-[#5BA3F5]/20 rounded-3xl p-12 border border-[#4A90E2]/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(74,144,226,0.05)_25%,rgba(74,144,226,0.05)_50%,transparent_50%,transparent_75%,rgba(74,144,226,0.05)_75%)] bg-[length:20px_20px]" />
                
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#F5F5F7] mb-6">
                    Prêt à créer votre PC gaming de rêve ?
                  </h2>
                  <p className="text-xl text-[#A1A1AA] mb-8 max-w-2xl mx-auto">
                    Rejoignez des milliers de gamers qui ont déjà fait confiance à siITE pour leur configuration
                  </p>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] rounded-xl text-white font-semibold text-lg shadow-xl shadow-[#4A90E2]/30 inline-flex items-center gap-2"
                  >
                    <Cpu className="w-5 h-5" />
                    Commencer maintenant
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>
      </div>
    </Layout>
  );
};