import { useCallback, useState } from 'react';
     import { ScriptBuilder, ContractParameter } from 'phantasma-sdk-ts';
     import { useWalletContext } from '../../utils/walletContext';
     import { api } from '../../utils/phantasmaApi';

     export interface MasterChefConfig {
       contractName: string;
       nexus: string;
     }

     export interface UseMasterChefV2 {
       connected: boolean;
       address: string | null;
       loading: boolean;
       error: string | null;
       deposit: (pid: number, amount: number) => Promise<void>;
       withdraw: (pid: number, amount: number) => Promise<void>;
       emergencyWithdraw: (pid: number) => Promise<void>;
       checkIn: (pid: number) => Promise<void>;
       checkOut: (pid: number) => Promise<void>;
       // pendingBOO: (pid: number) => Promise<number>;
       fromBOOUnits: (n: number | bigint) => number;
       toBOOUnits: (n: number) => bigint;
     }

     const BOO_DECIMALS = 10;
     const GAS_LIMIT = 20000;
     const GAS_PRICE = 100000;

     export function useMasterChefV2(config: MasterChefConfig): UseMasterChefV2 {
       const { account, connected, easyConnect } = useWalletContext();
       const [loading, setLoading] = useState(false);
       const [error, setError] = useState<string | null>(null);

const call = useCallback(
  async (method: string, params: any[] = []) => {
    if (!account || !easyConnect) {
      setError('Wallet not connected');
      return undefined;
    }

    setLoading(true);

    try {
      const sb = new ScriptBuilder();
      sb.CallContract(config.contractName, method, params);
      const script = sb.EndScript();

       const payloadMap: Record<string, string> = {
  deposit: '426F6F204661726D202D204465706F736974',
  withdraw: '426F6F204661726D202D205769746864726177',
  emergencyWithdraw: '426F6F204661726D202D20456D657267656E6379',
  checkIn: '426F6F204661726D202D20436865636B496E',
  checkOut: '426F6F204661726D202D20436865636B4F7574',
  harvest: '426F6F204661726D202D2048617276657374',
};

const isHarvest = method === 'deposit' && params?.[1] === 0;
const payloadKey = isHarvest ? 'harvest' : method;
const payload = payloadMap[payloadKey] ?? '426F6F204661726D'; // fallback: Boo Farm

console.log(`[Payload] ${method}:`, Buffer.from(payload, 'hex').toString());
console.log(`[ScriptBuilder] Method: ${method}`);
console.log(`[ScriptBuilder] Params:`, params);
console.log(`[ScriptBuilder] Script (hex):`, script);


      const result = await new Promise((resolve, reject) => {
        try {
          easyConnect.signTransaction(
            script,
            payload,
            (data) => {
              console.log(`📤 Sent ${method} with payload "${payload}":`, data);
              resolve(data);
            },
            (err) => {
              console.error(`[useMasterChefV2] ${method} error:`, err);
              reject(err);
            }
          );
        } catch (err) {
          reject(err);
        }
      });

      return result;
    } catch (err: any) {
      setError(err?.message || 'Unknown error');
      return undefined;
    } finally {
      setLoading(false);
    }
  },
  [account, easyConnect, config]
);

       const deposit = useCallback(
         async (pid: number, amount: number) => {
           const amountInUnits = Math.floor(amount * 10 ** BOO_DECIMALS);
           await call('deposit', [pid, amountInUnits]);
         },
         [call]
       );

       const withdraw = useCallback(
         async (pid: number, amount: number) => {
           const amountInUnits = Math.floor(amount * 10 ** BOO_DECIMALS);
           await call('withdraw', [
             new ContractParameter('pid', pid),
             new ContractParameter('amount', amountInUnits),
           ]);
         },
         [call]
       );

       const emergencyWithdraw = useCallback(
         async (pid: number) => {
           await call('emergencyWithdraw', [
             new ContractParameter('pid', pid),
           ]);
         },
         [call]
       );

       const checkIn = useCallback(
         async (pid: number) => {
           await call('checkIn', [
             new ContractParameter('pid', pid),
           ]);
         },
         [call]
       );

       const checkOut = useCallback(
         async (pid: number) => {
           await call('checkOut', [
             new ContractParameter('pid', pid),
           ]);
         },
         [call]
       );

       const harvest = useCallback(
        async (pid: number) => {
          await call('deposit', [pid, 0]);
        },
        [call]
        );

       // const pendingBOO = useCallback(
       //  async (pid: number) => {
       //    if (!account) return 0;
       //    const sb = new ScriptBuilder();
       //    sb.CallContract(config.contractName, 'pendingBOO', [
       //      new ContractParameter('pid', pid),
       //      new ContractParameter('userAddr', account),
       //    ]);
       //    const script = sb.EndScript();
       //    const res = await api.invokeRawScript(config.nexus, script);
       //    return res.results.length > 0 ? Number(res.results[0].value) / 10 ** BOO_DECIMALS : 0;
       //  },
       //  [account, config]
       // );

       const toBOOUnits = useCallback((n: number): bigint => {
         return BigInt(Math.floor(n * 10 ** BOO_DECIMALS));
       }, []);

       const fromBOOUnits = useCallback((n: number | bigint): number => {
         return Number(n) / 10 ** BOO_DECIMALS;
       }, []);

       return {
         connected,
         address: account,
         loading,
         error,
         deposit,
         withdraw,
         emergencyWithdraw,
         checkIn,
         checkOut,
         // pendingBOO,
         toBOOUnits,
         fromBOOUnits,
       };
     }