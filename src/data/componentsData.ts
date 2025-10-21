import catalogue from "./catalogue_2021_2025_master.json";
import type { Category } from "./catalogueTypes";

// Type intermédiaire pour les composants transformés (format unifié)
export interface MappedComponent {
	id: string;
	name: string;
	price: number;
	brand: string;
	specs: string[];
	performance: number;
	model?: string;
}

// Regroupe les composants par catégorie (clé = nom de la catégorie)
function mapCPU(cpu: any): MappedComponent {
	return {
		id: cpu.id,
		name: cpu.model ?? cpu.id,
		price: typeof cpu.current_price_2025_usd === "number" ? cpu.current_price_2025_usd : (typeof cpu.launch_price_usd === "number" ? cpu.launch_price_usd : 0),
		brand: cpu.brand ?? "",
		model: cpu.model,
		specs: [
			cpu.family,
			cpu.architecture,
			`${cpu.cores_p ?? 0}P/${cpu.cores_e ?? 0}E/${cpu.threads ?? 0}T`,
			`${cpu.base_clock_GHz ?? ""}GHz/${cpu.boost_clock_GHz ?? ""}GHz`,
			cpu.socket,
			cpu.platform
		].filter(Boolean) as string[],
		performance: typeof cpu.performance === "number" ? cpu.performance : 50
	};
}

export const componentsByCategory: Record<Category, MappedComponent[]> = {
	cpu: catalogue.categories.cpus.map(mapCPU),
	gpu: [], // à compléter
	ram: [], // à compléter
	ssd: [], // à compléter
	chipset: [], // à compléter
};
