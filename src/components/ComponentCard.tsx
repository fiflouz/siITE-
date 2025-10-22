import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { usePrice } from '../../hooks/usePrice';
import type { MappedComponent } from '../../data/componentsData';

interface ComponentCardProps {
  item: MappedComponent;
  onPick?: (item: MappedComponent) => void;
}

export const ComponentCard: React.FC<ComponentCardProps> = ({ item, onPick }) => {
  const priceInfo = usePrice(item.id);

  // Utiliser le prix du catalogue ou le prix en temps réel
  const displayPrice = priceInfo.hasData && priceInfo.currentPrice 
    ? priceInfo.currentPrice 
    : item.price;

  const TrendIcon = priceInfo.trend === 'up' 
    ? TrendingUp 
    : priceInfo.trend === 'down' 
    ? TrendingDown 
    : Minus;

  return (
    <div className="group relative bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-[#4F8BF7]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#4F8BF7]/10 hover:-translate-y-1">
      {/* Brand Badge */}
      <div className="absolute top-4 right-4">
        <span className="px-3 py-1 bg-[#4F8BF7]/20 text-[#4F8BF7] rounded-full text-xs font-semibold">
          {item.brand}
        </span>
      </div>

      {/* Component Name */}
      <h3 className="text-lg font-bold text-[#F5F5F7] mb-3 pr-20">
        {item.name}
      </h3>

      {/* Specs */}
      <div className="space-y-2 mb-4">
        {item.specs.slice(0, 3).map((spec, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-[#A1A1AA]">
            <div className="w-1.5 h-1.5 bg-[#4F8BF7] rounded-full"></div>
            <span>{spec}</span>
          </div>
        ))}
      </div>

      {/* Performance Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-[#A1A1AA] mb-1">
          <span>Performance</span>
          <span className="font-semibold text-[#4F8BF7]">{item.performance}/100</span>
        </div>
        <div className="w-full h-2 bg-[#0E0E10] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] rounded-full transition-all duration-500"
            style={{ width: `${item.performance}%` }}
          ></div>
        </div>
      </div>

      {/* Price Section */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div>
          <p className="text-xs text-[#A1A1AA] mb-1">Prix</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-[#F5F5F7]">
              {Math.round(displayPrice)}€
            </p>
            {priceInfo.hasData && priceInfo.trend && priceInfo.trend !== 'stable' && (
              <div 
                className="flex items-center gap-1 text-xs font-semibold"
                style={{ color: priceInfo.trendColor }}
              >
                <TrendIcon className="w-3 h-3" />
                {Math.abs(priceInfo.trendPercent).toFixed(1)}%
              </div>
            )}
          </div>
          {priceInfo.hasData && priceInfo.minPrice && priceInfo.minPrice !== displayPrice && (
            <p className="text-xs text-[#10B981] mt-1">
              ↓ Min: {Math.round(priceInfo.minPrice)}€
            </p>
          )}
        </div>
        {onPick && (
          <button
            onClick={() => onPick(item)}
            className="px-4 py-2 bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-[#4F8BF7]/30 transition-all"
          >
            Choisir
          </button>
        )}
      </div>

      {/* Real-time data indicator */}
      {priceInfo.hasData && (
        <div className="mt-2 flex items-center gap-1 text-xs text-[#4F8BF7]">
          <div className="w-1.5 h-1.5 bg-[#4F8BF7] rounded-full animate-pulse"></div>
          <span>Prix en temps réel</span>
        </div>
      )}
    </div>
  );
};
