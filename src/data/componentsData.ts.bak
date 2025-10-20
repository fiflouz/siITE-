export type Category = "cpu" | "gpu" | "motherboard" | "ram" | "storage" | "psu";

/** Base commune à tous les composants */
export interface Component {
  id: string;
  name: string;
  price: number;
  brand: string;
  specs: string[];
  performance: number;
  wattage?: number;
  socket?: string;
  generation?: string;
  ramType?: string;
  chipset?: string;
  type?: string;
  capacity?: number;
  power?: number;
}

/** Component interface with details for display */
export interface ComponentWithDetails extends Component {
  description?: string;
  utility?: string;
  domain?: string;
  category: Category; 
  rating?: number; 
  stock?: boolean; 
}

/** Dataset IMMUABLE (aucun `as const`, aucun `freeze`) */
type ComponentsData = Record<Category, Component[]>;

export const componentsData: ComponentsData = {
  cpu: [
    // Intel 12th Gen
    { id: "cpu1", name: "Intel Core i3-12100F", price: 110, brand: "Intel", specs: ["4C/8T", "LGA1700", "12th Gen", "DDR4/DDR5"], performance: 65, wattage: 89, socket: "LGA1700", generation: "12th", ramType: "DDR4/DDR5" },
    { id: "cpu2", name: "Intel Core i5-12400F", price: 150, brand: "Intel", specs: ["6C/12T", "LGA1700", "12th Gen", "DDR4/DDR5"], performance: 75, wattage: 117, socket: "LGA1700", generation: "12th", ramType: "DDR4/DDR5" },
    { id: "cpu3", name: "Intel Core i5-12600K", price: 220, brand: "Intel", specs: ["10C(6P+4E)/16T", "LGA1700", "Unlocked", "DDR4/DDR5"], performance: 82, wattage: 150, socket: "LGA1700", generation: "12th", ramType: "DDR4/DDR5" },
    { id: "cpu4", name: "Intel Core i7-12700K", price: 320, brand: "Intel", specs: ["12C(8P+4E)/20T", "LGA1700", "Unlocked", "DDR4/DDR5"], performance: 88, wattage: 190, socket: "LGA1700", generation: "12th", ramType: "DDR4/DDR5" },
    { id: "cpu5", name: "Intel Core i9-12900K", price: 450, brand: "Intel", specs: ["16C(8P+8E)/24T", "LGA1700", "Unlocked", "DDR4/DDR5"], performance: 92, wattage: 241, socket: "LGA1700", generation: "12th", ramType: "DDR4/DDR5" },

    // Intel 13th Gen
    { id: "cpu6", name: "Intel Core i3-13100F", price: 120, brand: "Intel", specs: ["4C/8T", "LGA1700", "13th Gen", "DDR4/DDR5"], performance: 68, wattage: 89, socket: "LGA1700", generation: "13th", ramType: "DDR4/DDR5" },
    { id: "cpu7", name: "Intel Core i5-13400F", price: 180, brand: "Intel", specs: ["10C(6P+4E)/16T", "LGA1700", "13th Gen", "DDR4/DDR5"], performance: 78, wattage: 148, socket: "LGA1700", generation: "13th", ramType: "DDR4/DDR5" },
    { id: "cpu8", name: "Intel Core i5-13500", price: 230, brand: "Intel", specs: ["14C(6P+8E)/20T", "LGA1700", "13th Gen", "DDR4/DDR5"], performance: 80, wattage: 154, socket: "LGA1700", generation: "13th", ramType: "DDR4/DDR5" },
    { id: "cpu9", name: "Intel Core i5-13600K", price: 280, brand: "Intel", specs: ["14C(6P+8E)/20T", "LGA1700", "Unlocked", "DDR4/DDR5"], performance: 85, wattage: 181, socket: "LGA1700", generation: "13th", ramType: "DDR4/DDR5" },
    { id: "cpu10", name: "Intel Core i7-13700K", price: 380, brand: "Intel", specs: ["16C(8P+8E)/24T", "LGA1700", "Unlocked", "DDR4/DDR5"], performance: 90, wattage: 253, socket: "LGA1700", generation: "13th", ramType: "DDR4/DDR5" },
    { id: "cpu11", name: "Intel Core i9-13900K", price: 550, brand: "Intel", specs: ["24C(8P+16E)/32T", "LGA1700", "Unlocked", "DDR4/DDR5"], performance: 95, wattage: 253, socket: "LGA1700", generation: "13th", ramType: "DDR4/DDR5" },
    { id: "cpu12", name: "Intel Core i9-13900KS", price: 700, brand: "Intel", specs: ["24C(8P+16E)/32T", "LGA1700", "Binned", "DDR4/DDR5"], performance: 97, wattage: 253, socket: "LGA1700", generation: "13th", ramType: "DDR4/DDR5" },

    // Intel 14th Gen
    { id: "cpu13", name: "Intel Core i5-14400F", price: 190, brand: "Intel", specs: ["10C(6P+4E)/16T", "LGA1700", "14th Gen", "DDR4/DDR5"], performance: 79, wattage: 148, socket: "LGA1700", generation: "14th", ramType: "DDR4/DDR5" },
    { id: "cpu14", name: "Intel Core i5-14600K", price: 300, brand: "Intel", specs: ["14C(6P+8E)/20T", "LGA1700", "Unlocked", "DDR4/DDR5"], performance: 86, wattage: 181, socket: "LGA1700", generation: "14th", ramType: "DDR4/DDR5" },
    { id: "cpu15", name: "Intel Core i7-14700K", price: 400, brand: "Intel", specs: ["20C(8P+12E)/28T", "LGA1700", "Unlocked", "DDR4/DDR5"], performance: 92, wattage: 253, socket: "LGA1700", generation: "14th", ramType: "DDR4/DDR5" },
    { id: "cpu16", name: "Intel Core i9-14900K", price: 580, brand: "Intel", specs: ["24C(8P+16E)/32T", "LGA1700", "Unlocked", "DDR4/DDR5"], performance: 96, wattage: 253, socket: "LGA1700", generation: "14th", ramType: "DDR4/DDR5" },

    // Intel Arrow Lake
    { id: "cpu17", name: "Intel Core Ultra 5 245K", price: 320, brand: "Intel", specs: ["6P+8E/20T", "LGA1851", "Arrow Lake", "DDR5"], performance: 84, wattage: 125, socket: "LGA1851", generation: "Arrow Lake", ramType: "DDR5" },
    { id: "cpu18", name: "Intel Core Ultra 7 265K", price: 420, brand: "Intel", specs: ["8P+12E/20T", "LGA1851", "Arrow Lake", "DDR5"], performance: 89, wattage: 125, socket: "LGA1851", generation: "Arrow Lake", ramType: "DDR5" },
    { id: "cpu19", name: "Intel Core Ultra 9 285K", price: 620, brand: "Intel", specs: ["8P+16E/24T", "LGA1851", "Arrow Lake", "DDR5"], performance: 93, wattage: 125, socket: "LGA1851", generation: "Arrow Lake", ramType: "DDR5" },

    // AMD Ryzen 5000
    { id: "cpu20", name: "AMD Ryzen 5 5600", price: 130, brand: "AMD", specs: ["6C/12T", "AM4", "Zen 3", "DDR4"], performance: 72, wattage: 65, socket: "AM4", generation: "Zen 3", ramType: "DDR4" },
    { id: "cpu21", name: "AMD Ryzen 5 5600X", price: 160, brand: "AMD", specs: ["6C/12T", "AM4", "Zen 3", "DDR4"], performance: 75, wattage: 65, socket: "AM4", generation: "Zen 3", ramType: "DDR4" },
    { id: "cpu22", name: "AMD Ryzen 7 5700X", price: 200, brand: "AMD", specs: ["8C/16T", "AM4", "Zen 3", "DDR4"], performance: 80, wattage: 65, socket: "AM4", generation: "Zen 3", ramType: "DDR4" },
    { id: "cpu23", name: "AMD Ryzen 7 5800X3D", price: 350, brand: "AMD", specs: ["8C/16T", "AM4", "Zen 3 3D V-Cache", "DDR4"], performance: 90, wattage: 105, socket: "AM4", generation: "Zen 3", ramType: "DDR4" },
    { id: "cpu24", name: "AMD Ryzen 9 5900X", price: 380, brand: "AMD", specs: ["12C/24T", "AM4", "Zen 3", "DDR4"], performance: 88, wattage: 105, socket: "AM4", generation: "Zen 3", ramType: "DDR4" },
    { id: "cpu25", name: "AMD Ryzen 9 5950X", price: 550, brand: "AMD", specs: ["16C/32T", "AM4", "Zen 3", "DDR4"], performance: 92, wattage: 105, socket: "AM4", generation: "Zen 3", ramType: "DDR4" },

    // AMD Ryzen 7000
    { id: "cpu26", name: "AMD Ryzen 5 7600", price: 220, brand: "AMD", specs: ["6C/12T", "AM5", "Zen 4", "DDR5"], performance: 78, wattage: 65, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
    { id: "cpu27", name: "AMD Ryzen 5 7600X", price: 250, brand: "AMD", specs: ["6C/12T", "AM5", "Zen 4", "DDR5"], performance: 80, wattage: 105, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
    { id: "cpu28", name: "AMD Ryzen 7 7700", price: 300, brand: "AMD", specs: ["8C/16T", "AM5", "Zen 4", "DDR5"], performance: 83, wattage: 65, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
    { id: "cpu29", name: "AMD Ryzen 7 7700X", price: 330, brand: "AMD", specs: ["8C/16T", "AM5", "Zen 4", "DDR5"], performance: 85, wattage: 105, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
    { id: "cpu30", name: "AMD Ryzen 7 7800X3D", price: 450, brand: "AMD", specs: ["8C/16T", "AM5", "Zen 4 3D V-Cache", "DDR5"], performance: 95, wattage: 120, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
    { id: "cpu31", name: "AMD Ryzen 9 7900", price: 420, brand: "AMD", specs: ["12C/24T", "AM5", "Zen 4", "DDR5"], performance: 88, wattage: 65, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
    { id: "cpu32", name: "AMD Ryzen 9 7900X", price: 480, brand: "AMD", specs: ["12C/24T", "AM5", "Zen 4", "DDR5"], performance: 90, wattage: 170, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
    { id: "cpu33", name: "AMD Ryzen 9 7900X3D", price: 550, brand: "AMD", specs: ["12C/24T", "AM5", "Zen 4 3D V-Cache", "DDR5"], performance: 93, wattage: 120, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
    { id: "cpu34", name: "AMD Ryzen 9 7950X", price: 600, brand: "AMD", specs: ["16C/32T", "AM5", "Zen 4", "DDR5"], performance: 94, wattage: 170, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
    { id: "cpu35", name: "AMD Ryzen 9 7950X3D", price: 700, brand: "AMD", specs: ["16C/32T", "AM5", "Zen 4 3D V-Cache", "DDR5"], performance: 98, wattage: 120, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },

    // AMD Ryzen 9000
    { id: "cpu36", name: "AMD Ryzen 5 9600X", price: 280, brand: "AMD", specs: ["6C/12T", "AM5", "Zen 5", "DDR5"], performance: 81, wattage: 65, socket: "AM5", generation: "Zen 5", ramType: "DDR5" },
    { id: "cpu37", name: "AMD Ryzen 7 9700X", price: 360, brand: "AMD", specs: ["8C/16T", "AM5", "Zen 5", "DDR5"], performance: 86, wattage: 65, socket: "AM5", generation: "Zen 5", ramType: "DDR5" },
    { id: "cpu38", name: "AMD Ryzen 9 9900X", price: 500, brand: "AMD", specs: ["12C/24T", "AM5", "Zen 5", "DDR5"], performance: 91, wattage: 120, socket: "AM5", generation: "Zen 5", ramType: "DDR5" },
    { id: "cpu39", name: "AMD Ryzen 9 9950X", price: 650, brand: "AMD", specs: ["16C/32T", "AM5", "Zen 5", "DDR5"], performance: 96, wattage: 170, socket: "AM5", generation: "Zen 5", ramType: "DDR5" },
    { id: "cpu40", name: "AMD Ryzen 9 9950X3D", price: 750, brand: "AMD", specs: ["16C/32T", "AM5", "Zen 5 3D V-Cache", "DDR5"], performance: 99, wattage: 170, socket: "AM5", generation: "Zen 5", ramType: "DDR5" },
    { id: "cpu41", name: "AMD Ryzen 9 9900X3D", price: 600, brand: "AMD", specs: ["12C/24T", "AM5", "Zen 5 3D V-Cache", "DDR5"], performance: 94, wattage: 120, socket: "AM5", generation: "Zen 5", ramType: "DDR5" },
  ],

  gpu: [
    // NVIDIA RTX 30 Series
    { id: "gpu1", name: "NVIDIA GeForce RTX 3050", price: 250, brand: "NVIDIA", specs: ["8GB GDDR6", "128-bit", "Ampere", "PCIe 4.0"], performance: 55, wattage: 130 },
    { id: "gpu2", name: "NVIDIA GeForce RTX 3060 8GB", price: 300, brand: "NVIDIA", specs: ["8GB GDDR6", "128-bit", "Ampere", "PCIe 4.0"], performance: 65, wattage: 170 },
    { id: "gpu3", name: "NVIDIA GeForce RTX 3060 12GB", price: 330, brand: "NVIDIA", specs: ["12GB GDDR6", "192-bit", "Ampere", "PCIe 4.0"], performance: 68, wattage: 170 },
    { id: "gpu4", name: "NVIDIA GeForce RTX 3060 Ti", price: 400, brand: "NVIDIA", specs: ["8GB GDDR6", "256-bit", "Ampere", "PCIe 4.0"], performance: 75, wattage: 200 },
    { id: "gpu5", name: "NVIDIA GeForce RTX 3070", price: 500, brand: "NVIDIA", specs: ["8GB GDDR6", "256-bit", "Ampere", "PCIe 4.0"], performance: 80, wattage: 220 },
    { id: "gpu6", name: "NVIDIA GeForce RTX 3070 Ti", price: 600, brand: "NVIDIA", specs: ["8GB GDDR6X", "256-bit", "Ampere", "PCIe 4.0"], performance: 82, wattage: 290 },
    { id: "gpu7", name: "NVIDIA GeForce RTX 3080 10GB", price: 700, brand: "NVIDIA", specs: ["10GB GDDR6X", "320-bit", "Ampere", "PCIe 4.0"], performance: 88, wattage: 320 },
    { id: "gpu8", name: "NVIDIA GeForce RTX 3080 12GB", price: 800, brand: "NVIDIA", specs: ["12GB GDDR6X", "384-bit", "Ampere", "PCIe 4.0"], performance: 89, wattage: 350 },
    { id: "gpu9", name: "NVIDIA GeForce RTX 3080 Ti", price: 1100, brand: "NVIDIA", specs: ["12GB GDDR6X", "384-bit", "Ampere", "PCIe 4.0"], performance: 92, wattage: 350 },
    { id: "gpu10", name: "NVIDIA GeForce RTX 3090", price: 1500, brand: "NVIDIA", specs: ["24GB GDDR6X", "384-bit", "Ampere", "PCIe 4.0"], performance: 95, wattage: 350 },
    { id: "gpu11", name: "NVIDIA GeForce RTX 3090 Ti", price: 2000, brand: "NVIDIA", specs: ["24GB GDDR6X", "384-bit", "Ampere", "PCIe 4.0"], performance: 97, wattage: 450 },

    // NVIDIA RTX 40 Series
    { id: "gpu12", name: "NVIDIA GeForce RTX 4060", price: 300, brand: "NVIDIA", specs: ["8GB GDDR6", "128-bit", "Ada Lovelace", "PCIe 4.0"], performance: 70, wattage: 115 },
    { id: "gpu13", name: "NVIDIA GeForce RTX 4060 Ti 8GB", price: 400, brand: "NVIDIA", specs: ["8GB GDDR6", "128-bit", "Ada Lovelace", "PCIe 4.0"], performance: 75, wattage: 160 },
    { id: "gpu14", name: "NVIDIA GeForce RTX 4060 Ti 16GB", price: 500, brand: "NVIDIA", specs: ["16GB GDDR6", "128-bit", "Ada Lovelace", "PCIe 4.0"], performance: 76, wattage: 165 },
    { id: "gpu15", name: "NVIDIA GeForce RTX 4070", price: 600, brand: "NVIDIA", specs: ["12GB GDDR6X", "192-bit", "Ada Lovelace", "PCIe 4.0"], performance: 82, wattage: 200 },
    { id: "gpu16", name: "NVIDIA GeForce RTX 4070 SUPER", price: 650, brand: "NVIDIA", specs: ["12GB GDDR6X", "192-bit", "Ada Lovelace", "PCIe 4.0"], performance: 85, wattage: 220 },
    { id: "gpu17", name: "NVIDIA GeForce RTX 4070 Ti", price: 800, brand: "NVIDIA", specs: ["12GB GDDR6X", "192-bit", "Ada Lovelace", "PCIe 4.0"], performance: 88, wattage: 285 },
    { id: "gpu18", name: "NVIDIA GeForce RTX 4070 Ti SUPER", price: 900, brand: "NVIDIA", specs: ["16GB GDDR6X", "256-bit", "Ada Lovelace", "PCIe 4.0"], performance: 90, wattage: 285 },
    { id: "gpu19", name: "NVIDIA GeForce RTX 4080", price: 1200, brand: "NVIDIA", specs: ["16GB GDDR6X", "256-bit", "Ada Lovelace", "PCIe 4.0"], performance: 93, wattage: 320 },
    { id: "gpu20", name: "NVIDIA GeForce RTX 4080 SUPER", price: 1000, brand: "NVIDIA", specs: ["16GB GDDR6X", "256-bit", "Ada Lovelace", "PCIe 4.0"], performance: 94, wattage: 320 },
    { id: "gpu21", name: "NVIDIA GeForce RTX 4090", price: 1999, brand: "NVIDIA", specs: ["24GB GDDR6X", "384-bit", "Ada Lovelace", "PCIe 4.0"], performance: 100, wattage: 450 },

    // NVIDIA RTX 50 Series
    { id: "gpu22", name: "NVIDIA GeForce RTX 5070", price: 650, brand: "NVIDIA", specs: ["12GB GDDR7", "192-bit", "Blackwell", "PCIe 5.0"], performance: 87, wattage: 220 },
    { id: "gpu23", name: "NVIDIA GeForce RTX 5070 Ti", price: 850, brand: "NVIDIA", specs: ["16GB GDDR7", "256-bit", "Blackwell", "PCIe 5.0"], performance: 91, wattage: 285 },
    { id: "gpu24", name: "NVIDIA GeForce RTX 5080", price: 1100, brand: "NVIDIA", specs: ["16GB GDDR7", "256-bit", "Blackwell", "PCIe 5.0"], performance: 95, wattage: 350 },
    { id: "gpu25", name: "NVIDIA GeForce RTX 5090", price: 2200, brand: "NVIDIA", specs: ["32GB GDDR7", "512-bit", "Blackwell", "PCIe 5.0"], performance: 105, wattage: 575 },

    // AMD Radeon RX 6000
    { id: "gpu26", name: "AMD Radeon RX 6500 XT", price: 200, brand: "AMD", specs: ["4GB GDDR6", "64-bit", "RDNA 2", "PCIe 4.0"], performance: 45, wattage: 107 },
    { id: "gpu27", name: "AMD Radeon RX 6600", price: 250, brand: "AMD", specs: ["8GB GDDR6", "128-bit", "RDNA 2", "PCIe 4.0"], performance: 65, wattage: 132 },
    { id: "gpu28", name: "AMD Radeon RX 6600 XT", price: 300, brand: "AMD", specs: ["8GB GDDR6", "128-bit", "RDNA 2", "PCIe 4.0"], performance: 70, wattage: 160 },
    { id: "gpu29", name: "AMD Radeon RX 6650 XT", price: 320, brand: "AMD", specs: ["8GB GDDR6", "128-bit", "RDNA 2", "PCIe 4.0"], performance: 72, wattage: 180 },
    { id: "gpu30", name: "AMD Radeon RX 6700", price: 350, brand: "AMD", specs: ["10GB GDDR6", "160-bit", "RDNA 2", "PCIe 4.0"], performance: 75, wattage: 175 },
    { id: "gpu31", name: "AMD Radeon RX 6700 XT", price: 400, brand: "AMD", specs: ["12GB GDDR6", "192-bit", "RDNA 2", "PCIe 4.0"], performance: 78, wattage: 230 },
    { id: "gpu32", name: "AMD Radeon RX 6750 XT", price: 450, brand: "AMD", specs: ["12GB GDDR6", "192-bit", "RDNA 2", "PCIe 4.0"], performance: 80, wattage: 250 },
    { id: "gpu33", name: "AMD Radeon RX 6800", price: 550, brand: "AMD", specs: ["16GB GDDR6", "256-bit", "RDNA 2", "PCIe 4.0"], performance: 85, wattage: 250 },
    { id: "gpu34", name: "AMD Radeon RX 6800 XT", price: 650, brand: "AMD", specs: ["16GB GDDR6", "256-bit", "RDNA 2", "PCIe 4.0"], performance: 88, wattage: 300 },
    { id: "gpu35", name: "AMD Radeon RX 6900 XT", price: 900, brand: "AMD", specs: ["16GB GDDR6", "256-bit", "RDNA 2", "PCIe 4.0"], performance: 92, wattage: 300 },
    { id: "gpu36", name: "AMD Radeon RX 6950 XT", price: 1000, brand: "AMD", specs: ["16GB GDDR6", "256-bit", "RDNA 2", "PCIe 4.0"], performance: 94, wattage: 335 },

    // AMD Radeon RX 7000
    { id: "gpu37", name: "AMD Radeon RX 7600", price: 270, brand: "AMD", specs: ["8GB GDDR6", "128-bit", "RDNA 3", "PCIe 4.0"], performance: 68, wattage: 165 },
    { id: "gpu38", name: "AMD Radeon RX 7600 XT 16GB", price: 350, brand: "AMD", specs: ["16GB GDDR6", "128-bit", "RDNA 3", "PCIe 4.0"], performance: 72, wattage: 190 },
    { id: "gpu39", name: "AMD Radeon RX 7700 XT", price: 450, brand: "AMD", specs: ["12GB GDDR6", "192-bit", "RDNA 3", "PCIe 4.0"], performance: 80, wattage: 245 },
    { id: "gpu40", name: "AMD Radeon RX 7800 XT", price: 550, brand: "AMD", specs: ["16GB GDDR6", "256-bit", "RDNA 3", "PCIe 4.0"], performance: 85, wattage: 263 },
    { id: "gpu41", name: "AMD Radeon RX 7900 GRE", price: 600, brand: "AMD", specs: ["16GB GDDR6", "256-bit", "RDNA 3", "PCIe 4.0"], performance: 87, wattage: 260 },
    { id: "gpu42", name: "AMD Radeon RX 7900 XT", price: 800, brand: "AMD", specs: ["20GB GDDR6", "320-bit", "RDNA 3", "PCIe 4.0"], performance: 90, wattage: 300 },
    { id: "gpu43", name: "AMD Radeon RX 7900 XTX", price: 1000, brand: "AMD", specs: ["24GB GDDR6", "384-bit", "RDNA 3", "PCIe 4.0"], performance: 95, wattage: 355 },

    // AMD Radeon RX 9000
    { id: "gpu44", name: "AMD Radeon RX 9060", price: 300, brand: "AMD", specs: ["8GB GDDR6", "128-bit", "RDNA 4", "PCIe 4.0"], performance: 70, wattage: 150 },
    { id: "gpu45", name: "AMD Radeon RX 9060 XT 8GB", price: 350, brand: "AMD", specs: ["8GB GDDR6", "128-bit", "RDNA 4", "PCIe 4.0"], performance: 73, wattage: 170 },
    { id: "gpu46", name: "AMD Radeon RX 9060 XT 16GB", price: 400, brand: "AMD", specs: ["16GB GDDR6", "256-bit", "RDNA 4", "PCIe 4.0"], performance: 75, wattage: 180 },
    { id: "gpu47", name: "AMD Radeon RX 9070", price: 500, brand: "AMD", specs: ["16GB GDDR6", "256-bit", "RDNA 4", "PCIe 4.0"], performance: 82, wattage: 220 },
    { id: "gpu48", name: "AMD Radeon RX 9070 XT", price: 600, brand: "AMD", specs: ["16GB GDDR6", "256-bit", "RDNA 4", "PCIe 4.0"], performance: 86, wattage: 260 },
  ],

  motherboard: [
    // Intel LGA1700
    { id: "mb1", name: "ASUS Prime H610M-A", price: 90, brand: "ASUS", specs: ["H610", "LGA1700", "DDR4", "mATX"], performance: 60, wattage: 50, socket: "LGA1700", chipset: "H610", ramType: "DDR4" },
    { id: "mb2", name: "MSI PRO B660M-A", price: 130, brand: "MSI", specs: ["B660", "LGA1700", "DDR4", "mATX"], performance: 70, wattage: 60, socket: "LGA1700", chipset: "B660", ramType: "DDR4" },
    { id: "mb3", name: "Gigabyte B660 Gaming X", price: 150, brand: "Gigabyte", specs: ["B660", "LGA1700", "DDR4", "ATX"], performance: 72, wattage: 65, socket: "LGA1700", chipset: "B660", ramType: "DDR4" },
    { id: "mb4", name: "ASUS TUF Gaming Z690-Plus", price: 250, brand: "ASUS", specs: ["Z690", "LGA1700", "DDR5", "ATX"], performance: 85, wattage: 80, socket: "LGA1700", chipset: "Z690", ramType: "DDR5" },
    { id: "mb5", name: "MSI MAG B760 Tomahawk", price: 200, brand: "MSI", specs: ["B760", "LGA1700", "DDR5", "ATX"], performance: 78, wattage: 70, socket: "LGA1700", chipset: "B760", ramType: "DDR5" },
    { id: "mb6", name: "Gigabyte Z790 Aorus Elite", price: 280, brand: "Gigabyte", specs: ["Z790", "LGA1700", "DDR5", "ATX"], performance: 88, wattage: 85, socket: "LGA1700", chipset: "Z790", ramType: "DDR5" },
    { id: "mb7", name: "ASUS ROG Strix Z790-E", price: 450, brand: "ASUS", specs: ["Z790", "LGA1700", "DDR5", "ATX"], performance: 95, wattage: 90, socket: "LGA1700", chipset: "Z790", ramType: "DDR5" },
    
    // Intel LGA1851
    { id: "mb8", name: "MSI MAG Z890 Tomahawk", price: 350, brand: "MSI", specs: ["Z890", "LGA1851", "DDR5", "ATX"], performance: 90, wattage: 85, socket: "LGA1851", chipset: "Z890", ramType: "DDR5" },
    { id: "mb9", name: "ASUS ROG Maximus Z890 Hero", price: 650, brand: "ASUS", specs: ["Z890", "LGA1851", "DDR5", "E-ATX"], performance: 98, wattage: 95, socket: "LGA1851", chipset: "Z890", ramType: "DDR5" },
    
    // AMD AM4
    { id: "mb10", name: "ASRock A520M-HDV", price: 70, brand: "ASRock", specs: ["A520", "AM4", "DDR4", "mATX"], performance: 55, wattage: 45, socket: "AM4", chipset: "A520", ramType: "DDR4" },
    { id: "mb11", name: "MSI B550-A PRO", price: 130, brand: "MSI", specs: ["B550", "AM4", "DDR4", "ATX"], performance: 72, wattage: 60, socket: "AM4", chipset: "B550", ramType: "DDR4" },
    { id: "mb12", name: "ASUS TUF Gaming B550-Plus", price: 160, brand: "ASUS", specs: ["B550", "AM4", "DDR4", "ATX"], performance: 75, wattage: 65, socket: "AM4", chipset: "B550", ramType: "DDR4" },
    { id: "mb13", name: "Gigabyte X570 Aorus Elite", price: 200, brand: "Gigabyte", specs: ["X570", "AM4", "DDR4", "ATX"], performance: 82, wattage: 75, socket: "AM4", chipset: "X570", ramType: "DDR4" },
    { id: "mb14", name: "ASUS ROG Strix X570-E", price: 350, brand: "ASUS", specs: ["X570", "AM4", "DDR4", "ATX"], performance: 90, wattage: 80, socket: "AM4", chipset: "X570", ramType: "DDR4" },
    
    // AMD AM5
    { id: "mb15", name: "ASRock A620M-HDV", price: 90, brand: "ASRock", specs: ["A620", "AM5", "DDR5", "mATX"], performance: 60, wattage: 50, socket: "AM5", chipset: "A620", ramType: "DDR5" },
    { id: "mb16", name: "MSI PRO B650-P", price: 150, brand: "MSI", specs: ["B650", "AM5", "DDR5", "ATX"], performance: 72, wattage: 65, socket: "AM5", chipset: "B650", ramType: "DDR5" },
    { id: "mb17", name: "ASUS TUF Gaming B650-Plus", price: 200, brand: "ASUS", specs: ["B650", "AM5", "DDR5", "ATX"], performance: 78, wattage: 70, socket: "AM5", chipset: "B650", ramType: "DDR5" },
    { id: "mb18", name: "Gigabyte B650E Aorus Master", price: 280, brand: "Gigabyte", specs: ["B650E", "AM5", "DDR5", "ATX"], performance: 85, wattage: 75, socket: "AM5", chipset: "B650E", ramType: "DDR5" },
    { id: "mb19", name: "MSI MAG X670E Tomahawk", price: 320, brand: "MSI", specs: ["X670E", "AM5", "DDR5", "ATX"], performance: 88, wattage: 80, socket: "AM5", chipset: "X670E", ramType: "DDR5" },
    { id: "mb20", name: "ASUS ROG Strix X670E-E", price: 500, brand: "ASUS", specs: ["X670E", "AM5", "DDR5", "ATX"], performance: 95, wattage: 85, socket: "AM5", chipset: "X670E", ramType: "DDR5" },
    { id: "mb21", name: "Gigabyte X870E Aorus Master", price: 550, brand: "Gigabyte", specs: ["X870E", "AM5", "DDR5", "E-ATX"], performance: 97, wattage: 90, socket: "AM5", chipset: "X870E", ramType: "DDR5" },
  ],
  
  ram: [
    // DDR4
    { id: "ram1", name: "Corsair Vengeance LPX 16GB", price: 50, brand: "Corsair", specs: ["DDR4-3200", "CL16", "2x8GB", "No RGB"], performance: 65, wattage: 8, type: "DDR4", capacity: 16 },
    { id: "ram2", name: "G.Skill Ripjaws V 16GB", price: 55, brand: "G.Skill", specs: ["DDR4-3600", "CL18", "2x8GB", "No RGB"], performance: 70, wattage: 8, type: "DDR4", capacity: 16 },
    { id: "ram3", name: "Corsair Vengeance RGB 32GB", price: 90, brand: "Corsair", specs: ["DDR4-3600", "CL18", "2x16GB", "RGB"], performance: 75, wattage: 10, type: "DDR4", capacity: 32 },
    { id: "ram4", name: "Kingston Fury Beast 32GB", price: 85, brand: "Kingston", specs: ["DDR4-3600", "CL17", "2x16GB", "No RGB"], performance: 73, wattage: 10, type: "DDR4", capacity: 32 },
    
    // DDR5
    { id: "ram5", name: "Corsair Vengeance 16GB", price: 70, brand: "Corsair", specs: ["DDR5-5600", "CL36", "2x8GB", "No RGB"], performance: 75, wattage: 10, type: "DDR5", capacity: 16 },
    { id: "ram6", name: "Kingston Fury Beast 32GB", price: 110, brand: "Kingston", specs: ["DDR5-6000", "CL36", "2x16GB", "No RGB"], performance: 82, wattage: 12, type: "DDR5", capacity: 32 },
    { id: "ram7", name: "G.Skill Trident Z5 32GB", price: 140, brand: "G.Skill", specs: ["DDR5-6000", "CL30", "2x16GB", "RGB"], performance: 88, wattage: 12, type: "DDR5", capacity: 32 },
    { id: "ram8", name: "Corsair Vengeance RGB 32GB", price: 150, brand: "Corsair", specs: ["DDR5-6400", "CL32", "2x16GB", "RGB"], performance: 90, wattage: 14, type: "DDR5", capacity: 32 },
    { id: "ram9", name: "G.Skill Trident Z5 RGB 64GB", price: 280, brand: "G.Skill", specs: ["DDR5-6400", "CL32", "2x32GB", "RGB"], performance: 92, wattage: 16, type: "DDR5", capacity: 64 },
    { id: "ram10", name: "Corsair Dominator Platinum 64GB", price: 320, brand: "Corsair", specs: ["DDR5-6400", "CL32", "2x32GB", "RGB"], performance: 95, wattage: 16, type: "DDR5", capacity: 64 },
    { id: "ram11", name: "TeamGroup T-Force Delta RGB 32GB", price: 250, brand: "TeamGroup", specs: ["DDR5-7200", "CL34", "2x16GB", "RGB"], performance: 93, wattage: 15, type: "DDR5", capacity: 32 },
  ],
  
  storage: [
    // PCIe 4.0 NVMe
    { id: "ssd1", name: "Samsung 980 Pro 500GB", price: 70, brand: "Samsung", specs: ["NVMe Gen4", "7000/5000 MB/s", "500GB", "M.2 2280"], performance: 82, wattage: 4 },
    { id: "ssd2", name: "Samsung 980 Pro 1TB", price: 120, brand: "Samsung", specs: ["NVMe Gen4", "7000/5000 MB/s", "1TB", "M.2 2280"], performance: 85, wattage: 4 },
    { id: "ssd3", name: "Samsung 990 Pro 1TB", price: 130, brand: "Samsung", specs: ["NVMe Gen4", "7450/6900 MB/s", "1TB", "M.2 2280"], performance: 90, wattage: 5 },
    { id: "ssd4", name: "Samsung 990 Pro 2TB", price: 190, brand: "Samsung", specs: ["NVMe Gen4", "7450/6900 MB/s", "2TB", "M.2 2280"], performance: 92, wattage: 5 },
    { id: "ssd5", name: "WD Black SN850X 1TB", price: 110, brand: "Western Digital", specs: ["NVMe Gen4", "7300/6600 MB/s", "1TB", "M.2 2280"], performance: 88, wattage: 4 },
    { id: "ssd6", name: "WD Black SN850X 2TB", price: 180, brand: "Western Digital", specs: ["NVMe Gen4", "7300/6600 MB/s", "2TB", "M.2 2280"], performance: 90, wattage: 4 },
    { id: "ssd7", name: "Crucial P5 Plus 500GB", price: 60, brand: "Crucial", specs: ["NVMe Gen4", "6600/5000 MB/s", "500GB", "M.2 2280"], performance: 80, wattage: 3 },
    { id: "ssd8", name: "Crucial P5 Plus 1TB", price: 100, brand: "Crucial", specs: ["NVMe Gen4", "6600/5000 MB/s", "1TB", "M.2 2280"], performance: 82, wattage: 3 },
    
    // PCIe 5.0 NVMe
    { id: "ssd9", name: "Crucial T700 1TB", price: 180, brand: "Crucial", specs: ["NVMe Gen5", "12400/11800 MB/s", "1TB", "M.2 2280"], performance: 95, wattage: 6 },
    { id: "ssd10", name: "Crucial T700 2TB", price: 320, brand: "Crucial", specs: ["NVMe Gen5", "12400/11800 MB/s", "2TB", "M.2 2280"], performance: 97, wattage: 6 },
    { id: "ssd11", name: "Crucial T705 1TB", price: 220, brand: "Crucial", specs: ["NVMe Gen5", "14100/12600 MB/s", "1TB", "M.2 2280"], performance: 98, wattage: 7 },
    { id: "ssd12", name: "Crucial T705 2TB", price: 400, brand: "Crucial", specs: ["NVMe Gen5", "14500/12700 MB/s", "2TB", "M.2 2280"], performance: 100, wattage: 7 },
    { id: "ssd13", name: "Samsung 990 EVO 1TB", price: 90, brand: "Samsung", specs: ["NVMe Gen4/5", "5000/4200 MB/s", "1TB", "M.2 2280"], performance: 75, wattage: 4 },
    { id: "ssd14", name: "Samsung 990 EVO 2TB", price: 160, brand: "Samsung", specs: ["NVMe Gen4/5", "5000/4200 MB/s", "2TB", "M.2 2280"], performance: 77, wattage: 4 },
    
    // HDD
    { id: "hdd1", name: "Seagate BarraCuda 2TB", price: 60, brand: "Seagate", specs: ["HDD 7200RPM", "SATA 6Gb/s", "2TB", "3.5\""], performance: 40, wattage: 6 },
    { id: "hdd2", name: "Seagate IronWolf 4TB", price: 110, brand: "Seagate", specs: ["HDD 5400RPM", "SATA 6Gb/s", "4TB", "3.5\" NAS"], performance: 42, wattage: 7 },
    { id: "hdd3", name: "Seagate IronWolf 8TB", price: 200, brand: "Seagate", specs: ["HDD 7200RPM", "SATA 6Gb/s", "8TB", "3.5\" NAS"], performance: 45, wattage: 8 },
  ],
  
  psu: [
    { id: "psu1", name: "Be Quiet! Pure Power 11 500W", price: 70, brand: "Be Quiet!", specs: ["80+ Gold", "Semi Modular", "500W", "ATX 2.x"], performance: 75, wattage: 0, power: 500 },
    { id: "psu2", name: "Be Quiet! Pure Power 650W", price: 90, brand: "Be Quiet!", specs: ["80+ Bronze", "Semi Modular", "650W", "ATX 2.x"], performance: 78, wattage: 0, power: 650 },
    { id: "psu3", name: "Corsair RM650e", price: 100, brand: "Corsair", specs: ["80+ Gold", "Fully Modular", "650W", "ATX 3.0"], performance: 82, wattage: 0, power: 650 },
    { id: "psu4", name: "Corsair RM750e", price: 120, brand: "Corsair", specs: ["80+ Gold", "Fully Modular", "750W", "ATX 3.0"], performance: 85, wattage: 0, power: 750 },
    { id: "psu5", name: "Seasonic Focus GX-750", price: 110, brand: "Seasonic", specs: ["80+ Gold", "Fully Modular", "750W", "ATX 2.x"], performance: 83, wattage: 0, power: 750 },
    { id: "psu6", name: "Corsair RM850x Shift", price: 150, brand: "Corsair", specs: ["80+ Gold", "Fully Modular", "850W", "ATX 3.0"], performance: 88, wattage: 0, power: 850 },
    { id: "psu7", name: "Be Quiet! Straight Power 12 850W", price: 160, brand: "Be Quiet!", specs: ["80+ Platinum", "Fully Modular", "850W", "ATX 3.0"], performance: 90, wattage: 0, power: 850 },
    { id: "psu8", name: "MSI MAG A850GL PCIE5", price: 140, brand: "MSI", specs: ["80+ Gold", "Fully Modular", "850W", "ATX 3.0"], performance: 87, wattage: 0, power: 850 },
    { id: "psu9", name: "Seasonic PRIME TX-1000", price: 250, brand: "Seasonic", specs: ["80+ Titanium", "Fully Modular", "1000W", "ATX 3.0"], performance: 95, wattage: 0, power: 1000 },
    { id: "psu10", name: "Corsair HX1000i", price: 280, brand: "Corsair", specs: ["80+ Platinum", "Fully Modular", "1000W", "ATX 3.0"], performance: 93, wattage: 0, power: 1000 },
    { id: "psu11", name: "Seasonic Focus GX ATX 3.1 750W", price: 130, brand: "Seasonic", specs: ["80+ Gold", "Fully Modular", "750W", "ATX 3.1"], performance: 86, wattage: 0, power: 750 },
    { id: "psu12", name: "Seasonic Focus GX ATX 3.1 850W", price: 150, brand: "Seasonic", specs: ["80+ Gold", "Fully Modular", "850W", "ATX 3.1"], performance: 88, wattage: 0, power: 850 },
  ],
};

// Function to get components with details
export function getComponentsWithDetails(category: Category): ComponentWithDetails[] {
  // Create deep copies to avoid any mutation issues
  const rawComponents = JSON.parse(JSON.stringify(componentsData[category])) as Component[];
  
  return rawComponents.map(comp => {
    // Create a new object with all properties
    const compWithDetails: ComponentWithDetails = { 
      ...comp,
      category: category,
      rating: 4.5,
      stock: true,
      description: "",
      utility: "",
      domain: ""
    };
    
    // Add category-specific descriptions
    if (category === "cpu") {
      compWithDetails.description = `Ce processeur ${comp.brand} offre un excellent équilibre entre performance et efficacité pour diverses tâches.`;
      compWithDetails.utility = `Idéal pour le gaming, le multitâche et les applications de productivité.`;
      compWithDetails.domain = `Gaming, bureautique, création de contenu léger.`;
    } else if (category === "gpu") {
      compWithDetails.description = `Cette carte graphique ${comp.brand} est conçue pour offrir des performances graphiques fluides.`;
      compWithDetails.utility = `Parfaite pour le gaming en haute résolution et les applications graphiques.`;
      compWithDetails.domain = `Gaming, design graphique, montage vidéo.`;
    } else if (category === "motherboard") {
      compWithDetails.description = `Cette carte mère ${comp.brand} est la base solide de votre système, assurant la compatibilité et la stabilité.`;
      compWithDetails.utility = `Essentielle pour connecter tous vos composants et gérer les flux de données.`;
      compWithDetails.domain = `Toutes configurations PC.`;
    } else if (category === "ram") {
      compWithDetails.description = `Cette mémoire RAM ${comp.brand} offre la vitesse et la capacité nécessaires pour un multitâche fluide.`;
      compWithDetails.utility = `Améliore la réactivité du système et la performance des applications.`;
      compWithDetails.domain = `Gaming, applications professionnelles, usage quotidien.`;
    } else if (category === "storage") {
      compWithDetails.description = `Ce périphérique de stockage ${comp.brand} offre des vitesses de lecture/écriture rapides pour vos données.`;
      compWithDetails.utility = `Idéal pour le système d'exploitation, les jeux et les fichiers volumineux.`;
      compWithDetails.domain = `Gaming, productivité, stockage de données.`;
    } else if (category === "psu") {
      compWithDetails.description = `Cette alimentation ${comp.brand} fournit une énergie stable et fiable à tous vos composants.`;
      compWithDetails.utility = `Assure la stabilité et la longévité de votre système.`;
      compWithDetails.domain = `Toutes configurations PC.`;
    }
    
    return compWithDetails;
  });
}
