export type BetterDirection = "higher" | "lower" | "neutral";

export interface SpecRow<T = unknown> {
  key: string;
  label: string;
  unit?: string;
  better?: BetterDirection;
  derive: (item: T) => number | string | null | undefined;
}

export interface SpecGroup<T = unknown> {
  title: string;
  rows: SpecRow<T>[];
}

/**
 * TODO: Alimenter les groupes avec les vraies specs une fois les données Next branchées.
 */
export const SPEC_MAP: Record<string, SpecGroup<any>[]> = {
  cpu: [
    {
      title: "Caractéristiques principales",
      rows: [
        {
          key: "perf",
          label: "Score perf",
          better: "higher",
          unit: "%",
          derive: () => null,
        },
        {
          key: "tdp",
          label: "TDP",
          unit: "W",
          better: "lower",
          derive: () => null,
        },
      ],
    },
  ],
};
