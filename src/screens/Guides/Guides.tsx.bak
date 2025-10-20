import React from "react";
import { motion } from "framer-motion";
import { Layout } from "../../components/Layout";
import { Clock, User, ArrowRight } from "lucide-react";

interface Guide {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  category: string;
  image?: string;
}

export const Guides: React.FC = () => {
  const guides: Guide[] = [
    {
      id: "1",
      title: "Comment choisir son processeur en 2024",
      excerpt: "Guide complet pour comprendre les différences entre AMD et Intel, et choisir le CPU adapté à vos besoins gaming.",
      author: "Thomas Martin",
      readTime: "8 min",
      category: "Processeurs"
    },
    {
      id: "2",
      title: "DDR4 vs DDR5 : Quelle mémoire choisir ?",
      excerpt: "Analyse détaillée des performances et du rapport qualité-prix entre DDR4 et DDR5 pour le gaming.",
      author: "Sophie Dubois",
      readTime: "6 min",
      category: "RAM"
    },
    {
      id: "3",
      title: "Les meilleures cartes graphiques pour 1440p",
      excerpt: "Comparatif des GPU NVIDIA et AMD pour jouer en 2K avec les meilleurs réglages graphiques.",
      author: "Lucas Bernard",
      readTime: "10 min",
      category: "GPU"
    },
    {
      id: "4",
      title: "Optimiser le refroidissement de son PC",
      excerpt: "Conseils pratiques pour maintenir des températures optimales et prolonger la durée de vie de vos composants.",
      author: "Marie Laurent",
      readTime: "7 min",
      category: "Refroidissement"
    },
    {
      id: "5",
      title: "SSD NVMe Gen4 vs Gen5 : Le guide complet",
      excerpt: "Tout savoir sur les différences de performances entre les générations de SSD NVMe.",
      author: "Antoine Petit",
      readTime: "5 min",
      category: "Stockage"
    },
    {
      id: "6",
      title: "Calculer la puissance d'alimentation nécessaire",
      excerpt: "Méthode simple pour déterminer le wattage idéal de votre PSU selon votre configuration.",
      author: "Julie Moreau",
      readTime: "4 min",
      category: "Alimentation"
    }
  ];

  const categories = ["Tous", "Processeurs", "GPU", "RAM", "Stockage", "Refroidissement", "Alimentation"];

  return (
    <Layout>
      <div className="container mx-auto px-8 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-[#F5F5F7] mb-4">
            Guides & Tutoriels
          </h1>
          <p className="text-lg text-[#A1A1AA]">
            Apprenez à choisir les meilleurs composants pour votre PC gaming
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 bg-[#1a1a1a] border border-white/10 rounded-lg font-semibold text-sm text-[#A1A1AA] hover:text-[#F5F5F7] hover:border-[#4F8BF7]/50 transition-all"
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Featured Guide */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative bg-gradient-to-r from-[#4F8BF7]/20 to-[#6B9CFF]/20 rounded-2xl p-8 border border-[#4F8BF7]/30 overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(79,139,247,0.05)_25%,rgba(79,139,247,0.05)_50%,transparent_50%,transparent_75%,rgba(79,139,247,0.05)_75%)] bg-[length:20px_20px]" />
            
            <div className="relative z-10 max-w-3xl">
              <span className="inline-block px-3 py-1 bg-[#4F8BF7]/20 border border-[#4F8BF7]/30 rounded-full text-[#6B9CFF] text-xs font-semibold mb-4">
                ⭐ Guide vedette
              </span>
              
              <h2 className="text-3xl font-bold text-[#F5F5F7] mb-4">
                Le guide ultime pour monter son premier PC gaming
              </h2>
              
              <p className="text-[#A1A1AA] mb-6">
                Tout ce que vous devez savoir pour assembler votre première configuration gaming, du choix des composants à l'installation finale.
              </p>
              
              <div className="flex items-center gap-6 mb-6">
                <div className="flex items-center gap-2 text-[#A1A1AA] text-sm">
                  <User className="w-4 h-4" />
                  <span>Alexandre Rousseau</span>
                </div>
                <div className="flex items-center gap-2 text-[#A1A1AA] text-sm">
                  <Clock className="w-4 h-4" />
                  <span>15 min de lecture</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] text-white rounded-lg font-semibold shadow-lg shadow-[#4F8BF7]/30 flex items-center gap-2"
              >
                Lire le guide
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide, index) => (
            <motion.article
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-xl overflow-hidden border border-white/10 hover:border-[#4F8BF7]/50 transition-all cursor-pointer group"
            >
              {/* Image Placeholder */}
              <div className="w-full h-48 bg-gradient-to-br from-[#4F8BF7]/20 to-[#6B9CFF]/20 flex items-center justify-center border-b border-white/10">
                <span className="text-6xl">📚</span>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <span className="inline-block px-3 py-1 bg-[#4F8BF7]/10 border border-[#4F8BF7]/30 rounded-full text-[#6B9CFF] text-xs font-semibold mb-3">
                    {guide.category}
                  </span>
                  
                  <h3 className="text-xl font-bold text-[#F5F5F7] mb-2 group-hover:text-[#4F8BF7] transition-colors">
                    {guide.title}
                  </h3>
                  
                  <p className="text-[#A1A1AA] text-sm line-clamp-3">
                    {guide.excerpt}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex items-center gap-2 text-[#A1A1AA] text-xs">
                    <User className="w-3 h-3" />
                    <span>{guide.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#A1A1AA] text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{guide.readTime}</span>
                  </div>
                </div>

                {/* Read More */}
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-[#4F8BF7] font-semibold text-sm group-hover:gap-3 transition-all"
                >
                  Lire l'article
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Layout>
  );
};
