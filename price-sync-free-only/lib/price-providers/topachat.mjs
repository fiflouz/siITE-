import { withBrowser, extractPrice, isNewText, getJsonLd } from '../scraping-utils.mjs';

export async function topAchatOffers({ q, ean }) {
  const search = ean || q;
  if (!search) return [];
  return withBrowser(async (page) => {
    await page.goto(`https://www.topachat.com/search/produit?search=${encodeURIComponent(search)}`, { waitUntil: 'domcontentloaded' });
    const first = page.locator('a.product__item__link').first();
    if (!await first.count()) return [];
    const href = await first.getAttribute('href');
    if (!href) return [];
    const url = new URL(href, 'https://www.topachat.com').toString();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const body = await page.locator('body').innerText().catch(()=>'');
    if (!isNewText(body)) return [];

    const ld = await getJsonLd(page);
    let price = null, inStock = false;
    for (const blk of ld) {
      const offers = blk?.offers;
      if (offers) {
        const arr = Array.isArray(offers) ? offers : [offers];
        const good = arr.find(x => (x?.availability || '').toLowerCase().includes('instock'));
        if (good?.price) price = parseFloat(good.price);
        inStock = !!good;
        break;
      }
    }
    if (!price) {
      const ptxt = await page.locator('.product__price, .price__current, .price').first().innerText().catch(()=>'');
      price = extractPrice(ptxt || body);
    }
    if (!inStock) inStock = /en stock|expédié|disponible/i.test(body);

    if (!price || !inStock) return [];
    return [{
      productId: search, vendor: 'topachat', price, currency: 'EUR', inStock,
      url, collectedAt: new Date().toISOString(), condition: 'new'
    }];
  });
}
