import { Layout } from "../../components/Layout";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Layers3, Share2, Sparkles } from "lucide-react";

export const ComparisonsPage = () => {
  const { user, isLoggedIn, openAuthModal } = useAuth();
  const comparisons = user?.savedComparisons ?? [];

  if (!isLoggedIn || !user) {
    return (
      <Layout>
        <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-center text-white">
          <Layers3 className="h-12 w-12 text-[#4F8BF7]" />
          <h1 className="mt-6 text-3xl font-semibold">Tes comparaisons attendent ton compte</h1>
          <p className="mt-2 max-w-md text-neutral-400">
            Connecte-toi pour garder tes comparaisons de composants et les partager en un clic.
          </p>
          <button
            onClick={openAuthModal}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] px-6 py-2.5 text-sm font-semibold text-white"
          >
            Se connecter
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen pt-32 pb-20 relative z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-semibold text-white">Mes comparaisons</h1>
              <p className="mt-1 text-neutral-400">
                {comparisons.length === 0
                  ? "Aucune comparaison enregistrée pour l'instant."
                  : `${comparisons.length} comparaison${comparisons.length > 1 ? "s" : ""} sauvegardée${comparisons.length > 1 ? "s" : ""}.`}
              </p>
            </div>
            <Link
              to="/comparateur"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/80 hover:border-[#4F8BF7]/50 hover:text-white"
            >
              Ouvrir le comparateur
            </Link>
          </div>

          {comparisons.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-12 text-center text-neutral-300">
              <Sparkles className="mx-auto h-10 w-10 text-[#4F8BF7]" />
              <h2 className="mt-4 text-2xl font-semibold text-white">Crée ta première comparaison</h2>
              <p className="mt-2 max-w-md mx-auto text-neutral-400">
                Ajoute au moins deux composants à ton comparateur pour sauvegarder l'analyse et la partager avec ton crew.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {comparisons.map((comparison) => (
                <motion.div
                  key={comparison.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {comparison.title || "Comparaison sans titre"}
                      </h3>
                      <p className="mt-1 text-sm text-neutral-400">
                        {comparison.productIds.length} produit{comparison.productIds.length > 1 ? "s" : ""}
                      </p>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80 hover:border-[#4F8BF7]/50 hover:text-white">
                      <Share2 className="h-4 w-4" />
                      Partager
                    </button>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-400">
                    {comparison.productIds.map((id) => (
                      <span key={id} className="rounded-full bg-white/5 px-3 py-1">
                        {id}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};
