import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LogOut, Palette, User2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { ThemeToggle } from "./ThemeToggle";

const initialsFrom = (name?: string, email?: string) => {
  const source = name && name.trim().length > 0 ? name : email;
  if (!source) return "U";
  return source.trim().charAt(0).toUpperCase();
};

export const UserMenu = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (menuRef.current.contains(event.target as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const quickActions = useMemo(
    () => [
      {
        icon: "⚡",
        label: "Mes comparaisons",
        to: "/me/comparisons",
        count: user?.savedComparisons.length ?? 0,
      },
      {
        icon: "⭐",
        label: "Sauvegardés",
        to: "/me/saved",
        count: user?.savedItems.length ?? user?.favorites.length ?? 0,
      },
      {
        icon: "🧰",
        label: "Mes configs",
        to: "/me/builds",
        count: user?.savedConfigurations.length ?? 0,
      },
      {
        icon: "🔔",
        label: "Mes alertes",
        to: "/me/alerts",
        count: user?.priceAlerts.length ?? 0,
      },
    ],
    [
      user?.favorites.length,
      user?.priceAlerts.length,
      user?.savedComparisons.length,
      user?.savedConfigurations.length,
      user?.savedItems.length,
    ],
  );

  if (!user) {
    return null;
  }

  const firstName = user.firstName ?? user.username ?? "Utilisateur";

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#4F8BF7] to-[#6B9CFF] text-lg font-semibold text-white shadow-lg shadow-[#4F8BF7]/30 transition-transform duration-200 hover:scale-105"
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        {initialsFrom(user.firstName, user.email)}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-72 overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/95 p-3 shadow-2xl backdrop-blur-xl"
          >
            <div className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="text-[11px] uppercase tracking-[0.25em] text-neutral-500">
                Connecté en tant que
              </p>
              <div className="mt-1 text-sm font-semibold text-white">{firstName}</div>
              <div className="mt-2 flex items-center justify-between text-xs text-neutral-400">
                <span className="truncate" title={user.email}>
                  {user.email}
                </span>
                <span className="rounded-full bg-[#4F8BF7]/20 px-2 py-0.5 text-[10px] font-semibold text-[#4F8BF7]">
                  {user.statusLabel}
                </span>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.to}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium text-neutral-200 transition-colors hover:bg-white/5"
                >
                  <span className="flex items-center gap-2">
                    <span>{action.icon}</span>
                    {action.label}
                  </span>
                  {action.count > 0 && (
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-white/80">
                      {action.count}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="my-3 h-px bg-white/10" />

            <div className="space-y-1 text-sm text-neutral-300">
              <Link
                to="/me"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 transition-colors hover:bg-white/5"
              >
                <User2 className="h-4 w-4" />
                Compte
              </Link>
              <div className="flex items-center justify-between rounded-xl px-3 py-2 text-neutral-300">
                <span className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  Thème
                </span>
                <div className="-mr-1 scale-90">
                  <ThemeToggle />
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-300 transition-colors hover:bg-red-500/10"
              >
                <LogOut className="h-4 w-4" />
                Déconnexion
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
