import React, { useEffect, useState } from 'react';
import { Button, ButtonProps } from '@pancakeswap-libs/uikit';
import { connectToPhantasma, getAccount, loadPhantasmaLink } from '../phantasmaConnection';

const UnlockButton: React.FC<ButtonProps> = (props) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadPhantasmaLink().then(() => setReady(true));
  }, []);

  const handleConnect = () => {
    if (!ready) {
      alert('Phantasma wallet not ready yet. Please wait...');
      return;
    }

    connectToPhantasma((success) => {
      if (success) {
        console.log('Connected to Phantasma:', getAccount()?.address);
      } else {
        alert('Connection failed. Install Phantasma wallet (e.g., Ecto: https://ecto.app).');
      }
    });
  };

  return (
    <Button onClick={handleConnect} {...props}>
      Connect Phantasma Wallet
    </Button>
  );
};

export default UnlockButton;