import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Loader2, Mail, Sparkles, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

type Provider = "google" | "apple";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StatusState {
  type: "idle" | "loading" | "success" | "error";
  message?: string;
}

export const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const { loginWithProvider, loginWithMagicLink, continueAsGuest, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<StatusState>({ type: "idle" });
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setEmail("");
      setStatus({ type: "idle" });
      setLocalLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleProvider = async (provider: Provider) => {
    setLocalLoading(true);
    setStatus({ type: "loading", message: "Connexion en cours..." });
    const result = await loginWithProvider(provider);
    if (result.success) {
      setStatus({ type: "success", message: "Connexion réussie ✨" });
      setTimeout(() => {
        onClose();
        setLocalLoading(false);
      }, 600);
    } else {
      setStatus({ type: "error", message: result.error ?? "Impossible de se connecter" });
      setLocalLoading(false);
    }
  };

  const handleMagicLink = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) return;

    setLocalLoading(true);
    setStatus({ type: "loading", message: "Envoi du lien magique..." });
    const result = await loginWithMagicLink(email);
    if (result.success) {
      const message = result.isNew
        ? "Compte créé ! Tu es connecté."
        : "Lien confirmé, connexion réussie ✨";
      setStatus({ type: "success", message });
      setTimeout(() => {
        onClose();
        setLocalLoading(false);
      }, 700);
    } else {
      setStatus({ type: "error", message: result.error ?? "Impossible d'envoyer le lien" });
      setLocalLoading(false);
    }
  };

  const handleGuest = () => {
    continueAsGuest();
    setStatus({ type: "success", message: "Mode invité activé" });
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const isBusy = localLoading || isLoading;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[60] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full max-w-md bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Fermer la fenêtre de connexion"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-8">
            <div className="text-center mb-6">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4F8BF7] to-[#6B9CFF] text-white">
                <Sparkles className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-semibold text-white">Connecte-toi</h2>
              <p className="mt-1 text-sm text-neutral-400">
                Sauvegardes, comparaisons et alertes prix en un clic.
              </p>
            </div>

            {status.type !== "idle" && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-5 rounded-2xl border px-4 py-3 text-sm ${
                  status.type === "error"
                    ? "border-red-500/30 bg-red-500/10 text-red-300"
                    : status.type === "success"
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                    : "border-white/10 bg-white/5 text-neutral-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  {status.type === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                  {status.type === "success" && <CheckCircle2 className="h-4 w-4" />}
                  <span>{status.message}</span>
                </div>
              </motion.div>
            )}

            <div className="space-y-3">
              <button
                onClick={() => handleProvider("google")}
                disabled={isBusy}
                className="w-full rounded-2xl bg-white py-2.5 text-sm font-medium text-black transition-transform hover:translate-y-[-2px]"
              >
                Continuer avec Google
              </button>
              <button
                onClick={() => handleProvider("apple")}
                disabled={isBusy}
                className="w-full rounded-2xl bg-white py-2.5 text-sm font-medium text-black transition-transform hover:translate-y-[-2px]"
              >
                Continuer avec Apple
              </button>
            </div>

            <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-neutral-500">
              <span className="h-px flex-1 bg-white/10" />
              ou email
              <span className="h-px flex-1 bg-white/10" />
            </div>

            <form onSubmit={handleMagicLink} className="space-y-3">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  placeholder="ton@email.com"
                  className="w-full rounded-2xl border border-white/10 bg-neutral-800/80 py-3 pl-12 pr-4 text-sm text-white placeholder:text-neutral-500 focus:border-[#4F8BF7] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={isBusy}
                className="relative flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] py-2.5 text-sm font-semibold text-white transition-transform hover:translate-y-[-2px] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isBusy ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Envoyer un lien magique
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>

            <button
              onClick={handleGuest}
              className="mt-5 w-full text-sm text-neutral-400 underline-offset-4 transition hover:text-white hover:underline"
            >
              Continuer en invité →
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
