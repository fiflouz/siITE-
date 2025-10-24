import { Layout } from "../../components/Layout";
import { useAuth } from "../../contexts/AuthContext";
import { motion } from "framer-motion";
import { Bell, ToggleLeft, ToggleRight } from "lucide-react";

export const AlertsPage = () => {
  const { user, isLoggedIn, openAuthModal } = useAuth();
  const alerts = user?.priceAlerts ?? [];

  if (!isLoggedIn || !user) {
    return (
      <Layout>
        <div className="min-h-screen pt-40 pb-20 flex flex-col items-center justify-center text-center text-white">
          <Bell className="h-12 w-12 text-[#4F8BF7]" />
          <h1 className="mt-6 text-3xl font-semibold">Active des alertes sur tes composants</h1>
          <p className="mt-2 max-w-md text-neutral-400">
            Connecte-toi pour recevoir une notification dès qu'un prix passe sous ton seuil.
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
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-white">Mes alertes prix</h1>
            <p className="mt-1 text-neutral-400">
              {alerts.length === 0
                ? "Pas encore d'alerte programmée."
                : `${alerts.length} alerte${alerts.length > 1 ? "s" : ""} active${alerts.length > 1 ? "s" : ""}.`}
            </p>
          </div>

          {alerts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/15 bg-white/5 p-12 text-center text-neutral-300">
              <p className="text-lg text-neutral-400">
                Depuis une fiche produit, clique sur « 🔔 Alerte » pour être prévenu quand le prix passe sous ton seuil.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-neutral-200">
                    <div>
                      <div className="text-white font-semibold">{alert.productId}</div>
                      <div className="text-xs text-neutral-400">
                        Seuil {alert.thresholdEur.toFixed(2)} € • créée le {new Date(alert.createdAt).toLocaleDateString("fr-FR")}
                      </div>
                    </div>
                    <button className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80 hover:border-[#4F8BF7]/50 hover:text-white">
                      {alert.active ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                      {alert.active ? "Active" : "Inactive"}
                    </button>
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
