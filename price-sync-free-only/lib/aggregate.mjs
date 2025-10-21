import { ebayOffers } from './price-providers/ebay.mjs';
import { ldlcOffers } from './price-providers/ldlc.mjs';
import { topAchatOffers } from './price-providers/topachat.mjs';
import { materielNetOffers } from './price-providers/materielnet.mjs';
import { fnacOffers } from './price-providers/fnac.mjs';
import { dartyOffers } from './price-providers/darty.mjs';
import { cdiscountOffers } from './price-providers/cdiscount.mjs';

const SCRAPERS = [ldlcOffers, topAchatOffers, materielNetOffers, fnacOffers, dartyOffers, cdiscountOffers];

export async function collectNewOnly(ident) {
  const calls = [
    ebayOffers(ident),
    ...SCRAPERS.map(fn => fn(ident))
  ];
  const results = await Promise.allSettled(calls);

  const offers = [];
  for (const r of results) if (r.status === 'fulfilled' && Array.isArray(r.value)) offers.push(...r.value);

  const fresh = offers.filter(o => o.condition === 'new' && o.inStock);
  fresh.sort((a,b) => a.price - b.price);
  return { offers: fresh, best: fresh[0] || null };
}
