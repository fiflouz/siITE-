const EBAY_TOKEN = process.env.EBAY_TOKEN || null;
const FILTER = 'filter=conditionIds:{1000},priceCurrency:EUR'; // 1000 = New

export async function ebayOffers({ ean, mpn, q }) {
  if (!EBAY_TOKEN) return [];
  const query = ean ? `gtin:${ean}` : (mpn ? `mpn:${mpn}` : (q || ''));
  if (!query) return [];
  const url = `https://api.ebay.com/buy/browse/v1/item_summary/search?q=${encodeURIComponent(query)}&${FILTER}&limit=10`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${EBAY_TOKEN}`,
      'X-EBAY-C-MARKETPLACE-ID': 'EBAY_FR'
    }
  });
  if (!res.ok) return [];
  const data = await res.json();
  const items = data.itemSummaries || [];
  return items
    .map(it => ({
      productId: ean || mpn || it.itemId,
      vendor: 'ebay-fr',
      price: parseFloat(it.price?.value),
      currency: 'EUR',
      inStock: it?.availabilityStatus !== 'OUT_OF_STOCK',
      url: it.itemWebUrl,
      collectedAt: new Date().toISOString(),
      condition: 'new'
    }))
    .filter(o => o.inStock && Number.isFinite(o.price));
}
