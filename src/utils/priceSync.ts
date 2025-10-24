/**
 * Utilitaire d'intégration du système price-sync
 * Permet de récupérer les prix en temps réel et l'historique
 */

import priceHistory from '../../price-sync-free-only/data/price_history.json';

export interface PriceOffer {
  vendor: string;
  price: number;
  url: string;
  currency: string;
  timestamp?: string;
}

export interface PriceHistoryEntry {
  ts: number;
  price: number;
}

/**
 * Récupère l'historique des prix pour un composant
 */
export function getPriceHistory(componentId: string): PriceHistoryEntry[] {
  const history = priceHistory as Record<string, PriceHistoryEntry[]>;
  return history[componentId] || [];
}

/**
 * Calcule les statistiques de prix
 */
export function getPriceStats(componentId: string) {
  const history = getPriceHistory(componentId);
  
  if (history.length === 0) {
    return null;
  }

  const prices = history.map(h => h.price).filter(p => p > 0);
  
  if (prices.length === 0) {
    return null;
  }

  const sortedPrices = [...prices].sort((a, b) => a - b);
  const min = sortedPrices[0];
  const max = sortedPrices[sortedPrices.length - 1];
  const avg = prices.reduce((sum, p) => sum + p, 0) / prices.length;
  
  const mid = Math.floor(sortedPrices.length / 2);
  const median = sortedPrices.length % 2 
    ? sortedPrices[mid] 
    : (sortedPrices[mid - 1] + sortedPrices[mid]) / 2;

  const current = history[history.length - 1]?.price || 0;
  const previous = history[history.length - 2]?.price || current;
  const trend = current > previous ? 'up' : current < previous ? 'down' : 'stable';
  const trendPercent = previous > 0 ? ((current - previous) / previous) * 100 : 0;

  return {
    min,
    max,
    avg,
    median,
    current,
    trend,
    trendPercent,
    dataPoints: history.length,
    lastUpdate: history[history.length - 1]?.ts 
      ? new Date(history[history.length - 1].ts).toISOString()
      : null
  };
}

/**
 * Vérifie si un prix est un outlier (anormal)
 */
export function isPriceOutlier(price: number, componentId: string): boolean {
  const history = getPriceHistory(componentId);
  
  if (history.length < 3) {
    return false;
  }

  // Prendre les 20 dernières entrées
  const recent = history.slice(-20).map(h => h.price).filter(p => p > 0);
  
  if (recent.length < 3) {
    return false;
  }

  const sortedRecent = [...recent].sort((a, b) => a - b);
  const mid = Math.floor(sortedRecent.length / 2);
  const median = sortedRecent.length % 2 
    ? sortedRecent[mid] 
    : (sortedRecent[mid - 1] + sortedRecent[mid]) / 2;

  if (!median) {
    return false;
  }

  // Outlier = ±25% de la médiane
  return price < median * 0.75 || price > median * 1.25;
}

/**
 * Formate un prix avec la devise
 */
export function formatPrice(price: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(price);
}

/**
 * Calcule la variation de prix en pourcentage
 */
export function calculatePriceChange(currentPrice: number, previousPrice: number): number {
  if (previousPrice === 0) return 0;
  return ((currentPrice - previousPrice) / previousPrice) * 100;
}

/**
 * Retourne la couleur du trend (pour l'UI)
 */
export function getTrendColor(trend: 'up' | 'down' | 'stable'): string {
  switch (trend) {
    case 'up': return '#EF4444'; // rouge
    case 'down': return '#10B981'; // vert
    default: return '#A1A1AA'; // gris
  }
}

/**
 * Récupère les meilleurs prix pour plusieurs composants
 */
export function getBestPrices(componentIds: string[]): Record<string, number> {
  const result: Record<string, number> = {};
  
  componentIds.forEach(id => {
    const stats = getPriceStats(id);
    if (stats) {
      result[id] = stats.current;
    }
  });
  
  return result;
}
