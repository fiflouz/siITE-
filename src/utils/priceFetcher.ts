import { useEffect, useMemo, useState } from "react";

const API_URL = "https://api.florian-mas24.workers.dev/best-prices";
export const fmt = (n:number)=> new Intl.NumberFormat("fr-FR",{style:"currency",currency:"EUR"}).format(n);

export type QuoteInput = {
  meta: any;
  parts: Record<string, string | string[]>;
  hints?: Record<string, string[]>;
};

export type PriceHit = {
  vendor: string;
  url?: string;
  currency: "EUR";
  priceHT: number;
  priceTTC: number;
  shipping?: number;
  inStock?: boolean;
  source: "API" | "JSON-LD" | "Microdata";
};

export type PartResult = {
  kind: string;
  name: string;
  candidates: PriceHit[];
  best?: PriceHit;
};

export type WorkerResp = {
  parts: PartResult[];
  totals: { TTC:number };
  generatedAt: string;
  note: string;
};

export async function fetchBestPrices(parts: Record<string, string | string[]>, hints?: Record<string,string[]>) {
  const r = await fetch(API_URL,{
    method:"POST", headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({ parts, hints })
  });
  if(!r.ok) throw new Error("API prix KO");
  return r.json() as Promise<WorkerResp>;
}
