import { EasyConnect } from 'phantasma-sdk-ts';

const easy = new EasyConnect();
(easy as any).dapp = 'BooFarm';
(easy as any).link.dapp = 'BooFarm';

export const connectWallet = async (provider: 'ecto' | 'poltergeist' | 'auto' = 'auto'): Promise<boolean> => {
  try {
    easy.setConfig(provider);
    await easy.connect(
      () => console.log(`✅ Connected via ${provider}`),
      (err) => console.error('❌ Connection failed:', err)
    );
    return true;
  } catch (err) {
    console.error('❌ Wallet connection error:', err);
    return false;
  }
};

export const disconnectWallet = () => {
  easy.disconnect();
  console.log('🔌 Disconnected');
};

export const getWalletAddress = async (): Promise<string | null> => {
  try {
    const result = await easy.query('walletAddress');
    if (typeof result === 'string') {
      return result;
    }
    console.warn('Unexpected walletAddress result:', result);
    return null;
  } catch (err) {
    console.error('Failed to get wallet address:', err);
    return null;
  }
};

export const isWalletConnected = async (): Promise<boolean> => {
  try {
    const address = await easy.query('walletAddress');
    return !!address;
  } catch {
    return false;
  }
};

export const getEasyInstance = () => easy;