# Guide : Comment trouver les EAN/MPN des produits

## 📋 Qu'est-ce que c'est ?

- **EAN** (European Article Number) : Code-barres à 13 chiffres, standard européen
- **MPN** (Manufacturer Part Number) : Référence constructeur unique

## 🎯 Pourquoi c'est important ?

Les scrapers utilisent ces codes pour trouver **exactement** le bon produit :
- **Sans EAN/MPN** : Recherche par nom → peut trouver des variantes différentes
- **Avec EAN/MPN** : Recherche précise → trouve le produit exact

## 🔍 Où trouver les codes ?

### 1. Sites officiels des constructeurs

#### Pour les CPUs Intel
```
https://ark.intel.com/
Exemple: Intel i9-13900K
→ MPN: BX8071513900K
```

#### Pour les CPUs AMD
```
https://www.amd.com/en/products/processors/
Exemple: Ryzen 9 7950X
→ MPN: 100-100000514WOF
```

#### Pour les GPUs Nvidia
```
Site officiel ou page produit
Exemple: RTX 4090 Founders Edition
→ EAN: Varie selon la marque (MSI, ASUS, etc.)
```

#### Pour les SSDs Samsung
```
https://www.samsung.com/us/computing/memory-storage/
Exemple: 990 Pro 1TB
→ MPN: MZ-V9P1T0BW
→ EAN: 8806094638707
```

### 2. Sites e-commerce

#### LDLC.com
1. Chercher le produit
2. Descendre jusqu'à "Caractéristiques"
3. Chercher "Code EAN" ou "Référence fabricant"

#### Amazon.fr
1. Aller sur la page produit
2. Descendre jusqu'à "Informations sur le produit"
3. Chercher "Numéro de modèle" (MPN) et "EAN"

#### Materiel.net / TopAchat
1. Page produit
2. Section "Références"
3. EAN et Référence fabricant

### 3. Bases de données produits

#### EAN Search
```
https://www.ean-search.org/
→ Chercher par nom de produit
→ Obtenir EAN + informations détaillées
```

#### UPC Database
```
https://www.upcitemdb.com/
→ Base de données mondiale
→ Recherche par nom ou code
```

## 📝 Format du fichier product_ids.json

### Format minimal (recommandé pour commencer)
```json
{
  "samsung-990-pro-1tb": {
    "query": "Samsung 990 Pro 1TB"
  }
}
```

### Format complet (idéal)
```json
{
  "samsung-990-pro-1tb": {
    "ean": "8806094638707",
    "mpn": "MZ-V9P1T0BW",
    "query": "Samsung 990 Pro 1TB NVMe PCIe 4.0",
    "brand": "Samsung",
    "model": "990 Pro",
    "category": "ssd"
  }
}
```

## 🚀 Méthode recommandée

### Étape 1 : Commencer simple
```bash
# Générer automatiquement avec les noms de produits
cd price-sync-free-only
node scripts/generate-product-ids.mjs
```

Cela crée un fichier avec juste les `query` (recherche par nom).

### Étape 2 : Ajouter les codes progressivement
Pour les produits **les plus populaires** (top 20), ajoutez manuellement les EAN/MPN :

1. Ouvrir `data/product_ids.json`
2. Pour chaque produit important, chercher son EAN/MPN
3. Ajouter les champs :

```json
{
  "intel-i9-13900k": {
    "mpn": "BX8071513900K",  // ← Ajouté manuellement
    "query": "Intel Core i9-13900K",
    "category": "cpu"
  }
}
```

### Étape 3 : Tester
```bash
# Tester le scraping sur quelques produits
node scripts/refresh-prices.mjs
```

Vérifier dans `data/price_history.json` si les prix ont été trouvés.

## 📊 Priorités par catégorie

### CPUs (Haute priorité - beaucoup de variantes)
✅ **DOIT avoir MPN** pour éviter les confusions Intel/AMD
- Intel : Commence par "BX80" généralement
- AMD : Commence par "100-" généralement

### GPUs (Priorité moyenne - mais importantes!)
⚠️ **Attention** : Beaucoup de marques (MSI, ASUS, Gigabyte...)
- Utiliser le nom complet avec marque : "MSI GeForce RTX 4070 Gaming X Trio"
- Ou chercher l'EAN de la version spécifique

### SSDs (Haute priorité - capacités multiples)
✅ **DOIT préciser la capacité** : "1TB" vs "2TB"
- Samsung, WD, Crucial : MPN faciles à trouver
- Exemple: Samsung 990 Pro existe en 500GB, 1TB, 2TB

### RAM (Moyenne priorité)
⚠️ **Préciser** : Type (DDR4/DDR5), capacité, fréquence
- Exemple: "Corsair Vengeance DDR5 32GB 6000MHz CL36"

## 🎯 Exemples concrets

### Bon ✅
```json
{
  "intel-i9-13900k": {
    "mpn": "BX8071513900K",
    "query": "Intel Core i9-13900K"
  }
}
```
→ Trouvera **exactement** le i9-13900K

### Moyen ⚠️
```json
{
  "intel-i9-13900k": {
    "query": "Intel i9-13900K"
  }
}
```
→ Peut confondre avec d'autres variantes

### Mauvais ❌
```json
{
  "intel-i9-13900k": {
    "query": "Intel i9"
  }
}
```
→ Trop vague, trouvera plein de produits différents

## 🔧 Outils en ligne recommandés

1. **EAN-Search.org** - Recherche EAN gratuite
2. **UPCItemDB.com** - Base mondiale
3. **Sites officiels constructeurs** - Source fiable
4. **Amazon API** (si vous avez accès) - Données structurées

## 📚 Ressources

### CPUs
- Intel ARK: https://ark.intel.com/
- AMD Products: https://www.amd.com/en/products/processors

### GPUs
- Nvidia: https://www.nvidia.com/fr-fr/geforce/
- AMD: https://www.amd.com/en/products/graphics

### SSDs
- Samsung: https://www.samsung.com/fr/memory-storage/
- Western Digital: https://www.westerndigital.com/
- Crucial: https://www.crucial.com/

### RAM
- Corsair: https://www.corsair.com/us/en/memory
- G.Skill: https://www.gskill.com/
- Kingston: https://www.kingston.com/

## ⚡ Conseil Pro

**Commencez avec les 10-20 produits les plus vendus !**

1. Lancez le générateur automatique
2. Identifiez les top produits (RTX 4090, i9-13900K, etc.)
3. Cherchez leurs EAN/MPN
4. Ajoutez-les manuellement
5. Le reste peut rester avec des `query` simples

Cela donne 80% de précision avec 20% d'effort ! 🎯
