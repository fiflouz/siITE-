import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { collectNewOnly } from '../lib/aggregate.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const masterPath = path.join(ROOT, 'data', 'catalogue_2021_2025_master.json');
const idsPath    = path.join(ROOT, 'data', 'product_ids.json');
const histPath   = path.join(ROOT, 'data', 'price_history.json');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function median(vals) {
  const a = vals.slice().sort((x,y)=>x-y);
  const n = a.length;
  if (!n) return null;
  const mid = Math.floor(n/2);
  return n % 2 ? a[mid] : (a[mid-1] + a[mid]) / 2;
}

function isOutlier(price, hist) {
  if (!hist || hist.length < 3) return false;
  const recent = hist.slice(-20).map(x => x.price).filter(Number.isFinite);
  if (recent.length < 3) return false;
  const m = median(recent);
  if (!m) return false;
  return price < m*0.75 || price > m*1.25;
}

async function main() {
  const master = JSON.parse(fs.readFileSync(masterPath, 'utf-8'));
  const idsMap = JSON.parse(fs.readFileSync(idsPath, 'utf-8'));
  const history = fs.existsSync(histPath) ? JSON.parse(fs.readFileSync(histPath, 'utf-8')) : {};

  const cats = master.categories;
  const all = [
    ...cats.cpus, ...cats.gpus, ...cats.ssds, ...cats.memory_kits, ...cats.chipsets
  ];

  let updates = 0;
  for (const p of all) {
    const ident = idsMap[p.id];
    if (!ident) continue;

    const { offers, best } = await collectNewOnly(ident);
    if (!offers.length || !best) { await sleep(1500 + Math.floor(Math.random()*500)); continue; }

    // Outlier guard using local history
    const hist = history[p.id] || [];
    if (isOutlier(best.price, hist)) {
      console.log('⚠️  Outlier ignored for', p.id, best.price);
    } else {
      p.current_price_eur = best.price;
      p.last_price_seen_at = new Date().toISOString();
      p.best_offer = { vendor: best.vendor, price: best.price, url: best.url, currency: best.currency };
      // push to history
      hist.push({ ts: Date.now(), price: best.price });
      history[p.id] = hist.slice(-200); // keep last 200
      updates++;
    }

    await sleep(1500 + Math.floor(Math.random()*500)); // throttle + jitter
  }

  // persist files
  fs.writeFileSync(masterPath, JSON.stringify(master, null, 2));
  fs.writeFileSync(histPath, JSON.stringify(history, null, 2));
  console.log(`Done. Updated: ${updates}`);
}

main().catch(e => { console.error(e); process.exit(1); });
