// hooks/usePhantasmaLink.ts
import { useState, useEffect, useCallback } from 'react';

interface PhantasmaAccount {
  address: string;
  // Add more fields if needed
}

interface PhantasmaLink {
  login: (callback: (success: boolean) => void, version: number) => void;
  account?: PhantasmaAccount;
}

export const usePhantasmaLink = () => {
  const [phantasmaLink, setPhantasmaLink] = useState<PhantasmaLink | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<PhantasmaAccount | null>(null);

  const loadScript = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if ((window as any).PhantasmaLink) return resolve();

      const script = document.createElement('script');
      script.src = '/phantasma/phantasma.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Phantasma script'));
      document.body.appendChild(script);
    });
  }, []);

  const initPhantasma = useCallback(async () => {
    await loadScript();
    const LinkClass = (window as any).PhantasmaLink;
    const instance = new LinkClass('boo-farm');
    setPhantasmaLink(instance);
  }, [loadScript]);

  const connect = useCallback(() => {
    if (!phantasmaLink) return;

    phantasmaLink.login((success: boolean) => {
      setIsConnected(success);
      setAccount(success ? phantasmaLink.account ?? null : null);
      console.log(success ? `Connected: ${phantasmaLink.account?.address}` : 'Connection failed');
    }, 2);
  }, [phantasmaLink]);

  useEffect(() => {
    initPhantasma();
  }, [initPhantasma]);

  return { connect, isConnected, account };
};