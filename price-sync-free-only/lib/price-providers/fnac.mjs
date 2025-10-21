import { withBrowser, extractPrice, isNewText, getJsonLd } from '../scraping-utils.mjs';

export async function fnacOffers({ q, ean }) {
  const search = ean || q;
  if (!search) return [];
  return withBrowser(async (page) => {
    await page.goto(`https://www.fnac.com/SearchResult/ResultList.aspx?Search=${encodeURIComponent(search)}`, { waitUntil: 'domcontentloaded' });
    const first = page.locator('a[fna\\:type="ProductModel"]').first();
    if (!await first.count()) return [];
    const href = await first.getAttribute('href');
    if (!href) return [];
    const url = href.startsWith('http') ? href : `https://www.fnac.com${href}`;
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const body = await page.locator('body').innerText().catch(()=>'');
    if (!isNewText(body)) return [];

    const ld = await getJsonLd(page);
    let price = null, inStock = false;
    for (const blk of ld) {
      const offers = blk?.offers;
      if (offers) {
        const arr = Array.isArray(offers) ? offers : [offers];
        const good = arr.find(x => (x?.availability || '').toLowerCase().includes('instock') && !/occasion|recond/i.test(JSON.stringify(x).toLowerCase()));
        if (good?.price) price = parseFloat(good.price);
        inStock = !!good;
        break;
      }
    }
    if (!price) {
      const ptxt = await page.locator('[data-test="price"], .f-priceBox-price, .f-priceBox__price').first().innerText().catch(()=>'');
      price = extractPrice(ptxt || body);
    }
    if (!inStock) inStock = /en stock|expédié|disponible/i.test(body);

    if (!price || !inStock) return [];
    return [{
      productId: search, vendor: 'fnac', price, currency: 'EUR', inStock,
      url, collectedAt: new Date().toISOString(), condition: 'new'
    }];
  });
}
