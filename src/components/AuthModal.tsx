import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn, 
  UserPlus,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { login, register } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const validateForm = () => {
    if (!isLogin) {
      if (!formData.username.trim()) {
        setError('Le nom d\'utilisateur est requis');
        return false;
      }
      if (formData.username.length < 3) {
        setError('Le nom d\'utilisateur doit contenir au moins 3 caractères');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Les mots de passe ne correspondent pas');
        return false;
      }
    }
    
    if (!formData.email.trim()) {
      setError('L\'email est requis');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Format d\'email invalide');
      return false;
    }
    
    if (!formData.password.trim()) {
      setError('Le mot de passe est requis');
      return false;
    }
    
    if (formData.password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      let result = false;
      
      if (isLogin) {
        result = await login(formData.email, formData.password);
        if (result) {
          setSuccess('Connexion réussie !');
          setTimeout(() => {
            onClose();
            resetForm();
          }, 1500);
        } else {
          setError('Email ou mot de passe incorrect');
        }
      } else {
        result = await register(formData.username, formData.email, formData.password);
        if (result) {
          setSuccess('Inscription réussie ! Vous êtes maintenant connecté.');
          setTimeout(() => {
            onClose();
            resetForm();
          }, 2000);
        } else {
          setError('Cet email est déjà utilisé');
        }
      }
    } catch (error) {
      setError('Une erreur est survenue. Veuillez réessayer.');
      console.error('Auth error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setError('');
    setSuccess('');
    setIsLoading(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="relative p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#F5F5F7] flex items-center gap-2">
                  {isLogin ? (
                    <>
                      <LogIn className="w-6 h-6 text-[#4A90E2]" />
                      Connexion
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-6 h-6 text-[#4A90E2]" />
                      Inscription
                    </>
                  )}
                </h2>
                <p className="text-sm text-[#A1A1AA] mt-1">
                  {isLogin 
                    ? 'Connectez-vous pour accéder à votre espace' 
                    : 'Créez un compte pour commencer'
                  }
                </p>
              </div>
              <button
                onClick={handleClose}
                className="p-2 text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">{/* Username (Register only) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-[#F5F5F7]">
                  Nom d'utilisateur
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Votre nom d'utilisateur"
                    className="w-full pl-10 pr-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-xl text-[#F5F5F7] placeholder-[#A1A1AA] focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors"
                    required
                  />
                </div>
              </motion.div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#F5F5F7]">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="votre@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-xl text-[#F5F5F7] placeholder-[#A1A1AA] focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#F5F5F7]">
                Mot de passe
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-[#2a2a2a] border border-white/10 rounded-xl text-[#F5F5F7] placeholder-[#A1A1AA] focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Register only) */}
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                <label className="text-sm font-medium text-[#F5F5F7]">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-[#2a2a2a] border border-white/10 rounded-xl text-[#F5F5F7] placeholder-[#A1A1AA] focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Error/Success Messages */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}
              
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <p className="text-sm text-green-400">{success}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white font-semibold rounded-xl shadow-lg shadow-[#4A90E2]/30 hover:shadow-[#4A90E2]/50 focus:ring-2 focus:ring-[#4A90E2]/50 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {isLogin ? 'Connexion...' : 'Inscription...'}
                </>
              ) : (
                <>
                  {isLogin ? (
                    <>
                      <LogIn className="w-5 h-5" />
                      Se connecter
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      S'inscrire
                    </>
                  )}
                </>
              )}
            </button>

            {/* Switch Mode */}
            <div className="text-center">
              <button
                type="button"
                onClick={switchMode}
                className="text-sm text-[#A1A1AA] hover:text-[#4A90E2] transition-colors"
              >
                {isLogin ? (
                  <>
                    Pas encore de compte ? <span className="font-medium">Inscrivez-vous</span>
                  </>
                ) : (
                  <>
                    Déjà un compte ? <span className="font-medium">Connectez-vous</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Demo Info */}
          {isLogin && (
            <div className="px-6 pb-6">
              <div className="p-3 bg-[#4A90E2]/10 border border-[#4A90E2]/20 rounded-lg">
                <p className="text-xs text-[#4A90E2] text-center">
                  💡 <strong>Démo :</strong> Utilisez n'importe quel email valide pour vous connecter ou créer un compte
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};