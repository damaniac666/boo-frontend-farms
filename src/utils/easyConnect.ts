// src/utils/easyConnect.ts
import { EasyConnect } from 'phantasma-sdk-ts';

// Constructor signature in rc.18 is: new EasyConnect([version, dappName, providerHint?])
const easy = new EasyConnect([4,'phantasma']);

// These two legacy lines are STILL REQUIRED in rc.18 (yes, it's ugly, but it works)
(easy as any).dapp = 'Boo Farm';
(easy.link as any).dapp = 'Boo Farm';

// Optional: set network (mainnet by default)
// easy.network = 'mainnet'; // or 'devnet'

export const connectWallet = async (
  provider: 'ecto' | 'poltergeist' | 'auto' = 'auto'
): Promise<boolean> => {
  try {
    easy.setConfig(provider);

    return await new Promise<boolean>((resolve) => {
      easy.connect(
        () => {
          console.log('Connected successfully – Carbon v4 ready!');
          resolve(true);
        },
        (err: any) => {
          console.error('Connection rejected:', err?.message || err);
          resolve(false);
        }
      );
    });
  } catch (err) {
    console.error('Connect error:', err);
    return false;
  }
};

export const disconnectWallet = () => easy.disconnect();

export const getWalletAddress = async (): Promise<string | null> => {
  try {
    const addr = await easy.query('walletAddress');
    return typeof addr === 'string' && addr.startsWith('P') ? addr : null;
  } catch {
    return null;
  }
};

export const isWalletConnected = async (): Promise<boolean> =>
  !!(await getWalletAddress());

export const getEasyInstance = () => easy;