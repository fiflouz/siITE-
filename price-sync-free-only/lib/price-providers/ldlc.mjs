import { withBrowser, extractPrice, isNewText, getJsonLd } from '../scraping-utils.mjs';

export async function ldlcOffers({ q, ean }) {
  const search = ean || q;
  if (!search) return [];
  return withBrowser(async (page) => {
    await page.goto(`https://www.ldlc.com/recherche/${encodeURIComponent(search)}/`, { waitUntil: 'domcontentloaded' });
    const first = page.locator('.listing-product .title-3 a, .pdt-item .title-3 a').first();
    if (!await first.count()) return [];
    const href = await first.getAttribute('href');
    if (!href) return [];
    const url = new URL(href, 'https://www.ldlc.com').toString();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const body = await page.locator('body').innerText().catch(()=>'');
    if (!isNewText(body)) return [];

    const ld = await getJsonLd(page);
    let price = null, inStock = false;
    for (const blk of ld) {
      const offers = blk?.offers || blk?.offer;
      if (offers) {
        const arr = Array.isArray(offers) ? offers : [offers];
        const good = arr.find(x => (x?.availability || '').toLowerCase().includes('instock'));
        if (good?.price) price = parseFloat(good.price);
        inStock = !!good;
        break;
      }
    }
    if (!price) {
      const ptxt = await page.locator('.price, .salePrice, [data-qa="price"]').first().innerText().catch(()=>'');
      price = extractPrice(ptxt || body);
    }
    if (!inStock) inStock = /en stock|expédié|disponible|en magasin/i.test(body);

    if (!price || !inStock) return [];
    return [{
      productId: search, vendor: 'ldlc', price, currency: 'EUR', inStock,
      url, collectedAt: new Date().toISOString(), condition: 'new'
    }];
  });
}
