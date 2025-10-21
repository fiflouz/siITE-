import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  joinDate: string;
  lastLogin: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    newsletter: boolean;
  };
  favoriteComponents: string[];
  savedConfigurations: SavedConfiguration[];
  activityHistory: ActivityItem[];
}

export interface SavedConfiguration {
  id: string;
  name: string;
  description?: string;
  components: {
    cpu?: any;
    gpu?: any;
    motherboard?: any;
    ram?: any;
    storage?: any;
    psu?: any;
    case?: any;
    cooling?: any;
  };
  totalPrice: number;
  createdAt: string;
  lastModified: string;
  tags?: string[];
  isPublic: boolean;
}

export interface ActivityItem {
  id: string;
  type: 'config_saved' | 'config_loaded' | 'favorite_added' | 'favorite_removed' | 'profile_updated';
  description: string;
  timestamp: string;
  metadata?: any;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  
  // Auth actions
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Configuration management
  saveConfiguration: (config: any, name: string, description?: string) => Promise<string>;
  loadConfiguration: (configId: string) => SavedConfiguration | null;
  deleteConfiguration: (configId: string) => boolean;
  duplicateConfiguration: (configId: string, newName: string) => Promise<string>;
  updateConfiguration: (configId: string, updates: Partial<SavedConfiguration>) => boolean;
  
  // Favorites management
  addToFavorites: (componentId: string) => boolean;
  removeFromFavorites: (componentId: string) => boolean;
  isFavorite: (componentId: string) => boolean;
  
  // Profile management
  updateProfile: (updates: Partial<User>) => boolean;
  updatePreferences: (preferences: Partial<User['preferences']>) => boolean;
  
  // Stats & utilities
  getStats: () => {
    totalConfigs: number;
    totalFavorites: number;
    avgConfigPrice: number;
    mostUsedComponents: string[];
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Storage keys
const STORAGE_KEYS = {
  USERS: 'siite_users',
  CURRENT_USER: 'siite_current_user',
  SESSION: 'siite_session'
};

// Utility functions
const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const getStoredUsers = (): Record<string, User> => {
  try {
    const users = localStorage.getItem(STORAGE_KEYS.USERS);
    return users ? JSON.parse(users) : {};
  } catch {
    return {};
  }
};

const saveUsers = (users: Record<string, User>) => {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

const createDefaultUser = (username: string, email: string): User => ({
  id: generateId(),
  username,
  email,
  joinDate: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
  preferences: {
    theme: 'dark',
    notifications: true,
    newsletter: false
  },
  favoriteComponents: [],
  savedConfigurations: [],
  activityHistory: [{
    id: generateId(),
    type: 'profile_updated',
    description: 'Compte créé avec succès',
    timestamp: new Date().toISOString()
  }]
});

const addActivity = (user: User, activity: Omit<ActivityItem, 'id' | 'timestamp'>): User => ({
  ...user,
  activityHistory: [
    {
      ...activity,
      id: generateId(),
      timestamp: new Date().toISOString()
    },
    ...user.activityHistory.slice(0, 49) // Keep last 50 activities
  ]
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    try {
      const currentUserId = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (currentUserId) {
        const users = getStoredUsers();
        const userData = users[currentUserId];
        if (userData) {
          setUser(userData);
        } else {
          localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
        }
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save user data when user changes
  useEffect(() => {
    if (user) {
      const users = getStoredUsers();
      users[user.id] = user;
      saveUsers(users);
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const users = getStoredUsers();
      const userData = Object.values(users).find(u => u.email === email);
      
      if (userData) {
        // Update last login
        const updatedUser = {
          ...userData,
          lastLogin: new Date().toISOString()
        };
        
        setUser(updatedUser);
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, userData.id);
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = getStoredUsers();
      
      // Check if email already exists
      if (Object.values(users).some(u => u.email === email)) {
        return false;
      }
      
      const newUser = createDefaultUser(username, email);
      
      users[newUser.id] = newUser;
      saveUsers(users);
      
      setUser(newUser);
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, newUser.id);
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  };

  const saveConfiguration = async (config: any, name: string, description?: string): Promise<string> => {
    if (!user) throw new Error('User not authenticated');
    
    const configId = generateId();
    const totalPrice = Object.values(config).reduce((sum: number, component: any) => {
      return sum + (component?.price || 0);
    }, 0);
    
    const newConfig: SavedConfiguration = {
      id: configId,
      name,
      description,
      components: config,
      totalPrice,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      isPublic: false
    };
    
    const updatedUser = {
      ...user,
      savedConfigurations: [newConfig, ...user.savedConfigurations]
    };
    
    const userWithActivity = addActivity(updatedUser, {
      type: 'config_saved',
      description: `Configuration "${name}" sauvegardée`,
      metadata: { configId, totalPrice }
    });
    
    setUser(userWithActivity);
    return configId;
  };

  const loadConfiguration = (configId: string): SavedConfiguration | null => {
    if (!user) return null;
    return user.savedConfigurations.find(config => config.id === configId) || null;
  };

  const deleteConfiguration = (configId: string): boolean => {
    if (!user) return false;
    
    const configToDelete = user.savedConfigurations.find(c => c.id === configId);
    if (!configToDelete) return false;
    
    const updatedUser = {
      ...user,
      savedConfigurations: user.savedConfigurations.filter(config => config.id !== configId)
    };
    
    const userWithActivity = addActivity(updatedUser, {
      type: 'config_saved',
      description: `Configuration "${configToDelete.name}" supprimée`
    });
    
    setUser(userWithActivity);
    return true;
  };

  const duplicateConfiguration = async (configId: string, newName: string): Promise<string> => {
    const originalConfig = loadConfiguration(configId);
    if (!originalConfig) throw new Error('Configuration not found');
    
    return saveConfiguration(originalConfig.components, newName, originalConfig.description);
  };

  const updateConfiguration = (configId: string, updates: Partial<SavedConfiguration>): boolean => {
    if (!user) return false;
    
    const configIndex = user.savedConfigurations.findIndex(c => c.id === configId);
    if (configIndex === -1) return false;
    
    const updatedConfigs = [...user.savedConfigurations];
    updatedConfigs[configIndex] = {
      ...updatedConfigs[configIndex],
      ...updates,
      lastModified: new Date().toISOString()
    };
    
    setUser({
      ...user,
      savedConfigurations: updatedConfigs
    });
    
    return true;
  };

  const addToFavorites = (componentId: string): boolean => {
    if (!user || user.favoriteComponents.includes(componentId)) return false;
    
    const updatedUser = {
      ...user,
      favoriteComponents: [componentId, ...user.favoriteComponents]
    };
    
    const userWithActivity = addActivity(updatedUser, {
      type: 'favorite_added',
      description: `Composant ajouté aux favoris`,
      metadata: { componentId }
    });
    
    setUser(userWithActivity);
    return true;
  };

  const removeFromFavorites = (componentId: string): boolean => {
    if (!user || !user.favoriteComponents.includes(componentId)) return false;
    
    const updatedUser = {
      ...user,
      favoriteComponents: user.favoriteComponents.filter(id => id !== componentId)
    };
    
    const userWithActivity = addActivity(updatedUser, {
      type: 'favorite_removed',
      description: `Composant retiré des favoris`,
      metadata: { componentId }
    });
    
    setUser(userWithActivity);
    return true;
  };

  const isFavorite = (componentId: string): boolean => {
    return user?.favoriteComponents.includes(componentId) || false;
  };

  const updateProfile = (updates: Partial<User>): boolean => {
    if (!user) return false;
    
    const updatedUser = { ...user, ...updates };
    const userWithActivity = addActivity(updatedUser, {
      type: 'profile_updated',
      description: 'Profil mis à jour'
    });
    
    setUser(userWithActivity);
    return true;
  };

  const updatePreferences = (preferences: Partial<User['preferences']>): boolean => {
    if (!user) return false;
    
    const updatedUser = {
      ...user,
      preferences: { ...user.preferences, ...preferences }
    };
    
    setUser(updatedUser);
    return true;
  };

  const getStats = () => {
    if (!user) {
      return {
        totalConfigs: 0,
        totalFavorites: 0,
        avgConfigPrice: 0,
        mostUsedComponents: []
      };
    }
    
    const totalConfigs = user.savedConfigurations.length;
    const totalFavorites = user.favoriteComponents.length;
    const avgConfigPrice = totalConfigs > 0 
      ? user.savedConfigurations.reduce((sum, config) => sum + config.totalPrice, 0) / totalConfigs
      : 0;
    
    // Count component usage
    const componentCount: Record<string, number> = {};
    user.savedConfigurations.forEach(config => {
      Object.keys(config.components).forEach(type => {
        if (config.components[type]) {
          componentCount[type] = (componentCount[type] || 0) + 1;
        }
      });
    });
    
    const mostUsedComponents = Object.entries(componentCount)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([component]) => component);
    
    return {
      totalConfigs,
      totalFavorites,
      avgConfigPrice,
      mostUsedComponents
    };
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    isLoading,
    
    // Auth actions
    login,
    register,
    logout,
    
    // Configuration management
    saveConfiguration,
    loadConfiguration,
    deleteConfiguration,
    duplicateConfiguration,
    updateConfiguration,
    
    // Favorites management
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    
    // Profile management
    updateProfile,
    updatePreferences,
    
    // Stats & utilities
    getStats
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};