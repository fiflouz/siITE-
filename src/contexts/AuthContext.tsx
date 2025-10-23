import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
  savedConfigurations: Configuration[];
  favorites: string[];
  preferences: UserPreferences;
}

export interface Configuration {
  id: string;
  name: string;
  config: any;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  currency: 'EUR' | 'USD';
  notifications: boolean;
  newsletter: boolean;
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  saveConfiguration: (name: string, config: any, totalPrice: number) => Promise<boolean>;
  loadConfiguration: (configId: string) => Configuration | null;
  deleteConfiguration: (configId: string) => boolean;
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<boolean>;
  addToFavorites: (itemId: string) => void;
  removeFromFavorites: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  getStats: () => {
    totalConfigs: number;
    totalFavorites: number;
    totalSpent: number;
  };
}

// Create context
const STORAGE_KEY = 'siite_user';

const deserializeConfiguration = (raw: any): Configuration => ({
  ...raw,
  createdAt: raw?.createdAt ? new Date(raw.createdAt) : new Date(),
  updatedAt: raw?.updatedAt ? new Date(raw.updatedAt) : new Date()
});

const deserializeUser = (raw: any): User => {
  if (!raw) {
    throw new Error('Invalid user payload');
  }

  return {
    ...raw,
    createdAt: raw.createdAt ? new Date(raw.createdAt) : new Date(),
    savedConfigurations: Array.isArray(raw.savedConfigurations)
      ? raw.savedConfigurations.map(deserializeConfiguration)
      : [],
    favorites: Array.isArray(raw.favorites) ? [...raw.favorites] : [],
    preferences: {
      theme: raw.preferences?.theme ?? 'dark',
      currency: raw.preferences?.currency ?? 'EUR',
      notifications: raw.preferences?.notifications ?? true,
      newsletter: raw.preferences?.newsletter ?? false
    }
  };
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem(STORAGE_KEY);
        if (storedUser) {
          const parsedUser = deserializeUser(JSON.parse(storedUser));
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const existingUser = localStorage.getItem(`siite_user_${normalizedEmail}`);
      
      if (existingUser) {
        const userData = JSON.parse(existingUser);
        if (userData.password === password) {
          const hydratedUser = deserializeUser(userData.user);
          setUser(hydratedUser);
          return true;
        }
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
    setIsLoading(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUser = localStorage.getItem(`siite_user_${normalizedEmail}`);
      if (existingUser) {
        return false;
      }
      
      const newUser: User = {
        id: `user_${Date.now()}`,
        username,
        email: normalizedEmail,
        createdAt: new Date(),
        savedConfigurations: [],
        favorites: [],
        preferences: {
          theme: 'dark',
          currency: 'EUR',
          notifications: true,
          newsletter: false
        }
      };
      
      localStorage.setItem(`siite_user_${normalizedEmail}`, JSON.stringify({
        user: newUser,
        password
      }));
      
      setUser(deserializeUser(newUser));
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
    localStorage.removeItem(STORAGE_KEY);
  };

  const saveConfiguration = async (name: string, config: any, totalPrice: number): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const newConfig: Configuration = {
        id: `config_${Date.now()}`,
        name,
        config,
        totalPrice,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const updatedUser = {
        ...user,
        savedConfigurations: [...user.savedConfigurations, newConfig]
      };
      
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Save configuration error:', error);
      return false;
    }
  };

  const loadConfiguration = (configId: string): Configuration | null => {
    if (!user) return null;
    return user.savedConfigurations.find(config => config.id === configId) || null;
  };

  const deleteConfiguration = (configId: string): boolean => {
    if (!user) return false;
    
    try {
      const updatedUser = {
        ...user,
        savedConfigurations: user.savedConfigurations.filter(config => config.id !== configId)
      };
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Delete configuration error:', error);
      return false;
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    }
  };

  const updatePreferences = async (preferences: Partial<UserPreferences>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const updatedUser = {
        ...user,
        preferences: { ...user.preferences, ...preferences }
      };
      setUser(updatedUser);
      return true;
    } catch (error) {
      console.error('Update preferences error:', error);
      return false;
    }
  };

  const addToFavorites = (itemId: string) => {
    if (!user) return;
    
    if (!user.favorites.includes(itemId)) {
      const updatedUser = {
        ...user,
        favorites: [...user.favorites, itemId]
      };
      setUser(updatedUser);
    }
  };

  const removeFromFavorites = (itemId: string) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      favorites: user.favorites.filter(id => id !== itemId)
    };
    setUser(updatedUser);
  };

  const isFavorite = (itemId: string): boolean => {
    if (!user) return false;
    return user.favorites.includes(itemId);
  };

  const getStats = () => {
    if (!user) {
      return {
        totalConfigs: 0,
        totalFavorites: 0,
        totalSpent: 0
      };
    }
    
    return {
      totalConfigs: user.savedConfigurations.length,
      totalFavorites: user.favorites.length,
      totalSpent: user.savedConfigurations.reduce((sum, config) => sum + config.totalPrice, 0)
    };
  };

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    isLoading,
    login,
    register,
    logout,
    saveConfiguration,
    loadConfiguration,
    deleteConfiguration,
    updateProfile,
    updatePreferences,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getStats
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
