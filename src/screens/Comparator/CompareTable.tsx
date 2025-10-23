import { useMemo } from "react";
import { SPEC_MAP, type SpecGroup } from "./specMap";
import type { ComponentWithDetails } from "../../data/componentsData";
import { Info, Pin } from "lucide-react";

export interface CompareTableProps {
  category: string;
  items: ComponentWithDetails[];
  diffOnly?: boolean;
  pinnedId?: string | null;
  onPin?: (id: string) => void;
  onRemove?: (id: string) => void;
}

const betterScore = (direction: string | undefined, value: number, min: number, max: number) => {
  if (!Number.isFinite(value)) return 0.5;
  if (max === min) return 0.5;
  const ratio = (value - min) / (max - min);
  if (direction === "lower") return 1 - ratio;
  if (direction === "higher") return ratio;
  return 0.5;
};

const heatClass = (score: number) => {
  if (score >= 0.75) return "bg-emerald-500/15 text-emerald-100";
  if (score <= 0.25) return "bg-red-500/10 text-red-100";
  if (score >= 0.55) return "bg-emerald-500/8";
  if (score <= 0.45) return "bg-red-500/6";
  return "bg-white/5";
};

const normalize = (value: unknown): number | null => {
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  const parsed = Number(value);
  if (!Number.isNaN(parsed)) return parsed;
  return null;
};

const formatValue = (raw: unknown, unit?: string) => {
  if (raw === null || raw === undefined || raw === "") return "—";
  if (typeof raw === "number") {
    const formatted = raw % 1 === 0 ? raw.toString() : raw.toFixed(2);
    return unit ? `${formatted} ${unit}` : formatted;
  }
  return unit ? `${raw} ${unit}` : String(raw);
};

export const CompareTable = ({ category, items, diffOnly = false, pinnedId, onPin, onRemove }: CompareTableProps) => {
  const specGroups = SPEC_MAP[category] as SpecGroup[] | undefined;

  const orderedItems = useMemo(() => {
    if (!pinnedId) return items;
    const pinned = items.find((item) => item.id === pinnedId);
    if (!pinned) return items;
    return [pinned, ...items.filter((item) => item.id !== pinnedId)];
  }, [items, pinnedId]);

  const rows = useMemo(() => {
    if (!specGroups) return [];

    return specGroups
      .flatMap((group) =>
        group.rows.map((row) => ({
          group,
          row,
        }))
      )
      .filter(({ row }) => {
        if (!diffOnly) return true;
        const values = orderedItems.map((item) => row.getValue(item));
        const serialized = values.map((v) => JSON.stringify(v));
        return new Set(serialized).size > 1;
      });
  }, [orderedItems, specGroups, diffOnly]);

  if (!specGroups || rows.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-[#111113]/80 p-10 text-center text-sm text-[#A1A1AA]">
        Aucune donnée standardisée pour cette catégorie.
      </div>
    );
  }

  const renderGroupHeading = (group: SpecGroup) => (
    <div className="sticky left-0 z-10 bg-[#0B0B0C]/90 backdrop-blur px-4 py-2 text-xs font-semibold uppercase tracking-widest text-[#6B9CFF]">
      <div className="flex items-center gap-2">
        <group.icon className="h-4 w-4" />
        {group.title}
      </div>
    </div>
  );

  return (
    <div className="overflow-auto rounded-2xl border border-white/10">
      <table className="min-w-full text-sm">
        <thead className="sticky top-0 z-20 backdrop-blur bg-[#08080A]/90">
          <tr className="border-b border-white/10">
            <th className="sticky left-0 z-20 w-56 px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-[#A1A1AA]">
              Spécification
            </th>
            {orderedItems.map((item) => (
              <th
                key={item.id}
                className={`min-w-[220px] px-4 py-3 text-left align-top text-[#F5F5F7] ${
                  pinnedId === item.id ? "ring-1 ring-[#4F8BF7]" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs uppercase tracking-widest text-[#6B9CFF]">{item.brand}</div>
                    <div className="text-base font-semibold leading-snug">{item.name}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {onPin && (
                      <button
                        type="button"
                        onClick={() => onPin(item.id)}
                        className={`rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-wide transition-colors ${
                          pinnedId === item.id
                            ? "bg-[#4F8BF7]/20 text-[#F5F5F7]"
                            : "text-[#A1A1AA] hover:text-white"
                        }`}
                      >
                        {pinnedId === item.id ? <span className="flex items-center gap-1"><Pin className="h-3 w-3" /> Référence</span> : <span className="flex items-center gap-1"><Pin className="h-3 w-3" /> Pin</span>}
                      </button>
                    )}
                    {onRemove && (
                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="rounded-full border border-white/10 px-2 py-1 text-[10px] uppercase tracking-wide text-[#A1A1AA] hover:text-red-400"
                        aria-label={`Retirer ${item.name} de la comparaison`}
                      >
                        Retirer
                      </button>
                    )}
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ group, row }, index) => {
            const values = orderedItems.map((item) => row.getValue(item));
            const numericValues = values.map(normalize).filter((v) => v !== null) as number[];
            const min = numericValues.length ? Math.min(...numericValues) : 0;
            const max = numericValues.length ? Math.max(...numericValues) : 0;

            const previousGroup = index > 0 ? rows[index - 1].group : null;
            const renderHeading = !previousGroup || previousGroup !== group;

            return (
              <tr key={`${group.title}-${row.key}`} className="border-b border-white/10">
                <td className="sticky left-0 z-10 bg-[#0B0B0C]/85 px-4 py-3 align-top text-[#F5F5F7]">
                  {renderHeading && renderGroupHeading(group)}
                  <div className="mt-2 flex items-center gap-2 text-sm font-medium">
                    {row.label}
                    {row.tooltip && (
                      <span
                        className="cursor-help text-[#6B9CFF]"
                        title={row.tooltip}
                      >
                        <Info className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                </td>
                {orderedItems.map((item, idx) => {
                  const rawValue = values[idx];
                  const numeric = normalize(rawValue);
                  const score = numeric !== null ? betterScore(row.better, numeric, min, max) : 0.5;
                  const showHeat = typeof rawValue !== "string" || row.better !== "neutral";
                  const heat = showHeat ? heatClass(score) : "bg-white/5";
                  return (
                    <td key={`${item.id}-${row.key}`} className={`px-4 py-3 align-top text-[#F5F5F7] ${heat} ${pinnedId === item.id ? "ring-1 ring-[#4F8BF7]/40" : ""}`}>
                      {formatValue(row.format ? row.format(rawValue) : rawValue, row.unit)}
                      {row.better && numeric !== null && max !== min && (
                        <div className="mt-1 text-xs text-[#A1A1AA]">
                          {row.better === "higher" ? "Plus élevé est mieux" : "Plus bas est mieux"}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
