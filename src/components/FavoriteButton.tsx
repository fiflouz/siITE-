import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface FavoriteButtonProps {
  componentId: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ 
  componentId, 
  size = 'md', 
  showLabel = false,
  className = ''
}) => {
  const { isLoggedIn, isFavorite, addToFavorites, removeFromFavorites, openAuthModal } = useAuth();
  
  const isFav = isFavorite(componentId);
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isLoggedIn) {
      openAuthModal();
      return;
    }
    
    if (isFav) {
      removeFromFavorites(componentId);
    } else {
      addToFavorites(componentId);
    }
  };

  const sizeClasses = {
    sm: 'w-6 h-6 p-1',
    md: 'w-8 h-8 p-1.5',
    lg: 'w-10 h-10 p-2'
  } as const;

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  } as const;

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggleFavorite}
      className={`
        ${sizeClasses[size]} 
        rounded-full 
        flex items-center justify-center 
        transition-all duration-200
        ${isFav 
          ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
          : 'bg-white/5 text-[#A1A1AA] hover:bg-white/10 hover:text-red-400'
        }
        ${className}
      `}
      aria-pressed={isFav}
      title={isLoggedIn ? (isFav ? 'Retirer des favoris' : 'Ajouter aux favoris') : 'Connecte-toi pour sauvegarder'}
    >
      <motion.div
        animate={isFav ? { scale: [1, 1.2, 1] } : { scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart 
          className={`${iconSizes[size]} ${isFav ? 'fill-current' : ''}`} 
        />
      </motion.div>
      
      {showLabel && (
        <span className="ml-2 text-sm font-medium">
          {isFav ? 'Favori' : 'Ajouter'}
        </span>
      )}
    </motion.button>
  );
};
