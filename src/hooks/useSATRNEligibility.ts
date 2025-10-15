import { useEffect, useState } from 'react';
import { Decoder } from 'phantasma-sdk-ts';

const API_URL =
  'https://api-explorer.phantasma.info/api/v1/nfts?limit=10000&order_by=id&order_direction=desc&with_total=1&symbol=SATRN';

const decodeRom = (hex: string) => {
  try {
    const decoder = new Decoder(hex);
    return decoder.readVmObject();
  } catch (err) {
    console.error('ROM decode failed:', err);
    return null;
  }
};

const extractMetadata = (vmObject: any) => {
  const result: Record<string, any> = {};
  if (!vmObject?.value || !Array.isArray(vmObject.value)) return result;

  for (let i = 0; i < vmObject.value.length - 1; i += 2) {
    const key = vmObject.value[i]?.value;
    const val = vmObject.value[i + 1]?.value;
    if (key === 'liquidityPoolName') result.pool = val;
    if (key === 'amountofLiquidity') result.amount = Number(val);
  }

  return result;
};

const useSATRNEligibility = (account: string, targetPool: string): boolean => {
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    const checkEligibility = async () => {
      try {
        const res = await fetch(API_URL);
        const json = await res.json();
        const nfts = json.nfts || [];

        const owned = nfts.filter(
          (nft: any) => nft.owners?.[0]?.address?.toLowerCase() === account.toLowerCase()
        );

        const matched = owned.find((nft: any) => {
          const vmObject = decodeRom(nft.nft_metadata.rom);
          const meta = extractMetadata(vmObject);
          return meta.pool === targetPool;
        });

        setEligible(!!matched);
      } catch (err) {
        console.error('Failed to check SATRN eligibility:', err);
        setEligible(false);
      }
    };

    if (account && targetPool) {
      checkEligibility();
    }
  }, [account, targetPool]);

  return eligible;
};

export default useSATRNEligibility;