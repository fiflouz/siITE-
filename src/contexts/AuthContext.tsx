import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type OAuthProvider = "google" | "apple";

type ActivityType =
  | "login"
  | "magic_link_login"
  | "oauth_login"
  | "config_saved"
  | "favorite_added"
  | "favorite_removed"
  | "profile_updated"
  | "preferences_updated"
  | "onboarding_completed";

export interface Activity {
  id: string;
  type: ActivityType;
  description: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface Configuration {
  id: string;
  name: string;
  config: any;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface SavedComparison {
  id: string;
  productIds: string[];
  title?: string;
  createdAt: string;
}

export interface PriceAlert {
  id: string;
  productId: string;
  thresholdEur: number;
  active: boolean;
  createdAt: string;
}

export interface UserPreferences {
  theme: "light" | "dark";
  currency: "EUR" | "USD";
  notifications: boolean;
  newsletter: boolean;
}

export interface UserSettings {
  budgetMin: number;
  budgetMax: number;
  useCases: string[];
  preferredBrands: string[];
  onboardingCompleted: boolean;
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  email: string;
  createdAt: string;
  joinDate: string;
  lastLogin: string;
  plan: "free" | "pro";
  statusLabel: string;
  avatar?: string;
  isGuest?: boolean;
  savedConfigurations: Configuration[];
  favorites: string[];
  favoriteComponents: string[];
  savedItems: string[];
  savedComparisons: SavedComparison[];
  priceAlerts: PriceAlert[];
  activityHistory: Activity[];
  preferences: UserPreferences;
  settings: UserSettings;
}

export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  authModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  loginWithProvider: (provider: OAuthProvider) => Promise<{ success: boolean; error?: string }>;
  loginWithMagicLink: (email: string) => Promise<{ success: boolean; error?: string; isNew?: boolean }>;
  continueAsGuest: () => void;
  logout: () => void;
  completeOnboarding: (settings: Partial<UserSettings>) => void;
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
    avgConfigPrice: number;
    mostUsedComponents: string[];
  };
}

const SESSION_KEY = "siite_user";

const userRecordKey = (email: string) => `siite_user_${email}`;
const providerRegistryKey = (provider: OAuthProvider) => `siite_oauth_${provider}`;

const defaultPreferences: UserPreferences = {
  theme: "dark",
  currency: "EUR",
  notifications: true,
  newsletter: false,
};

const defaultSettings: UserSettings = {
  budgetMin: 1200,
  budgetMax: 2500,
  useCases: [],
  preferredBrands: [],
  onboardingCompleted: false,
};

const generateId = (prefix: string) => `${prefix}_${Math.random().toString(36).slice(2, 8)}${Date.now().toString(36)}`;

const inferNameFromEmail = (email: string) => {
  const label = email.split("@")[0] ?? "Utilisateur";
  const cleaned = label.replace(/[^a-zA-Z]/g, " ").trim();
  if (!cleaned) {
    return "Utilisateur";
  }
  const [first, ...rest] = cleaned.split(" ").filter(Boolean);
  const firstName = first.charAt(0).toUpperCase() + first.slice(1);
  if (rest.length === 0) {
    return firstName;
  }
  const lastName = rest[0].charAt(0).toUpperCase() + rest[0].slice(1);
  return `${firstName} ${lastName}`;
};

const deserializeConfiguration = (raw: any): Configuration => ({
  id: raw?.id ?? generateId("config"),
  name: raw?.name ?? "Configuration",
  config: raw?.config ?? {},
  totalPrice: typeof raw?.totalPrice === "number" ? raw.totalPrice : 0,
  createdAt: raw?.createdAt ?? new Date().toISOString(),
  updatedAt: raw?.updatedAt ?? raw?.createdAt ?? new Date().toISOString(),
});

const deserializeActivity = (raw: any): Activity => ({
  id: raw?.id ?? generateId("activity"),
  type: (raw?.type as ActivityType) ?? "login",
  description: raw?.description ?? "Connexion",
  timestamp: raw?.timestamp ?? new Date().toISOString(),
  metadata: raw?.metadata ?? {},
});

const deserializeComparison = (raw: any): SavedComparison => ({
  id: raw?.id ?? generateId("comparison"),
  productIds: Array.isArray(raw?.productIds) ? raw.productIds : [],
  title: raw?.title,
  createdAt: raw?.createdAt ?? new Date().toISOString(),
});

const deserializePriceAlert = (raw: any): PriceAlert => ({
  id: raw?.id ?? generateId("alert"),
  productId: raw?.productId ?? "",
  thresholdEur: typeof raw?.thresholdEur === "number" ? raw.thresholdEur : 0,
  active: raw?.active ?? true,
  createdAt: raw?.createdAt ?? new Date().toISOString(),
});

const deserializeUser = (raw: any): User => {
  if (!raw) {
    throw new Error("Invalid user payload");
  }

  const preferences: UserPreferences = {
    ...defaultPreferences,
    ...(raw.preferences ?? {}),
  };

  const settingsRaw = raw.settings ?? {};
  const settings: UserSettings = {
    budgetMin:
      typeof settingsRaw.budgetMin === "number" ? settingsRaw.budgetMin : defaultSettings.budgetMin,
    budgetMax:
      typeof settingsRaw.budgetMax === "number" ? settingsRaw.budgetMax : defaultSettings.budgetMax,
    useCases: Array.isArray(settingsRaw.useCases) ? settingsRaw.useCases : defaultSettings.useCases,
    preferredBrands: Array.isArray(settingsRaw.preferredBrands)
      ? settingsRaw.preferredBrands
      : defaultSettings.preferredBrands,
    onboardingCompleted: Boolean(settingsRaw.onboardingCompleted),
  };

  const favorites = Array.isArray(raw.favorites)
    ? raw.favorites
    : Array.isArray(raw.favoriteComponents)
    ? raw.favoriteComponents
    : [];

  const savedItems = Array.isArray(raw.savedItems) ? raw.savedItems : favorites;

  const user: User = {
    id: raw.id ?? generateId("user"),
    username: raw.username ?? raw.firstName ?? inferNameFromEmail(raw.email ?? ""),
    firstName: raw.firstName ?? (raw.username ?? inferNameFromEmail(raw.email ?? "")).split(" ")[0],
    email: raw.email ?? "",
    createdAt: raw.createdAt ? new Date(raw.createdAt).toISOString() : new Date().toISOString(),
    joinDate: raw.joinDate ? new Date(raw.joinDate).toISOString() : new Date().toISOString(),
    lastLogin: raw.lastLogin ? new Date(raw.lastLogin).toISOString() : new Date().toISOString(),
    plan: raw.plan === "pro" ? "pro" : "free",
    statusLabel: raw.statusLabel ?? "Gratuit",
    avatar: raw.avatar,
    isGuest: Boolean(raw.isGuest),
    savedConfigurations: Array.isArray(raw.savedConfigurations)
      ? raw.savedConfigurations.map(deserializeConfiguration)
      : [],
    favorites,
    favoriteComponents: favorites,
    savedItems,
    savedComparisons: Array.isArray(raw.savedComparisons)
      ? raw.savedComparisons.map(deserializeComparison)
      : [],
    priceAlerts: Array.isArray(raw.priceAlerts) ? raw.priceAlerts.map(deserializePriceAlert) : [],
    activityHistory: Array.isArray(raw.activityHistory)
      ? raw.activityHistory.map(deserializeActivity)
      : [],
    preferences,
    settings,
  };

  return user;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const appendActivity = (current: User, activity: Activity): User => ({
  ...current,
  activityHistory: [activity, ...current.activityHistory].slice(0, 50),
});

const persistSession = (nextUser: User | null) => {
  if (typeof window === "undefined") return;
  if (nextUser) {
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }
};

const persistUserRecord = (nextUser: User, passwordOverride?: string | null) => {
  if (typeof window === "undefined") return;
  if (nextUser.isGuest) return;

  const key = userRecordKey(nextUser.email);
  let passwordToStore: string | null | undefined = passwordOverride;

  if (passwordToStore === undefined) {
    try {
      const existingRecord = window.localStorage.getItem(key);
      if (existingRecord) {
        const parsed = JSON.parse(existingRecord);
        passwordToStore = parsed?.password ?? null;
      }
    } catch (error) {
      console.error("Unable to reuse stored password", error);
      passwordToStore = null;
    }
  }

  window.localStorage.setItem(
    key,
    JSON.stringify({
      user: nextUser,
      password: passwordToStore ?? null,
    }),
  );
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const storedUser = window.localStorage.getItem(SESSION_KEY);
      if (storedUser) {
        const parsed = deserializeUser(JSON.parse(storedUser));
        setUser(parsed);
      }
    } catch (error) {
      console.error("Error loading session", error);
      window.localStorage.removeItem(SESSION_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const commitUser = (nextUser: User, options?: { passwordOverride?: string | null }) => {
    setUser(nextUser);
    persistSession(nextUser);
    persistUserRecord(nextUser, options?.passwordOverride);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    if (typeof window === "undefined") return false;
    setIsLoading(true);
    const normalizedEmail = email.trim().toLowerCase();

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      const record = window.localStorage.getItem(userRecordKey(normalizedEmail));
      if (!record) {
        return false;
      }
      const parsed = JSON.parse(record);
      if (parsed?.password !== password) {
        return false;
      }

      const hydrated = deserializeUser(parsed.user);
      const updated: User = appendActivity(
        {
          ...hydrated,
          lastLogin: new Date().toISOString(),
        },
        {
          id: generateId("activity"),
          type: "login",
          description: "Connexion réussie",
          timestamp: new Date().toISOString(),
        },
      );

      commitUser(updated);
      setAuthModalOpen(false);
      return true;
    } catch (error) {
      console.error("Login error", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    if (typeof window === "undefined") return false;
    setIsLoading(true);
    const normalizedEmail = email.trim().toLowerCase();

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const existing = window.localStorage.getItem(userRecordKey(normalizedEmail));
      if (existing) {
        return false;
      }

      const now = new Date().toISOString();
      const firstName = username.split(" ")[0] || inferNameFromEmail(normalizedEmail);

      const newUser: User = {
        id: generateId("user"),
        username,
        firstName,
        email: normalizedEmail,
        createdAt: now,
        joinDate: now,
        lastLogin: now,
        plan: "free",
        statusLabel: "Gratuit",
        savedConfigurations: [],
        favorites: [],
        favoriteComponents: [],
        savedItems: [],
        savedComparisons: [],
        priceAlerts: [],
        activityHistory: [
          {
            id: generateId("activity"),
            type: "login",
            description: "Création du compte",
            timestamp: now,
          },
        ],
        preferences: { ...defaultPreferences },
        settings: { ...defaultSettings },
      };

      commitUser(newUser, { passwordOverride: password });
      window.localStorage.setItem(
        userRecordKey(normalizedEmail),
        JSON.stringify({ user: newUser, password }),
      );
      setAuthModalOpen(false);
      return true;
    } catch (error) {
      console.error("Registration error", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithMagicLink = async (
    email: string,
  ): Promise<{ success: boolean; error?: string; isNew?: boolean }> => {
    if (typeof window === "undefined") return { success: false, error: "Navigateur indisponible" };
    setIsLoading(true);
    const normalizedEmail = email.trim().toLowerCase();

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const recordKey = userRecordKey(normalizedEmail);
      const record = window.localStorage.getItem(recordKey);
      const now = new Date().toISOString();

      if (record) {
        const parsed = JSON.parse(record);
        const hydrated = deserializeUser(parsed.user);
        const updated: User = appendActivity(
          {
            ...hydrated,
            lastLogin: now,
          },
          {
            id: generateId("activity"),
            type: "magic_link_login",
            description: "Connexion via lien magique",
            timestamp: now,
          },
        );
        commitUser(updated);
        setAuthModalOpen(false);
        return { success: true, isNew: false };
      }

      const inferredName = inferNameFromEmail(normalizedEmail);
      const newUser: User = {
        id: generateId("user"),
        username: inferredName,
        firstName: inferredName.split(" ")[0],
        email: normalizedEmail,
        createdAt: now,
        joinDate: now,
        lastLogin: now,
        plan: "free",
        statusLabel: "Gratuit",
        savedConfigurations: [],
        favorites: [],
        favoriteComponents: [],
        savedItems: [],
        savedComparisons: [],
        priceAlerts: [],
        activityHistory: [
          {
            id: generateId("activity"),
            type: "magic_link_login",
            description: "Compte créé via lien magique",
            timestamp: now,
          },
        ],
        preferences: { ...defaultPreferences },
        settings: { ...defaultSettings },
      };

      commitUser(newUser);
      window.localStorage.setItem(recordKey, JSON.stringify({ user: newUser }));
      setAuthModalOpen(false);
      return { success: true, isNew: true };
    } catch (error) {
      console.error("Magic link login error", error);
      return { success: false, error: "Impossible d'envoyer le lien" };
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithProvider = async (
    provider: OAuthProvider,
  ): Promise<{ success: boolean; error?: string }> => {
    if (typeof window === "undefined") return { success: false, error: "Navigateur indisponible" };
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));

      const registryKey = providerRegistryKey(provider);
      const linkedRecordKey = window.localStorage.getItem(registryKey);

      if (linkedRecordKey) {
        const record = window.localStorage.getItem(linkedRecordKey);
        if (record) {
          const parsed = JSON.parse(record);
          const hydrated = deserializeUser(parsed.user);
          const now = new Date().toISOString();
          const updated: User = appendActivity(
            {
              ...hydrated,
              lastLogin: now,
            },
            {
              id: generateId("activity"),
              type: "oauth_login",
              description: `Connexion ${provider === "google" ? "Google" : "Apple"}`,
              timestamp: now,
            },
          );
          commitUser(updated);
          setAuthModalOpen(false);
          return { success: true };
        }
      }

      const now = new Date().toISOString();
      const demoEmail = `${provider}_demo_${Date.now()}@siite.app`;
      const displayName = provider === "google" ? "Alex" : "Clara";

      const newUser: User = {
        id: generateId("user"),
        username: `${displayName} ${provider === "google" ? "G." : "A."}`,
        firstName: displayName,
        email: demoEmail,
        createdAt: now,
        joinDate: now,
        lastLogin: now,
        plan: "free",
        statusLabel: "Gratuit",
        savedConfigurations: [],
        favorites: [],
        favoriteComponents: [],
        savedItems: [],
        savedComparisons: [],
        priceAlerts: [],
        activityHistory: [
          {
            id: generateId("activity"),
            type: "oauth_login",
            description: `Compte créé via ${provider === "google" ? "Google" : "Apple"}`,
            timestamp: now,
          },
        ],
        preferences: { ...defaultPreferences },
        settings: { ...defaultSettings },
      };

      const recordKey = userRecordKey(demoEmail);
      commitUser(newUser);
      window.localStorage.setItem(recordKey, JSON.stringify({ user: newUser }));
      window.localStorage.setItem(registryKey, recordKey);
      setAuthModalOpen(false);
      return { success: true };
    } catch (error) {
      console.error("OAuth login error", error);
      return { success: false, error: "Connexion impossible" };
    } finally {
      setIsLoading(false);
    }
  };

  const continueAsGuest = () => {
    const now = new Date().toISOString();
    const guestUser: User = {
      id: generateId("guest"),
      username: "Invité",
      firstName: "Invité",
      email: "guest@local",
      createdAt: now,
      joinDate: now,
      lastLogin: now,
      plan: "free",
      statusLabel: "Invité",
      isGuest: true,
      savedConfigurations: [],
      favorites: [],
      favoriteComponents: [],
      savedItems: [],
      savedComparisons: [],
      priceAlerts: [],
      activityHistory: [],
      preferences: { ...defaultPreferences },
      settings: { ...defaultSettings },
    };

    setUser(guestUser);
    persistSession(guestUser);
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    persistSession(null);
  };

  const completeOnboarding = (settings: Partial<UserSettings>) => {
    if (!user) return;
    const now = new Date().toISOString();
    const updated: User = appendActivity(
      {
        ...user,
        settings: {
          ...user.settings,
          ...settings,
          onboardingCompleted: true,
        },
      },
      {
        id: generateId("activity"),
        type: "onboarding_completed",
        description: "Onboarding complété",
        timestamp: now,
        metadata: settings,
      },
    );
    commitUser(updated);
  };

  const saveConfiguration = async (name: string, config: any, totalPrice: number): Promise<boolean> => {
    if (!user) return false;
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const now = new Date().toISOString();
      const newConfig: Configuration = {
        id: generateId("config"),
        name,
        config,
        totalPrice,
        createdAt: now,
        updatedAt: now,
      };

      const updated: User = appendActivity(
        {
          ...user,
          savedConfigurations: [newConfig, ...user.savedConfigurations],
        },
        {
          id: generateId("activity"),
          type: "config_saved",
          description: `Configuration "${name}" sauvegardée`,
          timestamp: now,
          metadata: { totalPrice },
        },
      );

      commitUser(updated);
      return true;
    } catch (error) {
      console.error("Save configuration error", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const loadConfiguration = (configId: string): Configuration | null => {
    if (!user) return null;
    return user.savedConfigurations.find((config) => config.id === configId) ?? null;
  };

  const deleteConfiguration = (configId: string): boolean => {
    if (!user) return false;

    try {
      const updated: User = {
        ...user,
        savedConfigurations: user.savedConfigurations.filter((config) => config.id !== configId),
      };
      commitUser(updated);
      return true;
    } catch (error) {
      console.error("Delete configuration error", error);
      return false;
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    setIsLoading(true);

    try {
      const now = new Date().toISOString();
      const updatedUser: User = appendActivity(
        {
          ...user,
          ...updates,
          username: updates.username ?? user.username,
          firstName: (updates.firstName ?? updates.username)?.split(" ")[0] ?? user.firstName,
        },
        {
          id: generateId("activity"),
          type: "profile_updated",
          description: "Profil mis à jour",
          timestamp: now,
        },
      );
      commitUser(updatedUser);
      return true;
    } catch (error) {
      console.error("Update profile error", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = async (preferences: Partial<UserPreferences>): Promise<boolean> => {
    if (!user) return false;
    setIsLoading(true);

    try {
      const now = new Date().toISOString();
      const updatedUser: User = appendActivity(
        {
          ...user,
          preferences: {
            ...user.preferences,
            ...preferences,
          },
        },
        {
          id: generateId("activity"),
          type: "preferences_updated",
          description: "Préférences mises à jour",
          timestamp: now,
        },
      );
      commitUser(updatedUser);
      return true;
    } catch (error) {
      console.error("Update preferences error", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const addToFavorites = (itemId: string) => {
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    if (user.favorites.includes(itemId)) return;
    const now = new Date().toISOString();

    const updated: User = appendActivity(
      {
        ...user,
        favorites: [...user.favorites, itemId],
        favoriteComponents: [...user.favoriteComponents, itemId],
        savedItems: [...user.savedItems, itemId],
      },
      {
        id: generateId("activity"),
        type: "favorite_added",
        description: `Composant ${itemId} ajouté aux favoris`,
        timestamp: now,
        metadata: { componentId: itemId },
      },
    );

    commitUser(updated);
  };

  const removeFromFavorites = (itemId: string) => {
    if (!user) return;

    const now = new Date().toISOString();

    const updated: User = appendActivity(
      {
        ...user,
        favorites: user.favorites.filter((id) => id !== itemId),
        favoriteComponents: user.favoriteComponents.filter((id) => id !== itemId),
        savedItems: user.savedItems.filter((id) => id !== itemId),
      },
      {
        id: generateId("activity"),
        type: "favorite_removed",
        description: `Composant ${itemId} retiré des favoris`,
        timestamp: now,
        metadata: { componentId: itemId },
      },
    );

    commitUser(updated);
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
        avgConfigPrice: 0,
        mostUsedComponents: [] as string[],
      };
    }

    const totalConfigs = user.savedConfigurations.length;
    const totalFavorites = user.favorites.length;
    const totalSpent = user.savedConfigurations.reduce((sum, config) => sum + (config.totalPrice || 0), 0);
    const avgConfigPrice = totalConfigs > 0 ? Math.round(totalSpent / totalConfigs) : 0;

    const componentFrequency = user.favorites.reduce<Record<string, number>>((acc, id) => {
      const key = id.split("-")[0] ?? id;
      acc[key] = (acc[key] ?? 0) + 1;
      return acc;
    }, {});

    const mostUsedComponents = Object.entries(componentFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 4)
      .map(([key]) => key);

    return {
      totalConfigs,
      totalFavorites,
      avgConfigPrice,
      mostUsedComponents,
    };
  };

  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    isLoading,
    authModalOpen,
    openAuthModal,
    closeAuthModal,
    login,
    register,
    loginWithProvider,
    loginWithMagicLink,
    continueAsGuest,
    logout,
    completeOnboarding,
    saveConfiguration,
    loadConfiguration,
    deleteConfiguration,
    updateProfile,
    updatePreferences,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getStats,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
