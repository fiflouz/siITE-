import React from 'react';
import { motion } from 'framer-motion';
import { Check, Plus } from 'lucide-react';
import { useCompare } from '../hooks/useCompare';

interface ProductCardProps {
  id: string;
  name: string;
  brand?: string;
  price: number;
  performance: number;
  specs: string[];
  category: string;
  imageUrl?: string;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  brand,
  price,
  performance,
  specs,
  category,
  imageUrl,
  onClick,
}) => {
  const { toggle, has, full } = useCompare();
  const isSelected = has(id);

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isSelected && full) {
      // TODO: Afficher un toast "Maximum 4 produits"
      return;
    }
    toggle(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className={`group relative bg-[#1a1a1a] rounded-2xl border transition-all cursor-pointer overflow-hidden ${
        isSelected 
          ? 'border-[#4A90E2] shadow-lg shadow-[#4A90E2]/20' 
          : 'border-white/10 hover:border-white/20'
      }`}
      onClick={onClick}
    >
      {/* Badge sélectionné */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 bg-[#4A90E2] rounded-full text-xs font-semibold text-white">
          <Check className="w-3 h-3" />
          <span>Ajouté</span>
        </div>
      )}

      <div className="p-6">
        {/* Image */}
        {imageUrl && (
          <div className="mb-4 flex items-center justify-center h-32 bg-[#0E0E10] rounded-xl">
            <img 
              src={imageUrl} 
              alt={name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )}

        {/* Info */}
        <div className="mb-4">
          {brand && (
            <p className="text-xs text-[#A1A1AA] mb-1">{brand}</p>
          )}
          <h3 className="text-lg font-bold text-[#F5F5F7] line-clamp-2 mb-2">
            {name}
          </h3>

          {/* Specs */}
          <div className="space-y-1 mb-3">
            {specs.slice(0, 3).map((spec, i) => (
              <p key={i} className="text-xs text-[#A1A1AA] truncate">
                {spec}
              </p>
            ))}
          </div>

          {/* Performance Bar */}
          {performance > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[#A1A1AA]">Performance</span>
                <span className="text-[#F5F5F7] font-semibold">{performance}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${performance}%` }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="h-full bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] rounded-full"
                />
              </div>
            </div>
          )}
        </div>

        {/* Prix et Actions */}
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
          <div>
            <p className="text-xs text-[#A1A1AA]">À partir de</p>
            <p className="text-xl font-bold text-[#F5F5F7]">
              {price.toLocaleString('fr-FR')} €
            </p>
          </div>

          {/* Bouton Comparer */}
          <button
            onClick={handleCompareClick}
            disabled={!isSelected && full}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
              isSelected
                ? 'bg-[#4A90E2] text-white hover:bg-[#5BA3F5]'
                : full
                ? 'bg-white/5 text-[#71717A] cursor-not-allowed'
                : 'bg-white/5 text-[#F5F5F7] hover:bg-white/10'
            }`}
            aria-label={isSelected ? 'Retirer de la comparaison' : 'Ajouter à la comparaison'}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4" />
                <span>Ajouté</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Comparer</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
