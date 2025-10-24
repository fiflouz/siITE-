import React, { useState, useMemo } from 'react';
import { Pin, PinOff, Share2, Eye, EyeOff } from 'lucide-react';
import { getSpecsForCategory, groupSpecs, type SpecDefinition } from '../../utils/specMap';

interface CompareTableProps {
  items: any[]; // Produits à comparer
  category: string; // cpu, gpu, ssd, ram
}

export const CompareTable: React.FC<CompareTableProps> = ({ items, category }) => {
  const [showDiffOnly, setShowDiffOnly] = useState(false);
  const [pinnedIndex, setPinnedIndex] = useState<number | null>(null);

  const specs = useMemo(() => getSpecsForCategory(category), [category]);
  const groupedSpecs = useMemo(() => groupSpecs(specs), [specs]);

  // Calculer les valeurs min/max pour la heatmap
  const getMinMax = (spec: SpecDefinition) => {
    const values = items
      .map(item => {
        const val = spec.derive ? spec.derive(item) : item[spec.key];
        return typeof val === 'number' ? val : null;
      })
      .filter((v): v is number => v !== null);

    if (values.length === 0) return null;
    return { min: Math.min(...values), max: Math.max(...values) };
  };

  // Calculer la couleur de la heatmap
  const getHeatmapColor = (value: any, spec: SpecDefinition): string => {
    if (spec.better === 'neutral') return 'transparent';
    if (typeof value !== 'number') return 'transparent';

    const minMax = getMinMax(spec);
    if (!minMax) return 'transparent';

    const { min, max } = minMax;
    if (min === max) return 'transparent';

    // Normaliser entre 0 et 1
    const normalized = (value - min) / (max - min);

    if (spec.better === 'higher') {
      // Vert pour les valeurs élevées
      if (normalized > 0.8) return 'rgba(34, 197, 94, 0.15)'; // green-500/15
      if (normalized > 0.6) return 'rgba(34, 197, 94, 0.08)'; // green-500/8
      if (normalized < 0.2) return 'rgba(239, 68, 68, 0.15)'; // red-500/15
      if (normalized < 0.4) return 'rgba(239, 68, 68, 0.08)'; // red-500/8
    } else if (spec.better === 'lower') {
      // Vert pour les valeurs basses
      if (normalized < 0.2) return 'rgba(34, 197, 94, 0.15)';
      if (normalized < 0.4) return 'rgba(34, 197, 94, 0.08)';
      if (normalized > 0.8) return 'rgba(239, 68, 68, 0.15)';
      if (normalized > 0.6) return 'rgba(239, 68, 68, 0.08)';
    }

    return 'transparent';
  };

  // Formater une valeur
  const formatValue = (value: any, spec: SpecDefinition): string => {
    if (value === null || value === undefined || value === '') return '—';
    if (typeof value === 'boolean') return value ? 'Oui' : 'Non';
    if (typeof value === 'number' && spec.unit) {
      return `${value.toLocaleString('fr-FR')} ${spec.unit}`;
    }
    return String(value);
  };

  // Vérifier si une ligne a des différences
  const hasDifferences = (spec: SpecDefinition): boolean => {
    const values = items.map(item => {
      const val = spec.derive ? spec.derive(item) : item[spec.key];
      return String(val);
    });
    return new Set(values).size > 1;
  };

  // Générer le lien de partage
  const handleShare = () => {
    const ids = items.map(i => i.id).join(',');
    const url = `${window.location.origin}/comparateur?compare=${ids}`;
    navigator.clipboard.writeText(url);
    // TODO: Afficher un toast de confirmation
  };

  return (
    <div className="w-full">
      {/* Header avec actions */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h2 className="text-2xl font-bold text-[#F5F5F7]">
          Comparaison de {items.length} {category.toUpperCase()}
        </h2>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowDiffOnly(!showDiffOnly)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
              showDiffOnly
                ? 'bg-[#4A90E2]/10 border-[#4A90E2] text-[#4A90E2]'
                : 'bg-[#1a1a1a] border-white/10 text-[#A1A1AA] hover:border-white/20'
            }`}
          >
            {showDiffOnly ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span className="text-sm">Différences uniquement</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a1a1a] border border-white/10 text-[#A1A1AA] hover:border-white/20 hover:text-[#F5F5F7] transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span className="text-sm hidden sm:inline">Partager</span>
          </button>
        </div>
      </div>

      {/* Table scrollable */}
      <div className="relative overflow-x-auto rounded-2xl border border-white/10">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-20 bg-[#1a1a1a] border-b border-white/10">
            <tr>
              <th className="sticky left-0 z-30 bg-[#1a1a1a] p-4 text-left font-semibold text-[#F5F5F7] border-r border-white/10 min-w-[200px]">
                Caractéristique
              </th>
              {items.map((item, index) => (
                <th
                  key={item.id}
                  className={`p-4 text-left min-w-[200px] relative ${
                    pinnedIndex === index ? 'bg-[#4A90E2]/5' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      {item.brand && (
                        <div className="text-xs text-[#A1A1AA] mb-1">{item.brand}</div>
                      )}
                      <div className="text-sm font-semibold text-[#F5F5F7]">{item.model || item.id}</div>
                    </div>
                    <button
                      onClick={() => setPinnedIndex(pinnedIndex === index ? null : index)}
                      className="p-1 rounded hover:bg-white/10 transition-colors"
                      aria-label={pinnedIndex === index ? 'Détacher' : 'Épingler comme référence'}
                      title={pinnedIndex === index ? 'Détacher' : 'Épingler comme référence'}
                    >
                      {pinnedIndex === index ? (
                        <PinOff className="w-4 h-4 text-[#4A90E2]" />
                      ) : (
                        <Pin className="w-4 h-4 text-[#A1A1AA]" />
                      )}
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {Object.entries(groupedSpecs).map(([groupName, groupSpecsList]) => (
              <React.Fragment key={groupName}>
                {/* Groupe header */}
                <tr className="bg-[#252525]">
                  <td
                    colSpan={items.length + 1}
                    className="sticky left-0 px-4 py-2 text-xs font-semibold text-[#4A90E2] uppercase tracking-wider"
                  >
                    {groupName}
                  </td>
                </tr>

                {/* Specs du groupe */}
                {groupSpecsList.map((spec) => {
                  const hasVariation = hasDifferences(spec);
                  if (showDiffOnly && !hasVariation) return null;

                  return (
                    <tr key={spec.key} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="sticky left-0 z-10 bg-[#1a1a1a] p-4 text-sm text-[#A1A1AA] border-r border-white/10 min-w-[200px]">
                        <div className="flex items-center gap-2">
                          <span>{spec.label}</span>
                          {spec.unit && (
                            <span className="text-xs text-[#71717A]">({spec.unit})</span>
                          )}
                        </div>
                      </td>
                      {items.map((item, index) => {
                        const value = spec.derive ? spec.derive(item) : item[spec.key];
                        const bgColor = getHeatmapColor(value, spec);

                        return (
                          <td
                            key={`${item.id}-${spec.key}`}
                            className={`p-4 text-sm ${
                              pinnedIndex === index ? 'bg-[#4A90E2]/5' : ''
                            }`}
                            style={{ backgroundColor: bgColor || undefined }}
                          >
                            <span className="text-[#F5F5F7] font-medium">
                              {formatValue(value, spec)}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Légende heatmap */}
      <div className="mt-4 flex items-center gap-6 text-xs text-[#A1A1AA]">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500/15 border border-green-500/30"></div>
          <span>Meilleur</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-red-500/15 border border-red-500/30"></div>
          <span>Moins bon</span>
        </div>
        {pinnedIndex !== null && (
          <div className="flex items-center gap-2">
            <Pin className="w-4 h-4 text-[#4A90E2]" />
            <span>Colonne épinglée (référence)</span>
          </div>
        )}
      </div>
    </div>
  );
};
