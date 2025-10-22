import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Clock } from 'lucide-react';
import { usePrice } from '../hooks/usePrice';

interface PriceBadgeProps {
  componentId: string;
  showTrend?: boolean;
  showHistory?: boolean;
  compact?: boolean;
}

export const PriceBadge: React.FC<PriceBadgeProps> = ({ 
  componentId, 
  showTrend = true, 
  showHistory = false,
  compact = false 
}) => {
  const price = usePrice(componentId);

  if (!price.hasData || !price.currentPrice) {
    return null;
  }

  const TrendIcon = price.trend === 'up' ? TrendingUp : price.trend === 'down' ? TrendingDown : Minus;

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2">
        <span className="text-lg font-bold text-[#F5F5F7]">
          {price.formattedPrice}
        </span>
        {showTrend && price.trend !== 'stable' && (
          <div 
            className="flex items-center gap-1 text-xs font-semibold"
            style={{ color: price.trendColor }}
          >
            <TrendIcon className="w-3 h-3" />
            {Math.abs(price.trendPercent).toFixed(1)}%
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-xl p-4 border border-white/10"
    >
      {/* Prix actuel */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-[#A1A1AA] mb-1">Prix actuel</p>
          <p className="text-2xl font-bold text-[#F5F5F7]">{price.formattedPrice}</p>
        </div>
        {showTrend && (
          <div 
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{ 
              backgroundColor: `${price.trendColor}20`,
              color: price.trendColor 
            }}
          >
            <TrendIcon className="w-4 h-4" />
            <span className="text-sm font-semibold">
              {price.trend === 'up' ? '+' : price.trend === 'down' ? '-' : ''}
              {Math.abs(price.trendPercent).toFixed(1)}%
            </span>
          </div>
        )}
      </div>

      {/* Stats de prix */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div>
          <p className="text-xs text-[#A1A1AA]">Min</p>
          <p className="text-sm font-semibold text-[#10B981]">
            {price.minPrice ? `${Math.round(price.minPrice)}€` : '-'}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#A1A1AA]">Moyen</p>
          <p className="text-sm font-semibold text-[#F5F5F7]">
            {price.avgPrice ? `${Math.round(price.avgPrice)}€` : '-'}
          </p>
        </div>
        <div>
          <p className="text-xs text-[#A1A1AA]">Max</p>
          <p className="text-sm font-semibold text-[#EF4444]">
            {price.maxPrice ? `${Math.round(price.maxPrice)}€` : '-'}
          </p>
        </div>
      </div>

      {/* Historique simplifié */}
      {showHistory && price.history.length > 0 && (
        <div className="pt-3 border-t border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-3 h-3 text-[#A1A1AA]" />
            <p className="text-xs text-[#A1A1AA]">
              {price.dataPoints} relevés de prix
            </p>
          </div>
          <div className="h-12 flex items-end gap-0.5">
            {price.history.slice(-20).map((entry, idx) => {
              const height = price.maxPrice && price.minPrice
                ? ((entry.price - price.minPrice) / (price.maxPrice - price.minPrice)) * 100
                : 50;
              return (
                <div
                  key={idx}
                  className="flex-1 bg-gradient-to-t from-[#4F8BF7] to-[#6B9CFF] rounded-t opacity-60 hover:opacity-100 transition-opacity"
                  style={{ height: `${Math.max(height, 10)}%` }}
                  title={`${Math.round(entry.price)}€ - ${new Date(entry.ts).toLocaleDateString()}`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Dernière mise à jour */}
      {price.lastUpdate && (
        <p className="text-xs text-[#A1A1AA] mt-2">
          MAJ: {new Date(price.lastUpdate).toLocaleDateString('fr-FR')} à {new Date(price.lastUpdate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
        </p>
      )}
    </motion.div>
  );
};
