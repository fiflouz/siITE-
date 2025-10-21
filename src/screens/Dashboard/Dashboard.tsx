import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Settings, 
  Heart, 
  Save, 
  TrendingUp, 
  Calendar,
  Star,
  BarChart3,
  Cpu,
  HardDrive,
  Zap,
  Monitor,
  Gamepad2,
  Clock,
  Edit3,
  Trash2,
  Copy,
  Eye,
  Download,
  Share
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Dashboard: React.FC = () => {
  const { user, getStats, updateProfile, loadConfiguration, deleteConfiguration } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <User className="w-16 h-16 text-[#A1A1AA] mx-auto mb-4" />
          <h2 className="text-xl text-[#F5F5F7] mb-2">Accès non autorisé</h2>
          <p className="text-[#A1A1AA]">Veuillez vous connecter pour accéder à votre espace.</p>
        </div>
      </div>
    );
  }

  const stats = getStats();
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a1a2a] text-[#F5F5F7]">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#4A90E2]/20 to-[#5BA3F5]/20 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzRBOTBFMiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start justify-between"
          >
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-[#4A90E2] to-[#5BA3F5] rounded-2xl flex items-center justify-center shadow-xl shadow-[#4A90E2]/30">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[#1a1a1a] flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>
              
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] bg-clip-text text-transparent">
                  Salut, {user.username} !
                </h1>
                <p className="text-[#A1A1AA] text-lg mt-2">
                  Membre depuis le {formatDate(user.joinDate)}
                </p>
                <div className="flex items-center gap-4 mt-3 text-sm">
                  <div className="flex items-center gap-2 text-[#4A90E2]">
                    <Calendar className="w-4 h-4" />
                    Dernière connexion : {formatDate(user.lastLogin)}
                  </div>
                </div>
              </div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors"
            >
              <Settings className="w-6 h-6 text-[#A1A1AA]" />
            </motion.button>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-[#4A90E2]/20 rounded-xl">
                <Save className="w-6 h-6 text-[#4A90E2]" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-[#F5F5F7]">{stats.totalConfigs}</h3>
            <p className="text-[#A1A1AA] text-sm">Configurations sauvées</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-red-500/20 rounded-xl">
                <Heart className="w-6 h-6 text-red-400" />
              </div>
              <Star className="w-5 h-5 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold text-[#F5F5F7]">{stats.totalFavorites}</h3>
            <p className="text-[#A1A1AA] text-sm">Composants favoris</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-xl">
                <BarChart3 className="w-6 h-6 text-green-400" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-[#F5F5F7]">
              {formatPrice(stats.avgConfigPrice)}
            </h3>
            <p className="text-[#A1A1AA] text-sm">Prix moyen config</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-xl">
                <Gamepad2 className="w-6 h-6 text-purple-400" />
              </div>
              <Clock className="w-5 h-5 text-[#A1A1AA]" />
            </div>
            <h3 className="text-2xl font-bold text-[#F5F5F7]">{user.activityHistory.length}</h3>
            <p className="text-[#A1A1AA] text-sm">Actions effectuées</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Configurations */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-[#F5F5F7] flex items-center gap-3">
                  <Save className="w-6 h-6 text-[#4A90E2]" />
                  Configurations récentes
                </h2>
              </div>
              
              <div className="p-6">
                {user.savedConfigurations.length === 0 ? (
                  <div className="text-center py-12">
                    <Save className="w-12 h-12 text-[#A1A1AA] mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-[#F5F5F7] mb-2">
                      Aucune configuration sauvée
                    </h3>
                    <p className="text-[#A1A1AA] mb-6">
                      Commencez par créer votre première configuration PC
                    </p>
                    <button className="px-6 py-2 bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white rounded-lg font-medium hover:shadow-lg hover:shadow-[#4A90E2]/30 transition-all">
                      Créer une config
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {user.savedConfigurations.slice(0, 5).map((config) => (
                      <motion.div
                        key={config.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center justify-between p-4 bg-[#2a2a2a]/50 rounded-xl border border-white/5 hover:border-white/10 transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="p-2 bg-[#4A90E2]/20 rounded-lg">
                            <Monitor className="w-5 h-5 text-[#4A90E2]" />
                          </div>
                          <div>
                            <h4 className="font-medium text-[#F5F5F7]">{config.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-[#A1A1AA]">
                              <span>{formatPrice(config.totalPrice)}</span>
                              <span>•</span>
                              <span>{formatDate(config.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-[#A1A1AA] hover:text-[#4A90E2] transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-[#A1A1AA] hover:text-[#4A90E2] transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-[#A1A1AA] hover:text-[#4A90E2] transition-colors">
                            <Copy className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-[#A1A1AA] hover:text-red-400 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Activity & Favorites */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10"
            >
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-bold text-[#F5F5F7] flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#4A90E2]" />
                  Activité récente
                </h3>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {user.activityHistory.slice(0, 5).map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3">
                      <div className="p-1.5 bg-[#4A90E2]/20 rounded-lg mt-1">
                        {activity.type === 'config_saved' && <Save className="w-3 h-3 text-[#4A90E2]" />}
                        {activity.type === 'favorite_added' && <Heart className="w-3 h-3 text-red-400" />}
                        {activity.type === 'favorite_removed' && <Heart className="w-3 h-3 text-[#A1A1AA]" />}
                        {activity.type === 'profile_updated' && <User className="w-3 h-3 text-green-400" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[#F5F5F7] truncate">
                          {activity.description}
                        </p>
                        <p className="text-xs text-[#A1A1AA]">
                          {formatDate(activity.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10"
            >
              <div className="p-6 border-b border-white/10">
                <h3 className="text-lg font-bold text-[#F5F5F7] flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#4A90E2]" />
                  Composants favoris
                </h3>
              </div>
              
              <div className="p-6">
                {stats.mostUsedComponents.length === 0 ? (
                  <p className="text-[#A1A1AA] text-sm text-center">
                    Aucun composant utilisé
                  </p>
                ) : (
                  <div className="space-y-3">
                    {stats.mostUsedComponents.map((component, index) => {
                      const getComponentIcon = (type: string) => {
                        switch (type) {
                          case 'cpu': return <Cpu className="w-4 h-4" />;
                          case 'gpu': return <Monitor className="w-4 h-4" />;
                          case 'storage': return <HardDrive className="w-4 h-4" />;
                          case 'psu': return <Zap className="w-4 h-4" />;
                          default: return <Settings className="w-4 h-4" />;
                        }
                      };

                      return (
                        <div key={component} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="text-[#4A90E2]">
                              {getComponentIcon(component)}
                            </div>
                            <span className="text-sm text-[#F5F5F7] capitalize">
                              {component}
                            </span>
                          </div>
                          <div className="text-xs text-[#A1A1AA]">
                            #{index + 1}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};