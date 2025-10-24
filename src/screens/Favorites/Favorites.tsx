import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  SortAsc, 
  SortDesc,
  Trash2,
  ShoppingCart,
  Eye,
  Star,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getComponentsWithDetails, ComponentWithDetails } from '../../data/componentsData';
import { FavoriteButton } from '../../components/FavoriteButton';
import { ComponentDetailModal } from '../../components/ComponentDetailModal';

type SortOption = 'name' | 'price' | 'dateAdded' | 'category';
type ViewMode = 'grid' | 'list';

export const Favorites: React.FC = () => {
  const { user, isLoggedIn, removeFromFavorites } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('dateAdded');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [selectedComponent, setSelectedComponent] = useState<ComponentWithDetails | null>(null);

  // Get all components to match with favorites
  const allComponents = useMemo(() => getComponentsWithDetails(), []);
  
  // Get favorite components with details
  const favoriteComponents = useMemo(() => {
    if (!user || !user.favorites.length) return [];
    
    return user.favorites
      .map(componentId => {
        const component = allComponents.find(c => c.id === componentId);
        return component ? {
          ...component,
          dateAdded: user.activityHistory
            .find(activity => 
              activity.type === 'favorite_added' && 
              activity.metadata?.componentId === componentId
            )?.timestamp || new Date().toISOString()
        } : null;
      })
      .filter(Boolean) as (ComponentWithDetails & { dateAdded: string })[];
  }, [user, allComponents]);

  // Filter and sort favorites
  const filteredFavorites = useMemo(() => {
    let filtered = [...favoriteComponents];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(component =>
        component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        component.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(component => component.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'dateAdded':
          aValue = new Date(a.dateAdded).getTime();
          bValue = new Date(b.dateAdded).getTime();
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [favoriteComponents, searchTerm, selectedCategory, sortBy, sortOrder]);

  // Get unique categories from favorites
  const availableCategories = useMemo(() => {
    const categories = [...new Set(favoriteComponents.map(c => c.category))];
    return categories.sort();
  }, [favoriteComponents]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleRemoveFromFavorites = (componentId: string) => {
    removeFromFavorites(componentId);
  };

  const toggleSortOrder = () => {
    setSortOrder(current => current === 'asc' ? 'desc' : 'asc');
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a1a2a] flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-16 h-16 text-[#A1A1AA] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#F5F5F7] mb-2">Connectez-vous</h2>
          <p className="text-[#A1A1AA]">Vous devez être connecté pour voir vos favoris</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] via-[#1a1a1a] to-[#2a1a2a] text-[#F5F5F7]">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-red-500/20 to-pink-500/20 border-b border-white/10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iI0Y5NjM5MyIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-30"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="p-3 bg-red-500/20 rounded-2xl">
                <Heart className="w-8 h-8 text-red-400" />
              </div>
              <h1 className="text-4xl font-bold">Mes Favoris</h1>
            </div>
            
            <p className="text-xl text-[#A1A1AA] mb-6">
              {favoriteComponents.length === 0 
                ? 'Aucun composant favori pour le moment' 
                : `${favoriteComponents.length} composant${favoriteComponents.length > 1 ? 's' : ''} favori${favoriteComponents.length > 1 ? 's' : ''}`
              }
            </p>

            {favoriteComponents.length > 0 && (
              <div className="flex items-center justify-center gap-6 text-sm text-[#A1A1AA]">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  <span>Valeur totale: {formatPrice(favoriteComponents.reduce((sum, c) => sum + c.price, 0))}</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>Prix moyen: {formatPrice(favoriteComponents.reduce((sum, c) => sum + c.price, 0) / favoriteComponents.length)}</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {favoriteComponents.length === 0 ? (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-red-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-16 h-16 text-red-400" />
            </div>
            
            <h3 className="text-2xl font-bold text-[#F5F5F7] mb-4">
              Aucun favori pour le moment
            </h3>
            
            <p className="text-[#A1A1AA] text-lg mb-8 max-w-md mx-auto">
              Parcourez nos composants et ajoutez vos préférés en cliquant sur l'icône cœur
            </p>
            
            <div className="flex gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#4A90E2]/30 transition-all">
                Parcourir les composants
              </button>
              <button className="px-6 py-3 bg-white/5 border border-white/10 text-[#F5F5F7] rounded-xl font-medium hover:bg-white/10 transition-all">
                Créer une config
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Filters & Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10 p-6">
                <div className="flex flex-wrap items-center gap-4">
                  {/* Search */}
                  <div className="flex-1 min-w-64">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#A1A1AA]" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Rechercher dans les favoris..."
                        className="w-full pl-10 pr-4 py-2 bg-[#2a2a2a] border border-white/10 rounded-xl text-[#F5F5F7] placeholder-[#A1A1AA] focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Category Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-[#A1A1AA]" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 bg-[#2a2a2a] border border-white/10 rounded-xl text-[#F5F5F7] focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors"
                    >
                      <option value="all">Toutes catégories</option>
                      {availableCategories.map(category => (
                        <option key={category} value={category} className="capitalize">
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort */}
                  <div className="flex items-center gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="px-3 py-2 bg-[#2a2a2a] border border-white/10 rounded-xl text-[#F5F5F7] focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors"
                    >
                      <option value="dateAdded">Date d'ajout</option>
                      <option value="name">Nom</option>
                      <option value="price">Prix</option>
                      <option value="category">Catégorie</option>
                    </select>
                    
                    <button
                      onClick={toggleSortOrder}
                      className="p-2 bg-[#2a2a2a] border border-white/10 rounded-xl text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-[#3a3a3a] transition-colors"
                      title={`Trier par ordre ${sortOrder === 'asc' ? 'décroissant' : 'croissant'}`}
                    >
                      {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* View Mode */}
                  <div className="flex items-center bg-[#2a2a2a] border border-white/10 rounded-xl p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'grid' 
                          ? 'bg-[#4A90E2] text-white' 
                          : 'text-[#A1A1AA] hover:text-[#F5F5F7]'
                      }`}
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg transition-colors ${
                        viewMode === 'list' 
                          ? 'bg-[#4A90E2] text-white' 
                          : 'text-[#A1A1AA] hover:text-[#F5F5F7]'
                      }`}
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Results count */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-sm text-[#A1A1AA]">
                    {filteredFavorites.length} résultat{filteredFavorites.length > 1 ? 's' : ''} 
                    {searchTerm && ` pour "${searchTerm}"`}
                    {selectedCategory !== 'all' && ` dans ${selectedCategory}`}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Favorites Grid/List */}
            <AnimatePresence mode="wait">
              {viewMode === 'grid' ? (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {filteredFavorites.map((component) => (
                    <motion.div
                      key={component.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300"
                    >
                      <div className="relative p-6">
                        {/* Favorite Button */}
                        <div className="absolute top-4 right-4 z-10">
                          <FavoriteButton componentId={component.id} size="sm" />
                        </div>

                        {/* Component Info */}
                        <div className="mb-4">
                          <div className="text-xs text-[#4A90E2] font-medium mb-2 uppercase tracking-wider">
                            {component.category}
                          </div>
                          <h3 className="font-bold text-[#F5F5F7] mb-2 line-clamp-2 group-hover:text-[#4A90E2] transition-colors">
                            {component.name}
                          </h3>
                          <div className="text-2xl font-bold text-[#4A90E2] mb-1">
                            {formatPrice(component.price)}
                          </div>
                          <div className="text-xs text-[#A1A1AA] flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            Ajouté le {formatDate(component.dateAdded)}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedComponent(component)}
                            className="flex-1 px-3 py-2 bg-[#4A90E2]/20 text-[#4A90E2] rounded-lg text-sm font-medium hover:bg-[#4A90E2]/30 transition-colors flex items-center justify-center gap-2"
                          >
                            <Eye className="w-4 h-4" />
                            Voir
                          </button>
                          <button
                            onClick={() => handleRemoveFromFavorites(component.id)}
                            className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-medium hover:bg-red-500/30 transition-colors"
                            title="Retirer des favoris"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  {filteredFavorites.map((component) => (
                    <motion.div
                      key={component.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10 p-6 hover:border-white/20 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 flex-1">
                          <div>
                            <div className="text-xs text-[#4A90E2] font-medium mb-1 uppercase tracking-wider">
                              {component.category}
                            </div>
                            <h3 className="font-bold text-[#F5F5F7] text-lg mb-1">
                              {component.name}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-[#A1A1AA]">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDate(component.dateAdded)}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#4A90E2]">
                              {formatPrice(component.price)}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedComponent(component)}
                              className="p-2 bg-[#4A90E2]/20 text-[#4A90E2] rounded-lg hover:bg-[#4A90E2]/30 transition-colors"
                              title="Voir les détails"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <FavoriteButton componentId={component.id} size="sm" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>

      {/* Component Detail Modal */}
      {selectedComponent && (
        <ComponentDetailModal
          component={selectedComponent}
          onClose={() => setSelectedComponent(null)}
          onAddToConfig={() => {
            // TODO: Add to current config
            setSelectedComponent(null);
          }}
        />
      )}
    </div>
  );
};