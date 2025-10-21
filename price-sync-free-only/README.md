# Price Sync — FREE ONLY (NEUF)

Stack 100% gratuite : **Scrapers Playwright** (LDLC, TopAchat, Materiel.net, Fnac, Darty, Cdiscount) + **eBay Browse API** (optionnel).
Met à jour `data/catalogue_2021_2025_master.json` et tient un `data/price_history.json` pour filtrer les **outliers**.

## Setup
1) Repo GitHub public → minutes Actions gratuites.
2) (Optionnel) Secrets → Actions : `EBAY_TOKEN` (sinon on scrape only).
3) Édite `data/product_ids.json` (EAN/MPN/query). Plus c’est précis, mieux c’est.
4) Lancement : onglet **Actions** → **Run workflow**, ou attend le cron (toutes les heures).

## Local
```bash
npm i
npm run pw:install
node scripts/refresh-prices.mjs
```

## Détails
- **NEUF uniquement** (heuristiques + JSON-LD). On ignore “occasion/reconditionné”.
- **Anti-outliers**: on rejette les prix ±25% de la médiane locale 7j (via `price_history.json`).
- **Throttle + Jitter** pour rester clean.
- Si un site change son DOM, ajuste les sélecteurs dans `lib/price-providers/*.mjs`.

## Légal
Respecte robots/CGU des marchands. Si ça bloque, demande un **flux affilié** (gratuit une fois accepté) et remplace le scraper par un parser de feed.
