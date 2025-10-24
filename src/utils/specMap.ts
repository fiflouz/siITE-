// Mapping standardisé des specs pour chaque catégorie
// Ordre d'affichage, labels, unités, direction "meilleur"

export type Better = 'higher' | 'lower' | 'neutral';

export interface SpecDefinition {
  key: string;
  label: string;
  unit?: string;
  better: Better;
  group?: string; // Groupe de specs (ex: "Performance", "Mémoire")
  derive?: (item: any) => string | number | null; // Fonction pour extraire/calculer la valeur
}

// CPU Specs
export const CPU_SPECS: SpecDefinition[] = [
  { key: 'brand', label: 'Marque', better: 'neutral', group: 'Général' },
  { key: 'model', label: 'Modèle', better: 'neutral', group: 'Général' },
  { key: 'family', label: 'Famille', better: 'neutral', group: 'Général' },
  { key: 'architecture', label: 'Architecture', better: 'neutral', group: 'Général' },
  { key: 'socket', label: 'Socket', better: 'neutral', group: 'Général' },
  { key: 'platform', label: 'Plateforme', better: 'neutral', group: 'Général' },
  
  { key: 'cores_p', label: 'Cœurs P', better: 'higher', group: 'Performance' },
  { key: 'cores_e', label: 'Cœurs E', better: 'higher', group: 'Performance' },
  { key: 'threads', label: 'Threads', better: 'higher', group: 'Performance' },
  { key: 'base_clock_GHz', label: 'Fréquence base', unit: 'GHz', better: 'higher', group: 'Performance' },
  { key: 'boost_clock_GHz', label: 'Fréquence boost', unit: 'GHz', better: 'higher', group: 'Performance' },
  { key: 'performance', label: 'Score perf', better: 'higher', group: 'Performance' },
  
  { key: 'tdp_W', label: 'TDP', unit: 'W', better: 'lower', group: 'Consommation' },
  { key: 'launch_price_usd', label: 'Prix lancement', unit: '$', better: 'lower', group: 'Prix' },
  { key: 'current_price_2025_usd', label: 'Prix actuel', unit: '$', better: 'lower', group: 'Prix' },
];

// GPU Specs
export const GPU_SPECS: SpecDefinition[] = [
  { key: 'brand', label: 'Marque', better: 'neutral', group: 'Général' },
  { key: 'model', label: 'Modèle', better: 'neutral', group: 'Général' },
  { key: 'gpu_chip', label: 'Puce GPU', better: 'neutral', group: 'Général' },
  { key: 'architecture', label: 'Architecture', better: 'neutral', group: 'Général' },
  
  { key: 'vram_GB', label: 'VRAM', unit: 'GB', better: 'higher', group: 'Mémoire' },
  { key: 'memory_type', label: 'Type mémoire', better: 'neutral', group: 'Mémoire' },
  { key: 'memory_bus_width_bit', label: 'Bus mémoire', unit: 'bit', better: 'higher', group: 'Mémoire' },
  { key: 'memory_bandwidth_GBps', label: 'Bande passante', unit: 'GB/s', better: 'higher', group: 'Mémoire' },
  
  { key: 'base_clock_MHz', label: 'Fréquence base', unit: 'MHz', better: 'higher', group: 'Performance' },
  { key: 'boost_clock_MHz', label: 'Fréquence boost', unit: 'MHz', better: 'higher', group: 'Performance' },
  { key: 'cuda_cores', label: 'Cœurs CUDA', better: 'higher', group: 'Performance' },
  { key: 'stream_processors', label: 'Stream Processors', better: 'higher', group: 'Performance' },
  { key: 'tensor_cores', label: 'Tensor Cores', better: 'higher', group: 'Performance' },
  { key: 'rt_cores', label: 'RT Cores', better: 'higher', group: 'Performance' },
  { key: 'performance', label: 'Score perf', better: 'higher', group: 'Performance' },
  
  { key: 'tgp_W', label: 'TGP', unit: 'W', better: 'lower', group: 'Consommation' },
  { key: 'psu_recommended_W', label: 'PSU recommandé', unit: 'W', better: 'lower', group: 'Consommation' },
  { key: 'pcie_interface', label: 'Interface PCIe', better: 'neutral', group: 'Interface' },
  { key: 'length_mm', label: 'Longueur', unit: 'mm', better: 'lower', group: 'Dimensions' },
  
  { key: 'launch_price_usd', label: 'Prix lancement', unit: '$', better: 'lower', group: 'Prix' },
  { key: 'current_price_2025_usd', label: 'Prix actuel', unit: '$', better: 'lower', group: 'Prix' },
];

// SSD Specs
export const SSD_SPECS: SpecDefinition[] = [
  { key: 'brand', label: 'Marque', better: 'neutral', group: 'Général' },
  { key: 'model', label: 'Modèle', better: 'neutral', group: 'Général' },
  { key: 'capacity_GB', label: 'Capacité', unit: 'GB', better: 'higher', group: 'Général' },
  { key: 'form_factor', label: 'Format', better: 'neutral', group: 'Général' },
  { key: 'interface', label: 'Interface', better: 'neutral', group: 'Général' },
  { key: 'protocol', label: 'Protocole', better: 'neutral', group: 'Général' },
  
  { key: 'nand_type', label: 'Type NAND', better: 'neutral', group: 'Technologie' },
  { key: 'controller', label: 'Contrôleur', better: 'neutral', group: 'Technologie' },
  { key: 'dram_cache', label: 'Cache DRAM', better: 'neutral', group: 'Technologie' },
  
  { key: 'seq_read_MBps', label: 'Lecture séq.', unit: 'MB/s', better: 'higher', group: 'Performance' },
  { key: 'seq_write_MBps', label: 'Écriture séq.', unit: 'MB/s', better: 'higher', group: 'Performance' },
  { key: 'random_read_4k_IOPS', label: 'Lecture 4K', unit: 'IOPS', better: 'higher', group: 'Performance' },
  { key: 'random_write_4k_IOPS', label: 'Écriture 4K', unit: 'IOPS', better: 'higher', group: 'Performance' },
  { key: 'performance', label: 'Score perf', better: 'higher', group: 'Performance' },
  
  { key: 'power_consumption_W', label: 'Consommation', unit: 'W', better: 'lower', group: 'Consommation' },
  { key: 'tbw', label: 'TBW', unit: 'TB', better: 'higher', group: 'Endurance' },
  { key: 'mtbf_hours', label: 'MTBF', unit: 'h', better: 'higher', group: 'Endurance' },
  { key: 'warranty_years', label: 'Garantie', unit: 'ans', better: 'higher', group: 'Endurance' },
  
  { key: 'launch_price_usd', label: 'Prix lancement', unit: '$', better: 'lower', group: 'Prix' },
  { key: 'current_price_2025_usd', label: 'Prix actuel', unit: '$', better: 'lower', group: 'Prix' },
];

// RAM Specs
export const RAM_SPECS: SpecDefinition[] = [
  { key: 'brand', label: 'Marque', better: 'neutral', group: 'Général' },
  { key: 'model', label: 'Modèle', better: 'neutral', group: 'Général' },
  { key: 'type', label: 'Type', better: 'neutral', group: 'Général' },
  { key: 'capacity_GB', label: 'Capacité', unit: 'GB', better: 'higher', group: 'Général' },
  { key: 'kit_configuration', label: 'Configuration', better: 'neutral', group: 'Général' },
  
  { key: 'speed_MHz', label: 'Fréquence', unit: 'MHz', better: 'higher', group: 'Performance' },
  { key: 'cas_latency', label: 'CAS Latency', better: 'lower', group: 'Performance' },
  { key: 'timings', label: 'Timings', better: 'neutral', group: 'Performance' },
  { key: 'voltage_V', label: 'Voltage', unit: 'V', better: 'lower', group: 'Performance' },
  { key: 'performance', label: 'Score perf', better: 'higher', group: 'Performance' },
  
  { key: 'rgb', label: 'RGB', better: 'neutral', group: 'Esthétique' },
  { key: 'height_mm', label: 'Hauteur', unit: 'mm', better: 'lower', group: 'Dimensions' },
  
  { key: 'launch_price_usd', label: 'Prix lancement', unit: '$', better: 'lower', group: 'Prix' },
  { key: 'current_price_2025_usd', label: 'Prix actuel', unit: '$', better: 'lower', group: 'Prix' },
];

// Fonction pour obtenir les specs selon la catégorie
export const getSpecsForCategory = (category: string): SpecDefinition[] => {
  const cat = category.toLowerCase();
  if (cat === 'cpu' || cat === 'cpus') return CPU_SPECS;
  if (cat === 'gpu' || cat === 'gpus') return GPU_SPECS;
  if (cat === 'ssd' || cat === 'ssds' || cat === 'storage') return SSD_SPECS;
  if (cat === 'ram' || cat === 'memory') return RAM_SPECS;
  return [];
};

// Grouper les specs par groupe
export const groupSpecs = (specs: SpecDefinition[]): Record<string, SpecDefinition[]> => {
  const groups: Record<string, SpecDefinition[]> = {};
  specs.forEach(spec => {
    const group = spec.group || 'Autre';
    if (!groups[group]) groups[group] = [];
    groups[group].push(spec);
  });
  return groups;
};
