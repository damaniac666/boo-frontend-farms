import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { fetchTokenBalance } from '../utils/phantasmaApi';

const TOKEN_DECIMALS: Record<string, number> = {
  KCAL: 10,
  SOUL: 8,
  BOO: 10,
};

const useTokenBalance = (symbol: string, account?: string | null) => {
  const [balance, setBalance] = useState(new BigNumber(0));

  useEffect(() => {
    const fetchBalance = async () => {
      if (!account || !symbol) return;

      try {
        const raw = await fetchTokenBalance(account, symbol);
        
const rawBN = new BigNumber(raw.toString().replace('.', '')); // ✅ remove decimal
const decimals = TOKEN_DECIMALS[symbol.toUpperCase()] ?? 10;
const normalized = rawBN.dividedBy(new BigNumber(10).pow(decimals));
setBalance(normalized);
      } catch (err) {
        console.error(`[useTokenBalance] Failed to fetch ${symbol} balance:`, err);
        setBalance(new BigNumber(0));
      }
    };

    fetchBalance();
  }, [symbol, account]);

  return balance;
};

export default useTokenBalance;