import { withBrowser, extractPrice, isNewText, getJsonLd } from '../scraping-utils.mjs';

export async function cdiscountOffers({ q, ean }) {
  const search = ean || q;
  if (!search) return [];
  return withBrowser(async (page) => {
    await page.goto(`https://www.cdiscount.com/search/10/${encodeURIComponent(search)}.html`, { waitUntil: 'domcontentloaded' });
    const first = page.locator('a.jsPrdtBILA').first();
    if (!await first.count()) return [];
    const href = await first.getAttribute('href');
    if (!href) return [];
    const url = href.startsWith('http') ? href : `https:${href}`;
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const body = await page.locator('body').innerText().catch(()=>'');
    if (!isNewText(body)) return [];

    const ld = await getJsonLd(page);
    let price = null, inStock = false;
    for (const blk of ld) {
      const offers = blk?.offers;
      if (offers) {
        const arr = Array.isArray(offers) ? offers : [offers];
        const good = arr.find(x => (x?.availability || '').toLowerCase().includes('instock') && /new/i.test(JSON.stringify(x)));
        if (good?.price) price = parseFloat(good.price);
        inStock = !!good;
        break;
      }
    }
    if (!price) {
      const ptxt = await page.locator('.fpPrice, .price, .prdtPrice').first().innerText().catch(()=>'');
      price = extractPrice(ptxt || body);
    }
    if (!inStock) inStock = /en stock|expédié|disponible/i.test(body);

    if (!price || !inStock) return [];
    return [{
      productId: search, vendor: 'cdiscount', price, currency: 'EUR', inStock,
      url, collectedAt: new Date().toISOString(), condition: 'new'
    }];
  });
}
