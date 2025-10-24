import { Layout } from "../../components/Layout";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Cpu, Trash2 } from "lucide-react";

export const BuildsPage = () => {
  const { user, isLoggedIn, openAuthModal, loadConfiguration, deleteConfiguration } = useAuth();
  const builds = user?.savedConfigurations ?? [];

  if (!isLoggedIn || !user) {
    return (
      <Layout>
        <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-center text-white">
          <Cpu className="h-12 w-12 text-[#4F8BF7]" />
          <h1 className="mt-6 text-3xl font-semibold">Sauvegarde tes configurations</h1>
          <p className="mt-2 max-w-md text-neutral-400">
            Connecte-toi pour retrouver tes builds et les rejouer en un clic.
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold text-white">Mes configurations</h1>
              <p className="mt-1 text-neutral-400">
                {builds.length === 0
                  ? "Aucune configuration sauvegardée pour le moment."
                  : `${builds.length} configuration${builds.length > 1 ? "s" : ""} prête${builds.length > 1 ? "s" : ""} à l'emploi.`}
              </p>
            </div>
            <Link
              to="/configurateur"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-white/80 hover:border-[#4F8BF7]/50 hover:text-white"
            >
              Ouvrir le configurateur
            </Link>
          </div>

          {builds.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-12 text-center text-neutral-300">
              <p className="text-lg text-neutral-400">
                Utilise le configurateur pour créer ton premier build et reviens ici pour le modifier ou le partager.
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {builds.map((build) => (
                <motion.div
                  key={build.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{build.name}</h3>
                      <p className="mt-1 text-sm text-neutral-400">
                        {new Date(build.updatedAt).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => loadConfiguration(build.id)}
                        className="rounded-full border border-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80 hover:border-[#4F8BF7]/50 hover:text-white"
                      >
                        Recharger
                      </button>
                      <button
                        onClick={() => deleteConfiguration(build.id)}
                        className="flex items-center gap-1 rounded-full border border-red-500/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                        Supprimer
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-neutral-400">
                    {Object.entries(build.config ?? {}).slice(0, 4).map(([key, value]) => (
                      <div key={key} className="rounded-lg bg-white/5 px-3 py-2 capitalize">
                        <div className="text-[10px] uppercase tracking-wide text-white/50">{key}</div>
                        <div className="truncate text-white/80">{String(value)}</div>
                      </div>
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
