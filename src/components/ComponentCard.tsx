import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { usePrice } from '../hooks/usePrice';
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
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a]/80 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#4F8BF7]/50 hover:shadow-xl hover:shadow-[#4F8BF7]/10">
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
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#4F8BF7]" />
          <span>Prix en temps réel</span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 flex h-full flex-col justify-between rounded-2xl border border-[#4F8BF7]/30 bg-gradient-to-br from-[#08090F]/85 via-[#0E1B2F]/80 to-[#132542]/75 px-6 py-6 opacity-0 backdrop-blur-xl transition-opacity duration-300 group-hover:opacity-100">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#4F8BF7]/40 bg-[#4F8BF7]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#74A3FF]">
            Détails
          </span>
          <h4 className="mt-3 text-lg font-semibold text-white">{item.name}</h4>
          {item.description && (
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[#B5C7FF]/85">
              {item.description}
            </p>
          )}
        </div>
        <div className="space-y-3 text-xs text-[#E2E8FF]/75">
          {item.utility && (
            <div className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#74A3FF]" />
              <span>{item.utility}</span>
            </div>
          )}
          {item.domain && (
            <div className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#74A3FF]" />
              <span>{item.domain}</span>
            </div>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {item.specs.slice(0, 6).map((spec) => (
              <span
                key={spec}
                className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] uppercase tracking-wide text-[#EFF6FF]/90"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
