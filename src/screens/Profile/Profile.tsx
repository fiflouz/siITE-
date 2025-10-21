import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Settings, 
  Camera, 
  Mail, 
  Calendar,
  Edit3,
  Save,
  X,
  Bell,
  Eye,
  EyeOff,
  Trash2,
  Download,
  Upload,
  Shield,
  Lock,
  CheckCircle,
  AlertCircle,
  Moon,
  Sun,
  Globe,
  Palette
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Profile: React.FC = () => {
  const { user, isLoggedIn, updateProfile, updatePreferences, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'privacy' | 'data'>('profile');
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    avatar: user?.avatar || ''
  });
  const [preferencesData, setPreferencesData] = useState({
    theme: user?.preferences.theme || 'dark',
    notifications: user?.preferences.notifications || true,
    newsletter: user?.preferences.newsletter || false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!isLoggedIn || !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a1a2a] flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-[#A1A1AA] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#F5F5F7] mb-2">Accès refusé</h2>
          <p className="text-[#A1A1AA]">Vous devez être connecté pour accéder au profil</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    clearMessage();
  };

  const handlePreferenceChange = (field: string, value: any) => {
    setPreferencesData(prev => ({ ...prev, [field]: value }));
  };

  const clearMessage = () => {
    setMessage({ type: '', text: '' });
  };

  const showMessage = (type: 'success' | 'error', text: string) => {
    setMessage({ type, text });
    setTimeout(() => clearMessage(), 5000);
  };

  const handleSaveProfile = async () => {
    if (!formData.username.trim()) {
      showMessage('error', 'Le nom d\'utilisateur est requis');
      return;
    }

    if (formData.username.length < 3) {
      showMessage('error', 'Le nom d\'utilisateur doit contenir au moins 3 caractères');
      return;
    }

    setIsLoading(true);

    try {
      const success = updateProfile({
        username: formData.username.trim(),
        email: formData.email.trim(),
        avatar: formData.avatar
      });

      if (success) {
        setIsEditing(false);
        showMessage('success', 'Profil mis à jour avec succès');
      } else {
        showMessage('error', 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      showMessage('error', 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);

    try {
      const success = updatePreferences(preferencesData);

      if (success) {
        showMessage('success', 'Préférences mises à jour');
      } else {
        showMessage('error', 'Erreur lors de la mise à jour');
      }
    } catch (error) {
      showMessage('error', 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = () => {
    const dataToExport = {
      profile: {
        username: user.username,
        email: user.email,
        joinDate: user.joinDate,
        preferences: user.preferences
      },
      configurations: user.savedConfigurations,
      favorites: user.favoriteComponents,
      activity: user.activityHistory
    };

    const blob = new Blob([JSON.stringify(dataToExport, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `siite-data-${user.username}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showMessage('success', 'Données exportées avec succès');
  };

  const handleDeleteAccount = () => {
    // TODO: Implement account deletion
    showMessage('error', 'Fonctionnalité bientôt disponible');
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const tabs = [
    { id: 'profile', name: 'Profil', icon: User },
    { id: 'preferences', name: 'Préférences', icon: Settings },
    { id: 'privacy', name: 'Confidentialité', icon: Shield },
    { id: 'data', name: 'Données', icon: Download }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a1a2a] text-[#F5F5F7]">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#4A90E2]/20 to-[#5BA3F5]/20 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzRBOTBFMiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-30"></div>
        
        <div className="relative max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >
            {/* Avatar */}
            <div className="relative group">
              <div className="w-24 h-24 bg-gradient-to-br from-[#4A90E2] to-[#5BA3F5] rounded-2xl flex items-center justify-center shadow-xl">
                {user.avatar ? (
                  <img 
                    src={user.avatar} 
                    alt={user.username}
                    className="w-full h-full rounded-2xl object-cover"
                  />
                ) : (
                  <User className="w-12 h-12 text-white" />
                )}
              </div>
              
              {isEditing && (
                <button className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                </button>
              )}
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#F5F5F7] mb-2">
                {user.username}
              </h1>
              <p className="text-[#A1A1AA] mb-4">
                Membre depuis le {formatDate(user.joinDate)}
              </p>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                  <Mail className="w-4 h-4" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#A1A1AA]">
                  <Calendar className="w-4 h-4" />
                  <span>Dernière connexion : {formatDate(user.lastLogin)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Message */}
        <AnimatePresence>
          {message.text && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`mb-6 p-4 rounded-xl border flex items-center gap-3 ${
                message.type === 'success'
                  ? 'bg-green-500/10 border-green-500/20 text-green-400'
                  : 'bg-red-500/10 border-red-500/20 text-red-400'
              }`}
            >
              {message.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <span>{message.text}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-[#2a2a2a] rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-[#4A90E2] text-white'
                    : 'text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-[#3a3a3a]'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Informations du profil</h2>
                <button
                  onClick={() => {
                    if (isEditing) {
                      setFormData({
                        username: user.username,
                        email: user.email,
                        avatar: user.avatar || ''
                      });
                    }
                    setIsEditing(!isEditing);
                    clearMessage();
                  }}
                  className="px-4 py-2 bg-[#4A90E2] text-white rounded-lg font-medium hover:bg-[#5BA3F5] transition-colors flex items-center gap-2"
                >
                  {isEditing ? (
                    <>
                      <X className="w-4 h-4" />
                      Annuler
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-4 h-4" />
                      Modifier
                    </>
                  )}
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#F5F5F7] mb-2">
                    Nom d'utilisateur
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-xl text-[#F5F5F7] focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-[#2a2a2a]/50 border border-white/5 rounded-xl text-[#F5F5F7]">
                      {user.username}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#F5F5F7] mb-2">
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-xl text-[#F5F5F7] focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-[#2a2a2a]/50 border border-white/5 rounded-xl text-[#F5F5F7]">
                      {user.email}
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleSaveProfile}
                      disabled={isLoading}
                      className="px-6 py-3 bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white font-semibold rounded-xl disabled:opacity-50 flex items-center gap-2"
                    >
                      {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Sauvegarder
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'preferences' && (
            <motion.div
              key="preferences"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10 p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Préférences</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#F5F5F7] mb-3">
                    Thème
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 bg-[#2a2a2a]/50 rounded-xl cursor-pointer hover:bg-[#2a2a2a] transition-colors">
                      <input
                        type="radio"
                        name="theme"
                        value="light"
                        checked={preferencesData.theme === 'light'}
                        onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                        className="text-[#4A90E2]"
                      />
                      <Sun className="w-5 h-5 text-yellow-400" />
                      <span>Clair</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-[#2a2a2a]/50 rounded-xl cursor-pointer hover:bg-[#2a2a2a] transition-colors">
                      <input
                        type="radio"
                        name="theme"
                        value="dark"
                        checked={preferencesData.theme === 'dark'}
                        onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                        className="text-[#4A90E2]"
                      />
                      <Moon className="w-5 h-5 text-blue-400" />
                      <span>Sombre</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="flex items-center justify-between p-4 bg-[#2a2a2a]/50 rounded-xl cursor-pointer hover:bg-[#2a2a2a] transition-colors">
                    <div className="flex items-center gap-3">
                      <Bell className="w-5 h-5 text-[#4A90E2]" />
                      <div>
                        <div className="font-medium">Notifications</div>
                        <div className="text-sm text-[#A1A1AA]">Recevoir des notifications dans l'application</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferencesData.notifications}
                      onChange={(e) => handlePreferenceChange('notifications', e.target.checked)}
                      className="w-5 h-5 text-[#4A90E2] rounded focus:ring-[#4A90E2]"
                    />
                  </label>
                </div>

                <div>
                  <label className="flex items-center justify-between p-4 bg-[#2a2a2a]/50 rounded-xl cursor-pointer hover:bg-[#2a2a2a] transition-colors">
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-[#4A90E2]" />
                      <div>
                        <div className="font-medium">Newsletter</div>
                        <div className="text-sm text-[#A1A1AA]">Recevoir les nouvelles et mises à jour par email</div>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={preferencesData.newsletter}
                      onChange={(e) => handlePreferenceChange('newsletter', e.target.checked)}
                      className="w-5 h-5 text-[#4A90E2] rounded focus:ring-[#4A90E2]"
                    />
                  </label>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleSavePreferences}
                    disabled={isLoading}
                    className="px-6 py-3 bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white font-semibold rounded-xl disabled:opacity-50 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    Sauvegarder les préférences
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'privacy' && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10 p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Confidentialité et Sécurité</h2>

              <div className="space-y-6">
                <div className="p-4 bg-[#2a2a2a]/50 rounded-xl">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-[#4A90E2]" />
                    Mot de passe
                  </h3>
                  <p className="text-[#A1A1AA] mb-4">
                    Changez votre mot de passe pour sécuriser votre compte
                  </p>
                  <button className="px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#5BA3F5] transition-colors">
                    Changer le mot de passe
                  </button>
                </div>

                <div className="p-4 bg-[#2a2a2a]/50 rounded-xl">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-[#4A90E2]" />
                    Visibilité du profil
                  </h3>
                  <p className="text-[#A1A1AA] mb-4">
                    Contrôlez qui peut voir vos informations et configurations
                  </p>
                  <select className="px-4 py-2 bg-[#2a2a2a] border border-white/10 rounded-lg text-[#F5F5F7] focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20">
                    <option value="private">Privé</option>
                    <option value="public">Public</option>
                    <option value="friends">Amis uniquement</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'data' && (
            <motion.div
              key="data"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10 p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Gestion des données</h2>

              <div className="space-y-6">
                <div className="p-4 bg-[#2a2a2a]/50 rounded-xl">
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <Download className="w-5 h-5 text-[#4A90E2]" />
                    Exporter mes données
                  </h3>
                  <p className="text-[#A1A1AA] mb-4">
                    Téléchargez une copie de toutes vos données (profil, configurations, favoris)
                  </p>
                  <button 
                    onClick={handleExportData}
                    className="px-4 py-2 bg-[#4A90E2] text-white rounded-lg hover:bg-[#5BA3F5] transition-colors flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Exporter
                  </button>
                </div>

                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                  <h3 className="font-semibold mb-2 flex items-center gap-2 text-red-400">
                    <Trash2 className="w-5 h-5" />
                    Supprimer le compte
                  </h3>
                  <p className="text-[#A1A1AA] mb-4">
                    Cette action est irréversible. Toutes vos données seront définitivement supprimées.
                  </p>
                  <button 
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Supprimer le compte
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setShowDeleteConfirm(false)}
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-red-500/20 p-6 max-w-md w-full"
              >
                <h3 className="text-xl font-bold text-red-400 mb-4">
                  Confirmer la suppression
                </h3>
                <p className="text-[#A1A1AA] mb-6">
                  Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible et toutes vos données seront perdues.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 px-4 py-2 text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 rounded-lg transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    onClick={handleDeleteAccount}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Supprimer
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};