<<<<<<< HEAD
import { useEffect, useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, User, LogOut, Settings, Heart, Save, ChevronDown, Star } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { AuthModal } from "./AuthModal";
import { useAuth } from "../contexts/AuthContext";
=======
import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Cpu, Loader2, LogOut, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { AuthModal } from "./AuthModal";
import { useAuth } from "../contexts/AuthContext";
import { useComparatorSelection } from "../contexts/ComparatorContext";
>>>>>>> 81e9197 (feat: revamp comparator experience)
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
<<<<<<< HEAD
  const { user, isLoggedIn, logout } = useAuth();
=======
  const { isLoggedIn, user, logout, isLoading } = useAuth();
  const { count: comparatorCount } = useComparatorSelection();
>>>>>>> 81e9197 (feat: revamp comparator experience)
  const location = useLocation();

  useEffect(() => {
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isLoggedIn) {
      setIsAuthModalOpen(false);
    } else {
      setIsUserMenuOpen(false);
    }
  }, [isLoggedIn]);

  const userInitial = (user?.username || user?.email || 'U').charAt(0).toUpperCase();

  const navigationItems = [
    { name: 'Configurateur', path: '/configurateur' },
    { name: 'Comparateur', path: '/comparateur' },
    { name: 'Composants', path: '/composants' },
    { name: 'Guides', path: '/guides' }
  ];

  return (
    <div className="min-h-screen bg-[#0E0E10] relative overflow-hidden">
      {/* Background Grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(74, 144, 226, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(74, 144, 226, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0E0E10]/30" />

      {/* Header */}
      <div className="fixed top-8 left-0 right-0 z-50 flex justify-center">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`flex items-center gap-8 px-12 py-4 border border-white/10 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl transition-all duration-300 ease-out ${isHeaderHovered ? 'shadow-2xl shadow-[#4A90E2]/20 border-[#4A90E2]/30' : 'shadow-lg shadow-black/20'
            }`}
          onHoverStart={() => setIsHeaderHovered(true)}
          onHoverEnd={() => setIsHeaderHovered(false)}
        >
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 text-[#F5F5F7] hover:text-[#4A90E2] transition-colors"
          >
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-gradient-to-br from-[#4A90E2] to-[#5BA3F5] rounded-lg flex items-center justify-center"
            >
              <Cpu className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-bold tracking-tight">siITE</span>
          </Link>

          {/* Navigation */}
<<<<<<< HEAD
          <nav className="flex items-center gap-6">
            {navigationItems.map(item => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${location.pathname === item.path
                    ? 'bg-gradient-to-br from-[#4A90E2] to-[#5BA3F5] text-white shadow-lg shadow-[#4A90E2]/30'
                    : 'text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5'
                  }`}
              >
                {item.name}
              </Link>
            ))}
=======
          <nav className="flex items-center gap-8">
            {navigationItems.map((item) => {
              const isComparator = item.path === "/comparateur";
              const showBadge = isComparator && comparatorCount > 0;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-[#A1A1AA] hover:text-[#F5F5F7] transition-all duration-200 text-sm font-medium relative group"
                >
                  <span className="flex items-center gap-2">
                    {item.name}
                    {showBadge && (
                      <span
                        className="min-w-5 rounded-full bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] px-1.5 py-0.5 text-[10px] font-semibold text-white"
                        aria-live="polite"
                      >
                        {comparatorCount}
                      </span>
                    )}
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-px bg-[#4F8BF7]"
                    initial={{ width: 0 }}
                    animate={{ width: location.pathname === item.path ? "100%" : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              );
            })}
>>>>>>> 81e9197 (feat: revamp comparator experience)
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {/* User Authentication */}
            {isLoggedIn ? (
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
<<<<<<< HEAD
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#4A90E2] to-[#5BA3F5] rounded-full text-white font-medium shadow-lg shadow-[#4A90E2]/30"
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm">{user?.username || 'Utilisateur'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </motion.button>

                {/* User Menu Dropdown */}
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-[#1a1a1a]/95 backdrop-blur-xl rounded-xl border border-white/10 shadow-xl z-50"
                    >
                      <div className="p-2">
                        <Link
                          to="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span>Tableau de bord</span>
                        </Link>
                        <Link
                          to="/favoris"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <Heart className="w-4 h-4" />
                          <span>Favoris ({user?.favoriteComponents?.length || 0})</span>
                        </Link>
                        <Link
                          to="/dashboard"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          <span>Configurations ({user?.savedConfigurations?.length || 0})</span>
                        </Link>
                        <Link
                          to="/fidelite"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <Star className="w-4 h-4" />
                          <span>Fidélité</span>
                        </Link>
                        <Link
                          to="/profil"
                          onClick={() => setIsUserMenuOpen(false)}
                          className="w-full flex items-center gap-3 px-3 py-2 text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span>Profil</span>
                        </Link>
                        <hr className="my-2 border-white/10" />
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Déconnexion</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
=======
                  onClick={() => setIsUserMenuOpen((prev) => !prev)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F8BF7] to-[#6B9CFF] flex items-center justify-center focus:outline-none"
                >
                  <span className="text-sm font-semibold text-white">{userInitial}</span>
                </motion.button>
                {isUserMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className="absolute right-0 mt-3 w-56 rounded-xl border border-white/10 bg-[#111113] shadow-xl shadow-black/40 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/5">
                      <p className="text-xs text-[#A1A1AA]">Connecté en tant que</p>
                      <p className="text-sm font-semibold text-[#F5F5F7] truncate">{user?.username || user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="flex w-full items-center gap-2 px-4 py-3 text-sm text-left text-[#F5F5F7] hover:bg-white/5 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-[#A1A1AA]" />
                      Déconnexion
                    </button>
                  </motion.div>
                )}
>>>>>>> 81e9197 (feat: revamp comparator experience)
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAuthModalOpen(true)}
<<<<<<< HEAD
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#4A90E2] to-[#5BA3F5] rounded-full text-white font-medium shadow-lg shadow-[#4A90E2]/30"
              >
                <User className="w-4 h-4" />
                <span className="text-sm">Connexion</span>
=======
                className="px-5 py-2.5 bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] text-white rounded-full text-sm font-semibold shadow-lg shadow-[#4F8BF7]/30 hover:shadow-[#4F8BF7]/50 transition-all duration-300 disabled:opacity-60 disabled:pointer-events-none"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Chargement
                  </span>
                ) : (
                  'Connexion'
                )}
>>>>>>> 81e9197 (feat: revamp comparator experience)
              </motion.button>
            )}
          </div>
        </motion.header>
      </div>

      {/* Main Content */}
      <main className="relative z-10 pt-24">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-[#1a1a1a]/50 backdrop-blur-xl border-t border-white/10 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#4A90E2] to-[#5BA3F5] rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-[#F5F5F7]">siITE</span>
              </div>
              <p className="text-[#A1A1AA] mb-6 max-w-md">
                La plateforme ultime pour configurer, comparer et optimiser votre PC gaming.
                Trouvez les meilleurs composants au meilleur prix.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-[#F5F5F7] font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                {navigationItems.map(item => (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-[#A1A1AA] hover:text-[#4A90E2] transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-[#F5F5F7] font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#A1A1AA] hover:text-[#4A90E2] transition-colors">
                    Centre d'aide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#A1A1AA] hover:text-[#4A90E2] transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#A1A1AA] hover:text-[#4A90E2] transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <hr className="border-white/10 my-8" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#A1A1AA] text-sm">
              © 2024 siITE. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-[#A1A1AA] hover:text-[#4A90E2] transition-colors">
                Politique de confidentialité
              </a>
              <a href="#" className="text-[#A1A1AA] hover:text-[#4A90E2] transition-colors">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </footer>
<<<<<<< HEAD

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
=======
      <AuthModal open={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
>>>>>>> 81e9197 (feat: revamp comparator experience)
    </div>
  );
};
