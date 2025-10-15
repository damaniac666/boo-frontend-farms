import { useCallback, useEffect, useState } from 'react';
import { ScriptBuilder, ContractParameter } from 'phantasma-sdk-ts';
import { useWalletContext } from '../utils/walletContext';
import { api } from '../utils/phantasmaApi';

export interface FeeCollectorStats {
  kcalBurned: number;
  booBurned: number;
  soulRewarded: number;
  summary: string;
}

export function useFeeCollector(
  contractName: string,
  pollInterval: number = 30000
) {
  const { account, connected, easyConnect } = useWalletContext();

  const [stats, setStats] = useState<FeeCollectorStats>({
    kcalBurned: 0,
    booBurned: 0,
    soulRewarded: 0,
    summary: 'Loading...',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  // Contract call wrapper
  const call = useCallback(
    async (method: string, params: ContractParameter[] = []) => {
      if (!account || !easyConnect) {
        setError('Wallet not connected');
        return undefined;
      }

      setLoading(true);
      try {
        const sb = new ScriptBuilder();
        sb.CallContract(contractName, method, params);
        const script = sb.EndScript();

        const payloadMap: Record<string, string> = {
  burn: '426F6F204661726D202D204275726E', // Boo Farm - BURN
};

const payload = payloadMap[method] ?? '426F6F204661726D'; // fallback: Boo Farm

console.log(`[Payload] ${method}:`, Buffer.from(payload, 'hex').toString());

        const result = await new Promise((resolve, reject) => {
          easyConnect.signTransaction(
  script,
  payload,
  (data) => {
    console.log(`📤 Sent ${method} with payload "${payload}":`, data);
    resolve(data);
  },
  (err) => {
    console.error(`[useFeeCollector] ${method} error:`, err);
    reject(err);
  }
);

        });

        return result;
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        return undefined;
      } finally {
        setLoading(false);
      }
    },
    [account, easyConnect, contractName]
  );

  // Stubbed number reader
  const readNumber = useCallback(
    async (method: string): Promise<number> => {
      console.warn(`[readNumber] Skipped call to ${method}`);
      return 0;
    },
    [contractName]
  );

  // Stubbed string reader
  const readString = useCallback(
    async (method: string): Promise<string> => {
      console.warn(`[readString] Skipped call to ${method}`);
      return 'Unavailable';
    },
    [contractName]
  );

  // Stats fetcher
  const fetchStats = useCallback(async () => {
    console.warn('[fetchStats] Skipped stats fetch due to broken invokeRawScript');
    setStats({
      kcalBurned: 0,
      booBurned: 0,
      soulRewarded: 0,
      summary: 'Unavailable',
    });
  }, []);

  // Auto-poll
  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, pollInterval);
    return () => clearInterval(interval);
  }, [fetchStats, pollInterval]);

  // Burn trigger
  const burn = useCallback(async () => {
    const result = await call('burn');
    if (result) {
      setTxHash(result as string);
      setTimeout(fetchStats, 8000);
    }
    return result;
  }, [call, fetchStats]);

  return {
    connected,
    address: account,
    loading,
    error,
    stats,
    burn,
    txHash,
    refresh: fetchStats,
  };
}
