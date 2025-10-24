// src/utils/urlState.ts

export type ComponentFilters = {
  q?: string;
  cat?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
};

export function readFiltersFromURL(search: string): ComponentFilters {
  const params = new URLSearchParams(search);
  return {
    q: params.get("q") || undefined,
    cat: params.get("cat") || undefined,
    yearMin: params.get("yearMin") ? Number(params.get("yearMin")) : undefined,
    yearMax: params.get("yearMax") ? Number(params.get("yearMax")) : undefined,
    priceMin: params.get("priceMin") ? Number(params.get("priceMin")) : undefined,
    priceMax: params.get("priceMax") ? Number(params.get("priceMax")) : undefined,
  };
}

export function writeFiltersToURL(filters: ComponentFilters, setSearch: (s: string) => void) {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.cat) params.set("cat", filters.cat);
  if (filters.yearMin !== undefined) params.set("yearMin", String(filters.yearMin));
  if (filters.yearMax !== undefined) params.set("yearMax", String(filters.yearMax));
  if (filters.priceMin !== undefined) params.set("priceMin", String(filters.priceMin));
  if (filters.priceMax !== undefined) params.set("priceMax", String(filters.priceMax));
  setSearch("?" + params.toString());
}
