import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface CompareItem {
  id: string;
  brand?: string;
  model: string;
  category: string;
  imageUrl?: string;
}

interface CompareBarProps {
  items: CompareItem[];
  onRemove: (id: string) => void;
  onClear?: () => void;
}

export const CompareBar: React.FC<CompareBarProps> = ({ items, onRemove, onClear }) => {
  const navigate = useNavigate();

  if (items.length < 2) return null;

  const handleCompare = () => {
    const ids = items.map(i => i.id).join(',');
    navigate(`/comparateur?compare=${ids}`);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            {/* Items à comparer */}
            <div className="flex-1 flex items-center gap-3 overflow-x-auto scrollbar-hide">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="flex items-center gap-2 bg-[#252525] rounded-xl px-3 py-2 border border-white/5 min-w-fit"
                >
                  {item.imageUrl && (
                    <img 
                      src={item.imageUrl} 
                      alt={item.model}
                      className="w-10 h-10 object-contain rounded-lg"
                    />
                  )}
                  <div className="flex flex-col min-w-0">
                    {item.brand && (
                      <span className="text-xs text-[#A1A1AA]">{item.brand}</span>
                    )}
                    <span className="text-sm text-[#F5F5F7] font-medium truncate max-w-[120px]">
                      {item.model}
                    </span>
                  </div>
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                    aria-label={`Retirer ${item.model}`}
                  >
                    <X className="w-4 h-4 text-[#A1A1AA]" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm text-[#A1A1AA]">
                  {items.length} produit{items.length > 1 ? 's' : ''} sélectionné{items.length > 1 ? 's' : ''}
                </p>
                <p className="text-xs text-[#71717A]">Maximum 4</p>
              </div>

              {onClear && (
                <button
                  onClick={onClear}
                  className="px-4 py-2 text-sm text-[#A1A1AA] hover:text-[#F5F5F7] transition-colors"
                >
                  Tout effacer
                </button>
              )}

              <button
                onClick={handleCompare}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#4A90E2]/20 transition-all"
              >
                <span>Comparer ({items.length})</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
