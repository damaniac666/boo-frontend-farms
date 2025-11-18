import { useEffect, useState } from 'react';
import BigNumber from 'bignumber.js';
import { fetchTokenBalance } from '../utils/phantasmaApi';

// Define the expected shape of the API response
interface TokenBalanceResponse {
  chain: string;
  amount: string;        // integer string (no decimal)
  symbol: string;
  decimals: number;      // this is what we need!
}

const useTokenBalance = (symbol: string, account?: string | null) => {
  const [balance, setBalance] = useState<BigNumber>(new BigNumber(0));

  useEffect(() => {
    const fetchBalance = async () => {
      if (!account || !symbol) {
        setBalance(new BigNumber(0));
        return;
      }

      try {
        const raw: TokenBalanceResponse = await fetchTokenBalance(account, symbol);

        if (!raw || !raw.amount) {
          setBalance(new BigNumber(0));
          return;
        }

        const amountBN = new BigNumber(raw.amount);
        const decimals = raw.decimals ?? 10; // fallback just in case

        const normalized = amountBN.dividedBy(new BigNumber(10).pow(decimals));
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