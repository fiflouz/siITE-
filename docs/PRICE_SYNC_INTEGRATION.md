# Intégration Price Sync

Ce projet intègre le système **price-sync-free-only** pour récupérer et afficher les prix en temps réel des composants PC.

## 📁 Structure

```
siITE-/
├── price-sync-free-only/        # Système de scraping de prix (Node.js)
│   ├── lib/                     # Providers de prix (LDLC, TopAchat, etc.)
│   ├── scripts/                 # Script de mise à jour des prix
│   └── data/                    # Données de prix et historique
│
├── src/
│   ├── utils/
│   │   └── priceSync.ts        # Utilitaires TypeScript pour React
│   ├── hooks/
│   │   └── usePrice.ts         # Hook React pour les prix
│   └── components/
│       ├── PriceBadge.tsx      # Badge de prix avec trend
│       └── ComponentCard.tsx   # Carte de composant avec prix en temps réel
```

## 🚀 Utilisation

### 1. Mise à jour des prix (backend)

```bash
cd price-sync-free-only
npm install
npm run pw:install
node scripts/refresh-prices.mjs
```

Cela va :
- Scraper les prix depuis LDLC, TopAchat, Materiel.net, Fnac, Darty, Cdiscount
- Détecter et filtrer les outliers (±25% de la médiane)
- Mettre à jour `data/catalogue_2021_2025_master.json`
- Sauvegarder l'historique dans `data/price_history.json`

### 2. Utilisation dans React (frontend)

#### Hook `usePrice`

```typescript
import { usePrice } from '../hooks/usePrice';

function MyComponent() {
  const price = usePrice('cpu-intel-i9-13900k');
  
  return (
    <div>
      <p>Prix actuel: {price.formattedPrice}</p>
      <p>Trend: {price.trend} ({price.trendPercent}%)</p>
      <p>Min: {price.minPrice}€ | Max: {price.maxPrice}€</p>
    </div>
  );
}
```

#### Composant `PriceBadge`

```typescript
import { PriceBadge } from '../components/PriceBadge';

<PriceBadge 
  componentId="cpu-intel-i9-13900k"
  showTrend={true}
  showHistory={true}
/>
```

#### Composant `ComponentCard`

```typescript
import { ComponentCard } from '../components/ComponentCard';

<ComponentCard 
  item={component}
  onPick={(item) => console.log('Selected:', item)}
/>
```

## 🔄 Automatisation

### GitHub Actions (Recommandé)

Créer `.github/workflows/update-prices.yml` :

```yaml
name: Update Prices

on:
  schedule:
    - cron: '0 */6 * * *'  # Toutes les 6 heures
  workflow_dispatch:  # Manuel

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      
      - name: Install dependencies
        run: |
          cd price-sync-free-only
          npm ci
          npx playwright install --with-deps chromium
      
      - name: Update prices
        run: |
          cd price-sync-free-only
          node scripts/refresh-prices.mjs
      
      - name: Commit changes
        run: |
          git config --global user.name 'Price Sync Bot'
          git config --global user.email 'bot@siite.com'
          git add price-sync-free-only/data/
          git commit -m "🤖 Mise à jour automatique des prix" || exit 0
          git push
```

### Cron local (Alternative)

```bash
# Ajouter au crontab
crontab -e

# Toutes les 6 heures
0 */6 * * * cd /path/to/siITE-/price-sync-free-only && node scripts/refresh-prices.mjs
```

## 📊 Fonctionnalités

### Détection d'outliers
Les prix anormaux (±25% de la médiane sur 7 jours) sont automatiquement rejetés pour éviter les erreurs.

### Historique de prix
Jusqu'à 200 relevés par composant sont conservés dans `price_history.json` pour :
- Calculer les tendances
- Afficher des graphiques
- Détecter les meilleures opportunités

### Throttling intelligent
Délai de 1.5s + jitter aléatoire entre chaque scraping pour rester respectueux.

### Multi-sources
- LDLC
- TopAchat  
- Materiel.net
- Fnac
- Darty
- Cdiscount
- eBay (optionnel, nécessite API token)

## 🎨 Personnalisation

### Modifier les seuils d'outlier

Dans `scripts/refresh-prices.mjs` :

```javascript
// Actuellement: ±25%
if (price < median * 0.75 || price > median * 1.25) {
  // Changer à ±30%
  if (price < median * 0.70 || price > median * 1.30) {
```

### Ajouter un nouveau provider

1. Créer `lib/price-providers/monsite.mjs`
2. Exporter une fonction `fetchPrices(query)`
3. Ajouter dans `lib/aggregate.mjs`

## ⚠️ Légal

- Respectez les `robots.txt` des sites
- Utilisez des User-Agents appropriés
- Considérez les flux d'affiliation (légal et gratuit)
- Ne surchargez pas les serveurs (throttling)

## 🔧 Debugging

### Vérifier les prix chargés

```typescript
import { getPriceStats } from '../utils/priceSync';

const stats = getPriceStats('cpu-intel-i9-13900k');
console.log(stats);
```

### Tester un scraper

```bash
cd price-sync-free-only
node -e "import('./lib/price-providers/ldlc.mjs').then(m => m.fetchPrices('Intel i9-13900K')).then(console.log)"
```

## 📝 TODO

- [ ] Ajouter GPU, RAM, SSD, Chipset dans `product_ids.json`
- [ ] Configurer GitHub Actions pour l'automatisation
- [ ] Ajouter des graphiques de prix dans l'UI
- [ ] Implémenter des alertes de baisse de prix
- [ ] Ajouter la comparaison de prix entre marchands

## 🤝 Contribution

Le système price-sync est modulaire. Pour ajouter une fonctionnalité :
1. Backend (scraping) : Modifier `price-sync-free-only/`
2. Frontend (affichage) : Modifier `src/utils/priceSync.ts` et les composants React
