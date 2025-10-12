import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layout } from "../../components/Layout";
import { Plus, X, Check } from "lucide-react";

interface Config {
  id: string;
  name: string;
  price: number;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    psu: string;
  };
  performance: number;
}

export const Comparator: React.FC = () => {
  const [selectedConfigs, setSelectedConfigs] = useState<Config[]>([]);

  const availableConfigs: Config[] = [
    {
      id: "1",
      name: "Gaming Starter",
      price: 799,
      specs: {
        cpu: "Intel i5-13400F",
        gpu: "RTX 4060",
        ram: "16GB DDR4",
        storage: "500GB NVMe",
        psu: "550W Bronze"
      },
      performance: 65
    },
    {
      id: "2",
      name: "Gaming Pro",
      price: 1499,
      specs: {
        cpu: "AMD Ryzen 7 7700X",
        gpu: "RTX 4070 Super",
        ram: "32GB DDR5",
        storage: "1TB NVMe Gen4",
        psu: "750W Gold"
      },
      performance: 85
    },
    {
      id: "3",
      name: "Gaming Elite",
      price: 2999,
      specs: {
        cpu: "AMD Ryzen 9 7950X3D",
        gpu: "RTX 4090",
        ram: "64GB DDR5 6400MHz",
        storage: "2TB NVMe Gen4",
        psu: "1000W Platinum"
      },
      performance: 100
    }
  ];

  const addConfig = (config: Config) => {
    if (selectedConfigs.length < 3 && !selectedConfigs.find(c => c.id === config.id)) {
      setSelectedConfigs([...selectedConfigs, config]);
    }
  };

  const removeConfig = (id: string) => {
    setSelectedConfigs(selectedConfigs.filter(c => c.id !== id));
  };

  const specLabels = [
    { key: "cpu" as keyof Config["specs"], label: "Processeur" },
    { key: "gpu" as keyof Config["specs"], label: "Carte Graphique" },
    { key: "ram" as keyof Config["specs"], label: "Mémoire RAM" },
    { key: "storage" as keyof Config["specs"], label: "Stockage" },
    { key: "psu" as keyof Config["specs"], label: "Alimentation" }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-8 pt-32 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl font-bold text-[#F5F5F7] mb-4">
            Comparateur de Configurations
          </h1>
          <p className="text-lg text-[#A1A1AA]">
            Comparez jusqu'à 3 configurations côte à côte
          </p>
        </motion.div>

        {/* Config Selection */}
        {selectedConfigs.length < 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-[#F5F5F7] mb-4">Sélectionner une configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableConfigs.filter(c => !selectedConfigs.find(sc => sc.id === c.id)).map((config) => (
                <motion.div
                  key={config.id}
                  whileHover={{ y: -4 }}
                  onClick={() => addConfig(config)}
                  className="p-6 bg-[#1a1a1a] border border-white/10 rounded-xl cursor-pointer hover:border-[#4F8BF7]/50 transition-all"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-[#F5F5F7]">{config.name}</h3>
                    <Plus className="w-5 h-5 text-[#4F8BF7]" />
                  </div>
                  <p className="text-2xl font-bold text-[#4F8BF7] mb-2">{config.price}€</p>
                  <p className="text-sm text-[#A1A1AA]">Performance: {config.performance}%</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Comparison Table */}
        {selectedConfigs.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#1a1a1a]/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="p-6 text-left text-[#A1A1AA] font-semibold">Caractéristiques</th>
                    {selectedConfigs.map((config) => (
                      <th key={config.id} className="p-6 text-center relative">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removeConfig(config.id)}
                          className="absolute top-4 right-4 p-1 rounded-full bg-[#0E0E10] hover:bg-red-500/20 transition-all"
                        >
                          <X className="w-4 h-4 text-[#A1A1AA] hover:text-red-500" />
                        </motion.button>
                        <div className="text-xl font-bold text-[#F5F5F7] mb-2">{config.name}</div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF] bg-clip-text text-transparent">
                          {config.price}€
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Performance */}
                  <tr className="border-b border-white/5">
                    <td className="p-6 text-[#A1A1AA] font-medium">Performance</td>
                    {selectedConfigs.map((config) => (
                      <td key={config.id} className="p-6 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-lg font-bold text-[#F5F5F7]">{config.performance}%</span>
                          <div className="w-full h-2 bg-[#0E0E10] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#4F8BF7] to-[#6B9CFF]"
                              style={{ width: `${config.performance}%` }}
                            />
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>

                  {/* Specs */}
                  {specLabels.map((spec) => (
                    <tr key={spec.key} className="border-b border-white/5">
                      <td className="p-6 text-[#A1A1AA] font-medium">{spec.label}</td>
                      {selectedConfigs.map((config) => (
                        <td key={config.id} className="p-6 text-center text-[#F5F5F7]">
                          {config.specs[spec.key]}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Best Value Indicator */}
                  <tr>
                    <td className="p-6 text-[#A1A1AA] font-medium">Meilleur rapport</td>
                    {selectedConfigs.map((config, index) => {
                      const bestValue = selectedConfigs.reduce((best, current) => 
                        (current.performance / current.price) > (best.performance / best.price) ? current : best
                      );
                      const isBest = config.id === bestValue.id;
                      
                      return (
                        <td key={config.id} className="p-6 text-center">
                          {isBest && (
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-400 text-sm font-semibold">
                              <Check className="w-4 h-4" />
                              Meilleur choix
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {selectedConfigs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#A1A1AA] text-lg">
              Sélectionnez des configurations pour commencer la comparaison
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};
