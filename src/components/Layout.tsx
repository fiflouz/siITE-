import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, User } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Configurateur', path: '/configurateur' },
    { name: 'Comparateur', path: '/comparateur' },
    { name: 'Composants', path: '/composants' },
    { name: 'Guides', path: '/guides' }
  ];

  return (
    <div className="min-h-screen bg-[#0E0E10] relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px]" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0E0E10]/50" />

      {/* Header */}
      <div className="fixed top-8 left-0 right-0 z-50 flex justify-center">
        <motion.header 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`flex items-center gap-8 px-12 py-4 border border-white/10 bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl transition-all duration-300 ease-out ${
            isHeaderHovered ? 'scale-110 shadow-2xl shadow-black/50' : 'scale-100'
          }`}
          onMouseEnter={() => setIsHeaderHovered(true)}
          onMouseLeave={() => setIsHeaderHovered(false)}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-[#4F8BF7] to-[#6B9CFF] rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Cpu className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-[#F5F5F7] tracking-tight">
              PC Builder
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="text-[#A1A1AA] hover:text-[#F5F5F7] transition-all duration-200 text-sm font-medium relative group"
              >
                {item.name}
                <motion.span 
                  className="absolute -bottom-1 left-0 h-px bg-[#4F8BF7]"
                  initial={{ width: 0 }}
                  animate={{ width: location.pathname === item.path ? '100%' : 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            
            {isLoggedIn ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-[#4F8BF7] to-[#6B9CFF] flex items-center justify-center"
              >
                <User className="w-5 h-5 text-white" />
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLoggedIn(true)}
                className="px-5 py-2.5 bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] text-white rounded-full text-sm font-semibold shadow-lg shadow-[#4F8BF7]/30 hover:shadow-[#4F8BF7]/50 transition-all duration-300"
              >
                Connexion
              </motion.button>
            )}
          </div>
        </motion.header>
      </div>

      {/* Main Content */}
      <main className="relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="relative z-10 mt-24 border-t border-white/10 bg-[#0C0C0C]/80 backdrop-blur-xl">
        <div className="container mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-[#4F8BF7] to-[#6B9CFF] rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold text-[#F5F5F7]">PC Builder</span>
              </div>
              <p className="text-[#A1A1AA] text-sm">
                Créez la configuration gaming parfaite avec nos outils intelligents.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-[#F5F5F7] font-semibold mb-4">Navigation</h4>
              <ul className="space-y-2">
                {navigationItems.map(item => (
                  <li key={item.name}>
                    <Link to={item.path} className="text-[#A1A1AA] hover:text-[#4F8BF7] text-sm transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-[#F5F5F7] font-semibold mb-4">Légal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#A1A1AA] hover:text-[#4F8BF7] text-sm transition-colors">Mentions légales</a></li>
                <li><a href="#" className="text-[#A1A1AA] hover:text-[#4F8BF7] text-sm transition-colors">CGU</a></li>
                <li><a href="#" className="text-[#A1A1AA] hover:text-[#4F8BF7] text-sm transition-colors">Confidentialité</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[#F5F5F7] font-semibold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#A1A1AA] hover:text-[#4F8BF7] text-sm transition-colors">Support</a></li>
                <li><a href="#" className="text-[#A1A1AA] hover:text-[#4F8BF7] text-sm transition-colors">À propos</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 text-center text-[#A1A1AA] text-sm">
            © 2024 PC Builder. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  );
};
