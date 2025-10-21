import { chromium } from 'playwright';

export async function withBrowser(fn) {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118 Safari/537.36',
    locale: 'fr-FR'
  });
  const page = await context.newPage();
  page.setDefaultTimeout(30000);

  try {
    const res = await fn(page);
    await browser.close();
    return res;
  } catch (e) {
    await browser.close();
    return [];
  }
}

export function extractPrice(text) {
  if (!text) return null;
  const cleaned = text.replace(/\u202f|\xa0/g, ' ');
  // match formats like "1 299,99 €" or "1299.99 €"
  const m = cleaned.match(/(\d{1,3}(?:[\s\.,]\d{3})*|\d+)([\.,]\d{2})?\s*€/);
  if (!m) return null;
  const intPart = m[1].replace(/[\s\.]/g, '');
  const decPart = (m[2] || ',00').replace(',', '.');
  return parseFloat(intPart + decPart);
}

export function isNewText(s) {
  const t = (s || '').toLowerCase();
  if (/(reconditionn|occasion|used|refurb|2nde main|second hand)/.test(t)) return false;
  return true;
}

export async function getJsonLd(page) {
  const handles = await page.locator('script[type="application/ld+json"]').all();
  const blocks = [];
  for (const h of handles) {
    try {
      const raw = await h.textContent();
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      blocks.push(parsed);
    } catch {}
  }
  return blocks;
}
