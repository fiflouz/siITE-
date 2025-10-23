import { Cpu, Gauge, HardDrive, MemoryStick, Power, Zap } from "lucide-react";
import type { ComponentWithDetails } from "../../data/componentsData";
import type { ElementType } from "react";

export type BetterDirection = "higher" | "lower" | "neutral";

export interface SpecRow {
  key: string;
  label: string;
  unit?: string;
  better?: BetterDirection;
  tooltip?: string;
  getValue: (component: ComponentWithDetails) => number | string | null | undefined;
  format?: (value: unknown) => string;
}

export interface SpecGroup {
  title: string;
  icon: ElementType;
  rows: SpecRow[];
}

const pricePerPerf = (component: ComponentWithDetails) => {
  if (!component.performance || !component.price) return null;
  if (component.performance <= 0) return null;
  return component.price / component.performance;
};

const formatNumber = (value: unknown, fractionDigits = 0) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return value.toLocaleString("fr-FR", { minimumFractionDigits: fractionDigits, maximumFractionDigits: fractionDigits });
};

const formatPrice = (value: unknown) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "—";
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
};

export const SPEC_MAP: Record<string, SpecGroup[]> = {
  cpu: [
    {
      title: "Clés CPU",
      icon: Cpu,
      rows: [
        {
          key: "socket",
          label: "Socket",
          getValue: (c) => c.socket ?? extractFromSpecs(c, ["LGA", "AM", "TR"], "—"),
        },
        {
          key: "generation",
          label: "Génération",
          getValue: (c) => c.generation ?? firstSpecContaining(c, "Gen"),
        },
        {
          key: "perf",
          label: "Score perf",
          better: "higher",
          getValue: (c) => c.performance ?? null,
          format: (v) => formatNumber(v, 0),
        },
        {
          key: "price",
          label: "Prix moyen",
          better: "lower",
          getValue: (c) => c.price ?? null,
          format: formatPrice,
        },
      ],
    },
    {
      title: "Compat & mémoire",
      icon: MemoryStick,
      rows: [
        {
          key: "ramType",
          label: "Type RAM",
          getValue: (c) => c.ramType ?? firstSpecContaining(c, "DDR"),
        },
        {
          key: "chipset",
          label: "Chipset recommandé",
          getValue: (c) => c.chipset ?? undefined,
        },
      ],
    },
    {
      title: "Énergie",
      icon: Zap,
      rows: [
        {
          key: "wattage",
          label: "TDP estimé",
          unit: "W",
          better: "lower",
          getValue: (c) => c.wattage ?? null,
        },
        {
          key: "pricePerf",
          label: "€ / point de perf",
          better: "lower",
          tooltip: "Prix divisé par score de performance",
          getValue: pricePerPerf,
          format: (v) => (typeof v === "number" ? `${v.toFixed(2)} €` : "—"),
        },
      ],
    },
  ],
  gpu: [
    {
      title: "Clés GPU",
      icon: Gauge,
      rows: [
        {
          key: "perf",
          label: "Score perf",
          better: "higher",
          getValue: (c) => c.performance ?? null,
          format: (v) => formatNumber(v, 0),
        },
        {
          key: "price",
          label: "Prix moyen",
          better: "lower",
          getValue: (c) => c.price ?? null,
          format: formatPrice,
        },
        {
          key: "vram",
          label: "Mémoire vidéo",
          better: "higher",
          getValue: (c) => firstSpecContaining(c, "GB") ?? null,
        },
      ],
    },
    {
      title: "Énergie",
      icon: Power,
      rows: [
        {
          key: "wattage",
          label: "Consommation",
          unit: "W",
          better: "lower",
          getValue: (c) => c.wattage ?? null,
        },
        {
          key: "pricePerf",
          label: "€ / point de perf",
          better: "lower",
          getValue: pricePerPerf,
          format: (v) => (typeof v === "number" ? `${v.toFixed(2)} €` : "—"),
        },
      ],
    },
  ],
  ram: [
    {
      title: "Mémoire",
      icon: MemoryStick,
      rows: [
        {
          key: "capacity",
          label: "Capacité",
          getValue: (c) => c.capacity ? `${c.capacity} GB` : firstSpecContaining(c, "GB"),
        },
        {
          key: "type",
          label: "Type",
          getValue: (c) => c.type ?? firstSpecContaining(c, "DDR"),
        },
        {
          key: "perf",
          label: "Score perf",
          better: "higher",
          getValue: (c) => c.performance ?? null,
          format: (v) => formatNumber(v, 0),
        },
        {
          key: "price",
          label: "Prix",
          better: "lower",
          getValue: (c) => c.price ?? null,
          format: formatPrice,
        },
      ],
    },
  ],
  storage: [
    {
      title: "Stockage",
      icon: HardDrive,
      rows: [
        {
          key: "capacity",
          label: "Capacité",
          better: "higher",
          getValue: (c) => c.capacity ? `${c.capacity} GB` : firstSpecContaining(c, "TB"),
        },
        {
          key: "type",
          label: "Format",
          getValue: (c) => c.type ?? firstSpecContaining(c, "NVMe"),
        },
        {
          key: "perf",
          label: "Score perf",
          better: "higher",
          getValue: (c) => c.performance ?? null,
          format: (v) => formatNumber(v, 0),
        },
        {
          key: "price",
          label: "Prix",
          better: "lower",
          getValue: (c) => c.price ?? null,
          format: formatPrice,
        },
      ],
    },
  ],
  psu: [
    {
      title: "Alimentation",
      icon: Power,
      rows: [
        {
          key: "power",
          label: "Puissance",
          unit: "W",
          better: "higher",
          getValue: (c) => c.power ?? firstNumberFromSpecs(c),
        },
        {
          key: "type",
          label: "Certification",
          getValue: (c) => firstSpecContaining(c, "Bronze") || firstSpecContaining(c, "Gold") || firstSpecContaining(c, "Platinum"),
        },
        {
          key: "perf",
          label: "Score perf",
          better: "higher",
          getValue: (c) => c.performance ?? null,
          format: (v) => formatNumber(v, 0),
        },
        {
          key: "price",
          label: "Prix",
          better: "lower",
          getValue: (c) => c.price ?? null,
          format: formatPrice,
        },
      ],
    },
  ],
};

export const SUPPORTED_COMPARISON_CATEGORIES = Object.keys(SPEC_MAP);

function firstSpecContaining(component: ComponentWithDetails, needle: string) {
  return component.specs?.find((spec) => spec.toLowerCase().includes(needle.toLowerCase())) ?? null;
}

function extractFromSpecs(component: ComponentWithDetails, needles: string[], fallback: string) {
  const normalized = component.specs?.find((spec) =>
    needles.some((needle) => spec.toLowerCase().includes(needle.toLowerCase()))
  );
  return normalized ?? fallback;
}

function firstNumberFromSpecs(component: ComponentWithDetails) {
  for (const spec of component.specs ?? []) {
    const match = spec.match(/(\d+)/);
    if (match) {
      return Number(match[1]);
    }
  }
  return null;
}
