import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { useAuth } from "../../contexts/AuthContext";
import { ArrowRight, Bell, Layers3, Sparkles, Star } from "lucide-react";

export const AccountHome = () => {
  const { user, isLoggedIn, openAuthModal } = useAuth();

  if (!isLoggedIn || !user) {
    return (
      <Layout>
        <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-center text-white">
          <Sparkles className="h-12 w-12 text-[#4F8BF7]" />
          <h1 className="mt-6 text-3xl font-semibold">Connecte-toi pour personnaliser ton expérience</h1>
          <p className="mt-2 max-w-md text-neutral-400">
            Sauvegardes, comparaisons et alertes prix t'attendent. Passe en mode connecté en quelques secondes.
          </p>
          <button
            onClick={openAuthModal}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#4F8BF7]/30"
          >
            Se connecter
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </Layout>
    );
  }

  const totals = [
    {
      label: "Sauvegardes",
      value: user.savedItems.length || user.favorites.length,
      link: "/me/saved",
      icon: <Star className="h-5 w-5 text-yellow-400" />,
    },
    {
      label: "Comparaisons",
      value: user.savedComparisons.length,
      link: "/me/comparisons",
      icon: <Layers3 className="h-5 w-5 text-cyan-300" />,
    },
    {
      label: "Configs",
      value: user.savedConfigurations.length,
      link: "/me/builds",
      icon: <Sparkles className="h-5 w-5 text-violet-300" />,
    },
    {
      label: "Alertes",
      value: user.priceAlerts.length,
      link: "/me/alerts",
      icon: <Bell className="h-5 w-5 text-emerald-300" />,
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen pt-32 pb-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10">
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white"
            >
              Salut, {user.firstName}
            </motion.h1>
            <p className="mt-2 text-neutral-400">
              Retrouve tes favoris, comparaisons et alertes en un clin d'œil.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {totals.map((item) => (
              <Link key={item.label} to={item.link} className="group">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors group-hover:border-[#4F8BF7]/40"
                >
                  <div className="flex items-center justify-between text-sm font-medium text-neutral-400">
                    {item.label}
                    <span className="flex items-center gap-2 text-white/80">
                      {item.icon}
                    </span>
                  </div>
                  <div className="mt-3 text-3xl font-bold text-white">{item.value}</div>
                  <div className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#4F8BF7]">
                    Voir
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};
