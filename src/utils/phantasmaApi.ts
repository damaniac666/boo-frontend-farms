import { PhantasmaTS, Account } from 'phantasma-sdk-ts';

     export const api = new PhantasmaTS.PhantasmaAPI(
       "https://devnet.phantasma.info/rpc",
       null,
       "mainnet"
     );

     export const fetchAccount = async (address: string): Promise<Account | null> => {
       try {
         const account = await api.getAccount(address);
         return account;
       } catch (err) {
         console.error('❌ Failed to fetch account:', err);
         return null;
       }
     };

     export const fetchTokenBalance = async (address: string, symbol: string): Promise<number> => {
       const account = await fetchAccount(address);
       if (!account) return 0;

       const token = account.balances.find((b) => b.symbol === symbol);
       const raw = token?.amount || '0';
       return parseFloat(raw) / 1e8;
     };

let lastFetchTime = 0;
let cachedSoulPrice = 0;

export const fetchSoulPrice = async (): Promise<number> => {
  const now = Date.now();

  // Check localStorage cache
  const localPrice = localStorage.getItem('soulPrice');
  const localTime = localStorage.getItem('soulPriceTime');

  if (localPrice && localTime && now - parseInt(localTime) < 3 * 60 * 1000) {
    return parseFloat(localPrice);
  }

  // Throttle in-memory fetches
  if (now - lastFetchTime < 3 * 60 * 1000) {
    return cachedSoulPrice;
  }

  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=phantasma&vs_currencies=usd'
    );
    const data = await response.json();
    const price = data?.phantasma?.usd ?? 0;

    // Update caches
    cachedSoulPrice = price;
    lastFetchTime = now;
    localStorage.setItem('soulPrice', price.toString());
    localStorage.setItem('soulPriceTime', now.toString());

    console.log(`🔄 SOUL price reloaded from CoinGecko: $${price}`);

    return price;
  } catch (err) {
    console.error('❌ Failed to fetch SOUL price:', err);
    return cachedSoulPrice || 0;
  }
};

     export const fetchKCALPrice = async (): Promise<number> => {
       try {
         const soulPrice = await fetchSoulPrice();
         return soulPrice / 89.15275;
       } catch (err) {
         console.error('❌ Failed to fetch KCAL price:', err);
         return 0;
       }
     };

     export const fetchBooPrice = async (): Promise<number> => {
  // For now, reuse soul price until BOO price source is wired
  // const booPrice = await fetchSoulPrice()
   const booPrice = 0.55;
  return booPrice
}

     export const fetchContractBalance = async (address: string, symbol: string): Promise<number> => {
  const url = `https://api-explorer.phantasma.info/api/v1/addresses?address=${address}&with_balance=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const balances = data.addresses?.[0]?.balances ?? [];
    const tokenEntry = balances.find((b: any) => b.token?.symbol === symbol);

    if (!tokenEntry) return 0;

    const raw = tokenEntry.amount_raw;
    const decimals = tokenEntry.token?.decimals ?? 0;

    return Number(raw) / 10 ** decimals;
  } catch (err) {
    console.error('[fetchContractBalance] Failed to fetch:', err);
    return 0;
  }
};

     export const getTokenSupply = async (
       symbol: string
     ): Promise<{ supply: number; burned: number } | null> => {
       try {
         const tokens = await api.getTokens();
         const token = tokens.find((t) => t.symbol === symbol);
         if (!token) {
           console.warn(`⚠️ Token ${symbol} not found`);
           return null;
         }

         const decimals = token.decimals;
         const precision = 10 ** -decimals;

         const supply = parseFloat(token.currentSupply) * precision;
         const burned = parseFloat(token.burnedSupply) * precision;

         return { supply, burned };
       } catch (err) {
         console.error('❌ Failed to fetch token supply:', err);
         return null;
       }
     };