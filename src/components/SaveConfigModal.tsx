import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Save, 
  Loader2,
  CheckCircle,
  AlertCircle,
  FileText,
  Tag,
  Lock,
  Globe
} from 'lucide-react';

interface SaveConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string, description?: string, isPublic?: boolean, tags?: string[]) => Promise<void>;
  isLoading?: boolean;
  totalPrice: number;
}

export const SaveConfigModal: React.FC<SaveConfigModalProps> = ({ 
  isOpen, 
  onClose, 
  onSave,
  isLoading = false,
  totalPrice
}) => {
  const [configName, setConfigName] = useState('');
  const [configDescription, setConfigDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  const popularTags = ['Gaming', 'Productivité', 'Streaming', 'Budget', 'Haut de gamme', 'Silence', 'RGB'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!configName.trim()) {
      setError('Le nom de la configuration est requis');
      return;
    }

    if (configName.length < 3) {
      setError('Le nom doit contenir au moins 3 caractères');
      return;
    }

    setSaving(true);
    setError('');

    try {
      await onSave(
        configName.trim(), 
        configDescription.trim() || undefined,
        isPublic,
        tags.length > 0 ? tags : undefined
      );
      
      setSuccess('Configuration sauvegardée !');
      
      setTimeout(() => {
        handleClose();
      }, 1500);
      
    } catch (error) {
      setError('Erreur lors de la sauvegarde');
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setConfigName('');
    setConfigDescription('');
    setIsPublic(false);
    setTags([]);
    setCurrentTag('');
    setError('');
    setSuccess('');
    setSaving(false);
    onClose();
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < 5) {
      setTags([...tags, trimmedTag]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(currentTag);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(price);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={handleClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="relative p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-[#F5F5F7] flex items-center gap-2">
                  <Save className="w-6 h-6 text-[#4A90E2]" />
                  Sauvegarder la configuration
                </h2>
                <p className="text-sm text-[#A1A1AA] mt-1">
                  Prix total: <span className="font-medium text-[#4A90E2]">{formatPrice(totalPrice)}</span>
                </p>
              </div>
              <button
                onClick={handleClose}
                disabled={saving}
                className="p-2 text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 rounded-lg transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Configuration Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#F5F5F7] flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Nom de la configuration
              </label>
              <input
                type="text"
                value={configName}
                onChange={(e) => {
                  setConfigName(e.target.value);
                  setError('');
                }}
                placeholder="Ma configuration gaming..."
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-xl text-[#F5F5F7] placeholder-[#A1A1AA] focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors"
                required
                disabled={saving}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#F5F5F7]">
                Description (optionnelle)
              </label>
              <textarea
                value={configDescription}
                onChange={(e) => setConfigDescription(e.target.value)}
                placeholder="Parfait pour le gaming 4K, streaming..."
                className="w-full px-4 py-3 bg-[#2a2a2a] border border-white/10 rounded-xl text-[#F5F5F7] placeholder-[#A1A1AA] focus:border-[#4A90E2] focus:ring-2 focus:ring-[#4A90E2]/20 transition-colors resize-none"
                rows={3}
                disabled={saving}
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#F5F5F7] flex items-center gap-2">
                <Tag className="w-4 h-4" />
                Tags (optionnels)
              </label>
              
              {/* Current Tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1 px-3 py-1 bg-[#4A90E2]/20 text-[#4A90E2] rounded-full text-sm"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-red-400 transition-colors"
                        disabled={saving}
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Tag Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleTagInputKeyPress}
                  placeholder="Ajouter un tag..."
                  className="flex-1 px-3 py-2 bg-[#2a2a2a] border border-white/10 rounded-lg text-[#F5F5F7] placeholder-[#A1A1AA] focus:border-[#4A90E2] focus:ring-1 focus:ring-[#4A90E2]/20 transition-colors text-sm"
                  disabled={saving || tags.length >= 5}
                />
                <button
                  type="button"
                  onClick={() => addTag(currentTag)}
                  disabled={!currentTag.trim() || tags.length >= 5 || saving}
                  className="px-3 py-2 bg-[#4A90E2] text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5BA3F5] transition-colors"
                >
                  +
                </button>
              </div>
              
              {/* Popular Tags */}
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => addTag(tag)}
                    disabled={tags.includes(tag) || tags.length >= 5 || saving}
                    className="px-2 py-1 text-xs bg-[#2a2a2a] text-[#A1A1AA] rounded-lg hover:bg-[#3a3a3a] hover:text-[#F5F5F7] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {tag}
                  </button>
                ))}
              </div>
              
              <p className="text-xs text-[#A1A1AA]">
                Maximum 5 tags • Appuyez sur Entrée ou cliquez + pour ajouter
              </p>
            </div>

            {/* Visibility */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#F5F5F7]">
                Visibilité
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 bg-[#2a2a2a]/50 rounded-xl cursor-pointer hover:bg-[#2a2a2a] transition-colors">
                  <input
                    type="radio"
                    name="visibility"
                    checked={!isPublic}
                    onChange={() => setIsPublic(false)}
                    className="text-[#4A90E2] focus:ring-[#4A90E2]"
                    disabled={saving}
                  />
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[#A1A1AA]" />
                    <div>
                      <div className="text-sm font-medium text-[#F5F5F7]">Privée</div>
                      <div className="text-xs text-[#A1A1AA]">Visible seulement par vous</div>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center gap-3 p-3 bg-[#2a2a2a]/50 rounded-xl cursor-pointer hover:bg-[#2a2a2a] transition-colors">
                  <input
                    type="radio"
                    name="visibility"
                    checked={isPublic}
                    onChange={() => setIsPublic(true)}
                    className="text-[#4A90E2] focus:ring-[#4A90E2]"
                    disabled={saving}
                  />
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#A1A1AA]" />
                    <div>
                      <div className="text-sm font-medium text-[#F5F5F7]">Publique</div>
                      <div className="text-xs text-[#A1A1AA]">Visible par tous les utilisateurs</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Error/Success Messages */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                >
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <p className="text-sm text-red-400">{error}</p>
                </motion.div>
              )}
              
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                >
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <p className="text-sm text-green-400">{success}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={saving}
                className="flex-1 px-4 py-3 text-[#A1A1AA] hover:text-[#F5F5F7] hover:bg-white/5 rounded-xl transition-colors disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={saving || !configName.trim()}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white font-semibold rounded-xl shadow-lg shadow-[#4A90E2]/30 hover:shadow-[#4A90E2]/50 focus:ring-2 focus:ring-[#4A90E2]/50 focus:outline-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sauvegarde...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Sauvegarder
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};