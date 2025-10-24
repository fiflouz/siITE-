import React, { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertCircle, Sparkles } from 'lucide-react';
import { Layout } from '../../components/Layout';
import { CompareTable } from '../../components/compare/CompareTable';
import { useCompare } from '../../hooks/useCompare';
import catalogue from '../../data/catalogue_2021_2025_master.json';

export const ComparatorPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { ids, clear } = useCompare();

  // Lire les IDs depuis l'URL ou le hook
  const compareIds = useMemo(() => {
    const urlIds = searchParams.get('compare');
    if (urlIds) {
      return urlIds.split(',').filter(Boolean);
    }
    return ids;
  }, [searchParams, ids]);

  // Récupérer les produits depuis le catalogue
  const { products, category } = useMemo(() => {
    if (compareIds.length === 0) {
      return { products: [], category: null };
    }

    // Chercher dans toutes les catégories
    const allProducts = [
      ...catalogue.categories.cpus,
      ...catalogue.categories.gpus,
      ...catalogue.categories.ssds,
      ...(catalogue.categories.memory_kits || []),
    ];

    const found = compareIds
      .map(id => allProducts.find((p: any) => p.id === id))
      .filter(Boolean);

    // Déterminer la catégorie du premier élément
    let cat = null;
    if (found.length > 0 && found[0]) {
      const firstId = found[0].id;
      if (catalogue.categories.cpus.some((c: any) => c.id === firstId)) cat = 'cpu';
      else if (catalogue.categories.gpus.some((g: any) => g.id === firstId)) cat = 'gpu';
      else if (catalogue.categories.ssds.some((s: any) => s.id === firstId)) cat = 'ssd';
      else if (catalogue.categories.memory_kits?.some((m: any) => m.id === firstId)) cat = 'ram';
    }

    return { products: found, category: cat };
  }, [compareIds]);

  // Empty state : moins de 2 produits
  if (compareIds.length < 2) {
    return (
      <Layout>
        <div className="container mx-auto px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#4A90E2]/20 to-[#5BA3F5]/20 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-[#4A90E2]" />
            </div>

            <h1 className="text-4xl font-bold text-[#F5F5F7] mb-4">
              Comparateur de composants
            </h1>
            <p className="text-lg text-[#A1A1AA] mb-8">
              Sélectionnez au moins 2 composants pour commencer la comparaison.
            </p>

            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8">
              <div className="flex items-start gap-4 text-left">
                <AlertCircle className="w-6 h-6 text-[#4A90E2] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-[#F5F5F7] mb-2">
                    Comment utiliser le comparateur ?
                  </h3>
                  <ol className="space-y-2 text-sm text-[#A1A1AA]">
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#4A90E2]/10 text-[#4A90E2] rounded-full flex items-center justify-center text-xs font-bold">1</span>
                      <span>Rendez-vous sur la page <strong className="text-[#F5F5F7]">Composants</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#4A90E2]/10 text-[#4A90E2] rounded-full flex items-center justify-center text-xs font-bold">2</span>
                      <span>Cliquez sur le bouton <strong className="text-[#F5F5F7]">"Comparer"</strong> sur les produits qui vous intéressent (maximum 4)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="flex-shrink-0 w-6 h-6 bg-[#4A90E2]/10 text-[#4A90E2] rounded-full flex items-center justify-center text-xs font-bold">3</span>
                      <span>Une barre apparaîtra en bas de page, cliquez sur <strong className="text-[#F5F5F7]">"Comparer"</strong> pour voir le tableau détaillé</span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="/composants"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#4A90E2]/30 transition-all"
              >
                <span>Explorer les composants</span>
                <Sparkles className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>
      </Layout>
    );
  }

  // Catégories mixtes : afficher un avertissement
  if (products.length !== compareIds.length || !category) {
    return (
      <Layout>
        <div className="container mx-auto px-8 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-red-500/20 rounded-2xl flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-400" />
            </div>

            <h1 className="text-3xl font-bold text-[#F5F5F7] mb-4">
              Impossible de comparer ces produits
            </h1>
            <p className="text-lg text-[#A1A1AA] mb-8">
              Vous ne pouvez comparer que des produits de la même catégorie (CPU, GPU, SSD ou RAM).
            </p>

            <button
              onClick={clear}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-[#F5F5F7] rounded-xl border border-white/10 transition-all"
            >
              Réinitialiser la sélection
            </button>
          </motion.div>
        </div>
      </Layout>
    );
  }

  // Afficher la table de comparaison
  return (
    <Layout>
      <div className="container mx-auto px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <CompareTable items={products} category={category} />
        </motion.div>
      </div>
    </Layout>
  );
};

export default ComparatorPage;
