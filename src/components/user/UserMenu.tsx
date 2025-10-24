import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Star, Wrench, Bell, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface UserMenuProps {
  user?: {
    name?: string;
    email?: string;
    avatar?: string;
  };
  onSignOut?: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user, onSignOut }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Gérer Escape pour fermer
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Obtenir les initiales
  const getInitials = () => {
    if (user?.name) {
      return user.name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return 'U';
  };

  const menuItems = [
    {
      icon: Zap,
      label: 'Mes comparaisons',
      path: '/comparateur',
      description: 'Voir mes produits comparés',
    },
    {
      icon: Star,
      label: 'Sauvegardés',
      path: '/favoris',
      description: 'Mes composants favoris',
    },
    {
      icon: Wrench,
      label: 'Mes configs',
      path: '/dashboard',
      description: 'Gérer mes configurations',
    },
    {
      icon: Bell,
      label: 'Mes alertes',
      path: '/profil#alerts',
      description: 'Alertes de prix',
    },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleSignOut = () => {
    setIsOpen(false);
    if (onSignOut) {
      onSignOut();
    } else {
      // Stub: simuler une déconnexion
      console.log('Déconnexion (stub)');
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4A90E2]"
        aria-label="Menu utilisateur"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt={user.name || 'Avatar'}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#5BA3F5] flex items-center justify-center text-white font-semibold text-sm">
            {getInitials()}
          </div>
        )}
        <div className="hidden md:flex flex-col items-start">
          <span className="text-sm font-semibold text-[#F5F5F7]">
            {user?.name || 'Utilisateur'}
          </span>
          <span className="text-xs text-[#A1A1AA]">Mon compte</span>
        </div>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-80 bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
            role="menu"
            aria-orientation="vertical"
          >
            {/* User Info */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name || 'Avatar'}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4A90E2] to-[#5BA3F5] flex items-center justify-center text-white font-bold text-lg">
                    {getInitials()}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#F5F5F7] truncate">
                    {user?.name || 'Utilisateur'}
                  </p>
                  {user?.email && (
                    <p className="text-xs text-[#A1A1AA] truncate">{user.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              {menuItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigate(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left focus:outline-none focus-visible:bg-white/5"
                  role="menuitem"
                >
                  <div className="p-2 bg-[#4A90E2]/10 rounded-lg">
                    <item.icon className="w-5 h-5 text-[#4A90E2]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#F5F5F7]">{item.label}</p>
                    <p className="text-xs text-[#A1A1AA]">{item.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Bottom Actions */}
            <div className="py-2">
              <button
                onClick={() => handleNavigate('/profil')}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors text-left focus:outline-none focus-visible:bg-white/5"
                role="menuitem"
              >
                <Settings className="w-5 h-5 text-[#A1A1AA]" />
                <span className="text-sm text-[#F5F5F7]">Paramètres du compte</span>
              </button>

              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors text-left focus:outline-none focus-visible:bg-red-500/10"
                role="menuitem"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Déconnexion</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
