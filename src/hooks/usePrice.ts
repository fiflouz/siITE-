import { useMemo } from 'react';
import { getPriceStats, getPriceHistory, formatPrice, getTrendColor } from '../utils/priceSync';
import type { PriceHistoryEntry } from '../utils/priceSync';

export interface UsePriceReturn {
  currentPrice: number | null;
  minPrice: number | null;
  maxPrice: number | null;
  avgPrice: number | null;
  medianPrice: number | null;
  trend: 'up' | 'down' | 'stable' | null;
  trendPercent: number;
  trendColor: string;
  formattedPrice: string | null;
  history: PriceHistoryEntry[];
  dataPoints: number;
  lastUpdate: string | null;
  hasData: boolean;
}

/**
 * Hook pour récupérer les informations de prix d'un composant
 */
export function usePrice(componentId: string): UsePriceReturn {
  const stats = useMemo(() => getPriceStats(componentId), [componentId]);
  const history = useMemo(() => getPriceHistory(componentId), [componentId]);

  return useMemo(() => {
    if (!stats) {
      return {
        currentPrice: null,
        minPrice: null,
        maxPrice: null,
        avgPrice: null,
        medianPrice: null,
        trend: null,
        trendPercent: 0,
        trendColor: '#A1A1AA',
        formattedPrice: null,
        history: [],
        dataPoints: 0,
        lastUpdate: null,
        hasData: false
      };
    }

    return {
      currentPrice: stats.current,
      minPrice: stats.min,
      maxPrice: stats.max,
      avgPrice: stats.avg,
      medianPrice: stats.median,
      trend: stats.trend,
      trendPercent: stats.trendPercent,
      trendColor: getTrendColor(stats.trend),
      formattedPrice: formatPrice(stats.current),
      history,
      dataPoints: stats.dataPoints,
      lastUpdate: stats.lastUpdate,
      hasData: true
    };
  }, [stats, history]);
}

/**
 * Hook pour récupérer les prix de plusieurs composants
 */
export function usePrices(componentIds: string[]): Record<string, UsePriceReturn> {
  return useMemo(() => {
    const result: Record<string, UsePriceReturn> = {};
    
    componentIds.forEach(id => {
      const stats = getPriceStats(id);
      const history = getPriceHistory(id);
      
      if (!stats) {
        result[id] = {
          currentPrice: null,
          minPrice: null,
          maxPrice: null,
          avgPrice: null,
          medianPrice: null,
          trend: null,
          trendPercent: 0,
          trendColor: '#A1A1AA',
          formattedPrice: null,
          history: [],
          dataPoints: 0,
          lastUpdate: null,
          hasData: false
        };
      } else {
        result[id] = {
          currentPrice: stats.current,
          minPrice: stats.min,
          maxPrice: stats.max,
          avgPrice: stats.avg,
          medianPrice: stats.median,
          trend: stats.trend,
          trendPercent: stats.trendPercent,
          trendColor: getTrendColor(stats.trend),
          formattedPrice: formatPrice(stats.current),
          history,
          dataPoints: stats.dataPoints,
          lastUpdate: stats.lastUpdate,
          hasData: true
        };
      }
    });
    
    return result;
  }, [componentIds]);
}
