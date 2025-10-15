import React from 'react';
import { connectWallet, getWalletAddress } from '../utils/easyConnect';

const UnlockButton = () => {
  const handleConnect = async () => {
    const success = await connectWallet();
    if (success) {
      const address = await getWalletAddress();
      console.log('Connected to wallet:', address);
    } else {
      alert('Connection failed. Make sure your wallet is installed and unlocked.');
    }
  };

  return <button type="button" onClick={handleConnect}>Unlock Wallet</button>;
};

export default UnlockButton;