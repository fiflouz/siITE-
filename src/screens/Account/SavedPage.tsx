import { useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { FavoriteButton } from "../../components/FavoriteButton";
import { getComponentsWithDetails, type ComponentWithDetails } from "../../data/componentsData";
import { useAuth } from "../../contexts/AuthContext";

export const SavedPage = () => {
  const { user, isLoggedIn, openAuthModal } = useAuth();
  const catalog = useMemo(() => getComponentsWithDetails(), []);

  if (!isLoggedIn || !user) {
    return (
      <Layout>
        <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-3xl font-semibold">Sauvegarde tes composants favoris</h1>
          <p className="mt-2 max-w-md text-neutral-400">
            Connecte-toi pour retrouver tes coups de cœur et synchroniser ton comparateur.
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

  const savedIds = user.savedItems.length ? user.savedItems : user.favorites;
  const savedComponents = savedIds
    .map((id) => catalog.find((component) => component.id === id))
    .filter((component): component is ComponentWithDetails => Boolean(component));

  return (
    <Layout>
      <div className="min-h-screen pt-32 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-semibold text-white">Sauvegardés</h1>
              <p className="mt-1 text-neutral-400">
                {savedComponents.length === 0
                  ? "Aucun composant sauvegardé pour le moment."
                  : `${savedComponents.length} composant${savedComponents.length > 1 ? "s" : ""} à retrouver instantanément.`}
              </p>
            </div>
            <Link
              to="/composants"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/80 hover:border-[#4F8BF7]/50 hover:text-white"
            >
              Explorer le catalogue
            </Link>
          </div>

          {savedComponents.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-12 text-center text-neutral-300">
              Ajoute des composants depuis le catalogue pour les comparer et recevoir des alertes.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {savedComponents.map((component) => (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{component.name}</h3>
                      <p className="mt-1 text-xs uppercase tracking-wide text-white/40">{component.category}</p>
                    </div>
                    <FavoriteButton componentId={component.id} size="sm" />
                  </div>
                  {component.description && (
                    <div className="mt-4 text-sm text-neutral-300">
                      {component.description.slice(0, 120)}
                    </div>
                  )}
                  <div className="mt-4 flex items-center justify-between text-sm text-white">
                    <span className="font-semibold">
                      {new Intl.NumberFormat("fr-FR", {
                        style: "currency",
                        currency: "EUR",
                      }).format(component.price)}
                    </span>
                    <Link
                      to={`/composants?id=${component.id}`}
                      className="text-xs font-semibold uppercase tracking-wide text-[#4F8BF7]"
                    >
                      Voir la fiche
                    </Link>
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
