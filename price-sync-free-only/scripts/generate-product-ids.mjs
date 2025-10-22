#!/usr/bin/env node

/**
 * Script pour générer product_ids.json à partir du catalogue
 * Extrait les informations des composants et crée des requêtes de recherche optimisées
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cataloguePath = path.join(__dirname, '../src/data/catalogue_2021_2025_master.json');
const outputPath = path.join(__dirname, '../price-sync-free-only/data/product_ids.json');

// Charger le catalogue
const catalogue = JSON.parse(fs.readFileSync(cataloguePath, 'utf-8'));

const productIds = {};

// ========== CPUs ==========
console.log('🔲 Traitement des CPUs...');
let cpuCount = 0;
for (const cpu of catalogue.categories.cpus.slice(0, 20)) { // Limiter à 20 pour commencer
  const query = `${cpu.brand} ${cpu.model}`.trim();
  productIds[cpu.id] = {
    query,
    brand: cpu.brand,
    model: cpu.model,
    category: 'cpu'
  };
  cpuCount++;
}
console.log(`✅ ${cpuCount} CPUs ajoutés`);

// ========== GPUs ==========
console.log('🎮 Traitement des GPUs...');
let gpuCount = 0;
for (const gpu of catalogue.categories.gpus.slice(0, 20)) { // Limiter à 20 pour commencer
  const query = `${gpu.brand} ${gpu.model}`.trim();
  productIds[gpu.id] = {
    query,
    brand: gpu.brand,
    model: gpu.model,
    vram: `${gpu.vram_GB}GB`,
    category: 'gpu'
  };
  gpuCount++;
}
console.log(`✅ ${gpuCount} GPUs ajoutés`);

// ========== SSDs ==========
console.log('💾 Traitement des SSDs...');
let ssdCount = 0;
for (const ssd of catalogue.categories.ssds.slice(0, 15)) { // Limiter à 15
  const query = `${ssd.brand} ${ssd.model}`.trim();
  productIds[ssd.id] = {
    query,
    brand: ssd.brand,
    model: ssd.model,
    interface: ssd.interface,
    category: 'ssd'
  };
  ssdCount++;
}
console.log(`✅ ${ssdCount} SSDs ajoutés`);

// ========== Memory Kits (RAM) ==========
console.log('🎯 Traitement de la RAM...');
let ramCount = 0;
for (const ram of catalogue.categories.memory_kits.slice(0, 15)) { // Limiter à 15
  const query = `${ram.brand} ${ram.model}`.trim();
  productIds[ram.id] = {
    query,
    brand: ram.brand,
    model: ram.model,
    type: ram.type,
    capacity: `${ram.capacity_gb}GB`,
    speed: `${ram.speed_mt_s}MHz`,
    category: 'ram'
  };
  ramCount++;
}
console.log(`✅ ${ramCount} RAM kits ajoutés`);

// Sauvegarder le fichier
fs.writeFileSync(outputPath, JSON.stringify(productIds, null, 2));

console.log('\n📊 Résumé :');
console.log(`  - Total: ${Object.keys(productIds).length} produits`);
console.log(`  - CPUs: ${cpuCount}`);
console.log(`  - GPUs: ${gpuCount}`);
console.log(`  - SSDs: ${ssdCount}`);
console.log(`  - RAM: ${ramCount}`);
console.log(`\n✅ Fichier généré : ${outputPath}`);
console.log('\n💡 Prochaine étape :');
console.log('   cd price-sync-free-only && node scripts/refresh-prices.mjs');
