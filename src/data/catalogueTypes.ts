// Types du catalogue matériel (CPU, GPU, SSD, RAM, Chipset)
// Basé sur le schéma fourni dans types_v3.ts

export interface Source { name?: string; url?: string; note?: string; }

export interface CommonFields {
  id: string;
  brand?: string;
  model: string;
  release?: string;
  year?: number | null;
  status?: 'active'|'discontinued'|'paper';
  images?: string[];
  product_page_url?: string | null;
  warranty_years?: number | null;
  regions?: string[];
  tags?: string[];
}

export interface CPU extends CommonFields {
  family?: string;
  architecture?: string;
  lithography_nm?: number | null;
  cores_p?: number | null;
  cores_e?: number | null;
  threads?: number | null;
  base_clock_GHz?: number | null;
  boost_clock_GHz?: number | null;
  tdp_W?: number | null;
  tjmax_C?: number | null;
  socket?: string;
  platform?: string;
  memory_support?: Record<string,string>;
  pcie?: string | null;
  igpu?: string | null;
  instruction_set?: string[];
  benchmarks?: Record<string,unknown>;
  launch_price_usd?: number | null;
  current_price_2025_usd?: number | null;
  performance_equiv?: string | null;
  equivalent_ids?: string[];
  notes?: string;
  sources?: Source[];
}

export interface GPU extends CommonFields {
  series?: string;
  architecture?: string;
  lithography_nm?: number | null;
  vram_GB?: number | null;
  vram_type?: string | null;
  bus_width_bit?: number | null;
  base_clock_MHz?: number | null;
  boost_clock_MHz?: number | null;
  tgp_W?: number | null;
  supported_apis?: string[];
  rt_cores?: number | null;
  tensor_cores?: number | null;
  psu_recommendation_w?: number | null;
  features?: {
    dlss?: boolean;
    fsr?: boolean;
    xess?: boolean;
    frame_generation?: boolean;
  };
  benchmarks?: Record<string,unknown>;
  launch_price_usd?: number | null;
  current_price_2025_usd?: number | null;
  performance_equiv?: string | null;
  equivalent_ids?: string[];
  notes?: string;
  sources?: Source[];
}

export interface SSD extends CommonFields {
  interface: string;
  pcie_gen: 0|3|4|5;
  form_factor: string;
  seq_read_MBps?: number | null;
  seq_write_MBps?: number | null;
  max_iops?: number | null;
  nand?: string | null;
  controller?: string | null;
  cache?: string | null;
  endurance_TBW?: number | null;
  launch_price_usd?: number | null;
  current_price_2025_usd?: number | null;
  notes?: string;
  sources?: Source[];
}

export interface MemoryKit extends CommonFields {
  type: 'DDR4'|'DDR5';
  speed_mt_s: number;
  capacity_gb: number;
  kit: string;
  timings?: string | null;
  voltage_V?: number | null;
  launch_year?: number | null;
  current_price_2025?: string | number | null;
  notes?: string;
  sources?: Source[];
}

export interface Chipset extends CommonFields {
  socket: string;
  release_year: number;
  memory_support?: string | null;
  pcie_support?: string | null;
  usb4?: boolean | null;
  total_pcie_lanes?: number | null;
  sata_ports?: number | null;
  usb_ports?: string | null;
  overclocking?: boolean | null;
  notes?: string;
  sources?: Source[];
}

export interface Catalog {
  version: string;
  generated_at: string;
  license: string;
  currency: string;
  price_disclaimer: string;
  categories: {
    cpus: CPU[];
    gpus: GPU[];
    ssds: SSD[];
    memory_kits: MemoryKit[];
    chipsets: Chipset[];
  };
  meta?: {
    schema_version: number;
    fields?: Record<string, string[]>;
  }
}
