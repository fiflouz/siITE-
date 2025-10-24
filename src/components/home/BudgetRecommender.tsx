import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, HardDrive, MemoryStick, ArrowRight, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Import du catalogue (ajuster le chemin si nécessaire)
import catalogue from '../../data/catalogue_2021_2025_master.json';

interface RecommendedConfig {
  cpu: any;
  gpu: any;
  ram: any;
  ssd: any;
  totalPrice: number;
  lastUpdate: Date;
}

export const BudgetRecommender: React.FC = () => {
  const navigate = useNavigate();
  const [budget, setBudget] = useState(1500);
  const [config, setConfig] = useState<RecommendedConfig | null>(null);

  // Calculer la config recommandée basée sur le budget
  const calculateConfig = useMemo(() => {
    // Répartition du budget (approximative)
    const cpuBudget = budget * 0.25;
    const gpuBudget = budget * 0.45;
    const ramBudget = budget * 0.10;
    const ssdBudget = budget * 0.15;
    // 5% de marge

    // Sélectionner les composants les plus proches du budget
    const findClosest = (items: any[], targetPrice: number, priceKey: string) => {
      return items
        .filter(item => {
          const price = item[priceKey] || item.launch_price_usd;
          return price && price > 0 && price <= targetPrice * 1.2; // +20% de marge
        })
        .sort((a, b) => {
          const priceA = a[priceKey] || a.launch_price_usd || 0;
          const priceB = b[priceKey] || b.launch_price_usd || 0;
          const diffA = Math.abs(priceA - targetPrice);
          const diffB = Math.abs(priceB - targetPrice);
          return diffA - diffB;
        })[0];
    };

    const cpu = findClosest(catalogue.categories.cpus, cpuBudget, 'current_price_2025_usd');
    const gpu = findClosest(catalogue.categories.gpus, gpuBudget, 'current_price_2025_usd');
    const ram = findClosest(catalogue.categories.memory_kits || [], ramBudget, 'current_price_2025_usd');
    const ssd = findClosest(catalogue.categories.ssds, ssdBudget, 'current_price_2025_usd');

    if (!cpu || !gpu || !ssd) return null;

    const totalPrice = 
      (cpu.current_price_2025_usd || cpu.launch_price_usd || 0) +
      (gpu.current_price_2025_usd || gpu.launch_price_usd || 0) +
      (ram?.current_price_2025_usd || ram?.launch_price_usd || 0) +
      (ssd.current_price_2025_usd || ssd.launch_price_usd || 0);

    return {
      cpu,
      gpu,
      ram,
      ssd,
      totalPrice,
      lastUpdate: new Date(),
    };
  }, [budget]);

  useEffect(() => {
    setConfig(calculateConfig);
  }, [calculateConfig]);

  const handleViewConfig = () => {
    if (config) {
      // Naviguer vers le configurateur avec les composants pré-sélectionnés
      navigate(`/configurateur?budget=${budget}&cpu=${config.cpu.id}&gpu=${config.gpu.id}&ssd=${config.ssd.id}${config.ram ? `&ram=${config.ram.id}` : ''}`);
    }
  };

  const getTimeSinceUpdate = () => {
    if (!config) return '';
    const minutes = Math.floor((Date.now() - config.lastUpdate.getTime()) / 60000);
    if (minutes < 1) return 'À l\'instant';
    if (minutes < 60) return `il y a ${minutes} min`;
    return `il y a ${Math.floor(minutes / 60)}h`;
  };

  return (
    <div className="w-full max-w-lg">
      {/* Slider Budget */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-semibold text-[#F5F5F7]">
            Budget total
          </label>
          <span className="text-2xl font-bold text-[#4A90E2]">
            {budget.toLocaleString('fr-FR')} €
          </span>
        </div>

        <input
          type="range"
          min={600}
          max={3000}
          step={50}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r 
            [&::-webkit-slider-thumb]:from-[#4A90E2] [&::-webkit-slider-thumb]:to-[#5BA3F5] 
            [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full 
            [&::-moz-range-thumb]:bg-gradient-to-r [&::-moz-range-thumb]:from-[#4A90E2] 
            [&::-moz-range-thumb]:to-[#5BA3F5] [&::-moz-range-thumb]:border-0 
            [&::-moz-range-thumb]:cursor-pointer"
        />

        <div className="flex justify-between mt-2 text-xs text-[#71717A]">
          <span>600 €</span>
          <span>1 500 €</span>
          <span>3 000 €</span>
        </div>
      </div>

      {/* Configuration Recommandée */}
      {config && (
        <motion.div
          key={budget}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-[#1a1a1a] to-[#252525] rounded-2xl border border-white/10 p-6 shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-[#F5F5F7]">
              Configuration recommandée
            </h3>
            <div className="flex items-center gap-2 text-xs text-[#4A90E2] bg-[#4A90E2]/10 px-3 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              <span>MAJ {getTimeSinceUpdate()}</span>
            </div>
          </div>

          {/* Components */}
          <div className="space-y-3 mb-6">
            {/* CPU */}
            <div className="flex items-center gap-3 p-3 bg-[#0E0E10] rounded-xl">
              <div className="p-2 bg-[#4A90E2]/10 rounded-lg">
                <Cpu className="w-5 h-5 text-[#4A90E2]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#A1A1AA]">Processeur</p>
                <p className="text-sm font-semibold text-[#F5F5F7] truncate">
                  {config.cpu.brand} {config.cpu.model}
                </p>
              </div>
            </div>

            {/* GPU */}
            <div className="flex items-center gap-3 p-3 bg-[#0E0E10] rounded-xl">
              <div className="p-2 bg-[#4A90E2]/10 rounded-lg">
                <Zap className="w-5 h-5 text-[#4A90E2]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#A1A1AA]">Carte graphique</p>
                <p className="text-sm font-semibold text-[#F5F5F7] truncate">
                  {config.gpu.brand} {config.gpu.model}
                </p>
              </div>
            </div>

            {/* RAM */}
            {config.ram && (
              <div className="flex items-center gap-3 p-3 bg-[#0E0E10] rounded-xl">
                <div className="p-2 bg-[#4A90E2]/10 rounded-lg">
                  <MemoryStick className="w-5 h-5 text-[#4A90E2]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#A1A1AA]">Mémoire</p>
                  <p className="text-sm font-semibold text-[#F5F5F7] truncate">
                    {config.ram.capacity_GB}GB {config.ram.type}
                  </p>
                </div>
              </div>
            )}

            {/* SSD */}
            <div className="flex items-center gap-3 p-3 bg-[#0E0E10] rounded-xl">
              <div className="p-2 bg-[#4A90E2]/10 rounded-lg">
                <HardDrive className="w-5 h-5 text-[#4A90E2]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#A1A1AA]">Stockage</p>
                <p className="text-sm font-semibold text-[#F5F5F7] truncate">
                  {config.ssd.brand} {config.ssd.model} - {config.ssd.capacity_GB}GB
                </p>
              </div>
            </div>
          </div>

          {/* Prix Total */}
          <div className="bg-[#0E0E10] rounded-xl p-4 mb-4">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-[#A1A1AA] mb-1">Prix total estimé</p>
                <p className="text-3xl font-bold text-[#F5F5F7]">
                  {Math.round(config.totalPrice).toLocaleString('fr-FR')} €
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-[#71717A]">
                  {config.totalPrice < budget ? (
                    <span className="text-green-500">
                      -{Math.round(budget - config.totalPrice)} € sous budget
                    </span>
                  ) : (
                    <span className="text-orange-500">
                      +{Math.round(config.totalPrice - budget)} € au-dessus
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleViewConfig}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 
              bg-gradient-to-r from-[#4A90E2] to-[#5BA3F5] text-white font-semibold 
              rounded-xl hover:shadow-lg hover:shadow-[#4A90E2]/30 transition-all"
          >
            <span>Voir la configuration</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
