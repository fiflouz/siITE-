export type Category = "cpu" | "gpu" | "motherboard" | "ram" | "storage" | "psu";

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

export interface ComponentWithDetails extends Component {
  category: Category;
  rating?: number;
  stock?: boolean;
  description?: string;
  utility?: string;
  domain?: string;
}

export type MappedComponent = ComponentWithDetails;

type ComponentsData = Record<Category, Component[]>;

const baseComponents: ComponentsData = {
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
    { id: "cpu19", name: "Intel Core Ultra 9 285K", price: 520, brand: "Intel", specs: ["8P+16E/24T", "LGA1851", "Arrow Lake", "DDR5"], performance: 94, wattage: 125, socket: "LGA1851", generation: "Arrow Lake", ramType: "DDR5" },

    // AMD Ryzen 5000
    { id: "cpu20", name: "AMD Ryzen 5 5600", price: 140, brand: "AMD", specs: ["6C/12T", "AM4", "Zen 3", "DDR4"], performance: 74, wattage: 65, socket: "AM4", generation: "Zen 3", ramType: "DDR4" },
    { id: "cpu21", name: "AMD Ryzen 5 5600X", price: 180, brand: "AMD", specs: ["6C/12T", "AM4", "Zen 3", "DDR4"], performance: 78, wattage: 65, socket: "AM4", generation: "Zen 3", ramType: "DDR4" },
    { id: "cpu22", name: "AMD Ryzen 7 5800X", price: 240, brand: "AMD", specs: ["8C/16T", "AM4", "Zen 3", "DDR4"], performance: 85, wattage: 105, socket: "AM4", generation: "Zen 3", ramType: "DDR4" },
    { id: "cpu23", name: "AMD Ryzen 7 5800X3D", price: 320, brand: "AMD", specs: ["8C/16T", "AM4", "3D V-Cache", "DDR4"], performance: 92, wattage: 105, socket: "AM4", generation: "Zen 3", ramType: "DDR4" },
    { id: "cpu24", name: "AMD Ryzen 9 5900X", price: 380, brand: "AMD", specs: ["12C/24T", "AM4", "Zen 3", "DDR4"], performance: 90, wattage: 105, socket: "AM4", generation: "Zen 3", ramType: "DDR4" },
    { id: "cpu25", name: "AMD Ryzen 9 5950X", price: 480, brand: "AMD", specs: ["16C/32T", "AM4", "Zen 3", "DDR4"], performance: 94, wattage: 105, socket: "AM4", generation: "Zen 3", ramType: "DDR4" },

    // AMD Ryzen 7000
    { id: "cpu26", name: "AMD Ryzen 5 7600", price: 230, brand: "AMD", specs: ["6C/12T", "AM5", "Zen 4", "DDR5"], performance: 84, wattage: 65, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
    { id: "cpu27", name: "AMD Ryzen 5 7600X", price: 260, brand: "AMD", specs: ["6C/12T", "AM5", "Zen 4", "DDR5"], performance: 86, wattage: 105, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
    { id: "cpu28", name: "AMD Ryzen 7 7700", price: 320, brand: "AMD", specs: ["8C/16T", "AM5", "Zen 4", "DDR5"], performance: 90, wattage: 65, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
    { id: "cpu29", name: "AMD Ryzen 7 7700X", price: 340, brand: "AMD", specs: ["8C/16T", "AM5", "Zen 4", "DDR5"], performance: 92, wattage: 105, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
    { id: "cpu30", name: "AMD Ryzen 7 7800X3D", price: 420, brand: "AMD", specs: ["8C/16T", "AM5", "3D V-Cache", "DDR5"], performance: 98, wattage: 120, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
    { id: "cpu31", name: "AMD Ryzen 9 7900X", price: 380, brand: "AMD", specs: ["12C/24T", "AM5", "Zen 4", "DDR5"], performance: 93, wattage: 170, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
    { id: "cpu32", name: "AMD Ryzen 9 7950X", price: 500, brand: "AMD", specs: ["16C/32T", "AM5", "Zen 4", "DDR5"], performance: 97, wattage: 170, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
    { id: "cpu33", name: "AMD Ryzen 9 7950X3D", price: 600, brand: "AMD", specs: ["16C/32T", "AM5", "3D V-Cache", "DDR5"], performance: 100, wattage: 170, socket: "AM5", generation: "Zen 4", ramType: "DDR5" },
  ],

  gpu: [
    // Nvidia RTX 40 Series
    { id: "gpu1", name: "NVIDIA GeForce RTX 4060", price: 329, brand: "NVIDIA", specs: ["8GB GDDR6", "DLSS 3", "140W TGP"], performance: 70, wattage: 140 },
    { id: "gpu2", name: "NVIDIA GeForce RTX 4060 Ti", price: 429, brand: "NVIDIA", specs: ["8GB GDDR6", "DLSS 3", "160W TGP"], performance: 78, wattage: 160 },
    { id: "gpu3", name: "NVIDIA GeForce RTX 4070", price: 599, brand: "NVIDIA", specs: ["12GB GDDR6X", "DLSS 3", "200W TGP"], performance: 85, wattage: 200 },
    { id: "gpu4", name: "NVIDIA GeForce RTX 4070 Ti SUPER", price: 799, brand: "NVIDIA", specs: ["16GB GDDR6X", "DLSS 3", "285W TGP"], performance: 92, wattage: 285 },
    { id: "gpu5", name: "NVIDIA GeForce RTX 4080 SUPER", price: 999, brand: "NVIDIA", specs: ["16GB GDDR6X", "DLSS 3", "320W TGP"], performance: 95, wattage: 320 },
    { id: "gpu6", name: "NVIDIA GeForce RTX 4090", price: 1599, brand: "NVIDIA", specs: ["24GB GDDR6X", "DLSS 3", "450W TGP"], performance: 100, wattage: 450 },

    // AMD RX 7000 Series
    { id: "gpu7", name: "AMD Radeon RX 7600 XT", price: 329, brand: "AMD", specs: ["16GB GDDR6", "RDNA 3", "190W TBP"], performance: 72, wattage: 190 },
    { id: "gpu8", name: "AMD Radeon RX 7700 XT", price: 449, brand: "AMD", specs: ["12GB GDDR6", "RDNA 3", "245W TBP"], performance: 80, wattage: 245 },
    { id: "gpu9", name: "AMD Radeon RX 7800 XT", price: 499, brand: "AMD", specs: ["16GB GDDR6", "RDNA 3", "263W TBP"], performance: 85, wattage: 263 },
    { id: "gpu10", name: "AMD Radeon RX 7900 XT", price: 749, brand: "AMD", specs: ["20GB GDDR6", "RDNA 3", "315W TBP"], performance: 92, wattage: 315 },
    { id: "gpu11", name: "AMD Radeon RX 7900 XTX", price: 999, brand: "AMD", specs: ["24GB GDDR6", "RDNA 3", "355W TBP"], performance: 96, wattage: 355 },

    // Intel Arc
    { id: "gpu12", name: "Intel Arc A770 16GB", price: 349, brand: "Intel", specs: ["16GB GDDR6", "XeSS", "225W TGP"], performance: 75, wattage: 225 },
    { id: "gpu13", name: "Intel Arc A750 8GB", price: 249, brand: "Intel", specs: ["8GB GDDR6", "XeSS", "225W TGP"], performance: 68, wattage: 225 },
  ],

  motherboard: [
    // Intel LGA1700
    { id: "mb1", name: "ASUS Prime B760-PLUS", price: 160, brand: "ASUS", specs: ["B760", "LGA1700", "DDR5", "ATX"], performance: 70, wattage: 60, socket: "LGA1700", chipset: "B760", ramType: "DDR5" },
    { id: "mb2", name: "MSI PRO B760-P WiFi DDR4", price: 150, brand: "MSI", specs: ["B760", "LGA1700", "DDR4", "ATX"], performance: 68, wattage: 55, socket: "LGA1700", chipset: "B760", ramType: "DDR4" },
    { id: "mb3", name: "ASUS TUF Gaming Z790-Plus WiFi", price: 300, brand: "ASUS", specs: ["Z790", "LGA1700", "DDR5", "ATX"], performance: 85, wattage: 75, socket: "LGA1700", chipset: "Z790", ramType: "DDR5" },
    { id: "mb4", name: "Gigabyte Z790 Aorus Elite AX", price: 280, brand: "Gigabyte", specs: ["Z790", "LGA1700", "DDR5", "ATX"], performance: 82, wattage: 70, socket: "LGA1700", chipset: "Z790", ramType: "DDR5" },
    { id: "mb5", name: "MSI MAG Z690 Tomahawk WiFi DDR5", price: 250, brand: "MSI", specs: ["Z690", "LGA1700", "DDR5", "ATX"], performance: 80, wattage: 68, socket: "LGA1700", chipset: "Z690", ramType: "DDR5" },
    { id: "mb6", name: "ASUS ROG Strix Z790-E Gaming", price: 450, brand: "ASUS", specs: ["Z790", "LGA1700", "DDR5", "ATX"], performance: 95, wattage: 85, socket: "LGA1700", chipset: "Z790", ramType: "DDR5" },
    { id: "mb7", name: "Gigabyte Z790 Aorus Master", price: 550, brand: "Gigabyte", specs: ["Z790", "LGA1700", "DDR5", "ATX"], performance: 98, wattage: 90, socket: "LGA1700", chipset: "Z790", ramType: "DDR5" },

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
    { id: "ssd1", name: "Samsung 980 Pro 500GB", price: 70, brand: "Samsung", specs: ["NVMe Gen4", "7000/5000 MB/s", "500GB", "M.2 2280"], performance: 82, wattage: 4, capacity: 500, type: "NVMe 4.0" },
    { id: "ssd2", name: "Samsung 980 Pro 1TB", price: 120, brand: "Samsung", specs: ["NVMe Gen4", "7000/5000 MB/s", "1TB", "M.2 2280"], performance: 85, wattage: 4, capacity: 1000, type: "NVMe 4.0" },
    { id: "ssd3", name: "Samsung 990 Pro 1TB", price: 130, brand: "Samsung", specs: ["NVMe Gen4", "7450/6900 MB/s", "1TB", "M.2 2280"], performance: 90, wattage: 5, capacity: 1000, type: "NVMe 4.0" },
    { id: "ssd4", name: "Samsung 990 Pro 2TB", price: 190, brand: "Samsung", specs: ["NVMe Gen4", "7450/6900 MB/s", "2TB", "M.2 2280"], performance: 92, wattage: 5, capacity: 2000, type: "NVMe 4.0" },
    { id: "ssd5", name: "WD Black SN850X 1TB", price: 110, brand: "Western Digital", specs: ["NVMe Gen4", "7300/6600 MB/s", "1TB", "M.2 2280"], performance: 88, wattage: 4, capacity: 1000, type: "NVMe 4.0" },
    { id: "ssd6", name: "WD Black SN850X 2TB", price: 180, brand: "Western Digital", specs: ["NVMe Gen4", "7300/6600 MB/s", "2TB", "M.2 2280"], performance: 90, wattage: 4, capacity: 2000, type: "NVMe 4.0" },
    { id: "ssd7", name: "Crucial P5 Plus 500GB", price: 60, brand: "Crucial", specs: ["NVMe Gen4", "6600/5000 MB/s", "500GB", "M.2 2280"], performance: 80, wattage: 3, capacity: 500, type: "NVMe 4.0" },
    { id: "ssd8", name: "Crucial P5 Plus 1TB", price: 100, brand: "Crucial", specs: ["NVMe Gen4", "6600/5000 MB/s", "1TB", "M.2 2280"], performance: 82, wattage: 3, capacity: 1000, type: "NVMe 4.0" },

    // PCIe 5.0 NVMe
    { id: "ssd9", name: "Crucial T700 1TB", price: 180, brand: "Crucial", specs: ["NVMe Gen5", "12400/11800 MB/s", "1TB", "M.2 2280"], performance: 95, wattage: 6, capacity: 1000, type: "NVMe 5.0" },
    { id: "ssd10", name: "Crucial T700 2TB", price: 320, brand: "Crucial", specs: ["NVMe Gen5", "12400/11800 MB/s", "2TB", "M.2 2280"], performance: 97, wattage: 6, capacity: 2000, type: "NVMe 5.0" },
    { id: "ssd11", name: "Crucial T705 1TB", price: 220, brand: "Crucial", specs: ["NVMe Gen5", "14100/12600 MB/s", "1TB", "M.2 2280"], performance: 98, wattage: 7, capacity: 1000, type: "NVMe 5.0" },
    { id: "ssd12", name: "Crucial T705 2TB", price: 400, brand: "Crucial", specs: ["NVMe Gen5", "14500/12700 MB/s", "2TB", "M.2 2280"], performance: 100, wattage: 7, capacity: 2000, type: "NVMe 5.0" },
    { id: "ssd13", name: "Samsung 990 EVO 1TB", price: 90, brand: "Samsung", specs: ["NVMe Gen4/5", "5000/4200 MB/s", "1TB", "M.2 2280"], performance: 75, wattage: 4, capacity: 1000, type: "NVMe 4.0" },
    { id: "ssd14", name: "Samsung 990 EVO 2TB", price: 160, brand: "Samsung", specs: ["NVMe Gen4/5", "5000/4200 MB/s", "2TB", "M.2 2280"], performance: 77, wattage: 4, capacity: 2000, type: "NVMe 4.0" },

    // HDD
    { id: "hdd1", name: "Seagate BarraCuda 2TB", price: 60, brand: "Seagate", specs: ["HDD 7200RPM", "SATA 6Gb/s", "2TB", "3.5\""], performance: 40, wattage: 6, capacity: 2000, type: "HDD" },
    { id: "hdd2", name: "Seagate IronWolf 4TB", price: 110, brand: "Seagate", specs: ["HDD 5400RPM", "SATA 6Gb/s", "4TB", "3.5\" NAS"], performance: 42, wattage: 7, capacity: 4000, type: "HDD" },
    { id: "hdd3", name: "Seagate IronWolf 8TB", price: 200, brand: "Seagate", specs: ["HDD 7200RPM", "SATA 6Gb/s", "8TB", "3.5\" NAS"], performance: 45, wattage: 8, capacity: 8000, type: "HDD" },
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

const metaForCategory = (component: Component, category: Category) => {
  switch (category) {
    case "cpu":
      return {
        description: `Ce processeur ${component.brand} délivre un excellent équilibre entre performance et efficacité énergétique.`,
        utility: "Idéal pour le gaming moderne, le multitâche et les applications productives.",
        domain: "Gaming, bureautique, création de contenu.",
      };
    case "gpu":
      return {
        description: `Cette carte graphique ${component.brand} assure des performances fluides en haute résolution.`,
        utility: "Parfaite pour le jeu exigeant et les tâches graphiques intensives.",
        domain: "Gaming, design graphique, montage vidéo.",
      };
    case "motherboard":
      return {
        description: `Cette carte mère ${component.brand} offre une base solide et des options de connectivité complètes.`,
        utility: "Assure la compatibilité et la stabilité de l'ensemble du système.",
        domain: "Toutes configurations PC (gaming, créative, bureautique).",
      };
    case "ram":
      return {
        description: `Ce kit mémoire ${component.brand} assure un multitâche fluide et des temps de chargement réduits.`,
        utility: "Augmente la réactivité du système et la stabilité des applications lourdes.",
        domain: "Gaming, productivité, création de contenu.",
      };
    case "storage":
      return {
        description: `Ce support ${component.brand} combine vitesse et fiabilité pour vos données.`,
        utility: "Idéal pour héberger l'OS, les jeux ou des bibliothèques volumineuses.",
        domain: "Gaming, stockage, workflows professionnels.",
      };
    case "psu":
      return {
        description: `Cette alimentation ${component.brand} fournit une énergie stable et silencieuse à vos composants.`,
        utility: "Protège votre configuration et assure une marge d'évolution.",
        domain: "Toutes configurations PC.",
      };
    default:
      return {
        description: "",
        utility: "",
        domain: "",
      };
  }
};

const decorateComponent = (component: Component, category: Category): ComponentWithDetails => {
  const meta = metaForCategory(component, category);
  return {
    ...component,
    specs: [...component.specs],
    category,
    rating: 4.6,
    stock: true,
    description: meta.description,
    utility: meta.utility,
    domain: meta.domain,
  };
};

const componentsByCategory = Object.entries(baseComponents).reduce<Record<Category, ComponentWithDetails[]>>(
  (acc, [category, list]) => {
    acc[category as Category] = list.map((component) => decorateComponent(component, category as Category));
    return acc;
  },
  {
    cpu: [],
    gpu: [],
    motherboard: [],
    ram: [],
    storage: [],
    psu: [],
  },
);

const cloneComponent = (component: ComponentWithDetails): ComponentWithDetails => ({
  ...component,
  specs: [...component.specs],
});

export function getComponentsWithDetails(category?: Category): ComponentWithDetails[] {
  if (!category) {
    return Object.values(componentsByCategory).flatMap((items) => items.map(cloneComponent));
  }
  return (componentsByCategory[category] ?? []).map(cloneComponent);
}

export { componentsByCategory };
